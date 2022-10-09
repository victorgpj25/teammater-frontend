import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { signUpRequest } from "../services/api"
import { ThreeDots } from  "react-loader-spinner"
import AppContext from "../contexts/AppContext.js"

export default function SignInForm () {

    const { loading, setLoading } = useContext(AppContext)
    const navigate = useNavigate()

    const [ nickname, setNickname ] = useState("")
    const [ uName, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ teammateDescription, setTeammateDescription ] = useState("")
    const [ message, setMessage ] = useState("")

    useEffect(() => { 
        setLoading(false)
	}, []);

    async function signIn (e) {
        e.preventDefault()
        setLoading(true)

        const response = await signUpRequest(nickname, uName, "https://i.imgur.com/t2m6dmF.jpg?fb", email, password, description, teammateDescription)

        if (response.status === 201) {
            setLoading(false)
            navigate("/")
        } 

        if (response.status === 409) {
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
                <label for="nickname">apelido:</label>
                <input disabled={loading} id="nickname" type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
                <label for="uname">nome (opcional):</label>
                <input disabled={loading} id="uname" type="text" value={uName} onChange={e => setName(e.target.value)} />
                <label for="email">email:</label>
                <input disabled={loading} id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label for="password">senha:</label>
                <input disabled={loading} id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <label for="description">apresentação:</label>
                <textarea disabled={loading} id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <label for="teammatedescription">mensagem para teammates:</label>
                <textarea disabled={loading} id="teammatedescription" type="text" value={teammateDescription} onChange={e => setTeammateDescription(e.target.value)} />
                <h2>este texto ficará disponível apenas para pessoas que você permitir, sugerimos adicionar um meio de contato, como o discord</h2>
                <h1>{message}</h1>
                <button type="submit" disabled={!(nickname && email && password && description && teammateDescription) || loading}>{loading ? <ThreeDots height="50" width="50" color='black' ariaLabel='loading' /> : "Cadastrar"}</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
	width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 10vh 0 2vh;

    form h1 {
        color: #fc2b43;
        font-weight: 400;
        font-size: 1.3vw;
        margin: 1vh 0;
    }
    form h2 {
        color: #AFAFAF;
        font-weight: 400;
        font-size: 1vw;
        text-align: center;
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

    form input, textarea {
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
    form input:disabled, textarea:disabled {
        opacity: 0.7
    }

    textarea {
        border-radius: 1vw;
        padding: 0.5vw 1vw;
        height: 8vh;
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
        scrollbar-width: none; /* for Firefox */
        overflow-y: scroll; 
    }
    textarea:nth-child(12) {
        margin-bottom: 0.2vw;
    }
    
    textarea::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
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