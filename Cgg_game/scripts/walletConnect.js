async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert("MetaMask is not installed. Please install it to use this app.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected account:", accounts[0]);
    switchToFilecoinNetwork();
    updateWalletButton(accounts[0]);
  } catch (error) {
    console.error("User rejected the request.");
  }
}

async function switchToFilecoinNetwork() {
  const filecoinCalibrationNetwork = {
    chainId: "0x4cb2f", // Chain ID for Filecoin
    chainName: "Filecoin - Calibration",
    rpcUrls: ["https://rpc.ankr.com/filecoin_testnet"], // Public RPC URL for Filecoin
    nativeCurrency: {
      name: "tFIL",
      symbol: "tFIL",
      decimals: 18,
    },
    blockExplorerUrls: ["https://calibration.filfox.info/"],
  };

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [filecoinCalibrationNetwork],
    });
    console.log("Switched to Filecoin Calibration network");
  } catch (error) {
    console.error("Failed to switch to Filecoin Calibration network:", error);
  }
}

function updateWalletButton(account) {
  const walletButton = document.getElementById("walletButton");
  if (account) {
    walletButton.innerHTML = `${account}`;
  } else {
    walletButton.innerHTML = `<img src="assets/gui/achives.png" alt=""> connect wallet`;
  }
}

async function initialize() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        updateWalletButton(accounts[0]);
      } else {
        updateWalletButton(null);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }
}

// Call initialize function on page load
window.addEventListener("load", initialize);
