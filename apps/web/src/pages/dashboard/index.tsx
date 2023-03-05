import { type NextPageContext } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Error from "~/components/Error";
import CustomAlert from "~/components/alert/CustomAlert";
import InDevelopmentMessage from "~/components/alert/InDevelopmentMessage";
import Navbar from "~/components/navbar/Navbar";

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
        className="mx-auto my-12 max-w-5xl px-4 text-zinc-900 lg:px-0"
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
        {data && data.length === 0 && (
          <CustomAlert
            title="No wikis found"
            iconColor="#fbbf24"
            description="You don't seem to have any wiki(s) yet. You can create one by
            clicking the button below. If you already have a wiki, you can go to
            the import page to import it (coming soon)"
          >
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
          </CustomAlert>
        )}
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
                        className="scale-0 rounded-md border border-zinc-200 bg-white py-2 px-2 text-sm font-medium text-zinc-800 transition-colors duration-100 ease-in-out group-hover:scale-100"
                      >
                        Manage
                      </button>
                      <button
                        key={wiki.id}
                        className="scale-0 rounded-md border border-zinc-200 bg-white py-2 px-2 text-sm font-medium text-zinc-800 transition-colors duration-100 ease-in-out group-hover:scale-100"
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

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/signin" } };
  }

  return {
    props: {},
  };
}
