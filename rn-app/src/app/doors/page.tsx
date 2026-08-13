"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Doors() {
  const { data: session } = useSession();
  const router = useRouter();

  const [config, setConfig] = useState<any>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [design, setDesign] = useState("");
  const [hardware, setHardware] = useState("");
  const [dimensions, setDimensions] = useState([{ id: Date.now(), height: "", width: "", qty: 1 }]);
  
  const configRef = useRef<HTMLDivElement>(null);
  const lastClickTime = useRef<Record<string, number>>({});

  useEffect(() => {
    if (activeCategory && configRef.current) {
      setTimeout(() => {
        configRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetch("/api/config").then(res => res.json()).then(setConfig);
  }, []);

  const baseCategories = [
    { id: "Laminate", fallbackName: "Laminate", fallbackSubtitle: "Durable & Versatile", fallbackImg: "/laminate_door.jpg" },
    { id: "Lamination", fallbackName: "Lamination", fallbackSubtitle: "Scratch Resistant", fallbackImg: "/lamination_door_new.jpg" },
    { id: "PVC", fallbackName: "PVC", fallbackSubtitle: "Moisture Resistant", fallbackImg: "/pvc_door.jpg" },
    { id: "FRP", fallbackName: "FRP", fallbackSubtitle: "Weather Proof", fallbackImg: "/frp_door.jpg" },
    { id: "ACP", fallbackName: "ACP", fallbackSubtitle: "Modern Aluminum", fallbackImg: "/acp_door.jpg" },
    { id: "Teakwood", fallbackName: "Teakwood", fallbackSubtitle: "Premium Heritage", fallbackImg: "/teakwood_door.jpg" }
  ];

  const categories = baseCategories.map(base => {
    const custom = config.doors?.[base.id] || {};
    return {
      id: base.id,
      name: custom.name || base.fallbackName,
      subtitle: custom.subtitle || base.fallbackSubtitle,
      img: custom.img || base.fallbackImg
    };
  });

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    if (activeDoorModels.length > 0 && !design) {
      alert("Please select a specific item/design before adding to cart.");
      return;
    }

    try {
      const requests = dimensions.map(dim => {
        const payload = {
          category: "Door",
          type: activeCategory,
          design: design || (config.designs && config.designs[0]) || "Standard",
          hardware: hardware || "N/A",
          height: dim.height,
          width: dim.width,
          quantity: dim.qty
        };
        
        return fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      });

      await Promise.all(requests);
      alert("All items added to cart!");
      // Reset dimensions
      setDimensions([{ id: Date.now(), height: "", width: "", qty: 1 }]);
    } catch (error) {
      alert("Error adding items to cart.");
    }
  };

  const activeDoorObj = config.doors?.[activeCategory || ""] || {};
  const activeDoorModels = config.doorModels?.filter((m: any) => m.category.toLowerCase() === activeCategory?.toLowerCase()) || [];
  
  useEffect(() => {
    if (activeCategory && activeDoorModels.length > 0 && (!design || !activeDoorModels.find((m:any) => m.name === design))) {
      // We removed the auto-selection so it doesn't default to the first item
      setDesign("");
    }
  }, [activeCategory, activeDoorModels]);

  const activeModelObj = activeDoorModels.find((m: any) => m.name === design);
  const pdfLink = activeModelObj?.pdf || activeDoorObj?.pdf;

  return (
    <main className="w-full min-h-screen py-margin-desktop px-gutter animate-page-entry">
      <div className="max-w-max-width mx-auto">
        {/* View when no category is selected */}
        {!activeCategory ? (
          <>
            {/* Hero Section */}
            <div className="glass-panel rounded-xl p-8 md:p-12 mb-12 border border-outline-variant/10 shadow-lg">
              <h1 className="font-headline-display text-headline-lg-mobile md:text-headline-display text-primary mb-4">Architectural Doors</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-8">
                Discover our collection of premium, precision-engineered doors. From the tactile warmth of Teakwood to the utilitarian durability of PVC, every piece is designed with architectural integrity in mind. Select a material below to begin configuring your order.
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
              {categories.map((c: any) => (
                <button key={c.id} onClick={() => { setActiveCategory(c.id); setDesign(""); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="group relative overflow-hidden rounded-xl border aspect-video md:aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-primary text-left transition-all border-outline-variant/20 hover:border-primary/50">
                  <img src={c.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={c.name}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="font-headline-md text-headline-md text-on-primary mb-1">{c.name}</h3>
                    <p className="font-label-sm text-label-sm text-on-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{c.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div ref={configRef} key={activeCategory} className="animate-page-entry">
            <button onClick={() => setActiveCategory(null)} className="mb-6 flex items-center gap-2 text-primary font-label-md hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Back to All Doors
            </button>
            <div className="glass-panel rounded-xl border border-outline-variant/20 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Details & Preview */}
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-outline-variant/20 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full font-label-sm text-label-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                    In Stock
                  </div>
                  <h2 className="font-headline-display text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
                    {activeCategory} Series {activeModelObj?.name ? `- ${activeModelObj.name}` : ''}
                  </h2>
                  
                  {(activeModelObj?.img || activeDoorObj?.img) && (
                    <img 
                      src={activeModelObj?.img || activeDoorObj?.img} 
                      alt={activeModelObj?.name || activeCategory} 
                      className="w-full h-64 md:h-80 object-cover rounded-xl mb-6 shadow-md border border-outline-variant/20" 
                    />
                  )}

                  <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                    Premium doors offering exceptional durability and a wide array of finish options. Engineered for high-traffic areas, maintaining architectural integrity without compromising on modern aesthetics.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider">Key Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Scratch Resistant
                      </li>
                      <li className="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Uniform Texture
                      </li>
                      <li className="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span> Easy Maintenance
                      </li>
                    </ul>
                  </div>
                </div>
                
                {pdfLink && (
                  <a href={pdfLink} target="_blank" className="w-fit flex items-center gap-2 text-primary font-label-md text-label-md hover:text-primary/70 transition-colors border-b border-primary pb-1 mt-6">
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                    View Model Specs
                  </a>
                )}
              </div>
              
              {/* Right: Form */}
              <div className="p-8 md:p-12 bg-surface">
                <h3 className="font-headline-md text-headline-md text-primary mb-6">Configure Order</h3>
                <form onSubmit={handleAddToCart} className="space-y-6">
                  {/* Item Selection */}
                  <div>
                    <label className="block font-label-md text-label-md text-primary mb-3">Select Specific Item / Design</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {activeDoorModels.length > 0 ? activeDoorModels.map((m: any) => (
                        <div key={m.name} className="relative group">
                          <button 
                            type="button"
                            onClick={(e) => {
                              setDesign(prev => prev === m.name ? "" : m.name);
                            }}
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              const mediaUrl = m.pdf || activeDoorObj?.pdf || m.img || activeDoorObj?.img;
                              if (mediaUrl) {
                                window.open(mediaUrl, '_blank');
                              } else {
                                alert("No PDF or image available for this design.");
                              }
                            }}
                            className={`w-full text-left border rounded-lg overflow-hidden text-center bg-surface hover:shadow-md transition-all focus:outline-none touch-manipulation ${design === m.name ? 'border-primary ring-1 ring-primary' : 'border-outline-variant/30'}`}
                            title="Single tap to select/unselect. Double tap to view PDF/Image."
                          >
                            {m.img ? (
                              <img src={m.img} alt={m.name} className="w-full h-24 object-cover pointer-events-none" />
                            ) : (
                              <div className="w-full h-24 bg-surface-container-low flex items-center justify-center pointer-events-none">
                                <span className="material-symbols-outlined text-secondary/40 text-3xl">meeting_room</span>
                              </div>
                            )}
                            <div className="p-3 pointer-events-none">
                              <span className="block font-label-sm text-label-sm text-primary truncate" title={m.name}>{m.name}</span>
                            </div>
                            {design === m.name && (
                              <div className="absolute top-2 right-2 bg-primary text-on-primary rounded-full p-0.5 shadow pointer-events-none">
                                <span className="material-symbols-outlined text-[12px]">check</span>
                              </div>
                            )}
                          </button>
                        </div>
                      )) : (
                        <div className="col-span-full p-4 rounded-lg bg-surface-container-low/50 border border-outline-variant/20 text-center">
                          <p className="text-secondary text-sm">No specific items added for this sub-type yet.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hardware Selection */}
                  <div>
                    <label className="block font-label-md text-label-md text-primary mb-3">Hardware Add-on</label>
                    <select value={hardware} onChange={e => setHardware(e.target.value)} className="w-full border border-outline-variant/50 rounded px-4 py-3 font-body-md text-body-md focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim bg-surface transition-colors">
                      <option value="">No extra hardware</option>
                      {config.hardware?.map((h: any) => <option key={h.name} value={h.name}>{h.name} - ₹{h.price}</option>)}
                    </select>
                  </div>

                  {/* Dimensions Map */}
                  <div className="space-y-4">
                    {dimensions.map((dim, idx) => (
                      <div key={dim.id} className="p-4 border border-outline-variant/30 rounded-lg bg-surface-container-low/50 relative">
                        {dimensions.length > 1 && (
                          <button type="button" onClick={() => setDimensions(dimensions.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-secondary hover:text-error transition-colors">
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-label-sm text-label-sm text-primary mb-1">Height (in)</label>
                            <input required type="number" value={dim.height} onChange={e => {
                              const newDims = [...dimensions];
                              newDims[idx].height = e.target.value;
                              setDimensions(newDims);
                            }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary bg-surface transition-colors" placeholder="84"/>
                          </div>
                          <div>
                            <label className="block font-label-sm text-label-sm text-primary mb-1">Width (in)</label>
                            <input required type="number" value={dim.width} onChange={e => {
                              const newDims = [...dimensions];
                              newDims[idx].width = e.target.value;
                              setDimensions(newDims);
                            }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary bg-surface transition-colors" placeholder="36"/>
                          </div>
                          <div>
                            <label className="block font-label-sm text-label-sm text-primary mb-1">Qty</label>
                            <input required type="number" min="1" value={dim.qty} onChange={e => {
                              const newDims = [...dimensions];
                              newDims[idx].qty = parseInt(e.target.value) || 1;
                              setDimensions(newDims);
                            }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary bg-surface transition-colors"/>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button type="button" onClick={() => setDimensions([...dimensions, { id: Date.now(), height: "", width: "", qty: 1 }])} className="text-primary font-label-md text-label-md flex items-center gap-1 hover:opacity-80">
                    <span className="material-symbols-outlined text-sm">add</span> Add Another Size
                  </button>

                  {/* Submit Action */}
                  <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-end">
                    <button type="submit" className="premium-btn px-8 py-3 rounded-DEFAULT font-label-md text-label-md flex items-center gap-2">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                      Add to Cart
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </main>
  );
}
