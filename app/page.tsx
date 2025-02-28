import Image from "next/image";
import Addtask from "./component/Addtask";

export default function Home() {
  return (
    <>
    <div>

       <div className="flex text-black w-full h-56 justify-center items-center ">
       <Image
           src="/hexadeclogo.svg"
           alt="hexadeclogo"
           width={167}
           height={44}
           priority={true}
         />
         </div>

        <div>
         <Addtask />
        </div>






        </div>  
    </>
  );
}
