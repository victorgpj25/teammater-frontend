import axios from "axios"

const { REACT_APP_API_URL } = process.env

export async function signInRequest(email, password) {
    const body = { email, password }
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/signin`, body)
        return response
    } catch (error) {
        return error.response
    }
}

export async function signUpRequest(nickname, name, picture, email, password, description, teammate_description) {
    const body = { nickname, name, picture, email, password, description, teammate_description }
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/signup`, body)
        return response
    } catch (error) {
        return error.response
    }
}

export async function playerDataRequest(config) {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/player`, config)
        return response
    } catch (error) {
        return error.response
    }
}

export async function teammatesRequest(config) {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/teammates`, config)
        return response
    } catch (error) {
        return error.response
    }
}

export async function getProfileDataRequest(config) {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/profile/data`, config)
        return response
    } catch (error) {
        return error.response
    }
}

export async function sendProfileDataRequest(config, nickname, name, picture, description, teammate_description) {
    const body = {picture, nickname, name, description, teammate_description}
    try {
        const response = await axios.put(`${REACT_APP_API_URL}/profile/edit`, body, config)
        return response
    } catch (error) {
        return error.response
    }
}

export async function askForTeammateRequest(config, playerId) {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/player/ask/${playerId}`, null, config)
        return response
    } catch (error) {
        return error.response
    }
}

export async function refuseTeammateRequest(config, playerId) {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/player/skip/${playerId}`, null, config)
        return response
    } catch (error) {
        return error.response
    }
}