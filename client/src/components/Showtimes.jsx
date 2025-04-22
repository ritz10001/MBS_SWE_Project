const showtimes = [
  {
    location: 'Lubbock',
    times: ['6:50 PM', '7:00 PM', '8:00 PM']
  },
  {
    location: 'Dallas',
    times: ['6:50 PM', '7:00 PM', '8:00 PM']
  },
  {
    location: 'Austin',
    times: ['6:50 PM', '7:00 PM', '8:00 PM']
  },
  {
    location: 'Houston',
    times: ['6:50 PM', '7:00 PM', '8:00 PM']
  },
  {
    location: 'San Antonio',
    times: ['6:50 PM', '7:00 PM', '8:00 PM']
  }
]

const Showtimes = () => {
  /* todo: get from api */
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2">Showtimes</h2>
      <p className="mb-4">Select a date and time to continue to ticket checkout.</p>
      <div className="grid grid-cols-1 md:grid-cols-[min-content_1fr] gap-x-6 gap-y-3 items-center">
        {showtimes.map((showtime, index) => (
          <>
            <div className="text-lg font-bold text-nowrap">{showtime.location}</div>
            <div className="flex flex-wrap gap-3">
              {showtime.times.map((time, timeIndex) => (
                <button key={timeIndex} className="rounded-xl border-2 border-gray-300 py-1.5 px-4">
                  {time}
                </button>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Showtimes 