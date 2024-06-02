import React from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function  SupportPage(){
    const router = useRouter()

    return(
        <main className="w-screen h-screen">
        <div className=" w-full h-full bg-gray-400 relative">
            
            <div className="flex  absolute bottom-16 right-4 left-4 gap-4">
                <Input type="text" placeholder="just type your phone & productNumber"/>
                <Button variant="destructive">SEND</Button>
                <Button  onClick={()=> router.push("/")} variant="raise">BACK</Button>


            </div>


        </div>
        </main>
    )
}