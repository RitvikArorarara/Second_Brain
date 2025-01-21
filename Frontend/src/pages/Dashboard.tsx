import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcons";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/SideBar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { SignoutIcon } from "../icons/SignoutIcon";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("All")
  const { contents, refresh, error } = useContent();
  const navigate = useNavigate();
  useEffect(() => {
    refresh();
  }, [modalOpen]);
  let filteredContents = contents;
  const handleFilterChange = (filter: string) => {
      if(filter === "All") {
        filteredContents = contents;
        setFilter("All");
      } else if(filter === "Twitter") {
        filteredContents = contents.filter(content => {content.type === "twitter" && setFilter("Twitter")});
        setFilter("Twitter");
      } else if(filter === "Youtube") {
        filteredContents = contents.filter(content => {content.type === "youtube" && setFilter("Youtube")});
        setFilter("Youtube");
      }
  }

  return (
  
    <>
      <div>
        <Sidebar onFilterChange={handleFilterChange}  />
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
          <CreateContentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
            <Button
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
              onClick={async () => {
                const response = await axios.post(
                  BACKEND_URL + "/api/v1/brain/share",
                  {
                    share: true,
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`;
                alert(shareUrl);
              }}
            />
            <Button
              variant="primary"
              text="Sign out"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              startIcon={<SignoutIcon />}
            ></Button>
          </div>
          <div className="flex flex-wrap gap-4">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredContents && filteredContents.length > 0 ? (
              filteredContents.map(({ type, link, title }) => (
                <Card
                  key={link}
                  type={type}
                  link={link}
                  title={title}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-bold text-gray-800">
                  No contents available
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
