/**
 * ═══════════════════════════════════════════════════════
 *  CONFIG.JS — Alpha Korner | Cerveau de navigation
 *  Toutes les URLs et redirections centralisées ici.
 *  Pour modifier un lien, changez UNIQUEMENT ce fichier.
 * ═══════════════════════════════════════════════════════
 */

const NAV_LINKS = {
  // ── Liens internes (SPA router) ──────────────────────
  home:         '/',
  services:     '/services',
  demo:         '/demo',
  audit:        '/audit',
  contact:      '#contact',

  // ── Produits Alpha Korner ─────────────────────────────
  wheel:        'https://wheel.alpha-korner.com/',
  leoai:        'https://leoai.alpha-korner.com/',
  osiris:       'https://osiris.alpha-korner.com/',
  nobot:        'https://nobot.ai.alpha-korner.com/',
  iptv:         'https://iptv.alpha-korner.com/',

  // ── Réseaux sociaux ───────────────────────────────────
  linkedin:     'https://www.linkedin.com/company/alphakorner',
  facebook:     'https://www.facebook.com/alphakorner',
  github:       'https://github.com/alphakorner',

  // ── Contacts directs ──────────────────────────────────
  tel:          'tel:+33353630332',
  email:        'mailto:Contact@alphakorner.fr',
  maps:         'https://maps.google.com/?q=15+Route+de+Hausbergen+67300+Schiltigheim',

  // ── APIs externes ─────────────────────────────────────
  pagespeed:    'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
  anthropic:    'https://api.anthropic.com/v1/messages',
};

/**
 * Informations de l'entreprise (référencées dans le JS et SEO)
 */
const COMPANY = {
  name:         'Alpha Korner',
  founder:      'Brice Jacotet',
  phone:        '03.53.63.03.32',
  phoneFull:    '+33353630332',
  email:        'Contact@alphakorner.fr',
  address:      '15 Route de Hausbergen, 67300 Schiltigheim',
  city:         'Strasbourg',
  region:       'Alsace, Grand Est',
  zipCode:      '67000',
  website:      'https://www.alphakorner.fr',
  year:         '2026',
  foundedYear:  '2024',
  primaryColor: '#34D16C',
};
