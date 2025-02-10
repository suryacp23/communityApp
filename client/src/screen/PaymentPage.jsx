import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Fetchevent,
  getAppliedEvents,
  getGroupByEventId,
} from "../services/api.js";
import { useQuery } from "@tanstack/react-query";
import { loadRazorpayScript } from "../utils/razorpay.js";
import { TiTick } from "react-icons/ti";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const PaymentPage = () => {
  const params = useParams();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const [pending, setPending] = useState("idle");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [dropDown, setDropDown] = useState([]);

  const navigate = useNavigate();

  const { data: eventDetails } = useQuery({
    queryKey: ["eventId", params.eventId],
    queryFn: () => Fetchevent(params.eventId),
  });

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["getGroupByEventId", params.eventId],
    queryFn: () => getGroupByEventId(params.eventId),
  });

  const { data: appliedEvents, refetch: refetchAppliedEvents } = useQuery({
    queryKey: ["appliedEvents", params.eventId],
    queryFn: () => getAppliedEvents(params.eventId),
  });

  useEffect(() => {
    if (data && Array.isArray(appliedEvents?.groupIds)) {
      const filteredGroups = data.filter(
        (group) =>
          !appliedEvents.groupIds.some((applied) => applied._id === group._id)
      );
      setDropDown(filteredGroups);
      setSelectedEvent("");
      setSelectedEventName("");
    }
  }, [data, appliedEvents]);

  const handleChange = (e) => {
    const subEventId = e.target.value;
    const event = dropDown?.find((event) => event._id === subEventId);
    setSelectedEvent(subEventId);
    setSelectedEventName(event?.name || "");
  };
  const handleUserChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setPending("processing");
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded || params.eventId === undefined) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: eventDetails?.event?.amount * 100,
        currency: "INR",
        receipt: "receipt#1",
      }),
      credentials: "include",
    });

    const order = await response.json();
    if (order.error) {
      console.error("Order creation failed:", order.error);
      setSelectedEvent("");
      setSelectedEventName("");
      setPending("try again");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "SyncEventUp",
      description: "Test Transaction",
      order_id: order.id,
      prefill: userDetails,
      handler: async function (response) {
        const verifyResponse = await fetch("/api/payment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupId: selectedEvent,
            eventId: params?.eventId,
            razorpay_order_id: response?.razorpay_order_id,
            razorpay_payment_id: response?.razorpay_payment_id,
            razorpay_signature: response?.razorpay_signature,
          }),
          credentials: "include",
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResponse.status === 200) {
          alert("Payment successful!");
          await refetchAppliedEvents();
          setSelectedEvent("");
          setSelectedEventName("");
          setPending("success");
        } else {
          alert("Payment verification failed: " + verifyResult?.message);
        }
      },
      theme: {
        color: "#1E40AF",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-screen bg-background text-white p-6">
      <MdOutlineArrowBackIosNew
        size={24}
        onClick={() => navigate("/events")}
        className="cursor-pointer transition-transform transform hover:scale-125 absolute left-4 top-4 text-gray-400"
      />

      <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-xl font-semibold mb-4">
          Complete Your Payment
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleUserChange}
            className="p-2 rounded bg-slate-600 text-white placeholder-slate-100"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleUserChange}
            className="p-2 rounded bg-slate-600 text-white placeholder-slate-100"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleUserChange}
            className="p-2 rounded bg-slate-600 text-black placeholder-slate-100"
          />
          <select
            onChange={handleChange}
            className="p-2 rounded bg-slate-600 text-black ">
            <option className="text-slate-100 bg-gray-800" value="" disabled>
              Select an Event
            </option>
            {dropDown.map((event, index) => (
              <option
                className="text-slate-100 bg-gray-800"
                key={index}
                value={event._id}>
                {event.name}
              </option>
            ))}
          </select>
          <button
            className="p-2 bg-blue-600 rounded-lg text-white font-semibold"
            onClick={handlePayment}>
            Pay ₹{eventDetails?.event?.amount}
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <ul className="w-5/6 md:w-2/3 flex flex-col rounded-lg gap-2 p-4 text-white ">
          {appliedEvents?.groupIds &&
            appliedEvents?.groupIds?.map((event, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg shadow-md">
                <h1 className="text-lg font-medium">{event?.name}</h1>
                <TiTick className="text-green-500" size={24} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentPage;
