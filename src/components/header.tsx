import Link from "next/link";

export function Header() {
    return (
        <header className="w-full p-4">
            <nav className="flex space-x-4">
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
