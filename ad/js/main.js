document.addEventListener("DOMContentLoaded",()=>{
const nav=document.getElementById("navbar");
window.addEventListener("scroll",()=>{nav.classList.toggle("scrolled",window.scrollY>60)},{passive:true});
const ob=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}})},{threshold:0.1});
document.querySelectorAll(".reveal").forEach(e=>ob.observe(e));
document.querySelectorAll("a[href^='#']").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault();const t=document.querySelector(a.getAttribute("href"));if(t)t.scrollIntoView({behavior:"smooth"})})})});