// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

// User inputs:
var enter;
var confirmNumber;
var confirmCharacter;
var confirmUppercase;
var confirmLowercase;

// Special characters/symbols
character = [
  '!',
  '#',
  '$',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  ':',
  ';',
  ' < ',
  '=',
  ' > ',
  ' ? ',
  '@',
  '[',
  '\\',
  ']',
  ' ^ ',
  '_',
  '`',
  '{',
  '|',
  '}',
  '~',
];
// Numbers
number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// Letters
alpha = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
// Space
space = [];
var choices;
// converts letters to uppercase
var toUpper = function (x) {
  return x.toUpperCase();
};
// creates a variable for uppercase conversion
alpha2 = alpha.map(toUpper);

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

generateBtn.addEventListener('click', function () {
  ps = generatePassword();
  document.getElementById('password').placeholder = ps;
});

// Start function to generate password
function generatePassword() {
  // Asks for user input
  enter = parseInt(
    prompt(
      'How many characters would you like your password? Choose between 8 and 128'
    )
  );
  // First if statement for user validation
  if (!enter) {
    alert('This needs a value');
  } else if (enter < 8 || enter > 128) {
    // Validates user input
    // Start user input prompts
    enter = parseInt(prompt('You must choose between 8 and 128'));
  } else {
    // Continues once user input is validated
    confirmNumber = confirm('Will this contain numbers?');
    confirmCharacter = confirm('Will this contain special characters?');
    confirmUppercase = confirm('Will this contain Uppercase letters?');
    confirmLowercase = confirm('Will this contain Lowercase letters?');
  }

  // Else if for 4 negative options
  if (
    !confirmCharacter &&
    !confirmNumber &&
    !confirmUppercase &&
    !confirmLowercase
  ) {
    choices = alert('You must choose a criteria!');
  }
  // First if statement that uses user input prompts to determine choices
  // Else if for 4 positive options
  else if (
    confirmCharacter &&
    confirmNumber &&
    confirmUppercase &&
    confirmLowercase
  ) {
    choices = character.concat(number, alpha, alpha2);
  }
  // Else if for 3 positive options
  else if (confirmCharacter && confirmNumber && confirmUppercase) {
    choices = character.concat(number, alpha2);
  } else if (confirmCharacter && confirmNumber && confirmLowercase) {
    choices = character.concat(number, alpha);
  } else if (confirmCharacter && confirmLowercase && confirmUppercase) {
    choices = character.concat(alpha, alpha2);
  } else if (confirmNumber && confirmLowercase && confirmUppercase) {
    choices = number.concat(alpha, alpha2);
  }
  // Else if for 2 positive options
  else if (confirmCharacter && confirmNumber) {
    choices = character.concat(number);
  } else if (confirmCharacter && confirmLowercase) {
    choices = character.concat(alpha);
  } else if (confirmCharacter && confirmUppercase) {
    choices = character.concat(alpha2);
  } else if (confirmLowercase && confirmNumber) {
    choices = alpha.concat(number);
  } else if (confirmLowercase && confirmUppercase) {
    choices = alpha.concat(alpha2);
  } else if (confirmNumber && confirmUppercase) {
    choices = number.concat(alpha2);
  }
  // Else if for 1 positive option
  else if (confirmCharacter) {
    choices = character;
  } else if (confirmNumber) {
    choices = number;
  } else if (confirmLowercase) {
    choices = alpha;
  }
  // Created space variable to fill uppercase conversion
  else if (confirmUppercase) {
    choices = space.concat(alpha2);
  }

  // password variable is an array placeholder for user generated amount of length
  var password = [];

  // Start random selection variables:
  // Random selection for all variables:
  for (var i = 0; i < enter; i++) {
    var pickChoices = choices[Math.floor(Math.random() * choices.length)];
    password.push(pickChoices);
  }
  // This joins the password array and converts it to a string
  // Worked with a tutor to incorporate this option
  var ps = password.join('');
  UserInput(ps);
  return ps;
}
// This puts the password value into the textbox
// Changed function input to use textcontent
function UserInput(ps) {
  document.getElementById('password').textContent = ps;
}

var copy = document.querySelector('#copy');
copy.addEventListener('click', function () {
  copyPassword();
});
// This copies the password value - works
// Code example demonstrated in a youtube video:
// Source: https://youtu.be/9sT03jEwcaw
function copyPassword() {
  document.getElementById('password').select();
  document.execCommand('Copy');
  alert('Password copied to clipboard!');
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
