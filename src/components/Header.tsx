import { ShoppingBag, Plus, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "./AuthModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  onBrowseClick: () => void;
  onSellClick: () => void;
}

export const Header = ({ onBrowseClick, onSellClick }: HeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Logged out successfully!",
      });
    }
  };

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
          <Button variant="ghost" size="sm" onClick={onBrowseClick}>
            Browse
          </Button>
          <Button variant="outline" size="sm" onClick={onSellClick}>
            <Plus className="h-4 w-4 mr-2" />
            Sell Item
          </Button>
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </nav>
        
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
      </div>
    </header>
  );
};