import NextAuth from "next-auth";
import { JwtPayload } from "next-auth/jwt";
declare module "next-auth"{
    interface Session{
        user: {
          userData:{
            _id: string;
            password: string;
            phoneNumber: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
          }      
          accessToken: string;
          iat: number;
          exp: number;
          jti: string;

          },
         
            
          
        }
    }


    // Define the interface for the token obtained from getToken
export interface TokenPayload extends JwtPayload {
  
    userData:{
      _id: string;
      password: string;
      phoneNumber: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }      
    
      accessToken: string;

    
    iat: number;
    exp: number;
    jti: string;

    
   
      
    
  
}