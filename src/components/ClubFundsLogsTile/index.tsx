


function ClubFundsLogsTile() {

  function deallocSelected() {

  }


  return (
    <>
      <div className='flex flex-col'>
        <div className="flex flex-row justify-between pb-8">
          <div className='flex text-3xl text-black font-bold font-poppins text-wrap items-center'>Fund Allocation Log</div>
          <button onClick={deallocSelected}
            className="flex bg-[#FF5E5E] rounded-lg h-12 w-[15rem] text-xl font-medium
                      text-center justify-center items-center transition-all duration-100
                      hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer">Deallocate Selected</button>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-8 h-[25rem] md:w-[20rem] lg:w-[30rem] xl:w-[70rem] items-center">
          <div className="grid grid-cols-6 gap-4 border-b-2 border-black px-4 font-poppins font-medium pb-3 mb-4 w-full">
            <div className='text-center col-span-4'>Purpose</div>
            <div className='text-center col-span-1'>Allocated</div>
            <div className='text-center col-span-1'>Select</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubFundsLogsTile;