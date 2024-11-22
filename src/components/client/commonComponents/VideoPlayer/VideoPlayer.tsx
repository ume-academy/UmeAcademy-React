import Plyr from 'plyr-react';
import 'plyr/dist/plyr.css';
import  './videoPlayer.scss'

interface VideoPlayerProps {
  videoURL: string,
  thumbnail: string | undefined
}

const VideoPlayer = ( {videoURL, thumbnail} : VideoPlayerProps) => {
  
  const option = {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen', 'play-large'],
    autoPlay: true,
    aspectRatio: '16:9',
    poster: thumbnail
    // autoplay: false,
    // volume: 0.5,
    // muted: false,
    // clickToPlay: true,
    // hideControls: true,
    // resetOnEnd: false,
    // disableContextMenu: true,
    // displayDuration: true,
    // keyboard: {
    //   focused: true,
    //   global: true,
    // },
    // tooltips: {
    //   controls: false,
    //   seek: true,
    // },
    // iconUrl: 'https://cdn.ply
    
  }

  return (
    <div>
      <Plyr 
        source={{
          type: 'video',
          sources: [
            {
              src: videoURL,
              type: 'Video/mp4',
            },
          ],
        }}
        options={option}
      />
    </div>
  );
}

export default VideoPlayer;
