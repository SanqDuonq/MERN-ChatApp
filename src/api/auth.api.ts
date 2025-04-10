import { ISignUp } from "../interface/auth.interface";
import { APIConfig } from "./api.config"

export const checkAuthAPI = async () => {
    return await APIConfig.get('/api/auth/checkAuth');
}

export const signUpAPI = async ({data} : {data: ISignUp}) => {
    return await APIConfig.post('/api/auth/sign-up', data);
}