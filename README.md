# Bitchest

Ce projet est une application Web permettant de gérer les crypto-monnaies, avec la possibilité d'acheter et vendre des cryptos au cours actuel. L'application est développée avec Laravel et React.js.

## Prérequis

Avant de commencer, assurez-vous que votre environnement de développement répond aux exigences suivantes :

- PHP >= 8.1
- Composer
- Node.js >= 14.x
- NPM ou Yarn

## Installation

Suivez les étapes ci-dessous pour installer et exécuter l'application localement sur votre machine :

1. Clonez le projet à partir du référentiel Git :

```bash
git clone <https://github.com/Jaures277/bitChest.git>
cd bitchest
```

2. Installez les dépendances PHP en utilisant Composer :

```bash
composer install
npm install
npm run dev
```

Installez les dépendances JavaScript en utilisant NPM ou Yarn :

```bash
npm install
# ou
yarn install
```

3. Copiez le fichier .env.example en tant que .env et configurez les variables d'environnement, notamment la configuration de la base de données et les informations de connexion.

```bash
cp .env.example .env
```

4. Assurez-vous de générer une clé d'application unique :

```bash
php artisan key:generate

```

Exécutez les migrations pour créer les tables nécessaires dans la base de données :

```bash
php artisan migrate
```

Exécutez le seeder pour pré-remplir la table des paires de devises avec des données de test :

```bash
php artisan db:seed
```

## Utilisation
Une fois l'installation terminée, vous pouvez exécuter l'application en utilisant la commande suivante :

```bash
php artisan serve
npm run dev
```

L'application sera accessible à l'adresse http://localhost:8000 dans votre navigateur.

## Fonctionnalités
L'application offre les fonctionnalités suivantes :

    1. coté admin

- Affichage de la liste des utilisateur.
- Ajout, modification et suppression d'un utilisateur.
- Possibilité de changer le rôle d'un utilisateur.
- Consulté le cours actuelle de chaque crypto

    2. coté client

- Affichage de la liste des cryptos.
- Achat et Vente d'une cryptomonnaies.
- Consulté le cours actuelle de chaque crypto
- modifier son profile
- consulter son historique de transaction

## Technologie utilisée

-Laravel 10.x - Framework PHP pour le backend.
-React.js ^17.0.2 - Framework JavaScript pour le frontend.

<<<<<<< Updated upstream
## Auteurs
Ce projet a été développé par Jaures Okou.
=======
## Parametre d'acces
Admin : admin@exemple.com - 
Client : client@exemple.com
Mot de passe : password

## Auteurs
Ce projet a été développé par Jaures Okou.
>>>>>>> Stashed changes
