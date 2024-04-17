import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import researchImage from '../../assets/images/research.jpeg';
import learnImage from '../../assets/images/learn.jpeg'
import developImage from '../../assets/images/develop.jpeg'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings} className='carousel'>
      <div className="carousel-item">
        <img src={researchImage} alt="Slide 1" className="carousel-image" />
        <div className="overlay-text">
          <strong>  
            <p>Research</p>
          </strong>
        </div>
      </div>
      <div className="carousel-item">
        <img src={learnImage} alt="Slide 2" className="carousel-image" />
        <div className="overlay-text">
          <p>Learn</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src={developImage} alt="Slide 3" className="carousel-image" />
        <div className="overlay-text">
          <p>Develop</p>
        </div>
      </div>
      {/* Add more slides here */}
    </Slider>
  );
};

export default Carousel;
