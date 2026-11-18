/* Shorts Pre-Publish Copilot: the diagram this kit was generalised from. */
const DIAGRAM={
 title:'Shorts Pre-Publish Copilot',
 nodes:{
  cr:  {label:'User/Creator', icon:'user',      x:317,  y:294},
  cl:  {label:'Claude',       icon:'claude',    x:672,  y:294},
  mcp: {label:'MCP server',   icon:'server',    x:1027, y:294},
  gem: {label:'Gemini',       icon:'gemini',    x:1382, y:259},
  code:{label:'Code',         icon:'code',      x:1382, y:349},
  plan:{label:'Publish plan', icon:'checklist', x:317,  y:464},
 },
 groups:{
  fe:{label:'feature extraction',   x:1207, y:182, w:350, h:224},
  rp:{label:'retention prediction', x:797,  y:534, w:350, h:130, tiles:['cards','gemini','tree','regression']},
  ar:{label:'audience reaction',    x:1207, y:534, w:350, h:130, tiles:['cards','comment','group','claude']},
 },
 edges:{
  e1:'M472 294H517', e2:'M827 294H872', e3:'M1182 294H1207',
  f1:'M1382 406V470H972V534', f2:'M1382 406V534',
  r1:'M797 599H732V331', r2:'M1382 664V719H732V331',
  e6:'M612 331V464H472', e7:'M317 427V331',
 },
 steps:[
  {at:['cr']}, {along:['e1'],dur:.9}, {at:['cl']}, {along:['e2'],dur:.9}, {at:['mcp']}, {along:['e3'],dur:.9},
  {at:['fe','gem','code']}, {along:['f1'],dur:1.1}, {at:['rp']}, {open:'rp'},
  {along:['f2'],dur:.8}, {at:['ar']}, {open:'ar'},
  {along:['r1','r2'],dur:2}, {at:['cl']}, {along:['e6'],dur:1.1}, {at:['plan']}, {along:['e7'],dur:.9}, {at:['cr']},
 ],
 details:{
  rp:{title:'retention prediction', input:{label:'Draft features',icon:'list'}, rows:[
   {steps:[{label:'Embed timeline',icon:'embed'},{label:'Search similar Shorts',icon:'cards'},{label:'LLM-as-a-judge',icon:'gemini'}], result:'drop-off points · middle retention · rewatch', glyph:'drop'},
   {steps:[{label:'Structure features',icon:'list-grey'},{label:'Random forest',icon:'tree'},{label:'Average 200 trees',icon:'merge'}], result:'opening retention · ending retention', glyph:'bars'},
   {steps:[{label:'Split into seconds',icon:'slices'},{label:'Ridge regression',icon:'regression'},{label:'Viewers lost per second',icon:'exits'}], result:'second-by-second retention curve', glyph:'curve'},
  ]},
  ar:{title:'audience reaction', input:{label:'Draft features',icon:'list'}, rows:[
   {steps:[{label:'Search similar Shorts',icon:'cards'},{label:'Real viewer comments',icon:'comment'},{label:'Group by theme',icon:'group'}], result:'past comment themes', glyph:'chat'},
   {steps:[{label:'Find topics',icon:'hashtag'},{label:'Claude web search',icon:'claude'}], result:'current community talk', glyph:'globe'},
  ]},
 },
};
