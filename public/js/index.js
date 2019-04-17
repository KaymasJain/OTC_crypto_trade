var mainNetwork = false;
var account = false;
var networkId;

/**
 * get bool for ethereum main network
 */
async function getNetwork() {
    networkId = await web3.eth.net.getId();
    // if (networkId == 1) {
    //     return true;
    // }
    if (networkId == 3) {
        return true;
    }
    return false;
}

/**
 * get web3 account current address
 */
async function getAccount() {
    return (await web3.eth.getAccounts())[0];
}


/**
 * initializing web3 elements
 */
async function InitWeb3() {
    if (window.ethereum) { // Modern dapp browsers... 
        window.web3 = new Web3(ethereum);
        mainNetwork = await getNetwork();
        try {
            await ethereum.enable(); // Request account access if needed
            account = await getAccount();
        } catch (error) {
            navAlerts('User denied permission');
        }
        await web3Check();
        return true;
    } else if (window.web3) { // Legacy dapp browsers...
        window.web3 = new Web3(web3.currentProvider);
        mainNetwork = await getNetwork();
        account = await getAccount();
        await web3Check();
        return true;
    } else { // Non-dapp browsers...
        $('.networkName').html(`<button class="btn btn-danger animation-on-hover" type="button" onclick="navAlerts(1)">NO ETH PROVIDER</button>`);
        let link = `<button class="btn btn-info btn-simple animation-on-hover" type="button" onclick="navAlerts(0)">Create ID</button>`;
        $('.navUserAdd').html(link);
        ifWeb3NotConfigured();
    }
}


/**
 * starting up a dapp
 * initiated from asynced InitWeb3() function below
 */
// on load
 window.addEventListener('load', async () => {
    InitWeb3();
});


/**
 * run this asynced function to either comply with web3 configurations else show error messages
 */
async function web3Check() {
    $('.swapButClass').css('display', 'none');
    $('.descLineMargin').css('margin', 'auto');
    if (networkId == 1) {
        $('.networkName').html(`<button class="btn btn-success animation-on-hover" type="button" onclick='navAlerts(2)'>MAIN NETWORK</button>`);
    } else if (networkId == 3) {
        dataUrl = "/lister/coinsData?ropsten=true";
        $('.networkName').html(`<button class="btn btn-warning animation-on-hover" type="button" onclick='navAlerts(3)'>ROPSTEN TEST NETWORK</button>`);
    } else {
        $('.networkName').html(`<button class="btn btn-warning animation-on-hover" type="button" onclick='navAlerts(4)'>NOT MAIN NETWORK</button>`);
    }
    if (account) {
        let stringLen = account.length;
        let text = `${account.slice(0, 6)}...${account.slice(stringLen-4, stringLen)}`;
        $('.addressCon').text(text);
        if (networkId == 1) {
            let link = `<button class="btn btn-primary btn-simple animation-on-hover btn-sm" type="button">
                            <a class="navbar-brand" href="https://etherscan.io/address/${account}" target="_blank">${text}</a>
                        </button>`;
            $('.navUserAdd').html(link);
        } else if (networkId == 3) {
            let link = `<button class="btn btn-primary btn-simple animation-on-hover btn-sm" type="button">
                            <a class="navbar-brand" href="https://ropsten.etherscan.io/address/${account}" target="_blank">${text}</a>
                        </button>`;
            $('.navUserAdd').html(link);
        } else {
            let link = `<button class="btn btn-primary btn-simple animation-on-hover btn-sm" type="button">
                            <a class="navbar-brand">SHIFT TO MAIN NETWORK</a>
                        </button>`;
            $('.navUserAdd').html(link);
        }
    } else {
        let link = `<button class="btn btn-primary btn-simple animation-on-hover btn-sm" type="button">NOT LOGGED-IN</button>`;
        $('.navUserAdd').html(link);
    }
    ifWeb3Configured();
}