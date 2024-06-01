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
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { useSession } from "next-auth/react";
  import { useAccount } from "wagmi";
  
  

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function UnlistedProducts() {
    const {data:session} = useSession();
    const [open,setOpen] = React.useState<boolean>(false)
    const [productName,setProductName]=React.useState<string>("");
    const [productDescription,setProductDescription]=React.useState<string>("");
    const [productAmount,setProductAmount]=React.useState<string>("");
    const [productImage,setProductImage]=React.useState<string>("");
    const { address, isConnected } = useAccount();
    const token = session?.user.accesstokens as unknown as string;
    console.log("tokn ssss",token)
    console.log("data",session?.user)

  return (
    <main className="w-screen h-screen">
        <div className="h-full w-full "> 
       
        <ScrollArea className="h-full w-full relative ">
        <div className="absolute bottom-4  right-8">
        <Button onClick={()=>setOpen(true)} className="rounded-full w-20 h-20 text-center"  variant="destructive">ADD</Button>
        </div>
            <div className="flex justify-center  items-center">

            <AlertDialog  open={open}>
      <AlertDialogTrigger asChild>
      {/* {product_name,product_description,amount,product_image} */}
       
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>List Your Product</AlertDialogTitle>
          <Card className="border-none">
            <CardContent>
            <div className="space-y-1 flex flex-col items-start">
              <Label  htmlFor="name">Product Name</Label>
              <Input id="name" type="number" placeholder="Toss" value={productName}
            onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className="space-y-1 flex flex-col items-start">
              <Label  htmlFor="name">Amount</Label>
              <Input id="name" type="number" placeholder="100" value={productAmount}
            onChange={(e) => setProductAmount(e.target.value)} />
            </div>
            <div className="space-y-1 flex flex-col items-start">
              <Label  htmlFor="name">Product Image</Label>
              <Input id="name" type="upload"  value={productImage}
            onChange={(e) => setProductImage(e.target.value)} />
            </div>
            <div className="space-y-1 flex flex-col items-start">
              <Label  htmlFor="name">Product Description</Label>
              <Input id="name" type="number" placeholder="toss it" value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)} />
            </div>
               
            </CardContent>
            <CardFooter className="flex justify-between items-center">
            <AlertDialogCancel  onClick={()=>setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction>LIST</AlertDialogAction>

            </CardFooter>
          </Card>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between items-center">
         
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


            </div>
      <div className="w-full p-4 mt-16">
        
        {Products.map((item:ProductInterface,index:number) => (
          <>
            <Card key={index} className="gap-2 mb-4">
          <CardHeader>
            <CardTitle>{item.Product_name}</CardTitle>
            <CardDescription className="flex flex-col justify-between items-start">
                <div>
                {item.product_description}
                </div>
                <div>
                {item.product_id}
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
            
            <Button>List</Button>
            <Badge variant="outline">{item.status}</Badge>

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
