import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";
import NotFoundRoute from "@/routes/not-found";
import { LoaderIcon } from "lucide-react";
import { decode } from "@/auth/utils/hash";
import { useAuth } from "@/auth/context/auth-context";

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
    const { verifyCode } = useAuth();

    const [searchParams] = useSearchParams();
    const [urlObj] = useState(() => {
        try {
            const result = decode(searchParams.get("psid"));
            if (!emailSchema.safeParse(result).success) {
                return null;
            }
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    const form = useForm({
        resolver: zodResolver(verifySchema),
        defaultValues: { code: "" },
    });
    const { formState } = form;
    const onSubmit = async (values) => {
        
        await verifyCode(urlObj.email, { otp: values.code, otpId: urlObj.otpId });
    };
    if (urlObj == null || !urlObj.email) {
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
                    <div>{urlObj?.email ? maskEmail(urlObj.email) : "your email"}</div>
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

                <Button type="submit" className="w-full cursor-pointer" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? <LoaderIcon /> : "Continue"}
                </Button>
                <div className="text-center mt-4">
                    Didn't receive a code? <ResendOtpButton email={urlObj?.email} />
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
            setTimer(60);
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
