import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="h-[200px] w-full bg-gray-700 flex justify-center items-center">
      <Logo />
    </header>
  )
}