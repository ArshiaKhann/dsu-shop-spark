import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { AddProductForm } from "@/components/AddProductForm";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { products, loading, error, fetchProducts } = useProducts();
  const { user, loading: authLoading } = useAuth();

  const handleBrowseClick = () => {
    setShowAddForm(false);
    fetchProducts();
  };

  const handleSellClick = () => {
    if (!user) {
      return;
    }
    setShowAddForm(true);
  };

  const handleProductAdded = () => {
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onBrowseClick={handleBrowseClick}
        onSellClick={handleSellClick}
      />
      
      <main className="container py-8">
        {!showAddForm ? (
          <>
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
                disabled={!user}
              >
                <Plus className="h-5 w-5 mr-2" />
                {user ? 'Sell Your Item' : 'Login to Sell Items'}
              </Button>
            </div>

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
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading products...</span>
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Error loading products: {error}
                  </AlertDescription>
                </Alert>
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
                onClick={() => setShowAddForm(false)}
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