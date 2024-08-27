import AddPostForm from "@/components/post/add-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/session-provider";
import { fetchPosts } from "@/lib/action/post-action";
import { PostsType } from "@/utils/model/post-model";
import { Suspense } from "react";
import PostSkeleton from "@/components/skeleton/post-skeleton";
import Posts from "@/components/post/post-list";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const posts = await fetchPosts();

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
        <Suspense fallback={<p>Loading...</p>}>
          <Posts posts={posts} />
        </Suspense>
      </div>
    </main>
  );
}
