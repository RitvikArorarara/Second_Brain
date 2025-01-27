import { useState, useEffect } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";




interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: () => void;
}

export function Card({ title, link, type, onDelete }: CardProps) {

  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
 



  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      loading
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4">
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72 ">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              {type === "twitter" && <TwitterIcon />}
              {type === "youtube" && <YoutubeIcon />}
            </div>
            {title}
          </div>
    
          <div className="flex items-center">
           

            <div onClick={onDelete} className="text-gray-500 hover:cursor-pointer" >
              <CrossIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          { type === "youtube" && (
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

          { type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
