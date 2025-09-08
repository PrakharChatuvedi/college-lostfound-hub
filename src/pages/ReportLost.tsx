import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon, Upload, MapPin, Search } from "lucide-react";
import { format } from "date-fns";

const categories = [
  "Electronics",
  "Personal Items",
  "Books",
  "Clothing",
  "Keys",
  "Sports Equipment",
  "Other"
];

const locations = [
  "Library",
  "Student Union",
  "Computer Science Building",
  "Psychology Building",
  "Gymnasium",
  "Cafeteria",
  "Parking Lot A",
  "Parking Lot B",
  "Dormitory",
  "Other"
];

const ReportLost = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    location: "",
    contactEmail: "",
    contactPhone: ""
  });
  const [date, setDate] = useState<Date>();
  const [image, setImage] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.itemName || !formData.description || !formData.category || !formData.location || !formData.contactEmail || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would submit to an API
    toast.success("Lost item report submitted successfully! We'll notify you if someone finds it.");
    
    // Reset form
    setFormData({
      itemName: "",
      description: "",
      category: "",
      location: "",
      contactEmail: "",
      contactPhone: ""
    });
    setDate(undefined);
    setImage(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Report Lost Item
          </h1>
          <p className="text-xl text-muted-foreground">
            Help us help you find your lost item by providing detailed information
          </p>
        </div>

        {/* Form */}
        <Card className="bg-gradient-card shadow-medium">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="itemName" className="text-sm font-medium">
                  Item Name *
                </Label>
                <Input
                  id="itemName"
                  placeholder="e.g., iPhone 13, Blue Backpack, etc."
                  value={formData.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide as many details as possible: color, brand, distinctive features, condition, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>

              {/* Category and Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Last Seen Location *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Date Last Seen *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-sm font-medium">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium">
                  Upload Photo (Optional)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="image" className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                      <div className="text-sm text-muted-foreground">
                        {image ? image.name : "Click to upload an image of your lost item"}
                      </div>
                    </div>
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Submit Lost Item Report
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-8 bg-accent/10 border-accent/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-accent" />
              Tips for Better Results
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be as specific as possible in your description</li>
              <li>• Include unique identifying features or marks</li>
              <li>• Upload a clear photo if you have one</li>
              <li>• Check back regularly for updates</li>
              <li>• Consider posting in other campus groups or forums</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportLost;