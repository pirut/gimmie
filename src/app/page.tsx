"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Checkout from "@/components/checkout";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">Give Me a Dollar</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-full">
                        <DialogTitle>Throw me A Bone</DialogTitle>
                        <Checkout />
                    </DialogContent>
                </Dialog>
            </main>
            <Footer />
        </div>
    );
}
