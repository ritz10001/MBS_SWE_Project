import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import LoadingCircle from "../components/LoadingCircle";
import ShowingCard from "../components/ShowingCard";

const CheckoutPage = () => {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const showId = params.get("showId");
  const ticketCount =
    Math.abs(params.get("tickets")) > 10 ? 10 : Math.abs(params.get("tickets"));

  const [showData, setShowData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  })

  const subtotal = showData?.ticketPrice * Math.abs(ticketCount);
  const taxRate = 0.0825; // 8.25% tax rate lol bro put tax rates also this doesn't match tax rate in backend
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

  const handlePayment = async (paymentType) => {
    setIsLoading(true);
    const response = await fetch(
      `https://www.moviebookingsystem.xyz/api/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          PaymentMethod: paymentType,
          NumberOfTickets: ticketCount,
          ShowId: showId,
          /* todo: include card details */
        })
      }
    )
    const data = await response.json();
    if (!response.ok) {
      setPaymentError("Payment failed. Please try again");
      console.error("Payment failed", response.statusText);
    } else {
      navigate(`/confirmation?bookingId=${data.bookingId}`, { state: { showData, ticketCount } });
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

  return (
    <>
      <title>Checkout Tickets | MBS</title>
      <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Checkout Selected Tickets
        </h1>
        <div className="grid lg:grid-cols-[60%_1fr] mt-4">
          <div>
            <ShowingCard
              title={showData.movieTitle}
              imageUrl={showData.movieImageUrl}
              theatreLocation={showData.theatreLocation}
              showTime={showData.showTime}
              ticketCount={ticketCount}
            />

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
              onClick={() => handlePayment("PayPal")}
              disabled={isLoading}
            >
              Checkout With Paypal
            </Button>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => handlePayment("Venmo")}
              disabled={isLoading}
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
                onChange={(e) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    cardholderName: e.target.value,
                  })
                }
                value={paymentInfo.cardholderName}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div>
              <input
                placeholder="Card Number"
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                }
                value={paymentInfo.cardNumber}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="MM/YY"
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                }
                value={paymentInfo.expiryDate}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
              <input
                placeholder="CVV"
                onChange={(e) =>
                  setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                }
                value={paymentInfo.cvv}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => handlePayment("Card")}
              disabled={isLoading}
            >
              Checkout with Card
            </Button>
            {paymentError && (
              <p className="mt-1 text-sm text-red-600">{paymentError}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
