import { useState } from "react";
import { Car, MapPin, Calendar, Sparkles, ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "23058041131";

const SERVICES = [
  { id: "wash", label: "Lavage Premium", desc: "Extérieur + intérieur" },
  { id: "polish", label: "Polissage", desc: "Correction de peinture" },
  { id: "ceramic", label: "Coating Céramique", desc: "Protection longue durée" },
  { id: "full", label: "Detail Complet", desc: "Polissage + céramique" },
];

const TIMINGS = ["Cette semaine", "Semaine prochaine", "Je ne sais pas encore"];

export default function WCCBooking() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    service: "",
    model: "",
    location: "",
    timing: "",
  });

  const totalSteps = 4;
  const progress = ((step) / totalSteps) * 100;

  const update = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const canProceed = () => {
    if (step === 0) return data.service !== "";
    if (step === 1) return data.model.trim() !== "";
    if (step === 2) return data.location.trim() !== "";
    if (step === 3) return data.timing !== "";
    return false;
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const buildMessage = () => {
    const serviceLabel = SERVICES.find((s) => s.id === data.service)?.label || data.service;
    const msg =
      `Bonjour West Coast Coating, je souhaite une demande de devis !\n\n` +
      `Service : ${serviceLabel}\n` +
      `Véhicule : ${data.model}\n` +
      `Zone : ${data.location}\n` +
      `Disponibilité : ${data.timing}`;
    return encodeURIComponent(msg);
  };

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0D0F] p-4">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A24B]" />
            <span className="text-[10px] tracking-[0.3em] text-[#C9A24B] font-semibold uppercase">
              Bambous
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A24B]" />
          </div>
          <h1 className="font-['Oswald',_sans-serif] text-2xl tracking-wide text-[#EDEBE6] uppercase font-semibold">
            West Coast <span className="text-[#C9A24B]">Coating</span>
          </h1>
          <p className="text-[#8A8782] text-xs mt-1">Demande de devis en 30 secondes</p>
        </div>

        {/* Progress / car silhouette fill */}
        <div className="mb-6">
          <div className="relative h-1.5 bg-[#1A1D20] rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A24B] to-[#2DD4CF] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progress, 4)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#5C5A56] uppercase tracking-wider">
            <span className={step >= 0 ? "text-[#C9A24B]" : ""}>Service</span>
            <span className={step >= 1 ? "text-[#C9A24B]" : ""}>Véhicule</span>
            <span className={step >= 2 ? "text-[#C9A24B]" : ""}>Zone</span>
            <span className={step >= 3 ? "text-[#C9A24B]" : ""}>Date</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#131517] border border-[#23262A] rounded-2xl p-6 shadow-2xl min-h-[280px] flex flex-col">
          {step === 0 && (
            <div className="flex-1">
              <StepHeader icon={<Sparkles size={18} />} title="Quel service ?" />
              <div className="grid grid-cols-1 gap-2 mt-4">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => update("service", s.id)}
                    className={`text-left px-4 py-3 rounded-xl border transition-all ${
                      data.service === s.id
                        ? "border-[#C9A24B] bg-[#C9A24B]/10"
                        : "border-[#23262A] hover:border-[#3A3D41]"
                    }`}
                  >
                    <div className="text-[#EDEBE6] font-medium text-sm">{s.label}</div>
                    <div className="text-[#7A7872] text-xs mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex-1">
              <StepHeader icon={<Car size={18} />} title="Quel véhicule ?" />
              <input
                autoFocus
                type="text"
                value={data.model}
                onChange={(e) => update("model", e.target.value)}
                placeholder="Ex: Toyota Vitz, BMW Série 3..."
                className="w-full mt-4 bg-[#0B0D0F] border border-[#23262A] focus:border-[#2DD4CF] outline-none rounded-xl px-4 py-3 text-[#EDEBE6] text-sm placeholder:text-[#5C5A56] transition-colors"
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex-1">
              <StepHeader icon={<MapPin size={18} />} title="Vous êtes où ?" />
              <input
                autoFocus
                type="text"
                value={data.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="Ex: Flic-en-Flac, Tamarin..."
                className="w-full mt-4 bg-[#0B0D0F] border border-[#23262A] focus:border-[#2DD4CF] outline-none rounded-xl px-4 py-3 text-[#EDEBE6] text-sm placeholder:text-[#5C5A56] transition-colors"
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex-1">
              <StepHeader icon={<Calendar size={18} />} title="Vous êtes disponible quand ?" />
              <div className="grid grid-cols-1 gap-2 mt-4">
                {TIMINGS.map((t) => (
                  <button
                    key={t}
                    onClick={() => update("timing", t)}
                    className={`text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                      data.timing === t
                        ? "border-[#C9A24B] bg-[#C9A24B]/10 text-[#EDEBE6]"
                        : "border-[#23262A] hover:border-[#3A3D41] text-[#C7C5C0]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#2DD4CF]/10 flex items-center justify-center mb-3">
                <MessageCircle size={22} className="text-[#2DD4CF]" />
              </div>
              <h3 className="text-[#EDEBE6] font-semibold text-base mb-1">Prêt à envoyer</h3>
              <p className="text-[#7A7872] text-xs mb-4 leading-relaxed">
                Un message pré-rempli va s'ouvrir dans WhatsApp.
                <br />
                Vous n'avez qu'à appuyer sur envoyer.
              </p>
              <div className="w-full bg-[#0B0D0F] border border-[#23262A] rounded-xl p-3 text-left text-[11px] text-[#9A9892] leading-relaxed mb-2">
                <div><span className="text-[#C9A24B]">Service:</span> {SERVICES.find((s) => s.id === data.service)?.label}</div>
                <div><span className="text-[#C9A24B]">Véhicule:</span> {data.model}</div>
                <div><span className="text-[#C9A24B]">Zone:</span> {data.location}</div>
                <div><span className="text-[#C9A24B]">Date:</span> {data.timing}</div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex gap-2 mt-6">
            {step > 0 && (
              <button
                onClick={back}
                className="px-4 py-3 rounded-xl border border-[#23262A] text-[#9A9892] hover:border-[#3A3D41] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {step < totalSteps ? (
              <button
                onClick={next}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#C9A24B] disabled:bg-[#2A2823] disabled:text-[#5C5A56] text-[#0B0D0F] font-semibold text-sm transition-colors"
              >
                Suivant <ChevronRight size={16} />
              </button>
            ) : (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] text-[#0B0D0F] font-semibold text-sm transition-transform active:scale-95"
              >
                <MessageCircle size={16} /> Envoyer sur WhatsApp
              </a>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-[#4A4844] mt-4">
          West Coast Coating · Bambous, Île Maurice
        </p>
      </div>
    </div>
  );
}

function StepHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-2 text-[#2DD4CF]">
      {icon}
      <h2 className="text-[#EDEBE6] font-semibold text-sm uppercase tracking-wide">{title}</h2>
    </div>
  );
}
