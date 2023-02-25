import { useState } from "react";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";

export default function CreateWikiPage() {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  const { data: session } = useSession();

  const { mutate } = api.wiki.create.useMutation();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({
      title,
      intro,
      github,
      website,
      authorId: session?.user.id as string,
    });
  };
  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="intro">Intro</label>
      <textarea
        id="intro"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />
      <label htmlFor="github">Github</label>
      <input
        type="text"
        id="github"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <label htmlFor="website">Website</label>

      <input
        type="text"
        id="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
}
