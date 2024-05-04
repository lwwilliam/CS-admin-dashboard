import { useState, useEffect, use } from 'react';
import { getCookie } from 'cookies-next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie('token');

interface ClubFundsLogsTileProps {
  clubFunds: string;
  updateFunds: any;
  fundAmount: number;
}

function ClubFundsLogsTile({ clubFunds, updateFunds, fundAmount }: ClubFundsLogsTileProps) {
  const [allFunds, setAllFunds] = useState<Record<string, any>>({});
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/funds/totalFunds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(data => {
      setAllFunds(data.message);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [clubFunds]);

  function handleFundsChange(num: number | string) {
    const amountToAdd = typeof num === 'string' ? parseFloat(num) : num;
  
    fundAmount += amountToAdd;
    const updatedFunds = fundAmount.toString();
    updateFunds(updatedFunds);
  }

  function deallocate(id: number) {
    const index = Object.values(allFunds).findIndex(fund => fund._id === id);
    fetch(`${BACKEND_URL}/api/funds/deallocateFunds`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ "FundsID": id })
    })
    .then(response => response.json())
    .then(() => {
      // Remove deallocated funds from allFunds state
      setAllFunds(prevAllFunds => {
        return Object.keys(prevAllFunds)
        .filter((key) => prevAllFunds.hasOwnProperty(key)) // Filter out keys that may not exist
        .filter(key => prevAllFunds[key]._id !== id)
        .reduce((obj, key) => {
          obj[key] = prevAllFunds[key];
          return obj;
        }, {} as Record<string, any>); // Type assertion here
      });
      handleFundsChange(allFunds[index].Amount);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const deallocSelected = () => {
    if (selectedItems.length > 0) {
      selectedItems.forEach((id) => {
        deallocate(id);
      });
      setSelectedItems([]);
    }

  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedItems(prevState => [...prevState, id]);
    } else {
      setSelectedItems(prevState => prevState.filter(item => item !== id));
    }
  };

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
          {
            Object.keys(allFunds).map((key) => {
              return (
                <div key={key} className='grid grid-cols-6 gap-4 px-4 font-poppins pb-3 mb-4 w-full overflow-hidden'>
                  <div className='text-center col-span-4 overflow-hidden'>{allFunds[key].Purpose}</div>
                  <div className='text-center col-span-1'>{allFunds[key].Amount}</div>
                  <div className='text-center col-span-1'>
                  <input
                      type="checkbox"
                      id={`select-${key}`} // Use unique IDs for checkboxes
                      name={`select-${key}`}
                      value={`select-${key}`}
                      onChange={(event) => handleCheckboxChange(event, allFunds[key]._id)}
                    />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default ClubFundsLogsTile;