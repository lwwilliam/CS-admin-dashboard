import React from "react";
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie('token');


type AnnouncementProps = {
  date: Date
  title: string
}

function Announcment({date, title}: AnnouncementProps) {

  function editAnnouncement() {

    


    return;
  }


  return (
    <>
      <button className="grid grid-cols-3 gap-4 px-4 font-poppins font-medium pb-3 w-full group"
      onClick={editAnnouncement}>
        <div className='text-center col-span-1 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {date.toLocaleDateString()}
        </div>
        <div className='text-center col-span-2 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {title}
          </div>
      </button>
    </>
  );
}

function AnnouncementsTile() {

  function newAnnouncement() {

  }


  return (
    <>
      <div className='flex flex-col'>
        <div className="flex flex-row justify-between pb-8">
          <div className='flex text-3xl text-black font-bold font-poppins text-wrap items-center'>Announcements</div>
          <button onClick={newAnnouncement}
            className="flex bg-[#e6dcd5] rounded-lg h-12 w-[15rem] text-xl font-medium
                      text-center justify-center items-center transition-all duration-100
                      hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer">New Announcement</button>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-8 h-[25rem] md:w-[15rem] lg:w-[20rem] xl:w-[50rem] items-center">
          <div className="grid grid-cols-3 gap-4 border-b-2 border-black px-4 font-poppins font-medium pb-3 mb-4 w-full">
            <div className='text-center col-span-1'>Date</div>
            <div className='text-center col-span-2'>Title</div>
          </div>
          <Announcment date={new Date("2024-03-25")} title="Sexy time"/>
          <Announcment date={new Date("2024-04-25")} title="Sexy time 2"/>
          <Announcment date={new Date("2024-05-25")} title="Sexy time 3"/>

        </div>
      </div>
    </>
  );
}


export default AnnouncementsTile;