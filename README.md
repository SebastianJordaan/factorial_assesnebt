# Factorial Calculator Automation Testing

This project contains an automated test suite for the [Factorial Calculator](https://qainterview.pythonanywhere.com/) website. The goal is to verify the functional correctness, boundary conditions, and API integrity of the factorial calculation service.

## 🚀 Overview
The automation suite covers:
- **Link Verification:** Ensures all footer and header links (About, Terms, Privacy) are correct.
- **Functional Testing:** Validates factorial calculations for the range 1-10.
- **Boundary Testing:** Tests large integers, scientific notation transitions, and Infinity thresholds (up to 992).
- **Negative Testing:** Verifies error handling for letters, symbols, and empty inputs.
- **API Testing:** Validates that the AJAX POST requests contain the correct headers and payloads (matching specific `curl` requirements).

## 🛠️ Tech Stack
- **Framework:** [Playwright](https://playwright.dev/)
- **Language:** TypeScript
- **Pattern:** Page Object Model (POM)
- **Reporting:** HTML Report & PDF Generation

## 🏃 How to Run Tests

### 1. Install Dependencies
```powershell
npm install
```

### 2. Run All Tests
To run the tests in the terminal:
```powershell
node node_modules\playwright\cli.js test
```

### 3. Run Tests in UI Mode
To debug or watch tests run interactively:
```powershell
node node_modules\playwright\cli.js test --ui
```

### 4. View HTML Report
```powershell
node node_modules\playwright\cli.js show-report
```

### 5. Generate PDF Report
A custom script is included to convert the HTML report into a PDF:
```powershell
node generate-pdf.js
```

## 📁 Project Structure
- `tests/factorial_calculator.spec.ts`: The main test suite.
- `tests/pages/FactorialPage.ts`: Page Object containing selectors and actions.
- `Test Cases Factorial Calculator.xlsx`: The original test case requirements.
- `generate-pdf.js`: Utility script for PDF reporting.
