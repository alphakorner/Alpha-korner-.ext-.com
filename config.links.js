/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║           ALPHA KORNER — FICHIER DE CONFIGURATION DES LIENS      ║
 * ║                  Modifiez ici sans toucher au code               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * MODE D'EMPLOI (GitHub Pages) :
 *  Les liens internes utilisent des HASH : "#demo", "#audit", "#services"
 *  (GitHub Pages ne supporte pas /demo directement → on utilise /#demo)
 *
 *  - Chaque entrée correspond à un bouton ou lien du site.
 *  - "href"     : l'URL de destination. Mettez "#" si le bouton n'a pas encore de lien.
 *  - "page"     : nom de la page interne SPA (home | services | demo | audit) — laisser null si c'est un lien externe.
 *  - "action"   : nom d'une fonction JS spéciale (ex: "openCallModal") — laisser null si pas d'action.
 *  - "target"   : "_blank" pour ouvrir dans un nouvel onglet, "_self" pour la même fenêtre.
 *  - "label"    : description lisible de ce que fait ce bouton (pour vous).
 *
 * RÈGLES GUILLEMETS :
 *  - Les URLs internes (pages SPA) n'ont PAS besoin de guillemets dans href → mettez "#"
 *  - Les URLs externes doivent commencer par https:// (ex: "https://www.google.com")
 *  - Les numéros de téléphone → "tel:+33353630332"
 *  - Les emails → "mailto:contact@alphakorner.fr"
 */

const LINKS = {

  /* ──────────────────────────────────────────────────────────────
     NAVIGATION (barre du haut)
  ────────────────────────────────────────────────────────────── */

  NAV_LOGO: {
    label: "Logo Alpha Korner (haut gauche) → revient à l'accueil",
    page: "home",          // page SPA cible
    href: "#",             // URL dans la barre du navigateur
    action: null,
    target: "_self",
  },

  NAV_BTN_DEMO: {
    label: "Bouton ✦ Démo dans la nav → va sur la page Nos Solutions",
    page: "demo",
    href: "#demo",
    action: null,
    target: "_self",
  },

  NAV_BTN_DEMARRER: {
    label: "Bouton 'Démarrer un projet' dans la nav → ouvre le popup d'appel téléphonique",
    page: null,
    href: "#",
    action: "openCallModal",   // déclenche le modal téléphone
    target: "_self",
  },

  NAV_RETOUR: {
    label: "Bouton 'Retour' (affiché sur les pages secondaires) → revient à l'accueil",
    page: "home",
    href: "#",
    action: null,
    target: "_self",
  },

  NAV_TEL: {
    label: "Bouton téléphone dans la nav (03.53.63.03.32) → appel direct",
    page: null,
    href: "tel:+33353630332",  // ← MODIFIEZ ici si le numéro change
    action: null,
    target: "_self",
  },

  /* ──────────────────────────────────────────────────────────────
     PAGE ACCUEIL (HOME)
  ────────────────────────────────────────────────────────────── */

  HOME_HERO_CTA: {
    label: "Gros bouton 'Démarrer un projet' au centre de la page d'accueil → popup appel",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  HOME_HERO_AUDIT_BANNER: {
    label: "Bannière verte 'Effectuez votre audit gratuitement' sous le bouton principal → page Audit",
    page: "audit",
    href: "#audit",
    action: null,
    target: "_self",
  },

  HOME_MORE_SERVICES: {
    label: "Bouton 'Voir tous nos services' (section features) → page Services",
    page: "services",
    href: "#services",
    action: null,
    target: "_self",
  },

  HOME_FINAL_CTA: {
    label: "Bouton final 'Démarrer un projet' en bas de l'accueil → popup appel",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  HOME_FOOTER_LOGO: {
    label: "Logo dans le footer de la page d'accueil → revient en haut de l'accueil",
    page: "home",
    href: "#",
    action: null,
    target: "_self",
  },

  HOME_INFOS_EMAIL: {
    label: "Lien email dans le bloc contact (bas de l'accueil)",
    page: null,
    href: "mailto:contact@alphakorner.fr",  // ← MODIFIEZ si l'email change
    action: null,
    target: "_self",
  },

  HOME_INFOS_TEL: {
    label: "Lien téléphone dans le bloc contact (bas de l'accueil)",
    page: null,
    href: "tel:+33353630332",  // ← MODIFIEZ si le numéro change
    action: null,
    target: "_self",
  },

  /* ──────────────────────────────────────────────────────────────
     PAGE SERVICES
  ────────────────────────────────────────────────────────────── */

  SERVICES_HERO_CTA: {
    label: "Bouton 'Obtenir un devis' dans le hero de la page Services → popup appel",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  SERVICES_CARD_CTA: {
    label: "Tous les boutons 'Démarrer' sur les cartes de service → popup appel (fonction goToContact)",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  SERVICES_CAPABILITIES_CTA: {
    label: "Bouton 'Démarrer un projet' dans la section stack technique",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  SERVICES_FINAL_CTA: {
    label: "Bouton 'Démarrer maintenant' tout en bas de la page Services",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  /* ──────────────────────────────────────────────────────────────
     PAGE DÉMO (NOS SOLUTIONS)
  ────────────────────────────────────────────────────────────── */

  DEMO_SOL1_WHEEL: {
    label: "Bouton 'Voir en plein écran' — Solution 01 : Roue Gagnante Fidzy Wheel",
    page: null,
    href: "https://wheel.alpha-korner.com/",  // ← MODIFIEZ si l'URL change
    action: null,
    target: "_blank",
  },

  DEMO_SOL2_CHATBOT: {
    label: "Bouton 'Voir le chatbot' — Solution 02 : Chatbot IA",
    page: null,
    href: "#",  // ← METTEZ l'URL de votre démo chatbot ici
    action: null,
    target: "_blank",
  },

  DEMO_SOL3_AGENDARIA: {
    label: "Bouton 'Voir la démo' — Solution 03 : Agendaria (planification)",
    page: null,
    href: "#",  // ← METTEZ l'URL de votre démo Agendaria ici
    action: null,
    target: "_blank",
  },

  DEMO_SOL4_DELIVRIZ: {
    label: "Bouton 'Voir DeliVriz' — Solution 04 : DeliVriz (livraison)",
    page: null,
    href: "#",  // ← METTEZ l'URL de votre démo DeliVriz ici
    action: null,
    target: "_blank",
  },

  DEMO_SOL5_INFLOW: {
    label: "Bouton 'Ouvrir InFlow' — Solution 05 : InFlow CRM",
    page: null,
    href: "#",  // ← METTEZ l'URL de votre démo InFlow ici
    action: null,
    target: "_blank",
  },

  DEMO_SOL6_CALAPP: {
    label: "Bouton 'Voir CalApp' — Solution 06 : CalApp (calendrier)",
    page: null,
    href: "#",  // ← METTEZ l'URL de votre démo CalApp ici
    action: null,
    target: "_blank",
  },

  DEMO_SOL7_BEDAI: {
    label: "Bouton 'Essayer Bed.ai' — Solution 07 : Bed.ai (IA quotidien)",
    page: null,
    href: "https://bed.ai.alpha-korner.com/",  // ← MODIFIEZ si l'URL change
    action: null,
    target: "_blank",
  },

  DEMO_SOL8_PSW: {
    label: "Bouton 'Accéder au gestionnaire' — Solution 08 : PSW Manager",
    page: null,
    href: "https://psw-manager.alpha-korner.com/",  // ← MODIFIEZ si l'URL change
    action: null,
    target: "_blank",
  },

  DEMO_BOTTOM_CTA: {
    label: "Bouton 'Démarrer mon projet →' en bas de la page Démo → popup appel",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  /* ──────────────────────────────────────────────────────────────
     PAGE AUDIT
  ────────────────────────────────────────────────────────────── */

  AUDIT_RESULT_CTA: {
    label: "Bouton 'Obtenir un audit complet' après les résultats de l'audit → popup appel",
    page: null,
    href: "#",
    action: "openCallModal",
    target: "_self",
  },

  /* ──────────────────────────────────────────────────────────────
     MODAL TÉLÉPHONE (popup)
  ────────────────────────────────────────────────────────────── */

  MODAL_TEL_BTN: {
    label: "Bouton 'Appeler maintenant' dans le popup → appel téléphonique direct",
    page: null,
    href: "tel:+33353630332",  // ← MODIFIEZ si le numéro change
    action: null,
    target: "_self",
  },

  MODAL_DISPLAYED_NUMBER: {
    label: "Numéro affiché dans le popup (texte visible '03.53.63.03.32')",
    value: "03.53.63.03.32",   // ← MODIFIEZ l'affichage du numéro ici
    // Attention : modifiez aussi MODAL_TEL_BTN.href ci-dessus
  },

  /* ──────────────────────────────────────────────────────────────
     RÉSEAUX SOCIAUX (schema.org)
  ────────────────────────────────────────────────────────────── */

  SOCIAL_LINKEDIN: {
    label: "Profil LinkedIn Alpha Korner (données structurées SEO)",
    href: "https://www.linkedin.com/company/alphakorner",  // ← MODIFIEZ si besoin
    target: "_blank",
  },

  SOCIAL_FACEBOOK: {
    label: "Page Facebook Alpha Korner (données structurées SEO)",
    href: "https://www.facebook.com/alphakorner",  // ← MODIFIEZ si besoin
    target: "_blank",
  },

  SOCIAL_GITHUB: {
    label: "Profil GitHub Alpha Korner (données structurées SEO)",
    href: "https://github.com/alphakorner",  // ← MODIFIEZ si besoin
    target: "_blank",
  },

};

// Export pour utilisation dans app.js (si vous utilisez un bundler)
// Si vous restez en vanilla JS, ce fichier est simplement chargé avant app.js
if (typeof module !== 'undefined') module.exports = LINKS;
