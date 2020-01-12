# React Player Circle Controls

> Circular UI Controls for playing media

[![NPM](https://img.shields.io/npm/v/react-player-circle-controls.svg)](https://www.npmjs.com/package/react-player-circle-controls)
[![Minified and Gzipped](https://badgen.net/bundlephobia/minzip/react-player-circle-controls)](https://bundlephobia.com/result?p=react-player-circle-controls@latest)

![Animation of Circle Controls](https://user-images.githubusercontent.com/5964236/72217574-41393200-3573-11ea-8d69-59647d660056.gif)

## Install

```bash
npm install --save react-player-circle-controls
# OR
yarn add react-player-circle-controls
```

## Usage

You'll need to use the component in conjunction with another media player library.

It was built with [react-player](https://github.com/CookPete/react-player) in mind but could work with others too.

[See the StoryBook app for live example](https://jamsinclair.github.io/react-player-circle-controls/?path=/story/overview--with-react-player)

```jsx
import React, {useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import CircleControls from 'react-player-circle-controls';
import 'react-player-circle-controls/dist/styles.css';

const Example = () => {
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0
  });

  const onSeek = amount => {
    if (player.current) {
      player.current.seekTo(amount, 'fraction');
    }
  };

  return (
    <>
      <ReactPlayer
        ref={player}
        url="https://soundcloud.com/dyad-duo-music/migrations"
        playing={playing}
        height="0"
        width="0"
        onProgress={setPlayerState}
        onEnded={() => setPlaying(false)}
      />
      <CircleControls
        played={playerState.played}
        loaded={playerState.loaded}
        playing={playing}
        onSeek={onSeek}
        onTogglePlaying={() => setPlaying(!playing)}
      />
    </>
  );
};
```

## License

MIT © [Jamie Sinclair](https://github.com/jamsinclair)
