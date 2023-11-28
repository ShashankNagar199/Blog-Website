import styles from './SimilarTopicPostItem.module.css';

const SimilarTopicPostItem = (props) => {
    const blog = props.blog;
    return <div>
        <h2 className={styles.blogTitle}>{blog.title}</h2>
        <hr className={styles['post-list-item-separator']}/>
    </div>
}

export default SimilarTopicPostItem;