import axios from "axios";

const instance = axios.create({
    baseURL:`${window.location.origin}/vinterbash`
})

export default instance;
