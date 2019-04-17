var toggle = false;

async function updateETHLiquidity() {
    var ethLiquidity = await ETHTotal();
    $('.ETHLiquidity').text(`Liquidity: ${(Number(ethLiquidity)/10**18).toFixed(2)}`);
}

async function updateDAILiquidity() {
    var daiLiquidity = await DAITotal();
    $('.DAILiquidity').text(`Liquidity: ${(Number(daiLiquidity)/10**18).toFixed(2)}`);
}

async function ethBal() {
    var bal = await web3.eth.getBalance(account);
    $('.ETHBalance').text(`Balance: ${(Number(bal)/10**18).toFixed(2)}`);
}

async function daiBal() {
    var bal = await getDAIBal();
    $('.DAIBalance').text(`Balance: ${(Number(bal)/10**18).toFixed(2)}`);
}


$('.toggleIcon').click(function() {
    if (!toggle) {
        toggle = true;
        $(this).css('transform', 'rotate(180deg)');
        if (!$('.amountInput').val()) {
            $('.amountInput').attr("placeholder", "Enter DAI Amount");
        }
    } else {
        toggle = false;
        $(this).css('transform', 'rotate(0deg)');
        if (!$('.amountInput').val()) {
            $('.amountInput').attr("placeholder", "Enter ETH Amount");
        }
    }
});

$('.amountInput').on('keyup keydown change', function () {
    var value = $(this).val();
    if (!toggle) {
        $('.expectedRate').text(`Expected DAI: ${value*200}`);
    } else {
        $('.expectedRate').text(`Expected ETH: ${value/200}`);
    }
});


$('.swapBut').click(function() {
    var value = $('.amountInput').val();
    var valueInWei = value*(10**18);
    if (!toggle) {
        swapETHtoDAI(valueInWei);
    } else {
        if (DAIAllowance > 0) {
            swapDAItoETH(valueInWei);
        } else {
            setDAIAllowance();
        }
    }
})