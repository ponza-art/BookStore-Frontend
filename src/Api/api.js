import axios from "axios";
const api =axios.create({
    baseURL:"https://book-store-backend-azure-tau.vercel.app/users"
})

export const googleAuth =(code)=>api.get(`/google?code=${code}`) 