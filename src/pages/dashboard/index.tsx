import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

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
    <main>
      <h1>Dashboard</h1>
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
