document.addEventListener("DOMContentLoaded",()=>{
const c=document.getElementById("heroCanvas");
if(c){const t=c.getContext("2d");let p=[];
function r(){c.width=window.innerWidth,c.height=window.innerHeight}
class P{constructor(){this.reset()}reset(){this.x=Math.random()*c.width,this.y=Math.random()*c.height,this.s=Math.random()*2.5+0.5,this.sy=-(Math.random()*0.3+0.1),this.o=Math.random()*0.2+0.05,this.ps=Math.random()*6}
update(){this.y+=this.sy;this.ps+=0.02;this.o+=Math.sin(this.ps)*0.002;this.o=Math.max(0.02,Math.min(0.25,this.o));if(this.y<-10){this.reset();this.y=c.height+10}}
draw(){t.beginPath();t.arc(this.x,this.y,this.s,0,Math.PI*2);t.fillStyle="rgba(0,0,0,"+this.o+")";t.fill()}}
function init(){let cnt=Math.min(Math.floor(c.width*0.025),40);p=Array.from({length:cnt},()=>new P())}
function a(){t.clearRect(0,0,c.width,c.height);p.forEach(e=>{e.update();e.draw()});requestAnimationFrame(a)}
r();init();a();window.addEventListener("resize",()=>{r();init()})}

const nav=document.getElementById("navbar");
window.addEventListener("scroll",()=>{nav.classList.toggle("scrolled",window.scrollY>60)},{passive:true});

const ob=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}})},{threshold:0.1});
document.querySelectorAll(".reveal").forEach(e=>ob.observe(e));

document.querySelectorAll("a[href^="#"]").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault();const t=document.querySelector(a.getAttribute("href"));if(t)t.scrollIntoView({behavior:"smooth"})})})});