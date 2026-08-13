"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { upload } from '@vercel/blob/client';

export default function OwnerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [doors, setDoors] = useState<Record<string, {img: string, pdf: string, name?: string, subtitle?: string}>>({
    Laminate: {img: "", pdf: "", name: "Laminate", subtitle: "Durable & Versatile"},
    Lamination: {img: "", pdf: "", name: "Lamination", subtitle: "Scratch Resistant"},
    PVC: {img: "", pdf: "", name: "PVC", subtitle: "Moisture Resistant"},
    FRP: {img: "", pdf: "", name: "FRP", subtitle: "Weather Proof"},
    ACP: {img: "", pdf: "", name: "ACP", subtitle: "Modern Aluminum"},
    Teakwood: {img: "", pdf: "", name: "Teakwood", subtitle: "Premium Heritage"}
  });
  const [doorModels, setDoorModels] = useState<any[]>([]);
  const [designs, setDesigns] = useState("");
  const [hardware, setHardware] = useState<any[]>([]);
  const [frames, setFrames] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session?.user && (session.user as any).role !== "OWNER") {
      router.push("/");
    }

    if (status === "authenticated") {
      fetch("/api/config")
        .then(res => res.json())
        .then(data => {
          if (data.doors) setDoors({...doors, ...data.doors});
          if (data.doorModels) setDoorModels(data.doorModels);
          if (data.designs) setDesigns(data.designs.join("\n"));
          if (data.hardware) setHardware(data.hardware);
          if (data.frames) setFrames(data.frames);
        });
    }
  }, [session, status, router]);

  const handleUpload = async (file: File, fieldId: string) => {
    if (file.size > 500 * 1024 * 1024) {
      alert(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). The maximum allowed size is 500MB.`);
      return null;
    }
    setUploadingField(fieldId);
    try {
      const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const filename = `${Date.now()}_${originalName}`;
      
      const newBlob = await upload(filename, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      
      return newBlob.url;
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file.");
      return null;
    } finally {
      setUploadingField(null);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    const configData = {
      doors,
      doorModels,
      designs: designs.split("\n").map(d => d.trim()).filter(d => d),
      hardware,
      frames
    };

    const res = await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(configData)
    });

    setIsSaving(false);
    if (res.ok) alert("Settings saved successfully!");
    else alert("Failed to save settings.");
  };

  if (status === "loading") return <div className="p-8">Loading...</div>;
  if (!session || (session.user as any).role !== "OWNER") return null;

  return (
    <main className="w-full min-h-screen py-margin-desktop px-gutter bg-surface-container-low/30">
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel rounded-xl p-4 md:p-8 mb-8 border border-outline-variant/10 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 sticky top-4 z-50 bg-surface/90 backdrop-blur-xl">
          <div>
            <h1 className="font-headline-display text-headline-md md:text-headline-lg text-primary mb-1 md:mb-2">Owner Dashboard</h1>
            <p className="hidden md:block font-body-md text-body-md text-on-surface-variant">Manage your catalogue links, designs, frames, and hardware options.</p>
          </div>
          <button onClick={saveSettings} disabled={isSaving || !!uploadingField} className="w-full md:w-auto premium-btn px-4 py-2 md:px-8 md:py-3 rounded-DEFAULT font-label-md text-sm md:text-label-md flex justify-center items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
            <span className="material-symbols-outlined text-sm md:text-base">{isSaving ? 'sync' : 'save'}</span> 
            {isSaving ? 'Saving...' : uploadingField ? 'Uploading...' : 'Save Changes'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-xl border border-outline-variant/20 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">meeting_room</span> Door Categories & Designs
                </h3>
              </div>
              <div className="space-y-12 max-h-[700px] overflow-y-auto pr-2">
                {Object.keys(doors).map(key => (
                  <div key={key} className="border-2 border-outline-variant/40 rounded-xl p-6 bg-surface relative shadow-sm">
                    <h4 className="font-headline-md text-primary mb-6 border-b border-outline-variant/20 pb-4">{key} Door</h4>
                    
                    {/* Category Level Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-xs font-semibold text-secondary mb-2">Display Name</label>
                        <input value={doors[key].name || key} onChange={e => {
                          setDoors({...doors, [key]: { ...doors[key], name: e.target.value }});
                        }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm bg-surface" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-secondary mb-2">Subtitle</label>
                        <input value={doors[key].subtitle || ""} onChange={e => {
                          setDoors({...doors, [key]: { ...doors[key], subtitle: e.target.value }});
                        }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm bg-surface" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-secondary mb-2">Main Category Image (Upload or Link)</label>
                        <div className="flex flex-col gap-2">
                          {doors[key].img && (
                            <div className="flex items-center gap-2">
                              <img src={doors[key].img} alt="Preview" className="w-12 h-12 rounded object-cover border border-outline-variant/30" />
                              <span className="text-xs text-tertiary-fixed-dim font-medium">Current Image</span>
                            </div>
                          )}
                          <div className="flex items-center gap-4">
                            <input type="file" accept="image/*" onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUpload(file, `door_${key}`);
                                if (url) {
                                  setDoors({...doors, [key]: { ...doors[key], img: url }});
                                }
                              }
                            }} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            {uploadingField === `door_${key}` && <span className="text-xs text-secondary animate-pulse">Uploading...</span>}
                          </div>
                          <input 
                            type="text" 
                            placeholder="Or paste an image URL..." 
                            value={doors[key].img || ""} 
                            onChange={(e) => {
                              setDoors({...doors, [key]: { ...doors[key], img: e.target.value }});
                            }}
                            className="text-xs border border-outline-variant/50 rounded px-2 py-1 w-full bg-surface focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-secondary mb-2">Main Category PDF (Optional, Upload or Link)</label>
                        <div className="flex flex-col gap-2">
                          {doors[key].pdf && doors[key].pdf.startsWith("http") && (
                            <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded p-2 w-fit">
                              <span className="material-symbols-outlined text-tertiary-fixed-dim text-lg">check_circle</span>
                              <a href={doors[key].pdf} target="_blank" className="text-xs font-bold text-primary hover:underline truncate max-w-[200px]">View Current PDF</a>
                              <button type="button" onClick={() => setDoors({...doors, [key]: { ...doors[key], pdf: "" }})} className="ml-2 text-xs text-error hover:underline">Remove</button>
                            </div>
                          )}
                          <div className="flex items-center gap-4">
                            <input type="file" accept=".pdf" onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleUpload(file, `door_pdf_${key}`);
                                if (url) {
                                  setDoors({...doors, [key]: { ...doors[key], pdf: url }});
                                }
                              }
                            }} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            {uploadingField === `door_pdf_${key}` && <span className="text-xs text-secondary animate-pulse">Uploading...</span>}
                          </div>
                          <input 
                            type="text" 
                            placeholder="Or paste a PDF link..." 
                            value={doors[key].pdf || ""} 
                            onChange={(e) => {
                              setDoors({...doors, [key]: { ...doors[key], pdf: e.target.value }});
                            }}
                            className="text-xs border border-outline-variant/50 rounded px-2 py-1 w-full bg-surface focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sub Door Designs Section */}
                    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4 border-b border-outline-variant/10 pb-2">
                        <h5 className="font-label-lg text-primary flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">grid_view</span> Sub Door Designs ({doorModels.filter(m => m.category === key).length})
                        </h5>
                        <button onClick={() => setDoorModels([...doorModels, { id: Date.now().toString(), category: key, name: "", img: "", pdf: "" }])} className="text-xs font-label-sm bg-primary/10 text-primary px-3 py-1.5 rounded hover:bg-primary/20 transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">add</span> Add Sub Design
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {doorModels.map((door, idx) => {
                          if (door.category !== key) return null;
                          return (
                            <div key={door.id || idx} className="border border-outline-variant/30 rounded p-4 bg-surface relative shadow-sm">
                              <button onClick={() => setDoorModels(doorModels.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-secondary hover:text-error transition-colors p-1 bg-error-container/20 rounded-full">
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-[11px] font-semibold text-secondary mb-1 uppercase tracking-wider">Design Name</label>
                                  <input value={door.name} placeholder="e.g. Pine Wood" onChange={e => {
                                    const newD = [...doorModels]; newD[idx].name = e.target.value; setDoorModels(newD);
                                  }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm bg-surface focus:ring-1 focus:ring-primary" />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-secondary mb-1 uppercase tracking-wider">Design Image (Upload or Link)</label>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                      {door.img && <img src={door.img} alt="Preview" className="w-8 h-8 rounded object-cover border border-outline-variant/30" />}
                                      <input type="file" accept="image/*" onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const url = await handleUpload(file, `doorModel_${idx}`);
                                          if (url) {
                                            const newD = [...doorModels]; newD[idx].img = url; setDoorModels(newD);
                                          }
                                        }
                                      }} className="text-[10px] w-full file:mr-1 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                                    </div>
                                    <input 
                                      type="text" 
                                      placeholder="Or paste an image URL..." 
                                      value={door.img} 
                                      onChange={(e) => {
                                        const newD = [...doorModels]; newD[idx].img = e.target.value; setDoorModels(newD);
                                      }}
                                      className="text-xs border border-outline-variant/50 rounded px-2 py-1 w-full bg-surface focus:ring-1 focus:ring-primary"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-secondary mb-1 uppercase tracking-wider">Design PDF Spec (Upload or Link)</label>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                      <input type="file" accept=".pdf" onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const url = await handleUpload(file, `doorModel_pdf_${idx}`);
                                          if (url) {
                                            const newD = [...doorModels]; newD[idx].pdf = url; setDoorModels(newD);
                                          }
                                          e.target.value = ''; // Reset input to allow re-uploading same file
                                        }
                                      }} className="text-[10px] w-full file:mr-1 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                                    </div>
                                    <input 
                                      type="text" 
                                      placeholder="Or paste a PDF link..." 
                                      value={door.pdf} 
                                      onChange={(e) => {
                                        const newD = [...doorModels]; newD[idx].pdf = e.target.value; setDoorModels(newD);
                                      }}
                                      className="text-xs border border-outline-variant/50 rounded px-2 py-1 w-full bg-surface focus:ring-1 focus:ring-primary"
                                    />
                                    {uploadingField === `doorModel_pdf_${idx}` && (
                                      <span className="text-xs text-primary animate-pulse">Uploading PDF...</span>
                                    )}
                                    {door.pdf && door.pdf.startsWith("http") && !uploadingField && (
                                      <div className="flex items-center justify-between bg-surface-container-low p-2 rounded border border-outline-variant/30">
                                        <a href={door.pdf} target="_blank" className="text-primary hover:underline text-xs flex items-center gap-1 font-medium">
                                          <span className="material-symbols-outlined text-[14px]">visibility</span> View Current PDF
                                        </a>
                                        <button type="button" onClick={() => { const newD = [...doorModels]; newD[idx].pdf = ""; setDoorModels(newD); }} className="text-error hover:text-error/80 text-[10px] uppercase font-bold tracking-wide px-2 py-1 bg-error/10 rounded">Remove</button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {doorModels.filter(m => m.category === key).length === 0 && (
                          <p className="text-secondary/60 text-sm text-center py-4 italic">No specific sub-designs added for this category yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-outline-variant/20 shadow-lg">
              <h3 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">category</span> Design Patterns
              </h3>
              <textarea 
                rows={5} 
                value={designs} 
                onChange={e => setDesigns(e.target.value)}
                className="w-full border border-outline-variant/50 rounded-DEFAULT px-4 py-3 font-body-md text-body-md bg-surface focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim transition-colors" 
                placeholder="Enter one design per line..."
              />
              <p className="font-label-sm text-label-sm text-secondary mt-2">These act as selectable styles for any door.</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-xl border border-outline-variant/20 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">hardware</span> Hardware Catalogue
                </h3>
                <button onClick={() => setHardware([...hardware, { id: Date.now(), name: "", price: 0, desc: "", img: "" }])} className="text-sm font-label-sm bg-surface-container-highest px-3 py-1 rounded hover:bg-outline-variant/30 transition-colors">
                  + Add Item
                </button>
              </div>
              
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {hardware.map((hw, idx) => (
                  <div key={hw.id || idx} className="border border-outline-variant/30 rounded-lg p-4 bg-surface relative">
                    <button onClick={() => setHardware(hardware.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-secondary hover:text-error">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-secondary mb-1">Hardware Name</label>
                        <input value={hw.name} onChange={e => {
                          const newHw = [...hardware]; newHw[idx].name = e.target.value; setHardware(newHw);
                        }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm bg-surface" />
                      </div>
                      <div>
                        <label className="block text-xs text-secondary mb-1">Description</label>
                        <input value={hw.desc} onChange={e => {
                          const newHw = [...hardware]; newHw[idx].desc = e.target.value; setHardware(newHw);
                        }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm bg-surface" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-2">Product Image (Upload or Link)</label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          {hw.img && <img src={hw.img} alt="Preview" className="w-12 h-12 rounded object-cover border border-outline-variant/30" />}
                          <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleUpload(file, `hw_${idx}`);
                              if (url) {
                                const newHw = [...hardware]; newHw[idx].img = url; setHardware(newHw);
                              }
                            }
                          }} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                          {uploadingField === `hw_${idx}` && <span className="text-xs text-secondary animate-pulse">Uploading...</span>}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Or paste an image URL..." 
                          value={hw.img} 
                          onChange={e => {
                            const newHw = [...hardware]; newHw[idx].img = e.target.value; setHardware(newHw);
                          }}
                          className="text-xs border border-outline-variant/50 rounded px-2 py-1 w-full bg-surface focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {hardware.length === 0 && <p className="text-secondary text-sm text-center py-4">No hardware added.</p>}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-outline-variant/20 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim">sensor_window</span> Door Frames
                </h3>
                <button onClick={() => setFrames([...frames, { id: Date.now(), name: "", desc: "", img: "", pdf: "" }])} className="text-sm font-label-sm bg-surface-container-highest px-3 py-1 rounded hover:bg-outline-variant/30 transition-colors">
                  + Add Frame
                </button>
              </div>
              
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {frames.map((frame, idx) => (
                  <div key={frame.id || idx} className="border border-outline-variant/30 rounded-lg p-4 bg-surface relative">
                    <button onClick={() => setFrames(frames.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-secondary hover:text-error">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                    <div className="space-y-4 mb-4">
                      <div>
                        <label className="block text-xs text-secondary mb-1">Frame Name</label>
                        <input value={frame.name} onChange={e => {
                          const newFrames = [...frames]; newFrames[idx].name = e.target.value; setFrames(newFrames);
                        }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm bg-surface" />
                      </div>
                      <div>
                        <label className="block text-xs text-secondary mb-1">Description</label>
                        <textarea rows={2} value={frame.desc} onChange={e => {
                          const newFrames = [...frames]; newFrames[idx].desc = e.target.value; setFrames(newFrames);
                        }} className="w-full border border-outline-variant/50 rounded px-3 py-2 text-sm bg-surface" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-secondary mb-2">Frame Image (Upload or Link)</label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          {frame.img && <img src={frame.img} alt="Preview" className="w-12 h-12 rounded object-cover border border-outline-variant/30" />}
                          <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleUpload(file, `frame_${idx}`);
                              if (url) {
                                const newFrames = [...frames]; newFrames[idx].img = url; setFrames(newFrames);
                              }
                            }
                          }} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                          {uploadingField === `frame_${idx}` && <span className="text-xs text-secondary animate-pulse">Uploading...</span>}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Or paste an image URL..." 
                          value={frame.img} 
                          onChange={e => {
                            const newFrames = [...frames]; newFrames[idx].img = e.target.value; setFrames(newFrames);
                          }}
                          className="text-xs border border-outline-variant/50 rounded px-2 py-1 w-full bg-surface focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-xs text-secondary mb-2">Frame PDF Catalogue (Upload or Link)</label>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                          <input type="file" accept=".pdf" onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleUpload(file, `frame_pdf_${idx}`);
                              if (url) {
                                const newFrames = [...frames]; newFrames[idx].pdf = url; setFrames(newFrames);
                              }
                            }
                          }} className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                          {uploadingField === `frame_pdf_${idx}` && <span className="text-xs text-secondary animate-pulse">Uploading...</span>}
                          {frame.pdf && frame.pdf.startsWith("http") && !uploadingField && (
                            <a href={frame.pdf} target="_blank" className="text-xs text-tertiary-fixed-dim hover:underline truncate max-w-[150px]">View Uploaded PDF</a>
                          )}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Or paste a PDF link..." 
                          value={frame.pdf || ""} 
                          onChange={e => {
                            const newFrames = [...frames]; newFrames[idx].pdf = e.target.value; setFrames(newFrames);
                          }}
                          className="text-xs border border-outline-variant/50 rounded px-2 py-1 w-full bg-surface focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {frames.length === 0 && <p className="text-secondary text-sm text-center py-4">No frames added.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
