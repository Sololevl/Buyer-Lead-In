'use client';
import React, { useState } from 'react';
import Papa from 'papaparse';
import { CSV_HEADERS } from '../../../../lib/csvHelpers';
import { useAuth } from '@/app/providers/AuthProvider';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Upload, Download, FileCheck, AlertTriangle, LoaderCircle } from 'lucide-react';

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
  notes: z.string().max(1000, 'Notes must be at most 1000 characters').optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['New','Qualified','Contacted','Visited','Negotiation','Converted','Dropped']),
  ownerId: z.string().min(1, 'Owner ID is required')
}).refine(data => !(['Apartment', 'Villa'].includes(data.propertyType) && !data.bhk), {
  message: "BHK is required for Apartment and Villa", path: ["bhk"]
}).refine(data => !(data.budgetMin && data.budgetMax && data.budgetMax < data.budgetMin), {
  message: "Budget max must be greater than or equal to budget min", path: ["budgetMax"]
});

export default function ImportExport({ filters }: { filters?: Record<string,string> }) {
  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  // File Handler logic remains the same...
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setPreviewRows([]);
    setErrors([]);
    setLoading(true);

    const text = await file?.text();
    if (!text) {
        setLoading(false);
        return;
    }

    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        // ... (The entire validation and parsing logic from your original file remains here)
        // This logic is complex and correct, so we don't need to change it.
        // I will just paste it in for completeness.
        const parsed = results.data as Record<string, string>[];
        const headers = results.meta.fields ?? [];
        const missing = CSV_HEADERS.filter(h => !headers.includes(h));
        if (missing.length) {
            setErrors([{ row: 0, messages: [`Missing headers: ${missing.join(', ')}`] }]);
            setLoading(false);
            return;
        }
        if (parsed.length > 200) {
            setErrors([{ row: 0, messages: ['CSV has more than 200 rows. Max 200 allowed.'] }]);
            setLoading(false);
            return;
        }
        const rowErrors: any[] = [];
        const cleanedRows: any[] = [];
        parsed.forEach((row, idx) => {
            const errorsForRow: string[] = [];
            Object.keys(row).forEach((key) => { if (row[key] !== undefined && row[key] !== null && row[key].toString().trim() === "") { (row as any)[key] = undefined; } });
            if (row.bhk) { if (row.bhk === "1") row.bhk = "One"; else if (row.bhk === "2") row.bhk = "Two"; else if (row.bhk === "3") row.bhk = "Three"; else if (row.bhk === "4") row.bhk = "Four"; else if (row.bhk === "0" || row.bhk.toLowerCase() === "studio") row.bhk = "Studio"; }
            if (row.timeline) { if (row.timeline === "0-3m") row.timeline = "ZeroTo3m"; else if (row.timeline === "3-6m") row.timeline = "ThreeTo6m"; else if (row.timeline === ">6m") row.timeline = "MoreThan6m"; else if (row.timeline.toLowerCase() === "exploring") row.timeline = "Exploring"; }
            if(row.source==="Walk-in"){ row.source="WalkIn" }
            const dataToValidate = { ...row, fullName: row.fullName?.trim() || undefined, email: row.email?.trim() || undefined, phone: row.phone?.trim() || undefined, city: row.city?.trim() || undefined, propertyType: row.propertyType?.trim() || undefined, bhk: row.bhk?.trim() || undefined, purpose: row.purpose?.trim() || undefined, budgetMin: row.budgetMin ? Number(row.budgetMin) : undefined, budgetMax: row.budgetMax ? Number(row.budgetMax) : undefined, timeline: row.timeline?.trim() || undefined, source: row.source?.trim() || undefined, notes: row.notes?.trim() || undefined, tags: row.tags ? row.tags.split(",").map(t => t.trim()) : [], status: row.status?.trim() || "New", ownerId: user?.id, };
            const result = buyerSchema.safeParse(dataToValidate);
            if (!result.success) { result.error.issues.forEach(err => { errorsForRow.push(`${err.path.join(".")}: ${err.message}`); }); }
            if (errorsForRow.length > 0) { rowErrors.push({ row: idx + 2, messages: errorsForRow }); } else { cleanedRows.push(result.data); }
        });
        if (rowErrors.length > 0) { setErrors(rowErrors); } else { setPreviewRows(cleanedRows); }
        setLoading(false);
      },
      error: (err: any) => {
        setErrors([{ row: 0, messages: [err.message] }]);
        setLoading(false);
      }
    });
  }

  // Handle Import/Export logic remains the same...
  async function handleImport() {
    if (previewRows.length === 0) {
      setErrors([{ row: 0, messages: ['No valid rows to import'] }]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/buyers/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId:user?.id, rows: previewRows })
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? [{ row: 0, messages: [json.error ?? 'Unknown error'] }]);
      } else {
        alert(`Successfully inserted ${json.inserted} rows.`);
        router.refresh();
        setPreviewRows([]);
        setErrors([]);
        setFileName('');
      }
    } catch (err: any) {
      setErrors([{ row: 0, messages: [err.message ?? 'Network error'] }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleExport() {
    const qs = filters ? new URLSearchParams(filters).toString() : '';
    const url = `/api/buyers/export${qs ? `?${qs}` : ''}`;
    window.location.href = url;
  }

  return (
    <div className="w-full space-y-4">
        {/* --- Redesigned Import/Export Actions --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Custom File Input */}
            <label className="relative w-full sm:w-auto cursor-pointer">
                <input type="file" accept=".csv" onChange={onFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 font-semibold rounded-md hover:bg-gray-600 transition-colors duration-200 border border-gray-600">
                    <Upload className="w-4 h-4" />
                    <span>{fileName ? 'Change File' : 'Import CSV'}</span>
                </div>
            </label>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                <button
                    onClick={handleImport}
                    disabled={loading || previewRows.length === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-300 transition-all duration-200 transform hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <FileCheck className="w-4 h-4" />}
                    <span>{loading ? 'Importing...' : 'Confirm Import'}</span>
                </button>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-gray-200 font-semibold rounded-md hover:bg-gray-500 transition-colors duration-200"
                >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                </button>
            </div>
        </div>

        {fileName && !errors.length && !previewRows.length && !loading && (
            <div className="p-3 text-sm text-gray-400 border border-gray-700 rounded-md">
                Selected file: <span className="font-semibold text-gray-300">{fileName}</span>. No valid rows found or file is empty.
            </div>
        )}

        {/* --- Redesigned Error Display --- */}
        {errors.length > 0 && (
            <div className="border border-red-500/30 p-4 bg-red-500/10 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-red-400">
                    <AlertTriangle className="w-5 h-5"/>
                    Import Errors Found
                </h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-red-300 font-mono">
                    {errors.map((e, i) => (
                        <li key={i}>Row {e.row}: {Array.isArray(e.messages) ? e.messages.join('; ') : e.messages}</li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- Redesigned Preview Table --- */}
        {previewRows.length > 0 && (
            <div className="w-full">
                <h4 className="font-semibold text-gray-300 mb-2">
                    Preview: <span className="text-yellow-400">{previewRows.length} valid rows found</span>
                </h4>
                <div className="overflow-x-auto max-h-72 border border-gray-700 rounded-lg bg-gray-900/50">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-800 sticky top-0">
                            <tr>
                                {CSV_HEADERS.map(h => 
                                    <th key={h} className="px-3 py-2 text-left font-bold text-yellow-400 uppercase tracking-wider text-xs whitespace-nowrap">{h}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {previewRows.slice(0, 50).map((r, idx) => (
                                <tr key={idx} className="hover:bg-yellow-400/10 transition-colors duration-200">
                                    {CSV_HEADERS.map((h) => 
                                        <td key={h} className="px-3 py-2 whitespace-nowrap text-gray-300 font-mono text-xs">{String(r[h] ?? '')}</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {previewRows.length > 50 && <div className="text-xs text-gray-500 mt-2 text-right">Showing first 50 of {previewRows.length} rows...</div>}
            </div>
        )}
    </div>
  );
}

