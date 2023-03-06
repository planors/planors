import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
});

export default function Page404() {
  return (
    <main style={inter.style} className="mx-auto my-12 max-w-xl text-zinc-900">
      <h1 className="text-center text-2xl font-bold">404 - Page Not Found</h1>
      <p className="text-center text-zinc-800">
        Sorry, we couldn't find the page you were looking for
      </p>
      <h2 className="mt-8 mb-1 text-sm font-medium text-zinc-700">
        Popular pages
      </h2>
      <hr className="my-4 border-zinc-200" />
      <div className="flex w-full flex-col gap-2">
        <Link
          href="/"
          className="rounded-md border border-zinc-200 p-4 hover:bg-zinc-50"
        >
          <h3 className="font-medium">Home</h3>
          <p className="text-sm text-zinc-700">Go back to the home page</p>
        </Link>
        <Link
          href="/"
          className="rounded-md border border-zinc-200 p-4 hover:bg-zinc-50"
        >
          <h3 className="font-medium">Documentation (WIP)</h3>
          <p className="text-sm text-zinc-700">Go to the documentation</p>
        </Link>
        <Link
          href="https://github.com/LukaHietala/planors"
          className="rounded-md border border-zinc-200 p-4 hover:bg-zinc-50"
        >
          <h3 className="font-medium">GitHub</h3>
          <p className="text-sm text-zinc-700">
            Go to the GitHub repository of this app
          </p>
        </Link>
        <Link
          href="https://discord.gg/Cb5XdXYSJh"
          className="rounded-md border border-zinc-200 p-4 hover:bg-zinc-50"
        >
          <h3 className="font-medium">Discord</h3>
          <p className="text-sm text-zinc-700">
            Go to the Discord server of this app
          </p>
        </Link>
      </div>
      <hr className="mb-4 mt-8 border-zinc-200" />
      <p className="text-center text-zinc-800">
        If you think this is a bug, please report it on{" "}
        <Link
          href="https://github.com/LukaHietala/planors/issues"
          className="text-blue-500"
        >
          GitHub
        </Link>
      </p>
    </main>
  );
}
