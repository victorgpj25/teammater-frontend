import styled from "styled-components"
import { RiUserFollowLine, RiUserSearchLine, RiUserSettingsLine } from "react-icons/ri"
import { Link } from "react-router-dom"

export function Header () {
    return (
        <Container>
            <Logo>Team<span>Mater</span></Logo>
        </Container> 
    )
}

export function NavbarHeader () {
    return (
        <Container>
            <Logo>Team<span>Mater</span></Logo>
            <NavBar>
                <StyledLink to ="/teammates"><RiUserFollowLine /></StyledLink>
                <StyledLink to ="/procurar"><RiUserSearchLine /></StyledLink>
                <StyledLink to ="/perfil/editar"><RiUserSettingsLine /></StyledLink>
            </NavBar>
        </Container> 
    )
}

const Container = styled.div`
	width: 100vw;
    height: auto;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #0f0f0f;
    border-bottom: 1px solid #6F6F6F;
    z-index: 1;
`;

const Logo = styled.h1`
    font-family: 'K2D';
    font-style: normal;
    padding: 1vh 0 1vh 3vh;
    font-weight: 700;
    font-size: 2vw;
    color: #FFFFFF;

    span {
        color: #02DE69; 
    }
`

const NavBar = styled.div`
    width: 20vw;
    height: 100%;
    margin-right: 40vw;
    background-color: #121212;
    border: 1px solid #6F6F6F;
    border-radius: 2vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 2vw;
    height: 2vw;

    color: #02DE69;
`;