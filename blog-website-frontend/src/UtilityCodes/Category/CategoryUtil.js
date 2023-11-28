import axios from 'axios';

const getAllCategoriesPromise = () => {
    return axios.get('http://localhost:8080/category/all');    
}

export default getAllCategoriesPromise;