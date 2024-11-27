import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Forgotpassword from "./Pages/Forgotpassword";
import Reset_Password from "./Pages/Reset_Password";
import Resetpassword from "./Pages/Resetpassword";
import Homepage from "./Pages/Homepage";
import RazorpayPayment from "./Pages/RazorpayPayment";
import Razorpay from "./Pages/Razorpay";

function App() {
  return (
    <div className="App">
        {/* <h2>Welcome Bro</h2> */}
      <BrowserRouter>
           <Routes>
               {/* <Route path="/" element={<Homepage/>}/> */}
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/forgotpassword" element={<Forgotpassword/>}/>
               <Route path="/resetpasswordconfirm/:uidb64/:token" element={<Reset_Password/>}/>
               <Route path="/resetpassword" element={<Resetpassword/>}/>
               <Route path="/" element={<Razorpay/>}/>

               {/* <Route path="/razorpay" element={<RazorpayPayment/>}/> */}

           </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;




////// checking for boostrap file:

// import React from 'react'

// export default function App() {
//   return (
    
//     <div className="container">
//       <h1 className="text-center mt-5">Hello, Bootstrap in React!</h1>
//       <button className="btn btn-danger">Bootstrap Button</button>
//     </div>
//   )
// }

