var C=Object.defineProperty;var w=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var x=(s,a,e)=>a in s?C(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,h=(s,a)=>{for(var e in a||(a={}))I.call(a,e)&&x(s,e,a[e]);if(w)for(var e of w(a))L.call(a,e)&&x(s,e,a[e]);return s};import{h as N,f as i,r as P,w as V,k as _,l as g,x as r,q as o,v as n,T as z,y,L as b,u,D,F as $,J as A,K as F,I as U,B as j,C as E}from"./@vue.58f677d4.js";import{b as G}from"./vue-router.bbc86d1b.js";import{i as f}from"./lispress.9248cfd1.js";import J from"./PoweredBy.c5fc037b.js";import{a as K}from"./main.d6b3f902.js";import"./pinia.bfe3909a.js";import"./vue-demi.b3a9cad9.js";const k=s=>(j("data-v-47c15d67"),s=s(),E(),s),M={id:"title-list"},O={class:"article-card"},R={class:"page-turn"},H=k(()=>r("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",fill:"currentColor",class:"bi bi-caret-left-fill",viewBox:"0 0 16 16"},[r("path",{d:"m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"})],-1)),Q=k(()=>r("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",fill:"currentColor",class:"bi bi-caret-right-fill",viewBox:"0 0 16 16"},[r("path",{d:"m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"})],-1)),W=N({setup(s){let a=G(),e=i(()=>{var t;return Number((t=a.query.page)!=null?t:1)}),p=10,l=P([]),S=i(()=>l.value.slice((e.value-1)*p,e.value*p)),d=i(()=>{var t;return(t=a.query.search)!=null?t:""});m(),V(d,()=>{l.value=[],m()});function m(){d.value?f.getSearchArticlesTitle(d.value.split(" ")).then(t=>{l.value=t}):f.getArticlesTitle().then(t=>{l.value=t})}function T(){return e.value<Math.ceil(l.value.length/p)}let q=i(()=>{let t=h({},a.query);return e.value==2?delete t.page:t.page=e.value-1+"",{query:t}}),B=i(()=>{let t=h({},a.query);return t.page=e.value+1+"",{query:t}});return(t,X)=>{const v=D("router-link");return _(),g("div",M,[r("div",O,[o(z,{appear:"","enter-active-class":"fadeInUp","leave-active-class":"fadeOutUp"},{default:n(()=>[(_(!0),g($,null,A(u(S),c=>(_(),g("div",{key:c},[o(v,{to:`/articles/?article=${c}`},{default:n(()=>[r("div",{style:F({"background-image":`url(https://${u(f).config().username}.github.io/articles/assets/${c}/background.jpg)`})},[r("div",null,[r("h1",null,U(c),1)])],4)]),_:2},1032,["to"])]))),128))]),_:1})]),r("div",R,[y(o(v,{to:u(q),class:"pre-page"},{default:n(()=>[H]),_:1},8,["to"]),[[b,u(e)>1]]),y(o(v,{to:u(B),class:"next-page"},{default:n(()=>[Q]),_:1},8,["to"]),[[b,T()]])]),o(J)])}}});var ie=K(W,[["__scopeId","data-v-47c15d67"]]);export{ie as default};
