"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Hardware() {
  const { data: session } = useSession();
  const router = useRouter();
  const [hardware, setHardware] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/config").then(res => res.json()).then(data => {
      if (data.hardware) setHardware(data.hardware);
    });
  }, []);

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>, name: string, price: number) => {
    e.preventDefault();
    if (!session) {
      alert("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    const form = e.currentTarget;
    const qty = parseInt((form.elements.namedItem("qty") as HTMLInputElement).value);

    const payload = {
      category: "Hardware",
      type: name,
      price,
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

  return (
    <main className="w-full min-h-screen py-margin-desktop px-gutter animate-page-entry">
      <div className="max-w-max-width mx-auto">
        {/* Hero Section */}
        <div className="glass-panel rounded-xl p-8 md:p-12 mb-12 border border-outline-variant/10 shadow-lg">
          <h1 className="font-headline-display text-headline-lg-mobile md:text-headline-display text-primary mb-4">Hardware Catalogue</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-8">
            Complete your architectural projects with our premium hardware selection. Tactile, industrial details designed to enhance both form and function.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {hardware.map(h => (
            <div key={h.name} className="glass-panel rounded-xl border border-outline-variant/20 shadow-xl overflow-hidden flex flex-col group">
              <div className="relative h-48 overflow-hidden border-b border-outline-variant/20 bg-surface-container-low">
                {h.img ? (
                  <img src={h.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={h.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[64px] text-secondary/30">hardware</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col bg-surface">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">{h.name}</h3>
                {h.desc && <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">{h.desc}</p>}
                
                <div className="mt-auto">

                  <form onSubmit={e => handleAddToCart(e, h.name, h.price)} className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <label className="font-label-md text-label-md text-primary">Qty:</label>
                      <input type="number" name="qty" className="w-16 border border-outline-variant/50 rounded-DEFAULT px-2 py-2 font-body-md text-body-md focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim bg-surface transition-colors" defaultValue="1" min="1" required />
                    </div>
                    <button type="submit" className="flex-grow premium-btn px-4 py-2 rounded-DEFAULT font-label-md text-label-md flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span> Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
          {hardware.length === 0 && (
            <div className="col-span-full py-16 text-center glass-panel rounded-xl border border-outline-variant/20 shadow-lg">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">inventory_2</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-2">No Hardware Available</h3>
              <p className="text-secondary font-body-md">The owner has not configured any hardware items yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
