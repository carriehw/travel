const mascotSVG='<img src="./mascot.png" class="mascot-img" alt="小天線隊長">';
const state={mode:"smart",companion:"friends",days:5,budget:2,interests:[],concern:"none",visited:[],excluded:[],pool:[],selected:null,result:null};
const memoryFallback={};
function storeGet(k,d="[]"){try{return localStorage.getItem(k)||d}catch(e){return memoryFallback[k]||d}}
function storeSet(k,v){try{localStorage.setItem(k,v)}catch(e){memoryFallback[k]=v}}

const places=[
{id:"jp-kyoto",country:"日本",zh:"京都",en:"Kyoto, Japan",flag:"🇯🇵",days:[4,6],budget:3,flight:4.3,solo:5,couple:5,friends:4,family:4,elderly:3,food:4,shopping:3,photo:5,beach:1,nature:4,hotSpring:3,culture:5,relax:4,walk:4,crowd:4,heat:3,language:3,tags:["文化","打卡","美食"],visual:"🏯"},
{id:"jp-fukuoka",country:"日本",zh:"福岡",en:"Fukuoka, Japan",flag:"🇯🇵",days:[3,5],budget:2,flight:3.7,solo:5,couple:4,friends:5,family:4,elderly:4,food:5,shopping:4,photo:4,beach:2,nature:3,hotSpring:4,culture:4,relax:5,walk:2,crowd:2,heat:2,language:2,tags:["4–5日啱玩","美食多","交通方便"],visual:"🍜"},
{id:"jp-tokyo",country:"日本",zh:"東京",en:"Tokyo, Japan",flag:"🇯🇵",days:[4,7],budget:3,flight:4.5,solo:5,couple:5,friends:5,family:5,elderly:3,food:5,shopping:5,photo:5,beach:1,nature:2,hotSpring:2,culture:5,relax:2,walk:4,crowd:5,heat:3,language:3,tags:["城市探索","Shopping","美食"],visual:"🗼"},
{id:"jp-osaka",country:"日本",zh:"大阪",en:"Osaka, Japan",flag:"🇯🇵",days:[4,6],budget:3,flight:4.2,solo:5,couple:4,friends:5,family:5,elderly:3,food:5,shopping:5,photo:4,beach:1,nature:2,hotSpring:2,culture:4,relax:3,walk:4,crowd:4,heat:3,language:3,tags:["朋友啱玩","食買玩","交通方便"],visual:"🎡"},
{id:"jp-sapporo",country:"日本",zh:"札幌",en:"Sapporo, Japan",flag:"🇯🇵",days:[4,6],budget:3,flight:5.2,solo:4,couple:5,friends:4,family:4,elderly:3,food:5,shopping:3,photo:5,beach:1,nature:5,hotSpring:4,culture:3,relax:4,walk:3,crowd:2,heat:1,language:2,tags:["雪景","美食","自然"],visual:"❄️"},
{id:"jp-okinawa",country:"日本",zh:"沖繩",en:"Okinawa, Japan",flag:"🇯🇵",days:[4,6],budget:3,flight:2.8,solo:3,couple:5,friends:5,family:5,elderly:4,food:4,shopping:2,photo:5,beach:5,nature:5,hotSpring:2,culture:3,relax:5,walk:2,crowd:2,heat:4,language:2,tags:["海島","放鬆","親子"],visual:"🌴"},
{id:"kr-seoul",country:"韓國",zh:"首爾",en:"Seoul, Korea",flag:"🇰🇷",days:[4,6],budget:2,flight:3.7,solo:5,couple:5,friends:5,family:4,elderly:2,food:5,shopping:5,photo:5,beach:1,nature:2,hotSpring:2,culture:4,relax:2,walk:4,crowd:5,heat:3,language:3,tags:["Shopping","Cafe","夜生活"],visual:"☕"},
{id:"kr-busan",country:"韓國",zh:"釜山",en:"Busan, Korea",flag:"🇰🇷",days:[3,5],budget:2,flight:3.5,solo:4,couple:5,friends:5,family:4,elderly:3,food:5,shopping:3,photo:5,beach:5,nature:4,hotSpring:3,culture:3,relax:4,walk:3,crowd:3,heat:3,language:2,tags:["海景","美食","節奏舒服"],visual:"🌊"},
{id:"tw-taipei",country:"台灣",zh:"台北",en:"Taipei, Taiwan",flag:"🇹🇼",days:[3,5],budget:2,flight:1.9,solo:5,couple:4,friends:5,family:5,elderly:5,food:5,shopping:4,photo:4,beach:1,nature:3,hotSpring:4,culture:4,relax:4,walk:2,crowd:3,heat:3,language:1,tags:["短途","美食","長者友善"],visual:"🏮"},
{id:"tw-tainan",country:"台灣",zh:"台南",en:"Tainan, Taiwan",flag:"🇹🇼",days:[3,5],budget:1,flight:2.3,solo:4,couple:5,friends:4,family:4,elderly:4,food:5,shopping:2,photo:5,beach:2,nature:3,hotSpring:1,culture:5,relax:5,walk:2,crowd:2,heat:4,language:1,tags:["慢活","古城","小食"],visual:"🍧"},
{id:"th-bangkok",country:"泰國",zh:"曼谷",en:"Bangkok, Thailand",flag:"🇹🇭",days:[4,6],budget:1,flight:3,solo:4,couple:5,friends:5,family:4,elderly:3,food:5,shopping:5,photo:4,beach:1,nature:1,hotSpring:1,culture:4,relax:3,walk:3,crowd:4,heat:5,language:3,tags:["性價比","美食","Shopping"],visual:"🛺"},
{id:"th-chiangmai",country:"泰國",zh:"清邁",en:"Chiang Mai, Thailand",flag:"🇹🇭",days:[4,6],budget:1,flight:3.2,solo:5,couple:5,friends:4,family:4,elderly:4,food:4,shopping:2,photo:5,beach:1,nature:5,hotSpring:3,culture:5,relax:5,walk:2,crowd:2,heat:4,language:3,tags:["放空","自然","文青"],visual:"🌿"},
{id:"th-phuket",country:"泰國",zh:"布吉",en:"Phuket, Thailand",flag:"🇹🇭",days:[4,6],budget:2,flight:3.6,solo:3,couple:5,friends:5,family:4,elderly:3,food:4,shopping:2,photo:5,beach:5,nature:5,hotSpring:1,culture:2,relax:5,walk:2,crowd:3,heat:5,language:3,tags:["海灘","Resort","朋友"],visual:"🏖️"},
{id:"vn-danang",country:"越南",zh:"峴港",en:"Da Nang, Vietnam",flag:"🇻🇳",days:[4,6],budget:1,flight:2,solo:4,couple:5,friends:5,family:4,elderly:4,food:4,shopping:2,photo:5,beach:5,nature:4,hotSpring:1,culture:3,relax:5,walk:2,crowd:2,heat:5,language:3,tags:["海灘","抵玩","放鬆"],visual:"🌅"},
{id:"sg-singapore",country:"新加坡",zh:"新加坡",en:"Singapore",flag:"🇸🇬",days:[3,5],budget:3,flight:3.8,solo:5,couple:4,friends:4,family:5,elderly:5,food:5,shopping:5,photo:5,beach:2,nature:3,hotSpring:1,culture:4,relax:3,walk:2,crowd:3,heat:5,language:1,tags:["交通超方便","親子","美食"],visual:"🌇"},
{id:"my-penang",country:"馬來西亞",zh:"檳城",en:"Penang, Malaysia",flag:"🇲🇾",days:[3,5],budget:1,flight:3.8,solo:4,couple:5,friends:4,family:4,elderly:4,food:5,shopping:2,photo:5,beach:3,nature:3,hotSpring:1,culture:5,relax:5,walk:2,crowd:2,heat:5,language:2,tags:["街頭美食","慢活","文化"],visual:"🍛"},
{id:"id-bali",country:"印尼",zh:"峇里島",en:"Bali, Indonesia",flag:"🇮🇩",days:[5,8],budget:2,flight:5,solo:4,couple:5,friends:5,family:4,elderly:3,food:4,shopping:2,photo:5,beach:5,nature:5,hotSpring:1,culture:4,relax:5,walk:2,crowd:3,heat:5,language:3,tags:["Resort","浪漫","放空"],visual:"🌺"},
{id:"au-melbourne",country:"澳洲",zh:"墨爾本",en:"Melbourne, Australia",flag:"🇦🇺",days:[6,9],budget:4,flight:9.2,solo:5,couple:5,friends:4,family:4,elderly:4,food:5,shopping:4,photo:5,beach:3,nature:5,hotSpring:1,culture:5,relax:4,walk:3,crowd:2,heat:2,language:1,tags:["Cafe","Road Trip","文化"],visual:"🚋"},
{id:"ca-vancouver",country:"加拿大",zh:"溫哥華",en:"Vancouver, Canada",flag:"🇨🇦",days:[7,10],budget:4,flight:12,solo:5,couple:5,friends:4,family:4,elderly:4,food:4,shopping:3,photo:5,beach:3,nature:5,hotSpring:1,culture:3,relax:4,walk:2,crowd:2,heat:1,language:1,tags:["自然","城市","輕鬆"],visual:"🏔️"}
];

const companions=[
["solo","🧍‍♀️","自己一個","隨心出發 · 自由自在","#F5D6D1"],
["couple","💞","情侶 / 伴侶","浪漫 · 二人世界","#F2D6CD"],
["friends","😎","朋友","一齊玩 · 更多可能","#D9E7F2"],
["family","👨‍👩‍👧","家庭","親子 · 溫馨時光","#F4DFB2"],
["kids","🧒","親子","小朋友都要開心","#CFE8D8"],
["elderly","👵","三代同堂","長者舒適度優先","#E3D8EE"]
];
const interests=[
["relax","🌴","Chill 放鬆","海島 · 陽光 · 慢活","#F4C3B7"],
["culture","🏙️","城市探索","文化 · 美食 · 打卡","#CDE3F1"],
["nature","🏔️","自然風景","山川 · 湖泊 · 大自然","#CFE4D2"],
["food","🍜","美食之旅","地道 · 餐廳 · 市場","#F7D879"],
["hotSpring","♨️","療癒放空","溫泉 · 慢遊 · Recharge","#DED2EC"],
["photo","🗺️","隨機驚喜","交俾命運！","#F5CDC9"],
["shopping","🛍️","Shopping","潮流 · 買手店 · 市集","#D4E5F0"],
["beach","🏝️","海灘","陽光 · 海風 · 水上活動","#C9E7DA"]
];
const memories=["京都","東京","大阪","福岡","沖繩","首爾","釜山","台北","曼谷","新加坡","峇里島"];
const boxColors=[
["#F09A91","#D96763"],["#8AC0DE","#5B97BD"],["#F3C75E","#E1A84C"],["#95CBAA","#69A982"],
["#B7A4D1","#927CB3"],["#EFA5B7","#D87C98"],["#8FC9D0","#6FA5B3"],["#F3B37D","#DD8D64"],
["#A9D0B7","#7FB28E"],["#EFB9A9","#D98D78"],["#A9C6E3","#7FA3C6"],["#C7B0DB","#9B83BD"]
];
const hints=["🌴","🏙️","🏔️","🍜","♨️","🌸","❄️","🌏","☀️","🏯","🚋","👑"];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function go(id){$$(".screen").forEach(x=>x.classList.remove("active"));const t=$("#"+id);if(t)t.classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast._);toast._=setTimeout(()=>t.classList.remove("show"),1300)}
function renderMascots(){$$("[data-mascot]").forEach(x=>x.innerHTML=mascotSVG)}
function renderCompanions(){$("#companionGrid").innerHTML=companions.map(([v,e,t,s,c])=>`<button class="companion-card ${state.companion===v?"active":""}" data-companion="${v}"><div class="avatar" style="background:${c}">${e}</div><strong>${t}</strong><small>${s}</small></button>`).join("")}
function renderBasics(){
  const ds=[[3,"1–3日","#67A9CF"],[5,"4–5日","#D95F56"],[7,"6–8日","#B39DCE"],[10,"9日+","#8BC5A8"]];
  const bs=[[1,"HK$3K以下","#8BC5A8"],[2,"HK$3K–6K","#67A9CF"],[3,"HK$6K–10K","#B39DCE"],[4,"HK$10K+","#D95F56"]];
  $("#days").innerHTML=ds.map(x=>`<button class="chip ${state.days===x[0]?"active":""}" style="--chip:${x[2]}" data-days="${x[0]}">${x[1]}</button>`).join("");
  $("#budget").innerHTML=bs.map(x=>`<button class="chip ${state.budget===x[0]?"active":""}" style="--chip:${x[2]}" data-budget="${x[0]}">${x[1]}</button>`).join("")
}
function renderInterests(){$("#interests").innerHTML=interests.map(([v,e,t,s,c])=>`<button class="vibe-card ${state.interests.includes(v)?"active":""}" style="background:${c}" data-interest="${v}"><span class="emoji">${e}</span><strong>${t}</strong><small>${s}</small></button>`).join("")}
function renderConcerns(){
  let set=[["budget","💸","唔想太貴","#F3D9B1"],["crowd","👥","唔想太迫","#D9E7F2"],["short","✈️","唔想飛太耐","#CFE8D8"],["none","✨","冇特別","#E3D8EE"]];
  if(state.companion==="solo")set=[["short","✈️","唔想飛太耐","#CFE8D8"],["language","🗣️","溝通太麻煩","#F3D9B1"],["crowd","👥","太多人太迫","#D9E7F2"],["none","✨","冇特別","#E3D8EE"]];
  if(state.companion==="elderly")set=[["walk","🚶","唔想行太多","#F3D9B1"],["short","✈️","唔想飛太耐","#CFE8D8"],["crowd","👥","怕太多人","#D9E7F2"],["none","✨","冇特別","#E3D8EE"]];
  if(state.companion==="kids")set=[["short","✈️","唔想飛太耐","#CFE8D8"],["heat","🥵","唔想太熱","#F5D6D1"],["crowd","👥","怕太多人","#D9E7F2"],["none","✨","冇特別","#E3D8EE"]];
  $("#concerns").innerHTML=set.map(([v,e,t,c])=>`<button class="concern-pill ${state.concern===v?"active":""}" style="background:${c}" data-concern="${v}">${e} ${t}</button>`).join("")
}
function renderMemory(){$("#memoryList").innerHTML=memories.map(x=>{let cls=state.excluded.includes(x)?"excluded":state.visited.includes(x)?"visited":"";let prefix=state.excluded.includes(x)?"🚫 ":state.visited.includes(x)?"✓ ":"";return `<button class="memory-pill ${cls}" data-memory="${x}">${prefix}${x}</button>`}).join("")}
function score(p){
  if(state.excluded.includes(p.zh))return-9999;
  let s=0;
  s+=state.days>=p.days[0]&&state.days<=p.days[1]?24:Math.max(-16,12-Math.abs(state.days-(p.days[0]+p.days[1])/2)*4);
  s+=14-Math.abs(state.budget-p.budget)*5;
  const cm={solo:"solo",couple:"couple",friends:"friends",family:"family",kids:"family",elderly:"elderly"};
  s+=(p[cm[state.companion]]||3)*4;
  state.interests.forEach(k=>s+=(p[k]||0)*6);
  if(state.concern==="short")s-=Math.max(0,p.flight-4)*7;
  if(state.concern==="walk")s-=p.walk*6;
  if(state.concern==="crowd")s-=p.crowd*5;
  if(state.concern==="heat")s-=p.heat*5;
  if(state.concern==="budget")s-=p.budget*5;
  if(state.concern==="language")s-=p.language*4;
  if(state.visited.includes(p.zh))s-=38;
  const recent=JSON.parse(storeGet("flw_recent")||"[]"),ix=recent.indexOf(p.id);
  if(ix>=0)s-=Math.max(10,36-ix*4);
  return s+Math.random()*10
}
function buildPool(fast=false){
  const back=$("#boxes .back");if(back)back.dataset.go=state.mode==="random"?"home":state.mode==="quick"?"vibe":"memory";
  go("loading");
  const msgs=["先睇旅伴、日數同預算…","再睇你最想玩啲乜…","避開最近成日出現嘅地方…","加少少估你唔到嘅驚喜…","得喇！準備揀盲盒 ✨"];
  let i=0;$("#loadingText").textContent=msgs[0];$("#loadFill").style.width="12%";
  const timer=setInterval(()=>{i=Math.min(i+1,msgs.length-1);$("#loadingText").textContent=msgs[i];$("#loadFill").style.width=(18+i*20)+"%"},fast?130:280);
  setTimeout(()=>{clearInterval(timer);
    const ranked=places.map(p=>({p,s:score(p)})).filter(x=>x.s>-9000).sort((a,b)=>b.s-a.s);
    const chosen=[],countryCount={};
    for(const x of ranked){if((countryCount[x.p.country]||0)>=3)continue;chosen.push(x.p);countryCount[x.p.country]=(countryCount[x.p.country]||0)+1;if(chosen.length>=12)break}
    ranked.forEach(x=>{if(chosen.length<12&&!chosen.includes(x.p))chosen.push(x.p)});
    state.pool=chosen.sort(()=>Math.random()-.5);
    renderBoxes();$("#poolCount").textContent=state.pool.length+" 個";
    $("#partyNote").hidden=!(state.mode==="group"||["friends","couple","family","kids","elderly"].includes(state.companion));
    go("boxes")
  },fast?620:1500)
}
function renderBoxes(){$("#boxGrid").innerHTML=state.pool.map((p,i)=>{const [a,b]=boxColors[i%boxColors.length];return `<button class="blindbox" style="background:linear-gradient(145deg,${a},${b});animation-delay:-${(i*.31)%3}s" data-box="${i}">?<span class="hint">${hints[i%hints.length]}</span></button>`}).join("")}
function selectBox(i,el){$$(".blindbox").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");state.selected=i;const [a,b]=boxColors[i%boxColors.length];$("#pickedBox").style.background=`linear-gradient(145deg,${a},${b})`;$("#confirmSheet").classList.add("show");navigator.vibrate?.(15)}
function openSelected(){
  $("#confirmSheet").classList.remove("show");$("#reveal").classList.add("show");
  const seq=["3","2","1","飛啦喂！"];let i=0;$("#countdown").textContent=seq[0];
  const timer=setInterval(()=>{i++;$("#countdown").textContent=seq[Math.min(i,3)];if(i>=3)clearInterval(timer)},450);
  setTimeout(()=>{state.result=state.pool[state.selected];let r=JSON.parse(storeGet("flw_recent")||"[]");r=[state.result.id,...r.filter(x=>x!==state.result.id)].slice(0,12);storeSet("flw_recent",JSON.stringify(r));renderResult();$("#reveal").classList.remove("show");confetti();go("result")},2150)
}
function renderResult(){
  const p=state.result;$("#resultFlag").textContent=p.flag;$("#resultCity").textContent=p.zh;$("#resultEn").textContent=p.en;$("#resultVisual").textContent=p.visual||"✈️";
  $("#resultTags").innerHTML=p.tags.map(t=>`<span class="tag">${t}</span>`).join("");
  const rs=[];
  if(state.days>=p.days[0]&&state.days<=p.days[1])rs.push(`你揀咗 <b>${state.days<=3?"1–3":state.days<=5?"4–5":state.days<=8?"6–8":"9+"} 日</b>，呢個目的地節奏同日數幾吻合。`);
  if(state.interests.includes("culture")&&p.culture>=4)rs.push("你想要 <b>文化探索</b>，呢度有足夠歷史感同在地體驗。");
  if(state.interests.includes("food")&&p.food>=4)rs.push("你今次想 <b>食好嘢</b>，呢度嘅美食選擇夠多。");
  if(state.interests.includes("relax")&&p.relax>=4)rs.push("你想 <b>放鬆</b>，呢度容易安排成舒服唔趕嘅旅程。");
  if(state.interests.includes("beach")&&p.beach>=4)rs.push("你揀咗 <b>海灘</b>，呢度有足夠陽光海岸感。");
  if(state.interests.includes("shopping")&&p.shopping>=4)rs.push("你想 <b>Shopping</b>，呢度有足夠購物同城市體驗。");
  if(state.concern==="walk"&&p.walk<=2)rs.push("你唔想 <b>行到腳軟</b>，呢個選擇相對容易安排得輕鬆。");
  if(state.concern==="short"&&p.flight<=5)rs.push("你唔想 <b>飛太耐</b>，呢個航程相對容易接受。");
  if(state.companion==="elderly"&&p.elderly>=4)rs.push("你有 <b>長者同行</b>，呢度比較容易安排交通同休息節奏。");
  if(!rs.length)rs.push(`綜合你嘅日數、預算、旅伴同玩法，<b>${p.zh}</b> 喺今次候選池入面整體配對得幾好。`);
  $("#reasons").innerHTML=rs.slice(0,4).map((r,i)=>`<div class="reason"><span>${["✓","✓","✓","✓"][i]}</span><div>${r}</div></div>`).join("")
}
async function shareResult(){
  if(!state.result)return;const text=`飛啦喂！我抽到 ${state.result.zh} ${state.result.flag} ✈️\nYou only live once, 人生得一次，仲等咩？飛啦喂！`;
  if(navigator.share){try{await navigator.share({title:"飛啦喂！",text})}catch(e){}}else{try{await navigator.clipboard.writeText(text);toast("已複製分享文字")}catch(e){toast("分享文字已準備好")}}
}
function confetti(){const cs=["#67A9CF","#F1C857","#F3A39A","#8BC5A8","#B39DCE","#D95F56"];for(let i=0;i<44;i++){const e=document.createElement("i");e.className="confetti";e.style.left=Math.random()*100+"vw";e.style.background=cs[i%cs.length];e.style.animationDelay=Math.random()*.45+"s";document.body.appendChild(e);setTimeout(()=>e.remove(),2600)}}

document.addEventListener("click",e=>{
  const g=e.target.closest("[data-go]");if(g)go(g.dataset.go);
  const m=e.target.closest("[data-mode]");if(m){state.mode=m.dataset.mode;if(state.mode==="random"){state.days=5;state.budget=2;state.interests=["food","relax"];buildPool()}else go("companion")}
  const c=e.target.closest("[data-companion]");if(c){state.companion=c.dataset.companion;renderCompanions()}
  const d=e.target.closest("[data-days]");if(d){state.days=+d.dataset.days;renderBasics()}
  const b=e.target.closest("[data-budget]");if(b){state.budget=+b.dataset.budget;renderBasics()}
  const it=e.target.closest("[data-interest]");if(it){const v=it.dataset.interest,ix=state.interests.indexOf(v);if(ix>=0)state.interests.splice(ix,1);else if(state.interests.length<4)state.interests.push(v);else return toast("最多揀 4 樣就夠啦 ✋");renderInterests()}
  const co=e.target.closest("[data-concern]");if(co){state.concern=co.dataset.concern;renderConcerns()}
  const mem=e.target.closest("[data-memory]");if(mem){const x=mem.dataset.memory;if(!state.visited.includes(x)&&!state.excluded.includes(x))state.visited.push(x);else if(state.visited.includes(x)){state.visited=state.visited.filter(v=>v!==x);state.excluded.push(x)}else state.excluded=state.excluded.filter(v=>v!==x);renderMemory()}
  const box=e.target.closest("[data-box]");if(box)selectBox(+box.dataset.box,box)
});
$("#companionNext").onclick=()=>go("basics");
$("#basicsNext").onclick=()=>go("vibe");
$("#vibeNext").onclick=()=>{if(!state.interests.length)return toast("揀至少一樣先 ✨");if(state.mode==="quick")buildPool();else go("concern")};
$("#concernNext").onclick=()=>go("memory");
$("#skipMemory").onclick=()=>buildPool();
$("#matchNow").onclick=()=>buildPool();
$("#reshuffle").onclick=()=>buildPool(true);
$("#lookAgain").onclick=()=>$("#confirmSheet").classList.remove("show");
$("#openBox").onclick=openSelected;
$("#reroll").onclick=()=>buildPool(true);
$("#share").onclick=shareResult;$("#shareTop").onclick=shareResult;
$("#save").onclick=e=>{if(!state.result)return;let a=JSON.parse(storeGet("flw_saved")||"[]");if(!a.includes(state.result.id))a.push(state.result.id);storeSet("flw_saved",JSON.stringify(a));e.target.textContent="✓ 已收藏";toast("幫你記低咗 ❤️")};

renderMascots();renderCompanions();renderBasics();renderInterests();renderConcerns();renderMemory();