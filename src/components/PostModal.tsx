import { useState } from "react";
import { Camera, X, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent } from "./ui/dialog";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostModal = ({ isOpen, onClose }: PostModalProps) => {
  const [step, setStep] = useState<"type" | "details">("type");
  const [postType, setPostType] = useState<"lost" | "found" | null>(null);

  const handleTypeSelect = (type: "lost" | "found") => {
    setPostType(type);
    setStep("details");
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("type");
      setPostType(null);
    } else {
      onClose();
    }
  };

  const resetModal = () => {
    setStep("type");
    setPostType(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto h-full max-h-screen overflow-y-auto p-0">
        <div className="bg-background h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              {step === "type" ? <X className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
            </Button>
            <h2 className="font-semibold">
              {step === "type" ? "New Post" : `Report ${postType === "lost" ? "Lost" : "Found"} Item`}
            </h2>
            <div className="w-10" />
          </div>

          {/* Content */}
          {step === "type" ? (
            <div className="p-6 space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">What would you like to report?</h3>
                <p className="text-muted-foreground">Help your fellow students by reporting lost or found items</p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => handleTypeSelect("lost")}
                  className="w-full h-20 text-left justify-start bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0"
                >
                  <div>
                    <div className="text-lg font-semibold">I Lost Something</div>
                    <div className="text-sm opacity-90">Report an item you lost</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleTypeSelect("found")}
                  className="w-full h-20 text-left justify-start bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                >
                  <div>
                    <div className="text-lg font-semibold">I Found Something</div>
                    <div className="text-sm opacity-90">Report an item you found</div>
                  </div>
                </Button>
              </div>
            </div>
          ) : (
            <form className="p-4 space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Photo</Label>
                <div className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Tap to add photo</p>
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input id="itemName" placeholder="e.g., iPhone 13, Blue Backpack" />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder={`Describe the item in detail...`}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="location">
                    {postType === "lost" ? "Last Seen Location" : "Found Location"}
                  </Label>
                  <Input id="location" placeholder="e.g., Library, Cafeteria, Main Hall" />
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>

                {/* Categories */}
                <div>
                  <Label>Category</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Electronics", "Books", "Clothing", "Keys", "Jewelry", "Other"].map((category) => (
                      <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full h-12 text-base font-semibold">
                Post {postType === "lost" ? "Lost" : "Found"} Item
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;