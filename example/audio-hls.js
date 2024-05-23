import 'file-loader?name=index.html!./index.html';

import { audio } from '@podlove/html5-audio-driver';
import { attatchStream } from '@podlove/html5-audio-driver/hls';

import { registerActions } from './src/actions';
import { registerEvents } from './src/events';
import { registerInputs } from './src/inputs';

const sources = [
  {
    url: "https://dradio-test-mp4.akamaized.net/ksv0961/hls/2024/05/19/sonntagsraetsel_drk_20240519_0930_50774248/master.m3u8",
    mimeType: 'application/x-mpegURL',
    size: 42800367
  }
];

const myAudio = attatchStream(audio(sources));

registerEvents(myAudio);
registerActions(myAudio);
registerInputs(myAudio);
