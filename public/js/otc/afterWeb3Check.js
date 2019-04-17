function ifWeb3NotConfigured() {
    navAlerts(1);
}

function ifWeb3Configured() {
    if (networkId == 1) {
        navAlerts(2);
    } else if (networkId == 3) {
        navAlerts(3);
        mainContract = new web3.eth.Contract(mainABI, account);
        daiContract = new web3.eth.Contract(tokensAbi, account);
    } else {
        navAlerts(4);
    }
}

