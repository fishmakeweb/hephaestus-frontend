import Link from "next/link"

import { Button } from "@/components/ui/button"

export function ButtonAsChild() {
  return (
    <Button asChild className="inline-flex items-center relative px-4 border rounded-full hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500">
      <Link href="/login">Đăng nhập</Link>
    </Button>
  )
}
