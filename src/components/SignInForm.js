import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { signInRequest } from "../services/api"
import { ThreeDots } from  "react-loader-spinner"
import AppContext from "../contexts/AppContext.js"

export default function SignInForm () {

    const { setConfig, loading, setLoading } = useContext(AppContext)
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ message, setMessage ] = useState("")


    useEffect(() => { 
        setLoading(false)
	}, []);

    async function signIn (e) {
        e.preventDefault()
        setLoading(true)

        const response = await signInRequest(email, password)

        if (response.status === 200) {
            localStorage.setItem("config", response.data)
            setLoading(false)
            setConfig({headers: {Authorization: `Bearer ${response.data}`}})
            navigate("/procurar")
        } 

        if (response.status === 401) {
            setLoading(false)
            setMessage(response.data.ErrorMessage)
        }

        if (response.status === 422) {
            setLoading(false)
            setMessage(response.data.ErrorMessage.substring(response.data.ErrorMessage.indexOf(':') + 2))
        }

        if (response.status === 500) {
            setLoading(false)
            alert("Houve um erro com o sistema do site, por favor tente mais tarde")
        }
    }

    return (
        <Container>
            <form onSubmit={signIn}>
                <label for="email">email:</label>
                <input disabled={loading} id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label for="password">senha:</label>
                <input disabled={loading} id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <h1>{message}</h1>
                <button type="submit" disabled={!(email && password) || loading}>{loading ? <ThreeDots height="50" width="50" color='black' ariaLabel='loading' /> : "Entrar"}</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
	width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 30vh 0 2vh;

    h1 {
        color: #fc2b43;
        font-weight: 400;
        font-size: 1.3vw;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form label {
        width: 100%;
        color: #FFFFFF;
        font-weight: 400;
        font-size: 1.3vw;
        padding-left: 1vw;
        font-weight: 400;
    }

    form input {
        width: 100%;
        height: 5vh;
        padding: 0 1vw 0 1vw;
        margin: 1vh 0 2vh;
        display: flex;
        align-items: center;
        border: 0.5px solid #6F6F6F;
        border-radius: 5vw;
        font-weight: 400;
        font-size: 1.1vw;
        color: #FFFFFF;
        background: #121212;
    }
    form input:disabled {
        opacity: 0.7
    }

    form button {
        width: 80%;
        height: 4.5vh;
        background: #02DE69;
        border-radius: 20px;
        border: 0;
        margin-top: 2vh;
        font-weight: 700;
        font-size: 1.5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.04em;
        text-decoration: none;
        color: #0F0F0F;
        cursor: pointer;
    }
    form button:disabled {
        opacity: 0.7;
        cursor: inherit;
    }
`;