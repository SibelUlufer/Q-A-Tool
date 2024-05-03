import { Page, expect } from '@playwright/test';

export async function createQuestions(page: Page, qtext:string, atext:string) {
      await page.locator("#question").fill(qtext + " ?") // fills question text
      await page.locator("#answer").fill(atext) // fills answer text
      await expect(page.getByRole('button', { name: "Create question" })).toBeVisible() // checks visibility of the create button
      await page.locator('.form button').click() // clicks create button
      const questionAmount = await page.locator(".card ul li").count()//gets number of visible questions
      expect(await page.locator(".sidebar").innerText()).toContain(questionAmount.toString())//verifies if the question amount is same in the sidebar
}

export async function sortQuestions(page:Page) {
  await expect(page.getByRole('button', { name: "Sort questions" })).toBeVisible() // checks the visiblity of sort button
  await page.getByRole('button', { name: "Sort questions" }).click() // clicks on sort button
  const questions = await page.locator('.card .question__question').all()//gets the lists of questions
  // extracts the text of each element
  const questionTexts = [];
  for (const element of questions) {
    const text = await element.innerText();
    questionTexts.push(text);
  }
  //const sortedTexts = [...elementTexts].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  /* a.toLowerCase(): Converts the text of the first element (a) to lowercase.
    b.toLowerCase(): Converts the text of the second element (b) to lowercase.
    .localeCompare(b.toLowerCase()): Compares the two lowercase strings (a and b) using a locale-specific string comparison.
    This ensures that the sorting is case-insensitive and follows the correct alphabetical order based on the current locale.
  */
  // checks if the elements are sorted
  const sortedTexts = [...questionTexts].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  expect(questionTexts).toEqual(sortedTexts);
}

export async function removeQuestions(page:Page) {
  const noQuestionText = "Here you can find no questions. Feel free to create your own questions!"
  await expect(page.getByRole('button', { name: "Remove questions" })).toBeVisible() // check the visiblity of remove button
  await page.getByRole('button', { name: "Remove questions" }).click() // clicks remove button
  await expect(page.locator('.alert')).toBeVisible() // checks the alert message's visibility
  await expect(page.locator('.alert')).toContainText("No questions yet :-(") // checks the alert message's context
  await expect((page.getByRole('button', { name: "Remove questions" }))).toBeHidden()
  await expect((page.getByRole('button', { name: "Sort questions" }))).toBeHidden()
  expect(await page.locator(".sidebar").innerText()).toContain(noQuestionText)
}
