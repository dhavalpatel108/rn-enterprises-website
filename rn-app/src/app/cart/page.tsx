"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({});
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const fetchCart = () => {
    fetch("/api/cart").then(res => res.json()).then(data => {
      if(Array.isArray(data)) setCart(data);
    });
    fetch("/api/config").then(res => res.json()).then(setConfig);
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchCart();
  }, [status, router]);

  const removeItem = async (id: string) => {
    await fetch(`/api/cart/${id}`, { method: "DELETE" });
    fetchCart();
  };

  const shareToWhatsApp = () => {
    if(cart.length === 0) return;
    if(!userName.trim() || !userAddress.trim()) {
      alert("Please enter your name and delivery address.");
      return;
    }

    let message = `*Order Inquiry - R.N. Enterprises*\n\n`;
    message += `*Customer Details:*\nName: ${userName}\nAddress: ${userAddress}\n\n`;
    message += `*Order Details:*\n`;
    cart.forEach((item, index) => {
        message += `*${index + 1}. ${item.category}: ${item.type}*\n`;
        message += `Qty: ${item.quantity}\n`;
        if (item.category === 'Door' || item.category === 'Frame') {
            if (item.height && item.width) message += `Size: ${item.height} inches x ${item.width} inches\n`;
            if (item.design) message += `Design: ${item.design}\n`;
            if (item.hardware) message += `Hardware: ${item.hardware}\n`;
        }
        message += "\n";
    });
    message += "Please provide a quotation for the above items.";

    const url = `https://wa.me/917972467700?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (status === "loading") return <div className="p-8">Loading...</div>;

  return (
    <main className="w-full min-h-screen py-margin-desktop px-gutter">
      <div className="max-w-3xl mx-auto">
        <div className="glass-panel rounded-xl p-8 mb-8 border border-outline-variant/10 shadow-lg">
          <h1 className="font-headline-display text-headline-lg-mobile md:text-headline-lg text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl">shopping_cart</span> Your Cart
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Review your items before sending to us for a quotation.</p>
        </div>

        <div className="space-y-6 mb-8">
          {cart.length === 0 ? (
            <div className="glass-panel rounded-xl text-center py-16 border border-outline-variant/20 shadow-md">
              <span className="material-symbols-outlined text-6xl text-secondary mb-4">remove_shopping_cart</span>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Your cart is empty</h2>
              <Link href="/doors" className="inline-block mt-2 bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-DEFAULT hover:bg-primary/90 transition-colors shadow">Browse Catalogue</Link>
            </div>
          ) : (
            cart.map((item, idx) => {
              let itemImg = "";
              if (item.category === "Door") {
                const matchedModel = config.doorModels?.find((m: any) => m.category.toLowerCase() === item.type.toLowerCase() && m.name === item.design);
                if (matchedModel && matchedModel.img) {
                  itemImg = matchedModel.img;
                } else if (config.doors?.[item.type]) {
                  itemImg = config.doors[item.type].img;
                }
              } else if (item.category === "Frame" && config.frames) {
                const matched = config.frames.find((f: any) => f.name === item.type);
                if (matched) itemImg = matched.img;
              } else if (item.category === "Hardware" && config.hardware) {
                const matched = config.hardware.find((h: any) => h.name === item.type);
                if (matched) itemImg = matched.img;
              }

              return (
              <div key={item.id} className="glass-panel border border-outline-variant/20 rounded-xl p-6 relative shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center">
                <button onClick={() => removeItem(item.id)} className="absolute top-6 right-6 text-error hover:text-error/80 transition-colors p-1 bg-error-container/50 rounded-full" title="Remove Item">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                
                {itemImg ? (
                  <img src={itemImg} alt={item.type} className="w-full md:w-32 h-32 object-cover rounded-lg border border-outline-variant/30 flex-shrink-0" />
                ) : (
                  <div className="w-full md:w-32 h-32 bg-surface-container-low rounded-lg border border-outline-variant/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-4xl text-secondary/30">
                      {item.category === 'Door' ? 'meeting_room' : item.category === 'Hardware' ? 'hardware' : 'sensor_window'}
                    </span>
                  </div>
                )}

                <div className="pr-12 flex-grow w-full">
                  <h4 className="font-headline-md text-headline-md text-primary mb-2">{item.category}: {item.type}</h4>
                  <div className="space-y-1 mb-4">
                    {item.category === "Hardware" ? null : (
                      <>
                        {item.height && item.width && <p className="font-label-sm text-label-sm text-on-surface-variant">Size: {item.height} inches x {item.width} inches</p>}
                        {item.design && item.design !== "N/A" && <p className="font-label-sm text-label-sm text-on-surface-variant">Design: {item.design}</p>}
                        {item.hardware && item.hardware !== "N/A" && <p className="font-label-sm text-label-sm text-on-surface-variant">Hardware: {item.hardware}</p>}
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4 mt-2">
                    <span className="font-label-md text-label-md text-primary">Qty: {item.quantity}</span>
                    <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Req. Quotation</span>
                  </div>
                </div>
              </div>
            )})
          )}
        </div>

        {cart.length > 0 && (
          <div className="glass-panel p-8 rounded-xl border border-outline-variant/20 shadow-lg mt-8">
            <h3 className="font-headline-md text-headline-md mb-4 text-primary">Order Summary & Checkout</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-label-md text-label-md text-primary mb-2">Full Name *</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={e => setUserName(e.target.value)} 
                  className="w-full border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary bg-surface transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-primary mb-2">Delivery Address *</label>
                <textarea 
                  value={userAddress} 
                  onChange={e => setUserAddress(e.target.value)} 
                  className="w-full border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary bg-surface transition-colors min-h-[100px]"
                  placeholder="Enter complete delivery address"
                  required
                ></textarea>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">Submit your configuration to our team via WhatsApp for a final structural review and quotation.</p>
            <button onClick={shareToWhatsApp} className="w-full bg-[#25D366] text-white px-6 py-4 rounded-DEFAULT font-label-md text-label-md hover:bg-[#128C7E] transition-colors shadow-md flex items-center justify-center gap-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
              Share to WhatsApp for Quotation
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
