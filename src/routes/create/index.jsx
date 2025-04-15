import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
const formSchema = z.object({
    title: z.string().min(2).max(300),
    content: z.string().max(4000),
    images: z.any().refine((files) => files?.length > 0, {
        message: "At least one image is required",
    }),
});

export default function CreateRoute() {
    const [previewUrls, setPreviewUrls] = useState([]);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            images: [],
        },
    });
    function onSubmit(values) {
        console.log(values);
    }

    return (
        <main className="max-w-xl mx-auto p-4">
            <h1 className="py-6 px-4 ">Your Post</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
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
                        {/* Images */}
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

                                                const previews = files.map((file) => URL.createObjectURL(file));
                                                setPreviewUrls(previews);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>You can upload multiple images.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Preview */}
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

                    <Button type="submit" className={"w-full"}>Post</Button>
                </form>
            </Form>
        </main>
    );
}
