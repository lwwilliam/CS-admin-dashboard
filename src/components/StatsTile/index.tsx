
type Statistic = {
  stat: string;
  desc: string;
};

function StatsTile({stat, desc}: Statistic) {

  return (
  <>
    <div className="flex flex-col bg-white rounded-md h-24 w-28 justify-center items-center group">
      <div className="text-4xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-br from-[#FF0000] to-[#FF00D6] transform transition-all duration-100 group-hover:scale-125 group-hover:translate-y-2 cursor-pointer">{stat}</div>
      <div className="w-11/12 text-sm font-bold font-poppins text-center transition-all duration-100 group-hover:scale-75 group-hover:translate-y-2 cursor-pointer">{desc}</div>
    </div>
  </>
  );
}

export default StatsTile;