import React from 'react'
import styled from 'styled-components'

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
  border-radius: 7px;
`
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`
const MovieName = styled.span`
  font-size: 16px;
  font-weight: 400;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
`
const Rating = styled.div`
  border-radius: 100%;
  position: absolute;
  top: 15px;
  left: 14px;
  width: 35px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px black;
  background-color: white;
  font-size: 14px;
  font-weight: 600;
`

const MovieComponent = ({movie,setMovieDetail,setOpenModal}) => {
  const  { original_title,poster_path,vote_average,vote_count,release_date,overview } = movie

  // Open modal window and set movie data
  const onMovieClick = ()=>{
      setMovieDetail({
        original_title,poster_path,vote_average,vote_count,release_date,overview
      })
      setOpenModal(true)
    }

  return (
    <MovieContainer onClick={onMovieClick}>
      <Rating>{vote_average}</Rating>
      <CoverImage
         src={`https://image.tmdb.org/t/p/original${poster_path?poster_path:""}`}
        alt=""
      />
      <MovieName>{original_title}</MovieName>
    </MovieContainer>
  )
}
export default MovieComponent
