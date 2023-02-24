import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const { data, isLoading, error } = api.wiki.getWikisByAuthor.useQuery({
    authorId: session?.user?.id as string,
  });

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
        <Link key={wiki.id} href={`wiki/${wiki.id}`}>
          <h4>{wiki.title}</h4>
        </Link>
      ))}
    </main>
  );
}

// TODO - Add a link to the author's settings page (if the user is the author)
// TODO - Ability to edit/delete/create the wiki
// TODO - Stats about the wiki
// TODO - Link to wiki's dashboard (when ready)
