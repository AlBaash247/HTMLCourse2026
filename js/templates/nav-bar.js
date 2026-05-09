import { getToken } from '../constants/api.js'


let url = document.URL //window.location.href
let path = url.includes('/pages/') ? './' : './pages/'
let index_path = url.includes('/pages/') ? '../' : './'

let defaultNavLinks = [
    {
        label: 'Home',
        link: index_path + 'index.html'
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
            let linkElement = `<a href="${item.link}" class="nav-link">${item.label}</a>`
            navLinksContainer.innerHTML += linkElement
        });
    }

    if (navAuthLinksContainer) {

        defaultAuthLinks.forEach(item => {
            let linkElement = `<a href="${item.link}" class="nav-link">${item.label}</a>`
            navAuthLinksContainer.innerHTML += linkElement
        });
    }

}


