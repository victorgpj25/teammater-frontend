import styled from "styled-components"
import { BsXLg, BsArrowClockwise, BsController } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from  "react-loader-spinner"
import { useEffect, useState, useContext } from "react"

import AppContext from "../contexts/AppContext.js"
import TeammateData from "./Teammate.js"
import { teammatesRequest } from "../services/api"


export default function PlayerData () {

    const { config, loading, setLoading } = useContext(AppContext)

    const [ teammates, setTeammates ] = useState([])
    const [ picture, setPicture ] = useState("")
    const [ nickname, setNickname ] = useState("")
    const [ uName, setName ] = useState("")
    const [ description, setDescription ] = useState("")

    const navigate = useNavigate()

    useEffect(() => { 
        getTeammates()
	}, []);

    async function getTeammates () {
        setLoading(true)

        const response = await teammatesRequest(config)

        if (response.status === 200) {
            setTeammates(response.data)
            setLoading(false)
        } 

        if (response.status === 401) {
            setLoading(false)
            alert("Token de acesso falhou ou expirou, por favor faça login novamente")
            navigate("/")
        }

        if (response.status === 404) {
            alert("Houve um erro com o perfil do teammate, por favor tente mais tarde")
            setLoading(false)
        }

        if (response.status === 500) {
            setLoading(false)
            alert("Houve um erro com o sistema do site, por favor tente mais tarde")
        }
    }

    const displayTeammates = teammates.map( (teammateItem, index) => {
        return (
            <TeammateData key={index} nickname={teammateItem.nickname} name={teammateItem.name} description={teammateItem.teammate_description} picture={teammateItem.picture} setPicture={setPicture} setNickname={setNickname} setName={setName} setDescription={setDescription} />
        )
    })

    return (
        <Container>
            {loading ? 
                <h1><ThreeDots height="100" width="100" color='#02DE69' ariaLabel='loading' /></h1>
                : !teammates.length ? 
                <h1>Você ainda não tem teammates</h1> 
                :
                <ul>
                    {displayTeammates}
                </ul>
            }
            {picture ? 
                <section>
                    <div>
                        <img src={picture} alt="player picture"/>
                        <h2>{nickname}</h2>
                        {uName ? <h3>{uName}</h3> : null}
                    </div>
                    <p>{description}</p>
                </section>
                :
                null
            }
        </Container> 
    )
}

const Container = styled.div`
	width: 50vw;
    height: 90vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 8vh;
    background-color: #121212;
    border-radius: 1vw;

    section {
    width: 25vw;
    height: 90vh;
    position: relative;
    display: flex;
    flex-direction: column;
    }

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
    section img {
        width: 25vw;
        height: 25vw;
        object-fit: cover;
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
    p, ul {
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

    ul {
        width: 25vw;
        height: 90vh;
        padding: 0;
        border-right: 1px solid #6F6F6F;

        li:last-child {
            border: 0; 
        }
    }

    ul::-webkit-scrollbar {
        display: none;
    }

    h1 {
        font-size: 1.3vw;
        color: #FFFFFF;
        text-align: center;
        padding: 0 10vw;
        margin-top: 40vh;
        display: flex;
        justify-content: center;
    }


`;


