import axios from "axios";

const API =
"http://127.0.0.1:5000";

export const askQuestion =
(question) => {

    return axios.post(
        `${API}/api/chat`,
        { question }
    );
};

export const getSummary =
() => {

    return axios.get(
        `${API}/api/summary`
    );
};