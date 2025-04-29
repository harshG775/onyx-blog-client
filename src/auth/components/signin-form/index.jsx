import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { LoaderIcon } from "lucide-react";
import { useAuth } from "@/auth/context/auth-context";
import { encode } from "@/auth/utils/hash";

const formSchema = z.object({
    identifier: z
        .string()
        .min(2, "Please enter Username or email")
        .email("Invalid email address")
        .or(z.string().min(1, "Username must be at least 1 characters")),
});
export default function SignInForm({ ...props }) {
    const { signin } = useAuth();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
        },
    });
    const { formState } = form;
    const onSubmit = async (values) => {
        const { identifier } = values;
        const response = await signin(identifier);
        if (response) {
            const params = new URLSearchParams({
                m: "verify_signin",
                psid: encode(response),
            });
            navigate(`/verify?${params}`);
        }
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
                    name="identifier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username or Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your username or email"
                                    {...field}
                                    className="w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer" disabled={!formState.isValid || formState.isSubmitting}>
                    {formState.isSubmitting ? <LoaderIcon /> : "Continue"}
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
