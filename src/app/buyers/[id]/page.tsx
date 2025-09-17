'use client'
import '../../globals.css';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import Header from '../components/Header';
import { ProtectedRoute, useAuth } from '@/app/providers/AuthProvider';
import { User, Trash2, X, Tag, Info, AlertTriangle, LoaderCircle } from 'lucide-react';

// Zod schema remains the same for validation logic
const buyerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(80, 'Full name must be at most 80 characters'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  phone: z.string().regex(/^\d{10,15}$/, 'Phone must be 10-15 digits only'),
  city: z.enum(['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other']),
  propertyType: z.enum(['Apartment', 'Villa', 'Plot', 'Office', 'Retail']),
  bhk: z.enum(['Studio', 'One', 'Two', 'Three', 'Four']).optional(),
  purpose: z.enum(['Buy', 'Rent']),
  budgetMin: z.number().positive('Budget min must be positive').optional(),
  budgetMax: z.number().positive('Budget max must be positive').optional(),
  timeline: z.enum(['ZeroTo3m', 'ThreeTo6m', 'MoreThan6m', 'Exploring']),
  source: z.enum(['Website', 'Referral', 'WalkIn', 'Call', 'Other']),
  status: z.enum(['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped']),
  notes: z.string().max(1000, 'Notes must be at most 1000 characters').optional(),
  tags: z.array(z.string()).optional()
}).refine(data => !(['Apartment', 'Villa'].includes(data.propertyType) && !data.bhk), {
  message: "BHK is required for Apartment and Villa", path: ["bhk"]
}).refine(data => !(data.budgetMin && data.budgetMax && data.budgetMax < data.budgetMin), {
  message: "Budget max must be greater than or equal to budget min", path: ["budgetMax"]
});

type BuyerFormData = z.infer<typeof buyerSchema>;

// --- New Skeleton Loader Component ---
const FormSkeleton = () => (
    <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
            <div className="h-10 bg-gray-700 rounded w-28"></div>
        </div>
        <div className="space-y-6">
            <div className="h-14 bg-gray-700 rounded"></div>
            <div className="grid grid-cols-2 gap-6"><div className="h-14 bg-gray-700 rounded"></div><div className="h-14 bg-gray-700 rounded"></div></div>
            <div className="grid grid-cols-2 gap-6"><div className="h-14 bg-gray-700 rounded"></div><div className="h-14 bg-gray-700 rounded"></div></div>
            <div className="h-24 bg-gray-700 rounded"></div>
            <div className="flex justify-end gap-4 mt-8"><div className="h-12 bg-gray-700 rounded w-32"></div><div className="h-12 bg-gray-700 rounded w-40"></div></div>
        </div>
    </div>
);

// --- New Delete Confirmation Modal ---
const DeleteModal = ({ onConfirm, onCancel, isDeleting }: { onConfirm: () => void, onCancel: () => void, isDeleting: boolean }) => (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-gray-800 border border-red-500/30 rounded-lg p-6 shadow-2xl max-w-sm w-full mx-4">
            <div className="flex items-center gap-3">
                <div className="bg-red-500/20 p-2 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-400"/>
                </div>
                <h2 className="text-xl font-bold text-gray-100">Confirm Deletion</h2>
            </div>
            <p className="text-gray-400 mt-4">Are you sure you want to delete this lead? This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-gray-200 font-semibold rounded-md hover:bg-gray-500 transition-colors">Cancel</button>
                <button onClick={onConfirm} disabled={isDeleting} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors disabled:opacity-50">
                    {isDeleting ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5"/>}
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    </div>
);


export default function BuyerEditPage() {
    const { user } = useAuth();
    const params = useParams();
    const router = useRouter();
    const buyerId = params.id as string;

    const [formData, setFormData] = useState<Partial<BuyerFormData>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [ownerId, setOwnerId] = useState<string>("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    useEffect(() => {
        const fetchBuyer = async () => {
            try {
                const response = await fetch(`/api/buyers/${buyerId}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch buyer');
                }
                const buyer = data.data;
                setFormData({
                    fullName: buyer.fullName, email: buyer.email || '', phone: buyer.phone, city: buyer.city,
                    propertyType: buyer.propertyType, bhk: buyer.bhk, purpose: buyer.purpose,
                    budgetMin: buyer.budgetMin, budgetMax: buyer.budgetMax, timeline: buyer.timeline,
                    source: buyer.source, status: buyer.status, notes: buyer.notes || '',
                    tags: buyer.tags || []
                });
                setOwnerId(buyer.ownerId);
            } catch (error) {
                console.error('Error fetching buyer:', error);
                setErrors({ fetch: error instanceof Error ? error.message : 'Failed to load buyer data' });
            } finally {
                // Simulate a small delay for a smoother loading experience
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        if (buyerId) fetchBuyer();
    }, [buyerId]);

    const handleInputChange = (field: keyof BuyerFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
            handleInputChange('tags', [...(formData.tags || []), tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        handleInputChange('tags', formData.tags?.filter(tag => tag !== tagToRemove) || []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        try {
            const dataToValidate = {
                ...formData,
                email: formData.email || undefined,
                budgetMin: formData.budgetMin ? Number(formData.budgetMin) : undefined,
                budgetMax: formData.budgetMax ? Number(formData.budgetMax) : undefined,
                notes: formData.notes || undefined,
                tags: formData.tags || []
            };
            const validatedData = buyerSchema.parse(dataToValidate);
            const response = await fetch(`/api/buyers/${buyerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loggedInUser: user?.id, ...validatedData }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update buyer');
            }
            router.push('/buyers');
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((err) => {
                    const path = err.path[0] as string;
                    fieldErrors[path] = err.message;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ submit: error instanceof Error ? error.message : 'An error occurred' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/buyers/${buyerId}`, {
                method: 'DELETE',
                headers: { 'loggedInUser': user?.id || '' },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete buyer');
            }
            router.push('/buyers');
        } catch (error) {
            setErrors({ delete: error instanceof Error ? error.message : 'Failed to delete buyer' });
            setIsDeleting(false); // Stop loading on error
            setShowDeleteModal(false); // Close modal on error
        }
    };

    const isOwner = user?.id === ownerId;
    const isResidential = ['Apartment', 'Villa'].includes(formData.propertyType || '');

    if (errors.fetch) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gray-900">
                    <Header/>
                    <div className="flex items-center justify-center py-20">
                        <div className="bg-gray-800 border border-red-500/30 rounded-lg p-8 text-center">
                            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4"/>
                            <p className="text-xl font-semibold text-red-400">Error Loading Buyer</p>
                            <p className="text-gray-400 mt-2">{errors.fetch}</p>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return ( 
        <ProtectedRoute>
            {showDeleteModal && isOwner && (
                <DeleteModal 
                    onConfirm={handleDelete} 
                    onCancel={() => setShowDeleteModal(false)}
                    isDeleting={isDeleting}
                />
            )}
            <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:32px_32px]">
                <Header/>
                <main className="py-8">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-8 shadow-2xl">
                            {isLoading ? (
                                <FormSkeleton />
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
                                                <User className="w-8 h-8 text-yellow-400" />
                                                {isOwner ? 'Edit Lead' : 'View Lead'}
                                            </h1>
                                            <p className="text-gray-400 mt-1">Manage details for <span className="font-semibold text-gray-200">{formData.fullName}</span>.</p>
                                        </div>
                                        {isOwner && (
                                            <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200 transform hover:-translate-y-px shadow-lg hover:shadow-red-500/20 w-full sm:w-auto">
                                                <Trash2 className="w-4 h-4" /> Delete Lead
                                            </button>
                                        )}
                                    </div>
                                    
                                    {isOwner ? (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                                                <input type="text" value={formData.fullName || ''} onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Enter full name" />
                                                {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                                            </div>

                                            {/* Email & Phone */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                                    <input type="email" value={formData.email || ''} onChange={(e) => handleInputChange('email', e.target.value)}
                                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="you@example.com" />
                                                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone *</label>
                                                    <input type="tel" value={formData.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Enter 10-15 digit phone" />
                                                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                                                </div>
                                            </div>

                                            {/* City & Property Type */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">City *</label>
                                                    <select value={formData.city || ''} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full px-3 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                                        <option value="Chandigarh">Chandigarh</option>
                                                        <option value="Mohali">Mohali</option>
                                                        <option value="Zirakpur">Zirakpur</option>
                                                        <option value="Panchkula">Panchkula</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Property Type *</label>
                                                    <select value={formData.propertyType || ''} onChange={(e) => handleInputChange('propertyType', e.target.value)} className="w-full px-3 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                                        <option value="Apartment">Apartment</option>
                                                        <option value="Villa">Villa</option>
                                                        <option value="Plot">Plot</option>
                                                        <option value="Office">Office</option>
                                                        <option value="Retail">Retail</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            {/* BHK (Conditional) & Purpose */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                               {isResidential ? (
                                                 <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">BHK *</label>
                                                    <select value={formData.bhk || ''} onChange={(e) => handleInputChange('bhk', e.target.value)} className="w-full px-3 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                                        <option value="">Select BHK</option>
                                                        <option value="Studio">Studio</option>
                                                        <option value="One">1 BHK</option>
                                                        <option value="Two">2 BHK</option>
                                                        <option value="Three">3 BHK</option>
                                                        <option value="Four">4 BHK</option>
                                                    </select>
                                                    {errors.bhk && <p className="mt-1 text-sm text-red-400">{errors.bhk}</p>}
                                                 </div>
                                               ) : <div></div>} {/* Placeholder for grid alignment */}

                                               <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Purpose *</label>
                                                    <div className="flex gap-2 p-1 bg-gray-900/50 border border-gray-600 rounded-md">
                                                        <label className="flex-1">
                                                            <input type="radio" value="Buy" checked={formData.purpose === 'Buy'} onChange={(e) => handleInputChange('purpose', e.target.value)} className="sr-only peer" />
                                                            <div className="text-center py-2 px-4 rounded-md text-gray-300 peer-checked:bg-yellow-400 peer-checked:text-gray-900 font-bold cursor-pointer transition-colors duration-200">Buy</div>
                                                        </label>
                                                        <label className="flex-1">
                                                            <input type="radio" value="Rent" checked={formData.purpose === 'Rent'} onChange={(e) => handleInputChange('purpose', e.target.value)} className="sr-only peer" />
                                                            <div className="text-center py-2 px-4 rounded-md text-gray-300 peer-checked:bg-yellow-400 peer-checked:text-gray-900 font-bold cursor-pointer transition-colors duration-200">Rent</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Budget Range */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Budget Min (₹)</label>
                                                    <input type="number" value={formData.budgetMin || ''} onChange={(e) => handleInputChange('budgetMin', e.target.value ? parseInt(e.target.value) : undefined)}
                                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Minimum budget" />
                                                    {errors.budgetMin && <p className="mt-1 text-sm text-red-400">{errors.budgetMin}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Budget Max (₹)</label>
                                                    <input type="number" value={formData.budgetMax || ''} onChange={(e) => handleInputChange('budgetMax', e.target.value ? parseInt(e.target.value) : undefined)}
                                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Maximum budget" />
                                                    {errors.budgetMax && <p className="mt-1 text-sm text-red-400">{errors.budgetMax}</p>}
                                                </div>
                                            </div>

                                            {/* Timeline & Source */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                               <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Timeline *</label>
                                                    <select value={formData.timeline || ''} onChange={(e) => handleInputChange('timeline', e.target.value)} className="w-full px-3 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                                        <option value="ZeroTo3m">0-3 months</option>
                                                        <option value="ThreeTo6m">3-6 months</option>
                                                        <option value="MoreThan6m">More than 6 months</option>
                                                        <option value="Exploring">Just Exploring</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400 mb-2">Source *</label>
                                                    <select value={formData.source || ''} onChange={(e) => handleInputChange('source', e.target.value)} className="w-full px-3 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                                        <option value="Website">Website</option>
                                                        <option value="Referral">Referral</option>
                                                        <option value="WalkIn">Walk-in</option>
                                                        <option value="Call">Call</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            {/* Status */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Status *</label>
                                                <select value={formData.status || ''} onChange={(e) => handleInputChange('status', e.target.value)} className="w-full px-3 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                                    <option value="New">New</option>
                                                    <option value="Qualified">Qualified</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Visited">Visited</option>
                                                    <option value="Negotiation">Negotiation</option>
                                                    <option value="Converted">Converted</option>
                                                    <option value="Dropped">Dropped</option>
                                                </select>
                                                {errors.status && <p className="mt-1 text-sm text-red-400">{errors.status}</p>}
                                            </div>
                                            
                                            {/* Notes */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                                                <textarea value={formData.notes || ''} onChange={(e) => handleInputChange('notes', e.target.value)} rows={4}
                                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    placeholder="Additional notes about the lead" maxLength={1000} />
                                                <p className="mt-1 text-xs text-gray-500 text-right">{(formData.notes || '').length}/1000</p>
                                            </div>

                                            {/* Tags */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                                                <div className="flex gap-2 mb-2">
                                                    <div className="relative flex-1">
                                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"/>
                                                        <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                                            className="w-full pl-9 pr-4 py-2 bg-gray-900/50 border border-gray-600 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Add a tag..." />
                                                    </div>
                                                    <button type="button" onClick={addTag} className="px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500 transition-colors">Add</button>
                                                </div>
                                                <div className="flex flex-wrap gap-2 min-h-[2rem]">
                                                    {formData.tags?.map((tag, index) => (
                                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-400/20 text-yellow-300">
                                                            {tag}
                                                            <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-yellow-400 hover:text-white">&times;</button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="pt-6 border-t border-gray-700/50 flex items-center justify-end gap-4">
                                                <button type="button" onClick={() => router.push('/buyers')} className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-gray-200 font-semibold rounded-md hover:bg-gray-500 transition-colors duration-200">
                                                    <X className="w-5 h-5"/> Cancel
                                                </button>
                                                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-300 transition-all duration-200 transform hover:-translate-y-px shadow-lg hover:shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                                    {isSubmitting ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <User className="w-5 h-5"/>}
                                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                                </button>
                                            </div>
                                            {errors.submit && <p className="mt-1 text-sm text-red-400 text-center">{errors.submit}</p>}
                                        </form>
                                    ) : (
                                        <div className="w-full flex flex-col items-center justify-center gap-2 p-6 bg-gray-900/50 border border-gray-600 text-gray-400 rounded-md">
                                            <Info className="w-8 h-8 text-yellow-500"/>
                                            <p className="text-lg">You are viewing this lead.</p>
                                            <p>Only the owner can make changes.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}

