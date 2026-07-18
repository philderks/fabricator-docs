import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-fd-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-fd-muted-foreground">
        The documentation page you requested does not exist or has moved.
      </p>
      <Link className="text-fd-primary underline underline-offset-4" href="/">
        Return to the documentation
      </Link>
    </main>
  );
}
