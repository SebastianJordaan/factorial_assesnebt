import { test, expect } from '@playwright/test';
import { FactorialPage } from './pages/FactorialPage';

test.describe('Factorial Calculator Tests', () => {
  let factorialPage: FactorialPage;

  test.beforeEach(async ({ page }) => {
    factorialPage = new FactorialPage(page);
    await factorialPage.navigate();
  });

  // Link Verification
  test('TC-L01: Verify "About" Link', async () => {
    await expect(factorialPage.aboutLink).toHaveAttribute('href', '/about');
  });

  test('TC-L02: Verify "Terms and Conditions" Link', async () => {
    await expect(factorialPage.termsAndConditionsLink).toHaveAttribute('href', '/terms');
  });

  test('TC-L03: Verify "Privacy" Link', async () => {
    await expect(factorialPage.privacyLink).toHaveAttribute('href', '/privacy');
  });

  test('TC-L04: Verify "QXF 2 Services" Link', async () => {
    await expect(factorialPage.qxf2Link).toHaveAttribute('href', /qxf2\.com/);
  });

  // Positive Test Cases
  const factorialData = [
    { input: '1', expected: '1' },
    { input: '2', expected: '2' },
    { input: '3', expected: '6' },
    { input: '4', expected: '24' },
    { input: '5', expected: '120' },
    { input: '6', expected: '720' },
    { input: '7', expected: '5040' },
    { input: '8', expected: '40320' },
    { input: '9', expected: '362880' },
    { input: '10', expected: '3628800' },
  ];

  for (const data of factorialData) {
    test(`TC-F01: Basic Factorial Calculation for ${data.input}`, async () => {
      await factorialPage.calculateFactorial(data.input);
      await expect(factorialPage.resultMessage).toContainText(`The factorial of ${data.input} is: ${data.expected}`);
    });
  }
  // Boundary Test Cases
  test('TC-F02: Upper Integer Boundary (21)', async () => {
    await factorialPage.calculateFactorial('21');
    await expect(factorialPage.resultMessage).toHaveText('The factorial of 21 is: 51090942171709440000');
  });
  // Boundary Test Cases
  test('TC-F03: Scientific Notation Boundary (22)', async () => {
    await factorialPage.calculateFactorial('22');
    const result = await factorialPage.resultMessage.innerText();

    await expect(factorialPage.resultMessage).toContainText('1.1240007277776077e+21');
  });
  // Boundary Test Cases
  test('TC-F04: Scientific Notation Consistency (23+)', async () => {
    await factorialPage.calculateFactorial('23');
    const result = await factorialPage.resultMessage.innerText();

    await expect(factorialPage.resultMessage).toContainText('2.585201673888498e+22');
  });
  // Boundary Test Cases
  test('TC-F05: Boundary value before infinity', async () => {
    await factorialPage.calculateFactorial('170');
    await expect(factorialPage.resultMessage).toContainText('The factorial of 170 is: 7.257415615307999e+306');
  });
  // Boundary Test Cases
  test('TC-F06: Boundary value infinity (171)', async () => {
    await factorialPage.calculateFactorial('171');
    await expect(factorialPage.resultMessage).toContainText('The factorial of 171 is: Infinity');
  });
  // Boundary Test Cases
  test('TC-F06: Boundary value infinity (991)', async () => {
    await factorialPage.calculateFactorial('991');
    await expect(factorialPage.resultMessage).toContainText('The factorial of 991 is: Infinity');
  });
  // Boundary Test Cases
  test('TC-F06: Boundary value infinity (992)', async () => {
    await factorialPage.calculateFactorial('992');
    await expect(factorialPage.resultMessage).toContainText('The factorial of 992 is: Infinity');
  });

  // Part 4 Additional Test Cases
  test('TC-F07: Calculate Factorial of 12', async () => {
    await factorialPage.calculateFactorial('12');
    await expect(factorialPage.resultMessage).toContainText('The factorial of 12 is: 479001600');
  });

  test('TC-V01: Verify Form Validation Styling', async () => {
    await factorialPage.calculateFactorial('abc');
    await expect(factorialPage.numberInput).toHaveCSS('border', /2px solid (rgb\(255, 0, 0\)|red)/);
  });
  // Part 4 Additional Test Cases
test('TC-A01: Verify API Call Headers and Parameters', async ({ page }) => {
  const inputNumber = '5';

  // Set up a promise to wait for the request
  const requestPromise = page.waitForRequest(request => 
    request.url().includes('/factorial') && request.method() === 'POST'
  );

  await factorialPage.calculateFactorial(inputNumber);

  const request = await requestPromise;
  const postData = request.postData();

  // Verify parameters (form data)
  expect(postData).toContain(`number=${inputNumber}`);

  // Verify headers (standard AJAX headers)
  const headers = request.headers();
  expect(headers['content-type']).toContain('application/x-www-form-urlencoded');
});

test('TC-A02: Verify Detailed API Headers for Input 23', async ({ page }) => {
  const inputNumber = '23';

  // Set up a promise to wait for the request
  const requestPromise = page.waitForRequest(request => 
    request.url().includes('/factorial') && request.method() === 'POST'
  );

  await factorialPage.calculateFactorial(inputNumber);

  const request = await requestPromise;
  const headers = request.headers();
  const postData = request.postData();

  // Part 4 Additional Test Cases
  expect(postData).toBe(`number=${inputNumber}`);

  // Verify Headers matching the curl request
  expect(headers['accept']).toBe('*/*');
  expect(headers['content-type']).toContain('application/x-www-form-urlencoded');
  expect(headers['x-requested-with']).toBe('XMLHttpRequest');
  expect(headers['sec-fetch-dest']).toBe('empty');
  expect(headers['sec-fetch-mode']).toBe('cors');
  expect(headers['sec-fetch-site']).toBe('same-origin');

  // Origin and Referer
  const baseUrl = 'https://qainterview.pythonanywhere.com';
  expect(headers['origin']).toBe(baseUrl);
  expect(headers['referer']).toBe(`${baseUrl}/`);
});
// Part 4 Additional Test Cases

  // Negative Test Cases
  test('TC-N01: Invalid Input: Letters', async () => {
    await factorialPage.calculateFactorial('abc');
    await expect(factorialPage.resultMessage).toHaveText('Please enter an integer');
  });

  test('TC-N02: Invalid Input: Special Symbols', async () => {
    await factorialPage.calculateFactorial('@#$!');
    await expect(factorialPage.resultMessage).toHaveText('Please enter an integer');
  });

  test('TC-N03: Invalid Input: Decimals/Floats', async () => {
    await factorialPage.calculateFactorial('5.5');
    await expect(factorialPage.resultMessage).toHaveText('Please enter an integer');
  });

  test('TC-N04: Empty Input Submission', async () => {
    await factorialPage.calculateFactorial('');
    await expect(factorialPage.resultMessage).toHaveText('Please enter an integer');
  });

  test('TC-N05: Stress Test: Extremely High Value', async () => {
    await factorialPage.calculateFactorial('999999999');
    await expect(factorialPage.resultMessage).toContainText('Infinity');
  });
});
