import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  location: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-border/50">
      <CardContent className="p-4">
        <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">
            Product Image
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-price">
                {product.currency}{product.price}
              </span>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {product.location}
            </div>
            <Badge variant="secondary" className="text-xs">
              Available
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};