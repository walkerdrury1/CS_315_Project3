import axios from "axios"
const inventoryItems = async() => {
    const x = await axios.get("https://tyson-express.onrender.com/get-inventory");
    return x.data;
}

export default inventoryItems;