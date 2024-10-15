import React from "react";
import {useNavigate} from 'react-router-dom';
import '../Css/MyPageLoggedIn.css';

function MyPageLoggedIn ({setIsLoggedIn}){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userEmail');

        setIsLoggedIn(false);

        navigate('/min-side');

        console.log('Logget ut');
    }
return (
    <>
    <div className="myPage-container">
    <div className="myPage-content">
    </div>
    <button className="myPage-btn" onClick={handleLogout}>Logg ut</button>
    </div>
    </>
)
}

export default MyPageLoggedIn;