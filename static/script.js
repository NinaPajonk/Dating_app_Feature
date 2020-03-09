const hamburger = document.querySelector('.container');
const ul = document.querySelector('nav ul');

hamburger.addEventListener('click', function() {
  ul.classList.toggle('active');
});
