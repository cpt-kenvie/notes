const c="",l=async(t,o={})=>{const e=localStorage.getItem("token"),r={"Content-Type":"application/json"};e&&(r.Authorization=`Bearer ${e}`);const a=`${c}${t}`,n=await fetch(a,{...o,headers:{...r,...o.headers}}),s=await n.json();if(!n.ok)throw n.status===401&&(localStorage.removeItem("token"),localStorage.removeItem("isLoggedIn"),localStorage.removeItem("user"),window.location.href="/login"),new Error(s.message||"请求失败");return s},i=(t,o)=>{const e=t.__vccOpts||t;for(const[r,a]of o)e[r]=a;return e};export{i as _,l as r};
