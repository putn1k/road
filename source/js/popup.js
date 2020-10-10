var popup = document.querySelector(".popup");
var popupBtn = document.querySelector(".promo__button");
var popupClose = document.querySelector(".popup__button--close");
var overlay = document.querySelector(".overlay");
var focus = document.querySelectorAll(".popup__input");

popupBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("popup--show");
  overlay.classList.add("overlay--show");
  focus[0].focus();
});

popupClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("popup--show");
  overlay.classList.remove("overlay--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("popup--show")) {
      popup.classList.remove("popup--show");
      overlay.classList.remove("overlay--show");
    }
  }
});
