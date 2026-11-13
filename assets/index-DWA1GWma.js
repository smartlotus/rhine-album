(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var P0=["0","1","2","3","4","5","6","7","8","9"],yr=new Map,Nf=/[\u0590-\u08ff\u200e\u200f\u202a-\u202e\u2066-\u2069\ufb1d-\ufeff]/u;function D0(n={}){let e=Intl.getCanonicalLocales(n.locales),t=Object.fromEntries(Object.entries(n.format??{}).sort(([r],[a])=>r.localeCompare(a))),i=JSON.stringify([e,t]),s=yr.get(i);if(!s){s=new Intl.NumberFormat(e,t);let r=yr.keys().next().value;yr.size>=64&&r!==void 0&&yr.delete(r),yr.set(i,s)}return s}function L0(n,e={}){let t=D0(e),i=t.formatToParts(n),s=i.map(m=>m.value).join(""),r=t.resolvedOptions(),a=r.numberingSystem==="latn"&&r.notation==="standard"&&!Nf.test(s)&&!i.some(m=>m.type==="nan"||m.type==="infinity"),o=JSON.stringify(r);if(!a)return{text:s,tokens:[],rollable:a,signature:o,magnitude:""};let l=i.filter(m=>m.type==="integer").reduce((m,v)=>m+v.value.length,0),c=-1,h=new Map,d=[],u="",f="";for(let m of i)if(m.type==="integer"||m.type==="fraction"){m.type==="integer"?u+=m.value:f+=m.value;for(let v of m.value){let p=`digit:${m.type==="integer"?--l:c--}`;d.push({key:p,identity:p,text:v,wheel:P0,index:Number(v)})}}else if(m.type==="group"){let v=`group:${l}`;d.push({key:`${v}:${m.value}`,identity:v,text:m.value})}else{let v=h.get(m.type)??0;h.set(m.type,v+1);let p=m.type==="plusSign"||m.type==="minusSign"?"sign":m.type;d.push({key:`${m.type}:${v}:${m.value}`,identity:`${p}:${v}`,text:m.value})}return{text:s,tokens:d,rollable:a,signature:o,magnitude:`${u.replace(/^0+(?=\d)/u,"")}.${f}`}}function I0(n,e){let[t="",i=""]=n.magnitude.split("."),[s="",r=""]=e.magnitude.split(".");if(t.length!==s.length)return s.length>t.length?1:-1;if(t!==s)return s>t?1:-1;let a=Math.max(i.length,r.length),o=i.padEnd(a,"0"),l=r.padEnd(a,"0");return l===o?0:l>o?1:-1}var gu=" ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-/&+'",Mr=new Map;function N0(n){let e=Mr.get(n);return e||(e=[...new Set(Uf(n))],Mr.size>=16&&Mr.delete(Mr.keys().next().value),Mr.set(n,e)),e}function Uf(n){return typeof Intl.Segmenter=="function"?[...new Intl.Segmenter(void 0,{granularity:"grapheme"}).segment(n)].map(e=>e.segment):[...n]}function U0(n,e={}){let t=e.charset??gu,i=!Nf.test(n);if(!i)return{text:n,tokens:[],rollable:i,signature:"text",magnitude:""};let s=Uf(n).map((r,a)=>{if(e.transition==="direct")return{key:`char:${a}`,identity:`char:${a}`,text:r,wheel:[r],index:0};let o=N0(typeof t=="string"?t:t[a]??t.at(-1)??gu),l=`char:${a}`,c=o.indexOf(r);return c>=0?{key:l,identity:l,text:r,wheel:o,index:c}:{key:`${l}:${r}`,identity:l,text:r}});return{text:n,tokens:s,rollable:i,signature:`text:${e.transition??"wheel"}`,magnitude:""}}function O0(n,e,t=.14){return{target:0,duration:e,points:Array.from({length:49},(i,s)=>{if(s===48)return 0;let r=Math.max(0,Math.min(1,(s/48-t)/(1-t)));return n*(1+10*r)*Math.exp(-10*r)})}}function xa(n,e){if(e<=0||n.duration<=0)return n;let t=n.duration+e,i=Math.round((n.points.length-1)*t/n.duration)+1,s=n.points[0]??n.target;return{target:n.target,duration:t,points:Array.from({length:i},(r,a)=>{if(a===i-1)return n.target;let o=a/(i-1)*t-e;return o<=0?s:Of(n,o).position})}}function gn(n,e,t,i){if(i<=0)return{points:[e,e],duration:0,target:e};let s=i/1e3,r=n-e,a=Math.max(Math.abs(r),1)*12/s,o=Math.max(-a,Math.min(a,t))*s;return{points:Array.from({length:49},(l,c)=>{if(c===48)return e;let h=c/48;return e+(r+(o+10*r)*h)*Math.exp(-10*h)}),duration:i,target:e}}function F0(n,e=0,t=24){if(n.duration<=0)return{points:[0,0],duration:0,target:0};let i=n.duration/(n.points.length-1)/1e3;return{duration:n.duration,target:0,points:n.points.map((s,r,a)=>{if(r===0)return Math.max(0,Math.min(1,e));if(r===a.length-1)return 0;let o=Math.abs((a[r+1]-a[r-1])/(2*i)),l=t/6;return Math.max(0,Math.min(1,(o-l)/(t-l)))})}}function Of(n,e){if(e>=n.duration||n.duration===0)return{position:n.target,velocity:0};let t=Math.max(0,e)/n.duration*(n.points.length-1),i=Math.min(Math.floor(t),n.points.length-2),s=n.points[i]??n.target,r=n.points[i+1]??n.target;return{position:s+(r-s)*(t-i),velocity:(r-s)*(n.points.length-1)*1e3/n.duration}}function vu(n,e,t,i=10){let s=Math.floor(n/i)*i+e;return t>0&&s<n-.001?s+=i:t<0&&s>n+.001?s-=i:t===0&&(s+=Math.round((n-s)/i)*i),s}var xo=(n,e)=>n[(e%n.length+n.length)%n.length];function B0(n,e,t){let i=Math.floor(e),s=e-i,r=[xo(n,i)];return s>1e-5&&r.push(xo(n,i+1)),r.at(-1)!==t&&r.push(t),{wheel:r,from:s,target:r.length-1}}function H0(n,e="outward"){if(e!=="outward"){let s=n.map((a,o)=>a?-1:o).filter(a=>a>=0);e==="end"&&s.reverse();let r=n.map(a=>a?0:1);return e!=="none"&&s.forEach((a,o)=>{r[a]=o+1}),r}let t=n.map((s,r)=>s?0:r+1);if(!n.includes(!0))return t;let i=-1/0;for(let s=0;s<n.length;s++)n[s]?i=s:t[s]=s-i;i=1/0;for(let s=n.length-1;s>=0;s--)n[s]?i=s:t[s]=Math.min(t[s],i-s);return t}function Au(n,e){let t=new Map,i=[],s=0;for(let r of n){let a=e.get(r);if(!a){i.push(r);continue}for(let o of i)t.set(o,a.x);i.length=0,s=a.x+a.width}for(let r of i)t.set(r,s);return t}var il=new WeakMap;class Sh{view;media;members=new Set;pending=new Set;sizes=new WeakMap;intersections=new WeakMap;resize;intersection;frame=0;static for(e){let t=il.get(e);return t||(t=new Sh(e),il.set(e,t)),t}constructor(e){this.view=e,this.media=e.matchMedia("(prefers-reduced-motion: reduce)"),this.media.addEventListener("change",this.refresh),e.document.addEventListener("visibilitychange",this.refresh),e.document.fonts?.addEventListener("loadingdone",this.refresh),e.document.fonts?.ready.then(this.refresh),e.ResizeObserver&&(this.resize=new e.ResizeObserver(t=>{for(let i of t){let s=this.sizes.get(i.target);s?.sizeChanged(i.target,i.contentRect.width,i.contentRect.height)&&s.refresh()}})),e.IntersectionObserver&&(this.intersection=new e.IntersectionObserver(t=>{for(let i of t)this.intersections.get(i.target)?.visibility(i.isIntersecting)},{rootMargin:"64px"}))}refresh=()=>{for(let e of this.members)e.refresh()};add(e,t){this.members.add(e),this.intersections.set(t,e),this.intersection?.observe(t)}watch(e,t){this.sizes.set(e,t),this.resize?.observe(e)}unwatch(e){this.resize?.unobserve(e),this.sizes.delete(e)}enqueue(e){this.pending.add(e),!this.frame&&(this.frame=this.view.requestAnimationFrame(()=>{this.frame=0;let t=[...this.pending];this.pending.clear();let i=t.map(r=>r.stage());for(let r of i)r?.();let s=t.map(r=>r.measure());for(let r of s)r?.()}))}remove(e,t){this.pending.delete(e),this.members.delete(e),this.intersection?.unobserve(t),this.intersections.delete(t),!this.members.size&&(this.view.cancelAnimationFrame(this.frame),this.resize?.disconnect(),this.intersection?.disconnect(),this.media.removeEventListener("change",this.refresh),this.view.document.removeEventListener("visibilitychange",this.refresh),this.view.document.fonts?.removeEventListener("loadingdone",this.refresh),il.delete(this.view))}}var xu=new WeakMap;function Bs(n,e,t){let i=n.animate(e,t),s=n.ownerDocument.timeline?.currentTime;return typeof s=="number"&&i.playState==="running"&&(i.startTime=s),i}function _u(n){let e=n.ownerDocument.defaultView;if(!e)return!1;let t=xu.get(e);return t===void 0&&(t=e.CSS?.supports("animation-timing-function","linear(0, 1)")??!1,xu.set(e,t)),t}class Vs{element;property;animation;motion;value=0;constructor(e,t){this.element=e,this.property=t}read(){let e=this.animation?.currentTime;return this.animation&&this.motion?Of(this.motion,typeof e=="number"?e:0):{position:this.value,velocity:0}}set(e,t){this.cancel(),this.value=e,this.element.style.setProperty(this.property,t(e))}play(e,t,i){if(this.cancel(),this.value=e.target,this.element.style.setProperty(this.property,t(e.target)),!e.duration||e.points.every(d=>d===e.target)){i?.();return}let s=e.points[0]??e.target,r=e.target-s,a=this.property==="opacity"&&_u(this.element),o=this.property==="transform"&&Math.abs(r)>1e-5&&_u(this.element),l=a?[{opacity:0},{opacity:1}]:o?[{[this.property]:t(s)},{[this.property]:t(e.target)}]:e.points.map(d=>({[this.property]:t(d)})),c=a?`linear(${e.points.map(t).join(",")})`:o?`linear(${e.points.map(d=>Number(((d-s)/r).toFixed(6))).join(",")})`:"linear",h=Bs(this.element,l,{duration:e.duration,easing:c});this.animation=h,this.motion=e,h.onfinish=()=>{this.animation===h&&(this.animation=void 0,this.motion=void 0,h.onfinish=null,h.cancel(),i?.())}}cancel(){this.animation&&(this.animation.onfinish=null,this.animation.cancel(),this.animation=void 0),this.motion=void 0}}var nl="http://www.w3.org/2000/svg",k0=0;class sl{host;layers=new Map;filter;intensity=1;constructor(e){this.host=e}filterUrl(e){if(!this.filter){let i=this.host.ownerDocument,s=i.createElementNS(nl,"svg");s.classList.add("rn-blur-defs"),s.setAttribute("aria-hidden","true"),s.setAttribute("focusable","false");let r=i.createElementNS(nl,"filter"),a;do a=`rn-vertical-blur-${++k0}`;while(i.getElementById(a));r.id=a,r.setAttribute("x","-15%"),r.setAttribute("width","130%"),r.setAttribute("color-interpolation-filters","sRGB");let o=i.createElementNS(nl,"feGaussianBlur");r.append(o),s.append(r),this.host.append(s),this.filter={svg:s,blur:o,id:a,height:0}}let t=e*.035*this.intensity;return this.filter.height!==t&&(this.filter.blur.setAttribute("stdDeviation",`0 ${t}`),this.filter.height=t),`url("#${this.filter.id}")`}apply(e,t,i,s,r="roll"){let a=F0(t,s,r==="entry"?6:24);if(a.points.every(d=>d===0))return!1;let o=this.host.ownerDocument.createElement("span");o.className="rn-sharp",o.append(...e.childNodes);let l=o.cloneNode(!0);l.className="rn-smear",l.style.filter=this.filterUrl(i),e.append(o,l);let c=new Vs(o,"opacity"),h=new Vs(l,"opacity");return this.layers.set(e,{sharp:o,sharpOpacity:c,smearOpacity:h}),c.play(a,d=>String(1-d)),h.play(a,String),!0}remove(e){let t=this.layers.get(e);if(!t)return 0;let i=t.smearOpacity.read().position;return t.sharpOpacity.cancel(),t.smearOpacity.cancel(),e.replaceChildren(...t.sharp.childNodes),this.layers.delete(e),i}destroy(){for(let e of this.layers.keys())this.remove(e);this.filter?.svg.remove(),this.filter=void 0}}function V0(n){return Math.max(45,Math.min(110,n/7))}function z0(n,e,t){let i=Math.abs(e-n);return{points:[n,e],target:e,duration:i*t}}function G0(n){let e=Array.from({length:n+1},(s,r)=>({"--rn-flap-step":String(r),offset:r/n,easing:"steps(1, end)"})),t=[],i=[];for(let s=0;s<n;s++){let r=s/n,a=(s+.5)/n,o=(s+1)/n;t.push({transform:"perspective(5em) rotateX(0deg)",filter:"brightness(1)",offset:r,easing:"cubic-bezier(.6, 0, 1, .5)"},{transform:"perspective(5em) rotateX(-90deg)",filter:"brightness(.45)",offset:a},{transform:"perspective(5em) rotateX(-90deg)",filter:"brightness(.45)",offset:o}),i.push({transform:"perspective(5em) rotateX(90deg)",filter:"brightness(.45)",offset:r},{transform:"perspective(5em) rotateX(90deg)",filter:"brightness(.45)",offset:a,easing:"linear(0, 0.58, 0.9, 1, 1.045 78%, 1)"},{transform:"perspective(5em) rotateX(0deg)",filter:"brightness(1)",offset:o})}return{index:e,falls:t,lands:i}}function W0(n){for(let e of n.querySelectorAll(".rn-flap-smear")){for(let t of e.getAnimations())t.cancel();e.remove()}for(let e of n.querySelectorAll(".rn-flap-sharp")){for(let t of e.getAnimations())t.cancel();e.classList.remove("rn-flap-sharp")}}function X0(n,e,t,i,s,r,a,o){let l=n.ownerDocument,c=Math.abs(i-t),h=i>=t?1:-1;if(!c){n.replaceChildren();return}let d=G0(c),u=Array.from({length:c+1},(S,E)=>xo(e,t+E*h)),f=[...u.slice(1),u.at(-1)],m=u.some(S=>/[\r\n\f\u2028\u2029]/u.test(S)),v=l.createElement("span");v.style.cssText=`display:block;position:relative;height:${s}px`,Bs(v,d.index,{delay:a,duration:c*r,fill:"both"});let p=(S,E)=>{let R=l.createElement("span");R.className=`rn-face rn-flap rn-flap-${S}`,R.style.height=`${s}px`,R.style.overflow="hidden";let x=l.createElement("span");x.style.cssText=`display:block;white-space:pre;line-height:${s}px`;let w=E?f:u;if(m)for(let L of w){let C=l.createElement("span");C.style.cssText=`display:block;height:${s}px`,C.textContent=L,x.append(C)}else x.textContent=w.join(`
`);return R.append(x),x.style.transform=`translateY(calc(var(--rn-flap-step) * ${-s}px))`,R},g=p("bottom",!1),_=p("top",!0),b=p("top",!1),y=p("bottom",!0);if(o){let S=(E,R)=>{let x=E.firstElementChild,w=x.cloneNode(!0);x.classList.add("rn-flap-sharp");let L=l.createElement("span");L.className="rn-flap-smear",L.style.cssText="display:block;position:absolute;inset:0;overflow:hidden",L.style.filter=o,L.append(w),E.append(L);let C=R.map(H=>({offset:H.offset,easing:H.easing??"linear",opacity:H.filter==="brightness(1)"?0:1})),F={delay:a,duration:c*r,fill:"both"};Bs(L,C,F),Bs(x,C.map(H=>({...H,opacity:1-H.opacity})),F)};S(b,d.falls),S(y,d.lands)}b.style.transform="perspective(5em) rotateX(-90deg)",Bs(b,d.falls,{delay:a,duration:c*r,fill:"backwards"}),y.style.transform="perspective(5em) rotateX(90deg)",Bs(y,d.lands,{delay:a,duration:c*r,fill:"forwards"}),n.style.height=`${s}px`,v.append(g,_,y,b),n.replaceChildren(v)}var q0=new WeakMap,Yr=new WeakSet,rl=n=>`translateX(${n}px)`,al=n=>`scale(${n})`,ol=n=>String(Math.max(0,Math.min(1,n))),ll=n=>"transition"in n&&n.transition==="direct";function Ff(n){if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0||n.duration>1e4))throw RangeError("duration must be between 0 and 10000 milliseconds");if(n.flipDuration!==void 0&&(!Number.isFinite(n.flipDuration)||n.flipDuration<1||n.flipDuration>1e4))throw RangeError("flipDuration must be between 1 and 10000 milliseconds")}var Y0={validate(n){if(typeof n.value!="number"&&typeof n.value!="bigint")throw TypeError("value must be a number or bigint");Ff(n)},model:n=>L0(n.value,n),direction:I0},j0={validate(n){if(typeof n.text!="string")throw TypeError("text must be a string");if(n.transition!==void 0&&n.transition!=="direct"&&n.transition!=="wheel")throw RangeError("transition must be direct or wheel");if(n.transition==="direct"&&n.mode==="flap")throw RangeError("Direct text transitions require roll mode");Ff(n)},model:n=>U0(n.text,n),direction:()=>1};class Bf{host;source;options;target;displayed;semantic;measurement;visual;measures=new Map;columns=new Map;sizes=new Map;scheduler;enhanced=!1;destroyed=!1;visible=!0;reset=!0;measurementPending=!1;hadClass;previousLeft;blur;blurIntensity=1;constructor(e,t,i){this.host=e,this.source=i,i.validate(t),this.options={...t},this.target=this.displayed=i.model(t);let s=e.ownerDocument,r=o=>{let l=s.createElement("span");return l.className=o,l};this.semantic=r("rn-value"),this.measurement=r("rn-measure"),this.visual=r("rn-visual"),this.measurement.setAttribute("aria-hidden","true"),this.visual.setAttribute("aria-hidden","true"),this.semantic.textContent=this.target.text,this.hadClass=e.classList.contains("rn-root"),e.classList.add("rn-root"),e.replaceChildren(this.semantic,this.measurement,this.visual);let a=s.defaultView;a&&typeof a.matchMedia=="function"&&typeof a.requestAnimationFrame=="function"&&typeof e.animate=="function"&&(this.scheduler=Sh.for(a),this.scheduler.add(this,e),this.scheduler.watch(this.measurement,this)),this.prepare()}canAnimate(){return!!this.scheduler&&this.options.animated!==!1&&(this.options.duration??500)>0&&!this.scheduler.media.matches&&!this.host.ownerDocument.hidden&&(this.visible||this.options.pauseOffscreen===!1)&&this.target.rollable&&this.host.isConnected}update(e){if(this.destroyed)return;let t={...this.options,...e};this.source.validate(t);let i=this.source.model(t),s=i.text===this.target.text&&i.signature===this.target.signature;if(this.options.motionBlur&&!t.motionBlur&&(this.blur?.destroy(),this.blur=void 0,W0(this.visual)),ll(this.options)!==ll(t)&&(this.reset=!0),this.options=t,this.target=i,!this.canAnimate()){this.finish();return}s&&this.enhanced&&!this.reset||(this.semantic.textContent=i.text,this.prepare())}prepare(){if(!this.canAnimate()){this.finish();return}this.measurementPending=!0,this.scheduler?.enqueue(this)}stage(){if(!this.destroyed)return this.canAnimate()?(this.previousLeft=this.enhanced&&!this.reset?this.measurement.getBoundingClientRect().left:void 0,()=>this.stageMeasurement()):()=>this.finish()}stageMeasurement(){let e=new Set(this.target.tokens.map(i=>i.key));for(let[i,s]of this.measures)e.has(i)||(this.scheduler?.unwatch(s),this.sizes.delete(s),s.remove(),this.measures.delete(i));let t=null;for(let i of this.target.tokens){let s=this.measures.get(i.key);s||(s=this.host.ownerDocument.createElement("span"),s.className="rn-token",this.measures.set(i.key,s),this.scheduler?.watch(s,this)),s.textContent!==i.text&&(s.textContent=i.text);let r=t?t.nextSibling:this.measurement.firstChild;s!==r&&this.measurement.insertBefore(s,r),t=s}this.host.dataset.rnMeasuring=""}measure(){if(this.destroyed)return;if(!this.canAnimate())return()=>this.finish();let e=this.measurement.getBoundingClientRect(),t=this.host.ownerDocument.defaultView;if(!t)return()=>this.finish();let i=t.getComputedStyle(this.measurement);if(i.direction==="rtl")return()=>this.finish();let s=parseFloat(i.width),r=parseFloat(i.height);if(!s||!r||!e.width||!e.height)return()=>this.finish();let a=e.width/s,o=e.height/r,l=parseFloat(i.getPropertyValue("--rn-blur"));this.blurIntensity=Number.isFinite(l)?Math.max(0,l):1,this.sizes.set(this.measurement,{width:s,height:r});let c=new Map;for(let[d,u]of this.measures){let f=u.getBoundingClientRect(),m={width:parseFloat(t.getComputedStyle(u).width),height:parseFloat(t.getComputedStyle(u).height)};this.sizes.set(u,m),c.set(d,{...m,x:(f.left-e.left)/a,y:(f.top-e.top)/o})}let h=this.previousLeft===void 0?0:(this.previousLeft-e.left)/a;return()=>this.commit(c,h)}makeColumn(e){let t=this.host.ownerDocument.createElement("span");t.className="rn-slot",t.dataset.rnKey=e.key,e.index!==void 0&&(t.dataset.rnWheel=""),this.options.mode==="flap"&&(t.dataset.rnFlap="");let i=this.host.ownerDocument.createElement("span");return i.className="rn-reel",t.append(i),this.visual.append(t),{token:e,element:t,reel:i,x:new Vs(t,"transform"),opacity:new Vs(t,"opacity"),roll:new Vs(i,"transform"),exiting:!1,height:0,width:0}}face(e,t){let i=this.host.ownerDocument.createElement("span");i.className="rn-face",i.textContent=t,i.style.height=`${e.height}px`;let s=e.reel.children.length;i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.transform=`translateY(${s*e.height}px)`,e.reel.style.height=`${(s+1)*e.height}px`,e.reel.append(i)}rest(e){this.blur?.remove(e.reel),e.reel.replaceChildren(),e.reel.style.removeProperty("height"),this.face(e,e.token.text),this.wrapInk(e),e.token.index===void 0?e.roll.set(1,al):e.roll.set(e.token.index,()=>"translateY(0px)")}wrapInk(e){if(this.options.mode==="flap")return;let t=this.host.ownerDocument.createElement("span");t.className="rn-ink",t.append(...e.reel.childNodes),e.reel.append(t)}finishEntry(e){e.entry&&(e.entry.blurred&&this.blur?.remove(e.reel),e.entry.track.cancel(),e.entry.element.replaceWith(e.reel),e.entry=void 0)}enter(e,t,i,s){let r=this.host.ownerDocument.createElement("span");r.className="rn-enter",e.reel.replaceWith(r),r.append(e.reel);let a=new Vs(r,"transform");e.entry={element:r,track:a,blurred:!1};let o=xa(O0(e.height*(s?.entryDistance??1),s?.entryDuration??t,s?.entryHold),i);if(this.options.motionBlur&&e.token.text.trim()){this.blur??=new sl(this.host),this.blur.intensity=this.blurIntensity;let l={...o,points:o.points.map(c=>c/e.height)};e.entry.blurred=this.blur.apply(e.reel,l,e.height,0,"entry")}a.play(o,l=>`translateY(${l}px)`,()=>this.finishEntry(e))}commit(e,t){if(this.destroyed)return;this.measurementPending=!1;let i=this.enhanced&&!this.reset,s=i?this.options.duration??500:0,r=q0.get(this.host),a=s?r?.widthDuration??s:0,o=this.options.mode==="flap",l=this.options.direction==="up"?1:this.options.direction==="down"?-1:this.source.direction(this.displayed,this.target);this.target.text!==this.displayed.text&&(this.host.dataset.rnTrend=l>0?"up":l<0?"down":"none");let c=new Map([...this.columns].map(([y,S])=>{let E=S.x.read();return[y,{...E,x:E.position,width:S.width}]})),h=Au(this.target.tokens.map(y=>y.key),c),d=[...c.keys()].sort((y,S)=>c.get(y).x-c.get(S).x),u=Au(d,e),f=new Map(this.displayed.tokens.filter(y=>y.index===void 0).map(y=>[y.identity,y.key])),m=new Map(this.target.tokens.filter(y=>y.index===void 0).map(y=>[y.identity,y.key])),v=this.options.stagger==="start"||this.options.stagger==="end",p=this.target.tokens.map(y=>{let S=this.columns.get(y.key);return!S||S.exiting||v&&y.index!==void 0&&S.token.text!==y.text}),g=H0(this.target.tokens.map((y,S)=>y.index!==void 0&&!p[S]),this.options.stagger),_=Math.max(0,...this.target.tokens.map((y,S)=>p[S]?g[S]-1:0)),b=Math.min(s*.045,s*.3/Math.max(1,_));for(let[y,S]of this.target.tokens.entries()){let E=e.get(S.key);if(!E)continue;let R=Math.max(0,g[y]-1)*b,x=f.get(S.identity),w=x!==void 0&&x!==S.key?c.get(x):void 0,L=this.columns.get(S.key),C=!L;if(!L){L=this.makeColumn(S),this.columns.set(S.key,L);let k=(w?.x??h.get(S.key)??E.x)+t;L.x.set(i?k+(E.x-k)*(w?0:r?.entryOrigin??0):E.x,rl),L.opacity.set(i?0:1,ol)}let F=L.token.text!==S.text,H=Math.abs(L.height-E.height)>.1,X=L.exiting;L.exiting=!1,L.element.style.width=`${E.width}px`,L.element.style.height=`${E.height}px`,L.element.style.top=`${E.y}px`;let V=c.get(S.key);if(L.x.play(gn(V?V.position+t:L.x.read().position,E.x,V?.velocity??0,a),rl),C||X||!i){let k=L.opacity.read(),O=gn(k.position,1,k.velocity,S.index===void 0?Math.min(s,180):s?r?.fadeDuration??s:0),ie=!o&&S.identity.startsWith("group:")&&!w?(r?.entryDuration??s)*(r?.entryHold??.14):0;L.opacity.play(C?xa(O,R+ie):O,ol)}if(L.height=E.height,L.width=E.width,(!i||H)&&this.finishEntry(L),C&&o&&S.wheel&&s&&L.roll.set(Math.max(0,S.wheel.indexOf(" ")),()=>"translateY(0px)"),o&&!H&&(F||C)&&S.index!==void 0&&S.wheel&&s&&L.roll.read().position!==S.index){let k=L.roll.read(),O=Math.round(k.position),ie=vu(O,S.index,l,S.wheel.length),Z=this.options.flipDuration??V0(s);this.blur?.remove(L.reel);let ce;this.options.motionBlur&&this.blurIntensity>0&&(this.blur??=new sl(this.host),this.blur.intensity=this.blurIntensity,ce=this.blur.filterUrl(E.height)),X0(L.reel,S.wheel,O,ie,E.height,Z,R,ce),L.token=S;let de=L;L.roll.play(xa(z0(O,ie,Z),R),()=>"translateY(0px)",()=>this.rest(de))}else if(!C&&!H&&F&&S.index!==void 0&&S.wheel&&L.token.index!==void 0&&s){let k=L.roll.read(),O=ll(this.options)?B0(L.token.wheel,k.position,S.text):void 0,ie=O?.from??k.position,Z=O?.target??vu(k.position,S.index,l,S.wheel.length),ce=O?.wheel??S.wheel,de=O?Math.min(Math.max(0,k.velocity),(Z-ie)*1e4/s):k.velocity,ue=v?xa(gn(ie,Z,de,s),R):gn(ie,Z,de,s),Ne=Math.floor(Math.min(...ue.points)),tt=Math.ceil(Math.max(...ue.points));L.entry&&(L.entry.blurred=!1);let Je=this.blur?.remove(L.reel)??0;L.reel.replaceChildren();for(let ne=Ne;ne<=tt;ne++)this.face(L,xo(ce,ne));this.wrapInk(L),this.options.motionBlur&&(this.blur??=new sl(this.host),this.blur.intensity=this.blurIntensity,this.blur.apply(L.reel,ue,E.height,Je)),L.token=O?{...S,wheel:ce,index:Z}:S;let Q=L;L.roll.play(ue,ne=>`translateY(${(Ne-ne)*E.height}px)`,()=>this.rest(Q))}else(C||H||F||!i)&&(L.token=S,this.rest(L));if(C&&s&&S.index!==void 0&&!o&&this.enter(L,s,R,r),w&&s&&(C||X)){let k=L.roll.read(),O=L;L.roll.play(gn(C?.96:k.position,1,k.velocity,Math.min(s,180)),al,()=>this.rest(O))}}for(let[y,S]of this.columns){if(e.has(y))continue;let E=c.get(y),R=m.get(S.token.identity),x=R?e.get(R):void 0;if(S.x.play(gn(E.position+t,x?.x??u.get(y)??E.position,E.velocity,a),rl),S.exiting)continue;if(S.exiting=!0,x&&s){let L=S.roll.read();S.roll.play(gn(L.position,1.04,L.velocity,Math.min(s,180)),al)}let w=S.opacity.read();S.opacity.play(gn(w.position,0,w.velocity,S.token.index===void 0?Math.min(s,180):s*.65),ol,()=>{S.exiting&&(this.removeColumn(S),this.columns.delete(y))})}this.enhanced=!0,this.reset=!1,this.displayed=this.target,this.host.dataset.rnReady=""}removeColumn(e){this.blur?.remove(e.reel),this.finishEntry(e),e.x.cancel(),e.roll.cancel(),e.opacity.cancel(),e.element.remove()}refresh(){this.destroyed||(this.reset=!0,this.prepare())}sizeChanged(e,t,i){if(this.measurementPending||!this.host.hasAttribute("data-rn-measuring"))return!1;let s=this.sizes.get(e);return!s||Math.abs(s.width-t)>.2||Math.abs(s.height-i)>.2}visibility(e){this.visible!==e&&(this.visible=e,(e||this.options.pauseOffscreen!==!1)&&this.refresh())}finish(){if(!this.destroyed){this.measurementPending=!1;for(let e of this.columns.values())this.removeColumn(e);this.columns.clear(),this.blur?.destroy(),this.blur=void 0,this.semantic.textContent=this.target.text,delete this.host.dataset.rnReady,delete this.host.dataset.rnMeasuring,delete this.host.dataset.rnTrend,this.enhanced=!1,this.reset=!0,this.displayed=this.target}}destroy(){if(!this.destroyed){this.finish(),this.destroyed=!0;for(let e of this.measures.values())this.scheduler?.unwatch(e);this.scheduler?.unwatch(this.measurement),this.scheduler?.remove(this,this.host),this.host.replaceChildren(this.host.ownerDocument.createTextNode(this.target.text)),!this.hadClass&&this.host.classList.remove("rn-root"),Yr.delete(this.host)}}}function la(n,e){if(Yr.has(n))throw Error("A rolling number is already mounted on this element");let t=new Bf(n,e,Y0);return Yr.add(n),t}function ca(n,e){if(Yr.has(n))throw Error("A rolling number is already mounted on this element");let t=new Bf(n,e,j0);return Yr.add(n),t}function Z0(n){n.replaceChildren(),n.setAttribute("role","timer");const e=[0,1,2].map(i=>{i&&n.append(":");const s=document.createElement("span");return s.setAttribute("aria-hidden","true"),n.append(s),la(s,{value:0,duration:460,motionBlur:!0,locales:"en-GB",format:{minimumIntegerDigits:2,useGrouping:!1},animated:!1})});let t=!1;return(i,s)=>{const r=[i.getHours(),i.getMinutes(),i.getSeconds()];n.setAttribute("aria-label",r.map(a=>String(a).padStart(2,"0")).join(":")),e.forEach((a,o)=>{a.update({value:r[o],animated:s&&t,direction:"up"}),s||a.finish()}),t=!0}}const _a=34.12,Br=39.56,ya=1.5,Q0=n=>Math.max(0,Math.min(1,n)),Gn=n=>{const e=Q0(n);return e*e*e*(10+e*(-15+e*6))};function cl(n,e){if(e<=n[0][0])return n[0][1];if(e>=n[n.length-1][0])return n[n.length-1][1];const t=c=>(n[c+1][1]-n[c][1])/(n[c+1][0]-n[c][0]),i=c=>{if(c===0||c===n.length-1)return 0;const h=t(c-1),d=t(c);if(h*d<=0)return 0;const u=n[c][0]-n[c-1][0],f=n[c+1][0]-n[c][0],m=2*f+u,v=f+2*u;return(m+v)/(m/h+v/d)};let s=0;for(;e>n[s+1][0];)s++;const r=n[s+1][0]-n[s][0],a=(e-n[s][0])/r,o=a*a,l=o*a;return(2*l-3*o+1)*n[s][1]+(l-2*o+a)*r*i(s)+(-2*l+3*o)*n[s+1][1]+(l-o)*r*i(s+1)}const K0=[[34.24,0],[34.4,.19],[34.64,.57],[34.96,.79],[35.28,.92],[35.6,.973],[36.04,1]],J0=[[38.84,0],[38.92,.28],[39,.51],[39.16,.74],[39.32,.94],[39.56,1]],$0=[[37.72,1],[37.88,.72],[38,.38],[38.12,.22],[38.24,.14],[38.4,.075],[38.64,.024],[38.84,0]],zs=[-1.6,.5],_o=[1.98,3.24],em=[[-1.88,3.2],[2.14,3.36],[-1.77,.36],[2.17,.65]];function As(n){const e=cl(K0,n),t=cl($0,n),i=[];n>=34.24&&n<36.04&&e>0?i.push([0,e*.5],[1-e*.5,1]):n>=36.04&&n<38.84&&i.push([.5-t*.5,.5+t*.5]);const s=Gn((n-34.2)/.12)*(1-Gn((n-37.76)/.56));return{time:n,intervals:i,markers:s,point:Gn((n-38.58)/.2)*(1-Gn((n-39.08)/.22)),label:Gn((n-34.32)/.36)*(1-Gn((n-37.68)/.24)),labelValue:Gn((n-35.64)/.56),clarity:cl(J0,n),phase:n<34.24?"waiting":n<36.04?"joining":n<37.72?"connected":n<38.84?"retracting":n<Br?"revealing":"clear"}}class tm{clarity=0;active=!1;elapsed=null;frame=As(-1);enter(e=!1){this.active||(this.active=!0,this.elapsed=e?(Br-_a)/ya:null,e&&this.finish())}leave(){this.active=!1,this.elapsed=null,this.frame=As(-1)}select(e=0){this.leave(),this.clarity=e}finish(){this.elapsed=(Br-_a)/ya,this.clarity=1,this.frame=As(Br)}update(e,t,i,s){if(s!==void 0){this.frame=As(s),this.clarity=this.frame.clarity;return}if(!this.active){this.clarity=i?0:this.clarity*Math.exp(-Math.max(0,e)*9),this.clarity<1e-4&&(this.clarity=0),this.frame=As(-1);return}if(i){this.finish();return}this.elapsed===null&&t?this.elapsed=0:this.elapsed!==null&&(this.elapsed=Math.min(this.elapsed+Math.max(0,e),(Br-_a)/ya)),this.elapsed!==null&&(this.frame=As(_a+this.elapsed*ya),this.clarity=this.frame.clarity>this.clarity?this.frame.clarity:this.frame.phase==="clear"?1:this.clarity*Math.exp(-Math.max(0,e)*9))}}function im(n){const e=t=>[zs[0]+(_o[0]-zs[0])*t,zs[1]+(_o[1]-zs[1])*t];return n.intervals.map(([t,i])=>[e(t),e(i)])}class nm{root=document.querySelector("#inspection-marks");line=this.root.querySelector("#inspection-lines");corners=this.root.querySelector("#inspection-corners");point=this.root.querySelector("#inspection-point");label=document.querySelector("#inspection-text");render(e,t,i,s=!0){const r=document.querySelector("#three-scene");this.root.setAttribute("viewBox",`0 0 ${r.clientWidth} ${r.clientHeight}`),this.root.style.opacity=s&&(e.intervals.length||e.markers>0||e.point>0)?"1":"0",this.root.dataset.phase=e.phase,this.root.dataset.referenceTime=e.time.toFixed(3),this.line.setAttribute("d",im(e).map(([l,c])=>`M${t(...l)}L${t(...c)}`).join("")),this.corners.style.opacity=String(e.markers),this.corners.innerHTML=e.markers>0?em.map(([l,c])=>{const[h,d]=t(l,c);return`<rect x="${h-4}" y="${d-4}" width="8" height="8"/>`}).join(""):"";const[a,o]=t((zs[0]+_o[0])/2,(zs[1]+_o[1])/2);this.point.setAttribute("cx",String(a)),this.point.setAttribute("cy",String(o)),this.point.style.opacity=String(e.point),this.label.style.opacity=String(s&&i?e.label:0),this.label.querySelector("strong").style.opacity=String(e.labelValue)}}class sm{root=null;covers=[];started=null;progress=0;reset(e,t){this.remove(),this.root=e,this.started=null,this.progress=t?1:0,this.refresh()}refresh(){if(this.remove(),!this.root||this.progress===1)return;const e=this.root.querySelectorAll("h2, .detail-title-cn, .metadata dd, .tab-panel p, .research-notes li, .log-row");this.root.querySelectorAll(".album-photo-frame").forEach(t=>{t.classList.add("document-redacted");const i=7;for(let s=0;s<i;s++){const r=document.createElement("span");r.className="document-redaction-window",r.setAttribute("aria-hidden","true"),r.style.cssText=`left:0;top:${s/i*100}%;width:100%;height:calc(${100/i}% + 1px)`;const a=document.createElement("span");a.className="document-redaction-ink",r.append(a),t.append(r),this.covers.push({window:r,ink:a,order:this.covers.length})}}),e.forEach(t=>{t.classList.add("document-redacted");const i=t.getBoundingClientRect(),s=i.width/t.offsetWidth;if(!s||!Number.isFinite(s))return;const r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT),a=[];let o;for(;o=r.nextNode();){if(!o.textContent?.trim())continue;const l=document.createRange();l.selectNodeContents(o);for(const c of l.getClientRects()){if(!c.width||!c.height)continue;const h=(c.left-i.left)/s,d=(c.top-i.top)/s,u=(c.right-i.left)/s,f=(c.bottom-i.top)/s,m=a.find(v=>Math.abs(v.y-d)<6);m?(m.x=Math.min(m.x,h),m.y=Math.min(m.y,d),m.right=Math.max(m.right,u),m.bottom=Math.max(m.bottom,f)):a.push({x:h,y:d,right:u,bottom:f})}}for(const l of a){const c=document.createElement("span");c.className="document-redaction-window",c.setAttribute("aria-hidden","true");const h=Math.max(0,l.x-1),d=Math.min(t.clientWidth,l.right+1);c.style.cssText=`left:${h}px;top:${l.y-1}px;width:${d-h}px;height:${l.bottom-l.y+2}px`;const u=document.createElement("span");u.className="document-redaction-ink",c.append(u),t.append(c),this.covers.push({window:c,ink:u,order:this.covers.length})}}),this.paint()}update(e,t,i){!this.root||this.progress===1||(i?this.progress=1:(this.started===null&&t.clarity>0&&(this.started=e),this.started!==null&&(this.progress=Math.min(1,Math.max(0,(e-this.started)/.95)))),this.progress===1?this.remove():this.started!==null&&this.paint())}paint(){const e=Math.max(1,this.covers.length-1);for(const t of this.covers){const i=t.order/e*.22,s=Math.min(1,Math.max(0,(this.progress-i)/.78)),r=s<.2?.4*(s/.2)**2:1-.6*((1-s)/.8)**(16/3);t.ink.style.transform=`translateX(${r*101}%)`}}remove(){for(const e of this.covers)e.window.remove();this.covers=[]}}function Rt(n){return n.replace(/[&<>"']/g,e=>{switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";default:return"&#39;"}})}const jr={performance:{scale:80,pixelRatio:1,antialias:"off",shadows:1024,aoSamples:0,aoResolution:.5,depthOfField:0,transmission:.5,anisotropy:4},original:{scale:100,pixelRatio:1.5,antialias:"off",shadows:2048,aoSamples:32,aoResolution:1,depthOfField:100,transmission:1,anisotropy:16},high:{scale:125,pixelRatio:2,antialias:"smaa",shadows:4096,aoSamples:32,aoResolution:1,depthOfField:100,transmission:1,anisotropy:16},ultra:{scale:150,pixelRatio:2,antialias:"smaa",shadows:4096,aoSamples:64,aoResolution:1,depthOfField:100,transmission:1,anisotropy:16}},yu={performance:"性能",original:"原始",high:"高",ultra:"极高"},Wn=(n,e,t)=>e.includes(n)?n:t,Mu=(n,e,t,i,s)=>typeof n=="number"&&Number.isFinite(n)?Math.min(t,Math.max(e,Math.round(n/i)*i)):s;function ss(n,e=!0){const t=jr.original,i=n&&typeof n=="object"?n:{},s=e?t:{...t,pixelRatio:1,aoSamples:0,depthOfField:0};return{scale:Mu(i.scale,50,200,5,s.scale),pixelRatio:Wn(i.pixelRatio,[1,1.5,2,3],s.pixelRatio),antialias:Wn(i.antialias,["off","smaa"],s.antialias),shadows:Wn(i.shadows,[0,1024,2048,4096],s.shadows),aoSamples:Wn(i.aoSamples,[0,16,32,64],s.aoSamples),aoResolution:Wn(i.aoResolution,[.5,.75,1],s.aoResolution),depthOfField:Mu(i.depthOfField,0,150,5,s.depthOfField),transmission:Wn(i.transmission,[.25,.5,.75,1],s.transmission),anisotropy:Wn(i.anisotropy,[1,2,4,8,16],s.anisotropy)}}function Hf(n){return Object.keys(jr).find(e=>Object.entries(jr[e]).every(([t,i])=>n[t]===i))??"custom"}function rm(n,e,t,i,s,r,a=8294400){const o=Math.min(s,n.pixelRatio)*i*n.scale/100,l=Math.min(o,Math.sqrt(a/Math.max(1,e*t)),r/Math.max(1,e,t));return{ratio:l,width:Math.max(1,Math.floor(e*l)),height:Math.max(1,Math.floor(t*l)),limited:l<o-1e-4}}const hl=!1,bu=()=>window.rhineWallpaperHost;function am(n){return!0}function kf(n,e,t,i){return`<select ${n} aria-label="${e}">${i.map(([s,r])=>`<option value="${s}" ${s===t?"selected":""}>${r}</option>`).join("")}${t==="custom"?'<option value="custom" disabled selected>自定义</option>':""}</select>`}function Xn(n,e,t,i,s){return`<label class="quality-control"><span>${t}<small>${i}</small></span>${kf(`data-quality="${e}"`,t,n[e],s)}</label>`}function Su(n,e,t,i,s,r){return`<label class="quality-control quality-range"><span>${t}<small>${i}</small></span><div><input type="range" data-quality="${e}" aria-label="${t}" min="${s}" max="${r}" step="5" value="${n[e]}"/><output data-quality-output="${e}">${n[e]}%</output></div></label>`}function om(n){const e=Hf(n);return`<section class="quality-settings" aria-label="画质设置">
    <div class="quality-heading"><h3>RENDER QUALITY <span>渲染画质</span></h3>${kf('id="quality-preset"',"画质预设",e,Object.keys(yu).map(t=>[t,yu[t]]))}</div>
    <p class="quality-summary" id="quality-summary" aria-live="polite"></p>
    <details class="quality-advanced"><summary>精细设置 <span>清晰度 / 材质 / 阴影</span></summary><div class="quality-grid">
    ${Su(n,"scale","渲染比例","相对屏幕像素，受密度上限限制；高比例改善细线",50,200)}
    ${Xn(n,"pixelRatio","像素密度上限","控制高密度屏幕的原生像素倍率",[1,1.5,2,3].map(t=>[t,`${t}×`]))}
    ${Xn(n,"antialias","抗锯齿","SMAA 平滑模型边缘与后处理结果",[["off","原始"],["smaa","SMAA"]])}
    ${Xn(n,"anisotropy","纹理过滤","改善倾斜视角下的标签细节",[1,2,4,8,16].map(t=>[t,`${t}×`]))}
    ${Xn(n,"transmission","透明材质分辨率","控制盖板折射画面的清晰度",[.25,.5,.75,1].map(t=>[t,`${t*100}%`]))}
    ${Xn(n,"shadows","阴影分辨率 · 阵列","更高分辨率保留更细的投影边缘",[[0,"关闭"],[1024,"1024"],[2048,"2048"],[4096,"4096"]])}
    ${Xn(n,"aoSamples","环境遮蔽 · 阵列","采样越多，接缝暗部越细腻",[[0,"关闭"],[16,"16 采样"],[32,"32 采样"],[64,"64 采样"]])}
    ${Xn(n,"aoResolution","遮蔽分辨率 · 阵列","降低可减轻环境遮蔽的渲染负担",[.5,.75,1].map(t=>[t,`${t*100}%`]))}
    ${Su(n,"depthOfField","景深强度 · 阵列","0% 关闭；100% 保留原始镜头虚化",0,150)}
    </div></details><p class="quality-note">即时生效并自动保存。清晰度与材质设置同步至 360° 查看器。高渲染比例更适合静态观察；缓冲上限为 829 万像素，硬件限制时自动收敛。</p>
  </section>`}function lm(n){const e=document.querySelector("#quality-preset");if(!e)return;const t=Hf(n);if(e instanceof HTMLSelectElement){let i=e.querySelector('option[value="custom"]');t==="custom"&&!i?(i=new Option("自定义","custom"),i.disabled=!0,e.add(i)):t!=="custom"&&i?.remove()}e.value=t,document.querySelectorAll("[data-quality]").forEach(i=>{const s=i.dataset.quality;i.value=String(n[s]),i.disabled=s==="aoResolution"&&n.aoSamples===0}),document.querySelectorAll("[data-quality-choices]").forEach(i=>{const s=JSON.parse(i.dataset.qualityChoices);i.querySelector("[data-quality-label]").textContent=s.find(([r])=>String(r)===i.value)?.[1]??"自定义"}),document.querySelectorAll("[data-quality-output]").forEach(i=>{i.value=`${n[i.dataset.qualityOutput]}%`})}const cm={scale:60,pixelRatio:1,antialias:"off",shadows:0,aoSamples:0,aoResolution:.5,depthOfField:0,transmission:.25,anisotropy:2};function hm(n,e){n=Math.max(1,n),e=Math.max(1,e);const t=Math.min(e/1080,n/1280);return{width:n/t,height:e/t,scale:t,kind:"opening"}}function um(n,e,t,i=!1){if(n=Math.max(1,n),e=Math.max(1,e),i)return{width:1920,height:1080,scale:Math.min(n/1920,e/1080),kind:"cinematic"};const s=n/e<1.05,r=s||n<1100||t&&e<600,a=r?1:e/1080;return{width:n/a,height:e/a,scale:a,kind:s?"portrait":r?"compact":"desktop"}}function dm(n,e,t,i,s){const r=n/e,a=r<1.05,o=t+(5.9-t)*i,l=Math.max(6.3/r,3.7*e/Math.max(100,.54*e-156));return{span:a?Math.max(o,8.4/r+(l-8.4/r)*i):Math.max(o,o*(16/9)/r),portrait:a,previewY:a?.36:.5,detailX:a?.5:s?.27:550/1920,detailY:a?.27+34/e:s?.49:560/1080}}var fm={"assets/archive-cassette.glb":"assets/archive-cassette.dda42b9b3b471d11.glb","assets/archive-assembly.glb":"assets/archive-assembly.d411170676f55a32.glb"};const rs=n=>{const e=n.replace(/^\//,"");return`/rhine-album/${fm[e]??e}`};let as,Ri,wh=!1,Cn=!1,Vf=!1,oc=!1,lc=()=>{};const wu=()=>matchMedia("(display-mode: standalone)").matches||!!navigator.standalone,pm=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),as=n,yi()});window.addEventListener("appinstalled",()=>{as=void 0,yi()});matchMedia("(display-mode: standalone)").addEventListener("change",yi);function zf(){const n=window.isSecureContext?"serviceWorker"in navigator?Cn?"离线副本未能保存，可联网后重试。":wh?"离线资源已就绪，可离线浏览档案与模型。":"正在准备离线资源，首次需要保持联网。":"当前浏览器支持在线使用。":"使用 HTTPS 地址后可保存离线副本。";return`<section id="pwa-settings" class="pwa-settings" aria-label="主屏幕与离线使用"><h3>APP / 主屏幕与离线</h3><p>${wu()?"已从主屏幕打开。":pm()?"在 Safari 中轻点“分享”→“添加到主屏幕”，然后从主屏幕图标打开。":as?"安装后可在独立窗口中打开档案。":"可通过浏览器菜单安装或添加到主屏幕。"}</p><p class="pwa-status" role="status">${n}</p><div class="pwa-actions">${as&&!wu()?'<button data-pwa-action="install">安装到设备 ↗</button>':""}${Ri?.waiting?'<span>新版本已准备好</span><button data-pwa-action="update">更新并重启 ↻</button>':""}${Cn?'<button data-pwa-action="retry">重试保存离线资源 ↻</button>':""}</div></section>`}function yi(){const n=document.querySelector("#pwa-settings");n&&(n.outerHTML=zf()),document.documentElement.dataset.offlineReady=String(wh);const e=document.querySelector("#pwa-update-notice"),t=!!Ri?.waiting;e&&(e.hidden=!t);const i=document.querySelector("#stage");i&&(i.dataset.pwaUpdate=String(t))}async function Gf(n){if(lc=n,!(oc||!window.isSecureContext||!("serviceWorker"in navigator))){oc=!0;try{Ri=await navigator.serviceWorker.register(rs("sw.js"),{scope:"/rhine-album/",updateViaCache:"none"});const e=()=>{const i=Ri?.installing;i&&i.addEventListener("statechange",()=>{i.state==="installed"?(Cn=!1,yi()):i.state==="redundant"&&!Ri?.active&&(Cn=!0,yi())})};Ri.addEventListener("updatefound",e),e(),yi(),navigator.serviceWorker.ready.then(()=>{wh=!0,Cn=!1,yi()});let t=Date.now();document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-t>36e5&&(t=Date.now(),Ri?.update().catch(()=>{}))})}catch{Cn=!0}yi()}}"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("controllerchange",()=>{Vf?location.reload():yi()});document.addEventListener("click",async n=>{const e=n.target.closest("[data-pwa-action]");if(e){if(e.dataset.pwaAction==="install"&&as){const t=as;as=void 0;try{await t.prompt(),await t.userChoice}catch{lc("请通过浏览器菜单添加到主屏幕")}yi()}if(e.dataset.pwaAction==="update"&&Ri?.waiting&&(Vf=!0,e.disabled=!0,Ri.waiting.postMessage({type:"RHINE_APPLY_UPDATE"})),e.dataset.pwaAction==="retry")if(Cn=!1,yi(),Ri)try{await Ri.update()}catch{Cn=!0,yi()}else oc=!1,Gf(lc)}});const Eh="183",qs={ROTATE:0,DOLLY:1,PAN:2},Rn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},mm=0,Eu=1,gm=2,oo=1,Wf=2,Hr=3,Zi=0,Jt=1,zi=2,Gt=0,Ys=1,Tu=2,Cu=3,Ru=4,Th=5,Gi=100,vm=101,Am=102,xm=103,_m=104,cc=200,Xf=201,ym=202,Mm=203,yo=204,Zr=205,qf=206,bm=207,Yf=208,Sm=209,wm=210,Em=211,Tm=212,Cm=213,Rm=214,hc=0,uc=1,dc=2,er=3,fc=4,pc=5,mc=6,gc=7,Ch=0,Pm=1,Dm=2,ji=0,Rh=1,Ph=2,Dh=3,ha=4,Lh=5,Ih=6,Nh=7,Pu="attached",Lm="detached",jf=300,us=301,tr=302,ul=303,dl=304,Vo=306,Un=1e3,Wi=1001,Mo=1002,bt=1003,Zf=1004,kr=1005,Nt=1006,lo=1007,cn=1008,hi=1009,Qf=1010,Kf=1011,Qr=1012,Uh=1013,Qi=1014,ui=1015,ei=1016,Oh=1017,Fh=1018,ir=1020,Jf=35902,$f=35899,ep=1021,tp=1022,Mi=1023,fn=1026,Pn=1027,zo=1028,Bh=1029,nr=1030,Hh=1031,kh=1033,co=33776,ho=33777,uo=33778,fo=33779,vc=35840,Ac=35841,xc=35842,_c=35843,yc=36196,Mc=37492,bc=37496,Sc=37488,wc=37489,Ec=37490,Tc=37491,Cc=37808,Rc=37809,Pc=37810,Dc=37811,Lc=37812,Ic=37813,Nc=37814,Uc=37815,Oc=37816,Fc=37817,Bc=37818,Hc=37819,kc=37820,Vc=37821,zc=36492,Gc=36494,Wc=36495,Xc=36283,qc=36284,Yc=36285,jc=36286,Kr=2300,Jr=2301,fl=2302,Du=2303,Lu=2400,Iu=2401,Nu=2402,Im=2500,Nm=0,ip=1,Zc=2,Um=3200,Om=3201,Go=0,Fm=1,En="",Pt="srgb",ti="srgb-linear",bo="linear",lt="srgb",xs=7680,Uu=519,Bm=512,Hm=513,km=514,Vh=515,Vm=516,zm=517,zh=518,Gm=519,Qc=35044,Gs=35048,Ou="300 es",Xi=2e3,$r=2001;function Wm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Xm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ea(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qm(){const n=ea("canvas");return n.style.display="block",n}const Fu={};function So(...n){const e="THREE."+n.shift();console.log(e,...n)}function np(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Re(...n){n=np(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ue(...n){n=np(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function wo(...n){const e=n.join(" ");e in Fu||(Fu[e]=!0,Re(...n))}function Ym(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const jm={[hc]:uc,[dc]:mc,[fc]:gc,[er]:pc,[uc]:hc,[mc]:dc,[gc]:fc,[pc]:er};class ps{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bu=1234567;const zr=Math.PI/180,sr=180/Math.PI;function Ii(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function Gh(n,e){return(n%e+e)%e}function Zm(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Qm(n,e,t){return n!==e?(t-n)/(e-n):0}function Gr(n,e,t){return(1-t)*n+t*e}function Km(n,e,t,i){return Gr(n,e,1-Math.exp(-t*i))}function Jm(n,e=1){return e-Math.abs(Gh(n,e*2)-e)}function $m(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function eg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function tg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ig(n,e){return n+Math.random()*(e-n)}function ng(n){return n*(.5-Math.random())}function sg(n){n!==void 0&&(Bu=n);let e=Bu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rg(n){return n*zr}function ag(n){return n*sr}function og(n){return(n&n-1)===0&&n!==0}function lg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function cg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function hg(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),d=r((e-i)/2),u=a((e-i)/2),f=r((i-e)/2),m=a((i-e)/2);switch(s){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*m,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*m,o*c);break;case"ZYZ":n.set(l*m,l*f,o*h,o*c);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Pi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ht(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ie={DEG2RAD:zr,RAD2DEG:sr,generateUUID:Ii,clamp:Ze,euclideanModulo:Gh,mapLinear:Zm,inverseLerp:Qm,lerp:Gr,damp:Km,pingpong:Jm,smoothstep:$m,smootherstep:eg,randInt:tg,randFloat:ig,randFloatSpread:ng,seededRandom:sg,degToRad:rg,radToDeg:ag,isPowerOfTwo:og,ceilPowerOfTwo:lg,floorPowerOfTwo:cg,setQuaternionFromProperEuler:hg,normalize:ht,denormalize:Pi};class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ni{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(d!==v||l!==u||c!==f||h!==m){let p=l*u+c*f+h*m+d*v;p<0&&(u=-u,f=-f,m=-m,v=-v,p=-p);let g=1-o;if(p<.9995){const _=Math.acos(p),b=Math.sin(_);g=Math.sin(g*_)/b,o=Math.sin(o*_)/b,l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+v*o}else{l=l*g+u*o,c=c*g+f*o,h=h*g+m*o,d=d*g+v*o;const _=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=_,c*=_,h*=_,d*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*d+l*f-c*u,e[t+1]=l*m+h*u+c*d-o*f,e[t+2]=c*m+h*f+o*u-l*d,e[t+3]=h*m-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),d=o(r/2),u=l(i/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pl.copy(this).projectOnVector(e),this.sub(pl)}reflect(e){return this.sub(pl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pl=new P,Hu=new Ni;class Xe{constructor(e,t,i,s,r,a,o,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],m=i[8],v=s[0],p=s[3],g=s[6],_=s[1],b=s[4],y=s[7],S=s[2],E=s[5],R=s[8];return r[0]=a*v+o*_+l*S,r[3]=a*p+o*b+l*E,r[6]=a*g+o*y+l*R,r[1]=c*v+h*_+d*S,r[4]=c*p+h*b+d*E,r[7]=c*g+h*y+d*R,r[2]=u*v+f*_+m*S,r[5]=u*p+f*b+m*E,r[8]=u*g+f*y+m*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=t*d+i*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=d*v,e[1]=(s*c-h*i)*v,e[2]=(o*i-s*a)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ml.makeScale(e,t)),this}rotate(e){return this.premultiply(ml.makeRotation(-e)),this}translate(e,t){return this.premultiply(ml.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ml=new Xe,ku=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vu=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ug(){const n={enabled:!0,workingColorSpace:ti,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===lt&&(s.r=un(s.r),s.g=un(s.g),s.b=un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(s.r=js(s.r),s.g=js(s.g),s.b=js(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===En?bo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ti]:{primaries:e,whitePoint:i,transfer:bo,toXYZ:ku,fromXYZ:Vu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Pt},outputColorSpaceConfig:{drawingBufferColorSpace:Pt}},[Pt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:ku,fromXYZ:Vu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Pt}}}),n}const et=ug();function un(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let _s;class dg{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{_s===void 0&&(_s=ea("canvas")),_s.width=e.width,_s.height=e.height;const s=_s.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=_s}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ea("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=un(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(un(t[i]/255)*255):t[i]=un(t[i]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fg=0;class Wh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(gl(s[a].image)):r.push(gl(s[a]))}else r=gl(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function gl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?dg.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let pg=0;const vl=new P;class wt extends ps{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,i=Wi,s=Wi,r=Nt,a=cn,o=Mi,l=hi,c=wt.DEFAULT_ANISOTROPY,h=En){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=Ii(),this.name="",this.source=new Wh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vl).x}get height(){return this.source.getSize(vl).y}get depth(){return this.source.getSize(vl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Un:e.x=e.x-Math.floor(e.x);break;case Wi:e.x=e.x<0?0:1;break;case Mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Un:e.y=e.y-Math.floor(e.y);break;case Wi:e.y=e.y<0?0:1;break;case Mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=jf;wt.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,i=0,s=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],v=l[2],p=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,y=(f+1)/2,S=(g+1)/2,E=(h+u)/4,R=(d+v)/4,x=(m+p)/4;return b>y&&b>S?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=E/i,r=R/i):y>S?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=E/s,r=x/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=R/r,s=x/r),this.set(i,s,r,t),this}let _=Math.sqrt((p-m)*(p-m)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(p-m)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mg extends ps{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new wt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Wh(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jt extends mg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class sp extends wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gg extends wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ke{constructor(e,t,i,s,r,a,o,l,c,h,d,u,f,m,v,p){ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,d,u,f,m,v,p)}set(e,t,i,s,r,a,o,l,c,h,d,u,f,m,v,p){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=f,g[7]=m,g[11]=v,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ke().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ys.setFromMatrixColumn(e,0).length(),r=1/ys.setFromMatrixColumn(e,1).length(),a=1/ys.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,m=c*h,v=c*d;t[0]=u+v*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,m=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,m=o*h,v=o*d;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=m*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+m,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(vg,e,Ag)}lookAt(e,t,i){const s=this.elements;return oi.subVectors(e,t),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),vn.crossVectors(i,oi),vn.lengthSq()===0&&(Math.abs(i.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),vn.crossVectors(i,oi)),vn.normalize(),Ma.crossVectors(oi,vn),s[0]=vn.x,s[4]=Ma.x,s[8]=oi.x,s[1]=vn.y,s[5]=Ma.y,s[9]=oi.y,s[2]=vn.z,s[6]=Ma.z,s[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],m=i[2],v=i[6],p=i[10],g=i[14],_=i[3],b=i[7],y=i[11],S=i[15],E=s[0],R=s[4],x=s[8],w=s[12],L=s[1],C=s[5],F=s[9],H=s[13],X=s[2],V=s[6],k=s[10],O=s[14],ie=s[3],Z=s[7],ce=s[11],de=s[15];return r[0]=a*E+o*L+l*X+c*ie,r[4]=a*R+o*C+l*V+c*Z,r[8]=a*x+o*F+l*k+c*ce,r[12]=a*w+o*H+l*O+c*de,r[1]=h*E+d*L+u*X+f*ie,r[5]=h*R+d*C+u*V+f*Z,r[9]=h*x+d*F+u*k+f*ce,r[13]=h*w+d*H+u*O+f*de,r[2]=m*E+v*L+p*X+g*ie,r[6]=m*R+v*C+p*V+g*Z,r[10]=m*x+v*F+p*k+g*ce,r[14]=m*w+v*H+p*O+g*de,r[3]=_*E+b*L+y*X+S*ie,r[7]=_*R+b*C+y*V+S*Z,r[11]=_*x+b*F+y*k+S*ce,r[15]=_*w+b*H+y*O+S*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],v=e[7],p=e[11],g=e[15],_=l*f-c*u,b=o*f-c*d,y=o*u-l*d,S=a*f-c*h,E=a*u-l*h,R=a*d-o*h;return t*(v*_-p*b+g*y)-i*(m*_-p*S+g*E)+s*(m*b-v*S+g*R)-r*(m*y-v*E+p*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],v=e[13],p=e[14],g=e[15],_=t*o-i*a,b=t*l-s*a,y=t*c-r*a,S=i*l-s*o,E=i*c-r*o,R=s*c-r*l,x=h*v-d*m,w=h*p-u*m,L=h*g-f*m,C=d*p-u*v,F=d*g-f*v,H=u*g-f*p,X=_*H-b*F+y*C+S*L-E*w+R*x;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/X;return e[0]=(o*H-l*F+c*C)*V,e[1]=(s*F-i*H-r*C)*V,e[2]=(v*R-p*E+g*S)*V,e[3]=(u*E-d*R-f*S)*V,e[4]=(l*L-a*H-c*w)*V,e[5]=(t*H-s*L+r*w)*V,e[6]=(p*y-m*R-g*b)*V,e[7]=(h*R-u*y+f*b)*V,e[8]=(a*F-o*L+c*x)*V,e[9]=(i*L-t*F-r*x)*V,e[10]=(m*E-v*y+g*_)*V,e[11]=(d*y-h*E-f*_)*V,e[12]=(o*w-a*C-l*x)*V,e[13]=(t*C-i*w+s*x)*V,e[14]=(v*b-m*S-p*_)*V,e[15]=(h*S-d*b+u*_)*V,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,v=a*h,p=a*d,g=o*d,_=l*c,b=l*h,y=l*d,S=i.x,E=i.y,R=i.z;return s[0]=(1-(v+g))*S,s[1]=(f+y)*S,s[2]=(m-b)*S,s[3]=0,s[4]=(f-y)*E,s[5]=(1-(u+g))*E,s[6]=(p+_)*E,s[7]=0,s[8]=(m+b)*R,s[9]=(p-_)*R,s[10]=(1-(u+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ys.set(s[0],s[1],s[2]).length();const o=ys.set(s[4],s[5],s[6]).length(),l=ys.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ei.copy(this);const c=1/a,h=1/o,d=1/l;return Ei.elements[0]*=c,Ei.elements[1]*=c,Ei.elements[2]*=c,Ei.elements[4]*=h,Ei.elements[5]*=h,Ei.elements[6]*=h,Ei.elements[8]*=d,Ei.elements[9]*=d,Ei.elements[10]*=d,t.setFromRotationMatrix(Ei),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Xi,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),f=(i+s)/(i-s);let m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===Xi)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===$r)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Xi,l=!1){const c=this.elements,h=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),f=-(i+s)/(i-s);let m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===Xi)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===$r)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ys=new P,Ei=new ke,vg=new P(0,0,0),Ag=new P(1,1,1),vn=new P,Ma=new P,oi=new P,zu=new ke,Gu=new Ni;class Ui{constructor(e=0,t=0,i=0,s=Ui.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return zu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gu.setFromEuler(this),this.setFromQuaternion(Gu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ui.DEFAULT_ORDER="XYZ";class Xh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xg=0;const Wu=new P,Ms=new Ni,tn=new ke,ba=new P,br=new P,_g=new P,yg=new Ni,Xu=new P(1,0,0),qu=new P(0,1,0),Yu=new P(0,0,1),ju={type:"added"},Mg={type:"removed"},bs={type:"childadded",child:null},Al={type:"childremoved",child:null};class yt extends ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new P,t=new Ui,i=new Ni,s=new P(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ke},normalMatrix:{value:new Xe}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(Xu,e)}rotateY(e){return this.rotateOnAxis(qu,e)}rotateZ(e){return this.rotateOnAxis(Yu,e)}translateOnAxis(e,t){return Wu.copy(e).applyQuaternion(this.quaternion),this.position.add(Wu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xu,e)}translateY(e){return this.translateOnAxis(qu,e)}translateZ(e){return this.translateOnAxis(Yu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ba.copy(e):ba.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tn.lookAt(br,ba,this.up):tn.lookAt(ba,br,this.up),this.quaternion.setFromRotationMatrix(tn),s&&(tn.extractRotation(s.matrixWorld),Ms.setFromRotationMatrix(tn),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ue("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ju),bs.child=e,this.dispatchEvent(bs),bs.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Mg),Al.child=e,this.dispatchEvent(Al),Al.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ju),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,e,_g),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,yg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}yt.DEFAULT_UP=new P(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class qi extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bg={type:"move"};class xl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),g=this._getHandJoint(c,v);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new qi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const rp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},Sa={h:0,s:0,l:0};function _l(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Te{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=et.workingColorSpace){if(e=Gh(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=_l(a,r,e+1/3),this.g=_l(a,r,e),this.b=_l(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=Pt){function i(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){const i=rp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=un(e.r),this.g=un(e.g),this.b=un(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return et.workingToColorSpace(Yt.copy(this),e),Math.round(Ze(Yt.r*255,0,255))*65536+Math.round(Ze(Yt.g*255,0,255))*256+Math.round(Ze(Yt.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Yt.copy(this),t);const i=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=Pt){et.workingToColorSpace(Yt.copy(this),e);const t=Yt.r,i=Yt.g,s=Yt.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(Sa);const i=Gr(An.h,Sa.h,t),s=Gr(An.s,Sa.s,t),r=Gr(An.l,Sa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new Te;Te.NAMES=rp;class Wo{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Te(e),this.near=t,this.far=i}clone(){return new Wo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xo extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ui,this.environmentIntensity=1,this.environmentRotation=new Ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ti=new P,nn=new P,yl=new P,sn=new P,Ss=new P,ws=new P,Zu=new P,Ml=new P,bl=new P,Sl=new P,wl=new Mt,El=new Mt,Tl=new Mt;class Di{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ti.subVectors(e,t),s.cross(Ti);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ti.subVectors(s,t),nn.subVectors(i,t),yl.subVectors(e,t);const a=Ti.dot(Ti),o=Ti.dot(nn),l=Ti.dot(yl),c=nn.dot(nn),h=nn.dot(yl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,sn.x),l.addScaledVector(a,sn.y),l.addScaledVector(o,sn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return wl.setScalar(0),El.setScalar(0),Tl.setScalar(0),wl.fromBufferAttribute(e,t),El.fromBufferAttribute(e,i),Tl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(wl,r.x),a.addScaledVector(El,r.y),a.addScaledVector(Tl,r.z),a}static isFrontFacing(e,t,i,s){return Ti.subVectors(i,t),nn.subVectors(e,t),Ti.cross(nn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ti.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Ti.cross(nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Di.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Ss.subVectors(s,i),ws.subVectors(r,i),Ml.subVectors(e,i);const l=Ss.dot(Ml),c=ws.dot(Ml);if(l<=0&&c<=0)return t.copy(i);bl.subVectors(e,s);const h=Ss.dot(bl),d=ws.dot(bl);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(Ss,a);Sl.subVectors(e,r);const f=Ss.dot(Sl),m=ws.dot(Sl);if(m>=0&&f<=m)return t.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(ws,o);const p=h*m-f*d;if(p<=0&&d-h>=0&&f-m>=0)return Zu.subVectors(r,s),o=(d-h)/(d-h+(f-m)),t.copy(s).addScaledVector(Zu,o);const g=1/(p+v+u);return a=v*g,o=u*g,t.copy(i).addScaledVector(Ss,a).addScaledVector(ws,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class bi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ci):Ci.fromBufferAttribute(r,a),Ci.applyMatrix4(e.matrixWorld),this.expandByPoint(Ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),wa.copy(i.boundingBox)),wa.applyMatrix4(e.matrixWorld),this.union(wa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ci),Ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sr),Ea.subVectors(this.max,Sr),Es.subVectors(e.a,Sr),Ts.subVectors(e.b,Sr),Cs.subVectors(e.c,Sr),xn.subVectors(Ts,Es),_n.subVectors(Cs,Ts),qn.subVectors(Es,Cs);let t=[0,-xn.z,xn.y,0,-_n.z,_n.y,0,-qn.z,qn.y,xn.z,0,-xn.x,_n.z,0,-_n.x,qn.z,0,-qn.x,-xn.y,xn.x,0,-_n.y,_n.x,0,-qn.y,qn.x,0];return!Cl(t,Es,Ts,Cs,Ea)||(t=[1,0,0,0,1,0,0,0,1],!Cl(t,Es,Ts,Cs,Ea))?!1:(Ta.crossVectors(xn,_n),t=[Ta.x,Ta.y,Ta.z],Cl(t,Es,Ts,Cs,Ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const rn=[new P,new P,new P,new P,new P,new P,new P,new P],Ci=new P,wa=new bi,Es=new P,Ts=new P,Cs=new P,xn=new P,_n=new P,qn=new P,Sr=new P,Ea=new P,Ta=new P,Yn=new P;function Cl(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Yn.fromArray(n,r);const o=s.x*Math.abs(Yn.x)+s.y*Math.abs(Yn.y)+s.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),h=i.dot(Yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const It=new P,Ca=new De;let Sg=0;class $t{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qc,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ca.fromBufferAttribute(this,t),Ca.applyMatrix3(e),this.setXY(t,Ca.x,Ca.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Pi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qc&&(e.usage=this.usage),e}}class ap extends $t{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class op extends $t{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class fi extends $t{constructor(e,t,i){super(new Float32Array(e),t,i)}}const wg=new bi,wr=new P,Rl=new P;class Ki{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):wg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wr.subVectors(e,this.center);const t=wr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(wr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wr.copy(e.center).add(Rl)),this.expandByPoint(wr.copy(e.center).sub(Rl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Eg=0;const gi=new ke,Pl=new yt,Rs=new P,li=new bi,Er=new bi,kt=new P;class mi extends ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wm(e)?op:ap)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Xe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gi.makeRotationFromQuaternion(e),this.applyMatrix4(gi),this}rotateX(e){return gi.makeRotationX(e),this.applyMatrix4(gi),this}rotateY(e){return gi.makeRotationY(e),this.applyMatrix4(gi),this}rotateZ(e){return gi.makeRotationZ(e),this.applyMatrix4(gi),this}translate(e,t,i){return gi.makeTranslation(e,t,i),this.applyMatrix4(gi),this}scale(e,t,i){return gi.makeScale(e,t,i),this.applyMatrix4(gi),this}lookAt(e){return Pl.lookAt(e),Pl.updateMatrix(),this.applyMatrix4(Pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rs).negate(),this.translate(Rs.x,Rs.y,Rs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new fi(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];li.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(li.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Er.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(li.min,Er.min),li.expandByPoint(kt),kt.addVectors(li.max,Er.max),li.expandByPoint(kt)):(li.expandByPoint(Er.min),li.expandByPoint(Er.max))}li.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)kt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(kt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)kt.fromBufferAttribute(o,c),l&&(Rs.fromBufferAttribute(e,c),kt.add(Rs)),s=Math.max(s,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new P,l[x]=new P;const c=new P,h=new P,d=new P,u=new De,f=new De,m=new De,v=new P,p=new P;function g(x,w,L){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,w),d.fromBufferAttribute(i,L),u.fromBufferAttribute(r,x),f.fromBufferAttribute(r,w),m.fromBufferAttribute(r,L),h.sub(c),d.sub(c),f.sub(u),m.sub(u);const C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(C),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),o[x].add(v),o[w].add(v),o[L].add(v),l[x].add(p),l[w].add(p),l[L].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let x=0,w=_.length;x<w;++x){const L=_[x],C=L.start,F=L.count;for(let H=C,X=C+F;H<X;H+=3)g(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const b=new P,y=new P,S=new P,E=new P;function R(x){S.fromBufferAttribute(s,x),E.copy(S);const w=o[x];b.copy(w),b.sub(S.multiplyScalar(S.dot(w))).normalize(),y.crossVectors(E,w);const C=y.dot(l[x])<0?-1:1;a.setXYZW(x,b.x,b.y,b.z,C)}for(let x=0,w=_.length;x<w;++x){const L=_[x],C=L.start,F=L.count;for(let H=C,X=C+F;H<X;H+=3)R(e.getX(H+0)),R(e.getX(H+1)),R(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,d=new P;if(e)for(let u=0,f=e.count;u<f;u+=3){const m=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let g=0;g<h;g++)u[m++]=c[f++]}return new $t(u,h,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mi,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qc,this.updateRanges=[],this.version=0,this.uuid=Ii()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qt=new P;class qh{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Pi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ht(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),s=ht(s,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){So("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new $t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new qh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){So("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Cg=0;class pi extends ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=Ys,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=Zr,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xs,this.stencilZFail=xs,this.stencilZPass=xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ys&&(i.blending=this.blending),this.side!==Zi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==yo&&(i.blendSrc=this.blendSrc),this.blendDst!==Zr&&(i.blendDst=this.blendDst),this.blendEquation!==Gi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==er&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Uu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==xs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==xs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const an=new P,Dl=new P,Ra=new P,yn=new P,Ll=new P,Pa=new P,Il=new P;class dr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,an)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=an.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(an.copy(this.origin).addScaledVector(this.direction,t),an.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Dl.copy(e).add(t).multiplyScalar(.5),Ra.copy(t).sub(e).normalize(),yn.copy(this.origin).sub(Dl);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ra),o=yn.dot(this.direction),l=-yn.dot(Ra),c=yn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Dl).addScaledVector(Ra,u),f}intersectSphere(e,t){an.subVectors(e.center,this.origin);const i=an.dot(this.direction),s=an.dot(an)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,an)!==null}intersectTriangle(e,t,i,s,r){Ll.subVectors(t,e),Pa.subVectors(i,e),Il.crossVectors(Ll,Pa);let a=this.direction.dot(Il),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;yn.subVectors(this.origin,e);const l=o*this.direction.dot(Pa.crossVectors(yn,Pa));if(l<0)return null;const c=o*this.direction.dot(Ll.cross(yn));if(c<0||l+c>a)return null;const h=-o*yn.dot(Il);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Yi extends pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.combine=Ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qu=new ke,jn=new dr,Da=new Ki,Ku=new P,La=new P,Ia=new P,Na=new P,Nl=new P,Ua=new P,Ju=new P,Oa=new P;class nt extends yt{constructor(e=new mi,t=new Yi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ua.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Nl.fromBufferAttribute(d,e),a?Ua.addScaledVector(Nl,h):Ua.addScaledVector(Nl.sub(t),h))}t.add(Ua)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Da.copy(i.boundingSphere),Da.applyMatrix4(r),jn.copy(e.ray).recast(e.near),!(Da.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Da,Ku)===null||jn.origin.distanceToSquared(Ku)>(e.far-e.near)**2))&&(Qu.copy(r).invert(),jn.copy(e.ray).applyMatrix4(Qu),!(i.boundingBox!==null&&jn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const p=u[m],g=a[p.materialIndex],_=Math.max(p.start,f.start),b=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=_,S=b;y<S;y+=3){const E=o.getX(y),R=o.getX(y+1),x=o.getX(y+2);s=Fa(this,g,e,i,c,h,d,E,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=m,g=v;p<g;p+=3){const _=o.getX(p),b=o.getX(p+1),y=o.getX(p+2);s=Fa(this,a,e,i,c,h,d,_,b,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const p=u[m],g=a[p.materialIndex],_=Math.max(p.start,f.start),b=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=_,S=b;y<S;y+=3){const E=y,R=y+1,x=y+2;s=Fa(this,g,e,i,c,h,d,E,R,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=m,g=v;p<g;p+=3){const _=p,b=p+1,y=p+2;s=Fa(this,a,e,i,c,h,d,_,b,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Rg(n,e,t,i,s,r,a,o){let l;if(e.side===Jt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Zi,o),l===null)return null;Oa.copy(o),Oa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Oa);return c<t.near||c>t.far?null:{distance:c,point:Oa.clone(),object:n}}function Fa(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,La),n.getVertexPosition(l,Ia),n.getVertexPosition(c,Na);const h=Rg(n,e,t,i,La,Ia,Na,Ju);if(h){const d=new P;Di.getBarycoord(Ju,La,Ia,Na,d),s&&(h.uv=Di.getInterpolatedAttribute(s,o,l,c,d,new De)),r&&(h.uv1=Di.getInterpolatedAttribute(r,o,l,c,d,new De)),a&&(h.normal=Di.getInterpolatedAttribute(a,o,l,c,d,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new P,materialIndex:0};Di.getNormal(La,Ia,Na,u.normal),h.face=u,h.barycoord=d}return h}const $u=new P,ed=new Mt,td=new Mt,Pg=new P,id=new ke,Ba=new P,Ul=new Ki,nd=new ke,Ol=new dr;class Dg extends nt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Pu,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new bi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ba),this.boundingBox.expandByPoint(Ba)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ki),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ba),this.boundingSphere.expandByPoint(Ba)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ul.copy(this.boundingSphere),Ul.applyMatrix4(s),e.ray.intersectsSphere(Ul)!==!1&&(nd.copy(s).invert(),Ol.copy(e.ray).applyMatrix4(nd),!(this.boundingBox!==null&&Ol.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ol)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Mt,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Pu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Lm?this.bindMatrixInverse.copy(this.bindMatrix).invert():Re("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;ed.fromBufferAttribute(s.attributes.skinIndex,e),td.fromBufferAttribute(s.attributes.skinWeight,e),$u.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=td.getComponent(r);if(a!==0){const o=ed.getComponent(r);id.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Pg.copy($u).applyMatrix4(id),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class lp extends yt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qo extends wt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=bt,h=bt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const sd=new ke,Lg=new ke;class Yh{constructor(e=[],t=[]){this.uuid=Ii(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Re("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new ke;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Lg;sd.multiplyMatrices(o,t[r]),sd.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Yh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new qo(t,e,e,Mi,ui);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(Re("Skeleton: No bone found with UUID:",r),a=new lp),this.bones.push(a),this.boneInverses.push(new ke().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class os extends $t{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ps=new ke,rd=new ke,Ha=[],ad=new bi,Ig=new ke,Tr=new nt,Cr=new Ki;class ls extends nt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new os(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Ig)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new bi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ps),ad.copy(e.boundingBox).applyMatrix4(Ps),this.boundingBox.union(ad)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ps),Cr.copy(e.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Tr.geometry=this.geometry,Tr.material=this.material,Tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(i),e.ray.intersectsSphere(Cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ps),rd.multiplyMatrices(i,Ps),Tr.matrixWorld=rd,Tr.raycast(e,Ha);for(let a=0,o=Ha.length;a<o;a++){const l=Ha[a];l.instanceId=r,l.object=this,t.push(l)}Ha.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new os(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new qo(new Float32Array(s*this.count),s,this.count,zo,ui));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Fl=new P,Ng=new P,Ug=new Xe;class Sn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Fl.subVectors(i,t).cross(Ng.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Fl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ug.getNormalMatrix(e),s=this.coplanarPoint(Fl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new Ki,Og=new De(.5,.5),ka=new P;class ua{constructor(e=new Sn,t=new Sn,i=new Sn,s=new Sn,r=new Sn,a=new Sn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Xi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],v=r[9],p=r[10],g=r[11],_=r[12],b=r[13],y=r[14],S=r[15];if(s[0].setComponents(c-a,f-h,g-m,S-_).normalize(),s[1].setComponents(c+a,f+h,g+m,S+_).normalize(),s[2].setComponents(c+o,f+d,g+v,S+b).normalize(),s[3].setComponents(c-o,f-d,g-v,S-b).normalize(),i)s[4].setComponents(l,u,p,y).normalize(),s[5].setComponents(c-l,f-u,g-p,S-y).normalize();else if(s[4].setComponents(c-l,f-u,g-p,S-y).normalize(),t===Xi)s[5].setComponents(c+l,f+u,g+p,S+y).normalize();else if(t===$r)s[5].setComponents(l,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){Zn.center.set(0,0,0);const t=Og.distanceTo(e.center);return Zn.radius=.7071067811865476+t,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ka.x=s.normal.x>0?e.max.x:e.min.x,ka.y=s.normal.y>0?e.max.y:e.min.y,ka.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ka)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cp extends pi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Eo=new P,To=new P,od=new ke,Rr=new dr,Va=new Ki,Bl=new P,ld=new P;class jh extends yt{constructor(e=new mi,t=new cp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Eo.fromBufferAttribute(t,s-1),To.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Eo.distanceTo(To);e.setAttribute("lineDistance",new fi(i,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Va.copy(i.boundingSphere),Va.applyMatrix4(s),Va.radius+=r,e.ray.intersectsSphere(Va)===!1)return;od.copy(s).invert(),Rr.copy(e.ray).applyMatrix4(od);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let v=f,p=m-1;v<p;v+=c){const g=h.getX(v),_=h.getX(v+1),b=za(this,e,Rr,l,g,_,v);b&&t.push(b)}if(this.isLineLoop){const v=h.getX(m-1),p=h.getX(f),g=za(this,e,Rr,l,v,p,m-1);g&&t.push(g)}}else{const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let v=f,p=m-1;v<p;v+=c){const g=za(this,e,Rr,l,v,v+1,v);g&&t.push(g)}if(this.isLineLoop){const v=za(this,e,Rr,l,m-1,f,m-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function za(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Eo.fromBufferAttribute(o,s),To.fromBufferAttribute(o,r),t.distanceSqToSegment(Eo,To,Bl,ld)>i)return;Bl.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Bl);if(!(c<e.near||c>e.far))return{distance:c,point:ld.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const cd=new P,hd=new P;class Fg extends jh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)cd.fromBufferAttribute(t,s),hd.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+cd.distanceTo(hd);e.setAttribute("lineDistance",new fi(i,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bg extends jh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class hp extends pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ud=new ke,Kc=new dr,Ga=new Ki,Wa=new P;class Hg extends yt{constructor(e=new mi,t=new hp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ga.copy(i.boundingSphere),Ga.applyMatrix4(s),Ga.radius+=r,e.ray.intersectsSphere(Ga)===!1)return;ud.copy(s).invert(),Kc.copy(e.ray).applyMatrix4(ud);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,v=f;m<v;m++){const p=c.getX(m);Wa.fromBufferAttribute(d,p),dd(Wa,p,l,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,v=f;m<v;m++)Wa.fromBufferAttribute(d,m),dd(Wa,m,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function dd(n,e,t,i,s,r,a){const o=Kc.distanceSqToPoint(n);if(o<t){const l=new P;Kc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class up extends wt{constructor(e=[],t=us,i,s,r,a,o,l,c,h){super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Pr extends wt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class rr extends wt{constructor(e,t,i=Qi,s,r,a,o=bt,l=bt,c,h=fn,d=1){if(h!==fn&&h!==Pn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class kg extends rr{constructor(e,t=Qi,i=us,s,r,a=bt,o=bt,l,c=fn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class dp extends wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fr extends mi{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new fi(c,3)),this.setAttribute("normal",new fi(h,3)),this.setAttribute("uv",new fi(d,2));function m(v,p,g,_,b,y,S,E,R,x,w){const L=y/R,C=S/x,F=y/2,H=S/2,X=E/2,V=R+1,k=x+1;let O=0,ie=0;const Z=new P;for(let ce=0;ce<k;ce++){const de=ce*C-H;for(let ue=0;ue<V;ue++){const Ne=ue*L-F;Z[v]=Ne*_,Z[p]=de*b,Z[g]=X,c.push(Z.x,Z.y,Z.z),Z[v]=0,Z[p]=0,Z[g]=E>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(ue/R),d.push(1-ce/x),O+=1}}for(let ce=0;ce<x;ce++)for(let de=0;de<R;de++){const ue=u+de+V*ce,Ne=u+de+V*(ce+1),tt=u+(de+1)+V*(ce+1),Je=u+(de+1)+V*ce;l.push(ue,Ne,Je),l.push(Ne,tt,Je),ie+=6}o.addGroup(f,ie,w),f+=ie,u+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Dn extends mi{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],m=[],v=[],p=[];for(let g=0;g<h;g++){const _=g*u-a;for(let b=0;b<c;b++){const y=b*d-r;m.push(y,-_,0),v.push(0,0,1),p.push(b/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){const b=_+c*g,y=_+c*(g+1),S=_+1+c*(g+1),E=_+1+c*g;f.push(b,y,E),f.push(y,S,E)}this.setIndex(f),this.setAttribute("position",new fi(m,3)),this.setAttribute("normal",new fi(v,3)),this.setAttribute("uv",new fi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.width,e.height,e.widthSegments,e.heightSegments)}}function ar(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=ar(n[t]);for(const s in i)e[s]=i[s]}return e}function Vg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function fp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Li={clone:ar,merge:Kt};var zg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ut extends pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zg,this.fragmentShader=Gg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ar(e.uniforms),this.uniformsGroups=Vg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class pp extends Ut{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ds extends pi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Go,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ji extends ds{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Wg extends pi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Go,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class Xg extends pi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Go,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.combine=Ch,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mp extends pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Um,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qg extends pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Xa(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Yg(n){function e(s,r){return n[s]-n[r]}const t=n.length,i=new Array(t);for(let s=0;s!==t;++s)i[s]=s;return i.sort(e),i}function fd(n,e,t){const i=n.length,s=new n.constructor(i);for(let r=0,a=0;a!==i;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=n[o+l]}return s}function gp(n,e,t,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=n[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=n[s++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=n[s++];while(r!==void 0)}class pr{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,s=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class jg extends pr{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lu,endingEnd:Lu}}intervalChanged_(e,t,i){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Iu:r=e,o=2*t-i;break;case Nu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Iu:a=e,l=2*i-t;break;case Nu:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(i-t)/(s-t),v=m*m,p=v*m,g=-u*p+2*u*v-u*m,_=(1+u)*p+(-1.5-2*u)*v+(-.5+u)*m+1,b=(-1-f)*p+(1.5+f)*v+.5*m,y=f*p-f*v;for(let S=0;S!==o;++S)r[S]=g*a[h+S]+_*a[c+S]+b*a[l+S]+y*a[d+S];return r}}class Zg extends pr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}}class Qg extends pr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Kg extends pr{interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){const v=(i-t)/(s-t),p=1-v;for(let g=0;g!==o;++g)r[g]=a[c+g]*p+a[l+g]*v;return r}const f=o*2,m=e-1;for(let v=0;v!==o;++v){const p=a[c+v],g=a[l+v],_=m*f+v*2,b=u[_],y=u[_+1],S=e*f+v*2,E=d[S],R=d[S+1];let x=(i-t)/(s-t),w,L,C,F,H;for(let X=0;X<8;X++){w=x*x,L=w*x,C=1-x,F=C*C,H=F*C;const k=H*t+3*F*x*b+3*C*w*E+L*s-i;if(Math.abs(k)<1e-10)break;const O=3*F*(b-t)+6*C*x*(E-b)+3*w*(s-E);if(Math.abs(O)<1e-10)break;x=x-k/O,x=Math.max(0,Math.min(1,x))}r[v]=H*p+3*F*x*y+3*C*w*R+L*g}return r}}class Oi{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Xa(t,this.TimeBufferType),this.values=Xa(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Xa(e.times,Array),values:Xa(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Qg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Zg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new jg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new Kg(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Kr:t=this.InterpolantFactoryMethodDiscrete;break;case Jr:t=this.InterpolantFactoryMethodLinear;break;case fl:t=this.InterpolantFactoryMethodSmooth;break;case Du:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Re("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Kr;case this.InterpolantFactoryMethodLinear:return Jr;case this.InterpolantFactoryMethodSmooth:return fl;case this.InterpolantFactoryMethodBezier:return Du}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e}return this}trim(e,t){const i=this.times,s=i.length;let r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ue("KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,s=this.values,r=i.length;r===0&&(Ue("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){Ue("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ue("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Xm(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){Ue("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===fl,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const d=o*i,u=d-i,f=d+i;for(let m=0;m!==i;++m){const v=t[d+m];if(v!==t[u+m]||v!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*i,u=a*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Oi.prototype.ValueTypeName="";Oi.prototype.TimeBufferType=Float32Array;Oi.prototype.ValueBufferType=Float32Array;Oi.prototype.DefaultInterpolation=Jr;class mr extends Oi{constructor(e,t,i){super(e,t,i)}}mr.prototype.ValueTypeName="bool";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=Kr;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;class vp extends Oi{constructor(e,t,i,s){super(e,t,i,s)}}vp.prototype.ValueTypeName="color";class or extends Oi{constructor(e,t,i,s){super(e,t,i,s)}}or.prototype.ValueTypeName="number";class Jg extends pr{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Ni.slerpFlat(r,0,a,c-o,a,c,l);return r}}class lr extends Oi{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Jg(this.times,this.values,this.getValueSize(),e)}}lr.prototype.ValueTypeName="quaternion";lr.prototype.InterpolantFactoryMethodSmooth=void 0;class gr extends Oi{constructor(e,t,i){super(e,t,i)}}gr.prototype.ValueTypeName="string";gr.prototype.ValueBufferType=Array;gr.prototype.DefaultInterpolation=Kr;gr.prototype.InterpolantFactoryMethodLinear=void 0;gr.prototype.InterpolantFactoryMethodSmooth=void 0;class cr extends Oi{constructor(e,t,i,s){super(e,t,i,s)}}cr.prototype.ValueTypeName="vector";class $g{constructor(e="",t=-1,i=[],s=Im){this.name=e,this.tracks=i,this.duration=t,this.blendMode=s,this.uuid=Ii(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,s=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(tv(i[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],i=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(Oi.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(e,t,i,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=Yg(l);l=fd(l,1,h),c=fd(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new or(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const s=e;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===t)return i[s];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const d=h[1];let u=s[d];u||(s[d]=u=[]),u.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,i));return a}static parseAnimation(e,t){if(Re("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ue("AnimationClip: No animation in JSONLoader data."),null;const i=function(d,u,f,m,v){if(f.length!==0){const p=[],g=[];gp(f,p,g,m),p.length!==0&&v.push(new d(u,p,g))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let m;for(m=0;m<u.length;m++)if(u[m].morphTargets)for(let v=0;v<u[m].morphTargets.length;v++)f[u[m].morphTargets[v]]=-1;for(const v in f){const p=[],g=[];for(let _=0;_!==u[m].morphTargets.length;++_){const b=u[m];p.push(b.time),g.push(b.morphTarget===v?1:0)}s.push(new or(".morphTargetInfluence["+v+"]",p,g))}l=f.length*a}else{const f=".bones["+t[d].name+"]";i(cr,f+".position",u,"pos",s),i(lr,f+".quaternion",u,"rot",s),i(cr,f+".scale",u,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,s=e.length;i!==s;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function ev(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return or;case"vector":case"vector2":case"vector3":case"vector4":return cr;case"color":return vp;case"quaternion":return lr;case"bool":case"boolean":return mr;case"string":return gr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function tv(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ev(n.type);if(n.times===void 0){const t=[],i=[];gp(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const hn={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(pd(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!pd(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function pd(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class iv{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const nv=new iv;class vr{constructor(e){this.manager=e!==void 0?e:nv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}vr.DEFAULT_MATERIAL_NAME="__DEFAULT";const on={};class sv extends Error{constructor(e,t){super(e),this.response=t}}class Ap extends vr{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=hn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(on[e]!==void 0){on[e].push({onLoad:t,onProgress:i,onError:s});return}on[e]=[],on[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Re("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=on[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,m=f!==0;let v=0;const p=new ReadableStream({start(g){_();function _(){d.read().then(({done:b,value:y})=>{if(b)g.close();else{v+=y.byteLength;const S=new ProgressEvent("progress",{lengthComputable:m,loaded:v,total:f});for(let E=0,R=h.length;E<R;E++){const x=h[E];x.onProgress&&x.onProgress(S)}g.enqueue(y),_()}},b=>{g.error(b)})}}});return new Response(p)}else throw new sv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{hn.add(`file:${e}`,c);const h=on[e];delete on[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=on[e];if(h===void 0)throw this.manager.itemError(e),c;delete on[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ds=new WeakMap;class rv extends vr{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=hn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Ds.get(a);d===void 0&&(d=[],Ds.set(a,d)),d.push({onLoad:t,onError:s})}return a}const o=ea("img");function l(){h(),t&&t(this);const d=Ds.get(this)||[];for(let u=0;u<d.length;u++){const f=d[u];f.onLoad&&f.onLoad(this)}Ds.delete(this),r.manager.itemEnd(e)}function c(d){h(),s&&s(d),hn.remove(`image:${e}`);const u=Ds.get(this)||[];for(let f=0;f<u.length;f++){const m=u[f];m.onError&&m.onError(d)}Ds.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),hn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class av extends vr{constructor(e){super(e)}load(e,t,i,s){const r=new wt,a=new rv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class da extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class ov extends da{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Hl=new ke,md=new P,gd=new P;class Zh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ua,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;md.setFromMatrixPosition(e.matrixWorld),t.position.copy(md),gd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gd),t.updateMatrixWorld(),Hl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Hl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===$r||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Hl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const qa=new P,Ya=new Ni,Bi=new P;class xp extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=Xi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qa,Ya,Bi),Bi.x===1&&Bi.y===1&&Bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qa,Ya,Bi.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(qa,Ya,Bi),Bi.x===1&&Bi.y===1&&Bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qa,Ya,Bi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Mn=new P,vd=new De,Ad=new De;class Wt extends xp{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sr*2*Math.atan(Math.tan(zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Mn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mn.x,Mn.y).multiplyScalar(-e/Mn.z),Mn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Mn.x,Mn.y).multiplyScalar(-e/Mn.z)}getViewSize(e,t){return this.getViewBounds(e,vd,Ad),t.subVectors(Ad,vd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class lv extends Zh{constructor(){super(new Wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=sr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class cv extends da{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new lv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class hv extends Zh{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0}}class _p extends da{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new hv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class fa extends xp{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class uv extends Zh{constructor(){super(new fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jc extends da{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new uv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Wr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const kl=new WeakMap;class dv extends vr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Re("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Re("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=hn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(kl.has(a)===!0)s&&s(kl.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return hn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),kl.set(l,c),hn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});hn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ls=-90,Is=1;class fv extends yt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(Ls,Is,e,t);s.layers=this.layers,this.add(s);const r=new Wt(Ls,Is,e,t);r.layers=this.layers,this.add(r);const a=new Wt(Ls,Is,e,t);a.layers=this.layers,this.add(a);const o=new Wt(Ls,Is,e,t);o.layers=this.layers,this.add(o);const l=new Wt(Ls,Is,e,t);l.layers=this.layers,this.add(l);const c=new Wt(Ls,Is,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Xi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$r)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class pv extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class mv{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=gv.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function gv(){this._document.hidden===!1&&this.reset()}const Qh="\\[\\]\\.:\\/",vv=new RegExp("["+Qh+"]","g"),Kh="[^"+Qh+"]",Av="[^"+Qh.replace("\\.","")+"]",xv=/((?:WC+[\/:])*)/.source.replace("WC",Kh),_v=/(WCOD+)?/.source.replace("WCOD",Av),yv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Kh),Mv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Kh),bv=new RegExp("^"+xv+_v+yv+Mv+"$"),Sv=["material","materials","bones","map"];class wv{constructor(e,t,i){const s=i||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class ut{constructor(e,t,i){this.path=t,this.parsedPath=i||ut.parseTrackName(t),this.node=ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new ut.Composite(e,t,i):new ut(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vv,"")}static parseTrackName(e){const t=bv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=i.nodeName.substring(s+1);Sv.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Re("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;Ue("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ut.Composite=wv;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const xd=new ke;class Ev{constructor(e,t,i=0,s=1/0){this.ray=new dr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Xh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ue("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return xd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xd),this}intersectObject(e,t=!0,i=[]){return $c(e,this,i,t),i.sort(_d),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)$c(e[s],this,i,t);return i.sort(_d),i}}function _d(n,e){return n.distance-e.distance}function $c(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)$c(r[a],e,t,!0)}}class Xr{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Tv extends ps{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Re("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function yd(n,e,t,i){const s=Cv(i);switch(t){case ep:return n*e;case zo:return n*e/s.components*s.byteLength;case Bh:return n*e/s.components*s.byteLength;case nr:return n*e*2/s.components*s.byteLength;case Hh:return n*e*2/s.components*s.byteLength;case tp:return n*e*3/s.components*s.byteLength;case Mi:return n*e*4/s.components*s.byteLength;case kh:return n*e*4/s.components*s.byteLength;case co:case ho:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case uo:case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ac:case _c:return Math.max(n,16)*Math.max(e,8)/4;case vc:case xc:return Math.max(n,8)*Math.max(e,8)/2;case yc:case Mc:case Sc:case wc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case bc:case Ec:case Tc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Rc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Pc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Dc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Lc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ic:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Nc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Uc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Oc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Fc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Bc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Hc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case kc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Vc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case zc:case Gc:case Wc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Xc:case qc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Yc:case jc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cv(n){switch(n){case hi:case Qf:return{byteLength:1,components:1};case Qr:case Kf:case ei:return{byteLength:2,components:1};case Oh:case Fh:return{byteLength:2,components:4};case Qi:case Uh:case ui:return{byteLength:4,components:1};case Jf:case $f:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eh}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eh);function yp(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Rv(n){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const v=d[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Pv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Iv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ov=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Hv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,$v=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,eA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,iA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,aA="gl_FragColor = linearToOutputTexel( gl_FragColor );",oA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,cA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,uA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,AA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_A=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yA=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,MA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,SA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,EA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,TA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,CA=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,RA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,PA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,DA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,LA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,IA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,UA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,OA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,FA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,BA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,HA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,VA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,GA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,WA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,XA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,YA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ZA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,KA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,JA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$A=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,i1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,n1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,r1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,a1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,o1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,l1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,d1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,f1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,p1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,m1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,v1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,x1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,M1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,b1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,S1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,w1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,E1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,C1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const R1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,O1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,F1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,B1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,H1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,z1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,W1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,j1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Q1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,K1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,J1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ex=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ix=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ax=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ox=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Pv,alphahash_pars_fragment:Dv,alphamap_fragment:Lv,alphamap_pars_fragment:Iv,alphatest_fragment:Nv,alphatest_pars_fragment:Uv,aomap_fragment:Ov,aomap_pars_fragment:Fv,batching_pars_vertex:Bv,batching_vertex:Hv,begin_vertex:kv,beginnormal_vertex:Vv,bsdfs:zv,iridescence_fragment:Gv,bumpmap_pars_fragment:Wv,clipping_planes_fragment:Xv,clipping_planes_pars_fragment:qv,clipping_planes_pars_vertex:Yv,clipping_planes_vertex:jv,color_fragment:Zv,color_pars_fragment:Qv,color_pars_vertex:Kv,color_vertex:Jv,common:$v,cube_uv_reflection_fragment:eA,defaultnormal_vertex:tA,displacementmap_pars_vertex:iA,displacementmap_vertex:nA,emissivemap_fragment:sA,emissivemap_pars_fragment:rA,colorspace_fragment:aA,colorspace_pars_fragment:oA,envmap_fragment:lA,envmap_common_pars_fragment:cA,envmap_pars_fragment:hA,envmap_pars_vertex:uA,envmap_physical_pars_fragment:MA,envmap_vertex:dA,fog_vertex:fA,fog_pars_vertex:pA,fog_fragment:mA,fog_pars_fragment:gA,gradientmap_pars_fragment:vA,lightmap_pars_fragment:AA,lights_lambert_fragment:xA,lights_lambert_pars_fragment:_A,lights_pars_begin:yA,lights_toon_fragment:bA,lights_toon_pars_fragment:SA,lights_phong_fragment:wA,lights_phong_pars_fragment:EA,lights_physical_fragment:TA,lights_physical_pars_fragment:CA,lights_fragment_begin:RA,lights_fragment_maps:PA,lights_fragment_end:DA,logdepthbuf_fragment:LA,logdepthbuf_pars_fragment:IA,logdepthbuf_pars_vertex:NA,logdepthbuf_vertex:UA,map_fragment:OA,map_pars_fragment:FA,map_particle_fragment:BA,map_particle_pars_fragment:HA,metalnessmap_fragment:kA,metalnessmap_pars_fragment:VA,morphinstance_vertex:zA,morphcolor_vertex:GA,morphnormal_vertex:WA,morphtarget_pars_vertex:XA,morphtarget_vertex:qA,normal_fragment_begin:YA,normal_fragment_maps:jA,normal_pars_fragment:ZA,normal_pars_vertex:QA,normal_vertex:KA,normalmap_pars_fragment:JA,clearcoat_normal_fragment_begin:$A,clearcoat_normal_fragment_maps:e1,clearcoat_pars_fragment:t1,iridescence_pars_fragment:i1,opaque_fragment:n1,packing:s1,premultiplied_alpha_fragment:r1,project_vertex:a1,dithering_fragment:o1,dithering_pars_fragment:l1,roughnessmap_fragment:c1,roughnessmap_pars_fragment:h1,shadowmap_pars_fragment:u1,shadowmap_pars_vertex:d1,shadowmap_vertex:f1,shadowmask_pars_fragment:p1,skinbase_vertex:m1,skinning_pars_vertex:g1,skinning_vertex:v1,skinnormal_vertex:A1,specularmap_fragment:x1,specularmap_pars_fragment:_1,tonemapping_fragment:y1,tonemapping_pars_fragment:M1,transmission_fragment:b1,transmission_pars_fragment:S1,uv_pars_fragment:w1,uv_pars_vertex:E1,uv_vertex:T1,worldpos_vertex:C1,background_vert:R1,background_frag:P1,backgroundCube_vert:D1,backgroundCube_frag:L1,cube_vert:I1,cube_frag:N1,depth_vert:U1,depth_frag:O1,distance_vert:F1,distance_frag:B1,equirect_vert:H1,equirect_frag:k1,linedashed_vert:V1,linedashed_frag:z1,meshbasic_vert:G1,meshbasic_frag:W1,meshlambert_vert:X1,meshlambert_frag:q1,meshmatcap_vert:Y1,meshmatcap_frag:j1,meshnormal_vert:Z1,meshnormal_frag:Q1,meshphong_vert:K1,meshphong_frag:J1,meshphysical_vert:$1,meshphysical_frag:ex,meshtoon_vert:tx,meshtoon_frag:ix,points_vert:nx,points_frag:sx,shadow_vert:rx,shadow_frag:ax,sprite_vert:ox,sprite_frag:lx},ge={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Vi={basic:{uniforms:Kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Te(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Kt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Kt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Te(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Kt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Kt([ge.points,ge.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Kt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Kt([ge.common,ge.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Kt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Kt([ge.sprite,ge.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Kt([ge.common,ge.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Kt([ge.lights,ge.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Vi.physical={uniforms:Kt([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ja={r:0,b:0,g:0},Qn=new Ui,cx=new ke;function hx(n,e,t,i,s,r){const a=new Te(0);let o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(_){let b=_.isScene===!0?_.background:null;if(b&&b.isTexture){const y=_.backgroundBlurriness>0;b=e.get(b,y)}return b}function m(_){let b=!1;const y=f(_);y===null?p(a,o):y&&y.isColor&&(p(y,1),b=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(_,b){const y=f(b);y&&(y.isCubeTexture||y.mapping===Vo)?(c===void 0&&(c=new nt(new fr(1,1,1),new Ut({name:"BackgroundCubeMaterial",uniforms:ar(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),Qn.copy(b.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(Qn)),c.material.toneMapped=et.getTransfer(y.colorSpace)!==lt,(h!==y||d!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new nt(new Dn(2,2),new Ut({name:"BackgroundMaterial",uniforms:ar(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=et.getTransfer(y.colorSpace)!==lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,b){_.getRGB(ja,fp(n)),t.buffers.color.setClear(ja.r,ja.g,ja.b,b,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,b=1){a.set(_),o=b,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,p(a,o)},render:m,addToRenderList:v,dispose:g}}function ux(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(C,F,H,X,V){let k=!1;const O=d(C,X,H,F);r!==O&&(r=O,c(r.object)),k=f(C,X,H,V),k&&m(C,X,H,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,y(C,F,H,X),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function h(C){return n.deleteVertexArray(C)}function d(C,F,H,X){const V=X.wireframe===!0;let k=i[F.id];k===void 0&&(k={},i[F.id]=k);const O=C.isInstancedMesh===!0?C.id:0;let ie=k[O];ie===void 0&&(ie={},k[O]=ie);let Z=ie[H.id];Z===void 0&&(Z={},ie[H.id]=Z);let ce=Z[V];return ce===void 0&&(ce=u(l()),Z[V]=ce),ce}function u(C){const F=[],H=[],X=[];for(let V=0;V<t;V++)F[V]=0,H[V]=0,X[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:H,attributeDivisors:X,object:C,attributes:{},index:null}}function f(C,F,H,X){const V=r.attributes,k=F.attributes;let O=0;const ie=H.getAttributes();for(const Z in ie)if(ie[Z].location>=0){const de=V[Z];let ue=k[Z];if(ue===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(ue=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(ue=C.instanceColor)),de===void 0||de.attribute!==ue||ue&&de.data!==ue.data)return!0;O++}return r.attributesNum!==O||r.index!==X}function m(C,F,H,X){const V={},k=F.attributes;let O=0;const ie=H.getAttributes();for(const Z in ie)if(ie[Z].location>=0){let de=k[Z];de===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(de=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(de=C.instanceColor));const ue={};ue.attribute=de,de&&de.data&&(ue.data=de.data),V[Z]=ue,O++}r.attributes=V,r.attributesNum=O,r.index=X}function v(){const C=r.newAttributes;for(let F=0,H=C.length;F<H;F++)C[F]=0}function p(C){g(C,0)}function g(C,F){const H=r.newAttributes,X=r.enabledAttributes,V=r.attributeDivisors;H[C]=1,X[C]===0&&(n.enableVertexAttribArray(C),X[C]=1),V[C]!==F&&(n.vertexAttribDivisor(C,F),V[C]=F)}function _(){const C=r.newAttributes,F=r.enabledAttributes;for(let H=0,X=F.length;H<X;H++)F[H]!==C[H]&&(n.disableVertexAttribArray(H),F[H]=0)}function b(C,F,H,X,V,k,O){O===!0?n.vertexAttribIPointer(C,F,H,V,k):n.vertexAttribPointer(C,F,H,X,V,k)}function y(C,F,H,X){v();const V=X.attributes,k=H.getAttributes(),O=F.defaultAttributeValues;for(const ie in k){const Z=k[ie];if(Z.location>=0){let ce=V[ie];if(ce===void 0&&(ie==="instanceMatrix"&&C.instanceMatrix&&(ce=C.instanceMatrix),ie==="instanceColor"&&C.instanceColor&&(ce=C.instanceColor)),ce!==void 0){const de=ce.normalized,ue=ce.itemSize,Ne=e.get(ce);if(Ne===void 0)continue;const tt=Ne.buffer,Je=Ne.type,Q=Ne.bytesPerElement,ne=Je===n.INT||Je===n.UNSIGNED_INT||ce.gpuType===Uh;if(ce.isInterleavedBufferAttribute){const se=ce.data,be=se.stride,ye=ce.offset;if(se.isInstancedInterleavedBuffer){for(let Le=0;Le<Z.locationSize;Le++)g(Z.location+Le,se.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Le=0;Le<Z.locationSize;Le++)p(Z.location+Le);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let Le=0;Le<Z.locationSize;Le++)b(Z.location+Le,ue/Z.locationSize,Je,de,be*Q,(ye+ue/Z.locationSize*Le)*Q,ne)}else{if(ce.isInstancedBufferAttribute){for(let se=0;se<Z.locationSize;se++)g(Z.location+se,ce.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let se=0;se<Z.locationSize;se++)p(Z.location+se);n.bindBuffer(n.ARRAY_BUFFER,tt);for(let se=0;se<Z.locationSize;se++)b(Z.location+se,ue/Z.locationSize,Je,de,ue*Q,ue/Z.locationSize*se*Q,ne)}}else if(O!==void 0){const de=O[ie];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(Z.location,de);break;case 3:n.vertexAttrib3fv(Z.location,de);break;case 4:n.vertexAttrib4fv(Z.location,de);break;default:n.vertexAttrib1fv(Z.location,de)}}}}_()}function S(){w();for(const C in i){const F=i[C];for(const H in F){const X=F[H];for(const V in X){const k=X[V];for(const O in k)h(k[O].object),delete k[O];delete X[V]}}delete i[C]}}function E(C){if(i[C.id]===void 0)return;const F=i[C.id];for(const H in F){const X=F[H];for(const V in X){const k=X[V];for(const O in k)h(k[O].object),delete k[O];delete X[V]}}delete i[C.id]}function R(C){for(const F in i){const H=i[F];for(const X in H){const V=H[X];if(V[C.id]===void 0)continue;const k=V[C.id];for(const O in k)h(k[O].object),delete k[O];delete V[C.id]}}}function x(C){for(const F in i){const H=i[F],X=C.isInstancedMesh===!0?C.id:0,V=H[X];if(V!==void 0){for(const k in V){const O=V[k];for(const ie in O)h(O[ie].object),delete O[ie];delete V[k]}delete H[X],Object.keys(H).length===0&&delete i[F]}}}function w(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:L,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:_}}function dx(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function a(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let m=0;m<d;m++)f+=h[m];t.update(f,i,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let m=0;for(let v=0;v<d;v++)m+=h[v]*u[v];t.update(m,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function fx(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Mi&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const x=R===ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==hi&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ui&&!x)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Re("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:y,maxSamples:S,samples:E}}function px(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Sn,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,g=n.get(d);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{const _=r?0:i,b=_*4;let y=g.clippingState||null;l.value=y,y=h(m,u,b,f);for(let S=0;S!==b;++S)y[S]=t[S];g.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,m){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,m!==!0||p===null){const g=f+v*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(p===null||p.length<g)&&(p=new Float32Array(g));for(let b=0,y=f;b!==v;++b,y+=4)a.copy(d[b]).applyMatrix4(_,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}const Ln=4,Md=[.125,.215,.35,.446,.526,.582],ts=20,mx=256,Dr=new fa,bd=new Te;let Vl=null,zl=0,Gl=0,Wl=!1;const gx=new P;class eh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=gx}=r;Vl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vl,zl,Gl),this._renderer.xr.enabled=Wl,e.scissorTest=!1,Ns(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:ei,format:Mi,colorSpace:ti,depthBuffer:!1},s=Sd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sd(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=vx(r)),this._blurMaterial=xx(r,e,t),this._ggxMaterial=Ax(r,e,t)}return s}_compileMaterial(e){const t=new nt(new mi,e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,i,s,r){const l=new Wt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(bd),d.toneMapping=ji,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nt(new fr,new Yi({name:"PMREM.Background",side:Jt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let g=!1;const _=e.background;_?_.isColor&&(p.color.copy(_),e.background=null,g=!0):(p.color.copy(bd),g=!0);for(let b=0;b<6;b++){const y=b%3;y===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):y===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));const S=this._cubeSize;Ns(s,y*S,b>2?S:0,S,S),d.setRenderTarget(s),g&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===us||e.mapping===tr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ns(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Dr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:m}=this,v=this._sizeLods[i],p=3*v*(i>m-Ln?i-m+Ln:0),g=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,Ns(r,p,g,3*v,2*v),s.setRenderTarget(r),s.render(o,Dr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,Ns(e,p,g,3*v,2*v),s.setRenderTarget(e),s.render(o,Dr)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ts-1),v=r/m,p=isFinite(r)?1+Math.floor(h*v):ts;p>ts&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ts}`);const g=[];let _=0;for(let R=0;R<ts;++R){const x=R/v,w=Math.exp(-x*x/2);g.push(w),R===0?_+=w:R<p&&(_+=2*w)}for(let R=0;R<g.length;R++)g[R]=g[R]/_;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=g,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=m,u.mipInt.value=b-i;const y=this._sizeLods[s],S=3*y*(s>b-Ln?s-b+Ln:0),E=4*(this._cubeSize-y);Ns(t,S,E,3*y,2*y),l.setRenderTarget(t),l.render(d,Dr)}}function vx(n){const e=[],t=[],i=[];let s=n;const r=n-Ln+1+Md.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ln?l=Md[a-n+Ln-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,v=3,p=2,g=1,_=new Float32Array(v*m*f),b=new Float32Array(p*m*f),y=new Float32Array(g*m*f);for(let E=0;E<f;E++){const R=E%3*2/3-1,x=E>2?0:-1,w=[R,x,0,R+2/3,x,0,R+2/3,x+1,0,R,x,0,R+2/3,x+1,0,R,x+1,0];_.set(w,v*m*E),b.set(u,p*m*E);const L=[E,E,E,E,E,E];y.set(L,g*m*E)}const S=new mi;S.setAttribute("position",new $t(_,v)),S.setAttribute("uv",new $t(b,p)),S.setAttribute("faceIndex",new $t(y,g)),i.push(new nt(S,null)),s>Ln&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Sd(n,e,t){const i=new jt(n,e,t);return i.texture.mapping=Vo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ns(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Ax(n,e,t){return new Ut({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:mx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Gt,depthTest:!1,depthWrite:!1})}function xx(n,e,t){const i=new Float32Array(ts),s=new P(0,1,0);return new Ut({name:"SphericalGaussianBlur",defines:{n:ts,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gt,depthTest:!1,depthWrite:!1})}function wd(){return new Ut({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gt,depthTest:!1,depthWrite:!1})}function Ed(){return new Ut({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gt,depthTest:!1,depthWrite:!1})}function Yo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Mp extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new up(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new fr(5,5,5),r=new Ut({name:"CubemapFromEquirect",uniforms:ar(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Jt,blending:Gt});r.uniforms.tEquirect.value=t;const a=new nt(s,r),o=t.minFilter;return t.minFilter===cn&&(t.minFilter=Nt),new fv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function _x(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===ul||f===dl)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const v=new Mp(m.height);return v.fromEquirectangularTexture(n,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,m=f===ul||f===dl,v=f===us||f===tr;if(m||v){let p=t.get(u);const g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return i===null&&(i=new eh(n)),p=m?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const _=u.image;return m&&_&&_.height>0||v&&_&&l(_)?(i===null&&(i=new eh(n)),p=m?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,f){return f===ul?u.mapping=us:f===dl&&(u.mapping=tr),u}function l(u){let f=0;const m=6;for(let v=0;v<m;v++)u[v]!==void 0&&f++;return f===m}function c(u){const f=u.target;f.removeEventListener("dispose",c);const m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function yx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&wo("WebGLRenderer: "+i+" extension not supported."),s}}}function Mx(n,e,t,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],n.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,m=d.attributes.position;let v=0;if(m===void 0)return;if(f!==null){const _=f.array;v=f.version;for(let b=0,y=_.length;b<y;b+=3){const S=_[b+0],E=_[b+1],R=_[b+2];u.push(S,E,E,R,R,S)}}else{const _=m.array;v=m.version;for(let b=0,y=_.length/3-1;b<y;b+=3){const S=b+0,E=b+1,R=b+2;u.push(S,E,E,R,R,S)}}const p=new(m.count>=65535?op:ap)(u,1);p.version=v;const g=r.get(d);g&&e.remove(g),r.set(d,p)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function bx(n,e,t){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){n.drawElements(i,f,r,u*a),t.update(f,i,1)}function c(u,f,m){m!==0&&(n.drawElementsInstanced(i,f,r,u*a,m),t.update(f,i,m))}function h(u,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,m);let p=0;for(let g=0;g<m;g++)p+=f[g];t.update(p,i,1)}function d(u,f,m,v){if(m===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u.length;g++)c(u[g]/a,f[g],v[g]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,v,0,m);let g=0;for(let _=0;_<m;_++)g+=f[_]*v[_];t.update(g,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Sx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ue("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function wx(n,e,t){const i=new WeakMap,s=new Mt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let L=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",L)};var f=L;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let y=0;m===!0&&(y=1),v===!0&&(y=2),p===!0&&(y=3);let S=o.attributes.position.count*y,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const R=new Float32Array(S*E*4*d),x=new sp(R,S,E,d);x.type=ui,x.needsUpdate=!0;const w=y*4;for(let C=0;C<d;C++){const F=g[C],H=_[C],X=b[C],V=S*E*4*C;for(let k=0;k<F.count;k++){const O=k*w;m===!0&&(s.fromBufferAttribute(F,k),R[V+O+0]=s.x,R[V+O+1]=s.y,R[V+O+2]=s.z,R[V+O+3]=0),v===!0&&(s.fromBufferAttribute(H,k),R[V+O+4]=s.x,R[V+O+5]=s.y,R[V+O+6]=s.z,R[V+O+7]=0),p===!0&&(s.fromBufferAttribute(X,k),R[V+O+8]=s.x,R[V+O+9]=s.y,R[V+O+10]=s.z,R[V+O+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:x,size:new De(S,E)},i.set(o,u),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let p=0;p<c.length;p++)m+=c[p];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Ex(n,e,t,i,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const Tx={[Rh]:"LINEAR_TONE_MAPPING",[Ph]:"REINHARD_TONE_MAPPING",[Dh]:"CINEON_TONE_MAPPING",[ha]:"ACES_FILMIC_TONE_MAPPING",[Ih]:"AGX_TONE_MAPPING",[Nh]:"NEUTRAL_TONE_MAPPING",[Lh]:"CUSTOM_TONE_MAPPING"};function Cx(n,e,t,i,s){const r=new jt(e,t,{type:n,depthBuffer:i,stencilBuffer:s}),a=new jt(e,t,{type:ei,depthBuffer:!1,stencilBuffer:!1}),o=new mi;o.setAttribute("position",new fi([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new fi([0,2,0,0,2,0],2));const l=new pp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new nt(o,l),h=new fa(-1,1,1,-1,0,1);let d=null,u=null,f=!1,m,v=null,p=[],g=!1;this.setSize=function(_,b){r.setSize(_,b),a.setSize(_,b);for(let y=0;y<p.length;y++){const S=p[y];S.setSize&&S.setSize(_,b)}},this.setEffects=function(_){p=_,g=p.length>0&&p[0].isRenderPass===!0;const b=r.width,y=r.height;for(let S=0;S<p.length;S++){const E=p[S];E.setSize&&E.setSize(b,y)}},this.begin=function(_,b){if(f||_.toneMapping===ji&&p.length===0)return!1;if(v=b,b!==null){const y=b.width,S=b.height;(r.width!==y||r.height!==S)&&this.setSize(y,S)}return g===!1&&_.setRenderTarget(r),m=_.toneMapping,_.toneMapping=ji,!0},this.hasRenderPass=function(){return g},this.end=function(_,b){_.toneMapping=m,f=!0;let y=r,S=a;for(let E=0;E<p.length;E++){const R=p[E];if(R.enabled!==!1&&(R.render(_,S,y,b),R.needsSwap!==!1)){const x=y;y=S,S=x}}if(d!==_.outputColorSpace||u!==_.toneMapping){d=_.outputColorSpace,u=_.toneMapping,l.defines={},et.getTransfer(d)===lt&&(l.defines.SRGB_TRANSFER="");const E=Tx[u];E&&(l.defines[E]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,_.setRenderTarget(v),_.render(c,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const bp=new wt,th=new rr(1,1),Sp=new sp,wp=new gg,Ep=new up,Td=[],Cd=[],Rd=new Float32Array(16),Pd=new Float32Array(9),Dd=new Float32Array(4);function Ar(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Td[s];if(r===void 0&&(r=new Float32Array(s),Td[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function jo(n,e){let t=Cd[e];t===void 0&&(t=new Int32Array(e),Cd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Rx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Px(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2fv(this.addr,e),Bt(t,e)}}function Dx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;n.uniform3fv(this.addr,e),Bt(t,e)}}function Lx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4fv(this.addr,e),Bt(t,e)}}function Ix(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(Ft(t,i))return;Dd.set(i),n.uniformMatrix2fv(this.addr,!1,Dd),Bt(t,i)}}function Nx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(Ft(t,i))return;Pd.set(i),n.uniformMatrix3fv(this.addr,!1,Pd),Bt(t,i)}}function Ux(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(Ft(t,i))return;Rd.set(i),n.uniformMatrix4fv(this.addr,!1,Rd),Bt(t,i)}}function Ox(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Fx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2iv(this.addr,e),Bt(t,e)}}function Bx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3iv(this.addr,e),Bt(t,e)}}function Hx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4iv(this.addr,e),Bt(t,e)}}function kx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;n.uniform2uiv(this.addr,e),Bt(t,e)}}function zx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;n.uniform3uiv(this.addr,e),Bt(t,e)}}function Gx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;n.uniform4uiv(this.addr,e),Bt(t,e)}}function Wx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(th.compareFunction=t.isReversedDepthBuffer()?zh:Vh,r=th):r=bp,t.setTexture2D(e||r,s)}function Xx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||wp,s)}function qx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ep,s)}function Yx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Sp,s)}function jx(n){switch(n){case 5126:return Rx;case 35664:return Px;case 35665:return Dx;case 35666:return Lx;case 35674:return Ix;case 35675:return Nx;case 35676:return Ux;case 5124:case 35670:return Ox;case 35667:case 35671:return Fx;case 35668:case 35672:return Bx;case 35669:case 35673:return Hx;case 5125:return kx;case 36294:return Vx;case 36295:return zx;case 36296:return Gx;case 35678:case 36198:case 36298:case 36306:case 35682:return Wx;case 35679:case 36299:case 36307:return Xx;case 35680:case 36300:case 36308:case 36293:return qx;case 36289:case 36303:case 36311:case 36292:return Yx}}function Zx(n,e){n.uniform1fv(this.addr,e)}function Qx(n,e){const t=Ar(e,this.size,2);n.uniform2fv(this.addr,t)}function Kx(n,e){const t=Ar(e,this.size,3);n.uniform3fv(this.addr,t)}function Jx(n,e){const t=Ar(e,this.size,4);n.uniform4fv(this.addr,t)}function $x(n,e){const t=Ar(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function e_(n,e){const t=Ar(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function t_(n,e){const t=Ar(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function i_(n,e){n.uniform1iv(this.addr,e)}function n_(n,e){n.uniform2iv(this.addr,e)}function s_(n,e){n.uniform3iv(this.addr,e)}function r_(n,e){n.uniform4iv(this.addr,e)}function a_(n,e){n.uniform1uiv(this.addr,e)}function o_(n,e){n.uniform2uiv(this.addr,e)}function l_(n,e){n.uniform3uiv(this.addr,e)}function c_(n,e){n.uniform4uiv(this.addr,e)}function h_(n,e,t){const i=this.cache,s=e.length,r=jo(t,s);Ft(i,r)||(n.uniform1iv(this.addr,r),Bt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=th:a=bp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function u_(n,e,t){const i=this.cache,s=e.length,r=jo(t,s);Ft(i,r)||(n.uniform1iv(this.addr,r),Bt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||wp,r[a])}function d_(n,e,t){const i=this.cache,s=e.length,r=jo(t,s);Ft(i,r)||(n.uniform1iv(this.addr,r),Bt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ep,r[a])}function f_(n,e,t){const i=this.cache,s=e.length,r=jo(t,s);Ft(i,r)||(n.uniform1iv(this.addr,r),Bt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Sp,r[a])}function p_(n){switch(n){case 5126:return Zx;case 35664:return Qx;case 35665:return Kx;case 35666:return Jx;case 35674:return $x;case 35675:return e_;case 35676:return t_;case 5124:case 35670:return i_;case 35667:case 35671:return n_;case 35668:case 35672:return s_;case 35669:case 35673:return r_;case 5125:return a_;case 36294:return o_;case 36295:return l_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return h_;case 35679:case 36299:case 36307:return u_;case 35680:case 36300:case 36308:case 36293:return d_;case 36289:case 36303:case 36311:case 36292:return f_}}class m_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=jx(t.type)}}class g_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=p_(t.type)}}class v_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Xl=/(\w+)(\])?(\[|\.)?/g;function Ld(n,e){n.seq.push(e),n.map[e.id]=e}function A_(n,e,t){const i=n.name,s=i.length;for(Xl.lastIndex=0;;){const r=Xl.exec(i),a=Xl.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ld(t,c===void 0?new m_(o,n,e):new g_(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new v_(o),Ld(t,d)),t=d}}}class po{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);A_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Id(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const x_=37297;let __=0;function y_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Nd=new Xe;function M_(n){et._getMatrix(Nd,et.workingColorSpace,n);const e=`mat3( ${Nd.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case bo:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ud(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+y_(n.getShaderSource(e),o)}else return r}function b_(n,e){const t=M_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const S_={[Rh]:"Linear",[Ph]:"Reinhard",[Dh]:"Cineon",[ha]:"ACESFilmic",[Ih]:"AgX",[Nh]:"Neutral",[Lh]:"Custom"};function w_(n,e){const t=S_[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Za=new P;function E_(){et.getLuminanceCoefficients(Za);const n=Za.x.toFixed(4),e=Za.y.toFixed(4),t=Za.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function T_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function C_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function R_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Vr(n){return n!==""}function Od(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const P_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ih(n){return n.replace(P_,L_)}const D_=new Map;function L_(n,e){let t=We[e];if(t===void 0){const i=D_.get(e);if(i!==void 0)t=We[i],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ih(t)}const I_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bd(n){return n.replace(I_,N_)}function N_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const U_={[oo]:"SHADOWMAP_TYPE_PCF",[Hr]:"SHADOWMAP_TYPE_VSM"};function O_(n){return U_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const F_={[us]:"ENVMAP_TYPE_CUBE",[tr]:"ENVMAP_TYPE_CUBE",[Vo]:"ENVMAP_TYPE_CUBE_UV"};function B_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":F_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const H_={[tr]:"ENVMAP_MODE_REFRACTION"};function k_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":H_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const V_={[Ch]:"ENVMAP_BLENDING_MULTIPLY",[Pm]:"ENVMAP_BLENDING_MIX",[Dm]:"ENVMAP_BLENDING_ADD"};function z_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":V_[n.combine]||"ENVMAP_BLENDING_NONE"}function G_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function W_(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=O_(t),c=B_(t),h=k_(t),d=z_(t),u=G_(t),f=T_(t),m=C_(r),v=s.createProgram();let p,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Vr).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Vr).join(`
`),g.length>0&&(g+=`
`)):(p=[Hd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),g=[Hd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ji?"#define TONE_MAPPING":"",t.toneMapping!==ji?We.tonemapping_pars_fragment:"",t.toneMapping!==ji?w_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,b_("linearToOutputTexel",t.outputColorSpace),E_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=ih(a),a=Od(a,t),a=Fd(a,t),o=ih(o),o=Od(o,t),o=Fd(o,t),a=Bd(a),o=Bd(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Ou?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ou?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const b=_+p+a,y=_+g+o,S=Id(s,s.VERTEX_SHADER,b),E=Id(s,s.FRAGMENT_SHADER,y);s.attachShader(v,S),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(C){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(S)||"",X=s.getShaderInfoLog(E)||"",V=F.trim(),k=H.trim(),O=X.trim();let ie=!0,Z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,S,E);else{const ce=Ud(s,S,"vertex"),de=Ud(s,E,"fragment");Ue("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+V+`
`+ce+`
`+de)}else V!==""?Re("WebGLProgram: Program Info Log:",V):(k===""||O==="")&&(Z=!1);Z&&(C.diagnostics={runnable:ie,programLog:V,vertexShader:{log:k,prefix:p},fragmentShader:{log:O,prefix:g}})}s.deleteShader(S),s.deleteShader(E),x=new po(s,v),w=R_(s,v)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(v,x_)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=__++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=E,this}let X_=0;class q_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Y_(e),t.set(e,i)),i}}class Y_{constructor(e){this.id=X_++,this.code=e,this.usedTimes=0}}function j_(n,e,t,i,s,r){const a=new Xh,o=new q_,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,w,L,C,F){const H=C.fog,X=F.geometry,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?C.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,O=e.get(x.envMap||V,k),ie=O&&O.mapping===Vo?O.image.height:null,Z=f[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Re("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const ce=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,de=ce!==void 0?ce.length:0;let ue=0;X.morphAttributes.position!==void 0&&(ue=1),X.morphAttributes.normal!==void 0&&(ue=2),X.morphAttributes.color!==void 0&&(ue=3);let Ne,tt,Je,Q;if(Z){const ct=Vi[Z];Ne=ct.vertexShader,tt=ct.fragmentShader}else Ne=x.vertexShader,tt=x.fragmentShader,o.update(x),Je=o.getVertexShaderID(x),Q=o.getFragmentShaderID(x);const ne=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),be=F.isInstancedMesh===!0,ye=F.isBatchedMesh===!0,Le=!!x.map,St=!!x.matcap,Ge=!!O,Ye=!!x.aoMap,it=!!x.lightMap,He=!!x.bumpMap,dt=!!x.normalMap,D=!!x.displacementMap,xt=!!x.emissiveMap,$e=!!x.metalnessMap,rt=!!x.roughnessMap,xe=x.anisotropy>0,T=x.clearcoat>0,A=x.dispersion>0,U=x.iridescence>0,K=x.sheen>0,ee=x.transmission>0,q=xe&&!!x.anisotropyMap,pe=T&&!!x.clearcoatMap,N=T&&!!x.clearcoatNormalMap,G=T&&!!x.clearcoatRoughnessMap,oe=U&&!!x.iridescenceMap,J=U&&!!x.iridescenceThicknessMap,te=K&&!!x.sheenColorMap,fe=K&&!!x.sheenRoughnessMap,me=!!x.specularMap,he=!!x.specularColorMap,Oe=!!x.specularIntensityMap,I=ee&&!!x.transmissionMap,le=ee&&!!x.thicknessMap,re=!!x.gradientMap,Me=!!x.alphaMap,ae=x.alphaTest>0,j=!!x.alphaHash,Se=!!x.extensions;let Ve=ji;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ve=n.toneMapping);const _t={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:Ne,fragmentShader:tt,defines:x.defines,customVertexShaderID:Je,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:ye,batchingColor:ye&&F._colorsTexture!==null,instancing:be,instancingColor:be&&F.instanceColor!==null,instancingMorph:be&&F.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ti,alphaToCoverage:!!x.alphaToCoverage,map:Le,matcap:St,envMap:Ge,envMapMode:Ge&&O.mapping,envMapCubeUVHeight:ie,aoMap:Ye,lightMap:it,bumpMap:He,normalMap:dt,displacementMap:D,emissiveMap:xt,normalMapObjectSpace:dt&&x.normalMapType===Fm,normalMapTangentSpace:dt&&x.normalMapType===Go,metalnessMap:$e,roughnessMap:rt,anisotropy:xe,anisotropyMap:q,clearcoat:T,clearcoatMap:pe,clearcoatNormalMap:N,clearcoatRoughnessMap:G,dispersion:A,iridescence:U,iridescenceMap:oe,iridescenceThicknessMap:J,sheen:K,sheenColorMap:te,sheenRoughnessMap:fe,specularMap:me,specularColorMap:he,specularIntensityMap:Oe,transmission:ee,transmissionMap:I,thicknessMap:le,gradientMap:re,opaque:x.transparent===!1&&x.blending===Ys&&x.alphaToCoverage===!1,alphaMap:Me,alphaTest:ae,alphaHash:j,combine:x.combine,mapUv:Le&&m(x.map.channel),aoMapUv:Ye&&m(x.aoMap.channel),lightMapUv:it&&m(x.lightMap.channel),bumpMapUv:He&&m(x.bumpMap.channel),normalMapUv:dt&&m(x.normalMap.channel),displacementMapUv:D&&m(x.displacementMap.channel),emissiveMapUv:xt&&m(x.emissiveMap.channel),metalnessMapUv:$e&&m(x.metalnessMap.channel),roughnessMapUv:rt&&m(x.roughnessMap.channel),anisotropyMapUv:q&&m(x.anisotropyMap.channel),clearcoatMapUv:pe&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:N&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:G&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:J&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:te&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:fe&&m(x.sheenRoughnessMap.channel),specularMapUv:me&&m(x.specularMap.channel),specularColorMapUv:he&&m(x.specularColorMap.channel),specularIntensityMapUv:Oe&&m(x.specularIntensityMap.channel),transmissionMapUv:I&&m(x.transmissionMap.channel),thicknessMapUv:le&&m(x.thicknessMap.channel),alphaMapUv:Me&&m(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(dt||xe),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!X.attributes.uv&&(Le||Me),fog:!!H,useFog:x.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||X.attributes.normal===void 0&&dt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:se,skinning:F.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:ue,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Le&&x.map.isVideoTexture===!0&&et.getTransfer(x.map.colorSpace)===lt,decodeVideoTextureEmissive:xt&&x.emissiveMap.isVideoTexture===!0&&et.getTransfer(x.emissiveMap.colorSpace)===lt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===zi,flipSided:x.side===Jt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Se&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&x.extensions.multiDraw===!0||ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return _t.vertexUv1s=l.has(1),_t.vertexUv2s=l.has(2),_t.vertexUv3s=l.has(3),l.clear(),_t}function p(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const L in x.defines)w.push(L),w.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(g(w,x),_(w,x),w.push(n.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function g(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function _(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),x.push(a.mask)}function b(x){const w=f[x.type];let L;if(w){const C=Vi[w];L=Li.clone(C.uniforms)}else L=x.uniforms;return L}function y(x,w){let L=h.get(w);return L!==void 0?++L.usedTimes:(L=new W_(n,w,x,s),c.push(L),h.set(w,L)),L}function S(x){if(--x.usedTimes===0){const w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function R(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:b,acquireProgram:y,releaseProgram:S,releaseShaderCache:E,programs:c,dispose:R}}function Z_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Q_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function kd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Vd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,v,p,g){let _=n[e];return _===void 0?(_={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:p,group:g},n[e]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=m,_.materialVariant=a(u),_.groupOrder=v,_.renderOrder=u.renderOrder,_.z=p,_.group=g),e++,_}function l(u,f,m,v,p,g){const _=o(u,f,m,v,p,g);m.transmission>0?i.push(_):m.transparent===!0?s.push(_):t.push(_)}function c(u,f,m,v,p,g){const _=o(u,f,m,v,p,g);m.transmission>0?i.unshift(_):m.transparent===!0?s.unshift(_):t.unshift(_)}function h(u,f){t.length>1&&t.sort(u||Q_),i.length>1&&i.sort(f||kd),s.length>1&&s.sort(f||kd)}function d(){for(let u=e,f=n.length;u<f;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function K_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Vd,n.set(i,[a])):s>=r.length?(a=new Vd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function J_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Te};break;case"SpotLight":t={position:new P,direction:new P,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function $_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let ey=0;function ty(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function iy(n){const e=new J_,t=$_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const s=new P,r=new ke,a=new ke;function o(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,m=0,v=0,p=0,g=0,_=0,b=0,y=0,S=0,E=0,R=0;c.sort(ty);for(let w=0,L=c.length;w<L;w++){const C=c[w],F=C.color,H=C.intensity,X=C.distance;let V=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===nr?V=C.shadow.map.texture:V=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=F.r*H,d+=F.g*H,u+=F.b*H;else if(C.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(C.sh.coefficients[k],H);R++}else if(C.isDirectionalLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const O=C.shadow,ie=t.get(C);ie.shadowIntensity=O.intensity,ie.shadowBias=O.bias,ie.shadowNormalBias=O.normalBias,ie.shadowRadius=O.radius,ie.shadowMapSize=O.mapSize,i.directionalShadow[f]=ie,i.directionalShadowMap[f]=V,i.directionalShadowMatrix[f]=C.shadow.matrix,_++}i.directional[f]=k,f++}else if(C.isSpotLight){const k=e.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(F).multiplyScalar(H),k.distance=X,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,i.spot[v]=k;const O=C.shadow;if(C.map&&(i.spotLightMap[S]=C.map,S++,O.updateMatrices(C),C.castShadow&&E++),i.spotLightMatrix[v]=O.matrix,C.castShadow){const ie=t.get(C);ie.shadowIntensity=O.intensity,ie.shadowBias=O.bias,ie.shadowNormalBias=O.normalBias,ie.shadowRadius=O.radius,ie.shadowMapSize=O.mapSize,i.spotShadow[v]=ie,i.spotShadowMap[v]=V,y++}v++}else if(C.isRectAreaLight){const k=e.get(C);k.color.copy(F).multiplyScalar(H),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),i.rectArea[p]=k,p++}else if(C.isPointLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity),k.distance=C.distance,k.decay=C.decay,C.castShadow){const O=C.shadow,ie=t.get(C);ie.shadowIntensity=O.intensity,ie.shadowBias=O.bias,ie.shadowNormalBias=O.normalBias,ie.shadowRadius=O.radius,ie.shadowMapSize=O.mapSize,ie.shadowCameraNear=O.camera.near,ie.shadowCameraFar=O.camera.far,i.pointShadow[m]=ie,i.pointShadowMap[m]=V,i.pointShadowMatrix[m]=C.shadow.matrix,b++}i.point[m]=k,m++}else if(C.isHemisphereLight){const k=e.get(C);k.skyColor.copy(C.color).multiplyScalar(H),k.groundColor.copy(C.groundColor).multiplyScalar(H),i.hemi[g]=k,g++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==f||x.pointLength!==m||x.spotLength!==v||x.rectAreaLength!==p||x.hemiLength!==g||x.numDirectionalShadows!==_||x.numPointShadows!==b||x.numSpotShadows!==y||x.numSpotMaps!==S||x.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=p,i.point.length=m,i.hemi.length=g,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=y+S-E,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,x.directionalLength=f,x.pointLength=m,x.spotLength=v,x.rectAreaLength=p,x.hemiLength=g,x.numDirectionalShadows=_,x.numPointShadows=b,x.numSpotShadows=y,x.numSpotMaps=S,x.numLightProbes=R,i.version=ey++)}function l(c,h){let d=0,u=0,f=0,m=0,v=0;const p=h.matrixWorldInverse;for(let g=0,_=c.length;g<_;g++){const b=c[g];if(b.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),d++}else if(b.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),f++}else if(b.isRectAreaLight){const y=i.rectArea[m];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(b.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),u++}else if(b.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:i}}function zd(n){const e=new iy(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function ny(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new zd(n),e.set(s,[o])):r>=a.length?(o=new zd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const sy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ry=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ay=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],oy=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Gd=new ke,Lr=new P,ql=new P;function ly(n,e,t){let i=new ua;const s=new De,r=new De,a=new Mt,o=new mp,l=new qg,c={},h=t.maxTextureSize,d={[Zi]:Jt,[Jt]:Zi,[zi]:zi},u=new Ut({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:sy,fragmentShader:ry}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new mi;m.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new nt(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oo;let g=this.type;this.render=function(E,R,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===Wf&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=oo);const w=n.getRenderTarget(),L=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Gt),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const H=g!==this.type;H&&R.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(V=>V.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,V=E.length;X<V;X++){const k=E[X],O=k.shadow;if(O===void 0){Re("WebGLShadowMap:",k,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const ie=O.getFrameExtents();s.multiply(ie),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,O.mapSize.y=r.y));const Z=n.state.buffers.depth.getReversed();if(O.camera._reversedDepth=Z,O.map===null||H===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Hr){if(k.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new jt(s.x,s.y,{format:nr,type:ei,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),O.map.texture.name=k.name+".shadowMap",O.map.depthTexture=new rr(s.x,s.y,ui),O.map.depthTexture.name=k.name+".shadowMapDepth",O.map.depthTexture.format=fn,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=bt,O.map.depthTexture.magFilter=bt}else k.isPointLight?(O.map=new Mp(s.x),O.map.depthTexture=new kg(s.x,Qi)):(O.map=new jt(s.x,s.y),O.map.depthTexture=new rr(s.x,s.y,Qi)),O.map.depthTexture.name=k.name+".shadowMap",O.map.depthTexture.format=fn,this.type===oo?(O.map.depthTexture.compareFunction=Z?zh:Vh,O.map.depthTexture.minFilter=Nt,O.map.depthTexture.magFilter=Nt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=bt,O.map.depthTexture.magFilter=bt);O.camera.updateProjectionMatrix()}const ce=O.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<ce;de++){if(O.map.isWebGLCubeRenderTarget)n.setRenderTarget(O.map,de),n.clear();else{de===0&&(n.setRenderTarget(O.map),n.clear());const ue=O.getViewport(de);a.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),F.viewport(a)}if(k.isPointLight){const ue=O.camera,Ne=O.matrix,tt=k.distance||ue.far;tt!==ue.far&&(ue.far=tt,ue.updateProjectionMatrix()),Lr.setFromMatrixPosition(k.matrixWorld),ue.position.copy(Lr),ql.copy(ue.position),ql.add(ay[de]),ue.up.copy(oy[de]),ue.lookAt(ql),ue.updateMatrixWorld(),Ne.makeTranslation(-Lr.x,-Lr.y,-Lr.z),Gd.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Gd,ue.coordinateSystem,ue.reversedDepth)}else O.updateMatrices(k);i=O.getFrustum(),y(R,x,O.camera,k,this.type)}O.isPointLightShadow!==!0&&this.type===Hr&&_(O,x),O.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(w,L,C)};function _(E,R){const x=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new jt(s.x,s.y,{format:nr,type:ei})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,x,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,x,f,v,null)}function b(E,R,x,w){let L=null;const C=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)L=C;else if(L=x.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=L.uuid,H=R.uuid;let X=c[F];X===void 0&&(X={},c[F]=X);let V=X[H];V===void 0&&(V=L.clone(),X[H]=V,R.addEventListener("dispose",S)),L=V}if(L.visible=R.visible,L.wireframe=R.wireframe,w===Hr?L.side=R.shadowSide!==null?R.shadowSide:R.side:L.side=R.shadowSide!==null?R.shadowSide:d[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,x.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const F=n.properties.get(L);F.light=x}return L}function y(E,R,x,w,L){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===Hr)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const H=e.update(E),X=E.material;if(Array.isArray(X)){const V=H.groups;for(let k=0,O=V.length;k<O;k++){const ie=V[k],Z=X[ie.materialIndex];if(Z&&Z.visible){const ce=b(E,Z,w,L);E.onBeforeShadow(n,E,R,x,H,ce,ie),n.renderBufferDirect(x,null,H,ce,E,ie),E.onAfterShadow(n,E,R,x,H,ce,ie)}}}else if(X.visible){const V=b(E,X,w,L);E.onBeforeShadow(n,E,R,x,H,V,null),n.renderBufferDirect(x,null,H,V,E,null),E.onAfterShadow(n,E,R,x,H,V,null)}}const F=E.children;for(let H=0,X=F.length;H<X;H++)y(F[H],R,x,w,L)}function S(E){E.target.removeEventListener("dispose",S);for(const x in c){const w=c[x],L=E.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function cy(n,e){function t(){let I=!1;const le=new Mt;let re=null;const Me=new Mt(0,0,0,0);return{setMask:function(ae){re!==ae&&!I&&(n.colorMask(ae,ae,ae,ae),re=ae)},setLocked:function(ae){I=ae},setClear:function(ae,j,Se,Ve,_t){_t===!0&&(ae*=Ve,j*=Ve,Se*=Ve),le.set(ae,j,Se,Ve),Me.equals(le)===!1&&(n.clearColor(ae,j,Se,Ve),Me.copy(le))},reset:function(){I=!1,re=null,Me.set(-1,0,0,0)}}}function i(){let I=!1,le=!1,re=null,Me=null,ae=null;return{setReversed:function(j){if(le!==j){const Se=e.get("EXT_clip_control");j?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT),le=j;const Ve=ae;ae=null,this.setClear(Ve)}},getReversed:function(){return le},setTest:function(j){j?ne(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(j){re!==j&&!I&&(n.depthMask(j),re=j)},setFunc:function(j){if(le&&(j=jm[j]),Me!==j){switch(j){case hc:n.depthFunc(n.NEVER);break;case uc:n.depthFunc(n.ALWAYS);break;case dc:n.depthFunc(n.LESS);break;case er:n.depthFunc(n.LEQUAL);break;case fc:n.depthFunc(n.EQUAL);break;case pc:n.depthFunc(n.GEQUAL);break;case mc:n.depthFunc(n.GREATER);break;case gc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Me=j}},setLocked:function(j){I=j},setClear:function(j){ae!==j&&(ae=j,le&&(j=1-j),n.clearDepth(j))},reset:function(){I=!1,re=null,Me=null,ae=null,le=!1}}}function s(){let I=!1,le=null,re=null,Me=null,ae=null,j=null,Se=null,Ve=null,_t=null;return{setTest:function(ct){I||(ct?ne(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(ct){le!==ct&&!I&&(n.stencilMask(ct),le=ct)},setFunc:function(ct,$i,en){(re!==ct||Me!==$i||ae!==en)&&(n.stencilFunc(ct,$i,en),re=ct,Me=$i,ae=en)},setOp:function(ct,$i,en){(j!==ct||Se!==$i||Ve!==en)&&(n.stencilOp(ct,$i,en),j=ct,Se=$i,Ve=en)},setLocked:function(ct){I=ct},setClear:function(ct){_t!==ct&&(n.clearStencil(ct),_t=ct)},reset:function(){I=!1,le=null,re=null,Me=null,ae=null,j=null,Se=null,Ve=null,_t=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],m=null,v=!1,p=null,g=null,_=null,b=null,y=null,S=null,E=null,R=new Te(0,0,0),x=0,w=!1,L=null,C=null,F=null,H=null,X=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,O=0;const ie=n.getParameter(n.VERSION);ie.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(ie)[1]),k=O>=1):ie.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),k=O>=2);let Z=null,ce={};const de=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Ne=new Mt().fromArray(de),tt=new Mt().fromArray(ue);function Je(I,le,re,Me){const ae=new Uint8Array(4),j=n.createTexture();n.bindTexture(I,j),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Se=0;Se<re;Se++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,Me,0,n.RGBA,n.UNSIGNED_BYTE,ae):n.texImage2D(le+Se,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ae);return j}const Q={};Q[n.TEXTURE_2D]=Je(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=Je(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=Je(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=Je(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(er),He(!1),dt(Eu),ne(n.CULL_FACE),Ye(Gt);function ne(I){h[I]!==!0&&(n.enable(I),h[I]=!0)}function se(I){h[I]!==!1&&(n.disable(I),h[I]=!1)}function be(I,le){return d[I]!==le?(n.bindFramebuffer(I,le),d[I]=le,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=le),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=le),!0):!1}function ye(I,le){let re=f,Me=!1;if(I){re=u.get(le),re===void 0&&(re=[],u.set(le,re));const ae=I.textures;if(re.length!==ae.length||re[0]!==n.COLOR_ATTACHMENT0){for(let j=0,Se=ae.length;j<Se;j++)re[j]=n.COLOR_ATTACHMENT0+j;re.length=ae.length,Me=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,Me=!0);Me&&n.drawBuffers(re)}function Le(I){return m!==I?(n.useProgram(I),m=I,!0):!1}const St={[Gi]:n.FUNC_ADD,[vm]:n.FUNC_SUBTRACT,[Am]:n.FUNC_REVERSE_SUBTRACT};St[xm]=n.MIN,St[_m]=n.MAX;const Ge={[cc]:n.ZERO,[Xf]:n.ONE,[ym]:n.SRC_COLOR,[yo]:n.SRC_ALPHA,[wm]:n.SRC_ALPHA_SATURATE,[Yf]:n.DST_COLOR,[qf]:n.DST_ALPHA,[Mm]:n.ONE_MINUS_SRC_COLOR,[Zr]:n.ONE_MINUS_SRC_ALPHA,[Sm]:n.ONE_MINUS_DST_COLOR,[bm]:n.ONE_MINUS_DST_ALPHA,[Em]:n.CONSTANT_COLOR,[Tm]:n.ONE_MINUS_CONSTANT_COLOR,[Cm]:n.CONSTANT_ALPHA,[Rm]:n.ONE_MINUS_CONSTANT_ALPHA};function Ye(I,le,re,Me,ae,j,Se,Ve,_t,ct){if(I===Gt){v===!0&&(se(n.BLEND),v=!1);return}if(v===!1&&(ne(n.BLEND),v=!0),I!==Th){if(I!==p||ct!==w){if((g!==Gi||y!==Gi)&&(n.blendEquation(n.FUNC_ADD),g=Gi,y=Gi),ct)switch(I){case Ys:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tu:n.blendFunc(n.ONE,n.ONE);break;case Cu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ru:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ue("WebGLState: Invalid blending: ",I);break}else switch(I){case Ys:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Tu:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Cu:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ru:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",I);break}_=null,b=null,S=null,E=null,R.set(0,0,0),x=0,p=I,w=ct}return}ae=ae||le,j=j||re,Se=Se||Me,(le!==g||ae!==y)&&(n.blendEquationSeparate(St[le],St[ae]),g=le,y=ae),(re!==_||Me!==b||j!==S||Se!==E)&&(n.blendFuncSeparate(Ge[re],Ge[Me],Ge[j],Ge[Se]),_=re,b=Me,S=j,E=Se),(Ve.equals(R)===!1||_t!==x)&&(n.blendColor(Ve.r,Ve.g,Ve.b,_t),R.copy(Ve),x=_t),p=I,w=!1}function it(I,le){I.side===zi?se(n.CULL_FACE):ne(n.CULL_FACE);let re=I.side===Jt;le&&(re=!re),He(re),I.blending===Ys&&I.transparent===!1?Ye(Gt):Ye(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const Me=I.stencilWrite;o.setTest(Me),Me&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),xt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(I){L!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),L=I)}function dt(I){I!==mm?(ne(n.CULL_FACE),I!==C&&(I===Eu?n.cullFace(n.BACK):I===gm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),C=I}function D(I){I!==F&&(k&&n.lineWidth(I),F=I)}function xt(I,le,re){I?(ne(n.POLYGON_OFFSET_FILL),(H!==le||X!==re)&&(H=le,X=re,a.getReversed()&&(le=-le),n.polygonOffset(le,re))):se(n.POLYGON_OFFSET_FILL)}function $e(I){I?ne(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function rt(I){I===void 0&&(I=n.TEXTURE0+V-1),Z!==I&&(n.activeTexture(I),Z=I)}function xe(I,le,re){re===void 0&&(Z===null?re=n.TEXTURE0+V-1:re=Z);let Me=ce[re];Me===void 0&&(Me={type:void 0,texture:void 0},ce[re]=Me),(Me.type!==I||Me.texture!==le)&&(Z!==re&&(n.activeTexture(re),Z=re),n.bindTexture(I,le||Q[I]),Me.type=I,Me.texture=le)}function T(){const I=ce[Z];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function A(){try{n.compressedTexImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function K(){try{n.texSubImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function ee(){try{n.texSubImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function pe(){try{n.compressedTexSubImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function N(){try{n.texStorage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function G(){try{n.texStorage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function oe(){try{n.texImage2D(...arguments)}catch(I){Ue("WebGLState:",I)}}function J(){try{n.texImage3D(...arguments)}catch(I){Ue("WebGLState:",I)}}function te(I){Ne.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Ne.copy(I))}function fe(I){tt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),tt.copy(I))}function me(I,le){let re=c.get(le);re===void 0&&(re=new WeakMap,c.set(le,re));let Me=re.get(I);Me===void 0&&(Me=n.getUniformBlockIndex(le,I.name),re.set(I,Me))}function he(I,le){const Me=c.get(le).get(I);l.get(le)!==Me&&(n.uniformBlockBinding(le,Me,I.__bindingPointIndex),l.set(le,Me))}function Oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Z=null,ce={},d={},u=new WeakMap,f=[],m=null,v=!1,p=null,g=null,_=null,b=null,y=null,S=null,E=null,R=new Te(0,0,0),x=0,w=!1,L=null,C=null,F=null,H=null,X=null,Ne.set(0,0,n.canvas.width,n.canvas.height),tt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:se,bindFramebuffer:be,drawBuffers:ye,useProgram:Le,setBlending:Ye,setMaterial:it,setFlipSided:He,setCullFace:dt,setLineWidth:D,setPolygonOffset:xt,setScissorTest:$e,activeTexture:rt,bindTexture:xe,unbindTexture:T,compressedTexImage2D:A,compressedTexImage3D:U,texImage2D:oe,texImage3D:J,updateUBOMapping:me,uniformBlockBinding:he,texStorage2D:N,texStorage3D:G,texSubImage2D:K,texSubImage3D:ee,compressedTexSubImage2D:q,compressedTexSubImage3D:pe,scissor:te,viewport:fe,reset:Oe}}function hy(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new De,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,A){return f?new OffscreenCanvas(T,A):ea("canvas")}function v(T,A,U){let K=1;const ee=xe(T);if((ee.width>U||ee.height>U)&&(K=U/Math.max(ee.width,ee.height)),K<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor(K*ee.width),pe=Math.floor(K*ee.height);d===void 0&&(d=m(q,pe));const N=A?m(q,pe):d;return N.width=q,N.height=pe,N.getContext("2d").drawImage(T,0,0,q,pe),Re("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+pe+")."),N}else return"data"in T&&Re("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),T;return T}function p(T){return T.generateMipmaps}function g(T){n.generateMipmap(T)}function _(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,A,U,K,ee=!1){if(T!==null){if(n[T]!==void 0)return n[T];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=A;if(A===n.RED&&(U===n.FLOAT&&(q=n.R32F),U===n.HALF_FLOAT&&(q=n.R16F),U===n.UNSIGNED_BYTE&&(q=n.R8)),A===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.R8UI),U===n.UNSIGNED_SHORT&&(q=n.R16UI),U===n.UNSIGNED_INT&&(q=n.R32UI),U===n.BYTE&&(q=n.R8I),U===n.SHORT&&(q=n.R16I),U===n.INT&&(q=n.R32I)),A===n.RG&&(U===n.FLOAT&&(q=n.RG32F),U===n.HALF_FLOAT&&(q=n.RG16F),U===n.UNSIGNED_BYTE&&(q=n.RG8)),A===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.RG8UI),U===n.UNSIGNED_SHORT&&(q=n.RG16UI),U===n.UNSIGNED_INT&&(q=n.RG32UI),U===n.BYTE&&(q=n.RG8I),U===n.SHORT&&(q=n.RG16I),U===n.INT&&(q=n.RG32I)),A===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.RGB8UI),U===n.UNSIGNED_SHORT&&(q=n.RGB16UI),U===n.UNSIGNED_INT&&(q=n.RGB32UI),U===n.BYTE&&(q=n.RGB8I),U===n.SHORT&&(q=n.RGB16I),U===n.INT&&(q=n.RGB32I)),A===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),U===n.UNSIGNED_INT&&(q=n.RGBA32UI),U===n.BYTE&&(q=n.RGBA8I),U===n.SHORT&&(q=n.RGBA16I),U===n.INT&&(q=n.RGBA32I)),A===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),A===n.RGBA){const pe=ee?bo:et.getTransfer(K);U===n.FLOAT&&(q=n.RGBA32F),U===n.HALF_FLOAT&&(q=n.RGBA16F),U===n.UNSIGNED_BYTE&&(q=pe===lt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function y(T,A){let U;return T?A===null||A===Qi||A===ir?U=n.DEPTH24_STENCIL8:A===ui?U=n.DEPTH32F_STENCIL8:A===Qr&&(U=n.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Qi||A===ir?U=n.DEPTH_COMPONENT24:A===ui?U=n.DEPTH_COMPONENT32F:A===Qr&&(U=n.DEPTH_COMPONENT16),U}function S(T,A){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==bt&&T.minFilter!==Nt?Math.log2(Math.max(A.width,A.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?A.mipmaps.length:1}function E(T){const A=T.target;A.removeEventListener("dispose",E),x(A),A.isVideoTexture&&h.delete(A)}function R(T){const A=T.target;A.removeEventListener("dispose",R),L(A)}function x(T){const A=i.get(T);if(A.__webglInit===void 0)return;const U=T.source,K=u.get(U);if(K){const ee=K[A.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(T),Object.keys(K).length===0&&u.delete(U)}i.remove(T)}function w(T){const A=i.get(T);n.deleteTexture(A.__webglTexture);const U=T.source,K=u.get(U);delete K[A.__cacheKey],a.memory.textures--}function L(T){const A=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(A.__webglFramebuffer[K]))for(let ee=0;ee<A.__webglFramebuffer[K].length;ee++)n.deleteFramebuffer(A.__webglFramebuffer[K][ee]);else n.deleteFramebuffer(A.__webglFramebuffer[K]);A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer[K])}else{if(Array.isArray(A.__webglFramebuffer))for(let K=0;K<A.__webglFramebuffer.length;K++)n.deleteFramebuffer(A.__webglFramebuffer[K]);else n.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&n.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let K=0;K<A.__webglColorRenderbuffer.length;K++)A.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(A.__webglColorRenderbuffer[K]);A.__webglDepthRenderbuffer&&n.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const U=T.textures;for(let K=0,ee=U.length;K<ee;K++){const q=i.get(U[K]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),a.memory.textures--),i.remove(U[K])}i.remove(T)}let C=0;function F(){C=0}function H(){const T=C;return T>=s.maxTextures&&Re("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),C+=1,T}function X(T){const A=[];return A.push(T.wrapS),A.push(T.wrapT),A.push(T.wrapR||0),A.push(T.magFilter),A.push(T.minFilter),A.push(T.anisotropy),A.push(T.internalFormat),A.push(T.format),A.push(T.type),A.push(T.generateMipmaps),A.push(T.premultiplyAlpha),A.push(T.flipY),A.push(T.unpackAlignment),A.push(T.colorSpace),A.join()}function V(T,A){const U=i.get(T);if(T.isVideoTexture&&$e(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&U.__version!==T.version){const K=T.image;if(K===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(U,T,A);return}}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+A)}function k(T,A){const U=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){Q(U,T,A);return}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+A)}function O(T,A){const U=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){Q(U,T,A);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+A)}function ie(T,A){const U=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&U.__version!==T.version){ne(U,T,A);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+A)}const Z={[Un]:n.REPEAT,[Wi]:n.CLAMP_TO_EDGE,[Mo]:n.MIRRORED_REPEAT},ce={[bt]:n.NEAREST,[Zf]:n.NEAREST_MIPMAP_NEAREST,[kr]:n.NEAREST_MIPMAP_LINEAR,[Nt]:n.LINEAR,[lo]:n.LINEAR_MIPMAP_NEAREST,[cn]:n.LINEAR_MIPMAP_LINEAR},de={[Bm]:n.NEVER,[Gm]:n.ALWAYS,[Hm]:n.LESS,[Vh]:n.LEQUAL,[km]:n.EQUAL,[zh]:n.GEQUAL,[Vm]:n.GREATER,[zm]:n.NOTEQUAL};function ue(T,A){if(A.type===ui&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Nt||A.magFilter===lo||A.magFilter===kr||A.magFilter===cn||A.minFilter===Nt||A.minFilter===lo||A.minFilter===kr||A.minFilter===cn)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Z[A.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Z[A.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Z[A.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ce[A.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ce[A.minFilter]),A.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,de[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===bt||A.minFilter!==kr&&A.minFilter!==cn||A.type===ui&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function Ne(T,A){let U=!1;T.__webglInit===void 0&&(T.__webglInit=!0,A.addEventListener("dispose",E));const K=A.source;let ee=u.get(K);ee===void 0&&(ee={},u.set(K,ee));const q=X(A);if(q!==T.__cacheKey){ee[q]===void 0&&(ee[q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,U=!0),ee[q].usedTimes++;const pe=ee[T.__cacheKey];pe!==void 0&&(ee[T.__cacheKey].usedTimes--,pe.usedTimes===0&&w(A)),T.__cacheKey=q,T.__webglTexture=ee[q].texture}return U}function tt(T,A,U){return Math.floor(Math.floor(T/U)/A)}function Je(T,A,U,K){const q=T.updateRanges;if(q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,A.width,A.height,U,K,A.data);else{q.sort((J,te)=>J.start-te.start);let pe=0;for(let J=1;J<q.length;J++){const te=q[pe],fe=q[J],me=te.start+te.count,he=tt(fe.start,A.width,4),Oe=tt(te.start,A.width,4);fe.start<=me+1&&he===Oe&&tt(fe.start+fe.count-1,A.width,4)===he?te.count=Math.max(te.count,fe.start+fe.count-te.start):(++pe,q[pe]=fe)}q.length=pe+1;const N=n.getParameter(n.UNPACK_ROW_LENGTH),G=n.getParameter(n.UNPACK_SKIP_PIXELS),oe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,A.width);for(let J=0,te=q.length;J<te;J++){const fe=q[J],me=Math.floor(fe.start/4),he=Math.ceil(fe.count/4),Oe=me%A.width,I=Math.floor(me/A.width),le=he,re=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Oe),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,Oe,I,le,re,U,K,A.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,N),n.pixelStorei(n.UNPACK_SKIP_PIXELS,G),n.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function Q(T,A,U){let K=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(K=n.TEXTURE_3D);const ee=Ne(T,A),q=A.source;t.bindTexture(K,T.__webglTexture,n.TEXTURE0+U);const pe=i.get(q);if(q.version!==pe.__version||ee===!0){t.activeTexture(n.TEXTURE0+U);const N=et.getPrimaries(et.workingColorSpace),G=A.colorSpace===En?null:et.getPrimaries(A.colorSpace),oe=A.colorSpace===En||N===G?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let J=v(A.image,!1,s.maxTextureSize);J=rt(A,J);const te=r.convert(A.format,A.colorSpace),fe=r.convert(A.type);let me=b(A.internalFormat,te,fe,A.colorSpace,A.isVideoTexture);ue(K,A);let he;const Oe=A.mipmaps,I=A.isVideoTexture!==!0,le=pe.__version===void 0||ee===!0,re=q.dataReady,Me=S(A,J);if(A.isDepthTexture)me=y(A.format===Pn,A.type),le&&(I?t.texStorage2D(n.TEXTURE_2D,1,me,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,me,J.width,J.height,0,te,fe,null));else if(A.isDataTexture)if(Oe.length>0){I&&le&&t.texStorage2D(n.TEXTURE_2D,Me,me,Oe[0].width,Oe[0].height);for(let ae=0,j=Oe.length;ae<j;ae++)he=Oe[ae],I?re&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,he.width,he.height,te,fe,he.data):t.texImage2D(n.TEXTURE_2D,ae,me,he.width,he.height,0,te,fe,he.data);A.generateMipmaps=!1}else I?(le&&t.texStorage2D(n.TEXTURE_2D,Me,me,J.width,J.height),re&&Je(A,J,te,fe)):t.texImage2D(n.TEXTURE_2D,0,me,J.width,J.height,0,te,fe,J.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){I&&le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,me,Oe[0].width,Oe[0].height,J.depth);for(let ae=0,j=Oe.length;ae<j;ae++)if(he=Oe[ae],A.format!==Mi)if(te!==null)if(I){if(re)if(A.layerUpdates.size>0){const Se=yd(he.width,he.height,A.format,A.type);for(const Ve of A.layerUpdates){const _t=he.data.subarray(Ve*Se/he.data.BYTES_PER_ELEMENT,(Ve+1)*Se/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,Ve,he.width,he.height,1,te,_t)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,he.width,he.height,J.depth,te,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,me,he.width,he.height,J.depth,0,he.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?re&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,he.width,he.height,J.depth,te,fe,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,me,he.width,he.height,J.depth,0,te,fe,he.data)}else{I&&le&&t.texStorage2D(n.TEXTURE_2D,Me,me,Oe[0].width,Oe[0].height);for(let ae=0,j=Oe.length;ae<j;ae++)he=Oe[ae],A.format!==Mi?te!==null?I?re&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,he.width,he.height,te,he.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,me,he.width,he.height,0,he.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?re&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,he.width,he.height,te,fe,he.data):t.texImage2D(n.TEXTURE_2D,ae,me,he.width,he.height,0,te,fe,he.data)}else if(A.isDataArrayTexture)if(I){if(le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,me,J.width,J.height,J.depth),re)if(A.layerUpdates.size>0){const ae=yd(J.width,J.height,A.format,A.type);for(const j of A.layerUpdates){const Se=J.data.subarray(j*ae/J.data.BYTES_PER_ELEMENT,(j+1)*ae/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,J.width,J.height,1,te,fe,Se)}A.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,te,fe,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,J.width,J.height,J.depth,0,te,fe,J.data);else if(A.isData3DTexture)I?(le&&t.texStorage3D(n.TEXTURE_3D,Me,me,J.width,J.height,J.depth),re&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,te,fe,J.data)):t.texImage3D(n.TEXTURE_3D,0,me,J.width,J.height,J.depth,0,te,fe,J.data);else if(A.isFramebufferTexture){if(le)if(I)t.texStorage2D(n.TEXTURE_2D,Me,me,J.width,J.height);else{let ae=J.width,j=J.height;for(let Se=0;Se<Me;Se++)t.texImage2D(n.TEXTURE_2D,Se,me,ae,j,0,te,fe,null),ae>>=1,j>>=1}}else if(Oe.length>0){if(I&&le){const ae=xe(Oe[0]);t.texStorage2D(n.TEXTURE_2D,Me,me,ae.width,ae.height)}for(let ae=0,j=Oe.length;ae<j;ae++)he=Oe[ae],I?re&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,te,fe,he):t.texImage2D(n.TEXTURE_2D,ae,me,te,fe,he);A.generateMipmaps=!1}else if(I){if(le){const ae=xe(J);t.texStorage2D(n.TEXTURE_2D,Me,me,ae.width,ae.height)}re&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te,fe,J)}else t.texImage2D(n.TEXTURE_2D,0,me,te,fe,J);p(A)&&g(K),pe.__version=q.version,A.onUpdate&&A.onUpdate(A)}T.__version=A.version}function ne(T,A,U){if(A.image.length!==6)return;const K=Ne(T,A),ee=A.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+U);const q=i.get(ee);if(ee.version!==q.__version||K===!0){t.activeTexture(n.TEXTURE0+U);const pe=et.getPrimaries(et.workingColorSpace),N=A.colorSpace===En?null:et.getPrimaries(A.colorSpace),G=A.colorSpace===En||pe===N?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);const oe=A.isCompressedTexture||A.image[0].isCompressedTexture,J=A.image[0]&&A.image[0].isDataTexture,te=[];for(let j=0;j<6;j++)!oe&&!J?te[j]=v(A.image[j],!0,s.maxCubemapSize):te[j]=J?A.image[j].image:A.image[j],te[j]=rt(A,te[j]);const fe=te[0],me=r.convert(A.format,A.colorSpace),he=r.convert(A.type),Oe=b(A.internalFormat,me,he,A.colorSpace),I=A.isVideoTexture!==!0,le=q.__version===void 0||K===!0,re=ee.dataReady;let Me=S(A,fe);ue(n.TEXTURE_CUBE_MAP,A);let ae;if(oe){I&&le&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,Oe,fe.width,fe.height);for(let j=0;j<6;j++){ae=te[j].mipmaps;for(let Se=0;Se<ae.length;Se++){const Ve=ae[Se];A.format!==Mi?me!==null?I?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se,0,0,Ve.width,Ve.height,me,Ve.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se,Oe,Ve.width,Ve.height,0,Ve.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se,0,0,Ve.width,Ve.height,me,he,Ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se,Oe,Ve.width,Ve.height,0,me,he,Ve.data)}}}else{if(ae=A.mipmaps,I&&le){ae.length>0&&Me++;const j=xe(te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,Oe,j.width,j.height)}for(let j=0;j<6;j++)if(J){I?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,te[j].width,te[j].height,me,he,te[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Oe,te[j].width,te[j].height,0,me,he,te[j].data);for(let Se=0;Se<ae.length;Se++){const _t=ae[Se].image[j].image;I?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se+1,0,0,_t.width,_t.height,me,he,_t.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se+1,Oe,_t.width,_t.height,0,me,he,_t.data)}}else{I?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,me,he,te[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Oe,me,he,te[j]);for(let Se=0;Se<ae.length;Se++){const Ve=ae[Se];I?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se+1,0,0,me,he,Ve.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,Se+1,Oe,me,he,Ve.image[j])}}}p(A)&&g(n.TEXTURE_CUBE_MAP),q.__version=ee.version,A.onUpdate&&A.onUpdate(A)}T.__version=A.version}function se(T,A,U,K,ee,q){const pe=r.convert(U.format,U.colorSpace),N=r.convert(U.type),G=b(U.internalFormat,pe,N,U.colorSpace),oe=i.get(A),J=i.get(U);if(J.__renderTarget=A,!oe.__hasExternalTextures){const te=Math.max(1,A.width>>q),fe=Math.max(1,A.height>>q);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,q,G,te,fe,A.depth,0,pe,N,null):t.texImage2D(ee,q,G,te,fe,0,pe,N,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),xt(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,ee,J.__webglTexture,0,D(A)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,ee,J.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function be(T,A,U){if(n.bindRenderbuffer(n.RENDERBUFFER,T),A.depthBuffer){const K=A.depthTexture,ee=K&&K.isDepthTexture?K.type:null,q=y(A.stencilBuffer,ee),pe=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;xt(A)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,D(A),q,A.width,A.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,D(A),q,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,q,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,T)}else{const K=A.textures;for(let ee=0;ee<K.length;ee++){const q=K[ee],pe=r.convert(q.format,q.colorSpace),N=r.convert(q.type),G=b(q.internalFormat,pe,N,q.colorSpace);xt(A)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,D(A),G,A.width,A.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,D(A),G,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,G,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(T,A,U){const K=A.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=i.get(A.depthTexture);if(ee.__renderTarget=A,(!ee.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),K){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,A.depthTexture.addEventListener("dispose",E)),ee.__webglTexture===void 0){ee.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),ue(n.TEXTURE_CUBE_MAP,A.depthTexture);const oe=r.convert(A.depthTexture.format),J=r.convert(A.depthTexture.type);let te;A.depthTexture.format===fn?te=n.DEPTH_COMPONENT24:A.depthTexture.format===Pn&&(te=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,te,A.width,A.height,0,oe,J,null)}}else V(A.depthTexture,0);const q=ee.__webglTexture,pe=D(A),N=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,G=A.depthTexture.format===Pn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(A.depthTexture.format===fn)xt(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,N,q,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,G,N,q,0);else if(A.depthTexture.format===Pn)xt(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,N,q,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,G,N,q,0);else throw new Error("Unknown depthTexture format")}function Le(T){const A=i.get(T),U=T.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==T.depthTexture){const K=T.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),K){const ee=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,K.removeEventListener("dispose",ee)};K.addEventListener("dispose",ee),A.__depthDisposeCallback=ee}A.__boundDepthTexture=K}if(T.depthTexture&&!A.__autoAllocateDepthBuffer)if(U)for(let K=0;K<6;K++)ye(A.__webglFramebuffer[K],T,K);else{const K=T.texture.mipmaps;K&&K.length>0?ye(A.__webglFramebuffer[0],T,0):ye(A.__webglFramebuffer,T,0)}else if(U){A.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[K]),A.__webglDepthbuffer[K]===void 0)A.__webglDepthbuffer[K]=n.createRenderbuffer(),be(A.__webglDepthbuffer[K],T,!1);else{const ee=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=A.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,q)}}else{const K=T.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=n.createRenderbuffer(),be(A.__webglDepthbuffer,T,!1);else{const ee=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=A.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function St(T,A,U){const K=i.get(T);A!==void 0&&se(K.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Le(T)}function Ge(T){const A=T.texture,U=i.get(T),K=i.get(A);T.addEventListener("dispose",R);const ee=T.textures,q=T.isWebGLCubeRenderTarget===!0,pe=ee.length>1;if(pe||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=A.version,a.memory.textures++),q){U.__webglFramebuffer=[];for(let N=0;N<6;N++)if(A.mipmaps&&A.mipmaps.length>0){U.__webglFramebuffer[N]=[];for(let G=0;G<A.mipmaps.length;G++)U.__webglFramebuffer[N][G]=n.createFramebuffer()}else U.__webglFramebuffer[N]=n.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){U.__webglFramebuffer=[];for(let N=0;N<A.mipmaps.length;N++)U.__webglFramebuffer[N]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(pe)for(let N=0,G=ee.length;N<G;N++){const oe=i.get(ee[N]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&xt(T)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let N=0;N<ee.length;N++){const G=ee[N];U.__webglColorRenderbuffer[N]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[N]);const oe=r.convert(G.format,G.colorSpace),J=r.convert(G.type),te=b(G.internalFormat,oe,J,G.colorSpace,T.isXRRenderTarget===!0),fe=D(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,te,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+N,n.RENDERBUFFER,U.__webglColorRenderbuffer[N])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),be(U.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),ue(n.TEXTURE_CUBE_MAP,A);for(let N=0;N<6;N++)if(A.mipmaps&&A.mipmaps.length>0)for(let G=0;G<A.mipmaps.length;G++)se(U.__webglFramebuffer[N][G],T,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+N,G);else se(U.__webglFramebuffer[N],T,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+N,0);p(A)&&g(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let N=0,G=ee.length;N<G;N++){const oe=ee[N],J=i.get(oe);let te=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(te=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,J.__webglTexture),ue(te,oe),se(U.__webglFramebuffer,T,oe,n.COLOR_ATTACHMENT0+N,te,0),p(oe)&&g(te)}t.unbindTexture()}else{let N=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(N=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(N,K.__webglTexture),ue(N,A),A.mipmaps&&A.mipmaps.length>0)for(let G=0;G<A.mipmaps.length;G++)se(U.__webglFramebuffer[G],T,A,n.COLOR_ATTACHMENT0,N,G);else se(U.__webglFramebuffer,T,A,n.COLOR_ATTACHMENT0,N,0);p(A)&&g(N),t.unbindTexture()}T.depthBuffer&&Le(T)}function Ye(T){const A=T.textures;for(let U=0,K=A.length;U<K;U++){const ee=A[U];if(p(ee)){const q=_(T),pe=i.get(ee).__webglTexture;t.bindTexture(q,pe),g(q),t.unbindTexture()}}}const it=[],He=[];function dt(T){if(T.samples>0){if(xt(T)===!1){const A=T.textures,U=T.width,K=T.height;let ee=n.COLOR_BUFFER_BIT;const q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(T),N=A.length>1;if(N)for(let oe=0;oe<A.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const G=T.texture.mipmaps;G&&G.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let oe=0;oe<A.length;oe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),N){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[oe]);const J=i.get(A[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,U,K,0,0,U,K,ee,n.NEAREST),l===!0&&(it.length=0,He.length=0,it.push(n.COLOR_ATTACHMENT0+oe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(it.push(q),He.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,He)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,it))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),N)for(let oe=0;oe<A.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,pe.__webglColorRenderbuffer[oe]);const J=i.get(A[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,J,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const A=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[A])}}}function D(T){return Math.min(s.maxSamples,T.samples)}function xt(T){const A=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function $e(T){const A=a.render.frame;h.get(T)!==A&&(h.set(T,A),T.update())}function rt(T,A){const U=T.colorSpace,K=T.format,ee=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||U!==ti&&U!==En&&(et.getTransfer(U)===lt?(K!==Mi||ee!==hi)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",U)),A}function xe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=k,this.setTexture3D=O,this.setTextureCube=ie,this.rebindTextures=St,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=se,this.useMultisampledRTT=xt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function uy(n,e){function t(i,s=En){let r;const a=et.getTransfer(s);if(i===hi)return n.UNSIGNED_BYTE;if(i===Oh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$f)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qf)return n.BYTE;if(i===Kf)return n.SHORT;if(i===Qr)return n.UNSIGNED_SHORT;if(i===Uh)return n.INT;if(i===Qi)return n.UNSIGNED_INT;if(i===ui)return n.FLOAT;if(i===ei)return n.HALF_FLOAT;if(i===ep)return n.ALPHA;if(i===tp)return n.RGB;if(i===Mi)return n.RGBA;if(i===fn)return n.DEPTH_COMPONENT;if(i===Pn)return n.DEPTH_STENCIL;if(i===zo)return n.RED;if(i===Bh)return n.RED_INTEGER;if(i===nr)return n.RG;if(i===Hh)return n.RG_INTEGER;if(i===kh)return n.RGBA_INTEGER;if(i===co||i===ho||i===uo||i===fo)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===co)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===co)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===uo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vc||i===Ac||i===xc||i===_c)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ac)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===_c)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yc||i===Mc||i===bc||i===Sc||i===wc||i===Ec||i===Tc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===yc||i===Mc)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===bc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Sc)return r.COMPRESSED_R11_EAC;if(i===wc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ec)return r.COMPRESSED_RG11_EAC;if(i===Tc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Cc||i===Rc||i===Pc||i===Dc||i===Lc||i===Ic||i===Nc||i===Uc||i===Oc||i===Fc||i===Bc||i===Hc||i===kc||i===Vc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Cc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Rc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Dc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Lc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ic)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Nc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Uc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Oc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Bc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Hc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===kc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Vc)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zc||i===Gc||i===Wc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===zc)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Gc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xc||i===qc||i===Yc||i===jc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Xc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===qc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===jc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ir?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const dy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class py{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new dp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ut({vertexShader:dy,fragmentShader:fy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Dn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class my extends ps{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null;const v=typeof XRWebGLBinding<"u",p=new py,g={},_=t.getContextAttributes();let b=null,y=null;const S=[],E=[],R=new De;let x=null;const w=new Wt;w.viewport=new Mt;const L=new Wt;L.viewport=new Mt;const C=[w,L],F=new pv;let H=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ne=S[Q];return ne===void 0&&(ne=new xl,S[Q]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Q){let ne=S[Q];return ne===void 0&&(ne=new xl,S[Q]=ne),ne.getGripSpace()},this.getHand=function(Q){let ne=S[Q];return ne===void 0&&(ne=new xl,S[Q]=ne),ne.getHandSpace()};function V(Q){const ne=E.indexOf(Q.inputSource);if(ne===-1)return;const se=S[ne];se!==void 0&&(se.update(Q.inputSource,Q.frame,c||a),se.dispatchEvent({type:Q.type,data:Q.inputSource}))}function k(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",O);for(let Q=0;Q<S.length;Q++){const ne=E[Q];ne!==null&&(E[Q]=null,S[Q].disconnect(ne))}H=null,X=null,p.reset();for(const Q in g)delete g[Q];e.setRenderTarget(b),f=null,u=null,d=null,s=null,y=null,Je.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",k),s.addEventListener("inputsourceschange",O),_.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,be=null,ye=null;_.depth&&(ye=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?Pn:fn,be=_.stencil?ir:Qi);const Le={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Le),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new jt(u.textureWidth,u.textureHeight,{format:Mi,type:hi,depthTexture:new rr(u.textureWidth,u.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,se),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new jt(f.framebufferWidth,f.framebufferHeight,{format:Mi,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Je.setContext(s),Je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function O(Q){for(let ne=0;ne<Q.removed.length;ne++){const se=Q.removed[ne],be=E.indexOf(se);be>=0&&(E[be]=null,S[be].disconnect(se))}for(let ne=0;ne<Q.added.length;ne++){const se=Q.added[ne];let be=E.indexOf(se);if(be===-1){for(let Le=0;Le<S.length;Le++)if(Le>=E.length){E.push(se),be=Le;break}else if(E[Le]===null){E[Le]=se,be=Le;break}if(be===-1)break}const ye=S[be];ye&&ye.connect(se)}}const ie=new P,Z=new P;function ce(Q,ne,se){ie.setFromMatrixPosition(ne.matrixWorld),Z.setFromMatrixPosition(se.matrixWorld);const be=ie.distanceTo(Z),ye=ne.projectionMatrix.elements,Le=se.projectionMatrix.elements,St=ye[14]/(ye[10]-1),Ge=ye[14]/(ye[10]+1),Ye=(ye[9]+1)/ye[5],it=(ye[9]-1)/ye[5],He=(ye[8]-1)/ye[0],dt=(Le[8]+1)/Le[0],D=St*He,xt=St*dt,$e=be/(-He+dt),rt=$e*-He;if(ne.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(rt),Q.translateZ($e),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),ye[10]===-1)Q.projectionMatrix.copy(ne.projectionMatrix),Q.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const xe=St+$e,T=Ge+$e,A=D-rt,U=xt+(be-rt),K=Ye*Ge/T*xe,ee=it*Ge/T*xe;Q.projectionMatrix.makePerspective(A,U,K,ee,xe,T),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function de(Q,ne){ne===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ne.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ne=Q.near,se=Q.far;p.texture!==null&&(p.depthNear>0&&(ne=p.depthNear),p.depthFar>0&&(se=p.depthFar)),F.near=L.near=w.near=ne,F.far=L.far=w.far=se,(H!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),H=F.near,X=F.far),F.layers.mask=Q.layers.mask|6,w.layers.mask=F.layers.mask&-5,L.layers.mask=F.layers.mask&-3;const be=Q.parent,ye=F.cameras;de(F,be);for(let Le=0;Le<ye.length;Le++)de(ye[Le],be);ye.length===2?ce(F,w,L):F.projectionMatrix.copy(w.projectionMatrix),ue(Q,F,be)};function ue(Q,ne,se){se===null?Q.matrix.copy(ne.matrixWorld):(Q.matrix.copy(se.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ne.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ne.projectionMatrix),Q.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=sr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Q){return g[Q]};let Ne=null;function tt(Q,ne){if(h=ne.getViewerPose(c||a),m=ne,h!==null){const se=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let be=!1;se.length!==F.cameras.length&&(F.cameras.length=0,be=!0);for(let Ge=0;Ge<se.length;Ge++){const Ye=se[Ge];let it=null;if(f!==null)it=f.getViewport(Ye);else{const dt=d.getViewSubImage(u,Ye);it=dt.viewport,Ge===0&&(e.setRenderTargetTextures(y,dt.colorTexture,dt.depthStencilTexture),e.setRenderTarget(y))}let He=C[Ge];He===void 0&&(He=new Wt,He.layers.enable(Ge),He.viewport=new Mt,C[Ge]=He),He.matrix.fromArray(Ye.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Ye.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(it.x,it.y,it.width,it.height),Ge===0&&(F.matrix.copy(He.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),be===!0&&F.cameras.push(He)}const ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const Ge=d.getDepthInformation(se[0]);Ge&&Ge.isValid&&Ge.texture&&p.init(Ge,s.renderState)}if(ye&&ye.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Ge=0;Ge<se.length;Ge++){const Ye=se[Ge].camera;if(Ye){let it=g[Ye];it||(it=new dp,g[Ye]=it);const He=d.getCameraImage(Ye);it.sourceTexture=He}}}}for(let se=0;se<S.length;se++){const be=E[se],ye=S[se];be!==null&&ye!==void 0&&ye.update(be,ne,c||a)}Ne&&Ne(Q,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),m=null}const Je=new yp;Je.setAnimationLoop(tt),this.setAnimationLoop=function(Q){Ne=Q},this.dispose=function(){}}}const Kn=new Ui,gy=new ke;function vy(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,fp(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,_,b,y){g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),u(p,g),g.isMeshPhysicalMaterial&&f(p,g,y)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),v(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,_,b):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Jt&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Jt&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const _=e.get(g),b=_.envMap,y=_.envMapRotation;b&&(p.envMap.value=b,Kn.copy(y),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),p.envMapRotation.value.setFromMatrix4(gy.makeRotationFromEuler(Kn)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,_,b){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*_,p.scale.value=b*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,_){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Jt&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function v(p,g){const _=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Ay(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,b){const y=b.program;i.uniformBlockBinding(_,y)}function c(_,b){let y=s[_.id];y===void 0&&(m(_),y=h(_),s[_.id]=y,_.addEventListener("dispose",p));const S=b.program;i.updateUBOMapping(_,S);const E=e.render.frame;r[_.id]!==E&&(u(_),r[_.id]=E)}function h(_){const b=d();_.__bindingPointIndex=b;const y=n.createBuffer(),S=_.__size,E=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,S,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,y),y}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const b=s[_.id],y=_.uniforms,S=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let E=0,R=y.length;E<R;E++){const x=Array.isArray(y[E])?y[E]:[y[E]];for(let w=0,L=x.length;w<L;w++){const C=x[w];if(f(C,E,w,S)===!0){const F=C.__offset,H=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let V=0;V<H.length;V++){const k=H[V],O=v(k);typeof k=="number"||typeof k=="boolean"?(C.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,F+X,C.__data)):k.isMatrix3?(C.__data[0]=k.elements[0],C.__data[1]=k.elements[1],C.__data[2]=k.elements[2],C.__data[3]=0,C.__data[4]=k.elements[3],C.__data[5]=k.elements[4],C.__data[6]=k.elements[5],C.__data[7]=0,C.__data[8]=k.elements[6],C.__data[9]=k.elements[7],C.__data[10]=k.elements[8],C.__data[11]=0):(k.toArray(C.__data,X),X+=O.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(_,b,y,S){const E=_.value,R=b+"_"+y;if(S[R]===void 0)return typeof E=="number"||typeof E=="boolean"?S[R]=E:S[R]=E.clone(),!0;{const x=S[R];if(typeof E=="number"||typeof E=="boolean"){if(x!==E)return S[R]=E,!0}else if(x.equals(E)===!1)return x.copy(E),!0}return!1}function m(_){const b=_.uniforms;let y=0;const S=16;for(let R=0,x=b.length;R<x;R++){const w=Array.isArray(b[R])?b[R]:[b[R]];for(let L=0,C=w.length;L<C;L++){const F=w[L],H=Array.isArray(F.value)?F.value:[F.value];for(let X=0,V=H.length;X<V;X++){const k=H[X],O=v(k),ie=y%S,Z=ie%O.boundary,ce=ie+Z;y+=Z,ce!==0&&S-ce<O.storage&&(y+=S-ce),F.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=O.storage}}}const E=y%S;return E>0&&(y+=S-E),_.__size=y,_.__cache={},this}function v(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Re("WebGLRenderer: Unsupported uniform value type.",_),b}function p(_){const b=_.target;b.removeEventListener("dispose",p);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function g(){for(const _ in s)n.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}const xy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Hi=null;function _y(){return Hi===null&&(Hi=new qo(xy,16,16,nr,ei),Hi.name="DFG_LUT",Hi.minFilter=Nt,Hi.magFilter=Nt,Hi.wrapS=Wi,Hi.wrapT=Wi,Hi.generateMipmaps=!1,Hi.needsUpdate=!0),Hi}class Tp{constructor(e={}){const{canvas:t=qm(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=hi}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const v=f,p=new Set([kh,Hh,Bh]),g=new Set([hi,Qi,Qr,ir,Oh,Fh]),_=new Uint32Array(4),b=new Int32Array(4);let y=null,S=null;const E=[],R=[];let x=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let L=!1;this._outputColorSpace=Pt;let C=0,F=0,H=null,X=-1,V=null;const k=new Mt,O=new Mt;let ie=null;const Z=new Te(0);let ce=0,de=t.width,ue=t.height,Ne=1,tt=null,Je=null;const Q=new Mt(0,0,de,ue),ne=new Mt(0,0,de,ue);let se=!1;const be=new ua;let ye=!1,Le=!1;const St=new ke,Ge=new P,Ye=new Mt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function dt(){return H===null?Ne:1}let D=i;function xt(M,B){return t.getContext(M,B)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Eh}`),t.addEventListener("webglcontextlost",Se,!1),t.addEventListener("webglcontextrestored",Ve,!1),t.addEventListener("webglcontextcreationerror",_t,!1),D===null){const B="webgl2";if(D=xt(B,M),D===null)throw xt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Ue("WebGLRenderer: "+M.message),M}let $e,rt,xe,T,A,U,K,ee,q,pe,N,G,oe,J,te,fe,me,he,Oe,I,le,re,Me;function ae(){$e=new yx(D),$e.init(),le=new uy(D,$e),rt=new fx(D,$e,e,le),xe=new cy(D,$e),rt.reversedDepthBuffer&&u&&xe.buffers.depth.setReversed(!0),T=new Sx(D),A=new Z_,U=new hy(D,$e,xe,A,rt,le,T),K=new _x(w),ee=new Rv(D),re=new ux(D,ee),q=new Mx(D,ee,T,re),pe=new Ex(D,q,ee,re,T),he=new wx(D,rt,U),te=new px(A),N=new j_(w,K,$e,rt,re,te),G=new vy(w,A),oe=new K_,J=new ny($e),me=new hx(w,K,xe,pe,m,l),fe=new ly(w,pe,rt),Me=new Ay(D,T,rt,xe),Oe=new dx(D,$e,T),I=new bx(D,$e,T),T.programs=N.programs,w.capabilities=rt,w.extensions=$e,w.properties=A,w.renderLists=oe,w.shadowMap=fe,w.state=xe,w.info=T}ae(),v!==hi&&(x=new Cx(v,t.width,t.height,s,r));const j=new my(w,D);this.xr=j,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=$e.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=$e.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Ne},this.setPixelRatio=function(M){M!==void 0&&(Ne=M,this.setSize(de,ue,!1))},this.getSize=function(M){return M.set(de,ue)},this.setSize=function(M,B,Y=!0){if(j.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}de=M,ue=B,t.width=Math.floor(M*Ne),t.height=Math.floor(B*Ne),Y===!0&&(t.style.width=M+"px",t.style.height=B+"px"),x!==null&&x.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(de*Ne,ue*Ne).floor()},this.setDrawingBufferSize=function(M,B,Y){de=M,ue=B,Ne=Y,t.width=Math.floor(M*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(v===hi){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(k)},this.getViewport=function(M){return M.copy(Q)},this.setViewport=function(M,B,Y,W){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,B,Y,W),xe.viewport(k.copy(Q).multiplyScalar(Ne).round())},this.getScissor=function(M){return M.copy(ne)},this.setScissor=function(M,B,Y,W){M.isVector4?ne.set(M.x,M.y,M.z,M.w):ne.set(M,B,Y,W),xe.scissor(O.copy(ne).multiplyScalar(Ne).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(M){xe.setScissorTest(se=M)},this.setOpaqueSort=function(M){tt=M},this.setTransparentSort=function(M){Je=M},this.getClearColor=function(M){return M.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,Y=!0){let W=0;if(M){let z=!1;if(H!==null){const ve=H.texture.format;z=p.has(ve)}if(z){const ve=H.texture.type,_e=g.has(ve),Ae=me.getClearColor(),we=me.getClearAlpha(),Ce=Ae.r,ze=Ae.g,je=Ae.b;_e?(_[0]=Ce,_[1]=ze,_[2]=je,_[3]=we,D.clearBufferuiv(D.COLOR,0,_)):(b[0]=Ce,b[1]=ze,b[2]=je,b[3]=we,D.clearBufferiv(D.COLOR,0,b))}else W|=D.COLOR_BUFFER_BIT}B&&(W|=D.DEPTH_BUFFER_BIT),Y&&(W|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&D.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Se,!1),t.removeEventListener("webglcontextrestored",Ve,!1),t.removeEventListener("webglcontextcreationerror",_t,!1),me.dispose(),oe.dispose(),J.dispose(),A.dispose(),K.dispose(),pe.dispose(),re.dispose(),Me.dispose(),N.dispose(),j.dispose(),j.removeEventListener("sessionstart",lu),j.removeEventListener("sessionend",cu),Vn.stop()};function Se(M){M.preventDefault(),So("WebGLRenderer: Context Lost."),L=!0}function Ve(){So("WebGLRenderer: Context Restored."),L=!1;const M=T.autoReset,B=fe.enabled,Y=fe.autoUpdate,W=fe.needsUpdate,z=fe.type;ae(),T.autoReset=M,fe.enabled=B,fe.autoUpdate=Y,fe.needsUpdate=W,fe.type=z}function _t(M){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ct(M){const B=M.target;B.removeEventListener("dispose",ct),$i(B)}function $i(M){en(M),A.remove(M)}function en(M){const B=A.get(M).programs;B!==void 0&&(B.forEach(function(Y){N.releaseProgram(Y)}),M.isShaderMaterial&&N.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,Y,W,z,ve){B===null&&(B=it);const _e=z.isMesh&&z.matrixWorld.determinant()<0,Ae=S0(M,B,Y,W,z);xe.setMaterial(W,_e);let we=Y.index,Ce=1;if(W.wireframe===!0){if(we=q.getWireframeAttribute(Y),we===void 0)return;Ce=2}const ze=Y.drawRange,je=Y.attributes.position;let Pe=ze.start*Ce,ft=(ze.start+ze.count)*Ce;ve!==null&&(Pe=Math.max(Pe,ve.start*Ce),ft=Math.min(ft,(ve.start+ve.count)*Ce)),we!==null?(Pe=Math.max(Pe,0),ft=Math.min(ft,we.count)):je!=null&&(Pe=Math.max(Pe,0),ft=Math.min(ft,je.count));const Dt=ft-Pe;if(Dt<0||Dt===1/0)return;re.setup(z,W,Ae,Y,we);let Ct,pt=Oe;if(we!==null&&(Ct=ee.get(we),pt=I,pt.setIndex(Ct)),z.isMesh)W.wireframe===!0?(xe.setLineWidth(W.wireframeLinewidth*dt()),pt.setMode(D.LINES)):pt.setMode(D.TRIANGLES);else if(z.isLine){let Xt=W.linewidth;Xt===void 0&&(Xt=1),xe.setLineWidth(Xt*dt()),z.isLineSegments?pt.setMode(D.LINES):z.isLineLoop?pt.setMode(D.LINE_LOOP):pt.setMode(D.LINE_STRIP)}else z.isPoints?pt.setMode(D.POINTS):z.isSprite&&pt.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)wo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))pt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Xt=z._multiDrawStarts,Ee=z._multiDrawCounts,ai=z._multiDrawCount,at=we?ee.get(we).bytesPerElement:1,wi=A.get(W).currentProgram.getUniforms();for(let Fi=0;Fi<ai;Fi++)wi.setValue(D,"_gl_DrawID",Fi),pt.render(Xt[Fi]/at,Ee[Fi])}else if(z.isInstancedMesh)pt.renderInstances(Pe,Dt,z.count);else if(Y.isInstancedBufferGeometry){const Xt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ee=Math.min(Y.instanceCount,Xt);pt.renderInstances(Pe,Dt,Ee)}else pt.render(Pe,Dt)};function ou(M,B,Y){M.transparent===!0&&M.side===zi&&M.forceSinglePass===!1?(M.side=Jt,M.needsUpdate=!0,Aa(M,B,Y),M.side=Zi,M.needsUpdate=!0,Aa(M,B,Y),M.side=zi):Aa(M,B,Y)}this.compile=function(M,B,Y=null){Y===null&&(Y=M),S=J.get(Y),S.init(B),R.push(S),Y.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),M!==Y&&M.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(S.pushLight(z),z.castShadow&&S.pushShadow(z))}),S.setupLights();const W=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ve=z.material;if(ve)if(Array.isArray(ve))for(let _e=0;_e<ve.length;_e++){const Ae=ve[_e];ou(Ae,Y,z),W.add(Ae)}else ou(ve,Y,z),W.add(ve)}),S=R.pop(),W},this.compileAsync=function(M,B,Y=null){const W=this.compile(M,B,Y);return new Promise(z=>{function ve(){if(W.forEach(function(_e){A.get(_e).currentProgram.isReady()&&W.delete(_e)}),W.size===0){z(M);return}setTimeout(ve,10)}$e.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let el=null;function b0(M){el&&el(M)}function lu(){Vn.stop()}function cu(){Vn.start()}const Vn=new yp;Vn.setAnimationLoop(b0),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(M){el=M,j.setAnimationLoop(M),M===null?Vn.stop():Vn.start()},j.addEventListener("sessionstart",lu),j.addEventListener("sessionend",cu),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;const Y=j.enabled===!0&&j.isPresenting===!0,W=x!==null&&(H===null||Y)&&x.begin(w,H);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(j.cameraAutoUpdate===!0&&j.updateCamera(B),B=j.getCamera()),M.isScene===!0&&M.onBeforeRender(w,M,B,H),S=J.get(M,R.length),S.init(B),R.push(S),St.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),be.setFromProjectionMatrix(St,Xi,B.reversedDepth),Le=this.localClippingEnabled,ye=te.init(this.clippingPlanes,Le),y=oe.get(M,E.length),y.init(),E.push(y),j.enabled===!0&&j.isPresenting===!0){const _e=w.xr.getDepthSensingMesh();_e!==null&&tl(_e,B,-1/0,w.sortObjects)}tl(M,B,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(tt,Je),He=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,He&&me.addToRenderList(y,M),this.info.render.frame++,ye===!0&&te.beginShadows();const z=S.state.shadowsArray;if(fe.render(z,M,B),ye===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&x.hasRenderPass())===!1){const _e=y.opaque,Ae=y.transmissive;if(S.setupLights(),B.isArrayCamera){const we=B.cameras;if(Ae.length>0)for(let Ce=0,ze=we.length;Ce<ze;Ce++){const je=we[Ce];uu(_e,Ae,M,je)}He&&me.render(M);for(let Ce=0,ze=we.length;Ce<ze;Ce++){const je=we[Ce];hu(y,M,je,je.viewport)}}else Ae.length>0&&uu(_e,Ae,M,B),He&&me.render(M),hu(y,M,B)}H!==null&&F===0&&(U.updateMultisampleRenderTarget(H),U.updateRenderTargetMipmap(H)),W&&x.end(w),M.isScene===!0&&M.onAfterRender(w,M,B),re.resetDefaultState(),X=-1,V=null,R.pop(),R.length>0?(S=R[R.length-1],ye===!0&&te.setGlobalState(w.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?y=E[E.length-1]:y=null};function tl(M,B,Y,W){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)Y=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLight)S.pushLight(M),M.castShadow&&S.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||be.intersectsSprite(M)){W&&Ye.setFromMatrixPosition(M.matrixWorld).applyMatrix4(St);const _e=pe.update(M),Ae=M.material;Ae.visible&&y.push(M,_e,Ae,Y,Ye.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||be.intersectsObject(M))){const _e=pe.update(M),Ae=M.material;if(W&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ye.copy(M.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ye.copy(_e.boundingSphere.center)),Ye.applyMatrix4(M.matrixWorld).applyMatrix4(St)),Array.isArray(Ae)){const we=_e.groups;for(let Ce=0,ze=we.length;Ce<ze;Ce++){const je=we[Ce],Pe=Ae[je.materialIndex];Pe&&Pe.visible&&y.push(M,_e,Pe,Y,Ye.z,je)}}else Ae.visible&&y.push(M,_e,Ae,Y,Ye.z,null)}}const ve=M.children;for(let _e=0,Ae=ve.length;_e<Ae;_e++)tl(ve[_e],B,Y,W)}function hu(M,B,Y,W){const{opaque:z,transmissive:ve,transparent:_e}=M;S.setupLightsView(Y),ye===!0&&te.setGlobalState(w.clippingPlanes,Y),W&&xe.viewport(k.copy(W)),z.length>0&&va(z,B,Y),ve.length>0&&va(ve,B,Y),_e.length>0&&va(_e,B,Y),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function uu(M,B,Y,W){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[W.id]===void 0){const Pe=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[W.id]=new jt(1,1,{generateMipmaps:!0,type:Pe?ei:hi,minFilter:cn,samples:Math.max(4,rt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace})}const ve=S.state.transmissionRenderTarget[W.id],_e=W.viewport||k;ve.setSize(_e.z*w.transmissionResolutionScale,_e.w*w.transmissionResolutionScale);const Ae=w.getRenderTarget(),we=w.getActiveCubeFace(),Ce=w.getActiveMipmapLevel();w.setRenderTarget(ve),w.getClearColor(Z),ce=w.getClearAlpha(),ce<1&&w.setClearColor(16777215,.5),w.clear(),He&&me.render(Y);const ze=w.toneMapping;w.toneMapping=ji;const je=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),S.setupLightsView(W),ye===!0&&te.setGlobalState(w.clippingPlanes,W),va(M,Y,W),U.updateMultisampleRenderTarget(ve),U.updateRenderTargetMipmap(ve),$e.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let ft=0,Dt=B.length;ft<Dt;ft++){const Ct=B[ft],{object:pt,geometry:Xt,material:Ee,group:ai}=Ct;if(Ee.side===zi&&pt.layers.test(W.layers)){const at=Ee.side;Ee.side=Jt,Ee.needsUpdate=!0,du(pt,Y,W,Xt,Ee,ai),Ee.side=at,Ee.needsUpdate=!0,Pe=!0}}Pe===!0&&(U.updateMultisampleRenderTarget(ve),U.updateRenderTargetMipmap(ve))}w.setRenderTarget(Ae,we,Ce),w.setClearColor(Z,ce),je!==void 0&&(W.viewport=je),w.toneMapping=ze}function va(M,B,Y){const W=B.isScene===!0?B.overrideMaterial:null;for(let z=0,ve=M.length;z<ve;z++){const _e=M[z],{object:Ae,geometry:we,group:Ce}=_e;let ze=_e.material;ze.allowOverride===!0&&W!==null&&(ze=W),Ae.layers.test(Y.layers)&&du(Ae,B,Y,we,ze,Ce)}}function du(M,B,Y,W,z,ve){M.onBeforeRender(w,B,Y,W,z,ve),M.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(w,B,Y,W,M,ve),z.transparent===!0&&z.side===zi&&z.forceSinglePass===!1?(z.side=Jt,z.needsUpdate=!0,w.renderBufferDirect(Y,B,W,z,M,ve),z.side=Zi,z.needsUpdate=!0,w.renderBufferDirect(Y,B,W,z,M,ve),z.side=zi):w.renderBufferDirect(Y,B,W,z,M,ve),M.onAfterRender(w,B,Y,W,z,ve)}function Aa(M,B,Y){B.isScene!==!0&&(B=it);const W=A.get(M),z=S.state.lights,ve=S.state.shadowsArray,_e=z.state.version,Ae=N.getParameters(M,z.state,ve,B,Y),we=N.getProgramCacheKey(Ae);let Ce=W.programs;W.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,W.fog=B.fog;const ze=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;W.envMap=K.get(M.envMap||W.environment,ze),W.envMapRotation=W.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Ce===void 0&&(M.addEventListener("dispose",ct),Ce=new Map,W.programs=Ce);let je=Ce.get(we);if(je!==void 0){if(W.currentProgram===je&&W.lightsStateVersion===_e)return pu(M,Ae),je}else Ae.uniforms=N.getUniforms(M),M.onBeforeCompile(Ae,w),je=N.acquireProgram(Ae,we),Ce.set(we,je),W.uniforms=Ae.uniforms;const Pe=W.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=te.uniform),pu(M,Ae),W.needsLights=E0(M),W.lightsStateVersion=_e,W.needsLights&&(Pe.ambientLightColor.value=z.state.ambient,Pe.lightProbe.value=z.state.probe,Pe.directionalLights.value=z.state.directional,Pe.directionalLightShadows.value=z.state.directionalShadow,Pe.spotLights.value=z.state.spot,Pe.spotLightShadows.value=z.state.spotShadow,Pe.rectAreaLights.value=z.state.rectArea,Pe.ltc_1.value=z.state.rectAreaLTC1,Pe.ltc_2.value=z.state.rectAreaLTC2,Pe.pointLights.value=z.state.point,Pe.pointLightShadows.value=z.state.pointShadow,Pe.hemisphereLights.value=z.state.hemi,Pe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Pe.spotLightMatrix.value=z.state.spotLightMatrix,Pe.spotLightMap.value=z.state.spotLightMap,Pe.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=je,W.uniformsList=null,je}function fu(M){if(M.uniformsList===null){const B=M.currentProgram.getUniforms();M.uniformsList=po.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function pu(M,B){const Y=A.get(M);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.batchingColor=B.batchingColor,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.instancingMorph=B.instancingMorph,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function S0(M,B,Y,W,z){B.isScene!==!0&&(B=it),U.resetTextureUnits();const ve=B.fog,_e=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?B.environment:null,Ae=H===null?w.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:ti,we=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ce=K.get(W.envMap||_e,we),ze=W.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,je=!!Y.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pe=!!Y.morphAttributes.position,ft=!!Y.morphAttributes.normal,Dt=!!Y.morphAttributes.color;let Ct=ji;W.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Ct=w.toneMapping);const pt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Xt=pt!==void 0?pt.length:0,Ee=A.get(W),ai=S.state.lights;if(ye===!0&&(Le===!0||M!==V)){const Ht=M===V&&W.id===X;te.setState(W,M,Ht)}let at=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==ai.state.version||Ee.outputColorSpace!==Ae||z.isBatchedMesh&&Ee.batching===!1||!z.isBatchedMesh&&Ee.batching===!0||z.isBatchedMesh&&Ee.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ee.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ee.instancing===!1||!z.isInstancedMesh&&Ee.instancing===!0||z.isSkinnedMesh&&Ee.skinning===!1||!z.isSkinnedMesh&&Ee.skinning===!0||z.isInstancedMesh&&Ee.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ee.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ee.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ee.instancingMorph===!1&&z.morphTexture!==null||Ee.envMap!==Ce||W.fog===!0&&Ee.fog!==ve||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==te.numPlanes||Ee.numIntersection!==te.numIntersection)||Ee.vertexAlphas!==ze||Ee.vertexTangents!==je||Ee.morphTargets!==Pe||Ee.morphNormals!==ft||Ee.morphColors!==Dt||Ee.toneMapping!==Ct||Ee.morphTargetsCount!==Xt)&&(at=!0):(at=!0,Ee.__version=W.version);let wi=Ee.currentProgram;at===!0&&(wi=Aa(W,B,z));let Fi=!1,zn=!1,gs=!1;const At=wi.getUniforms(),zt=Ee.uniforms;if(xe.useProgram(wi.program)&&(Fi=!0,zn=!0,gs=!0),W.id!==X&&(X=W.id,zn=!0),Fi||V!==M){xe.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),At.setValue(D,"projectionMatrix",M.projectionMatrix),At.setValue(D,"viewMatrix",M.matrixWorldInverse);const mn=At.map.cameraPosition;mn!==void 0&&mn.setValue(D,Ge.setFromMatrixPosition(M.matrixWorld)),rt.logarithmicDepthBuffer&&At.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&At.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),V!==M&&(V=M,zn=!0,gs=!0)}if(Ee.needsLights&&(ai.state.directionalShadowMap.length>0&&At.setValue(D,"directionalShadowMap",ai.state.directionalShadowMap,U),ai.state.spotShadowMap.length>0&&At.setValue(D,"spotShadowMap",ai.state.spotShadowMap,U),ai.state.pointShadowMap.length>0&&At.setValue(D,"pointShadowMap",ai.state.pointShadowMap,U)),z.isSkinnedMesh){At.setOptional(D,z,"bindMatrix"),At.setOptional(D,z,"bindMatrixInverse");const Ht=z.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),At.setValue(D,"boneTexture",Ht.boneTexture,U))}z.isBatchedMesh&&(At.setOptional(D,z,"batchingTexture"),At.setValue(D,"batchingTexture",z._matricesTexture,U),At.setOptional(D,z,"batchingIdTexture"),At.setValue(D,"batchingIdTexture",z._indirectTexture,U),At.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&At.setValue(D,"batchingColorTexture",z._colorsTexture,U));const pn=Y.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&he.update(z,Y,wi),(zn||Ee.receiveShadow!==z.receiveShadow)&&(Ee.receiveShadow=z.receiveShadow,At.setValue(D,"receiveShadow",z.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&B.environment!==null&&(zt.envMapIntensity.value=B.environmentIntensity),zt.dfgLUT!==void 0&&(zt.dfgLUT.value=_y()),zn&&(At.setValue(D,"toneMappingExposure",w.toneMappingExposure),Ee.needsLights&&w0(zt,gs),ve&&W.fog===!0&&G.refreshFogUniforms(zt,ve),G.refreshMaterialUniforms(zt,W,Ne,ue,S.state.transmissionRenderTarget[M.id]),po.upload(D,fu(Ee),zt,U)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(po.upload(D,fu(Ee),zt,U),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&At.setValue(D,"center",z.center),At.setValue(D,"modelViewMatrix",z.modelViewMatrix),At.setValue(D,"normalMatrix",z.normalMatrix),At.setValue(D,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ht=W.uniformsGroups;for(let mn=0,vs=Ht.length;mn<vs;mn++){const mu=Ht[mn];Me.update(mu,wi),Me.bind(mu,wi)}}return wi}function w0(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function E0(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(M,B,Y){const W=A.get(M);W.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),A.get(M.texture).__webglTexture=B,A.get(M.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Y,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){const Y=A.get(M);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0};const T0=D.createFramebuffer();this.setRenderTarget=function(M,B=0,Y=0){H=M,C=B,F=Y;let W=null,z=!1,ve=!1;if(M){const Ae=A.get(M);if(Ae.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(D.FRAMEBUFFER,Ae.__webglFramebuffer),k.copy(M.viewport),O.copy(M.scissor),ie=M.scissorTest,xe.viewport(k),xe.scissor(O),xe.setScissorTest(ie),X=-1;return}else if(Ae.__webglFramebuffer===void 0)U.setupRenderTarget(M);else if(Ae.__hasExternalTextures)U.rebindTextures(M,A.get(M.texture).__webglTexture,A.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const ze=M.depthTexture;if(Ae.__boundDepthTexture!==ze){if(ze!==null&&A.has(ze)&&(M.width!==ze.image.width||M.height!==ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(M)}}const we=M.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ve=!0);const Ce=A.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ce[B])?W=Ce[B][Y]:W=Ce[B],z=!0):M.samples>0&&U.useMultisampledRTT(M)===!1?W=A.get(M).__webglMultisampledFramebuffer:Array.isArray(Ce)?W=Ce[Y]:W=Ce,k.copy(M.viewport),O.copy(M.scissor),ie=M.scissorTest}else k.copy(Q).multiplyScalar(Ne).floor(),O.copy(ne).multiplyScalar(Ne).floor(),ie=se;if(Y!==0&&(W=T0),xe.bindFramebuffer(D.FRAMEBUFFER,W)&&xe.drawBuffers(M,W),xe.viewport(k),xe.scissor(O),xe.setScissorTest(ie),z){const Ae=A.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ae.__webglTexture,Y)}else if(ve){const Ae=B;for(let we=0;we<M.textures.length;we++){const Ce=A.get(M.textures[we]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+we,Ce.__webglTexture,Y,Ae)}}else if(M!==null&&Y!==0){const Ae=A.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ae.__webglTexture,Y)}X=-1},this.readRenderTargetPixels=function(M,B,Y,W,z,ve,_e,Ae=0){if(!(M&&M.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(we=we[_e]),we){xe.bindFramebuffer(D.FRAMEBUFFER,we);try{const Ce=M.textures[Ae],ze=Ce.format,je=Ce.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),!rt.textureFormatReadable(ze)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable(je)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-W&&Y>=0&&Y<=M.height-z&&D.readPixels(B,Y,W,z,le.convert(ze),le.convert(je),ve)}finally{const Ce=H!==null?A.get(H).__webglFramebuffer:null;xe.bindFramebuffer(D.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(M,B,Y,W,z,ve,_e,Ae=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(we=we[_e]),we)if(B>=0&&B<=M.width-W&&Y>=0&&Y<=M.height-z){xe.bindFramebuffer(D.FRAMEBUFFER,we);const Ce=M.textures[Ae],ze=Ce.format,je=Ce.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),!rt.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Pe),D.bufferData(D.PIXEL_PACK_BUFFER,ve.byteLength,D.STREAM_READ),D.readPixels(B,Y,W,z,le.convert(ze),le.convert(je),0);const ft=H!==null?A.get(H).__webglFramebuffer:null;xe.bindFramebuffer(D.FRAMEBUFFER,ft);const Dt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Ym(D,Dt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Pe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ve),D.deleteBuffer(Pe),D.deleteSync(Dt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,Y=0){const W=Math.pow(2,-Y),z=Math.floor(M.image.width*W),ve=Math.floor(M.image.height*W),_e=B!==null?B.x:0,Ae=B!==null?B.y:0;U.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,Y,0,0,_e,Ae,z,ve),xe.unbindTexture()};const C0=D.createFramebuffer(),R0=D.createFramebuffer();this.copyTextureToTexture=function(M,B,Y=null,W=null,z=0,ve=0){let _e,Ae,we,Ce,ze,je,Pe,ft,Dt;const Ct=M.isCompressedTexture?M.mipmaps[ve]:M.image;if(Y!==null)_e=Y.max.x-Y.min.x,Ae=Y.max.y-Y.min.y,we=Y.isBox3?Y.max.z-Y.min.z:1,Ce=Y.min.x,ze=Y.min.y,je=Y.isBox3?Y.min.z:0;else{const zt=Math.pow(2,-z);_e=Math.floor(Ct.width*zt),Ae=Math.floor(Ct.height*zt),M.isDataArrayTexture?we=Ct.depth:M.isData3DTexture?we=Math.floor(Ct.depth*zt):we=1,Ce=0,ze=0,je=0}W!==null?(Pe=W.x,ft=W.y,Dt=W.z):(Pe=0,ft=0,Dt=0);const pt=le.convert(B.format),Xt=le.convert(B.type);let Ee;B.isData3DTexture?(U.setTexture3D(B,0),Ee=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(U.setTexture2DArray(B,0),Ee=D.TEXTURE_2D_ARRAY):(U.setTexture2D(B,0),Ee=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const ai=D.getParameter(D.UNPACK_ROW_LENGTH),at=D.getParameter(D.UNPACK_IMAGE_HEIGHT),wi=D.getParameter(D.UNPACK_SKIP_PIXELS),Fi=D.getParameter(D.UNPACK_SKIP_ROWS),zn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ct.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ct.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ce),D.pixelStorei(D.UNPACK_SKIP_ROWS,ze),D.pixelStorei(D.UNPACK_SKIP_IMAGES,je);const gs=M.isDataArrayTexture||M.isData3DTexture,At=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){const zt=A.get(M),pn=A.get(B),Ht=A.get(zt.__renderTarget),mn=A.get(pn.__renderTarget);xe.bindFramebuffer(D.READ_FRAMEBUFFER,Ht.__webglFramebuffer),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,mn.__webglFramebuffer);for(let vs=0;vs<we;vs++)gs&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,A.get(M).__webglTexture,z,je+vs),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,A.get(B).__webglTexture,ve,Dt+vs)),D.blitFramebuffer(Ce,ze,_e,Ae,Pe,ft,_e,Ae,D.DEPTH_BUFFER_BIT,D.NEAREST);xe.bindFramebuffer(D.READ_FRAMEBUFFER,null),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||A.has(M)){const zt=A.get(M),pn=A.get(B);xe.bindFramebuffer(D.READ_FRAMEBUFFER,C0),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,R0);for(let Ht=0;Ht<we;Ht++)gs?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,zt.__webglTexture,z,je+Ht):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,zt.__webglTexture,z),At?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pn.__webglTexture,ve,Dt+Ht):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pn.__webglTexture,ve),z!==0?D.blitFramebuffer(Ce,ze,_e,Ae,Pe,ft,_e,Ae,D.COLOR_BUFFER_BIT,D.NEAREST):At?D.copyTexSubImage3D(Ee,ve,Pe,ft,Dt+Ht,Ce,ze,_e,Ae):D.copyTexSubImage2D(Ee,ve,Pe,ft,Ce,ze,_e,Ae);xe.bindFramebuffer(D.READ_FRAMEBUFFER,null),xe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else At?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(Ee,ve,Pe,ft,Dt,_e,Ae,we,pt,Xt,Ct.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(Ee,ve,Pe,ft,Dt,_e,Ae,we,pt,Ct.data):D.texSubImage3D(Ee,ve,Pe,ft,Dt,_e,Ae,we,pt,Xt,Ct):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ve,Pe,ft,_e,Ae,pt,Xt,Ct.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ve,Pe,ft,Ct.width,Ct.height,pt,Ct.data):D.texSubImage2D(D.TEXTURE_2D,ve,Pe,ft,_e,Ae,pt,Xt,Ct);D.pixelStorei(D.UNPACK_ROW_LENGTH,ai),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,at),D.pixelStorei(D.UNPACK_SKIP_PIXELS,wi),D.pixelStorei(D.UNPACK_SKIP_ROWS,Fi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,zn),ve===0&&B.generateMipmaps&&D.generateMipmap(Ee),xe.unbindTexture()},this.initRenderTarget=function(M){A.get(M).__webglFramebuffer===void 0&&U.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?U.setTextureCube(M,0):M.isData3DTexture?U.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?U.setTexture2DArray(M,0):U.setTexture2D(M,0),xe.unbindTexture()},this.resetState=function(){C=0,F=0,H=null,xe.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const yy=[{name:"第一卷",en:"VOLUME 01"},{name:"第二卷",en:"VOLUME 02"},{name:"第三卷",en:"VOLUME 03"},{name:"第四卷",en:"VOLUME 04"},{name:"第五卷",en:"VOLUME 05"}],My=[{file:"0001.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0002.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0003.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0004.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0005.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0006.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0007.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0008.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0009.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0010.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0011.jpg",title:"",date:"",place:"",caption:"",tags:[]},{file:"0012.jpg",title:"",date:"",place:"",caption:"",tags:[]}],Cp={volumes:yy,photos:My},by={"0001.jpg":{key:"a426150c4828",width:1500,height:2666,color:"#362a25",lqip:"data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAwBACdASoNABgAPu1iqk2ppaQiMAgBMB2JYwCdMoAC/Mu8XC6Vc10NHkAA/oWFxGpa3+DSPTBITXiR57Z/4zwwsbgKRwJgBWhdJTjHkTNP1IUuwDccI3ajm4MTWv/Vi+6eO8v4ib6NcfIevKNsz++UoFe8cVtcFLYeI2digAA=",taken:"",src:{full:{webp:"photos/a426150c4828-full.webp",avif:"photos/a426150c4828-full.avif"},mid:{webp:"photos/a426150c4828-mid.webp",avif:"photos/a426150c4828-mid.avif"},thumb:{webp:"photos/a426150c4828-thumb.webp"}}},"0002.jpg":{key:"d0513458e00a",width:1500,height:2669,color:"#7e6e69",lqip:"data:image/webp;base64,UklGRqIAAABXRUJQVlA4IJYAAABwBACdASoNABgAPu1iqk2ppaQiMAgBMB2JYwC7MoACjawG3XUZLgTfLZ3QAAD8/ZYmXfwswsgREURLOfCNXjbCPJPD9ihFPPNG9iAgeaLyWs3qGWZOiwVAsEpGNp0zXsECISvw7l2VrIM1Ur6Vao7L95mRFBiGg2skEAl0kd+Z3VpxLT/bI3v8Ki90b6K+8jCYts/+AgA=",taken:"",src:{full:{webp:"photos/d0513458e00a-full.webp",avif:"photos/d0513458e00a-full.avif"},mid:{webp:"photos/d0513458e00a-mid.webp",avif:"photos/d0513458e00a-mid.avif"},thumb:{webp:"photos/d0513458e00a-thumb.webp"}}},"0003.jpg":{key:"6f3654d9fa60",width:1500,height:2669,color:"#62504c",lqip:"data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAABQBACdASoNABgAPu1kqU2ppaQiMAgBMB2JQBOmUABsfQ3kAD5VXoeWKDuAAP7bRM1WgMMtHRSKG1ji/CiY3UjpBr44aRTqRDwb0HCR857YBQwcr/BbPbwXwXqmaQ8PCQAkXid4vZSTZZsrO9HYio0YkFXDEBJx1S9GoIiBUru+xEyKSrgAAA==",taken:"",src:{full:{webp:"photos/6f3654d9fa60-full.webp",avif:"photos/6f3654d9fa60-full.avif"},mid:{webp:"photos/6f3654d9fa60-mid.webp",avif:"photos/6f3654d9fa60-mid.avif"},thumb:{webp:"photos/6f3654d9fa60-thumb.webp"}}},"0004.jpg":{key:"04304ce2fa0d",width:1500,height:2666,color:"#6a6762",lqip:"data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAQBACdASoNABgAPu1krU6ppaSiMAgBMB2JZQC7ACHgaSuCxUFvYRKYAAD+nlni+Sv5pQoLhhgw5FcGizBy5OLPdFgmi5MX6p7vomaEb894EQPQknxjHV6C+AA=",taken:"",src:{full:{webp:"photos/04304ce2fa0d-full.webp",avif:"photos/04304ce2fa0d-full.avif"},mid:{webp:"photos/04304ce2fa0d-mid.webp",avif:"photos/04304ce2fa0d-mid.avif"},thumb:{webp:"photos/04304ce2fa0d-thumb.webp"}}},"0005.jpg":{key:"635d4fad8948",width:1500,height:2394,color:"#45795d",lqip:"data:image/webp;base64,UklGRqYAAABXRUJQVlA4IJoAAAAwBACdASoPABgAPu1iqU2ppaOiMAgBMB2JbAC7AB8haIDBBlHLvheD/YAA/Z/T56kHBlYAgPhYWajxAk5DB0gMNzzm53/sFg5Wt+rPJafxSaBv6tfNpe6AfkYGcjha/q+5uYIfgQgqAwDqAiIXgiQ7F1mPWndPFf7RiStD+hX5vPFsu2/bH4NQib1H+4lAYcJZBYkVa1VUgAAA",taken:"",src:{full:{webp:"photos/635d4fad8948-full.webp",avif:"photos/635d4fad8948-full.avif"},mid:{webp:"photos/635d4fad8948-mid.webp",avif:"photos/635d4fad8948-mid.avif"},thumb:{webp:"photos/635d4fad8948-thumb.webp"}}},"0006.jpg":{key:"4acda36de0ac",width:1500,height:1993,color:"#80807f",lqip:"data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAADwBACdASoSABgAPu1qrVCppaQiqAqpMB2JaQDPoBIm3bzcNW657KLuD7fok5cghGAA+Q5TYi0w2gDd7y5+DvkgeyQiAT/gkkPBxaDu8MbWCDDW2pfANY3i86UzZn9wAzWJm3lF4pc+YQySaavdWrF/oArCJ9HKtncgsvfyUrIT4cO8j+5mCuXly+UDEKA7rci0yaetTkAAAA==",taken:"",src:{full:{webp:"photos/4acda36de0ac-full.webp",avif:"photos/4acda36de0ac-full.avif"},mid:{webp:"photos/4acda36de0ac-mid.webp",avif:"photos/4acda36de0ac-mid.avif"},thumb:{webp:"photos/4acda36de0ac-thumb.webp"}}},"0007.jpg":{key:"b41cab8aac50",width:1500,height:2192,color:"#cbd0d3",lqip:"data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAQBACdASoQABgAPu1iqU2ppaOiMAgBMB2JYwC7MoAKRqs2zagvPKpJAAD+/i+kclnQ3sFu0qJOfwxwysoPZjF8dIgSuaQr2ZyJ7C3nI6/IBSetcHDWAZsAAAA=",taken:"",src:{full:{webp:"photos/b41cab8aac50-full.webp",avif:"photos/b41cab8aac50-full.avif"},mid:{webp:"photos/b41cab8aac50-mid.webp",avif:"photos/b41cab8aac50-mid.avif"},thumb:{webp:"photos/b41cab8aac50-thumb.webp"}}},"0008.jpg":{key:"47308920f0fe",width:1500,height:2250,color:"#a0a494",lqip:"data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAAAQBACdASoQABgAPu1iqU2ppaOiMAgBMB2JZAC06CK5oDLiw1DlZvdmwAD+yfyx7ApBCN1Afmw8k2BI1zAgiuI4ft1jbfOF2B6g/W1apUa03R6E1aMEUuA6o2uY33zk0j7nvVUtG5fl6bZw5fxmwuDGBS4+ajSP+peC1cNngNObW97g1sn5afAIeaI4MrVbKNehObLIgQAAAA==",taken:"",src:{full:{webp:"photos/47308920f0fe-full.webp",avif:"photos/47308920f0fe-full.avif"},mid:{webp:"photos/47308920f0fe-mid.webp",avif:"photos/47308920f0fe-mid.avif"},thumb:{webp:"photos/47308920f0fe-thumb.webp"}}},"0009.jpg":{key:"4e2906f3bca6",width:1500,height:2228,color:"#626664",lqip:"data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAADQAwCdASoQABgAPu1iqU2ppaOiMAgBMB2JZQAAWhlOXuuBn5TtNwAA/VChsh3Nq3cWYAQUaSKAYF7k3YjqwPHeg9f2e5nLcs2Mm3arEvIrRCb/cd1wrvMXZXlAiKuajuNRaHFYMqCpGlCkvy/HxJfZ+2DkrWO1yDTTXeKCtaSn34v2rmEIAA==",taken:"",src:{full:{webp:"photos/4e2906f3bca6-full.webp",avif:"photos/4e2906f3bca6-full.avif"},mid:{webp:"photos/4e2906f3bca6-mid.webp",avif:"photos/4e2906f3bca6-mid.avif"},thumb:{webp:"photos/4e2906f3bca6-thumb.webp"}}},"0010.jpg":{key:"25d2b537f4a1",width:1500,height:1125,color:"#8b9db2",lqip:"data:image/webp;base64,UklGRugAAABXRUJQVlA4INwAAACwBQCdASoYABIAPu1qrFEppaQiqAqpMB2JZACdMuInWdQAQgx4UzsDJNW2mdHA1SIsWDnkS8AA/tT6vf+fqM9FKp2e5F0taGci6mzTvEEWM3hnf+6OMw4wo6/04NIzZ+YXfJgJmAPa/LuSbiGC4WestIECQGHHdkdw2Qj33U31uavGCiImASbQ+5V3mJUhRhssw37nneohbOX4bQ0FG7955ytrBdIUVwmTLhB5hc/uvOt3GiROEaKdiOQ5hV0P/NxIrobNiOoZdiiPNdk+a50IevxLTxr1fSl6AAAA",taken:"",src:{full:{webp:"photos/25d2b537f4a1-full.webp",avif:"photos/25d2b537f4a1-full.avif"},mid:{webp:"photos/25d2b537f4a1-mid.webp",avif:"photos/25d2b537f4a1-mid.avif"},thumb:{webp:"photos/25d2b537f4a1-thumb.webp"}}},"0011.jpg":{key:"b16dcb130762",width:1500,height:2e3,color:"#6d89a7",lqip:"data:image/webp;base64,UklGRrwAAABXRUJQVlA4ILAAAABQBQCdASoSABgAPu1qsFAppiSiqAqpMB2JZgCpFMF6AAN3YtjgBD9INqhYcIcFXkX4VagAymjkYydk4cQXtSpXPDpNSZFt6ygWNqWZnJFsPIlAkQSfB+t8faBfXHPvFpwxVQPg2HnNfmFSmSIAfjkSyRtdoGQ/f08Lko4ijODK+J2JkYSRujjaBbMnJChTfUegkVkAakPvQEOA1CBfiA1YmKKx7OYAboIpF3dxpj94AA==",taken:"",src:{full:{webp:"photos/b16dcb130762-full.webp",avif:"photos/b16dcb130762-full.avif"},mid:{webp:"photos/b16dcb130762-mid.webp",avif:"photos/b16dcb130762-mid.avif"},thumb:{webp:"photos/b16dcb130762-thumb.webp"}}},"0012.jpg":{key:"9ec513feb619",width:1500,height:2001,color:"#7c7c85",lqip:"data:image/webp;base64,UklGRvQAAABXRUJQVlA4IOgAAABwBQCdASoSABgAPu1qrlCppaQiqAqpMB2JZgC28KdbQSYAISiImi3kB5GGA2K2rTKGck7UAOJvBoRmsi8+9QblzUiUyfB/ClRC3B5dFMX+xucojHZH7wd+HO9prdFGfg/431wPPJqgEtQMEQEw0NtiWu5VtHXqhmxxNfYjyWeIdh8ZLe5OqgSo/UhBRvvNGiaV9bGxCEjBiK73eHsYXs/fzn/2WHtbvqZXTHhD1zaPDRXPNFBetO8ADFbkSX57ge/Y3yCZvBUBmxfpsWNIvra2WW0DLrvdwkBk5p2LZLacKQABeGdsAAAA",taken:"",src:{full:{webp:"photos/9ec513feb619-full.webp",avif:"photos/9ec513feb619-full.avif"},mid:{webp:"photos/9ec513feb619-mid.webp",avif:"photos/9ec513feb619-mid.avif"},thumb:{webp:"photos/9ec513feb619-thumb.webp"}}}},is=5,Rp=by,ni=n=>typeof n=="string"?n.trim():"",Wd=n=>Array.isArray(n)?n.map(ni).filter(Boolean):ni(n)?[ni(n)]:[],On=Cp.volumes.map((n,e)=>({name:ni(n.name)||`VOL.${e+1}`,en:ni(n.en)||`VOLUME ${String(e+1).padStart(2,"0")}`})),Xd=Cp.photos.filter(n=>Rp[ni(n.file)]),Sy=(n,e)=>{const t=Math.floor(e/is),i=e%is;let s=0;for(let r=1;r<=is;r++)if(s+=t+(r<=i?1:0),n<s)return r;return is},Jh=Xd.map((n,e)=>{const t=Rp[ni(n.file)],i=String(e+1).padStart(3,"0"),s=Number.isInteger(n.volume)&&n.volume>=1&&n.volume<=is?n.volume:Sy(e,Xd.length),r=Wd(n.tags);return{id:`X-${i}`,title:ni(n.title)||`影像 ${i}`,en:ni(n.en)||`MEMORY NO.${i}`,department:ni(n.date)||t.taken||"—",category:On[s-1].name,date:ni(n.place)||"—",lead:r.length?r.join(" / "):"—",clearance:ni(n.clearance)||"PRIVATE ARCHIVE",abstract:ni(n.caption),findings:Wd(n.notes),source:"",tags:r,photo:t,file:ni(n.file)}}),wy=Jh.length?1:8;let Ey=0;const Ty=On.flatMap(n=>{const e=Jh.filter(t=>t.category===n.name).length;return Array.from({length:Math.max(0,wy-e)},()=>({id:`X-${String(901+Ey++)}`,title:"待归档",en:"AWAITING ARCHIVE",department:"—",category:n.name,date:"—",lead:"—",clearance:"EMPTY SLOT",abstract:"",findings:[],source:"",tags:[]}))}),vt=[...Jh,...Ty],Cy=["全部档案",...On.map(n=>n.name)],Ry=vt[0]?On.findIndex(n=>n.name===vt[0].category):0,Bn=On.map((n,e)=>On[(Ry+e-2+is*2)%is].name);function Hn(n){return vt.map((e,t)=>({record:e,index:t})).filter(({record:e})=>e.category===Bn[n]).map(({index:e})=>e)}function dn(n){const e=Bn.indexOf(vt[n].category),t=12+Hn(e).indexOf(n);return{lane:e,row:t,slot:e*32+t}}function Py(n){const e=Hn(Math.floor(n/32));return e[Math.max(0,Math.min(e.length-1,n%32-12))]}const ta=vt.map((n,e)=>n.photo?e:-1).filter(n=>n>=0),qd=9,Co=32,vi=5.2,Ai=.62,Dy=[0,1,2,3,4,-2,-1,5,6];function nh(n,e){return(n%e+e)%e}function Yd(n,e,t){return n+Math.floor((e-n+t/2)/t)*t}function Yl({lane:n,row:e}){const t=Hn(nh(n,Bn.length));return t[nh(e-12,t.length)]}function Ly(n,e,t){if(t&&"cell"in t)return{...t.cell};const i=dn(n),s=Yd(i.row,e.row,Hn(i.lane).length);return t?.axis==="row"?{lane:e.lane,row:e.row+t.direction}:{lane:t?.axis==="lane"?e.lane+t.direction:Yd(i.lane,e.lane,Bn.length),row:s}}function jl(n){return{lane:Dy[Math.floor(n/Co)],row:n%Co}}function ln(n){return`${n.lane}:${n.row}`}function Ir(n,e){return n.lane===e.lane&&n.row===e.row}const Iy=[[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]];class Ny{camera=new Wt;frustum=new ua;matrix=new ke;box=new bi;candidates=0;previous=[];cachedCells=[];update(e,t,i,s,r){const a=[...e.projectionMatrix.elements,...e.matrixWorldInverse.elements,e.near,e.far,t,i,s,Number(r)];if(a.every((_,b)=>_===this.previous[b]))return this.cachedCells;this.previous=a,this.camera.copy(e,!1),this.camera.far=Math.min(e.far,Math.max(e.near+1,t+8)),this.camera.updateProjectionMatrix();const o=r?1.5:1.18;this.camera.projectionMatrix.elements[0]/=o,this.camera.projectionMatrix.elements[5]/=o,this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert(),this.matrix.multiplyMatrices(this.camera.projectionMatrix,e.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.matrix);const l=this.matrix.clone().invert(),c=Array.from({length:8},(_,b)=>new P(b&1?1:-1,b&2?1:-1,b&4?1:-1).applyMatrix4(l)),h=new bi,d=-6.5,u=6.5;for(const _ of c)_.y>=d&&_.y<=u&&h.expandByPoint(_);for(const[_,b]of Iy)for(const y of[d,u]){const S=c[_],E=c[b],R=E.y-S.y;if(Math.abs(R)<1e-9)continue;const x=(y-S.y)/R;x>=0&&x<=1&&h.expandByPoint(S.clone().lerp(E,x))}if(h.isEmpty())return this.candidates=0,this.cachedCells=[];const f=Math.floor((h.min.x-2.8+i)/vi+2)-1,m=Math.ceil((h.max.x+2.8+i)/vi+2)+1,v=Math.floor((h.min.z-.6-s)/Ai+15.5)-2,p=Math.ceil((h.max.z+.6-s)/Ai+15.5)+2,g=[];for(let _=f;_<=m;_++)for(let b=v;b<=p;b++){const y=(_-2)*vi-i,S=(b-15.5)*Ai+s;this.box.min.set(y-2.8,d,S-1.2),this.box.max.set(y+2.8,u,S+1.2),this.frustum.intersectsBox(this.box)&&g.push({lane:_,row:b})}return this.candidates=g.length,this.cachedCells=g}intersects(e,t,i){return this.box.min.set(e-2.8,t-.3,i-1.2),this.box.max.set(e+2.8,t+4.1,i+1.2),this.frustum.intersectsBox(this.box)}}class Ws{first=1/0;last=-1;attribute;constructor(e){this.attribute=e}set(e,t){const i=this.attribute.array;for(let s=0;s<t.length;s++){const r=e+s,a=Math.fround(t[s]);i[r]!==a&&(i[r]=a,this.first=Math.min(this.first,r),this.last=Math.max(this.last,r))}}scalar(e,t){t=Math.fround(t),this.attribute.array[e]!==t&&(this.attribute.array[e]=t,this.first=Math.min(this.first,e),this.last=Math.max(this.last,e))}commit(){return this.last<0?!1:(this.attribute.addUpdateRange(this.first,this.last-this.first+1),this.attribute.needsUpdate=!0,this.first=1/0,this.last=-1,!0)}}class Uy{frustum=new ua;matrix=new ke;box=new bi;update(e){this.matrix.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.matrix)}contains(e,t,i){return this.box.min.set(e-2.8,t-.3,i-1.2),this.box.max.set(e+2.8,t+4.1,i+1.2),this.frustum.intersectsBox(this.box)}}class Oy{mesh;updates;count=0;constructor(e){this.mesh=new ls(e.geometry,e.material,e.instanceMatrix.count),this.mesh.name="archive-shadow-coverage",this.mesh.frustumCulled=!1,this.mesh.castShadow=!0,this.mesh.userData.excludeFromAO=!0,this.mesh.userData.shadowOnly=!0,this.mesh.onBeforeRender=()=>{this.mesh.count=0},this.mesh.onAfterRender=()=>{this.mesh.count=this.count},this.mesh.instanceMatrix.setUsage(Gs),this.updates=new Ws(this.mesh.instanceMatrix),e.castShadow=!1}begin(){this.count=0}add(e){if(this.count===this.mesh.instanceMatrix.count){const t=this.mesh.instanceMatrix;this.mesh.dispose(),this.mesh.instanceMatrix=new os(new Float32Array(t.array.length*2),16).setUsage(Gs),this.mesh.instanceMatrix.array.set(t.array),this.updates=new Ws(this.mesh.instanceMatrix)}this.updates.set(this.count++*16,e.elements)}commit(){const e=this.mesh.count!==this.count;return this.mesh.count=this.count,this.updates.commit()||e}}class jd{values=[];cursor=0;changed=!0;begin(){this.cursor=0}add(...e){for(const t of e)this.values[this.cursor]!==t&&(this.changed=!0),this.values[this.cursor++]=t}floats(...e){this.add(...e.map(t=>t===void 0?void 0:Math.fround(t)))}end(){const e=this.changed||this.values.length!==this.cursor;return this.values.length=this.cursor,this.changed=!1,e}invalidate(){this.changed=!0}}class kn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Fy=new fa(-1,1,1,-1,0,1);class By extends mi{constructor(){super(),this.setAttribute("position",new fi([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new fi([0,2,0,0,2,0],2))}}const Hy=new By;class xr{constructor(e){this._mesh=new nt(Hy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Fy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ky{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,s,r;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,f=c-d,m=e-u,v=t-f;let p,g;m>v?(p=1,g=0):(p=0,g=1);const _=m-p+h,b=v-g+h,y=m-1+2*h,S=v-1+2*h,E=l&255,R=c&255,x=this.perm[E+this.perm[R]]%12,w=this.perm[E+p+this.perm[R+g]]%12,L=this.perm[E+1+this.perm[R+1]]%12;let C=.5-m*m-v*v;C<0?i=0:(C*=C,i=C*C*this._dot(this.grad3[x],m,v));let F=.5-_*_-b*b;F<0?s=0:(F*=F,s=F*F*this._dot(this.grad3[w],_,b));let H=.5-y*y-S*S;return H<0?r=0:(H*=H,r=H*H*this._dot(this.grad3[L],y,S)),70*(i+s+r)}noise3d(e,t,i){let s,r,a,o;const c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),d=Math.floor(t+c),u=Math.floor(i+c),f=1/6,m=(h+d+u)*f,v=h-m,p=d-m,g=u-m,_=e-v,b=t-p,y=i-g;let S,E,R,x,w,L;_>=b?b>=y?(S=1,E=0,R=0,x=1,w=1,L=0):_>=y?(S=1,E=0,R=0,x=1,w=0,L=1):(S=0,E=0,R=1,x=1,w=0,L=1):b<y?(S=0,E=0,R=1,x=0,w=1,L=1):_<y?(S=0,E=1,R=0,x=0,w=1,L=1):(S=0,E=1,R=0,x=1,w=1,L=0);const C=_-S+f,F=b-E+f,H=y-R+f,X=_-x+2*f,V=b-w+2*f,k=y-L+2*f,O=_-1+3*f,ie=b-1+3*f,Z=y-1+3*f,ce=h&255,de=d&255,ue=u&255,Ne=this.perm[ce+this.perm[de+this.perm[ue]]]%12,tt=this.perm[ce+S+this.perm[de+E+this.perm[ue+R]]]%12,Je=this.perm[ce+x+this.perm[de+w+this.perm[ue+L]]]%12,Q=this.perm[ce+1+this.perm[de+1+this.perm[ue+1]]]%12;let ne=.6-_*_-b*b-y*y;ne<0?s=0:(ne*=ne,s=ne*ne*this._dot3(this.grad3[Ne],_,b,y));let se=.6-C*C-F*F-H*H;se<0?r=0:(se*=se,r=se*se*this._dot3(this.grad3[tt],C,F,H));let be=.6-X*X-V*V-k*k;be<0?a=0:(be*=be,a=be*be*this._dot3(this.grad3[Je],X,V,k));let ye=.6-O*O-ie*ie-Z*Z;return ye<0?o=0:(ye*=ye,o=ye*ye*this._dot3(this.grad3[Q],O,ie,Z)),32*(s+r+a+o)}noise4d(e,t,i,s){const r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,d,u,f,m;const v=(e+t+i+s)*l,p=Math.floor(e+v),g=Math.floor(t+v),_=Math.floor(i+v),b=Math.floor(s+v),y=(p+g+_+b)*c,S=p-y,E=g-y,R=_-y,x=b-y,w=e-S,L=t-E,C=i-R,F=s-x,H=w>L?32:0,X=w>C?16:0,V=L>C?8:0,k=w>F?4:0,O=L>F?2:0,ie=C>F?1:0,Z=H+X+V+k+O+ie,ce=a[Z][0]>=3?1:0,de=a[Z][1]>=3?1:0,ue=a[Z][2]>=3?1:0,Ne=a[Z][3]>=3?1:0,tt=a[Z][0]>=2?1:0,Je=a[Z][1]>=2?1:0,Q=a[Z][2]>=2?1:0,ne=a[Z][3]>=2?1:0,se=a[Z][0]>=1?1:0,be=a[Z][1]>=1?1:0,ye=a[Z][2]>=1?1:0,Le=a[Z][3]>=1?1:0,St=w-ce+c,Ge=L-de+c,Ye=C-ue+c,it=F-Ne+c,He=w-tt+2*c,dt=L-Je+2*c,D=C-Q+2*c,xt=F-ne+2*c,$e=w-se+3*c,rt=L-be+3*c,xe=C-ye+3*c,T=F-Le+3*c,A=w-1+4*c,U=L-1+4*c,K=C-1+4*c,ee=F-1+4*c,q=p&255,pe=g&255,N=_&255,G=b&255,oe=o[q+o[pe+o[N+o[G]]]]%32,J=o[q+ce+o[pe+de+o[N+ue+o[G+Ne]]]]%32,te=o[q+tt+o[pe+Je+o[N+Q+o[G+ne]]]]%32,fe=o[q+se+o[pe+be+o[N+ye+o[G+Le]]]]%32,me=o[q+1+o[pe+1+o[N+1+o[G+1]]]]%32;let he=.6-w*w-L*L-C*C-F*F;he<0?h=0:(he*=he,h=he*he*this._dot4(r[oe],w,L,C,F));let Oe=.6-St*St-Ge*Ge-Ye*Ye-it*it;Oe<0?d=0:(Oe*=Oe,d=Oe*Oe*this._dot4(r[J],St,Ge,Ye,it));let I=.6-He*He-dt*dt-D*D-xt*xt;I<0?u=0:(I*=I,u=I*I*this._dot4(r[te],He,dt,D,xt));let le=.6-$e*$e-rt*rt-xe*xe-T*T;le<0?f=0:(le*=le,f=le*le*this._dot4(r[fe],$e,rt,xe,T));let re=.6-A*A-U*U-K*K-ee*ee;return re<0?m=0:(re*=re,m=re*re*this._dot4(r[me],A,U,K,ee)),27*(h+d+u+f+m)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,s){return e[0]*t+e[1]*i+e[2]*s}_dot4(e,t,i,s,r){return e[0]*t+e[1]*i+e[2]*s+e[3]*r}}const Qa={defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new De},cameraProjectionMatrix:{value:new ke},cameraInverseProjectionMatrix:{value:new ke},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		#ifdef USE_REVERSED_DEPTH_BUFFER

			const float depthThreshold = 0.0;

		#else

			const float depthThreshold = 1.0;

		#endif

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == depthThreshold ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},Ka={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Ja={uniforms:{tDiffuse:{value:null},resolution:{value:new De}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`},mo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Tn extends kn{constructor(e,t,i=512,s=512,r=32){super(),this.width=i,this.height=s,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();const a=new rr;a.format=Pn,a.type=ir,this.normalRenderTarget=new jt(this.width,this.height,{minFilter:bt,magFilter:bt,type:ei,depthTexture:a}),this.ssaoRenderTarget=new jt(this.width,this.height,{type:ei}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Ut({defines:Object.assign({},Qa.defines),uniforms:Li.clone(Qa.uniforms),vertexShader:Qa.vertexShader,fragmentShader:Qa.fragmentShader,blending:Gt}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Wg,this.normalMaterial.blending=Gt,this.blurMaterial=new Ut({defines:Object.assign({},Ja.defines),uniforms:Li.clone(Ja.uniforms),vertexShader:Ja.vertexShader,fragmentShader:Ja.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Ut({defines:Object.assign({},Ka.defines),uniforms:Li.clone(Ka.uniforms),vertexShader:Ka.vertexShader,fragmentShader:Ka.fragmentShader,blending:Gt}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Ut({uniforms:Li.clone(mo.uniforms),vertexShader:mo.vertexShader,fragmentShader:mo.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Yf,blendDst:cc,blendEquation:Gi,blendSrcAlpha:qf,blendDstAlpha:cc,blendEquationAlpha:Gi}),this._fsQuad=new xr(null),this._originalClearColor=new Te}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,i){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case Tn.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Gt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case Tn.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Gt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case Tn.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:i);break;case Tn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Gt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case Tn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Th,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,i,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,s,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_generateSampleKernel(e){const t=this.kernel;for(let i=0;i<e;i++){const s=new P;s.x=Math.random()*2-1,s.y=Math.random()*2-1,s.z=Math.random(),s.normalize();let r=i/e;r=Ie.lerp(.1,1,r*r),s.multiplyScalar(r),t.push(s)}}_generateRandomKernelRotations(){const i=new ky,s=16,r=new Float32Array(s);for(let a=0;a<s;a++){const o=Math.random()*2-1,l=Math.random()*2-1,c=0;r[a]=i.noise3d(o,l,c)}this.noiseTexture=new qo(r,4,4,zo,ui),this.noiseTexture.wrapS=Un,this.noiseTexture.wrapT=Un,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}}Tn.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};const $a={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Vy extends kn{constructor(e,t,i){super(),this.scene=e,this.camera=t;const s=i.focus!==void 0?i.focus:1,r=i.aperture!==void 0?i.aperture:.025,a=i.maxblur!==void 0?i.maxblur:1;this._renderTargetDepth=new jt(1,1,{minFilter:bt,magFilter:bt,type:ei}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new mp,this._materialDepth.depthPacking=Om,this._materialDepth.blending=Gt;const o=Li.clone($a.uniforms);o.tDepth.value=this._renderTargetDepth.texture,o.focus.value=s,o.aspect.value=t.aspect,o.aperture.value=r,o.maxblur.value=a,o.nearClip.value=t.near,o.farClip.value=t.far,this.materialBokeh=new Ut({defines:Object.assign({},$a.defines),uniforms:o,vertexShader:$a.vertexShader,fragmentShader:$a.fragmentShader}),this.uniforms=o,this._fsQuad=new xr(this.materialBokeh),this._oldClearColor=new Te}render(e,t,i){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);const s=e.getClearAlpha(),r=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=i.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(s),e.autoClear=r}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}class Zd extends Tn{packed;sharing=!0;savedColor=new Te;depthClear=new Float32Array([1,1,1,1]);constructor(e,t,i,s,r=32){super(e,t,i,s,r),this.ssaoRenderTarget.depthBuffer=!1,this.blurRenderTarget.depthBuffer=!1,this.packed=this.normalRenderTarget.texture.clone(),this.packed.name="Archive.packedDepth",this.normalRenderTarget.textures.push(this.packed),this.normalMaterial.onBeforeCompile=a=>{this.sharing&&(a.vertexShader=`varying vec2 vArchiveZW;
`+a.vertexShader,a.vertexShader=a.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
vArchiveZW = gl_Position.zw;`),a.fragmentShader=`varying vec2 vArchiveZW;
layout(location = 1) out vec4 archivePackedDepth;
#include <packing>
`+a.fragmentShader,a.fragmentShader=a.fragmentShader.replace("void main() {",`void main() {
archivePackedDepth = packDepthToRGBA(0.5 * vArchiveZW.x / vArchiveZW.y + 0.5);`))},this.normalMaterial.customProgramCacheKey=()=>`archive-normal-packed-depth-v1-${this.sharing}`}render(e,t,i,s,r){const a=[];this.scene.traverseVisible(o=>{o.userData.excludeFromAO&&a.push(o)});for(const o of a)o.visible=!1;try{super.render(e,t,i,s,r)}finally{for(const o of a)o.visible=!0}}setSharing(e){e!==this.sharing&&(this.normalRenderTarget.dispose(),this.sharing=e,this.normalRenderTarget.textures.length=1,e&&this.normalRenderTarget.textures.push(this.packed),this.normalMaterial.needsUpdate=!0)}_renderOverride(e,t,i,s,r){e.getClearColor(this.savedColor);const a=e.getClearAlpha(),o=e.autoClear,l=this.scene.overrideMaterial;e.setRenderTarget(i),e.autoClear=!1,e.setClearColor(s,r),e.clear();const c=e.getContext();this.sharing&&c.clearBufferfv(c.COLOR,1,this.depthClear),this.scene.overrideMaterial=t;try{e.render(this.scene,this.camera)}finally{this.scene.overrideMaterial=l,e.autoClear=o,e.setClearColor(this.savedColor,a)}}}class zy extends Vy{constructor(e,t,i,s){super(e,t,i),this.source=s,this.quad=new xr(this.materialBokeh)}source;width=1;height=1;quad;setSize(e,t){super.setSize(e,t),this.width=e,this.height=t}render(e,t,i,s,r){const a=this.source(),o=this.uniforms;if(!a.enabled||a.width!==this.width||a.height!==this.height)return super.render(e,t,i,s,r);const l=o.tDepth.value;o.tDepth.value=a.normalRenderTarget.textures[1],o.tColor.value=i.texture,o.nearClip.value=this.camera.near,o.farClip.value=this.camera.far;const c=e.autoClear;e.autoClear=!1,e.setRenderTarget(this.renderToScreen?null:t),this.renderToScreen||e.clear();try{this.quad.render(e)}finally{o.tDepth.value=l,e.autoClear=c}}dispose(){super.dispose(),this.quad.dispose()}}function sh(n){const e=new Set,t=new Set,i=new Set;n.traverse(s=>{if(s instanceof nt){s instanceof ls&&s.dispose(),e.add(s.geometry);for(const r of[s.material,s.userData.fullMaterial,s.userData.fastMaterial].flat())r instanceof pi&&t.add(r)}});for(const s of t){for(const r of Object.values(s))r instanceof wt&&i.add(r);s.dispose()}n instanceof Xo&&(n.environment&&i.add(n.environment),n.background instanceof wt&&i.add(n.background)),e.forEach(s=>s.dispose()),i.forEach(s=>s.dispose()),n.clear()}const Qd=n=>`${n.lane}:${n.row}`,Kd=n=>(n=Math.max(0,Math.min(1,n)),n*n*(3-2*n));class Gy{target=0;start=-10;origin={row:12,lane:2};from=new Map;latest=new Map;backgroundFrom=0;set(e,t,i,s=!1){const r=e?1:0;r===this.target&&!s||(this.backgroundFrom=s?r:this.background(t),this.from=s?new Map:new Map(this.latest),this.target=r,this.start=s?t-10:t,this.origin={...i})}background(e){return this.backgroundFrom+(this.target-this.backgroundFrom)*Kd((e-this.start)/.85)}beginFrame(){this.latest.clear()}sample(e,t){if(t-this.start>=1.18)return this.target;const i=Math.min(.6,Math.abs(e.row-this.origin.row)*.034+Math.abs(e.lane-this.origin.lane)*.11),s=this.from.get(Qd(e))??this.backgroundFrom,r=s+(this.target-s)*Kd((t-this.start-i)/.58);return this.latest.set(Qd(e),r),r}}const Wy={Frosted_Polymer:"#626b70",Ivory_Edges:"#687277",Optical_Diffuser:"#192226",Titanium_Fasteners:"#b1b9bb",Index_Inlay:"#c6a36b",Printed_Label:"#303a3e",Subsurface_Optics:"#939e9f",Optical_Edges:"#bbc3bc",Carbon_Ink:"#b6bdb8"};function Ro(n,e,t=!1,i={value:0}){const s={value:0},r=n.onBeforeCompile,a=n.customProgramCacheKey.bind(n)(),o=new Te(Wy[e]??(e.includes("Orange")?"#bb8850":"#969f9f"));return n.onBeforeCompile=(l,c)=>{r.call(n,l,c),l.uniforms.rhineTheme=s,l.uniforms.rhineDarkSurface={value:o},l.uniforms.rhineSubduedIndex=i,t&&(l.vertexShader=`attribute float archiveTheme; varying float vRhineTheme;
`+l.vertexShader,l.vertexShader=l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vRhineTheme = archiveTheme;`),l.fragmentShader=`varying float vRhineTheme;
`+l.fragmentShader),l.fragmentShader=`uniform float rhineTheme; uniform vec3 rhineDarkSurface; uniform float rhineSubduedIndex;
`+l.fragmentShader;const h=t?"vRhineTheme":"rhineTheme",d=e==="Printed_Canvas",u=d?"#include <opaque_fragment>":"#include <roughnessmap_fragment>",f=d?"mix(vec3(0.023, 0.032, 0.037), vec3(0.78, 0.78, 0.71), 1.0 - smoothstep(0.12, 0.65, dot(diffuseColor.rgb, vec3(.2126,.7152,.0722))))":e==="Frosted_Polymer"&&!t?"mix(rhineDarkSurface, vec3(0.92, 0.96, 0.97), glassRevealAtHeight(archiveClarity, vArchiveHeight))":e==="Index_Inlay"?"mix(rhineDarkSurface, vec3(0.030, 0.042, 0.048), rhineSubduedIndex)":"rhineDarkSurface",m=d?"outgoingLight":"diffuseColor.rgb";l.fragmentShader=l.fragmentShader.replace(u,`${m} = mix(${m}, ${f}, ${h});
${u}`)},n.customProgramCacheKey=()=>`${a}-rhine-theme-${e}-${t}`,s}const Jd=new WeakMap,Xy=new Te("#11181b"),qy=new Te("#192125"),Yy=new Te("#263136");function Pp(n,e,t){let i=Jd.get(n);if(!i){const s=[];n.traverse(o=>{o instanceof da&&s.push({light:o,intensity:o.intensity})});const a=n.getObjectByName("archive-floor")?.material;i={background:n.background.clone(),fog:n.fog?.color.clone(),intensity:n.environmentIntensity,exposure:e.toneMappingExposure,lights:s,floor:a?{material:a,color:a.color.clone()}:void 0},Jd.set(n,i)}n.background.copy(i.background).lerp(Xy,t),n.fog&&i.fog&&n.fog.color.copy(i.fog).lerp(Yy,t),i.floor&&i.floor.material.color.copy(i.floor.color).lerp(qy,t),n.environmentIntensity=Ie.lerp(i.intensity,.32,t),e.toneMappingExposure=Ie.lerp(i.exposure,.98,t);for(const{light:s,intensity:r}of i.lights)s.intensity=r*(1-.35*t)}const ns=(n,e=0,t=1)=>Math.min(t,Math.max(e,n)),$d=()=>({low:0,mid:0,high:0,activity:0});function jy(n,e,t,i,s){const r=i.low*.8*(.5+.5*Math.sin(n*.29-e*.5-t*2.7)),a=i.mid*.48*(.5+.5*Math.sin(n*.72+e*.9-t*4.3)),o=i.high*.18*Math.pow(Math.max(0,Math.sin(n*1.7-e*2.2-t*6.4)),4);return ns((r+a+o)*ns(s,0,2),0,1.8)}class Zy{weights={legacy:1,wave:0,lift:0};update(e,t,i,s){for(const r of["legacy","wave","lift"])this.weights[r]+=((s===r?1:0)-this.weights[r])*(1-Math.exp(-ns(i,0,.1)*5));return{style:{...this.weights}}}}function Qy(n,e,t,i,s,r,a=.5){a=ns(a);const o=m=>m*m*(3-2*m),l=o(ns((a-.5)*2)),c=1-o(ns(a*2)),h=1-c-l,u=(i.low*c+i.mid*h+i.high*l)*(.72+.28*Math.sin(n*.32-t*2.2))*.95,f=i.low*.62*(.55+.45*Math.sin(n*.22+e*.18-t*1.8))+i.mid*.42*(.55+.45*Math.sin(n*.38-e*.27-t*2.8))+i.high*.28*(.55+.45*Math.sin(n*.62+e*.4-t*4.1));return jy(n,e,t,i,s)*r.style.legacy+(r.style.wave*u+r.style.lift*f)*ns(s,0,2)}function ef(n,e){if(e===Nm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Zc||e===ip){let t=n.getIndex();if(t===null){const a=[],o=n.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);n.setIndex(a),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const i=t.count-2,s=[];if(e===Zc)for(let a=1;a<=i;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=n.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function Ky(n){const e=new Map,t=new Map,i=n.clone();return Dp(n,i,function(s,r){e.set(r,s),t.set(s,r)}),i.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),i}function Dp(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)Dp(n.children[i],e.children[i],t)}class tf extends vr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new iM(t)}),this.register(function(t){return new nM(t)}),this.register(function(t){return new dM(t)}),this.register(function(t){return new fM(t)}),this.register(function(t){return new pM(t)}),this.register(function(t){return new rM(t)}),this.register(function(t){return new aM(t)}),this.register(function(t){return new oM(t)}),this.register(function(t){return new lM(t)}),this.register(function(t){return new tM(t)}),this.register(function(t){return new cM(t)}),this.register(function(t){return new sM(t)}),this.register(function(t){return new uM(t)}),this.register(function(t){return new hM(t)}),this.register(function(t){return new $y(t)}),this.register(function(t){return new nf(t,Ke.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new nf(t,Ke.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new mM(t)})}load(e,t,i,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=Wr.extractUrlBase(e);a=Wr.resolveURL(c,this.path)}else a=Wr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Ap(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Lp){try{a[Ke.KHR_BINARY_GLTF]=new gM(e)}catch(d){s&&s(d);return}r=JSON.parse(a[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new RM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case Ke.KHR_MATERIALS_UNLIT:a[d]=new eM;break;case Ke.KHR_DRACO_MESH_COMPRESSION:a[d]=new vM(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:a[d]=new AM;break;case Ke.KHR_MESH_QUANTIZATION:a[d]=new xM;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,s)}parseAsync(e,t){const i=this;return new Promise(function(s,r){i.parse(e,t,s,r)})}}function Jy(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function Lt(n,e,t){const i=n.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class $y{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,s=t.length;i<s;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let s=t.cache.get(i);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Te(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],ti);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Jc(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new _p(h),c.distance=d;break;case"spot":c=new cv(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),ki(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(i,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class eM{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Yi}extendParams(e,t,i){const s=[];e.color=new Te(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],ti),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(i.assignTexture(e,"map",r.baseColorTexture,Pt))}return Promise.all(s)}}class tM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class iM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new De(r,r)}return Promise.all(s)}}class nM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class sM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(s)}}class rM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];if(t.sheenColor=new Te(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],ti)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,Pt)),i.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(s)}}class aM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(s)}}class oM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return t.attenuationColor=new Te().setRGB(r[0],r[1],r[2],ti),Promise.all(s)}}class lM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5),Promise.resolve()}}class cM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return t.specularColor=new Te().setRGB(r[0],r[1],r[2],ti),i.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,Pt)),Promise.all(s)}}class hM{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(s)}}class uM{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Lt(this.parser,e,this.name)!==null?Ji:null}extendMaterialParams(e,t){const i=Lt(this.parser,e,this.name);if(i===null)return Promise.resolve();const s=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(s)}}class dM{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,s=i.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class fM{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class pM{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,i=this.parser,s=i.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class nf{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const s=i.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,d=s.byteStride,u=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,u,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(f),h,d,u,s.mode,s.filter),f})})}else return null}}class mM{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const s=t.meshes[i.mesh];for(const c of s.primitives)if(c.mode!==xi.TRIANGLES&&c.mode!==xi.TRIANGLE_STRIP&&c.mode!==xi.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const m of d){const v=new ke,p=new P,g=new Ni,_=new P(1,1,1),b=new ls(m.geometry,m.material,u);for(let y=0;y<u;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),b.setMatrixAt(y,v.compose(p,g,_));for(const y in l)if(y==="_COLOR_0"){const S=l[y];b.instanceColor=new os(S.array,S.itemSize,S.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&m.geometry.setAttribute(y,l[y]);yt.prototype.copy.call(b,m),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Lp="glTF",Nr=12,sf={JSON:1313821514,BIN:5130562};class gM{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Nr),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Lp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Nr,r=new DataView(e,Nr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===sf.JSON){const c=new Uint8Array(e,Nr+a,o);this.content=i.decode(c)}else if(l===sf.BIN){const c=Nr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class vM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const d=rh[h]||h.toLowerCase();o[d]=a[h]}for(const h in e.attributes){const d=rh[h]||h.toLowerCase();if(a[h]!==void 0){const u=i.accessors[e.attributes[h]],f=Zs[u.componentType];c[d]=f.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){s.decodeDracoFile(h,function(f){for(const m in f.attributes){const v=f.attributes[m],p=l[m];p!==void 0&&(v.normalized=p)}d(f)},o,c,ti,u)})})}}class AM{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class xM{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class Ip extends pr{constructor(e,t,i,s){super(e,t,i,s)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,d=(i-t)/h,u=d*d,f=u*d,m=e*c,v=m-c,p=-2*f+3*u,g=f-u,_=1-p,b=g-u+d;for(let y=0;y!==o;y++){const S=a[v+y+o],E=a[v+y+l]*h,R=a[m+y+o],x=a[m+y]*h;r[y]=_*S+b*E+p*R+g*x}return r}}const _M=new Ni;class yM extends Ip{interpolate_(e,t,i,s){const r=super.interpolate_(e,t,i,s);return _M.fromArray(r).normalize().toArray(r),r}}const xi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Zs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},rf={9728:bt,9729:Nt,9984:Zf,9985:lo,9986:kr,9987:cn},af={33071:Wi,33648:Mo,10497:Un},Zl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},rh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},bn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},MM={CUBICSPLINE:void 0,LINEAR:Jr,STEP:Kr},Ql={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function bM(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new ds({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Zi})),n.DefaultMaterial}function Jn(n,e,t){for(const i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function ki(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function SM(n,e,t){let i=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),i&&s&&r)break}if(!i&&!s&&!r)return Promise.resolve(n);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c];if(i){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;a.push(u)}if(s){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;o.push(u)}if(r){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;l.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],d=c[1],u=c[2];return i&&(n.morphAttributes.position=h),s&&(n.morphAttributes.normal=d),r&&(n.morphAttributes.color=u),n.morphTargetsRelative=!0,n})}function wM(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,s=t.length;i<s;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function EM(n){let e;const t=n.extensions&&n.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Kl(t.attributes):e=n.indices+":"+Kl(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,s=n.targets.length;i<s;i++)e+=":"+Kl(n.targets[i]);return e}function Kl(n){let e="";const t=Object.keys(n).sort();for(let i=0,s=t.length;i<s;i++)e+=t[i]+":"+n[t[i]]+";";return e}function ah(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function TM(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const CM=new ke;class RM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Jy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&s<17||r&&a<98?this.textureLoader=new av(this.options.manager):this.textureLoader=new dv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ap(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:i,userData:{}};return Jn(r,o,s),ki(o,s),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const s=i.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(i,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const s=e(t[i]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&i.push(r)}return i}getDependency(e,t){const i=e+":"+t;let s=this.cache.get(i);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(i,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){i.load(Wr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const s=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+s)})}loadAccessor(e){const t=this,i=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Zl[s.type],o=Zs[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new $t(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Zl[s.type],c=Zs[s.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=s.byteOffset||0,f=s.bufferView!==void 0?i.bufferViews[s.bufferView].byteStride:void 0,m=s.normalized===!0;let v,p;if(f&&f!==d){const g=Math.floor(u/f),_="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let b=t.cache.get(_);b||(v=new c(o,g*f,s.count*f/h),b=new Tg(v,f/h),t.cache.add(_,b)),p=new qh(b,l,u%f/h,m)}else o===null?v=new c(s.count*l):v=new c(o,u,s.count*l),p=new $t(v,l,m);if(s.sparse!==void 0){const g=Zl.SCALAR,_=Zs[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,S=new _(a[1],b,s.sparse.count*g),E=new c(a[2],y,s.sparse.count*l);o!==null&&(p=new $t(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let R=0,x=S.length;R<x;R++){const w=S[R];if(p.setX(w,E[R*l]),l>=2&&p.setY(w,E[R*l+1]),l>=3&&p.setZ(w,E[R*l+2]),l>=4&&p.setW(w,E[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=m}return p})}loadTexture(e){const t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(r.samplers||{})[a.sampler]||{};return h.magFilter=rf[u.magFilter]||Nt,h.minFilter=rf[u.minFilter]||cn,h.wrapS=af[u.wrapS]||Un,h.wrapT=af[u.wrapT]||Un,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==bt&&h.minFilter!==Nt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(d){c=!0;const u=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(u),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(d){return new Promise(function(u,f){let m=u;t.isImageBitmapLoader===!0&&(m=function(v){const p=new wt(v);p.needsUpdate=!0,u(p)}),t.load(Wr.resolveURL(d,r.path),m,void 0,f)})}).then(function(d){return c===!0&&o.revokeObjectURL(l),ki(d,a),d.userData.mimeType=a.mimeType||TM(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=h,h}assignTexture(e,t,i,s){const r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new hp,pi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new cp,pi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(s||r||a){let o="ClonedMaterial:"+i.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return ds}loadMaterial(e){const t=this,i=this.json,s=this.extensions,r=i.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[Ke.KHR_MATERIALS_UNLIT]){const d=s[Ke.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),c.push(d.extendParams(o,r,t))}else{const d=r.pbrMetallicRoughness||{};if(o.color=new Te(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],ti),o.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,Pt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=zi);const h=r.alphaMode||Ql.OPAQUE;if(h===Ql.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Ql.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Yi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new De(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==Yi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Yi){const d=r.emissiveFactor;o.emissive=new Te().setRGB(d[0],d[1],d[2],ti)}return r.emissiveTexture!==void 0&&a!==Yi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Pt)),Promise.all(c).then(function(){const d=new a(o);return r.name&&(d.name=r.name),ki(d,r),t.associations.set(d,{materials:e}),r.extensions&&Jn(s,d,r),d})}createUniqueName(e){const t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,s=this.primitiveCache;function r(o){return i[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return of(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=EM(c),d=s[h];if(d)a.push(d.promise);else{let u;c.extensions&&c.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?u=r(c):u=of(new mi,c,t),s[h]={primitive:c,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,s=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?bM(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let f=0,m=h.length;f<m;f++){const v=h[f],p=a[f];let g;const _=c[f];if(p.mode===xi.TRIANGLES||p.mode===xi.TRIANGLE_STRIP||p.mode===xi.TRIANGLE_FAN||p.mode===void 0)g=r.isSkinnedMesh===!0?new Dg(v,_):new nt(v,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),p.mode===xi.TRIANGLE_STRIP?g.geometry=ef(g.geometry,ip):p.mode===xi.TRIANGLE_FAN&&(g.geometry=ef(g.geometry,Zc));else if(p.mode===xi.LINES)g=new Fg(v,_);else if(p.mode===xi.LINE_STRIP)g=new jh(v,_);else if(p.mode===xi.LINE_LOOP)g=new Bg(v,_);else if(p.mode===xi.POINTS)g=new Hg(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(g.geometry.morphAttributes).length>0&&wM(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),ki(g,r),p.extensions&&Jn(s,g,p),t.assignFinalMaterial(g),d.push(g)}for(let f=0,m=d.length;f<m;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Jn(s,d[0],r),d[0];const u=new qi;r.extensions&&Jn(s,u,r),t.associations.set(u,{meshes:e});for(let f=0,m=d.length;f<m;f++)u.add(d[f]);return u})}loadCamera(e){let t;const i=this.json.cameras[e],s=i[i.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Wt(Ie.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):i.type==="orthographic"&&(t=new fa(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),ki(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let s=0,r=t.joints.length;s<r;s++)i.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const d=a[c];if(d){o.push(d);const u=new ke;r!==null&&u.fromArray(r.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Yh(o,l)})}loadAnimation(e){const t=this.json,i=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let d=0,u=s.channels.length;d<u;d++){const f=s.channels[d],m=s.samplers[f.sampler],v=f.target,p=v.node,g=s.parameters!==void 0?s.parameters[m.input]:m.input,_=s.parameters!==void 0?s.parameters[m.output]:m.output;v.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",_)),c.push(m),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],m=d[2],v=d[3],p=d[4],g=[];for(let b=0,y=u.length;b<y;b++){const S=u[b],E=f[b],R=m[b],x=v[b],w=p[b];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const L=i._createAnimationTracks(S,E,R,x,w);if(L)for(let C=0;C<L.length;C++)g.push(L[C])}const _=new $g(r,void 0,g);return ki(_,s),_})}createNodeMesh(e){const t=this.json,i=this,s=t.nodes[e];return s.mesh===void 0?null:i.getDependency("mesh",s.mesh).then(function(r){const a=i._getNodeRef(i.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,i=this,s=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,CM)});for(let f=0,m=d.length;f<m;f++)h.add(d[f]);if(h.userData.pivot!==void 0&&d.length>0){const f=h.userData.pivot,m=d[0];h.pivot=new P().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],m.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new lp:c.length>1?h=new qi:c.length===1?h=c[0]:h=new yt,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(r.name&&(h.userData.name=r.name,h.name=a),ki(h,r),r.extensions&&Jn(i,h,r),r.matrix!==void 0){const d=new ke;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const d=s.associations.get(h);s.associations.set(h,{...d})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],s=this,r=new qi;i.name&&(r.name=s.createUniqueName(i.name)),ki(r,i),i.extensions&&Jn(t,r,i);const a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,d=l.length;h<d;h++){const u=l[h];u.parent!==null?r.add(Ky(u)):r.add(u)}const c=h=>{const d=new Map;for(const[u,f]of s.associations)(u instanceof pi||u instanceof wt)&&d.set(u,f);return h.traverse(u=>{const f=s.associations.get(u);f!=null&&d.set(u,f)}),d};return s.associations=c(r),r})}_createAnimationTracks(e,t,i,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];bn[r.path]===bn.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(o);let c;switch(bn[r.path]){case bn.weights:c=or;break;case bn.rotation:c=lr;break;case bn.translation:case bn.scale:c=cr;break;default:i.itemSize===1?c=or:c=cr;break}const h=s.interpolation!==void 0?MM[s.interpolation]:Jr,d=this._getArrayFromAccessor(i);for(let u=0,f=l.length;u<f;u++){const m=new c(l[u]+"."+bn[r.path],t.array,d,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=ah(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*i;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const s=this instanceof lr?yM:Ip;return new s(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function PM(n,e,t){const i=e.attributes,s=new bi;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new P(l[0],l[1],l[2]),new P(c[0],c[1],c[2])),o.normalized){const h=ah(Zs[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new P,l=new P;for(let c=0,h=r.length;c<h;c++){const d=r[c];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,m=u.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),u.normalized){const v=ah(Zs[u.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}n.boundingBox=s;const a=new Ki;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,n.boundingSphere=a}function of(n,e,t){const i=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){n.setAttribute(o,l)})}for(const a in i){const o=rh[a]||a.toLowerCase();o in n.attributes||s.push(r(i[a],o))}if(e.indices!==void 0&&!n.index){const a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});s.push(a)}return et.workingColorSpace!==ti&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),ki(n,e),PM(n,e,t),Promise.all(s).then(function(){return e.targets!==void 0?SM(n,e.targets,t):n})}class DM extends Xo{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new fr;e.deleteAttribute("uv");const t=new ds({side:Jt}),i=new ds,s=new _p(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new nt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new ls(e,i,6),o=new yt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new nt(e,Us(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new nt(e,Us(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new nt(e,Us(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new nt(e,Us(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new nt(e,Us(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new nt(e,Us(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Us(n){return new Xg({color:0,emissive:16777215,emissiveIntensity:n})}function Np(n,e,t="baseline"){const i=t==="refined";n.toneMappingExposure=i?1:1.05;const s=new eh(n),r=new DM;e.environment=s.fromScene(r,.04).texture,r.dispose(),s.dispose(),e.environmentIntensity=i?.52:.48,e.add(new ov("#fffaf5",i?"#b49b80":"#b4a18c",i?.5:.65));const a=new Jc(i?"#fff4e5":"#fff7ed",i?1.7:1.4);a.position.set(...i?[-8,14,4]:[-6,14,-5]);const o=new Jc("#ffffff",i?.3:.6);return o.position.set(7,8,-10),e.add(a,o),a}class LM extends kn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ut?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Li.clone(e.uniforms),this.material=new Ut({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new xr(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class lf extends kn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class IM extends kn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Up{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new De);this._width=i.width,this._height=i.height,t=new jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ei}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new LM(mo),this.copyPass.material.blending=Gt,this.timer=new mv}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}lf!==void 0&&(a instanceof lf?i=!0:a instanceof IM&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new De);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Op extends kn{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Te}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const eo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Fp extends kn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Li.clone(eo.uniforms),this.material=new pp({name:eo.name,uniforms:this.uniforms,vertexShader:eo.vertexShader,fragmentShader:eo.fragmentShader}),this._fsQuad=new xr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},et.getTransfer(this._outputColorSpace)===lt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Rh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ph?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Dh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ha?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ih?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Nh?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Lh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const to={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new De(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},io={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new De(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Jl={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new De(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class Bp extends kn{constructor(){super(),this._edgesRT=new jt(1,1,{depthBuffer:!1,type:ei}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new jt(1,1,{depthBuffer:!1,type:ei}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new wt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=Nt,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const i=new Image;i.src=this._getSearchTexture(),i.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new wt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=i,this._searchTexture.magFilter=bt,this._searchTexture.minFilter=bt,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=Li.clone(to.uniforms),this._materialEdges=new Ut({defines:Object.assign({},to.defines),uniforms:this._uniformsEdges,vertexShader:to.vertexShader,fragmentShader:to.fragmentShader}),this._uniformsWeights=Li.clone(io.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new Ut({defines:Object.assign({},io.defines),uniforms:this._uniformsWeights,vertexShader:io.vertexShader,fragmentShader:io.fragmentShader}),this._uniformsBlend=Li.clone(Jl.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new Ut({uniforms:this._uniformsBlend,vertexShader:Jl.vertexShader,fragmentShader:Jl.fragmentShader}),this._fsQuad=new xr(null)}render(e,t,i){this._uniformsEdges.tDiffuse.value=i.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=i.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}function oh(n,e,t){const i=Math.min(t.anisotropy,e.capabilities.getMaxAnisotropy()),s=new Set;n.traverse(r=>{if(r instanceof nt)for(const a of Array.isArray(r.material)?r.material:[r.material])for(const o of Object.values(a))o instanceof wt&&!o.isRenderTargetTexture&&s.add(o)});for(const r of s)r.anisotropy!==i&&(r.anisotropy=i,r.needsUpdate=!0)}function Hp(n,e,t,i,s=!1){const r=Math.max(1,t.clientWidth),a=Math.max(1,t.clientHeight),o=rm(i,r,a,t.getBoundingClientRect().width/r,devicePixelRatio,n.capabilities.maxTextureSize,s?921600:8294400);return n.setPixelRatio(o.ratio),n.setSize(r,a),e.setPixelRatio(o.ratio),e.setSize(r,a),n.transmissionResolutionScale=i.transmission,t.dataset.renderQuality=JSON.stringify({...o,antialias:i.antialias,transmission:i.transmission,anisotropy:Math.min(i.anisotropy,n.capabilities.getMaxAnisotropy()),superPerformance:s}),o}function NM(n,e,t){const i=new Up(n),s=new Bp;return i.addPass(new Op(e,t)),i.addPass(s),i.addPass(new Fp),{composer:i,smaa:s}}const cf=.12,kp=.42,$l=.025,UM=.016,OM=`
float archiveTransmissionLod(float roughness, float ior, vec2 samplerSize) {
  float nativeLod = log2(samplerSize.x) * roughness * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
  float strength = clamp((roughness - ${$l}) / ${kp-$l}, 0.0, 1.0);
  float panelPixels = length(vArchiveProjectedAxis * samplerSize);
  float clearLod = log2(samplerSize.x) * ${$l} * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
  float boundedLod = log2(max(exp2(clearLod), panelPixels * ${UM} * pow(strength, 1.15)));
  return mix(nativeLod, min(nativeLod, boundedLod), archiveQuality);
}`,FM=`
float glassRevealAtHeight(float progress, float height) {
  float edge = 1.0 - ${1+2*cf} * clamp(progress, 0.0, 1.0);
  return smoothstep(edge, edge + ${2*cf}, clamp(height, 0.0, 1.0));
}`,BM={Optical_Glass_Body:{color:"#929894",roughness:.38,opacity:.27,order:20},Optical_Glass_Roof:{color:"#929b94",roughness:.34,opacity:.42,order:24},Optical_Glass_Edge:{color:"#edf0e7",roughness:.19,opacity:.9,order:28},Optical_Bridge_Glass:{color:"#a0aca2",roughness:.32,opacity:.36,order:26}};function HM(n,e){const t=BM[n];t&&(e.color.set(t.color),e.roughness=t.roughness,e.metalness=.015,e.clearcoat=.42,e.clearcoatRoughness=.24,e.opacity=t.opacity,e.transmission=0,e.transparent=!1,e.blending=Th,e.blendEquation=Gi,e.blendSrc=yo,e.blendDst=Zr,e.blendSrcAlpha=Xf,e.blendDstAlpha=Zr,e.depthWrite=!1,e.side=Zi,e.userData.opticalOrder=t.order)}function kM(n){return n.replace("#include <opaque_fragment>",`diffuseColor.a = min(0.86, opacity + 0.42 * pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 3.0));
     #include <opaque_fragment>`)}class VM{palettes=new Map;disposeSources(){for(const e of this.palettes.values())e.high.dispose(),e.low?.dispose();this.palettes.clear()}register(e,t,i){this.palettes.set(e,{high:t,low:i})}prepare(e){for(const t of e.children){const i=t,s=i.userData.surface,r=this.palettes.get(s);if(i.userData.photoPrint)continue;if(!r){i.userData.themeAmount=Ro(i.material,"Printed_Canvas");continue}const a=r.high.clone(),o={value:0},l={value:0};i.material=a,a.userData.opticalOrder&&(i.renderOrder=a.userData.opticalOrder),i.userData.appearance=o,i.userData.glassClarity=l,a.onBeforeCompile=c=>{a.userData.opticalOrder&&(c.fragmentShader=kM(c.fragmentShader)),c.uniforms.archiveQuality=o,c.uniforms.archiveClarity=l,c.fragmentShader=`uniform float archiveQuality;
uniform float archiveClarity;
`+c.fragmentShader,s==="Frosted_Polymer"?(c.vertexShader=`varying float vArchiveHeight;
varying vec2 vArchiveProjectedAxis;
`+c.vertexShader,c.vertexShader=c.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vArchiveHeight = position.y / 3.7;`),c.fragmentShader=`varying float vArchiveHeight;
varying vec2 vArchiveProjectedAxis;
`+FM+c.fragmentShader,c.vertexShader=c.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
vArchiveProjectedAxis = 1.85 * vec2(projectionMatrix[0][0] * modelViewMatrix[1][0], projectionMatrix[1][1] * modelViewMatrix[1][1]) / max(0.0001, abs(mvPosition.z));`),c.fragmentShader=c.fragmentShader.replace("#include <transmission_pars_fragment>",OM+`
`+We.transmission_pars_fragment.replace("float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );","float lod = archiveTransmissionLod(roughness, ior, transmissionSamplerSize);")),c.fragmentShader=c.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vArchiveHeight)), vec3(1.0), archiveQuality);`),c.fragmentShader=c.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(mix(0.28, ${kp}, archiveQuality), 0.025, glassRevealAtHeight(archiveClarity, vArchiveHeight));`)):r.low||(c.fragmentShader=c.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
float coverage = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
if (archiveQuality <= coverage) discard;`))},a.customProgramCacheKey=()=>`archive-surface-clarity-${s}-${!!r.low}`,i.userData.subduedIndex={value:0},i.userData.themeAmount=Ro(a,s,!1,i.userData.subduedIndex)}}setClarity(e,t){const i=Ie.clamp(t,0,1);e.traverse(s=>{if(!(s instanceof nt)||!s.userData.glassClarity||(s.userData.glassClarity.value=i,s.userData.surface!=="Frosted_Polymer"))return;const r=s.material,a=this.palettes.get("Frosted_Polymer"),o=s.userData.appearance.value,l=c=>Ie.lerp(a.low?.[c]??a.high[c],a.high[c],o);r.thickness=Ie.lerp(l("thickness"),.018,i),r.transmission=Ie.lerp(l("transmission"),.985,i),r.attenuationDistance=Ie.lerp(l("attenuationDistance"),8,i)})}setTheme(e,t,i=!1){e.traverse(s=>{s.userData.themeAmount&&(s.userData.themeAmount.value=t),s.userData.subduedIndex&&(s.userData.subduedIndex.value=Ie.clamp(Number(i),0,1))})}apply(e,t){for(const i of e.children){const s=i,r=this.palettes.get(s.userData.surface);if(!r){s.material.opacity=t;continue}s.userData.appearance.value=t;const{high:a,low:o}=r;if(!o)continue;const l=s.material;l.color.copy(o.color).lerp(a.color,t),l.attenuationColor&&o.attenuationColor&&a.attenuationColor&&(l.attenuationColor.copy(o.attenuationColor).lerp(a.attenuationColor,t),l.attenuationDistance=Number.isFinite(o.attenuationDistance)&&Number.isFinite(a.attenuationDistance)?Ie.lerp(o.attenuationDistance,a.attenuationDistance,t):a.attenuationDistance);for(const c of["roughness","metalness","transmission","thickness","clearcoat","clearcoatRoughness"])l[c]=Ie.lerp(o[c]??0,a[c]??0,t);a.transmission>0&&(l.transmission=Math.max(1e-6,l.transmission))}}dispose(e){for(const t of e.children){const i=t,s=i.material;i.userData.surface||s.map?.dispose(),s.dispose()}}}const Vp='<path d="M156 75C127 48 103 15 70 15C37 15 15 39 15 70S38 128 70 128C103 128 127 96 176 52M155 75C182 99 208 128 240 128C273 128 295 105 295 73S273 15 240 15C221 15 207 23 192 38" fill="none" stroke="currentColor" stroke-width="26"/><path d="M44 70h50M69 45v50M219 70h44" fill="none" stroke="currentColor" stroke-width="15"/>',zM=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 145" color="#171713">${Vp}</svg>`,ec=`<svg viewBox="0 0 310 185" aria-label="Rhine Lab" role="img">${Vp}<text x="165" y="174" text-anchor="middle" font-family="MiSans,sans-serif" font-size="16" font-weight="700" letter-spacing="22">RHINE·LAB</text></svg>`,GM="M295 73C295 41 273 15 240 15C221 15 207 23 192 38C186 43 181 47 176 52C127 96 103 128 70 128C38 128 15 101 15 70C15 39 37 15 70 15C103 15 127 48 156 75C182 99 208 128 240 128C273 128 295 105 295 73Z",WM=[2,28,55,81,103,129,154,166],XM=`<h1>RHINE LAB</h1><div>SYNTHESIZE INFORMATION</div><p><span class="brand-analysis" role="img" aria-label="ANALYSIS">${[..."ANALYSIS"].map((n,e)=>`<span aria-hidden="true" style="left:${WM[e]}px">${n}</span>`).join("")}</span> <b>OS</b></p>`,hf=[[9,16],[5,8],[3,5],[2,3],[5,7],[3,4],[4,5],[1,1],[5,4],[4,3],[3,2],[16,9],[9,19.5],[1,2],[2,1]];function cs(n,e){const t=n/Math.max(1,e);let i=hf[0],s=1/0;for(const o of hf){const l=Math.abs(Math.log(t/(o[0]/o[1])));l<s&&(s=l,i=o)}const r=s<.035?`${i[0]}:${i[1]}`:t>=1?`${t.toFixed(2)}:1`:`1:${(1/t).toFixed(2)}`,a=t>1.04?"LANDSCAPE":t<.96?"PORTRAIT":"SQUARE";return{ratio:t,label:r,kind:a,zh:a==="LANDSCAPE"?"横幅":a==="PORTRAIT"?"竖幅":"方幅"}}const qM=cs;class YM{active=!1;moved=!1;value={lane:0,row:0};x=0;y=0;inverse=null;samples=[];lastMotion=-1/0;motionDirection={x:0,y:0};pointer={x:0,y:0};start(e,t,i,s=0){this.active=!1,this.moved=!1,this.x=e,this.y=t,this.value={lane:0,row:0},this.samples=[{value:this.value,time:s}],this.lastMotion=-1/0,this.motionDirection={x:0,y:0},this.pointer={x:e,y:t};const{lane:r,row:a}=i,o=r.x*a.y-a.x*r.y,l=Math.hypot(r.x,r.y)*Math.hypot(a.x,a.y);this.inverse=Number.isFinite(l)&&l>0&&Math.abs(o)>l*.001?{lane:{x:a.y/o,y:-a.x/o},row:{x:-r.y/o,y:r.x/o}}:null}move(e,t,i){const s=e-this.x,r=t-this.y,a=Math.hypot(s,r);if(a>7&&(this.moved=!0),!this.inverse||!this.active&&a<10)return;this.active=!0;const o={lane:s*this.inverse.lane.x+r*this.inverse.lane.y,row:s*this.inverse.row.x+r*this.inverse.row.y},l=this.samples.at(-1);if(l){const c={x:e-this.pointer.x,y:t-this.pointer.y};Math.hypot(c.x,c.y)>1e-9&&(this.lastMotion=i,c.x*this.motionDirection.x+c.y*this.motionDirection.y<0&&(this.samples=[l]),this.motionDirection=c)}this.pointer={x:e,y:t},this.value=o,l?.time===i?this.samples[this.samples.length-1]={value:o,time:i}:this.samples.push({value:o,time:i}),this.samples=this.samples.filter(c=>i-c.time<=120).slice(-32)}releaseVelocity(e,t){const i=this.samples[0],s=this.samples.at(-1);if(t||!i||!s||e-this.lastMotion>80||s.time-i.time<8)return{lane:0,row:0};const r=1e3/(s.time-i.time);return{lane:(s.value.lane-i.value.lane)*r,row:(s.value.row-i.value.row)*r}}}class uf{value;velocity;phase;target;friction=2.4;constructor(e,t){this.value=e,this.velocity=t,this.phase=Math.abs(t)>=.75?"coasting":"snapping",this.target=Math.round(e)}step(e,t=this.phase==="coasting"){if(t){const i=Math.exp(-this.friction*e);this.value+=this.velocity*(1-i)/this.friction,this.velocity*=i,Math.abs(this.velocity)<.6&&(this.target=Math.round(this.value+this.velocity/this.friction),this.phase="snapping")}else if(this.phase==="snapping"){const s=this.value-this.target,r=this.velocity+10*s,a=Math.exp(-10*e);this.value=this.target+(s+r*e)*a,this.velocity=(this.velocity-10*r*e)*a,Math.abs(this.value-this.target)<1e-4&&Math.abs(this.velocity)<.005&&(this.value=this.target,this.velocity=0,this.phase="idle")}}}class jM{lane;row;constructor(e,t){this.lane=new uf(e.lane,t.lane),this.row=new uf(e.row,t.row)}get phase(){return this.lane.phase==="coasting"||this.row.phase==="coasting"?"coasting":this.lane.phase==="idle"&&this.row.phase==="idle"?"idle":"snapping"}get value(){return{lane:this.lane.value,row:this.row.value}}get velocity(){return{lane:this.lane.velocity,row:this.row.velocity}}step(e){const t=this.phase==="coasting";this.lane.step(e,t),this.row.step(e,t)}}const no={boot:{title:"BOOT SEQUENCE",description:"开机标志、扫描与欢迎画面",group:"开场"},selectionWave:{title:"SELECTION WAVE",description:"选档时向阵列传播的波浪",group:"档案阵列"},idleWave:{title:"IDLE MOTION",description:"停止操作后的阵列起伏",group:"档案阵列"},pointerParallax:{title:"POINTER PARALLAX",description:"镜头随指针的轻微偏移",group:"档案阵列"},dragMomentum:{title:"DRAG MOMENTUM",description:"松手后按实际速度继续滑行",group:"档案阵列"},selectionTransition:{title:"SELECTION TRANSITION",description:"切列、切档时的轨道移动",group:"档案阵列"},detailTransition:{title:"DETAIL TRANSITION",description:"抽取、转正、归位与详情镜头",group:"档案详情"},modelDecryption:{title:"MODEL DECRYPTION",description:"模型解密线与磨砂揭示",group:"档案详情"},documentReveal:{title:"DOCUMENT REVEAL",description:"正文的遮罩揭示",group:"档案详情"},rollingText:{title:"ROLLING TEXT",description:"标题、分类与权限标签滚动",group:"界面"},rollingNumbers:{title:"ROLLING NUMBERS",description:"序号、列编号与档案编码滚动",group:"界面"},surfaceTransitions:{title:"SURFACE TRANSITIONS",description:"详情、检索、收藏与设置窗口过渡",group:"界面"},viewerNavigation:{title:"VIEWER NAVIGATION",description:"360° 旋转、平移、缩放与复位阻尼",group:"360° 查看器"},viewerModelTransition:{title:"VIEWER MODEL TRANSITION",description:"拆解、重组与清晰度变化",group:"360° 查看器"}},go={boot:!0,selectionWave:!0,idleWave:!0,pointerParallax:!0,dragMomentum:!0,selectionTransition:!0,detailTransition:!0,modelDecryption:!0,documentReveal:!0,rollingText:!0,rollingNumbers:!0,surfaceTransitions:!0,viewerNavigation:!0,viewerModelTransition:!0},lh={boot:!1,selectionWave:!1,idleWave:!1,pointerParallax:!1,dragMomentum:!1,selectionTransition:!1,detailTransition:!1,modelDecryption:!1,documentReveal:!1,rollingText:!1,rollingNumbers:!1,surfaceTransitions:!1,viewerNavigation:!1,viewerModelTransition:!1};function ia(){return{...go}}function zp(){return{...lh}}function $h(n){return Object.values(n).every(Boolean)?"full":Object.values(n).every(e=>!e)?"reduced":"custom"}function ZM(n,e){const i={...n?.preset==="full"?go:n?.preset==="reduced"||e===!0?lh:go};if(n)for(const s of Object.keys(go))typeof n[s]=="boolean"&&(i[s]=n[s]);return i}function QM(n,e){return n[e]}function KM(n){const e=Object.values(n).filter(Boolean).length;if(e===Object.keys(n).length)return"当前使用完整动画。";if(e===0)return"当前已减少动画。";const t=[];return n.boot||t.push("开场已跳过"),!n.selectionWave&&!n.idleWave&&t.push("阵列波动已关闭"),!n.rollingText&&!n.rollingNumbers&&t.push("文字滚动已关闭"),`当前使用自定义动画（${t.slice(0,2).join("、")||`启用 ${e} 项`}）。`}function Gp(n,e){const t=[...new Set(Object.values(no).map(r=>r.group))],i=e??$h(n),s=(r,a)=>`<button type="button" data-action="motion-preset" data-preset="${r}" aria-pressed="${i===r}"${r==="custom"?" disabled":""}>${a}</button>`;return`<section id="motion-settings" class="motion-settings" aria-label="动效设置"><div class="motion-settings-head"><div><strong>ANIMATION CONTROLS</strong><span>完整、减少或按分项自定义；关闭后会立即收束当前动画（开场设置下次重播生效）</span></div>${s("full","完整")}${s("reduced","减少")}${s("custom","自定义")}</div><details class="motion-advanced"><summary>精细设置 <span>开场 / 阵列 / 详情 / 界面 / 360° 查看器</span></summary><div class="motion-groups">${t.map(r=>`<fieldset><legend>${r}</legend>${Object.keys(no).filter(a=>no[a].group===r).map(a=>{const o=no[a];return`<label class="motion-setting"><div><strong>${o.title}</strong><span>${o.description}</span></div><input type="checkbox" data-motion="${a}" ${n[a]?"checked":""}/><i class="toggle"></i></label>`}).join("")}</fieldset>`).join("")}</div></details></section>`}const di=n=>(n=Math.max(0,Math.min(1,n)),n*n*n*(10+n*(-15+6*n))),Po=(n,e)=>Math.exp(-.5*(n/e)**2);function Wp(n,e,t){const i=t-22;if(i<=0||i>=4.35)return 0;const s=n+(e-2)*.65,r=di(i/.32),a=3+i*19,o=32-(i-2.3)*24,l=c=>2.5*Po(c,3.8)-.58*Po(c-6,3.5);return r*(l(s-a)*(1-di((i-2.15)/.65))+l(s-o)*di((i-2.17)/.32)*(1-di((i-3.5)/.85)))}function JM(n){return .4*di((n-25.58)/.82)+2.95*di((n-27.55)/1.3)}function ch(n,e){const t=e-25.05-Math.abs(n)*.065,i=Math.max(-.42,2.15-.17*(Math.sqrt(n*n+1)-1)),s=di(t/.62),r=t>0?Math.sin(t*5.1)*Math.exp(-t*1.3):0;return i*(s+.18*r*di(t/.16))}function $M(n,e){return e<0||e>3.2?0:.8*di(e/.2)*Math.exp(-e*1.15)*Math.cos((n-e*8)*.58)*Po(n-e*8,3.4)}function eb(n,e){return di(n/2.5)*Math.max(0,Math.cos((n-e*8)*.58))}function Xp(n,e,t=1){return 1+(.25+.75*Po(n-e,.55)-1)*di(t)}function tb(n,e,t){return .075*Math.sin(t*Math.PI*2/8+n*.3-e*.45)+.027*Math.sin(t*Math.PI*2/13-n*.17+e*.3)}function ib(n,e,t,i=12,s=2){const r=di((t-24.95)/.45),a=di((t-25.4)/.95),o=t+.3*r*(1-a);return Wp(n,e,t)*(1-r)+ch(n-i,o)*Xp(e,s,(t-25.4)/.95)}const df=4.05,nb=.001;function ff(n,e,t=!1){const i=n*Math.exp(-e*(t?35:7));return Math.abs(i)<=nb?0:i}function wn(n,e,t,i){const s=n.value-e,r=n.velocity+t*s,a=Math.exp(-t*i);n.value=e+(s+r*i)*a,n.velocity=(n.velocity-t*r*i)*a}const Et=n=>(n=Ie.clamp(n,0,1),n*n*n*(n*(n*6-15)+10));class sb{constructor(e,t=$M,i=!1,s="baseline"){this.container=e,this.selectionPulse=t,this.deferSelectionPulse=i,this.lightingLook=s,this.renderer=new Tp({antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)*Math.min(innerWidth/1920,innerHeight/1080)),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.info.autoReset=!1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.type=Wf,this.renderer.toneMapping=ha,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.setAttribute("aria-label","三维研究档案阵列，点击选择，左右拖动切列，上下拖动或滚轮切换列内档案"),e.appendChild(this.renderer.domElement),this.renderer.domElement.addEventListener("webglcontextrestored",()=>{this.renderState.invalidate(),this.shadowState.invalidate()},{signal:this.inputEvents.signal}),this.scene.background=new Te("#eae5e1"),this.scene.matrixWorldAutoUpdate=!1,this.scene.fog=new Wo("#eae5e1",22,47),this.light=Np(this.renderer,this.scene,s),this.light.castShadow=!0,Object.assign(this.light.shadow.camera,{left:-16,right:16,top:15,bottom:-15,near:.1,far:45}),this.light.shadow.mapSize.set(2048,2048),this.light.shadow.normalBias=s==="refined"?.018:.035,this.light.shadow.bias=s==="refined"?-12e-5:-3e-4,this.light.shadow.radius=4;const r=new nt(new Dn(200,200),new ds({color:"#d8c9b9",roughness:.95}));r.rotation.x=-Math.PI/2,r.name="archive-floor",r.position.y=-4.63,r.receiveShadow=!0,this.scene.add(r),this.camera.position.set(-62.26,35.98,43.28),this.cameraAim.set(-.5,1.1,.4),this.camera.fov=6.15,this.camera.lookAt(this.cameraAim),this.composer=new Up(this.renderer),this.composer.addPass(new Op(this.scene,this.camera)),this.ao=new Zd(this.scene,this.camera,e.clientWidth,e.clientHeight),this.ao.kernelRadius=s==="refined"?.44:.38,this.ao.minDistance=.001,this.ao.maxDistance=.09,this.composer.addPass(this.ao),this.bokeh=new zy(this.scene,this.camera,{focus:25,aperture:.0018,maxblur:.011},()=>this.ao),this.composer.addPass(this.bokeh),this.smaa.enabled=!1,this.composer.addPass(this.smaa),this.composer.addPass(new Fp),this.bindPointer()}container;selectionPulse;deferSelectionPulse;lightingLook;inputEvents=new AbortController;presence=1;presenceTarget=1;setPresentationVisible(e,t=!1){this.presenceTarget=Number(e),t&&(this.presence=this.presenceTarget),e||this.cancelPointer()}get presentationHidden(){return this.presenceTarget===0&&this.presence===0}presentationDrop(e){const t=.15*(1+Math.tanh((e.row-this.selectedCell.row)*.1+(e.lane-this.selectedCell.lane)*.25));return 35*Math.pow(Ie.clamp((1-this.presence-t)/.7,0,1),2)}revealImmediately(){this.reveal=this.targetReveal}dispose(){this.inputEvents.abort(),this.cancelPointer(),sh(this.scene),this.appearance.disposeSources(),this.model.clear(),this.outgoing=[],this.instances=[],this.assemblyTemplate?.then(sh).catch(()=>{}),this.assemblyTemplate=void 0,this.light.shadow.map?.dispose();for(const e of this.composer.passes)e.dispose();this.composer.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove(),this.loaded=!1}uiOnlyParallax=!1;theme=new Gy;subduedIndex={value:0};selectedIndexOnly=!1;superPerformance=!1;setSuperPerformance(e){if(this.superPerformance!==e){this.superPerformance=e;for(const t of this.instances){const i=t.userData.fullMaterial??=t.material;if(e&&!t.userData.fastMaterial){const s=i.clone();s.onBeforeCompile=i.onBeforeCompile,s.customProgramCacheKey=i.customProgramCacheKey.bind(i),s.transmission=0,s.clearcoat=0,s.roughness=Math.max(.45,i.roughness),t.userData.fastMaterial=s}t.material=e?t.userData.fastMaterial:i,t.visible=!e||i.name.replace(/\.\d+$/,"")!=="Titanium_Fasteners"}this.resize()}}setSelectedIndexAccent(e){this.selectedIndexOnly=e}themeAttribute;get themeAmount(){return this.theme.background(performance.now()/1e3)}setTheme(e,t=!1){this.theme.set(e,performance.now()/1e3,this.selectedCell,t)}playfield={enabled:!1,bands:$d(),strength:1,flatten:0,target:null,breathing:!0};flatMix=0;rhythm=new Zy;rhythmStyle="legacy";setRhythmStyle(e){this.rhythmStyle=e}relayLifts=new Map;relayPoints=new Map;relayActive=!1;onRelayPick;setPlayfield(e,t,i,s,r,a=!0){this.playfield={enabled:e,bands:t,strength:i,flatten:s,target:r,breathing:a}}setRelayActive(e){e!==this.relayActive&&(this.cancelPointer(),this.setHover(null),this.relayActive=e,this.pointer.set(0,0))}relayPulse(e){const t=this.relayPoints.get(e)?.cell;t&&!this.reduced&&this.emitPulse(t)}projectRelay(e){const t=this.relayPoints.get(e);if(!t)return null;const i=t.point.clone().project(this.camera),s=this.renderer.domElement.getBoundingClientRect();return{x:s.left+(i.x+1)*s.width/2,y:s.top+(1-i.y)*s.height/2}}relayCandidates(){const e=this.renderer.domElement.getBoundingClientRect();return this.scene.updateMatrixWorld(!0),[...this.relayPoints.keys()].filter(t=>{const i=this.projectRelay(t),s=(i.x-e.left)/e.width,r=(i.y-e.top)/e.height;if(s<.18||s>.82||r<.32||r>.76)return!1;const a=this.pickCell(i.x,i.y);return a&&ln(a)===t})}renderer;scene=new Xo;camera=new Wt(34,16/9,5,300);composer;ao;bokeh;instances=[];matrixUpdates;themeUpdates;renderState=new jd;shadowState=new jd;renderedFrames=0;reusedFrames=0;visibility=new Ny;drawCoverage=new Uy;shadowCoverage;instanceCapacity=qd*Co;drawnCells=[];extraCoverage=!1;setArchiveCoverage(e){this.extraCoverage=e}model=new qi;appearance=new VM;decryption=new tm;cursor=new De;raycaster=new Ev;dummy=new yt;cells=[];selectedCell={lane:2,row:12};looping=!1;coordinateOrigin={lane:0,row:0};lift={value:0,velocity:0};rail={value:0,velocity:0};shoulder={value:12,velocity:0};laneFocus={value:2,velocity:0};columnCamera={value:0,velocity:0};returnY=null;canInspect=!1;clearance=0;pulseGain=1;idleGain=0;lastInteraction=0;scanTime=29.1;scanBlend=0;cameraAim=new P;outgoing=[];pulses=[];pendingPulse=null;selectedSlot=76;detail=0;targetDetail=0;reveal=0;targetReveal=0;last=0;pointer=new De;dragging=!1;hoverCell=null;hoverLifts=new Map;archiveDrag=new YM;dragTrack=null;navigatingDrag=!1;archiveMomentum=null;holdingArchive=!1;cancelPointer=()=>{};pendingHover=null;flushHover=()=>{};rotation=0;targetRotation=0;light;clock=0;loaded=!1;labelCanvas=document.createElement("canvas");printCanvas=document.createElement("canvas");printTexture;printImages=new Map;printIndex=-1;labelTexture;labelMark=new Image;motion=ia();quality=ss(void 0);appliedQuality="";smaa=new Bp;aoKernelSize=32;displayHeight=0;layoutKind="";onSelect;onHover;onNavigate;async load(e=rs("assets/archive-cassette.glb")){this.labelMark.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(zM)}`,await this.labelMark.decode();const t=await new tf().loadAsync(e);t.scene.updateMatrixWorld(!0);const i=[];t.scene.traverse(a=>{a instanceof nt&&i.push(a)});const s=qd*Co;for(let a=0;a<s;a++){const o=jl(a);this.cells.push(o)}for(const a of i){const o=a.geometry.clone().applyMatrix4(a.matrixWorld).scale(1,1,1),l=a.material,c=l.name.replace(/\.\d+$/,""),h=l.clone();if(h.envMapIntensity=.6,c==="Frosted_Polymer"&&(h.color.set("#fffdfa"),h.transmission=.9,h.thickness=.12,h.roughness=.21,h.ior=1.46,h.attenuationColor=new Te("#eee6df"),h.attenuationDistance=2),c==="Internal_Ceramic"&&(h.color.set(this.lightingLook==="refined"?"#c4baae":"#c7beb6"),h.roughness=.6),c==="Printed_Label"&&h.color.set("#eae5dc"),c==="Ivory_Edges"&&(h.color.set("#f0e7df"),h.roughness=.31,h.transmission=.65,h.thickness=.04),c==="Optical_Diffuser"&&(h.color.set("#e2dad4"),h.transmission=0,h.roughness=.7),c==="Subsurface_Optics"&&(h.color.set(this.lightingLook==="refined"?"#b9a796":"#b9aba1"),h.roughness=.48,h.metalness=.05),c==="Optical_Edges"&&(h.transmission=0,h.color.set(this.lightingLook==="refined"?"#d8c7b5":"#d4c7be"),h.roughness=.26,h.metalness=.08),HM(c,h),c==="Carbon_Ink")continue;const d=new nt(o,h);if(d.userData.surface=c,d.castShadow=c==="Optical_Diffuser",d.receiveShadow=!0,this.model.add(d),!["Frosted_Polymer","Ivory_Edges","Titanium_Fasteners","Index_Inlay","Optical_Diffuser"].includes(c)){this.appearance.register(c,h);continue}const u=h.clone();c==="Frosted_Polymer"&&(u.transmission=.78,this.lightingLook==="refined"&&(u.thickness=.28,u.attenuationColor.set("#d4c7b4"),u.attenuationDistance=1.2),u.transparent=!1,u.color.set("#fff7ed"),u.onBeforeCompile=m=>{m.vertexShader=`varying float vPanelHeight;
`+m.vertexShader,m.vertexShader=m.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPanelHeight = position.y / 3.7;`),m.fragmentShader=`varying float vPanelHeight;
`+m.fragmentShader,m.fragmentShader=m.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vPanelHeight));`)},u.roughness=.28,u.clearcoat=.3,u.clearcoatRoughness=.25),c==="Optical_Diffuser"&&u.color.set("#806447"),c==="Ivory_Edges"&&(u.transmission=0,u.color.set(this.lightingLook==="refined"?"#dcc9b0":"#fff5e9"),u.roughness=.38),c==="Index_Inlay"&&(u.color.set("#e4d6c5"),u.metalness=.05),this.appearance.register(c,h,u),this.themeAttribute??=new os(new Float32Array(s),1).setUsage(Gs),o.setAttribute("archiveTheme",this.themeAttribute),Ro(u,c,!0,this.subduedIndex);const f=new ls(o,u,s);f.instanceMatrix=this.instances[0]?.instanceMatrix??f.instanceMatrix.setUsage(Gs),f.castShadow=c==="Optical_Diffuser",f.receiveShadow=!0,f.frustumCulled=!1,this.instances.push(f),this.scene.add(f)}this.shadowCoverage=new Oy(this.instances.find(a=>a.castShadow)),this.scene.add(this.shadowCoverage.mesh),this.printCanvas.width=1024,this.printCanvas.height=744,this.printTexture=new Pr(this.printCanvas),this.printTexture.colorSpace=Pt,this.printTexture.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),this.model.add(this.createPrintMesh(this.printTexture)),this.labelCanvas.width=1024,this.labelCanvas.height=440,this.labelTexture=new Pr(this.labelCanvas),this.labelTexture.colorSpace=Pt,this.labelTexture.anisotropy=this.renderer.capabilities.getMaxAnisotropy();const r=new nt(new Dn(.99,.46),new Yi({map:this.labelTexture,toneMapped:!1,transparent:!0,depthWrite:!1}));r.position.set(-1.36,3.04,.255),this.model.add(r),this.appearance.prepare(this.model),this.appearance.apply(this.model,0),this.drawLabel(0),this.scene.add(this.model),this.model.position.copy(this.cellPosition(jl(this.selectedSlot))),this.loaded=!0}assemblyTemplate;async createAssemblyModel(){this.assemblyTemplate??=new tf().loadAsync(rs("assets/archive-assembly.glb")).then(l=>(l.scene.updateMatrixWorld(!0),l.scene)).catch(l=>{throw this.assemblyTemplate=void 0,l});const e=await this.assemblyTemplate,t=new qi,i=[];e.traverse(l=>{if(!(l instanceof nt))return;const c=l.material.name.replace(/\.\d+$/,""),h=new nt(l.geometry.clone().applyMatrix4(l.matrixWorld),l.material);h.userData.surface=c,h.userData.assemblyPart=l.userData.assemblyPart,t.add(h),i.push(h)}),this.appearance.prepare(t),this.appearance.apply(t,1),this.appearance.setClarity(t,this.modelClarity()),this.appearance.setTheme(t,this.themeAmount);const s=document.createElement("canvas");s.width=this.labelCanvas.width,s.height=this.labelCanvas.height,s.getContext("2d").drawImage(this.labelCanvas,0,0);const r=new Pr(s);r.colorSpace=Pt,r.anisotropy=this.renderer.capabilities.getMaxAnisotropy();const a=new nt(new Dn(.99,.46),new Yi({map:r,toneMapped:!1,transparent:!0,depthWrite:!1}));a.position.set(-1.36,3.04,.255);const o=this.model.children.find(l=>l.userData.photoPrint)?.visible?this.snapshotPrint():void 0;return o&&(o.userData.assemblyPart="substrate",t.add(o),i.push(o)),a.userData.assemblyPart="cover",a.userData.themeAmount=Ro(a.material,"Printed_Canvas"),a.userData.themeAmount.value=this.themeAmount,t.add(a),i.push(a),{model:t,setClarity:l=>this.appearance.setClarity(t,l),dispose:()=>{for(const l of i)l.geometry.dispose(),l.material.dispose();r.dispose()}}}setMode(e){if(this.cancelPointer(),this.setHover(null),e==="detail"?this.decryption.enter(this.scanBlend>.9&&this.decryption.clarity>.999):this.decryption.leave(),e==="hidden"&&this.decryption.select(),e!=="archive"&&(this.pendingPulse=null),this.looping=e!=="hidden",!this.looping){const t=dn(Py(this.selectedSlot));this.selectedCell={lane:t.lane,row:t.row},this.coordinateOrigin={lane:0,row:0};for(const i of this.outgoing)this.scene.remove(i.group),this.appearance.dispose(i.group);this.outgoing=[]}this.lastInteraction=this.clock,this.targetReveal=e==="hidden"?0:1,this.targetDetail=e==="detail"?1:0,this.dragging=!1,e!=="detail"?(this.targetRotation=0,this.rotation!==0&&(this.returnY=this.model.position.y)):this.returnY=null}setReduced(e){this.setMotion(e?zp():ia())}setMotion(e){if((!e.pointerParallax||!e.dragMomentum)&&(this.motion.pointerParallax||this.motion.dragMomentum)&&this.cancelPointer(),e.dragMomentum||(this.archiveMomentum=null,this.columnCamera.velocity=0,this.rail.velocity=0),e.pointerParallax||this.pointer.set(0,0),e.selectionWave||(this.pulses=[]),e.idleWave||(this.idleGain=0),this.motion={...e},!e.modelDecryption){this.appearance.setClarity(this.model,this.modelClarity());for(const t of this.outgoing)t.clarity=0,this.appearance.setClarity(t.group,0)}}get reduced(){return Object.values(this.motion).every(e=>!e)}modelClarity(){return this.motion.modelDecryption?this.decryption.clarity:this.targetDetail}setQuality(e){const t=typeof e=="boolean"?ss(void 0,e):ss(e),i=JSON.stringify(t);if(this.appliedQuality===i)return;if(this.appliedQuality=i,this.quality=t,t.aoSamples&&t.aoSamples!==this.aoKernelSize){const r=this.ao;this.ao=new Zd(this.scene,this.camera,1,1,t.aoSamples),this.ao.kernelRadius=r.kernelRadius,this.ao.minDistance=r.minDistance,this.ao.maxDistance=r.maxDistance;const a=this.composer.passes.indexOf(r);this.composer.removePass(r),this.composer.insertPass(this.ao,a),r.dispose(),this.aoKernelSize=t.aoSamples}this.ao.enabled=t.aoSamples>0,this.bokeh.enabled=t.depthOfField>0,this.smaa.enabled=t.antialias==="smaa",this.renderer.shadowMap.enabled=t.shadows>0;const s=Math.min(t.shadows||1024,this.renderer.capabilities.maxTextureSize);this.light.shadow.mapSize.x!==s&&(this.light.shadow.map?.dispose(),this.light.shadow.map=null,this.light.shadow.mapSize.set(s,s)),this.light.shadow.needsUpdate=!0,oh(this.scene,this.renderer,t),this.resize()}cellPosition(e){return new P((e.lane-2)*vi,-4.6,(e.row-15.5)*Ai)}rebaseCoordinates(){const e={lane:Math.abs(this.selectedCell.lane)>2048?Math.round((this.selectedCell.lane-2)/5)*5:0,row:Math.abs(this.selectedCell.row)>2048?Math.floor((this.selectedCell.row-12)/8)*8:0};if(!(!e.lane&&!e.row)){this.setHover(null),this.hoverLifts.clear(),this.selectedCell.lane-=e.lane,this.selectedCell.row-=e.row,this.coordinateOrigin.lane+=e.lane,this.coordinateOrigin.row+=e.row,this.laneFocus.value-=e.lane,this.shoulder.value-=e.row,this.columnCamera.value-=e.lane*vi,this.rail.value+=e.row*Ai;for(const t of this.outgoing)t.cell.lane-=e.lane,t.cell.row-=e.row;for(const t of this.pulses)t.lane-=e.lane,t.row-=e.row;this.pendingPulse&&(this.pendingPulse.lane-=e.lane,this.pendingPulse.row-=e.row)}}select(e,t){this.navigatingDrag||this.cancelPointer(),this.setHover(null),this.lastInteraction=this.clock;const i=dn(e).slot,s=dn(e),r=this.looping?Ly(e,this.selectedCell,t):{lane:s.lane,row:s.row},a=!Ir(r,this.selectedCell);if(this.looping&&a&&this.loaded&&this.lift.value>1e-4){const l=this.model.clone(!0),c=l.children[l.children.length-1],h=document.createElement("canvas");h.width=1024,h.height=440,h.getContext("2d").drawImage(this.labelCanvas,0,0);const d=new Pr(h);d.colorSpace=Pt,c.material=new Yi({map:d,toneMapped:!1,transparent:!0,depthWrite:!1});const u=l.children.find(f=>f.userData.photoPrint);if(u){const f=u.visible?this.snapshotPrint():void 0;f&&(u.material=f.material)}this.appearance.prepare(l),this.appearance.apply(l,Et(this.lift.value/.4)),this.appearance.setClarity(l,this.modelClarity()),this.scene.add(l),this.outgoing.push({group:l,slot:this.selectedSlot,cell:{...this.selectedCell},lift:{...this.lift},returnY:l.rotation.y!==0?l.position.y:null,clarity:this.modelClarity()}),this.lift.value=0,this.lift.velocity=0}this.selectedSlot=i,this.selectedCell=r,a&&(this.decryption.select(),this.rotation=0,this.returnY=null);const o=this.outgoing.findIndex(l=>Ir(l.cell,r));if(o>=0){const l=this.outgoing[o];this.lift={...l.lift},this.rotation=l.group.rotation.y,this.returnY=l.returnY,this.decryption.select(l.clarity),this.scene.remove(l.group),this.appearance.dispose(l.group),this.outgoing.splice(o,1)}this.deferSelectionPulse?this.pendingPulse=this.looping?{...r}:null:this.emitPulse(r),this.targetRotation=0,this.drawLabel(e)}emitPulse(e){this.pulses.push({...e,time:this.clock}),this.pulses=this.pulses.slice(-6)}drawLabel(e){if(!this.labelTexture)return;const t=this.labelCanvas.getContext("2d");t.fillStyle="#e6e2d9",t.fillRect(0,0,1024,440),t.fillStyle="#171713",t.fillRect(12,12,1e3,6),t.fillRect(12,419,1e3,3),t.font="bold 81px MiSans",t.fillText("RHINE LAB, LLC.",22,116),t.font="32px MiSans",t.fillStyle="#878476",t.fillText("INTERNAL DATABASE",25,174),t.fillStyle="#171713",t.font="bold 130px MiSans",t.fillText("NO."+String(e+1).padStart(3,"0"),22,360),t.fillRect(782,32,221,39),t.fillStyle="#eee9de",t.font="24px MiSans",t.fillText("R L / I S",809,61),t.fillStyle="#171713",t.font="bold 64px MiSans",t.fillText("INFO",830,143),t.drawImage(this.labelMark,790,242,210,98),this.labelTexture.needsUpdate=!0,this.drawPrint(e)}createPrintMesh(e){const t=new nt(new Dn(4.4,3.2),new ds({map:e,roughness:.62,metalness:0}));return t.position.set(0,1.865,-.017),t.receiveShadow=!0,t.userData.photoPrint=!0,t}snapshotPrint(){if(!this.printTexture)return;const e=document.createElement("canvas");e.width=this.printCanvas.width,e.height=this.printCanvas.height,e.getContext("2d").drawImage(this.printCanvas,0,0);const t=new Pr(e);return t.colorSpace=Pt,t.anisotropy=this.printTexture.anisotropy,this.createPrintMesh(t)}drawPrint(e){if(!this.printTexture)return;this.printIndex=e;const t=vt[e],i=t?.photo?rs(t.photo.src.mid.webp):"";let s=i?this.printImages.get(i):void 0;i&&!s&&(s=new Image,s.decoding="async",s.onload=()=>{this.printIndex===e&&this.paintPrint(e,s)},s.src=i,this.printImages.set(i,s),this.printImages.size>10&&this.printImages.delete(this.printImages.keys().next().value)),this.paintPrint(e,s?.complete&&s.naturalWidth?s:void 0)}paintPrint(e,t){const i=this.model.children.find(h=>h.userData.photoPrint);i&&(i.visible=!!vt[e]?.photo);const s=this.printCanvas.getContext("2d"),r=this.printCanvas.width,a=this.printCanvas.height,o=vt[e];s.globalAlpha=1,s.shadowColor="transparent",s.fillStyle="#e2ddd3",s.fillRect(0,0,r,a),s.fillStyle="rgba(23,23,19,0.055)";for(let h=32;h<r;h+=32)s.fillRect(h,0,1,a);for(let h=32;h<a;h+=32)s.fillRect(0,h,r,1);const l=o?.photo;if(l){const h=l.width/l.height,d=h<1.04,u=d?{x:300,y:54,w:r-300-64,h:a-160}:{x:64,y:54,w:r-128,h:a-160},f=Math.min(u.w/h,u.h),m=f,v=f*h,p=Math.round(u.x+(u.w-v)/2),g=Math.round(u.y+(u.h-m)/2),_=14;s.save(),s.shadowColor="rgba(20,18,14,0.28)",s.shadowBlur=22,s.shadowOffsetY=8,s.fillStyle="#f4f1ea",s.fillRect(p-_,g-_,v+_*2,m+_*2),s.restore(),s.fillStyle=l.color||"#cfc8bc",s.fillRect(p,g,v,m),t&&(s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(t,p,g,v,m)),s.strokeStyle="#171713",s.lineWidth=2,s.strokeRect(p-1,g-1,v+2,m+2);const b=_+10,y=22;s.beginPath();for(const[E,R,x,w]of[[p-b,g-b,1,1],[p+v+b,g-b,-1,1],[p-b,g+m+b,1,-1],[p+v+b,g+m+b,-1,-1]])s.moveTo(E,R+w*y),s.lineTo(E,R),s.lineTo(E+x*y,R);s.stroke(),s.fillStyle="#ed821b",s.fillRect(p-_,g+m+_+6,12,12);const S=qM(l.width,l.height);if(d){const E=[["FILE",o.id],["RATIO",S.label],["FORMAT",S.kind],["SIZE",`${l.width}×${l.height}`]];let R=92;for(const[x,w]of E)s.fillStyle="#7b766b",s.font="22px MiSans",s.fillText(x,72,R),s.fillStyle="#171713",s.font="600 40px MiSans",s.fillText(w,72,R+46),s.fillRect(72,R+66,180,2),R+=132}else{s.fillStyle="#171713",s.font="600 22px MiSans";const E=`${S.label}  ${S.kind}`;s.fillText(E,p+v+_-s.measureText(E).width,g+m+_+18)}}s.fillStyle="#2b2a25",s.font="600 26px MiSans",s.fillText(l?"MEMORY ARCHIVE":"AWAITING ARCHIVE",72,a-40),s.font="26px MiSans";const c=o?o.id:"";s.fillText(c,r-72-s.measureText(c).width,a-40),s.fillRect(72,a-78,r-144,2),this.printTexture.needsUpdate=!0}ensureInstanceCapacity(e){if(e<=this.instanceCapacity)return;const t=Math.max(e,this.instanceCapacity*2),i=new os(new Float32Array(t*16),16).setUsage(Gs);i.array.set(this.instances[0].instanceMatrix.array);for(const r of this.instances)r.dispose(),r.instanceMatrix=i;const s=this.themeAttribute;this.themeAttribute=new os(new Float32Array(t),1).setUsage(Gs),s&&this.themeAttribute.array.set(s.array);for(const r of this.instances)r.geometry.setAttribute("archiveTheme",this.themeAttribute);this.matrixUpdates=new Ws(i),this.themeUpdates=new Ws(this.themeAttribute),this.instanceCapacity=t}resize(){this.renderState.invalidate();const e=this.container.clientWidth,t=this.container.clientHeight,i=this.container.closest("[data-layout]")?.dataset.layout??"",s=this.container.getBoundingClientRect().height;this.layoutKind==="cinematic"&&i!=="cinematic"&&this.displayHeight>0&&(this.camera.fov=Ie.radToDeg(2*Math.atan(Math.tan(Ie.degToRad(this.camera.fov/2))*s/this.displayHeight))),this.displayHeight=s,this.layoutKind=i;const r=Hp(this.renderer,this.composer,this.container,this.quality,this.superPerformance);this.ao.setSize(Math.max(1,Math.floor(r.width*this.quality.aoResolution)),Math.max(1,Math.floor(r.height*this.quality.aoResolution))),this.ao.setSharing(this.ao.enabled&&this.bokeh.enabled&&this.quality.aoResolution===1&&!this.superPerformance),this.container.dataset.renderQuality=JSON.stringify({...JSON.parse(this.container.dataset.renderQuality),aoSamples:this.ao.enabled?this.aoKernelSize:0,aoWidth:this.ao.width,aoHeight:this.ao.height,shadows:this.renderer.shadowMap.enabled?this.light.shadow.mapSize.x:0,depthOfField:this.bokeh.enabled?this.quality.depthOfField:0}),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}canBrowse(){return this.presenceTarget===1&&this.looping&&!this.targetDetail&&this.detail<.2&&this.reveal>=.8&&this.loaded&&!this.container.closest("[inert]")}setHover(e){!e&&!this.hoverCell||e&&this.hoverCell&&Ir(e,this.hoverCell)||(this.hoverCell=e?{...e}:null,this.onHover?.(e?Yl(e):null))}pickCell(e,t){const i=this.renderer.domElement.getBoundingClientRect();this.cursor.set((e-i.left)/i.width*2-1,-(t-i.top)/i.height*2+1),this.raycaster.setFromCamera(this.cursor,this.camera);const s=this.raycaster.intersectObjects([this.instances[0],this.model,...this.outgoing.map(a=>a.group)],!0)[0];if(!s)return null;if(s.instanceId!==void 0)return{...this.drawnCells[s.instanceId]};let r=s.object;for(;r;){const a=this.outgoing.find(o=>o.group===r);if(a)return{...a.cell};r=r.parent}return{...this.selectedCell}}trackCoordinate(e,t){return e==="lane"?t/vi+2:(-t-2.17)/Ai+15.5}dragProjection(){this.model.updateMatrixWorld(!0),this.camera.updateMatrixWorld(!0);const e=this.model.localToWorld(new P(0,1.85,0)),t=this.renderer.domElement.getBoundingClientRect(),i=s=>{const r=e.clone().addScaledVector(s,-.5).project(this.camera),a=e.clone().addScaledVector(s,.5).project(this.camera);return{x:(a.x-r.x)*t.width/2,y:-(a.y-r.y)*t.height/2}};return{lane:i(new P(-vi,0,0)),row:i(new P(0,0,-Ai))}}trackPosition(e,t){return e==="lane"?(t-2)*vi:-2.17-(t-15.5)*Ai}navigatePlane(e){const t={lane:Math.round(e.lane),row:Math.round(e.row)};if(Ir(t,this.selectedCell))return;const i={...this.selectedCell},s=Math.min(64,Math.max(Math.abs(t.lane-i.lane),Math.abs(t.row-i.row)));this.navigatingDrag=!0;try{for(let r=1;r<=s;r++){const a={lane:Math.round(i.lane+(t.lane-i.lane)*r/s),row:Math.round(i.row+(t.row-i.row)*r/s)};Ir(a,this.selectedCell)||this.onSelect?.(Yl(a),a)}}finally{this.navigatingDrag=!1}}stopMomentum(){this.archiveMomentum&&(this.columnCamera.velocity=0,this.rail.velocity=0),this.archiveMomentum=null}bindPointer(){const e=this.renderer.domElement;let t=null,i=0,s=0,r=0,a=!1,o=!1,l=!1,c={lane:0,row:0},h=0,d=0;const u=new Set,f=p=>{if(p.pointerType!=="mouse"||!this.canBrowse()||this.archiveMomentum)return;const g=e.getBoundingClientRect();this.pointer.set((p.clientX-g.left)/g.width-.5,(p.clientY-g.top)/g.height-.5);const _=this.pickCell(p.clientX,p.clientY);this.setHover(_),e.style.cursor=_?"pointer":"grab"};this.flushHover=()=>{const p=this.pendingHover;this.pendingHover=null,p&&f(p)};const m=()=>{this.pendingHover=null;const p=t;t=null,this.dragging=!1,this.dragTrack=null,this.holdingArchive=!1,o=!1,this.setHover(null),e.style.cursor=this.canBrowse()?"grab":"default",p!==null&&e.hasPointerCapture(p)&&e.releasePointerCapture(p)};this.cancelPointer=()=>{l=!0,this.stopMomentum(),u.clear(),h=0,m()};const v=p=>{const g=!this.archiveDrag.active;for(const _ of p.getCoalescedEvents?.()??[])this.archiveDrag.move(_.clientX,_.clientY,_.timeStamp);this.archiveDrag.move(p.clientX,p.clientY,p.timeStamp),a||=this.archiveDrag.moved,this.archiveDrag.active&&(g&&(c={lane:this.columnCamera.value,row:this.rail.value}),this.setHover(null),this.lastInteraction=this.clock,e.style.cursor="grabbing",this.dragTrack={lane:c.lane+this.archiveDrag.value.lane*vi,row:c.row-this.archiveDrag.value.row*Ai},this.columnCamera.value=this.dragTrack.lane,this.rail.value=this.dragTrack.row,this.columnCamera.velocity=this.rail.velocity=0,this.navigatePlane({lane:this.trackCoordinate("lane",this.columnCamera.value),row:this.trackCoordinate("row",this.rail.value)}))};e.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"&&p.button!==0)&&!(!this.canBrowse()&&!this.canInspect)){if(this.pendingHover=null,u.add(p.pointerId),u.size>1){l=!0,m();return}t=p.pointerId,l=!1,a=this.archiveMomentum!==null,s=i=p.clientX,r=p.clientY,o=this.canBrowse(),this.stopMomentum(),o&&(this.columnCamera.velocity=0,this.rail.velocity=0),this.holdingArchive=o,this.dragging=!o&&this.canInspect,c={lane:this.columnCamera.value,row:this.rail.value},this.archiveDrag.start(p.clientX,p.clientY,this.dragProjection(),p.timeStamp),this.setHover(null),e.setPointerCapture(p.pointerId),this.relayActive&&(this.holdingArchive=!1,this.dragging=!1)}},{signal:this.inputEvents.signal}),e.addEventListener("pointermove",p=>{if(this.relayActive){p.pointerId===t&&(a||=Math.hypot(p.clientX-s,p.clientY-r)>7);return}if(!(t!==null&&p.pointerId!==t)){if(t===null){this.pendingHover={clientX:p.clientX,clientY:p.clientY,pointerType:p.pointerType};return}if(!l){if(a||=Math.hypot(p.clientX-s,p.clientY-r)>7,o){if(!this.canBrowse()){this.cancelPointer();return}v(p);return}this.dragging&&this.canInspect&&(this.targetRotation=Ie.clamp(this.targetRotation+(p.clientX-i)*.004,-.8,.8),i=p.clientX)}}},{signal:this.inputEvents.signal}),e.addEventListener("pointerup",p=>{if(u.delete(p.pointerId),p.pointerId===t){if(this.relayActive){if(!l&&!a){const g=this.pickCell(p.clientX,p.clientY);this.onRelayPick?.(g?ln(g):null)}m();return}if(!l&&o&&this.canBrowse()){if(v(p),this.archiveDrag.active)this.motion.dragMomentum&&(this.archiveMomentum={time:performance.now()/1e3,motion:new jM({lane:this.trackCoordinate("lane",this.columnCamera.value),row:this.trackCoordinate("row",this.rail.value)},this.archiveDrag.releaseVelocity(p.timeStamp,!1))});else if(!a){const g=this.pickCell(p.clientX,p.clientY);g&&this.onSelect?.(Yl(g),g)}}m()}},{signal:this.inputEvents.signal}),e.addEventListener("pointercancel",p=>{u.delete(p.pointerId),p.pointerId===t&&(l=!0,m())},{signal:this.inputEvents.signal}),e.addEventListener("lostpointercapture",p=>{u.delete(p.pointerId),p.pointerId===t&&(l=!0,m())},{signal:this.inputEvents.signal}),e.addEventListener("pointerleave",()=>{this.pendingHover=null,this.pointer.set(0,0),this.setHover(null)},{signal:this.inputEvents.signal}),e.addEventListener("wheel",p=>{if(this.relayActive){p.preventDefault();return}if(!this.canBrowse()||t!==null||p.ctrlKey||Math.abs(p.deltaX)>Math.abs(p.deltaY))return;p.preventDefault(),this.archiveMomentum&&this.stopMomentum();const g=performance.now(),_=Ie.clamp(p.deltaY*(p.deltaMode===1?40:p.deltaMode===2?e.clientHeight:1),-300,300);(g-d>180||Math.sign(_)!==Math.sign(h))&&(h=0),d=g,h+=_;const b=Math.min(3,Math.floor(Math.abs(h)/100));if(!b)return;const y=Math.sign(h);h-=y*b*100,this.navigatingDrag=!0;try{for(let S=0;S<b;S++)this.onNavigate?.("row",y)}finally{this.navigatingDrag=!1}},{passive:!1,signal:this.inputEvents.signal}),window.addEventListener("blur",()=>this.cancelPointer(),{signal:this.inputEvents.signal}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.cancelPointer()},{signal:this.inputEvents.signal}),window.addEventListener("resize",()=>this.cancelPointer(),{signal:this.inputEvents.signal}),window.addEventListener("pointerup",p=>u.delete(p.pointerId),{signal:this.inputEvents.signal}),window.addEventListener("pointercancel",p=>u.delete(p.pointerId),{signal:this.inputEvents.signal})}update(e,t){const i=Math.max(0,e-this.last||.016),s=Math.min(i,.05);if(this.last=e,this.clock=e,!this.loaded)return;this.flushHover();const r=this.motion.surfaceTransitions?Math.min(i,.25)/1.1:1;this.presence+=Math.sign(this.presenceTarget-this.presence)*Math.min(r,Math.abs(this.presenceTarget-this.presence)),this.renderer.domElement.style.opacity=String(Ie.clamp(this.presence/.16,0,1)),this.theme.beginFrame(),Pp(this.scene,this.renderer,this.themeAmount);const a=1-Math.exp(-s*(this.motion.selectionTransition?2.8:35)),o=1-Math.exp(-s*(this.motion.detailTransition?2.8:35));this.reveal=t?t.reveal:Ie.lerp(this.reveal,this.targetReveal,a),this.rotation=this.targetDetail?Ie.lerp(this.rotation,this.targetRotation,o):ff(this.rotation,s,!this.motion.detailTransition);const l=t?.time??29.1;t?(this.scanTime=l,this.scanBlend=1):(this.scanTime+=s,this.scanBlend*=Math.exp(-s*3)),this.canBrowse()||(this.setHover(null),(this.holdingArchive||this.archiveMomentum)&&this.cancelPointer()),this.looping&&!t&&!this.holdingArchive&&!this.archiveMomentum&&this.rebaseCoordinates();const c=t?null:this.archiveMomentum;c&&(c.motion.step(Math.min(Math.max(e-c.time,0),.25)),c.time=e,this.navigatePlane(c.motion.value),this.lastInteraction=e);const h=!t&&this.hoverCell?ln(this.hoverCell):null;h&&!this.hoverLifts.has(h)&&this.hoverLifts.set(h,0);for(const[N,G]of this.hoverLifts){const oe=N===h?.28:0,J=t?0:this.motion.selectionTransition?Ie.lerp(G,oe,1-Math.exp(-s*14)):oe;oe===0&&J<1e-4?this.hoverLifts.delete(N):this.hoverLifts.set(N,J)}const d=N=>this.hoverLifts.get(ln(N))??0,u=this.cellPosition(this.selectedCell),f=this.selectedCell.row,m=this.selectedCell.lane;wn(this.shoulder,f,this.motion.selectionTransition?5:35,s),wn(this.laneFocus,m,this.motion.selectionTransition?4:35,s),!this.holdingArchive&&!c&&(wn(this.columnCamera,u.x,this.motion.selectionTransition?3.7:35,s),wn(this.rail,t?0:-2.17-u.z,this.motion.selectionTransition?3.7:35,s)),c&&(this.columnCamera.value=this.trackPosition("lane",c.motion.lane.value),this.rail.value=this.trackPosition("row",c.motion.row.value),this.columnCamera.velocity=c.motion.lane.velocity*vi,this.rail.velocity=-c.motion.row.velocity*Ai,c.motion.phase==="idle"&&(this.archiveMomentum=null)),this.dragTrack&&!t&&(this.columnCamera.value=this.dragTrack.lane,this.rail.value=this.dragTrack.row,this.columnCamera.velocity=this.rail.velocity=0),t&&(this.rail.value=0,this.rail.velocity=0,this.lift.value=JM(l),this.lift.velocity=0,this.shoulder.value=f,this.laneFocus.value=m,this.laneFocus.velocity=0,this.columnCamera.value=u.x,this.columnCamera.velocity=0);const v=t?0:this.columnCamera.value;this.pulses=this.pulses.filter(N=>e-N.time<3.2);const p=this.outgoing.some(N=>N.returnY!==null),g=!t&&this.motion.idleWave&&this.targetReveal>0&&!this.targetDetail&&this.detail<.01&&this.returnY===null&&!p&&e-this.lastInteraction>2.5;this.idleGain=t?0:Ie.lerp(this.idleGain,g?this.playfield.enabled?this.playfield.breathing&&!this.relayActive?1-this.playfield.bands.activity:0:1:0,1-Math.exp(-s*(g?.8:4))),this.pulseGain=Ie.lerp(this.pulseGain,this.targetDetail||this.returnY!==null||p?0:1,1-Math.exp(-s*8));const _=this.playfield,b=!t&&!this.targetDetail&&_.enabled,y=this.rhythm.update(b&&!this.reduced?_.bands:$d(),e,s,this.rhythmStyle);this.flatMix+=((b?_.flatten:0)-this.flatMix)*(this.reduced?1:1-Math.exp(-s*4)),this.subduedIndex.value=Math.max(Number(this.selectedIndexOnly),this.flatMix);const S=N=>this.selectedIndexOnly?1-Et(N/.4)*(1-this.flatMix):this.flatMix,E=b?_.target:null;E&&!this.relayLifts.has(E)&&this.relayLifts.set(E,0);for(const[N,G]of this.relayLifts){const oe=G+((N===E?.95:0)-G)*(this.reduced?1:1-Math.exp(-s*8));oe<.001&&N!==E?this.relayLifts.delete(N):this.relayLifts.set(N,oe)}const R=new P,x=(N,G)=>(R.set((G-2)*vi-v,-4.6,(N-15.5)*Ai+this.rail.value).project(this.camera),(R.x+1)/2),w=new Map,L=(N,G)=>{if(t)return ib(N,G,l,this.shoulder.value,this.laneFocus.value);const oe=Wp(N+this.coordinateOrigin.row,G+this.coordinateOrigin.lane,this.scanTime)*this.scanBlend,J=tb(N+this.coordinateOrigin.row,G+this.coordinateOrigin.lane,e)*this.idleGain;let te=0;if(!t&&this.motion.selectionWave){let me=0;for(const he of this.pulses){const Oe=Math.hypot(N-he.row,(G-he.lane)*2.2),I=e-he.time;me+=this.selectionPulse(Oe,I)*(this.deferSelectionPulse?eb(Oe,I):1)}te=Ie.clamp(me,-.6,.6)*this.pulseGain}const fe=N-this.shoulder.value;return(oe+ch(fe,26.56)*Xp(G,this.laneFocus.value))*(1-this.flatMix)+J+te+(b&&!this.reduced?Qy(N,G,e,_.bands,_.strength,y,x(N,G)):0)+(this.relayLifts.get(ln({row:N,lane:G}))??0)},C=(N,G)=>{let oe=w.get(G);oe||(oe=new Map,w.set(G,oe));const J=oe.get(N);if(J!==void 0)return J;const te=L(N,G);return oe.set(N,te),te},F=u.y+C(f,m);t||(this.returnY!==null&&this.rotation!==0?(this.lift.value=this.returnY-F,this.lift.velocity=0):(this.returnY=null,wn(this.lift,this.targetDetail?df:this.outgoing.some(N=>N.returnY!==null&&N.cell.lane===m&&Math.abs(N.cell.row-f)<5)?0:.4*this.targetReveal*(1-this.flatMix),this.motion.detailTransition?this.deferSelectionPulse&&!this.targetDetail&&this.lift.value<.4?7.6:4.2:35,s)));const H=this.targetDetail?Et((this.lift.value-.8)/2.4):this.returnY!==null?this.detail:Et((this.lift.value-.4)/(df-.4));this.detail=t?t.zoom:Ie.lerp(this.detail,H,o);const X=this.detail;this.decryption.update(s,X>.78&&this.lift.value>3.3,!1,t?l+5:void 0),this.appearance.apply(this.model,Et(this.lift.value/.4)),this.appearance.setClarity(this.model,this.modelClarity());const V=t?Et((l-21.9)/.86):this.reveal,k=Ie.clamp((l-21.92)/.75,0,1),O=t?-23*(1-k)**2:-28*(1-V);for(let N=this.outgoing.length-1;N>=0;N--){const G=this.outgoing[N],oe=this.cellPosition(G.cell),J=oe.y+C(G.cell.row,G.cell.lane);G.group.rotation.y=ff(G.group.rotation.y,s,!this.motion.detailTransition),G.returnY!==null?(G.lift.value=G.returnY-J,G.lift.velocity=0,G.group.rotation.y===0&&(G.returnY=null)):wn(G.lift,0,this.motion.detailTransition?4.5:35,s),G.group.position.set(oe.x-v,J+G.lift.value+d(G.cell)-this.presentationDrop(G.cell),oe.z+O+this.rail.value);const te=Et(G.lift.value/.4);this.appearance.apply(G.group,te),this.appearance.setTheme(G.group,this.theme.sample(G.cell,e),S(G.lift.value)),G.clarity=this.motion.modelDecryption?G.clarity*Math.exp(-s*9):0,this.appearance.setClarity(G.group,G.clarity);const{row:fe,lane:me}=G.cell;G.group.rotation.x=(C(fe+.5,me)-C(fe-.5,me))*.024*(1-X)*(1-te),G.lift.value<1e-4&&Math.abs(G.group.rotation.y)<1e-4&&(this.scene.remove(G.group),this.appearance.dispose(G.group),this.outgoing.splice(N,1))}if(this.pendingPulse&&!t&&!this.targetDetail&&this.targetReveal){const N=F+this.lift.value,G=this.outgoing.every(oe=>oe.cell.lane!==m||Math.abs(oe.cell.row-f)>4||oe.group.position.y+.015<N);this.lift.value>=.35&&this.returnY===null&&G&&(this.motion.selectionWave&&this.emitPulse(this.pendingPulse),this.pendingPulse=null)}this.appearance.setTheme(this.model,this.theme.sample(this.selectedCell,e),S(this.lift.value)),this.model.position.set(u.x-v,u.y+C(f,m)+this.lift.value+d(this.selectedCell)-this.presentationDrop(this.selectedCell),u.z+O+this.rail.value),this.model.rotation.set((C(f+.5,m)-C(f-.5,m))*.024*(1-X)*(1-Et(this.lift.value/.4)),t?0:this.rotation,0);const ie=Et((l-22.6)/1.6),Z=Et((l-24.25)/2.25),ce=Ie.degToRad(89-22*ie-8*Z),de=Ie.degToRad(3+40*Et((l-21.96)/.22)-8*ie-16*Z),ue=Ie.lerp(Ie.lerp(10.8,10.3,ie),7.33,Z),Ne=!!t&&this.container.closest("[data-layout]")?.dataset.layout==="opening",tt=Ne?this.container.clientWidth/this.container.clientHeight/(16/9):1,Je=N=>N/Math.min(1,tt),Q=Ie.lerp(Ie.lerp(28+7*ie,140,Z),72,X),se=new P(-1.091,Ie.lerp(-2.55+.4*ie,-.045,Z),Ie.lerp(2.48,.481,Z)).clone(),be=new P(-Math.sin(ce)*Math.cos(de),Math.sin(de),Math.cos(ce)*Math.cos(de));if(t){const N=Et((l-27.3)/1.3),G=Et((l-28.6)/5.4),oe=ce-Ie.degToRad(9*N+32*G),J=de-Ie.degToRad(1.5*N+3.7*G);be.set(-Math.sin(oe)*Math.cos(J),Math.sin(J),Math.cos(oe)*Math.cos(J))}else be.lerp(new P(-.277,.238,.931),X).normalize();if(t){const N=Et((l-25.4)/.95),G=new P().crossVectors(new P(0,1,0),be).normalize();se.addScaledVector(G,-2.05*(1-N)*Et((l-24.2)/.8))}if(t&&l>=25.05&&l<=27.3){const N=Et((l-25.4)/1.05),G=new P().crossVectors(new P(0,1,0),be).normalize(),oe=new P().crossVectors(be,G).normalize(),J=1080/Je(ue),te=this.model.position.clone().add(new P(-2.5,3.7,0));te.addScaledVector(G,-(Ie.lerp(840,518,N)-960)*tt/J),te.addScaledVector(oe,-(540-Ie.lerp(340,288,N))/J),se.lerp(te,Et((l-25.05)/.35))}if(t&&l>27.3){const N=Et((l-27.3)/6.7),G=Et((l-27.3)/1.25),oe=Ie.lerp(518-98*G,618,N),J=Ie.lerp(296+34*G,287,N),te=1080/Je(Ie.lerp(ue,5.9,X)),fe=new P().crossVectors(new P(0,1,0),be).normalize(),me=new P().crossVectors(be,fe).normalize(),he=this.model.position.clone().add(new P(-2.5,3.7,0));he.addScaledVector(fe,-(oe-960)*tt/te),he.addScaledVector(me,-(540-J)/te),se.lerp(he,Et((l-27.3)/.5))}const ye=dm(this.container.clientWidth,this.container.clientHeight,ue,X,this.container.closest("[data-layout]")?.dataset.layout==="compact");if(!t){const N=new P().crossVectors(new P(0,1,0),be).normalize(),G=new P().crossVectors(be,N).normalize(),oe=this.container.clientWidth,J=this.container.clientHeight,te=J/ye.span;if(ye.portrait){const me=new P(0,-4.6+ch(0,26.56)+.4+1.85,-2.17);me.addScaledVector(G,(ye.previewY-.5)*J/te),se.copy(me)}const fe=this.model.position.clone().add(new P(0,1.85,0));fe.addScaledVector(N,(.5-ye.detailX)*oe/te),fe.addScaledVector(G,(ye.detailY-.5)*J/te),se.lerp(fe,X)}const Le=se.clone().addScaledVector(be,Q);!t&&this.motion.pointerParallax&&!this.uiOnlyParallax&&(Le.x+=this.pointer.x*.12,Le.y-=this.pointer.y*.12);const St=this.targetDetail||this.detail>.01?this.motion.detailTransition:this.motion.selectionTransition,Ge=t?1:St?1-Math.exp(-s*5):1;this.camera.position.lerp(Le,Ge),this.cameraAim.lerp(se,Ge),this.camera.lookAt(this.cameraAim),this.camera.fov=Ie.lerp(this.camera.fov,Ie.radToDeg(2*Math.atan((t?Je(Ie.lerp(ue,5.9,X)):ye.span)/(2*Q))),Ge);const Ye=this.scene.fog,it=this.camera.position.distanceTo(this.cameraAim),He=this.themeAmount;Ye.near=it+Ie.lerp(5-4*He,-1,X),Ye.far=it+Ie.lerp(25-9*He,12,X),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),b&&!this.reduced&&w.clear();const dt=(!!t||!this.looping)&&!Ne;this.cells=dt?Array.from({length:160},(N,G)=>jl(G)):this.visibility.update(this.camera,Ye.far,v,O+this.rail.value,this.extraCoverage);const D=new Set(this.outgoing.map(N=>ln(N.cell)));D.add(ln(this.selectedCell)),this.drawnCells=[],this.relayPoints.clear(),this.drawCoverage.update(this.camera),this.shadowCoverage?.begin(),this.matrixUpdates??=new Ws(this.instances[0].instanceMatrix),this.themeAttribute&&(this.themeUpdates??=new Ws(this.themeAttribute));for(const N of this.cells){const{row:G,lane:oe}=N;if(D.has(ln(N)))continue;const J=(oe-2)*vi-v,te=-4.6+C(G,oe)+d(N)-this.presentationDrop(N),fe=(G-15.5)*Ai+O+this.rail.value;if(!dt&&!this.visibility.intersects(J,te,fe))continue;const me=C(G+.5,oe)-C(G-.5,oe);if(this.dummy.position.set(J,te,fe),this.dummy.rotation.set(me*.024*(1-X),0,0),this.dummy.scale.setScalar(1),this.dummy.updateMatrix(),_.enabled&&this.relayPoints.set(ln(N),{cell:{...N},point:new P(0,3.5,0).applyMatrix4(this.dummy.matrix)}),this.shadowCoverage?.add(this.dummy.matrix),!this.drawCoverage.contains(J,te,fe))continue;const he=this.drawnCells.length;this.ensureInstanceCapacity(he+1),this.drawnCells.push(N),this.themeUpdates?.scalar(he,this.theme.sample(N,e)),this.matrixUpdates.set(he*16,this.dummy.matrix.elements)}const xt=this.instances[0].count!==this.drawnCells.length,$e=this.matrixUpdates.commit(),rt=this.shadowCoverage?.commit()??!1,xe=$e||rt;for(const N of this.instances)N.count=this.drawnCells.length;(xe||xt||!this.instances[0].boundingSphere)&&this.instances[0].computeBoundingSphere(),this.themeUpdates?.commit();let T=-1/0;const A=m,U=f;for(let N=U-5;N<=U+5;N++)N!==U&&(T=Math.max(T,-4.6+C(N,A)+3.76));for(const N of this.outgoing)N.cell.lane===A&&Math.abs(N.cell.row-U)<=5&&(T=Math.max(T,N.group.position.y+3.76));this.clearance=this.model.position.y-T,this.canInspect=!t&&!!this.targetDetail&&X>.9&&this.pulseGain<.01&&this.clearance>.3,this.container.dataset.inspection=this.returnY!==null?"aligning":this.canInspect?"ready":this.targetDetail?"lifting":"preview";const K=this.model.position.clone().add(new P(0,2,0)).applyMatrix4(this.camera.matrixWorldInverse),ee=this.bokeh.uniforms;ee.focus.value=-K.z,ee.aperture.value=Ie.lerp(3e-4,8e-4,X)*this.quality.depthOfField/100,this.renderer.info.reset();const q=this.renderState;if(this.scene.updateMatrixWorld(),xe||t)q.invalidate();else if(q.begin(),q.floats(...this.camera.projectionMatrix.elements,...this.camera.matrixWorldInverse.elements,...this.camera.position.toArray(),Ye.near,Ye.far,this.themeAmount,this.subduedIndex.value,ee.focus.value,ee.aperture.value),this.scene.traverse(N=>{if(q.add(N.id,Number(N.visible)),!(N instanceof nt))return;N.modelViewMatrix.multiplyMatrices(this.camera.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),q.floats(...N.modelViewMatrix.elements,...N.normalMatrix.elements,...N.matrixWorld.elements);const G=N.material;q.add(N.geometry.id,G.uuid,G.map?.uuid,G.map?.version??0),q.floats(G.opacity,G.roughness,G.metalness,G.transmission,G.thickness,G.attenuationDistance,G.clearcoat,G.clearcoatRoughness,G.color.r,G.color.g,G.color.b,G.attenuationColor?.r??0,G.attenuationColor?.g??0,G.attenuationColor?.b??0);for(const oe of["appearance","glassClarity","themeAmount","subduedIndex"])q.floats(N.userData[oe]?.value??0);N instanceof ls&&q.add(N.count,N.instanceMatrix.version,this.themeAttribute?.version??0)}),!q.end()){this.reusedFrames++;return}this.renderedFrames++;const pe=this.shadowState;pe.begin(),pe.add(this.light.shadow.mapSize.x,Number(this.renderer.shadowMap.enabled)),pe.floats(...this.light.matrixWorld.elements,...this.light.target.matrixWorld.elements),this.scene.traverseVisible(N=>{!(N instanceof nt)||!N.castShadow||(pe.add(N.id,N.geometry.id),pe.floats(...N.matrixWorld.elements),N instanceof ls&&pe.add(N.count,N.instanceMatrix.version))}),this.renderer.shadowMap.needsUpdate=pe.end()||this.light.shadow.needsUpdate,this.superPerformance?this.renderer.render(this.scene,this.camera):this.composer.render()}projectCard(e,t){this.model.updateMatrixWorld(!0);const i=this.model.localToWorld(new P(e,t,.255)).project(this.camera);return[(i.x+1)*this.container.clientWidth/2,(1-i.y)*this.container.clientHeight/2]}get decryptionFrame(){return this.decryption.frame}finishDecryption(){this.decryption.finish()}get detailVisibility(){return Et((this.detail-.25)/.55)}getStats(){this.model.updateMatrixWorld(!0);const e=(t,i,s)=>{const r=this.model.localToWorld(new P(t,i,s)).project(this.camera);return[Math.round((r.x+1)*this.container.clientWidth/2),Math.round((1-r.y)*this.container.clientHeight/2)]};return{decryption:{...this.decryption.frame,clarity:this.decryption.clarity,modelClarity:this.modelClarity()},topLeft:e(-2.5,3.7,0),topRight:e(2.5,3.7,0),labelTopLeft:e(-1.855,3.27,.255),labelBottomLeft:e(-1.855,2.81,.255),modelPosition:this.model.position.toArray().map(t=>Math.round(t*1e4)/1e4),cameraPosition:this.camera.position.toArray().map(t=>Math.round(t*1e4)/1e4),fieldOfView:this.camera.fov,loaded:this.loaded,drawCalls:this.renderer.info.render.calls,renderedFrames:this.renderedFrames,reusedFrames:this.reusedFrames,superPerformance:this.superPerformance,presentation:this.presence,triangles:this.renderer.info.render.triangles,archiveCount:this.drawnCells.length,archiveCandidates:this.cells.length,archiveCulled:this.cells.length-this.drawnCells.length,archiveCapacity:this.instanceCapacity,archiveCoverage:this.extraCoverage?"extra":"standard",returningFiles:this.outgoing.length,selectionPhase:this.pendingPulse?"lifting":this.pulses.length?"wave":"settled",pendingPulse:this.pendingPulse?{...this.pendingPulse}:null,pulses:this.pulses.map(t=>({...t})),referenceTime:Math.round((this.scanTime+5)*100)/100,selectedSlot:this.selectedSlot,selectedLane:Math.floor(this.selectedSlot/32),selectedCell:{...this.selectedCell},hoverCell:this.hoverCell?{...this.hoverCell}:null,hoverLifts:Object.fromEntries(this.hoverLifts),dragTrack:this.dragTrack?{...this.dragTrack}:null,archiveMomentum:this.archiveMomentum?{phase:this.archiveMomentum.motion.phase,value:this.archiveMomentum.motion.value,velocity:this.archiveMomentum.motion.velocity}:null,holdingArchive:this.holdingArchive,dragProjection:this.dragProjection(),dragMapping:this.archiveDrag.active?"free":null,coordinateOrigin:{...this.coordinateOrigin},poolBounds:{minLane:Math.min(...this.cells.map(t=>t.lane)),maxLane:Math.max(...this.cells.map(t=>t.lane)),minRow:Math.min(...this.cells.map(t=>t.row)),maxRow:Math.max(...this.cells.map(t=>t.row))},laneFocus:this.laneFocus.value,columnCamera:this.columnCamera.value,rotation:this.rotation,clearance:this.clearance,canInspect:this.canInspect,returnPhase:this.returnY!==null?"aligning":"lowering",extraction:Math.round(this.lift.value*1e3)/1e3,appearance:Math.round(Et(this.lift.value/.4)*1e3)/1e3,cameraDetail:Math.round(this.detail*1e3)/1e3,idleGain:this.idleGain,flatten:this.flatMix,spectrumActivity:this.playfield.bands.activity,selectedIndexDim:this.model.children.find(t=>t.userData.surface==="Index_Inlay")?.userData.subduedIndex?.value,returningIndexDims:this.outgoing.map(t=>({cell:t.cell,dim:t.group.children.find(i=>i.userData.surface==="Index_Inlay")?.userData.subduedIndex?.value})),cameraDistance:this.camera.position.distanceTo(this.cameraAim),cameraNear:this.camera.near,cameraFar:this.camera.far,fogNear:this.scene.fog.near,fogFar:this.scene.fog.far,returningAppearance:this.outgoing.map(t=>({slot:t.slot,clarity:t.group.children.find(i=>i.userData.surface==="Frosted_Polymer")?.userData.glassClarity?.value,cell:{...t.cell},lift:t.lift.value,quality:Et(t.lift.value/.4),rotation:t.group.rotation.y,worldY:t.group.position.y,phase:t.returnY!==null?"aligning":"lowering"})),rail:Math.round(this.rail.value*1e3)/1e3}}}const pf={type:"change"},eu={type:"start"},qp={type:"end"},so=new dr,mf=new Sn,rb=Math.cos(70*Ie.DEG2RAD),Ot=new P,ii=2*Math.PI,mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},tc=1e-6;class ab extends Tv{constructor(e,t=null){super(e,t),this.state=mt.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qs.ROTATE,MIDDLE:qs.DOLLY,RIGHT:qs.PAN},this.touches={ONE:Rn.ROTATE,TWO:Rn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Ni,this._lastTargetPosition=new P,this._quat=new Ni().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xr,this._sphericalDelta=new Xr,this._scale=1,this._panOffset=new P,this._rotateStart=new De,this._rotateEnd=new De,this._rotateDelta=new De,this._panStart=new De,this._panEnd=new De,this._panDelta=new De,this._dollyStart=new De,this._dollyEnd=new De,this._dollyDelta=new De,this._dollyDirection=new P,this._mouse=new De,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=lb.bind(this),this._onPointerDown=ob.bind(this),this._onPointerUp=cb.bind(this),this._onContextMenu=gb.bind(this),this._onMouseWheel=db.bind(this),this._onKeyDown=fb.bind(this),this._onTouchStart=pb.bind(this),this._onTouchMove=mb.bind(this),this._onMouseDown=hb.bind(this),this._onMouseMove=ub.bind(this),this._interceptControlDown=vb.bind(this),this._interceptControlUp=Ab.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pf),this.update(),this.state=mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Ot.copy(t).sub(this.target),Ot.applyQuaternion(this._quat),this._spherical.setFromVector3(Ot),this.autoRotate&&this.state===mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ii:i>Math.PI&&(i-=ii),s<-Math.PI?s+=ii:s>Math.PI&&(s-=ii),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ot.setFromSpherical(this._spherical),Ot.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ot),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ot.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ot.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(so.origin.copy(this.object.position),so.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(so.direction))<rb?this.object.lookAt(this.target):(mf.setFromNormalAndCoplanarPoint(this.object.up,this.target),so.intersectPlane(mf,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>tc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>tc||this._lastTargetPosition.distanceToSquared(this.target)>tc?(this.dispatchEvent(pf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ii/60*this.autoRotateSpeed*e:ii/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ot.setFromMatrixColumn(t,0),Ot.multiplyScalar(-e),this._panOffset.add(Ot)}_panUp(e,t){this.screenSpacePanning===!0?Ot.setFromMatrixColumn(t,1):(Ot.setFromMatrixColumn(t,0),Ot.crossVectors(this.object.up,Ot)),Ot.multiplyScalar(e),this._panOffset.add(Ot)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ot.copy(s).sub(this.target);let r=Ot.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ii*this._rotateDelta.x/t.clientHeight),this._rotateUp(ii*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ii*this._rotateDelta.x/t.clientHeight),this._rotateUp(ii*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new De,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function ob(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function lb(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function cb(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qp),this.state=mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function hb(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case qs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=mt.DOLLY;break;case qs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}break;case qs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=mt.PAN}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(eu)}function ub(n){switch(this.state){case mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function db(n){this.enabled===!1||this.enableZoom===!1||this.state!==mt.NONE||(n.preventDefault(),this.dispatchEvent(eu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(qp))}function fb(n){this.enabled!==!1&&this._handleKeyDown(n)}function pb(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Rn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=mt.TOUCH_ROTATE;break;case Rn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=mt.TOUCH_PAN;break;default:this.state=mt.NONE}break;case 2:switch(this.touches.TWO){case Rn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=mt.TOUCH_DOLLY_PAN;break;case Rn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=mt.TOUCH_DOLLY_ROTATE;break;default:this.state=mt.NONE}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(eu)}function mb(n){switch(this._trackPointer(n),this.state){case mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=mt.NONE}}function gb(n){this.enabled!==!1&&n.preventDefault()}function vb(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ab(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const xb=n=>Math.atan2(Math.sin(n),Math.cos(n));class _b{constructor(e){this.camera=e}camera;focus=new P;pose=new Xr;desired=new Xr;offset=new P;resetFrom=new Xr;resetFocus=new P;elapsed=0;resetting=!1;snap(e,t){this.resetting=!1,this.focus.copy(t),this.pose.setFromVector3(this.offset.copy(e.position).sub(t)),this.apply()}reset(){this.resetFrom.copy(this.pose),this.resetFocus.copy(this.focus),this.elapsed=0,this.resetting=!0}interruptReset(e,t){this.resetting&&(this.resetting=!1,e.position.copy(this.camera.position),t.copy(this.focus),e.lookAt(t))}update(e,t,i,s=!1){if(s){this.snap(e,t);return}if(this.desired.setFromVector3(this.offset.copy(e.position).sub(t)),this.resetting){this.elapsed+=Math.max(0,i);const r=Math.min(1,this.elapsed/.56),a=1-(1-r)**3;this.focus.lerpVectors(this.resetFocus,t,a),this.interpolate(this.resetFrom,this.desired,a,a),r===1&&(this.resetting=!1)}else{const r=1-Math.exp(-13*Math.max(0,i)),a=1-Math.exp(-9*Math.max(0,i)),o=1-Math.exp(-15*Math.max(0,i));this.focus.lerp(t,r),this.interpolate(this.pose,this.desired,a,o),this.focus.distanceToSquared(t)<1e-10&&this.focus.copy(t)}this.apply()}interpolate(e,t,i,s){this.pose.radius=Math.exp(Ie.lerp(Math.log(e.radius),Math.log(t.radius),s)),this.pose.phi=Ie.lerp(e.phi,t.phi,i),this.pose.theta=e.theta+xb(t.theta-e.theta)*i,this.pose.makeSafe()}apply(){this.camera.position.copy(this.offset.setFromSpherical(this.pose)).add(this.focus),this.camera.lookAt(this.focus)}}function Yp(){try{const n=navigator.getGamepads();for(const e of n)if(e?.connected&&e.mapping==="standard")return e}catch{}}function yb(n){const e=new Set,t=n.axes,i=r=>n.buttons[r]?.pressed??!1,s=r=>t[r]??0;return(i(0)||i(9))&&e.add("Enter"),(i(1)||i(8))&&e.add("Escape"),i(2)&&e.add("/"),i(3)&&e.add("Home"),i(4)&&e.add("Shift+Tab"),i(5)&&e.add("Tab"),(i(12)||s(1)<-ro)&&e.add("ArrowUp"),(i(13)||s(1)>ro)&&e.add("ArrowDown"),(i(14)||s(0)<-ro)&&e.add("ArrowLeft"),(i(15)||s(0)>ro)&&e.add("ArrowRight"),e}const jp=new WeakSet,Mb=n=>jp.has(n);function gf(n,e=!1){const t=document.activeElement,i=t instanceof HTMLElement&&t!==document.body?t:document.body,s=t instanceof HTMLElement?t.closest(".terminal-modal"):null;if(n==="Tab"||n==="Shift+Tab"||s&&n.startsWith("Arrow")){const l=[...(s??(t instanceof HTMLElement?t.closest('[role="dialog"]'):null)??document).querySelectorAll('a[href],button,input,select,summary,[tabindex="0"]')].filter(d=>d.tabIndex>=0&&!d.matches(':disabled,[aria-disabled="true"]')&&!d.closest("[inert]")&&d.getClientRects().length>0),c=l.indexOf(t),h=["Shift+Tab","ArrowUp","ArrowLeft"].includes(n);l.length&&l[c<0?h?l.length-1:0:(c+(h?l.length-1:1))%l.length].focus();return}const a=new KeyboardEvent("keydown",{key:n,repeat:e,bubbles:!0,cancelable:!0});jp.add(a),i.dispatchEvent(a),n==="Enter"&&!a.defaultPrevented&&t instanceof HTMLElement&&t.matches('button,a[href],summary,input[type="checkbox"],input[type="radio"]')&&!t.matches(':disabled,[aria-disabled="true"]')&&!t.closest("[inert]")&&t.click()}const ro=.35,bb=400,Sb=120,$n=new Set,Hs=new Map,es=new Map;let vf=0,hh=!1,ic=!1,Do="keyboard";const uh=new Set;function Lo(n){if(Do!==n){Do=n;for(const e of uh)e(n)}}function wb(){return Do}function Zp(n){return uh.add(n),n(Do),()=>{uh.delete(n)}}function Qp(){if(vf=requestAnimationFrame(Qp),document.hidden||!document.hasFocus()){ic=!0,$n.clear(),Hs.clear(),es.clear();return}const n=Yp();if(!n){Lo("keyboard"),$n.clear(),Hs.clear(),es.clear(),hh=!1,cancelAnimationFrame(vf);return}const e=yb(n);if(ic){ic=e.size>0;return}const t=performance.now();e.size>0&&Lo("gamepad");for(const i of[...$n])e.has(i)||($n.delete(i),Hs.delete(i),es.delete(i));for(const i of e)$n.has(i)?(i.startsWith("Arrow")||i.endsWith("Tab"))&&t-Hs.get(i)>=bb&&t-es.get(i)>=Sb&&(es.set(i,t),gf(i,!0)):($n.add(i),Hs.set(i,t),es.set(i,t),gf(i))}function Af(){hh||!Yp()||(hh=!0,Qp())}let xf=!1;function Eb(){xf||(xf=!0,!(typeof navigator>"u"||!("getGamepads"in navigator))&&(window.addEventListener("keydown",n=>{n.isTrusted&&Lo("keyboard")},{capture:!0,passive:!0}),window.addEventListener("pointerdown",()=>Lo("keyboard"),{passive:!0}),Af(),window.addEventListener("gamepadconnected",()=>{Af()}),window.addEventListener("gamepaddisconnected",()=>{$n.clear(),Hs.clear(),es.clear()})))}const nc=[{id:"fasteners",label:"紧固件",en:"FASTENERS",depth:2.75},{id:"cover",label:"透明盖板",en:"OPTICAL COVER",depth:1.85},{id:"optical-lenses",label:"折射环组",en:"REFRACTIVE RINGS",depth:.75},{id:"optical-core",label:"光学核心",en:"OPTICAL CORE",depth:-.15},{id:"substrate",label:"信息基板",en:"SUBSTRATE",depth:-1.1},{id:"carrier",label:"背板与框架",en:"CARRIER",depth:-2.05}];class Tb{constructor(e,t,i=()=>{}){this.onSound=i,this.onClose=t,this.root=document.createElement("section"),this.root.className="model-viewer",this.root.hidden=!0,this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-labelledby","viewer-title"),this.root.innerHTML=`
      <div class="viewer-canvas"></div>
      <div class="scene-atmosphere viewer-atmosphere" aria-hidden="true"></div>
      <header class="viewer-header">
        <button class="viewer-back" data-viewer="close">← <span>返回档案</span><kbd>ESC</kbd></button>
        <div class="viewer-heading"><span>RHINE LAB / OBJECT STUDY</span><h2 id="viewer-title">档案模型</h2><p id="viewer-file"></p></div>
        <span class="viewer-index">360<span>°</span></span>
      </header>
      <div class="viewer-surface" role="group" aria-label="玻璃模式"><button data-viewer="clear" aria-pressed="true">清晰</button><button data-viewer="frosted" aria-pressed="false">磨砂</button></div>
      <aside class="viewer-parts" aria-label="模型装配结构"><div>ASSEMBLY / 装配结构</div>${nc.map((s,r)=>`<p><span>${String(r+1).padStart(2,"0")}</span><strong>${s.label}</strong><small>${s.en}</small></p>`).join("")}</aside>
      <div class="viewer-loading" role="status"><span>正在载入模型…</span><button data-viewer="retry" hidden>重新载入 ↗</button></div>
      <footer class="viewer-footer">
        <div class="viewer-help"><span>拖动旋转</span><span>↑ ↓ ← → 平移</span><span>滚轮缩放</span></div>
        <div class="viewer-actions"><button data-viewer="explode" aria-pressed="false"><span>＋</span> 拆解档案</button><button data-viewer="assemble" aria-pressed="true"><span>−</span> 一键重组</button></div>
        <button class="viewer-reset" data-viewer="reset">复位视角 <span>↗</span></button>
      </footer>
      <div class="viewer-state" aria-live="polite">已组装</div>`,e.appendChild(this.root),this.disposeDeviceListener=Zp(()=>this.updateHelp()),this.canvasHost=this.root.querySelector(".viewer-canvas"),this.renderer=new Tp({antialias:!0,powerPreference:"high-performance"}),this.renderer.toneMapping=ha,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.tabIndex=0,this.renderer.domElement.setAttribute("aria-label","档案三维模型：拖动旋转，方向键平移，滚轮或加减键缩放，Home 复位"),this.canvasHost.appendChild(this.renderer.domElement),this.scene.background=new Te("#eae5e1"),this.scene.fog=new Wo("#eae5e1",13.5,26.5),Np(this.renderer,this.scene),this.camera.position.copy(this.initialCamera),this.controlCamera.copy(this.camera),this.controls=new ab(this.controlCamera,this.renderer.domElement),this.controls.enableDamping=!1,this.pipeline=NM(this.renderer,this.scene,this.camera),this.pipeline.smaa.enabled=!1,this.controls.rotateSpeed=.65,this.controls.zoomSpeed=.7,this.controls.panSpeed=.7,this.controls.minDistance=5,this.controls.maxDistance=28,this.controls.maxTargetRadius=5,this.controls.screenSpacePanning=!0,this.controls.touches.ONE=Rn.ROTATE,this.controls.touches.TWO=Rn.DOLLY_PAN,this.controls.enabled=!1,this.controls.update(),this.cameraMotion.snap(this.controlCamera,this.controls.target),this.controls.addEventListener("start",()=>this.interruptReset()),this.root.addEventListener("click",s=>{if(this.closing)return;const r=s.target.closest("[data-viewer]")?.dataset.viewer;r==="close"&&this.close(),r==="retry"&&this.load(),!(this.loading||!this.source)&&((r==="clear"||r==="frosted")&&(this.setSurface(r==="clear"),this.onSound("tick")),r==="explode"&&this.targetSpread!==1&&(this.setExploded(!0),this.onSound("explode")),r==="assemble"&&this.targetSpread!==0&&(this.setExploded(!1),this.onSound("assemble")),r==="reset"&&(this.resetView(),this.onSound("tick")))}),this.root.addEventListener("keydown",s=>this.keydown(s))}onSound;themeAmount=0;setTheme(e){this.themeAmount=e}root;canvasHost;renderer;pipeline;quality=ss(void 0);superPerformance=!1;dispose(){this.disposeDeviceListener?.(),this.request++,this.isOpen&&this.finishClose(),this.controls.dispose(),sh(this.scene);for(const e of this.pipeline.composer.passes)e.dispose();this.pipeline.composer.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.root.remove()}setSuperPerformance(e){this.superPerformance!==e&&(this.superPerformance=e,this.resize())}appliedQuality="";scene=new Xo;camera=new Wt(34,16/9,.3,120);controlCamera=this.camera.clone();cameraMotion=new _b(this.camera);controls;source;groups=new Map;spread={value:0,velocity:0};targetSpread=0;clarity={value:1,velocity:0};targetClarity=1;lastTime=0;request=0;reduced=!1;motion=ia();loading=!1;closing=!1;transitions=[];disposeDeviceListener;modelTransition;transitionId=0;status="";opener=null;siblings=[];initialCamera=new P(7.2,3.8,12);onClose;provider;isOpen=!1;setMotion(e){this.motion={...e},this.reduced=!e.viewerNavigation,this.root.dataset.motionModel=e.viewerModelTransition?"full":"reduced",this.root.dataset.motionSurface=e.surfaceTransitions?"full":"reduced",!e.surfaceTransitions&&this.isOpen&&(this.transitionId++,this.closing?this.finishClose():(this.transitions.forEach(t=>t.cancel()),this.transitions=[],this.root.dataset.transition="open")),e.viewerModelTransition||(this.modelTransition?.cancel(),this.modelTransition=void 0,this.clarity={value:this.targetClarity,velocity:0},this.spread={value:this.targetSpread,velocity:0})}open(e,t,i,s){this.isOpen||(this.isOpen=!0,this.closing=!1,this.reduced=s,this.provider=i,this.opener=document.activeElement,this.siblings=[...this.root.parentElement.children].filter(r=>r instanceof HTMLElement&&r!==this.root).map(r=>({node:r,inert:r.inert})),this.siblings.forEach(({node:r})=>r.inert=!0),this.root.hidden=!1,this.root.dataset.transition="opening",this.root.querySelector("#viewer-title").textContent=t,this.root.querySelector("#viewer-file").textContent="FILE "+e+" / INTERNAL DATABASE",this.spread={value:0,velocity:0},this.targetSpread=0,this.clarity={value:1,velocity:0},this.setSurface(!0),this.lastTime=0,this.root.dataset.exploded="false",this.resetView(!1),this.resize(),this.renderer.domElement.focus({preventScroll:!0}),this.enter(),this.load())}async load(){if(!this.provider||this.loading)return;const e=++this.request;this.loading=!0,this.controls.enabled=!1;const t=this.root.querySelector(".viewer-loading");t.hidden=!1,t.querySelector("span").textContent="正在载入模型…",t.querySelector("button").hidden=!0,this.setButtonsDisabled(!0);try{const i=await this.provider();if(!this.isOpen||this.closing||e!==this.request){i.dispose();return}this.source=i;for(const s of nc){const r=new qi;r.name=s.id,this.groups.set(s.id,r)}for(const s of[...i.model.children])this.groups.get(s.userData.assemblyPart??"cover")?.add(s);for(const s of this.groups.values())i.model.add(s);i.model.position.set(0,-1.85,0),this.scene.add(i.model),oh(i.model,this.renderer,this.quality),this.loading=!1,t.hidden=!0,this.controls.enabled=!0,this.setButtonsDisabled(!1),this.setExploded(!1),this.setStatus("已组装"),this.update(this.lastTime),this.motion.viewerModelTransition&&(this.modelTransition=this.canvasHost.animate([{opacity:0,transform:"scale(0.97)"},{opacity:1,transform:"scale(1)"}],{duration:380,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}catch(i){if(!this.isOpen||this.closing||e!==this.request)return;this.loading=!1,t.querySelector("span").textContent="模型载入失败，请重试",t.querySelector("button").hidden=!1,console.error("Model viewer failed to load",i)}}enter(){const e=++this.transitionId;if(this.transitions.forEach(i=>i.cancel()),this.transitions=[],!this.motion.surfaceTransitions){this.root.dataset.transition="open";return}const t=this.root.animate([{opacity:0},{opacity:1}],{duration:320,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});this.transitions.push(t);for(const i of[".viewer-header",".viewer-footer",".viewer-state"]){const s=this.root.querySelector(i);this.transitions.push(s.animate([{opacity:0,translate:"0 10px"},{opacity:1,translate:"0 0"}],{duration:300,delay:60,fill:"backwards",easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}t.finished.then(()=>{e===this.transitionId&&(this.root.dataset.transition="open")}).catch(()=>{})}close(){if(!this.isOpen||this.closing)return;this.closing=!0,this.request++,this.loading=!1,this.controls.enabled=!1,this.setButtonsDisabled(!0);const e=++this.transitionId,t=getComputedStyle(this.root).opacity,i=getComputedStyle(this.canvasHost),s=i.opacity,r=i.transform;if(this.modelTransition?.cancel(),this.modelTransition=void 0,this.transitions.forEach(o=>o.cancel()),this.transitions=[],this.root.dataset.transition="closing",!this.motion.surfaceTransitions){this.finishClose();return}const a=this.root.animate([{opacity:t},{opacity:0}],{duration:220,easing:"cubic-bezier(0.4, 0, 1, 1)",fill:"forwards"});this.transitions.push(a,this.canvasHost.animate([{transform:r,opacity:s},{transform:"scale(0.97)",opacity:0}],{duration:220,easing:"cubic-bezier(0.4, 0, 1, 1)",fill:"forwards"})),a.finished.then(()=>{e===this.transitionId&&this.finishClose()}).catch(()=>{})}finishClose(){this.isOpen=!1,this.closing=!1,this.root.hidden=!0,this.root.dataset.transition="closed",this.modelTransition?.cancel(),this.modelTransition=void 0,this.transitions.forEach(e=>e.cancel()),this.transitions=[],this.source&&(this.scene.remove(this.source.model),this.source.dispose(),this.source=void 0),this.groups.clear(),this.siblings.forEach(({node:e,inert:t})=>e.inert=t),this.siblings=[],this.opener?.focus({preventScroll:!0}),this.onClose()}setButtonsDisabled(e){for(const t of["explode","assemble","reset","clear","frosted"])this.root.querySelector(`[data-viewer="${t}"]`).disabled=e}setSurface(e){this.targetClarity=e?1:0,this.root.dataset.surface=e?"clear":"frosted",this.root.querySelector('[data-viewer="clear"]').setAttribute("aria-pressed",String(e)),this.root.querySelector('[data-viewer="frosted"]').setAttribute("aria-pressed",String(!e)),this.motion.viewerModelTransition||(this.clarity={value:this.targetClarity,velocity:0})}setExploded(e){this.targetSpread=e?1:0,this.root.dataset.exploded=String(e),this.root.querySelector('[data-viewer="explode"]').setAttribute("aria-pressed",String(e)),this.root.querySelector('[data-viewer="assemble"]').setAttribute("aria-pressed",String(!e)),this.setStatus(e?"正在拆解":this.spread.value>.001?"正在重组":"已组装"),this.motion.viewerModelTransition||(this.spread={value:this.targetSpread,velocity:0})}setStatus(e){e!==this.status&&(this.status=e,this.root.querySelector(".viewer-state").textContent=e)}resetView(e=!0){this.controls.enabled=!1,this.controls.enableDamping=!1,this.controls.update(),this.controls.target.set(0,0,0),this.controlCamera.position.copy(this.initialCamera),this.controls.enableDamping=!1,this.controls.update(),e&&this.motion.viewerNavigation?this.cameraMotion.reset():this.cameraMotion.snap(this.controlCamera,this.controls.target),this.controls.enabled=this.isOpen&&!this.loading&&!!this.source}interruptReset(){this.cameraMotion.resetting&&(this.cameraMotion.interruptReset(this.controlCamera,this.controls.target),this.controls.update())}keydown(e){if(e.stopPropagation(),e.key==="Escape"){e.preventDefault(),this.close();return}if(this.closing){e.preventDefault();return}if(e.key==="Tab"){const t=[...this.root.querySelectorAll('button:not([disabled]):not([hidden]),canvas[tabindex="0"]')],i=t[0],s=t.at(-1);e.shiftKey&&document.activeElement===i&&(e.preventDefault(),s?.focus()),!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),i?.focus());return}if(!(!this.source||this.loading)){if(e.key==="Home"){e.preventDefault(),this.resetView(),this.onSound("tick");return}if(["+","=","-"].includes(e.key)){e.preventDefault(),this.interruptReset();const t=this.controlCamera.position.distanceTo(this.controls.target),i=Ie.clamp(t*(e.key==="-"?1.12:1/1.12),5,28);this.controlCamera.position.sub(this.controls.target).multiplyScalar(i/t).add(this.controls.target),this.controls.update();return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)){e.preventDefault(),this.interruptReset();const t=new P().setFromMatrixColumn(this.camera.matrix,0),i=new P().setFromMatrixColumn(this.camera.matrix,1),s=new P,r=this.controlCamera.position.distanceTo(this.controls.target)*.025;e.key==="ArrowLeft"&&s.addScaledVector(t,-r),e.key==="ArrowRight"&&s.addScaledVector(t,r),e.key==="ArrowUp"&&s.addScaledVector(i,r),e.key==="ArrowDown"&&s.addScaledVector(i,-r);const a=this.controls.target.clone();this.controls.target.add(s),this.controls.target.clampLength(0,this.controls.maxTargetRadius),this.controlCamera.position.add(this.controls.target.clone().sub(a)),this.controls.update()}}}setQuality(e){const t=JSON.stringify(e);this.appliedQuality!==t&&(this.appliedQuality=t,this.quality=ss(e),this.pipeline.smaa.enabled=this.quality.antialias==="smaa",oh(this.scene,this.renderer,this.quality),this.resize())}resize(){if(!this.isOpen)return;const e=this.canvasHost.clientWidth,t=this.canvasHost.clientHeight;Hp(this.renderer,this.pipeline.composer,this.canvasHost,this.quality,this.superPerformance),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.controlCamera.aspect=this.camera.aspect,this.controlCamera.updateProjectionMatrix(),this.updateHelp()}updateHelp(){const e=matchMedia("(pointer: coarse)").matches,t=this.root.querySelector(".viewer-help");t.innerHTML=wb()==="gamepad"?"<span>LS · DP 平移</span><span>Y 复位视角</span><span>LB · RB 选择操作 / A 确认 / B 返回</span>":e?"<span>单指旋转</span><span>双指缩放 / 平移</span>":"<span>拖动旋转</span><span>↑ ↓ ← → 平移</span><span>滚轮缩放</span>"}update(e){if(!this.isOpen)return;Pp(this.scene,this.renderer,this.themeAmount),this.source?.model.traverse(o=>{o.userData.themeAmount&&(o.userData.themeAmount.value=this.themeAmount)});const t=Math.min(this.lastTime?e-this.lastTime:1/60,.05);if(this.lastTime=e,this.source){wn(this.clarity,this.targetClarity,8,t),Math.abs(this.clarity.value-this.targetClarity)<1e-4&&Math.abs(this.clarity.velocity)<.001&&(this.clarity={value:this.targetClarity,velocity:0}),this.source.setClarity?.(this.clarity.value),this.motion.viewerModelTransition?wn(this.spread,this.targetSpread,5.5,t):this.spread={value:this.targetSpread,velocity:0},Math.abs(this.spread.value-this.targetSpread)<1e-4&&Math.abs(this.spread.velocity)<.001&&(this.spread={value:this.targetSpread,velocity:0},this.setStatus(this.targetSpread?"已拆解":"已组装"));for(const o of nc)this.groups.get(o.id).position.z=o.depth*this.spread.value}this.controls.update(),this.cameraMotion.update(this.controlCamera,this.controls.target,t,this.reduced);const s=this.root.closest("[data-layout]")?.dataset.layout==="portrait"?Math.min(1.15,this.camera.aspect/.85)/(1+.08*this.spread.value):1;this.camera.zoom!==s&&(this.camera.zoom=s,this.controlCamera.zoom=s,this.camera.updateProjectionMatrix(),this.controlCamera.updateProjectionMatrix());const r=this.scene.fog,a=this.camera.position.length();r.near=Math.max(0,a-1),r.far=a+12,this.quality.antialias==="smaa"?this.pipeline.composer.render():this.renderer.render(this.scene,this.camera),this.root.dataset.stats=JSON.stringify({ready:!!this.source,clarity:this.clarity.value,targetClarity:this.targetClarity,spread:this.spread.value,target:this.targetSpread,distance:this.camera.position.distanceTo(this.cameraMotion.focus),targetPosition:this.cameraMotion.focus.toArray(),requestedTarget:this.controls.target.toArray(),requestedDistance:this.controlCamera.position.distanceTo(this.controls.target),cameraPosition:this.camera.position.toArray(),resetting:this.cameraMotion.resetting,azimuth:this.controls.getAzimuthalAngle(),polar:this.controls.getPolarAngle(),parts:[...this.groups].map(([o,l])=>({id:o,z:l.position.z,meshes:l.children.length}))})}}const Kp="cubic-bezier(0.22, 1, 0.36, 1)",Cb="cubic-bezier(0.4, 0, 1, 1)";class Jp{constructor(e,t,i=300,s=200){this.root=e,this.panel=t,this.enterDuration=i,this.exitDuration=s}root;panel;enterDuration;exitDuration;animations=[];revision=0;show(e){this.run(!0,e)}hide(e,t=()=>{}){this.run(!1,e,t)}finish(){this.animations.forEach(e=>e.finish())}dispose(){this.revision++,this.animations.forEach(e=>e.cancel()),this.animations=[]}run(e,t,i){const s=++this.revision,r=this.root.hidden,a=r?"0":getComputedStyle(this.root).opacity,o=this.panel?r?"translateY(12px)":getComputedStyle(this.panel).transform:void 0;this.animations.forEach(d=>d.cancel()),this.animations=[],this.root.hidden=!1,this.root.dataset.transition=e?"opening":"closing";const l=()=>{s===this.revision&&(this.root.hidden=!e,this.root.dataset.transition=e?"open":"closed",this.animations.forEach(d=>d.cancel()),this.animations=[],i?.())};if(t||!e&&r){l();return}const c={duration:e?this.enterDuration:this.exitDuration,easing:e?Kp:Cb,fill:"both"},h=this.root.animate([{opacity:a},{opacity:e?1:0}],c);this.animations.push(h),this.panel&&this.animations.push(this.panel.animate([{transform:o},{transform:e?"translateY(0)":"translateY(8px)"}],c)),h.finished.then(l).catch(()=>{})}}class Rb{animation;reveal(e,t){const i=this.animation?.playState==="running"?getComputedStyle(e).opacity:"0.35";this.cancel(),t||(this.animation=e.animate([{opacity:i},{opacity:1}],{duration:150,easing:Kp}))}cancel(){this.animation?.cancel(),this.animation=void 0}finish(){this.animation?.finish(),this.animation=void 0}}function Tt(n,e){if(e<=n[0][0])return n[0][1];const t=n.length-1;if(e>=n[t][0])return n[t][1];const i=l=>(n[l+1][1]-n[l][1])/(n[l+1][0]-n[l][0]),s=l=>{if(l===0)return i(0);if(l===t)return i(t-1);const c=i(l-1),h=i(l);if(c*h<=0)return 0;const d=n[l][0]-n[l-1][0],u=n[l+1][0]-n[l][0],f=2*u+d,m=u+2*d;return(f+m)/(f/c+m/h)};let r=0;for(;e>n[r+1][0];)r++;const a=n[r+1][0]-n[r][0],o=(e-n[r][0])/a;return(2*o**3-3*o**2+1)*n[r][1]+(o**3-2*o**2+o)*a*s(r)+(-2*o**3+3*o**2)*n[r+1][1]+(o**3-o**2)*a*s(r+1)}const Pb=[234,216,181,143,115,94,78,65,54,45,38,31,26,21,17,13,10,8,6,4,3,2,1,0],Db=Pb.map((n,e)=>[e,n]),Lb=(n,e)=>{const t=n-278-e*2;return{x:Tt(Db,t),opacity:Tt([[-1,0],[0,.4],[1,.65],[2,.88],[3,1]],t)}},Ib=[[588,4],[589,39],[592,225],[593,261],[594,288],[595,310],[596,328],[597,343],[598,356],[599,366],[600,375],[601,382],[602,389],[603,394],[604,398],[605,402],[606,405],[607,407],[608,408],[609,409],[610,410],[611,410]],Nb=n=>Tt(Ib,n)/410;function Ub(n){const e=i=>Tt(i,n),t=Math.PI/180;return{radius:e([[487,2e3],[492,1540],[497,1095],[500,895.5],[505,650],[510,492],[515,385.5],[520,320.5],[524,287.5],[527,275],[530,270],[535,265.5],[540,262],[545,258],[550,255],[555,252.5],[560,250],[568,246]]),whiteRadius:e([[487,1500],[492,1011],[493,955],[494,893],[495,834],[496,783],[497,737],[498,693.5],[499,655],[500,619],[505,470.5],[510,374],[515,310.5],[520,272],[524,253.5],[527,248],[530,246],[535,242],[540,238],[545,235],[550,232.5],[555,230],[560,227.5],[568,224]]),outerStart:t*e([[487,470],[492,364],[497,276],[500,226],[505,159.75],[510,98.75],[515,49.25],[520,13.25],[524,-9],[527,-23],[530,-36.25],[535,-53],[540,-66.25],[545,-75.75],[550,-82.75],[560,-89],[568,-90]]),outerSweep:t*e([[487,30],[492,105],[497,170],[500,199],[505,241.5],[510,270.25],[515,295.75],[520,313.25],[527,331],[530,336.75],[535,344.5],[540,350.75],[545,355],[550,358],[560,360],[568,360]]),whiteStart:t*e([[487,-100],[492,-30],[497,72],[500,107],[505,140],[510,172],[515,196],[520,213.75],[527,234.5],[530,241],[535,249.75],[540,256.75],[545,262.25],[550,265.75],[560,269.5],[568,270]]),whiteSweep:t*e([[487,30],[492,105],[497,170],[500,200],[505,241.25],[510,272.75],[515,295.5],[520,313.75],[527,330.5],[530,335.5],[535,343.5],[540,349.5],[545,354],[550,357],[560,360],[568,360]]),innerRadius:e([[487,124.5],[492,123],[495,121],[500,117.5],[505,112],[510,107.5],[515,104],[520,101.5],[530,97],[540,94],[550,91.5],[560,90],[568,88.5]]),innerStart:t*e([[487,-20],[490,-4.25],[492,14],[495,48.75],[497,69.25],[500,93.25],[505,121.25],[510,141],[515,155.5],[520,166.5],[527,178],[530,181],[535,187.75],[540,192],[545,195.25],[550,197.75],[555,199.75],[560,200.75],[568,201.5]]),innerSweep:t*e([[487,0],[492,22.5],[497,55.75],[500,70.25],[505,87.25],[510,99],[515,108],[520,115],[527,123.5],[530,127],[535,128],[540,131],[550,134],[568,136]]),orbit:t*e([[487,70],[492,33],[493,13.2],[494,-5.8],[495,-24.2],[496,-41.4],[497,-57.2],[498,-71.4],[499,-84.2],[500,-96],[505,-140.8],[510,-172.3],[515,-195.5],[520,-213.5],[527,-234],[530,-238.8],[535,-247.7],[540,-254.7],[545,-260.1],[550,-264],[555,-266.9],[560,-268.8],[568,-270]]),orbitRadius:e([[487,270],[495,236],[500,224],[505,214],[510,206],[515,199],[520,193],[530,185],[540,179.5],[550,174.5],[560,171.5],[568,169]]),dotRadius:e([[487,0],[492,1],[500,5.6],[510,7],[520,7.8],[530,8],[568,8]]),blackCap:e([[487,45],[504,35],[510,20],[515,10],[520,5],[525,2.5],[535,2],[550,0],[568,0]]),whiteCap:e([[487,40],[492,30],[497,22],[502,16],[507,10],[512,5],[520,1.5],[540,0],[568,0]])}}const Ob=[[543,827.5,561,1091,518,38.7,260,250,0,0],[544,827.5,561,1091,518,38.7,260,250,3,3],[545,827.5,560.5,1091,518.5,38.6,265,236,17,17],[546,827.5,559.5,1091,519.5,38.5,274,190,44,44],[547,827.6,558.2,1090.6,520.8,38.5,296,121,79,81],[548,828.06,556.76,1090.35,522.58,38.38,332.38,50.99,111.73,113.42],[549,827.84,555.13,1090.42,524.39,38.34,367.27,-14.03,141.56,145.66],[550,827.89,553.28,1090.2,525.89,38.44,396.14,-68.97,168.88,172.89],[551,828,551.68,1090.21,527.44,38.28,421.62,-113.84,191.68,195.3],[552,828.19,550.24,1089.94,528.85,38.25,444.24,-152.25,208.55,215.7],[553,828.42,548.83,1089.7,530.24,38.18,462.76,-184.19,225.92,230.73],[554,828.61,547.64,1089.53,531.44,38.12,479.15,-212.29,239.9,244.63],[555,828.8,546.47,1089.37,532.55,38.03,494.23,-237.06,251.56,257.75],[556,829.06,545.41,1089.16,533.53,37.91,508.57,-259.19,261.49,267.63],[557,829.25,544.49,1088.93,534.52,37.87,520.46,-279.2,271.23,278.42],[558,829.47,543.66,1088.7,535.37,37.79,530.39,-295.86,280.34,286.17],[559,829.75,542.88,1088.46,536.12,37.72,541.33,-312.5,287.17,295.12],[560,829.95,542.16,1088.26,536.88,37.65,549.47,-326.37,295.98,301.16],[561,830.16,541.63,1088.02,537.41,37.57,557.82,-338.78,302.29,307.52],[562,830.33,541.08,1087.81,537.94,37.52,565.1,-350.74,307.99,312.58],[563,830.59,540.65,1087.61,538.36,37.43,571.89,-362.08,313.78,319.28],[564,830.83,540.28,1087.38,538.74,37.37,578.93,-371.93,316.97,323.53],[565,831.04,539.97,1087.14,539.04,37.35,583.85,-380.51,322.27,327.78],[566,831.25,539.74,1086.93,539.28,37.27,589.84,-388.93,325.61,331.62],[567,831.48,539.56,1086.73,539.4,37.19,594,-396.5,330.93,335.92],[568,831.61,539.51,1086.55,539.48,37.15,599.44,-403.94,332.25,338.7]],Fb=Array.from({length:9},(n,e)=>Ob.map(t=>[t[0],t[e+1]])),$p=[[548,926.33,554.33],[551,944.38,572.15],[553,954.92,575.05],[555,963,575],[558,971.63,572.85],[561,977.53,569.78],[564,981.5,566.86],[568,984.71,563.5]],Bb=$p.map(([n,e,t])=>[n,Math.atan2(t-539.5,e-959.5)]),Hb=$p.map(([n,e,t])=>[n,Math.hypot(e-959.5,t-539.5)]),kb=[[-1,0],[0,.8],[1,1.7],[2,2.35],[3,2.85],[4,3.15],[5,3.45],[7,3.8],[10,4.1],[15,4.25],[20,4.25]];function Vb(n){const e=Fb.map(p=>Tt(p,n)),[t,i,s,r,a,o,l,c,h]=e,d=Tt(Bb,n),u=Tt(Hb,n),f=Math.floor(n+1e-5),m=[546,547,549,550].includes(f),v=Tt(m?[[546,42.93],[550,42.43]]:[[545,0],[548,7.96],[551,9.89],[553,10.63],[555,11.08],[559,11.45],[564,11.45],[568,11.27]],n);return{sides:[{x:t,y:i,radius:a,start:o*Math.PI/180,sweep:c*Math.PI/180},{x:s,y:r,radius:a,start:l*Math.PI/180,sweep:h*Math.PI/180}],sideVisible:n>=544,coreRadius:v,satellites:Array.from({length:6},(p,g)=>{const _=d+g*Math.PI/3;return{x:959.5+Math.cos(_)*u,y:539.5+Math.sin(_)*u,radius:Tt(kb,n-548-g*3)}})}}const e0=[[229,-.02,-.0198],[230,-.0195,-.011],[231,-.016,.009],[232,-.0095,.047],[233,.0025,.1135],[234,.0215,.2205],[235,.048,.365],[236,.0735,.504],[237,.094,.6155],[238,.109,.7045],[239,.122,.7755],[240,.133,.835],[241,.1425,.884],[242,.1505,.927],[243,.1575,.964],[244,.164,.996],[245,.1695,1.023],[246,.1745,1.0475],[247,.1785,1.0685],[248,.183,1.087],[249,.187,1.103],[250,.19,1.1175],[251,.1935,1.13],[252,.196,1.1405],[253,.1985,1.15],[254,.201,1.1575],[255,.203,1.1645],[256,.205,1.17],[257,.2065,1.1745],[258,.208,1.1785],[259,.2095,1.181],[260,.2105,1.183],[261,.2115,1.184],[264,.211,1.1835]],zb=e0.map(([n,e])=>[n,e]),Gb=e0.map(([n,,e])=>[n,e]),Wb=[[420,.1835],[425,.184],[430,.1885],[435,.2],[440,.2205],[450,.2925],[455,.3485],[460,.421],[465,.5095],[470,.614],[475,.722],[480,.827],[485,.9195],[486,.9365]],Xb=[[260,814],[261,813],[262,812],[263,808],[264,803],[265,794],[266,781],[267,763],[268,740],[269,716],[270,691],[271,668],[272,648],[273,630],[274,615],[275,601],[276,590],[277,580],[278,571],[279,563],[280,556],[281,550],[282,545],[283,540],[284,536],[285,533],[286,530],[287,527],[288,525],[289,523],[290,521],[291,520],[292,519],[294,518]];function qb(n){const e=Tt(Wb,n),t=n<420?Tt(zb,n):e+.0275,i=n<420?Tt(Gb,n):e+1;return{offsetX:Tt(Xb,n)-520,start:t,length:Math.max(0,Math.min(1,i-t)),strokeWidth:Tt([[229,.25],[230,2.8],[231,8],[232,16],[233,23.5],[234,26]],n),symbolScale:Tt([[246,0],[247,.4],[248,.63],[249,.75],[250,.83],[251,.89],[252,.94],[254,.985],[256,1]],n),plusX:Tt([[246,155],[247,123.3],[248,104],[249,93.53],[250,86.52],[251,81.78],[252,78.48],[254,74.26],[256,72.96],[260,72.6]],n),minusX:Tt([[246,155],[247,186.82],[248,206.14],[249,216.66],[250,223.47],[251,228.21],[252,231.77],[254,236.06],[256,237.57],[260,237.1]],n),minusWidth:Tt([[246,15],[256,15],[257,23],[258,31],[259,35.5],[260,38],[262,42],[264,44],[268,46]],n),plusAngle:Tt([[255,0],[256,-3],[257,-22],[258,-45],[259,-62],[260,-70],[262,-80],[265,-87],[270,-90]],n)}}const sc=(n,e,t)=>Math.max(0,Math.min(1,(n-e)/(t-e))),_f=n=>n*n*(3-2*n),Os=(n,e,t,i)=>n.slice(0,e<t?0:Math.min(n.length,1+Math.floor((e-t)*(n.length-1)/(i-t)))),Ur=(n,e)=>e.includes(n),Yb=[1,1,3,4,5,6,9,11,12,14,17,18,19,20,22,23,25,26];function t0(n){const e=n+5,t=Math.floor(e*25+1e-5),i=e<9.12?"access":e<11.12?"logo":e<19.48?"auth":e<22.76?"scan":"welcome";let s="";t<363?(s=Os("ID CONFIRMED",t,282,295),t>=320&&(s+=" : "+Os("JOYCE MOORE",t,321,339))):t<421?s=Os("REQUEST RECEIVED",t,367,389):(s=Os("START PROCESSING",t,423,440),t>=449&&(s+=".".repeat(Math.min(3,1+Math.floor((t-449)/4)))),Ur(t,[479,485,486])&&(s="              SING..."));const r=e*25,a=Ub(r),o=Vb(r),l=Ur(t,[525,526,528,529]),c=[1,0,.28,0,1,0,0],h=t-569,d=_f(sc(e,26.56,26.92));return{t:e,f:t,step:i,auth:s,access:"ACCESS PERMISSION REQUIRED".slice(0,t<170?0:Yb[Math.min(17,t-170)]),accessOpacity:t>=170&&t<227?t===226?.25:1:0,logoOpacity:e>=9.16&&e<19.48?1:0,logo:qb(r),logoLetters:Os("RHINE·LAB",t,232,255),authOpacity:t>=281&&t<487?1:0,brand:[0,1,2].map(u=>Lb(r,u)),poweredLetters:Os("POWERED BY RHINE LAB",t,279,295).length,scanVisible:e>=19.48&&e<22.76,scan:a,scanOrbit:o,scanRadius:a.radius,ringScale:l?1.94:1,ringOpacity:l?.32:Tt([[487,0],[488,.18],[490,.6],[493,1]],r),ringBlur:l?2.2:0,scanTracking:Tt([[487,40],[492,28],[497,18],[500,14],[505,8],[510,4],[515,1.7],[520,.5],[527,0],[568,0]],r),scanFont:26.5,permissionOpacity:e<21.8?sc(e,19.48,19.88):Tt([[545,1],[546,.4],[547,.3],[548,.25],[549,.1],[550,.04],[551,0]],r),ornament:e>=21.84,coreRadius:o.coreRadius,welcomeVisible:e>=22.76&&e<26.92,welcomePanel:h>=0&&h<7?c[h]:0,welcomeInk:h>=0&&h<7?[0,0,.2,1,0,0,.25][h]:1,companyVisible:t>=588&&!Ur(t,[590,591]),companyMask:Ur(t,[594,595]),highlight:Nb(r),databaseOpacity:t<626||Ur(t,[628,629,631,634])?0:1,welcomeLogo:t>=588,welcomeScale:1-.46*d,welcomeOpacity:1-Math.pow(d,3),exitBlur:8*d,exit:d,backgroundOpacity:e<26.92?1:0,white:_f(sc(e,26.16,26.88))}}const jb={ink:["#080a08","#e0e3dc"],muted:["#77756d","#a6b0b1"],line:["#aaa59a","#536166"],paper:["#eae5e1","#11181b"],panel:["#edebe4","#202a2f"],field:["#e7e3d9","#2a363b"],accent:["#9b7247","#c5a16b"]};let yf=-1,i0=0;function Mf(n){return[1,3,5].map(e=>parseInt(n.slice(e,e+2),16))}function n0(n){if(Math.abs(n-yf)<1e-4)return;yf=i0=n;const e=document.documentElement;e.dataset.darkSurface=String(n>1e-4);for(const[t,i]of Object.entries(jb)){const s=Mf(i[0]),r=Mf(i[1]),a=s.map((o,l)=>Math.round(o+(r[l]-o)*n)).join(", ");e.style.setProperty(`--theme-${t}`,`rgb(${a})`),e.style.setProperty(`--theme-${t}-rgb`,a)}}function Zb(n){return`<div class="theme-settings"><div><strong>界面配色</strong><span>玻璃阵列随配色逐张过渡</span></div><div class="theme-choices" role="group" aria-label="界面配色"><button data-color-theme="light" aria-pressed="${!n}">亮色</button><button data-color-theme="dark" aria-pressed="${n}">暗色</button></div></div>`}const Qb={text:"ACCESS PERMISSION REQUIRED",weight:"Normal",units:1e3,letters:[{width:.732,path:"M543 614.0 621 800.0H708L410 100.0H321L23 800.0H110L188 614.0ZM512 540.0H219L296 356.0C322 293.0 363 194.0 364 193.0H366C367 194.0 408 293.0 435 357.0Z"},{width:.769,path:"M646 582.0C602 676.0 508 735.0 394 735.0C240 735.0 120 626.0 120 449.0C120 273.0 234 163.0 396 163.0C542 163.0 611 251.0 637 299.0L716 277.0C672 174.0 560 86.0 398 86.0C193 86.0 38 228.0 38 448.0C38 669.0 194 813.0 398 813.0C546 813.0 671 735.0 725 603.0Z"},{width:.769,path:"M646 582.0C602 676.0 508 735.0 394 735.0C240 735.0 120 626.0 120 449.0C120 273.0 234 163.0 396 163.0C542 163.0 611 251.0 637 299.0L716 277.0C672 174.0 560 86.0 398 86.0C193 86.0 38 228.0 38 448.0C38 669.0 194 813.0 398 813.0C546 813.0 671 735.0 725 603.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.25,path:""},{width:.576,path:"M77 100.0V800.0H158V535.0H289C452 535.0 550 457.0 550 318.0C550 175.0 452 100.0 289 100.0ZM158 463.0V175.0H291C402 175.0 468 220.0 468 319.0C468 412.0 408 463.0 291 463.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.802,path:"M644 800.0H726V100.0H642L403 526.0H401L163 100.0H77V800.0H158V485.0C158 377.0 156 233.0 156 232.0H158C159 233.0 185 289.0 250 404.0L377 628.0H426L554 401.0C617 289.0 644 233.0 645 232.0H647C647 233.0 644 377.0 644 485.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.727,path:"M568 800.0H651V100.0H569V500.0C569 581.0 571 663.0 571 664.0H569L159 100.0H77V800.0H158V399.0C158 312.0 156 232.0 156 231.0H158Z"},{width:.25,path:""},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.802,path:"M764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0C38 652.0 175 792.0 359 811.0V935.0H442V811.0C626 792.0 764 652.0 764 449.0ZM401 735.0C243 735.0 120 627.0 120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0Z"},{width:.696,path:"M628 100.0H547V508.0C547 660.0 484 735.0 348 735.0C213 735.0 151 660.0 151 508.0V100.0H68V508.0C68 706.0 166 813.0 348 813.0C529 813.0 628 706.0 628 508.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.729,path:"M77 100.0V800.0H326C535 800.0 691 669.0 691 453.0C691 237.0 536 100.0 319 100.0ZM158 724.0V176.0H316C479 176.0 609 272.0 609 453.0C609 635.0 478 724.0 322 724.0Z"}]},Kb={text:"ID CONFIRMED : JOYCE MOORE",weight:"Normal",units:1e3,letters:[{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.729,path:"M77 100.0V800.0H326C535 800.0 691 669.0 691 453.0C691 237.0 536 100.0 319 100.0ZM158 724.0V176.0H316C479 176.0 609 272.0 609 453.0C609 635.0 478 724.0 322 724.0Z"},{width:.25,path:""},{width:.769,path:"M646 582.0C602 676.0 508 735.0 394 735.0C240 735.0 120 626.0 120 449.0C120 273.0 234 163.0 396 163.0C542 163.0 611 251.0 637 299.0L716 277.0C672 174.0 560 86.0 398 86.0C193 86.0 38 228.0 38 448.0C38 669.0 194 813.0 398 813.0C546 813.0 671 735.0 725 603.0Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.727,path:"M568 800.0H651V100.0H569V500.0C569 581.0 571 663.0 571 664.0H569L159 100.0H77V800.0H158V399.0C158 312.0 156 232.0 156 231.0H158Z"},{width:.583,path:"M544 176.0V100.0H77V800.0H158V486.0H465V410.0H158V176.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.802,path:"M644 800.0H726V100.0H642L403 526.0H401L163 100.0H77V800.0H158V485.0C158 377.0 156 233.0 156 232.0H158C159 233.0 185 289.0 250 404.0L377 628.0H426L554 401.0C617 289.0 644 233.0 645 232.0H647C647 233.0 644 377.0 644 485.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.729,path:"M77 100.0V800.0H326C535 800.0 691 669.0 691 453.0C691 237.0 536 100.0 319 100.0ZM158 724.0V176.0H316C479 176.0 609 272.0 609 453.0C609 635.0 478 724.0 322 724.0Z"},{width:.25,path:""},{width:.224,path:"M112 462.0C147 462.0 166 440.0 166 411.0C166 384.0 147 361.0 112 361.0C77 361.0 58 383.0 58 411.0C58 439.0 76 462.0 112 462.0ZM112 810.0C147 810.0 166 787.0 166 759.0C166 731.0 147 709.0 112 709.0C77 709.0 58 731.0 58 759.0C58 787.0 76 810.0 112 810.0Z"},{width:.25,path:""},{width:.488,path:"M416 100.0H334V516.0C334 660.0 288 735.0 176 735.0C122 735.0 81 714.0 46 669.0L0 733.0C44 786.0 102 813.0 176 813.0C334 813.0 416 708.0 416 520.0Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.657,path:"M369 496.0 640 100.0H551L392 332.0C356 383.0 333 420.0 332 421.0H330C329 420.0 304 382.0 268 330.0L111 100.0H17L287 496.0V800.0H369Z"},{width:.769,path:"M646 582.0C602 676.0 508 735.0 394 735.0C240 735.0 120 626.0 120 449.0C120 273.0 234 163.0 396 163.0C542 163.0 611 251.0 637 299.0L716 277.0C672 174.0 560 86.0 398 86.0C193 86.0 38 228.0 38 448.0C38 669.0 194 813.0 398 813.0C546 813.0 671 735.0 725 603.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.25,path:""},{width:.802,path:"M644 800.0H726V100.0H642L403 526.0H401L163 100.0H77V800.0H158V485.0C158 377.0 156 233.0 156 232.0H158C159 233.0 185 289.0 250 404.0L377 628.0H426L554 401.0C617 289.0 644 233.0 645 232.0H647C647 233.0 644 377.0 644 485.0Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"}]},Jb={text:"REQUEST RECEIVED",weight:"Normal",units:1e3,letters:[{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.802,path:"M764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0C38 652.0 175 792.0 359 811.0V935.0H442V811.0C626 792.0 764 652.0 764 449.0ZM401 735.0C243 735.0 120 627.0 120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0Z"},{width:.696,path:"M628 100.0H547V508.0C547 660.0 484 735.0 348 735.0C213 735.0 151 660.0 151 508.0V100.0H68V508.0C68 706.0 166 813.0 348 813.0C529 813.0 628 706.0 628 508.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.637,path:"M600 176.0V100.0H37V176.0H277V800.0H359V176.0Z"},{width:.25,path:""},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.769,path:"M646 582.0C602 676.0 508 735.0 394 735.0C240 735.0 120 626.0 120 449.0C120 273.0 234 163.0 396 163.0C542 163.0 611 251.0 637 299.0L716 277.0C672 174.0 560 86.0 398 86.0C193 86.0 38 228.0 38 448.0C38 669.0 194 813.0 398 813.0C546 813.0 671 735.0 725 603.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.686,path:"M392 800.0 670 100.0H582L437 472.0C381 614.0 347 706.0 346 709.0H344C343 706.0 308 613.0 251 467.0L108 100.0H17L295 800.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.729,path:"M77 100.0V800.0H326C535 800.0 691 669.0 691 453.0C691 237.0 536 100.0 319 100.0ZM158 724.0V176.0H316C479 176.0 609 272.0 609 453.0C609 635.0 478 724.0 322 724.0Z"}]},$b={text:"START PROCESSING...",weight:"Normal",units:1e3,letters:[{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.637,path:"M600 176.0V100.0H37V176.0H277V800.0H359V176.0Z"},{width:.732,path:"M543 614.0 621 800.0H708L410 100.0H321L23 800.0H110L188 614.0ZM512 540.0H219L296 356.0C322 293.0 363 194.0 364 193.0H366C367 194.0 408 293.0 435 357.0Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.637,path:"M600 176.0V100.0H37V176.0H277V800.0H359V176.0Z"},{width:.25,path:""},{width:.576,path:"M77 100.0V800.0H158V535.0H289C452 535.0 550 457.0 550 318.0C550 175.0 452 100.0 289 100.0ZM158 463.0V175.0H291C402 175.0 468 220.0 468 319.0C468 412.0 408 463.0 291 463.0Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.769,path:"M646 582.0C602 676.0 508 735.0 394 735.0C240 735.0 120 626.0 120 449.0C120 273.0 234 163.0 396 163.0C542 163.0 611 251.0 637 299.0L716 277.0C672 174.0 560 86.0 398 86.0C193 86.0 38 228.0 38 448.0C38 669.0 194 813.0 398 813.0C546 813.0 671 735.0 725 603.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.727,path:"M568 800.0H651V100.0H569V500.0C569 581.0 571 663.0 571 664.0H569L159 100.0H77V800.0H158V399.0C158 312.0 156 232.0 156 231.0H158Z"},{width:.79,path:"M730 800.0V434.0H446V510.0H654V610.0C626 662.0 534 735.0 402 735.0C242 735.0 120 626.0 120 448.0C120 273.0 236 163.0 398 163.0C549 163.0 615 256.0 638 299.0L718 277.0C674 173.0 560 86.0 400 86.0C194 86.0 38 228.0 38 449.0C38 669.0 198 813.0 397 813.0C535 813.0 622 738.0 656 699.0H658C658 708.0 657 720.0 657 800.0Z"},{width:.224,path:"M112 810.0C147 810.0 166 787.0 166 759.0C166 731.0 147 709.0 112 709.0C77 709.0 58 731.0 58 759.0C58 787.0 76 810.0 112 810.0Z"},{width:.224,path:"M112 810.0C147 810.0 166 787.0 166 759.0C166 731.0 147 709.0 112 709.0C77 709.0 58 731.0 58 759.0C58 787.0 76 810.0 112 810.0Z"},{width:.224,path:"M112 810.0C147 810.0 166 787.0 166 759.0C166 731.0 147 709.0 112 709.0C77 709.0 58 731.0 58 759.0C58 787.0 76 810.0 112 810.0Z"}]},e2={text:"              SING...",weight:"Normal",units:1e3,letters:[{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.25,path:""},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.727,path:"M568 800.0H651V100.0H569V500.0C569 581.0 571 663.0 571 664.0H569L159 100.0H77V800.0H158V399.0C158 312.0 156 232.0 156 231.0H158Z"},{width:.79,path:"M730 800.0V434.0H446V510.0H654V610.0C626 662.0 534 735.0 402 735.0C242 735.0 120 626.0 120 448.0C120 273.0 236 163.0 398 163.0C549 163.0 615 256.0 638 299.0L718 277.0C674 173.0 560 86.0 400 86.0C194 86.0 38 228.0 38 449.0C38 669.0 198 813.0 397 813.0C535 813.0 622 738.0 656 699.0H658C658 708.0 657 720.0 657 800.0Z"},{width:.224,path:"M112 810.0C147 810.0 166 787.0 166 759.0C166 731.0 147 709.0 112 709.0C77 709.0 58 731.0 58 759.0C58 787.0 76 810.0 112 810.0Z"},{width:.224,path:"M112 810.0C147 810.0 166 787.0 166 759.0C166 731.0 147 709.0 112 709.0C77 709.0 58 731.0 58 759.0C58 787.0 76 810.0 112 810.0Z"},{width:.224,path:"M112 810.0C147 810.0 166 787.0 166 759.0C166 731.0 147 709.0 112 709.0C77 709.0 58 731.0 58 759.0C58 787.0 76 810.0 112 810.0Z"}]},t2={text:"PERMISSION AUTHORIZED",weight:"Normal",units:1e3,letters:[{width:.576,path:"M77 100.0V800.0H158V535.0H289C452 535.0 550 457.0 550 318.0C550 175.0 452 100.0 289 100.0ZM158 463.0V175.0H291C402 175.0 468 220.0 468 319.0C468 412.0 408 463.0 291 463.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.802,path:"M644 800.0H726V100.0H642L403 526.0H401L163 100.0H77V800.0H158V485.0C158 377.0 156 233.0 156 232.0H158C159 233.0 185 289.0 250 404.0L377 628.0H426L554 401.0C617 289.0 644 233.0 645 232.0H647C647 233.0 644 377.0 644 485.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.593,path:"M35 616.0C57 774.0 192 813.0 310 813.0C466 813.0 558 746.0 558 614.0C558 460.0 430 427.0 326 407.0C226 387.0 138 367.0 138 274.0C138 203.0 189 159.0 291 159.0C394 159.0 451 204.0 470 281.0L548 260.0C518 140.0 422 86.0 292 86.0C145 86.0 55 155.0 55 277.0C55 419.0 177 453.0 272 475.0C359 494.0 475 500.0 475 615.0C475 699.0 413 740.0 311 740.0C204 740.0 121 695.0 113 595.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.727,path:"M568 800.0H651V100.0H569V500.0C569 581.0 571 663.0 571 664.0H569L159 100.0H77V800.0H158V399.0C158 312.0 156 232.0 156 231.0H158Z"},{width:.25,path:""},{width:.732,path:"M543 614.0 621 800.0H708L410 100.0H321L23 800.0H110L188 614.0ZM512 540.0H219L296 356.0C322 293.0 363 194.0 364 193.0H366C367 194.0 408 293.0 435 357.0Z"},{width:.696,path:"M628 100.0H547V508.0C547 660.0 484 735.0 348 735.0C213 735.0 151 660.0 151 508.0V100.0H68V508.0C68 706.0 166 813.0 348 813.0C529 813.0 628 706.0 628 508.0Z"},{width:.637,path:"M600 176.0V100.0H37V176.0H277V800.0H359V176.0Z"},{width:.702,path:"M544 800.0H626V100.0H544V395.0H158V100.0H77V800.0H158V473.0H544Z"},{width:.802,path:"M38 449.0C38 667.0 196 813.0 401 813.0C605 813.0 764 667.0 764 449.0C764 232.0 605 86.0 401 86.0C196 86.0 38 232.0 38 449.0ZM120 449.0C120 272.0 243 163.0 401 163.0C558 163.0 682 271.0 682 449.0C682 627.0 558 735.0 401 735.0C243 735.0 120 627.0 120 449.0Z"},{width:.602,path:"M467 800.0H565L392 510.0C491 489.0 552 426.0 552 318.0C552 181.0 455 100.0 291 100.0H77V800.0H158V526.0H244C259 526.0 293 526.0 308 525.0ZM158 458.0V175.0H294C403 175.0 469 222.0 469 321.0C469 422.0 401 458.0 299 458.0Z"},{width:.235,path:"M77 800.0H158V100.0H77Z"},{width:.654,path:"M612 178.0V100.0H52V176.0H425C477 176.0 509 175.0 510 175.0L511 178.0C511 179.0 485 204.0 434 263.0L42 725.0V800.0H612V724.0H235C184 724.0 149 725.0 148 725.0L146 723.0C146 722.0 169 701.0 228 631.0Z"},{width:.6,path:"M77 800.0H550V724.0H158V472.0H462V396.0H158V176.0H548V100.0H77Z"},{width:.729,path:"M77 100.0V800.0H326C535 800.0 691 669.0 691 453.0C691 237.0 536 100.0 319 100.0ZM158 724.0V176.0H316C479 176.0 609 272.0 609 453.0C609 635.0 478 724.0 322 724.0Z"}]},i2={text:"RHINE LAB",weight:"DemiBold",units:1e3,letters:[{width:.631,path:"M443 800.0H608L443 527.0C533 499.0 585 431.0 585 330.0C585 188.0 484 100.0 311 100.0H63V800.0H202V554.0H257H302ZM202 442.0V227.0H319C399 227.0 443 265.0 443 337.0C443 410.0 397 442.0 321 442.0Z"},{width:.712,path:"M510 800.0H649V100.0H510V374.0H202V100.0H63V800.0H202V508.0H510Z"},{width:.265,path:"M63 800.0H202V100.0H63Z"},{width:.742,path:"M538 800.0H679V100.0H540V396.0C540 473.0 542 560.0 542 561.0H539L204 100.0H63V800.0H202V506.0C202 417.0 200 333.0 200 332.0H203Z"},{width:.609,path:"M63 800.0H564V671.0H202V506.0H471V376.0H202V229.0H560V100.0H63Z"},{width:.25,path:""},{width:.567,path:"M63 800.0H534V671.0H202V100.0H63Z"},{width:.749,path:"M531 660.0 584 800.0H733L453 100.0H296L16 800.0H163L216 660.0ZM482 534.0H264L323 380.0C347 319.0 371 258.0 372 257.0H375C376 258.0 400 320.0 424 380.0Z"},{width:.629,path:"M464 423.0C505 409.0 560 362.0 560 279.0C560 181.0 475 100.0 348 100.0H63V800.0H354C521 800.0 601 710.0 601 599.0C601 497.0 530 444.0 464 427.0ZM202 384.0V216.0H321C383 216.0 420 251.0 420 300.0C420 353.0 381 384.0 324 384.0ZM202 684.0V489.0H342C407 489.0 455 525.0 455 588.0C455 648.0 413 684.0 342 684.0Z"}]},n2={text:"WELCOME TO",weight:"Bold",units:1e3,letters:[{width:1.065,path:"M662 800.0H846L1050 100.0H883L800 405.0C774 504.0 756 571.0 755 573.0H752C751 571.0 734 508.0 713 428.0L644 166.0H440L370 426.0C349 506.0 332 571.0 331 573.0H327C326 571.0 309 502.0 282 399.0L203 100.0H16L220 800.0H412L489 518.0C516 418.0 529 361.0 530 359.0H534C535 361.0 548 418.0 576 511.0Z"},{width:.613,path:"M56 800.0H571V644.0H224V516.0H476V376.0H224V256.0H566V100.0H56Z"},{width:.569,path:"M56 800.0H538V644.0H224V100.0H56Z"},{width:.749,path:"M559 549.0C531 607.0 474 655.0 382 655.0C274 655.0 197 574.0 197 450.0C197 328.0 269 244.0 383 244.0C458 244.0 515 277.0 551 333.0L717 288.0C670 175.0 552 86.0 391 86.0C182 86.0 28 235.0 28 448.0C28 667.0 182 814.0 391 814.0C543 814.0 672 729.0 724 593.0Z"},{width:.794,path:"M28 450.0C28 664.0 183 814.0 397 814.0C611 814.0 766 664.0 766 450.0C766 236.0 611 86.0 397 86.0C183 86.0 28 236.0 28 450.0ZM197 450.0C197 324.0 281 244.0 397 244.0C513 244.0 597 324.0 597 450.0C597 575.0 513 655.0 397 655.0C281 655.0 197 575.0 197 450.0Z"},{width:.817,path:"M593 800.0H761V100.0H590L413 413.0H410L234 100.0H56V800.0H224V629.0C224 463.0 222 381.0 222 380.0H225C226 381.0 259 444.0 294 506.0L362 627.0H456L524 504.0C558 444.0 592 381.0 593 380.0H595C595 381.0 593 463.0 593 629.0Z"},{width:.613,path:"M56 800.0H571V644.0H224V516.0H476V376.0H224V256.0H566V100.0H56Z"},{width:.25,path:""},{width:.658,path:"M627 256.0V100.0H31V256.0H245V800.0H413V256.0Z"},{width:.794,path:"M28 450.0C28 664.0 183 814.0 397 814.0C611 814.0 766 664.0 766 450.0C766 236.0 611 86.0 397 86.0C183 86.0 28 236.0 28 450.0ZM197 450.0C197 324.0 281 244.0 397 244.0C513 244.0 597 324.0 597 450.0C597 575.0 513 655.0 397 655.0C281 655.0 197 575.0 197 450.0Z"}]},s2={text:"RHINE LAB.LLC.",weight:"Bold",units:1e3,letters:[{width:.645,path:"M430 800.0H629L469 536.0C554 504.0 601 433.0 601 337.0C601 192.0 498 100.0 322 100.0H56V800.0H224V569.0H264H299ZM224 435.0V252.0H332C397 252.0 429 287.0 429 345.0C429 404.0 395 435.0 333 435.0Z"},{width:.717,path:"M493 800.0H661V100.0H493V364.0H224V100.0H56V800.0H224V525.0H493Z"},{width:.28,path:"M56 800.0H224V100.0H56Z"},{width:.75,path:"M523 800.0H694V100.0H526V343.0C526 419.0 527 509.0 527 510.0H524L226 100.0H56V800.0H224V560.0C224 469.0 222 383.0 222 382.0H225Z"},{width:.613,path:"M56 800.0H571V644.0H224V516.0H476V376.0H224V256.0H566V100.0H56Z"},{width:.25,path:""},{width:.569,path:"M56 800.0H538V644.0H224V100.0H56Z"},{width:.758,path:"M523 684.0 565 800.0H745L474 100.0H283L13 800.0H190L232 684.0ZM468 531.0H287L337 391.0C359 333.0 375 290.0 376 289.0H379C380 290.0 396 334.0 418 392.0Z"},{width:.632,path:"M481 423.0C519 409.0 571 360.0 571 282.0C571 185.0 484 100.0 358 100.0H56V800.0H357C531 800.0 608 704.0 608 596.0C608 503.0 549 447.0 481 427.0ZM224 377.0V239.0H325C373 239.0 402 269.0 402 308.0C402 349.0 372 377.0 326 377.0ZM224 661.0V501.0H342C397 501.0 431 531.0 431 581.0C431 628.0 400 661.0 342 661.0Z"},{width:.283,path:"M142 809.0C199 809.0 227 774.0 227 730.0C227 686.0 198 652.0 142 652.0C85 652.0 56 686.0 56 730.0C56 774.0 85 809.0 142 809.0Z"},{width:.569,path:"M56 800.0H538V644.0H224V100.0H56Z"},{width:.569,path:"M56 800.0H538V644.0H224V100.0H56Z"},{width:.749,path:"M559 549.0C531 607.0 474 655.0 382 655.0C274 655.0 197 574.0 197 450.0C197 328.0 269 244.0 383 244.0C458 244.0 515 277.0 551 333.0L717 288.0C670 175.0 552 86.0 391 86.0C182 86.0 28 235.0 28 448.0C28 667.0 182 814.0 391 814.0C543 814.0 672 729.0 724 593.0Z"},{width:.283,path:"M142 809.0C199 809.0 227 774.0 227 730.0C227 686.0 198 652.0 142 652.0C85 652.0 56 686.0 56 730.0C56 774.0 85 809.0 142 809.0Z"}]},r2={text:"INTERNAL DATABASE",weight:"Bold",units:1e3,letters:[{width:.28,path:"M56 800.0H224V100.0H56Z"},{width:.75,path:"M523 800.0H694V100.0H526V343.0C526 419.0 527 509.0 527 510.0H524L226 100.0H56V800.0H224V560.0C224 469.0 222 383.0 222 382.0H225Z"},{width:.658,path:"M627 256.0V100.0H31V256.0H245V800.0H413V256.0Z"},{width:.613,path:"M56 800.0H571V644.0H224V516.0H476V376.0H224V256.0H566V100.0H56Z"},{width:.645,path:"M430 800.0H629L469 536.0C554 504.0 601 433.0 601 337.0C601 192.0 498 100.0 322 100.0H56V800.0H224V569.0H264H299ZM224 435.0V252.0H332C397 252.0 429 287.0 429 345.0C429 404.0 395 435.0 333 435.0Z"},{width:.75,path:"M523 800.0H694V100.0H526V343.0C526 419.0 527 509.0 527 510.0H524L226 100.0H56V800.0H224V560.0C224 469.0 222 383.0 222 382.0H225Z"},{width:.758,path:"M523 684.0 565 800.0H745L474 100.0H283L13 800.0H190L232 684.0ZM468 531.0H287L337 391.0C359 333.0 375 290.0 376 289.0H379C380 290.0 396 334.0 418 392.0Z"},{width:.569,path:"M56 800.0H538V644.0H224V100.0H56Z"},{width:.25,path:""},{width:.751,path:"M56 100.0V800.0H355C562 800.0 723 665.0 723 453.0C723 242.0 563 100.0 354 100.0ZM224 644.0V256.0H345C449 256.0 554 316.0 554 453.0C554 591.0 449 644.0 345 644.0Z"},{width:.758,path:"M523 684.0 565 800.0H745L474 100.0H283L13 800.0H190L232 684.0ZM468 531.0H287L337 391.0C359 333.0 375 290.0 376 289.0H379C380 290.0 396 334.0 418 392.0Z"},{width:.658,path:"M627 256.0V100.0H31V256.0H245V800.0H413V256.0Z"},{width:.758,path:"M523 684.0 565 800.0H745L474 100.0H283L13 800.0H190L232 684.0ZM468 531.0H287L337 391.0C359 333.0 375 290.0 376 289.0H379C380 290.0 396 334.0 418 392.0Z"},{width:.632,path:"M481 423.0C519 409.0 571 360.0 571 282.0C571 185.0 484 100.0 358 100.0H56V800.0H357C531 800.0 608 704.0 608 596.0C608 503.0 549 447.0 481 427.0ZM224 377.0V239.0H325C373 239.0 402 269.0 402 308.0C402 349.0 372 377.0 326 377.0ZM224 661.0V501.0H342C397 501.0 431 531.0 431 581.0C431 628.0 400 661.0 342 661.0Z"},{width:.758,path:"M523 684.0 565 800.0H745L474 100.0H283L13 800.0H190L232 684.0ZM468 531.0H287L337 391.0C359 333.0 375 290.0 376 289.0H379C380 290.0 396 334.0 418 392.0Z"},{width:.627,path:"M27 625.0C67 777.0 205 814.0 327 814.0C498 814.0 599 742.0 599 598.0C599 447.0 485 403.0 382 383.0C284 363.0 217 354.0 217 295.0C217 258.0 244 233.0 308 233.0C378 233.0 418 261.0 435 312.0L595 269.0C556 144.0 454 86.0 311 86.0C154 86.0 46 157.0 46 300.0C46 448.0 164 492.0 259 515.0C345 536.0 429 532.0 429 599.0C429 644.0 390 666.0 326 666.0C250 666.0 201 635.0 187 582.0Z"},{width:.613,path:"M56 800.0H571V644.0H224V516.0H476V376.0H224V256.0H566V100.0H56Z"}]},a2={access:Qb,identity:Kb,request:Jb,processing:$b,processingGlitch:e2,permission:t2,brand:i2,welcome:n2,company:s2,database:r2},o2=new Set;async function l2(){return!1}const bf="http://www.w3.org/2000/svg";class Or{constructor(e,t){this.host=e,this.label.className="boot-phrase-label",this.phrases=t.map(i=>{const s=a2[i],r=document.createElement("span");r.className="boot-phrase",r.dataset.phrase=i,r.dataset.weight=s.weight,r.setAttribute("aria-hidden","true"),r.hidden=!0;const a=s.letters.map(o=>{const l=document.createElement("span");if(l.className="boot-phrase-letter",l.style.width=`${o.width}em`,o.path){const c=document.createElementNS(bf,"svg");c.classList.add("boot-letter-art"),c.setAttribute("viewBox",`0 0 ${o.width*s.units} ${s.units}`),c.setAttribute("focusable","false");const h=document.createElementNS(bf,"path");h.setAttribute("d",o.path),c.append(h),l.append(c)}return r.append(l),l});return{text:s.text,node:r,letters:a,weight:s.weight}}),e.classList.add("has-boot-lettering"),e.replaceChildren(this.label,...this.phrases.map(i=>i.node)),e.dataset.letteringRenderer="artwork",o2.add(this)}host;label=document.createElement("span");phrases;value;useWebfonts(){for(const e of this.phrases)e.node.style.setProperty("--boot-webfont-family",`"Rhine Novecento ${e.weight}"`),e.letters.forEach((t,i)=>{t.replaceChildren(),t.dataset.letter=e.text[i],t.classList.add("boot-font-letter")});this.host.dataset.letteringRenderer="webfont"}setText(e){if(this.value===e)return;this.value=e,this.label.textContent=e;const t=e?this.phrases.find(i=>i.text.startsWith(e)):void 0;this.host.classList.toggle("boot-lettering-fallback",!!(e&&!t));for(const i of this.phrases){const s=i===t;i.node.hidden===s&&(i.node.hidden=!s),s&&i.letters.forEach((r,a)=>{const o=a>=e.length;r.hidden!==o&&(r.hidden=o)})}}}const ao="http://www.w3.org/2000/svg",Fr=(n,e,t,i=960,s=540)=>{const r=a=>`${i+Math.cos(a)*n},${s+Math.sin(a)*n}`;return t>=Math.PI*1.999?`M${r(e)}A${n},${n} 0 1 1 ${r(e+Math.PI)}A${n},${n} 0 1 1 ${r(e+Math.PI*2)}`:`M${r(e)}A${n},${n} 0 ${t>Math.PI?1:0} 1 ${r(e+t)}`};class c2{constructor(e){this.stage=e,[".access-text",".boot-logo",".auth-status","#auth-message",".scan",".scan > span",".welcome",".welcome-heading",".welcome-panel",".welcome-company",".welcome-highlight",".welcome-database",".welcome-logo",".brand",".powered","#boot-background",".boot-background svg",".boot-white"].forEach(r=>this.nodes.set(r,e.querySelector(r)));const t=e.querySelector(".boot-logo svg"),i=t.querySelector("path");this.contour=i,this.contour.setAttribute("d",GM),this.contour.setAttribute("pathLength","1");const s=t.querySelector("path:not([pathLength])");this.plus=document.createElementNS(ao,"path"),this.plus.setAttribute("d","M44 70h50M69 45v50"),this.minus=document.createElementNS(ao,"path"),this.minus.setAttribute("d","M219 70h44"),[this.plus,this.minus].forEach(r=>{r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","15"),t.insertBefore(r,s)}),s.remove(),this.letters=t.querySelector("text"),this.letters.setAttribute("text-anchor","start"),this.letters.setAttribute("x","20"),this.brandLines=Array.from(e.querySelector(".brand").children),this.scanPaths=Array.from(e.querySelectorAll(".scan path")),this.orbitDots=Array.from(e.querySelectorAll(".scan .orbit-dot")),this.core=e.querySelector(".scan .scan-core"),this.core.setAttribute("cx","959.5"),this.core.setAttribute("cy","539.5"),this.satellites=Array.from({length:6},()=>{const r=document.createElementNS(ao,"circle");return r.classList.add("satellite-dot"),r.setAttribute("fill","#080a08"),r.setAttribute("stroke","none"),this.core.parentElement.insertBefore(r,this.core),r}),this.caps=["#080a08","#fff"].map(r=>{const a=document.createElementNS(ao,"circle");return a.setAttribute("fill",r),a.setAttribute("stroke","none"),this.core.parentElement.appendChild(a),a}),this.companyInk=Array.from(e.querySelectorAll(".welcome-company strong")),this.companyInk.forEach(r=>{const a=document.createElement("span");a.textContent=r.textContent,r.replaceChildren(a)}),this.poweredHTML=this.el(".powered").innerHTML,new Or(this.brandLines[0],["brand"]).setText("RHINE LAB"),this.accessLettering=new Or(this.el(".access-text"),["access"]),this.authLettering=new Or(this.el("#auth-message"),["identity","request","processing","processingGlitch"]);for(const[r,a,o]of[[".scan > span","permission","PERMISSION AUTHORIZED"],[".welcome-heading","welcome","WELCOME TO"],[".welcome-database","database","INTERNAL DATABASE"]])new Or(this.el(r),[a]).setText(o);this.companyInk.forEach(r=>new Or(r.querySelector("span"),["company"]).setText("RHINE LAB.LLC."))}stage;nodes=new Map;contour;letters;plus;minus;brandLines;scanPaths;orbitDots;core;satellites;caps;companyInk;poweredHTML;accessLettering;authLettering;el(e){return this.nodes.get(e)}opacity(e,t){this.el(e).style.opacity=String(Number(t))}update(e){const t=t0(e),i=t.t;return this.stage.dataset.bootFrame=String(t.f),this.accessLettering.setText(t.access),this.opacity(".access-text",t.accessOpacity),this.opacity(".boot-logo",t.logoOpacity),this.el(".boot-logo").style.transform=`translate(${t.logo.offsetX}px, 1px)`,this.contour.style.strokeDasharray=`${t.logo.length} ${1-t.logo.length}`,this.contour.style.strokeDashoffset=String(-t.logo.start),this.contour.setAttribute("stroke-width",String(t.logo.strokeWidth)),this.letters.textContent!==t.logoLetters&&(this.letters.textContent=t.logoLetters),this.plus.style.opacity=this.minus.style.opacity=t.logo.symbolScale>0?"1":"0",this.plus.setAttribute("transform",`translate(${t.logo.plusX} 70) rotate(${t.logo.plusAngle}) scale(${t.logo.symbolScale}) translate(-69 -70)`),this.minus.setAttribute("d",`M${-t.logo.minusWidth/2} 0h${t.logo.minusWidth}`),this.minus.setAttribute("transform",`translate(${t.logo.minusX} 70) scale(${t.logo.symbolScale})`),this.opacity(".auth-status",t.authOpacity),this.authLettering.setText(t.auth),this.opacity(".brand",1),this.el(".brand").style.transform="none",this.brandLines.forEach((s,r)=>{s.style.opacity=String(t.brand[r].opacity),s.style.transform=`translateX(${t.brand[r].x}px)`}),this.opacity(".powered",t.poweredLetters>0),this.el(".powered").style.clipPath=`inset(0 ${100*(1-t.poweredLetters/19)}% 0 0)`,this.opacity(".scan",t.scanVisible),t.scanVisible&&this.renderScan(t),this.opacity(".welcome",t.welcomeVisible?t.welcomeOpacity:0),this.el(".welcome").style.transform=`scale(${t.welcomeScale})`,this.el(".welcome").style.filter=`blur(${t.exitBlur}px) invert(${t.exit*.22}) sepia(${t.exit}) saturate(${1+t.exit*5}) hue-rotate(${t.exit*115}deg)`,this.opacity(".welcome-panel",t.welcomePanel),this.opacity(".welcome-heading",1),this.el(".welcome-heading").style.color=i0>1e-4?"var(--theme-ink)":`rgb(${255*(1-t.welcomeInk)} ${255*(1-t.welcomeInk)} ${255*(1-t.welcomeInk)})`,this.opacity(".welcome-company",t.companyVisible),this.el(".welcome-company").style.opacity=String(t.companyVisible?t.companyMask?.65:1:0),this.companyInk[1].querySelector("span").style.opacity=t.companyMask?".06":"1",this.el(".welcome-highlight").style.clipPath=`inset(0 ${100*(1-t.highlight)}% 0 0)`,this.opacity(".welcome-database",t.databaseOpacity),this.opacity(".welcome-logo",t.welcomeLogo),this.opacity("#boot-background",t.backgroundOpacity),this.opacity(".boot-white",t.white),this.el(".boot-background svg").style.transform=`translate(${Math.sin(i*.16)*18}px, ${-(i-6)*5}px) scale(1.08)`,t}renderScan(e){const{scan:t}=e,i=t.radius,s=this.scanPaths[0].parentElement;s.setAttribute("transform",`translate(960 540) scale(${e.ringScale}) translate(-960 -540)`),s.style.opacity=String(e.ringOpacity),s.style.filter=`blur(${e.ringBlur}px)`,this.scanPaths[0].setAttribute("d",Fr(i,t.outerStart,t.outerSweep)),this.scanPaths[0].setAttribute("stroke-width","2.4"),this.scanPaths[1].setAttribute("d",Fr(t.whiteRadius,t.whiteStart,t.whiteSweep)),this.scanPaths[1].setAttribute("stroke-width","4");const r=t.innerStart;this.scanPaths[2].setAttribute("d",Fr(t.innerRadius,r,t.innerSweep)),this.scanPaths[3].setAttribute("d",Fr(t.innerRadius,r+Math.PI,t.innerSweep)),e.scanOrbit.sides.forEach((o,l)=>{this.scanPaths[l+4].setAttribute("d",Fr(o.radius,o.start,o.sweep,o.x,o.y)),this.scanPaths[l+4].style.opacity=e.scanOrbit.sideVisible?"1":"0"}),e.scanOrbit.satellites.forEach((o,l)=>{const c=this.satellites[l];c.setAttribute("cx",String(o.x)),c.setAttribute("cy",String(o.y)),c.setAttribute("r",String(o.radius))}),this.core.style.opacity=e.ornament?"1":"0",this.core.setAttribute("r",String(e.coreRadius));const a=t.orbit;this.orbitDots.forEach((o,l)=>{o.setAttribute("cx",String(960+Math.cos(a+l*Math.PI)*t.orbitRadius)),o.setAttribute("cy",String(540+Math.sin(a+l*Math.PI)*t.orbitRadius)),o.setAttribute("r",String(t.dotRadius))}),this.caps.forEach((o,l)=>{const c=l?t.whiteStart:t.outerStart+t.outerSweep,h=l?t.whiteRadius:i;o.setAttribute("cx",String(960+Math.cos(c)*h)),o.setAttribute("cy",String(540+Math.sin(c)*h)),o.setAttribute("r",String(l?t.whiteCap:t.blackCap))}),this.opacity(".scan > span",e.permissionOpacity),this.el(".scan > span").style.letterSpacing=`${e.scanTracking}px`,this.el(".scan > span").style.setProperty("--boot-phrase-tracking",`${e.scanTracking}px`),this.el(".scan > span").style.fontSize=`${e.scanFont}px`}reset(){[".brand",".powered"].forEach(e=>this.el(e).removeAttribute("style")),this.brandLines.forEach(e=>e.removeAttribute("style")),this.el(".powered").innerHTML=this.poweredHTML,this.opacity("#boot-background",0)}}const na=(n,e,t="webp")=>{const i=n.photo?.src[e],s=t==="avif"?i?.avif:i?.webp;return s?rs(s):""};function pa(n,e,t={}){if(!n.photo)return"";const i=na(n,e,"avif"),{width:s,height:r}=n.photo;return`<picture class="${t.cls??""}" style="--ph-color:${Rt(n.photo.color)};--ph-lqip:url('${n.photo.lqip}');aspect-ratio:${s}/${r}">${i?`<source type="image/avif" srcset="${i}"/>`:""}<img src="${na(n,e)}" width="${s}" height="${r}" alt="${Rt(t.alt??n.title)}" ${t.eager?'fetchpriority="high"':'loading="lazy"'} decoding="async" draggable="false" onload="this.parentElement.classList.add('loaded')"/></picture>`}const s0=n=>n.photo?`--ar:${(n.photo.width/n.photo.height).toFixed(5)};--ar-inv:${(n.photo.height/n.photo.width).toFixed(5)}`:"",Io=(n,e=3)=>String(n).padStart(e,"0"),qr=()=>document.querySelector("#stage")?.classList.contains("reduce-motion")??!1;class h2{constructor(e){this.hooks=e,this.root=document.createElement("div"),this.root.className="album-lightbox",this.root.hidden=!0,this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","照片查看"),this.root.innerHTML=`<div class="lb-top"><span class="lb-path">RHINE LAB / MEMORY ARCHIVE / <b class="lb-id"></b></span><button class="lb-close" data-lb="close" aria-label="关闭">CLOSE <span>×</span></button></div>
      <div class="lb-stage"><i class="lb-corner tl"></i><i class="lb-corner tr"></i><i class="lb-corner bl"></i><i class="lb-corner br"></i><div class="lb-frame"></div><div class="lb-scan" aria-hidden="true"></div></div>
      <div class="lb-bottom"><button class="lb-nav" data-lb="prev" aria-label="上一张">←</button><div class="lb-meta"><strong class="lb-title"></strong><span class="lb-sub"></span></div><span class="lb-count"></span><button class="lb-nav" data-lb="next" aria-label="下一张">→</button></div>
      <div class="lb-actions"><button data-lb="locate">ACCESS FILE <span>在档案中查看 ↗</span></button><a class="lb-download" download>EXPORT <span>↓</span></a></div>`,document.body.append(this.root),this.root.addEventListener("click",i=>{i.stopPropagation();const s=i.target.closest("[data-lb]");if(!s)return;const r=s.dataset.lb;if(r==="close"&&this.close(),r==="prev"&&this.step(-1),r==="next"&&this.step(1),r==="locate"){const a=this.list[this.at];this.close(),this.hooks.locate(a)}}),window.addEventListener("keydown",i=>{if(this.openState){if(i.key==="Escape")this.close();else if(i.key==="ArrowLeft")this.step(-1);else if(i.key==="ArrowRight")this.step(1);else if(i.key==="Tab"){const s=[...this.root.querySelectorAll("button,a[href]")].filter(a=>a.getClientRects().length),r=s.indexOf(document.activeElement);i.preventDefault(),s[(r+(i.shiftKey?s.length-1:1))%s.length]?.focus()}else return;i.preventDefault(),i.stopImmediatePropagation()}},!0);const t=this.root.querySelector(".lb-stage");t.addEventListener("pointerdown",i=>this.down(i)),t.addEventListener("pointermove",i=>this.move(i)),t.addEventListener("pointerup",i=>this.up(i)),t.addEventListener("pointercancel",i=>this.up(i,!0)),t.addEventListener("wheel",i=>{i.preventDefault(),this.setZoom(this.zoom*Math.exp(-i.deltaY*.002))},{passive:!1})}hooks;root;list=ta;at=0;openState=!1;lastFocus=null;zoom=1;pan={x:0,y:0};pointers=new Map;gesture=null;lastTap=0;get isOpen(){return this.openState}open(e){const t=this.list.indexOf(e);t<0||(this.lastFocus=document.activeElement,this.at=t,this.openState=!0,this.root.hidden=!1,this.root.classList.toggle("lb-reduced",qr()),document.documentElement.classList.add("album-locked"),this.render(0),requestAnimationFrame(()=>this.root.classList.add("lb-visible")),this.root.querySelector(".lb-close").focus({preventScroll:!0}),this.hooks.sound("page-open"))}close(){if(!this.openState)return;this.openState=!1,this.root.classList.remove("lb-visible"),document.documentElement.classList.remove("album-locked");const e=()=>{this.openState||(this.root.hidden=!0,this.root.querySelector(".lb-frame").replaceChildren())};qr()?e():setTimeout(e,380),this.hooks.sound("page-close"),this.lastFocus?.focus({preventScroll:!0})}step(e){this.list.length<2||(this.at=(this.at+e+this.list.length)%this.list.length,this.render(e),this.hooks.sound("tick"))}render(e){const t=vt[this.list[this.at]];this.zoom=1,this.pan={x:0,y:0};const i=this.root.querySelector(".lb-frame"),s=document.createElement("div");s.className="lb-photo",s.style.setProperty("--dir",String(e)),t.photo&&(s.style.setProperty("--ar",String(t.photo.width/t.photo.height)),s.dataset.kind=cs(t.photo.width,t.photo.height).kind.toLowerCase()),s.innerHTML=pa(t,"full",{eager:!0}),i.querySelectorAll(".lb-photo").forEach(c=>{c.classList.add("lb-out"),setTimeout(()=>c.remove(),qr()?0:420)}),i.append(s),this.applyTransform();for(const c of[-1,1]){const h=vt[this.list[(this.at+c+this.list.length)%this.list.length]],d=new Image;d.decoding="async",d.src=na(h,"full")}this.root.querySelector(".lb-id").textContent=t.id,this.root.querySelector(".lb-title").textContent=t.title;const r=[t.department,t.date].filter(c=>c&&c!=="—"),a=t.photo?cs(t.photo.width,t.photo.height):null;this.root.querySelector(".lb-sub").textContent=[t.category,...r,...a?[`${a.label} ${a.zh}`]:[]].join("  ·  "),this.root.querySelector(".lb-count").textContent=`${Io(this.at+1)} / ${Io(this.list.length)}`;const o=this.root.querySelector(".lb-download");o.href=na(t,"full"),o.download=`RHINE-LAB-${t.id}.webp`;const l=this.root.querySelector(".lb-scan");l.classList.remove("run"),l.offsetWidth,l.classList.add("run")}current(){return this.root.querySelector(".lb-photo:not(.lb-out)")}setZoom(e){this.zoom=Math.min(4,Math.max(1,e)),this.zoom===1&&(this.pan={x:0,y:0}),this.applyTransform()}applyTransform(){const e=this.current();e&&(e.style.setProperty("--zoom",String(this.zoom)),e.style.setProperty("--pan-x",`${this.pan.x}px`),e.style.setProperty("--pan-y",`${this.pan.y}px`),e.classList.toggle("zoomed",this.zoom>1))}down(e){e.currentTarget.setPointerCapture(e.pointerId),this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const t=[...this.pointers.values()],i=t.reduce((r,a)=>({x:r.x+a.x/t.length,y:r.y+a.y/t.length}),{x:0,y:0}),s=t.length>1?Math.hypot(t[0].x-t[1].x,t[0].y-t[1].y):0;this.gesture={x:i.x,y:i.y,px:this.pan.x,py:this.pan.y,dist:s,zoom:this.zoom,t:performance.now()},this.current()?.classList.add("dragging")}move(e){if(!this.pointers.has(e.pointerId)||!this.gesture)return;this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const t=[...this.pointers.values()],i=t.reduce((s,r)=>({x:s.x+r.x/t.length,y:s.y+r.y/t.length}),{x:0,y:0});if(t.length>1&&this.gesture.dist){const s=Math.hypot(t[0].x-t[1].x,t[0].y-t[1].y);this.zoom=Math.min(4,Math.max(1,this.gesture.zoom*s/this.gesture.dist))}this.zoom>1?this.pan={x:this.gesture.px+i.x-this.gesture.x,y:this.gesture.py+i.y-this.gesture.y}:this.current()?.style.setProperty("--swipe",`${i.x-this.gesture.x}px`),this.applyTransform()}up(e,t=!1){if(!this.pointers.has(e.pointerId))return;this.pointers.delete(e.pointerId);const i=this.gesture,s=this.current();if(s?.classList.remove("dragging"),s?.style.setProperty("--swipe","0px"),this.pointers.size){const o=[...this.pointers.values()][0];this.gesture={x:o.x,y:o.y,px:this.pan.x,py:this.pan.y,dist:0,zoom:this.zoom,t:performance.now()};return}if(this.gesture=null,!i||t)return;const r=e.clientX-i.x,a=e.clientY-i.y;if(this.zoom===1&&i.dist===0){if(Math.abs(r)>50&&Math.abs(r)>Math.abs(a)){this.step(r<0?1:-1);return}if(a>110&&Math.abs(a)>Math.abs(r)*1.4){this.close();return}}if(Math.hypot(r,a)<8&&performance.now()-i.t<300){const o=performance.now();o-this.lastTap<320?(this.setZoom(this.zoom>1?1:2.2),this.lastTap=0):this.lastTap=o}}}class u2{constructor(e){this.hooks=e,this.root=document.createElement("div"),this.root.className="album-sheet",this.root.hidden=!0,this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","相册总览");const t=On.map(i=>{const s=vt.map((r,a)=>({r,i:a})).filter(({r})=>r.photo&&r.category===i.name);return`<section class="sheet-volume"><header><span>${Rt(i.en)}</span><strong>${Rt(i.name)}</strong><i>${Io(s.length,2)} FILES</i></header>${s.length?`<div class="sheet-grid">${s.map(({r,i:a})=>`<button class="sheet-item" data-sheet="${a}" data-kind="${cs(r.photo.width,r.photo.height).kind.toLowerCase()}" style="${s0(r)}" aria-label="${Rt(`${r.id} ${r.title}`)}">${pa(r,"thumb")}<span><b>${r.id}</b>${r.department!=="—"?`<small>${Rt(r.department)}</small>`:""}</span></button>`).join("")}<i class="sheet-fill" aria-hidden="true"></i></div>`:'<p class="sheet-empty">AWAITING ARCHIVE / 待归档</p>'}</section>`}).join("");this.root.innerHTML=`<div class="sheet-panel"><div class="lb-top"><span class="lb-path">RHINE LAB / MEMORY ARCHIVE / CONTACT SHEET</span><button class="lb-close" data-sheet-close aria-label="关闭">CLOSE <span>×</span></button></div><h2>CONTACT SHEET<small>相册总览 · ${Io(ta.length)} FILES</small></h2><div class="sheet-body">${t}</div><div class="sheet-bottom"><span>MEMORY ARCHIVE <i>●</i> CONNECTED</span><span>TAP TO VIEW</span></div></div>`,document.body.append(this.root),this.root.addEventListener("click",i=>{if(i.stopPropagation(),i.target===this.root||i.target.closest("[data-sheet-close]"))return this.close();const s=i.target.closest("[data-sheet]");s&&this.hooks.view(Number(s.dataset.sheet))}),window.addEventListener("keydown",i=>{if(!(!this.openState||document.querySelector(".album-lightbox:not([hidden])")))if(i.key==="Escape")i.preventDefault(),i.stopImmediatePropagation(),this.close();else if(i.key==="Tab"){const s=[...this.root.querySelectorAll("button")],r=s.indexOf(document.activeElement);i.preventDefault(),i.stopImmediatePropagation(),s[(r+(i.shiftKey?s.length-1:1))%s.length]?.focus()}else["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter","/"].includes(i.key)&&i.stopImmediatePropagation()},!0)}hooks;root;openState=!1;lastFocus=null;get isOpen(){return this.openState}open(){this.lastFocus=document.activeElement,this.openState=!0,this.root.hidden=!1,this.root.classList.toggle("lb-reduced",qr()),document.documentElement.classList.add("album-locked"),requestAnimationFrame(()=>this.root.classList.add("lb-visible")),this.root.querySelector("[data-sheet-close]").focus({preventScroll:!0}),this.hooks.sound("page-open")}close(){this.openState&&(this.openState=!1,this.root.classList.remove("lb-visible"),document.documentElement.classList.remove("album-locked"),setTimeout(()=>{this.openState||(this.root.hidden=!0)},qr()?0:380),this.hooks.sound("page-close"),this.lastFocus?.focus({preventScroll:!0}))}}function d2(n){const e=ta.map(i=>vt[i]),t=e.length?Array.from({length:Math.max(24,e.length)},(i,s)=>e[s%e.length]):[];n.classList.add("album-fallback"),n.innerHTML=`<div class="fallback-wall" aria-hidden="true">${t.map((i,s)=>`<div class="fallback-tile" style="--k:${s}">${pa(i,"thumb",{alt:""})}</div>`).join("")}</div>`}function f2(){const n=new URLSearchParams(location.search).get("from");return n&&/^[a-z0-9-]{1,24}$/i.test(n)?n.toLowerCase():""}function p2(n){const e=matchMedia("(orientation: landscape)"),t=document.createElement("div");t.className="orient-veil",t.setAttribute("aria-hidden","true"),t.innerHTML='<div class="ov-ticks"></div><div class="ov-scan"></div><div class="ov-label"><span><i></i>RHINE LAB / VIEWPORT</span><b>RECALIBRATING</b><small class="ov-mode"></small></div>',document.body.append(t);const i=()=>{document.documentElement.dataset.orientation=e.matches?"landscape":"portrait"};i();let s=0,r=0,a=!1,o=0,l=null;addEventListener("resize",()=>{s=performance.now()});const c=()=>{clearTimeout(r)},h=()=>{t.classList.remove("on","cover","reveal"),t.dataset.phase="idle"};function d(){if(o++,i(),c(),t.querySelector(".ov-mode").textContent=e.matches?"LANDSCAPE · 横屏":"PORTRAIT · 竖屏",t.dataset.dark=String(n.dark()),n.reduced()){t.className="orient-veil rm on",t.dataset.phase="cover",r=window.setTimeout(()=>{n.refit(),t.classList.remove("on"),t.dataset.phase="idle"},140);return}t.className="orient-veil on cover",t.dataset.phase="cover";const u=performance.now(),f=()=>{const m=performance.now();!a&&m-u>260&&m-s>160?(n.refit(),requestAnimationFrame(()=>requestAnimationFrame(()=>{t.classList.remove("cover"),t.classList.add("reveal"),t.dataset.phase="reveal",r=window.setTimeout(h,680)}))):r=window.setTimeout(f,50)};l=f,r=window.setTimeout(f,50)}return e.addEventListener("change",d),window.__orient={run:d,runs:()=>o,phase:()=>t.dataset.phase??"idle",hold(u=.5){a=!0,c();for(const f of t.getAnimations({subtree:!0})){f.pause();const m=Number(f.effect?.getTiming().duration)||0;f.currentTime=m*u}},release(){a=!1;for(const u of t.getAnimations({subtree:!0}))u.play();t.dataset.phase==="cover"&&l?r=window.setTimeout(l,50):t.dataset.phase==="reveal"&&(r=window.setTimeout(h,680))}},{run:d}}const m2=[[170,187],[282,295],[320,339],[367,389],[423,440],[449,457]].flatMap(([n,e])=>{const t=[];let i=0;for(let s=n;s<=e;s++){const r=t0(s/25-5),o=(s<200?r.access:r.auth).replace(/\s/g,"").length;o>i&&t.push(s),i=o}return t});function g2(n,e){return m2.some(t=>t/25>n+1e-6&&t/25<=e+1e-6)}const v2=48e3,A2=["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+f/8/xYAGwDx/+7/GAAYAP//CwAWAAcACAAOAAIAAQACAOv/6P/+//X/8f8qAEkAEgDp//7/EAAMAAsA///x//7/DwD+/+f/7v/+//3/BwAkACcADAD+//3/9P/t/+X/4f/4/wwA/f/0//r/7//6/x4ADgDk//f/GAAAAOb/+f8MAAYAAQANAA8A5//M//3/LAD9/8//AwAyAAYA3P/y/wUA+/8AAAIA5//e/wQAHAAHAP7/EQAHAOT/6v8RAAsA2f/L//D/+P/Y/+b/GQAJANH/3f8LAA4ADQAfABgA/f/7/xQAJQAXAPv/8f/r/+D/+f8aAP3/3f8IADAAFgD9/wIAAgAKACAAJQATAPr/5//u//3/AQAHAAwA+v/t//f///8AAAcAEwAeABwAEAAWACkAIQAPABcAIAAWAA8ADAAJAAEA7v/g/+n/8P/y////+//m/+n/9f/9/wsA9v/N/+H/CAD1/+n//P/x/+n/AAD//wEAIAASAOX/6v8AAAEABgD5/93/5/8EABIAFAAIAAgAIgAfAAcAGwAxABsADwARAPn/7v8CAAsABwAEAP3/8f/f/9X/5v/f/7r/y//9//7/AwAlAA0A7/8jAEQAKgA8AE0AKQA4AGAAMgASADcAHADd//7/OwA2AA8A6//f/9X/s//I/wwA9v/I//T/+f+8/9L/5v+c/6D/AwAbAAkAHQAaAAIAAwALAB8ANgAuAB4AEQD5/+//6P/J/83/7//o/+r/FwASAPL/DwAeAPL/6f8FAP3/8P/3//L/9P8MAA0A7//m//n////o/+b/GwA/ACAAGQBKAFIAOgBEADYAAAD1//f/1v/P//L/GgBGAE8AKQAsAE0ANAAGAPH/5P/q//H/3f/t/wUA3P/Q//X/2P/B//7/EADv//X/5P/B/+X/BQD8/xQAGwD4/wYALwA6AEAAJQDu//r/HQASABkAJgABAO7/8v/S/9D/BAASAP3/7//X/9P/8P8GABIAEADv/+v/FAAdAAsABADo/87/7/8UABYAGgAOAO7/+f8aABYADwAaABUAAgD//wUACAABAPb/9f/z//D/AwAbABEA/P/5//3/CQAYAA4A9//z//v/+//7//3/+v/7/wAAAQADAAcACAABAPb/8/8AABEAGgAbABMABQAGABMAFQALAAQA/v/4//r///8BAAEAAgAAAP//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/P8CABYAIwAfABIAFAAdAAsA+f8MACAAGwARAAQAAAASABYADQAhACgABgD7/wYAAwASACcADgDr/+j/9P8CAP//8P8CABUA9f/l/wIAAgD1/wYAEAAZADgANAAKAP3/AQAAAAkA9v/O/+H/BgDv/9r/9P8IABMAJgAcAAYAAgD5/+P/yf+q/7r/8v/o/7X/xP/k/+L/8v/+/+X/3//r/+n/8f/+/wYAHQAYAPz/DAAXAO7/6v8KAA8AGgATAOj/AAAuAP3/6f8jABcA9f8dACEACgAzADsA/P/h//D/EgA9ACcABgA7AFcAIAARABUA5v/e/wkACQD3//z//f8FABYAEQACAPj/AwBBAGAAHgDs//z/8v/o/xgAIwD1/+3/9v/p//P/9f/O/9L/7//P/87/FAAMAL//w//s/9v/y//i/+7/z/+l/73/DAARAN3/9f8aAPT/+f8/AD4ACgDy/9f/xv/b/+z/AwAlAP7/xv/9/1wAegBwAEIA/f8CAFkAmwCCAB8A0P/W//D/BwBOAGAA+v/X/yoANwAKAAgA2f+R/7v/DAAlADkAJADZ/8P/3//x/w8AFAD4/wkACgDV/+X/EwDy/9n/2v/E/+7/IwD0//D/EACX/z//zv9LADYAHAD2/8P/2P8GACsAOADh/53/5f8CANL/AQAdAMT/vP8QADoAXwBQAMv/jP/S/woAMABPACcADQAlABoAJwBhAEIA+//9/wkAJQBgADAAxf/E/9L/s//o/zYALwA9AGgAOADz/wIAMQA3AP//y//4/y8ADQD0/wMA6v/t/ysAKADv/97/3//3/ycAEgDX/+P/+P/S/8H/6P8QABYA6/+3/7r/2//5/xAA9//I/+L/EAAAAPr/BADK/6L/0f/c/7j/6f82ACkADwAjACkANABWAEMAAQDj/+T/6//9/wQA//8JAA4ACwAWABgAFgAnAB4ABAAXACkAFAAlAEcAKwAMABMABwDn/+H/9/8cACoAEQACAP//8v8CABwABAD3/xEACwD5/w0ACgDt//X/BgAHABQADwDz/+3/7v/n//f/BADw/+j/9//7//T/6//m//D/8P/l//3/HwAXAAYABgD///T/9//8/wQADQAFAPf/9v/5//z/AgABAAIACQADAP//DAAIAPL/8/8BAAAABQAPAAcA//8GAAcAAAADAAsACAD///7/AwAFAAEAAAABAAAAAQACAAEAAQACAAAA/v8AAAIAAQABAAEAAAD//wAAAQAAAAAA"],Sf=["atmosphere","motif","pulse"],wf=160/3,Ef=new WeakMap,Tf=new WeakMap;function x2(n){let e=Tf.get(n);return e||(e={buffers:A2.map(t=>{const i=atob(t),s=n.createBuffer(1,i.length/2,v2),r=s.getChannelData(0);for(let a=0;a<r.length;a++){const o=i.charCodeAt(a*2)|i.charCodeAt(a*2+1)<<8;r[a]=(o>32767?o-65536:o)/32768}return s}),next:0},Tf.set(n,e)),e.buffers[e.next++%e.buffers.length]}const Cf=n=>Math.max(0,Math.min(1,Number.isFinite(n)?n:0)),ks=(n,e,t,i=.05)=>{if(typeof n.cancelAndHoldAtTime=="function")n.cancelAndHoldAtTime(t);else{const s=n.value;n.cancelScheduledValues(t),n.setValueAtTime(s,t)}n.linearRampToValueAtTime(e,t+i)},_2=[{time:9.16,sound:"brand"},{time:11.84,sound:"confirm"},{time:19.48,sound:"scan"},{time:21.84,sound:"confirm"},{time:22.76,sound:"welcome"},{time:23.52,sound:"text-reveal"},{time:25.04,sound:"text-reveal"},{time:26.92,sound:"array"},{time:30.68,sound:"open"},{time:34.3,sound:"inspect"}];function y2(n,e,t,i,s=0){const r=n.createGain(),a=n.createStereoPanner();a.pan.value=Math.max(-.65,Math.min(.65,s)),r.connect(a),a.connect(e);const o=[];let l=0,c=i;const h=(m,v,p,g,_,b=.006,y=!1)=>{const S=n.createGain(),E=i+g;y?S.gain.setValueAtTime(p,E):(S.gain.setValueAtTime(0,E),S.gain.linearRampToValueAtTime(p,E+Math.min(b,_*.3)),S.gain.exponentialRampToValueAtTime(1e-5,E+_),S.gain.linearRampToValueAtTime(0,E+_+.012)),v.connect(S),S.connect(r),o.push(m),l++,m.onended=()=>{m.disconnect(),v.disconnect(),S.disconnect(),--l===0&&(r.disconnect(),a.disconnect())},m.start(E),m.stop(E+_+.015),c=Math.max(c,E+_+.015)},d=(m,v,p,g,_=0,b=.006)=>{const y=n.createOscillator();y.frequency.setValueAtTime(m,i+_),y.frequency.exponentialRampToValueAtTime(v,i+_+g),h(y,y,p,_,g,b)},u=(m,v,p,g,_=0,b=.008)=>{let y=Ef.get(n);if(!y){y=n.createBuffer(1,n.sampleRate*2,n.sampleRate);const R=y.getChannelData(0);let x=773;for(let w=0;w<R.length;w++)x=Math.imul(x,1664525)+1013904223>>>0,R[w]=x/2147483648-1;Ef.set(n,y)}const S=n.createBufferSource(),E=n.createBiquadFilter();S.buffer=y,E.type="bandpass",E.Q.value=.8,E.frequency.setValueAtTime(m,i+_),E.frequency.exponentialRampToValueAtTime(v,i+_+g),S.connect(E),h(S,E,p,_,g,b)},f=(m,v,p,g=0)=>{const _=[[1,1,1],[1.47,.39,.66],[2.09,.21,.4],[2.73,.095,.25],[3.86,.035,.15]];for(const[b,y,S]of _){const E=m*b;E>Math.min(8500,n.sampleRate*.42)||d(E,E,v*y,p*S,g,.0012)}u(4800,3600,v*.24,.013,g,8e-4)};switch(t){case"page-open":u(700,1800,.065,.18,0,.025),d(360,480,.032,.16,0,.014),d(960,960,.009,.075,.06,.01);break;case"page-close":u(1300,600,.05,.13,0,.014),d(420,280,.027,.13,0,.01);break;case"ui-tick":u(1500,1200,.042,.036,0,.003),d(820,820,.022,.052,0,.003);break;case"brand":d(146.83,146.83,.039,.72,0,.08),d(293.66,293.66,.03,.62,.07,.07),d(440,440,.022,.54,.17,.055),u(420,1750,.036,.7,0,.13);break;case"text-reveal":u(2100,1300,.033,.064,0,.005),d(1050,1050,.012,.06,0,.005);break;case"key":{const m=n.createBufferSource();m.buffer=x2(n),h(m,m,.2,0,m.buffer.duration,0,!0);break}case"tick":f(1680,.064,.24);break;case"column":f(1280,.065,.32),f(2050,.016,.18,.045);break;case"open":f(1150,.071,.58),f(2180,.025,.36,.16),u(3100,4400,.014,.25,.035,.025);break;case"confirm":d(640,640,.039,.095,0,.008),d(960,960,.026,.15,.095,.009);break;case"back":f(1120,.066,.22),d(560,560,.012,.1,.025,.002);break;case"scan":u(1800,3400,.025,.8,0,.12);for(let m=0;m<4;m++)d(760,760,.025,.064,m*.19+.15,.007);break;case"welcome":[293.66,440,659.25,739.99].forEach((m,v)=>d(m,m,.034,1.6,v*.095,.05)),u(600,1800,.065,.9,0,.15);break;case"array":u(1600,3300,.025,.8,0,.12);for(let m=0;m<5;m++)f(1180+m*170,.043-m*.005,.31,.05+m*.105);break;case"inspect":d(1120,1120,.026,.055,0,.005),d(1120,1120,.018,.055,.11,.005);break;case"explode":[1220,1680,2260].forEach((m,v)=>f(m,.054-v*.01,.4-v*.055,v*.115));break;case"assemble":[2260,1680,1220].forEach((m,v)=>f(m,.035+v*.008,.2,v*.095));break}return{end:c,stop(m){ks(r.gain,0,m,.018);for(const v of o)try{v.stop(m+.02)}catch{}}}}class M2{prefs={sound:!1,music:!1,soundVolume:.55,musicVolume:.5};context;effects;musicBus;duck;stemGains=[];buffers;loading;fetching;musicData;tracks=[];voices=[];lastSound=new Map;scene="boot";offset=0;startedAt=0;unlocked=!1;disposed=!1;bootTime=null;error="";requestId=0;suspension=Promise.resolve();bootMix=-1;playedKeys=0;entryPending=!1;hostPaused=!1;setHostPaused(e){this.hostPaused=e,e?this.hide():this.visibility()}constructor(){document.addEventListener("pointerdown",this.gesture,{capture:!0}),document.addEventListener("keydown",this.gesture,{capture:!0}),document.addEventListener("visibilitychange",this.visibility),window.addEventListener("pagehide",this.hide),window.addEventListener("pageshow",this.visibility)}gesture=()=>{this.entryPending||(this.unlocked=!0,this.activate())};holdForEntry(){this.entryPending=!0}releaseEntry(){this.entryPending=!1}cancelEntry(){this.hide()}async unlock(){return this.unlocked=!0,await this.activate(),this.context?.state==="running"&&(!this.prefs.music||!!this.buffers)}prepareMusic(){return this.musicData?Promise.resolve(this.musicData):(this.fetching??=Promise.all(Sf.map(async e=>{const t=new AbortController,i=setTimeout(()=>t.abort(),15e3);try{const s=await fetch(rs(`audio/${e}.ogg`),{signal:t.signal});if(!s.ok)throw new Error(`Music ${e}: ${s.status}`);return await s.arrayBuffer()}finally{clearTimeout(i)}})).then(e=>this.musicData=e).finally(()=>{this.fetching=void 0}),this.fetching)}restartBoot(){this.stopEffects(),this.bootTime=6.76,this.bootMix=-1}hide=()=>{this.requestId++,this.stopMusic(),this.stopEffects(),this.suspension=this.context?.suspend().catch(()=>{})??Promise.resolve()};visibility=()=>{this.bootTime=null,document.hidden?this.hide():this.unlocked&&!this.entryPending&&this.activate()};configure(e){this.prefs={sound:!!e.sound,music:!!e.music,soundVolume:Cf(e.soundVolume),musicVolume:Cf(e.musicVolume)},this.context&&(ks(this.effects.gain,this.prefs.sound?this.prefs.soundVolume:0,this.context.currentTime),ks(this.musicBus.gain,this.prefs.music?this.prefs.musicVolume:0,this.context.currentTime,.2)),this.prefs.sound||this.stopEffects(),this.prefs.music||this.stopMusic(),!this.prefs.sound&&!this.prefs.music?this.hide():this.unlocked&&!this.entryPending&&this.activate()}createContext(){const e=this.context=new AudioContext,t=e.createGain(),i=e.createDynamicsCompressor();return t.gain.value=.8,i.threshold.value=-8,i.knee.value=8,i.ratio.value=6,i.attack.value=.003,i.release.value=.18,this.effects=e.createGain(),this.musicBus=e.createGain(),this.duck=e.createGain(),this.effects.gain.value=this.prefs.sound?this.prefs.soundVolume:0,this.musicBus.gain.value=this.prefs.music?this.prefs.musicVolume:0,this.effects.connect(t),this.musicBus.connect(this.duck),this.duck.connect(t),t.connect(i),i.connect(e.destination),this.stemGains=Sf.map(()=>{const s=e.createGain();return s.gain.value=0,s.connect(this.musicBus),s}),this.mixScene(),e}async activate(){if(this.disposed||this.hostPaused||document.hidden||!this.unlocked||!this.prefs.sound&&!this.prefs.music)return;const e=++this.requestId;try{const t=this.context??this.createContext(),i=t.state==="running"?Promise.resolve():t.resume();if(await Promise.all([this.suspension,i]),e!==this.requestId||this.disposed||document.hidden||t.state!=="running"||e!==this.requestId||document.hidden||this.disposed)return;this.prefs.music&&(await this.loadMusic(t),e===this.requestId&&this.startMusic())}catch(t){this.error=t instanceof Error?t.message:"Audio unavailable"}}loadMusic(e){return this.buffers?Promise.resolve():(this.loading??=this.prepareMusic().then(t=>Promise.all(t.map(i=>e.decodeAudioData(i.slice(0))))).then(t=>{this.buffers=t,this.error=""}).finally(()=>{this.loading=void 0}),this.loading)}startMusic(){const e=this.context;!e||e.state!=="running"||!this.buffers||this.hostPaused||this.tracks.length||!this.prefs.music||this.disposed||document.hidden||(this.startedAt=e.currentTime+.04,this.tracks=this.buffers.map((t,i)=>{const s=e.createBufferSource();return s.buffer=t,s.loop=!0,s.loopStart=0,s.loopEnd=Math.min(wf,t.duration),s.connect(this.stemGains[i]),s.start(this.startedAt,this.offset%s.loopEnd),s}),this.musicBus.gain.cancelScheduledValues(e.currentTime),this.musicBus.gain.setValueAtTime(0,e.currentTime),this.musicBus.gain.linearRampToValueAtTime(this.prefs.musicVolume,e.currentTime+1.2))}stopMusic(){const e=this.context;!e||!this.tracks.length||(this.offset=(this.offset+Math.max(0,e.currentTime-this.startedAt))%wf,this.tracks.forEach((t,i)=>{const s=e.createGain();t.disconnect(),t.connect(s),s.connect(this.stemGains[i]),s.gain.setValueAtTime(1,e.currentTime),s.gain.linearRampToValueAtTime(0,e.currentTime+.06),t.stop(e.currentTime+.07),t.onended=()=>{t.disconnect(),s.disconnect()}}),this.tracks=[])}stopEffects(){this.context&&this.voices.forEach(e=>e.stop(this.context.currentTime)),this.voices=[],this.lastSound.clear()}setScene(e){this.scene!==e&&(this.scene=e,this.bootTime=null,this.bootMix=-1,this.stopEffects(),this.mixScene())}mixScene(){if(!this.context)return;const e={boot:[.48,.32,.18],archive:[.9,.72,.65],detail:[.72,.36,.12],viewer:[.8,.24,.28]}[this.scene];this.stemGains.forEach((t,i)=>ks(t.gain,e[i],this.context.currentTime,1.1))}play(e="tick",t=0){const i=this.context;if(!this.prefs.sound||this.hostPaused||!i||i.state!=="running"||document.hidden||this.disposed)return;const s=i.currentTime,r=e==="key"?.024:e==="tick"||e==="column"?.055:.12;if(s-(this.lastSound.get(e)??-1/0)<r)return;this.lastSound.set(e,s),this.voices=this.voices.filter(o=>o.end>s),this.voices.length>=10&&this.voices.shift().stop(s);const a=y2(i,this.effects,e,s+.004,t);this.voices.push(a),this.prefs.soundVolume>0&&window.dispatchEvent(new CustomEvent("rhine-local-sound",{detail:{until:performance.now()/1e3+Math.max(0,a.end-s)+.2}})),e==="key"&&this.playedKeys++,["open","brand","welcome","array","explode","assemble"].includes(e)&&(ks(this.duck.gain,.65,s,.035),this.duck.gain.linearRampToValueAtTime(1,s+.9))}updateBoot(e,t=!1){const i=e+5,s=this.bootTime;this.bootTime=i;const r=i<22.76?0:i<26.92?1:i<34.3?2:3;if(r!==this.bootMix&&this.context){this.bootMix=r;const a=[[.48,.32,.18],[.68,.55,.32],[.9,.72,.65],[.72,.36,.12]][r];this.stemGains.forEach((o,l)=>ks(o.gain,a[l],this.context.currentTime,.9))}if(t||s===null||i<s||i-s>.3){this.stopEffects();return}for(const a of _2)a.time>s&&a.time<=i&&this.play(a.sound);g2(s,i)&&this.play("key")}stats(){return{state:this.context?.state??"locked",scene:this.scene,tracks:this.tracks.length,voices:this.voices.filter(e=>e.end>(this.context?.currentTime??0)).length,loaded:!!this.buffers,playedKeys:this.playedKeys,error:this.error,preferences:{...this.prefs}}}dispose(){this.disposed=!0,this.requestId++,this.stopMusic(),this.stopEffects(),document.removeEventListener("pointerdown",this.gesture,!0),document.removeEventListener("keydown",this.gesture,!0),document.removeEventListener("visibilitychange",this.visibility),window.removeEventListener("pagehide",this.hide),window.removeEventListener("pageshow",this.visibility),this.context?.close()}}function b2(n){return`<div class="audio-settings">${[["sound","soundVolume","INTERFACE SOUND","操作与启动音效"],["music","musicVolume","BACKGROUND MUSIC","观测室 · 背景音乐"]].map(([e,t,i,s])=>`<div class="audio-setting">
    <label class="audio-toggle"><div><strong>${i}</strong><span>${s}</span></div><input type="checkbox" data-pref="${e}" ${n[e]?"checked":""}/><i class="toggle"></i></label>
    <label class="audio-volume"><span>${e==="sound"?"音效":"音乐"}音量</span><input aria-label="${e==="sound"?"音效":"音乐"}音量" data-volume="${t}" type="range" min="0" max="100" step="1" value="${Math.round(n[t]*100)}"/><output>${Math.round(n[t]*100)}%</output></label>
  </div>`).join("")}</div>`}class S2{constructor(e){this.options=e;const{root:t}=e;t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","进入莱茵生命档案终端"),t.insertAdjacentHTML("beforeend",'<div class="entry-controls"><button class="entry-start" disabled>正在准备终端…</button><button class="entry-silent" hidden>关闭声音并进入</button><p class="entry-status" role="status">资源就绪后即可进入</p></div>'),this.button=t.querySelector(".entry-start"),this.silent=t.querySelector(".entry-silent"),this.status=t.querySelector(".entry-status"),t.addEventListener("click",i=>{i.stopPropagation(),i.target.closest(".entry-silent")?(this.request++,e.cancel(),this.finish(!0)):(this.state==="waiting"||this.state==="error")&&this.enter()}),t.addEventListener("keydown",i=>{if(i.stopPropagation(),i.key==="Tab"){const s=[this.button,this.silent].filter(a=>!a.disabled&&!a.hidden);if(!s.length){i.preventDefault();return}const r=s.indexOf(document.activeElement);i.preventDefault(),s[(r+(i.shiftKey?s.length-1:1))%s.length].focus()}})}options;state="loading";request=0;button;silent;status;get phase(){return this.state}ready(){this.state="waiting",this.options.root.dataset.entry="waiting",this.button.disabled=!1,this.button.textContent="点击进入 →",this.options.root.querySelector(":scope > span").textContent="INTERNAL DATABASE / READY",this.status.textContent="轻触屏幕或按 Enter 开始",this.button.focus({preventScroll:!0})}async enter(){const e=++this.request;this.state="starting",this.options.root.dataset.entry="starting",this.button.setAttribute("aria-disabled","true"),this.button.textContent="正在准备声音…",this.status.textContent="准备完成后开始播放",this.silent.hidden=!1;let t;try{const i=await Promise.race([this.options.unlock(),new Promise(s=>{t=setTimeout(()=>s(!1),2e4)})]);if(e!==this.request)return;i&&!document.hidden?this.finish(!1):(this.options.cancel(),this.state="error",this.options.root.dataset.entry="error",this.button.removeAttribute("aria-disabled"),this.button.textContent="重试声音并进入 →",this.status.textContent="声音暂未就绪，请重试或无声进入")}catch{if(e!==this.request)return;this.options.cancel(),this.state="error",this.options.root.dataset.entry="error",this.button.removeAttribute("aria-disabled"),this.button.textContent="重试声音并进入 →",this.status.textContent="声音暂未就绪，请重试或无声进入"}finally{clearTimeout(t)}}finish(e){this.state!=="started"&&(this.state="started",this.options.start(e))}}document.createElement("canvas").getContext("2d");let dh;const $=n=>document.querySelector(n);$("#stage").innerHTML=`
  <div id="three-scene" class="three-scene"></div>
  <div class="scene-atmosphere archive-atmosphere"></div>
  <div id="boot-background" class="boot-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#fff" stroke-width="3"><path d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"/><path d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"/><circle cx="1450" cy="648" r="346"/><circle cx="1450" cy="648" r="348"/></g></svg></div>
  <header class="brand">${XM}</header>
  <nav class="system-nav" aria-label="系统导航">
    <button data-action="search"><span class="nav-glyph">⌕</span> ARCHIVE INDEX <span class="key">/</span></button>
    <button data-action="saved" aria-label="查看收藏档案" title="收藏档案">＋ SAVED <span id="saved-count">00</span></button>
    <button class="album-button" data-action="album" aria-label="相册总览" title="相册总览"><span class="album-glyph" aria-hidden="true">▦</span><span class="settings-label">相册</span></button>
    <button class="settings-button" data-action="settings" aria-label="系统设置" title="系统设置"><span class="settings-glyph" aria-hidden="true">◷</span><span class="settings-label">设置</span></button>
  </nav>
  <button id="skip" class="skip" data-action="skip">ENTER SYSTEM <span>↗</span></button>
  <section id="boot" class="boot" aria-label="系统启动">
    <div class="access-text">ACCESS</div>
    <div class="boot-logo">${ec}</div>
    <div class="auth-status"><span>▪</span> <span id="auth-message"></span><i></i></div>
    <div class="scan"><svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-width="2" stroke-linecap="round"><path/><path stroke="#fff"/><path/><path/><path/><path/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="scan-core" cx="960" cy="540" r="5" fill="#080a08" stroke="none"/></g></svg><span>PERMISSION AUTHORIZED</span></div>
    <div class="welcome"><div class="welcome-panel"></div><div class="welcome-heading">WELCOME TO</div><div class="welcome-company"><strong>RHINE LAB.LLC.</strong><strong class="welcome-highlight" aria-hidden="true">RHINE LAB.LLC.</strong></div><div class="welcome-database">INTERNAL DATABASE</div><div class="welcome-logo">${ec}</div></div>
  </section>
  <svg id="inspection-marks" viewBox="0 0 1920 1080" aria-hidden="true"><path id="inspection-lines"/><g id="inspection-corners"></g><circle id="inspection-point" r="1.8"/></svg>
  <div id="inspection-text" aria-hidden="true">CONFIDENTIALITY:<strong>GENERAL BUSINESS USE</strong></div>
  <section id="archive-ui" class="archive-ui" aria-label="档案选择">
    <div class="archive-callout"><div class="eyebrow">INTERNAL DATABASE <span>／</span> <span id="archive-category">机构档案</span></div><button class="file-title" data-action="open">FILE NUMBER: <span id="selected-id">X-<span id="selected-code">001</span></span><span class="file-open">↗</span></button><div class="callout-rule"><i></i></div><div class="file-summary"><span id="selected-title">莱茵生命</span><span id="selected-clearance">BUSINESS AREA</span></div><button class="read-file" data-action="open">ACCESS FILE <span>→</span></button></div>
    <div id="hover-label" class="hover-label" hidden>X-<span id="hover-code">001</span> / <span id="hover-title"></span></div>
    <div class="archive-counter"><span class="tiny-label">ARCHIVE / SELECT</span><div><span id="selected-number">01</span><i>/</i><span class="count-total">12</span></div></div>
    <div class="archive-navigation"><button data-action="prev" aria-label="上一个档案">↑</button><div id="file-ticks" class="file-ticks"></div><button data-action="next" aria-label="下一个档案">↓</button></div>
    <div class="column-navigation"><button data-action="column-prev" aria-label="上一列">←</button><div><span id="column-number">COLUMN <span id="column-index">03</span> / 05</span><strong id="column-name">机构档案</strong></div><button data-action="column-next" aria-label="下一列">→</button></div>
    <div class="archive-hint"><kbd>←</kbd> <kbd>→</kbd> 切换列 <span>／</span> <kbd>↑</kbd> <kbd>↓</kbd> 前后档案 <span>／</span> <kbd>ENTER</kbd> 读取</div>
  </section>
  <section id="detail-ui" class="detail-ui" aria-label="档案内容" hidden>
    <button class="back-button" data-action="back">← <span>ARCHIVE OVERVIEW</span><small>ESC</small></button>
    <div class="object-caption"><span id="object-id">NO.001</span><div>INTERNAL DATABASE</div><small>DRAG TO INSPECT <span>↔</span></small><button class="viewer-open" data-action="model-viewer">360° 查看文档模型 <span>↗</span></button></div>
    <article id="detail-content" class="detail-content"></article>
  </section>
  <div class="powered">POWERED BY <b>RHINE LAB</b><i></i></div>
  <footer class="system-footer"><span><i class="status-light"></i> SESSION AUTHORIZED</span><span>JOYCE MOORE <i>／</i> <span id="clock">00:00:00</span></span><button data-action="replay" title="重播启动流程">REINITIALIZE ↗</button></footer>
  <div id="pwa-update-notice" class="pwa-update-notice" role="status" hidden><span>新版本已就绪</span><button data-pwa-action="update">更新并重启 ↻</button></div>
  <div id="modal-root"></div><div id="toast" class="toast" role="status"></div>
  <div id="loading" class="loading"><div class="loading-mark">${ec}</div><span>CONNECTING TO INTERNAL DATABASE</span><i></i></div>
`;$("#boot-background").insertAdjacentHTML("beforeend",'<div class="boot-white"></div>');const r0=new c2($("#stage"));$("#viewport").insertAdjacentHTML("beforeend",'<button class="mobile-entry" data-action="skip">进入档案 <span>→</span></button>');let Fe="boot",gt=0,hr=0,No="",Si=!1,ot=null,Qs="",Ks="全部档案",ur="overview";const ri=new URLSearchParams(location.search);let ma=ri.get("freeze")==="1"?Number(ri.get("time")??0):null;ri.get("review")==="1"&&($("#stage").dataset.review="true",window.addEventListener("message",n=>{if(n.origin!==location.origin||n.source!==window.parent||n.data?.type!=="rhine-review-frame")return;const e=Number(n.data.time);!Number.isFinite(e)||e<0||e>=35||(ma=e,Si&&Fe!=="boot"&&Zt("boot"))}));let Rf,a0=null;const fh=new Jp($("#detail-ui"),void 0,180,180),Zo=new Rb;let Js,Nn=!1,Uo=[],Oo=!1,ph;function o0(n,e){try{return JSON.parse(localStorage.getItem(n)??"null")??e}catch{return e}}const si=new Set(o0("rhine-saved",[])),ci=o0("rhine-settings",{}),l0=ZM(ci.motion,ci.reduced??(ci.motion===void 0?matchMedia("(prefers-reduced-motion: reduce)").matches:void 0)),w2=$h(l0),Be={sound:ci.sound??!0,music:ci.music??ci.sound??!0,soundVolume:ci.soundVolume??.55,musicVolume:ci.musicVolume??.5,motion:l0,motionPreset:w2,quality:ci.quality??!0,superPerformance:ci.superPerformance??!1,rendering:ss(ci.rendering,ci.quality!==!1),colorTheme:ci.colorTheme==="dark"?"dark":"light"},Qe=n=>QM(Be.motion,n),c0=()=>Object.values(Be.motion).every(n=>!n);n0(Be.colorTheme==="dark"?1:0);const h0={duration:460,motionBlur:!0,animated:Qe("rollingNumbers")},u0=Z0($("#clock")),tu={...h0,locales:"en-US",format:{minimumIntegerDigits:2,useGrouping:!1}},mh=la($("#selected-number"),{...tu,value:1}),gh=la($("#column-index"),{...tu,value:1}),E2=n=>On.findIndex(e=>e.name===Bn[n])+1,d0={...tu,format:{minimumIntegerDigits:3,useGrouping:!1},value:1},ga={...h0,animated:Qe("rollingText"),transition:"direct",stagger:"none"},f0=ca($("#selected-title"),{...ga,text:$("#selected-title").textContent??""}),p0=ca($("#column-name"),{...ga,text:$("#column-name").textContent??""}),vo=ca($("#hover-title"),{...ga,text:""}),m0=ca($("#archive-category"),{...ga,text:$("#archive-category").textContent??""}),g0=ca($("#selected-clearance"),{...ga,text:$("#selected-clearance").textContent??""}),Fo=[f0,p0,vo,m0,g0],vh=la($("#selected-code"),d0),$s=la($("#hover-code"),d0),st=new M2,v0={sound:n=>st.play(n),locate:n=>{Si&&(nu.close(),Fe==="boot"&&Zt("archive"),(gt!==n||Fe!=="detail")&&Fn(n),oa())}},iu=new h2(v0),nu=new u2({...v0,view:n=>iu.open(n)});function Qo(){st.configure({...Be,music:Be.music&&!0})}Qo();const T2=ri.has("scene")||ri.has("time")||ri.get("review")==="1";let fs=!1;const Xs=$("#loading");$("#viewport").append(Xs);$("#stage").inert=!0;$(".mobile-entry").inert=!0;const sa=!T2&&(Be.sound||Be.music)?new S2({root:Xs,unlock:()=>st.unlock(),cancel:()=>st.cancelEntry(),start:n=>M0(n)}):void 0;sa&&(st.holdForEntry(),Be.music&&st.prepareMusic().catch(()=>{}));let Bo=!1,Ah=0,qe,_i="on",Vt;const A0=[],x0=Bn.map((n,e)=>Hn(e)[0]);function C2(){A0.unshift({id:vt[gt].id,time:new Date().toLocaleTimeString("en-GB")})}function Ko(){try{localStorage.setItem("rhine-settings",JSON.stringify(Be))}catch{}Qo()}function ra(){return Be.superPerformance}function Ho(){return ra()?cm:Be.rendering}function In(){Ko(),Qe("rollingText")||Fo.forEach(n=>n.finish()),Qe("rollingNumbers")||[mh,gh,vh,$s].forEach(n=>n.finish()),Qe("surfaceTransitions")||(fh.finish(),Js?.finish(),Zo.finish(),ph?.cancel()),qe?.setMotion(Be.motion),qe?.setTheme(Be.colorTheme==="dark",!Qe("surfaceTransitions")||!fs),document.querySelectorAll("[data-color-theme]").forEach(n=>n.setAttribute("aria-pressed",String(n.dataset.colorTheme===Be.colorTheme))),qe?.setSuperPerformance(ra()),Vt?.setSuperPerformance(ra()),qe?.setQuality(Ho()),Vt?.setQuality(Ho()),Vt?.setMotion(Be.motion),lm(Be.rendering),$o(),mh.update({animated:Qe("rollingNumbers")&&Fe==="archive"}),Fo.forEach(n=>n.update({animated:Qe("rollingText")&&Fe==="archive"})),gh.update({animated:Qe("rollingNumbers")&&Fe==="archive"}),vh.update({animated:Qe("rollingNumbers")&&Fe==="archive"}),$s.update({animated:Qe("rollingNumbers")&&Fe==="archive"}),$("#stage").classList.toggle("reduce-motion",c0()),$("#stage").classList.toggle("reduce-surfaces",!Qe("surfaceTransitions")),u0(new Date,Qe("rollingNumbers"))}let xh="";function ms(){const n=$("#stage"),e=$("#viewport"),t=matchMedia("(pointer: coarse)").matches,i=ri.has("time")||ri.get("review")==="1",{width:s,height:r,scale:a,kind:o}=Fe==="boot"&&!i?hm(e.clientWidth,e.clientHeight):um(e.clientWidth,e.clientHeight,t,Fe==="boot");n.style.width=`${s}px`,n.style.height=`${r}px`,n.style.transform=`translate(-50%, -50%) scale(${a})`,n.dataset.layout=o,n.dataset.touch=String(t),e.dataset.mobileBoot=String(Fe==="boot"&&(t||e.clientWidth<1100)),n.style.setProperty("--stage-scale",String(a)),n.style.setProperty("--opening-width",`${s}px`),n.style.setProperty("--opening-height",`${r}px`),n.style.setProperty("--opening-scan-scale",String(Math.min(1,s/1920))),n.dataset.openingPortrait=String(s<r);const l=window.visualViewport,c=(e.clientHeight-r*a)/2;n.style.setProperty("--modal-top",`${Math.max(0,(l?.offsetTop??0)-c)/a}px`),n.style.setProperty("--modal-height",`${Math.min(r,(l?.height??e.clientHeight)/a)}px`),$("#viewport").style.setProperty("--scale",String(a)),document.querySelector("#inspection-marks")?.setAttribute("viewBox",`0 0 ${s} ${r}`);const d=JSON.stringify([s,r,a,o,devicePixelRatio]);d!==xh&&(xh=d,qe?.resize(),Vt?.resize()),$o(),requestAnimationFrame(()=>{_r.refresh();const u=document.querySelector(".detail-tabs button.active"),f=document.querySelector(".tab-indicator");u&&f&&(f.style.transform=`translateX(${u.offsetLeft}px) scaleX(${u.offsetWidth})`)})}window.addEventListener("resize",ms);window.visualViewport?.addEventListener("resize",ms);window.visualViewport?.addEventListener("scroll",ms);matchMedia("(pointer: coarse)").addEventListener("change",ms);ms();p2({reduced:()=>$("#stage").classList.contains("reduce-motion")||matchMedia("(prefers-reduced-motion: reduce)").matches,dark:()=>document.documentElement.dataset.darkSurface==="true",refit:()=>{xh="",ms()}});$("#file-ticks").innerHTML=Hn(dn(gt).lane).map(n=>`<button data-select="${n}"></button>`).join("");const R2=[...$("#file-ticks").querySelectorAll("button")],Pf=f2();let Df=!1;function P2(){if(!Pf||Df)return;Df=!0,$("#viewport").insertAdjacentHTML("beforeend",`<div class="arrival-badge" role="status"><i></i>ACCESS ROUTE / ${Rt(Pf.toUpperCase())}</div>`);const n=$(".arrival-badge");requestAnimationFrame(()=>n.classList.add("visible")),setTimeout(()=>n.classList.remove("visible"),5200),setTimeout(()=>n.remove(),6e3)}function Zt(n){n!=="boot"&&P2();const e=Fe;Fo.forEach(t=>t.update({animated:Qe("rollingText")&&n==="archive"})),n!=="archive"&&(Fo.forEach(t=>t.finish()),$s.finish(),$("#hover-label").hidden=!0),n==="detail"&&Fe!=="detail"&&C2(),Fe=n,st.setScene(n),n!=="boot"&&Bo&&(Bo=!1,Ah++,Qo()),$("#stage").dataset.mode=n,e!==n&&ms(),$("#boot").inert=n!=="boot",$("#boot").setAttribute("aria-hidden",String(n!=="boot")),$("#archive-ui").inert=n!=="archive"||!!ot||!!dh?.enabled,$("#archive-ui").setAttribute("aria-hidden",String(n!=="archive"||!!dh?.enabled)),$(".system-nav").inert=n==="boot"||!!ot,$(".system-footer").inert=n==="boot"||!!ot,n==="detail"?e!=="detail"&&fh.show(!Qe("surfaceTransitions")):(e==="detail"||n==="boot"&&!$("#detail-ui").hidden)&&(Oo=!1,Zo.cancel(),fh.hide(!Qe("surfaceTransitions")||n==="boot"),!ot&&n==="archive"&&$(".read-file").focus({preventScroll:!0})),$("#detail-ui").inert=n!=="detail"||!!ot,qe?.setMode(n==="boot"?"hidden":n),n!=="boot"&&(r0.reset(),$(".file-title").firstChild.textContent="FILE NUMBER: ",$("#stage").dataset.boot="done"),n==="detail"&&e!=="detail"&&(I2(),Oo=!0,qe||($("#detail-content").style.opacity="1",$("#detail-content").style.translate="0 0",$("#detail-content").inert=!1))}function Fn(n,e){gt=(n+vt.length)%vt.length,x0[dn(gt).lane]=gt,Fe==="detail"&&Zt("archive"),ur="overview",qe?.select(gt,e),su(e);const t=e&&"axis"in e&&e.axis==="lane";st.play(t?"column":"tick",t?e.direction*.45:0)}function ko(n){const e=Hn(dn(gt).lane);e.length<2||Fn(e[(e.indexOf(gt)+n+e.length)%e.length],{axis:"row",direction:n})}function aa(n){const e=dn(gt).lane,t=nh(e+n,Bn.length);Fn(x0[t],{axis:"lane",direction:n})}function su(n){const e=vt[gt],{lane:t}=dn(gt),i=Hn(t);f0.update({text:e.title,animated:Qe("rollingText")&&Fe==="archive"}),g0.update({text:e.clearance,animated:Qe("rollingText")&&Fe==="archive"}),m0.update({text:e.category,animated:Qe("rollingText")&&Fe==="archive"});const s=n&&"axis"in n?n.direction>0?"up":"down":"auto";vh.update({value:Number(e.id.slice(2)),animated:Qe("rollingNumbers")&&Fe==="archive",direction:s}),mh.update({value:i.indexOf(gt)+1,animated:Qe("rollingNumbers")&&Fe==="archive",direction:n&&"axis"in n&&n.axis==="row"?s:"auto"}),$(".count-total").textContent=String(i.length).padStart(2,"0"),gh.update({value:E2(t),animated:Qe("rollingNumbers")&&Fe==="archive",direction:n&&"axis"in n&&n.axis==="lane"?s:"auto"}),p0.update({text:Bn[t],animated:Qe("rollingText")&&Fe==="archive"}),$('[data-action="column-prev"]').disabled=!1,$('[data-action="column-next"]').disabled=!1,R2.forEach((r,a)=>{const o=i[a],l=vt[o];r.dataset.select=String(o),r.setAttribute("aria-label",`选择档案 ${l.id} ${l.title}`),r.title=`${l.id} · ${l.title}`,r.classList.toggle("selected",o===gt),r.setAttribute("aria-pressed",String(o===gt))}),$("#saved-count").textContent=String(si.size).padStart(2,"0")}function _h(n=!1){Si&&hs(()=>D2(n))}function D2(n){hr=performance.now()/1e3-1.76,ma=null,No="",Zt(!Qe("boot")&&!n?"archive":"boot"),st.restartBoot(),qe?.select(0),gt=0,su(),n||st.play("ui-tick")}function oa(){Si&&hs(()=>{Zt("detail"),st.play("open")})}function L2(){const n=vt[gt].id;si.has(n)?si.delete(n):si.add(n);try{localStorage.setItem("rhine-saved",JSON.stringify([...si]))}catch{}$("#saved-count").textContent=String(si.size).padStart(2,"0");const e=$('[data-action="bookmark"]'),t=si.has(n);e.firstChild.textContent=t?"− REMOVE FROM SAVED":"＋ SAVE ARCHIVE",e.querySelector("span").textContent=t?"已收藏":"收藏档案",e.setAttribute("aria-pressed",String(t)),ph?.cancel(),Qe("surfaceTransitions")&&(ph=e.animate([{backgroundColor:"#67634c"},{backgroundColor:"#252820"}],{duration:220,easing:"ease-out"})),st.play("confirm"),Jo(si.has(n)?"档案已加入收藏":"已取消收藏")}function I2(){Zo.cancel();const n=vt[gt];$("#object-id").textContent="NO."+String(gt+1).padStart(3,"0");const e=ta.indexOf(gt),t=n.photo?`<figure class="album-photo" data-kind="${cs(n.photo.width,n.photo.height).kind.toLowerCase()}" style="${s0(n)}"><button class="album-photo-frame" data-action="photo-open" aria-label="全屏查看 ${Rt(n.title)}">${pa(n,"mid",{eager:!0})}<span class="ph-hud"><i></i>${n.id}</span><span class="ph-open">VIEW ↗</span><span class="ph-ratio">${cs(n.photo.width,n.photo.height).label}</span></button><figcaption class="album-photo-caption"><span>${n.photo.width} × ${n.photo.height} · ${cs(n.photo.width,n.photo.height).kind}</span><span>${String(e+1).padStart(3,"0")} / ${String(ta.length).padStart(3,"0")}</span></figcaption></figure>`:'<div class="album-awaiting"><div><strong>AWAITING ARCHIVE</strong><p>此卷暂无照片</p></div></div>';$("#detail-content").innerHTML=`
  <div class="detail-kicker"><span>FILE ${n.id}</span><span>${Rt(n.clearance)}</span></div>
  <h2>${Rt(n.en)}</h2><div class="detail-title-cn">${Rt(n.title)}<span>${Rt(n.category)}</span></div>
  <div class="detail-rule"></div>
  ${t}
  <dl class="metadata"><div><dt>DATE / 日期</dt><dd>${Rt(n.department)}</dd></div><div><dt>PLACE / 地点</dt><dd>${Rt(n.date)}</dd></div><div><dt>TAGS / 标签</dt><dd>${Rt(n.lead)}</dd></div><div><dt>STATUS / 状态</dt><dd><i></i>${n.photo?"已归档 · 可读取":"待归档"}</dd></div></dl>
  <div class="detail-tabs" role="tablist"><button id="tab-overview" class="active" role="tab" aria-controls="tab-panel" aria-selected="true" data-tab="overview">01 <span>说明</span></button><button id="tab-notes" role="tab" aria-controls="tab-panel" aria-selected="false" data-tab="notes">02 <span>备注</span></button><button id="tab-history" role="tab" aria-controls="tab-panel" aria-selected="false" data-tab="history">03 <span>访问日志</span></button><i class="tab-indicator" aria-hidden="true"></i></div>
  <div id="tab-panel" class="tab-panel" role="tabpanel">${_0()}</div>
  <div class="detail-actions"><button class="solid-button" data-action="bookmark">${si.has(n.id)?"− REMOVE FROM SAVED":"＋ SAVE ARCHIVE"}<span>${si.has(n.id)?"已收藏":"收藏档案"}</span></button>${n.photo?`<a class="export-button" href="${na(n,"full")}" download="RHINE-LAB-${n.id}.webp" aria-label="导出 ${n.id} 照片">EXPORT <span>↓</span></a>`:""}</div>
  <div class="detail-footnote">${n.photo?'<button class="footnote-link" data-action="photo-open">全屏查看 ↗</button>':"<span></span>"}<span>${String(gt+1).padStart(3,"0")} / ${String(vt.length).padStart(3,"0")}</span></div>`,$("#detail-content").setAttribute("tabindex","-1"),$('[data-action="bookmark"]').setAttribute("aria-pressed",String(si.has(n.id))),_r.reset($("#detail-content"),!Qe("documentReveal")||!qe||qe.decryptionFrame.phase==="clear"),ru(ur,!1)}function _0(){const n=vt[gt].abstract;return`<div class="panel-label">CAPTION / 说明</div>${n?n.split(/\n+/).map(e=>`<p>${Rt(e)}</p>`).join(""):'<p class="album-muted">—</p>'}`}function ru(n,e=!0){if(e&&n===ur)return;ur=n,document.querySelectorAll("[data-tab]").forEach(r=>{const a=r.dataset.tab===n;r.classList.toggle("active",a),r.setAttribute("aria-selected",String(a)),r.setAttribute("tabindex",a?"0":"-1")});const t=vt[gt],i=$(`[data-tab="${n}"]`),s=$(".tab-indicator");s.style.transition=e&&Qe("surfaceTransitions")?"":"none",s.style.transform=`translateX(${i.offsetLeft}px) scaleX(${i.offsetWidth})`,$("#tab-panel").setAttribute("aria-labelledby",i.id),$("#tab-panel").innerHTML=n==="overview"?_0():n==="notes"?`<div class="panel-label">NOTES / 备注</div>${t.findings.length?`<ol class="research-notes">${t.findings.map((r,a)=>`<li><span>${String(a+1).padStart(2,"0")}</span>${Rt(r)}</li>`).join("")}</ol>`:'<p class="album-muted">—</p>'}`:`<div class="panel-label">ACCESS LOG / 本次访问</div>${A0.filter(r=>r.id===t.id).slice(0,4).map(r=>`<div class="log-row"><span>${r.time}</span><span>JOYCE MOORE</span><b>READ AUTHORIZED</b></div>`).join("")}<p class="log-note">本次会话已通过身份验证。档案内容以当前终端可访问范围展示。</p>`,$("#tab-panel").scrollTop=0,_r.refresh(),e&&(Zo.reveal($("#tab-panel"),!Qe("surfaceTransitions")),st.play("ui-tick"))}function Jo(n){clearTimeout(Rf),$("#toast").textContent=n,$("#toast").classList.add("visible"),Rf=setTimeout(()=>$("#toast").classList.remove("visible"),2600)}function yh(n){Si&&(ot||(a0=document.activeElement,Uo=[...$("#stage").children].filter(e=>e instanceof HTMLElement&&e.id!=="modal-root").map(e=>({node:e,inert:e.inert})),Uo.forEach(({node:e})=>e.inert=!0)),Nn=!1,ot=n,Qs="",Ks="全部档案",st.play("page-open"),Mh())}function hs(n){if(!ot){n?.();return}Nn||(Nn=!0,st.play("page-close"),Js.hide(!Qe("surfaceTransitions"),()=>{ot=null,Nn=!1,$("#modal-root").replaceChildren(),Js=void 0,Uo.forEach(({node:e,inert:t})=>e.inert=t),Uo=[],$("#archive-ui").inert=Fe!=="archive"||!!dh?.enabled,$("#detail-ui").inert=Fe!=="detail",a0?.focus({preventScroll:!0}),n?.()}))}function Mh(){if(!ot)return;Js?.dispose(),$("#modal-root").innerHTML=`<div class="modal-backdrop"><section class="terminal-modal ${ot==="settings"?"settings-modal":""}" role="dialog" aria-modal="true" aria-label="${ot==="settings"?"系统设置":ot==="saved"?"收藏档案":"档案检索"}"><div class="modal-top"><span>RHINE LAB / ${ot==="settings"?"SYSTEM PREFERENCES":"ARCHIVE DIRECTORY"}</span><button data-action="close-modal" aria-label="关闭窗口">CLOSE <span>×</span></button></div>${ot==="settings"?N2():`<h2>${ot==="saved"?"SAVED ARCHIVES":"ARCHIVE INDEX"}<small>${ot==="saved"?"收藏档案":"内部档案检索"}</small></h2><div class="search-field"><span>⌕</span><input id="archive-search" type="search" autocomplete="off" placeholder="输入编号、标题、日期、地点或标签" aria-label="检索档案"/><span class="key">ESC</span></div><div class="category-filters">${Cy.map((e,t)=>`<button data-filter="${Rt(e)}" class="${t===0?"active":""}">${Rt(e)}</button>`).join("")}</div><div class="result-header"><span>FILE / 档案</span><span>DATE / 日期</span><span>ACCESS</span></div><div id="search-results" class="search-results"></div><div class="modal-bottom"><span id="result-count"></span><span>INTERNAL DATABASE <i>●</i> CONNECTED</span></div>`}</section></div>`;const n=$(".modal-backdrop");n.hidden=!0,Js=new Jp(n,$(".terminal-modal")),Js.show(!Qe("surfaceTransitions")),ot==="settings"&&$o(),ot!=="settings"?(au(),requestAnimationFrame(()=>{n.isConnected&&!Nn&&$("#archive-search").focus()})):requestAnimationFrame(()=>{n.isConnected&&!Nn&&$('[data-action="close-modal"]').focus()}),$("#modal-root").querySelector(".modal-backdrop")?.addEventListener("click",e=>{e.target===e.currentTarget&&hs()})}function au(){const n=vt.map((e,t)=>({r:e,i:t})).filter(({r:e})=>(ot!=="saved"||si.has(e.id))&&(Ks==="全部档案"||e.category===Ks)&&`${e.id} ${e.title} ${e.en} ${e.department} ${e.date} ${e.lead} ${e.abstract}`.toLowerCase().includes(Qs.toLowerCase()));$("#search-results").innerHTML=n.length?n.map(({r:e,i:t})=>`<button class="result-row" data-result="${t}"><span class="result-name">${e.photo?`<span class="result-thumb">${pa(e,"thumb",{alt:""})}</span>`:""}<b>${e.id}</b><span>${Rt(e.title)}<small>${Rt(e.en)}</small></span>${si.has(e.id)?"<i>＋</i>":""}</span><span>${Rt(e.department)}</span><span>${e.photo?"AUTHORIZED":"EMPTY SLOT"} <i>↗</i></span></button>`).join(""):`<div class="empty-results"><span>∅</span><strong>${ot==="saved"&&!Qs?"尚无收藏档案":"没有匹配的档案"}</strong><p>${ot==="saved"&&!Qs?"读取档案时，选择 SAVE ARCHIVE 将其保存在此处。":"尝试其他标题、编号、日期，或切换分卷。"}</p><button data-action="reset-search">${ot==="saved"?"查看全部档案 →":"重置检索 →"}</button></div>`,$("#result-count").textContent=`${String(n.length).padStart(2,"0")} RECORDS FOUND`}function $o(){const n=document.querySelector("#quality-summary");if(!n)return;if(!qe){n.textContent="3D 已关闭 · 三维模型与渲染资源已释放";return}const e=qe.renderer.domElement,t=JSON.parse(e.parentElement?.dataset.renderQuality??"{}");n.textContent=`${ra()?"超级性能模式已启用 · 画质设置暂被覆盖，关闭后恢复 · ":""}实际渲染 ${e.width} × ${e.height} · ${Ho().antialias==="smaa"?"SMAA":"原始抗锯齿"} · 纹理 ${t.anisotropy??1}×${t.limited?" · 已达到缓冲上限":""}`}function y0(){const n=Be.motionPreset,e=Object.values(Be.motion).every(Boolean);return`<div id="motion-preference-note" class="motion-preference-note"><p>${KM(Be.motion)}</p><span>预设：${n==="full"?"完整动画":n==="reduced"?"减少动画":"自定义"} · 选择会保存在本站</span>${e?"":'<button data-action="enable-motion">启用完整动画并重播 ↻</button>'}</div>`}function N2(){return`<h2>SYSTEM SETTINGS<small>终端偏好设置</small></h2><p class="settings-intro">JOYCE MOORE <span>·</span> SESSION AUTHORIZED</p><div class="settings-list">${Zb(Be.colorTheme==="dark")}${`<label><div><strong>SUPER PERFORMANCE</strong><span>降低三维画质和渲染分辨率，保留完整动效；关闭后恢复原画质</span></div><input type="checkbox" data-pref="superPerformance" ${Be.superPerformance?"checked":""}/><i class="toggle"></i></label>`}${b2(Be)}</div>${y0()}${Gp(Be.motion,Be.motionPreset)}${om(Be.rendering)}${zf()}<div class="settings-shortcuts"><span>KEYBOARD CONTROLS</span><p><kbd>←</kbd><kbd>→</kbd> 切列 <kbd>↑</kbd><kbd>↓</kbd> 选档 <kbd>ENTER</kbd> 读取 <kbd>/</kbd> 检索 <kbd>ESC</kbd> 返回</p></div><div class="settings-bottom">${document.fullscreenEnabled?'<button data-action="fullscreen">FULLSCREEN <span>↗</span></button>':""}<button data-action="restart">REINITIALIZE SYSTEM <span>↻</span></button></div><div class="modal-bottom"><span>ANALYSIS OS / 1.0 · 使用 MiSans 字体（小米） <a href="${rs("fonts/MiSans-license.pdf")}" target="_blank" rel="noopener">字体许可</a></span></div><div class="modal-bottom credit-line"><span>界面、三维模型、动效与配乐来自 <a href="https://github.com/LBEILC/RhineLabUI" target="_blank" rel="noopener">RhineLabUI ↗</a> © 路北路陈 LBEILC（MIT 许可）· 《明日方舟》及莱茵生命相关设定归鹰角网络所有，本站为非官方同人改作</span><span>POWERED BY RHINE LAB</span></div>`}document.addEventListener("input",n=>{const e=n.target;if(e.dataset.quality){const i=document.querySelector(`[data-quality-output="${e.dataset.quality}"]`);i&&(i.value=`${e.value}%`)}const t=n.target;(t.dataset.volume==="musicVolume"||t.dataset.volume==="soundVolume")&&(Be[t.dataset.volume]=Number(t.value)/100,t.closest("label")?.querySelector("output")?.replaceChildren(`${t.value}%`),Ko()),n.target.id==="archive-search"&&(Qs=n.target.value,au())});document.addEventListener("change",n=>{const e=n.target;if(e.id==="quality-preset"&&Object.hasOwn(jr,e.value))Be.rendering={...jr[e.value]},In();else if(e.dataset.quality){const t=e.dataset.quality;Be.rendering=ss({...Be.rendering,[t]:t==="antialias"?e.value:Number(e.value)}),In()}if(e.dataset.pref){const t=e.dataset.pref;(t==="sound"||t==="music"||t==="quality"||t==="superPerformance")&&(Be[t]=e.checked),t==="sound"||t==="music"?Ko():In(),st.play("confirm")}if(e.dataset.motion){const t=e.dataset.motion;Be.motion[t]=e.checked,Be.motionPreset=$h(Be.motion),In();const i=$("#motion-settings"),s=i.querySelector(".motion-advanced")?.open??!1,r=i.closest(".settings-modal"),a=r?.scrollTop??0;i.outerHTML=Gp(Be.motion,Be.motionPreset),$("#motion-preference-note").outerHTML=y0(),$("#motion-settings").querySelector(".motion-advanced").open=s,requestAnimationFrame(()=>{r&&(r.scrollTop=a),document.querySelector(`[data-motion="${t}"]`)?.focus({preventScroll:!0})}),Jo(t==="boot"?"开场设置将在下次重播时生效":e.checked?"已启用此动画":"已关闭此动画"),st.play("confirm")}});document.addEventListener("click",n=>{const e=n.target.closest("[data-color-theme]");if(e){Be.colorTheme=e.dataset.colorTheme==="dark"?"dark":"light",In();return}if(!fs||Nn)return;const t=n.target.closest("button");if(!t)return;if(t.dataset.action==="motion-preset"){const s=t.dataset.preset;if(s!=="full"&&s!=="reduced")return;Be.motionPreset=s,Be.motion=s==="full"?ia():zp(),In(),Mh(),requestAnimationFrame(()=>document.querySelector(`[data-action="motion-preset"][data-preset="${Be.motionPreset}"]`)?.focus({preventScroll:!0})),st.play("confirm");return}if(t.dataset.select){Fn(Number(t.dataset.select));return}if(t.dataset.result){const s=Number(t.dataset.result);hs(()=>{Fn(s),oa()});return}if(t.dataset.filter){Ks=t.dataset.filter,document.querySelectorAll("[data-filter]").forEach(s=>s.classList.toggle("active",s.dataset.filter===Ks)),au();return}if(t.dataset.tab){ru(t.dataset.tab);return}const i=t.dataset.action;if(i==="toggle-three"){k2();return}if(i==="sound-preview"&&st.play("confirm"),i==="skip"&&(Zt("archive"),st.play("confirm")),i==="prev"&&ko(-1),i==="next"&&ko(1),i==="column-prev"&&aa(-1),i==="column-next"&&aa(1),i==="open"&&oa(),i==="model-viewer"&&Fe==="detail"&&qe){const s=qe;t.focus({preventScroll:!0}),Vt??=new Tb($("#stage"),()=>{st.setScene(Fe),st.play("page-close")},r=>st.play(r==="tick"?"ui-tick":r)),st.setScene("viewer"),Vt.setSuperPerformance(ra()),Vt.setQuality(Ho()),Vt.setMotion(Be.motion),qe.finishDecryption(),Vt.open(vt[gt].id,vt[gt].title,()=>s.createAssemblyModel(),!Qe("viewerNavigation")),st.play("page-open")}i==="back"&&(Zt("archive"),st.play("back")),(i==="search"||i==="saved"||i==="settings")&&(t.focus({preventScroll:!0}),yh(i)),i==="close-modal"&&hs(),i==="photo-open"&&Fe==="detail"&&iu.open(gt),i==="album"&&hs(()=>nu.open()),i==="bookmark"&&L2(),i==="reset-search"&&(ot="search",Qs="",Ks="全部档案",Mh()),(i==="replay"||i==="restart")&&_h(),i==="enable-motion"&&(Be.motion=ia(),Be.motionPreset="full",In(),_h()),i==="fullscreen"&&document.fullscreenEnabled&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>Jo("请使用浏览器的全屏快捷键 F11")))});document.addEventListener("keydown",n=>{if(!fs||Vt?.isOpen||iu.isOpen||nu.isOpen)return;if(Nn){n.preventDefault();return}const e=n.target instanceof HTMLInputElement;if(n.key==="Escape"){if(ot)hs();else if(Fe==="detail"||Fe==="boot"&&Si){const t=Fe==="detail"?"back":"ui-tick";Zt("archive"),st.play(t)}return}if(ot&&n.key==="Tab"){const i=[...$("#modal-root").querySelectorAll('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),summary,[tabindex="0"]')].filter(a=>a.tabIndex>=0&&!a.matches(":disabled")&&a.getClientRects().length>0),s=i[0],r=i.at(-1);n.shiftKey&&document.activeElement===s?(n.preventDefault(),r?.focus()):!n.shiftKey&&document.activeElement===r&&(n.preventDefault(),s?.focus());return}if(!(e||ot||!Si)){if(n.target.dataset.tab&&["ArrowLeft","ArrowRight"].includes(n.key)){n.preventDefault();const t=["overview","notes","history"];ru(t[(t.indexOf(ur)+(n.key==="ArrowRight"?1:2))%3]),$(`[data-tab="${ur}"]`).focus();return}n.key==="/"&&(n.preventDefault(),Fe==="boot"&&Zt("archive"),yh("search")),n.key==="Home"&&Mb(n)&&Fe==="archive"&&!ot&&(n.preventDefault(),yh("saved")),n.key==="ArrowLeft"&&Fe!=="boot"&&(n.preventDefault(),aa(-1)),n.key==="ArrowRight"&&Fe!=="boot"&&(n.preventDefault(),aa(1)),["ArrowUp","ArrowDown"].includes(n.key)&&Fe!=="boot"&&(n.preventDefault(),ko(n.key==="ArrowUp"?-1:1)),n.key==="Enter"&&(document.activeElement===document.body||document.activeElement?.id==="detail-content"||["prev","next","column-prev","column-next"].includes(document.activeElement?.dataset.action??"")||document.activeElement?.dataset.select)&&(n.preventDefault(),Fe==="boot"?Zt("archive"):Fe==="archive"&&oa())}});const Fs=n=>(n=Math.max(0,Math.min(1,n)),n*n*(3-2*n));function U2(n){st.updateBoot(n,ma!==null);let t=r0.update(n).step;n>=22&&(t="array"),n>=25.68&&(t="select"),n>=28.3&&(t="inspect"),t!==No&&($("#stage").dataset.boot=t,No=t),$(".file-title").firstChild.textContent=t==="array"?"SELECTING FILES...".slice(0,Math.max(0,Math.floor((n-21.94)*18))):"FILE NUMBER: ",$("#stage").style.setProperty("--entry-opacity",String(Fs((n-21.9)/.13))),$(".callout-rule").style.transform=`scaleX(${Fs((n-22.08)/.9)})`;const i=Fs((n-22)/.4),s=Fs((n-26)/1.8),r=.55*Fs((n-27.3)/1.65)+.45*Fs((n-29)/5);if(n>=35){Zt("detail");return}return{reveal:i,lift:s,zoom:r,time:n}}const O2=new nm,_r=new sm;document.fonts.addEventListener("loadingdone",()=>_r.refresh());let Lf=0,rc=0,ac=performance.now(),bh=0;function Ao(n){if(!am()){requestAnimationFrame(Ao);return}if(document.hidden){requestAnimationFrame(Ao);return}const e=n/1e3,t=qe?.themeAmount??(Be.colorTheme==="dark"?1:0);n0(t),Vt?.setTheme(t);const i=Fe==="boot"&&Si?U2(ma??e-hr):void 0;!Vt?.isOpen&&(!i||i.time>=21.9)&&qe?.update(e,i),Vt?.update(e),_i==="closing"&&qe?.presentationHidden&&H2(),qe&&Fe==="detail"&&(_r.update(e,qe.decryptionFrame,!Qe("documentReveal")),$("#detail-content").style.opacity=String(qe.detailVisibility),$("#detail-content").style.translate=`0 ${(1-qe.detailVisibility)*18}px`,$("#detail-content").inert=qe.detailVisibility<.1,Oo&&qe.detailVisibility>=.1&&!ot&&!Vt?.isOpen&&($("#detail-content").focus({preventScroll:!0}),Oo=!1)),$("#stage").style.setProperty("--detail-shade",String(Fe==="boot"?0:qe?.detailVisibility??0));const s=qe;s&&O2.render(s.decryptionFrame,(r,a)=>s.projectCard(r,a),!!i,Qe("modelDecryption")),Math.floor(e)!==Lf&&(Lf=Math.floor(e),u0(new Date,Qe("rollingNumbers"))),rc++,n-ac>1e3&&(bh=rc*1e3/(n-ac),ac=n,rc=0,$("#three-scene").dataset.fps=String(Math.round(bh)),$("#three-scene").dataset.renderStats=JSON.stringify(qe?.getStats()??{loaded:!1,drawCalls:0,triangles:0})),requestAnimationFrame(Ao)}function F2(n,e){n.select(gt,void 0),n.onSelect=(t,i)=>{Fe!=="archive"||ot||Vt?.isOpen||Fn(t,i?{cell:i}:void 0)},n.onNavigate=(t,i)=>{Fe!=="archive"||ot||Vt?.isOpen||(t==="lane"?aa(i):ko(i))},n.onHover=t=>{const i=$("#hover-label");if(t===null){i.hidden=!0,$s.finish(),vo.finish();return}const s=Qe("rollingText")&&Fe==="archive",r=Qe("rollingNumbers")&&Fe==="archive";$s.update({value:Number(vt[t].id.slice(2)),animated:!i.hidden&&r}),vo.update({text:vt[t].title,animated:!i.hidden&&s}),i.hidden=!1,$s.update({animated:r}),vo.update({animated:s})}}function B2(){$("#stage").dataset.threeState=_i;const n=document.querySelector('[data-action="toggle-three"]');n&&(n.textContent=_i==="loading"?"3D 载入中…":_i==="closing"?"3D 关闭中…":_i==="off"?"3D 关闭":"3D 开启",n.disabled=_i==="loading",n.setAttribute("aria-pressed",String(_i==="on")),n.title=_i==="off"?"重新载入三维模型":_i==="closing"?"取消关闭，恢复三维画面":"卸载三维模型，保留 2D 界面")}function H2(){qe&&({...qe.getStats().selectedCell},Vt?.dispose(),Vt=void 0,qe.dispose(),qe=void 0,Fe==="detail"&&($("#detail-content").style.opacity="1",$("#detail-content").style.translate="0 0",$("#detail-content").inert=!1,_r.reset($("#detail-content"),!0)),_i="off",B2(),$("#hover-label").hidden=!0,delete $("#three-scene").dataset.renderQuality,$o())}async function k2(){}function If(n){console.error(n);try{qe?.dispose()}catch{}qe=void 0,_i="off",$("#stage").dataset.threeState="off",$("#three-scene").replaceChildren(),d2($("#three-scene"))}async function V2(){try{if(!hl||bu()?.properties.load3donstartup?.value!==!1)try{qe=new sb($("#three-scene")),qe.setTheme(Be.colorTheme==="dark",!0),qe.setArchiveCoverage(bu()?.properties.archivecoverage?.value==="extra")}catch(n){If(n)}await Promise.all([qe?.load().catch(If),l2(),document.fonts.load("300 20px MiSans","ACCESS WELCOME TO INTERNAL DATABASE"),document.fonts.load("400 20px MiSans","身份信息确认请求已接收开始处理权限验证通过欢迎访问莱茵生命内部资料档案编号保密级别商业区选择档案：0123456789 JOYCE MOORE"),document.fonts.load("600 20px MiSans","SYNTHESIZE INFORMATION ANALYSIS OS"),document.fonts.load("700 20px MiSans","RHINE LAB WELCOME TO INTERNAL DATABASE")]),qe&&F2(qe),In(),Si=!0,Fn(0),sa?sa.ready():M0(!1)}catch(n){console.error(n),$("#loading").innerHTML='<div class="error-state"><strong>CONNECTION INTERRUPTED</strong><p>三维档案资源未能载入。请确认浏览器已启用硬件加速，然后重新连接。</p><button onclick="location.reload()">RECONNECT →</button></div>'}}function M0(n){if(fs||!Si)return;fs=!0,n&&(Be.sound=!1,Be.music=!1,Ko()),st.releaseEntry(),st.restartBoot();const e=Qe("boot")?600:0;hr=performance.now()/1e3-(ri.has("time")?Number(ri.get("time")):1.76),ri.has("time")||(hr+=e/1e3),Zt("boot"),(ri.get("scene")==="archive"||!Qe("boot")&&!ri.has("time"))&&Zt("archive"),ri.get("scene")==="detail"&&Zt("detail"),$("#stage").inert=!1,$(".mobile-entry").inert=!1,Xs.classList.add("loaded"),Xs.inert=!0,setTimeout(()=>{const t=Xs.contains(document.activeElement)||document.activeElement===document.body;if(Xs.remove(),sa&&t){const i=$("#skip");(Fe==="boot"?i.getClientRects().length?i:$(".mobile-entry"):$(".read-file")).focus({preventScroll:!0})}},e),requestAnimationFrame(Ao),setTimeout(()=>{Gf(Jo)},1500)}su();V2();Eb();const z2={keyboard:"<kbd>←</kbd> <kbd>→</kbd> 切换列 <span>／</span> <kbd>↑</kbd> <kbd>↓</kbd> 前后档案 <span>／</span> <kbd>ENTER</kbd> 读取",gamepad:"<kbd>LS</kbd> <kbd>DP</kbd> 切换列 / 前后档案 <span>／</span> <kbd>A</kbd> 读取"};Zp(n=>{const e=document.querySelector(".archive-hint");e&&(e.innerHTML=z2[n])});Object.assign(window,{rhine:{playBootPreview:async(n=!1)=>{if(!Si||!navigator.userActivation.isActive)return!1;const e=++Ah;Bo=!0,st.configure({...Be,sound:!0,music:n});const t=await st.unlock();return e!==Ah?!1:t?(_h(!0),!0):(Bo=!1,Qo(),!1)},seek:n=>{Zt("boot"),hr=performance.now()/1e3-n,No=""},archive:()=>Zt("archive"),detail:()=>oa(),select:n=>Fn(n),stats:()=>({...qe?.getStats(),threeState:_i,fps:Math.round(bh),mode:Fe,ready:Si,startup:fs?"started":sa?.phase??"loading",motion:{reduced:c0(),preset:Be.motionPreset},bootTime:Fe==="boot"?fs?(ma??performance.now()/1e3-hr)+5:6.76:null,selected:vt[gt].id,saved:[...si],audio:st.stats(),wallpaper:null})}});
