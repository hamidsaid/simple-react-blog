import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {


    // const handleDelete = (id) => {
    //     const newBlogs = blogs.filter((blog) => blog.id !== id)
    //     setBlogs(newBlogs)
    // }

    //call the data blogs in this scope
    const { data: blogs, isLoading , error} = useFetch('http://localhost:8000/blogs')

    return (
        <div className="home">
            {isLoading && <div>Loading....</div>}
            { error && <div>{ error }</div>}
            {/*pass in the blogs as a prop to the BlogList component*/}
            { blogs && <BlogList blogs={blogs} title='All blogs'/>}
        </div>
    );
}

export default Home