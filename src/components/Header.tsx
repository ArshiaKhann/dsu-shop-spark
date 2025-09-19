import { ShoppingBag, Plus, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onBrowseClick?: () => void;
  onSellClick?: () => void;
}

export const Header = ({ onBrowseClick, onSellClick }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
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
          <Button variant="ghost" size="sm" onClick={handleAuthClick}>
            {user ? <LogOut className="h-4 w-4 mr-2" /> : <User className="h-4 w-4 mr-2" />}
            {user ? 'Logout' : 'Login'}
          </Button>
        </nav>
      </div>
    </header>
  );
};