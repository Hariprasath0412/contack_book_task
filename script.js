"use strict";
//ALL THE GLOBAL CONSTANT ARE AT THE TOP OF THE SCRIPT
const form = document.getElementById("contact-details"); // the whole input form
const nameField = document.getElementById("person-name"); // name input fied
const emailField = document.getElementById("person-mail"); // email input field
const phoneField = document.getElementById("person-phone"); //phone number input field

let nameCorrectFlag = false,
  emailCorrectFlag = false,
  phoneCorrectFlag = false; // email, number flag for stablized/valid storage (initially set to false)

//ALL THE FUNCTIONS ARE HERE
//Below function is for getting the all the contacts after comming to the page
function getAllContacts() {
  const store = JSON.parse(localStorage.getItem("contacts")) || [];
  return store;
}

// Function to check unique emails or phone numbers
function isUniqueEmailOrPhone(fieldType, value) {
  const stored = getAllContacts();
  for (let i = 0; i < stored.length; i++) {
    if (stored[i][fieldType] === value) {
      return false;
    }
  }
  return true;
}

//Return the correcmber even if it has +91/91/0
function numberToBeStored(number) {
  let stored = number.replaceAll(" ", "").replaceAll("-", "").slice(-10); //
  return stored;
}
// Function to display success message
function showSuccessMessage() {
  const successMessage = document.getElementById("on-successful-save"); // gets the success message
  successMessage.classList.add("on-save"); // succes message gets displayed
  setTimeout(() => {
    successMessage.classList.remove("on-save"); // after some time, the message vanisheds
  }, 800);
}

// ALL THE EVENT LISTENERS ARE HERE
// Checking whether email input is correct inside for each input
nameField.addEventListener("input", function (event) {
  const currentName = event.target.value.trim();
  const nameRegex = /^[a-zA-Z]/;
  const invalidNameMessage = document.getElementById("invalid-name"); //Message to show the invalid email
  if (nameRegex.test(currentName) || event.target.value === "") {
    invalidNameMessage.style.display = "none"; // dont display error when no input or input is unique
    nameCorrectFlag = true;
  } else {
    invalidNameMessage.style.display = "block"; //display error when not unique
    nameCorrectFlag = false;
  }
});

//Checking whether email is valid or not for each input
emailField.addEventListener("input", function (event) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}$/; // Regex for email
  const currentEmail = event.target.value;
  const invalidEmailMessage = document.getElementById("invalid-email"); //Message to show the invalid email

  if (
    (emailRegex.test(currentEmail) &&
      isUniqueEmailOrPhone("email", currentEmail)) ||
    currentEmail === ""
  ) {
    invalidEmailMessage.style.display = "none"; // not displaying error
    emailCorrectFlag = true;
  } else {
    invalidEmailMessage.textContent = emailRegex.test(currentEmail)
      ? "Email already exists"
      : "Enter valid Email";
    invalidEmailMessage.style.display = "block"; // displaying error
    emailCorrectFlag = false;
  }
});

// Checking whether phone input is correct inside for each input
phoneField.addEventListener("input", function (event) {
  const NumberToBeValid = event.target.value.replaceAll(/[\s.-]/g, "");
  const phoneNumberRegex = /^((\+?91)|0)?[6-9][0-9]{9}$/; // Regex for phone number
  const invalidPhoneMessage = document.getElementById("invalid-phone"); //Message to show the invalid phone number

  if (
    (phoneNumberRegex.test(NumberToBeValid) &&
      isUniqueEmailOrPhone("phone", NumberToBeValid.slice(-10))) ||
    event.target.value === ""
  ) {
    invalidPhoneMessage.style.display = "none"; // not displaying error
    phoneCorrectFlag = true;
  } else {
    invalidPhoneMessage.textContent = phoneNumberRegex.test(NumberToBeValid)
      ? "Phone number already exists"
      : "Enter valid phone number";
    invalidPhoneMessage.style.display = "block"; // displaying error
    phoneCorrectFlag = false;
  }
});

//Final submittion of the form
form.addEventListener("submit", function (event) {
  event.preventDefault(); //    To prevent default reload of a submit button
  const addressField = document.getElementById("person-address"); // adddress input field

  if (nameCorrectFlag && emailCorrectFlag && phoneCorrectFlag) {
    //trim() to remove leading and lagging spaces
    const personName = nameField.value.trim(); // takes the name
    const personPhone = numberToBeStored(phoneField.value); // takes the phone number
    const personEmail = emailField.value.trim(); // takes the email
    const personAddress = addressField.value.trim(); // takes the address
    const uniqueId = Date.now(); // to create uniue id for storage
    const allInputFields = {
      unique_id: uniqueId,
      name: personName,
      email: personEmail,
      phone: personPhone,
      address: personAddress,
      isStarred: false, // star value to make the contact starred
    }; // saving all inputs in an object

    const contactsArray = getAllContacts();

    contactsArray.push(allInputFields); // new contact is pushed into array of contacts

    localStorage.setItem("contacts", JSON.stringify(contactsArray)); // contacts stores in localstorage
    nameField.value =
      phoneField.value =
      emailField.value =
      addressField.value =
        ""; // all the fields are set to empty
    showSuccessMessage();
  }
});
