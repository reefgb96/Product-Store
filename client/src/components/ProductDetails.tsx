import { useState, type ChangeEvent, useEffect } from 'react';
import emptyImage from '../assets/img/emptyImage.jpg';
import type { Product } from '../types/Product';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';


type ProductDetailsProps = {
  product: Product | undefined;
  onSave: (product: Product) => Promise<void>;
  onClose?: () => void;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState<Product | undefined>(product);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Update state when the product prop changes
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => {
      if (!prev) return undefined; // If previous state was undefined, keep it undefined

      let updatedValue: string | number = value;
      if (name === 'price') {
        updatedValue = parseFloat(value) || 0;
      }

      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  };

  // Basic validation: name is not empty and price is greater than zero
  const isFormValid =
    editedProduct !== undefined && editedProduct.title !== '' && editedProduct.price > 0;

  const handleSave = async () => {
    if (isFormValid && editedProduct) {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        await onSave(editedProduct);
        setSuccessMessage(product?.id ? 'Product updated successfully!' : 'Product created successfully!');
        setTimeout(() => {
          onClose?.();
        }, 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save product');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative max-w-[100%] w-auto border-4 border-black p-4">
      <div className="absolute -top-4 -left- w-auto h-auto bg-[#f3f4f6] px-1">
        {editedProduct?.title || 'New Product'} Details
      </div>

      {error && <ErrorMessage message={error} />}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 border-2 border-green-500 text-green-700">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
          <img src={emptyImage} alt="Product" className="w-full h-full object-cover rounded-md" />
        </div>

        <span>Name:</span>
        <input
          name="title"
          value={editedProduct?.title || ''}
          onChange={handleInputChange}
          className="border-black border-4 p-2 bg-white"
        />

        <span>Description:</span>
        <textarea
          name="description"
          value={editedProduct?.description || ''}
          onChange={handleInputChange}
          className="border-black border-4 p-2 bg-white"
        />

        <span>Price:</span>
        <input
          name="price"
          type="number"
          value={editedProduct?.price || 0}
          onChange={handleInputChange}
          className="border-black border-4 p-2 bg-white min-w-max w-1/6"
        />

        <span className="flex flex-row-reverse w-full">
          <button
            onClick={handleSave}
            disabled={!isFormValid || isLoading}
            className={`relative text-black bg-[#b5d7aa] border-4 border-black px-4 py-1 hover:border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 rounded-none ${(!isFormValid || isLoading) && 'opacity-50 cursor-not-allowed'}`}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProductDetails;
