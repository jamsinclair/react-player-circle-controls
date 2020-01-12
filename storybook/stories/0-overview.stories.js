import React, {useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import CircleControls from 'react-player-circle-controls';
// eslint-disable-next-line import/no-unassigned-import
import 'react-player-circle-controls/dist/styles.css';

export default {
  title: 'Overview',
  component: CircleControls
};

export const Basics = () => {
  return (
    <CircleControls
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
	import CircleControls from 'react-player-circle-controls';
	import 'react-player-circle-controls/dist/styles.css';
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
