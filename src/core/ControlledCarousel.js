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
          <h6>Luxurious Subtelty: Understated outerwear in the most restrained and exceptional of fabrics.</h6>
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
          <h3>SHOP BEST SELLERS</h3>
          <h6>Shop for our best-selling designer ready to wear collections for women and men.</h6>
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
          <h3>DISCOVER NEW ARRIVALS</h3>
          <h6>
            See latest styles of the season for women's and men's designer ready to wear.
          </h6>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default ControlledCarousel;