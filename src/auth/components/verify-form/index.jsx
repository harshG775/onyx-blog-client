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
import { LoaderIcon } from "lucide-react";

const verifySchema = z.object({
    code: z.string().length(6, "Verification code must be 6 digits"),
});
const emailSchema = z.object({
    email: z.string().email("Invalid email address"),
});

function maskEmail(email) {
    const [username, domainWithTLD] = email.split("@");
    const [domain, tld] = domainWithTLD.split(".");

    const maskedUsername = username[0] + "•".repeat(Math.max(username.length - 1, 0));
    const maskedDomain = domain[0] + "•".repeat(Math.max(domain.length - 1, 0));

    return `${maskedUsername}@${maskedDomain}.${tld}`;
}

export default function VerifyForm({ ...props }) {
    const [searchParams] = useSearchParams();
    const identifier = decodeEmail(searchParams.get("identifier"));
    const parsedEmail = emailSchema.safeParse({ email: identifier });

    const form = useForm({
        resolver: zodResolver(verifySchema),
        defaultValues: { code: "" },
    });
    const { formState } = form;
    const onSubmit = async (values) => {
        const response = { ...values };
        await new Promise((res) => setTimeout(res, 1000));
        console.log("Form Submitted:", response); 
    };
    if (identifier == null || !parsedEmail.success) {
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
                <div className="text-muted-foreground relative bottom-4 flex gap-2 flex-wrap">
                    Enter the code we just sent to
                    <div>{parsedEmail?.data?.email ? maskEmail(parsedEmail.data.email) : "your email"}</div>
                </div>
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"inline-flex justify-between"}>OTP</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter 6 digit code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? <LoaderIcon /> : "Continue"}
                </Button>
                <div className="text-center mt-4">
                    Didn't receive a code? <ResendOtpButton email={parsedEmail.data.email} />
                </div>
            </form>
        </Form>
    );
}

function ResendOtpButton({ email }) {
    const [timer, setTimer] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const handleSendOTP = async () => {
        setIsSending(true);
        try {
            if (!email) return;
            console.log("Sending OTP to:", email);
            await new Promise((res) => setTimeout(res, 1000));

            setTimer(30);
        } catch (error) {
            console.error("Failed to send OTP:", error);
        } finally {
            setIsSending(false);
        }
    };
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);
    return (
        <button
            type="button"
            onClick={handleSendOTP}
            disabled={isSending || timer > 0}
            className="font-bold text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
        >
            {isSending ? "Sending..." : timer > 0 ? `Resend in ${timer}s` : "Resend code"}
        </button>
    );
}
