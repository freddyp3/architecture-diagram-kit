/* Starter spec. Copy this file into your project, edit it, then build it:
     python3 <kit>/bin/build.py diagram.js
   Full reference: <kit>/docs/spec.md. Cards are placed by their centre.
   The sizes below suit this four-card drawing, they are not rules: set canvas and card to whatever suits yours. */
const DIAGRAM={
 title:'My project',
 canvas:[1300,650],
 card:{w:310,h:74},
 nodes:{
  user:{label:'User',     icon:'user',     x:295,  y:240},
  api: {label:'API',      icon:'server',   x:650,  y:240},
  db:  {label:'Database', icon:'database', x:1005, y:240},
  out: {label:'Response', icon:'file',     x:295,  y:410},
 },
 groups:{},
 edges:{
  ask:  'M450 240H495',
  query:'M805 240H850',
  reply:'M650 277V410H450',
  back: 'M295 373V277',
 },
 steps:[
  {at:['user']}, {along:['ask'],dur:.9}, {at:['api']}, {along:['query'],dur:.9}, {at:['db']},
  {along:['reply'],dur:1.1}, {at:['out']}, {along:['back'],dur:.9}, {at:['user']},
 ],
 details:{},
};
