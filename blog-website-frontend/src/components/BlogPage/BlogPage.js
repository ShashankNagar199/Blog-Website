import Blog from "../Blog/Blog";
import SimilarTopics from "../SimilarTopics/SimilarTopics";
import ViewProfileAndCreatePostCard from "../ViewProfileAndCreatePostCard/ViewProfileAndCreatePostCard";
import styles from './BlogPage.module.css';
import { Navigate } from 'react-router-dom';

const BlogPage = (props) => {

    const user = props.currentUser;
    //const navigate = useNavigate();

    if (user === null || user === undefined)
        return <Navigate replace to="/login" />

    return <div className={styles['blog-page-content']}>
        <Blog user={user}/>
        <div className={styles['side-content']}>
            <ViewProfileAndCreatePostCard user={user} />
            <hr className={styles['sidebar-split']} />
            <div className={styles['similar-topics-div']}>
                <SimilarTopics />
            </div>
        </div>
    </div>
}

export default BlogPage;