import React, { useState } from "react";

const  AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:(tokem)=>{}

});

export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(null);
    const userLoggedIn =!!token;
    const LoginHandler=(token)=>{
        setToken(token);

    };
    const logOutHandler=()=>{
        setToken(null);
    };
    const ContextValue={
        token:token,
        isLoggedIn :userLoggedIn,
        login:LoginHandler,
        logout:logOutHandler
        
    };


    return <AuthContext.Provider value={ContextValue}>{props.children}</AuthContext.Provider>

};
export default AuthContext;