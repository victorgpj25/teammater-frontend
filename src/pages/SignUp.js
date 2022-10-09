import styled from "styled-components"
import { Link } from "react-router-dom"

import SignUpForm from "../components/SignUpForm.js"
import { Header } from "../components/Header.js"

export default function SignUp () {
    return (
        <Container>
            <Header />
            <Logo>Team<span>Mater</span></Logo>
            <SignUpForm />
            <StyledLink to ="/">Já tem uma conta? Entre agora!</StyledLink>
        </Container>
    )
}

const Container = styled.div`
	width: 30vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const Logo = styled.h1`
    display: none;

    font-family: 'K2D';
    font-style: normal;
    font-weight: 700;
    font-size: 64px;
    line-height: 83px;
    color: #FFFFFF;

    span {
        color: #02DE69; 
    }

    @media (max-width: 900px) {
        display: inline
    }
`

const StyledLink = styled(Link)`
    font-family: 'K2D';
    font-style: normal;
    font-weight: 400;
    font-size: 1.3vw;
    line-height: auto;

    color: #FFFFFF;
`;