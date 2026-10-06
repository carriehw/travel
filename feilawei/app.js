const state={vibe:"surprise",companion:"captain",selected:null};

const destinations=[
{name:"京都",en:"Kyoto, Japan",visual:"🏯",reasons:["最啱你偏好嘅文化＋美食體驗","適合你現時想要嘅旅遊節奏","過去未去過呢個地區","天氣同季節都幾適合出發"]},
{name:"福岡",en:"Fukuoka, Japan",visual:"🍜",reasons:["美食同城市節奏都好啱你","短途又方便","適合朋友或二人旅行","行程容易安排得輕鬆"]},
{name:"釜山",en:"Busan, Korea",visual:"🌊",reasons:["海景同美食一次滿足","城市感冇咁壓迫","好適合朋友一齊玩","可以慢慢探索"]},
{name:"台南",en:"Tainan, Taiwan",visual:"🏮",reasons:["慢活文化感好強","地道小食多","適合想放鬆又想探索","旅程節奏舒服"]},
{name:"清邁",en:"Chiang Mai, Thailand",visual:"🌿",reasons:["自然同文化平衡得好","適合放空 Recharge","Cafe 同慢活元素豐富","整體性價比高"]},
{name:"札幌",en:"Sapporo, Japan",visual:"❄️",reasons:["自然風景強","美食體驗豐富","季節感明顯","適合想有驚喜感嘅旅程"]},
{name:"新加坡",en:"Singapore",visual:"🌇",reasons:["交通方便","美食選擇多","城市乾淨易玩","適合家庭同行"]},
{name:"沖繩",en:"Okinawa, Japan",visual:"🌴",reasons:["海島放鬆感強","適合慢慢玩","親子友善","陽光感滿分"]},
{name:"曼谷",en:"Bangkok, Thailand",visual:"🛺",reasons:["Shopping 同美食都強","朋友旅行好玩","性價比高","城市活動夠多"]},
{name:"峴港",en:"Da Nang, Vietnam",visual:"🌅",reasons:["海灘同 Resort 感夠","容易放鬆","預算友善","適合二人或朋友"]},
{name:"墨爾本",en:"Melbourne, Australia",visual:"🚋",reasons:["Cafe 文化非常適合你","城市探索感強","周邊自然景色多","長途旅行值得"]},
{name:"峇里島",en:"Bali, Indonesia",visual:"🌺",reasons:["放鬆感最強","自然景觀豐富","浪漫又適合朋友","開盲盒驚喜感高"]}
];

const colors=["#f28d8f","#66aee0","#f3be56","#80bd8d","#ad92cd","#e69abb","#78bfc3","#efa16b","#95c4a7","#df957d","#8aaed2","#a78ac4"];
const hints=["🏝️","🏙️","🏔️","🍜","♨️","🌸","❄️","🌍","☀️","🏯","🚋","👑"];

function go(id){
 document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",e=>{
 const g=e.target.closest("[data-go]"); if(g) go(g.dataset.go);
 const v=e.target.closest("[data-vibe]"); if(v){
   state.vibe=v.dataset.vibe;
   document.querySelectorAll("[data-vibe]").forEach(x=>x.classList.remove("active")); v.classList.add("active");
   setTimeout(()=>go("companion"),180);
 }
 const c=e.target.closest("[data-companion]"); if(c){
   state.companion=c.dataset.companion;
   document.querySelectorAll("[data-companion]").forEach(x=>x.classList.remove("active")); c.classList.add("active");
   setTimeout(()=>go("boxes"),180);
 }
 const b=e.target.closest("[data-box]"); if(b){
   state.selected=+b.dataset.box;
   go("reveal");
   setTimeout(()=>showResult(),2200);
 }
});

function buildBoxes(){
 const grid=document.getElementById("boxGrid");
 grid.innerHTML=destinations.map((d,i)=>`<button class="blindbox" data-box="${i}" style="background:${colors[i]}">?<span>${hints[i]}</span></button>`).join("");
}
function showResult(){
 const d=destinations[state.selected??0];
 document.getElementById("cityName").textContent=d.name;
 document.getElementById("cityEn").textContent=d.en;
 document.getElementById("reasonList").innerHTML=d.reasons.map(x=>`<li>✅ ${x}</li>`).join("");
 go("result");
 confetti();
}
function confetti(){
 for(let i=0;i<36;i++){
   const n=document.createElement("i");
   n.style.cssText=`position:fixed;z-index:99;top:-20px;left:${Math.random()*100}vw;width:10px;height:16px;background:${colors[i%colors.length]};animation:fall 1.6s linear ${Math.random()*.4}s forwards`;
   document.body.appendChild(n);setTimeout(()=>n.remove(),2400);
 }
}
const style=document.createElement("style");style.textContent="@keyframes fall{to{transform:translateY(110vh) rotate(600deg)}}";document.head.appendChild(style);
buildBoxes();
