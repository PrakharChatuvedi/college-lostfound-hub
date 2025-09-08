import { Plus, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const InstagramStories = () => {
  const categories = [
    { name: "Electronics", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { name: "Books", color: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { name: "Clothing", color: "bg-gradient-to-br from-green-500 to-teal-500" },
    { name: "Keys", color: "bg-gradient-to-br from-orange-500 to-red-500" },
    { name: "Other", color: "bg-gradient-to-br from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="border-b border-border bg-background">
      <div className="flex gap-4 p-3 overflow-x-auto scrollbar-hide">
        {/* Add Your Story */}
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-dashed border-muted-foreground">
              <AvatarFallback className="bg-muted">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary"
            >
              <Camera className="h-3 w-3" />
            </Button>
          </div>
          <span className="text-xs text-center">Add Post</span>
        </div>

        {/* Category Stories */}
        {categories.map((category, index) => (
          <div key={category.name} className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className={`h-14 w-14 rounded-full ${category.color} p-0.5`}>
              <Avatar className="h-full w-full border-2 border-background">
                <AvatarFallback className="text-xs font-semibold text-white bg-transparent">
                  {category.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramStories;