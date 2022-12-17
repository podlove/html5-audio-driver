import { audio } from "../src";
import { attatchStream } from "../src/hls";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";

const sources = [
  {
    src: "https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3?aggregator=web",
    type: "audio/mp3",
  },
];

export default () => {
  const myAudio = attatchStream(audio(sources));

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
};
