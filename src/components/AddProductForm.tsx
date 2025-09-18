import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase later
    toast({
      title: "Product Added!",
      description: "Your product has been listed successfully.",
    });
    setFormData({ name: "", price: "", description: "" });
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
            <Label>Location</Label>
            <Input
              value="DSU"
              disabled
              className="bg-muted"
            />
          </div>
          
          <Button type="submit" className="w-full">
            List Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};