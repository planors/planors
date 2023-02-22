import { useRouter } from "next/router";

export default function WikiPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Wiki Page</h1>
      <p>{id}</p>
    </div>
  );
}
