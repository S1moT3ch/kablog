import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import SidebarNav from './components/SidebarNav';
import Hero from './components/Hero';
import FunnyStats from './components/FunnyStats';
import ThematicGallery from './components/ThematicGallery';
import CoupleQuiz from './components/CoupleQuiz';
import ToastGenerator from './components/ToastGenerator';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';

import {
  coupleData,
  survivalStats,
  thematicSections,
  coupleQuiz,
  funnyToasts,
  initialGuestbook
} from './data/blogData';
import { launchLocalVideo } from './utils/videoLauncher';
import { triggerGrandConfetti } from './utils/celebration';

import './App.css';

export default function App() {
  const [photoLikes, setPhotoLikes] = useState({});
  const [videoNotification, setVideoNotification] = useState(null);
  const [showAuguri, setShowAuguri] = useState(false);
  const auguriTimerRef = useRef(null);

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
    }, 3400);
  };

  const handleLaunchVideo = async (sectionId, sectionTitle) => {
    setVideoNotification({
      message: `Avvio di VLC in corso per "${sectionTitle || sectionId}"...`,
      type: 'info'
    });

    const result = await launchLocalVideo(sectionId);

    if (result && result.ok) {
      setVideoNotification({
        message: `🎬 VLC avviato a tutto schermo: ${result.fileName || sectionTitle || sectionId}!`,
        type: 'success'
      });
    } else {
      const expected = result?.expectedFile || `${sectionId}.mp4`;
      setVideoNotification({
        message: `⚠️ File video "${expected}" non trovato! Copialo nella cartella 'videos/'`,
        type: 'warning'
      });
    }

    setTimeout(() => {
      setVideoNotification(null);
    }, 5500);
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
      {/* Top Fixed Header con Menù a Tendina delle Sezioni */}
      <Navbar 
        groomName={coupleData.groomName} 
        brideName={coupleData.brideName}
        sections={thematicSections}
        onLaunchVideo={handleLaunchVideo}
        onBrindisi={handleCelebrateBrindisi}
      />

      {/* Menù di Navigazione Laterale Fluttuante (Sidebar Drawer) */}
      <SidebarNav 
        sections={thematicSections}
        onLaunchVideo={handleLaunchVideo}
      />

      {/* Notifica Fluttuante di Avvio VLC */}
      {videoNotification && (
        <div className={`vlc-toast-notification toast-${videoNotification.type}`}>
          <div className="vlc-toast-content">
            <span className="vlc-toast-icon">🎬</span>
            <span className="vlc-toast-text">{videoNotification.message}</span>
          </div>
        </div>
      )}

      {/* Scritta Grande "Auguri!!!" al Centro Schermo (Sola scritta, senza box, fluttuante tra i coriandoli) */}
      {showAuguri && (
        <div className="auguri-floating-layer" aria-live="polite">
          <span className="auguri-standalone-text">Auguri!!!</span>
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

        {/* Gioco della festa: Quiz "Chi ha detto cosa?" */}
        <CoupleQuiz quizData={coupleQuiz} />

        {/* Generatore di Brindisi per gli invitati */}
        <ToastGenerator 
          toasts={funnyToasts} 
          onBrindisi={handleCelebrateBrindisi}
        />

        {/* Guestbook interattivo dei consigli */}
        <Guestbook initialEntries={initialGuestbook} />
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
