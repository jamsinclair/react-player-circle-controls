# React Player Circle

> Circular UI for representing media playback

[![NPM](https://img.shields.io/npm/v/react-player-circle.svg)](https://www.npmjs.com/package/react-player-circle)

## Install

```bash
npm install --save react-player-circle
# OR
yarn add react-player-circle
```

## Usage

You'll need to use the component in conjunction with another media player library.

It was built with [react-player](https://github.com/CookPete/react-player) in mind but could work with others too.

```jsx
import React, {useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import ReactPlayerCircle from 'react-player-circle';
import 'react-player-circle/dist/react-player-circle.css';

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
      <ReactPlayerCircle
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
