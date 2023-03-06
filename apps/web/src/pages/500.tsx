import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
});

export default function Page404() {
  return (
    <main style={inter.style} className="mx-auto my-12 max-w-xl text-zinc-900">
      <h1 className="text-center text-2xl font-bold">500 - Server error</h1>
      <p className="mt-1 text-center text-zinc-800">
        Something went wrong on our end. Please try again later or contact us if
        the problem persists and we&apos;ll try to fix it as soon as possible.
      </p>
    </main>
  );
}
