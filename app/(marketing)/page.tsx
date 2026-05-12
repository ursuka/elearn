import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  return (
    <main className="max-w-screen mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative size-96 lg:size-106 mb-8 mb:mb-0 lg:mr-5 ">
        <Image src={'/logoWithText.svg'} alt="Logo With Text" fill />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-101.5 text-center">
          Learn, practice, and master new languages with ELearn.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-82 w-full">
          <ClerkLoading>
            <Loader className="size-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                fallbackRedirectUrl={'/learn'}
              >
                <Button size={'lg'} variant={'secondary'} className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                fallbackRedirectUrl={'/learn'}
              >
                <Button size={'lg'} variant={'primaryOutline'} className="w-full">
                  I already have an account.
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
                <Button size={'lg'} variant={'secondary'} className="w-full" asChild>
                  <Link href={'/learn'}>
                    Continue Learning.
                  </Link>
                </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </main>
  );
}

export default Home;