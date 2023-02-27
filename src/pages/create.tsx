import { useState } from "react";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";
import Modal from "~/components/create/Modal";
import { AnimatePresence } from "framer-motion";

export default function CreateWikiPage() {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const { data: session } = useSession();

  const { mutate } = api.wiki.create.useMutation();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(title, intro);
    mutate({ title, intro, authorId: session?.user.id as string });
  };
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center py-10 text-neutral-800">
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <Modal handleClose={() => setModalOpen(false)} />}
      </AnimatePresence>
      <div className="rounded-md border border-neutral-300 py-8 px-6">
        <h1 className="mb-2 text-2xl font-bold">Create a new wiki</h1>
        <p className="mb-4 text-neutral-700">
          A wiki is a collection of pages that anyone can edit. If you already
          have wiki, you can{" "}
          <button
            className="text-blue-600"
            onClick={() =>
              modalOpen ? setModalOpen(false) : setModalOpen(true)
            }
          >
            import it
          </button>{" "}
          instead, but make sure its in markdown format
        </p>
        <hr className="my-4" />
        <form className="text-sm">
          <label htmlFor="title" className="font-medium text-neutral-600">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="my-2 block h-9 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
          <label htmlFor="description" className="font-medium text-neutral-600">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="my-2 block h-9 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
          <label htmlFor="intro" className="font-medium text-neutral-600">
            Intro
          </label>
          <textarea
            id="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="my-2 block w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
          <div className="flex flex-row gap-2 py-2">
            <button className="rounded-md border border-neutral-300 py-2 px-2 hover:bg-neutral-50">
              Open editor
            </button>
            <button className="rounded-md border border-neutral-300 py-2 px-2 hover:bg-neutral-50">
              Preview
            </button>
          </div>
        </form>
        <hr className="my-4" />
        <form className="my-4 select-none text-sm">
          <div className="inline-flex">
            <input type="radio" id="public" value="Public" name="visibility" />
            <div className="pl-2">
              <label htmlFor="public" className="font-medium text-neutral-700">
                Public
              </label>
              <p className="text-neutral-600">
                Public wikis are visible to everyone
              </p>
            </div>
          </div>
          <div className="inline-flex">
            <input
              type="radio"
              id="private"
              value="Private"
              name="visibility"
            />
            <div className="pl-2">
              <label htmlFor="private" className="font-medium text-neutral-700">
                Private
              </label>
              <p className="text-neutral-600">
                Private wikis are only visible to you and people you invite to
                the wiki
              </p>
            </div>
          </div>
        </form>
        <hr className="my-4" />
        <h2 className="mb-4 text-lg font-semibold text-neutral-700">Socials</h2>
        <form className="flex flex-col text-sm">
          <label htmlFor="github" className="mb-2 font-medium text-neutral-600">
            GitHub
          </label>
          <div className="relative mb-2 flex items-center rounded-md border border-neutral-300">
            <div className="flex h-9 flex-col justify-center rounded-l-md border-r border-neutral-300 bg-neutral-50 px-3">
              <LinkSVG />
            </div>
            <input
              id="github"
              type="text"
              className="block h-9 w-full rounded-md px-3 focus:outline-none"
            />
          </div>

          <label
            htmlFor="website"
            className="mb-2 font-medium text-neutral-600"
          >
            Website
          </label>
          <div className="relative mb-2 flex items-center rounded-md border border-neutral-300">
            <div className="flex h-9 flex-col justify-center rounded-l-md border-r border-neutral-300 bg-neutral-50 px-3">
              <LinkSVG />
            </div>
            <input
              id="website"
              type="text"
              className="block h-9 w-full rounded-md px-3 focus:outline-none"
            />
          </div>
        </form>
        <hr className="my-4" />
        <section className="flex flex-row items-center gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-neutral-800 py-2 px-3 text-white transition-opacity duration-100 ease-in-out hover:bg-opacity-90"
          >
            Create
          </button>
          <button
            type="button"
            className="rounded-md border border-neutral-300 py-2 px-3 transition-all duration-100 ease-in-out hover:bg-neutral-100"
          >
            Create as draft
          </button>
        </section>
      </div>
    </main>
  );
}

const LinkSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
};
