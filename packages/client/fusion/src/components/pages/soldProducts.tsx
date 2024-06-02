"use client"
import * as React from "react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "../ui/label"
  import { Input } from "../ui/input"
  import { Button } from "../ui/button"
  import { Products } from "@/helpers/data"
  import { ProductInterface } from "@/helpers/data"
  import { useQuery } from "@tanstack/react-query";
  import { useSession } from "next-auth/react";
  import { FUSIONBACKEND } from "@/constants/constant";
  import { useAccount } from "wagmi";
  import { FusionProduct } from "@/types/product"
  import { useRouter } from "next/navigation";
  



export default function SoldProducts() {
    const router = useRouter()
    const { data: session } = useSession();
    
    const { address, isConnected } = useAccount();
    const token = session?.user.accessToken as unknown as string;

    const getTotalTransaction = async () => {
        try{
            const res = await fetch(`${FUSIONBACKEND}/products/allConfirmedProducts`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                credentials: "omit",
              });
              if (!res.ok) {
                throw new Error("Failed to fetch properties");
              }
              return res.json();

        }catch(error){
            console.log("can't load data",error)

        }
        
      };
    


      const { data, error, isLoading } = useQuery<FusionProduct[]>({
        queryKey: ["sold"],
        queryFn: getTotalTransaction,
         enabled: !!token,
      });
    
      console.log("data data", data);
  return (
    <main className="w-screen h-screen">
        <div className="h-full w-full"> 
        <ScrollArea className="h-full w-full relative ">
        <div className="flex -flex-col absolute bottom-0 right-4 left-4">
                        <div className="flex justify-between items-center w-full h-20">
                            <Button onClick={()=> router.push("/")}>Account</Button>
                            <Button onClick={()=> router.push("/market")}>Market</Button>
                            <Button onClick={()=> router.push("/delivery")}>Delivery</Button>
                            <Button className="bg-gray-300" onClick={()=> router.push("/sold")}>Sold</Button>
                            <Button onClick={()=> router.push("/unlisted")}>Unlist</Button>
                            <Button  onClick={()=> router.push("/send")}>Send</Button>


                        </div>

                        </div>
      <div className="w-full p-4 mt-16">
        
        {data?.map((item:FusionProduct,index:number) => (
          <>
            <Card key={item._id} className="gap-2 mb-4">
          <CardHeader>
            <CardTitle>{item.Product_name}</CardTitle>
            <CardDescription className="flex flex-col justify-between items-start">
                <div>
                {item.Product_description}
                </div>
                <div>
                {item._id}
                </div>
                <div>
                {item.amount}
                </div>
             
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1 ">
            <Image
                                        className="block h-1/2 w-auto sm:block lg:block"
                                        src="/logo.svg"
                                        width="24"
                                        height="24"
                                        alt="Celo Logo"
                                    />
            </div>
           
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            
            <Button disabled={true}>Sold</Button>
            <Badge variant="outline">{item.product_track}</Badge>

          </CardFooter>
        </Card>
          </>
        ))}
      </div>
    </ScrollArea>
            
        </div>

    </main>
    
  )
}
