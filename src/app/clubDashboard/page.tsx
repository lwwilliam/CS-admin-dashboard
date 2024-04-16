import React from "react";
import EventStatsTile from "@/components/EventStatsTile";

function clubDashboard({})
{

  let club_name: String = "Sunway CPA Australian Charter SCSC"
  let member_count: String = "250"

  let percent_incr: String = "5"
  let last_month: String = "February"

  return (
    <>
     <div className="flex flex-col h-full w-full p-6">
      <div className="flex text-3xl text-black font-bold font-poppins text-wrap py-5">{club_name}</div>
      <div className="flex flex-col w-full">
        <div className="text-2xl text-black font-medium font-poppins pb-5">Statistics</div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between items-center w-[80%] pb-5">
            <div className="flex flex-col bg-white rounded-md h-24 w-28 justify-center items-center group">
              <div className="text-4xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-br from-[#FF0000] to-[#FF00D6] transform transition-all duration-100 group-hover:scale-125 group-hover:translate-y-2 cursor-pointer">{member_count}</div>
              <div className="w-11/12 text-sm font-bold font-poppins text-center transition-all duration-100 group-hover:scale-75 group-hover:translate-y-2 cursor-pointer">Total Members</div>
            </div>
            <div className="flex flex-col bg-white rounded-md h-24 w-28 justify-center items-center group">
              <div className="text-4xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-br from-[#FF0000] to-[#FF00D6] transform transition-all duration-100 group-hover:scale-125 group-hover:translate-y-2 cursor-pointer">{percent_incr}%</div>
              <div className="w-11/12 text-sm font-bold font-poppins text-center transition-all duration-100 group-hover:scale-75 group-hover:translate-y-2 cursor-pointer">Increase over {last_month}</div>
            </div>
          </div>
          <div className="flex flex-col pb-5 w-[80%]">
            <div className=" bg-white rounded-md  h-[15rem]">
              <div className="text-lg font-bold font-poppins text-center m-3">Member Fluctuation</div>
            </div>
          </div>
          <div className="flex flex-col pb-5 w-[80%]">
            <div className=" bg-white rounded-md h-[15rem]">
              <div className="text-lg font-bold font-poppins text-center m-3">Event Performance</div>
              <div className="flex flex-col justify-center items-center">
                <EventStatsTile date={new Date("2019-02-3")} title="SCSC Monthly Meetup" participant_count={69} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex justify-between">
          <div>All Members</div>
          <div className="bg-white rounded"></div>
          <div className="bg-red">Add Member</div>
        </div>
        <div>

        </div>

      </div>
     </div>
    </>
  )
}

export default clubDashboard;