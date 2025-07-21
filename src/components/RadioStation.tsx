interface RadioStationProps {
  id: string;
  name: string;
  slogan: string;
  streamUrl: string;
  logo: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const RadioStation = ({ id, name, slogan, streamUrl, logo, isSelected, onSelect }: RadioStationProps) => {
  return (
    <div 
      className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected 
          ? 'bg-gradient-to-br from-radio-blue/20 to-radio-orange/20 border-2 border-primary shadow-lg' 
          : 'bg-card hover:bg-radio-hover border border-border'
      }`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{slogan}</p>
        </div>
        <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
          isSelected ? 'bg-primary shadow-glow' : 'border-2 border-muted-foreground'
        }`} />
      </div>
    </div>
  );
};