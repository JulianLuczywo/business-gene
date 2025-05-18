"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud } from 'lucide-react';

interface LogoGenerationFormProps {
    onSubmit: (data: { description: string; referenceFile?: File }) => Promise<void>;
    isLoading?: boolean;
}

export default function LogoGenerationForm({ onSubmit, isLoading = false }: LogoGenerationFormProps) {
    const [description, setDescription] = useState('');
    const [referenceFile, setReferenceFile] = useState<File | undefined>(undefined);
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File is too large. Max 5MB allowed.');
                setReferenceFile(undefined);
                setFileName(null);
                return;
            }
            const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
            if (!allowedTypes.includes(file.type)) {
                setError('Invalid file type. Please upload PNG, JPG, or SVG.');
                setReferenceFile(undefined);
                setFileName(null);
                return;
            }
            setReferenceFile(file);
            setFileName(file.name);
            setError(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        if (!description.trim()) {
            setError('Please describe your desired logo.');
            return;
        }
        await onSubmit({ description, referenceFile });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="logo-description" className="text-sm font-medium">
                    Logo Description & Preferences
                </Label>
                <Textarea
                    id="logo-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the style, colors, symbols, or overall feeling you want for your logo (e.g., 'minimalist, blue and green, abstract mountain icon', 'playful, featuring a cartoon robot mascot')"
                    className="mt-1 min-h-[100px] resize-none"
                    maxLength={500}
                    rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                    Be as descriptive as possible to help the AI generate the best logo for you. (Max 500 characters)
                </p>
            </div>

            <div>
                <Label htmlFor="reference-logo" className="text-sm font-medium">
                    Reference Logo (Optional)
                </Label>
                <div className="mt-1 flex items-center space-x-2">
                    <Input
                        id="reference-logo"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden" // Hide the default input
                        accept=".png,.jpg,.jpeg,.svg"
                    />
                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => document.getElementById('reference-logo')?.click()}
                        className="flex-shrink-0"
                    >
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload Reference
                    </Button>
                    {fileName && <span className="text-sm text-muted-foreground truncate" title={fileName}>{fileName}</span>}
                </div>
                 <p className="text-xs text-muted-foreground mt-1">
                    Upload an image (PNG, JPG, SVG, max 5MB) as inspiration. This is optional.
                </p>
            </div>

            {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</p>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading} className="min-w-[150px]">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        'Generate Logo'
                    )}
                </Button>
            </div>
        </form>
    );
}
