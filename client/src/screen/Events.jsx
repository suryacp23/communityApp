import { ToastContainer } from "react-toastify";
import EventList from "../components/EventList";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

const Events = () => (
  <div className="w-full h-screen">
    <Header />
    <section>
      <EventList />
      <ScrollToTop />
    </section>
    <ToastContainer />
  </div>
);
export default Events;
