import { format } from "date-fns";
import Barcode from "react-barcode";
import { FaClock, FaLocationPin, FaStar } from "react-icons/fa6";
import Button from "./Button";

const ShowingCard = ({
  imageUrl,
  title,
  theatreLocation,
  showTime,
  ticketCount,
  barcodes,
  bookingId
}) => {
  return (
    <div className="rounded-xl bg-[#ececec] shadow-xl px-4 py-4 space-y-4 print:shadow-none print:w-full">
      <div className="grid grid-cols-[17%_1fr] gap-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-auto h-auto rounded-lg shadow-lg aspect-[2/3] min-h-36 print:shadow-none"
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
            {bookingId && <div className="mt-3">
              <Button
                variant="primary"
                className="inline-flex"
                href={`/confirmation?bookingId=${bookingId}`}
              >
                View Tickets
              </Button>
            </div>}
          </div>
        </div>
      </div>
      {barcodes && (
        <div className="flex flex-col justify-center items-center border-t border-gray-300 pt-2">
          <div className="text-bold">
            Display the following barcode{barcodes.length == 1 ? '' : 's'} at the theater to check in
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {barcodes.map(barcode => <>
              <Barcode
                value={barcode}
                width={2}
                height={70}
                background="#ececec"
                className="print:hidden"
              />
              <Barcode
                value={barcode}
                width={2}
                height={70}
                className="hidden print:block"
              />
            </>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowingCard;
