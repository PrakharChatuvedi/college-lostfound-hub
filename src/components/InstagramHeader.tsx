import { Camera, MessageCircle, Heart } from "lucide-react";
import { Button } from "./ui/button";

const InstagramHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <Camera className="h-6 w-6" />
          <h1 className="text-xl font-bold">LostFound</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default InstagramHeader;