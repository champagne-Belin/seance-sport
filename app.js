'use strict';
/* ====== Poses : H tête, N cou/épaule, P hanche, E coude, W main, K1/A1 jambe avant, K2/A2 jambe arrière ====== */
const pose=(H,N,P,E,W,K1,A1,K2,A2)=>({H,N,P,E,W,K1,A1,K2,A2});
const STAND_LEGS=[[102,140],[100,175],[98,140],[96,175]];
const PLANK_UP=pose([163,118],[150,125],[109,143],[150,150],[150,175],[76,156],[44,172],[76,156],[44,172]);
const SQUAT_HANDS=pose([116,118],[105,125],[78,150],[115,148],[125,172],[108,142],[95,175],[104,142],[93,175]);

const PRESS=[pose([100,46],[100,60],[100,105],[110,82],[108,60],...STAND_LEGS),
             pose([100,46],[100,60],[100,105],[112,36],[106,14],...STAND_LEGS)];
const SESSION_A=[
 {name:'Squats avec poids',weight:true,foot:true,seg:1.1,
  tip:'Haltère contre la poitrine, dos droit, descendez les hanches vers l’arrière.',
  frames:[pose([100,46],[100,60],[100,105],[104,82],[112,68],...STAND_LEGS),
          pose([103,90],[98,104],[84,146],[104,124],[114,108],[118,143],[100,175],[114,143],[96,175])]},
 {name:'Fentes',weight:true,foot:true,seg:1.1,
  tip:'Un grand pas en avant, genou arrière vers le sol, buste bien droit.',
  frames:[pose([100,46],[100,60],[100,105],[100,86],[100,108],[108,140],[112,175],[92,140],[88,175]),
          pose([92,66],[92,80],[92,125],[95,102],[97,124],[122,140],[125,175],[75,155],[46,172])]},
 {name:'Rowing',weight:true,foot:true,seg:0.9,
  tip:'Buste penché, dos plat, tirez le coude vers la hanche.',
  frames:[pose([127,83],[115,90],[75,115],[116,114],[118,140],[90,145],[80,175],[95,146],[86,175]),
          pose([127,83],[115,90],[75,115],[92,108],[108,116],[90,145],[80,175],[95,146],[86,175])]},
 {name:'Pompes',weight:false,foot:false,seg:0.9,
  tip:'Corps aligné de la tête aux talons, poitrine vers le sol.',
  frames:[PLANK_UP,
          pose([165,157],[150,160],[105,165],[132,152],[150,175],[70,169],[36,173],[70,169],[36,173])]},
 {name:'Devil press',spoken:'Dévil presse',weight:true,foot:false,seg:0.7,
  tip:'Haltères au sol, planche, jambes sous vous, puis projetez les haltères au-dessus de la tête.',
  frames:[pose([100,46],[100,60],[100,105],[100,85],[100,108],...STAND_LEGS),
          SQUAT_HANDS,PLANK_UP,SQUAT_HANDS,
          pose([100,44],[100,58],[100,103],[106,36],[102,14],[102,138],[100,173],[98,138],[96,173])]},
 {name:'Planche',weight:false,foot:false,seg:1.6,
  tip:'Sur les avant-bras, corps gainé en ligne droite, respiration calme.',
  frames:[pose([144,142],[130,148],[86,158],[130,172],[155,172],[52,167],[20,174],[52,167],[20,174]),
          pose([144,141],[130,147],[86,155],[130,172],[155,172],[52,165],[20,174],[52,165],[20,174])]}
];

const CHAIR=[{x:66,y:140,w:34,h:35}];
const SESSION_B=[
 {name:'Soulevé de terre roumain',spoken:'Soulevé de terre roumain',weight:true,foot:true,seg:1.2,
  tip:'Haltères le long des cuisses, hanches vers l’arrière, dos plat, remontez en serrant les fessiers.',
  frames:[pose([100,46],[100,60],[100,105],[100,86],[100,108],[108,140],[112,175],[92,140],[88,175]),
          pose([126,90],[112,95],[70,115],[113,115],[113,140],[82,146],[84,175],[86,146],[88,175])]},
 {name:'Pont fessier avec poids',weight:true,foot:true,seg:1.1,
  tip:'Sur le dos, haltère sur les hanches, poussez les talons et montez le bassin en serrant les fessiers.',
  frames:[pose([38,166],[55,168],[100,168],[75,166],[98,160],[122,140],[140,172],[126,142],[144,172]),
          pose([48,168],[62,166],[100,138],[80,152],[100,130],[133,140],[135,172],[137,142],[139,172])]},
 {name:'Rowing à un bras',spoken:'Rowing à un bras',weight:true,foot:true,seg:0.9,switchSide:true,
  tip:'Pied avant décalé, buste penché, tirez le coude vers la hanche. Changez de bras à la moitié.',
  frames:[pose([127,83],[115,90],[75,115],[116,114],[118,140],[92,145],[105,175],[70,148],[52,172]),
          pose([127,83],[115,90],[75,115],[92,106],[108,114],[92,145],[105,175],[70,148],[52,172])]},
 {name:'Développé épaules',weight:true,foot:true,seg:1.0,
  tip:'Haltères aux épaules, poussez vers le haut, gainage serré.',
  frames:PRESS},
 {name:'Dips sur chaise',weight:false,foot:true,seg:1.0,decor:CHAIR,
  tip:'Mains sur le bord d’une chaise solide, fléchissez les coudes vers l’arrière, poussez pour remonter.',
  frames:[pose([86,78],[90,92],[104,137],[89,116],[88,140],[136,152],[166,172],[138,154],[168,174]),
          pose([90,103],[94,117],[106,160],[74,125],[88,140],[138,165],[168,175],[140,166],[170,175])]},
 {name:'Mountain climbers',spoken:'Mountain climbers',weight:false,foot:false,seg:0.35,
  tip:'Position de pompe, ramenez les genoux vers la poitrine en alternance, rythme soutenu.',
  frames:[pose([163,118],[150,125],[109,143],[150,150],[150,175],[140,152],[118,174],[76,156],[44,172]),
          pose([163,118],[150,125],[109,143],[150,150],[150,175],[76,156],[44,172],[140,152],[118,174])]}
];
const SESSIONS={
  A:{label:'Séance A',sub:'Corps entier',exercises:SESSION_A},
  B:{label:'Séance B',sub:'Fessiers, dos, triceps',exercises:SESSION_B}
};
let EXERCISES=SESSION_A;

/* ====== Dessin ====== */
const NS='http://www.w3.org/2000/svg';
const el=(n,a={})=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;};
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>(1-Math.cos(Math.PI*t))/2;
const KEYS=['H','N','P','E','W','K1','A1','K2','A2'];
function mix(p,q,t){const r={};for(const k of KEYS)r[k]=[lerp(p[k][0],q[k][0],t),lerp(p[k][1],q[k][1],t)];return r;}

function buildFigure(svg,ex){
  svg.innerHTML='';
  const parts={};
  svg.appendChild(el('line',{x1:10,y1:178,x2:190,y2:178,stroke:'#33475b','stroke-width':3,'stroke-linecap':'round'}));
  if(ex&&ex.decor)ex.decor.forEach(d=>svg.appendChild(el('rect',{x:d.x,y:d.y,width:d.w,height:d.h,rx:3,fill:'#2f4358'})));
  const g=el('g',{fill:'none','stroke-linecap':'round','stroke-linejoin':'round'});
  const mk=(id,color,w)=>{parts[id]=el('polyline',{stroke:color,'stroke-width':w});g.appendChild(parts[id]);};
  mk('legB','#5f7a94',7); mk('foot2','#5f7a94',6);
  mk('legF','#cfe0f0',8); mk('foot1','#cfe0f0',6);
  mk('torso','#eef5fb',10);
  mk('arm','#ffd166',7);
  parts.head=el('circle',{r:11,fill:'#eef5fb'}); g.appendChild(parts.head);
  parts.db=el('line',{stroke:'#ff6b6b','stroke-width':6}); g.appendChild(parts.db);
  parts.dbL=el('line',{stroke:'#ff6b6b','stroke-width':3}); g.appendChild(parts.dbL);
  svg.appendChild(g);
  return parts;
}
const pt=a=>a[0].toFixed(1)+','+a[1].toFixed(1);
function drawPose(parts,p,ex){
  parts.torso.setAttribute('points',pt(p.N)+' '+pt(p.P));
  parts.arm.setAttribute('points',pt(p.N)+' '+pt(p.E)+' '+pt(p.W));
  parts.legF.setAttribute('points',pt(p.P)+' '+pt(p.K1)+' '+pt(p.A1));
  parts.legB.setAttribute('points',pt(p.P)+' '+pt(p.K2)+' '+pt(p.A2));
  const f=ex.foot?9:0;
  parts.foot1.setAttribute('points',pt(p.A1)+' '+(p.A1[0]+f)+','+p.A1[1]);
  parts.foot2.setAttribute('points',pt(p.A2)+' '+(p.A2[0]+f)+','+p.A2[1]);
  parts.head.setAttribute('cx',p.H[0]);parts.head.setAttribute('cy',p.H[1]);
  if(ex.weight){
    parts.db.setAttribute('x1',p.W[0]-10);parts.db.setAttribute('x2',p.W[0]+10);
    parts.db.setAttribute('y1',p.W[1]);parts.db.setAttribute('y2',p.W[1]);
    parts.dbL.setAttribute('x1',p.W[0]-10);parts.dbL.setAttribute('x2',p.W[0]+10);
    parts.dbL.setAttribute('y1',p.W[1]);parts.dbL.setAttribute('y2',p.W[1]);
    parts.db.style.display='';parts.dbL.style.display='';
  }else{parts.db.style.display='none';parts.dbL.style.display='none';}
}
function poseAt(ex,t){
  const n=ex.frames.length,ph=(t/ex.seg)%n,i=Math.floor(ph);
  return mix(ex.frames[i],ex.frames[(i+1)%n],ease(ph-i));
}
const fig={parts:null,ex:null,raf:0,t0:0};
function showFigure(ex,animate){
  const svg=document.getElementById('fig');
  fig.parts=buildFigure(svg,ex);
  fig.ex=ex;fig.t0=performance.now();
  cancelAnimationFrame(fig.raf);
  const loop=now=>{
    drawPose(fig.parts,poseAt(ex,Math.max(0,now-fig.t0)/1000),ex);
    if(animate)fig.raf=requestAnimationFrame(loop);
  };
  loop(performance.now());
  if(animate)fig.raf=requestAnimationFrame(loop);
}

/* ====== Réglages ====== */
const DEF={work:40,rest:20,roundRest:80,rounds:4,prep:10,voice:true,sound:true,vibe:true,music:'electro',musicVol:60,session:'A',who:''};
let cfg=Object.assign({},DEF,(()=>{try{return JSON.parse(localStorage.getItem('seance-cfg'))||{}}catch(e){return{}}})());
const $=id=>document.getElementById(id);
const save=()=>{try{localStorage.setItem('seance-cfg',JSON.stringify(cfg))}catch(e){}};
function bindCfg(id,key,isNum){
  const i=$(id);
  if(isNum){i.value=cfg[key];i.addEventListener('change',()=>{let v=parseInt(i.value,10);if(isNaN(v)||v<+i.min)v=+i.min;if(v>+i.max)v=+i.max;i.value=v;cfg[key]=v;save();renderHome();});}
  else{i.checked=cfg[key];i.addEventListener('change',()=>{cfg[key]=i.checked;save();});}
}
bindCfg('cfgWork','work',1);bindCfg('cfgRest','rest',1);bindCfg('cfgRoundRest','roundRest',1);
bindCfg('cfgRounds','rounds',1);bindCfg('cfgPrep','prep',1);
$('cfgMusic').value=cfg.music;$('cfgMusic').addEventListener('change',()=>{cfg.music=$('cfgMusic').value;save();musicChanged();});
$('cfgMusicVol').value=cfg.musicVol;$('cfgMusicVol').addEventListener('input',()=>{cfg.musicVol=+$('cfgMusicVol').value;save();applyMusicVol();});
bindCfg('cfgVoice','voice');bindCfg('cfgSound','sound');bindCfg('cfgVibe','vibe');

function applySession(){EXERCISES=(SESSIONS[cfg.session]||SESSIONS.A).exercises;}
applySession();
const APP_VERSION='7';

/* ====== Utilitaires ====== */
const spoken=ex=>ex.spoken||ex.name;
const fmt=s=>{s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
function spokenDuration(s){
  const m=Math.floor(s/60),r=s%60;
  const parts=[];
  if(m)parts.push(m+(m>1?' minutes':' minute'));
  if(r)parts.push(r+' secondes');
  return parts.join(' ')||'0 seconde';
}
function buildSteps(){
  const s=[];const n=EXERCISES.length;
  if(cfg.prep>0)s.push({type:'prep',ex:0,round:0,dur:cfg.prep});
  for(let r=0;r<cfg.rounds;r++){
    for(let i=0;i<n;i++){
      s.push({type:'work',ex:i,round:r,dur:cfg.work});
      if(i<n-1&&cfg.rest>0)s.push({type:'rest',ex:i,next:i+1,round:r,dur:cfg.rest});
    }
    if(r<cfg.rounds-1&&cfg.roundRest>0)s.push({type:'roundrest',round:r,next:0,dur:cfg.roundRest});
  }
  return s;
}

/* ====== Audio / voix ====== */
let actx=null,musicGain=null;
let keepAlive=null;
function silentWavUrl(){
  const n=800,b=new Uint8Array(44+n*2),dv=new DataView(b.buffer);
  const w=(o,t)=>[...t].forEach((c,i)=>dv.setUint8(o+i,c.charCodeAt(0)));
  w(0,'RIFF');dv.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,1,true);
  dv.setUint32(24,8000,true);dv.setUint32(28,16000,true);dv.setUint16(32,2,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n*2,true);
  return URL.createObjectURL(new Blob([b],{type:'audio/wav'}));
}
function initAudio(){
  /* iPhone : son « lecture » (audible même avec l'interrupteur silencieux) + lecteur silencieux qui garde le son actif */
  try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch(e){}
  try{
    if(!keepAlive){keepAlive=new Audio(silentWavUrl());keepAlive.loop=true;keepAlive.setAttribute('playsinline','');}
    keepAlive.play().catch(()=>{});
  }catch(e){}
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state!=='running')actx.resume();
    try{const ub=actx.createBuffer(1,1,22050),us=actx.createBufferSource();us.buffer=ub;us.connect(actx.destination);us.start(0);}catch(e){}
    if(!musicGain){musicGain=actx.createGain();musicGain.connect(actx.destination);applyMusicVol();}}catch(e){}
}
function beep(freq,dur,vol){
  if(!cfg.sound||!actx)return;
  const o=actx.createOscillator(),g=actx.createGain();
  o.frequency.value=freq;o.type='sine';
  g.gain.setValueAtTime(vol||.4,actx.currentTime);
  g.gain.exponentialRampToValueAtTime(.001,actx.currentTime+dur);
  o.connect(g);g.connect(actx.destination);o.start();o.stop(actx.currentTime+dur);
}
function vibe(p){if(cfg.vibe&&navigator.vibrate)try{navigator.vibrate(p)}catch(e){}}
let frVoice=null;
function pickVoice(){
  const vs=speechSynthesis.getVoices?speechSynthesis.getVoices():[];
  frVoice=vs.find(v=>/^fr[-_]FR/i.test(v.lang))||vs.find(v=>/^fr/i.test(v.lang))||null;
}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}
function say(text,urgent){
  if(!cfg.voice||!('speechSynthesis' in window))return;
  try{
    if(urgent)speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang='fr-FR';if(frVoice)u.voice=frVoice;u.rate=1.05;
    duck(true);u.onend=u.onerror=()=>duck(false);
    speechSynthesis.speak(u);
  }catch(e){}
}


/* ====== Musique (synthétisée, originale) ====== */
const mtof=n=>440*Math.pow(2,(n-69)/12);
const TRACKS={
  electro:{name:'Électro',bpm:128,roots:[45,41,48,43],ch:[[0,3,7],[0,4,7],[0,4,7],[0,4,7]],
    kick:[0,4,8,12],clap:[4,12],hat:[2,6,10,14],ghost:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  hiphop:{name:'Hip-hop',bpm:92,roots:[38,34,41,36],ch:[[0,3,7],[0,4,7],[0,4,7],[0,4,7]],
    kick:[0,7,10],clap:[4,12],hat:[0,2,4,6,8,10,12,14],ghost:[]},
  power:{name:'Power',bpm:140,roots:[40,36,43,38],ch:[[0,7,12],[0,7,12],[0,7,12],[0,7,12]],
    kick:[0,4,8,12,14],clap:[4,12],hat:[2,6,10,14],ghost:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}
};
const M={timer:0,step:0,next:0,track:null,duckN:0,noise:null};
function noiseBuf(){
  if(M.noise)return M.noise;
  const b=actx.createBuffer(1,actx.sampleRate,actx.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  return M.noise=b;
}
function mKick(t,v){
  const o=actx.createOscillator(),g=actx.createGain();
  o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(42,t+.13);
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.28);
  o.connect(g);g.connect(musicGain);o.start(t);o.stop(t+.3);
}
function mNoise(t,dur,v,type,freq){
  const s=actx.createBufferSource();s.buffer=noiseBuf();
  const f=actx.createBiquadFilter();f.type=type;f.frequency.value=freq;
  const g=actx.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  s.connect(f);f.connect(g);g.connect(musicGain);s.start(t);s.stop(t+dur+.02);
}
function mTone(type,note,t,dur,v,cut){
  const o=actx.createOscillator(),g=actx.createGain(),f=actx.createBiquadFilter();
  o.type=type;o.frequency.value=mtof(note);
  f.type='lowpass';f.frequency.value=cut||2000;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.012);
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(f);f.connect(g);g.connect(musicGain);o.start(t);o.stop(t+dur+.03);
}
function playStep(key,step,t){
  const tr=TRACKS[key],s=step%16,bar=Math.floor(step/16)%4,root=tr.roots[bar],ch=tr.ch[bar];
  if(tr.kick.includes(s))mKick(t,.95);
  if(tr.clap.includes(s)){mNoise(t,.16,.5,'bandpass',1800);}
  if(tr.hat.includes(s))mNoise(t,.07,.28,'highpass',7000);
  else if(tr.ghost.includes(s))mNoise(t,.03,.07,'highpass',9000);
  const spb=60/tr.bpm/4;
  if(key==='electro'){
    if(s%2===0)mTone('sawtooth',root+((s===6||s===14)?12:0),t,spb*1.7,.22,700);
    const iv=[0,1,2,1][(s>>1)%4],n=root+24+ch[iv]+(s>=8?12:0);
    if(s%2===0)mTone('square',n,t,spb*1.5,.07,3200);
  }else if(key==='hiphop'){
    if(s===0||s===10)mTone('sine',root-12,t,spb*5,.55,300);
    if(s===0||s===8||s===14)ch.forEach(i=>mTone('triangle',root+12+i,t,spb*3,.09,2200));
    if(s===3||s===11)mTone('square',root+24+ch[2],t,spb*1.5,.05,2600);
  }else{
    if(s%2===0)mTone('sawtooth',root,t,spb*1.8,.24,900);
    if(s===0||s===6||s===10)ch.forEach(i=>mTone('sawtooth',root+24+i,t,spb*3.2,.07,2800));
    if(s===14||s===15)mTone('square',root+36+(s===15?2:0),t,spb*1.2,.05,3500);
  }
}
function musicTick(){
  if(actx.state!=='running'){try{actx.resume();}catch(e){}return;}
  const spb=60/TRACKS[M.track].bpm/4;
  while(M.next<actx.currentTime+.15){playStep(M.track,M.step,M.next);M.next+=spb;M.step=(M.step+1)%64;}
}
function musicStop(){clearInterval(M.timer);M.timer=0;}
function audioRelease(){try{keepAlive&&keepAlive.pause();}catch(e){}}
function musicStart(){
  musicStop();
  if(!actx||!musicGain||!TRACKS[cfg.music])return;
  M.track=cfg.music;M.step=0;M.next=actx.currentTime+.1;
  applyMusicVol();
  M.timer=setInterval(musicTick,25);
}
function applyMusicVol(){
  if(!actx||!musicGain)return;
  const lvl=(cfg.musicVol/100)*.55*(M.duckN>0?.3:1);
  musicGain.gain.setTargetAtTime(lvl,actx.currentTime,.12);
}
function duck(on){M.duckN=Math.max(0,M.duckN+(on?1:-1));if(on)setTimeout(()=>{if(M.duckN>0){M.duckN=0;applyMusicVol();}},7000);applyMusicVol();}
function musicLabel(){return TRACKS[cfg.music]?'♪ '+TRACKS[cfg.music].name:'♪ Aucune';}
function musicChanged(){
  $('cfgMusic').value=cfg.music;$('musicBtn').textContent=musicLabel();
  if($('workout').classList.contains('active')&&!S.paused){cfg.music==='off'?musicStop():musicStart();}
}
function cycleMusic(){
  initAudio();
  const order=['off','electro','hiphop','power'];
  cfg.music=order[(order.indexOf(cfg.music)+1)%order.length];save();musicChanged();
}


/* ====== Historique des séances réalisées ====== */
const HKEY='seance-history';
function loadHist(){try{const h=JSON.parse(localStorage.getItem(HKEY));return Array.isArray(h)?h:[];}catch(e){return[];}}
function saveHist(h){try{localStorage.setItem(HKEY,JSON.stringify(h));return true;}catch(e){return false;}}
function addHist(entry){const h=loadHist();h.push(entry);return saveHist(h);}

/* ====== Profils (qui fait la séance) ====== */
const PKEY='seance-profiles';
function loadProfiles(){try{const p=JSON.parse(localStorage.getItem(PKEY));return Array.isArray(p)?p:[];}catch(e){return[];}}
function saveProfiles(p){try{localStorage.setItem(PKEY,JSON.stringify(p));}catch(e){}}
function addProfile(){
  const n=(prompt('Prénom de la personne qui fait la séance ?')||'').trim().slice(0,20);
  if(!n)return false;
  const p=loadProfiles();
  const ex=p.find(x=>x.toLowerCase()===n.toLowerCase());
  if(!ex)p.push(n);
  saveProfiles(p);cfg.who=ex||n;save();renderWho();return true;
}
function renderWho(){
  const seg=$('whoSeg');seg.innerHTML='';
  loadProfiles().forEach(n=>{
    const b=document.createElement('button');b.className='seg-btn who-btn'+(cfg.who===n?' on':'');
    b.innerHTML='<b>'+esc(n)+'</b>';
    b.addEventListener('click',()=>{cfg.who=n;save();seg.classList.remove('need');renderWho();});
    seg.appendChild(b);
  });
  const a=document.createElement('button');a.className='seg-btn who-btn add';a.innerHTML='<b>+ Ajouter</b>';
  a.addEventListener('click',()=>{seg.classList.remove('need');addProfile();});
  seg.appendChild(a);
}
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ====== Envoi vers Notion (via Make) ====== */
const SYNC_URL='https://hook.eu1.make.com/v9s0r0ghv8lkhcaoouc6vve14unk4tp2';
let syncing=false;
async function syncHist(){
  if(syncing||!navigator.onLine)return 0;
  syncing=true;let ok=0;
  try{
    const todo=loadHist().filter(x=>x.who&&!x.sent);
    for(const x of todo){
      const body=new URLSearchParams({who:x.who,label:x.label||'Séance',sub:x.sub||'',date:x.date,min:String(Math.round((x.sec||0)/6)/10),rounds:String(x.rounds||''),count:String(x.count||'')});
      try{
        await fetch(SYNC_URL,{method:'POST',mode:'no-cors',body});
        const h=loadHist();const t=h.find(y=>y.date===x.date&&y.who===x.who);
        if(t){t.sent=true;saveHist(h);}
        ok++;
      }catch(e){break;}
    }
  }finally{syncing=false;}
  return ok;
}
const pad2=n=>String(n).padStart(2,'0');
function mondayOf(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return x;}
const fmtDate=iso=>{const d=new Date(iso);return d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})+' · '+pad2(d.getHours())+':'+pad2(d.getMinutes());};
let histFilter=null;
function renderHistWho(){
  const seg=$('histWho');seg.innerHTML='';
  const names=loadProfiles();
  [['','Tous']].concat(names.map(n=>[n,n])).forEach(([v,l])=>{
    const b=document.createElement('button');b.className='seg-btn who-btn'+(histFilter===v?' on':'');
    b.innerHTML='<b>'+esc(l)+'</b>';
    b.addEventListener('click',()=>{histFilter=v;renderHistory();});
    seg.appendChild(b);
  });
}
function renderHistory(){
  if(histFilter===null)histFilter=cfg.who||'';
  renderHistWho();
  const h=loadHist().filter(x=>!histFilter||x.who===histFilter).sort((a,b)=>b.date.localeCompare(a.date));
  const now=new Date(),wk=mondayOf(now).getTime();
  const thisWeek=h.filter(x=>new Date(x.date).getTime()>=wk).length;
  const totalMin=Math.round(h.reduce((a,x)=>a+(x.sec||0),0)/60);
  $('histStats').innerHTML='<div><b>'+h.length+'</b><span>séances</span></div><div><b>'+thisWeek+'</b><span>cette semaine</span></div><div><b>'+totalMin+'</b><span>minutes</span></div>';
  // 8 dernières semaines
  const bars=[];for(let i=7;i>=0;i--){const start=wk-i*7*864e5,end=start+7*864e5;bars.push(h.filter(x=>{const t=new Date(x.date).getTime();return t>=start&&t<end;}).length);}
  const mx=Math.max(3,...bars);
  $('histBars').innerHTML=bars.map((n,i)=>'<div class="bar"><i style="height:'+Math.round(n/mx*100)+'%"></i><span>'+(n||'')+'</span></div>').join('');
  const ul=$('histList');ul.innerHTML='';
  if(!h.length){ul.innerHTML='<li class="empty">Aucune séance enregistrée pour le moment. Elles apparaissent ici dès qu’une séance est terminée.</li>';return;}
  h.forEach(x=>{
    const li=document.createElement('li');
    li.innerHTML='<div><b>'+(x.label||'Séance')+'</b><span class="muted"> · '+(x.sub||'')+'</span><div class="muted">'+(x.who?esc(x.who)+' · ':'')+fmtDate(x.date)+' · '+fmt(x.sec||0)+' · '+(x.rounds||'?')+' tours</div></div>';
    const b=document.createElement('button');b.className='del';b.textContent='✕';b.setAttribute('aria-label','Supprimer');
    b.addEventListener('click',()=>{if(confirm('Supprimer cette séance de l’historique ?')){saveHist(loadHist().filter(y=>!(y.date===x.date&&y.who===x.who)));renderHistory();}});
    li.appendChild(b);ul.appendChild(li);
  });
}
function exportHist(){
  const h=loadHist().sort((a,b)=>a.date.localeCompare(b.date));
  const rows=['date;heure;personne;seance;type;duree_min;tours;exercices'];
  h.forEach(x=>{const d=new Date(x.date);rows.push([d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate()),pad2(d.getHours())+':'+pad2(d.getMinutes()),x.who||'',x.label||'',x.sub||'',((x.sec||0)/60).toFixed(1).replace('.',','),x.rounds||'',x.count||''].join(';'));});
  const csv='﻿'+rows.join('\n');
  try{
    const f=new File([csv],'historique-seances.csv',{type:'text/csv'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:'Historique des séances'}).catch(()=>{});return;}
  }catch(e){}
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='historique-seances.csv';document.body.appendChild(a);a.click();a.remove();
}
function clearHist(){if(loadHist().length&&confirm('Effacer tout l’historique ? Cette action est définitive.')){saveHist([]);renderHistory();}}

/* ====== Moteur du chrono ====== */
const S={steps:[],idx:0,end:0,paused:false,remain:0,timer:0,lastSec:-1,flags:{},startedAt:0,wake:null};
const screens=['home','workout','done','history'];
function show(id){screens.forEach(s=>$(s).classList.toggle('active',s===id));window.scrollTo(0,0);}

function startWorkout(){
  if(!cfg.who||!loadProfiles().includes(cfg.who)){
    if(!loadProfiles().length){if(!addProfile())return;}
    else{const w=$('whoSeg');w.classList.add('need');w.scrollIntoView({behavior:'smooth',block:'center'});return;}
  }
  initAudio();musicStart();$('musicBtn').textContent=musicLabel();
  S.steps=buildSteps();S.idx=0;S.paused=false;
  S.startedAt=Date.now();
  if('speechSynthesis' in window)speechSynthesis.cancel();
  say('C’est parti. '+cfg.rounds+' cycles de '+EXERCISES.length+' exercices.',true);
  show('workout');
  requestWake();
  enterStep(0,true);
  clearInterval(S.timer);S.timer=setInterval(tick,100);
}
function enterStep(i,first){
  S.idx=i;S.flags={};S.lastSec=-1;
  const st=S.steps[i];
  S.end=Date.now()+st.dur*1000;
  renderStep(st);
  announceStart(st,first);
  if(st.type==='work'){beep(880,.5);vibe([200]);}
  else if(st.type==='rest'||st.type==='roundrest'){beep(440,.5);vibe([100,60,100]);}
  tick();
}
function announceStart(st,first){
  const roundNo=st.round+1,lastRound=roundNo===cfg.rounds;
  const prevStep=S.steps[S.idx-1];
  if(st.type==='prep'){
    say('Préparez-vous. Premier exercice : '+EXERCISES[0].name+'.');
  }else if(st.type==='work'){
    const ex=EXERCISES[st.ex],nm=spoken(ex);
    if(prevStep&&prevStep.type==='roundrest')say('Reprise. Cycle '+roundNo+'. '+nm+'. '+cfg.work+' secondes.',true);
    else if(prevStep&&prevStep.type==='rest')say('Reprise. '+nm+'.',true);
    else if(st.ex===0&&st.round===0)say('Cycle 1. '+nm+'. '+cfg.work+' secondes.',true);
    else say(nm+'.',true);
  }else if(st.type==='rest'){
    say('Repos. '+cfg.rest+' secondes. Ensuite : '+spoken(EXERCISES[st.next])+'.',true);
  }else if(st.type==='roundrest'){
    say('Fin du cycle '+roundNo+'. Pause de '+spokenDuration(st.dur)+'. Reprise au cycle '+(roundNo+1)+'.',true);
  }
}
function renderStep(st){
  const n=EXERCISES.length;
  const phase=st.type;
  document.body.dataset.phase=phase;
  const ex=EXERCISES[phase==='work'||phase==='prep'?st.ex:(phase==='rest'?st.next:0)];
  const labels={prep:'PRÉPARATION',work:'TRAVAIL',rest:'REPOS',roundrest:'PAUSE'};
  $('phaseLabel').textContent=labels[phase];
  $('roundInfo').textContent='Tour '+(st.round+1)+' / '+cfg.rounds;
  const exIdx=phase==='work'||phase==='prep'?st.ex:(phase==='rest'?st.next:0);
  $('exInfo').textContent=(phase==='work'||phase==='prep')?'Exercice '+(exIdx+1)+' / '+n:'Prochain : '+(exIdx+1)+' / '+n;
  $('exName').textContent=ex.name;
  $('exTip').textContent=ex.tip;
  $('exSub').textContent=phase==='work'?'':phase==='prep'?'Premier exercice':phase==='rest'?'À suivre':'Tour '+(st.round+1)+' terminé · bravo ! Prochain tour : '+EXERCISES[0].name;
  showFigure(ex,true);
}
function remainingMs(){return S.paused?S.remain:S.end-Date.now();}
function totalLeft(){
  let ms=Math.max(0,remainingMs());
  for(let i=S.idx+1;i<S.steps.length;i++)ms+=S.steps[i].dur*1000;
  return ms;
}
function tick(){
  if(S.paused)return;
  const st=S.steps[S.idx];if(!st)return;
  const ms=S.end-Date.now();
  const sec=Math.max(0,Math.ceil(ms/1000));
  $('count').textContent=sec;
  $('ringFg').style.strokeDashoffset=String(339.3*(1-Math.max(0,ms)/(st.dur*1000)));
  $('totalLeft').textContent=fmt(totalLeft()/1000);
  if(sec!==S.lastSec){
    S.lastSec=sec;
    if(st.type==='work'){
      const half=Math.round(st.dur/2);
      if(sec===half&&st.dur>=20&&!S.flags.half){S.flags.half=1;say(EXERCISES[st.ex].switchSide?'Moitié. Changez de bras.':'Moitié.',true);beep(660,.15);}
      if(sec===10&&st.dur>=20&&!S.flags.ten){S.flags.ten=1;say('Dix secondes !',true);}
    }
    if(sec>=1&&sec<=3){beep(sec===1?740:620,.15);vibe(40);}
  }
  if(ms<=0)nextStep();
}
function nextStep(){
  if(S.idx>=S.steps.length-1){finish();return;}
  enterStep(S.idx+1);
}
function finish(){
  clearInterval(S.timer);releaseWake();musicStop();audioRelease();
  document.body.dataset.phase='idle';
  beep(880,.25);setTimeout(()=>beep(1100,.4),300);vibe([300,100,300,100,500]);
  const dur=Math.round((Date.now()-S.startedAt)/1000);
  say('Fin du cycle '+cfg.rounds+'. Séance terminée. Bravo, belle séance !',true);
  const se=SESSIONS[cfg.session]||SESSIONS.A;
  const saved=addHist({date:new Date(S.startedAt).toISOString(),session:cfg.session,label:se.label,sub:se.sub,sec:dur,rounds:cfg.rounds,count:EXERCISES.length,who:cfg.who||''});
  const base=(cfg.who?cfg.who+' · ':'')+cfg.rounds+' tours · '+fmt(dur)+' · bravo !'+(saved?' Séance enregistrée dans l’historique.':'');
  $('doneText').textContent=base;
  syncHist().then(n=>{if(n&&$('done').classList.contains('active'))$('doneText').textContent=base+' Envoyée dans Notion.';});
  show('done');
}
function togglePause(){
  initAudio();
  if(S.paused){
    S.paused=false;S.end=Date.now()+S.remain;
    $('pauseBtn').textContent='⏸';
    say('Reprise.',true);beep(660,.2);musicStart();
    requestWake();
  }else{
    S.remain=Math.max(0,S.end-Date.now());S.paused=true;
    $('pauseBtn').textContent='▶';musicStop();
    say('Pause.',true);
  }
}
function go(i){
  if(i<0)i=0;
  if(i>=S.steps.length){finish();return;}
  if(S.paused){S.paused=false;$('pauseBtn').textContent='⏸';}
  enterStep(i);
}
function prevStep(){
  const st=S.steps[S.idx];
  const elapsed=st.dur*1000-remainingMs();
  go(elapsed>2500?S.idx:S.idx-1);
}
function quit(){
  clearInterval(S.timer);releaseWake();musicStop();audioRelease();
  if('speechSynthesis' in window)speechSynthesis.cancel();
  cancelAnimationFrame(fig.raf);
  document.body.dataset.phase='idle';
  S.paused=false;$('pauseBtn').textContent='⏸';
  renderHome();show('home');
}

/* ====== Écran allumé ====== */
async function requestWake(){
  try{if('wakeLock' in navigator&&!S.wake){S.wake=await navigator.wakeLock.request('screen');S.wake.addEventListener('release',()=>{S.wake=null;});}}catch(e){}
}
function releaseWake(){try{S.wake&&S.wake.release();}catch(e){}S.wake=null;}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&$('workout').classList.contains('active')){requestWake();try{actx&&actx.state!=='running'&&actx.resume();keepAlive&&!S.paused&&keepAlive.play().catch(()=>{});}catch(e){}}});

/* ====== Accueil ====== */
function renderSeg(){
  const seg=$('sessionSeg');seg.innerHTML='';
  Object.keys(SESSIONS).forEach(k=>{
    const b=document.createElement('button');
    b.className='seg-btn'+(cfg.session===k?' on':'');
    b.innerHTML='<b>'+SESSIONS[k].label+'</b><span>'+SESSIONS[k].sub+'</span>';
    b.addEventListener('click',()=>{cfg.session=k;save();applySession();renderHome();});
    seg.appendChild(b);
  });
}
async function updateApp(){
  const b=$('updateBtn');b.disabled=true;b.textContent='Mise à jour…';
  try{
    if('serviceWorker' in navigator){const rs=await navigator.serviceWorker.getRegistrations();for(const r of rs)await r.unregister();}
    if(window.caches){const ks=await caches.keys();for(const k of ks)await caches.delete(k);}
    for(const f of ['./','index.html','style.css','app.js','manifest.webmanifest','sw.js'])await fetch(f,{cache:'reload'}).catch(()=>{});
  }catch(e){}
  location.replace(location.pathname+'?v='+Date.now());
}
function renderHome(){
  renderWho();renderSeg();
  const steps=buildSteps();
  const total=steps.reduce((a,s)=>a+s.dur,0);
  $('summary').textContent=SESSIONS[cfg.session].label+' · '+EXERCISES.length+' exercices · '+cfg.work+' s travail / '+cfg.rest+' s repos · '+cfg.rounds+' tours · pause '+fmt(cfg.roundRest)+' · env. '+Math.round(total/60)+' min';
  const ul=$('exList');ul.innerHTML='';
  EXERCISES.forEach((ex,i)=>{
    const li=document.createElement('li');
    const svg=el('svg',{viewBox:'0 0 200 200'});
    const parts=buildFigure(svg,ex);
    drawPose(parts,ex.frames[1],ex);
    li.innerHTML='<span class="n">'+(i+1)+'</span>';
    li.appendChild(svg);
    const t=document.createElement('span');t.className='t';t.textContent=ex.name;
    li.appendChild(t);ul.appendChild(li);
  });
}
$('startBtn').addEventListener('click',startWorkout);
$('updateBtn').addEventListener('click',updateApp);
$('histBtn').addEventListener('click',()=>{histFilter=cfg.who||'';renderHistory();show('history');});
$('histBack').addEventListener('click',()=>{renderHome();show('home');});
$('histExport').addEventListener('click',exportHist);
$('histClear').addEventListener('click',clearHist);
$('doneHist').addEventListener('click',()=>{histFilter=cfg.who||'';renderHistory();show('history');});
$('verInfo').textContent='Version '+APP_VERSION;
$('pauseBtn').addEventListener('click',togglePause);
$('musicBtn').addEventListener('click',cycleMusic);
$('nextBtn').addEventListener('click',()=>{initAudio();go(S.idx+1);});
$('prevBtn').addEventListener('click',()=>{initAudio();prevStep();});
$('quitBtn').addEventListener('click',()=>{if(confirm('Quitter la séance ?'))quit();});
$('againBtn').addEventListener('click',()=>{renderHome();show('home');});
renderHome();$('musicBtn').textContent=musicLabel();
syncHist();window.addEventListener('online',syncHist);

if('serviceWorker' in navigator&&location.protocol.startsWith('http')){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
/* Exposé pour les tests */
window.__seance={buildSteps,cfg,EXERCISES};
