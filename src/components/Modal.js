import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const ModalContainer = styled.div`
  max-width: 550px;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  gap: 20px;
  padding: 30px;
`
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
const ModalTop = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ModalBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 25px;
  text-align: justify;
`
const CloseBtn = styled.img`
  cursor: pointer;
  padding: 4px;
  border: 1px solid black;
`
const Content = styled.div`
  text-align: left;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 10px;
`
const Title = styled.h1`
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.01em;
`
const MoviePoster = styled.img`
  width: 280px;
`

const Modal = ({ open, onClose, movieDetail }) => {
  if (!open || movieDetail === null) return null
  const {
    original_title,
    poster_path,
    vote_average,
    vote_count,
    release_date,
    overview,
  } = movieDetail
  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <ModalTop>
          <Title>{original_title || ''}</Title>
          <CloseBtn src="./Close.png" alt="" onClick={onClose} />
        </ModalTop>
        <ModalBottom>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/original${
              poster_path ? poster_path : ''
            }`}
            alt=""
          />

          <Content>
            <p>
              <strong>Release Date: </strong>
              {moment(release_date).format("MMM D, YYYY")}
            </p>
            <p>{overview}</p>
            <p><strong>{vote_average}</strong> / 10  {"("+vote_count+" total votes)"}</p>
          </Content>
        </ModalBottom>
      </ModalContainer>
    </Overlay>
  )
}

export default Modal
