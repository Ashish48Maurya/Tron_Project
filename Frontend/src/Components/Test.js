import React, { useEffect } from 'react'

export default function Test() {
    const transact = async () => {
        try {
            if (window.tronWeb) {
                // const p =
                //   "6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56";
                // const pvk = parseInt("6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56", 16);

                // const tradeobj = await window.tronWeb.transactionBuilder.sendTrx("TNpz9dM1xScWzkeTSA9WrC9QHNuonX542s", 10000, "TWKPv4LnDxkq24JBJnzoFNk5J8zkkZf43c", 1);
                // const signedtxn = await window.tronWeb.trx.sign(tradeobj, parseInt(
                //     "6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56",
                //     16
                // ));
                // console.log(signedtxn)


                // const trans = window.tronWeb.transactionBuilder.sendAsset("TNpz9dM1xScWzkeTSA9WrC9QHNuonX542s", 100, "1000001", "TWKPv4LnDxkq24JBJnzoFNk5J8zkkZf43c")
                // const signedTxn = await window.tronWeb.trx.sign(trans, "6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56");
                // console.log(signedTxn);


                // const txn = await window.tronWeb.transactionBuilder.sendTrx("TNpz9dM1xScWzkeTSA9WrC9QHNuonX542s", 100, "TWKPv4LnDxkq24JBJnzoFNk5J8zkkZf43c");
                // const nexTxn = await window.tronWeb.transactionBuilder.addUpdateData(txn, "test");
                // const signedtxn = await window.tronWeb.trx.sign(nexTxn, "6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56");
                // console.log(signedtxn);

                // const transaction = await window.tronWeb.transactionBuilder.createAccount('TASHISH5ZhNW7fb2AMSbgfAEZ7hWsnYS2g');
                // // const signedTxn = await window.window.tronWeb.trx.sign(transaction, "6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56");
                // const signedTxn = await window.window.tronWeb.trx.sign(transaction);
                // const result = await window.tronWeb.trx.sendRawTransaction(signedTxn);
                // console.log(result);


                // const ans = await window.tronWeb.trx.sendTransaction(
                //   "TWKPv4LnDxkq24JBJnzoFNk5J8zkkZf43c",
                //   1000,
                //   parseInt(
                //     "6394a81b236655aa9889de80509f5fed5a25636fdd1d0b220441a2df7a81cf56",
                //     16
                //   )
                // );
                // console.log(ans);
                // if (ans.result) {
                //   console.log("Success");
                // } else {
                //   console.log("Fail");
                // }
            } else {
                window.alert(
                    "Please install and log in to TronLink wallet to initiate the transaction."
                );
            }
        } catch (err) {
            console.log("Msg:", err);
        }
    };







    useEffect(() => {
        transact();
    }, [])
    return (
        <div>Test</div>
    )
}
