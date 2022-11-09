import axios from "axios";

const items = async () => {
    const x = await axios.get("http://localhost:4000/get-menuitems");
    console.log(x)
}
export default items
