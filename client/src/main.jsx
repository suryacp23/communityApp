import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { SocketContextProvider } from "./context/socketContext.jsx";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SocketContextProvider>
					<App />
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					<ToastContainer />
				</SocketContextProvider>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
