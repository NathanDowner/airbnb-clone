import { Menu } from '@headlessui/react';
import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid';

const AuthMenu = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer bg-white text-gray-500  hover:bg-gray-100 hover:shadow-md transition duration-200">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </Menu.Button>
      <Menu.Items
        as="div"
        className="absolute w-52 bg-white right-0 mt-2 rounded-xl my-2 shadow-2xl"
      >
        <Menu.Item as="div" className="menu-item">
          Sign up
        </Menu.Item>
        <Menu.Item as="div" className="menu-item">
          Login
        </Menu.Item>
        <Menu.Item as="div" className="menu-item border-t">
          Host your home
        </Menu.Item>
        <Menu.Item as="div" className="menu-item">
          Host an experience
        </Menu.Item>
        <Menu.Item as="div" className="menu-item">
          Help
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default AuthMenu;
