// Assignment Code
var generateBtn = document.querySelector('#generate');
var responseArr = [];
let genPass = '';
var possibleCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>.,'.split(
    ''
  );
var decidedCharacters = [];

let lowerCaseArr = [];
let UpperCaseArr = [];
let numericArr = [];
let specialArr = [];
let hasLower = false;
let hasUpper = false;
let hasNum = false;
let hasSpecial = false;
let passLength; // The length of the password

// Stating available password Requirements (prompts)

// Validation
let isValid = false;
function getPassCriteria() {
  while (!isValid) {
    // console.log(shouldGenerate);

    // Pass Length Section
    let promptQuestion =
      'How long would you like your Password to be please select a number between 8 and 128?'; // Prompt to ask user for password length
    let isPasswordLengthValid = false;

    while (!isPasswordLengthValid) {
      // run this UNTIL password is valid
      const response = prompt(promptQuestion); // Get the response from the use
      passLength = parseInt(response); // Convert response to a number type
      const isResponseValid = passLength >= 8 && passLength <= 128;

      if (isResponseValid) {
        isPasswordLengthValid = true;
        passLength = response;
      } else {
        promptQuestion =
          'Your password length has to be greater that 8 characters, and shorter that 128 characters';
      }
    }

    // LowerCase, UpperCase, NumericNum,SpecialCharacters

    // Lower
    var includeLowerCase = prompt(
      'Would you like to include Lower Case letters? yes or no'
    );
    if (includeLowerCase.toLowerCase() === 'yes') {
      lowerCaseArr = possibleCharacters.slice(0, 26);
      hasLower = true;
      console.log(lowerCaseArr);
      console.log(possibleCharacters);
    } else if (includeLowerCase.toLowerCase() === 'no') {
      lowerCaseArr = [];
    } else {
      var includeLowerCase = prompt(
        'Would you like to include Lower Case letters? (yes or no ONLY)'
      );
    }

    // Upper
    var includeUpperCase = prompt(
      'Would you like to include Upper Case letters?',
      'Yes or No'
    );
    if (includeUpperCase.toLowerCase() === 'yes') {
      UpperCaseArr = possibleCharacters.slice(27, 53);
      hasUpper = true;

      console.log(UpperCaseArr);
    } else if (includeUpperCase.toLowerCase() === 'no') {
      lowerCaseArr = [];
    } else {
      var includeUpperCase = prompt(
        'Would you like to include Lower Case letters? (yes or no ONLY)'
      );
    }

    // Numeric
    var includeNumericNum = prompt(
      'Would you like to include Numbers?',
      'Yes or No'
    );
    if (includeNumericNum.toLowerCase() === 'yes') {
      numericArr = possibleCharacters.slice(53, 63);
      hasNum = true;

      console.log(numericArr);
    } else if (includeNumericNum.toLowerCase() === 'no') {
      lowerCaseArr = [];
    } else {
      var includeNumericNum = prompt(
        'Would you like to include Lower Case letters? (yes or no ONLY)'
      );
    }

    // Special
    var includeSpecialCharacters = prompt(
      'Would you like to include Special Characters?',
      'Yes or No'
    );

    if (includeSpecialCharacters.toLowerCase() === 'yes') {
      specialArr = possibleCharacters.slice(63, possibleCharacters.length);
      hasSpecial = true;
      console.log(specialArr);
    } else if (includeSpecialCharacters.toLowerCase() === 'no') {
      lowerCaseArr = [];
    } else {
      var includeSpecialCharacters = prompt(
        'Would you like to include Lower Case letters? (yes or no ONLY)'
      );
    }

    var shouldGenerate = confirm(
      `Here's what you chose: 
    \n passLength: ${passLength} 
    \n Include lower case characters: ${includeLowerCase.toUpperCase()}
    \n Include upper case characters: ${includeUpperCase.toUpperCase()}
    \n Include numeric characters: ${includeNumericNum.toUpperCase()}
    \n Include special characters: ${includeSpecialCharacters.toUpperCase()}
   `
    );
    if (shouldGenerate !== null) {
      isValid = true;
    }
  }
}
// prompts();

// Calc random for each criteria
//  NEW

function getRandomLower() {
  let r = Math.floor(Math.random() * 26);
  let a = lowerCaseArr[r];
  return a;
}

function getRandomUpper() {
  let r = Math.floor(Math.random() * 26);
  let a = UpperCaseArr[r];
  return a;
}

function getRandomNumber() {
  let r = Math.floor(Math.random() * 10);
  let a = numericArr[r];
  return a;
}
function getRandomSpecial() {
  let r = Math.floor(Math.random() * 13);
  let a = specialArr[r];
  return a;
}

const randomFunc = {
  hasLower: getRandomLower,
  hasUpper: getRandomUpper,
  hasNumeric: getRandomNumber,
  hasSymbol: getRandomSpecial,
};

// Write password to the #password input
function generatePassword() {
  getPassCriteria();
  let generatedPassword = '';
  console.log(generatedPassword);

  const typesArr = [{ hasLower } + { hasUpper } + { hasNum } + { hasSpecial }];
  console.log(typesArr);
  for (let i = 0; i < typesArr.length; i++) {
    if (!typesArr[i]) {
      typesArr[i].pop();
    }
  }

  if (typesArr.length === 0) {
    return '';
  }
  for (let i = 0; i < passLength; i + typesArr.length) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[i % 4];
      console.log('funcName:', funcName);

      generatedPassword += randomFunc.value(type)[funcName]();
    });
  }
}

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

console.log(getRandomUpper());
console.log(getRandomNumber());
console.log(getRandomSpecial());
console.log(specialArr[12]);
