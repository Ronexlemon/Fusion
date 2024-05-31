const {ContractKit, newKit} = require("@celo/contractkit")


const {ASv2,ALFAJORES_RPC} = require("../contractKit/contractkit")


const kit = await newKit(ALFAJORES_RPC)
  
const asv2 = new ASv2(kit)



const useSocialconnect=()=>{
    const mapPhoneNumber =async(userPhoneNumber,userAccount,timeAttestationWasVerified)=>{
        await asv2.registerAttestation(userPhoneNumber, userAccount, timeAttestationWasVerified)
    }

    const lookupForAddresses = async(userPhoneNumber)=>{
       address = await asv2.lookupAddresses(userPhoneNumber)
       return address;
    }

    return {mapPhoneNumber,lookupForAddresses}
}


module.exports ={useSocialconnect}


  
