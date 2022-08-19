import {useState, useEffect} from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    //for data fetch errors
    const [error, setError] = useState(null)

    useEffect(() => {

        //for aborting the fetch when useFetch unmounts
        const abortController = new AbortController()
            //associate the controller with the web request
        fetch(url,{signal: abortController.signal})
            .then((res) => {
                if (!res.ok) {
                    throw Error("Failed to fetch resources")
                }
                return res.json()
            })
            .then((data) => {
                setData(data)
                setIsLoading(false)
                //reset
                setError(null)
            })
            .catch((err) => {
                //abort only when the error is abort
                if(err.name === 'AbortError'){
                    //don't update the state
                    //just log
                    console.log('fetch aborted')
                }else{
                    setError(err.message)
                    setIsLoading(false)
                }

            })

        //return this clean up fn to avoid fetching when the component using this unmounts
        return ()=> abortController.abort()
        //add url as a dependency,i.e rerun the func useFetch whenever the url(state) changes
    }, [url])

    //return data properties
    return { data, isLoading, error}
}

export default useFetch