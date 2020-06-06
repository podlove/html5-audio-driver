import { path, compose, reduce, curry } from "ramda";

// Transformation utils
const collectProperties = (props = {}) => (val) =>
  Object.keys(props).reduce(
    (result, name) =>
      Object.assign({}, result, {
        [name]: props[name](val),
      }),
    {}
  );

const toArray = (input) => [].concat(input);

// Event Utils
const getNodeFromEvent = path(["target"]);

// Dom Utils
const createNode = (tag) => document.createElement(tag);
const appendNode = (node) =>
  compose(
    reduce((results, item) => {
      results.appendChild(item);
      return results;
    }, node),
    toArray
  );

const mountNode = (child) =>
  compose(() => child, appendNode(document.body))(child);

const setAttributes = (node) => (attributes) =>
  Object.keys(attributes).reduce((result, key) => {
    result.setAttribute(key, attributes[key]);
    return result;
  }, node);

const getMediaSources = (media) =>
  [...media.children].map((node) => ({
    url: node.getAttribute("src"),
    mimeType: node.getAttribute("type"),
  }));

const dispatchEvent = curry((type, node) => {
  const event = new Event(type);

  node.dispatchEvent(event);

  return node;
});

const browser = (() => {
  const test = (regexp) => regexp.test(window.navigator.userAgent);

  switch (true) {
    case test(/edg/i):
      return "edge";
    case test(/opr/i) && (!!window.opr || !!window.opera):
      return "opera";
    case test(/chrome/i) && !!window.chrome:
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

export {
  toArray,
  collectProperties,
  getNodeFromEvent,
  createNode,
  mountNode,
  setAttributes,
  appendNode,
  getMediaSources,
  dispatchEvent,
  browser
};
