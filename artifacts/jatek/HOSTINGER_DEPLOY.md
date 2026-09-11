# Déploiement JATEK sur Hostinger Cloud Startup

Le site JATEK est livré comme une application React/Vite statique. Le plan Hostinger Cloud Startup peut l'héberger sans serveur Node.js en production.

## Package prêt à envoyer

Après génération, l'archive `jatek-hostinger.zip` contient le contenu final à déposer dans le dossier `public_html`.

## Mise en ligne

1. Ouvrir **hPanel Hostinger → Gestionnaire de fichiers**.
2. Ouvrir le dossier `public_html`.
3. Sauvegarder ou supprimer l'ancienne version du site si nécessaire.
4. Envoyer `jatek-hostinger.zip`.
5. Extraire l'archive directement dans `public_html` — les fichiers `index.html`, `.htaccess` et `assets/` doivent être à la racine de ce dossier.
6. Associer le domaine au dossier `public_html`, puis vider le cache Hostinger si l'ancienne page apparaît encore.

Le fichier `.htaccess` est inclus pour que les routes React suivantes restent accessibles après actualisation :

- `/`
- `/confidentialite`
- `/mentions-legales`
- `/cookies`
- `/support`
- `/devenir-partenaire`

## Important

Le formulaire support prépare un email vers `contact@jatek.app` via le logiciel de messagerie du visiteur. Pour recevoir les messages sans logiciel de messagerie configuré, il faudra ajouter un service d'envoi côté serveur ou un formulaire Hostinger.

## Reconstruction du package

Depuis la racine du monorepo :

```bash
pnpm --filter @workspace/jatek run build:hostinger
cd artifacts/jatek/dist/public
zip -r ../../../jatek-hostinger.zip .
```