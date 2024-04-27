"use client";

import React from "react";
import EventStatsTile from "@/components/EventStatsTile";
import MemberList from "@/components/MemberList";
import MemberRequest from "@/components/MemberRequest";
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie('token');

function clubDashboard({})
{
  const [members, setMembers] = useState<Record<string, any>>({});
  const [clubData, setclubData] = useState<Record<string, any>>({});
  const [events, setEvents] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/admin/getClubData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(data => {
      setclubData(data.message);
      if (data.message.Members && Array.isArray(data.message.Members)) {
        setMembers(data.message.Members);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
    if (clubData.Name) {  
      fetch(`${BACKEND_URL}/api/getEvents?ClubName=${clubData.Name}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        setEvents(data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }}
  , [clubData]);

  let club_name: string = clubData.Name;
  let member_count: string = "0";
  if (clubData.Members && Array.isArray(clubData.Members))
    member_count = clubData.Members.length.toString();
  let percent_incr: string = "1";
  let last_month: string = "January";

  return (
    <>
    <div className="flex justify-center items-center">
     <div className="flex flex-col h-full w-[95%] p-6">
      <div className="flex text-3xl text-black font-bold font-poppins text-wrap py-5">{club_name}</div>
      <div className="flex flex-col w-full">
        <div className="text-2xl text-black font-medium font-poppins pb-5">Club Statistics</div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-between items-center w-full pb-5">
            <div className="flex flex-col bg-white rounded-md h-24 w-28 justify-center items-center group">
              <div className="text-4xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-br from-[#FF0000] to-[#FF00D6] transform transition-all duration-100 group-hover:scale-125 group-hover:translate-y-2 cursor-pointer">{member_count}</div>
              <div className="w-11/12 text-sm font-bold font-poppins text-center transition-all duration-100 group-hover:scale-75 group-hover:translate-y-2 cursor-pointer">Total Members</div>
            </div>
            <div className="flex flex-col bg-white rounded-md h-24 w-28 justify-center items-center group">
              <div className="text-4xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-br from-[#FF0000] to-[#FF00D6] transform transition-all duration-100 group-hover:scale-125 group-hover:translate-y-2 cursor-pointer">{percent_incr}%</div>
              <div className="w-11/12 text-sm font-bold font-poppins text-center transition-all duration-100 group-hover:scale-75 group-hover:translate-y-2 cursor-pointer">Increase over {last_month}</div>
            </div>
          </div>
          {/* <div className="flex flex-col pb-5 w-full">
            <div className=" bg-white rounded-md  h-[15rem]">
              <div className="text-lg font-bold font-poppins text-center m-3">Member Fluctuation</div>
            </div>
          </div> */}
          <div className="flex flex-col pb-5 w-full">
            <div className=" bg-white rounded-md h-[15rem]">
              <div className="text-lg font-bold font-poppins text-center m-3">Event Performance</div>
              <div className="flex flex-col justify-center items-center">
                {
                  Object.keys(events).map((key) => {
                    let participant_count = 0;
                    if (events[key].JoinedUsers && Array.isArray(events[key].JoinedUsers))
                      participant_count = events[key].JoinedUsers.length;
                    return (
                      <EventStatsTile key={key} date={events[key].startDate} title={events[key].Title} participant_count={participant_count} />
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <MemberList members={members}/>
        <MemberRequest/>
      </div>
     </div>
     </div>
    </>
  )
}

export default clubDashboard;