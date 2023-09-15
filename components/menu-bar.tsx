import { UserButton, auth } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme-mode-toggle";
import Link from "next/link";
import { GithubIcon, User2Icon } from "lucide-react";
import { Button } from "./ui/button";

export const MenuBar = () => {
  const { userId } = auth();

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Overview
            </Link>
            {userId && (
              <Link
                href="/create-topic"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Create
              </Link>
            )}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            {!userId ? (
              <Button variant="outline" size="icon">
                <Link href="/login">
                  <User2Icon className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
            <Button variant="outline" size="icon">
              <Link
                href="https://github.com/seanjin17/masked-voices"
                target="_blank"
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
