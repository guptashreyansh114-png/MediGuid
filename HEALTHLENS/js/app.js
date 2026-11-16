/* MediGuide - main application script */
(function () {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage may be blocked */ }
    }
  };

  let saved = store.get('mg_saved', []);
  let specialistHint = null; // set when user opens hospitals from a disease page

  /* ---------- Theme ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    $('#themeBtn').textContent = t === 'dark' ? '☀️' : '🌙';
  }
  let theme = store.get('mg_theme', 'dark'); // black and blue theme is the default
  if (theme !== 'dark' && theme !== 'light') theme = 'dark';
  applyTheme(theme);
  $('#themeBtn').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    store.set('mg_theme', theme);
    applyTheme(theme);
  });

  /* ---------- Mobile menu ---------- */
  $('#menuBtn').addEventListener('click', () => {
    const nav = $('#mainNav');
    const open = nav.classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(open));
  });

  /* ---------- Routing ---------- */
  const PAGES = ['home', 'diseases', 'detail', 'symptoms', 'tools', 'hospitals', 'saved', 'about'];

  function route() {
    const hash = location.hash.slice(1) || 'home';
    const parts = hash.split('/');
    let name = parts[0];
    const arg = parts[1];
    if (!PAGES.includes(name)) name = 'home';

    PAGES.forEach((p) => $('#' + p).classList.toggle('active', p === name));
    const navTarget = name === 'detail' ? 'diseases' : name;
    $$('#mainNav a').forEach((a) => a.classList.toggle('current', a.getAttribute('href') === '#' + navTarget));
    $('#mainNav').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');

    if (name === 'diseases') renderDiseases();
    if (name === 'detail') renderDetail(arg);
    if (name === 'saved') renderSaved();
    if (name === 'hospitals') showHospitalsPage();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  /* ---------- Disease cards ---------- */
  function cardHtml(d) {
    const isSaved = saved.includes(d.id);
    return `<article class="card disease-card">
      <div class="card-top"><span class="icon" aria-hidden="true">${d.icon}</span><span class="tag">${esc(d.category)}</span></div>
      <h3>${esc(d.name)}</h3>
      <p>${esc(d.summary)}</p>
      <div class="card-actions">
        <a class="btn small" href="#detail/${esc(d.id)}">Read more</a>
        <button class="btn small ghost save-btn" data-id="${esc(d.id)}" aria-pressed="${isSaved}">${isSaved ? '★ Saved' : '☆ Save'}</button>
      </div>
    </article>`;
  }

  function renderPopular() {
    $('#popularGrid').innerHTML = DISEASES.slice(0, 6).map(cardHtml).join('');
  }

  function populateCategories() {
    const cats = [...new Set(DISEASES.map((d) => d.category))].sort();
    $('#categoryFilter').insertAdjacentHTML('beforeend', cats.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join(''));
  }

  function renderDiseases() {
    const q = $('#search').value.trim().toLowerCase();
    const cat = $('#categoryFilter').value;
    const list = DISEASES.filter((d) => {
      if (cat && d.category !== cat) return false;
      if (!q) return true;
      const hay = [d.name, d.summary, d.category, d.specialist, ...d.symptoms, ...d.tags].join(' ').toLowerCase();
      return hay.includes(q);
    }).sort((a, b) => a.name.localeCompare(b.name));

    $('#resultCount').textContent = `${list.length} condition${list.length === 1 ? '' : 's'} found`;
    $('#diseaseGrid').innerHTML = list.length
      ? list.map(cardHtml).join('')
      : '<p class="empty">No matching conditions. Try a different word, such as "fever" or "cough".</p>';
  }

  $('#search').addEventListener('input', renderDiseases);
  $('#categoryFilter').addEventListener('change', renderDiseases);

  $('#homeSearchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#search').value = $('#homeSearch').value;
    $('#categoryFilter').value = '';
    if (location.hash === '#diseases') renderDiseases(); else location.hash = '#diseases';
  });

  /* ---------- Save / bookmark ---------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.save-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    saved = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    store.set('mg_saved', saved);
    const nowSaved = saved.includes(id);
    $$('.save-btn[data-id="' + id + '"]').forEach((b) => {
      b.textContent = nowSaved ? '★ Saved' : '☆ Save';
      b.setAttribute('aria-pressed', String(nowSaved));
    });
    if ($('#saved').classList.contains('active')) renderSaved();
  });

  function renderSaved() {
    const list = DISEASES.filter((d) => saved.includes(d.id));
    $('#savedGrid').innerHTML = list.length
      ? list.map(cardHtml).join('')
      : '<p class="empty">You have not saved anything yet. Use the ☆ Save button on any condition.</p>';
  }

  /* ---------- Disease detail ---------- */
  function listHtml(items) {
    return '<ul>' + items.map((i) => `<li>${esc(i)}</li>`).join('') + '</ul>';
  }

  function renderDetail(id) {
    const d = DISEASES.find((x) => x.id === id);
    const body = $('#detailBody');
    if (!d) {
      body.innerHTML = '<p class="empty">Condition not found. <a href="#diseases">Back to all diseases</a></p>';
      return;
    }
    const isSaved = saved.includes(d.id);
    body.innerHTML = `
      <a class="back-link" href="#diseases">← All diseases</a>
      <div class="detail-head">
        <span class="icon" aria-hidden="true">${d.icon}</span>
        <div><h1>${esc(d.name)}</h1><span class="tag">${esc(d.category)}</span></div>
      </div>
      <p>${esc(d.summary)}</p>
      <div class="detail-actions">
        <button class="btn save-btn" data-id="${esc(d.id)}" aria-pressed="${isSaved}">${isSaved ? '★ Saved' : '☆ Save'}</button>
        <button class="btn ghost" id="findHospBtn">🏥 Find hospitals near me</button>
        <button class="btn ghost" id="printBtn">🖨️ Print</button>
      </div>
      <div class="detail-grid">
        <div class="card"><h3>Common symptoms</h3>${listHtml(d.symptoms)}</div>
        <div class="card"><h3>Causes and risk factors</h3>${listHtml(d.causes)}</div>
        <div class="card"><h3>Treatment options</h3>${listHtml(d.treatment)}</div>
        <div class="card"><h3>Prevention</h3>${listHtml(d.prevention)}</div>
        <div class="card"><h3>When to see a doctor</h3><p>${esc(d.seeDoctor)}</p><p><strong>Which doctor:</strong> ${esc(d.specialist)}</p></div>
        <div class="card alert-card"><h3>🚨 Emergency warning signs</h3><p>${esc(d.emergency)}</p><p>Call <a href="tel:108">108</a> or <a href="tel:112">112</a>.</p></div>
      </div>
      <div class="notice">This page is for education only. Treatment, medicines and doses must always be decided by a qualified doctor.</div>`;

    $('#findHospBtn').addEventListener('click', () => {
      specialistHint = { name: d.name, specialist: d.specialist, keys: d.specKeys };
      location.hash = '#hospitals';
    });
    $('#printBtn').addEventListener('click', () => window.print());
  }

  /* ---------- Symptom checker ---------- */
  function buildSymptomChips() {
    $('#symptomChips').innerHTML = SYMPTOMS.map((s, i) =>
      `<label class="chip"><input type="checkbox" value="${esc(s)}" id="sym${i}"><span>${esc(s)}</span></label>`).join('');
  }

  function checkSymptoms() {
    const sel = $$('#symptomChips input:checked').map((i) => i.value);
    const out = $('#symptomResults');
    if (!sel.length) {
      out.innerHTML = '<p class="muted">Please select at least one symptom.</p>';
      return;
    }
    const results = DISEASES
      .map((d) => {
        const matched = d.tags.filter((t) => sel.includes(t));
        return { d, matched, ratio: matched.length / d.tags.length };
      })
      .filter((r) => r.matched.length)
      .sort((a, b) => b.matched.length - a.matched.length || b.ratio - a.ratio)
      .slice(0, 5);

    if (!results.length) {
      out.innerHTML = '<p class="empty">No related conditions found in this small database. Please consult a doctor.</p>';
      return;
    }
    out.innerHTML = '<h2>Possibly related conditions</h2>' + results.map((r) => `
      <div class="card result-item">
        <div>
          <h3>${esc(r.d.name)}</h3>
          <div class="muted">Matches ${r.matched.length} of ${r.d.tags.length} typical symptoms: ${esc(r.matched.join(', '))}</div>
          <div class="meter" aria-hidden="true"><i style="width:${Math.round(r.ratio * 100)}%"></i></div>
        </div>
        <a class="btn small" href="#detail/${esc(r.d.id)}">Learn more</a>
      </div>`).join('') +
      '<div class="notice">This is not a diagnosis. Many illnesses share the same symptoms. Please visit a doctor, and call 108 or 112 in an emergency.</div>';
  }

  $('#checkBtn').addEventListener('click', checkSymptoms);
  $('#clearSymptoms').addEventListener('click', () => {
    $$('#symptomChips input').forEach((i) => { i.checked = false; });
    $('#symptomResults').innerHTML = '';
  });

  /* ---------- BMI ---------- */
  $('#bmiForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const w = parseFloat($('#weight').value);
    const hCm = parseFloat($('#height').value);
    const out = $('#bmiResult');
    if (!(w > 0) || !(hCm > 0)) { out.textContent = 'Please enter valid numbers.'; return; }
    const h = hCm / 100;
    const bmi = w / (h * h);
    let cat, advice;
    if (bmi < 18.5) { cat = 'Underweight'; advice = 'You may be below a healthy weight. A doctor or dietitian can help.'; }
    else if (bmi < 25) { cat = 'Normal weight'; advice = 'Your weight is in the healthy range. Keep up a balanced diet and activity.'; }
    else if (bmi < 30) { cat = 'Overweight'; advice = 'Healthy eating and regular exercise can help. Consider talking to a doctor.'; }
    else { cat = 'Obese'; advice = 'A higher BMI raises the risk of several conditions. Please talk to a doctor.'; }
    out.innerHTML = `<p class="bmi-value">${bmi.toFixed(1)}</p><p class="bmi-cat">${cat}</p><p>${advice}</p>
      <p class="muted">Standard WHO ranges are used here: under 18.5, 18.5 to 24.9, 25 to 29.9, and 30 or more.</p>`;
  });

  /* ---------- Hospital finder ---------- */
  const VARANASI = [25.3176, 82.9739];
  const OVERPASS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter'
  ];
  let map = null, markerLayer = null, originMarker = null, radiusCircle = null;
  let lastOrigin = null, hospitals = [], markers = [];

  function setStatus(msg, isError) {
    const el = $('#hospStatus');
    el.textContent = msg;
    el.classList.toggle('error', !!isError);
  }

  function renderSpecialistNote() {
    const box = $('#specialistNote');
    if (!specialistHint) { box.innerHTML = ''; return; }
    box.innerHTML = `<div class="card spec-note">
      <div>You were reading about <strong>${esc(specialistHint.name)}</strong>. Look for a hospital with a <strong>${esc(specialistHint.specialist)}</strong>. Call ahead to confirm.</div>
      <button class="btn small ghost" id="clearHint">Clear</button></div>`;
    $('#clearHint').addEventListener('click', () => {
      specialistHint = null;
      renderSpecialistNote();
      if (hospitals.length) renderHospitalList();
    });
  }

  function initMap() {
    if (map) return true;
    if (typeof L === 'undefined') {
      setStatus('The map library could not load. Please check your internet connection and refresh the page.', true);
      return false;
    }
    map = L.map('map').setView(VARANASI, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
    map.on('click', (e) => searchAround(e.latlng.lat, e.latlng.lng, 'the point you selected'));
    return true;
  }

  function showHospitalsPage() {
    renderSpecialistNote();
    if (!initMap()) return;
    setTimeout(() => map.invalidateSize(), 150);
    if (!lastOrigin) {
      setStatus('Click "Use my current location", or choose Varanasi city centre.');
    }
  }

  function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const rad = (d) => d * Math.PI / 180;
    const dLat = rad(lat2 - lat1), dLon = rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  async function fetchOverpass(lat, lon, radius) {
    const query = `[out:json][timeout:25];(node["amenity"="hospital"](around:${radius},${lat},${lon});way["amenity"="hospital"](around:${radius},${lat},${lon});relation["amenity"="hospital"](around:${radius},${lat},${lon}););out center tags;`;
    let lastErr;
    for (const url of OVERPASS) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 28000);
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'data=' + encodeURIComponent(query),
          signal: ctrl.signal
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return await res.json();
      } catch (err) { lastErr = err; }
    }
    throw lastErr;
  }

  function parseHospitals(data, lat, lon) {
    const seen = new Set();
    const out = [];
    (data.elements || []).forEach((el) => {
      const t = el.tags || {};
      const hLat = el.lat != null ? el.lat : el.center && el.center.lat;
      const hLon = el.lon != null ? el.lon : el.center && el.center.lon;
      if (hLat == null || hLon == null) return;
      const name = (t['name:en'] || t.name || '').trim();
      const key = (name || el.type + el.id).toLowerCase() + '|' + hLat.toFixed(3) + hLon.toFixed(3);
      if (seen.has(key)) return;
      seen.add(key);
      const address = t['addr:full'] || ['addr:housenumber', 'addr:street', 'addr:suburb', 'addr:city']
        .map((k) => t[k]).filter(Boolean).join(', ');
      const specs = (t['healthcare:speciality'] || '').split(';')
        .map((s) => s.trim().replace(/_/g, ' ')).filter(Boolean);
      out.push({
        name: name || 'Hospital (name not listed)',
        unnamed: !name,
        lat: hLat, lon: hLon,
        dist: distanceKm(lat, lon, hLat, hLon),
        address,
        phone: t.phone || t['contact:phone'] || '',
        website: t.website || t['contact:website'] || '',
        emergency: t.emergency === 'yes',
        operatorType: t['operator:type'] || '',
        operator: t.operator || '',
        specs
      });
    });
    out.sort((a, b) => (a.unnamed - b.unnamed) || (a.dist - b.dist));
    return out.sort((a, b) => a.dist - b.dist).slice(0, 25);
  }

  function matchesHint(h) {
    if (!specialistHint) return false;
    const hay = h.specs.join(' ').toLowerCase();
    return specialistHint.keys.some((k) => hay.includes(k));
  }

  function safeUrl(u) {
    try {
      const url = new URL(/^https?:\/\//i.test(u) ? u : 'https://' + u);
      return /^https?:$/.test(url.protocol) ? url.href : '';
    } catch (e) { return ''; }
  }

  function renderHospitalList() {
    const list = $('#hospitalList');
    if (!hospitals.length) { list.innerHTML = ''; return; }
    list.innerHTML = hospitals.map((h, i) => {
      const firstPhone = h.phone.split(/[;,]/)[0].trim();
      const tel = firstPhone.replace(/[^0-9+]/g, '');
      const site = h.website ? safeUrl(h.website) : '';
      const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}`;
      const badges = [];
      if (matchesHint(h)) badges.push('<span class="badge good">Matches specialty</span>');
      if (h.emergency) badges.push('<span class="badge red">Emergency</span>');
      if (h.operatorType) badges.push(`<span class="badge">${esc(h.operatorType)}</span>`);
      return `<article class="card hosp-card">
        <h3>${i + 1}. ${esc(h.name)}</h3>
        <div>${badges.join('')}</div>
        <p class="hosp-meta"><strong>${h.dist.toFixed(1)} km</strong> away</p>
        ${h.address ? `<p class="hosp-meta">📍 ${esc(h.address)}</p>` : ''}
        ${h.operator ? `<p class="hosp-meta">Run by: ${esc(h.operator)}</p>` : ''}
        ${h.specs.length ? `<p class="hosp-meta">Specialties listed: ${esc(h.specs.slice(0, 5).join(', '))}</p>` : ''}
        <div class="hosp-actions">
          <a class="btn small" href="${dirUrl}" target="_blank" rel="noopener noreferrer">Directions</a>
          <button class="btn small ghost show-on-map" data-i="${i}">Show on map</button>
          ${tel ? `<a class="btn small ghost" href="tel:${esc(tel)}">Call</a>` : ''}
          ${site ? `<a class="btn small ghost" href="${esc(site)}" target="_blank" rel="noopener noreferrer">Website</a>` : ''}
        </div>
      </article>`;
    }).join('');
  }

  $('#hospitalList').addEventListener('click', (e) => {
    const btn = e.target.closest('.show-on-map');
    if (!btn || !map) return;
    const i = Number(btn.dataset.i);
    const m = markers[i];
    if (!m) return;
    map.flyTo(m.getLatLng(), 16);
    m.openPopup();
    $('#map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  function drawMap(lat, lon, radius) {
    markerLayer.clearLayers();
    markers = [];
    if (originMarker) map.removeLayer(originMarker);
    if (radiusCircle) map.removeLayer(radiusCircle);
    originMarker = L.circleMarker([lat, lon], { radius: 9, color: '#1565c0', fillColor: '#2196f3', fillOpacity: 0.9, weight: 3 })
      .addTo(map).bindPopup('Search centre');
    radiusCircle = L.circle([lat, lon], { radius, color: '#0b7a75', weight: 1, fillOpacity: 0.04 }).addTo(map);
    hospitals.forEach((h, i) => {
      const m = L.marker([h.lat, h.lon]).addTo(markerLayer)
        .bindPopup(`<strong>${esc(h.name)}</strong><br>${h.dist.toFixed(1)} km away`);
      markers.push(m);
    });
    map.fitBounds(radiusCircle.getBounds(), { padding: [20, 20] });
  }

  async function searchAround(lat, lon, label) {
    if (!initMap()) return;
    const radius = Number($('#radius').value);
    lastOrigin = [lat, lon];
    setStatus('Searching for hospitals around ' + label + '...');
    $('#hospitalList').innerHTML = '';
    try {
      const data = await fetchOverpass(lat, lon, radius);
      hospitals = parseHospitals(data, lat, lon);
      drawMap(lat, lon, radius);
      renderHospitalList();
      if (hospitals.length) {
        setStatus(`Found ${hospitals.length} hospital${hospitals.length === 1 ? '' : 's'} within ${radius / 1000} km, nearest first.`);
      } else {
        setStatus('No hospitals found in this radius. Try a larger radius or another spot on the map.', true);
      }
    } catch (err) {
      hospitals = [];
      drawMap(lat, lon, radius);
      setStatus('Could not load hospital data right now (the free map data service may be busy or offline). Please try again in a moment.', true);
    }
  }

  $('#locateBtn').addEventListener('click', () => {
    if (!navigator.geolocation) {
      setStatus('Your browser does not support location. Use "Varanasi city centre" or click on the map.', true);
      return;
    }
    setStatus('Asking for your location... please allow access in the browser prompt.');
    navigator.geolocation.getCurrentPosition(
      (pos) => searchAround(pos.coords.latitude, pos.coords.longitude, 'your location'),
      (err) => {
        const msg = err.code === 1
          ? 'Location permission was denied. Use "Varanasi city centre" or click on the map instead.'
          : 'Could not get your location. Use "Varanasi city centre" or click on the map instead.';
        setStatus(msg, true);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  });

  $('#varanasiBtn').addEventListener('click', () => searchAround(VARANASI[0], VARANASI[1], 'Varanasi city centre'));
  $('#radius').addEventListener('change', () => {
    if (lastOrigin) searchAround(lastOrigin[0], lastOrigin[1], 'the selected point');
  });

  /* ---------- Init ---------- */
  function dailyTip() {
    const day = Math.floor(Date.now() / 86400000);
    $('#dailyTip').textContent = TIPS[day % TIPS.length];
  }

  populateCategories();
  renderPopular();
  buildSymptomChips();
  dailyTip();
  route();
})();
