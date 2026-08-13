"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    const waMessage = `*New Website Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
    const url = `https://wa.me/917972467700?text=${encodeURIComponent(waMessage)}`;
    window.open(url, '_blank');
  };
  return (
    <main className="flex-grow animate-page-entry">
      {/* Hero Section */}
      <section className="relative w-full h-[716px] flex items-center justify-center bg-surface-container overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 animate-[ken-burns_30s_ease-in-out_infinite]" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeirrCCqeUMH4Q3paPJMxJ3zMuDKRPZ6VONH6yyd1Y_nl9M64ogmVSIjFpI4tbDdmf7lw_pseQw8I-vESpnKmqDdisLwLpMN5poRMy-Ku5pJ9oPb5F9w2ybUco3aM-xliaIiwf0Ss_ASFmPLNNg4cVm-o5eAoq0SrfDSsvmm2f0vI-44AFgq8_tdt4NfwlvNUw4x0P8Uk1_pILkKyFa7MoiV1izNYArEY-43am0Ivr7qfXco8I8C7w5A')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/30"></div>
        <div className="relative z-10 text-center px-gutter max-w-4xl mx-auto">
          <h1 className="font-headline-display text-5xl md:text-headline-display text-primary drop-shadow-md mb-6">
            Architectural Integrity<br />in Every Grain.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 bg-surface/80 p-4 rounded-lg backdrop-blur-sm border border-outline-variant/30">
            Supplying homeowners, architects, and business managers with precision engineering and high-end materials.
          </p>
          <Link href="/doors" className="inline-block premium-btn font-label-md text-label-md px-8 py-4 rounded-DEFAULT">
            Explore Our Catalogue
          </Link>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-margin-desktop px-gutter max-w-max-width mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Our Core Offerings</h2>
          <div className="h-1 w-24 bg-tertiary-fixed-dim mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doors */}
          <Link href="/doors" className="group block relative h-96 rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-[0px_4px_20px_rgba(38,50,56,0.08)] transition-all duration-300 bg-white">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChaSsqC6VJeDBJdWACwNc84UQ67PHLL6Gi_bB58Gja3ADx5B9AHRyXXjrhshTaWGjjMdptm3ba4ViUKSMBqw-bHCwhkkQ2wmXs4ix0DQ-oaq9XVJ5ErSoibBPhPOV8xIE9vuVOwLNsjDDmoUkeWMv9nFFlC3xwY5s2q5C0YAZ9AQqiHCujrH93pOqwCMc-WfWSmYK_zAtZyJE377BdvbqzwI49Uds9MOKJkl8_o0YQBnE589_3LAPKQw')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 pb-[24px]">
              <h3 className="font-headline-md text-headline-md text-white mb-2 group-hover:text-tertiary-fixed transition-colors">Doors</h3>
              <p className="font-body-md text-body-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">Premium Laminate & Teakwood</p>
            </div>
          </Link>

          {/* Door Frames */}
          <Link href="/frames" className="group block relative h-96 rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-[0px_4px_20px_rgba(38,50,56,0.08)] transition-all duration-300 bg-white">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ8zSjsG-iCB2a78XHU3fGZNCeLYvMMv-jLIXjO8hE20GTsgZniWLhr0ZRGofK8vqtiKiCd3bn9GjL3xyMkW-_P7CwE_BfFQHl_YDKQRs2AhfpK5l8kGl26NXn15_NO-75mrsloHfs_9GsvKZ5aRHhGQZh0pAsqZ87kxK7Glt_knl9U3cP9p-TXeWoE3-WcnoYvgGljIhrmiMd1k8lAohi7qJZjOBaTkxtuodHT9EUd5hGHX_rYy8Qyg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 pb-[24px]">
              <h3 className="font-headline-md text-headline-md text-white mb-2 group-hover:text-tertiary-fixed transition-colors">Door Frames</h3>
              <p className="font-body-md text-body-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">Engineered for Stability</p>
            </div>
          </Link>

          {/* Hardware */}
          <Link href="/hardware" className="group block relative h-96 rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-[0px_4px_20px_rgba(38,50,56,0.08)] transition-all duration-300 bg-white">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBquxYPAx0A6UAanZSal8DIHUDfPjHGjvg71VfAMNmVai_tLi2wvarrcINad8-SwCpGG_OkcsqLAMsQUz9ApIQRyRRf0JIY4dEhr0UiLucGMLbr1hbHnXD_mqMb4IQKyWMTZScP9YsmJQQmj1D3SAG8Q0iUQS-LodqbwXVrJkub4MmaMZcO_LYUfzAKyPo7rpRSjOfTUjenfxUx9qdFyLAIY6TxTFr_FU1n3fPPpd0qP8SMN6P15kOnwQ')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 pb-[24px]">
              <h3 className="font-headline-md text-headline-md text-white mb-2 group-hover:text-tertiary-fixed transition-colors">Hardware</h3>
              <p className="font-body-md text-body-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">Tactile Industrial Details</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-surface-container-low py-margin-desktop border-t border-outline-variant/20">
        <div className="px-gutter max-w-max-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Connect With Us</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Ready to elevate your architectural projects? Contact our team for bespoke solutions, bulk orders, or detailed specifications.</p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                  <div className="ml-4">
                    <h3 className="font-label-lg text-label-lg text-primary mb-1">Our Location</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                      Plot No. B-4.<br />
                      Vallabhseth Benake co-op Industrial Estate,<br />
                      KANDALI Pin-412412.<br />
                      Tal- Junnar. Dist- Pune.
                    </p>
                    <a href="https://maps.app.goo.gl/KWY8QJXKXGx4RAXd7?g_st=aw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:text-primary/80 font-label-sm text-sm hover:underline decoration-primary underline-offset-2 transition-colors">
                      <span className="material-symbols-outlined text-sm mr-1">map</span>
                      View on Google Maps
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="material-symbols-outlined text-primary mt-1">phone</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary mb-1">Direct Line (Owners)</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      <strong>Mr. Jagdish Patel:</strong> +91 98909 39027<br/>
                      <strong>Mr. Deepak Patel:</strong> +91 79724 67700
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="material-symbols-outlined text-primary mt-1">mail</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary mb-1">Email Inquiries</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">rnenterprises1960@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg border border-outline-variant/20 shadow-sm">
              <form onSubmit={handleSendInquiry} className="space-y-6">
                <div>
                  <label className="block font-label-md text-label-md text-primary mb-2">Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface border border-outline-variant/50 rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim transition-colors" placeholder="Your Name" type="text" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-primary mb-2">Email</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface border border-outline-variant/50 rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim transition-colors" placeholder="your@email.com" type="email" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-primary mb-2">Message</label>
                  <textarea required value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-surface border border-outline-variant/50 rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:border-tertiary-fixed-dim focus:ring-1 focus:ring-tertiary-fixed-dim transition-colors" placeholder="How can we help?" rows={4}></textarea>
                </div>
                <button className="w-full bg-primary text-on-primary font-label-md text-label-md px-6 py-4 rounded-DEFAULT shadow-sm hover:bg-primary-container transition-colors" type="submit">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
