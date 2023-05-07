const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

function saveVideo(imageDir, audioPath, outputPath) {

    // const imageDir = 'D:/tiktok/07052023/abc/'; // Thư mục chứa các hình ảnh

    // const audioPath = path.join('D:/tiktok/07052023/abc/output.mp3');
    // const outputPath = path.join('D:/tiktok/07052023/abc/output.mp4');

    if (!fs.existsSync(audioPath)) {
        console.log('Tệp âm thanh không tồn tại');
        return;
    }

    // Lấy danh sách tất cả các file hình ảnh trong thư mục
    const images = fs.readdirSync(imageDir).filter(file => {
        const ext = path.extname(file);
        return ext === '.jpg' || ext === '.png' || ext === '.jpeg';
    });
    const random = ffmpeg();
    // Tạo chuỗi định dạng input cho ffmpeg
    images.forEach(image => 
        {
            console.log(imageDir + image);
            random
            .addInput(path.join(imageDir + image))
        }
    
        );

    random
    .addInput(audioPath)
    .output(outputPath)
    .on('end', () => console.log('Hoàn thành quá trình ghép nối và hợp nhất âm thanh.' 
    + outputPath))
    .run();
}

module.exports = saveVideo;