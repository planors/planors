import { useState } from "react";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";

export default function CreateWikiPage() {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");

  const { data: session } = useSession();

  const { mutate } = api.wiki.create.useMutation();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(title, intro);
    mutate({ title, intro, authorId: session!.user.id });
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
      <button type="submit" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
}
