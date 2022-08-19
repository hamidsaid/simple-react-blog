import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault()
        const newBlog = { title , author , body}

        setIsLoading(true)
       //insert to db
        fetch('http://localhost:8000/blogs', {
            method:'POST',
            headers:{ "Content-Type" : "application/json"},
            body:JSON.stringify(newBlog)
        }).then(()=>{
            console.log('New bog created')
            setIsLoading(false)
            //redirect user
            history.push('/')
        })
    }


    return (
        <div className='create'>
            <h1>Add a blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isLoading && <button>Add Blog</button>}
                { isLoading && <button>Adding blog...</button>}
            </form>
        </div>
    );
};

export default Create;
