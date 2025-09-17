"use client";
import '../../globals.css';
import { useState } from 'react';
import { ProtectedRoute, useAuth } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import Header from '../components/Header';
import { UserPlus, Save, X, Tag, LoaderCircle } from 'lucide-react';

// Centralized Zod schema for validation
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
  notes: z.string().max(1000, 'Notes must be at most 1000 characters').optional(),
  tags: z.array(z.string()).optional(),
  ownerId: z.string().min(1, 'Owner ID is required')
}).refine(data => !(['Apartment', 'Villa'].includes(data.propertyType) && !data.bhk), {
  message: "BHK is required for Apartment and Villa", path: ["bhk"]
}).refine(data => !(data.budgetMin && data.budgetMax && data.budgetMax < data.budgetMin), {
  message: "Budget max must be greater than or equal to budget min", path: ["budgetMax"]
});

type BuyerFormData = z.infer<typeof buyerSchema>;

export default function CreateLeadPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<BuyerFormData>>({
    city: 'Chandigarh',
    propertyType: 'Apartment',
    purpose: 'Buy',
    timeline: 'Exploring',
    source: 'Website',
    tags: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

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
      if (!user?.id) {
        setErrors({ submit: 'You must be logged in to create a lead.' });
        return;
      }

      const dataToValidate = {
        ...formData,
        email: formData.email || undefined,
        budgetMin: formData.budgetMin ? Number(formData.budgetMin) : undefined,
        budgetMax: formData.budgetMax ? Number(formData.budgetMax) : undefined,
        notes: formData.notes || undefined,
        tags: formData.tags || [],
        ownerId: user.id
      };

      const validatedData = buyerSchema.parse(dataToValidate);
      
      const response = await fetch('/api/buyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create lead');
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

  const isResidential = ['Apartment', 'Villa'].includes(formData.propertyType || '');

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:32px_32px]">
        <Header />
        <main className="py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-8 shadow-2xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-100 flex items-center gap-3">
                            <UserPlus className="w-8 h-8 text-yellow-400" />
                            Create New Lead
                        </h1>
                        <p className="text-gray-400 mt-1">Enter the details below to add a new buyer to the system.</p>
                    </div>
                    
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
                           {isResidential && (
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
                           )}

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
                                {isSubmitting ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5"/>}
                                {isSubmitting ? 'Creating Lead...' : 'Create Lead'}
                            </button>
                        </div>
                        {errors.submit && (
                            <p className="text-sm text-red-400 text-center">{errors.submit}</p>
                        )}
                    </form>
                </div>
            </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

