# Cartella Foto per Antonio & Katia - KaBlog (25 Anni) 📸

Inserisci qui i tuoi file immagine per i **5 Metodi** del blog!

### Nomi file preconfigurati per ciascun metodo:
Per visualizzare le tue foto personali senza dover modificare il codice, basta copiare i file immagine in questa cartella (`public/photos/`) rinominandoli così:

1. **Metodo 1 (La Giovinezza)**: `metodo1_giovinezza.jpg`
2. **Metodo 2 (Il Matrimonio)**: `metodo2_matrimonio.jpg`
3. **Metodo 3 (La Famiglia)**: `metodo3_famiglia.jpg`
4. **Metodo 4 (I Viaggi)**: `metodo4_viaggi.jpg`
5. **Metodo 5 (Gli Amici)**: `metodo5_amici.jpg`

---

### Se usi un nome o un formato diverso (es. .png o .jpeg):
Puoi aprire [`src/data/blogData.js`](file:///d:/Simone/WebApps/kablog/src/data/blogData.js) e cambiare la voce `url` dentro `methodImage`, per esempio:
```javascript
methodImage: {
  url: "/photos/mio_file_nozze.png",
  ...
}
```

*Nota:* Finché non aggiungi i tuoi file, il sito mostrerà automaticamente un'immagine di riserva di alta qualità, senza mostrare icone di errore o immagini spezzate!
