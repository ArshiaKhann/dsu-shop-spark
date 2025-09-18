import { ShoppingBag, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            DSU Marketplace
          </h1>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Browse
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Sell Item
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
};