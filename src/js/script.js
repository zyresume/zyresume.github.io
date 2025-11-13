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
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
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
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

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


// Infinite conveyor belt testimonials - DEBUG
window.addEventListener('load', function() {
  console.log('Page loaded');
  
  const testimonialsList = document.querySelector('.testimonials-list.has-scrollbar');
  console.log('Testimonials list:', testimonialsList);

  if (testimonialsList) {
    setTimeout(function() {
      const testimonialItems = Array.from(document.querySelectorAll('.testimonials-item'));
      console.log('Original items count:', testimonialItems.length);
      
      // Clone all testimonial items for seamless loop
      testimonialItems.forEach(item => {
        const clone = item.cloneNode(true);
        testimonialsList.appendChild(clone);
      });
      
      console.log('After cloning, scroll width:', testimonialsList.scrollWidth);
      console.log('Container width:', testimonialsList.clientWidth);
      
      let scrollPos = 0;
      const scrollSpeed = 1; // Increased speed for testing
      
      function autoScroll() {
        scrollPos += scrollSpeed;
        testimonialsList.scrollLeft = scrollPos;
        
        console.log('Scrolling... Position:', scrollPos);
        
        // Seamlessly reset when halfway through
        const halfWidth = testimonialsList.scrollWidth / 2;
        if (scrollPos >= halfWidth) {
          console.log('Resetting scroll position');
          scrollPos = 0;
        }
      }
      
      let scrollInterval = setInterval(autoScroll, 20);
      console.log('Scroll interval started');
      
      // Pause on hover
      testimonialsList.addEventListener('mouseenter', function() {
        clearInterval(scrollInterval);
        console.log('Paused');
      });
      
      // Resume on mouse leave
      testimonialsList.addEventListener('mouseleave', function() {
        scrollInterval = setInterval(autoScroll, 20);
        console.log('Resumed');
      });
      
    }, 500);
  } else {
    console.log('Testimonials list NOT found');
  }
});
