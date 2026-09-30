import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { generateDevelopmentProposal } from '../services/aiService';
import {
  X,
  FileText,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  AlertTriangle,
  Loader2,
  Building2,
  Layers,
  Users
} from 'lucide-react';

export const ProposalModal: React.FC = () => {
  const { activeProposalHotspot, setActiveProposalHotspot } = useApp();
  const [proposalText, setProposalText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [aiPowered, setAiPowered] = useState<boolean>(false);

  useEffect(() => {
    if (!activeProposalHotspot) return;

    let mounted = true;
    setLoading(true);
    setProposalText('');

    generateDevelopmentProposal(activeProposalHotspot)
      .then((res) => {
        if (mounted) {
          setProposalText(res.proposalText);
          setAiPowered(Boolean(res.aiPowered));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error generating proposal', err);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [activeProposalHotspot]);

  if (!activeProposalHotspot) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(proposalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([proposalText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CivicPulse_Proposal_${activeProposalHotspot.district}_${activeProposalHotspot.category.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide">AI Development Proposal</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-700/60">
                  {aiPowered ? 'Gemini 3.8 Flash' : 'GovTech Engine'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeProposalHotspot.district}, {activeProposalHotspot.state} · Priority Score: {activeProposalHotspot.priorityScore}/100
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={loading || !proposalText}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-xs flex items-center gap-1"
              title="Copy Proposal Markdown"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownload}
              disabled={loading || !proposalText}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-xs flex items-center gap-1"
              title="Download as Markdown Document"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              disabled={loading || !proposalText}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors text-xs flex items-center gap-1"
              title="Print Proposal"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveProposalHotspot(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hotspot Context Ribbon */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-900">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              {activeProposalHotspot.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              {activeProposalHotspot.citizenRequests.toLocaleString()} Citizen Requests
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              {activeProposalHotspot.infrastructureGap}% Infra Deficit
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Est. Capex: <span className="font-semibold text-slate-800">₹{activeProposalHotspot.estimatedCostCr} Cr</span>
          </div>
        </div>

        {/* Modal Body / Markdown Content */}
        <div className="p-6 overflow-y-auto grow space-y-4 text-slate-800 text-sm leading-relaxed font-sans">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <div className="text-sm font-semibold text-slate-700">Generating Evidence-Backed Proposal...</div>
              <p className="text-xs text-slate-500 text-center max-w-md">
                Synthesizing {activeProposalHotspot.citizenRequests.toLocaleString()} multilingual citizen submissions, GIS infrastructure layers, and demographic indices into an official proposal.
              </p>
            </div>
          ) : (
            <div>
              {/* Decision-Support Banner */}
              <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">AI Decision Support Document: </span>
                  This proposal is generated to provide structured technical inputs to district collectors and state departments. All cost estimates and engineering measurements represent preliminary synthetic models and require field verification.
                </div>
              </div>

              {/* Formatted Proposal Text */}
              <div className="prose prose-slate max-w-none space-y-4">
                {proposalText.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={idx} className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-base font-bold text-blue-900 mt-4 mb-2">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-sm font-semibold text-slate-900 uppercase tracking-wider mt-5 mb-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    const items = paragraph.split('\n').filter(Boolean);
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                        {items.map((it, iIdx) => (
                          <li key={iIdx}>{it.replace(/^[-*]\s+/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                    const items = paragraph.split('\n').filter(Boolean);
                    return (
                      <ol key={idx} className="list-decimal pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                        {items.map((it, iIdx) => (
                          <li key={iIdx}>{it.replace(/^\d+\.\s+/, '')}</li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Ready for departmental cabinet review</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={loading || !proposalText}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-xs transition-colors"
            >
              Export Report
            </button>
            <button
              onClick={() => setActiveProposalHotspot(null)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
