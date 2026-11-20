'use strict';
/* ====== Poses : H tête, N cou/épaule, P hanche, E coude, W main, K1/A1 jambe avant, K2/A2 jambe arrière ====== */
const pose=(H,N,P,E,W,K1,A1,K2,A2)=>({H,N,P,E,W,K1,A1,K2,A2});
const STAND_LEGS=[[102,140],[100,175],[98,140],[96,175]];
const armFrame=th=>{const sn=Math.sin(th),cs=Math.cos(th),N=[100,60];
  return pose([100,46],N,[100,105],[N[0]+26*sn,N[1]+26*cs],[N[0]+48*sn,N[1]+48*cs],...STAND_LEGS);};
const ARMS_UP=pose([100,40],[100,54],[100,99],[103,32],[102,10],[102,136],[100,171],[98,136],[96,171]);

/* ====== Le réveil : 9 mini-défis, 10 s de préparation + 5 s entre chaque = 5 min pile ====== */
const PREP=10, GAP=5;
const EXOS=[
 {name:'Grandis-toi comme une fleur',spoken:'Grandis-toi comme une fleur',dur:20,foot:true,seg:2.2,
  tip:'Lève les bras vers le ciel, monte sur la pointe des pieds et grandis le plus possible. Respire bien.',
  frames:[pose([100,46],[100,60],[100,105],[104,84],[106,106],...STAND_LEGS),ARMS_UP]},
 {name:'Ailes de papillon',spoken:'Ailes de papillon',dur:25,foot:true,seg:0.4,halfSay:'Moitié ! Change de sens.',
  tip:'Bras grands ouverts, dessine de grands cercles lents. À la moitié, change de sens.',
  frames:[0,1,2,3,4,5,6,7].map(i=>armFrame(i*Math.PI/4))},
 {name:'Danse du hula',spoken:'Danse du hula',dur:25,foot:true,seg:0.7,
  tip:'Mains sur les hanches, dessine de grands cercles avec ton bassin, genoux souples.',
  frames:[pose([96,46],[97,60],[110,105],[112,84],[108,102],...STAND_LEGS),
          pose([100,46],[100,60],[100,103],[114,84],[104,102],...STAND_LEGS),
          pose([104,46],[103,60],[90,105],[94,84],[92,102],...STAND_LEGS),
          pose([100,46],[100,60],[100,103],[114,84],[104,102],...STAND_LEGS)]},
 {name:'Marche de star',spoken:'Marche de star',dur:30,foot:true,seg:0.55,
  tip:'Monte les genoux comme sur un podium, balance les bras et souris !',
  frames:[pose([100,46],[100,60],[100,105],[112,84],[118,104],[116,126],[110,152],[98,140],[96,175]),
          pose([100,46],[100,60],[100,105],[90,84],[86,106],[102,140],[100,175],[116,126],[110,152])]},
 {name:'Squats licorne',spoken:'Squats licorne',dur:35,foot:true,seg:1.5,
  tip:'Bras devant toi, descends les fesses vers l’arrière comme pour t’asseoir, dos droit, puis remonte en poussant dans les talons.',
  frames:[pose([100,46],[100,60],[100,105],[120,62],[140,62],...STAND_LEGS),
          pose([103,90],[98,104],[84,146],[116,106],[136,104],[118,143],[100,175],[114,143],[96,175])]},
 {name:'Étoile filante',spoken:'Étoile filante',dur:35,foot:false,seg:0.5,
  tip:'Écarte les jambes et les bras en sautillant, puis rassemble. Version douce : un pied après l’autre.',
  frames:[pose([100,46],[100,60],[100,105],[104,84],[106,106],...STAND_LEGS),
          pose([100,40],[100,54],[100,99],[106,30],[104,8],[118,136],[130,169],[84,136],[72,169])]},
 {name:'Pont arc-en-ciel',spoken:'Pont arc-en-ciel',dur:30,foot:true,seg:1.1,
  tip:'Allongée sur le dos, pieds au sol, pousse dans les talons et monte le bassin en serrant les fessiers.',
  frames:[pose([38,166],[55,168],[100,168],[75,166],[98,160],[122,140],[140,172],[126,142],[144,172]),
          pose([48,168],[62,166],[100,138],[80,152],[100,130],[133,140],[135,172],[137,142],[139,172])]},
 {name:'Fée qui vole',spoken:'Fée qui vole',dur:25,foot:false,seg:1.3,
  tip:'Allongée sur le ventre, soulève bras et jambes comme une fée qui vole, puis relâche doucement.',
  frames:[pose([152,166],[138,168],[92,170],[162,170],[184,170],[60,171],[30,172],[60,171],[30,172]),
          pose([154,150],[138,155],[92,168],[162,148],[185,142],[60,162],[30,152],[60,162],[30,152])]},
 {name:'Câlin de nounours',spoken:'Câlin de nounours',dur:25,foot:true,seg:3.5,
  tip:'Inspire en ouvrant grand les bras, souffle en te serrant dans tes bras. Super, tu es réveillée !',
  frames:[ARMS_UP,
          pose([100,47],[100,61],[100,106],[114,84],[98,74],...STAND_LEGS)]}
];

/* ====== Dessin du personnage kawaii ====== */
const NS='http://www.w3.org/2000/svg';
const el=(n,a={})=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e;};
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>(1-Math.cos(Math.PI*t))/2;
const KEYS=['H','N','P','E','W','K1','A1','K2','A2'];
function mix(p,q,t){const r={};for(const k of KEYS)r[k]=[lerp(p[k][0],q[k][0],t),lerp(p[k][1],q[k][1],t)];return r;}
const HAIR='#7b4b3a';
let PHOTO=null;try{PHOTO=localStorage.getItem('kawaii-photo')||null}catch(e){}
let clipN=0;
function buildFigure(svg){
  svg.innerHTML='';
  const parts={};
  svg.appendChild(el('line',{x1:10,y1:178,x2:190,y2:178,stroke:'#ffc2de','stroke-width':4,'stroke-linecap':'round'}));
  const g=el('g',{fill:'none','stroke-linecap':'round','stroke-linejoin':'round'});
  const mk=(id,color,w)=>{parts[id]=el('polyline',{stroke:color,'stroke-width':w});g.appendChild(parts[id]);};
  mk('legB','#9d80ee',7);mk('foot2','#ff5aa5',6);
  mk('legF','#b9a1ff',8);mk('foot1','#ff7bb8',6);
  mk('torso','#ff9ccb',11);
  mk('arm','#ffd2bd',6);
  const f=el('g');parts.face=f;
  if(PHOTO){
    const id='hc'+(clipN++);
    const cp=el('clipPath',{id});cp.appendChild(el('circle',{cx:0,cy:0,r:20}));f.appendChild(cp);
    f.appendChild(el('circle',{cx:-19,cy:-10,r:7,fill:HAIR}));
    f.appendChild(el('circle',{cx:19,cy:-10,r:7,fill:HAIR}));
    f.appendChild(el('circle',{cx:0,cy:0,r:22,fill:'#fff',stroke:'#ff9ccb','stroke-width':1.6}));
    const im=el('image',{x:-20,y:-20,width:40,height:40,'clip-path':'url(#'+id+')',preserveAspectRatio:'xMidYMid slice',href:PHOTO});
    im.setAttributeNS('http://www.w3.org/1999/xlink','href',PHOTO);
    f.appendChild(im);
    f.appendChild(el('path',{d:'M0,-22 L-8,-27 L-8,-17 Z M0,-22 L8,-27 L8,-17 Z',fill:'#ff4f9a'}));
    f.appendChild(el('circle',{cx:0,cy:-22,r:2.2,fill:'#ffb3d6'}));
  }else{
  f.appendChild(el('circle',{cx:-10,cy:-10,r:5.5,fill:HAIR}));
  f.appendChild(el('circle',{cx:10,cy:-10,r:5.5,fill:HAIR}));
  f.appendChild(el('circle',{cx:0,cy:0,r:12.5,fill:HAIR}));
  f.appendChild(el('circle',{cx:0,cy:1.5,r:10.5,fill:'#ffe6d8'}));
  f.appendChild(el('path',{d:'M-10.5,0 C-8,-10.5 8,-10.5 10.5,0 C6,-5 -6,-5 -10.5,0 Z',fill:HAIR}));
  f.appendChild(el('path',{d:'M0,-13 L-6.5,-17 L-6.5,-9 Z M0,-13 L6.5,-17 L6.5,-9 Z',fill:'#ff4f9a'}));
  f.appendChild(el('circle',{cx:0,cy:-13,r:1.8,fill:'#ffb3d6'}));
  f.appendChild(el('circle',{cx:-4,cy:2,r:1.6,fill:'#4a2b47'}));
  f.appendChild(el('circle',{cx:4,cy:2,r:1.6,fill:'#4a2b47'}));
  f.appendChild(el('ellipse',{cx:-6.8,cy:5.5,rx:2.5,ry:1.6,fill:'#ff9fc4',opacity:.85}));
  f.appendChild(el('ellipse',{cx:6.8,cy:5.5,rx:2.5,ry:1.6,fill:'#ff9fc4',opacity:.85}));
  f.appendChild(el('path',{d:'M-2,5.5 Q0,8 2,5.5',fill:'none',stroke:'#c2457f','stroke-width':1.1}));
  }
  g.appendChild(f);
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
  parts.face.setAttribute('transform','translate('+p.H[0].toFixed(1)+' '+p.H[1].toFixed(1)+')');
}
function poseAt(ex,t){
  const n=ex.frames.length,ph=(t/ex.seg)%n,i=Math.floor(ph);
  return mix(ex.frames[i],ex.frames[(i+1)%n],ease(ph-i));
}
const fig={parts:null,raf:0,t0:0};
function showFigure(ex,animate){
  const svg=document.getElementById('fig');
  fig.parts=buildFigure(svg);
  fig.t0=performance.now();
  cancelAnimationFrame(fig.raf);
  const loop=now=>{
    drawPose(fig.parts,poseAt(ex,Math.max(0,now-fig.t0)/1000),ex);
    if(animate)fig.raf=requestAnimationFrame(loop);
  };
  loop(performance.now());
  if(animate)fig.raf=requestAnimationFrame(loop);
}

/* ====== Réglages et prénom ====== */
const APP_VERSION='3';
const DEF={voice:true,sound:true,vibe:true,music:'electro',musicVol:50,name:''};
let cfg=Object.assign({},DEF,(()=>{try{return JSON.parse(localStorage.getItem('kawaii-cfg'))||{}}catch(e){return{}}})());
const $=id=>document.getElementById(id);
const save=()=>{try{localStorage.setItem('kawaii-cfg',JSON.stringify(cfg))}catch(e){}};
const cleanName=s=>{
  const n=(s||'').replace(/[^\p{L}\p{M}\s'’-]/gu,'').replace(/\s+/g,' ').trim().slice(0,20);
  return n?n.charAt(0).toLocaleUpperCase('fr')+n.slice(1):'';
};
/* Un lien du type …/?prenom=Prénom enregistre le prénom directement */
try{
  const q=new URLSearchParams(location.search).get('prenom');
  if(q){const n=cleanName(q);if(n){cfg.name=n;save();}history.replaceState(null,'',location.pathname);}
}catch(e){}
cfg.name=cleanName(cfg.name);

function bindCheck(id,key){const i=$(id);i.checked=cfg[key];i.addEventListener('change',()=>{cfg[key]=i.checked;save();});}
bindCheck('cfgVoice','voice');bindCheck('cfgSound','sound');bindCheck('cfgVibe','vibe');
$('cfgMusic').value=cfg.music;$('cfgMusic').addEventListener('change',()=>{cfg.music=$('cfgMusic').value;save();musicChanged();});
$('cfgMusicVol').value=cfg.musicVol;$('cfgMusicVol').addEventListener('input',()=>{cfg.musicVol=+$('cfgMusicVol').value;save();applyMusicVol();});
$('cfgName').value=cfg.name;
$('cfgName').addEventListener('change',()=>{const n=cleanName($('cfgName').value);if(n){cfg.name=n;save();}$('cfgName').value=cfg.name;renderHome();});

/* ====== Utilitaires ====== */
const spoken=ex=>ex.spoken||ex.name;
const fmt=s=>{s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
function spokenDuration(s){
  const m=Math.floor(s/60),r=s%60,parts=[];
  if(m)parts.push(m+(m>1?' minutes':' minute'));
  if(r)parts.push(r+' secondes');
  return parts.join(' ')||'0 seconde';
}
function buildSteps(){
  const s=[];
  s.push({type:'prep',ex:0,dur:PREP});
  EXOS.forEach((ex,i)=>{
    s.push({type:'work',ex:i,dur:ex.dur});
    if(i<EXOS.length-1)s.push({type:'rest',ex:i,next:i+1,dur:GAP});
  });
  return s;
}
const CHEERS=['Moitié, bravo !','Moitié, tu es au top !','Moitié, continue comme ça !','Moitié, quelle énergie !'];
let cheerI=0;const cheer=()=>CHEERS[cheerI++%CHEERS.length];
const COMPLIMENTS=['Tu es une vraie championne !','Ton corps est bien réveillé !','Quelle énergie, bravo !','Super réveil, belle journée à toi !'];

/* ====== Audio / voix ====== */
let actx=null,musicGain=null,keepAlive=null;
function silentWavUrl(){
  const n=800,b=new Uint8Array(44+n*2),dv=new DataView(b.buffer);
  const w=(o,t)=>[...t].forEach((c,i)=>dv.setUint8(o+i,c.charCodeAt(0)));
  w(0,'RIFF');dv.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,1,true);
  dv.setUint32(24,8000,true);dv.setUint32(28,16000,true);dv.setUint16(32,2,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n*2,true);
  return URL.createObjectURL(new Blob([b],{type:'audio/wav'}));
}
function applyAudioMode(){
  /* « Ma musique » : son « ambiant » qui se mélange aux autres applis. Sinon : son « lecture » + lecteur silencieux. */
  const ext=cfg.music==='ext';
  try{if(navigator.audioSession)navigator.audioSession.type=ext?'ambient':'playback';}catch(e){}
  try{
    if(ext){keepAlive&&keepAlive.pause();}
    else{
      if(!keepAlive){keepAlive=new Audio(silentWavUrl());keepAlive.loop=true;keepAlive.setAttribute('playsinline','');}
      keepAlive.play().catch(()=>{});
    }
  }catch(e){}
}
function initAudio(){
  applyAudioMode();
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state!=='running')actx.resume();
    try{const ub=actx.createBuffer(1,1,22050),us=actx.createBufferSource();us.buffer=ub;us.connect(actx.destination);us.start(0);}catch(e){}
    if(!musicGain){musicGain=actx.createGain();musicGain.connect(actx.destination);applyMusicVol();}}catch(e){}
}
function beep(freq,dur,vol){
  if(!cfg.sound||!actx)return;
  const o=actx.createOscillator(),g=actx.createGain();
  o.frequency.value=freq;o.type='sine';
  g.gain.setValueAtTime(vol||.35,actx.currentTime);
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
    u.lang='fr-FR';if(frVoice)u.voice=frVoice;u.rate=1.05;u.pitch=1.15;
    duck(true);u.onend=u.onerror=()=>duck(false);
    speechSynthesis.speak(u);
  }catch(e){}
}

/* ====== Musique (synthétisée, originale) ====== */
const mtof=n=>440*Math.pow(2,(n-69)/12);
const TRACKS={
  electro:{name:'Pop',bpm:128,roots:[45,41,48,43],ch:[[0,3,7],[0,4,7],[0,4,7],[0,4,7]],
    kick:[0,4,8,12],clap:[4,12],hat:[2,6,10,14],ghost:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  hiphop:{name:'Douceur',bpm:92,roots:[38,34,41,36],ch:[[0,3,7],[0,4,7],[0,4,7],[0,4,7]],
    kick:[0,7,10],clap:[4,12],hat:[0,2,4,6,8,10,12,14],ghost:[]}
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
  }else{
    if(s===0||s===10)mTone('sine',root-12,t,spb*5,.55,300);
    if(s===0||s===8||s===14)ch.forEach(i=>mTone('triangle',root+12+i,t,spb*3,.09,2200));
    if(s===3||s===11)mTone('square',root+24+ch[2],t,spb*1.5,.05,2600);
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
function musicLabel(){return TRACKS[cfg.music]?'♪ '+TRACKS[cfg.music].name:cfg.music==='ext'?'♪ Ma musique':'♪ Aucune';}
function musicChanged(){
  $('cfgMusic').value=cfg.music;$('musicBtn').textContent=musicLabel();
  applyAudioMode();
  if($('workout').classList.contains('active')&&!S.paused){cfg.music==='off'||cfg.music==='ext'?musicStop():musicStart();}
}
function cycleMusic(){
  initAudio();
  const order=['off','electro','hiphop','ext'];
  cfg.music=order[(order.indexOf(cfg.music)+1)%order.length];save();musicChanged();
}

/* ====== Carnet d'étoiles (un ⭐ par réveil terminé, gardé sur ce téléphone) ====== */
const HKEY='kawaii-stars';
function loadStars(){try{const h=JSON.parse(localStorage.getItem(HKEY));return Array.isArray(h)?h:[];}catch(e){return[];}}
function saveStars(h){try{localStorage.setItem(HKEY,JSON.stringify(h));return true;}catch(e){return false;}}
const dayKey=d=>d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
function mondayOf(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()-((x.getDay()+6)%7));return x;}
function weekCount(h){const wk=mondayOf(new Date()).getTime();return new Set(h.filter(x=>new Date(x).getTime()>=wk).map(x=>dayKey(new Date(x)))).size;}
function renderWeek(){
  const h=loadStars(),now=new Date(),wk=mondayOf(now),L=['L','M','M','J','V','S','D'];
  const days=new Set(h.map(x=>dayKey(new Date(x))));
  const box=$('week');box.innerHTML='';
  for(let i=0;i<7;i++){
    const d=new Date(wk);d.setDate(wk.getDate()+i);
    const on=days.has(dayKey(d));
    const div=document.createElement('div');
    div.className='day'+(on?' on':'')+(dayKey(now)===dayKey(d)?' today':'');
    div.innerHTML='<b>'+(on?'⭐':'☆')+'</b><span>'+L[i]+'</span>';
    box.appendChild(div);
  }
  $('total').textContent=h.length?h.length+(h.length>1?' réveils réussis':' réveil réussi')+' 💖':'Ton premier réveil t’attend ✨';
}

/* ====== Moteur du chrono ====== */
const S={steps:[],idx:0,end:0,paused:false,remain:0,timer:0,lastSec:-1,flags:{},startedAt:0,wake:null};
const screens=['welcome','home','workout','done'];
function show(id){screens.forEach(s=>$(s).classList.toggle('active',s===id));window.scrollTo(0,0);}

function startWorkout(){
  initAudio();musicStart();$('musicBtn').textContent=musicLabel();
  S.steps=buildSteps();S.idx=0;S.paused=false;$('pauseBtn').textContent='⏸';
  S.startedAt=Date.now();
  if('speechSynthesis' in window)speechSynthesis.cancel();
  say('C’est parti '+cfg.name+' ! Réveil kawaii de cinq minutes.',true);
  show('workout');
  requestWake();
  enterStep(0);
  clearInterval(S.timer);S.timer=setInterval(tick,100);
}
function enterStep(i){
  S.idx=i;S.flags={};S.lastSec=-1;
  const st=S.steps[i];
  S.end=Date.now()+st.dur*1000;
  renderStep(st);
  announceStart(st);
  if(st.type==='work'){beep(988,.35);vibe([150]);}
  else if(st.type==='rest'){beep(659,.35);vibe([80,50,80]);}
  tick();
}
function announceStart(st){
  if(st.type==='prep')say('Prépare-toi. Premier défi : '+spoken(EXOS[0])+'.');
  else if(st.type==='work')say(spoken(EXOS[st.ex])+'. '+spokenDuration(st.dur)+'.',true);
  else say('Bravo ! Ensuite : '+spoken(EXOS[st.next])+'.',true);
}
function renderStep(st){
  const ph=st.type,n=EXOS.length;
  document.body.dataset.phase=ph;
  const ex=EXOS[ph==='rest'?st.next:st.ex];
  $('phaseLabel').textContent={prep:'PRÉPARE-TOI',work:'À TOI !',rest:'RESPIRE'}[ph];
  $('roundInfo').textContent='Réveil kawaii';
  $('exInfo').textContent=ph==='rest'?'Prochain défi : '+(st.next+1)+' / '+n:'Défi '+(st.ex+1)+' / '+n;
  $('exName').textContent=ex.name;
  $('exTip').textContent=ex.tip;
  $('exSub').textContent=ph==='prep'?'Premier défi':ph==='rest'?'À suivre':'';
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
      if(sec===half&&st.dur>=25&&!S.flags.half){S.flags.half=1;say(EXOS[st.ex].halfSay||cheer(),true);beep(784,.15);}
      if(sec===10&&st.dur>=30&&!S.flags.ten){S.flags.ten=1;say('Plus que dix secondes !',true);}
    }
    if(sec>=1&&sec<=3){beep(sec===1?784:659,.15);vibe(40);}
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
  beep(988,.25);setTimeout(()=>beep(1319,.4),300);vibe([200,80,200,80,400]);
  cancelAnimationFrame(fig.raf);
  const h=loadStars();h.push(new Date(S.startedAt).toISOString());saveStars(h);
  const compliment=COMPLIMENTS[Math.floor(Math.random()*COMPLIMENTS.length)];
  say('Bravo '+cfg.name+' ! '+compliment,true);
  $('doneTitle').textContent='Bravo '+cfg.name+' ! 🎉';
  $('doneText').textContent=compliment+' Ton ⭐ du jour est dans ton carnet.';
  const wc=weekCount(h);
  $('doneStars').textContent='⭐'.repeat(Math.min(wc,7))+(wc?'':'⭐');
  show('done');
}
function togglePause(){
  initAudio();
  if(S.paused){
    S.paused=false;S.end=Date.now()+S.remain;
    $('pauseBtn').textContent='⏸';
    say('On reprend !',true);beep(660,.2);musicStart();
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
  if(S.paused){S.paused=false;$('pauseBtn').textContent='⏸';musicStart();}
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
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&$('workout').classList.contains('active')){requestWake();try{actx&&actx.state!=='running'&&actx.resume();keepAlive&&!S.paused&&cfg.music!=='ext'&&keepAlive.play().catch(()=>{});}catch(e){}}});

/* ====== Photo sur le personnage (gardée uniquement sur ce téléphone) ====== */
function setPhoto(file){
  const url=URL.createObjectURL(file),img=new Image();
  img.onload=()=>{
    const w=img.naturalWidth,h=img.naturalHeight,m=Math.min(w,h);
    const c=document.createElement('canvas');c.width=c.height=160;
    c.getContext('2d').drawImage(img,(w-m)/2,(h-m)*0.3,m,m,0,0,160,160);
    PHOTO=c.toDataURL('image/jpeg',.85);
    try{localStorage.setItem('kawaii-photo',PHOTO);}catch(e){}
    URL.revokeObjectURL(url);renderHome();
  };
  img.src=url;
}
function removePhoto(){PHOTO=null;try{localStorage.removeItem('kawaii-photo');}catch(e){}renderHome();}
$('photoBtn').addEventListener('click',()=>$('photoFile').click());
$('photoFile').addEventListener('change',()=>{const f=$('photoFile').files[0];if(f)setPhoto(f);$('photoFile').value='';});
$('photoDel').addEventListener('click',removePhoto);

/* ====== Accueil ====== */
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
  $('greet').textContent='Coucou '+cfg.name+' ! 🌸';
  const total=buildSteps().reduce((a,s)=>a+s.dur,0);
  $('summary').textContent='Réveil de '+Math.round(total/60)+' minutes · '+EXOS.length+' mini-défis';
  $('photoBtn').textContent=PHOTO?'📸 Changer ma photo':'📸 Ma photo sur le personnage';
  $('photoDel').hidden=!PHOTO;
  renderWeek();
  const ul=$('exList');ul.innerHTML='';
  EXOS.forEach((ex,i)=>{
    const li=document.createElement('li');
    const svg=el('svg',{viewBox:'0 0 200 200'});
    drawPose(buildFigure(svg),ex.frames[1],ex);
    li.innerHTML='<span class="n">'+(i+1)+'</span>';
    li.appendChild(svg);
    const t=document.createElement('span');t.className='t';t.textContent=ex.name+' · '+ex.dur+' s';
    li.appendChild(t);ul.appendChild(li);
  });
}
$('nameBtn').addEventListener('click',()=>{
  const n=cleanName($('nameInput').value);
  if(!n){$('nameInput').focus();return;}
  cfg.name=n;save();$('cfgName').value=n;renderHome();show('home');
});
$('nameInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('nameBtn').click();});
$('startBtn').addEventListener('click',startWorkout);
$('updateBtn').addEventListener('click',updateApp);
$('verInfo').textContent='Version '+APP_VERSION;
$('pauseBtn').addEventListener('click',togglePause);
$('musicBtn').addEventListener('click',cycleMusic);
$('nextBtn').addEventListener('click',()=>{initAudio();go(S.idx+1);});
$('prevBtn').addEventListener('click',()=>{initAudio();prevStep();});
$('quitBtn').addEventListener('click',()=>{if(confirm('Quitter le réveil ?'))quit();});
$('againBtn').addEventListener('click',()=>{renderHome();show('home');});
$('musicBtn').textContent=musicLabel();
if(cfg.name){renderHome();show('home');}else show('welcome');

if('serviceWorker' in navigator&&location.protocol.startsWith('http')){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
/* Exposé pour les tests */
window.__kawaii={buildSteps,cfg,EXOS};
