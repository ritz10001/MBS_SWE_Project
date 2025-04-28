import { format } from "date-fns";
import { FaClock, FaLocationPin, FaStar } from "react-icons/fa6";

const ShowingCard = ({
  imageUrl,
  title,
  theatreLocation,
  showTime,
  ticketCount,
}) => {
  return (
    <div className="rounded-xl bg-[#ececec] shadow-xl px-4 py-4 grid grid-cols-[17%_1fr] gap-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-auto h-auto rounded-lg shadow-lg aspect-[2/3]"
      />
      <div className="flex flex-col justify-between">
        <div>
          <div className="font-bold text-black text-xl">{title}</div>
          <span className="text-gray-500"></span>
        </div>
        <div className="text-black mt-4">
          <div className="flex items-center gap-2">
            <FaLocationPin />
            <span>{theatreLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock />
            <span>{format(new Date(showTime), "PPPp")}</span>
          </div>
          {ticketCount && <div className="flex items-center gap-2">
            <FaStar />
            <span>
              {ticketCount} ticket{ticketCount == 1 ? "" : "s"}
            </span>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ShowingCard;
