console.log('Client JS loaded.')

const navbarBurger = document.querySelector('.navbar-burger')
const menu = document.querySelector('.menu')
const body = document.body
const menuContainer = document.querySelectorAll('.menu-container')

const createMenuOverlay = document.createElement('div')
createMenuOverlay.classList.add('menu-overlay')

const state = {
    menuOpen: false
}

const toggleMenu = () => {
    // Set the state to the opposite of the current value
    state.menuOpen = !state.menuOpen

    if (state.menuOpen) {
        // This if statement checks to see if the menu was already opened more than once by checking if the element contains the menu-close class. It fires the transition effect on menu close.
        if (menu.classList.contains('menu-close')) {
            menu.classList.remove('menu-open')
            menu.classList.remove('menu-close')
        }

        body.appendChild(createMenuOverlay) 
        menu.classList.add('menu-open')
    } else {
        const menuOverlay = document.querySelector('.menu-overlay')
        menu.classList.add('menu-close')
        menuOverlay.remove()    
    }
}

navbarBurger.addEventListener('click', () => toggleMenu())

createMenuOverlay.addEventListener('click', () => toggleMenu())

menuContainer.forEach(menuContainerItem => {
    menuContainerItem.addEventListener('click', e => {
        const menuList = e.currentTarget.nextElementSibling
        const arrowIcon = e.currentTarget.childNodes[1]

        menuList.classList.toggle('is-hidden')
        arrowIcon.classList.contains('fa-chevron-right') ? arrowIcon.classList.replace('fa-chevron-right', 'fa-chevron-down') : arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-right')
        
    })
})