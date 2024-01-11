"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<string>();
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

      const result = await response.text();
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
        Get tweets
      </button>
      <div>{posts}</div>
    </div>
  );
}
