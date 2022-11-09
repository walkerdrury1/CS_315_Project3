import axios from "axios";

const items = () => {
    const x = axios.get("https://tyson-express.onrender.com/get-menuitems");
    return x.data
}
export default items
