import styled from "styled-components"

export default function TeammateData ({ nickname, name, description, picture, setPicture, setNickname, setName, setDescription }) {


    function selectTeammate () {
        setPicture(picture) 
        setNickname(nickname)
        setName(name) 
        setDescription(description)
    }

    return (
        <StyledLi onClick={selectTeammate}>
            <img src={picture} />
            <h4>{nickname}</h4>
        </StyledLi> 
    )
}

const StyledLi = styled.li`
	width: 25vw;
    height: auto;
    padding: 0.5vw;
    cursor: pointer;

    display: flex;
    align-items: center;

    border-bottom: 1px solid #6F6F6F;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
    overflow-y: scroll; 
        
    

    ::-webkit-scrollbar {
        display: none;
    }

    :last-child {
        border-bottom: 0;
    }

    > img {
        width: 3vw;
        height: 3vw;
        object-fit: cover;
        margin-right: 2vw;
        border-radius: 1vw;
    }

    h4 {
        color: #FFFFFF;
        max-width: 15vw;
        font-weight: 700;
        font-size: 1.5vw;
    }
`;



