import AddPostForm from "@/components/post/add-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/session-provider";
import { fetchPosts } from "@/lib/action/post-action";
import Posts from "@/components/post/post-list";
import { unstable_cache } from "next/cache";

// export const revalidate = 60;

// const getCachedPosts = unstable_cache(
//   async () => {
//     return await fetchPosts();
//   },
//   ["posts"],
//   { revalidate: 60, tags: ["posts"] },
// );

export default async function Home() {
  const session = await getServerSession(authOptions);

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const posts = await fetchPosts();

  // const posts = await getCachedPosts();

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg items-center">
      <div className="flex min-h-screen w-full flex-col border-x border-x-black">
        {session && (
          <div className="w-full border-b border-b-black py-8">
            <SessionProvider session={session}>
              <AddPostForm />
            </SessionProvider>
          </div>
        )}
        {posts && <Posts posts={posts} />}
      </div>
    </main>
  );
}
