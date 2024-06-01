
import { signIn } from "next-auth/react";
import { transactionType } from "viem";



export type dataSignInUser = {
  phoneNumber: string;
  password: string;
};

export type RegisterUser = {
  phoneNumber: string;
  password: string;
  address :`0x${string}` | undefined
};

export type Transaction ={
  transanctiontype:string,
  amount:string,
  month:number,
  token:any
}


export const SignInUserr = async (userDetails: dataSignInUser) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        phoneNumber: userDetails.phoneNumber,
        password: userDetails.password,
      });
      return res;
    } catch (error) {
      console.log("failed to signinUser", error);
    }
  };


  export const CreateTransaction = async (transactionDetails: Transaction) => {
    try {
      const res = await fetch("api/cashout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           transactionType:transactionDetails.transanctiontype,
           amount: transactionDetails.amount,
           month:transactionDetails.month,
           token:transactionDetails.token
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };


  export const UserSignUp = async (userDetails: RegisterUser) => {
    try {
      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: userDetails.phoneNumber,
          password: userDetails.password,
          address: userDetails.address
      
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };