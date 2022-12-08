import { audio } from "../src";
import { attatchStream } from "../src/hls";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";

const sources = [
  {
    url: "https://mcdn.br.de/br/hf/b5/master.m3u8",
    title: "HLS Stream",
    mimeType: "application/x-mpegURL",
  },
];

export default () => {
  const myAudio = attatchStream(audio(sources));

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
}
