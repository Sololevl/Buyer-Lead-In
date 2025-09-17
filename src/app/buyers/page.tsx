"use client"
import '../globals.css';
import { Suspense } from "react";
import { BuyersContent, BuyersSkeletonLoader } from './components/buyersContent';
import { ProtectedRoute } from '../providers/AuthProvider';
import Header from './components/Header';

export default function BuyersPage() {
  return (
    <ProtectedRoute>
      {/* New: Main page container with dark background and a subtle tech-style grid pattern */}
      <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:32px_32px]">
        <Header/>
        
        {/* Suspense is a modern React feature that handles loading states elegantly.
          While the <BuyersContent /> component is fetching data, Suspense will automatically
          show the `fallback` component, which we've set to our custom skeleton loader.
        */}
        <Suspense fallback={<BuyersSkeletonLoader />}>
          <BuyersContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}

