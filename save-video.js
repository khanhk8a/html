const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

function saveVideo(imageDir, audioPath, outputPath) {

    if (!fs.existsSync(audioPath)) {
        console.log('Tệp âm thanh không tồn tại');
        return;
    }

    const command = ffmpeg();
    fs.readdir(imageDir, (err, files) => {
        if (err) console.error(err);
        else {
            const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
            if (imageFiles.length === 0) console.error('No image files found in directory');
            else {
                // Thêm tất cả các ảnh vào trong command
                for (let i = 0; i < imageFiles.length; i++) {
                    const inputPath = `${imageDir}/${imageFiles[i]}`;
                    if (fs.existsSync(inputPath)) { // Kiểm tra xem tệp tin đã tồn tại hay chưa
                        command.addInput(inputPath).inputOptions('-framerate', '1/10', '-r', '25', '-thread_queue_size', '512k', '-i', inputPath);
                    } else {
                        console.error(`File ${inputPath} not found`); // Nếu không tìm thấy file, xuất thông báo lỗi tương ứng
                    }
                }

                // Kiểm tra file âm thanh đã tồn tại hay chưa
                if (fs.existsSync(audioPath)) {
                    command.addInput(audioPath);
                } else {
                    console.error(`File ${audioPath} not found`);
                }

                command
                    .complexFilter([
                        `[0:v]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1[v0]`,
                        `[1:v]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1[v1]`,
                        `[2:v]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1[v2]`,
                        `[3:v]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1[v3]`,
                        `[4:v]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1[v4]`,
                        `[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[outv]`
                    ])
                    .outputOptions('-map', '[outv]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-r', '25') // Thiết lập tỷ lệ khung hình cho video đầu ra là 25 khung hình/giây
                    .output(outputPath)
                    .on('end', () => {
                        console.log('Video created successfully');
                    })
                    .run();
            }
        }
    });
}

module.exports = saveVideo;