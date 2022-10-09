import styled from "styled-components"

export default function ProfilePic ({src, setPicture, setDisplay}) {


    function setActualPicture () {
        setPicture(src) 
        setDisplay("none")
    }

    return (
        <Image src={src} onClick={setActualPicture} />
    )
}

const Image = styled.img`
    width: 10vw;
    height: 10vw;
    margin: 0 3vw 3vw 0;
    cursor: pointer;

    :nth-child(6n) {
        margin-right: 0;
    }

    :nth-last-child(-n+6) {
        margin-bottom: 0;
    }
`;