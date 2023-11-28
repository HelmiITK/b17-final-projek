import { PiShieldStarBold } from "react-icons/pi";
import { RiBook3Line } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { FaStar } from "react-icons/fa";

// isinya info tentang course, kyk judul, rating, kategori, dll
const InfoCourse = () => {
  return (
    <div className="mx-4 md:mx-0">
      <div className="flex justify-between items-center">
        <h1 className="text-color-primary font-semibold text-base md:text-lg">
          UI/UX Design
        </h1>
        <p className="flex font-semibold text-sm md:text-base">
          <span className="mr-1 md:mr-2">
            <FaStar className=" w-4 h-4 md:w-5 md:h-5" color="#F9CC00" />
          </span>
          5.0
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-sm md:text-base -tracking-wide ">
          Intro to Basic of User Interaction Design
        </h3>
        <div className="mt-3 w-full md:w-11/12 lg:w-10/12">
          <div className="w-full flex justify-between">
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <PiShieldStarBold size={24} />
              </span>{" "}
              Intermediate Level
            </p>
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <RiBook3Line size={24} />
              </span>{" "}
              10 Modul
            </p>
            <p className="flex items-center text-color-primary text-xs md:text-sm font-semibold">
              <span className="text-green-500 mr-1">
                <FaClock size={24} />
              </span>{" "}
              100 Menit
            </p>
          </div>
        </div>
        <div className="mt-2 md:w-1/2 lg:w-4/12">
          <button className="w-full text-xs lg:text-sm py-1 bg-[#73CA5C] text-white font-semibold rounded-full flex justify-center items-center">
            Join Grup Telegram
            <span className="my-auto ml-3">
              <IoIosChatboxes color="white" size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoCourse;
