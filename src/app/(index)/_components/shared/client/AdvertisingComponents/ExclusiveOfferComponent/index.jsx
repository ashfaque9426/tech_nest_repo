import React from 'react';
import Link from 'next/link';
import cn from '@/lib/clsx/cn';

function ExclusiveOfferComponent({className}) {
  return (
    <section className={cn(className)}>
        <Link href='#'>
        </Link>
    </section>
  )
}

export default ExclusiveOfferComponent;