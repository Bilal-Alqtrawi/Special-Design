let landingPage = document.querySelector(".landing-page");

let settingsSideBar = document.querySelector(".setting-box");

// Get Array Of Imgs
const imgsArray = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
];

// Random Background Option
let backgroundOption = true;

// Varaiable To Control The Background Interval
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove active Class From Spans
  document.querySelectorAll(".random-backgrounds span").forEach((span) => {
    span.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

function randomaizeImgs(array) {
  if (backgroundOption === true) {
    // Get Random Number
    let randomNum = Math.floor(Math.random() * array.length);

    // Set Random Background
    landingPage.style.backgroundImage = `url(${array[randomNum]})`;
  }
}

backgroundInterval = setInterval(randomaizeImgs, 10000, imgsArray);

// Toggle Spin Class On Icon
let settingsBtn = document.querySelector(".toggle-settings .settings-icon");
settingsBtn.onclick = function (e) {
  this.classList.toggle("fa-spin");
  settingsSideBar.classList.toggle("open");
};
// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

function switchColors() {
  colorsLi.forEach((color) => {
    color.onclick = function (e) {
      handleActive(e);

      // Set Color On Root
      document.documentElement.style.setProperty(
        "--main-color",
        this.dataset.color
      );

      // Store Color On Local Storage
      window.localStorage.setItem("color", this.dataset.color);
    };
  });
}
switchColors();

const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

let colorLocalItem = localStorage.getItem("color");

if (colorLocalItem) {
  colorsLi.forEach((color) => {
    color.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${colorLocalItem}"]`)
    .classList.add("active");

  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
}

let ourSkills = document.querySelector(".skills");

let aboutUs = document.querySelector(".about-us");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // window ScrollTop
  let windowScrollTop = window.scrollY; // this.pageYOffset

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // console.log("Skills Section Reached");

    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
  if (window.scrollY > aboutUs.offsetTop) {
    topBtn.style.display = "block";
    document.querySelector(".header-area").classList.add("fixed");
  } else {
    topBtn.style.display = "none";
    document.querySelector(".header-area").classList.remove("fixed");
  }
};

// Create Popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    // Create The Popup
    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imageHeading = document.createElement("h3");

      let imgText = document.createTextNode(img.alt);

      imageHeading.appendChild(imgText);

      popupBox.appendChild(imageHeading);
    }

    // Create the image Inside Popup
    let popupImage = document.createElement("img");
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-btn";

    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.classList == "close-btn") {
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Set Timeline Dynamic
document.querySelector(".year").innerHTML = new Date().getFullYear();

const allLinks = document.querySelectorAll(".links a");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    allLinks.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
  });
});

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault(); // prevent behviour default

      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allLinks);

let topBtn = document.querySelector(".top");
topBtn.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

let navBullets = document.querySelector(".nav-bullets");

function createBullets() {
  let sectoins = document.querySelectorAll("[id]");

  for (let i = 0; i < sectoins.length; i++) {
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.setAttribute("data-section", sectoins[i].id);

    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.appendChild(document.createTextNode(sectoins[i].className));

    bullet.appendChild(tooltip);
    navBullets.appendChild(bullet);
  }
  let bullets = document.querySelectorAll(".nav-bullets .bullet");
  scrollToSomewhere(bullets);
}
createBullets();

document.querySelectorAll(".bullets-option span").forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    localStorage.setItem("show_bullets", e.target.dataset.display);
    if (e.target.dataset.display == "yes") {
      navBullets.style.display = "block";
    } else {
      navBullets.style.display = "none";
    }
  });
});

let showBulletsLocalItem = localStorage.getItem("show_bullets");

if (showBulletsLocalItem !== null) {
  document.querySelectorAll(".bullets-option span").forEach((span) => {
    span.classList.remove("active");
  });
  if (showBulletsLocalItem == "yes") {
    document.querySelector(".bullets-option .yes").classList.add("active");
    navBullets.style.display = "block";
  } else {
    document.querySelector(".bullets-option .no").classList.add("active");
    navBullets.style.display = "none";
  }
}
// Reset Button
document.querySelector(".reset-options").onclick = (e) => {
  window.localStorage.clear();
  window.location.reload();
};
// Handle Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}
if (window.scrollY == 0) {
  topBtn.style.display = "none";
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let toggleIcon = document.querySelector(".toggle-menu i.fa-bars");
let tLinks = document.querySelector(".header-area .links");

toggleBtn.onclick = function (e) {
  // Stop Proagation
  e.stopPropagation();
  this.classList.toggle("active");
  tLinks.classList.toggle("open");
};

// Click AnyWhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleIcon && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("active");
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Proagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
