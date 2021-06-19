pragma solidity ^0.5.4;


contract Donate_coin{

    address public Address;
    address payable b;
    mapping (address => uint) totaldonations;
    
   
    function Details(address add,address payable add1)  payable external
    {
        require(add==msg.sender);
        Address=add;
        b=add1;
        b.transfer(msg.value);
        totaldonations[b]+=msg.value;
    }
    function Retrive(address payable add) public view returns(uint)
    {
        return totaldonations[add];
    }
    
}