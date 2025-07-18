import axios from "axios";

const instance = axios.create({
    baseURL:`${window.location.origin}/vinterbash`
    // baseURL:"http://localhost:8000"
    // baseURL:"https://vinterbash.in/vinterbash/"
})

export default instance;
