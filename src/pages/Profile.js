import styled from "styled-components"
import { NavbarHeader } from "../components/Header.js"
import EditProfileForm from "../components/EditProfileForm.js"

export default function Mater () {
    return (
            <Container>
                <NavbarHeader />
                <EditProfileForm />
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