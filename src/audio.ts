import { compose } from "ramda";

import { createSourceNodes, mediaNode } from "./media";
import { MediaElement, MediaSource } from "./types";
import { mountNode, toArray } from "./utils";

export const audio = compose<
  [MediaSource[]],
  MediaSource[],
  MediaElement,
  MediaElement
>(
  mountNode<MediaElement>,
  createSourceNodes(mediaNode("audio")),
  toArray<MediaSource>
);
