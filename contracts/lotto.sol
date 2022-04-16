// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract ACELotto {
   
    uint256 public currentJackpot;
    uint256 public roundEntries;
    uint256 public roundNum;
    uint256 public totalPayout;
    uint256 public ticketPrice = 250000 ether;
    uint256 public roundDuration = 3600;
    uint256 public startTime;

    IERC20 public acesToken;
    address public acesSwap;
    
    struct Results {
        uint256 totalEntries;
        uint256 winningNumber;
        uint256 payout;
        uint256 endTime;
        address winningAddress;
    }

    mapping(uint256 => Results) public roundResults;
    mapping(uint256 => address) public roundEntry;
    mapping(uint256 => mapping(address => uint256)) public entriesPerRound;
    mapping(address => uint256) public lastRoundEntered;
    mapping(address => uint256) public lastBalanceRecorded;

    event LotteryWon(address winner, uint256 amount);

    constructor(address _aces, address _swap){
        acesToken = IERC20(_aces);
        acesSwap = _swap;
    }

    function enterLotto() external {
        address _sender = msg.sender;
        uint256 userBalance = acesToken.balanceOf(_sender);
        uint256 entries = (userBalance - lastBalanceRecorded[_sender]) % ticketPrice;
        require(entries > 0, "Not enough $ACES to enter");

        roundEntry[roundEntries] = _sender;
        lastRoundEntered[_sender] = roundNum;       
        lastBalanceRecorded[_sender] = userBalance;
        entriesPerRound[roundNum][_sender] += entries;
        roundEntries += entries;
    }

    function swapAddEntry(address _user, uint256 _entries) external {
        require(msg.sender == acesSwap, "Only swap can call this function");

    }

    function addEntry (address _user, uint256 _entries) internal {


    }
}