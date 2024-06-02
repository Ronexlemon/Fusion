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
import { ConfirmReceivedProduct } from "@/config/ApiConfig"
import { useRouter } from "next/navigation";
import { useFusionContract } from "@/contract/useFusionContract"




export default function OndeliveryProducts() {
    const {createATrade,releasePaymentForTrade,raiseDisputeForTrade} =useFusionContract()
    const router = useRouter()
    const { data: session } = useSession();
    const { address, isConnected } = useAccount();
    const token = session?.user.accessToken as unknown as string;
    const getTotalTransaction = async () => {
        try{
            const res = await fetch(`${FUSIONBACKEND}/products/deliveryProducts`, {
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
        queryKey: ["delivery"],
        queryFn: getTotalTransaction,
         enabled: !!token,
      });
    
      console.log("data data", data);

      const handleRaiseIssue = async(product_id:string)=>{
        try{
         await raiseDisputeForTrade(product_id);

        }catch(error){
            console.log("can't load data",error)
        }
      }

      const handleConfirm = async (product_id:string) => {
        try {
            console.log("confirming ......");
            const result = await ConfirmReceivedProduct({
                product_id: product_id,                
                token: token
            });
            console.log("Transaction result status:", result?.status);
            if (result?.status == 200) {
                await releasePaymentForTrade(product_id)
                console.log(result);
            }
        } catch (error) {
            console.log("transaction error", error);
        }
    };
  return (
    <main className="w-screen h-screen">
        <div className="h-full w-full"> 
        <ScrollArea className="h-full w-full relative ">
        <div className="flex -flex-col absolute bottom-0 right-4 left-4">
                        <div className="flex justify-between items-center w-full h-20">
                            <Button onClick={()=> router.push("/")}>Account</Button>
                            <Button onClick={()=> router.push("/market")}>Market</Button>
                            <Button className="bg-gray-300"  onClick={()=> router.push("/delivery")}>Delivery</Button>
                            <Button onClick={()=> router.push("/sold")}>Sold</Button>
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
            
            <Button onClick={()=>handleConfirm(item._id)} variant="destructive">Confirm</Button>
            
            <Badge variant="outline">{item.product_track}</Badge>
            <Button  onClick={()=>handleRaiseIssue(item._id)} variant="raise">Dispute</Button>

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
