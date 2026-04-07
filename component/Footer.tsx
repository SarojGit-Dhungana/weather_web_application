import React from "react";
import HelpIcon from "@mui/icons-material/Help";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
const footerItem = [
  {
    itemName: "Support",
    icon: <SupportAgentIcon fontSize="small" />,
  },
  {
    itemName: "Help",
    icon: <HelpIcon fontSize="small" />,
  },
];
export default function Footer() {
  return (
    <div className="border-t border-gray-200 p-4 text-sm flex gap-4 justify-center w-full">
      <span className="font-semibold text-gray-50">Weather-App © 2026</span>
      <ul className="flex gap-4">
        {footerItem.map((item) => (
          <li key={item.itemName} className="font-semibold text-gray-50">
            <span>{item.icon}</span>
            <span className="pl-2 text-md">{item.itemName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
