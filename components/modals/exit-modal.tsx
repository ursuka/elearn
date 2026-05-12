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
import { useExitModal } from "@/store/use-exit-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";


export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src={'/sad-face.svg'}
                            alt="Sad face"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Wait, don&apos;t go!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        You&apos;re about to leave the lesson. Are you sure?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4 mt-3">
                    <div className="flex flex-col gap-y-3 w-full">
                        <Button
                            variant={'primary'}
                            className="w-full"
                            size={'lg'}
                            onClick={close}>
                            Keep Learning
                        </Button>
                        <Button
                            variant={'dangerOutline'}
                            className="w-full"
                            size={'lg'}
                            onClick={() => {
                                close();
                                router.push('/learn')
                            }}>
                            End Session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}