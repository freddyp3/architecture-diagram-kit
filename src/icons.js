/* Icon library. Content only: no layout, no behaviour.
   ICONS:  colourful icons for cards and tiles, drawn in a 28 x 28 box centred on (0, 0).
   GLYPHS: white marks for the accent circle on result pills, drawn within -10..10.
   See docs/icons.md for the drawing rules. A diagram can add its own via `icons` / `glyphs` in its spec. */
const st=(c,d,w=3)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const LIST='M-5-8h17M-5 0h17M-5 8h17M-12-8h.1M-12 0h.1M-12 8h.1';
const ICONS={
 user:'<circle cx="0" cy="-5" r="6" fill="#334155"/><path d="M-11 13a11 10 0 0 1 22 0z" fill="#334155"/>',
 claude:'<g transform="translate(-14 -14) scale(1.1667)"><path fill="#D97757" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></g>',
 gemini:'<g transform="translate(-14 -14) scale(1.1667)"><path fill="#4285F4" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></g>',
 server:'<rect x="-13" y="-12" width="26" height="10" rx="3" fill="#10b981"/><rect x="-13" y="2" width="26" height="10" rx="3" fill="#10b981"/><circle cx="-8" cy="-7" r="1.8" fill="#fff"/><circle cx="-8" cy="7" r="1.8" fill="#fff"/>',
 code:st('#64748b','M-5-9l-9 9 9 9M5-9l9 9-9 9'),
 checklist:'<rect x="-11" y="-14" width="22" height="28" rx="3" fill="#a3e635" stroke="#fff" stroke-width="1.5"/>'+st('#1c1917','M-6-6l2.5 2.5L1-8M-6 3l2.5 2.5L1 1M4-5h4M4 4h4',1.8),
 bars:'<rect x="-13" y="2" width="6" height="11" rx="1.5" fill="#f43f5e"/><rect x="-3" y="-5" width="6" height="18" rx="1.5" fill="#f43f5e"/><rect x="7" y="-13" width="6" height="26" rx="1.5" fill="#f43f5e"/>',
 cards:'<rect x="-13" y="-9" width="17" height="22" rx="3" fill="#fbbf24" stroke="#fff" stroke-width="1.5"/><rect x="-5" y="-13" width="17" height="22" rx="3" fill="#fb923c" stroke="#fff" stroke-width="1.5"/><path d="M1-6v8l7-4z" fill="#fff"/>',
 tree:'<path d="M0-14l9 12h-5l7 9H-11l7-9h-5z" fill="#10b981"/><rect x="-2" y="7" width="4" height="7" rx="1" fill="#92400e"/>',
 clock:'<circle r="13" fill="#f59e0b"/>'+st('#fff','M0-7V0l5 3',2.4),
 embed:'<g fill="#6366f1"><circle cx="-9" cy="-9" r="3"/><circle cx="0" cy="-9" r="3" opacity=".5"/><circle cx="9" cy="-9" r="3"/><circle cx="-9" cy="0" r="3" opacity=".5"/><circle cx="0" cy="0" r="3"/><circle cx="9" cy="0" r="3" opacity=".5"/><circle cx="-9" cy="9" r="3"/><circle cx="0" cy="9" r="3" opacity=".5"/><circle cx="9" cy="9" r="3"/></g>',
 list:st('#f97316',LIST),
 'list-grey':st('#64748b',LIST),
 merge:st('#10b981','M-12-10L-1 0L-12 10M-12 0H12M6-6l6 6-6 6'),
 slices:'<rect x="-14" y="-10" width="28" height="20" rx="4" fill="#f59e0b"/>'+st('#fff','M-5-10V10M4-10V10',2.2),
 exits:st('#f59e0b','M-12-10V10H0M-2 0H12M7-5l5 5-5 5'),
 comment:'<path d="M-13-11h26a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H-2l-7 6v-6h-4a2 2 0 0 1-2-2V-9a2 2 0 0 1 2-2z" fill="#ec4899"/><path d="M-8-4h16M-8 2h10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
 group:'<rect x="-13" y="-13" width="11" height="11" rx="3" fill="#ec4899"/><rect x="2" y="-13" width="11" height="11" rx="3" fill="#0ea5e9"/><rect x="-13" y="2" width="11" height="11" rx="3" fill="#10b981"/><rect x="2" y="2" width="11" height="11" rx="3" fill="#f59e0b"/>',
 hashtag:st('#0ea5e9','M-6-12L-9 12M7-12L4 12M-12-5H12M-13 5H11'),
 regression:st('#f59e0b','M-12 9L12-9')+'<g fill="#f59e0b"><circle cx="-8" cy="1" r="2.6"/><circle cx="-2" cy="6" r="2.6"/><circle cx="3" cy="-7" r="2.6"/><circle cx="9" cy="-1" r="2.6"/></g>',
 database:'<path d="M-12-8v16c0 2.8 5.4 5 12 5s12-2.2 12-5V-8z" fill="#0ea5e9"/><ellipse cy="-8" rx="12" ry="5" fill="#7dd3fc"/>'+st('#fff','M-12 0c0 2.8 5.4 5 12 5s12-2.2 12-5',1.6),
 globe:'<circle r="13" fill="#0ea5e9"/><g fill="none" stroke="#fff" stroke-width="1.8"><ellipse rx="5.5" ry="13"/><path d="M-13 0H13"/></g>',
 bolt:'<path d="M3-14L-10 3h8l-3 11L10-4H2z" fill="#f59e0b"/>',
 lock:st('#6366f1','M-6-2v-5a6 6 0 0 1 12 0v5',3)+'<rect x="-11" y="-3" width="22" height="16" rx="4" fill="#6366f1"/><circle cy="5" r="2.4" fill="#fff"/>',
 file:'<path d="M-10-14H4l7 7v19a2 2 0 0 1-2 2H-10a2 2 0 0 1-2-2v-24a2 2 0 0 1 2-2z" fill="#94a3b8"/>'+st('#fff','M-6 0h12M-6 6h8',2),
 queue:'<rect x="-14" y="-12" width="28" height="6" rx="3" fill="#8b5cf6"/><rect x="-14" y="-3" width="28" height="6" rx="3" fill="#8b5cf6" opacity=".7"/><rect x="-14" y="6" width="28" height="6" rx="3" fill="#8b5cf6" opacity=".4"/>',
 video:'<rect x="-14" y="-10" width="28" height="20" rx="5" fill="#ef4444"/><path d="M-4-6v12l10-6z" fill="#fff"/>',
 window:'<rect x="-14" y="-11" width="28" height="22" rx="4" fill="#8b5cf6"/><path d="M-14-4H14" stroke="#fff" stroke-width="2"/><circle cx="-9.5" cy="-7.5" r="1.4" fill="#fff"/><circle cx="-5.5" cy="-7.5" r="1.4" fill="#fff"/>',
 bell:'<path d="M0-13a8 8 0 0 0-8 8v6l-3 5h22l-3-5v-6a8 8 0 0 0-8-8z" fill="#f43f5e"/><circle cy="10" r="3" fill="#f43f5e"/>',
 mail:'<rect x="-14" y="-10" width="28" height="20" rx="4" fill="#ec4899"/>'+st('#fff','M-9-4l9 6 9-6',2.2),
 card:'<rect x="-14" y="-10" width="28" height="20" rx="4" fill="#10b981"/><rect x="-14" y="-5" width="28" height="5" fill="#fff"/>'+st('#fff','M-9 5h6',2),
 cloud:'<path d="M-7 10a7 7 0 0 1-1-13.9A9 9 0 0 1 9-2a6 6 0 0 1-1 12z" fill="#0ea5e9"/>',
 gear:'<circle r="9" fill="none" stroke="#64748b" stroke-width="7" stroke-dasharray="4.71 4.71"/><circle r="8" fill="#64748b"/><circle r="3.2" fill="#fff"/>',
};
/* White glyphs for the accent circle on result pills. */
const GLYPHS={
 globe:'<g fill="none" stroke="#fff" stroke-width="2.2"><circle r="10"/><ellipse rx="4.5" ry="10"/><path d="M-10 0H10"/></g>',
 drop:st('#fff','M-10-7L-3 0L1-4L10 5M10-1V5H4'),
 bars:'<g fill="#fff"><rect x="-10" y="1" width="5" height="8" rx="1"/><rect x="-2.5" y="-4" width="5" height="13" rx="1"/><rect x="5" y="-9" width="5" height="18" rx="1"/></g>',
 curve:st('#fff','M-10-8C-2-8-3 8 10 8'),
 chat:'<path d="M-10-8h20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H-1l-6 5v-5h-3a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z" fill="#fff"/>',
 check:st('#fff','M-9 0l6 6L9-7'),
 doc:st('#fff','M-7-10H3l5 5v15H-7zM-3 0h7M-3 5h7',2.2),
};
