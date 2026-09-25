import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import SidebarNav from './components/SidebarNav';
import Hero from './components/Hero';
import FunnyStats from './components/FunnyStats';
import ThematicGallery from './components/ThematicGallery';
import ToastGenerator from './components/ToastGenerator';
import ContributiSection from './components/ContributiSection';
import Footer from './components/Footer';

import {
  coupleData,
  survivalStats,
  thematicSections,
  funnyToasts
} from './data/blogData';
import { launchLocalVideo } from './utils/videoLauncher';
import { triggerGrandConfetti } from './utils/celebration';

import './App.css';

export default function App() {
  const [photoLikes, setPhotoLikes] = useState({});
  const [showAuguri, setShowAuguri] = useState(false);
  const [isIndiceOpen, setIsIndiceOpen] = useState(false);
  const auguriTimerRef = useRef(null);

  const handleToggleIndice = () => {
    setIsIndiceOpen(prev => !prev);
  };

  const handleCloseIndice = () => {
    setIsIndiceOpen(false);
  };

  const handleCelebrateBrindisi = () => {
    // 1. Spettacolare pioggia di coriandoli su più onde
    triggerGrandConfetti();

    // 2. Banner grande "Auguri!!!" al centro dello schermo
    setShowAuguri(true);

    if (auguriTimerRef.current) {
      clearTimeout(auguriTimerRef.current);
    }
    auguriTimerRef.current = setTimeout(() => {
      setShowAuguri(false);
    }, 4000);
  };

  const handleLaunchVideo = async (sectionId, sectionTitle) => {
    console.log(`[VLC] Richiesta apertura video per "${sectionTitle || sectionId}" (ID: ${sectionId})...`);

    try {
      const result = await launchLocalVideo(sectionId);

      if (result && result.ok) {
        console.log(`[VLC] 🎬 VLC avviato a tutto schermo: ${result.fileName || sectionTitle || sectionId}`, result);
      } else {
        const expected = result?.expectedFile || `${sectionId}.mp4`;
        console.warn(`[VLC] ⚠️ File video "${expected}" non trovato o errore nell'avvio:`, result);
      }
    } catch (err) {
      console.error(`[VLC] ❌ Errore durante l'apertura del video:`, err);
    }
  };

  const handleLikePhoto = (photoId) => {
    setPhotoLikes((prev) => {
      const current = prev[photoId] !== undefined ? prev[photoId] : 0;
      return {
        ...prev,
        [photoId]: current + 1
      };
    });
  };

  return (
    <div className="app-layout">
      {/* Top Fixed Header con Menù a Tendina delle Sezioni e Tasto Indice a sinistra del logo */}
      <Navbar 
        groomName={coupleData.groomName} 
        brideName={coupleData.brideName}
        sections={thematicSections}
        onLaunchVideo={handleLaunchVideo}
        onBrindisi={handleCelebrateBrindisi}
        onToggleIndice={handleToggleIndice}
        isIndiceOpen={isIndiceOpen}
      />

      {/* Menù di Navigazione Laterale (Sidebar Drawer aperto dal tasto Indice) */}
      <SidebarNav 
        sections={thematicSections}
        onLaunchVideo={handleLaunchVideo}
        isOpen={isIndiceOpen}
        onClose={handleCloseIndice}
      />


      {/* Scritta Grande "Auguri!!!" al Centro Schermo (Sola scritta, senza box, fluttuante tra i coriandoli) */}
      {showAuguri && (
        <div className="auguri-floating-layer" aria-live="polite">
          <div className="auguri-pulse-wrapper">
            <span className="auguri-standalone-text">Auguri!!!</span>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section con Contatore di Sopravvivenza */}
        <Hero 
          coupleData={coupleData} 
          onBrindisi={handleCelebrateBrindisi}
        />

        {/* Statistiche Divertenti sui 25 Anni */}
        <FunnyStats stats={survivalStats} />

        {/* Sezioni Tematiche con Lancio Diretto di VLC dal Tasto Verde Play */}
        <ThematicGallery 
          sections={thematicSections}
          onLaunchVideo={handleLaunchVideo}
          photoLikes={photoLikes}
          onLikePhoto={handleLikePhoto}
        />


        {/* Generatore di Brindisi per gli invitati */}
        <ToastGenerator 
          toasts={funnyToasts} 
          onBrindisi={handleCelebrateBrindisi}
        />

        {/* Video-Contributi e Dediche Speciali dei Lettori */}
        <ContributiSection onLaunchVideo={handleLaunchVideo} />
      </main>

      {/* Footer celebrativo */}
      <Footer 
        groomName={coupleData.groomName} 
        brideName={coupleData.brideName} 
        onBrindisi={handleCelebrateBrindisi}
      />
    </div>
  );
}
