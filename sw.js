if(!self.define){let e,i={};const f=(f,r)=>(f=new URL(f+".js",r).href,i[f]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=f,e.onload=i,document.head.appendChild(e)}else e=f,importScripts(f),i()})).then((()=>{let e=i[f];if(!e)throw new Error(`Module ${f} didn’t register its module`);return e})));self.define=(r,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let d={};const o=e=>f(e,n),t={module:{uri:n},exports:d,require:o};i[n]=Promise.all(r.map((e=>t[e]||o(e)))).then((e=>(s(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-7EksFZh2.js",revision:null},{url:"assets/index-dLkzDfcH.css",revision:null},{url:"index.html",revision:"a0d2f6fb7ff672e0615f257304ca8ffd"},{url:"registerSW.js",revision:"6261e0e1d0d46398ca47d58025ead300"},{url:"github.svg",revision:"cd59d3724bec8fa9be3282d113598714"},{url:"vk.svg",revision:"695f7dc1853b54797a9944df73a2c1d3"},{url:"tg.svg",revision:"9325eff58a2e172b4c177983257c8b89"},{url:"16.png",revision:"69324844010896fb1d3a98f7f25dab66"},{url:"32.png",revision:"4f06a689e3e9ff72d2882569deefd343"},{url:"80.png",revision:"47e5249cabda1313a44172ea8cb5116a"},{url:"128.png",revision:"2f3d8498d241f83566b535fed418f78e"},{url:"192.png",revision:"bf0ee3af6a0933b38f4e0ff50edc561f"},{url:"512.png",revision:"e0a1f2ba059f13863f62c587a7b7fffd"},{url:"manifest.webmanifest",revision:"4206e80c7ef60b7d4daf9ccf1bca931e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
