import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
    return (
        <section className="flex min-h-screen px-4 py-16 md:py-32">
            <AuthForm type="login"/>
        </section>
    )
}
