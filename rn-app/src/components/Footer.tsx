import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-fixed full-width bottom mt-auto py-12 px-gutter max-w-max-width mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      <div>
        <div className="mb-4 h-12 flex items-start">
          <img 
            alt="R.N. Enterprises Logo" 
            className="h-full w-auto object-cover rounded-md shadow-sm border border-white/20" 
            src="/logo.jpeg" 
          />
        </div>
        <p className="font-body-md text-body-md text-on-primary/80">© 2024 R.N. Enterprises. Architectural Integrity in Every Grain.</p>
      </div>
      <div className="col-span-2 flex flex-wrap gap-x-8 gap-y-4 md:justify-end items-start font-body-md text-body-md font-label-sm text-label-sm">
        <Link href="/doors" className="text-on-primary/80 hover:text-on-primary transition-colors hover:underline decoration-tertiary-fixed underline-offset-4 focus:ring-2 focus:ring-tertiary-fixed rounded outline-none p-1">Laminate Doors</Link>
        <Link href="/doors" className="text-on-primary/80 hover:text-on-primary transition-colors hover:underline decoration-tertiary-fixed underline-offset-4 focus:ring-2 focus:ring-tertiary-fixed rounded outline-none p-1">PVC Solutions</Link>
        <Link href="/doors" className="text-on-primary/80 hover:text-on-primary transition-colors hover:underline decoration-tertiary-fixed underline-offset-4 focus:ring-2 focus:ring-tertiary-fixed rounded outline-none p-1">Teakwood Collection</Link>
        <Link href="/hardware" className="text-on-primary/80 hover:text-on-primary transition-colors hover:underline decoration-tertiary-fixed underline-offset-4 focus:ring-2 focus:ring-tertiary-fixed rounded outline-none p-1">Hardware Catalogue</Link>
        <Link href="#" className="text-on-primary/80 hover:text-on-primary transition-colors hover:underline decoration-tertiary-fixed underline-offset-4 focus:ring-2 focus:ring-tertiary-fixed rounded outline-none p-1">Privacy Policy</Link>
        <Link href="#" className="text-on-primary/80 hover:text-on-primary transition-colors hover:underline decoration-tertiary-fixed underline-offset-4 focus:ring-2 focus:ring-tertiary-fixed rounded outline-none p-1">Contact Us</Link>
      </div>
    </footer>
  );
}
