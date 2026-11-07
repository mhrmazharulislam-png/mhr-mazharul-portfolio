const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.gallery-section').forEach(sec=>{sec.classList.toggle('hidden',f!=='all'&&sec.dataset.section!==f);});});});
const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');const lightboxCaption=document.getElementById('lightbox-caption');function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');}
document.querySelectorAll('.gallery-thumb').forEach(thumb=>{thumb.addEventListener('click',()=>{lightboxImg.src=thumb.dataset.full;lightboxImg.alt=thumb.dataset.title;lightboxCaption.textContent=thumb.dataset.title+' — '+thumb.dataset.category;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');});});
document.getElementById('lightbox-close').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox){closeLightbox();}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();}});

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.work-section,.reviews-section,.services-section,.about-section,.contact-section,.intro-strip').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});

const reviewsTrack=document.getElementById('reviews-track');
document.getElementById('reviews-prev').addEventListener('click',()=>{reviewsTrack.scrollBy({left:-360,behavior:'smooth'});});
document.getElementById('reviews-next').addEventListener('click',()=>{reviewsTrack.scrollBy({left:360,behavior:'smooth'});});
