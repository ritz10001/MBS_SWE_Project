import { FaLocationPin, FaClock, FaStar } from "react-icons/fa6";

const CheckoutPage = () => {
  /* todo: split into components */
  return <>
    <title>Checkout Tickets | MBS</title>
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">Checkout Selected Tickets</h1>
      <div className="grid lg:grid-cols-[70%_1fr] mt-4">
        <div>
          <div className="rounded-xl bg-[#ececec] shadow-xl px-4 py-4 grid grid-cols-[17%_1fr] gap-4">
            <img src="/public/Karate_Kid_Legends_Poster.jpg" alt="Karate Kid Legends" className="w-auto h-auto rounded-lg shadow-lg" />
            <div className="flex flex-col justify-between">
              <div>
                <div className="font-bold text-black text-xl">Karate Kid: Legends</div>
                <span className="text-gray-500">2025</span>
              </div>
              <div className="text-black mt-4">
                <div className="flex items-center gap-2">
                  <FaLocationPin />
                  <span>Lubbock, Texas</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>March 30, 2025 at 7:50 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar />
                  <span>3 tickets</span>
                </div>
              </div>
            </div>
          </div>

          {/* cost total */}
          <div className="mt-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$22.00</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated tax</span>
              <span>$2.52</span>
            </div>
            <div className="flex justify-between font-bold border-t border-gray-300 pt-2 mt-2">
              <span>Total</span>
              <span>$24.52</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default CheckoutPage;