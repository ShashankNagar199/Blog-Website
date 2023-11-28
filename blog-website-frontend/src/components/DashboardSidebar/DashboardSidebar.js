import styles from './DashboardSidebar.module.css';
import { useNavigate } from 'react-router-dom';
import ViewProfileAndCreatePostCard from '../ViewProfileAndCreatePostCard/ViewProfileAndCreatePostCard';
import getAllCategoriesPromise from '../../UtilityCodes/Category/CategoryUtil';
import { getOthersPostPromise } from '../../UtilityCodes/User/UserUtility';

const DashboardSidebar = (props) => {

    const user = props.user;
    const navigate = useNavigate();
    
    const goToAllBlogs = () => {
        let promise = getAllCategoriesPromise();
        promise.then(response => {
            let categories = response.data;
            //console.log(categories);
            getOthersPostAndPNavigate(categories, user);
        })
        .catch(err =>{
            console.log(err);
        })
        // const path = '/blogs';
        // navigate(path);
    }

    const getOthersPostAndPNavigate = (categories, user) => {
        let p = getOthersPostPromise(user.id);
        p.then(response => {
            const path = '/blogs';
            const blogs = response.data;
            // console.log(blogs);
            navigate(path, {state: {categories: categories, blogs: blogs}});
        })
        .catch(err => {
            console.log(err);
        })
    }

    return <div className={styles.sideContent}>
        {/* <h1 className={`${styles['center']} ${styles['username']}`}>Hi user</h1>
        <div className={styles['center']}>
            <button onClick={goToProfilePage} className={styles['view-profile-btn']}>View Profile</button>
            <button onClick={goToCreatePostPage} className={styles['create-post-btn']}>Create Post</button>
        </div> */}

        <ViewProfileAndCreatePostCard user={user}/>

        {/*Added to get the horizontal rule between*/}
        <hr />

        <div className={styles['all-blogs-intro-card']}>
            <h1 className={styles['center']}>Don't feel like writing?</h1>
            <p>There are a lot of people like you who are posting amazing stuff out there!</p>
            <button onClick={goToAllBlogs} className={ `${styles['create-post-btn']} ${styles['width-100']}`}>Explore</button>
        </div>
    </div>
}

export default DashboardSidebar;