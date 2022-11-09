import axios from "axios";

const processTransaction = async (cost, items) => {
    const x = await axios.post("https://tyson-express.onrender.com/process-transaction", {cost: cost, items: items});
    console.log(x);
}

export default processTransaction;