# Authentication Design Activities – Prototyp

Konzept und Inhalte: Marie Beuthel · entstanden im Rahmen einer Dissertation an der Universität der Künste Berlin, Design Research Lab, in Reflexion von Projekten mit der Bundesdruckerei GmbH.

Digitale Version des Toolkits „Authentication Design Activities“: 33 Aktivitäten in 7 Kategorien, Methodenbibliothek, Umschaltung EN/DE.

## Dateien

- `index.html` – Seite und Gestaltung (Farben, Schrift, Layout)
- `fonts/` – eingebettete Schrift Fira Sans (SIL Open Font License), damit keine externen Server (Google Fonts) angefragt werden. **Ordner mit hochladen.**
- `refs.js` – Literaturreferenzen mit Bezug zu Methoden und Aktivitäten. **Hier ergänzen.**
- `data.js` – alle Inhalte: Kategorien, Aktivitäten, Methoden, Texte EN/DE. **Texte hier überarbeiten.**
- `app.js` – Logik und Interaktionen

Es gibt keinen Build-Schritt und keinen Server. Die Daten bleiben im Browser der Nutzer*innen (localStorage) und lassen sich über „Sichern & laden“ als Datei sichern.

## Kostenlos auf GitHub Pages veröffentlichen

1. Auf github.com kostenlos registrieren und **New repository** anlegen, z. B. `authentication-design-activities`, Sichtbarkeit **Public**.
2. Im Repository auf **Add file → Upload files** klicken, die Dateien und den Ordner `fonts` (`index.html`, `data.js`, `refs.js`, `app.js`, `fonts/`, optional diese README) hineinziehen und **Commit changes** klicken.
3. **Settings → Pages** öffnen, unter „Build and deployment“ als Source **Deploy from a branch** wählen, Branch `main` und Ordner `/ (root)`, dann **Save**.
4. Nach ein bis zwei Minuten ist das Tool erreichbar unter
   `https://<dein-github-name>.github.io/authentication-design-activities/`

Änderungen: Datei im Repository öffnen, auf den Stift klicken, bearbeiten, „Commit changes“. Die Seite aktualisiert sich automatisch.

## Ohne GitHub nutzen (z. B. im Seminar)

ZIP-Datei **entpacken** (nicht direkt aus der ZIP öffnen) und `index.html` im Browser öffnen. Das Tool läuft dann offline. Jede Person arbeitet in ihrem eigenen Browser; den Stand tauscht ihr über die Projektdatei (`.ada.json`) aus. Das Tool funktioniert auch komplett offline.

## Export

- **Projektdatei (.ada.json)** – kompletter Arbeitsstand zum späteren Weiterbearbeiten, auch auf einem anderen Gerät
- **PDF-Bericht** – alle Aktivitäten mit Inhalt, inkl. Grafiken; im Druckdialog „Als PDF speichern“ wählen

## Interaktive Aktivitäten (Stand Prototyp v3)

- **2 Process** – Methoden pro Kategorie als geplant oder gemacht markieren, mit Verantwortlichen
- **6 User Journey** – Schritte auf eine Zeitachse klicken und ziehen, Touch Points markieren, Swimlanes ausfüllen
- **10 Emotional Security Zones** – Daten in verschachtelte Zonen ziehen, emotionale und technische Zonen, Übernahme aus Aktivität 8
- **5 Context, People, Data & Interactions** – Stichworte in konzentrische Kreise ziehen
- **9 Emotional Value** – Nähe von Daten zu Personen auf vertikalen Linien
- **14 Setup Map** – Grundriss hochladen, Touch Points, Bewegungen, Bereiche und Zonen einzeichnen, mehrere Pläne
- **15 Classified Directions** – Kreuze auf Polaritäten setzen, Profil-Linie, eigene Parameter
- **21 Feedback & Feedforward** – Kanäle wählen, Licht-/Tonmuster tippen und abspielen
- **22 Feedback & Feedforward Process** – Ablauf aus Karten, Schleifen für erneute Versuche, automatische Prüfung
- **26 Authentication Principles** – vier Quadranten mit Ideen zum Anklicken
- **27 Multi-Factor Authentication** – Faktor-Karten zu Kombinationen zusammenstellen, automatische Einordnung 2/3/4+ und Hinweis bei gleichen Prinzipien
- **28 Near vs. Far Visionary Concepts** – Konzepte ins Zukunftsfeld ziehen
- **33 Summary** – füllt sich automatisch aus den anderen Aktivitäten

Seit v6 sind alle 33 Aktivitäten interaktiv.

## Vor dem Veröffentlichen

- **Impressum** in `data.js` unter `ADA_ABOUT.impressum` ergänzen (Anschrift, E-Mail). Leere Felder werden nicht angezeigt.
- **Zitiervorschlag** (Jahr, ggf. Titel der Dissertation) unter `ADA_ABOUT.cite` prüfen.

## Interaktiv seit v4

- **8** digital / hybrid / analog mit Verbindungen · **11** Interaction-Relabelling-Kartenstapel · **13** Anforderungen aus Zitaten mit Priorität · **20** Storyboard mit Skizzenfläche · **30** Klebezettel-Wand · **32** Mindmap mit Strategien

## Neu in v5

- Interaktiv: **3** Gruppenkarten mit Rollen · **4** Einbindung pro Gruppe (Stufe, Methoden, Gegenleistung) · **7** Interaktionen skizzieren · **16** Konzeptvisualisierung (wie Setup-Map) · **18** Perspektiven-Stern mit „Passung“ · **19** Service Blueprint mit Sichtbarkeitslinie · **23** Muster-Waben · **25** Vorbereitungskette (Pflicht vs. Ritual) · **29** Infrastruktur-Diagramm mit Risiken · **31** Iterationsschleifen mit erfüllten Anforderungen aus 13
- **Rückgängig** (↶ oben oder Strg/Cmd+Z, bis zu 40 Schritte)
- Dezente Animationen (neue Elemente, Seitenwechsel, Fortschritt); bei „Bewegung reduzieren“ im Betriebssystem automatisch aus
- Warnung, wenn der Browser-Speicher voll ist

## Neu in v6

- Alle Aktivitäten interaktiv (neu: **1** Projektsteckbrief, **12** Zitate & Handlungen, **17** Geschäftskonzept-Canvas, **24** Unterstützung entlang der Journey); Markierung „interaktiv“ entfernt
- Elemente duplizieren und umbenennen (✎ ⧉ ×, Doppelklick/F2, Strg+D); doppelte Namen werden verhindert
- **7** Feedback/Feedforward-Felder mit vollständig lesbaren Beschriftungen · **8** Grafik näher am Original
- Barrierefreiheit: Listenansicht („Fläche/Liste“) für räumliche Boards, Tastaturbedienung, Sprunglink, Fokusführung, Erklärung zur Barrierefreiheit unter „Über & Impressum“

## Neu in v7

- **Literatur** neu aufgebaut aus den in der Dissertation (Kapitel 4) zitierten Quellen, im APA-7-Stil mit Kursivsatz und DOI-Links; Gruppen: Partizipatives Design · Prototyping/Embodiment · Qualitative Forschung · Authentifizierung. Bisherige Vorschläge stehen gesammelt unter „Weiterführende Literatur“. Alle 67 in der Dissertation zitierten Quellen sind enthalten.
- „Brainstorm“ ersetzt: Methode heißt jetzt **Interdisciplinary Ideation Workshop**
- **8** Grafik farbig: Wolke (digital) links, zusammengesetztes Objekt (analog) rechts, gelbe Schnittmenge (hybrid) in der Mitte
- Barrierefreiheit: Listenansicht auch für **29** Infrastruktur und **32** Mindmap; Skizzen (7, 20) können ein Foto einer Papierskizze aufnehmen, Szenenbeschreibung dient als Bildbeschreibung; Kontraste und Zielgrößen nach WCAG 2.2 AA korrigiert (automatisierte Prüfung mit axe-core über alle Seiten)

## Neu in v8

- Startseite: animierte Grafik **„Authentifizierung als Gesamtkonzept“** (Candidate → Interaction → IDMS + ACS). Die drei Teile sind anklickbar, erklären sich und führen zu den passenden Aktivitäten; Animation pausierbar, startet erst im sichtbaren Bereich
- Seitenwechsel zwischen Aktivitäten gleitet in Leserichtung (vor/zurück)
- **8**: beim Ziehen leuchtet der Zielbereich auf; nach dem Ablegen kurze Rückmeldung, in welchem Bereich das Element jetzt liegt
- „Als fertig markieren“ mit kurzer Bestätigung und Hinweis, wie viele Aktivitäten der Kategorie noch offen sind
- Literatur: weiterführende Quellen geprüft, Angaben ergänzt (Würsching 2023, Lyastani 2020, Adams 1999, Osterwalder 2010), zwei schwach passende entfernt

## Neu in v9

- **Beispielprojekt** ohne Risiko: „Beispiel ansehen“ öffnet „Digital City Hall“ schreibgeschützt (gelbe Leiste oben, „Zurück zu meinem Projekt“); das eigene Projekt bleibt unverändert gespeichert. In jeder Aktivität zeigt „Beispiel“ das ausgefüllte Beispiel dieser Aktivität in einem Fenster. Das Beispiel deckt jetzt alle 33 Aktivitäten ab, inkl. Skizzen in 7 und 20.
- **Projekt ersetzen** (neues Projekt, Projektdatei öffnen) nur nach Warnung: zeigt, wie viele Aktivitäten Inhalte haben, bietet zuerst den Download der Projektdatei an und verlangt eine Bestätigung per Häkchen.
- **Projektname** in der oberen Leiste per Klick umbenennbar (Enter speichert, Esc bricht ab).
- **12 Schlüsselzitate**: Quelle pro Zitat – Rolle der Person (ohne Klarnamen), Aktivität/Methode, Datum, Kontext; erscheint auch im PDF-Bericht.
- Gesamtkonzept-Grafik: Farben angepasst (Candidate türkis, Interaction dunkelblau, IDMS + ACS hellblau); der Textbereich springt beim Wechsel nicht mehr.
- Rückgängig-Knopf mit Beschriftung auf breiten Bildschirmen.

## Neu in v10

- Beispielprojekt vollständig übersetzt: beim Sprachwechsel erscheinen auch die eingetragenen Beispieltexte auf Deutsch bzw. Englisch
- Startseite: Erklärung „Was ist Authentifizierung?“ schließt Objekte und Daten ein; „Weiter bei Aktivität N“ führt zur zuletzt geöffneten Aktivität
- Methoden-Empfehlungen: Titel zweizeilig, Kreis wächst bei vielen Methoden mit
- Multi-Faktor (27): mehr Abstand und klare Trennung zwischen den Faktorgruppen

## Neu in v11

- **Einführung** auf der Startseite: drei Schritte (Projekt benennen, Aktivität wählen, Beispiel ansehen), die sich automatisch abhaken; ausblendbar, über „Einführung zeigen“ unten auf jeder Seite wieder einblendbar
- **Suche und Filter** auf der Aktivitätenseite: Volltext (Titel, Frage, Beschreibung, Methoden, in beiden Sprachen), Filter nach Methode und Status, Trefferzahl, Hervorhebung, „Filter zurücksetzen“; Esc leert die Suche

## Neu in v12

- Literaturlisten überall alphabetisch (in den Aktivitäten getrennt nach „direkter Bezug“ und „über empfohlene Methoden“, jeweils alphabetisch)
- Hinweise zum Beispiel verschlankt; Warnung nur noch beim Überschreiben des eigenen Projekts
- „Gespeichert“-Anzeige und Fokusrahmen um Überschriften nach Seitenwechsel entfernt

## Neu in v13

- **8**: Wolke mit gleichmäßig nach außen gewölbten Bögen; analoges Objekt aus drei stark überlappenden Formen (nur noch Außenkante sichtbar)
- Startseite: Hero-Grafik bewegt sich leicht „flüssig“ (Fläche und Kontur), pausiert außerhalb des sichtbaren Bereichs und bei „Bewegung reduzieren“; Haken der Konzeptgrafik sitzt jetzt im Pfeil
- Kürzerer Platzhalter im Team-Feld
- Hero-Grafik reagiert auf den Mauszeiger: kommt er in die Nähe, neigen sich die Ebenen unterschiedlich stark in seine Richtung (Parallaxe), die blaue Fläche wölbt sich zum Zeiger hin; entfernt er sich, kehrt alles weich zurück
- Startseite: Hinweis „Technologieoffen statt technologiegetrieben“; Einführung endet mit „viel Spaß beim Forschen und Gestalten“

## Neu in v14

- **Arbeitsweise je Aktivität** sichtbar: „Projekt rahmen“, „Ist-Zustand erfassen“, „Konzept entwerfen“ bzw. „Bestehendes Verfahren abbilden“, „Reflektieren“ – als Kennzeichen im Kopf jeder Aktivität mit kurzer Erklärung, auf den Karten und als Filter in der Übersicht (Zuordnung in `data.js` unter `ADA_MODES`)
- **Zwei Anwendungsfälle** in der Projektkarte: „Neues Authentifizierungskonzept entwickeln“ oder „Bestehendes Verfahren reflektieren“. Beim zweiten stellen die Gestaltungs-Aktivitäten (11, 15–29) eigene Leitfragen zum bestehenden Verfahren (`ADA_EXISTING_Q`); der Bericht nennt den Anwendungsfall
- **Hintergrundseite** „Hintergrund zu Authentifizierung“ (#basics), verlinkt unter „Was ist Authentifizierung?“ (Texte in `ADA_BASICS`)
- **Tool teilen**: Link „Tool teilen“ unten auf jeder Seite zeigt einen QR-Code mit Link (kopieren, als PNG herunterladen). Die Adresse steht in `data.js` unter `ADA_ABOUT.shareUrl` – nach dem Umzug auf GitHub Pages dort die neue Adresse eintragen. QR-Erzeugung: `qrcode.js` (qrcode-generator von Kazuhiko Arase, MIT-Lizenz)

## Neu in v15

- Hintergrundseite überarbeitet (gleiche Länge): „Menschen und Kontext zuerst“, Grenzen der Authentifizierung (Authentifizierung / Zugang / Zugangsvoraussetzungen), Faktoren mit Beispielen, Interface und Interaktion (ISO 9241-110, implizite Interaktion, Calm Technology), Zugänglichkeit; Abschnitte direkt verlinkbar (z. B. `#basics-factors`), Links aus den Aktivitäten 7, 8, 21, 22, 24–27, 29
- Methodenseite: aufklappbare Tipps „Prototyping: Fake it until you make it“
- Startseite: Hinweis „Menschen & Kontext zuerst, nicht Technologie“
- Literatur ergänzt: ISO 9241-110:2020, Rogers, Sharp & Preece 2023, Weiser & Brown 1997

## Neu in v16

- **Literatur reduziert** auf Quellen mit direktem Bezug zu einer Methode oder Aktivität (68 statt 112). Allgemeine Grundlagenliteratur (z. B. qualitative Methodologie, Diskursanalyse, Designtheorie) liegt in `refs.js` unter `ADA_REFERENCES_ARCHIVE` und kann bei Bedarf zurückverschoben werden. In den Aktivitäten stehen die Quellen mit direktem Bezug oben; Quellen „über empfohlene Methoden“ sind zugeklappt
- **Impressum**: Mitwirkende (Konzept und Inhalte: Marie Beuthel; Grafikdesign: Claire Paquier) – in `data.js` unter `ADA_ABOUT.credits`
- **Startseite**: Hero-Grafik bleibt vollständig innerhalb des Rahmens, auch bei Zeiger-Bewegung und auf kleinen Bildschirmen

## Neu in v17

- Sprache geprüft: alle Seiten in beiden Sprachen automatisch durchsucht; Englisch jetzt in American English (Methodennamen „Relabelling“ als Eigenname aus der Literatur unverändert)
- Beispielteam international: Amara, Yusuf & Mei
- **2 Prozess**: Methoden je Abschnitt alphabetisch, „i“ öffnet die Methodenbeschreibung, Zeitraum (von/bis) je Methode und **Projektzeitplan** als Zeitachse (Wochen/Monate, „heute“-Linie); erscheint auch im Bericht
- **12 Schlüsselzitate**: Zitate und beobachtete Handlungen getrennt aufgelistet, Visionen (Utopie usw.) entfernt; Quelle je Eintrag: Methode (in Aktivität 2 geplante zuerst, Datum wird übernommen), Datum, Zeitstempel, Person (Rolle), Kontext
- Beispiel-Knopf mit Glühbirne
- **31 Iterationen** als Prozesslinie mit Schleifen (Prototyp bauen → testen → Feedback → ändern)
- Erinnerung in der Projektkarte, das Projekt als Datei zu sichern; Browser wird gebeten, die Daten dauerhaft zu behalten
- Freigabe-Link und QR-Code: https://mariekite.github.io/authentication-design-activities/

## Neu in v18

- **Aktivität 34 „Barrierefreiheits-Check“** (Kategorie Iterative Konzepte, nach 31): Fragen zu acht Bereichen (Sehen, Hören, Motorik, Kognition/Sprache, biometrische Merkmale, Situationen, Zugang zu Technik, Fehler/Wiederherstellung) mit „möglich / teilweise / Barriere / nicht relevant“, je Bereich Alternative und „Testen mit“, Übersicht mit Warnung bei Barrieren ohne Alternative, Standards als Referenz (WCAG 2.2 inkl. 3.3.8 Accessible Authentication, EN 301 549, European Accessibility Act/BFSG, ISO/IEC TR 29194, DIN 18040-1, BITV 2.0). Inhalte in `data.js` (`ADA_A11Y`, `ADA_A11Y_STANDARDS`). Nummer 34, damit gespeicherte Projekte kompatibel bleiben
- Startgrafik passt sich beim Verkleinern/Vergrößern des Fensters ohne Verzerrung an; Flächen mit freier Anordnung starten auf schmalen Bildschirmen als Liste; Journey-Zeitachse scrollt auf kleinen Bildschirmen statt zu stauchen
