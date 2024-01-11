"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<string>();
  const url =
    "https://twitter154.p.rapidapi.com/tweet/replies?tweet_id=1721032055423951213";
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
      <button onClick={() => getPosts()}>Get tweets</button>
      <div>{posts}</div>
    </div>
  );
}
