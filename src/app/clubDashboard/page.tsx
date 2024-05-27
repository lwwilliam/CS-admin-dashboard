"use client";

import React from "react";
import EventStatsTile from "@/components/EventStatsTile";
import MemberList from "@/components/MemberList";
import MemberRequest from "@/components/MemberRequest";
import StatsTile from "@/components/StatsTile";
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import ClubFundsTile from "@/components/ClubFundsTile";
import ClubFundsLogsTile from "@/components/ClubFundsLogsTile";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie('token');

function ClubDashboard({})
{
  const [members, setMembers] = useState<Record<string, any>>({});
  const [clubData, setclubData] = useState<Record<string, any>>({});
  const [events, setEvents] = useState<Record<string, any>>({});
  const [clubFunds, setClubFunds] = useState("0");

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
      if (data.message.TotalFunds) {
        setClubFunds(data.message.TotalFunds);
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

  const handleFundsUpdate = (updatedFunds: string) => {
    setClubFunds(updatedFunds);
  };

  return (
    <>
    <div className="flex justify-center items-center">
      <div className="flex flex-col h-full w-[95%] p-6">
        <div className="flex text-3xl text-black font-bold font-poppins text-wrap py-5">{club_name}</div>
        <div className="flex flex-col w-full">
          <div className="text-3xl text-black font-bold font-poppins text-wrap py-5">Club Performance</div>
          <div className="flex flex-row justify-between items-center pb-10">
            <div className="flex flex-col justify-center items-center w-full">
              <StatsTile stat={member_count} desc={"Total Members"}/>
              <StatsTile stat={percent_incr + "%"} desc={"Increase over " + last_month}/>
            </div>
            <div className="flex flex-col pr-10 w-full">
              <div className=" bg-white rounded-md  h-[25rem]">
                <div className="text-lg font-bold font-poppins text-center m-3">Member Fluctuation</div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className=" bg-white rounded-md h-[25rem]">
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
        <div className="flex justify-between pb-10">
          <MemberList members={members}/>
          <MemberRequest/>
        </div>
        <div className="flex justify-between pb-10">
            <ClubFundsTile fundAmount={parseInt(clubFunds)} updateFunds={handleFundsUpdate}/>
            <ClubFundsLogsTile clubFunds={clubFunds} updateFunds={handleFundsUpdate} fundAmount={parseInt(clubFunds)}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default ClubDashboard;