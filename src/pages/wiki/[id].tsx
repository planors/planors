import { useRouter } from "next/router";
import { api } from "../../utils/api";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

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
    <main className="mx-auto my-6 max-w-7xl">
      <div className="flex flex-row items-start justify-between pb-2">
        <div>
          <h1 className="text-4xl font-semibold opacity-80">{wiki.title}</h1>
          <p className="text-sm text-gray-500">
            Created by {wiki.author.name} on {wiki.createdAt.toISOString()} |
            Last edited on {wiki.updatedAt.toISOString()}
          </p>
        </div>
        <Image
          src={wiki?.author?.image as string}
          width={64}
          height={64}
          alt={wiki?.author?.name as string}
          className="rounded-full"
          // TODO: Add a fallback image
          // TODO: Add a link to the author's
          // TODO: Remove unoptimized tag
          unoptimized
        />
      </div>
      <hr className="mt-4 mb-8" />

      <div className="flex w-full flex-row justify-between gap-6">
        <main>
          <ReactMarkdown className="prose max-w-none">
            {wiki.intro}
          </ReactMarkdown>
          <hr className="mt-8 mb-8" />
          <WikiInfo />
        </main>
        <div className="sticky top-0 right-0 flex flex-col gap-6">
          <WikiPages />
          <WikiSections />
          <WikiActions />
        </div>
      </div>
    </main>
  );
}

// Contains links to sections of the current page
const WikiSections = () => {
  // Some mock data, also in lis
  return (
    <section className="w-max rounded-md border border-zinc-300 py-6 px-8 text-sm leading-relaxed">
      <h2 className="pb-2 text-xl font-bold">Sections</h2>
      <ul className="list-disc pl-8">
        <li>Section 1</li>
        <li>Section 2</li>
        <li>Section 3</li>
        <li className="list-none pl-4">
          <ul className="list-disc">
            <li>Section 3.1</li>
            <li>Section 3.2</li>
            <li>Section 3.3</li>
          </ul>
        </li>
        <li>Loooooooong somethiiiing seeeeection</li>
      </ul>
    </section>
  );
};

// List of pages in the wiki
const WikiPages = () => {
  return (
    <section>
      <h2>Pages</h2>
      <ul>
        <li>Page 1</li>
        <li>Page 2</li>
        <li>Page 3</li>
      </ul>
    </section>
  );
};

// Edit request, Translate, quiclinks (gh repo), and more for authors
const WikiActions = () => {
  return (
    <section>
      <h2 className="pb-2 text-xl font-semibold">Actions</h2>
      <ul>
        <li className="cursor-pointer py-1 hover:underline">Request edit</li>
        <li className="cursor-pointer py-1 hover:underline">
          Translate this page
        </li>
      </ul>
    </section>
  );
};

// Contributors, and some metadata at the bottom of wiki text
const WikiInfo = () => {
  return (
    <section className="flex flex-row items-center justify-between">
      <div>
        <h2 className="pb-2 text-lg">Contributors</h2>
        <div className="flex -space-x-1 overflow-hidden">
          <Image
            src="https://avatars.githubusercontent.com/u/95122845?v=4"
            width={40}
            height={40}
            alt="User avatar"
            className="inline-block rounded-full ring-2 ring-white"
            unoptimized
          />{" "}
          <Image
            src="https://avatars.githubusercontent.com/u/95122845?v=4"
            width={40}
            height={40}
            alt="User avatar"
            className="inline-block rounded-full ring-2 ring-white"
            unoptimized
          />
          <Image
            src="https://avatars.githubusercontent.com/u/95122845?v=4"
            width={40}
            height={40}
            alt="User avatar"
            className="inline-block rounded-full ring-2 ring-white"
            unoptimized
          />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm text-gray-500">
          Last edited on 2021-09-01T12:00:00.000Z by{" "}
          <a href="#" className="underline">
            User
          </a>
        </p>
      </div>
    </section>
  );
};
