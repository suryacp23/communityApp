import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { checkAttendance } from "../../services/api";

const QrScanner = () => {
	const { data } = useQuery({
		queryKey: ["checkattendance"],
		queryFn: checkAttendance,
	});
	const html5QrCode = useRef(null);
	const config = { fps: 20, qrbox: { width: 300, height: 300 } };

	const startScanner = () => {
		if (html5QrCode.current) {
			try {
				console.log("Starting QR code scanner...");
				html5QrCode.current.start(
					{ facingMode: "user" },
					config,
					(decodedText, decodedResult) => {
						console.log(decodedText);
						checkAttendance(eventId, decodedText);
					}
				);
			} catch (error) {
				toast.error("Error starting scanner: " + error);
			}
		} else {
			toast.error("Scanner is not initiated properly");
		}
	};

	const stopScanner = () => {
		if (html5QrCode.current) {
			html5QrCode.current
				.stop()
				.then(() => {
					console.log("qr stopped scanning");
				})
				.catch(() => {
					console.log("Error stopping the scanner");
				});
		} else {
			toast.warning("Scanner is not running");
		}
	};
	useEffect(() => {
		html5QrCode.current = new Html5Qrcode("reader");
	}, []);
	return (
		<div>
			<div id="reader"></div>
			<button onClick={startScanner}>Start scanning</button>
			<button onClick={stopScanner}>Stop scanning</button>
		</div>
	);
};

export default QrScanner;
