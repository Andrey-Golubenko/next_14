'use client'

import { useState } from 'react'

import NavLinks from '~/components/navigation/NavLinks'
import MobileNavMenuButton from '~/components/navigation/MobileNavMenuButton'

const MobileNavMenu = ({ isLoggedIn, isMobile }: INavMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="w-full">
      <MobileNavMenuButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <nav
        id="nav-menu"
        className={`fixed inset-y-0 -right-1 z-10 h-screen w-[50%] transform rounded-none ${isOpen ? '-translate-x-1' : 'translate-x-full'} border-l-[5px] border-white shadow-[-2px_0_0_0_#000] transition-transform duration-500 ease-in-out`}
      >
        <ul className=" flex h-screen flex-col items-start space-y-10 bg-[#2C2C32] pl-10 pt-28 text-xl">
          <NavLinks
            isLoggedIn={isLoggedIn}
            isMobile={isMobile}
          />
        </ul>
      </nav>
    </div>
  )
}

export default MobileNavMenu
