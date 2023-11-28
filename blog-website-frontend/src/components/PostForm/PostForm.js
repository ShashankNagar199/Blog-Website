import styles from './PostForm.module.css';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostForm = () => {

    const location = useLocation();
    // const categories = location.state.categories;
    //const categories = [];
    //console.log(location.state);
    console.log(location.pathname);
    const categories = (location != null && location.state != null) ? location.state.categories : [];
    const user = (location != null && location.state != null) ? location.state.user : null;
    const blog = location.state.blog;

    const givenTitle =  (blog != null) ? blog.title : '';
    const givenBody = (blog != null) ? blog.body : '';
    const givenDescription = (blog != null) ? blog.description : '';
    const givenImage = (blog != null) ? blog.imageString : '';
    const givenCategory = (blog != null) ? blog.category.categoryName : categories[0];

    console.log(categories);
    console.log(blog);
    //console.log(user);
    const [title, setTitle] = useState(givenTitle);
    const [description, setDescription] = useState(givenDescription);
    const [body, setBody] = useState(givenBody);
    const [category, setCategory] = useState(givenCategory);
    //const [categories, setCategories] = useState([]);

    const [noTitle, setNoTitle] = useState('');
    const [noBody, setNoBody] = useState('');
    const [noDescription, setNoDescription] = useState('');

    const [blogPic, setBlogPic] = useState(givenImage);
    const navigate = useNavigate();
    if (user == null || user === undefined) {
        return <Navigate replace to="/login" />
    }

    //let blogPic = null;

    let h1HeaderString = (blog == null) ? "Create a new Post" : "Edit the post";

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const bodyChangeHandler = (event) => {
        setBody(event.target.value);
    }

    const categoryChangeHandler = (event) => {
        setCategory(event.target.value);
    }

    const selectFileHandler = (event) => {
        readFileDataAsBase64(event).then(val => {
            setBlogPic(val);
        }).catch(err => {
            setBlogPic('');
        })
    }

    function readFileDataAsBase64(e) {
        const file = e.target.files[0];

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }

    const editExistingPostHandler = () => {
        axios.put(`http://localhost:8080/posts/edit/${blog.id}`,  {
            title: title,
            description: description,
            body: body,
            category: category,
            image: blogPic
        })
        .then(response => {
            if (response.data === "success")
                navigate(-1);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log(title, description, category, body, blogPic);

        let doNotProceed = false;

        if (title.trim() === "") {
            setNoTitle('Please Enter a Title');
            doNotProceed = true;
        } else {
            setNoTitle('');
        }

        if (description.trim() === "") {
            setNoDescription('Please Enter a Description');
            doNotProceed = true;
        } else {
            setNoDescription('');
        }

        if (body.trim() === "") {
            setNoBody('Please Enter a Body');
            doNotProceed = true;
        } else {
            setNoBody('');
        }

        if (doNotProceed) return;

        if (location.pathname === "/edit") {
            editExistingPostHandler();
            return;
        }

        const fd = new FormData();
        fd.append("title", title);
        fd.append("description", description);
        fd.append("body", body);
        fd.append("cat", category);
        fd.append("postingUserID", user.id);
        fd.append("imageString", blogPic);

        axios.post('http://localhost:8080/posts/add-post', fd)
            .then(response => {
                console.log(response);
                if (response.data === "success") {
                    //Todo create navigate code wihich deletes it frmo history              
                    navigate(-1);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return <div className={styles.postPage}>
        <h1>{h1HeaderString}</h1>
        <form className={styles['post-form']} onSubmit={formSubmitHandler}>
            <label>Title <span className={styles['invalid-input']}>{noTitle}</span> </label> <br />
            <input onChange={titleChangeHandler} type="text" name="title" id="title" value={title} /> <br />

            <label>Description <span className={styles['invalid-input']}>{noDescription}</span></label> <br />
            <textarea onChange={descriptionChangeHandler} id="description" name="description" rows="4" cols="50" value={description}></textarea> <br />

            <label>Body <span className={styles['invalid-input']}>{noBody}</span></label> <br />
            <textarea onChange={bodyChangeHandler} id="body" name="body" rows="10" cols="50" value={body}></textarea> <br />
            <label>Category</label>
            <select name="category" id="category" onChange={categoryChangeHandler} value={category}>

                {categories.map(category => {
                    return <option key={category} id={category} name={category}>{category}</option>
                })}

                {/* <option id='science' name="science">Science</option>
                <option id='programming' name="programming">Programming</option>
                <option id='technology' name="technology">Technology</option>
                <option id='college' name="college">College</option> */}
            </select> <br />
            <label>Image</label> <br />
            <input type="file" id="image" name="image" onChange={selectFileHandler} accept="image/png, image/jpeg" /> <br />
            <img src={blogPic} alt="" />
            <button type='submit'>Post for review</button> <br />
        </form>
    </div>
}

export default PostForm;