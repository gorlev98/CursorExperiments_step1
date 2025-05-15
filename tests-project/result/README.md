# FakeStore API Testing Project

This project tests the FakeStore API endpoint (https://fakestoreapi.com/products) for data validity.

## Tests Performed

1. Verifies that the API response code is 200
2. Validates each product object for:
   - Title (must be non-empty string)
   - Price (must be non-negative number)
   - Rating (must be between 0 and 5)
3. Provides detailed report of any objects that fail validation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

## Test Output

If any products fail validation, the test will output detailed information about the defective objects, including:
- Product ID
- List of specific defects
- Complete product details

If all tests pass, it means all products in the API response meet the validation criteria. 