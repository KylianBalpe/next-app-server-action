import {
  Post,
  PostAuthor,
  PostAuthorAvatar,
  PostAuthorAvatarFallback,
  PostAuthorAvatarImage,
  PostAuthorContainer,
  PostAuthorName,
  PostAuthorUsername,
  PostContainer,
  PostContent,
} from "@/components/posts/post";
import PostMenu from "@/components/posts/post-menu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-lg items-center">
      <div className="flex min-h-screen w-full flex-col border-x border-x-black">
        <Post>
          <PostContainer>
            <PostAuthor>
              <PostAuthorAvatar>
                <PostAuthorAvatarImage src="https://github.com/shadcn.png" />
                <PostAuthorAvatarFallback>BP</PostAuthorAvatarFallback>
              </PostAuthorAvatar>
              <div className="inline-flex w-full items-center justify-between">
                <PostAuthorContainer>
                  <PostAuthorName>Bejir</PostAuthorName>
                  <PostAuthorUsername>geming</PostAuthorUsername>
                </PostAuthorContainer>
                <PostMenu />
              </div>
            </PostAuthor>
            <PostContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              perspiciatis quis eligendi adipisci alias ducimus cumque
              laudantium non dignissimos omnis commodi soluta veritatis voluptas
              quibusdam sit minus, perferendis modi? Officia quos ducimus,
              sapiente unde cupiditate autem consequuntur ab nemo voluptatum qui
              id exercitationem quaerat? Voluptatem earum modi eveniet nam
              adipisci.
            </PostContent>
          </PostContainer>
        </Post>
        <Post>
          <PostContainer>
            <PostAuthor>
              <PostAuthorAvatar>
                <PostAuthorAvatarImage src="https://github.com/shadcn.png" />
                <PostAuthorAvatarFallback>BP</PostAuthorAvatarFallback>
              </PostAuthorAvatar>
              <div className="inline-flex w-full items-center justify-between">
                <PostAuthorContainer>
                  <PostAuthorName>Bejir</PostAuthorName>
                  <PostAuthorUsername>geming</PostAuthorUsername>
                </PostAuthorContainer>
                <PostMenu />
              </div>
            </PostAuthor>
            <PostContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              perspiciatis quis eligendi adipisci alias ducimus cumque
              laudantium non dignissimos omnis commodi soluta veritatis voluptas
              quibusdam sit minus, perferendis modi? Officia quos ducimus,
              sapiente unde cupiditate autem consequuntur ab nemo voluptatum qui
              id exercitationem quaerat? Voluptatem earum modi eveniet nam
              adipisci.
            </PostContent>
          </PostContainer>
        </Post>
        <Post>
          <PostContainer>
            <PostAuthor>
              <PostAuthorAvatar>
                <PostAuthorAvatarImage src="https://github.com/shadcn.png" />
                <PostAuthorAvatarFallback>BP</PostAuthorAvatarFallback>
              </PostAuthorAvatar>
              <div className="inline-flex w-full items-center justify-between">
                <PostAuthorContainer>
                  <PostAuthorName>Bejir</PostAuthorName>
                  <PostAuthorUsername>geming</PostAuthorUsername>
                </PostAuthorContainer>
                <PostMenu />
              </div>
            </PostAuthor>
            <PostContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              perspiciatis quis eligendi adipisci alias ducimus cumque
              laudantium non dignissimos omnis commodi soluta veritatis voluptas
              quibusdam sit minus, perferendis modi? Officia quos ducimus,
              sapiente unde cupiditate autem consequuntur ab nemo voluptatum qui
              id exercitationem quaerat? Voluptatem earum modi eveniet nam
              adipisci.
            </PostContent>
          </PostContainer>
        </Post>
        <Post>
          <PostContainer>
            <PostAuthor>
              <PostAuthorAvatar>
                <PostAuthorAvatarImage src="https://github.com/shadcn.png" />
                <PostAuthorAvatarFallback>BP</PostAuthorAvatarFallback>
              </PostAuthorAvatar>
              <div className="inline-flex w-full items-center justify-between">
                <PostAuthorContainer>
                  <PostAuthorName>Bejir</PostAuthorName>
                  <PostAuthorUsername>geming</PostAuthorUsername>
                </PostAuthorContainer>
                <PostMenu />
              </div>
            </PostAuthor>
            <PostContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              perspiciatis quis eligendi adipisci alias ducimus cumque
              laudantium non dignissimos omnis commodi soluta veritatis voluptas
              quibusdam sit minus, perferendis modi? Officia quos ducimus,
              sapiente unde cupiditate autem consequuntur ab nemo voluptatum qui
              id exercitationem quaerat? Voluptatem earum modi eveniet nam
              adipisci.
            </PostContent>
          </PostContainer>
        </Post>
      </div>
    </main>
  );
}
