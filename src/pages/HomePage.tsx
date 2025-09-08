import { useState, useEffect } from "react";
import InstagramHeader from "@/components/InstagramHeader";
import InstagramStories from "@/components/InstagramStories";
import InstagramPost from "@/components/InstagramPost";
import PostModal from "@/components/PostModal";

const HomePage = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Mock data for posts
  const posts = [
    {
      id: "1",
      type: "lost" as const,
      itemName: "iPhone 13 Pro Max",
      description: "Lost my phone yesterday evening around the campus library. It has a clear case with some stickers on it. Please contact me if you find it!",
      location: "Main Library",
      date: "2024-01-15",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      userName: "sarah_jones",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=100&h=100&fit=crop",
      category: "Electronics"
    },
    {
      id: "2", 
      type: "found" as const,
      itemName: "Red Backpack",
      description: "Found this backpack in the student cafeteria today morning. It has some notebooks and a water bottle inside. Owner can contact me to claim it.",
      location: "Student Cafeteria", 
      date: "2024-01-16",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      userName: "mike_chen",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      category: "Bags"
    },
    {
      id: "3",
      type: "lost" as const,
      itemName: "Silver Watch",
      description: "My grandfather's vintage watch. Has sentimental value. Lost somewhere between the gym and parking lot B. Reward offered!",
      location: "Between Gym & Parking B",
      date: "2024-01-14", 
      userName: "alex_rivera",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      category: "Jewelry"
    }
  ];

  // Handle swipe to post (simplified - in real app would use touch events)
  useEffect(() => {
    let startX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      // Left swipe (swipe distance > 100px)
      if (diff > 100) {
        setIsPostModalOpen(true);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <InstagramHeader />
      <InstagramStories />
      
      {/* Posts Feed */}
      <main className="max-w-md mx-auto">
        {posts.map((post) => (
          <InstagramPost key={post.id} {...post} />
        ))}
      </main>

      {/* Swipe hint */}
      <div className="fixed bottom-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground">
        ← Swipe left to post
      </div>

      <PostModal 
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;