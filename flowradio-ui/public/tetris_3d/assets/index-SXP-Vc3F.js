(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function Qg(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var ch={exports:{}},wo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ox;function XS(){if(Ox)return wo;Ox=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:o,type:s,key:h,ref:l!==void 0?l:null,props:c}}return wo.Fragment=e,wo.jsx=i,wo.jsxs=i,wo}var Px;function WS(){return Px||(Px=1,ch.exports=XS()),ch.exports}var Z=WS(),uh={exports:{}},rt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zx;function qS(){if(zx)return rt;zx=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),_=Symbol.iterator;function M(O){return O===null||typeof O!="object"?null:(O=_&&O[_]||O["@@iterator"],typeof O=="function"?O:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,y={};function v(O,re,Me){this.props=O,this.context=re,this.refs=y,this.updater=Me||b}v.prototype.isReactComponent={},v.prototype.setState=function(O,re){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,re,"setState")},v.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function N(){}N.prototype=v.prototype;function D(O,re,Me){this.props=O,this.context=re,this.refs=y,this.updater=Me||b}var P=D.prototype=new N;P.constructor=D,T(P,v.prototype),P.isPureReactComponent=!0;var V=Array.isArray;function L(){}var B={H:null,A:null,T:null,S:null},ne=Object.prototype.hasOwnProperty;function w(O,re,Me){var Te=Me.ref;return{$$typeof:o,type:O,key:re,ref:Te!==void 0?Te:null,props:Me}}function C(O,re){return w(O.type,re,O.props)}function k(O){return typeof O=="object"&&O!==null&&O.$$typeof===o}function ie(O){var re={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(Me){return re[Me]})}var ce=/\/+/g;function xe(O,re){return typeof O=="object"&&O!==null&&O.key!=null?ie(""+O.key):re.toString(36)}function he(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(L,L):(O.status="pending",O.then(function(re){O.status==="pending"&&(O.status="fulfilled",O.value=re)},function(re){O.status==="pending"&&(O.status="rejected",O.reason=re)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function F(O,re,Me,Te,Pe){var ae=typeof O;(ae==="undefined"||ae==="boolean")&&(O=null);var ue=!1;if(O===null)ue=!0;else switch(ae){case"bigint":case"string":case"number":ue=!0;break;case"object":switch(O.$$typeof){case o:case e:ue=!0;break;case g:return ue=O._init,F(ue(O._payload),re,Me,Te,Pe)}}if(ue)return Pe=Pe(O),ue=Te===""?"."+xe(O,0):Te,V(Pe)?(Me="",ue!=null&&(Me=ue.replace(ce,"$&/")+"/"),F(Pe,re,Me,"",function(Xe){return Xe})):Pe!=null&&(k(Pe)&&(Pe=C(Pe,Me+(Pe.key==null||O&&O.key===Pe.key?"":(""+Pe.key).replace(ce,"$&/")+"/")+ue)),re.push(Pe)),1;ue=0;var we=Te===""?".":Te+":";if(V(O))for(var He=0;He<O.length;He++)Te=O[He],ae=we+xe(Te,He),ue+=F(Te,re,Me,ae,Pe);else if(He=M(O),typeof He=="function")for(O=He.call(O),He=0;!(Te=O.next()).done;)Te=Te.value,ae=we+xe(Te,He++),ue+=F(Te,re,Me,ae,Pe);else if(ae==="object"){if(typeof O.then=="function")return F(he(O),re,Me,Te,Pe);throw re=String(O),Error("Objects are not valid as a React child (found: "+(re==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":re)+"). If you meant to render a collection of children, use an array instead.")}return ue}function j(O,re,Me){if(O==null)return O;var Te=[],Pe=0;return F(O,Te,"","",function(ae){return re.call(Me,ae,Pe++)}),Te}function Y(O){if(O._status===-1){var re=O._result;re=re(),re.then(function(Me){(O._status===0||O._status===-1)&&(O._status=1,O._result=Me)},function(Me){(O._status===0||O._status===-1)&&(O._status=2,O._result=Me)}),O._status===-1&&(O._status=0,O._result=re)}if(O._status===1)return O._result.default;throw O._result}var _e=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var re=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(re))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},ve={map:j,forEach:function(O,re,Me){j(O,function(){re.apply(this,arguments)},Me)},count:function(O){var re=0;return j(O,function(){re++}),re},toArray:function(O){return j(O,function(re){return re})||[]},only:function(O){if(!k(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return rt.Activity=x,rt.Children=ve,rt.Component=v,rt.Fragment=i,rt.Profiler=l,rt.PureComponent=D,rt.StrictMode=s,rt.Suspense=m,rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,rt.__COMPILER_RUNTIME={__proto__:null,c:function(O){return B.H.useMemoCache(O)}},rt.cache=function(O){return function(){return O.apply(null,arguments)}},rt.cacheSignal=function(){return null},rt.cloneElement=function(O,re,Me){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var Te=T({},O.props),Pe=O.key;if(re!=null)for(ae in re.key!==void 0&&(Pe=""+re.key),re)!ne.call(re,ae)||ae==="key"||ae==="__self"||ae==="__source"||ae==="ref"&&re.ref===void 0||(Te[ae]=re[ae]);var ae=arguments.length-2;if(ae===1)Te.children=Me;else if(1<ae){for(var ue=Array(ae),we=0;we<ae;we++)ue[we]=arguments[we+2];Te.children=ue}return w(O.type,Pe,Te)},rt.createContext=function(O){return O={$$typeof:h,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:c,_context:O},O},rt.createElement=function(O,re,Me){var Te,Pe={},ae=null;if(re!=null)for(Te in re.key!==void 0&&(ae=""+re.key),re)ne.call(re,Te)&&Te!=="key"&&Te!=="__self"&&Te!=="__source"&&(Pe[Te]=re[Te]);var ue=arguments.length-2;if(ue===1)Pe.children=Me;else if(1<ue){for(var we=Array(ue),He=0;He<ue;He++)we[He]=arguments[He+2];Pe.children=we}if(O&&O.defaultProps)for(Te in ue=O.defaultProps,ue)Pe[Te]===void 0&&(Pe[Te]=ue[Te]);return w(O,ae,Pe)},rt.createRef=function(){return{current:null}},rt.forwardRef=function(O){return{$$typeof:d,render:O}},rt.isValidElement=k,rt.lazy=function(O){return{$$typeof:g,_payload:{_status:-1,_result:O},_init:Y}},rt.memo=function(O,re){return{$$typeof:p,type:O,compare:re===void 0?null:re}},rt.startTransition=function(O){var re=B.T,Me={};B.T=Me;try{var Te=O(),Pe=B.S;Pe!==null&&Pe(Me,Te),typeof Te=="object"&&Te!==null&&typeof Te.then=="function"&&Te.then(L,_e)}catch(ae){_e(ae)}finally{re!==null&&Me.types!==null&&(re.types=Me.types),B.T=re}},rt.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},rt.use=function(O){return B.H.use(O)},rt.useActionState=function(O,re,Me){return B.H.useActionState(O,re,Me)},rt.useCallback=function(O,re){return B.H.useCallback(O,re)},rt.useContext=function(O){return B.H.useContext(O)},rt.useDebugValue=function(){},rt.useDeferredValue=function(O,re){return B.H.useDeferredValue(O,re)},rt.useEffect=function(O,re){return B.H.useEffect(O,re)},rt.useEffectEvent=function(O){return B.H.useEffectEvent(O)},rt.useId=function(){return B.H.useId()},rt.useImperativeHandle=function(O,re,Me){return B.H.useImperativeHandle(O,re,Me)},rt.useInsertionEffect=function(O,re){return B.H.useInsertionEffect(O,re)},rt.useLayoutEffect=function(O,re){return B.H.useLayoutEffect(O,re)},rt.useMemo=function(O,re){return B.H.useMemo(O,re)},rt.useOptimistic=function(O,re){return B.H.useOptimistic(O,re)},rt.useReducer=function(O,re,Me){return B.H.useReducer(O,re,Me)},rt.useRef=function(O){return B.H.useRef(O)},rt.useState=function(O){return B.H.useState(O)},rt.useSyncExternalStore=function(O,re,Me){return B.H.useSyncExternalStore(O,re,Me)},rt.useTransition=function(){return B.H.useTransition()},rt.version="19.2.1",rt}var Bx;function Bd(){return Bx||(Bx=1,uh.exports=qS()),uh.exports}var hn=Bd();const Jg=Qg(hn);var fh={exports:{}},Do={},hh={exports:{}},dh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fx;function YS(){return Fx||(Fx=1,(function(o){function e(F,j){var Y=F.length;F.push(j);e:for(;0<Y;){var _e=Y-1>>>1,ve=F[_e];if(0<l(ve,j))F[_e]=j,F[Y]=ve,Y=_e;else break e}}function i(F){return F.length===0?null:F[0]}function s(F){if(F.length===0)return null;var j=F[0],Y=F.pop();if(Y!==j){F[0]=Y;e:for(var _e=0,ve=F.length,O=ve>>>1;_e<O;){var re=2*(_e+1)-1,Me=F[re],Te=re+1,Pe=F[Te];if(0>l(Me,Y))Te<ve&&0>l(Pe,Me)?(F[_e]=Pe,F[Te]=Y,_e=Te):(F[_e]=Me,F[re]=Y,_e=re);else if(Te<ve&&0>l(Pe,Y))F[_e]=Pe,F[Te]=Y,_e=Te;else break e}}return j}function l(F,j){var Y=F.sortIndex-j.sortIndex;return Y!==0?Y:F.id-j.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;o.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],p=[],g=1,x=null,_=3,M=!1,b=!1,T=!1,y=!1,v=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function P(F){for(var j=i(p);j!==null;){if(j.callback===null)s(p);else if(j.startTime<=F)s(p),j.sortIndex=j.expirationTime,e(m,j);else break;j=i(p)}}function V(F){if(T=!1,P(F),!b)if(i(m)!==null)b=!0,L||(L=!0,ie());else{var j=i(p);j!==null&&he(V,j.startTime-F)}}var L=!1,B=-1,ne=5,w=-1;function C(){return y?!0:!(o.unstable_now()-w<ne)}function k(){if(y=!1,L){var F=o.unstable_now();w=F;var j=!0;try{e:{b=!1,T&&(T=!1,N(B),B=-1),M=!0;var Y=_;try{t:{for(P(F),x=i(m);x!==null&&!(x.expirationTime>F&&C());){var _e=x.callback;if(typeof _e=="function"){x.callback=null,_=x.priorityLevel;var ve=_e(x.expirationTime<=F);if(F=o.unstable_now(),typeof ve=="function"){x.callback=ve,P(F),j=!0;break t}x===i(m)&&s(m),P(F)}else s(m);x=i(m)}if(x!==null)j=!0;else{var O=i(p);O!==null&&he(V,O.startTime-F),j=!1}}break e}finally{x=null,_=Y,M=!1}j=void 0}}finally{j?ie():L=!1}}}var ie;if(typeof D=="function")ie=function(){D(k)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,xe=ce.port2;ce.port1.onmessage=k,ie=function(){xe.postMessage(null)}}else ie=function(){v(k,0)};function he(F,j){B=v(function(){F(o.unstable_now())},j)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(F){F.callback=null},o.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ne=0<F?Math.floor(1e3/F):5},o.unstable_getCurrentPriorityLevel=function(){return _},o.unstable_next=function(F){switch(_){case 1:case 2:case 3:var j=3;break;default:j=_}var Y=_;_=j;try{return F()}finally{_=Y}},o.unstable_requestPaint=function(){y=!0},o.unstable_runWithPriority=function(F,j){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var Y=_;_=F;try{return j()}finally{_=Y}},o.unstable_scheduleCallback=function(F,j,Y){var _e=o.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?_e+Y:_e):Y=_e,F){case 1:var ve=-1;break;case 2:ve=250;break;case 5:ve=1073741823;break;case 4:ve=1e4;break;default:ve=5e3}return ve=Y+ve,F={id:g++,callback:j,priorityLevel:F,startTime:Y,expirationTime:ve,sortIndex:-1},Y>_e?(F.sortIndex=Y,e(p,F),i(m)===null&&F===i(p)&&(T?(N(B),B=-1):T=!0,he(V,Y-_e))):(F.sortIndex=ve,e(m,F),b||M||(b=!0,L||(L=!0,ie()))),F},o.unstable_shouldYield=C,o.unstable_wrapCallback=function(F){var j=_;return function(){var Y=_;_=j;try{return F.apply(this,arguments)}finally{_=Y}}}})(dh)),dh}var Ix;function jS(){return Ix||(Ix=1,hh.exports=YS()),hh.exports}var ph={exports:{}},wn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hx;function ZS(){if(Hx)return wn;Hx=1;var o=Bd();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:m,containerInfo:p,implementation:g}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return wn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,wn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,g)},wn.flushSync=function(m){var p=h.T,g=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=g,s.d.f()}},wn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},wn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},wn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,x=d(g,p.crossOrigin),_=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:_,fetchPriority:M}):g==="script"&&s.d.X(m,{crossOrigin:x,integrity:_,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},wn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},wn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,x=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},wn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},wn.requestFormReset=function(m){s.d.r(m)},wn.unstable_batchedUpdates=function(m,p){return m(p)},wn.useFormState=function(m,p,g){return h.H.useFormState(m,p,g)},wn.useFormStatus=function(){return h.H.useHostTransitionStatus()},wn.version="19.2.1",wn}var Gx;function KS(){if(Gx)return ph.exports;Gx=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),ph.exports=ZS(),ph.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vx;function QS(){if(Vx)return Do;Vx=1;var o=jS(),e=Bd(),i=KS();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(r=u.return,r!==null){a=r;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),t;if(f===r)return m(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==r.return)a=u,r=f;else{for(var S=!1,A=u.child;A;){if(A===a){S=!0,a=u,r=f;break}if(A===r){S=!0,r=u,a=f;break}A=A.sibling}if(!S){for(A=f.child;A;){if(A===a){S=!0,a=f,r=u;break}if(A===r){S=!0,r=f,a=u;break}A=A.sibling}if(!S)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function g(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=g(t),n!==null)return n;t=t.sibling}return null}var x=Object.assign,_=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),D=Symbol.for("react.context"),P=Symbol.for("react.forward_ref"),V=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),ne=Symbol.for("react.lazy"),w=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function ie(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var ce=Symbol.for("react.client.reference");function xe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ce?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case T:return"Fragment";case v:return"Profiler";case y:return"StrictMode";case V:return"Suspense";case L:return"SuspenseList";case w:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case b:return"Portal";case D:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case P:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:xe(t.type)||"Memo";case ne:n=t._payload,t=t._init;try{return xe(t(n))}catch{}}return null}var he=Array.isArray,F=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y={pending:!1,data:null,method:null,action:null},_e=[],ve=-1;function O(t){return{current:t}}function re(t){0>ve||(t.current=_e[ve],_e[ve]=null,ve--)}function Me(t,n){ve++,_e[ve]=t.current,t.current=n}var Te=O(null),Pe=O(null),ae=O(null),ue=O(null);function we(t,n){switch(Me(ae,n),Me(Pe,t),Me(Te,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?ix(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=ix(n),t=ax(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}re(Te),Me(Te,t)}function He(){re(Te),re(Pe),re(ae)}function Xe(t){t.memoizedState!==null&&Me(ue,t);var n=Te.current,a=ax(n,t.type);n!==a&&(Me(Pe,t),Me(Te,a))}function ut(t){Pe.current===t&&(re(Te),re(Pe)),ue.current===t&&(re(ue),To._currentValue=Y)}var tn,pt;function Ct(t){if(tn===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);tn=n&&n[1]||"",pt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+tn+t+pt}var I=!1;function mt(t,n){if(!t||I)return"";I=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var me=function(){throw Error()};if(Object.defineProperty(me.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(me,[])}catch(oe){var te=oe}Reflect.construct(t,[],me)}else{try{me.call()}catch(oe){te=oe}t.call(me.prototype)}}else{try{throw Error()}catch(oe){te=oe}(me=t())&&typeof me.catch=="function"&&me.catch(function(){})}}catch(oe){if(oe&&te&&typeof oe.stack=="string")return[oe.stack,te.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=r.DetermineComponentFrameRoot(),S=f[0],A=f[1];if(S&&A){var z=S.split(`
`),$=A.split(`
`);for(u=r=0;r<z.length&&!z[r].includes("DetermineComponentFrameRoot");)r++;for(;u<$.length&&!$[u].includes("DetermineComponentFrameRoot");)u++;if(r===z.length||u===$.length)for(r=z.length-1,u=$.length-1;1<=r&&0<=u&&z[r]!==$[u];)u--;for(;1<=r&&0<=u;r--,u--)if(z[r]!==$[u]){if(r!==1||u!==1)do if(r--,u--,0>u||z[r]!==$[u]){var fe=`
`+z[r].replace(" at new "," at ");return t.displayName&&fe.includes("<anonymous>")&&(fe=fe.replace("<anonymous>",t.displayName)),fe}while(1<=r&&0<=u);break}}}finally{I=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Ct(a):""}function gt(t,n){switch(t.tag){case 26:case 27:case 5:return Ct(t.type);case 16:return Ct("Lazy");case 13:return t.child!==n&&n!==null?Ct("Suspense Fallback"):Ct("Suspense");case 19:return Ct("SuspenseList");case 0:case 15:return mt(t.type,!1);case 11:return mt(t.type.render,!1);case 1:return mt(t.type,!0);case 31:return Ct("Activity");default:return""}}function Pt(t){try{var n="",a=null;do n+=gt(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Ge=Object.prototype.hasOwnProperty,Xt=o.unstable_scheduleCallback,je=o.unstable_cancelCallback,at=o.unstable_shouldYield,U=o.unstable_requestPaint,E=o.unstable_now,J=o.unstable_getCurrentPriorityLevel,pe=o.unstable_ImmediatePriority,Se=o.unstable_UserBlockingPriority,le=o.unstable_NormalPriority,qe=o.unstable_LowPriority,Ne=o.unstable_IdlePriority,Qe=o.log,We=o.unstable_setDisableYieldValue,ye=null,Ee=null;function Ye(t){if(typeof Qe=="function"&&We(t),Ee&&typeof Ee.setStrictMode=="function")try{Ee.setStrictMode(ye,t)}catch{}}var Ve=Math.clz32?Math.clz32:H,Oe=Math.log,nt=Math.LN2;function H(t){return t>>>=0,t===0?32:31-(Oe(t)/nt|0)|0}var De=256,Re=262144,Ce=4194304;function be(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ge(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var u=0,f=t.suspendedLanes,S=t.pingedLanes;t=t.warmLanes;var A=r&134217727;return A!==0?(r=A&~f,r!==0?u=be(r):(S&=A,S!==0?u=be(S):a||(a=A&~t,a!==0&&(u=be(a))))):(A=r&~f,A!==0?u=be(A):S!==0?u=be(S):a||(a=r&~t,a!==0&&(u=be(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Be(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function it(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function It(){var t=Ce;return Ce<<=1,(Ce&62914560)===0&&(Ce=4194304),t}function wt(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Cn(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Yn(t,n,a,r,u,f){var S=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var A=t.entanglements,z=t.expirationTimes,$=t.hiddenUpdates;for(a=S&~a;0<a;){var fe=31-Ve(a),me=1<<fe;A[fe]=0,z[fe]=-1;var te=$[fe];if(te!==null)for($[fe]=null,fe=0;fe<te.length;fe++){var oe=te[fe];oe!==null&&(oe.lane&=-536870913)}a&=~me}r!==0&&Jo(t,r,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(S&~n))}function Jo(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-Ve(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function zr(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-Ve(a),u=1<<r;u&n|t[r]&n&&(t[r]|=n),a&=~u}}function Br(t,n){var a=n&-n;return a=(a&42)!==0?1:vi(a),(a&(t.suspendedLanes|n))!==0?0:a}function vi(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ts(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Fr(){var t=j.p;return t!==0?t:(t=window.event,t===void 0?32:Rx(t.type))}function Ir(t,n){var a=j.p;try{return j.p=t,n()}finally{j.p=a}}var jn=Math.random().toString(36).slice(2),rn="__reactFiber$"+jn,dn="__reactProps$"+jn,Hi="__reactContainer$"+jn,Ns="__reactEvents$"+jn,nu="__reactListeners$"+jn,iu="__reactHandles$"+jn,$o="__reactResources$"+jn,ns="__reactMarker$"+jn;function Hr(t){delete t[rn],delete t[dn],delete t[Ns],delete t[nu],delete t[iu]}function va(t){var n=t[rn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Hi]||a[rn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=fx(t);t!==null;){if(a=t[rn])return a;t=fx(t)}return n}t=a,a=t.parentNode}return null}function R(t){if(t=t[rn]||t[Hi]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function X(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function se(t){var n=t[$o];return n||(n=t[$o]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function ee(t){t[ns]=!0}var q=new Set,Ae={};function Ue(t,n){ze(t,n),ze(t+"Capture",n)}function ze(t,n){for(Ae[t]=n,t=0;t<n.length;t++)q.add(n[t])}var Fe=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),$e={},tt={};function Ze(t){return Ge.call(tt,t)?!0:Ge.call($e,t)?!1:Fe.test(t)?tt[t]=!0:($e[t]=!0,!1)}function ft(t,n,a){if(Ze(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function At(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Dt(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+r)}}function bt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ot(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Je(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var u=r.get,f=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(S){a=""+S,f.call(this,S)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(S){a=""+S},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Wt(t){if(!t._valueTracker){var n=Ot(t)?"checked":"value";t._valueTracker=Je(t,n,""+t[n])}}function Et(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=Ot(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}function _n(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Sa=/[\n"\\]/g;function Yt(t){return t.replace(Sa,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Gi(t,n,a,r,u,f,S,A){t.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?t.type=S:t.removeAttribute("type"),n!=null?S==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+bt(n)):t.value!==""+bt(n)&&(t.value=""+bt(n)):S!=="submit"&&S!=="reset"||t.removeAttribute("value"),n!=null?vn(t,S,bt(n)):a!=null?vn(t,S,bt(a)):r!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?t.name=""+bt(A):t.removeAttribute("name")}function jt(t,n,a,r,u,f,S,A){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Wt(t);return}a=a!=null?""+bt(a):"",n=n!=null?""+bt(n):a,A||n===t.value||(t.value=n),t.defaultValue=n}r=r??u,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=A?t.checked:!!r,t.defaultChecked=!!r,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(t.name=S),Wt(t)}function vn(t,n,a){n==="number"&&_n(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function pn(t,n,a,r){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&r&&(t[a].defaultSelected=!0)}else{for(a=""+bt(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,r&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Sn(t,n,a){if(n!=null&&(n=""+bt(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+bt(a):""}function bn(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(he(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=bt(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),Wt(t)}function Ci(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Vi=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ep(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||Vi.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function tp(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="");for(var u in n)r=n[u],n.hasOwnProperty(u)&&a[u]!==r&&ep(t,u,r)}else for(var f in n)n.hasOwnProperty(f)&&ep(t,f,n[f])}function au(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var H_=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),G_=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function el(t){return G_.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ki(){}var su=null;function ru(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ls=null,Os=null;function np(t){var n=R(t);if(n&&(t=n.stateNode)){var a=t[dn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Gi(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Yt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var u=r[dn]||null;if(!u)throw Error(s(90));Gi(r,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&Et(r)}break e;case"textarea":Sn(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&pn(t,!!a.multiple,n,!1)}}}var ou=!1;function ip(t,n,a){if(ou)return t(n,a);ou=!0;try{var r=t(n);return r}finally{if(ou=!1,(Ls!==null||Os!==null)&&(Gl(),Ls&&(n=Ls,t=Os,Os=Ls=null,np(n),t)))for(n=0;n<t.length;n++)np(t[n])}}function Gr(t,n){var a=t.stateNode;if(a===null)return null;var r=a[dn]||null;if(r===null)return null;a=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Xi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),lu=!1;if(Xi)try{var Vr={};Object.defineProperty(Vr,"passive",{get:function(){lu=!0}}),window.addEventListener("test",Vr,Vr),window.removeEventListener("test",Vr,Vr)}catch{lu=!1}var ya=null,cu=null,tl=null;function ap(){if(tl)return tl;var t,n=cu,a=n.length,r,u="value"in ya?ya.value:ya.textContent,f=u.length;for(t=0;t<a&&n[t]===u[t];t++);var S=a-t;for(r=1;r<=S&&n[a-r]===u[f-r];r++);return tl=u.slice(t,1<r?1-r:void 0)}function nl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function il(){return!0}function sp(){return!1}function Bn(t){function n(a,r,u,f,S){this._reactName=a,this._targetInst=u,this.type=r,this.nativeEvent=f,this.target=S,this.currentTarget=null;for(var A in t)t.hasOwnProperty(A)&&(a=t[A],this[A]=a?a(f):f[A]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?il:sp,this.isPropagationStopped=sp,this}return x(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=il)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=il)},persist:function(){},isPersistent:il}),n}var is={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},al=Bn(is),kr=x({},is,{view:0,detail:0}),V_=Bn(kr),uu,fu,Xr,sl=x({},kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:du,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Xr&&(Xr&&t.type==="mousemove"?(uu=t.screenX-Xr.screenX,fu=t.screenY-Xr.screenY):fu=uu=0,Xr=t),uu)},movementY:function(t){return"movementY"in t?t.movementY:fu}}),rp=Bn(sl),k_=x({},sl,{dataTransfer:0}),X_=Bn(k_),W_=x({},kr,{relatedTarget:0}),hu=Bn(W_),q_=x({},is,{animationName:0,elapsedTime:0,pseudoElement:0}),Y_=Bn(q_),j_=x({},is,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Z_=Bn(j_),K_=x({},is,{data:0}),op=Bn(K_),Q_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},J_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ev(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=$_[t])?!!n[t]:!1}function du(){return ev}var tv=x({},kr,{key:function(t){if(t.key){var n=Q_[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=nl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?J_[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:du,charCode:function(t){return t.type==="keypress"?nl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?nl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),nv=Bn(tv),iv=x({},sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lp=Bn(iv),av=x({},kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:du}),sv=Bn(av),rv=x({},is,{propertyName:0,elapsedTime:0,pseudoElement:0}),ov=Bn(rv),lv=x({},sl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),cv=Bn(lv),uv=x({},is,{newState:0,oldState:0}),fv=Bn(uv),hv=[9,13,27,32],pu=Xi&&"CompositionEvent"in window,Wr=null;Xi&&"documentMode"in document&&(Wr=document.documentMode);var dv=Xi&&"TextEvent"in window&&!Wr,cp=Xi&&(!pu||Wr&&8<Wr&&11>=Wr),up=" ",fp=!1;function hp(t,n){switch(t){case"keyup":return hv.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function dp(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ps=!1;function pv(t,n){switch(t){case"compositionend":return dp(n);case"keypress":return n.which!==32?null:(fp=!0,up);case"textInput":return t=n.data,t===up&&fp?null:t;default:return null}}function mv(t,n){if(Ps)return t==="compositionend"||!pu&&hp(t,n)?(t=ap(),tl=cu=ya=null,Ps=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return cp&&n.locale!=="ko"?null:n.data;default:return null}}var xv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pp(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!xv[t.type]:n==="textarea"}function mp(t,n,a,r){Ls?Os?Os.push(r):Os=[r]:Ls=r,n=jl(n,"onChange"),0<n.length&&(a=new al("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var qr=null,Yr=null;function gv(t){Qm(t,0)}function rl(t){var n=X(t);if(Et(n))return t}function xp(t,n){if(t==="change")return n}var gp=!1;if(Xi){var mu;if(Xi){var xu="oninput"in document;if(!xu){var _p=document.createElement("div");_p.setAttribute("oninput","return;"),xu=typeof _p.oninput=="function"}mu=xu}else mu=!1;gp=mu&&(!document.documentMode||9<document.documentMode)}function vp(){qr&&(qr.detachEvent("onpropertychange",Sp),Yr=qr=null)}function Sp(t){if(t.propertyName==="value"&&rl(Yr)){var n=[];mp(n,Yr,t,ru(t)),ip(gv,n)}}function _v(t,n,a){t==="focusin"?(vp(),qr=n,Yr=a,qr.attachEvent("onpropertychange",Sp)):t==="focusout"&&vp()}function vv(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return rl(Yr)}function Sv(t,n){if(t==="click")return rl(n)}function yv(t,n){if(t==="input"||t==="change")return rl(n)}function Mv(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Zn=typeof Object.is=="function"?Object.is:Mv;function jr(t,n){if(Zn(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var u=a[r];if(!Ge.call(n,u)||!Zn(t[u],n[u]))return!1}return!0}function yp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Mp(t,n){var a=yp(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=yp(a)}}function bp(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?bp(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Ep(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=_n(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=_n(t.document)}return n}function gu(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var bv=Xi&&"documentMode"in document&&11>=document.documentMode,zs=null,_u=null,Zr=null,vu=!1;function Tp(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;vu||zs==null||zs!==_n(r)||(r=zs,"selectionStart"in r&&gu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Zr&&jr(Zr,r)||(Zr=r,r=jl(_u,"onSelect"),0<r.length&&(n=new al("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=zs)))}function as(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Bs={animationend:as("Animation","AnimationEnd"),animationiteration:as("Animation","AnimationIteration"),animationstart:as("Animation","AnimationStart"),transitionrun:as("Transition","TransitionRun"),transitionstart:as("Transition","TransitionStart"),transitioncancel:as("Transition","TransitionCancel"),transitionend:as("Transition","TransitionEnd")},Su={},Ap={};Xi&&(Ap=document.createElement("div").style,"AnimationEvent"in window||(delete Bs.animationend.animation,delete Bs.animationiteration.animation,delete Bs.animationstart.animation),"TransitionEvent"in window||delete Bs.transitionend.transition);function ss(t){if(Su[t])return Su[t];if(!Bs[t])return t;var n=Bs[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Ap)return Su[t]=n[a];return t}var Rp=ss("animationend"),Cp=ss("animationiteration"),wp=ss("animationstart"),Ev=ss("transitionrun"),Tv=ss("transitionstart"),Av=ss("transitioncancel"),Dp=ss("transitionend"),Up=new Map,yu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");yu.push("scrollEnd");function Si(t,n){Up.set(t,n),Ue(n,[t])}var ol=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ri=[],Fs=0,Mu=0;function ll(){for(var t=Fs,n=Mu=Fs=0;n<t;){var a=ri[n];ri[n++]=null;var r=ri[n];ri[n++]=null;var u=ri[n];ri[n++]=null;var f=ri[n];if(ri[n++]=null,r!==null&&u!==null){var S=r.pending;S===null?u.next=u:(u.next=S.next,S.next=u),r.pending=u}f!==0&&Np(a,u,f)}}function cl(t,n,a,r){ri[Fs++]=t,ri[Fs++]=n,ri[Fs++]=a,ri[Fs++]=r,Mu|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function bu(t,n,a,r){return cl(t,n,a,r),ul(t)}function rs(t,n){return cl(t,null,null,n),ul(t)}function Np(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var u=!1,f=t.return;f!==null;)f.childLanes|=a,r=f.alternate,r!==null&&(r.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-Ve(a),t=f.hiddenUpdates,r=t[u],r===null?t[u]=[n]:r.push(n),n.lane=a|536870912),f):null}function ul(t){if(50<_o)throw _o=0,Lf=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Is={};function Rv(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kn(t,n,a,r){return new Rv(t,n,a,r)}function Eu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Wi(t,n){var a=t.alternate;return a===null?(a=Kn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Lp(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function fl(t,n,a,r,u,f){var S=0;if(r=t,typeof t=="function")Eu(t)&&(S=1);else if(typeof t=="string")S=NS(t,a,Te.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case w:return t=Kn(31,a,n,u),t.elementType=w,t.lanes=f,t;case T:return os(a.children,u,f,n);case y:S=8,u|=24;break;case v:return t=Kn(12,a,n,u|2),t.elementType=v,t.lanes=f,t;case V:return t=Kn(13,a,n,u),t.elementType=V,t.lanes=f,t;case L:return t=Kn(19,a,n,u),t.elementType=L,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case D:S=10;break e;case N:S=9;break e;case P:S=11;break e;case B:S=14;break e;case ne:S=16,r=null;break e}S=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=Kn(S,a,n,u),n.elementType=t,n.type=r,n.lanes=f,n}function os(t,n,a,r){return t=Kn(7,t,r,n),t.lanes=a,t}function Tu(t,n,a){return t=Kn(6,t,null,n),t.lanes=a,t}function Op(t){var n=Kn(18,null,null,0);return n.stateNode=t,n}function Au(t,n,a){return n=Kn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Pp=new WeakMap;function oi(t,n){if(typeof t=="object"&&t!==null){var a=Pp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Pt(n)},Pp.set(t,n),n)}return{value:t,source:n,stack:Pt(n)}}var Hs=[],Gs=0,hl=null,Kr=0,li=[],ci=0,Ma=null,wi=1,Di="";function qi(t,n){Hs[Gs++]=Kr,Hs[Gs++]=hl,hl=t,Kr=n}function zp(t,n,a){li[ci++]=wi,li[ci++]=Di,li[ci++]=Ma,Ma=t;var r=wi;t=Di;var u=32-Ve(r)-1;r&=~(1<<u),a+=1;var f=32-Ve(n)+u;if(30<f){var S=u-u%5;f=(r&(1<<S)-1).toString(32),r>>=S,u-=S,wi=1<<32-Ve(n)+u|a<<u|r,Di=f+t}else wi=1<<f|a<<u|r,Di=t}function Ru(t){t.return!==null&&(qi(t,1),zp(t,1,0))}function Cu(t){for(;t===hl;)hl=Hs[--Gs],Hs[Gs]=null,Kr=Hs[--Gs],Hs[Gs]=null;for(;t===Ma;)Ma=li[--ci],li[ci]=null,Di=li[--ci],li[ci]=null,wi=li[--ci],li[ci]=null}function Bp(t,n){li[ci++]=wi,li[ci++]=Di,li[ci++]=Ma,wi=n.id,Di=n.overflow,Ma=t}var En=null,Zt=null,Tt=!1,ba=null,ui=!1,wu=Error(s(519));function Ea(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Qr(oi(n,t)),wu}function Fp(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[rn]=t,n[dn]=r,a){case"dialog":vt("cancel",n),vt("close",n);break;case"iframe":case"object":case"embed":vt("load",n);break;case"video":case"audio":for(a=0;a<So.length;a++)vt(So[a],n);break;case"source":vt("error",n);break;case"img":case"image":case"link":vt("error",n),vt("load",n);break;case"details":vt("toggle",n);break;case"input":vt("invalid",n),jt(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":vt("invalid",n);break;case"textarea":vt("invalid",n),bn(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||tx(n.textContent,a)?(r.popover!=null&&(vt("beforetoggle",n),vt("toggle",n)),r.onScroll!=null&&vt("scroll",n),r.onScrollEnd!=null&&vt("scrollend",n),r.onClick!=null&&(n.onclick=ki),n=!0):n=!1,n||Ea(t,!0)}function Ip(t){for(En=t.return;En;)switch(En.tag){case 5:case 31:case 13:ui=!1;return;case 27:case 3:ui=!0;return;default:En=En.return}}function Vs(t){if(t!==En)return!1;if(!Tt)return Ip(t),Tt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||jf(t.type,t.memoizedProps)),a=!a),a&&Zt&&Ea(t),Ip(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Zt=ux(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Zt=ux(t)}else n===27?(n=Zt,Fa(t.type)?(t=$f,$f=null,Zt=t):Zt=n):Zt=En?hi(t.stateNode.nextSibling):null;return!0}function ls(){Zt=En=null,Tt=!1}function Du(){var t=ba;return t!==null&&(Gn===null?Gn=t:Gn.push.apply(Gn,t),ba=null),t}function Qr(t){ba===null?ba=[t]:ba.push(t)}var Uu=O(null),cs=null,Yi=null;function Ta(t,n,a){Me(Uu,n._currentValue),n._currentValue=a}function ji(t){t._currentValue=Uu.current,re(Uu)}function Nu(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function Lu(t,n,a,r){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var S=u.child;f=f.firstContext;e:for(;f!==null;){var A=f;f=u;for(var z=0;z<n.length;z++)if(A.context===n[z]){f.lanes|=a,A=f.alternate,A!==null&&(A.lanes|=a),Nu(f.return,a,t),r||(S=null);break e}f=A.next}}else if(u.tag===18){if(S=u.return,S===null)throw Error(s(341));S.lanes|=a,f=S.alternate,f!==null&&(f.lanes|=a),Nu(S,a,t),S=null}else S=u.child;if(S!==null)S.return=u;else for(S=u;S!==null;){if(S===t){S=null;break}if(u=S.sibling,u!==null){u.return=S.return,S=u;break}S=S.return}u=S}}function ks(t,n,a,r){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var S=u.alternate;if(S===null)throw Error(s(387));if(S=S.memoizedProps,S!==null){var A=u.type;Zn(u.pendingProps.value,S.value)||(t!==null?t.push(A):t=[A])}}else if(u===ue.current){if(S=u.alternate,S===null)throw Error(s(387));S.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(To):t=[To])}u=u.return}t!==null&&Lu(n,t,a,r),n.flags|=262144}function dl(t){for(t=t.firstContext;t!==null;){if(!Zn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function us(t){cs=t,Yi=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Tn(t){return Hp(cs,t)}function pl(t,n){return cs===null&&us(t),Hp(t,n)}function Hp(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Yi===null){if(t===null)throw Error(s(308));Yi=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Yi=Yi.next=n;return a}var Cv=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},wv=o.unstable_scheduleCallback,Dv=o.unstable_NormalPriority,on={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ou(){return{controller:new Cv,data:new Map,refCount:0}}function Jr(t){t.refCount--,t.refCount===0&&wv(Dv,function(){t.controller.abort()})}var $r=null,Pu=0,Xs=0,Ws=null;function Uv(t,n){if($r===null){var a=$r=[];Pu=0,Xs=If(),Ws={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Pu++,n.then(Gp,Gp),n}function Gp(){if(--Pu===0&&$r!==null){Ws!==null&&(Ws.status="fulfilled");var t=$r;$r=null,Xs=0,Ws=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Nv(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(r.status="rejected",r.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),r}var Vp=F.S;F.S=function(t,n){Tm=E(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Uv(t,n),Vp!==null&&Vp(t,n)};var fs=O(null);function zu(){var t=fs.current;return t!==null?t:qt.pooledCache}function ml(t,n){n===null?Me(fs,fs.current):Me(fs,n.pool)}function kp(){var t=zu();return t===null?null:{parent:on._currentValue,pool:t}}var qs=Error(s(460)),Bu=Error(s(474)),xl=Error(s(542)),gl={then:function(){}};function Xp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Wp(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(ki,ki),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Yp(t),t;default:if(typeof n.status=="string")n.then(ki,ki);else{if(t=qt,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=r}},function(r){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Yp(t),t}throw ds=n,qs}}function hs(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ds=a,qs):a}}var ds=null;function qp(){if(ds===null)throw Error(s(459));var t=ds;return ds=null,t}function Yp(t){if(t===qs||t===xl)throw Error(s(483))}var Ys=null,eo=0;function _l(t){var n=eo;return eo+=1,Ys===null&&(Ys=[]),Wp(Ys,t,n)}function to(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function vl(t,n){throw n.$$typeof===_?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function jp(t){function n(W,G){if(t){var Q=W.deletions;Q===null?(W.deletions=[G],W.flags|=16):Q.push(G)}}function a(W,G){if(!t)return null;for(;G!==null;)n(W,G),G=G.sibling;return null}function r(W){for(var G=new Map;W!==null;)W.key!==null?G.set(W.key,W):G.set(W.index,W),W=W.sibling;return G}function u(W,G){return W=Wi(W,G),W.index=0,W.sibling=null,W}function f(W,G,Q){return W.index=Q,t?(Q=W.alternate,Q!==null?(Q=Q.index,Q<G?(W.flags|=67108866,G):Q):(W.flags|=67108866,G)):(W.flags|=1048576,G)}function S(W){return t&&W.alternate===null&&(W.flags|=67108866),W}function A(W,G,Q,de){return G===null||G.tag!==6?(G=Tu(Q,W.mode,de),G.return=W,G):(G=u(G,Q),G.return=W,G)}function z(W,G,Q,de){var Ke=Q.type;return Ke===T?fe(W,G,Q.props.children,de,Q.key):G!==null&&(G.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===ne&&hs(Ke)===G.type)?(G=u(G,Q.props),to(G,Q),G.return=W,G):(G=fl(Q.type,Q.key,Q.props,null,W.mode,de),to(G,Q),G.return=W,G)}function $(W,G,Q,de){return G===null||G.tag!==4||G.stateNode.containerInfo!==Q.containerInfo||G.stateNode.implementation!==Q.implementation?(G=Au(Q,W.mode,de),G.return=W,G):(G=u(G,Q.children||[]),G.return=W,G)}function fe(W,G,Q,de,Ke){return G===null||G.tag!==7?(G=os(Q,W.mode,de,Ke),G.return=W,G):(G=u(G,Q),G.return=W,G)}function me(W,G,Q){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=Tu(""+G,W.mode,Q),G.return=W,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return Q=fl(G.type,G.key,G.props,null,W.mode,Q),to(Q,G),Q.return=W,Q;case b:return G=Au(G,W.mode,Q),G.return=W,G;case ne:return G=hs(G),me(W,G,Q)}if(he(G)||ie(G))return G=os(G,W.mode,Q,null),G.return=W,G;if(typeof G.then=="function")return me(W,_l(G),Q);if(G.$$typeof===D)return me(W,pl(W,G),Q);vl(W,G)}return null}function te(W,G,Q,de){var Ke=G!==null?G.key:null;if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return Ke!==null?null:A(W,G,""+Q,de);if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case M:return Q.key===Ke?z(W,G,Q,de):null;case b:return Q.key===Ke?$(W,G,Q,de):null;case ne:return Q=hs(Q),te(W,G,Q,de)}if(he(Q)||ie(Q))return Ke!==null?null:fe(W,G,Q,de,null);if(typeof Q.then=="function")return te(W,G,_l(Q),de);if(Q.$$typeof===D)return te(W,G,pl(W,Q),de);vl(W,Q)}return null}function oe(W,G,Q,de,Ke){if(typeof de=="string"&&de!==""||typeof de=="number"||typeof de=="bigint")return W=W.get(Q)||null,A(G,W,""+de,Ke);if(typeof de=="object"&&de!==null){switch(de.$$typeof){case M:return W=W.get(de.key===null?Q:de.key)||null,z(G,W,de,Ke);case b:return W=W.get(de.key===null?Q:de.key)||null,$(G,W,de,Ke);case ne:return de=hs(de),oe(W,G,Q,de,Ke)}if(he(de)||ie(de))return W=W.get(Q)||null,fe(G,W,de,Ke,null);if(typeof de.then=="function")return oe(W,G,Q,_l(de),Ke);if(de.$$typeof===D)return oe(W,G,Q,pl(G,de),Ke);vl(G,de)}return null}function Ie(W,G,Q,de){for(var Ke=null,Ut=null,ke=G,ht=G=0,yt=null;ke!==null&&ht<Q.length;ht++){ke.index>ht?(yt=ke,ke=null):yt=ke.sibling;var Nt=te(W,ke,Q[ht],de);if(Nt===null){ke===null&&(ke=yt);break}t&&ke&&Nt.alternate===null&&n(W,ke),G=f(Nt,G,ht),Ut===null?Ke=Nt:Ut.sibling=Nt,Ut=Nt,ke=yt}if(ht===Q.length)return a(W,ke),Tt&&qi(W,ht),Ke;if(ke===null){for(;ht<Q.length;ht++)ke=me(W,Q[ht],de),ke!==null&&(G=f(ke,G,ht),Ut===null?Ke=ke:Ut.sibling=ke,Ut=ke);return Tt&&qi(W,ht),Ke}for(ke=r(ke);ht<Q.length;ht++)yt=oe(ke,W,ht,Q[ht],de),yt!==null&&(t&&yt.alternate!==null&&ke.delete(yt.key===null?ht:yt.key),G=f(yt,G,ht),Ut===null?Ke=yt:Ut.sibling=yt,Ut=yt);return t&&ke.forEach(function(ka){return n(W,ka)}),Tt&&qi(W,ht),Ke}function et(W,G,Q,de){if(Q==null)throw Error(s(151));for(var Ke=null,Ut=null,ke=G,ht=G=0,yt=null,Nt=Q.next();ke!==null&&!Nt.done;ht++,Nt=Q.next()){ke.index>ht?(yt=ke,ke=null):yt=ke.sibling;var ka=te(W,ke,Nt.value,de);if(ka===null){ke===null&&(ke=yt);break}t&&ke&&ka.alternate===null&&n(W,ke),G=f(ka,G,ht),Ut===null?Ke=ka:Ut.sibling=ka,Ut=ka,ke=yt}if(Nt.done)return a(W,ke),Tt&&qi(W,ht),Ke;if(ke===null){for(;!Nt.done;ht++,Nt=Q.next())Nt=me(W,Nt.value,de),Nt!==null&&(G=f(Nt,G,ht),Ut===null?Ke=Nt:Ut.sibling=Nt,Ut=Nt);return Tt&&qi(W,ht),Ke}for(ke=r(ke);!Nt.done;ht++,Nt=Q.next())Nt=oe(ke,W,ht,Nt.value,de),Nt!==null&&(t&&Nt.alternate!==null&&ke.delete(Nt.key===null?ht:Nt.key),G=f(Nt,G,ht),Ut===null?Ke=Nt:Ut.sibling=Nt,Ut=Nt);return t&&ke.forEach(function(kS){return n(W,kS)}),Tt&&qi(W,ht),Ke}function Vt(W,G,Q,de){if(typeof Q=="object"&&Q!==null&&Q.type===T&&Q.key===null&&(Q=Q.props.children),typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case M:e:{for(var Ke=Q.key;G!==null;){if(G.key===Ke){if(Ke=Q.type,Ke===T){if(G.tag===7){a(W,G.sibling),de=u(G,Q.props.children),de.return=W,W=de;break e}}else if(G.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===ne&&hs(Ke)===G.type){a(W,G.sibling),de=u(G,Q.props),to(de,Q),de.return=W,W=de;break e}a(W,G);break}else n(W,G);G=G.sibling}Q.type===T?(de=os(Q.props.children,W.mode,de,Q.key),de.return=W,W=de):(de=fl(Q.type,Q.key,Q.props,null,W.mode,de),to(de,Q),de.return=W,W=de)}return S(W);case b:e:{for(Ke=Q.key;G!==null;){if(G.key===Ke)if(G.tag===4&&G.stateNode.containerInfo===Q.containerInfo&&G.stateNode.implementation===Q.implementation){a(W,G.sibling),de=u(G,Q.children||[]),de.return=W,W=de;break e}else{a(W,G);break}else n(W,G);G=G.sibling}de=Au(Q,W.mode,de),de.return=W,W=de}return S(W);case ne:return Q=hs(Q),Vt(W,G,Q,de)}if(he(Q))return Ie(W,G,Q,de);if(ie(Q)){if(Ke=ie(Q),typeof Ke!="function")throw Error(s(150));return Q=Ke.call(Q),et(W,G,Q,de)}if(typeof Q.then=="function")return Vt(W,G,_l(Q),de);if(Q.$$typeof===D)return Vt(W,G,pl(W,Q),de);vl(W,Q)}return typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint"?(Q=""+Q,G!==null&&G.tag===6?(a(W,G.sibling),de=u(G,Q),de.return=W,W=de):(a(W,G),de=Tu(Q,W.mode,de),de.return=W,W=de),S(W)):a(W,G)}return function(W,G,Q,de){try{eo=0;var Ke=Vt(W,G,Q,de);return Ys=null,Ke}catch(ke){if(ke===qs||ke===xl)throw ke;var Ut=Kn(29,ke,null,W.mode);return Ut.lanes=de,Ut.return=W,Ut}finally{}}}var ps=jp(!0),Zp=jp(!1),Aa=!1;function Fu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Iu(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ra(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ca(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(Lt&2)!==0){var u=r.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),r.pending=n,n=ul(t),Np(t,null,a),n}return cl(t,r,n,a),ul(t)}function no(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,zr(t,a)}}function Hu(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var S={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=S:f=f.next=S,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:r.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Gu=!1;function io(){if(Gu){var t=Ws;if(t!==null)throw t}}function ao(t,n,a,r){Gu=!1;var u=t.updateQueue;Aa=!1;var f=u.firstBaseUpdate,S=u.lastBaseUpdate,A=u.shared.pending;if(A!==null){u.shared.pending=null;var z=A,$=z.next;z.next=null,S===null?f=$:S.next=$,S=z;var fe=t.alternate;fe!==null&&(fe=fe.updateQueue,A=fe.lastBaseUpdate,A!==S&&(A===null?fe.firstBaseUpdate=$:A.next=$,fe.lastBaseUpdate=z))}if(f!==null){var me=u.baseState;S=0,fe=$=z=null,A=f;do{var te=A.lane&-536870913,oe=te!==A.lane;if(oe?(St&te)===te:(r&te)===te){te!==0&&te===Xs&&(Gu=!0),fe!==null&&(fe=fe.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});e:{var Ie=t,et=A;te=n;var Vt=a;switch(et.tag){case 1:if(Ie=et.payload,typeof Ie=="function"){me=Ie.call(Vt,me,te);break e}me=Ie;break e;case 3:Ie.flags=Ie.flags&-65537|128;case 0:if(Ie=et.payload,te=typeof Ie=="function"?Ie.call(Vt,me,te):Ie,te==null)break e;me=x({},me,te);break e;case 2:Aa=!0}}te=A.callback,te!==null&&(t.flags|=64,oe&&(t.flags|=8192),oe=u.callbacks,oe===null?u.callbacks=[te]:oe.push(te))}else oe={lane:te,tag:A.tag,payload:A.payload,callback:A.callback,next:null},fe===null?($=fe=oe,z=me):fe=fe.next=oe,S|=te;if(A=A.next,A===null){if(A=u.shared.pending,A===null)break;oe=A,A=oe.next,oe.next=null,u.lastBaseUpdate=oe,u.shared.pending=null}}while(!0);fe===null&&(z=me),u.baseState=z,u.firstBaseUpdate=$,u.lastBaseUpdate=fe,f===null&&(u.shared.lanes=0),La|=S,t.lanes=S,t.memoizedState=me}}function Kp(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function Qp(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)Kp(a[t],n)}var js=O(null),Sl=O(0);function Jp(t,n){t=ia,Me(Sl,t),Me(js,n),ia=t|n.baseLanes}function Vu(){Me(Sl,ia),Me(js,js.current)}function ku(){ia=Sl.current,re(js),re(Sl)}var Qn=O(null),fi=null;function wa(t){var n=t.alternate;Me(nn,nn.current&1),Me(Qn,t),fi===null&&(n===null||js.current!==null||n.memoizedState!==null)&&(fi=t)}function Xu(t){Me(nn,nn.current),Me(Qn,t),fi===null&&(fi=t)}function $p(t){t.tag===22?(Me(nn,nn.current),Me(Qn,t),fi===null&&(fi=t)):Da()}function Da(){Me(nn,nn.current),Me(Qn,Qn.current)}function Jn(t){re(Qn),fi===t&&(fi=null),re(nn)}var nn=O(0);function yl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Qf(a)||Jf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Zi=0,ct=null,Ht=null,ln=null,Ml=!1,Zs=!1,ms=!1,bl=0,so=0,Ks=null,Lv=0;function $t(){throw Error(s(321))}function Wu(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Zn(t[a],n[a]))return!1;return!0}function qu(t,n,a,r,u,f){return Zi=f,ct=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,F.H=t===null||t.memoizedState===null?z0:lf,ms=!1,f=a(r,u),ms=!1,Zs&&(f=t0(n,a,r,u)),e0(t),f}function e0(t){F.H=lo;var n=Ht!==null&&Ht.next!==null;if(Zi=0,ln=Ht=ct=null,Ml=!1,so=0,Ks=null,n)throw Error(s(300));t===null||cn||(t=t.dependencies,t!==null&&dl(t)&&(cn=!0))}function t0(t,n,a,r){ct=t;var u=0;do{if(Zs&&(Ks=null),so=0,Zs=!1,25<=u)throw Error(s(301));if(u+=1,ln=Ht=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}F.H=B0,f=n(a,r)}while(Zs);return f}function Ov(){var t=F.H,n=t.useState()[0];return n=typeof n.then=="function"?ro(n):n,t=t.useState()[0],(Ht!==null?Ht.memoizedState:null)!==t&&(ct.flags|=1024),n}function Yu(){var t=bl!==0;return bl=0,t}function ju(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Zu(t){if(Ml){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Ml=!1}Zi=0,ln=Ht=ct=null,Zs=!1,so=bl=0,Ks=null}function Pn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ln===null?ct.memoizedState=ln=t:ln=ln.next=t,ln}function an(){if(Ht===null){var t=ct.alternate;t=t!==null?t.memoizedState:null}else t=Ht.next;var n=ln===null?ct.memoizedState:ln.next;if(n!==null)ln=n,Ht=t;else{if(t===null)throw ct.alternate===null?Error(s(467)):Error(s(310));Ht=t,t={memoizedState:Ht.memoizedState,baseState:Ht.baseState,baseQueue:Ht.baseQueue,queue:Ht.queue,next:null},ln===null?ct.memoizedState=ln=t:ln=ln.next=t}return ln}function El(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ro(t){var n=so;return so+=1,Ks===null&&(Ks=[]),t=Wp(Ks,t,n),n=ct,(ln===null?n.memoizedState:ln.next)===null&&(n=n.alternate,F.H=n===null||n.memoizedState===null?z0:lf),t}function Tl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ro(t);if(t.$$typeof===D)return Tn(t)}throw Error(s(438,String(t)))}function Ku(t){var n=null,a=ct.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=ct.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=El(),ct.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=C;return n.index++,a}function Ki(t,n){return typeof n=="function"?n(t):n}function Al(t){var n=an();return Qu(n,Ht,t)}function Qu(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var u=t.baseQueue,f=r.pending;if(f!==null){if(u!==null){var S=u.next;u.next=f.next,f.next=S}n.baseQueue=u=f,r.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var A=S=null,z=null,$=n,fe=!1;do{var me=$.lane&-536870913;if(me!==$.lane?(St&me)===me:(Zi&me)===me){var te=$.revertLane;if(te===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null}),me===Xs&&(fe=!0);else if((Zi&te)===te){$=$.next,te===Xs&&(fe=!0);continue}else me={lane:0,revertLane:$.revertLane,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},z===null?(A=z=me,S=f):z=z.next=me,ct.lanes|=te,La|=te;me=$.action,ms&&a(f,me),f=$.hasEagerState?$.eagerState:a(f,me)}else te={lane:me,revertLane:$.revertLane,gesture:$.gesture,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},z===null?(A=z=te,S=f):z=z.next=te,ct.lanes|=me,La|=me;$=$.next}while($!==null&&$!==n);if(z===null?S=f:z.next=A,!Zn(f,t.memoizedState)&&(cn=!0,fe&&(a=Ws,a!==null)))throw a;t.memoizedState=f,t.baseState=S,t.baseQueue=z,r.lastRenderedState=f}return u===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function Ju(t){var n=an(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var S=u=u.next;do f=t(f,S.action),S=S.next;while(S!==u);Zn(f,n.memoizedState)||(cn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,r]}function n0(t,n,a){var r=ct,u=an(),f=Tt;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var S=!Zn((Ht||u).memoizedState,a);if(S&&(u.memoizedState=a,cn=!0),u=u.queue,tf(s0.bind(null,r,u,t),[t]),u.getSnapshot!==n||S||ln!==null&&ln.memoizedState.tag&1){if(r.flags|=2048,Qs(9,{destroy:void 0},a0.bind(null,r,u,a,n),null),qt===null)throw Error(s(349));f||(Zi&127)!==0||i0(r,n,a)}return a}function i0(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=ct.updateQueue,n===null?(n=El(),ct.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function a0(t,n,a,r){n.value=a,n.getSnapshot=r,r0(n)&&o0(t)}function s0(t,n,a){return a(function(){r0(n)&&o0(t)})}function r0(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Zn(t,a)}catch{return!0}}function o0(t){var n=rs(t,2);n!==null&&Vn(n,t,2)}function $u(t){var n=Pn();if(typeof t=="function"){var a=t;if(t=a(),ms){Ye(!0);try{a()}finally{Ye(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ki,lastRenderedState:t},n}function l0(t,n,a,r){return t.baseState=a,Qu(t,Ht,typeof r=="function"?r:Ki)}function Pv(t,n,a,r,u){if(wl(t))throw Error(s(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){f.listeners.push(S)}};F.T!==null?a(!0):f.isTransition=!1,r(f),a=n.pending,a===null?(f.next=n.pending=f,c0(n,f)):(f.next=a.next,n.pending=a.next=f)}}function c0(t,n){var a=n.action,r=n.payload,u=t.state;if(n.isTransition){var f=F.T,S={};F.T=S;try{var A=a(u,r),z=F.S;z!==null&&z(S,A),u0(t,n,A)}catch($){ef(t,n,$)}finally{f!==null&&S.types!==null&&(f.types=S.types),F.T=f}}else try{f=a(u,r),u0(t,n,f)}catch($){ef(t,n,$)}}function u0(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){f0(t,n,r)},function(r){return ef(t,n,r)}):f0(t,n,a)}function f0(t,n,a){n.status="fulfilled",n.value=a,h0(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,c0(t,a)))}function ef(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,h0(n),n=n.next;while(n!==r)}t.action=null}function h0(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function d0(t,n){return n}function p0(t,n){if(Tt){var a=qt.formState;if(a!==null){e:{var r=ct;if(Tt){if(Zt){t:{for(var u=Zt,f=ui;u.nodeType!==8;){if(!f){u=null;break t}if(u=hi(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Zt=hi(u.nextSibling),r=u.data==="F!";break e}}Ea(r)}r=!1}r&&(n=a[0])}}return a=Pn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:d0,lastRenderedState:n},a.queue=r,a=L0.bind(null,ct,r),r.dispatch=a,r=$u(!1),f=of.bind(null,ct,!1,r.queue),r=Pn(),u={state:n,dispatch:null,action:t,pending:null},r.queue=u,a=Pv.bind(null,ct,u,f,a),u.dispatch=a,r.memoizedState=t,[n,a,!1]}function m0(t){var n=an();return x0(n,Ht,t)}function x0(t,n,a){if(n=Qu(t,n,d0)[0],t=Al(Ki)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=ro(n)}catch(S){throw S===qs?xl:S}else r=n;n=an();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ct.flags|=2048,Qs(9,{destroy:void 0},zv.bind(null,u,a),null)),[r,f,t]}function zv(t,n){t.action=n}function g0(t){var n=an(),a=Ht;if(a!==null)return x0(n,a,t);an(),n=n.memoizedState,a=an();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function Qs(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=ct.updateQueue,n===null&&(n=El(),ct.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function _0(){return an().memoizedState}function Rl(t,n,a,r){var u=Pn();ct.flags|=t,u.memoizedState=Qs(1|n,{destroy:void 0},a,r===void 0?null:r)}function Cl(t,n,a,r){var u=an();r=r===void 0?null:r;var f=u.memoizedState.inst;Ht!==null&&r!==null&&Wu(r,Ht.memoizedState.deps)?u.memoizedState=Qs(n,f,a,r):(ct.flags|=t,u.memoizedState=Qs(1|n,f,a,r))}function v0(t,n){Rl(8390656,8,t,n)}function tf(t,n){Cl(2048,8,t,n)}function Bv(t){ct.flags|=4;var n=ct.updateQueue;if(n===null)n=El(),ct.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function S0(t){var n=an().memoizedState;return Bv({ref:n,nextImpl:t}),function(){if((Lt&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function y0(t,n){return Cl(4,2,t,n)}function M0(t,n){return Cl(4,4,t,n)}function b0(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function E0(t,n,a){a=a!=null?a.concat([t]):null,Cl(4,4,b0.bind(null,n,t),a)}function nf(){}function T0(t,n){var a=an();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Wu(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function A0(t,n){var a=an();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Wu(n,r[1]))return r[0];if(r=t(),ms){Ye(!0);try{t()}finally{Ye(!1)}}return a.memoizedState=[r,n],r}function af(t,n,a){return a===void 0||(Zi&1073741824)!==0&&(St&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=Rm(),ct.lanes|=t,La|=t,a)}function R0(t,n,a,r){return Zn(a,n)?a:js.current!==null?(t=af(t,a,r),Zn(t,n)||(cn=!0),t):(Zi&42)===0||(Zi&1073741824)!==0&&(St&261930)===0?(cn=!0,t.memoizedState=a):(t=Rm(),ct.lanes|=t,La|=t,n)}function C0(t,n,a,r,u){var f=j.p;j.p=f!==0&&8>f?f:8;var S=F.T,A={};F.T=A,of(t,!1,n,a);try{var z=u(),$=F.S;if($!==null&&$(A,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var fe=Nv(z,r);oo(t,n,fe,ti(t))}else oo(t,n,r,ti(t))}catch(me){oo(t,n,{then:function(){},status:"rejected",reason:me},ti())}finally{j.p=f,S!==null&&A.types!==null&&(S.types=A.types),F.T=S}}function Fv(){}function sf(t,n,a,r){if(t.tag!==5)throw Error(s(476));var u=w0(t).queue;C0(t,u,n,Y,a===null?Fv:function(){return D0(t),a(r)})}function w0(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:Y,baseState:Y,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ki,lastRenderedState:Y},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ki,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function D0(t){var n=w0(t);n.next===null&&(n=t.alternate.memoizedState),oo(t,n.next.queue,{},ti())}function rf(){return Tn(To)}function U0(){return an().memoizedState}function N0(){return an().memoizedState}function Iv(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ti();t=Ra(a);var r=Ca(n,t,a);r!==null&&(Vn(r,n,a),no(r,n,a)),n={cache:Ou()},t.payload=n;return}n=n.return}}function Hv(t,n,a){var r=ti();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},wl(t)?O0(n,a):(a=bu(t,n,a,r),a!==null&&(Vn(a,t,r),P0(a,n,r)))}function L0(t,n,a){var r=ti();oo(t,n,a,r)}function oo(t,n,a,r){var u={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(wl(t))O0(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var S=n.lastRenderedState,A=f(S,a);if(u.hasEagerState=!0,u.eagerState=A,Zn(A,S))return cl(t,n,u,0),qt===null&&ll(),!1}catch{}finally{}if(a=bu(t,n,u,r),a!==null)return Vn(a,t,r),P0(a,n,r),!0}return!1}function of(t,n,a,r){if(r={lane:2,revertLane:If(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},wl(t)){if(n)throw Error(s(479))}else n=bu(t,a,r,2),n!==null&&Vn(n,t,2)}function wl(t){var n=t.alternate;return t===ct||n!==null&&n===ct}function O0(t,n){Zs=Ml=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function P0(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,zr(t,a)}}var lo={readContext:Tn,use:Tl,useCallback:$t,useContext:$t,useEffect:$t,useImperativeHandle:$t,useLayoutEffect:$t,useInsertionEffect:$t,useMemo:$t,useReducer:$t,useRef:$t,useState:$t,useDebugValue:$t,useDeferredValue:$t,useTransition:$t,useSyncExternalStore:$t,useId:$t,useHostTransitionStatus:$t,useFormState:$t,useActionState:$t,useOptimistic:$t,useMemoCache:$t,useCacheRefresh:$t};lo.useEffectEvent=$t;var z0={readContext:Tn,use:Tl,useCallback:function(t,n){return Pn().memoizedState=[t,n===void 0?null:n],t},useContext:Tn,useEffect:v0,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Rl(4194308,4,b0.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Rl(4194308,4,t,n)},useInsertionEffect:function(t,n){Rl(4,2,t,n)},useMemo:function(t,n){var a=Pn();n=n===void 0?null:n;var r=t();if(ms){Ye(!0);try{t()}finally{Ye(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Pn();if(a!==void 0){var u=a(n);if(ms){Ye(!0);try{a(n)}finally{Ye(!1)}}}else u=n;return r.memoizedState=r.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},r.queue=t,t=t.dispatch=Hv.bind(null,ct,t),[r.memoizedState,t]},useRef:function(t){var n=Pn();return t={current:t},n.memoizedState=t},useState:function(t){t=$u(t);var n=t.queue,a=L0.bind(null,ct,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:nf,useDeferredValue:function(t,n){var a=Pn();return af(a,t,n)},useTransition:function(){var t=$u(!1);return t=C0.bind(null,ct,t.queue,!0,!1),Pn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=ct,u=Pn();if(Tt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),qt===null)throw Error(s(349));(St&127)!==0||i0(r,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,v0(s0.bind(null,r,f,t),[t]),r.flags|=2048,Qs(9,{destroy:void 0},a0.bind(null,r,f,a,n),null),a},useId:function(){var t=Pn(),n=qt.identifierPrefix;if(Tt){var a=Di,r=wi;a=(r&~(1<<32-Ve(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=bl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Lv++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:rf,useFormState:p0,useActionState:p0,useOptimistic:function(t){var n=Pn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=of.bind(null,ct,!0,a),a.dispatch=n,[t,n]},useMemoCache:Ku,useCacheRefresh:function(){return Pn().memoizedState=Iv.bind(null,ct)},useEffectEvent:function(t){var n=Pn(),a={impl:t};return n.memoizedState=a,function(){if((Lt&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},lf={readContext:Tn,use:Tl,useCallback:T0,useContext:Tn,useEffect:tf,useImperativeHandle:E0,useInsertionEffect:y0,useLayoutEffect:M0,useMemo:A0,useReducer:Al,useRef:_0,useState:function(){return Al(Ki)},useDebugValue:nf,useDeferredValue:function(t,n){var a=an();return R0(a,Ht.memoizedState,t,n)},useTransition:function(){var t=Al(Ki)[0],n=an().memoizedState;return[typeof t=="boolean"?t:ro(t),n]},useSyncExternalStore:n0,useId:U0,useHostTransitionStatus:rf,useFormState:m0,useActionState:m0,useOptimistic:function(t,n){var a=an();return l0(a,Ht,t,n)},useMemoCache:Ku,useCacheRefresh:N0};lf.useEffectEvent=S0;var B0={readContext:Tn,use:Tl,useCallback:T0,useContext:Tn,useEffect:tf,useImperativeHandle:E0,useInsertionEffect:y0,useLayoutEffect:M0,useMemo:A0,useReducer:Ju,useRef:_0,useState:function(){return Ju(Ki)},useDebugValue:nf,useDeferredValue:function(t,n){var a=an();return Ht===null?af(a,t,n):R0(a,Ht.memoizedState,t,n)},useTransition:function(){var t=Ju(Ki)[0],n=an().memoizedState;return[typeof t=="boolean"?t:ro(t),n]},useSyncExternalStore:n0,useId:U0,useHostTransitionStatus:rf,useFormState:g0,useActionState:g0,useOptimistic:function(t,n){var a=an();return Ht!==null?l0(a,Ht,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Ku,useCacheRefresh:N0};B0.useEffectEvent=S0;function cf(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:x({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var uf={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=ti(),u=Ra(r);u.payload=n,a!=null&&(u.callback=a),n=Ca(t,u,r),n!==null&&(Vn(n,t,r),no(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=ti(),u=Ra(r);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ca(t,u,r),n!==null&&(Vn(n,t,r),no(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ti(),r=Ra(a);r.tag=2,n!=null&&(r.callback=n),n=Ca(t,r,a),n!==null&&(Vn(n,t,a),no(n,t,a))}};function F0(t,n,a,r,u,f,S){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,f,S):n.prototype&&n.prototype.isPureReactComponent?!jr(a,r)||!jr(u,f):!0}function I0(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&uf.enqueueReplaceState(n,n.state,null)}function xs(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=x({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function H0(t){ol(t)}function G0(t){console.error(t)}function V0(t){ol(t)}function Dl(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function k0(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function ff(t,n,a){return a=Ra(a),a.tag=3,a.payload={element:null},a.callback=function(){Dl(t,n)},a}function X0(t){return t=Ra(t),t.tag=3,t}function W0(t,n,a,r){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=r.value;t.payload=function(){return u(f)},t.callback=function(){k0(n,a,r)}}var S=a.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(t.callback=function(){k0(n,a,r),typeof u!="function"&&(Oa===null?Oa=new Set([this]):Oa.add(this));var A=r.stack;this.componentDidCatch(r.value,{componentStack:A!==null?A:""})})}function Gv(t,n,a,r,u){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&ks(n,a,u,!0),a=Qn.current,a!==null){switch(a.tag){case 31:case 13:return fi===null?Vl():a.alternate===null&&en===0&&(en=3),a.flags&=-257,a.flags|=65536,a.lanes=u,r===gl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),zf(t,r,u)),!1;case 22:return a.flags|=65536,r===gl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),zf(t,r,u)),!1}throw Error(s(435,a.tag))}return zf(t,r,u),Vl(),!1}if(Tt)return n=Qn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,r!==wu&&(t=Error(s(422),{cause:r}),Qr(oi(t,a)))):(r!==wu&&(n=Error(s(423),{cause:r}),Qr(oi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,r=oi(r,a),u=ff(t.stateNode,r,u),Hu(t,u),en!==4&&(en=2)),!1;var f=Error(s(520),{cause:r});if(f=oi(f,a),go===null?go=[f]:go.push(f),en!==4&&(en=2),n===null)return!0;r=oi(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=ff(a.stateNode,r,t),Hu(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Oa===null||!Oa.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=X0(u),W0(u,t,a,r),Hu(a,u),!1}a=a.return}while(a!==null);return!1}var hf=Error(s(461)),cn=!1;function An(t,n,a,r){n.child=t===null?Zp(n,null,a,r):ps(n,t.child,a,r)}function q0(t,n,a,r,u){a=a.render;var f=n.ref;if("ref"in r){var S={};for(var A in r)A!=="ref"&&(S[A]=r[A])}else S=r;return us(n),r=qu(t,n,a,S,f,u),A=Yu(),t!==null&&!cn?(ju(t,n,u),Qi(t,n,u)):(Tt&&A&&Ru(n),n.flags|=1,An(t,n,r,u),n.child)}function Y0(t,n,a,r,u){if(t===null){var f=a.type;return typeof f=="function"&&!Eu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,j0(t,n,f,r,u)):(t=fl(a.type,null,r,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!Sf(t,u)){var S=f.memoizedProps;if(a=a.compare,a=a!==null?a:jr,a(S,r)&&t.ref===n.ref)return Qi(t,n,u)}return n.flags|=1,t=Wi(f,r),t.ref=n.ref,t.return=n,n.child=t}function j0(t,n,a,r,u){if(t!==null){var f=t.memoizedProps;if(jr(f,r)&&t.ref===n.ref)if(cn=!1,n.pendingProps=r=f,Sf(t,u))(t.flags&131072)!==0&&(cn=!0);else return n.lanes=t.lanes,Qi(t,n,u)}return df(t,n,a,r,u)}function Z0(t,n,a,r){var u=r.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(r=n.child=t.child,u=0;r!==null;)u=u|r.lanes|r.childLanes,r=r.sibling;r=u&~f}else r=0,n.child=null;return K0(t,n,f,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&ml(n,f!==null?f.cachePool:null),f!==null?Jp(n,f):Vu(),$p(n);else return r=n.lanes=536870912,K0(t,n,f!==null?f.baseLanes|a:a,a,r)}else f!==null?(ml(n,f.cachePool),Jp(n,f),Da(),n.memoizedState=null):(t!==null&&ml(n,null),Vu(),Da());return An(t,n,u,a),n.child}function co(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function K0(t,n,a,r,u){var f=zu();return f=f===null?null:{parent:on._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&ml(n,null),Vu(),$p(n),t!==null&&ks(t,n,r,!0),n.childLanes=u,null}function Ul(t,n){return n=Ll({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function Q0(t,n,a){return ps(n,t.child,null,a),t=Ul(n,n.pendingProps),t.flags|=2,Jn(n),n.memoizedState=null,t}function Vv(t,n,a){var r=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Tt){if(r.mode==="hidden")return t=Ul(n,r),n.lanes=536870912,co(null,t);if(Xu(n),(t=Zt)?(t=cx(t,ui),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ma!==null?{id:wi,overflow:Di}:null,retryLane:536870912,hydrationErrors:null},a=Op(t),a.return=n,n.child=a,En=n,Zt=null)):t=null,t===null)throw Ea(n);return n.lanes=536870912,null}return Ul(n,r)}var f=t.memoizedState;if(f!==null){var S=f.dehydrated;if(Xu(n),u)if(n.flags&256)n.flags&=-257,n=Q0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(cn||ks(t,n,a,!1),u=(a&t.childLanes)!==0,cn||u){if(r=qt,r!==null&&(S=Br(r,a),S!==0&&S!==f.retryLane))throw f.retryLane=S,rs(t,S),Vn(r,t,S),hf;Vl(),n=Q0(t,n,a)}else t=f.treeContext,Zt=hi(S.nextSibling),En=n,Tt=!0,ba=null,ui=!1,t!==null&&Bp(n,t),n=Ul(n,r),n.flags|=4096;return n}return t=Wi(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Nl(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function df(t,n,a,r,u){return us(n),a=qu(t,n,a,r,void 0,u),r=Yu(),t!==null&&!cn?(ju(t,n,u),Qi(t,n,u)):(Tt&&r&&Ru(n),n.flags|=1,An(t,n,a,u),n.child)}function J0(t,n,a,r,u,f){return us(n),n.updateQueue=null,a=t0(n,r,a,u),e0(t),r=Yu(),t!==null&&!cn?(ju(t,n,f),Qi(t,n,f)):(Tt&&r&&Ru(n),n.flags|=1,An(t,n,a,f),n.child)}function $0(t,n,a,r,u){if(us(n),n.stateNode===null){var f=Is,S=a.contextType;typeof S=="object"&&S!==null&&(f=Tn(S)),f=new a(r,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=uf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=r,f.state=n.memoizedState,f.refs={},Fu(n),S=a.contextType,f.context=typeof S=="object"&&S!==null?Tn(S):Is,f.state=n.memoizedState,S=a.getDerivedStateFromProps,typeof S=="function"&&(cf(n,a,S,r),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(S=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),S!==f.state&&uf.enqueueReplaceState(f,f.state,null),ao(n,r,f,u),io(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){f=n.stateNode;var A=n.memoizedProps,z=xs(a,A);f.props=z;var $=f.context,fe=a.contextType;S=Is,typeof fe=="object"&&fe!==null&&(S=Tn(fe));var me=a.getDerivedStateFromProps;fe=typeof me=="function"||typeof f.getSnapshotBeforeUpdate=="function",A=n.pendingProps!==A,fe||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(A||$!==S)&&I0(n,f,r,S),Aa=!1;var te=n.memoizedState;f.state=te,ao(n,r,f,u),io(),$=n.memoizedState,A||te!==$||Aa?(typeof me=="function"&&(cf(n,a,me,r),$=n.memoizedState),(z=Aa||F0(n,a,z,r,te,$,S))?(fe||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=$),f.props=r,f.state=$,f.context=S,r=z):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{f=n.stateNode,Iu(t,n),S=n.memoizedProps,fe=xs(a,S),f.props=fe,me=n.pendingProps,te=f.context,$=a.contextType,z=Is,typeof $=="object"&&$!==null&&(z=Tn($)),A=a.getDerivedStateFromProps,($=typeof A=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(S!==me||te!==z)&&I0(n,f,r,z),Aa=!1,te=n.memoizedState,f.state=te,ao(n,r,f,u),io();var oe=n.memoizedState;S!==me||te!==oe||Aa||t!==null&&t.dependencies!==null&&dl(t.dependencies)?(typeof A=="function"&&(cf(n,a,A,r),oe=n.memoizedState),(fe=Aa||F0(n,a,fe,r,te,oe,z)||t!==null&&t.dependencies!==null&&dl(t.dependencies))?($||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,oe,z),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,oe,z)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||S===t.memoizedProps&&te===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&te===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=oe),f.props=r,f.state=oe,f.context=z,r=fe):(typeof f.componentDidUpdate!="function"||S===t.memoizedProps&&te===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&te===t.memoizedState||(n.flags|=1024),r=!1)}return f=r,Nl(t,n),r=(n.flags&128)!==0,f||r?(f=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&r?(n.child=ps(n,t.child,null,u),n.child=ps(n,null,a,u)):An(t,n,a,u),n.memoizedState=f.state,t=n.child):t=Qi(t,n,u),t}function em(t,n,a,r){return ls(),n.flags|=256,An(t,n,a,r),n.child}var pf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function mf(t){return{baseLanes:t,cachePool:kp()}}function xf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ei),t}function tm(t,n,a){var r=n.pendingProps,u=!1,f=(n.flags&128)!==0,S;if((S=f)||(S=t!==null&&t.memoizedState===null?!1:(nn.current&2)!==0),S&&(u=!0,n.flags&=-129),S=(n.flags&32)!==0,n.flags&=-33,t===null){if(Tt){if(u?wa(n):Da(),(t=Zt)?(t=cx(t,ui),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ma!==null?{id:wi,overflow:Di}:null,retryLane:536870912,hydrationErrors:null},a=Op(t),a.return=n,n.child=a,En=n,Zt=null)):t=null,t===null)throw Ea(n);return Jf(t)?n.lanes=32:n.lanes=536870912,null}var A=r.children;return r=r.fallback,u?(Da(),u=n.mode,A=Ll({mode:"hidden",children:A},u),r=os(r,u,a,null),A.return=n,r.return=n,A.sibling=r,n.child=A,r=n.child,r.memoizedState=mf(a),r.childLanes=xf(t,S,a),n.memoizedState=pf,co(null,r)):(wa(n),gf(n,A))}var z=t.memoizedState;if(z!==null&&(A=z.dehydrated,A!==null)){if(f)n.flags&256?(wa(n),n.flags&=-257,n=_f(t,n,a)):n.memoizedState!==null?(Da(),n.child=t.child,n.flags|=128,n=null):(Da(),A=r.fallback,u=n.mode,r=Ll({mode:"visible",children:r.children},u),A=os(A,u,a,null),A.flags|=2,r.return=n,A.return=n,r.sibling=A,n.child=r,ps(n,t.child,null,a),r=n.child,r.memoizedState=mf(a),r.childLanes=xf(t,S,a),n.memoizedState=pf,n=co(null,r));else if(wa(n),Jf(A)){if(S=A.nextSibling&&A.nextSibling.dataset,S)var $=S.dgst;S=$,r=Error(s(419)),r.stack="",r.digest=S,Qr({value:r,source:null,stack:null}),n=_f(t,n,a)}else if(cn||ks(t,n,a,!1),S=(a&t.childLanes)!==0,cn||S){if(S=qt,S!==null&&(r=Br(S,a),r!==0&&r!==z.retryLane))throw z.retryLane=r,rs(t,r),Vn(S,t,r),hf;Qf(A)||Vl(),n=_f(t,n,a)}else Qf(A)?(n.flags|=192,n.child=t.child,n=null):(t=z.treeContext,Zt=hi(A.nextSibling),En=n,Tt=!0,ba=null,ui=!1,t!==null&&Bp(n,t),n=gf(n,r.children),n.flags|=4096);return n}return u?(Da(),A=r.fallback,u=n.mode,z=t.child,$=z.sibling,r=Wi(z,{mode:"hidden",children:r.children}),r.subtreeFlags=z.subtreeFlags&65011712,$!==null?A=Wi($,A):(A=os(A,u,a,null),A.flags|=2),A.return=n,r.return=n,r.sibling=A,n.child=r,co(null,r),r=n.child,A=t.child.memoizedState,A===null?A=mf(a):(u=A.cachePool,u!==null?(z=on._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=kp(),A={baseLanes:A.baseLanes|a,cachePool:u}),r.memoizedState=A,r.childLanes=xf(t,S,a),n.memoizedState=pf,co(t.child,r)):(wa(n),a=t.child,t=a.sibling,a=Wi(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(S=n.deletions,S===null?(n.deletions=[t],n.flags|=16):S.push(t)),n.child=a,n.memoizedState=null,a)}function gf(t,n){return n=Ll({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Ll(t,n){return t=Kn(22,t,null,n),t.lanes=0,t}function _f(t,n,a){return ps(n,t.child,null,a),t=gf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function nm(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),Nu(t.return,n,a)}function vf(t,n,a,r,u,f){var S=t.memoizedState;S===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:u,treeForkCount:f}:(S.isBackwards=n,S.rendering=null,S.renderingStartTime=0,S.last=r,S.tail=a,S.tailMode=u,S.treeForkCount=f)}function im(t,n,a){var r=n.pendingProps,u=r.revealOrder,f=r.tail;r=r.children;var S=nn.current,A=(S&2)!==0;if(A?(S=S&1|2,n.flags|=128):S&=1,Me(nn,S),An(t,n,r,a),r=Tt?Kr:0,!A&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&nm(t,a,n);else if(t.tag===19)nm(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&yl(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),vf(n,!1,u,a,f,r);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&yl(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}vf(n,!0,a,null,f,r);break;case"together":vf(n,!1,null,null,void 0,r);break;default:n.memoizedState=null}return n.child}function Qi(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),La|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(ks(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=Wi(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Wi(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Sf(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&dl(t)))}function kv(t,n,a){switch(n.tag){case 3:we(n,n.stateNode.containerInfo),Ta(n,on,t.memoizedState.cache),ls();break;case 27:case 5:Xe(n);break;case 4:we(n,n.stateNode.containerInfo);break;case 10:Ta(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Xu(n),null;break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(wa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?tm(t,n,a):(wa(n),t=Qi(t,n,a),t!==null?t.sibling:null);wa(n);break;case 19:var u=(t.flags&128)!==0;if(r=(a&n.childLanes)!==0,r||(ks(t,n,a,!1),r=(a&n.childLanes)!==0),u){if(r)return im(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Me(nn,nn.current),r)break;return null;case 22:return n.lanes=0,Z0(t,n,a,n.pendingProps);case 24:Ta(n,on,t.memoizedState.cache)}return Qi(t,n,a)}function am(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)cn=!0;else{if(!Sf(t,a)&&(n.flags&128)===0)return cn=!1,kv(t,n,a);cn=(t.flags&131072)!==0}else cn=!1,Tt&&(n.flags&1048576)!==0&&zp(n,Kr,n.index);switch(n.lanes=0,n.tag){case 16:e:{var r=n.pendingProps;if(t=hs(n.elementType),n.type=t,typeof t=="function")Eu(t)?(r=xs(t,r),n.tag=1,n=$0(null,n,t,r,a)):(n.tag=0,n=df(null,n,t,r,a));else{if(t!=null){var u=t.$$typeof;if(u===P){n.tag=11,n=q0(null,n,t,r,a);break e}else if(u===B){n.tag=14,n=Y0(null,n,t,r,a);break e}}throw n=xe(t)||t,Error(s(306,n,""))}}return n;case 0:return df(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,u=xs(r,n.pendingProps),$0(t,n,r,u,a);case 3:e:{if(we(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var f=n.memoizedState;u=f.element,Iu(t,n),ao(n,r,null,a);var S=n.memoizedState;if(r=S.cache,Ta(n,on,r),r!==f.cache&&Lu(n,[on],a,!0),io(),r=S.element,f.isDehydrated)if(f={element:r,isDehydrated:!1,cache:S.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=em(t,n,r,a);break e}else if(r!==u){u=oi(Error(s(424)),n),Qr(u),n=em(t,n,r,a);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Zt=hi(t.firstChild),En=n,Tt=!0,ba=null,ui=!0,a=Zp(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(ls(),r===u){n=Qi(t,n,a);break e}An(t,n,r,a)}n=n.child}return n;case 26:return Nl(t,n),t===null?(a=mx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Tt||(a=n.type,t=n.pendingProps,r=Zl(ae.current).createElement(a),r[rn]=n,r[dn]=t,Rn(r,a,t),ee(r),n.stateNode=r):n.memoizedState=mx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Xe(n),t===null&&Tt&&(r=n.stateNode=hx(n.type,n.pendingProps,ae.current),En=n,ui=!0,u=Zt,Fa(n.type)?($f=u,Zt=hi(r.firstChild)):Zt=u),An(t,n,n.pendingProps.children,a),Nl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Tt&&((u=r=Zt)&&(r=vS(r,n.type,n.pendingProps,ui),r!==null?(n.stateNode=r,En=n,Zt=hi(r.firstChild),ui=!1,u=!0):u=!1),u||Ea(n)),Xe(n),u=n.type,f=n.pendingProps,S=t!==null?t.memoizedProps:null,r=f.children,jf(u,f)?r=null:S!==null&&jf(u,S)&&(n.flags|=32),n.memoizedState!==null&&(u=qu(t,n,Ov,null,null,a),To._currentValue=u),Nl(t,n),An(t,n,r,a),n.child;case 6:return t===null&&Tt&&((t=a=Zt)&&(a=SS(a,n.pendingProps,ui),a!==null?(n.stateNode=a,En=n,Zt=null,t=!0):t=!1),t||Ea(n)),null;case 13:return tm(t,n,a);case 4:return we(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=ps(n,null,r,a):An(t,n,r,a),n.child;case 11:return q0(t,n,n.type,n.pendingProps,a);case 7:return An(t,n,n.pendingProps,a),n.child;case 8:return An(t,n,n.pendingProps.children,a),n.child;case 12:return An(t,n,n.pendingProps.children,a),n.child;case 10:return r=n.pendingProps,Ta(n,n.type,r.value),An(t,n,r.children,a),n.child;case 9:return u=n.type._context,r=n.pendingProps.children,us(n),u=Tn(u),r=r(u),n.flags|=1,An(t,n,r,a),n.child;case 14:return Y0(t,n,n.type,n.pendingProps,a);case 15:return j0(t,n,n.type,n.pendingProps,a);case 19:return im(t,n,a);case 31:return Vv(t,n,a);case 22:return Z0(t,n,a,n.pendingProps);case 24:return us(n),r=Tn(on),t===null?(u=zu(),u===null&&(u=qt,f=Ou(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:r,cache:u},Fu(n),Ta(n,on,u)):((t.lanes&a)!==0&&(Iu(t,n),ao(n,null,null,a),io()),u=t.memoizedState,f=n.memoizedState,u.parent!==r?(u={parent:r,cache:r},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ta(n,on,r)):(r=f.cache,Ta(n,on,r),r!==u.cache&&Lu(n,[on],a,!0))),An(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ji(t){t.flags|=4}function yf(t,n,a,r,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(Um())t.flags|=8192;else throw ds=gl,Bu}else t.flags&=-16777217}function sm(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Sx(n))if(Um())t.flags|=8192;else throw ds=gl,Bu}function Ol(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?It():536870912,t.lanes|=n,tr|=n)}function uo(t,n){if(!Tt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Kt(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags&65011712,r|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags,r|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function Xv(t,n,a){var r=n.pendingProps;switch(Cu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Kt(n),null;case 1:return Kt(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),ji(on),He(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Vs(n)?Ji(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Du())),Kt(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(Ji(n),f!==null?(Kt(n),sm(n,f)):(Kt(n),yf(n,u,null,r,a))):f?f!==t.memoizedState?(Ji(n),Kt(n),sm(n,f)):(Kt(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&Ji(n),Kt(n),yf(n,u,t,r,a)),null;case 27:if(ut(n),a=ae.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ji(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Kt(n),null}t=Te.current,Vs(n)?Fp(n):(t=hx(u,r,a),n.stateNode=t,Ji(n))}return Kt(n),null;case 5:if(ut(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ji(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Kt(n),null}if(f=Te.current,Vs(n))Fp(n);else{var S=Zl(ae.current);switch(f){case 1:f=S.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=S.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=S.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof r.is=="string"?S.createElement("select",{is:r.is}):S.createElement("select"),r.multiple?f.multiple=!0:r.size&&(f.size=r.size);break;default:f=typeof r.is=="string"?S.createElement(u,{is:r.is}):S.createElement(u)}}f[rn]=n,f[dn]=r;e:for(S=n.child;S!==null;){if(S.tag===5||S.tag===6)f.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===n)break e;for(;S.sibling===null;){if(S.return===null||S.return===n)break e;S=S.return}S.sibling.return=S.return,S=S.sibling}n.stateNode=f;e:switch(Rn(f,u,r),u){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&Ji(n)}}return Kt(n),yf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&Ji(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=ae.current,Vs(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,u=En,u!==null)switch(u.tag){case 27:case 5:r=u.memoizedProps}t[rn]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||tx(t.nodeValue,a)),t||Ea(n,!0)}else t=Zl(t).createTextNode(r),t[rn]=n,n.stateNode=t}return Kt(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=Vs(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[rn]=n}else ls(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Kt(n),t=!1}else a=Du(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(Jn(n),n):(Jn(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Kt(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Vs(n),r!==null&&r.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[rn]=n}else ls(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Kt(n),u=!1}else u=Du(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(Jn(n),n):(Jn(n),null)}return Jn(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,u=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(u=r.alternate.memoizedState.cachePool.pool),f=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(f=r.memoizedState.cachePool.pool),f!==u&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Ol(n,n.updateQueue),Kt(n),null);case 4:return He(),t===null&&kf(n.stateNode.containerInfo),Kt(n),null;case 10:return ji(n.type),Kt(n),null;case 19:if(re(nn),r=n.memoizedState,r===null)return Kt(n),null;if(u=(n.flags&128)!==0,f=r.rendering,f===null)if(u)uo(r,!1);else{if(en!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=yl(t),f!==null){for(n.flags|=128,uo(r,!1),t=f.updateQueue,n.updateQueue=t,Ol(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Lp(a,t),a=a.sibling;return Me(nn,nn.current&1|2),Tt&&qi(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&E()>Il&&(n.flags|=128,u=!0,uo(r,!1),n.lanes=4194304)}else{if(!u)if(t=yl(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Ol(n,t),uo(r,!0),r.tail===null&&r.tailMode==="hidden"&&!f.alternate&&!Tt)return Kt(n),null}else 2*E()-r.renderingStartTime>Il&&a!==536870912&&(n.flags|=128,u=!0,uo(r,!1),n.lanes=4194304);r.isBackwards?(f.sibling=n.child,n.child=f):(t=r.last,t!==null?t.sibling=f:n.child=f,r.last=f)}return r.tail!==null?(t=r.tail,r.rendering=t,r.tail=t.sibling,r.renderingStartTime=E(),t.sibling=null,a=nn.current,Me(nn,u?a&1|2:a&1),Tt&&qi(n,r.treeForkCount),t):(Kt(n),null);case 22:case 23:return Jn(n),ku(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(Kt(n),n.subtreeFlags&6&&(n.flags|=8192)):Kt(n),a=n.updateQueue,a!==null&&Ol(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&re(fs),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ji(on),Kt(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Wv(t,n){switch(Cu(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return ji(on),He(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return ut(n),null;case 31:if(n.memoizedState!==null){if(Jn(n),n.alternate===null)throw Error(s(340));ls()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(Jn(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));ls()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return re(nn),null;case 4:return He(),null;case 10:return ji(n.type),null;case 22:case 23:return Jn(n),ku(),t!==null&&re(fs),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return ji(on),null;case 25:return null;default:return null}}function rm(t,n){switch(Cu(n),n.tag){case 3:ji(on),He();break;case 26:case 27:case 5:ut(n);break;case 4:He();break;case 31:n.memoizedState!==null&&Jn(n);break;case 13:Jn(n);break;case 19:re(nn);break;case 10:ji(n.type);break;case 22:case 23:Jn(n),ku(),t!==null&&re(fs);break;case 24:ji(on)}}function fo(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var u=r.next;a=u;do{if((a.tag&t)===t){r=void 0;var f=a.create,S=a.inst;r=f(),S.destroy=r}a=a.next}while(a!==u)}}catch(A){Bt(n,n.return,A)}}function Ua(t,n,a){try{var r=n.updateQueue,u=r!==null?r.lastEffect:null;if(u!==null){var f=u.next;r=f;do{if((r.tag&t)===t){var S=r.inst,A=S.destroy;if(A!==void 0){S.destroy=void 0,u=n;var z=a,$=A;try{$()}catch(fe){Bt(u,z,fe)}}}r=r.next}while(r!==f)}}catch(fe){Bt(n,n.return,fe)}}function om(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Qp(n,a)}catch(r){Bt(t,t.return,r)}}}function lm(t,n,a){a.props=xs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){Bt(t,n,r)}}function ho(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(u){Bt(t,n,u)}}function Ui(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(u){Bt(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Bt(t,n,u)}else a.current=null}function cm(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break e;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(u){Bt(t,t.return,u)}}function Mf(t,n,a){try{var r=t.stateNode;dS(r,t.type,a,n),r[dn]=n}catch(u){Bt(t,t.return,u)}}function um(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Fa(t.type)||t.tag===4}function bf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||um(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Fa(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ef(t,n,a){var r=t.tag;if(r===5||r===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ki));else if(r!==4&&(r===27&&Fa(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Ef(t,n,a),t=t.sibling;t!==null;)Ef(t,n,a),t=t.sibling}function Pl(t,n,a){var r=t.tag;if(r===5||r===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(r!==4&&(r===27&&Fa(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Pl(t,n,a),t=t.sibling;t!==null;)Pl(t,n,a),t=t.sibling}function fm(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Rn(n,r,a),n[rn]=t,n[dn]=a}catch(f){Bt(t,t.return,f)}}var $i=!1,un=!1,Tf=!1,hm=typeof WeakSet=="function"?WeakSet:Set,yn=null;function qv(t,n){if(t=t.containerInfo,qf=nc,t=Ep(t),gu(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var u=r.anchorOffset,f=r.focusNode;r=r.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var S=0,A=-1,z=-1,$=0,fe=0,me=t,te=null;t:for(;;){for(var oe;me!==a||u!==0&&me.nodeType!==3||(A=S+u),me!==f||r!==0&&me.nodeType!==3||(z=S+r),me.nodeType===3&&(S+=me.nodeValue.length),(oe=me.firstChild)!==null;)te=me,me=oe;for(;;){if(me===t)break t;if(te===a&&++$===u&&(A=S),te===f&&++fe===r&&(z=S),(oe=me.nextSibling)!==null)break;me=te,te=me.parentNode}me=oe}a=A===-1||z===-1?null:{start:A,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(Yf={focusedElem:t,selectionRange:a},nc=!1,yn=n;yn!==null;)if(n=yn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,yn=t;else for(;yn!==null;){switch(n=yn,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,r=a.stateNode;try{var Ie=xs(a.type,u);t=r.getSnapshotBeforeUpdate(Ie,f),r.__reactInternalSnapshotBeforeUpdate=t}catch(et){Bt(a,a.return,et)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Kf(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Kf(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,yn=t;break}yn=n.return}}function dm(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:ta(t,a),r&4&&fo(5,a);break;case 1:if(ta(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(S){Bt(a,a.return,S)}else{var u=xs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(S){Bt(a,a.return,S)}}r&64&&om(a),r&512&&ho(a,a.return);break;case 3:if(ta(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Qp(t,n)}catch(S){Bt(a,a.return,S)}}break;case 27:n===null&&r&4&&fm(a);case 26:case 5:ta(t,a),n===null&&r&4&&cm(a),r&512&&ho(a,a.return);break;case 12:ta(t,a);break;case 31:ta(t,a),r&4&&xm(t,a);break;case 13:ta(t,a),r&4&&gm(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=tS.bind(null,a),yS(t,a))));break;case 22:if(r=a.memoizedState!==null||$i,!r){n=n!==null&&n.memoizedState!==null||un,u=$i;var f=un;$i=r,(un=n)&&!f?na(t,a,(a.subtreeFlags&8772)!==0):ta(t,a),$i=u,un=f}break;case 30:break;default:ta(t,a)}}function pm(t){var n=t.alternate;n!==null&&(t.alternate=null,pm(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Hr(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Qt=null,Fn=!1;function ea(t,n,a){for(a=a.child;a!==null;)mm(t,n,a),a=a.sibling}function mm(t,n,a){if(Ee&&typeof Ee.onCommitFiberUnmount=="function")try{Ee.onCommitFiberUnmount(ye,a)}catch{}switch(a.tag){case 26:un||Ui(a,n),ea(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:un||Ui(a,n);var r=Qt,u=Fn;Fa(a.type)&&(Qt=a.stateNode,Fn=!1),ea(t,n,a),Mo(a.stateNode),Qt=r,Fn=u;break;case 5:un||Ui(a,n);case 6:if(r=Qt,u=Fn,Qt=null,ea(t,n,a),Qt=r,Fn=u,Qt!==null)if(Fn)try{(Qt.nodeType===9?Qt.body:Qt.nodeName==="HTML"?Qt.ownerDocument.body:Qt).removeChild(a.stateNode)}catch(f){Bt(a,n,f)}else try{Qt.removeChild(a.stateNode)}catch(f){Bt(a,n,f)}break;case 18:Qt!==null&&(Fn?(t=Qt,ox(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),cr(t)):ox(Qt,a.stateNode));break;case 4:r=Qt,u=Fn,Qt=a.stateNode.containerInfo,Fn=!0,ea(t,n,a),Qt=r,Fn=u;break;case 0:case 11:case 14:case 15:Ua(2,a,n),un||Ua(4,a,n),ea(t,n,a);break;case 1:un||(Ui(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&lm(a,n,r)),ea(t,n,a);break;case 21:ea(t,n,a);break;case 22:un=(r=un)||a.memoizedState!==null,ea(t,n,a),un=r;break;default:ea(t,n,a)}}function xm(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{cr(t)}catch(a){Bt(n,n.return,a)}}}function gm(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{cr(t)}catch(a){Bt(n,n.return,a)}}function Yv(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new hm),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new hm),n;default:throw Error(s(435,t.tag))}}function zl(t,n){var a=Yv(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var u=nS.bind(null,t,r);r.then(u,u)}})}function In(t,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var u=a[r],f=t,S=n,A=S;e:for(;A!==null;){switch(A.tag){case 27:if(Fa(A.type)){Qt=A.stateNode,Fn=!1;break e}break;case 5:Qt=A.stateNode,Fn=!1;break e;case 3:case 4:Qt=A.stateNode.containerInfo,Fn=!0;break e}A=A.return}if(Qt===null)throw Error(s(160));mm(f,S,u),Qt=null,Fn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)_m(n,t),n=n.sibling}var yi=null;function _m(t,n){var a=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:In(n,t),Hn(t),r&4&&(Ua(3,t,t.return),fo(3,t),Ua(5,t,t.return));break;case 1:In(n,t),Hn(t),r&512&&(un||a===null||Ui(a,a.return)),r&64&&$i&&(t=t.updateQueue,t!==null&&(r=t.callbacks,r!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var u=yi;if(In(n,t),Hn(t),r&512&&(un||a===null||Ui(a,a.return)),r&4){var f=a!==null?a.memoizedState:null;if(r=t.memoizedState,a===null)if(r===null)if(t.stateNode===null){e:{r=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(r){case"title":f=u.getElementsByTagName("title")[0],(!f||f[ns]||f[rn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(r),u.head.insertBefore(f,u.querySelector("head > title"))),Rn(f,r,a),f[rn]=t,ee(f),r=f;break e;case"link":var S=_x("link","href",u).get(r+(a.href||""));if(S){for(var A=0;A<S.length;A++)if(f=S[A],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){S.splice(A,1);break t}}f=u.createElement(r),Rn(f,r,a),u.head.appendChild(f);break;case"meta":if(S=_x("meta","content",u).get(r+(a.content||""))){for(A=0;A<S.length;A++)if(f=S[A],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){S.splice(A,1);break t}}f=u.createElement(r),Rn(f,r,a),u.head.appendChild(f);break;default:throw Error(s(468,r))}f[rn]=t,ee(f),r=f}t.stateNode=r}else vx(u,t.type,t.stateNode);else t.stateNode=gx(u,r,t.memoizedProps);else f!==r?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,r===null?vx(u,t.type,t.stateNode):gx(u,r,t.memoizedProps)):r===null&&t.stateNode!==null&&Mf(t,t.memoizedProps,a.memoizedProps)}break;case 27:In(n,t),Hn(t),r&512&&(un||a===null||Ui(a,a.return)),a!==null&&r&4&&Mf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(In(n,t),Hn(t),r&512&&(un||a===null||Ui(a,a.return)),t.flags&32){u=t.stateNode;try{Ci(u,"")}catch(Ie){Bt(t,t.return,Ie)}}r&4&&t.stateNode!=null&&(u=t.memoizedProps,Mf(t,u,a!==null?a.memoizedProps:u)),r&1024&&(Tf=!0);break;case 6:if(In(n,t),Hn(t),r&4){if(t.stateNode===null)throw Error(s(162));r=t.memoizedProps,a=t.stateNode;try{a.nodeValue=r}catch(Ie){Bt(t,t.return,Ie)}}break;case 3:if(Jl=null,u=yi,yi=Kl(n.containerInfo),In(n,t),yi=u,Hn(t),r&4&&a!==null&&a.memoizedState.isDehydrated)try{cr(n.containerInfo)}catch(Ie){Bt(t,t.return,Ie)}Tf&&(Tf=!1,vm(t));break;case 4:r=yi,yi=Kl(t.stateNode.containerInfo),In(n,t),Hn(t),yi=r;break;case 12:In(n,t),Hn(t);break;case 31:In(n,t),Hn(t),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,zl(t,r)));break;case 13:In(n,t),Hn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Fl=E()),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,zl(t,r)));break;case 22:u=t.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,$=$i,fe=un;if($i=$||u,un=fe||z,In(n,t),un=fe,$i=$,Hn(t),r&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||$i||un||gs(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(f=z.stateNode,u)S=f.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{A=z.stateNode;var me=z.memoizedProps.style,te=me!=null&&me.hasOwnProperty("display")?me.display:null;A.style.display=te==null||typeof te=="boolean"?"":(""+te).trim()}}catch(Ie){Bt(z,z.return,Ie)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(Ie){Bt(z,z.return,Ie)}}}else if(n.tag===18){if(a===null){z=n;try{var oe=z.stateNode;u?lx(oe,!0):lx(z.stateNode,!1)}catch(Ie){Bt(z,z.return,Ie)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=t.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,zl(t,a))));break;case 19:In(n,t),Hn(t),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,zl(t,r)));break;case 30:break;case 21:break;default:In(n,t),Hn(t)}}function Hn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(um(r)){a=r;break}r=r.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=bf(t);Pl(t,f,u);break;case 5:var S=a.stateNode;a.flags&32&&(Ci(S,""),a.flags&=-33);var A=bf(t);Pl(t,A,S);break;case 3:case 4:var z=a.stateNode.containerInfo,$=bf(t);Ef(t,$,z);break;default:throw Error(s(161))}}catch(fe){Bt(t,t.return,fe)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function vm(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;vm(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function ta(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)dm(t,n.alternate,n),n=n.sibling}function gs(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Ua(4,n,n.return),gs(n);break;case 1:Ui(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&lm(n,n.return,a),gs(n);break;case 27:Mo(n.stateNode);case 26:case 5:Ui(n,n.return),gs(n);break;case 22:n.memoizedState===null&&gs(n);break;case 30:gs(n);break;default:gs(n)}t=t.sibling}}function na(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,u=t,f=n,S=f.flags;switch(f.tag){case 0:case 11:case 15:na(u,f,a),fo(4,f);break;case 1:if(na(u,f,a),r=f,u=r.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch($){Bt(r,r.return,$)}if(r=f,u=r.updateQueue,u!==null){var A=r.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)Kp(z[u],A)}catch($){Bt(r,r.return,$)}}a&&S&64&&om(f),ho(f,f.return);break;case 27:fm(f);case 26:case 5:na(u,f,a),a&&r===null&&S&4&&cm(f),ho(f,f.return);break;case 12:na(u,f,a);break;case 31:na(u,f,a),a&&S&4&&xm(u,f);break;case 13:na(u,f,a),a&&S&4&&gm(u,f);break;case 22:f.memoizedState===null&&na(u,f,a),ho(f,f.return);break;case 30:break;default:na(u,f,a)}n=n.sibling}}function Af(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Jr(a))}function Rf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Jr(t))}function Mi(t,n,a,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Sm(t,n,a,r),n=n.sibling}function Sm(t,n,a,r){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Mi(t,n,a,r),u&2048&&fo(9,n);break;case 1:Mi(t,n,a,r);break;case 3:Mi(t,n,a,r),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Jr(t)));break;case 12:if(u&2048){Mi(t,n,a,r),t=n.stateNode;try{var f=n.memoizedProps,S=f.id,A=f.onPostCommit;typeof A=="function"&&A(S,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(z){Bt(n,n.return,z)}}else Mi(t,n,a,r);break;case 31:Mi(t,n,a,r);break;case 13:Mi(t,n,a,r);break;case 23:break;case 22:f=n.stateNode,S=n.alternate,n.memoizedState!==null?f._visibility&2?Mi(t,n,a,r):po(t,n):f._visibility&2?Mi(t,n,a,r):(f._visibility|=2,Js(t,n,a,r,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Af(S,n);break;case 24:Mi(t,n,a,r),u&2048&&Rf(n.alternate,n);break;default:Mi(t,n,a,r)}}function Js(t,n,a,r,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,S=n,A=a,z=r,$=S.flags;switch(S.tag){case 0:case 11:case 15:Js(f,S,A,z,u),fo(8,S);break;case 23:break;case 22:var fe=S.stateNode;S.memoizedState!==null?fe._visibility&2?Js(f,S,A,z,u):po(f,S):(fe._visibility|=2,Js(f,S,A,z,u)),u&&$&2048&&Af(S.alternate,S);break;case 24:Js(f,S,A,z,u),u&&$&2048&&Rf(S.alternate,S);break;default:Js(f,S,A,z,u)}n=n.sibling}}function po(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,u=r.flags;switch(r.tag){case 22:po(a,r),u&2048&&Af(r.alternate,r);break;case 24:po(a,r),u&2048&&Rf(r.alternate,r);break;default:po(a,r)}n=n.sibling}}var mo=8192;function $s(t,n,a){if(t.subtreeFlags&mo)for(t=t.child;t!==null;)ym(t,n,a),t=t.sibling}function ym(t,n,a){switch(t.tag){case 26:$s(t,n,a),t.flags&mo&&t.memoizedState!==null&&LS(a,yi,t.memoizedState,t.memoizedProps);break;case 5:$s(t,n,a);break;case 3:case 4:var r=yi;yi=Kl(t.stateNode.containerInfo),$s(t,n,a),yi=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=mo,mo=16777216,$s(t,n,a),mo=r):$s(t,n,a));break;default:$s(t,n,a)}}function Mm(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function xo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];yn=r,Em(r,t)}Mm(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)bm(t),t=t.sibling}function bm(t){switch(t.tag){case 0:case 11:case 15:xo(t),t.flags&2048&&Ua(9,t,t.return);break;case 3:xo(t);break;case 12:xo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Bl(t)):xo(t);break;default:xo(t)}}function Bl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];yn=r,Em(r,t)}Mm(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Ua(8,n,n.return),Bl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Bl(n));break;default:Bl(n)}t=t.sibling}}function Em(t,n){for(;yn!==null;){var a=yn;switch(a.tag){case 0:case 11:case 15:Ua(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Jr(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,yn=r;else e:for(a=t;yn!==null;){r=yn;var u=r.sibling,f=r.return;if(pm(r),r===a){yn=null;break e}if(u!==null){u.return=f,yn=u;break e}yn=f}}}var jv={getCacheForType:function(t){var n=Tn(on),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Tn(on).controller.signal}},Zv=typeof WeakMap=="function"?WeakMap:Map,Lt=0,qt=null,_t=null,St=0,zt=0,$n=null,Na=!1,er=!1,Cf=!1,ia=0,en=0,La=0,_s=0,wf=0,ei=0,tr=0,go=null,Gn=null,Df=!1,Fl=0,Tm=0,Il=1/0,Hl=null,Oa=null,mn=0,Pa=null,nr=null,aa=0,Uf=0,Nf=null,Am=null,_o=0,Lf=null;function ti(){return(Lt&2)!==0&&St!==0?St&-St:F.T!==null?If():Fr()}function Rm(){if(ei===0)if((St&536870912)===0||Tt){var t=Re;Re<<=1,(Re&3932160)===0&&(Re=262144),ei=t}else ei=536870912;return t=Qn.current,t!==null&&(t.flags|=32),ei}function Vn(t,n,a){(t===qt&&(zt===2||zt===9)||t.cancelPendingCommit!==null)&&(ir(t,0),za(t,St,ei,!1)),Cn(t,a),((Lt&2)===0||t!==qt)&&(t===qt&&((Lt&2)===0&&(_s|=a),en===4&&za(t,St,ei,!1)),Ni(t))}function Cm(t,n,a){if((Lt&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Be(t,n),u=r?Jv(t,n):Pf(t,n,!0),f=r;do{if(u===0){er&&!r&&za(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!Kv(a)){u=Pf(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var S=0;else S=t.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){n=S;e:{var A=t;u=go;var z=A.current.memoizedState.isDehydrated;if(z&&(ir(A,S).flags|=256),S=Pf(A,S,!1),S!==2){if(Cf&&!z){A.errorRecoveryDisabledLanes|=f,_s|=f,u=4;break e}f=Gn,Gn=u,f!==null&&(Gn===null?Gn=f:Gn.push.apply(Gn,f))}u=S}if(f=!1,u!==2)continue}}if(u===1){ir(t,0),za(t,n,0,!0);break}e:{switch(r=t,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:za(r,n,ei,!Na);break e;case 2:Gn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Fl+300-E(),10<u)){if(za(r,n,ei,!Na),ge(r,0,!0)!==0)break e;aa=n,r.timeoutHandle=sx(wm.bind(null,r,a,Gn,Hl,Df,n,ei,_s,tr,Na,f,"Throttled",-0,0),u);break e}wm(r,a,Gn,Hl,Df,n,ei,_s,tr,Na,f,null,-0,0)}}break}while(!0);Ni(t)}function wm(t,n,a,r,u,f,S,A,z,$,fe,me,te,oe){if(t.timeoutHandle=-1,me=n.subtreeFlags,me&8192||(me&16785408)===16785408){me={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ki},ym(n,f,me);var Ie=(f&62914560)===f?Fl-E():(f&4194048)===f?Tm-E():0;if(Ie=OS(me,Ie),Ie!==null){aa=f,t.cancelPendingCommit=Ie(Bm.bind(null,t,n,f,a,r,u,S,A,z,fe,me,null,te,oe)),za(t,f,S,!$);return}}Bm(t,n,f,a,r,u,S,A,z)}function Kv(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var u=a[r],f=u.getSnapshot;u=u.value;try{if(!Zn(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function za(t,n,a,r){n&=~wf,n&=~_s,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var u=n;0<u;){var f=31-Ve(u),S=1<<f;r[f]=-1,u&=~S}a!==0&&Jo(t,a,n)}function Gl(){return(Lt&6)===0?(vo(0),!1):!0}function Of(){if(_t!==null){if(zt===0)var t=_t.return;else t=_t,Yi=cs=null,Zu(t),Ys=null,eo=0,t=_t;for(;t!==null;)rm(t.alternate,t),t=t.return;_t=null}}function ir(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,xS(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),aa=0,Of(),qt=t,_t=a=Wi(t.current,null),St=n,zt=0,$n=null,Na=!1,er=Be(t,n),Cf=!1,tr=ei=wf=_s=La=en=0,Gn=go=null,Df=!1,(n&8)!==0&&(n|=n&32);var r=t.entangledLanes;if(r!==0)for(t=t.entanglements,r&=n;0<r;){var u=31-Ve(r),f=1<<u;n|=t[u],r&=~f}return ia=n,ll(),a}function Dm(t,n){ct=null,F.H=lo,n===qs||n===xl?(n=qp(),zt=3):n===Bu?(n=qp(),zt=4):zt=n===hf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,$n=n,_t===null&&(en=1,Dl(t,oi(n,t.current)))}function Um(){var t=Qn.current;return t===null?!0:(St&4194048)===St?fi===null:(St&62914560)===St||(St&536870912)!==0?t===fi:!1}function Nm(){var t=F.H;return F.H=lo,t===null?lo:t}function Lm(){var t=F.A;return F.A=jv,t}function Vl(){en=4,Na||(St&4194048)!==St&&Qn.current!==null||(er=!0),(La&134217727)===0&&(_s&134217727)===0||qt===null||za(qt,St,ei,!1)}function Pf(t,n,a){var r=Lt;Lt|=2;var u=Nm(),f=Lm();(qt!==t||St!==n)&&(Hl=null,ir(t,n)),n=!1;var S=en;e:do try{if(zt!==0&&_t!==null){var A=_t,z=$n;switch(zt){case 8:Of(),S=6;break e;case 3:case 2:case 9:case 6:Qn.current===null&&(n=!0);var $=zt;if(zt=0,$n=null,ar(t,A,z,$),a&&er){S=0;break e}break;default:$=zt,zt=0,$n=null,ar(t,A,z,$)}}Qv(),S=en;break}catch(fe){Dm(t,fe)}while(!0);return n&&t.shellSuspendCounter++,Yi=cs=null,Lt=r,F.H=u,F.A=f,_t===null&&(qt=null,St=0,ll()),S}function Qv(){for(;_t!==null;)Om(_t)}function Jv(t,n){var a=Lt;Lt|=2;var r=Nm(),u=Lm();qt!==t||St!==n?(Hl=null,Il=E()+500,ir(t,n)):er=Be(t,n);e:do try{if(zt!==0&&_t!==null){n=_t;var f=$n;t:switch(zt){case 1:zt=0,$n=null,ar(t,n,f,1);break;case 2:case 9:if(Xp(f)){zt=0,$n=null,Pm(n);break}n=function(){zt!==2&&zt!==9||qt!==t||(zt=7),Ni(t)},f.then(n,n);break e;case 3:zt=7;break e;case 4:zt=5;break e;case 7:Xp(f)?(zt=0,$n=null,Pm(n)):(zt=0,$n=null,ar(t,n,f,7));break;case 5:var S=null;switch(_t.tag){case 26:S=_t.memoizedState;case 5:case 27:var A=_t;if(S?Sx(S):A.stateNode.complete){zt=0,$n=null;var z=A.sibling;if(z!==null)_t=z;else{var $=A.return;$!==null?(_t=$,kl($)):_t=null}break t}}zt=0,$n=null,ar(t,n,f,5);break;case 6:zt=0,$n=null,ar(t,n,f,6);break;case 8:Of(),en=6;break e;default:throw Error(s(462))}}$v();break}catch(fe){Dm(t,fe)}while(!0);return Yi=cs=null,F.H=r,F.A=u,Lt=a,_t!==null?0:(qt=null,St=0,ll(),en)}function $v(){for(;_t!==null&&!at();)Om(_t)}function Om(t){var n=am(t.alternate,t,ia);t.memoizedProps=t.pendingProps,n===null?kl(t):_t=n}function Pm(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=J0(a,n,n.pendingProps,n.type,void 0,St);break;case 11:n=J0(a,n,n.pendingProps,n.type.render,n.ref,St);break;case 5:Zu(n);default:rm(a,n),n=_t=Lp(n,ia),n=am(a,n,ia)}t.memoizedProps=t.pendingProps,n===null?kl(t):_t=n}function ar(t,n,a,r){Yi=cs=null,Zu(n),Ys=null,eo=0;var u=n.return;try{if(Gv(t,u,n,a,St)){en=1,Dl(t,oi(a,t.current)),_t=null;return}}catch(f){if(u!==null)throw _t=u,f;en=1,Dl(t,oi(a,t.current)),_t=null;return}n.flags&32768?(Tt||r===1?t=!0:er||(St&536870912)!==0?t=!1:(Na=t=!0,(r===2||r===9||r===3||r===6)&&(r=Qn.current,r!==null&&r.tag===13&&(r.flags|=16384))),zm(n,t)):kl(n)}function kl(t){var n=t;do{if((n.flags&32768)!==0){zm(n,Na);return}t=n.return;var a=Xv(n.alternate,n,ia);if(a!==null){_t=a;return}if(n=n.sibling,n!==null){_t=n;return}_t=n=t}while(n!==null);en===0&&(en=5)}function zm(t,n){do{var a=Wv(t.alternate,t);if(a!==null){a.flags&=32767,_t=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){_t=t;return}_t=t=a}while(t!==null);en=6,_t=null}function Bm(t,n,a,r,u,f,S,A,z){t.cancelPendingCommit=null;do Xl();while(mn!==0);if((Lt&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=Mu,Yn(t,a,f,S,A,z),t===qt&&(_t=qt=null,St=0),nr=n,Pa=t,aa=a,Uf=f,Nf=u,Am=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,iS(le,function(){return Vm(),null})):(t.callbackNode=null,t.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=F.T,F.T=null,u=j.p,j.p=2,S=Lt,Lt|=4;try{qv(t,n,a)}finally{Lt=S,j.p=u,F.T=r}}mn=1,Fm(),Im(),Hm()}}function Fm(){if(mn===1){mn=0;var t=Pa,n=nr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=F.T,F.T=null;var r=j.p;j.p=2;var u=Lt;Lt|=4;try{_m(n,t);var f=Yf,S=Ep(t.containerInfo),A=f.focusedElem,z=f.selectionRange;if(S!==A&&A&&A.ownerDocument&&bp(A.ownerDocument.documentElement,A)){if(z!==null&&gu(A)){var $=z.start,fe=z.end;if(fe===void 0&&(fe=$),"selectionStart"in A)A.selectionStart=$,A.selectionEnd=Math.min(fe,A.value.length);else{var me=A.ownerDocument||document,te=me&&me.defaultView||window;if(te.getSelection){var oe=te.getSelection(),Ie=A.textContent.length,et=Math.min(z.start,Ie),Vt=z.end===void 0?et:Math.min(z.end,Ie);!oe.extend&&et>Vt&&(S=Vt,Vt=et,et=S);var W=Mp(A,et),G=Mp(A,Vt);if(W&&G&&(oe.rangeCount!==1||oe.anchorNode!==W.node||oe.anchorOffset!==W.offset||oe.focusNode!==G.node||oe.focusOffset!==G.offset)){var Q=me.createRange();Q.setStart(W.node,W.offset),oe.removeAllRanges(),et>Vt?(oe.addRange(Q),oe.extend(G.node,G.offset)):(Q.setEnd(G.node,G.offset),oe.addRange(Q))}}}}for(me=[],oe=A;oe=oe.parentNode;)oe.nodeType===1&&me.push({element:oe,left:oe.scrollLeft,top:oe.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<me.length;A++){var de=me[A];de.element.scrollLeft=de.left,de.element.scrollTop=de.top}}nc=!!qf,Yf=qf=null}finally{Lt=u,j.p=r,F.T=a}}t.current=n,mn=2}}function Im(){if(mn===2){mn=0;var t=Pa,n=nr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=F.T,F.T=null;var r=j.p;j.p=2;var u=Lt;Lt|=4;try{dm(t,n.alternate,n)}finally{Lt=u,j.p=r,F.T=a}}mn=3}}function Hm(){if(mn===4||mn===3){mn=0,U();var t=Pa,n=nr,a=aa,r=Am;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?mn=5:(mn=0,nr=Pa=null,Gm(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Oa=null),ts(a),n=n.stateNode,Ee&&typeof Ee.onCommitFiberRoot=="function")try{Ee.onCommitFiberRoot(ye,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=F.T,u=j.p,j.p=2,F.T=null;try{for(var f=t.onRecoverableError,S=0;S<r.length;S++){var A=r[S];f(A.value,{componentStack:A.stack})}}finally{F.T=n,j.p=u}}(aa&3)!==0&&Xl(),Ni(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Lf?_o++:(_o=0,Lf=t):_o=0,vo(0)}}function Gm(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Jr(n)))}function Xl(){return Fm(),Im(),Hm(),Vm()}function Vm(){if(mn!==5)return!1;var t=Pa,n=Uf;Uf=0;var a=ts(aa),r=F.T,u=j.p;try{j.p=32>a?32:a,F.T=null,a=Nf,Nf=null;var f=Pa,S=aa;if(mn=0,nr=Pa=null,aa=0,(Lt&6)!==0)throw Error(s(331));var A=Lt;if(Lt|=4,bm(f.current),Sm(f,f.current,S,a),Lt=A,vo(0,!1),Ee&&typeof Ee.onPostCommitFiberRoot=="function")try{Ee.onPostCommitFiberRoot(ye,f)}catch{}return!0}finally{j.p=u,F.T=r,Gm(t,n)}}function km(t,n,a){n=oi(a,n),n=ff(t.stateNode,n,2),t=Ca(t,n,2),t!==null&&(Cn(t,2),Ni(t))}function Bt(t,n,a){if(t.tag===3)km(t,t,a);else for(;n!==null;){if(n.tag===3){km(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Oa===null||!Oa.has(r))){t=oi(a,t),a=X0(2),r=Ca(n,a,2),r!==null&&(W0(a,r,n,t),Cn(r,2),Ni(r));break}}n=n.return}}function zf(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new Zv;var u=new Set;r.set(n,u)}else u=r.get(n),u===void 0&&(u=new Set,r.set(n,u));u.has(a)||(Cf=!0,u.add(a),t=eS.bind(null,t,n,a),n.then(t,t))}function eS(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,qt===t&&(St&a)===a&&(en===4||en===3&&(St&62914560)===St&&300>E()-Fl?(Lt&2)===0&&ir(t,0):wf|=a,tr===St&&(tr=0)),Ni(t)}function Xm(t,n){n===0&&(n=It()),t=rs(t,n),t!==null&&(Cn(t,n),Ni(t))}function tS(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),Xm(t,a)}function nS(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),Xm(t,a)}function iS(t,n){return Xt(t,n)}var Wl=null,sr=null,Bf=!1,ql=!1,Ff=!1,Ba=0;function Ni(t){t!==sr&&t.next===null&&(sr===null?Wl=sr=t:sr=sr.next=t),ql=!0,Bf||(Bf=!0,sS())}function vo(t,n){if(!Ff&&ql){Ff=!0;do for(var a=!1,r=Wl;r!==null;){if(t!==0){var u=r.pendingLanes;if(u===0)var f=0;else{var S=r.suspendedLanes,A=r.pingedLanes;f=(1<<31-Ve(42|t)+1)-1,f&=u&~(S&~A),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,jm(r,f))}else f=St,f=ge(r,r===qt?f:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(f&3)===0||Be(r,f)||(a=!0,jm(r,f));r=r.next}while(a);Ff=!1}}function aS(){Wm()}function Wm(){ql=Bf=!1;var t=0;Ba!==0&&mS()&&(t=Ba);for(var n=E(),a=null,r=Wl;r!==null;){var u=r.next,f=qm(r,n);f===0?(r.next=null,a===null?Wl=u:a.next=u,u===null&&(sr=a)):(a=r,(t!==0||(f&3)!==0)&&(ql=!0)),r=u}mn!==0&&mn!==5||vo(t),Ba!==0&&(Ba=0)}function qm(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var S=31-Ve(f),A=1<<S,z=u[S];z===-1?((A&a)===0||(A&r)!==0)&&(u[S]=it(A,n)):z<=n&&(t.expiredLanes|=A),f&=~A}if(n=qt,a=St,a=ge(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(zt===2||zt===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&je(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Be(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&je(r),ts(a)){case 2:case 8:a=Se;break;case 32:a=le;break;case 268435456:a=Ne;break;default:a=le}return r=Ym.bind(null,t),a=Xt(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&je(r),t.callbackPriority=2,t.callbackNode=null,2}function Ym(t,n){if(mn!==0&&mn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Xl()&&t.callbackNode!==a)return null;var r=St;return r=ge(t,t===qt?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(Cm(t,r,n),qm(t,E()),t.callbackNode!=null&&t.callbackNode===a?Ym.bind(null,t):null)}function jm(t,n){if(Xl())return null;Cm(t,n,!0)}function sS(){gS(function(){(Lt&6)!==0?Xt(pe,aS):Wm()})}function If(){if(Ba===0){var t=Xs;t===0&&(t=De,De<<=1,(De&261888)===0&&(De=256)),Ba=t}return Ba}function Zm(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:el(""+t)}function Km(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function rS(t,n,a,r,u){if(n==="submit"&&a&&a.stateNode===u){var f=Zm((u[dn]||null).action),S=r.submitter;S&&(n=(n=S[dn]||null)?Zm(n.formAction):S.getAttribute("formAction"),n!==null&&(f=n,S=null));var A=new al("action","action",null,r,u);t.push({event:A,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Ba!==0){var z=S?Km(u,S):new FormData(u);sf(a,{pending:!0,data:z,method:u.method,action:f},null,z)}}else typeof f=="function"&&(A.preventDefault(),z=S?Km(u,S):new FormData(u),sf(a,{pending:!0,data:z,method:u.method,action:f},f,z))},currentTarget:u}]})}}for(var Hf=0;Hf<yu.length;Hf++){var Gf=yu[Hf],oS=Gf.toLowerCase(),lS=Gf[0].toUpperCase()+Gf.slice(1);Si(oS,"on"+lS)}Si(Rp,"onAnimationEnd"),Si(Cp,"onAnimationIteration"),Si(wp,"onAnimationStart"),Si("dblclick","onDoubleClick"),Si("focusin","onFocus"),Si("focusout","onBlur"),Si(Ev,"onTransitionRun"),Si(Tv,"onTransitionStart"),Si(Av,"onTransitionCancel"),Si(Dp,"onTransitionEnd"),ze("onMouseEnter",["mouseout","mouseover"]),ze("onMouseLeave",["mouseout","mouseover"]),ze("onPointerEnter",["pointerout","pointerover"]),ze("onPointerLeave",["pointerout","pointerover"]),Ue("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ue("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ue("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ue("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ue("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ue("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var So="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(So));function Qm(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],u=r.event;r=r.listeners;e:{var f=void 0;if(n)for(var S=r.length-1;0<=S;S--){var A=r[S],z=A.instance,$=A.currentTarget;if(A=A.listener,z!==f&&u.isPropagationStopped())break e;f=A,u.currentTarget=$;try{f(u)}catch(fe){ol(fe)}u.currentTarget=null,f=z}else for(S=0;S<r.length;S++){if(A=r[S],z=A.instance,$=A.currentTarget,A=A.listener,z!==f&&u.isPropagationStopped())break e;f=A,u.currentTarget=$;try{f(u)}catch(fe){ol(fe)}u.currentTarget=null,f=z}}}}function vt(t,n){var a=n[Ns];a===void 0&&(a=n[Ns]=new Set);var r=t+"__bubble";a.has(r)||(Jm(n,t,2,!1),a.add(r))}function Vf(t,n,a){var r=0;n&&(r|=4),Jm(a,t,r,n)}var Yl="_reactListening"+Math.random().toString(36).slice(2);function kf(t){if(!t[Yl]){t[Yl]=!0,q.forEach(function(a){a!=="selectionchange"&&(cS.has(a)||Vf(a,!1,t),Vf(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Yl]||(n[Yl]=!0,Vf("selectionchange",!1,n))}}function Jm(t,n,a,r){switch(Rx(n)){case 2:var u=BS;break;case 8:u=FS;break;default:u=ah}a=u.bind(null,n,a,t),u=void 0,!lu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),r?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function Xf(t,n,a,r,u){var f=r;if((n&1)===0&&(n&2)===0&&r!==null)e:for(;;){if(r===null)return;var S=r.tag;if(S===3||S===4){var A=r.stateNode.containerInfo;if(A===u)break;if(S===4)for(S=r.return;S!==null;){var z=S.tag;if((z===3||z===4)&&S.stateNode.containerInfo===u)return;S=S.return}for(;A!==null;){if(S=va(A),S===null)return;if(z=S.tag,z===5||z===6||z===26||z===27){r=f=S;continue e}A=A.parentNode}}r=r.return}ip(function(){var $=f,fe=ru(a),me=[];e:{var te=Up.get(t);if(te!==void 0){var oe=al,Ie=t;switch(t){case"keypress":if(nl(a)===0)break e;case"keydown":case"keyup":oe=nv;break;case"focusin":Ie="focus",oe=hu;break;case"focusout":Ie="blur",oe=hu;break;case"beforeblur":case"afterblur":oe=hu;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":oe=rp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":oe=X_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":oe=sv;break;case Rp:case Cp:case wp:oe=Y_;break;case Dp:oe=ov;break;case"scroll":case"scrollend":oe=V_;break;case"wheel":oe=cv;break;case"copy":case"cut":case"paste":oe=Z_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":oe=lp;break;case"toggle":case"beforetoggle":oe=fv}var et=(n&4)!==0,Vt=!et&&(t==="scroll"||t==="scrollend"),W=et?te!==null?te+"Capture":null:te;et=[];for(var G=$,Q;G!==null;){var de=G;if(Q=de.stateNode,de=de.tag,de!==5&&de!==26&&de!==27||Q===null||W===null||(de=Gr(G,W),de!=null&&et.push(yo(G,de,Q))),Vt)break;G=G.return}0<et.length&&(te=new oe(te,Ie,null,a,fe),me.push({event:te,listeners:et}))}}if((n&7)===0){e:{if(te=t==="mouseover"||t==="pointerover",oe=t==="mouseout"||t==="pointerout",te&&a!==su&&(Ie=a.relatedTarget||a.fromElement)&&(va(Ie)||Ie[Hi]))break e;if((oe||te)&&(te=fe.window===fe?fe:(te=fe.ownerDocument)?te.defaultView||te.parentWindow:window,oe?(Ie=a.relatedTarget||a.toElement,oe=$,Ie=Ie?va(Ie):null,Ie!==null&&(Vt=c(Ie),et=Ie.tag,Ie!==Vt||et!==5&&et!==27&&et!==6)&&(Ie=null)):(oe=null,Ie=$),oe!==Ie)){if(et=rp,de="onMouseLeave",W="onMouseEnter",G="mouse",(t==="pointerout"||t==="pointerover")&&(et=lp,de="onPointerLeave",W="onPointerEnter",G="pointer"),Vt=oe==null?te:X(oe),Q=Ie==null?te:X(Ie),te=new et(de,G+"leave",oe,a,fe),te.target=Vt,te.relatedTarget=Q,de=null,va(fe)===$&&(et=new et(W,G+"enter",Ie,a,fe),et.target=Q,et.relatedTarget=Vt,de=et),Vt=de,oe&&Ie)t:{for(et=uS,W=oe,G=Ie,Q=0,de=W;de;de=et(de))Q++;de=0;for(var Ke=G;Ke;Ke=et(Ke))de++;for(;0<Q-de;)W=et(W),Q--;for(;0<de-Q;)G=et(G),de--;for(;Q--;){if(W===G||G!==null&&W===G.alternate){et=W;break t}W=et(W),G=et(G)}et=null}else et=null;oe!==null&&$m(me,te,oe,et,!1),Ie!==null&&Vt!==null&&$m(me,Vt,Ie,et,!0)}}e:{if(te=$?X($):window,oe=te.nodeName&&te.nodeName.toLowerCase(),oe==="select"||oe==="input"&&te.type==="file")var Ut=xp;else if(pp(te))if(gp)Ut=yv;else{Ut=vv;var ke=_v}else oe=te.nodeName,!oe||oe.toLowerCase()!=="input"||te.type!=="checkbox"&&te.type!=="radio"?$&&au($.elementType)&&(Ut=xp):Ut=Sv;if(Ut&&(Ut=Ut(t,$))){mp(me,Ut,a,fe);break e}ke&&ke(t,te,$),t==="focusout"&&$&&te.type==="number"&&$.memoizedProps.value!=null&&vn(te,"number",te.value)}switch(ke=$?X($):window,t){case"focusin":(pp(ke)||ke.contentEditable==="true")&&(zs=ke,_u=$,Zr=null);break;case"focusout":Zr=_u=zs=null;break;case"mousedown":vu=!0;break;case"contextmenu":case"mouseup":case"dragend":vu=!1,Tp(me,a,fe);break;case"selectionchange":if(bv)break;case"keydown":case"keyup":Tp(me,a,fe)}var ht;if(pu)e:{switch(t){case"compositionstart":var yt="onCompositionStart";break e;case"compositionend":yt="onCompositionEnd";break e;case"compositionupdate":yt="onCompositionUpdate";break e}yt=void 0}else Ps?hp(t,a)&&(yt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(yt="onCompositionStart");yt&&(cp&&a.locale!=="ko"&&(Ps||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&Ps&&(ht=ap()):(ya=fe,cu="value"in ya?ya.value:ya.textContent,Ps=!0)),ke=jl($,yt),0<ke.length&&(yt=new op(yt,t,null,a,fe),me.push({event:yt,listeners:ke}),ht?yt.data=ht:(ht=dp(a),ht!==null&&(yt.data=ht)))),(ht=dv?pv(t,a):mv(t,a))&&(yt=jl($,"onBeforeInput"),0<yt.length&&(ke=new op("onBeforeInput","beforeinput",null,a,fe),me.push({event:ke,listeners:yt}),ke.data=ht)),rS(me,t,$,a,fe)}Qm(me,n)})}function yo(t,n,a){return{instance:t,listener:n,currentTarget:a}}function jl(t,n){for(var a=n+"Capture",r=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Gr(t,a),u!=null&&r.unshift(yo(t,u,f)),u=Gr(t,n),u!=null&&r.push(yo(t,u,f))),t.tag===3)return r;t=t.return}return[]}function uS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function $m(t,n,a,r,u){for(var f=n._reactName,S=[];a!==null&&a!==r;){var A=a,z=A.alternate,$=A.stateNode;if(A=A.tag,z!==null&&z===r)break;A!==5&&A!==26&&A!==27||$===null||(z=$,u?($=Gr(a,f),$!=null&&S.unshift(yo(a,$,z))):u||($=Gr(a,f),$!=null&&S.push(yo(a,$,z)))),a=a.return}S.length!==0&&t.push({event:n,listeners:S})}var fS=/\r\n?/g,hS=/\u0000|\uFFFD/g;function ex(t){return(typeof t=="string"?t:""+t).replace(fS,`
`).replace(hS,"")}function tx(t,n){return n=ex(n),ex(t)===n}function Gt(t,n,a,r,u,f){switch(a){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||Ci(t,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&Ci(t,""+r);break;case"className":At(t,"class",r);break;case"tabIndex":At(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":At(t,a,r);break;case"style":tp(t,r,f);break;case"data":if(n!=="object"){At(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=el(""+r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Gt(t,n,"name",u.name,u,null),Gt(t,n,"formEncType",u.formEncType,u,null),Gt(t,n,"formMethod",u.formMethod,u,null),Gt(t,n,"formTarget",u.formTarget,u,null)):(Gt(t,n,"encType",u.encType,u,null),Gt(t,n,"method",u.method,u,null),Gt(t,n,"target",u.target,u,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=el(""+r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=ki);break;case"onScroll":r!=null&&vt("scroll",t);break;case"onScrollEnd":r!=null&&vt("scrollend",t);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=el(""+r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""+r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":vt("beforetoggle",t),vt("toggle",t),ft(t,"popover",r);break;case"xlinkActuate":Dt(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Dt(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Dt(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Dt(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Dt(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Dt(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Dt(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Dt(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Dt(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":ft(t,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=H_.get(a)||a,ft(t,a,r))}}function Wf(t,n,a,r,u,f){switch(a){case"style":tp(t,r,f);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof r=="string"?Ci(t,r):(typeof r=="number"||typeof r=="bigint")&&Ci(t,""+r);break;case"onScroll":r!=null&&vt("scroll",t);break;case"onScrollEnd":r!=null&&vt("scrollend",t);break;case"onClick":r!=null&&(t.onclick=ki);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ae.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=t[dn]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,u),typeof r=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,r,u);break e}a in t?t[a]=r:r===!0?t.setAttribute(a,""):ft(t,a,r)}}}function Rn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":vt("error",t),vt("load",t);var r=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var S=a[f];if(S!=null)switch(f){case"src":r=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Gt(t,n,f,S,a,null)}}u&&Gt(t,n,"srcSet",a.srcSet,a,null),r&&Gt(t,n,"src",a.src,a,null);return;case"input":vt("invalid",t);var A=f=S=u=null,z=null,$=null;for(r in a)if(a.hasOwnProperty(r)){var fe=a[r];if(fe!=null)switch(r){case"name":u=fe;break;case"type":S=fe;break;case"checked":z=fe;break;case"defaultChecked":$=fe;break;case"value":f=fe;break;case"defaultValue":A=fe;break;case"children":case"dangerouslySetInnerHTML":if(fe!=null)throw Error(s(137,n));break;default:Gt(t,n,r,fe,a,null)}}jt(t,f,A,z,$,S,u,!1);return;case"select":vt("invalid",t),r=S=f=null;for(u in a)if(a.hasOwnProperty(u)&&(A=a[u],A!=null))switch(u){case"value":f=A;break;case"defaultValue":S=A;break;case"multiple":r=A;default:Gt(t,n,u,A,a,null)}n=f,a=S,t.multiple=!!r,n!=null?pn(t,!!r,n,!1):a!=null&&pn(t,!!r,a,!0);return;case"textarea":vt("invalid",t),f=u=r=null;for(S in a)if(a.hasOwnProperty(S)&&(A=a[S],A!=null))switch(S){case"value":r=A;break;case"defaultValue":u=A;break;case"children":f=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(s(91));break;default:Gt(t,n,S,A,a,null)}bn(t,r,u,f);return;case"option":for(z in a)if(a.hasOwnProperty(z)&&(r=a[z],r!=null))switch(z){case"selected":t.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Gt(t,n,z,r,a,null)}return;case"dialog":vt("beforetoggle",t),vt("toggle",t),vt("cancel",t),vt("close",t);break;case"iframe":case"object":vt("load",t);break;case"video":case"audio":for(r=0;r<So.length;r++)vt(So[r],t);break;case"image":vt("error",t),vt("load",t);break;case"details":vt("toggle",t);break;case"embed":case"source":case"link":vt("error",t),vt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for($ in a)if(a.hasOwnProperty($)&&(r=a[$],r!=null))switch($){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Gt(t,n,$,r,a,null)}return;default:if(au(n)){for(fe in a)a.hasOwnProperty(fe)&&(r=a[fe],r!==void 0&&Wf(t,n,fe,r,a,void 0));return}}for(A in a)a.hasOwnProperty(A)&&(r=a[A],r!=null&&Gt(t,n,A,r,a,null))}function dS(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,S=null,A=null,z=null,$=null,fe=null;for(oe in a){var me=a[oe];if(a.hasOwnProperty(oe)&&me!=null)switch(oe){case"checked":break;case"value":break;case"defaultValue":z=me;default:r.hasOwnProperty(oe)||Gt(t,n,oe,null,r,me)}}for(var te in r){var oe=r[te];if(me=a[te],r.hasOwnProperty(te)&&(oe!=null||me!=null))switch(te){case"type":f=oe;break;case"name":u=oe;break;case"checked":$=oe;break;case"defaultChecked":fe=oe;break;case"value":S=oe;break;case"defaultValue":A=oe;break;case"children":case"dangerouslySetInnerHTML":if(oe!=null)throw Error(s(137,n));break;default:oe!==me&&Gt(t,n,te,oe,r,me)}}Gi(t,S,A,z,$,fe,f,u);return;case"select":oe=S=A=te=null;for(f in a)if(z=a[f],a.hasOwnProperty(f)&&z!=null)switch(f){case"value":break;case"multiple":oe=z;default:r.hasOwnProperty(f)||Gt(t,n,f,null,r,z)}for(u in r)if(f=r[u],z=a[u],r.hasOwnProperty(u)&&(f!=null||z!=null))switch(u){case"value":te=f;break;case"defaultValue":A=f;break;case"multiple":S=f;default:f!==z&&Gt(t,n,u,f,r,z)}n=A,a=S,r=oe,te!=null?pn(t,!!a,te,!1):!!r!=!!a&&(n!=null?pn(t,!!a,n,!0):pn(t,!!a,a?[]:"",!1));return;case"textarea":oe=te=null;for(A in a)if(u=a[A],a.hasOwnProperty(A)&&u!=null&&!r.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:Gt(t,n,A,null,r,u)}for(S in r)if(u=r[S],f=a[S],r.hasOwnProperty(S)&&(u!=null||f!=null))switch(S){case"value":te=u;break;case"defaultValue":oe=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Gt(t,n,S,u,r,f)}Sn(t,te,oe);return;case"option":for(var Ie in a)if(te=a[Ie],a.hasOwnProperty(Ie)&&te!=null&&!r.hasOwnProperty(Ie))switch(Ie){case"selected":t.selected=!1;break;default:Gt(t,n,Ie,null,r,te)}for(z in r)if(te=r[z],oe=a[z],r.hasOwnProperty(z)&&te!==oe&&(te!=null||oe!=null))switch(z){case"selected":t.selected=te&&typeof te!="function"&&typeof te!="symbol";break;default:Gt(t,n,z,te,r,oe)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var et in a)te=a[et],a.hasOwnProperty(et)&&te!=null&&!r.hasOwnProperty(et)&&Gt(t,n,et,null,r,te);for($ in r)if(te=r[$],oe=a[$],r.hasOwnProperty($)&&te!==oe&&(te!=null||oe!=null))switch($){case"children":case"dangerouslySetInnerHTML":if(te!=null)throw Error(s(137,n));break;default:Gt(t,n,$,te,r,oe)}return;default:if(au(n)){for(var Vt in a)te=a[Vt],a.hasOwnProperty(Vt)&&te!==void 0&&!r.hasOwnProperty(Vt)&&Wf(t,n,Vt,void 0,r,te);for(fe in r)te=r[fe],oe=a[fe],!r.hasOwnProperty(fe)||te===oe||te===void 0&&oe===void 0||Wf(t,n,fe,te,r,oe);return}}for(var W in a)te=a[W],a.hasOwnProperty(W)&&te!=null&&!r.hasOwnProperty(W)&&Gt(t,n,W,null,r,te);for(me in r)te=r[me],oe=a[me],!r.hasOwnProperty(me)||te===oe||te==null&&oe==null||Gt(t,n,me,te,r,oe)}function nx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function pS(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var u=a[r],f=u.transferSize,S=u.initiatorType,A=u.duration;if(f&&A&&nx(S)){for(S=0,A=u.responseEnd,r+=1;r<a.length;r++){var z=a[r],$=z.startTime;if($>A)break;var fe=z.transferSize,me=z.initiatorType;fe&&nx(me)&&(z=z.responseEnd,S+=fe*(z<A?1:(A-$)/(z-$)))}if(--r,n+=8*(f+S)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var qf=null,Yf=null;function Zl(t){return t.nodeType===9?t:t.ownerDocument}function ix(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ax(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function jf(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Zf=null;function mS(){var t=window.event;return t&&t.type==="popstate"?t===Zf?!1:(Zf=t,!0):(Zf=null,!1)}var sx=typeof setTimeout=="function"?setTimeout:void 0,xS=typeof clearTimeout=="function"?clearTimeout:void 0,rx=typeof Promise=="function"?Promise:void 0,gS=typeof queueMicrotask=="function"?queueMicrotask:typeof rx<"u"?function(t){return rx.resolve(null).then(t).catch(_S)}:sx;function _S(t){setTimeout(function(){throw t})}function Fa(t){return t==="head"}function ox(t,n){var a=n,r=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(u),cr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")Mo(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Mo(a);for(var f=a.firstChild;f;){var S=f.nextSibling,A=f.nodeName;f[ns]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=S}}else a==="body"&&Mo(t.ownerDocument.body);a=u}while(a);cr(n)}function lx(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function Kf(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Kf(a),Hr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function vS(t,n,a,r){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[ns])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=hi(t.nextSibling),t===null)break}return null}function SS(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=hi(t.nextSibling),t===null))return null;return t}function cx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=hi(t.nextSibling),t===null))return null;return t}function Qf(t){return t.data==="$?"||t.data==="$~"}function Jf(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function yS(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function hi(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var $f=null;function ux(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return hi(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function fx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function hx(t,n,a){switch(n=Zl(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Mo(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Hr(t)}var di=new Map,dx=new Set;function Kl(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var sa=j.d;j.d={f:MS,r:bS,D:ES,C:TS,L:AS,m:RS,X:wS,S:CS,M:DS};function MS(){var t=sa.f(),n=Gl();return t||n}function bS(t){var n=R(t);n!==null&&n.tag===5&&n.type==="form"?D0(n):sa.r(t)}var rr=typeof document>"u"?null:document;function px(t,n,a){var r=rr;if(r&&typeof n=="string"&&n){var u=Yt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),dx.has(u)||(dx.add(u),t={rel:t,crossOrigin:a,href:n},r.querySelector(u)===null&&(n=r.createElement("link"),Rn(n,"link",t),ee(n),r.head.appendChild(n)))}}function ES(t){sa.D(t),px("dns-prefetch",t,null)}function TS(t,n){sa.C(t,n),px("preconnect",t,n)}function AS(t,n,a){sa.L(t,n,a);var r=rr;if(r&&t&&n){var u='link[rel="preload"][as="'+Yt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Yt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Yt(a.imageSizes)+'"]')):u+='[href="'+Yt(t)+'"]';var f=u;switch(n){case"style":f=or(t);break;case"script":f=lr(t)}di.has(f)||(t=x({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),di.set(f,t),r.querySelector(u)!==null||n==="style"&&r.querySelector(bo(f))||n==="script"&&r.querySelector(Eo(f))||(n=r.createElement("link"),Rn(n,"link",t),ee(n),r.head.appendChild(n)))}}function RS(t,n){sa.m(t,n);var a=rr;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Yt(r)+'"][href="'+Yt(t)+'"]',f=u;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=lr(t)}if(!di.has(f)&&(t=x({rel:"modulepreload",href:t},n),di.set(f,t),a.querySelector(u)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Eo(f)))return}r=a.createElement("link"),Rn(r,"link",t),ee(r),a.head.appendChild(r)}}}function CS(t,n,a){sa.S(t,n,a);var r=rr;if(r&&t){var u=se(r).hoistableStyles,f=or(t);n=n||"default";var S=u.get(f);if(!S){var A={loading:0,preload:null};if(S=r.querySelector(bo(f)))A.loading=5;else{t=x({rel:"stylesheet",href:t,"data-precedence":n},a),(a=di.get(f))&&eh(t,a);var z=S=r.createElement("link");ee(z),Rn(z,"link",t),z._p=new Promise(function($,fe){z.onload=$,z.onerror=fe}),z.addEventListener("load",function(){A.loading|=1}),z.addEventListener("error",function(){A.loading|=2}),A.loading|=4,Ql(S,n,r)}S={type:"stylesheet",instance:S,count:1,state:A},u.set(f,S)}}}function wS(t,n){sa.X(t,n);var a=rr;if(a&&t){var r=se(a).hoistableScripts,u=lr(t),f=r.get(u);f||(f=a.querySelector(Eo(u)),f||(t=x({src:t,async:!0},n),(n=di.get(u))&&th(t,n),f=a.createElement("script"),ee(f),Rn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(u,f))}}function DS(t,n){sa.M(t,n);var a=rr;if(a&&t){var r=se(a).hoistableScripts,u=lr(t),f=r.get(u);f||(f=a.querySelector(Eo(u)),f||(t=x({src:t,async:!0,type:"module"},n),(n=di.get(u))&&th(t,n),f=a.createElement("script"),ee(f),Rn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(u,f))}}function mx(t,n,a,r){var u=(u=ae.current)?Kl(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=or(a.href),a=se(u).hoistableStyles,r=a.get(n),r||(r={type:"style",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=or(a.href);var f=se(u).hoistableStyles,S=f.get(t);if(S||(u=u.ownerDocument||u,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,S),(f=u.querySelector(bo(t)))&&!f._p&&(S.instance=f,S.state.loading=5),di.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},di.set(t,a),f||US(u,t,a,S.state))),n&&r===null)throw Error(s(528,""));return S}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=lr(a),a=se(u).hoistableScripts,r=a.get(n),r||(r={type:"script",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function or(t){return'href="'+Yt(t)+'"'}function bo(t){return'link[rel="stylesheet"]['+t+"]"}function xx(t){return x({},t,{"data-precedence":t.precedence,precedence:null})}function US(t,n,a,r){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=t.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),Rn(n,"link",a),ee(n),t.head.appendChild(n))}function lr(t){return'[src="'+Yt(t)+'"]'}function Eo(t){return"script[async]"+t}function gx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+Yt(a.href)+'"]');if(r)return n.instance=r,ee(r),r;var u=x({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),ee(r),Rn(r,"style",u),Ql(r,a.precedence,t),n.instance=r;case"stylesheet":u=or(a.href);var f=t.querySelector(bo(u));if(f)return n.state.loading|=4,n.instance=f,ee(f),f;r=xx(a),(u=di.get(u))&&eh(r,u),f=(t.ownerDocument||t).createElement("link"),ee(f);var S=f;return S._p=new Promise(function(A,z){S.onload=A,S.onerror=z}),Rn(f,"link",r),n.state.loading|=4,Ql(f,a.precedence,t),n.instance=f;case"script":return f=lr(a.src),(u=t.querySelector(Eo(f)))?(n.instance=u,ee(u),u):(r=a,(u=di.get(f))&&(r=x({},a),th(r,u)),t=t.ownerDocument||t,u=t.createElement("script"),ee(u),Rn(u,"link",r),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Ql(r,a.precedence,t));return n.instance}function Ql(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=r.length?r[r.length-1]:null,f=u,S=0;S<r.length;S++){var A=r[S];if(A.dataset.precedence===n)f=A;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function eh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function th(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Jl=null;function _x(t,n,a){if(Jl===null){var r=new Map,u=Jl=new Map;u.set(a,r)}else u=Jl,r=u.get(a),r||(r=new Map,u.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var f=a[u];if(!(f[ns]||f[rn]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var S=f.getAttribute(n)||"";S=t+S;var A=r.get(S);A?A.push(f):r.set(S,[f])}}return r}function vx(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function NS(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Sx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function LS(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=or(r.href),f=n.querySelector(bo(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=$l.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,ee(f);return}f=n.ownerDocument||n,r=xx(r),(u=di.get(u))&&eh(r,u),f=f.createElement("link"),ee(f);var S=f;S._p=new Promise(function(A,z){S.onload=A,S.onerror=z}),Rn(f,"link",r),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=$l.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var nh=0;function OS(t,n){return t.stylesheets&&t.count===0&&tc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&tc(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&nh===0&&(nh=62500*pS());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&tc(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>nh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(u)}}:null}function $l(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)tc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ec=null;function tc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ec=new Map,n.forEach(PS,t),ec=null,$l.call(t))}function PS(t,n){if(!(n.state.loading&4)){var a=ec.get(t);if(a)var r=a.get(null);else{a=new Map,ec.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var S=u[f];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(a.set(S.dataset.precedence,S),r=S)}r&&a.set(null,r)}u=n.instance,S=u.getAttribute("data-precedence"),f=a.get(S)||r,f===r&&a.set(null,u),a.set(S,u),this.count++,r=$l.bind(this),u.addEventListener("load",r),u.addEventListener("error",r),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var To={$$typeof:D,Provider:null,Consumer:null,_currentValue:Y,_currentValue2:Y,_threadCount:0};function zS(t,n,a,r,u,f,S,A,z){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=wt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=wt(0),this.hiddenUpdates=wt(null),this.identifierPrefix=r,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function yx(t,n,a,r,u,f,S,A,z,$,fe,me){return t=new zS(t,n,a,S,z,$,fe,me,A),n=1,f===!0&&(n|=24),f=Kn(3,null,null,n),t.current=f,f.stateNode=t,n=Ou(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:r,isDehydrated:a,cache:n},Fu(f),t}function Mx(t){return t?(t=Is,t):Is}function bx(t,n,a,r,u,f){u=Mx(u),r.context===null?r.context=u:r.pendingContext=u,r=Ra(n),r.payload={element:a},f=f===void 0?null:f,f!==null&&(r.callback=f),a=Ca(t,r,n),a!==null&&(Vn(a,t,n),no(a,t,n))}function Ex(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function ih(t,n){Ex(t,n),(t=t.alternate)&&Ex(t,n)}function Tx(t){if(t.tag===13||t.tag===31){var n=rs(t,67108864);n!==null&&Vn(n,t,67108864),ih(t,67108864)}}function Ax(t){if(t.tag===13||t.tag===31){var n=ti();n=vi(n);var a=rs(t,n);a!==null&&Vn(a,t,n),ih(t,n)}}var nc=!0;function BS(t,n,a,r){var u=F.T;F.T=null;var f=j.p;try{j.p=2,ah(t,n,a,r)}finally{j.p=f,F.T=u}}function FS(t,n,a,r){var u=F.T;F.T=null;var f=j.p;try{j.p=8,ah(t,n,a,r)}finally{j.p=f,F.T=u}}function ah(t,n,a,r){if(nc){var u=sh(r);if(u===null)Xf(t,n,r,ic,a),Cx(t,r);else if(HS(u,t,n,a,r))r.stopPropagation();else if(Cx(t,r),n&4&&-1<IS.indexOf(t)){for(;u!==null;){var f=R(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var S=be(f.pendingLanes);if(S!==0){var A=f;for(A.pendingLanes|=2,A.entangledLanes|=2;S;){var z=1<<31-Ve(S);A.entanglements[1]|=z,S&=~z}Ni(f),(Lt&6)===0&&(Il=E()+500,vo(0))}}break;case 31:case 13:A=rs(f,2),A!==null&&Vn(A,f,2),Gl(),ih(f,2)}if(f=sh(r),f===null&&Xf(t,n,r,ic,a),f===u)break;u=f}u!==null&&r.stopPropagation()}else Xf(t,n,r,null,a)}}function sh(t){return t=ru(t),rh(t)}var ic=null;function rh(t){if(ic=null,t=va(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return ic=t,null}function Rx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(J()){case pe:return 2;case Se:return 8;case le:case qe:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var oh=!1,Ia=null,Ha=null,Ga=null,Ao=new Map,Ro=new Map,Va=[],IS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Cx(t,n){switch(t){case"focusin":case"focusout":Ia=null;break;case"dragenter":case"dragleave":Ha=null;break;case"mouseover":case"mouseout":Ga=null;break;case"pointerover":case"pointerout":Ao.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ro.delete(n.pointerId)}}function Co(t,n,a,r,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:f,targetContainers:[u]},n!==null&&(n=R(n),n!==null&&Tx(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function HS(t,n,a,r,u){switch(n){case"focusin":return Ia=Co(Ia,t,n,a,r,u),!0;case"dragenter":return Ha=Co(Ha,t,n,a,r,u),!0;case"mouseover":return Ga=Co(Ga,t,n,a,r,u),!0;case"pointerover":var f=u.pointerId;return Ao.set(f,Co(Ao.get(f)||null,t,n,a,r,u)),!0;case"gotpointercapture":return f=u.pointerId,Ro.set(f,Co(Ro.get(f)||null,t,n,a,r,u)),!0}return!1}function wx(t){var n=va(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,Ir(t.priority,function(){Ax(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,Ir(t.priority,function(){Ax(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ac(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=sh(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);su=r,a.target.dispatchEvent(r),su=null}else return n=R(a),n!==null&&Tx(n),t.blockedOn=a,!1;n.shift()}return!0}function Dx(t,n,a){ac(t)&&a.delete(n)}function GS(){oh=!1,Ia!==null&&ac(Ia)&&(Ia=null),Ha!==null&&ac(Ha)&&(Ha=null),Ga!==null&&ac(Ga)&&(Ga=null),Ao.forEach(Dx),Ro.forEach(Dx)}function sc(t,n){t.blockedOn===n&&(t.blockedOn=null,oh||(oh=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,GS)))}var rc=null;function Ux(t){rc!==t&&(rc=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){rc===t&&(rc=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],u=t[n+2];if(typeof r!="function"){if(rh(r||a)===null)continue;break}var f=R(a);f!==null&&(t.splice(n,3),n-=3,sf(f,{pending:!0,data:u,method:a.method,action:r},r,u))}}))}function cr(t){function n(z){return sc(z,t)}Ia!==null&&sc(Ia,t),Ha!==null&&sc(Ha,t),Ga!==null&&sc(Ga,t),Ao.forEach(n),Ro.forEach(n);for(var a=0;a<Va.length;a++){var r=Va[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<Va.length&&(a=Va[0],a.blockedOn===null);)wx(a),a.blockedOn===null&&Va.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var u=a[r],f=a[r+1],S=u[dn]||null;if(typeof f=="function")S||Ux(a);else if(S){var A=null;if(f&&f.hasAttribute("formAction")){if(u=f,S=f[dn]||null)A=S.formAction;else if(rh(u)!==null)continue}else A=S.action;typeof A=="function"?a[r+1]=A:(a.splice(r,3),r-=3),Ux(a)}}}function Nx(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(S){return u=S})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function lh(t){this._internalRoot=t}oc.prototype.render=lh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ti();bx(a,r,t,n,null,null)},oc.prototype.unmount=lh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;bx(t.current,2,null,t,null,null),Gl(),n[Hi]=null}};function oc(t){this._internalRoot=t}oc.prototype.unstable_scheduleHydration=function(t){if(t){var n=Fr();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Va.length&&n!==0&&n<Va[a].priority;a++);Va.splice(a,0,t),a===0&&wx(t)}};var Lx=e.version;if(Lx!=="19.2.1")throw Error(s(527,Lx,"19.2.1"));j.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?g(t):null,t=t===null?null:t.stateNode,t};var VS={bundleType:0,version:"19.2.1",rendererPackageName:"react-dom",currentDispatcherRef:F,reconcilerVersion:"19.2.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var lc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!lc.isDisabled&&lc.supportsFiber)try{ye=lc.inject(VS),Ee=lc}catch{}}return Do.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,r="",u=H0,f=G0,S=V0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(S=n.onRecoverableError)),n=yx(t,1,!1,null,null,a,r,null,u,f,S,Nx),t[Hi]=n.current,kf(t),new lh(n)},Do.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var r=!1,u="",f=H0,S=G0,A=V0,z=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(S=a.onCaughtError),a.onRecoverableError!==void 0&&(A=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=yx(t,1,!0,n,a??null,r,u,z,f,S,A,Nx),n.context=Mx(null),a=n.current,r=ti(),r=vi(r),u=Ra(r),u.callback=null,Ca(a,u,r),a=r,n.current.lanes=a,Cn(n,a),Ni(n),t[Hi]=n.current,kf(t),new oc(n)},Do.version="19.2.1",Do}var kx;function JS(){if(kx)return fh.exports;kx=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),fh.exports=QS(),fh.exports}var $S=JS();const $g=Qg($S);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fd="181",ey=0,Xx=1,ty=2,e_=1,ny=2,ha=3,es=0,Xn=1,da=2,Pi=0,Tr=1,Xc=2,Wx=3,qx=4,iy=5,As=100,ay=101,sy=102,ry=103,oy=104,ly=200,cy=201,uy=202,fy=203,jh=204,Zh=205,hy=206,dy=207,py=208,my=209,xy=210,gy=211,_y=212,vy=213,Sy=214,Kh=0,Qh=1,Jh=2,Rr=3,$h=4,ed=5,td=6,nd=7,t_=0,yy=1,My=2,$a=0,n_=1,i_=2,a_=3,Id=4,s_=5,r_=6,o_=7,l_=300,Cr=301,wr=302,Wc=303,id=304,Jc=306,ad=1e3,ma=1001,sd=1002,si=1003,by=1004,cc=1005,gi=1006,mh=1007,Cs=1008,Bi=1009,c_=1010,u_=1011,Vo=1012,Hd=1013,ws=1014,xa=1015,zi=1016,Gd=1017,Vd=1018,ko=1020,f_=35902,h_=35899,d_=1021,p_=1022,Ai=1023,Xo=1026,Wo=1027,m_=1028,kd=1029,Xd=1030,Wd=1031,qd=1033,Bc=33776,Fc=33777,Ic=33778,Hc=33779,rd=35840,od=35841,ld=35842,cd=35843,ud=36196,fd=37492,hd=37496,dd=37808,pd=37809,md=37810,xd=37811,gd=37812,_d=37813,vd=37814,Sd=37815,yd=37816,Md=37817,bd=37818,Ed=37819,Td=37820,Ad=37821,Rd=36492,Cd=36494,wd=36495,Dd=36283,Ud=36284,Nd=36285,Ld=36286,Ey=3200,Ty=3201,x_=0,Ay=1,Qa="",mi="srgb",Dr="srgb-linear",qc="linear",Ft="srgb",ur=7680,Yx=519,Ry=512,Cy=513,wy=514,g_=515,Dy=516,Uy=517,Ny=518,Ly=519,jx=35044,Zx="300 es",Oi=2e3,Yc=2001;function __(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function jc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Oy(){const o=jc("canvas");return o.style.display="block",o}const Kx={};function Qx(...o){const e="THREE."+o.shift();console.log(e,...o)}function ot(...o){const e="THREE."+o.shift();console.warn(e,...o)}function sn(...o){const e="THREE."+o.shift();console.error(e,...o)}function qo(...o){const e=o.join(" ");e in Kx||(Kx[e]=!0,ot(...o))}function Py(o,e,i){return new Promise(function(s,l){function c(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}class Lr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,e);e.target=null}}}const Dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gc=Math.PI/180,Od=180/Math.PI;function jo(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Dn[o&255]+Dn[o>>8&255]+Dn[o>>16&255]+Dn[o>>24&255]+"-"+Dn[e&255]+Dn[e>>8&255]+"-"+Dn[e>>16&15|64]+Dn[e>>24&255]+"-"+Dn[i&63|128]+Dn[i>>8&255]+"-"+Dn[i>>16&255]+Dn[i>>24&255]+Dn[s&255]+Dn[s>>8&255]+Dn[s>>16&255]+Dn[s>>24&255]).toLowerCase()}function Mt(o,e,i){return Math.max(e,Math.min(i,o))}function zy(o,e){return(o%e+e)%e}function xh(o,e,i){return(1-i)*o+i*e}function Uo(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function kn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class lt{constructor(e=0,i=0){lt.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Mt(this.x,e.x,i.x),this.y=Mt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Mt(this.x,e,i),this.y=Mt(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Mt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Mt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,h=this.y-e.y;return this.x=c*s-h*l+e.x,this.y=c*l+h*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zo{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,h,d){let m=s[l+0],p=s[l+1],g=s[l+2],x=s[l+3],_=c[h+0],M=c[h+1],b=c[h+2],T=c[h+3];if(d<=0){e[i+0]=m,e[i+1]=p,e[i+2]=g,e[i+3]=x;return}if(d>=1){e[i+0]=_,e[i+1]=M,e[i+2]=b,e[i+3]=T;return}if(x!==T||m!==_||p!==M||g!==b){let y=m*_+p*M+g*b+x*T;y<0&&(_=-_,M=-M,b=-b,T=-T,y=-y);let v=1-d;if(y<.9995){const N=Math.acos(y),D=Math.sin(N);v=Math.sin(v*N)/D,d=Math.sin(d*N)/D,m=m*v+_*d,p=p*v+M*d,g=g*v+b*d,x=x*v+T*d}else{m=m*v+_*d,p=p*v+M*d,g=g*v+b*d,x=x*v+T*d;const N=1/Math.sqrt(m*m+p*p+g*g+x*x);m*=N,p*=N,g*=N,x*=N}}e[i]=m,e[i+1]=p,e[i+2]=g,e[i+3]=x}static multiplyQuaternionsFlat(e,i,s,l,c,h){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],x=c[h],_=c[h+1],M=c[h+2],b=c[h+3];return e[i]=d*b+g*x+m*M-p*_,e[i+1]=m*b+g*_+p*x-d*M,e[i+2]=p*b+g*M+d*_-m*x,e[i+3]=g*b-d*x-m*_-p*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,h=e._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),x=d(c/2),_=m(s/2),M=m(l/2),b=m(c/2);switch(h){case"XYZ":this._x=_*g*x+p*M*b,this._y=p*M*x-_*g*b,this._z=p*g*b+_*M*x,this._w=p*g*x-_*M*b;break;case"YXZ":this._x=_*g*x+p*M*b,this._y=p*M*x-_*g*b,this._z=p*g*b-_*M*x,this._w=p*g*x+_*M*b;break;case"ZXY":this._x=_*g*x-p*M*b,this._y=p*M*x+_*g*b,this._z=p*g*b+_*M*x,this._w=p*g*x-_*M*b;break;case"ZYX":this._x=_*g*x-p*M*b,this._y=p*M*x+_*g*b,this._z=p*g*b-_*M*x,this._w=p*g*x+_*M*b;break;case"YZX":this._x=_*g*x+p*M*b,this._y=p*M*x+_*g*b,this._z=p*g*b-_*M*x,this._w=p*g*x-_*M*b;break;case"XZY":this._x=_*g*x-p*M*b,this._y=p*M*x-_*g*b,this._z=p*g*b+_*M*x,this._w=p*g*x+_*M*b;break;default:ot("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],g=i[6],x=i[10],_=s+d+x;if(_>0){const M=.5/Math.sqrt(_+1);this._w=.25/M,this._x=(g-m)*M,this._y=(c-p)*M,this._z=(h-l)*M}else if(s>d&&s>x){const M=2*Math.sqrt(1+s-d-x);this._w=(g-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(c+p)/M}else if(d>x){const M=2*Math.sqrt(1+d-s-x);this._w=(c-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+x-s-d);this._w=(h-l)/M,this._x=(c+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,h=e._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=s*g+h*d+l*p-c*m,this._y=l*g+h*m+c*d-s*p,this._z=c*g+h*p+s*m-l*d,this._w=h*g-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){if(i<=0)return this;if(i>=1)return this.copy(e);let s=e._x,l=e._y,c=e._z,h=e._w,d=this.dot(e);d<0&&(s=-s,l=-l,c=-c,h=-h,d=-d);let m=1-i;if(d<.9995){const p=Math.acos(d),g=Math.sin(p);m=Math.sin(m*p)/g,i=Math.sin(i*p)/g,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,i=0,s=0){K.prototype.isVector3=!0,this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Jx.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Jx.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,h=e.y,d=e.z,m=e.w,p=2*(h*l-d*s),g=2*(d*i-c*l),x=2*(c*s-h*i);return this.x=i+m*p+h*x-d*g,this.y=s+m*g+d*p-c*x,this.z=l+m*x+c*g-h*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Mt(this.x,e.x,i.x),this.y=Mt(this.y,e.y,i.y),this.z=Mt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Mt(this.x,e,i),this.y=Mt(this.y,e,i),this.z=Mt(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Mt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-s*m,this.z=s*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return gh.copy(this).projectOnVector(e),this.sub(gh)}reflect(e){return this.sub(gh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Mt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gh=new K,Jx=new Zo;class dt{constructor(e,i,s,l,c,h,d,m,p){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,h,d,m,p)}set(e,i,s,l,c,h,d,m,p){const g=this.elements;return g[0]=e,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=m,g[6]=s,g[7]=h,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],g=s[4],x=s[7],_=s[2],M=s[5],b=s[8],T=l[0],y=l[3],v=l[6],N=l[1],D=l[4],P=l[7],V=l[2],L=l[5],B=l[8];return c[0]=h*T+d*N+m*V,c[3]=h*y+d*D+m*L,c[6]=h*v+d*P+m*B,c[1]=p*T+g*N+x*V,c[4]=p*y+g*D+x*L,c[7]=p*v+g*P+x*B,c[2]=_*T+M*N+b*V,c[5]=_*y+M*D+b*L,c[8]=_*v+M*P+b*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],g=e[8];return i*h*g-i*d*p-s*c*g+s*d*m+l*c*p-l*h*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],g=e[8],x=g*h-d*p,_=d*m-g*c,M=p*c-h*m,b=i*x+s*_+l*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=x*T,e[1]=(l*p-g*s)*T,e[2]=(d*s-l*h)*T,e[3]=_*T,e[4]=(g*i-l*m)*T,e[5]=(l*c-d*i)*T,e[6]=M*T,e[7]=(s*m-p*i)*T,e[8]=(h*i-s*c)*T,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*h+p*d)+h+e,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(_h.makeScale(e,i)),this}rotate(e){return this.premultiply(_h.makeRotation(-e)),this}translate(e,i){return this.premultiply(_h.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _h=new dt,$x=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eg=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function By(){const o={enabled:!0,workingColorSpace:Dr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Ft&&(l.r=ga(l.r),l.g=ga(l.g),l.b=ga(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ft&&(l.r=Ar(l.r),l.g=Ar(l.g),l.b=Ar(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Qa?qc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return qo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return qo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[Dr]:{primaries:e,whitePoint:s,transfer:qc,toXYZ:$x,fromXYZ:eg,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:mi},outputColorSpaceConfig:{drawingBufferColorSpace:mi}},[mi]:{primaries:e,whitePoint:s,transfer:Ft,toXYZ:$x,fromXYZ:eg,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:mi}}}),o}const Rt=By();function ga(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Ar(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let fr;class Fy{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{fr===void 0&&(fr=jc("canvas")),fr.width=e.width,fr.height=e.height;const l=fr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=fr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=jc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=ga(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(ga(i[s]/255)*255):i[s]=ga(i[s]);return{data:i,width:e.width,height:e.height}}else return ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Iy=0;class Yd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=jo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):i instanceof VideoFrame?e.set(i.displayHeight,i.displayWidth,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(vh(l[h].image)):c.push(vh(l[h]))}else c=vh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function vh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Fy.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(ot("Texture: Unable to serialize Texture."),{})}let Hy=0;const Sh=new K;class Ln extends Lr{constructor(e=Ln.DEFAULT_IMAGE,i=Ln.DEFAULT_MAPPING,s=ma,l=ma,c=gi,h=Cs,d=Ai,m=Bi,p=Ln.DEFAULT_ANISOTROPY,g=Qa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=jo(),this.name="",this.source=new Yd(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Sh).x}get height(){return this.source.getSize(Sh).y}get depth(){return this.source.getSize(Sh).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){ot(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ot(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==l_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ad:e.x=e.x-Math.floor(e.x);break;case ma:e.x=e.x<0?0:1;break;case sd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ad:e.y=e.y-Math.floor(e.y);break;case ma:e.y=e.y<0?0:1;break;case sd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ln.DEFAULT_IMAGE=null;Ln.DEFAULT_MAPPING=l_;Ln.DEFAULT_ANISOTROPY=1;class kt{constructor(e=0,i=0,s=0,l=1){kt.prototype.isVector4=!0,this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,h=e.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],g=m[4],x=m[8],_=m[1],M=m[5],b=m[9],T=m[2],y=m[6],v=m[10];if(Math.abs(g-_)<.01&&Math.abs(x-T)<.01&&Math.abs(b-y)<.01){if(Math.abs(g+_)<.1&&Math.abs(x+T)<.1&&Math.abs(b+y)<.1&&Math.abs(p+M+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const D=(p+1)/2,P=(M+1)/2,V=(v+1)/2,L=(g+_)/4,B=(x+T)/4,ne=(b+y)/4;return D>P&&D>V?D<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(D),l=L/s,c=B/s):P>V?P<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(P),s=L/l,c=ne/l):V<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(V),s=B/c,l=ne/c),this.set(s,l,c,i),this}let N=Math.sqrt((y-b)*(y-b)+(x-T)*(x-T)+(_-g)*(_-g));return Math.abs(N)<.001&&(N=1),this.x=(y-b)/N,this.y=(x-T)/N,this.z=(_-g)/N,this.w=Math.acos((p+M+v-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Mt(this.x,e.x,i.x),this.y=Mt(this.y,e.y,i.y),this.z=Mt(this.z,e.z,i.z),this.w=Mt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Mt(this.x,e,i),this.y=Mt(this.y,e,i),this.z=Mt(this.z,e,i),this.w=Mt(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Mt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gy extends Lr{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new kt(0,0,e,i),this.scissorTest=!1,this.viewport=new kt(0,0,e,i);const l={width:e,height:i,depth:s.depth},c=new Ln(l);this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:gi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new Yd(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends Gy{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class v_ extends Ln{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=si,this.minFilter=si,this.wrapR=ma,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vy extends Ln{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=si,this.minFilter=si,this.wrapR=ma,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ko{constructor(e=new K(1/0,1/0,1/0),i=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(bi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(bi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=bi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,bi):bi.fromBufferAttribute(c,h),bi.applyMatrix4(e.matrixWorld),this.expandByPoint(bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uc.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),uc.copy(s.boundingBox)),uc.applyMatrix4(e.matrixWorld),this.union(uc)}const l=e.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bi),bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(No),fc.subVectors(this.max,No),hr.subVectors(e.a,No),dr.subVectors(e.b,No),pr.subVectors(e.c,No),Xa.subVectors(dr,hr),Wa.subVectors(pr,dr),vs.subVectors(hr,pr);let i=[0,-Xa.z,Xa.y,0,-Wa.z,Wa.y,0,-vs.z,vs.y,Xa.z,0,-Xa.x,Wa.z,0,-Wa.x,vs.z,0,-vs.x,-Xa.y,Xa.x,0,-Wa.y,Wa.x,0,-vs.y,vs.x,0];return!yh(i,hr,dr,pr,fc)||(i=[1,0,0,0,1,0,0,0,1],!yh(i,hr,dr,pr,fc))?!1:(hc.crossVectors(Xa,Wa),i=[hc.x,hc.y,hc.z],yh(i,hr,dr,pr,fc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ra[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ra[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ra[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ra[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ra[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ra[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ra[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ra[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ra),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ra=[new K,new K,new K,new K,new K,new K,new K,new K],bi=new K,uc=new Ko,hr=new K,dr=new K,pr=new K,Xa=new K,Wa=new K,vs=new K,No=new K,fc=new K,hc=new K,Ss=new K;function yh(o,e,i,s,l){for(let c=0,h=o.length-3;c<=h;c+=3){Ss.fromArray(o,c);const d=l.x*Math.abs(Ss.x)+l.y*Math.abs(Ss.y)+l.z*Math.abs(Ss.z),m=e.dot(Ss),p=i.dot(Ss),g=s.dot(Ss);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const ky=new Ko,Lo=new K,Mh=new K;class Qo{constructor(e=new K,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):ky.setFromPoints(e).getCenter(s);let l=0;for(let c=0,h=e.length;c<h;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lo.subVectors(e,this.center);const i=Lo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Lo,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lo.copy(e.center).add(Mh)),this.expandByPoint(Lo.copy(e.center).sub(Mh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const oa=new K,bh=new K,dc=new K,qa=new K,Eh=new K,pc=new K,Th=new K;class jd{constructor(e=new K,i=new K(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oa)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=oa.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(oa.copy(this.origin).addScaledVector(this.direction,i),oa.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){bh.copy(e).add(i).multiplyScalar(.5),dc.copy(i).sub(e).normalize(),qa.copy(this.origin).sub(bh);const c=e.distanceTo(i)*.5,h=-this.direction.dot(dc),d=qa.dot(this.direction),m=-qa.dot(dc),p=qa.lengthSq(),g=Math.abs(1-h*h);let x,_,M,b;if(g>0)if(x=h*m-d,_=h*d-m,b=c*g,x>=0)if(_>=-b)if(_<=b){const T=1/g;x*=T,_*=T,M=x*(x+h*_+2*d)+_*(h*x+_+2*m)+p}else _=c,x=Math.max(0,-(h*_+d)),M=-x*x+_*(_+2*m)+p;else _=-c,x=Math.max(0,-(h*_+d)),M=-x*x+_*(_+2*m)+p;else _<=-b?(x=Math.max(0,-(-h*c+d)),_=x>0?-c:Math.min(Math.max(-c,-m),c),M=-x*x+_*(_+2*m)+p):_<=b?(x=0,_=Math.min(Math.max(-c,-m),c),M=_*(_+2*m)+p):(x=Math.max(0,-(h*c+d)),_=x>0?c:Math.min(Math.max(-c,-m),c),M=-x*x+_*(_+2*m)+p);else _=h>0?-c:c,x=Math.max(0,-(h*_+d)),M=-x*x+_*(_+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(bh).addScaledVector(dc,_),M}intersectSphere(e,i){oa.subVectors(e.center,this.origin);const s=oa.dot(this.direction),l=oa.dot(oa)-s*s,c=e.radius*e.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,h,d,m;const p=1/this.direction.x,g=1/this.direction.y,x=1/this.direction.z,_=this.origin;return p>=0?(s=(e.min.x-_.x)*p,l=(e.max.x-_.x)*p):(s=(e.max.x-_.x)*p,l=(e.min.x-_.x)*p),g>=0?(c=(e.min.y-_.y)*g,h=(e.max.y-_.y)*g):(c=(e.max.y-_.y)*g,h=(e.min.y-_.y)*g),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),x>=0?(d=(e.min.z-_.z)*x,m=(e.max.z-_.z)*x):(d=(e.max.z-_.z)*x,m=(e.min.z-_.z)*x),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,oa)!==null}intersectTriangle(e,i,s,l,c){Eh.subVectors(i,e),pc.subVectors(s,e),Th.crossVectors(Eh,pc);let h=this.direction.dot(Th),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;qa.subVectors(this.origin,e);const m=d*this.direction.dot(pc.crossVectors(qa,pc));if(m<0)return null;const p=d*this.direction.dot(Eh.cross(qa));if(p<0||m+p>h)return null;const g=-d*qa.dot(Th);return g<0?null:this.at(g/h,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jt{constructor(e,i,s,l,c,h,d,m,p,g,x,_,M,b,T,y){Jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,h,d,m,p,g,x,_,M,b,T,y)}set(e,i,s,l,c,h,d,m,p,g,x,_,M,b,T,y){const v=this.elements;return v[0]=e,v[4]=i,v[8]=s,v[12]=l,v[1]=c,v[5]=h,v[9]=d,v[13]=m,v[2]=p,v[6]=g,v[10]=x,v[14]=_,v[3]=M,v[7]=b,v[11]=T,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jt().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,s=e.elements,l=1/mr.setFromMatrixColumn(e,0).length(),c=1/mr.setFromMatrixColumn(e,1).length(),h=1/mr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),x=Math.sin(c);if(e.order==="XYZ"){const _=h*g,M=h*x,b=d*g,T=d*x;i[0]=m*g,i[4]=-m*x,i[8]=p,i[1]=M+b*p,i[5]=_-T*p,i[9]=-d*m,i[2]=T-_*p,i[6]=b+M*p,i[10]=h*m}else if(e.order==="YXZ"){const _=m*g,M=m*x,b=p*g,T=p*x;i[0]=_+T*d,i[4]=b*d-M,i[8]=h*p,i[1]=h*x,i[5]=h*g,i[9]=-d,i[2]=M*d-b,i[6]=T+_*d,i[10]=h*m}else if(e.order==="ZXY"){const _=m*g,M=m*x,b=p*g,T=p*x;i[0]=_-T*d,i[4]=-h*x,i[8]=b+M*d,i[1]=M+b*d,i[5]=h*g,i[9]=T-_*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(e.order==="ZYX"){const _=h*g,M=h*x,b=d*g,T=d*x;i[0]=m*g,i[4]=b*p-M,i[8]=_*p+T,i[1]=m*x,i[5]=T*p+_,i[9]=M*p-b,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(e.order==="YZX"){const _=h*m,M=h*p,b=d*m,T=d*p;i[0]=m*g,i[4]=T-_*x,i[8]=b*x+M,i[1]=x,i[5]=h*g,i[9]=-d*g,i[2]=-p*g,i[6]=M*x+b,i[10]=_-T*x}else if(e.order==="XZY"){const _=h*m,M=h*p,b=d*m,T=d*p;i[0]=m*g,i[4]=-x,i[8]=p*g,i[1]=_*x+T,i[5]=h*g,i[9]=M*x-b,i[2]=b*x-M,i[6]=d*g,i[10]=T*x+_}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xy,e,Wy)}lookAt(e,i,s){const l=this.elements;return ni.subVectors(e,i),ni.lengthSq()===0&&(ni.z=1),ni.normalize(),Ya.crossVectors(s,ni),Ya.lengthSq()===0&&(Math.abs(s.z)===1?ni.x+=1e-4:ni.z+=1e-4,ni.normalize(),Ya.crossVectors(s,ni)),Ya.normalize(),mc.crossVectors(ni,Ya),l[0]=Ya.x,l[4]=mc.x,l[8]=ni.x,l[1]=Ya.y,l[5]=mc.y,l[9]=ni.y,l[2]=Ya.z,l[6]=mc.z,l[10]=ni.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],g=s[1],x=s[5],_=s[9],M=s[13],b=s[2],T=s[6],y=s[10],v=s[14],N=s[3],D=s[7],P=s[11],V=s[15],L=l[0],B=l[4],ne=l[8],w=l[12],C=l[1],k=l[5],ie=l[9],ce=l[13],xe=l[2],he=l[6],F=l[10],j=l[14],Y=l[3],_e=l[7],ve=l[11],O=l[15];return c[0]=h*L+d*C+m*xe+p*Y,c[4]=h*B+d*k+m*he+p*_e,c[8]=h*ne+d*ie+m*F+p*ve,c[12]=h*w+d*ce+m*j+p*O,c[1]=g*L+x*C+_*xe+M*Y,c[5]=g*B+x*k+_*he+M*_e,c[9]=g*ne+x*ie+_*F+M*ve,c[13]=g*w+x*ce+_*j+M*O,c[2]=b*L+T*C+y*xe+v*Y,c[6]=b*B+T*k+y*he+v*_e,c[10]=b*ne+T*ie+y*F+v*ve,c[14]=b*w+T*ce+y*j+v*O,c[3]=N*L+D*C+P*xe+V*Y,c[7]=N*B+D*k+P*he+V*_e,c[11]=N*ne+D*ie+P*F+V*ve,c[15]=N*w+D*ce+P*j+V*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],h=e[1],d=e[5],m=e[9],p=e[13],g=e[2],x=e[6],_=e[10],M=e[14],b=e[3],T=e[7],y=e[11],v=e[15];return b*(+c*m*x-l*p*x-c*d*_+s*p*_+l*d*M-s*m*M)+T*(+i*m*M-i*p*_+c*h*_-l*h*M+l*p*g-c*m*g)+y*(+i*p*x-i*d*M-c*h*x+s*h*M+c*d*g-s*p*g)+v*(-l*d*g-i*m*x+i*d*_+l*h*x-s*h*_+s*m*g)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],h=e[4],d=e[5],m=e[6],p=e[7],g=e[8],x=e[9],_=e[10],M=e[11],b=e[12],T=e[13],y=e[14],v=e[15],N=x*y*p-T*_*p+T*m*M-d*y*M-x*m*v+d*_*v,D=b*_*p-g*y*p-b*m*M+h*y*M+g*m*v-h*_*v,P=g*T*p-b*x*p+b*d*M-h*T*M-g*d*v+h*x*v,V=b*x*m-g*T*m-b*d*_+h*T*_+g*d*y-h*x*y,L=i*N+s*D+l*P+c*V;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/L;return e[0]=N*B,e[1]=(T*_*c-x*y*c-T*l*M+s*y*M+x*l*v-s*_*v)*B,e[2]=(d*y*c-T*m*c+T*l*p-s*y*p-d*l*v+s*m*v)*B,e[3]=(x*m*c-d*_*c-x*l*p+s*_*p+d*l*M-s*m*M)*B,e[4]=D*B,e[5]=(g*y*c-b*_*c+b*l*M-i*y*M-g*l*v+i*_*v)*B,e[6]=(b*m*c-h*y*c-b*l*p+i*y*p+h*l*v-i*m*v)*B,e[7]=(h*_*c-g*m*c+g*l*p-i*_*p-h*l*M+i*m*M)*B,e[8]=P*B,e[9]=(b*x*c-g*T*c-b*s*M+i*T*M+g*s*v-i*x*v)*B,e[10]=(h*T*c-b*d*c+b*s*p-i*T*p-h*s*v+i*d*v)*B,e[11]=(g*d*c-h*x*c-g*s*p+i*x*p+h*s*M-i*d*M)*B,e[12]=V*B,e[13]=(g*T*l-b*x*l+b*s*_-i*T*_-g*s*y+i*x*y)*B,e[14]=(b*d*l-h*T*l-b*s*m+i*T*m+h*s*y-i*d*y)*B,e[15]=(h*x*l-g*d*l+g*s*m-i*x*m-h*s*_+i*d*_)*B,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=e.x,d=e.y,m=e.z,p=c*h,g=c*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*h,0,p*m-l*d,g*m+l*h,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,h){return this.set(1,s,c,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,g=h+h,x=d+d,_=c*p,M=c*g,b=c*x,T=h*g,y=h*x,v=d*x,N=m*p,D=m*g,P=m*x,V=s.x,L=s.y,B=s.z;return l[0]=(1-(T+v))*V,l[1]=(M+P)*V,l[2]=(b-D)*V,l[3]=0,l[4]=(M-P)*L,l[5]=(1-(_+v))*L,l[6]=(y+N)*L,l[7]=0,l[8]=(b+D)*B,l[9]=(y-N)*B,l[10]=(1-(_+T))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;let c=mr.set(l[0],l[1],l[2]).length();const h=mr.set(l[4],l[5],l[6]).length(),d=mr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),e.x=l[12],e.y=l[13],e.z=l[14],Ei.copy(this);const p=1/c,g=1/h,x=1/d;return Ei.elements[0]*=p,Ei.elements[1]*=p,Ei.elements[2]*=p,Ei.elements[4]*=g,Ei.elements[5]*=g,Ei.elements[6]*=g,Ei.elements[8]*=x,Ei.elements[9]*=x,Ei.elements[10]*=x,i.setFromRotationMatrix(Ei),s.x=c,s.y=h,s.z=d,this}makePerspective(e,i,s,l,c,h,d=Oi,m=!1){const p=this.elements,g=2*c/(i-e),x=2*c/(s-l),_=(i+e)/(i-e),M=(s+l)/(s-l);let b,T;if(m)b=c/(h-c),T=h*c/(h-c);else if(d===Oi)b=-(h+c)/(h-c),T=-2*h*c/(h-c);else if(d===Yc)b=-h/(h-c),T=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=x,p[9]=M,p[13]=0,p[2]=0,p[6]=0,p[10]=b,p[14]=T,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,h,d=Oi,m=!1){const p=this.elements,g=2/(i-e),x=2/(s-l),_=-(i+e)/(i-e),M=-(s+l)/(s-l);let b,T;if(m)b=1/(h-c),T=h/(h-c);else if(d===Oi)b=-2/(h-c),T=-(h+c)/(h-c);else if(d===Yc)b=-1/(h-c),T=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=0,p[12]=_,p[1]=0,p[5]=x,p[9]=0,p[13]=M,p[2]=0,p[6]=0,p[10]=b,p[14]=T,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const mr=new K,Ei=new Jt,Xy=new K(0,0,0),Wy=new K(1,1,1),Ya=new K,mc=new K,ni=new K,tg=new Jt,ng=new Zo;class Fi{constructor(e=0,i=0,s=0,l=Fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],g=l[9],x=l[2],_=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(_,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-x,c),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-x,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Mt(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(_,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(Mt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-x,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(_,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return tg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(tg,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return ng.setFromEuler(this),this.setFromQuaternion(ng,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fi.DEFAULT_ORDER="XYZ";class S_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qy=0;const ig=new K,xr=new Zo,la=new Jt,xc=new K,Oo=new K,Yy=new K,jy=new Zo,ag=new K(1,0,0),sg=new K(0,1,0),rg=new K(0,0,1),og={type:"added"},Zy={type:"removed"},gr={type:"childadded",child:null},Ah={type:"childremoved",child:null};class On extends Lr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=jo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=On.DEFAULT_UP.clone();const e=new K,i=new Fi,s=new Zo,l=new K(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Jt},normalMatrix:{value:new dt}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=On.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new S_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return xr.setFromAxisAngle(e,i),this.quaternion.multiply(xr),this}rotateOnWorldAxis(e,i){return xr.setFromAxisAngle(e,i),this.quaternion.premultiply(xr),this}rotateX(e){return this.rotateOnAxis(ag,e)}rotateY(e){return this.rotateOnAxis(sg,e)}rotateZ(e){return this.rotateOnAxis(rg,e)}translateOnAxis(e,i){return ig.copy(e).applyQuaternion(this.quaternion),this.position.add(ig.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(ag,e)}translateY(e){return this.translateOnAxis(sg,e)}translateZ(e){return this.translateOnAxis(rg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(la.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?xc.copy(e):xc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?la.lookAt(Oo,xc,this.up):la.lookAt(xc,Oo,this.up),this.quaternion.setFromRotationMatrix(la),l&&(la.extractRotation(l.matrixWorld),xr.setFromRotationMatrix(la),this.quaternion.premultiply(xr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(sn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(og),gr.child=e,this.dispatchEvent(gr),gr.child=null):sn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(Zy),Ah.child=e,this.dispatchEvent(Ah),Ah.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),la.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),la.multiply(e.parent.matrixWorld)),e.applyMatrix4(la),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(og),gr.child=e,this.dispatchEvent(gr),gr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,e,Yy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oo,jy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const x=m[p];c(e.shapes,x)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(e.materials,this.material[m]));l.material=d}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(e.animations,m))}}if(i){const d=h(e.geometries),m=h(e.materials),p=h(e.textures),g=h(e.images),x=h(e.shapes),_=h(e.skeletons),M=h(e.animations),b=h(e.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),x.length>0&&(s.shapes=x),_.length>0&&(s.skeletons=_),M.length>0&&(s.animations=M),b.length>0&&(s.nodes=b)}return s.object=l,s;function h(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}On.DEFAULT_UP=new K(0,1,0);On.DEFAULT_MATRIX_AUTO_UPDATE=!0;On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ti=new K,ca=new K,Rh=new K,ua=new K,_r=new K,vr=new K,lg=new K,Ch=new K,wh=new K,Dh=new K,Uh=new kt,Nh=new kt,Lh=new kt;class xi{constructor(e=new K,i=new K,s=new K){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Ti.subVectors(e,i),l.cross(Ti);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){Ti.subVectors(l,i),ca.subVectors(s,i),Rh.subVectors(e,i);const h=Ti.dot(Ti),d=Ti.dot(ca),m=Ti.dot(Rh),p=ca.dot(ca),g=ca.dot(Rh),x=h*p-d*d;if(x===0)return c.set(0,0,0),null;const _=1/x,M=(p*m-d*g)*_,b=(h*g-d*m)*_;return c.set(1-M-b,b,M)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,ua)===null?!1:ua.x>=0&&ua.y>=0&&ua.x+ua.y<=1}static getInterpolation(e,i,s,l,c,h,d,m){return this.getBarycoord(e,i,s,l,ua)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ua.x),m.addScaledVector(h,ua.y),m.addScaledVector(d,ua.z),m)}static getInterpolatedAttribute(e,i,s,l,c,h){return Uh.setScalar(0),Nh.setScalar(0),Lh.setScalar(0),Uh.fromBufferAttribute(e,i),Nh.fromBufferAttribute(e,s),Lh.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(Uh,c.x),h.addScaledVector(Nh,c.y),h.addScaledVector(Lh,c.z),h}static isFrontFacing(e,i,s,l){return Ti.subVectors(s,i),ca.subVectors(e,i),Ti.cross(ca).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ti.subVectors(this.c,this.b),ca.subVectors(this.a,this.b),Ti.cross(ca).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return xi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return xi.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return xi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let h,d;_r.subVectors(l,s),vr.subVectors(c,s),Ch.subVectors(e,s);const m=_r.dot(Ch),p=vr.dot(Ch);if(m<=0&&p<=0)return i.copy(s);wh.subVectors(e,l);const g=_r.dot(wh),x=vr.dot(wh);if(g>=0&&x<=g)return i.copy(l);const _=m*x-g*p;if(_<=0&&m>=0&&g<=0)return h=m/(m-g),i.copy(s).addScaledVector(_r,h);Dh.subVectors(e,c);const M=_r.dot(Dh),b=vr.dot(Dh);if(b>=0&&M<=b)return i.copy(c);const T=M*p-m*b;if(T<=0&&p>=0&&b<=0)return d=p/(p-b),i.copy(s).addScaledVector(vr,d);const y=g*b-M*x;if(y<=0&&x-g>=0&&M-b>=0)return lg.subVectors(c,l),d=(x-g)/(x-g+(M-b)),i.copy(l).addScaledVector(lg,d);const v=1/(y+T+_);return h=T*v,d=_*v,i.copy(s).addScaledVector(_r,h).addScaledVector(vr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const y_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ja={h:0,s:0,l:0},gc={h:0,s:0,l:0};function Oh(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class st{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=mi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Rt.workingColorSpace){return this.r=e,this.g=i,this.b=s,Rt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Rt.workingColorSpace){if(e=zy(e,1),i=Mt(i,0,1),s=Mt(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=Oh(h,c,e+1/3),this.g=Oh(h,c,e),this.b=Oh(h,c,e-1/3)}return Rt.colorSpaceToWorking(this,l),this}setStyle(e,i=mi){function s(c){c!==void 0&&parseFloat(c)<1&&ot("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:ot("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);ot("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=mi){const s=y_[e.toLowerCase()];return s!==void 0?this.setHex(s,i):ot("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ga(e.r),this.g=ga(e.g),this.b=ga(e.b),this}copyLinearToSRGB(e){return this.r=Ar(e.r),this.g=Ar(e.g),this.b=Ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mi){return Rt.workingToColorSpace(Un.copy(this),e),Math.round(Mt(Un.r*255,0,255))*65536+Math.round(Mt(Un.g*255,0,255))*256+Math.round(Mt(Un.b*255,0,255))}getHexString(e=mi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Rt.workingColorSpace){Rt.workingToColorSpace(Un.copy(this),i);const s=Un.r,l=Un.g,c=Un.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const g=(d+h)/2;if(d===h)m=0,p=0;else{const x=h-d;switch(p=g<=.5?x/(h+d):x/(2-h-d),h){case s:m=(l-c)/x+(l<c?6:0);break;case l:m=(c-s)/x+2;break;case c:m=(s-l)/x+4;break}m/=6}return e.h=m,e.s=p,e.l=g,e}getRGB(e,i=Rt.workingColorSpace){return Rt.workingToColorSpace(Un.copy(this),i),e.r=Un.r,e.g=Un.g,e.b=Un.b,e}getStyle(e=mi){Rt.workingToColorSpace(Un.copy(this),e);const i=Un.r,s=Un.g,l=Un.b;return e!==mi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(ja),this.setHSL(ja.h+e,ja.s+i,ja.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(ja),e.getHSL(gc);const s=xh(ja.h,gc.h,i),l=xh(ja.s,gc.s,i),c=xh(ja.l,gc.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Un=new st;st.NAMES=y_;let Ky=0;class Us extends Lr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ky++}),this.uuid=jo(),this.name="",this.type="Material",this.blending=Tr,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jh,this.blendDst=Zh,this.blendEquation=As,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yx,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){ot(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ot(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Tr&&(s.blending=this.blending),this.side!==es&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==jh&&(s.blendSrc=this.blendSrc),this.blendDst!==Zh&&(s.blendDst=this.blendDst),this.blendEquation!==As&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Rr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yx&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(s.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(e.textures),h=l(e.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Zd extends Us{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=t_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const fn=new K,_c=new lt;let Qy=0;class _i{constructor(e,i,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qy++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=jx,this.updateRanges=[],this.gpuType=xa,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)_c.fromBufferAttribute(this,i),_c.applyMatrix3(e),this.setXY(i,_c.x,_c.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyMatrix3(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyMatrix4(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.applyNormalMatrix(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)fn.fromBufferAttribute(this,i),fn.transformDirection(e),this.setXYZ(i,fn.x,fn.y,fn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=Uo(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=kn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Uo(i,this.array)),i}setX(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Uo(i,this.array)),i}setY(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Uo(i,this.array)),i}setZ(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Uo(i,this.array)),i}setW(e,i){return this.normalized&&(i=kn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array),l=kn(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array),l=kn(l,this.array),c=kn(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jx&&(e.usage=this.usage),e}}class M_ extends _i{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class b_ extends _i{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Wn extends _i{constructor(e,i,s){super(new Float32Array(e),i,s)}}let Jy=0;const pi=new Jt,Ph=new On,Sr=new K,ii=new Ko,Po=new Ko,Mn=new K;class qn extends Lr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jy++}),this.uuid=jo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(__(e)?b_:M_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new dt().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,i,s){return pi.makeTranslation(e,i,s),this.applyMatrix4(pi),this}scale(e,i,s){return pi.makeScale(e,i,s),this.applyMatrix4(pi),this}lookAt(e){return Ph.lookAt(e),Ph.updateMatrix(),this.applyMatrix4(Ph.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const h=e[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Wn(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ko);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ii.setFromBufferAttribute(c),this.morphTargetsRelative?(Mn.addVectors(this.boundingBox.min,ii.min),this.boundingBox.expandByPoint(Mn),Mn.addVectors(this.boundingBox.max,ii.max),this.boundingBox.expandByPoint(Mn)):(this.boundingBox.expandByPoint(ii.min),this.boundingBox.expandByPoint(ii.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&sn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qo);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){sn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const s=this.boundingSphere.center;if(ii.setFromBufferAttribute(e),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Po.setFromBufferAttribute(d),this.morphTargetsRelative?(Mn.addVectors(ii.min,Po.min),ii.expandByPoint(Mn),Mn.addVectors(ii.max,Po.max),ii.expandByPoint(Mn)):(ii.expandByPoint(Po.min),ii.expandByPoint(Po.max))}ii.getCenter(s);let l=0;for(let c=0,h=e.count;c<h;c++)Mn.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Mn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)Mn.fromBufferAttribute(d,p),m&&(Sr.fromBufferAttribute(e,p),Mn.add(Sr)),l=Math.max(l,s.distanceToSquared(Mn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&sn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){sn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _i(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let ne=0;ne<s.count;ne++)d[ne]=new K,m[ne]=new K;const p=new K,g=new K,x=new K,_=new lt,M=new lt,b=new lt,T=new K,y=new K;function v(ne,w,C){p.fromBufferAttribute(s,ne),g.fromBufferAttribute(s,w),x.fromBufferAttribute(s,C),_.fromBufferAttribute(c,ne),M.fromBufferAttribute(c,w),b.fromBufferAttribute(c,C),g.sub(p),x.sub(p),M.sub(_),b.sub(_);const k=1/(M.x*b.y-b.x*M.y);isFinite(k)&&(T.copy(g).multiplyScalar(b.y).addScaledVector(x,-M.y).multiplyScalar(k),y.copy(x).multiplyScalar(M.x).addScaledVector(g,-b.x).multiplyScalar(k),d[ne].add(T),d[w].add(T),d[C].add(T),m[ne].add(y),m[w].add(y),m[C].add(y))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let ne=0,w=N.length;ne<w;++ne){const C=N[ne],k=C.start,ie=C.count;for(let ce=k,xe=k+ie;ce<xe;ce+=3)v(e.getX(ce+0),e.getX(ce+1),e.getX(ce+2))}const D=new K,P=new K,V=new K,L=new K;function B(ne){V.fromBufferAttribute(l,ne),L.copy(V);const w=d[ne];D.copy(w),D.sub(V.multiplyScalar(V.dot(w))).normalize(),P.crossVectors(L,w);const k=P.dot(m[ne])<0?-1:1;h.setXYZW(ne,D.x,D.y,D.z,k)}for(let ne=0,w=N.length;ne<w;++ne){const C=N[ne],k=C.start,ie=C.count;for(let ce=k,xe=k+ie;ce<xe;ce+=3)B(e.getX(ce+0)),B(e.getX(ce+1)),B(e.getX(ce+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new _i(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let _=0,M=s.count;_<M;_++)s.setXYZ(_,0,0,0);const l=new K,c=new K,h=new K,d=new K,m=new K,p=new K,g=new K,x=new K;if(e)for(let _=0,M=e.count;_<M;_+=3){const b=e.getX(_+0),T=e.getX(_+1),y=e.getX(_+2);l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,T),h.fromBufferAttribute(i,y),g.subVectors(h,c),x.subVectors(l,c),g.cross(x),d.fromBufferAttribute(s,b),m.fromBufferAttribute(s,T),p.fromBufferAttribute(s,y),d.add(g),m.add(g),p.add(g),s.setXYZ(b,d.x,d.y,d.z),s.setXYZ(T,m.x,m.y,m.z),s.setXYZ(y,p.x,p.y,p.z)}else for(let _=0,M=i.count;_<M;_+=3)l.fromBufferAttribute(i,_+0),c.fromBufferAttribute(i,_+1),h.fromBufferAttribute(i,_+2),g.subVectors(h,c),x.subVectors(l,c),g.cross(x),s.setXYZ(_+0,g.x,g.y,g.z),s.setXYZ(_+1,g.x,g.y,g.z),s.setXYZ(_+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Mn.fromBufferAttribute(e,i),Mn.normalize(),e.setXYZ(i,Mn.x,Mn.y,Mn.z)}toNonIndexed(){function e(d,m){const p=d.array,g=d.itemSize,x=d.normalized,_=new p.constructor(m.length*g);let M=0,b=0;for(let T=0,y=m.length;T<y;T++){d.isInterleavedBufferAttribute?M=m[T]*d.data.stride+d.offset:M=m[T]*g;for(let v=0;v<g;v++)_[b++]=p[M++]}return new _i(_,g,x)}if(this.index===null)return ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new qn,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=e(m,s);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,x=p.length;g<x;g++){const _=p[g],M=e(_,s);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let x=0,_=p.length;x<_;x++){const M=p[x];g.push(M.toJSON(e.data))}g.length>0&&(l[m]=g,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const c=e.morphAttributes;for(const p in c){const g=[],x=c[p];for(let _=0,M=x.length;_<M;_++)g.push(x[_].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let p=0,g=h.length;p<g;p++){const x=h[p];this.addGroup(x.start,x.count,x.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cg=new Jt,ys=new jd,vc=new Qo,ug=new K,Sc=new K,yc=new K,Mc=new K,zh=new K,bc=new K,fg=new K,Ec=new K;class Ii extends On{constructor(e=new qn,i=new Zd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(c&&d){bc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],x=c[m];g!==0&&(zh.fromBufferAttribute(x,e),h?bc.addScaledVector(zh,g):bc.addScaledVector(zh.sub(i),g))}i.add(bc)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),vc.copy(s.boundingSphere),vc.applyMatrix4(c),ys.copy(e.ray).recast(e.near),!(vc.containsPoint(ys.origin)===!1&&(ys.intersectSphere(vc,ug)===null||ys.origin.distanceToSquared(ug)>(e.far-e.near)**2))&&(cg.copy(c).invert(),ys.copy(e.ray).applyMatrix4(cg),!(s.boundingBox!==null&&ys.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,ys)))}_computeIntersections(e,i,s){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,x=c.attributes.normal,_=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(h))for(let b=0,T=_.length;b<T;b++){const y=_[b],v=h[y.materialIndex],N=Math.max(y.start,M.start),D=Math.min(d.count,Math.min(y.start+y.count,M.start+M.count));for(let P=N,V=D;P<V;P+=3){const L=d.getX(P),B=d.getX(P+1),ne=d.getX(P+2);l=Tc(this,v,e,s,p,g,x,L,B,ne),l&&(l.faceIndex=Math.floor(P/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),T=Math.min(d.count,M.start+M.count);for(let y=b,v=T;y<v;y+=3){const N=d.getX(y),D=d.getX(y+1),P=d.getX(y+2);l=Tc(this,h,e,s,p,g,x,N,D,P),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let b=0,T=_.length;b<T;b++){const y=_[b],v=h[y.materialIndex],N=Math.max(y.start,M.start),D=Math.min(m.count,Math.min(y.start+y.count,M.start+M.count));for(let P=N,V=D;P<V;P+=3){const L=P,B=P+1,ne=P+2;l=Tc(this,v,e,s,p,g,x,L,B,ne),l&&(l.faceIndex=Math.floor(P/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),T=Math.min(m.count,M.start+M.count);for(let y=b,v=T;y<v;y+=3){const N=y,D=y+1,P=y+2;l=Tc(this,h,e,s,p,g,x,N,D,P),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function $y(o,e,i,s,l,c,h,d){let m;if(e.side===Xn?m=s.intersectTriangle(h,c,l,!0,d):m=s.intersectTriangle(l,c,h,e.side===es,d),m===null)return null;Ec.copy(d),Ec.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(Ec);return p<i.near||p>i.far?null:{distance:p,point:Ec.clone(),object:o}}function Tc(o,e,i,s,l,c,h,d,m,p){o.getVertexPosition(d,Sc),o.getVertexPosition(m,yc),o.getVertexPosition(p,Mc);const g=$y(o,e,i,s,Sc,yc,Mc,fg);if(g){const x=new K;xi.getBarycoord(fg,Sc,yc,Mc,x),l&&(g.uv=xi.getInterpolatedAttribute(l,d,m,p,x,new lt)),c&&(g.uv1=xi.getInterpolatedAttribute(c,d,m,p,x,new lt)),h&&(g.normal=xi.getInterpolatedAttribute(h,d,m,p,x,new K),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const _={a:d,b:m,c:p,normal:new K,materialIndex:0};xi.getNormal(Sc,yc,Mc,_.normal),g.face=_,g.barycoord=x}return g}class Ds extends qn{constructor(e=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],g=[],x=[];let _=0,M=0;b("z","y","x",-1,-1,s,i,e,h,c,0),b("z","y","x",1,-1,s,i,-e,h,c,1),b("x","z","y",1,1,e,s,i,l,h,2),b("x","z","y",1,-1,e,s,-i,l,h,3),b("x","y","z",1,-1,e,i,s,l,c,4),b("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Wn(p,3)),this.setAttribute("normal",new Wn(g,3)),this.setAttribute("uv",new Wn(x,2));function b(T,y,v,N,D,P,V,L,B,ne,w){const C=P/B,k=V/ne,ie=P/2,ce=V/2,xe=L/2,he=B+1,F=ne+1;let j=0,Y=0;const _e=new K;for(let ve=0;ve<F;ve++){const O=ve*k-ce;for(let re=0;re<he;re++){const Me=re*C-ie;_e[T]=Me*N,_e[y]=O*D,_e[v]=xe,p.push(_e.x,_e.y,_e.z),_e[T]=0,_e[y]=0,_e[v]=L>0?1:-1,g.push(_e.x,_e.y,_e.z),x.push(re/B),x.push(1-ve/ne),j+=1}}for(let ve=0;ve<ne;ve++)for(let O=0;O<B;O++){const re=_+O+he*ve,Me=_+O+he*(ve+1),Te=_+(O+1)+he*(ve+1),Pe=_+(O+1)+he*ve;m.push(re,Me,Pe),m.push(Me,Te,Pe),Y+=6}d.addGroup(M,Y,w),M+=Y,_+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ds(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ur(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const l=o[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone():Array.isArray(l)?e[i][s]=l.slice():e[i][s]=l}}return e}function zn(o){const e={};for(let i=0;i<o.length;i++){const s=Ur(o[i]);for(const l in s)e[l]=s[l]}return e}function eM(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function E_(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const Yo={clone:Ur,merge:zn};var tM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nn extends Us{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tM,this.fragmentShader=nM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ur(e.uniforms),this.uniformsGroups=eM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class T_ extends On{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=Oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Za=new K,hg=new lt,dg=new lt;class ai extends T_{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Od*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Od*2*Math.atan(Math.tan(Gc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Za.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Za.x,Za.y).multiplyScalar(-e/Za.z),Za.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Za.x,Za.y).multiplyScalar(-e/Za.z)}getViewSize(e,i){return this.getViewBounds(e,hg,dg),i.subVectors(dg,hg)}setViewOffset(e,i,s,l,c,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Gc*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(c+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const yr=-90,Mr=1;class iM extends On{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new ai(yr,Mr,e,i);l.layers=this.layers,this.add(l);const c=new ai(yr,Mr,e,i);c.layers=this.layers,this.add(c);const h=new ai(yr,Mr,e,i);h.layers=this.layers,this.add(h);const d=new ai(yr,Mr,e,i);d.layers=this.layers,this.add(d);const m=new ai(yr,Mr,e,i);m.layers=this.layers,this.add(m);const p=new ai(yr,Mr,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(e===Oi)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Yc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,g]=this.children,x=e.getRenderTarget(),_=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;const T=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,l),e.render(i,c),e.setRenderTarget(s,1,l),e.render(i,h),e.setRenderTarget(s,2,l),e.render(i,d),e.setRenderTarget(s,3,l),e.render(i,m),e.setRenderTarget(s,4,l),e.render(i,p),s.texture.generateMipmaps=T,e.setRenderTarget(s,5,l),e.render(i,g),e.setRenderTarget(x,_,M),e.xr.enabled=b,s.texture.needsPMREMUpdate=!0}}class A_ extends Ln{constructor(e=[],i=Cr,s,l,c,h,d,m,p,g){super(e,i,s,l,c,h,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class aM extends Ri{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new A_(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Ds(5,5,5),c=new Nn({name:"CubemapFromEquirect",uniforms:Ur(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Xn,blending:Pi});c.uniforms.tEquirect.value=i;const h=new Ii(l,c),d=i.minFilter;return i.minFilter===Cs&&(i.minFilter=gi),new iM(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,s,l);e.setRenderTarget(c)}}class Ho extends On{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sM={type:"move"};class Bh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ho,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ho,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ho,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){h=!0;for(const T of e.hand.values()){const y=i.getJointPose(T,s),v=this._getHandJoint(p,T);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const g=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],_=g.position.distanceTo(x.position),M=.02,b=.005;p.inputState.pinching&&_>M+b?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&_<=M-b&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(sM)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Ho;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}class Kd{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new st(e),this.density=i}clone(){return new Kd(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class rM extends On{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fi,this.environmentIntensity=1,this.environmentRotation=new Fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class oM extends Ln{constructor(e=null,i=1,s=1,l,c,h,d,m,p=si,g=si,x,_){super(null,h,d,m,p,g,l,c,x,_),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fh=new K,lM=new K,cM=new dt;class Ts{constructor(e=new K(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Fh.subVectors(s,i).cross(lM.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const s=e.delta(Fh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(e.start).addScaledVector(s,c)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||cM.getNormalMatrix(e),l=this.coplanarPoint(Fh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ms=new Qo,uM=new lt(.5,.5),Ac=new K;class Qd{constructor(e=new Ts,i=new Ts,s=new Ts,l=new Ts,c=new Ts,h=new Ts){this.planes=[e,i,s,l,c,h]}set(e,i,s,l,c,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Oi,s=!1){const l=this.planes,c=e.elements,h=c[0],d=c[1],m=c[2],p=c[3],g=c[4],x=c[5],_=c[6],M=c[7],b=c[8],T=c[9],y=c[10],v=c[11],N=c[12],D=c[13],P=c[14],V=c[15];if(l[0].setComponents(p-h,M-g,v-b,V-N).normalize(),l[1].setComponents(p+h,M+g,v+b,V+N).normalize(),l[2].setComponents(p+d,M+x,v+T,V+D).normalize(),l[3].setComponents(p-d,M-x,v-T,V-D).normalize(),s)l[4].setComponents(m,_,y,P).normalize(),l[5].setComponents(p-m,M-_,v-y,V-P).normalize();else if(l[4].setComponents(p-m,M-_,v-y,V-P).normalize(),i===Oi)l[5].setComponents(p+m,M+_,v+y,V+P).normalize();else if(i===Yc)l[5].setComponents(m,_,y,P).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ms.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(e){Ms.center.set(0,0,0);const i=uM.distanceTo(e.center);return Ms.radius=.7071067811865476+i,Ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Ac.x=l.normal.x>0?e.max.x:e.min.x,Ac.y=l.normal.y>0?e.max.y:e.min.y,Ac.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Ac)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Jd extends Us{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Zc=new K,Kc=new K,pg=new Jt,zo=new jd,Rc=new Qo,Ih=new K,mg=new K;class fM extends On{constructor(e=new qn,i=new Jd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)Zc.fromBufferAttribute(i,l-1),Kc.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Zc.distanceTo(Kc);e.setAttribute("lineDistance",new Wn(s,1))}else ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,c=e.params.Line.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Rc.copy(s.boundingSphere),Rc.applyMatrix4(l),Rc.radius+=c,e.ray.intersectsSphere(Rc)===!1)return;pg.copy(l).invert(),zo.copy(e.ray).applyMatrix4(pg);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=s.index,_=s.attributes.position;if(g!==null){const M=Math.max(0,h.start),b=Math.min(g.count,h.start+h.count);for(let T=M,y=b-1;T<y;T+=p){const v=g.getX(T),N=g.getX(T+1),D=Cc(this,e,zo,m,v,N,T);D&&i.push(D)}if(this.isLineLoop){const T=g.getX(b-1),y=g.getX(M),v=Cc(this,e,zo,m,T,y,b-1);v&&i.push(v)}}else{const M=Math.max(0,h.start),b=Math.min(_.count,h.start+h.count);for(let T=M,y=b-1;T<y;T+=p){const v=Cc(this,e,zo,m,T,T+1,T);v&&i.push(v)}if(this.isLineLoop){const T=Cc(this,e,zo,m,b-1,M,b-1);T&&i.push(T)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Cc(o,e,i,s,l,c,h){const d=o.geometry.attributes.position;if(Zc.fromBufferAttribute(d,l),Kc.fromBufferAttribute(d,c),i.distanceSqToSegment(Zc,Kc,Ih,mg)>s)return;Ih.applyMatrix4(o.matrixWorld);const p=e.ray.origin.distanceTo(Ih);if(!(p<e.near||p>e.far))return{distance:p,point:mg.clone().applyMatrix4(o.matrixWorld),index:h,face:null,faceIndex:null,barycoord:null,object:o}}const xg=new K,gg=new K;class R_ extends fM{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)xg.fromBufferAttribute(i,l),gg.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+xg.distanceTo(gg);e.setAttribute("lineDistance",new Wn(s,1))}else ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class C_ extends Us{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _g=new Jt,Pd=new jd,wc=new Qo,Dc=new K;class hM extends On{constructor(e=new qn,i=new C_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,c=e.params.Points.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),wc.copy(s.boundingSphere),wc.applyMatrix4(l),wc.radius+=c,e.ray.intersectsSphere(wc)===!1)return;_g.copy(l).invert(),Pd.copy(e.ray).applyMatrix4(_g);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=s.index,x=s.attributes.position;if(p!==null){const _=Math.max(0,h.start),M=Math.min(p.count,h.start+h.count);for(let b=_,T=M;b<T;b++){const y=p.getX(b);Dc.fromBufferAttribute(x,y),vg(Dc,y,m,l,e,i,this)}}else{const _=Math.max(0,h.start),M=Math.min(x.count,h.start+h.count);for(let b=_,T=M;b<T;b++)Dc.fromBufferAttribute(x,b),vg(Dc,b,m,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function vg(o,e,i,s,l,c,h){const d=Pd.distanceSqToPoint(o);if(d<i){const m=new K;Pd.closestPointToPoint(o,m),m.applyMatrix4(s);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:e,face:null,faceIndex:null,barycoord:null,object:h})}}class dM extends Ln{constructor(e,i,s,l,c,h,d,m,p){super(e,i,s,l,c,h,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class w_ extends Ln{constructor(e,i,s=ws,l,c,h,d=si,m=si,p,g=Xo,x=1){if(g!==Xo&&g!==Wo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const _={width:e,height:i,depth:x};super(_,l,c,h,d,m,g,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class D_ extends Ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}const Uc=new K,Nc=new K,Hh=new K,Lc=new xi;class pM extends qn{constructor(e=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:i},e!==null){const l=Math.pow(10,4),c=Math.cos(Gc*i),h=e.getIndex(),d=e.getAttribute("position"),m=h?h.count:d.count,p=[0,0,0],g=["a","b","c"],x=new Array(3),_={},M=[];for(let b=0;b<m;b+=3){h?(p[0]=h.getX(b),p[1]=h.getX(b+1),p[2]=h.getX(b+2)):(p[0]=b,p[1]=b+1,p[2]=b+2);const{a:T,b:y,c:v}=Lc;if(T.fromBufferAttribute(d,p[0]),y.fromBufferAttribute(d,p[1]),v.fromBufferAttribute(d,p[2]),Lc.getNormal(Hh),x[0]=`${Math.round(T.x*l)},${Math.round(T.y*l)},${Math.round(T.z*l)}`,x[1]=`${Math.round(y.x*l)},${Math.round(y.y*l)},${Math.round(y.z*l)}`,x[2]=`${Math.round(v.x*l)},${Math.round(v.y*l)},${Math.round(v.z*l)}`,!(x[0]===x[1]||x[1]===x[2]||x[2]===x[0]))for(let N=0;N<3;N++){const D=(N+1)%3,P=x[N],V=x[D],L=Lc[g[N]],B=Lc[g[D]],ne=`${P}_${V}`,w=`${V}_${P}`;w in _&&_[w]?(Hh.dot(_[w].normal)<=c&&(M.push(L.x,L.y,L.z),M.push(B.x,B.y,B.z)),_[w]=null):ne in _||(_[ne]={index0:p[N],index1:p[D],normal:Hh.clone()})}}for(const b in _)if(_[b]){const{index0:T,index1:y}=_[b];Uc.fromBufferAttribute(d,T),Nc.fromBufferAttribute(d,y),M.push(Uc.x,Uc.y,Uc.z),M.push(Nc.x,Nc.y,Nc.z)}this.setAttribute("position",new Wn(M,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class $c extends qn{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,x=e/d,_=i/m,M=[],b=[],T=[],y=[];for(let v=0;v<g;v++){const N=v*_-h;for(let D=0;D<p;D++){const P=D*x-c;b.push(P,-N,0),T.push(0,0,1),y.push(D/d),y.push(1-v/m)}}for(let v=0;v<m;v++)for(let N=0;N<d;N++){const D=N+p*v,P=N+p*(v+1),V=N+1+p*(v+1),L=N+1+p*v;M.push(D,P,L),M.push(P,V,L)}this.setIndex(M),this.setAttribute("position",new Wn(b,3)),this.setAttribute("normal",new Wn(T,3)),this.setAttribute("uv",new Wn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $c(e.width,e.height,e.widthSegments,e.heightSegments)}}class mM extends Nn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xM extends Us{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=x_,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gM extends xM{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new lt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(i){this.ior=(1+.4*i)/(1-.4*i)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new st(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new st(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new st(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class _M extends Us{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ey,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vM extends Us{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class U_ extends On{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=i}dispose(){}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}const Gh=new Jt,Sg=new K,yg=new K;class SM{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=Bi,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qd,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera,s=this.matrix;Sg.setFromMatrixPosition(e.matrixWorld),i.position.copy(Sg),yg.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(yg),i.updateMatrixWorld(),Gh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gh,i.coordinateSystem,i.reversedDepth),i.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Gh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Mg=new Jt,Bo=new K,Vh=new K;class yM extends SM{constructor(){super(new ai(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new lt(4,2),this._viewportCount=6,this._viewports=[new kt(2,1,1,1),new kt(0,1,1,1),new kt(3,1,1,1),new kt(1,1,1,1),new kt(3,0,1,1),new kt(1,0,1,1)],this._cubeDirections=[new K(1,0,0),new K(-1,0,0),new K(0,0,1),new K(0,0,-1),new K(0,1,0),new K(0,-1,0)],this._cubeUps=[new K(0,1,0),new K(0,1,0),new K(0,1,0),new K(0,1,0),new K(0,0,1),new K(0,0,-1)]}updateMatrices(e,i=0){const s=this.camera,l=this.matrix,c=e.distance||s.far;c!==s.far&&(s.far=c,s.updateProjectionMatrix()),Bo.setFromMatrixPosition(e.matrixWorld),s.position.copy(Bo),Vh.copy(s.position),Vh.add(this._cubeDirections[i]),s.up.copy(this._cubeUps[i]),s.lookAt(Vh),s.updateMatrixWorld(),l.makeTranslation(-Bo.x,-Bo.y,-Bo.z),Mg.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mg,s.coordinateSystem,s.reversedDepth)}}class bg extends U_{constructor(e,i,s=0,l=2){super(e,i),this.isPointLight=!0,this.type="PointLight",this.distance=s,this.decay=l,this.shadow=new yM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,i){return super.copy(e,i),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class N_ extends T_{constructor(e=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,h=s+e,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class MM extends U_{constructor(e,i){super(e,i),this.isAmbientLight=!0,this.type="AmbientLight"}}class bM extends ai{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class EM{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=performance.now();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}class TM extends R_{constructor(e=10,i=10,s=4473924,l=8947848){s=new st(s),l=new st(l);const c=i/2,h=e/i,d=e/2,m=[],p=[];for(let _=0,M=0,b=-d;_<=i;_++,b+=h){m.push(-d,0,b,d,0,b),m.push(b,0,-d,b,0,d);const T=_===c?s:l;T.toArray(p,M),M+=3,T.toArray(p,M),M+=3,T.toArray(p,M),M+=3,T.toArray(p,M),M+=3}const g=new qn;g.setAttribute("position",new Wn(m,3)),g.setAttribute("color",new Wn(p,3));const x=new Jd({vertexColors:!0,toneMapped:!1});super(g,x),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function Eg(o,e,i,s){const l=AM(s);switch(i){case d_:return o*e;case m_:return o*e/l.components*l.byteLength;case kd:return o*e/l.components*l.byteLength;case Xd:return o*e*2/l.components*l.byteLength;case Wd:return o*e*2/l.components*l.byteLength;case p_:return o*e*3/l.components*l.byteLength;case Ai:return o*e*4/l.components*l.byteLength;case qd:return o*e*4/l.components*l.byteLength;case Bc:case Fc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Ic:case Hc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case od:case cd:return Math.max(o,16)*Math.max(e,8)/4;case rd:case ld:return Math.max(o,8)*Math.max(e,8)/2;case ud:case fd:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case hd:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case dd:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case pd:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case md:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case xd:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case gd:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case _d:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case vd:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Sd:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case yd:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Md:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case bd:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Ed:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Td:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Ad:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Rd:case Cd:case wd:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Dd:case Ud:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Nd:case Ld:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function AM(o){switch(o){case Bi:case c_:return{byteLength:1,components:1};case Vo:case u_:case zi:return{byteLength:2,components:1};case Gd:case Vd:return{byteLength:2,components:4};case ws:case Hd:case xa:return{byteLength:4,components:1};case f_:case h_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fd}}));typeof window<"u"&&(window.__THREE__?ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fd);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function L_(){let o=null,e=!1,i=null,s=null;function l(c,h){i(c,h),s=o.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(s=o.requestAnimationFrame(l),e=!0)},stop:function(){o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){o=c}}}function RM(o){const e=new WeakMap;function i(d,m){const p=d.array,g=d.usage,x=p.byteLength,_=o.createBuffer();o.bindBuffer(m,_),o.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=o.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)M=o.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=o.SHORT;else if(p instanceof Uint32Array)M=o.UNSIGNED_INT;else if(p instanceof Int32Array)M=o.INT;else if(p instanceof Int8Array)M=o.BYTE;else if(p instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:_,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:x}}function s(d,m,p){const g=m.array,x=m.updateRanges;if(o.bindBuffer(p,d),x.length===0)o.bufferSubData(p,0,g);else{x.sort((M,b)=>M.start-b.start);let _=0;for(let M=1;M<x.length;M++){const b=x[_],T=x[M];T.start<=b.start+b.count+1?b.count=Math.max(b.count,T.start+T.count-b.start):(++_,x[_]=T)}x.length=_+1;for(let M=0,b=x.length;M<b;M++){const T=x[M];o.bufferSubData(p,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(o.deleteBuffer(m.buffer),e.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=e.get(d);(!g||g.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var CM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wM=`#ifdef USE_ALPHAHASH
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
#endif`,DM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,UM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,LM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,OM=`#ifdef USE_AOMAP
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
#endif`,PM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zM=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,BM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,FM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,IM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,HM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,GM=`#ifdef USE_IRIDESCENCE
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
#endif`,VM=`#ifdef USE_BUMPMAP
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
#endif`,kM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,XM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,WM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,YM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ZM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,KM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,QM=`#define PI 3.141592653589793
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
} // validated`,JM=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$M=`vec3 transformedNormal = objectNormal;
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
#endif`,eb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ib=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ab="gl_FragColor = linearToOutputTexel( gl_FragColor );",sb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rb=`#ifdef USE_ENVMAP
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
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ob=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lb=`#ifdef USE_ENVMAP
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
#endif`,cb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ub=`#ifdef USE_ENVMAP
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
#endif`,fb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,db=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mb=`#ifdef USE_GRADIENTMAP
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
}`,xb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_b=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vb=`uniform bool receiveShadow;
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
#endif`,Sb=`#ifdef USE_ENVMAP
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
#endif`,yb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Ab=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
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
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rb=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif`,Cb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
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
#endif`,wb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Db=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ub=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ob=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bb=`#if defined( USE_POINTS_UV )
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
#endif`,Fb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ib=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kb=`#ifdef USE_MORPHTARGETS
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
#endif`,Xb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kb=`#ifdef USE_NORMALMAP
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
#endif`,Qb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$b=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,e1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,t1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,n1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,i1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,a1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,s1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,o1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,l1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,c1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,u1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,h1=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,d1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,p1=`#ifdef USE_SKINNING
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
#endif`,m1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,x1=`#ifdef USE_SKINNING
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
#endif`,g1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,v1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,y1=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,M1=`#ifdef USE_TRANSMISSION
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
#endif`,b1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
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
}`,C1=`uniform sampler2D t2D;
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
}`,w1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,U1=`varying vec3 vWorldDirection;
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
}`,L1=`#include <common>
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
}`,P1=`#define DISTANCE
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
}`,z1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
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
	gl_FragColor = packDepthToRGBA( dist );
}`,B1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I1=`uniform float scale;
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
}`,H1=`uniform vec3 diffuse;
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
}`,V1=`uniform vec3 diffuse;
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
}`,k1=`#define LAMBERT
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
}`,X1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,W1=`#define MATCAP
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
}`,q1=`#define MATCAP
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
}`,Y1=`#define NORMAL
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
}`,j1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Z1=`#define PHONG
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
}`,K1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,Q1=`#define STANDARD
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
}`,J1=`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,$1=`#define TOON
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
}`,e3=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,t3=`uniform float size;
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
}`,n3=`uniform vec3 diffuse;
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
}`,i3=`#include <common>
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
}`,a3=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,s3=`uniform float rotation;
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
}`,r3=`uniform vec3 diffuse;
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
}`,xt={alphahash_fragment:CM,alphahash_pars_fragment:wM,alphamap_fragment:DM,alphamap_pars_fragment:UM,alphatest_fragment:NM,alphatest_pars_fragment:LM,aomap_fragment:OM,aomap_pars_fragment:PM,batching_pars_vertex:zM,batching_vertex:BM,begin_vertex:FM,beginnormal_vertex:IM,bsdfs:HM,iridescence_fragment:GM,bumpmap_pars_fragment:VM,clipping_planes_fragment:kM,clipping_planes_pars_fragment:XM,clipping_planes_pars_vertex:WM,clipping_planes_vertex:qM,color_fragment:YM,color_pars_fragment:jM,color_pars_vertex:ZM,color_vertex:KM,common:QM,cube_uv_reflection_fragment:JM,defaultnormal_vertex:$M,displacementmap_pars_vertex:eb,displacementmap_vertex:tb,emissivemap_fragment:nb,emissivemap_pars_fragment:ib,colorspace_fragment:ab,colorspace_pars_fragment:sb,envmap_fragment:rb,envmap_common_pars_fragment:ob,envmap_pars_fragment:lb,envmap_pars_vertex:cb,envmap_physical_pars_fragment:Sb,envmap_vertex:ub,fog_vertex:fb,fog_pars_vertex:hb,fog_fragment:db,fog_pars_fragment:pb,gradientmap_pars_fragment:mb,lightmap_pars_fragment:xb,lights_lambert_fragment:gb,lights_lambert_pars_fragment:_b,lights_pars_begin:vb,lights_toon_fragment:yb,lights_toon_pars_fragment:Mb,lights_phong_fragment:bb,lights_phong_pars_fragment:Eb,lights_physical_fragment:Tb,lights_physical_pars_fragment:Ab,lights_fragment_begin:Rb,lights_fragment_maps:Cb,lights_fragment_end:wb,logdepthbuf_fragment:Db,logdepthbuf_pars_fragment:Ub,logdepthbuf_pars_vertex:Nb,logdepthbuf_vertex:Lb,map_fragment:Ob,map_pars_fragment:Pb,map_particle_fragment:zb,map_particle_pars_fragment:Bb,metalnessmap_fragment:Fb,metalnessmap_pars_fragment:Ib,morphinstance_vertex:Hb,morphcolor_vertex:Gb,morphnormal_vertex:Vb,morphtarget_pars_vertex:kb,morphtarget_vertex:Xb,normal_fragment_begin:Wb,normal_fragment_maps:qb,normal_pars_fragment:Yb,normal_pars_vertex:jb,normal_vertex:Zb,normalmap_pars_fragment:Kb,clearcoat_normal_fragment_begin:Qb,clearcoat_normal_fragment_maps:Jb,clearcoat_pars_fragment:$b,iridescence_pars_fragment:e1,opaque_fragment:t1,packing:n1,premultiplied_alpha_fragment:i1,project_vertex:a1,dithering_fragment:s1,dithering_pars_fragment:r1,roughnessmap_fragment:o1,roughnessmap_pars_fragment:l1,shadowmap_pars_fragment:c1,shadowmap_pars_vertex:u1,shadowmap_vertex:f1,shadowmask_pars_fragment:h1,skinbase_vertex:d1,skinning_pars_vertex:p1,skinning_vertex:m1,skinnormal_vertex:x1,specularmap_fragment:g1,specularmap_pars_fragment:_1,tonemapping_fragment:v1,tonemapping_pars_fragment:S1,transmission_fragment:y1,transmission_pars_fragment:M1,uv_pars_fragment:b1,uv_pars_vertex:E1,uv_vertex:T1,worldpos_vertex:A1,background_vert:R1,background_frag:C1,backgroundCube_vert:w1,backgroundCube_frag:D1,cube_vert:U1,cube_frag:N1,depth_vert:L1,depth_frag:O1,distanceRGBA_vert:P1,distanceRGBA_frag:z1,equirect_vert:B1,equirect_frag:F1,linedashed_vert:I1,linedashed_frag:H1,meshbasic_vert:G1,meshbasic_frag:V1,meshlambert_vert:k1,meshlambert_frag:X1,meshmatcap_vert:W1,meshmatcap_frag:q1,meshnormal_vert:Y1,meshnormal_frag:j1,meshphong_vert:Z1,meshphong_frag:K1,meshphysical_vert:Q1,meshphysical_frag:J1,meshtoon_vert:$1,meshtoon_frag:e3,points_vert:t3,points_frag:n3,shadow_vert:i3,shadow_frag:a3,sprite_vert:s3,sprite_frag:r3},Le={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Li={basic:{uniforms:zn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:xt.meshbasic_vert,fragmentShader:xt.meshbasic_frag},lambert:{uniforms:zn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new st(0)}}]),vertexShader:xt.meshlambert_vert,fragmentShader:xt.meshlambert_frag},phong:{uniforms:zn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:xt.meshphong_vert,fragmentShader:xt.meshphong_frag},standard:{uniforms:zn([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag},toon:{uniforms:zn([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new st(0)}}]),vertexShader:xt.meshtoon_vert,fragmentShader:xt.meshtoon_frag},matcap:{uniforms:zn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:xt.meshmatcap_vert,fragmentShader:xt.meshmatcap_frag},points:{uniforms:zn([Le.points,Le.fog]),vertexShader:xt.points_vert,fragmentShader:xt.points_frag},dashed:{uniforms:zn([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xt.linedashed_vert,fragmentShader:xt.linedashed_frag},depth:{uniforms:zn([Le.common,Le.displacementmap]),vertexShader:xt.depth_vert,fragmentShader:xt.depth_frag},normal:{uniforms:zn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:xt.meshnormal_vert,fragmentShader:xt.meshnormal_frag},sprite:{uniforms:zn([Le.sprite,Le.fog]),vertexShader:xt.sprite_vert,fragmentShader:xt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xt.background_vert,fragmentShader:xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:xt.backgroundCube_vert,fragmentShader:xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xt.cube_vert,fragmentShader:xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xt.equirect_vert,fragmentShader:xt.equirect_frag},distanceRGBA:{uniforms:zn([Le.common,Le.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xt.distanceRGBA_vert,fragmentShader:xt.distanceRGBA_frag},shadow:{uniforms:zn([Le.lights,Le.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:xt.shadow_vert,fragmentShader:xt.shadow_frag}};Li.physical={uniforms:zn([Li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag};const Oc={r:0,b:0,g:0},bs=new Fi,o3=new Jt;function l3(o,e,i,s,l,c,h){const d=new st(0);let m=c===!0?0:1,p,g,x=null,_=0,M=null;function b(D){let P=D.isScene===!0?D.background:null;return P&&P.isTexture&&(P=(D.backgroundBlurriness>0?i:e).get(P)),P}function T(D){let P=!1;const V=b(D);V===null?v(d,m):V&&V.isColor&&(v(V,1),P=!0);const L=o.xr.getEnvironmentBlendMode();L==="additive"?s.buffers.color.setClear(0,0,0,1,h):L==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(o.autoClear||P)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function y(D,P){const V=b(P);V&&(V.isCubeTexture||V.mapping===Jc)?(g===void 0&&(g=new Ii(new Ds(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:Ur(Li.backgroundCube.uniforms),vertexShader:Li.backgroundCube.vertexShader,fragmentShader:Li.backgroundCube.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(L,B,ne){this.matrixWorld.copyPosition(ne.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),bs.copy(P.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,V.isCubeTexture&&V.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),g.material.uniforms.envMap.value=V,g.material.uniforms.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(o3.makeRotationFromEuler(bs)),g.material.toneMapped=Rt.getTransfer(V.colorSpace)!==Ft,(x!==V||_!==V.version||M!==o.toneMapping)&&(g.material.needsUpdate=!0,x=V,_=V.version,M=o.toneMapping),g.layers.enableAll(),D.unshift(g,g.geometry,g.material,0,0,null)):V&&V.isTexture&&(p===void 0&&(p=new Ii(new $c(2,2),new Nn({name:"BackgroundMaterial",uniforms:Ur(Li.background.uniforms),vertexShader:Li.background.vertexShader,fragmentShader:Li.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=V,p.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,p.material.toneMapped=Rt.getTransfer(V.colorSpace)!==Ft,V.matrixAutoUpdate===!0&&V.updateMatrix(),p.material.uniforms.uvTransform.value.copy(V.matrix),(x!==V||_!==V.version||M!==o.toneMapping)&&(p.material.needsUpdate=!0,x=V,_=V.version,M=o.toneMapping),p.layers.enableAll(),D.unshift(p,p.geometry,p.material,0,0,null))}function v(D,P){D.getRGB(Oc,E_(o)),s.buffers.color.setClear(Oc.r,Oc.g,Oc.b,P,h)}function N(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(D,P=1){d.set(D),m=P,v(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(D){m=D,v(d,m)},render:T,addToRenderList:y,dispose:N}}function c3(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=_(null);let c=l,h=!1;function d(C,k,ie,ce,xe){let he=!1;const F=x(ce,ie,k);c!==F&&(c=F,p(c.object)),he=M(C,ce,ie,xe),he&&b(C,ce,ie,xe),xe!==null&&e.update(xe,o.ELEMENT_ARRAY_BUFFER),(he||h)&&(h=!1,P(C,k,ie,ce),xe!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(xe).buffer))}function m(){return o.createVertexArray()}function p(C){return o.bindVertexArray(C)}function g(C){return o.deleteVertexArray(C)}function x(C,k,ie){const ce=ie.wireframe===!0;let xe=s[C.id];xe===void 0&&(xe={},s[C.id]=xe);let he=xe[k.id];he===void 0&&(he={},xe[k.id]=he);let F=he[ce];return F===void 0&&(F=_(m()),he[ce]=F),F}function _(C){const k=[],ie=[],ce=[];for(let xe=0;xe<i;xe++)k[xe]=0,ie[xe]=0,ce[xe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:ie,attributeDivisors:ce,object:C,attributes:{},index:null}}function M(C,k,ie,ce){const xe=c.attributes,he=k.attributes;let F=0;const j=ie.getAttributes();for(const Y in j)if(j[Y].location>=0){const ve=xe[Y];let O=he[Y];if(O===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(O=C.instanceColor)),ve===void 0||ve.attribute!==O||O&&ve.data!==O.data)return!0;F++}return c.attributesNum!==F||c.index!==ce}function b(C,k,ie,ce){const xe={},he=k.attributes;let F=0;const j=ie.getAttributes();for(const Y in j)if(j[Y].location>=0){let ve=he[Y];ve===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(ve=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(ve=C.instanceColor));const O={};O.attribute=ve,ve&&ve.data&&(O.data=ve.data),xe[Y]=O,F++}c.attributes=xe,c.attributesNum=F,c.index=ce}function T(){const C=c.newAttributes;for(let k=0,ie=C.length;k<ie;k++)C[k]=0}function y(C){v(C,0)}function v(C,k){const ie=c.newAttributes,ce=c.enabledAttributes,xe=c.attributeDivisors;ie[C]=1,ce[C]===0&&(o.enableVertexAttribArray(C),ce[C]=1),xe[C]!==k&&(o.vertexAttribDivisor(C,k),xe[C]=k)}function N(){const C=c.newAttributes,k=c.enabledAttributes;for(let ie=0,ce=k.length;ie<ce;ie++)k[ie]!==C[ie]&&(o.disableVertexAttribArray(ie),k[ie]=0)}function D(C,k,ie,ce,xe,he,F){F===!0?o.vertexAttribIPointer(C,k,ie,xe,he):o.vertexAttribPointer(C,k,ie,ce,xe,he)}function P(C,k,ie,ce){T();const xe=ce.attributes,he=ie.getAttributes(),F=k.defaultAttributeValues;for(const j in he){const Y=he[j];if(Y.location>=0){let _e=xe[j];if(_e===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(_e=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(_e=C.instanceColor)),_e!==void 0){const ve=_e.normalized,O=_e.itemSize,re=e.get(_e);if(re===void 0)continue;const Me=re.buffer,Te=re.type,Pe=re.bytesPerElement,ae=Te===o.INT||Te===o.UNSIGNED_INT||_e.gpuType===Hd;if(_e.isInterleavedBufferAttribute){const ue=_e.data,we=ue.stride,He=_e.offset;if(ue.isInstancedInterleavedBuffer){for(let Xe=0;Xe<Y.locationSize;Xe++)v(Y.location+Xe,ue.meshPerAttribute);C.isInstancedMesh!==!0&&ce._maxInstanceCount===void 0&&(ce._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Xe=0;Xe<Y.locationSize;Xe++)y(Y.location+Xe);o.bindBuffer(o.ARRAY_BUFFER,Me);for(let Xe=0;Xe<Y.locationSize;Xe++)D(Y.location+Xe,O/Y.locationSize,Te,ve,we*Pe,(He+O/Y.locationSize*Xe)*Pe,ae)}else{if(_e.isInstancedBufferAttribute){for(let ue=0;ue<Y.locationSize;ue++)v(Y.location+ue,_e.meshPerAttribute);C.isInstancedMesh!==!0&&ce._maxInstanceCount===void 0&&(ce._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let ue=0;ue<Y.locationSize;ue++)y(Y.location+ue);o.bindBuffer(o.ARRAY_BUFFER,Me);for(let ue=0;ue<Y.locationSize;ue++)D(Y.location+ue,O/Y.locationSize,Te,ve,O*Pe,O/Y.locationSize*ue*Pe,ae)}}else if(F!==void 0){const ve=F[j];if(ve!==void 0)switch(ve.length){case 2:o.vertexAttrib2fv(Y.location,ve);break;case 3:o.vertexAttrib3fv(Y.location,ve);break;case 4:o.vertexAttrib4fv(Y.location,ve);break;default:o.vertexAttrib1fv(Y.location,ve)}}}}N()}function V(){ne();for(const C in s){const k=s[C];for(const ie in k){const ce=k[ie];for(const xe in ce)g(ce[xe].object),delete ce[xe];delete k[ie]}delete s[C]}}function L(C){if(s[C.id]===void 0)return;const k=s[C.id];for(const ie in k){const ce=k[ie];for(const xe in ce)g(ce[xe].object),delete ce[xe];delete k[ie]}delete s[C.id]}function B(C){for(const k in s){const ie=s[k];if(ie[C.id]===void 0)continue;const ce=ie[C.id];for(const xe in ce)g(ce[xe].object),delete ce[xe];delete ie[C.id]}}function ne(){w(),h=!0,c!==l&&(c=l,p(c.object))}function w(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:ne,resetDefaultState:w,dispose:V,releaseStatesOfGeometry:L,releaseStatesOfProgram:B,initAttributes:T,enableAttribute:y,disableUnusedAttributes:N}}function u3(o,e,i){let s;function l(p){s=p}function c(p,g){o.drawArrays(s,p,g),i.update(g,s,1)}function h(p,g,x){x!==0&&(o.drawArraysInstanced(s,p,g,x),i.update(g,s,x))}function d(p,g,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,x);let M=0;for(let b=0;b<x;b++)M+=g[b];i.update(M,s,1)}function m(p,g,x,_){if(x===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let b=0;b<p.length;b++)h(p[b],g[b],_[b]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,g,0,_,0,x);let b=0;for(let T=0;T<x;T++)b+=g[T]*_[T];i.update(b,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function f3(o,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(B){return!(B!==Ai&&s.convert(B)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(B){const ne=B===zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==Bi&&s.convert(B)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==xa&&!ne)}function m(B){if(B==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(ot("WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const x=i.logarithmicDepthBuffer===!0,_=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),b=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=o.getParameter(o.MAX_TEXTURE_SIZE),y=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),v=o.getParameter(o.MAX_VERTEX_ATTRIBS),N=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),D=o.getParameter(o.MAX_VARYING_VECTORS),P=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),V=b>0,L=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:x,reversedDepthBuffer:_,maxTextures:M,maxVertexTextures:b,maxTextureSize:T,maxCubemapSize:y,maxAttributes:v,maxVertexUniforms:N,maxVaryings:D,maxFragmentUniforms:P,vertexTextures:V,maxSamples:L}}function h3(o){const e=this;let i=null,s=0,l=!1,c=!1;const h=new Ts,d=new dt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,_){const M=x.length!==0||_||s!==0||l;return l=_,s=x.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(x,_){i=g(x,_,0)},this.setState=function(x,_,M){const b=x.clippingPlanes,T=x.clipIntersection,y=x.clipShadows,v=o.get(x);if(!l||b===null||b.length===0||c&&!y)c?g(null):p();else{const N=c?0:s,D=N*4;let P=v.clippingState||null;m.value=P,P=g(b,_,D,M);for(let V=0;V!==D;++V)P[V]=i[V];v.clippingState=P,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=N}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function g(x,_,M,b){const T=x!==null?x.length:0;let y=null;if(T!==0){if(y=m.value,b!==!0||y===null){const v=M+T*4,N=_.matrixWorldInverse;d.getNormalMatrix(N),(y===null||y.length<v)&&(y=new Float32Array(v));for(let D=0,P=M;D!==T;++D,P+=4)h.copy(x[D]).applyMatrix4(N,d),h.normal.toArray(y,P),y[P+3]=h.constant}m.value=y,m.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,y}}function d3(o){let e=new WeakMap;function i(h,d){return d===Wc?h.mapping=Cr:d===id&&(h.mapping=wr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Wc||d===id)if(e.has(h)){const m=e.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new aM(m.height);return p.fromEquirectangularTexture(o,h),e.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function c(){e=new WeakMap}return{get:s,dispose:c}}const Ja=4,Tg=[.125,.215,.35,.446,.526,.582],Rs=20,p3=256,Fo=new N_,Ag=new st;let kh=null,Xh=0,Wh=0,qh=!1;const m3=new K;class Rg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:h=256,position:d=m3}=c;kh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),Wh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(kh,Xh,Wh),this._renderer.xr.enabled=qh,e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Cr||e.mapping===wr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),Wh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:gi,minFilter:gi,generateMipmaps:!1,type:zi,format:Ai,colorSpace:Dr,depthBuffer:!1},l=Cg(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cg(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=x3(c)),this._blurMaterial=_3(c,e,i),this._ggxMaterial=g3(c,e,i)}return l}_compileMaterial(e){const i=new Ii(new qn,e);this._renderer.compile(i,Fo)}_sceneToCubeUV(e,i,s,l,c){const m=new ai(90,1,i,s),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],x=this._renderer,_=x.autoClear,M=x.toneMapping;x.getClearColor(Ag),x.toneMapping=$a,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(l),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ii(new Ds,new Zd({name:"PMREM.Background",side:Xn,depthWrite:!1,depthTest:!1})));const T=this._backgroundBox,y=T.material;let v=!1;const N=e.background;N?N.isColor&&(y.color.copy(N),e.background=null,v=!0):(y.color.copy(Ag),v=!0);for(let D=0;D<6;D++){const P=D%3;P===0?(m.up.set(0,p[D],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+g[D],c.y,c.z)):P===1?(m.up.set(0,0,p[D]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+g[D],c.z)):(m.up.set(0,p[D],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+g[D]));const V=this._cubeSize;br(l,P*V,D>2?V:0,V,V),x.setRenderTarget(l),v&&x.render(T,m),x.render(e,m)}x.toneMapping=M,x.autoClear=_,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Cr||e.mapping===wr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wg());const c=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=c;const d=c.uniforms;d.envMap.value=e;const m=this._cubeSize;br(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Fo)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,h=this._ggxMaterial,d=this._lodMeshes[s];d.material=h;const m=h.uniforms,p=s/(this._lodMeshes.length-1),g=i/(this._lodMeshes.length-1),x=Math.sqrt(p*p-g*g),_=.05+p*.95,M=x*_,{_lodMax:b}=this,T=this._sizeLods[s],y=3*T*(s>b-Ja?s-b+Ja:0),v=4*(this._cubeSize-T);m.envMap.value=e.texture,m.roughness.value=M,m.mipInt.value=b-i,br(c,y,v,3*T,2*T),l.setRenderTarget(c),l.render(d,Fo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=b-s,br(e,y,v,3*T,2*T),l.setRenderTarget(e),l.render(d,Fo)}_blur(e,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,s,l,"latitudinal",c),this._halfBlur(h,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&sn("blur direction must be either latitudinal or longitudinal!");const g=3,x=this._lodMeshes[l];x.material=p;const _=p.uniforms,M=this._sizeLods[s]-1,b=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Rs-1),T=c/b,y=isFinite(c)?1+Math.floor(g*T):Rs;y>Rs&&ot(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Rs}`);const v=[];let N=0;for(let B=0;B<Rs;++B){const ne=B/T,w=Math.exp(-ne*ne/2);v.push(w),B===0?N+=w:B<y&&(N+=2*w)}for(let B=0;B<v.length;B++)v[B]=v[B]/N;_.envMap.value=e.texture,_.samples.value=y,_.weights.value=v,_.latitudinal.value=h==="latitudinal",d&&(_.poleAxis.value=d);const{_lodMax:D}=this;_.dTheta.value=b,_.mipInt.value=D-s;const P=this._sizeLods[l],V=3*P*(l>D-Ja?l-D+Ja:0),L=4*(this._cubeSize-P);br(i,V,L,3*P,2*P),m.setRenderTarget(i),m.render(x,Fo)}}function x3(o){const e=[],i=[],s=[];let l=o;const c=o-Ja+1+Tg.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);e.push(d);let m=1/d;h>o-Ja?m=Tg[h-o+Ja-1]:h===0&&(m=0),i.push(m);const p=1/(d-2),g=-p,x=1+p,_=[g,g,x,g,x,x,g,g,x,x,g,x],M=6,b=6,T=3,y=2,v=1,N=new Float32Array(T*b*M),D=new Float32Array(y*b*M),P=new Float32Array(v*b*M);for(let L=0;L<M;L++){const B=L%3*2/3-1,ne=L>2?0:-1,w=[B,ne,0,B+2/3,ne,0,B+2/3,ne+1,0,B,ne,0,B+2/3,ne+1,0,B,ne+1,0];N.set(w,T*b*L),D.set(_,y*b*L);const C=[L,L,L,L,L,L];P.set(C,v*b*L)}const V=new qn;V.setAttribute("position",new _i(N,T)),V.setAttribute("uv",new _i(D,y)),V.setAttribute("faceIndex",new _i(P,v)),s.push(new Ii(V,null)),l>Ja&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function Cg(o,e,i){const s=new Ri(o,e,i);return s.texture.mapping=Jc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function br(o,e,i,s,l){o.viewport.set(e,i,s,l),o.scissor.set(e,i,s,l)}function g3(o,e,i){return new Nn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:p3,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:eu(),fragmentShader:`

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

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function _3(o,e,i){const s=new Float32Array(Rs),l=new K(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:eu(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function wg(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eu(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Dg(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function eu(){return`

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
	`}function v3(o){let e=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===Wc||m===id,g=m===Cr||m===wr;if(p||g){let x=e.get(d);const _=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==_)return i===null&&(i=new Rg(o)),x=p?i.fromEquirectangular(d,x):i.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,e.set(d,x),x.texture;if(x!==void 0)return x.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new Rg(o)),x=p?i.fromEquirectangular(d):i.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,e.set(d,x),d.addEventListener("dispose",c),x.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function S3(o){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=o.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&qo("WebGLRenderer: "+s+" extension not supported."),l}}}function y3(o,e,i,s){const l={},c=new WeakMap;function h(x){const _=x.target;_.index!==null&&e.remove(_.index);for(const b in _.attributes)e.remove(_.attributes[b]);_.removeEventListener("dispose",h),delete l[_.id];const M=c.get(_);M&&(e.remove(M),c.delete(_)),s.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,i.memory.geometries--}function d(x,_){return l[_.id]===!0||(_.addEventListener("dispose",h),l[_.id]=!0,i.memory.geometries++),_}function m(x){const _=x.attributes;for(const M in _)e.update(_[M],o.ARRAY_BUFFER)}function p(x){const _=[],M=x.index,b=x.attributes.position;let T=0;if(M!==null){const N=M.array;T=M.version;for(let D=0,P=N.length;D<P;D+=3){const V=N[D+0],L=N[D+1],B=N[D+2];_.push(V,L,L,B,B,V)}}else if(b!==void 0){const N=b.array;T=b.version;for(let D=0,P=N.length/3-1;D<P;D+=3){const V=D+0,L=D+1,B=D+2;_.push(V,L,L,B,B,V)}}else return;const y=new(__(_)?b_:M_)(_,1);y.version=T;const v=c.get(x);v&&e.remove(v),c.set(x,y)}function g(x){const _=c.get(x);if(_){const M=x.index;M!==null&&_.version<M.version&&p(x)}else p(x);return c.get(x)}return{get:d,update:m,getWireframeAttribute:g}}function M3(o,e,i){let s;function l(_){s=_}let c,h;function d(_){c=_.type,h=_.bytesPerElement}function m(_,M){o.drawElements(s,M,c,_*h),i.update(M,s,1)}function p(_,M,b){b!==0&&(o.drawElementsInstanced(s,M,c,_*h,b),i.update(M,s,b))}function g(_,M,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,_,0,b);let y=0;for(let v=0;v<b;v++)y+=M[v];i.update(y,s,1)}function x(_,M,b,T){if(b===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let v=0;v<_.length;v++)p(_[v]/h,M[v],T[v]);else{y.multiDrawElementsInstancedWEBGL(s,M,0,c,_,0,T,0,b);let v=0;for(let N=0;N<b;N++)v+=M[N]*T[N];i.update(v,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=x}function b3(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(c/3);break;case o.LINES:i.lines+=d*(c/2);break;case o.LINE_STRIP:i.lines+=d*(c-1);break;case o.LINE_LOOP:i.lines+=d*c;break;case o.POINTS:i.points+=d*c;break;default:sn("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function E3(o,e,i){const s=new WeakMap,l=new kt;function c(h,d,m){const p=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,x=g!==void 0?g.length:0;let _=s.get(d);if(_===void 0||_.count!==x){let C=function(){ne.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var M=C;_!==void 0&&_.texture.dispose();const b=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],N=d.morphAttributes.normal||[],D=d.morphAttributes.color||[];let P=0;b===!0&&(P=1),T===!0&&(P=2),y===!0&&(P=3);let V=d.attributes.position.count*P,L=1;V>e.maxTextureSize&&(L=Math.ceil(V/e.maxTextureSize),V=e.maxTextureSize);const B=new Float32Array(V*L*4*x),ne=new v_(B,V,L,x);ne.type=xa,ne.needsUpdate=!0;const w=P*4;for(let k=0;k<x;k++){const ie=v[k],ce=N[k],xe=D[k],he=V*L*4*k;for(let F=0;F<ie.count;F++){const j=F*w;b===!0&&(l.fromBufferAttribute(ie,F),B[he+j+0]=l.x,B[he+j+1]=l.y,B[he+j+2]=l.z,B[he+j+3]=0),T===!0&&(l.fromBufferAttribute(ce,F),B[he+j+4]=l.x,B[he+j+5]=l.y,B[he+j+6]=l.z,B[he+j+7]=0),y===!0&&(l.fromBufferAttribute(xe,F),B[he+j+8]=l.x,B[he+j+9]=l.y,B[he+j+10]=l.z,B[he+j+11]=xe.itemSize===4?l.w:1)}}_={count:x,texture:ne,size:new lt(V,L)},s.set(d,_),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let b=0;for(let y=0;y<p.length;y++)b+=p[y];const T=d.morphTargetsRelative?1:1-b;m.getUniforms().setValue(o,"morphTargetBaseInfluence",T),m.getUniforms().setValue(o,"morphTargetInfluences",p)}m.getUniforms().setValue(o,"morphTargetsTexture",_.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",_.size)}return{update:c}}function T3(o,e,i,s){let l=new WeakMap;function c(m){const p=s.render.frame,g=m.geometry,x=e.get(m,g);if(l.get(x)!==p&&(e.update(x),l.set(x,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const _=m.skeleton;l.get(_)!==p&&(_.update(),l.set(_,p))}return x}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const O_=new Ln,Ug=new w_(1,1),P_=new v_,z_=new Vy,B_=new A_,Ng=[],Lg=[],Og=new Float32Array(16),Pg=new Float32Array(9),zg=new Float32Array(4);function Or(o,e,i){const s=o[0];if(s<=0||s>0)return o;const l=e*i;let c=Ng[l];if(c===void 0&&(c=new Float32Array(l),Ng[l]=c),e!==0){s.toArray(c,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(c,d)}return c}function xn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function gn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function tu(o,e){let i=Lg[e];i===void 0&&(i=new Int32Array(e),Lg[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function A3(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function R3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(xn(i,e))return;o.uniform2fv(this.addr,e),gn(i,e)}}function C3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(xn(i,e))return;o.uniform3fv(this.addr,e),gn(i,e)}}function w3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(xn(i,e))return;o.uniform4fv(this.addr,e),gn(i,e)}}function D3(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(xn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),gn(i,e)}else{if(xn(i,s))return;zg.set(s),o.uniformMatrix2fv(this.addr,!1,zg),gn(i,s)}}function U3(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(xn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),gn(i,e)}else{if(xn(i,s))return;Pg.set(s),o.uniformMatrix3fv(this.addr,!1,Pg),gn(i,s)}}function N3(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(xn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),gn(i,e)}else{if(xn(i,s))return;Og.set(s),o.uniformMatrix4fv(this.addr,!1,Og),gn(i,s)}}function L3(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function O3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(xn(i,e))return;o.uniform2iv(this.addr,e),gn(i,e)}}function P3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(xn(i,e))return;o.uniform3iv(this.addr,e),gn(i,e)}}function z3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(xn(i,e))return;o.uniform4iv(this.addr,e),gn(i,e)}}function B3(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function F3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(xn(i,e))return;o.uniform2uiv(this.addr,e),gn(i,e)}}function I3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(xn(i,e))return;o.uniform3uiv(this.addr,e),gn(i,e)}}function H3(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(xn(i,e))return;o.uniform4uiv(this.addr,e),gn(i,e)}}function G3(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let c;this.type===o.SAMPLER_2D_SHADOW?(Ug.compareFunction=g_,c=Ug):c=O_,i.setTexture2D(e||c,l)}function V3(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||z_,l)}function k3(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||B_,l)}function X3(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||P_,l)}function W3(o){switch(o){case 5126:return A3;case 35664:return R3;case 35665:return C3;case 35666:return w3;case 35674:return D3;case 35675:return U3;case 35676:return N3;case 5124:case 35670:return L3;case 35667:case 35671:return O3;case 35668:case 35672:return P3;case 35669:case 35673:return z3;case 5125:return B3;case 36294:return F3;case 36295:return I3;case 36296:return H3;case 35678:case 36198:case 36298:case 36306:case 35682:return G3;case 35679:case 36299:case 36307:return V3;case 35680:case 36300:case 36308:case 36293:return k3;case 36289:case 36303:case 36311:case 36292:return X3}}function q3(o,e){o.uniform1fv(this.addr,e)}function Y3(o,e){const i=Or(e,this.size,2);o.uniform2fv(this.addr,i)}function j3(o,e){const i=Or(e,this.size,3);o.uniform3fv(this.addr,i)}function Z3(o,e){const i=Or(e,this.size,4);o.uniform4fv(this.addr,i)}function K3(o,e){const i=Or(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function Q3(o,e){const i=Or(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function J3(o,e){const i=Or(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function $3(o,e){o.uniform1iv(this.addr,e)}function eE(o,e){o.uniform2iv(this.addr,e)}function tE(o,e){o.uniform3iv(this.addr,e)}function nE(o,e){o.uniform4iv(this.addr,e)}function iE(o,e){o.uniform1uiv(this.addr,e)}function aE(o,e){o.uniform2uiv(this.addr,e)}function sE(o,e){o.uniform3uiv(this.addr,e)}function rE(o,e){o.uniform4uiv(this.addr,e)}function oE(o,e,i){const s=this.cache,l=e.length,c=tu(i,l);xn(s,c)||(o.uniform1iv(this.addr,c),gn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||O_,c[h])}function lE(o,e,i){const s=this.cache,l=e.length,c=tu(i,l);xn(s,c)||(o.uniform1iv(this.addr,c),gn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||z_,c[h])}function cE(o,e,i){const s=this.cache,l=e.length,c=tu(i,l);xn(s,c)||(o.uniform1iv(this.addr,c),gn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||B_,c[h])}function uE(o,e,i){const s=this.cache,l=e.length,c=tu(i,l);xn(s,c)||(o.uniform1iv(this.addr,c),gn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||P_,c[h])}function fE(o){switch(o){case 5126:return q3;case 35664:return Y3;case 35665:return j3;case 35666:return Z3;case 35674:return K3;case 35675:return Q3;case 35676:return J3;case 5124:case 35670:return $3;case 35667:case 35671:return eE;case 35668:case 35672:return tE;case 35669:case 35673:return nE;case 5125:return iE;case 36294:return aE;case 36295:return sE;case 36296:return rE;case 35678:case 36198:case 36298:case 36306:case 35682:return oE;case 35679:case 36299:case 36307:return lE;case 35680:case 36300:case 36308:case 36293:return cE;case 36289:case 36303:case 36311:case 36292:return uE}}class hE{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=W3(i.type)}}class dE{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=fE(i.type)}}class pE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(e,i[d.id],s)}}}const Yh=/(\w+)(\])?(\[|\.)?/g;function Bg(o,e){o.seq.push(e),o.map[e.id]=e}function mE(o,e,i){const s=o.name,l=s.length;for(Yh.lastIndex=0;;){const c=Yh.exec(s),h=Yh.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){Bg(i,p===void 0?new hE(d,o,e):new dE(d,o,e));break}else{let x=i.map[d];x===void 0&&(x=new pE(d),Bg(i,x)),i=x}}}class Vc{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=e.getActiveUniform(i,l),h=e.getUniformLocation(i,c.name);mE(c,h,this)}}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const h=e[l];h.id in i&&s.push(h)}return s}}function Fg(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const xE=37297;let gE=0;function _E(o,e){const i=o.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const Ig=new dt;function vE(o){Rt._getMatrix(Ig,Rt.workingColorSpace,o);const e=`mat3( ${Ig.elements.map(i=>i.toFixed(4))} )`;switch(Rt.getTransfer(o)){case qc:return[e,"LinearTransferOETF"];case Ft:return[e,"sRGBTransferOETF"];default:return ot("WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function Hg(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),c=(o.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+_E(o.getShaderSource(e),d)}else return c}function SE(o,e){const i=vE(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function yE(o,e){let i;switch(e){case n_:i="Linear";break;case i_:i="Reinhard";break;case a_:i="Cineon";break;case Id:i="ACESFilmic";break;case r_:i="AgX";break;case o_:i="Neutral";break;case s_:i="Custom";break;default:ot("WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Pc=new K;function ME(){Rt.getLuminanceCoefficients(Pc);const o=Pc.x.toFixed(4),e=Pc.y.toFixed(4),i=Pc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bE(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Go).join(`
`)}function EE(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function TE(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=o.getActiveAttrib(e,l),h=c.name;let d=1;c.type===o.FLOAT_MAT2&&(d=2),c.type===o.FLOAT_MAT3&&(d=3),c.type===o.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function Go(o){return o!==""}function Gg(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vg(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const AE=/^[ \t]*#include +<([\w\d./]+)>/gm;function zd(o){return o.replace(AE,CE)}const RE=new Map;function CE(o,e){let i=xt[e];if(i===void 0){const s=RE.get(e);if(s!==void 0)i=xt[s],ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return zd(i)}const wE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kg(o){return o.replace(wE,DE)}function DE(o,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Xg(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function UE(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===e_?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===ny?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===ha&&(e="SHADOWMAP_TYPE_VSM"),e}function NE(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Cr:case wr:e="ENVMAP_TYPE_CUBE";break;case Jc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function LE(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case wr:e="ENVMAP_MODE_REFRACTION";break}return e}function OE(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case t_:e="ENVMAP_BLENDING_MULTIPLY";break;case yy:e="ENVMAP_BLENDING_MIX";break;case My:e="ENVMAP_BLENDING_ADD";break}return e}function PE(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function zE(o,e,i,s){const l=o.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=UE(i),p=NE(i),g=LE(i),x=OE(i),_=PE(i),M=bE(i),b=EE(c),T=l.createProgram();let y,v,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Go).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Go).join(`
`),v.length>0&&(v+=`
`)):(y=[Xg(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Go).join(`
`),v=[Xg(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+x:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==$a?"#define TONE_MAPPING":"",i.toneMapping!==$a?xt.tonemapping_pars_fragment:"",i.toneMapping!==$a?yE("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",xt.colorspace_pars_fragment,SE("linearToOutputTexel",i.outputColorSpace),ME(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Go).join(`
`)),h=zd(h),h=Gg(h,i),h=Vg(h,i),d=zd(d),d=Gg(d,i),d=Vg(d,i),h=kg(h),d=kg(d),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",i.glslVersion===Zx?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Zx?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const D=N+y+h,P=N+v+d,V=Fg(l,l.VERTEX_SHADER,D),L=Fg(l,l.FRAGMENT_SHADER,P);l.attachShader(T,V),l.attachShader(T,L),i.index0AttributeName!==void 0?l.bindAttribLocation(T,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function B(k){if(o.debug.checkShaderErrors){const ie=l.getProgramInfoLog(T)||"",ce=l.getShaderInfoLog(V)||"",xe=l.getShaderInfoLog(L)||"",he=ie.trim(),F=ce.trim(),j=xe.trim();let Y=!0,_e=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(Y=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,T,V,L);else{const ve=Hg(l,V,"vertex"),O=Hg(l,L,"fragment");sn("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+he+`
`+ve+`
`+O)}else he!==""?ot("WebGLProgram: Program Info Log:",he):(F===""||j==="")&&(_e=!1);_e&&(k.diagnostics={runnable:Y,programLog:he,vertexShader:{log:F,prefix:y},fragmentShader:{log:j,prefix:v}})}l.deleteShader(V),l.deleteShader(L),ne=new Vc(l,T),w=TE(l,T)}let ne;this.getUniforms=function(){return ne===void 0&&B(this),ne};let w;this.getAttributes=function(){return w===void 0&&B(this),w};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(T,xE)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=gE++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=V,this.fragmentShader=L,this}let BE=0;class FE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new IE(e),i.set(e,s)),s}}class IE{constructor(e){this.id=BE++,this.code=e,this.usedTimes=0}}function HE(o,e,i,s,l,c,h){const d=new S_,m=new FE,p=new Set,g=[],x=l.logarithmicDepthBuffer,_=l.vertexTextures;let M=l.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(w){return p.add(w),w===0?"uv":`uv${w}`}function y(w,C,k,ie,ce){const xe=ie.fog,he=ce.geometry,F=w.isMeshStandardMaterial?ie.environment:null,j=(w.isMeshStandardMaterial?i:e).get(w.envMap||F),Y=j&&j.mapping===Jc?j.image.height:null,_e=b[w.type];w.precision!==null&&(M=l.getMaxPrecision(w.precision),M!==w.precision&&ot("WebGLProgram.getParameters:",w.precision,"not supported, using",M,"instead."));const ve=he.morphAttributes.position||he.morphAttributes.normal||he.morphAttributes.color,O=ve!==void 0?ve.length:0;let re=0;he.morphAttributes.position!==void 0&&(re=1),he.morphAttributes.normal!==void 0&&(re=2),he.morphAttributes.color!==void 0&&(re=3);let Me,Te,Pe,ae;if(_e){const wt=Li[_e];Me=wt.vertexShader,Te=wt.fragmentShader}else Me=w.vertexShader,Te=w.fragmentShader,m.update(w),Pe=m.getVertexShaderID(w),ae=m.getFragmentShaderID(w);const ue=o.getRenderTarget(),we=o.state.buffers.depth.getReversed(),He=ce.isInstancedMesh===!0,Xe=ce.isBatchedMesh===!0,ut=!!w.map,tn=!!w.matcap,pt=!!j,Ct=!!w.aoMap,I=!!w.lightMap,mt=!!w.bumpMap,gt=!!w.normalMap,Pt=!!w.displacementMap,Ge=!!w.emissiveMap,Xt=!!w.metalnessMap,je=!!w.roughnessMap,at=w.anisotropy>0,U=w.clearcoat>0,E=w.dispersion>0,J=w.iridescence>0,pe=w.sheen>0,Se=w.transmission>0,le=at&&!!w.anisotropyMap,qe=U&&!!w.clearcoatMap,Ne=U&&!!w.clearcoatNormalMap,Qe=U&&!!w.clearcoatRoughnessMap,We=J&&!!w.iridescenceMap,ye=J&&!!w.iridescenceThicknessMap,Ee=pe&&!!w.sheenColorMap,Ye=pe&&!!w.sheenRoughnessMap,Ve=!!w.specularMap,Oe=!!w.specularColorMap,nt=!!w.specularIntensityMap,H=Se&&!!w.transmissionMap,De=Se&&!!w.thicknessMap,Re=!!w.gradientMap,Ce=!!w.alphaMap,be=w.alphaTest>0,ge=!!w.alphaHash,Be=!!w.extensions;let it=$a;w.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(it=o.toneMapping);const It={shaderID:_e,shaderType:w.type,shaderName:w.name,vertexShader:Me,fragmentShader:Te,defines:w.defines,customVertexShaderID:Pe,customFragmentShaderID:ae,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:M,batching:Xe,batchingColor:Xe&&ce._colorsTexture!==null,instancing:He,instancingColor:He&&ce.instanceColor!==null,instancingMorph:He&&ce.morphTexture!==null,supportsVertexTextures:_,outputColorSpace:ue===null?o.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Dr,alphaToCoverage:!!w.alphaToCoverage,map:ut,matcap:tn,envMap:pt,envMapMode:pt&&j.mapping,envMapCubeUVHeight:Y,aoMap:Ct,lightMap:I,bumpMap:mt,normalMap:gt,displacementMap:_&&Pt,emissiveMap:Ge,normalMapObjectSpace:gt&&w.normalMapType===Ay,normalMapTangentSpace:gt&&w.normalMapType===x_,metalnessMap:Xt,roughnessMap:je,anisotropy:at,anisotropyMap:le,clearcoat:U,clearcoatMap:qe,clearcoatNormalMap:Ne,clearcoatRoughnessMap:Qe,dispersion:E,iridescence:J,iridescenceMap:We,iridescenceThicknessMap:ye,sheen:pe,sheenColorMap:Ee,sheenRoughnessMap:Ye,specularMap:Ve,specularColorMap:Oe,specularIntensityMap:nt,transmission:Se,transmissionMap:H,thicknessMap:De,gradientMap:Re,opaque:w.transparent===!1&&w.blending===Tr&&w.alphaToCoverage===!1,alphaMap:Ce,alphaTest:be,alphaHash:ge,combine:w.combine,mapUv:ut&&T(w.map.channel),aoMapUv:Ct&&T(w.aoMap.channel),lightMapUv:I&&T(w.lightMap.channel),bumpMapUv:mt&&T(w.bumpMap.channel),normalMapUv:gt&&T(w.normalMap.channel),displacementMapUv:Pt&&T(w.displacementMap.channel),emissiveMapUv:Ge&&T(w.emissiveMap.channel),metalnessMapUv:Xt&&T(w.metalnessMap.channel),roughnessMapUv:je&&T(w.roughnessMap.channel),anisotropyMapUv:le&&T(w.anisotropyMap.channel),clearcoatMapUv:qe&&T(w.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&T(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Qe&&T(w.clearcoatRoughnessMap.channel),iridescenceMapUv:We&&T(w.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&T(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&T(w.sheenColorMap.channel),sheenRoughnessMapUv:Ye&&T(w.sheenRoughnessMap.channel),specularMapUv:Ve&&T(w.specularMap.channel),specularColorMapUv:Oe&&T(w.specularColorMap.channel),specularIntensityMapUv:nt&&T(w.specularIntensityMap.channel),transmissionMapUv:H&&T(w.transmissionMap.channel),thicknessMapUv:De&&T(w.thicknessMap.channel),alphaMapUv:Ce&&T(w.alphaMap.channel),vertexTangents:!!he.attributes.tangent&&(gt||at),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!he.attributes.color&&he.attributes.color.itemSize===4,pointsUvs:ce.isPoints===!0&&!!he.attributes.uv&&(ut||Ce),fog:!!xe,useFog:w.fog===!0,fogExp2:!!xe&&xe.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:we,skinning:ce.isSkinnedMesh===!0,morphTargets:he.morphAttributes.position!==void 0,morphNormals:he.morphAttributes.normal!==void 0,morphColors:he.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:re,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:w.dithering,shadowMapEnabled:o.shadowMap.enabled&&k.length>0,shadowMapType:o.shadowMap.type,toneMapping:it,decodeVideoTexture:ut&&w.map.isVideoTexture===!0&&Rt.getTransfer(w.map.colorSpace)===Ft,decodeVideoTextureEmissive:Ge&&w.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(w.emissiveMap.colorSpace)===Ft,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===da,flipSided:w.side===Xn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Be&&w.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&w.extensions.multiDraw===!0||Xe)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return It.vertexUv1s=p.has(1),It.vertexUv2s=p.has(2),It.vertexUv3s=p.has(3),p.clear(),It}function v(w){const C=[];if(w.shaderID?C.push(w.shaderID):(C.push(w.customVertexShaderID),C.push(w.customFragmentShaderID)),w.defines!==void 0)for(const k in w.defines)C.push(k),C.push(w.defines[k]);return w.isRawShaderMaterial===!1&&(N(C,w),D(C,w),C.push(o.outputColorSpace)),C.push(w.customProgramCacheKey),C.join()}function N(w,C){w.push(C.precision),w.push(C.outputColorSpace),w.push(C.envMapMode),w.push(C.envMapCubeUVHeight),w.push(C.mapUv),w.push(C.alphaMapUv),w.push(C.lightMapUv),w.push(C.aoMapUv),w.push(C.bumpMapUv),w.push(C.normalMapUv),w.push(C.displacementMapUv),w.push(C.emissiveMapUv),w.push(C.metalnessMapUv),w.push(C.roughnessMapUv),w.push(C.anisotropyMapUv),w.push(C.clearcoatMapUv),w.push(C.clearcoatNormalMapUv),w.push(C.clearcoatRoughnessMapUv),w.push(C.iridescenceMapUv),w.push(C.iridescenceThicknessMapUv),w.push(C.sheenColorMapUv),w.push(C.sheenRoughnessMapUv),w.push(C.specularMapUv),w.push(C.specularColorMapUv),w.push(C.specularIntensityMapUv),w.push(C.transmissionMapUv),w.push(C.thicknessMapUv),w.push(C.combine),w.push(C.fogExp2),w.push(C.sizeAttenuation),w.push(C.morphTargetsCount),w.push(C.morphAttributeCount),w.push(C.numDirLights),w.push(C.numPointLights),w.push(C.numSpotLights),w.push(C.numSpotLightMaps),w.push(C.numHemiLights),w.push(C.numRectAreaLights),w.push(C.numDirLightShadows),w.push(C.numPointLightShadows),w.push(C.numSpotLightShadows),w.push(C.numSpotLightShadowsWithMaps),w.push(C.numLightProbes),w.push(C.shadowMapType),w.push(C.toneMapping),w.push(C.numClippingPlanes),w.push(C.numClipIntersection),w.push(C.depthPacking)}function D(w,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),C.gradientMap&&d.enable(22),w.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reversedDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),w.push(d.mask)}function P(w){const C=b[w.type];let k;if(C){const ie=Li[C];k=Yo.clone(ie.uniforms)}else k=w.uniforms;return k}function V(w,C){let k;for(let ie=0,ce=g.length;ie<ce;ie++){const xe=g[ie];if(xe.cacheKey===C){k=xe,++k.usedTimes;break}}return k===void 0&&(k=new zE(o,C,w,c),g.push(k)),k}function L(w){if(--w.usedTimes===0){const C=g.indexOf(w);g[C]=g[g.length-1],g.pop(),w.destroy()}}function B(w){m.remove(w)}function ne(){m.dispose()}return{getParameters:y,getProgramCacheKey:v,getUniforms:P,acquireProgram:V,releaseProgram:L,releaseShaderCache:B,programs:g,dispose:ne}}function GE(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function l(h,d,m){o.get(h)[d]=m}function c(){o=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function VE(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Wg(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function qg(){const o=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function h(x,_,M,b,T,y){let v=o[e];return v===void 0?(v={id:x.id,object:x,geometry:_,material:M,groupOrder:b,renderOrder:x.renderOrder,z:T,group:y},o[e]=v):(v.id=x.id,v.object=x,v.geometry=_,v.material=M,v.groupOrder=b,v.renderOrder=x.renderOrder,v.z=T,v.group=y),e++,v}function d(x,_,M,b,T,y){const v=h(x,_,M,b,T,y);M.transmission>0?s.push(v):M.transparent===!0?l.push(v):i.push(v)}function m(x,_,M,b,T,y){const v=h(x,_,M,b,T,y);M.transmission>0?s.unshift(v):M.transparent===!0?l.unshift(v):i.unshift(v)}function p(x,_){i.length>1&&i.sort(x||VE),s.length>1&&s.sort(_||Wg),l.length>1&&l.sort(_||Wg)}function g(){for(let x=e,_=o.length;x<_;x++){const M=o[x];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function kE(){let o=new WeakMap;function e(s,l){const c=o.get(s);let h;return c===void 0?(h=new qg,o.set(s,[h])):l>=c.length?(h=new qg,c.push(h)):h=c[l],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function XE(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new K,color:new st};break;case"SpotLight":i={position:new K,direction:new K,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new K,color:new st,distance:0,decay:0};break;case"HemisphereLight":i={direction:new K,skyColor:new st,groundColor:new st};break;case"RectAreaLight":i={color:new st,position:new K,halfWidth:new K,halfHeight:new K};break}return o[e.id]=i,i}}}function WE(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let qE=0;function YE(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function jE(o){const e=new XE,i=WE(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new K);const l=new K,c=new Jt,h=new Jt;function d(p){let g=0,x=0,_=0;for(let w=0;w<9;w++)s.probe[w].set(0,0,0);let M=0,b=0,T=0,y=0,v=0,N=0,D=0,P=0,V=0,L=0,B=0;p.sort(YE);for(let w=0,C=p.length;w<C;w++){const k=p[w],ie=k.color,ce=k.intensity,xe=k.distance,he=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)g+=ie.r*ce,x+=ie.g*ce,_+=ie.b*ce;else if(k.isLightProbe){for(let F=0;F<9;F++)s.probe[F].addScaledVector(k.sh.coefficients[F],ce);B++}else if(k.isDirectionalLight){const F=e.get(k);if(F.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const j=k.shadow,Y=i.get(k);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,s.directionalShadow[M]=Y,s.directionalShadowMap[M]=he,s.directionalShadowMatrix[M]=k.shadow.matrix,N++}s.directional[M]=F,M++}else if(k.isSpotLight){const F=e.get(k);F.position.setFromMatrixPosition(k.matrixWorld),F.color.copy(ie).multiplyScalar(ce),F.distance=xe,F.coneCos=Math.cos(k.angle),F.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),F.decay=k.decay,s.spot[T]=F;const j=k.shadow;if(k.map&&(s.spotLightMap[V]=k.map,V++,j.updateMatrices(k),k.castShadow&&L++),s.spotLightMatrix[T]=j.matrix,k.castShadow){const Y=i.get(k);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,s.spotShadow[T]=Y,s.spotShadowMap[T]=he,P++}T++}else if(k.isRectAreaLight){const F=e.get(k);F.color.copy(ie).multiplyScalar(ce),F.halfWidth.set(k.width*.5,0,0),F.halfHeight.set(0,k.height*.5,0),s.rectArea[y]=F,y++}else if(k.isPointLight){const F=e.get(k);if(F.color.copy(k.color).multiplyScalar(k.intensity),F.distance=k.distance,F.decay=k.decay,k.castShadow){const j=k.shadow,Y=i.get(k);Y.shadowIntensity=j.intensity,Y.shadowBias=j.bias,Y.shadowNormalBias=j.normalBias,Y.shadowRadius=j.radius,Y.shadowMapSize=j.mapSize,Y.shadowCameraNear=j.camera.near,Y.shadowCameraFar=j.camera.far,s.pointShadow[b]=Y,s.pointShadowMap[b]=he,s.pointShadowMatrix[b]=k.shadow.matrix,D++}s.point[b]=F,b++}else if(k.isHemisphereLight){const F=e.get(k);F.skyColor.copy(k.color).multiplyScalar(ce),F.groundColor.copy(k.groundColor).multiplyScalar(ce),s.hemi[v]=F,v++}}y>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Le.LTC_FLOAT_1,s.rectAreaLTC2=Le.LTC_FLOAT_2):(s.rectAreaLTC1=Le.LTC_HALF_1,s.rectAreaLTC2=Le.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=x,s.ambient[2]=_;const ne=s.hash;(ne.directionalLength!==M||ne.pointLength!==b||ne.spotLength!==T||ne.rectAreaLength!==y||ne.hemiLength!==v||ne.numDirectionalShadows!==N||ne.numPointShadows!==D||ne.numSpotShadows!==P||ne.numSpotMaps!==V||ne.numLightProbes!==B)&&(s.directional.length=M,s.spot.length=T,s.rectArea.length=y,s.point.length=b,s.hemi.length=v,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=D,s.pointShadowMap.length=D,s.spotShadow.length=P,s.spotShadowMap.length=P,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=D,s.spotLightMatrix.length=P+V-L,s.spotLightMap.length=V,s.numSpotLightShadowsWithMaps=L,s.numLightProbes=B,ne.directionalLength=M,ne.pointLength=b,ne.spotLength=T,ne.rectAreaLength=y,ne.hemiLength=v,ne.numDirectionalShadows=N,ne.numPointShadows=D,ne.numSpotShadows=P,ne.numSpotMaps=V,ne.numLightProbes=B,s.version=qE++)}function m(p,g){let x=0,_=0,M=0,b=0,T=0;const y=g.matrixWorldInverse;for(let v=0,N=p.length;v<N;v++){const D=p[v];if(D.isDirectionalLight){const P=s.directional[x];P.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),P.direction.sub(l),P.direction.transformDirection(y),x++}else if(D.isSpotLight){const P=s.spot[M];P.position.setFromMatrixPosition(D.matrixWorld),P.position.applyMatrix4(y),P.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),P.direction.sub(l),P.direction.transformDirection(y),M++}else if(D.isRectAreaLight){const P=s.rectArea[b];P.position.setFromMatrixPosition(D.matrixWorld),P.position.applyMatrix4(y),h.identity(),c.copy(D.matrixWorld),c.premultiply(y),h.extractRotation(c),P.halfWidth.set(D.width*.5,0,0),P.halfHeight.set(0,D.height*.5,0),P.halfWidth.applyMatrix4(h),P.halfHeight.applyMatrix4(h),b++}else if(D.isPointLight){const P=s.point[_];P.position.setFromMatrixPosition(D.matrixWorld),P.position.applyMatrix4(y),_++}else if(D.isHemisphereLight){const P=s.hemi[T];P.direction.setFromMatrixPosition(D.matrixWorld),P.direction.transformDirection(y),T++}}}return{setup:d,setupView:m,state:s}}function Yg(o){const e=new jE(o),i=[],s=[];function l(g){p.camera=g,i.length=0,s.length=0}function c(g){i.push(g)}function h(g){s.push(g)}function d(){e.setup(i)}function m(g){e.setupView(i,g)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function ZE(o){let e=new WeakMap;function i(l,c=0){const h=e.get(l);let d;return h===void 0?(d=new Yg(o),e.set(l,[d])):c>=h.length?(d=new Yg(o),h.push(d)):d=h[c],d}function s(){e=new WeakMap}return{get:i,dispose:s}}const KE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function JE(o,e,i){let s=new Qd;const l=new lt,c=new lt,h=new kt,d=new _M({depthPacking:Ty}),m=new vM,p={},g=i.maxTextureSize,x={[es]:Xn,[Xn]:es,[da]:da},_=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:KE,fragmentShader:QE}),M=_.clone();M.defines.HORIZONTAL_PASS=1;const b=new qn;b.setAttribute("position",new _i(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new Ii(b,_),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=e_;let v=this.type;this.render=function(L,B,ne){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||L.length===0)return;const w=o.getRenderTarget(),C=o.getActiveCubeFace(),k=o.getActiveMipmapLevel(),ie=o.state;ie.setBlending(Pi),ie.buffers.depth.getReversed()===!0?ie.buffers.color.setClear(0,0,0,0):ie.buffers.color.setClear(1,1,1,1),ie.buffers.depth.setTest(!0),ie.setScissorTest(!1);const ce=v!==ha&&this.type===ha,xe=v===ha&&this.type!==ha;for(let he=0,F=L.length;he<F;he++){const j=L[he],Y=j.shadow;if(Y===void 0){ot("WebGLShadowMap:",j,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;l.copy(Y.mapSize);const _e=Y.getFrameExtents();if(l.multiply(_e),c.copy(Y.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/_e.x),l.x=c.x*_e.x,Y.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/_e.y),l.y=c.y*_e.y,Y.mapSize.y=c.y)),Y.map===null||ce===!0||xe===!0){const O=this.type!==ha?{minFilter:si,magFilter:si}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Ri(l.x,l.y,O),Y.map.texture.name=j.name+".shadowMap",Y.camera.updateProjectionMatrix()}o.setRenderTarget(Y.map),o.clear();const ve=Y.getViewportCount();for(let O=0;O<ve;O++){const re=Y.getViewport(O);h.set(c.x*re.x,c.y*re.y,c.x*re.z,c.y*re.w),ie.viewport(h),Y.updateMatrices(j,O),s=Y.getFrustum(),P(B,ne,Y.camera,j,this.type)}Y.isPointLightShadow!==!0&&this.type===ha&&N(Y,ne),Y.needsUpdate=!1}v=this.type,y.needsUpdate=!1,o.setRenderTarget(w,C,k)};function N(L,B){const ne=e.update(T);_.defines.VSM_SAMPLES!==L.blurSamples&&(_.defines.VSM_SAMPLES=L.blurSamples,M.defines.VSM_SAMPLES=L.blurSamples,_.needsUpdate=!0,M.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Ri(l.x,l.y)),_.uniforms.shadow_pass.value=L.map.texture,_.uniforms.resolution.value=L.mapSize,_.uniforms.radius.value=L.radius,o.setRenderTarget(L.mapPass),o.clear(),o.renderBufferDirect(B,null,ne,_,T,null),M.uniforms.shadow_pass.value=L.mapPass.texture,M.uniforms.resolution.value=L.mapSize,M.uniforms.radius.value=L.radius,o.setRenderTarget(L.map),o.clear(),o.renderBufferDirect(B,null,ne,M,T,null)}function D(L,B,ne,w){let C=null;const k=ne.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(k!==void 0)C=k;else if(C=ne.isPointLight===!0?m:d,o.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const ie=C.uuid,ce=B.uuid;let xe=p[ie];xe===void 0&&(xe={},p[ie]=xe);let he=xe[ce];he===void 0&&(he=C.clone(),xe[ce]=he,B.addEventListener("dispose",V)),C=he}if(C.visible=B.visible,C.wireframe=B.wireframe,w===ha?C.side=B.shadowSide!==null?B.shadowSide:B.side:C.side=B.shadowSide!==null?B.shadowSide:x[B.side],C.alphaMap=B.alphaMap,C.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,C.map=B.map,C.clipShadows=B.clipShadows,C.clippingPlanes=B.clippingPlanes,C.clipIntersection=B.clipIntersection,C.displacementMap=B.displacementMap,C.displacementScale=B.displacementScale,C.displacementBias=B.displacementBias,C.wireframeLinewidth=B.wireframeLinewidth,C.linewidth=B.linewidth,ne.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const ie=o.properties.get(C);ie.light=ne}return C}function P(L,B,ne,w,C){if(L.visible===!1)return;if(L.layers.test(B.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&C===ha)&&(!L.frustumCulled||s.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,L.matrixWorld);const ce=e.update(L),xe=L.material;if(Array.isArray(xe)){const he=ce.groups;for(let F=0,j=he.length;F<j;F++){const Y=he[F],_e=xe[Y.materialIndex];if(_e&&_e.visible){const ve=D(L,_e,w,C);L.onBeforeShadow(o,L,B,ne,ce,ve,Y),o.renderBufferDirect(ne,null,ce,ve,L,Y),L.onAfterShadow(o,L,B,ne,ce,ve,Y)}}}else if(xe.visible){const he=D(L,xe,w,C);L.onBeforeShadow(o,L,B,ne,ce,he,null),o.renderBufferDirect(ne,null,ce,he,L,null),L.onAfterShadow(o,L,B,ne,ce,he,null)}}const ie=L.children;for(let ce=0,xe=ie.length;ce<xe;ce++)P(ie[ce],B,ne,w,C)}function V(L){L.target.removeEventListener("dispose",V);for(const ne in p){const w=p[ne],C=L.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}const $E={[Kh]:Qh,[Jh]:td,[$h]:nd,[Rr]:ed,[Qh]:Kh,[td]:Jh,[nd]:$h,[ed]:Rr};function eT(o,e){function i(){let H=!1;const De=new kt;let Re=null;const Ce=new kt(0,0,0,0);return{setMask:function(be){Re!==be&&!H&&(o.colorMask(be,be,be,be),Re=be)},setLocked:function(be){H=be},setClear:function(be,ge,Be,it,It){It===!0&&(be*=it,ge*=it,Be*=it),De.set(be,ge,Be,it),Ce.equals(De)===!1&&(o.clearColor(be,ge,Be,it),Ce.copy(De))},reset:function(){H=!1,Re=null,Ce.set(-1,0,0,0)}}}function s(){let H=!1,De=!1,Re=null,Ce=null,be=null;return{setReversed:function(ge){if(De!==ge){const Be=e.get("EXT_clip_control");ge?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),De=ge;const it=be;be=null,this.setClear(it)}},getReversed:function(){return De},setTest:function(ge){ge?ue(o.DEPTH_TEST):we(o.DEPTH_TEST)},setMask:function(ge){Re!==ge&&!H&&(o.depthMask(ge),Re=ge)},setFunc:function(ge){if(De&&(ge=$E[ge]),Ce!==ge){switch(ge){case Kh:o.depthFunc(o.NEVER);break;case Qh:o.depthFunc(o.ALWAYS);break;case Jh:o.depthFunc(o.LESS);break;case Rr:o.depthFunc(o.LEQUAL);break;case $h:o.depthFunc(o.EQUAL);break;case ed:o.depthFunc(o.GEQUAL);break;case td:o.depthFunc(o.GREATER);break;case nd:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Ce=ge}},setLocked:function(ge){H=ge},setClear:function(ge){be!==ge&&(De&&(ge=1-ge),o.clearDepth(ge),be=ge)},reset:function(){H=!1,Re=null,Ce=null,be=null,De=!1}}}function l(){let H=!1,De=null,Re=null,Ce=null,be=null,ge=null,Be=null,it=null,It=null;return{setTest:function(wt){H||(wt?ue(o.STENCIL_TEST):we(o.STENCIL_TEST))},setMask:function(wt){De!==wt&&!H&&(o.stencilMask(wt),De=wt)},setFunc:function(wt,Cn,Yn){(Re!==wt||Ce!==Cn||be!==Yn)&&(o.stencilFunc(wt,Cn,Yn),Re=wt,Ce=Cn,be=Yn)},setOp:function(wt,Cn,Yn){(ge!==wt||Be!==Cn||it!==Yn)&&(o.stencilOp(wt,Cn,Yn),ge=wt,Be=Cn,it=Yn)},setLocked:function(wt){H=wt},setClear:function(wt){It!==wt&&(o.clearStencil(wt),It=wt)},reset:function(){H=!1,De=null,Re=null,Ce=null,be=null,ge=null,Be=null,it=null,It=null}}}const c=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},x={},_=new WeakMap,M=[],b=null,T=!1,y=null,v=null,N=null,D=null,P=null,V=null,L=null,B=new st(0,0,0),ne=0,w=!1,C=null,k=null,ie=null,ce=null,xe=null;const he=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,j=0;const Y=o.getParameter(o.VERSION);Y.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Y)[1]),F=j>=1):Y.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),F=j>=2);let _e=null,ve={};const O=o.getParameter(o.SCISSOR_BOX),re=o.getParameter(o.VIEWPORT),Me=new kt().fromArray(O),Te=new kt().fromArray(re);function Pe(H,De,Re,Ce){const be=new Uint8Array(4),ge=o.createTexture();o.bindTexture(H,ge),o.texParameteri(H,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(H,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Be=0;Be<Re;Be++)H===o.TEXTURE_3D||H===o.TEXTURE_2D_ARRAY?o.texImage3D(De,0,o.RGBA,1,1,Ce,0,o.RGBA,o.UNSIGNED_BYTE,be):o.texImage2D(De+Be,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,be);return ge}const ae={};ae[o.TEXTURE_2D]=Pe(o.TEXTURE_2D,o.TEXTURE_2D,1),ae[o.TEXTURE_CUBE_MAP]=Pe(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[o.TEXTURE_2D_ARRAY]=Pe(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),ae[o.TEXTURE_3D]=Pe(o.TEXTURE_3D,o.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ue(o.DEPTH_TEST),h.setFunc(Rr),mt(!1),gt(Xx),ue(o.CULL_FACE),Ct(Pi);function ue(H){g[H]!==!0&&(o.enable(H),g[H]=!0)}function we(H){g[H]!==!1&&(o.disable(H),g[H]=!1)}function He(H,De){return x[H]!==De?(o.bindFramebuffer(H,De),x[H]=De,H===o.DRAW_FRAMEBUFFER&&(x[o.FRAMEBUFFER]=De),H===o.FRAMEBUFFER&&(x[o.DRAW_FRAMEBUFFER]=De),!0):!1}function Xe(H,De){let Re=M,Ce=!1;if(H){Re=_.get(De),Re===void 0&&(Re=[],_.set(De,Re));const be=H.textures;if(Re.length!==be.length||Re[0]!==o.COLOR_ATTACHMENT0){for(let ge=0,Be=be.length;ge<Be;ge++)Re[ge]=o.COLOR_ATTACHMENT0+ge;Re.length=be.length,Ce=!0}}else Re[0]!==o.BACK&&(Re[0]=o.BACK,Ce=!0);Ce&&o.drawBuffers(Re)}function ut(H){return b!==H?(o.useProgram(H),b=H,!0):!1}const tn={[As]:o.FUNC_ADD,[ay]:o.FUNC_SUBTRACT,[sy]:o.FUNC_REVERSE_SUBTRACT};tn[ry]=o.MIN,tn[oy]=o.MAX;const pt={[ly]:o.ZERO,[cy]:o.ONE,[uy]:o.SRC_COLOR,[jh]:o.SRC_ALPHA,[xy]:o.SRC_ALPHA_SATURATE,[py]:o.DST_COLOR,[hy]:o.DST_ALPHA,[fy]:o.ONE_MINUS_SRC_COLOR,[Zh]:o.ONE_MINUS_SRC_ALPHA,[my]:o.ONE_MINUS_DST_COLOR,[dy]:o.ONE_MINUS_DST_ALPHA,[gy]:o.CONSTANT_COLOR,[_y]:o.ONE_MINUS_CONSTANT_COLOR,[vy]:o.CONSTANT_ALPHA,[Sy]:o.ONE_MINUS_CONSTANT_ALPHA};function Ct(H,De,Re,Ce,be,ge,Be,it,It,wt){if(H===Pi){T===!0&&(we(o.BLEND),T=!1);return}if(T===!1&&(ue(o.BLEND),T=!0),H!==iy){if(H!==y||wt!==w){if((v!==As||P!==As)&&(o.blendEquation(o.FUNC_ADD),v=As,P=As),wt)switch(H){case Tr:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Xc:o.blendFunc(o.ONE,o.ONE);break;case Wx:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case qx:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:sn("WebGLState: Invalid blending: ",H);break}else switch(H){case Tr:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Xc:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case Wx:sn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qx:sn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:sn("WebGLState: Invalid blending: ",H);break}N=null,D=null,V=null,L=null,B.set(0,0,0),ne=0,y=H,w=wt}return}be=be||De,ge=ge||Re,Be=Be||Ce,(De!==v||be!==P)&&(o.blendEquationSeparate(tn[De],tn[be]),v=De,P=be),(Re!==N||Ce!==D||ge!==V||Be!==L)&&(o.blendFuncSeparate(pt[Re],pt[Ce],pt[ge],pt[Be]),N=Re,D=Ce,V=ge,L=Be),(it.equals(B)===!1||It!==ne)&&(o.blendColor(it.r,it.g,it.b,It),B.copy(it),ne=It),y=H,w=!1}function I(H,De){H.side===da?we(o.CULL_FACE):ue(o.CULL_FACE);let Re=H.side===Xn;De&&(Re=!Re),mt(Re),H.blending===Tr&&H.transparent===!1?Ct(Pi):Ct(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),h.setFunc(H.depthFunc),h.setTest(H.depthTest),h.setMask(H.depthWrite),c.setMask(H.colorWrite);const Ce=H.stencilWrite;d.setTest(Ce),Ce&&(d.setMask(H.stencilWriteMask),d.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),d.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ge(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ue(o.SAMPLE_ALPHA_TO_COVERAGE):we(o.SAMPLE_ALPHA_TO_COVERAGE)}function mt(H){C!==H&&(H?o.frontFace(o.CW):o.frontFace(o.CCW),C=H)}function gt(H){H!==ey?(ue(o.CULL_FACE),H!==k&&(H===Xx?o.cullFace(o.BACK):H===ty?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):we(o.CULL_FACE),k=H}function Pt(H){H!==ie&&(F&&o.lineWidth(H),ie=H)}function Ge(H,De,Re){H?(ue(o.POLYGON_OFFSET_FILL),(ce!==De||xe!==Re)&&(o.polygonOffset(De,Re),ce=De,xe=Re)):we(o.POLYGON_OFFSET_FILL)}function Xt(H){H?ue(o.SCISSOR_TEST):we(o.SCISSOR_TEST)}function je(H){H===void 0&&(H=o.TEXTURE0+he-1),_e!==H&&(o.activeTexture(H),_e=H)}function at(H,De,Re){Re===void 0&&(_e===null?Re=o.TEXTURE0+he-1:Re=_e);let Ce=ve[Re];Ce===void 0&&(Ce={type:void 0,texture:void 0},ve[Re]=Ce),(Ce.type!==H||Ce.texture!==De)&&(_e!==Re&&(o.activeTexture(Re),_e=Re),o.bindTexture(H,De||ae[H]),Ce.type=H,Ce.texture=De)}function U(){const H=ve[_e];H!==void 0&&H.type!==void 0&&(o.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function E(){try{o.compressedTexImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function J(){try{o.compressedTexImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function pe(){try{o.texSubImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function Se(){try{o.texSubImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function le(){try{o.compressedTexSubImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function qe(){try{o.compressedTexSubImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function Ne(){try{o.texStorage2D(...arguments)}catch(H){H("WebGLState:",H)}}function Qe(){try{o.texStorage3D(...arguments)}catch(H){H("WebGLState:",H)}}function We(){try{o.texImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function ye(){try{o.texImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function Ee(H){Me.equals(H)===!1&&(o.scissor(H.x,H.y,H.z,H.w),Me.copy(H))}function Ye(H){Te.equals(H)===!1&&(o.viewport(H.x,H.y,H.z,H.w),Te.copy(H))}function Ve(H,De){let Re=p.get(De);Re===void 0&&(Re=new WeakMap,p.set(De,Re));let Ce=Re.get(H);Ce===void 0&&(Ce=o.getUniformBlockIndex(De,H.name),Re.set(H,Ce))}function Oe(H,De){const Ce=p.get(De).get(H);m.get(De)!==Ce&&(o.uniformBlockBinding(De,Ce,H.__bindingPointIndex),m.set(De,Ce))}function nt(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),g={},_e=null,ve={},x={},_=new WeakMap,M=[],b=null,T=!1,y=null,v=null,N=null,D=null,P=null,V=null,L=null,B=new st(0,0,0),ne=0,w=!1,C=null,k=null,ie=null,ce=null,xe=null,Me.set(0,0,o.canvas.width,o.canvas.height),Te.set(0,0,o.canvas.width,o.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:ue,disable:we,bindFramebuffer:He,drawBuffers:Xe,useProgram:ut,setBlending:Ct,setMaterial:I,setFlipSided:mt,setCullFace:gt,setLineWidth:Pt,setPolygonOffset:Ge,setScissorTest:Xt,activeTexture:je,bindTexture:at,unbindTexture:U,compressedTexImage2D:E,compressedTexImage3D:J,texImage2D:We,texImage3D:ye,updateUBOMapping:Ve,uniformBlockBinding:Oe,texStorage2D:Ne,texStorage3D:Qe,texSubImage2D:pe,texSubImage3D:Se,compressedTexSubImage2D:le,compressedTexSubImage3D:qe,scissor:Ee,viewport:Ye,reset:nt}}function tT(o,e,i,s,l,c,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new lt,g=new WeakMap;let x;const _=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(U,E){return M?new OffscreenCanvas(U,E):jc("canvas")}function T(U,E,J){let pe=1;const Se=at(U);if((Se.width>J||Se.height>J)&&(pe=J/Math.max(Se.width,Se.height)),pe<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const le=Math.floor(pe*Se.width),qe=Math.floor(pe*Se.height);x===void 0&&(x=b(le,qe));const Ne=E?b(le,qe):x;return Ne.width=le,Ne.height=qe,Ne.getContext("2d").drawImage(U,0,0,le,qe),ot("WebGLRenderer: Texture has been resized from ("+Se.width+"x"+Se.height+") to ("+le+"x"+qe+")."),Ne}else return"data"in U&&ot("WebGLRenderer: Image in DataTexture is too big ("+Se.width+"x"+Se.height+")."),U;return U}function y(U){return U.generateMipmaps}function v(U){o.generateMipmap(U)}function N(U){return U.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?o.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function D(U,E,J,pe,Se=!1){if(U!==null){if(o[U]!==void 0)return o[U];ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let le=E;if(E===o.RED&&(J===o.FLOAT&&(le=o.R32F),J===o.HALF_FLOAT&&(le=o.R16F),J===o.UNSIGNED_BYTE&&(le=o.R8)),E===o.RED_INTEGER&&(J===o.UNSIGNED_BYTE&&(le=o.R8UI),J===o.UNSIGNED_SHORT&&(le=o.R16UI),J===o.UNSIGNED_INT&&(le=o.R32UI),J===o.BYTE&&(le=o.R8I),J===o.SHORT&&(le=o.R16I),J===o.INT&&(le=o.R32I)),E===o.RG&&(J===o.FLOAT&&(le=o.RG32F),J===o.HALF_FLOAT&&(le=o.RG16F),J===o.UNSIGNED_BYTE&&(le=o.RG8)),E===o.RG_INTEGER&&(J===o.UNSIGNED_BYTE&&(le=o.RG8UI),J===o.UNSIGNED_SHORT&&(le=o.RG16UI),J===o.UNSIGNED_INT&&(le=o.RG32UI),J===o.BYTE&&(le=o.RG8I),J===o.SHORT&&(le=o.RG16I),J===o.INT&&(le=o.RG32I)),E===o.RGB_INTEGER&&(J===o.UNSIGNED_BYTE&&(le=o.RGB8UI),J===o.UNSIGNED_SHORT&&(le=o.RGB16UI),J===o.UNSIGNED_INT&&(le=o.RGB32UI),J===o.BYTE&&(le=o.RGB8I),J===o.SHORT&&(le=o.RGB16I),J===o.INT&&(le=o.RGB32I)),E===o.RGBA_INTEGER&&(J===o.UNSIGNED_BYTE&&(le=o.RGBA8UI),J===o.UNSIGNED_SHORT&&(le=o.RGBA16UI),J===o.UNSIGNED_INT&&(le=o.RGBA32UI),J===o.BYTE&&(le=o.RGBA8I),J===o.SHORT&&(le=o.RGBA16I),J===o.INT&&(le=o.RGBA32I)),E===o.RGB&&(J===o.UNSIGNED_INT_5_9_9_9_REV&&(le=o.RGB9_E5),J===o.UNSIGNED_INT_10F_11F_11F_REV&&(le=o.R11F_G11F_B10F)),E===o.RGBA){const qe=Se?qc:Rt.getTransfer(pe);J===o.FLOAT&&(le=o.RGBA32F),J===o.HALF_FLOAT&&(le=o.RGBA16F),J===o.UNSIGNED_BYTE&&(le=qe===Ft?o.SRGB8_ALPHA8:o.RGBA8),J===o.UNSIGNED_SHORT_4_4_4_4&&(le=o.RGBA4),J===o.UNSIGNED_SHORT_5_5_5_1&&(le=o.RGB5_A1)}return(le===o.R16F||le===o.R32F||le===o.RG16F||le===o.RG32F||le===o.RGBA16F||le===o.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function P(U,E){let J;return U?E===null||E===ws||E===ko?J=o.DEPTH24_STENCIL8:E===xa?J=o.DEPTH32F_STENCIL8:E===Vo&&(J=o.DEPTH24_STENCIL8,ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ws||E===ko?J=o.DEPTH_COMPONENT24:E===xa?J=o.DEPTH_COMPONENT32F:E===Vo&&(J=o.DEPTH_COMPONENT16),J}function V(U,E){return y(U)===!0||U.isFramebufferTexture&&U.minFilter!==si&&U.minFilter!==gi?Math.log2(Math.max(E.width,E.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?E.mipmaps.length:1}function L(U){const E=U.target;E.removeEventListener("dispose",L),ne(E),E.isVideoTexture&&g.delete(E)}function B(U){const E=U.target;E.removeEventListener("dispose",B),C(E)}function ne(U){const E=s.get(U);if(E.__webglInit===void 0)return;const J=U.source,pe=_.get(J);if(pe){const Se=pe[E.__cacheKey];Se.usedTimes--,Se.usedTimes===0&&w(U),Object.keys(pe).length===0&&_.delete(J)}s.remove(U)}function w(U){const E=s.get(U);o.deleteTexture(E.__webglTexture);const J=U.source,pe=_.get(J);delete pe[E.__cacheKey],h.memory.textures--}function C(U){const E=s.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),s.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++){if(Array.isArray(E.__webglFramebuffer[pe]))for(let Se=0;Se<E.__webglFramebuffer[pe].length;Se++)o.deleteFramebuffer(E.__webglFramebuffer[pe][Se]);else o.deleteFramebuffer(E.__webglFramebuffer[pe]);E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer[pe])}else{if(Array.isArray(E.__webglFramebuffer))for(let pe=0;pe<E.__webglFramebuffer.length;pe++)o.deleteFramebuffer(E.__webglFramebuffer[pe]);else o.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&o.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let pe=0;pe<E.__webglColorRenderbuffer.length;pe++)E.__webglColorRenderbuffer[pe]&&o.deleteRenderbuffer(E.__webglColorRenderbuffer[pe]);E.__webglDepthRenderbuffer&&o.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const J=U.textures;for(let pe=0,Se=J.length;pe<Se;pe++){const le=s.get(J[pe]);le.__webglTexture&&(o.deleteTexture(le.__webglTexture),h.memory.textures--),s.remove(J[pe])}s.remove(U)}let k=0;function ie(){k=0}function ce(){const U=k;return U>=l.maxTextures&&ot("WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),k+=1,U}function xe(U){const E=[];return E.push(U.wrapS),E.push(U.wrapT),E.push(U.wrapR||0),E.push(U.magFilter),E.push(U.minFilter),E.push(U.anisotropy),E.push(U.internalFormat),E.push(U.format),E.push(U.type),E.push(U.generateMipmaps),E.push(U.premultiplyAlpha),E.push(U.flipY),E.push(U.unpackAlignment),E.push(U.colorSpace),E.join()}function he(U,E){const J=s.get(U);if(U.isVideoTexture&&Xt(U),U.isRenderTargetTexture===!1&&U.isExternalTexture!==!0&&U.version>0&&J.__version!==U.version){const pe=U.image;if(pe===null)ot("WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)ot("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(J,U,E);return}}else U.isExternalTexture&&(J.__webglTexture=U.sourceTexture?U.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,J.__webglTexture,o.TEXTURE0+E)}function F(U,E){const J=s.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&J.__version!==U.version){ae(J,U,E);return}else U.isExternalTexture&&(J.__webglTexture=U.sourceTexture?U.sourceTexture:null);i.bindTexture(o.TEXTURE_2D_ARRAY,J.__webglTexture,o.TEXTURE0+E)}function j(U,E){const J=s.get(U);if(U.isRenderTargetTexture===!1&&U.version>0&&J.__version!==U.version){ae(J,U,E);return}i.bindTexture(o.TEXTURE_3D,J.__webglTexture,o.TEXTURE0+E)}function Y(U,E){const J=s.get(U);if(U.version>0&&J.__version!==U.version){ue(J,U,E);return}i.bindTexture(o.TEXTURE_CUBE_MAP,J.__webglTexture,o.TEXTURE0+E)}const _e={[ad]:o.REPEAT,[ma]:o.CLAMP_TO_EDGE,[sd]:o.MIRRORED_REPEAT},ve={[si]:o.NEAREST,[by]:o.NEAREST_MIPMAP_NEAREST,[cc]:o.NEAREST_MIPMAP_LINEAR,[gi]:o.LINEAR,[mh]:o.LINEAR_MIPMAP_NEAREST,[Cs]:o.LINEAR_MIPMAP_LINEAR},O={[Ry]:o.NEVER,[Ly]:o.ALWAYS,[Cy]:o.LESS,[g_]:o.LEQUAL,[wy]:o.EQUAL,[Ny]:o.GEQUAL,[Dy]:o.GREATER,[Uy]:o.NOTEQUAL};function re(U,E){if(E.type===xa&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===gi||E.magFilter===mh||E.magFilter===cc||E.magFilter===Cs||E.minFilter===gi||E.minFilter===mh||E.minFilter===cc||E.minFilter===Cs)&&ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(U,o.TEXTURE_WRAP_S,_e[E.wrapS]),o.texParameteri(U,o.TEXTURE_WRAP_T,_e[E.wrapT]),(U===o.TEXTURE_3D||U===o.TEXTURE_2D_ARRAY)&&o.texParameteri(U,o.TEXTURE_WRAP_R,_e[E.wrapR]),o.texParameteri(U,o.TEXTURE_MAG_FILTER,ve[E.magFilter]),o.texParameteri(U,o.TEXTURE_MIN_FILTER,ve[E.minFilter]),E.compareFunction&&(o.texParameteri(U,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(U,o.TEXTURE_COMPARE_FUNC,O[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===si||E.minFilter!==cc&&E.minFilter!==Cs||E.type===xa&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");o.texParameterf(U,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function Me(U,E){let J=!1;U.__webglInit===void 0&&(U.__webglInit=!0,E.addEventListener("dispose",L));const pe=E.source;let Se=_.get(pe);Se===void 0&&(Se={},_.set(pe,Se));const le=xe(E);if(le!==U.__cacheKey){Se[le]===void 0&&(Se[le]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,J=!0),Se[le].usedTimes++;const qe=Se[U.__cacheKey];qe!==void 0&&(Se[U.__cacheKey].usedTimes--,qe.usedTimes===0&&w(E)),U.__cacheKey=le,U.__webglTexture=Se[le].texture}return J}function Te(U,E,J){return Math.floor(Math.floor(U/J)/E)}function Pe(U,E,J,pe){const le=U.updateRanges;if(le.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,E.width,E.height,J,pe,E.data);else{le.sort((ye,Ee)=>ye.start-Ee.start);let qe=0;for(let ye=1;ye<le.length;ye++){const Ee=le[qe],Ye=le[ye],Ve=Ee.start+Ee.count,Oe=Te(Ye.start,E.width,4),nt=Te(Ee.start,E.width,4);Ye.start<=Ve+1&&Oe===nt&&Te(Ye.start+Ye.count-1,E.width,4)===Oe?Ee.count=Math.max(Ee.count,Ye.start+Ye.count-Ee.start):(++qe,le[qe]=Ye)}le.length=qe+1;const Ne=o.getParameter(o.UNPACK_ROW_LENGTH),Qe=o.getParameter(o.UNPACK_SKIP_PIXELS),We=o.getParameter(o.UNPACK_SKIP_ROWS);o.pixelStorei(o.UNPACK_ROW_LENGTH,E.width);for(let ye=0,Ee=le.length;ye<Ee;ye++){const Ye=le[ye],Ve=Math.floor(Ye.start/4),Oe=Math.ceil(Ye.count/4),nt=Ve%E.width,H=Math.floor(Ve/E.width),De=Oe,Re=1;o.pixelStorei(o.UNPACK_SKIP_PIXELS,nt),o.pixelStorei(o.UNPACK_SKIP_ROWS,H),i.texSubImage2D(o.TEXTURE_2D,0,nt,H,De,Re,J,pe,E.data)}U.clearUpdateRanges(),o.pixelStorei(o.UNPACK_ROW_LENGTH,Ne),o.pixelStorei(o.UNPACK_SKIP_PIXELS,Qe),o.pixelStorei(o.UNPACK_SKIP_ROWS,We)}}function ae(U,E,J){let pe=o.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(pe=o.TEXTURE_2D_ARRAY),E.isData3DTexture&&(pe=o.TEXTURE_3D);const Se=Me(U,E),le=E.source;i.bindTexture(pe,U.__webglTexture,o.TEXTURE0+J);const qe=s.get(le);if(le.version!==qe.__version||Se===!0){i.activeTexture(o.TEXTURE0+J);const Ne=Rt.getPrimaries(Rt.workingColorSpace),Qe=E.colorSpace===Qa?null:Rt.getPrimaries(E.colorSpace),We=E.colorSpace===Qa||Ne===Qe?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let ye=T(E.image,!1,l.maxTextureSize);ye=je(E,ye);const Ee=c.convert(E.format,E.colorSpace),Ye=c.convert(E.type);let Ve=D(E.internalFormat,Ee,Ye,E.colorSpace,E.isVideoTexture);re(pe,E);let Oe;const nt=E.mipmaps,H=E.isVideoTexture!==!0,De=qe.__version===void 0||Se===!0,Re=le.dataReady,Ce=V(E,ye);if(E.isDepthTexture)Ve=P(E.format===Wo,E.type),De&&(H?i.texStorage2D(o.TEXTURE_2D,1,Ve,ye.width,ye.height):i.texImage2D(o.TEXTURE_2D,0,Ve,ye.width,ye.height,0,Ee,Ye,null));else if(E.isDataTexture)if(nt.length>0){H&&De&&i.texStorage2D(o.TEXTURE_2D,Ce,Ve,nt[0].width,nt[0].height);for(let be=0,ge=nt.length;be<ge;be++)Oe=nt[be],H?Re&&i.texSubImage2D(o.TEXTURE_2D,be,0,0,Oe.width,Oe.height,Ee,Ye,Oe.data):i.texImage2D(o.TEXTURE_2D,be,Ve,Oe.width,Oe.height,0,Ee,Ye,Oe.data);E.generateMipmaps=!1}else H?(De&&i.texStorage2D(o.TEXTURE_2D,Ce,Ve,ye.width,ye.height),Re&&Pe(E,ye,Ee,Ye)):i.texImage2D(o.TEXTURE_2D,0,Ve,ye.width,ye.height,0,Ee,Ye,ye.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){H&&De&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ce,Ve,nt[0].width,nt[0].height,ye.depth);for(let be=0,ge=nt.length;be<ge;be++)if(Oe=nt[be],E.format!==Ai)if(Ee!==null)if(H){if(Re)if(E.layerUpdates.size>0){const Be=Eg(Oe.width,Oe.height,E.format,E.type);for(const it of E.layerUpdates){const It=Oe.data.subarray(it*Be/Oe.data.BYTES_PER_ELEMENT,(it+1)*Be/Oe.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,be,0,0,it,Oe.width,Oe.height,1,Ee,It)}E.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,be,0,0,0,Oe.width,Oe.height,ye.depth,Ee,Oe.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,be,Ve,Oe.width,Oe.height,ye.depth,0,Oe.data,0,0);else ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else H?Re&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,be,0,0,0,Oe.width,Oe.height,ye.depth,Ee,Ye,Oe.data):i.texImage3D(o.TEXTURE_2D_ARRAY,be,Ve,Oe.width,Oe.height,ye.depth,0,Ee,Ye,Oe.data)}else{H&&De&&i.texStorage2D(o.TEXTURE_2D,Ce,Ve,nt[0].width,nt[0].height);for(let be=0,ge=nt.length;be<ge;be++)Oe=nt[be],E.format!==Ai?Ee!==null?H?Re&&i.compressedTexSubImage2D(o.TEXTURE_2D,be,0,0,Oe.width,Oe.height,Ee,Oe.data):i.compressedTexImage2D(o.TEXTURE_2D,be,Ve,Oe.width,Oe.height,0,Oe.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):H?Re&&i.texSubImage2D(o.TEXTURE_2D,be,0,0,Oe.width,Oe.height,Ee,Ye,Oe.data):i.texImage2D(o.TEXTURE_2D,be,Ve,Oe.width,Oe.height,0,Ee,Ye,Oe.data)}else if(E.isDataArrayTexture)if(H){if(De&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ce,Ve,ye.width,ye.height,ye.depth),Re)if(E.layerUpdates.size>0){const be=Eg(ye.width,ye.height,E.format,E.type);for(const ge of E.layerUpdates){const Be=ye.data.subarray(ge*be/ye.data.BYTES_PER_ELEMENT,(ge+1)*be/ye.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,ge,ye.width,ye.height,1,Ee,Ye,Be)}E.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,ye.width,ye.height,ye.depth,Ee,Ye,ye.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Ve,ye.width,ye.height,ye.depth,0,Ee,Ye,ye.data);else if(E.isData3DTexture)H?(De&&i.texStorage3D(o.TEXTURE_3D,Ce,Ve,ye.width,ye.height,ye.depth),Re&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,ye.width,ye.height,ye.depth,Ee,Ye,ye.data)):i.texImage3D(o.TEXTURE_3D,0,Ve,ye.width,ye.height,ye.depth,0,Ee,Ye,ye.data);else if(E.isFramebufferTexture){if(De)if(H)i.texStorage2D(o.TEXTURE_2D,Ce,Ve,ye.width,ye.height);else{let be=ye.width,ge=ye.height;for(let Be=0;Be<Ce;Be++)i.texImage2D(o.TEXTURE_2D,Be,Ve,be,ge,0,Ee,Ye,null),be>>=1,ge>>=1}}else if(nt.length>0){if(H&&De){const be=at(nt[0]);i.texStorage2D(o.TEXTURE_2D,Ce,Ve,be.width,be.height)}for(let be=0,ge=nt.length;be<ge;be++)Oe=nt[be],H?Re&&i.texSubImage2D(o.TEXTURE_2D,be,0,0,Ee,Ye,Oe):i.texImage2D(o.TEXTURE_2D,be,Ve,Ee,Ye,Oe);E.generateMipmaps=!1}else if(H){if(De){const be=at(ye);i.texStorage2D(o.TEXTURE_2D,Ce,Ve,be.width,be.height)}Re&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Ee,Ye,ye)}else i.texImage2D(o.TEXTURE_2D,0,Ve,Ee,Ye,ye);y(E)&&v(pe),qe.__version=le.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function ue(U,E,J){if(E.image.length!==6)return;const pe=Me(U,E),Se=E.source;i.bindTexture(o.TEXTURE_CUBE_MAP,U.__webglTexture,o.TEXTURE0+J);const le=s.get(Se);if(Se.version!==le.__version||pe===!0){i.activeTexture(o.TEXTURE0+J);const qe=Rt.getPrimaries(Rt.workingColorSpace),Ne=E.colorSpace===Qa?null:Rt.getPrimaries(E.colorSpace),Qe=E.colorSpace===Qa||qe===Ne?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);const We=E.isCompressedTexture||E.image[0].isCompressedTexture,ye=E.image[0]&&E.image[0].isDataTexture,Ee=[];for(let ge=0;ge<6;ge++)!We&&!ye?Ee[ge]=T(E.image[ge],!0,l.maxCubemapSize):Ee[ge]=ye?E.image[ge].image:E.image[ge],Ee[ge]=je(E,Ee[ge]);const Ye=Ee[0],Ve=c.convert(E.format,E.colorSpace),Oe=c.convert(E.type),nt=D(E.internalFormat,Ve,Oe,E.colorSpace),H=E.isVideoTexture!==!0,De=le.__version===void 0||pe===!0,Re=Se.dataReady;let Ce=V(E,Ye);re(o.TEXTURE_CUBE_MAP,E);let be;if(We){H&&De&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Ce,nt,Ye.width,Ye.height);for(let ge=0;ge<6;ge++){be=Ee[ge].mipmaps;for(let Be=0;Be<be.length;Be++){const it=be[Be];E.format!==Ai?Ve!==null?H?Re&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be,0,0,it.width,it.height,Ve,it.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be,nt,it.width,it.height,0,it.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?Re&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be,0,0,it.width,it.height,Ve,Oe,it.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be,nt,it.width,it.height,0,Ve,Oe,it.data)}}}else{if(be=E.mipmaps,H&&De){be.length>0&&Ce++;const ge=at(Ee[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Ce,nt,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(ye){H?Re&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ee[ge].width,Ee[ge].height,Ve,Oe,Ee[ge].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,nt,Ee[ge].width,Ee[ge].height,0,Ve,Oe,Ee[ge].data);for(let Be=0;Be<be.length;Be++){const It=be[Be].image[ge].image;H?Re&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be+1,0,0,It.width,It.height,Ve,Oe,It.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be+1,nt,It.width,It.height,0,Ve,Oe,It.data)}}else{H?Re&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ve,Oe,Ee[ge]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,nt,Ve,Oe,Ee[ge]);for(let Be=0;Be<be.length;Be++){const it=be[Be];H?Re&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be+1,0,0,Ve,Oe,it.image[ge]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Be+1,nt,Ve,Oe,it.image[ge])}}}y(E)&&v(o.TEXTURE_CUBE_MAP),le.__version=Se.version,E.onUpdate&&E.onUpdate(E)}U.__version=E.version}function we(U,E,J,pe,Se,le){const qe=c.convert(J.format,J.colorSpace),Ne=c.convert(J.type),Qe=D(J.internalFormat,qe,Ne,J.colorSpace),We=s.get(E),ye=s.get(J);if(ye.__renderTarget=E,!We.__hasExternalTextures){const Ee=Math.max(1,E.width>>le),Ye=Math.max(1,E.height>>le);Se===o.TEXTURE_3D||Se===o.TEXTURE_2D_ARRAY?i.texImage3D(Se,le,Qe,Ee,Ye,E.depth,0,qe,Ne,null):i.texImage2D(Se,le,Qe,Ee,Ye,0,qe,Ne,null)}i.bindFramebuffer(o.FRAMEBUFFER,U),Ge(E)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,pe,Se,ye.__webglTexture,0,Pt(E)):(Se===o.TEXTURE_2D||Se>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Se<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,pe,Se,ye.__webglTexture,le),i.bindFramebuffer(o.FRAMEBUFFER,null)}function He(U,E,J){if(o.bindRenderbuffer(o.RENDERBUFFER,U),E.depthBuffer){const pe=E.depthTexture,Se=pe&&pe.isDepthTexture?pe.type:null,le=P(E.stencilBuffer,Se),qe=E.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ne=Pt(E);Ge(E)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ne,le,E.width,E.height):J?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ne,le,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,le,E.width,E.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,qe,o.RENDERBUFFER,U)}else{const pe=E.textures;for(let Se=0;Se<pe.length;Se++){const le=pe[Se],qe=c.convert(le.format,le.colorSpace),Ne=c.convert(le.type),Qe=D(le.internalFormat,qe,Ne,le.colorSpace),We=Pt(E);J&&Ge(E)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,We,Qe,E.width,E.height):Ge(E)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,We,Qe,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,Qe,E.width,E.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Xe(U,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,U),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pe=s.get(E.depthTexture);pe.__renderTarget=E,(!pe.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),he(E.depthTexture,0);const Se=pe.__webglTexture,le=Pt(E);if(E.depthTexture.format===Xo)Ge(E)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Se,0,le):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Se,0);else if(E.depthTexture.format===Wo)Ge(E)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Se,0,le):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Se,0);else throw new Error("Unknown depthTexture format")}function ut(U){const E=s.get(U),J=U.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==U.depthTexture){const pe=U.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),pe){const Se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,pe.removeEventListener("dispose",Se)};pe.addEventListener("dispose",Se),E.__depthDisposeCallback=Se}E.__boundDepthTexture=pe}if(U.depthTexture&&!E.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");const pe=U.texture.mipmaps;pe&&pe.length>0?Xe(E.__webglFramebuffer[0],U):Xe(E.__webglFramebuffer,U)}else if(J){E.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)if(i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[pe]),E.__webglDepthbuffer[pe]===void 0)E.__webglDepthbuffer[pe]=o.createRenderbuffer(),He(E.__webglDepthbuffer[pe],U,!1);else{const Se=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,le=E.__webglDepthbuffer[pe];o.bindRenderbuffer(o.RENDERBUFFER,le),o.framebufferRenderbuffer(o.FRAMEBUFFER,Se,o.RENDERBUFFER,le)}}else{const pe=U.texture.mipmaps;if(pe&&pe.length>0?i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=o.createRenderbuffer(),He(E.__webglDepthbuffer,U,!1);else{const Se=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,le=E.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,le),o.framebufferRenderbuffer(o.FRAMEBUFFER,Se,o.RENDERBUFFER,le)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function tn(U,E,J){const pe=s.get(U);E!==void 0&&we(pe.__webglFramebuffer,U,U.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),J!==void 0&&ut(U)}function pt(U){const E=U.texture,J=s.get(U),pe=s.get(E);U.addEventListener("dispose",B);const Se=U.textures,le=U.isWebGLCubeRenderTarget===!0,qe=Se.length>1;if(qe||(pe.__webglTexture===void 0&&(pe.__webglTexture=o.createTexture()),pe.__version=E.version,h.memory.textures++),le){J.__webglFramebuffer=[];for(let Ne=0;Ne<6;Ne++)if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer[Ne]=[];for(let Qe=0;Qe<E.mipmaps.length;Qe++)J.__webglFramebuffer[Ne][Qe]=o.createFramebuffer()}else J.__webglFramebuffer[Ne]=o.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer=[];for(let Ne=0;Ne<E.mipmaps.length;Ne++)J.__webglFramebuffer[Ne]=o.createFramebuffer()}else J.__webglFramebuffer=o.createFramebuffer();if(qe)for(let Ne=0,Qe=Se.length;Ne<Qe;Ne++){const We=s.get(Se[Ne]);We.__webglTexture===void 0&&(We.__webglTexture=o.createTexture(),h.memory.textures++)}if(U.samples>0&&Ge(U)===!1){J.__webglMultisampledFramebuffer=o.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Ne=0;Ne<Se.length;Ne++){const Qe=Se[Ne];J.__webglColorRenderbuffer[Ne]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,J.__webglColorRenderbuffer[Ne]);const We=c.convert(Qe.format,Qe.colorSpace),ye=c.convert(Qe.type),Ee=D(Qe.internalFormat,We,ye,Qe.colorSpace,U.isXRRenderTarget===!0),Ye=Pt(U);o.renderbufferStorageMultisample(o.RENDERBUFFER,Ye,Ee,U.width,U.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ne,o.RENDERBUFFER,J.__webglColorRenderbuffer[Ne])}o.bindRenderbuffer(o.RENDERBUFFER,null),U.depthBuffer&&(J.__webglDepthRenderbuffer=o.createRenderbuffer(),He(J.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(le){i.bindTexture(o.TEXTURE_CUBE_MAP,pe.__webglTexture),re(o.TEXTURE_CUBE_MAP,E);for(let Ne=0;Ne<6;Ne++)if(E.mipmaps&&E.mipmaps.length>0)for(let Qe=0;Qe<E.mipmaps.length;Qe++)we(J.__webglFramebuffer[Ne][Qe],U,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,Qe);else we(J.__webglFramebuffer[Ne],U,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0);y(E)&&v(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(qe){for(let Ne=0,Qe=Se.length;Ne<Qe;Ne++){const We=Se[Ne],ye=s.get(We);let Ee=o.TEXTURE_2D;(U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ee=U.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ee,ye.__webglTexture),re(Ee,We),we(J.__webglFramebuffer,U,We,o.COLOR_ATTACHMENT0+Ne,Ee,0),y(We)&&v(Ee)}i.unbindTexture()}else{let Ne=o.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ne=U.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ne,pe.__webglTexture),re(Ne,E),E.mipmaps&&E.mipmaps.length>0)for(let Qe=0;Qe<E.mipmaps.length;Qe++)we(J.__webglFramebuffer[Qe],U,E,o.COLOR_ATTACHMENT0,Ne,Qe);else we(J.__webglFramebuffer,U,E,o.COLOR_ATTACHMENT0,Ne,0);y(E)&&v(Ne),i.unbindTexture()}U.depthBuffer&&ut(U)}function Ct(U){const E=U.textures;for(let J=0,pe=E.length;J<pe;J++){const Se=E[J];if(y(Se)){const le=N(U),qe=s.get(Se).__webglTexture;i.bindTexture(le,qe),v(le),i.unbindTexture()}}}const I=[],mt=[];function gt(U){if(U.samples>0){if(Ge(U)===!1){const E=U.textures,J=U.width,pe=U.height;let Se=o.COLOR_BUFFER_BIT;const le=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,qe=s.get(U),Ne=E.length>1;if(Ne)for(let We=0;We<E.length;We++)i.bindFramebuffer(o.FRAMEBUFFER,qe.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+We,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,qe.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+We,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,qe.__webglMultisampledFramebuffer);const Qe=U.texture.mipmaps;Qe&&Qe.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,qe.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,qe.__webglFramebuffer);for(let We=0;We<E.length;We++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(Se|=o.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(Se|=o.STENCIL_BUFFER_BIT)),Ne){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,qe.__webglColorRenderbuffer[We]);const ye=s.get(E[We]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ye,0)}o.blitFramebuffer(0,0,J,pe,0,0,J,pe,Se,o.NEAREST),m===!0&&(I.length=0,mt.length=0,I.push(o.COLOR_ATTACHMENT0+We),U.depthBuffer&&U.resolveDepthBuffer===!1&&(I.push(le),mt.push(le),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,mt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,I))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Ne)for(let We=0;We<E.length;We++){i.bindFramebuffer(o.FRAMEBUFFER,qe.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+We,o.RENDERBUFFER,qe.__webglColorRenderbuffer[We]);const ye=s.get(E[We]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,qe.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+We,o.TEXTURE_2D,ye,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,qe.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const E=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[E])}}}function Pt(U){return Math.min(l.maxSamples,U.samples)}function Ge(U){const E=s.get(U);return U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Xt(U){const E=h.render.frame;g.get(U)!==E&&(g.set(U,E),U.update())}function je(U,E){const J=U.colorSpace,pe=U.format,Se=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||J!==Dr&&J!==Qa&&(Rt.getTransfer(J)===Ft?(pe!==Ai||Se!==Bi)&&ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):sn("WebGLTextures: Unsupported texture color space:",J)),E}function at(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=ce,this.resetTextureUnits=ie,this.setTexture2D=he,this.setTexture2DArray=F,this.setTexture3D=j,this.setTextureCube=Y,this.rebindTextures=tn,this.setupRenderTarget=pt,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ge}function nT(o,e){function i(s,l=Qa){let c;const h=Rt.getTransfer(l);if(s===Bi)return o.UNSIGNED_BYTE;if(s===Gd)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Vd)return o.UNSIGNED_SHORT_5_5_5_1;if(s===f_)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===h_)return o.UNSIGNED_INT_10F_11F_11F_REV;if(s===c_)return o.BYTE;if(s===u_)return o.SHORT;if(s===Vo)return o.UNSIGNED_SHORT;if(s===Hd)return o.INT;if(s===ws)return o.UNSIGNED_INT;if(s===xa)return o.FLOAT;if(s===zi)return o.HALF_FLOAT;if(s===d_)return o.ALPHA;if(s===p_)return o.RGB;if(s===Ai)return o.RGBA;if(s===Xo)return o.DEPTH_COMPONENT;if(s===Wo)return o.DEPTH_STENCIL;if(s===m_)return o.RED;if(s===kd)return o.RED_INTEGER;if(s===Xd)return o.RG;if(s===Wd)return o.RG_INTEGER;if(s===qd)return o.RGBA_INTEGER;if(s===Bc||s===Fc||s===Ic||s===Hc)if(h===Ft)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Bc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Fc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ic)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Hc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Bc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Fc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ic)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Hc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===rd||s===od||s===ld||s===cd)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===rd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===od)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ld)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===cd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===ud||s===fd||s===hd)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===ud||s===fd)return h===Ft?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===hd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===dd||s===pd||s===md||s===xd||s===gd||s===_d||s===vd||s===Sd||s===yd||s===Md||s===bd||s===Ed||s===Td||s===Ad)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===dd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===pd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===md)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===xd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===gd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===_d)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===vd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Sd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===yd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Md)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===bd)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ed)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Td)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ad)return h===Ft?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Rd||s===Cd||s===wd)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Rd)return h===Ft?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Cd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===wd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Dd||s===Ud||s===Nd||s===Ld)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===Dd)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Ud)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Nd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ld)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ko?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const iT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aT=`
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

}`;class sT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new D_(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new Nn({vertexShader:iT,fragmentShader:aT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Ii(new $c(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rT extends Lr{constructor(e,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,g=null,x=null,_=null,M=null,b=null;const T=typeof XRWebGLBinding<"u",y=new sT,v={},N=i.getContextAttributes();let D=null,P=null;const V=[],L=[],B=new lt;let ne=null;const w=new ai;w.viewport=new kt;const C=new ai;C.viewport=new kt;const k=[w,C],ie=new bM;let ce=null,xe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let ue=V[ae];return ue===void 0&&(ue=new Bh,V[ae]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(ae){let ue=V[ae];return ue===void 0&&(ue=new Bh,V[ae]=ue),ue.getGripSpace()},this.getHand=function(ae){let ue=V[ae];return ue===void 0&&(ue=new Bh,V[ae]=ue),ue.getHandSpace()};function he(ae){const ue=L.indexOf(ae.inputSource);if(ue===-1)return;const we=V[ue];we!==void 0&&(we.update(ae.inputSource,ae.frame,p||h),we.dispatchEvent({type:ae.type,data:ae.inputSource}))}function F(){l.removeEventListener("select",he),l.removeEventListener("selectstart",he),l.removeEventListener("selectend",he),l.removeEventListener("squeeze",he),l.removeEventListener("squeezestart",he),l.removeEventListener("squeezeend",he),l.removeEventListener("end",F),l.removeEventListener("inputsourceschange",j);for(let ae=0;ae<V.length;ae++){const ue=L[ae];ue!==null&&(L[ae]=null,V[ae].disconnect(ue))}ce=null,xe=null,y.reset();for(const ae in v)delete v[ae];e.setRenderTarget(D),M=null,_=null,x=null,l=null,P=null,Pe.stop(),s.isPresenting=!1,e.setPixelRatio(ne),e.setSize(B.width,B.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){c=ae,s.isPresenting===!0&&ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){d=ae,s.isPresenting===!0&&ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(ae){p=ae},this.getBaseLayer=function(){return _!==null?_:M},this.getBinding=function(){return x===null&&T&&(x=new XRWebGLBinding(l,i)),x},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(ae){if(l=ae,l!==null){if(D=e.getRenderTarget(),l.addEventListener("select",he),l.addEventListener("selectstart",he),l.addEventListener("selectend",he),l.addEventListener("squeeze",he),l.addEventListener("squeezestart",he),l.addEventListener("squeezeend",he),l.addEventListener("end",F),l.addEventListener("inputsourceschange",j),N.xrCompatible!==!0&&await i.makeXRCompatible(),ne=e.getPixelRatio(),e.getSize(B),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,He=null,Xe=null;N.depth&&(Xe=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,we=N.stencil?Wo:Xo,He=N.stencil?ko:ws);const ut={colorFormat:i.RGBA8,depthFormat:Xe,scaleFactor:c};x=this.getBinding(),_=x.createProjectionLayer(ut),l.updateRenderState({layers:[_]}),e.setPixelRatio(1),e.setSize(_.textureWidth,_.textureHeight,!1),P=new Ri(_.textureWidth,_.textureHeight,{format:Ai,type:Bi,depthTexture:new w_(_.textureWidth,_.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}else{const we={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,we),l.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),P=new Ri(M.framebufferWidth,M.framebufferHeight,{format:Ai,type:Bi,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),Pe.setContext(l),Pe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function j(ae){for(let ue=0;ue<ae.removed.length;ue++){const we=ae.removed[ue],He=L.indexOf(we);He>=0&&(L[He]=null,V[He].disconnect(we))}for(let ue=0;ue<ae.added.length;ue++){const we=ae.added[ue];let He=L.indexOf(we);if(He===-1){for(let ut=0;ut<V.length;ut++)if(ut>=L.length){L.push(we),He=ut;break}else if(L[ut]===null){L[ut]=we,He=ut;break}if(He===-1)break}const Xe=V[He];Xe&&Xe.connect(we)}}const Y=new K,_e=new K;function ve(ae,ue,we){Y.setFromMatrixPosition(ue.matrixWorld),_e.setFromMatrixPosition(we.matrixWorld);const He=Y.distanceTo(_e),Xe=ue.projectionMatrix.elements,ut=we.projectionMatrix.elements,tn=Xe[14]/(Xe[10]-1),pt=Xe[14]/(Xe[10]+1),Ct=(Xe[9]+1)/Xe[5],I=(Xe[9]-1)/Xe[5],mt=(Xe[8]-1)/Xe[0],gt=(ut[8]+1)/ut[0],Pt=tn*mt,Ge=tn*gt,Xt=He/(-mt+gt),je=Xt*-mt;if(ue.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(je),ae.translateZ(Xt),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),Xe[10]===-1)ae.projectionMatrix.copy(ue.projectionMatrix),ae.projectionMatrixInverse.copy(ue.projectionMatrixInverse);else{const at=tn+Xt,U=pt+Xt,E=Pt-je,J=Ge+(He-je),pe=Ct*pt/U*at,Se=I*pt/U*at;ae.projectionMatrix.makePerspective(E,J,pe,Se,at,U),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function O(ae,ue){ue===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(ue.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(l===null)return;let ue=ae.near,we=ae.far;y.texture!==null&&(y.depthNear>0&&(ue=y.depthNear),y.depthFar>0&&(we=y.depthFar)),ie.near=C.near=w.near=ue,ie.far=C.far=w.far=we,(ce!==ie.near||xe!==ie.far)&&(l.updateRenderState({depthNear:ie.near,depthFar:ie.far}),ce=ie.near,xe=ie.far),ie.layers.mask=ae.layers.mask|6,w.layers.mask=ie.layers.mask&3,C.layers.mask=ie.layers.mask&5;const He=ae.parent,Xe=ie.cameras;O(ie,He);for(let ut=0;ut<Xe.length;ut++)O(Xe[ut],He);Xe.length===2?ve(ie,w,C):ie.projectionMatrix.copy(w.projectionMatrix),re(ae,ie,He)};function re(ae,ue,we){we===null?ae.matrix.copy(ue.matrixWorld):(ae.matrix.copy(we.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(ue.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(ue.projectionMatrix),ae.projectionMatrixInverse.copy(ue.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Od*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return ie},this.getFoveation=function(){if(!(_===null&&M===null))return m},this.setFoveation=function(ae){m=ae,_!==null&&(_.fixedFoveation=ae),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=ae)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(ie)},this.getCameraTexture=function(ae){return v[ae]};let Me=null;function Te(ae,ue){if(g=ue.getViewerPose(p||h),b=ue,g!==null){const we=g.views;M!==null&&(e.setRenderTargetFramebuffer(P,M.framebuffer),e.setRenderTarget(P));let He=!1;we.length!==ie.cameras.length&&(ie.cameras.length=0,He=!0);for(let pt=0;pt<we.length;pt++){const Ct=we[pt];let I=null;if(M!==null)I=M.getViewport(Ct);else{const gt=x.getViewSubImage(_,Ct);I=gt.viewport,pt===0&&(e.setRenderTargetTextures(P,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(P))}let mt=k[pt];mt===void 0&&(mt=new ai,mt.layers.enable(pt),mt.viewport=new kt,k[pt]=mt),mt.matrix.fromArray(Ct.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(Ct.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(I.x,I.y,I.width,I.height),pt===0&&(ie.matrix.copy(mt.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale)),He===!0&&ie.cameras.push(mt)}const Xe=l.enabledFeatures;if(Xe&&Xe.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&T){x=s.getBinding();const pt=x.getDepthInformation(we[0]);pt&&pt.isValid&&pt.texture&&y.init(pt,l.renderState)}if(Xe&&Xe.includes("camera-access")&&T){e.state.unbindTexture(),x=s.getBinding();for(let pt=0;pt<we.length;pt++){const Ct=we[pt].camera;if(Ct){let I=v[Ct];I||(I=new D_,v[Ct]=I);const mt=x.getCameraImage(Ct);I.sourceTexture=mt}}}}for(let we=0;we<V.length;we++){const He=L[we],Xe=V[we];He!==null&&Xe!==void 0&&Xe.update(He,ue,p||h)}Me&&Me(ae,ue),ue.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ue}),b=null}const Pe=new L_;Pe.setAnimationLoop(Te),this.setAnimationLoop=function(ae){Me=ae},this.dispose=function(){}}}const Es=new Fi,oT=new Jt;function lT(o,e){function i(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function s(y,v){v.color.getRGB(y.fogColor.value,E_(o)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function l(y,v,N,D,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(y,v):v.isMeshToonMaterial?(c(y,v),x(y,v)):v.isMeshPhongMaterial?(c(y,v),g(y,v)):v.isMeshStandardMaterial?(c(y,v),_(y,v),v.isMeshPhysicalMaterial&&M(y,v,P)):v.isMeshMatcapMaterial?(c(y,v),b(y,v)):v.isMeshDepthMaterial?c(y,v):v.isMeshDistanceMaterial?(c(y,v),T(y,v)):v.isMeshNormalMaterial?c(y,v):v.isLineBasicMaterial?(h(y,v),v.isLineDashedMaterial&&d(y,v)):v.isPointsMaterial?m(y,v,N,D):v.isSpriteMaterial?p(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,i(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,i(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===Xn&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,i(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===Xn&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,i(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,i(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const N=e.get(v),D=N.envMap,P=N.envMapRotation;D&&(y.envMap.value=D,Es.copy(P),Es.x*=-1,Es.y*=-1,Es.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(Es.y*=-1,Es.z*=-1),y.envMapRotation.value.setFromMatrix4(oT.makeRotationFromEuler(Es)),y.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap&&(y.lightMap.value=v.lightMap,y.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,y.lightMapTransform)),v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,y.aoMapTransform))}function h(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,i(v.map,y.mapTransform))}function d(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function m(y,v,N,D){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*N,y.scale.value=D*.5,v.map&&(y.map.value=v.map,i(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function p(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,i(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function g(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function x(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function _(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function M(y,v,N){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Xn&&y.clearcoatNormalScale.value.negate())),v.dispersion>0&&(y.dispersion.value=v.dispersion),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=N.texture,y.transmissionSamplerSize.value.set(N.width,N.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,y.specularIntensityMapTransform))}function b(y,v){v.matcap&&(y.matcap.value=v.matcap)}function T(y,v){const N=e.get(v).light;y.referencePosition.value.setFromMatrixPosition(N.matrixWorld),y.nearDistance.value=N.shadow.camera.near,y.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function cT(o,e,i,s){let l={},c={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(N,D){const P=D.program;s.uniformBlockBinding(N,P)}function p(N,D){let P=l[N.id];P===void 0&&(b(N),P=g(N),l[N.id]=P,N.addEventListener("dispose",y));const V=D.program;s.updateUBOMapping(N,V);const L=e.render.frame;c[N.id]!==L&&(_(N),c[N.id]=L)}function g(N){const D=x();N.__bindingPointIndex=D;const P=o.createBuffer(),V=N.__size,L=N.usage;return o.bindBuffer(o.UNIFORM_BUFFER,P),o.bufferData(o.UNIFORM_BUFFER,V,L),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,D,P),P}function x(){for(let N=0;N<d;N++)if(h.indexOf(N)===-1)return h.push(N),N;return sn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(N){const D=l[N.id],P=N.uniforms,V=N.__cache;o.bindBuffer(o.UNIFORM_BUFFER,D);for(let L=0,B=P.length;L<B;L++){const ne=Array.isArray(P[L])?P[L]:[P[L]];for(let w=0,C=ne.length;w<C;w++){const k=ne[w];if(M(k,L,w,V)===!0){const ie=k.__offset,ce=Array.isArray(k.value)?k.value:[k.value];let xe=0;for(let he=0;he<ce.length;he++){const F=ce[he],j=T(F);typeof F=="number"||typeof F=="boolean"?(k.__data[0]=F,o.bufferSubData(o.UNIFORM_BUFFER,ie+xe,k.__data)):F.isMatrix3?(k.__data[0]=F.elements[0],k.__data[1]=F.elements[1],k.__data[2]=F.elements[2],k.__data[3]=0,k.__data[4]=F.elements[3],k.__data[5]=F.elements[4],k.__data[6]=F.elements[5],k.__data[7]=0,k.__data[8]=F.elements[6],k.__data[9]=F.elements[7],k.__data[10]=F.elements[8],k.__data[11]=0):(F.toArray(k.__data,xe),xe+=j.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,ie,k.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(N,D,P,V){const L=N.value,B=D+"_"+P;if(V[B]===void 0)return typeof L=="number"||typeof L=="boolean"?V[B]=L:V[B]=L.clone(),!0;{const ne=V[B];if(typeof L=="number"||typeof L=="boolean"){if(ne!==L)return V[B]=L,!0}else if(ne.equals(L)===!1)return ne.copy(L),!0}return!1}function b(N){const D=N.uniforms;let P=0;const V=16;for(let B=0,ne=D.length;B<ne;B++){const w=Array.isArray(D[B])?D[B]:[D[B]];for(let C=0,k=w.length;C<k;C++){const ie=w[C],ce=Array.isArray(ie.value)?ie.value:[ie.value];for(let xe=0,he=ce.length;xe<he;xe++){const F=ce[xe],j=T(F),Y=P%V,_e=Y%j.boundary,ve=Y+_e;P+=_e,ve!==0&&V-ve<j.storage&&(P+=V-ve),ie.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),ie.__offset=P,P+=j.storage}}}const L=P%V;return L>0&&(P+=V-L),N.__size=P,N.__cache={},this}function T(N){const D={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(D.boundary=4,D.storage=4):N.isVector2?(D.boundary=8,D.storage=8):N.isVector3||N.isColor?(D.boundary=16,D.storage=12):N.isVector4?(D.boundary=16,D.storage=16):N.isMatrix3?(D.boundary=48,D.storage=48):N.isMatrix4?(D.boundary=64,D.storage=64):N.isTexture?ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ot("WebGLRenderer: Unsupported uniform value type.",N),D}function y(N){const D=N.target;D.removeEventListener("dispose",y);const P=h.indexOf(D.__bindingPointIndex);h.splice(P,1),o.deleteBuffer(l[D.id]),delete l[D.id],delete c[D.id]}function v(){for(const N in l)o.deleteBuffer(l[N]);h=[],l={},c={}}return{bind:m,update:p,dispose:v}}const uT=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let fa=null;function fT(){return fa===null&&(fa=new oM(uT,32,32,Xd,zi),fa.minFilter=gi,fa.magFilter=gi,fa.wrapS=ma,fa.wrapT=ma,fa.generateMipmaps=!1,fa.needsUpdate=!0),fa}class hT{constructor(e={}){const{canvas:i=Oy(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:_=!1}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const b=new Set([qd,Wd,kd]),T=new Set([Bi,ws,Vo,ko,Gd,Vd]),y=new Uint32Array(4),v=new Int32Array(4);let N=null,D=null;const P=[],V=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$a,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let B=!1;this._outputColorSpace=mi;let ne=0,w=0,C=null,k=-1,ie=null;const ce=new kt,xe=new kt;let he=null;const F=new st(0);let j=0,Y=i.width,_e=i.height,ve=1,O=null,re=null;const Me=new kt(0,0,Y,_e),Te=new kt(0,0,Y,_e);let Pe=!1;const ae=new Qd;let ue=!1,we=!1;const He=new Jt,Xe=new K,ut=new kt,tn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Ct(){return C===null?ve:1}let I=s;function mt(R,X){return i.getContext(R,X)}try{const R={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Fd}`),i.addEventListener("webglcontextlost",be,!1),i.addEventListener("webglcontextrestored",ge,!1),i.addEventListener("webglcontextcreationerror",Be,!1),I===null){const X="webgl2";if(I=mt(X,R),I===null)throw mt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw R("WebGLRenderer: "+R.message),R}let gt,Pt,Ge,Xt,je,at,U,E,J,pe,Se,le,qe,Ne,Qe,We,ye,Ee,Ye,Ve,Oe,nt,H,De;function Re(){gt=new S3(I),gt.init(),nt=new nT(I,gt),Pt=new f3(I,gt,e,nt),Ge=new eT(I,gt),Pt.reversedDepthBuffer&&_&&Ge.buffers.depth.setReversed(!0),Xt=new b3(I),je=new GE,at=new tT(I,gt,Ge,je,Pt,nt,Xt),U=new d3(L),E=new v3(L),J=new RM(I),H=new c3(I,J),pe=new y3(I,J,Xt,H),Se=new T3(I,pe,J,Xt),Ye=new E3(I,Pt,at),We=new h3(je),le=new HE(L,U,E,gt,Pt,H,We),qe=new lT(L,je),Ne=new kE,Qe=new ZE(gt),Ee=new l3(L,U,E,Ge,Se,M,m),ye=new JE(L,Se,Pt),De=new cT(I,Xt,Pt,Ge),Ve=new u3(I,gt,Xt),Oe=new M3(I,gt,Xt),Xt.programs=le.programs,L.capabilities=Pt,L.extensions=gt,L.properties=je,L.renderLists=Ne,L.shadowMap=ye,L.state=Ge,L.info=Xt}Re();const Ce=new rT(L,I);this.xr=Ce,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=gt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=gt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(R){R!==void 0&&(ve=R,this.setSize(Y,_e,!1))},this.getSize=function(R){return R.set(Y,_e)},this.setSize=function(R,X,se=!0){if(Ce.isPresenting){ot("WebGLRenderer: Can't change size while VR device is presenting.");return}Y=R,_e=X,i.width=Math.floor(R*ve),i.height=Math.floor(X*ve),se===!0&&(i.style.width=R+"px",i.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(Y*ve,_e*ve).floor()},this.setDrawingBufferSize=function(R,X,se){Y=R,_e=X,ve=se,i.width=Math.floor(R*se),i.height=Math.floor(X*se),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(ce)},this.getViewport=function(R){return R.copy(Me)},this.setViewport=function(R,X,se,ee){R.isVector4?Me.set(R.x,R.y,R.z,R.w):Me.set(R,X,se,ee),Ge.viewport(ce.copy(Me).multiplyScalar(ve).round())},this.getScissor=function(R){return R.copy(Te)},this.setScissor=function(R,X,se,ee){R.isVector4?Te.set(R.x,R.y,R.z,R.w):Te.set(R,X,se,ee),Ge.scissor(xe.copy(Te).multiplyScalar(ve).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(R){Ge.setScissorTest(Pe=R)},this.setOpaqueSort=function(R){O=R},this.setTransparentSort=function(R){re=R},this.getClearColor=function(R){return R.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(R=!0,X=!0,se=!0){let ee=0;if(R){let q=!1;if(C!==null){const Ae=C.texture.format;q=b.has(Ae)}if(q){const Ae=C.texture.type,Ue=T.has(Ae),ze=Ee.getClearColor(),Fe=Ee.getClearAlpha(),$e=ze.r,tt=ze.g,Ze=ze.b;Ue?(y[0]=$e,y[1]=tt,y[2]=Ze,y[3]=Fe,I.clearBufferuiv(I.COLOR,0,y)):(v[0]=$e,v[1]=tt,v[2]=Ze,v[3]=Fe,I.clearBufferiv(I.COLOR,0,v))}else ee|=I.COLOR_BUFFER_BIT}X&&(ee|=I.DEPTH_BUFFER_BIT),se&&(ee|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",be,!1),i.removeEventListener("webglcontextrestored",ge,!1),i.removeEventListener("webglcontextcreationerror",Be,!1),Ee.dispose(),Ne.dispose(),Qe.dispose(),je.dispose(),U.dispose(),E.dispose(),Se.dispose(),H.dispose(),De.dispose(),le.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",zr),Ce.removeEventListener("sessionend",Br),vi.stop()};function be(R){R.preventDefault(),Qx("WebGLRenderer: Context Lost."),B=!0}function ge(){Qx("WebGLRenderer: Context Restored."),B=!1;const R=Xt.autoReset,X=ye.enabled,se=ye.autoUpdate,ee=ye.needsUpdate,q=ye.type;Re(),Xt.autoReset=R,ye.enabled=X,ye.autoUpdate=se,ye.needsUpdate=ee,ye.type=q}function Be(R){sn("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function it(R){const X=R.target;X.removeEventListener("dispose",it),It(X)}function It(R){wt(R),je.remove(R)}function wt(R){const X=je.get(R).programs;X!==void 0&&(X.forEach(function(se){le.releaseProgram(se)}),R.isShaderMaterial&&le.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,se,ee,q,Ae){X===null&&(X=tn);const Ue=q.isMesh&&q.matrixWorld.determinant()<0,ze=nu(R,X,se,ee,q);Ge.setMaterial(ee,Ue);let Fe=se.index,$e=1;if(ee.wireframe===!0){if(Fe=pe.getWireframeAttribute(se),Fe===void 0)return;$e=2}const tt=se.drawRange,Ze=se.attributes.position;let ft=tt.start*$e,At=(tt.start+tt.count)*$e;Ae!==null&&(ft=Math.max(ft,Ae.start*$e),At=Math.min(At,(Ae.start+Ae.count)*$e)),Fe!==null?(ft=Math.max(ft,0),At=Math.min(At,Fe.count)):Ze!=null&&(ft=Math.max(ft,0),At=Math.min(At,Ze.count));const Dt=At-ft;if(Dt<0||Dt===1/0)return;H.setup(q,ee,ze,se,Fe);let bt,Ot=Ve;if(Fe!==null&&(bt=J.get(Fe),Ot=Oe,Ot.setIndex(bt)),q.isMesh)ee.wireframe===!0?(Ge.setLineWidth(ee.wireframeLinewidth*Ct()),Ot.setMode(I.LINES)):Ot.setMode(I.TRIANGLES);else if(q.isLine){let Je=ee.linewidth;Je===void 0&&(Je=1),Ge.setLineWidth(Je*Ct()),q.isLineSegments?Ot.setMode(I.LINES):q.isLineLoop?Ot.setMode(I.LINE_LOOP):Ot.setMode(I.LINE_STRIP)}else q.isPoints?Ot.setMode(I.POINTS):q.isSprite&&Ot.setMode(I.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)qo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ot.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(gt.get("WEBGL_multi_draw"))Ot.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Je=q._multiDrawStarts,Wt=q._multiDrawCounts,Et=q._multiDrawCount,_n=Fe?J.get(Fe).bytesPerElement:1,Sa=je.get(ee).currentProgram.getUniforms();for(let Yt=0;Yt<Et;Yt++)Sa.setValue(I,"_gl_DrawID",Yt),Ot.render(Je[Yt]/_n,Wt[Yt])}else if(q.isInstancedMesh)Ot.renderInstances(ft,Dt,q.count);else if(se.isInstancedBufferGeometry){const Je=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Wt=Math.min(se.instanceCount,Je);Ot.renderInstances(ft,Dt,Wt)}else Ot.render(ft,Dt)};function Cn(R,X,se){R.transparent===!0&&R.side===da&&R.forceSinglePass===!1?(R.side=Xn,R.needsUpdate=!0,dn(R,X,se),R.side=es,R.needsUpdate=!0,dn(R,X,se),R.side=da):dn(R,X,se)}this.compile=function(R,X,se=null){se===null&&(se=R),D=Qe.get(se),D.init(X),V.push(D),se.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(D.pushLight(q),q.castShadow&&D.pushShadow(q))}),R!==se&&R.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(D.pushLight(q),q.castShadow&&D.pushShadow(q))}),D.setupLights();const ee=new Set;return R.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const Ae=q.material;if(Ae)if(Array.isArray(Ae))for(let Ue=0;Ue<Ae.length;Ue++){const ze=Ae[Ue];Cn(ze,se,q),ee.add(ze)}else Cn(Ae,se,q),ee.add(Ae)}),D=V.pop(),ee},this.compileAsync=function(R,X,se=null){const ee=this.compile(R,X,se);return new Promise(q=>{function Ae(){if(ee.forEach(function(Ue){je.get(Ue).currentProgram.isReady()&&ee.delete(Ue)}),ee.size===0){q(R);return}setTimeout(Ae,10)}gt.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let Yn=null;function Jo(R){Yn&&Yn(R)}function zr(){vi.stop()}function Br(){vi.start()}const vi=new L_;vi.setAnimationLoop(Jo),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(R){Yn=R,Ce.setAnimationLoop(R),R===null?vi.stop():vi.start()},Ce.addEventListener("sessionstart",zr),Ce.addEventListener("sessionend",Br),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){sn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(X),X=Ce.getCamera()),R.isScene===!0&&R.onBeforeRender(L,R,X,C),D=Qe.get(R,V.length),D.init(X),V.push(D),He.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),ae.setFromProjectionMatrix(He,Oi,X.reversedDepth),we=this.localClippingEnabled,ue=We.init(this.clippingPlanes,we),N=Ne.get(R,P.length),N.init(),P.push(N),Ce.enabled===!0&&Ce.isPresenting===!0){const Ae=L.xr.getDepthSensingMesh();Ae!==null&&ts(Ae,X,-1/0,L.sortObjects)}ts(R,X,0,L.sortObjects),N.finish(),L.sortObjects===!0&&N.sort(O,re),pt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,pt&&Ee.addToRenderList(N,R),this.info.render.frame++,ue===!0&&We.beginShadows();const se=D.state.shadowsArray;ye.render(se,R,X),ue===!0&&We.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=N.opaque,q=N.transmissive;if(D.setupLights(),X.isArrayCamera){const Ae=X.cameras;if(q.length>0)for(let Ue=0,ze=Ae.length;Ue<ze;Ue++){const Fe=Ae[Ue];Ir(ee,q,R,Fe)}pt&&Ee.render(R);for(let Ue=0,ze=Ae.length;Ue<ze;Ue++){const Fe=Ae[Ue];Fr(N,R,Fe,Fe.viewport)}}else q.length>0&&Ir(ee,q,R,X),pt&&Ee.render(R),Fr(N,R,X);C!==null&&w===0&&(at.updateMultisampleRenderTarget(C),at.updateRenderTargetMipmap(C)),R.isScene===!0&&R.onAfterRender(L,R,X),H.resetDefaultState(),k=-1,ie=null,V.pop(),V.length>0?(D=V[V.length-1],ue===!0&&We.setGlobalState(L.clippingPlanes,D.state.camera)):D=null,P.pop(),P.length>0?N=P[P.length-1]:N=null};function ts(R,X,se,ee){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)D.pushLight(R),R.castShadow&&D.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ae.intersectsSprite(R)){ee&&ut.setFromMatrixPosition(R.matrixWorld).applyMatrix4(He);const Ue=Se.update(R),ze=R.material;ze.visible&&N.push(R,Ue,ze,se,ut.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ae.intersectsObject(R))){const Ue=Se.update(R),ze=R.material;if(ee&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ut.copy(R.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),ut.copy(Ue.boundingSphere.center)),ut.applyMatrix4(R.matrixWorld).applyMatrix4(He)),Array.isArray(ze)){const Fe=Ue.groups;for(let $e=0,tt=Fe.length;$e<tt;$e++){const Ze=Fe[$e],ft=ze[Ze.materialIndex];ft&&ft.visible&&N.push(R,Ue,ft,se,ut.z,Ze)}}else ze.visible&&N.push(R,Ue,ze,se,ut.z,null)}}const Ae=R.children;for(let Ue=0,ze=Ae.length;Ue<ze;Ue++)ts(Ae[Ue],X,se,ee)}function Fr(R,X,se,ee){const{opaque:q,transmissive:Ae,transparent:Ue}=R;D.setupLightsView(se),ue===!0&&We.setGlobalState(L.clippingPlanes,se),ee&&Ge.viewport(ce.copy(ee)),q.length>0&&jn(q,X,se),Ae.length>0&&jn(Ae,X,se),Ue.length>0&&jn(Ue,X,se),Ge.buffers.depth.setTest(!0),Ge.buffers.depth.setMask(!0),Ge.buffers.color.setMask(!0),Ge.setPolygonOffset(!1)}function Ir(R,X,se,ee){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;D.state.transmissionRenderTarget[ee.id]===void 0&&(D.state.transmissionRenderTarget[ee.id]=new Ri(1,1,{generateMipmaps:!0,type:gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float")?zi:Bi,minFilter:Cs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace}));const Ae=D.state.transmissionRenderTarget[ee.id],Ue=ee.viewport||ce;Ae.setSize(Ue.z*L.transmissionResolutionScale,Ue.w*L.transmissionResolutionScale);const ze=L.getRenderTarget(),Fe=L.getActiveCubeFace(),$e=L.getActiveMipmapLevel();L.setRenderTarget(Ae),L.getClearColor(F),j=L.getClearAlpha(),j<1&&L.setClearColor(16777215,.5),L.clear(),pt&&Ee.render(se);const tt=L.toneMapping;L.toneMapping=$a;const Ze=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),D.setupLightsView(ee),ue===!0&&We.setGlobalState(L.clippingPlanes,ee),jn(R,se,ee),at.updateMultisampleRenderTarget(Ae),at.updateRenderTargetMipmap(Ae),gt.has("WEBGL_multisampled_render_to_texture")===!1){let ft=!1;for(let At=0,Dt=X.length;At<Dt;At++){const bt=X[At],{object:Ot,geometry:Je,material:Wt,group:Et}=bt;if(Wt.side===da&&Ot.layers.test(ee.layers)){const _n=Wt.side;Wt.side=Xn,Wt.needsUpdate=!0,rn(Ot,se,ee,Je,Wt,Et),Wt.side=_n,Wt.needsUpdate=!0,ft=!0}}ft===!0&&(at.updateMultisampleRenderTarget(Ae),at.updateRenderTargetMipmap(Ae))}L.setRenderTarget(ze,Fe,$e),L.setClearColor(F,j),Ze!==void 0&&(ee.viewport=Ze),L.toneMapping=tt}function jn(R,X,se){const ee=X.isScene===!0?X.overrideMaterial:null;for(let q=0,Ae=R.length;q<Ae;q++){const Ue=R[q],{object:ze,geometry:Fe,group:$e}=Ue;let tt=Ue.material;tt.allowOverride===!0&&ee!==null&&(tt=ee),ze.layers.test(se.layers)&&rn(ze,X,se,Fe,tt,$e)}}function rn(R,X,se,ee,q,Ae){R.onBeforeRender(L,X,se,ee,q,Ae),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),q.onBeforeRender(L,X,se,ee,R,Ae),q.transparent===!0&&q.side===da&&q.forceSinglePass===!1?(q.side=Xn,q.needsUpdate=!0,L.renderBufferDirect(se,X,ee,q,R,Ae),q.side=es,q.needsUpdate=!0,L.renderBufferDirect(se,X,ee,q,R,Ae),q.side=da):L.renderBufferDirect(se,X,ee,q,R,Ae),R.onAfterRender(L,X,se,ee,q,Ae)}function dn(R,X,se){X.isScene!==!0&&(X=tn);const ee=je.get(R),q=D.state.lights,Ae=D.state.shadowsArray,Ue=q.state.version,ze=le.getParameters(R,q.state,Ae,X,se),Fe=le.getProgramCacheKey(ze);let $e=ee.programs;ee.environment=R.isMeshStandardMaterial?X.environment:null,ee.fog=X.fog,ee.envMap=(R.isMeshStandardMaterial?E:U).get(R.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&R.envMap===null?X.environmentRotation:R.envMapRotation,$e===void 0&&(R.addEventListener("dispose",it),$e=new Map,ee.programs=$e);let tt=$e.get(Fe);if(tt!==void 0){if(ee.currentProgram===tt&&ee.lightsStateVersion===Ue)return Ns(R,ze),tt}else ze.uniforms=le.getUniforms(R),R.onBeforeCompile(ze,L),tt=le.acquireProgram(ze,Fe),$e.set(Fe,tt),ee.uniforms=ze.uniforms;const Ze=ee.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ze.clippingPlanes=We.uniform),Ns(R,ze),ee.needsLights=$o(R),ee.lightsStateVersion=Ue,ee.needsLights&&(Ze.ambientLightColor.value=q.state.ambient,Ze.lightProbe.value=q.state.probe,Ze.directionalLights.value=q.state.directional,Ze.directionalLightShadows.value=q.state.directionalShadow,Ze.spotLights.value=q.state.spot,Ze.spotLightShadows.value=q.state.spotShadow,Ze.rectAreaLights.value=q.state.rectArea,Ze.ltc_1.value=q.state.rectAreaLTC1,Ze.ltc_2.value=q.state.rectAreaLTC2,Ze.pointLights.value=q.state.point,Ze.pointLightShadows.value=q.state.pointShadow,Ze.hemisphereLights.value=q.state.hemi,Ze.directionalShadowMap.value=q.state.directionalShadowMap,Ze.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ze.spotShadowMap.value=q.state.spotShadowMap,Ze.spotLightMatrix.value=q.state.spotLightMatrix,Ze.spotLightMap.value=q.state.spotLightMap,Ze.pointShadowMap.value=q.state.pointShadowMap,Ze.pointShadowMatrix.value=q.state.pointShadowMatrix),ee.currentProgram=tt,ee.uniformsList=null,tt}function Hi(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=Vc.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function Ns(R,X){const se=je.get(R);se.outputColorSpace=X.outputColorSpace,se.batching=X.batching,se.batchingColor=X.batchingColor,se.instancing=X.instancing,se.instancingColor=X.instancingColor,se.instancingMorph=X.instancingMorph,se.skinning=X.skinning,se.morphTargets=X.morphTargets,se.morphNormals=X.morphNormals,se.morphColors=X.morphColors,se.morphTargetsCount=X.morphTargetsCount,se.numClippingPlanes=X.numClippingPlanes,se.numIntersection=X.numClipIntersection,se.vertexAlphas=X.vertexAlphas,se.vertexTangents=X.vertexTangents,se.toneMapping=X.toneMapping}function nu(R,X,se,ee,q){X.isScene!==!0&&(X=tn),at.resetTextureUnits();const Ae=X.fog,Ue=ee.isMeshStandardMaterial?X.environment:null,ze=C===null?L.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Dr,Fe=(ee.isMeshStandardMaterial?E:U).get(ee.envMap||Ue),$e=ee.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,tt=!!se.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Ze=!!se.morphAttributes.position,ft=!!se.morphAttributes.normal,At=!!se.morphAttributes.color;let Dt=$a;ee.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Dt=L.toneMapping);const bt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Ot=bt!==void 0?bt.length:0,Je=je.get(ee),Wt=D.state.lights;if(ue===!0&&(we===!0||R!==ie)){const Sn=R===ie&&ee.id===k;We.setState(ee,R,Sn)}let Et=!1;ee.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==Wt.state.version||Je.outputColorSpace!==ze||q.isBatchedMesh&&Je.batching===!1||!q.isBatchedMesh&&Je.batching===!0||q.isBatchedMesh&&Je.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Je.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Je.instancing===!1||!q.isInstancedMesh&&Je.instancing===!0||q.isSkinnedMesh&&Je.skinning===!1||!q.isSkinnedMesh&&Je.skinning===!0||q.isInstancedMesh&&Je.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Je.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Je.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Je.instancingMorph===!1&&q.morphTexture!==null||Je.envMap!==Fe||ee.fog===!0&&Je.fog!==Ae||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==We.numPlanes||Je.numIntersection!==We.numIntersection)||Je.vertexAlphas!==$e||Je.vertexTangents!==tt||Je.morphTargets!==Ze||Je.morphNormals!==ft||Je.morphColors!==At||Je.toneMapping!==Dt||Je.morphTargetsCount!==Ot)&&(Et=!0):(Et=!0,Je.__version=ee.version);let _n=Je.currentProgram;Et===!0&&(_n=dn(ee,X,q));let Sa=!1,Yt=!1,Gi=!1;const jt=_n.getUniforms(),vn=Je.uniforms;if(Ge.useProgram(_n.program)&&(Sa=!0,Yt=!0,Gi=!0),ee.id!==k&&(k=ee.id,Yt=!0),Sa||ie!==R){Ge.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),jt.setValue(I,"projectionMatrix",R.projectionMatrix),jt.setValue(I,"viewMatrix",R.matrixWorldInverse);const bn=jt.map.cameraPosition;bn!==void 0&&bn.setValue(I,Xe.setFromMatrixPosition(R.matrixWorld)),Pt.logarithmicDepthBuffer&&jt.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&jt.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),ie!==R&&(ie=R,Yt=!0,Gi=!0)}if(q.isSkinnedMesh){jt.setOptional(I,q,"bindMatrix"),jt.setOptional(I,q,"bindMatrixInverse");const Sn=q.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),jt.setValue(I,"boneTexture",Sn.boneTexture,at))}q.isBatchedMesh&&(jt.setOptional(I,q,"batchingTexture"),jt.setValue(I,"batchingTexture",q._matricesTexture,at),jt.setOptional(I,q,"batchingIdTexture"),jt.setValue(I,"batchingIdTexture",q._indirectTexture,at),jt.setOptional(I,q,"batchingColorTexture"),q._colorsTexture!==null&&jt.setValue(I,"batchingColorTexture",q._colorsTexture,at));const pn=se.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&Ye.update(q,se,_n),(Yt||Je.receiveShadow!==q.receiveShadow)&&(Je.receiveShadow=q.receiveShadow,jt.setValue(I,"receiveShadow",q.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(vn.envMap.value=Fe,vn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&X.environment!==null&&(vn.envMapIntensity.value=X.environmentIntensity),vn.dfgLUT!==void 0&&(vn.dfgLUT.value=fT()),Yt&&(jt.setValue(I,"toneMappingExposure",L.toneMappingExposure),Je.needsLights&&iu(vn,Gi),Ae&&ee.fog===!0&&qe.refreshFogUniforms(vn,Ae),qe.refreshMaterialUniforms(vn,ee,ve,_e,D.state.transmissionRenderTarget[R.id]),Vc.upload(I,Hi(Je),vn,at)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Vc.upload(I,Hi(Je),vn,at),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&jt.setValue(I,"center",q.center),jt.setValue(I,"modelViewMatrix",q.modelViewMatrix),jt.setValue(I,"normalMatrix",q.normalMatrix),jt.setValue(I,"modelMatrix",q.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const Sn=ee.uniformsGroups;for(let bn=0,Ci=Sn.length;bn<Ci;bn++){const Vi=Sn[bn];De.update(Vi,_n),De.bind(Vi,_n)}}return _n}function iu(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function $o(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return ne},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(R,X,se){const ee=je.get(R);ee.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),je.get(R.texture).__webglTexture=X,je.get(R.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:se,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,X){const se=je.get(R);se.__webglFramebuffer=X,se.__useDefaultFramebuffer=X===void 0};const ns=I.createFramebuffer();this.setRenderTarget=function(R,X=0,se=0){C=R,ne=X,w=se;let ee=!0,q=null,Ae=!1,Ue=!1;if(R){const Fe=je.get(R);if(Fe.__useDefaultFramebuffer!==void 0)Ge.bindFramebuffer(I.FRAMEBUFFER,null),ee=!1;else if(Fe.__webglFramebuffer===void 0)at.setupRenderTarget(R);else if(Fe.__hasExternalTextures)at.rebindTextures(R,je.get(R.texture).__webglTexture,je.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ze=R.depthTexture;if(Fe.__boundDepthTexture!==Ze){if(Ze!==null&&je.has(Ze)&&(R.width!==Ze.image.width||R.height!==Ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");at.setupDepthRenderbuffer(R)}}const $e=R.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(Ue=!0);const tt=je.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(tt[X])?q=tt[X][se]:q=tt[X],Ae=!0):R.samples>0&&at.useMultisampledRTT(R)===!1?q=je.get(R).__webglMultisampledFramebuffer:Array.isArray(tt)?q=tt[se]:q=tt,ce.copy(R.viewport),xe.copy(R.scissor),he=R.scissorTest}else ce.copy(Me).multiplyScalar(ve).floor(),xe.copy(Te).multiplyScalar(ve).floor(),he=Pe;if(se!==0&&(q=ns),Ge.bindFramebuffer(I.FRAMEBUFFER,q)&&ee&&Ge.drawBuffers(R,q),Ge.viewport(ce),Ge.scissor(xe),Ge.setScissorTest(he),Ae){const Fe=je.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+X,Fe.__webglTexture,se)}else if(Ue){const Fe=X;for(let $e=0;$e<R.textures.length;$e++){const tt=je.get(R.textures[$e]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+$e,tt.__webglTexture,se,Fe)}}else if(R!==null&&se!==0){const Fe=je.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Fe.__webglTexture,se)}k=-1},this.readRenderTargetPixels=function(R,X,se,ee,q,Ae,Ue,ze=0){if(!(R&&R.isWebGLRenderTarget)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=je.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(Fe=Fe[Ue]),Fe){Ge.bindFramebuffer(I.FRAMEBUFFER,Fe);try{const $e=R.textures[ze],tt=$e.format,Ze=$e.type;if(!Pt.textureFormatReadable(tt)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pt.textureTypeReadable(Ze)){sn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-ee&&se>=0&&se<=R.height-q&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ze),I.readPixels(X,se,ee,q,nt.convert(tt),nt.convert(Ze),Ae))}finally{const $e=C!==null?je.get(C).__webglFramebuffer:null;Ge.bindFramebuffer(I.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(R,X,se,ee,q,Ae,Ue,ze=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=je.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(Fe=Fe[Ue]),Fe)if(X>=0&&X<=R.width-ee&&se>=0&&se<=R.height-q){Ge.bindFramebuffer(I.FRAMEBUFFER,Fe);const $e=R.textures[ze],tt=$e.format,Ze=$e.type;if(!Pt.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pt.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ft=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ft),I.bufferData(I.PIXEL_PACK_BUFFER,Ae.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ze),I.readPixels(X,se,ee,q,nt.convert(tt),nt.convert(Ze),0);const At=C!==null?je.get(C).__webglFramebuffer:null;Ge.bindFramebuffer(I.FRAMEBUFFER,At);const Dt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Py(I,Dt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ft),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Ae),I.deleteBuffer(ft),I.deleteSync(Dt),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,X=null,se=0){const ee=Math.pow(2,-se),q=Math.floor(R.image.width*ee),Ae=Math.floor(R.image.height*ee),Ue=X!==null?X.x:0,ze=X!==null?X.y:0;at.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,se,0,0,Ue,ze,q,Ae),Ge.unbindTexture()};const Hr=I.createFramebuffer(),va=I.createFramebuffer();this.copyTextureToTexture=function(R,X,se=null,ee=null,q=0,Ae=null){Ae===null&&(q!==0?(qo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Ae=q,q=0):Ae=0);let Ue,ze,Fe,$e,tt,Ze,ft,At,Dt;const bt=R.isCompressedTexture?R.mipmaps[Ae]:R.image;if(se!==null)Ue=se.max.x-se.min.x,ze=se.max.y-se.min.y,Fe=se.isBox3?se.max.z-se.min.z:1,$e=se.min.x,tt=se.min.y,Ze=se.isBox3?se.min.z:0;else{const pn=Math.pow(2,-q);Ue=Math.floor(bt.width*pn),ze=Math.floor(bt.height*pn),R.isDataArrayTexture?Fe=bt.depth:R.isData3DTexture?Fe=Math.floor(bt.depth*pn):Fe=1,$e=0,tt=0,Ze=0}ee!==null?(ft=ee.x,At=ee.y,Dt=ee.z):(ft=0,At=0,Dt=0);const Ot=nt.convert(X.format),Je=nt.convert(X.type);let Wt;X.isData3DTexture?(at.setTexture3D(X,0),Wt=I.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(at.setTexture2DArray(X,0),Wt=I.TEXTURE_2D_ARRAY):(at.setTexture2D(X,0),Wt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,X.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,X.unpackAlignment);const Et=I.getParameter(I.UNPACK_ROW_LENGTH),_n=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Sa=I.getParameter(I.UNPACK_SKIP_PIXELS),Yt=I.getParameter(I.UNPACK_SKIP_ROWS),Gi=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,bt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,bt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,$e),I.pixelStorei(I.UNPACK_SKIP_ROWS,tt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ze);const jt=R.isDataArrayTexture||R.isData3DTexture,vn=X.isDataArrayTexture||X.isData3DTexture;if(R.isDepthTexture){const pn=je.get(R),Sn=je.get(X),bn=je.get(pn.__renderTarget),Ci=je.get(Sn.__renderTarget);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,bn.__webglFramebuffer),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let Vi=0;Vi<Fe;Vi++)jt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,je.get(R).__webglTexture,q,Ze+Vi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,je.get(X).__webglTexture,Ae,Dt+Vi)),I.blitFramebuffer($e,tt,Ue,ze,ft,At,Ue,ze,I.DEPTH_BUFFER_BIT,I.NEAREST);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(q!==0||R.isRenderTargetTexture||je.has(R)){const pn=je.get(R),Sn=je.get(X);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,Hr),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,va);for(let bn=0;bn<Fe;bn++)jt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,pn.__webglTexture,q,Ze+bn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,pn.__webglTexture,q),vn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Sn.__webglTexture,Ae,Dt+bn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Sn.__webglTexture,Ae),q!==0?I.blitFramebuffer($e,tt,Ue,ze,ft,At,Ue,ze,I.COLOR_BUFFER_BIT,I.NEAREST):vn?I.copyTexSubImage3D(Wt,Ae,ft,At,Dt+bn,$e,tt,Ue,ze):I.copyTexSubImage2D(Wt,Ae,ft,At,$e,tt,Ue,ze);Ge.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else vn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(Wt,Ae,ft,At,Dt,Ue,ze,Fe,Ot,Je,bt.data):X.isCompressedArrayTexture?I.compressedTexSubImage3D(Wt,Ae,ft,At,Dt,Ue,ze,Fe,Ot,bt.data):I.texSubImage3D(Wt,Ae,ft,At,Dt,Ue,ze,Fe,Ot,Je,bt):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Ae,ft,At,Ue,ze,Ot,Je,bt.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Ae,ft,At,bt.width,bt.height,Ot,bt.data):I.texSubImage2D(I.TEXTURE_2D,Ae,ft,At,Ue,ze,Ot,Je,bt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Et),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_n),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Sa),I.pixelStorei(I.UNPACK_SKIP_ROWS,Yt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Gi),Ae===0&&X.generateMipmaps&&I.generateMipmap(Wt),Ge.unbindTexture()},this.initRenderTarget=function(R){je.get(R).__webglFramebuffer===void 0&&at.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?at.setTextureCube(R,0):R.isData3DTexture?at.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?at.setTexture2DArray(R,0):at.setTexture2D(R,0),Ge.unbindTexture()},this.resetState=function(){ne=0,w=0,C=null,Ge.reset(),H.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Rt._getUnpackColorSpace()}}const kc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Pr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const dT=new N_(-1,1,1,-1,0,1);class pT extends qn{constructor(){super(),this.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Wn([0,2,0,0,2,0],2))}}const mT=new pT;class $d{constructor(e){this._mesh=new Ii(mT,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,dT)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class xT extends Pr{constructor(e,i="tDiffuse"){super(),this.textureID=i,this.uniforms=null,this.material=null,e instanceof Nn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Yo.clone(e.uniforms),this.material=new Nn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new $d(this.material)}render(e,i,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class jg extends Pr{constructor(e,i){super(),this.scene=e,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,i,s){const l=e.getContext(),c=e.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let h,d;this.inverse?(h=0,d=1):(h=1,d=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,h,4294967295),c.buffers.stencil.setClear(d),c.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class gT extends Pr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class _T{constructor(e,i){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),i===void 0){const s=e.getSize(new lt);this._width=s.width,this._height=s.height,i=new Ri(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:zi}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new xT(kc),this.copyPass.material.blending=Pi,this.clock=new EM}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,i){this.passes.splice(i,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const i=this.passes.indexOf(e);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(e){for(let i=e+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const i=this.renderer.getRenderTarget();let s=!1;for(let l=0,c=this.passes.length;l<c;l++){const h=this.passes[l];if(h.enabled!==!1){if(h.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),h.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),h.needsSwap){if(s){const d=this.renderer.getContext(),m=this.renderer.state.buffers.stencil;m.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),m.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}jg!==void 0&&(h instanceof jg?s=!0:h instanceof gT&&(s=!1))}}this.renderer.setRenderTarget(i)}reset(e){if(e===void 0){const i=this.renderer.getSize(new lt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,i){this._width=e,this._height=i;const s=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(s,l),this.renderTarget2.setSize(s,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(s,l)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class vT extends Pr{constructor(e,i,s=null,l=null,c=null){super(),this.scene=e,this.camera=i,this.overrideMaterial=s,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new st}render(e,i,s){const l=e.autoClear;e.autoClear=!1;let c,h;this.overrideMaterial!==null&&(h=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(c=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=h),e.autoClear=l}}const ST={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new st(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Nr extends Pr{constructor(e,i=1,s,l){super(),this.strength=i,this.radius=s,this.threshold=l,this.resolution=e!==void 0?new lt(e.x,e.y):new lt(256,256),this.clearColor=new st(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let c=Math.round(this.resolution.x/2),h=Math.round(this.resolution.y/2);this.renderTargetBright=new Ri(c,h,{type:zi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let g=0;g<this.nMips;g++){const x=new Ri(c,h,{type:zi});x.texture.name="UnrealBloomPass.h"+g,x.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(x);const _=new Ri(c,h,{type:zi});_.texture.name="UnrealBloomPass.v"+g,_.texture.generateMipmaps=!1,this.renderTargetsVertical.push(_),c=Math.round(c/2),h=Math.round(h/2)}const d=ST;this.highPassUniforms=Yo.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=l,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Nn({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const m=[6,10,14,18,22];c=Math.round(this.resolution.x/2),h=Math.round(this.resolution.y/2);for(let g=0;g<this.nMips;g++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(m[g])),this.separableBlurMaterials[g].uniforms.invSize.value=new lt(1/c,1/h),c=Math.round(c/2),h=Math.round(h/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Yo.clone(kc.uniforms),this.blendMaterial=new Nn({uniforms:this.copyUniforms,vertexShader:kc.vertexShader,fragmentShader:kc.fragmentShader,blending:Xc,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new st,this._oldClearAlpha=1,this._basic=new Zd,this._fsQuad=new $d(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,i){let s=Math.round(e/2),l=Math.round(i/2);this.renderTargetBright.setSize(s,l);for(let c=0;c<this.nMips;c++)this.renderTargetsHorizontal[c].setSize(s,l),this.renderTargetsVertical[c].setSize(s,l),this.separableBlurMaterials[c].uniforms.invSize.value=new lt(1/s,1/l),s=Math.round(s/2),l=Math.round(l/2)}render(e,i,s,l,c){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const h=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),c&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let d=this.renderTargetBright;for(let m=0;m<this.nMips;m++)this._fsQuad.material=this.separableBlurMaterials[m],this.separableBlurMaterials[m].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[m].uniforms.direction.value=Nr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[m]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[m].uniforms.colorTexture.value=this.renderTargetsHorizontal[m].texture,this.separableBlurMaterials[m].uniforms.direction.value=Nr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[m]),e.clear(),this._fsQuad.render(e),d=this.renderTargetsVertical[m];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,c&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=h}_getSeparableBlurMaterial(e){const i=[],s=e/3;for(let l=0;l<e;l++)i.push(.39894*Math.exp(-.5*l*l/(s*s))/s);return new Nn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new lt(.5,.5)},direction:{value:new lt(.5,.5)},gaussianCoefficients:{value:i}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;
					}
					gl_FragColor = vec4( diffuseSum, 1.0 );
				}`})}_getCompositeMaterial(e){return new Nn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Nr.BlurDirectionX=new lt(1,0);Nr.BlurDirectionY=new lt(0,1);const zc={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class yT extends Pr{constructor(){super(),this.uniforms=Yo.clone(zc.uniforms),this.material=new mM({name:zc.name,uniforms:this.uniforms,vertexShader:zc.vertexShader,fragmentShader:zc.fragmentShader}),this._fsQuad=new $d(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,i,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Rt.getTransfer(this._outputColorSpace)===Ft&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===n_?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===i_?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===a_?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Id?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===r_?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===o_?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===s_&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Qc={I:{shape:[[1,1,1,1]],colorOffset:0,pivot:{x:1.5,y:.5}},J:{shape:[[1,0,0],[1,1,1]],colorOffset:.1,pivot:{x:1,y:1}},L:{shape:[[0,0,1],[1,1,1]],colorOffset:.15,pivot:{x:1,y:1}},O:{shape:[[1,1],[1,1]],colorOffset:.2,pivot:{x:.5,y:.5}},S:{shape:[[0,1,1],[1,1,0]],colorOffset:.3,pivot:{x:1,y:1}},T:{shape:[[0,1,0],[1,1,1]],colorOffset:.5,pivot:{x:1,y:1}},Z:{shape:[[1,1,0],[0,1,1]],colorOffset:.8,pivot:{x:1,y:1}}};class MT{constructor(e,i,s=1){this.enableLineClear=!0,this.currentPiece=null,this.gameOver=!1,this.bag=[],this.rows=e,this.cols=i,this.minLinesToClear=s,this.grid=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.fillBag(),this.spawnPiece()}fillBag(){const e=Object.keys(Qc);this.bag=[...e,...e].sort(()=>Math.random()-.5)}getNextPieceType(){return this.bag.length===0&&this.fillBag(),this.bag.pop()}spawnPiece(){const e=this.getNextPieceType(),i=Qc[e],s=Math.floor((this.cols-i.shape[0].length)/2),l=0;if(this.checkCollision(i.shape,s,l)){this.gameOver=!0;return}this.currentPiece={type:e,shape:i.shape,x:s,y:l,colorOffset:i.colorOffset}}reset(e,i,s){e&&(this.rows=e),i&&(this.cols=i),s&&(this.minLinesToClear=s),this.grid=Array.from({length:this.rows},()=>Array(this.cols).fill(null)),this.gameOver=!1,this.fillBag(),this.spawnPiece()}rotateShape(e){const i=e.length,s=e[0].length,l=[];for(let c=0;c<s;c++){const h=[];for(let d=i-1;d>=0;d--)h.push(e[d][c]);l.push(h)}return l}checkCollision(e,i,s){for(let l=0;l<e.length;l++)for(let c=0;c<e[l].length;c++)if(e[l][c]){const h=i+c,d=s+l;if(h<0||h>=this.cols||d>=this.rows||d>=0&&this.grid[d][h])return!0}return!1}lockPiece(){if(!this.currentPiece)return;const{shape:e,x:i,y:s,type:l}=this.currentPiece;for(let c=0;c<e.length;c++)for(let h=0;h<e[c].length;h++)e[c][h]&&s+c>=0&&s+c<this.rows&&(this.grid[s+c][i+h]=l);this.enableLineClear&&this.processLineClears(),this.spawnPiece()}processLineClears(){const e=[];for(let i=0;i<this.rows;i++)this.grid[i].every(s=>s!==null)&&e.push(i);if(e.length>=this.minLinesToClear){const i=this.grid.filter((l,c)=>!e.includes(c)),s=this.rows-i.length;for(let l=0;l<s;l++)i.unshift(Array(this.cols).fill(null));this.grid=i}}getBestMove(){if(!this.currentPiece)return{x:0,rotation:0,dropY:0};let e=-1/0,i={x:this.currentPiece.x,rotation:0,dropY:0},s=this.currentPiece.shape;for(let l=0;l<4;l++){for(let c=-2;c<this.cols+2;c++)if(!this.checkCollision(s,c,0)){let h=0;for(;!this.checkCollision(s,c,h+1);)h++;const d=h,m=this.evaluateGrid(s,c,d);m>e&&(e=m,i={x:c,rotation:l,dropY:d})}s=this.rotateShape(s)}return i}evaluateGrid(e,i,s){const l=this.grid.map(b=>[...b]);for(let b=0;b<e.length;b++)for(let T=0;T<e[b].length;T++)e[b][T]&&s+b<this.rows&&(l[s+b][i+T]="TEMP");let c=0,h=0,d=0,m=0;const p=new Array(this.cols).fill(0);for(let b=0;b<this.cols;b++){let T=!1;for(let y=0;y<this.rows;y++)l[y][b]!==null?T||(p[b]=this.rows-y,T=!0):T&&d++}c=p.reduce((b,T)=>b+T,0);for(let b=0;b<this.cols-1;b++)m+=Math.abs(p[b]-p[b+1]);for(let b=0;b<this.rows;b++)l[b].every(T=>T!==null)&&h++;const g=this.enableLineClear?-.51:-.2,x=this.enableLineClear?.76:1.5;return g*c+x*h+-.6*d+-.3*m}}class bT{constructor(e,i,s){this.cubes=[],this.lastTime=0,this.moveTimer=0,this.currentMove=null,this.isProcessingMove=!1,this.moveStepIndex=0,this.BOARD_CENTER_Y=10,this.onResize=()=>{if(!this.container)return;const x=this.container.clientWidth,_=this.container.clientHeight;this.camera.aspect=x/_,this.camera.updateProjectionMatrix(),this.renderer.setSize(x,_),this.composer.setSize(x,_)},this.render=()=>{const x=performance.now(),_=(x-this.lastTime)/1e3;this.lastTime=x,this.updateCameraPosition(x),this.starSystem&&(this.starSystem.rotation.y+=5e-4,this.starSystem.rotation.x+=1e-4);const M=60/Math.max(this.config.bpm,10);this.game.gameOver&&(this.onEvent&&this.onEvent("reset"),this.game.reset(),this.currentMove=null,this.isProcessingMove=!1),this.moveTimer+=_,this.moveTimer>M&&!this.isProcessingMove?this.game.currentPiece&&(this.currentMove=this.game.getBestMove(),this.isProcessingMove=!0,this.moveStepIndex=0,this.moveTimer=0):this.isProcessingMove&&this.moveTimer>M*.15&&(this.performAIInterpStep(),this.moveTimer=0),this.syncVisuals(x/1e3),this.composer.render(),requestAnimationFrame(this.render)},this.container=e,this.config=i,this.onEvent=s,this.game=new MT(i.gridRows,i.gridCols,i.minLinesToClear),this.game.enableLineClear=i.enableLineClear,this.scene=new rM,this.fog=new Kd(328976,i.fogDensity),this.scene.fog=this.fog,this.envTexture=this.generateEnvironment(),this.scene.environment=this.envTexture,this.scene.environmentIntensity=1-i.environmentDimming;const l=e.clientWidth,c=e.clientHeight;this.camera=new ai(60,l/c,.1,1e3),this.updateCameraPosition(),this.renderer=new hT({antialias:!1,powerPreference:"high-performance"}),this.renderer.setSize(l,c),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=Id,this.renderer.toneMappingExposure=1.2,e.appendChild(this.renderer.domElement);const h=new vT(this.scene,this.camera);this.bloomPass=new Nr(new lt(l,c),i.bloomStrength,.5,.02);const d=new yT;this.composer=new _T(this.renderer),this.composer.addPass(h),this.composer.addPass(this.bloomPass),this.composer.addPass(d);const m=new MM(16777215,.1);this.scene.add(m);const p=new bg(11141375,2,100);p.position.set(-20,20,20),this.scene.add(p);const g=new bg(43775,2,100);g.position.set(20,5,20),this.scene.add(g),this.gridGroup=new Ho,this.scene.add(this.gridGroup),this.createStaticEnvironment(),this.rebuildBoardFrame(),this.initCubesPool(),this.initStars(),window.addEventListener("resize",this.onResize)}generateEnvironment(){const e=document.createElement("canvas");e.width=512,e.height=512;const i=e.getContext("2d");if(i){const l=i.createLinearGradient(0,0,0,512);l.addColorStop(0,"#1a0033"),l.addColorStop(.5,"#6600cc"),l.addColorStop(1,"#000000"),i.fillStyle=l,i.fillRect(0,0,512,512)}const s=new dM(e);return s.mapping=Wc,s}initStars(){const e=new qn,i=3e3,s=new Float32Array(i*3),l=new Float32Array(i*3);for(let h=0;h<i;h++){const d=120+Math.random()*50,m=2*Math.PI*Math.random(),p=Math.acos(2*Math.random()-1),g=d*Math.sin(p)*Math.cos(m),x=d*Math.sin(p)*Math.sin(m),_=d*Math.cos(p);s[h*3]=g,s[h*3+1]=x,s[h*3+2]=_;const M=Math.random(),b=new st;M>.8?b.setHex(16777215):M>.5?b.setHex(16711935):b.setHex(65535),l[h*3]=b.r,l[h*3+1]=b.g,l[h*3+2]=b.b}e.setAttribute("position",new _i(s,3)),e.setAttribute("color",new _i(l,3));const c=new C_({size:.3,vertexColors:!0,transparent:!0,opacity:.6,blending:Xc,depthWrite:!1});this.starSystem=new hM(e,c),this.scene.add(this.starSystem)}createStaticEnvironment(){this.gridHelper=new TM(300,100,16711935,655386),this.gridHelper.position.y=-15,this.gridHelper.position.z=-10,this.scene.add(this.gridHelper)}rebuildBoardFrame(){this.boardFrame&&(this.gridGroup.remove(this.boardFrame),this.boardFrame.geometry.dispose());const{gridRows:e,gridCols:i}=this.config,s=new Ds(i,e,1),l=new pM(s);this.boardFrame=new R_(l,new Jd({color:11158732,transparent:!0,opacity:.3})),this.boardFrame.position.set(i/2,e/2,0),this.gridGroup.add(this.boardFrame),this.gridGroup.position.x=-i/2,this.gridGroup.position.y=this.BOARD_CENTER_Y-e/2}initCubesPool(){this.cubes.forEach(s=>{this.gridGroup.remove(s),s.geometry.dispose(),s.material.dispose()}),this.cubes=[];const e=new Ds(.96,.96,.96),i=this.config.gridRows*this.config.gridCols+20;for(let s=0;s<i;s++){const l=new gM({color:16777215,emissive:0,emissiveIntensity:1,roughness:this.config.blockRoughness,metalness:this.config.blockMetalness,transmission:this.config.blockTransmission,thickness:this.config.blockThickness,transparent:!0,opacity:this.config.opacity,ior:1.5,clearcoat:1,clearcoatRoughness:.1}),c=new Ii(e,l);c.visible=!1,this.gridGroup.add(c),this.cubes.push(c)}}updateConfig(e){const i=this.config;this.config=e,this.game.enableLineClear=e.enableLineClear,this.bloomPass.strength=e.bloomStrength,this.fog.density=e.fogDensity,this.scene.environmentIntensity=1-e.environmentDimming,this.cubes.forEach(s=>{const l=s.material;l.opacity=e.opacity,l.roughness=e.blockRoughness,l.metalness=e.blockMetalness,l.transmission=e.blockTransmission,l.thickness=e.blockThickness}),this.gridHelper.visible=e.gridVisible,(i.gridRows!==e.gridRows||i.gridCols!==e.gridCols)&&(this.game.reset(e.gridRows,e.gridCols,e.minLinesToClear),this.rebuildBoardFrame(),this.initCubesPool(),this.currentMove=null,this.isProcessingMove=!1),i.minLinesToClear!==e.minLinesToClear&&(this.game.minLinesToClear=e.minLinesToClear)}getNeonColor(e){const s=(.6+this.config.temperature*.4+e)%1;return new st().setHSL(s,1,.5)}updateCameraPosition(e=0){const{cameraMode:i,cameraX:s,cameraY:l,cameraZ:c,rotationSpeed:h,gridRows:d}=this.config,m=this.BOARD_CENTER_Y;if(i==="manual")this.camera.position.set(s,l,c),this.camera.lookAt(0,m,0);else{const p=e*1e-4*h,g=Math.max(d*1.5,35);this.camera.position.x=Math.sin(p)*g,this.camera.position.z=Math.cos(p)*g,this.camera.position.y=m+Math.sin(p*.5)*5,this.camera.lookAt(0,m,0)}}performAIInterpStep(){if(!this.currentMove||!this.game.currentPiece){this.isProcessingMove=!1;return}if(this.moveStepIndex===0){const e=this.currentMove.rotation;for(let i=0;i<e;i++)this.game.currentPiece.shape=this.game.rotateShape(this.game.currentPiece.shape);this.moveStepIndex++}else this.moveStepIndex===1?this.game.currentPiece.x<this.currentMove.x?this.game.currentPiece.x++:this.game.currentPiece.x>this.currentMove.x?this.game.currentPiece.x--:this.moveStepIndex++:this.moveStepIndex===2&&(this.game.checkCollision(this.game.currentPiece.shape,this.game.currentPiece.x,this.game.currentPiece.y+1)?(this.game.lockPiece(),this.isProcessingMove=!1,this.currentMove=null):this.game.currentPiece.y++)}syncVisuals(e){this.cubes.forEach(g=>g.visible=!1);let i=0;const{gridRows:s,gridCols:l,visualStyle:c,flowSpeed:h,customGrid:d}=this.config,m=(g,x,_)=>{const M=(g-l/2)/(l/2),b=(x-s/2)/(s/2),T=_*h;switch(c){case"none":return 1;case"custom":{if(!d||d.length===0)return 1;const v=d.length-1-x,N=g;if(v>=0&&v<d.length){const D=d[v];if(D&&N>=0&&N<D.length)return D[N]}return .1}case"wave":return 1.2+.8*Math.sin(M*3+b*3-T);case"plasma":return 1.2+.6*(Math.sin(M*4+T)+Math.sin(b*4+T)+Math.sin((M+b)*5+T));case"heart":{const v=1+.2*Math.sin(T*5)+.1*Math.sin(T*10),N=M*1.5*v,D=(b+.3)*1.5*v,P=N*N+D*D-1;return P*P*P-N*N*D*D*D<=0?4:.1}case"matrix":{const v=Math.sin(g*123.456)*1e3,N=h*4,D=s,P=(T*N+v)%(D*1.5),L=D-P+D*.25-x;return L>0&&L<8?2.5*(1-L/8):.05}case"fire":{const v=Math.sin(g*2+T*2)+Math.sin(x*.5-T*5),N=1-x/s,D=N*N*3+v*.5;return Math.max(.1,D)}case"scanline":{const v=4/h,D=_%v/v*s,P=Math.abs(x-D);return P<1.5?3*(1-P/1.5):.1}case"sparkle":{const v=Math.floor(_*5*h);return Math.sin(g*12.9898+x*78.233+v*43758.5453)>.8?3:.2}default:return 1}},p=(g,x,_,M)=>{const b=g.material,T=this.getNeonColor(M),y=m(x,_,e);b.color.copy(T).multiplyScalar(.5),b.emissive.copy(T).multiplyScalar(y*1.5)};for(let g=0;g<s;g++)for(let x=0;x<this.config.gridCols;x++){const _=this.game.grid[g][x];if(_){if(i>=this.cubes.length)break;const M=this.cubes[i++],b=s-1-g;M.position.set(x+.5,b+.5,0);const T=Qc[_]||Qc.I;M.visible=!0,p(M,x,b,T.colorOffset)}}if(this.game.currentPiece){const{shape:g,x,y:_,colorOffset:M}=this.game.currentPiece;for(let b=0;b<g.length;b++)for(let T=0;T<g[b].length;T++)if(g[b][T]){if(i>=this.cubes.length)break;const y=this.cubes[i++],v=x+T,N=_+b;if(N>=0&&N<s){const D=s-1-N;y.position.set(v+.5,D+.5,0),y.visible=!0,p(y,v,D,M)}}}}dispose(){window.removeEventListener("resize",this.onResize),this.renderer.dispose()}}/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ET=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),TT=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),Zg=o=>{const e=TT(o);return e.charAt(0).toUpperCase()+e.slice(1)},F_=(...o)=>o.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),AT=o=>{for(const e in o)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var RT={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CT=hn.forwardRef(({color:o="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:h,...d},m)=>hn.createElement("svg",{ref:m,...RT,width:e,height:e,stroke:o,strokeWidth:s?Number(i)*24/Number(e):i,className:F_("lucide",l),...!c&&!AT(d)&&{"aria-hidden":"true"},...d},[...h.map(([p,g])=>hn.createElement(p,g)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a=(o,e)=>{const i=hn.forwardRef(({className:s,...l},c)=>hn.createElement(CT,{ref:c,iconNode:e,className:F_(`lucide-${ET(Zg(o))}`,`lucide-${o}`,s),...l}));return i.displayName=Zg(o),i};/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wT=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],DT=_a("folder-open",wT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UT=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],NT=_a("grid-3x3",UT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LT=[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]],OT=_a("minimize-2",LT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PT=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],zT=_a("palette",PT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BT=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],FT=_a("save",BT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IT=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],HT=_a("settings",IT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GT=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],VT=_a("trash-2",GT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kT=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]],XT=_a("video",kT);/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WT=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],qT=_a("zap",WT),Io="tetris_flow_preset_",Er={save:(o,e)=>{try{localStorage.setItem(Io+o,JSON.stringify(e))}catch(i){console.error("Failed to save preset",i)}},load:o=>{try{const e=localStorage.getItem(Io+o);return e?JSON.parse(e):null}catch(e){return console.error("Failed to load preset",e),null}},delete:o=>{try{localStorage.removeItem(Io+o)}catch(e){console.error("Failed to delete preset",e)}},list:()=>{try{return Object.keys(localStorage).filter(o=>o.startsWith(Io)).map(o=>o.replace(Io,""))}catch{return[]}}},YT=({config:o,onChange:e,onLoadConfig:i})=>{const[s,l]=hn.useState(!1),[c,h]=hn.useState("layout"),[d,m]=hn.useState(""),[p,g]=hn.useState([]);hn.useEffect(()=>{x()},[]);const x=()=>{g(Er.list())},_=()=>{d.trim()&&(Er.save(d,o),m(""),x())},M=y=>{const v=Er.load(y);v&&i(v)},b=y=>{confirm(`Delete preset "${y}"?`)&&(Er.delete(y),x())},T=y=>{e("cameraMode","manual"),y==="front"?(e("cameraX",0),e("cameraY",10),e("cameraZ",Math.max(o.gridRows*1.5,30))):y==="iso"?(e("cameraX",20),e("cameraY",25),e("cameraZ",30)):y==="top"&&(e("cameraX",0),e("cameraY",45),e("cameraZ",5))};return s?Z.jsx("div",{className:"absolute top-4 right-4 z-50",children:Z.jsx("button",{onClick:()=>l(!1),className:"bg-black/40 backdrop-blur-md p-3 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-900/40 transition-all",children:Z.jsx(HT,{size:20})})}):Z.jsxs("div",{className:"absolute top-4 right-4 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl shadow-purple-900/20 z-50 text-gray-100 font-mono",children:[Z.jsxs("div",{className:"flex justify-between items-center mb-4 border-b border-white/10 pb-2",children:[Z.jsx("h2",{className:"text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400",children:"SYSTEM CORE"}),Z.jsx("button",{onClick:()=>l(!0),className:"text-gray-400 hover:text-white",children:Z.jsx(OT,{size:18})})]}),Z.jsxs("div",{className:"flex space-x-1 mb-5 bg-white/5 p-1 rounded-lg",children:[Z.jsxs("button",{onClick:()=>h("layout"),className:`flex-1 flex items-center justify-center py-1.5 rounded text-[10px] uppercase tracking-wider transition-colors ${c==="layout"?"bg-purple-600 text-white":"text-gray-400 hover:text-white"}`,children:[Z.jsx(NT,{size:12,className:"mr-1"})," Game"]}),Z.jsxs("button",{onClick:()=>h("camera"),className:`flex-1 flex items-center justify-center py-1.5 rounded text-[10px] uppercase tracking-wider transition-colors ${c==="camera"?"bg-purple-600 text-white":"text-gray-400 hover:text-white"}`,children:[Z.jsx(XT,{size:12,className:"mr-1"})," View"]}),Z.jsxs("button",{onClick:()=>h("visuals"),className:`flex-1 flex items-center justify-center py-1.5 rounded text-[10px] uppercase tracking-wider transition-colors ${c==="visuals"?"bg-purple-600 text-white":"text-gray-400 hover:text-white"}`,children:[Z.jsx(zT,{size:12,className:"mr-1"})," Vibe"]}),Z.jsxs("button",{onClick:()=>h("presets"),className:`flex-1 flex items-center justify-center py-1.5 rounded text-[10px] uppercase tracking-wider transition-colors ${c==="presets"?"bg-purple-600 text-white":"text-gray-400 hover:text-white"}`,children:[Z.jsx(DT,{size:12,className:"mr-1"})," Save"]})]}),Z.jsxs("div",{className:"space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar",children:[c==="layout"&&Z.jsxs(Z.Fragment,{children:[Z.jsxs("div",{className:"space-y-2",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase tracking-widest text-pink-300",children:[Z.jsx("span",{children:"Speed (BPM)"}),Z.jsx("span",{children:o.bpm})]}),Z.jsx("input",{type:"range",min:"60",max:"600",step:"10",value:o.bpm,onChange:y=>e("bpm",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"})]}),Z.jsx("div",{className:"bg-white/5 p-3 rounded border border-white/5",children:Z.jsxs("label",{className:"flex items-center space-x-3 cursor-pointer",children:[Z.jsx("input",{type:"checkbox",checked:o.enableLineClear,onChange:y=>e("enableLineClear",y.target.checked),className:"form-checkbox h-4 w-4 text-purple-500 rounded focus:ring-purple-500 bg-gray-700 border-gray-600"}),Z.jsxs("div",{children:[Z.jsx("span",{className:"text-xs font-bold text-white uppercase block",children:"Classic Line Clear"}),Z.jsx("span",{className:"text-[10px] text-gray-400 block",children:o.enableLineClear?"Lines vanish when full (Infinite Play)":"Blocks stack to top (Loop Animation)"})]})]})}),o.enableLineClear&&Z.jsxs("div",{className:"space-y-2 opacity-80 pl-2 border-l-2 border-purple-500/30",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase text-green-300",children:[Z.jsx("span",{children:"Lines per Clear"}),Z.jsx("span",{children:o.minLinesToClear})]}),Z.jsx("input",{type:"range",min:"1",max:"4",step:"1",value:o.minLinesToClear,onChange:y=>e("minLinesToClear",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"})]}),Z.jsxs("div",{className:"grid grid-cols-2 gap-4 pt-2",children:[Z.jsxs("div",{className:"space-y-2",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase text-gray-400",children:[Z.jsx("span",{children:"Height"}),Z.jsx("span",{children:o.gridRows})]}),Z.jsx("input",{type:"range",min:"10",max:"40",step:"1",value:o.gridRows,onChange:y=>e("gridRows",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-400"})]}),Z.jsxs("div",{className:"space-y-2",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase text-gray-400",children:[Z.jsx("span",{children:"Width"}),Z.jsx("span",{children:o.gridCols})]}),Z.jsx("input",{type:"range",min:"6",max:"20",step:"1",value:o.gridCols,onChange:y=>e("gridCols",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-400"})]})]})]}),c==="camera"&&Z.jsxs(Z.Fragment,{children:[Z.jsxs("div",{className:"flex space-x-2 mb-4",children:[Z.jsx("button",{onClick:()=>e("cameraMode","orbit"),className:`flex-1 py-1.5 text-xs uppercase border border-white/10 rounded font-bold ${o.cameraMode==="orbit"?"bg-cyan-900/80 text-cyan-200 border-cyan-500":"text-gray-500 hover:bg-white/5"}`,children:"Auto Orbit"}),Z.jsx("button",{onClick:()=>e("cameraMode","manual"),className:`flex-1 py-1.5 text-xs uppercase border border-white/10 rounded font-bold ${o.cameraMode==="manual"?"bg-cyan-900/80 text-cyan-200 border-cyan-500":"text-gray-500 hover:bg-white/5"}`,children:"Manual"})]}),o.cameraMode==="orbit"?Z.jsxs("div",{className:"space-y-2",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase text-cyan-300",children:[Z.jsx("span",{children:"Orbit Speed"}),Z.jsx("span",{children:o.rotationSpeed})]}),Z.jsx("input",{type:"range",min:"0",max:"5",step:"0.1",value:o.rotationSpeed,onChange:y=>e("rotationSpeed",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"})]}):Z.jsxs("div",{className:"space-y-4 animate-in fade-in",children:[Z.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[Z.jsx("button",{onClick:()=>T("front"),className:"p-1 text-[10px] bg-white/10 hover:bg-white/20 rounded text-center",children:"FRONT"}),Z.jsx("button",{onClick:()=>T("iso"),className:"p-1 text-[10px] bg-white/10 hover:bg-white/20 rounded text-center",children:"ISO"}),Z.jsx("button",{onClick:()=>T("top"),className:"p-1 text-[10px] bg-white/10 hover:bg-white/20 rounded text-center",children:"TOP"})]}),Z.jsxs("div",{className:"space-y-3 bg-white/5 p-3 rounded-lg border border-white/5",children:[Z.jsxs("div",{className:"space-y-1",children:[Z.jsxs("div",{className:"flex justify-between text-[10px] uppercase text-gray-400",children:[Z.jsx("span",{children:"Pos X"}),Z.jsx("span",{children:o.cameraX})]}),Z.jsx("input",{type:"range",min:"-50",max:"50",step:"1",value:o.cameraX,onChange:y=>e("cameraX",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-cyan-500"})]}),Z.jsxs("div",{className:"space-y-1",children:[Z.jsxs("div",{className:"flex justify-between text-[10px] uppercase text-gray-400",children:[Z.jsx("span",{children:"Pos Y"}),Z.jsx("span",{children:o.cameraY})]}),Z.jsx("input",{type:"range",min:"-10",max:"60",step:"1",value:o.cameraY,onChange:y=>e("cameraY",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-cyan-500"})]}),Z.jsxs("div",{className:"space-y-1",children:[Z.jsxs("div",{className:"flex justify-between text-[10px] uppercase text-gray-400",children:[Z.jsx("span",{children:"Pos Z"}),Z.jsx("span",{children:o.cameraZ})]}),Z.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:o.cameraZ,onChange:y=>e("cameraZ",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-cyan-500"})]})]})]})]}),c==="visuals"&&Z.jsxs(Z.Fragment,{children:[Z.jsxs("div",{className:"mb-4 space-y-3 p-3 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-white/10",children:[Z.jsxs("div",{className:"flex items-center space-x-2 text-yellow-300 mb-2",children:[Z.jsx(qT,{size:14}),Z.jsx("span",{className:"text-xs font-bold uppercase",children:"Light Flow FX"})]}),Z.jsx("div",{className:"grid grid-cols-4 gap-2",children:["none","wave","plasma","heart","matrix","fire","scanline","sparkle","custom"].map(y=>Z.jsx("button",{onClick:()=>e("visualStyle",y),className:`text-[9px] uppercase py-2 rounded border transition-all truncate ${o.visualStyle===y?"bg-yellow-500/20 border-yellow-500 text-yellow-200":"bg-black/20 border-white/10 text-gray-400 hover:border-white/30"}`,children:y},y))}),o.visualStyle!=="none"&&o.visualStyle!=="custom"&&Z.jsxs("div",{className:"space-y-1 mt-2",children:[Z.jsxs("div",{className:"flex justify-between text-[10px] uppercase text-gray-400",children:[Z.jsx("span",{children:"Flow Speed"}),Z.jsx("span",{children:o.flowSpeed})]}),Z.jsx("input",{type:"range",min:"0.1",max:"5.0",step:"0.1",value:o.flowSpeed,onChange:y=>e("flowSpeed",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-yellow-500"})]}),o.visualStyle==="custom"&&Z.jsxs("div",{className:"text-[10px] text-gray-400 mt-2 bg-black/40 p-2 rounded",children:[Z.jsx("p",{children:"API Mode Active."}),Z.jsxs("p",{className:"mt-1 text-gray-500",children:["Use ",Z.jsx("code",{children:"TetrisFlow.set('customGrid', [...])"})," to draw patterns."]})]})]}),Z.jsxs("div",{className:"space-y-2",children:[Z.jsx("div",{className:"flex justify-between text-xs uppercase tracking-widest text-blue-300",children:Z.jsx("span",{children:"Palette Shift"})}),Z.jsxs("div",{className:"relative w-full h-3 rounded-lg overflow-hidden bg-gray-700 ring-1 ring-white/20",children:[Z.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-red-500"}),Z.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:o.temperature,onChange:y=>e("temperature",Number(y.target.value)),className:"absolute inset-0 w-full h-full opacity-0 cursor-pointer"})]})]}),Z.jsxs("div",{className:"space-y-2",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase text-purple-300",children:[Z.jsx("span",{children:"Bloom Intensity"}),Z.jsx("span",{children:o.bloomStrength.toFixed(1)})]}),Z.jsx("input",{type:"range",min:"0",max:"3",step:"0.1",value:o.bloomStrength,onChange:y=>e("bloomStrength",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"})]}),Z.jsxs("div",{className:"space-y-2",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase text-gray-300",children:[Z.jsx("span",{children:"Fog Density"}),Z.jsx("span",{children:(o.fogDensity*1e3).toFixed(1)})]}),Z.jsx("input",{type:"range",min:"0",max:"0.15",step:"0.005",value:o.fogDensity,onChange:y=>e("fogDensity",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-500"})]}),Z.jsxs("div",{className:"space-y-2",children:[Z.jsxs("div",{className:"flex justify-between text-xs uppercase text-gray-300",children:[Z.jsx("span",{children:"Block Opacity"}),Z.jsxs("span",{children:[(o.opacity*100).toFixed(0),"%"]})]}),Z.jsx("input",{type:"range",min:"0.1",max:"1",step:"0.05",value:o.opacity,onChange:y=>e("opacity",Number(y.target.value)),className:"w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-400"})]}),Z.jsxs("div",{className:"border-t border-white/10 pt-4 mt-4",children:[Z.jsx("h3",{className:"text-xs font-bold text-gray-400 mb-2",children:"MATERIAL PROPERTIES"}),Z.jsxs("div",{className:"grid grid-cols-2 gap-3 mb-2",children:[Z.jsxs("div",{className:"space-y-1",children:[Z.jsx("label",{className:"text-[10px] text-gray-500 uppercase",children:"Roughness"}),Z.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",value:o.blockRoughness,onChange:y=>e("blockRoughness",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded cursor-pointer accent-white"})]}),Z.jsxs("div",{className:"space-y-1",children:[Z.jsx("label",{className:"text-[10px] text-gray-500 uppercase",children:"Metalness"}),Z.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",value:o.blockMetalness,onChange:y=>e("blockMetalness",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded cursor-pointer accent-white"})]})]}),Z.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[Z.jsxs("div",{className:"space-y-1",children:[Z.jsx("label",{className:"text-[10px] text-gray-500 uppercase",children:"Glass (Transmission)"}),Z.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",value:o.blockTransmission,onChange:y=>e("blockTransmission",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded cursor-pointer accent-cyan-400"})]}),Z.jsxs("div",{className:"space-y-1",children:[Z.jsx("label",{className:"text-[10px] text-gray-500 uppercase",children:"Thickness"}),Z.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:o.blockThickness,onChange:y=>e("blockThickness",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded cursor-pointer accent-cyan-400"})]})]}),Z.jsxs("div",{className:"space-y-1 mt-3 border-t border-white/5 pt-2",children:[Z.jsx("label",{className:"text-[10px] text-gray-500 uppercase",children:"Env Dimming (Reflection)"}),Z.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",value:o.environmentDimming,onChange:y=>e("environmentDimming",Number(y.target.value)),className:"w-full h-1 bg-gray-700 rounded cursor-pointer accent-purple-900"})]})]})]}),c==="presets"&&Z.jsxs("div",{className:"space-y-4",children:[Z.jsxs("div",{className:"bg-white/5 p-3 rounded-lg border border-white/5",children:[Z.jsx("label",{className:"text-xs uppercase text-gray-400 block mb-2",children:"Save Current Preset"}),Z.jsxs("div",{className:"flex gap-2",children:[Z.jsx("input",{type:"text",value:d,onChange:y=>m(y.target.value),placeholder:"Preset Name...",className:"flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"}),Z.jsx("button",{onClick:_,disabled:!d,className:"p-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded text-white transition-colors",children:Z.jsx(FT,{size:16})})]})]}),Z.jsxs("div",{className:"space-y-2",children:[Z.jsx("div",{className:"text-xs uppercase text-gray-400 mb-1",children:"Load Presets"}),p.length===0?Z.jsx("div",{className:"text-center py-4 text-gray-600 text-xs italic",children:"No saved presets"}):Z.jsx("div",{className:"grid grid-cols-1 gap-2",children:p.map(y=>Z.jsxs("div",{className:"flex items-center justify-between bg-white/5 p-2 rounded hover:bg-white/10 group transition-colors",children:[Z.jsx("button",{onClick:()=>M(y),className:"text-sm text-gray-200 text-left flex-1",children:y}),Z.jsx("button",{onClick:()=>b(y),className:"text-gray-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity",children:Z.jsx(VT,{size:14})})]},y))})]})]})]})]})},Ka={FLOW_SPEED:[1,4],TEMPERATURE:[0,1],BPM:[60,600]},jT=40,I_=({initialConfigOverride:o,sdkMode:e=!1})=>{const i=hn.useRef(null),s=hn.useRef(null),l=hn.useRef({}),[c,h]=hn.useState(e?"live":"debug"),[d,m]=hn.useState({bpm:60,temperature:.36,bloomStrength:.9,opacity:.15,gridVisible:!0,fogDensity:0,gridRows:18,gridCols:20,minLinesToClear:1,enableLineClear:!1,cameraMode:"manual",rotationSpeed:.5,cameraX:0,cameraY:10,cameraZ:22,visualStyle:"matrix",flowSpeed:3.5,customGrid:[],blockRoughness:.1,blockMetalness:.5,blockTransmission:.2,blockThickness:1,environmentDimming:0,...o});hn.useEffect(()=>{const _=new URLSearchParams(window.location.search).get("mode");_==="live"?h("live"):_==="debug"&&h("debug")},[]),hn.useEffect(()=>(window.TetrisFlow={set:(x,_)=>{m(M=>({...M,[x]:_}))},setMode:x=>{h(x)},loadPreset:x=>{const _=Er.load(x);_&&m(_)},getPresets:()=>Er.list(),bulkUpdate:x=>{m(_=>({..._,...x}))},toggle:x=>{m(_=>({..._,[x]:!_[x]}))},syncMusic:x=>{const{density:_,brightness:M,expectedDuration:b}=x,T=Math.max(0,Math.min(1,_)),y=Ka.FLOW_SPEED[0]+T*(Ka.FLOW_SPEED[1]-Ka.FLOW_SPEED[0]),v=Math.max(0,Math.min(1,M)),N=Ka.TEMPERATURE[0]+v*(Ka.TEMPERATURE[1]-Ka.TEMPERATURE[0]);let D=60;if(b&&b>0){const V=d.gridRows*d.gridCols*jT/b;D=Math.max(Ka.BPM[0],Math.min(Ka.BPM[1],V))}else D=d.bpm;m(P=>({...P,flowSpeed:parseFloat(y.toFixed(2)),temperature:parseFloat(N.toFixed(2)),bpm:Math.floor(D)}))},on:(x,_)=>{l.current[x]||(l.current[x]=[]),l.current[x].push(_)},off:(x,_)=>{l.current[x]&&(l.current[x]=l.current[x].filter(M=>M!==_))}},()=>{}),[d.gridRows,d.gridCols,d.bpm]);const p=x=>{const _=l.current[x];_&&_.forEach(M=>M())};hn.useEffect(()=>{if(!i.current)return;const x=new bT(i.current,d,p);return s.current=x,x.render(),()=>{x.dispose()}},[]),hn.useEffect(()=>{s.current&&s.current.updateConfig(d)},[d]);const g=(x,_)=>{m(M=>({...M,[x]:_}))};return Z.jsxs("div",{className:"absolute inset-0 overflow-hidden bg-black/90",children:[Z.jsx("div",{ref:i,className:"absolute inset-0 z-0"}),Z.jsx("div",{className:"absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"}),c==="debug"&&Z.jsx(YT,{config:d,onChange:g,onLoadConfig:m}),c==="debug"&&Z.jsxs("div",{className:"absolute bottom-10 left-10 z-10 pointer-events-none select-none",children:[Z.jsx("h1",{className:"text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]",children:"TETRIS"}),Z.jsx("h2",{className:"text-2xl font-bold text-white/80 tracking-[0.3em] ml-1 drop-shadow-md",children:"FLOW"})]})]})};let pa=null;const ZT=(o,e)=>{const i=document.getElementById(o);if(!i){console.error(`TetrisSDK: Container with ID "${o}" not found.`);return}getComputedStyle(i).position==="static"&&(i.style.position="relative"),pa&&(pa.unmount(),pa=null),pa=$g.createRoot(i),pa.render(Z.jsx(Jg.StrictMode,{children:Z.jsx(I_,{initialConfigOverride:e,sdkMode:!0})}))},KT=()=>{pa&&(pa.unmount(),pa=null,window.TetrisFlow=void 0)};window.TetrisSDK={init:ZT,destroy:KT,get api(){return window.TetrisFlow||null}};const Kg=document.getElementById("root");if(Kg&&!window.TetrisFlow){const o=$g.createRoot(Kg);o.render(Z.jsx(Jg.StrictMode,{children:Z.jsx(I_,{})})),pa=o}
