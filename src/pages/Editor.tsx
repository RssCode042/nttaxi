/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, orderBy, limit, getDocs, deleteDoc, onSnapshot, where } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useAppContext } from '../context/AppContext';
import { translations as defaultTranslations } from '../translations';
import { PRICING_DATA as defaultPricingData, TAXI_NUMBERS as defaultTaxiNumbers } from '../constants';
import { Save, LogOut, ChevronRight, ChevronDown, CheckCircle, AlertCircle, RefreshCw, Smartphone, DollarSign, Languages, LayoutDashboard, TrendingUp, MousePointer2, Globe, Link2, Facebook, Instagram, Twitter, Apple, Play, Users, UserPlus, Trash2, ShieldCheck, Mail, Briefcase, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function Editor() {
  const { translations, pricingData, taxiNumbers, mainPhone, seo, links } = useAppContext();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSystemInitialized, setIsSystemInitialized] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regError, setRegError] = useState('');
  
  // Registration state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  
  // CMS State
  const [editedTranslations, setEditedTranslations] = useState<any>(null);
  const [editedPricing, setEditedPricing] = useState<any[]>([]);
  const [editedNumbers, setEditedNumbers] = useState<string[]>([]);
  const [editedMainPhone, setEditedMainPhone] = useState<string>('');
  const [editedSeo, setEditedSeo] = useState<any>(null);
  const [editedLinks, setEditedLinks] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'page_home' | 'page_about' | 'page_contacts' | 'page_services' | 'pricing' | 'contacts' | 'seo' | 'links' | 'users'>('dashboard');
  const [activeLang, setActiveLang] = useState<'bg' | 'en'>('bg');
  const [activeSection, setActiveSection] = useState<string>('nav');

  const translateText = async (text: string, fieldKey: string, sectionKey: string, idx?: number, itemKey?: number) => {
    if (!text || activeLang !== 'bg') return;
    setIsTranslating(fieldKey + (idx !== undefined ? `_${idx}_${itemKey}` : ''));
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      if (data.translated) {
        setEditedTranslations((prev: any) => {
          const updated = { ...prev };
          if (idx !== undefined && itemKey !== undefined) {
             // It's an array item field
             const items = updated.en[sectionKey][fieldKey];
             items[idx][itemKey] = data.translated;
          } else {
             // It's a top level string
             updated.en[sectionKey][fieldKey] = data.translated;
          }
          return updated;
        });
      }
    } catch (e) {
      console.error("Translation error:", e);
    } finally {
      setIsTranslating(null);
    }
  };

  // Admin management state
  const [adminsList, setAdminsList] = useState<any[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  // Check system status
  useEffect(() => {
    const checkInit = async () => {
      try {
        const statusDoc = await getDoc(doc(db, 'config', 'system_status'));
        setIsSystemInitialized(statusDoc.exists());
      } catch (e) {
        console.error("System init check error:", e);
        setIsSystemInitialized(true); // Default to true if error, to be safe
      }
    };
    checkInit();
  }, []);

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
          if (adminDoc.exists()) {
            setIsAdmin(true);
          } else {
            // Check for invite
            const inviteQuery = query(collection(db, 'admins'), where('email', '==', currentUser.email), where('isInvite', '==', true));
            const inviteSnapshot = await getDocs(inviteQuery);
            
            if (!inviteSnapshot.empty) {
              const inviteDoc = inviteSnapshot.docs[0];
              // Promote to real admin
              await setDoc(doc(db, 'admins', currentUser.uid), {
                email: currentUser.email,
                createdAt: serverTimestamp(),
                role: inviteDoc.data().role || 'admin',
                invitedBy: inviteDoc.data().invitedBy || 'system'
              });
              // Cleanup invite
              await deleteDoc(doc(db, 'admins', inviteDoc.id));
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              setLoginError('Нямате администраторски права.');
            }
          }
        } catch (e) {
          console.error("Auth check error:", e);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setIsCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to admins list if is admin
  useEffect(() => {
    if (isAdmin && activeTab === 'users') {
      const unsubscribe = onSnapshot(collection(db, 'admins'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdminsList(list);
      });
      return () => unsubscribe();
    }
  }, [isAdmin, activeTab]);

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [isFetchingAnalytics, setIsFetchingAnalytics] = useState(false);

  // Load initial data for editing once translations/pricing are available
  useEffect(() => {
    if (translations && !editedTranslations) {
      setEditedTranslations(JSON.parse(JSON.stringify(translations)));
    }
    if (pricingData && editedPricing.length === 0) setEditedPricing(JSON.parse(JSON.stringify(pricingData)));
    if (taxiNumbers && editedNumbers.length === 0) setEditedNumbers(JSON.parse(JSON.stringify(taxiNumbers)));
    if (mainPhone && !editedMainPhone) setEditedMainPhone(mainPhone);
    if (seo && !editedSeo) setEditedSeo(JSON.parse(JSON.stringify(seo)));
    if (links && !editedLinks) setEditedLinks(JSON.parse(JSON.stringify(links)));
  }, [translations, pricingData, taxiNumbers, seo, links]);

  useEffect(() => {
    if (isAdmin && activeTab === 'dashboard') {
      fetchAnalytics();
    }
  }, [isAdmin, activeTab]);

  const fetchAnalytics = async () => {
    setIsFetchingAnalytics(true);
    try {
      // Fetching without orderBy to avoid index requirement for __name__ desc
      // We'll sort and limit client-side since the collection is small (one doc per day)
      const querySnapshot = await getDocs(collection(db, 'analytics'));
      const data = querySnapshot.docs.map(doc => ({
        date: doc.id,
        ...doc.data()
      }));
      
      // Sort by date (id) descending and take last 7
      const sortedData = data
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 7)
        .reverse(); // Back to ascending for chart display

      setAnalyticsData(sortedData);
    } catch (e) {
      console.error("Analytics fetch error:", e);
      // No alert here, just handle silently in UI
    } finally {
      setIsFetchingAnalytics(false);
    }
  };

  useEffect(() => {
    // Reset active section when translations load or lang changes if needed
    if (editedTranslations && !activeSection) {
      const sections = Object.keys(editedTranslations[activeLang]);
      if (sections.length > 0) setActiveSection(sections[0]);
    }
  }, [editedTranslations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (e: any) {
      console.error("Login error:", e);
      setLoginError('Грешен имейл или парола.');
    }
  };

  const handleRegisterFirstAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      setLoginError('Паролите не съвпадат.');
      return;
    }
    if (regPassword.length < 6) {
      setLoginError('Паролата трябва да е поне 6 символа.');
      return;
    }
    setLoginError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const currentUser = userCredential.user;

      // Create admin doc and system status
      await setDoc(doc(db, 'admins', currentUser.uid), {
        email: regEmail,
        createdAt: serverTimestamp(),
        role: 'super_admin'
      });
      
      await setDoc(doc(db, 'config', 'system_status'), {
        initialized: true,
        initializedAt: serverTimestamp(),
        setupBy: regEmail
      });

      setIsSystemInitialized(true);
      setIsAdmin(true);
    } catch (e: any) {
      console.error("Registration error:", e);
      setLoginError('Грешка при регистрация: ' + (e.message || 'Неизвестна грешка'));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail) return;
    setIsAddingAdmin(true);
    try {
      // Create an invite. The user will need to register with this email.
      const inviteId = `invite_${newAdminEmail.replace(/\./g, '_')}`;
      await setDoc(doc(db, 'admins', inviteId), {
        email: newAdminEmail,
        role: 'admin',
        isInvite: true,
        invitedBy: user.email,
        createdAt: serverTimestamp()
      });
      
      setNewAdminEmail('');
      setNewAdminPassword('');
      alert(`Потребителят ${newAdminEmail} е добавен в списъка с поканени. Той трябва да се регистрира със същия имейл.`);
    } catch (error) {
      console.error("Error adding admin:", error);
      alert('Грешка при добавяне на потребител.');
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    if (adminId === user?.uid) return; // Can't delete self
    try {
      await deleteDoc(doc(db, 'admins', adminId));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    const configPath = 'config/site';
    try {
      const configRef = doc(db, configPath);
      await setDoc(configRef, {
        translations: editedTranslations,
        pricingData: editedPricing,
        taxiNumbers: editedNumbers,
        mainPhone: editedMainPhone,
        seo: editedSeo,
        links: editedLinks,
        updatedAt: serverTimestamp()
      });
      setSaveStatus('success');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, configPath);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw size={40} className="animate-spin text-blue-700 dark:text-blue-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Helmet>
          <title>{isSystemInitialized === false ? 'Първоначална Регистрация' : 'Вход'} | EH TAXI CMS</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 w-full max-w-md relative overflow-hidden"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-600 mb-2">EH TAXI CMS</h1>
            <p className="text-gray-400">
              {isSystemInitialized === false 
                ? 'Регистрирайте главен администратор' 
                : 'Влезте в контролния панел'}
            </p>
          </div>
          
          {isSystemInitialized === false ? (
            <form onSubmit={handleRegisterFirstAdmin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Админ Имейл</label>
                <input 
                  type="email" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Парола</label>
                <input 
                  type="password" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Потвърди Парола</label>
                <input 
                  type="password" 
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              {(loginError || regError) && <p className="text-red-500 text-sm font-medium text-center">{loginError || regError}</p>}
              <button 
                type="submit"
                className="w-full py-5 bg-blue-700 dark:bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-opacity-90 transition-all active:scale-[0.98] mt-4"
              >
                Регистрирай Админ
              </button>
            </form>
          ) : (
            <AnimatePresence mode="wait">
              {isRegistering ? (
                <motion.form 
                  key="reg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegisterFirstAdmin} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Вашият Имейл</label>
                    <input 
                      type="email" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                      placeholder="трябва да имате покана"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Изберете Парола</label>
                    <input 
                      type="password" 
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Потвърди Парола</label>
                    <input 
                      type="password" 
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  {loginError && <p className="text-red-500 text-sm font-medium text-center">{loginError}</p>}
                  <button 
                    type="submit"
                    className="w-full py-5 bg-[#F6C000] text-blue-700 dark:text-blue-600 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] mt-4"
                  >
                    Регистрация
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsRegistering(false)}
                    className="w-full text-xs text-gray-400 font-bold hover:text-blue-700 dark:hover:text-blue-600"
                  >
                    Вече имате акаунт? Вход
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Имейл</label>
                    <input 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Парола</label>
                    <input 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] focus:border-transparent transition-all outline-none"
                      required
                    />
                  </div>
                  {loginError && <p className="text-red-500 text-sm font-medium text-center">{loginError}</p>}
                  <button 
                    type="submit"
                    className="w-full py-5 bg-blue-700 dark:bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-opacity-90 transition-all active:scale-[0.98] mt-4"
                  >
                    Влез в профила
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="w-full text-xs text-gray-400 font-bold hover:text-blue-700 dark:hover:text-blue-600"
                  >
                    Нямате акаунт? Регистрирайте се с покана
                  </button>
                  
                  {user && (
                    <div className="pt-6 text-center border-t border-gray-50">
                      <p className="text-xs text-gray-400 mb-2">Влезли сте като {user.email}</p>
                      <button 
                        type="button"
                        onClick={handleLogout}
                        className="text-xs text-red-500 font-bold hover:underline"
                      >
                        Излез
                      </button>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          )}
          
          <p className="text-center mt-8 text-xs text-gray-300">
            Система за сигурен администраторски достъп
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Helmet>
        <title>Админ Панел | EH TAXI 6106</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* CMS Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F6C000] rounded-xl flex items-center justify-center font-bold text-blue-700 dark:text-blue-600">CMS</div>
          <div>
            <h1 className="font-extrabold text-blue-700 dark:text-blue-600 leading-tight">EH TAXI 6106</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Административен Панел</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {user?.email}
          </div>
          <a 
            href="/"
            className="text-sm font-bold text-gray-500 hover:text-blue-700 dark:hover:text-blue-600 transition-colors"
          >
            Към сайта
          </a>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 ${
              saveStatus === 'success' ? 'bg-green-500 text-white' : 
              saveStatus === 'error' ? 'bg-red-500 text-white' : 
              'bg-blue-700 dark:bg-blue-600 text-white hover:bg-opacity-95'
            }`}
          >
            {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            {saveStatus === 'success' ? 'Запазено!' : saveStatus === 'error' ? 'Грешка!' : 'Запази промените'}
          </button>
          
          <button 
            onClick={handleLogout}
            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Изход"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* Sidebar Nav */}
        <aside className="w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <LayoutDashboard size={20} />
            Табло
          </button>
          <button 
            onClick={() => { setActiveTab('page_home'); setActiveSection('nav'); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'page_home' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <LayoutDashboard size={20} />
            Начална страница
          </button>
          <button 
            onClick={() => { setActiveTab('page_about'); setActiveSection('about'); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'page_about' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <Users size={20} />
            За Нас
          </button>
          <button 
            onClick={() => { setActiveTab('page_contacts'); setActiveSection('contacts'); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'page_contacts' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <Smartphone size={20} />
            Контакти (Страница)
          </button>
          <button 
            onClick={() => { setActiveTab('page_services'); setActiveSection('serviceTaxi'); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'page_services' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <Briefcase size={20} />
            Услуги
          </button>
          <button 
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'pricing' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <DollarSign size={20} />
            Цени и Тарифи
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'contacts' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <Smartphone size={20} />
            Телефони
          </button>
          <button 
            onClick={() => setActiveTab('seo')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'seo' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <Globe size={20} />
            SEO Настройки
          </button>
          <button 
            onClick={() => setActiveTab('links')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'links' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <Link2 size={20} />
            Връзки
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-blue-700 dark:bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600'}`}
          >
            <Users size={20} />
            Потребители
          </button>

          <div className="mt-12 p-5 bg-blue-50 rounded-2xl border border-blue-100 italic text-[11px] text-blue-700 leading-relaxed text-center">
            Сигурни правила са приложени към Firestore. Само оторизирани администратори имат достъп.
          </div>
        </aside>

        {/* Content Area */}
        <main className="grow">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Analytics Info */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 flex justify-between items-center text-center md:text-left flex-col md:flex-row gap-6">
                  <div>
                    <h2 className="text-lg font-extrabold text-blue-700 dark:text-blue-600">Първоначална Настройка</h2>
                    <p className="text-sm text-gray-500">Ако сайтът показва подразбиращ се текст, използвайте това за обновяване на информацията.</p>
                  </div>
                  <button 
                    onClick={handleSave}
                    className="px-6 py-3 bg-[#F6C000] text-blue-700 dark:text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Обнови данни на сайта
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 rounded-xl text-blue-700 dark:text-blue-600">
                        <TrendingUp size={24} />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Днес</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-500 mb-1">Общо посещения</h3>
                    <p className="text-4xl font-black text-blue-700 dark:text-blue-600">
                      {analyticsData.length > 0 ? analyticsData[analyticsData.length - 1].totalVisits || 0 : '0'}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-50 rounded-xl text-green-600">
                        <Smartphone size={24} />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Общо</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-500 mb-1">Взаимодействия с приложението</h3>
                    <p className="text-4xl font-black text-blue-700 dark:text-blue-600">
                      {analyticsData.length > 0 
                        ? (analyticsData[analyticsData.length - 1].pages?.app_store || 0) + 
                          (analyticsData[analyticsData.length - 1].pages?.google_play || 0) 
                        : '0'}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                        <MousePointer2 size={24} />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Общо</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-500 mb-1">Опити за поръчка (Позвънявания)</h3>
                    <p className="text-4xl font-black text-blue-700 dark:text-blue-600">
                      {analyticsData.reduce((acc, curr) => {
                        const callIntents = Object.keys(curr.pages || {})
                          .filter(k => k.startsWith('call_'))
                          .reduce((sum, k) => sum + (curr.pages[k] || 0), 0);
                        return acc + callIntents;
                      }, 0)}
                    </p>
                  </div>
                </div>

                {/* Popular Pages / Events */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-gray-100">
                    <h2 className="text-lg font-extrabold text-blue-700 dark:text-blue-600">Популярни действия (Днес)</h2>
                  </div>
                  <div className="p-8">
                    {analyticsData.length > 0 && analyticsData[analyticsData.length - 1].pages ? (
                      <div className="space-y-4">
                        {Object.entries(analyticsData[analyticsData.length - 1].pages)
                          .sort(([, a], [, b]) => (b as number) - (a as number))
                          .map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                              <span className="font-bold text-gray-700 capitalize">{key.replace(/_/g, ' ')}</span>
                              <span className="px-3 py-1 bg-blue-700 dark:bg-blue-600 text-white rounded-lg font-black text-xs">{value as number}</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-10">Все още няма данни за днес.</p>
                    )}
                  </div>
                </div>

                {/* Daily Trend Chart (Simplified) */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                  <h2 className="text-lg font-extrabold text-blue-700 dark:text-blue-600 mb-8">Тренд на посещенията (Последни 7 дни)</h2>
                  <div className="h-48 flex items-end justify-between gap-4">
                    {analyticsData.map((day, i) => {
                      const max = Math.max(...analyticsData.map(d => d.totalVisits || 0), 1);
                      const height = ((day.totalVisits || 0) / max) * 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3">
                          <div className="relative group w-full">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              className="w-full bg-blue-100 rounded-t-xl hover:bg-[#F6C000] transition-colors"
                            />
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-700 dark:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl">
                              {day.totalVisits || 0} посещения
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400">{day.date.split('-').slice(1).join('/')}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {['page_home', 'page_about', 'page_contacts', 'page_services'].includes(activeTab) && editedTranslations && (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Language Switcher */}
                <div className="flex bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm w-fit">
                  {(['bg', 'en'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-8 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                        activeLang === lang ? 'bg-[#F6C000] text-blue-700 dark:text-blue-600 shadow-md' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Globe size={14} />
                      {lang === 'bg' ? 'Български' : 'English'}
                    </button>
                  ))}
                </div>

                <div className="flex gap-8">
                  {/* Section Sidebar (Sub-navigation) */}
                  <div className="w-64 shrink-0 space-y-1">
                    {activeTab === 'page_home' && (
                      <div className="space-y-1">
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Начална страница</p>
                        {['nav', 'hero', 'features', 'pricing', 'services', 'order', 'footer'].map(sectionKey => (
                          <button
                            key={sectionKey}
                            onClick={() => setActiveSection(sectionKey)}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeSection === sectionKey ? 'bg-white border-l-4 border-[#F6C000] text-blue-700 dark:text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                          >
                            {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                    {activeTab === 'page_about' && (
                       <div className="space-y-1">
                         <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">За Нас</p>
                         <button onClick={() => setActiveSection('about')} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeSection === 'about' ? 'bg-white border-l-4 border-[#F6C000] text-blue-700 dark:text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}>Основно Съдържание</button>
                       </div>
                    )}
                    {activeTab === 'page_contacts' && (
                       <div className="space-y-1">
                         <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Контакти</p>
                         <button onClick={() => setActiveSection('contacts')} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeSection === 'contacts' ? 'bg-white border-l-4 border-[#F6C000] text-blue-700 dark:text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}>Данни за контакт</button>
                       </div>
                    )}
                    {activeTab === 'page_services' && (
                       <div className="space-y-1">
                         <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Услуги</p>
                         {['serviceTaxi', 'serviceCorporate', 'serviceTransfers', 'serviceDrinkDrive'].map(serviceKey => (
                            <button
                              key={serviceKey}
                              onClick={() => setActiveSection(serviceKey)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${activeSection === serviceKey ? 'bg-white border-l-4 border-[#F6C000] text-blue-700 dark:text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                              {serviceKey.replace('service', '')}
                            </button>
                         ))}
                       </div>
                    )}
                  </div>

                  {/* Fields Editor */}
                  <div className="grow bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden min-h-[600px]">
                    <div className="px-8 py-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="font-extrabold text-blue-700 dark:text-blue-600 uppercase tracking-widest text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#F6C000] rounded-full"></div>
                        Секция: <span className="text-[#F6C000]">{activeSection}</span>
                      </h2>
                      {activeLang === 'bg' && (
                        <div className="text-[10px] font-bold text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200">
                           Авто-преводът е активен за Български
                        </div>
                      )}
                    </div>
                    <div className="p-8 space-y-8">
                      {editedTranslations[activeLang][activeSection] && (
                        <div className="space-y-6">
                           {Object.keys(editedTranslations[activeLang][activeSection]).map(fieldKey => {
                             const value = editedTranslations[activeLang][activeSection][fieldKey];
                             
                             if (typeof value === 'string') {
                               const isTranslatingField = isTranslating === fieldKey;
                               return (
                                 <div key={fieldKey} className="space-y-2 group">
                                   <div className="flex justify-between items-center">
                                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{fieldKey}</label>
                                      {activeLang === 'bg' && (
                                        <button 
                                          onClick={() => translateText(value, fieldKey, activeSection)}
                                          disabled={!!isTranslating}
                                          className="text-[10px] font-black text-blue-700 dark:text-blue-600 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all hover:text-[#F6C000] bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200"
                                        >
                                          <Sparkles size={12} className={isTranslatingField ? 'animate-spin' : ''} />
                                          {isTranslatingField ? 'Превежда се...' : 'Преведи на EN'}
                                        </button>
                                      )}
                                   </div>
                                   <textarea 
                                     value={value}
                                     onChange={(e) => {
                                       const newVal = e.target.value;
                                       setEditedTranslations((prev: any) => {
                                         const updated = {...prev};
                                         updated[activeLang][activeSection][fieldKey] = newVal;
                                         return updated;
                                       });
                                     }}
                                     className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all font-medium text-gray-700 leading-relaxed"
                                     rows={value.length > 50 ? 3 : 2}
                                   />
                                 </div>
                               );
                             }

                             if (Array.isArray(value)) {
                               return (
                                 <div key={fieldKey} className="space-y-4 pt-4">
                                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{fieldKey}</label>
                                   <div className="grid grid-cols-1 gap-4">
                                     {value.map((item: any, idx: number) => (
                                       <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 relative group/item">
                                         <div className="absolute top-4 right-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Елемент #{idx + 1}</div>
                                         {Object.keys(item).map(itemKey => {
                                           const isTranslatingItem = isTranslating === `${fieldKey}_${idx}_${itemKey}`;
                                           return (
                                             <div key={itemKey}>
                                               <div className="flex justify-between items-center mb-1">
                                                  <label className="text-[10px] font-bold text-gray-400 uppercase">{itemKey}</label>
                                                  {activeLang === 'bg' && (
                                                    <button 
                                                      onClick={() => translateText(item[itemKey], fieldKey, activeSection, idx, itemKey as any)}
                                                      disabled={!!isTranslating}
                                                      className="text-[9px] font-black text-blue-700 dark:text-blue-600 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-all hover:text-[#F6C000]"
                                                    >
                                                      <Sparkles size={10} className={isTranslatingItem ? 'animate-spin' : ''} />
                                                      {isTranslatingItem ? '...' : 'Преведи'}
                                                    </button>
                                                  )}
                                               </div>
                                               <input 
                                                 value={item[itemKey]}
                                                 onChange={(e) => {
                                                   const newVal = e.target.value;
                                                   setEditedTranslations((prev: any) => {
                                                     const updated = {...prev};
                                                     updated[activeLang][activeSection][fieldKey][idx][itemKey] = newVal;
                                                     return updated;
                                                   });
                                                 }}
                                                 className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#F6C000] text-sm font-medium"
                                               />
                                             </div>
                                           );
                                         })}
                                       </div>
                                     ))}
                                   </div>
                                 </div>
                               );
                             }
                             return null;
                           })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pricing' && (
              <motion.div 
                key="pricing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-extrabold text-blue-700 dark:text-blue-600">Управление на ценоразписа</h2>
                </div>
                <div className="p-8">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                        <th className="pb-4">Етикет (За вътрешна референция)</th>
                        <th className="pb-4">Дневна цена</th>
                        <th className="pb-4">Нощна цена</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {editedPricing.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-6 pr-4">
                            <input 
                              value={item.label}
                              onChange={(e) => {
                                const newPricing = [...editedPricing];
                                newPricing[idx].label = e.target.value;
                                setEditedPricing(newPricing);
                              }}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#F6C000]"
                            />
                          </td>
                          <td className="py-6 pr-4">
                            <input 
                              value={item.dayPrice}
                              onChange={(e) => {
                                const newPricing = [...editedPricing];
                                newPricing[idx].dayPrice = e.target.value;
                                setEditedPricing(newPricing);
                              }}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#F6C000]"
                            />
                          </td>
                          <td className="py-6">
                            <input 
                              value={item.nightPrice}
                              onChange={(e) => {
                                const newPricing = [...editedPricing];
                                newPricing[idx].nightPrice = e.target.value;
                                setEditedPricing(newPricing);
                              }}
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#F6C000]"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="mt-10 p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                    <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
                       <AlertCircle size={18} />
                       Промените в цените ще се отразят веднага в калкулатора за клиенти.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contacts' && (
              <motion.div 
                key="contacts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 space-y-8"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-blue-700 dark:text-blue-600 mb-4">Основен телефон за поръчки</h2>
                  <p className="text-xs text-gray-400 mb-4">Този номер ще се ползва за всички Call-to-Action бутони в сайта.</p>
                  <input 
                    value={editedMainPhone}
                    onChange={(e) => setEditedMainPhone(e.target.value)}
                    className="w-full max-w-md px-5 py-4 bg-gray-50 border-2 border-[#F6C000] rounded-2xl outline-none focus:ring-4 focus:ring-[#F6C000]/10 font-black text-2xl text-blue-700 dark:text-blue-600"
                    placeholder="042 6106"
                  />
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h2 className="text-xl font-extrabold text-blue-700 dark:text-blue-600 mb-4">Телефони на диспечерите</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {editedNumbers.map((num, idx) => (
                      <div key={idx} className="relative group">
                        <input 
                          value={num}
                          onChange={(e) => {
                            const newNums = [...editedNumbers];
                            newNums[idx] = e.target.value;
                            setEditedNumbers(newNums);
                          }}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#F6C000] font-bold text-blue-700 dark:text-blue-600"
                        />
                        <button 
                          onClick={() => {
                            const newNums = editedNumbers.filter((_, i) => i !== idx);
                            setEditedNumbers(newNums);
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => setEditedNumbers([...editedNumbers, ''])}
                      className="px-5 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-[#F6C000] hover:text-[#F6C000] transition-all"
                    >
                      + Добави номер
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'seo' && editedSeo && (
              <motion.div 
                key="seo"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h2 className="text-xl font-extrabold text-blue-700 dark:text-blue-600 uppercase tracking-widest text-sm">Оптимизация за търсачки (SEO)</h2>
                </div>
                <div className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Meta Заглавие (Title)</label>
                      <input 
                        type="text"
                        value={editedSeo.title}
                        onChange={(e) => setEditedSeo({...editedSeo, title: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all font-medium text-gray-700"
                        placeholder="Заглавие за търсачки"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Meta Описание (Description)</label>
                      <textarea 
                        value={editedSeo.description}
                        onChange={(e) => setEditedSeo({...editedSeo, description: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all font-medium text-gray-700 min-h-[100px]"
                        placeholder="Кратко резюме на сайта"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ключови думи (Разделени със запетая)</label>
                      <input 
                        type="text"
                        value={editedSeo.keywords}
                        onChange={(e) => setEditedSeo({...editedSeo, keywords: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all font-medium text-gray-700"
                        placeholder="taxi, transport, 6106"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">OG Изображение (URL за социални мрежи)</label>
                      <input 
                        type="text"
                        value={editedSeo.ogImage}
                        onChange={(e) => setEditedSeo({...editedSeo, ogImage: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all font-medium text-gray-700"
                        placeholder="https://example.com/og-image.jpg"
                      />
                      {editedSeo.ogImage && (
                        <div className="mt-4 p-2 bg-gray-100 rounded-xl overflow-hidden aspect-[1200/630] max-w-sm">
                           <img src={editedSeo.ogImage} alt="OG Preview" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                       <Globe size={18} />
                       SEO промените влияят на това как изглежда сайтът ви в Google и социалните мрежи.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'links' && editedLinks && (
              <motion.div 
                key="links"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
                  <h2 className="text-xl font-extrabold text-blue-700 dark:text-blue-600 uppercase tracking-widest text-sm">Външни Връзки</h2>
                </div>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Social Section */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Социални Мрежи</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                            <Facebook size={14} className="text-blue-700 dark:text-blue-600" /> Facebook
                          </label>
                          <input 
                            type="text" 
                            value={editedLinks.facebook || ''}
                            onChange={(e) => setEditedLinks({...editedLinks, facebook: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all text-sm font-medium"
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                            <Instagram size={14} className="text-pink-600" /> Instagram
                          </label>
                          <input 
                            type="text" 
                            value={editedLinks.instagram || ''}
                            onChange={(e) => setEditedLinks({...editedLinks, instagram: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all text-sm font-medium"
                            placeholder="https://instagram.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                            <Twitter size={14} className="text-black" /> X / Twitter
                          </label>
                          <input 
                            type="text" 
                            value={editedLinks.twitter || ''}
                            onChange={(e) => setEditedLinks({...editedLinks, twitter: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all text-sm font-medium"
                            placeholder="https://x.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                            <span className="font-bold text-[10px]">TIKTOK</span> Tiktok
                          </label>
                          <input 
                            type="text" 
                            value={editedLinks.tiktok || ''}
                            onChange={(e) => setEditedLinks({...editedLinks, tiktok: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all text-sm font-medium"
                            placeholder="https://tiktok.com/@..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* App Stores Section */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Приложения</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                            <Apple size={14} className="text-gray-900" /> App Store
                          </label>
                          <input 
                            type="text" 
                            value={editedLinks.appleStore || ''}
                            onChange={(e) => setEditedLinks({...editedLinks, appleStore: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all text-sm font-medium"
                            placeholder="Линк към Apple App Store"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                            <Play size={14} className="text-green-600" /> Google Play
                          </label>
                          <input 
                            type="text" 
                            value={editedLinks.googlePlay || ''}
                            onChange={(e) => setEditedLinks({...editedLinks, googlePlay: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#F6C000] outline-none transition-all text-sm font-medium"
                            placeholder="Линк към Google Play Store"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-blue-700">
                    <p className="flex items-center gap-2 font-medium">
                      <Link2 size={18} />
                      Празните полета няма да се появяват на сайта.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div 
                key="users"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-blue-700 dark:text-blue-600" />
                      <h2 className="text-lg font-extrabold text-blue-700 dark:text-blue-600">Администратори</h2>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Add User Section */}
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row gap-4 items-end">
                      <div className="grow space-y-2 w-full">
                        <label className="text-xs font-bold text-blue-800 uppercase flex items-center gap-2">
                          <Mail size={14} /> Добави имейл за покана
                        </label>
                        <input 
                          type="email"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="vanko@gmail.com"
                          className="w-full px-5 py-3 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-600 outline-none transition-all text-sm"
                        />
                      </div>
                      <button 
                        onClick={handleAddAdmin}
                        disabled={isAddingAdmin || !newAdminEmail}
                        className="px-6 py-3 bg-blue-700 dark:bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-2 shrink-0 h-[52px]"
                      >
                        {isAddingAdmin ? <RefreshCw size={18} className="animate-spin" /> : <UserPlus size={18} />}
                        Изпрати покана
                      </button>
                    </div>

                    {/* Users List */}
                    <div className="space-y-4">
                      {adminsList.map((admin) => (
                        <div key={admin.id} className="flex justify-between items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-blue-700 dark:text-blue-600">
                              <Users size={24} />
                            </div>
                            <div>
                              <div className="font-bold text-gray-800">{admin.name || admin.email}</div>
                              <div className="text-xs text-gray-400 font-medium">{admin.email}</div>
                              {admin.role === 'super_admin' && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-md text-[10px] font-black uppercase">Главен Админ</span>
                              )}
                              {admin.isInvite && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[10px] font-black uppercase tracking-widest">Очаква регистрация</span>
                              )}
                            </div>
                          </div>
                          
                          {admin.id !== user?.uid && admin.role !== 'super_admin' && (
                            <button 
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Премахни"
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                  <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
                    <AlertCircle size={18} />
                    Администраторите, добавени чрез имейл, трябва да се регистрират сами чрез формата за вход, като използват същия имейл адрес.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 text-center text-gray-400 text-xs">
        Система Версия: 1.1.0-CMS | Разработено за EH TAXI 6106
      </footer>
    </div>
  );
}
