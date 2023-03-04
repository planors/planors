import { useState } from "react";
import { type NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { getSession, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Error from "~/components/Error";
import Navbar from "~/components/navbar/Navbar";
import { Info } from "~/common/svg";

const inter = Inter({
  preload: false,
  subsets: ["latin"],
});
export default function Dashboard() {
  const { data: session, status } = useSession();

  const { data, isLoading, error } = api.wiki.getWikisByAuthor.useQuery({
    authorId: session?.user?.id as string,
  });

  const context = api.useContext();

  const {
    mutate,
    isLoading: isMutating,
    error: mutationError,
  } = api.wiki.delete.useMutation({
    onSuccess: () => {
      context
        .invalidate()
        .then(() => {
          console.log("invalidated");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const handleDelete = (id: string) => {
    if (isMutating) return;
    mutate({
      id: id,
    });
  };

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main
        className="mx-auto my-12 max-w-5xl text-zinc-900"
        style={inter.style}
      >
        {session && (
          <section>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="mt-2 mb-8 text-zinc-700">
              Manage, create and edit your wiki(s) here
            </p>
          </section>
        )}
        {data && data.length === 0 && <NoWikisMessage />}
        {isLoading && (
          <div className="mt-5 text-zinc-800">Loading your wiki(s)...</div>
        )}
        {error && (
          <div>
            <Error error={error.message} />
          </div>
        )}
        {data && data.length > 0 && (
          <section>
            <InDevelopmentMessage />
            <div className="mt-4 rounded-md border border-zinc-200">
              <div className="flex flex-row items-center justify-between border-b border-zinc-200 py-2 px-4">
                <h2 className="text-sm font-semibold">Your wiki(s)</h2>
                <Link
                  href="/create"
                  className="rounded-md border border-zinc-200 bg-white py-2 px-3 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out"
                >
                  Create
                </Link>
              </div>
              <div className="divide-y ">
                {data?.map((wiki) => (
                  <div
                    key={wiki.id}
                    className="group flex flex-row items-center justify-between py-3 px-4 hover:bg-zinc-50"
                  >
                    <Link href={`dashboard/${wiki.id}`} className="text-sm">
                      <h4>{wiki.title}</h4>
                    </Link>
                    <div className="flex flex-row gap-2">
                      <button
                        key={wiki.id}
                        className="invisible rounded-md border border-zinc-200 bg-white py-2 px-2 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out group-hover:visible"
                      >
                        Manage
                      </button>
                      <button
                        key={wiki.id}
                        className="invisible rounded-md border border-zinc-200 bg-white py-2 px-2 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out group-hover:visible"
                        onClick={() => handleDelete(wiki.id)}
                      >
                        Delete
                      </button>
                    </div>

                    {mutationError && <Error error={mutationError.message} />}
                    {isMutating && <div>deleting...</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

// TODO - Add a link to the author's settings page (if the user is the author)
// TODO - Ability to edit/delete/create the wiki
// TODO - Stats about the wiki
// TODO - Link to wiki's dashboard (when ready)

const NoWikisMessage = () => {
  return (
    <div className="select-none rounded-md border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex w-full flex-row gap-4">
        <Info className="h-10 w-10 text-orange-300" />
        <div className="flex flex-col">
          <h2 className="mb-1 font-semibold">No wikis found</h2>
          <p className="text-sm text-zinc-600">
            You don't seem to have any wiki(s) yet. You can create one by
            clicking the button below. If you already have a wiki, you can go to
            the import page to import it (coming soon)
          </p>
          <div className="mt-5 flex flex-row gap-2">
            <Link
              href="/create"
              className="rounded-md border border-zinc-300 bg-white py-2 px-3 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out"
            >
              Create
            </Link>
            <button
              className="rounded-md border border-zinc-300 bg-white py-2 px-3 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out "
              type="button"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InDevelopmentMessage = () => {
  return (
    <div className="mt-4 select-none rounded-md border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex w-full flex-row gap-4">
        <Info className="h-10 w-10 text-orange-300" />
        <div className="flex flex-col">
          <h2 className="mb-1 font-semibold">
            You're in the development version
          </h2>
          <p className="text-sm text-zinc-600">
            This is a development version of the app, so some features may not
            work as expected. If you find any bugs, please report them on the
            GitHub issues of the project.
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/signin" } };
  }

  return {
    props: {},
  };
}
