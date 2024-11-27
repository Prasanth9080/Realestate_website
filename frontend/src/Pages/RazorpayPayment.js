
// import React from 'react';
// import axios from 'axios';

// const RazorpayPayment = () => {
//     const handlePayment = async () => {
//         try {
//             // Step 1: Create an order on the backend to get the order_id
//             const orderResponse = await axios.post('http://localhost:8000/order/create/', {
//                 amount: 500 * 100, // amount in paise
//                 currency: 'INR'
//             });

//             const { order_id } = orderResponse.data;

//             // Step 2: Configure Razorpay options
//             const options = {
//                 key: 'rzp_test_2lMA6SnGa6x6Br', // Replace with your Razorpay key ID
//                 amount: 500 * 100, // amount in paise
//                 currency: 'INR',
//                 name: 'RealEstate Company',
//                 description: 'Test Transaction',
//                 order_id: order_id,
//                 handler: async function (response) {
//                     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

//                     // Step 3: Send the payment details to the backend to complete the transaction
//                     try {
//                         const token = localStorage.getItem('token'); // Retrieve the token from localStorage

//                         const transactionResponse = await axios.post('http://localhost:8000/order/complete/', {
//                             payment_id: razorpay_payment_id,
//                             order_id: razorpay_order_id,
//                             signature: razorpay_signature,
//                             amount: 500,
//                             currency: 'INR'
//                         }, {
//                             headers: {
//                                 'Authorization': `Bearer ${token}`, // Include token in headers
//                                 'Content-Type': 'application/json'
//                             }
//                         });

//                         alert(transactionResponse.data.message); // Success message
//                     } catch (error) {
//                         console.error("Transaction completion error:", error);
//                         alert("Transaction failed: " + (error.response && error.response.data ? error.response.data.message : "An unknown error occurred."));
//                     }
//                 },
//                 prefill: {
//                     name: "Your Name",
//                     email: "youremail@example.com",
//                     contact: "9999999999"
//                 },
//                 theme: {
//                     color: "#3399cc"
//                 }
//             };

//             // Step 4: Open Razorpay Checkout
//             const razorpay = new window.Razorpay(options);
//             razorpay.open();

//         } catch (error) {
//             console.error("Order creation error:", error);
//             alert("Order creation failed: " + (error.response && error.response.data ? error.response.data.message : "An unknown error occurred."));
//         }
//     };

//     return (
//         <div>
//             <h2>Make a Payment</h2>
//             <button onClick={handlePayment}>Pay ₹500</button>
//         </div>
//     );
// };

// export default RazorpayPayment;






///// checking for new payment razorpay intergration



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RazorpayPayment() {
  const [amount, setAmount] = useState(5); // Set your default amount

  // Add Razorpay Checkout Script Dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Complete Payment Function
  const completePayment = (payment_id, order_id, signature) => {
    axios.post("http://localhost:8000/order/complete/", {
      payment_id,
      order_id,
      signature,
      amount, // Send the amount
    })
      .then((response) => {
        alert("Payment Verified Successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Payment Verification Failed", error.response.data);
        alert("Payment verification failed!");
      });
  };

  // Razorpay Checkout Integration
  const razorpayPayment = () => {
    axios.post('http://localhost:8000/order/create/', {
      amount: amount * 100, // Convert to paisa for Razorpay
      currency: "INR",
    })
      .then((response) => {
        const { id: order_id } = response.data.data; // Razorpay Order ID

        const options = {
          key: "rzp_test_2lMA6SnGa6x6Br", // Replace with your Razorpay key
          amount: amount * 100, // Amount in paisa
          currency: "INR",
          name: "Acmee Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id, // Pass the Order ID from backend
          handler: function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            alert("Payment Success!");
            completePayment(razorpay_payment_id, razorpay_order_id, razorpay_signature);
          },
          prefill: {
            name: "John Doe", // Replace with your user's name
            email: "johndoe@example.com", // Replace with your user's email
            contact: "9876543210", // Replace with your user's phone number
          },
          notes: {
            address: "Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          console.error("Payment Failed", response.error);
          alert(`Payment failed: ${response.error.description}`);
        });

        rzp1.open(); // Open Razorpay Checkout
      })
      .catch((error) => {
        console.error("Error Creating Order", error.response.data);
      });
  };

  return (
    <div className="container mt-5 text-center rounded bg-warning border p-5" style={{ width: "28%" }}>
      <h1 className="fw-bolder display-2">₹500</h1>
      <p>per year</p>
      <div>
        <h3 className="fw-semibold">Basic</h3>
        <div className="text-start mt-3">
          <ul style={{ fontSize: "14px" }}>
            <li>1 custom domain e.g. img.yourdomain.com</li>
            <li>Media library backup</li>
            <li>Automated image analysis reports with Performance Center</li>
            <li>One-time 30-minute consultation with a media optimization expert</li>
            <li>Live chat & 12-hr SLA support tickets</li>
            <li>5 user accounts with role-based permissions</li>
          </ul>
        </div>
        <div className="d-grid mt-3">
          <button
            type="button"
            className="btn btn-light fw-semibold py-3"
            onClick={razorpayPayment}
          >
            Upgrade now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RazorpayPayment;
