import axios from "axios";

const login = async (username, password) => {
    const x = await axios.post("https://tyson-express.onrender.com/validate", {username: username, password: password});
    console.log(x);
    return x;
}

export default login;