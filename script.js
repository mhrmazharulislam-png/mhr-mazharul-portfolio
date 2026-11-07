const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.gallery-section').forEach(sec=>{sec.classList.toggle('hidden',f!=='all'&&sec.dataset.section!==f);});});});
const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');const lightboxCaption=document.getElementById('lightbox-caption');const lightboxCounter=document.getElementById('lightbox-counter');let popupList=[];let popupIndex=0;
function openPopup(i){popupIndex=i;const t=popupList[popupIndex];lightboxImg.src=t.dataset.full;lightboxImg.alt=t.dataset.title;lightboxCaption.textContent=t.dataset.title+' — '+t.dataset.category;lightboxCounter.textContent=(popupIndex+1)+' / '+popupList.length;lightboxImg.style.animation='none';void lightboxImg.offsetWidth;lightboxImg.style.animation='';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}
function stepPopup(d){openPopup((popupIndex+d+popupList.length)%popupList.length);}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');}
document.querySelectorAll('.gallery-thumb').forEach(thumb=>{thumb.addEventListener('click',()=>{popupList=[...document.querySelectorAll('.gallery-thumb')].filter(t=>!t.closest('.gallery-section').classList.contains('hidden'));openPopup(popupList.indexOf(thumb));});});
document.getElementById('lightbox-close').addEventListener('click',closeLightbox);document.getElementById('lightbox-prev').addEventListener('click',e=>{e.stopPropagation();stepPopup(-1);});document.getElementById('lightbox-next').addEventListener('click',e=>{e.stopPropagation();stepPopup(1);});lightbox.addEventListener('click',e=>{if(e.target===lightbox){closeLightbox();}});document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape'){closeLightbox();}if(e.key==='ArrowLeft'){stepPopup(-1);}if(e.key==='ArrowRight'){stepPopup(1);}});

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.work-section,.reviews-section,.services-section,.about-section,.contact-section,.intro-strip').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});

const reviewsTrack=document.getElementById('reviews-track');
document.getElementById('reviews-prev').addEventListener('click',()=>{reviewsTrack.scrollBy({left:-360,behavior:'smooth'});});
document.getElementById('reviews-next').addEventListener('click',()=>{reviewsTrack.scrollBy({left:360,behavior:'smooth'});});

const galleryCards=document.querySelectorAll('.gallery-card');
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
const cardObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target;const idx=[...el.parentElement.children].indexOf(el);el.style.transitionDelay=(idx%3*90)+'ms';el.classList.add('card-in');cardObserver.unobserve(el);setTimeout(()=>{el.style.transitionDelay='';},850);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
galleryCards.forEach(c=>cardObserver.observe(c));
}else{galleryCards.forEach(c=>c.classList.add('card-in'));}
