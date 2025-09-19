import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { AddProductForm } from "@/components/AddProductForm";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { products, loading } = useProducts();
  const { user } = useAuth();

  const handleBrowseClick = () => {
    setShowAddForm(false);
  };

  const handleSellClick = () => {
    setShowAddForm(true);
  };

  const handleProductAdded = () => {
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBrowseClick={handleBrowseClick} onSellClick={handleSellClick} />
      
      <main className="container py-8">
        {!showAddForm ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                DSU Marketplace
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Buy and sell items within the DSU community
              </p>
              <Button 
                onClick={handleSellClick}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-5 w-5 mr-2" />
                Sell Your Item
              </Button>
            </div>

            {/* Products Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Available Items</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Grid
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4 mr-2" />
                    List
                  </Button>
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 text-center">
              <Button 
                variant="ghost" 
                onClick={handleBrowseClick}
                className="mb-4"
              >
                ← Back to Products
              </Button>
            </div>
            <AddProductForm onProductAdded={handleProductAdded} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
