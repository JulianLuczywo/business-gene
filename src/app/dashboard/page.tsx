import { getUser } from "@/app/auth/server";
import { logOutAction } from "@/actions/users";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {

    const user = await getUser();

    if(!user) {
        return redirect("/");
    }
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-background p-6 rounded-lg shadow-md">
                <p className="text-muted-foreground mb-4">Welcome back, {user.email}!</p>
            <Button className="w-full" onClick={logOutAction}>Log Out</Button>
            </div>
        </div>
    );
}