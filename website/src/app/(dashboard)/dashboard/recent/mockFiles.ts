const mockFiles: Array<{
  name: string;
  lastAccessed: string;
  type: string;
  fileSize: string;
}> = [
  {
    name: "document1.docx",
    lastAccessed: "2 days ago",
    type: "application/msword",
    fileSize: "2.5 MB",
  },
  {
    name: "image1.jpg",
    lastAccessed: "1 week ago",
    type: "image/jpeg",
    fileSize: "1.2 MB",
  },
  {
    name: "spreadsheet.xlsx",
    lastAccessed: "3 days ago",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSize: "4.8 MB",
  },
  {
    name: "code.js",
    lastAccessed: "2 days ago",
    type: "application/javascript",
    fileSize: "350 KB",
  },
  {
    name: "presentation.pptx",
    lastAccessed: "5 days ago",
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    fileSize: "3.3 MB",
  },
  {
    name: "image2.png",
    lastAccessed: "2 weeks ago",
    type: "image/png",
    fileSize: "900 KB",
  },
  {
    name: "text.txt",
    lastAccessed: "4 days ago",
    type: "text/plain",
    fileSize: "150 KB",
  },
  {
    name: "video.mp4",
    lastAccessed: "1 week ago",
    type: "video/mp4",
    fileSize: "15.7 MB",
  },
  {
    name: "presentation2.pptx",
    lastAccessed: "6 days ago",
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    fileSize: "5.2 MB",
  },
  {
    name: "code2.ts",
    lastAccessed: "3 days ago",
    type: "text/typescript",
    fileSize: "280 KB",
  },
];

export default mockFiles;
