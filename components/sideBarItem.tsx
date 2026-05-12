"use client"

import { FC } from 'react'
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface SideBarItemProps {
  label: string;
  iconSrc: string;
  href: string;
}

const SideBarItem: FC<SideBarItemProps> = ({ label, iconSrc, href }) => {
  const pathName = usePathname();
  const active = pathName === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className='justify-start h-13'
      asChild
    >
      <Link href={href}>
        <Image src={iconSrc} className='mr-5' alt={label} width={32} height={32} />
        {label}
      </Link>
    </Button>
  )
}

export default SideBarItem
