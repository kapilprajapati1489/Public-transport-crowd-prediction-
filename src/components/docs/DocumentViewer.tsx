import React, { useState } from 'react';
import { DOCUMENT_CONTENT } from '../../data/mockDatabase';
import { 
  FileText, 
  Code, 
  ShieldCheck, 
  Layers, 
  FolderTree, 
  BookOpen, 
  CheckSquare, 
  Terminal,
  Database
} from 'lucide-react';

export const DocumentViewer: React.FC = () => {
  const [activeDocSection, setActiveDocSection] = useState<'prd' | 'tech' | 'security' | 'structure' | 'readme'>('prd');

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
          PROJECT SPECIFICATION ARCHIVE
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
          System Documentation & Engineering Specs
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete implementation specifications from the PRD, Technical Requirements, Security Rules, and Architecture
        </p>
      </div>

      {/* Doc Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => setActiveDocSection('prd')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeDocSection === 'prd'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>1. PRD (Product Requirements)</span>
        </button>

        <button
          onClick={() => setActiveDocSection('tech')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeDocSection === 'tech'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code className="h-4 w-4" />
          <span>2. Technical Architecture & APIs</span>
        </button>

        <button
          onClick={() => setActiveDocSection('security')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeDocSection === 'security'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>3. Security Rules & Privacy</span>
        </button>

        <button
          onClick={() => setActiveDocSection('structure')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeDocSection === 'structure'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FolderTree className="h-4 w-4" />
          <span>4. File Tree & College Architecture</span>
        </button>

        <button
          onClick={() => setActiveDocSection('readme')}
          className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeDocSection === 'readme'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>5. README & Installation</span>
        </button>
      </div>

      {/* Doc Body 1: PRD */}
      {activeDocSection === 'prd' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-white">
              {DOCUMENT_CONTENT.prd.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {DOCUMENT_CONTENT.prd.overview}
            </p>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono mb-2">Problem Statement</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {DOCUMENT_CONTENT.prd.problemStatement}
              </p>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono mb-2">Core Product Goals</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {DOCUMENT_CONTENT.prd.goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono mb-2">Target User Personas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DOCUMENT_CONTENT.prd.targetUsers.map(u => (
                  <div key={u.role} className="p-3 rounded-xl border border-slate-800 bg-slate-950/60">
                    <div className="font-bold text-white text-xs">{u.role}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{u.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono mb-2">Functional Requirements (FR-01 to FR-08)</h3>
              <div className="space-y-2">
                {DOCUMENT_CONTENT.prd.functionalRequirements.map(fr => (
                  <div key={fr.id} className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {fr.id}
                      </span>
                      <span className="font-bold text-white">{fr.name}</span>
                    </div>
                    <div className="text-slate-300 sm:text-right">{fr.spec}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doc Body 2: Technical Requirements */}
      {activeDocSection === 'tech' && (
        <div className="space-y-6">
          
          {/* Tech Stack */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-white">
              Approved Technology Stack & Architecture
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                <div className="text-slate-500 font-mono text-[10px]">Frontend</div>
                <div className="font-bold text-white mt-1">{DOCUMENT_CONTENT.technical.stack.frontend}</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                <div className="text-slate-500 font-mono text-[10px]">Backend Server</div>
                <div className="font-bold text-white mt-1">{DOCUMENT_CONTENT.technical.stack.backend}</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                <div className="text-slate-500 font-mono text-[10px]">Machine Learning</div>
                <div className="font-bold text-emerald-400 mt-1">{DOCUMENT_CONTENT.technical.stack.ml}</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                <div className="text-slate-500 font-mono text-[10px]">Relational Database</div>
                <div className="font-bold text-white mt-1">{DOCUMENT_CONTENT.technical.stack.db}</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60">
                <div className="text-slate-500 font-mono text-[10px]">Visualization</div>
                <div className="font-bold text-white mt-1">{DOCUMENT_CONTENT.technical.stack.dataViz}</div>
              </div>
            </div>
          </div>

          {/* MySQL Database Schema */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-400" />
              <span>MySQL Relational Database Schema (database/schema.sql)</span>
            </h3>

            <div className="space-y-3">
              {DOCUMENT_CONTENT.technical.databaseSchema.map((tbl) => (
                <div key={tbl.table} className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1">
                    Table: {tbl.table}
                  </div>
                  <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                    {tbl.columns}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* REST API Endpoints */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>REST API Endpoints Specification</span>
            </h3>

            <div className="space-y-2 text-xs font-mono">
              {DOCUMENT_CONTENT.technical.restEndpoints.map((ep, i) => (
                <div key={i} className="p-3 rounded-lg border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ep.method === 'POST' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-white font-semibold">{ep.path}</span>
                  </div>
                  <div className="text-slate-400 font-sans text-xs">{ep.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Doc Body 3: Security & Privacy */}
      {activeDocSection === 'security' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>Security Rules & Privacy by Design Checklist</span>
            </h2>

            <div className="space-y-3 pt-2">
              {DOCUMENT_CONTENT.security.rules.map((rule) => (
                <div key={rule.code} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 mt-0.5">
                    {rule.code}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">{rule.title}</div>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed">{rule.rule}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Doc Body 4: File Structure & College Architecture */}
      {activeDocSection === 'structure' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-white">
              Public Transport Crowd Predictor - Recommended Repository Tree
            </h2>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`PublicTransportCrowdPredictor/
├── app.py                     # Main Flask / Express application server
├── config.py                  # Database and session configuration
├── requirements.txt           # Python packages (scikit-learn, pandas, flask)
├── README.md                  # Project overview and setup instructions
├── .env                       # Secret keys & database credentials
│
├── data/
│   ├── raw/
│   │   └── transport_data.csv # Raw passenger count observations
│   └── processed/
│       └── cleaned_data.csv   # Normalized features for ML training
│
├── model/
│   ├── train_model.py         # Loads data, trains Random Forest model
│   ├── predict.py             # Inference pipeline returning Low/Med/High
│   └── crowd_model.pkl        # Serialized production model binary
│
├── database/
│   ├── schema.sql             # MySQL DDL for users, routes, passenger_data
│   └── seed_data.sql          # Sample commuter dataset
│
├── routes/
│   ├── auth.py                # Login & registration endpoints
│   ├── prediction.py          # /api/predict inference endpoint
│   └── admin.py               # Route and dataset admin controller
│
└── templates/                 # UI HTML views (Desktop & Mobile)`}
            </pre>
          </div>
        </div>
      )}

      {/* Doc Body 5: Readme */}
      {activeDocSection === 'readme' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 text-xs text-slate-300 leading-relaxed">
            <h2 className="font-display text-lg font-bold text-white">
              Project Readme & Local Run Instructions
            </h2>
            
            <div className="space-y-2">
              <h3 className="font-bold text-emerald-400 uppercase font-mono">1. Clone & Environment Setup</h3>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 font-mono">
git clone https://github.com/transit-predictor/public-transport-crowd-predictor.git
cd public-transport-crowd-predictor
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
              </pre>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-emerald-400 uppercase font-mono">2. Train Model & Run Server</h3>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 font-mono">
# Train Random Forest model on historical dataset
python model/train_model.py

# Launch web server on port 5000 (or Vite port 3000)
python app.py
              </pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
