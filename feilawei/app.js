const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={
  vibe:"surprise",companion:"captain",days:7,distance:"short",budget:2,regions:["asia"],
  advanced:{gender:"prefer-not",transfer:"no",pace:"medium",weather:"any",walk:"medium",diet:"none",safety:"transport",elderly:"no",kids:"no",access:"none"},
  memoryMode:"visited",visited:[],excluded:[],pool:[],selected:null,result:null
};
const places=[
{id:"kyoto",name:"京都",en:"Kyoto, Japan",country:"日本",region:"asia",distance:"short",budget:2,days:[4,8],vibes:["city","food","heal"],safety:5,elderly:3,kids:3,walk:4,climate:["cool","any"],icon:"⛩️",hero:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85",mini1:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=80",mini2:"https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=400&q=80"},
{id:"fukuoka",name:"福岡",en:"Fukuoka, Japan",country:"日本",region:"asia",distance:"short",budget:2,days:[3,6],vibes:["food","city","heal"],safety:5,elderly:4,kids:4,walk:2,climate:["warm","cool","any"],icon:"🍜",hero:"https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=900&q=85"},
{id:"tokyo",name:"東京",en:"Tokyo, Japan",country:"日本",region:"asia",distance:"short",budget:3,days:[4,9],vibes:["city","food"],safety:5,elderly:3,kids:4,walk:5,climate:["cool","warm","any"],icon:"🗼",hero:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85"},
{id:"osaka",name:"大阪",en:"Osaka, Japan",country:"日本",region:"asia",distance:"short",budget:2,days:[4,7],vibes:["food","city"],safety:5,elderly:3,kids:4,walk:4,climate:["warm","cool","any"],icon:"🎡",hero:"https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=900&q=85"},
{id:"sapporo",name:"札幌",en:"Sapporo, Japan",country:"日本",region:"asia",distance:"short",budget:3,days:[4,8],vibes:["nature","food","heal"],safety:5,elderly:3,kids:4,walk:3,climate:["cold","cool","any"],icon:"❄️",hero:"https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=900&q=85"},
{id:"okinawa",name:"沖繩",en:"Okinawa, Japan",country:"日本",region:"asia",distance:"short",budget:3,days:[4,7],vibes:["relax","nature","surprise"],safety:5,elderly:4,kids:5,walk:2,climate:["warm","any"],icon:"🌴",hero:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85"},
{id:"seoul",name:"首爾",en:"Seoul, Korea",country:"韓國",region:"asia",distance:"short",budget:2,days:[4,7],vibes:["city","food"],safety:4,elderly:2,kids:3,walk:5,climate:["cool","cold","any"],icon:"🏙️",hero:"https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=85"},
{id:"busan",name:"釜山",en:"Busan, Korea",country:"韓國",region:"asia",distance:"short",budget:2,days:[3,6],vibes:["relax","food","nature"],safety:4,elderly:3,kids:4,walk:3,climate:["warm","cool","any"],icon:"🌊",hero:"https://images.unsplash.com/photo-1594973782943-2f4f6010d235?auto=format&fit=crop&w=900&q=85"},
{id:"taipei",name:"台北",en:"Taipei, Taiwan",country:"台灣",region:"asia",distance:"short",budget:2,days:[3,6],vibes:["food","city","heal"],safety:5,elderly:5,kids:5,walk:2,climate:["warm","any"],icon:"🏮",hero:"https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=900&q=85"},
{id:"tainan",name:"台南",en:"Tainan, Taiwan",country:"台灣",region:"asia",distance:"short",budget:1,days:[3,6],vibes:["food","heal","city"],safety:5,elderly:4,kids:4,walk:2,climate:["warm","any"],icon:"🍧",hero:"https://images.unsplash.com/photo-1542704792-e30dac463c90?auto=format&fit=crop&w=900&q=85"},
{id:"bangkok",name:"曼谷",en:"Bangkok, Thailand",country:"泰國",region:"asia",distance:"short",budget:1,days:[4,7],vibes:["food","city","surprise"],safety:3,elderly:3,kids:3,walk:3,climate:["warm","any"],icon:"🛺",hero:"https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85"},
{id:"chiangmai",name:"清邁",en:"Chiang Mai, Thailand",country:"泰國",region:"asia",distance:"short",budget:1,days:[4,8],vibes:["heal","nature","food"],safety:4,elderly:4,kids:4,walk:2,climate:["warm","cool","any"],icon:"🌿",hero:"https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=900&q=85"},
{id:"phuket",name:"布吉",en:"Phuket, Thailand",country:"泰國",region:"asia",distance:"short",budget:2,days:[4,8],vibes:["relax","nature"],safety:3,elderly:3,kids:4,walk:2,climate:["warm","any"],icon:"🏖️",hero:"https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=900&q=85"},
{id:"danang",name:"峴港",en:"Da Nang, Vietnam",country:"越南",region:"asia",distance:"short",budget:1,days:[4,8],vibes:["relax","nature","food"],safety:4,elderly:4,kids:4,walk:2,climate:["warm","any"],icon:"🌅",hero:"https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=85"},
{id:"singapore",name:"新加坡",en:"Singapore",country:"新加坡",region:"asia",distance:"short",budget:3,days:[3,6],vibes:["city","food"],safety:5,elderly:5,kids:5,walk:2,climate:["warm","any"],icon:"🌇",hero:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85"},
{id:"bali",name:"峇里島",en:"Bali, Indonesia",country:"印尼",region:"asia",distance:"short",budget:2,days:[5,9],vibes:["relax","nature","heal"],safety:3,elderly:3,kids:3,walk:2,climate:["warm","any"],icon:"🌺",hero:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85"},
{id:"paris",name:"巴黎",en:"Paris, France",country:"法國",region:"europe",distance:"long",budget:3,days:[6,14],vibes:["city","food","surprise"],safety:3,elderly:2,kids:3,walk:5,climate:["cool","any"],icon:"🗼",hero:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85"},
{id:"london",name:"倫敦",en:"London, UK",country:"英國",region:"europe",distance:"long",budget:3,days:[6,14],vibes:["city","food"],safety:4,elderly:3,kids:4,walk:4,climate:["cool","cold","any"],icon:"👑",hero:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85"},
{id:"rome",name:"羅馬",en:"Rome, Italy",country:"意大利",region:"europe",distance:"long",budget:3,days:[6,12],vibes:["city","food"],safety:3,elderly:2,kids:3,walk:5,climate:["warm","cool","any"],icon:"🏛️",hero:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=85"},
{id:"melbourne",name:"墨爾本",en:"Melbourne, Australia",country:"澳洲",region:"oceania",distance:"long",budget:3,days:[7,14],vibes:["city","food","nature"],safety:5,elderly:4,kids:4,walk:3,climate:["cool","any"],icon:"🚋",hero:"https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=900&q=85"},
{id:"sydney",name:"悉尼",en:"Sydney, Australia",country:"澳洲",region:"oceania",distance:"long",budget:3,days:[7,14],vibes:["city","nature","relax"],safety:5,elderly:4,kids:5,walk:3,climate:["warm","cool","any"],icon:"⛵",hero:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=85"},
{id:"newyork",name:"紐約",en:"New York, USA",country:"美國",region:"america",distance:"long",budget:3,days:[6,14],vibes:["city","food","surprise"],safety:3,elderly:2,kids:3,walk:5,climate:["cool","warm","any"],icon:"🗽",hero:"https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=85"},
{id:"vancouver",name:"溫哥華",en:"Vancouver, Canada",country:"加拿大",region:"america",distance:"long",budget:3,days:[7,14],vibes:["nature","city","heal"],safety:5,elderly:4,kids:4,walk:2,climate:["cool","cold","any"],icon:"🏔️",hero:"https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=900&q=85"},
{id:"dubai",name:"杜拜",en:"Dubai, UAE",country:"阿聯酋",region:"middleeast",distance:"long",budget:3,days:[4,8],vibes:["city","surprise","relax"],safety:5,elderly:5,kids:5,walk:2,climate:["warm","any"],icon:"🌆",hero:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85"}
];
const memoryPlaces=[
["日本","⛩️","https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=300&q=70"],
["韓國","🏯","https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=300&q=70"],
["泰國","🌄","https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=300&q=70"],
["台灣","🏮","https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=300&q=70"],
["新加坡","🦁","https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=300&q=70"],
["澳洲","🏛️","https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=300&q=70"],
["英國","🏰","https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=300&q=70"],
["法國","🗼","https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=70"],
["美國","🗽","https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=300&q=70"]
];
const boxColors=["#ef8f91","#66afe2","#f4bd58","#83be91","#aa91cd","#e89abb","#76bec3","#efa06c","#93c4a7","#de957d","#88add1","#a68ac3"];
const boxHints=["🦩","🏙️","🏔️","🍜","♨️","🌸","☃️","🌵","🌴","⛩️","🌍","👑"];
function go(id){$$(".screen").forEach(s=>s.classList.remove("active"));$("#"+id).classList.add("active");scrollTo({top:0,behavior:"smooth"})}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast._);toast._=setTimeout(()=>t.classList.remove("show"),1200)}
function sel(group,el){$$(group).forEach(x=>x.classList.remove("active"));el.classList.add("active")}
document.addEventListener("click",e=>{
 const g=e.target.closest("[data-go]"); if(g) go(g.dataset.go);
 const v=e.target.closest("[data-vibe]"); if(v){state.vibe=v.dataset.vibe;sel("[data-vibe]",v);setTimeout(()=>go("companion"),260)}
 const c=e.target.closest("[data-companion]"); if(c){state.companion=c.dataset.companion;sel("[data-companion]",c);setTimeout(()=>go("conditions"),260)}
 const d=e.target.closest("[data-days]"); if(d){state.days=+d.dataset.days;sel("[data-days]",d)}
 const dist=e.target.closest("[data-distance]"); if(dist){state.distance=dist.dataset.distance;sel("[data-distance]",dist)}
 const b=e.target.closest("[data-budget]"); if(b){state.budget=+b.dataset.budget;sel("[data-budget]",b)}
 const r=e.target.closest("[data-region]"); if(r){const val=r.dataset.region;if(val==="any"){state.regions=["any"];$$("[data-region]").forEach(x=>x.classList.remove("active"));r.classList.add("active")}else{state.regions=state.regions.filter(x=>x!=="any");r.classList.toggle("active");state.regions=r.classList.contains("active")?[...new Set([...state.regions,val])]:state.regions.filter(x=>x!==val);if(!state.regions.length)state.regions=["asia"]}}
 const q=e.target.closest("[data-q]"); if(q){const key=q.dataset.q,val=q.dataset.value;state.advanced[key]=val;q.closest(".qchips").querySelectorAll("button").forEach(x=>x.classList.remove("active"));q.classList.add("active")}
 const pc=e.target.closest("[data-place]"); if(pc){togglePlace(pc.dataset.place)}
 const bx=e.target.closest("[data-box]"); if(bx){state.selected=+bx.dataset.box;startReveal()}
});
function initDefaults(){$("[data-days='7']").classList.add("active");$("[data-distance='short']").classList.add("active");$("[data-budget='2']").classList.add("active");$("[data-region='asia']").classList.add("active")}
function advancedMarkup(){
 let html="";
 if(state.companion==="solo"||state.companion==="captain") html+=qgroup("自己飛，有冇一樣要特別留意？","safety",[["transport","交通方便"],["night","夜晚安全"],["language","語言容易"],["none","冇特別"]]);
 if(state.companion==="solo") html+=qgroup("獨遊資料（只用作安全配對）","gender",[["female","女"],["male","男"],["prefer-not","唔透露"]]);
 if(state.companion==="family"||state.companion==="captain"){html+=qgroup("屋企人同行有冇長者？","elderly",[["yes","有"],["no","冇"]]);html+=qgroup("有冇小朋友同行？","kids",[["yes","有"],["no","冇"]]);html+=qgroup("步行／無障礙需要","access",[["low-walk","唔想行太多"],["step-free","少樓梯／Step-free"],["wheelchair","輪椅友善"],["none","冇特別"]])}
 html+=qgroup("可唔可以接受轉機？","transfer",[["no","最好直航"],["yes","可以轉機"]]);
 html+=qgroup("旅行節奏","pace",[["slow","Hea 遊"],["medium","適中"],["fast","密集型"]]);
 html+=qgroup("天氣偏好","weather",[["warm","鍾意暖"],["cool","涼爽"],["cold","想凍／睇雪"],["any","冇所謂"]]);
 html+=qgroup("每日步行量","walk",[["low","少啲行"],["medium","普通"],["high","行多啲都得"]]);
 html+=qgroup("飲食限制","diet",[["none","冇"],["vegetarian","素食"],["halal","清真"],["allergy","有食物敏感"]]);
 return html
}
function qgroup(title,key,opts){return `<div class="qgroup"><h4>${title}</h4><div class="qchips">${opts.map(([v,t])=>`<button data-q="${key}" data-value="${v}" class="${state.advanced[key]===v?"active":""}">${t}</button>`).join("")}</div></div>`}
$("#conditionsNext").onclick=()=>{$("#conditionalQuestions").innerHTML=advancedMarkup();$("#advancedSheet").classList.add("show")}
$("#sheetClose").onclick=()=>$("#advancedSheet").classList.remove("show");
$("#advancedDone").onclick=()=>{$("#advancedSheet").classList.remove("show");renderPlaceGrid();go("visited")};
$("#modeVisited").onclick=()=>{state.memoryMode="visited";$("#modeVisited").classList.add("active");$("#modeExcluded").classList.remove("active")};
$("#modeExcluded").onclick=()=>{state.memoryMode="excluded";$("#modeExcluded").classList.add("active");$("#modeVisited").classList.remove("active")};
$("#placeSearch").oninput=()=>renderPlaceGrid($("#placeSearch").value.trim());
function togglePlace(name){const target=state.memoryMode==="visited"?state.visited:state.excluded,other=state.memoryMode==="visited"?state.excluded:state.visited;const oi=other.indexOf(name);if(oi>=0)other.splice(oi,1);const i=target.indexOf(name);if(i>=0)target.splice(i,1);else target.push(name);renderPlaceGrid($("#placeSearch").value.trim())}
function renderPlaceGrid(filter=""){const grid=$("#placeGrid");const list=memoryPlaces.slice(0,9);grid.innerHTML=list.map(([name])=>{const v=state.visited.includes(name),x=state.excluded.includes(name);return `<button class="master-place-hit ${v?"visited":""} ${x?"excluded":""}" data-place="${name}" aria-label="${name}"></button>`}).join("");$("#visitedCount").textContent=state.visited.length;$("#excludedCount").textContent=state.excluded.length}
$("#memoryNext").onclick=()=>{buildPool();go("boxes")};
function score(p){if(state.excluded.includes(p.country))return-9999;let s=0;if(state.regions.includes("any")||state.regions.includes(p.region))s+=26;else s-=12;if(state.distance===p.distance)s+=24;else s-=10;s+=12-Math.abs(state.budget-p.budget)*6;if(state.days>=p.days[0]&&state.days<=p.days[1])s+=18;else s-=Math.min(14,Math.abs(state.days-(p.days[0]+p.days[1])/2)*2);if(p.vibes.includes(state.vibe))s+=30;if(state.vibe==="surprise")s+=10;const a=state.advanced;if(a.weather!=="any"&&p.climate.includes(a.weather))s+=8;if(a.walk==="low")s-=p.walk*3;if(a.walk==="high")s+=p.walk*2;if(a.elderly==="yes")s+=p.elderly*4;if(a.kids==="yes")s+=p.kids*4;if(a.safety==="night")s+=p.safety*4;if(state.visited.includes(p.country))s-=36;const recent=JSON.parse(localStorage.getItem("flw_recent")||"[]"),ix=recent.indexOf(p.id);if(ix>=0)s-=Math.max(10,34-ix*4);return s+Math.random()*8}
function buildPool(){const ranked=places.map(p=>({p,s:score(p)})).filter(x=>x.s>-9000).sort((a,b)=>b.s-a.s);const chosen=[],countries={};for(const x of ranked){if((countries[x.p.country]||0)>=3)continue;chosen.push(x.p);countries[x.p.country]=(countries[x.p.country]||0)+1;if(chosen.length===12)break}ranked.forEach(x=>{if(chosen.length<12&&!chosen.includes(x.p))chosen.push(x.p)});state.pool=chosen.sort(()=>Math.random()-.5);renderBoxes()}
function renderBoxes(){
   const grid=$("#boxGrid");
   grid.innerHTML=state.pool.slice(0,12).map((p,i)=>`<button class="master-box-hit" data-box="${i}" aria-label="盲盒 ${i+1}"></button>`).join("");
 }
 function startReveal(){
   go("reveal");
   confetti();
   setTimeout(()=>{
     state.result=state.pool[state.selected]||state.pool[0]||places[0];
     rememberRecent();
     renderResult();
     go("result");
   },2850)
 }
 function confetti(){const f=$("#confettiField");f.innerHTML="";for(let i=0;i<45;i++){const n=document.createElement("i");n.style.left=Math.random()*100+"%";n.style.background=boxColors[i%boxColors.length];n.style.animationDelay=Math.random()*.55+"s";f.appendChild(n)}}
function rememberRecent(){let a=JSON.parse(localStorage.getItem("flw_recent")||"[]");a=[state.result.id,...a.filter(x=>x!==state.result.id)].slice(0,12);localStorage.setItem("flw_recent",JSON.stringify(a))}
function renderResult(){
   const p=state.result||places[0];
   $("#result").setAttribute("aria-label",`旅行結果：${p.name} ${p.en}`);
   $("#resultCity").textContent=p.name;
   $("#resultEn").textContent=p.en;
   const reasons=[];
   if(p.vibes.includes(state.vibe))reasons.push("最啱你今次揀嘅旅程類型");
   if(state.distance===p.distance)reasons.push(state.distance==="short"?"航程符合你想要嘅短途節奏":"你接受長途，呢個目的地值得飛遠少少");
   if(state.days>=p.days[0]&&state.days<=p.days[1])reasons.push("同你預留嘅旅行日數幾吻合");
   if(!state.visited.includes(p.country))reasons.push("今次冇被你標記做已去過／排除");
   if(state.advanced.elderly==="yes"&&p.elderly>=4)reasons.push("有長者同行時較容易安排舒服行程");
   if(state.advanced.kids==="yes"&&p.kids>=4)reasons.push("親子友善度較高");
   while(reasons.length<4)reasons.push(["美食、文化同體驗夠豐富","交通同旅遊配套相對方便","整體配對分數喺候選池中較高","有少少驚喜，又唔會太離地"][reasons.length]);
   $("#reasons").innerHTML=reasons.slice(0,4).map(r=>`<li>✅ ${r}</li>`).join("");
 }
 $("#reroll").onclick=()=>{buildPool();go("boxes")};
$("#saveResult").onclick=()=>{if(!state.result)return;let a=JSON.parse(localStorage.getItem("flw_saved")||"[]");if(!a.includes(state.result.id))a.push(state.result.id);localStorage.setItem("flw_saved",JSON.stringify(a));$("#saveResult").classList.add("saved");toast("幫你記低咗 ❤️")};
initDefaults();renderPlaceGrid();