import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';


const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel
      style={{
        height: "100%"
        // width: "100%"
      }}
      activeIndex={index}
      direction={direction}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          alt="First slide"
          position="absolute"
          top="0"
          left="0"
          // min-width="100%"
          // max-width="none"
          height="550"
          object-fit="cover"
        />
        <Carousel.Caption>
          <h3>PRE-FALL '19 COLLECTION</h3>
          <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          alt="Third slide"
          position="absolute"
          top="0"
          left="0"
          min-width="100%"
          max-width="none"
          height="550"
          object-fit="cover"
        />

        <Carousel.Caption>
          <h3>SUMMER SALE</h3>
          <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
          alt="Third slide"
          position="absolute"
          top="0"
          left="0"
          min-width="100%"
          max-width="none"
          height="550"
          object-fit="cover"
        />

        <Carousel.Caption>
          <h3>SHOP NEW ARRIVALS</h3>
          <h6>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </h6>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;