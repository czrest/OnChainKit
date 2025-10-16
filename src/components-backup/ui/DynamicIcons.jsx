import * as LucideIcons from "lucide-react";
import * as ReactIcons from "react-icons/fa";

export default function DynamicIcons({ iconName, lucide = true, ...props }) {
  if (lucide) {
    var IconComponent = LucideIcons[iconName];
  } else {
    var IconComponent = ReactIcons[iconName];
  }

  if (!IconComponent) {
    return <span>Invalid icon</span>;
  }

  return (
    <>
      <IconComponent {...props} />
    </>
  );
}
