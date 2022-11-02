import axios from "axios";

export default axios.create({
    baseURL: 'https://world.openfoodfacts.org/',
});