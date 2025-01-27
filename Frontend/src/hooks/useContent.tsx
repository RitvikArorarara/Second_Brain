import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    await axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching contents", error);
        setError(error.response.data.message);
      });
  }

  async function deleteContent(contentId: string) {
    await axios
      .delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        console.log("Content deleted successfully");
        refresh();
      })
      .catch((error) => {
        console.error("Error deleting content", error);
        setError(
          error.response?.data?.message ||
            "An error occurred while deleting the content"
        );
      });
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh, error, deleteContent };
}
