/* Starter spec. Copy this file into your project, edit it, then build it:
     python3 <kit>/bin/build.py diagram.js
   Full reference: <kit>/docs/spec.md. Canvas is 1720 x 900; cards are 310 x 74, placed by their centre. */
const DIAGRAM={
 title:'My project',
 nodes:{
  user:{label:'User',     icon:'user',     x:505,  y:330},
  api: {label:'API',      icon:'server',   x:860,  y:330},
  db:  {label:'Database', icon:'database', x:1215, y:330},
  out: {label:'Response', icon:'file',     x:505,  y:500},
 },
 groups:{},
 edges:{
  ask:  'M660 330H705',
  query:'M1015 330H1060',
  reply:'M860 367V500H660',
  back: 'M505 463V367',
 },
 steps:[
  {at:['user']}, {along:['ask'],dur:.9}, {at:['api']}, {along:['query'],dur:.9}, {at:['db']},
  {along:['reply'],dur:1.1}, {at:['out']}, {along:['back'],dur:.9}, {at:['user']},
 ],
 details:{},
};
