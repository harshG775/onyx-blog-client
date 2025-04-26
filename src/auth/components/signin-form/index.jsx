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
    email: z.string().email("Invalid email address"),
});

export default function SignInForm({ ...props }) {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
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
                <h2 className="text-2xl font-semibold ">Welcome back</h2>
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
                    Continue
                </Button>
                <div className="text-center mt-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-bold text-primary hover:underline">
                        Create one
                    </Link>
                </div>
            </form>
        </Form>
    );
}
