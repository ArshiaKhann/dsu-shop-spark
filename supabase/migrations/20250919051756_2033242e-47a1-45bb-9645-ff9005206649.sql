-- Create products table for marketplace
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  seller_name TEXT NOT NULL,
  location TEXT DEFAULT 'DSU',
  availability TEXT DEFAULT 'Available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products (allow all users to read, only authenticated users to create/update/delete)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete products" 
ON public.products 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample products
INSERT INTO public.products (name, price, description, seller_name, location) VALUES
('Rice 1kg', 65.00, 'Premium quality rice', 'John Doe', 'DSU'),
('Notebook', 45.00, 'A4 size notebook', 'Jane Smith', 'DSU'),
('Toothpaste', 30.00, 'Fresh mint toothpaste', 'Bob Wilson', 'DSU'),
('Cooking Oil 1L', 120.00, 'Healthy cooking oil', 'Alice Brown', 'DSU'),
('Pen (Pack of 5)', 50.00, 'Blue ink pens', 'Mike Davis', 'DSU');