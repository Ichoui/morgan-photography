# Méthode de déploiement

## Créer une nouvelle galerie d'image

> 1. Rajouter un object à la constante `./src/scripts/gallery.exif.ts`
> 2. Donner un nom à la constante identifier dans le script `./src/scripts/script.exif.ts`
> 3. Créer le dossier `./public/assets/photos/IDENTIFIER` et y ajouter les photos retouchées
> 4. `npm run play:script` pour générer le script. C'est tout!

Un fichier `identifier.json` est créé dans `./public/assets/jsonExif`, contenant l'exif de chaque photo, et un dossier `thumbnails` est créé à la racine de `./public/assets/photos/IDENTIFIER`


## Format des photos / Tips Lightroom

> Les images sont en 1920*1080, 300ppp (pixels par pouces)

**Tip :** Un fichier `.CR3` (.raw) n'est jamais modifié, il est accompagné par un fichier `.xmp` qui stocke toutes les retouchées effectuées sur lightroom.

**Tip :** CTRL+A sur une image pour sélectionner la galerie > clic droit > Exporter > (Non-)Retouchées et ainsi exporter toutes les images au format souhaité

**Tip :** CTRA+A sur une image pour sélectionner la galerie > clic droit > Métadonnées > Enregistrer les métadonnées dans le(s) fichier(s) : A faire lorsque que session de retouche terminée

**Tip :** Supprimer les images jugées mauvaises avant la post-prod Lightroom pour gagner du temps (depuis Windows Explorer / Appareil Photo)

**Tip :** Un voyage = un dossier, contenant les fichiers .CR3, un dossier Retouchées / Non-retouchées





## Firebase
> - `npm run firebase:deploy`
> - Se connecter sur la console Firebase https://console.firebase.google.com/u/0/project/photography-react-6acc2/hosting/sites?hl=fr  
> - Supprimer l'historique de versions pour éviter de polluer

Attention : Les déploiements peuvent être un peu long.

# Déploiement

> - `npm run build` : pour générer le build
> - `npm run build:preview` : pour tester si le build est fonctionnel en local
> - `npm run firebase:deploy` : déploiement en prod. Lire la partie sur Firebase.
