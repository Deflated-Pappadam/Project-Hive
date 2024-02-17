// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Pappadam is ERC20 {
  uint256 price = 100 wei;

  constructor() ERC20("Pappadm Token", "PDM") {}

  function burn(uint256 amount) external {
    _burn(msg.sender, amount);
  }

  function buy() external payable {
    require(msg.value > 0, "You must send some ether");
    require(msg.value > 100, "min 100");
    _mint(msg.sender, msg.value / price);
  }
}