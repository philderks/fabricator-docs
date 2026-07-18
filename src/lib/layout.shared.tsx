import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="fabricator-brand">
          <Image src="/favicon.svg" alt="" width={28} height={28} unoptimized />
          <span>Fabricator</span>
        </span>
      ),
    },
    githubUrl: 'https://github.com/philderks/Fabricator',
  };
}
