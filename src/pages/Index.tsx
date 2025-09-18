import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { AddProductForm } from "@/components/AddProductForm";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3, List } from "lucide-react";

const initialProducts = [
  { id: 1, name: "Rice 1kg", price: 65, currency: "₹", location: "DSU", availability: "Available" },
  { id: 2, name: "Notebook", price: 45, currency: "₹", location: "DSU", availability: "Available" },
  { id: 3, name: "Toothpaste", price: 30, currency: "₹", location: "DSU", availability: "Available" },
  { id: 4, name: "Cooking Oil 1L", price: 120, currency: "₹", location: "DSU", availability: "Available" },
  { id: 5, name: "Pen (Pack of 5)", price: 50, currency: "₹", location: "DSU", availability: "Available" }
];

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products] = useState(initialProducts);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
                onClick={() => setShowAddForm(true)}
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
              
              <ProductGrid products={products} />
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
            <AddProductForm />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
