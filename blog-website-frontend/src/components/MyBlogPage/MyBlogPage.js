import styles from './MyBlogPage.module.css';
import { useNavigate } from 'react-router-dom';
import getAllCategoriesPromise from '../../UtilityCodes/Category/CategoryUtil';
import Blog from '../Blog/Blog';
const MyBlogPage = (props) => {

    const user = props.user;
    const navigate = useNavigate();
    const goToCreatePostPage = () => {
        let promise = getAllCategoriesPromise();
        promise.then(response => {
            let categories = response.data;
            console.log(categories);
            const path = '/new-post';
            navigate(path, {state: {categories: categories, user: user}});
        })
        .catch(err =>{
            console.log(err);
        })    
    }

    return <div className={styles['my-blog-page-container']}>
        <div className={styles['width-70']}>
            <Blog />
        </div>
        <div className={styles['width-30']}>
            <button onClick={goToCreatePostPage} className={styles['create-post-btn']}>New Post</button>
            <button className={styles['edit-post-btn']}>Edit Post</button>
        </div>    
    </div>
}

export default MyBlogPage;