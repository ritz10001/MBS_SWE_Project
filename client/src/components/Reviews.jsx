import { FaStar } from "react-icons/fa"
import Button from "./Button"
import { formatDistance, formatDistanceToNow } from "date-fns";

const Reviews = ({ data }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2">Reviews</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <p className="text-center md:text-left">Have you already watched this movie? Add your thoughts in a review now!</p>
        <Button variant="primary" className="w-full md:w-auto">
          Leave a Review
        </Button>
      </div>
      {data.reviews.map(review => {
        const rating = Math.round((data.rating ?? 0) / 2);
        return (
          <div className="rounded-xl px-4 py-4 mt-4 border border-gray-300">
            <p className="text-gray-500">
              <span className="font-bold text-gray-900 text-lg">{review.userFirstName}</span>
              <span className="ml-3">{formatDistance(new Date(`${review.reviewDate}Z`), new Date().toISOString(), {addSuffix: true})}</span>
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex text-lg" title={`${data.rating}/10`}>{Array(5).fill(0).map((_, i) => <FaStar key={i} className={rating > i ? 'text-yellow-500' : 'text-gray-300'}/>)}</span>
            </div>
            <p className="mt-4">{review.comment}</p>
          </div>
        );
      })}
    </div>
  )
}

export default Reviews 