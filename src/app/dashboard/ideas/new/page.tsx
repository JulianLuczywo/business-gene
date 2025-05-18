"use client";

import { getUser } from "@/app/auth/server"; // This likely needs to be a client-side hook or action if used directly on client
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Placeholder for user type, adjust as per your actual user object structure
interface User {
    id: string;
    email?: string | null;
    user_metadata?: { name?: string };
}

export default function NewBusinessIdeaPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStep = searchParams.get('step') || 'name'; // Default to 'name' step

    // Simulate fetching user on client side. 
    // In a real app, you might use a client-side auth hook or context.
    const [user, setUser] = useState<User | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        // This is a simplified client-side user fetch. 
        // For proper auth, use Supabase client-side SDK or a dedicated client action.
        const fetchClientSideUser = async () => {
            try {
                // This is a placeholder. `getUser` from `auth/server` cannot be directly called here.
                // You'd typically have a client-side equivalent or an API route.
                // For now, we'll simulate a redirect if no user is found.
                // const fetchedUser = await getSomeClientSideUser(); // Replace with actual client-side user fetching logic
                // setUser(fetchedUser);
                // if (!fetchedUser) router.push('/login'); 
                // For demo, let's assume user is always found or handle redirection elsewhere.
                console.warn("Placeholder: User fetching logic needs to be implemented for client-side.");
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push('/login');
            } finally {
                setLoadingUser(false);
            }
        };
        fetchClientSideUser();
    }, [router]);

    const renderStepContent = () => {
        switch (currentStep) {
            case 'name':
                return (
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2">Step 1: Generate Business Name</h3>
                        <p className="text-muted-foreground">Enter your business summary and select a naming style.</p>
                        {/* Placeholder for Name Generation Form */}
                        <div className="mt-4 p-4 border border-dashed rounded-md min-h-[100px]">
                            [Name Generation Form Components Will Go Here]
                        </div>
                    </CardContent>
                );
            case 'logo':
                return (
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2">Step 2: Design Logo</h3>
                        <p className="text-muted-foreground">Describe your logo preferences. AI will generate a unique logo.</p>
                        {/* Placeholder for Logo Generation Form */}
                        <div className="mt-4 p-4 border border-dashed rounded-md min-h-[100px]">
                            [Logo Generation Form Components Will Go Here]
                        </div>
                    </CardContent>
                );
            case 'plan':
                return (
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-2">Step 3: Create Business Plan</h3>
                        <p className="text-muted-foreground">AI will create a concise business plan.</p>
                        {/* Placeholder for Plan Generation Form/Display */}
                        <div className="mt-4 p-4 border border-dashed rounded-md min-h-[100px]">
                            [Business Plan Generation/Display Components Will Go Here]
                        </div>
                    </CardContent>
                );
            default:
                return <CardContent><p>Invalid step.</p></CardContent>;
        }
    };

    if (loadingUser) {
        // You might want a more sophisticated loading state here
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-background">
                <AppSidebar />
                <main className="flex-1 flex flex-col gap-6 p-6 md:gap-8 md:p-10">
                    <div className="flex items-center gap-4 mb-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">Back to Dashboard</span>
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Create New Business Idea
                        </h1>
                    </div>

                    <Card className="w-full max-w-3xl mx-auto shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Let's Build Your Business</CardTitle>
                            <CardDescription>
                                Follow the steps below to generate a name, logo, and business plan for your new venture.
                            </CardDescription>
                        </CardHeader>
                        {renderStepContent()}
                        <CardContent className="border-t pt-6">
                            <div className="flex justify-between items-center">
                                {currentStep !== 'name' && (
                                    <Button 
                                        variant="outline" 
                                        onClick={() => {
                                            const prevStep = currentStep === 'logo' ? 'name' : (currentStep === 'plan' ? 'logo' : 'name');
                                            router.push(`/dashboard/ideas/new?step=${prevStep}`);
                                        }}
                                    >
                                        Previous
                                    </Button>
                                )}
                                <div /> {/* Spacer */} 
                                {currentStep !== 'plan' ? (
                                    <Button 
                                        onClick={() => {
                                            const nextStep = currentStep === 'name' ? 'logo' : (currentStep === 'logo' ? 'plan' : 'plan');
                                            router.push(`/dashboard/ideas/new?step=${nextStep}`);
                                        }}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button>Review & Save Idea</Button> // Placeholder for final action
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SidebarProvider>
    );
}
