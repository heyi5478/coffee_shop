import{p as c,f as a}from"./index-9gRIAst2.js";var i={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"makeacoffee",BASE_URL:"/coffee_shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:o,VITE_PATH:e}=i,d=c("cartStore",{state:()=>({carts:[],final_total:0,total:0}),actions:{getCart(){a.get(`${o}/api/${e}/cart`).then(t=>{this.carts=t.data.data.carts,this.final_total=t.data.data.final_total,this.total=t.data.data.total,console.log("pinia cart",this.carts)})},addToCart(t){const s={product_id:t,qty:1};a.post(`${o}/api/${e}/cart`,{data:s}).then(r=>{console.log(r),this.getCart()})}}});export{d as c};
