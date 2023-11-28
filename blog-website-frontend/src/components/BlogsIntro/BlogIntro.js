import styles from './BlogIntro.module.css';

const BlogIntro = (props) => {
    
    const blog = props.blog;
    //const user = props.user;

    const titleOfBlog = blog.title;
    const contentOfBlog = blog.body.substring(0, 250) + "...";
    const goToBlog = () => {
        // const path = '/blog';
        // //props.getBlog(blog);
        // navigate(path, {state: {blog}});
        props.showBlogPage(blog);
    }

    return <div onClick={goToBlog}>
        <h3 className={styles['blog-intro-heading']}>{titleOfBlog}</h3>
        <p className={styles['blog-intro-para']}>{contentOfBlog}</p>
        <p onClick={goToBlog} className={styles['blog-intro-see-more']}>See More</p>
    </div>
}

export default BlogIntro;