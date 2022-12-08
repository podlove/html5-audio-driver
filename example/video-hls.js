import { video } from "../src";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";

export default () => {
  const myVideo = video({
    url: "http://docs.evostream.com/sample_content/assets/hls-bunny-166/playlist.m3u8",
    mimeType: "application/x-mpegURL",
  });

  document.getElementById("media-node").appendChild(myVideo);

  registerEvents(myVideo);
  registerActions(myVideo);
  registerInputs(myVideo);
};
