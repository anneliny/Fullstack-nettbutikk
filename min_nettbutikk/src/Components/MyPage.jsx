import React from "react";
import LoginSignup from "./LoginSignup";

function MyPage({setIsLoggedIn}){
    return (
        <>
        <LoginSignup setIsLoggedIn={setIsLoggedIn}/>
        </>
    )
}

export default MyPage;