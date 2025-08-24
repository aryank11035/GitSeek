    import { useContext, useState,useRef } from "react"
    import { UserContext } from "../Context/UserContext"

    export default function UsernameSection(){

        const   {username,setUsername} = useContext(UserContext);
        const usernameRef = useRef('')
        const handleClick = (e) => {
            e.preventDefault()
           setUsername(usernameRef.current.value)
        }
        return(
            <>
                <div className="w-full h-fit flex flex-col text-white">
                            
                    <h1 className="text-lg font-bold mb-4 ">Enter a username to access repositories</h1>
                    <form className="flex w-full max-w-[600px] gap-4" onSubmit={handleClick}>
                        <label htmlFor="username" className="flex-2">
                            <input 
                                ref={usernameRef}
                                type="text" 
                                id="username" 
                                name="username"
                                placeholder="Enter a GitHub username" 
                                autoComplete="off"
                                className=" border border-[rgba(255,255,255,0.1)] px-4 py-2 w-full  rounded-xs outline-none text-white  "
                               
                                />
                        </label>
                        <button  type="submit" className=" text-[#474747] bg-[#f4f4f4] border hover:text-[#f4f4f4] hover:bg-[#474747] hover:border-[rgba(255,255,255,0.1)]r px-4 py-2   font-bold rounded-xs duration-200 cursor-pointer" >
                            <i className="fa-solid fa-magnifying-glass text-sm mr-2"></i>Search
                        </button>
                    </form> 
                </div>
            
            </>
        )
    }