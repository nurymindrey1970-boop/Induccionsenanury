/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Award,
  Menu,
  X,
  PlayCircle,
  UserPlus,
  ClipboardList,
  BarChart3,
  Users,
  FileText,
  TrendingUp
} from 'lucide-react';
import { inductionModules, Module, QuizQuestion } from './data/inductionContent.ts';
import { db, handleFirestoreError, OperationType } from './lib/firebase.ts';
import { doc, setDoc, getDocs, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ApprenticeData {
  id: string;
  fullName: string;
  documentId: string;
  programName: string;
  registeredAt: any;
}

interface QuizResultData {
  id: string;
  apprenticeId: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  completedAt: any;
}

// --- Components ---

const Navbar = ({ onHome, onAdmin }: { onHome: () => void, onAdmin: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div 
        className="flex items-center gap-4 cursor-pointer group" 
        onClick={onHome}
      >
        <div className="h-14 w-auto flex items-center justify-center group-hover:scale-105 transition-transform">
          <img 
            src="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%201000%201000'%20style='enable-background:new%200%200%201000%201000;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id='path47-5'%20class='st0'%20d='M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z'/%3e%3cg%20id='_x23_000000ff-2'%20transform='matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)'%3e%3c/g%3e%3c/svg%3e" 
            alt="SENA Logosímbolo" 
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="border-l border-slate-200 pl-4">
          <h1 className="text-xl font-black text-slate-900 leading-tight tracking-tight">SENA Inducción</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Formación Profesional Integral</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button onClick={onHome} className="hover:text-[#39A900] transition-colors">Inicio</button>
        <button onClick={onAdmin} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-bold">
          <Shield size={16} className="text-[#39A900]" /> Panel Admin
        </button>
        <div className="w-px h-6 bg-slate-200" />
        <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all text-xs">
          Mi Perfil
        </button>
      </div>
    </div>
  </nav>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
    <motion.div 
      className="bg-[#39A900] h-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </div>
);

const ModuleCard = ({ module, isCompleted, onClick }: { module: Module, isCompleted: boolean, onClick: () => void }) => {
  const Icon = { Shield, Cpu, BookOpen, Heart }[module.icon] || GraduationCap;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl ${isCompleted ? 'bg-green-50 text-[#39A900]' : 'bg-slate-50 text-slate-400 group-hover:bg-green-50 group-hover:text-[#39A900]'} transition-colors`}>
          <Icon size={28} />
        </div>
        {isCompleted && (
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 size={12} /> Completado
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#39A900] transition-colors">
        {module.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
        {module.description}
      </p>
      
      <div className="flex items-center gap-2 text-sm font-semibold text-[#39A900] group-hover:gap-4 transition-all">
        {isCompleted ? 'Repasar módulo' : 'Comenzar ahora'} <ChevronRight size={18} />
      </div>
    </motion.div>
  );
};

const Quiz = ({ questions, onComplete }: { questions: QuizQuestion[], onComplete: (score: number) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    const correct = selectedOption === questions[currentStep].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setSelectedOption(null);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(score);
    }
  };

  const question = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Evaluación: Pregunta {currentStep + 1} de {questions.length}
        </span>
        <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="bg-[#39A900] h-full transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, idx) => {
            const isAnswer = idx === question.correctAnswer;
            const isSelected = idx === selectedOption;
            
            let bgColor = 'bg-white border-slate-200 hover:border-[#39A900]';
            if (showFeedback) {
              if (isAnswer) bgColor = 'bg-green-50 border-green-500 text-green-700 shadow-lg shadow-green-100';
              else if (isSelected) bgColor = 'bg-red-50 border-red-500 text-red-700 shadow-lg shadow-red-100';
              else bgColor = 'opacity-50 border-slate-100';
            } else if (isSelected) {
              bgColor = 'bg-green-50 border-[#39A900] text-[#39A900]';
            }

            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                disabled={showFeedback}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-medium flex items-center justify-between group ${bgColor}`}
              >
                {option}
                {showFeedback && isAnswer && <CheckCircle2 className="text-green-500" />}
                {showFeedback && isSelected && !isAnswer && <X className="text-red-500" />}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}
            >
              <div className="flex gap-4">
                <div className={`p-2 rounded-lg ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {isCorrect ? <Award size={20} /> : <PlayCircle size={20} />}
                </div>
                <div>
                  <h4 className={`font-bold mb-1 ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                    {isCorrect ? '¡Excelente!' : 'Refuerzo Pedagógico'}
                  </h4>
                  <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                    {question.reinforcement}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4">
          {!showFeedback ? (
            <button
              disabled={selectedOption === null}
              onClick={handleCheck}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
            >
              Validar Respuesta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-[#39A900] text-white rounded-2xl font-bold hover:bg-[#2e8a00] transition-all shadow-lg shadow-green-100"
            >
              {currentStep === questions.length - 1 ? 'Ver Resultado Final' : 'Siguiente Pregunta'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const AdminPanel = () => {
  const [apprentices, setApprentices] = useState<ApprenticeData[]>([]);
  const [results, setResults] = useState<QuizResultData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appSnap = await getDocs(collection(db, 'apprentices'));
        const resSnap = await getDocs(query(collection(db, 'results'), orderBy('completedAt', 'desc')));
        
        setApprentices(appSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ApprenticeData)));
        setResults(resSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as QuizResultData)));
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'admin_panel');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39A900]"></div>
    </div>
  );

  // Analytics logic
  const moduleCompletion = inductionModules.map(m => {
    const count = results.filter(r => m.id === r.moduleId).length;
    return { name: m.title.substring(0, 10) + '...', count };
  });

  const averageScore = results.length > 0 
    ? (results.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0) / results.length * 100).toFixed(1)
    : 0;

  const COLORS = ['#39A900', '#00324D', '#FF8042', '#0088FE'];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900">Panel Institucional</h2>
          <p className="text-slate-500">Analítica en tiempo real del proceso de inducción.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-green-50 text-[#39A900] rounded-xl"><Users size={20} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Aprendices</p>
              <p className="text-xl font-black">{apprentices.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><TrendingUp size={20} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Promedio</p>
              <p className="text-xl font-black">{averageScore}%</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-[#39A900]" /> Participación por Módulo
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleCompletion}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                <YAxis axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="count" fill="#39A900" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ClipboardList size={20} className="text-[#39A900]" /> Últimos Resultados
          </h3>
          <div className="flex-grow overflow-y-auto max-h-[300px] pr-4 space-y-4">
            {results.map((res) => {
              const app = apprentices.find(a => a.id === res.apprenticeId);
              const mod = inductionModules.find(m => m.id === res.moduleId);
              return (
                <div key={res.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xs font-bold text-slate-400">
                      {app?.fullName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Aprendiz</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{mod?.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">{res.completedAt?.toDate().toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

const RegistrationForm = ({ onRegister }: { onRegister: (data: ApprenticeData) => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    documentId: '',
    programName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const apprenticeId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const apprentice: ApprenticeData = {
      id: apprenticeId,
      ...formData,
      registeredAt: serverTimestamp()
    };

    try {
      await setDoc(doc(db, 'apprentices', apprenticeId), apprentice);
      onRegister(apprentice);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `apprentices/${apprenticeId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-[#39A900] mx-auto mb-6">
          <UserPlus size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Registro de Aprendiz</h2>
        <p className="text-slate-500">Ingresa tus datos para comenzar tu proceso de inducción.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nombre Completo</label>
          <input 
            required
            type="text"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#39A900] outline-none transition-all font-medium"
            placeholder="Ej: Juan Pérez"
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Número de Documento</label>
          <input 
            required
            type="text"
            pattern="[0-9]+"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#39A900] outline-none transition-all font-medium"
            placeholder="Solo números"
            value={formData.documentId}
            onChange={e => setFormData({...formData, documentId: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Programa de Formación</label>
          <input 
            required
            type="text"
            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#39A900] outline-none transition-all font-medium"
            placeholder="Ej: Análisis y Desarrollo de Software"
            value={formData.programName}
            onChange={e => setFormData({...formData, programName: e.target.value})}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Registrando...' : 'Comenzar Inducción'} <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [apprentice, setApprentice] = useState<ApprenticeData | null>(() => {
    const saved = localStorage.getItem('sena_apprentice');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    const saved = localStorage.getItem('sena_completed_modules');
    return saved ? JSON.parse(saved) : [];
  });
  const [view, setView] = useState<'home' | 'content' | 'quiz' | 'result' | 'registration' | 'admin'>('home');
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    if (!apprentice && view !== 'registration') {
      setView('registration');
    }
  }, [apprentice]);

  useEffect(() => {
    localStorage.setItem('sena_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  const handleRegister = (data: ApprenticeData) => {
    setApprentice(data);
    localStorage.setItem('sena_apprentice', JSON.stringify(data));
    setView('home');
  };

  const currentModule = inductionModules.find(m => m.id === currentModuleId);
  const totalProgress = (completedModules.length / inductionModules.length) * 100;

  const handleModuleClick = (id: string) => {
    setCurrentModuleId(id);
    setView('content');
    window.scrollTo(0, 0);
  };

  const handleQuizComplete = async (score: number) => {
    setLastScore(score);
    
    if (apprentice && currentModuleId) {
      const resultId = `res_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      const result = {
        apprenticeId: apprentice.id,
        moduleId: currentModuleId,
        score,
        totalQuestions: currentModule?.quiz.length || 0,
        completedAt: serverTimestamp()
      };

      try {
        await setDoc(doc(db, 'results', resultId), result);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `results/${resultId}`);
      }
    }

    if (currentModuleId && !completedModules.includes(currentModuleId)) {
      setCompletedModules([...completedModules, currentModuleId]);
    }
    setView('result');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans">
      <Navbar onHome={() => setView('home')} onAdmin={() => setView('admin')} />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AdminPanel />
            </motion.div>
          )}

          {view === 'registration' && (
            <motion.div
              key="reg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RegistrationForm onRegister={handleRegister} />
            </motion.div>
          )}

          {view === 'home' && apprentice && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Section */}
              <div className="relative rounded-[40px] overflow-hidden mb-16 bg-slate-900 min-h-[400px] flex items-center px-12">
                <img 
                  src="/src/assets/images/sena_hero_training_1790199511539.jpg" 
                  alt="SENA Training" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-block px-4 py-1.5 bg-[#39A900] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Bienvenido Aprendiz
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
                    Tu Futuro Comienza <span className="text-[#39A900]">Aquí</span>
                  </h1>
                  <p className="text-lg text-slate-200 mb-8 leading-relaxed">
                    Inicia tu proceso de inducción y descubre todo lo que el SENA tiene para ofrecerte en tu formación profesional integral.
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex-1 max-w-[300px]">
                      <div className="flex justify-between text-xs font-bold text-white mb-2 uppercase tracking-wide">
                        <span>Progreso General</span>
                        <span>{Math.round(totalProgress)}%</span>
                      </div>
                      <ProgressBar progress={totalProgress} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {inductionModules.map(module => (
                  <ModuleCard 
                    key={module.id} 
                    module={module} 
                    isCompleted={completedModules.includes(module.id)}
                    onClick={() => handleModuleClick(module.id)}
                  />
                ))}
              </div>

              {/* Stats Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-slate-50 rounded-[40px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#39A900] shadow-sm mb-4">
                    <Award size={32} />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 mb-1">{completedModules.length}</h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Módulos Completados</p>
                </div>
                <div className="flex flex-col items-center text-center border-x border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#39A900] shadow-sm mb-4">
                    <BookOpen size={32} />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 mb-1">4</h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Áreas de Formación</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#39A900] shadow-sm mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 mb-1">100%</h4>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Calidad SENA</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'content' && currentModule && (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8 font-medium"
              >
                <ArrowLeft size={18} /> Volver al inicio
              </button>

              <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="h-[300px] relative">
                  <img src={currentModule.image} alt={currentModule.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h2 className="text-4xl font-black text-white mb-2">{currentModule.title}</h2>
                    <p className="text-slate-200">{currentModule.description}</p>
                  </div>
                </div>

                <div className="p-12 space-y-12">
                  {currentModule.content.map((section, idx) => (
                    <section key={idx} className="space-y-4">
                      <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-green-50 text-[#39A900] flex items-center justify-center text-sm">
                          {idx + 1}
                        </span>
                        {section.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {section.body}
                      </p>
                      {section.keyPoints && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {section.keyPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <CheckCircle2 size={18} className="text-[#39A900]" />
                              <span className="font-semibold text-slate-700">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}

                  <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                    <div className="text-sm text-slate-500 font-medium italic">
                      Lectura completada. ¿Estás listo para la evaluación?
                    </div>
                    <button 
                      onClick={() => setView('quiz')}
                      className="px-8 py-4 bg-[#39A900] text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-[#2e8a00] transition-all shadow-lg shadow-green-100"
                    >
                      Iniciar Evaluación <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'quiz' && currentModule && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Quiz 
                questions={currentModule.quiz} 
                onComplete={handleQuizComplete} 
              />
            </motion.div>
          )}

          {view === 'result' && currentModule && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto text-center py-20"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-[#39A900] mx-auto mb-8">
                <Award size={48} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">¡Módulo Completado!</h2>
              <p className="text-lg text-slate-500 mb-8">
                Has finalizado con éxito la evaluación de <strong>{currentModule.title}</strong>.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setView('home')}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  Regresar al Dashboard
                </button>
                <button 
                  onClick={() => setView('content')}
                  className="w-full py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                >
                  Repasar Contenido
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold">S</div>
            <p className="text-sm text-slate-400 font-medium tracking-tight">© 2026 Servicio Nacional de Aprendizaje SENA</p>
          </div>
          <div className="flex gap-8 text-sm font-semibold text-slate-400">
            <a href="#" className="hover:text-slate-900">Política de Privacidad</a>
            <a href="#" className="hover:text-slate-900">Términos y Condiciones</a>
            <a href="#" className="hover:text-slate-900">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
