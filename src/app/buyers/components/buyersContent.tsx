"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import { Edit } from 'lucide-react'; // Changed icon

// ... (Buyer type and prisma-to-UI maps remain the same)
type Buyer = { id: string; fullName: string; phone: string; email?: string; city: string; propertyType: string; bhk?: string; purpose: string; budgetMin?: number; budgetMax?: number; timeline: string; status: string; updatedAt: string; ownerId: string; };
const timelinePrismaToUi: Record<string,string> = { ZeroTo3m: "0-3 months", ThreeTo6m: "3-6 months", MoreThan6m: ">6 months", Exploring: "Exploring" };
const bhkPrismaToUi: Record<string,string> = { Studio: "Studio", One: "1 BHK", Two: "2 BHK", Three: "3 BHK", Four: "4 BHK" };

// This is the component that shows the main table and skeleton loader
export function BuyersContent() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const city = searchParams.get("city") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const status = searchParams.get("status") || "";
  const timeline = searchParams.get("timeline") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      const params = new URLSearchParams({ page: page.toString(), city, propertyType, status, timeline, search });
      const res = await fetch(`/api/buyers?${params.toString()}`);
      const data = await res.json();
      const mappedBuyers = data.buyers.map((row: any) => ({
       ...row,
        bhk: bhkPrismaToUi[row.bhk] ?? row.bhk,
        timeline: timelinePrismaToUi[row.timeline] ?? row.timeline,
        tags: Array.isArray(row.tags) ? row.tags.join(", ") : ""
      }));
      setBuyers(mappedBuyers);
      setTotalPages(data.pagination.totalPages);
      setTimeout(() => setLoading(false), 500); 
    };
    fetchBuyers();
  }, [page, city, propertyType, status, timeline, search]);

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p.toString());
    router.push(`/buyers?${params.toString()}`);
  };

  if (loading) return <BuyersSkeletonLoader />;

  return (
    <main className="p-4 sm:p-6">
      <SearchBar />
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-2xl p-4 overflow-x-auto">
        {buyers.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-yellow-500/30">
                <th className="p-3 text-left font-bold text-yellow-400 uppercase tracking-wider">Name</th>
                <th className="p-3 text-left font-bold text-yellow-400 uppercase tracking-wider">Phone</th>
                <th className="p-3 text-left font-bold text-yellow-400 uppercase tracking-wider">City</th>
                <th className="p-3 text-left font-bold text-yellow-400 uppercase tracking-wider">Property</th>
                <th className="p-3 text-left font-bold text-yellow-400 uppercase tracking-wider">Status</th>
                <th className="p-3 text-left font-bold text-yellow-400 uppercase tracking-wider">Updated</th>
                <th className="p-3 text-center font-bold text-yellow-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {buyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-yellow-400/10 transition-colors duration-200">
                  <td className="p-3 text-gray-200 font-semibold">{buyer.fullName}</td>
                  <td className="p-3 text-gray-300 font-mono">{buyer.phone}</td>
                  <td className="p-3 text-gray-300">{buyer.city}</td>
                  <td className="p-3 text-gray-300">{buyer.propertyType}{buyer.bhk ? ` - ${buyer.bhk}` : ''}</td>
                  <td className="p-3 text-gray-300">{buyer.status}</td>
                  <td className="p-3 text-gray-400">{new Date(buyer.updatedAt).toLocaleDateString()}</td>
                  <td className="p-3 text-center">
                    <a href={`/buyers/${buyer.id}`} className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-700 text-gray-200 font-bold rounded-md hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200 transform hover:scale-105">
                      <Edit className="w-4 h-4"/>
                      {/* --- THIS IS THE CHANGE --- */}
                      <span>Edit / View</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-300">No Leads Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or create a new lead.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex gap-2 mt-6 justify-center items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={`px-4 py-2 border border-gray-700 rounded-md font-semibold transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${ p === page ? "bg-yellow-400 text-gray-900 border-yellow-400" : "bg-gray-700/50 text-gray-300 hover:bg-gray-600" }`} onClick={() => goToPage(p)}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Skeleton loader remains the same
export function BuyersSkeletonLoader() {
  const SkeletonRow = () => (
    <tr className="border-b border-gray-700/50">
      {[...Array(7)].map((_, i) => (
        <td key={i} className="p-3"><div className="h-5 bg-gray-700 rounded w-full"></div></td>
      ))}
    </tr>
  );
  return (
    <main className="p-4 sm:p-6 animate-pulse">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 mb-8">
        <div className="h-6 w-1/3 bg-gray-700 rounded mb-4"></div>
        <div className="h-12 bg-gray-700 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-700/50">
              {[...Array(7)].map((_, i) => (
                <th key={i} className="p-3"><div className="h-5 bg-gray-700 rounded w-3/4"></div></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    </main>
  );
}

