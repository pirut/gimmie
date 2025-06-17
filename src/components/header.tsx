import Link from "next/link";

export function Header() {
    return (
        <header className="flex justify-baseline items-center text-center pt-4">
            <nav className="container mx-auto flex space-x-4">
                <Link href="/" className="font-semibold hover:underline">
                    Home
                </Link>
                <Link href="/about" className="font-semibold hover:underline">
                    About
                </Link>
                <Link href="/faq" className="font-semibold hover:underline">
                    FAQ
                </Link>
            </nav>
        </header>
    );
}
