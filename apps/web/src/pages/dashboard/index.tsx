import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
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
    <main className="mx-auto my-12 max-w-5xl text-zinc-900" style={inter.style}>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      {data && data.length === 0 && (
        <div className="mt-4 rounded-md border border-gray-200 bg-zinc-50 p-5">
          <div className="flex w-full flex-row gap-4">
            <Info className="h-10 w-10 text-orange-300" />
            <div className="flex flex-col">
              <h2 className="mb-1 font-semibold">No wikis found</h2>
              <p className="text-sm text-zinc-600">
                You don't seem to have any wiki(s) yet. You can create one by
                clicking the button below. If you already have a wiki, you can
                go to the import page to import it (coming soon)
              </p>
              <div className="mt-5">
                <Link
                  href="/create"
                  className="rounded-md border border-zinc-300 bg-white py-2 px-3 text-sm font-medium text-zinc-800 transition-all duration-100 ease-in-out"
                >
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Image
        src={session?.user?.image as string}
        width={64}
        height={64}
        alt={session?.user?.name as string}
        className="rounded-full"
        unoptimized
      />
      <h2>
        {session?.user?.name} - {session?.user?.email}
      </h2>
      <h3>Your Wikis</h3>
      {isLoading && <div>loading...</div>}
      {error && <div>error: {error.message}</div>}
      {data?.map((wiki) => (
        <div
          key={wiki.id}
          className="flex flex-row items-center justify-between py-4"
        >
          <Link href={`dashboard/${wiki.id}`}>
            <h4>{wiki.title}</h4>
          </Link>
          <button key={wiki.id} onClick={() => handleDelete(wiki.id)}>
            Delete
          </button>
          {mutationError && <div>error: {mutationError.message}</div>}
          {isMutating && <div>deleting...</div>}
        </div>
      ))}
    </main>
  );
}

// TODO - Add a link to the author's settings page (if the user is the author)
// TODO - Ability to edit/delete/create the wiki
// TODO - Stats about the wiki
// TODO - Link to wiki's dashboard (when ready)
