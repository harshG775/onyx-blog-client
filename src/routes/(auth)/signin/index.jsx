import SignInForm from "@/auth/components/signin-form";

export default function SignInRoute() {
    return (
        <section className="flex justify-center items-center min-h-screen bg-background p-4">
            <SignInForm />
        </section>
    );
}
