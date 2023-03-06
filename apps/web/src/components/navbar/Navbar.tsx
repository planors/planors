import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/react";

import Dropdown from "./Dropdown";

const inter = Inter({
  preload: false,
  subsets: ["latin"],
});

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="top-0 w-full border-b border-zinc-200" style={inter.style}>
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between py-3 px-4 lg:px-0">
        <div className="flex flex-row items-center gap-4">
          <Link href="/" className="text-zinc-900">
            Home
          </Link>
          <Link href="/dashboard" className="text-zinc-900">
            Dashboard
          </Link>
        </div>
        <div>
          {session && (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button>
                <Image
                  src={session.user.image || ""}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={session.user.name || ""}
                />
              </Menu.Button>
              <Dropdown session={session.user} />
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}
