import{_ as x,f as g,m as b,r as v,o as l,c as u,b as t,a as d,w as p,t as i,g as k,v as N,h as C,F as I,i as P,e as f,p as T,j as S}from"./index-Q3bsGleO.js";import{t as V}from"./toastMessage-NiZpQk4b.js";import{c as E}from"./cartStore-qsFxaMpO.js";var M={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"makeacoffee",BASE_URL:"/coffee_shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:y,VITE_PATH:w}=M,R={data(){return{product:{},productNum:1,sameProduct:[],sameCategory:"",pageId:this.$route.params.id}},methods:{getProduct(){const{id:s}=this.$route.params;g.get(`${y}/api/${w}/product/${s}`).then(e=>{this.product=e.data.product,this.sameCategory=this.product.category,this.getSameProduct(this.sameCategory)})},...b(E,["addToCart"]),...b(V,["pushMessage"]),getSameProduct(s){const{id:e}=this.$route.params;g.get(`${y}/api/${w}/products?category=${s}`).then(r=>{this.sameProduct=r.data.products.filter(h=>h.id!==e)}).catch(r=>{this.pushMessage({style:"danger",title:"沒有相同商品",content:r.response.data.message})})},changeQty(s){const e=this.productNum+s;this.changeNumber(e)},changeNumber(s){s>=10?(this.productNum=10,this.pushMessage({style:"danger",title:"數量不可超過10喔!"})):s<=1?(this.productNum=1,this.pushMessage({style:"danger",title:"數量不可低於1喔!"})):this.productNum=s}},watch:{$route(s){this.pageId=s.params.id,this.getProduct(this.pageId)}},mounted(){this.getProduct(this.$route.params.id)}},m=s=>(T("data-v-e4b9bb5b"),s=s(),S(),s),$={class:"container"},D={class:"row align-items-center"},L={class:"col-md-7"},U={id:"carouselExampleControls",class:"carousel slide","data-ride":"carousel"},j={class:"carousel-inner pdImg"},A={class:"carousel-item active"},B=["src"],Q={class:"col-md-5"},F={"aria-label":"breadcrumb"},H={class:"breadcrumb bg-white px-0 mb-0 py-3"},O={class:"breadcrumb-item"},q={class:"breadcrumb-item"},z=m(()=>t("li",{class:"breadcrumb-item active","aria-current":"page"},"Detail",-1)),G={class:"fw-bold h1 mb-1"},J={class:"mb-0 text-muted text-end"},K={class:"h4 fw-bold text-end"},W={class:"row align-items-center"},X={class:"col-6"},Y={class:"input-group my-3 bg-light rounded"},Z={class:"input-group-prepend"},tt={class:"input-group-append"},st={class:"col-6"},et={class:"row my-5"},ot={class:"col-md-4"},ct={class:"col-md-3"},it={class:"text-muted"},dt=m(()=>t("div",{class:"row justify-content-center bg-primary"},[t("div",{class:"col-12 col-sm-12 col-md-12 col-lg-2 mt-5 text-center"},[t("h2",{style:{color:"white"}},"類似商品")])],-1)),rt={class:"row justify-content-between px-2 py-4 bg-primary"},at={class:"card border-0 w-80 bg-primary"},nt={class:"pic w-100 px-2 overflow-hidden rounded-1"},lt=["src","alt"],ut=m(()=>t("div",{class:"over card-img-overlay"},[t("h3",{class:"link text-white"},"了解更多")],-1)),pt={class:"card-body px-5 py-2 text-center mt-2"},mt={class:"card-title mb-2 text-white"};function ht(s,e,r,h,o,a){const n=v("RouterLink"),_=v("font-awesome-icon");return l(),u("div",$,[t("div",D,[t("div",L,[t("div",U,[t("div",j,[t("div",A,[t("img",{src:o.product.imageUrl,class:"d-block w-100 object-fit-cover",alt:"..."},null,8,B)])])])]),t("div",Q,[t("nav",F,[t("ol",H,[t("li",O,[d(n,{class:"text-muted",to:"/"},{default:p(()=>[f("首頁")]),_:1})]),t("li",q,[d(n,{class:"text-muted",to:"/products"},{default:p(()=>[f("商店")]),_:1})]),z])]),t("h2",G,i(o.product.title),1),t("p",J,[t("del",null,"NT$"+i(o.product.origin_price),1)]),t("p",K,i(o.product.price),1),t("div",W,[t("div",X,[t("div",Y,[t("div",Z,[t("button",{class:"btn btn-outline-dark border-0 py-2",type:"button",id:"button-addon1",onClick:e[0]||(e[0]=c=>a.changeQty(-1))},[d(_,{icon:"fa-solid fa-minus"})])]),k(t("input",{type:"number",class:"form-control border-0 text-center my-auto shadow-none bg-light",max:"10",min:"1","onUpdate:modelValue":e[1]||(e[1]=c=>o.productNum=c),onChange:e[2]||(e[2]=c=>a.changeNumber(o.productNum))},null,544),[[N,o.productNum]]),t("div",tt,[t("button",{class:"btn btn-outline-dark border-0 py-2",type:"button",id:"button-addon2",onClick:e[3]||(e[3]=c=>a.changeQty(1))},[d(_,{icon:"fa-solid fa-plus"})])])])]),t("div",st,[t("a",{class:"text-nowrap btn btn-dark w-100 py-2",onClick:e[4]||(e[4]=C(c=>s.addToCart(o.product.id),["prevent"]))},"加入購物車")])])])]),t("div",et,[t("div",ot,[t("p",null,i(o.product.description),1)]),t("div",ct,[t("p",it,i(o.product.content),1)])]),dt,t("div",rt,[(l(!0),u(I,null,P(o.sameProduct,c=>(l(),u("div",{class:"col-12 col-lg-3 col-md-3 col-sm-12 mb-2",key:c.id},[d(n,{to:`/product/${c.id}`,class:"link text-primary"},{default:p(()=>[t("div",at,[t("div",nt,[t("img",{src:c.imageUrl,class:"card-img w-100 object-fit-cover overflow-hidden",height:"200px",alt:c.title},null,8,lt)]),ut,t("div",pt,[t("h5",mt,i(c.title),1)])])]),_:2},1032,["to"])]))),128))])])}const vt=x(R,[["render",ht],["__scopeId","data-v-e4b9bb5b"]]);export{vt as default};