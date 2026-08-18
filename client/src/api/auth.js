import api from "./axios"



export const registerUser  = async (userData) =>{

    const response  =  await api.post("/register", userData);
    console.log(response.data)
    return response.data;
    
}


export const loginUser  = async (userData) =>{

    const response  =  await api.post("/login", userData);
    console.log(response.data)
    return response.data;
    
}

export const logoutUser = async () => {
    const response = await api.post("/logout");
    console.log(response.data);
    return response.data;
};