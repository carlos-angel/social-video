import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  registerMyFavoriteMovie,
  removeMovieFromMyFavorites,
} from '../actions';

import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

function CarouselItem(props) {
  const { _id, cover, title, contentRating, duration, year, isList } = props;
  const handleSetFavorite = () => {
    props.registerMyFavoriteMovie({
      _id,
      cover,
      title,
      contentRating,
      year,
      duration,
    });
  };

  const handleDeleteFavorite = (itemId) => {
    props.removeMovieFromMyFavorites(itemId);
  };
  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt='' />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${_id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>

          {isList ? (
            <img
              className='carousel-item__details--img'
              src={removeIcon}
              alt='Plus Icon'
              onClick={() => handleDeleteFavorite(_id)}
            />
          ) : (
            <img
              className='carousel-item__details--img'
              src={plusIcon}
              alt='Plus Icon'
              onClick={handleSetFavorite}
            />
          )}
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration}`}
        </p>
      </div>
    </div>
  );
}

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
  year: PropTypes.number,
};

const mapDispatchToProps = {
  registerMyFavoriteMovie,
  removeMovieFromMyFavorites,
};

export default connect(null, mapDispatchToProps)(CarouselItem);
