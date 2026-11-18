/* Engine: turns a diagram spec into the interactive page.
   GEOMETRY holds the default sizes; a spec may override card size per diagram or per card (docs/spec.md).
   Knows nothing about any project, colour or icon: those arrive as arguments (spec, library) and CSS tokens.
   Entry point: mountDiagram(spec, {icons, glyphs}). Spec format: docs/spec.md. */
const GEOMETRY={
 cardW:310, cardH:74, cardR:14, iconX:40, labelX:74, labelPx:18,
 groupR:20, tile:54, tileR:13, tileGap:77,
 detail:{inputX:155, inputW:230, cardW:280, rowGap:150, midY:450, colsX:320, colsW:900, resultX:1260, resultW:420},
};
function mountDiagram(spec,lib){
 const G=GEOMETRY,ns='http://www.w3.org/2000/svg',q=new URLSearchParams(location.search),$=id=>document.getElementById(id);
 const ICONS={...lib.icons,...spec.icons},GLYPHS={...lib.glyphs,...spec.glyphs};
 const topL=$('top'),det=$('detail'),topS=$('topS'),detS=$('detS');
 const mk=(t,a,p,txt)=>{const e=document.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;p.appendChild(e);return e};
 const need=(map,id,what)=>{if(!(id in map))throw new Error(`Unknown ${what} "${id}". Available: ${Object.keys(map).join(', ')}`);return map[id]};

 /* --- shapes --- */
 function card(p,{label,icon,cx,y,w=G.cardW,h=G.cardH,scale:s=1}){const x=cx-w/2,el=mk('g',{class:'node'},p);
  mk('rect',{class:'card',x,y:y-h/2,width:w,height:h,rx:Math.min(G.cardR*s,h/2)},el);
  if(icon)mk('g',{class:'ic',transform:`translate(${x+G.iconX*s} ${y})`+(s===1?'':` scale(${s})`)},el).innerHTML=need(ICONS,icon,'icon');
  const t=mk('text',icon?{x:x+G.labelX*s,y:y+7*s}:{x:cx,y:y+7*s,'text-anchor':'middle'},el,label);
  if(s!==1)t.style.fontSize=G.labelPx*s+'px';return el}
 function group(p,g){const el=mk('g',{class:'group'},p);
  mk('rect',{x:g.x,y:g.y,width:g.w,height:g.h,rx:G.groupR},el);mk('text',{x:g.x+22,y:g.y+29},el,g.label);
  (g.tiles||[]).forEach((n,i)=>{const x=g.x+60+i*G.tileGap,y=g.y+82,h=G.tile/2;
   mk('rect',{class:'tile gi',x:x-h,y:y-h,width:G.tile,height:G.tile,rx:G.tileR},el);
   mk('g',{class:'gi',transform:`translate(${x} ${y}) scale(1.15)`},el).innerHTML=need(ICONS,n,'icon')});return el}
 function result(p,{text,glyph,x,y,w}){const el=mk('g',{class:'res'},p);
  mk('rect',{x,y:y-G.cardH/2,width:w,height:G.cardH,rx:G.cardR},el);mk('circle',{cx:x+41,cy:y,r:23},el);
  if(glyph)mk('g',{transform:`translate(${x+41} ${y})`},el).innerHTML=need(GLYPHS,glyph,'glyph');
  mk('text',{x:x+78,y:y+6},el,text);return el}
 function link(p,d){mk('path',{class:'line',d},p);const pr=mk('path',{class:'prog',d},p),len=pr.getTotalLength();
  pr.style.strokeDasharray=len;pr.style.strokeDashoffset=len;return{pr,len}}
 const dot=p=>mk('circle',{class:'dot',r:7,opacity:0},p);

 /* --- playback: a scene is {els, seq, cur, dots}; seq items are
        ['h', elements]  hold: light these up
        ['m', links, seconds]  move: trace these lines
        ['o', elements, detailId]  open a detail page --- */
 let raf=null,DS=null;
 function render(S,i,u=1){const seen=new Set();let lit=[];
  S.seq.forEach((ph,j)=>{if(ph[0]==='m')ph[1].forEach(L=>L.pr.style.strokeDashoffset=j<i?0:j===i?L.len*(1-u):L.len);
   else if(j<=i){ph[1].forEach(e=>seen.add(e));if(j===i)lit=ph[1]}});
  S.els.forEach(e=>{e.classList.toggle('on',lit.includes(e));e.classList.toggle('dim',i>=0&&!seen.has(e))});
  S.dots.forEach(d=>d.setAttribute('opacity',0));const ph=S.seq[i];
  if(ph&&ph[0]==='m')ph[1].forEach((L,n)=>{const pt=L.pr.getPointAtLength(L.len*u),d=S.dots[n];d.setAttribute('cx',pt.x);d.setAttribute('cy',pt.y);d.setAttribute('opacity',1)})}
 function go(S,d){cancelAnimationFrame(raf);
  if(d<0){let i=S.cur;do{i--}while(i>0&&S.seq[i][0]!=='h');S.cur=Math.max(i,0);return render(S,S.cur)}
  const i=S.cur+1;if(i>=S.seq.length)return render(S,S.cur);S.cur=i;const ph=S.seq[i];
  if(ph[0]==='o'){render(S,i);return open(ph[2])}
  if(ph[0]==='h')return render(S,i);
  const dur=ph[2]*1000,t0=performance.now();
  (function tick(now){const u=Math.min((now-t0)/dur,1),e=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;render(S,i,e);
   if(u<1)raf=requestAnimationFrame(tick);else{const nx=S.seq[i+1];if(nx&&nx[0]==='h')S.cur=i+1;render(S,S.cur)}})(t0)}
 const clampStep=(v,S)=>v==='end'?S.seq.length-1:Math.max(-1,Math.min(+v,S.seq.length-1));

 /* --- detail page: input card -> rows of step cards -> result pill, laid out automatically --- */
 function open(id){const d=spec.details&&spec.details[id];if(!d)return;const T=G.detail;cancelAnimationFrame(raf);det.innerHTML='';
  mk('text',{class:'crumb',x:90,y:108},det,'← '+(spec.title||'Overview')).onclick=close;
  mk('text',{class:'title',x:90,y:160},det,d.title);
  const lines=mk('g',{},det),S=DS={els:[],seq:[],cur:0,dots:[]},R=d.rows.length,half=T.cardW/2,inR=T.inputX+T.inputW/2;
  const slot=(n,i)=>{const g=(T.colsW-T.cardW*n)/(n+1),edge=n===3?0:g,gap=n===3?30:g;return T.colsX+edge+i*(T.cardW+gap)+half};
  const box=(o,cx,y,w)=>{const e=card(det,{...o,cx,y,w});S.els.push(e);return e};
  S.seq.push(['h',[box(d.input,T.inputX,T.midY,T.inputW)]]);
  d.rows.forEach((row,r)=>{const y=T.midY+(r-(R-1)/2)*T.rowGap,N=row.steps.length;
   row.steps.forEach((s,i)=>{const cx=slot(N,i);
    const path=i?`M${slot(N,i-1)+half} ${y}H${cx-half}`:`M${inR} ${T.midY}${y===T.midY?'':`H${inR+25}V${y}`}H${cx-half}`;
    S.seq.push(['m',[link(lines,path)],i?.5:.8],['h',[box(s,cx,y,T.cardW)]])});
   const pill=result(det,{text:row.result,glyph:row.glyph,x:T.resultX,y,w:T.resultW});S.els.push(pill);
   S.seq.push(['m',[link(lines,`M${slot(N,N-1)+half} ${y}H${T.resultX}`)],.5],['h',[pill]])});
  S.dots=[dot(det)];if(q.get('dstep')!=null)S.cur=clampStep(q.get('dstep'),S);
  detS.classList.add('init');render(S,S.cur);detS.getBoundingClientRect();detS.classList.remove('init');topS.classList.add('hide');detS.classList.remove('hide')}
 function close(){cancelAnimationFrame(raf);detS.classList.add('hide');topS.classList.remove('hide')}
 const inDetail=()=>!detS.classList.contains('hide');

 /* --- overview --- */
 if(spec.title)document.title=spec.title;
 const under=mk('g',{},topL),L={},E={},M={els:[],seq:[],cur:-1,dots:[]};
 for(const k in spec.edges)L[k]=link(under,spec.edges[k]);
 for(const k in spec.groups||{}){E[k]=group(under,spec.groups[k]);
  if(spec.details&&spec.details[k]){E[k].classList.add('click');E[k].onclick=()=>open(k)}}
 const dotLayer=mk('g',{},topL);
 for(const k in spec.nodes){const n=spec.nodes[k];E[k]=card(topL,{...spec.card,...n,cx:n.x})}
 M.els=Object.values(E);
 M.seq=(spec.steps||[]).map(s=>s.at?['h',s.at.map(id=>need(E,id,'node or group'))]
  :s.along?['m',s.along.map(id=>need(L,id,'edge')),s.dur||1]
  :['o',[need(E,s.open,'group')],s.open]);
 M.dots=Array.from({length:Math.max(1,...M.seq.map(p=>p[0]==='m'?p[1].length:0))},()=>dot(dotLayer));
 if(q.get('step')!=null){M.cur=clampStep(q.get('step'),M);render(M,M.cur,+(q.get('u')||1))}
 if(q.get('view'))open(q.get('view'));
 addEventListener('keydown',e=>{const k=e.code,fwd=k==='ArrowRight'||k==='Space'||k==='PageDown',back=k==='ArrowLeft'||k==='PageUp';
  if(k==='Escape'||k==='Backspace')close();
  else if(fwd||back){e.preventDefault();
   if(inDetail()){if(fwd?DS.cur>=DS.seq.length-1:DS.cur<=0)close();else go(DS,fwd?1:-1)}else go(M,fwd?1:-1)}});
}
function showDiagramError(err){const p=document.createElement('pre');p.className='error';p.textContent='Diagram spec error\n\n'+err.message;document.body.appendChild(p);console.error(err)}
