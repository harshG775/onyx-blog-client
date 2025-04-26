import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";
import { decodeEmail } from "@/auth/utils/hash";
import NotFoundRoute from "@/routes/not-found";

const verifySchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits"),
});
const emailSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export default function VerifyForm({ ...props }) {
    const [searchParams] = useSearchParams();
    const hashedEmail = decodeEmail(searchParams.get("email"));

    const emailFromUrl = hashedEmail;

    const [timer, setTimer] = useState(0);
    const [isSending, setIsSending] = useState(false);

    const form = useForm({
        resolver: zodResolver(verifySchema),
        defaultValues: { code: "" },
    });

    useEffect(() => {
        if (emailFromUrl) {
            const parsedEmail = emailSchema.safeParse(emailFromUrl);
            if (parsedEmail.success) {
                form.setValue("email", parsedEmail.data);
            }
        }
    }, [emailFromUrl, form]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleSendOTP = async () => {
        setIsSending(true);
        try {
            const email = form.getValues("email");
            if (!email) return;
            console.log("Sending OTP to:", email);
            // Simulate API call
            await new Promise((res) => setTimeout(res, 1000));

            setTimer(30); // Start 30-sec countdown
        } catch (error) {
            console.error("Failed to send OTP:", error);
        } finally {
            setIsSending(false);
        }
    };

    const onSubmit = (values) => {
        console.log("Form Submitted:", values);
    };
    if (hashedEmail == null) {
        return <NotFoundRoute />;
    }
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
                <h2 className="text-2xl font-semibold">Check your inbox</h2>
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"inline-flex justify-between"}>Code</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter code" {...field} className="w-full text-center" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Verify
                </Button>
                <div className="text-center mt-4">
                    Didn't receive a code?{" "}
                    <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={isSending || timer > 0}
                        className="font-bold text-primary hover:underline"
                    >
                        {isSending ? "Sending..." : timer > 0 ? `Resend in ${timer}s` : "Resend code"}
                    </button>
                </div>
            </form>
        </Form>
    );
}
