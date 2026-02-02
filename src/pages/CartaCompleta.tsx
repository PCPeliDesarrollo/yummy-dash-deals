import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, products } from "@/data/products";
import { Button } from "@/components/ui/button";

const getCategorySlug = (category: string) => {
  return category
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n');
};

const CartaCompleta = () => {
  const productsByCategory = categories.map(category => ({
    name: category,
    products: products.filter(p => p.category === category)
  }));

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Nuestra Carta Completa
        </h1>

        {productsByCategory.map(({ name, products }) => (
          <section key={name} className="mb-10">
            <Link 
              to={`/categoria/${getCategorySlug(name)}`}
              className="group inline-block"
            >
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 group-hover:underline">
                {name}
              </h2>
            </Link>
            
            <div className="grid gap-3">
              {products.map(product => (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  className="flex justify-between items-center p-3 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className="font-bold text-primary">
                      {product.priceMedia ? `${product.priceMedia.toFixed(2)}€` : `${product.price.toFixed(2)}€`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </main>
  );
};

export default CartaCompleta;
