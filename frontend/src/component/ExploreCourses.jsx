import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa6";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from "react-router-dom";
function ExploreCourses() {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] min-h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">
      {/* left div */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[35px] font-semibold ">Explore</span>
        <span className="text-[35px] font-semibold ">Our Courses</span>
        <p className="text-[17px]">
          Boost your career with our expert-led courses! Learn coding, design,
          and marketing with easy lessons. Flexible timings, affordable fees,
          and 100% practical training. Start today and shape your future with
          us!
        </p>

        <button
          className="px-[20px] py-[10px] border-2 bg-[#090e35] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer"
          onClick={() => navigate("/allcourses")}
        >
          Explore Courses{" "}
          <FaGooglePlay className="w-[23px] h-[25px] fill-white   " />
        </button>
      </div>

      {/* right div */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
        <div className="w-[100px] h-[130px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center ">
            <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-[#6d6c6c]" />
          </div>
          Web Development
        </div>

        <div className="w-[100px] h-[130px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#cef3d6] rounded-lg flex items-center justify-center ">
            <FaUikit className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          UI/UX Designing
        </div>

        <div className="w-[100px] h-[130px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#edc6c6] rounded-lg flex items-center justify-center ">
            <MdAppShortcut className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          APP Development
        </div>

        <div className="w-[100px] h-[130px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#d7d0fd] rounded-lg flex items-center justify-center ">
            <FaHackerrank className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          Ethical Hacking
        </div>

        <div className="w-[100px] h-[110px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#cdf5e6] rounded-lg flex items-center justify-center ">
            <AiFillOpenAI className="w-[60px] h-[60px] text-[#6d6c6c]" />
          </div>
          AI/ML
        </div>

        <div className="w-[100px] h-[110px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#eef3a9] rounded-lg flex items-center justify-center ">
            <SiGoogledataproc className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          Data Science
        </div>

        <div className="w-[100px] h-[110px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#c3c9f2] rounded-lg flex items-center justify-center ">
            <BsClipboardDataFill className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          Python
        </div>

        <div className="w-[100px] h-[110px]  text-[15px] flex flex-col gap-3 text-center font-semibold">
          <div className="w-[100px] h-[90px] bg-[#eaccf7] rounded-lg flex items-center justify-center ">
            <SiOpenaigym className="w-[50px] h-[50px] text-[#6d6c6c]" />
          </div>
          AI Tools
        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;
