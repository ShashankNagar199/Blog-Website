import SimilarTopicPostItem from "../SimilarTopicPostItem/SimilarTopicPostItem";
import styles from './SimilarTopics.module.css';
import { useNavigate, useLocation } from "react-router-dom";

const SimilarTopics = () => {

    const location = useLocation();

    const similarBlogs = location.state.similarBlogs;
    console.log(similarBlogs);

    const navigate = useNavigate();
    const goToAllBlog = () => {
        navigate('/blogs');
    }

    return <div className={styles['similar-topic-container']}>
        {/* Display the section only when there are similar posts to the category*/}
        {/* The similarBlogs if is of length 0 no blogs would be rendered and also 
        the heading won't be rendered too because of below line*/}
        {similarBlogs.length !== 0 && <h2 className={styles['similar-topics-heading']}>Similar Topics</h2>}

        {/* Not rendered if length is 0 as map never executes */}
        {similarBlogs.map(blog => {
            return <SimilarTopicPostItem key={blog.id} blog={blog}/>
        })}

        <button onClick={goToAllBlog} className={styles['explore-more-btn']}>Explore More</button>
    </div>
}

export default SimilarTopics;