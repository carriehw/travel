/* 飛啦喂！ v20 core game engine
 * Pure logic only. No DOM / no network / no UI.
 * Golden rule: gameplay choices must affect the recommendation result.
 */
(function(root){
  "use strict";

  const TRAIT_ALIASES={
    food:["food"],
    nature:["nature"],
    shopping:["shopping","city"],
    nightlife:["nightlife","city"],
    hot_spring:["onsen","heal"],
    beach:["beach","relax"],
    culture:["culture","city"],
    chill:["relax","heal"]
  };

  const VETO_RULES={
    too_cold:(d)=>Array.isArray(d.climate)&&d.climate.includes("cold"),
    too_hot:(d)=>Array.isArray(d.climate)&&d.climate.includes("warm"),
    long_flight:(d)=>d.distance==="long",
    expensive:(d)=>Number(d.budget)>=3,
    crowded:(d)=>Array.isArray(d.traits)&&d.traits.includes("crowded"),
    packed:(d)=>Array.isArray(d.traits)&&d.traits.includes("packed"),
    transfer:(d)=>d.requiresTransfer===true,
    self_drive:(d)=>d.selfDriveRecommended===true
  };

  function uniq(arr){return [...new Set((arr||[]).filter(Boolean))]}
  function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
  function safeJSON(v,fallback){try{return JSON.parse(v)}catch{return fallback}}

  function normalizePlayers(players){
    return (players||[]).map((p,i)=>({
      id:p.id||`p${i+1}`,
      nickname:(p.nickname||`Player ${i+1}`).trim(),
      mustHave:p.mustHave||null,
      veto:p.veto||null
    }));
  }

  function destinationTraits(d){
    return uniq([...(d.traits||[]),...(d.vibes||[])]);
  }

  function matchesMustHave(d,mustHave){
    if(!mustHave) return false;
    const traits=destinationTraits(d);
    const wanted=TRAIT_ALIASES[mustHave]||[mustHave];
    return wanted.some(x=>traits.includes(x));
  }

  function hitsVeto(d,veto){
    if(!veto) return false;
    const fn=VETO_RULES[veto];
    return fn?!!fn(d):destinationTraits(d).includes(veto);
  }

  function scoreDestination(d,ctx){
    const s=ctx||{};
    if((s.excluded||[]).includes(d.country)|| (s.excludedIds||[]).includes(d.id)) return -99999;
    if((s.visited||[]).includes(d.country)|| (s.visitedIds||[]).includes(d.id)) return -99999;

    let score=0;
    const reasons=[];

    if((s.regions||[]).includes("any")||(s.regions||[]).includes(d.region)){
      score+=22; reasons.push("region");
    }else if((s.regions||[]).length){score-=10}

    if(s.distance){
      if(s.distance===d.distance){score+=20;reasons.push("distance")}
      else score-=10;
    }

    if(Number.isFinite(Number(s.budget))){
      const diff=Math.abs(Number(s.budget)-Number(d.budget||2));
      score+=Math.max(-8,12-diff*6);
      if(diff===0) reasons.push("budget");
    }

    if(Number.isFinite(Number(s.days))&&Array.isArray(d.days)){
      if(s.days>=d.days[0]&&s.days<=d.days[1]){score+=16;reasons.push("days")}
      else score-=Math.min(14,Math.abs(s.days-((d.days[0]+d.days[1])/2))*2);
    }

    if(s.vibe&&s.vibe!=="surprise"){
      if(destinationTraits(d).includes(s.vibe)){score+=24;reasons.push("vibe")}
      else score-=5;
    }else if(s.vibe==="surprise"){score+=6}

    const players=normalizePlayers(s.players);
    for(const p of players){
      if(matchesMustHave(d,p.mustHave)){score+=18;reasons.push(`must:${p.id}`)}
      if(hitsVeto(d,p.veto)) score-=60;
    }

    for(const card of (s.wildCards||[])){
      if(card==="new_place" && !(s.visited||[]).includes(d.country)){score+=12;reasons.push("wild:new_place")}
      if(card==="food_frenzy" && matchesMustHave(d,"food")){score+=14;reasons.push("wild:food")}
      if(card==="extra_distance" && d.distance==="long"){score+=10;reasons.push("wild:distance")}
      if(card==="budget_flex" && Number(d.budget)<=Number(s.budget||2)+1){score+=8;reasons.push("wild:budget")}
    }

    const recent=s.recentResults||[];
    const ix=recent.indexOf(d.id);
    if(ix===0) score-=45;
    else if(ix>0) score-=Math.max(8,28-ix*3);

    return {score,reasons:uniq(reasons)};
  }

  function rankDestinations(destinations,ctx){
    return (destinations||[])
      .map(d=>({destination:d,...scoreDestination(d,ctx)}))
      .filter(x=>x.score>-90000)
      .sort((a,b)=>b.score-a.score);
  }

  function buildMysteryCandidates(destinations,ctx,count=6){
    const ranked=rankDestinations(destinations,ctx);
    const pool=[];
    const countryCount={};

    for(const item of ranked){
      const c=item.destination.country||"";
      if((countryCount[c]||0)>=2) continue;
      pool.push(item);
      countryCount[c]=(countryCount[c]||0)+1;
      if(pool.length>=count) break;
    }

    if(pool.length<count){
      for(const item of ranked){
        if(pool.some(x=>x.destination.id===item.destination.id)) continue;
        pool.push(item);
        if(pool.length>=count) break;
      }
    }

    return pool;
  }

  function eliminate(candidates,destinationIds){
    const gone=new Set(destinationIds||[]);
    return (candidates||[]).filter(x=>!gone.has((x.destination||x).id));
  }

  function makeClues(d){
    const traits=destinationTraits(d);
    const clueTraits=traits.filter(x=>["food","nature","city","relax","heal","beach","culture","shopping","nightlife","onsen"].includes(x));
    return {
      flight:d.distance==="short"?"短途機程":"長途機程",
      budget:"$".repeat(clamp(Number(d.budget||2),1,3)),
      climate:Array.isArray(d.climate)?d.climate.filter(x=>x!=="any")[0]||"any":"any",
      experience:clueTraits[0]||"surprise"
    };
  }

  function seededShuffle(items,rng){
    const a=[...(items||[])];
    const random=typeof rng==="function"?rng:Math.random;
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function mapFinalThreeToTwelve(finalThree,rng){
    const ids=(finalThree||[]).map(x=>(x.destination||x).id).filter(Boolean);
    if(ids.length!==3) throw new Error("Exactly 3 final destinations are required.");
    const mapping=[];
    ids.forEach(id=>{for(let i=0;i<4;i++) mapping.push(id)});
    return seededShuffle(mapping,rng);
  }

  function selectBlindBox(mapping,index){
    if(!Array.isArray(mapping)||mapping.length!==12) throw new Error("Blind-box mapping must contain 12 entries.");
    if(!Number.isInteger(index)||index<0||index>11) throw new Error("Blind-box index must be 0–11.");
    return mapping[index];
  }

  function buildResultReasons(destination,ctx){
    const reasons=[];
    const players=normalizePlayers(ctx.players);

    const mustMatches=players.filter(p=>matchesMustHave(destination,p.mustHave));
    if(mustMatches.length){
      reasons.push(`${mustMatches.length} 位玩家嘅 Must-have 命中呢個目的地`);
    }

    const vetoHits=players.filter(p=>hitsVeto(destination,p.veto));
    if(players.length && !vetoHits.length){
      reasons.push("冇撞中任何玩家嘅封殺條件");
    }

    if(ctx.distance===destination.distance){
      reasons.push("機程距離符合你哋今次設定");
    }

    if(Number.isFinite(Number(ctx.days))&&Array.isArray(destination.days)&&ctx.days>=destination.days[0]&&ctx.days<=destination.days[1]){
      reasons.push("旅行日數同呢個地方嘅建議停留時間吻合");
    }

    if(Number.isFinite(Number(ctx.budget))&&Math.abs(Number(ctx.budget)-Number(destination.budget||2))<=1){
      reasons.push("預算範圍配合到你哋今次玩法");
    }

    if(ctx.vibe&&destinationTraits(destination).includes(ctx.vibe)){
      reasons.push("旅程氣氛同你哋揀嘅玩法一致");
    }

    if(!(ctx.visited||[]).includes(destination.country)){
      reasons.push("未被標記做已去過地方");
    }

    return uniq(reasons).slice(0,4);
  }

  const api={
    normalizePlayers,
    destinationTraits,
    matchesMustHave,
    hitsVeto,
    scoreDestination,
    rankDestinations,
    buildMysteryCandidates,
    eliminate,
    makeClues,
    mapFinalThreeToTwelve,
    selectBlindBox,
    buildResultReasons,
    safeJSON
  };

  root.FLWGameEngine=api;
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
})(typeof globalThis!=="undefined"?globalThis:this);
