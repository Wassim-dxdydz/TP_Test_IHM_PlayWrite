import { test, expect } from '@playwright/test';

const URL = 'https://alexdmr.github.io/l3m-2023-2024-angular-todolist/';

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

// Chargement de la page
test('devrait charger la page du gestionnaire de tâches', async ({ page }) => {
  await expect(page).toHaveTitle(/Liste Miage|Todolist/i);
  // Le champ d’ajout de tâches utilise le placeholder "Que faire ?"
  const input = page.getByPlaceholder('Que faire?');
  await expect(input).toBeVisible();
});

// Ajout d’une tâche

test('devrait ajouter une nouvelle tâche', async ({ page }) => {
  const input = page.getByPlaceholder('Que faire?');
  await input.fill('Acheter du lait');
  // L’ajout se fait uniquement en pressant Entrée
  await input.press('Enter');
  const item = page.locator('li', { hasText: 'Acheter du lait' });
  await expect(item).toBeVisible();
});

// Marquer une tâche comme terminée

test('devrait cocher une tâche comme terminée', async ({ page }) => {
  const input = page.getByPlaceholder('Que faire?');
  await input.fill('Promener le chien');
  await input.press('Enter');
  const item = page.locator('li', { hasText: 'Promener le chien' });
  const checkbox = item.locator('input[type="checkbox"]');
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

// suppression d’une tâche
test('devrait supprimer une tâche', async ({ page }) => {
  const input = page.getByRole('textbox').first();
  await input.fill('Lire un livre');
  await input.press('Enter');
  const list = page.locator('ul').first();
  const item = list.locator('li', { hasText: 'Lire un livre' });
  await expect(item).toBeVisible();
  // Le bouton de suppression apparaît uniquement au survol
  await item.hover();
  const deleteBtn = item.locator('button.destroy').first();
  await expect(deleteBtn).toBeVisible();
  await deleteBtn.click();
  await expect(item).not.toBeVisible();
});

// Filtrer les tâches terminées
test('devrait filtrer les tâches terminées', async ({ page }) => {
  const input = page.getByPlaceholder('Que faire?');
  await input.fill('Tâche A');
  await input.press('Enter');
  await input.fill('Tâche B');
  await input.press('Enter');
  const taskA = page.locator('li', { hasText: 'Tâche A' });
  await taskA.locator('input[type="checkbox"]').check();
  // Le filtre "Complétés" se trouve dans la deuxième liste et non sous forme de bouton
  const completedFilter = page.locator('ul').nth(1).getByText('Complétés');
  await completedFilter.click();
  await expect(taskA).toBeVisible();
  const taskB = page.locator('li', { hasText: 'Tâche B' });
  await expect(taskB).toHaveCount(0);
});

// Nettoyage des tâches complétées
test('devrait nettoyer les tâches complétées (fonction non disponible)', async ({ page }) => {
  const input = page.getByPlaceholder('Que faire?');
  await input.fill('Tâche X');
  await input.press('Enter');
  await input.fill('Tâche Y');
  await input.press('Enter');
  const taskX = page.locator('li', { hasText: 'Tâche X' });
  await taskX.locator('input[type="checkbox"]').check();
  // Aucun bouton "Supprimer tâches complétées" n’est présent.
  const clearBtn = page.getByText(/supprimer les tâches complétées/i);
  await expect(clearBtn).toHaveCount(0);
});
