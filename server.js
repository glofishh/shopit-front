const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'build')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'build', 'index.html'));
  });
};

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));})

//start server
app.listen(PORT, () => {
  console.log( `server listening on port: ${PORT}`);
})


// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// });

// app.listen(PORT, () => {
//   console.log(`app is running on port ${PORT}`);
// });