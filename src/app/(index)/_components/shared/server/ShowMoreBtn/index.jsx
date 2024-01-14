import React from 'react';
import cn from '@/lib/clsx/cn';
import Link from 'next/link';

function ShowMoreBtn({ children, className, url }) {
  return (
      <Link href={url}>
          <button className={cn('underline', className)}>{children}</button>
      </Link>
  )
}

export default ShowMoreBtn;