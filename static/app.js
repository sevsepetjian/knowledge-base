console.log('Client JS loaded.')

const navbarBurger = document.querySelector('.navbar-burger')
const menu = document.querySelector('.menu')
const body = document.body

const createMenuOverlay = document.createElement('div')
createMenuOverlay.classList.add('menu-overlay')

const state = {
    menuOpen: false
}

const toggleMenu = () => {
    // Set the state to the opposite of the current value
    state.menuOpen = !state.menuOpen

    if (state.menuOpen) {
       body.appendChild(createMenuOverlay) 
    } else {
        const menuOverlay = document.querySelector('.menu-overlay')
        menuOverlay.remove()    
    }

    menu.classList.toggle('is-hidden-mobile')
    menu.style.transform = 'translateX(0)'
}

navbarBurger.addEventListener('click', () => toggleMenu())

createMenuOverlay.addEventListener('click', () => toggleMenu())