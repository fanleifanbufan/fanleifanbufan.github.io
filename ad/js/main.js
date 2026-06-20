document.addEventListener("DOMContentLoaded",()=>{

// Scroll navbar effect
const nav=document.getElementById("navbar");
window.addEventListener("scroll",()=>{nav.classList.toggle("scrolled",window.scrollY>60)},{passive:true});

// Scroll reveal animations
const ob=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}})},{threshold:0.1});
document.querySelectorAll(".reveal").forEach(e=>ob.observe(e));

// Smooth scroll for anchor links
document.querySelectorAll("a[href^='#']").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault();const t=document.querySelector(a.getAttribute("href"));if(t)t.scrollIntoView({behavior:"smooth"})})});

// ======== Mobile Menu ========
const toggle=document.getElementById("menuToggle");
const overlay=document.getElementById("mobileOverlay");
const panel=document.getElementById("mobilePanel");

function openMenu(){toggle?.classList.add("active");overlay?.classList.add("active");panel?.classList.add("active");document.body.style.overflow="hidden"}
function closeMenu(){toggle?.classList.remove("active");overlay?.classList.remove("active");panel?.classList.remove("active");document.body.style.overflow=""}

toggle?.addEventListener("click",()=>{panel?.classList.contains("active")?closeMenu():openMenu()});
overlay?.addEventListener("click",closeMenu);
panel?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));

// ======== QR FAB (mobile only) ========
const fabBtn=document.getElementById("qrFab");
const fabModal=document.getElementById("qrFabModal");
fabBtn?.addEventListener("click",()=>fabModal?.classList.add("active"));
document.querySelector("#qrFabModal .btn")?.addEventListener("click",()=>fabModal?.classList.remove("active"));
fabModal?.addEventListener("click",e=>{if(e.target===fabModal)fabModal.classList.remove("active")});

});