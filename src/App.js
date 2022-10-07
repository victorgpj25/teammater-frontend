import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"

import GlobalStyle from "./styles/globalStyles.js"
import AppContext from "./context/AppContext.js"

import SignIn from "./pages/SignIn.js"
import SignUp from "./pages/SignUp.js"
import Mater from "./pages/Mater.js"
import Teammates from "./pages/Teammates.js"
import Profile from "./pages/Profile.js"

export default function App () {
    const [ config, setConfig ] = useState({headers: {Authorization: `Bearer ${localStorage.getItem("config")}`}} || "")
    const [ loading, setLoading ] = useState(false)

    return (
        <AppContext.Provider value={{ config, setConfig, loading, setLoading}}>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/jogar" element={<Mater />} />
                    <Route path="/teammates" element={<Teammates />} />
                    <Route path="/perfil/editar" element={<Profile />} />
                </Routes>
        </AppContext.Provider>
    )
}