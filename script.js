"use strict";
//ALL THE GLOBAL CONSTANT ARE AT THE TOP OF THE SCRIPT
const form = document.querySelector(".contact-details"); // the whole input form
const nameField = document.getElementById("person-name"); // name input fied
const emailField = document.getElementById("person-mail"); // email input field
const phoneField = document.getElementById("person-phone"); //phone number input field
const addressField = document.getElementById("person-address"); // adddress input field
const submitBtn = document.querySelector(".add-contact-btn"); // submit button

const invalidNameMessage = document.querySelector(".invalid-name"); //Message to show the invalid email
const invalidPhoneMessage = document.querySelector(".invalid-phone"); //Message to show the invalid phone number
const invalidEmailMessage = document.querySelector(".invalid-email"); //Message to show the invalid email

const phoneNumberRegex = /^((\+?91)|0)?[6-9][0-9]{9}$/; // Regex for phone number
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for email

let nameCorrectFlag,
  emailCorrectFlag,
  phoneCorrectFlag = false; // name, email, number flag for stablized storage (initially set to false)

//ALL THE FUNCTIONS ARE HERE
//Return the correct number even if it has +91/91/0
function numberToBeStored(number) {
  let stored = number.replaceAll(" ", "").replaceAll("-", "");
  if (stored[0] === "+") stored = stored.slice(3);
  if (stored[0] === "0") stored = stored.slice(1);
  // console.log(stored);
  return stored;
}

//Function to get all contacts
function getAllContacts() {
  const store = [];
  for (let i = 0; i < localStorage.length; i++) {
    store[i] = JSON.parse(localStorage.getItem(localStorage.key(i))); // getting every contacts from localstorage
  }
  return store;
}

//Function to check unique names
function isUniqueName(name) {
  const allContacts = getAllContacts();
  // console.log(allContacts[0]);
  const checkerArray = Object.entries(allContacts);
  for (let [key, details] of checkerArray) {
    if (details.name === name) {
      return false;
    }
  }
  return true;
}

//ALL THE EVENT LISTENERS ARE HERE
// Checking whether email input is correct inside for each input
nameField.addEventListener("input", function (event) {
  const currentName = event.target.value.trim();
  if (isUniqueName(currentName) || event.target.value === "") {
    invalidNameMessage.style.display = "none"; // dont display error when no input or input is unique
    nameCorrectFlag = true;
  } else {
    invalidNameMessage.style.display = "block";
    nameCorrectFlag = false;
  }
});

//Checking whether email is valid or not for each input
emailField.addEventListener("input", function (event) {
  if (emailRegex.test(event.target.value) || event.target.value === "") {
    invalidEmailMessage.style.display = "none";
    emailCorrectFlag = true;
  } else {
    invalidEmailMessage.style.display = "block";
    emailCorrectFlag = false;
  }
});

// Checking whether phone input is correct inside for each input
phoneField.addEventListener("input", function (event) {
  // console.log(phoneNumberRegex.test(event.target.value));
  const NumberToBeValid = event.target.value
    .replaceAll(" ", "")
    .replaceAll("-", "");
  if (phoneNumberRegex.test(NumberToBeValid) || event.target.value === "") {
    invalidPhoneMessage.style.display = "none";
    phoneCorrectFlag = true;
  } else {
    invalidPhoneMessage.style.display = "block";
    phoneCorrectFlag = false;
  }
});

//Final submittion of the form
form.addEventListener("submit", function (e) {
  e.preventDefault(); //    To prevent default reload of a submit button

  if (emailCorrectFlag && phoneCorrectFlag && nameCorrectFlag) {
    //trim() to remove leading and lagging spaces
    const personName = nameField.value.trim(); // takes the name
    const personPhone = numberToBeStored(phoneField.value); // takes the phone number
    // console.log(personPhone);
    const personEmail = emailField.value.trim(); // takes the email
    const personAddress = addressField.value.trim(); // takes the address
    const allInputFields = {
      name: personName,
      email: personEmail,
      phone: personPhone,
      address: personAddress,
    }; // saving all inputs in an object
    const uniqueId = Date.now(); // to create uniue id for storage
    localStorage.setItem(uniqueId, JSON.stringify(allInputFields));

    nameField.value =
      phoneField.value =
      emailField.value =
      addressField.value =
        "";
  }
});
