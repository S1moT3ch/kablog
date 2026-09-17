import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SidebarNav from './components/SidebarNav';
import Hero from './components/Hero';
import FunnyStats from './components/FunnyStats';
import ThematicGallery from './components/ThematicGallery';
import ThemeSlideshow from './components/ThemeSlideshow';
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

import './App.css';

export default function App() {
  const [activeSlideshowSection, setActiveSlideshowSection] = useState(null);
  const [slideshowInitialIndex, setSlideshowInitialIndex] = useState(0);
  const [photoLikes, setPhotoLikes] = useState({});

  const handleStartSlideshow = (section, initialIndex = 0) => {
    setActiveSlideshowSection(section);
    setSlideshowInitialIndex(initialIndex);
  };

  const handleCloseSlideshow = () => {
    setActiveSlideshowSection(null);
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
        onStartSlideshow={handleStartSlideshow}
      />

      {/* Menù di Navigazione Laterale Fluttuante (Sidebar Drawer) */}
      <SidebarNav 
        sections={thematicSections}
        onStartSlideshow={handleStartSlideshow}
      />

      <main>
        {/* Hero Section con Contatore di Sopravvivenza */}
        <Hero coupleData={coupleData} />

        {/* Statistiche Divertenti sui 25 Anni */}
        <FunnyStats stats={survivalStats} />

        {/* Sezioni Tematiche con Lancio dello Slideshow Cinematografico */}
        <ThematicGallery 
          sections={thematicSections}
          onStartSlideshow={handleStartSlideshow}
          photoLikes={photoLikes}
          onLikePhoto={handleLikePhoto}
        />

        {/* Gioco della festa: Quiz "Chi ha detto cosa?" */}
        <CoupleQuiz quizData={coupleQuiz} />

        {/* Generatore di Brindisi per gli invitati */}
        <ToastGenerator toasts={funnyToasts} />

        {/* Guestbook interattivo dei consigli */}
        <Guestbook initialEntries={initialGuestbook} />
      </main>

      {/* Slideshow a Schermo Intero per la Registrazione Schermo con Voiceover */}
      {activeSlideshowSection && (
        <ThemeSlideshow
          section={activeSlideshowSection}
          initialIndex={slideshowInitialIndex}
          onClose={handleCloseSlideshow}
        />
      )}

      {/* Footer celebrativo */}
      <Footer 
        groomName={coupleData.groomName} 
        brideName={coupleData.brideName} 
      />
    </div>
  );
}
