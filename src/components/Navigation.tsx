import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, MapPin } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Lost & Found</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/browse") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Browse Items
            </Link>
            <Link
              to="/report-lost"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/report-lost") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Report Lost
            </Link>
            <Link
              to="/report-found"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/report-found") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Report Found
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-accent"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/browse")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-accent"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Browse Items
            </Link>
            <Link
              to="/report-lost"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/report-lost")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-accent"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Report Lost
            </Link>
            <Link
              to="/report-found"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive("/report-found")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-accent"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Report Found
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;