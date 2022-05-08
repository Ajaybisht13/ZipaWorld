import axios from "axios";


export const addDatatoAsyncStorage = async() => {
     try {

        const data = await axios.post("https://coapi.zipaworld.com/api/auth/customer/guest");
        return data;
        // console.log(data);
         
     } catch (error) {
         console.log(error)
     }
}