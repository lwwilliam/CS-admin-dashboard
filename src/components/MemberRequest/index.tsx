"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { getCookie } from 'cookies-next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie('token');

// interface MemberListProps {
//   info: Record<string, any>;
// }

function memeberList() {
  const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});
  const [info, setInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/admin/getPendingRequests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(data => {
      setFilteredInfo(data.message);
      setInfo(data.message);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const filterUsersByName = (query: any) => {
    const filteredData: Record<string, any> = {};
    
    Object.keys(info).forEach((key) => {
      if (info[key].Name.toLowerCase().includes(query.toLowerCase())) {
        filteredData[key] = info[key];
      }
    });
    
    return filteredData;
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredClubs = filterUsersByName(inputValue);
    setFilteredInfo(filteredClubs);
  };

  function acceptRequest(id: string) {
    console.log("Request accepted", id);
    let data = { "userID": id };
    fetch(`${BACKEND_URL}/api/admin/approveRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    // .then(response => response.json())
    .then(data => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function rejectRequest(id: string) {
    console.log("Request rejected", id);
    let data = { "userID": id };
    fetch(`${BACKEND_URL}/api/admin/rejectRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(data => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  return (
  <>
  <div className='flex flex-col w-[38%]'>
    <div className='flex justify-between items-center pb-5'>
    <div className='text-3xl text-black font-bold font-poppins text-wrap py-5'>Requests</div>
    <div className='relative'>
      <input type="text" id="myInput" placeholder="Search" title="Type in a name" 
        className='bg-[#E3E1E1] text-black md:pl-4 pl-4 md:pr-2 md:py-4 py-2 md:text-xl text-l font-poppins font-medium rounded-3xl shadow-lg h-12 border-[#E3E1E1]'
        onChange={handleSearchInputChange}
      />
      <Image src="/icons/search.svg" alt="search" 
        width={30} height={30} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
      />
    </div>
    </div>
    <div className="bg-white rounded-md p-8">
    <div className="grid grid-cols-6	 gap-4 border-b-2 border-black px-4 font-poppins font-medium pb-3 mb-4">
      <div className='text-center col-span-2'>Name</div>
      <div className='text-center col-span-3'>Email</div>
      <div className='text-center col-span-1'>Actions</div>
    </div>
    {
      filteredInfo && typeof filteredInfo === 'object' ?
      Object.keys(filteredInfo).map((key) => {
        return (
          <div key={key} className='grid grid-cols-6 gap-4 px-4 font-poppins pb-3'>
            <div className='text-center col-span-2'>{filteredInfo[key].Name}</div>
            <div className='text-center overflow-hidden col-span-3'>{filteredInfo[key].Email}</div>
            <div className='col-span-1 flex items-center justify-center'>
              <Image src="/icons/accept.png" alt="accept"
                width={23} height={23}
                className="cursor-pointer mr-1"
                onClick={() => acceptRequest(filteredInfo[key]._id)}
              />
              <Image src="/icons/reject.png" alt="accept"
                width={23} height={23}
                className="cursor-pointer ml-1"
                onClick={() => rejectRequest(filteredInfo[key]._id)}
              />
            </div>
          </div>
          );
      }) : null
    }
    </div>
  </div>
  </>
  );
}

export default memeberList;