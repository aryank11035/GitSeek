import { createContext, useState } from "react";

export const UserContext  = createContext();

export function UserProvider({children}){
    const [username,setUsername] = useState("");
    const [selectedRepo,setSelectedRepo] = useState(null);
    const [repoFiles,setRepoFiles] = useState([]);
    return(
        <>
            <UserContext.Provider value={{username,setUsername,selectedRepo,setSelectedRepo,repoFiles,setRepoFiles}}>
                {children}
            </UserContext.Provider>
        </>
    )
}