# QA Tool Automation Project Documentation

This documentation provides an in-depth overview of the Q/A Tool automation project, covering various aspects such as analysis, planning, technical solution selection, design patterns, implementation, execution, and more.

## Project Overview

The Q/A Tool automation project aims to automate testing scenarios for a web application. The project utilizes Playwright with typescript.

## Analysis

Before initiating the automation project, a thorough analysis of the web application was conducted to identify key functionalities, user interactions, and testing requirements. This analysis helped in understanding the scope of automation and defining the test scenarios.

## Planning

The planning phase involved defining test objectives, prioritizing test cases, and establishing a test strategy. Test scenarios were categorized based on their criticality and frequency of use.

## Technical Solution Selection

Several automation tools were evaluated before selecting Playwright as the preferred tool for the project. Playwright's cross-browser support, robust APIs, and ease of use made it suitable for automating testing scenarios across different browsers and devices.

## Design Pattern Choice

The automation project follows a modular and maintainable design pattern to ensure scalability and reusability of test code. Data Driven Testing is adopted to test the web app.
Test cases related to create process conducted in two different process;
  - Dynamically created question and answers
  - Set of questions and answers in testData.ts file

## Test Structure

The project consists of several test cases, each focusing on specific functionalities of the Q/A tool application. The tests are structured using the Playwright testing framework.
It is intended to create test data in the number of asked to be able to test the low-high volume.
- test artifacts folder collects videos, screenshots on failure, and retry
- error logs is on console when test fails
- takes full page screenshot after each test and collects under screenshots folder based on the date-time folder

### Test Setup

Before each test case, the application is launched, and the necessary assertions are made to ensure the application's initial state.

### Test Cases

1. **Create question(s) dynamically and verify**
   - This test case focuses on creating questions dynamically within the Q/A tool application and verifying their creation.
   - It utilizes the `createQuestions` helper function to create questions.
   - Assertions are made to verify the successful creation of questions.

2. **Remove Questions**
   - This test case verifies the functionality to remove questions from the Q/A tool application.
   - It utilizes the `removeQuestions` helper function to remove the questions and verify.
   - It interacts with the "Remove questions" button and checks if the questions are removed as expected.
   - Assertions are made to ensure the button's visibility and the absence of questions after removal.

3. **Sort Questions**
   - This test case tests the sorting functionality of questions within the Q/A tool application.
   - It utilizes the `sortQuestions` helper function to sort and verify the questions.
   - It creates a set of questions, triggers the sorting action, and verifies if the questions are sorted alphabetically.
   - Assertions are made to compare the sorted list of questions with the expected order.

4. **Not Create Question Without Q-A**
   - This test case validates the behavior of the application when attempting to create a question without providing both question and answer inputs.
   - It verifies if the application prevents the creation of questions in such scenarios.
   - Assertions are made to check for the presence of error messages or warnings.

5. **Create questions from test data file and verify**
  - This test case focuses on creating questions from testData.ts file within the Q/A tool application and verifying their creation.
   - It utilizes the `createQuestions` helper function to create all questions.
   - Assertions are made to verify the successful creation of questions.

5. **Sort questions created from test data file**
   - This test case tests the sorting functionality of questions within the Q/A tool application.
    - It utilizes the `sortQuestions` helper function to sort and verify the questions.
   - It creates a set of questions from testData.ts, triggers the sorting action, and verifies if the questions are sorted alphabetically.
   - Assertions are made to compare the sorted list of questions with the expected order.

## Implementation

The implementation phase involved writing automated test scripts using Playwright's testing framework. Test scripts were organized into logical test cases, each focusing on specific application features. Helper functions and utilities were created to streamline common tasks and improve code reuse.

## Execution

Test execution was automated using Playwright's test runner, which provides detailed reports and insights into test results. Tests were executed across different browsers and platforms to ensure application compatibility and reliability.
- `npm run start` to start the server
- `npm run test:e2e` to run all tests for defined browsers
- `npm run test:ui` to open the PW-UI
- `npm run test:report` to open the HTML test report

## Conclusion

The Q/A Tool automation project demonstrates a systematic approach to automating testing scenarios for a web application. By leveraging Playwright's capabilities and following best practices in test automation, the project aims to enhance testing efficiency, reduce manual effort, and improve overall application quality.
