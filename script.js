const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// year
$("#year").textContent = new Date().getFullYear();

// mobile menu toggle
const menuBtn = $("#menuBtn");
const nav = $("#nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

// close menu when clicking a link
$$(".nav-link").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// typing effect
const typingEl = $("#typing");
const words = ["Web Developer", "UI Designer", "JavaScript Builder", "Student"];
let wi = 0, ci = 0, del = false;

function typeLoop(){
  const w = words[wi];
  if(!del){
    typingEl.textContent = w.slice(0, ci++);
    if(ci > w.length + 10) del = true;
  }else{
    typingEl.textContent = w.slice(0, ci--);
    if(ci < 0){
      del = false;
      wi = (wi + 1) % words.length;
      ci = 0;
    }
  }
  setTimeout(typeLoop, del ? 45 : 70);
}
typeLoop();

// reveal on scroll
const reveals = $$(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("show");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// active nav highlight (top nav + bottom bar)
const sectionIds = ["home","about","links","contact"];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

function setActive(id){
  $$(".nav-link").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  $$(".bb-link").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
}

function onScroll(){
  const pos = window.scrollY + 130;
  let current = "home";
  for(const sec of sections){
    if(sec.offsetTop <= pos) current = sec.id;
  }
  setActive(current);
}
window.addEventListener("scroll", onScroll);
onScroll();

// contact form demo
const form = $("#contactForm");
const note = $("#formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const msg = $("#message").value.trim();

  if(!name || !email || !msg){
    note.textContent = "Please fill in all fields.";
    return;
  }
  form.reset();
  note.textContent = "✅ Message sent (demo). Later we can connect it to Gmail/Google Sheets.";
  setTimeout(() => note.textContent = "", 3000);
});

// download CV (simple .txt placeholder)
const downloadCV = $("#downloadCV");
downloadCV.addEventListener("click", (e) => {
  e.preventDefault();
  const cv =
`Murad Ahmmed Simanto — CV

Email: muradahmmedsimanto@gmail.com
Institute: Daffodil Polytechnic Institute
Department: Computer Science

Links:
- Website: https://tinyurl.com/Murad-Ai
- Facebook: https://www.facebook.com/share/1BkmjWtpBV/
- Instagram: https://www.instagram.com/muradahmmedsimanto
- LinkedIn: https://www.linkedin.com/in/murad-ahmmed-simanto-9a1884380

Summary:
Computer Science student. I build modern websites, clean UI, and small JavaScript tools.
`;
  const blob = new Blob([cv], {type:"text/plain"});
  const url = URL.createObjectURL(blob);

  downloadCV.setAttribute("href", url);
  downloadCV.setAttribute("download", "Murad_Ahmmed_Simanto_CV.txt");
  downloadCV.click();

  setTimeout(() => URL.revokeObjectURL(url), 600);
});
