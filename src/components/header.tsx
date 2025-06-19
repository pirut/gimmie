import { ModeToggle } from "./mode-toggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { SignIn, SignUp, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
            <div className="flex items-center gap-4">
                <SignedOut>
                    <SignIn />
                    <SignUp />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <ModeToggle />
            </div>
        </header>
    );
}
