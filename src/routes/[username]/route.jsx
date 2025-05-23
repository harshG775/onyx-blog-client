import { useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/context/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NotFoundRoute from "../not-found";

export default function ProfileRoute() {
    const { user } = useAuth();
    const [currentViewingUser, _setCurrentViewingUser] = useState(user);
    const { username } = useParams();
    if (username !== currentViewingUser.username) {
        return <NotFoundRoute />;
    }

    return (
        <main className="p-4 space-y-8">
            <section className="max-w-5xl mx-auto grid grid-cols-4 grid-rows-2 gap-4">
                <div className="lg:row-span-2">
                    <div className="p-2">
                        <Avatar className={"w-20 lg:w-32 h-20 lg:h-32 border-4 border-primary cursor-pointer"}>
                            <AvatarImage src={currentViewingUser.profilePicture} />
                            <AvatarFallback className={"w-18 h-18 lg:w-32 lg:h-32 uppercase font-bold"}>
                                {currentViewingUser.username[0]}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="col-span-3 lg:col-span-3 space-y-2">
                    <div className="flex gap-4 items-center">
                        <div className="font-bold">{currentViewingUser.username}</div>
                        <Button variant={"secondary"} className={"cursor-pointer"}>
                            Edit Profile
                        </Button>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2">
                            <span className="font-semibold">Posts</span>
                            <span>0</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-semibold">Followers</span>
                            <span>0</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-semibold">Following</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 row-start-2 lg:col-span-3 lg:col-start-2 lg:row-start-2">
                    <div>slang</div>
                    <div>
                        <p>markdown description</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ullam totam vitae vero atque
                            officia fuga ipsum illum quibusdam quis.
                        </p>
                    </div>
                </div>
            </section>
            <Tabs />
        </main>
    );
}

function Tabs() {
    return (
        <section className="max-w-5xl mx-auto">
            <Posts />
        </section>
    );
}

function Posts() {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        const handleFetchPosts = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/v1.0.0/posts", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setPosts(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        handleFetchPosts();
    }, [user]);
    return (
        <div>
            <div>Posts</div>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <div className="max-w-32 overflow-y-auto grid grid-flow-col">
                            {post.postImages.map((image) => (
                                <img key={image.id} src={image.url} />
                            ))}
                        </div>
                        <div className="font-bold">{post.title}</div>
                        <div className="max-w-32 overflow-y-auto">{post.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
