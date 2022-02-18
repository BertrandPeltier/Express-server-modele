HOW TO INSTALL
==============

``` sh
# Exemple : après avoir cloné un challenge dans le dossier mon-challenge/
# direction le dossier du challenge
cd mon-challenge
# copie des fichiers cachés et non-cachés présents à la racine du modèle
# note : des alertes sont affichées à propos de dossiers ignorés, c'est normal
cp -n ../Express-server-modele/{.*,*} .
# copie (récursive) des dossiers src/, config/, public/ et tests/
# note : des alertes sont affichées à propos de dossiers ignorés, c'est normal
cp -rn ../Express-server-modele/app .
# installation des dépendances listées dans le package.json
npm install
# Création du fichier .env
touch .env
cat .env.example >> .env
# lancement du serveur de dev
npm start
```
