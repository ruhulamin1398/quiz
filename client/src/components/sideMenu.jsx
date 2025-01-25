
import { useState } from 'react';
import { GiHamburgerMenu, GiQuakeStomp } from 'react-icons/gi';
import { FaQuestionCircle } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";


import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';



function SideMenu() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar
        breakPoint="md"
        toggled={true}
        backgroundColor="#323a49"
        collapsed={collapsed}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0) {
                return {
                  color: disabled ? '#fff' : '#fff',
                  backgroundColor: active ? '#323a49' : '#323a49',
                  '&:hover': {
                    color: '#ffffff', // Hover text color
                    backgroundColor: '#2a303d', // Hover background color
                  },
                };
              }
            },
          }}

        >
          <MenuItem>
            <div className='flex justify-between py-2'>
              {!collapsed && (<div className='flex text-white text-2xl '>
                Admin
              </div>)}
              <div className=" w-full   text-center" onClick={() => setCollapsed(!collapsed)}>

                <GiHamburgerMenu size={25} className='ml-auto' />
              </div>

            </div>

          </MenuItem>



          <SubMenu icon={<FaQuestionCircle />} label="Qestion">
            <MenuItem component={<Link to="/create-question" />} > Add New </MenuItem>
            <MenuItem component={<Link to="/questions" />}>    All Questions   </MenuItem>
          </SubMenu>
          <SubMenu icon={<MdQuiz />} label="Quiz">
            <MenuItem component={<Link to="/create-quiz" />} > Add New</MenuItem>
            <MenuItem component={<Link to="/quiz-types" />} > Quiz Types</MenuItem>
          </SubMenu>

        </Menu>
      </Sidebar>

    </>
  )
}

export default SideMenu

