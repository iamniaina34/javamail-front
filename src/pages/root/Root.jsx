import React from 'react'
import { useCookies } from 'react-cookie'

function redirectToHomePage() {
    window.location.href = "/acceuil"
}

function redirectToLoginPage() {
    window.location.href = "/connecter"
}

export default function Root() {
    const [cookies, setCookie] = useCookies(['userId'])
    if (!!cookies.userId) redirectToHomePage()
    else redirectToLoginPage()
}