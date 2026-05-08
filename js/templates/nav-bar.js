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






createNavbarItems(defaultNavLinks);

export function createNavbarItems(navLinks = defaultNavLinks) {
    let navContainer = document.getElementById("navContainer")

    
    if (getToken() !== null ) {
        defaultNavLinks.push({
            label: 'Profile',
            link: path + 'profile.html'
        })
    }
    else {
        defaultNavLinks.push({
            label: 'Login',
            link: path + 'login.html'
        })
        defaultNavLinks.push({
            label: 'Register',
            link: path + 'register.html'
        })
    }


    if (navContainer) {

        navLinks.forEach(item => {
            let linkElement = `<a href="${item.link}" class="nav-link">${item.label}</a>`
            navContainer.innerHTML += linkElement
        });
    }

}


