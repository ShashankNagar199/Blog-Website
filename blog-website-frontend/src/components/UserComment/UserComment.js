import img from '../../images/userpic.jpg';
import styles from './UserComment.module.css';

const UserComment = (props) => {

    let comment = props.comment;
    let commentName = comment.user.username;
    let commentImg = comment.user.imageString;
    let commentContent = comment.commentContent;

    if (commentImg == null) commentImg = img;
    
    return <div className={styles['comment-container']}>
        <div className={styles['comment-person-container']}>
            <img src={commentImg} className={styles['comment-img']} alt=''/>
            <p className={styles['comment-username']}>{commentName}</p>
        </div>
        
        <p className={styles['comment-content']}>{commentContent}</p>
    </div>
}

export default UserComment;