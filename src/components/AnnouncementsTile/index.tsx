import React from "react";
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

import Modal from "@/components/Modal";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie('token');


type AnnouncementEntryProps = {
  date: string,
  title: string,
  onClick: () => void
}

type AnnouncementModalProps = {
  open: boolean
  toEdit: Announcement
  onClose: () => void
  onAPICall: () => void
}

type AnnouncementTileProps = {
  clubName: String
}

type Announcement = {
  date: string
  title: string
  content: string
}

function AnnouncementModal({open, toEdit, onClose, onAPICall} : AnnouncementModalProps) {

  console.log(toEdit)

  const [title, setTitle] = useState<string>(toEdit.title);
  const [content, setContent] = useState<string>(toEdit.content);
  const [initialAnnouncementState, setInitialAnnouncementState] = useState<Announcement>(toEdit);


  const addAnnouncement = () => {

    fetch(`${BACKEND_URL}/api/addAnnouncement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "Title": title,
        "Content": content
      })
    })
    .then(() => {
      setTitle("")
      setContent("")
      onAPICall()
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  // call this instead of add when announcement is already in system
  const editAnnouncement = () => {
    // !TODO
  }

  const onConfirm = () => {

    if (initialAnnouncementState.title === "" && initialAnnouncementState.content === "" && initialAnnouncementState.date === "") {
      addAnnouncement()
    }
    else {
      editAnnouncement()
    }

    onClose()
  }

  useEffect(() => {
    setTitle(toEdit.title);
    setContent(toEdit.content);
  }, [toEdit]);

  return (
    <>
      <Modal open={open}>

        <div className="bg-white rounded-lg h-[50rem] w-[50rem] flex flex-col justify-center items-center">

          <div className="text-3xl font-medium font-poppins text-center mb-10">New Announcement</div>
          <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}
                placeholder="Title" title="Title" 
                className='bg-[#E3E1E1] text-black md:pl-4 pl-4 md:pr-2 md:py-4 py-2 md:text-xl
                text-xl font-poppins font-medium rounded-xl shadow-lg h-20 w-[40rem] border-[#E3E1E1] mb-10'/>
          <textarea value={content} onChange={(e) => {setContent(e.target.value)}}
                placeholder="Content" title="Content" 
                className='bg-[#E3E1E1] text-black md:pl-4 pl-4 md:pr-2 md:py-4 py-2 md:text-xl
                text-xl font-poppins font-medium rounded-xl shadow-lg h-[20rem] w-[40rem] border-[#E3E1E1] mb-10'/>
          <div className="flex flex-row justify-between items-center whitespace-normal">
            <button onClick={onConfirm}
                  className="flex bg-[#FF5E5E] rounded-lg h-12 w-28 text-xl font-medium
                              text-center justify-center items-center transition-all duration-100
                              hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer mx-5">Confirm</button>
            <button onClick={onClose}
                className="flex bg-[#FF5E5E] rounded-lg h-12 w-28 text-xl font-medium
                            text-center justify-center items-center transition-all duration-100
                            hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer mx-5">Cancel</button>
          </div>
        </div>

      </Modal>
    </>
  );
}

function Announcment({date, title, onClick}: AnnouncementEntryProps) {

  return (
    <>
      <button className="grid grid-cols-3 gap-4 px-4 font-poppins font-medium pb-3 w-full group"
      onClick={onClick}>
        <div className='text-center col-span-1 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {date}
        </div>
        <div className='text-center col-span-2 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(255,0,0,1)]
        transition ease-in-out group-hover:scale-105'>
          {title}
          </div>
      </button>
    </>
  );
}

function AnnouncementsTile({clubName}: AnnouncementTileProps) {

  const [announcements, setAnnouncements] = useState<Record<string, any>>([]);
  const [modalState, setModalState] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const emptyAnnouncement: Announcement = {
    date: "",
    title: "",
    content: ""
  };

  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement>(emptyAnnouncement);

  const itemsPerPage = 8;

  // API call to get announcements of a club
  const fetchAnnouncement = () => {
    fetch(`${BACKEND_URL}/api/getAnnouncement?ClubName=${clubName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(data => {
      setAnnouncements(data.message)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  // wrap in useEffect so that it is run only after components are rendered
  useEffect(() => {
    fetchAnnouncement()
  }, [clubName, fetchTrigger]);

  const handleAnnouncementClick = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    setModalState(true);
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className="flex flex-row justify-between pb-8">
          <div className='flex text-3xl text-black font-bold font-poppins text-wrap items-center'>Announcements</div>
          <button onClick={() => {
            setCurrentAnnouncement(emptyAnnouncement);
            setModalState(true);
          }}
            className="flex bg-[#e6dcd5] rounded-lg h-12 w-[15rem] text-xl font-medium
                      text-center justify-center items-center transition-all duration-100
                      hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer">New Announcement</button>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-8 h-[25rem] md:w-[15rem] lg:w-[20rem] xl:w-[40rem] items-center">
          <div className="grid grid-cols-3 gap-4 border-b-2 border-black px-4 font-poppins font-medium pb-3 mb-4 w-full">
            <div className='text-center col-span-1'>Date</div>
            <div className='text-center col-span-2'>Title</div>
          </div>
          <div className="grid w-full">
            {
              announcements && Object.keys(announcements)
                .reverse()
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((key) => {
                  return (
                    <Announcment key={key} date={announcements[key].Date} title={announcements[key].Title} onClick={() => {
                      
                      let a: Announcement = {
                        date: announcements[key].Date,
                        title: announcements[key].Title,
                        content: announcements[key].Content
                      };

                      handleAnnouncementClick(a);
                    }}
                    />
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
          disabled={currentPage === Math.ceil(Object.keys(announcements).length / itemsPerPage)}
          className="flex bg-[#e6dcd5] rounded-lg h-10 w-12 text-lg font-bold
          text-center justify-center items-center transition-all duration-100
          hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer">
            {">"}</button>
        </div>
        <AnnouncementModal open={modalState} toEdit={currentAnnouncement} onClose={() => setModalState(false)} onAPICall={() => {
          setFetchTrigger(fetchTrigger ? false : true);
        }}/>
      </div>
    </>
  );
}

export default AnnouncementsTile;