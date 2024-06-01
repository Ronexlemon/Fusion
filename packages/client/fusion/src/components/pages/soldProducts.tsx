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
  

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function SoldProducts() {
  return (
    <main className="w-screen h-screen">
        <div className="h-full w-full"> 
        <ScrollArea className="h-full w-full ">
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
            
            <Button disabled={true}>Sold</Button>
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
