import { useState, useEffect } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";


interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId: string;
}

export function Card({ title, link, type }: CardProps) {
  const { deleteContent } = useContent();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
      data: {
        contentId,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4">
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              {type === "twitter" && <TwitterIcon />}
              {type === "youtube" && <YoutubeIcon />}
            </div>
            {title}
          </div>

          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>

            <div className="text-gray-500 hover:cursor-pointer" onClick={() => handleDelete()}>
              <CrossIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
