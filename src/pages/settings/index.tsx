import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Settings() {
  const { data: session, status } = useSession();
  return (
    <main className="mx-auto flex max-w-5xl flex-row gap-8 py-10">
      <nav>
        <SettingsNavbar />
      </nav>
      <div className="flex w-full flex-col">
        <h1 className="text-3xl font-semibold">Account</h1>
        <form className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={session?.user.name || ""} />
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            id="bio"
            cols={30}
            rows={10}
            className="resize-none rounded-md border-2 border-zinc-300 py-2 px-3 focus:outline-none"
          ></textarea>
        </form>
        <h2>Socials</h2>
        <form>
          <label htmlFor="github">GitHub</label>
          <input
            type="text"
            placeholder="Link to your GitHub Account"
            id="github"
          />
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            placeholder="Link to your personal website"
          />
        </form>
      </div>
    </main>
  );
}

// TODO: Options (functionality):
// Prefrences
// Account
const SettingsNavbar = () => {
  return (
    <div className="flex w-40 flex-col">
      <Link
        href={"/"}
        className="rounded-md px-3 py-2 transition-all duration-100 ease-in-out hover:bg-zinc-200"
      >
        Account
      </Link>
      <Link
        href={"/"}
        className="rounded-md px-3 py-2 transition-all duration-100 ease-in-out hover:bg-zinc-200"
      >
        Prefrences
      </Link>
    </div>
  );
};
