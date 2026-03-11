import type React from "react";
import type { UserStatus } from "../../types";
import "./Avatar.css";

interface AvatarProps {
  name: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
  status?: UserStatus;
}

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const colorPalette = [
  "#6c5ce7",
  "#e17055",
  "#00b894",
  "#0984e3",
  "#fdcb6e",
  "#e84393",
  "#00cec9",
  "#a29bfe",
];

const getColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPalette[Math.abs(hash) % colorPalette.length];
};

const Avatar: React.FC<AvatarProps> = ({
  name,
  avatar,
  size = "md",
  status,
}) => {
  return (
    <div className={`avatar avatar--${size}`}>
      {avatar ? (
        <img src={avatar} alt={name} className="avatar__img" />
      ) : (
        <div
          className="avatar__initials"
          style={{ backgroundColor: getColor(name) }}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span className={`avatar__status avatar__status--${status}`} />
      )}
    </div>
  );
};

export default Avatar;
