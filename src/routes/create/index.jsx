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
import { Plus } from "lucide-react";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { X } from "lucide-react";
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
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", content: "", images: [] },
    });
    const [imagesUrl, setImagesUrl] = useState([]);

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
    function onSubmit(formData) {
        console.log(formData);

        imagesUrl.forEach((url) => URL.revokeObjectURL(url));
        setImagesUrl([]);
        form.reset();
    }
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
                                    <Button
                                        disabled={step !== totalSteps}
                                        variant={"default"}
                                        className={`cursor-pointer`}
                                        type={"submit"}
                                    >
                                        Post
                                    </Button>
                                ) : (
                                    <Button
                                        variant={"secondary"}
                                        className={"cursor-pointer"}
                                        type={"button"}
                                        disabled={step === totalSteps || imagesUrl.length === 0}
                                        onClick={imagesUrl.length != 0 ? handleNext : () => {}}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>

                            {/* <CardTitle className="text-lg">{["upload image", "Create new post"][step - 1]}</CardTitle> */}
                            <CardDescription>{["upload image", "Create new post"][step - 1]}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {step === 1 && <Step_1 form={form} imagesUrl={imagesUrl} setImagesUrl={setImagesUrl} />}
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
                                    <div className="max-w-sm mx-auto grid grid-flow-col overflow-x-scroll">
                                        {imagesUrl.length > 0 && (
                                            <>
                                                {imagesUrl?.map((url, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={url}
                                                        alt={`preview-${idx}`}
                                                        className="min-w-sm object-contain w-full h-full aspect-[4/5] bg-muted border rounded-sm"
                                                    />
                                                ))}
                                            </>
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

function Step_1({ form, imagesUrl, setImagesUrl }) {
    const imageInputRef = useRef(null);

    const handleFileChange = (e, onChange) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = e.target.files;
            const newImageFiles = [];
            const newImageFilesPreview = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                newImageFiles.push(file);
                newImageFilesPreview.push(URL.createObjectURL(file));
            }
            onChange([...form.getValues("images"), ...newImageFiles]);
            setImagesUrl((prevImg) => [...prevImg, ...newImageFilesPreview]);
        }
    };

    const removeFile = (index) => {
        const updatedFiles = [...form.getValues("images")];
        updatedFiles.splice(index, 1);
        setImagesUrl((prev) => prev.filter((url, i) => i !== index && url));

        form.setValue("images", updatedFiles);
    };

    const handleDropzoneClick = () => {
        imageInputRef.current?.click();
    };

    return (
        <div className={"space-y-8"}>
            <FormField
                control={form.control}
                name="images"
                render={({ field: { onChange } }) => (
                    <FormItem>
                        {imagesUrl.length == 0 && (
                            <>
                                <FormLabel>
                                    Upload Images <span className="text-destructive">*</span>
                                </FormLabel>
                                <div
                                    onClick={handleDropzoneClick}
                                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-gray-300 hover:border-gray-400`}
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Upload className={`h-10 w-10  "text-gray-400"`} />
                                        <p className="text-lg font-medium">
                                            Drag and drop images here, or click to select
                                        </p>
                                        <p className="text-sm text-gray-500">Supports multiple images (max 10)</p>
                                    </div>
                                </div>
                            </>
                        )}

                        <FormControl>
                            <input
                                ref={imageInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => handleFileChange(e, onChange)}
                            />
                        </FormControl>
                        <FormDescription>You can upload multiple images.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {imagesUrl.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {imagesUrl.map((url, idx) => (
                        <div key={idx} className="relative group">
                            <img src={url} alt={`preview-${idx}`} className="w-24 h-24 object-cover rounded-md" />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(idx);
                                }}
                                className="absolute top-1 right-1 bg-background rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove image"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                    {}
                    <button
                        onClick={handleDropzoneClick}
                        className="w-24 h-24 object-cover rounded-md grid place-items-center border-2 border-foreground border-dashed hover:border-foreground/50 cursor-pointer"
                    >
                        <Plus />
                    </button>
                </div>
            )}
        </div>
    );
}
