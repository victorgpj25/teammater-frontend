import styled from "styled-components"
import { BsXLg, BsArrowClockwise, BsController } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from  "react-loader-spinner"
import { useEffect, useState, useContext } from "react"

import AppContext from "../contexts/AppContext.js"
import { playerDataRequest, askForTeammateRequest, refuseTeammateRequest } from "../services/api"


export default function PlayerData () {

    const { config, loading, setLoading } = useContext(AppContext)

    const [ playerId, setPlayerId ] = useState("")
    const [ picture, setPicture ] = useState("")
    const [ nickname, setNickname ] = useState("")
    const [ uName, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ message, setMessage ] = useState("")

    const navigate = useNavigate()

    useEffect(() => { 
        getPlayerData()
	}, []);

    async function getPlayerData () {
        setLoading(true)

        const response = await playerDataRequest(config)

        if (response.status === 200) {
            setPlayerId(response.data.id)
            setPicture(response.data.picture)
            setNickname(response.data.nickname)
            setName(response.data.name)
            setDescription(response.data.description)
            setLoading(false)
        } 

        if (response.status === 401) {
            setLoading(false)
            alert("Token de acesso falhou ou expirou, por favor faça login novamente")
            navigate("/")
        }

        if (response.status === 404) {
            setMessage(response.data.ErrorMessage)
            setLoading(false)
        }

        if (response.status === 500) {
            setLoading(false)
            alert("Houve um erro com o sistema do site, por favor tente mais tarde")
        }
    }

    async function askForTeammate () {
        setLoading(true)

        const response = await askForTeammateRequest(config, playerId)

        if (response.status === 200) {
            setLoading(false)
            getPlayerData()
        } 

        if (response.status === 401) {
            setLoading(false)
            alert("Token de acesso falhou ou expirou, por favor faça login novamente")
            navigate("/")
        }

        if (response.status === 404) {
            alert("Houve um erro com o perfil procurado, tente novamente")
            setLoading(false)
        }

        if (response.status === 500) {
            setLoading(false)
            alert("Houve um erro com o sistema do site, por favor tente mais tarde")
        }
    }

    function skipTeammate () {
        getPlayerData()
    }

    async function refuseTeammate () {
        setLoading(true)

        const response = await refuseTeammateRequest(config, playerId)

        if (response.status === 200) {
            setLoading(false)
            getPlayerData()
        } 

        if (response.status === 401) {
            setLoading(false)
            alert("Token de acesso falhou ou expirou, por favor faça login novamente")
            navigate("/")
        }

        if (response.status === 404) {
            alert("a")
            setLoading(false)
        }

        if (response.status === 500) {
            setLoading(false)
            alert("Houve um erro com o sistema do site, por favor tente mais tarde")
        }
    }

    return (
        <Container>
            {loading ? 
                <h1><ThreeDots height="100" width="100" color='#02DE69' ariaLabel='loading' /></h1>
                :
                message ? 
                <h1>{message}</h1>
                :
                <>
                    <div>
                        <img src={picture} alt="player picture"/>
                        <h2>{nickname}</h2>
                        {uName ? <h3>{uName}</h3> : null}
                    </div>
                    <p>{description}</p>
                    <Buttons>
                        <button onClick={refuseTeammate}><BsXLg color="#fc2b43" /></button>
                        <button onClick={skipTeammate}><BsArrowClockwise  color="#6F6F6F" /></button>
                        <button onClick={askForTeammate}><BsController color="#02DE69" /></button>
                    </Buttons>
                </>

            }
            
        </Container> 
    )
}

const Container = styled.div`
	width: 25vw;
    height: 90vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 8vh;
    flex-direction: column;
    background-color: #121212;
    border-radius: 1vw;
    div::after {
        box-shadow: inset 0px -4vw 100px -20px #121212;
        content: '';
        display: block;
        height: 25vw;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
    }
    img {
        width: 25vw;
        height: 25vw;
        object-fit: cover;
        border-top-left-radius: 1vw;
        border-top-right-radius: 1vw;
        z-index: 0
        
    }
    h2, h3 {
        color: #FFFFFF;
        max-width: 20vw;
        position: absolute;
        font-weight: 700;
        top: 20vw;
        left: 2vw;
        z-index: 2;
        font-size: 2vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    h3 {
        top: 22.5vw;
        left: 2.5vw;
        font-size: 1.3vw;
    }
    p {
        font-size: 1.3vw;
        color: #FFFFFF;
        padding: 1vw;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
        overflow-y: scroll; 
    }

    p::-webkit-scrollbar {
        display: none;
    }

    h1 {
        font-size: 1.3vw;
        color: #FFFFFF;
        text-align: center;
        padding: 0 2vw;
        margin-top: 40vh;
        display: flex;
        justify-content: center;
    }


`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1vh 0;
    border-top: 1px solid #6F6F6F;

    button {
        background-color: #121212;
        border: 0;
        font-size: 2vw;
        cursor: pointer;
    }
`;



