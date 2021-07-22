console.log('Client JS loaded.')

const navbarBurger = document.querySelector('.navbar-burger')
const menu = document.querySelector('.menu')
navbarBurger.addEventListener('click', () => menu.classList.toggle('is-hidden-mobile'))