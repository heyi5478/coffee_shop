import{G as b,t as v,_ as d,r as i,o as _,c as h,b as s,a as o,w as e,e as a,u}from"./index-rEPnb7pY.js";import{c as r}from"./cartStore-Jmh0kr8l.js";import{_ as p}from"./logo-3VEa--vB.js";const g={computed:{...b(r,["carts"])},methods:{...v(r,["getCart"])},mounted(){this.getCart()}},w={class:"position-relative"},k={class:"container d-flex flex-column"},x={class:"navbar navbar-expand-lg navbar-light"},$=s("img",{style:{height:"75px"},src:p,alt:""},null,-1),y=s("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},[s("span",{class:"navbar-toggler-icon"})],-1),N={class:"collapse navbar-collapse justify-content-end",id:"navbarNavAltMarkup"},W={class:"navbar-nav"},A=s("i",{class:"bi bi-cart"},null,-1),C={class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"},R=s("span",{class:"visually-hidden"},"unread messages",-1);function S(f,m,t,c,ns,cs){const n=i("RouterLink");return _(),h("div",w,[s("div",k,[s("nav",x,[o(n,{class:"navbar-brand",to:"/"},{default:e(()=>[$]),_:1}),y,s("div",N,[s("div",W,[o(n,{class:"nav-item nav-link me-4",to:"/products"},{default:e(()=>[a("線上商店")]),_:1}),o(n,{class:"nav-item nav-link me-4",to:"/about"},{default:e(()=>[a("關於")]),_:1}),o(n,{class:"btn position-relative",style:{width:"44px"},to:"/checkout"},{default:e(()=>{var l;return[A,s("span",C,[a(u((l=this.carts)==null?void 0:l.length)+" ",1),R])]}),_:1})])])])])])}const ds=d(g,[["render",S]]),z={},L={class:"footer-section"},T={class:"container"},B={class:"row"},M={class:"col-md-4 footer-col"},V={class:"footer_contact"},Y=s("h4",null,"聯絡我們...",-1),j={class:"contact_link_box"},D={href:"https://maps.app.goo.gl/YniVbax11MsvvD2g9",target:"_blank"},O=s("span",null,"103台北市大同區保安街11號",-1),E={href:"tel:+11 123456789"},G=s("span",null,"+11 123456789",-1),I={href:"mailto:cafessa@gmail.com"},J=s("span",null,"cafessa@gmail.com",-1),P={class:"col-md-4 footer-col"},q={class:"footer_detail"},F=s("img",{src:p,alt:""},null,-1),H=s("p",null,"歡迎來到「泡咖啡」！我們是一家專注於帶給您最純正、最風味豐富的咖啡體驗的線上咖啡專賣店。 ",-1),K={class:"footer_social"},Q={href:"https://www.facebook.com/Starbucks/?locale=zh_TW",target:"_blank"},U={href:"https://www.starbucks.com.tw/stores/allevent/show.jspx?n=3635",target:"_blank"},X={href:"https://www.instagram.com/starbuckstw/",target:"_blank"},Z=s("div",{class:"col-md-4 footer-col"},[s("div",{class:"map_container rounded-1"},[s("div",{class:"map box-shadow-1 bg-white"},[s("iframe",{src:"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7228.510865468377!2d121.5063422!3d25.0593302!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9155bdb3bab%3A0xc93b2e1a0d6e1e7a!2z5pif5be05YWL5YW46JePIOS_neWuiemWgOW4gg!5e0!3m2!1szh-TW!2stw!4v1710744175655!5m2!1szh-TW!2stw",width:"600",height:"450",style:{border:"0"},allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade"})])])],-1),ss={class:"footer-info"},os=s("p",null,[a("© "),s("span",{id:"displayYear"}),a("All Rights Reserved By "),s("a",{href:"#"},"Steve")],-1),ts={class:"me-2"},as=s("span",null," | ",-1);function es(f,m){const t=i("font-awesome-icon"),c=i("RouterLink");return _(),h("div",L,[s("div",T,[s("div",B,[s("div",M,[s("div",V,[Y,s("div",j,[s("a",D,[o(t,{icon:"fa-brands fa-periscope"}),O]),s("a",E,[o(t,{icon:"fa-solid fa-phone"}),G]),s("a",I,[o(t,{icon:"fa-solid fa-envelope"}),J])])])]),s("div",P,[s("div",q,[o(c,{to:"/",class:"footer-logo object-fit-cover"},{default:e(()=>[F]),_:1}),H,s("div",K,[s("a",Q,[o(t,{class:"tool-box-icon",icon:"fa-brands fa-facebook"})]),s("a",U,[o(t,{class:"tool-box-icon",icon:"fa-brands fa-line"})]),s("a",X,[o(t,{class:"tool-box-icon",icon:"fa-brands fa-instagram"})])])])]),Z]),s("div",ss,[os,s("p",ts,[a("非官方網站僅作練習使用，無任何商業用途"),as,o(c,{class:"ms-2",to:"/login"},{default:e(()=>[a("登入後台")]),_:1})])])])])}const _s=d(z,[["render",es]]);export{ds as N,_s as f};
