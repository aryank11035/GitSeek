import NodeSection from "./NodeSection";
import RepoSection from "./RepoSection";
import UsernameSection from "./UsernameSection";

export default function InputSection(){
    return(
        <>  
            <section className="w-full h-fit flex items-center justify-center z-50">
                <div className="max-w-[1300px] w-full 780:h-[500px] h-fit  p-4 border  border-[rgba(255,255,255,0.1)] rounded-xs mx-auto flex gap-4 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm 780:flex-row flex-col ">

                    {/* Div 1 */}
                    <div className="flex flex-col gap-4 w-full flex-1 ">

                        {/* Username Section */}
                        <UsernameSection /> 

                        {/* Repo Section */}
                        <RepoSection />
                    </div>

                    {/* Div 2 & Node section*/}
                    <NodeSection />

                </div>
            </section>
        </>
    )
}