import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductsStore } from './components/ProductsStore';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ServerError from './pages/ServerError';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen w-full bg-gray-100 text-black">
          <Routes>
            <Route path="/products" element={<ProductsStore />} />
            <Route path="/products/:productId" element={<ProductsStore />} />
            <Route path="/" element={<Navigate to="/products?page=1" replace />} />
            <Route path="*" element={<ServerError />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
