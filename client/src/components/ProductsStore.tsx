import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { Header } from './Header';
import { ProductList } from './ProductsList';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { ProductToolbar } from './ProductToolbar';
import PaginationBar from './PaginationBar';
import type { Product, CreateProductInput, UpdateProductInput } from '../types/Product';
import ProductDetails from './ProductDetails';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

export const ProductsStore = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const currentPageFromUrl = parseInt(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState<number>(currentPageFromUrl);
  const [isAddProduct, setIsAddProduct] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        prev.set('search', debouncedSearch);
        prev.set('page', '1');
        return prev;
      },
      { replace: true }
    );
  }, [debouncedSearch, setSearchParams]);

  const {
    data: fetchedProducts = [],
    isLoading,
    error: fetchError,
  } = useQuery<Product[]>({
    queryKey: ['products', searchParams.toString()],
    queryFn: () => {
      const search = searchParams.get('search') || undefined;
      const sortBy = searchParams.get('sortBy') || undefined;
      const page = searchParams.get('page') || '1';
      const limit = productsPerPage.toString();
      return productService.getAllProducts(search, sortBy, page, limit);
    },
    enabled: true,
  });

  const {
    data: selectedProductDetails,
    isLoading: isLoadingProductDetails,
    error: productDetailsError,
  } = useQuery<Product | undefined>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (productId === 'new') {
        return {
          id: ('temp-' + Date.now().toString()) as any,
          title: '',
          description: '',
          price: 0,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isTemporary: true,
        } as Product;
      } else if (productId) {
        return productService.getProductById(productId);
      }
      return undefined;
    },
    enabled: !!productId,
    staleTime: Infinity,
  });

  const [products, setProducts] = useState<Product[]>(fetchedProducts);
  const [sortBy, setSortBy] = useState<string>('name');
  const productsPerPage = 5;

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  useEffect(() => {
    setCurrentPage(currentPageFromUrl);
  }, [currentPageFromUrl]);

  const addProductMutation = useMutation({
    mutationFn: productService.addProduct,
    onSuccess: (newProduct) => {
      setProducts((prev) => prev.filter((p) => !(p as any).isTemporary));
      if (newProduct) {
        if (typeof newProduct.id === 'number' && !products.find((p) => p.id === newProduct.id)) {
          setProducts((prev) => [...prev, newProduct]);
        }
        navigate(`/products/${newProduct.id}?${searchParams.toString()}`);
        queryClient.invalidateQueries({ queryKey: ['products', searchParams.toString()] });
        queryClient.invalidateQueries({ queryKey: ['product', newProduct.id] });
      } else {
        setError('Failed to create product');
        setProducts((prev) => prev.filter((p) => !(p as any).isTemporary));
        navigate(`/products?${searchParams.toString()}`);
      }
    },
    onError: (error) => {
      setError('Failed to create product');
      setProducts((prev) => prev.filter((p) => !(p as any).isTemporary));
      navigate(`/products?${searchParams.toString()}`);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateProductInput }) =>
      productService.updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      setProducts((prev) =>
        prev.map((p) =>
          p && updatedProduct && typeof p.id === 'number' && p.id === updatedProduct.id
            ? updatedProduct
            : p
        )
      );
      queryClient.invalidateQueries({ queryKey: ['products', searchParams.toString()] });
      if (updatedProduct && typeof updatedProduct.id === 'number') {
        queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });
      }
    },
    onError: (error) => {
      setError('Failed to update product');
    },
  });

  const handleAddProduct = () => {
    setIsAddProduct((prev) => !prev);
    navigate(`/products/new?${searchParams.toString()}`);
  };

  const handleSaveProduct = async (productToSave: Product): Promise<void> => {
    if (!productToSave) return;

    try {
      if ((productToSave as any).isTemporary) {
        const createInput: CreateProductInput = {
          title: productToSave.title,
          description: productToSave.description,
          price: productToSave.price,
        };
        await addProductMutation.mutateAsync(createInput);
      } else {
        const updateInput: UpdateProductInput = {
          title: productToSave.title,
          description: productToSave.description,
          price: productToSave.price,
          completed: productToSave.completed,
        };
        await updateProductMutation.mutateAsync({
          id: productToSave.id,
          data: updateInput,
        });
      }
      setIsAddProduct((prev) => !prev);
    } catch (error) {
      throw error;
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setSearchParams(
      (prev) => {
        prev.set('sortBy', value);
        prev.set('page', '1');
        return prev;
      },
      { replace: true }
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedProducts = fetchedProducts;
  const totalItems = fetchedProducts.length;
  const totalPages = Math.ceil(totalItems / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return displayedProducts.slice(start, start + productsPerPage);
  }, [displayedProducts, currentPage, productsPerPage]);

  const productToDisplay = selectedProductDetails;

  if (isLoading || isLoadingProductDetails) return <Loader />;
  if (fetchError || productDetailsError) {
    return <ErrorMessage message="Failed to load products. Please try again later." />;
  }

  return (
    <div className="w-full mx-auto flex flex-row">
      <div className="flex flex-col w-full">
        <Header />
        {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}
        <ProductToolbar
          searchQuery={search}
          onSearchChange={handleSearchChange}
          onAdd={handleAddProduct}
          sortValue={sortBy}
          onSortChange={handleSortChange}
        />
        <div className="flex flex-row w-full">
          <ProductList products={paginatedProducts} selectedProduct={selectedProductDetails} />
          {(isAddProduct || productId) && (
            <div className="w-1/2 p-4">
              <ProductDetails product={productToDisplay} onSave={handleSaveProduct} />
            </div>
          )}
        </div>
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
