const request = require('request');
const csv = require('csv-parser');
const fs = require('fs');
const Book = require('./book');


function readCSVFile(callback) {
  const bookList = [];

  let parentDirectoryPath = 'D:/tiktok/07052023';

  fs.createReadStream(parentDirectoryPath + '/20230507.csv')
    .pipe(csv())
    .on('data', (row) => {



      // Loại bỏ khoảng trắng ở hai đầu của chuỗi
      let trimmedString = row.name.trim();

      // Loại bỏ toàn bộ các khoảng trắng trong chuỗi
      let noSpaceString = removeVietnameseTones(trimmedString.toLowerCase());

      // Loại bỏ các dấu trong chuỗi
      let directoryName = noSpaceString.replace(/\s+/g, '_');

      let path = `${parentDirectoryPath}/${directoryName}`;
    

      if (!fs.existsSync(path)) {
          // Sử dụng hàm mkdir của fs module để tạo thư mục mới
          fs.mkdir(path, (error) => {
            if (error) {
              console.log(`Lỗi khi tạo thư mục: ${error}`);
            } else {
              console.log(`Thư mục ${path} đã được tạo thành công.`);
              downloadImage(row.link1, path + '/image1.jpg');
              downloadImage(row.link2, path + '/image2.jpg');
              downloadImage(row.link3, path + '/image3.jpg');
              downloadImage(row.link4, path + '/image4.jpg');
              downloadImage(row.link5, path + '/image5.jpg');
            }
          });

        
      } else {
        downloadImage(row.link1, path + '/image1.jpg');
        downloadImage(row.link2, path + '/image2.jpg');
        downloadImage(row.link3, path + '/image3.jpg');
        downloadImage(row.link4, path + '/image4.jpg');
        downloadImage(row.link5, path + '/image5.jpg');

      };

      bookList.push(new Book(row.name, row.review, path + '/image1.jpg', path + '/image2.jpg', path + '/image3.jpg', path + '/image4.jpg', path + '/image5.jpg'));
    })
    .on('end', () => {
      callback(null, bookList);
    })
    .on('error', (error) => {
      callback(error, null);
    });
}

function downloadImage(url, path) {

  request(url).pipe(fs.createWriteStream(path)).on('close', function() {
    console.log('Hình ảnh đã được tải về!');
  });
  
}

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}




module.exports = { readCSVFile };

