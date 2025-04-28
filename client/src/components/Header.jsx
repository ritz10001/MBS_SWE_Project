import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa"
import { useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { useAuth } from '../contexts/AuthContext'
import { set } from "react-hook-form"
import Button from "./Button"
import useClickOutside from "../util/useClickOutside"
import IsAdmin from "./IsAdmin"

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === '') return;
    navigate(`/?search=${searchTerm}`);
  }

  return (
    <div className="grid grid-cols-[1fr_min-content] items-center bg-white border border-gray-300 rounded-lg">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="px-4 py-2"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(e);
          }
        }}
      />
      <button className="border-l border-gray-300 px-4 py-2 cursor-pointer" onClick={handleSearch}>
        <FaSearch className="text-gray-500" />
      </button>
    </div>
  )
}

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { isAuthenticated, userDetails, logout } = useAuth();

  const userDropdownRef = useRef();
  useClickOutside(userDropdownRef, () => setIsUserDropdownOpen(false));

  const mobileMenuRef = useRef();
  useClickOutside(mobileMenuRef, () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  });

  const genres = ['All Movies', 'Action', 'Horror', 'Thriller', 'Drama', 'Comedy', 'Romance', 'Sci-Fi']

  return (
    <div ref={mobileMenuRef} className="w-full bg-[#c13232] py-3 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* desktop header */}
        <div className="hidden md:grid grid-cols-[1fr_max-content_1fr] gap-4 justify-between items-center">
          <h1 className="text-3xl text-white font-bold">
            <NavLink to="/">
              MBS
            </NavLink>
          </h1>
          <SearchBar/>
          <div className="flex items-center justify-end gap-8 text-white font-medium">
            {isAuthenticated ? (
              <div ref={userDropdownRef} className="relative">
                <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center cursor-pointer">
                  <div className="p-2 mr-2 rounded-full bg-white/20 text-white">
                    <FaUser/>
                  </div>
                  <span>{userDetails?.firstName} {userDetails?.lastName}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-xl p-3 flex flex-col gap-2 z-50" style={{ display: isUserDropdownOpen ? 'flex' : 'none' }}>
                  <Button variant="default" width="full" className="text-nowrap" href="/profile" onClick={() => setIsUserDropdownOpen(false)}>
                    View Profile
                  </Button>
                  <IsAdmin>
                    <Button variant="primary" width="full" className="text-nowrap" href="/admin" onClick={() => setIsUserDropdownOpen(false)}>
                      Admin Panel
                    </Button>
                  </IsAdmin>
                  <Button variant="danger" width="full" className="text-nowrap" onClick={() => {
                    logout()
                    setIsUserDropdownOpen(false)
                  }}>
                    Log Out
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
              </>
            )}
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
            <SearchBar/>
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
                      <NavLink 
                        key={index} 
                        to={index == 0 ? '/' : `/?genre=${genre}`}
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {genre}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex flex-col gap-2">
                    {isAuthenticated ? (
                      <>
                        <span className="text-gray-800 font-bold">{userDetails?.firstName} {userDetails?.lastName}</span>
                        <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-gray-800 text-left">
                          Profile
                        </NavLink>
                        <IsAdmin>
                          <NavLink to="/admin" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-gray-800 text-left">
                            Admin Panel
                          </NavLink>
                        </IsAdmin>
                        <button 
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                          className="text-gray-600 hover:text-gray-800 text-left cursor-pointer"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink 
                          to="/login" 
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Log In
                        </NavLink>
                        <NavLink 
                          to="/signup" 
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* desktop genre list */}
        <div className="hidden md:flex justify-between items-center text-white font-bold uppercase mt-3 gap-2">
          {genres.map((genre, index) => (
            <NavLink key={index} to={index == 0 ? '/' : `/?genre=${genre}`}>
              <span className="text-sm md:text-base">
                {genre}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header 