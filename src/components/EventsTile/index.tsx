import React from "react";
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

import Modal from "@/components/Modal";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie('token');

type EventsTileProps = {
  clubName: string
}

type Event = {
  title: string
  startDate: string
  endDate: string
  participants: number
}

type EventProps = {
  event: Event
}

function Event({event}: EventProps) {

  const p = () => {

  }

  return (
    <>
      <button className="grid grid-cols-6 gap-4 px-4 font-poppins font-medium pb-3 w-full group"
      onClick={p}>
        <div className='text-center col-span-3 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {event.title}
        </div>
        <div className='text-center col-span-1 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {new Date(event.startDate).toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric'})}
          </div>
        <div className='text-center col-span-1 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {new Date(event.endDate).toLocaleDateString(undefined, {day: '2-digit', month: 'short', year: 'numeric'})}
        </div>
        <div className='text-center col-span-1 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {event.participants}
        </div>
      </button>
    </>
  );
}

function EventsTile({clubName}: EventsTileProps) {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [events, setEvents] = useState<Record<string, any>>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const itemsPerPage = 8;

  const fetchEvents = () => {
    if (clubName) {
      fetch(`${BACKEND_URL}/api/getEvents?ClubName=${clubName}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        setEvents(data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [clubName, fetchTrigger])

  return (
    <>
      <div className='flex flex-col pb-5 md:pb-0'>
        <div className="flex flex-col md:flex-row justify-center md:justify-between pb-8">
          <div className='flex text-xl md:text-3xl text-black font-bold font-poppins text-wrap items-center pb-5 md:pb-0'>Events</div>
          <button onClick={fetchEvents}
            className="flex bg-[#e6dcd5] rounded-lg h-12 md:w-[15rem] text-xl font-medium
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
          <div className="grid w-full">
            {
              events && Object.keys(events)
                .reverse()
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((key) => {
                  
                  let participants = 0;
                  if (events[key].JoinedUsers && Array.isArray(events[key].JoinedUsers))
                    participants = events[key].JoinedUsers.length;

                  let e: Event = {
                    title: events[key].Title,
                    startDate: events[key].startDate,
                    endDate: events[key].endDate,
                    participants: participants
                  };

                  return (
                    <Event key={key} event={e}/>
                  );

                })
            
            }
          </div>
        </div>
        <div className="flex flex-row justify-end pt-5">
          <button onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex bg-[#e6dcd5] rounded-lg h-10 w-12 text-lg font-bold
          text-center justify-center items-center transition-all duration-100
          hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer mr-5">{"<"}</button>
          <div className="flex text-lg font-bold justify-center items-center mr-5">Page {currentPage}</div>
          <button onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(Object.keys(events).length / itemsPerPage)}
          className="flex bg-[#e6dcd5] rounded-lg h-10 w-12 text-lg font-bold
          text-center justify-center items-center transition-all duration-100
          hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer">
            {">"}</button>
        </div>
      </div>
    </>
  );
}

export default EventsTile;