import InputSection from "./InputSection";
import { WritingText } from "./animate-ui/WritingText";
export default function MainSection(){
    return(
        <>
            <main className="w-full h-full flex flex-col items-center  text-white gap-12 mx-auto relative z-10 px-2 my-20 flex-grow">

                {/* Hero Section */}
                <section className="w-full h-fit flex items-center justify-center">
                    <div className=" max-w-[1300px] w-full h-fit  text-center flex flex-col justify-center items-center md:gap-6 gap-3 " >
                        {/* max-sm:text-[1rem] text-4xl 920:text-5xl 1100:text-6xl */}
                        <h1 className="md:text-6xl  text-4xl text-wrap font-bold ">
                            <WritingText    
                                text="The Easy way to visualize GitHub Repos" 
                                transition={{
                                    type : 'spring',
                                    bounce : 0 ,
                                    duration : 2,
                                    delay : 0.2
                                }}
                            />
                        </h1> 
                        <p className="max-sm:text-[0.85rem] text-[1rem] 920:text-xl 1100:text-2xl max-w-[1000px] w-full text-[#bdbdbd]  font-light">
                            <WritingText    
                                text=" Want to look at someone's GitHub repo? GitSeek makes it simple. Enter a username, select a repo and visualize it through tree structure." 
                                transition={{
                                    type : 'spring',
                                    bounce : 0 ,
                                    duration : 2,
                                    delay : 0.2
                                }}
                            />

                        
                        
                        </p> 
                    </div>

                </section>


                {/* Input secttion */}
                <InputSection />
                
            </main>
        </>
    )
}