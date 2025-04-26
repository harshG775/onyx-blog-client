import { useParams } from "react-router";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfileRoute() {
    const { username } = useParams();
    return (
        <main className="p-4 space-y-8">
            <section className="max-w-5xl mx-auto grid grid-cols-4 grid-rows-2 gap-4">
                <div className="lg:row-span-2">
                    <div className="p-2">
                        <Avatar className={"w-20 lg:w-32 h-20 lg:h-32 border-4 border-primary cursor-pointer"}>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className={"w-32 h-32"}>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="col-span-3 lg:col-span-3">
                    <div className="flex gap-4 items-center">
                        <div>{username}</div>
                        <Button variant={"secondary"} className={"cursor-pointer"}>
                            Edit Profile
                        </Button>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div>Posts</div>
                        <div>Followers</div>
                        <div>Following</div>
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
            <section>{"..."}</section>
        </main>
    );
}
