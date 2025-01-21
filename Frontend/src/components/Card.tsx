 import { useState, useEffect } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface CardProps {
  title: string
  link: string
  type: "twitter" | "youtube"

}

export function Card({ title, link, type }: CardProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
    } catch (error) {
      console.error("Error deleting content", error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) 

    return () => clearTimeout(timer)
  }, [])

  const handleContentLoad = () => {
    setLoading(false)
  }

  const handleContentError = () => {
    setLoading(false)
    setError("Failed to load content")
  }

  const getCardSize = () => {
    switch (type) {
      case "twitter":
        return "max-w-md min-h-[250px]"
      case "youtube":
        return "max-w-xl min-h-[315px]"
      default:
        return "max-w-md min-h-[200px]"
    }
  }

  return (
    <div className={`p-4 bg-white border border-gray-100 rounded-md ${getCardSize()} w-full`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            {type === "twitter" ? <TwitterIcon /> : <YoutubeIcon />}
          </div>
          <span className="font-semibold truncate">{title}</span>
        </div>
        <div className="flex items-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="pr-2 text-gray-500 hover:text-gray-700">
            <ShareIcon />
          </a>
          <button onClick={handleDelete} className="text-gray-500 hover:text-gray-700">
            <CrossIcon />
          </button>
        </div>
      </div>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100 rounded">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        {type === "twitter" && (
          <blockquote className="twitter-tweet" onLoad={handleContentLoad} onError={handleContentError}>
            <a href={link.replace("x.com", "twitter.com")} />
          </blockquote>
        )}
        {type === "youtube" && (
          <iframe
            className="w-full h-full"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleContentLoad}
            onError={handleContentError}
          ></iframe>
        )}
      </div>
    </div>
  )
}

