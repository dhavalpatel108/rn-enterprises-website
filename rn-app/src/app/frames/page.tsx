"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Frames() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>, frameName: string) => {
    e.preventDefault();
    if (!session) {
      alert("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    const form = e.currentTarget;
    const height = (form.elements.namedItem("height") as HTMLInputElement).value;
    const width = (form.elements.namedItem("width") as HTMLInputElement).value;
    const qty = parseInt((form.elements.namedItem("qty") as HTMLInputElement).value);

    const payload = {
      category: "Frame",
      type: frameName,
      design: "Standard",
      hardware: "N/A",
      height,
      width,
      quantity: qty
    };

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) alert("Added to cart!");
    else alert("Error adding to cart.");
  };

  const [frames, setFrames] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/config").then(res => res.json()).then(data => {
      if (data.frames) setFrames(data.frames);
    });
  }, []);

  return (
    <main className="w-full min-h-screen py-margin-desktop px-gutter animate-page-entry">
      <div className="max-w-max-width mx-auto">
        <div className="glass-panel rounded-xl p-8 md:p-12 mb-12 border border-outline-variant/10 shadow-lg text-center">
          <h1 className="font-headline-display text-headline-lg-mobile md:text-headline-display text-primary mb-4">Post Forming Door Frames</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Engineered for stability and modern aesthetics. Our post-forming door frames provide seamless edges and high durability, perfect for both residential and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frames.map(f => (
            <div key={f.name} className="glass-panel rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group animate-pop">
              <div className="relative h-64 overflow-hidden border-b border-outline-variant/20">
                <img src={f.img} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={f.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              </div>
              <div className="p-8 flex-grow flex flex-col bg-surface">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full font-label-sm text-label-sm mb-4 w-fit">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                  Ready to Ship
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">{f.name}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{f.desc}</p>
                {f.pdf && (
                  <a href={f.pdf} target="_blank" className="w-fit flex items-center gap-2 text-primary font-label-md text-label-md hover:text-primary/70 transition-colors border-b border-primary pb-1 mb-6 flex-grow">
                    <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                    View Frame Specs
                  </a>
                )}
                {!f.pdf && <div className="mb-6 flex-grow"></div>}
                <form onSubmit={e => handleAddToCart(e, f.name)} className="space-y-6 border-t border-outline-variant/20 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-md text-label-md text-primary mb-2">Height (inches)</label>
                      <input type="number" name="height" className="w-full border border-outline-variant/50 rounded-DEFAULT px-4 py-2 font-body-md text-body-md focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim bg-surface transition-colors" placeholder="84" required />
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-primary mb-2">Width (inches)</label>
                      <input type="number" name="width" className="w-full border border-outline-variant/50 rounded-DEFAULT px-4 py-2 font-body-md text-body-md focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim bg-surface transition-colors" placeholder="36" required />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <label className="font-label-md text-label-md text-primary">Qty:</label>
                      <input type="number" name="qty" className="w-20 border border-outline-variant/50 rounded-DEFAULT px-3 py-2 font-body-md text-body-md focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim bg-surface transition-colors" defaultValue="1" min="1" required />
                    </div>
                    <button type="submit" className="premium-btn px-6 py-3 rounded-DEFAULT font-label-md text-label-md flex items-center gap-2">
                      <span className="material-symbols-outlined">add_shopping_cart</span> Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
          {frames.length === 0 && (
            <div className="col-span-full py-16 text-center glass-panel rounded-xl border border-outline-variant/20 shadow-lg">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">inventory_2</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">No Frames Available</h3>
              <p className="text-secondary font-body-md">The owner has not configured any door frames yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
