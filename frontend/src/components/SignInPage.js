import React, { useState } from "react";
import Topbar from "./Topbar";
import TextField from "@mui/material/TextField";

const SignInPage = () => {
    let correct_username = "username";
    let correct_password = "password";

    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const displayError = () => {
        if (error) {
            return (
                <div className='to-center'>
                    <div className='error-message'>
                        *Incorrect Username or Password
                    </div>
                </div>
            );
        } else {
            return <br />;
        }
    };

    const submit = () => {
        if(username !== correct_username || password !== correct_password){
            setError(true)
        }
        else{
           console.log("signed in")
        }
    }
    return (
        <div>
            <Topbar />
            <br />
            <div className='to-center'>
                <h1>Sign in</h1>
            </div>
            <br />

            <div className='to-center'>
                <TextField
                    sx={{ width: "30%" }}
                    label='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <br />

            <div className='to-center'>
                <TextField
                    sx={{ width: "30%" }}
                    label='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {displayError()}
            <br />
            <div className='to-center'>
                <button className='ui red button' onClick={submit}> Sign in</button>
            </div>
        </div>
    );
};

export default SignInPage;
