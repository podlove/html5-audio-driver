import { audio } from "../src";
import { attatchStream } from "../src/hls";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";

const sources = [
  {
    url: "https://ndr-ndr2-niedersachsen.cast.addradio.de/ndr/ndr2/niedersachsen/mp3/128/stream.mp3",
    mimeType: "audio/mp3",
  },
];

export default () => {
  const myAudio = attatchStream(audio(sources));

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
};
