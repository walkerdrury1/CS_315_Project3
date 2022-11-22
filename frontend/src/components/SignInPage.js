import React, { useState } from "react";
import Topbar from "./Topbar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { setPage } from "../actions";
import { connect } from "react-redux";

const SignInPage = (props) => {
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

    const submit = async () => {
        const x = await (
            await axios.post("https://tyson-express.onrender.com/validate", {
                username: username,
                password: password,
            })
        ).data;
        if (x.role === "None") {
            setError(true);
        } else if (x.role === "manager") {
            props.setPage("Inventory Page");
        }
        else if(x.role === "server"){
            props.setPage("Server Page")
        }
    };
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
                <button className='ui red button' onClick={submit}>
                    {" "}
                    Sign in
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        page: state.page,
    };
};

export default connect(mapStateToProps, {
    setPage: setPage,
})(SignInPage);