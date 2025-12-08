// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above (can be either valid or invalid)
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// My functions below;

// Luhn Algorithm to validate credit card numbers
// Returns true if valid, false if invalid
const validateCred = (arr) => {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    let posFromRight = arr.length - 1 - i;
    let val = arr[i];
    if (posFromRight % 2 === 1) {
      let doubled = val * 2;
      reversed.push(doubled > 9 ? doubled - 9 : doubled);
    } else {
      reversed.push(val);
    }
  }
  let sum = 0;
  for (let j = 0; j < reversed.length; j++) {
    sum += reversed[j];
  }
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
};

// Testing validateCred function
/*
console.log(validateCred(valid1))
console.log(validateCred(invalid3))
console.log(validateCred(mystery3))
*/

// Function to find invalid credit card numbers from a nested array
const findInvalidCards = (nestedArr) => {
  const invalidCards = [];
  for (let x = 0; x < nestedArr.length; x++) {
    if (!validateCred(nestedArr[x])) {
      invalidCards.push(nestedArr[x]);
    }
  }
  return invalidCards;
};

// Testing findInvalidCards function
/*
console.log(findInvalidCards(batch));
*/

// Function to identify credit card companies that have issued invalid cards
const idInvalidCardCompanies = (invalidNums) => {
  const companies = new Set();
  for (let card of invalidNums) {
    switch (card[0]) {
      case 3:
        companies.add('Amex (American Express)');
        break;
      case 4:
        companies.add('Visa');
        break;
      case 5:
        companies.add('Mastercard');
        break;
      case 6:
        companies.add('Discover');
        break;
      default:
        console.log('Company not found');
    }
  }
  return [...companies];
};

// Testing idInvalidCardCompanies function
/*
console.log(idInvalidCardCompanies(findInvalidCards(batch))); should return ['Visa', 'Mastercard', 'Amex (American Express)', 'Discover']
*/

// Function to convert a string of numbers into an array of integers
function convertToCard(card) {
  const newCardArr = [];
  for (let x = 0; x < card.length; x++) {
    newCardArr.push(parseInt(card[x]));
  }
  return newCardArr;
}

// Testing convertToCard function
/*
console.log(convertToCard('4929394745054210')); // Visa
console.log(convertToCard('5243787585899295')); // Mastercard
console.log(convertToCard('379302371333967')); // Amex (American Express)
console.log(convertToCard('6011555423146171')); // Discover
console.log(validateCred(convertToCard('4929394745054210'))); // Should return true
console.log(idInvalidCardCompanies([convertToCard('379302371333967')])); // Should return ['Amex (American Express)']
*/

//Create a function that will convert invalid numbers into valid numbers.
const convertInvalidToValid = (invalidArr) => {
  const validArr = [];
  for (let i = 0; i < invalidArr.length; i++) {
    let card = invalidArr[i].slice(); // Create a copy of the invalid card array
    for (let j = 0; j < 10; j++) {
      card[card.length - 1] = j; // Change the last digit
      if (validateCred(card)) {
        validArr.push(card);
        break; // Exit the loop once a valid number is found
      }
    }
  }
  return validArr;
};

const invalidCards = findInvalidCards(batch);
const convertedCards = convertInvalidToValid(invalidCards);

// Testing convertInvalidToValid function
/*
console.log('Invalid Cards:', invalidCards); // Display invalid cards
console.log('Converted Valid Cards:', convertedCards); // Display converted valid cards

// Verify that all converted cards are valid
for (let k = 0; k < convertedCards.length; k++) {
  console.log(validateCred(convertedCards[k])); // Should all return true
}
*/
