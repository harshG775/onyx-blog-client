import { useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/context/auth-context";
import { useState } from "react";

export default function ProfileRoute() {
    const { user } = useAuth();
    const [currentViewingUser, _setCurrentViewingUser] = useState(user);
    const { username: _ } = useParams();

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
            <section className="max-w-5xl mx-auto">{"..."}</section>
        </main>
    );
}
