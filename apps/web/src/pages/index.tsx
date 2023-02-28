import { type NextPage, type NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return null;
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/signin" } };
  } else {
    return { redirect: { permanent: false, destination: "/dashboard" } };
  }
}
export default Home;
