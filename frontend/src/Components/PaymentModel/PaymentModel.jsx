import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from 'react-redux'
import { FaXmark } from 'react-icons/fa6';
import { AddRecharge } from '../../api/OtherReducer';

const PaymentModel = ({ prise, setShow }) => {
    const { user } = useSelector((state) => state.userLog)
    const dispatch = useDispatch()
    const createOrder = (data, actions) => {

        return actions.order.create({
            purchase_units: [
                {
                    user: user._id,
                    amount: {
                        currency_code: "USD",
                        value: prise,
                    },
                },
            ],
        }).then((order_id) => {
            return order_id;
        });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            if (details.status === "COMPLETED") {
                alert("done")
                dispatch(AddRecharge({ userID: user._id, amount: details.purchase_units[0].amount.value })).then((e) => alert("recharge add successfully"))
            }
            setShow(false);
        });
    };
   
    return (
        <>

            <div style={{ position: "absolute", top: "0", right: "0px", zIndex: "999", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
                <div className='paymentModel' style={{ position: "relative", maxHeight: "50%", overflowY: "scroll", maxWidth: "440px", width: "95%", backgroundColor: "#f2f2f2", padding: "50px 20px", borderRadius: "10px" }}>
                    <FaXmark onClick={() => setShow(false)} style={{ position: "absolute", top: "20px", right: "20px" }} />
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </div>
            </div>

        </>
    )
}

export default PaymentModel
