import{r as _,o as u,n as D,g as k,p as V,c as v,a as e,t as r,q as g,i as B,T as S,s as z,f as M,m as E,u as I,h as L,x as q,F as b,y as F,w as H}from"./index-Bzc35kCV.js";import{_ as x,r as w}from"./_plugin-vue_export-helper-ByqkmB3O.js";function R(i){return{all:i=i||new Map,on:function(o,s){var t=i.get(o);t?t.push(s):i.set(o,[s])},off:function(o,s){var t=i.get(o);t&&(s?t.splice(t.indexOf(s)>>>0,1):i.set(o,[]))},emit:function(o,s){var t=i.get(o);t&&t.slice().map(function(a){a(s)}),(t=i.get("*"))&&t.slice().map(function(a){a(o,s)})}}}const C=R(),A={key:0,class:"dialog-overlay"},O={class:"dialog-container"},U={class:"dialog-content"},j={class:"dialog-header"},G={class:"dialog-title"},J={class:"dialog-body"},K={class:"dialog-message",style:{"white-space":"pre-line"}},Q={class:"dialog-actions"},W={__name:"ConfirmDialog",setup(i,{expose:o}){const s=_(!1),t=_({title:"⚠️确认",message:"",confirmText:"确定",cancelText:"取消",type:"default"});let a=null;const p=f=>(t.value={...t.value,...f},s.value=!0,new Promise(h=>{a=h})),m=()=>{s.value=!1,a==null||a(!0)},d=()=>{s.value=!1,a==null||a(!1)};return o({show:p}),(f,h)=>(u(),D(z,{to:"body"},[k(S,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"transform scale-95 opacity-0","enter-to-class":"transform scale-100 opacity-100","leave-active-class":"transition duration-200 ease-in","leave-from-class":"transform scale-100 opacity-100","leave-to-class":"transform scale-95 opacity-0"},{default:V(()=>[s.value?(u(),v("div",A,[e("div",{class:"dialog-backdrop",onClick:d}),e("div",O,[e("div",U,[e("div",j,[e("h3",G,r(t.value.title),1),e("button",{class:"close-btn",onClick:d},"×")]),e("div",J,[e("div",{class:g(["warning-icon",t.value.type])},r(t.value.type==="danger"?"删除确认？":"确认操作？"),3),e("p",K,r(t.value.message),1)]),e("div",Q,[e("button",{class:"dialog-btn dialog-btn-cancel",onClick:d},r(t.value.cancelText),1),e("button",{class:g(["dialog-btn",[t.value.type==="danger"?"dialog-btn-danger":"dialog-btn-confirm"]]),onClick:m},r(t.value.confirmText),3)])])])])):B("",!0)]),_:1})]))}},X=x(W,[["__scopeId","data-v-cb051b5c"]]),Y={class:"sidebar"},Z={class:"notes-list"},P={key:0,class:"notes-grid"},ee=["onClick"],te={class:"note-title"},se={class:"note-preview"},ae={class:"note-meta"},oe={class:"note-date"},ne=["onClick"],ie={key:1,class:"empty-state"},le={__name:"TheSidebar",setup(i){const o=M(),s=E(),t=_([]),a=_(null),p=I(),m=_(null),d=async()=>{try{const n=await w("/api/notes");t.value=n.notes,s.name==="note"&&(a.value=parseInt(s.params.id))}catch(n){console.error("获取笔记列表失败:",n),p.error("获取笔记列表失败")}},f=()=>{d()};L(()=>{d(),C.on("notes-updated",f)}),q(()=>{C.off("notes-updated",f)});const h=n=>new Date(n).toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric"}),T=n=>{a.value=n.id,o.push(`/notes/${n.id}`)},$=()=>{o.push("/notes/new")},N=async n=>{var l;if(await((l=m.value)==null?void 0:l.show({title:"删除笔记",message:"确定要删除这篇笔记吗？此操作不可恢复。",confirmText:"删除",cancelText:"取消",type:"danger"})))try{await w(`/api/notes/${n.id}`,{method:"DELETE"}),p.success("笔记已删除"),s.params.id===n.id.toString()&&o.push("/"),d()}catch{p.error("删除失败")}};return(n,c)=>(u(),v(b,null,[e("div",Y,[e("div",{class:"sidebar-header"},[c[1]||(c[1]=e("h2",null,"我的笔记",-1)),e("button",{class:"new-note-btn",onClick:$},c[0]||(c[0]=[e("span",null,"新建笔记",-1)]))]),e("div",Z,[t.value&&t.value.length>0?(u(),v("div",P,[(u(!0),v(b,null,F(t.value,l=>(u(),v("div",{key:l.id,class:g(["note-item",{active:a.value===l.id}])},[e("div",{class:"note-content",onClick:y=>T(l)},[e("h3",te,r(l.title),1),e("p",se,r(l.content),1),e("div",ae,[e("span",oe,r(h(l.updated_at)),1)])],8,ee),e("button",{class:"delete-btn",onClick:H(y=>N(l),["stop"]),title:"删除笔记"},c[2]||(c[2]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"icon",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z","clip-rule":"evenodd"})],-1)]),8,ne)],2))),128))])):(u(),v("div",ie,c[3]||(c[3]=[e("p",null,"还没有笔记，开始创建吧！",-1)])))])]),k(X,{ref_key:"confirmDialog",ref:m},null,512)],64))}},de=x(le,[["__scopeId","data-v-cc7c64f3"]]);export{de as T,C as e};