import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RevealWord({
  text,
  className,
  accent,
}: {
  text: string;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      data-reveal-word
      className={cn('inline-block clip-reveal', accent ? 'text-chai-DEFAULT' : '', className)}
    >
      {text}
    </span>
  );
}

export function RevealLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span data-reveal className={cn('block overflow-hidden', className)}>
      {children}
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-widest-2 font-medium',
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

export function EditorialRule({ className }: { className?: string }) {
  return <div className={cn('h-px w-12 bg-chai-DEFAULT', className)} />;
}
