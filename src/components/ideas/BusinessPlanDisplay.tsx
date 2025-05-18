"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, FileType } from 'lucide-react'; // FileType for Markdown, FileText for PDF (or vice versa)

interface BusinessPlanDisplayProps {
    planContent: string; // This could be Markdown string or structured data
    onDownloadPDF: () => void;
    onDownloadMD: () => void;
    onRegenerate?: () => void; // Optional: if regeneration is possible at this stage
    isGenerating?: boolean; // If content is being fetched/generated
}

// Placeholder for a simple Markdown renderer or you can use a library like react-markdown
const SimpleMarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <pre className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md text-sm font-mono leading-relaxed overflow-x-auto">
            {content}
        </pre>
    );
};

export default function BusinessPlanDisplay({
    planContent,
    onDownloadPDF,
    onDownloadMD,
    onRegenerate,
    isGenerating = false,
}: BusinessPlanDisplayProps) {

    if (isGenerating) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">Generating your business plan...</p>
                {/* Add a loader icon here if desired */}
            </div>
        );
    }

    if (!planContent && !isGenerating) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No business plan content available. Please generate one.</p>
                 {/* Optionally, include a button to trigger generation if not handled by parent */}
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-lg font-semibold mb-3">Your Generated Business Plan:</h4>
                <div className="border rounded-lg shadow-sm">
                    {/* For actual Markdown rendering, you'd use a library like react-markdown */}
                    {/* <ReactMarkdown>{planContent}</ReactMarkdown> */}
                    <SimpleMarkdownRenderer content={planContent} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t">
                {onRegenerate && (
                     <Button variant="outline" onClick={onRegenerate} disabled={isGenerating}>
                        Regenerate Plan
                    </Button>
                )}
                <Button onClick={onDownloadMD} variant="outline" disabled={isGenerating}>
                    <FileType className="mr-2 h-4 w-4" />
                    Download as Markdown (.md)
                </Button>
                <Button onClick={onDownloadPDF} variant="outline" disabled={isGenerating}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PDF
                </Button>
            </div>
        </div>
    );
}
