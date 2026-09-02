//ALL THE GLOBAL CONSTANTS/VARIABLES ARE HERE
const searchBox = document.getElementById("searching"); // searching the input
const contactTable = document.getElementById("contact-table"); //
const displayMessage = document.getElementById("no-contact-display"); //For displaying no contacts
// const viewBtn = document.getElementsByClassName(".view-btn");

//Edit form Fields are stored here
const editForm = document.getElementById("edit-form"); // edit form
const nameEditfield = document.getElementById("edit-person-name"); // name field in edit form
const emailEditField = document.getElementById("edit-person-mail"); // email field in edit form
const phoneEditField = document.getElementById("edit-person-phone"); // phone field in edit form
const addressEditField = document.getElementById("edit-person-address"); // address field in edit form
const cancelBtn = document.getElementById("edit-form-cancel-btn"); // cancel btn in edit form
const overlay = document.getElementById("overlay-on");
let editkey; // edit key needed to be in global for the edit to have correct details

//showing invalids for edit form
const invalidNameMessage = document.querySelector(".invalid-edit-name"); //Message to show the invalid email
const invalidPhoneMessage = document.querySelector(".invalid-edit-phone"); //Message to show the invalid phone number
const invalidEmailMessage = document.querySelector(".invalid-edit-email"); //Message to show the invalid email
const phoneNumberRegex = /^((\+?91)|0)?[6-9][0-9]{9}$/; // Regex for phone number
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for email

//Selection of body element
const body = document.body;

//flags for correct storage of data
let nameEditCorrectFlag = true,
  emailEditCorrectFlag = true,
  phoneEditCorrectFlag = true;

//Constants for delete operation
const deleteSureBox = document.getElementById("delete-sure-box"); // Delete confirmation box
let deletekey;

//Other functions(sort and filter) for User Interface
const sortByMethod = document.getElementById("sort-by"); //Sort by feature selection
const filterMethod = document.getElementById("filter-to"); //filter feature selection

//ALL THE FUNCTIONS ARE HERE
//Below function is for getting the all the contacts after comming to the page
function getAllContacts() {
  const store = JSON.parse(localStorage.getItem("contacts"));
  return store;
}

//Return the correct number even if it has +91/91/0
function numberToBeStored(number) {
  let stored = number.replaceAll(" ", "").replaceAll("-", "").slice(-10); // removing all spaces/dashed inside phone number
  return stored;
}

//Function to check unique names
function isUniqueName(name) {
  const stored = getAllContacts();
  for (let i = 0; i < stored.length; i++) {
    if (stored[i].name === name) {
      return false; // if name is already present, name is not unique
    }
  }
  return true; // if name is not present, name is unique, name can be accepted
}

// This functions is used to both display all the contacts and also to display searched contacts
function renderContacts(contactsToBeRendered) {
  // console.log(contactsToBeRendered);
  contactTable.innerHTML = ""; //remove all the contacts first
  contactsToBeRendered.forEach((element) => {
    // console.log(element);
    const { name, email, phone, address, unique_id, isStarred } = element; // destructing each details from localstorage
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
                class="size-6 star-icon ${isStarred ? "starred" : "none"}"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              </button>
              ${name}
            </label>

            <!-- Card toggle action -->
            <!-- <input
              type="checkbox"
              id="view-toggle-1"
              class="display-none-input"
            />
            <label class="view-btn" for="view-toggle-1">
              <span>View</span>
            </label> -->

            <button class="view-btn">View</button>

            <!-- Detailed Contact section -->
            <ul class="detial-section all-toggle-detail hidden">
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
                <a href="tel:+919629535105">
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

            <!-- Edit / Delete buttons -->
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
    // contactTable.innerHTML = html + contactTable.innerHTML;
  });
}

//Opening and closing delete confirmation display
function openDeleteConfirmation() {
  deleteSureBox.classList.remove("hidden"); // displays the confirmation box
  overlay.classList.remove("hidden");
  body.style.overflow = "hidden"; // Prevent scrolling when overlay in effect
}
function closeDeleteConfirmation() {
  deleteSureBox.classList.add("hidden"); // hides the confirmation box
  overlay.classList.add("hidden");
  body.style.overflow = "auto"; // Enablies scrolling
}

//opening the overlay effect
function openModal() {
  editForm.classList.remove("hidden"); // displays the edit form
  overlay.classList.remove("hidden");
  editForm.style.display = "flex";
  body.style.overflow = "hidden"; // Prevent scrolling when overlay in effect
}
//closing the overlay effect
function closeModal() {
  editForm.classList.add("hidden"); // hides the edit form
  overlay.classList.add("hidden");
  editForm.style.display = "none";
  body.style.overflow = "auto"; // Enablies scrolling
}

//search filter and sort combined function
function searchFilterAndSortCombined() {
  const allContacts = getAllContacts();
  const sortByValue = sortByMethod.value;
  const filteredValue = filterMethod.value;
  const searchValue = searchBox.value.trim().toLowerCase();

  let result = allContacts;
  if (filteredValue === "Starred") {
    result = result.filter((el) => {
      return el.isStarred === true;
    });
  }

  if (searchValue) {
    result = result.filter((el) => {
      return el.name.toLowerCase().replaceAll(" ", "").includes(searchValue);
    });
  }

  if (sortByValue === "A to Z") {
    result = result.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  } else if (sortByValue === "Z to A") {
    result = result.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  renderContacts(result);
}

// //sorting function
// function sortingBy(sort) {
//   const allContacts = getAllContacts();

//   if (sort === "Sort By") return allContacts;
//   // console.log(allContacts);
//   sortedContacts = allContacts.sort((a, b) => {
//     return b.name.localeCompare(a.name); // sorting by a to z
//   });
//   if (sort === "A to Z") return sortedContacts; // From a to z
//   if (sort === "Z to A") return sortedContacts.reverse(); // from z to a after reverse
// }

// //filtering function
// function filterTo(filter) {
//   const allContacts = getAllContacts();
//   if (filter === "Filter") return allContacts;
//   filteredContacts = allContacts.filter((el) => {
//     return el.isStarred === true; //Filtering out the starred contacts
//   });
//   if (filter === "Starred") return filteredContacts;
// }

//Adding star to contact
//Rendering all the available contacts at the local storage at first
function init() {
  const store = getAllContacts();
  if (store.length === 0) {
    displayMessage.innerText = " No contacts Yet";
    displayMessage.style.display = "block"; // Show no contact if no contacts in localstorage
  }
  renderContacts(store);
}

init(); // initializing the display

//ALL THE EVENT LISTENERS ARE HERE
//Delete button function using Event delegation
contactTable.addEventListener("click", function (event) {
  const eventTarget = event.target;
  if (eventTarget.closest(".view-btn")) {
    eventTarget.nextElementSibling.classList.toggle("hidden");
    eventTarget.nextElementSibling.nextElementSibling.classList.toggle(
      "hidden",
    );
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
    editkey = details.dataset.key;

    const allContacts = getAllContacts();
    const personData = allContacts.find((el) => el.unique_id == editkey);
    openModal();

    nameEditfield.value = personData.name;
    emailEditField.value = personData.email;
    phoneEditField.value = personData.phone;
    addressEditField.value = personData.address; // copies the data into the form
  }

  if (eventTarget.closest(".star-icon")) {
    // addStarToContact();
    // console.log(eventTarget);
    eventTarget.classList.toggle("starred");
    const details = event.target.closest("tr"); // the appropiate row of contacts is selected
    // console.log(details);
    starToggleKey = details.dataset.key;
    // console.log(starToggleKey);
    const allContacts = getAllContacts();
    // console.log(allContacts);
    const starUpdatedContact = allContacts.map((el) => {
      // console.log(el);
      el.unique_id == starToggleKey
        ? (el.isStarred = !el.isStarred)
        : el.isStarred;
      return el;
    }); // the above code is to make sure isStarred is updated

    localStorage.setItem("contacts", JSON.stringify(starUpdatedContact));
    renderContacts(starUpdatedContact);
  }
});

// Checking whether email input is correct inside for each input
nameEditfield.addEventListener("input", function (event) {
  const currentName = event.target.value.trim();
  // console.log(currentName);
  if (isUniqueName(currentName) || event.target.value === "") {
    invalidNameMessage.style.display = "none"; // dont display error when no input or input is unique
    nameEditCorrectFlag = true;
  } else {
    invalidNameMessage.style.display = "block";
    nameEditCorrectFlag = false;
  }
});

//Checking whether email is valid or not for each input
emailEditField.addEventListener("input", function (event) {
  if (emailRegex.test(event.target.value) || event.target.value === "") {
    invalidEmailMessage.style.display = "none";
    emailEditCorrectFlag = true;
  } else {
    invalidEmailMessage.style.display = "block";
    emailEditCorrectFlag = false;
  }
});

// Checking whether phone input is correct inside for each input
phoneEditField.addEventListener("input", function (event) {
  const NumberToBeValid = event.target.value
    .replaceAll(" ", "")
    .replaceAll("-", "");
  if (phoneNumberRegex.test(NumberToBeValid) || event.target.value === "") {
    invalidPhoneMessage.style.display = "none";
    phoneEditCorrectFlag = true;
  } else {
    invalidPhoneMessage.style.display = "block";
    phoneEditCorrectFlag = false;
  }
});

//ON submittion of edit form
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (nameEditCorrectFlag && phoneEditCorrectFlag && emailEditCorrectFlag) {
    const updatedDetails = {
      unique_id: Number(editkey),
      name: nameEditfield.value.trim(),
      email: emailEditField.value.trim(),
      phone: numberToBeStored(phoneEditField.value),
      address: addressEditField.value.trim(),
    }; //updated contact details
    const allContacts = getAllContacts();
    updatedContacts = allContacts.map((el) => {
      // console.log(el.unique_id == editkey);
      if (el.unique_id == editkey) {
        updatedDetails.isStarred = el.isStarred; // copying the isStarred value after editing details
        return updatedDetails;
      }
      return el;
    });
    // console.log(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts)); // stores the modified data into the form
    closeModal(); // close the edit form
    init(); // initialize the page
  }
});

cancelBtn.addEventListener("click", closeModal); // if cancel button on edit form in clicked

//Confirmation of On click of delete
deleteSureBox.addEventListener("click", function (event) {
  const eventTarget = event.target;
  if (eventTarget.closest(".delete-yes")) {
    const allContacts = getAllContacts();
    // console.log(allContacts);
    // console.log(deletekey);
    const withDeletedContact = allContacts.filter((el) => {
      return el.unique_id != deletekey; // filtering out the deleted contact
    });
    localStorage.setItem("contacts", JSON.stringify(withDeletedContact));
    // console.log(withDeletedContact);
    closeDeleteConfirmation(); // closing confirmation box
    init(); // initialize the display after each delete
  }
  if (eventTarget.closest(".delete-no")) {
    closeDeleteConfirmation(); // if cancel, close the box and no operation
  }
});

searchBox.addEventListener("input", searchFilterAndSortCombined);
sortByMethod.addEventListener("change", searchFilterAndSortCombined);
filterMethod.addEventListener("change", searchFilterAndSortCombined);

// //Searhing for the appropiate contact
// searchBox.addEventListener("input", function (event) {
//   const eventTarget = event.target.value.toLowerCase();
//   const store = getAllContacts();

//   const filteredContacts = store.filter((contact) => {
//     return contact.name.toLowerCase().replaceAll(" ", "").includes(eventTarget);
//   });
//   if (!filteredContacts.length) {
//     displayMessage.innerText = "No contacts found";
//     displayMessage.style.display = "block";
//   } else {
//     // displayMessage.innerText = " No contacts yet";
//     displayMessage.style.display = "none";
//   }
//   renderContacts(filteredContacts);
// });

// //Sort by A- Z or Z-A
// sortByMethod.addEventListener("change", function (event) {
//   // const allContacts = getAllContacts();
//   // let sortedContacts;
//   // if (sortByMethod.value === "A to Z") {
//   //   // sortedContacts = allContacts.sort((a, b) => {
//   //   //   return b.name.localeCompare(a.name); // sorting by a to z
//   //   // });
//   //   sortedContacts = sortingBy(sortByMethod.value);
//   // }

//   // if (sortByMethod.value === "Z to A") {
//   //   // sortedContacts = allContacts.sort((a, b) => {
//   //   //   return a.name.localeCompare(b.name); // sorting by z to a
//   //   // });
//   //   sortedContacts = sortingBy(sortByMethod.value);
//   // }

//   // if (sortByMethod.value === "Sort By") {
//   //   // sortedContacts = allContacts;
//   //   sortedContacts = sortingBy(sortByMethod.value);
//   // }

//   // const sortedContacts = sortingBy(sortByMethod.value);
//   // renderContacts(sortedContacts);

//   const sortedContacts = sortingBy(sortByMethod.value);
//   const filteredContacts = filterTo(filterMethod.value);
//   const CommonContacts = new Set(filteredContacts.map((obj) => obj.unique_id));
//   const finalContacts = sortedContacts.filter((el) =>
//     CommonContacts.has(el.unique_id),
//   );
//   renderContacts(finalContacts);
// });

// //Filter by oldest and starred
// filterMethod.addEventListener("change", function (event) {
//   // const allContacts = getAllContacts();
//   // let filteredContacts;
//   // if (filterMethod.value === "Starred") {
//   //   filteredContacts = allContacts.filter((el) => {
//   //     return el.isStarred === true;
//   //   });
//   // }
//   // if (filterMethod.value === "Filter") {
//   //   filteredContacts = allContacts;
//   // }
//   // const filteredContacts = filterTo(filterMethod.value);
//   // renderContacts(filteredContacts);

//   const filteredContacts = filterTo(filterMethod.value);
//   const sortedContacts = sortingBy(sortByMethod.value);
//   const CommonContacts = new Set(sortedContacts.map((obj) => obj.unique_id));
//   const finalContacts = filteredContacts.filter((el) =>
//     CommonContacts.has(el.unique_id),
//   );
//   renderContacts(finalContacts);
// });
