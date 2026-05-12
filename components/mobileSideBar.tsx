import { FC } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import SideBar from '@/components/sidebar';
import { Menu } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const MobileSideBar: FC = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu color='white' />
            </SheetTrigger>
            <SheetContent className='p-0 z-1000' side='left'>
                <VisuallyHidden>
                    <SheetTitle>Navigation</SheetTitle>
                </VisuallyHidden>
                <SideBar className={"w-full"} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSideBar