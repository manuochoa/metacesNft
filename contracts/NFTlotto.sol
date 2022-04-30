// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface ILotteryTracker {
    function updateAccount(address account, uint256 amount) external;
    function removeEntryFromWallet(address account, uint256 amount) external;
    function removeAccount(address account) external;
    function isActiveAccount(address account) external view returns(bool);
}

contract ACELotto is Ownable {   
   
    uint256 public roundNum;
    uint256 public totalPayout;
    uint256 public currentJackpot = 1 ether;
    
    IERC20 public paymentToken;
    IERC721Enumerable public acesNFT;
    
    struct Results {
        uint256 totalEntries;
        uint256 winningNumber;
        uint256 payout;
        uint256 endTime;
        address winningAddress;
    }

    mapping(uint256 => Results) public roundResults;

    event LotteryWon(address winner, uint256 amount);

    constructor(address _paymentToken, address _NFT){
        paymentToken = IERC20(_paymentToken);
        acesNFT = IERC721Enumerable(_NFT);
    }

    function updateToken(address _newToken) external onlyOwner {
        paymentToken = IERC20(_newToken);
    }

    function updateJackpot(uint256 _newJackpot) external onlyOwner {
        currentJackpot = _newJackpot;
    }

    function pickWinner() external onlyOwner {
        uint256 payout = currentJackpot;
        uint256 contractBalance = paymentToken.balanceOf(address(this));
        require(contractBalance >= payout, "Not enough funds to draw");

        uint256 roundEntries = acesNFT.totalSupply();
        uint256 winnerNum = (random() % roundEntries) + 1;
        address winnerAddress = acesNFT.ownerOf(winnerNum);

        roundResults[roundNum] = Results ({
            totalEntries: roundEntries,
            winningNumber: winnerNum,
            payout: payout,
            endTime: block.timestamp,
            winningAddress: winnerAddress 
        });

        totalPayout += payout;
        roundNum++;

        paymentToken.transfer(winnerAddress, payout);

        emit LotteryWon(winnerAddress, payout);
    }

    function userEntries(address account) public view returns (uint256) {
        return acesNFT.balanceOf(account);
    }

    function resultLog(uint256 startIndex, uint256 endIndex) external view returns(Results [] memory log){
        if (endIndex >= roundNum) {
            endIndex = roundNum - 1;
        }

        uint256 arrayLength = endIndex - startIndex + 1;
        uint256 currentIndex;
        log = new Results[](arrayLength);
   
        for (uint256 i = startIndex; i <= endIndex; i++) {
            log[currentIndex] = roundResults[startIndex + i];
            currentIndex++;
        }
    }

    function getEntries() public view returns (uint256) {
        return acesNFT.totalSupply();
    }

    function getUniqueUsers() public view returns (uint256 counter) {
        uint256 roundEntries = acesNFT.totalSupply();

        for(uint256 i=1; i <= roundEntries; i++){
            address user = acesNFT.ownerOf(i);
            if(i == acesNFT.tokenOfOwnerByIndex(user, 0)){
                counter++;
            }
        }
    }

    function getUniqueAddresses() public view returns (address [] memory addresses, uint256 [] memory entries) {
        uint256 roundEntries = acesNFT.totalSupply();
        uint256 arrayLength = getUniqueUsers();
        addresses = new address[](arrayLength);
        entries = new uint256[](arrayLength);
        uint256 currentIndex;
        for(uint256 i=1; i <= roundEntries; i++){
            address user = acesNFT.ownerOf(i);
            if(i == acesNFT.tokenOfOwnerByIndex(user, 0)){
                addresses[currentIndex] = user;
                entries[currentIndex] = userEntries(user);
                currentIndex++;
            }
        }
    }

    function random() internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        gasleft(),
                        msg.sender,
                        totalPayout
                    )
                )
            );
    }
}