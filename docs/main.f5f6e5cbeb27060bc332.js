(()=>{"use strict";var e={d:(t,o)=>{for(var a in o)e.o(o,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:o[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{L:()=>i});class t{static fromJson({id:e,tarea:o,completado:a,creado:s}){const d=new t(o);return d.id=e,d.completado=a,d.creado=s,d}constructor(e){this.tarea=e,this.id=(new Date).getTime(),this.completado=!1,this.creado=new Date}}const o=document.querySelector(".todo-list"),a=document.querySelector(".new-todo"),s=document.querySelector(".clear-completed"),d=document.querySelector(".filters"),l=e=>{const t=`\n     <li class="${e.completado?"completed":""}" data-id="${e.id}">\n       <div class="view">\n \t<input class="toggle" type="checkbox" ${e.completado?"checked":""}>\n \t<label>${e.tarea}</label>\n \t<button class="destroy"></button>\n       </div>\n       <input class="edit" value="Create a TodoMVC template">\n     </li>`,a=document.createElement("div");return a.innerHTML=t,o.append(a.firstElementChild),a.firstElementChild};a.addEventListener("keyup",(e=>{if(13===e.keyCode&&a.value.length>0){const e=new t(a.value);i.nuevoTodo(e),l(e),a.value=""}}));const c=e=>{const t=o.querySelector(`[data-id="${e}"]`);i.eliminarTodo(e),o.removeChild(t)};o.addEventListener("click",(e=>{const t=e.target.parentElement.parentElement.getAttribute("data-id"),a={input:()=>{var e;e=t,i.marcarCompletado(e),o.querySelector(`[data-id="${e}"]`).classList.toggle("completed")},button:()=>{c(t)},default:()=>{console.log("Not valid input")}};(a[e.target.localName]||a.default)()})),s.addEventListener("click",(()=>{i.todos.forEach((e=>{e.completado&&c(e.id)}))}));const r=e=>{const t=o.children;for(const o of t)e(o)?o.classList.remove("hidden"):o.classList.add("hidden")};d.addEventListener("click",(e=>{const t=e.target.text;if(!t)return;d.querySelector(".selected").classList.remove("selected"),e.target.classList.add("selected");const o={Todos:()=>r((()=>!0)),Pendientes:()=>{r((e=>!e.className.includes("completed")))},Completados:()=>{r((e=>e.className.includes("completed")))},default:()=>console.log("Invalid Listener")};(o[t]||o.default)()}));const i=new class{constructor(){this.cargarLocalStorage()}nuevoTodo(e){this.todos.push(e),this.guardarLocalStorage()}eliminarTodo(e){this.todos=this.todos.filter((t=>t.id!=e)),this.guardarLocalStorage()}marcarCompletado(e){this.todos.forEach((t=>{t.id==e&&(t.completado=!t.completado)})),this.guardarLocalStorage()}eliminarCompletados(){this.todos=this.todos.filter((e=>!e.completado))}guardarLocalStorage(){localStorage.setItem("todos",JSON.stringify(this.todos))}cargarLocalStorage(){this.todos=JSON.parse(localStorage.getItem("todos"))||[],this.todos=this.todos.map(t.fromJson),console.log(this.todos)}};i.todos.forEach(l)})();