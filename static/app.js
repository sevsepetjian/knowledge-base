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

    menuItems.forEach(menuItem => {
        if (menuItem.innerHTML == menuItemData.targetMenuItemValue) {
            menuItem.classList.add('is-active')

            // This block deals with the menu opening up to current post.Need to figure out how to get it to work for nested divs
            const menuList = menuItem.parentElement.parentElement
            const arrowIcon = menuItem.parentElement.parentElement.previousElementSibling.children[1]

            menuList.classList.toggle('is-hidden')
            arrowIcon.classList.contains('fa-chevron-right') ? arrowIcon.classList.replace('fa-chevron-right', 'fa-chevron-down') : arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-right')

            // This is the js bubbling effect need to figure out how to user this so that when a link is clicked all sub dirs are opened when page loads
            // const menuLists = document.querySelectorAll('.menu-list')
            // menuLists.forEach(menuList => {
            //     console.log(menuList)
            //     menuList.addEventListener('click', e => {
            //         console.log(menuList)
            //         menuList.classList.toggle('is-hidden')
            //     })
            // })
        }
    })
}

menuItems.forEach(menuItem => {
    // Removes is-active completely if user clicks on home for example
    localStorage.removeItem('menu-item-clicked')

    menuItem.addEventListener('click', e => {
        console.log(e.target)
        targetMenuItem = e.currentTarget
        targetMenuItemValue = targetMenuItem.innerHTML

        localStorage.setItem('menu-item-clicked', JSON.stringify({ targetMenuItemValue, state: 'is-active'}))
    })
})
