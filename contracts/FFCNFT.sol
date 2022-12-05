// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "./ERC721A.sol";

contract FFCNFT is Ownable, ERC721A, ReentrancyGuard {
  using SafeMath for uint256;

  uint256 public immutable maxPerAddressDuringMint;
  uint256[] public publicPrice = [0, 0.15 ether, 0.15 ether, 0.25 ether, 0.3 ether];
  uint256[] public publicSaleStartTime = [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0];
  uint256[] public mintLimit = [50, 150, 150, 500, 800];
  uint256[] public alreadyMint = [0, 0, 0, 0, 0];
  mapping(address => uint256) public allowlist;
  mapping(address => uint256) public chargeAllowlist;
  string[32] public team = [ "Qatar", "Brazil", "Belgium", "France", "Argentina", "England", "Spain", "Portugal", "Mexico", "Netherlands", "Denmark", "Germany", "Uruguay", "Switzerland", "United States", "Croatia", "Senegal", "Iran", "Japan", "Morocco", "Serbia", "Poland", "South Korea", "Tunisia", "Cameroon", "Canada", "Ecuador", "Saudi Arabia", "Ghana", "Wales", "Costa Rica", "Australia"];
  uint256[32] public count;

  constructor(
    uint256 maxBatchSize_,
    uint256 collectionSize_,
    uint256[] memory publicSaleStartTime_
  ) ERC721A("League of FFC Rights Card", "League of FFC Rights Card", maxBatchSize_,collectionSize_) {
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
      if(block.timestamp >= publicSaleStartTime[4] && block.timestamp < publicSaleStartTime[5]){
        round = 2;
      }
      if(block.timestamp >= publicSaleStartTime[6] && block.timestamp < publicSaleStartTime[7]){
        round = 3;
      }
      if(block.timestamp >= publicSaleStartTime[8] && block.timestamp < publicSaleStartTime[9]){
        round = 4;
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
    require(block.timestamp >= publicSaleStartTime[4], "Has not yet started");
    require(alreadyMint[roundUint] + quantity <= mintLimit[roundUint], "The limit of this round has been reached");
    alreadyMint[roundUint] =  alreadyMint[roundUint] + quantity;
    count[index] = count[index] + quantity;
    _safeMint(msg.sender, quantity);
    refundIfOver(publicPrice[roundUint] * quantity);
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

  function allowlistMint(uint256 quantity, uint256 index) external payable callerIsUser {
    require(block.timestamp >=  publicSaleStartTime[0] && block.timestamp < publicSaleStartTime[1], "mint has not started or has ended");
    require(allowlist[msg.sender] > 0, "not eligible for allowlist mint");
    require(totalSupply() + quantity <= collectionSize, "reached max supply");
    require(alreadyMint[0] + quantity <= mintLimit[0], "The limit of this round has been reached");
    _safeMint(msg.sender, quantity);
    count[index] = count[index] +  quantity;
    alreadyMint[0] =  alreadyMint[0] + allowlist[msg.sender];
    allowlist[msg.sender] = allowlist[msg.sender].sub(quantity);
  }

  function allowChargelistMint(uint256 quantity, uint256 index) external payable callerIsUser {
    require(block.timestamp >=  publicSaleStartTime[2] && block.timestamp < publicSaleStartTime[3], "mint has not started or has ended");
    require(chargeAllowlist[msg.sender] > 0, "not eligible for allowlist mint");
    require(totalSupply() + quantity <= collectionSize, "reached max supply");
    require(alreadyMint[1] + quantity <= mintLimit[1], "The limit of this round has been reached");
    _safeMint(msg.sender, quantity);
    count[index] = count[index] +  quantity;
    alreadyMint[1] =  alreadyMint[1] + chargeAllowlist[msg.sender];
    chargeAllowlist[msg.sender] = chargeAllowlist[msg.sender].sub(quantity);
    refundIfOver(publicPrice[1] * quantity);
  }

  function _beforeTokenTransfers(
    address from,
    address to,
    uint256 startTokenId,
    uint256 quantity
  ) internal override {
    require(from == address(0) || block.timestamp > publicSaleStartTime[9], "transfers cannot be made until the end of all mint rounds");
    super._beforeTokenTransfers( from, to, startTokenId, quantity);
  }

  string private _baseTokenURI;

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function setBaseURI(string calldata baseURI) external onlyOwner {
    _baseTokenURI = baseURI;
  }

  function setPublicSaleStartTime(uint256[]  memory saleStartTime) public onlyOwner{
        require(saleStartTime.length == 10, 'Error saleStartTime');
        publicSaleStartTime = saleStartTime;
  }

  function setMintLimit(uint256[]  memory mintLimitArr) public onlyOwner{
        require(mintLimitArr.length == 5, 'Error saleStartTime');
        mintLimit = mintLimitArr;
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