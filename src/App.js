import './App.css'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import MovieComponent from './components/MovieComponent'
import Modal from './components/Modal'

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 20px;
  gap: 30px;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: center;
  }
`
const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 65px;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    /* justify-content: flex-end; */
  }
`
const Logo = styled.img`
  width: 156px;
  height: 54px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  @media (max-width: 768px) {
    transform: scale(.7) translateY(5px);
  }
`
const SearchIcon = styled.img`
  width: 13px;
  height: 13px;
  padding: 10px;
`
const SearchBar = styled.div`
  display: flex;
  width: 180px;
  height: 36px;
  align-items: center;
  background: #ffffff;
  border: 1px solid #c0c4cc;
  border-radius: 2px;
  justify-content: space-around;
`
const SearchInput = styled.input`
  border: none;
  width: 85%;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`
const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.01em;
  padding-top: 35px;
`
const api_key = process.env.REACT_APP_API_KEY
function App() {
  const [movieList, setMovieList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [movieDetail, setMovieDetail] = useState(null)
  useEffect(() => {
    // definging url. If search Query is empty show recent movies else searched movies 
    var url='https://api.themoviedb.org/3/'
    if (searchQuery === '')
      url += `movie/upcoming?api_key=${api_key}&language=en-US&page=1`
    else
      url += `search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`

    // Fetching From API
    const getData = setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setMovieList(data.results))
    }, 1000)
    
    return () => clearTimeout(getData)
  }, [searchQuery])

  console.log(movieDetail)
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar>
        {/* Logo */}  
          <Logo src="./Logo.png" alt="" />
        {/* Search Bar */}
        <SearchBar>
          <SearchIcon src="./Union.png" alt="" />
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for a movie"
          />
        </SearchBar>
        {/* Search Bar Ends*/}
      </Navbar>
      {/* Navbar Ends */}
      <hr />
      <Title>Most Recent Movies</Title>

      {/* Movie List */}
      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie) => (
              <MovieComponent
                key={movie.id}
                movie={movie}
                setMovieDetail={setMovieDetail}
                setOpenModal={setOpenModal}
              />
            ))
          : ''}
      </MovieListContainer>

      {/* Movie List Ends*/}

      {/* Modal Window */}
      {openModal ? (
        <Modal
          movieDetail={movieDetail}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default App
