type Device = {
  name: string;
  lastSync: string; // You can use a date string like "2 days ago" here
  filesCount: number;
  totalStorage: string; // You can use a string like "32 GB" here
};

const mockDevices: Device[] = [
  {
    name: "Phone",
    lastSync: "1 day ago",
    filesCount: 235,
    totalStorage: "64 GB",
  },
  {
    name: "Tablet",
    lastSync: "3 days ago",
    filesCount: 123,
    totalStorage: "128 GB",
  },
  {
    name: "Laptop",
    lastSync: "5 days ago",
    filesCount: 567,
    totalStorage: "512 GB",
  },
  {
    name: "Desktop",
    lastSync: "2 weeks ago",
    filesCount: 789,
    totalStorage: "1 TB",
  },
];
export default mockDevices
