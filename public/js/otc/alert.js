var alertVar = "hey";

function navAlerts(num) {
    let title, content;
    if (num == 0) {
        title = 'GENERATE NEW ADDRESS';
        content = '<b>For interacting with ethereum blockchain you need to have a specific ID (private key). The easiest way to get one are<br>For desktop install - <a href="https://metamask.io/" target="_blank">metamask extension</a>.<br>For Android/IOS download ethereum browser - <a href="https://trustwallet.com/" target="_blank">Trust wallet</a></b>';
    } else if (num == 1) {
        title = 'NO ETHEREUM PROVIDER';
        content = '<b>This Dapp is made on top of Ethereum blockchain.<br>To use this Dapp<br>For desktop install - <a href="https://metamask.io/" target="_blank">metamask extension</a>.<br>For Android/IOS download ethereum browser - <a href="https://trustwallet.com/" target="_blank">Trust wallet</a></b>';
    } else if (num == 2) {
        title = 'Main network';
        content = "<b>You are on main network whatever trade you do will involves real assets.</b>";
    } else if (num == 3) {
        title = 'Ropsten test network';
        content = "<b>You are good to use ropsten test version of kyber trade. For real assets trading shift to Main network.</b>";
    } else if (num == 4) {
        title = 'Not main network';
        content = "<b>Shift to main network to use kyber trade. Kyber trade is also available on Ropsten test network for trial purposes.</b>";
    } else if (num == 5) {
        title = 'CONFIRM TRADE TRANSACTION';
        content = 'Confirm your transaction for swapping the tokens';
    } else if (num == 6) {
        title = 'TRADING TRANSACTION DEPLOYED';
        content = `Check your transaction <a href="https://ropsten.etherscan.io/tx/${alertVar}" class="linkColor" target="_blank">here</a>.`;
    } else if (num == 7) {
        title = 'TRANSACTION FAILED';
        content = `Error occured while completing your transaction.<br><b>${alertVar}</b>`;
    } else if (num == 8) {
        title = 'CONFIRM ALLOWANCE TRANSACTION';
        content = 'Confirm your transaction for Allowance';
    } else if (num == 9) {
        title = 'ALLOWANCE TRANSACTION DEPLOYED';
        content = `Check your transaction <a href="https://ropsten.etherscan.io/tx/${alertVar}" class="linkColor" target="_blank">here</a>. After completion deploy Trade transaction.`;
    } else if (num == 10) {
        title = 'DENIED PERMISSION';
        content = 'User denied permission to access account. Try Reloading.';
    }
    swal({ "title": title,
            "html": content,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-default"
    });
}

// blackDashboard.showSidebarMessage("Sidebar mini deactivated...")