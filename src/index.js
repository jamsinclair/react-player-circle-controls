import React, {useRef} from 'react';
import PropTypes from 'prop-types';

const getCircleCenterCoords = ({x, y, width}) => {
  const radius = width / 2;
  return {x: x + radius, y: y + radius};
};

const getRotationForPoint = (vertex, point) => {
  // Probably better way to name and approach these
  // My high school trigonometry knowledge is fuzzy, please help!
  const adjacent = vertex.y - point.y;
  const opposite = point.x - vertex.x;
  const centralAngle = Math.atan(opposite / adjacent);
  const mod = point.y > vertex.y ? Math.PI : 2 * Math.PI;
  const rotation = (centralAngle + mod) > 2 * Math.PI ? centralAngle : centralAngle + mod;
  return rotation / (2 * Math.PI);
};

const getDefaultLabels = playing => ({
  PLAY_BUTTON: playing ? 'Pause' : 'Play'
});

// eslint-disable-next-line react/prop-types
const PlayIcon = ({playing}) => <span className={`rpc-play-icon${playing ? ' pause' : ''}`}/>;

const ReactCirclePlayer = ({
  ariaLabels,
  color = 'RoyalBlue',
  icon,
  loaded = 0,
  progressSize = 12,
  played = 0,
  playing,
  size = 128,
  onSeek,
  onTogglePlaying
}) => {
  const playerRef = useRef(null);
  const buttonRef = useRef(null);
  const labels = ariaLabels || getDefaultLabels(playing, played);
  const vars = {
    '--rpc-color': color,
    '--rpc-progress-loaded': loaded,
    '--rpc-progress-played': played,
    '--rpc-progress-size': `${progressSize}px`,
    '--rpc-size': `${size}px`
  };

  const onSeekClick = e => {
    if (buttonRef.current && buttonRef.current.contains(e.target)) {
      return;
    }

    const point = {x: e.clientX, y: e.clientY};
    const vertex = getCircleCenterCoords(playerRef.current.getBoundingClientRect());
    onSeek(getRotationForPoint(vertex, point));
  };

  return (
    <div className="rpc-player" style={vars} onClick={onSeek && onSeekClick}>
      <div ref={playerRef} className="rpc-player-inner">
        <svg className="rpc-ring-container">
          <circle shapeRendering="geometricPrecision" className="rpc-ring rpc-ring__duration"/>
          <circle shapeRendering="geometricPrecision" className="rpc-ring rpc-ring__loaded"/>
          <circle shapeRendering="geometricPrecision" className="rpc-ring rpc-ring__played"/>
        </svg>
        <button
          ref={buttonRef}
          type="button"
          className="rpc-play-button"
          aria-label={labels.PLAY_BUTTON}
          onClick={onTogglePlaying}
        >
          {icon || <PlayIcon playing={playing}/>}
        </button>
      </div>
    </div>
  );
};

ReactCirclePlayer.propTypes = {
  ariaLabels: PropTypes.shape({
    PLAY_BUTTON: PropTypes.string
  }),
  color: PropTypes.string,
  icon: PropTypes.node,
  loaded: PropTypes.number,
  progressSize: PropTypes.number,
  played: PropTypes.number,
  // eslint-disable-next-line react/boolean-prop-naming
  playing: PropTypes.bool,
  size: PropTypes.number,
  onSeek: PropTypes.func,
  onTogglePlaying: PropTypes.func
};

ReactCirclePlayer.defaultProps = {
  ariaLabels: null,
  color: 'RoyalBlue',
  icon: null,
  loaded: 0,
  progressSize: 12,
  played: 0,
  playing: false,
  size: 128,
  onSeek: null,
  onTogglePlaying: null
};

export default ReactCirclePlayer;
