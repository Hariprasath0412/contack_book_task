//ALL THE GLOBAL CONSTANTS ARE HERE
const searchBox = document.getElementById("searching"); // searching the input
const contactTable = document.getElementById("contact-table"); //
const noContacts = document.getElementById("no-contact-display"); //For displaying no contacts
// const viewBtn = document.getElementsByClassName(".view-btn");

//Edit form Fields are tored here
const editForm = document.getElementById("edit-form");
const nameEditfield = document.getElementById("edit-person-name");
const emailEditField = document.getElementById("edit-person-mail");
const phoneEditField = document.getElementById("edit-person-phone");
const addressEditField = document.getElementById("edit-person-address");
const cancelBtn = document.getElementById("edit-form-cancel-btn");
const overlay = document.getElementById("overlay-on");
let editkey;
// console.log(viewBtn[0]);
//ALL THE FUNCTIONS ARE HERE
//Below function is for showing the all the contacts after comming to the page
function getAllContacts() {
  const store = [];
  for (let i = 0; i < localStorage.length; i++) {
    store[i] = JSON.parse(localStorage.getItem(localStorage.key(i))); // getting every contacts from localstorage
  }
  return store;
}

// This functions is used to both display all the contacts and also to display searched contacts
function renderContacts(contactsToBeRendered) {
  contactTable.innerHTML = ""; //remove all the contacts first
  contactsToBeRendered.forEach((element) => {
    const { name, email, phone, address } = element; // destructing each details from localstorage
    const array = Object.entries(localStorage);
    let keyToBeGiven; // Declared outside to store the key
    for (let [key, value] of array) {
      const checkingObjects = JSON.parse(value);
      if (
        checkingObjects.name === name &&
        checkingObjects.email === email &&
        checkingObjects.phone === phone
      ) {
        keyToBeGiven = key; // key is selected by checking its name, email, phone
      }
    }
    // console.log(keyToBeGiven);

    const html = `<tr data-key=${keyToBeGiven}>
          <td class="each-contact">
            <p class="serial-no">1</p>
            <label class="person-name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 star-icon starred"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
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
            <ul class="detial-section all-toggle-detail">
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
            <section class="other-btn all-toggle-btn">
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

function openModal() {
  editForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
  editForm.style.display = "flex";
}

function closeModal() {
  editForm.classList.add("hidden");
  overlay.classList.add("hidden");
  editForm.style.display = "none";
}
//Rendering all the available contacts at the local storage at first
function init() {
  const store = getAllContacts();
  if (store.length === 0) {
    noContacts.style.display = "block";
  }
  renderContacts(store);
  // console.log(store.length);
  // if(store)
}

init(); // initializing

//ALL THE EVENT LISTENERS ARE HERE
//Delete button function using Event delegation
contactTable.addEventListener("click", function (event) {
  const eventTarget = event.target;
  // If delete button is clicked
  if (eventTarget.closest(".delete")) {
    const details = event.target.closest("tr"); // the appropiate row of contacts is selected
    const key = details.dataset.key; // the key is now retrived
    localStorage.removeItem(key); // Contact detail has been removed from local storage
    details.remove();
    init();
  }

  //If edit button is clicked
  if (eventTarget.closest(".edit")) {
    const details = eventTarget.closest("tr");
    editkey = details.dataset.key;

    const personData = JSON.parse(localStorage.getItem(editkey));
    console.log(personData);
    nameEditfield.value = personData.name;
    emailEditField.value = personData.email;
    phoneEditField.value = personData.phone;
    addressEditField.value = personData.address;
    openModal();
  }
});

//ON submittion of edit form
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const updatedDetails = {
    name: nameEditfield.value.trim(),
    email: emailEditField.value.trim(),
    phone: phoneEditField.value.trim(),
    address: addressEditField.value.trim(),
  };

  localStorage.setItem(editkey, JSON.stringify(updatedDetails));
  closeModal();
  init();
});

cancelBtn.addEventListener("click", closeModal);
//Searhing for the appropiate contact
searchBox.addEventListener("input", function (event) {
  const eventTarget = event.target.value.toLowerCase();
  const store = getAllContacts();

  const filteredContacts = store.filter((contact) => {
    return contact.name.toLowerCase().includes(eventTarget);
  });

  renderContacts(filteredContacts);
});
