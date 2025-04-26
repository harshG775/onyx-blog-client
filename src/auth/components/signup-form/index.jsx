import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { encodeEmail } from "@/auth/utils/hash";
import { useNavigate } from "react-router";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
});

export default function SignUpForm({ ...props }) {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const onSubmit = (values) => {
        const response = { email: values.email };
        const hashedEmail = encodeEmail(response.email);
        navigate(`/verify?email=${hashedEmail}`);
    };

    return (
        <Form {...form}>
            <form
                {...props}
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "space-y-6 bg-background p-6 rounded-lg shadow-lg w-full max-w-md mx-auto",
                    props.className,
                )}
            >
                <h2 className="text-2xl font-semibold">Create your account</h2>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter your name" {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Create your account
                </Button>
                <div className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/signin" className="font-bold text-primary hover:underline">
                        Sign In
                    </Link>
                </div>
            </form>
        </Form>
    );
}
