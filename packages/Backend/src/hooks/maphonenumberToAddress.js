const { ContractKit, newKit } = require("@celo/contractkit");
const { ASv2, ALFAJORES_RPC } = require("../contractKit/contractkit");

const useSocialConnect = async () => {
  const kit = await newKit(ALFAJORES_RPC);
  const asv2 = new ASv2(kit);

  /**
   * Map a phone number to a user account
   * @param {string} userPhoneNumber - The user's phone number
   * @param {string} userAccount - The user's account
   * @param {number} timeAttestationWasVerified - The time the attestation was verified
   */
  const mapPhoneNumber = async (userPhoneNumber, userAccount, timeAttestationWasVerified) => {
    try {
      const result = await asv2.registerAttestation(userPhoneNumber, userAccount, timeAttestationWasVerified);
      return result;
      
    } catch (error) {
      console.error("Error registering attestation:", error);
    
    }
  };

  /**
   * Look up addresses associated with a phone number
   * @param {string} userPhoneNumber - The user's phone number
   * @returns {Promise<string[]>} - The addresses associated with the phone number
   */
  const lookupForAddresses = async (userPhoneNumber) => {
    try {
      const address = await asv2.lookupAddresses(userPhoneNumber);
      return address;
    } catch (error) {
      console.error("Error looking up addresses:", error);
      return null;
    }
  };

  return { mapPhoneNumber, lookupForAddresses };
};

module.exports = { useSocialConnect };
