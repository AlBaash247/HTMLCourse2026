import { getToken } from '../constants/api.js'


let current_url = document.URL //window.location.href
let path = current_url.includes('/pages/') ? './' : './pages/'
let index_path = current_url.includes('/pages/') ? '../' : './'

let defaultNavLinks = [
    {
        label: 'Index',
        link: index_path + 'index.html'
    },
    {
        label: 'Quick-Tasks',
        link: path + 'quick-tasks.html'
    }
]



let defaultAuthLinks = []


createNavbarItems(defaultNavLinks);

export function createNavbarItems(navLinks = defaultNavLinks) {
    let navLinksContainer = document.getElementById("navLinksContainer")
    let navAuthLinksContainer = document.getElementById("navAuthLinksContainer")

    
    if (getToken() !== null ) {
        defaultAuthLinks.push({
            label: 'Profile',
            link: path + 'profile.html'
        })
    }
    else {
        defaultAuthLinks.push({
            label: 'Login',
            link: path + 'login.html'
        })
        defaultAuthLinks.push({
            label: 'Register',
            link: path + 'register.html'
        })
    }


    if (navLinksContainer) {
        navLinks.forEach(item => {
            let is_active = current_url.includes(item.label.toLowerCase())? 'text-secondary' : ''            
            let linkElement = `<a href="${item.link}" class="nav-link ${is_active}">${item.label}</a>`
            navLinksContainer.innerHTML += linkElement
        });
    }

    if (navAuthLinksContainer) {
      defaultAuthLinks.forEach(item => {
            let is_active = current_url.includes(item.label.toLowerCase())? 'text-secondary' : ''
            let linkElement = `<a href="${item.link}" class="nav-link ${is_active}">${item.label}</a>`
            navAuthLinksContainer.innerHTML += linkElement
        });
    }

}


