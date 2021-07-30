console.log('Client JS loaded.')

const navbarBurger = document.querySelector('.navbar-burger')
const menu = document.querySelector('.menu')
const body = document.body
const menuContainers = document.querySelectorAll('.menu-container')
const menuItems = document.querySelectorAll('.menu-item')

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

menuContainers.forEach(menuContainerItem => {
    menuContainerItem.addEventListener('click', e => {
        const menuList = e.currentTarget.nextElementSibling
        const arrowIcon = e.currentTarget.childNodes[1]

        menuList.classList.toggle('is-hidden')
        arrowIcon.classList.contains('fa-chevron-right') ? arrowIcon.classList.replace('fa-chevron-right', 'fa-chevron-down') : arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-right')
        
    })
})

// Add is-active to clicked nav item
if (localStorage.getItem('menu-item-clicked')) {
    const menuItemData = JSON.parse(localStorage.getItem('menu-item-clicked'))
    const menuListIds = JSON.parse(localStorage.getItem('menu-list-clicked'))

    // Open all parent menu lists (form js bubbling) from ids stored from anchor tag click
    menuListIds.menuListIds.forEach(id => {
        const menuList = document.getElementById(id)
        const arrowIcon = menuList.previousElementSibling.children[1]

        menuList.classList.toggle('is-hidden')
        arrowIcon.classList.contains('fa-chevron-right') ? arrowIcon.classList.replace('fa-chevron-right', 'fa-chevron-down') : arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-right')
    })

    menuItems.forEach(menuItem => {
        if (menuItem.innerHTML == menuItemData.targetMenuItemValue) {
            menuItem.classList.add('active')
        }
    })

}

menuItems.forEach(menuItem => {
    // Removes is-active completely if user clicks on home for example and keeps menu open for all routes besides home
    if (window.location.pathname === '/') {
        localStorage.removeItem('menu-item-clicked')
    }

    menuItem.addEventListener('click', e => {
        // Get all ids of parent menu list and store in local storage
        const menuLists = document.querySelectorAll('.menu-list')
        const menuListIds = []
        menuLists.forEach(menuList => {
            menuList.addEventListener('click', () => {
                menuListIds.push(menuList.id)
                localStorage.setItem('menu-list-clicked', JSON.stringify({ menuListIds }))
            })
        })

        // Store clicked on anchor tag in local storage
        targetMenuItem = e.currentTarget
        targetMenuItemValue = targetMenuItem.innerHTML

        localStorage.setItem('menu-item-clicked', JSON.stringify({ targetMenuItemValue, state: 'active'}))
    })
})
