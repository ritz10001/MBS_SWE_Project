import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FaLocationPin, FaClock, FaStar } from "react-icons/fa6";
import Barcode from "react-barcode";
import Button from "../components/Button";
import { useLocation, Navigate } from "react-router";
import LoadingCircle from "../components/LoadingCircle";
import { useAuth } from "../contexts/AuthContext";
import ShowingCard from "../components/ShowingCard";

const PurchaseConfirmationPage = () => {
  const { isAuthenticated, token } = useAuth();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const bookingId = params.get("bookingId");

  const [bookingData, setBookingData] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const fetchBookingData = async () => {
    try {
      const response = await fetch(
        `https://www.moviebookingsystem.xyz/api/booking/getBooking/${bookingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok)
        throw new Error("Failed to fetch booking data" + response.status);
      const bookingData = await response.json();
      setBookingData(bookingData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated == null) return;

    if (bookingId) {
      fetchBookingData();
    } else {
      setBookingData(null);
    }
  }, [bookingId, isAuthenticated]);

  if (isAuthenticated == null || !bookingData)
    return (
      <div className="flex justify-center py-40">
        <LoadingCircle className="w-8 h-8" />
      </div>
    );

  if (!bookingId) return <Navigate to="/profile" replace />;

  const ticketCount = bookingData.tickets?.length ?? 0;

  return (
    <>
      <div className="max-w-5xl mx-auto py-6 px-4 flex flex-col">
        <h1 className="items-start justify-start text-2xl md:text-3xl font-bold text-black mb-4 print:hidden">
          Ticket Purchase Confirmation
        </h1>
        <h1 className="hidden print:block items-start justify-start text-2xl md:text-3xl font-bold text-black mb-4 ">
          Ticket Information
        </h1>
        <div className="flex items-start justify-start print:hidden">
          Your purchase was successful! View ticket info and show times below.
          Upon arriving at the theater, display the barcode provided to an
          attendant for easy check-in.
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
        <ShowingCard
          title={bookingData.movieTitle}
          imageUrl={bookingData.movieImageUrl}
          theatreLocation={bookingData.theaterLocation}
          showTime={bookingData.showTime}
          ticketCount={ticketCount}
          barcodes={bookingData.tickets.map(ticket => ticket.ticketCode)}
        />
        <div className="flex gap-2 items-center justify-center mt-8">
          <Button
            variant="primary"
            onClick={handlePrint}
            className="print:hidden"
          >
            Print Ticket
          </Button>
          <Button
            variant="default"
            className="print:hidden"
            href="/profile"
          >
            View All Tickets
          </Button>
        </div>
      </div>
    </>
  );
};

export default PurchaseConfirmationPage;
