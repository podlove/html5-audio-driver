import { compose, curry } from "ramda";

import { appendNode, setAttributes, createNode } from "./utils";
import { mediaPolyfill } from "./polyfills";
import { MediaElement } from "./types";

const createSource = (source: MediaSource): MediaElement => {
  const node = createNode("source");
  return setAttributes(node, source);
};

const createSourceNodes = curry(
  (node: MediaElement, sources: MediaSource[]): MediaElement => {
    const sourceNodes = sources.map(createSource);
    return appendNode(node, sourceNodes);
  }
);

const mediaNode = compose(mediaPolyfill, createNode);

export { createSourceNodes, mediaNode };
