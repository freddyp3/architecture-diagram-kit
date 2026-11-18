/* Icon gallery page: shows every icon and glyph in the library with its name. Built by `bin/build.py --icons`. */
function mountGallery(lib){
 const ns='http://www.w3.org/2000/svg',root=document.getElementById('top'),COLS=9;
 const mk=(t,a,p,txt)=>{const e=document.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;p.appendChild(e);return e};
 const cell=(html,name,i,y0,glyph)=>{const x=150+(i%COLS)*178,y=y0+Math.floor(i/COLS)*140;
  if(glyph)mk('circle',{cx:x,cy:y,r:23},mk('g',{class:'res'},root));else mk('rect',{class:'tile',x:x-27,y:y-27,width:54,height:54,rx:13},root);
  mk('g',{transform:`translate(${x} ${y})`+(glyph?'':' scale(1.15)')},root).innerHTML=html;mk('text',{class:'caption',x,y:y+52},root,name)};
 document.title='Icons';mk('text',{class:'title',x:90,y:90},root,'Icons');
 const names=Object.keys(lib.icons);names.forEach((k,i)=>cell(lib.icons[k],k,i,180));
 const y0=180+Math.ceil(names.length/COLS)*140+60;mk('text',{class:'title',x:90,y:y0-60,style:'font-size:20px'},root,'Result glyphs');
 Object.keys(lib.glyphs).forEach((k,i)=>cell(lib.glyphs[k],k,i,y0,true))}
