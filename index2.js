const fs = require('fs');
const speech = require('@google-cloud/speech').v1p1beta1;

const client = new speech.SpeechClient();

const audioFile = 'sample.wav';

const audioBytes = fs.readFileSync(audioFile).toString('base64');

const audio = {
  content: audioBytes,
};

const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 44100,
  languageCode: 'en-US',
};

const request = {
  audio: audio,
  config: config,
};

client.recognize(request)
  .then(response => {
    const transcription = response[0].results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch(err => {
    console.error('Error:', err);
  });
