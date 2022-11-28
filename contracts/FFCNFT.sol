// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "./ERC721A.sol";
import "hardhat/console.sol";

contract FFCNFT is Ownable, ERC721A, ReentrancyGuard {
  using SafeMath for uint256;

  uint256 public immutable maxPerAddressDuringMint;
  uint256 public freeMintStartTime;
  uint256 public whiteListMintStartTime;
  uint256 public whiteListMintEndTime;
  uint256[] public publicPrice = [0, 0.15 ether, 0.25 ether, 0.3 ether];
  uint256[] public publicSaleStartTime = [0, 0, 0, 0, 0 ,0];
  uint256[] public mintLimit = [50, 300, 500, 800];
  uint256[] public alreadyMint = [0, 0, 0, 0];
  mapping(address => uint256) public allowlist;
  mapping(address => uint256) public chargeAllowlist;
  string[32] public team = [ "Qatar", "Brazil", "Belgium", "France", "Argentina", "England", "Spain", "Portugal", "Mexico", "Netherlands", "Denmark", "Germany", "Uruguay", "Switzerland", "United States", "Croatia", "Senegal", "Iran", "Japan", "Morocco", "Serbia", "Poland", "South Korea", "Tunisia", "Cameroon", "Canada", "Ecuador", "Saudi Arabia", "Ghana", "Wales", "Costa Rica", "Australia"];
  uint256[32] public count;

  constructor(
    uint256 maxBatchSize_,
    uint256 collectionSize_,
    uint256 freeMintStartTime_, 
    uint256 whiteListMintStartTime_,
    uint256 whiteListMintEndTime_,
    uint256[] memory publicSaleStartTime_
  ) ERC721A("League of FFC Rights Card", "League of FFC Rights Card", maxBatchSize_,collectionSize_) {
    maxPerAddressDuringMint = maxBatchSize_;
    freeMintStartTime = freeMintStartTime_;
    whiteListMintStartTime = whiteListMintStartTime_;
    publicSaleStartTime = publicSaleStartTime_;
    whiteListMintEndTime = whiteListMintEndTime_;
  }

  modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  function getRound() public view returns(int256 round){
      round = -1;
      if(block.timestamp >= freeMintStartTime && block.timestamp < publicSaleStartTime[0]){
        round = 0;
      }
      if(block.timestamp >= publicSaleStartTime[0] && block.timestamp < publicSaleStartTime[1]){
        round = 1;
      }
      if(block.timestamp >= publicSaleStartTime[2] && block.timestamp < publicSaleStartTime[3]){
        round = 2;
      }
      if(block.timestamp >= publicSaleStartTime[4] && block.timestamp < publicSaleStartTime[5]){
        round = 3;
      }
  }

  function publicSaleMint(uint256 quantity, uint256 index)
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
    uint256 roundUint = uint256(round);
    require(roundUint >= 0, "Has not yet started");
    if(block.timestamp >= whiteListMintStartTime && block.timestamp < publicSaleStartTime[0]){
      require(chargeAllowlist[msg.sender] > 0, "not eligible for allowlist mint");
      chargeAllowlist[msg.sender] = chargeAllowlist[msg.sender].sub(quantity);
      require(alreadyMint[1] + quantity <= mintLimit[1], "The limit of this round has been reached");
      alreadyMint[1] =  alreadyMint[1] + quantity;
      count[index] = count[index] + quantity;
      _safeMint(msg.sender, quantity);
      refundIfOver(publicPrice[1] * quantity);
    }else{
        require(block.timestamp >= publicSaleStartTime[0], "Has not yet started");
        require(alreadyMint[roundUint] + quantity <= mintLimit[roundUint], "The limit of this round has been reached");
        alreadyMint[roundUint] =  alreadyMint[roundUint] + quantity;
        count[index] = count[index] + quantity;
        _safeMint(msg.sender, quantity);
        refundIfOver(publicPrice[roundUint] * quantity);
    }
  }

  function refundIfOver(uint256 price) private {
    require(msg.value >= price, "Need to send more ETH");
    if (msg.value > price) {
      payable(msg.sender).transfer(msg.value - price);
    }
  }

  function seedChargeAllowlist(address[] memory addresses, uint256[] memory numSlots)
    external
    onlyOwner
  {
    require(
      addresses.length == numSlots.length,
      "addresses does not match numSlots length"
    );
    for (uint256 i = 0; i < addresses.length; i++) {
      chargeAllowlist[addresses[i]] = numSlots[i];
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
    require(block.timestamp >=  freeMintStartTime && block.timestamp < whiteListMintEndTime, "mint has not started or has ended");
    require(allowlist[msg.sender] > 0, "not eligible for allowlist mint");
    require(totalSupply() + allowlist[msg.sender] <= collectionSize, "reached max supply");
    _safeMint(msg.sender, allowlist[msg.sender]);
    count[0] = count[0] +  allowlist[msg.sender];
    alreadyMint[0] =  alreadyMint[0] + allowlist[msg.sender];
    allowlist[msg.sender] = 0;
  }

  function _beforeTokenTransfers(
    address from,
    address to,
    uint256 startTokenId,
    uint256 quantity
  ) internal override {
    require(from == address(0) || block.timestamp > publicSaleStartTime[5], "transfers cannot be made until the end of all mint rounds");
    super._beforeTokenTransfers( from, to, startTokenId, quantity);
  }

  //metadata URI
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

  function setTime( uint256 freeMintStartTime_, uint256 whiteListMintStartTime_, uint256 whiteListMintEndTime_) public onlyOwner{
    freeMintStartTime = freeMintStartTime_;
    whiteListMintStartTime = whiteListMintStartTime_;
    whiteListMintEndTime = whiteListMintEndTime_;
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