import { audio } from "../src";
import { attatchStream } from "../src/hls";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";

const sources = [
  {
    url: "https:/freakshow.fm/podlove/file/5377/s/webplayer/c/home/fs218-der-kann-kein-blut-hoeren.m4a",
    size: 84942216,
    title: "MPEG-4 AAC Audio (m4a)",
    mimeType: "audio/mp4",
  },
  {
    url: "https:/freakshow.fm/podlove/file/5373/s/webplayer/c/home/fs218-der-kann-kein-blut-hoeren.opus",
    size: 82338432,
    title: "Opus Audio (opus)",
    mimeType: "audio/opus",
  },
  {
    url: "https:/freakshow.fm/podlove/file/5372/s/webplayer/c/home/fs218-der-kann-kein-blut-hoeren.oga",
    size: 81611435,
    title: "Ogg Vorbis Audio (oga)",
    mimeType: "audio/ogg",
  },
  {
    url: "https:/freakshow.fm/podlove/file/5376/s/webplayer/c/home/fs218-der-kann-kein-blut-hoeren.mp3",
    size: 133433818,
    title: "MP3 Audio (mp3)",
    mimeType: "audio/mpeg",
  },
  {
    url: "https:/media.metaebene.me/hls/freakshow/fs218-der-kann-kein-blut-hoeren.m3u8",
    size: 195,
    title: "HLS Stream",
    mimeType: "application/x-mpegURL",
  },
];

export default () => {
  const myAudio = attatchStream(audio(sources));

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
};
