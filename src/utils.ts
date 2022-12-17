import { compose, curry, prop } from "ramda";
import { MediaElement, MediaSource } from "./types";

// Transformation utils
const collectProperties = curry(
  <T>(props: { [key: string]: Function }, val: MediaElement): T =>
    Object.keys(props).reduce(
      (result, name) =>
        Object.assign({}, result, {
          [name]: props[name](val),
        }),
      {}
    ) as T
);

const toArray = <T>(input: T | T[]): T[] =>
  Array.isArray(input) ? input : [input];

// Event Utils
const getNodeFromEvent = prop<HTMLElement>("target");

// Dom Utils
const createNode = (tag: string) => document.createElement(tag);
const appendNode = curry(
  (node: HTMLElement, childs: HTMLElement[]): HTMLElement => {
    toArray(childs).forEach((child) => {
      node.appendChild(child);
    });

    return node;
  }
);

const mountNode = <T>(child: T): T =>
  compose(() => child, appendNode(document.body))(child);

const setAttributes = curry(
  (node: HTMLElement, attributes: { [key: string]: any }) =>
    Object.keys(attributes).reduce((result, key) => {
      result.setAttribute(key, attributes[key]);
      return result;
    }, node)
);

const getMediaSources = (media: MediaElement): MediaSource[] =>
  Array.from(media.children).map((node) => ({
    src: node.getAttribute("src") || "",
    type: node.getAttribute("type") || "",
  }));

const dispatchEvent = curry((type, node) => {
  const event = new Event(type);

  node.dispatchEvent(event);

  return node;
});

const browser = (() => {
  const test = (regexp: RegExp) => regexp.test(window.navigator.userAgent);

  switch (true) {
    case test(/edg/i):
      return "edge";
    case test(/opr/i) && (!!(window as any).opr || !!(window as any).opera):
      return "opera";
    case test(/chrome/i) && !!(window as any).chrome:
      return "chrome";
    case test(/trident/i):
      return "ie";
    case test(/firefox/i):
      return "firefox";
    case test(/safari/i):
      return "safari";
    default:
      return "other";
  }
})();

const parseFloatInput = (input: string | number): number =>
  typeof input === "string" ? parseFloat(input) : input;

export {
  parseFloatInput,
  collectProperties,
  getNodeFromEvent,
  createNode,
  mountNode,
  setAttributes,
  appendNode,
  getMediaSources,
  dispatchEvent,
  browser,
  toArray,
};
