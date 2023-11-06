import React, { useState, createContext, ReactNode} from "react";
import { api } from "../services/api";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials:signInProps)=> Promise<void>
}
type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}
type AuthProviderProps ={
    children: ReactNode;
}
type signInProps = {
    email:string;
    password:string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

const [loadingAuth, setLoadingAuth] = useState(false)
const isAuthenticated = !!user.name;

async function signIn({email, password}:signInProps) {
   setLoadingAuth(true);

   try{
    const response = await api.post('/session',{
        email,
        password
    })

    console.log(response.data)
   }catch(err){
    console.log('erroa ao acessar', err)
    setLoadingAuth(false);
   }

}

    return (
        < AuthContext.Provider value={{ user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider >
    )
}7