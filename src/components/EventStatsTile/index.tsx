import React from "react";
import Image from "next/image";

import styles from './EventStatsTile.module.css';
import person_icon from '@icons/person.png';

interface EventStatsTileProps {
  date: string;
  title: String;
  participant_count: Number;
}

function EventStatsTile({date, title, participant_count}: EventStatsTileProps)
{
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
  const day = eventDate.getUTCDate();

  return (
    <>
      <div className={`flex justify-center w-48 h-20 md:w-[21rem] md:h-[3rem] group ${styles.group}`}>
        <div className="flex flex-row bg-red-300 justify-center items-center font-medium font-poppins font-md rounded text-wrap">
          <div className={`flex flex-col md:flex-row group-hover:hidden justify-center items-center pl-3 font-bold ${styles.fadeOutDate}`}>
            <div className="md:pr-1">{day}</div>
            <div>{month}</div>
          </div>
          <div className={`h-[80%] w-2 mx-2 bg-white rounded ${styles.slideOutBar}`}></div>
          <div className={`${styles.slideRightTitle}`}>{title}</div>
          <div className={`opacity-0 h-[80%] w-2 mx-2 bg-white rounded ${styles.slideInBar}`}></div>
          <div className={`hidden group-hover:flex group-hover:flex-col group-hover:md:flex-row justify-center items-center font-bold opacity-0 mr-3 md:mr-0 ${styles.fadeInCount}`}>
            <Image src={person_icon} alt="person icon" className="md:w-10 md:pb-3"/>
            <div className="md:pr-3">{participant_count.toString()}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventStatsTile;