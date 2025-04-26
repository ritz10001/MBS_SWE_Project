import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa"

const MovieDetails = ({ data }) => {
  const hours = Math.floor(data.duration / 60);
  const minutes = data.duration % 60;
  const rating = Math.round(data.rating / 2);

  return <>
    <div className="grid grid-cols-1 md:grid-cols-[20%_1fr] gap-6 mb-6">
      <img src={data.imageUrl} alt={data.title} className="w-full max-w-xs mx-auto md:max-w-none h-auto rounded-lg shadow-lg aspect-[2/3]" />
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">{data.title}</h1>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-base md:text-lg">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <span className="text-gray-500">{new Date(data.releaseDate).toLocaleDateString('en-US')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-500" />
            <span className="text-gray-500">{hours ? `${hours}h ` : ''}{minutes ? `${minutes}m` : ''}</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-2 flex items-center gap-1.5">
            <span className="font-bold">Rating: </span>
            <span className="inline-flex text-lg" title={`${data.rating}/10`}>{Array(5).fill(0).map((_, i) => <FaStar key={i} className={rating > i ? 'text-yellow-500' : 'text-gray-300'}/>)}</span>
          </div>
          <div className="mt-2"><span className="font-bold">Cast:</span> {data.cast}</div>
          <div className="mt-2"><span className="font-bold">Director:</span> {data.director}</div>
        </div>
      </div>
    </div>
    <div className="mb-8">
      <p className="text-gray-700 border-l-2 pl-4 border-gray-300 py-2">
        {data.description}
      </p>
    </div>
  </>;
}

export default MovieDetails 