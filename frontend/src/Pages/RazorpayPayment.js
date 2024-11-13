
import React from 'react';
import axios from 'axios';

const RazorpayPayment = () => {
    const handlePayment = async () => {
        try {
            // Step 1: Create an order on the backend to get the order_id
            const orderResponse = await axios.post('http://localhost:8000/order/create/', {
                amount: 500 * 100, // amount in paise
                currency: 'INR'
            });

            const { order_id } = orderResponse.data;

            // Step 2: Configure Razorpay options
            const options = {
                key: 'rzp_test_2lMA6SnGa6x6Br', // Replace with your Razorpay key ID
                amount: 500 * 100, // amount in paise
                currency: 'INR',
                name: 'RealEstate Company',
                description: 'Test Transaction',
                order_id: order_id,
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    // Step 3: Send the payment details to the backend to complete the transaction
                    try {
                        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                        const transactionResponse = await axios.post('http://localhost:8000/order/complete/', {
                            payment_id: razorpay_payment_id,
                            order_id: razorpay_order_id,
                            signature: razorpay_signature,
                            amount: 500,
                            currency: 'INR'
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`, // Include token in headers
                                'Content-Type': 'application/json'
                            }
                        });

                        alert(transactionResponse.data.message); // Success message
                    } catch (error) {
                        console.error("Transaction completion error:", error);
                        alert("Transaction failed: " + (error.response && error.response.data ? error.response.data.message : "An unknown error occurred."));
                    }
                },
                prefill: {
                    name: "Your Name",
                    email: "youremail@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // Step 4: Open Razorpay Checkout
            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error("Order creation error:", error);
            alert("Order creation failed: " + (error.response && error.response.data ? error.response.data.message : "An unknown error occurred."));
        }
    };

    return (
        <div>
            <h2>Make a Payment</h2>
            <button onClick={handlePayment}>Pay ₹500</button>
        </div>
    );
};

export default RazorpayPayment;
