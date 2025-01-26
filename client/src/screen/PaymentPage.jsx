import React, { useState } from "react";
import { useParams } from "react-router-dom";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentPage = () => {
  const params = useParams();
  const [pending, setPending] = useState("idle");
  const handlePayment = async () => {
    setPending("processing");
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded || params.eventId === undefined) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Step 1: Call backend to create an order
    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 50000, // Amount in paise (₹500)
        currency: "INR",
        receipt: "receipt#1",
      }),
      credentials: "include",
    });

    const order = await response.json();
    if (order.error) {
      console.error("Order creation failed:", order.error);
      setPending("try again");
      return;
    }

    // Step 2: Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "SyncEventUp",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const verifyResponse = await fetch("/api/payment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupId: params.eventId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
          credentials: "include",
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResponse.status === 200) {
          setPending("success");
        } else {
          alert("Payment verification failed: " + verifyResult.message);
        }
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Step 3: Open Razorpay Checkout
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      {pending === "processing" && <p>Processing payment...</p>}
      {pending === "success" && <p>Payment successful!</p>}
      {pending === "try again" && <p>Payment failed. Please try again.</p>}
      {pending === "idle" && (
        <button
          onClick={handlePayment}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3399cc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Pay ₹500
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
