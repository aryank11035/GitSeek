import { useContext, useState,useEffect, use } from "react"
import { UserContext } from "../Context/UserContext"

export default function RepoSection(){

    const {username,setSelectedRepo} = useContext(UserContext);
    const [repos,setRepos] = useState([])
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null)
    
    useEffect(() => {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if(!username) return
        setLoading(true)
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization : `token ${token}`,
            },
        })
            .then(res => {
                if(!res.ok) throw new Error('failed to fetch repos')
                return res.json();
            })
            .then(data =>{
                setRepos(data)
                setError(null)
            })  
            .catch((err ) => setError(err.message))
            .finally(() => setLoading(false))
    },[username])


    return(
        <> 
            
                <div className="overflow-y-auto gap-0.5 flex flex-col w-full   border border-[rgba(255,255,255,0.1)] rounded-xs p-2 780:h-full h-[300px]">
                    
                    {repos.length === 0 ? (
                        <div className=" w-full h-full flex items-center justify-center text-xl font-bold text-[rgba(255,255,255,0.1)] text-wrap  flex-col gap-3 ">
                            <p>Enter a username</p>
                        </div> 
                    ) : 
                        loading ? (

                            <div className=" w-full h-full flex items-center justify-center text-xl font-bold text-[rgba(255,255,255,0.1)] text-wrap  flex-col gap-3 ">
                                <span className="loading loading-spinner loading-xs"></span>
                            </div>
                            
                        ) : (

                            repos.map((repo) => (
                                <button key={repo.id} className="group w-full py-3 border text-white border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)] hover:text-white duration-200 font-bold text-left px-4 flex justify-between items-center" onClick={() => setSelectedRepo(repo)}>
                                    <span>
                                        <i className="fa-solid fa-code-fork mr-2"></i> {repo.name}
                                    </span>
                                    <i className="fa-solid fa-arrow-right  group-hover:translate-x-1 "></i>
                                </button> 
                            ))
                        )
                    }

                    
                </div> 
           
        </>
    )
}