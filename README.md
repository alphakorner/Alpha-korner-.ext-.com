# Alpha Korner — Site Web

Site officiel de l'agence Alpha Korner — Agence Web & Logiciels Sur Mesure, Strasbourg.

Hébergé via **GitHub Pages**.

---

## 📁 Structure des fichiers

```
/
├── index.html          ← Point d'entrée unique du site (SPA)
├── 404.html            ← ⚠️ Ne pas supprimer — gère le routing GitHub Pages
├── .gitignore
├── config.links.js     ← ⭐ Configuration de tous les liens/boutons du site
│
├── assets/
│   ├── style.css       ← Tous les styles CSS
│   └── app.js          ← Tout le JavaScript + routeur SPA
│
└── pages/              ← Contenu HTML de référence pour chaque page
    ├── page-home.html
    ├── page-services.html
    ├── page-demo.html
    └── page-audit.html
```

---

## ✏️ Modifier un lien ou un bouton

**→ Ouvrir `config.links.js`**

Chaque bouton du site y est documenté avec un `label` explicite. Exemple :

```js
NAV_BTN_DEMO: {
  label: "Bouton ✦ Démo dans la nav → va sur la page Nos Solutions",
  page: "demo",
  href: "#demo",
  action: null,
  target: "_self",
},
```

---

## 🔄 Comment fonctionne le routing (GitHub Pages)

GitHub Pages est un hébergeur **statique** — il ne supporte pas le rewriting d'URL côté serveur.

**Solution mise en place :**

| Fichier | Rôle |
|---------|------|
| `404.html` | Quand GitHub ne trouve pas `/audit`, il sert ce fichier. Le script redirige vers `/#audit`. |
| `app.js` → `initRouteOnLoad()` | Lit `window.location.hash` au chargement et affiche la bonne page. |
| `app.js` → `hashchange` event | Gère le bouton Précédent/Suivant du navigateur. |

**URLs du site :**

| Page | URL GitHub Pages |
|------|-----------------|
| Accueil | `https://alphakorner.fr/` |
| Nos Solutions | `https://alphakorner.fr/#demo` |
| Audit SEO | `https://alphakorner.fr/#audit` |
| Services | `https://alphakorner.fr/#services` |

---

## 🚀 Déploiement GitHub Pages

1. Pushez ce repo sur GitHub
2. `Settings` → `Pages` → Source : **`main` branch, `/ (root)`**
3. GitHub génère automatiquement `https://<username>.github.io/<repo>/`
4. Avec un domaine custom : ajoutez un fichier `CNAME` contenant `alphakorner.fr`

---

## 📞 Modifier le numéro de téléphone

Dans `config.links.js` + dans `index.html`, cherchez `03.53.63.03.32` et `+33353630332`.
