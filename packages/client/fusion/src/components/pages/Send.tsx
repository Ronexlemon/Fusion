import React, { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import axios from "axios";
import { FUSIONBACKEND } from "@/constants/constant";
import { useFusionContract } from "@/contract/useFusionContract"
import { ethers,parseEther } from "ethers";
  


export default function  SendPage(){
    const {transfer} = useFusionContract()
    const [amount,setAmount] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    
    const router = useRouter()
    const handleLookup = async (phone:string) => {
        console.log("user phone phone",phone)
        try {
            const res = await axios.get(`${FUSIONBACKEND}/auth/lookupquery`, {
                params: {
                    phoneNumber: phone
                }
            });
    
            const result = res.data[0];
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching user address:', error);
        }
    };

    
    const handleSend = async()=>{
        const getAdd = await handleLookup(`+${phoneNumber}`);
        console.log('getAddress', typeof(getAdd));
        try {
            if (!getAdd || getAdd === '') {
                console.log("No phone number provided or invalid address.");
                return;
            }
            if (!amount || amount === '') {
                console.log("No amount number provided or invalid address.");
                return;
            }
            if (!phoneNumber || phoneNumber === '') {
                console.log("No phone number provided or invalid address.");
                return;
            }

            await transfer(parseEther(amount),getAdd)
        
        
        }catch(error){

            }
    }

    return(
        <main className="w-screen h-screen relative">
        <div className=" w-full h-full flex justify-center items-center">
            
        <Card className="w-full m-4 h-68 md:h-1/2">
  <CardHeader>
    <CardTitle>Send Direct</CardTitle>
    <CardDescription>just input a phone number</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
    <Input onChange={(e)=>setPhoneNumber(e.target.value)} type="text"  placeholder="254701707773"/>
    <Input onChange={(e)=>setAmount(e.target.value)} type="text" placeholder="10" />
  </CardContent>
  <CardFooter>
    <Button onClick={handleSend} variant="destructive">SEND</Button>
  </CardFooter>
</Card>


        </div>
        <div className="flex -flex-col absolute bottom-0 right-4 left-4">
                        <div className="flex justify-between items-center w-full h-20">
                            <Button onClick={()=> router.push("/")}>Account</Button>
                            <Button onClick={()=> router.push("/market")}>Market</Button>
                            <Button onClick={()=> router.push("/delivery")}>Delivery</Button>
                            <Button  onClick={()=> router.push("/sold")}>Sold</Button>
                            <Button  className="bg-gray-300" onClick={()=> router.push("/send")}>Send</Button>


                        </div>

                        </div>
        </main>
    )
}