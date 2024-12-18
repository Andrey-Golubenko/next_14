import LogoImage from '~/public/images/logo.svg'

interface SidebarLogoContainerProps {
  sizes: string
}

const SidebarLogoContainer = ({ sizes }: SidebarLogoContainerProps) => {
  return (
    <>
      <div
        className={`size-${sizes} flex aspect-square items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground`}
      >
        <LogoImage
          className="size-6"
          fill="hsl(var(--logo-color))"
        />
      </div>
      <div className="flex items-center text-left text-base leading-tight">
        <span className="truncate font-semibold">Ideas space</span>
      </div>
    </>
  )
}

export default SidebarLogoContainer
