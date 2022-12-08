import { video } from "../src";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";

export default () => {
  const myVideo = video({
    url: "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4",
    mimeType: "video/mp4",
  });

  document.getElementById("media-node").appendChild(myVideo);

  registerEvents(myVideo);
  registerActions(myVideo);
  registerInputs(myVideo);
};
