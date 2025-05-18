import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold">Faculty Attendance Portal</h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Login
        </Link>

        <Link
          href="/dashboard"
          className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground shadow-sm hover:bg-secondary/90"
        >
          Dashboard Preview
        </Link>
      </div>
    </div>
  );
}
