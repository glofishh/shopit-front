import React, { useState } from 'react';
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
      activeIndex={index}
      direction={direction}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="https://source.unsplash.com/random/1602x600"
          alt="First slide"
          position="relative"
          min-width="100%"
          height="600"
          object-fit="cover"
        />
        <Carousel.Caption>
          <h3>PRE-FALL '19 COLLECTION</h3>
          <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="https://source.unsplash.com/random/1600x600"
          alt="Third slide"
          position="relative"
          min-width="100%"
          max-width="none"
          height="600"
          object-fit="cover"
        />
        <Carousel.Caption>
          <h3>SUMMER SALE</h3>
          <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="https://source.unsplash.com/random/1601x600"
          alt="Third slide"
          position="relative"
          min-width="100%"
          max-width="none"
          height="600"
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