# Méthode de déploiement

## Créer une nouvelle galerie d'image

> - Donner un nom à la constante identifier dans le script `./src/scripts/script.exif.ts`
> - Créer le dossier `./public/assets/photos/IDENTIFIER` et y ajouter les photos retouchées
> - `npm run play:script`

Un fichier `identifier.json` est créé dans `./public`, contenant l'exif de chaque photo, et un dossier `thumbnails` est créé à la racine de `./public/assets/photos/IDENTIFIER`

## Format des photos
// TODO

## Firebase
> - `npm run firebase:deploy`
> - Se connecter sur la console Firebase https://console.firebase.google.com/u/0/project/photography-react-6acc2/hosting/sites?hl=fr  
> - Supprimer l'historique de versions pour éviter de polluer

Attention : Les déploiements peuvent être un peu long.

