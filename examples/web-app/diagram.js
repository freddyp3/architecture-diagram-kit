/* A generic web application: request in, data stored, background work done, user notified. */
const DIAGRAM={
 title:'Example web app',
 nodes:{
  user: {label:'User',         icon:'user',     x:317,  y:294},
  web:  {label:'Web app',      icon:'window',   x:672,  y:294},
  api:  {label:'API',          icon:'server',   x:1027, y:294},
  db:   {label:'Database',     icon:'database', x:1382, y:259},
  cache:{label:'Cache',        icon:'bolt',     x:1382, y:349},
  note: {label:'Notification', icon:'bell',     x:317,  y:575},
 },
 groups:{
  store:{label:'storage',           x:1207, y:182, w:350, h:224},
  jobs: {label:'background jobs',   x:675,  y:510, w:350, h:130, tiles:['queue','gear','clock','file']},
  ext:  {label:'external services', x:1207, y:510, w:350, h:130, tiles:['mail','card','cloud','lock']},
 },
 edges:{
  request:'M472 294H517',
  call:   'M827 294H872',
  data:   'M1182 294H1207',
  enqueue:'M950 331V510',
  send:   'M1025 575H1207',
  notify: 'M1382 640V695H317V612',
  seen:   'M317 538V331',
 },
 steps:[
  {at:['user']}, {along:['request'],dur:.9}, {at:['web']}, {along:['call'],dur:.9}, {at:['api']},
  {along:['data'],dur:.9}, {at:['store','db','cache']},
  {along:['enqueue'],dur:1}, {at:['jobs']}, {open:'jobs'},
  {along:['send'],dur:.7}, {at:['ext']},
  {along:['notify'],dur:2}, {at:['note']}, {along:['seen'],dur:1}, {at:['user']},
 ],
 details:{
  jobs:{title:'background jobs', input:{label:'Job request',icon:'list'}, rows:[
   {steps:[{label:'Queue',icon:'queue'},{label:'Worker',icon:'gear'},{label:'Render document',icon:'file'}], result:'receipts · reports · exports', glyph:'doc'},
   {steps:[{label:'Schedule',icon:'clock'},{label:'Worker',icon:'gear'}], result:'nightly cleanup · backups', glyph:'check'},
  ]},
 },
};
