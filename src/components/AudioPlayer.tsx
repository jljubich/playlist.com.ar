import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  streamUrl: string;
  stationName: string;
  stationLogo: string;
  isVisible: boolean;
}

export const AudioPlayer = ({ streamUrl, stationName, stationLogo, isVisible }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const handlePlay = async () => {
    if (!audioRef.current) return;
    
    setIsLoading(true);
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
      if (newVolume[0] === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-br from-radio-card to-radio-hover rounded-xl p-6 shadow-xl border border-border">
      <audio 
        ref={audioRef}
        src={streamUrl}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
        }}
      />
      
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src={stationLogo} 
          alt={`${stationName} logo`} 
          className="w-12 h-12 rounded-full object-cover shadow-md"
        />
        <div>
          <h3 className="text-lg font-bold text-foreground">Reproduciendo</h3>
          <p className="text-sm text-muted-foreground">{stationName}</p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isLoading}
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-radio-blue to-radio-orange hover:shadow-glow transition-all duration-300"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>
        
        <Button
          onClick={handleStop}
          size="lg"
          variant="secondary"
          className="w-12 h-12 rounded-full"
        >
          <Square className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          onClick={toggleMute}
          size="sm"
          variant="ghost"
          className="p-2"
        >
          {isMuted || volume[0] === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
        
        <div className="flex-1">
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        
        <span className="text-sm text-muted-foreground min-w-[3rem] text-right">
          {isMuted ? 0 : volume[0]}%
        </span>
      </div>
    </div>
  );
};