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
import { BuyProduct } from "@/config/ApiConfig"
import { useRouter } from "next/navigation";

import { useFusionContract } from "@/contract/useFusionContract"
import { etherUnits } from "viem"
import {ethers,parseEther} from "ethers"
import axios from 'axios';



export default function MarketPlace() {
    const {
        createATrade,approve        
      } = useFusionContract();
    const router = useRouter()
    const [phoneNumber,setPhoneNumber] =React.useState<string>("254700000011")    
    const { data: session } = useSession();
    const { address, isConnected } = useAccount();
    const [userData, setUserData] = React.useState(null);
    const token = session?.user.accessToken as unknown as string;
    const [userAddr,setUserAddress] = React.useState();

    //get phone number
    const handleLookup = async (phone?:string) => {
        console.log("user phone phone",phone)
        try {
            const res = await axios.get(`${FUSIONBACKEND}/auth/lookupquery`, {
                params: {
                    phoneNumber: phoneNumber
                }
            });
    
            const result = res.data[0];
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching user address:', error);
        }
    };
    
    const fetchUserAddress = async () => {
        try {
            
            
            const res = await fetch(`${FUSIONBACKEND}/auth/lookup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber:"+254700000011" }),
                credentials: "omit",
            });
            
            if (!res.ok) {
                throw new Error("Failed to fetch user address");
            }
            
            const result = await res.json();
            console.log(result);
            setUserData(result);
            return await res.json()

             // Save the result to the state
        } catch (error) {
            console.error("Can't load data", error);
        }
    };
        //   const { data:userAdd } = useQuery<string>({
        //     queryKey: ["pphone"],
        //     queryFn:fetchUserAddress,
        //      enabled: !!phoneNumber,
        //   });
      
        //   console.log("user address",userAdd)
          console.log("userData",userData)
         
      
    //fetch
    const getTotalTransaction = async () => {
        try{
            const res = await fetch(`${FUSIONBACKEND}/products/availableProducts`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                //   Authorization: `Bearer ${token}`,
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
        queryKey: ["marketing"],
        queryFn: getTotalTransaction,
        // enabled: !!token,
      });
    
      console.log("data data", data);
      //handle list
      const handleBuy = async (product_id: string, phone_Number: string, amount: string) => {
        setPhoneNumber(phone_Number);
        const getAdd = await handleLookup(phone_Number);
        console.log('getAddress', typeof(getAdd));
        try {
            if (!getAdd || getAdd === '') {
                console.log("No phone number provided or invalid address.");
                return;
            }
            console.log("Listing ......");
            const result = await BuyProduct({
                product_id: product_id,
                token: token
            });
            console.log("Transaction result status:", result?.status);
            if (result?.status === 200) {
                await approve(parseEther("4"));
                if (typeof getAdd === 'string') { // Ensure getAdd is a string
                    await createATrade(parseEther(amount), getAdd, product_id);
                }
                console.log(result);
            }
        } catch (error) {
            console.log("Transaction error", error);
        }
    };
    
  return (
    <main className="w-screen h-screen">
        <div className="h-full w-full"> 
        <ScrollArea className="h-full w-full relative ">
        <div className="flex -flex-col absolute bottom-0 right-4 left-4">
                        <div className="flex justify-between items-center w-full h-20">
                            <Button onClick={()=> router.push("/")}>Account</Button>
                            <Button className="bg-gray-300" onClick={()=> router.push("/market")}>Market</Button>
                            <Button   onClick={()=> router.push("/delivery")}>Delivery</Button>
                            <Button onClick={()=> router.push("/sold")}>Sold</Button>
                            <Button  onClick={()=> router.push("/unlisted")}>Unlisted</Button>

                        </div>

                        </div>
      <div className="w-full p-4 mt-16">
        
        {data?.map((item:FusionProduct,index:number) => (
          <>
            <Card key={item._id} className="gap-2 mb-4">
          <CardHeader>
            <CardTitle>{item.Product_name}</CardTitle>
            <CardDescription className="flex flex-col justify-between items-start">
                <div className="flex justify-between items-center w-full">
                    <span>description</span>
                    <span>{item.Product_description}</span>
                
                </div>
                <div  className="flex justify-between items-center w-full">
                <span>ID</span>
                <span>{item._id}</span>
                
                </div>
                <div  className="flex justify-between items-center w-full">
                <span>Price</span>
                <span>{item.amount}</span>
                
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
            
            <Button onClick={()=>handleBuy(item._id,item.seller_phonenumber,item.amount)}>Buy</Button>
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
