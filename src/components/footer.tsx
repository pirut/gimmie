import { ModeToggle } from "./mode-toggle";

export function Footer() {
    return (
        <footer className="flex justify-between text-center pl-4 pr-4 pb-4">
            <div>© {new Date().getFullYear()} JR Bussard</div>
            <ModeToggle />
        </footer>
    );
}
