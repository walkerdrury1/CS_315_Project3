import axios from "axios";

const items = async () => {
    const x = await axios.get("https://tyson-express.onrender.com/get-menuitems");
    console.log(x)
    return x
}
export default items
