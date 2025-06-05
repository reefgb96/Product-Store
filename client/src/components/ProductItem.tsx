import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import type { Product } from '../types/Product';
import { productService } from '../services/productService';
import emptyImage from '../assets/img/emptyImage.jpg';
import { useNavigate } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
  onUpdate: () => void;
  selectedProduct: Product | undefined;
}

export const ProductItem = ({ product, onUpdate, selectedProduct }: ProductItemProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateProductMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title?: string; description?: string; completed?: boolean };
    }) => productService.updateProduct(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteProductMutation.mutate(product?.id as any);
  };

  const handleItemClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleItemClick}
      className={`flex items-center gap-4 p-4 shadow border-black border-4 cursor-pointer ${selectedProduct?.id === product?.id ? 'hover:bg-[#9fc5f8]' : 'hover:bg-[#9fc6f856]'}  ${selectedProduct?.id === product?.id ? 'bg-[#9fc5f8]' : 'bg-white'} `}
    >
      <ProductImage />
      <ProductNameAndDesc {...{ product }} />
      <ProductBtn
        {...{ handleDelete }}
        {...{ deleteProductMutation }}
        {...{ updateProductMutation }}
      />
    </div>
  );
};

const ProductImage = () => {
  return (
    <div className="bg-black p-0 m-0 flex items-center">
      <img className="w-20 h-20 object-contain" alt="image" src={emptyImage} />
    </div>
  );
};

type ProductProps = {
  product: Product;
};

const ProductNameAndDesc: React.FC<ProductProps> = ({ product }) => {
  const formattedDate = new Date(product?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex-1">
      <h3 className={`text-lg font-medium text-black`}>{product?.title}</h3>
      {product?.description && <p className={`text-gray-600`}>{product?.description}</p>}
      <p className="text-sm text-gray-500">Created: {formattedDate}</p>
    </div>
  );
};

type ProductBtnProps = {
  handleDelete: (event: React.MouseEvent) => void;
  deleteProductMutation: UseMutationResult<void, Error, string | number, unknown>;
  updateProductMutation: UseMutationResult<
    Product,
    Error,
    {
      id: string;
      data: {
        title?: string;
        description?: string;
        completed?: boolean;
      };
    },
    unknown
  >;
};

const ProductBtn: React.FC<ProductBtnProps> = ({
  handleDelete,
  updateProductMutation,
  deleteProductMutation,
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={handleDelete}
        className="relative text-black bg-[#e69336] border-4 border-black px-4 py-1 hover:border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 rounded-none"
        disabled={updateProductMutation.isPending || deleteProductMutation.isPending}
      >
        {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};
