const fs = require('fs');
const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech');

function createAudioWithTextToSpeech(textString, pathOutPut) {

    // Tạo client mới với thông tin xác thực lấy từ biến môi trường GOOGLE_APPLICATION_CREDENTIALS
    const client = new textToSpeech.TextToSpeechClient();

    // Cấu hình yêu cầu Text-to-Speech
    const request = {
        input: { text: textString },
        voice: { languageCode: 'vi-VN', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Gọi API Text-to-Speech và ghi file âm thanh được trả về vào ổ đĩa
    client.synthesizeSpeech(request, (err, response) => {
        if (err) {
            console.error('ERROR:', err);
            return;
        }

        // Trích xuất nội dung âm thanh từ đối tượng response
        const audioContent = response.audioContent;

        // Tạo file âm thanh từ nội dung trích xuất được
        fs.writeFile(pathOutPut + "/output.mp3", audioContent, 'binary', (err) => {
            if (err) {
                console.error('Error:', err);
                return;
            }
            console.log('Audio content written to file: ' + pathOutPut + '/output.mp3');
        });
    });
}

module.exports = createAudioWithTextToSpeech;






