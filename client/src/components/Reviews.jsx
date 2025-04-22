import { FaStar } from "react-icons/fa"

const Reviews = () => {
  /* todo: get from api */
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2">Reviews</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <p className="text-center md:text-left">Have you already watched this movie? Add your thoughts in a review now!</p>
        <button className="bg-[#158dd7] text-white font-bold py-2 px-6 rounded-xl shadow-lg w-full md:w-auto">
          Leave a Review
        </button>
      </div>
      <div className="rounded-xl px-4 py-4 mt-4 border border-gray-300">
        <p className="text-gray-500"><span className="font-bold text-gray-900 text-lg">John Doe</span> on May 30, 2025</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="inline-flex text-lg">{['','','','',''].map((_, i) => <FaStar key={i} className="text-yellow-400"/>)}</span>
        </div>
        <p className="mt-4">This movie was amazing! The action scenes were intense and the storyline was captivating. Highly recommend!</p>
      </div>
    </div>
  )
}

export default Reviews 