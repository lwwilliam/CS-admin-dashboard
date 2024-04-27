"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

interface MemberListProps {
  members: Record<string, any>;
}

function MemberList({members}: MemberListProps) {
  const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    setFilteredInfo(members);
  }, [members]);

  const filterUsersByName = (query: any) => {
    const filteredData: Record<string, any> = {};
  
    Object.keys(members).forEach((key) => {
      if (members[key].Name.toLowerCase().includes(query.toLowerCase())) {
        filteredData[key] = members[key];
      }
    });
  
    return filteredData;
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredClubs = filterUsersByName(inputValue);
    setFilteredInfo(filteredClubs);
  };

  return (
    <>
    <div className='flex flex-col w-[60%]'>
      <div className='flex justify-between items-center'>
        <div className='text-3xl text-black font-bold font-poppins text-wrap py-5'>All Members</div>
        <div className='relative'>
          <input type="text" id="myInput" placeholder="Search" title="Type in a name" 
            className='bg-[#E3E1E1] text-black md:pl-10 pl-5 md:pr-16 md:py-4 py-2 md:text-xl text-l font-poppins font-medium rounded-3xl shadow-lg h-12 border-[#E3E1E1]'
            onChange={handleSearchInputChange}
          />
          <Image src="/icons/search.svg" alt="search" 
            width={30} height={30} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-white rounded-md p-8">
        <div className="grid grid-cols-9 gap-4 border-b-2 border-black px-4 font-poppins font-medium pb-3 mb-4">
          <div className='text-center col-span-2'>Members</div>
          <div className='text-center col-span-3'>Email</div>
          <div className='text-center col-span-2'>Position</div>
          <div className='text-center col-span-2'>Actions</div>
        </div>
        {
          Object.keys(filteredInfo).map((key) => {
            return (
              <div key={key} className='grid grid-cols-9 gap-4 px-4 font-poppins pb-3'>
                <div className='text-center col-span-2'>{filteredInfo[key].Name}</div>
                <div className='text-center overflow-hidden col-span-3'>{filteredInfo[key].Email}</div>
                <div className='text-center col-span-2'>Member</div>
                <div className='text-center col-span-2'>N/A</div>
              </div>
            );
          })
        }
      </div>
    </div>
    </>
  );
}

export default MemberList;