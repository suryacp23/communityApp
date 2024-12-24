
import Navbar from "../../components/bigcomponents/Navbar";

const CreateEvents = () => {
  return (
    <div className=" h-screen w-screen flex-col bg-background flex items-center font-mochiy select-none ">
      <Navbar />
      <form className="flex flex-col justify-between items-center gap-4  w-[60vw] h-screen mx-auto p-5 overflow-y-scroll scroll-smooth ">
        <h1 className="text-2xl"> Events Deatails</h1>

        <div className="flex flex-col gap-4 h-4/5 w-4/5 justify-between items-center  bg-primary p-5 rounded-md">
          <input
            type="text"
            placeholder="Event Name"
            className="p-1 h-10 w-5/6 rounded-md text-black bg-gray-400 placeholder-gray-800"
            required
          />
          <textarea
            name=""
            placeholder="Event Descrpition"
            className="p-1 max-h-20 min-h-20 w-5/6 rounded-md text-black bg-gray-400 placeholder-gray-800"
            required
          />
          <input
            type="file"
            placeholder="upload image "
            className="p-1 h-10 w-5/6 rounded-md text-black bg-gray-400  "
            required
          />
          <div className="h-1 w-[90%] bg-gray-400"></div>
          <div className="flex flex-col gap-2  h-full w-5/6 justify-between items-start">
            <label htmlFor="eventdate">EventDate</label>
            <input
              type="date"
              id="eventdate"
              placeholder=""
              className="p-1 h-10 w-full bg-gray-400 text-black rounded-md"
              required
            />

            <div className="flex gap-2   h-full w-full justify-center items-start">
              <div className="flex flex-col gap-2 h-1/2 w-full  justify-between items-start">
                <label htmlFor="starttime">Start Time</label>
                <input
                  type="time"
                  id="starttime"
                  placeholder="start time"
                  className="p-1 h-10 w-52 rounded-md text-black bg-gray-400 "
                  required
                />
              </div>
              <div className="flex flex-col gap-2 h-2/3 w-full justify-between items-start">
                <label htmlFor="endtime">End Time</label>
                <input
                  type="time"
                  id="endtime"
                  placeholder=" end time"
                  className="p-1 h-10 w-52 rounded-md  bg-gray-400 text-gray-800"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-5/6 w-4/5 items-start bg-primary p-5 rounded-md">
          <h1>Sub Events</h1>

          <div className="h-4/5 w-[98%] flex flex-col gap-6 p-5 justify-center items-start ">
            <h3>i. Technical Events</h3>
            <div className="grid grid-cols-2 gap-4  ">
              <input
                type="text"
                placeholder="Sub Event 1"
                className="p-1 h-10 w-60 rounded-md  text-black bg-gray-400 placeholder-gray-800"
              />
              <input
                type="text"
                placeholder="Sub Event 2"
                className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800"
              />
              <input
                type="text"
                placeholder="Sub Event 3"
                className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800 "
              />
              <input
                type="text"
                placeholder="Sub Event 4"
                className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800"
              />
            </div>
            <h3>ii. Non-Technical Events</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Sub Event 1"
                className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800"
              />
              <input
                type="text"
                placeholder="Sub Event 2"
                className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800"
              />
              <input
                type="text"
                placeholder="Sub Event 3"
                className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800"
              />
              <input
                type="text"
                placeholder="Sub Event 4"
                className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 h-2/5 w-4/5 justify-between items-start  bg-primary p-5 rounded-md ">
          <h1>Foods & Refreshments</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input type="checkbox" className="p-3" />
              <label htmlFor="Launch">Launch</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="p-44" />
              <label htmlFor="Snacks">Snacks</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-5/6 w-4/5 items-start bg-primary p-5 rounded-md">
          <h3>Swags & Goodies</h3>

          <div className="grid grid-cols-2 gap-4  ">
            <input
              type="text"
              placeholder="Swags"
              className="p-1 h-10 w-60 rounded-md  text-black bg-gray-400 placeholder-gray-800"
            />
            <input
              type="text"
              placeholder="Goodies"
              className="p-1 h-10 w-60 rounded-md text-black bg-gray-400 placeholder-gray-800"
            />
          </div>
        </div>

        <button className="bg-violet-500 text-white p-2 rounded-md w-40">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
