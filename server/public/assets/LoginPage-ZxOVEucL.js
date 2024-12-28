import{u as f,r as i,c as b,a as e,w as v,b as u,v as p,d as _,t as h,e as S,o as k,f as x}from"./index-Bzc35kCV.js";import{_ as y,r as w}from"./_plugin-vue_export-helper-ByqkmB3O.js";const C={class:"login-container"},I={class:"login-card"},L={class:"form-group"},N=["disabled"],T={class:"form-group"},V=["disabled"],M={class:"remember-me"},O={class:"checkbox-label"},B=["disabled"],J=["disabled"],P={class:"register-link"},U={__name:"LoginPage",setup(D){const d=f(),c=x(),l=i(""),r=i(""),n=i(!1),o=i(!1);(()=>{const t=localStorage.getItem("savedCredentials");if(t){const{username:s,password:a}=JSON.parse(t);l.value=s,r.value=a,n.value=!0}})();const g=async()=>{if(!l.value||!r.value){d.error("请输入账号和密码");return}o.value=!0;try{const t=await w("/api/auth/login",{method:"POST",body:JSON.stringify({username:l.value,password:r.value})});n.value?localStorage.setItem("savedCredentials",JSON.stringify({username:l.value,password:r.value})):localStorage.removeItem("savedCredentials"),localStorage.setItem("token",t.token),localStorage.setItem("user",JSON.stringify(t.user)),localStorage.setItem("isLoggedIn","true"),localStorage.setItem("username",t.user.username),d.success("登录成功"),setTimeout(()=>{c.push("/")},500)}catch{d.error("登录失败")}finally{o.value=!1}},m=()=>{c.push("/register")};return(t,s)=>(k(),b("div",C,[s[6]||(s[6]=e("a",{href:"https://github.com/cpt-kenvie/notes",target:"_blank",rel:"noopener noreferrer",class:"github-link"},[e("svg",{class:"icon",viewBox:"0 0 24 24",fill:"currentColor"},[e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"})])],-1)),e("div",I,[s[5]||(s[5]=e("div",{class:"login-header"},[e("img",{src:"https://img.keai.cool/2024/07/1/668a957f2a02f.png",alt:"Logo",class:"logo"}),e("h1",null,"欢迎回来")],-1)),e("form",{class:"login-form",onSubmit:v(g,["prevent"])},[e("div",L,[u(e("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>l.value=a),type:"text",placeholder:"账号",disabled:o.value},null,8,N),[[p,l.value]])]),e("div",T,[u(e("input",{"onUpdate:modelValue":s[1]||(s[1]=a=>r.value=a),type:"password",placeholder:"密码",disabled:o.value},null,8,V),[[p,r.value]])]),e("div",M,[e("label",O,[u(e("input",{type:"checkbox","onUpdate:modelValue":s[2]||(s[2]=a=>n.value=a),disabled:o.value},null,8,B),[[_,n.value]]),s[3]||(s[3]=e("span",{class:"checkbox-text"},"记住密码",-1))])]),e("button",{type:"submit",class:"login-btn",disabled:o.value},h(o.value?"登录中...":"登录"),9,J)],32),e("div",P,[s[4]||(s[4]=S(" 还没有账号？ ")),e("a",{href:"#",onClick:v(m,["prevent"])},"去注册")])])]))}},A=y(U,[["__scopeId","data-v-ef051512"]]);export{A as default};