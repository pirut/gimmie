"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 mt-20">
            <div className="text-3xl font-bold">Money Will Be Here</div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">Give Me a Dollar</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Give Me a Dollar</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Give me a dollar.</DialogDescription>
                    <DialogFooter>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
