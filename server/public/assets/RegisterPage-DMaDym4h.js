import{u as _,r as i,c as h,a as e,w as g,b as u,v as c,t as b,e as y,o as k,f as w}from"./index-Bzc35kCV.js";import{_ as S,r as x}from"./_plugin-vue_export-helper-ByqkmB3O.js";const V={class:"register-container"},I={class:"register-card"},T={class:"form-group"},B=["disabled"],C={class:"form-group"},L=["disabled"],N={class:"form-group"},P=["disabled"],R={class:"form-group"},U=["disabled"],M=["disabled"],O={class:"login-link"},D={__name:"RegisterPage",setup(J){const r=_(),v=w(),n=i(""),a=i(""),p=i(""),d=i(""),t=i(!1),m=async()=>{if(!n.value||!a.value||!d.value){r.error("请填写完整信息");return}if(a.value!==p.value){r.error("两次密码输入不一致");return}if(a.value.length<6){r.error("密码长度至少6位");return}t.value=!0;try{const l=await x("/api/auth/register",{method:"POST",body:JSON.stringify({username:n.value,password:a.value,email:d.value})});localStorage.setItem("token",l.token),localStorage.setItem("user",JSON.stringify(l.user)),localStorage.setItem("isLoggedIn","true"),localStorage.setItem("username",l.user.username),r.success("注册成功"),setTimeout(()=>{v.push("/")},500)}catch{r.error("注册失败")}finally{t.value=!1}},f=()=>{v.push("/login")};return(l,s)=>(k(),h("div",V,[s[6]||(s[6]=e("a",{href:"https://github.com/cpt-kenvie/notes",target:"_blank",rel:"noopener noreferrer",class:"github-link"},[e("svg",{class:"icon",viewBox:"0 0 24 24",fill:"currentColor"},[e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"})])],-1)),e("div",I,[s[5]||(s[5]=e("div",{class:"register-header"},[e("img",{src:"https://img.keai.cool/2024/07/1/668a957f2a02f.png",alt:"Logo",class:"logo"}),e("h1",null,"创建账号")],-1)),e("form",{class:"register-form",onSubmit:g(m,["prevent"])},[e("div",T,[u(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>n.value=o),type:"text",placeholder:"用户名",disabled:t.value},null,8,B),[[c,n.value]])]),e("div",C,[u(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>d.value=o),type:"email",placeholder:"邮箱",disabled:t.value},null,8,L),[[c,d.value]])]),e("div",N,[u(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>a.value=o),type:"password",placeholder:"密码",disabled:t.value},null,8,P),[[c,a.value]])]),e("div",R,[u(e("input",{"onUpdate:modelValue":s[3]||(s[3]=o=>p.value=o),type:"password",placeholder:"确认密码",disabled:t.value},null,8,U),[[c,p.value]])]),e("button",{type:"submit",class:"register-btn",disabled:t.value},b(t.value?"注册中...":"注册"),9,M),e("div",O,[s[4]||(s[4]=y(" 已有账号？ ")),e("a",{href:"#",onClick:g(f,["prevent"])},"去登录")])],32)])]))}},A=S(D,[["__scopeId","data-v-0fbc5dd5"]]);export{A as default};
