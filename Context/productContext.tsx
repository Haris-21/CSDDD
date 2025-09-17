"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  productId: string;
  articleId: string;
  sku: string;
  source: string;
  vendor?: string;
  vendorCountry?: string;
  processes: string[];
  materials: string[];
  riskLevel: string;
};

type ProductContextType = {
  products: Product[];
  viewChain: (productId: number) => void;
  editProduct: (productId: number) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      productId: "PROD-001",
      articleId: "ART-TSH-001",
      sku: "TSH-COTTON-001",
      source: "In-house",
      processes: ["Cutting", "Stitching", "Quality Check"],
      materials: ["Organic Cotton", "Polyester Thread"],
      riskLevel: "Low",
    },
    {
      id: 2,
      name: "Denim Jeans Classic",
      productId: "PROD-002",
      articleId: "ART-JNS-002",
      sku: "JNS-DENIM-002",
      source: "Outsourced",
      vendor: "Global Textile Co.",
      vendorCountry: "Bangladesh",
      processes: ["Dyeing", "Cutting", "Stitching"],
      materials: ["Denim Fabric", "Metal Buttons"],
      riskLevel: "High",
    },
  ]);

  // ---- Actions ----
  const viewChain = (productId: number) => {
    router.push(`/products/chain/${productId}`);
  };

  const editProduct = (productId: number) => {
    router.push(`/products/edit/${productId}`);
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, id: prev.length + 1 }]);
  };

const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };


  return (
    <ProductContext.Provider value={{ products, viewChain, editProduct, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};
