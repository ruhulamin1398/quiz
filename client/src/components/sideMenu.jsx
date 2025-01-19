
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
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

          {/* <MenuItem>
           <Link className="w-full" to="/question">Qestion</Link>
         </MenuItem> */}

          <SubMenu label="Qestion">
            <MenuItem>
              <Link className="w-full" to="/questions">All Questions</Link>

            </MenuItem>
            <MenuItem>
              <Link className="w-full" to="/create-question">new Question</Link>

            </MenuItem>
          </SubMenu>
          <MenuItem>
            <Link className="w-full" to="/quiz-types">Quiz Types</Link>
          </MenuItem>

        </Menu>
      </Sidebar>

    </>
  )
}

export default SideMenu

