import React, {useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import ReactPlayerCircle from 'react-player-circle';
// eslint-disable-next-line import/no-unassigned-import
import 'react-player-circle/dist/react-player-circle.css';

export default {
  title: 'Overview',
  component: ReactPlayerCircle
};

export const Basics = () => {
  return (
    <ReactPlayerCircle
      loaded={0.9}
      played={0.3}
      size={150}
      playing={false}
    />
  );
};

export const WithReactPlayer = () => {
/*
	// Uses the Following Imports
	import React, {useRef, useState} from 'react';
	import ReactPlayer from 'react-player';
	import ReactPlayerCircle from 'react-player-circle';
	import 'react-player-circle/dist/react-player-circle.css';
*/

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
