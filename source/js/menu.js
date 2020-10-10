var nav = document.querySelector(".header__top");
var cat = document.querySelector(".header__catalog")
var navBtn = document.querySelector(".header__menu-button");
var catBtn = document.querySelector(".header__submenu-button");
nav.classList.remove("header__top--nojs");
navBtn.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (nav.classList.contains("header__top--closed")) {
    nav.classList.remove("header__top--closed");
    nav.classList.add("header__top--open");
  } else {
    nav.classList.add("header__top--closed");
    nav.classList.remove("header__top--open");
  }
});
cat.classList.remove("header__catalog--nojs");
catBtn.onclick =  function() {
  if (cat.classList.contains("header__catalog--closed")) {
    cat.classList.remove("header__catalog--closed");
    cat.classList.add("header__catalog--open");
  } else {
    cat.classList.add("header__catalog--closed");
    cat.classList.remove("header__catalog--open");
  }
};
