import { format, set } from "date-fns";
import React, { useState, useEffect } from "react";
import { FaLocationPin, FaClock, FaStar } from "react-icons/fa6";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import LoadingCircle from "../components/LoadingCircle";

const CheckoutPage = () => {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const showId = params.get("showId");

  const [showData, setShowData] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const subtotal = showData?.ticketPrice * ticketCount;
  const taxRate = 0.0825; // 8.25% tax rate lol bro put tax rates
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const fetchShowData = async () => {
    try {
      const response = await fetch(
        `https://www.moviebookingsystem.xyz/api/shows/${showId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok)
        throw new Error("Failed to fetch movie or show data" + response.status);
      const showData = await response.json();
      setShowData(showData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated == null) return;

    if (showId) {
      fetchShowData();
    } else {
      setShowData(null);
    }
  }, [showId, isAuthenticated]);

  if (isAuthenticated == null || !showData)
    return (
      <div className="flex justify-center py-40">
        <LoadingCircle className="w-8 h-8" />
      </div>
    );

  if (!showId) return <Navigate to="/" replace />;

  const handlePayment = async () => {
    navigate("/confirmation", { state: { showData, ticketCount } });
  };

  return (
    <>
      <title>Checkout Tickets | MBS</title>
      <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Checkout Selected Tickets
        </h1>
        <div className="grid lg:grid-cols-[60%_1fr] mt-4">
          <div>
            <div className="rounded-xl bg-[#ececec] shadow-xl px-4 py-4 grid grid-cols-[17%_1fr] gap-4">
              <img
                src={showData.movieImageUrl}
                alt={showData.movieTitle}
                className="w-auto h-auto rounded-lg shadow-lg aspect-[2/3]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <div className="font-bold text-black text-xl">
                    {showData.movieTitle}
                  </div>
                  <span className="text-gray-500"></span>
                </div>
                <div className="text-black mt-4">
                  <div className="flex items-center gap-2">
                    <FaLocationPin />
                    <span>{showData.theatreLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{format(new Date(showData.showTime), "PPPp")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar />
                    <span>
                      {ticketCount} ticket{ticketCount == 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* cost total */}
            <div className="mt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatter.format(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax</span>
                <span>{formatter.format(tax)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-300 pt-2 mt-2">
                <span>Total</span>
                <span>{formatter.format(total)}</span>
              </div>
            </div>
          </div>

          {/* checkout form */}
          <div className="flex flex-col gap-4 py-4 w-100 px-8 ms-8">
            <Button
              variant="primary"
              className="bg-blue-800 w-full hover:bg-blue-900"
              onClick={handlePayment}
            >
              Checkout With Paypal
            </Button>
            <Button
              variant="primary"
              className="w-full"
              onClick={handlePayment}
            >
              Checkout With Venmo
            </Button>
            {/* or */}
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500">or</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
            <div>
              <input
                placeholder="Cardholder's Name"
                onEnter={(e) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    cardholderName: e.target.value,
                  })
                }
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <input
                placeholder="Card Number"
                onEnter={(e) =>
                  setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                }
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="MM/YY"
                onEnter={(e) =>
                  setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                }
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              <input
                placeholder="CVV"
                onEnter={(e) =>
                  setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                }
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            {}
            <Button
              variant="primary"
              className="w-full"
              onClick={handlePayment}
            >
              Checkout with Card
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
