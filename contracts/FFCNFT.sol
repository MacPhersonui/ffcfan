// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";
import "hardhat/console.sol";

contract FFCNFT is Ownable, ERC721A, ReentrancyGuard {
  uint256 public immutable maxPerAddressDuringMint;
  uint256[] public publicPrice = [0.15 ether, 0.25 ether, 0.3 ether];
  uint256[] public publicSaleStartTime = [0, 0, 0, 0, 0 ,0];
  uint256[] public mintLimit = [300, 500, 800];
  uint256[] public alreadyMint = [0, 0, 0];
  mapping(address => uint256) public allowlist;

  constructor(
    uint256 maxBatchSize_,
    uint256 collectionSize_,
    uint256[] memory publicSaleStartTime_
  ) ERC721A("FFCNFT", "FFCNFT", maxBatchSize_, collectionSize_) {
    maxPerAddressDuringMint = maxBatchSize_;
    publicSaleStartTime = publicSaleStartTime_;
  }

  modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  function getRound() public view returns(int256 round){
      round = -1;
      if(block.timestamp >= publicSaleStartTime[0] && block.timestamp < publicSaleStartTime[1]){
        round = 0;
      }
      if(block.timestamp >= publicSaleStartTime[2] && block.timestamp < publicSaleStartTime[3]){
        round = 1;
      }
      if(block.timestamp >= publicSaleStartTime[4] && block.timestamp < publicSaleStartTime[5]){
        round = 2;
      }
  }

  function publicSaleMint(uint256 quantity)
    external
    payable
    callerIsUser
  {
    require(totalSupply() + quantity <= collectionSize, "Reached max supply");
    require(
      numberMinted(msg.sender) + quantity <= maxPerAddressDuringMint,
      "Can not mint this many"
    );
    int round = getRound();
    require(round >= 0, "Has not yet started");
    uint256 roundUint = uint256(round);
    require(alreadyMint[roundUint] + quantity <= mintLimit[roundUint], "The limit of this round has been reached");
    alreadyMint[roundUint] =  alreadyMint[roundUint] + quantity;
    _safeMint(msg.sender, quantity);
    refundIfOver(publicPrice[roundUint] * quantity);
  }

  function refundIfOver(uint256 price) private {
    require(msg.value >= price, "Need to send more ETH");
    if (msg.value > price) {
      payable(msg.sender).transfer(msg.value - price);
    }
  }

  function seedAllowlist(address[] memory addresses, uint256[] memory numSlots)
    external
    onlyOwner
  {
    require(
      addresses.length == numSlots.length,
      "addresses does not match numSlots length"
    );
    for (uint256 i = 0; i < addresses.length; i++) {
      allowlist[addresses[i]] = numSlots[i];
    }
  }

  function allowlistMint() external payable callerIsUser {
    require(allowlist[msg.sender] > 0, "not eligible for allowlist mint");
    require(totalSupply() + 1 <= collectionSize, "reached max supply");
    _safeMint(msg.sender, allowlist[msg.sender]);
    allowlist[msg.sender] = 0;
  }

  // // metadata URI
  string private _baseTokenURI;

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function setBaseURI(string calldata baseURI) external onlyOwner {
    _baseTokenURI = baseURI;
  }

  function setPublicSaleStartTime(uint256[]  memory saleStartTime) public onlyOwner{
        require(saleStartTime.length == 6, 'Error saleStartTime');
        publicSaleStartTime = saleStartTime;
  }

  function withdrawMoney() external onlyOwner nonReentrant {
    (bool success, ) = msg.sender.call{value: address(this).balance}("");
    require(success, "Transfer failed.");
  }

  function setOwnersExplicit(uint256 quantity) external onlyOwner nonReentrant {
    _setOwnersExplicit(quantity);
  }

  function numberMinted(address owner) public view returns (uint256) {
    return _numberMinted(owner);
  }

  function getOwnershipData(uint256 tokenId)
    external
    view
    returns (TokenOwnership memory)
  {
    return ownershipOf(tokenId);
  }
}