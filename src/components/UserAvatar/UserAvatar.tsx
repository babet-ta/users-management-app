import React from 'react';

interface UserAvatarProps {
  name: string;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 40 }) => {
  const getFirstLetter = () => name.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: getRandomColor(name),
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: `${size / 2}px`
      }}
    >
      {getFirstLetter()}
    </div>
  );
};

const getRandomColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

export default UserAvatar;