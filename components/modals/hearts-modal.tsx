"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useHeartsModal } from "@/store/use-hearts-modal";


export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setIsClient(true), []);

    const handleClick = () => {
        close();
        router.push("/store");
    }

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src={'/dead-face.svg'}
                            alt="Dead face"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        You ran out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Get Pro for unlimited hearts, or purchase them in the store.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4 mt-3">
                    <div className="flex flex-col gap-y-3 w-full">
                        <Button
                            variant={'primary'}
                            className="w-full"
                            size={'lg'}
                            onClick={handleClick}>
                            Get unlimited hearts
                        </Button>
                        <Button
                            variant={'primaryOutline'}
                            className="w-full"
                            size={'lg'}
                            onClick={() => {
                                close();
                            }}>
                            No, Thanks
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}