import { useState } from 'react';
import { RadioStation } from '@/components/RadioStation';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Radio } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  slogan: string;
  streamUrl: string;
  logo: string;
}

const stations: Station[] = [
  {
    id: 'cool-playlist',
    name: 'Cool - Playlist Group',
    slogan: 'La Música de Verdad',
    streamUrl: 'https://stream.zeno.fm/7tjjwkmvexqvv',
    logo: '/lovable-uploads/e78636f3-e204-41ef-8289-78e11cf7efff.png'
  }
];

const Index = () => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const handleStationSelect = (stationId: string) => {
    setSelectedStation(stationId);
  };

  const selectedStationData = stations.find(station => station.id === selectedStation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-radio-dark via-background to-radio-card">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Radio className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-radio-blue to-radio-orange bg-clip-text text-transparent">
              Playlist.com.ar
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Tu estación de radio online favorita
          </p>
        </div>

        {/* Stations List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Selecciona tu emisora
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {stations.map((station) => (
              <RadioStation
                key={station.id}
                id={station.id}
                name={station.name}
                slogan={station.slogan}
                streamUrl={station.streamUrl}
                logo={station.logo}
                isSelected={selectedStation === station.id}
                onSelect={handleStationSelect}
              />
            ))}
          </div>
        </div>

        {/* Audio Player */}
        {selectedStationData && (
          <div className="max-w-2xl mx-auto">
            <AudioPlayer
              streamUrl={selectedStationData.streamUrl}
              stationName={selectedStationData.name}
              stationLogo={selectedStationData.logo}
              isVisible={!!selectedStation}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground">
            © 2024 Playlist.com.ar - Todos los derechos reservados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
