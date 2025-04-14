import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ellipsis, Send, MessageCircle, Heart } from "lucide-react";

const posts = [
    {
        id: "post-id-1",
        createdAt: "2025-04-14T10:00:00Z",
        updatedAt: "2025-04-14T10:10:00Z",
        user: {
            id: "cuid",
            username: "username",
            profilePicture: "image url",
        },
        title: "My First Blog",
        images: [],
        content: "This is my first blog post!",
        hasLiked: false,
        likes: [],
        comments: [],
    },
    {
        id: "post-id-2",
        createdAt: "2025-04-14T10:00:00Z",
        updatedAt: "2025-04-14T10:10:00Z",
        user: {
            id: "cuid",
            username: "username",
            profilePicture: "image url",
        },
        title: "My First Blog",
        images: [],
        content: "This is my first blog post!",
        hasLiked: false,
        likes: [],
        comments: [],
    },
];

export default function RootRoute() {
    return (
        <>
            <main>
                <ul className="p-4 divide-y">
                    {posts.map((post) => (
                        <li key={post.id} className="my-4 pb-6 space-y-4 max-w-sm mx-auto">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage
                                        src={post?.user?.profilePicture}
                                        alt={`${post?.user?.username}'s profile-picture`}
                                    />
                                    <AvatarFallback>{post.user.username[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex gap-2 items-center">
                                        <h2 className="text-sm font-semibold">{post?.user?.username}</h2>
                                        <div className="text-muted-foreground/80 font-semibold text-xs pt-0.5">
                                            {" • "}
                                            {/* {post.createdAt} */}3d
                                        </div>
                                    </div>
                                    <div className="text-xs">more</div>
                                </div>
                                <Button className="ml-auto" variant={"ghost"} size={"icon"}>
                                    <Ellipsis />
                                </Button>
                            </div>
                            <div className="aspect-[4/5] bg-muted border rounded-sm overflow-hidden">
                                {post.images.length > 0 ? (
                                    <img src={post.images[0]} alt={post.title} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="w-full h-full grid place-items-center text-sm text-muted-foreground">
                                        No image available
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex gap-2 -translate-x-1">
                                    <button title="like" className={"hover:text-secondary p-1 grid place-items-center"}>
                                        <Heart />
                                        <span className="sr-only">like</span>
                                    </button>
                                    <button
                                        title="comments"
                                        className={"hover:text-secondary p-1 grid place-items-center"}
                                    >
                                        <MessageCircle className="-scale-x-100" />
                                        <span className="sr-only">comments</span>
                                    </button>
                                    <button
                                        title="share"
                                        className={"hover:text-secondary p-1 grid place-items-center"}
                                    >
                                        <Send />
                                        <span className="sr-only">share</span>
                                    </button>
                                </div>
                                <div></div>
                            </div>
                            <div className="text-sm font-medium">25,673 likes</div>
                            
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}
