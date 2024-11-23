import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import './videoPlayer.scss';

interface VideoPlayerProps {
  videoURL: string;
  thumbnail?: string | undefined;
  width?: number | string;
  height?: number | string;
}

const VideoPlayer = ({ videoURL, thumbnail, width = '100%', height = 'auto' }: VideoPlayerProps) => {
  const options = {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen', 'play-large'],
    autoplay: false,
    aspectRatio: '16:9',
    poster: thumbnail,
  };

  return (
    <div
      className="video-player-container"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <Plyr
        source={{
          type: 'video',
          sources: [
            {
              src: videoURL,
              type: 'video/mp4',
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default VideoPlayer;
