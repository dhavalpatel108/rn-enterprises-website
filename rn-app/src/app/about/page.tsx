"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const translations = {
  en: {
    label: "English",
    title: "About R N Enterprises",
    text: "R N Enterprises, operating under the trusted brand name Group of Shakti, is a premier manufacturing enterprise dedicated to delivering high-quality architectural and interior solutions. Specializing in precision-crafted door frames, post-forming frames, durable wooden doors, modern laminate doors, and custom modular furniture, we combine advanced manufacturing techniques with superior raw materials to meet the evolving demands of residential and commercial spaces.\n\nDriven by a commitment to excellence and customer satisfaction, our state-of-the-art production unit ensures that every product—from sleek post-forming doors to robust door frames—delivers unmatched structural integrity and aesthetic appeal. At R N Enterprises, we take pride in our craftsmanship, aiming to build lasting relationships with our channel partners and clients by consistently providing reliable, innovative, and stylish interior solutions that transform spaces."
  },
  hi: {
    label: "हिंदी (Hindi)",
    title: "आर.एन. एंटरप्राइजेज के बारे में",
    text: "भरोसेमंद ब्रांड 'ग्रुप ऑफ शक्ति' के तहत संचालित, आर.एन. एंटरप्राइजेज एक प्रमुख विनिर्माण कंपनी है जो उच्च गुणवत्ता वाले आर्किटेक्चरल और इंटीरियर समाधान प्रदान करने के लिए समर्पित है। हम विशेष रूप से सटीक-निर्मित डोर फ्रेम, पोस्ट-फॉर्मिंग फ्रेम, मजबूत लकड़ी के दरवाजे, आधुनिक लैमिनेट दरवाजे और कस्टम मॉड्यूलर फर्नीचर बनाने में विशेषज्ञ हैं। हम आवासीय और व्यावसायिक स्थानों की बदलती जरूरतों को पूरा करने ক্যাম बेहतरीन कच्चे माल के साथ उन्नत विनिर्माण तकनीकों का संयोजन करते हैं।\n\nउत्कृष्टता और ग्राहकों की संतुष्टि के प्रति हमारी प्रतिबद्धता के कारण, हमारी अत्याधुनिक उत्पादन इकाई यह सुनिश्चित करती है कि प्रत्येक उत्पाद बेजोड़ संरचनात्मक मजबूती और शानदार अपील प्रदान करे। आर.एन. एंटरप्राइजेज में, हमें अपनी शिल्प कौशल पर गर्व है। हमारा लक्ष्य लगातार विश्वसनीय, अभिनव और स्टाइलिश इंटीरियर समाधान प्रदान करके अपने चैनल भागीदारों और ग्राहकों के साथ स्थायी संबंध बनाना है।"
  },
  mr: {
    label: "मराठी (Marathi)",
    title: "आर.एन. एंटरप्रायजेस बद्दल",
    text: "'ग्रुप ऑफ शक्ती' या विश्वासार्ह ब्रँड अंतर्गत कार्यरत, आर.एन. एंटरप्रायजेस ही उच्च दर्जाचे आर्किटेक्चरल आणि इंटिरियर सोल्यूशन्स प्रदान करण्यासाठी समर्पित एक प्रमुख उत्पादन कंपनी आहे. अचूकतेने बनवलेल्या डोअर फ्रेम्स, पोस्ट-फॉर्मिंग फ्रेम्स, टिकाऊ लाकडी दरवाजे, आधुनिक लॅमिनेट दरवाजे आणि कस्टम मॉड्युलर फर्निचरमध्ये विशेष प्राविण्य असलेल्या, आम्ही निवासी आणि व्यावसायिक जागांच्या वाढत्या गरजा पूर्ण करण्यासाठी उत्कृष्ट कच्च्या मालासह प्रगत उत्पादन तंत्रज्ञानाचा मेळ घालतो.\n\nउत्कृष्टता आणि ग्राहकांच्या समाधानासाठी वचनबद्ध असलेल्या आमच्या अत्याधुनिक उत्पादन युनिटमुळे प्रत्येक उत्पादन मजबूत आणि आकर्षक बनते. आर.एन. एंटरप्रायजेसमध्ये, आम्हाला आमच्या कौशल्याचा अभिमान आहे. आमचे उद्दिष्ट सतत विश्वासार्ह, नाविन्यपूर्ण आणि स्टायलिश इंटिरियर सोल्यूशन्स प्रदान करून आमच्या चॅनेल भागीदार आणि ग्राहकांशी कायमस्वरूपी नातेसंबंध प्रस्थापित करणे हे आहे."
  },
  gu: {
    label: "ગુજરાતી (Gujarati)",
    title: "આર.એન. એન્ટરપ્રાઇઝિસ વિશે",
    text: "વિશ્વસનીય બ્રાન્ડ 'ગ્રુપ ઓફ શક્તિ' હેઠળ કાર્યરત, આર.એન. એન્ટરપ્રાઇઝિસ એક અગ્રણી ઉત્પાદન કંપની છે જે ઉચ્ચ ગુણવત્તાવાળા આર્કિટેક્ચરલ અને ઇન્ટિરિયર સોલ્યુશन्स પ્રદાન કરવા માટે સમર્પિત છે. ચોકસાઇથી બનાવેલી ડોર ફ્રેમ્સ, પોસ્ટ-ફોર્મિંગ ફ્રેમ્સ, મજબૂત લાકડાના દરવાજા, આધુનિક લેમિનેટ દરવાજા અને કસ્ટમ મોડ્યુલર ફર્નિચરમાં નિષ્ણાત, અમે રહેણાંક અને વ્યાવસાયિક જગ્યાઓની જરૂરિયાતોને પહોંચી વળવા શ્રેષ્ઠ કાચા માલ સાથે અદ્યતન ઉત્પાદન તકનીકોનો ઉપયોગ કરીએ છીએ.\n\nશ્રેષ્ઠતા અને ગ્રાહક સંતોષ માટેની અમારી પ્રતિબદ્ધતા દ્વારા સંચાલિત, અમારું અત્યાધુનિક ઉત્પાદન એકમ સુનિશ્ચિત કરે છે કે દરેક ઉત્પાદન અજોડ માળખાકીય મજબૂતાઈ અને સુંદરતા પ્રદાન કરે. આર.એન. એન્ટરપ્રાઇઝિસમાં, અમને અમારી કારીગરી પર ગર્વ છે, જેનો ઉદ્દેશ્ય સતત વિશ્વસનીય, નવીન અને સ્ટાઇલિશ ઇન્ટિરિયર સોલ્યુશન્સ પ્રદાન કરીને અમારા ચેનલ ભાગીદારો અને ગ્રાહકો સાથે કાયમી સંબંધો બાંધવાનો છે."
  }
};

type LangKey = keyof typeof translations;

export default function AboutPage() {
  const [lang, setLang] = useState<LangKey>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const content = translations[lang];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1.0; 
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [lang]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    // Ensure speed is reset when playing starts
    audioRef.current.playbackRate = 1.0;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <main className="flex-grow bg-surface-container animate-page-entry min-h-screen pb-20">
      <audio ref={audioRef} onEnded={handleAudioEnded} src={`/audio/${lang}.mp3`} preload="auto" />
      
      {/* Decorative Hero Section */}
      <section className="relative w-full h-80 flex flex-col items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
        <h1 className="relative z-10 font-headline-display text-4xl md:text-6xl text-white drop-shadow-lg tracking-wide text-center">
          Our Heritage & Vision
        </h1>
        <div className="relative z-10 h-1 w-24 bg-tertiary-fixed mt-4 rounded-full"></div>
      </section>

      {/* Main Content Container */}
      <section className="px-gutter max-w-4xl mx-auto -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-outline-variant/20 p-8 md:p-12">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-outline-variant/30">
            {/* Language Switcher */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(translations) as LangKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setLang(key)}
                  className={`px-4 py-2 rounded-full font-label-md text-sm transition-all duration-300 ${
                    lang === key 
                      ? 'bg-primary text-white shadow-md scale-105' 
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {translations[key].label}
                </button>
              ))}
            </div>

            {/* Soft Audio Player */}
            <div className="flex items-center space-x-4 bg-tertiary-container/30 px-6 py-3 rounded-full border border-tertiary/10">
              <span className="font-label-md text-tertiary text-sm">Listen in {translations[lang].label}</span>
              <button 
                onClick={toggleAudio}
                className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
              >
                <span className="material-symbols-outlined text-xl">
                  {isPlaying ? "pause" : "play_arrow"}
                </span>
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="font-headline-lg text-3xl text-primary leading-tight">
              {content.title}
            </h2>
            {content.text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="font-body-lg text-lg text-on-surface/80 leading-relaxed text-left md:text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Decorative Bottom Element */}
          <div className="mt-12 pt-8 border-t border-outline-variant/30 flex flex-col items-center">
            <img src="/logo.jpeg" alt="Group of Shakti" className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-primary/20 opacity-80" />
            <p className="font-label-md text-primary tracking-widest uppercase text-sm">Group of Shakti</p>
          </div>
        </div>
      </section>
    </main>
  );
}
