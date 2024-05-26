


function EventsTile() {

  function newEvent() {

  }

  return (
    <>
      <div className='flex flex-col'>
        <div className="flex flex-row justify-between pb-8">
          <div className='flex text-3xl text-black font-bold font-poppins text-wrap items-center'>Events</div>
          <button onClick={newEvent}
            className="flex bg-[#e6dcd5] rounded-lg h-12 w-[10rem] text-xl font-medium
                      text-center justify-center items-center transition-all duration-100
                      hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer">New Event</button>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-8 h-[25rem] md:w-[15rem] lg:w-[20rem] xl:w-[60rem] items-center">
          <div className="grid grid-cols-6 gap-4 border-b-2 border-black px-4 font-poppins font-medium pb-3 mb-4 w-full">
            <div className='text-center col-span-3'>Title</div>
            <div className='text-center col-span-1'>Start Date</div>
            <div className='text-center col-span-1'>End Date</div>
            <div className='text-center col-span-1'>No. Participants</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsTile;