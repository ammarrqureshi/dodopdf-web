"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [tweetId, setTweetId] = useState<string>();
  const url = `https://twitter154.p.rapidapi.com/tweet/replies?tweet_id=${tweetId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "88225efedbmshc6e53f5878df1b0p10d61ajsn3af351e19820",
      "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
    },
  };
  async function getPosts() {
    try {
      const response = await fetch(url, options);

      const result = await response.json();
      setPosts(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input
        className="m-5 p-5 border border-orange-500 rounded-md outline-none focus:border-2"
        type="text"
        onChange={(e) => setTweetId(e.target.value)}
      />
      <button
        className="p-5 rounded-md bg-orange-500 text-white"
        onClick={() => getPosts()}
      >
        Get Thread
      </button>
      <div>
        https://api.twitter.com/2/tweets?ids=1212092628029698048&tweet.fields=attachments,author_id,context_annotations,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld&expansions=referenced_tweets.id'{" "}
        {posts &&
          posts.replies.map((index: number, reply: any) => (
            <div
              key={index}
              className="flex flex-col max-w-[50%] max-md:max-w-[90%] mx-auto justify-start m-2 items-start bg-slate-200 rounded-lg overflow-hidden "
            >
              <div className="text-md bg-orange-500 px-4 py-2 rounded-br-lg  flex gap-3 inline-block items-center">
                <Image
                  alt="user profile image"
                  src={reply.user.profile_pic_url}
                  className=" w-8 h-8 rounded-full "
                />
                <h2>{reply.user.name}</h2>
              </div>
              <h3 className="text-sm bg-slate-600 text-gray-400 px-4 inline-block">
                @{reply.user.username}
              </h3>
              <div className="p-4 bg-black text-white rounded-tr-lg">
                {reply.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
