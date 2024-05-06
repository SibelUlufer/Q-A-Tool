import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createQuestions, sortQuestions, removeQuestions } from './helper/questionHelper';
import { testData } from './helper/testData'
import { default as dayjs } from 'dayjs'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.locator(".header")).toHaveText('The awesome Q/A tool')
  await expect(page).toHaveURL('/')
})

test.afterEach(async ({ page }, testInfo) => {
  const currentDate = new Date()
  const formattedDate = dayjs(currentDate).format('D-M-YY HH:mm')
  // test result log for each test
  console.log(`Finished the test "${testInfo.title}" with status "${testInfo.status}" `);
  // error logs when test fails
  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`"${testInfo.title}" failed with ${testInfo.error} error, and ended up at ${page.url()} `);
  // takes full page screenshot after each test and collects under the date folder
  await page.screenshot({ path: `screenshots/${formattedDate}/${testInfo.title}.png`, fullPage: true });
});

test.describe("Q/A Tool tests", () => {
  test('Create question(s) dynamically and verify', async ({ page }) => {
    for (let i = 1; i <= 3; i++) {// set question amount to be created
      const randomQuestionText = faker.word.sample(10).toUpperCase()
      const randomAnswerText = faker.lorem.sentences(2)
      try {
        await createQuestions(page, randomQuestionText, randomAnswerText)//creates questions, checks question amount in sidebar
        // clicks on each question
        const question = page.locator(".question").nth(i);
        await question.click();
        const questionText = await question.innerText(); // extracts question+answer texts of the clicked question
        // performs assertions on the question and answer texts as needed
        expect(questionText).toContain(randomQuestionText);
        expect(questionText).toContain(randomAnswerText);
      } catch (error) {
        console.error(`An error occurred while creating question ${i}: ${error}`);
      }
    }
  })

  test('Remove question(s)', async ({ page }) => {
    await removeQuestions(page)
  })

  test("Sort the questions", async ({ page }) => {
    for (let i = 1; i <= 5; i++) { // set question amount to be created
      const randomQuestionText = faker.word.sample(10).charAt(0).toUpperCase() + faker.word.sample(10).slice(1) // Capital first letter
      const randomAnswerText = faker.lorem.sentences(2)
      await createQuestions(page, randomQuestionText, randomAnswerText)//creates questions, checks question amount in sidebar
    }
    await sortQuestions(page)// sorts questions and verifies
  })

  test("Not create question without Q-A", async ({ page }) => {
    await page.locator('.form button').click({ force: true })// directly clicks on the Create question button
    expect(page.locator('.sidebar')).toContainText(' 1 question') // checks no question is created
  })

  test('Create questions from test data file and verify', async ({ page }) => {
    for (let i = 1; i < testData.length; i++) { // creates all questions from testData file
      const data = testData[i];
      try {
        await createQuestions(page, data.questionText, data.answerText)
        const questions = await page.locator(".question").all(); // gets all questions(existed+created)
        await questions[questions.length - 1].click(); // skips the existed question the the app to not click and check
        const questionText = await questions[questions.length - 1].innerText();
        // performs assertions on the question and answer texts as needed
        expect(questionText).toContain(data.answerText);
        expect(questionText).toContain(data.questionText);
      } catch (error) {
        console.error(`An error occurred while creating question ${i}: ${error}`);
      }
    }
  })

  test('Sort questions created from test data file', async ({ page }) => {
    const selectedTestData = testData.slice(0, 5); // Select the first 5 items from testData
    for (let i = 0; i < selectedTestData.length; i++) {
      const data = testData[i];
      await createQuestions(page, data.questionText, data.answerText) // creates questions from testData
    }
    await sortQuestions(page) // sorts questions and verifies
  })
})
