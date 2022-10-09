import styled from "styled-components"
import { RiPencilFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from  "react-loader-spinner"
import { useEffect, useState, useContext } from "react"

import ProfilePic from "./ProfilePic.js"
import AppContext from "../contexts/AppContext.js"
import { getProfileDataRequest, sendProfileDataRequest, teammatesRequest } from "../services/api"


export default function PlayerData () {

    const { config, loading, setLoading } = useContext(AppContext)

    const [ picture, setPicture ] = useState("")
    const [ nickname, setNickname ] = useState("")
    const [ uName, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ teammateDescription, setTeammateDescription ] = useState("")
    const [ message, setMessage ] = useState("")
    const [ display, setDisplay ] = useState("none")
    const profilePics = [
        "https://i.imgur.com/t2m6dmF.jpg?fb", 
        "https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=640&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=672", "https://tiermaker.com/images/templates/6724731605904975.png", 
        "https://wallpaperaccess.com/full/6812099.jpg", 
        "https://wallpaperaccess.com/full/1097060.png", 
        "https://i.pinimg.com/564x/3a/94/7e/3a947e3937fba49ea905dfc411f10d81.jpg", 
        "https://i.pinimg.com/564x/c2/88/e7/c288e7f45162498971ee2e3bbe16b168.jpg", 
        "https://i.pinimg.com/564x/da/05/b3/da05b3f75f78445b5e63f1bf049cf823.jpg", 
        "https://i.pinimg.com/564x/26/41/69/2641696789dc1e585193e7577d18e460.jpg", 
        "https://i.pinimg.com/564x/a0/6c/d0/a06cd0b6b5e41ab467e5e2e71efda446.jpg", 
        "https://i.pinimg.com/564x/c8/b7/80/c8b780c61a4ab4a299c7541fc666deef.jpg", 
        "https://i.pinimg.com/564x/71/d5/5b/71d55ba1eb7c3d240acd03f2bef3dd60.jpg", 
        "https://i.pinimg.com/564x/25/85/9a/25859ab11e5cbcf8f0fb9253f67507f7.jpg", 
        "https://i.pinimg.com/564x/d9/50/06/d950069abbbdfd86c64cff75a188c44d.jpg", 
        "https://i.pinimg.com/564x/76/be/98/76be98bc52b9adf5f7b64cbfc5b8d873.jpg", 
        "https://i.pinimg.com/564x/ca/a6/28/caa6283ceefc113183760312d522de53.jpg", 
        "https://i.pinimg.com/564x/cd/60/2a/cd602ab937a669ea6581c67a2d6e7b5a.jpg", 
        "https://i.pinimg.com/564x/a5/a5/6d/a5a56d0ab77993b5c0b03fad67887b55.jpg"
    ]

    const navigate = useNavigate()

    useEffect(() => { 
        getProfileData()
	}, []);

    async function getProfileData () {
        setLoading(true)

        const response = await getProfileDataRequest(config)

        if (response.status === 200) {
            setPicture(response.data.picture)
            setNickname(response.data.nickname)
            setName(response.data.name)
            setDescription(response.data.description)
            setTeammateDescription(response.data.teammate_description)
            setLoading(false)
        } 

        if (response.status === 401) {
            setLoading(false)
            alert("Token de acesso falhou ou expirou, por favor faça login novamente")
            navigate("/")
        }

        if (response.status === 500) {
            setLoading(false)
            alert("Houve um erro com o sistema do site, por favor tente mais tarde")
        }
    }

    async function editProfile (e) {
        e.preventDefault()
        setLoading(true)

        const response = await sendProfileDataRequest(config, nickname, uName, picture, description, teammateDescription)

        if (response.status === 200) {
            setLoading(false)
            getProfileData()
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

    const displayProfilePics = profilePics.map( (picture, index) => {
        return (
            <ProfilePic key={index} src={picture} setPicture={setPicture} setDisplay={setDisplay} />
        )
    })


    return (
        <Container>
            {loading ? 
                <h5><ThreeDots height="100" width="100" color='#02DE69' ariaLabel='loading' /></h5>
                :
                <section>
                    <div onClick={() => setDisplay("flex")}>
                        <img src={picture} />
                        <StyledIcon />
                    </div>
                    <form onSubmit={editProfile}>
                        <label for="nickname">apelido:</label>
                        <input disabled={loading} id="nickname" type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
                        <label for="uname">nome (opcional):</label>
                        <input disabled={loading} id="uname" type="text" value={uName} onChange={e => setName(e.target.value)} />
                        <label for="description">apresentação:</label>
                        <textarea disabled={loading} id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        <label for="teammatedescription">mensagem para teammates:</label>
                        <textarea disabled={loading} id="teammatedescription" type="text" value={teammateDescription} onChange={e => setTeammateDescription(e.target.value)} />
                        <h2>este texto ficará disponível apenas para pessoas que você permitir, sugerimos adicionar um meio de contato, como o discord</h2>
                        <h1>{message}</h1>
                        <button type="submit" disabled={!(nickname && description && teammateDescription) || loading}>{loading ? <ThreeDots height="50" width="50" color='black' ariaLabel='loading' /> : "Salvar"}</button>
                    </form>
                </section>
            }
            <ImageSelector display={display}>
                <ul>
                    {displayProfilePics}
                </ul>
            </ImageSelector>
        </Container> 
    )
}

const Container = styled.div`
    display: flex;
    width: 70vw;
    flex-direction: row;
    margin-top: 15vh;

    section:first-child {
        display: flex;
        width: 100%
    }

    section > div {
        height: 10vw;
        position: relative;
        font-size: 4vw;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 2vw;

        z-index: 2;
    }
    section > div:hover img {
        opacity: 0.5;
        cursor: pointer;
    }

    img {
        width: 10vw;
        height: 10vw;
        object-fit: cover;
        border-radius: 1vw;
    }


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
        width: 70%;
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

    h5 {
        position: fixed;
        top: 45vh;
        left: 47.5vw;
    }

`;

const StyledIcon = styled(RiPencilFill)`
    z-index: 1;
    position: absolute;
    left: 0vw;
    top: 2vw;
    width: 10vw;
    height: 5vw;
    color: #FFFFFF;
    cursor: pointer;
`

const ImageSelector = styled.section`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100vw;
    height: 100vh;
    display: ${props => props.display};
    align-items: center;
    border: 1px solid red;
    background-color: rgba(0,0,0,0.7);

    ul {
        border-radius: 2vw;
        padding: 2vw;
        width: 80vw;
        height: 80vh;
        margin: 10vh 10vw;
        background-color: #0F0F0F;
        display: flex;
        flex-wrap: wrap;
    }

`
