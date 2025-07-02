import axios from "axios";

const instance = axios.create({
    baseURL:"http://ec2-184-73-128-194.compute-1.amazonaws.com:8080"
})

export default instance;