


// /////// correctly working .......

// import React, { useState } from 'react';
// import axios from 'axios';

// function Razorpay() {
//   const [amount, setAmount] = useState(500); // You can dynamically set the amount if needed

//   const completePayment = (payment_id, order_id, signature) => {
//     axios({
//       method: "post",
//       url: "http://localhost:8000/order/complete/",
//       data: {
//         payment_id,
//         order_id,
//         signature,
//         amount,
//         currency: "INR", // Pass currency here
//       },
//     })
//       .then((response) => {
//         console.log("Payment success:", response.data);
//         alert("Payment successful!");
//       })
//       .catch((error) => {
//         console.error("Payment verification failed:", error.response.data);
//         alert("Payment verification failed!");
//       });
//   };

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const razorpayPayment = async () => {
//     const isScriptLoaded = await loadRazorpayScript();
//     if (!isScriptLoaded) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     axios
//       .post("http://localhost:8000/order/create/", {
//         amount, // Amount in smallest currency unit (e.g., paise for INR)
//         currency: "INR",
//       })
//       .then((response) => {
//         const order_id = response.data.data.id;

//         const options = {
//           key: "rzp_test_2lMA6SnGa6x6Br", // Replace with your Razorpay API key
//           name: "Acmee Corp",
//           description: "Test Transaction",
//           image: "https://example.com/your_logo",
//           order_id, // Use the order_id generated from the backend
//           handler: function (response) {
//             completePayment(
//               response.razorpay_payment_id,
//               response.razorpay_order_id,
//               response.razorpay_signature
//             );
//           },
//           prefill: {
//             name: "Piyush Grag", // Customize prefill with the user's details
//             email: "sample@mail.com",
//             contact: "9999999999",
//           },
//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//           method: {
//             upi: true, // Enable UPI payments
//             card: true, // Enable card payments
//             wallet: true, // Enable wallet payments
//           },
//         };

//         const rzp1 = new window.Razorpay(options);

//         rzp1.on("payment.failed", function (response) {
//           alert("Payment failed: " + response.error.description);
//         });

//         rzp1.open(); // Open the Razorpay checkout modal
//       })
//       .catch((error) => {
//         console.error("Order creation failed:", error);
//         alert("Something went wrong while creating the order.");
//       });
//   };

//   return (
//     <div className="container rounded bg-warning border" style={{ width: "50%" }}>
//       <h1 className="fw-bolder display-2">₹500</h1>
//       <p>per year</p>
//       <div>
//         <h3 className="fw-semibold">Basic</h3>
//         <div className="text-start mt-3">
//           <ul style={{ fontSize: "14px" }}>
//             <li>1 custom domain e.g. img.yourdomain.com</li>
//             <li>Media library backup</li>
//             <li>Automated image analysis reports with Performance Center</li>
//             <li>One-time 30-minute consultation with a media optimization expert</li>
//             <li>Live chat & 12-hr SLA support tickets</li>
//             <li>5 user accounts with role-based permissions</li>
//           </ul>
//         </div>
//         <div className="d-grid mt-3">
//           <button
//             type="button"
//             className="btn btn-light fw-semibold py-3"
//             onClick={razorpayPayment}
//           >
//             Upgrade now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Razorpay;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////// Razorpay payment correct ah work agum, payment complete ana udane ( payment_id, order_id, signature, username)
/// django admin panel la store agum....
///// entha user login panitu pay panalum user token localstorage la store agum and the antha token vachu
///// username django admin panel la store agum


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Razorpay() {
  const [amount, setAmount] = useState(500); // Set the default amount
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    // Check if user is logged in by verifying the token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  // Function to complete payment
  const completePayment = (payment_id, order_id, signature) => {
    const token = localStorage.getItem("token"); // Retrieve token

    if (!token) {
      alert("User not authenticated. Please log in again.");
      navigate("/login");
      return;
    }

    axios({
      method: "post",
      url: "http://localhost:8000/order/complete/",
      data: {
        payment_id,
        order_id,
        signature,
        amount,
        currency: "INR", // Pass currency here
      },
      headers: {
        Authorization: `Token ${token}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        console.log("Payment success:", response.data);
        alert("Payment successful!");
      })
      .catch((error) => {
        console.error("Payment verification failed:", error.response.data);
        alert("Payment verification failed!");
      });
  };

  // Function to load the Razorpay script
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Function to initiate Razorpay payment
  const razorpayPayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve token
    if (!token) {
      alert("User not authenticated. Please log in again.");
      navigate("/login");
      return;
    }

    axios
      .post(
        "http://localhost:8000/order/create/",
        {
          amount, // Amount in the smallest currency unit (e.g., paise for INR)
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Token ${token}`, // Include the token in the Authorization header
          },
        }
      )
      .then((response) => {
        const order_id = response.data.data.id;

        const options = {
          key: "rzp_test_2lMA6SnGa6x6Br", // Replace with your Razorpay API key
          name: "Acmee Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id, // Use the order_id generated from the backend
          handler: function (response) {
            completePayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: "Piyush Garg", // Customize prefill with the user's details
            email: "sample@mail.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          method: {
            upi: true, // Enable UPI payments
            card: true, // Enable card payments
            wallet: true, // Enable wallet payments
          },
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          alert("Payment failed: " + response.error.description);
        });

        rzp1.open(); // Open the Razorpay checkout modal
      })
      .catch((error) => {
        console.error("Order creation failed:", error.response.data);
        alert("Something went wrong while creating the order.");
      });
  };

  return (
    <div className="container rounded bg-warning border" style={{ width: "50%" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fw-bolder display-2">₹500</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
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
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Razorpay;
