import{_ as h,m as g,r as n,o as v,c as b,a,b as s,h as w,g as d,v as m,F as x}from"./index-9gRIAst2.js";import{t as E}from"./toastMessage-WvHTHcT-.js";import{T as L}from"./ToastMessages-pwTfdeSm.js";import{N as V,f as M}from"./footerComponent-v_vz5ACG.js";import"./cartStore-idNkF8Cn.js";var T={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"makeacoffee",BASE_URL:"/coffee_shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:y}=T,k={components:{NavbarComponent:V,footerComponent:M,ToastMessages:L},data(){return{isLoading:!1,user:{}}},methods:{...g(E,["pushMessage"]),signIn(){const i=`${y}/admin/signin`;this.isLoading=!0,this.$http.post(i,this.user).then(e=>{const{token:r,expired:c}=e.data;document.cookie=`hexToken=${r};expires=${new Date(c)};`,this.isLoading=!1,this.$router.push("/admin/products"),this.pushMessage({title:"登入成功"})}).catch(e=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"登入失敗",content:e.response.data.message})})}}},C={class:"container mt-5 mb-5 text-center"},I={class:"col-md-6"},N=s("h1",{class:"h3 mb-3 font-weight-normal"},"管理員登入",-1),P={class:"mb-2"},D=s("label",{for:"inputEmail",class:"sr-only"},"Email address",-1),R={class:"mb-2"},U=s("label",{for:"inputPassword",class:"sr-only"},"Password",-1),B=s("div",{class:"text-center mt-4"},[s("button",{class:"btn btn-lg btn-primary btn-block",type:"submit"}," 登入 ")],-1);function S(i,e,r,c,o,l){const p=n("NavbarComponent"),u=n("VueLoading"),_=n("ToastMessages"),f=n("footerComponent");return v(),b(x,null,[a(p),s("div",C,[a(u,{active:o.isLoading,"z-index":1060},null,8,["active"]),a(_),s("form",{class:"row justify-content-center",onSubmit:e[2]||(e[2]=w((...t)=>l.signIn&&l.signIn(...t),["prevent"]))},[s("div",I,[N,s("div",P,[D,d(s("input",{type:"email",id:"inputEmail",class:"form-control",placeholder:"Email address","onUpdate:modelValue":e[0]||(e[0]=t=>o.user.username=t),required:"",autofocus:""},null,512),[[m,o.user.username]])]),s("div",R,[U,d(s("input",{type:"password",id:"inputPassword",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=t=>o.user.password=t),placeholder:"Password",required:""},null,512),[[m,o.user.password]])]),B])],32)]),a(f)],64)}const j=h(k,[["render",S]]);export{j as default};
