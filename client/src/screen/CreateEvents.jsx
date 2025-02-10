import { useRef, useState } from "react";
import { FaUsers, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdEmojiEvents } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../services/api";
import Spinner from "../components/Spinner.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
		eventName: "",
		description: "",
		imageUrl: "",
		eventDate: "",
		startTime: "",
		endTime: "",
		technical: [],
		nonTechnical: [],
		swags: false,
		refreshments: false,
		paid: false,
		amount: 0,
		technicalInput: "",
		nonTechnicalInput: "",
		technicalLimitInput: "",
		nonTechnicalLimitInput: "",
		user: user._id,
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
		if (!file) {
			toast.info("Please upload the event poster!", { autoClose: 1500 });
			return;
		}
		if (
			!formData.startTime ||
			!formData.endTime ||
			!formData.startTime ||
			!formData.eventName ||
			!formData.description
		) {
			toast.info("Please fill all the details", { autoClose: 1500 });
			return;
		}
		if (formData.technical.length === 0 && formData.nonTechnical.length === 0) {
			toast.info("There should be atleast 1 Sub-Event!", {
				autoClose: 2000,
			});
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
		data.append("paid", formData.paid);
		data.append("refreshments", formData.refreshments);
		data.append("amount", formData.amount);
		data.append("swags", formData.swags);
		data.append("technicalEvents", JSON.stringify(formData.technical));
		data.append("nonTechnicalEvents", JSON.stringify(formData.nonTechnical));
		for (var pair of data.entries()) {
			
		}
		mutate(data);
	};
	const { mutate, isPending } = useMutation({
		mutationFn: (formData) => createEvent(formData),
		onSuccess: (data) => {
		
			toast.success(data?.message);
			navigate("/events");
		},
		onError: (error) => toast.error(error.message),
	});
	const updateInput = (field, value) => {
		setFormData((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	// Add event to the respective field (technical or nonTechnical)
	const addEvent = (field, event, limit) => {
		if (event && event.trim()) {
			setFormData((prevState) => {
				if (prevState[field].length < 5) {
					return {
						...prevState,
						[field]: [...prevState[field], { name: event, limit: limit || 0 }],
						[`${field}Input`]: "",
						[`${field}LimitInput`]: "", // Clear the input after adding
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
		
		
	};
	const BackButton = () => {
		return (
			<button
				onClick={() => navigate(-1)}
				className="px-4 py-2 w-fit top-2 left-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
			>
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
							<div key={index} className="relative flex flex-col items-center w-full">
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
									}`}
								>
									{step > index + 1 ? <FaCheck /> : <Icon />}
								</div>
								<span className="text-sm sm:block hidden">{stepItem?.label}</span>
							</div>
						);
					})}
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col relative h-[450px] md:h-[500px]  overflow-y-auto w-full "
				>
					{step === 1 && (
						<div className="flex flex-col py-5  gap-5 h-full  md:p-4 md:bg-[#1a1a1a] text-[#e0e0e0] rounded-lg shadow-lg">
							<h2 className="text-lg text-center font-semibold text-[#f0f0f0]">
								Event Details
							</h2>

							{/* Event Name Input */}
							<div className="flex flex-col gap-1 sm:gap-2">
								<div className="input-group">
									<input
										type="text"
										className="w-full px-3 py-2 lg:py-3 border border-[#333333] rounded-md hover:border-[#7e7d7d] outline-none focus:border-[#4a90e2]  bg-transparent text-[#e0e0e0] placeholder-[#888888] duration-100"
										value={formData?.eventName}
										required
										onChange={(e) => handleChange("eventName", e.target.value)}
									/>
									<label htmlFor="" className="bg-transparent">
										Event name
									</label>
								</div>
							</div>

							{/* Description Textarea */}
							<div className="flex flex-col gap-1 sm:gap-2">
								<div className="input-group">
									<textarea
										className="w-full px-3 py-2 border border-[#333333] hover:border-[#7e7d7d] rounded-md outline-none  focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]  max-h-[80px]"
										value={formData?.description}
										required
										onChange={(e) => handleChange("description", e.target.value)}
									/>
									<label htmlFor="">Description</label>
								</div>
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
								<DatePicker
									selected={formData?.eventDate}
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
										selected={formData?.startTime}
										onChange={(time) => {
										
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
										selected={formData?.endTime}
										onChange={(time) => {
											handleChange("endTime", time);
										}}
									/>
								</div>
							</div>

							{/* Next Button */}
							<button
								type="button"
								className="w-fit ml-auto  bg-[#4a90e2] hover:bg-[#3b7ccc] text-[#e0e0e0]  px-3 py-2 rounded-md transition duration-300"
								onClick={nextStep}
							>
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
								<h3 className="text-lg font-semibold">Technical events</h3>
								<div className=" w-full p-0.5 flex flex-col">
									<div className=" w-full flex  gap-2 justify-between items-center">
										{/* technical event name */}
										<input
											type="text"
											placeholder="Enter event name"
											value={formData?.technicalInput}
											maxLength={20}
											onChange={(e) => updateInput("technicalInput", e.target.value)}
											className="p-2 md:px-5 w-[80%] text-[14px] h-10 border border-[#333333] hover:border-[#7e7d7d]  rounded-md focus:outline-none  focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
										/>
										{/* technical member limit */}

										<div className="input-group w-20">
											<input
												type="number"
												className="p-2 md:px-5 text-[14px] w-full h-10 border border-[#333333] hover:border-[#7e7d7d]  rounded-md focus:outline-none   focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
												value={formData?.technicalLimitInput}
												onChange={(e) =>
													setFormData({
														...formData,
														technicalLimitInput:
															e.target.value === "" ? "" : parseInt(e.target.value),
													})
												}
												min={1}
												required
											/>
											<label htmlFor="">Limit</label>
										</div>

										<button
											type="button"
											className="bg-[#333333]  text-lg hover:bg-[#4a4a4a] text-[#e0e0e0] h-10 w-12 lg:h-12 lg:w-12 rounded-md transition duration-300"
											onClick={() =>
												addEvent(
													"technical",
													formData?.technicalInput,
													formData?.technicalLimitInput
												)
											}
										>
											+
										</button>
									</div>
									<div className=" grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
										{formData?.technical.map((event, index) => (
											<div
												key={index}
												className="flex bg-zinc-500 gap-2 border outline-none border-gray-600 pl-3 pr-2 py-1 rounded-md"
											>
												<div className="flex justify-between flex-grow text-[#f0f0f0] text-[14px]">
													<p>
														<span className="text-black font-semibold">Name: </span>{" "}
														{event?.name}
													</p>
													<p>
														<span className="text-black font-semibold">Limit: </span>{" "}
														{event?.limit}
													</p>
												</div>
												<button
													type="button"
													className="text-black ml-auto opacity-85 hover:text-white duration-100 text-xs  hover:opacity-100"
													onClick={() => deleteEvent("technical", index)}
												>
													X
												</button>
											</div>
										))}
									</div>
								</div>

								{/* Non-Technical Events */}
								<div className=" w-full flex flex-col gap-3 border-t-2 border-white border-opacity-25 pt-2">
									<h3 className="text-lg font-semibold">Non-technical events</h3>
									<div className=" w-full flex  gap-2 justify-between items-center">
										{/* nonTechnical event name */}
										<input
											type="text"
											placeholder="Enter event name"
											value={formData?.nonTechnicalInput}
											maxLength={20}
											onChange={(e) => updateInput("nonTechnicalInput", e.target.value)}
											className="p-2 md:px-5 w-[80%] text-[14px] h-10 border border-[#333333] hover:border-[#7e7d7d]  rounded-md focus:outline-none  focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
										/>
										{/* nonTechnical member limit */}

										<div className="input-group w-20">
											<input
												type="number"
												className="p-2 md:px-5 text-[14px] w-full h-10 border border-[#333333] hover:border-[#7e7d7d]  rounded-md focus:outline-none   focus:border-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888]"
												value={formData?.nonTechnicalLimitInput}
												onChange={(e) =>
													setFormData({
														...formData,
														nonTechnicalLimitInput:
															e.target.value === "" ? "" : parseInt(e.target.value),
													})
												}
												min={1}
												required
											/>
											<label htmlFor="">Limit</label>
										</div>

										<button
											type="button"
											className="bg-[#333333]  text-lg hover:bg-[#4a4a4a] text-[#e0e0e0] h-10 w-12 lg:h-12 lg:w-12 rounded-md transition duration-300"
											onClick={() =>
												addEvent(
													"nonTechnical",
													formData?.nonTechnicalInput,
													formData?.nonTechnicalLimitInput
												)
											}
										>
											+
										</button>
									</div>
									<div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
										{formData.nonTechnical.map((event, index) => (
											<div
												key={index}
												className="w-full flex bg-zinc-500 gap-2 border outline-none border-gray-600 pl-3 pr-2 py-1 rounded-md"
											>
												<div className="flex justify-between flex-grow text-[#f0f0f0] text-[14px]">
													<p>
														<span className="text-black font-semibold">Name: </span>{" "}
														{event?.name}
													</p>
													<p>
														<span className="text-black font-semibold">Limit: </span>{" "}
														{event?.limit}
													</p>
												</div>
												<button
													type="button"
													className="text-black ml-auto opacity-85 hover:text-white duration-100 text-xs  hover:opacity-100"
													onClick={() => deleteEvent("nonTechnical", index)}
												>
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
									onClick={prevStep}
								>
									← Back
								</button>
								<button
									className="bg-[#4a90e2] hover:bg-[#3b7ccc] text-[#f0f0f0] px-3 py-2 rounded-md transition duration-300"
									onClick={nextStep}
								>
									Next →
								</button>
							</div>
						</div>
					)}

					{step === 3 && (
						<div className="flex h-full flex-col gap-4  text-sm text-[#e0e0e0] ">
							<h2 className="text-lg font-semibold">Refereshments And Swags</h2>
							<div className="  bg-[#2b2b2b] flex flex-col gap-4 sm:text-lg  rounded-md p-4">
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										id="refreshment"
										checked={formData?.refreshments}
										onChange={(e) => handleChangefoods("refreshments", e.target.value)}
									/>
									<div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
									<span className="ml-3 text-sm font-medium text-white">Refreshments</span>
								</label>

								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										id="Swags"
										checked={formData?.swags}
										onChange={(e) => handleChangefoods("swags", e.target.value)}
									/>
									<div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
									<span className="ml-3 text-sm font-medium text-white">Swags</span>
								</label>
							</div>
							<h2 className="text-lg font-semibold">Payment</h2>
							<div className="bg-[#2b2b2b]  rounded-md p-4">
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										id="paid"
										checked={formData?.paid}
										onChange={(e) => handleChangefoods("paid", e.target.value)}
									/>
									<div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
									<span className="ml-3 text-sm font-medium text-white">Paid</span>
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
											value={formData?.amount}
											className=" w-1/2 sm:w-1/3 p-2  border border-[#333333] rounded-md outline-none focus:ring-1 focus:ring-[#4a90e2] bg-[#222222] text-[#e0e0e0] placeholder-[#888888] "
											placeholder="Enter the amount"
											required
											min={1}
											max={5000}
											onChange={(e) => handleChangefoods("amount", e.target.value)}
										/>
									</div>
								)}
							</div>

							<div className="flex-grow flex flex-col gap-2 justify-end ">
								<button
									className="bg-[#333333] w-fit hover:bg-[#4a4a4a] text-[#e0e0e0] p-2 rounded-md transition duration-300"
									onClick={prevStep}
								>
									← Back
								</button>
								<button
									type="submit"
									className={`w-full  h-10 font-semibold text-[16px] bg-blue-600 hover:bg-blue-500 transition duration-200 text-white p-2 rounded-md`}
									disabled={isPending}
								>
									{!isPending ? "Create ✅" : <Spinner size="sm" />}
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
