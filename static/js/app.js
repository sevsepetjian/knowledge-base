const navbarBurger = document.querySelector('.navbar-burger')
const menu = document.querySelector('.menu')
const body = document.body
const menuContainers = document.querySelectorAll('.menu-container')
const menuItems = document.querySelectorAll('.menu-item')
const menuLists = document.querySelectorAll('.menu-list')

const createMenuOverlay = document.createElement('div')
createMenuOverlay.classList.add('menu-overlay')

const state = {
    menuOpen: false
}

const toggleMenuMobile = () => {
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

const resetMenu = () => {
    const arrowDownIcons = document.querySelectorAll('.fa-chevron-down')
    localStorage.removeItem('menu-item-clicked')
    localStorage.removeItem('menu-list-clicked')

    menuItems.forEach(menuItem => menuItem.classList.remove('active'))
    menuLists.forEach(menuList => menuList.classList.add('is-hidden'))
    arrowDownIcons.forEach(arrowIcon => arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-right'))
}

const toggleMenuList = (menuList, arrowIcon) => {
    menuList.classList.toggle('is-hidden')
    arrowIcon.classList.contains('fa-chevron-right') ? arrowIcon.classList.replace('fa-chevron-right', 'fa-chevron-down') : arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-right')
}

const openMenuToClickedArticle = () => {
    const menuItemData = JSON.parse(localStorage.getItem('menu-item-clicked'))
    const menuListIds = JSON.parse(localStorage.getItem('menu-list-clicked'))

    menuListIds.menuListIds.forEach(id => {
        const menuList = document.getElementById(id)
        const arrowIcon = menuList.previousElementSibling.children[1]

        toggleMenuList(menuList, arrowIcon)
    })

    menuItems.forEach(menuItem => {
        if (menuItem.innerHTML == menuItemData.targetMenuItemValue) {
            menuItem.classList.toggle('active')
        }
    })
}

const menuContainerClickListener = () => {
    // Change arrow icons when clicked
    menuContainers.forEach(menuContainerItem => {
        menuContainerItem.addEventListener('click', e => {
            const menuList = e.currentTarget.nextElementSibling
            const arrowIcon = e.currentTarget.childNodes[1]

            toggleMenuList(menuList, arrowIcon)
        })
    })
}

const menuLocalStorageClickListener = () => {
    // Add menu items and lists to local storage when menu item clicked
    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', e => {
            // Get all ids of parent menu list and store in local storage
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
}

const init = () => {
    navbarBurger.addEventListener('click', () => toggleMenuMobile()) 
    createMenuOverlay.addEventListener('click', () => toggleMenuMobile())
    menuContainerClickListener()
    menuLocalStorageClickListener()
    window.location.pathname === '/' ? resetMenu() : openMenuToClickedArticle()
    registerSW()
}

window.document.addEventListener('load', init())

// PWA
// Register the Service Worker
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator
            .serviceWorker
            .register('/sw.js');
    }
    catch (e) {
      console.log('SW registration failed');
    }
  }
}