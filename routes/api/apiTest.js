const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// @route   GET api/api-test
// @desc    Test blockchain smart contract interaction
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Using BSC Testnet RPC provider (completely free and public)
    const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
    
    // Get current block number
    const blockNumber = await provider.getBlockNumber();
    
    // Get current gas price
    const gasPrice = await provider.getFeeData();
    
    // Get latest block information
    const latestBlock = await provider.getBlock(blockNumber);
    
    // Get network information
    const network = await provider.getNetwork();
    
    // Prepare response data
    const blockchainData = {
      network: {
        name: network.name,
        chainId: network.chainId.toString(),
        blockNumber: blockNumber.toString(),
        gasPrice: ethers.formatUnits(gasPrice.gasPrice, 'gwei') + ' gwei',
        blockHash: latestBlock.hash,
        blockTimestamp: new Date(Number(latestBlock.timestamp) * 1000).toISOString()
      },
      timestamp: new Date().toISOString()
    };
    
    // Log the result to console as required
    console.log('=== Blockchain API Test Result ===');
    console.log('Network Name:', network.name);
    console.log('Chain ID:', network.chainId);
    console.log('Current Block:', blockNumber);
    console.log('Block Hash:', latestBlock.hash);
    console.log('Gas Price:', ethers.formatUnits(gasPrice.gasPrice, 'gwei'), 'gwei');
    console.log('Block Timestamp:', new Date(Number(latestBlock.timestamp) * 1000).toISOString());
    console.log('Timestamp:', new Date().toISOString());
    console.log('================================');
    
    res.json({
      success: true,
      message: 'Blockchain data fetched successfully',
      data: blockchainData
    });
    
  } catch (error) {
    console.error('Blockchain API Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blockchain data',
      error: error.message
    });
  }
});

module.exports = router; 