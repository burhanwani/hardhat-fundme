// SPDX-License-Identifier: MIT
/*
Why we are using solidity 0.6.0 here ? 
 using Chainlink v0.4.0 package and it does not have MockV3Aggregator in v0.8 contracts and that's why you are getting the error that the MockV3Aggregator is not found. 
 If you want to use MockV3Aggregator in v0.8 then you need to upgrade your Chainlink packages to v0.4.2 by yarn add @chainlink/contracts@0.4.2 or simply changing the version 
 in your package.json and run yarn install. v0.4.2 contains MockV3Aggregator in v0.8 contracts
*/
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/tests/MockV3Aggregator.sol";