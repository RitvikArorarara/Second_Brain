// import { Card } from "../components/Card";
// import { Button } from "../components/Button";
// import { PlusIcon } from "../icons/PlusIcons";
// import { ShareIcon } from "../icons/ShareIcon";
// import { CreateContentModal } from "../components/CreateContentModal";
// import { useState, useEffect } from "react";
// import { Sidebar } from "../components/SideBar";
// import { useContent } from "../hooks/useContent";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import { useNavigate } from "react-router-dom";
// import { SignoutIcon } from "../icons/SignoutIcon";

// interface Content {
//   type: string;
//   link: string;
//   title: string;
//   contentId: string;
// }

// export function Dashboard() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [filter, setFilter] = useState("All");
//   const { contents, refresh, error } = useContent();
//   const navigate = useNavigate();
//   useEffect(() => {
//     refresh();
//   }, [modalOpen]);
//   const handleFilterChange = (newFilter: string) => {
//     setFilter(newFilter);
//   };

//   const filteredContents = contents.filter((content: Content) => {
//     if (filter === "All") return true;
//     return content.type.toLowerCase() === filter.toLowerCase();
//   });

//   return (
//     <>
//       <div>
//         <Sidebar onFilterChange={handleFilterChange} />
//         <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
//           <CreateContentModal
//             open={modalOpen}
//             onClose={() => setModalOpen(false)}
//           />
//           <div className="flex justify-end gap-4">
//             <Button
//               onClick={() => {
//                 setModalOpen(true);
//               }}
//               variant="primary"
//               text="Add Content"
//               startIcon={<PlusIcon />}
//             />
//             <Button
//               variant="secondary"
//               text="Share Brain"
//               startIcon={<ShareIcon />}
//               onClick={async () => {
//                 const response = await axios.post(
//                   BACKEND_URL + "/api/v1/brain/share",
//                   {
//                     share: true,
//                   },
//                   {
//                     headers: {
//                       Authorization: localStorage.getItem("token"),
//                     },
//                   }
//                 );
//                 const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`;
//                 alert(shareUrl);
//               }}
//             />
//             <Button
//               variant="primary"
//               text="Sign out"
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 navigate("/");
//               }}
//               startIcon={<SignoutIcon />}
//             ></Button>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             {error ? (
//               <p className="text-red-500">{error}</p>
//             ) : filteredContents && filteredContents.length > 0 ? (
//               filteredContents.map(({ type, link, title, contentId }) => (
//                 <Card key={link} type={type} link={link} title={title} contentId={contentId} />
//               ))
//             ) : (
//               <div className="flex justify-center items-center h-screen">
//                 <h1 className="text-4xl font-bold text-gray-800">
//                   No contents available
//                 </h1>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;

import { Card } from "../components/Card"
import { Button } from "../components/Button"
import { PlusIcon } from "../icons/PlusIcons"
import { ShareIcon } from "../icons/ShareIcon"
import { CrossIcon } from "../icons/CrossIcon"
import { CreateContentModal } from "../components/CreateContentModal"
import { useState, useEffect } from "react"
import { Sidebar } from "../components/SideBar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { SignoutIcon } from "../icons/SignoutIcon"

interface Content {
  type: string
  link: string
  title: string
  contentId: string
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState("All")
  const { contents, refresh, error, deleteContent } = useContent()
  const navigate = useNavigate()

  useEffect(() => {
    refresh()
  }, [modalOpen])

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  const filteredContents = contents.filter((content: Content) => {
    if (filter === "All") return true
    return content.type.toLowerCase() === filter.toLowerCase()
  })



  return (
    <>
      <div>
        <Sidebar onFilterChange={handleFilterChange} />
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                setModalOpen(true)
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
                  },
                )
                const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`
                alert(shareUrl)
              }}
            />
            <Button
              variant="primary"
              text="Sign out"
              onClick={() => {
                localStorage.removeItem("token")
                navigate("/")
              }}
              startIcon={<SignoutIcon />}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredContents && filteredContents.length > 0 ? (
              filteredContents.map(({ type, link, title, contentId }) => (
                <div key={contentId} className="relative">
                  <Card type={type} link={link} title={title} contentId={contentId} />
               
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-bold text-gray-800">No contents available</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

