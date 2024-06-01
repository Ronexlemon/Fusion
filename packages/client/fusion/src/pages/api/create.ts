// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FUSIONBACKEND } from "@/constants/constant";
// {product_name,product_description,amount,product_image}
export type ProductData = {
  product_name: string;
  product_description:string;
  amount:string;
  product_image:string;
  token:string
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

    const {product_name,product_description,amount,product_image,token}: ProductData = req.body;

    // Perform any necessary validation of transaction data here

    const result = await fetch(`${FUSIONBACKEND}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    
        
      },
      body: JSON.stringify({
        product_name: product_name,
        amount: amount,
        product_description: product_description,
        product_image:product_image
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