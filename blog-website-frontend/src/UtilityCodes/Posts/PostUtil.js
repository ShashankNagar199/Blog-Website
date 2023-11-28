import axios from "axios";

const getAllPosts = () => {
    return axios.get('http://localhost:8080/posts/all');
}

export default getAllPosts;