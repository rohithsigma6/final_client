import axios from 'axios'
export const Currentuser = async () => {
    try {
        console.log(localStorage.getItem("token"))
        const resposne = await axios.get("http://localhost:8289/v1/getuserdetails",{
            headers:{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(resposne)
        return resposne;
    }
    catch (err) {
        console.log("error")
        return err
    }
} 