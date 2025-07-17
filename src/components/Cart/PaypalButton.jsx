import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const PaypalButton = ({ onError, amount, onSuccess }) => {
    return (
        <PayPalScriptProvider
            options={{
                "client-id":
                    "AdbTIXtBFfJm0NYbila6F5_AJ7XbfsdSwv2sR0NpJde8rQD1mdy6IVpI99JuJum9tctUcgmb8u3NI5SZ",
            }} >
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{ amount: { value: amount } }],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(onSuccess);
                }}
                onError={onError}
            />
        </PayPalScriptProvider >
    )
}

export default PaypalButton;
