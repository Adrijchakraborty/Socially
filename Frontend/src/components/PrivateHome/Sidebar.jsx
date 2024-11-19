import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sidebarList } from './sidebar';
import { Link, useNavigate } from 'react-router-dom';
import CreatePost from './Sidebar/CreatePost';

const Sidebar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [selected, setSelected] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userInformation } = useSelector(state => state.user);

  const navigate = useNavigate();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    const resizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  const handleClick = (index, path) => {
    setSelected(index);
    if (path) {
      navigate(path);
    }
    if (index === 1) {
      openDialog();
    }
  };

  return (
    <div className="fixed sidebar w-full md:h-screen bottom-0 md:relative md:min-w-[15vw] lg:min-w-[20vw] xl:min-w-[290px]">
      {width > 768 && (
        <div className="font-itim-regular sm:text-base md:text-4xl py-3 md:mx-3 md:px-2 cursor-pointer">
          Socially
        </div>
      )}
      <ul className="flex justify-around md:flex-col gap-3 md:mt-8">
        {sidebarList.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(index, item.path)}
            className={`icon-parent transition text-2xl py-3 md:hover:bg-gray-200 cursor-pointer md:mx-3 md:px-2 flex items-center gap-2 rounded-md ${selected === index ? 'font-bold' : ''} ${index === 2 && 'hidden md:flex'}`}
          >
            <span className="icons">
              { selected === index ? <item.altIcon /> : <item.icon />}
            </span>
            <p className="text-base hidden lg:block">{item.title}</p>
          </li>
        ))}
        <Link to={`/profile/${userInformation.username}`}>
          <li className="flex gap-2 items-center cursor-pointer py-3 hover:bg-gray-200 transition rounded-md md:mx-3 md:px-2">
            <div
              style={{
                backgroundImage: `url(${userInformation.profile})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="w-8 h-8 rounded-full"
            ></div>
            <p className="text-base hidden lg:block">Profile</p>
          </li>
        </Link>
      </ul>

      {/* Render DialogComponent when selected is 1 */}
      {selected === 1 && <CreatePost isOpen={isDialogOpen} onClose={closeDialog} />}
    </div>
  );
};

export default Sidebar;
