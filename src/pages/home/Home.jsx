import React, { useEffect } from 'react'

function Home() {

    const redirectToLoginPage = () => {
        window.location.href = "/connecter"
    }

    useEffect(() => {
        redirectToLoginPage()
    }, []);

    return (
        <div>
            Home
        </div>
    )
}

export default Home