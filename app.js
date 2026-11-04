/* Authentication Design Activities – single-user prototype.
   No build step, no server: state lives in the browser (localStorage) and is exported as a project file (.json) or a PDF report. */
(function () {
  "use strict";
  var CATS = window.ADA_CATEGORIES, METHODS = window.ADA_METHODS, ACTS = window.ADA_ACTIVITIES;
  var STORE = "ada-prototype-v1";

  /* ---------- UI strings ---------- */
  var T = {
    en: {
      start: "Start", activities: "Activities", methods: "Methods", save: "Project file", pdf: "PDF report",
      subtitle: "A set of tools to make decisions in authentication development processes",
      heroP: "Design not another password solution, but a user interaction that meets the demands of everyone involved and earns people's trust. Work through the activities in any order, collect what your methods reveal and move step by step towards an Authentication Interaction Concept.",
      openActs: "Start with the activities", browse: "Browse the methods",
      whatTitle: "What is authentication?",
      whatP1: "A procedure in which someone or something proves to a system that it is who or what it claims to be – to get access or to pass a certain step. This can be a person, but also an object (a card, a device, a machine) or data, for example a signed document or a software update.",
      whatP2: "The system can be a digital or analogue product, a process or a service. The goal is to decide which procedure fits your context and user groups, and how the interaction works in which situation.",
      howTitle: "How to use it",
      how: ["Name your project and decide whether you follow the process or jump into thematic activities.", "Plan your methods in Activity 2 and note who is responsible.", "Fill out activities with what you already know. The method recommendations show how to collect the rest.", "Not every activity has to be filled out. Pick the ones that support your decisions.", "Save a project file to continue later, and export a PDF report for discussions."],
      yourProject: "Your project", projectName: "Project name", example: "Example project",
      progress: "{d} done · {s} started · {t} activities", continue: "Open activities", resume: "Continue with activity {n}", savedNow: "Saved", modeLabel: "Way of working", modes: { frame: ["Frame the project", "Plan the project: who, what, how and with whom."], now: ["Capture the current state", "Record how things are today – observed, asked, collected. No solutions yet."], concept: ["Design the concept", "Sketch how it could be – ideas and visions that do not exist yet."], existing: ["Map the existing procedure", "Enter the procedure as it works today and mark where it does not fit people and context. Add ideas for improvement."], reflect: ["Reflect", "Look back at the process and decide how to continue."] }, ucLabel: "What do you want to do?", ucNew: "Develop a new authentication concept", ucNewD: "From research to a new interaction", ucEx: "Reflect on an existing procedure", ucExD: "Review a procedure in a specific context and with a specific target group", ucExToast: "The design activities now ask about the existing procedure.", ucNewToast: "The design activities now ask about a new concept.", basicsMore: "Background on authentication", basicsLink: "Background", basicsTitle: "Background on authentication", basicsIntro: "A short introduction to the terms the activities use. It does not replace a security review, but helps teams from different disciplines to talk about the same things – starting with people and context.", basicsToc: "Contents", basicsRead: "Further reading", shTitle: "Share the tool", shP: "Show this QR code or send the link. Everyone opens the tool in their own browser and starts with an empty project.", shQrAlt: "QR code for", shLink: "Link", shCopy: "Copy link", shCopied: "Link copied.", shPng: "Download QR code", shSaved: "QR code downloaded.", shNote: "Only the tool is shared, never your content – projects stay in the browser in which they were created.", onbTitle: "Getting started in three steps", onbDone: "All set – enjoy researching and designing!", openTitle: "People & context first, not technology", openText: "People first · context first · problem first · technology follows. Work out the core of your concept – it can be realised in many ways (digital or analogue, biometric or possession-based …). Try out several and check them with the target group again and again.", onbHide: "Hide the introduction", onbHidden: "Introduction hidden. You can show it again at the bottom of every page.", onbShow: "Show introduction", onbOk: "done", onb: [["Name your project", "Click on the name in the top bar (✎) or type it in the project card below. Everything is saved automatically in this browser.", "Name the project"], ["Choose an activity", "Work through the activities in any order. Search and filter by topic, method or status to find the right one.", "Browse activities"], ["Look at an example", "Every activity has an „Example“ button. It shows how a team filled it in.", "Show an example"]], afSearch: "Search activities, questions, methods …", afMethod: "Method", afAllMethods: "All methods", afStatus: "Status", afOpen: "Open", afReset: "Reset filter", afCount: "{n} of {t} activities", afNone: "No activity matches these filters.", afInText: "match in question, description or methods", newProject: "New empty project",
      exampleHint: "Need inspiration? Have a look at the example project “Digital City Hall”.", loadExample: "Show example",
      savedLocal: "Saved automatically in this browser. Download a project file to keep your work or move it to another device.",
      activity: "Activity", recs: "Method recommendations", markDone: "Mark as done", back: "All activities",
      addNote: "+ Add note", noteHint: "Enter adds the next note, Shift+Enter a line break.",
      del: "Delete", empty: "not started", started: "started", isDone: "done", entries: "{n} entries", interactive: "interactive",
      planLegend: ["not chosen", "planned", "done"], planHint: "Click a method to cycle: planned → done → not chosen. Add who is responsible.",
      who: "who?",
      jTitle: "User journey title", jDesc: "Context and user group", jHint: "Click on the timeline to add a step. Drag steps to move them. Mark a step as Authentication Touch Point to number it.",
      step: "Step", tp: "Touch point", tps: "Authentication Touch Points", noTps: "No touch point marked yet.", newStep: "New step",
      zEmo: "Emotional zones", zTech: "Technical zones", zAddItem: "Add data or artefact", zAdd: "Add", zImport: "Take items from Activity 8", zHint: "Drag the items into the zones. The inner zone is the most protected.",
      zZone: "Zone", zLabel: "What makes this zone different?", zAuth: "Kind of authentication", zOut: "outside all zones", zMore: "+ Zone", zLess: "− Zone", zNone: "nothing placed yet", zImported: "{n} items taken from Activity 8", zNothing: "Activity 8 has no notes yet.",
      rHint: "Add keywords and drag them into the matching circle.", rAddTo: "to", rKeyword: "Keyword",
      cHint: "The closer an item sits to the person, the closer the emotional bond. Drag items up and down, or into another person's line.", cClose: "closely related", cFar: "not closely related", cPerson: "Person or group", cAddPerson: "+ Person", cAddItem: "Add item", cFrom8: "From Activity 8",
      pIdeas: "Ideas", pHint: "Collect technological examples for each principle. Click an idea to add it.",
      mDeck: "Factors", mDeckHint: "Factors come from Activity 26. Click a factor to add it to the selected combination.", mNewFactor: "New factor", mAddFactor: "Add", mNewCombo: "+ New combination", mCombo: "Combination", mWhere: "Where in the process?", mWhy: "Why this combination?", mFactors: "{n} factors", mOne: "Add at least two factors.", mSame: "{n} factors share the same principle. Real multi-factor authentication combines different principles.", mClasses: ["2-Factor Authentication", "3-Factor Authentication", "4 or more Factor Authentication"], mDraft: "Drafts", mSelect: "Select", mSelected: "selected", mNoTp: "– no touch point –",
      fNear: "near future", fCrazy: "far future · crazy visionary", fReal: "far future · realistic visionary", fHint: "Add concepts and drag them into the field. Think science fiction, artificial intelligence, robotics!", fAdd: "New concept", fFrom16: "Take titles from Activity 16",
      sumHint: "This summary fills itself from your other activities. Add your concept descriptions below.", sumEmpty: "nothing yet", sumFrom: "from",
      sumSec: { people: "People", context: "Context", data: "Involved data & artefacts", tps: "Authentication Touch Points", zones: "Security zones", emotions: "Observed emotions", concepts: "Concept titles", interactions: "Interactions", metaphors: "Metaphors", reqs: "User requirements", dirs: "Classified directions", mfa: "Multi-factor combinations" },
      dHint: "Drag the cross on each line. The orange line shows your concept's profile.", dAnom: "Anomalies", dAnomQ: "What are possible anomalies concerning the parameters?", dLeft: "left pole", dRight: "right pole", dUnset: "not placed",
      mSearch: "Search methods", mAll: "All", usedIn: "Recommended in", close: "Close",
      sTitle: "Project file", sP: "Your work is saved in this browser. Download the project file (.json) to keep it, continue on another device or hand it to your team. Load it here to continue working.", sDownload: "Download project file", sCopy: "Copy as text", sImport: "Open project file", sPaste: "…or paste saved text here", sLoadPaste: "Load text", sCopied: "Copied to the clipboard.", sCopyFail: "Copying is blocked here. Select the text below and copy it.", sLoaded: "Project loaded.", sBad: "This is not a saved project file.", sNew: "New empty project", sNewConfirm: "Afterwards you start with an empty project.", sExConfirm: "Loading the example replaces the current project in this browser. Download the project file first if you want to keep it.", sYes: "Delete and replace project", sCancel: "Cancel", sDlFail: "If nothing downloaded, use “Copy as text”.", sPdf: "PDF report", sReplaceTitle: "Replace the current project?",
      rTitle: "Report", rPrint: "Print or save as PDF", rPrintHint: "In the print dialog, choose “Save as PDF” as the printer. The report only lists activities with content.", rNone: "No activity has content yet.", rCreated: "Created"
    },
    de: {
      start: "Start", activities: "Aktivitäten", methods: "Methoden", save: "Projektdatei", pdf: "PDF-Bericht",
      subtitle: "Ein Werkzeugset für Entscheidungen in der Entwicklung von Authentifizierung",
      heroP: "Gestaltet nicht noch eine Passwortlösung, sondern eine Interaktion, die den Anforderungen aller Beteiligten gerecht wird und Vertrauen verdient. Bearbeitet die Aktivitäten in beliebiger Reihenfolge, sammelt, was eure Methoden zeigen, und kommt Schritt für Schritt zu einem Authentication Interaction Concept.",
      openActs: "Mit den Aktivitäten starten", browse: "Methoden ansehen",
      whatTitle: "Was ist Authentifizierung?",
      whatP1: "Ein Verfahren, bei dem jemand oder etwas gegenüber einem System nachweist, wer oder was es ist – um Zugang zu bekommen oder einen bestimmten Schritt zu passieren. Das kann eine Person sein, aber auch ein Objekt (eine Karte, ein Gerät, eine Maschine) oder Daten, zum Beispiel ein signiertes Dokument oder ein Software-Update.",
      whatP2: "Das System kann ein digitales oder analoges Produkt, ein Prozess oder ein Service sein. Ziel ist zu entscheiden, welches Verfahren zu eurem Kontext und euren Nutzergruppen passt und wie die Interaktion in welcher Situation funktioniert.",
      howTitle: "So funktioniert es",
      how: ["Benennt euer Projekt und entscheidet, ob ihr dem Prozess folgt oder gezielt in Themen einsteigt.", "Plant eure Methoden in Aktivität 2 und notiert, wer verantwortlich ist.", "Füllt Aktivitäten mit dem, was ihr schon wisst. Die Methodenempfehlungen zeigen, wie ihr den Rest sammelt.", "Nicht jede Aktivität muss ausgefüllt werden. Wählt die, die eure Entscheidungen unterstützen.", "Sichert eine Projektdatei, um später weiterzuarbeiten, und exportiert einen PDF-Bericht für Diskussionen."],
      yourProject: "Euer Projekt", projectName: "Projektname", example: "Beispielprojekt",
      progress: "{d} fertig · {s} begonnen · {t} Aktivitäten", continue: "Aktivitäten öffnen", resume: "Weiter bei Aktivität {n}", savedNow: "Gespeichert", modeLabel: "Arbeitsweise", modes: { frame: ["Projekt rahmen", "Plant das Projekt: wer, was, wie und mit wem."], now: ["Ist-Zustand erfassen", "Haltet fest, wie es heute ist – beobachtet, erfragt, gesammelt. Noch keine Lösungen."], concept: ["Konzept entwerfen", "Entwerft, wie es sein könnte – Ideen und Visionen, die es so noch nicht gibt."], existing: ["Bestehendes Verfahren abbilden", "Tragt das Verfahren ein, wie es heute funktioniert, und markiert, wo es nicht zu Menschen und Kontext passt. Ergänzt Ideen zur Verbesserung."], reflect: ["Reflektieren", "Schaut auf den Prozess zurück und entscheidet, wie es weitergeht."] }, ucLabel: "Was habt ihr vor?", ucNew: "Neues Authentifizierungskonzept entwickeln", ucNewD: "Von der Recherche zu einer neuen Interaktion", ucEx: "Bestehendes Verfahren reflektieren", ucExD: "Ein Verfahren in einem bestimmten Kontext und mit einer bestimmten Zielgruppe überprüfen", ucExToast: "Die Gestaltungs-Aktivitäten fragen jetzt nach dem bestehenden Verfahren.", ucNewToast: "Die Gestaltungs-Aktivitäten fragen jetzt nach einem neuen Konzept.", basicsMore: "Hintergrund zu Authentifizierung", basicsLink: "Hintergrund", basicsTitle: "Hintergrund zu Authentifizierung", basicsIntro: "Eine kurze Einführung in die Begriffe, mit denen die Aktivitäten arbeiten. Sie ersetzt keine Sicherheitsprüfung, hilft aber Teams aus verschiedenen Disziplinen, über dasselbe zu sprechen – ausgehend von Menschen und Kontext.", basicsToc: "Inhalt", basicsRead: "Zum Weiterlesen", shTitle: "Tool teilen", shP: "Zeigt diesen QR-Code oder schickt den Link. Alle öffnen das Tool im eigenen Browser und starten mit einem leeren Projekt.", shQrAlt: "QR-Code für", shLink: "Link", shCopy: "Link kopieren", shCopied: "Link kopiert.", shPng: "QR-Code herunterladen", shSaved: "QR-Code heruntergeladen.", shNote: "Geteilt wird nur das Tool, nie eure Inhalte – Projekte bleiben in dem Browser, in dem sie angelegt wurden.", onbTitle: "In drei Schritten loslegen", onbDone: "Alles bereit – viel Spaß beim Forschen und Gestalten!", openTitle: "Menschen & Kontext zuerst, nicht Technologie", openText: "People first · Context first · Problem first · Technology follows. Arbeitet den Kern eures Konzepts heraus – umsetzen lässt er sich auf viele Arten (digital oder analog, biometrisch oder besitzbasiert …). Probiert mehrere aus und prüft sie immer wieder mit der Zielgruppe.", onbHide: "Einführung ausblenden", onbHidden: "Einführung ausgeblendet. Unten auf jeder Seite könnt ihr sie wieder einblenden.", onbShow: "Einführung zeigen", onbOk: "erledigt", onb: [["Projekt benennen", "Klickt oben auf den Namen (✎) oder tragt ihn unten in der Projektkarte ein. Alles wird automatisch in diesem Browser gespeichert.", "Projekt benennen"], ["Aktivität wählen", "Bearbeitet die Aktivitäten in beliebiger Reihenfolge. Sucht und filtert nach Thema, Methode oder Status, um die passende zu finden.", "Aktivitäten ansehen"], ["Beispiel ansehen", "Jede Aktivität hat einen Knopf „Beispiel“. Er zeigt, wie ein Team sie ausgefüllt hat.", "Beispiel zeigen"]], afSearch: "Aktivitäten, Fragen, Methoden durchsuchen …", afMethod: "Methode", afAllMethods: "Alle Methoden", afStatus: "Status", afOpen: "Offen", afReset: "Filter zurücksetzen", afCount: "{n} von {t} Aktivitäten", afNone: "Keine Aktivität passt zu diesen Filtern.", afInText: "Treffer in Frage, Beschreibung oder Methoden", newProject: "Neues leeres Projekt",
      exampleHint: "Ihr braucht Inspiration? Schaut euch das Beispielprojekt „Digital City Hall“ an.", loadExample: "Beispiel ansehen",
      savedLocal: "Wird automatisch in diesem Browser gespeichert. Ladet eine Projektdatei herunter, um eure Arbeit zu behalten oder auf ein anderes Gerät zu bringen.",
      activity: "Aktivität", recs: "Methoden-Empfehlungen", markDone: "Als fertig markieren", back: "Alle Aktivitäten",
      addNote: "+ Notiz", noteHint: "Enter legt die nächste Notiz an, Shift+Enter einen Zeilenumbruch.",
      del: "Löschen", empty: "nicht begonnen", started: "begonnen", isDone: "fertig", entries: "{n} Einträge", interactive: "interaktiv",
      planLegend: ["nicht gewählt", "geplant", "gemacht"], planHint: "Klickt auf eine Methode: geplant → gemacht → nicht gewählt. Ergänzt, wer verantwortlich ist.",
      who: "wer?",
      jTitle: "Titel der User Journey", jDesc: "Kontext und Nutzergruppe", jHint: "Klickt auf die Zeitachse, um einen Schritt anzulegen. Zieht Schritte, um sie zu verschieben. Markiert einen Schritt als Authentication Touch Point, um ihn zu nummerieren.",
      step: "Schritt", tp: "Touch Point", tps: "Authentication Touch Points", noTps: "Noch kein Touch Point markiert.", newStep: "Neuer Schritt",
      zEmo: "Emotionale Zonen", zTech: "Technische Zonen", zAddItem: "Daten oder Artefakt hinzufügen", zAdd: "Hinzufügen", zImport: "Einträge aus Aktivität 8 holen", zHint: "Zieht die Einträge in die Zonen. Die innerste Zone ist am stärksten geschützt.",
      zZone: "Zone", zLabel: "Was unterscheidet diese Zone?", zAuth: "Art der Authentifizierung", zOut: "außerhalb aller Zonen", zMore: "+ Zone", zLess: "− Zone", zNone: "noch nichts platziert", zImported: "{n} Einträge aus Aktivität 8 übernommen", zNothing: "Aktivität 8 hat noch keine Notizen.",
      rHint: "Fügt Stichworte hinzu und zieht sie in den passenden Kreis.", rAddTo: "in", rKeyword: "Stichwort",
      cHint: "Je näher ein Eintrag an der Person sitzt, desto enger die emotionale Bindung. Zieht Einträge nach oben und unten oder auf die Linie einer anderen Person.", cClose: "eng verbunden", cFar: "kaum verbunden", cPerson: "Person oder Gruppe", cAddPerson: "+ Person", cAddItem: "Eintrag hinzufügen", cFrom8: "Aus Aktivität 8",
      pIdeas: "Ideen", pHint: "Sammelt technische Beispiele für jedes Prinzip. Klickt auf eine Idee, um sie zu übernehmen.",
      mDeck: "Faktoren", mDeckHint: "Die Faktoren kommen aus Aktivität 26. Klickt auf einen Faktor, um ihn der gewählten Kombination hinzuzufügen.", mNewFactor: "Neuer Faktor", mAddFactor: "Hinzufügen", mNewCombo: "+ Neue Kombination", mCombo: "Kombination", mWhere: "Wo im Prozess?", mWhy: "Warum diese Kombination?", mFactors: "{n} Faktoren", mOne: "Fügt mindestens zwei Faktoren hinzu.", mSame: "{n} Faktoren gehören zum selben Prinzip. Echte Multi-Faktor-Authentifizierung kombiniert verschiedene Prinzipien.", mClasses: ["2-Faktor-Authentifizierung", "3-Faktor-Authentifizierung", "4- oder Mehr-Faktor-Authentifizierung"], mDraft: "Entwürfe", mSelect: "Auswählen", mSelected: "ausgewählt", mNoTp: "– kein Touch Point –",
      fNear: "nahe Zukunft", fCrazy: "ferne Zukunft · verrückte Visionen", fReal: "ferne Zukunft · realistische Visionen", fHint: "Fügt Konzepte hinzu und zieht sie ins Feld. Denkt an Science-Fiction, künstliche Intelligenz, Robotik!", fAdd: "Neues Konzept", fFrom16: "Titel aus Aktivität 16 holen",
      sumHint: "Diese Zusammenfassung füllt sich aus euren anderen Aktivitäten. Ergänzt unten eure Konzeptbeschreibungen.", sumEmpty: "noch nichts", sumFrom: "aus",
      sumSec: { people: "Menschen", context: "Kontext", data: "Beteiligte Daten & Artefakte", tps: "Authentication Touch Points", zones: "Sicherheitszonen", emotions: "Beobachtete Emotionen", concepts: "Konzepttitel", interactions: "Interaktionen", metaphors: "Metaphern", reqs: "Nutzeranforderungen", dirs: "Klassifizierte Richtungen", mfa: "Multi-Faktor-Kombinationen" },
      dHint: "Zieht das Kreuz auf jeder Linie. Die orange Linie zeigt das Profil eures Konzepts.", dAnom: "Anomalien", dAnomQ: "Welche Anomalien gibt es bei den Parametern?", dLeft: "linker Pol", dRight: "rechter Pol", dUnset: "nicht gesetzt",
      mSearch: "Methoden suchen", mAll: "Alle", usedIn: "Empfohlen in", close: "Schließen",
      sTitle: "Projektdatei", sP: "Eure Arbeit wird in diesem Browser gespeichert. Ladet die Projektdatei (.json) herunter, um sie zu behalten, auf einem anderen Gerät weiterzuarbeiten oder ans Team weiterzugeben. Hier öffnet ihr sie wieder.", sDownload: "Projektdatei herunterladen", sCopy: "Als Text kopieren", sImport: "Projektdatei öffnen", sPaste: "…oder gesicherten Text hier einfügen", sLoadPaste: "Text laden", sCopied: "In die Zwischenablage kopiert.", sCopyFail: "Kopieren ist hier blockiert. Markiert den Text unten und kopiert ihn.", sLoaded: "Projekt geladen.", sBad: "Das ist keine gesicherte Projektdatei.", sNew: "Neues leeres Projekt", sNewConfirm: "Danach startet ihr mit einem leeren Projekt.", sExConfirm: "Das Beispiel ersetzt das aktuelle Projekt in diesem Browser. Ladet vorher die Projektdatei herunter, wenn ihr es behalten wollt.", sYes: "Projekt löschen und ersetzen", sCancel: "Abbrechen", sDlFail: "Falls nichts heruntergeladen wurde, nutzt „Als Text kopieren“.", sPdf: "PDF-Bericht", sReplaceTitle: "Aktuelles Projekt ersetzen?",
      rTitle: "Bericht", rPrint: "Drucken oder als PDF sichern", rPrintHint: "Wählt im Druckdialog „Als PDF speichern“ als Drucker. Der Bericht zeigt nur Aktivitäten mit Inhalt.", rNone: "Noch keine Aktivität hat Inhalt.", rCreated: "Erstellt"
    }
  };

  Object.assign(T.en, {
    literature: "Literature", author: "Marie Beuthel", byAuthor: "by Marie Beuthel", conceptBy: "Concept and content: Marie Beuthel",
    litIntro: "The Authentication Design Activities were developed in a design research context. The first four groups list the references cited in the dissertation on the Authentication Design Methods; the last group adds further reading. Numbers link to the activities: filled numbers mark a direct relation, outlined numbers a relation via a recommended method.",
    litByTopic: "By topic", litByAct: "By activity", litDirect: "directly related", litVia: "via recommended methods", litAll: "All references",
    litG: { methods: "Participatory design and design methods", interaction: "Prototyping, embodiment and tangibles", research: "Qualitative research and analysis", auth: "Authentication and wearables", further: "Further reading" },
    litLink: "Literature ({n})", rRefs: "References for the activities in this report",
    mapHint: "Upload a floor plan or photo, or draw on the grid. Place touch points, draw people's movements and mark areas. Add several sheets for floors or locations.",
    mapUpload: "Upload floor plan", mapRemoveImg: "Remove image", mapTools: "Tools", mapLegend: "Toolbox", mapMove: "People's movements", mapRectMeans: "Rectangle means…", mapCircleMeans: "Circle means…",
    mapT: { select: "Move", tp: "Touch point", path: "Movement", rect: "Area", circle: "Zone", text: "Label" },
    mapTip: { select: "Drag elements to move them. Select one and press Delete to remove it.", tp: "Click on the plan to place an Authentication Touch Point.", path: "Click point by point. Double-click, press Enter or “Finish line” to end.", rect: "Drag to draw an area, e.g. a room or a security barrier.", circle: "Drag from the centre to draw a zone.", text: "Click to place a label." },
    mapFinish: "Finish line", mapPlaceTp: "Click on the plan to place touch point “{l}”.", mapAddSheet: "+ Sheet", mapSheetName: "Sheet name", mapDelSheet: "Delete sheet",
    mapKinds: { tp: "Touch point", path: "Movement", rect: "Area", circle: "Zone", text: "Label" }, mapElements: "Elements on this sheet", mapLabel: "Label", mapFrom6: "Touch points from Activity 6",
    sigHint: "For each interaction moment, describe how the system tells people what to do and how it responds. Choose the channels and tap a light or sound pattern: · short, – long, ␣ pause. ▶ plays it.",
    sigAdd: "+ Interaction moment", sigImport: "Add touch points from Activity 6",
    sigPh: { ff: ["Feedforward", "What should the users do?"], act: ["System interaction", "What do the users do?"], pos: ["Positive feedback", "What happens if it works?"], neg: ["Negative feedback", "What happens if users or the system fail?"] },
    sigMoment: "Moment", sigMomentPh: "e.g. identifying at the terminal",
    sigMods: { light: "Light", sound: "Sound", vibration: "Vibration", screen: "Screen / text", voice: "Voice", shape: "Shape & movement", person: "Person" },
    sigShort: "short signal", sigLong: "long signal", sigPause: "pause", sigPlay: "Play pattern",
    flHint: "Put feedforward, user actions, processing and feedback in the order of your whole authentication process. Drag cards or use ‹ › to reorder. For negative feedback, choose where people can try again.",
    flAdd: "Add", flGen: "Build from Activity 21", flType: "Type",
    flTypes: { ff: "Feedforward", act: "User action", proc: "Processing", pos: "Positive feedback", neg: "Negative feedback", end: "Access granted" },
    flRetry: "Try again from", flNoRetry: "– no retry –", flBack: "↺ back to step {n}", flEmpty: "Add the first step with the buttons above.", flNo21: "Activity 21 has no interaction moments yet.",
    flCheckTitle: "Check your process", flChecks: ["People know what to do before the first action", "There is feedback while the system is processing", "Success is confirmed", "Every failure offers a way to try again"]
  });
  Object.assign(T.de, {
    literature: "Literatur", author: "Marie Beuthel", byAuthor: "von Marie Beuthel", conceptBy: "Konzept und Inhalte: Marie Beuthel",
    litIntro: "Die Authentication Design Activities sind im Kontext der Designforschung entstanden. Die ersten vier Gruppen enthalten die in der Dissertation zu den Authentication Design Methods zitierten Quellen, die letzte Gruppe ergänzt weiterführende Literatur. Die Zahlen führen zu den Aktivitäten: gefüllte Zahlen zeigen einen direkten Bezug, umrandete einen Bezug über eine empfohlene Methode.",
    litByTopic: "Nach Thema", litByAct: "Nach Aktivität", litDirect: "direkter Bezug", litVia: "über empfohlene Methoden", litAll: "Alle Referenzen",
    litG: { methods: "Partizipatives Design und Designmethoden", interaction: "Prototyping, Embodiment und Tangibles", research: "Qualitative Forschung und Analyse", auth: "Authentifizierung und Wearables", further: "Weiterführende Literatur" },
    litLink: "Literatur ({n})", rRefs: "Literatur zu den Aktivitäten in diesem Bericht",
    mapHint: "Ladet einen Grundriss oder ein Foto hoch oder zeichnet auf dem Raster. Setzt Touch Points, zeichnet Bewegungen und markiert Bereiche. Für Etagen oder Orte legt ihr weitere Pläne an.",
    mapUpload: "Grundriss hochladen", mapRemoveImg: "Bild entfernen", mapTools: "Werkzeuge", mapLegend: "Toolbox", mapMove: "Bewegungen der Menschen", mapRectMeans: "Rechteck bedeutet…", mapCircleMeans: "Kreis bedeutet…",
    mapT: { select: "Verschieben", tp: "Touch Point", path: "Bewegung", rect: "Bereich", circle: "Zone", text: "Beschriftung" },
    mapTip: { select: "Zieht Elemente, um sie zu verschieben. Wählt eines aus und drückt Entf, um es zu löschen.", tp: "Klickt auf den Plan, um einen Authentication Touch Point zu setzen.", path: "Klickt Punkt für Punkt. Doppelklick, Enter oder „Linie beenden“ schließt ab.", rect: "Zieht ein Rechteck auf, z. B. einen Raum oder eine Sicherheitsschranke.", circle: "Zieht von der Mitte aus eine Zone auf.", text: "Klickt, um eine Beschriftung zu setzen." },
    mapFinish: "Linie beenden", mapPlaceTp: "Klickt auf den Plan, um den Touch Point „{l}“ zu setzen.", mapAddSheet: "+ Plan", mapSheetName: "Name des Plans", mapDelSheet: "Plan löschen",
    mapKinds: { tp: "Touch Point", path: "Bewegung", rect: "Bereich", circle: "Zone", text: "Beschriftung" }, mapElements: "Elemente auf diesem Plan", mapLabel: "Beschriftung", mapFrom6: "Touch Points aus Aktivität 6",
    sigHint: "Beschreibt für jeden Interaktionsmoment, wie das System anleitet und wie es reagiert. Wählt die Kanäle und tippt ein Licht- oder Tonmuster: · kurz, – lang, ␣ Pause. ▶ spielt es ab.",
    sigAdd: "+ Interaktionsmoment", sigImport: "Touch Points aus Aktivität 6 übernehmen",
    sigPh: { ff: ["Feedforward", "Was sollen Nutzer*innen tun?"], act: ["Interaktion", "Was tun Nutzer*innen?"], pos: ["Positives Feedback", "Was passiert, wenn es klappt?"], neg: ["Negatives Feedback", "Was passiert, wenn Nutzer*innen oder System scheitern?"] },
    sigMoment: "Moment", sigMomentPh: "z. B. Identifizieren am Terminal",
    sigMods: { light: "Licht", sound: "Ton", vibration: "Vibration", screen: "Display / Text", voice: "Sprache", shape: "Form & Bewegung", person: "Person" },
    sigShort: "kurzes Signal", sigLong: "langes Signal", sigPause: "Pause", sigPlay: "Muster abspielen",
    flHint: "Bringt Feedforward, Handlungen, Verarbeitung und Feedback in die Reihenfolge eures gesamten Authentifizierungsprozesses. Zieht Karten oder nutzt ‹ › zum Umsortieren. Wählt bei negativem Feedback, wo Menschen es erneut versuchen können.",
    flAdd: "Hinzufügen", flGen: "Aus Aktivität 21 aufbauen", flType: "Typ",
    flTypes: { ff: "Feedforward", act: "Handlung", proc: "Verarbeitung", pos: "Positives Feedback", neg: "Negatives Feedback", end: "Zugang gewährt" },
    flRetry: "Erneut versuchen ab", flNoRetry: "– kein erneuter Versuch –", flBack: "↺ zurück zu Schritt {n}", flEmpty: "Legt mit den Buttons oben den ersten Schritt an.", flNo21: "Aktivität 21 hat noch keine Interaktionsmomente.",
    flCheckTitle: "Prüft euren Ablauf", flChecks: ["Menschen wissen vor der ersten Handlung, was zu tun ist", "Während das System verarbeitet, gibt es Feedback", "Erfolg wird bestätigt", "Jeder Fehlschlag bietet einen erneuten Versuch"]
  });

  Object.assign(T.en, {
    about: "About & imprint", aboutTool: "About the tool", imprint: "Imprint", imprintResp: "Responsible for content", privacy: "Privacy",
    privacyText: "The tool runs entirely in your browser. Your entries are stored only locally in this browser and in the project files you download. No data is sent to a server, and fonts are delivered with the tool.",
    aboutUse: "The toolkit is meant for teaching and for teams who develop authentication technologies with the people who will use them. It can be used freely in courses and projects.",
    aboutCite: "How to cite", contextShort: "Developed as part of a doctoral thesis at the Berlin University of the Arts (UdK Berlin), Design Research Lab.", more: "More",
    team: "Team / conducted by", teamPh: "e.g. Lea, Jonas, Mira", rTeam: "Team", rTool: "Authentication Design Activities · report",
    litRecent: "Only newer literature (since 2014)", spHint: "Place sensitive data on the digital side, objects and spaces on the analogue side, and hybrid forms in between. Switch to “Connect” and click two items to link interrelated things.",
    spMove: "Move", spLink: "Connect", spLinks: "Connections", spNoLinks: "No connections yet.",
    rlHint: "Pick an everyday object and explore its mechanism. Translate it into a metaphor (verb + adjective + noun) and then into an authentication interaction.", rlRandom: "Draw a random object", rlOwn: "+ Own object", rlEmpty: "Pick an object from the deck above.",
    rlObject: "Object", rlMech: "Mechanism: how do you interact with it?", rlMeta: "Metaphor", rlVerb: "verb", rlAdj: "adjective", rlNoun: "noun", rlAuth: "Authentication interaction",
    rqHint: "Turn quotes and observations from Activity 12 into requirements. Click a quote to start a requirement, then set its priority.", rqFrom12: "Quotes & actions from Activity 12", rqNo12: "Activity 12 has no quotes yet. You can still add requirements.", rqAdd: "+ Requirement", rqSort: "Sort by priority", rqEmpty: "No requirements yet.", rqPrio: "Priority",
    rqPrios: { must: "Must", should: "Should", could: "Could" },
    sbHint: "Sketch the situation in each panel like a comic, then note who, what and where. Use the colours, the eraser ⌫ and ⟲ to clear. ⤒ inserts a photo of a paper sketch.", sbAdd: "+ Panel", sbPen: "Pen", sbErase: "Eraser", sbClear: "Clear panel", sbCanvas: "Sketch area", sbCaption: "What happens in this scene?", sbCaptionA: "Description of the scene (also used as image description)", sbPenNames: ["dark blue", "orange", "light blue", "green"], sbUpload: "Insert a photo or image of a paper sketch", sbUploaded: "Image inserted. You can keep drawing on it.", sbLeft: "Move panel left", mvBack: "Move earlier", mvFwd: "Move later", sbRight: "Move panel right",
    wlHint: "Collect team feedback on sticky notes. Drag them by the coloured top edge to cluster them.", wlCats: { worked: "Worked well", not: "Did not work", next: "Next time", who: "Who did what" },
    mmHint: "Add the factors that could influence your decision around the centre and branch them out. Select a node to note a strategy for dealing with it.", mmRoot: "Possible factors", mmNode: "Factor", mmAddChild: "+ Branch", mmDelete: "Delete branch", mmStrategy: "Strategy for dealing with it", mmAll: "All factors",
    sumStory: "Use cases"
  });
  Object.assign(T.de, {
    about: "Über & Impressum", aboutTool: "Über das Tool", imprint: "Impressum", imprintResp: "Verantwortlich für den Inhalt", privacy: "Datenschutz",
    privacyText: "Das Tool läuft vollständig im Browser. Eure Eingaben werden nur lokal in diesem Browser und in den Projektdateien gespeichert, die ihr herunterladet. Es werden keine Daten an einen Server übertragen, die Schriften werden mit dem Tool ausgeliefert.",
    aboutUse: "Das Toolkit ist für die Lehre und für Teams gedacht, die Authentifizierungstechnologien gemeinsam mit den späteren Nutzer*innen entwickeln. Es kann in Kursen und Projekten frei verwendet werden.",
    aboutCite: "Zitiervorschlag", contextShort: "Entstanden im Rahmen einer Dissertation an der Universität der Künste Berlin (UdK Berlin), Design Research Lab.", more: "Mehr",
    team: "Team / durchgeführt von", teamPh: "z. B. Lea, Jonas, Mira", rTeam: "Team", rTool: "Authentication Design Activities · Bericht",
    litRecent: "Nur neuere Literatur (ab 2014)", spHint: "Legt sensible Daten auf die digitale Seite, Objekte und Räume auf die analoge Seite und hybride Formen dazwischen. Wechselt zu „Verbinden“ und klickt zwei Einträge an, um Zusammengehöriges zu verknüpfen.",
    spMove: "Verschieben", spLink: "Verbinden", spLinks: "Verbindungen", spNoLinks: "Noch keine Verbindungen.",
    rlHint: "Wählt einen Alltagsgegenstand und erkundet seinen Mechanismus. Übersetzt ihn in eine Metapher (Verb + Adjektiv + Nomen) und dann in eine Authentifizierungs-Interaktion.", rlRandom: "Zufälliges Objekt ziehen", rlOwn: "+ Eigenes Objekt", rlEmpty: "Wählt oben ein Objekt aus dem Stapel.",
    rlObject: "Objekt", rlMech: "Mechanismus: wie interagiert man damit?", rlMeta: "Metapher", rlVerb: "Verb", rlAdj: "Adjektiv", rlNoun: "Nomen", rlAuth: "Authentifizierungs-Interaktion",
    rqHint: "Macht aus Zitaten und Beobachtungen aus Aktivität 12 Anforderungen. Klickt auf ein Zitat, um eine Anforderung anzulegen, und setzt dann die Priorität.", rqFrom12: "Zitate & Handlungen aus Aktivität 12", rqNo12: "Aktivität 12 hat noch keine Zitate. Ihr könnt trotzdem Anforderungen anlegen.", rqAdd: "+ Anforderung", rqSort: "Nach Priorität sortieren", rqEmpty: "Noch keine Anforderungen.", rqPrio: "Priorität",
    rqPrios: { must: "Muss", should: "Soll", could: "Kann" },
    sbHint: "Skizziert die Situation in jedem Feld wie einen Comic und notiert dann Wer, Was und Wo. Nutzt die Farben, den Radierer ⌫ und ⟲ zum Leeren. ⤒ fügt ein Foto einer Papierskizze ein.", sbAdd: "+ Bild", sbPen: "Stift", sbErase: "Radierer", sbClear: "Bild leeren", sbCanvas: "Skizzenfläche", sbCaption: "Was passiert in dieser Szene?", sbCaptionA: "Beschreibung der Szene (dient auch als Bildbeschreibung)", sbPenNames: ["Dunkelblau", "Orange", "Hellblau", "Grün"], sbUpload: "Foto oder Bild einer Papierskizze einfügen", sbUploaded: "Bild eingefügt. Ihr könnt darauf weiterzeichnen.", sbLeft: "Bild nach links verschieben", mvBack: "Nach vorne verschieben", mvFwd: "Nach hinten verschieben", sbRight: "Bild nach rechts verschieben",
    wlHint: "Sammelt Team-Feedback auf Klebezetteln. Zieht sie an der farbigen Oberkante, um sie zu gruppieren.", wlCats: { worked: "Hat funktioniert", not: "Hat nicht funktioniert", next: "Beim nächsten Mal", who: "Wer hat was gemacht" },
    mmHint: "Ordnet die Faktoren, die eure Entscheidung beeinflussen könnten, um die Mitte an und verzweigt sie. Wählt einen Knoten aus, um eine Strategie im Umgang damit zu notieren.", mmRoot: "Mögliche Faktoren", mmNode: "Faktor", mmAddChild: "+ Zweig", mmDelete: "Zweig löschen", mmStrategy: "Strategie im Umgang damit", mmAll: "Alle Faktoren",
    sumStory: "Use Cases"
  });

  Object.assign(T.en, {
    undo: "Undo", undone: "Last change undone.", nothingUndo: "Nothing to undo.", saveFail: "Could not save in this browser (storage full?). Download the project file to keep your work.",
    grHint: "Create a card for each group involved: who uses, sets up, manages or supports the authentication. Tap the roles that apply.", grAdd: "+ User group", grTitle: "Name of the group",
    ivHint: "For each user group from Activity 3, decide how you want to involve them, with which methods, and what they get in return.", ivNo3: "Add user groups in Activity 3 first.", ivLevel: "Involvement", ivLevels: ["inform", "consult", "co-design"], ivAddMethod: "+ add a method", ivGive: "What do they get out of it? (compensation)",
    stHint: "Place different perspectives around your concept. Use the slider to show how well the concept fits each perspective: the better it fits, the closer the bubble moves to the centre.", stConcept: "Your concept", stCloser: "closer = better fit", stPersp: "Perspective", stFit: "How well does the concept fit?", stFitLow: "hardly", stFitHigh: "very well", stNotes: "Needs, conditions, contexts", stAdd: "+ Perspective",
    bpHint: "Lay out the authentication along its steps, like a service blueprint. Above the line of visibility: what users do and see. Below: what happens inside the system.", bpAdd: "+ Step", bpLine: "line of visibility", mapHint16: "Visualise the process of your concept. Each sheet is one concept: name it, sketch or upload a drawing, place touch points, movements and areas.",
    bpRows: [["User actions", "What do people do?"], ["What users see", "interface, feedforward, feedback"], ["Inside the system", "processes, checks, decisions"], ["Data & infrastructure", "which data, where?"]],
    ptHint: "Tap the patterns that suit your concepts. Each selected pattern opens a card for details.", ptOwn: "+ own pattern", ptNone: "No pattern selected yet.", ptName: "Pattern", ptDetails: "How does it work in your concept?", ptElements: "Relevant elements",
    prHint: "Line up everything people have to do or like to do before the authentication interaction. Mark what is required (setup, enrolment, registration) and what is a personal ritual.", prKinds: { must: "Required step", ritual: "Ritual / preference" }, prStart: "Getting ready", prEnd: "Authentication interaction", prManual: "What could a manual look like?",
    ifHint: "Sketch the background system: add components, connect them and mark risks and weak connections. Select a component to describe its risks and fixes.", ifSelect: "Select a component to edit it.", ifLabel: "Label", ifType: "Type", ifRisk: "Risk or weakness", ifWeak: "weak", ifTypes: { user: "User", device: "Device", authenticator: "Authenticator", server: "Server", cloud: "Cloud", database: "Data storage", service: "Service" },
    itHint: "Each loop is one iteration of your prototype. Collect the feedback, note the changes and tick which requirements from Activity 13 are met. The ring fills as more requirements are met.", itNext: "Next iteration", itMet: "Requirements met", itNo13: "Add requirements in Activity 13 to track them here."
  });
  Object.assign(T.de, {
    undo: "Rückgängig", undone: "Letzte Änderung rückgängig gemacht.", nothingUndo: "Nichts zum Rückgängigmachen.", saveFail: "Speichern in diesem Browser nicht möglich (Speicher voll?). Ladet die Projektdatei herunter, um eure Arbeit zu sichern.",
    grHint: "Legt für jede beteiligte Gruppe eine Karte an: wer die Authentifizierung nutzt, einrichtet, verwaltet oder unterstützt. Tippt die passenden Rollen an.", grAdd: "+ Nutzergruppe", grTitle: "Name der Gruppe",
    ivHint: "Entscheidet für jede Nutzergruppe aus Aktivität 3, wie ihr sie einbinden wollt, mit welchen Methoden und was sie davon haben.", ivNo3: "Legt zuerst Nutzergruppen in Aktivität 3 an.", ivLevel: "Einbindung", ivLevels: ["informieren", "befragen", "mitgestalten"], ivAddMethod: "+ Methode hinzufügen", ivGive: "Was haben sie davon? (Aufwandsentschädigung)",
    stHint: "Ordnet verschiedene Perspektiven um euer Konzept an. Zeigt mit dem Regler, wie gut das Konzept zu jeder Perspektive passt: je besser, desto näher rückt die Blase zur Mitte.", stConcept: "Euer Konzept", stCloser: "näher = passt besser", stPersp: "Perspektive", stFit: "Wie gut passt das Konzept?", stFitLow: "kaum", stFitHigh: "sehr gut", stNotes: "Bedürfnisse, Bedingungen, Kontexte", stAdd: "+ Perspektive",
    bpHint: "Legt die Authentifizierung entlang ihrer Schritte an, wie in einem Service Blueprint. Über der Sichtbarkeitslinie: was Nutzer*innen tun und sehen. Darunter: was im System passiert.", bpAdd: "+ Schritt", bpLine: "Sichtbarkeitslinie", mapHint16: "Visualisiert den Ablauf eures Konzepts. Jeder Plan ist ein Konzept: benennt es, skizziert oder ladet eine Zeichnung hoch, setzt Touch Points, Bewegungen und Bereiche.",
    bpRows: [["Handlungen", "Was tun die Menschen?"], ["Was Nutzer*innen sehen", "Interface, Feedforward, Feedback"], ["Im System", "Prozesse, Prüfungen, Entscheidungen"], ["Daten & Infrastruktur", "welche Daten, wo?"]],
    ptHint: "Tippt die Muster an, die zu euren Konzepten passen. Jedes gewählte Muster öffnet eine Karte für Details.", ptOwn: "+ eigenes Muster", ptNone: "Noch kein Muster gewählt.", ptName: "Muster", ptDetails: "Wie funktioniert es in eurem Konzept?", ptElements: "Relevante Elemente",
    prHint: "Reiht alles auf, was Menschen vor der Authentifizierungs-Interaktion tun müssen oder gern tun. Markiert, was Pflicht ist (Einrichtung, Enrolment, Registrierung) und was ein persönliches Ritual ist.", prKinds: { must: "Pflichtschritt", ritual: "Ritual / Vorliebe" }, prStart: "Sich bereit machen", prEnd: "Authentifizierungs-Interaktion", prManual: "Wie könnte eine Anleitung aussehen?",
    ifHint: "Skizziert das Hintergrundsystem: fügt Komponenten hinzu, verbindet sie und markiert Risiken und schwache Verbindungen. Wählt eine Komponente aus, um Risiken und Lösungen zu beschreiben.", ifSelect: "Wählt eine Komponente aus, um sie zu bearbeiten.", ifLabel: "Bezeichnung", ifType: "Typ", ifRisk: "Risiko oder Schwachstelle", ifWeak: "schwach", ifTypes: { user: "Nutzer*in", device: "Gerät", authenticator: "Authenticator", server: "Server", cloud: "Cloud", database: "Datenspeicher", service: "Dienst" },
    itHint: "Jede Schleife ist eine Iteration eures Prototyps. Sammelt das Feedback, notiert die Änderungen und hakt ab, welche Anforderungen aus Aktivität 13 erfüllt sind. Der Ring füllt sich, je mehr erfüllt sind.", itNext: "Nächste Iteration", itMet: "Erfüllte Anforderungen", itNo13: "Legt Anforderungen in Aktivität 13 an, um sie hier zu verfolgen."
  });

  Object.assign(T.en, {
    rename: "Rename", sbHint7: "Sketch each interaction or movement as a small scene and number it like the touch points in Activity 6. Note the interaction and any feedback or feedforward you observed. ⤒ inserts a photo of a paper sketch.", duplicate: "Duplicate", duplicated: "Copy created – give it a new name.", nameTaken: "“{n}” already exists here. Please choose a different name.", deletedX: "“{n}” deleted.",
    lbHint: "List view: the same content as the board, editable with keyboard and screen reader. Choose the area in the second column.", lmHint: "List view: the mind map as a nested outline. Each entry can get sub-entries and a strategy.", acTitle: "Authentication as a whole concept", acIntro: "Every authentication links three parts. The activities help you design all of them together – choose a part to see which activities belong to it.", acParts: [["Authentication candidate", "Whoever or whatever wants to prove an identity: a person, an object such as a card or device, or data – together with its context.", "people"], ["Authentication interaction", "How the candidate authenticates: gestures, objects, feedback and feedforward. This is where design has the most influence.", "interact"], ["IDMS + ACS", "Identity management and access control systems: the technical infrastructure that checks the identity and grants access.", "tech"]], acOpen: "Open these activities", acPause: "Pause animation", acPlay: "Play animation", spMovedTo: "„{n}“ is now in {r}", exViewing: "Example", pnEdit: "Rename project", pnSaved: "Project renamed to „{n}“.", exBar: "Example project „Digital City Hall“ (read-only)", exLeave: "Back to my project", exEntered: "Example opened. Your own project is kept.", exLeft: "Back in your own project.", exampleOf: "Example · Digital City Hall", exDlgHint: "This is how a team filled in this activity for a self-service city hall.", exBrowse: "Browse the whole example", exNone: "The example does not cover this activity yet.", sReplaceWarn: "All content of „{n}“ will be deleted ({k} activities with content). This cannot be undone after you leave the page.", sSure: "I understand that my current content will be deleted.", sSavedFirst: "Project file downloaded. Keep it somewhere safe.", sImportConfirm: "The project file you chose will replace the current project.", exSafe: "", exPeek: "Example", qsSource: "Source", qsAdd: "add role, method, date, context", qsRole: "Role of the person (no real names)", qsRolePh: "e.g. clerk, citizen 60+", qsMethod: "Activity / method", qsMethodPh: "e.g. Interview, Workshop", qsDate: "Date", qsContext: "Context", qsContextPh: "What was it about? Situation, question, topic", qsRoles: ["Citizen", "Clerk", "IT administrator", "Developer", "Security expert", "Project partner"], doneLeft: "Done. {n} more in {c}.", doneCat: "All activities in {c} are done.", lmLevel: "level", liHint: "List view: all elements of the infrastructure as a table, connections below.", liFrom: "From", liTo: "To", liAddLink: "Connect", liDupLink: "This connection already exists or connects an element with itself.", lbName: "Name", lbActions: "Actions",
    viewAs: "Show as", viewBoard: "Board", viewList: "List", chipHelp: "Arrow keys move the item. F2 renames, Ctrl+D duplicates, Delete removes it.",
    lvLabel: "Closeness", lvLevels: ["very close", "close", "medium", "loose", "hardly"], outside: "outside all zones",
    skip: "Skip to content", mapKbd: "Floor plan. With a placement tool selected, press Enter to place an element in the centre. With “Move”, use the arrow keys to move the selected element.",
    p1AddMember: "+ Team member", p1Name: "Name", p1Disc: "Discipline & role", p1Resp: "Keeps the activities going", p1RespHint: "Tip: mark with ★ who keeps the Authentication Design Activities going.", p1AddQ: "+ Research question", p1Q: "Research question", p1Status: "Status", p1St: { open: "open", progress: "in progress", answered: "answered" }, p1Where: "answered in activity…", p1OtherMethods: "Other methods and notes", p1EditPlan: "Edit the plan in Activity 2 →", p1NoPlan: "Plan your methods in",
    qtHint: "Collect what users said and did. Mark visions as utopia (neutral), eutopia (positive) or dystopia (negative). Filter to see patterns.", qtNew: "Quote or observed action", qtKind: "Type", qtKinds: { quote: "Quote", action: "Observed action" }, qtWho: "Who? (user group)", qtVision: "Vision", qtVis: { utopia: "Utopia", eutopia: "Eutopia", dystopia: "Dystopia" }, qtVisHint: { utopia: "neutral vision", eutopia: "positive vision", dystopia: "negative vision" }, qtEmpty: "No entries yet.",
    cvHint: "Sketch the business concept like a canvas: who are the customers, what does the concept offer them, why would they choose it and how could it be integrated into other products?", cvConcept: "Concept", cvValue: "What does it offer the customers?", cvFrom3: "User groups from Activity 3",
    suHint: "Who might need help at which step, and who or what can support them? Add support cards to the steps of your user journey from Activity 6.", suGeneral: "Whole process", suAdd: "+ Support", suHelps: "is supported by", suHelper: "Helper (person, group or system)", suMove: "Move to step",
    a11yTitle: "Accessibility", a11yText: "All activities can be used with keyboard and screen reader. Boards with free placement also offer a list view (switch “Board / List” above the activity). Keyboard: Tab moves between elements, arrow keys move selected items, F2 renames, Ctrl+D duplicates, Delete removes, Ctrl+Z undoes. Animations switch off when your system asks for reduced motion. Drawing in the sketch areas needs a mouse, pen or finger; alternatively insert a photo of a paper sketch (⤒) and describe the scene in the text field below, which also serves as the image description. The tool was checked automatically against WCAG 2.2 AA (axe-core: contrast, target size, names and roles); a test with people who use assistive technology is still pending. Please report barriers to the contact in the imprint."
  });
  Object.assign(T.de, {
    rename: "Umbenennen", sbHint7: "Skizziert jede Interaktion oder Bewegung als kleine Szene und nummeriert sie wie die Touch Points aus Aktivität 6. Notiert die Interaktion und beobachtetes Feedback oder Feedforward. ⤒ fügt ein Foto einer Papierskizze ein.", duplicate: "Duplizieren", duplicated: "Kopie angelegt – gebt ihr einen neuen Namen.", nameTaken: "„{n}“ gibt es hier schon. Bitte wählt einen anderen Namen.", deletedX: "„{n}“ gelöscht.",
    lbHint: "Listenansicht: derselbe Inhalt wie auf der Fläche, bedienbar mit Tastatur und Screenreader. Den Bereich wählt ihr in der zweiten Spalte.", lmHint: "Listenansicht: die Mindmap als verschachtelte Gliederung. Jeder Eintrag kann Unterpunkte und eine Strategie bekommen.", acTitle: "Authentifizierung als Gesamtkonzept", acIntro: "Jede Authentifizierung verbindet drei Teile. Die Aktivitäten helfen, alle drei zusammen zu gestalten – wählt einen Teil, um zu sehen, welche Aktivitäten dazugehören.", acParts: [["Authentication Candidate", "Wer oder was eine Identität nachweisen möchte: eine Person, ein Objekt wie eine Karte oder ein Gerät oder Daten – zusammen mit dem jeweiligen Kontext.", "people"], ["Authentication Interaction", "Wie sich der Candidate authentifiziert: Gesten, Objekte, Feedback und Feedforward. Hier hat Gestaltung den größten Einfluss.", "interact"], ["IDMS + ACS", "Identitätsmanagement- und Zugangskontrollsysteme: die technische Infrastruktur, die die Identität prüft und Zugang gewährt.", "tech"]], acOpen: "Zu diesen Aktivitäten", acPause: "Animation anhalten", acPlay: "Animation abspielen", spMovedTo: "„{n}“ liegt jetzt in {r}", exViewing: "Beispiel", pnEdit: "Projekt umbenennen", pnSaved: "Projekt umbenannt in „{n}“.", exBar: "Beispielprojekt „Digital City Hall“ (nur zum Ansehen)", exLeave: "Zurück zu meinem Projekt", exEntered: "Beispiel geöffnet. Euer eigenes Projekt bleibt erhalten.", exLeft: "Zurück in eurem eigenen Projekt.", exampleOf: "Beispiel · Digital City Hall", exDlgHint: "So hat ein Team diese Aktivität für ein Bürgeramt mit Selbstbedienung ausgefüllt.", exBrowse: "Ganzes Beispiel durchblättern", exNone: "Das Beispiel deckt diese Aktivität noch nicht ab.", sReplaceWarn: "Alle Inhalte von „{n}“ werden gelöscht ({k} Aktivitäten mit Inhalten). Das lässt sich nicht mehr rückgängig machen, sobald ihr die Seite verlasst.", sSure: "Mir ist klar, dass meine aktuellen Inhalte gelöscht werden.", sSavedFirst: "Projektdatei heruntergeladen. Bewahrt sie gut auf.", sImportConfirm: "Die gewählte Projektdatei ersetzt das aktuelle Projekt.", exSafe: "", exPeek: "Beispiel", qsSource: "Quelle", qsAdd: "Rolle, Methode, Datum, Kontext ergänzen", qsRole: "Rolle der Person (ohne Klarnamen)", qsRolePh: "z. B. Sachbearbeiterin, Bürger 60+", qsMethod: "Aktivität / Methode", qsMethodPh: "z. B. Interview, Workshop", qsDate: "Datum", qsContext: "Kontext", qsContextPh: "Worum ging es? Situation, Frage, Thema", qsRoles: ["Bürger*in", "Sachbearbeiter*in", "IT-Administrator*in", "Entwickler*in", "Sicherheitsexpert*in", "Projektpartner*in"], doneLeft: "Erledigt. Noch {n} in {c}.", doneCat: "Alle Aktivitäten in {c} sind erledigt.", lmLevel: "Ebene", liHint: "Listenansicht: alle Elemente der Infrastruktur als Tabelle, darunter die Verbindungen.", liFrom: "Von", liTo: "Nach", liAddLink: "Verbinden", liDupLink: "Diese Verbindung gibt es schon oder sie verbindet ein Element mit sich selbst.", lbName: "Name", lbActions: "Aktionen",
    viewAs: "Anzeigen als", viewBoard: "Fläche", viewList: "Liste", chipHelp: "Pfeiltasten verschieben den Eintrag. F2 benennt um, Strg+D dupliziert, Entf löscht.",
    lvLabel: "Nähe", lvLevels: ["sehr eng", "eng", "mittel", "locker", "kaum"], outside: "außerhalb aller Zonen",
    skip: "Zum Inhalt springen", mapKbd: "Grundriss. Mit einem Platzierungswerkzeug setzt Enter ein Element in die Mitte. Mit „Verschieben“ bewegen die Pfeiltasten das gewählte Element.",
    p1AddMember: "+ Teammitglied", p1Name: "Name", p1Disc: "Disziplin & Rolle", p1Resp: "Kümmert sich um die Aktivitäten", p1RespHint: "Tipp: Markiert mit ★, wer die Authentication Design Activities im Blick behält.", p1AddQ: "+ Forschungsfrage", p1Q: "Forschungsfrage", p1Status: "Status", p1St: { open: "offen", progress: "in Arbeit", answered: "beantwortet" }, p1Where: "beantwortet in Aktivität…", p1OtherMethods: "Weitere Methoden und Notizen", p1EditPlan: "Plan in Aktivität 2 bearbeiten →", p1NoPlan: "Plant eure Methoden in",
    qtHint: "Sammelt, was Nutzer*innen gesagt und getan haben. Markiert Visionen als Utopie (neutral), Eutopie (positiv) oder Dystopie (negativ). Filtert, um Muster zu sehen.", qtNew: "Zitat oder beobachtete Handlung", qtKind: "Art", qtKinds: { quote: "Zitat", action: "Beobachtete Handlung" }, qtWho: "Wer? (Nutzergruppe)", qtVision: "Vision", qtVis: { utopia: "Utopie", eutopia: "Eutopie", dystopia: "Dystopie" }, qtVisHint: { utopia: "neutrale Vision", eutopia: "positive Vision", dystopia: "negative Vision" }, qtEmpty: "Noch keine Einträge.",
    cvHint: "Skizziert das Geschäftskonzept wie ein Canvas: Wer sind die Kund*innen, was bietet ihnen das Konzept, warum würden sie es wählen und wie ließe es sich in andere Produkte integrieren?", cvConcept: "Konzept", cvValue: "Was bietet es den Kund*innen?", cvFrom3: "Nutzergruppen aus Aktivität 3",
    suHint: "Wer könnte an welchem Schritt Hilfe brauchen, und wer oder was kann unterstützen? Legt Unterstützungskarten an den Schritten eurer User Journey aus Aktivität 6 an.", suGeneral: "Gesamter Prozess", suAdd: "+ Unterstützung", suHelps: "wird unterstützt von", suHelper: "Hilfe durch (Person, Gruppe oder System)", suMove: "Zu Schritt verschieben",
    a11yTitle: "Barrierefreiheit", a11yText: "Alle Aktivitäten sind mit Tastatur und Screenreader nutzbar. Flächen mit freier Anordnung bieten zusätzlich eine Listenansicht (Umschalter „Fläche / Liste“ über der Aktivität). Tastatur: Tab wechselt zwischen Elementen, Pfeiltasten verschieben gewählte Einträge, F2 benennt um, Strg+D dupliziert, Entf löscht, Strg+Z macht rückgängig. Animationen schalten sich ab, wenn euer System reduzierte Bewegung wünscht. Zum Zeichnen in den Skizzenflächen braucht ihr Maus, Stift oder Finger; alternativ könnt ihr ein Foto einer Papierskizze einfügen (⤒) und die Szene im Textfeld darunter beschreiben, das zugleich als Bildbeschreibung dient. Das Tool wurde automatisiert gegen WCAG 2.2 AA geprüft (axe-core: Kontraste, Zielgrößen, Namen und Rollen); ein Test mit Menschen, die assistive Technologien nutzen, steht noch aus. Barrieren meldet bitte an den Kontakt im Impressum."
  });

  /* ---------- state ---------- */
  var FRESH = {}, freshT;
  function uid() { var id = Math.random().toString(36).slice(2, 9); FRESH[id] = 1; clearTimeout(freshT); freshT = setTimeout(function () { FRESH = {}; }, 900); return id; }
  function fresh(el, id) { if (id && FRESH[id]) el.classList.add("fresh"); }
  var S = load();
  function load() {
    try { var raw = localStorage.getItem(STORE); if (raw) { var s = JSON.parse(raw); if (s && s.project) return s; } } catch (e) {}
    var lang = (navigator.language || "en").slice(0, 2) === "de" ? "de" : "en";
    return { lang: lang, project: emptyProject(lang) };
  }
  var saveTimer, UNDO = [], lastSnap = null, saveWarned = false;
  var EX = null; /* while the example is shown: { real: <own project> } */
  function persist() {
    if (EX) { try { localStorage.setItem(STORE, JSON.stringify(Object.assign({}, S, { project: EX.real }))); } catch (e) {} return; }
    var snap = JSON.stringify(S.project);
    if (lastSnap && snap !== lastSnap) { UNDO.push(lastSnap); if (UNDO.length > 40) UNDO.shift(); }
    lastSnap = snap; undoState();
    try { localStorage.setItem(STORE, JSON.stringify(S)); saveWarned = false; } catch (e) { if (!saveWarned) { saveWarned = true; toast(t("saveFail")); } }
  }
  function save() { clearTimeout(saveTimer); saveTimer = setTimeout(persist, 250); }
  var flashT, lastFlashSnap = null;
  function savedFlash() { var el = document.getElementById("saveState"); if (!el || lastSnap === lastFlashSnap) return; lastFlashSnap = lastSnap; el.textContent = "✓ " + t("savedNow"); el.classList.add("on"); clearTimeout(flashT); flashT = setTimeout(function () { el.classList.remove("on"); }, 1600); }
  function undoState() { var b = document.getElementById("undoBtn"); if (b) b.disabled = !!EX || (!UNDO.length && JSON.stringify(S.project) === lastSnap); }
  function undo() {
    if (EX) return;
    clearTimeout(saveTimer);
    var cur = JSON.stringify(S.project), target = cur !== lastSnap ? lastSnap : UNDO.pop();
    if (!target) { toast(t("nothingUndo")); return; }
    S.project = JSON.parse(target); lastSnap = target;
    try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {}
    var y = window.scrollY; route(); window.scrollTo(0, y); undoState(); toast(t("undone"));
  }
  lastSnap = JSON.stringify(S.project);
  function t(k) { return T[S.lang][k]; }
  function L(pair) { return pair[S.lang === "de" ? 1 : 0]; }
  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  function act(n) { var a = S.project.acts[n]; if (!a) a = S.project.acts[n] = {}; return a; }
  function catOf(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; }
  function defOf(n) { for (var i = 0; i < ACTS.length; i++) if (ACTS[i].n === n) return ACTS[i]; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function chipStyle(c) { return "background:" + c.color + ";color:" + c.ink; }
  function emptyProject(lang) { return { name: (lang || (S && S.lang)) === "de" ? "Mein Projekt" : "My project", example: false, acts: {} }; }
  /* Method names stay in English in both languages: they refer to the literature. */
  var MODES = window.ADA_MODES || {}, EXQ = window.ADA_EXISTING_Q || {};
  function useCase() { var p = EX ? S.project : S.project; return p.useCase === "existing" ? "existing" : "new"; }
  function modeOf(n) { var m = MODES[n] || "concept"; return m === "concept" && useCase() === "existing" ? "existing" : m; }
  var MODE_ICON = { frame: '<path d="M3 3h10v10H3z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 7h10" stroke="currentColor" stroke-width="1.6"/>', now: '<circle cx="7" cy="7" r="4.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M10.2 10.2l3.3 3.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>', concept: '<path d="M8 1.5l1.6 4.2 4.4.3-3.4 2.8 1.1 4.3L8 10.7l-3.7 2.4 1.1-4.3L2 6l4.4-.3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>', existing: '<circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 4.8v3.4l2.3 1.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>', reflect: '<path d="M3 8a5 5 0 1 0 1.6-3.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 2.5v2.8h2.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' };
  function modeIcon(m) { return '<svg class="mi" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">' + MODE_ICON[m] + "</svg>"; }
  function modeBadge(n, small) { var m = modeOf(n); return '<span class="mode m-' + m + (small ? " small" : "") + '">' + modeIcon(m) + t("modes")[m][0] + "</span>"; }
  function qOf(d) { return useCase() === "existing" && EXQ[d.n] ? EXQ[d.n] : d.q; }
  function mName(m) { return METHODS[m] ? (m === "all" ? L([METHODS[m].en, METHODS[m].de]) : METHODS[m].en) : m; }

  /* ---------- reading data across activities ---------- */
  function notesOf(n, f) { var a = S.project.acts[n]; if (!a || !a.fields || !a.fields[f]) return []; return a.fields[f].map(function (x) { return x.text.trim(); }).filter(Boolean); }
  function allNotes(n) { var d = defOf(n), out = []; (d.fields || []).forEach(function (_, i) { out = out.concat(notesOf(n, i)); }); return out; }
  function ringItems(i) { var a = S.project.acts[5]; if (!a || !a.rings) return []; return a.rings.items.filter(function (it) { return ringOf(it) === i; }).map(function (it) { return it.text; }); }
  function journeySteps() { var a = S.project.acts[6]; return a && a.journey ? a.journey.steps.slice().sort(function (x, y) { return x.x - y.x; }) : []; }
  function touchPoints() { return journeySteps().filter(function (s) { return s.tp; }); }
  function uniq(arr) { var o = []; arr.forEach(function (x) { if (x && o.indexOf(x) < 0) o.push(x); }); return o; }

  function itemCount(n) {
    var d = defOf(n), a = S.project.acts[n]; if (!a) return 0;
    switch (d.type) {
      case "generic": case "principles": case "summary": case "spheres": case "canvas": var c = 0; for (var k in (a.fields || {})) c += a.fields[k].filter(function (x) { return x.text.trim(); }).length; return c;
      case "plan": var p = 0; for (var m in (a.plan || {})) if (a.plan[m].state) p++; return p;
      case "journey": return a.journey ? a.journey.steps.length : 0;
      case "zones": return a.zones ? ((a.zones.emotional ? a.zones.emotional.items.length : 0) + (a.zones.technical ? a.zones.technical.items.length : 0)) : 0;
      case "rings": return a.rings ? a.rings.items.length : 0;
      case "closeness": return a.close ? a.close.items.length : 0;
      case "future": return a.future ? a.future.items.length : 0;
      case "mfa": return a.mfa ? a.mfa.combos.filter(function (x) { return x.factors.length; }).length : 0;
      case "map": return a.map ? a.map.sheets.reduce(function (s, x) { return s + x.items.length + (x.img ? 1 : 0); }, 0) : 0;
      case "signals": return a.signals ? a.signals.moments.filter(function (m) { return ["ff", "act", "pos", "neg"].some(function (k) { return m.cells[k].text || m.cells[k].mods.length || m.cells[k].pattern; }); }).length : 0;
      case "flow": return a.flow ? a.flow.steps.length : 0;
      case "project": return a.p1 ? (a.p1.desc ? 1 : 0) + a.p1.team.filter(function (m) { return m.name; }).length + a.p1.questions.filter(function (q) { return q.text; }).length : 0;
      case "quotes": return a.quotes ? a.quotes.items.filter(function (q) { return q.text.trim(); }).length : 0;
      case "support": return a.support ? a.support.cards.filter(function (c) { return c.needs || c.how || c.helper; }).length + (a.support.improve ? 1 : 0) : 0;
      case "groups": return a.groups ? a.groups.filter(function (g) { return g.title.trim(); }).length : 0;
      case "involve": var ic = 0; for (var gk in ((a.involve && a.involve.byGroup) || {})) { var gv = a.involve.byGroup[gk]; if (gv.purpose || gv.questions || gv.methods.length || gv.give) ic++; } return ic;
      case "star": return a.star ? a.star.persp.filter(function (p) { return p.notes; }).length + (a.star.concept ? 1 : 0) : 0;
      case "blueprint": var bc = 0; (a.blueprint ? a.blueprint.steps : []).forEach(function (s) { for (var k in s.cells) if (s.cells[k]) bc++; }); return bc;
      case "patterns": return a.patterns ? a.patterns.list.filter(function (p) { return p.on; }).length : 0;
      case "prep": return a.prep ? a.prep.steps.filter(function (s) { return s.text.trim(); }).length + (a.prep.manual ? 1 : 0) : 0;
      case "infra": return a.infra ? a.infra.nodes.filter(function (n) { return n.label || n.riskText; }).length : 0;
      case "loops": return a.iter ? a.iter.versions.filter(function (v) { return v.name || v.feedback || v.changes; }).length : 0;
      case "relabel": return a.relabel ? a.relabel.cards.length : 0;
      case "reqs": return a.reqs ? a.reqs.rows.filter(function (r) { return r.req || r.source; }).length : 0;
      case "story": return a.story ? a.story.panels.filter(function (p) { return p.img || p.caption || p.who || p.what || p.where || p.move || p.fb; }).length : 0;
      case "wall": return a.wall ? a.wall.notes.filter(function (n) { return n.text.trim(); }).length : 0;
      case "mind": return a.mind ? a.mind.nodes.length - 1 : 0;
      case "directions": var v = (a.dirs && a.dirs.values) || {}, dn = 0; for (var j in v) if (v[j] != null) dn++; return dn + (a.dirs && a.dirs.anomalies ? 1 : 0);
    }
    return 0;
  }
  function hasContent(n) { var a = S.project.acts[n]; return itemCount(n) > 0 || !!(a && a.journey && a.journey.title); }
  function statusOf(n) { var a = S.project.acts[n]; if (a && a.done) return "done"; return hasContent(n) ? "started" : "empty"; }
  function catProgress(cid) {
    var list = ACTS.filter(function (a) { return a.cat === cid; }), p = 0;
    list.forEach(function (a) { var s = statusOf(a.n); p += s === "done" ? 1 : s === "started" ? .4 : 0; });
    return list.length ? p / list.length : 0;
  }
  function catMethods(cid) {
    var freq = {};
    ACTS.forEach(function (a) { if (a.cat === cid) a.methods.forEach(function (m) { if (m !== "all") freq[m] = (freq[m] || 0) + 1; }); });
    return Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a] || mName(a).localeCompare(mName(b)); });
  }
  function methodCats(m) { return CATS.filter(function (c) { return ACTS.some(function (a) { return a.cat === c.id && a.methods.indexOf(m) > -1; }); }); }
  function methodActs(m) { return ACTS.filter(function (a) { return a.methods.indexOf(m) > -1; }); }

  /* ---------- shell & routing ---------- */
  var view = document.getElementById("view");
  function shell(route) {
    document.documentElement.lang = S.lang;
    var top = route.split("-")[0], cur = top === "activity" || top === "cat" ? "activities" : top;
    document.getElementById("nav").innerHTML = ["start", "activities", "methods", "literature"].map(function (r) {
      return '<a href="#' + r + '"' + (cur === r ? ' aria-current="page"' : "") + ">" + t(r) + "</a>";
    }).join("");
    var pn = document.getElementById("projName");
    if (!pn.querySelector("input")) { pn.innerHTML = EX ? '<span class="pn-ex">' + esc(t("exViewing")) + "</span>" : '<button type="button" class="pn-btn" title="' + t("pnEdit") + '" aria-label="' + esc(t("pnEdit") + ": " + S.project.name) + '"><span class="pn-t">' + esc(S.project.name) + '</span><span class="pn-ic" aria-hidden="true">✎</span></button>'; var pb2 = pn.querySelector(".pn-btn"); if (pb2) pb2.onclick = editProjName; }
    document.body.classList.toggle("exmode", !!EX);
    var eb = document.getElementById("exBar"); if (EX) { if (!eb) { eb = document.createElement("div"); eb.id = "exBar"; eb.className = "exbar"; eb.setAttribute("role", "status"); document.querySelector("header.top").after(eb); } eb.innerHTML = "<span>" + t("exBar") + '</span><button type="button" class="btn small primary" id="exLeave">' + t("exLeave") + "</button>"; eb.querySelector("#exLeave").onclick = leaveExample; } else if (eb) eb.remove();
    document.getElementById("saveBtn").disabled = !!EX;
    document.getElementById("saveBtn").textContent = t("save");
    var ub = document.getElementById("undoBtn"); ub.innerHTML = '<span aria-hidden="true">↶</span><span class="ub-l">' + t("undo") + "</span>"; ub.setAttribute("aria-label", t("undo") + " (Ctrl+Z)"); ub.title = t("undo") + " (Ctrl+Z)"; undoState();
    var pb = document.getElementById("pdfBtn"); pb.textContent = t("pdf"); pb.setAttribute("aria-current", cur === "report" ? "page" : "false");
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === S.lang); });
    document.getElementById("chipHelp").textContent = t("chipHelp"); document.getElementById("skipLink").textContent = t("skip");
    document.getElementById("foot").innerHTML = "<span><b>Authentication Design Activities</b> · " + t("conceptBy") + '</span><span><a href="#literature">' + t("literature") + '</a> · <a href="#methods">' + t("methods") + '</a> · <a href="#about">' + t("about") + '</a> · <button type="button" class="linkbtn" id="onbShow">' + t("onbShow") + '</button> · <button type="button" class="linkbtn" id="shareBtn">' + t("shTitle") + "</button></span>";
    var shb = document.getElementById("shareBtn"); if (shb) shb.onclick = shareDialog;
    var os = document.getElementById("onbShow"); if (os) os.onclick = function () { S.onb = S.onb || {}; S.onb.hidden = false; save(); if (location.hash === "#start" || !location.hash) rerender(); else location.hash = "#start"; window.scrollTo(0, 0); };
  }
  function rerender() { route(); }
  var cleanup = [], lastAct = 0;
  function route() {
    cleanup.forEach(function (f) { f(); }); cleanup = [];
    var h = (location.hash || "#start").slice(1) || "start";
    shell(h);
    var an = h.indexOf("activity-") === 0 ? +h.split("-")[1] : 0;
    view.classList.remove("enter", "fwd", "back"); void view.offsetWidth; view.classList.add("enter");
    if (an && lastAct && an !== lastAct) view.classList.add(an > lastAct ? "fwd" : "back");
    lastAct = an;
    if (h === "activities" || h.indexOf("cat-") === 0) renderActivities(h);
    else if (h === "methods") renderMethods();
    else if (h === "report") renderReport();
    else if (h === "literature") renderLiterature();
    else if (h === "about") renderAbout();
    else if (h === "basics" || h.indexOf("basics-") === 0) renderBasics(h.split("-")[1]);
    else if (h.indexOf("activity-") === 0 && defOf(+h.split("-")[1])) renderActivity(+h.split("-")[1]);
    else renderStart();
  }
  window.addEventListener("hashchange", function () { route(); window.scrollTo(0, 0); var h1 = view.querySelector("h1"); if (h1) { h1.tabIndex = -1; h1.focus({ preventScroll: true }); } });

  /* ---------- start ---------- */
  function renderStart() {
    var d = 0, s = 0;
    ACTS.forEach(function (a) { var st = statusOf(a.n); if (st === "done") d++; else if (st === "started") s++; });
    var bar = CATS.map(function (c) { var n = ACTS.filter(function (a) { return a.cat === c.id; }).length; return '<span style="width:' + (catProgress(c.id) * n / ACTS.length * 100) + "%;background:" + (c.outline ? "var(--navy)" : c.color) + '"></span>'; }).join("");
    view.innerHTML =
      '<section class="hero"><div class="hero-text">' +
      '<h1>Authentication Design Activities</h1><div class="sub">' + t("subtitle") + '</div><div class="hero-author">' + t("author") + '</div><p class="hero-context">' + t("contextShort") + ' <a href="#about">' + t("more") + " →</a></p><p>" + t("heroP") + '</p><aside class="open-note"><b>' + t("openTitle") + "</b> " + t("openText") + "</aside>" +
      '<div class="hero-actions"><a class="btn primary" href="#activity-1">' + t("openActs") + '</a><a class="btn" href="#methods">' + t("browse") + "</a></div>" +
      '</div><div class="hero-art"><canvas id="art" aria-hidden="true"></canvas></div></section>' +
      onboarding() + authConcept() +
      '<div class="start-grid">' +
      '<section class="panel proj-card"><h2>' + t("yourProject") + '</h2><label class="caps" for="pname" style="color:var(--c-blue);font-size:.7rem">' + t("projectName") + '</label><input id="pname" value="' + esc(S.project.name) + '">' +
      (S.project.example ? '<span class="example-flag">' + t("example") + "</span>" : "") +
      '<fieldset class="uc"><legend class="caps">' + t("ucLabel") + "</legend>" + [["new", t("ucNew"), t("ucNewD")], ["existing", t("ucEx"), t("ucExD")]].map(function (u) { return '<label class="uc-opt"><input type="radio" name="uc" value="' + u[0] + '"' + (useCase() === u[0] ? " checked" : "") + '><span><b>' + u[1] + "</b><small>" + u[2] + "</small></span></label>"; }).join("") + '</fieldset><label class="caps" for="pteam" style="color:var(--c-blue);font-size:.7rem;display:block;margin-top:10px">' + t("team") + '</label><input id="pteam" class="team-in" placeholder="' + t("teamPh") + '" value="' + esc(S.project.team || "") + '"><div class="bar">' + bar + '</div><div class="hint">' + fmt(t("progress"), { d: d, s: s, t: ACTS.length }) + "</div>" +
      '<div class="hero-actions" style="margin-top:14px">' + (!EX && S.lastAct && defOf(S.lastAct) ? '<a class="btn primary" href="#activity-' + S.lastAct + '">' + fmt(t("resume"), { n: S.lastAct }) + '</a><a class="btn" href="#activities">' + t("continue") + "</a>" : '<a class="btn primary" href="#activities">' + t("continue") + "</a>") + '<button class="btn" type="button" id="fileP">' + t("save") + '</button><button class="btn ghost" type="button" id="newP">' + t("newProject") + "</button></div>" +
      '<p class="hint" style="margin-top:12px">' + t("savedLocal") + "</p></section>" +
      '<section class="panel"><h2>' + t("howTitle") + "</h2><ol>" + t("how").map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol></section>" +
      '<section class="panel"><h2>' + t("whatTitle") + "</h2><p>" + t("whatP1") + "</p><p>" + t("whatP2") + '</p><p><a class="more-link" href="#basics">' + t("basicsMore") + " →</a></p></section></div>" +
      (EX ? "" : '<p class="example-line">' + t("exampleHint") + ' <button class="linkbtn" type="button" id="exP">' + t("loadExample") + "</button></p>");
    document.getElementById("pname").addEventListener("input", function (e) { S.project.name = e.target.value; save(); shell("start"); });
    document.getElementById("pname").addEventListener("change", refreshOnb);
    document.getElementById("pteam").addEventListener("input", function (e) { S.project.team = e.target.value; save(); });
    view.querySelectorAll('input[name="uc"]').forEach(function (r) { r.onchange = function () { S.project.useCase = r.value; save(); toast(r.value === "existing" ? t("ucExToast") : t("ucNewToast")); }; });
    document.getElementById("newP").onclick = function () { confirmReplace(t("sNewConfirm"), function () { S.project = emptyProject(); }); };
    document.getElementById("fileP").onclick = saveDialog;
    var ex = document.getElementById("exP");
    if (ex) ex.onclick = function () { enterExample("#activities"); };
    if (EX) view.querySelectorAll(".proj-card input, .proj-card #newP, .proj-card #fileP").forEach(function (x) { x.disabled = true; });
    drawArt(document.getElementById("art"));
    bindAuthConcept(); bindOnboarding();
  }



  /* ---------- first steps (dismissible) ---------- */
  function onbState() { S.onb = S.onb || {}; var def = [emptyProject("en").name, emptyProject("de").name]; return [def.indexOf((EX ? EX.real : S.project).name) < 0, !!S.lastAct, !!S.onb.seenEx]; }
  function onboarding() {
    if (EX || (S.onb && S.onb.hidden)) return "";
    var st = onbState(), all = st.every(Boolean), O = t("onb");
    return '<section class="panel onb' + (all ? " done" : "") + '" id="onb" aria-labelledby="onbT"><div class="onb-head"><h2 id="onbT">' + (all ? t("onbDone") : t("onbTitle")) + '</h2><span class="onb-count" aria-hidden="true">' + st.filter(Boolean).length + " / 3</span><button type=\"button\" class=\"x\" id=\"onbX\" aria-label=\"" + t("onbHide") + '" title="' + t("onbHide") + '">×</button></div><ol class="onb-steps">' +
      O.map(function (o, i) { return '<li class="' + (st[i] ? "ok" : "") + '"><span class="onb-n" aria-hidden="true">' + (st[i] ? "✓" : i + 1) + '</span><div><b>' + o[0] + "</b>" + (st[i] ? ' <span class="sr-only">(' + t("onbOk") + ")</span>" : "") + '<p>' + o[1] + '</p><button type="button" class="btn small' + (st[i] ? " ghost" : i === st.indexOf(false) ? " primary" : "") + '" data-onb="' + i + '">' + o[2] + "</button></div></li>"; }).join("") + "</ol></section>";
  }
  function bindOnboarding() {
    var r = document.getElementById("onb"); if (!r) return;
    r.querySelector("#onbX").onclick = function () { S.onb.hidden = true; save(); r.classList.add("leave"); setTimeout(function () { r.remove(); }, 260); toast(t("onbHidden")); };
    r.querySelectorAll("[data-onb]").forEach(function (b) { b.onclick = function () {
      var i = +b.dataset.onb;
      if (i === 0) { var pn = document.querySelector(".pn-btn"); if (pn) pn.click(); }
      if (i === 1) location.hash = "#activities";
      if (i === 2) exampleDialog(6);
    }; });
  }
  /* ---------- start: authentication as a whole concept (animated arrow) ---------- */
  var acPaused = false;
  function authConcept() {
    var P = t("acParts");
    return '<section class="panel ac" id="ac" aria-labelledby="acT"><div class="ac-text"><h2 id="acT">' + t("acTitle") + '</h2><p class="ac-desc" id="acDesc" aria-live="polite">' + t("acIntro") + '</p><a class="btn small vh" id="acGo" href="#activities" aria-hidden="true" tabindex="-1">' + t("acOpen") + ' →</a></div>' +
      '<div class="ac-fig"><svg class="ac-svg' + (acPaused ? " paused" : "") + '" viewBox="0 0 560 290" role="img" aria-label="' + esc(P.map(function (x) { return x[0]; }).join(" → ")) + '">' +
      '<circle class="ac-big" data-p="2" cx="400" cy="145" r="136"/><circle class="ac-ring" cx="400" cy="145" r="136"/>' +
      '<g class="ac-arrow" data-p="1"><rect x="176" y="100" width="206" height="90"/><polygon points="380,52 476,145 380,238"/></g>' +
      '<circle class="ac-cand" data-p="0" cx="104" cy="145" r="45"/>' +
      '<path class="ac-check" d="M392 147 l12 12 l24 -29" fill="none"/></svg>' +
      '<div class="ac-labels">' + P.map(function (x, i) { return '<button type="button" class="ac-l ac-l' + i + '" data-p="' + i + '" aria-pressed="false">' + esc(x[0]) + "</button>"; }).join("") + "</div>" +
      '<button type="button" class="ac-pause" id="acPause" aria-label="' + t(acPaused ? "acPlay" : "acPause") + '">' + (acPaused ? "▶" : "❚❚") + "</button></div></section>";
  }
  function bindAuthConcept() {
    var root = document.getElementById("ac"); if (!root) return;
    var svg = root.querySelector(".ac-svg"), desc = root.querySelector("#acDesc"), go = root.querySelector("#acGo"), P = t("acParts"), sel = -1;
    function show(i, sticky) {
      root.querySelectorAll("[data-p]").forEach(function (e) { e.classList.toggle("on", +e.dataset.p === i); e.classList.toggle("off", i > -1 && +e.dataset.p !== i); });
      svg.classList.toggle("focus", i > -1);
      if (i < 0) { desc.textContent = t("acIntro"); go.classList.add("vh"); go.setAttribute("aria-hidden", "true"); go.tabIndex = -1; return; }
      desc.innerHTML = "<b>" + esc(P[i][0]) + ".</b> " + esc(P[i][1]); go.classList.remove("vh"); go.removeAttribute("aria-hidden"); go.removeAttribute("tabindex"); go.href = "#cat-" + P[i][2];
      if (sticky) root.querySelectorAll(".ac-l").forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.p === i); });
    }
    root.querySelectorAll(".ac-l").forEach(function (b) {
      var i = +b.dataset.p;
      b.onclick = function () { sel = sel === i ? -1 : i; root.querySelectorAll(".ac-l").forEach(function (x) { x.setAttribute("aria-pressed", +x.dataset.p === sel); }); show(sel, true); };
      b.onmouseenter = function () { show(i); }; b.onmouseleave = function () { show(sel); };
    });
    svg.querySelectorAll("[data-p]").forEach(function (e) { var i = +e.dataset.p; e.addEventListener("mouseenter", function () { show(i); }); e.addEventListener("mouseleave", function () { show(sel); }); e.addEventListener("click", function () { root.querySelector('.ac-l[data-p="' + i + '"]').click(); }); });
    if ("IntersectionObserver" in window) { var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { svg.classList.add("run"); io.disconnect(); } }, { threshold: .4 }); io.observe(svg); cleanup.push(function () { io.disconnect(); }); } else svg.classList.add("run");
    root.querySelector("#acPause").onclick = function () { acPaused = !acPaused; svg.classList.toggle("paused", acPaused); this.textContent = acPaused ? "▶" : "❚❚"; this.setAttribute("aria-label", t(acPaused ? "acPlay" : "acPause")); };
  }
  function drawArt(cv) {
    var r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    cv.width = r.width * dpr; cv.height = r.height * dpr;
    var g = cv.getContext("2d"); g.scale(dpr, dpr);
    var W = r.width, H = r.height, cx = W * .55, cy = H * .55, R = Math.min(W, H) * .36;
    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* pointer attraction: P = smoothed offset (-1..1) and strength 0..1 */
    var P = { x: 0, y: 0, s: 0 }, T = { x: 0, y: 0, s: 0 };
    var cx0 = cx, cy0 = cy;
    function frame(tm) {
      var t1 = tm / 1000;
      P.x += (T.x - P.x) * .08; P.y += (T.y - P.y) * .08; P.s += (T.s - P.s) * .06;
      var dirA = Math.atan2(P.y, P.x), pull = P.s * Math.min(1, Math.hypot(P.x, P.y));
      function at(k) { return [cx0 + P.x * R * k * P.s, cy0 + P.y * R * k * P.s]; }
      g.clearRect(0, 0, W, H);
      var c0 = at(.08); cx = c0[0]; cy = c0[1];
      g.fillStyle = "#e6ee58"; g.beginPath();
      for (var i = 0; i < 18; i++) { var a = i / 18 * Math.PI * 2 - .3 + P.x * P.s * .12, rr = (i % 2 ? R * 1.05 : R * 1.5) * (1 + .06 * pull * Math.cos(a - dirA)); g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
      g.closePath(); g.fill();
      /* liquid blob: two slow phases so the outline breathes */
      var p1 = 1 + Math.sin(t1 * .35) * .9, p2 = 2 + Math.cos(t1 * .27) * 1.1, wob = .07 + Math.sin(t1 * .5) * .012;
      var c1 = at(.22); cx = c1[0]; cy = c1[1];
      function blob(rad) { g.beginPath(); for (var k = 0; k <= 120; k++) { var th = k / 120 * Math.PI * 2, d = Math.cos(th - dirA), q = rad * (1 + wob * Math.sin(3 * th + p1) + wob * .7 * Math.sin(5 * th + p2) + .16 * pull * Math.pow(Math.max(0, d), 3) - .04 * pull * Math.max(0, -d)); g.lineTo(cx + Math.cos(th) * q, cy + Math.sin(th) * q); } g.closePath(); }
      blob(R); g.fillStyle = "#1f4a9a"; g.fill();
      g.save(); blob(R); g.clip(); g.fillStyle = "#202c51";
      var step = R / 4.2;
      for (var y = cy - R * 1.3; y < cy + R * 1.3; y += step) for (var x = cx - R * 1.3 + ((Math.round((y - cy) / step) % 2) ? step / 2 : 0); x < cx + R * 1.3; x += step) { g.beginPath(); g.arc(x, y, step * .3, 0, 7); g.fill(); }
      g.restore();
      var c2 = at(.42); cx = c2[0]; cy = c2[1];
      g.fillStyle = "#1f4a9a"; g.beginPath(); g.arc(cx, cy, R * .58, 0, 7); g.fill();
      g.strokeStyle = "#6dbcdf"; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, R * .55, 0, 7); g.stroke();
      var c3 = at(.55); g.fillStyle = "#6dbcdf"; g.beginPath(); g.arc(c3[0], c3[1], R * .48, 0, 7); g.fill();
      var c4 = at(-.1); cx = c4[0]; cy = c4[1];
      /* drifting outline */
      var q1 = 2 + Math.sin(t1 * .22) * 1.4, q2 = 4 + Math.cos(t1 * .31) * 1.2, amp = .12 + Math.sin(t1 * .4) * .025;
      g.strokeStyle = "#6dbcdf"; g.lineWidth = 2.5; g.beginPath();
      for (var k2 = 0; k2 <= 160; k2++) { var th2 = k2 / 160 * Math.PI * 2, rq = R * 1.22 * (1 + amp * Math.sin(2 * th2 + q1) + .08 * Math.sin(3 * th2 + q2)); g.lineTo(cx - R * .1 + Math.cos(th2) * rq, cy + Math.sin(th2) * rq * .92); }
      g.closePath(); g.stroke();
      cx = cx0; cy = cy0;
    }
    if (still) { frame(0); return; }
    function onMove(e) {
      var b = cv.getBoundingClientRect(), mx = e.clientX - b.left - cx0, my = e.clientY - b.top - cy0, dist = Math.hypot(mx, my), reach = R * 2.6;
      if (dist > reach) { T.s = 0; return; }
      var n = Math.max(dist, 1), k = Math.min(1, dist / (R * 1.2));
      T.x = mx / n * k; T.y = my / n * k; T.s = 1 - Math.pow(dist / reach, 2);
    }
    function onLeave() { T.s = 0; }
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    var alive = true, vis = true, raf;
    function loop(tm) { if (!alive) return; if (vis && !document.hidden) frame(tm); raf = requestAnimationFrame(loop); }
    raf = requestAnimationFrame(loop);
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }) : null; if (io) io.observe(cv);
    cleanup.push(function () { alive = false; cancelAnimationFrame(raf); if (io) io.disconnect(); window.removeEventListener("pointermove", onMove); document.documentElement.removeEventListener("pointerleave", onLeave); });
  }


  /* ---------- activities overview ---------- */
  function band() {
    return '<nav class="band" aria-label="Process">' + CATS.map(function (c) {
      var n = ACTS.filter(function (a) { return a.cat === c.id; }).length;
      return '<a href="#cat-' + c.id + '" class="' + (c.outline ? "outline" : "") + '" style="' + chipStyle(c) + '"><span>' + L([c.en, c.de]) + "<br><small>" + n + " · " + t("activities") + '</small></span><span class="meter"' + (c.outline ? ' style="background:var(--mint)"' : "") + '><i style="width:' + Math.round(catProgress(c.id) * 100) + '%"></i></span></a>';
    }).join("") + "</nav>";
  }
  function growMeters() { var ms = view.querySelectorAll(".band .meter i"); ms.forEach(function (m) { m.dataset.w = m.style.width; m.style.width = "0"; }); requestAnimationFrame(function () { requestAnimationFrame(function () { ms.forEach(function (m) { m.style.width = m.dataset.w; }); }); }); }
  var AF = { q: "", m: "", st: "", mode: "" };
  function actText(a) { return [t("modes")[modeOf(a.n)][0], L(a.title), a.title[0], a.title[1], a.q ? a.q[0] + " " + a.q[1] : "", a.i ? a.i[0] + " " + a.i[1] : "", (a.methods || []).map(mName).join(" ")].join(" ").toLowerCase(); }
  function hl(txt, q) { var e = esc(txt); if (!q) return e; var i = txt.toLowerCase().indexOf(q); return i < 0 ? e : esc(txt.slice(0, i)) + "<mark>" + esc(txt.slice(i, i + q.length)) + "</mark>" + esc(txt.slice(i + q.length)); }
  function renderActivities(h) {
    var meths = Object.keys(METHODS).filter(function (m) { return m !== "all"; }).sort(function (x, y) { return mName(x).localeCompare(mName(y)); });
    view.innerHTML = band() + '<form class="afilter" id="af" role="search" onsubmit="return false"><label class="af-q"><span class="sr-only">' + t("afSearch") + '</span><span class="af-ic" aria-hidden="true">⌕</span><input type="search" id="afq" placeholder="' + t("afSearch") + '" autocomplete="off"></label><label class="af-m"><span class="sr-only">' + t("afMethod") + '</span><select id="afm"><option value="">' + t("afAllMethods") + "</option>" + meths.map(function (m) { return '<option value="' + m + '">' + esc(mName(m)) + "</option>"; }).join("") + '</select></label><div class="seg" role="group" aria-label="' + t("afStatus") + '">' + [["", t("mAll")], ["empty", t("empty")], ["started", t("started")], ["done", t("isDone")]].map(function (o) { return '<button type="button" data-st="' + o[0] + '">' + esc(o[1]) + "</button>"; }).join("") + '</div><span class="af-count" id="afc" role="status" aria-live="polite"></span><button type="button" class="linkbtn" id="afr" hidden>' + t("afReset") + '</button><div class="af-modes" role="group" aria-label="' + t("modeLabel") + '"><span class="hint">' + t("modeLabel") + ":</span>" + ["frame", "now", useCase() === "existing" ? "existing" : "concept", "reflect"].map(function (m) { return '<button type="button" class="mode m-' + m + '" data-mode="' + m + '" title="' + esc(t("modes")[m][1]) + '">' + modeIcon(m) + t("modes")[m][0] + "</button>"; }).join("") + '</div></form><div id="aflist"></div>';
    var q = view.querySelector("#afq"), m = view.querySelector("#afm"), list = view.querySelector("#aflist");
    q.value = AF.q; m.value = AF.m;
    function draw() {
      var qq = AF.q.trim().toLowerCase(), html = "", shown = 0;
      CATS.forEach(function (c) {
        var acts = ACTS.filter(function (a) { return a.cat === c.id && (!qq || actText(a).indexOf(qq) > -1) && (!AF.m || (a.methods || []).indexOf(AF.m) > -1) && (!AF.st || statusOf(a.n) === AF.st) && (!AF.mode || modeOf(a.n) === AF.mode); });
        if (!acts.length) return;
        shown += acts.length;
        html += '<section class="cat-block" id="cat-' + c.id + '"><div class="cat-head"><span class="cat-chip ' + (c.outline ? "outline" : "") + '" style="' + chipStyle(c) + '">' + L([c.en, c.de]) + '</span></div><div class="cards">';
        acts.forEach(function (a, k) {
          var st = statusOf(a.n), nn = itemCount(a.n), viaQ = qq && L(a.title).toLowerCase().indexOf(qq) < 0;
          html += '<a class="card af-in" style="--k:' + Math.min(k, 8) + ';border-top:5px solid ' + (c.outline ? "var(--navy)" : c.color) + '" href="#activity-' + a.n + '">' +
            '<span class="caps num">' + t("activity") + " " + a.n + "</span><h3>" + hl(L(a.title), qq) + "</h3>" + modeBadge(a.n, true) + (viaQ ? '<span class="af-why">' + t("afInText") + "</span>" : "") + (AF.m ? '<span class="af-why">' + esc(mName(AF.m)) + "</span>" : "") + '<span class="meta"><span class="state ' + st + '"></span>' + t(st === "empty" ? "empty" : st === "done" ? "isDone" : "started") + (nn ? " · " + fmt(t("entries"), { n: nn }) : "") + "</span></a>";
        });
        html += "</div></section>";
      });
      list.innerHTML = html || '<div class="panel af-none"><p>' + t("afNone") + '</p><button type="button" class="btn small" id="afr2">' + t("afReset") + "</button></div>";
      var filtered = !!(qq || AF.m || AF.st || AF.mode);
      view.querySelectorAll("[data-mode]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === AF.mode); });
      view.querySelector("#afc").textContent = filtered ? fmt(t("afCount"), { n: shown, t: ACTS.length }) : "";
      view.querySelector("#afr").hidden = !filtered;
      view.querySelectorAll("[data-st]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.st === AF.st); });
      var r2 = list.querySelector("#afr2"); if (r2) r2.onclick = reset;
    }
    view.querySelectorAll("[data-mode]").forEach(function (b) { b.onclick = function () { AF.mode = AF.mode === b.dataset.mode ? "" : b.dataset.mode; draw(); }; });
    function reset() { AF = { q: "", m: "", st: "", mode: "" }; q.value = ""; m.value = ""; draw(); q.focus(); }
    q.oninput = function () { AF.q = q.value; draw(); };
    q.onkeydown = function (e) { if (e.key === "Escape" && q.value) { e.preventDefault(); AF.q = ""; q.value = ""; draw(); } };
    m.onchange = function () { AF.m = m.value; draw(); };
    view.querySelectorAll("[data-st]").forEach(function (b) { b.onclick = function () { AF.st = b.dataset.st; draw(); }; });
    view.querySelector("#afr").onclick = reset;
    draw();
    growMeters();
    if (h.indexOf("cat-") === 0) { var el = document.getElementById(h); if (el) setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 0); }
  }


  /* ---------- single activity ---------- */
  var RENDER = {};
  function renderActivity(n) {
    if (!EX && S.lastAct !== n) { S.lastAct = n; save(); }
    var d = defOf(n), c = catOf(d.cat), a = act(n);
    var idx = ACTS.indexOf(d), prev = ACTS[idx - 1], next = ACTS[idx + 1];
    var recs = d.methods.map(function (m) { return m === "all" ? "<span>" + mName(m) + "</span>" : '<button type="button" data-m="' + m + '">' + esc(mName(m)) + "</button>"; }).join("");
    view.innerHTML =
      '<div class="act-head"><div><span class="act-label caps ' + (c.outline ? "cat-chip outline" : "") + '" style="' + chipStyle(c) + '">' + t("activity") + " " + n + " · " + L([c.en, c.de]) + "</span> " + modeBadge(n) +
      "<h1>" + esc(L(d.title)) + '</h1><p class="act-q">' + esc(L(qOf(d))) + '</p><p class="act-i">' + esc(L(d.i)) + '</p><p class="mode-note m-' + modeOf(n) + '">' + modeIcon(modeOf(n)) + "<span>" + t("modes")[modeOf(n)][1] + "</span></p></div>" +
      (d.methods.length ? '<aside class="recs' + (d.methods.length >= 9 ? " lots" : d.methods.length >= 7 ? " many" : "") + '"><div class="recs-in"><span class="caps recs-t">' + t("recs").replace(/^(Methoden-|Method )/, "$1<br>") + "</span>" + recs + "</div></aside>" : "<div></div>") + "</div>" +
      '<div class="act-tools"><label class="btn small"><input type="checkbox" id="doneChk"' + (a.done ? " checked" : "") + "> " + t("markDone") + '</label><a class="btn small ghost" href="#cat-' + c.id + '">← ' + t("back") + '</a><span style="flex:1"></span>' + (function () { var rr = refsForAct(n), k = rr.direct.length + rr.via.length; return (EX ? "" : '<button class="linkbtn small-lit ex-peek" type="button" id="exPeek"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style="vertical-align:-2px"><circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1.5a5.5 5.5 0 0 1 0 11z" fill="currentColor"/></svg> ' + t("exPeek") + "</button>") + (k ? '<button class="linkbtn small-lit" type="button" id="litBtn">' + fmt(t("litLink"), { n: k }) + "</button>" : ""); })() + "</div>" +
      '<section class="act-body" id="body"></section>' +
      '<nav class="pager">' + (prev ? '<a href="#activity-' + prev.n + '">← ' + prev.n + " · " + esc(L(prev.title)) + "</a>" : "<span></span>") + (next ? '<a href="#activity-' + next.n + '">' + next.n + " · " + esc(L(next.title)) + " →</a>" : "") + "</nav>";
    var pk = document.getElementById("exPeek"); if (pk) pk.onclick = function () { exampleDialog(n); };
    var BL = { 7: "interface", 8: "who", 21: "interface", 22: "interface", 24: "access", 25: "access", 26: "factors", 27: "factors", 29: "behind" };
    if (BL[n]) { var note = view.querySelector(".mode-note span"); if (note) note.insertAdjacentHTML("beforeend", ' <a class="more-link" href="#basics-' + BL[n] + '">' + t("basicsLink") + " →</a>"); }
    if (EX) { document.getElementById("doneChk").disabled = true; }
    document.getElementById("doneChk").onchange = function (e) { a.done = e.target.checked; save(); var lb = e.target.parentNode; lb.classList.remove("celebrate"); if (a.done) { void lb.offsetWidth; lb.classList.add("celebrate"); var left = ACTS.filter(function (x) { return x.cat === c.id && statusOf(x.n) !== "done"; }).length; toast(left ? fmt(t("doneLeft"), { n: left, c: L([c.en, c.de]) }) : fmt(t("doneCat"), { c: L([c.en, c.de]) })); } };
    var lb = document.getElementById("litBtn"); if (lb) lb.onclick = function () { actLitDialog(n); };
    view.querySelectorAll(".recs button").forEach(function (b) { b.onclick = function () { methodDialog(b.dataset.m); }; });
    var bodyEl = document.getElementById("body");
    RENDER[d.type](bodyEl, d, a, c);
    if (EX) bodyEl.inert = true;
    if (LIST[d.type]) {
      listToggle(bodyEl, function () { var y = window.scrollY; renderActivity(n); window.scrollTo(0, y); });
      if (S.listMode) { cleanup.forEach(function (f) { f(); }); cleanup = []; bodyEl.innerHTML = ""; LIST[d.type](bodyEl, d, a); }
    }
  }

  function autosize(el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; }

  /* a column of notes, used by generic boards, principles and summary */
  function noteList(listEl, arr, accent, label) {
    function draw(focusId) {
      listEl.innerHTML = "";
      arr.forEach(function (note, k) {
        var el = document.createElement("div"); el.className = "note"; el.style.setProperty("--accent", accent); fresh(el, note.id);
        el.innerHTML = '<textarea rows="1" aria-label="' + esc(label) + '"></textarea><button class="x" type="button" aria-label="' + t("del") + '">×</button>';
        var ta = el.querySelector("textarea"); ta.value = note.text;
        ta.addEventListener("input", function () { note.text = ta.value; autosize(ta); save(); });
        ta.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); var nn = { id: uid(), text: "" }; arr.splice(k + 1, 0, nn); save(); draw(nn.id); }
          if (e.key === "Backspace" && !ta.value && arr.length > 1) { e.preventDefault(); arr.splice(k, 1); save(); draw(arr[Math.max(0, k - 1)].id); }
        });
        el.querySelector(".x").onclick = function () { arr.splice(k, 1); save(); draw(); };
        listEl.appendChild(el); autosize(ta);
        if (focusId === note.id) ta.focus();
      });
    }
    draw();
    return { add: function (text) { var nn = { id: uid(), text: text || "" }; arr.push(nn); save(); draw(text ? null : nn.id); }, draw: draw };
  }
  function fieldsBoard(body, d, a, c, colClass) {
    a.fields = a.fields || {};
    var accent = c.outline ? "var(--navy)" : c.color;
    body.innerHTML = '<div class="cols ' + (colClass || "") + '">' + d.fields.map(function (f, i) {
      return '<div class="col" data-f="' + i + '"><h3>' + esc(L(f)) + '</h3><div class="list"></div><button class="add" type="button">' + t("addNote") + "</button></div>";
    }).join("") + '</div><p class="hint" style="margin:12px 0 0">' + t("noteHint") + "</p>";
    var lists = [];
    body.querySelectorAll(".col").forEach(function (col) {
      var f = col.dataset.f; a.fields[f] = a.fields[f] || [];
      var nl = noteList(col.querySelector(".list"), a.fields[f], accent, L(d.fields[f]));
      col.querySelector(".add").onclick = function () { nl.add(); };
      lists[f] = nl;
    });
    return lists;
  }
  RENDER.generic = function (body, d, a, c) { fieldsBoard(body, d, a, c); };

  /* drag helper for chips on a stage (positions in % of the stage) */
  function dragChip(el, stage, it, onMove, onEnd) {
    el.addEventListener("pointerdown", function (e) {
      if (e.button > 0 || el.classList.contains("editing")) return;
      e.preventDefault(); e.stopPropagation(); el.setPointerCapture(e.pointerId); el.classList.add("dragging");
      var rect = stage.getBoundingClientRect();
      function mv(ev) { it.x = Math.max(2, Math.min(98, (ev.clientX - rect.left) / rect.width * 100)); it.y = Math.max(2, Math.min(98, (ev.clientY - rect.top) / rect.height * 100)); el.style.left = it.x + "%"; el.style.top = it.y + "%"; if (onMove) onMove(); }
      function up() { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); el.classList.remove("dragging"); save(); if (onEnd) onEnd(); }
      el.addEventListener("pointermove", mv); el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    });
    el.addEventListener("keydown", function (e) {
      var dx = { ArrowLeft: -3, ArrowRight: 3 }[e.key] || 0, dy = { ArrowUp: -3, ArrowDown: 3 }[e.key] || 0;
      if (dx || dy) { e.preventDefault(); it.x = Math.max(2, Math.min(98, it.x + dx)); it.y = Math.max(2, Math.min(98, it.y + dy)); el.style.left = it.x + "%"; el.style.top = it.y + "%"; save(); if (onEnd) onEnd(); }
    });
  }
  function chipList(items, onDel) {
    var wrap = document.createElement("div"); wrap.className = "chips";
    items.forEach(function (it) {
      var c = document.createElement("span"); c.className = "chip"; c.innerHTML = esc(it.text) + '<button type="button" aria-label="' + t("del") + " " + esc(it.text) + '">×</button>';
      c.querySelector("button").onclick = function () { onDel(it); };
      wrap.appendChild(c);
    });
    return wrap;
  }

  /* activity 2: plan methods per category */
  RENDER.plan = function (body, d, a) {
    a.plan = a.plan || {};
    body.innerHTML = '<div class="legend"><span><span class="state"></span>' + t("planLegend")[0] + '</span><span><span class="state ring"></span>' + t("planLegend")[1] + '</span><span><span class="state done"></span>' + t("planLegend")[2] + '</span><span class="hint">' + t("planHint") + '</span></div><div class="plan-scroll"><div class="plan">' +
      CATS.map(function (c) {
        return '<div class="plan-col"><span class="cat-chip ' + (c.outline ? "outline" : "") + '" style="' + chipStyle(c) + '">' + L([c.en, c.de]) + "</span>" +
          catMethods(c.id).map(function (m) { return '<div data-k="' + c.id + ":" + m + '"></div>'; }).join("") + "</div>";
      }).join("") + "</div></div>";
    body.querySelectorAll("[data-k]").forEach(function (slot) {
      var k = slot.dataset.k, m = k.split(":")[1];
      function draw() {
        var p = a.plan[k] || {}, st = p.state || "";
        slot.innerHTML = '<button type="button" class="mchip ' + st + '"><span class="state ' + (st === "done" ? "done" : "") + '"></span><span>' + esc(mName(m)) + "</span></button>" + (st ? '<input class="who" placeholder="' + t("who") + '" aria-label="' + t("who") + '" value="' + esc(p.who || "") + '">' : "");
        slot.querySelector("button").onclick = function () { var nx = { "": "planned", planned: "done", done: "" }[st]; a.plan[k] = { state: nx, who: p.who || "" }; save(); draw(); if (nx) slot.querySelector("input").focus(); };
        var w = slot.querySelector("input"); if (w) w.oninput = function () { a.plan[k].who = w.value; save(); };
      }
      draw();
    });
  };

  /* activity 5: concentric circles */
  var RING_R = [.47, .365, .26, .155];
  function ringOf(it) { var dd = Math.hypot(it.x - 50, it.y - 50) / 100, k = -1; for (var i = 0; i < RING_R.length; i++) if (dd <= RING_R[i]) k = i; return k; }
  function ringsSvg(labels, forPrint) {
    var svg = '<svg viewBox="0 0 100 100" aria-hidden="true"><defs>';
    RING_R.forEach(function (r, i) { var rr = (r - .025) * 100; svg += '<path id="rp' + i + (forPrint ? "p" : "") + '" d="M ' + (50 - rr) + ' 50 A ' + rr + " " + rr + " 0 0 1 " + (50 + rr) + ' 50"/>'; });
    svg += "</defs>";
    RING_R.forEach(function (r, i) { svg += '<circle cx="50" cy="50" r="' + r * 100 + '" fill="' + (i % 2 ? "#fff" : "#d1efe4") + '" stroke="#6dbcdf" stroke-width=".35"/>'; });
    labels.forEach(function (l, i) { svg += '<text font-size="2.6" font-weight="700" letter-spacing=".6" fill="#1f4a9a"><textPath href="#rp' + i + (forPrint ? "p" : "") + '" startOffset="50%" text-anchor="middle">' + esc(l.toUpperCase()) + "</textPath></text>"; });
    return svg;
  }
  RENDER.rings = function (body, d, a, c) {
    var R = a.rings = a.rings || { items: [] };
    if (a.fields && !R.migrated) { d.fields.forEach(function (_, i) { notesOf(5, i).forEach(function (tx, j) { R.items.push(placeInRing(tx, i, j)); }); }); R.migrated = true; save(); }
    var labels = d.fields.map(function (f) { return L(f).split(":")[0]; });
    body.innerHTML = '<p class="hint" style="margin:0 0 12px">' + t("rHint") + '</p><div class="zones"><div><div class="zstage" id="rs"></div></div><div class="zside"><form class="addrow" id="rf"><input id="ri" placeholder="' + t("rKeyword") + '" aria-label="' + t("rKeyword") + '"><select id="rsel" aria-label="' + t("rAddTo") + '">' + labels.map(function (l, i) { return '<option value="' + i + '">' + esc(l) + "</option>"; }).join("") + '</select><button class="btn" type="submit">' + t("zAdd") + '</button></form><div id="rl" class="zside"></div></div></div>';
    var stage = body.querySelector("#rs"), rl = body.querySelector("#rl");
    function drawStage() {
      stage.innerHTML = ringsSvg(labels) + "</svg>";
      R.items.forEach(function (it) {
        var el = document.createElement("div"); el.className = "zitem"; el.tabIndex = 0; fresh(el, it.id);
        el.style.left = it.x + "%"; el.style.top = it.y + "%"; el.textContent = it.text; el.title = it.text;
        dragChip(el, stage, it, null, drawList);
        el.addEventListener("keydown", function (e) { if (e.key === "Delete") { R.items.splice(R.items.indexOf(it), 1); save(); drawStage(); drawList(); } });
        chipKit(el, it, kitArr(function () { return R.items; }, function () { drawStage(); drawList(); }));
        stage.appendChild(el);
      });
    }
    function drawList() {
      rl.innerHTML = "";
      d.fields.forEach(function (f, i) {
        var box = document.createElement("div"); box.className = "zrow single";
        box.innerHTML = '<div><div class="zl" style="font-weight:700">' + esc(labels[i]) + '</div><div class="hint">' + esc(L(f).split(":")[1] || "") + "</div></div>";
        box.firstChild.appendChild(chipList(R.items.filter(function (it) { return ringOf(it) === i; }), function (it) { R.items.splice(R.items.indexOf(it), 1); save(); drawStage(); drawList(); }));
        rl.appendChild(box);
      });
    }
    body.querySelector("#rf").onsubmit = function (e) { e.preventDefault(); var i = body.querySelector("#ri"); if (!i.value.trim()) return; R.items.push(placeInRing(i.value.trim(), +body.querySelector("#rsel").value)); i.value = ""; save(); drawStage(); drawList(); i.focus(); };
    drawStage(); drawList();
  };
  function placeInRing(text, ring, j) {
    var outer = RING_R[ring], inner = RING_R[ring + 1] || 0, rad = ring === 3 ? .08 : (outer + inner) / 2;
    var ang = (j != null ? j * 1.1 : Math.random() * 6.28) + ring * .7 + .4;
    return { id: uid(), text: text, x: 50 + Math.cos(ang) * rad * 100, y: 50 + Math.sin(ang) * rad * 100 * .9 + 2 };
  }

  /* activity 6: user journey timeline + swimlane matrix */
  RENDER.journey = function (body, d, a) {
    var J = a.journey = a.journey || { title: "", desc: "", steps: [] };
    var rows = window.ADA_JOURNEY_ROWS, sel = null;
    body.innerHTML = '<div class="jmeta"><div class="field"><label for="jt">' + t("jTitle") + '</label><input id="jt"></div><div class="field"><label for="jd">' + t("jDesc") + '</label><input id="jd"></div></div>' +
      '<p class="hint" style="margin:0 0 6px">' + t("jHint") + '</p><div class="tl-scroll"><div class="timeline" id="tl"><div class="axis"></div></div></div><div class="matrix-wrap"><table class="matrix" id="mx"></table></div><div class="tplist" id="tpl"></div>';
    var jt = body.querySelector("#jt"), jd = body.querySelector("#jd");
    jt.value = J.title; jd.value = J.desc;
    jt.oninput = function () { J.title = jt.value; save(); }; jd.oninput = function () { J.desc = jd.value; save(); };
    var tl = body.querySelector("#tl"), mx = body.querySelector("#mx"), tpl = body.querySelector("#tpl");
    function sorted() { return J.steps.slice().sort(function (x, y) { return x.x - y.x; }); }
    function tpNum(s) { var n = 0, r = 0; sorted().forEach(function (q) { if (q.tp) { n++; if (q === s) r = n; } }); return r; }
    function drawTimeline() {
      tl.style.minWidth = Math.max(0, J.steps.length * 96) + "px";
      tl.querySelectorAll(".tnode").forEach(function (e) { e.remove(); });
      var W = tl.clientWidth || 800, prevX = -1e9, prevAbove = true;
      sorted().forEach(function (s, i) {
        var px = s.x / 100 * W, above = (px - prevX) < 132 && !prevAbove;
        prevX = px; prevAbove = above;
        var el = document.createElement("div"); fresh(el, s.id);
        el.className = (FRESH[s.id] ? "fresh " : "") + "tnode" + (s.tp ? " tp" : "") + (sel === s.id ? " sel" : "") + (above ? " above" : "");
        el.style.left = s.x + "%";
        el.innerHTML = '<div class="dot">' + (s.tp ? "✕" : i + 1) + '</div><div class="lbl">' + esc(s.label || t("step") + " " + (i + 1)) + (s.tp ? " <b>(" + tpNum(s) + ")</b>" : "") + "</div>";
        el.title = s.label;
        drag(el, s);
        tl.appendChild(el);
      });
    }
    function drag(el, s) {
      el.addEventListener("pointerdown", function (e) {
        e.stopPropagation(); el.setPointerCapture(e.pointerId); el.classList.add("dragging");
        var moved = false, rect = tl.getBoundingClientRect(), sx = e.clientX;
        function mv(ev) { if (Math.abs(ev.clientX - sx) > 3) moved = true; s.x = Math.max(2, Math.min(96, (ev.clientX - rect.left) / rect.width * 100)); el.style.left = s.x + "%"; }
        function up() { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up); el.classList.remove("dragging"); sel = s.id; save(); drawAll(); if (!moved) { var inp = mx.querySelector('[data-s="' + s.id + '"] input[type=text]'); if (inp) inp.focus(); } }
        el.addEventListener("pointermove", mv); el.addEventListener("pointerup", up);
      });
    }
    tl.addEventListener("pointerdown", function (e) {
      var rect = tl.getBoundingClientRect(), x = Math.max(2, Math.min(96, (e.clientX - rect.left) / rect.width * 100));
      var s = { id: uid(), x: x, label: "", tp: false, rows: {} }; J.steps.push(s); sel = s.id; save(); drawAll();
      var inp = mx.querySelector('[data-s="' + s.id + '"] input[type=text]'); if (inp) inp.focus();
    });
    function drawMatrix() {
      var st = sorted();
      if (!st.length) { mx.innerHTML = ""; return; }
      var h = "<thead><tr><th></th>" + st.map(function (s, i) {
        return '<td data-s="' + s.id + '"' + (sel === s.id ? ' class="sel"' : "") + '><div class="stephead"><input type="text" placeholder="' + t("newStep") + '" aria-label="' + t("step") + " " + (i + 1) + '" value="' + esc(s.label) + '"><div class="row"><label><input type="checkbox"' + (s.tp ? " checked" : "") + "> " + t("tp") + (s.tp ? " " + tpNum(s) : "") + '</label><button class="btn small ghost" type="button" aria-label="' + t("del") + '">×</button></div></div></td>';
      }).join("") + "</tr></thead><tbody>";
      rows.forEach(function (r, ri) {
        h += "<tr><th>" + esc(L(r)) + "</th>" + st.map(function (s) { return '<td data-s="' + s.id + '"' + (sel === s.id ? ' class="sel"' : "") + '><textarea data-r="' + ri + '" aria-label="' + esc(L(r)) + '">' + esc(s.rows[ri] || "") + "</textarea></td>"; }).join("") + "</tr>";
      });
      mx.innerHTML = h + "</tbody>";
      st.forEach(function (s) {
        var head = mx.querySelector('thead [data-s="' + s.id + '"]');
        head.querySelector("input[type=text]").oninput = function (e) { s.label = e.target.value; save(); drawTimeline(); drawTps(); };
        head.querySelector("input[type=checkbox]").onchange = function (e) { s.tp = e.target.checked; save(); drawAll(); };
        head.querySelector("button").onclick = function () { J.steps.splice(J.steps.indexOf(s), 1); save(); drawAll(); };
        mx.querySelectorAll('tbody [data-s="' + s.id + '"] textarea').forEach(function (ta) { ta.oninput = function () { s.rows[ta.dataset.r] = ta.value; save(); }; });
      });
      mx.querySelectorAll("[data-s]").forEach(function (td) { td.addEventListener("focusin", function () { if (sel !== td.dataset.s) { sel = td.dataset.s; var so = sorted(); tl.querySelectorAll(".tnode").forEach(function (n, i) { n.classList.toggle("sel", so[i].id === sel); }); mx.querySelectorAll("[data-s]").forEach(function (x) { x.classList.toggle("sel", x.dataset.s === sel); }); } }); });
    }
    function drawTps() {
      var list = sorted().filter(function (s) { return s.tp; });
      tpl.innerHTML = '<span class="caps" style="color:var(--c-blue)">' + t("tps") + "</span>" + (list.length ? "<ol>" + list.map(function (s) { return "<li>" + esc(s.label || "…") + (s.rows[0] ? " – " + esc(s.rows[0]) : "") + "</li>"; }).join("") + "</ol>" : '<p class="hint" style="margin:4px 0 0">' + t("noTps") + "</p>");
    }
    function drawAll() { drawTimeline(); drawMatrix(); drawTps(); }
    var onR = function () { drawTimeline(); }; window.addEventListener("resize", onR); cleanup.push(function () { window.removeEventListener("resize", onR); });
    drawAll();
  };

  /* activity 9: closeness lanes */
  RENDER.closeness = function (body, d, a, c) {
    var C = a.close;
    if (!C) {
      C = a.close = { people: [], items: [] };
      var groups = groupTitles().slice(0, 4);
      (groups.length ? groups : [S.lang === "de" ? "Nutzer*in" : "User"]).forEach(function (g) { C.people.push({ id: uid(), name: g }); });
      save();
    }
    body.innerHTML = '<p class="hint" style="margin:0 0 12px">' + t("cHint") + '</p><div class="act-tools" style="margin-top:0"><button class="btn small" type="button" id="cap">' + t("cAddPerson") + '</button></div><div class="lanes-scroll"><div class="lanes" id="ln"></div></div>';
    var ln = body.querySelector("#ln");
    function laneW() { return ln.clientWidth / Math.max(1, C.people.length); }
    function draw() {
      ln.style.gridTemplateColumns = "84px repeat(" + C.people.length + ", minmax(170px, 1fr))";
      ln.style.minWidth = (84 + C.people.length * 180) + "px";
      ln.innerHTML = '<div class="lane-axis"><span>' + t("cClose") + "</span><i></i><span>" + t("cFar") + "</span></div>";
      C.people.forEach(function (p, li) {
        var lane = document.createElement("div"); lane.className = "lane";
        lane.innerHTML = '<div class="lane-head"><svg viewBox="0 0 40 46" width="44" aria-hidden="true"><polygon points="20,1 39,12 39,34 20,45 1,34 1,12" fill="#d1efe4"/></svg><input aria-label="' + t("cPerson") + '" value="' + esc(p.name) + '"><button class="x" type="button" aria-label="' + t("del") + '">×</button></div>' +
          '<div class="lane-track"><svg class="heart" viewBox="0 0 20 18" width="18" aria-hidden="true"><path d="M10 17 C2 11 0 7 2 4 C4 1 8 1 10 4 C12 1 16 1 18 4 C20 7 18 11 10 17Z" fill="#f39237"/></svg><i class="line"></i></div>' +
          '<form class="lane-add"><input placeholder="' + t("cAddItem") + '" aria-label="' + t("cAddItem") + '"><button class="btn small" type="submit">+</button></form><button class="add" type="button" data-from8>' + t("cFrom8") + "</button>";
        lane.querySelector(".lane-head input").oninput = function (e) { p.name = e.target.value; save(); };
        lane.querySelector(".lane-head .x").onclick = function () { if (C.people.length < 2) return; C.items = C.items.filter(function (it) { return it.lane !== p.id; }); C.people.splice(li, 1); save(); draw(); };
        lane.querySelector(".lane-add").onsubmit = function (e) { e.preventDefault(); var inp = e.target.querySelector("input"); if (!inp.value.trim()) return; C.items.push({ id: uid(), text: inp.value.trim(), lane: p.id, y: 88 }); save(); draw(); ln.querySelectorAll(".lane-add input")[li].focus(); };
        lane.querySelector("[data-from8]").onclick = function () {
          var have = C.items.filter(function (it) { return it.lane === p.id; }).map(function (it) { return it.text; }), list = uniq(allNotes(8)).filter(function (x) { return have.indexOf(x) < 0; });
          if (!list.length) { toast(t("zNothing")); return; }
          list.forEach(function (tx, i) { C.items.push({ id: uid(), text: tx, lane: p.id, y: 70 + (i % 4) * 7 }); }); save(); draw(); toast(fmt(t("zImported"), { n: list.length }));
        };
        ln.appendChild(lane);
      });
      var tracks = ln.querySelectorAll(".lane-track");
      C.items.forEach(function (it) {
        var li = C.people.findIndex(function (p) { return p.id === it.lane; }); if (li < 0) return;
        var tr = tracks[li], el = document.createElement("div"); el.className = "zitem lane-item"; el.tabIndex = 0; el.textContent = it.text; el.title = it.text;
        el.style.top = it.y + "%"; el.style.left = "50%";
        chipKit(el, it, kitArr(function () { return C.items.filter(function (x) { return x.lane === it.lane; }); }, draw, { push: function (c) { C.items.push(c); }, home: function () { return C.items; } }));
        tr.appendChild(el);
        el.addEventListener("pointerdown", function (e) {
          if (el.classList.contains("editing")) return;
          e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add("dragging");
          var tRect = tr.getBoundingClientRect(), lRect = ln.getBoundingClientRect();
          function mv(ev) { it.y = Math.max(4, Math.min(96, (ev.clientY - tRect.top) / tRect.height * 100)); el.style.top = it.y + "%"; el.style.left = "calc(50% + " + (ev.clientX - (tRect.left + tRect.width / 2)) + "px)"; }
          function up(ev) {
            el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up);
            var x = ev.clientX - lRect.left - 84, idx = Math.max(0, Math.min(C.people.length - 1, Math.floor(x / ((lRect.width - 84) / C.people.length))));
            it.lane = C.people[idx].id; save(); draw();
          }
          el.addEventListener("pointermove", mv); el.addEventListener("pointerup", up);
        });
        el.addEventListener("keydown", function (e) {
          var dy = { ArrowUp: -4, ArrowDown: 4 }[e.key] || 0, dx = { ArrowLeft: -1, ArrowRight: 1 }[e.key] || 0;
          if (dy) { e.preventDefault(); it.y = Math.max(4, Math.min(96, it.y + dy)); el.style.top = it.y + "%"; save(); }
          if (dx) { e.preventDefault(); var ni = Math.max(0, Math.min(C.people.length - 1, li + dx)); it.lane = C.people[ni].id; save(); draw(); }
          if (e.key === "Delete") { C.items.splice(C.items.indexOf(it), 1); save(); draw(); }
        });
      });
    }
    body.querySelector("#cap").onclick = function () { C.people.push({ id: uid(), name: "" }); save(); draw(); var ins = ln.querySelectorAll(".lane-head input"); ins[ins.length - 1].focus(); };
    draw();
  };

  /* activity 10: emotional / technical security zones */
  var ZCOL = ["#f39237", "#6dbcdf", "#86d3b4", "#1f4a9a", "#e6ee58", "#202c51"];
  var ZCORE = .1, ZOUTER = .47;
  function zRadii(n) { var r = []; for (var i = 1; i <= n; i++) r.push(ZCORE + i * (ZOUTER - ZCORE) / n); return r; }
  function zoneOf(it, n) { var dd = Math.hypot(it.x - 50, it.y - 50) / 100, r = zRadii(n); for (var i = 0; i < r.length; i++) if (dd <= r[i]) return i; return -1; }
  function wob(rad, seed) { var p = ""; for (var k = 0; k <= 96; k++) { var th = k / 96 * Math.PI * 2, q = rad * (1 + .035 * Math.sin(4 * th + seed) + .025 * Math.sin(7 * th + seed * 3)); p += (k ? "L" : "M") + (50 + Math.cos(th) * q * 100).toFixed(2) + " " + (50 + Math.sin(th) * q * 100).toFixed(2); } return p + "Z"; }
  function zonesSvg(Z, set) {
    var r = zRadii(Z.zones.length), svg = '<svg viewBox="0 0 100 100" aria-hidden="true">';
    for (var i = r.length - 1; i >= 0; i--) {
      svg += '<path d="' + wob(r[i], i * 1.7 + (set === "technical" ? 9 : 0)) + '" fill="' + (i % 2 ? "#fff" : "#d1efe4") + '" stroke="' + ZCOL[i % ZCOL.length] + '" stroke-width="' + (i === r.length - 1 ? .5 : .8) + '"' + (i % 2 === 0 && i === r.length - 1 ? ' stroke-dasharray="1.4 1"' : "") + "/>";
      var lr = (r[i] + (i ? r[i - 1] : ZCORE)) / 2 * 100;
      svg += '<circle cx="50" cy="' + (50 - lr) + '" r="2.6" fill="#fff" stroke="' + ZCOL[i % ZCOL.length] + '" stroke-width=".7"/><text x="50" y="' + (50 - lr + 1.1) + '" text-anchor="middle" font-size="3" font-weight="800" fill="#202c51">' + (i + 1) + "</text>";
    }
    svg += '<circle cx="50" cy="50" r="' + ZCORE * 100 + '" fill="' + (set === "technical" ? "#202c51" : "#6dbcdf") + '"/>';
    svg += '<g transform="translate(50 50)" fill="none" stroke="#fff" stroke-width="1.1"><path d="M-2.6 -1 v-2 a2.6 2.6 0 0 1 5.2 0 v2"/><rect x="-4" y="-1" width="8" height="6" rx="1" fill="#fff" stroke="none"/></g>';
    return svg;
  }
  RENDER.zones = function (body, d, a) {
    a.zones = a.zones || {};
    a.zoneSet = a.zoneSet || "emotional";
    ["emotional", "technical"].forEach(function (k) { a.zones[k] = a.zones[k] || { zones: [{ label: "", auth: "" }, { label: "", auth: "" }, { label: "", auth: "" }, { label: "", auth: "" }], items: [] }; });
    function Z() { return a.zones[a.zoneSet]; }
    body.innerHTML = '<div class="act-tools" style="margin-top:0"><div class="seg" role="group"><button type="button" data-z="emotional">' + t("zEmo") + '</button><button type="button" data-z="technical">' + t("zTech") + '</button></div><span class="hint">' + t("zHint") + '</span></div><div class="zones"><div><div class="zstage" id="zs"></div></div><div class="zside"><form class="addrow" id="zf"><input id="zi" placeholder="' + t("zAddItem") + '" aria-label="' + t("zAddItem") + '"><button class="btn" type="submit">' + t("zAdd") + '</button></form><div class="row" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn small" type="button" id="zimp">' + t("zImport") + '</button><button class="btn small ghost" type="button" id="zmore">' + t("zMore") + '</button><button class="btn small ghost" type="button" id="zless">' + t("zLess") + '</button></div><div id="zl" class="zside"></div></div></div>';
    var stage = body.querySelector("#zs"), zl = body.querySelector("#zl");
    function drawStage() {
      stage.innerHTML = zonesSvg(Z(), a.zoneSet) + "</svg>";
      Z().items.forEach(function (it) {
        var el = document.createElement("div"); el.className = "zitem" + (zoneOf(it, Z().zones.length) < 0 ? " out" : ""); fresh(el, it.id);
        el.style.left = it.x + "%"; el.style.top = it.y + "%"; el.textContent = it.text; el.title = it.text; el.tabIndex = 0;
        dragChip(el, stage, it, function () { el.classList.toggle("out", zoneOf(it, Z().zones.length) < 0); }, drawList);
        el.addEventListener("keydown", function (e) { if (e.key === "Delete") { Z().items.splice(Z().items.indexOf(it), 1); save(); drawStage(); drawList(); } });
        chipKit(el, it, kitArr(function () { return Z().items; }, function () { drawStage(); drawList(); }));
        stage.appendChild(el);
      });
    }
    function drawList() {
      var z = Z(), n = z.zones.length;
      zl.innerHTML = "";
      var del = function (it) { z.items.splice(z.items.indexOf(it), 1); save(); drawStage(); drawList(); };
      z.zones.forEach(function (zz, i) {
        var row = document.createElement("div"); row.className = "zrow";
        row.innerHTML = '<span class="zn" style="border-color:' + ZCOL[i % ZCOL.length] + '">' + (i + 1) + '</span><div><input class="zl" placeholder="' + t("zLabel") + '" aria-label="' + t("zZone") + " " + (i + 1) + '" value="' + esc(zz.label) + '"><input class="za" placeholder="' + t("zAuth") + '" aria-label="' + t("zAuth") + '" value="' + esc(zz.auth) + '"></div>';
        row.querySelector(".zl").oninput = function (e) { zz.label = e.target.value; save(); };
        row.querySelector(".za").oninput = function (e) { zz.auth = e.target.value; save(); };
        var items = z.items.filter(function (it) { return zoneOf(it, n) === i; });
        row.lastChild.appendChild(items.length ? chipList(items, del) : Object.assign(document.createElement("div"), { className: "hint", textContent: t("zNone") }));
        zl.appendChild(row);
      });
      var out = z.items.filter(function (it) { return zoneOf(it, n) < 0; });
      if (out.length) { var o = document.createElement("div"); o.innerHTML = '<div class="hint">' + t("zOut") + "</div>"; o.appendChild(chipList(out, del)); zl.appendChild(o); }
    }
    function setSeg() { body.querySelectorAll("[data-z]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.z === a.zoneSet); }); }
    body.querySelectorAll("[data-z]").forEach(function (b) { b.onclick = function () { a.zoneSet = b.dataset.z; save(); setSeg(); drawStage(); drawList(); }; });
    function addItem(text, i, total) {
      var ang = (total ? i / total : Math.random()) * Math.PI * 2 + .3, rr = ZOUTER + .02;
      Z().items.push({ id: uid(), text: text, x: Math.max(6, Math.min(94, 50 + Math.cos(ang) * rr * 100)), y: Math.max(4, Math.min(96, 50 + Math.sin(ang) * rr * 100)) });
    }
    body.querySelector("#zf").onsubmit = function (e) { e.preventDefault(); var i = body.querySelector("#zi"); if (!i.value.trim()) return; addItem(i.value.trim()); i.value = ""; save(); drawStage(); drawList(); i.focus(); };
    body.querySelector("#zimp").onclick = function () {
      var have = Z().items.map(function (x) { return x.text; }), list = uniq(allNotes(8)).filter(function (x) { return have.indexOf(x) < 0; });
      if (!list.length) { toast(t("zNothing")); return; }
      list.forEach(function (tx, i) { addItem(tx, i, list.length); }); save(); drawStage(); drawList(); toast(fmt(t("zImported"), { n: list.length }));
    };
    body.querySelector("#zmore").onclick = function () { if (Z().zones.length < 6) { Z().zones.push({ label: "", auth: "" }); save(); drawStage(); drawList(); } };
    body.querySelector("#zless").onclick = function () { if (Z().zones.length > 2) { Z().zones.pop(); save(); drawStage(); drawList(); } };
    setSeg(); drawStage(); drawList();
  };

  /* activity 15: classified directions */
  function dirPairs(D) {
    return window.ADA_DIRECTIONS.map(function (p, i) { return { key: "b" + i, l: S.lang === "de" ? p[1] : p[0], r: S.lang === "de" ? p[3] : p[2] }; })
      .concat((D.custom || []).map(function (c) { return { key: c.id, l: c.l, r: c.r, custom: true }; }));
  }
  RENDER.directions = function (body, d, a) {
    var D = a.dirs = a.dirs || { values: {}, custom: [], anomalies: "" };
    body.innerHTML = '<p class="hint" style="margin:0 0 12px">' + t("dHint") + '</p><div class="dirs"><div><div class="dgrid" id="dg"></div><form class="addrow" id="df" style="margin-top:14px"><input id="dl" placeholder="' + t("dLeft") + '" aria-label="' + t("dLeft") + '"><input id="dr" placeholder="' + t("dRight") + '" aria-label="' + t("dRight") + '"><button class="btn" type="submit">' + t("zAdd") + '</button></form></div><div class="dside"><div class="field"><label for="anom">' + t("dAnom") + '</label><p class="hint" style="margin:0 0 6px">' + t("dAnomQ") + '</p><textarea id="anom"></textarea></div></div></div>';
    var dg = body.querySelector("#dg"), an = body.querySelector("#anom");
    an.value = D.anomalies || ""; an.oninput = function () { D.anomalies = an.value; save(); };
    function draw() {
      dg.innerHTML = dirPairs(D).map(function (p) {
        var v = D.values[p.key];
        return '<div class="drow' + (v == null ? " unset" : "") + '" data-k="' + p.key + '"><span class="l">' + esc(p.l) + '</span><div class="track"><input type="range" min="0" max="100" value="' + (v == null ? 50 : v) + '" aria-label="' + esc(p.l + " – " + p.r) + '"' + (v == null ? ' aria-valuetext="' + t("dUnset") + '"' : "") + '></div><span class="r">' + esc(p.r) + "</span>" + (p.custom ? '<button class="del" type="button" aria-label="' + t("del") + '">×</button>' : "<span></span>") + "</div>";
      }).join("") + '<svg class="dprofile" id="dp"></svg>';
      dg.querySelectorAll(".drow").forEach(function (row) {
        var k = row.dataset.k, inp = row.querySelector("input");
        inp.addEventListener("input", function () { D.values[k] = +inp.value; row.classList.remove("unset"); inp.removeAttribute("aria-valuetext"); save(); profile(); });
        inp.addEventListener("pointerdown", function () { if (D.values[k] == null) { D.values[k] = +inp.value; row.classList.remove("unset"); save(); profile(); } });
        var del = row.querySelector(".del");
        if (del) del.onclick = function () { D.custom = D.custom.filter(function (c) { return c.id !== k; }); delete D.values[k]; save(); draw(); };
      });
      profile();
    }
    function profile() {
      var svg = dg.querySelector("#dp"), tr = dg.querySelector(".track"); if (!tr) return;
      var x0 = tr.offsetLeft, w = tr.offsetWidth, pts = [], marks = "";
      dg.querySelectorAll(".drow").forEach(function (row) {
        var v = D.values[row.dataset.k], cy = row.offsetTop + row.offsetHeight / 2, cx = 15 + (w - 30) * ((v == null ? 50 : v) / 100);
        if (v != null) pts.push(cx.toFixed(1) + " " + cy.toFixed(1));
        marks += '<g class="xmark' + (v == null ? " ghost" : "") + '" transform="translate(' + cx + " " + cy + ')"><line x1="-7" y1="-7" x2="7" y2="7"/><line x1="7" y1="-7" x2="-7" y2="7"/></g>';
      });
      svg.style.left = x0 + "px"; svg.setAttribute("width", w); svg.setAttribute("height", dg.offsetHeight);
      svg.innerHTML = (pts.length > 1 ? '<path d="M' + pts.join(" L") + '"/>' : "") + marks;
    }
    body.querySelector("#df").onsubmit = function (e) { e.preventDefault(); var l = body.querySelector("#dl"), r = body.querySelector("#dr"); if (!l.value.trim() || !r.value.trim()) return; D.custom.push({ id: "c" + uid(), l: l.value.trim(), r: r.value.trim() }); l.value = r.value = ""; save(); draw(); };
    window.addEventListener("resize", profile); cleanup.push(function () { window.removeEventListener("resize", profile); });
    draw();
  };

  /* activity 26: principles as quadrants with idea chips */
  var PCOL = ["var(--c-sky)", "var(--c-yellow)", "var(--c-green)", "var(--c-orange)"];
  var PHEX = ["#6dbcdf", "#e6ee58", "#86d3b4", "#f39237"];
  RENDER.principles = function (body, d, a, c) {
    a.fields = a.fields || {};
    var ideas = window.ADA_PRINCIPLE_IDEAS;
    body.innerHTML = '<p class="hint" style="margin:0 0 12px">' + t("pHint") + '</p><div class="quads">' + d.fields.map(function (f, i) {
      var parts = L(f).split(":");
      return '<div class="quad" style="--q:' + PCOL[i] + '" data-f="' + i + '"><h3>' + esc(parts[0]) + '</h3><div class="hint">' + esc(parts[1] || "") + '</div><div class="ideas"><span class="hint">' + t("pIdeas") + ":</span></div><div class=\"list\"></div><button class=\"add\" type=\"button\">" + t("addNote") + "</button></div>";
    }).join("") + "</div>";
    body.querySelectorAll(".quad").forEach(function (q) {
      var f = +q.dataset.f; a.fields[f] = a.fields[f] || [];
      var nl = noteList(q.querySelector(".list"), a.fields[f], PCOL[f], L(d.fields[f]));
      q.querySelector(".add").onclick = function () { nl.add(); };
      var box = q.querySelector(".ideas");
      L(ideas[f]).forEach(function (idea) {
        var b = document.createElement("button"); b.type = "button"; b.className = "idea"; b.textContent = "+ " + idea;
        b.onclick = function () { if (a.fields[f].some(function (x) { return x.text.trim().toLowerCase() === idea.toLowerCase(); })) return; nl.add(idea); b.disabled = true; };
        if (a.fields[f].some(function (x) { return x.text.trim().toLowerCase() === idea.toLowerCase(); })) b.disabled = true;
        box.appendChild(b);
      });
    });
  };

  /* activity 27: multi-factor builder */
  function principleName(i) { return L(defOf(26).fields[i]).split(":")[0]; }
  RENDER.mfa = function (body, d, a) {
    var M = a.mfa = a.mfa || { combos: [], extra: [], active: null };
    if (!M.combos.length) { M.combos.push({ id: uid(), name: "", where: "", why: "", factors: [] }); M.active = M.combos[0].id; save(); }
    body.innerHTML = '<div class="mfa"><div class="deck"><h3 class="caps" style="color:var(--c-blue)">' + t("mDeck") + '</h3><p class="hint" style="margin:0">' + t("mDeckHint") + '</p><div id="deck"></div><form class="addrow" id="mf"><input id="mfi" placeholder="' + t("mNewFactor") + '" aria-label="' + t("mNewFactor") + '"><select id="mfp" aria-label="principle">' + [0, 1, 2, 3].map(function (i) { return '<option value="' + i + '">' + esc(principleName(i)) + "</option>"; }).join("") + '</select><button class="btn" type="submit">' + t("mAddFactor") + '</button></form></div><div><div class="act-tools" style="margin-top:0"><button class="btn small" type="button" id="mnew">' + t("mNewCombo") + '</button></div><div class="clouds" id="cl"></div></div></div>';
    var deck = body.querySelector("#deck"), cl = body.querySelector("#cl");
    function factors() {
      var out = [];
      [0, 1, 2, 3].forEach(function (p) { uniq(notesOf(26, p)).forEach(function (tx) { out.push({ p: p, text: tx }); }); });
      M.extra.forEach(function (x) { if (!out.some(function (o) { return o.p === x.p && o.text === x.text; })) out.push(x); });
      return out;
    }
    function drawDeck() {
      deck.innerHTML = "";
      [0, 1, 2, 3].forEach(function (p) {
        var fs = factors().filter(function (f) { return f.p === p; }); if (!fs.length) return;
        var g = document.createElement("div"); g.className = "deck-group"; g.innerHTML = '<div class="hint" style="font-weight:700">' + esc(principleName(p)) + "</div>";
        fs.forEach(function (f) {
          var b = document.createElement("button"); b.type = "button"; b.className = "fcard"; b.style.setProperty("--q", PCOL[p]); b.textContent = f.text;
          b.onclick = function () { var c = M.combos.find(function (x) { return x.id === M.active; }) || M.combos[0]; if (!c) return; if (!c.factors.some(function (x) { return x.text === f.text && x.p === f.p; })) { c.factors.push({ p: f.p, text: f.text }); save(); drawCombos(); } };
          g.appendChild(b);
        });
        deck.appendChild(g);
      });
    }
    function drawCombos() {
      var tps = touchPoints();
      var cols = [[], [], [], []]; // drafts, 2, 3, 4+
      M.combos.forEach(function (c) { var n = c.factors.length; cols[n < 2 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3].push(c); });
      var heads = [t("mDraft")].concat(t("mClasses"));
      cl.innerHTML = "";
      cols.forEach(function (list, ci) {
        if (ci === 0 && !list.length) return;
        var col = document.createElement("div"); col.className = "cloud-col" + (ci === 0 ? " drafts" : "");
        col.innerHTML = '<div class="cloud"><span>' + esc(heads[ci]) + "</span></div>";
        list.forEach(function (c) {
          var card = document.createElement("div"); card.className = "combo" + (c.id === M.active ? " active" : "");
          var distinct = uniq(c.factors.map(function (f) { return String(f.p); })).length, same = c.factors.length - distinct;
          card.innerHTML = '<div class="combo-top"><input class="cname" placeholder="' + t("mCombo") + '" aria-label="' + t("mCombo") + '" value="' + esc(c.name) + '"><button class="btn small ' + (c.id === M.active ? "primary" : "") + '" type="button" data-act>' + (c.id === M.active ? t("mSelected") : t("mSelect")) + '</button><button class="x" type="button" aria-label="' + t("del") + '">×</button></div><div class="fchips"></div>' +
            (c.factors.length < 2 ? '<div class="hint">' + t("mOne") + "</div>" : same > 0 ? '<div class="warn">' + fmt(t("mSame"), { n: same + 1 }) + "</div>" : "") +
            '<label class="mini">' + t("mWhere") + '<select data-where><option value="">' + t("mNoTp") + "</option>" + tps.map(function (s, i) { return '<option value="' + s.id + '"' + (c.where === s.id ? " selected" : "") + ">" + (i + 1) + ". " + esc(s.label || "…") + "</option>"; }).join("") + '</select></label><label class="mini">' + t("mWhy") + "<textarea data-why rows=\"2\">" + esc(c.why) + "</textarea></label>";
          var fc = card.querySelector(".fchips");
          c.factors.forEach(function (f, fi) { var s = document.createElement("span"); s.className = "chip"; s.style.background = PHEX[f.p]; s.innerHTML = esc(f.text) + '<button type="button" aria-label="' + t("del") + '">×</button>'; s.querySelector("button").onclick = function () { c.factors.splice(fi, 1); save(); drawCombos(); }; fc.appendChild(s); });
          card.querySelector(".cname").oninput = function (e) { c.name = e.target.value; save(); };
          card.querySelector("[data-act]").onclick = function () { M.active = c.id; save(); drawCombos(); };
          card.querySelector(".x").onclick = function () { M.combos.splice(M.combos.indexOf(c), 1); if (M.active === c.id) M.active = M.combos[0] && M.combos[0].id; save(); drawCombos(); };
          card.querySelector("[data-where]").onchange = function (e) { c.where = e.target.value; save(); };
          card.querySelector("[data-why]").oninput = function (e) { c.why = e.target.value; save(); };
          card.addEventListener("focusin", function () { if (M.active !== c.id) { M.active = c.id; save(); cl.querySelectorAll(".combo").forEach(function (x) { x.classList.remove("active"); }); card.classList.add("active"); } });
          col.appendChild(card);
        });
        cl.appendChild(col);
      });
    }
    body.querySelector("#mnew").onclick = function () { var c = { id: uid(), name: "", where: "", why: "", factors: [] }; M.combos.push(c); M.active = c.id; save(); drawCombos(); cl.querySelector(".combo.active .cname").focus(); };
    body.querySelector("#mf").onsubmit = function (e) { e.preventDefault(); var i = body.querySelector("#mfi"); if (!i.value.trim()) return; M.extra.push({ p: +body.querySelector("#mfp").value, text: i.value.trim() }); i.value = ""; save(); drawDeck(); };
    drawDeck(); drawCombos();
  };

  /* activity 28: near / far future field */
  function futureRegion(it) { return it.y < 47 ? 0 : it.x < 50 ? 1 : 2; }
  function futureSvg() {
    return '<svg viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="158" height="44" rx="5" fill="#e6ee58" opacity=".35"/><rect x="1" y="49" width="77" height="50" rx="5" fill="#f39237" opacity=".25"/><rect x="82" y="49" width="77" height="50" rx="5" fill="#86d3b4" opacity=".45"/><path d="M80 45 L80 47 M80 47 L40 49 M80 47 L120 49" stroke="#1f4a9a" stroke-width=".6" fill="none"/></svg>';
  }
  RENDER.future = function (body, d, a) {
    var F = a.future = a.future || { items: [] };
    if (a.fields && !F.migrated) { [0, 1, 2].forEach(function (f) { notesOf(28, f).forEach(function (tx, j) { F.items.push({ id: uid(), text: tx, x: f === 0 ? 15 + j * 18 : f === 1 ? 20 + j * 8 : 65 + j * 8, y: f === 0 ? 22 : 72 + (j % 3) * 7 }); }); }); F.migrated = true; save(); }
    body.innerHTML = '<p class="hint" style="margin:0 0 12px">' + t("fHint") + '</p><div class="act-tools" style="margin-top:0"><form class="addrow" id="ff" style="flex:1;min-width:240px"><input id="fi" placeholder="' + t("fAdd") + '" aria-label="' + t("fAdd") + '"><button class="btn" type="submit">' + t("zAdd") + '</button></form><button class="btn small" type="button" id="f16">' + t("fFrom16") + '</button></div><div class="fstage" id="fs"></div><div class="cols" id="flist" style="margin-top:16px"></div>';
    var stage = body.querySelector("#fs"), fl = body.querySelector("#flist");
    var regions = [t("fNear"), t("fCrazy"), t("fReal")];
    function drawStage() {
      stage.innerHTML = futureSvg() + '<span class="flabel" style="left:2%;top:3%">' + regions[0] + '</span><span class="flabel" style="left:2%;top:52%">' + regions[1] + '</span><span class="flabel" style="left:53%;top:52%">' + regions[2] + "</span>";
      F.items.forEach(function (it) {
        var el = document.createElement("div"); el.className = "zitem fcardi"; el.tabIndex = 0; el.textContent = it.text; el.title = it.text;
        el.style.left = it.x + "%"; el.style.top = it.y + "%";
        dragChip(el, stage, it, null, drawList);
        el.addEventListener("keydown", function (e) { if (e.key === "Delete") { F.items.splice(F.items.indexOf(it), 1); save(); drawStage(); drawList(); } });
        chipKit(el, it, kitArr(function () { return F.items; }, function () { drawStage(); drawList(); }));
        stage.appendChild(el);
      });
    }
    function drawList() {
      fl.innerHTML = "";
      regions.forEach(function (r, ri) {
        var col = document.createElement("div"); col.className = "col"; col.innerHTML = "<h3>" + esc(r) + "</h3>";
        F.items.filter(function (it) { return futureRegion(it) === ri; }).forEach(function (it) {
          var n = document.createElement("div"); n.className = "note"; n.style.setProperty("--accent", ["#e6ee58", "#f39237", "#86d3b4"][ri]);
          n.innerHTML = '<textarea rows="1" aria-label="' + esc(r) + '"></textarea><button class="x" type="button" aria-label="' + t("del") + '">×</button>';
          var ta = n.querySelector("textarea"); ta.value = it.text;
          ta.oninput = function () { it.text = ta.value; autosize(ta); save(); var ch = stage.querySelector('[data-cid="' + it.id + '"] .cl'); if (ch) ch.textContent = it.text; };
          n.querySelector(".x").onclick = function () { F.items.splice(F.items.indexOf(it), 1); save(); drawStage(); drawList(); };
          col.appendChild(n); setTimeout(function () { autosize(ta); });
        });
        fl.appendChild(col);
      });
    }
    function add(tx, i) { F.items.push({ id: uid(), text: tx, x: 12 + ((F.items.length + (i || 0)) % 5) * 18, y: 18 + ((F.items.length + (i || 0)) % 2) * 12 }); }
    body.querySelector("#ff").onsubmit = function (e) { e.preventDefault(); var i = body.querySelector("#fi"); if (!i.value.trim()) return; add(i.value.trim()); i.value = ""; save(); drawStage(); drawList(); i.focus(); };
    body.querySelector("#f16").onclick = function () {
      var have = F.items.map(function (x) { return x.text; }), list = uniq(conceptTitles()).filter(function (x) { return have.indexOf(x) < 0; });
      if (!list.length) { toast(S.lang === "de" ? "Aktivität 16 hat noch keine Konzepttitel." : "Activity 16 has no concept titles yet."); return; }
      list.forEach(function (tx) { add(tx); }); save(); drawStage(); drawList();
    };
    drawStage(); drawList();
  };

  /* activity 33: automatic summary */
  function summaryData() {
    var ss = t("sumSec"), acts = S.project.acts;
    var zones = []; ["emotional", "technical"].forEach(function (k) { var z = acts[10] && acts[10].zones && acts[10].zones[k]; if (!z) return; z.zones.forEach(function (zz, i) { var items = z.items.filter(function (it) { return zoneOf(it, z.zones.length) === i; }).map(function (it) { return it.text; }); if (zz.label || zz.auth || items.length) zones.push((i + 1) + ". " + [zz.label, zz.auth].filter(Boolean).join(" – ") + (items.length ? " (" + items.join(", ") + ")" : "")); }); });
    var tps = touchPoints().map(function (s, i) { return (i + 1) + ". " + (s.label || "…"); });
    var emotions = journeySteps().map(function (s) { return s.rows && s.rows[4]; }).filter(Boolean);
    var D = acts[15] && acts[15].dirs, dirs = [];
    if (D) dirPairs(D).forEach(function (p) { var v = D.values[p.key]; if (v == null) return; dirs.push(v < 40 ? p.l : v > 60 ? p.r : p.l + " / " + p.r); });
    var mfa = acts[27] && acts[27].mfa ? acts[27].mfa.combos.filter(function (c) { return c.factors.length; }).map(function (c) { return (c.name ? c.name + ": " : "") + c.factors.map(function (f) { return f.text; }).join(" + "); }) : [];
    var concepts = uniq(conceptTitles().concat(acts[28] && acts[28].future ? acts[28].future.items.map(function (x) { return x.text; }) : []));
    var reqs = reqRows().filter(function (r) { return r.req; }).map(function (r) { return r.req + (r.prio ? " (" + t("rqPrios")[r.prio] + ")" : ""); });
    return {
      left: [
        { k: ss.people, from: [3, 5], items: uniq(groupTitles().concat(ringItems(1))) },
        { k: ss.context, from: [1, 5], items: uniq(projectDescList().concat(ringItems(0), acts[6] && acts[6].journey && acts[6].journey.desc ? [acts[6].journey.desc] : [])) },
        { k: ss.data, from: [5, 8], items: uniq(ringItems(2).concat(allNotes(8))) },
        { k: ss.tps, from: [6], items: tps },
        { k: ss.zones, from: [10], items: zones },
        { k: ss.emotions, from: [6], items: uniq(emotions) }
      ],
      right: [
        { k: ss.concepts, from: [16, 28], items: concepts },
        { k: ss.interactions, from: [5, 7], items: uniq(ringItems(3).concat(notesOf(7, 0))) },
        { k: ss.metaphors, from: [11], items: uniq(relabelCards().map(function (c) { return metaphorText(c) || c.object; })) },
        { k: ss.reqs, from: [13], items: reqs },
        { k: ss.dirs, from: [15], items: dirs.length ? [dirs.join(" · ")] : [] },
        { k: ss.mfa, from: [27], items: mfa }
      ]
    };
  }
  function summaryHtml(links) {
    var sd = summaryData();
    function sec(s) { return '<div class="sum-sec"><h3>' + esc(s.k) + ' <span class="from">' + t("sumFrom") + " " + s.from.map(function (n) { return links ? '<a href="#activity-' + n + '">' + n + "</a>" : n; }).join(", ") + "</span></h3>" + (s.items.length ? "<ul>" + s.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : '<p class="hint">' + t("sumEmpty") + "</p>") + "</div>"; }
    return '<div class="sum"><div>' + sd.left.map(sec).join("") + "</div><div>" + sd.right.map(sec).join("") + "</div></div>";
  }
  RENDER.summary = function (body, d, a, c) {
    var wrap = document.createElement("div");
    body.innerHTML = '<div class="act-tools" style="margin-top:0"><span class="hint">' + t("sumHint") + '</span><a class="btn small primary" href="#report">' + t("pdf") + "</a></div>" + summaryHtml(true) + '<div id="sumNotes" style="margin-top:20px"></div>';
    fieldsBoard(body.querySelector("#sumNotes"), d, a, c);
  };


  /* ---------- literature ---------- */
  var REFS = window.ADA_REFERENCES || [];
  function refActs(r) {
    var set = {}; (r.acts || []).forEach(function (n) { set[n] = "direct"; });
    (r.methods || []).forEach(function (m) { methodActs(m).forEach(function (a) { if (!set[a.n]) set[a.n] = "method"; }); });
    return set;
  }
  function refsForAct(n) {
    var direct = [], via = [];
    REFS.filter(function (r) { return !litRecent || refYear(r) >= 2014; }).forEach(function (r) { var s = refActs(r)[n]; if (s === "direct") direct.push(r); else if (s === "method") via.push(r); });
    return { direct: direct.sort(refCmp), via: via.sort(refCmp) };
  }
  function refCmp(a, b) { return a.full.replace(/_/g, "").localeCompare(b.full.replace(/_/g, ""), "de"); }
  function refsForMethod(m) { return REFS.filter(function (r) { return (r.methods || []).indexOf(m) > -1; }).sort(refCmp); }
  function refLine(r, opts) {
    opts = opts || {};
    var doi = r.doi ? ' <a class="doi" href="https://doi.org/' + esc(r.doi) + '" target="_blank" rel="noopener">https://doi.org/' + esc(r.doi) + "</a>" : "";
    var rel = "";
    if (opts.relations) {
      var acts = refActs(r), nums = Object.keys(acts).map(Number).sort(function (a, b) { return a - b; });
      rel = '<div class="ref-rel">' + (r.methods && r.methods.length ? '<span class="hint">' + t("methods") + ":</span> " + r.methods.map(function (m) { return '<span class="mtag">' + esc(mName(m)) + "</span>"; }).join("") : "") +
        (nums.length ? '<span class="hint">' + t("activities") + ":</span> " + nums.map(function (n) { return '<a class="atag' + (acts[n] === "direct" ? " direct" : "") + '" href="#activity-' + n + '" title="' + esc(L(defOf(n).title)) + '">' + n + "</a>"; }).join("") : "") + "</div>";
    }
    return '<li class="ref" id="ref-' + r.id + '"><span class="ref-full">' + esc(r.full).replace(/_([^_]+)_/g, "<i>$1</i>") + "</span>" + doi + rel + "</li>";
  }
  var litView = "topic", litRecent = false;
  function refYear(r) { var m = r.full.match(/\((\d{4})[a-z]?[,)]/); return m ? +m[1] : 0; }
  function renderLiterature() {
    var groups = [["methods", t("litG").methods], ["interaction", t("litG").interaction], ["research", t("litG").research], ["auth", t("litG").auth], ["further", t("litG").further]];
    view.innerHTML = '<div class="lit-head"><h1 style="color:var(--c-blue);font-weight:800">' + t("literature") + '</h1><p class="act-i">' + t("litIntro") + '</p><div class="act-tools"><div class="seg" role="group"><button type="button" data-v="topic">' + t("litByTopic") + '</button><button type="button" data-v="act">' + t("litByAct") + '</button></div><label class="btn small"><input type="checkbox" id="litrec"' + (litRecent ? " checked" : "") + "> " + t("litRecent") + '</label><span class="legend-inline"><span class="atag direct">6</span> ' + t("litDirect") + ' <span class="atag">6</span> ' + t("litVia") + '</span></div></div><div id="lit"></div>';
    var box = view.querySelector("#lit");
    function draw() {
      view.querySelectorAll("[data-v]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.v === litView); });
      if (litView === "topic") {
        box.innerHTML = groups.map(function (g) {
          var list = REFS.filter(function (r) { return r.group === g[0] && (!litRecent || refYear(r) >= 2014); }).sort(function (a, b) { return a.full.replace(/_/g, "").localeCompare(b.full.replace(/_/g, "")); });
          return '<section class="panel lit-sec"><h2>' + esc(g[1]) + '</h2><ul class="refs">' + list.map(function (r) { return refLine(r, { relations: true }); }).join("") + "</ul></section>";
        }).join("");
      } else {
        box.innerHTML = '<div class="panel lit-sec"><table class="lit-table"><thead><tr><th>' + t("activity") + "</th><th>" + t("litDirect") + "</th><th>" + t("litVia") + "</th></tr></thead><tbody>" +
          ACTS.map(function (a) {
            var rr = refsForAct(a.n), c = catOf(a.cat);
            var cell = function (list) { return list.map(function (r) { return '<a href="#literature" data-ref="' + r.id + '">' + esc(r.cite) + "</a>"; }).join("; ") || '<span class="hint">–</span>'; };
            return '<tr><td><span class="dotc" style="background:' + (c.outline ? "var(--paper);box-shadow:inset 0 0 0 1.5px var(--navy)" : c.color) + '"></span><a href="#activity-' + a.n + '">' + a.n + " · " + esc(L(a.title)) + "</a></td><td>" + cell(rr.direct) + '</td><td class="via">' + cell(rr.via) + "</td></tr>";
          }).join("") + "</tbody></table></div>";
        box.querySelectorAll("[data-ref]").forEach(function (l) { l.onclick = function (e) { e.preventDefault(); litView = "topic"; draw(); var el = document.getElementById("ref-" + l.dataset.ref); if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 1600); } }; });
      }
    }
    view.querySelectorAll("[data-v]").forEach(function (b) { b.onclick = function () { litView = b.dataset.v; draw(); }; });
    view.querySelector("#litrec").onchange = function (e) { litRecent = e.target.checked; draw(); };
    draw();
  }
  function actLitDialog(n) {
    var rr = refsForAct(n);
    openDlg("<h2>" + t("literature") + " · " + t("activity") + " " + n + "</h2>" +
      (rr.direct.length ? '<h4 class="caps" style="color:var(--c-blue);margin:4px 0 0">' + t("litDirect") + '</h4><ul class="refs">' + rr.direct.map(function (r) { return refLine(r); }).join("") + "</ul>" : "") +
      (rr.via.length ? '<h4 class="caps" style="color:var(--c-blue);margin:4px 0 0">' + t("litVia") + '</h4><ul class="refs">' + rr.via.map(function (r) { return refLine(r); }).join("") + "</ul>" : "") +
      '<div class="row"><a class="btn" href="#literature" data-close>' + t("litAll") + '</a><button class="btn ghost" type="button" data-close>' + t("close") + "</button></div>");
  }

  /* ---------- activity 14: setup map ---------- */
  var MAPTOOLS = ["select", "tp", "path", "rect", "circle", "text"];
  function mapBg(s, suffix) {
    return '<defs><marker id="arr' + suffix + '" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#1f4a9a"/></marker><pattern id="grid' + suffix + '" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0 L0 0 0 8" fill="none" stroke="#b9ddd0" stroke-width=".25"/></pattern></defs><rect width="160" height="100" fill="#fff"/>' + (s.img ? '<image href="' + s.img + '" x="0" y="0" width="160" height="100" preserveAspectRatio="xMidYMid meet" opacity=".9"/>' : '<rect width="160" height="100" fill="url(#grid' + suffix + ')"/>');
  }
  function mapTpNumber(s, it) { var n = 0, r = 0; s.items.forEach(function (x) { if (x.kind === "tp") { n++; if (x === it) r = n; } }); return it.num || r; }
  function mapItems(s, interactive, sel) {
    var out = "", suffix = interactive ? "" : "p";
    s.items.forEach(function (it) {
      var attr = interactive ? ' data-id="' + it.id + '" class="mi' + (sel === it.id ? " sel" : "") + '"' : "";
      if (it.kind === "rect") out += "<g" + attr + '><rect x="' + Math.min(it.x, it.x + it.w) + '" y="' + Math.min(it.y, it.y + it.h) + '" width="' + Math.abs(it.w) + '" height="' + Math.abs(it.h) + '" fill="#86d3b4" fill-opacity=".35" stroke="#202c51" stroke-width=".4"/>' + (it.label ? '<text x="' + (Math.min(it.x, it.x + it.w) + 1.5) + '" y="' + (Math.min(it.y, it.y + it.h) + 4) + '" font-size="3" font-weight="700" fill="#202c51">' + esc(it.label) + "</text>" : "") + "</g>";
      if (it.kind === "circle") out += "<g" + attr + '><circle cx="' + it.x + '" cy="' + it.y + '" r="' + Math.max(1, it.r) + '" fill="#e6ee58" fill-opacity=".45" stroke="#202c51" stroke-width=".4" stroke-dasharray="1.2 1"/>' + (it.label ? '<text x="' + it.x + '" y="' + (it.y - it.r - 1.2) + '" text-anchor="middle" font-size="3" font-weight="700" fill="#202c51">' + esc(it.label) + "</text>" : "") + "</g>";
      if (it.kind === "path" && it.pts.length) { var pts = it.pts.map(function (p) { return p[0] + "," + p[1]; }).join(" "); out += "<g" + attr + '><polyline points="' + pts + '" fill="none" stroke="#1f4a9a" stroke-width=".9" stroke-dasharray="2 1.5" stroke-linejoin="round" marker-end="url(#arr' + suffix + ')"/>' + (interactive ? '<polyline points="' + pts + '" fill="none" stroke="transparent" stroke-width="4"/>' : "") + (it.label ? '<text x="' + it.pts[0][0] + '" y="' + (it.pts[0][1] - 2) + '" font-size="2.8" fill="#1f4a9a">' + esc(it.label) + "</text>" : "") + "</g>"; }
      if (it.kind === "tp") out += "<g" + attr + ' transform="translate(' + it.x + " " + it.y + ')"><circle r="4.2" fill="#fff" stroke="#f39237" stroke-width=".6"/><text y="1.9" text-anchor="middle" font-size="5.5" font-weight="800" fill="#f39237">✕</text><text x="5" y="-3" font-size="3" font-weight="800" fill="#202c51">' + mapTpNumber(s, it) + (it.label ? " " + esc(it.label) : "") + "</text></g>";
      if (it.kind === "text") out += "<g" + attr + '><text x="' + it.x + '" y="' + it.y + '" font-size="3.6" font-weight="700" fill="#202c51">' + esc(it.label || "…") + "</text></g>";
    });
    return out;
  }
  function mapSvgStatic(s) { return '<svg viewBox="0 0 160 100">' + mapBg(s, "p") + mapItems(s, false) + "</svg>"; }
  RENDER.map = function (body, d, a) {
    var M = a.map = a.map || { sheets: [{ id: uid(), name: d.n === 16 ? (notesOf(16, 0)[0] || (S.lang === "de" ? "Konzept 1" : "Concept 1")) : (S.lang === "de" ? "Erdgeschoss" : "Ground floor"), img: null, items: [] }], active: null, legend: { rect: "", circle: "" } };
    if (!M.active || !M.sheets.some(function (s) { return s.id === M.active; })) M.active = M.sheets[0].id;
    var tool = "tp", sel = null, drawing = null, pendingTp = null;
    function sheet() { return M.sheets.find(function (s) { return s.id === M.active; }); }
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t(d.n === 16 ? "mapHint16" : "mapHint") + '</p><div class="map-top"><div class="sheets" id="sh"></div><label class="btn small">' + t("mapUpload") + '<input type="file" accept="image/*" id="mup" hidden></label><button class="btn small ghost" type="button" id="mrm">' + t("mapRemoveImg") + '</button></div><div class="map-wrap"><div><div class="toolbox" id="tb" role="toolbar" aria-label="' + t("mapTools") + '"></div><div class="mstage" id="ms"></div><p class="hint" id="mtip" style="margin:6px 0 0"></p></div><aside class="map-side"><div id="mtps"></div><div class="legend-box"><h3 class="caps" style="color:var(--c-blue)">' + t("mapLegend") + '</h3><div class="lg"><svg width="26" height="20" aria-hidden="true"><text x="13" y="16" text-anchor="middle" font-size="18" font-weight="800" fill="#f39237">✕</text></svg>' + t("tps") + '</div><div class="lg"><svg width="26" height="20" aria-hidden="true"><path d="M2 14 Q 10 2 22 10" fill="none" stroke="#1f4a9a" stroke-width="2.5" stroke-dasharray="4 3"/></svg>' + t("mapMove") + '</div><div class="lg"><svg width="26" height="20" aria-hidden="true"><rect x="3" y="3" width="20" height="14" fill="#86d3b4" fill-opacity=".35" stroke="#202c51"/></svg><input data-lg="rect" aria-label="' + t("mapRectMeans") + '" placeholder="' + t("mapRectMeans") + '"></div><div class="lg"><svg width="26" height="20" aria-hidden="true"><circle cx="13" cy="10" r="8" fill="#e6ee58" fill-opacity=".45" stroke="#202c51" stroke-dasharray="2 2"/></svg><input data-lg="circle" aria-label="' + t("mapCircleMeans") + '" placeholder="' + t("mapCircleMeans") + '"></div></div><div id="mlist"></div></aside></div>';
    var stage = body.querySelector("#ms"), tb = body.querySelector("#tb"), list = body.querySelector("#mlist"), tip = body.querySelector("#mtip");
    body.querySelectorAll("[data-lg]").forEach(function (inp) { inp.value = M.legend[inp.dataset.lg] || ""; inp.oninput = function () { M.legend[inp.dataset.lg] = inp.value; save(); }; });
    var icons = { select: '<path d="M5 3 L5 17 L9 13 L12 19 L14 18 L11 12 L16 12 Z" fill="currentColor"/>', tp: '<text x="10" y="16" text-anchor="middle" font-size="16" font-weight="800" fill="currentColor">✕</text>', path: '<path d="M2 16 Q 8 2 18 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-dasharray="3 2.5"/>', rect: '<rect x="3" y="5" width="14" height="11" fill="none" stroke="currentColor" stroke-width="2"/>', circle: '<circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"/>', text: '<text x="10" y="15" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">T</text>' };
    function drawTools() {
      tb.innerHTML = MAPTOOLS.map(function (k) { return '<button type="button" data-t="' + k + '" aria-pressed="' + (tool === k) + '"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' + icons[k] + "</svg><span>" + esc(t("mapT")[k]) + "</span></button>"; }).join("") + (drawing && drawing.kind === "path" ? '<button type="button" class="btn small primary" id="pfin">' + t("mapFinish") + "</button>" : "");
      tb.querySelectorAll("[data-t]").forEach(function (b) { b.onclick = function () { finishPath(); tool = b.dataset.t; pendingTp = null; drawTools(); drawTip(); }; });
      var pf = tb.querySelector("#pfin"); if (pf) pf.onclick = function () { finishPath(); };
    }
    function drawTip() { tip.textContent = pendingTp ? fmt(t("mapPlaceTp"), { l: pendingTp.label }) : t("mapTip")[tool]; }
    function drawSheets() {
      var sh = body.querySelector("#sh");
      sh.innerHTML = M.sheets.map(function (s) { return '<span class="sheet' + (s.id === M.active ? " on" : "") + '"><button type="button" data-s="' + s.id + '">' + esc(s.name || "…") + "</button></span>"; }).join("") + '<button type="button" class="btn small ghost" id="addsh">' + t("mapAddSheet") + '</button><input class="sheet-name" id="shn" aria-label="' + t("mapSheetName") + '" value="' + esc(sheet().name) + '">' + (M.sheets.length > 1 ? '<button type="button" class="btn small ghost" id="delsh">' + t("mapDelSheet") + "</button>" : "");
      sh.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { M.active = b.dataset.s; sel = null; save(); drawAll(); }; });
      sh.querySelector("#addsh").onclick = function () { var s = { id: uid(), name: (d.n === 16 ? (S.lang === "de" ? "Konzept " : "Concept ") : (S.lang === "de" ? "Plan " : "Sheet ")) + (M.sheets.length + 1), img: null, items: [] }; M.sheets.push(s); M.active = s.id; save(); drawAll(); };
      sh.querySelector("#shn").oninput = function (e) { sheet().name = e.target.value; save(); var b = sh.querySelector('[data-s="' + M.active + '"]'); if (b) b.textContent = e.target.value || "…"; };
      var del = sh.querySelector("#delsh"); if (del) del.onclick = function () { M.sheets = M.sheets.filter(function (s) { return s.id !== M.active; }); M.active = M.sheets[0].id; save(); drawAll(); };
    }
    function drawStage() {
      var s = sheet();
      stage.innerHTML = '<svg viewBox="0 0 160 100">' + mapBg(s, "") + mapItems(s, true, sel) + (drawing && drawing.kind === "path" && drawing.pts.length ? '<polyline points="' + drawing.pts.map(function (p) { return p.join(","); }).join(" ") + '" fill="none" stroke="#1f4a9a" stroke-width=".9" stroke-dasharray="2 1.5"/>' + drawing.pts.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".9" fill="#1f4a9a"/>'; }).join("") : "") + "</svg>";
    }
    function pt(e) { var svg = stage.querySelector("svg"), p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; var q = p.matrixTransform(svg.getScreenCTM().inverse()); return [Math.max(0, Math.min(160, +q.x.toFixed(1))), Math.max(0, Math.min(100, +q.y.toFixed(1)))]; }
    function finishPath() { if (drawing && drawing.kind === "path") { if (drawing.pts.length > 1) { sheet().items.push({ id: uid(), kind: "path", pts: drawing.pts, label: "" }); save(); } drawing = null; drawAll(); } }
    stage.addEventListener("pointerdown", function (e) {
      var p = pt(e), s = sheet(), g = e.target.closest ? e.target.closest(".mi") : null;
      if (tool === "select") {
        if (!g) { sel = null; drawStage(); drawList(); return; }
        var it = s.items.find(function (x) { return x.id === g.dataset.id; }); sel = it.id; drawStage(); drawList();
        var start = p, orig = JSON.parse(JSON.stringify(it)); stage.setPointerCapture(e.pointerId);
        var mv = function (ev) { var q = pt(ev), dx = q[0] - start[0], dy = q[1] - start[1]; if (it.kind === "path") it.pts = orig.pts.map(function (pp) { return [+(pp[0] + dx).toFixed(1), +(pp[1] + dy).toFixed(1)]; }); else { it.x = +(orig.x + dx).toFixed(1); it.y = +(orig.y + dy).toFixed(1); } drawStage(); };
        var up = function () { stage.removeEventListener("pointermove", mv); stage.removeEventListener("pointerup", up); save(); drawList(); };
        stage.addEventListener("pointermove", mv); stage.addEventListener("pointerup", up); return;
      }
      if (tool === "tp") { var item = { id: uid(), kind: "tp", x: p[0], y: p[1], label: pendingTp ? pendingTp.label : "" }; if (pendingTp) item.num = pendingTp.num; s.items.push(item); sel = item.id; pendingTp = null; save(); drawAll(); focusLabel(item.id); return; }
      if (tool === "text") { var tx = { id: uid(), kind: "text", x: p[0], y: p[1], label: "" }; s.items.push(tx); sel = tx.id; save(); drawAll(); focusLabel(tx.id); return; }
      if (tool === "path") { if (!drawing) drawing = { kind: "path", pts: [] }; drawing.pts.push(p); drawStage(); drawTools(); return; }
      if (tool === "rect" || tool === "circle") {
        var nw = tool === "rect" ? { id: uid(), kind: "rect", x: p[0], y: p[1], w: 0, h: 0, label: "" } : { id: uid(), kind: "circle", x: p[0], y: p[1], r: 0, label: "" };
        s.items.push(nw); stage.setPointerCapture(e.pointerId);
        var mv2 = function (ev) { var q = pt(ev); if (nw.kind === "rect") { nw.w = +(q[0] - nw.x).toFixed(1); nw.h = +(q[1] - nw.y).toFixed(1); } else nw.r = +Math.hypot(q[0] - nw.x, q[1] - nw.y).toFixed(1); drawStage(); };
        var up2 = function () { stage.removeEventListener("pointermove", mv2); stage.removeEventListener("pointerup", up2); if (nw.kind === "rect" && Math.abs(nw.w) < 2 && Math.abs(nw.h) < 2) { nw.w = 24; nw.h = 16; } if (nw.kind === "circle" && nw.r < 1.5) nw.r = 10; sel = nw.id; save(); drawAll(); focusLabel(nw.id); };
        stage.addEventListener("pointermove", mv2); stage.addEventListener("pointerup", up2);
      }
    });
    stage.addEventListener("dblclick", function () { finishPath(); });
    stage.tabIndex = 0; stage.setAttribute("role", "application"); stage.setAttribute("aria-label", t("mapKbd"));
    function onKey(e) {
      if (e.target.matches && e.target.matches("input, textarea, select")) return;
      if (document.activeElement === stage) {
        var it0 = sel && sheet().items.find(function (x) { return x.id === sel; }), mdx = { ArrowLeft: -2, ArrowRight: 2 }[e.key] || 0, mdy = { ArrowUp: -2, ArrowDown: 2 }[e.key] || 0;
        if (it0 && (mdx || mdy)) { e.preventDefault(); if (it0.kind === "path") it0.pts = it0.pts.map(function (p) { return [p[0] + mdx, p[1] + mdy]; }); else { it0.x += mdx; it0.y += mdy; } save(); drawStage(); return; }
        if (e.key === "Enter" && tool !== "select" && tool !== "path") { e.preventDefault(); var s0 = sheet(), nw0; if (tool === "tp") { nw0 = { id: uid(), kind: "tp", x: 80, y: 50, label: pendingTp ? pendingTp.label : "" }; if (pendingTp) nw0.num = pendingTp.num; pendingTp = null; } else if (tool === "text") nw0 = { id: uid(), kind: "text", x: 80, y: 50, label: "" }; else if (tool === "rect") nw0 = { id: uid(), kind: "rect", x: 68, y: 42, w: 24, h: 16, label: "" }; else nw0 = { id: uid(), kind: "circle", x: 80, y: 50, r: 10, label: "" }; s0.items.push(nw0); sel = nw0.id; save(); drawAll(); focusLabel(nw0.id); return; }
      }
      if (e.key === "Enter" || e.key === "Escape") finishPath();
      if ((e.key === "Delete" || e.key === "Backspace") && sel) { sheet().items = sheet().items.filter(function (x) { return x.id !== sel; }); sel = null; save(); drawAll(); }
    }
    document.addEventListener("keydown", onKey); cleanup.push(function () { document.removeEventListener("keydown", onKey); });
    function focusLabel(id) { var i = list.querySelector('[data-l="' + id + '"]'); if (i) i.focus(); }
    function drawList() {
      var s = sheet(), kinds = t("mapKinds");
      list.innerHTML = s.items.length ? '<h3 class="caps" style="color:var(--c-blue);margin-top:12px">' + t("mapElements") + "</h3>" : "";
      s.items.forEach(function (it) {
        var row = document.createElement("div"); row.className = "mrow" + (sel === it.id ? " sel" : "");
        row.innerHTML = '<span class="mk">' + (it.kind === "tp" ? "✕ " + mapTpNumber(s, it) : esc(kinds[it.kind])) + '</span><input data-l="' + it.id + '" aria-label="' + t("mapLabel") + '" placeholder="' + t("mapLabel") + '" value="' + esc(it.label || "") + '"><button class="x" type="button" aria-label="' + t("del") + '">×</button>';
        row.querySelector("input").oninput = function (e) { it.label = e.target.value; save(); drawStage(); };
        row.querySelector("input").onfocus = function () { if (sel !== it.id) { sel = it.id; drawStage(); list.querySelectorAll(".mrow").forEach(function (r) { r.classList.remove("sel"); }); row.classList.add("sel"); } };
        row.querySelector(".x").onclick = function () { s.items = s.items.filter(function (x) { return x !== it; }); sel = null; save(); drawAll(); };
        list.appendChild(row);
      });
    }
    function drawTps() {
      var box = body.querySelector("#mtps"), tps = touchPoints();
      if (!tps.length) { box.innerHTML = ""; return; }
      box.innerHTML = '<h3 class="caps" style="color:var(--c-blue)">' + t("mapFrom6") + '</h3><div class="chips">' + tps.map(function (s, i) { var placed = sheet().items.some(function (x) { return x.kind === "tp" && x.num === i + 1; }); return '<button type="button" class="idea' + (placed ? " placed" : "") + '" data-tp="' + i + '">✕ ' + (i + 1) + " " + esc(s.label || "…") + "</button>"; }).join("") + "</div>";
      box.querySelectorAll("[data-tp]").forEach(function (b) { b.onclick = function () { var i = +b.dataset.tp; finishPath(); tool = "tp"; pendingTp = { num: i + 1, label: tps[i].label || "" }; drawTools(); drawTip(); }; });
    }
    body.querySelector("#mup").onchange = function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        var img = new Image();
        img.onload = function () {
          var sc = Math.min(1, 1400 / Math.max(img.width, img.height)), cv = document.createElement("canvas");
          cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
          var g = cv.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height); g.drawImage(img, 0, 0, cv.width, cv.height);
          sheet().img = cv.toDataURL("image/jpeg", .8); save(); drawStage();
        };
        img.src = rd.result;
      };
      rd.readAsDataURL(f); e.target.value = "";
    };
    body.querySelector("#mrm").onclick = function () { sheet().img = null; save(); drawStage(); };
    function drawAll() { drawSheets(); drawTools(); drawTip(); drawStage(); drawList(); drawTps(); }
    drawAll();
  };

  /* ---------- activity 21: feedback & feedforward signals ---------- */
  var PHASES = [["ff", "var(--c-sky)", "#6dbcdf"], ["act", "var(--c-blue)", "#1f4a9a"], ["pos", "var(--c-green)", "#86d3b4"], ["neg", "var(--c-orange)", "#f39237"]];
  var MODS = ["light", "sound", "vibration", "screen", "voice", "shape", "person"];
  function emptyCell() { return { text: "", mods: [], pattern: "" }; }
  function newMoment(name, tpId) { return { id: uid(), name: name || "", tpId: tpId || "", cells: { ff: emptyCell(), act: emptyCell(), pos: emptyCell(), neg: emptyCell() } }; }
  function patternHtml(p) { return (p || "").split("").map(function (ch) { return ch === "." ? '<i class="pd"></i>' : ch === "-" ? '<i class="pl"></i>' : '<i class="ps"></i>'; }).join(""); }
  RENDER.signals = function (body, d, a) {
    var G = a.signals = a.signals || { moments: [] };
    if (!G.moments.length) { var tps = touchPoints(); (tps.length ? tps : [null]).forEach(function (s) { G.moments.push(newMoment(s ? s.label : "", s ? s.id : "")); }); save(); }
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("sigHint") + '</p><div class="act-tools" style="margin-top:0"><button class="btn small" type="button" id="sadd">' + t("sigAdd") + '</button><button class="btn small ghost" type="button" id="simp">' + t("sigImport") + '</button></div><div class="sig-scroll"><div class="sig" id="sg"></div></div>';
    var sg = body.querySelector("#sg");
    function draw() {
      sg.innerHTML = '<div class="sig-h blank"></div>' + PHASES.map(function (p) { return '<div class="sig-h" style="--q:' + p[1] + '"><b>' + esc(t("sigPh")[p[0]][0]) + "</b><span>" + esc(t("sigPh")[p[0]][1]) + "</span></div>"; }).join("");
      G.moments.forEach(function (m, mi) {
        var name = document.createElement("div"); name.className = "sig-name";
        name.innerHTML = '<span class="caps">' + t("sigMoment") + " " + (mi + 1) + '</span><textarea rows="2" aria-label="' + t("sigMoment") + " " + (mi + 1) + '" placeholder="' + t("sigMomentPh") + '"></textarea><button class="x" type="button" aria-label="' + t("del") + '">×</button>';
        var nta = name.querySelector("textarea"); nta.value = m.name; nta.oninput = function () { m.name = nta.value; save(); };
        name.querySelector(".x").onclick = function () { G.moments.splice(mi, 1); save(); draw(); };
        sg.appendChild(name);
        PHASES.forEach(function (p) {
          var c = m.cells[p[0]], cell = document.createElement("div"); cell.className = "sig-cell"; cell.style.setProperty("--q", p[1]);
          cell.innerHTML = '<textarea rows="2" aria-label="' + esc(t("sigPh")[p[0]][0]) + '"></textarea><div class="mods">' + MODS.map(function (md) { return '<button type="button" data-md="' + md + '" aria-pressed="' + (c.mods.indexOf(md) > -1) + '">' + esc(t("sigMods")[md]) + "</button>"; }).join("") + '</div><div class="pat"><span class="lamp" style="--lc:' + p[2] + '"></span><span class="pat-view">' + patternHtml(c.pattern) + '</span><span class="pat-btns"><button type="button" data-p="." title="' + t("sigShort") + '" aria-label="' + t("sigShort") + '">·</button><button type="button" data-p="-" title="' + t("sigLong") + '" aria-label="' + t("sigLong") + '">–</button><button type="button" data-p=" " title="' + t("sigPause") + '" aria-label="' + t("sigPause") + '">␣</button><button type="button" data-p="back" aria-label="' + t("del") + '">⌫</button><button type="button" data-p="play" aria-label="' + t("sigPlay") + '">▶</button></span></div>';
          var ta = cell.querySelector("textarea"); ta.value = c.text; ta.oninput = function () { c.text = ta.value; save(); };
          cell.querySelectorAll("[data-md]").forEach(function (b) { b.onclick = function () { var i = c.mods.indexOf(b.dataset.md); if (i > -1) c.mods.splice(i, 1); else c.mods.push(b.dataset.md); b.setAttribute("aria-pressed", i < 0); save(); }; });
          cell.querySelectorAll("[data-p]").forEach(function (b) { b.onclick = function () {
            var v = b.dataset.p;
            if (v === "play") { play(cell.querySelector(".lamp"), c.pattern); return; }
            c.pattern = v === "back" ? c.pattern.slice(0, -1) : (c.pattern + v).slice(0, 24); save(); cell.querySelector(".pat-view").innerHTML = patternHtml(c.pattern);
          }; });
          sg.appendChild(cell);
        });
      });
    }
    function play(lamp, pat) {
      if (!pat) return; var seq = [], i;
      for (i = 0; i < pat.length; i++) { if (pat[i] === ".") seq.push([1, 180], [0, 180]); else if (pat[i] === "-") seq.push([1, 540], [0, 180]); else seq.push([0, 540]); }
      var k = 0; (function next() { if (k >= seq.length) { lamp.classList.remove("on"); return; } lamp.classList.toggle("on", !!seq[k][0]); setTimeout(next, seq[k][1]); k++; })();
    }
    body.querySelector("#sadd").onclick = function () { G.moments.push(newMoment()); save(); draw(); var tas = sg.querySelectorAll(".sig-name textarea"); tas[tas.length - 1].focus(); };
    body.querySelector("#simp").onclick = function () {
      var have = G.moments.map(function (m) { return m.tpId; }), add = touchPoints().filter(function (s) { return have.indexOf(s.id) < 0; });
      if (!add.length) { toast(t("noTps")); return; }
      add.forEach(function (s) { G.moments.push(newMoment(s.label, s.id)); }); save(); draw();
    };
    draw();
  };

  /* ---------- activity 22: feedback / feedforward flow ---------- */
  var FTYPES = [["ff", "#6dbcdf"], ["act", "#1f4a9a"], ["proc", "#e6ee58"], ["pos", "#86d3b4"], ["neg", "#f39237"], ["end", "#202c51"]];
  function fcol(type) { for (var i = 0; i < FTYPES.length; i++) if (FTYPES[i][0] === type) return FTYPES[i][1]; return "#ccc"; }
  RENDER.flow = function (body, d, a) {
    var F = a.flow = a.flow || { steps: [] };
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("flHint") + '</p><div class="act-tools" style="margin-top:0"><span class="caps" style="color:var(--c-blue)">' + t("flAdd") + '</span><span id="fpal" class="fpal"></span><button class="btn small ghost" type="button" id="fgen">' + t("flGen") + '</button></div><div class="flow" id="fl"></div><div class="checks" id="fck"></div>';
    var fl = body.querySelector("#fl"), fck = body.querySelector("#fck"), dragId = null;
    body.querySelector("#fpal").innerHTML = FTYPES.map(function (ft) { return '<button type="button" class="fadd" data-ty="' + ft[0] + '" style="--q:' + ft[1] + '">+ ' + esc(t("flTypes")[ft[0]]) + "</button>"; }).join("");
    body.querySelectorAll(".fadd").forEach(function (b) { b.onclick = function () { F.steps.push({ id: uid(), type: b.dataset.ty, text: "", retry: "" }); save(); draw(); var tas = fl.querySelectorAll("textarea"); tas[tas.length - 1].focus(); }; });
    body.querySelector("#fgen").onclick = function () {
      var G = S.project.acts[21] && S.project.acts[21].signals; if (!G || !G.moments.length) { toast(t("flNo21")); return; }
      G.moments.forEach(function (m) {
        var actId = uid();
        F.steps.push({ id: uid(), type: "ff", text: m.cells.ff.text || m.name, retry: "" });
        F.steps.push({ id: actId, type: "act", text: m.cells.act.text, retry: "" });
        F.steps.push({ id: uid(), type: "proc", text: "", retry: "" });
        F.steps.push({ id: uid(), type: "pos", text: m.cells.pos.text, retry: "" });
        if (m.cells.neg.text) F.steps.push({ id: uid(), type: "neg", text: m.cells.neg.text, retry: actId });
      });
      save(); draw();
    };
    function draw() {
      fl.innerHTML = F.steps.length ? "" : '<p class="hint">' + t("flEmpty") + "</p>";
      F.steps.forEach(function (s, i) {
        if (i) { var ar = document.createElement("span"); ar.className = "farrow"; ar.textContent = "→"; ar.setAttribute("aria-hidden", "true"); fl.appendChild(ar); }
        var c = document.createElement("div"); c.className = "fstep"; c.draggable = true; fresh(c, s.id); c.style.setProperty("--q", fcol(s.type));
        c.innerHTML = '<div class="fhead"><span class="fnum">' + (i + 1) + '</span><select aria-label="' + t("flType") + '">' + FTYPES.map(function (ft) { return '<option value="' + ft[0] + '"' + (ft[0] === s.type ? " selected" : "") + ">" + esc(t("flTypes")[ft[0]]) + "</option>"; }).join("") + '</select><button type="button" class="mv" data-d="-1" aria-label="' + t("mvBack") + '">‹</button><button type="button" class="mv" data-d="1" aria-label="' + t("mvFwd") + '">›</button><button class="x" type="button" aria-label="' + t("del") + '">×</button></div><textarea rows="3" aria-label="' + esc(t("flTypes")[s.type]) + '"></textarea>' +
          (s.type === "neg" ? '<label class="mini">' + t("flRetry") + '<select data-retry><option value="">' + t("flNoRetry") + "</option>" + F.steps.slice(0, i).map(function (q, qi) { return '<option value="' + q.id + '"' + (s.retry === q.id ? " selected" : "") + ">↺ " + (qi + 1) + " · " + esc(t("flTypes")[q.type]) + "</option>"; }).join("") + "</select></label>" : "");
        var ta = c.querySelector("textarea"); ta.value = s.text; ta.oninput = function () { s.text = ta.value; save(); };
        c.querySelector(".fhead select").onchange = function (e) { s.type = e.target.value; save(); draw(); };
        c.querySelectorAll(".mv").forEach(function (b) { b.onclick = function () { var j = i + +b.dataset.d; if (j < 0 || j >= F.steps.length) return; F.steps.splice(j, 0, F.steps.splice(i, 1)[0]); save(); draw(); }; });
        c.querySelector(".x").onclick = function () { F.steps.splice(i, 1); F.steps.forEach(function (q) { if (q.retry === s.id) q.retry = ""; }); save(); draw(); };
        var rs = c.querySelector("[data-retry]"); if (rs) rs.onchange = function (e) { s.retry = e.target.value; save(); draw(); };
        if (s.type === "neg" && s.retry) { var ti = F.steps.findIndex(function (q) { return q.id === s.retry; }); if (ti > -1) { var lp = document.createElement("div"); lp.className = "floop"; lp.textContent = fmt(t("flBack"), { n: ti + 1 }); c.appendChild(lp); } }
        c.addEventListener("dragstart", function (e) { if (e.target.closest && e.target.closest("textarea, select, input")) return; dragId = s.id; c.classList.add("dragging"); try { e.dataTransfer.setData("text/plain", s.id); } catch (er) {} });
        c.addEventListener("dragend", function () { c.classList.remove("dragging"); });
        c.addEventListener("dragover", function (e) { e.preventDefault(); });
        c.addEventListener("drop", function (e) { e.preventDefault(); if (!dragId || dragId === s.id) return; var from = F.steps.findIndex(function (q) { return q.id === dragId; }); var mvd = F.steps.splice(from, 1)[0]; var to = F.steps.findIndex(function (q) { return q.id === s.id; }); F.steps.splice(from < i ? to + 1 : to, 0, mvd); dragId = null; save(); draw(); });
        fl.appendChild(c);
      });
      var st = F.steps, firstAct = st.findIndex(function (s) { return s.type === "act"; });
      var negs = st.filter(function (s) { return s.type === "neg"; });
      var checks = [
        [firstAct > 0 && st.slice(0, firstAct).some(function (s) { return s.type === "ff"; }), t("flChecks")[0]],
        [st.some(function (s) { return s.type === "proc"; }), t("flChecks")[1]],
        [st.some(function (s) { return s.type === "pos"; }), t("flChecks")[2]],
        [negs.length > 0 && negs.every(function (s) { return s.retry; }), t("flChecks")[3]]
      ];
      fck.innerHTML = '<h3 class="caps" style="color:var(--c-blue)">' + t("flCheckTitle") + "</h3><ul>" + checks.map(function (c) { return '<li class="' + (c[0] ? "ok" : "") + '"><span>' + (c[0] ? "✓" : "○") + "</span>" + esc(c[1]) + "</li>"; }).join("") + "</ul>";
    }
    draw();
  };


  /* ---------- activity 8: digital / hybrid / analogue spheres with links ---------- */
  function sphereRegion(x) { return x < 36 ? 0 : x > 64 ? 2 : 1; }
  function sphereSvg() {
    return '<svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">' +
      '<path d="M18 78 C2 78 2 56 16 54 C10 38 30 26 42 34 C48 16 76 16 80 34 C96 30 100 50 90 58 C100 70 86 84 72 78 Z" fill="#d1efe4" stroke="#6dbcdf" stroke-width=".6"/>' +
      '<path d="M120 22 L164 14 L194 40 L184 86 L140 90 L116 64 Z" fill="#d1efe4" stroke="#86d3b4" stroke-width=".6"/>' +
      '<ellipse cx="100" cy="54" rx="20" ry="30" fill="#e6ee58" fill-opacity=".28" stroke="#202c51" stroke-width=".3" stroke-dasharray="1.4 1"/></svg>';
  }
  RENDER.spheres = function (body, d, a, c) {
    a.fields = a.fields || {}; [0, 1, 2].forEach(function (f) { a.fields[f] = a.fields[f] || []; });
    a.links = a.links || [];
    var mode = "move", first = null, labels = d.fields.map(function (f) { return L(f); });
    [0, 1, 2].forEach(function (f) { a.fields[f].forEach(function (n, i) { if (n.x == null || sphereRegionXY(n.x, n.y) !== f) { n.x = SPHERE_HOME[f][0] + (i % 3) * 6 - 6; n.y = SPHERE_HOME[f][1] + Math.floor(i / 3) * 10 + (i % 2) * 4; } }); });
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("spHint") + '</p><div class="act-tools" style="margin-top:0"><div class="seg" role="group"><button type="button" data-mode="move">' + t("spMove") + '</button><button type="button" data-mode="link">' + t("spLink") + '</button></div><form class="addrow" id="spf" style="flex:1;min-width:260px"><input id="spi" placeholder="' + t("zAddItem") + '" aria-label="' + t("zAddItem") + '"><select id="sps" aria-label="' + t("rAddTo") + '">' + labels.map(function (l, i) { return '<option value="' + i + '">' + esc(l) + "</option>"; }).join("") + '</select><button class="btn" type="submit">' + t("zAdd") + '</button></form></div><div class="spstage" id="sps-stage"></div><div class="cols" id="spl" style="margin-top:14px"></div>';
    var stage = body.querySelector("#sps-stage"), spl = body.querySelector("#spl");
    function all() { var o = []; [0, 1, 2].forEach(function (f) { a.fields[f].forEach(function (n) { o.push(n); }); }); return o; }
    function byId(id) { return all().find(function (n) { return n.id === id; }); }
    function reassign(n) { var r = sphereRegionXY(n.x, n.y); [0, 1, 2].forEach(function (f) { var i = a.fields[f].indexOf(n); if (i > -1 && f !== r) { a.fields[f].splice(i, 1); a.fields[r].push(n); } }); }
    function drawStage() {
      var lines = a.links.map(function (l) { var p = byId(l[0]), q = byId(l[1]); return p && q ? '<line x1="' + p.x + '" y1="' + p.y + '" x2="' + q.x + '" y2="' + q.y + '"/>' : ""; }).join("");
      stage.innerHTML = sphereSvgV6(labels) + '<svg class="splinks" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + lines + "</svg>";
      all().forEach(function (n) {
        if (!n.text.trim()) return;
        var el = document.createElement("div"); el.className = "zitem" + (first === n.id ? " picked" : ""); el.tabIndex = 0; el.textContent = n.text; el.title = n.text;
        el.style.left = n.x + "%"; el.style.top = n.y + "%";
        if (mode === "move") dragChip(el, stage, n, function () { drawLinesOnly(); stage.dataset.hot = sphereRegionXY(n.x, n.y); }, function () { var was = -1; [0, 1, 2].forEach(function (f) { if (a.fields[f].indexOf(n) > -1) was = f; }); reassign(n); var now = sphereRegionXY(n.x, n.y); delete stage.dataset.hot; save(); drawStage(); drawLists(); if (was !== now) { toast(fmt(t("spMovedTo"), { n: n.text, r: labels[now] })); var ne = Array.prototype.find.call(stage.querySelectorAll(".zitem"), function (x) { return x.textContent.indexOf(n.text) === 0; }); if (ne) { ne.classList.add("landed"); if (document.activeElement === document.body) ne.focus(); } } });
        else el.addEventListener("click", function () {
          if (!first) { first = n.id; drawStage(); return; }
          if (first !== n.id && !a.links.some(function (l) { return (l[0] === first && l[1] === n.id) || (l[1] === first && l[0] === n.id); })) a.links.push([first, n.id]);
          first = null; save(); drawStage(); drawLists();
        });
        chipKit(el, n, kitArr(all, function () { drawStage(); drawLists(); }, { push: function (c, src) { [0, 1, 2].forEach(function (f) { if (a.fields[f].indexOf(src) > -1) a.fields[f].push(c); }); }, home: function (x) { var h = []; [0, 1, 2].forEach(function (f) { if (a.fields[f].indexOf(x) > -1) h = a.fields[f]; }); return h; }, after: function (x) { a.links = a.links.filter(function (l) { return l[0] !== x.id && l[1] !== x.id; }); } }));
        stage.appendChild(el);
      });
    }
    function drawLinesOnly() { var svg = stage.querySelector(".splinks"); if (!svg) return; svg.innerHTML = a.links.map(function (l) { var p = byId(l[0]), q = byId(l[1]); return p && q ? '<line x1="' + p.x + '" y1="' + p.y + '" x2="' + q.x + '" y2="' + q.y + '"/>' : ""; }).join(""); }
    function drawLists() {
      spl.innerHTML = "";
      [0, 1, 2].forEach(function (f) {
        var col = document.createElement("div"); col.className = "col"; col.innerHTML = "<h3>" + esc(labels[f]) + "</h3>";
        col.appendChild(chipList(a.fields[f].filter(function (n) { return n.text.trim(); }), function (n) { a.fields[f].splice(a.fields[f].indexOf(n), 1); a.links = a.links.filter(function (l) { return l[0] !== n.id && l[1] !== n.id; }); save(); drawStage(); drawLists(); }));
        spl.appendChild(col);
      });
      var lc = document.createElement("div"); lc.className = "col"; lc.innerHTML = "<h3>" + t("spLinks") + "</h3>";
      var valid = a.links.filter(function (l) { return byId(l[0]) && byId(l[1]); });
      if (!valid.length) lc.innerHTML += '<p class="hint" style="margin:0">' + t("spNoLinks") + "</p>";
      valid.forEach(function (l) { var row = document.createElement("div"); row.className = "chip"; row.innerHTML = esc(byId(l[0]).text) + " — " + esc(byId(l[1]).text) + '<button type="button" aria-label="' + t("del") + '">×</button>'; row.querySelector("button").onclick = function () { a.links.splice(a.links.indexOf(l), 1); save(); drawStage(); drawLists(); }; lc.appendChild(row); });
      spl.appendChild(lc);
    }
    function setMode() { body.querySelectorAll("[data-mode]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === mode); }); }
    body.querySelectorAll("[data-mode]").forEach(function (b) { b.onclick = function () { mode = b.dataset.mode; first = null; setMode(); drawStage(); }; });
    body.querySelector("#spf").onsubmit = function (e) {
      e.preventDefault(); var i = body.querySelector("#spi"), f = +body.querySelector("#sps").value; if (!i.value.trim()) return;
      var k = a.fields[f].length; a.fields[f].push({ id: uid(), text: i.value.trim(), x: SPHERE_HOME[f][0] + (k % 3) * 6 - 6, y: SPHERE_HOME[f][1] + (k % 4) * 9 });
      i.value = ""; save(); drawStage(); drawLists(); i.focus();
    };
    setMode(); drawStage(); drawLists();
  };

  /* ---------- activity 11: interaction relabelling deck ---------- */
  function relabelCards() { var a = S.project.acts[11]; return a && a.relabel ? a.relabel.cards : []; }
  function metaphorText(cd) { var m = cd.metaphor || {}; return [m.verb, m.adj, m.noun].filter(Boolean).join(" "); }
  RENDER.relabel = function (body, d, a) {
    var R = a.relabel;
    if (!R) {
      R = a.relabel = { cards: [] };
      if (a.fields) { notesOf(11, 0).forEach(function (tx) { R.cards.push({ id: uid(), object: tx, mechanism: "", metaphor: {}, auth: "", tp: "" }); }); notesOf(11, 1).concat(notesOf(11, 2)).forEach(function (tx) { R.cards.push({ id: uid(), object: "", mechanism: "", metaphor: {}, auth: tx, tp: "" }); }); }
      save();
    }
    var objs = window.ADA_RELABEL_OBJECTS;
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("rlHint") + '</p><div class="deck-row" id="rdeck"></div><div class="act-tools"><button class="btn small primary" type="button" id="rrand">' + t("rlRandom") + '</button><button class="btn small" type="button" id="rown">' + t("rlOwn") + '</button></div><div class="rcards" id="rcards"></div>';
    var deck = body.querySelector("#rdeck"), cards = body.querySelector("#rcards");
    deck.innerHTML = objs.map(function (o, i) { return '<button type="button" class="ocard" data-o="' + i + '"><b>' + esc(L(o.name)) + "</b><span>" + esc(L(o.mech)) + "</span></button>"; }).join("");
    function add(o) { var cd = { id: uid(), object: o ? L(o.name) : "", mechanism: o ? L(o.mech) : "", metaphor: { verb: "", adj: "", noun: o ? L(o.name) : "" }, auth: "", tp: "" }; R.cards.unshift(cd); save(); draw(); var f = cards.querySelector(o ? "[data-k=auth]" : "[data-k=object]"); if (f) f.focus(); }
    deck.querySelectorAll("[data-o]").forEach(function (b) { b.onclick = function () { add(objs[+b.dataset.o]); }; });
    body.querySelector("#rrand").onclick = function () { var i = Math.floor(Math.random() * objs.length), b = deck.querySelector('[data-o="' + i + '"]'); if (b) { b.classList.add("drawn"); setTimeout(function () { b.classList.remove("drawn"); }, 700); } add(objs[i]); };
    body.querySelector("#rown").onclick = function () { add(null); };
    function draw() {
      var tps = touchPoints();
      cards.innerHTML = R.cards.length ? "" : '<p class="hint">' + t("rlEmpty") + "</p>";
      R.cards.forEach(function (cd, ci) {
        var el = document.createElement("article"); el.className = "rcard"; fresh(el, cd.id);
        el.innerHTML = '<div class="rc-top"><input data-k="object" class="rc-obj" placeholder="' + t("rlObject") + '" aria-label="' + t("rlObject") + '"><button class="x" type="button" aria-label="' + t("del") + '">×</button></div>' +
          '<label class="mini">' + t("rlMech") + '<textarea data-k="mechanism" rows="2"></textarea></label>' +
          '<div class="mini">' + t("rlMeta") + '<div class="meta3"><input data-m="verb" placeholder="' + t("rlVerb") + '" aria-label="' + t("rlVerb") + '"><input data-m="adj" placeholder="' + t("rlAdj") + '" aria-label="' + t("rlAdj") + '"><input data-m="noun" placeholder="' + t("rlNoun") + '" aria-label="' + t("rlNoun") + '"></div><span class="meta-prev"></span></div>' +
          '<div class="rc-arrow" aria-hidden="true">↓</div><label class="mini">' + t("rlAuth") + '<textarea data-k="auth" rows="3"></textarea></label>' +
          '<label class="mini">' + t("mWhere") + '<select data-k="tp"><option value="">' + t("mNoTp") + "</option>" + tps.map(function (s, i) { return '<option value="' + s.id + '"' + (cd.tp === s.id ? " selected" : "") + ">" + (i + 1) + ". " + esc(s.label || "…") + "</option>"; }).join("") + "</select></label>";
        el.querySelectorAll("[data-k]").forEach(function (inp) { if (inp.tagName !== "SELECT") inp.value = cd[inp.dataset.k] || ""; inp.oninput = inp.onchange = function () { cd[inp.dataset.k] = inp.value; save(); }; });
        var prev = el.querySelector(".meta-prev");
        function showPrev() { var m = metaphorText(cd); prev.textContent = m ? "„" + m + "“" : ""; }
        el.querySelectorAll("[data-m]").forEach(function (inp) { cd.metaphor = cd.metaphor || {}; inp.value = cd.metaphor[inp.dataset.m] || ""; inp.oninput = function () { cd.metaphor[inp.dataset.m] = inp.value; save(); showPrev(); }; });
        showPrev();
        el.querySelector(".x").onclick = function () { R.cards.splice(ci, 1); save(); draw(); };
        cards.appendChild(el);
      });
    }
    draw();
  };

  /* ---------- activity 13: requirements from citations ---------- */
  var PRIOS = ["must", "should", "could"];
  function reqRows() { var a = S.project.acts[13]; return a && a.reqs ? a.reqs.rows : []; }
  RENDER.reqs = function (body, d, a) {
    var Q = a.reqs;
    if (!Q) {
      Q = a.reqs = { rows: [] };
      if (a.fields) { var s0 = notesOf(13, 0), s1 = notesOf(13, 1), s2 = notesOf(13, 2), n = Math.max(s0.length, s1.length, s2.length); for (var i = 0; i < n; i++) Q.rows.push({ id: uid(), source: s0[i] || "", user: s1[i] || "", req: s2[i] || "", prio: "" }); }
      save();
    }
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("rqHint") + '</p><div class="rq"><aside class="rq-src"><h3 class="caps" style="color:var(--c-blue)">' + t("rqFrom12") + '</h3><div id="rqs"></div></aside><div><div class="act-tools" style="margin-top:0"><button class="btn small" type="button" id="rqadd">' + t("rqAdd") + '</button><span class="hint" id="rqcount"></span><button class="btn small ghost" type="button" id="rqsort">' + t("rqSort") + '</button></div><div id="rqt"></div></div></div><datalist id="rqusers">' + uniq(groupTitles()).map(function (u) { return '<option value="' + esc(u) + '">'; }).join("") + "</datalist>";
    var src = body.querySelector("#rqs"), tbl = body.querySelector("#rqt");
    function drawSrc() {
      var quotes = uniq(quoteItems().filter(function (q) { return q.text.trim(); }).map(function (q) { return q.kind === "quote" ? "„" + q.text + "“" : q.text; }));
      src.innerHTML = quotes.length ? "" : '<p class="hint" style="margin:0">' + t("rqNo12") + "</p>";
      quotes.forEach(function (q) {
        var used = Q.rows.some(function (r) { return r.source === q; }), b = document.createElement("button");
        b.type = "button"; b.className = "quote" + (used ? " used" : ""); b.textContent = q;
        b.onclick = function () { Q.rows.push({ id: uid(), source: q, user: "", req: "", prio: "" }); save(); drawAll(); var r = tbl.querySelectorAll("[data-k=req]"); r[r.length - 1].focus(); };
        src.appendChild(b);
      });
    }
    function drawTable() {
      tbl.innerHTML = "";
      if (!Q.rows.length) { tbl.innerHTML = '<p class="hint">' + t("rqEmpty") + "</p>"; }
      Q.rows.forEach(function (r, i) {
        var row = document.createElement("div"); row.className = "rq-row prio-" + (r.prio || "none"); fresh(row, r.id);
        row.innerHTML = '<label class="mini">' + L(defOf(13).fields[0]) + '<textarea data-k="source" rows="2"></textarea></label><label class="mini">' + L(defOf(13).fields[1]) + '<input data-k="user" list="rqusers"></label><label class="mini">' + L(defOf(13).fields[2]) + '<textarea data-k="req" rows="2"></textarea></label><div class="mini">' + t("rqPrio") + '<div class="seg small">' + PRIOS.map(function (p) { return '<button type="button" data-p="' + p + '" aria-pressed="' + (r.prio === p) + '">' + esc(t("rqPrios")[p]) + "</button>"; }).join("") + '</div></div><button class="x" type="button" aria-label="' + t("del") + '">×</button>';
        row.querySelectorAll("[data-k]").forEach(function (inp) { inp.value = r[inp.dataset.k] || ""; inp.oninput = function () { r[inp.dataset.k] = inp.value; save(); }; });
        row.querySelectorAll("[data-p]").forEach(function (b) { b.onclick = function () { r.prio = r.prio === b.dataset.p ? "" : b.dataset.p; save(); drawTable(); }; });
        row.querySelector(".x").onclick = function () { Q.rows.splice(i, 1); save(); drawAll(); };
        tbl.appendChild(row);
      });
      var cnt = {}; PRIOS.forEach(function (p) { cnt[p] = Q.rows.filter(function (r) { return r.prio === p; }).length; });
      body.querySelector("#rqcount").textContent = PRIOS.map(function (p) { return t("rqPrios")[p] + ": " + cnt[p]; }).join(" · ");
    }
    body.querySelector("#rqadd").onclick = function () { Q.rows.push({ id: uid(), source: "", user: "", req: "", prio: "" }); save(); drawAll(); };
    body.querySelector("#rqsort").onclick = function () { Q.rows.sort(function (x, y) { var ix = PRIOS.indexOf(x.prio), iy = PRIOS.indexOf(y.prio); return (ix < 0 ? 9 : ix) - (iy < 0 ? 9 : iy); }); save(); drawTable(); };
    function drawAll() { drawSrc(); drawTable(); }
    drawAll();
  };

  /* ---------- activity 20: storyboard with sketching ---------- */
  var PENS = ["#202c51", "#f39237", "#6dbcdf", "#86d3b4"];
  RENDER.story = function (body, d, a) {
    var SK = d.storyKeys || ["who", "what", "where"];
    var B = a.story;
    if (!B) {
      B = a.story = { panels: [] };
      if (a.fields) { var cols = SK.map(function (_, k) { return notesOf(d.n, k); }), n = Math.max.apply(null, cols.map(function (c) { return c.length; })); for (var i = 0; i < n; i++) { var pnl = { id: uid(), img: null, caption: "" }; SK.forEach(function (k, j) { pnl[k] = cols[j][i] || ""; }); B.panels.push(pnl); } }
      if (!B.panels.length) for (var k = 0; k < 3; k++) B.panels.push({ id: uid(), img: null, caption: "", who: "", what: "", where: "" });
      save();
    }
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t(d.n === 7 ? "sbHint7" : "sbHint") + '</p><div class="act-tools" style="margin-top:0"><button class="btn small" type="button" id="sbadd">' + t("sbAdd") + '</button></div><div class="sb" id="sb"></div>';
    var sb = body.querySelector("#sb");
    function draw() {
      sb.innerHTML = "";
      B.panels.forEach(function (p, i) {
        var el = document.createElement("article"); el.className = "sb-panel"; fresh(el, p.id);
        el.innerHTML = '<div class="sb-head"><span class="fnum" style="--q:var(--c-blue)">' + (i + 1) + '</span><span class="sb-tools">' + PENS.map(function (c, ci) { return '<button type="button" class="pen' + (ci === 0 ? " on" : "") + '" data-c="' + c + '" style="--pc:' + c + '" aria-pressed="' + (ci === 0) + '" aria-label="' + t("sbPen") + ": " + t("sbPenNames")[ci] + '"></button>'; }).join("") + '<button type="button" class="tool" data-c="erase" aria-pressed="false" aria-label="' + t("sbErase") + '">⌫</button><button type="button" class="tool" data-clear aria-label="' + t("sbClear") + '">⟲</button><label class="tool sb-up" title="' + t("sbUpload") + '"><input type="file" accept="image/*" class="sr-only"><span aria-hidden="true">⤒</span><span class="sr-only">' + t("sbUpload") + '</span></label></span><span style="flex:1"></span><button type="button" class="mv" data-d="-1" aria-label="' + t("sbLeft") + '">‹</button><button type="button" class="mv" data-d="1" aria-label="' + t("sbRight") + '">›</button><button class="x" type="button" aria-label="' + t("del") + " " + (i + 1) + '">×</button></div><canvas width="480" height="320" role="img" aria-label="' + t("sbCanvas") + " " + (i + 1) + '" aria-describedby="cap-' + p.id + '"></canvas><textarea id="cap-' + p.id + '" data-k="caption" rows="2" placeholder="' + t("sbCaption") + '" aria-label="' + t("sbCaptionA") + '"></textarea><div class="sb-www" style="grid-template-columns:repeat(' + SK.length + ', minmax(0, 1fr))">' + SK.map(function (k, j) { return '<label class="mini">' + esc(L(d.fields[j])) + '<textarea data-k="' + k + '" rows="2"></textarea></label>'; }).join("") + "</div>";
        el.querySelectorAll("[data-k]").forEach(function (inp) { inp.value = p[inp.dataset.k] || ""; inp.oninput = function () { p[inp.dataset.k] = inp.value; save(); }; });
        var cv = el.querySelector("canvas"), g = cv.getContext("2d"), pen = PENS[0];
        g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height);
        if (p.img) { var im = new Image(); im.onload = function () { g.drawImage(im, 0, 0, cv.width, cv.height); }; im.src = p.img; }
        el.querySelectorAll("[data-c]").forEach(function (b) { b.onclick = function () { pen = b.dataset.c; el.querySelectorAll("[data-c]").forEach(function (x) { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); }); }; });
        el.querySelector(".sb-up input").onchange = function (e) { var f = e.target.files && e.target.files[0]; if (!f) return; var rd = new FileReader(); rd.onload = function () { var im2 = new Image(); im2.onload = function () { var sc = Math.min(cv.width / im2.width, cv.height / im2.height), w = im2.width * sc, h = im2.height * sc; g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height); g.drawImage(im2, (cv.width - w) / 2, (cv.height - h) / 2, w, h); p.img = cv.toDataURL("image/jpeg", .85); save(); toast(t("sbUploaded")); }; im2.src = rd.result; }; rd.readAsDataURL(f); };
        el.querySelector("[data-clear]").onclick = function () { g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height); p.img = null; save(); };
        cv.addEventListener("pointerdown", function (e) {
          e.preventDefault(); cv.setPointerCapture(e.pointerId);
          var r = cv.getBoundingClientRect(), sx = cv.width / r.width, sy = cv.height / r.height, last = [(e.clientX - r.left) * sx, (e.clientY - r.top) * sy];
          g.lineCap = "round"; g.lineJoin = "round"; g.strokeStyle = pen === "erase" ? "#fff" : pen; g.lineWidth = pen === "erase" ? 22 : 3.2;
          g.beginPath(); g.arc(last[0], last[1], g.lineWidth / 2, 0, 7); g.fillStyle = g.strokeStyle; g.fill();
          function mv(ev) { var q = [(ev.clientX - r.left) * sx, (ev.clientY - r.top) * sy]; g.beginPath(); g.moveTo(last[0], last[1]); g.lineTo(q[0], q[1]); g.stroke(); last = q; }
          function up() { cv.removeEventListener("pointermove", mv); cv.removeEventListener("pointerup", up); p.img = cv.toDataURL("image/png"); save(); }
          cv.addEventListener("pointermove", mv); cv.addEventListener("pointerup", up);
        });
        el.querySelectorAll(".mv").forEach(function (b) { b.onclick = function () { var j = i + +b.dataset.d; if (j < 0 || j >= B.panels.length) return; B.panels.splice(j, 0, B.panels.splice(i, 1)[0]); save(); draw(); }; });
        el.querySelector(".x").onclick = function () { B.panels.splice(i, 1); save(); draw(); };
        sb.appendChild(el);
      });
    }
    body.querySelector("#sbadd").onclick = function () { B.panels.push({ id: uid(), img: null, caption: "", who: "", what: "", where: "" }); save(); draw(); };
    draw();
  };

  /* ---------- activity 30: sticky-note wall ---------- */
  var WALLCATS = [["worked", "#86d3b4"], ["not", "#f39237"], ["next", "#e6ee58"], ["who", "#6dbcdf"]];
  function wallCol(cat) { for (var i = 0; i < WALLCATS.length; i++) if (WALLCATS[i][0] === cat) return WALLCATS[i][1]; return "#fff"; }
  RENDER.wall = function (body, d, a) {
    var W = a.wall;
    if (!W) {
      W = a.wall = { notes: [] };
      if (a.fields) ["worked", "not", "next"].forEach(function (cat, f) { notesOf(30, f).forEach(function (tx, j) { W.notes.push({ id: uid(), cat: cat, text: tx, x: 6 + f * 30 + (j % 2) * 8, y: 8 + j * 16, r: (Math.random() * 4 - 2).toFixed(1) }); }); });
      save();
    }
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("wlHint") + '</p><div class="act-tools" style="margin-top:0">' + WALLCATS.map(function (wc) { return '<button type="button" class="fadd" data-cat="' + wc[0] + '" style="--q:' + wc[1] + '">+ ' + esc(t("wlCats")[wc[0]]) + "</button>"; }).join("") + '</div><div class="wall" id="wall"></div>';
    var wall = body.querySelector("#wall");
    function draw() {
      wall.innerHTML = "";
      W.notes.forEach(function (n, i) {
        var el = document.createElement("div"); el.className = "sticky"; fresh(el, n.id); el.style.left = n.x + "%"; el.style.top = n.y + "%"; el.style.setProperty("--sc", wallCol(n.cat)); el.style.setProperty("--rot", (n.r || 0) + "deg");
        el.innerHTML = '<div class="sticky-grip" title="' + esc(t("wlCats")[n.cat]) + '"><span>' + esc(t("wlCats")[n.cat]) + '</span><button class="x" type="button" aria-label="' + t("del") + '">×</button></div><textarea aria-label="' + esc(t("wlCats")[n.cat]) + '"></textarea>';
        var ta = el.querySelector("textarea"); ta.value = n.text; ta.oninput = function () { n.text = ta.value; save(); };
        el.querySelector(".x").onclick = function () { W.notes.splice(i, 1); save(); draw(); };
        var grip = el.querySelector(".sticky-grip"); grip.tabIndex = 0;
        grip.addEventListener("keydown", function (e) { var dx = { ArrowLeft: -2, ArrowRight: 2 }[e.key] || 0, dy = { ArrowUp: -3, ArrowDown: 3 }[e.key] || 0; if (dx || dy) { e.preventDefault(); n.x = Math.max(0, Math.min(86, n.x + dx)); n.y = Math.max(0, Math.min(84, n.y + dy)); el.style.left = n.x + "%"; el.style.top = n.y + "%"; save(); } });
        grip.addEventListener("pointerdown", function (e) {
          if (e.target.closest(".x")) return;
          e.preventDefault(); grip.setPointerCapture(e.pointerId); el.classList.add("dragging");
          var rect = wall.getBoundingClientRect(), ox = e.clientX - el.getBoundingClientRect().left, oy = e.clientY - el.getBoundingClientRect().top;
          function mv(ev) { n.x = Math.max(0, Math.min(86, (ev.clientX - ox - rect.left) / rect.width * 100)); n.y = Math.max(0, Math.min(84, (ev.clientY - oy - rect.top) / rect.height * 100)); el.style.left = n.x + "%"; el.style.top = n.y + "%"; }
          function up() { grip.removeEventListener("pointermove", mv); grip.removeEventListener("pointerup", up); el.classList.remove("dragging"); W.notes.push(W.notes.splice(W.notes.indexOf(n), 1)[0]); save(); draw(); }
          grip.addEventListener("pointermove", mv); grip.addEventListener("pointerup", up);
        });
        wall.appendChild(el);
      });
    }
    body.querySelectorAll("[data-cat]").forEach(function (b) { b.onclick = function () {
      var k = W.notes.length, ci = WALLCATS.findIndex(function (w) { return w[0] === b.dataset.cat; });
      W.notes.push({ id: uid(), cat: b.dataset.cat, text: "", x: 4 + ci * 23 + (k % 3) * 2, y: 6 + (k % 4) * 6, r: (Math.random() * 4 - 2).toFixed(1) }); save(); draw();
      var tas = wall.querySelectorAll("textarea"); tas[tas.length - 1].focus();
    }; });
    draw();
  };

  /* ---------- activity 32: mind map of possible factors ---------- */
  function mindSvg(M, forPrint) {
    var nodes = M.nodes, s = forPrint ? '<svg viewBox="0 0 160 100">' : "";
    nodes.forEach(function (n) { var p = nodes.find(function (q) { return q.id === n.parent; }); if (p) s += '<line x1="' + p.x * 1.6 + '" y1="' + p.y + '" x2="' + n.x * 1.6 + '" y2="' + n.y + '" stroke="#6dbcdf" stroke-width=".6"/>'; });
    if (forPrint) { nodes.forEach(function (n) { var w = Math.min(42, (n.text || "…").length * 1.5 + 5), root = !n.parent; s += '<g transform="translate(' + n.x * 1.6 + " " + n.y + ')"><rect x="' + -w / 2 + '" y="-3" width="' + w + '" height="6" rx="3" fill="' + (root ? "#e6ee58" : "#fff") + '" stroke="#202c51" stroke-width=".3"/><text y="1.1" text-anchor="middle" font-size="2.8" font-weight="' + (root ? 800 : 500) + '" fill="#202c51">' + esc((n.text || "…").slice(0, 28)) + "</text></g>"; }); s += "</svg>"; }
    return s;
  }
  RENDER.mind = function (body, d, a) {
    var M = a.mind;
    if (!M) {
      M = a.mind = { nodes: [{ id: "root", text: t("mmRoot"), x: 50, y: 50, parent: null, strategy: "" }] };
      if (a.fields) { var fs = notesOf(32, 0); fs.forEach(function (tx, i) { var an = i / Math.max(1, fs.length) * Math.PI * 2; M.nodes.push({ id: uid(), text: tx, x: 50 + Math.cos(an) * 28, y: 50 + Math.sin(an) * 34, parent: "root", strategy: "" }); }); M.nodes[0].strategy = notesOf(32, 2).join("\n"); }
      save();
    }
    var sel = "root";
    body.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("mmHint") + '</p><div class="ideas" id="mmideas" style="margin-bottom:10px"><span class="hint">' + t("pIdeas") + ':</span></div><div class="mm-wrap"><div class="mmstage" id="mms"></div><aside class="mm-side" id="mmside"></aside></div>';
    var stage = body.querySelector("#mms"), side = body.querySelector("#mmside");
    L(window.ADA_FACTORS).forEach(function (f) { var b = document.createElement("button"); b.type = "button"; b.className = "idea"; b.textContent = "+ " + f; b.onclick = function () { addChild(sel, f); }; body.querySelector("#mmideas").appendChild(b); });
    function node(id) { return M.nodes.find(function (n) { return n.id === id; }); }
    function depth(n) { var k = 0; while (n && n.parent) { n = node(n.parent); k++; } return k; }
    function addChild(pid, text) {
      var p = node(pid) || node("root"), kids = M.nodes.filter(function (n) { return n.parent === p.id; }).length;
      var base = p.parent ? Math.atan2(p.y - node(p.parent).y, (p.x - node(p.parent).x) * 1.6) : -Math.PI / 2, an = p.parent ? base + (kids % 2 ? 1 : -1) * (0.45 + Math.floor(kids / 2) * 0.45) : base + kids * 0.72;
      var rad = p.parent ? 16 : 30, n = { id: uid(), text: text || "", x: Math.max(6, Math.min(94, p.x + Math.cos(an) * rad / 1.6)), y: Math.max(6, Math.min(94, p.y + Math.sin(an) * rad)), parent: p.id, strategy: "" };
      M.nodes.push(n); sel = n.id; save(); draw(); if (!text) { var inp = stage.querySelector('[data-n="' + n.id + '"] input'); if (inp) inp.focus(); }
    }
    function drawLines() { var svg = stage.querySelector("svg"); if (svg) svg.innerHTML = mindSvg(M, false); }
    function draw() {
      stage.innerHTML = '<svg viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true"></svg>'; drawLines();
      M.nodes.forEach(function (n) {
        var el = document.createElement("div"), dp = depth(n); fresh(el, n.id); el.className = (FRESH[n.id] ? "fresh " : "") + "mnode d" + Math.min(dp, 2) + (sel === n.id ? " sel" : ""); el.dataset.n = n.id; el.style.left = n.x + "%"; el.style.top = n.y + "%";
        el.innerHTML = '<span class="grip">⠿</span><input aria-label="' + t("mmNode") + '" placeholder="…" size="' + Math.max(6, Math.min(24, (n.text || "").length + 1)) + '"><button type="button" class="plus" aria-label="' + t("mmAddChild") + '" title="' + t("mmAddChild") + '">+</button>';
        var inp = el.querySelector("input"); inp.value = n.text;
        inp.oninput = function () { n.text = inp.value; inp.size = Math.max(6, Math.min(24, inp.value.length + 1)); save(); drawSide(); };
        inp.onfocus = function () { if (sel !== n.id) { sel = n.id; stage.querySelectorAll(".mnode").forEach(function (x) { x.classList.toggle("sel", x.dataset.n === sel); }); drawSide(); } };
        el.querySelector(".plus").onclick = function () { addChild(n.id); };
        var gp = el.querySelector(".grip"); gp.tabIndex = 0; gp.setAttribute("role", "button"); gp.setAttribute("aria-label", t("spMove"));
        gp.addEventListener("keydown", function (e) { var dx = { ArrowLeft: -2, ArrowRight: 2 }[e.key] || 0, dy = { ArrowUp: -3, ArrowDown: 3 }[e.key] || 0; if (dx || dy) { e.preventDefault(); n.x = Math.max(4, Math.min(96, n.x + dx)); n.y = Math.max(4, Math.min(96, n.y + dy)); el.style.left = n.x + "%"; el.style.top = n.y + "%"; drawLines(); save(); } });
        el.addEventListener("pointerdown", function (e) {
          if (e.target.closest("input, button")) return;
          e.preventDefault(); el.setPointerCapture(e.pointerId); sel = n.id; stage.querySelectorAll(".mnode").forEach(function (x) { x.classList.toggle("sel", x.dataset.n === sel); }); drawSide();
          var rect = stage.getBoundingClientRect();
          function mv(ev) { n.x = Math.max(4, Math.min(96, (ev.clientX - rect.left) / rect.width * 100)); n.y = Math.max(4, Math.min(96, (ev.clientY - rect.top) / rect.height * 100)); el.style.left = n.x + "%"; el.style.top = n.y + "%"; drawLines(); }
          function up() { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up); save(); }
          el.addEventListener("pointermove", mv); el.addEventListener("pointerup", up);
        });
        stage.appendChild(el);
      });
      drawSide();
    }
    function drawSide() {
      var n = node(sel) || node("root");
      side.innerHTML = '<h3 class="caps" style="color:var(--c-blue)">' + esc(n.text || "…") + '</h3><label class="mini">' + t("mmStrategy") + '<textarea rows="5" id="mmstr"></textarea></label><div class="row" style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn small" type="button" id="mmchild">' + t("mmAddChild") + "</button>" + (n.parent ? '<button class="btn small ghost" type="button" id="mmdel">' + t("mmDelete") + "</button>" : "") + '</div><h3 class="caps" style="color:var(--c-blue);margin-top:14px">' + t("mmAll") + '</h3><ul class="mm-list">' + M.nodes.filter(function (x) { return x.parent; }).map(function (x) { return '<li class="' + (x.strategy ? "has" : "") + '"><button type="button" class="linkbtn" data-go="' + x.id + '">' + esc(x.text || "…") + "</button>" + (x.strategy ? " ✓" : "") + "</li>"; }).join("") + "</ul>";
      var ta = side.querySelector("#mmstr"); ta.value = n.strategy || ""; ta.oninput = function () { n.strategy = ta.value; save(); };
      side.querySelector("#mmchild").onclick = function () { addChild(n.id); };
      var del = side.querySelector("#mmdel"); if (del) del.onclick = function () { var kill = [n.id], ch = true; while (ch) { ch = false; M.nodes.forEach(function (x) { if (kill.indexOf(x.parent) > -1 && kill.indexOf(x.id) < 0) { kill.push(x.id); ch = true; } }); } M.nodes = M.nodes.filter(function (x) { return kill.indexOf(x.id) < 0; }); sel = n.parent; save(); draw(); };
      side.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { sel = b.dataset.go; draw(); var i = stage.querySelector('[data-n="' + sel + '"] input'); if (i) i.focus(); }; });
    }
    draw();
  };


  /* ---------- background on authentication ---------- */
  function renderBasics(goto) {
    var B = window.ADA_BASICS || [], refs = (window.ADA_BASICS_REFS || []).map(function (id) { return REFS.find(function (r) { return r.id === id; }); }).filter(Boolean).sort(refCmp);
    view.innerHTML = '<div class="basics"><p class="caps" style="color:var(--c-blue);margin:0"><a href="#start">← ' + t("start") + '</a></p><h1 style="color:var(--c-blue);font-weight:800">' + t("basicsTitle") + '</h1><p class="act-i">' + t("basicsIntro") + '</p><nav class="basics-toc" aria-label="' + t("basicsToc") + '"><ol>' + B.map(function (b) { return '<li><a href="#basics-' + b.id + '" data-go="b-' + b.id + '">' + esc(L(b.h)) + "</a></li>"; }).join("") + "</ol></nav>" +
      B.map(function (b) { return '<section class="panel basics-sec" id="b-' + b.id + '"><h2>' + esc(L(b.h)) + "</h2><p>" + esc(L(b.p)) + "</p>" + (b.list ? '<ul class="basics-list">' + b.list.map(function (x) { var tx = L(x), k = tx.search(/[–:]/); return "<li>" + (k > 0 && k < 40 ? "<b>" + esc(tx.slice(0, k).trim()) + "</b>" + (tx[k] === ":" ? "" : " ") + esc(tx.slice(k)) : esc(tx)) + "</li>"; }).join("") + "</ul>" : "") + "</section>"; }).join("") +
      (refs.length ? '<section class="panel"><h2>' + t("basicsRead") + '</h2><ul class="refs">' + refs.map(function (r) { return refLine(r); }).join("") + '</ul><p><a class="more-link" href="#literature">' + t("litAll") + " →</a></p></section>" : "") + "</div>";
    function jump(id, smooth) { var el = document.getElementById(id); if (el) { el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" }); el.tabIndex = -1; el.focus({ preventScroll: true }); el.classList.remove("hit"); void el.offsetWidth; el.classList.add("hit"); } }
    view.querySelectorAll("[data-go]").forEach(function (a) { a.onclick = function (e) { e.preventDefault(); jump(a.dataset.go, true); }; });
    if (goto) setTimeout(function () { jump("b-" + goto, false); }, 30);
  }

  /* ---------- share the tool (QR code) ---------- */
  function shareUrl() { var u = (window.ADA_ABOUT || {}).shareUrl; if (u) return u; return /^https?:/.test(location.href) ? location.href.split("#")[0] : ""; }
  function shareDialog() {
    var url = shareUrl(), qr = null;
    try { qr = qrcode(0, "M"); qr.addData(url); qr.make(); } catch (e) { qr = null; }
    openDlg("<h2>" + t("shTitle") + "</h2><p style='margin:0'>" + t("shP") + '</p><div class="sh-box">' + (qr ? '<div class="sh-qr" role="img" aria-label="' + esc(t("shQrAlt") + " " + url) + '">' + qr.createSvgTag({ cellSize: 6, margin: 3, scalable: true }) + "</div>" : "") + '<div class="sh-side"><label class="mini">' + t("shLink") + '<input class="team-in" id="shu" readonly value="' + esc(url) + '"></label><div class="row"><button class="btn primary" type="button" id="shc">' + t("shCopy") + '</button><button class="btn" type="button" id="shp">⤓ ' + t("shPng") + '</button></div><p class="hint" id="shm" role="status"></p><p class="hint">' + t("shNote") + '</p></div></div><div class="row"><span style="flex:1"></span><button class="btn" type="button" data-close>' + t("close") + "</button></div>");
    var msg = dlgBody.querySelector("#shm"), inp = dlgBody.querySelector("#shu");
    dlgBody.querySelector("#shc").onclick = function () { var ok = function () { msg.textContent = t("shCopied"); }; try { navigator.clipboard.writeText(url).then(ok, function () { inp.select(); msg.textContent = t("sCopyFail"); }); } catch (e) { inp.select(); msg.textContent = t("sCopyFail"); } };
    dlgBody.querySelector("#shp").onclick = function () {
      if (!qr) return; var n = qr.getModuleCount(), sc = 16, m = 4, cv = document.createElement("canvas"); cv.width = cv.height = (n + m * 2) * sc; var g = cv.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = "#202c51";
      for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (qr.isDark(r, c)) g.fillRect((c + m) * sc, (r + m) * sc, sc, sc);
      try { var a = document.createElement("a"); a.href = cv.toDataURL("image/png"); a.download = "authentication-design-activities-qr.png"; document.body.appendChild(a); a.click(); a.remove(); msg.textContent = t("shSaved"); } catch (e) { msg.textContent = t("sDlFail"); }
    };
  }
  /* ---------- about / imprint ---------- */
  function renderAbout() {
    var A = window.ADA_ABOUT || {}, im = A.impressum || {};
    var lines = [im.name, im.address, im.email ? '<a href="mailto:' + esc(im.email) + '">' + esc(im.email) + "</a>" : "", im.phone].filter(Boolean);
    view.innerHTML = '<h1 style="color:var(--c-blue);font-weight:800">' + t("about") + '</h1><div class="start-grid about-grid"><section class="panel"><h2>' + t("aboutTool") + "</h2><p>" + esc(L(A.context)) + "</p><p>" + t("aboutUse") + '</p><h3 class="caps" style="color:var(--c-blue);margin-top:14px">' + t("aboutCite") + '</h3><p class="cite-box">' + esc(L(A.cite)) + '</p></section><section class="panel"><h2>' + t("imprint") + "</h2>" + (lines.length ? "<p>" + lines.map(function (x) { return x.indexOf("<a ") === 0 ? x : esc(x); }).join("<br>") + "</p>" : "") + (im.responsible ? "<p>" + t("imprintResp") + ": " + esc(im.responsible) + "</p>" : "") + '<h3 class="caps" style="color:var(--c-blue);margin-top:14px">' + t("privacy") + "</h3><p>" + t("privacyText") + '</p></section><section class="panel" style="grid-column:1 / -1"><h2>' + t("a11yTitle") + "</h2><p>" + t("a11yText") + "</p></section></div>";
  }


  /* ---------- shared helpers for v5 ---------- */
  function groupList() { var a = S.project.acts[3]; if (a && a.groups) return a.groups.filter(function (g) { return g.title.trim(); }); return notesOf(3, 0).map(function (tx, i) { return { id: "n" + i, title: tx, roles: [], expertise: "", contact: "" }; }); }
  function groupTitles() { return groupList().map(function (g) { return g.title; }); }
  function conceptTitles() { var a = S.project.acts[16]; if (a && a.map) return a.map.sheets.map(function (s) { return s.name; }).filter(Boolean); return notesOf(16, 0); }
  function initials(s) { return (s || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase(); }
  var GCOL = ["#6dbcdf", "#86d3b4", "#e6ee58", "#f39237", "#1f4a9a", "#202c51"];

  /* ---------- activity 3: user group cards ---------- */
  RENDER.groups = function (body, d, a) {
    if (!a.groups) {
      a.groups = [];
      if (a.fields) { var t0 = notesOf(3, 0), n = Math.max(t0.length, notesOf(3, 1).length, notesOf(3, 2).length); for (var i = 0; i < n; i++) a.groups.push({ id: uid(), title: t0[i] || "", expertise: notesOf(3, 1)[i] || "", roles: notesOf(3, 2)[i] ? [notesOf(3, 2)[i]] : [], contact: notesOf(3, 3)[i] || "" }); }
      if (!a.groups.length) a.groups.push({ id: uid(), title: "", expertise: "", roles: [], contact: "" });
      save();
    }
    var roles = L(window.ADA_ROLES);
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("grHint")}</p><div class="act-tools" style="margin-top:0"><button class="btn small" type="button" id="gadd">${t("grAdd")}</button></div><div class="gcards" id="gc"></div>`;
    var gc = body.querySelector("#gc");
    function draw() {
      gc.innerHTML = "";
      a.groups.forEach(function (g, gi) {
        var el = document.createElement("article"); el.className = "gcard"; el.style.setProperty("--g", GCOL[gi % GCOL.length]); fresh(el, g.id);
        el.innerHTML = `<div class="g-top"><span class="avatar">${esc(initials(g.title))}</span><input class="g-title" data-k="title" placeholder="${t("grTitle")}" aria-label="${t("grTitle")}"><button class="x" type="button" aria-label="${t("del")}">×</button></div>
          <div class="mini">${esc(L(d.fields[2]))}<div class="rolechips">${roles.map(function (r) { return `<button type="button" data-r="${esc(r)}" aria-pressed="${g.roles.indexOf(r) > -1}">${esc(r)}</button>`; }).join("")}</div></div>
          <label class="mini">${esc(L(d.fields[1]))}<textarea data-k="expertise" rows="2"></textarea></label>
          <label class="mini">${esc(L(d.fields[3]))}<input data-k="contact"></label>`;
        el.querySelectorAll("[data-k]").forEach(function (inp) { inp.value = g[inp.dataset.k] || ""; inp.oninput = function () { g[inp.dataset.k] = inp.value; if (inp.dataset.k === "title") el.querySelector(".avatar").textContent = initials(inp.value); save(); }; });
        el.querySelectorAll("[data-r]").forEach(function (b) { b.onclick = function () { var i = g.roles.indexOf(b.dataset.r); if (i > -1) g.roles.splice(i, 1); else g.roles.push(b.dataset.r); b.setAttribute("aria-pressed", i < 0); save(); }; });
        el.querySelector(".x").onclick = function () { a.groups.splice(gi, 1); save(); draw(); };
        gc.appendChild(el);
      });
    }
    body.querySelector("#gadd").onclick = function () { a.groups.push({ id: uid(), title: "", expertise: "", roles: [], contact: "" }); save(); draw(); var ins = gc.querySelectorAll(".g-title"); ins[ins.length - 1].focus(); };
    draw();
  };

  /* ---------- activity 4: involving the groups ---------- */
  RENDER.involve = function (body, d, a) {
    var V = a.involve = a.involve || { byGroup: {} };
    var groups = groupList();
    var all = Object.keys(METHODS).filter(function (m) { return m !== "all"; }).sort(function (x, y) { return mName(x).localeCompare(mName(y)); });
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("ivHint")}</p>` + (groups.length ? "" : `<p class="warn">${t("ivNo3")} <a href="#activity-3">${t("activity")} 3 →</a></p>`) + `<div class="ivrows" id="iv"></div>`;
    var iv = body.querySelector("#iv");
    groups.forEach(function (g, gi) {
      var r = V.byGroup[g.id] = V.byGroup[g.id] || { purpose: "", methods: [], questions: "", give: "", level: 1 };
      var el = document.createElement("article"); el.className = "ivrow"; el.style.setProperty("--g", GCOL[gi % GCOL.length]);
      el.innerHTML = `<div class="iv-who"><span class="avatar">${esc(initials(g.title))}</span><b>${gi + 1}. ${esc(g.title)}</b><span class="hint">${esc(g.roles.join(", "))}</span>
          <div class="mini">${t("ivLevel")}<div class="ladder">${t("ivLevels").map(function (lv, li) { return `<button type="button" data-lv="${li}" aria-pressed="${r.level === li}" title="${esc(lv)}"><i></i><span>${esc(lv)}</span></button>`; }).join("")}</div></div></div>
        <label class="mini">${esc(L(d.fields[0]))}<textarea data-k="purpose" rows="3"></textarea></label>
        <div class="mini">${esc(L(d.fields[1]))}<div class="mpick"></div><select data-add aria-label="${t("ivAddMethod")}"><option value="">${t("ivAddMethod")}</option>${all.map(function (m) { return `<option value="${m}">${esc(mName(m))}</option>`; }).join("")}</select></div>
        <label class="mini">${esc(L(d.fields[2]))}<textarea data-k="questions" rows="3"></textarea></label>
        <label class="mini">${t("ivGive")}<input data-k="give"></label>`;
      el.querySelectorAll("[data-k]").forEach(function (inp) { inp.value = r[inp.dataset.k] || ""; inp.oninput = function () { r[inp.dataset.k] = inp.value; save(); }; });
      el.querySelectorAll("[data-lv]").forEach(function (b) { b.onclick = function () { r.level = +b.dataset.lv; el.querySelectorAll("[data-lv]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); save(); }; });
      var mp = el.querySelector(".mpick");
      function drawM() { mp.innerHTML = ""; r.methods.forEach(function (m, mi) { var c = document.createElement("span"); c.className = "chip"; c.innerHTML = esc(mName(m)) + `<button type="button" aria-label="${t("del")}">×</button>`; c.querySelector("button").onclick = function () { r.methods.splice(mi, 1); save(); drawM(); }; mp.appendChild(c); }); }
      el.querySelector("[data-add]").onchange = function (e) { if (e.target.value && r.methods.indexOf(e.target.value) < 0) { r.methods.push(e.target.value); save(); drawM(); } e.target.value = ""; };
      drawM();
      iv.appendChild(el);
    });
  };

  /* ---------- activity 18: perspective star ---------- */
  RENDER.star = function (body, d, a) {
    var ST = a.star;
    if (!ST) {
      ST = a.star = { concept: conceptTitles()[0] || "", persp: d.fields.map(function (f, i) { return { id: uid(), label: L(f), notes: notesOf(18, i).join("\n"), fit: 50 }; }) };
      save();
    }
    var sel = ST.persp[0] && ST.persp[0].id;
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("stHint")}</p><div class="star-wrap"><div class="starstage" id="sst"></div><aside class="mm-side" id="sside"></aside></div>`;
    var stage = body.querySelector("#sst"), side = body.querySelector("#sside");
    function pos(p, i) { var n = ST.persp.length, an = -Math.PI / 2 + i / n * Math.PI * 2, r = 22 + (100 - p.fit) / 100 * 24; return { x: 50 + Math.cos(an) * r, y: 50 + Math.sin(an) * r, ax: 50 + Math.cos(an) * 48, ay: 50 + Math.sin(an) * 48 }; }
    function draw() {
      var lines = "", rings = "";
      [0.33, 0.66, 1].forEach(function (k) { rings += `<circle cx="50" cy="50" r="${22 + k * 24}" fill="none" stroke="#b9ddd0" stroke-width=".3" stroke-dasharray="1 1.2"/>`; });
      ST.persp.forEach(function (p, i) { var q = pos(p, i); lines += `<line x1="50" y1="50" x2="${q.ax}" y2="${q.ay}" stroke="#6dbcdf" stroke-width=".5"/>`; });
      stage.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${rings}${lines}</svg><div class="star-centre"><input aria-label="${t("stConcept")}" placeholder="${t("stConcept")}"></div><span class="star-legend">${t("stCloser")}</span>`;
      var ci = stage.querySelector(".star-centre input"); ci.value = ST.concept; ci.oninput = function () { ST.concept = ci.value; save(); };
      ST.persp.forEach(function (p, i) {
        var q = pos(p, i), b = document.createElement("button"); b.type = "button"; b.className = "pbubble" + (sel === p.id ? " sel" : ""); fresh(b, p.id);
        b.style.left = q.x + "%"; b.style.top = q.y + "%"; b.style.setProperty("--g", GCOL[i % GCOL.length]);
        b.innerHTML = `<span class="avatar">${esc(initials(p.label))}</span><span>${esc(p.label || "…")}</span>`;
        b.onclick = function () { sel = p.id; draw(); };
        stage.appendChild(b);
      });
      drawSide();
    }
    function drawSide() {
      var p = ST.persp.find(function (x) { return x.id === sel; });
      side.innerHTML = (p ? `<label class="mini">${t("stPersp")}<input id="spl" class="team-in"></label><label class="mini">${t("stFit")}<input type="range" min="0" max="100" id="sfit" class="fit"><span class="fit-scale"><span>${t("stFitLow")}</span><span>${t("stFitHigh")}</span></span></label><label class="mini">${t("stNotes")}<textarea rows="6" id="snotes"></textarea></label><button class="btn small ghost" type="button" id="sdel">${t("del")}</button>` : "") + `<button class="btn small" type="button" id="sadd">${t("stAdd")}</button>`;
      if (p) {
        var pl = side.querySelector("#spl"); pl.value = p.label; pl.oninput = function () { p.label = pl.value; save(); var b = stage.querySelectorAll(".pbubble")[ST.persp.indexOf(p)]; if (b) { b.lastChild.textContent = p.label || "…"; b.firstChild.textContent = initials(p.label); } };
        var fit = side.querySelector("#sfit"); fit.value = p.fit; fit.oninput = function () { p.fit = +fit.value; save(); var i = ST.persp.indexOf(p), q = pos(p, i), b = stage.querySelectorAll(".pbubble")[i]; b.style.left = q.x + "%"; b.style.top = q.y + "%"; };
        var nt = side.querySelector("#snotes"); nt.value = p.notes; nt.oninput = function () { p.notes = nt.value; save(); };
        side.querySelector("#sdel").onclick = function () { ST.persp.splice(ST.persp.indexOf(p), 1); sel = ST.persp[0] && ST.persp[0].id; save(); draw(); };
      }
      side.querySelector("#sadd").onclick = function () { var n = { id: uid(), label: "", notes: "", fit: 50 }; ST.persp.push(n); sel = n.id; save(); draw(); side.querySelector("#spl").focus(); };
    }
    draw();
  };

  /* ---------- activity 19: service blueprint with line of visibility ---------- */
  RENDER.blueprint = function (body, d, a) {
    var BP = a.blueprint;
    if (!BP) {
      BP = a.blueprint = { steps: [] };
      var tps = touchPoints();
      (tps.length ? tps : [{ id: "", label: "" }]).forEach(function (s, i) { BP.steps.push({ id: uid(), label: s.label, tp: s.id, cells: { 0: "", 1: i === 0 ? notesOf(19, 0).join("\n") : "", 2: i === 0 ? notesOf(19, 1).join("\n") : "", 3: "" } }); });
      save();
    }
    var rows = t("bpRows");
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("bpHint")}</p><div class="act-tools" style="margin-top:0"><button class="btn small" type="button" id="bpadd">${t("bpAdd")}</button><button class="btn small ghost" type="button" id="bpimp">${t("sigImport")}</button></div><div class="bp-scroll"><div class="bp" id="bp"></div></div>`;
    var bp = body.querySelector("#bp");
    function draw() {
      bp.style.gridTemplateColumns = "150px repeat(" + BP.steps.length + ", minmax(190px, 1fr))";
      bp.innerHTML = '<div class="bp-h"></div>';
      BP.steps.forEach(function (s, i) {
        var h = document.createElement("div"); h.className = "bp-h"; fresh(h, s.id);
        h.innerHTML = `<span class="fnum" style="--q:var(--c-blue)">${i + 1}</span><input aria-label="${t("step")} ${i + 1}" placeholder="${t("newStep")}"><button class="x" type="button" aria-label="${t("del")}">×</button>`;
        var inp = h.querySelector("input"); inp.value = s.label; inp.oninput = function () { s.label = inp.value; save(); };
        h.querySelector(".x").onclick = function () { BP.steps.splice(i, 1); save(); draw(); };
        bp.appendChild(h);
      });
      rows.forEach(function (r, ri) {
        if (ri === 2) { var line = document.createElement("div"); line.className = "bp-line"; line.style.gridColumn = "1 / -1"; line.innerHTML = `<span>${t("bpLine")}</span>`; bp.appendChild(line); }
        var lab = document.createElement("div"); lab.className = "bp-lab" + (ri < 2 ? " out" : " in"); lab.innerHTML = `<b>${esc(r[0])}</b><span>${esc(r[1])}</span>`; bp.appendChild(lab);
        BP.steps.forEach(function (s) {
          var c = document.createElement("textarea"); c.className = "bp-cell" + (ri < 2 ? " out" : " in"); c.rows = 3; c.value = s.cells[ri] || ""; c.setAttribute("aria-label", r[0] + " – " + (s.label || ""));
          c.oninput = function () { s.cells[ri] = c.value; save(); }; bp.appendChild(c);
        });
      });
    }
    body.querySelector("#bpadd").onclick = function () { BP.steps.push({ id: uid(), label: "", tp: "", cells: {} }); save(); draw(); };
    body.querySelector("#bpimp").onclick = function () { var have = BP.steps.map(function (s) { return s.tp; }), add = touchPoints().filter(function (s) { return have.indexOf(s.id) < 0; }); if (!add.length) { toast(t("noTps")); return; } add.forEach(function (s) { BP.steps.push({ id: uid(), label: s.label, tp: s.id, cells: {} }); }); save(); draw(); };
    draw();
  };

  /* ---------- activity 23: pattern hexagons ---------- */
  RENDER.patterns = function (body, d, a) {
    var P = a.patterns;
    if (!P) {
      P = a.patterns = { list: d.fields.map(function (f, i) { var tx = notesOf(23, i).join("\n"); return { id: uid(), label: L(f), on: !!tx, text: tx, tp: "", elements: "" }; }) };
      save();
    }
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("ptHint")}</p><div class="hexes" id="hx"></div><div class="rcards" id="pd" style="margin-top:16px"></div>`;
    var hx = body.querySelector("#hx"), pd = body.querySelector("#pd");
    function draw() {
      hx.innerHTML = "";
      P.list.forEach(function (p, i) {
        var h = document.createElement("button"); h.type = "button"; h.className = "hex" + (p.on ? " on" : ""); h.setAttribute("aria-pressed", p.on); h.style.setProperty("--g", GCOL[i % GCOL.length]); fresh(h, p.id);
        h.innerHTML = `<span>${esc(p.label || "…")}</span>`; h.onclick = function () { p.on = !p.on; save(); draw(); };
        hx.appendChild(h);
      });
      var add = document.createElement("button"); add.type = "button"; add.className = "hex add"; add.innerHTML = `<span>${t("ptOwn")}</span>`;
      add.onclick = function () { P.list.push({ id: uid(), label: "", on: true, text: "", tp: "", elements: "" }); save(); draw(); var ins = pd.querySelectorAll(".rc-obj"); ins[ins.length - 1].focus(); };
      hx.appendChild(add);
      pd.innerHTML = P.list.some(function (p) { return p.on; }) ? "" : `<p class="hint">${t("ptNone")}</p>`;
      var tps = touchPoints();
      P.list.forEach(function (p, i) {
        if (!p.on) return;
        var el = document.createElement("article"); el.className = "rcard"; el.style.borderTopColor = GCOL[i % GCOL.length]; fresh(el, p.id);
        el.innerHTML = `<div class="rc-top"><input class="rc-obj" aria-label="${t("ptName")}" placeholder="${t("ptName")}"><button class="x" type="button" aria-label="${t("del")}">×</button></div><label class="mini">${t("ptDetails")}<textarea rows="3" data-k="text"></textarea></label><label class="mini">${t("ptElements")}<textarea rows="2" data-k="elements"></textarea></label><label class="mini">${t("mWhere")}<select data-k="tp"><option value="">${t("mNoTp")}</option>${tps.map(function (s, k) { return `<option value="${s.id}"${p.tp === s.id ? " selected" : ""}>${k + 1}. ${esc(s.label || "…")}</option>`; }).join("")}</select></label>`;
        var nm = el.querySelector(".rc-obj"); nm.value = p.label; nm.oninput = function () { p.label = nm.value; save(); var hh = hx.children[i]; if (hh) hh.firstChild.textContent = p.label || "…"; };
        el.querySelectorAll("[data-k]").forEach(function (inp) { if (inp.tagName !== "SELECT") inp.value = p[inp.dataset.k] || ""; inp.oninput = inp.onchange = function () { p[inp.dataset.k] = inp.value; save(); }; });
        el.querySelector(".x").onclick = function () { if (i < d.fields.length) { p.on = false; } else P.list.splice(i, 1); save(); draw(); };
        pd.appendChild(el);
      });
    }
    draw();
  };

  /* ---------- activity 25: preparation chain ---------- */
  RENDER.prep = function (body, d, a) {
    var PR = a.prep;
    if (!PR) {
      PR = a.prep = { steps: notesOf(25, 0).map(function (tx) { return { id: uid(), text: tx, kind: "must" }; }).concat(notesOf(25, 1).map(function (tx) { return { id: uid(), text: tx, kind: "ritual" }; })), manual: notesOf(25, 2).join("\n") };
      save();
    }
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("prHint")}</p><div class="act-tools" style="margin-top:0"><button type="button" class="fadd" data-k="must" style="--q:#1f4a9a">+ ${t("prKinds").must}</button><button type="button" class="fadd" data-k="ritual" style="--q:#f39237">+ ${t("prKinds").ritual}</button></div><div class="chain" id="ch"></div><label class="mini" style="margin-top:14px;display:flex">${t("prManual")}<textarea id="prm" rows="4" class="team-in"></textarea></label>`;
    var ch = body.querySelector("#ch");
    var m = body.querySelector("#prm"); m.value = PR.manual || ""; m.oninput = function () { PR.manual = m.value; save(); };
    function draw() {
      ch.innerHTML = `<div class="ch-end start"><span>${t("prStart")}</span></div>`;
      PR.steps.forEach(function (s, i) {
        var ar = document.createElement("span"); ar.className = "farrow"; ar.textContent = "→"; ch.appendChild(ar);
        var c = document.createElement("div"); c.className = "fstep prstep " + s.kind; c.style.setProperty("--q", s.kind === "ritual" ? "#f39237" : "#1f4a9a"); fresh(c, s.id);
        c.innerHTML = `<div class="fhead"><span class="fnum">${i + 1}</span><select aria-label="${t("flType")}">${["must", "ritual"].map(function (k) { return `<option value="${k}"${k === s.kind ? " selected" : ""}>${esc(t("prKinds")[k])}</option>`; }).join("")}</select><button type="button" class="mv" data-d="-1" aria-label="${t("mvBack")}">‹</button><button type="button" class="mv" data-d="1" aria-label="${t("mvFwd")}">›</button><button class="x" type="button" aria-label="${t("del")}">×</button></div><textarea rows="3" aria-label="${t("step")} ${i + 1}"></textarea>`;
        var ta = c.querySelector("textarea"); ta.value = s.text; ta.oninput = function () { s.text = ta.value; save(); };
        c.querySelector("select").onchange = function (e) { s.kind = e.target.value; save(); draw(); };
        c.querySelectorAll(".mv").forEach(function (b) { b.onclick = function () { var j = i + +b.dataset.d; if (j < 0 || j >= PR.steps.length) return; PR.steps.splice(j, 0, PR.steps.splice(i, 1)[0]); save(); draw(); }; });
        c.querySelector(".x").onclick = function () { PR.steps.splice(i, 1); save(); draw(); };
        ch.appendChild(c);
      });
      var ar2 = document.createElement("span"); ar2.className = "farrow"; ar2.textContent = "→"; ch.appendChild(ar2);
      var end = document.createElement("div"); end.className = "ch-end"; end.innerHTML = `<span>${t("prEnd")}</span>`; ch.appendChild(end);
    }
    body.querySelectorAll(".fadd").forEach(function (b) { b.onclick = function () { PR.steps.push({ id: uid(), text: "", kind: b.dataset.k }); save(); draw(); var tas = ch.querySelectorAll("textarea"); tas[tas.length - 1].focus(); }; });
    draw();
  };

  /* ---------- activity 29: IT infrastructure diagram ---------- */
  function ico(p) { return '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>"; }
  var INFRA = { user: ico('<circle cx="10" cy="6.5" r="3.2"/><path d="M3.5 17c.8-3.6 3.4-5.4 6.5-5.4s5.7 1.8 6.5 5.4"/>'), device: ico('<rect x="5" y="2.5" width="10" height="15" rx="2"/><path d="M9 15h2"/>'), authenticator: ico('<circle cx="6.5" cy="10" r="3.5"/><path d="M10 10h7.5M15 10v3M17.5 10v2"/>'), server: ico('<rect x="3" y="3" width="14" height="5.5" rx="1"/><rect x="3" y="11.5" width="14" height="5.5" rx="1"/><path d="M6 5.8h.01M6 14.3h.01"/>'), cloud: ico('<path d="M6 15.5h8.5a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 5.3 9 3.3 3.3 0 0 0 6 15.5z"/>'), database: ico('<ellipse cx="10" cy="4.8" rx="6" ry="2.3"/><path d="M4 4.8v10.4c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3V4.8M4 10c0 1.3 2.7 2.3 6 2.3s6-1 6-2.3"/>'), service: ico('<circle cx="10" cy="10" r="2.6"/><path d="M10 2.5v2.2M10 15.3v2.2M2.5 10h2.2M15.3 10h2.2M4.7 4.7l1.6 1.6M13.7 13.7l1.6 1.6M4.7 15.3l1.6-1.6M13.7 6.3l1.6-1.6"/>') };
  function infraSvg(I, forPrint) {
    var s = forPrint ? '<svg viewBox="0 0 160 100">' : "";
    I.links.forEach(function (l) { var p = I.nodes.find(function (n) { return n.id === l[0]; }), q = I.nodes.find(function (n) { return n.id === l[1]; }); if (p && q) s += `<line x1="${p.x * 1.6}" y1="${p.y}" x2="${q.x * 1.6}" y2="${q.y}" stroke="${l[2] ? "#f39237" : "#1f4a9a"}" stroke-width="${l[2] ? 1 : .6}" ${l[2] ? 'stroke-dasharray="2 1.2"' : ""}/>`; });
    if (forPrint) { I.nodes.forEach(function (n) { s += `<g transform="translate(${n.x * 1.6} ${n.y})"><rect x="-13" y="-5" width="26" height="10" rx="2" fill="#fff" stroke="${n.risk ? "#f39237" : "#202c51"}" stroke-width="${n.risk ? .8 : .3}"/><text y="1" text-anchor="middle" font-size="3" fill="#202c51">${esc((n.label || t("ifTypes")[n.type]).slice(0, 18))}</text>${n.risk ? '<text x="11" y="-2" font-size="4" fill="#f39237">!</text>' : ""}</g>`; }); s += "</svg>"; }
    return s;
  }
  RENDER.infra = function (body, d, a) {
    var I = a.infra;
    if (!I) {
      I = a.infra = { nodes: [], links: [] };
      var c0 = notesOf(29, 0); c0.forEach(function (tx, i) { I.nodes.push({ id: uid(), type: "service", label: tx, x: 15 + (i % 4) * 22, y: 25 + Math.floor(i / 4) * 30, risk: false, riskText: "", fix: "" }); });
      if (!I.nodes.length) { I.nodes.push({ id: uid(), type: "user", label: "", x: 12, y: 50, risk: false, riskText: "", fix: "" }, { id: uid(), type: "device", label: "", x: 38, y: 50, risk: false, riskText: "", fix: "" }, { id: uid(), type: "server", label: "", x: 64, y: 50, risk: false, riskText: "", fix: "" }, { id: uid(), type: "database", label: notesOf(29, 1).join(", "), x: 88, y: 50, risk: false, riskText: notesOf(29, 2).join("\n"), fix: notesOf(29, 3).join("\n") }); I.links.push([I.nodes[0].id, I.nodes[1].id, false], [I.nodes[1].id, I.nodes[2].id, false], [I.nodes[2].id, I.nodes[3].id, false]); }
      save();
    }
    var sel = null, mode = "move", first = null;
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("ifHint")}</p><div class="act-tools" style="margin-top:0"><div class="seg" role="group"><button type="button" data-mode="move">${t("spMove")}</button><button type="button" data-mode="link">${t("spLink")}</button></div><span class="fpal">${Object.keys(INFRA).map(function (k) { return `<button type="button" class="fadd ifadd" data-ty="${k}" style="--q:#6dbcdf">${INFRA[k]} ${esc(t("ifTypes")[k])}</button>`; }).join("")}</span></div><div class="mm-wrap"><div class="mmstage infra" id="ifs"></div><aside class="mm-side" id="ifside"></aside></div>`;
    var stage = body.querySelector("#ifs"), side = body.querySelector("#ifside");
    function node(id) { return I.nodes.find(function (n) { return n.id === id; }); }
    function drawLines() { var svg = stage.querySelector("svg"); if (svg) svg.innerHTML = infraSvg(I, false); }
    function draw() {
      stage.innerHTML = '<svg viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true"></svg>'; drawLines();
      I.nodes.forEach(function (n) {
        var el = document.createElement("div"); el.className = "inode" + (sel === n.id ? " sel" : "") + (n.risk ? " risk" : "") + (first === n.id ? " picked" : ""); el.style.left = n.x + "%"; el.style.top = n.y + "%"; el.tabIndex = 0; fresh(el, n.id);
        el.innerHTML = `<span class="ic" aria-hidden="true">${INFRA[n.type] || "•"}</span><span class="il">${esc(n.label || t("ifTypes")[n.type])}</span>${n.risk ? '<span class="rk" aria-label="risk">!</span>' : ""}`;
        el.addEventListener("pointerdown", function (e) {
          e.preventDefault();
          if (mode === "link") { if (!first) { first = n.id; draw(); return; } if (first !== n.id && !I.links.some(function (l) { return (l[0] === first && l[1] === n.id) || (l[1] === first && l[0] === n.id); })) I.links.push([first, n.id, false]); first = null; save(); draw(); return; }
          sel = n.id; stage.querySelectorAll(".inode").forEach(function (x) { x.classList.remove("sel"); }); el.classList.add("sel"); drawSide();
          el.setPointerCapture(e.pointerId); var rect = stage.getBoundingClientRect();
          function mv(ev) { n.x = Math.max(6, Math.min(94, (ev.clientX - rect.left) / rect.width * 100)); n.y = Math.max(6, Math.min(94, (ev.clientY - rect.top) / rect.height * 100)); el.style.left = n.x + "%"; el.style.top = n.y + "%"; drawLines(); }
          function up() { el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up); save(); }
          el.addEventListener("pointermove", mv); el.addEventListener("pointerup", up);
        });
        el.addEventListener("keydown", function (e) { var dx = { ArrowLeft: -2, ArrowRight: 2 }[e.key] || 0, dy = { ArrowUp: -3, ArrowDown: 3 }[e.key] || 0; if (dx || dy) { e.preventDefault(); n.x = Math.max(6, Math.min(94, n.x + dx)); n.y = Math.max(6, Math.min(94, n.y + dy)); el.style.left = n.x + "%"; el.style.top = n.y + "%"; drawLines(); save(); } if (e.key === "Enter") { sel = n.id; draw(); } });
        stage.appendChild(el);
      });
      drawSide();
    }
    function drawSide() {
      var n = node(sel);
      if (!n) { side.innerHTML = `<p class="hint" style="margin:0">${t("ifSelect")}</p>` + linkList(); bindLinks(); return; }
      side.innerHTML = `<label class="mini">${t("ifLabel")}<input id="ifl" class="team-in"></label><label class="mini">${t("ifType")}<select id="ift">${Object.keys(INFRA).map(function (k) { return `<option value="${k}"${n.type === k ? " selected" : ""}>${esc(t("ifTypes")[k])}</option>`; }).join("")}</select></label><label class="btn small"><input type="checkbox" id="ifr"${n.risk ? " checked" : ""}> ${t("ifRisk")}</label><label class="mini">${esc(L(d.fields[2]))}<textarea rows="3" id="ifrt"></textarea></label><label class="mini">${esc(L(d.fields[3]))}<textarea rows="3" id="iff"></textarea></label><button class="btn small ghost" type="button" id="ifdel">${t("del")}</button>` + linkList();
      var l = side.querySelector("#ifl"); l.value = n.label; l.oninput = function () { n.label = l.value; save(); var e = stage.querySelector(".inode.sel .il"); if (e) e.textContent = n.label || t("ifTypes")[n.type]; };
      side.querySelector("#ift").onchange = function (e) { n.type = e.target.value; save(); draw(); };
      side.querySelector("#ifr").onchange = function (e) { n.risk = e.target.checked; save(); draw(); };
      var rt = side.querySelector("#ifrt"); rt.value = n.riskText || ""; rt.oninput = function () { n.riskText = rt.value; save(); };
      var fx = side.querySelector("#iff"); fx.value = n.fix || ""; fx.oninput = function () { n.fix = fx.value; save(); };
      side.querySelector("#ifdel").onclick = function () { I.nodes = I.nodes.filter(function (x) { return x !== n; }); I.links = I.links.filter(function (k) { return k[0] !== n.id && k[1] !== n.id; }); sel = null; save(); draw(); };
      bindLinks();
    }
    function linkList() { return `<h3 class="caps" style="color:var(--c-blue);margin-top:12px">${t("spLinks")}</h3>` + (I.links.length ? I.links.map(function (k, i) { var p = node(k[0]), q = node(k[1]); return p && q ? `<div class="mrow"><span class="mk">${esc((p.label || t("ifTypes")[p.type]).slice(0, 12))} – ${esc((q.label || t("ifTypes")[q.type]).slice(0, 12))}</span><label class="hint"><input type="checkbox" data-lr="${i}"${k[2] ? " checked" : ""}> ${t("ifWeak")}</label><button class="x" type="button" data-ld="${i}" aria-label="${t("del")}">×</button></div>` : ""; }).join("") : `<p class="hint" style="margin:0">${t("spNoLinks")}</p>`); }
    function bindLinks() { side.querySelectorAll("[data-lr]").forEach(function (c) { c.onchange = function () { I.links[+c.dataset.lr][2] = c.checked; save(); drawLines(); }; }); side.querySelectorAll("[data-ld]").forEach(function (b) { b.onclick = function () { I.links.splice(+b.dataset.ld, 1); save(); draw(); }; }); }
    function setMode() { body.querySelectorAll("[data-mode]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === mode); }); }
    body.querySelectorAll("[data-mode]").forEach(function (b) { b.onclick = function () { mode = b.dataset.mode; first = null; setMode(); draw(); }; });
    body.querySelectorAll("[data-ty]").forEach(function (b) { b.onclick = function () { var k = I.nodes.length, n = { id: uid(), type: b.dataset.ty, label: "", x: 14 + (k * 17) % 74, y: 20 + (k % 3) * 28, risk: false, riskText: "", fix: "" }; I.nodes.push(n); sel = n.id; save(); draw(); side.querySelector("#ifl").focus(); }; });
    setMode(); draw();
  };

  /* ---------- activity 31: iteration loops ---------- */
  RENDER.loops = function (body, d, a) {
    var IT = a.iter;
    if (!IT) {
      IT = a.iter = { versions: [] };
      var n0 = notesOf(31, 0), n = Math.max(n0.length, notesOf(31, 1).length, notesOf(31, 2).length, 1);
      for (var i = 0; i < n; i++) IT.versions.push({ id: uid(), name: n0[i] || "", feedback: notesOf(31, 1)[i] || "", changes: notesOf(31, 2)[i] || "", met: [] });
      save();
    }
    var sel = IT.versions[IT.versions.length - 1].id;
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("itHint")}</p><div class="loops" id="lp"></div><div id="ld"></div>`;
    var lp = body.querySelector("#lp"), ld = body.querySelector("#ld");
    function reqs() { return reqRows().filter(function (r) { return r.req; }); }
    function draw() {
      lp.innerHTML = "";
      var R = reqs();
      IT.versions.forEach(function (v, i) {
        var met = R.length ? v.met.filter(function (id) { return R.some(function (r) { return r.id === id; }); }).length / R.length : 0;
        var b = document.createElement("button"); b.type = "button"; b.className = "loop" + (sel === v.id ? " sel" : ""); fresh(b, v.id);
        b.style.setProperty("--met", Math.round(met * 360) + "deg");
        b.innerHTML = `<span class="lv">v${i + 1}</span><span class="ln">${esc(v.name || "…")}</span>${R.length ? `<span class="lm">${Math.round(met * 100)}%</span>` : ""}`;
        b.onclick = function () { sel = v.id; draw(); };
        lp.appendChild(b);
      });
      var add = document.createElement("button"); add.type = "button"; add.className = "loop add"; add.innerHTML = `<span class="lv">+</span><span class="ln">${t("itNext")}</span>`;
      add.onclick = function () { var prev = IT.versions[IT.versions.length - 1]; var nv = { id: uid(), name: "", feedback: "", changes: "", met: prev ? prev.met.slice() : [] }; IT.versions.push(nv); sel = nv.id; save(); draw(); ld.querySelector("[data-k=name]").focus(); };
      lp.appendChild(add);
      drawDetail();
    }
    function drawDetail() {
      var v = IT.versions.find(function (x) { return x.id === sel; }), i = IT.versions.indexOf(v), R = reqs();
      ld.innerHTML = `<article class="it-card"><div class="rc-top"><span class="fnum" style="--q:var(--c-orange)">v${i + 1}</span><input data-k="name" class="rc-obj" placeholder="${esc(L(d.fields[0]))}" aria-label="${esc(L(d.fields[0]))}">${IT.versions.length > 1 ? `<button class="x" type="button" aria-label="${t("del")}">×</button>` : ""}</div><div class="it-grid"><label class="mini">${esc(L(d.fields[1]))}<textarea data-k="feedback" rows="4"></textarea></label><label class="mini">${esc(L(d.fields[2]))}<textarea data-k="changes" rows="4"></textarea></label><div class="mini">${t("itMet")}${R.length ? `<div class="metlist">${R.map(function (r) { return `<label><input type="checkbox" data-r="${r.id}"${v.met.indexOf(r.id) > -1 ? " checked" : ""}> ${esc(r.req)}${r.prio ? ` <span class="hint">(${esc(t("rqPrios")[r.prio])})</span>` : ""}</label>`; }).join("")}</div>` : `<p class="hint" style="margin:4px 0 0;text-transform:none;letter-spacing:0;font-weight:400">${t("itNo13")} <a href="#activity-13">${t("activity")} 13 →</a></p>`}</div></div></article>`;
      ld.querySelectorAll("[data-k]").forEach(function (inp) { inp.value = v[inp.dataset.k] || ""; inp.oninput = function () { v[inp.dataset.k] = inp.value; save(); if (inp.dataset.k === "name") { var l = lp.children[i]; if (l) l.querySelector(".ln").textContent = v.name || "…"; } }; });
      ld.querySelectorAll("[data-r]").forEach(function (c) { c.onchange = function () { var k = v.met.indexOf(c.dataset.r); if (c.checked && k < 0) v.met.push(c.dataset.r); if (!c.checked && k > -1) v.met.splice(k, 1); save(); var R2 = reqs(), met = v.met.filter(function (id) { return R2.some(function (r) { return r.id === id; }); }).length / R2.length, l = lp.children[i]; l.style.setProperty("--met", Math.round(met * 360) + "deg"); l.querySelector(".lm").textContent = Math.round(met * 100) + "%"; }; });
      var x = ld.querySelector(".x"); if (x) x.onclick = function () { IT.versions.splice(i, 1); sel = IT.versions[IT.versions.length - 1].id; save(); draw(); };
    }
    draw();
  };


  /* ---------- v6: activity 8 geometry, close to the printed page ---------- */
  var CLOUD = [[64.0, 27.0, 17], [89.9, 31.8, 17], [105.8, 44.3, 17], [105.8, 59.7, 17], [89.9, 72.2, 17], [64.0, 77.0, 17], [38.1, 72.2, 17], [22.2, 59.7, 17], [22.2, 44.3, 17], [38.1, 31.8, 17], [42, 52, 24], [64, 52, 27], [86, 52, 24]];
  var ASQ = [[115.6, 15.6], [166, 3], [182.8, 50.6], [132.4, 63.2]], APE = [[84, 58], [119, 30], [154, 60], [139, 96], [98, 96]], ACI = [161, 64, 31];
  function inPoly(x, y, P) { var c = false; for (var i = 0, j = P.length - 1; i < P.length; j = i++) { if (((P[i][1] > y) !== (P[j][1] > y)) && (x < (P[j][0] - P[i][0]) * (y - P[i][1]) / (P[j][1] - P[i][1]) + P[i][0])) c = !c; } return c; }
  function inCloud(X, Y) { return CLOUD.some(function (c) { return Math.hypot(X - c[0], Y - c[1]) <= c[2]; }); }
  function inObject(X, Y) { return inPoly(X, Y, ASQ) || inPoly(X, Y, APE) || Math.hypot(X - ACI[0], Y - ACI[1]) <= ACI[2]; }
  function sphereRegionXY(px, py) {
    var X = px * 2, Y = py, c = inCloud(X, Y), o = inObject(X, Y);
    if (c && o) return 1;
    if (c) return 0;
    if (o) return 2;
    return X < 110 ? 0 : 2;
  }
  var sphereSvgN = 0;
  function sphereSvgV6(labels) {
    var id = "spc" + (++sphereSvgN);
    var p = function (P) { return P.map(function (q) { return q.join(","); }).join(" "); };
    var cloud = CLOUD.map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/>'; }).join("");
    var obj = '<polygon points="' + p(ASQ) + '"/><polygon points="' + p(APE) + '"/><circle cx="' + ACI[0] + '" cy="' + ACI[1] + '" r="' + ACI[2] + '"/>';
    return '<svg viewBox="0 0 200 100" aria-hidden="true"><defs><clipPath id="' + id + '">' + cloud + "</clipPath></defs>" +
      '<g class="sp-cloud" fill="#bfe3f3">' + cloud + "</g>" +
      '<g class="sp-obj" fill="#b6e5d2">' + obj + "</g>" +
      '<g class="sp-hyb" fill="#e6ee58" clip-path="url(#' + id + ')">' + obj + "</g>" +
      (labels ? '<text x="50" y="47" text-anchor="middle" font-size="3.8" font-weight="800" fill="#1f4a9a">' + esc(labels[0]) + '</text><text x="111" y="49" text-anchor="middle" font-size="3.4" font-weight="800" fill="#202c51">' + esc(labels[1]) + '</text><text x="162" y="46" text-anchor="middle" font-size="3.8" font-weight="800" fill="#1d6b4f">' + esc(labels[2]) + "</text>" : "") + "</svg>";
  }
  var SPHERE_HOME = [[20, 62], [55, 63], [80, 70]];

  /* ---------- v6: rename & duplicate bubbles (names stay unique) ---------- */
  function norm(s) { return String(s || "").trim().toLowerCase(); }
  function uniqueName(base, scope) {
    var stem = String(base).replace(/\s+\d+$/, ""), n = 2, name = stem + " " + n;
    while (scope.some(function (x) { return norm(x.text) === norm(name); })) { n++; name = stem + " " + n; }
    return name;
  }
  function nameTaken(v, it, scope) { return scope.some(function (x) { return x !== it && norm(x.text) === norm(v); }); }
  function chipKit(el, it, o) {
    el.dataset.cid = it.id;
    el.setAttribute("aria-label", it.text);
    el.setAttribute("aria-describedby", "chipHelp");
    el.innerHTML = '<span class="cl">' + esc(it.text) + '</span><span class="ck"><button type="button" data-a="ren" aria-label="' + t("rename") + '" title="' + t("rename") + ' (F2)">✎</button><button type="button" data-a="dup" aria-label="' + t("duplicate") + '" title="' + t("duplicate") + ' (Ctrl+D)">⧉</button><button type="button" data-a="del" aria-label="' + t("del") + '" title="' + t("del") + '">×</button></span>';
    function rename() {
      var span = el.querySelector(".cl"); if (!span) return;
      var inp = document.createElement("input"); inp.className = "cin"; inp.value = it.text; inp.setAttribute("aria-label", t("rename"));
      inp.size = Math.max(6, it.text.length + 1);
      span.replaceWith(inp); el.classList.add("editing"); inp.focus(); inp.select();
      var done = false;
      function commit(keep) {
        if (done) return; var v = inp.value.trim();
        if (keep && v && v !== it.text) {
          if (nameTaken(v, it, o.scope())) { inp.classList.add("invalid"); inp.setAttribute("aria-invalid", "true"); toast(fmt(t("nameTaken"), { n: v })); setTimeout(function () { inp.focus(); }, 0); return; }
          it.text = v; save();
        }
        done = true; o.redraw(); var back = document.querySelector('[data-cid="' + it.id + '"]'); if (back) back.focus();
      }
      inp.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); commit(true); } if (e.key === "Escape") { e.preventDefault(); commit(false); } });
      inp.addEventListener("input", function () { inp.size = Math.max(6, inp.value.length + 1); inp.classList.remove("invalid"); });
      inp.addEventListener("blur", function () { commit(true); });
      inp.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    }
    function dup() {
      var c = o.dup(it, uniqueName(it.text, o.scope()));
      save(); o.redraw();
      var nel = document.querySelector('[data-cid="' + c.id + '"]'); if (nel && nel._rename) nel._rename();
      toast(t("duplicated"));
    }
    el._rename = rename;
    el.querySelectorAll(".ck button").forEach(function (b) {
      b.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
      b.addEventListener("click", function (e) { e.stopPropagation(); var a = b.dataset.a; if (a === "ren") rename(); else if (a === "dup") dup(); else { o.del(it); save(); o.redraw(); } });
    });
    el.addEventListener("dblclick", function (e) { e.stopPropagation(); rename(); });
    el.addEventListener("keydown", function (e) {
      if (e.target !== el) return;
      if (e.key === "F2") { e.preventDefault(); rename(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") { e.preventDefault(); dup(); }
    });
  }
  function kitArr(arr, redraw, extra) {
    return {
      scope: function () { return arr(); },
      dup: function (it, name) { var c = JSON.parse(JSON.stringify(it)); c.id = uid(); c.text = name; if (c.x != null) c.x = Math.min(95, c.x + 3); if (c.y != null) c.y = Math.min(95, c.y + 4); (extra && extra.push ? extra.push(c, it) : arr().push(c)); return c; },
      del: function (it) { var A = (extra && extra.home) ? extra.home(it) : arr(), i = A.indexOf(it); if (i > -1) A.splice(i, 1); if (extra && extra.after) extra.after(it); },
      redraw: redraw
    };
  }

  /* ---------- v6: list view (accessible alternative to spatial boards) ---------- */
  function listBoard(body, cfg) {
    var wrap = document.createElement("div"); wrap.className = "lb";
    body.appendChild(wrap);
    function draw() {
      var items = cfg.items();
      wrap.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("lbHint") + '</p><form class="addrow lb-add"><input aria-label="' + t("zAddItem") + '" placeholder="' + t("zAddItem") + '"><select aria-label="' + esc(cfg.catLabel) + '">' + cfg.cats.map(function (c, i) { return '<option value="' + i + '">' + esc(c) + "</option>"; }).join("") + '</select><button class="btn" type="submit">' + t("zAdd") + '</button></form><table class="lb-table"><caption class="sr-only">' + esc(cfg.caption) + "</caption><thead><tr><th scope=\"col\">" + t("lbName") + '</th><th scope="col">' + esc(cfg.catLabel) + "</th>" + (cfg.level ? '<th scope="col">' + esc(cfg.level.label) + "</th>" : "") + '<th scope="col"><span class="sr-only">' + t("lbActions") + "</span></th></tr></thead><tbody></tbody></table>";
      var tb = wrap.querySelector("tbody");
      items.forEach(function (it) {
        var tr = document.createElement("tr"); fresh(tr, it.id);
        tr.innerHTML = '<td><input class="lb-name" aria-label="' + t("lbName") + '"></td><td><select class="lb-cat" aria-label="' + esc(cfg.catLabel) + '">' + cfg.cats.map(function (c, i) { return '<option value="' + i + '"' + (cfg.catOf(it) === i ? " selected" : "") + ">" + esc(c) + "</option>"; }).join("") + "</select></td>" + (cfg.level ? '<td><select class="lb-lvl" aria-label="' + esc(cfg.level.label) + '">' + cfg.level.labels.map(function (c, i) { return '<option value="' + i + '"' + (cfg.level.get(it) === i ? " selected" : "") + ">" + esc(c) + "</option>"; }).join("") + "</select></td>" : "") + '<td class="lb-act"><button type="button" class="btn small ghost" data-a="dup">⧉ ' + t("duplicate") + '</button><button type="button" class="btn small ghost" data-a="del">× ' + t("del") + "</button></td>";
        var nm = tr.querySelector(".lb-name"); nm.value = it.text;
        nm.addEventListener("change", function () { var v = nm.value.trim(); if (!v) { nm.value = it.text; return; } if (nameTaken(v, it, cfg.scope(it))) { nm.setAttribute("aria-invalid", "true"); toast(fmt(t("nameTaken"), { n: v })); nm.focus(); return; } nm.removeAttribute("aria-invalid"); it.text = v; save(); });
        tr.querySelector(".lb-cat").onchange = function (e) { cfg.setCat(it, +e.target.value); save(); draw(); var r = wrap.querySelector('[data-row="' + it.id + '"] .lb-cat'); if (r) r.focus(); };
        var lv = tr.querySelector(".lb-lvl"); if (lv) lv.onchange = function (e) { cfg.level.set(it, +e.target.value); save(); };
        tr.dataset.row = it.id;
        tr.querySelector('[data-a="dup"]').onclick = function () { var c = cfg.dup(it, uniqueName(it.text, cfg.scope(it))); save(); draw(); var n = wrap.querySelector('[data-row="' + c.id + '"] .lb-name'); if (n) { n.focus(); n.select(); } };
        tr.querySelector('[data-a="del"]').onclick = function () { cfg.del(it); save(); draw(); var f = wrap.querySelector(".lb-add input"); if (f) f.focus(); toast(fmt(t("deletedX"), { n: it.text })); };
        tb.appendChild(tr);
      });
      if (!items.length) tb.innerHTML = '<tr><td colspan="4" class="hint">' + t("zNone") + "</td></tr>";
      wrap.querySelector(".lb-add").onsubmit = function (e) { e.preventDefault(); var i = this.querySelector("input"), v = i.value.trim(); if (!v) return; var probe = { text: v }; if (nameTaken(v, probe, cfg.scope(probe, +this.querySelector("select").value))) { toast(fmt(t("nameTaken"), { n: v })); return; } cfg.add(v, +this.querySelector("select").value); save(); draw(); wrap.querySelector(".lb-add input").focus(); };
      if (cfg.after) cfg.after(wrap);
    }
    draw();
  }
  function listToggle(body, rerender) {
    var bar = document.createElement("div"); bar.className = "view-toggle";
    bar.innerHTML = '<div class="seg" role="group" aria-label="' + t("viewAs") + '"><button type="button" data-v="0" aria-pressed="' + !S.listMode + '">' + t("viewBoard") + '</button><button type="button" data-v="1" aria-pressed="' + !!S.listMode + '">' + t("viewList") + "</button></div>";
    bar.querySelectorAll("button").forEach(function (b) { b.onclick = function () { S.listMode = b.dataset.v === "1"; save(); rerender(); var nb = document.querySelector('.view-toggle [data-v="' + b.dataset.v + '"]'); if (nb) nb.focus(); }; });
    body.parentNode.insertBefore(bar, body);
  }

  /* ---------- activity 1: project canvas ---------- */
  var QSTATUS = ["open", "progress", "answered"];
  function projectDescList() { var a = S.project.acts[1]; if (a && a.p1) return a.p1.desc ? [a.p1.desc] : []; return notesOf(1, 0); }
  function teamNames() { var a = S.project.acts[1]; return a && a.p1 ? a.p1.team.map(function (m) { return m.name; }).filter(Boolean) : []; }
  RENDER.project = function (body, d, a) {
    var P = a.p1;
    if (!P) {
      P = a.p1 = { desc: notesOf(1, 0).join("\n"), team: notesOf(1, 1).map(function (tx) { var p = tx.split(/\s[–-]\s/); return { id: uid(), name: p[0] || tx, discipline: p.slice(1).join(" – "), resp: false }; }), questions: notesOf(1, 2).map(function (tx) { return { id: uid(), text: tx, status: "open", where: "" }; }), methods: notesOf(1, 3).join("\n") };
      save();
    }
    body.innerHTML = `<div class="p1"><section class="p1-desc"><label class="mini" for="p1d">${esc(L(d.fields[0]))}</label><textarea id="p1d" rows="6"></textarea></section>
      <section class="p1-team"><h3 class="caps sec-h">${esc(L(d.fields[1]))}</h3><div id="p1t" class="p1-list"></div><button class="add" type="button" id="p1ta">${t("p1AddMember")}</button></section>
      <section class="p1-q"><h3 class="caps sec-h">${esc(L(d.fields[2]))}</h3><div id="p1q" class="p1-list"></div><button class="add" type="button" id="p1qa">${t("p1AddQ")}</button></section>
      <section class="p1-m"><h3 class="caps sec-h">${esc(L(d.fields[3]))}</h3><div id="p1m"></div><label class="mini" for="p1mn">${t("p1OtherMethods")}</label><textarea id="p1mn" rows="3"></textarea></section></div>`;
    var dsc = body.querySelector("#p1d"); dsc.value = P.desc; dsc.oninput = function () { P.desc = dsc.value; save(); };
    var mn = body.querySelector("#p1mn"); mn.value = P.methods || ""; mn.oninput = function () { P.methods = mn.value; save(); };
    function drawTeam(focus) {
      var box = body.querySelector("#p1t"); box.innerHTML = "";
      P.team.forEach(function (m, i) {
        var el = document.createElement("div"); el.className = "p1-member"; el.style.setProperty("--g", GCOL[i % GCOL.length]); fresh(el, m.id);
        el.innerHTML = `<span class="avatar" aria-hidden="true">${esc(initials(m.name))}</span><input data-k="name" aria-label="${t("p1Name")}" placeholder="${t("p1Name")}"><input data-k="discipline" aria-label="${t("p1Disc")}" placeholder="${t("p1Disc")}"><button type="button" class="star-tog" aria-pressed="${!!m.resp}" title="${t("p1Resp")}" aria-label="${t("p1Resp")}">★</button><button class="x" type="button" aria-label="${t("del")}">×</button>`;
        el.querySelectorAll("[data-k]").forEach(function (inp) { inp.value = m[inp.dataset.k] || ""; inp.oninput = function () { m[inp.dataset.k] = inp.value; if (inp.dataset.k === "name") el.querySelector(".avatar").textContent = initials(inp.value); save(); }; });
        el.querySelector(".star-tog").onclick = function () { m.resp = !m.resp; this.setAttribute("aria-pressed", m.resp); save(); };
        el.querySelector(".x").onclick = function () { P.team.splice(i, 1); save(); drawTeam(); drawMethods(); };
        box.appendChild(el);
        if (focus === m.id) el.querySelector("input").focus();
      });
      if (P.team.some(function (m) { return m.resp; })) return; var h = document.createElement("p"); h.className = "hint"; h.style.margin = "0"; h.textContent = t("p1RespHint"); box.appendChild(h);
    }
    function drawQ(focus) {
      var box = body.querySelector("#p1q"); box.innerHTML = "";
      P.questions.forEach(function (q, i) {
        var el = document.createElement("div"); el.className = "p1-qcard st-" + q.status; fresh(el, q.id);
        el.innerHTML = `<span class="qmark" aria-hidden="true">?</span><textarea rows="2" aria-label="${t("p1Q")} ${i + 1}"></textarea><div class="seg small" role="group" aria-label="${t("p1Status")}">${QSTATUS.map(function (s) { return `<button type="button" data-s="${s}" aria-pressed="${q.status === s}">${esc(t("p1St")[s])}</button>`; }).join("")}</div><select aria-label="${t("p1Where")}"><option value="">${t("p1Where")}</option>${ACTS.map(function (x) { return `<option value="${x.n}"${+q.where === x.n ? " selected" : ""}>${x.n} · ${esc(L(x.title))}</option>`; }).join("")}</select><button class="x" type="button" aria-label="${t("del")}">×</button>`;
        var ta = el.querySelector("textarea"); ta.value = q.text; ta.oninput = function () { q.text = ta.value; save(); };
        el.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { q.status = b.dataset.s; save(); drawQ(); }; });
        el.querySelector("select").onchange = function (e) { q.where = e.target.value; save(); };
        el.querySelector(".x").onclick = function () { P.questions.splice(i, 1); save(); drawQ(); };
        box.appendChild(el);
        if (focus === q.id) ta.focus();
      });
    }
    function drawMethods() {
      var plan = (S.project.acts[2] && S.project.acts[2].plan) || {}, rows = [];
      Object.keys(plan).forEach(function (k) { if (plan[k].state) rows.push({ m: k.split(":")[1], cat: catOf(k.split(":")[0]), st: plan[k].state, who: plan[k].who }); });
      body.querySelector("#p1m").innerHTML = rows.length ? '<ul class="p1-mlist">' + rows.map(function (r) { return `<li><span class="state ${r.st === "done" ? "done" : "ring"}" aria-hidden="true"></span><b>${esc(mName(r.m))}</b> <span class="hint">${esc(L([r.cat.en, r.cat.de]))} · ${esc(t("planLegend")[r.st === "done" ? 2 : 1])}${r.who ? " · " + esc(r.who) : ""}</span></li>`; }).join("") + `</ul><a class="linkbtn" href="#activity-2">${t("p1EditPlan")}</a>` : `<p class="hint" style="margin:0 0 6px">${t("p1NoPlan")} <a href="#activity-2">${t("activity")} 2 →</a></p>`;
    }
    body.querySelector("#p1ta").onclick = function () { var m = { id: uid(), name: "", discipline: "", resp: false }; P.team.push(m); save(); drawTeam(m.id); };
    body.querySelector("#p1qa").onclick = function () { var q = { id: uid(), text: "", status: "open", where: "" }; P.questions.push(q); save(); drawQ(q.id); };
    drawTeam(); drawQ(); drawMethods();
  };

  /* ---------- activity 12: quote & action bubbles ---------- */
  var VISIONS = ["", "utopia", "eutopia", "dystopia"];
  function quoteItems() { var a = S.project.acts[12]; if (a && a.quotes) return a.quotes.items; return notesOf(12, 0).map(function (x) { return { text: x, kind: "quote" }; }).concat(notesOf(12, 1).map(function (x) { return { text: x, kind: "action" }; })); }
  RENDER.quotes = function (body, d, a) {
    var Q = a.quotes;
    if (!Q) {
      Q = a.quotes = { items: [] };
      notesOf(12, 0).forEach(function (x) { Q.items.push({ id: uid(), text: x, kind: "quote", who: "", vision: "" }); });
      notesOf(12, 1).forEach(function (x) { Q.items.push({ id: uid(), text: x, kind: "action", who: "", vision: "" }); });
      notesOf(12, 2).forEach(function (x) { Q.items.push({ id: uid(), text: x, kind: "quote", who: "", vision: "utopia" }); });
      save();
    }
    var filter = "";
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("qtHint")}</p><form class="qt-add" id="qtf"><textarea rows="2" aria-label="${t("qtNew")}" placeholder="${t("qtNew")}"></textarea><div class="seg small" role="group" aria-label="${t("qtKind")}"><button type="button" data-k="quote" aria-pressed="true">${t("qtKinds").quote}</button><button type="button" data-k="action" aria-pressed="false">${t("qtKinds").action}</button></div><input list="qtwho" aria-label="${t("qtWho")}" placeholder="${t("qtWho")}"><button class="btn primary" type="submit">${t("zAdd")}</button></form><datalist id="qtwho">${uniq(groupTitles()).map(function (g) { return `<option value="${esc(g)}">`; }).join("")}</datalist><div class="filters" role="group" aria-label="Filter" id="qtfil"></div><div class="qwall" id="qw"></div>`;
    var kind = "quote", form = body.querySelector("#qtf");
    form.querySelectorAll("[data-k]").forEach(function (b) { b.onclick = function () { kind = b.dataset.k; form.querySelectorAll("[data-k]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); }; });
    form.onsubmit = function (e) { e.preventDefault(); var ta = form.querySelector("textarea"), who = form.querySelector("input"); if (!ta.value.trim()) return; Q.items.unshift({ id: uid(), text: ta.value.trim(), kind: kind, who: who.value.trim(), vision: "" }); ta.value = ""; save(); draw(); ta.focus(); };
    function drawFilters() {
      var f = body.querySelector("#qtfil"), opts = [["", t("mAll")], ["quote", t("qtKinds").quote], ["action", t("qtKinds").action]].concat(VISIONS.slice(1).map(function (v) { return [v, t("qtVis")[v]]; }));
      f.innerHTML = opts.map(function (o) { return `<button type="button" data-f="${o[0]}" aria-pressed="${filter === o[0]}">${esc(o[1])}</button>`; }).join("");
      f.querySelectorAll("button").forEach(function (b) { b.onclick = function () { filter = b.dataset.f; drawFilters(); draw(); }; });
    }
    function draw() {
      var w = body.querySelector("#qw"); w.innerHTML = "";
      Q.items.filter(function (q) { return !filter || q.kind === filter || q.vision === filter; }).forEach(function (q) {
        var el = document.createElement("figure"); el.className = "qb k-" + q.kind + (q.vision ? " v-" + q.vision : ""); fresh(el, q.id);
        el.innerHTML = `<textarea rows="3" aria-label="${esc(t("qtKinds")[q.kind])}"></textarea><figcaption><input list="qtwho" aria-label="${t("qtWho")}" placeholder="${t("qtWho")}"><span class="vis" role="group" aria-label="${t("qtVision")}">${VISIONS.slice(1).map(function (v) { return `<button type="button" data-v="${v}" aria-pressed="${q.vision === v}" title="${esc(t("qtVisHint")[v])}">${esc(t("qtVis")[v])}</button>`; }).join("")}</span><button class="x" type="button" aria-label="${t("del")}">×</button></figcaption><details class="qsrc"${q.src && (q.src.role || q.src.method || q.src.date || q.src.context) ? "" : ""}><summary><span class="qs-l">${t("qsSource")}</span> <span class="qs-sum"></span></summary><div class="qs-grid"><label class="mini">${t("qsRole")}<input data-s="role" list="qsroles" placeholder="${t("qsRolePh")}"></label><label class="mini">${t("qsMethod")}<input data-s="method" list="qsmethods" placeholder="${t("qsMethodPh")}"></label><label class="mini">${t("qsDate")}<input data-s="date" type="date"></label><label class="mini qs-ctx">${t("qsContext")}<textarea data-s="context" rows="2" placeholder="${t("qsContextPh")}"></textarea></label></div></details>`;
        q.src = q.src || { role: "", method: "", date: "", context: "" };
        var sum = el.querySelector(".qs-sum");
        function srcSum() { var x = q.src, parts = [x.role, x.method, x.date ? new Date(x.date + "T12:00").toLocaleDateString(S.lang === "de" ? "de-DE" : "en-GB") : ""].filter(Boolean); sum.textContent = parts.length ? "· " + parts.join(" · ") : "· " + t("qsAdd"); sum.classList.toggle("empty", !parts.length); }
        el.querySelectorAll("[data-s]").forEach(function (f) { f.value = q.src[f.dataset.s] || ""; f.oninput = function () { q.src[f.dataset.s] = f.value; save(); srcSum(); }; });
        srcSum();
        var ta = el.querySelector("textarea"); ta.value = q.text; ta.oninput = function () { q.text = ta.value; save(); };
        var who = el.querySelector("input"); who.value = q.who || ""; who.oninput = function () { q.who = who.value; save(); };
        el.querySelectorAll("[data-v]").forEach(function (b) { b.onclick = function () { q.vision = q.vision === b.dataset.v ? "" : b.dataset.v; save(); draw(); }; });
        el.querySelector(".x").onclick = function () { Q.items.splice(Q.items.indexOf(q), 1); save(); draw(); };
        w.appendChild(el);
      });
      if (!w.children.length) w.innerHTML = `<p class="hint">${t("qtEmpty")}</p>`;
    }
    var dl = document.createElement("div"); dl.hidden = true;
    dl.innerHTML = '<datalist id="qsmethods">' + Object.keys(METHODS).filter(function (m) { return m !== "all"; }).map(function (m) { return '<option value="' + esc(mName(m)) + '">'; }).join("") + '</datalist><datalist id="qsroles">' + t("qsRoles").map(function (r) { return '<option value="' + esc(r) + '">'; }).join("") + "</datalist>";
    body.appendChild(dl);
    drawFilters(); draw();
  };

  /* ---------- activity 17: business canvas ---------- */
  RENDER.canvas = function (body, d, a, c) {
    a.fields = a.fields || {}; d.fields.forEach(function (_, i) { a.fields[i] = a.fields[i] || []; });
    a.c17 = a.c17 || { concept: conceptTitles()[0] || "", value: "" };
    var areas = ["sell", "cust", "integ", "rev"];
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("cvHint")}</p><div class="bcanvas">${d.fields.map(function (f, i) { return `<section class="bc-area bc-${areas[i]}" data-f="${i}"><h3>${esc(L(f))}</h3>${i === 1 ? '<div class="ideas bc-groups"></div>' : ""}<div class="list"></div><button class="add" type="button">${t("addNote")}</button></section>`; }).join("")}<section class="bc-area bc-core"><h3>${t("cvConcept")}</h3><input id="cvc" list="cvconcepts" class="team-in" aria-label="${t("cvConcept")}"><datalist id="cvconcepts">${conceptTitles().map(function (x) { return `<option value="${esc(x)}">`; }).join("")}</datalist><label class="mini" for="cvv">${t("cvValue")}</label><textarea id="cvv" rows="4" class="team-in"></textarea></section></div>`;
    var cc = body.querySelector("#cvc"); cc.value = a.c17.concept; cc.oninput = function () { a.c17.concept = cc.value; save(); };
    var cv = body.querySelector("#cvv"); cv.value = a.c17.value; cv.oninput = function () { a.c17.value = cv.value; save(); };
    var lists = {};
    body.querySelectorAll(".bc-area[data-f]").forEach(function (sec) {
      var f = +sec.dataset.f, nl = noteList(sec.querySelector(".list"), a.fields[f], ["#e6ee58", "#6dbcdf", "#86d3b4", "#f39237"][f], L(d.fields[f]));
      sec.querySelector(".add").onclick = function () { nl.add(); }; lists[f] = nl;
    });
    var gbox = body.querySelector(".bc-groups");
    if (gbox) { var gs = groupTitles(); gbox.innerHTML = gs.length ? '<span class="hint">' + t("cvFrom3") + ":</span>" : ""; gs.forEach(function (g) { var b = document.createElement("button"); b.type = "button"; b.className = "idea"; b.textContent = "+ " + g; b.disabled = a.fields[1].some(function (x) { return norm(x.text) === norm(g); }); b.onclick = function () { lists[1].add(g); b.disabled = true; }; gbox.appendChild(b); }); }
  };

  /* ---------- activity 24: support along the journey ---------- */
  RENDER.support = function (body, d, a) {
    var SP = a.support;
    if (!SP) {
      SP = a.support = { cards: [], improve: notesOf(24, 2).join("\n") };
      var n0 = notesOf(24, 0), n1 = notesOf(24, 1); for (var i = 0; i < Math.max(n0.length, n1.length); i++) SP.cards.push({ id: uid(), step: "", needs: n0[i] || "", helper: "", how: n1[i] || "" });
      save();
    }
    body.innerHTML = `<p class="hint" style="margin:0 0 10px">${t("suHint")}</p><datalist id="suwho">${uniq(groupTitles().concat(teamNames())).map(function (g) { return `<option value="${esc(g)}">`; }).join("")}</datalist><div class="su-scroll"><div class="su" id="su"></div></div><label class="mini" for="suimp" style="margin-top:14px;display:block">${esc(L(d.fields[2]))}</label><textarea id="suimp" rows="3" class="team-in"></textarea>`;
    var imp = body.querySelector("#suimp"); imp.value = SP.improve || ""; imp.oninput = function () { SP.improve = imp.value; save(); };
    var su = body.querySelector("#su");
    function draw(focusId) {
      var steps = [{ id: "", label: t("suGeneral") }].concat(journeySteps().map(function (s, i) { return { id: s.id, label: (s.tp ? "✕ " : (i + 1) + ". ") + (s.label || "…") }; }));
      su.style.gridTemplateColumns = "repeat(" + steps.length + ", minmax(210px, 1fr))";
      su.innerHTML = "";
      steps.forEach(function (st) {
        var col = document.createElement("section"); col.className = "su-col";
        col.innerHTML = `<h3 class="su-step"><span>${esc(st.label)}</span></h3><div class="su-cards"></div><button class="add" type="button">${t("suAdd")}</button>`;
        var box = col.querySelector(".su-cards");
        SP.cards.filter(function (c) { return (c.step || "") === st.id; }).forEach(function (c) {
          var el = document.createElement("article"); el.className = "su-card"; fresh(el, c.id);
          el.innerHTML = `<label class="mini">${esc(L(d.fields[0]))}<input data-k="needs" list="suwho"></label><div class="su-arrow" aria-hidden="true">↓ ${t("suHelps")}</div><label class="mini">${t("suHelper")}<input data-k="helper" list="suwho"></label><label class="mini">${esc(L(d.fields[1]))}<textarea data-k="how" rows="2"></textarea></label><div class="su-foot"><select aria-label="${t("suMove")}">${steps.map(function (s2) { return `<option value="${s2.id}"${(c.step || "") === s2.id ? " selected" : ""}>${esc(s2.label)}</option>`; }).join("")}</select><button class="x" type="button" aria-label="${t("del")}">×</button></div>`;
          el.querySelectorAll("[data-k]").forEach(function (inp) { inp.value = c[inp.dataset.k] || ""; inp.oninput = function () { c[inp.dataset.k] = inp.value; save(); }; });
          el.querySelector("select").onchange = function (e) { c.step = e.target.value; save(); draw(c.id); };
          el.querySelector(".x").onclick = function () { SP.cards.splice(SP.cards.indexOf(c), 1); save(); draw(); };
          box.appendChild(el);
          if (focusId === c.id) el.querySelector("input").focus();
        });
        col.querySelector(".add").onclick = function () { var c = { id: uid(), step: st.id, needs: "", helper: "", how: "" }; SP.cards.push(c); save(); draw(c.id); };
        su.appendChild(col);
      });
    }
    draw();
  };
  /* ---------- v6: list adapters (accessible alternative) ---------- */
  var LIST = {
    rings: function (body, d, a) {
      var R = a.rings, labels = d.fields.map(function (f) { return L(f).split(":")[0]; });
      listBoard(body, { caption: L(d.title), catLabel: t("rAddTo"), cats: labels, items: function () { return R.items; }, scope: function () { return R.items; },
        catOf: function (it) { return Math.max(0, ringOf(it)); }, setCat: function (it, i) { var p = placeInRing(it.text, i); it.x = p.x; it.y = p.y; },
        add: function (v, i) { R.items.push(placeInRing(v, i)); }, dup: function (it, name) { var c = placeInRing(name, Math.max(0, ringOf(it))); R.items.push(c); return c; },
        del: function (it) { var i = R.items.indexOf(it); if (i > -1) R.items.splice(i, 1); } });
    },
    zones: function (body, d, a) {
      var Z = function () { return a.zones[a.zoneSet]; };
      var seg = document.createElement("div"); seg.className = "seg"; seg.setAttribute("role", "group"); seg.style.marginBottom = "10px";
      seg.innerHTML = '<button type="button" data-z="emotional" aria-pressed="' + (a.zoneSet === "emotional") + '">' + t("zEmo") + '</button><button type="button" data-z="technical" aria-pressed="' + (a.zoneSet === "technical") + '">' + t("zTech") + "</button>";
      body.appendChild(seg);
      seg.querySelectorAll("button").forEach(function (b) { b.onclick = function () { a.zoneSet = b.dataset.z; save(); body.innerHTML = ""; LIST.zones(body, d, a); body.querySelector('[data-z="' + a.zoneSet + '"]').focus(); }; });
      function place(it, i) { var n = Z().zones.length, r = zRadii(n), rad = i >= n ? ZOUTER + .02 : (r[i] + (i ? r[i - 1] : ZCORE)) / 2, an = Math.atan2(it.y - 50, it.x - 50) || -.8; it.x = Math.max(6, Math.min(94, 50 + Math.cos(an) * rad * 100)); it.y = Math.max(4, Math.min(96, 50 + Math.sin(an) * rad * 100)); }
      listBoard(body, { caption: L(d.title), catLabel: t("zZone"), cats: Z().zones.map(function (z, i) { return (i + 1) + ". " + (z.label || t("zZone") + " " + (i + 1)) + (z.auth ? " – " + z.auth : ""); }).concat([t("outside")]),
        items: function () { return Z().items; }, scope: function () { return Z().items; },
        catOf: function (it) { var k = zoneOf(it, Z().zones.length); return k < 0 ? Z().zones.length : k; }, setCat: place,
        add: function (v, i) { var it = { id: uid(), text: v, x: 50 + Math.random() * 10, y: 30 }; place(it, i); Z().items.push(it); },
        dup: function (it, name) { var c = { id: uid(), text: name, x: it.x + 2, y: it.y + 2 }; place(c, Math.max(0, zoneOf(it, Z().zones.length))); Z().items.push(c); return c; },
        del: function (it) { var i = Z().items.indexOf(it); if (i > -1) Z().items.splice(i, 1); } });
    },
    spheres: function (body, d, a) {
      var labels = d.fields.map(function (f) { return L(f); });
      function all() { var o = []; [0, 1, 2].forEach(function (f) { a.fields[f].forEach(function (n) { if (n.text.trim()) o.push(n); }); }); return o; }
      function home(it) { var h = 0; [0, 1, 2].forEach(function (f) { if (a.fields[f].indexOf(it) > -1) h = f; }); return h; }
      function put(it, f) { var k = a.fields[f].length; it.x = SPHERE_HOME[f][0] + (k % 3) * 5 - 5; it.y = SPHERE_HOME[f][1] + (k % 4) * 8; }
      listBoard(body, { caption: L(d.title), catLabel: t("rAddTo"), cats: labels, items: all, scope: all, catOf: home,
        setCat: function (it, f) { var h = home(it); a.fields[h].splice(a.fields[h].indexOf(it), 1); put(it, f); a.fields[f].push(it); },
        add: function (v, f) { var it = { id: uid(), text: v }; put(it, f); a.fields[f].push(it); },
        dup: function (it, name) { var f = home(it), c = { id: uid(), text: name }; put(c, f); a.fields[f].push(c); return c; },
        del: function (it) { var f = home(it), i = a.fields[f].indexOf(it); if (i > -1) a.fields[f].splice(i, 1); a.links = (a.links || []).filter(function (l) { return l[0] !== it.id && l[1] !== it.id; }); } });
    },
    future: function (body, d, a) {
      var F = a.future, regions = [t("fNear"), t("fCrazy"), t("fReal")], spots = [[30, 22], [25, 74], [75, 74]];
      listBoard(body, { caption: L(d.title), catLabel: t("rAddTo"), cats: regions, items: function () { return F.items; }, scope: function () { return F.items; },
        catOf: futureRegion, setCat: function (it, i) { it.x = spots[i][0] + Math.random() * 20 - 10; it.y = spots[i][1] + Math.random() * 10 - 5; },
        add: function (v, i) { F.items.push({ id: uid(), text: v, x: spots[i][0], y: spots[i][1] }); },
        dup: function (it, name) { var c = { id: uid(), text: name, x: Math.min(95, it.x + 4), y: Math.min(95, it.y + 4) }; F.items.push(c); return c; },
        del: function (it) { var i = F.items.indexOf(it); if (i > -1) F.items.splice(i, 1); } });
    },
    mind: function (body, d, a) {
      var M = a.mind; if (!M) { RENDER.mind(document.createElement("div"), d, a); M = a.mind; }
      var wrap = document.createElement("div"); wrap.className = "lb"; body.appendChild(wrap);
      function node(id) { return M.nodes.find(function (n) { return n.id === id; }); }
      function kids(id) { return M.nodes.filter(function (n) { return n.parent === id; }); }
      function addChild(pid) { var p = node(pid), n = { id: uid(), text: "", x: Math.max(6, Math.min(94, p.x + 8)), y: Math.max(6, Math.min(94, p.y + 10 + kids(pid).length * 6)), parent: pid, strategy: "" }; M.nodes.push(n); save(); draw(); var i = wrap.querySelector('[data-n="' + n.id + '"] .lm-text'); if (i) i.focus(); }
      function item(n, lvl) {
        var li = document.createElement("li"); li.dataset.n = n.id; fresh(li, n.id);
        li.innerHTML = '<div class="lm-row"><input class="lm-text team-in" aria-label="' + t("mmNode") + (lvl ? " (" + t("lmLevel") + " " + lvl + ")" : "") + '"><button type="button" class="btn small ghost" data-a="add">' + t("mmAddChild") + "</button>" + (n.parent ? '<button type="button" class="btn small ghost" data-a="del">× ' + t("mmDelete") + "</button>" : "") + '</div><label class="mini">' + t("mmStrategy") + '<textarea rows="2" class="lm-str"></textarea></label>';
        var ti = li.querySelector(".lm-text"); ti.value = n.text; ti.oninput = function () { n.text = ti.value; save(); };
        var st = li.querySelector(".lm-str"); st.value = n.strategy || ""; st.oninput = function () { n.strategy = st.value; save(); };
        li.querySelector('[data-a="add"]').onclick = function () { addChild(n.id); };
        var dl = li.querySelector('[data-a="del"]'); if (dl) dl.onclick = function () { var kill = [n.id], ch = true; while (ch) { ch = false; M.nodes.forEach(function (x) { if (kill.indexOf(x.parent) > -1 && kill.indexOf(x.id) < 0) { kill.push(x.id); ch = true; } }); } M.nodes = M.nodes.filter(function (x) { return kill.indexOf(x.id) < 0; }); save(); draw(); var f = wrap.querySelector('[data-n="' + n.parent + '"] .lm-text'); if (f) f.focus(); toast(fmt(t("deletedX"), { n: n.text || "…" })); };
        var k = kids(n.id); if (k.length) { var ul = document.createElement("ul"); ul.className = "lm-tree"; k.forEach(function (c) { ul.appendChild(item(c, lvl + 1)); }); li.appendChild(ul); }
        return li;
      }
      function draw() { wrap.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("lmHint") + '</p><ul class="lm-tree root" aria-label="' + esc(L(d.title)) + '"></ul>'; wrap.querySelector("ul").appendChild(item(node("root"), 0)); }
      draw();
    },
    infra: function (body, d, a) {
      var I = a.infra; if (!I) { RENDER.infra(document.createElement("div"), d, a); I = a.infra; }
      var wrap = document.createElement("div"); wrap.className = "lb"; body.appendChild(wrap);
      function nm(n) { return n.label || t("ifTypes")[n.type]; }
      function node(id) { return I.nodes.find(function (n) { return n.id === id; }); }
      function typeSel(cls, v) { return '<select class="' + cls + '" aria-label="' + t("ifType") + '">' + Object.keys(INFRA).map(function (k) { return '<option value="' + k + '"' + (v === k ? " selected" : "") + ">" + esc(t("ifTypes")[k]) + "</option>"; }).join("") + "</select>"; }
      function nodeSel(cls, lab) { return '<select class="' + cls + '" aria-label="' + lab + '">' + I.nodes.map(function (n) { return '<option value="' + n.id + '">' + esc(nm(n)) + "</option>"; }).join("") + "</select>"; }
      function draw() {
        wrap.innerHTML = '<p class="hint" style="margin:0 0 10px">' + t("liHint") + '</p><form class="addrow lb-add" id="lin"><input aria-label="' + t("ifLabel") + '" placeholder="' + t("ifLabel") + '">' + typeSel("lin-ty", "service") + '<button class="btn" type="submit">' + t("zAdd") + '</button></form><table class="lb-table"><caption class="sr-only">' + esc(L(d.title)) + '</caption><thead><tr><th scope="col">' + t("ifLabel") + '</th><th scope="col">' + t("ifType") + '</th><th scope="col">' + t("ifRisk") + '</th><th scope="col">' + esc(L(d.fields[2])) + '</th><th scope="col">' + esc(L(d.fields[3])) + '</th><th scope="col"><span class="sr-only">' + t("lbActions") + "</span></th></tr></thead><tbody></tbody></table>" +
          '<h3 class="caps" style="color:var(--c-blue);margin-top:16px">' + t("spLinks") + "</h3>" + (I.nodes.length > 1 ? '<form class="addrow lb-add" id="lil">' + nodeSel("lil-a", t("liFrom")) + '<span aria-hidden="true">↔</span>' + nodeSel("lil-b", t("liTo")) + '<button class="btn" type="submit">' + t("liAddLink") + "</button></form>" : "") + '<ul class="lil-list"></ul>';
        var tb = wrap.querySelector("tbody");
        I.nodes.forEach(function (n) {
          var tr = document.createElement("tr"); fresh(tr, n.id); tr.dataset.row = n.id;
          tr.innerHTML = '<td><input class="lb-name" aria-label="' + t("ifLabel") + '"></td><td>' + typeSel("li-ty", n.type) + '</td><td><input type="checkbox" class="li-rk" aria-label="' + t("ifRisk") + '"' + (n.risk ? " checked" : "") + '></td><td><textarea rows="2" class="li-rt" aria-label="' + esc(L(d.fields[2])) + '"></textarea></td><td><textarea rows="2" class="li-fx" aria-label="' + esc(L(d.fields[3])) + '"></textarea></td><td class="lb-act"><button type="button" class="btn small ghost" data-a="del">× ' + t("del") + "</button></td>";
          var l = tr.querySelector(".lb-name"); l.value = n.label; l.onchange = function () { n.label = l.value; save(); draw(); var f = wrap.querySelector('[data-row="' + n.id + '"] .li-ty'); if (f) f.focus(); };
          tr.querySelector(".li-ty").onchange = function (e) { n.type = e.target.value; save(); };
          tr.querySelector(".li-rk").onchange = function (e) { n.risk = e.target.checked; save(); };
          var rt = tr.querySelector(".li-rt"); rt.value = n.riskText || ""; rt.oninput = function () { n.riskText = rt.value; save(); };
          var fx = tr.querySelector(".li-fx"); fx.value = n.fix || ""; fx.oninput = function () { n.fix = fx.value; save(); };
          tr.querySelector('[data-a="del"]').onclick = function () { I.nodes = I.nodes.filter(function (x) { return x !== n; }); I.links = I.links.filter(function (k) { return k[0] !== n.id && k[1] !== n.id; }); save(); draw(); wrap.querySelector("#lin input").focus(); toast(fmt(t("deletedX"), { n: nm(n) })); };
          tb.appendChild(tr);
        });
        if (!I.nodes.length) tb.innerHTML = '<tr><td colspan="6" class="hint">' + t("zNone") + "</td></tr>";
        var ll = wrap.querySelector(".lil-list");
        I.links.forEach(function (k, i) { var p = node(k[0]), q = node(k[1]); if (!p || !q) return; var li = document.createElement("li"); li.className = "mrow"; li.innerHTML = '<span class="mk">' + esc(nm(p)) + " ↔ " + esc(nm(q)) + '</span><label class="hint"><input type="checkbox"' + (k[2] ? " checked" : "") + "> " + t("ifWeak") + '</label><button class="x" type="button" aria-label="' + t("del") + ": " + esc(nm(p)) + " ↔ " + esc(nm(q)) + '">×</button>'; li.querySelector("input").onchange = function (e) { k[2] = e.target.checked; save(); }; li.querySelector(".x").onclick = function () { I.links.splice(i, 1); save(); draw(); }; ll.appendChild(li); });
        if (!I.links.length) ll.innerHTML = '<li class="hint">' + t("spNoLinks") + "</li>";
        wrap.querySelector("#lin").onsubmit = function (e) { e.preventDefault(); var v = this.querySelector("input").value.trim(), k = I.nodes.length; I.nodes.push({ id: uid(), type: this.querySelector("select").value, label: v, x: 14 + (k * 17) % 74, y: 20 + (k % 3) * 28, risk: false, riskText: "", fix: "" }); save(); draw(); wrap.querySelector("#lin input").focus(); };
        var lf = wrap.querySelector("#lil"); if (lf) lf.onsubmit = function (e) { e.preventDefault(); var x = this.querySelector(".lil-a").value, y = this.querySelector(".lil-b").value; if (x === y || I.links.some(function (l) { return (l[0] === x && l[1] === y) || (l[1] === x && l[0] === y); })) { toast(t("liDupLink")); return; } I.links.push([x, y, false]); save(); draw(); wrap.querySelector("#lil .lil-a").focus(); };
      }
      draw();
    },
    closeness: function (body, d, a) {
      var C = a.close;
      listBoard(body, { caption: L(d.title), catLabel: t("cPerson"), cats: C.people.map(function (p) { return p.name || "…"; }), items: function () { return C.items; },
        scope: function (it, lane) { var ln = it && it.lane != null ? it.lane : C.people[lane || 0].id; return C.items.filter(function (x) { return x.lane === ln; }); },
        catOf: function (it) { return Math.max(0, C.people.findIndex(function (p) { return p.id === it.lane; })); }, setCat: function (it, i) { it.lane = C.people[i].id; },
        level: { label: t("lvLabel"), labels: t("lvLevels"), get: function (it) { return Math.max(0, Math.min(4, Math.floor((it.y - 4) / 19))); }, set: function (it, l) { it.y = 12 + l * 19; } },
        add: function (v, i) { C.items.push({ id: uid(), text: v, lane: C.people[i].id, y: 50 }); },
        dup: function (it, name) { var c = { id: uid(), text: name, lane: it.lane, y: Math.min(96, it.y + 6) }; C.items.push(c); return c; },
        del: function (it) { var i = C.items.indexOf(it); if (i > -1) C.items.splice(i, 1); } });
    }
  };

  /* ---------- report (print / PDF) ---------- */
  function listHtml(items) { return items.length ? "<ul>" + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : ""; }
  function boardItemsSvg(items) { return items.map(function (it) { var w = Math.min(40, it.text.length * 1.45 + 4); return '<g transform="translate(' + it.x + " " + it.y + ')"><rect x="' + (-w / 2) + '" y="-2.4" width="' + w + '" height="4.8" rx="2.4" fill="#fff" stroke="#202c51" stroke-width=".3"/><text y="1" text-anchor="middle" font-size="2.6" fill="#202c51">' + esc(it.text.length > 26 ? it.text.slice(0, 25) + "…" : it.text) + "</text></g>"; }).join(""); }
  var REPORT = {
    generic: function (n, d, a) { return '<div class="rep-cols">' + d.fields.map(function (f, i) { var it = notesOf(n, i); return it.length ? "<div><h4>" + esc(L(f)) + "</h4>" + listHtml(it) + "</div>" : ""; }).join("") + "</div>"; },
    plan: function (n, d, a) { return '<div class="rep-cols">' + CATS.map(function (c) { var it = catMethods(c.id).filter(function (m) { return a.plan && a.plan[c.id + ":" + m] && a.plan[c.id + ":" + m].state; }).map(function (m) { var p = a.plan[c.id + ":" + m]; return mName(m) + " – " + t("planLegend")[p.state === "done" ? 2 : 1] + (p.who ? " (" + p.who + ")" : ""); }); return it.length ? "<div><h4>" + esc(L([c.en, c.de])) + "</h4>" + listHtml(it) + "</div>" : ""; }).join("") + "</div>"; },
    journey: function (n, d, a) {
      var J = a.journey, st = journeySteps(), rows = window.ADA_JOURNEY_ROWS;
      return "<p><b>" + esc(J.title) + "</b>" + (J.desc ? " – " + esc(J.desc) : "") + '</p><table class="rep-table"><tr><th></th>' + st.map(function (s, i) { return "<th>" + (s.tp ? "✕ " : (i + 1) + ". ") + esc(s.label) + "</th>"; }).join("") + "</tr>" + rows.map(function (r, ri) { return "<tr><th>" + esc(L(r)) + "</th>" + st.map(function (s) { return "<td>" + esc(s.rows[ri] || "") + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
    },
    rings: function (n, d, a) {
      var labels = d.fields.map(function (f) { return L(f).split(":")[0]; });
      return '<div class="rep-board"><div class="rep-svg">' + ringsSvg(labels, true) + boardItemsSvg(a.rings.items) + '</svg></div><div class="rep-cols">' + labels.map(function (l, i) { var it = ringItems(i); return it.length ? "<div><h4>" + esc(l) + "</h4>" + listHtml(it) + "</div>" : ""; }).join("") + "</div></div>";
    },
    closeness: function (n, d, a) { var C = a.close; return '<div class="rep-cols">' + C.people.map(function (p) { var it = C.items.filter(function (x) { return x.lane === p.id; }).sort(function (x, y) { return x.y - y.y; }).map(function (x) { return x.text + " (" + Math.round(100 - x.y) + "%)"; }); return it.length ? "<div><h4>" + esc(p.name) + "</h4>" + listHtml(it) + "</div>" : ""; }).join("") + '</div><p class="hint">100% = ' + t("cClose") + "</p>"; },
    zones: function (n, d, a) {
      return ["emotional", "technical"].map(function (k) {
        var Z = a.zones[k]; if (!Z || !Z.items.length && !Z.zones.some(function (z) { return z.label || z.auth; })) return "";
        return "<h4>" + t(k === "emotional" ? "zEmo" : "zTech") + '</h4><div class="rep-board"><div class="rep-svg">' + zonesSvg(Z, k) + boardItemsSvg(Z.items) + "</svg></div><ol>" + Z.zones.map(function (zz, i) { var items = Z.items.filter(function (it) { return zoneOf(it, Z.zones.length) === i; }).map(function (it) { return it.text; }); return "<li><b>" + esc(zz.label || "–") + "</b>" + (zz.auth ? " · " + esc(zz.auth) : "") + (items.length ? "<br>" + esc(items.join(", ")) : "") + "</li>"; }).join("") + "</ol></div>";
      }).join("");
    },
    directions: function (n, d, a) {
      var D = a.dirs, P = dirPairs(D), h = P.length * 26 + 10, pts = [], svg = '<svg viewBox="0 0 640 ' + h + '" class="rep-dirs">';
      P.forEach(function (p, i) { var y = 18 + i * 26, v = D.values[p.key]; svg += '<text x="150" y="' + (y + 4) + '" text-anchor="end" font-size="12" fill="#202c51">' + esc(p.l) + '</text><line x1="160" y1="' + y + '" x2="480" y2="' + y + '" stroke="#6dbcdf" stroke-width="2"/><text x="490" y="' + (y + 4) + '" font-size="12" fill="#202c51">' + esc(p.r) + "</text>"; if (v != null) { var x = 160 + 320 * v / 100; pts.push(x + " " + y); svg += '<g stroke="#f39237" stroke-width="3"><line x1="' + (x - 5) + '" y1="' + (y - 5) + '" x2="' + (x + 5) + '" y2="' + (y + 5) + '"/><line x1="' + (x + 5) + '" y1="' + (y - 5) + '" x2="' + (x - 5) + '" y2="' + (y + 5) + '"/></g>'; } });
      if (pts.length > 1) svg += '<path d="M' + pts.join(" L") + '" fill="none" stroke="#f39237" stroke-width="1.5"/>';
      return svg + "</svg>" + (D.anomalies ? "<h4>" + t("dAnom") + "</h4><p>" + esc(D.anomalies) + "</p>" : "");
    },
    principles: function (n, d, a) { return REPORT.generic(n, d, a); },
    mfa: function (n, d, a) { var tps = touchPoints(); return listHtml([]) + "<ul>" + a.mfa.combos.filter(function (c) { return c.factors.length; }).map(function (c) { var tp = tps.find(function (s) { return s.id === c.where; }); return "<li><b>" + esc(c.name || t("mCombo")) + "</b> (" + fmt(t("mFactors"), { n: c.factors.length }) + "): " + c.factors.map(function (f) { return esc(f.text) + " <i>[" + esc(principleName(f.p)) + "]</i>"; }).join(" + ") + (tp ? "<br>" + t("mWhere") + " " + esc(tp.label) : "") + (c.why ? "<br>" + esc(c.why) : "") + "</li>"; }).join("") + "</ul>"; },
    future: function (n, d, a) { var r = [t("fNear"), t("fCrazy"), t("fReal")]; return '<div class="rep-cols">' + r.map(function (x, i) { var it = a.future.items.filter(function (y) { return futureRegion(y) === i; }).map(function (y) { return y.text; }); return it.length ? "<div><h4>" + esc(x) + "</h4>" + listHtml(it) + "</div>" : ""; }).join("") + "</div>"; },
    summary: function (n, d, a) { return summaryHtml(false) + REPORT.generic(n, d, a); },
    project: function (n, d, a) { var P = a.p1; return (P.desc ? "<p>" + esc(P.desc) + "</p>" : "") + '<div class="rep-cols">' + (P.team.length ? "<div><h4>" + esc(L(d.fields[1])) + "</h4><ul>" + P.team.map(function (m) { return "<li>" + (m.resp ? "★ " : "") + esc(m.name) + (m.discipline ? " – " + esc(m.discipline) : "") + "</li>"; }).join("") + "</ul></div>" : "") + (P.questions.length ? "<div><h4>" + esc(L(d.fields[2])) + "</h4><ul>" + P.questions.map(function (q) { return "<li>" + esc(q.text) + ' <span class="hint">(' + esc(t("p1St")[q.status]) + (q.where ? ", " + t("activity") + " " + q.where : "") + ")</span></li>"; }).join("") + "</ul></div>" : "") + (P.methods ? "<div><h4>" + t("p1OtherMethods") + "</h4><p>" + esc(P.methods) + "</p></div>" : "") + "</div>"; },
    quotes: function (n, d, a) { return '<div class="rep-cols">' + ["quote", "action"].map(function (k) { var it = a.quotes.items.filter(function (q) { return q.kind === k && q.text.trim(); }); return it.length ? "<div><h4>" + esc(t("qtKinds")[k]) + "</h4><ul>" + it.map(function (q) { return "<li>" + (k === "quote" ? "„" + esc(q.text) + "“" : esc(q.text)) + (q.who ? " – " + esc(q.who) : "") + (q.vision ? ' <span class="hint">[' + esc(t("qtVis")[q.vision]) + "]</span>" : "") + (function () { var x = q.src || {}, pr = [x.role, x.method, x.date].filter(Boolean); return (pr.length ? '<br><span class="hint">' + t("qsSource") + ": " + esc(pr.join(", ")) + "</span>" : "") + (x.context ? '<br><span class="hint">' + t("qsContext") + ": " + esc(x.context) + "</span>" : ""); })() + "</li>"; }).join("") + "</ul></div>" : ""; }).join("") + "</div>"; },
    canvas: function (n, d, a) { return (a.c17 && (a.c17.concept || a.c17.value) ? "<p><b>" + esc(a.c17.concept) + "</b>" + (a.c17.value ? " – " + esc(a.c17.value) : "") + "</p>" : "") + REPORT.generic(n, d, a); },
    support: function (n, d, a) { var st = journeySteps(); return "<ul>" + a.support.cards.filter(function (c) { return c.needs || c.how; }).map(function (c) { var s = st.find(function (x) { return x.id === c.step; }); return "<li><b>" + esc(s ? s.label : t("suGeneral")) + ":</b> " + esc(c.needs) + (c.helper ? " ← " + esc(c.helper) : "") + (c.how ? " · " + esc(c.how) : "") + "</li>"; }).join("") + "</ul>" + (a.support.improve ? "<h4>" + esc(L(d.fields[2])) + "</h4><p>" + esc(a.support.improve) + "</p>" : ""); },
    groups: function (n, d, a) { return '<div class="rep-cols">' + a.groups.filter(function (g) { return g.title; }).map(function (g) { return "<div><h4>" + esc(g.title) + "</h4><ul>" + (g.roles.length ? "<li>" + esc(g.roles.join(", ")) + "</li>" : "") + (g.expertise ? "<li>" + esc(g.expertise) + "</li>" : "") + (g.contact ? "<li>" + esc(g.contact) + "</li>" : "") + "</ul></div>"; }).join("") + "</div>"; },
    involve: function (n, d, a) { return '<div class="rep-cols">' + groupList().map(function (g) { var r = a.involve.byGroup[g.id]; if (!r) return ""; return "<div><h4>" + esc(g.title) + " · " + esc(t("ivLevels")[r.level || 0]) + "</h4><ul>" + (r.purpose ? "<li>" + esc(r.purpose) + "</li>" : "") + (r.methods.length ? "<li>" + r.methods.map(function (m) { return esc(mName(m)); }).join(", ") + "</li>" : "") + (r.questions ? "<li>" + esc(r.questions) + "</li>" : "") + (r.give ? "<li>" + esc(r.give) + "</li>" : "") + "</ul></div>"; }).join("") + "</div>"; },
    star: function (n, d, a) { return "<p><b>" + esc(a.star.concept) + '</b></p><div class="rep-cols">' + a.star.persp.map(function (p) { return "<div><h4>" + esc(p.label) + " · " + p.fit + "%</h4>" + (p.notes ? "<p>" + esc(p.notes) + "</p>" : "") + "</div>"; }).join("") + "</div>"; },
    blueprint: function (n, d, a) { var rows = t("bpRows"); return '<table class="rep-table"><tr><th></th>' + a.blueprint.steps.map(function (s, i) { return "<th>" + (i + 1) + ". " + esc(s.label) + "</th>"; }).join("") + "</tr>" + rows.map(function (r, ri) { return (ri === 2 ? '<tr><td colspan="' + (a.blueprint.steps.length + 1) + '" class="rep-line">' + t("bpLine") + "</td></tr>" : "") + "<tr><th>" + esc(r[0]) + "</th>" + a.blueprint.steps.map(function (s) { return "<td>" + esc(s.cells[ri] || "") + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>"; },
    patterns: function (n, d, a) { return '<div class="rep-cols">' + a.patterns.list.filter(function (p) { return p.on; }).map(function (p) { return "<div><h4>⬡ " + esc(p.label) + "</h4>" + (p.text ? "<p>" + esc(p.text) + "</p>" : "") + (p.elements ? '<p class="hint">' + esc(p.elements) + "</p>" : "") + "</div>"; }).join("") + "</div>"; },
    prep: function (n, d, a) { return '<ol class="rep-flow">' + a.prep.steps.map(function (s) { return '<li style="border-color:' + (s.kind === "ritual" ? "#f39237" : "#1f4a9a") + '"><b>' + esc(t("prKinds")[s.kind]) + ":</b> " + esc(s.text) + "</li>"; }).join("") + "</ol>" + (a.prep.manual ? "<h4>" + t("prManual") + "</h4><p>" + esc(a.prep.manual) + "</p>" : ""); },
    infra: function (n, d, a) { return '<div class="rep-board wide"><div class="rep-svg">' + infraSvg(a.infra, true) + "</div><ul>" + a.infra.nodes.filter(function (x) { return x.risk || x.riskText || x.fix; }).map(function (x) { return "<li><b>" + esc(x.label || t("ifTypes")[x.type]) + ":</b> " + esc(x.riskText) + (x.fix ? " → " + esc(x.fix) : "") + "</li>"; }).join("") + "</ul></div>"; },
    loops: function (n, d, a) { var R = reqRows().filter(function (r) { return r.req; }); return '<div class="rep-cols">' + a.iter.versions.map(function (v, i) { var met = R.filter(function (r) { return v.met.indexOf(r.id) > -1; }); return "<div><h4>v" + (i + 1) + " " + esc(v.name) + (R.length ? " · " + met.length + "/" + R.length : "") + "</h4><ul>" + (v.feedback ? "<li>" + esc(v.feedback) + "</li>" : "") + (v.changes ? "<li>→ " + esc(v.changes) + "</li>" : "") + "</ul></div>"; }).join("") + "</div>"; },
    spheres: function (n, d, a) { [0, 1, 2].forEach(function (f) { (a.fields[f] || []).forEach(function (x, i) { if (x.x == null) { x.x = SPHERE_HOME[f][0] + (i % 3) * 6 - 6; x.y = SPHERE_HOME[f][1] + Math.floor(i / 3) * 10; } }); }); var all = []; [0, 1, 2].forEach(function (f) { (a.fields[f] || []).forEach(function (x) { all.push(x); }); }); var by = function (id) { return all.find(function (x) { return x.id === id; }); }; var lines = (a.links || []).filter(function (l) { return by(l[0]) && by(l[1]); }); return '<div class="rep-board wide"><div class="rep-svg"><svg viewBox="0 0 200 100">' + sphereSvgV6(d.fields.map(function (f) { return L(f); })).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "") + lines.map(function (l) { var p = by(l[0]), q = by(l[1]); return '<line x1="' + p.x * 2 + '" y1="' + p.y + '" x2="' + q.x * 2 + '" y2="' + q.y + '" stroke="#202c51" stroke-width=".5" stroke-dasharray="1.5 1"/>'; }).join("") + boardItemsSvg(all.filter(function (x) { return x.text.trim(); }).map(function (x) { return { text: x.text, x: x.x * 2, y: x.y }; })) + "</svg></div><div>" + REPORT.generic(n, d, a) + (lines.length ? "<h4>" + t("spLinks") + "</h4><ul>" + lines.map(function (l) { return "<li>" + esc(by(l[0]).text) + " — " + esc(by(l[1]).text) + "</li>"; }).join("") + "</ul>" : "") + "</div></div>"; },
    relabel: function (n, d, a) { var tps = touchPoints(); return '<div class="rep-cols">' + a.relabel.cards.map(function (c) { var tp = tps.find(function (s) { return s.id === c.tp; }); return "<div><h4>" + esc(c.object || "…") + "</h4><ul>" + (c.mechanism ? "<li>" + esc(c.mechanism) + "</li>" : "") + (metaphorText(c) ? "<li>„" + esc(metaphorText(c)) + "“</li>" : "") + (c.auth ? "<li><b>→ " + esc(c.auth) + "</b></li>" : "") + (tp ? "<li>" + t("mWhere") + " " + esc(tp.label) + "</li>" : "") + "</ul></div>"; }).join("") + "</div>"; },
    reqs: function (n, d, a) { return '<table class="rep-table"><tr><th>' + d.fields.map(function (f) { return esc(L(f)); }).join("</th><th>") + "</th><th>" + t("rqPrio") + "</th></tr>" + a.reqs.rows.map(function (r) { return "<tr><td>" + esc(r.source) + "</td><td>" + esc(r.user) + "</td><td>" + esc(r.req) + "</td><td>" + (r.prio ? esc(t("rqPrios")[r.prio]) : "") + "</td></tr>"; }).join("") + "</table>"; },
    story: function (n, d, a) { return '<div class="rep-story">' + a.story.panels.map(function (p, i) { return "<figure>" + (p.img ? '<img src="' + p.img + '" alt="">' : '<div class="rep-blank"></div>') + "<figcaption><b>" + (i + 1) + ".</b> " + esc(p.caption) + ((d.storyKeys || []).some(function (k) { return p[k]; }) ? '<br><span class="hint">' + (d.storyKeys || []).map(function (k) { return p[k]; }).filter(Boolean).map(esc).join(" · ") + "</span>" : "") + "</figcaption></figure>"; }).join("") + "</div>"; },
    wall: function (n, d, a) { return '<div class="rep-cols">' + WALLCATS.map(function (wc) { var it = a.wall.notes.filter(function (x) { return x.cat === wc[0] && x.text.trim(); }).map(function (x) { return x.text; }); return it.length ? '<div><h4 style="border-left:4px solid ' + wc[1] + ';padding-left:6px">' + esc(t("wlCats")[wc[0]]) + "</h4>" + listHtml(it) + "</div>" : ""; }).join("") + "</div>"; },
    mind: function (n, d, a) { return '<div class="rep-board wide"><div class="rep-svg">' + mindSvg(a.mind, true) + "</div><ul>" + a.mind.nodes.filter(function (x) { return x.strategy; }).map(function (x) { return "<li><b>" + esc(x.text) + ":</b> " + esc(x.strategy) + "</li>"; }).join("") + "</ul></div>"; },
    map: function (n, d, a) { var kinds = t("mapKinds"), l = a.map.legend || {}; return a.map.sheets.filter(function (s) { return s.items.length || s.img; }).map(function (s) { return "<h4>" + esc(s.name) + '</h4><div class="rep-board wide"><div class="rep-svg">' + mapSvgStatic(s) + "</div><ul>" + s.items.filter(function (it) { return it.label || it.kind === "tp"; }).map(function (it) { return "<li>" + (it.kind === "tp" ? "✕ " + mapTpNumber(s, it) : esc(kinds[it.kind])) + (it.label ? ": " + esc(it.label) : "") + "</li>"; }).join("") + (l.rect ? "<li>▭ " + esc(l.rect) + "</li>" : "") + (l.circle ? "<li>◯ " + esc(l.circle) + "</li>" : "") + "</ul></div>"; }).join(""); },
    signals: function (n, d, a) { return '<table class="rep-table"><tr><th></th>' + PHASES.map(function (p) { return "<th>" + esc(t("sigPh")[p[0]][0]) + "</th>"; }).join("") + "</tr>" + a.signals.moments.map(function (m, i) { return "<tr><th>" + (i + 1) + ". " + esc(m.name) + "</th>" + PHASES.map(function (p) { var c = m.cells[p[0]]; return "<td>" + esc(c.text) + (c.mods.length ? "<br><i>" + c.mods.map(function (x) { return esc(t("sigMods")[x]); }).join(", ") + "</i>" : "") + (c.pattern ? '<br><span class="pat-view">' + patternHtml(c.pattern) + "</span>" : "") + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>"; },
    flow: function (n, d, a) { var st = a.flow.steps; return '<ol class="rep-flow">' + st.map(function (s) { var ti = s.retry ? st.findIndex(function (q) { return q.id === s.retry; }) : -1; return '<li style="border-color:' + fcol(s.type) + '"><b>' + esc(t("flTypes")[s.type]) + "</b>" + (s.text ? ": " + esc(s.text) : "") + (ti > -1 ? " <i>" + fmt(t("flBack"), { n: ti + 1 }) + "</i>" : "") + "</li>"; }).join("") + "</ol>"; }
  };
  function renderReport() {
    var list = ACTS.filter(function (x) { return hasContent(x.n) || x.type === "summary"; });
    var date = new Date().toLocaleDateString(S.lang === "de" ? "de-DE" : "en-GB", { year: "numeric", month: "long", day: "numeric" });
    view.innerHTML = '<div class="no-print act-tools" style="margin-top:0"><button class="btn primary" type="button" id="pr">' + t("rPrint") + '</button><span class="hint">' + t("rPrintHint") + '</span></div><article class="report"><header class="rep-head"><div class="caps" style="color:var(--c-blue)">' + t("rTool") + "</div><h1>" + esc(S.project.name) + '</h1><p class="hint">' + ((S.project.team || teamNames().join(", ")) ? "<b>" + t("rTeam") + ":</b> " + esc(S.project.team || teamNames().join(", ")) + " · " : "") + t("rCreated") + " " + date + "<br>" + (useCase() === "existing" ? t("ucEx") : t("ucNew")) + "</p></header>" +
      list.map(function (x) {
        var c = catOf(x.cat), a = S.project.acts[x.n] || {};
        var inner = ""; try { inner = REPORT[x.type](x.n, x, a); } catch (e) { inner = ""; }
        return '<section class="rep-act"><div class="rep-label" style="border-color:' + (c.outline ? "var(--navy)" : c.color) + '"><span class="caps">' + t("activity") + " " + x.n + " · " + L([c.en, c.de]) + (a.done ? " · " + t("isDone") : "") + "</span><h2>" + esc(L(x.title)) + '</h2><p class="act-q">' + esc(L(x.q)) + "</p></div>" + inner + "</section>";
      }).join("") + (list.length ? "" : "<p>" + t("rNone") + "</p>") + (function () { var used = REFS.filter(function (r) { var ra = refActs(r); return list.some(function (x) { return ra[x.n]; }); }); return used.length ? '<section class="rep-act rep-refs"><h2>' + t("rRefs") + '</h2><ul class="refs">' + used.sort(function (p, q) { return p.full.replace(/_/g, "").localeCompare(q.full.replace(/_/g, "")); }).map(function (r) { return refLine(r); }).join("") + "</ul></section>" : ""; })() + '<footer class="rep-foot">Authentication Design Activities · ' + t("conceptBy") + "<br>" + esc(L((window.ADA_ABOUT || {}).context || ["", ""])) + "</footer></article>";
    document.getElementById("pr").onclick = function () { try { window.print(); } catch (e) {} };
  }

  /* ---------- methods ---------- */
  var mFilter = "all", mQuery = "";
  function renderMethods() {
    var keys = Object.keys(METHODS).filter(function (m) { return m !== "all"; }).sort(function (x, y) { return mName(x).localeCompare(mName(y)); });
    view.innerHTML = '<h1 style="color:var(--c-blue);font-weight:800">' + t("methods") + '</h1><div class="filters" role="group" aria-label="Filter"><button type="button" data-f="all">' + t("mAll") + "</button>" +
      CATS.map(function (c) { return '<button type="button" data-f="' + c.id + '"><span class="dots"><i class="' + (c.outline ? "outline" : "") + '" style="background:' + c.color + '"></i></span> ' + L([c.en, c.de]) + "</button>"; }).join("") +
      '</div><input class="search" id="ms" type="search" placeholder="' + t("mSearch") + '" aria-label="' + t("mSearch") + '" value="' + esc(mQuery) + '">' + (function () { var P = window.ADA_PROTO_TIPS; return P ? '<details class="panel tips"><summary><b>' + esc(L(P.h)) + "</b></summary><ul>" + P.list.map(function (x) { return "<li>" + esc(L(x)) + "</li>"; }).join("") + "</ul></details>" : ""; })() + '<div class="mgrid" id="mg" style="margin-top:16px"></div>';
    var mg = view.querySelector("#mg");
    function draw() {
      view.querySelectorAll("[data-f]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.f === mFilter); });
      var q = mQuery.toLowerCase();
      mg.innerHTML = keys.filter(function (m) {
        if (mFilter !== "all" && !methodCats(m).some(function (c) { return c.id === mFilter; })) return false;
        if (q && (mName(m) + " " + METHODS[m].den + " " + METHODS[m].dde).toLowerCase().indexOf(q) < 0) return false;
        return true;
      }).map(methodCard).join("");
    }
    view.querySelectorAll("[data-f]").forEach(function (b) { b.onclick = function () { mFilter = b.dataset.f; draw(); }; });
    view.querySelector("#ms").oninput = function (e) { mQuery = e.target.value; draw(); };
    draw();
  }
  function methodCard(m) {
    return '<article class="mcard"><span class="dots">' + methodCats(m).map(function (c) { return '<i class="' + (c.outline ? "outline" : "") + '" style="background:' + c.color + '" title="' + esc(L([c.en, c.de])) + '"></i>'; }).join("") + "</span><h3>" + esc(mName(m)) + "</h3><p>" + esc(S.lang === "de" ? METHODS[m].dde : METHODS[m].den) + '</p><div class="used">' + t("usedIn") + ": " + methodActs(m).map(function (a) { return '<a href="#activity-' + a.n + '" title="' + esc(L(a.title)) + '">' + a.n + "</a>"; }).join("") + "</div>" + (function () { var rs = refsForMethod(m); return rs.length ? '<details class="mref"><summary>' + fmt(t("litLink"), { n: rs.length }) + '</summary><ul class="refs">' + rs.map(function (r) { return refLine(r); }).join("") + "</ul></details>" : ""; })() + "</article>";
  }

  /* ---------- dialogs ---------- */
  var dlg = document.getElementById("dlg"), dlgBody = document.getElementById("dlgBody");
  function openDlg(html) { dlgBody.innerHTML = html; if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); dlgBody.querySelectorAll("[data-close]").forEach(function (c) { c.onclick = closeDlg; }); }
  function closeDlg() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDlg(); });
  function methodDialog(m) {
    openDlg(methodCard(m).replace('<article class="mcard">', '<article class="mcard" style="padding:0">') + '<div class="row"><button class="btn" type="button" data-close>' + t("close") + "</button></div>");
    dlgBody.querySelectorAll(".used a").forEach(function (x) { x.addEventListener("click", closeDlg); });
  }
  function fileName() { return (S.project.name || "project").replace(/[^\w\-äöüÄÖÜß ]+/g, "").trim().replace(/\s+/g, "-") || "project"; }
  function saveDialog() {
    var json = JSON.stringify({ app: "authentication-design-activities", toolAuthor: "Marie Beuthel", version: 3, saved: new Date().toISOString(), project: S.project }, null, 1);
    openDlg("<h2>" + t("sTitle") + "</h2><p style='margin:0'>" + t("sP") + '</p><div class="row"><button class="btn primary" type="button" id="dl">' + t("sDownload") + '</button><label class="btn">' + t("sImport") + '<input type="file" id="fi" accept=".json,application/json" hidden></label><a class="btn" href="#report" data-close>' + t("sPdf") + '</a></div><div class="msg" id="msg"></div><details><summary class="hint">' + t("sCopy") + " / " + t("sLoadPaste") + '</summary><div class="row" style="margin:8px 0"><button class="btn small" type="button" id="cp">' + t("sCopy") + '</button></div><textarea id="tx" aria-label="' + t("sPaste") + '" placeholder="' + t("sPaste") + '"></textarea><div class="row" style="margin-top:8px"><button class="btn small" type="button" id="lp">' + t("sLoadPaste") + '</button></div></details><div class="row"><button class="btn ghost" type="button" id="nw">' + t("sNew") + '</button><span style="flex:1"></span><button class="btn" type="button" data-close>' + t("close") + "</button></div>");
    var msg = dlgBody.querySelector("#msg"), tx = dlgBody.querySelector("#tx");
    dlgBody.querySelector("#dl").onclick = function () { msg.textContent = downloadProject() ? t("sSavedFirst") : t("sDlFail"); };
    dlgBody.querySelector("#cp").onclick = function () {
      var ok = function () { msg.textContent = t("sCopied"); }, fail = function () { tx.value = json; tx.select(); msg.textContent = t("sCopyFail"); };
      try { navigator.clipboard.writeText(json).then(ok, fail); } catch (e) { fail(); }
    };
    function importText(s) { var p; try { var o = JSON.parse(s); p = o.project || o; if (!p || typeof p.acts !== "object") throw 0; } catch (e) { msg.textContent = t("sBad"); return; } closeDlg(); confirmReplace(t("sImportConfirm"), function () { S.project = p; toast(t("sLoaded")); }); }
    dlgBody.querySelector("#fi").onchange = function (e) { var f = e.target.files[0]; if (!f) return; var r = new FileReader(); r.onload = function () { importText(r.result); }; r.readAsText(f); };
    dlgBody.querySelector("#lp").onclick = function () { importText(tx.value); };
    dlgBody.querySelector("#nw").onclick = function () { closeDlg(); confirmReplace(t("sNewConfirm"), function () { S.project = emptyProject(); }); };
  }
  function confirmReplace(text, action) {
    var finish = function () { action(); save(); closeDlg(); if (location.hash === "#start" || !location.hash) route(); else location.hash = "#start"; };
    var k = ownContentCount();
    if (!k) { finish(); return; }
    openDlg('<h2>' + t("sReplaceTitle") + '</h2><p style="margin:0">' + fmt(t("sReplaceWarn"), { n: esc(S.project.name), k: k }) + "</p><p style=\"margin:0\">" + text + '</p><div class="row"><button class="btn primary" type="button" id="svf">⤓ ' + t("sDownload") + '</button><span class="hint" id="svMsg" role="status"></span></div><label class="danger-ok"><input type="checkbox" id="sure"> ' + t("sSure") + '</label><div class="row"><button class="btn danger" type="button" id="yes" disabled>' + t("sYes") + '</button><span style="flex:1"></span><button class="btn" type="button" data-close>' + t("sCancel") + "</button></div>");
    var yes = dlgBody.querySelector("#yes");
    dlgBody.querySelector("#svf").onclick = function () { var ok = downloadProject(); dlgBody.querySelector("#svMsg").textContent = ok ? t("sSavedFirst") : t("sDlFail"); };
    dlgBody.querySelector("#sure").onchange = function (e) { yes.disabled = !e.target.checked; };
    yes.onclick = finish;
    setTimeout(function () { var c = dlgBody.querySelector("[data-close]"); if (c) c.focus(); }, 30);
  }
  document.getElementById("saveBtn").onclick = saveDialog;
  document.getElementById("undoBtn").onclick = undo;
  document.addEventListener("keydown", function (e) { if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z" && !(e.target.matches && e.target.matches("input, textarea, select, [contenteditable]"))) { e.preventDefault(); undo(); } });
  document.getElementById("pdfBtn").onclick = function () { location.hash = "#report"; };
  document.querySelectorAll(".lang button").forEach(function (b) { b.onclick = function () { S.lang = b.dataset.lang; if (EX) S.project = exampleProject(); save(); var y = window.scrollY; route(); window.scrollTo(0, y); }; });

  var toastTimer;
  function toast(s) { var el = document.getElementById("toast"); el.textContent = s; el.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600); }


  /* ---------- project name in the top bar ---------- */
  function editProjName() {
    var pn = document.getElementById("projName"), old = S.project.name;
    pn.innerHTML = '<input class="pn-in" aria-label="' + t("projectName") + '" maxlength="80">';
    var i = pn.querySelector("input"); i.value = old; i.focus(); i.select();
    var done = false;
    function end(keep) { if (done) return; done = true; var v = i.value.trim(); if (keep && v && v !== old) { S.project.name = v; save(); toast(fmt(t("pnSaved"), { n: v })); } pn.innerHTML = ""; shell((location.hash || "#start").slice(1)); var sp = document.getElementById("pname"); if (sp) sp.value = S.project.name; var b = pn.querySelector(".pn-btn"); if (b) b.focus(); refreshOnb(); }
    i.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); end(true); } if (e.key === "Escape") { e.preventDefault(); end(false); } });
    i.addEventListener("blur", function () { end(true); });
  }

  /* ---------- example: view without touching the own project ---------- */
  function enterExample(hash) {
    if (EX) return;
    clearTimeout(saveTimer); persist();
    S.onb = S.onb || {}; S.onb.seenEx = true;
    EX = { real: S.project, back: location.hash || "#start" }; S.project = exampleProject();
    if (hash && location.hash !== hash) location.hash = hash; else route();
  }
  function leaveExample() {
    if (!EX) return;
    var back = EX.back; S.project = EX.real; EX = null; lastSnap = JSON.stringify(S.project); persist();
    if (location.hash === back) route(); else location.hash = back;
  }
  function exampleDialog(n) {
    S.onb = S.onb || {}; if (!S.onb.seenEx) { S.onb.seenEx = true; save(); }
    var d = defOf(n), c = catOf(d.cat), ex = exampleProject(), keep = S.project, keepList = S.listMode;
    openDlg('<div class="exd-head"><span class="caps" style="color:var(--c-blue)">' + t("exampleOf") + '</span><h2 style="margin:2px 0 0">' + n + " · " + esc(L(d.title)) + '</h2><p class="hint" style="margin:4px 0 0">' + t("exDlgHint") + '</p></div><div class="exd-body" id="exdBody" inert></div><div class="row"><button class="btn" type="button" id="exAll">' + t("exBrowse") + '</button><span style="flex:1"></span><button class="btn primary" type="button" data-close>' + t("close") + "</button></div>");
    dlg.classList.add("wide");
    var box = dlgBody.querySelector("#exdBody");
    S.project = ex; S.listMode = false;
    try { ex.acts[n] = ex.acts[n] || {}; RENDER[d.type](box, d, ex.acts[n], c); } catch (e) { box.innerHTML = '<p class="hint">' + t("exNone") + "</p>"; }
    S.project = keep; S.listMode = keepList;
    if (!hasContentIn(ex, n) && d.type !== "summary") box.insertAdjacentHTML("afterbegin", '<p class="hint">' + t("exNone") + "</p>");
    dlgBody.querySelector("#exAll").onclick = function () { closeDlg(); enterExample("#activity-" + n); };
  }
  function hasContentIn(p, n) { var k = S.project; S.project = p; var r = hasContent(n); S.project = k; return r; }
  function refreshOnb() { var o = document.getElementById("onb"); if (!o) return; var tmp = document.createElement("div"); tmp.innerHTML = onboarding(); if (tmp.firstChild) { o.replaceWith(tmp.firstChild); bindOnboarding(); } }
  dlg.addEventListener("close", function () { dlg.classList.remove("wide"); refreshOnb(); });

  function downloadProject() {
    var json = JSON.stringify({ app: "authentication-design-activities", toolAuthor: "Marie Beuthel", version: 3, saved: new Date().toISOString(), project: EX ? EX.real : S.project }, null, 1);
    try { var b = new Blob([json], { type: "application/json" }), u = URL.createObjectURL(b), el = document.createElement("a"); el.href = u; el.download = fileName() + ".ada.json"; document.body.appendChild(el); el.click(); el.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 2000); return true; } catch (e) { return false; }
  }
  function ownContentCount() { var p = EX ? EX.real : S.project; return ACTS.filter(function (a) { return hasContentIn(p, a.n); }).length; }

  /* simple hand-drawn looking sketches for the example storyboards */
  function exSketch(o) {
    try {
      var cv = document.createElement("canvas"); cv.width = 480; cv.height = 320; var g = cv.getContext("2d");
      g.fillStyle = "#fff"; g.fillRect(0, 0, 480, 320); g.lineCap = "round"; g.lineJoin = "round";
      var seed = o.seed || 1; function jit() { seed = (seed * 9301 + 49297) % 233280; return (seed / 233280 - .5) * 2.2; }
      function line(pts, col, w) { g.strokeStyle = col; g.lineWidth = w || 3.2; g.beginPath(); pts.forEach(function (q, i) { var x = q[0] + jit(), y = q[1] + jit(); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.stroke(); }
      function circ(x, y, r, col, w) { var p = []; for (var k = 0; k <= 24; k++) p.push([x + Math.cos(k / 24 * 6.3) * r, y + Math.sin(k / 24 * 6.3) * r]); line(p, col, w); }
      function person(x, y, col, arm) { circ(x, y - 72, 15, col); line([[x, y - 57], [x, y - 10]], col); line([[x, y - 10], [x - 16, y + 34]], col); line([[x, y - 10], [x + 16, y + 34]], col); line([[x, y - 42], [x - 22, y - 18]], col); line(arm || [[x, y - 42], [x + 26, y - 30]], col); }
      line([[10, 290], [470, 290]], "#86d3b4", 2);
      if (o.terminal) { line([[300, 290], [300, 120], [380, 110], [380, 290]], "#202c51"); line([[312, 132], [368, 126], [368, 190], [312, 196], [312, 132]], "#6dbcdf"); line([[318, 230], [362, 226]], o.glow ? "#f39237" : "#202c51", 5); if (o.glow) { line([[310, 214], [300, 204]], "#f39237", 2.5); line([[370, 210], [382, 200]], "#f39237", 2.5); } }
      if (o.check) line([[326, 160], [338, 174], [358, 146]], "#3aa877", 5);
      if (o.pin) for (var i = 0; i < 4; i++) circ(322 + i * 12, 176, 3, "#202c51", 2.5);
      person(o.px || 210, 250, "#202c51", o.reach ? [[o.px - 0 || 210, 208], [(o.px || 210) + 70, 226]] : null);
      if (o.card) line([[(o.px || 210) + 62, 218], [(o.px || 210) + 86, 214], [(o.px || 210) + 88, 232], [(o.px || 210) + 64, 236], [(o.px || 210) + 62, 218]], "#1f4a9a", 3);
      if (o.clerk) { person(o.clerkX || 90, 250, "#f39237"); line([[40, 250], [140, 250]], "#f39237", 2.5); }
      if (o.nod) { line([[(o.clerkX || 90) + 22, 166], [(o.clerkX || 90) + 30, 176]], "#f39237", 2.5); line([[(o.clerkX || 90) + 26, 160], [(o.clerkX || 90) + 36, 168]], "#f39237", 2.5); }
      if (o.question) { line([[(o.px || 210) - 10, 130], [(o.px || 210) - 4, 120], [(o.px || 210) + 8, 122], [(o.px || 210) + 8, 134], [(o.px || 210) + 0, 140], [(o.px || 210) + 0, 148]], "#f39237", 3); circ((o.px || 210), 158, 1.5, "#f39237", 3); }
      if (o.shield) line([[(o.px || 210) + 40, 196], [(o.px || 210) + 62, 186], [(o.px || 210) + 70, 200]], "#6dbcdf", 4);
      if (o.clock) { circ(420, 50, 22, "#202c51", 2.5); line([[420, 50], [420, 36]], "#202c51", 2.5); line([[420, 50], [432, 56]], "#202c51", 2.5); }
      return cv.toDataURL("image/jpeg", .82);
    } catch (e) { return null; }
  }
  /* ---------- example project ---------- */
  function notes(arr) { return arr.map(function (x) { return { id: uid(), text: x }; }); }
  var EX_DE = {"Lea, Jonas & Mira (example)": "Lea, Jonas & Mira (Beispiel)", "Citizens handle official matters such as renewing an ID or registering an address at self-service terminals in the city hall and online.": "Bürger*innen erledigen Behördengänge wie die Verlängerung des Personalausweises oder eine Ummeldung an Selbstbedienungsterminals im Bürgeramt und online.", "Lea – UX design, keeps the activities going": "Lea – UX-Design, hält die Aktivitäten am Laufen", "Jonas – computer science, prototyping": "Jonas – Informatik, Prototyping", "Mira – product design, user research": "Mira – Produktdesign, Nutzerforschung", "How can citizens identify themselves at a public terminal without stress?": "Wie können sich Bürger*innen an einem öffentlichen Terminal stressfrei ausweisen?", "Which data do people not want to show in a waiting area?": "Welche Daten möchten Menschen im Wartebereich nicht zeigen?", "Interviews with citizens at the service centre – Mira": "Interviews mit Bürger*innen im Servicezentrum – Mira", "Action observation in the waiting area – Jonas": "Beobachtung im Wartebereich – Jonas", "Citizens": "Bürger*innen", "Everyday use of the ID card, very different digital skills": "Nutzen den Ausweis im Alltag, sehr unterschiedliche digitale Kenntnisse", "Users": "Nutzende", "Citizens' advisory board": "Bürgerbeirat", "Clerks": "Sachbearbeiter*innen", "Know every edge case of the forms and help at the terminals": "Kennen jeden Sonderfall der Formulare und helfen an den Terminals", "Interest group": "Interessengruppe", "Head of the service centre": "Leitung des Servicezentrums", "IT administrators": "IT-Administrator*innen", "Run the terminals, card readers and the identity system": "Betreiben Terminals, Kartenleser und das Identitätssystem", "Project partners": "Projektpartner", "City IT department": "IT-Abteilung der Stadt", "Understand worries and routines around the ID card and personal data": "Sorgen und Routinen rund um Ausweis und persönliche Daten verstehen", "Where do you feel watched? What would make the terminal feel safe?": "Wo fühlt ihr euch beobachtet? Was würde das Terminal sicher wirken lassen?", "Voucher for the city café": "Gutschein für das Rathauscafé", "Learn the edge cases and how clerks help today": "Sonderfälle kennenlernen und wie Sachbearbeiter*innen heute helfen", "When do citizens ask for help? What do you check just by looking?": "Wann bitten Bürger*innen um Hilfe? Was prüft ihr nur durch Hinsehen?", "Counts as working time and training": "Zählt als Arbeitszeit und Weiterbildung", "Check technical feasibility early": "Technische Machbarkeit früh prüfen", "Which readers and systems exist? What must not change?": "Welche Lesegeräte und Systeme gibt es? Was darf sich nicht ändern?", "Early say in the concept": "Frühes Mitspracherecht am Konzept", "Citizen holds the ID card over the reader and looks for the right spot": "Bürgerin hält den Ausweis über das Lesegerät und sucht die richtige Stelle", "Searching for the card slot, then tapping twice": "Sucht den Kartenschlitz, tippt dann zweimal", "No light on the reader – unclear whether it worked": "Kein Licht am Lesegerät – unklar, ob es geklappt hat", "Typing the PIN while shielding the keypad with the other hand": "Tippt die PIN und verdeckt das Tastenfeld mit der anderen Hand", "Covers the keypad, types quickly": "Verdeckt das Tastenfeld, tippt schnell", "Beep for every digit, dots on the screen": "Piepton bei jeder Ziffer, Punkte auf dem Bildschirm", "Clerk nods from the counter when the screen turns green": "Sachbearbeiter nickt vom Schalter aus, als der Bildschirm grün wird", "Looks up to the clerk": "Schaut zum Sachbearbeiter hoch", "Green screen plus the clerk's nod as confirmation": "Grüner Bildschirm und Nicken des Sachbearbeiters als Bestätigung", "No new hardware: uses the existing ID card": "Keine neue Hardware: nutzt den vorhandenen Ausweis", "Shorter queues in the morning": "Kürzere Warteschlangen am Vormittag", "City halls": "Bürgerämter", "Libraries and other public services": "Bibliotheken und andere öffentliche Einrichtungen", "Library lending stations": "Ausleihstationen in Bibliotheken", "Parking permits": "Parkausweise", "Licence per terminal": "Lizenz pro Terminal", "Maintenance contract with the city IT": "Wartungsvertrag mit der städtischen IT", "Tap & nod terminal": "Tap-&-Nick-Terminal", "Citizens identify themselves in one step with their ID card, while the clerk confirms at a glance.": "Bürger*innen weisen sich in einem Schritt mit ihrem Ausweis aus, Sachbearbeiter*innen bestätigen mit einem Blick.", "Employee": "Mitarbeitende", "Clerks see at a glance who has checked in": "Sachbearbeiter*innen sehen auf einen Blick, wer eingecheckt ist", "Private person": "Privatperson", "The PIN stays private behind a screen": "Die PIN bleibt hinter einem Sichtschutz privat", "Citizen": "Bürger*in", "Familiar ID card, no new account needed": "Vertrauter Ausweis, kein neues Konto nötig", "Company": "Unternehmen", "Low cost, but the readers need an update": "Günstig, aber die Lesegeräte brauchen ein Update", "Taking a ticket": "Wartenummer ziehen", "Takes a ticket at the kiosk": "Zieht am Automaten eine Wartenummer", "Screen: “Your number is 42”": "Bildschirm: „Ihre Nummer ist 42“", "Ticket is queued": "Nummer wird eingereiht", "Queue system, no personal data": "Aufrufsystem, keine persönlichen Daten", "Identifying at terminal": "Ausweisen am Terminal", "Taps ID card, enters PIN behind the screen": "Hält den Ausweis an, gibt die PIN hinter dem Sichtschutz ein", "Card slot glows, green tick": "Kartenschlitz leuchtet, grüner Haken", "Card and PIN are checked": "Ausweis und PIN werden geprüft", "eID server of the city, ID card chip": "eID-Server der Stadt, Ausweis-Chip", "Paying the fee": "Gebühr bezahlen", "Pays by card": "Zahlt mit Karte", "Amount and receipt": "Betrag und Beleg", "Payment is linked to the case": "Zahlung wird dem Vorgang zugeordnet", "Payment provider": "Zahlungsdienstleister", "Leaving with the temporary ID": "Mit vorläufigem Ausweis gehen", "Holds the temporary ID at the gate": "Hält den vorläufigen Ausweis an die Schranke", "Gate opens": "Schranke öffnet sich", "Temporary ID is validated": "Vorläufiger Ausweis wird geprüft", "Access control system": "Zutrittskontrollsystem", "An older citizen asks the clerk for help at the terminal": "Ein älterer Bürger bittet am Terminal um Hilfe", "Citizen 70+, clerk": "Bürger 70+, Sachbearbeiterin", "Clerk explains the card slot, citizen types the PIN alone": "Sachbearbeiterin erklärt den Kartenschlitz, der Bürger tippt die PIN allein", "Self-service terminal, busy morning": "Selbstbedienungsterminal, voller Vormittag", "A student renews her ID card in her lunch break": "Eine Studentin verlängert in der Mittagspause ihren Ausweis", "Student": "Studentin", "Taps card, enters PIN, pays – done in two minutes": "Ausweis anhalten, PIN eingeben, bezahlen – in zwei Minuten erledigt", "Terminal near the entrance": "Terminal am Eingang", "A citizen has forgotten the PIN": "Ein Bürger hat die PIN vergessen", "Citizen, clerk": "Bürger, Sachbearbeiterin", "Switches to the counter, clerk checks the ID visually": "Wechselt an den Schalter, die Sachbearbeiterin prüft den Ausweis per Sichtkontrolle", "Counter in the service centre": "Schalter im Servicezentrum", "Place a help button on the terminal that calls a clerk without leaving the queue.": "Einen Hilfe-Knopf am Terminal anbringen, der Sachbearbeiter*innen ruft, ohne dass man die Warteschlange verliert.", "Older citizens unsure where to place the card": "Ältere Menschen sind unsicher, wo der Ausweis hin muss", "Clerk shows the glowing card slot from a distance": "Sachbearbeiter*in zeigt aus der Distanz auf den leuchtenden Kartenschlitz", "Someone forgot the PIN": "Jemand hat die PIN vergessen", "Switch to the counter with a visual ID check": "Wechsel an den Schalter mit Sichtkontrolle des Ausweises", "Visitors who do not speak German": "Besucher*innen, die kein Deutsch sprechen", "Pictograms and language choice at the kiosk": "Piktogramme und Sprachauswahl am Automaten", "One picture card next to the terminal: card, PIN behind the screen, green tick.": "Eine Bildkarte neben dem Terminal: Ausweis, PIN hinter dem Sichtschutz, grüner Haken.", "Have the ID card ready": "Ausweis bereithalten", "Remember the PIN": "An die PIN erinnern", "Look around to check nobody is watching": "Umschauen, ob niemand zusieht", "Put the bag down to have both hands free": "Tasche abstellen, um beide Hände frei zu haben", "ID card + PIN": "Ausweis + PIN", "Self-service terminal": "Selbstbedienungsterminal", "Shoulder surfing at the PIN pad": "Über-die-Schulter-Schauen am PIN-Feld", "Privacy screen and turning ring": "Sichtschutz und Drehring", "eID server": "eID-Server", "Civil register": "Melderegister", "Central storage of address history": "Zentrale Speicherung der Adresshistorie", "Only query what the case needs": "Nur abfragen, was der Vorgang braucht", "Service centre": "Servicezentrum", "Busy mornings": "Volle Vormittage", "ID card": "Personalausweis", "Waiting ticket": "Wartenummer", "Tap card on reader": "Ausweis ans Lesegerät halten", "Renewing an ID card": "Personalausweis verlängern", "Working citizen, first visit at the new self-service city hall": "Berufstätige Bürgerin, erster Besuch im neuen Bürgeramt mit Selbstbedienung", "Arriving at city hall": "Ankunft im Bürgeramt", "Enters main hall": "Betritt die Haupthalle", "Unsure where to go": "Unsicher, wohin", "Ticket kiosk": "Nummernautomat", "Old ID card": "Alter Ausweis", "Get in the queue": "In die Warteschlange kommen", "Quick, no data shown": "Schnell, keine Daten sichtbar", "Waiting": "Warten", "Other citizens": "Andere Bürger*innen", "Bored, a bit nervous": "Gelangweilt, etwas nervös", "Clerk nearby": "Sachbearbeiter*in in der Nähe", "ID card, PIN": "Ausweis, PIN", "Prove identity": "Identität nachweisen", "Watched by others?": "Von anderen beobachtet?", "Privacy screen": "Sichtschutz", "Card payment": "Kartenzahlung", "Bank card": "Bankkarte", "Routine": "Routine", "Leaving building with ID card": "Gebäude mit Ausweis verlassen", "Exit gate": "Ausgangsschranke", "Temporary ID": "Vorläufiger Ausweis", "Relieved": "Erleichtert", "Biometric photo": "Biometrisches Foto", "Tax ID": "Steuer-ID", "Address history": "Adresshistorie", "ID card chip data": "Chipdaten des Ausweises", "Birth certificate": "Geburtsurkunde", "Passport": "Reisepass", "Only me": "Nur ich", "Fingerprint": "Fingerabdruck", "Me and the clerk": "Ich und die Sachbearbeiterin", "City hall staff": "Personal des Bürgeramts", "Staff card": "Dienstausweis", "Anyone in the hall": "Alle in der Halle", "No authentication": "Keine Authentifizierung", "Collective use at the ticket kiosk, but individual use at the terminal.": "Gemeinsame Nutzung am Nummernautomaten, aber individuelle Nutzung am Terminal.", "devices": "Geräte", "people": "Personen", "Terminal with privacy screen": "Terminal mit Sichtschutz", "Glowing card slot": "Leuchtender Kartenschlitz", "Clerk at the counter": "Sachbearbeiterin am Schalter", "Card tap": "Ausweis anhalten", "Nod": "Nicken", "Turning ring PIN": "PIN per Drehring", "Ring with numbers": "Ring mit Zahlen", "Light shows each click": "Licht zeigt jeden Klick", "Screen shows only dots": "Bildschirm zeigt nur Punkte", "Combination lock": "Zahlenschloss", "rotating dials to a secret sequence": "Rädchen auf eine geheime Folge drehen", "turn": "drehen", "secretly": "heimlich", "dial": "Rädchen", "Turning a ring on the terminal in a personal rhythm instead of typing a PIN": "Einen Ring am Terminal in einem persönlichen Rhythmus drehen, statt eine PIN zu tippen", "Handshake": "Händedruck", "gripping, shaking, letting go": "greifen, schütteln, loslassen", "greet": "begrüßen", "warmly": "herzlich", "clerk": "Sachbearbeiterin", "The clerk confirms identity with a short greeting ritual": "Die Sachbearbeiterin bestätigt die Identität mit einem kurzen Begrüßungsritual", "I don't want everyone in the queue to see my data.": "Ich will nicht, dass alle in der Schlange meine Daten sehen.", "Citizen, about 40": "Bürgerin, etwa 40", "Asked about the waiting area": "Frage zum Wartebereich", "If the card works, I don't need to think about it.": "Wenn der Ausweis funktioniert, muss ich nicht darüber nachdenken.", "Citizen, student": "Bürgerin, Studentin", "Talking about the ideal check-in": "Gespräch über den idealen Check-in", "Turns the ID card face down while waiting": "Dreht den Ausweis beim Warten um", "Citizen, 60+": "Bürger, 60+", "Waiting area, busy morning": "Wartebereich, voller Vormittag", "Soon the terminal will know everything about us.": "Bald weiß das Terminal alles über uns.", "Clerk": "Sachbearbeiterin", "Future scenarios for the city hall": "Zukunftsszenarien für das Bürgeramt", "„I don't want everyone in the queue to see my data.“": "„Ich will nicht, dass alle in der Schlange meine Daten sehen.“", "Personal data is never shown on public screens": "Persönliche Daten erscheinen nie auf öffentlichen Bildschirmen", "„If the card works, I don't need to think about it.“": "„Wenn der Ausweis funktioniert, muss ich nicht darüber nachdenken.“", "Authentication with the familiar ID card works in one step": "Die Authentifizierung mit dem vertrauten Ausweis klappt in einem Schritt", "Bodystorming in the real waiting area": "Bodystorming im echten Wartebereich", "Too little time for the video analysis": "Zu wenig Zeit für die Videoanalyse", "Invite clerks to the first workshop": "Sachbearbeiter*innen zum ersten Workshop einladen", "Mira ran the interviews, Jonas built the prototype": "Mira hat die Interviews geführt, Jonas den Prototyp gebaut", "Possible factors": "Mögliche Faktoren", "financial": "finanziell", "Reuse existing card readers": "Vorhandene Kartenleser weiterverwenden", "ethical": "ethisch", "Offer a non-biometric alternative": "Eine nicht-biometrische Alternative anbieten", "cultural": "kulturell", "maintenance": "Wartung", "staff training": "Schulung des Personals", "rooms": "Räume", "waiting zone": "Wartezone", "Ground floor": "Erdgeschoss", "Main hall": "Haupthalle", "Waiting area": "Wartebereich", "Card slot glows, screen: “Place your ID card”": "Kartenschlitz leuchtet, Bildschirm: „Ausweis auflegen“", "Places card, enters PIN behind privacy screen": "Legt den Ausweis auf, gibt die PIN hinter dem Sichtschutz ein", "Green glow and soft tone": "Grünes Leuchten und sanfter Ton", "Orange blink, clerk is notified after 3 tries": "Oranges Blinken, nach 3 Versuchen wird die Sachbearbeiterin informiert", "Card slot glows": "Kartenschlitz leuchtet", "Place ID card, enter PIN": "Ausweis auflegen, PIN eingeben", "Pulsing light while checking": "Pulsierendes Licht während der Prüfung", "Orange blink: PIN wrong": "Oranges Blinken: PIN falsch", "Green glow and tone": "Grünes Leuchten und Ton", "Ticket for the clerk appears": "Ticket für die Sachbearbeiterin erscheint", "Logging into systems": "In Systeme einloggen", "Securing data or artefacts": "Daten oder Artefakte sichern", "Documents are only shown after the card is placed": "Dokumente erscheinen erst, wenn der Ausweis aufliegt", "privacy screen, card slot": "Sichtschutz, Kartenschlitz", "Entering secure areas": "Gesicherte Bereiche betreten", "Exit gate opens with the temporary ID": "Ausgangsschranke öffnet mit dem vorläufigen Ausweis", "gate, reader": "Schranke, Lesegerät", "Overcoming barriers within a process": "Hürden in einem Prozess überwinden", "Paper prototype terminal": "Papierprototyp Terminal", "Citizens felt watched while typing the PIN": "Bürger*innen fühlten sich bei der PIN-Eingabe beobachtet", "Add a privacy screen and the turning ring": "Sichtschutz und Drehring ergänzen", "Cardboard terminal with ring": "Pappterminal mit Ring", "Ring is fun, but needs feedback": "Der Ring macht Spaß, braucht aber Feedback", "Light pattern when the ring clicks": "Lichtmuster, wenn der Ring einrastet", "fingerprint": "Fingerabdruck", "smartphone": "Smartphone", "vouching by a person": "Bürgschaft durch eine Person", "Terminal check-in": "Check-in am Terminal", "Card is familiar, PIN stays private behind a screen.": "Der Ausweis ist vertraut, die PIN bleibt hinter dem Sichtschutz privat.", "High-security change of address": "Hochsichere Ummeldung", "City hall recognises your walk": "Das Bürgeramt erkennt euren Gang", "Digital ID on the phone only": "Digitaler Ausweis nur auf dem Handy", "Future scenarios": "Zukunftsszenarien", "face": "Gesicht"};
  function exLocal(o) { if (S.lang !== "de") return o; (function walk(x) { if (Array.isArray(x)) { x.forEach(function (v, i) { if (typeof v === "string") { if (EX_DE[v]) x[i] = EX_DE[v]; } else if (v && typeof v === "object") walk(v); }); } else if (x && typeof x === "object") { Object.keys(x).forEach(function (k) { var v = x[k]; if (typeof v === "string") { if (k !== "id" && EX_DE[v]) x[k] = EX_DE[v]; } else if (v && typeof v === "object") walk(v); }); } })(o); return o; }
  function exampleProject() { return exLocal(exampleProjectRaw()); }
  function exampleProjectRaw() {
    return {
      name: "Digital City Hall", team: "Lea, Jonas & Mira (example)", example: true,
      acts: {
        1: { fields: {
          0: notes(["Citizens handle official matters such as renewing an ID or registering an address at self-service terminals in the city hall and online."]),
          1: notes(["Lea – UX design, keeps the activities going", "Jonas – computer science, prototyping", "Mira – product design, user research"]),
          2: notes(["How can citizens identify themselves at a public terminal without stress?", "Which data do people not want to show in a waiting area?"]),
          3: notes(["Interviews with citizens at the service centre – Mira", "Action observation in the waiting area – Jonas"]) } },
        2: { plan: { "basics:obs": { state: "done", who: "Jonas" }, "basics:interview": { state: "done", who: "Mira" }, "people:tangibles": { state: "planned", who: "Lea" }, "context:spatial": { state: "planned", who: "Jonas" }, "interact:proto": { state: "planned", who: "all" } } },
        3: { groups: [
          { id: "g1", title: "Citizens", expertise: "Everyday use of the ID card, very different digital skills", roles: ["Users"], contact: "Citizens' advisory board" },
          { id: "g2", title: "Clerks", expertise: "Know every edge case of the forms and help at the terminals", roles: ["Interest group"], contact: "Head of the service centre" },
          { id: "g3", title: "IT administrators", expertise: "Run the terminals, card readers and the identity system", roles: ["Project partners"], contact: "City IT department" } ] },
        4: { involve: { byGroup: {
          g1: { purpose: "Understand worries and routines around the ID card and personal data", methods: ["interview", "obs", "testing"], questions: "Where do you feel watched? What would make the terminal feel safe?", give: "Voucher for the city café", level: 1 },
          g2: { purpose: "Learn the edge cases and how clerks help today", methods: ["workshop", "shadow"], questions: "When do citizens ask for help? What do you check just by looking?", give: "Counts as working time and training", level: 2 },
          g3: { purpose: "Check technical feasibility early", methods: ["workshop", "desk"], questions: "Which readers and systems exist? What must not change?", give: "Early say in the concept", level: 2 } } } },
        7: { story: { panels: [
          { id: "st1", img: exSketch({ seed: 3, terminal: true, card: true, reach: true, px: 210, question: true }), caption: "Citizen holds the ID card over the reader and looks for the right spot", move: "Searching for the card slot, then tapping twice", fb: "No light on the reader – unclear whether it worked" },
          { id: "st2", img: exSketch({ seed: 7, terminal: true, pin: true, shield: true, px: 222, reach: true }), caption: "Typing the PIN while shielding the keypad with the other hand", move: "Covers the keypad, types quickly", fb: "Beep for every digit, dots on the screen" },
          { id: "st3", img: exSketch({ seed: 11, terminal: true, check: true, glow: true, clerk: true, nod: true, px: 230 }), caption: "Clerk nods from the counter when the screen turns green", move: "Looks up to the clerk", fb: "Green screen plus the clerk's nod as confirmation" } ] } },
        17: { fields: { 0: notes(["No new hardware: uses the existing ID card", "Shorter queues in the morning"]), 1: notes(["City halls", "Libraries and other public services"]), 2: notes(["Library lending stations", "Parking permits"]), 3: notes(["Licence per terminal", "Maintenance contract with the city IT"]) },
          c17: { concept: "Tap & nod terminal", value: "Citizens identify themselves in one step with their ID card, while the clerk confirms at a glance." } },
        18: { star: { concept: "Tap & nod terminal", persp: [
          { id: "sp1", label: "Employee", notes: "Clerks see at a glance who has checked in", fit: 75 },
          { id: "sp2", label: "Private person", notes: "The PIN stays private behind a screen", fit: 70 },
          { id: "sp3", label: "Citizen", notes: "Familiar ID card, no new account needed", fit: 85 },
          { id: "sp4", label: "Company", notes: "Low cost, but the readers need an update", fit: 55 } ] } },
        19: { blueprint: { steps: [
          { id: "bp1", label: "Taking a ticket", tp: "s2", cells: { 0: "Takes a ticket at the kiosk", 1: "Screen: “Your number is 42”", 2: "Ticket is queued", 3: "Queue system, no personal data" } },
          { id: "bp2", label: "Identifying at terminal", tp: "s4", cells: { 0: "Taps ID card, enters PIN behind the screen", 1: "Card slot glows, green tick", 2: "Card and PIN are checked", 3: "eID server of the city, ID card chip" } },
          { id: "bp3", label: "Paying the fee", tp: "s5", cells: { 0: "Pays by card", 1: "Amount and receipt", 2: "Payment is linked to the case", 3: "Payment provider" } },
          { id: "bp4", label: "Leaving with the temporary ID", tp: "s6", cells: { 0: "Holds the temporary ID at the gate", 1: "Gate opens", 2: "Temporary ID is validated", 3: "Access control system" } } ] } },
        20: { story: { panels: [
          { id: "uc1", img: exSketch({ seed: 5, terminal: true, clerk: true, px: 226, reach: true, card: true }), caption: "An older citizen asks the clerk for help at the terminal", who: "Citizen 70+, clerk", what: "Clerk explains the card slot, citizen types the PIN alone", where: "Self-service terminal, busy morning" },
          { id: "uc2", img: exSketch({ seed: 9, terminal: true, check: true, card: true, reach: true, px: 214, clock: true }), caption: "A student renews her ID card in her lunch break", who: "Student", what: "Taps card, enters PIN, pays – done in two minutes", where: "Terminal near the entrance" },
          { id: "uc3", img: exSketch({ seed: 13, clerk: true, clerkX: 120, question: true, px: 250 }), caption: "A citizen has forgotten the PIN", who: "Citizen, clerk", what: "Switches to the counter, clerk checks the ID visually", where: "Counter in the service centre" } ] } },
        24: { support: { improve: "Place a help button on the terminal that calls a clerk without leaving the queue.", cards: [
          { id: "su1", step: "s4", needs: "Older citizens unsure where to place the card", helper: "Clerks", how: "Clerk shows the glowing card slot from a distance" },
          { id: "su2", step: "s4", needs: "Someone forgot the PIN", helper: "Clerks", how: "Switch to the counter with a visual ID check" },
          { id: "su3", step: "s2", needs: "Visitors who do not speak German", helper: "Citizens", how: "Pictograms and language choice at the kiosk" } ] } },
        25: { prep: { manual: "One picture card next to the terminal: card, PIN behind the screen, green tick.", steps: [
          { id: "pr1", text: "Have the ID card ready", kind: "must" }, { id: "pr2", text: "Remember the PIN", kind: "must" },
          { id: "pr3", text: "Look around to check nobody is watching", kind: "ritual" }, { id: "pr4", text: "Put the bag down to have both hands free", kind: "ritual" } ] } },
        29: { infra: { nodes: [
          { id: "in1", type: "user", label: "Citizen", x: 10, y: 50, risk: false, riskText: "", fix: "" },
          { id: "in2", type: "authenticator", label: "ID card + PIN", x: 30, y: 24, risk: false, riskText: "", fix: "" },
          { id: "in3", type: "device", label: "Self-service terminal", x: 34, y: 70, risk: true, riskText: "Shoulder surfing at the PIN pad", fix: "Privacy screen and turning ring" },
          { id: "in4", type: "server", label: "eID server", x: 62, y: 50, risk: false, riskText: "", fix: "" },
          { id: "in5", type: "database", label: "Civil register", x: 88, y: 30, risk: true, riskText: "Central storage of address history", fix: "Only query what the case needs" },
          { id: "in6", type: "service", label: "Payment provider", x: 86, y: 76, risk: false, riskText: "", fix: "" } ],
          links: [["in1", "in2", false], ["in2", "in3", false], ["in3", "in4", false], ["in4", "in5", false], ["in3", "in6", true]] } },
        5: { rings: { migrated: true, items: [
          { id: "r1", text: "Service centre", x: 22, y: 18 }, { id: "r2", text: "Busy mornings", x: 85, y: 34 },
          { id: "r3", text: "Citizens", x: 24, y: 30 }, { id: "r4", text: "Clerks", x: 79, y: 58 },
          { id: "r5", text: "ID card", x: 35, y: 63 }, { id: "r6", text: "Waiting ticket", x: 66, y: 34 },
          { id: "r7", text: "Tap card on reader", x: 50, y: 50 } ] } },
        6: { journey: { title: "Renewing an ID card", desc: "Working citizen, first visit at the new self-service city hall",
          steps: [
            { id: "s1", x: 6, label: "Arriving at city hall", tp: false, rows: { 0: "Enters main hall", 4: "Unsure where to go" } },
            { id: "s2", x: 22, label: "Taking a ticket", tp: true, rows: { 0: "Ticket kiosk", 2: "Old ID card", 3: "Get in the queue", 5: "Quick, no data shown" } },
            { id: "s3", x: 40, label: "Waiting", tp: false, rows: { 1: "Other citizens", 4: "Bored, a bit nervous" } },
            { id: "s4", x: 58, label: "Identifying at terminal", tp: true, rows: { 0: "Self-service terminal", 1: "Clerk nearby", 2: "ID card, PIN", 3: "Prove identity", 4: "Watched by others?", 5: "Privacy screen" } },
            { id: "s5", x: 76, label: "Paying the fee", tp: true, rows: { 0: "Card payment", 2: "Bank card", 4: "Routine" } },
            { id: "s6", x: 93, label: "Leaving building with ID card", tp: true, rows: { 0: "Exit gate", 2: "Temporary ID", 4: "Relieved" } } ] } },
        8: { fields: { 0: notes(["Biometric photo", "Tax ID", "Address history"]), 1: notes(["ID card chip data"]), 2: notes(["Birth certificate", "Passport", "Waiting ticket"]) } },
        9: { close: { people: [{ id: "p1", name: "Citizens" }, { id: "p2", name: "Clerks" }], items: [
          { id: "c1", text: "Biometric photo", lane: "p1", y: 14 }, { id: "c2", text: "Birth certificate", lane: "p1", y: 30 }, { id: "c3", text: "Waiting ticket", lane: "p1", y: 86 },
          { id: "c4", text: "Tax ID", lane: "p2", y: 62 }, { id: "c5", text: "Address history", lane: "p2", y: 42 } ] } },
        10: { zoneSet: "emotional", zones: {
          emotional: { zones: [{ label: "Only me", auth: "Fingerprint" }, { label: "Me and the clerk", auth: "ID card + PIN" }, { label: "City hall staff", auth: "Staff card" }, { label: "Anyone in the hall", auth: "No authentication" }],
            items: [{ id: "i1", text: "Biometric photo", x: 56, y: 37 }, { id: "i2", text: "Tax ID", x: 33, y: 52 }, { id: "i3", text: "Address history", x: 68, y: 63 }, { id: "i4", text: "Waiting ticket", x: 18, y: 22 }, { id: "i5", text: "Birth certificate", x: 47, y: 72 }] },
          technical: { zones: [{ label: "", auth: "" }, { label: "", auth: "" }, { label: "", auth: "" }, { label: "", auth: "" }], items: [] } } },
        15: { dirs: { values: { b0: 22, b1: 18, b2: 35, b3: 30, b4: 62, b5: 78, b6: 40, b8: 25 }, custom: [], anomalies: "Collective use at the ticket kiosk, but individual use at the terminal." } },
        16: { map: { active: "cs1", legend: { rect: "devices", circle: "people" }, sheets: [
          { id: "cs1", name: "Tap & nod terminal", img: null, items: [
            { id: "cm1", kind: "rect", x: 20, y: 18, w: 46, h: 58, label: "Terminal with privacy screen" }, { id: "cm2", kind: "rect", x: 30, y: 60, w: 26, h: 10, label: "Glowing card slot" },
            { id: "cm3", kind: "circle", x: 110, y: 52, r: 13, label: "Citizen" }, { id: "cm4", kind: "circle", x: 150, y: 22, r: 10, label: "Clerk at the counter" },
            { id: "cm5", kind: "path", label: "Card tap", pts: [[98, 56], [76, 62], [58, 65]] }, { id: "cm6", kind: "path", label: "Nod", pts: [[142, 28], [124, 40], [116, 44]] } ] },
          { id: "cs2", name: "Turning ring PIN", img: null, items: [
            { id: "cr1", kind: "circle", x: 60, y: 48, r: 22, label: "Ring with numbers" }, { id: "cr2", kind: "circle", x: 60, y: 48, r: 6, label: "Light shows each click" },
            { id: "cr3", kind: "rect", x: 100, y: 30, w: 44, h: 34, label: "Screen shows only dots" } ] } ] } },
        11: { relabel: { cards: [
          { id: "rl1", object: "Combination lock", mechanism: "rotating dials to a secret sequence", metaphor: { verb: "turn", adj: "secretly", noun: "dial" }, auth: "Turning a ring on the terminal in a personal rhythm instead of typing a PIN", tp: "s4" },
          { id: "rl2", object: "Handshake", mechanism: "gripping, shaking, letting go", metaphor: { verb: "greet", adj: "warmly", noun: "clerk" }, auth: "The clerk confirms identity with a short greeting ritual", tp: "s4" } ] } },
        12: { quotes: { items: [
          { id: "qq1", text: "I don't want everyone in the queue to see my data.", kind: "quote", who: "Citizens", vision: "", src: { role: "Citizen, about 40", method: "Interview", date: "2026-03-12", context: "Asked about the waiting area" } },
          { id: "qq2", text: "If the card works, I don't need to think about it.", kind: "quote", who: "Citizens", vision: "eutopia", src: { role: "Citizen, student", method: "Interview", date: "2026-03-12", context: "Talking about the ideal check-in" } },
          { id: "qq3", text: "Turns the ID card face down while waiting", kind: "action", who: "Citizens", vision: "", src: { role: "Citizen, 60+", method: "Action Observation", date: "2026-03-14", context: "Waiting area, busy morning" } },
          { id: "qq4", text: "Soon the terminal will know everything about us.", kind: "quote", who: "Clerks", vision: "dystopia", src: { role: "Clerk", method: "Interdisciplinary Ideation Workshop", date: "2026-04-02", context: "Future scenarios for the city hall" } } ] } },
        13: { reqs: { rows: [
          { id: "q1", source: "„I don't want everyone in the queue to see my data.“", user: "Citizens", req: "Personal data is never shown on public screens", prio: "must" },
          { id: "q2", source: "„If the card works, I don't need to think about it.“", user: "Citizens", req: "Authentication with the familiar ID card works in one step", prio: "should" } ] } },
        30: { wall: { notes: [
          { id: "w1", cat: "worked", text: "Bodystorming in the real waiting area", x: 5, y: 8, r: -1.5 }, { id: "w2", cat: "not", text: "Too little time for the video analysis", x: 30, y: 12, r: 1.2 },
          { id: "w3", cat: "next", text: "Invite clerks to the first workshop", x: 55, y: 10, r: -.8 }, { id: "w4", cat: "who", text: "Mira ran the interviews, Jonas built the prototype", x: 76, y: 40, r: 1.6 } ] } },
        32: { mind: { nodes: [
          { id: "root", text: "Possible factors", x: 50, y: 50, parent: null, strategy: "" },
          { id: "mf1", text: "financial", x: 24, y: 24, parent: "root", strategy: "Reuse existing card readers" }, { id: "mf2", text: "ethical", x: 78, y: 26, parent: "root", strategy: "Offer a non-biometric alternative" },
          { id: "mf3", text: "cultural", x: 74, y: 78, parent: "root", strategy: "" }, { id: "mf4", text: "maintenance", x: 22, y: 76, parent: "root", strategy: "" },
          { id: "mf5", text: "staff training", x: 9, y: 92, parent: "mf4", strategy: "" } ] } },
        14: { map: { active: "sh1", legend: { rect: "rooms", circle: "waiting zone" }, sheets: [{ id: "sh1", name: "Ground floor", img: null, items: [
          { id: "m1", kind: "rect", x: 8, y: 10, w: 60, h: 45, label: "Main hall" }, { id: "m2", kind: "rect", x: 80, y: 10, w: 70, h: 45, label: "Service centre" },
          { id: "m3", kind: "circle", x: 38, y: 74, r: 14, label: "Waiting area" },
          { id: "m4", kind: "tp", x: 30, y: 30, num: 1, label: "Taking a ticket" }, { id: "m5", kind: "tp", x: 105, y: 30, num: 2, label: "Identifying at terminal" }, { id: "m6", kind: "tp", x: 140, y: 85, num: 4, label: "Exit gate" },
          { id: "m7", kind: "path", label: "", pts: [[4, 50], [30, 36], [36, 68], [100, 38], [138, 80]] } ] }] } },
        21: { signals: { moments: [
          { id: "g1", name: "Identifying at terminal", tpId: "s4", cells: { ff: { text: "Card slot glows, screen: “Place your ID card”", mods: ["light", "screen"], pattern: "-" }, act: { text: "Places card, enters PIN behind privacy screen", mods: ["shape"], pattern: "" }, pos: { text: "Green glow and soft tone", mods: ["light", "sound"], pattern: ".." }, neg: { text: "Orange blink, clerk is notified after 3 tries", mods: ["light", "person"], pattern: "..." } } } ] } },
        22: { flow: { steps: [
          { id: "fl1", type: "ff", text: "Card slot glows", retry: "" }, { id: "fl2", type: "act", text: "Place ID card, enter PIN", retry: "" }, { id: "fl3", type: "proc", text: "Pulsing light while checking", retry: "" },
          { id: "fl4", type: "neg", text: "Orange blink: PIN wrong", retry: "fl2" }, { id: "fl5", type: "pos", text: "Green glow and tone", retry: "" }, { id: "fl6", type: "end", text: "Ticket for the clerk appears", retry: "" } ] } },
        23: { patterns: { list: [
          { id: "pt1", label: "Logging into systems", on: false, text: "", tp: "", elements: "" }, { id: "pt2", label: "Securing data or artefacts", on: true, text: "Documents are only shown after the card is placed", tp: "s4", elements: "privacy screen, card slot" },
          { id: "pt3", label: "Entering secure areas", on: true, text: "Exit gate opens with the temporary ID", tp: "s6", elements: "gate, reader" }, { id: "pt4", label: "Overcoming barriers within a process", on: false, text: "", tp: "", elements: "" } ] } },
        31: { iter: { versions: [
          { id: "v1", name: "Paper prototype terminal", feedback: "Citizens felt watched while typing the PIN", changes: "Add a privacy screen and the turning ring", met: ["q2"] },
          { id: "v2", name: "Cardboard terminal with ring", feedback: "Ring is fun, but needs feedback", changes: "Light pattern when the ring clicks", met: ["q1", "q2"] } ] } },
        26: { fields: { 0: notes(["fingerprint", "face"]), 1: notes(["ID card", "smartphone"]), 2: notes(["PIN"]), 3: notes(["vouching by a person"]) } },
        27: { mfa: { active: "m1", extra: [], combos: [
          { id: "m1", name: "Terminal check-in", where: "s4", why: "Card is familiar, PIN stays private behind a screen.", factors: [{ p: 1, text: "ID card" }, { p: 2, text: "PIN" }] },
          { id: "m2", name: "High-security change of address", where: "", why: "", factors: [{ p: 1, text: "ID card" }, { p: 0, text: "face" }, { p: 3, text: "vouching by a person" }] } ] } },
        28: { future: { migrated: true, items: [{ id: "f1", text: "Tap & nod terminal", x: 30, y: 22 }, { id: "f2", text: "City hall recognises your walk", x: 24, y: 74 }, { id: "f3", text: "Digital ID on the phone only", x: 72, y: 70 }] } }
      }
    };
  }

  route();
})();
