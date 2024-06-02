// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FUSIONBACKEND } from "@/app/constants/constant";

type TransactionData = {
  phoneNumber: string;
  password: string;
 
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { phoneNumber,password }: TransactionData = req.body;

    // Perform any necessary validation of transaction data here

    const result = await fetch(`${FUSIONBACKEND}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
    
        
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        password:password ,
        
      }),
    });

    if (!result.ok) {
      throw new Error("Failed to create transaction");
    }

    const data = await result.json();

    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}