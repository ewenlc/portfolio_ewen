const images = [
  {id:1, ext:'png', group:'sport', title:'Mid-season post', caption:'Triptych of Polytech Nantes sports teams.'},
  {id:3, ext:'png', group:'sport', title:'Jersey handover post', caption:'2025-2026 season visual.'},
  {id:4, ext:'png', group:'sport', title:'Pre-season matches', caption:'Typographic poster for pre-season games.'},
  {id:5, ext:'png', group:'experiment', title:'Animal Instinct', caption:'Black and white photographic collage.'},
  {id:6, ext:'png', group:'experiment', title:'Half-Mountain', caption:'Landscape processed in monochrome halftone.'},
  {id:7, ext:'png', group:'experiment', title:'A threshold study', caption:'Contrast and overexposure study.'},
  {id:8, ext:'JPG', group:'photo', title:'Reflection 01', caption:'Self-portrait behind a pane of glass.'},
  {id:9, ext:'JPG', group:'photo', title:'Reflection 02', caption:'Portrait through raindrops.'},
  {id:10, ext:'JPG', group:'photo', title:'Reflection 03', caption:'Detail of a hand behind the glass.'},
  {id:11, ext:'JPG', group:'photo', title:'The window', caption:'Twilight portrait.'},
  {id:12, ext:'png', group:'unicef', title:'Mental health', caption:'Mental health awareness poster for UNICEF.'},
  {id:13, ext:'jpg', group:'sport', title:'Handball team', caption:'Composition for the handball team.'},
  {id:14, ext:'jpg', group:'sport', title:'Polytech Nantes team', caption:'Team visual for the 2025-2026 season.'},
  {id:15, ext:'jpg', group:'sport', title:'Supporters post', caption:'Reportage and composition around a match.'},
  {id:16, ext:'jpg', group:'sport', title:'Match day', caption:'Sports fixture poster.'},
  {id:17, ext:'jpg', group:'sport', title:'Inter-regional tournament post', caption:'Futsal tournament poster.'},
  {id:18, ext:'png', group:'experiment', title:'Pas de la casa', caption:'Black and white digital halftone experiment.'},
  {id:19, ext:'png', group:'captcha', title:'c1', caption:'Sc'},
  {id:20, ext:'png', group:'captcha', title:'c2', caption:'Pc'},
  {id:21, ext:'png', group:'captcha', title:'c3', caption:'Dc'},
  {id:22, ext:'png', group:'captcha', title:'c4', caption:'Tc'},
  {id:23, ext:'png', group:'captcha', title:'c5', caption:'Menc'},
  {id:24, ext:'png', group:'captcha', title:'c6', caption:'c'},
  {id:25, ext:'png', group:'captcha', title:'c7', caption:'c'},
  {id:26, ext:'png', group:'captcha', title:'c8', caption:'Rc.'},
  {id:27, ext:'png', group:'captcha', title:'c9', caption:'Sc'},
];
const projects = [
  {group:'sport', number:'01', title:'Match day!', kind:'SPORTS GRAPHICS', cover:14},
  {group:'photo', number:'02', title:'Between the windows', kind:'PHOTOGRAPHY', cover:9},
  {group:'experiment', number:'03', title:'No signal_', kind:'EXPERIMENTAL', cover:5},
  {group:'unicef', number:'04', title:'Mind matters', kind:'POSTER', cover:12}
];
const groupNames = {sport:'SPORTS GRAPHICS', photo:'PHOTOGRAPHY', experiment:'EXPERIMENTAL', unicef:'POSTER'};
const imagePath = item => `portfolio/portfolio_${item.id}.${item.ext}`;
const imageById = id => images.find(item => item.id === id);
const pad = n => String(n).padStart(2, '0');

const projectIndex = document.querySelector('#projectIndex');
projects.forEach(project => {
  const link = document.createElement('a');
  link.className = 'project-row';
  link.href = `#${project.group}`;
  link.innerHTML = `<span class="row-number">/${project.number}</span><span class="row-name">${project.title}</span><span class="row-kind">${project.kind}</span><span class="row-arrow">↗</span><img src="${imagePath(imageById(project.cover))}" alt="" loading="lazy">`;
  projectIndex.append(link);
});
function imageButton(item, className) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.setAttribute('aria-label', `Open ${item.title}`);
  button.innerHTML = `<img src="${imagePath(item)}" alt="${item.caption}" loading="lazy"><span class="image-label"><b>${pad(item.id)} / ${item.title}</b><span>↗</span></span>`;
  button.addEventListener('click', () => openViewer(item.id));
  return button;
}
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  images.filter(item => item.group === gallery.dataset.gallery).forEach(item => gallery.append(imageButton(item, 'gallery-item')));
});
const archiveGrid = document.querySelector('#archiveGrid');
// On exclut les éléments du groupe 'captcha' de la grille d'archive
images.filter(item => item.group !== 'captcha').forEach(item => {
  const button = imageButton(item, 'archive-item');
  button.dataset.group = item.group;
  archiveGrid.append(button);
});
document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter-button').forEach(el => {
    const active = el === button;
    el.classList.toggle('is-active', active);
    el.setAttribute('aria-pressed', String(active));
  });
  archiveGrid.querySelectorAll('.archive-item').forEach(el => { el.hidden = filter !== 'all' && el.dataset.group !== filter; });
}));
document.querySelectorAll('.motion-switch').forEach(button => button.addEventListener('click', () => {
  const section = document.querySelector(`#${button.dataset.motion}`);
  const paused = section.classList.toggle('motion-paused');
  button.setAttribute('aria-pressed', String(!paused));
  button.querySelector('span').textContent = paused ? 'OFF' : 'ON';
}));

const viewer = document.querySelector('#viewer');
let currentImage = 1;
let viewerOrigin = null;
function showImage(id) {
  const item = imageById(id);
  currentImage = id;
  document.querySelector('#viewerImage').src = imagePath(item);
  document.querySelector('#viewerImage').alt = item.caption;
  document.querySelector('#viewerCounter').textContent = `${pad(id)} / 18`;
  document.querySelector('#viewerGroup').textContent = groupNames[item.group];
  document.querySelector('#viewerTitle').textContent = item.title;
  document.querySelector('#viewerCaption').textContent = item.caption;
}
function openViewer(id) {
  viewerOrigin = document.activeElement;
  showImage(id);
  viewer.hidden = false;
  document.body.classList.add('viewer-active');
  document.querySelector('#viewerClose').focus();
}
function closeViewer() {
  viewer.hidden = true;
  document.body.classList.remove('viewer-active');
  viewerOrigin?.focus();
}
document.querySelector('#viewerClose').addEventListener('click', closeViewer);
document.querySelector('#viewerPrev').addEventListener('click', () => showImage(currentImage === 1 ? 18 : currentImage - 1));
document.querySelector('#viewerNext').addEventListener('click', () => showImage(currentImage === 18 ? 1 : currentImage + 1));
viewer.addEventListener('click', event => { if (event.target === viewer) closeViewer(); });
document.addEventListener('keydown', event => {
  if (viewer.hidden) return;
  if (event.key === 'Escape') closeViewer();
  if (event.key === 'ArrowLeft') showImage(currentImage === 1 ? 18 : currentImage - 1);
  if (event.key === 'ArrowRight') showImage(currentImage === 18 ? 1 : currentImage + 1);
});

const captchaChoices = [19, 20, 21, 22, 23, 24, 25, 26, 27];
const correctChoices = new Set([22, 24, 27]);
const chosen = new Set();
const captchaGrid = document.querySelector('#captchaGrid');
const captchaStatus = document.querySelector('#captchaStatus');
captchaChoices.forEach(id => {
  const item = imageById(id);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'captcha-tile';
  button.setAttribute('aria-label', `Image ${id} : ${item.title}`);
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = `<img src="${imagePath(item)}" alt="">`;
  button.addEventListener('click', () => {
    if (chosen.has(id)) chosen.delete(id); else chosen.add(id);
    button.setAttribute('aria-pressed', String(chosen.has(id)));
    captchaStatus.textContent = `${chosen.size} IMAGE${chosen.size > 1 ? 'S' : ''} SELECTED`;
  });
  captchaGrid.append(button);
});
function enterSite() {
  const gate = document.querySelector('#gate');
  if (!gate) return;
  gate.remove();
  document.querySelector('#siteShell').inert = false;
  document.body.classList.remove('gate-active');
  sessionStorage.setItem('ewen-entered', '1');
  document.querySelector('.brand').focus();
}
document.querySelector('#verifyButton').addEventListener('click', () => {
  const valid = chosen.size === correctChoices.size && [...chosen].every(id => correctChoices.has(id));
  if (valid) enterSite();
  else {
    captchaStatus.textContent = 'TRY AGAIN: FIND ALL LINUX IMAGES (the pinguin is hiding)';
    captchaGrid.classList.remove('is-error');
    void captchaGrid.offsetWidth;
    captchaGrid.classList.add('is-error');
  }
});
document.querySelector('#skipGate').addEventListener('click', enterSite);
if (sessionStorage.getItem('ewen-entered') === '1') enterSite();