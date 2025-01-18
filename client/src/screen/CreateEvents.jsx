import { useState } from "react";
import {
  FaUsers,
  FaUserFriends,
  FaLink,
  FaCog,
  FaCheckCircle,
  FaCheck,
} from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../services/api";
import Spinner from "../components/Spinner.jsx";

const steps = [
  { label: "Group Details", icon: FaUsers },
  { label: "Sub Events", icon: MdEmojiEvents },
  { label: "foods", icon: IoFastFoodSharp },
];

const CreateEvents = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    imageUrl: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    technical: [],
    nonTechnical: [],
    lunch: false,
    snacks: false,
    swags: false,
    certificate: false,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: createEvent,
  });
  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangefoods = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value === "on" ? !prev[name] : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
    console.log(formData);
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

  // Delete an event from the respective field
  const deleteEvent = (field, index) => {
    setFormData((prevState) => {
      const updatedEvents = prevState[field].filter((_, idx) => idx !== index);
      return { ...prevState, [field]: updatedEvents };
    });
  };
  const nextStep = () => {
    if (step < steps.length) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 text-sm md:text-base lg:text-lg">
      <div className="bg-primary shadow-lg p-6 sm:p-8 rounded-lg w-full max-w-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between relative gap-4 text-white">
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

        <form onSubmit={handleSubmit} className="flex flex-col h-full w-full ">
          {step === 1 && (
            <div className="flex flex-col gap-5  md:p-4 md:bg-[#1a1a1a] text-[#e0e0e0] rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-[#f0f0f0]">
                Event Details
              </h2>

              {/* Event Name Input */}
              <input
                type="text"
                className="w-full px-3 py-2 lg:py-3 border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
                placeholder="Enter group name"
                value={formData.eventName}
                onChange={(e) => handleChange("eventName", e.target.value)}
              />

              {/* Description Textarea */}
              <textarea
                className="w-full px-3 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888] min-h-[80px] max-h-[80px]"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />

              {/* Image Upload */}
              <input
                className="h-10 lg:h-12 w-full bg-[#222222] text-[#e0e0e0] rounded-md cursor-pointer border border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
                type="file"
                onChange={(e) => handleChange("imageUrl", e.target.files[0])}
              />

              {/* Event Date */}
              <input
                type="date"
                className="h-10 lg:h-12 px-3 w-full border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
                onChange={(e) => handleChange("eventDate", e.target.value)}
              />

              {/* Time Inputs (Start and End Time) */}
              <div className="flex gap-4 w-full flex-col md:flex-row md:justify-between">
                <div className=" w-full md:w-1/2 flex flex-col gap-1">
                  <label className="text-sm text-[#cccccc]">Start Time</label>
                  <input
                    className="h-10 lg:h-12 w-full rounded-md px-3 border border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0]"
                    type="time"
                    onChange={(e) => handleChange("startTime", e.target.value)}
                  />
                </div>
                <div className=" w-full md:w-1/2 flex flex-col gap-1">
                  <label className="text-sm text-[#cccccc]">End Time</label>
                  <input
                    className="h-10 lg:h-12 w-full rounded-md px-3 border border-[#333333] focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0]"
                    type="time"
                    onChange={(e) => handleChange("endTime", e.target.value)}
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                className="w-full bg-[#4a90e2] hover:bg-[#3b7ccc] text-[#e0e0e0] font-semibold p-3 rounded-md transition duration-300"
                onClick={nextStep}>
                Next →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-2 md:gap-4 p-0 md:p-6  md:bg-[#1a1a1a] text-[#e0e0e0] rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-[#f0f0f0]">
                Sub Events
              </h2>

              {/* Technical Events */}
              <div className="h-full w-full">
                <div className="h-1/4 w-full md:w-5/6 flex p-1 justify-between items-center">
                  <input
                    type="text"
                    placeholder="Enter technical events"
                    value={formData.technicalInput}
                    onChange={(e) =>
                      updateInput("technicalInput", e.target.value)
                    }
                    className="p-2 md:px-5 h-10 lg:h-12 border border-[#333333] w-5/6 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
                  />
                  <button
                    className="bg-[#333333] hover:bg-[#4a4a4a] text-[#e0e0e0] h-10 w-7 md:w-10 lg:h-12 lg:w-12 rounded-md transition duration-300"
                    onClick={() =>
                      addEvent("technical", formData.technicalInput)
                    }>
                    +
                  </button>
                </div>

                <div className=" h-full w-full grid md:grid-cols-2 mt-3">
                  {formData.technical.map((event, index) => (
                    <div key={index} className="flex justify-between p-1 ">
                      <span className=" bg-[#1e1c1c]  text-[#f0f0f0] border px-2 py-1 rounded-full flex max-w-[90%] justify-between items-center">
                        <p className="h-fit max-w-[90%] p-2 break-words   whitespace-pre-wrap">
                          {event}
                        </p>
                        <button
                          className="text-[#ff5c5c] opacity-85 p-1 rounded-md hover:opacity-100"
                          onClick={() => deleteEvent("technical", index)}>
                          X
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Technical Events */}
              <div className="h-full w-full">
                <div className="h-1/4 w-full md:w-5/6 flex p-1 justify-between items-center">
                  <input
                    type="text"
                    placeholder="Enter non-technical events"
                    value={formData.nonTechnicalInput}
                    onChange={(e) =>
                      updateInput("nonTechnicalInput", e.target.value)
                    }
                    className="p-2 md:px-5 h-10 lg:h-12 border border-[#333333] w-5/6 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
                  />
                  <button
                    className="bg-[#333333] hover:bg-[#4a4a4a] text-[#e0e0e0] h-10 w-7   md:w-10  lg:h-12 lg:w-12 rounded-md transition duration-300"
                    onClick={() =>
                      addEvent("nonTechnical", formData.nonTechnicalInput)
                    }>
                    +
                  </button>
                </div>
                <div className=" grid md:grid-cols-2  mt-3">
                  {formData.nonTechnical.map((event, index) => (
                    <div key={index} className="flex justify-between mt-2">
                      <span className=" bg-[#1e1c1c]  text-[#f0f0f0] text-center   border p-1 rounded-full flex max-w-[90%] justify-between items-center">
                        <p className="h-full w-full p-2 max-w-[90%] break-words whitespace-pre-wrap text-center">
                          {event}
                        </p>
                        <button
                          className="text-[#ff5c5c] opacity-85 p-1 rounded-md hover:opacity-100"
                          onClick={() => deleteEvent("nonTechnical", index)}>
                          X
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4">
                <button
                  className="bg-[#333333] hover:bg-[#4a4a4a] text-[#e0e0e0] p-2 rounded-md transition duration-300"
                  onClick={prevStep}>
                  ← Back
                </button>
                <button
                  className="bg-[#4a90e2] hover:bg-[#3b7ccc] text-[#f0f0f0] p-2 rounded-md transition duration-300"
                  onClick={nextStep}>
                  Next →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 text-[#e0e0e0] ">
              <h2 className="text-lg font-semibold">Foods and Referencement</h2>
              <div className="p-3 border bg-[#222222] ">
                <div className=" h-1/5 w-2/5 md:w-2/6 flex gap-2 justify-between items-center p-1">
                  <label htmlFor="lunch" className="flex text-right ">
                    Lunch
                  </label>
                  <input
                    type="checkbox"
                    id="lunch"
                    onChange={(e) => handleChangefoods("lunch", e.target.value)}
                  />
                </div>
                <div className=" h-1/5  w-2/5 md:w-2/6  flex gap-2 justify-between  items-center py-1">
                  <label htmlFor="snacks" className="flex ">
                    Snacks
                  </label>
                  <input
                    type="checkbox"
                    name="snacks"
                    id="snacks"
                    className=" border rounded-md "
                    onChange={(e) =>
                      handleChangefoods("snacks", e.target.value)
                    }
                  />
                </div>
              </div>
              <h2>Swags and Goodies</h2>
              <div className="p-3 border bg-[#222222]  ">
                <div className="flex h-1/5 w-3/6 md:w-2/6 justify-between py-1">
                  <label htmlFor="certificate">Certificate</label>
                  <input
                    type="checkbox"
                    id="certificate"
                    onChange={(e) =>
                      handleChangefoods("certificate", e.target.value)
                    }
                  />
                </div>
                <div className="flex h-1/5 w-3/6  md:w-2/6 justify-between py-1">
                  <label htmlFor="swags">Swags</label>
                  <input
                    type="checkbox"
                    id="swags"
                    onChange={(e) => handleChangefoods("swags", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded-md"
                  disabled={isLoading}>
                  Submit ✅
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
