"use client"

import { useState } from "react"
import { ChevronRight, Upload, Folder, FileText, ImageIcon, Video, Music, Archive, File } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

// Mock data structure
const mockData = {
  "/": {
    name: "My Drive",
    items: [
      { id: "1", name: "Documents", type: "folder", size: null, modified: "2024-01-15" },
      { id: "2", name: "Photos", type: "folder", size: null, modified: "2024-01-10" },
      { id: "3", name: "Projects", type: "folder", size: null, modified: "2024-01-20" },
      { id: "4", name: "Resume.pdf", type: "file", fileType: "pdf", size: "2.5 MB", modified: "2024-01-18", url: "#" },
      {
        id: "5",
        name: "Presentation.pptx",
        type: "file",
        fileType: "presentation",
        size: "15.2 MB",
        modified: "2024-01-16",
        url: "#",
      },
    ],
  },
  "/Documents": {
    name: "Documents",
    items: [
      { id: "6", name: "Work", type: "folder", size: null, modified: "2024-01-12" },
      { id: "7", name: "Personal", type: "folder", size: null, modified: "2024-01-08" },
      {
        id: "8",
        name: "Report.docx",
        type: "file",
        fileType: "document",
        size: "1.2 MB",
        modified: "2024-01-14",
        url: "#",
      },
      { id: "9", name: "Notes.txt", type: "file", fileType: "text", size: "45 KB", modified: "2024-01-13", url: "#" },
    ],
  },
  "/Documents/Work": {
    name: "Work",
    items: [
      {
        id: "10",
        name: "Meeting Notes.docx",
        type: "file",
        fileType: "document",
        size: "890 KB",
        modified: "2024-01-11",
        url: "#",
      },
      {
        id: "11",
        name: "Budget.xlsx",
        type: "file",
        fileType: "spreadsheet",
        size: "2.1 MB",
        modified: "2024-01-09",
        url: "#",
      },
      { id: "12", name: "Contracts", type: "folder", size: null, modified: "2024-01-07" },
    ],
  },
  "/Documents/Personal": {
    name: "Personal",
    items: [
      {
        id: "13",
        name: "Travel Plans.pdf",
        type: "file",
        fileType: "pdf",
        size: "3.2 MB",
        modified: "2024-01-06",
        url: "#",
      },
      {
        id: "14",
        name: "Recipes.docx",
        type: "file",
        fileType: "document",
        size: "1.8 MB",
        modified: "2024-01-05",
        url: "#",
      },
    ],
  },
  "/Photos": {
    name: "Photos",
    items: [
      { id: "15", name: "Vacation 2023", type: "folder", size: null, modified: "2023-12-20" },
      { id: "16", name: "Family", type: "folder", size: null, modified: "2023-11-15" },
      {
        id: "17",
        name: "IMG_001.jpg",
        type: "file",
        fileType: "image",
        size: "4.2 MB",
        modified: "2024-01-03",
        url: "#",
      },
      {
        id: "18",
        name: "IMG_002.png",
        type: "file",
        fileType: "image",
        size: "2.8 MB",
        modified: "2024-01-02",
        url: "#",
      },
    ],
  },
  "/Projects": {
    name: "Projects",
    items: [
      { id: "19", name: "Website Redesign", type: "folder", size: null, modified: "2024-01-19" },
      { id: "20", name: "Mobile App", type: "folder", size: null, modified: "2024-01-17" },
      {
        id: "21",
        name: "project-archive.zip",
        type: "file",
        fileType: "archive",
        size: "125 MB",
        modified: "2024-01-15",
        url: "#",
      },
    ],
  },
}

function getFileIcon(fileType: string) {
  switch (fileType) {
    case "image":
      return <ImageIcon className="w-4 h-4 text-blue-400" />
    case "video":
      return <Video className="w-4 h-4 text-purple-400" />
    case "audio":
      return <Music className="w-4 h-4 text-green-400" />
    case "archive":
      return <Archive className="w-4 h-4 text-yellow-400" />
    case "pdf":
      return <FileText className="w-4 h-4 text-red-400" />
    case "document":
      return <FileText className="w-4 h-4 text-blue-400" />
    case "spreadsheet":
      return <FileText className="w-4 h-4 text-green-400" />
    case "presentation":
      return <FileText className="w-4 h-4 text-orange-400" />
    case "text":
      return <FileText className="w-4 h-4 text-gray-400" />
    default:
      return <File className="w-4 h-4 text-gray-400" />
  }
}

export default function DriveClone() {
  const [currentPath, setCurrentPath] = useState("/")
  const [searchQuery, setSearchQuery] = useState("")

  const currentFolder = mockData[currentPath as keyof typeof mockData]

  // Generate breadcrumbs from current path
  const breadcrumbs = currentPath === "/" ? ["My Drive"] : ["My Drive", ...currentPath.split("/").filter(Boolean)]

  const handleFolderClick = (folderName: string) => {
    const newPath = currentPath === "/" ? `/${folderName}` : `${currentPath}/${folderName}`
    if (mockData[newPath as keyof typeof mockData]) {
      setCurrentPath(newPath)
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setCurrentPath("/")
    } else {
      const pathParts = currentPath.split("/").filter(Boolean)
      const newPath = "/" + pathParts.slice(0, index).join("/")
      setCurrentPath(newPath)
    }
  }

  const filteredItems =
    currentFolder?.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) || []

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Drive</h1>

            {/* Search */}
            <div className="relative">
              <Input
                type="search"
                placeholder="Search in Drive"
                className="w-96 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Upload Button */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>

        {/* Breadcrumbs */}
        <div className="px-6 pb-4">
          <nav className="flex items-center space-x-1 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-500" />}
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className={`px-2 py-1 rounded hover:bg-gray-800 transition-colors ${
                    index === breadcrumbs.length - 1 ? "text-white font-medium" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {crumb}
                </button>
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {currentFolder ? (
          <div className="space-y-4">
            {/* Folder/File List */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  {searchQuery ? "No items match your search" : "This folder is empty"}
                </div>
              ) : (
                <div className="divide-y divide-gray-700">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-750 transition-colors group"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {item.type === "folder" ? (
                          <Folder className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        ) : (
                          <div className="flex-shrink-0">{getFileIcon(item.fileType || "file")}</div>
                        )}

                        {item.type === "folder" ? (
                          <button
                            onClick={() => handleFolderClick(item.name)}
                            className="text-left hover:text-blue-400 transition-colors truncate"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <a
                            href={item.url}
                            className="text-left hover:text-blue-400 transition-colors truncate"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.name}
                          </a>
                        )}
                      </div>

                      <div className="flex items-center space-x-8 text-sm text-gray-400">
                        <span className="w-20 text-right">{item.size || "—"}</span>
                        <span className="w-24 text-right">{new Date(item.modified).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">Folder not found</div>
        )}
      </main>
    </div>
  )
}
