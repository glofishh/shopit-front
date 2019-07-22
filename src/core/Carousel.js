import React, { useState, useEffect } from 'react';
import { Gallery, GalleryImage } from 'react-gesture-gallery';


//https://www.youtube.com/watch?v=AqOaI41TADU

const images = [
  "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80",
  "https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
  "https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
];


const Carousel = () => {
  const [index, setIndex] = useState(0);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (index === 4) {
  //       setIndex(0);
  //     } else {
  //       setIndex(prev => prev + 1);
  //     }
  //   }, 3000);
  //   return () => clearInterval(timer);
  // }, [index]);




  return (
    <div
      style={{
        background: "black",
        width: "100%",
        height: "100%"
      }}
    >
      <Gallery
        index={index}
        onRequestChange={i => {
          setIndex(i);
        }}
      >
        {images.map(image => (
          <GalleryImage objectFit='cover' key={image} src={image} />
        ))}
      </Gallery>
    </div>
  );
}

export default Carousel;

// <div class="chrome-fix">
// <Gallery
//   style={{
//     background: 'black',
//     height: '70vh',
//     width: '30wh'
//   }}
//   index={index}
//   onRequestChange={i => {
//     setIndex(i);
//   }}
// >
//   {images.map(image => (
//     <GalleryImage objectFit='cover' key={image} src={image} />
//   ))}
// </Gallery>
// </div>