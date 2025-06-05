import React from 'react';

const ServerError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Server Error</h1>
        <p className="text-gray-600 mb-4">
          We're sorry, but the server is currently unavailable. Please try again later.
        </p>
        <div className="animate-pulse">
          <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
