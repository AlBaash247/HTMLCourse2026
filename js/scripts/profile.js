import {
    fetchApiData,
    METHOD_GET,
    API_URL_AUTH_USER,
} from '../constants/api.js'


const resultContainer = document.getElementById('resultContainer')
const btnGetUser = document.getElementById('btnGetUser')
const profileUserCard = document.getElementById('profileUserCard')
const profileUserForm = document.getElementById('profileUserForm')
const profileUserId = document.getElementById('profileUserId')
const profileInputName = document.getElementById('profileInputName')
const profileInputEmail = document.getElementById('profileInputEmail')
const profileInputEmailVerifiedAt = document.getElementById('profileInputEmailVerifiedAt')
const profileInputCreatedAt = document.getElementById('profileInputCreatedAt')
const profileInputUpdatedAt = document.getElementById('profileInputUpdatedAt')


  fetchUserDetails()
async function fetchUserDetails() {
    resultContainer.textContent = ''
    profileUserCard.style.display = 'none'

    let response = await fetchApiData(METHOD_GET, API_URL_AUTH_USER, null)

    if (response.success && response.data) {
        renderUserProfile(response.data)
    } else {
        resultContainer.textContent = 'Unable to load user information.'
    }
}

function renderUserProfile(user) {
    profileUserId.value = user.id ?? ''
    profileInputName.value = user.name ?? ''
    profileInputEmail.value = user.email ?? ''
    profileInputEmailVerifiedAt.value = formatDatetime(user.email_verified_at, 'Not verified')
    profileInputCreatedAt.value = formatDatetime(user.created_at, '')
    profileInputUpdatedAt.value = formatDatetime(user.updated_at, '')

    profileUserCard.style.display = 'block'
}

function formatDatetime(value, fallback = '') {
    if (!value) {
        return fallback
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return fallback
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const day = String(date.getDate()).padStart(2, '0')
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}-${month}-${year} | ${hours}:${minutes}`
}

// result:
/*

{"id":1,
"name":"Yousuf",
"email":"testuser1@mail.com",
"email_verified_at":null,
"created_at":"2026-05-01T14:15:25.000000Z",
"updated_at":"2026-05-01T14:15:25.000000Z"
}
*/