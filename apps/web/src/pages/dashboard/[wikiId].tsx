import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

export default function WikiDashboard() {
  const router = useRouter();
  const { wikiId } = router.query;

  const { data, error, isLoading } = api.wiki.getWiki.useQuery({
    id: wikiId as string,
  });

  const { mutate } = api.wiki.delete.useMutation();

  const handleDelete = () => {
    mutate({ id: wikiId as string });
  };
  // TODO - Edit wiki
  // TODO - Add author(s)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <main>
      <Link href={`/wiki/${wikiId as string}`}>View</Link>
      <h1>{data?.title}</h1> <button onClick={handleDelete}>Delete</button>
      <Link href={"/dashboard"}>Back to dashboard</Link>
    </main>
  );
}
