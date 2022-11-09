import axios from "axios";

const extras = async () => {
    const x = await axios.get("https://tyson-express.onrender.com/get-extras");
    console.log(x)
    return x;
}
export default extras