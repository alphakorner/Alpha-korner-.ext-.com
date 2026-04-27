/* ╔══════════════════════════════════════════════════════════════════╗
 * ║           ALPHA KORNER — SCRIPT PRINCIPAL (app.js)               ║
 * ║                                                                    ║
 * ║  Ce fichier contient toute la logique JavaScript du site :        ║
 * ║    • showPage()       : navigation SPA entre les pages            ║
 * ║    • openCallModal()  : ouvre le popup appel téléphonique         ║
 * ║    • showDemo()       : switcher des pills sur l'accueil          ║
 * ║    • startAuditSPA()  : lance l'audit PageSpeed                   ║
 * ║    • Animations, particules, canvas, etc.                         ║
 * ║                                                                    ║
 * ║  Pour modifier les liens des boutons → voir config.links.js       ║
 * ╚══════════════════════════════════════════════════════════════════╝ */


/* ════════════════════════════════════════════════
   PILL / DEMO SWITCHER
════════════════════════════════════════════════ */
function showDemo(btn, key) {
  document.querySelectorAll('.pill').forEach(p => {
    p.classList.remove('active');
    const dw = p.querySelector('.pill-dot-wrap');
    const d  = p.querySelector('.pill-dot');
    if (dw) { dw.classList.remove('active'); dw.classList.add('inactive'); }
    if (d)  { d.classList.remove('active');  d.classList.add('inactive'); }
  });
  btn.classList.add('active');
  const dw = btn.querySelector('.pill-dot-wrap');
  const d  = btn.querySelector('.pill-dot');
  if (dw) { dw.classList.remove('inactive'); dw.classList.add('active'); }
  if (d)  { d.classList.remove('inactive');  d.classList.add('active'); }
  ['dev','crm','auto','mobile'].forEach(k => {
    const el = document.getElementById('demo-' + k);
    if (el) el.style.display = (k === key) ? '' : 'none';
  });
}

/* ════════════════════════════════════════════════
   FAQ TOGGLE
════════════════════════════════════════════════ */
function toggleFaq(qEl) {
  const item = qEl.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.10 });
revealEls.forEach(el => revealObserver.observe(el));

/* ════════════════════════════════════════════════
   BLUR-TEXT WORD STAGGER
════════════════════════════════════════════════ */
function initBlurText() {
  document.querySelectorAll('.blur-text-target').forEach(container => {
    const words = container.textContent.trim().split(' ');
    container.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'blur-word';
      span.style.animationDelay = (0.12 + i * 0.08) + 's';
      span.textContent = word;
      container.appendChild(span);
      if (i < words.length - 1) container.appendChild(document.createTextNode('\u00A0'));
    });

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        container.classList.add('blur-text-visible');
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(container);
  });
}
initBlurText();

/* ════════════════════════════════════════════════
   STAGGER REVEAL FOR FEAT-CARDS
════════════════════════════════════════════════ */
document.querySelectorAll('.feat-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  card.style.transition = `opacity .55s cubic-bezier(0.22,1,0.36,1) ${i*0.08}s, transform .55s cubic-bezier(0.22,1,0.36,1) ${i*0.08}s, box-shadow .25s, border-color .2s`;
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      card.style.opacity = '1';
      card.style.transform = 'none';
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(card);
});

/* ════════════════════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════════════════════ */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1600;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const statsObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      const values   = [98, 4, 40, 100];
      const suffixes = ['%', 'sem', '%', '%'];
      document.querySelectorAll('.stat-value').forEach((el, i) => {
        el.innerHTML = '';
        setTimeout(() => animateCounter(el, values[i], suffixes[i]), i * 160);
      });
      statsObs.disconnect();
    }
  }, { threshold: 0.3 });
  statsObs.observe(statsSection);
}

/* ════════════════════════════════════════════════
   NAVBAR SCROLL EFFECT
════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  lastScroll = y;
}, { passive: true });

/* ════════════════════════════════════════════════
   FAB SCROLL TARGET
════════════════════════════════════════════════ */
document.querySelector('.fab').onclick = function() {
  if (currentPage === 'services') {
    window.scrollTo({top: 0, behavior: 'smooth'});
  } else {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ════════════════════════════════════════════════
   SPA ROUTER — étendu avec page démo
════════════════════════════════════════════════ */
let currentPage = 'home';
let srvObserver = null;

/* ════════════════════════════════════════════════
   ROUTER — Gestion URL au chargement et historique
   Permet à l'utilisateur de rafraîchir n'importe
   quelle page sans tomber sur une erreur ou revenir
   à l'accueil involontairement.
════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════
   GITHUB PAGES ROUTER — Hash-based (#demo, #audit…)
   GitHub Pages ne supporte pas le rewriting serveur.
   On utilise les hash URLs : /#demo  /#audit  /#services
   → Aucune erreur 404 au refresh, fonctionne nativement.
════════════════════════════════════════════════ */

// Lit le hash au chargement (refresh ou accès direct)
(function initRouteOnLoad() {
  const hash = window.location.hash.replace('#', '').trim();
  const allowed = ['home', 'services', 'demo', 'audit'];
  const targetPage = allowed.includes(hash) ? hash : 'home';
  if (targetPage !== 'home') {
    const homeEl     = document.getElementById('page-home');
    const srvEl      = document.getElementById('page-services');
    const demoEl     = document.getElementById('page-demo');
    const auditEl    = document.getElementById('page-audit');
    const homeBtn    = document.getElementById('nav-home-btn');
    const contactBtn = document.getElementById('nav-contact-btn');
    if(homeEl) homeEl.style.display = 'none';
    if(srvEl)  { srvEl.style.display  = 'none'; srvEl.classList.remove('active'); }
    if(demoEl) { demoEl.style.display = 'none'; demoEl.classList.remove('active'); }
    if(auditEl){ auditEl.style.display= 'none'; auditEl.classList.remove('active'); }
    if(homeBtn)    homeBtn.style.display    = 'flex';
    if(contactBtn) contactBtn.style.display = 'none';
    if (targetPage === 'demo'    && demoEl)  { demoEl.style.display  = 'block'; demoEl.classList.add('active'); }
    if (targetPage === 'audit'   && auditEl) { auditEl.style.display = 'block'; auditEl.classList.add('active'); setTimeout(initAuditCanvas, 80); }
    if (targetPage === 'services'&& srvEl)   { srvEl.style.display   = 'block'; srvEl.classList.add('active'); initServicesPage(); }
    currentPage = targetPage;
  }
})();

// Bouton Précédent/Suivant du navigateur
window.addEventListener('hashchange', function() {
  const hash = window.location.hash.replace('#', '').trim();
  const allowed = ['home', 'services', 'demo', 'audit'];
  showPage(allowed.includes(hash) ? hash : 'home');
});


function showPage(page, anchor) {
  const homeEl     = document.getElementById('page-home');
  const srvEl      = document.getElementById('page-services');
  const demoEl     = document.getElementById('page-demo');
  const auditEl    = document.getElementById('page-audit');
  const homeBtn    = document.getElementById('nav-home-btn');
  const contactBtn = document.getElementById('nav-contact-btn');

  // hide all pages
  if(homeEl) homeEl.style.display = 'none';
  if(srvEl)  { srvEl.style.display = 'none'; srvEl.classList.remove('active'); }
  if(demoEl) { demoEl.style.display = 'none'; demoEl.classList.remove('active'); }
  if(auditEl){ auditEl.style.display = 'none'; auditEl.classList.remove('active'); }

  if (page === 'services') {
    if(srvEl) { srvEl.style.display = 'block'; srvEl.classList.add('active'); }
    if(homeBtn)    homeBtn.style.display    = 'flex';
    if(contactBtn) contactBtn.style.display = 'none';
    window.scrollTo(0, 0);
    currentPage = 'services';
    window.location.hash = 'services';
    initServicesPage();
    if (anchor) {
      setTimeout(() => {
        const t = document.getElementById(anchor);
        if (t) {
          t.scrollIntoView({ behavior: 'smooth', block: 'center' });
          t.style.borderColor = 'rgba(52,209,108,0.6)';
          t.style.boxShadow   = '0 0 0 3px rgba(52,209,108,0.18),0 12px 40px rgba(52,209,108,0.15)';
          setTimeout(() => { t.style.borderColor = ''; t.style.boxShadow = ''; }, 2800);
        }
      }, 450);
    }
  } else if (page === 'demo') {
    if(demoEl) { demoEl.style.display = 'block'; demoEl.classList.add('active'); }
    if(homeBtn)    homeBtn.style.display    = 'flex';
    if(contactBtn) contactBtn.style.display = 'none';
    window.scrollTo(0, 0);
    currentPage = 'demo';
    // Update URL for demo
    window.location.hash = 'demo';
  } else if (page === 'audit') {
    if(auditEl){ auditEl.style.display = 'block'; auditEl.classList.add('active'); }
    if(homeBtn)    homeBtn.style.display    = 'flex';
    if(contactBtn) contactBtn.style.display = 'none';
    window.scrollTo(0, 0);
    currentPage = 'audit';
    window.location.hash = 'audit';
    setTimeout(initAuditCanvas, 80);
  } else {
    // home
    if(homeEl) homeEl.style.display = 'block';
    if(homeBtn)    homeBtn.style.display    = 'none';
    if(contactBtn) contactBtn.style.display = 'flex';
    currentPage = 'home';
    window.location.hash = '';
  }
}

/* ════════════════════════════════════════════════
   AUDIT SPA — LOGIC COMPLÈTE
════════════════════════════════════════════════ */

const ASTEPS = [
  "Connexion à l'analyseur…",
  "Récupération des données de performance…",
  "Analyse du SEO technique…",
  "Vérification de l'accessibilité…",
  "Calcul du score global…",
  "Génération du rapport…"
];
let aStepTimer = null;

function animateAuditLoading() {
  const el  = document.getElementById('audit-loading-step');
  const bar = document.getElementById('audit-loading-bar');
  let i = 0;
  if(el) el.textContent = ASTEPS[0];
  if(bar) bar.style.width = '5%';
  aStepTimer = setInterval(() => {
    i++;
    if (i >= ASTEPS.length) { clearInterval(aStepTimer); return; }
    if(el)  el.textContent = ASTEPS[i];
    if(bar) bar.style.width = (10 + i * 15) + '%';
  }, 1400);
}

function clearAuditLoading() {
  clearInterval(aStepTimer);
  const bar = document.getElementById('audit-loading-bar');
  if(bar) bar.style.width = '100%';
}

function normalizeAuditUrl(raw) {
  raw = (raw || '').trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  try { new URL(raw); return raw; }
  catch { return null; }
}

async function startAuditSPA() {
  const rawUrl = (document.getElementById('audit-url-new') || {}).value || '';
  const url = normalizeAuditUrl(rawUrl);

  if (!url) {
    const inp = document.getElementById('audit-url-new');
    if(inp){ inp.style.borderColor='#ff6b6b'; inp.style.boxShadow='0 0 0 3px rgba(255,77,77,0.15)'; inp.focus(); }
    setTimeout(() => { if(inp){ inp.style.borderColor=''; inp.style.boxShadow=''; } }, 2500);
    return;
  }

  document.getElementById('audit-form-content').style.display = 'none';
  const howWrap = document.getElementById('audit-how-wrap');
  if(howWrap) howWrap.style.display = 'none';
  document.getElementById('audit-loading-new').classList.add('visible');
  document.getElementById('audit-result-new').classList.remove('visible');
  animateAuditLoading();

  let data = null, usedStrategy = 'mobile';

  for (const strategy of ['mobile', 'desktop']) {
    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices`;
      const resp = await fetch(apiUrl, { signal: AbortSignal.timeout(18000) });
      if (!resp.ok) continue;
      const json = await resp.json();
      const cats = ((json.lighthouseResult || {}).categories) || {};
      const hasReal = Object.values(cats).some(c => c.score !== null && c.score !== undefined && c.score !== 0.5);
      if (hasReal) { data = json; usedStrategy = strategy; break; }
      if (!data)   { data = json; usedStrategy = strategy; }
    } catch(e) { /* timeout or network */ }
  }

  clearAuditLoading();
  await new Promise(r => setTimeout(r, 350));

  if (data && ((data.lighthouseResult || {}).categories)) {
    renderAuditResults(data, url, usedStrategy);
  } else {
    renderAuditAIFallback(url);
  }
}

function renderAuditResults(data, url, strategy) {
  document.getElementById('audit-loading-new').classList.remove('visible');
  const cats   = ((data.lighthouseResult || {}).categories) || {};
  const audits = ((data.lighthouseResult || {}).audits)    || {};

  const toNum = v => (v !== null && v !== undefined) ? Math.round(Number(v) * 100) : null;
  const rawScores = [
    { name:'Performance',      val:toNum(cats.performance?.score),           icon:'⚡', key:'perf'  },
    { name:'SEO technique',    val:toNum(cats.seo?.score),                   icon:'🔍', key:'seo'   },
    { name:'Accessibilité',    val:toNum(cats.accessibility?.score),         icon:'♿', key:'a11y'  },
    { name:'Bonnes pratiques', val:toNum(cats['best-practices']?.score),    icon:'✅', key:'bp'    },
  ].filter(s => s.val !== null);

  if (!rawScores.length) { renderAuditAIFallback(url); return; }

  const descMap = buildAuditDesc(audits, rawScores);
  const avg = Math.round(rawScores.reduce((a,s) => a + s.val, 0) / rawScores.length);
  paintAuditRing(avg);
  document.getElementById('aglobal-title').textContent = getAuditLabel(avg);
  document.getElementById('aglobal-sub').textContent   = (strategy==='mobile'?'📱 Mobile':'🖥️ Desktop') + ' — ' + (()=>{try{return new URL(url).hostname}catch{return url}})();
  document.getElementById('audit-result-new').classList.add('visible');
  paintAuditItems(rawScores, descMap);
}

function paintAuditRing(score) {
  const fill = document.getElementById('aring-fill');
  const num  = document.getElementById('aring-num');
  const circ = 2 * Math.PI * 45;
  fill.style.strokeDasharray  = circ;
  fill.style.stroke = score >= 75 ? '#34D16C' : score >= 50 ? 'orange' : '#ff6b6b';
  fill.style.strokeDashoffset = circ;
  let cur = 0;
  const inc = Math.max(1, score / 60);
  const ni = setInterval(() => {
    cur = Math.min(cur + inc, score);
    num.textContent = Math.round(cur);
    fill.style.strokeDashoffset = circ - (circ * cur / 100);
    if (cur >= score) { clearInterval(ni); num.textContent = score; }
  }, 16);
}

function paintAuditItems(scores, descMap) {
  const list = document.getElementById('ascores-list');
  list.innerHTML = '';
  scores.forEach((s, i) => {
    const cls = s.val >= 75 ? 'good' : s.val >= 50 ? 'warn' : 'bad';
    const el  = document.createElement('div');
    el.className = 'ascore-item';
    el.style.animationDelay = (i * 0.12 + 0.2) + 's';
    el.innerHTML = `
      <div class="ascore-icon ${cls}">${s.icon}</div>
      <div class="ascore-info">
        <div class="ascore-name">${s.name}</div>
        <div class="ascore-bar-row">
          <div class="ascore-bar-wrap"><div class="ascore-bar-fill ${cls}" style="width:0%"></div></div>
          <div class="ascore-val ${cls}">${s.val}/100</div>
        </div>
        <div class="ascore-desc">${descMap[s.key] || getAuditStaticDesc(s.key, s.val)}</div>
      </div>`;
    list.appendChild(el);
    setTimeout(() => { el.querySelector('.ascore-bar-fill').style.width = s.val + '%'; }, 150 + i * 130);
  });
}

function buildAuditDesc(audits, scores) {
  const desc = {};
  const mkDesc = (arr, fb) => arr.length ? arr.join(' · ') : fb;

  const perf = scores.find(s=>s.key==='perf');
  if (perf) {
    const parts = [];
    const fcp = audits['first-contentful-paint'];
    const lcp = audits['largest-contentful-paint'];
    const tbt = audits['total-blocking-time'];
    if (fcp?.displayValue)  parts.push(`Affichage initial : ${fcp.displayValue}`);
    if (lcp?.displayValue)  parts.push(`Contenu principal : ${lcp.displayValue}`);
    if (tbt?.numericValue > 150) parts.push(`Blocage JS : ${tbt.displayValue}`);
    desc['perf'] = mkDesc(parts, getAuditStaticDesc('perf', perf.val));
  }
  const seo = scores.find(s=>s.key==='seo');
  if (seo) {
    const parts = [];
    if (audits['meta-description']?.score===0)  parts.push('Meta description manquante');
    if (audits['document-title']?.score===0)     parts.push('Balise title absente');
    if (audits['robots-txt']?.score===0)         parts.push('robots.txt non configuré');
    if (seo.val >= 90) parts.push('Excellent référencement technique détecté');
    desc['seo'] = mkDesc(parts, getAuditStaticDesc('seo', seo.val));
  }
  const a11y = scores.find(s=>s.key==='a11y');
  if (a11y) {
    const parts = [];
    if (audits['color-contrast']?.score===0) parts.push('Contraste insuffisant sur certains textes');
    if (audits['image-alt']?.score===0)       parts.push('Images sans texte alternatif');
    if (a11y.val >= 90) parts.push('Site bien accessible — conformité WCAG satisfaisante');
    desc['a11y'] = mkDesc(parts, getAuditStaticDesc('a11y', a11y.val));
  }
  const bp = scores.find(s=>s.key==='bp');
  if (bp) {
    const parts = [];
    if (audits['is-on-https']?.score===0)              parts.push('HTTPS non activé — risque sécurité');
    if (audits['no-vulnerable-libraries']?.score===0)  parts.push('Bibliothèques JS vulnérables détectées');
    if (bp.val >= 90) parts.push('Bonnes pratiques web respectées');
    desc['bp'] = mkDesc(parts, getAuditStaticDesc('bp', bp.val));
  }
  return desc;
}

function getAuditStaticDesc(key, val) {
  const g = val >= 75, w = val >= 50 && val < 75;
  const m = {
    perf: g ? 'Temps de chargement rapide — vos visiteurs restent sur votre site.' :
          w ? 'Performance correcte, optimisation possible : images, cache, JS différé.' :
              'Site lent : vous perdez des visiteurs. Google pénalise les sites > 3s.',
    seo:  g ? 'Balises meta, structure et contenu optimisés — bonne base SEO.' :
          w ? 'SEO technique à compléter : meta descriptions, titres h1/h2, structure.' :
              'SEO insuffisant : votre site est difficilement indexé par Google.',
    a11y: g ? 'Site accessible à tous, y compris aux utilisateurs en situation de handicap.' :
          w ? 'Accessibilité partielle : contrastes, attributs alt ou ARIA à corriger.' :
              'Site peu accessible — non conforme aux normes WCAG.',
    bp:   g ? 'Sécurité HTTPS, bibliothèques à jour, aucune erreur critique.' :
          w ? 'Quelques écarts aux bonnes pratiques web modernes.' :
              'Erreurs ou vulnérabilités détectées — intervention recommandée.',
  };
  return m[key] || '';
}

async function renderAuditAIFallback(url) {
  const loadEl = document.getElementById('audit-loading-new');
  const stepEl = document.getElementById('audit-loading-step');
  const barEl  = document.getElementById('audit-loading-bar');
  loadEl.classList.add('visible');
  if(stepEl) stepEl.textContent = 'Analyse IA en cours…';
  if(barEl)  barEl.style.width  = '65%';

  const hostname = (()=>{ try{return new URL(url).hostname}catch{return url} })();
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514', max_tokens:800,
        messages:[{role:'user',content:`Tu es expert SEO. Génère une estimation d'audit pour le site ${url} (domaine: ${hostname}).
Réponds UNIQUEMENT en JSON pur (sans markdown):
{"scores":[
  {"key":"perf","name":"Performance","val":NOMBRE,"icon":"⚡","desc":"description réaliste courte"},
  {"key":"seo","name":"SEO technique","val":NOMBRE,"icon":"🔍","desc":"description réaliste courte"},
  {"key":"a11y","name":"Accessibilité","val":NOMBRE,"icon":"♿","desc":"description réaliste courte"},
  {"key":"bp","name":"Bonnes pratiques","val":NOMBRE,"icon":"✅","desc":"description réaliste courte"}
]}
IMPORTANT: scores réalistes et variés selon le type de domaine, jamais tous identiques.`}]
      })
    });
    if (!resp.ok) throw new Error('ai');
    const aiData = await resp.json();
    const text = (aiData.content||[]).map(c=>c.text||'').join('').replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(text);
    if(barEl) barEl.style.width = '100%';
    await new Promise(r=>setTimeout(r,300));
    loadEl.classList.remove('visible');
    paintAuditAIScores(parsed.scores, url, hostname, true);
  } catch(e) {
    loadEl.classList.remove('visible');
    paintAuditAIScores(null, url, hostname, false);
  }
}

function paintAuditAIScores(scores, url, hostname, isAI) {
  if (!scores) {
    const base = 48 + Math.floor(Math.random()*28);
    const rnd  = (n) => Math.max(20, Math.min(100, base + Math.floor(Math.random()*n) - Math.floor(n/2)));
    scores = [
      {key:'perf',name:'Performance',     val:rnd(30),icon:'⚡',desc:'Estimation basée sur les standards du secteur.'},
      {key:'seo', name:'SEO technique',   val:rnd(24),icon:'🔍',desc:'Estimation basée sur les standards du secteur.'},
      {key:'a11y',name:'Accessibilité',   val:rnd(36),icon:'♿',desc:'Estimation basée sur les standards du secteur.'},
      {key:'bp',  name:'Bonnes pratiques',val:rnd(22),icon:'✅',desc:'Estimation basée sur les standards du secteur.'},
    ];
  }
  const avg = Math.round(scores.reduce((a,s)=>a+s.val,0)/scores.length);
  paintAuditRing(avg);
  document.getElementById('aglobal-title').textContent = getAuditLabel(avg) + (isAI ? ' (estimation IA)' : ' (estimation)');
  document.getElementById('aglobal-sub').textContent   = `Analyse pour : ${hostname}`;
  document.getElementById('audit-result-new').classList.add('visible');
  paintAuditItems(scores, {});
}

function getAuditLabel(v) {
  if (v >= 90) return '🏆 Excellent — Votre site performe très bien !';
  if (v >= 75) return '👍 Bien — Quelques optimisations possibles';
  if (v >= 50) return '⚠️ Moyen — Des points importants à corriger';
  return '🔴 Faible — Action urgente recommandée';
}

function resetAuditSPA() {
  document.getElementById('audit-result-new').classList.remove('visible');
  document.getElementById('audit-loading-new').classList.remove('visible');
  const bar = document.getElementById('audit-loading-bar');
  if(bar) bar.style.width = '0%';
  document.getElementById('ascores-list').innerHTML = '';
  document.getElementById('aring-num').textContent  = '—';
  const fill = document.getElementById('aring-fill');
  if(fill) { fill.style.strokeDashoffset = 283; }
  const urlInp = document.getElementById('audit-url-new');
  const nameInp = document.getElementById('audit-name-new');
  if(urlInp)  urlInp.value  = '';
  if(nameInp) nameInp.value = '';
  document.getElementById('audit-form-content').style.display = '';
  const hw = document.getElementById('audit-how-wrap');
  if(hw) hw.style.display = '';
  if(urlInp) urlInp.focus();
}

/* Enter key support on audit page */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && currentPage === 'audit') {
    const fc = document.getElementById('audit-form-content');
    if (fc && fc.style.display !== 'none') startAuditSPA();
  }
});


function goToContact() {
  // Pour les boutons "Commencer" et "Devis", on ouvre la modale d'appel
  openCallModal();
}

/* ════════════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const el = document.getElementById('scrollProgress');
  if (!el) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  el.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
}, { passive: true });

/* ════════════════════════════════════════════════
   HERO PARTICLES
════════════════════════════════════════════════ */
(function(){
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 4 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*14+10}s;animation-delay:${Math.random()*12}s;opacity:${Math.random()*0.35+0.1}`;
    container.appendChild(p);
  }
})();

/* ════════════════════════════════════════════════
   RIPPLE ON CLICK
════════════════════════════════════════════════ */
function addRipple(btn, e) {
  const r = document.createElement('span');
  r.className = 'ripple-effect';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  r.style.cssText = `width:${size}px;height:${size}px;top:${e.clientY-rect.top-size/2}px;left:${e.clientX-rect.left-size/2}px`;
  btn.appendChild(r);
  setTimeout(() => r.remove(), 700);
}
document.querySelectorAll('.pricing-btn, .nav-cta, .cta-block-btn, .hero-btn').forEach(btn => {
  btn.addEventListener('click', e => addRipple(btn, e));
});

/* ════════════════════════════════════════════════
   MAGNETIC TILT ON STAT ITEMS
════════════════════════════════════════════════ */
document.querySelectorAll('.stat-item').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(500px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-4px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

/* ════════════════════════════════════════════════
   SPOTLIGHT ON PRICING CARDS
════════════════════════════════════════════════ */
document.querySelectorAll('.pricing-card').forEach(card => {
  const spot = document.createElement('div');
  spot.className = 'pricing-spotlight';
  card.appendChild(spot);
});

/* ════════════════════════════════════════════════
   PILL / DEMO SWITCHER
════════════════════════════════════════════════ */
function showDemo(btn, key) {
  document.querySelectorAll('.pill').forEach(p => {
    p.classList.remove('active');
    const dw = p.querySelector('.pill-dot-wrap');
    const d  = p.querySelector('.pill-dot');
    if (dw) { dw.classList.remove('active'); dw.classList.add('inactive'); }
    if (d)  { d.classList.remove('active');  d.classList.add('inactive'); }
  });
  btn.classList.add('active');
  const dw = btn.querySelector('.pill-dot-wrap');
  const d  = btn.querySelector('.pill-dot');
  if (dw) { dw.classList.remove('inactive'); dw.classList.add('active'); }
  if (d)  { d.classList.remove('inactive');  d.classList.add('active'); }
  ['dev','crm','auto','mobile'].forEach(k => {
    const el = document.getElementById('demo-' + k);
    if (el) el.style.display = (k === key) ? '' : 'none';
  });
}

/* ════════════════════════════════════════════════
   FAQ TOGGLE
════════════════════════════════════════════════ */
function toggleFaq(qEl) {
  const item = qEl.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ════════════════════════════════════════════════
   BLUR-TEXT WORD STAGGER
════════════════════════════════════════════════ */
function initBlurText() {
  document.querySelectorAll('.blur-text-target').forEach(container => {
    const words = container.textContent.trim().split(' ');
    container.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'blur-word';
      span.style.animationDelay = (0.12 + i * 0.08) + 's';
      span.textContent = word;
      container.appendChild(span);
      if (i < words.length - 1) container.appendChild(document.createTextNode('\u00A0'));
    });
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { container.classList.add('blur-text-visible'); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(container);
  });
}

/* ════════════════════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════════════════════ */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1600;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ════════════════════════════════════════════════
   NAVBAR SCROLL EFFECT
════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ════════════════════════════════════════════════
   SERVICES PAGE INIT
════════════════════════════════════════════════ */
function initServicesPage() {
  if (srvObserver) return;
  srvObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); srvObserver.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.service-card, #page-services .reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 3 * 0.09) + 's';
    srvObserver.observe(el);
  });
}

/* ════════════════════════════════════════════════
   DEMO PAGE INTERACTIONS
════════════════════════════════════════════════ */
let demoDone = false;
function initDemoPage() {
  if (demoDone) return;
  demoDone = true;

  // Counter animation
  const counter = document.getElementById('demo-counter');
  if (counter) {
    let v = 0;
    const iv = setInterval(() => { v += 2; counter.textContent = v; if (v >= 48) clearInterval(iv); }, 40);
  }

  // 3D tilt card
  const tc = document.getElementById('tiltCard');
  if (tc) {
    tc.addEventListener('mousemove', e => {
      const r = tc.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tc.style.transform = `perspective(400px) rotateX(${-y*18}deg) rotateY(${x*18}deg)`;
      tc.style.setProperty('--mouse-x', (e.clientX - r.left) / r.width * 100 + '%');
      tc.style.setProperty('--mouse-y', (e.clientY - r.top) / r.height * 100 + '%');
    });
    tc.addEventListener('mouseleave', () => { tc.style.transform = ''; });
  }

  // Ripple on morph btn
  const mb = document.getElementById('morphBtn');
  if (mb) mb.addEventListener('click', e => addRipple(mb, e));
}

// Init — attendre que le DOM soit prêt
document.addEventListener('DOMContentLoaded', function() {

  // Show home page
  showPage('home');

  // Blur text
  initBlurText();

  // ── Animated green dots on canvas ──
  (function(){
    const canvas = document.getElementById('gridDots');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, dots = [];

    function resize(){
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', ()=>{ resize(); }, {passive:true});

    // 45 dots — concentrés dans la moitié haute (hero area)
    for(let i=0;i<45;i++){
      const inHero = Math.random() < 0.70; // 70% dans la zone hero
      const big = Math.random() < 0.18;
      dots.push({
        x: Math.random()*W,
        y: inHero ? Math.random()*H*0.6 : Math.random()*H,
        r: big ? (Math.random()*2.5+2) : (Math.random()*1.4+0.8),
        angle: Math.random()*Math.PI*2,
        speed: Math.random()*0.20+0.05,
        wobble: Math.random()*0.022+0.004,
        baseOpacity: big ? (Math.random()*0.22+0.14) : (Math.random()*0.16+0.08),
        phase: Math.random()*Math.PI*2,
        pulseSpeed: Math.random()*0.014+0.005
      });
    }

    function draw(){
      ctx.clearRect(0,0,W,H);
      dots.forEach(d=>{
        d.x += Math.cos(d.angle)*d.speed;
        d.y += Math.sin(d.angle)*d.speed;
        d.angle += (Math.random()-0.5)*d.wobble;
        if(d.x < -8) d.x = W+8;
        if(d.x > W+8) d.x = -8;
        if(d.y < -8) d.y = H+8;
        if(d.y > H+8) d.y = -8;

        d.phase += d.pulseSpeed;
        const pulse = 0.72 + 0.28*Math.sin(d.phase);

        // Radial fade — fort au centre haut, fondu sur les bords
        const nx = (d.x/W - 0.5)*2;
        const ny = (d.y/H - 0.35)*2; // focus sur la moitié haute
        const dist = Math.sqrt(nx*nx + ny*ny);
        const edgeFade = Math.max(0, 1 - dist*0.95);

        const finalOpacity = d.baseOpacity * pulse * edgeFade;
        if(finalOpacity < 0.015) return;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
        // Couleur exacte du site : #34D16C = rgb(52,209,108)
        ctx.fillStyle = `rgba(52,209,108,${finalOpacity.toFixed(3)})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // Reveal observer
  const revealEls2 = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObs2 = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); revealObs2.unobserve(e.target); } });
  }, { threshold: 0.10 });
  revealEls2.forEach(el => revealObs2.observe(el));

  // Ripple on buttons
  document.querySelectorAll('.pricing-btn, .nav-cta, .cta-block-btn, .hero-btn').forEach(btn => {
    btn.addEventListener('click', e => addRipple(btn, e));
  });

  // Magnetic tilt on stat items
  document.querySelectorAll('.stat-item').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(500px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // Spotlight on pricing cards
  document.querySelectorAll('.pricing-card').forEach(card => {
    const spot = document.createElement('div');
    spot.className = 'pricing-spotlight';
    card.appendChild(spot);
  });

  // FAB
  const fabBtn = document.getElementById('fabBtn');
  if (fabBtn) {
    fabBtn.onclick = function() {
      if (currentPage !== 'home') {
        showPage('home');
        setTimeout(() => { const el = document.getElementById('contact'); if(el){const y=el.getBoundingClientRect().top+window.scrollY-15;window.scrollTo({top:Math.max(0,y),behavior:'smooth'});} }, 400);
      } else {
        const el = document.getElementById('contact');
        if(el){const y=el.getBoundingClientRect().top+window.scrollY-15;window.scrollTo({top:Math.max(0,y),behavior:'smooth'});}
      }
    };
  }

  // Feat cards stagger
  document.querySelectorAll('.feat-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity .55s cubic-bezier(0.22,1,0.36,1) ${i*0.08}s, transform .55s cubic-bezier(0.22,1,0.36,1) ${i*0.08}s, box-shadow .25s, border-color .2s`;
    const obs = new IntersectionObserver(([e]) => {
      if(e.isIntersecting){ card.style.opacity='1'; card.style.transform='none'; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(card);
  });

  // Counter animation
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const values   = [98, 4, 40, 100];
        const suffixes = ['%', 'sem', '%', '%'];
        document.querySelectorAll('.stat-value').forEach((el, i) => {
          el.innerHTML = '';
          setTimeout(() => animateCounter(el, values[i], suffixes[i]), i * 160);
        });
        statsObs.disconnect();
      }
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
  }
});

/* ════════════════════════════════════════════════
   CALL MODAL
════════════════════════════════════════════════ */
function openCallModal() {
  const modal = document.getElementById('callModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCallModal() {
  const modal = document.getElementById('callModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
// Fermer en cliquant sur l'overlay
document.getElementById('callModal') && document.getElementById('callModal').addEventListener('click', function(e) {
  if (e.target === this) closeCallModal();
});
// Fermer avec Echap
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeCallModal();
});

/* ════════════════════════════════════════════════
   HERO QUADRILLAGE + POINTS VERTS ANIMÉS
════════════════════════════════════════════════ */
(function() {
  const quad = document.getElementById('heroQuad');
  if (!quad) return;

  // Quadrillage SVG en fond
  const size = 44;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
  pattern.setAttribute('id', 'heroGrid');
  pattern.setAttribute('width', size);
  pattern.setAttribute('height', size);
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${size} 0 L 0 0 0 ${size}`);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'rgba(52,209,108,0.13)');
  path.setAttribute('stroke-width', '0.8');
  pattern.appendChild(path);
  defs.appendChild(pattern);
  svg.appendChild(defs);
  const mask = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const radMask = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
  radMask.setAttribute('id', 'heroFade');
  radMask.setAttribute('cx', '50%'); radMask.setAttribute('cy', '50%');
  radMask.setAttribute('r', '50%');
  const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', 'white');
  const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s2.setAttribute('offset', '85%'); s2.setAttribute('stop-color', 'white'); s2.setAttribute('stop-opacity', '0.3');
  const s3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s3.setAttribute('offset', '100%'); s3.setAttribute('stop-color', 'white'); s3.setAttribute('stop-opacity', '0');
  radMask.appendChild(s1); radMask.appendChild(s2); radMask.appendChild(s3);
  mask.appendChild(radMask);
  svg.appendChild(mask);
  const mEl = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
  mEl.setAttribute('id', 'hgm');
  const mRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  mRect.setAttribute('width', '100%'); mRect.setAttribute('height', '100%');
  mRect.setAttribute('fill', 'url(#heroFade)');
  mEl.appendChild(mRect);
  svg.appendChild(mEl);
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '100%'); rect.setAttribute('height', '100%');
  rect.setAttribute('fill', 'url(#heroGrid)');
  rect.setAttribute('mask', 'url(#hgm)');
  svg.appendChild(rect);
  quad.appendChild(svg);

  // Points verts animés
  const NUM_DOTS = 18;
  const dots = [];
  for (let i = 0; i < NUM_DOTS; i++) {
    const dot = document.createElement('div');
    const s = Math.random() * 4 + 3; // 3-7px
    dot.style.cssText = `
      position:absolute;border-radius:50%;
      background:rgba(52,209,108,${(Math.random()*0.5+0.4).toFixed(2)});
      width:${s}px;height:${s}px;
      box-shadow:0 0 ${s*2}px rgba(52,209,108,0.7);
      pointer-events:none;
    `;
    quad.appendChild(dot);
    dots.push({
      el: dot,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.15 + 0.05),
      life: Math.random(),
      maxLife: Math.random() * 0.5 + 0.5,
      size: s
    });
  }

  let rafId;
  function animateDots() {
    const W = quad.offsetWidth || 400;
    const H = quad.offsetHeight || 300;
    dots.forEach(d => {
      d.life += 0.004;
      if (d.life > d.maxLife) {
        // reset
        d.x = Math.random() * 100;
        d.y = 100 + Math.random() * 10;
        d.vx = (Math.random() - 0.5) * 0.12;
        d.vy = -(Math.random() * 0.15 + 0.05);
        d.life = 0;
        d.maxLife = Math.random() * 0.5 + 0.5;
      }
      d.x += d.vx;
      d.y += d.vy;
      const progress = d.life / d.maxLife;
      // fade in then out
      const alpha = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
      d.el.style.opacity = (alpha * 0.85).toFixed(2);
      d.el.style.left = d.x + '%';
      d.el.style.top = d.y + '%';
    });
    rafId = requestAnimationFrame(animateDots);
  }
  animateDots();
})();


/* ════════════════════════════════════════════════
   AUDIT PAGE — 3D GRID CANVAS ANIMATION
════════════════════════════════════════════════ */
function initAuditCanvas() {
  const canvas = document.getElementById('auditCanvas3d');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, lines, t = 0;

  function resize() {
    const parent = canvas.parentElement;
    W = canvas.width  = parent.offsetWidth;
    H = canvas.height = parent.offsetHeight;
    buildGrid();
  }

  function buildGrid() {
    lines = [];
    const COLS = 14, ROWS = 8;
    const cw = W / COLS, ch = H / ROWS;
    // Horizontal lines
    for (let r = 0; r <= ROWS; r++) {
      const pts = [];
      for (let c = 0; c <= COLS; c++) pts.push({ x: c * cw, y: r * ch });
      lines.push({ pts, dir: 'h', idx: r });
    }
    // Vertical lines
    for (let c = 0; c <= COLS; c++) {
      const pts = [];
      for (let r = 0; r <= ROWS; r++) pts.push({ x: c * cw, y: r * ch });
      lines.push({ pts, dir: 'v', idx: c });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.012;
    const amp = 8, freq = 0.18;
    lines.forEach(line => {
      ctx.beginPath();
      line.pts.forEach((p, i) => {
        const wave = Math.sin(t + (line.dir === 'h' ? p.x : p.y) * freq + line.idx * 0.5) * amp;
        const px = line.dir === 'h' ? p.x : p.x + wave * 0.4;
        const py = line.dir === 'v' ? p.y : p.y + wave;
        if (i === 0) ctx.moveTo(px, py);
        else         ctx.lineTo(px, py);
      });
      // Color: subtle green to teal gradient based on position
      const progress = (line.dir === 'h' ? line.idx / 8 : line.idx / 14);
      const alpha = 0.06 + Math.abs(Math.sin(t * 0.5 + progress * Math.PI)) * 0.12;
      ctx.strokeStyle = `rgba(52,209,108,${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Floating dots on grid intersections
    const COLS = 14, ROWS = 8;
    const cw = W / COLS, ch = H / ROWS;
    for (let r = 0; r <= ROWS; r++) {
      for (let c = 0; c <= COLS; c++) {
        const wave = Math.sin(t + c * freq + r * 0.5) * amp;
        const dx = c * cw, dy = r * ch + wave;
        const pulse = Math.abs(Math.sin(t * 1.5 + c * 0.3 + r * 0.7));
        if (pulse > 0.75) {
          ctx.beginPath();
          ctx.arc(dx, dy, 1.5 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52,209,108,${(0.15 + pulse * 0.55).toFixed(2)})`;
          ctx.fill();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

// Canvas audit: init appelé depuis showPage principale


/* Routing géré par initRouteOnLoad + hashchange ci-dessus */

