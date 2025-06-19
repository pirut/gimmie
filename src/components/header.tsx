import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <header className="w-full p-4 flex justify-between items-center">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/about">About</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/faq">FAQ</NavigationMenuLink>
                    </NavigationMenuItem>
                    <SignedIn>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
                        </NavigationMenuItem>
                    </SignedIn>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex gap-4">
                <SignedOut>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button>Login</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="flex m-0 p-0 justify-center">
                                <SignInButton />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex m-0 p-0 justify-center">
                                <SignUpButton />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <ModeToggle />
            </div>
        </header>
    );
}
