# Devoir 1 : Catalogue de Bibliothèque (LOG3550) - Bibliothèque Le Jacmelien

## Description du projet
Ce projet consiste à développer le frontend d'une application web de gestion de catalogue de bibliothèque. L'application permet de consulter les livres de départ, d'effectuer des recherches dynamiques en temps réel (insensibles à la casse et aux accents), de filtrer par catégorie ou par disponibilité, de trier les éléments (par titre ou par année), ainsi que d'ajouter et de supprimer des livres de manière interactive sans recharger la page. Les données sont persistées dans le navigateur grâce au `localStorage`.

## Mode d'emploi
1. Téléchargez ou clonez (en local) ce dépôt sur votre machine.
2. Ouvrez le projet dans votre éditeur de code (**Visual Studio Code** recommandé).
3. Ouvrez le fichier `index.html` dans un navigateur web récent (Chrome, Firefox, Edge) ou utilisez une extension de serveur local comme **Live Server** sur VS Code.
4. Le catalogue se charge automatiquement avec un ensemble de livres initiaux et est immédiatement interactif.

## Questions d'explication du devoir

### 1. Pourquoi les balises sémantiques sont préférables à une suite de div ?
Les balises sémantiques (`<header>`, `<main>`, `<section>`, etc.) donnent un sens précis au code HTML en décrivant explicitement le rôle de chaque bloc. Elles améliorent considérablement l'**accessibilité** en guidant efficacement les lecteurs d'écran pour les malvoyants. Elles optimisent le **référencement (SEO)** en permettant aux robots des moteurs de recherche d'indexer la structure de la page. Enfin, elles facilitent la **maintenance** du code en le rendant beaucoup plus lisible et compréhensible qu'une suite anarchique de `div`.

### 2. Différence entre map, filter et forEach, et choix pour l'application
`forEach` exécute simplement une fonction sur chaque élément d'un tableau sans retourner de nouveau tableau ; 
`map` transforme chaque élément et retourne un nouveau tableau de même taille ; 
`filter` évalue chaque élément selon une condition et retourne un sous-tableau contenant uniquement les éléments correspondants. Pour notre application, nous avons exclusivement utilisé **`filter`** pour isoler les livres selon la recherche textuelle, les catégories et la disponibilité, ainsi que des boucles itératives pour générer dynamiquement les éléments du DOM.

## Choix de conception & Technologies utilisées
* **HTML5 Sémantique :** Utilisation de balises structurées (`<header>`, `<main>`, `<section>`, `<footer>`) pour garantir une excellente accessibilité (a11y) et un référencement optimal.
* **CSS & Design Adaptatif (Responsive) :** Utilisation de **Tailwind CSS** combiné à une grille flexible (`CSS Grid` / `Flexbox`) s'adaptant à toutes les tailles d'écran (mobile-first avec points de rupture).
* **JavaScript Pur (Vanilla) :** Manipulation dynamique du DOM (via `createElement`), gestion des tableaux avec les méthodes modernes (`map`, `filter`, `sort`, `forEach`), validation de formulaire côté client et persistance via le `localStorage`.
* **Accessibilité (a11y) :** Respect des normes avec des labels associés pour chaque champ de formulaire et des annonces dynamiques pour les lecteurs d'écran (`aria-live`, `aria-describedby`).

##  Difficultés rencontrées
* **Gestion de la recherche insensible aux accents :** L'utilisation de la fonction de normalisation (`normalize("NFD")`) a nécessité une attention particulière pour nettoyer correctement les caractères diacritiques lors de la saisie utilisateur.
* **Validation rigoureuse du formulaire :** J'ai du m'assurer que chaque contrainte (longueur minimale du titre et de l'auteur, intervalle d'années valide entre 1450 et l'année en cours) s'affiche correctement sous forme de messages d'erreur accessibles sans bloquer l'expérience utilisateur.
* **Erreur d'affichage de l'image de fond :** J'ai eu un gros probleme avec cette situation. J'ai mis l'image dans `/public` et l'appeler depuis le fichier html.
* **Passer master comme `default branch` :** J'ai tout poussé sur la branche master, ainsi je devais mettre master comme la branche par défaut, cela m'as pris quelque minutes. 

##  Sources et Outils d'assistance
* **Cours et supports de l'ISTEAH :** Enseignements dispensés par le professeur Samuel Jonathan Joseph dans le cadre du cours *LOG3550 Développement web* ainsi que l'énoncé du devoir 1.
* **Outils d'assistance :** Utilisation d'assistants IA Claude/Gemini pour structurer le code, valider les bonnes pratiques d'accessibilité ARIA, concevoir la mise en page responsive, et la rédaction du README.md.
