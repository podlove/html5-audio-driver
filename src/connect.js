import { attatchStream } from "./hls";
import { audio as createAudioElement } from "./audio";

import { events as mediaEvents } from "./events";
import { actions as mediaActions } from "./actions";
import { props } from "./props"

const ACTIONS = [
  'play',
  'pause',
  'load',
  'setPlaytime',
  'mute',
  'unmute',
  'setVolume',
  'setRate'
]

const EVENTS = [
  'onLoading',
  'onLoaded',
  'onPause',
  'onBufferChange',
  'onEnd',
  'onPlaytimeUpdate',
  'onVolumeChange',
  'onError',
  'onDurationChange',
  'onRateChange',
  'onPlay',
  'onBuffering',
  'onReady',
  'onFilterUpdate'
]

export const audio = () => {
  const facade = {
    state: {},
    load,
    mediaElement: null,
    actions: ACTIONS.reduce(
      (result, action) => ({
        ...result,
        [action]: () => {}
      }),
      {}
    ),
    events: EVENTS.reduce(
      (result, event) => ({
        ...result,
        [event]: handler => recievers[event].push(handler)
      }),
      {}
    )
  };

  const recievers = EVENTS.reduce(
    (result, event) => ({
      ...result,
      [event]: [() => facade.state = props(facade.mediaElement)]
    }),
    {}
  );

  function load(sources) {
    // remove media element
    facade.mediaElement && facade.mediaElement.parentNode.removeChild(facade.mediaElement);
    facade.actions.play = connect(sources, 'play');
    ACTIONS.forEach(action => {
      facade.actions[action] = connect(sources, action)
    });
  }

  function connect(sources, action) {
    return (params = []) => {
      // create a new media element
      facade.mediaElement = createAudioElement(sources);
      attatchStream(facade.mediaElement);

      // connect the events to existing recievers
      const eventEmitters = mediaEvents(facade.mediaElement);

      EVENTS.forEach(name =>
        recievers[name].forEach(receiver => eventEmitters[name](receiver))
      );

      // update actions to new media element
      const actionEmitters = mediaActions(facade.mediaElement);
      ACTIONS.forEach(name =>
        facade.actions[name] = actionEmitters[name]
      );

      // run the action
      action && facade.actions[action].call(null, params);
    };
  }

  return facade;
};
