import NavLinks from '~/components/navigation/NavLinks'
import LogoItem from '~/components/navigation/LogoItem'

const DesktopNavMenu = ({ isLoggedIn, isMobile }: INavMenuProps) => {
  return (
    <nav className="flex w-full items-center justify-between px-6">
      <LogoItem logoClassNames="mr-14 h-16 w-44" />

      <ul className="flex items-center justify-center space-x-8">
        <NavLinks
          isLoggedIn={isLoggedIn}
          isMobile={isMobile}
        />
      </ul>
    </nav>
  )
}

export default DesktopNavMenu
