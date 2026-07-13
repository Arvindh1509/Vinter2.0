import axios from "axios";

const instance = axios.create({
    // baseURL:`${window.location.origin}/vinterbash`
    baseURL:"http://localhost:8000"
    // baseURL:"https://vinter2-0.onrender.com/"
    // baseURL:"http://vinterbash-alb-1429442373.us-east-1.elb.amazonaws.com/"
    
})

export default instance;
