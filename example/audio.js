import { audio } from "../src";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";
import { registerFilters } from "./src/filters";

export default () => {
  const myAudio = audio([
    {
      url: "./audio-files/example.m4a",
      mimeType: "audio/mp4",
    },
    {
      url: "./audio-files/example.mp3",
      mimeType: "audio/mp3",
    },
    {
      url: "./audio-files/example.ogg",
      mimeType: "audio/ogg",
    },
  ]);

  registerEvents(myAudio);
  registerActions(myAudio);
  registerInputs(myAudio);
  registerFilters(myAudio);
};
