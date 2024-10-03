import React, {useState} from 'react';
import '../Css/LoginSignup.css'

function LoginSignup(){
    const [action, setAction] = useState('Lag bruker');

    return (
        <div className ='container'>
            <div className='header'>
                <div className='text'>{action}</div>
            </div>
        <div className='inputs'>
            {action ==="Logg inn"?<div></div>:
            <div className="input">
                <input type='text' placeholder='Navn' name="inputName"/>
            </div>}

            <div className="input">
                <input type='email' placeholder='E-post' name="inputEmail"/>
            </div>
            <div className="input">
                <input type='password' placeholder='Passord' name="inputPassword"/>
            </div>
        </div>
        {action ==="Lag bruker"?<div></div>:
        <div className="forgot-password">Glemt passord? <span>
            Klikk her</span></div>}
        
        <div className="submit-container">
            <div className={action === "Lag bruker"?"submit gray":"submit"} onClick={()=>{setAction("Lag bruker")}}>Lag bruker</div>
            <div className={action ==="Logg inn"?"submit gray":"submit"} onClick={()=>{setAction("Logg inn")}}>Logg inn</div>
        </div>
        </div>
    )
}

export default LoginSignup;