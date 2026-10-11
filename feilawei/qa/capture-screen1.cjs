const assert=require("node:assert/strict");
const fs=require("node:fs/promises"),path=require("node:path"),http=require("node:http");
const {chromium,webkit}=require(process.env.PLAYWRIGHT_MODULE||"playwright");
const root=path.resolve(__dirname,".."),output=path.resolve(process.argv[2]||path.join(root,"docs/qa/latest"));
const widths=[375,390,393,430],heights={375:667,390:844,393:852,430:932},DESIGN={width:390,height:805};
const mime={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".png":"image/png",".webp":"image/webp",".svg":"image/svg+xml"};

const server=http.createServer(async(req,res)=>{try{const name=decodeURIComponent(new URL(req.url,"http://localhost").pathname);const file=path.resolve(root,"."+(name.endsWith("/")?name+"index.html":name));if(!file.startsWith(root+path.sep))throw Error("Outside root");res.setHeader("Content-Type",mime[path.extname(file)]||"application/octet-stream");res.end(await fs.readFile(file))}catch{res.writeHead(404);res.end("Not found")}});

const report={visualVerdict:"PENDING_VISUAL_REVIEW",cases:[],engineering:[],unavailableBrowsers:[]};
const required=["飛啦喂！","外星旅人・地球導遊","想去邊？","抽咗先算。","揀條件","話你知想點玩","揀盲盒","揀你心儀嘅盒","揭曉下一站","睇吓去邊！","開始飛啦","You only live once","人生得一次，仲等咩？飛啦喂！"];

function check(name,fn){return Promise.resolve().then(fn).then(()=>report.engineering.push({name,status:"PASS"})).catch(e=>report.engineering.push({name,status:"FAIL",error:e.message}))}

async function geometry(page){return page.evaluate(()=>{
 const board=document.querySelector(".artboard").getBoundingClientRect(),cta=document.getElementById("screen1-start").getBoundingClientRect();
 return {board:{x:board.x,y:board.y,width:board.width,height:board.height},cta:{x:cta.x-board.x,y:cta.y-board.y,width:cta.width,height:cta.height},
 horizontalOverflow:document.documentElement.scrollWidth>innerWidth,status:window.feilaweiScreen1?.getStatus(),text:document.body.innerText,
 imageCount:document.images.length,mascotSrc:document.querySelector(".mascot-window img")?.getAttribute("src")||""};
})}

async function capture(browser,engine,base){
 for(const width of widths){
  const context=await browser.newContext({viewport:{width,height:heights[width]},deviceScaleFactor:3,isMobile:true,hasTouch:true,reducedMotion:"reduce"});
  const page=await context.newPage();const errors=[],badResponses=[],requests=[];
  page.on("pageerror",e=>errors.push(e.message));page.on("response",r=>{if(r.status()>=400)badResponses.push(r.url())});page.on("request",r=>requests.push(new URL(r.url()).pathname));
  await page.goto(base);await page.waitForFunction(()=>window.feilaweiScreen1?.getStatus().status==="ready");
  const normal=await geometry(page),prefix=engine+"-"+width;
  await page.screenshot({path:path.join(output,prefix+"-viewport.png"),scale:"css"});
  await page.locator(".artboard").screenshot({path:path.join(output,prefix+"-live.png"),scale:"css",animations:"disabled"});
  report.cases.push({engine,width,normal,errors,badResponses,requests,live:prefix+"-live.png"});
  await check(prefix+": geometry + real Traditional Chinese",()=>{
    const expectedWidth=Math.min(width,430),scale=expectedWidth/DESIGN.width;
    assert.ok(Math.abs(normal.board.width-expectedWidth)<.2);
    assert.ok(Math.abs(normal.board.height-DESIGN.height*scale)<.5);
    assert.equal(normal.horizontalOverflow,false);
    assert.equal(normal.status.status,"ready");
    assert.ok(normal.cta.height>=56);
    for(const text of required)assert.ok(normal.text.includes(text),"missing text: "+text);
    assert.ok(normal.mascotSrc.includes("小天線隊長旅行角色設定圖.png"));
    assert.equal(requests.some(x=>x.includes("screen01_golden@2x.webp")),false);
    assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);
  });
  await context.close();
 }
}

async function controls(browser,engine,base){
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});const page=await context.newPage();
 await page.addInitScript(()=>{window.startEvents=[];document.addEventListener("feilawei:start",e=>window.startEvents.push(e.detail.nextScreen))});
 await page.goto(base);await page.waitForFunction(()=>window.feilaweiScreen1?.getStatus().status==="ready");
 await check(engine+": start CTA duplicate guard",async()=>{await page.evaluate(()=>{for(let n=0;n<5;n++)document.getElementById("screen1-start").click()});assert.deepEqual(await page.evaluate(()=>window.startEvents),["travelType"]);await page.waitForTimeout(360);await page.getByRole("button",{name:"開始飛啦"}).click();assert.deepEqual(await page.evaluate(()=>window.startEvents),["travelType","travelType"])});
 await check(engine+": renderer strategy",async()=>{const data=await page.evaluate(()=>({strategy:window.feilaweiScreen1.strategy,textIntegrity:window.feilaweiScreen1.textIntegrity}));assert.deepEqual(data,{strategy:"native-text-hybrid-art",textIntegrity:"real-zh-HK-dom"})});
 await context.close();
}

(async()=>{await fs.mkdir(output,{recursive:true});await new Promise(r=>server.listen(0,"127.0.0.1",r));const base="http://127.0.0.1:"+server.address().port+"/";
 try{for(const [engine,type] of Object.entries({chromium,webkit})){let browser;try{browser=await type.launch({})}catch(e){report.unavailableBrowsers.push({engine,reason:e.message});continue}try{await capture(browser,engine,base);await controls(browser,engine,base)}finally{await browser.close()}}
 report.engineeringVerdict=report.engineering.some(x=>x.status==="FAIL")?"FAIL":report.cases.length===8?"PASS":"INCOMPLETE_BROWSER_MATRIX";
 report.visualVerdict=report.engineeringVerdict==="PASS"?"READY_FOR_VISUAL_REVIEW":"FAIL";
 report.realDeviceUAT="NOT_RUN";
 await fs.writeFile(path.join(output,"capture.json"),JSON.stringify(report,null,2)+"\n");
 console.log(JSON.stringify({engineering:report.engineeringVerdict,visual:report.visualVerdict,cases:report.cases.length,failures:report.engineering.filter(x=>x.status==="FAIL")}));
 process.exitCode=report.engineeringVerdict==="PASS"?0:1;
 }finally{await new Promise(r=>server.close(r))}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
