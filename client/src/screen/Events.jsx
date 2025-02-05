import { ToastContainer } from "react-toastify";
import EventList from "../components/EventList";
import Header from "../components/Header";

const Events = () => (
  <div className="w-full h-screen">
    <Header />
    <section>
      <EventList />
    </section>
    <ToastContainer />
  </div>
);
export default Events;
