import { ModeToggle } from "./mode-toggle";

export function Footer() {
    return (
        <footer className="w-full p-4 mt-auto">
            <div className="flex justify-between items-center">
                <div>© {new Date().getFullYear()} JR Bussard</div>
                <ModeToggle />
            </div>
        </footer>
    );
}
