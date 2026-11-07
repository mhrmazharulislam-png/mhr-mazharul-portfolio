const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.gallery-section').forEach(sec=>{sec.classList.toggle('hidden',f!=='all'&&sec.dataset.section!==f);});});});
const lightbox=document.getElementById('lightbox');const lightboxImg=document.getElementById('lightbox-img');const lightboxCaption=document.getElementById('lightbox-caption');const lightboxCounter=document.getElementById('lightbox-counter');let popupList=[];let popupIndex=0;
function openPopup(i){popupIndex=i;const t=popupList[popupIndex];lightboxImg.src=t.dataset.full;lightboxImg.alt=t.dataset.title;lightboxCaption.textContent=t.dataset.title+' — '+t.dataset.category;lightboxCounter.textContent=(popupIndex+1)+' / '+popupList.length;lightboxImg.style.animation='none';void lightboxImg.offsetWidth;lightboxImg.style.animation='';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}
function stepPopup(d){openPopup((popupIndex+d+popupList.length)%popupList.length);}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');}
document.querySelectorAll('.gallery-thumb').forEach(thumb=>{thumb.addEventListener('click',()=>{popupList=[...document.querySelectorAll('.gallery-thumb')].filter(t=>!t.closest('.gallery-section').classList.contains('hidden'));openPopup(popupList.indexOf(thumb));});});
document.getElementById('lightbox-close').addEventListener('click',closeLightbox);document.getElementById('lightbox-prev').addEventListener('click',e=>{e.stopPropagation();stepPopup(-1);});document.getElementById('lightbox-next').addEventListener('click',e=>{e.stopPropagation();stepPopup(1);});lightbox.addEventListener('click',e=>{if(e.target===lightbox){closeLightbox();}});document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape'){closeLightbox();}if(e.key==='ArrowLeft'){stepPopup(-1);}if(e.key==='ArrowRight'){stepPopup(1);}});

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.target.classList.contains('work-section')){if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}}else{e.target.classList.toggle('visible',e.isIntersecting);}});},{threshold:.12});
document.querySelectorAll('.work-section,.reviews-section,.services-section,.about-section,.contact-section,.intro-strip').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});

const reviewsTrack=document.getElementById('reviews-track');
document.getElementById('reviews-prev').addEventListener('click',()=>{reviewsTrack.scrollBy({left:-360,behavior:'smooth'});});
document.getElementById('reviews-next').addEventListener('click',()=>{reviewsTrack.scrollBy({left:360,behavior:'smooth'});});
const reviewsSection=document.getElementById('reviews');
const reviewCards=[...reviewsTrack.children];
reviewCards.forEach(c=>reviewsTrack.appendChild(c.cloneNode(true)));
let marqueeRaf=null;let marqueeRunning=false;
function marqueeTick(){reviewsTrack.scrollLeft+=0.7;const half=reviewsTrack.scrollWidth/2;if(reviewsTrack.scrollLeft>=half){reviewsTrack.scrollLeft-=half;}marqueeRaf=requestAnimationFrame(marqueeTick);}
function startMarquee(){if(marqueeRunning||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;marqueeRunning=true;marqueeRaf=requestAnimationFrame(marqueeTick);}
function stopMarquee(){marqueeRunning=false;cancelAnimationFrame(marqueeRaf);}
new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){startMarquee();}else{stopMarquee();}});},{threshold:.1}).observe(reviewsSection);
reviewsTrack.addEventListener('mouseenter',stopMarquee);
reviewsTrack.addEventListener('mouseleave',startMarquee);
const reviewsDots=document.getElementById('reviews-dots');
const dots=[];
function reviewPitch(){return reviewCards[1]?reviewCards[1].offsetLeft-reviewCards[0].offsetLeft:358;}
for(let i=0;i<reviewCards.length;i++){const d=document.createElement('button');d.className='reviews-dot';d.setAttribute('aria-label','Go to review '+(i+1));d.addEventListener('click',()=>{reviewsTrack.scrollTo({left:i*reviewPitch(),behavior:'smooth'});});reviewsDots.appendChild(d);dots.push(d);}
function updateDots(){let idx=Math.round(reviewsTrack.scrollLeft/reviewPitch())%dots.length;if(idx<0)idx+=dots.length;dots.forEach((d,j)=>d.classList.toggle('active',j===idx));}
reviewsTrack.addEventListener('scroll',()=>{requestAnimationFrame(updateDots);},{passive:true});
updateDots();

const galleryCards=document.querySelectorAll('.gallery-card');
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
const cardObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{const el=e.target;const idx=[...el.parentElement.children].indexOf(el);if(e.isIntersecting){el.style.transitionDelay=(idx%3*120)+'ms';el.classList.add('card-in');setTimeout(()=>{el.style.transitionDelay='';},1250);}else{el.classList.remove('card-in');}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
galleryCards.forEach(c=>cardObserver.observe(c));
}else{galleryCards.forEach(c=>c.classList.add('card-in'));}
