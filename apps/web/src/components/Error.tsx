import { useState } from "react";
import Link from "next/link";

const Error = ({ error }: { error: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-4 select-none rounded-md border border-amber-200 bg-amber-50 p-5">
      <div className="flex w-full flex-row gap-4">
        <div className="flex flex-col">
          <h2 className="mb-1 font-semibold">Error occured</h2>
          <p className="text-sm text-zinc-600">
            An error occured. Please try again later or open an issue in the{" "}
            <Link
              href="https://github.com/LukaHietala/wiki-app/issues"
              className="text-zinc-600 underline"
            >
              GitHub repository of the app
            </Link>{" "}
            and include the error below in the issue. You should also try to
            reload the page.
          </p>
          <details className="mt-5">
            <summary className="text-sm text-zinc-600">View the error</summary>
            <div className="mt-2 flex flex-row gap-2">
              <code className="mt-2 text-sm text-zinc-600">{error}</code>
              <button
                className="rounded-md border border-zinc-300 bg-white py-2 px-3 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out"
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(error);
                  setCopied(true);
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Error;
