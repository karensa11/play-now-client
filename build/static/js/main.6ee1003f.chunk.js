(this["webpackJsonpplay-now-client"]=this["webpackJsonpplay-now-client"]||[]).push([[0],{167:function(e,t,a){e.exports=a(406)},172:function(e,t,a){},173:function(e,t,a){},174:function(e,t,a){},179:function(e,t,a){},180:function(e,t,a){},181:function(e,t,a){},182:function(e,t,a){},261:function(e,t,a){},262:function(e,t,a){},285:function(e,t){},287:function(e,t){},310:function(e,t){},312:function(e,t){},340:function(e,t){},341:function(e,t){},347:function(e,t){},382:function(e,t){},385:function(e,t){},405:function(e,t,a){},406:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(157),i=a.n(o),l=(a(172),a(173),a(174),a(6));var r=Object(l.f)((function(e){var t=e.history;return c.a.createElement("div",{className:"header-component"},c.a.createElement("div",{className:"logo",onClick:function(){return t.push("/")}},"Play Now"))}));a(179);function s(e,t){return e+t+"\n"}function m(e){document.title=e?"Play Now | "+e:"Play Now"}function u(){return Object(n.useEffect)((function(){m("")})),c.a.createElement("div",{className:"home-page"},"HOME")}a(180);var p=[{code:"kids",displayName:"Kids",imageUrl:"https://i.ibb.co/bQt4Bbk/kids.jpg"},{code:"card",displayName:"Card",imageUrl:"https://i.ibb.co/7j3rZyp/card.jpg"},{code:"fighting",displayName:"Fighting",imageUrl:"https://i.ibb.co/2KVXBf5/fighting.jpg"},{code:"funny",displayName:"Funny",imageUrl:"https://i.ibb.co/883QR9P/funny.jpg"},{code:"puzzle",displayName:"Puzzle",imageUrl:"https://i.ibb.co/stfNhJX/puzzle.jpg"},{code:"racing",displayName:"Racing",imageUrl:"https://i.ibb.co/NshGhz5/racing.jpg"},{code:"shooting",displayName:"Shooting",imageUrl:"https://i.ibb.co/6XV9Spw/shooting.jpg"},{code:"arcade",displayName:"Arcade",imageUrl:"https://i.ibb.co/BVYDjzL/arcade.png"},{code:"political",displayName:"Political",imageUrl:"https://i.ibb.co/xfgJYp9/political.jpg"}];function d(){return c.a.createElement("div",{className:"categories-stripe-component"},p.map((function(e){return c.a.createElement("div",{key:e.code,className:"category-item"},c.a.createElement("img",{src:e.imageUrl,alt:"category image"}),c.a.createElement("div",{className:"name"},e.displayName))})))}a(181),a(182);var f=a(159),g=a.n(f),h="";h=s(h,"# About Play Now"),h=s(h,"Play now is a platform for online games"),h=s(h,"");var E=h=s(h,"It will show you always the most updated and cool games in the market, as well as nostalgic games");function b(){return Object(n.useEffect)((function(){m("About")})),c.a.createElement("div",{className:"about-component"},c.a.createElement(g.a,{source:E}))}var v=a(160),N=a(161),y=a(162),w=a(165),j=a(164),k=(a(261),a(166));a(262);function U(e){var t=e.children,a=e.isSignInWithGoogle,n=e.inverted,o=Object(k.a)(e,["children","isSignInWithGoogle","inverted"]);return c.a.createElement("button",Object.assign({className:"\n                        ".concat(n?"inverted":"","\n                        ").concat(a?"sign-in-with-google":""," \n                        custom-button\n                        ")},o),t)}var O=a(163),C=a.n(O),P=(a(265),function(e){Object(w.a)(a,e);var t=Object(j.a)(a);function a(e){var n;return Object(N.a)(this,a),(n=t.call(this,e)).setField=function(e){var t=e.target,a=t.name,c=t.value;n.setState(Object(v.a)({},a,c))},n.sendEmail=function(e){e.preventDefault(),console.log(n.state),C.a.sendForm("gmail","contact_us",e.target,"user_PgPU3Y0ZVne4jIcFILgw5").then((function(e){window.location.reload()}),(function(e){console.log(e.text)}))},n.state={from_email:"",html_message:""},n}return Object(y.a)(a,[{key:"componentDidMount",value:function(){m("Contact")}},{key:"render",value:function(){return c.a.createElement("div",{className:"contact-component"},c.a.createElement("form",{onSubmit:this.sendEmail},c.a.createElement("h1",null,"Contact Us"),c.a.createElement("div",{className:"title"},"Email:\xa0",c.a.createElement("span",{className:"mandatory"},"*")),c.a.createElement("input",{value:this.state.from_email,className:"input-field",type:"text",size:"100",name:"from_email",onChange:this.setField}),c.a.createElement("div",{className:"title"},"Message:\xa0",c.a.createElement("span",{className:"mandatory"},"*")),c.a.createElement("textarea",{value:this.state.html_message,className:"input-field",rows:"4",cols:"100",name:"html_message",onChange:this.setField}),c.a.createElement("div",{className:"submit"},c.a.createElement(U,{onClick:this.onSubmit},"Submit"))))}}]),a}(n.Component));function S(e){var t=e.match;return c.a.createElement("div",{className:"info-page"},c.a.createElement(l.c,null,c.a.createElement(l.a,{exact:!0,path:t.path+"/about",component:b}),c.a.createElement(l.a,{exact:!0,path:t.path+"/contact",component:P})))}a(405);var z=a(27);function x(){var e=(new Date).getFullYear();return c.a.createElement("div",{className:"footer-component"},c.a.createElement("div",{className:"copyright"},"@Copyright\xa0\xa0",e,"\xa0\xa0Karen Samoila"),c.a.createElement("div",{className:"links"},c.a.createElement(z.b,{to:"/info/about"},"About"),c.a.createElement("div",{className:"space"},"|"),c.a.createElement(z.b,{to:"/info/contact"},"Contact Us"),c.a.createElement("div",{className:"space"},"|"),c.a.createElement(z.b,{to:"/info/terms"},"Terms Of Use")))}var F=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(r,null),c.a.createElement(d,null),c.a.createElement(l.c,null,c.a.createElement(l.a,{exact:!0,path:"/",component:u}),c.a.createElement(l.a,{path:"/info",component:S})),c.a.createElement(x,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(z.a,null,c.a.createElement(c.a.StrictMode,null,c.a.createElement(F,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[167,1,2]]]);
//# sourceMappingURL=main.6ee1003f.chunk.js.map