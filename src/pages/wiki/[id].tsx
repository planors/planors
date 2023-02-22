import { useRouter } from "next/router";
import { api } from "../../utils/api";
import ReactMarkdown from "react-markdown";

export default function WikiPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: wiki,
    error: wikiErr,
    isLoading: wikiIsLoading,
  } = api.wiki.get.useQuery({
    id: id as string,
  });

  if (wikiErr) return <div>failed to load. Error {wikiErr.message}</div>;
  if (wikiIsLoading) return <div>loading...</div>;
  if (!wiki) return <div>no wiki found</div>;

  return (
    <main>
      <h1>Wiki Page</h1>
      <ReactMarkdown className="prose prose-sm">{wiki.intro}</ReactMarkdown>
    </main>
  );
}
