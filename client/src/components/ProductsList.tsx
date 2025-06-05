import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types/Product';
import { ProductItem } from './ProductItem';
import { useNavigate } from 'react-router-dom';

type ProductListProps = {
  products: Product[];
  selectedProduct: Product | undefined;
};

export const ProductList = ({ products, selectedProduct }: ProductListProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (products.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center gap-4 p-4 w-full h-full">
        <div className="flex flex-col flex-wrap gap-4 flex-1">
          <p className="text-center align-middle text-gray-500">
            No products found. Try a different search or add one!
          </p>
        </div>
      </div>
    );
  }

  const handleItemClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="flex flex-row gap-4 p-4 w-full">
      <div className="flex flex-col flex-wrap gap-4 flex-1">
        {products.map((product) => (
          <div key={product?.id} onClick={() => handleItemClick(product.id)}>
            <ProductItem
              product={product}
              onUpdate={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
              selectedProduct={selectedProduct}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
