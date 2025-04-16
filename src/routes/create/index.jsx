import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Plus } from "lucide-react";
const formSchema = z.object({
    title: z.string().min(2).max(300),
    content: z.string().max(4000),
    images: z.any().refine((files) => files?.length > 0, {
        message: "At least one image is required",
    }),
});

export default function CreateRoute() {
    const [step, setStep] = useState(1);
    const totalSteps = 2;
    const [previewUrls, setPreviewUrls] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            images: [],
        },
    });
    function onSubmit(formData) {
        console.log(formData);
        // setStep(0);
        // form.reset();
    }
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };
    return (
        <main className="max-w-xl mx-auto p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="shadow-sm">
                        <CardHeader className={"space-y-4"}>
                            <div className="flex justify-between">
                                <Button
                                    variant={"ghost"}
                                    className={`cursor-pointer ${step === 1 && "invisible"}`}
                                    disabled={step === 1}
                                    type={"button"}
                                    onClick={handleBack}
                                >
                                    <ArrowLeft />
                                </Button>
                                <div className="flex items-center justify-center">
                                    {Array.from({ length: totalSteps }).map((_, index) => {
                                        const stepIndex = index + 1;
                                        return (
                                            <div key={stepIndex} className="flex items-center">
                                                <div
                                                    className={cn(
                                                        "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                                                        stepIndex <= step ? "bg-primary" : "bg-primary/30",
                                                        stepIndex < step && "bg-primary",
                                                    )}
                                                />
                                                {stepIndex < totalSteps && (
                                                    <div
                                                        className={cn(
                                                            "w-8 h-0.5",
                                                            stepIndex < step ? "bg-primary" : "bg-primary/30",
                                                        )}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {step === totalSteps ? (
                                    <Button variant={"default"} className={`cursor-pointer`} type={"submit"}>
                                        Post
                                    </Button>
                                ) : (
                                    <Button
                                        variant={"secondary"}
                                        className={"cursor-pointer"}
                                        type={"button"}
                                        disabled={step === totalSteps}
                                        onClick={handleNext}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>

                            {/* <CardTitle className="text-lg">{["upload image", "Create new post"][step - 1]}</CardTitle> */}
                            <CardDescription>{["upload image", "Create new post"][step - 1]}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {step === 1 && (
                                <div className={"space-y-8"}>
                                    <FormField
                                        control={form.control}
                                        name="images"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Upload Images</FormLabel>
                                                <FormControl>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const files = Array.from(e.target.files);
                                                            field.onChange(files);

                                                            const previews = files.map((file) =>
                                                                URL.createObjectURL(file),
                                                            );
                                                            setPreviewUrls(previews);
                                                            handleNext();
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormDescription>You can upload multiple images.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                            {step === 2 && (
                                <div className={"space-y-8"}>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Post Title" {...field} />
                                                </FormControl>
                                                <FormDescription>This is your Post Title</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        {previewUrls.length > 0 && (
                                            <div className="flex flex-wrap gap-3">
                                                {previewUrls.map((url, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={url}
                                                        alt={`preview-${idx}`}
                                                        className="w-24 h-24 object-cover rounded-md"
                                                    />
                                                ))}
                                                <button className="w-24 h-24 object-cover rounded-md grid place-items-center border-3 border-dashed hover:border-primary cursor-pointer">
                                                    <Plus className="text-border" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Post content" {...field} />
                                                </FormControl>
                                                <FormDescription>This is your Post content</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </main>
    );
}
