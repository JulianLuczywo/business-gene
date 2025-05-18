"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface NameGenerationFormProps {
    onSubmit: (data: { summary: string; style: string }) => Promise<void>;
    isLoading?: boolean;
}

const namingStyles = [
    { value: "professional", label: "Professional" },
    { value: "modern", label: "Modern & Sleek" },
    { value: "playful", label: "Playful & Catchy" },
    { value: "classic", label: "Classic & Elegant" },
    { value: "techy", label: "Tech-focused" },
    { value: "eco-friendly", label: "Eco-conscious" },
];

export default function NameGenerationForm({ onSubmit, isLoading = false }: NameGenerationFormProps) {
    const [summary, setSummary] = useState('');
    const [style, setStyle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        if (!summary.trim()) {
            setError('Please provide a business summary.');
            return;
        }
        if (!style) {
            setError('Please select a naming style.');
            return;
        }
        await onSubmit({ summary, style });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="business-summary" className="text-sm font-medium">
                    Business Summary / Keywords
                </Label>
                <Textarea
                    id="business-summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Describe your business, target audience, and key features or values (e.g., 'sustainable coffee shop for remote workers', 'AI tool for content creators')"
                    className="mt-1 min-h-[100px] resize-none"
                    maxLength={500}
                    rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">
                    Provide a brief description or some keywords to help us generate relevant names. (Max 500 characters)
                </p>
            </div>

            <div>
                <Label htmlFor="naming-style" className="text-sm font-medium">
                    Preferred Naming Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger id="naming-style" className="mt-1">
                        <SelectValue placeholder="Select a style..." />
                    </SelectTrigger>
                    <SelectContent>
                        {namingStyles.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                                {s.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                    Choose a style that best fits your brand's desired image.
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
                        'Generate Names'
                    )}
                </Button>
            </div>
        </form>
    );
}
