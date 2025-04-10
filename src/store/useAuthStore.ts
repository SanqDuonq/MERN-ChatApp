import {create} from 'zustand';
import { checkAuthAPI, signUpAPI } from '../api/auth.api';
import { ISignUp } from '../interface/auth.interface';
import { IResError } from '../interface/response-error';

interface AuthStore {
    authUser: null;
    isSigningUp: boolean;
    isSigningIn: boolean;
    isCheckAuth: boolean;
    errors: string
    checkAuth: () => Promise<void>;
    signUp: (data: ISignUp) => Promise<void>
  }

const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isCheckAuth: true,
    errors: '',

    checkAuth: async () => {
        try {
            const res = await checkAuthAPI();
            console.log(res.data)
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser: null})
        } finally {
            set({isCheckAuth: false})
        }
    },

    signUp: async (data: ISignUp) => {
        set({ isSigningUp: true });
        try {
            const res = await signUpAPI({ data });
            console.log(res.data);
            set({ authUser: res.data });
        } catch (error) {
            const errorRes = error as IResError;
            if (errorRes) {
                const apiError = errorRes.response.data.data;
                set({ errors: apiError });  
            }
            console.log('Error sign up', error);
        } finally {
            set({ isSigningUp: false });
        }
    }
    
}))

export default useAuthStore;