var hamburger = document.querySelector(".container");
var ul = document.querySelector("nav ul");

hamburger.addEventListener("click", function () {
    ul.classList.toggle("active");
})