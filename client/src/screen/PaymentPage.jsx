import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Fetchevent,
  getAppliedEvents,
  getGroupByEventId,
} from "../services/api.js";
import { useQuery } from "@tanstack/react-query";
import { loadRazorpayScript } from "../utils/razorpay.js";
import { TiTick } from "react-icons/ti";

const PaymentPage = () => {
  const params = useParams();
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const [pending, setPending] = useState("idle");
  const [dropDown, setDropDown] = useState([]);

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

  // **Filter Dropdown Options when data changes**
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

  console.log(appliedEvents);

  const handleChange = (e) => {
    const subEventId = e.target.value;
    const event = dropDown?.find((event) => event._id === subEventId);
    setSelectedEvent(subEventId);
    setSelectedEventName(event?.name || "");
  };

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
        amount: eventDetails?.event?.amount * 100, // Amount in paise (₹500)
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
            groupId: selectedEvent,
            eventId: params.eventId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
          credentials: "include",
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResponse.status === 200) {
          alert("Payment successful!");

          // Refetch applied events after successful payment
          await refetchAppliedEvents();
          setSelectedEvent("");
          setSelectedEventName("");

          setPending("success");
        } else {
          alert("Payment verification failed: " + verifyResult.message);
        }
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
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen p-4 sm:p-8 text-sm md:text-base lg:text-lg">
      <div className="w-1/2 flex flex-col justify-around items-center bg-zinc-900 p-4 rounded-lg">
        {dropDown.length === 0 ? (
          <h1>You have applied for all sub-events in this event</h1>
        ) : (
          <select
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-white text-black"
            value={selectedEvent}
          >
            <option value="" disabled>
              Select an Event
            </option>
            {dropDown.map((event, index) => (
              <option key={index} value={event._id}>
                {event.name}
              </option>
            ))}
          </select>
        )}

        <div className="mt-4 w-full flex flex-col gap-2">
          <h1 className="text-white text-lg">
            {!selectedEvent
              ? `Please select an event for payment`
              : `Payment for ${selectedEventName}`}
          </h1>
          {!selectedEvent ? (
            <h1 className="p-2 w-full text-gray-500 rounded-lg bg-white text-center">
              {eventDetails?.event?.amount}
            </h1>
          ) : (
            <button
              className="p-2 bg-blue-700 text-white rounded-lg w-full"
              onClick={handlePayment}
            >
              Pay ₹{eventDetails?.event?.amount}
            </button>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <ul className="w-1/2 flex flex-col  rounded-lg gap-2 p-2 text-white bg-gray-400">
          {appliedEvents?.groupIds &&
            appliedEvents?.groupIds?.map((event) => {
              return (
                <li className="flex gap-2 justify-between bg-zinc-700 p-2 rounded-lg">
                  <h1>{event.name}</h1>
                  <TiTick color="green" size={20} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default PaymentPage;
