import { getUser } from "@/app/auth/server";
import { redirect } from "next/navigation";
import AppSidebar from "@/components/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Lightbulb, Paintbrush, FileText, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    // Placeholder for saved ideas - replace with actual data fetching later
    const savedIdeas = [
        { id: "1", name: "EcoClean Solutions", date: "2024-05-10T10:00:00Z" },
        { id: "2", name: "AI Pet Pal", date: "2024-05-15T14:30:00Z" },
        { id: "3", name: "Artisan Cloud Bakery", date: "2024-05-18T09:15:00Z" },
    ];

    const displayName = user.user_metadata?.name || user.email?.split('@')[0] || "Valued User";

    return (
        <SidebarProvider> {/* Provides context for AppSidebar and its children */}
            <div className="flex min-h-screen bg-background w-full">
                <AppSidebar />
                <main className="flex-1 flex flex-col gap-6 p-6 md:gap-8 md:p-10">
                    {/* Welcome Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Welcome, {displayName}!
                        </h1>
                        <Button size="lg" asChild className="shrink-0">
                            <Link href="/dashboard/ideas/new">
                                <PlusCircle className="mr-2 h-5 w-5" /> Create New Business Idea
                            </Link>
                        </Button>
                    </div>

                    {/* Quick Start Actions */}
                    <section>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
                            Get Started
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="shadow-sm hover:shadow-md transition-shadow rounded-lg">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Lightbulb className="h-6 w-6" />
                                        </span>
                                        <CardTitle className="text-xl">Generate Names</CardTitle>
                                    </div>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        Uncover unique and catchy names for your new venture.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" className="w-full" asChild>
                                        {/* Point this to the relevant step in your idea creation flow */}
                                        <Link href="/dashboard/ideas/new?step=name">
                                            Start Generating
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm hover:shadow-md transition-shadow rounded-lg">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Paintbrush className="h-6 w-6" />
                                        </span>
                                        <CardTitle className="text-xl">Design a Logo</CardTitle>
                                    </div>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        Craft a memorable logo that represents your brand identity.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href="/dashboard/ideas/new?step=logo">
                                            Design Logo
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="shadow-sm hover:shadow-md transition-shadow rounded-lg">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <FileText className="h-6 w-6" />
                                        </span>
                                        <CardTitle className="text-xl">Draft Business Plan</CardTitle>
                                    </div>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        Outline your strategy and roadmap for success with an AI-generated plan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href="/dashboard/ideas/new?step=plan">
                                            Create Plan
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Saved Ideas Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                                Your Business Ideas
                            </h2>
                            {savedIdeas.length > 0 && (
                                <Button variant="link" asChild>
                                    <Link href="/dashboard/ideas">View all</Link>
                                </Button>
                            )}
                        </div>
                        {savedIdeas.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {savedIdeas.map((idea) => (
                                    <Card key={idea.id} className="shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden">
                                        <CardHeader>
                                            <CardTitle className="truncate" title={idea.name}>{idea.name}</CardTitle>
                                            <CardDescription>Created: {new Date(idea.date).toLocaleDateString()}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button className="w-full" asChild>
                                                <Link href={`/dashboard/ideas/${idea.id}`}>
                                                    Open Idea
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                                <Link href="/dashboard/ideas/new">
                                  <span className="h-full">
                                    <Card className="h-full flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                            <PlusCircle className="h-12 w-12 text-muted-foreground/70 mb-3" />
                                            <span className="font-medium text-foreground">Create New Idea</span>
                                            <span className="text-xs text-muted-foreground mt-1">Start from scratch</span>
                                        </CardContent>
                                    </Card>
                                  </span>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-10 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-card">
                                <Lightbulb className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">No ideas yet?</h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    Let's get those creative juices flowing! Start by generating a name, logo, or business plan for your next big thing.
                                </p>
                                <Button size="lg" asChild>
                                    <Link href="/dashboard/ideas/new">
                                        <PlusCircle className="mr-2 h-5 w-5" /> Create Your First Business Idea
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </SidebarProvider>
    );
}