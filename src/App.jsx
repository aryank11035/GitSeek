import { useEffect, useState } from "react"
import MainSection from "./Components/MainSection"
import { UserProvider } from "./Context/UserContext"
import { GradientBackground } from "./Components/animate-ui/backgrounds/gradient"
import Silk from "./Components/animate-ui/backgrounds/Silk"
export default function App(){

  

  return (
    <>
   
      <div className="fixed inset-0 z-0">
        <Silk
          speed={5}
          scale={0.5}
          color="#474747"
          noiseIntensity={1}
          rotation={0}
      />
      </div>
      {/* Header */}
      <header className="fixed w-full h-[68px]  z-50 flex items-center justify-center mt-2 px-1">
        <nav className="max-w-[1300px] w-full h-full flex items-center  justify-between text-white bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] px-4 rounded-xs md:text-2xl text-sm ">
            <a className=" l font-semibold cursor-pointer"><i className="fa-brands fa-github"></i> GitSeek</a>
            <a className="group cursor-pointer  flex items-center">
              <span className="relative md:text-sm text-xs">
                Source code
                
                <span className="absolute bottom-0 left-1/2 h-[2px] w-full bg-white scale-x-0 transform -translate-x-1/2 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </span>
            </a>
        </nav>
      </header>


      <UserProvider>
        {/* Main section  */}
        <MainSection />
      </UserProvider>
      
   
    </>
    
 
  ) 
}