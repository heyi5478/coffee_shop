import{_ as a,f as l,m as u,r as p,o as m,c as _,b as t,t as i,a as r,g as h,v as b,h as v,d as f}from"./index-9gRIAst2.js";import{c as g}from"./cartStore-idNkF8Cn.js";var x={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"makeacoffee",BASE_URL:"/coffee_shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:w,VITE_PATH:y}=x,N={data(){return{product:{},productNum:1}},methods:{getProduct(){const{id:e}=this.$route.params;l.get(`${w}/api/${y}/product/${e}`).then(s=>{console.log(s),this.product=s.data.product})},...u(g,["addToCart"]),changeQty(e){const s=this.productNum+e;this.changeNumber(s)},changeNumber(e){e>=10?(this.productNum=10,this.$bus.$emit("message:push","數量不可超過10喔!","info")):e<=1?(this.productNum=1,this.$bus.$emit("message:push","數量不可低於1喔!","info")):this.productNum=e}},mounted(){console.log(this.$route),this.getProduct()}},k={class:"container"},T={class:"row align-items-center"},V={class:"col-md-7"},E={id:"carouselExampleControls",class:"carousel slide","data-ride":"carousel"},C={class:"carousel-inner"},D={class:"carousel-item active"},P=["src"],S={class:"col-md-5"},$=f('<nav aria-label="breadcrumb"><ol class="breadcrumb bg-white px-0 mb-0 py-3"><li class="breadcrumb-item"><a class="text-muted" href="./index.html">首頁</a></li><li class="breadcrumb-item"><a class="text-muted" href="./product.html">商店</a></li><li class="breadcrumb-item active" aria-current="page">Detail</li></ol></nav>',1),R={class:"fw-bold h1 mb-1"},U=t("p",{class:"mb-0 text-muted text-end"},[t("del",null,"NT$1,200")],-1),A={class:"h4 fw-bold text-end"},B={class:"row align-items-center"},I={class:"col-6"},L={class:"input-group my-3 bg-light rounded"},M={class:"input-group-prepend"},Q={class:"input-group-append"},H={class:"col-6"},O={class:"row my-5"},j={class:"col-md-4"},q={class:"col-md-3"},z={class:"text-muted"};function F(e,s,G,J,o,n){const d=p("font-awesome-icon");return m(),_("div",k,[t("div",T,[t("div",V,[t("div",E,[t("div",C,[t("div",D,[t("img",{src:o.product.imageUrl,class:"d-block w-100 object-fit-cover",alt:"..."},null,8,P)])])])]),t("div",S,[$,t("h2",R,i(o.product.title),1),U,t("p",A,i(o.product.price),1),t("div",B,[t("div",I,[t("div",L,[t("div",M,[t("button",{class:"btn btn-outline-dark border-0 py-2",type:"button",id:"button-addon1",onClick:s[0]||(s[0]=c=>n.changeQty(-1))},[r(d,{icon:"fa-solid fa-minus"})])]),h(t("input",{type:"number",class:"form-control border-0 text-center my-auto shadow-none bg-light",max:"10",min:"1","onUpdate:modelValue":s[1]||(s[1]=c=>o.productNum=c),onChange:s[2]||(s[2]=c=>n.changeNumber(o.productNum))},null,544),[[b,o.productNum]]),t("div",Q,[t("button",{class:"btn btn-outline-dark border-0 py-2",type:"button",id:"button-addon2",onClick:s[3]||(s[3]=c=>n.changeQty(1))},[r(d,{icon:"fa-solid fa-plus"})])])])]),t("div",H,[t("a",{class:"text-nowrap btn btn-dark w-100 py-2",onClick:s[4]||(s[4]=v(c=>e.addToCart(o.product.id),["prevent"]))},"加入購物車")])])])]),t("div",O,[t("div",j,[t("p",null,i(o.product.description),1)]),t("div",q,[t("p",z,i(o.product.content),1)])])])}const X=a(N,[["render",F]]);export{X as default};
