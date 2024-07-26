import React from 'react'
import { useCookies } from 'react-cookie'

function redirectToHomePage() {
    window.location.href = "/acceuil"
}

export default function Root() {
    redirectToHomePage()
}