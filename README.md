# 🧪 TP – Tests IHM avec Playwright  
**Auteur : ABAHRI Wassim**

---

## 📌 1. Objectif du TP

Ce projet vise à :

- Mettre en place des **tests automatisés** avec Playwright pour une application web de gestion de tâches.
- Produire un **modèle de tâches** (ConcurTaskTrees) décrivant les principales interactions utilisateur.

## 🧭 3. Modèle de tâches (CTT)

Le fichier `ModèleDeTâches.kxml` décrit les tâches principales d’un utilisateur de l’application :

- Ajouter une tâche  
- Marquer/démarquer une tâche comme terminée  
- Supprimer une tâche  
- Filtrer les tâches (toutes / actives / complétées)  
- Nettoyer les tâches complétées (si disponible)

 Le modèle est fourni au format `.kxml`.

 ## 🧪 4. Tests Playwright

Les tests couvrent :

- Chargement de l'application  
- Ajout d’une nouvelle tâche  
- Suppression d’une tâche  
- Completion d’une tâche  
- Filtrage (All / Active / Completed)  
- Vérification de l’absence de bouton "Supprimer les tâches complétées" si non implémenté

### ▶️ Installation

```bash
npm install

npx playwright test

npx playwright show-report
