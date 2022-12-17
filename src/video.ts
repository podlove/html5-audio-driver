import { compose } from "ramda";

import { createSourceNodes, mediaNode } from "./media";
import { MediaSource } from "./types";
import { mountNode, toArray } from "./utils";

export const video = (sources: MediaSource[] | MediaSource) =>
  compose(mountNode, createSourceNodes(mediaNode("video")), toArray)(sources);
