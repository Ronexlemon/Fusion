// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./IFusion.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract FusionEscrow is  IFusion {

 address public token = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

 address[] public disputeManagers;


    //events
    event CreateTradePayment(address indexed  buyer,address indexed  seller,string  tradeNumber,uint256 amount);
    event ReleasePayement(address indexed  buyer,address indexed  seller,string  tradeNumber,uint256 amount);
     event RaiseTradeDispute(address indexed  buyer,address indexed  seller,string  tradeNumber,uint256 amount);
     event FixTradeDispute(address indexed  seller,address indexed  buyer,string  tradeNumber,uint256 amount);
     
    //mapping of user and trade

//mapping buyers address  and tradeNumber to trade
    mapping(address =>mapping(string => Trade) )public trade;
    mapping(address => bool)public isManager;
    constructor(){
        disputeManagers.push(msg.sender);
        isManager[msg.sender]= true;
    }
    //modifier

    modifier onlyDisputeManager(address _manager){
        require(isManager[_manager],"not manager");

        
        _;
    }

    function createTradePayment(uint256 _amount,address _seller, string memory  _tradeNumber)external {
        require(_amount >0 ,"zero Amount");
        require(IERC20(token).transferFrom(msg.sender,address(this),_amount),"failed to transfer");
        trade[msg.sender][_tradeNumber] = Trade({tradeNumber:_tradeNumber, seller:_seller,buyer:msg.sender,amount:_amount,isRelease:false,isdispute:false});
        emit  CreateTradePayment(msg.sender, _seller, _tradeNumber, _amount);

    }

    //function release payment

    function releasePaymentForTrade(string memory _tradeNumber)external{
        require(trade[msg.sender][_tradeNumber].buyer == msg.sender,"Wrong Trade Number");
         require(trade[msg.sender][_tradeNumber].isRelease == false,"Already released");

        Trade  storage trades = trade[msg.sender][_tradeNumber];

         require(IERC20(token).transfer(trades.seller,trades.amount),"failed to transfer");
         trades.isRelease =true;
         emit  ReleasePayement(trades.buyer, trades.seller,trades.tradeNumber, trades.amount);


    } 



    //function raise dispute

    function raiseDisputeForTrade(string memory _tradeNumber)external{
         require(trade[msg.sender][_tradeNumber].buyer == msg.sender,"Wrong Trade Number");
         require(trade[msg.sender][_tradeNumber].isRelease == false,"Already released");
         Trade  storage trades = trade[msg.sender][_tradeNumber];
         trades.isdispute = true;
          emit  RaiseTradeDispute(trades.buyer, trades.seller,trades.tradeNumber, trades.amount);
    }

    //admins resloving disputes


    function returnTradeToseller(string memory _tradeNumber,address _buyer)external onlyDisputeManager(msg.sender){
        Trade  storage trades = trade[_buyer][_tradeNumber];
        sendBackTradeAmount(trades.seller, trades.amount);
         emit FixTradeDispute(trades.seller,trades.buyer,trades.tradeNumber,trades.amount);

    }

    function returnTradeToBuyer(string memory _tradeNumber,address _buyer)external onlyDisputeManager(msg.sender){
         Trade  storage trades = trade[_buyer][_tradeNumber];
        sendBackTradeAmount(trades.buyer, trades.amount);
        emit FixTradeDispute(trades.seller,trades.buyer,trades.tradeNumber,trades.amount);
    }

    function sendBackTradeAmount(address _address,uint256 _amount)internal{
        require(IERC20(token).transfer(_address,_amount),"failed to transfer");
        
        
    }
    
    //add dispute resolvers

    function addDisputeResolver(address _disputemanager)public{
        disputeManagers.push(_disputemanager);
        isManager[_disputemanager] = true;
    }




}