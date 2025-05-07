import Link from "next/link"
import Image from "next/image"
import { auth, signOut, signIn } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async() => {

  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
        <nav className="flex justify-between items-center">
            <Link href="/">
                <Image src="/logo.png" alt="Logo" width={144} height={30} className="h-10 w-auto" />
            </Link>
            <div className="flex items-center gap-5 text-black">

              {session && session.user ? (
                <>
                  <Link href="/startup/create">
                  <span className="max-sm:hidden">Create </span>
                  <BadgePlus className="sm:hidden size-6 text-primary"/>
                  </Link>

                  <form action={async() => {
                    "use server"
                    await signOut({redirectTo:"/"})
                    }}>
                    <button type="submit" >
                    <span className="max-sm:hidden">Log out </span>
                      <LogOut className="sm:hidden size-6 text-red-500"/>
                    </button>
                  </form>

                  <Link href={'/user/${session?.id'}>
                  <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                  </Link>
                </>
              ):(
                <form action={async() =>{ 
                  "use server"
                  await signIn('github')}}>
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300">
                    Sign In
                  </button>
                </form>
              )}

            </div>
        </nav>
    </header>
  )
}

export default Navbar