import { FUSIONCONTRACT } from "@/constants/constant";

import { useReadContract,useWriteContract } from "wagmi";

import FUSIONABI from "../abi/fusion.json"
type hexstring ={
    address: `0x${string}`
}


const useFusionContract = async()=>{

    //write contracts
    const {writeContractAsync:trade}  = useWriteContract();

    const createATrade = async(amount:bigint,sellerAddress:hexstring,productNo:string)=>{
        const tx = await trade({
            abi:FUSIONABI,
            address:FUSIONCONTRACT,
            functionName:"createTradePayment",
            args:[amount,sellerAddress,productNo]
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

    return{createATrade,releasePaymentForTrade,raiseDisputeForTrade,returnTradeToseller,returnTradeToBuyer,addDisputeResolver}
}