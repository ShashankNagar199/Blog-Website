import styles from './ViewProfileAndCreatePostCard.module.css';
import { useNavigate } from 'react-router-dom';
import getAllCategoriesPromise from '../../UtilityCodes/Category/CategoryUtil';
import getUserPostsPromise from '../../UtilityCodes/User/UserUtility';

const ViewProfileAndCreateCard = (props) => {

    const user = props.user;

    let username = (user == null) ? '' : user.username;

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

    const goToProfilePage = () => {
        let promise = getUserPostsPromise(user.id);
        promise.then( response => {
            //console.log(response.data);
            const path = '/profile';
            navigate(path, {state: {
                blogs: response.data
            }});
        }).catch(err => {
            console.log(err);
        });
    }

    return <>
        <h1 className={`${styles['center']} ${styles['username']}`}>Hi {username}</h1>
        <div className={styles['center']}>
            <button onClick={goToProfilePage} className={styles['view-profile-btn']}>View Profile</button>
            <button onClick={goToCreatePostPage} className={styles['create-post-btn']}>Create Post</button>
        </div>
    </>
}

export default ViewProfileAndCreateCard;