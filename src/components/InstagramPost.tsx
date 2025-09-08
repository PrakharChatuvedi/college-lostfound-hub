import { Heart, MessageCircle, Send, Bookmark, MapPin, Calendar, User, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface InstagramPostProps {
  id: string;
  type: "lost" | "found";
  itemName: string;
  description: string;
  location: string;
  date: string;
  imageUrl?: string;
  userName: string;
  userAvatar?: string;
  category: string;
}

const InstagramPost = ({ 
  type, 
  itemName, 
  description, 
  location, 
  date, 
  imageUrl, 
  userName, 
  userAvatar,
  category 
}: InstagramPostProps) => {
  return (
    <article className="bg-background border-b border-border">
      {/* Post Header */}
      <div className="flex items-center gap-3 p-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={userAvatar} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-semibold">{userName}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </div>
        <Badge variant={type === "lost" ? "destructive" : "secondary"}>
          {type === "lost" ? "LOST" : "FOUND"}
        </Badge>
      </div>

      {/* Post Image */}
      <div className="aspect-square bg-muted relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={itemName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Camera className="h-12 w-12" />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold">{itemName}</span>
          <Badge variant="outline" className="text-xs">{category}</Badge>
        </div>
        
        <p className="text-sm mb-2">
          <span className="font-semibold">{userName}</span> {description}
        </p>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <Calendar className="h-3 w-3" />
          <span>{type === "lost" ? "Lost on" : "Found on"} {date}</span>
        </div>

        <p className="text-xs text-muted-foreground">2 hours ago</p>
      </div>
    </article>
  );
};

export default InstagramPost;