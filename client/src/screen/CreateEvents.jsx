import { useRef, useState } from "react";
import {
  FaUsers,
  FaUserFriends,
  FaLink,
  FaCog,
  FaCheckCircle,
  FaCheck,
  FaChessKing,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { MdEmojiEvents } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../services/api";
import Spinner from "../components/Spinner.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import {  useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { convertTo12Hour } from "../utils/formatTime.js";

const steps = [
  { label: "Group Details", icon: FaUsers },
  { label: "Sub Events", icon: MdEmojiEvents },
  { label: "foods", icon: IoFastFoodSharp },
];

const CreateEvents = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState("");
  const imageRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "jlksfjlf",
    description: "jsfflsfj",
    imageUrl: "lkjsfdjs",
    eventDate: "",
    startTime: "",
    endTime: "",
    technical: ["kjlsd"],
    nonTechnical: ["lfsjfs"],
    swags: false,
    refreshment: false,
    paid: false,
    amount: 0,
    technicalInput: "clkjsf",
    nonTechnicalInput: "jlsffjsl",
    user: user._id,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (formData) => createEvent(formData),
    onSuccess: (data) => {
      console.log(data);
      navigate("/events");
      toast.success(data?.message);
    },
  });
  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(formData.startTime.split(" "));
  };
  const handleChangefoods = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value === "on" ? !prev[name] : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload the event poster!");
      return;
    }
    if (
      !formData.startTime ||
      !formData.endTime ||
      !formData.startTime ||
      !formData.eventName ||
      !formData.description
    ) {
      toast.error("Please fill all the details");
      return;
    }
    if (formData.technical.length === 0 && formData.nonTechnical.length === 0) {
      toast.error("There should be atleast 1 Sub-Event!");
      return;
    }
    if (!formData.paid) formData.amount = 0;
    const data = new FormData();
    const startTime = formData.startTime.toLocaleString().split(",")[1];
    const endTime = formData.endTime.toLocaleString().split(",")[1];
    const dateValue = formData.eventDate.toLocaleString().split(",")[0];

    data.append("startTime", startTime);
    data.append("endTime", endTime);
    data.append("eventDate", dateValue);
    data.append("title", formData.eventName);
    data.append("description", formData.description);
    data.append("file", file);
    data.append("user", formData.user);
    // data.append("eventDate", formData.eventDate);
    // data.append("startTime", formData.startTime);
    // data.append("endTime", formData.endTime);
    data.append("paid", formData.paid);
    data.append("refreshment", formData.refreshment);
    data.append("amount", formData.amount);
    data.append("technicalEvents", JSON.stringify(formData.technical));
    data.append("nonTechnicalEvents", JSON.stringify(formData.nonTechnical));
    mutate(data);
  };

  const updateInput = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Add event to the respective field (technical or nonTechnical)
  const addEvent = (field, event) => {
    if (event && event.trim()) {
      setFormData((prevState) => {
        if (prevState[field].length < 5) {
          return {
            ...prevState,
            [field]: [...prevState[field], event],
            [`${field}Input`]: "", // Clear the input after adding
          };
        } else {
          alert("You can only add a maximum of 5 events.");
          return prevState; // Prevent adding more than 5 events
        }
      });
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Delete an event from the respective field
  const deleteEvent = (field, index) => {
    setFormData((prevState) => {
      const updatedEvents = prevState[field].filter((_, idx) => idx !== index);
      return { ...prevState, [field]: updatedEvents };
    });
  };
  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };
  const nextStep = () => {
    if (step < steps.length) setStep((prev) => prev + 1);
    console.log(formData);
  };
  const BackButton = () => {
    return (
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 w-fit top-2 left-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Back
      </button>
    );
  };
  return (
    <div className="flex  font-roboto min-h-screen p-1 py-2 sm:p-8 text-sm md:text-base lg:text-lg">
      <div className="bg-primary md:shadow-lg p-6 sm:p-8 rounded-lg w-full max-w-screen-md mx-auto flex flex-col gap-6">
        <BackButton />
        <div className="flex  items-center justify-between gap-4 text-white">
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center w-full">
                {index > 0 && (
                  <div
                    className={`absolute top-4 -left-1/2 h-1 transition-all duration-500 ${
                      step > index ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{ width: "100%" }}
                  />
                )}
                <div
                  className={`z-10 w-10 h-10 flex items-center justify-center rounded-full text-white text-xl transition-all duration-500 ${
                    step > index + 1
                      ? "bg-green-500"
                      : step === index + 1
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}>
                  {step > index + 1 ? <FaCheck /> : <Icon />}
                </div>
                <span className="text-sm sm:block hidden">
                  {stepItem.label}
                </span>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col relative h-[450px] md:h-[500px]  overflow-y-auto w-full ">
          {step === 1 && (
            <div className="flex flex-col py-5  gap-5 h-full  md:p-4 md:bg-[#1a1a1a] text-[#e0e0e0] rounded-lg shadow-lg">
              <h2 className="text-lg text-center font-semibold text-[#f0f0f0]">
                Event Details
              </h2>

              {/* Event Name Input */}
              <div className="flex flex-col gap-1 sm:gap-2">
                {formData.eventName && (
                  <label htmlFor="" className="pl-1 font-semibold">
                    Event title
                  </label>
                )}
                <input
                  type="text"
                  className="w-full px-3 py-2 lg:py-3 border border-[#333333] rounded-md hover:border-[#7e7d7d] outline-none focus:border-[#4a90e2]  bg-[#222222] text-[#e0e0e0] placeholder-[#888888] duration-100"
                  placeholder="Event name"
                  value={formData.eventName}
                  required
                  onChange={(e) => handleChange("eventName", e.target.value)}
                />
              </div>

              {/* Description Textarea */}
              <div className="flex flex-col gap-1 sm:gap-2">
                {formData.description && (
                  <label htmlFor="" className="pl-1 font-semibold">
                    Description
                  </label>
                )}
                <textarea
                  className="w-full px-3 py-2 border border-[#333333] hover:border-[#7e7d7d] rounded-md outline-none  focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888] min-h-[80px] max-h-[80px]"
                  placeholder="Description"
                  value={formData.description}
                  required
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <input
                className="h-fit w-full bg-[#222222] hover:border-[#7e7d7d] text-[#e0e0e0] rounded-md cursor-pointer border border-[#333333] outline-none  focus:border-[#4a90e2]"
                type="file"
                name="imageUrl"
                required
                ref={imageRef}
                onChange={handleFileChange}
              />
              <div className="flex flex-col gap-1 sm:gap-2">
                {formData.description && (
                  <label htmlFor="" className="pl-1 font-semibold">
                    Event Date
                  </label>
                )}
                <DatePicker
                  selected={formData.eventDate}
                  required
                  placeholderText="Event date"
                  className="px-3 py-2 lg:py-3 w-full z-20 bg-[#222222] hover:border-[#7e7d7d] text-[#e0e0e0] rounded-md cursor-pointer border border-[#333333] outline-none  focus:border-[#4a90e2]"
                  onChange={(date) => handleChange("eventDate", date)}
                />
              </div>

              {/* Event Date */}

              {/* Time Inputs (Start and End Time) */}
              <div className="flex flex-grow gap-4 w-full flex-col sm:flex-row sm:justify-between">
                <div className=" w-full sm:w-1/2 flex flex-col gap-1">
                  <label className="text-sm font-semibold pl-1 lg:text-[16px] text-[#cccccc]">
                    Start Time
                  </label>
                  <DatePicker
                    className="w-full px-3 mb-0 py-2 placeholder:text-lg placeholder:text-gray-300 lg:py-3 border border-[#333333] rounded-md hover:border-[#7e7d7d] outline-none focus:border-[#4a90e2]  bg-[#222222] text-[#e0e0e0] placeholder-[#888888] duration-100"
                    showTimeSelect
                    placeholderText="--:--"
                    showTimeSelectOnly
                    required
                    timeFormat="HH:mm "
                    dateFormat="HH:mm "
                    selected={formData.startTime}
                    onChange={(time) => {
                      console.log(time);
                      handleChange("startTime", time);
                    }}
                  />
                </div>
                <div className=" w-full sm:w-1/2 flex flex-col gap-1">
                  <label className="text-sm font-semibold pl-1 lg:text-[16px] text-[#cccccc]">
                    End Time
                  </label>
                  <DatePicker
                    className="w-full px-3 mb-0 py-2 placeholder:text-lg placeholder:text-gray-300 lg:py-3 border border-[#333333] rounded-md hover:border-[#7e7d7d] outline-none focus:border-[#4a90e2]  bg-[#222222] text-[#e0e0e0] placeholder-[#888888] duration-100"
                    showTimeSelect
                    placeholderText="--:--"
                    showTimeSelectOnly
                    required
                    timeFormat="HH:mm "
                    dateFormat="HH:mm "
                    selected={formData.endTime}
                    onChange={(time) => {
                      console.log(time);
                      handleChange("endTime", time);
                    }}
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                className="w-fit sticky bottom-0 ml-auto  bg-[#4a90e2] hover:bg-[#3b7ccc] text-[#e0e0e0]  px-3 py-2 rounded-md transition duration-300"
                onClick={nextStep}>
                Next →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="h-full  duration-400 py-3 flex flex-col gap-3 relative md:p-4 md:bg-[#1a1a1a] text-[#e0e0e0] rounded-lg shadow-lg">
              <h2 className="text-lg mb-3 lg:text-xl text-center font-semibold text-[#f0f0f0]">
                Sub - Events
              </h2>

              <div className="flex-grow flex flex-col gap-4">
                {/* Technical Events */}
                <h3 className="text-lg font-semibold">Technical events</h3>
                <div className=" w-full p-0.5 flex flex-col ">
                  <div className=" w-full flex  gap-2 justify-between items-center">
                    <input
                      type="text"
                      placeholder="Enter technical events"
                      value={formData.technicalInput}
                      maxLength={20}
                      onChange={(e) =>
                        updateInput("technicalInput", e.target.value)
                      }
                      className="p-2 md:px-5 text-[14px] h-10 border border-[#333333] hover:border-[#7e7d7d] w-5/6 rounded-md focus:outline-none  focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
                    />
                    <button
                      type="button"
                      className="bg-[#333333]  text-lg hover:bg-[#4a4a4a] text-[#e0e0e0] h-10 w-10 lg:h-12 lg:w-12 rounded-md transition duration-300"
                      onClick={() =>
                        addEvent("technical", formData.technicalInput)
                      }>
                      +
                    </button>
                  </div>
                  <div className="  w-full flex flex-wrap mt-3 gap-2">
                    {formData.technical.map((event, index) => (
                      <div
                        key={index}
                        className="flex bg-zinc-500 gap-2 border outline-none border-gray-600 pl-3 pr-2 py-1 rounded-md">
                        <span className="  text-[#f0f0f0] text-[14px]  gap-1  flex justify-between items-center">
                          {event}
                        </span>
                        <button
                          type="button"
                          className="text-black opacity-85 hover:text-white duration-100 text-xs  hover:opacity-100"
                          onClick={() => deleteEvent("technical", index)}>
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Non-Technical Events */}
                <div className=" w-full flex flex-col gap-3">
                  <h3 className="text-lg font-semibold">
                    Non-technical events
                  </h3>
                  <div className="w-full p-0.5 md:w-full flex justify-between gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Enter non-technical events"
                      value={formData.nonTechnicalInput}
                      maxLength={20}
                      onChange={(e) =>
                        updateInput("nonTechnicalInput", e.target.value)
                      }
                      className="p-2 text-[14px] md:px-5 h-10 lg:h-12 border border-[#333333] hover:border-[#7e7d7d] w-5/6 rounded-md outline-none focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
                    />
                    <button
                      type="button"
                      className="bg-[#333333] hover:bg-[#4a4a4a] text-[#e0e0e0] text-lg h-10 w-10   md:w-10  lg:h-12 lg:w-12 rounded-md transition duration-300"
                      onClick={() =>
                        addEvent("nonTechnical", formData.nonTechnicalInput)
                      }>
                      +
                    </button>
                  </div>
                  <div className=" flex flex-wrap gap-2">
                    {formData.nonTechnical.map((event, index) => (
                      <div
                        key={index}
                        className="flex bg-zinc-500 gap-2 border outline-none border-gray-600 pl-3 pr-2 py-1 rounded-md">
                        <span className="  text-[#f0f0f0] text-[14px]  gap-1  flex justify-between items-center">
                          {event}
                        </span>
                        <button
                          type="button"
                          className="text-black opacity-85 hover:text-white duration-100 text-xs  hover:opacity-100"
                          onClick={() => deleteEvent("nonTechnical", index)}>
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="w-full flex  justify-between">
                <button
                  className="bg-[#333333] hover:bg-[#4a4a4a] text-[#e0e0e0] p-2 rounded-md transition duration-300"
                  onClick={prevStep}>
                  ← Back
                </button>
                <button
                  className="bg-[#4a90e2] hover:bg-[#3b7ccc] text-[#f0f0f0] px-3 py-2 rounded-md transition duration-300"
                  onClick={nextStep}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex h-full flex-col gap-4  text-sm text-[#e0e0e0] ">
              <h2 className="text-lg font-semibold">Refereshments And Swags</h2>
              <div className="  bg-[#2b2b2b] flex flex-col gap-4 sm:text-lg  rounded-md p-4">
                {/* <div className="  justify-between  flex items-center ">
									<label
										htmlFor="refreshment"
										className="flex text-right "
									>
										Refreshment
									</label>
									<input
										type="checkbox"
										id="refreshment"
										onChange={(e) =>
											handleChangefoods(
												"refreshment",
												e.target.value
											)
										}
									/>
								</div> */}

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    id="refreshment"
                    checked={formData.refreshment}
                    onChange={(e) =>
                      handleChangefoods("refreshment", e.target.value)
                    }
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                  <span className="ml-3 text-sm font-medium text-white">
                    Refreshments
                  </span>
                </label>
                {/* <div className=" flex justify-between  items-center ">
									<label htmlFor="Swags" className="flex ">
										Swags
									</label>
									<input
										type="checkbox"
										name="Swags"
										id="Swags"
										className="border rounded-md w-4"
										onChange={(e) => {
											handleChangefoods(
												"Swags",
												e.target.value
											);
										}}
									/>
								</div> */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    id="Swags"
                    checked={formData.swags}
                    onChange={(e) => handleChangefoods("swags", e.target.value)}
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                  <span className="ml-3 text-sm font-medium text-white">
                    Swags
                  </span>
                </label>
              </div>
              <h2 className="text-lg font-semibold">Payment</h2>
              <div className="bg-[#2b2b2b]  rounded-md p-4">
                {/* <div className="flex gap-2 justify-between items-center p-1">
									<label
										htmlFor="paid"
										className="flex text-right "
									>
										Paid
									</label>
									<input
										type="checkbox"
										id="paid"
										onChange={(e) =>
											handleChangefoods(
												"paid",
												e.target.value
											)
										}
									/>
								</div> */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    id="paid"
                    checked={formData.paid}
                    onChange={(e) => handleChangefoods("paid", e.target.value)}
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                  <span className="ml-3 text-sm font-medium text-white">
                    Paid
                  </span>
                </label>

                {formData?.paid && (
                  <div className=" flex gap-2 justify-between  items-center p-1">
                    <label htmlFor="amount" className="  ">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={formData.amount}
                      className=" w-1/2 sm:w-1/3 p-2  border border-[#333333] rounded-md outline-none focus:ring-1 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888] "
                      placeholder="Enter the amount"
                      required
                      min={1}
                      max={5000}
                      onChange={(e) =>
                        handleChangefoods("amount", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>

              <div className="flex-grow flex flex-col gap-2 justify-end ">
                <button
                  className="bg-[#333333] w-fit hover:bg-[#4a4a4a] text-[#e0e0e0] p-2 rounded-md transition duration-300"
                  onClick={prevStep}>
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-full h-fit font-semibold text-[16px] bg-blue-600 hover:bg-blue-500 transition duration-200 text-white p-2 rounded-md"
                  disabled={isLoading}>
                  Create ✅
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateEvents;
