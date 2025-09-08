import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Calendar, Mail, Phone } from "lucide-react";

// Sample data - in real app this would come from an API
const sampleItems = [
  {
    id: 1,
    type: "lost",
    name: "iPhone 13 Pro",
    description: "Black iPhone 13 Pro with a clear case. Has a small crack on the screen.",
    category: "Electronics",
    location: "Library - Second Floor",
    date: "2024-01-15",
    contactEmail: "john.doe@university.edu",
    image: null
  },
  {
    id: 2,
    type: "found",
    name: "Blue Water Bottle",
    description: "Nalgene water bottle, dark blue color with university stickers.",
    category: "Personal Items",
    location: "Student Union - Cafeteria",
    date: "2024-01-14",
    contactEmail: "sarah.smith@university.edu",
    image: null
  },
  {
    id: 3,
    type: "lost",
    name: "MacBook Air",
    description: "13-inch MacBook Air, silver. Has programming stickers on the back.",
    category: "Electronics",
    location: "Computer Science Building",
    date: "2024-01-13",
    contactEmail: "mike.johnson@university.edu",
    image: null
  },
  {
    id: 4,
    type: "found",
    name: "Keys with Keychain",
    description: "Set of keys with a red Toyota keychain and several other keys.",
    category: "Keys",
    location: "Parking Lot B",
    date: "2024-01-12",
    contactEmail: "emma.wilson@university.edu",
    image: null
  },
  {
    id: 5,
    type: "lost",
    name: "Textbook - Psychology 101",
    description: "Introduction to Psychology textbook, 5th edition. Has my name written inside.",
    category: "Books",
    location: "Psychology Building - Room 204",
    date: "2024-01-11",
    contactEmail: "alex.brown@university.edu",
    image: null
  },
];

const BrowseItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredItems = sampleItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = [...new Set(sampleItems.map(item => item.category))];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Lost & Found Items
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search through reported items to find what you're looking for
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl shadow-soft p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Item Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="lost">Lost Items</SelectItem>
                <SelectItem value="found">Found Items</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setCategoryFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid gap-6">
            {filteredItems.map(item => (
              <Card key={item.id} className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                        <Badge variant={item.type === "lost" ? "destructive" : "secondary"}>
                          {item.type === "lost" ? "Lost" : "Found"}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{item.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => window.location.href = `mailto:${item.contactEmail}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact via Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Request Contact Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setCategoryFilter("all");
              }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;