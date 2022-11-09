/*const entrees = [
    {
        name: "Orange Chicken",
        img: "https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg",
        cost: 9.6,
    },
    {
        name: "Kung Pao Chicken",
        img: "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Kung-Pao-Chicken-11.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1610375147&s=8bb6d974ef2fcc7178911e8733d28d18",
        cost: 15.6,
    },
    {
        name: "Bejing Beef",
        img: "https://bakeitwithlove.com/wp-content/uploads/2017/07/Panda-Express-Beijing-Beef-lg-sq-1.jpg",
        cost: 19.6,
    },
    {
        name: "Teryaki Chicken",
        img: "https://club.cooking/wp-content/uploads/2019/09/Panda-Express-Teriyaki-Chicken-03-kvadrat.jpg",
        cost: 2.6,
    },
];

export default entrees;
*/
import axios from "axios";

const entrees = async () => {
    const x = await axios.get("https://tyson-express.onrender.com/get-entrees");
    console.log(x)
    return x;
}
export default entrees