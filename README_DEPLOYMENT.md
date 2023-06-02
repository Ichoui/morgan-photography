# Méthode de déploiement

## Créer une nouvelle galerie d'image

> 1. Rajouter un object à la constante `./src/scripts/gallery.exif.ts`
> 2. Donner un nom à la constante identifier dans le script `./src/scripts/script.exif.ts`
> 3. Créer le dossier `./public/assets/photos/IDENTIFIER` et y ajouter les photos retouchées
> 4. `npm run play:script` pour générer le script. C'est tout!

Un fichier `identifier.json` est créé dans `./public/assets/jsonExif`, contenant l'exif de chaque photo, et un dossier `thumbnails` est créé à la racine de `./public/assets/photos/IDENTIFIER`


## Format des photos
Les images sont en 1920*1080, 300ppp (pixels par pouces)

## Firebase
> - `npm run firebase:deploy`
> - Se connecter sur la console Firebase https://console.firebase.google.com/u/0/project/photography-react-6acc2/hosting/sites?hl=fr  
> - Supprimer l'historique de versions pour éviter de polluer

Attention : Les déploiements peuvent être un peu long.

# Déploiement

> - `npm run build` : pour générer le build
> - `npm run build:preview` : pour tester si le build est fonctionnel en local
> - `npm run firebase:deploy` : déploiement en prod. Lire la partie sur Firebase.
