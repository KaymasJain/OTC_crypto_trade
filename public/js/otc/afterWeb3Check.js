function ifWeb3NotConfigured() {
    navAlerts(1);
}

function ifWeb3Configured() {
    if (networkId == 1) {
        navAlerts(2);
    } else if (networkId == 3) {
        navAlerts(3);
    } else {
        navAlerts(4);
    }
}
