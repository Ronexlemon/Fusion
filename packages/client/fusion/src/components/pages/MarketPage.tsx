import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
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
  

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function MarketPlace() {
  return (
    <main className="w-screen h-screen">
        <div className="h-full w-full"> 
        <ScrollArea className="h-full w-full ">
      <div className="w-full p-4">
        
        {tags.map((tag) => (
          <>
            <Card className="gap-2 mb-4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Have an account give it a shot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Phone Number</Label>
              <Input id="name" type="number" placeholder="0701707772" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="username" type="text"  placeholder="JohnDoe@#" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
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
