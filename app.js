const views=[...document.querySelectorAll('.view')];
const navLinks=[...document.querySelectorAll('#sidebar a[href^="#"]')];
const sidebar=document.querySelector('#sidebar');
const menu=document.querySelector('#menu-toggle');
function route(){
  const aliases={overview:'report00',systems:'report04',sources:'report00'};
  let requested;
  try{requested=decodeURIComponent(location.hash.slice(1)||'report00')}catch{requested='report00'}
  requested=aliases[requested]||requested;
  const target=document.getElementById(requested);
  const section=target?.closest('.view')||document.getElementById('report00');
  document.querySelectorAll('video').forEach(v=>v.pause());
  views.forEach(v=>v.hidden=v!==section);
  const navId=section.id.startsWith('B')?'report07':section.id;
  navLinks.forEach(a=>{const active=a.hash==='#'+navId;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  document.title=(section.querySelector('h1')?.textContent||'关卡总览')+' · Mountain Trek';
  sidebar.classList.remove('open');menu.setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});
  if(target&&target!==section)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
}
window.addEventListener('hashchange',route);route();
menu.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.prose table').forEach(t=>{const wrap=document.createElement('div');wrap.className='table-scroll';t.before(wrap);wrap.append(t)});
const dialog=document.getElementById('image-dialog');const large=document.getElementById('large-image');
document.querySelectorAll('.zoom-image').forEach(b=>b.addEventListener('click',()=>{large.src=b.dataset.src;large.alt=b.dataset.caption;large.classList.remove('expanded');document.getElementById('image-caption').textContent=b.dataset.caption;document.getElementById('full-image').href=b.dataset.src;dialog.showModal()}));
document.getElementById('close-image').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});large.addEventListener('click',()=>large.classList.toggle('expanded'));
document.querySelectorAll('video').forEach(v=>{v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()}));v.addEventListener('error',()=>{v.closest('figure').querySelector('.video-error').hidden=false})});
