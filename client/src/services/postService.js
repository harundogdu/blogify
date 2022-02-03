import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_URL;

export const postService = async (url) => {
    const { data } = await axios.get((baseUrl + url), {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data;
}