"use strict";
//ALL THE GLOBAL CONSTANTS/VARIABLES ARE HERE
const searchBox = document.getElementById("searching"); // searching the input
const contactTable = document.getElementById("contact-table"); //
const displayMessage = document.getElementById("no-contact-display"); //For displaying no contacts

//Edit form Fields are stored here
const editForm = document.getElementById("edit-form"); // edit form
const nameEditfield = document.getElementById("edit-person-name"); // name field in edit form
const emailEditField = document.getElementById("edit-person-mail"); // email field in edit form
const phoneEditField = document.getElementById("edit-person-phone"); // phone field in edit form
const addressEditField = document.getElementById("edit-person-address"); // address field in edit form
const cancelBtn = document.getElementById("edit-form-cancel-btn"); // cancel btn in edit form
const overlay = document.getElementById("overlay-on");
let editkey = null; // edit key needed to be in global for the edit to have correct details

//All variables for view all button functionality
const viewAllBtn = document.getElementById("view-all-btn"); // view all btn selection
let viewAll = false; // Boolean toggle for view all btn

//flags for correct storage of data
let nameEditCorrectFlag = true,
  emailEditCorrectFlag = true,
  phoneEditCorrectFlag = true;

//Constants for delete operation
const deleteSureBox = document.getElementById("delete-sure-box"); // Delete confirmation box
let deletekey = null; //needed to be global for the confirmation message box

//Other functions(sort and filter) for User Interface
const sortByMethod = document.getElementById("sort-by"); //Sort by feature selection
const filterMethod = document.getElementById("filter-to"); //filter feature selection

//ALL THE FUNCTIONS ARE HERE
//Below function is for getting the all the contacts after comming to the page
function getAllContacts() {
  const store = JSON.parse(localStorage.getItem("contacts")) || [];
  return store;
}

// This functions is used to both display all the contacts and also to display searched contacts
function renderContacts(contactsToBeRendered) {
  contactTable.innerHTML = ""; //remove all the contacts first
  contactsToBeRendered.forEach((contact) => {
    const { name, email, phone, address, unique_id, isStarred } = contact; // destructing each details from localstorage
    const html = `<tr data-key=${unique_id}>
          <td class="each-contact">
            <div class="avatar-circle">${name[0].toUpperCase()}</div>

            <label class="person-name">
              <button class="star-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 star-icon ${isStarred ? "starred" : ""}"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="star-btn-icon"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </button>
              ${name}
            </label>

            <button class="view-btn">View</button>

            <ul class="detial-section hidden">
              <li class="person-email">
                <a href="mailto:${email}" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 inbox-icon email-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                    />
                  </svg>
                </a>
                ${email}
              </li>

              <li class="person-ph-no">
                <a href="tel:+91${numberToBeStored(phone)}">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 inbox-icon ph-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </a>
                ${phone}
              </li>

              <li class="person-address">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 inbox-icon add-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </a>
                ${address}
              </li>
            </ul>

            <section class="other-btn all-toggle-btn hidden">
              <button class="btn edit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 ed-icons"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>

              <button class="btn delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 ed-icons"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </section>
          </td>
          </tr>`;
    contactTable.insertAdjacentHTML("afterbegin", html); // Adding the html to the contact table
  });
}

// Function to check unique emails or phone numbers
function isUniqueEmailOrPhone(fieldType, value) {
  const stored = getAllContacts();
  const currentContact = stored.find(
    (contact) => contact.unique_id === Number(editkey),
  );
  const currentValue = currentContact[fieldType];

  for (let i = 0; i < stored.length; i++) {
    if (stored[i][fieldType] === value && value !== currentValue) {
      return false;
    }
  }
  return true;
}

//Return the correct number even if it has +91/91/0
function numberToBeStored(number) {
  let stored = number.replaceAll(" ", "").replaceAll("-", "").slice(-10); // removing all spaces/dashed inside phone number
  return stored;
}

//opening and closing the overlay effect
function openEditForm() {
  editForm.classList.remove("hidden"); // displays the edit form
  overlay.classList.remove("hidden");
  editForm.style.display = "flex";
  contactTable.style.overflow = "hidden"; // Prevent scrolling when overlay in effect
}
function closeEditForm() {
  editForm.classList.add("hidden"); // hides the edit form
  overlay.classList.add("hidden");
  editForm.style.display = "none";
  contactTable.style.overflow = "auto"; // Enablies scrolling
  editkey = null; // edit key dont persist
}

//Opening and closing delete confirmation display
function openDeleteConfirmation() {
  deleteSureBox.classList.remove("hidden"); // displays the confirmation box
  overlay.classList.remove("hidden");
  contactTable.style.overflow = "hidden"; // Prevent scrolling when overlay in effect
}
function closeDeleteConfirmation() {
  deleteSureBox.classList.add("hidden"); // hides the confirmation box
  overlay.classList.add("hidden");
  contactTable.style.overflow = "auto"; // Enablies scrolling
  deletekey = null; //delete key dont persist
}

//search filter and sort combined function
function searchFilterAndSortCombined() {
  const allContacts = getAllContacts() || [];
  const sortByValue = sortByMethod.value;
  const filteredValue = filterMethod.value;
  const searchValue = searchBox.value.trim().toLowerCase().replaceAll(" ", "");

  let result = allContacts;
  if (filteredValue === "Starred") {
    result = result.filter((el) => {
      return el.isStarred === true; // filters out only the starred contact
    });
  }

  if (searchValue) {
    result = result.filter((el) => {
      return el.name.toLowerCase().replaceAll(" ", "").includes(searchValue); //again filters out the searched contact
    });
  }

  if (sortByValue === "A to Z") {
    result = result.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  } else if (sortByValue === "Z to A") {
    result = result.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }); // again sorts out by Sort By
  }

  if (!result.length) {
    displayMessage.style.display = "block"; //if no contacts of specific type, display no contact found
  } else {
    displayMessage.style.display = "none";
  }

  renderContacts(result);
}

//Adding star to contact
//Rendering all the available contacts at the local storage at first
function init() {
  const store = getAllContacts();
  if (store.length === 0) {
    displayMessage.innerText = " No contacts Found";
    displayMessage.style.display = "block"; // Show no contact if no contacts in localstorage
  }
  renderContacts(store); // display the stored contacts
}

init(); // initializing the display

//ALL THE EVENT LISTENERS ARE HERE
//Event listeners for search, sort and filters
searchBox.addEventListener("input", searchFilterAndSortCombined);
sortByMethod.addEventListener("change", searchFilterAndSortCombined);
filterMethod.addEventListener("change", searchFilterAndSortCombined);

//View all button functionality
viewAllBtn.addEventListener("click", function () {
  const allDetailSection = document.querySelectorAll(".detial-section"); //storing all details section
  const allOtherbtns = document.querySelectorAll(".other-btn"); // storing all edit,delete section
  const viewBtns = document.querySelectorAll(".view-btn"); // Storing all view btns
  viewAll = !viewAll;
  allDetailSection.forEach((details) => {
    if (viewAll)
      details.classList.remove("hidden"); // show the details
    else details.classList.add("hidden"); // hide the details
  });
  allOtherbtns.forEach((btns) => {
    if (viewAll)
      btns.classList.remove("hidden"); //same as above for buttons
    else btns.classList.add("hidden");
  });
  viewBtns.forEach((btns) => {
    btns.textContent = viewAll ? "Close" : "View"; // To make correct close or view text appear
  });
});

//All button functionality inide a contact using Event delegation
contactTable.addEventListener("click", function (event) {
  const eventTarget = event.target;
  if (eventTarget.closest(".view-btn")) {
    eventTarget.nextElementSibling.classList.toggle("hidden"); // selects the detail section and toggles the details
    eventTarget.nextElementSibling.nextElementSibling.classList.toggle(
      "hidden",
    ); // same as for buttons
    eventTarget.textContent = eventTarget.nextElementSibling.classList.contains(
      "hidden",
    )
      ? "View"
      : "Close"; // Contidional operator to rewrite view and close buttons
  }

  if (eventTarget.closest(".delete")) {
    // If delete button is clicked
    const details = event.target.closest("tr"); // the appropiate row of contacts is selected
    deletekey = details.dataset.key; // the key is now retrived
    openDeleteConfirmation(); // opening confirmation box
  }

  //If edit button is clicked
  if (eventTarget.closest(".edit")) {
    const details = eventTarget.closest("tr");
    editkey = details.dataset.key; // edit key is stored
    openEditForm();

    const allContacts = getAllContacts();
    const personData = allContacts.find(
      (contact) => contact.unique_id === Number(editkey), // get that contact details with the key
    );

    nameEditfield.value = personData.name;
    emailEditField.value = personData.email;
    phoneEditField.value = personData.phone;
    addressEditField.value = personData.address; // copies all the data into the form
  }

  if (eventTarget.closest(".star-btn-icon")) {
    eventTarget.classList.toggle("starred"); // toggles the star icon
    const details = event.target.closest("tr"); // the appropiate row of contacts is selected
    const starToggleKey = details.dataset.key;
    const allContacts = getAllContacts();
    const starUpdatedContact = allContacts.map((contact) => {
      contact.unique_id === Number(starToggleKey)
        ? (contact.isStarred = !contact.isStarred)
        : contact.isStarred;
      return contact;
    }); // the above code is to make sure isStarred is updated

    localStorage.setItem("contacts", JSON.stringify(starUpdatedContact));
    renderContacts(starUpdatedContact); // renders updated contacts
    searchFilterAndSortCombined(); // seacrch sort filter dont reset
  }
});

// Checking whether email input is correct inside for each input
nameEditfield.addEventListener("input", function (event) {
  const currentName = event.target.value.trim();
  const invalidNameMessage = document.getElementById("invalid-edit-name"); //Message to show the invalid email
  const nameRegex = /^[a-zA-Z]/; // name must start with a letter

  if (nameRegex.test(currentName) || currentName === "") {
    invalidNameMessage.style.display = "none"; // dont display error when no input or input is unique
    nameEditCorrectFlag = true;
  } else {
    invalidNameMessage.style.display = "block";
    nameEditCorrectFlag = false;
  }
});

//Checking whether email is valid or not for each input
emailEditField.addEventListener("input", function (event) {
  const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/; // Regex for email
  const currentEmail = event.target.value;
  const invalidEmailMessage = document.getElementById("invalid-edit-email"); //Message to show the invalid email

  if (
    (emailRegex.test(currentEmail) &&
      isUniqueEmailOrPhone("email", currentEmail)) ||
    currentEmail === ""
  ) {
    invalidEmailMessage.style.display = "none"; //if correct, no invalid messages
    emailEditCorrectFlag = true;
  } else {
    invalidEmailMessage.textContent = emailRegex.test(currentEmail)
      ? "Email already exists"
      : "Enter valid Email"; // display appropriate invalid message
    invalidEmailMessage.style.display = "block";
    emailEditCorrectFlag = false;
  }
});

// Checking whether phone input is correct inside for each input
phoneEditField.addEventListener("input", function (event) {
  const numberToBeValid = event.target.value
    .replaceAll(" ", "")
    .replaceAll("-", "");
  const phoneNumberRegex = /^((\+?91)|0)?[6-9][0-9]{9}$/; // Regex for phone number
  const invalidPhoneMessage = document.getElementById("invalid-edit-phone"); //Message to show the invalid phone number

  if (
    (phoneNumberRegex.test(numberToBeValid) &&
      isUniqueEmailOrPhone("phone", numberToBeValid)) ||
    event.target.value === ""
  ) {
    invalidPhoneMessage.style.display = "none"; //if correct, no invalid messages
    phoneEditCorrectFlag = true;
  } else {
    invalidPhoneMessage.textContent = phoneNumberRegex.test(numberToBeValid)
      ? "Phone number already exists"
      : "Enter valid phone number"; // display appropriate invalid message
    invalidPhoneMessage.style.display = "block";
    phoneEditCorrectFlag = false;
  }
});

//On submittion of edit form
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (nameEditCorrectFlag && phoneEditCorrectFlag && emailEditCorrectFlag) {
    const updatedDetails = {
      unique_id: Number(editkey),
      name: nameEditfield.value.trim(),
      email: emailEditField.value.trim(),
      phone: numberToBeStored(phoneEditField.value),
      address: addressEditField.value.trim(),
    };
    //updated contact details

    const allContacts = getAllContacts();
    const updatedContacts = allContacts.map((contact) => {
      if (contact.unique_id === Number(editkey)) {
        updatedDetails.isStarred = contact.isStarred; // copying the isStarred value after editing details
        return updatedDetails;
      }
      return contact;
    });
    localStorage.setItem("contacts", JSON.stringify(updatedContacts)); // stores the modified data into the form
    closeEditForm(); // close the edit form
    init(); // initial the contacts after edit
    searchFilterAndSortCombined(); // searched contacts remains in screen
  }
});

//On clicking cancel button,just close the edit form without changes
cancelBtn.addEventListener("click", closeEditForm);

//Confirmation of On click of delete
deleteSureBox.addEventListener("click", function (event) {
  const eventTarget = event.target;
  if (eventTarget.closest(".delete-yes")) {
    const allContacts = getAllContacts();
    const withDeletedContact = allContacts.filter((el) => {
      return el.unique_id !== Number(deletekey); // filtering out the deleted contact
    });
    localStorage.setItem("contacts", JSON.stringify(withDeletedContact));
    closeDeleteConfirmation(); // closing confirmation box
    init(); // initialize the display after each delete
    searchFilterAndSortCombined(); // after delete, search stays the same
  }

  if (eventTarget.closest(".delete-no")) {
    closeDeleteConfirmation(); // if cancel, close the box and no operation
  }
});
