function swapETHtoDAI(ethQty) {
    navAlerts(5);
    mainContract.methods.swapETHToDAI().send({
        from: account,
        value: ethQty
    })
    .on('transactionHash', (txHash) => {
        alertvar = txHash;
        navAlerts(6);
        console.log(`txHash: ${txHash}`);
    })
    .on('error', (err) => {
        alertVar = err
        navAlerts(7);
        console.error(err);
    });
}


function swapDAItoETH(daiQty) {
    navAlerts(5);
    mainContract.methods.swapDAIToETH(daiQty).send({
        from: account,
        value: 0
    })
    .on('transactionHash', (txHash) => {
        alertvar = txHash;
        navAlerts(6);
        console.log(`txHash: ${txHash}`);
    })
    .on('error', (err) => {
        alertVar = err;
        navAlerts(7);
        console.error(err);
    });
}

async function ETHToDAIRate() {
    return await mainContract.methods.ethToDaiRate().call();
}

async function ETHHead() {
    return await mainContract.methods.ETHHead().call();
}

async function DAIHead() {
    return await mainContract.methods.DAIHead().call();
}

async function ETHTail() {
    return await mainContract.methods.ETHTail().call();
}

async function DAITail() {
    return await mainContract.methods.DAITail().call();
}

async function ETHOrders(orderID) {
    return await mainContract.methods.ETHOrders(orderID).call();
}

async function DAIOrders(orderID) {
    return await mainContract.methods.DAIOrders(orderID).call();
}

async function ETHTotal() {
    return await mainContract.methods.ETHTotal().call();
}

async function DAITotal() {
    return await mainContract.methods.DAITotal().call();
}

// get user allowance
async function getAllowance() {
    return await daiContract.methods.allowance(account, mainContractAdd).call();
}

// get user allowance
async function getDAIBal() {
    return await daiContract.methods.balanceOf(account).call();
}

// get user approval
function setDAIAllowance() {
    navAlerts(8);
    var allowanceAmt = 1000000000000; // 1 trillion
    allowanceAmt = web3.utils.toWei(allowanceAmt.toString(), 'ether'); // 18 decimal'ed
    daiContract.methods.approve(mainContractAdd, allowanceAmt.toString()).send({
        from: userAccount,
        value: 0
    })
    .on('transactionHash', (txHash) => {
        alertVar = txHash;
        navAlerts(9);
        console.log(`txHash: ${txHash}`);
        txnModal(txHash, {
            pending: "Allowance Pending",
            confirm: "Yay! Allowance Confirmed"
        });
    })
    .on('error', (err) => {
        alertVar = err;
        navAlerts(7);
        console.error(err);
    });
}