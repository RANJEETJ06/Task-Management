import React from 'react';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <div className="p-3 flex justify-center text-3xl gap-3">
      <h1>{title}</h1>
    </div>
  );
};

export default TopBar;
