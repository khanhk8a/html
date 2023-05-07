const fs = require('fs');
const saveVideo = require('./save-video.js');
const { readCSVFile } = require('./myModule.js');
const createAudioWithTextToSpeech = require('./textToSpeech.js');


readCSVFile((error, bookList) => {
  if (error) {
    console.error(error);
  } else {

    bookList.forEach(book => {
      const textCha = book.link1;
      const start = textCha.indexOf("/image1.jpg");
  
      // Sử dụng phương thức substring()
      const textCon1 = textCha.substring(0, start);
  
      doTask1(book.review, textCon1).then(() => {
        doTask2(textCon1, textCon1 + "/output.mp3", textCon1 + "/output.mp4");
      });
    });
   
    

  }

  function doTask1(textString, pathOutPut) {
    createAudioWithTextToSpeech(textString, pathOutPut)
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Task 1 is done");
        resolve();
      }, 2000);
    });
  }
  
  function doTask2(imageDir, audioPath, outputPath) {
    saveVideo(imageDir, audioPath, outputPath)
  }
  
 

});








