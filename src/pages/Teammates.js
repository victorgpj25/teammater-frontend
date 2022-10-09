import styled from "styled-components"
import { NavbarHeader } from "../components/Header.js"
import TeammatesData from "../components/TeammatesData.js"

export default function Mater () {
    return (
            <Container>
                <NavbarHeader />
                <TeammatesData />
            </Container> 
    )
}
const Container = styled.div`
	width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 4%;
`;