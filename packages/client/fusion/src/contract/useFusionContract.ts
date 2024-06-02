import { FUSIONCONTRACT } from "@/constants/constant";
import { CUSDCONTRACT } from "@/constants/constant";

import { useReadContract,useWriteContract } from "wagmi";

import FUSIONABI from "../abi/fusion.json"
import CUSDABI from "../abi/IERC20.json"
type hexstring ={
    address: `0x${string}`
}


export const useFusionContract = ()=>{

    //write contracts
    const {writeContractAsync:trade}  = useWriteContract();

    const createATrade = async(amount:bigint,sellerAddress:string,productNo:string)=>{
        const tx = await trade({
            abi:FUSIONABI,
            address:FUSIONCONTRACT,
            functionName:"createTradePayment",
            args:[amount,sellerAddress,productNo]
        })
        


    }

    const approve = async(amout:bigint)=>{
        const tx = await trade({
            abi:CUSDABI,
            address:CUSDCONTRACT,
            functionName:"approve",
            args:[FUSIONCONTRACT,amout]
        })
    }


    const transfer = async(amount:bigint,address:string)=>{
        const tx = await trade({
            abi:CUSDABI,
            address:CUSDCONTRACT,
            functionName:"transfer",
            args:[address,amount]
            })
    }



    const releasePaymentForTrade = async(productNo:string)=>{
        const tx = await trade({
            abi:FUSIONABI,
            address:FUSIONCONTRACT,
            functionName:"releasePaymentForTrade",
            args:[productNo]
        })

    }

    const raiseDisputeForTrade = async(productNo:string)=>{
        const tx = await trade({
            abi:FUSIONABI,
            address:FUSIONCONTRACT,
            functionName:"raiseDisputeForTrade",
            args:[productNo]
        })

    }


    //conflict resolution

    const returnTradeToseller = async(productNo:string,addressBuyer:hexstring)=>{
        const tx = await trade({
            abi:FUSIONABI,
            address:FUSIONCONTRACT,
            functionName:"raiseDisputeForTrade",
            args:[productNo,addressBuyer]
        })

    }

    const returnTradeToBuyer = async(productNo:string,addressBuyer:hexstring)=>{
        const tx = await trade({
            abi:FUSIONABI,
            address:FUSIONCONTRACT,
            functionName:"returnTradeToBuyer",
            args:[productNo,addressBuyer]
        })

    }

    const addDisputeResolver = async(mangerAddress:hexstring)=>{
        const tx = await trade({
            abi:FUSIONABI,
            address:FUSIONCONTRACT,
            functionName:"addDisputeResolver ",
            args:[mangerAddress]
        })

    }

    return{createATrade,releasePaymentForTrade,raiseDisputeForTrade,returnTradeToseller,returnTradeToBuyer,addDisputeResolver,approve,transfer}
}