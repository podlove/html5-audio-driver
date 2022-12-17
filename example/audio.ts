import { audio } from "../src";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";
import { registerFilters } from "./src/filters";

export default () => {
  const myAudio = audio([
    {
      src: "./audio-files/example.m4a",
      type: "audio/mp4",
    },
    {
      src: "./audio-files/example.mp3",
      type: "audio/mp3",
    },
    {
      src: "./audio-files/example.ogg",
      type: "audio/ogg",
    },
  ]);

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
  registerFilters(myAudio);
};
