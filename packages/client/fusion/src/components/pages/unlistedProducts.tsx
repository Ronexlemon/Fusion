import * as React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Products } from "@/helpers/data";
import { ProductInterface } from "@/helpers/data";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { CreateProduct } from "@/config/ApiConfig";
import { useQuery } from "@tanstack/react-query";
import { FUSIONBACKEND } from "@/constants/constant";
import { FusionProduct } from "@/types/product";
import { ListProduct } from "@/config/ApiConfig";
import { useRouter } from "next/navigation";

export default function UnlistedProducts() {
    const router = useRouter()
    const { data: session } = useSession();
    const [open, setOpen] = React.useState<boolean>(false);
    const [productName, setProductName] = React.useState<string>("");
    const [productDescription, setProductDescription] = React.useState<string>("");
    const [productAmount, setProductAmount] = React.useState<string>("");
    const [productImage, setProductImage] = React.useState<string>("");
    const { address, isConnected } = useAccount();
    const token = session?.user.accessToken as unknown as string;

    // console.log("tokenis",token)
    // console.log("dtat",session?.user.userData.password)
    const handleCreate = async () => {
        try {
            console.log("creating ......");
            const result = await CreateProduct({
                product_name: productName,
                product_description: productDescription,
                amount: productAmount,
                product_image: productImage,
                token: token
            });
            console.log("Transaction result status:", result?.status);
            if (result?.status == 200) {
                console.log(result);
            }
        } catch (error) {
            console.log("transaction error", error);
        }
    };

    //handle list
    const handleList = async (product_id:string) => {
        try {
            console.log("Listing ......");
            const result = await ListProduct({
                product_id: product_id,                
                token: token
            });
            console.log("Transaction result status:", result?.status);
            if (result?.status == 200) {
                console.log(result);
            }
        } catch (error) {
            console.log("transaction error", error);
        }
    };


    

    //fetch
    const getTotalTransaction = async () => {
        try{
            const res = await fetch(`${FUSIONBACKEND}/products/userUnlistedProducts`, {
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
        queryKey: ["properties"],
        queryFn: getTotalTransaction,
        enabled: !!token,
      });
    
      console.log("data data", data);

    return (
        <div className="w-screen h-screen">
            <div className="h-full w-full">
                <ScrollArea className="h-full w-full relative">
                    <div className="flex -flex-col absolute bottom-16 mb-5 right-8">
                        <Button onClick={() => setOpen(true)} className="rounded-full w-20 h-20 text-center" variant="destructive">ADD</Button>
                        </div>
                        
                        <div className="flex -flex-col absolute bottom-0 right-4 left-4">
                        <div className="flex justify-between items-center w-full h-20">
                            <Button onClick={()=> router.push("/")}>Account</Button>
                            <Button onClick={()=> router.push("/market")}>Market</Button>
                            <Button onClick={()=> router.push("/delivery")}>Delivery</Button>
                            <Button onClick={()=> router.push("/sold")}>Sold</Button>
                            <Button className="bg-gray-300" onClick={()=> router.push("/unlisted")}>Unlisted</Button>

                        </div>

                        </div>
                    
                    <div className="flex justify-center items-center">
                        <AlertDialog open={open} onOpenChange={setOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>List Your Product</AlertDialogTitle>
                                    <Card className="border-none">
                                        <CardContent>
                                            <div className="space-y-1 flex flex-col items-start">
                                                <Label htmlFor="name">Product Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Toss"
                                                    value={productName}
                                                    onChange={(e) => setProductName(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1 flex flex-col items-start">
                                                <Label htmlFor="amount">Amount</Label>
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    placeholder="100"
                                                    value={productAmount}
                                                    onChange={(e) => setProductAmount(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1 flex flex-col items-start">
                                                <Label htmlFor="productImage">Product Image</Label>
                                                <Input
                                                    id="productImage"
                                                    type="text"
                                                    value={productImage}
                                                    onChange={(e) => setProductImage(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1 flex flex-col items-start">
                                                <Label htmlFor="description">Product Description</Label>
                                                <Input
                                                    id="description"
                                                    type="text"
                                                    placeholder="toss it"
                                                    value={productDescription}
                                                    onChange={(e) => setProductDescription(e.target.value)}
                                                />
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between items-center">
                                            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleCreate}>LIST</AlertDialogAction>
                                        </CardFooter>
                                    </Card>
                                </AlertDialogHeader>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className="w-full p-4 mt-16">
                        {data?.map((item:FusionProduct, index: number) => (
                            <Card key={item._id} className="gap-2 mb-4">
                                <CardHeader>
                                    <CardTitle>{item.Product_name}</CardTitle>
                                    <CardDescription className="flex flex-row justify-between items-start">
                                        <div>{item.Product_description}</div>
                                        <div>{item._id}</div>
                                        
                                        <div>  {item.amount}</div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
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
                                <Button onClick={()=>handleList(item._id)}>LIST</Button>
                                    <Badge variant="outline">{item.product_track}</Badge>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
