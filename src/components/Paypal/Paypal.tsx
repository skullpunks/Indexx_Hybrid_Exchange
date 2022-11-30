// import {
//     PayPalButtons,
//     usePayPalScriptReducer
// } from "@paypal/react-paypal-js";
// import { useEffect } from "react";

// // This values are the props in the UI
// const amount = "2";
// //const currency = "USD";
// const style = { "layout": "vertical" };

// // Custom component to wrap the PayPalButtons and handle currency changes
// const Paypal: React.FC<(any)> = ({ currency, showSpinner }) => {
//     // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
//     // This is the main reason to wrap the PayPalButtons in a new component
//     const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

//     useEffect(() => {
//         dispatch({
//             type: "resetOptions",
//             value: {
//                 ...options,
//                 currency: currency,
//             },
//         });
//     }, [currency, dispatch, options]);

// const createOrder = () => {

// }
//     const callCapture = () => {
//     }
//     return (
//     <>
//         {(showSpinner && isPending) && <div className="spinner" />}
//         <PayPalButtons
//             // style={style}
//             disabled={false}
//             forceReRender={[amount, currency, style]}
//             fundingSource={undefined}
//             createOrder={(data, actions) => {
//                 return actions.order
//                     .create({
//                         purchase_units: [
//                             {
//                                 amount: {
//                                     currency_code: currency,
//                                     value: amount,
//                                 },
//                             },
//                         ],
//                     })
//                     .then((orderId) => {
//                         // Your code here after create the order
//                         return orderId;
//                     });
//             }}
//             onApprove={callCapture}
//         />
//     </>
//     );
// }
// export default Paypal;


import { FC } from 'react';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

// // import { TokenContext } from '../../context/TokenContext';
// // import { getCartRoute } from '../../services/apiRoutes';

interface Props {
    className?: string;
    value: string
}

const Paypal: FC<Props> = ({ className, value }) => {
    //const token = useContext(TokenContext);
    const navigate = useNavigate();
    // const [, setShow] = useState(false);
    // const [, setSuccess] = useState(false);
    // const [, setErrorMessage] = useState("");
    //const [orderID, setOrderID] = useState(false);
    const handleOnApprove = async () => {
        // const reassignCartToUser = token!.token !== null;
        // const cartID = localStorage.getItem('cart');

        // const { data } = await axios.delete(getCartRoute(cartID as string, reassignCartToUser));

        // if (reassignCartToUser) {
        //   localStorage.setItem('cart', data.cartID);
        // } else {
        //   localStorage.removeItem('cart');
        // }
    };

    // check Approval
    // const onApprove = (data: any, actions: any) => {
    //     return actions.order.capture().then(function (details: any) {
    //         const { payer } = details;
    //         setSuccess(true);
    //     });
    // };
    // //capture likely error
    // const onError = (data: any, actions: any) => {
    //     setErrorMessage("An Error occured with your payment ");
    // };

    return (
        <PayPalButtons
            className={className}
            style={{
                color: 'blue',
                shape: 'pill'
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        description: 'Rexlan online purchase',
                        amount: {
                            currency_code: 'USD',
                            value: value
                        }
                    }]
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order!.capture();

                await handleOnApprove();

                navigate('/payment-successful', { state: order });
            }}
            onCancel={() => {
                navigate('/cart');
            }}
            onError={(err) => {
                console.log(err);
            }}
        />
    );
};

export default Paypal;