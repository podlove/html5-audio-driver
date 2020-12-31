/* global HTMLMediaElement */
import Hls from "hls.js/dist/hls.light";
import { compose } from "ramda";

import { toArray, getMediaSources } from "./utils";

// See: https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/StreamingMediaGuide/DeployingHTTPLiveStreaming/DeployingHTTPLiveStreaming.html
const hlsSource = compose(
  (sources) =>
    sources.reduce(
      (result, source) =>
        result ||
        ~["application/x-mpegurl", "vnd.apple.mpegurl"].indexOf(
          source.mimeType.toLowerCase()
        )
          ? source.url
          : null,
      null
    ),
  toArray
);

export const isHLS = (sources) => {
  if (!Hls.isSupported()) {
    return false;
  }

  return !!hlsSource(sources);
};

export const attatchStream = (media) => {
  if (!Hls.isSupported()) {
    return media;
  }

  const hls = new Hls({
    liveDurationInfinity: true
  });

  const sources = getMediaSources(media);

  const hlsStream = hlsSource(sources);

  if (!hlsStream) {
    return media;
  }

  media.hls = hls;

  hls.attachMedia(media);
  hls.loadSource(hlsStream);

  // Finally start loading
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    hls.startLoad(-1);
  });

  // Translate errors to native media errors
  hls.on(Hls.Events.ERROR, function (event, data) {
    switch (data.tyoe) {
      case Hls.ErrorDetails.NETWORK_ERROR:
        hls.startLoad();
        media.dispatchEvent(
          new CustomEvent("error", {
            detail: { networkState: HTMLMediaElement.NETWORK_EMPTY },
          })
        );
        break;
      case Hls.ErrorTypes.OTHER_ERROR:
        hls.destroy();
        media.dispatchEvent(
          new CustomEvent("error", {
            detail: { networkState: HTMLMediaElement.NETWORK_NO_SOURCE },
          })
        );
        break;
      default:
        hls.recoverMediaError();
        break;
    }
  });

  return media;
};
