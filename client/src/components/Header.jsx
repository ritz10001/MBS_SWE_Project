import { FaSearch, FaBars, FaTimes } from "react-icons/fa"
import { useState } from "react"
import { NavLink } from "react-router"

const Header = () => {
  /* todo: make auth and search functional */
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const genres = ['Trending', 'Action', 'Horror', 'Thriller', 'Drama', 'Comedy', 'Romance', 'Sci-Fi']

  return (
    <div className="w-full bg-[#c13232] py-3 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* desktop header */}
        <div className="hidden md:grid grid-cols-3 gap-4 justify-between items-center">
          <h1 className="text-3xl text-white font-bold">
            <NavLink to="/">
              MBS
            </NavLink>
          </h1>
          <div className="grid grid-cols-[1fr_min-content] items-center bg-white border border-gray-300 rounded-lg">
            <input
              type="text"
              placeholder="Search for a movie..."
              className="px-4 py-2"
            />
            <button className="border-l border-gray-300 px-4 py-2">
              <FaSearch className="text-gray-500" />
            </button>
          </div>
          <div className="flex items-center justify-end gap-8 text-white font-medium">
            <a href="/">Log In</a>
            <a href="/">Sign Up</a>
          </div>
        </div>

        {/* mobile header */}
        <div className="md:hidden flex justify-between items-center">
          <h1 className="text-2xl text-white font-bold">MBS</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                let newState = !isSearchOpen
                setIsSearchOpen(newState)
                if (newState) setIsMenuOpen(false)
              }}
              className="text-white"
            >
              <FaSearch className="text-xl" />
            </button>
            <button 
              onClick={() => {
                let newState = !isMenuOpen
                setIsMenuOpen(newState)
                if (newState) setIsSearchOpen(false)
              }}
              className="text-white"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* mpbile search bar */}
        {isSearchOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 px-4 pb-4 bg-[#c13232] shadow-lg">
            <div className="grid grid-cols-[1fr_min-content] items-center bg-white border border-gray-300 rounded-lg">
              <input
                type="text"
                placeholder="Search for a movie..."
                className="px-4 py-2"
                autoFocus
              />
              <button className="border-l border-gray-300 px-4 py-2">
                <FaSearch className="text-gray-500" />
              </button>
            </div>
          </div>
        )}

        {/* mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 px-4 pb-4 bg-[#c13232] shadow-lg">
            <div className="bg-white rounded-lg p-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-gray-800">Genres</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {genres.map((genre, index) => (
                      <a 
                        key={index} 
                        href="/" 
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {genre}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex flex-col gap-2">
                    <a 
                      href="/" 
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </a>
                    <a 
                      href="/" 
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* desktop genre list */}
        <div className="hidden md:flex justify-between items-center text-white font-bold uppercase mt-3 gap-2">
          {genres.map((x, index) => (
            <NavLink key={index} to={`/?genre=${x.toLowerCase()}`}>
              <span className="text-sm md:text-base">
                {x}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header 