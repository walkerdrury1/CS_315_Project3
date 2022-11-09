/*const sides = [
    {
        name: "White Rice",
        img: "https://images.squarespace-cdn.com/content/v1/5ea3b22556f3d073f3d9cae4/1596800023719-VK8EJFM1E1B4VUZ5PQIQ/IMG_6839.jpeg"
    },
    {
        name: "Brown Rice",
        img: "https://cdn.loveandlemons.com/wp-content/uploads/2020/01/how-to-cook-brown-rice.jpg"
    },
    {
        name: "Chow Mein",
        img: "https://www.jocooks.com/wp-content/uploads/2019/03/chow-mein-1-1.jpg"
    },
    {
        name: "Fried Rice",
        img: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1.jpg"
    }
]


export default sides*/
import axios from "axios";

const sides = async () => {
    const x = await axios.get("https://tyson-express.onrender.com/get-sides");
    console.log(x)
}
export default sides