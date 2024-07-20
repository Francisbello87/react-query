import Link from 'next/link'
import React from 'react'

export const Nav = () => {
  return (
    <div className="w-full h-[80px] bg-new-secondary px-8 text flex items-center justify-between">
      <div />
      <ul className='flex items-center gap-8'>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/infinite"}>Infinite Scroll</Link>
        </li>
        <li>
          <Link href={"/loadmore"}>Infinite with Load More</Link>
        </li>
      </ul>
    </div>
  );
}
