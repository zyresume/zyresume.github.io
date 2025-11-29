'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Only add event listener if select exists
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Enhanced filter functionality for subcategories
let selectedCategory = "all";
let selectedSubcategory = "all";

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const category = this.closest('[data-category]')?.getAttribute('data-category') || 'all';
    const subcategory = this.getAttribute('data-subcategory');
    
    if (subcategory) {
      // Subcategory clicked
      selectedSubcategory = subcategory;
      selectedCategory = category;
    } else if (category === 'all') {
      // "All" clicked
      selectedCategory = "all";
      selectedSubcategory = "all";
    } else {
      // Main category clicked (without subcategories)
      selectedCategory = category;
      selectedSubcategory = "all";
    }
    
    // Update button text
    if (selectValue) {
      selectValue.textContent = this.textContent.replace('▶', '').trim();
    }
    
    // Filter projects
    filterFunc();
    
    // Close dropdown
    if (select) {
      elementToggleFunc(select);
    }
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  if (select && select.classList.contains('active')) {
    // Check if click is outside the select element
    if (!select.contains(event.target) && !event.target.closest('[data-select]')) {
      elementToggleFunc(select);
    }
  }
});

// Updated filter function
const filterFunc = function () {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].getAttribute("data-category");
    const itemSubcategory = filterItems[i].getAttribute("data-subcategory");
    
    if (selectedCategory === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedSubcategory === "all") {
      // Show all items in this category
      if (itemCategory === selectedCategory) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    } else {
      // Show only items matching both category and subcategory
      if (itemCategory === selectedCategory && itemSubcategory === selectedSubcategory) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  if (select && select.classList.contains('active')) {
    // Check if click is outside the select element
    if (!select.contains(event.target) && !event.target.closest('[data-select]')) {
      elementToggleFunc(select);
    }
  }
});


// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  // Normalize the selected value to match data-category format
  // Convert to lowercase, replace spaces with hyphens, replace & with 'and'
  let normalizedValue = selectedValue.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  
  console.log('Selected Value:', selectedValue);
  console.log('Normalized Value:', normalizedValue);

  for (let i = 0; i < filterItems.length; i++) {
    console.log('Item category:', filterItems[i].dataset.category);
    
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (normalizedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectedCategory = selectedValue.replace(/\s+/g, '-').replace(/&/g, 'and');
    selectedSubcategory = "all";
    
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc();

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

function copyToClipboard(text) {
  // Create a temporary input element to hold the text
  var tempInput = document.createElement("input");
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";
  tempInput.value = text;

  // Append the input element to the body
  document.body.appendChild(tempInput);

  // Select the text and copy it to the clipboard
  tempInput.select();
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Optionally, you can display a message to indicate that the text has been copied
  alert(text + " has been copied to clipboard");
}
