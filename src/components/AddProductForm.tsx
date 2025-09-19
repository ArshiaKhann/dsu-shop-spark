import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface AddProductFormProps {
  onProductAdded: () => void;
}

export const AddProductForm = ({ onProductAdded }: AddProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    seller_name: "",
  });
  const [loading, setLoading] = useState(false);
  const { addProduct } = useProducts();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add a product",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await addProduct({
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        seller_name: formData.seller_name,
        location: 'DSU',
        availability: 'Available',
      });

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Product added successfully!",
        });
        
        // Reset form
        setFormData({
          name: "",
          price: "",
          description: "",
          seller_name: "",
        });
        
        onProductAdded();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Sell Your Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., iPhone 13"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price in rupees"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your item..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller_name">Seller Name</Label>
            <Input
              id="seller_name"
              name="seller_name"
              value={formData.seller_name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value="DSU"
              disabled
              className="bg-muted"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding Product..." : "List Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};