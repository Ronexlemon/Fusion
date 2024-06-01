"use client"
import React,{useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { UserSignUp } from "@/config/ApiConfig"
import { useRouter } from "next/router";
import {useAccount} from "wagmi"


export function AuthPage() {
  const account = useAccount();
  
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleRegister = async() => {
    // Do something with the form data
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    try{
      const res = await UserSignUp({phoneNumber:phoneNumber,password:password});
      if (res?.status === 200) {
        // Navigate to homepage
        router.push("/");
      }


    }catch(error){
      console.log("resgister error",error)

    }

    // Reset the form fields
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="bg-black  w-full h-screen flex justify-center items-center">
        <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 bg-gray-700">
        <TabsTrigger value="login">LOGIN</TabsTrigger>
        <TabsTrigger value="signup">SIGNUP</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Have an account give it a shot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Phone Number</Label>
              <Input id="name" type="number" placeholder="0701707772" value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="username" type="text"  placeholder="JohnDoe@#"  value={password}
            onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Change your password here. After saving,  be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="name">Phone Number</Label>
              <Input id="name" type="number" placeholder="0701707772"  value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="username" type="text"  placeholder="JohnDoe@#"  value={password}
            onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Confirm</Label>
              <Input id="username" type="text"  placeholder="JohnDoe@#" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleRegister}>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

    </main>
    
  )
}
