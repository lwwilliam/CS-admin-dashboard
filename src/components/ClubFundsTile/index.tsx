import { useState } from "react";

type ModalType = {
  open: boolean
  children: React.ReactNode;
}

function Modal({open, children}: ModalType) {
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/50": "invisible"}`}>
      <div className={`transition-opacity ${open ? "opacity-100": "opacity-0"}`}>
        {children}
      </div>
    </div>
  )
}

type EditBalanceModalType = {
  open: boolean
  onClose: () => void
  balance: number
  setBalance: React.Dispatch<React.SetStateAction<number>>;

}

function EditBalanceModal({open, onClose, balance, setBalance} : EditBalanceModalType) {

  const [input, setInput] = useState<string>(String(balance));

  function onConfirm() {
    setBalance(Number(input))
    onClose()
  }

  return (
    <>
      <Modal open={open}>
        <div className="bg-white rounded-lg h-[25rem] w-[25rem] flex flex-col justify-center items-center">

          <div className="text-3xl font-medium font-poppins text-center mb-10">Enter new balance:</div>
          <input type="text" value={input} onChange={(e) => {/^\d*\.?\d*$/.test(e.target.value) ? setInput(e.target.value) : null}}
                placeholder="RM" title="Balance" 
                className='bg-[#E3E1E1] text-black md:pl-4 pl-4 md:pr-2 md:py-4 py-2 md:text-xl
                text-xl font-poppins font-medium rounded-xl shadow-lg h-20 border-[#E3E1E1] mb-10'/>
          <div className="flex flex-row justify-between items-center">
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

function AllocFundsModal ({open, onClose, balance, setBalance} : EditBalanceModalType) {

  const [allocatedFunds, setAllocatedFunds] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  let error_msg: string = "Error, Insufficient Funds";

  function onConfirm() {

    if (balance - Number(allocatedFunds) < 0) {
      setShowError(true)
      return
    }

    setShowError(false)
    setBalance(balance - Number(allocatedFunds))
    setAllocatedFunds("")
    setPurpose("")
    onClose()
  }

  function onCancel() {
    setShowError(false)
    setAllocatedFunds("")
    setPurpose("")
    onClose()
  }

  return (
    <>
      <Modal open={open}>
        <div className="bg-white rounded-lg h-[30rem] w-[40rem] flex flex-col justify-center items-center">
          <div className="text-3xl font-medium font-poppins text-center mb-10">New Fund Allocation</div>
          <input type="text" value={purpose} onChange={(e) => {setPurpose(e.target.value)}}
                placeholder="Purpose" title="Purpose" 
                className='bg-[#E3E1E1] text-black md:pl-4 pl-4 md:pr-2 md:py-4 py-2 md:text-xl
                text-xl font-poppins font-medium rounded-xl shadow-lg w-[30rem] h-14 border-[#E3E1E1] mb-10'/>
          <input type="text" value={allocatedFunds} onChange={(e) => {/^\d*\.?\d*$/.test(e.target.value) ? setAllocatedFunds(e.target.value) : null}}
                placeholder="RM" title="Funds" 
                className='bg-[#E3E1E1] text-black md:pl-4 pl-4 md:pr-2 md:py-4 py-2 md:text-xl
                text-xl font-poppins font-medium rounded-xl shadow-lg w-[30rem] h-14 border-[#E3E1E1] mb-10'/>
          <div className={`text-red-700 text-xl font-medium font-poppins text-center transition-opacity pb-5 ${showError ? "opacity-100 visible": "opacity-0 invisible"}`}>{error_msg}</div>
          <div className="flex flex-row justify-between items-center">
            <button onClick={onConfirm}
                  className="flex bg-[#FF5E5E] rounded-lg h-12 w-28 text-xl font-medium
                              text-center justify-center items-center transition-all duration-100
                              hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer mx-5">Confirm</button>
            <button onClick={onCancel}
                className="flex bg-[#FF5E5E] rounded-lg h-12 w-28 text-xl font-medium
                            text-center justify-center items-center transition-all duration-100
                            hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer mx-5">Cancel</button>
          </div>
        </div>
      </Modal>
    </>
  );
} 

function ClubFundsTile() {

  const [funds, setFunds] = useState<number>(2139);
  const [showEditBalanceModal, setShowEditBalanceModal] = useState<boolean>(false);
  const [showAllocFundsModal, setShowAllocFundsModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col">
        <div className='flex flex-row pb-11 text-3xl text-black font-bold font-poppins text-wrap items-center'>Funding</div>
        <div className="flex flex-col bg-white rounded-lg h-[25rem] w-[30rem] items-center">
          <div className="flex py-8 text-2xl font-medium font-poppins text-center">Current Club Funds</div>
          <div className="flex pt-5 pb-12 text-6xl font-bold font-poppins text-center
                          bg-clip-text text-transparent bg-gradient-to-br
                          from-[#FF0000] to-[#FF00D6]">{"RM " + funds}</div>
          <button onClick={() => {setShowEditBalanceModal(true)}}
                className="flex bg-[#FF5E5E] rounded-lg h-12 w-44 text-xl font-medium
                            text-center justify-center items-center transition-all duration-100
                            hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer mb-10">Edit Balance</button>
          <button onClick={() => {setShowAllocFundsModal(true)}}
                className="flex bg-[#FF5E5E] rounded-lg h-12 w-44 text-xl font-medium
                          text-center justify-center items-center transition-all duration-100
                          hover:scale-105 hover:-translate-y-2 hover:shadow-md cursor-pointer">Allocate Funds</button>
          <EditBalanceModal open={showEditBalanceModal} onClose={() => {setShowEditBalanceModal(false)}} balance={funds} setBalance={setFunds}/>
          <AllocFundsModal open={showAllocFundsModal} onClose={() => {setShowAllocFundsModal(false)}} balance={funds} setBalance={setFunds}/>
        </div>
      </div>
    </>
  );
}

export default ClubFundsTile;