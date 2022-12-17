import { video } from "../src";
import { attatchStream } from "../src/hls";

import { registerActions } from "./src/actions";
import { registerEvents } from "./src/events";
import { registerInputs } from "./src/inputs";

export default () => {
  const myVideo = attatchStream(
    video({
      src: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      type: "application/x-mpegURL",
    })
  );

  document.getElementById("media-node")?.appendChild(myVideo);

  registerEvents(myVideo);
  registerActions(myVideo);
  registerInputs(myVideo);
};
