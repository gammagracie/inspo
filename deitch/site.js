// Shared chrome (nav row, cookie bar, close icon), placeholder art, and page renderers.
// All show titles, artist names and copy are invented placeholders.

const SECTIONS = {
  la:      { name: 'Los Angeles',      color: '#FFEB02', href: 'exhibitions.html?s=la',      icon: 'sun',     anim: 'spin' },
  ny:      { name: 'New York',         color: '#FF93FF', href: 'exhibitions.html?s=ny',      icon: 'house',   anim: 'hop' },
  sp:      { name: 'Special Projects', color: '#FF4E7D', href: 'exhibitions.html?s=sp',      icon: 'copter',  anim: 'fly' },
  artists: { name: 'Artists',          color: '#FC7B3E', href: 'artists.html',               icon: 'frame',   anim: 'tilt' },
  archive: { name: 'Archive',          color: '#0287FE', href: 'exhibitions.html?s=archive', icon: 'box',     anim: 'shake' },
  about:   { name: 'About',            color: '#3DFD6F', href: 'about.html',                 icon: 'person',  anim: 'wave' }
};

const ICONS = {
  sun: `<g transform-origin="16 16"><g stroke="#e8461a" stroke-width="2.4">${[0,45,90,135,180,225,270,315].map(a => `<line x1="16" y1="1" x2="16" y2="5" transform="rotate(${a} 16 16)"/>`).join('')}</g><circle cx="16" cy="16" r="9" fill="#ffb800" stroke="#e8461a" stroke-width="1.5"/><circle cx="13" cy="14" r="1.2"/><circle cx="19" cy="14" r="1.2"/><path d="M12 18q4 4 8 0" fill="none" stroke="#000" stroke-width="1.4"/></g>`,
  house: `<path d="M5 13 16 4l11 9v15H5z" fill="#fff" stroke="#000" stroke-width="1.6"/><path d="M3 14 16 3l13 11" fill="none" stroke="#000" stroke-width="2"/>${[9,15,21].map(x => `<rect x="${x-1}" y="12" width="4" height="4" fill="#000"/><rect x="${x-1}" y="18" width="4" height="4" fill="#000"/>`).join('')}<rect x="14" y="23" width="4" height="5" fill="#000"/>`,
  copter: `<line x1="4" y1="8" x2="24" y2="8" stroke="#000" stroke-width="1.6"/><line x1="14" y1="8" x2="14" y2="12" stroke="#000" stroke-width="1.6"/><path d="M8 13h12a5 5 0 0 1 0 10H11a3 3 0 0 1-3-3z" fill="#e8202a" stroke="#000" stroke-width="1.4"/><path d="M18 14h3a3 3 0 0 1 3 3h-6z" fill="#bfe8ff"/><path d="M8 17H1v-3" fill="none" stroke="#000" stroke-width="1.6"/><line x1="10" y1="26" x2="24" y2="26" stroke="#000" stroke-width="1.6"/>`,
  frame: `<rect x="7" y="3" width="18" height="26" fill="#f5c76a" stroke="#a5742a" stroke-width="1.4"/><rect x="10" y="6" width="12" height="20" fill="#c9c8ff"/>`,
  box: `<rect x="6" y="10" width="20" height="18" fill="#d8d8d8" stroke="#000" stroke-width="1.4"/><rect x="9" y="4" width="14" height="8" fill="#fff" stroke="#000" stroke-width="1.2"/><rect x="11" y="15" width="10" height="6" fill="#fff" stroke="#e8202a" stroke-width="1.4"/>`,
  person: `<circle cx="16" cy="9" r="5.5" fill="#f2c9a5" stroke="#000" stroke-width="1.2"/><path d="M11 8h10" stroke="#000" stroke-width="1.6"/><path d="M5 29c0-8 5-12 11-12s11 4 11 12z" fill="#3c3a8f" stroke="#000" stroke-width="1.2"/><path d="M14 17l2 6 2-6" fill="#fff"/>`
};

const X_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M21 3 3 21" stroke="#000" stroke-width="2.2"/></svg>';

// Small seeded random so every card always gets the same art
function rng(seed) {
  let h = 2166136261;
  for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
}

const PALETTE = ['#ff4e7d', '#ffeb02', '#0287fe', '#3dfd6f', '#fc7b3e', '#ff93ff', '#111111', '#7a4bff', '#00b3a4', '#e8202a', '#f2efe8', '#2b3a8f'];

// Placeholder art: a painting, a poster, or an installation view of a white room with sculptures
function art(seed, kind) {
  const r = rng(seed);
  const pick = () => PALETTE[Math.floor(r() * PALETTE.length)];
  kind = kind || ['paint', 'poster', 'room'][Math.floor(r() * 3)];
  let s = '';
  if (kind === 'room') {
    s += `<rect width="300" height="200" fill="#f4f3f0"/><polygon points="0,140 300,140 300,200 0,200" fill="#cdbfa8"/><polygon points="0,0 60,30 60,140 0,170" fill="#e7e5e0"/><polygon points="300,0 240,30 240,140 300,170" fill="#e7e5e0"/><rect x="60" y="0" width="180" height="30" fill="#2a2a2a"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${70 + i * 30}" y="12" width="12" height="3" fill="#fff" opacity=".8"/>`;
    const n = 2 + Math.floor(r() * 5), c = pick();
    for (let i = 0; i < n; i++) {
      const x = 70 + r() * 160, h = 18 + r() * 40, w = 6 + r() * 14;
      s += `<ellipse cx="${x + w / 2}" cy="${150 + h / 6}" rx="${w}" ry="3" fill="#000" opacity=".12"/><rect x="${x}" y="${148 + h / 6 - h}" width="${w}" height="${h}" rx="${w / 2.5}" fill="${c}"/>`;
    }
    if (r() > .5) s += `<rect x="${90 + r() * 80}" y="50" width="${30 + r() * 30}" height="${30 + r() * 25}" fill="${pick()}" stroke="#222" stroke-width="1.5"/>`;
  } else if (kind === 'poster') {
    const a = pick(), b = pick();
    s += `<rect width="300" height="200" fill="${a}"/><rect x="${150 + r() * 60}" width="150" height="200" fill="${b}"/>`;
    for (let i = 0; i < 5; i++) s += `<path d="M150 100 L${r() * 300} ${r() > .5 ? 0 : 200}" stroke="#9aa0a6" stroke-width="${8 + r() * 10}" opacity=".7"/>`;
    s += `<rect x="20" y="20" width="${80 + r() * 60}" height="10" fill="#111"/><rect x="20" y="38" width="${50 + r() * 50}" height="10" fill="#111"/><rect x="20" y="150" width="70" height="5" fill="#111"/><rect x="20" y="160" width="50" height="5" fill="#111"/>`;
  } else {
    s += `<rect width="300" height="200" fill="${pick()}"/>`;
    for (let i = 0; i < 7; i++) {
      const c = pick(), x = r() * 300, y = r() * 200, k = r();
      if (k < .35) s += `<circle cx="${x}" cy="${y}" r="${10 + r() * 45}" fill="${c}"/>`;
      else if (k < .7) s += `<rect x="${x - 40}" y="${y - 30}" width="${30 + r() * 90}" height="${20 + r() * 80}" fill="${c}" transform="rotate(${(r() - .5) * 30} ${x} ${y})"/>`;
      else s += `<path d="M${x} ${y}q${(r() - .5) * 200} ${(r() - .5) * 200} ${(r() - .5) * 260} ${(r() - .5) * 120}" fill="none" stroke="${c}" stroke-width="${6 + r() * 14}" stroke-linecap="round"/>`;
    }
  }
  return `<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${s}</svg>`;
}

// Invented exhibitions per section: [artist or show, title, dates, place, upcoming]
const SHOWS = {
  la: [
    ['Mara Okonkwo', 'Second Helping', 'October 30, 2026–January 30, 2027', '7000 Sunset Blvd., Los Angeles', true],
    ['Theo Lindqvist', 'Weightless Company', 'October 30, 2026–January 23, 2027', '925 N. Palm Drive, Los Angeles', true],
    ['Inés Calderón', 'Dust and Yes', 'June 19–October 3, 2026', '925 N. Palm Drive and 7000 Sunset Blvd.'],
    ['Rafe Mbatha', 'Bright Machinery', 'April 4–June 6, 2026', '7000 Sunset Blvd., Los Angeles'],
    ['Group Show', 'The Long Afternoon', 'January 17–March 21, 2026', '925 N. Palm Drive, Los Angeles'],
    ['Juno Park', 'Still Water, Loud Room', 'November 1–December 20, 2025', '7000 Sunset Blvd., Los Angeles'],
    ['Odette Fairweather', 'Soft Engines', 'September 6–October 25, 2025', '925 N. Palm Drive, Los Angeles'],
    ['Kwame Adeyemi-Ross', 'Map of the Valley', 'June 14–August 16, 2025', '7000 Sunset Blvd., Los Angeles'],
    ['Group Show', 'Clay Hour', 'March 8–May 10, 2025', '925 N. Palm Drive, Los Angeles']
  ],
  ny: [
    ['Lior Vance', 'Rearview', 'October 9–November 22, 2026', '18 Wooster Street, New York'],
    ['Sela Moreau', 'Three in the Morning', 'September 4–October 18, 2026', '76 Grand Street, New York'],
    ['Anouk Peretz', 'I See the Window', 'May 15–July 3, 2026', '18 Wooster Street, New York'],
    ['Group Show', 'Small Hours', 'March 6–April 25, 2026', '76 Grand Street, New York'],
    ['Dov Halloran', 'Night Shift', 'January 9–February 21, 2026', '18 Wooster Street, New York'],
    ['Priya Castellanos', 'Common Ground', 'October 31–December 20, 2025', '76 Grand Street, New York']
  ],
  sp: [
    ['Wren Adebayo', 'Floating Pavilion', 'Summer 2026', 'Harbor Pier, Venice'],
    ['Group Show', 'Parade Route', 'May 2026', 'Mission District, San Francisco'],
    ['Cass Ojo', 'Rooftop Garden', 'Fall 2025', 'Downtown Miami'],
    ['Halvard Brenn', 'The Long Table', 'Spring 2025', 'Desert Center, California']
  ],
  archive: [
    ['Deitch Projects', 'Painted Storefront', '1998', 'Grand Street, New York'],
    ['Deitch Projects', 'Live Studio Week', '2001', 'Wooster Street, New York'],
    ['Deitch Projects', 'Parade of Sculptures', '2004', 'Long Island City, New York'],
    ['Deitch Projects', 'Light Room', '2006', 'Grand Street, New York'],
    ['Deitch Projects', 'Skate Bowl Installation', '2008', 'Wooster Street, New York'],
    ['Deitch Projects', 'Closing Party', '2010', 'Grand Street, New York']
  ]
};

const ARTISTS = ['Nadia Achterberg', 'Wei Lan', 'Iris Albadejo', 'Diego Alvear', 'Marcus Amell', 'Rumi Anand', 'Mateo Ayerbe', 'Ama Bakare', 'Julia Baumann', 'Tobias Ballard', 'Vera Beckwith', 'Felix Benoit', 'Ruth Bernal', 'Bea Butterfield', 'Callum Reyes', 'Judit Chorin', 'Gloria Clemente', 'Nell Cohan', 'Jonah Colter', 'Kara Davila', 'Kendra Dawes', 'Alix Diallo', 'Celia Durand', 'Ignacio Esparza', 'Sami Farhat', 'Koji Fenwick', 'Ursa Falk', 'Tomás Fried'];

// Chrome: nav row and cookie bar, appended after the window
function chrome(current) {
  const nav = document.createElement('ul');
  nav.className = 'nav';
  nav.innerHTML = Object.entries(SECTIONS).map(([k, s]) =>
    `<li><a class="border" href="${s.href}" style="--c:${s.color};--anim:${s.anim}"${k === current ? ' aria-current="page"' : ''}><svg viewBox="0 0 32 32" aria-hidden="true">${ICONS[s.icon]}</svg>${s.name}</a></li>`).join('');
  document.body.append(nav);

  const bar = document.createElement('div');
  bar.className = 'cookie border';
  bar.innerHTML = `<p>This site uses cookies to improve your visit. By continuing to browse you agree to their use. <a href="#">Learn More</a></p><button class="close" aria-label="Dismiss">${X_ICON}</button>`;
  let seen = false;
  try { seen = localStorage.getItem('deitch-cookie') === '1'; } catch (e) {}
  bar.hidden = seen;
  bar.querySelector('button').onclick = () => { bar.hidden = true; try { localStorage.setItem('deitch-cookie', '1'); } catch (e) {} };
  document.body.append(bar);

  document.querySelectorAll('[data-close]').forEach(a => { a.innerHTML = X_ICON; a.setAttribute('aria-label', 'Close'); });
}

function renderExhibitions() {
  const key = new URLSearchParams(location.search).get('s');
  const k = SECTIONS[key] && SHOWS[key] ? key : 'la';
  const sec = SECTIONS[k];
  const archive = k === 'archive';
  document.title = `${sec.name}: ${archive ? 'Deitch Projects' : 'Exhibitions'}`;
  document.documentElement.style.setProperty('--color', sec.color);
  document.documentElement.style.setProperty('--accent', k === 'la' ? '#e6cf00' : sec.color);
  document.getElementById('crumbs').innerHTML = `<li>${sec.name}</li><li>${archive ? 'Deitch Projects' : 'Exhibitions'}</li>`;
  document.getElementById('subnav').innerHTML = archive
    ? '<a class="on" href="#">Deitch Projects</a>, <a href="#">Publications</a>'
    : '<a class="on" href="#">Exhibitions</a>, <a href="#">Events</a>, <a href="#">Info</a>';
  document.getElementById('grid').innerHTML = SHOWS[k].map(([who, title, dates, place, soon]) =>
    `<li class="border"><a href="#"><figure>${art(who + title, soon ? 'poster' : null)}</figure>${soon ? '<span class="tag">Upcoming show</span>' : ''}<span class="t">${who}: ${title}</span><br>${dates}<br>${place}</a></li>`).join('');
  chrome(k);
}

function renderArtists() {
  document.getElementById('grid').innerHTML = ARTISTS.map(n =>
    `<li class="border"><a href="#"><figure>${art(n)}</figure><span class="t">${n}</span></a></li>`).join('');
  chrome('artists');
}

function renderAbout() {
  document.getElementById('photo').insertAdjacentHTML('afterbegin', art('founder-room', 'room'));
  chrome('about');
}

// Home: ticker of current shows and a moving color-field background standing in for the video
function renderHome() {
  const items = [...SHOWS.la.slice(0, 3).map(s => (s[4] ? 'Upcoming - ' : '') + `${s[0]}: ${s[1]} - Los Angeles`), ...SHOWS.ny.slice(0, 2).map(s => `${s[0]}: ${s[1]} - New York`)];
  const once = items.map(t => `<span>${t}</span>`).join('');
  document.getElementById('track').innerHTML = once + once;

  const cv = document.getElementById('bg'), ctx = cv.getContext('2d');
  const blobs = Array.from({ length: 7 }, (_, i) => ({ c: Object.values(SECTIONS)[i % 6].color, x: Math.random(), y: Math.random(), r: .2 + Math.random() * .25, vx: (Math.random() - .5) * .0006, vy: (Math.random() - .5) * .0006 }));
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
  function frame() {
    const w = cv.width, h = cv.height, m = Math.max(w, h);
    ctx.fillStyle = '#cccccc'; ctx.fillRect(0, 0, w, h);
    for (const b of blobs) {
      if (!still) { b.x += b.vx; b.y += b.vy; if (b.x < 0 || b.x > 1) b.vx *= -1; if (b.y < 0 || b.y > 1) b.vy *= -1; }
      const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, b.r * m);
      g.addColorStop(0, b.c); g.addColorStop(1, b.c + '00');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
    if (!still) requestAnimationFrame(frame);
  }
  addEventListener('resize', () => { size(); if (still) frame(); });
  size(); frame();
  chrome(null);
}
