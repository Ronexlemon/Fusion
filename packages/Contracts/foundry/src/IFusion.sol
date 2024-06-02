// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IFusion {
    //struct

    struct Trade{

        string tradeNumber;
        address  seller;
        address  buyer;
        uint256  amount;
        bool     isRelease;

        bool     isdispute;


    }

    

    //function make payment

    function createTradePayment(uint256 _amount,address _seller, string memory  _tradeNumber)external ;

    //function release payment

    function releasePaymentForTrade(string memory _tradeNumber)external ;



    //function raise dispute

    function raiseDisputeForTrade(string memory _tradeNumber)external;

    //admins resloving disputes


    function returnTradeToseller(string memory _tradeNumber,address _seller)external;

    function returnTradeToBuyer(string memory _tradeNumber, address _buyer)external;
    
}