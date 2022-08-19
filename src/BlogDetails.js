import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import useFetch from "./useFetch";


const BlogDetails = () => {
    const history = useHistory();
    //get params form the url
    const { id } = useParams()
    const { data: blog, error, isLoading } = useFetch('http://localhost:8000/blogs/'+id)

    //delete blog
    const handleDelete = (e)=>{
     fetch('http://localhost:8000/blogs/'+id, {
         method:'DELETE'
     }).then(()=>{
         console.log('successfully deleted')
         //redirect
         history.push('/')
     })
    }

    return (
        <div className='blog-details'>
            { isLoading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { blog && <article>
                <h2>{ blog.title }</h2>
                <p> Written by { blog.author} </p>
                <div> { blog.body }</div>
            </article>}
            <button onClick={handleDelete}>Delete Blog</button>
        </div>
    );
};

export default BlogDetails;
