/* Minimal zero-dependency tests for game-engine.js */
const G=require("../game-engine.js");

function assert(cond,msg){if(!cond)throw new Error(msg)}
function eq(a,b,msg){assert(JSON.stringify(a)===JSON.stringify(b),msg+`\nExpected: ${JSON.stringify(b)}\nActual: ${JSON.stringify(a)}`)}

const destinations=[
 {id:"a",country:"A",region:"asia",distance:"short",budget:2,days:[3,7],vibes:["food","city"],traits:["culture"],climate:["cool"]},
 {id:"b",country:"B",region:"asia",distance:"short",budget:2,days:[3,7],vibes:["nature"],traits:["beach","relax"],climate:["warm"]},
 {id:"c",country:"C",region:"europe",distance:"long",budget:3,days:[6,10],vibes:["city"],traits:["shopping","nightlife"],climate:["cool"]},
 {id:"d",country:"D",region:"asia",distance:"short",budget:1,days:[3,5],vibes:["food"],traits:["heal"],climate:["warm"]},
 {id:"e",country:"E",region:"asia",distance:"short",budget:2,days:[4,8],vibes:["nature"],traits:["onsen","heal"],climate:["cold"]},
 {id:"f",country:"F",region:"asia",distance:"short",budget:2,days:[4,8],vibes:["city"],traits:["culture"],climate:["cool"]},
 {id:"g",country:"G",region:"asia",distance:"short",budget:2,days:[4,8],vibes:["food"],traits:["shopping"],climate:["cool"]}
];

const ctx={
 regions:["asia"],distance:"short",budget:2,days:5,vibe:"food",
 players:[
  {id:"p1",nickname:"A",mustHave:"food",veto:"long_flight"},
  {id:"p2",nickname:"B",mustHave:"culture",veto:"too_hot"}
 ],
 visited:[],excluded:[],recentResults:[]
};

assert(G.scoreDestination(destinations[0],ctx).score>G.scoreDestination(destinations[2],ctx).score,"short Asia food destination should outrank long Europe destination");

const blocked=G.scoreDestination(destinations[1],ctx);
assert(blocked.score<G.scoreDestination(destinations[0],ctx).score,"warm destination should be strongly penalized by too_hot veto");

const six=G.buildMysteryCandidates(destinations,ctx,6);
eq(six.length,6,"should produce six mystery candidates when enough destinations exist");

const after=G.eliminate(six,[six[0].destination.id,six[1].destination.id]);
eq(after.length,4,"round 1 should reduce 6 to 4");

const final3=after.slice(0,3);
const seq=[0.1,0.7,0.2,0.8,0.3,0.9,0.4,0.6,0.5,0.05,0.95,0.15];
let i=0;
const mapping=G.mapFinalThreeToTwelve(final3,()=>seq[i++%seq.length]);
eq(mapping.length,12,"mapping should contain 12 boxes");
for(const id of final3.map(x=>x.destination.id)){
  eq(mapping.filter(x=>x===id).length,4,"each final destination should own exactly 4 boxes");
}
assert(final3.map(x=>x.destination.id).includes(G.selectBlindBox(mapping,0)),"selected box must resolve to one of final three");

const reasons=G.buildResultReasons(destinations[0],ctx);
assert(reasons.length>=3,"result should explain at least 3 grounded reasons");

console.log("PASS game-engine tests");
