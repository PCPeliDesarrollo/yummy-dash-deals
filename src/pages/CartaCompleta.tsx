import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, Wheat, Egg } from "lucide-react";
import { FaPiggyBank } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

        {productsByCategory.map(({ name, products: categoryProducts }) => (
          <section key={name} className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">
              {name}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categoryProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <span className="text-white font-bold text-sm">
                        {product.priceMedia ? `${product.priceMedia.toFixed(2)}€` : `${product.price.toFixed(2)}€`}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-foreground text-sm leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Product Detail Modal - Solo información, sin carrito */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold pr-8">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {selectedProduct.isGlutenFree && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      <Wheat className="h-3 w-3" />
                      Sin Gluten
                    </span>
                  )}
                  {selectedProduct.hasEgg && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      <Egg className="h-3 w-3" />
                      Contiene Huevo
                    </span>
                  )}
                  {selectedProduct.hasPork && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                      <FaPiggyBank className="h-3 w-3" />
                      Contiene Cerdo
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-1">Descripción</h4>
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                </div>

                {selectedProduct.options && selectedProduct.options.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Opciones disponibles</h4>
                    <ul className="space-y-1">
                      {selectedProduct.options.map(option => (
                        <li key={option.id} className="flex justify-between text-sm text-muted-foreground">
                          <span>{option.name}</span>
                          {option.price > 0 && (
                            <span className="text-primary font-medium">+{option.price.toFixed(2)}€</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">Precio</span>
                    <span className="text-2xl font-bold text-primary">
                      {selectedProduct.priceMedia 
                        ? `Desde ${selectedProduct.priceMedia.toFixed(2)}€`
                        : `${selectedProduct.price.toFixed(2)}€`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default CartaCompleta;
