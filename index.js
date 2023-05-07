const fs = require('fs');
const saveVideo = require('./save-video.js');
const { readCSVFile } = require('./myModule.js');
const createAudioWithTextToSpeech = require('./textToSpeech.js');


readCSVFile((error, bookList) => {
  if (error) {
    console.error(error);
  } else {
    console.log(bookList[0].link1); 
  }
});








