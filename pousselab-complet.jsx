import React from "react";
import { useState, useRef, useEffect } from "react";
const C={cream:"#F7F3EC",bark:"#1E1208",moss:"#2E5C26",terra:"#B84E1E",sand:"#C8B898",light:"#EAE0CC",white:"#FDFAF5",muted:"#5C4030",gold:"#D4850A"};
const STRIPE={balcon:"https://buy.stripe.com/VOTRE_LIEN_BALCON",terrasse:"https://buy.stripe.com/VOTRE_LIEN_TERRASSE",famille:"https://buy.stripe.com/VOTRE_LIEN_FAMILLE",interieur:"https://buy.stripe.com/VOTRE_LIEN_INTERIEUR",hydro:"https://buy.stripe.com/VOTRE_LIEN_HYDRO"};
const FORMATIONS=[
  {id:"balcon",emoji:"🏙️",badge:"Le plus choisi",title:"Balcon & Appartement",price:89,old:129,bg:"#2A4F24",acc:"#A8E090",tag:"Vos premiers légumes maison",desc:"Tomates cerises, herbes aromatiques, salades et engrais maison. Tout pour démarrer même sans jardin.",modules:7,lessons:28,duree:"6 semaines",videos:28,students:1420,rating:4.9,tags:["Débutant","Petit espace","Rapide"],stripe:"balcon",
  public:"Débutant total, personne en appartement, locataire, citadin avec peu de temps.",
  resultats:"Un plan d'installation, 3 contenants adaptés, 1 calendrier de semis, 1 routine d'arrosage, 1 programme d'engrais maison.",
  contenu:["Module 1 : Comprendre son espace","Module 2 : Le matériel minimal utile","Module 3 : Le substrat et le rempotage","Module 4 : Arrosage intelligent","Module 5 : Cultures idéales en petit espace","Module 6 : Nutrition naturelle","Module 7 : Récolte et entretien"],
  mods:[
    {title:"Module 1 — Comprendre son espace",lecons:["Lire l'exposition du balcon (sud, est, ouest, nord)","Identifier vent, soleil, ombre et chaleur des murs","Différence entre rebord de fenêtre, balcon, loggia et petite terrasse","Choisir les zones selon les plantes et leurs besoins"],ex:"Dessiner son balcon et placer 3 zones de culture optimales"},
    {title:"Module 2 — Le matériel minimal utile",lecons:["Pots, bacs, jardinières, suspensions et sacs de culture","Drainage, soucoupe, billes d'argile et terreau adapté","Outils de base vraiment indispensables (arrosoir, transplantoir, ficelle)","Quoi acheter en premier et quoi éviter absolument"],ex:"Créer une liste d'achat selon 3 budgets : 30€, 60€ et 100€"},
    {title:"Module 3 — Le substrat et le rempotage",lecons:["Pourquoi le terreau doit être léger et bien aéré","Pourquoi on évite la terre de jardin dans les pots","Mélanges simples pour légumes, aromatiques et salades","Rempoter sans stresser le plant — gestes et timing"],ex:"Rempoter une plante ou simuler le montage d'un pot complet"},
    {title:"Module 4 — Arrosage intelligent",lecons:["Fréquence d'arrosage selon la taille du pot et la saison","Arroser à la base et jamais sur le feuillage","Reconnaître les signes d'excès et de manque d'eau","Les erreurs de débutant à éviter en été (chaleur, soleil direct)"],ex:"Établir sa routine d'arrosage personnalisée matin/soir"},
    {title:"Module 5 — Cultures idéales en petit espace",lecons:["Tomates cerises : choix de variété, conduite, récolte","Basilic, persil, ciboulette, menthe : taille et récolte","Laitues, roquette, épinards : semer en échelonné","Radis et micropousses : résultats rapides en 10 à 25 jours"],ex:"Sélectionner 5 plantes adaptées à son exposition et son espace"},
    {title:"Module 6 — Nutrition naturelle",lecons:["Marc de café, coquilles d'œufs, eau de cuisson, peau de banane","Quand utiliser chaque recette selon le stade de la plante","Dosage, fréquence et risques d'excès à connaître","Créer sa feuille de suivi d'apports nutritifs"],ex:"Bâtir un planning d'engrais maison complet sur 4 semaines"},
    {title:"Module 7 — Récolte et entretien",lecons:["Récolter sans bloquer la repousse des herbes et salades","Taille légère des aromatiques pour prolonger la production","Quand et comment renouveler le substrat","Comment garder un pot propre, sain et durable"],ex:"Checklist hebdomadaire d'entretien en 10 minutes chrono"},
  ]},
  {id:"terrasse",emoji:"🌞",badge:"Coup de cœur",title:"Terrasse Productive",price:119,old:169,bg:"#7A3A10",acc:"#FFD4A8",tag:"Un vrai potager sur terrasse",desc:"Courgettes, tomates, poivrons, haricots. Module engrais maison et purins naturels complet.",modules:6,lessons:24,duree:"8 semaines",videos:24,students:980,rating:4.8,tags:["Intermédiaire","Grande récolte","Famille"],stripe:"terrasse",
  public:"Personne avec de la place, famille voulant du rendement, jardinier intermédiaire.",
  resultats:"Plan de terrasse, calendrier de rotation, routine de surveillance, programme d'engrais naturel.",
  contenu:["Module 1 : Concevoir la terrasse","Module 2 : Tomates grosses variétés","Module 3 : Courgettes et concombres","Module 4 : Poivrons, piments et aubergines","Module 5 : Purins et recettes naturelles","Module 6 : Prévention et associations"],
  mods:[
    {title:"Module 1 — Concevoir la terrasse",lecons:["Zones de soleil fort, de semi-ombre et de passage piétons","Circulation, sécurité et poids des bacs (charge par m²)","Verticalité et gain de place : treillis, palissage, claustras","Supports, treillis et tuteurs pour cultures grimpantes"],ex:"Faire un plan de terrasse à l'échelle avec zones et cultures"},
    {title:"Module 2 — Tomates grosses variétés",lecons:["Choisir des variétés adaptées au pot (Cœur de bœuf, Andine, Marmande)","Profondeur de bac (minimum 40 cm) et besoins racinaires","Taille, tuteurage et pince des gourmands semaine par semaine","Prévenir le mildiou, l'oïdium et les maladies foliaires"],ex:"Plan de soin complet d'un plant de tomate de mai à septembre"},
    {title:"Module 3 — Courgettes et concombres",lecons:["Besoin en eau élevé et volume de sol minimum (40L par plant)","Pollinisation et rôle des fleurs mâles et femelles","Récolte régulière : impérative pour maintenir la production","Conduite verticale du concombre sur treillis ou filet"],ex:"Calendrier de récolte et d'arrosage sur toute la saison"},
    {title:"Module 4 — Poivrons, piments et aubergines",lecons:["Besoin de chaleur : pas avant 15°C la nuit, 25°C le jour idéal","Semis précoces en intérieur dès janvier-février","Floraison, nouaison et maturation : patience et observation","Symptômes d'un stress thermique ou hydrique : comment réagir"],ex:"Choisir la bonne stratégie de culture selon son climat et emplacement"},
    {title:"Module 5 — Purins et recettes naturelles",lecons:["Purin d'ortie : préparation, dilution et utilisation optimale","Purin de consoude : le roi du potassium pour la floraison","Épluchures de banane en macération : simple et efficace","Dosage et dilutions selon les stades : croissance, floraison, fructification"],ex:"Créer un calendrier d'apports naturels adapté à chaque stade"},
    {title:"Module 6 — Prévention et associations",lecons:["Plantes compagnes utiles : basilic/tomate, œillet d'Inde/légumes","Observation des ravageurs : pucerons, doryphores, mouches","Gestion du stress hydrique en période de chaleur","Solution simple quand une plante ralentit ou montre des signes"],ex:"Construire une association bénéfique pour sa terrasse"},
  ]},
  {id:"famille",emoji:"👨‍👩‍👧",badge:"⭐ Famille",title:"Jardin en Famille",price:79,old:109,bg:"#1A4A2E",acc:"#90E0B0",tag:"Cultiver avec vos enfants",desc:"Jardiner avec vos enfants, fabriquer les engrais ensemble — apprendre d'où vient la nourriture.",modules:5,lessons:20,duree:"4 semaines",videos:20,students:640,rating:5.0,tags:["Famille","Pédagogique","Tous âges"],stripe:"famille",
  public:"Familles, parents, grands-parents, éducateurs, enfants curieux de 4 à 14 ans.",
  resultats:"Mini-projet famille, carnet de récoltes illustré, défi hebdomadaire, routine d'observation simple.",
  contenu:["Module 1 : Cultures rapides et motivantes","Module 2 : Observer le vivant","Module 3 : Fabriquer ses engrais maison","Module 4 : Créer un rituel","Module 5 : Le carnet de récoltes"],
  mods:[
    {title:"Module 1 — Cultures rapides et motivantes",lecons:["Pourquoi les enfants ont besoin de voir des résultats vite","Radis (25j), mesclun (18j), micropousses (10j), laitues, herbes","Semis faciles à manipuler avec de petites mains","Récoltes à rythme court pour maintenir l'enthousiasme"],ex:"Choisir ensemble 3 plantes à effet waouh garanti"},
    {title:"Module 2 — Observer le vivant",lecons:["Graines, racines, feuilles, tiges : comprendre chaque partie","Croissance mesurable jour après jour : carnet de suivi","Comprendre le rôle de l'eau, du soleil, de l'air et de la terre","Parler simplement du rôle des vers de terre et des insectes utiles"],ex:"Fiche d'observation illustrée à remplir chaque jour avec l'enfant"},
    {title:"Module 3 — Fabriquer ses engrais maison",lecons:["Eau de cuisson refroidie : l'engrais du lendemain de repas","Coquilles d'œufs broyées : calcium naturel anti-limaces","Marc de café séché : répulsif et fertilisant léger","Peau de banane en macération : potassium express pour la floraison"],ex:"Atelier cuisine-potager en famille : transformer les déchets en ressources"},
    {title:"Module 4 — Créer un rituel",lecons:["Arrosage court et régulier : 5 minutes, même heure chaque jour","Observation de 5 minutes : qu'est-ce qui a changé depuis hier ?","Petit geste quotidien suffisant pour que les plantes prospèrent","Éviter la surcharge d'informations qui démotive les enfants"],ex:"Écrire et afficher sa routine familiale du mercredi (ou du matin)"},
    {title:"Module 5 — Le carnet de récoltes",lecons:["Dessiner ce qui pousse : formes, couleurs, tailles observées","Dater les semis et les récoltes pour comprendre le temps de culture","Noter les réussites et ce qu'on a appris de ses erreurs","Transformer l'activité en souvenir et en fierté partagée"],ex:"Première page du carnet : ce que j'ai cultivé moi-même"},
  ]},
  {id:"interieur",emoji:"🪟",badge:"Tendance",title:"Intérieur & Lumière",price:69,old:99,bg:"#2A3A6A",acc:"#B8D4FF",tag:"Cultiver 365 jours par an",desc:"Micropousses, herbes et salades sous LED. Engrais maison adaptés à la culture intérieure inclus.",modules:5,lessons:20,duree:"5 semaines",videos:20,students:520,rating:4.7,tags:["Appartement","Sans soleil","Toute l'année"],stripe:"interieur",
  public:"Appartement sombre, hiver, personne voulant produire toute l'année, amateur de culture indoor.",
  resultats:"Plan d'éclairage, liste de matériel, routine d'hygiène, plateau de micropousses opérationnel, mini-système Kratky.",
  contenu:["Module 1 : Les bases de la lumière","Module 2 : Micropousses","Module 3 : Aromatiques et salades en intérieur","Module 4 : Gestion de l'humidité","Module 5 : Kratky débutant"],
  mods:[
    {title:"Module 1 — Les bases de la lumière",lecons:["Intensité (lux, PPFD), durée (heures/jour) et distance lampe-plante","Comprendre la réponse des plantes : étiolement, brûlure, bon équilibre","Éviter l'étiolement : distance minimale et durée suffisante","Placer correctement une lampe LED pour couvrir toute la surface"],ex:"Établir un plan d'éclairage hebdomadaire pour sa zone de culture"},
    {title:"Module 2 — Micropousses",lecons:["Espèces faciles : tournesol, brocoli, radis, pois, tournesol","Semis dense mais propre : densité, humidité initiale, couverture","Humidité idéale en germination et après levée : éviter les moisissures","Récolte à 7-14 jours : au bon moment, avec de bons outils"],ex:"Lancer un premier plateau de micropousses en conditions réelles"},
    {title:"Module 3 — Aromatiques et salades en intérieur",lecons:["Basilic, persil, coriandre, laitue : leurs besoins spécifiques","Arrosage léger et aération : l'air circule, le substrat respire","Éviter les maladies : fonte des semis, moisissures, moucherons","Récolte feuille à feuille pour prolonger la production au maximum"],ex:"Créer une mini-zone de culture efficace sur une étagère ou un rebord"},
    {title:"Module 4 — Gestion de l'humidité",lecons:["Excès d'eau : identifier et corriger rapidement avant perte du plant","Condensation et moisissures : causes et solutions simples","Moucherons du terreau : prévention et traitement naturel","Circulation d'air : ventilateur, fenêtre, espacement entre pots"],ex:"Checklist anti-humidité en 10 points pour une culture saine"},
    {title:"Module 5 — Kratky débutant",lecons:["Principe du système : réservoir passif, pas de pompe, simple","Contenants, panier filet, niveau d'eau optimal et fréquence de contrôle","Premières plantes adaptées : laitue, basilic, épinard, cresson","Surveillance simple : couleur des racines, niveau d'eau, santé foliaire"],ex:"Monter son premier mini-système Kratky avec une bouteille ou un bocal"},
  ]},
  {id:"hydro",emoji:"💧",badge:"🆕 Exclusif",title:"Hydroponie Maison",price:99,old:149,bg:"#0E5A7A",acc:"#B0E8FF",tag:"Cultiver sans terre toute l'année",desc:"Zéro terre, zéro substrat. Laitues, tomates et fraises en solution nutritive. 90% moins d'eau.",modules:6,lessons:24,duree:"4 semaines",videos:24,students:310,rating:4.9,tags:["Innovant","Sans terre","Appartement"],stripe:"hydro",
  public:"Curieux de technique, passionné, personne souhaitant produire en intérieur de manière moderne.",
  resultats:"Système monté, fiche de mesures, tableau de réglages pH/EC, programme d'entretien, guide de diagnostic.",
  contenu:["Module 1 : Les 3 systèmes — NFT, DWC, Kratky","Module 2 : Eau, nutriments, pH et EC","Module 3 : Réaliser un NFT","Module 4 : Réaliser un DWC","Module 5 : Éclairage LED full-spectrum","Module 6 : Carences, algues, pH instable — diagnostic"],
  mods:[
    {title:"Module 1 — Choisir son système",lecons:["NFT (Nutrient Film Technique) : film nutritif en circulation continue","DWC (Deep Water Culture) : racines immergées en solution oxygénée","Kratky : système passif sans pompe ni électricité","Savoir choisir selon ses contraintes : espace, temps, budget, culture visée"],ex:"Comparer les 3 systèmes et sélectionner le bon pour 3 profils différents"},
    {title:"Module 2 — Eau, nutriments, pH et EC",lecons:["Rôle des macro-éléments (N, P, K) et micro-éléments (Ca, Mg, Fe, Zn…)","Pourquoi le pH (6.0–6.5) est essentiel à l'absorption de chaque nutriment","Pourquoi l'EC indique la concentration et la force de la solution nutritive","Logique de dilution ou de correction : quand ajuster et comment"],ex:"Lire une fiche de nutrition et proposer un réglage adapté à la plante"},
    {title:"Module 3 — Réaliser un NFT",lecons:["Gouttières ou tubes PVC : pente idéale (1 à 3%), débit recommandé","Plants adaptés : laitues, épinards, basilic, cresson, herbes aromatiques","Racines, circulation et oxygénation : pourquoi le film doit être fin","Démarrage propre : stérilisation, premiers plants, premiers réglages"],ex:"Dessiner le schéma complet d'un NFT domestique avec cotes"},
    {title:"Module 4 — Réaliser un DWC",lecons:["Cuve, pompe à air, diffuseurs et maintien en suspension des plants","Température de l'eau : entre 18 et 22°C, jamais plus de 25°C","Maintien et fixation des plants dans les paniers : stabilité et accès aux racines","Prévention des racines brunes : hygiène, obscurité, changements d'eau"],ex:"Check-list complète de montage DWC avant le premier démarrage"},
    {title:"Module 5 — Éclairage LED full-spectrum",lecons:["Puissance nécessaire selon la surface cultivée (40–60W/m² minimum)","Durée d'éclairage : 14–16h pour croissance, 12h pour fructification","Distance lampe-plante : éviter brûlures et étiolement, ajuster en croissance","Consommation électrique réelle et rendement par gramme produit"],ex:"Calibrer une installation lumineuse pour 3 types de systèmes différents"},
    {title:"Module 6 — Diagnostic complet",lecons:["Carences visibles : jaunissement, taches, déformation selon le nutriment manquant","Algues vertes : causes (lumière dans la solution), traitement et prévention","pH instable : causes (évaporation, racines actives), méthode de stabilisation","Racines en souffrance : brun = problème, blanc = sain — comment distinguer"],ex:"Cas pratiques : diagnostiquer et corriger 5 scénarios de problèmes réels"},
  ]},
];
const QUIZZES={
  balcon:[
    {q:"Pour une tomate cerise en pot, quel volume minimum est le plus cohérent ?",opts:["4 litres","8 litres","12 litres"],a:2},
    {q:"Quel engrais maison est surtout utile pendant la floraison et la fructification ?",opts:["Marc de café en excès","Épluchures de banane","Eau salée"],a:1},
    {q:"Pour récolter des salades longtemps, la meilleure stratégie est :",opts:["Semer en petites quantités toutes les 2 à 3 semaines","Semer tout le sachet d'un coup","Arroser moins pour ralentir la pousse"],a:0},
    {q:"Quel geste évite le plus souvent les problèmes sur tomates en balcon ?",opts:["Arroser les feuilles en plein soleil","Laisser toujours de l'eau dans la soucoupe","Arroser à la base et vérifier le drainage"],a:2},
    {q:"Quelle plante est idéale pour un débutant en petit espace ?",opts:["Pastèque","Basilic","Courge géante"],a:1},
  ],
  terrasse:[
    {q:"Quel purin est le plus lié à la floraison et aux fruits ?",opts:["Purin d'ortie","Purin de consoude","Eau sucrée"],a:1},
    {q:"Une courgette productive en pot demande en priorité :",opts:["Peu d'eau et peu de volume","Une taille quotidienne","Un grand bac et des récoltes régulières"],a:2},
    {q:"Pour limiter le mildiou des tomates, on évite surtout :",opts:["L'humidité stagnante sur le feuillage","Le soleil du matin","Les tuteurs"],a:0},
    {q:"Le concombre conduit à la verticale permet surtout :",opts:["De supprimer l'arrosage","De gagner de la place et d'aérer la plante","D'éviter toute maladie"],a:1},
    {q:"Sur une terrasse productive, la meilleure logique est :",opts:["Multiplier les plantes sans plan","Remplir de petits pots identiques","Organiser l'espace avant de planter"],a:2},
  ],
  famille:[
    {q:"Pour garder un enfant motivé, on choisit en priorité :",opts:["Des cultures rapides et visibles","Des cultures longues et complexes","Seulement des plantes décoratives"],a:0},
    {q:"Quel engrais maison est le plus simple à réutiliser juste après un repas ?",opts:["Cendres chaudes","Purin fermenté de 3 semaines","Eau de cuisson refroidie"],a:2},
    {q:"Les vers de terre sont utiles parce qu'ils :",opts:["Mangent les feuilles des tomates","Aèrent et enrichissent le sol","Empêchent la lumière d'atteindre les plantes"],a:1},
    {q:"Le carnet de récolte sert surtout à :",opts:["Valoriser l'apprentissage et suivre les progrès","Remplacer l'arrosage","Éviter les semis"],a:0},
    {q:"Une bonne activité famille au potager doit être :",opts:["Très longue et compliquée","Théorique uniquement","Courte, concrète et gratifiante"],a:2},
  ],
  interieur:[
    {q:"En culture intérieure, la distance lampe/plante influence surtout :",opts:["Le goût de l'eau","L'intensité réellement reçue par la plante","La couleur du pot"],a:1},
    {q:"Quelle culture est particulièrement adaptée pour débuter en intérieur ?",opts:["Les micropousses","Les courges longues","Le maïs"],a:0},
    {q:"Le principal risque d'un excès d'eau en intérieur est :",opts:["Une croissance trop rapide","Un parfum plus fort","Les moisissures et les moucherons"],a:2},
    {q:"Le système Kratky a pour avantage principal :",opts:["D'exiger une pompe permanente","D'être simple à monter pour débuter","De fonctionner sans eau"],a:1},
    {q:"Pour des aromatiques sous LED, la meilleure logique est :",opts:["Observer et ajuster lumière + arrosage selon leur réaction","Toujours laisser le substrat détrempé","Couper la lampe chaque jour au hasard"],a:0},
  ],
  hydro:[
    {q:"Quelle option décrit le mieux la différence entre NFT et DWC ?",opts:["NFT et DWC sont strictement identiques","DWC n'utilise jamais d'eau","NFT fait circuler une lame nutritive, DWC maintient les racines dans une solution oxygénée"],a:2},
    {q:"Le pH sert principalement à :",opts:["Vérifier si la solution permet une bonne absorption des nutriments","Mesurer la couleur des feuilles","Compter les racines"],a:0},
    {q:"L'EC permet surtout de suivre :",opts:["Le nombre de graines semées","La concentration globale en nutriments dissous","La température de la pièce"],a:1},
    {q:"Des algues apparaissent souvent quand :",opts:["Il n'y a plus aucun nutriment","Le système est trop sombre","La lumière atteint la solution nutritive"],a:2},
    {q:"Pour débuter en hydroponie, la meilleure approche est :",opts:["Commencer simple et stabiliser un petit système","Installer un gros système complexe immédiatement","Ignorer le pH et l'EC"],a:0},
  ],
};

const ENGRAIS=[
  {id:"ortie",name:"Purin d'ortie",emoji:"🌿",cat:"Purin fermenté",col:"#2A5A1A",colL:"#EAF5E0",diff:"Facile",temps:"2–3 semaines",cout:"Gratuit",richesse:["Azote (N)","Potassium (K)","Fer","Magnésium"],effet:"Le plus puissant des engrais naturels. Stimule la croissance, renforce les défenses. Universel au potager.",ingredients:["1 kg de feuilles d'orties fraîches (avant floraison)","10 litres d'eau de pluie (jamais chlorée)","1 seau plastique (pas métallique)"],etapes:["Cueillez les orties avec des gants — feuilles et tiges","Hachez grossièrement et mettez dans le seau","Couvrez de 10L d'eau de pluie","Remuez avec un bâton en bois toutes les 48h","Couvrez partiellement — laissez fermenter 2 à 3 semaines","Prêt quand les bulles ont disparu et l'odeur est forte","Filtrez avec un tissu — stockez en bouteille fermée"],dilutions:[{mode:"Engrais arrosage au pied",ratio:"1L purin pour 10L eau (10%)"},{mode:"Répulsif pucerons pulvérisé",ratio:"1L purin pour 20L eau (5%)"}],cibles:["Tomates","Courgettes","Salades","Épinards","Tous légumes-feuilles"],freq:"Toutes les 2 semaines de Mars à Septembre",eviter:["Haricots","Pois","Oignons"],warning:"Odeur très forte — préparez en extérieur. Récipient plastique uniquement. Ne jamais arroser le feuillage direct."},
  {id:"consoude",name:"Purin de consoude",emoji:"🌸",cat:"Purin fermenté",col:"#5A1A5A",colL:"#F5E8F5",diff:"Facile",temps:"3–4 semaines",cout:"Gratuit si vous avez la plante",richesse:["Potassium (K)","Phosphore (P)","Calcium","Bore"],effet:"Roi de la floraison et des fruits. Associé au purin d'ortie = NPK complet 100% naturel gratuit.",ingredients:["1 kg de feuilles de consoude fraîches","10 litres d'eau de pluie","1 seau plastique"],etapes:["Récoltez les feuilles de consoude","Hachez et placez dans le seau","Couvrez d'eau de pluie — remuez tous les 2 jours","Laissez macérer 3 à 4 semaines à l'ombre","Filtrez soigneusement — le liquide doit être sombre"],dilutions:[{mode:"Engrais floraison arrosage",ratio:"1L purin pour 10L eau (10%)"},{mode:"Pulvérisation foliaire",ratio:"1L purin pour 20L eau (5%)"}],cibles:["Tomates","Fraises","Poivrons","Concombres","Courgettes"],freq:"Toutes les 3 semaines dès apparition des premières fleurs",eviter:["Salades","Épinards"],warning:"Mélangez ortie + consoude 50/50 pour un NPK complet parfait."},
  {id:"banane",name:"Épluchures de banane",emoji:"🍌",cat:"Purin express",col:"#8A6A00",colL:"#FFF8D8",diff:"Très facile",temps:"3–5 jours",cout:"Gratuit (recyclage cuisine)",richesse:["Potassium (K)","Phosphore (P)","Manganèse","Magnésium"],effet:"Engrais express de la floraison. Simple, rapide, très efficace pour booster les fruits.",ingredients:["3 à 4 épluchures de banane","1 litre d'eau froide","1 bocal en verre fermé"],etapes:["Découpez les épluchures en petits morceaux","Mettez dans le bocal et couvrez d'eau froide","Fermez et laissez macérer 3 à 5 jours au frais","Filtrez — l'eau légèrement brune est normale","Utilisez immédiatement ou dans la semaine"],dilutions:[{mode:"Arrosage direct au pied",ratio:"Pur ou dilué à 50%"},{mode:"Pulvérisation foliaire",ratio:"Dilué à 50% minimum"}],cibles:["Tomates","Fraises","Poivrons","Rosiers"],freq:"1 fois par semaine pendant la période de floraison",eviter:["Myrtilles","Fraisiers hors floraison"],warning:"Se conserve 1 semaine max au réfrigérateur. Évitez les bananes traitées aux pesticides."},
  {id:"cafe",name:"Marc de café",emoji:"☕",cat:"Amendement direct",col:"#5A3010",colL:"#F5EAD8",diff:"Très facile",temps:"Immédiat",cout:"Gratuit (recyclage quotidien)",richesse:["Azote (N)","Potassium (K)","Magnésium","Phosphore"],effet:"Fertilisant léger et répulsif naturel contre les limaces et fourmis. Légèrement acidifiant.",ingredients:["Marc de café usagé (après chaque espresso ou filtre)"],etapes:["Récupérez le marc après chaque utilisation","Étalez sur une assiette — séchez 24h (évite les moisissures)","Saupoudrez en fine couche en surface du pot","Ou mélangez au substrat — maximum 15% du volume","Arrosez légèrement pour intégrer"],dilutions:[{mode:"Engrais liquide léger",ratio:"2 cuillères à soupe pour 1L d'eau froide — infusion 24h"},{mode:"Amendement direct",ratio:"Fine couche ou 15% max du volume substrat"}],cibles:["Fraisiers","Myrtilles","Basilic","Tomates"],freq:"1 à 2 fois par mois",eviter:["Lavande","Romarin","Plantes calcicoles"],warning:"Ne jamais dépasser 20% du volume. Séchez toujours le marc avant utilisation pour éviter les moisissures."},
  {id:"oeufs",name:"Coquilles d'œufs",emoji:"🥚",cat:"Amendement calcaire",col:"#8A6A10",colL:"#FFF5D8",diff:"Très facile",temps:"Immédiat à 6 mois",cout:"Gratuit",richesse:["Calcium (Ca)","Magnésium","Oligo-éléments"],effet:"Prévient la nécrose apicale des tomates. Barrière mécanique anti-limaces et escargots.",ingredients:["Coquilles d'œufs (cuites ou crues — les deux fonctionnent)"],etapes:["Rincez les coquilles à l'eau froide","Laissez sécher complètement (1 à 2 jours)","OPTION 1 — Poudre fine : réduisez au mortier pour effet rapide","OPTION 2 — Morceaux : disposez autour du plant en barrière","Incorporez 2 à 3 cuillères à soupe par pot de 10L"],dilutions:[{mode:"Engrais liquide calcium",ratio:"10 coquilles broyées dans 1L eau — infusion 24h, filtrez"},{mode:"Amendement solide",ratio:"2-3 cuillères à soupe en poudre par pot de 10L"}],cibles:["Tomates (anti-nécrose)","Poivrons","Aubergines","Concombres"],freq:"1 fois par saison au rempotage ou en surface",eviter:["Plantes acidophiles — alcalinisent légèrement"],warning:"Décomposition très lente. Pour effet rapide sur carence calcium, broyez en poudre très fine."},
  {id:"cuisson",name:"Eau de cuisson",emoji:"🫙",cat:"Fertilisant immédiat",col:"#6A4A20",colL:"#F5EAD8",diff:"Très facile",temps:"Immédiat",cout:"Gratuit",richesse:["Minéraux variés","Vitamines hydrosolubles","Oligo-éléments"],effet:"Le fertilisant le plus simple. Récupère tous les minéraux lessivés des légumes pendant la cuisson.",ingredients:["Eau de cuisson refroidie (pâtes sans sel, pommes de terre, carottes, haricots, œufs)"],etapes:["Récupérez l'eau après cuisson des légumes ou féculents","IMPÉRATIF — laissez refroidir complètement","Arrosez directement au pied des plantes","Pas de filtration nécessaire"],dilutions:[{mode:"Utilisation directe",ratio:"Telle quelle, refroidie — remplace un arrosage normal"}],cibles:["Toutes les cultures sans exception"],freq:"À chaque cuisson — remplace directement l'arrosage",eviter:["Eau de cuisson salée","Eau de cuisson de viande ou poisson"],warning:"N'utilisez JAMAIS l'eau salée ou grasse. L'eau chaude brûle les racines — attendez le complet refroidissement."},
  {id:"cendres",name:"Cendres de bois",emoji:"🔥",cat:"Amendement minéral",col:"#4A4A4A",colL:"#EAEAEA",diff:"Facile",temps:"Immédiat",cout:"Gratuit (si cheminée)",richesse:["Potassium (K)","Calcium (Ca)","Phosphore (P)","Oligo-éléments"],effet:"Engrais potassique puissant. Alcalinise le sol. Répulsif limaces, fourmis, escargots.",ingredients:["Cendres froides de bois non traité (cheminée, barbecue bois)"],etapes:["Récupérez les cendres FROIDES","Tamisez pour enlever clous et gros morceaux","Saupoudrez en fine couche autour des plants","Mélangez au substrat — maximum 2 à 5% du volume","Incorporez légèrement en surface"],dilutions:[{mode:"Engrais liquide",ratio:"1 cuillère à soupe dans 1L eau — décanter 24h"},{mode:"Amendement solide",ratio:"70 à 100g par m² de sol"}],cibles:["Tomates","Courgettes","Fraises","Arbres fruitiers"],freq:"1 à 2 fois par an maximum",eviter:["Myrtilles","Rhododendrons","Sol déjà calcaire"],warning:"Les cendres augmentent le pH. JAMAIS sur sol calcaire. Ne JAMAIS mélanger avec du purin d'ortie (perte d'azote). Uniquement bois non traité."},
  {id:"agrumes",name:"Épluchures d'agrumes",emoji:"🍊",cat:"Répulsif naturel",col:"#E05A00",colL:"#FFF0D8",diff:"Très facile",temps:"Immédiat",cout:"Gratuit",richesse:["Huiles essentielles","Limonène","Vitamines"],effet:"Répulsif naturel puissant contre limaces, fourmis et pucerons. Excellent anti-parasites en pot.",ingredients:["Épluchures d'oranges, citrons, mandarines, pamplemousses"],etapes:["Récupérez les épluchures après consommation","Coupez en morceaux de 3 à 5 cm","Disposez directement sur la surface du substrat","Renouvelez dès que les épluchures noircissent"],dilutions:[{mode:"Infusion répulsive",ratio:"4-5 épluchures dans 1L eau bouillante — refroidir — pulvériser"},{mode:"Application directe",ratio:"Morceaux disposés en surface autour du plant"}],cibles:["Protection contre limaces","Répulsif fourmis","Anti-pucerons léger"],freq:"Renouveler toutes les 2 semaines ou après pluie",eviter:["Pas en grande quantité dans le compost"],warning:"Retirez les épluchures dès qu'elles noircissent — elles perdent leur effet et repoussent les vers de terre."},
];
const VEGETABLES=[
  {id:"tomate-c",name:"Tomates cerises",emoji:"🍅",cat:"Fruit-légume",diff:"Facile",potMin:"12L",bacMin:"30cm",locs:["balcon","terrasse","jardin"],seasons:{printemps:{a:"Semer en intérieur Fév-Mars, repiquer en Mai",t:"sow"},ete:{a:"Récolte abondante Juillet-Octobre",t:"harvest"},automne:{a:"Fin de récolte avant gelées",t:"harvest"},hiver:{a:"Semis intérieur dès Janvier au Sud",t:"indoor"}},byR:{nord:"Tumbler, Sweet 100. Planter après le 20 Mai.",normandie:"Résistantes mildiou. Planter mi-Mai.",idf:"Semer Fév-Mars. Planter 15 Mai. Récolte Juillet-Octobre.",atlantique:"Semer Janvier. Planter mi-Avril. Récolte Juin-Novembre.",med:"Plantation Mars. Récolte Avril-Novembre.",montagne:"Variétés précoces uniquement. Sous abri."},engrais:["Purin d'ortie en croissance","Purin de consoude dès floraison","Coquilles d'œufs (anti-nécrose)"],tips:["Pincez les gourmands","1 plant = 2 à 5 kg/saison","Tuteurez dès 30 cm"]},
  {id:"tomate",name:"Tomates (grosses)",emoji:"🍅",cat:"Fruit-légume",diff:"Moyen",potMin:"20L",bacMin:"30cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Semer en intérieur Janv-Mars",t:"sow"},ete:{a:"Récolte abondante Juillet-Octobre",t:"harvest"},automne:{a:"Fin de récolte avant gelées",t:"harvest"},hiver:{a:"Semis en intérieur au chaud",t:"indoor"}},byR:{nord:"Difficile. Sous abri recommandé.",normandie:"Résistantes au mildiou impérativement.",idf:"Semer Fév. Planter 15 Mai. Récolte Août-Octobre.",atlantique:"Excellentes conditions. Cœur de bœuf.",med:"San Marzano. Récolte Juin-Novembre.",montagne:"Glacier, Stupicke. Sous serre obligatoire."},engrais:["Purin d'ortie en croissance","Purin de consoude à la floraison","Coquilles d'œufs"],tips:["Minimum 20L de substrat","Un seul pied par pot","Coupez les feuilles basses"]},
  {id:"poivron",name:"Poivrons & Piments",emoji:"🌶️",cat:"Fruit-légume",diff:"Moyen",potMin:"12L",bacMin:"30cm",locs:["balcon","terrasse","jardin"],seasons:{printemps:{a:"Semer en intérieur Janvier-Février",t:"indoor"},ete:{a:"Récolte abondante Août-Octobre",t:"harvest"},automne:{a:"Fin de récolte. Rentrez pour hiverner",t:"harvest"},hiver:{a:"Semis en intérieur chaud (20-25°C)",t:"indoor"}},byR:{nord:"Difficile. Sous serre recommandé.",normandie:"Possible sous abri uniquement.",idf:"Semer Janvier. Planter Mai-Juin. Récolte Août-Octobre.",atlantique:"Très bien. Planter Avril-Mai.",med:"Idéal. Plantation Mars, récolte Juin-Novembre.",montagne:"Uniquement sous serre chauffée."},engrais:["Purin de consoude à la floraison","Épluchures de banane pour les fruits"],tips:["Besoin de chaleur : 15°C minimum","1 plant = 20 à 30 poivrons"]},
  {id:"courgette",name:"Courgettes",emoji:"🥒",cat:"Courge",diff:"Facile",potMin:"40L",bacMin:"30cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Semer en intérieur Avril-Mai",t:"sow"},ete:{a:"Récolte intense Juin-Septembre",t:"harvest"},automne:{a:"Fin de production avec les froids",t:"harvest"},hiver:{a:"Pas de culture possible",t:"none"}},byR:{nord:"Semer sous abri Avril. Planter fin Mai.",normandie:"Planter mi-Mai. Surveillez l'oïdium.",idf:"Semer Avril, planter fin Mai. Récolte abondante.",atlantique:"Planter mi-Avril. 15 à 20 courgettes/plant.",med:"Planter dès Mars. Récoltez tous les 2 jours.",montagne:"Saison courte. Sous abri conseillé."},engrais:["Purin d'ortie en début de croissance","Purin de consoude à la floraison"],tips:["1 plant suffit pour une famille","Récoltez jeune (15-20 cm)"]},
  {id:"concombre",name:"Concombres",emoji:"🫑",cat:"Courge",diff:"Facile",potMin:"20L",bacMin:"30cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Semer en intérieur Avril-Mai",t:"indoor"},ete:{a:"Récolte abondante Juillet-Septembre",t:"harvest"},automne:{a:"Fin de production avec les froids",t:"harvest"},hiver:{a:"Pas de culture en extérieur",t:"none"}},byR:{nord:"Sous serre ou abri conseillé.",normandie:"Semer Avril, planter sous cloche.",idf:"Semer fin Avril, planter fin Mai.",atlantique:"Très bon. Conduire en vertical.",med:"Plantation Avril. Production spectaculaire.",montagne:"Uniquement sous serre ou abri chaud."},engrais:["Purin d'ortie en croissance","Purin de consoude à la floraison"],tips:["Conduire en vertical sur treillis","Arrosage quotidien indispensable"]},
  {id:"pdt",name:"Pommes de terre",emoji:"🥔",cat:"Légume-racine",diff:"Facile",potMin:"60L",bacMin:"60cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Planter les plants germés Avril-Mai",t:"sow"},ete:{a:"Buttage et croissance. Récolte précoces Juillet",t:"harvest"},automne:{a:"Récolte principale Août-Septembre",t:"harvest"},hiver:{a:"Conservation en cave sombre jusqu'à 6 mois",t:"none"}},byR:{nord:"Planter Avril-Mai. Variétés précoces. Récolte Juillet.",normandie:"Excellent sol. Planter Avril. Récolte Juillet-Août.",idf:"Planter Avril. Récolte Juillet-Août.",atlantique:"Planter Mars-Avril. Belle production.",med:"Planter Février-Mars. Récolte Juin.",montagne:"Planter Mai. Variétés résistantes au froid."},engrais:["Purin d'ortie en début de croissance","Cendres de bois pour le potassium"],tips:["Buttez 3 fois pendant la croissance","1 plant = 500g à 2 kg selon variété"]},
  {id:"patate-douce",name:"Patates douces",emoji:"🍠",cat:"Légume-racine",diff:"Moyen",potMin:"60L",bacMin:"60cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Planter les boutures en Mai-Juin",t:"sow"},ete:{a:"Croissance active. Peu d'entretien",t:"sow"},automne:{a:"Récolte Septembre-Octobre avant gelées",t:"harvest"},hiver:{a:"Conservation en endroit chaud et sec",t:"none"}},byR:{nord:"Très difficile. Résultats limités.",normandie:"Possible sous tunnel uniquement.",idf:"Résultats variables selon l'été.",atlantique:"Bon résultat. Beauregard recommandé.",med:"Excellent. Culture traditionnelle ici.",montagne:"Impossible en extérieur."},engrais:["Purin de consoude pendant la fructification"],tips:["Besoin de 4 à 5 mois sans gel","Conservez au chaud (15°C minimum)"]},
  {id:"salade",name:"Salades & Laitues",emoji:"🥬",cat:"Légume-feuille",diff:"Très facile",potMin:"4L",bacMin:"15cm",locs:["balcon","terrasse","jardin","interieur"],seasons:{printemps:{a:"Semer dès Mars-Avril",t:"sow"},ete:{a:"Variétés résistantes à la chaleur",t:"harvest"},automne:{a:"Semer Août-Septembre — récolte d'automne",t:"sow"},hiver:{a:"Mâche et roquette résistent au froid",t:"harvest"}},byR:{nord:"Cultivez Mars-Novembre. Mâche en hiver.",normandie:"Culture quasi-permanente.",idf:"Semis échelonnés toutes les 3 semaines.",atlantique:"Culture en continu possible.",med:"Cultivez automne-printemps. Ombrez en été.",montagne:"Culture rapide parfaite pour la courte saison."},engrais:["Purin d'ortie dilué à 5%","Eau de cuisson des légumes"],tips:["Récoltez feuille par feuille","Semez toutes les 3 semaines"]},
  {id:"epinard",name:"Épinards",emoji:"🍃",cat:"Légume-feuille",diff:"Facile",potMin:"4L",bacMin:"15cm",locs:["balcon","terrasse","jardin","interieur"],seasons:{printemps:{a:"Semer Fév-Mars — récolte Avril-Mai",t:"harvest"},ete:{a:"Monte vite en graines. Pause estivale.",t:"none"},automne:{a:"Meilleure saison ! Semer Août-Septembre",t:"harvest"},hiver:{a:"Variétés d'hiver résistent jusqu'à -10°C",t:"harvest"}},byR:{nord:"Cultivez printemps et automne.",normandie:"Excellent. Humidité favorable.",idf:"Semis Août, récolte tout l'automne.",atlantique:"Culture quasi-permanente.",med:"Cultivez uniquement automne-printemps.",montagne:"Culture de printemps et début automne."},engrais:["Purin d'ortie dilué — excellent pour les feuilles","Eau de cuisson des légumes"],tips:["Monte en graines si chaleur > 25°C","Riches en fer et vitamines"]},
  {id:"carotte",name:"Carottes",emoji:"🥕",cat:"Légume-racine",diff:"Facile",potMin:"20L",bacMin:"45cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Semer directement Mars-Avril",t:"sow"},ete:{a:"Éclaircissez — récolte Juillet-Août",t:"harvest"},automne:{a:"Semer Août pour récolte automne-hiver",t:"sow"},hiver:{a:"Résistent en terre jusqu'à -10°C",t:"harvest"}},byR:{nord:"Semer Avril. Récolte Juillet-Septembre.",normandie:"Excellent sol. Semer Mars-Août.",idf:"Semis Mars-Août. Récolte continue.",atlantique:"Excellent. Semis dès Février.",med:"Semis Septembre-Mars. Évitez l'été.",montagne:"Semer Mai-Juillet."},engrais:["Cendres de bois (potassium pour les racines)","Eau de cuisson refroidie"],tips:["Sol profond et meuble indispensable","Éclaircissez à 5 cm entre chaque"]},
  {id:"haricot",name:"Haricots verts",emoji:"🫘",cat:"Légumineuse",diff:"Facile",potMin:"20L",bacMin:"30cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Semer directement Mi-Mai (risque de gel passé)",t:"sow"},ete:{a:"Récolte abondante Juillet-Septembre",t:"harvest"},automne:{a:"Semis tardifs possibles au Sud",t:"sow"},hiver:{a:"Pas de culture possible",t:"none"}},byR:{nord:"Semer fin Mai. Récolte Août.",normandie:"Semer fin Mai. Production correcte.",idf:"Semer Mi-Mai. Récolte Juillet-Septembre.",atlantique:"Semer Avril-Mai. Très bonne production.",med:"Semer Avril. Double récolte possible.",montagne:"Semer début Juin uniquement."},engrais:["Peu d'engrais — fixe l'azote naturellement","Eau de cuisson des légumes"],tips:["Variétés naines idéales en bac","Récoltez tous les 2 jours pour prolonger"]},
  {id:"ail",name:"Ail",emoji:"🧄",cat:"Bulbe",diff:"Très facile",potMin:"4L",bacMin:"15cm",locs:["balcon","terrasse","jardin"],seasons:{printemps:{a:"Récolte de l'ail planté en automne",t:"harvest"},ete:{a:"Récolte Juin-Juillet — séchage indispensable",t:"harvest"},automne:{a:"MEILLEURE SAISON pour planter les caïeux",t:"sow"},hiver:{a:"L'ail reste en terre — pas d'intervention",t:"none"}},byR:{nord:"Planter Octobre. Récolte Juillet.",normandie:"Bon résultat.",idf:"Planter Oct-Nov. Récolte Juin-Juillet.",atlantique:"Excellent. Variétés roses de Lautrec.",med:"Idéal. Plantation Sept-Oct.",montagne:"Plantez avant les gelées. Récolte Juillet."},engrais:["Cendres de bois en hiver (potassium)"],tips:["Plantez la pointe vers le haut","Récoltez quand les fanes jaunissent","Répulsif naturel contre les pucerons"]},
  {id:"oignon",name:"Oignons & Échalotes",emoji:"🧅",cat:"Bulbe",diff:"Facile",potMin:"12L",bacMin:"15cm",locs:["balcon","terrasse","jardin"],seasons:{printemps:{a:"Planter bulbilles Mars-Avril",t:"sow"},ete:{a:"Récolte Juillet-Août quand les fanes versent",t:"harvest"},automne:{a:"Planter bulbilles d'automne Sept-Oct",t:"sow"},hiver:{a:"Conservation en endroit sec et aéré",t:"none"}},byR:{nord:"Planter Avril. Récolte Août.",normandie:"Bon résultat. Risque de mildiou.",idf:"Planter Mars-Avril. Récolte Juillet-Août.",atlantique:"Excellent. Oignons roses de Roscoff.",med:"Planter Octobre. Récolte Mai-Juin.",montagne:"Planter Mai. Récolte Août-Septembre."},engrais:["Cendres de bois en surface"],tips:["Séchez 2 à 3 semaines au soleil","Conservez en tresse dans un endroit frais"]},
  {id:"basilic",name:"Basilic",emoji:"🌿",cat:"Herbe aromatique",diff:"Facile",potMin:"4L",bacMin:"15cm",locs:["balcon","terrasse","jardin","interieur"],seasons:{printemps:{a:"Semer en intérieur Avril — besoin de chaleur",t:"sow"},ete:{a:"Récolte en continu. Taillez régulièrement.",t:"harvest"},automne:{a:"Rentrez avant le gel. Culture intérieure possible.",t:"indoor"},hiver:{a:"Culture intérieure sous lumière artificielle",t:"indoor"}},byR:{nord:"Rentrez impérativement en hiver.",normandie:"Protégez du vent. Sous abri l'hiver.",idf:"Toute l'année si rentré en septembre.",atlantique:"Excellent. Plantation Mai.",med:"Paradis du basilic. Culture toute l'année.",montagne:"Uniquement en été."},engrais:["Marc de café séché en surface","Eau de cuisson refroidie"],tips:["Ne jamais laisser monter en fleurs","Aime la chaleur : 20°C minimum"]},
  {id:"fraise",name:"Fraises",emoji:"🍓",cat:"Fruit",diff:"Facile",potMin:"12L",bacMin:"30cm",locs:["balcon","terrasse","jardin"],seasons:{printemps:{a:"Plantation Mars-Avril, premières fleurs Mai",t:"sow"},ete:{a:"Récolte principale Juin-Juillet",t:"harvest"},automne:{a:"Plantation Août-Septembre pour l'année suivante",t:"sow"},hiver:{a:"Plants en dormance — résistants",t:"none"}},byR:{nord:"Planter Avril. Récolte Juin-Juillet.",normandie:"Excellent !",idf:"Plantation Août ou Mars. Récolte Mai-Juin.",atlantique:"Conditions idéales. Variétés remontantes.",med:"Plantation Septembre. Récolte dès Avril-Mai.",montagne:"Récolte tardive mais saveur exceptionnelle."},engrais:["Épluchures de banane à la floraison","Purin de consoude dès les premières fleurs","Marc de café"],tips:["Paillez pour garder les fruits propres","Renouvelez les plants tous les 3 ans"]},

  {id:"framboise",name:"Framboises",emoji:"🫐",cat:"Fruit",diff:"Facile",potMin:"40L",bacMin:"45cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Planter les cannes en Mars-Avril. Paillez.",t:"sow"},ete:{a:"Récolte Juillet-Août. Arrosez régulièrement.",t:"harvest"},automne:{a:"Récolte Sept-Nov (variétés remontantes). Taillez après.",t:"harvest"},hiver:{a:"Taillez les cannes ayant fructifié en Décembre.",t:"none"}},byR:{nord:"Excellent ! Climat idéal. Récolte Juillet-Août.",normandie:"Parfait. Production très abondante.",idf:"Très bonne production. Planter Avril.",atlantique:"Bon résultat. Variétés remontantes recommandées.",med:"Difficile en plein été. Ombrez. Variétés tardives.",montagne:"Excellent. Saveur exceptionnelle en altitude."},engrais:["Purin d'ortie au printemps","Épluchures de banane à la floraison","Cendres de bois en hiver (potassium)"],tips:["Taillez les cannes fructifiées en hiver","1 plant = 500g à 1 kg/an","Espace : 50 cm entre chaque plant"]},
  {id:"myrtille",name:"Myrtilles",emoji:"🫐",cat:"Fruit",diff:"Moyen",potMin:"40L",bacMin:"45cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Floraison Avril-Mai. Peu d'entretien.",t:"sow"},ete:{a:"Récolte Juillet-Septembre. Cueillez à maturité.",t:"harvest"},automne:{a:"Superbe feuillage rouge. Paillez les pieds.",t:"none"},hiver:{a:"Dormance naturelle. Résistant au gel.",t:"none"}},byR:{nord:"Excellent. Sol naturellement acide souvent présent.",normandie:"Très bon résultat. Sol naturellement acide dans la région.",idf:"Bon résultat avec substrat acidifié (pH 4-5 obligatoire).",atlantique:"Bon si sol acide. Substrat spécial myrtilles.",med:"Difficile. Sol trop calcaire. À acidifier fortement.",montagne:"Excellent. Plante naturellement présente en altitude."},engrais:["Marc de café — acidifie légèrement le sol","Jamais de cendres de bois (alcalinise)"],tips:["Sol OBLIGATOIREMENT acide : pH 4 à 5","Plantez 2 pieds minimum pour pollinisation","Production à partir de la 3e année"]},
  {id:"groseille",name:"Groseilles & Cassis",emoji:"🍇",cat:"Fruit",diff:"Facile",potMin:"40L",bacMin:"45cm",locs:["terrasse","jardin"],seasons:{printemps:{a:"Plantation Mars-Avril. Floraison Mai.",t:"sow"},ete:{a:"Récolte Juin-Août selon variété.",t:"harvest"},automne:{a:"Plantation Septembre. Paillez les pieds.",t:"sow"},hiver:{a:"Très résistant au gel. Taille en Janvier.",t:"none"}},byR:{nord:"Excellent. Climat frais idéal.",normandie:"Parfait. Humidité favorable.",idf:"Bonne production. Plantation automne recommandée.",atlantique:"Très bon résultat. Variétés précoces.",med:"Difficile. Trop chaud et sec. Ombrez.",montagne:"Excellent. Résistant et productif en altitude."},engrais:["Purin d'ortie au printemps","Cendres de bois (potassium) en hiver"],tips:["Peu d'entretien une fois bien installé","Taille de fructification en Janvier","1 arbuste = 2 à 5 kg/an"]},
  {id:"cerise",name:"Cerises & Guignes",emoji:"🍒",cat:"Fruit",diff:"Difficile",potMin:"100L",bacMin:"60cm",locs:["jardin","terrasse"],seasons:{printemps:{a:"Floraison magnifique Avril. Petits fruits se forment.",t:"sow"},ete:{a:"Récolte Juin-Juillet selon variété.",t:"harvest"},automne:{a:"Chute des feuilles. Taille légère.",t:"none"},hiver:{a:"Dormance. Taille en Janvier-Février.",t:"none"}},byR:{nord:"Corrects. Variétés résistantes au froid.",normandie:"Bon résultat. Attention à la mouche de la cerise.",idf:"Bonne production. Bigarreau, Reverchon.",atlantique:"Très bon. Plantation Novembre.",med:"Excellent. Nombreuses variétés traditionnelles.",montagne:"Surettes sauvages plutôt que douces. Résistantes."},engrais:["Purin de consoude à la floraison","Cendres de bois (potassium) en fin d'hiver"],tips:["Plantez 2 variétés pour la pollinisation croisée","Protégez des oiseaux avec un filet","Récolte rapide — ne tarde pas sur l'arbre"]},
  {id:"radis",name:"Radis",emoji:"🌱",cat:"Légume-racine",diff:"Très facile",potMin:"4L",bacMin:"15cm",locs:["balcon","terrasse","jardin","interieur"],seasons:{printemps:{a:"Semer dès Mars — récolte en 25 jours",t:"harvest"},ete:{a:"Attention chaleur — montée en graines rapide",t:"none"},automne:{a:"Semis Août-Septembre — récolte rapide",t:"harvest"},hiver:{a:"Radis d'hiver (Black Spanish) au Sud",t:"harvest"}},byR:{nord:"Semer dès Mars. 25 jours de croissance.",normandie:"Idéal. Humidité parfaite.",idf:"Semez toutes les 2 semaines.",atlantique:"Excellent toutes saisons sauf canicule.",med:"Évitez l'été. Cultivez Octobre-Mars.",montagne:"Semis Mai-Août."},engrais:["Eau de cuisson des légumes"],tips:["Le légume le plus rapide : 25 jours","Idéal pour apprendre aux enfants"]},
  {id:"micropousses",name:"Micropousses",emoji:"🌱",cat:"Micro-culture",diff:"Très facile",potMin:"4L",bacMin:"15cm",locs:["interieur","balcon"],seasons:{printemps:{a:"Culture en continu toute l'année",t:"harvest"},ete:{a:"Culture en continu toute l'année",t:"harvest"},automne:{a:"Culture en continu toute l'année",t:"harvest"},hiver:{a:"Idéal en hiver — 7 à 14 jours de récolte",t:"harvest"}},byR:{nord:"Parfait en hiver.",normandie:"Idéal en hiver.",idf:"Culture intérieure permanente.",atlantique:"Complément du jardin.",med:"Complément hivernal.",montagne:"Idéal quand tout est gelé."},engrais:["Aucun engrais nécessaire"],tips:["Récolte en 7 à 14 jours","10x plus riche en nutriments"]},
];
const REGIONS=[
  {id:"nord",label:"Nord & Nord-Est",emoji:"❄️",climate:"Hivers longs et froids. Gelées jusqu'en mai. Variétés précoces obligatoires.",frost:"Dernière gelée : avril-mai · Première : oct-nov",color:"#2A4F8A",colorL:"#D8E8F8",tips:["Semis en intérieur dès janvier","Mini-serres indispensables","Variétés précoces uniquement","Planter dehors après le 20 mai"]},
  {id:"normandie",label:"Normandie & Bretagne",emoji:"🌧️",climate:"Océanique doux et humide. Hivers très doux. Forte humidité — surveillez mildiou.",frost:"Dernière gelée : mars · Première : nov-déc",color:"#2A6A5A",colorL:"#D0F0E8",tips:["Culture quasi-permanente possible","Variétés résistantes au mildiou","Excellent pour choux et salades","Paillage dense pour la chaleur"]},
  {id:"idf",label:"Île-de-France & Centre",emoji:"🌤️",climate:"Semi-continental tempéré. 4 saisons bien marquées. Grande diversité de cultures.",frost:"Dernière gelée : fin mars-mi avril · Première : nov",color:"#2E5C26",colorL:"#EAF5E8",tips:["Tomates en intérieur dès février","Planter dehors après le 15 mai","Toutes les cultures possibles","Arrosage abondant juillet-août"]},
  {id:"atlantique",label:"Atlantique & Sud-Ouest",emoji:"🌊",climate:"Étés chauds, hivers doux. Peu de gel. Saison de culture de 7 à 8 mois.",frost:"Dernière gelée : mi-mars · Première : décembre",color:"#7A4A10",colorL:"#F8EAD8",tips:["Avancez les semis de 2-3 semaines","Tomates, poivrons, aubergines excellents","Irrigation importante en été","7-8 mois de culture possible"]},
  {id:"med",label:"Méditerranée & PACA",emoji:"☀️",climate:"Étés très chauds et secs. Hivers très doux. Culture quasi-permanente.",frost:"Dernière gelée : fin fév · Première : déc-jan",color:"#B84E1E",colorL:"#F8E8D8",tips:["Culture toute l'année sans interruption","Irrigation automatique indispensable","Paillage épais en été","Tomates de mars à novembre"]},
  {id:"montagne",label:"Montagne & Massif Central",emoji:"⛰️",climate:"Saison très courte (mai-sept). Gelées possibles toute l'année. Cultures rapides.",frost:"Dernière gelée : mai-juin · Première : sept-oct",color:"#4A4A6A",colorL:"#E8E8F8",tips:["Saison concentrée sur mai-septembre","Cultures rapides prioritaires","Mini-serres pour tomates","Herbes aromatiques résistantes"]},
];
const SEASONS_LIST=[
  {id:"printemps",label:"Printemps",emoji:"🌱",months:"Mars · Avril · Mai",color:"#2E7D32"},
  {id:"ete",label:"Été",emoji:"☀️",months:"Juin · Juillet · Août",color:"#E65100"},
  {id:"automne",label:"Automne",emoji:"🍂",months:"Sept. · Oct. · Nov.",color:"#6D4C41"},
  {id:"hiver",label:"Hiver",emoji:"❄️",months:"Déc. · Jan. · Fév.",color:"#1565C0"},
];
const LOCS=[{id:"tous",label:"Tous les lieux",emoji:"🌍"},{id:"balcon",label:"Balcon",emoji:"🏙️"},{id:"terrasse",label:"Terrasse",emoji:"🌞"},{id:"jardin",label:"Jardin",emoji:"🌳"},{id:"interieur",label:"Intérieur",emoji:"🪟"}];
const BAC_DATA=[
  {h:"15 cm",label:"Bacs bas",color:"#8B5E3C",colorL:"#F5EAD8",planks:1,legs:false,desc:"Racines courtes — légumes-feuilles et petits bulbes",veg:[{e:"🥬",n:"Laitue"},{e:"🧅",n:"Oignons"},{e:"🌱",n:"Radis"},{e:"🍃",n:"Épinards"},{e:"🌿",n:"Roquette"},{e:"🥬",n:"Mâche"},{e:"🌿",n:"Ciboulette"},{e:"🌿",n:"Menthe"},{e:"🌱",n:"Cresson"}]},
  {h:"30 cm",label:"Bacs moyens",color:"#6B8E23",colorL:"#EAF5D8",planks:2,legs:false,desc:"Racines moyennes — légumes-fruits et légumineuses",veg:[{e:"🍅",n:"Tomates cerises"},{e:"🌶️",n:"Poivrons"},{e:"🫘",n:"Haricots"},{e:"🍓",n:"Fraisiers"},{e:"🌿",n:"Basilic"},{e:"🥒",n:"Courgettes"},{e:"🥬",n:"Chou frisé"},{e:"🥦",n:"Brocoli"},{e:"🫛",n:"Pois"}]},
  {h:"45 cm",label:"Bacs hauts",color:"#8B3A1A",colorL:"#F8E8D8",planks:3,legs:false,desc:"Racines profondes — légumes-racines et grosses cultures",veg:[{e:"🥕",n:"Carottes"},{e:"🌱",n:"Panais"},{e:"🫛",n:"Betteraves"},{e:"🍅",n:"Tomates"},{e:"🍆",n:"Aubergines"},{e:"🌱",n:"Poireaux"},{e:"🌱",n:"Navets"},{e:"🌿",n:"Céleris"},{e:"🌿",n:"Fenouil"}]},
  {h:"60+ cm",label:"Bacs très hauts",color:"#4A6741",colorL:"#E8F5E8",planks:4,legs:true,desc:"Racines très profondes — tubercules et très grandes plantes",veg:[{e:"🥔",n:"Pommes de terre"},{e:"🍠",n:"Patates douces"},{e:"🌱",n:"Daïkon"},{e:"🌽",n:"Maïs"},{e:"🍉",n:"Pastèque"},{e:"🍈",n:"Melon"},{e:"🎃",n:"Courge"},{e:"🌿",n:"Artichaut"},{e:"🥔",n:"Topinambour"}]},
];
const POT_DATA=[
  {v:"4 L",color:"#A0522D",colorL:"#FDF0E8",desc:"Herbes & micro-cultures",veg:[{e:"🌿",n:"Basilic"},{e:"🌿",n:"Coriandre"},{e:"🌿",n:"Thym"},{e:"🥬",n:"Laitue"},{e:"🍃",n:"Épinard"},{e:"🌿",n:"Persil"},{e:"🌿",n:"Ciboulette"},{e:"🌿",n:"Origan"}]},
  {v:"12 L",color:"#8B4513",colorL:"#FBE8D8",desc:"Petits légumes & fruits",veg:[{e:"🌶️",n:"Poivron"},{e:"🍓",n:"Fraisier"},{e:"🥬",n:"Chou frisé"},{e:"🍅",n:"Tomate cerise"},{e:"🧄",n:"Ail"},{e:"🧅",n:"Oignons"},{e:"🌱",n:"Radis"},{e:"🥬",n:"Mesclun"}]},
  {v:"20 L",color:"#7A3A10",colorL:"#F8E0D0",desc:"Légumes classiques",veg:[{e:"🍅",n:"Tomate"},{e:"🥬",n:"Laitue pommée"},{e:"🫑",n:"Concombre"},{e:"🥕",n:"Carottes"},{e:"🫛",n:"Betterave"},{e:"🍆",n:"Aubergine"},{e:"🥬",n:"Chou-rave"},{e:"🫘",n:"Haricot nain"}]},
  {v:"40 L",color:"#5C3317",colorL:"#F5E0CC",desc:"Grands légumes & arbustes",veg:[{e:"🥒",n:"Courgette"},{e:"🫑",n:"Concombre"},{e:"🫘",n:"Haricot vert"},{e:"🥦",n:"Brocoli"},{e:"🥬",n:"Chou"},{e:"🌱",n:"Poireau"},{e:"🌽",n:"Maïs"},{e:"🥬",n:"Blette"}]},
  {v:"60 L",color:"#3D2008",colorL:"#F0D8C0",desc:"Très grands légumes & fruits",veg:[{e:"🥔",n:"Pomme de terre"},{e:"🫛",n:"Petit pois"},{e:"🌽",n:"Maïs"},{e:"🍅",n:"Tomate cœur de bœuf"},{e:"🍉",n:"Pastèque"},{e:"🍠",n:"Patate douce"},{e:"🎃",n:"Courge"},{e:"🍈",n:"Melon"}]},
];
const BLOG=[
  {id:1,cat:"Technique",readTime:"8 min",title:"Le substrat idéal pour vos tomates en pot",date:"28 mars 2026",img:"https://images.unsplash.com/photo-1592921870583-aeafb0639ffe?w=800&q=80",excerpt:"La composition exacte du substrat parfait pour des tomates cerises abondantes sur balcon.",content:`**Pourquoi le substrat est la décision la plus importante**

Avant même de choisir vos graines ou vos engrais, le substrat conditionne 80% de votre succès. Une tomate en pot souffre dix fois plus vite qu'en pleine terre : le volume est limité, la chaleur s'y accumule et les ressources s'épuisent rapidement.

**La recette PousseLab — testée sur 3 saisons**

• 60% terreau universel de qualité (évitez les marques premier prix)
• 25% perlite horticole (drainage + aération des racines)
• 15% compost mûr ou lombricompost

Ce mélange garantit un substrat léger, drainant et riche. La perlite est indispensable : cette roche volcanique expansée ne se compacte pas et maintient l'aération même après des semaines d'arrosage.

**Pourquoi éviter la terre de jardin en pot**

La terre de jardin en pot devient rapidement imperméable. Elle se compacte à chaque arrosage, étouffe les racines et favorise les maladies fongiques. Elle est idéale en pleine terre mais catastrophique en contenant.

**Le volume minimum selon la culture**

- Tomates cerises : 12 litres minimum, 20L recommandé
- Tomates grosses variétés : 25 à 40 litres
- Basilic, persil : 4 à 6 litres suffisent
- Courgettes : 40 litres minimum

**Enrichir naturellement sans dépenser**

Ajoutez 2 cuillères à soupe de coquilles d'œufs broyées par pot de 10L. Elles libèrent le calcium lentement pendant toute la saison, prévenant la nécrose apicale des tomates. Une poignée de marc de café séché améliore la structure et repousse les limaces.

**Renouvellement et entretien**

Renouvelez votre substrat tous les 2 ans maximum. Entre deux cultures, grattez le substrat, ajoutez un tiers de compost frais et remélangez. Ne le jetez pas : mélangé à de la terre de jardin, il est excellent pour les massifs de fleurs.

**Les erreurs les plus fréquentes**

1. Acheter du terreau universel bas de gamme (tourbe seule, sans minéraux)
2. Oublier le drainage : toujours une couche de billes d'argile au fond
3. Trop tasser le substrat en rempotant (les racines ont besoin d'air)
4. Utiliser la même terre plusieurs années sans renouvellement`},

  {id:2,cat:"Engrais naturels",readTime:"10 min",title:"Purin d'ortie maison : le guide complet 2026",date:"15 mars 2026",img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",excerpt:"Comment préparer, utiliser et doser le purin d'ortie — l'engrais naturel le plus puissant.",content:`**Le roi des engrais naturels**

Le purin d'ortie est l'engrais naturel le plus puissant que vous puissiez fabriquer gratuitement. Riche en azote (N), en potassium (K), en fer et en magnésium, il stimule la croissance, renforce les défenses immunitaires des plantes et agit comme répulsif contre les pucerons.

**Pourquoi ça marche scientifiquement**

Pendant la fermentation, les orties libèrent leurs composés organiques azotés. L'azote est l'élément clé de la synthèse chlorophyllienne : sans lui, pas de photosynthèse efficace, pas de croissance. Les plantes l'absorbent directement par leurs racines en quelques heures après l'arrosage.

**La recette de base**

Ingrédients :
- 1 kg de feuilles d'orties fraîches (cueillez avant la floraison, de mars à juin)
- 10 litres d'eau de pluie (jamais de l'eau du robinet chlorée)
- 1 seau plastique de 15-20L (jamais métallique — le métal bloque la fermentation)

Préparation :
1. Cueillez les orties avec des gants épais — feuilles ET tiges, toutes les parties sont bonnes
2. Hachez grossièrement au couteau ou à la cisaille
3. Entassez dans le seau et couvrez d'eau de pluie
4. Remuez énergiquement avec un bâton en bois toutes les 48h
5. Couvrez partiellement — la fermentation produit du CO2 qui doit s'échapper
6. Attendez 2 à 3 semaines selon la température (plus chaud = plus rapide)
7. Prêt quand les bulles ont disparu et que l'odeur est puissante

**Comment savoir si c'est prêt**

Le purin fini est sombre, presque noir, et dégage une odeur très forte (sulfure d'hydrogène — normal). Plus de bulles à la surface = fermentation terminée. La couleur passe du vert clair au brun foncé progressivement.

**Dilutions selon l'usage**

- Engrais au pied des légumes : 1L de purin pour 10L d'eau (dilution 10%)
- Répulsif pucerons pulvérisé sur feuillage : 1L pour 20L d'eau (dilution 5%)
- Plants fragiles ou semis : 1L pour 30L d'eau (dilution 3%)

Ne jamais utiliser pur — brûle les racines.

**Le mélange ultime : Ortie + Consoude**

Mélangez 50% purin d'ortie + 50% purin de consoude avant dilution. Résultat : un NPK complet 100% naturel. L'ortie apporte l'azote (croissance), la consoude apporte le potassium et le phosphore (floraison et fructification). Aucun engrais du commerce ne fait mieux à ce prix.

**Calendrier d'utilisation**

- Mars à juin : purin d'ortie seul, toutes les 2 semaines (phase de croissance)
- Juillet à septembre : mélange ortie + consoude, toutes les 3 semaines (phase de floraison/fructification)
- Octobre à février : pause hivernale

**À éviter absolument**

Ne pas utiliser sur : haricots, pois, fèves (légumineuses qui fixent leur propre azote), oignons et ail (ralentit leur maturation). Sur les plantes aromatiques méditerranéennes (thym, romarin, lavande) : très grande dilution seulement.`},

  {id:3,cat:"Saisonnier",readTime:"7 min",title:"Quoi semer en mars selon votre région ?",date:"1 mars 2026",img:"https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",excerpt:"Calendrier précis des semis de mars pour les 6 zones climatiques françaises.",content:`**Mars : le mois pivot du jardinage**

Mars est le mois le plus stratégique de l'année. Les jours allongent, les températures remontent doucement, mais les gelées nocturnes restent possibles dans la plupart des régions. La règle d'or : semez en intérieur ce qui ne supporte pas le froid, semez directement dehors ce qui aime la fraîcheur.

**Île-de-France & Centre**

En intérieur (semis sous abri, 18-20°C) :
- Tomates : semez dès le 1er mars, repiquage en mai
- Poivrons et aubergines : semez maintenant, ils ont besoin de 4 mois avant la mise en place
- Basilic : température minimum 20°C impérative

En extérieur direct (résistants au froid) :
- Radis : semez toutes les 2 semaines pour un échelonnement
- Épinards, mâche, roquette : directement en pleine terre
- Laitues dures (batavia, feuille de chêne) : sous cloche si nuits < 2°C
- Carottes : attendez mi-mars, sol à 8°C minimum

**Méditerranée & PACA**

Le grand avantage du sud : vous pouvez semer directement en extérieur des cultures que le reste de la France met en intérieur.

En extérieur direct dès le 1er mars :
- Tomates cerises sous abri léger (tunnel ou voile)
- Salades toutes variétés sans protection
- Radis, carottes, betteraves, épinards
- Petits pois (avant qu'il fasse trop chaud)
- Courgettes dès fin mars

**Nord & Nord-Est**

Soyez patients. Les gelées peuvent survenir jusqu'en mai dans certaines zones.

En intérieur uniquement :
- Tomates, poivrons, aubergines : semez mi-mars
- Poireaux : semez en godets, repiquage en mai-juin
- Choux et brocolis : en godets, repiquage après les Saints de Glace (13 mai)

En extérieur : encore trop tôt pour la plupart des cultures. Attendez mi-avril.

**Normandie & Bretagne**

Climat doux mais humide. Surveillez le mildiou dès les premières chaleurs.

- Choux, brocolis, laitues : directement dehors dès mi-mars
- Tomates en intérieur : semez maintenant
- Poireaux : semis en godets
- Fèves et petits pois : directement dehors, ils adorent le froid normand

**Atlantique & Sud-Ouest**

Entre le nord et le sud. Vous pouvez avancer d'environ 3 semaines par rapport à l'Île-de-France.

- Tomates cerises en extérieur sous cloche dès mi-mars
- Courgettes en intérieur pour un repiquage en avril
- Tout le reste similaire à la Méditerranée mais avec 2-3 semaines de retard

**Montagne & Massif Central**

Saison très courte. Concentrez-vous sur les cultures rapides et résistantes.

- Radis, laitues, épinards : attendez début avril en extérieur
- Tomates et poivrons en intérieur maintenant : ils auront besoin de toute la saison
- Privilégiez les variétés précoces pour tout

**Le conseil PousseLab pour mars**

Un semis raté en mars se rattrape parfaitement en avril. Ne semez pas tout en même temps et ne surchargez pas. Mieux vaut 3 tomates bien soignées que 20 plants à l'abandon. Commencez petit, observez, et progressez chaque saison.`},

  {id:4,cat:"Économie",readTime:"6 min",title:"Économisez 127€/mois avec votre potager maison",date:"10 fév. 2026",img:"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",excerpt:"Calcul réel des économies de nos élèves sur 6 mois. Les chiffres sont surprenants.",content:`**La vraie question : est-ce rentable ?**

On nous pose souvent cette question. La réponse courte : oui, largement. Mais la vraie économie n'est pas seulement financière — c'est aussi la qualité, le zéro emballage, le zéro traitement chimique.

**Le calcul par culture**

Herbes aromatiques :
Un pot de basilic bio en supermarché = 2,50€, dure 2 semaines. Un plant sur balcon = 1,50€ de substrat, produit pendant 5 mois. Économie mensuelle : 3 à 5€ par herbe. Avec basilic + persil + ciboulette + menthe + thym : 15 à 25€/mois.

Salades et laitues :
Une laitue bio = 1,80€. Un semis produit 8 à 12 laitues sur la saison. Avec 3 bacs de salades en rotation : 20 à 35€ économisés par mois en saison.

Tomates cerises :
Un barquette de 250g de tomates cerises bio = 2,80 à 3,50€. Un plant bien soigné produit 2 à 5 kg sur la saison (juillet à octobre). Économie : 25 à 45€ sur la saison, soit 8 à 15€/mois en moyenne annuelle.

Courgettes :
1 courgette bio = 0,90€ à 1,50€. Un plant produit 15 à 25 courgettes. Économie sur la saison : 15 à 30€.

**Résultat de nos élèves**

Enquête réalisée auprès de 240 élèves PousseLab après 6 mois de pratique :
- Économie mensuelle moyenne : 84€
- Économie mensuelle médiane : 72€  
- Meilleure performance : 189€/mois (grande terrasse, 8 cultures)
- Avec balcon seul : 45 à 80€/mois

**Et les engrais maison ?**

En remplaçant les engrais du commerce (comptez 8 à 25€ pour une saison) par vos épluchures, eau de cuisson et purins maison : 10 à 30€ économisés par an. Petit mais réel.

**Le retour sur investissement**

Investissement de départ réaliste pour un balcon :
- Quelques pots et bacs : 30 à 60€
- Substrat de qualité : 15 à 25€
- Graines : 5 à 15€
- Formation PousseLab : 69 à 99€
**Total : 120 à 200€**

Avec une économie mensuelle de 70 à 90€, le retour sur investissement est atteint en **2 à 3 mois**. Dès la première vraie saison, vous êtes rentable.

**Ce qu'on n'achète plus**

Nos élèves témoignent qu'ils ont arrêté d'acheter :
- Herbes fraîches en sachet (zéro plastique)
- Salades en barquette individuelle
- Tomates cerises insipides en hiver
- Condiments frais (ciboulette, persil, basilic)

**La valeur non financière**

Difficile à chiffrer mais bien réelle : vos légumes ont un goût incomparable. Une tomate cueillie le matin et mangée le midi n'a rien à voir avec ce qu'on achète en supermarché. Et pour les enfants, voir pousser sa propre nourriture change le rapport à l'alimentation pour des années.`},
];

const FAQ=[
  {cat:"La formation",qs:[
    {q:"Faut-il de l'expérience en jardinage ?",a:"Non, nos formations sont conçues pour tous les niveaux. La formation Balcon & Appartement est spécialement destinée aux débutants absolus. Vous n'avez besoin d'aucune connaissance préalable en jardinage."},
    {q:"Combien de temps par semaine ?",a:"30 minutes à 1 heure suffisent. Les leçons sont courtes (10-15 min) et les actions pratiques rapides. Vous avancez à votre propre rythme, sans pression."},
    {q:"Je garde l'accès combien de temps ?",a:"Votre accès est à vie. Une fois votre formation achetée, vous pouvez la réviser autant de fois que vous le souhaitez, depuis n'importe quel appareil. Les mises à jour futures sont incluses gratuitement."},
    {q:"Y a-t-il une garantie ?",a:"Oui — garantie satisfait ou remboursé 30 jours. Si nos formations ne vous conviennent pas dans les 30 jours suivant votre achat, nous vous remboursons intégralement, sans question ni condition."},
  ]},
  {cat:"Le jardinage",qs:[
    {q:"Je suis en appartement sans jardin, puis-je cultiver ?",a:"Absolument ! Notre formation Balcon & Appartement est spécialement conçue pour les balcons, rebords de fenêtre et petits espaces. Avec la bonne technique, même 1 m² suffit pour produire des légumes frais."},
    {q:"J'ai toujours tué mes plantes. Puis-je y arriver ?",a:"Oui. La plupart des échecs viennent d'erreurs simples (arrosage, substrat, exposition) que nos formations enseignent à éviter dès le Module 1. Nos élèves qui pensaient avoir la main noire récoltent aujourd'hui."},
    {q:"Puis-je cultiver toute l'année ?",a:"Oui ! Notre formation Intérieur & Lumière vous apprend à produire 365 jours par an sous LED, et la formation Hydroponie permet de cultiver en toute saison sans terre."},
  ]},
  {cat:"Les engrais maison",qs:[
    {q:"Le purin d'ortie est-il vraiment efficace ?",a:"Oui, c'est l'engrais naturel le plus puissant. Il est riche en azote, stimule la croissance et renforce les défenses des plantes. Nos élèves constatent une différence visible en 2 semaines."},
    {q:"Peut-on fabriquer des engrais en appartement ?",a:"Absolument. Le marc de café, les épluchures de banane, l'eau de cuisson et les coquilles d'œufs sont parfaits en appartement. Pas besoin d'orties ni de jardin."},
    {q:"Peut-on mélanger plusieurs engrais naturels ?",a:"Oui ! Mélangez purin d'ortie + purin de consoude pour un NPK complet 100% naturel. Ne mélangez jamais cendres de bois et purin d'ortie — perte d'azote immédiate."},
  ]},
  {cat:"Paiement & livraison",qs:[
    {q:"Quels moyens de paiement acceptez-vous ?",a:"Toutes les cartes bancaires, Apple Pay et Google Pay — via Stripe, certifié PCI-DSS niveau 1. Vos données bancaires ne transitent jamais sur nos serveurs."},
    {q:"Quels sont les délais de livraison pour le matériel ?",a:"Nous livrons en 48h ouvrées en France métropolitaine. La livraison est gratuite à partir de 49€ d'achat. Nous livrons également en Belgique, Suisse et Luxembourg."},
    {q:"Puis-je payer en plusieurs fois ?",a:"Cette option arrive prochainement. Toutes nos formations sont accessibles à partir de 69€, et la formation Intérieur & Lumière est notre offre la plus accessible à 69€ accès à vie."},
  ]},
];

const MATERIEL_CATS=[
  {title:"Kits de démarrage — Dès 25€",icon:"🪴",items:[
    {t:"Kit Démarrage Appartement",d:"Terreau enrichi, godets, graines variées, guide illustré",prix:"~35€",lien:"https://www.amazon.fr/s?k=kit+démarrage+potager+appartement&language=fr_FR",site:"Amazon"},
    {t:"Pots et jardinières balcon",d:"Jardinière avec réserve d'eau, idéale balcon & terrasse",prix:"~20-45€",lien:"https://www.amazon.fr/s?k=jardinière+balcon+réserve+eau&language=fr_FR",site:"Amazon"},
    {t:"Kit Outils Jardinage Mini",d:"Outils ergonomiques inox, sac de rangement, gants",prix:"~20-30€",lien:"https://www.amazon.fr/s?k=kit+outils+jardinage+mini&language=fr_FR",site:"Amazon"},
    {t:"Pack Graines Héritage × 20",d:"Variétés anciennes non hybrides : tomates, courgettes, salades",prix:"~15-25€",lien:"https://www.amazon.fr/s?k=graines+potagères+héritage+bio&language=fr_FR",site:"Amazon"},
    {t:"Perlite horticole 10L",d:"Indispensable pour alléger et drainer le substrat",prix:"~8-12€",lien:"https://www.amazon.fr/s?k=perlite+horticole+10L&language=fr_FR",site:"Amazon"},
    {t:"Terreau potager de qualité",d:"Substrat enrichi spécial légumes et tomates en pots",prix:"~10-18€",lien:"https://www.amazon.fr/s?k=terreau+potager+légumes+pot&language=fr_FR",site:"Amazon"},
  ]},
  {title:"Éclairage LED pour culture intérieure",icon:"💡",items:[
    {t:"Lampe Grow-Light LED Full Spectrum",d:"Spectre complet, minuterie intégrée, bras réglable — idéale micropousses et salades",prix:"~35-80€",lien:"https://www.amazon.fr/s?k=lampe+grow+light+LED+full+spectrum+plantes&language=fr_FR",site:"Amazon"},
    {t:"Panneau LED horticole 45W",d:"Pour couvrir 60x60 cm de culture, spectre rouge+bleu",prix:"~40-90€",lien:"https://www.amazon.fr/s?k=panneau+LED+horticole+45W+plantes+intérieur&language=fr_FR",site:"Amazon"},
    {t:"Grow Light clip-on bureau",d:"Petit, pratique, pour herbes aromatiques sur un rebord de fenêtre",prix:"~18-35€",lien:"https://www.amazon.fr/s?k=grow+light+clip+bureau+plantes&language=fr_FR",site:"Amazon"},
  ]},
  {title:"Hydroponie — Kits & Solutions",icon:"💧",items:[
    {t:"Kit Hydroponie NFT starter",d:"Gouttières 6 emplacements, pompe silencieuse, solution nutritive",prix:"~60-120€",lien:"https://www.amazon.fr/s?k=kit+hydroponie+NFT+starter+maison&language=fr_FR",site:"Amazon"},
    {t:"Kit DWC (Deep Water Culture)",d:"Bac oxygéné pour tomates et poivrons sans terre",prix:"~50-100€",lien:"https://www.amazon.fr/s?k=kit+DWC+hydroponie+maison&language=fr_FR",site:"Amazon"},
    {t:"Solution nutritive universelle A+B",d:"Base + Bloom, pour toutes cultures hydroponiques",prix:"~18-35€",lien:"https://www.amazon.fr/s?k=solution+nutritive+hydroponie+A+B&language=fr_FR",site:"Amazon"},
    {t:"pH-mètre numérique",d:"Indispensable pour l'hydroponie — pH entre 5.8 et 6.5",prix:"~12-25€",lien:"https://www.amazon.fr/s?k=pH+mètre+numérique+hydroponie&language=fr_FR",site:"Amazon"},
  ]},
  {title:"Compostage & Engrais bio",icon:"♻️",items:[
    {t:"Lombricomposteur de balcon",d:"Compact, zéro odeur, produit un vermicompost liquide excellent",prix:"~45-80€",lien:"https://www.amazon.fr/s?k=lombricomposteur+balcon+compact&language=fr_FR",site:"Amazon"},
    {t:"Engrais organique granulés",d:"Pour enrichir le substrat naturellement en complément de vos engrais maison",prix:"~8-15€",lien:"https://www.amazon.fr/s?k=engrais+organique+bio+granulés+potager&language=fr_FR",site:"Amazon"},
    {t:"Billes d'argile expansée 10L",d:"Drainage au fond des pots, culture hors-sol",prix:"~8-14€",lien:"https://www.amazon.fr/s?k=billes+argile+expansée+10L&language=fr_FR",site:"Amazon"},
  ]},
];

const TEMOIGNAGES=[
  {name:"Marie-Claire B.",city:"Lyon",f:"Balcon & Appartement",stars:5,av:"👩",txt:"Mes enfants se battent pour arroser les tomates. Depuis que je fais le purin d'ortie maison, mes plants sont magnifiques. PousseLab a changé notre rapport à la nourriture.",det:"Économise 90€/mois"},
  {name:"Julien T.",city:"Bordeaux",f:"Terrasse Productive",stars:5,av:"🧔",txt:"Zéro pesticide, zéro emballage. Ma femme prépare les épluchures de banane pour les fraisiers — c'est devenu un rituel familial. Le retour sur investissement est hallucinant.",det:"3 kg de tomates en juillet"},
  {name:"Amina K.",city:"Paris 15e",f:"Jardin en Famille",stars:5,av:"👩‍🦱",txt:"Ma fille de 6 ans mange des épinards. On fabrique l'engrais ensemble avec les épluchures. La lampe grow-light et la formation hydroponie m'ont permis de cultiver en plein hiver.",det:"3 enfants conquis"},
  {name:"Sophie M.",city:"Paris 11e",f:"Balcon & Appartement",stars:5,av:"👩",txt:"Je vis dans 40 m² à Paris et je récolte maintenant mes tomates cerises, mes herbes et mes salades chaque semaine. La formation appartement est incroyablement bien faite !",det:"Récolte hebdomadaire en 40 m²"},
  {name:"Marc D.",city:"Lyon",f:"Terrasse Productive",stars:5,av:"👨",txt:"J'avais un jardin mais je ne savais pas quoi en faire. Grâce à PousseLab, j'ai produit plus de 80 kg de légumes cet été. Le retour sur investissement est hallucinant.",det:"80 kg de légumes cet été"},
  {name:"Pierre M.",city:"Nantes",f:"Hydroponie Maison",stars:5,av:"👨",txt:"L'hydroponie c'est magique. En 3 semaines j'avais mes premières laitues. Zéro terre, zéro salissures. Mes enfants adorent voir pousser les légumes dans l'eau !",det:"En hydroponie depuis 2 mois"},
  {name:"Sophie L.",city:"Toulouse",f:"Terrasse Productive",stars:5,av:"👩‍🦳",txt:"Je pensais avoir la main noire. Maintenant j'offre mes courgettes aux voisins. Le guide saisonnier pour le Sud-Ouest est une vraie pépite.",det:"Première récolte en 6 semaines"},
  {name:"Thomas R.",city:"Strasbourg",f:"Intérieur & Lumière",stars:4,av:"👨‍🦱",txt:"En hiver à Strasbourg, j'ai des herbes fraîches grâce aux LED. Le guide Nord-Est est très précis. La méthode est testée et éprouvée.",det:"Cultive 12 mois/an"},
];

const FLORA_SYSTEM=`Tu es Flora, conseillère jardinage experte de PousseLab. Tu connais parfaitement le jardinage potager en France, les régions climatiques, les calendriers de semis, les engrais naturels (purins, épluchures, marc de café, coquilles d'oeufs, cendres de bois) et l'hydroponie d'appartement. Réponds en français, concis (3-4 phrases max). Emojis avec modération.`;
const CSS=`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}html{scroll-behavior:smooth;}body{font-family:'Plus Jakarta Sans',sans-serif;background:#F7F3EC;color:#1E1208;-webkit-font-smoothing:antialiased;}
.page{padding-top:57px;min-height:100vh;}.sec{padding:56px 36px;}.max{max-width:1020px;margin:0 auto;}.ctr{text-align:center;}
.nav{position:fixed;top:0;left:0;right:0;z-index:400;background:rgba(247,243,236,.96);backdrop-filter:blur(18px);border-bottom:1px solid #EAE0CC;display:flex;align-items:center;justify-content:space-between;padding:10px 24px;gap:8px;}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:700;color:#2E5C26;cursor:pointer;flex-shrink:0;white-space:nowrap;}.nav-logo em{color:#B84E1E;font-style:italic;}
.nav-links{display:flex;gap:2px;flex-wrap:wrap;}.nl{background:none;border:none;padding:6px 9px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11.5px;font-weight:500;color:#1E1208;cursor:pointer;transition:all .2s;white-space:nowrap;}.nl:hover,.nl.on{background:#EAE0CC;color:#2E5C26;font-weight:600;}
.nav-r{display:flex;align-items:center;gap:6px;flex-shrink:0;}.btn-g{background:#2E5C26;color:#fff;border:none;padding:6px 13px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;}.btn-g:hover{background:#1E4018;}.btn-tn{background:#B84E1E;color:#fff;border:none;padding:6px 13px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;cursor:pointer;}.btn-tn:hover{background:#8A3810;}
.btn-p{background:#2E5C26;color:#fff;border:none;padding:11px 22px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13.5px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all .22s;}.btn-p:hover{background:#1E4018;transform:translateY(-1px);}
.btn-s{background:transparent;color:#1E1208;border:1.5px solid #C8B898;padding:11px 20px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13.5px;font-weight:500;cursor:pointer;transition:all .2s;}.btn-s:hover{border-color:#2E5C26;color:#2E5C26;}
.btn-h{background:#0E5A7A;color:#fff;border:none;padding:11px 22px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13.5px;font-weight:700;cursor:pointer;}.btn-h:hover{background:#0A3F57;}
.btn-t2{background:#B84E1E;color:#fff;border:none;padding:11px 22px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13.5px;font-weight:700;cursor:pointer;}.btn-t2:hover{background:#8A3810;}
.sm2{padding:7px 14px !important;font-size:12px !important;}
.ey{display:inline-block;background:#EAE0CC;border:1.5px solid #C8B898;padding:4px 12px;border-radius:100px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#B84E1E;margin-bottom:12px;}
.ey.inv{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.15);color:#A8E090;}.ey.g{background:rgba(46,92,38,.08);border-color:rgba(46,92,38,.15);color:#2E5C26;}
.h2{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,4vw,46px);font-weight:700;color:#1E1208;line-height:1.1;}.h2 em{color:#2E5C26;font-style:italic;}.h2.inv{color:#fff;}.h2.inv em{color:#A8E090;}
.lead{font-size:15px;color:#5C4030;max-width:540px;line-height:1.8;margin-top:10px;}.lead.inv{color:rgba(255,255,255,.55);}.ctr .lead{margin:10px auto 0;}
.hero{min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center;padding:110px 36px 60px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-40px;right:0;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(46,92,38,.09),transparent 65%);pointer-events:none;}
.h1{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,6vw,68px);line-height:1.02;color:#1E1208;letter-spacing:-.5px;margin-bottom:14px;}.h1 em{color:#2E5C26;font-style:italic;}
.hero-sub{font-size:15px;color:#5C4030;line-height:1.8;max-width:420px;margin-bottom:24px;}
.av-stack{display:flex;}.av{width:26px;height:26px;border-radius:50%;border:2px solid #FDFAF5;background:#EAE0CC;display:flex;align-items:center;justify-content:center;font-size:12px;margin-left:-6px;}.av:first-child{margin-left:0;}
.hbtns{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px;}
.hcard{width:100%;max-width:310px;background:#FDFAF5;border-radius:20px;overflow:hidden;box-shadow:0 18px 52px rgba(30,18,8,.12);border:1.5px solid #C8B898;}
.hcard-img{height:190px;background:linear-gradient(160deg,#C8E8C0 0%,#7AAA68 50%,#4A7A40 100%);display:flex;align-items:center;justify-content:center;font-size:72px;}
.hcard-body{padding:14px 16px 18px;}.hcard-title{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;color:#1E1208;margin-bottom:8px;}
.hcard-btn{width:100%;background:#2E5C26;color:#fff;border:none;padding:9px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12.5px;font-weight:700;cursor:pointer;}.hcard-btn:hover{background:#1E4018;}
.tbar{background:#1E1208;display:flex;overflow:hidden;flex-wrap:wrap;}.tbc{flex:1;min-width:25%;padding:18px 10px;text-align:center;border-right:1px solid rgba(255,255,255,.07);}.tbc:last-child{border:none;}
.tbc-n{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#A8E090;display:block;line-height:1;}.tbc-l{font-size:10px;color:rgba(255,255,255,.4);margin-top:4px;}
.fg{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}.fc{border-radius:18px;overflow:hidden;background:#FDFAF5;border:1.5px solid #C8B898;transition:all .3s;cursor:pointer;}.fc:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(30,18,8,.09);border-color:#5A9450;}
.fc-top{padding:22px 20px 13px;position:relative;}.fc-em{font-size:34px;display:block;margin-bottom:8px;}
.fc-badge{position:absolute;top:10px;right:10px;padding:3px 8px;border-radius:100px;font-size:9px;font-weight:700;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.28);}
.fc-title{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700;line-height:1.2;}.fc-tag{font-size:11px;margin-top:2px;opacity:.72;font-style:italic;}
.fc-body{padding:12px 20px 20px;}.fc-desc{font-size:12.5px;color:#5C4030;line-height:1.75;margin-bottom:10px;}
.fc-tags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px;}.ftag{font-size:9.5px;font-weight:600;background:#EAE0CC;padding:3px 7px;border-radius:100px;color:#1E1208;}
.fc-foot{display:flex;align-items:flex-end;justify-content:space-between;}.fold{font-size:10.5px;color:#aaa;text-decoration:line-through;}
.fprice{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#B84E1E;line-height:1;}.fprice small{font-size:10px;font-family:'Plus Jakarta Sans',sans-serif;color:#888;font-weight:400;}
.fc-btn{background:#1E1208;color:#fff;border:none;padding:7px 13px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap;}.fc-btn:hover{background:#2E5C26;}.fc-btn.hb{background:#0E5A7A;}.fc-btn.hb:hover{background:#0E6B8C;}
.eng-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}.eng-card{border-radius:16px;overflow:hidden;background:#FDFAF5;border:1.5px solid #EAE0CC;transition:all .2s;}.eng-card.open{border-color:#2E5C26;}
.eng-top{display:flex;align-items:center;gap:11px;padding:16px 18px;cursor:pointer;}.eng-top:hover{background:rgba(234,224,204,.3);}
.eng-em{font-size:33px;flex-shrink:0;}.eng-info{flex:1;}.eng-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#1E1208;}
.eng-badges{display:flex;gap:5px;margin-top:4px;flex-wrap:wrap;}.eng-badge{font-size:9.5px;font-weight:600;padding:2px 7px;border-radius:100px;background:#EAE0CC;color:#1E1208;}
.eng-tog{font-size:13px;color:#C8B898;transition:transform .25s;flex-shrink:0;}.eng-tog.open{transform:rotate(180deg);}
.eng-body{padding:4px 18px 18px;border-top:1px solid #EAE0CC;}
.eng-richesse{display:flex;gap:5px;flex-wrap:wrap;margin:11px 0 9px;}.eng-rich{font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:100px;}
.eng-effet{font-size:13px;color:#5C4030;line-height:1.7;margin-bottom:12px;font-style:italic;border-left:3px solid;padding-left:9px;}
.eng-st{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:#888;margin-bottom:7px;margin-top:13px;}
.eng-ings{display:flex;flex-direction:column;gap:5px;}.eng-ing{display:flex;align-items:flex-start;gap:7px;font-size:12.5px;color:#1E1208;line-height:1.5;}.eng-blt{width:5px;height:5px;border-radius:50%;flex-shrink:0;margin-top:7px;}
.eng-etapes{display:flex;flex-direction:column;gap:6px;}.eng-etape{display:flex;align-items:flex-start;gap:8px;font-size:12.5px;color:#5C4030;line-height:1.5;}
.eng-num{width:19px;height:19px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:800;color:#fff;flex-shrink:0;}
.eng-dils{display:flex;flex-direction:column;gap:6px;}.eng-dil{background:#EAE0CC;border-radius:8px;padding:8px 11px;}.eng-dil-mode{font-size:9.5px;font-weight:700;color:#888;text-transform:uppercase;}.eng-dil-ratio{font-size:12.5px;font-weight:700;color:#1E1208;}
.eng-cibles{display:flex;gap:5px;flex-wrap:wrap;}.eng-cible{font-size:10.5px;font-weight:600;padding:3px 8px;border-radius:100px;background:#EAF5E8;color:#2E5C26;}
.eng-warn{background:#FFF8E8;border:1.5px solid #EED870;border-radius:8px;padding:9px 12px;font-size:12px;color:#5A4000;line-height:1.65;margin-top:11px;}
.guide-wrap{background:#FDFAF5;border-radius:20px;border:1.5px solid #EAE0CC;overflow:hidden;}
.r-tabs{display:flex;gap:5px;flex-wrap:wrap;padding:12px 14px;background:rgba(234,224,204,.35);border-bottom:1px solid #EAE0CC;}
.r-tab{padding:5px 11px;border-radius:100px;border:1.5px solid #C8B898;background:#FDFAF5;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:500;cursor:pointer;transition:all .2s;color:#1E1208;}.r-tab.on{border-color:transparent;color:#fff;font-weight:700;}
.s-tabs{display:flex;border-bottom:1px solid #EAE0CC;}.s-tab{flex:1;padding:11px 6px;text-align:center;cursor:pointer;border-bottom:3px solid transparent;font-size:12px;font-weight:500;color:#888;transition:all .2s;}.s-tab.on{font-weight:700;border-bottom-color:currentColor;}
.l-tab{padding:5px 11px;border-radius:100px;border:1.5px solid #C8B898;background:#FDFAF5;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:500;cursor:pointer;transition:all .2s;color:#1E1208;}.l-tab.on{background:#2E5C26;border-color:#2E5C26;color:#fff;font-weight:700;}
.veg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:14px;}
.vc{border-radius:11px;border:1.5px solid #EAE0CC;background:#FDFAF5;padding:12px;transition:all .2s;cursor:pointer;}.vc:hover{border-color:#5A9450;}.vc.active{border-color:#2E5C26;background:rgba(46,92,38,.04);}.vc.nogo{opacity:.35;cursor:default;}
.vc-name{font-size:12px;font-weight:700;color:#1E1208;line-height:1.2;}.vc-diff{font-size:9px;font-weight:700;padding:1px 6px;border-radius:100px;display:inline-block;margin-top:2px;}.vc-action{font-size:11px;color:#5C4030;line-height:1.55;margin-bottom:6px;}
.vstatus{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;}
.vs-h{background:rgba(46,92,38,.1);color:#2E5C26;}.vs-s{background:rgba(184,78,30,.08);color:#B84E1E;}.vs-i{background:rgba(42,58,106,.08);color:#2A3A6A;}.vs-n{background:rgba(30,18,8,.05);color:#888;}
.vc-metas{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap;}.vc-meta{font-size:8.5px;padding:1px 6px;border-radius:100px;background:#EAE0CC;color:#5C4030;}
.veg-detail{grid-column:1/-1;background:#1E1208;border-radius:12px;padding:18px;}
.vd-title{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#fff;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.vd-reg{background:rgba(168,224,144,.1);border:1px solid rgba(168,224,144,.2);border-radius:9px;padding:10px 13px;font-size:12.5px;color:rgba(255,255,255,.9);line-height:1.65;margin-bottom:11px;}
.vd-eng{background:rgba(14,107,140,.15);border:1px solid rgba(14,107,140,.25);border-radius:9px;padding:9px 13px;margin-bottom:11px;}
.vd-eng-t{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#B0E8FF;margin-bottom:5px;}
.vd-eng-item{font-size:12px;color:rgba(255,255,255,.8);display:flex;gap:6px;padding:2px 0;}
.vd-tips{display:grid;grid-template-columns:1fr 1fr;gap:6px;}.vd-tip{display:flex;align-items:flex-start;gap:6px;font-size:12px;color:rgba(255,255,255,.7);line-height:1.5;}
.blog-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}.blog-card{background:#FDFAF5;border:1.5px solid #C8B898;border-radius:16px;overflow:hidden;cursor:pointer;transition:all .3s;}.blog-card:hover{transform:translateY(-3px);border-color:#5A9450;}
.blog-img{height:160px;overflow:hidden;}.blog-img img{width:100%;height:100%;object-fit:cover;}
.blog-body{padding:14px 16px 18px;}.blog-cat{display:inline-block;background:#EAE0CC;padding:2px 7px;border-radius:100px;font-size:9.5px;font-weight:700;color:#2E5C26;margin-bottom:7px;}
.blog-title{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:#1E1208;margin-bottom:6px;line-height:1.2;}.blog-excerpt{font-size:12px;color:#5C4030;line-height:1.7;margin-bottom:9px;}.blog-meta{font-size:10px;color:#888;}
.faq-cats{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:22px;}.faq-cat-btn{background:#FDFAF5;border:1.5px solid #C8B898;padding:5px 13px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;color:#1E1208;}.faq-cat-btn.on{background:#2E5C26;border-color:#2E5C26;color:#fff;font-weight:700;}
.faq-list{display:flex;flex-direction:column;gap:8px;}.faq-item{background:#FDFAF5;border:1.5px solid #C8B898;border-radius:11px;overflow:hidden;}.faq-item.open{border-color:#5A9450;}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;cursor:pointer;font-size:13.5px;font-weight:600;color:#1E1208;gap:8px;}.faq-q:hover{background:#EAE0CC;}
.faq-tog{font-size:17px;color:#C8B898;flex-shrink:0;transition:transform .25s;}.faq-tog.open{transform:rotate(45deg);color:#2E5C26;}
.faq-a{padding:0 16px 13px;font-size:13px;color:#5C4030;line-height:1.75;border-top:1px solid #EAE0CC;}
.sw{max-width:720px;margin:0 auto;padding:32px 18px 60px;}
.sh{font-family:'Cormorant Garamond',serif;font-size:clamp(24px,4vw,40px);font-weight:700;color:#1E1208;margin-bottom:14px;line-height:1.1;}.sh em{color:#2E5C26;font-style:italic;}
.sp{font-size:14px;color:#5C4030;line-height:1.85;margin-bottom:9px;}
.mv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px;}.mv-card{background:#FDFAF5;border:1.5px solid #EAE0CC;border-radius:13px;padding:18px;text-align:center;}
.mv-icon{font-size:30px;margin-bottom:8px;}.mv-t{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:#1E1208;margin-bottom:5px;}.mv-p{font-size:12px;color:#5C4030;line-height:1.7;}
.tg{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;}.tcard{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:17px;transition:transform .3s;}.tcard:hover{transform:translateY(-3px);}
.t-top{display:flex;align-items:center;gap:7px;margin-bottom:9px;}.t-av{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.t-nm{font-size:12px;font-weight:700;color:#fff;}.t-cy{font-size:9.5px;color:rgba(255,255,255,.35);}
.t-stars{color:#F5A623;font-size:11px;letter-spacing:1px;margin-bottom:5px;}.t-f{display:inline-block;background:rgba(168,224,144,.12);padding:2px 6px;border-radius:100px;font-size:9.5px;font-weight:700;color:#A8E090;margin-bottom:7px;}
.t-txt{font-size:12px;color:rgba(255,255,255,.7);line-height:1.75;font-style:italic;}.t-det{font-size:10px;color:rgba(255,255,255,.3);margin-top:5px;font-weight:600;}
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:840px;margin:36px auto 0;}
.pcard{background:#FDFAF5;border:1.5px solid #C8B898;border-radius:16px;padding:22px;position:relative;}.pcard.feat{background:#1E1208;border-color:#1E1208;}
.p-feat-badge{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#B84E1E;color:#fff;font-size:9px;font-weight:700;padding:2px 11px;border-radius:100px;white-space:nowrap;}
.p-name{font-size:9.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#888;margin-bottom:8px;}.pcard.feat .p-name{color:rgba(255,255,255,.4);}
.p-amt{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;color:#1E1208;line-height:1;}.pcard.feat .p-amt{color:#fff;}
.p-per{font-size:10px;color:#888;margin-top:3px;margin-bottom:13px;}.pcard.feat .p-per{color:rgba(255,255,255,.35);}
.p-feats{list-style:none;margin-bottom:14px;}.p-feats li{display:flex;align-items:flex-start;gap:5px;font-size:11.5px;color:#5C4030;padding:4px 0;border-bottom:1px solid #EAE0CC;line-height:1.5;}.p-feats li:last-child{border:none;}
.pcard.feat .p-feats li{color:rgba(255,255,255,.65);border-color:rgba(255,255,255,.07);}
.pchk{color:#2E5C26;font-weight:800;flex-shrink:0;}.pcard.feat .pchk{color:#A8E090;}
.bp{width:100%;padding:9px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12.5px;font-weight:700;cursor:pointer;border:none;transition:all .2s;}
.bp.out{background:transparent;border:1.5px solid #C8B898;color:#1E1208;}.bp.feat{background:#A8E090;color:#1E1208;}.bp.mai{background:#B84E1E;color:#fff;}
.hb{background:linear-gradient(135deg,#0A3F57 0%,#0E6B8C 100%);border-radius:18px;padding:32px;display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;}
.hb-eye{display:inline-block;background:rgba(176,232,255,.2);border:1px solid rgba(176,232,255,.3);color:#B0E8FF;padding:3px 10px;border-radius:100px;font-size:9.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:10px;}
.hb-title{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,3.5vw,36px);font-weight:700;color:#fff;line-height:1.1;margin-bottom:11px;}.hb-title em{color:#B0E8FF;font-style:italic;}
.hb-sub{font-size:13.5px;color:rgba(255,255,255,.65);line-height:1.75;margin-bottom:18px;}
.hb-stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;}.hs{background:rgba(255,255,255,.08);border-radius:10px;padding:9px 13px;text-align:center;}
.hs-n{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#B0E8FF;}.hs-l{font-size:9px;color:rgba(255,255,255,.5);margin-top:2px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;}
.hb-right{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:20px;}
.hb-right-t{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:11px;}
.hb-item{display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:12px;color:rgba(255,255,255,.78);line-height:1.5;}.hb-item:last-child{border:none;}
.ctab{background:#1E1208;padding:56px 36px;text-align:center;}.ctab-note{font-size:11.5px;color:rgba(255,255,255,.3);margin-top:10px;}
.footer{padding:36px 36px 22px;border-top:1px solid #EAE0CC;}
.footer-g{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:24px;margin-bottom:24px;}
.f-logo{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#2E5C26;}.f-logo em{color:#B84E1E;font-style:italic;}
.f-tag{font-size:11.5px;color:#5C4030;margin-top:5px;line-height:1.65;max-width:195px;}.f-col-t{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#1E1208;margin-bottom:9px;}
.f-links{list-style:none;display:flex;flex-direction:column;gap:5px;}.f-links button{font-size:12px;color:#5C4030;background:none;border:none;cursor:pointer;padding:0;font-family:'Plus Jakarta Sans',sans-serif;text-align:left;transition:color .2s;}.f-links button:hover{color:#1E1208;}
.f-bot{border-top:1px solid #EAE0CC;padding-top:13px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:7px;font-size:10.5px;color:#aaa;}
.dash{display:grid;grid-template-columns:220px 1fr;min-height:calc(100vh - 57px);}
.dash-side{background:#1E1208;padding:24px 0;position:sticky;top:57px;height:calc(100vh - 57px);overflow-y:auto;}
.dash-logo{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#fff;padding:0 20px 20px;border-bottom:1px solid rgba(255,255,255,.08);}.dash-logo em{color:#A8E090;font-style:italic;}
.dash-nav{padding:12px 0;}
.dash-link{display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;color:rgba(255,255,255,.55);font-size:13px;font-weight:500;transition:all .2s;border-left:3px solid transparent;}.dash-link:hover{color:#fff;background:rgba(255,255,255,.05);}
.dash-link.on{color:#fff;background:rgba(168,224,144,.08);border-left-color:#A8E090;font-weight:700;}
.dash-main{padding:32px 36px;background:#F7F3EC;overflow-y:auto;}
.dash-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#1E1208;margin-bottom:6px;}.dash-sub{font-size:13px;color:#5C4030;margin-bottom:28px;}
.dash-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;}
.dcard{background:#FDFAF5;border:1.5px solid #EAE0CC;border-radius:14px;padding:16px;}.dc-icon{font-size:28px;margin-bottom:8px;}
.dc-val{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#1E1208;line-height:1;}.dc-label{font-size:11px;color:#888;margin-top:3px;}
.dp{background:#FDFAF5;border:1.5px solid #EAE0CC;border-radius:14px;padding:16px;margin-bottom:13px;}
.dp-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}.dp-title{font-size:13.5px;font-weight:700;color:#1E1208;display:flex;align-items:center;gap:7px;}.dp-pct{font-size:11.5px;font-weight:700;color:#2E5C26;}
.dp-bar{height:8px;border-radius:100px;background:#EAE0CC;overflow:hidden;}.dp-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#5A9450,#2E5C26);transition:width .6s;}
.badge-grid{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px;}.badge{background:#FDFAF5;border:1.5px solid #EAE0CC;border-radius:12px;padding:12px 14px;text-align:center;width:100px;}.badge.earned{border-color:#D4850A;background:rgba(212,133,10,.05);}
.badge-em{font-size:28px;margin-bottom:5px;}.badge-n{font-size:10px;font-weight:700;color:#1E1208;}.badge-desc{font-size:9px;color:#888;margin-top:2px;}
.comm-post{background:#FDFAF5;border:1.5px solid #EAE0CC;border-radius:12px;padding:14px;margin-bottom:11px;}
.cp-top{display:flex;align-items:center;gap:9px;margin-bottom:8px;}.cp-av{width:34px;height:34px;border-radius:50%;background:#EAE0CC;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
.cp-name{font-size:12.5px;font-weight:700;color:#1E1208;}.cp-time{font-size:10px;color:#888;}.cp-txt{font-size:13px;color:#5C4030;line-height:1.7;}.cp-likes{font-size:11px;color:#888;margin-top:8px;display:flex;align-items:center;gap:5px;}
.sm-overlay{position:fixed;inset:0;background:rgba(30,18,8,.8);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px;}
.sm-card{background:#FDFAF5;border-radius:20px;max-width:520px;width:100%;overflow:hidden;}
.sm-top{background:#1E1208;padding:24px;display:flex;align-items:center;gap:14px;}.sm-top-em{font-size:36px;}
.sm-top-t{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#fff;}.sm-top-s{font-size:12px;color:rgba(255,255,255,.45);margin-top:4px;}
.sm-body{padding:22px;}.sm-steps{display:flex;flex-direction:column;gap:14px;margin-bottom:18px;}.sm-step{display:flex;align-items:flex-start;gap:11px;font-size:13px;color:#5C4030;line-height:1.65;}
.sm-n{width:24px;height:24px;border-radius:50%;background:#2E5C26;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;}
.sm-code{background:#1E1208;color:#A8E090;padding:10px 14px;border-radius:9px;font-family:monospace;font-size:12px;margin-bottom:14px;white-space:pre;}
.sm-test{background:#EAF5E8;border:1.5px solid rgba(46,92,38,.2);border-radius:9px;padding:10px 13px;font-size:12.5px;color:#2E5C26;margin-bottom:18px;}
.lm-overlay{position:fixed;inset:0;background:rgba(30,18,8,.78);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px;}
.lm-card{background:#FDFAF5;border-radius:20px;max-width:460px;width:100%;overflow:hidden;}
.lm-top{background:linear-gradient(135deg,#2A4F24,#2E5C26);padding:24px;text-align:center;}
.lm-icon{font-size:48px;margin-bottom:9px;}.lm-t{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#fff;margin-bottom:6px;line-height:1.1;}.lm-s{font-size:12.5px;color:rgba(255,255,255,.7);line-height:1.65;}
.lm-body{padding:20px;}.lm-incs{display:flex;flex-direction:column;gap:7px;margin-bottom:18px;}.lm-inc{display:flex;align-items:center;gap:8px;font-size:13px;color:#1E1208;}
.lm-chk{color:#2E5C26;font-weight:800;flex-shrink:0;font-size:14px;}.lm-form{display:flex;flex-direction:column;gap:8px;}
.lm-input{background:#F7F3EC;border:1.5px solid #C8B898;border-radius:9px;padding:10px 12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#1E1208;outline:none;}.lm-input:focus{border-color:#2E5C26;}
.lm-btn{background:#B84E1E;color:#fff;border:none;padding:12px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;width:100%;}
.lm-skip{text-align:center;margin-top:9px;}.lm-skip-btn{background:none;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;color:#aaa;cursor:pointer;text-decoration:underline;}
.cf-label{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#1E1208;margin-bottom:4px;display:block;}
.cf-input{background:#F7F3EC;border:1.5px solid #C8B898;border-radius:9px;padding:10px 12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#1E1208;outline:none;transition:border-color .2s;width:100%;}.cf-input:focus{border-color:#2E5C26;}
.cgv-art{margin-bottom:24px;}.cgv-t{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#1E1208;margin-bottom:8px;border-left:3px solid #2E5C26;padding-left:10px;}
.flora-btn{position:fixed;bottom:18px;right:18px;width:46px;height:46px;border-radius:50%;background:#2E5C26;border:none;cursor:pointer;font-size:20px;box-shadow:0 6px 20px rgba(46,92,38,.4);transition:all .2s;z-index:500;}.flora-btn:hover{transform:scale(1.08);background:#1E4018;}
.flora-panel{position:fixed;bottom:73px;right:18px;width:295px;background:#1E1208;border-radius:17px;border:1px solid rgba(255,255,255,.1);box-shadow:0 16px 52px rgba(0,0,0,.4);display:flex;flex-direction:column;z-index:500;transform:scale(.9) translateY(14px);opacity:0;pointer-events:none;transition:all .22s;max-height:430px;}
.flora-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
.fp-hd{padding:10px 13px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:7px;border-radius:17px 17px 0 0;}
.fp-av{width:27px;height:27px;border-radius:50%;background:#2E5C26;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}
.fp-nm{font-size:11.5px;font-weight:700;color:#fff;}.fp-st{font-size:8.5px;color:#A8E090;}
.fp-on{width:5px;height:5px;border-radius:50%;background:#6EE86E;margin-left:auto;animation:pp 2s infinite;}
@keyframes pp{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
.fp-cl{background:rgba(255,255,255,.08);border:none;color:rgba(255,255,255,.4);width:22px;height:22px;border-radius:50%;cursor:pointer;font-size:10px;}
.fp-msgs{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:6px;min-height:0;}
.fp-bub{padding:6px 10px;border-radius:10px;font-size:12px;line-height:1.55;max-width:88%;}.fp-bub.f{background:rgba(255,255,255,.09);color:rgba(255,255,255,.9);align-self:flex-start;border-bottom-left-radius:3px;}.fp-bub.u{background:#2E5C26;color:#fff;align-self:flex-end;border-bottom-right-radius:3px;}
.fp-in-row{display:flex;gap:5px;padding:6px 9px;border-top:1px solid rgba(255,255,255,.07);border-radius:0 0 17px 17px;}
.fp-in{flex:1;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.1);border-radius:100px;padding:6px 10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11.5px;color:#fff;outline:none;}.fp-in:focus{border-color:#A8E090;}.fp-in::placeholder{color:rgba(255,255,255,.25);}
.fp-send{width:27px;height:27px;border-radius:50%;background:#2E5C26;border:none;cursor:pointer;color:#fff;font-size:11px;flex-shrink:0;}.fp-send:hover{background:#B84E1E;}.fp-send:disabled{opacity:.4;cursor:not-allowed;}
.td-r{display:flex;gap:3px;align-items:center;}.td{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.4);animation:tdot 1.2s infinite;}.td:nth-child(2){animation-delay:.2s}.td:nth-child(3){animation-delay:.4s}
@keyframes tdot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
@media(max-width:900px){
  .nav-links{display:none;}.hero{grid-template-columns:1fr;padding:84px 14px 48px;gap:24px;}.hcard{display:none;}
  .fg,.pg,.eng-grid,.blog-grid,.footer-g,.tg,.mv-grid{grid-template-columns:1fr !important;}
  .veg-grid{grid-template-columns:1fr 1fr !important;}.hb{grid-template-columns:1fr !important;gap:18px;}.vd-tips{grid-template-columns:1fr !important;}
  .sec{padding:44px 14px;}.dash{grid-template-columns:1fr;}.dash-side{position:static;height:auto;}.dash-main{padding:20px 14px;}
  .dash-cards{grid-template-columns:1fr 1fr;}.flora-panel{width:calc(100vw - 24px);right:12px;}
}`;


const FLORA_KB=[
  {keys:["ortie","purin","engrais","azote","npk"],r:"Le purin d'ortie est l'engrais naturel le plus puissant 🌿 Faites macérer 1 kg d'orties dans 10L d'eau de pluie pendant 2-3 semaines. Diluez à 10% (1L pour 10L d'eau) pour arroser, à 5% pour pulvériser contre les pucerons. À combiner avec le purin de consoude pour un NPK complet."},
  {keys:["consoude","floraison","fruit","potassium","fleur"],r:"Le purin de consoude est idéal pour la floraison et les fruits 🌸 Il est riche en potassium et phosphore. Mêmes proportions que l'ortie : 1 kg de feuilles pour 10L d'eau, 3-4 semaines de fermentation. Utilisez-le dès les premières fleurs de vos tomates, poivrons et courgettes."},
  {keys:["banane","épluche","épluchure"],r:"Les épluchures de banane en macération sont parfaites pour la floraison 🍌 Découpez 3-4 épluchures dans 1L d'eau froide, laissez 3-5 jours, filtrez. À utiliser pur ou dilué à 50% une fois par semaine pendant la floraison. Gratuit et très efficace pour les tomates et fraisiers."},
  {keys:["café","marc","limace"],r:"Le marc de café séché est un fertilisant léger et répulsif naturel ☕ Étalez-le sur une assiette 24h avant usage pour éviter les moisissures. Saupoudrez en fine couche sur le substrat ou mélangez à 15% maximum. Excellent pour les fraisiers, myrtilles et basilic. Légèrement acidifiant."},
  {keys:["tomate","tomates"],r:"Pour les tomates : substrat de 12L minimum (20L recommandé), exposition plein sud, arrosage régulier à la base uniquement. Pincez les gourmands chaque semaine. Fertilisez avec purin d'ortie en croissance, purin de consoude dès les premières fleurs. Évitez d'arroser le feuillage pour prévenir le mildiou 🍅"},
  {keys:["courgette","courgettes"],r:"Les courgettes sont faciles mais voraces : minimum 40L de substrat par plant, arrosage abondant. Un seul plant suffit pour une famille ! Récoltez jeune (15-20 cm) pour maintenir la production. Purin d'ortie en début de croissance, purin de consoude à la floraison. Surveillez l'oïdium en été 🥒"},
  {keys:["salade","laitue","mesclun","roquette"],r:"Les salades sont idéales pour débuter 🥬 Semez en petites quantités toutes les 2-3 semaines pour étaler la récolte. Elles acceptent la mi-ombre. Arrosez le matin, évitez le soir. Récoltez feuille à feuille pour prolonger la production. Engrais : purin d'ortie dilué à 5% toutes les 3 semaines."},
  {keys:["basilic","aromatique","herbe","persil","menthe","thym"],r:"Les herbes aromatiques sont les cultures les plus rentables 🌿 Le basilic aime la chaleur (20°C min), jamais d'eau sur les feuilles. Taillez régulièrement pour éviter la montée en fleurs. La menthe envahit tout : toujours en pot ! Le thym et le romarin aiment les sols pauvres et secs."},
  {keys:["fraise","fraisier","framboise"],r:"Les fraisiers adorent les épluchures de banane en macération 🍓 Plantez en mars-avril ou août-septembre. Paillez le sol pour garder les fruits propres. Épluchures de banane à la floraison + purin de consoude. Renouvelez les plants tous les 3 ans. Les framboises préfèrent les régions fraîches."},
  {keys:["micropousse","micropouss","germination"],r:"Les micropousses sont les cultures les plus rapides : récolte en 7 à 14 jours seulement 🌱 Semez dense sur un plateau humide, couvrez 3 jours, puis mettez sous lumière. Tournesol, brocoli, radis et pois sont les plus faciles. 10x plus riches en nutriments que les légumes adultes. Parfait en appartement."},
  {keys:["hydroponie","hydro","nft","dwc","kratky","eau","sans terre"],r:"L'hydroponie permet de cultiver sans terre avec 90% moins d'eau 💧 Commencez par le système Kratky (passif, sans pompe) avec de la laitue dans un bocal. Maintenez le pH entre 6.0 et 6.5, l'EC entre 1.2 et 2.0 pour les légumes-feuilles. Notre formation Hydroponie vous guide de A à Z."},
  {keys:["led","lumière","lamp","éclairage","intérieur","appartement","indoor"],r:"Pour cultiver en intérieur, une LED full-spectrum de 40-60W couvre 60x60 cm 💡 Distance : 20-30 cm des plantes pour les semis, 15-20 cm pour les micropousses. Durée : 14-16h/jour en végétation, 12h pour la floraison. Les micropousses et les salades sont les cultures les plus adaptées à la lumière artificielle."},
  {keys:["nord","normandie","bretagne","idf","paris","atlantique","sud","paca","montagne"],r:"La France a 6 zones climatiques très différentes 🗺️ En Méditerranée, vous cultivez de mars à novembre. Au Nord, dernière gelée mi-mai, commencez tout en intérieur. En Normandie, humidité = risque mildiou, choisissez des variétés résistantes. Consultez notre guide saisonnier par région pour un calendrier précis."},
  {keys:["semis","semer","graine","graines"],r:"Pour réussir vos semis : substrat léger et humide, température 18-22°C, lumière indirecte après levée 🌱 Les tomates et poivrons nécessitent 6-8 semaines avant repiquage. Les radis et salades peuvent être semés directement en pleine terre. Échelonnez vos semis toutes les 2-3 semaines pour récolter en continu."},
  {keys:["arrosage","eau","arroser","sécheresse","manque"],r:"Règle d'or de l'arrosage : toujours à la base, jamais sur le feuillage 💧 Vérifiez le substrat : le doigt enfoncé à 2 cm doit sentir de l'humidité. En pot, arrosez quand le substrat est sec en surface. En été, arrosez tôt le matin ou le soir. L'eau de cuisson refroidie est un excellent engrais gratuit."},
  {keys:["puceron","maladie","nuisible","parasite","mildiou","oïdium"],r:"Contre les pucerons : purin d'ortie dilué à 5% en pulvérisation sur le feuillage 🌿 Préventif : plantez du basilic et de la menthe à proximité des tomates. Pour le mildiou : n'arrosez jamais le feuillage, aérez, supprimez les feuilles touchées. L'ail en décoction est un excellent répulsif universel."},
  {keys:["pot","bac","contenant","volume","litre"],r:"Le volume est crucial : tomates cerises 12-20L, grosses tomates 30-40L, courgettes 40L, pommes de terre 60L, salades et herbes 4-8L suffisent 🪴 Toujours une couche de drainage au fond (billes d'argile ou gravier). Le substrat doit être léger et aéré, jamais de terre de jardin en pot."},
  {keys:["balcon","terrasse","appartement","petit espace","fenêtre"],r:"En appartement ou sur balcon, tout est possible 🏙️ Commencez par les herbes (basilic, persil, ciboulette), puis les tomates cerises, puis les salades. Utilisez des pots adaptés, respectez les volumes minimaux. Notre formation Balcon & Appartement vous guide pas à pas pour votre premier potager productif."},
  {keys:["gratuit","économie","économiser","prix","coût"],r:"Un potager maison rentabilise son investissement en 2-3 mois 💰 Nos élèves économisent en moyenne 84€/mois. Les engrais maison (épluchures, eau de cuisson, marc de café) remplacent totalement les engrais du commerce. Commencez par les herbes aromatiques : les plus rentables au mètre carré."},
];

function floraAnswer(question){
  const q=question.toLowerCase();
  for(const entry of FLORA_KB){
    if(entry.keys.some(k=>q.includes(k))) return entry.r;
  }
  return "Bonne question 🌿 Pour y répondre précisément, j'aurais besoin de connaître votre région, votre type d'espace (balcon, terrasse, intérieur) et les cultures qui vous intéressent. En attendant, consultez notre guide saisonnier et nos 8 recettes d'engrais maison — ils répondent à la majorité des questions !";
}

function FloraChat(){
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([{r:"f",t:"Bonjour 🌿 Je suis Flora, votre guide jardinage PousseLab. Posez-moi une question sur les engrais naturels, les légumes, votre région, ou les techniques de culture — je suis là pour vous aider !"}]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const send=()=>{
    const text=inp.trim();if(!text||loading)return;
    setMsgs(p=>[...p,{r:"u",t:text}]);
    setInp("");setLoading(true);
    setTimeout(()=>{
      const reply=floraAnswer(text);
      setMsgs(p=>[...p,{r:"f",t:reply}]);
      setLoading(false);
    },600);
  };

  return(<>
    <div className={"flora-panel"+(open?" open":"")}>
      <div className="fp-hd">
        <div className="fp-av">🌿</div>
        <div><div className="fp-nm">Flora — Guide jardinage</div><div className="fp-st">Engrais · Légumes · Régions · Techniques</div></div>
        <div className="fp-on"/>
        <button className="fp-cl" onClick={()=>setOpen(false)}>✕</button>
      </div>
      <div className="fp-msgs">
        {msgs.map((m,i)=><div key={i} className={"fp-bub "+(m.r==="f"?"f":"u")}>{m.t}</div>)}
        {loading&&<div className="fp-bub f"><div className="td-r"><div className="td"/><div className="td"/><div className="td"/></div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:5,padding:"5px 7px",borderTop:"1px solid rgba(255,255,255,.07)",flexWrap:"wrap"}}>
        {["Engrais tomates","Purin d'ortie","Cultiver en appart","Hydroponie"].map((s,i)=>(
          <button key={i} onClick={()=>{setInp(s);}} style={{background:"rgba(255,255,255,.08)",border:"none",color:"rgba(255,255,255,.7)",borderRadius:100,padding:"3px 9px",fontSize:10.5,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s}</button>
        ))}
      </div>
      <div className="fp-in-row">
        <input className="fp-in" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ex: quand semer les tomates ?"/>
        <button className="fp-send" onClick={send} disabled={loading||!inp.trim()}>➤</button>
      </div>
    </div>
    <button className="flora-btn" onClick={()=>setOpen(o=>!o)}>🌿</button>
  </>);
}


function LeadMagnet({onClose}){
  const [email,setEmail]=useState("");const [prenom,setPrenom]=useState("");const [ok,setOk]=useState(false);
  return(<div className="lm-overlay" onClick={onClose}><div className="lm-card" onClick={e=>e.stopPropagation()}>
    <div className="lm-top"><div className="lm-icon">🎁</div><div className="lm-t">Guide gratuit — 20 pages</div><div className="lm-s">5 légumes en 30 jours + 4 recettes d'engrais maison + calendrier régionalisé.</div></div>
    <div className="lm-body">{!ok?(<>
      <div className="lm-incs">{["Calendrier semis adapté à votre région française","5 légumes les plus faciles (dont 3 en 25 jours)","4 recettes d'engrais maison zéro déchet","Substrat idéal : recette complète pour moins de 15€","Bonus : 1ère leçon PousseLab débloquée"].map((item,i)=><div key={i} className="lm-inc"><span className="lm-chk">✓</span>{item}</div>)}</div>
      <div className="lm-form"><input className="lm-input" placeholder="Votre prénom" value={prenom} onChange={e=>setPrenom(e.target.value)}/><input className="lm-input" type="email" placeholder="Votre email" value={email} onChange={e=>setEmail(e.target.value)}/><button className="lm-btn" onClick={()=>{if(email&&prenom)setOk(true);}}>Recevoir mon guide gratuit →</button></div>
      <div className="lm-skip"><button className="lm-skip-btn" onClick={onClose}>Non merci</button></div>
    </>):(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:12}}>🌱</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,marginBottom:8}}>C'est parti, {prenom} !</div><div style={{fontSize:13,color:C.muted}}>Votre guide arrive dans votre boîte mail.</div><button className="btn-p" style={{marginTop:16,justifyContent:"center"}} onClick={onClose}>Accéder au site →</button></div>)}
    </div>
  </div></div>);
}

function StripeModal({formation,onClose,onPurchase}){
  const f=FORMATIONS.find(x=>x.id===formation);if(!f)return null;
  const isConf=!STRIPE[f.stripe].includes("VOTRE_LIEN");
  const handleBuy=()=>{
    onPurchase(f.id);
    if(isConf){window.open(STRIPE[f.stripe],"_blank");}
    onClose();
  };
  return(<div className="sm-overlay" onClick={onClose}><div className="sm-card" onClick={e=>e.stopPropagation()}>
    <div className="sm-top"><div className="sm-top-em">{f.emoji}</div><div><div className="sm-top-t">{f.title}</div><div className="sm-top-s">{f.price}€ · accès à vie · garantie 30 jours</div></div></div>
    <div className="sm-body">
      {isConf?(
        <div>
          <div style={{fontSize:14,color:C.muted,marginBottom:16,lineHeight:1.7}}>Vous allez être redirigé vers notre page de paiement sécurisé Stripe. Après votre achat, vous aurez un accès immédiat à toutes les leçons et au quiz de validation.</div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="btn-s sm2" onClick={onClose}>Annuler</button>
            <button className="btn-p sm2" onClick={handleBuy}>Accéder au paiement sécurisé →</button>
          </div>
        </div>
      ):(
        <div>
          <div className="sm-test" style={{marginBottom:14}}>🔧 Mode démo — Stripe non configuré. Cliquez ci-dessous pour simuler un achat et débloquer la formation.</div>
          <div className="sm-steps">
            {["Créez un compte sur stripe.com (gratuit)","Créez un produit « "+f.title+" » à "+f.price+"€","Copiez le Payment Link généré","Remplacez VOTRE_LIEN_"+f.stripe.toUpperCase()+" dans le code"].map((s,i)=><div key={i} className="sm-step"><div className="sm-n">{i+1}</div>{s}</div>)}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",flexWrap:"wrap"}}>
            <button className="btn-s sm2" onClick={onClose}>Fermer</button>
            <button className="btn-p sm2" onClick={handleBuy} style={{background:C.gold}}>🧪 Simuler l'achat (démo) → débloquer</button>
          </div>
        </div>
      )}
    </div>
  </div></div>);
}


function Nav({page,go,setShowLead}){
  return(<nav className="nav">
    <div className="nav-logo" onClick={()=>go("home")}>Pousse<em>Lab</em></div>
    <div className="nav-links">{[["home","Accueil"],["guide","Calendrier"],["engrais","Engrais maison"],["formations","Formations"],["blog","Blog"],["materiel","Matériel"],["faq","FAQ"],["dashboard","Mon espace"]].map(([id,l])=><button key={id} className={"nl"+(page===id?" on":"")} onClick={()=>go(id)}>{l}</button>)}</div>
    <div className="nav-r"><button className="btn-g" onClick={()=>setShowLead(true)}>Guide gratuit 🎁</button><button className="btn-tn" onClick={()=>go("formations")}>Commencer →</button></div>
  </nav>);
}

function Footer({go}){
  return(<footer className="footer"><div className="max">
    <div className="footer-g">
      <div><div className="f-logo">Pousse<em>Lab</em></div><div className="f-tag">Cultiver ses légumes avec ses épluchures pour manger mieux — adapté à chaque région de France.</div></div>
      <div><div className="f-col-t">Formations</div><ul className="f-links">{FORMATIONS.map(f=><li key={f.id}><button onClick={()=>go("formations")}>{f.emoji} {f.title}</button></li>)}</ul></div>
      <div><div className="f-col-t">Ressources</div><ul className="f-links"><li><button onClick={()=>go("guide")}>🗓️ Guide saisonnier</button></li><li><button onClick={()=>go("engrais")}>♻️ Engrais maison</button></li><li><button onClick={()=>go("blog")}>📝 Blog jardinage</button></li><li><button onClick={()=>go("materiel")}>🛒 Matériel</button></li><li><button onClick={()=>go("faq")}>❓ FAQ</button></li></ul></div>
      <div><div className="f-col-t">PousseLab</div><ul className="f-links"><li><button onClick={()=>go("mission")}>🌱 Notre mission</button></li><li><button onClick={()=>go("temoignages")}>⭐ Témoignages</button></li><li><button onClick={()=>go("contact")}>✉️ Contact</button></li><li><button onClick={()=>go("cgv")}>📄 CGV</button></li><li><button onClick={()=>go("dashboard")}>🔐 Mon espace</button></li></ul></div>
    </div>
    <div className="f-bot"><div>© 2026 PousseLab — Tous droits réservés</div><div>Paiement sécurisé Stripe PCI-DSS · Garantie 30 jours · Flora IA 24h/24</div></div>
  </div></footer>);
}

function InfographieBac(){
  const [sel,setSel]=useState(null);
  return(<div style={{background:C.white,border:`1.5px solid ${C.light}`,borderRadius:18,overflow:"hidden",marginTop:28}}>
    <div style={{background:"#F5EAD8",borderBottom:`1.5px solid ${C.sand}`,padding:"16px 22px",textAlign:"center"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(15px,2.5vw,22px)",fontWeight:800,color:C.bark,textTransform:"uppercase",letterSpacing:".03em",lineHeight:1.2}}>Choisir la bonne hauteur de bac surélevé pour vos légumes</div></div>
    <div style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:14}}>
      {BAC_DATA.map((bac,bi)=>(
        <div key={bi} onClick={()=>setSel(sel===bi?null:bi)} style={{display:"flex",alignItems:"stretch",gap:18,cursor:"pointer",background:sel===bi?bac.colorL:"transparent",borderRadius:13,padding:"11px 13px",border:`1.5px solid ${sel===bi?bac.color+"60":"transparent"}`,transition:"all .2s"}}>
          <div style={{flexShrink:0,width:110,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg viewBox="0 0 110 90" width="110" height="90">
              <rect x="5" y={bac.legs?18:8} width="100" height="10" rx="2" fill="#8B6355" opacity=".45"/>
              {Array.from({length:bac.planks}).map((_,pi)=><rect key={pi} x="3" y={(bac.legs?28:18)+pi*12} width="104" height="11" rx="2" fill={bac.color} opacity={1-pi*0.1}/>)}
              {bac.legs&&<><rect x="6" y={28+bac.planks*12} width="9" height="20" rx="2" fill={bac.color}/><rect x="95" y={28+bac.planks*12} width="9" height="20" rx="2" fill={bac.color}/></>}
              <text x="55" y="88" textAnchor="middle" fill={bac.color} fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">{bac.h}</text>
            </svg>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,color:bac.color,marginBottom:5}}>Section {bi+1} — {bac.label} ({bac.h})</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:9}}>{bac.desc}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {bac.veg.slice(0,sel===bi?bac.veg.length:5).map((v,vi)=><div key={vi} style={{display:"flex",alignItems:"center",gap:4,background:bac.colorL,border:`1px solid ${bac.color}30`,padding:"2px 8px",borderRadius:100,fontSize:11,fontWeight:600,color:bac.color}}><span>{v.e}</span>{v.n}</div>)}
              {sel!==bi&&bac.veg.length>5&&<div style={{fontSize:10.5,color:"#888",padding:"2px 8px",borderRadius:100,background:C.light,fontWeight:600}}>+{bac.veg.length-5} →</div>}
            </div>
          </div>
          <div style={{flexShrink:0,color:C.sand,fontSize:14,display:"flex",alignItems:"center",transition:"transform .25s",transform:sel===bi?"rotate(180deg)":"rotate(0deg)"}}>▾</div>
        </div>
      ))}
    </div>
    <div style={{background:C.light,padding:"10px 20px",fontSize:11.5,color:C.muted,borderTop:`1px solid ${C.sand}`}}>💡 <strong>Règle simple :</strong> plus la racine est longue, plus le bac doit être profond. Cliquez pour voir tous les légumes.</div>
  </div>);
}

function InfographiePot(){
  const [sel,setSel]=useState(null);const PH=[50,62,75,88,100];
  return(<div style={{background:C.white,border:`1.5px solid ${C.light}`,borderRadius:18,overflow:"hidden",marginTop:20}}>
    <div style={{background:"#EAF0E8",borderBottom:`1.5px solid ${C.sand}`,padding:"16px 22px",textAlign:"center"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(15px,2.5vw,22px)",fontWeight:800,color:C.bark,textTransform:"uppercase",letterSpacing:".03em",lineHeight:1.2}}>Choisir la bonne taille de pot pour chaque légume</div></div>
    <div style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:12}}>
      {POT_DATA.map((pot,pi)=>(
        <div key={pi} onClick={()=>setSel(sel===pi?null:pi)} style={{display:"flex",alignItems:"stretch",gap:16,cursor:"pointer",background:sel===pi?pot.colorL:"transparent",borderRadius:12,padding:"10px 12px",border:`1.5px solid ${sel===pi?pot.color+"50":"transparent"}`,transition:"all .2s"}}>
          <div style={{flexShrink:0,width:75,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg viewBox="0 0 75 110" width="75" height="110">
              <path d={`M${19-pi},${110-PH[pi]} L${56+pi},${110-PH[pi]} L61,107 L14,107 Z`} fill={pot.color} opacity=".85"/>
              <rect x={13-pi} y={106-PH[pi]-4} width={49+pi*2} height="5" rx="2" fill={pot.color}/>
              <ellipse cx="37" cy={111-PH[pi]} rx={21+pi} ry="4" fill="#6B4226" opacity=".55"/>
              <text x="37" y="104" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">{pot.v}</text>
            </svg>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,color:pot.color,marginBottom:4}}>{pot.v} — {pot.desc}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {pot.veg.slice(0,sel===pi?pot.veg.length:4).map((v,vi)=><div key={vi} style={{display:"flex",alignItems:"center",gap:3,background:pot.colorL,border:`1px solid ${pot.color}30`,padding:"2px 7px",borderRadius:100,fontSize:10.5,fontWeight:600,color:pot.color}}><span>{v.e}</span>{v.n}</div>)}
              {sel!==pi&&pot.veg.length>4&&<div style={{fontSize:10.5,color:"#888",padding:"2px 7px",borderRadius:100,background:C.light,fontWeight:600}}>+{pot.veg.length-4} →</div>}
            </div>
          </div>
          <div style={{flexShrink:0,color:C.sand,fontSize:14,display:"flex",alignItems:"center",transition:"transform .25s",transform:sel===pi?"rotate(180deg)":"rotate(0deg)"}}>▾</div>
        </div>
      ))}
    </div>
    <div style={{background:C.light,padding:"10px 20px",fontSize:11.5,color:C.muted,borderTop:`1px solid ${C.sand}`}}>💡 <strong>Astuce :</strong> en cas de doute, prenez toujours le pot plus grand — les plantes ne se plaignent jamais d'avoir trop de place.</div>
  </div>);
}

function Home({go,setShowLead,setSF}){
  return(<>
    <section className="hero">
      <div>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:C.white,border:`1.5px solid ${C.sand}`,padding:"4px 12px",borderRadius:100,fontSize:12,color:C.moss,fontWeight:700,marginBottom:18}}>🌱 Plateforme jardinage n°1 en France</div>
        <h1 className="h1">Offrez à votre famille<br/>des légumes cultivés<br/><em>avec amour</em></h1>
        <p className="hero-sub">Guide saisonnier par région · Engrais maison gratuits · Hydroponie · Flora IA. Tout pour cultiver vraiment.</p>
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <div className="av-stack">{["👩","🧔","👩‍🦱","👨","👩‍🦳"].map((a,i)=><div key={i} className="av">{a}</div>)}</div>
          <div><div style={{color:C.gold,fontSize:11,letterSpacing:1}}>★★★★★</div><div style={{fontSize:12,fontWeight:600}}><strong style={{color:C.moss}}>4 870+</strong> familles nous font confiance</div></div>
        </div>
        <div className="hbtns"><button className="btn-p" onClick={()=>setShowLead(true)}>Guide gratuit — 20 pages 🎁</button><button className="btn-s" onClick={()=>go("guide")}>Mon calendrier →</button></div>
      </div>
      <div style={{display:"flex",justifyContent:"center"}}><div className="hcard"><div className="hcard-img">🌿</div><div className="hcard-body"><div className="hcard-title">Guide saisonnier régionalisé</div><div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{["📍 6 régions","4 saisons","17+ légumes"].map((t,i)=><div key={i} style={{fontSize:10,fontWeight:600,background:C.light,padding:"2px 7px",borderRadius:100}}>{t}</div>)}</div><button className="hcard-btn" onClick={()=>go("guide")}>Accéder gratuitement →</button></div></div></div>
    </section>
    <div className="tbar">{[{n:"4 870+",l:"Familles cultivent"},{n:"5",l:"Formations"},{n:"8",l:"Recettes engrais"},{n:"127€",l:"Économisés/mois"}].map((t,i)=><div key={i} className="tbc"><span className="tbc-n">{t.n}</span><div className="tbc-l">{t.l}</div></div>)}</div>
    <section className="sec">
      <div className="max ctr"><div className="ey">Formations</div><h2 className="h2">5 parcours, <em>du balcon à l'hydroponie</em></h2><p className="lead">Chaque formation inclut le calendrier de votre région ET les engrais maison adaptés.</p></div>
      <div className="max" style={{marginTop:28}}>
        <div className="fg">{FORMATIONS.slice(0,4).map(f=><div key={f.id} className="fc"><div className="fc-top" style={{background:f.bg}}><span className="fc-em">{f.emoji}</span><div className="fc-badge" style={{color:f.acc}}>{f.badge}</div><div className="fc-title" style={{color:"#fff"}}>{f.title}</div><div className="fc-tag" style={{color:f.acc}}>{f.tag}</div></div><div className="fc-body"><p className="fc-desc">{f.desc}</p><div className="fc-tags">{f.tags.map((t,i)=><div key={i} className="ftag">{t}</div>)}</div><div className="fc-foot"><div><div className="fold">{f.old}€</div><div className="fprice">{f.price}€ <small>accès à vie</small></div></div><button className={"fc-btn"+(f.id==="hydro"?" hb":"")} onClick={()=>setSF(f.id)}>S'inscrire</button></div></div></div>)}</div>
        <div style={{textAlign:"center",marginTop:16}}><button className="btn-s" onClick={()=>go("formations")}>Voir les 5 formations →</button></div>
      </div>
    </section>
    <section className="sec" style={{background:C.white}}>
      <div className="max ctr"><div className="ey g">Zéro chimique</div><h2 className="h2">Vos épluchures valent <em>de l'or</em></h2><p className="lead">Marc de café, épluchures de banane, coquilles d'œufs — 8 recettes d'engrais maison 100% gratuits.</p></div>
      <div className="max" style={{marginTop:28}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>{ENGRAIS.slice(0,4).map(e=><div key={e.id} style={{background:e.colL,border:`1.5px solid ${e.col}30`,borderRadius:13,padding:16,textAlign:"center",cursor:"pointer"}} onClick={()=>go("engrais")}><div style={{fontSize:30,marginBottom:8}}>{e.emoji}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:700,color:e.col,marginBottom:4}}>{e.name}</div><div style={{fontSize:10.5,color:C.muted}}>{e.richesse[0]}</div><div style={{fontSize:10.5,fontWeight:600,marginTop:5,color:e.col}}>{e.temps}</div></div>)}</div>
        <div style={{textAlign:"center",marginTop:14}}><button className="btn-p" onClick={()=>go("engrais")}>Voir les 8 recettes complètes →</button></div>
      </div>
    </section>
    

    <section className="sec" style={{background:C.white}}>
      <div className="max ctr">
        <div className="ey">Processus simple</div>
        <h2 className="h2">Comment <em>ça marche ?</em></h2>
        <p className="lead">De votre inscription à votre première récolte, nous vous accompagnons à chaque étape.</p>
      </div>
      <div className="max" style={{marginTop:32}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20}}>
          {[
            {n:1,icon:"🎯",t:"Choisissez votre formation",p:"Sélectionnez la formation adaptée à votre espace et niveau. Débutant ou confirmé, on a ce qu'il vous faut."},
            {n:2,icon:"📦",t:"Commandez votre matériel",p:"Ajoutez les kits recommandés. Tout le matériel est testé et sélectionné par nos formateurs experts."},
            {n:3,icon:"📱",t:"Suivez les leçons à votre rythme",p:"Accès à vie depuis tous vos appareils. Avancez quand vous voulez, à votre rythme, sans pression."},
            {n:4,icon:"🌿",t:"Récoltez & savourez !",p:"Cueillez vos premiers légumes frais, partagez vos récoltes dans notre communauté et progressez."},
          ].map((e,i)=>(
            <div key={i} style={{textAlign:"center",padding:"24px 18px",background:C.cream,borderRadius:14,position:"relative"}}>
              <div style={{width:46,height:46,borderRadius:"50%",background:C.moss,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,margin:"0 auto 12px"}}>{e.n}</div>
              <div style={{fontSize:26,marginBottom:9}}>{e.icon}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:C.bark,marginBottom:7}}>{e.t}</div>
              <div style={{fontSize:12.5,color:C.muted,lineHeight:1.7}}>{e.p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

<section className="sec" style={{background:C.bark}}>
      <div className="max ctr"><div className="ey inv">Témoignages</div><h2 className="h2 inv">Ils cultivent, <em>ils économisent.</em></h2></div>
      <div className="max"><div className="tg">{TEMOIGNAGES.map((t,i)=><div key={i} className="tcard"><div className="t-top"><div className="t-av">{t.av}</div><div><div className="t-nm">{t.name}</div><div className="t-cy">{t.city}</div></div></div><div className="t-stars">{"★".repeat(t.stars)}</div><div className="t-f">{t.f}</div><p className="t-txt">"{t.txt}"</p><div className="t-det">→ {t.det}</div></div>)}</div></div>
    </section>
    <section className="sec">
      <div className="max ctr"><div className="ey">Tarifs</div><h2 className="h2">Investissement qui <em>se rembourse.</em></h2><p className="lead">La formation coûte 89€. Nos élèves économisent 127€/mois. Elle se rembourse en 21 jours.</p></div>
      <div className="max"><div className="pg">
        <div className="pcard"><div className="p-name">Gratuit</div><div className="p-amt">0€</div><div className="p-per">pour toujours</div><ul className="p-feats">{["Guide saisonnier complet","1 module offert","8 recettes engrais maison PDF","Flora IA (5 questions/mois)"].map((f,i)=><li key={i}><span className="pchk">✓</span>{f}</li>)}</ul><button className="bp out" onClick={()=>setShowLead(true)}>Commencer gratuitement</button></div>
        <div className="pcard feat"><div className="p-feat-badge">⭐ Le plus choisi</div><div className="p-name">Formation complète</div><div className="p-amt">89€</div><div className="p-per">accès à vie · au choix</div><ul className="p-feats">{["Leçons interactives complètes","Calendrier régionalisé inclus","Recettes engrais maison intégrées","Flora IA illimitée","Communauté active","Garantie 30 jours"].map((f,i)=><li key={i}><span className="pchk">✓</span>{f}</li>)}</ul><button className="bp feat" onClick={()=>go("formations")}>Accéder maintenant →</button></div>
        <div className="pcard"><div className="p-name">Tout PousseLab</div><div className="p-amt">299€</div><div className="p-per">5 formations · accès à vie</div><ul className="p-feats">{["5 formations (incl. hydroponie)","Flora IA prioritaire","Appels de groupe mensuels","Accès bêta contenus"].map((f,i)=><li key={i}><span className="pchk">✓</span>{f}</li>)}</ul><button className="bp mai" onClick={()=>setSF("balcon")}>Tout accéder</button></div>
      </div></div>
    </section>
    <div className="ctab"><div style={{maxWidth:500,margin:"0 auto"}}><div style={{fontSize:42,marginBottom:12}}>🌱</div><h2 className="h2 inv" style={{marginBottom:11}}>Commencez par le <em>guide gratuit.</em></h2><p className="lead inv" style={{margin:"0 auto 20px"}}>20 pages · 5 légumes · 4 engrais maison · Calendrier pour votre région.</p><button className="btn-t2" style={{fontSize:14,padding:"12px 28px"}} onClick={()=>setShowLead(true)}>Recevoir le guide gratuit →</button><p className="ctab-note">Gratuit · Sans engagement · Aucune CB requise</p></div></div>
    <Footer go={go}/>
  </>);
}

function PageGuide({go}){
  const [view,setView]=useState("calendrier");
  const [region,setRegion]=useState("idf");
  const [season,setSeason]=useState("printemps");
  const [location,setLocation]=useState("balcon");
  const [search,setSearch]=useState("");
  const [catF,setCatF]=useState("Tous");
  const [selVeg,setSelVeg]=useState(null);
  const [showHors,setShowHors]=useState(false);

  useEffect(()=>{setSelVeg(null);setShowHors(false);},[region,season,location,catF,search]);

  const cr=REGIONS.find(r=>r.id===region);
  const cats=["Tous",...new Set(VEGETABLES.map(v=>v.cat))];

  // Filtre strict : emplacement + catégorie + recherche
  const base=VEGETABLES.filter(v=>{
    if(location!=="tous" && !v.locs.includes(location)) return false;
    if(catF!=="Tous" && v.cat!==catF) return false;
    if(search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const isActive=v=>{const s=v.seasons[season];return s&&s.t!=="none";};
  const getStatus=v=>{
    const s=v.seasons[season];
    if(!s||s.t==="none") return{l:"Hors saison",cls:"vs-n",icon:"❌"};
    if(s.t==="harvest") return{l:"Récolte",cls:"vs-h",icon:"🌾"};
    if(s.t==="indoor") return{l:"Culture intérieure",cls:"vs-i",icon:"🏠"};
    return{l:"Semer / Planter",cls:"vs-s",icon:"🌱"};
  };
  const dCol=d=>d==="Très facile"?C.moss:d==="Facile"?"#5A9450":d==="Moyen"?C.terra:"#B42020";
  const dBg=d=>d==="Très facile"?"rgba(46,92,38,.1)":d==="Facile"?"rgba(90,148,80,.1)":d==="Moyen"?"rgba(184,78,30,.08)":"rgba(180,60,30,.1)";

  const enSaison=base.filter(isActive);
  const horsSaison=base.filter(v=>!isActive(v));
  const locLabel=LOCS.find(l=>l.id===location)?.label||"tous espaces";
  const saLabel=SEASONS_LIST.find(s=>s.id===season)?.label||"";

  const DetailCard=({veg})=>(
    <div className="veg-detail">
      <div className="vd-title">{veg.emoji} {veg.name} — {cr?.label}</div>
      <div className="vd-reg">📍 <strong>Conseil pour votre région :</strong> {veg.byR[region]}</div>
      <div style={{display:"flex",gap:8,marginBottom:11,flexWrap:"wrap"}}>
        {[`🪴 Pot: min ${veg.potMin}`,`🪵 Bac: min ${veg.bacMin}`,`📍 ${veg.locs.map(l=>LOCS.find(x=>x.id===l)?.label||l).join(", ")}`].map((s,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,.1)",borderRadius:8,padding:"5px 11px",fontSize:11.5,color:"rgba(255,255,255,.85)"}}>{s}</div>
        ))}
      </div>
      <div style={{fontSize:13,color:"rgba(255,255,255,.8)",lineHeight:1.7,marginBottom:10,fontStyle:"italic",borderLeft:"3px solid rgba(255,255,255,.2)",paddingLeft:10}}>{veg.seasons[season]?.a||"Pas d'action recommandée cette saison."}</div>
      <div className="vd-eng">
        <div className="vd-eng-t">💧 Engrais naturels recommandés</div>
        {veg.engrais.map((e,i)=><div key={i} className="vd-eng-item"><span style={{color:"#A8E090",fontWeight:700,marginRight:5}}>✓</span>{e}</div>)}
      </div>
      <div className="vd-tips">{veg.tips.map((tip,i)=><div key={i} className="vd-tip"><span style={{color:"#A8E090",fontWeight:700,flexShrink:0,marginRight:5}}>✓</span>{tip}</div>)}</div>
    </div>
  );

  const VegCard=({veg,dim=false})=>{
    const st=getStatus(veg);
    return(
      <div className={"vc"+(selVeg===veg.id?" active":"")} style={{opacity:dim?0.55:1}} onClick={()=>setSelVeg(selVeg===veg.id?null:veg.id)}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
          <span style={{fontSize:22}}>{veg.emoji}</span>
          <div><div className="vc-name">{veg.name}</div><div className="vc-diff" style={{background:dBg(veg.diff),color:dCol(veg.diff)}}>{veg.diff}</div></div>
        </div>
        <div className="vc-action" style={{fontSize:11.5,fontStyle:isActive(veg)?"normal":"italic",color:isActive(veg)?C.muted:"#bbb"}}>
          {isActive(veg)?veg.seasons[season]?.a:"Pas la saison"}
        </div>
        <div className={`vstatus ${st.cls}`} style={{marginTop:5}}>{st.icon} {st.l}</div>
        {isActive(veg)&&<div className="vc-metas" style={{marginTop:5}}>
          <div className="vc-meta">🪴 {veg.potMin}</div>
          <div className="vc-meta">🪵 {veg.bacMin}</div>
        </div>}
      </div>
    );
  };

  return(<div className="page"><section className="sec">
    <div className="max ctr">
      <div className="ey g">Guide saisonnier</div>
      <h2 className="h2">Quoi cultiver, <em>où et quand en France ?</em></h2>
      <p className="lead">Choisissez votre région, votre saison et votre espace — le calendrier filtre exactement les cultures adaptées à votre situation.</p>
    </div>
    <div className="max" style={{marginTop:24}}>
      {/* Onglets vue */}
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24,flexWrap:"wrap"}}>
        {[["calendrier","🗓️ Calendrier saisonnier"],["bac","🪵 Hauteur des bacs"],["pot","🪴 Taille des pots"]].map(([id,l])=>(
          <button key={id} onClick={()=>setView(id)} style={{padding:"8px 16px",borderRadius:100,border:`1.5px solid ${view===id?C.moss:C.sand}`,background:view===id?C.moss:C.white,color:view===id?"#fff":C.bark,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12.5,fontWeight:view===id?700:500,cursor:"pointer",transition:"all .2s"}}>{l}</button>
        ))}
      </div>
      {view==="bac"&&<InfographieBac/>}
      {view==="pot"&&<InfographiePot/>}
      {view==="calendrier"&&(<div className="guide-wrap">

        {/* ÉTAPE 1 — Région */}
        <div style={{padding:"8px 14px",background:C.bark,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:10.5,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".07em"}}>1 — Votre région</span>
        </div>
        <div className="r-tabs">{REGIONS.map(r=><button key={r.id} className={"r-tab"+(region===r.id?" on":"")} style={region===r.id?{background:r.color,borderColor:r.color}:{}} onClick={()=>setRegion(r.id)}>{r.emoji} {r.label}</button>)}</div>
        {cr&&<div style={{padding:"10px 14px",background:"rgba(234,224,204,.2)",borderBottom:`1px solid ${C.light}`,display:"flex",gap:14,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:180}}><div style={{fontSize:12,color:C.muted,lineHeight:1.65}}>{cr.climate}</div><div style={{fontSize:10.5,fontWeight:600,color:cr.color,marginTop:4}}>🌡️ {cr.frost}</div></div>
          <div style={{flex:1,minWidth:180}}>{cr.tips.slice(0,3).map((t,i)=><div key={i} style={{fontSize:11.5,color:C.muted,padding:"2px 0",display:"flex",gap:5}}><span style={{color:cr.color,fontWeight:700}}>→</span>{t}</div>)}</div>
        </div>}

        {/* ÉTAPE 2 — Saison */}
        <div style={{padding:"8px 14px",background:C.bark,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:10.5,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".07em"}}>2 — La saison</span>
        </div>
        <div className="s-tabs">{SEASONS_LIST.map(s=><div key={s.id} className={"s-tab"+(season===s.id?" on":"")} style={season===s.id?{color:s.color,fontWeight:700}:{}} onClick={()=>setSeason(s.id)}>{s.emoji} {s.label}<div style={{fontSize:9.5,color:"#aaa",marginTop:2}}>{s.months}</div></div>)}</div>

        {/* ÉTAPE 3 — Emplacement */}
        <div style={{padding:"8px 14px",background:C.bark,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:10.5,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".07em"}}>3 — Votre espace</span>
        </div>
        <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.light}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          {LOCS.filter(l=>l.id!=="tous").map(l=>(
            <button key={l.id} className={"l-tab"+(location===l.id?" on":"")} onClick={()=>setLocation(l.id)}>{l.emoji} {l.label}</button>
          ))}
          <button className={"l-tab"+(location==="tous"?" on":"")} onClick={()=>setLocation("tous")}>🌍 Tous</button>
        </div>

        {/* Recherche & catégorie */}
        <div style={{padding:"8px 14px",borderBottom:`1px solid ${C.light}`,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          <select value={catF} onChange={e=>setCatF(e.target.value)} style={{background:C.cream,border:`1.5px solid ${C.sand}`,borderRadius:100,padding:"5px 10px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11.5,color:C.bark,outline:"none",cursor:"pointer"}}>{cats.map(c=><option key={c}>{c}</option>)}</select>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Rechercher…" style={{flex:1,minWidth:140,background:C.cream,border:`1.5px solid ${C.sand}`,borderRadius:100,padding:"5px 12px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11.5,color:C.bark,outline:"none"}}/>
          {(catF!=="Tous"||search||location!=="balcon")&&<button onClick={()=>{setCatF("Tous");setSearch("");setLocation("balcon");}} style={{background:"rgba(184,78,30,.08)",border:"none",color:C.terra,borderRadius:100,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>✕ Réinitialiser</button>}
        </div>

        {/* Aucun résultat */}
        {base.length===0&&<div style={{padding:"40px",textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:10}}>🔍</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:C.bark,marginBottom:6}}>Aucune culture trouvée</div>
          <div style={{fontSize:13,color:C.muted}}>Essayez "Tous les espaces" ou changez de catégorie.</div>
        </div>}

        {/* ✅ EN SAISON */}
        {enSaison.length>0&&<>
          <div style={{padding:"10px 14px",background:"rgba(46,92,38,.07)",borderTop:`1px solid ${C.light}`,borderBottom:`1px solid ${C.light}`,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:18}}>✅</span>
            <div>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:C.moss}}>{enSaison.length} culture{enSaison.length>1?"s":""} à faire maintenant</span>
              <span style={{fontSize:11.5,color:"#888",marginLeft:8}}>— {saLabel} · {locLabel}</span>
            </div>
          </div>
          <div className="veg-grid">
            {enSaison.map(v=><VegCard key={v.id} veg={v}/>)}
            {selVeg&&enSaison.find(v=>v.id===selVeg)&&<DetailCard veg={VEGETABLES.find(v=>v.id===selVeg)}/>}
          </div>
        </>}

        {/* ⏳ HORS SAISON — repliée par défaut */}
        {horsSaison.length>0&&<>
          <button onClick={()=>setShowHors(h=>!h)} style={{width:"100%",padding:"11px 14px",background:C.light,border:"none",borderTop:`1px solid ${C.sand}`,cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12.5,color:C.muted,textAlign:"left"}}>
            <span>{showHors?"▾":"▸"}</span>
            <span>⏳ {horsSaison.length} culture{horsSaison.length>1?"s":""} hors saison en {saLabel}</span>
            <span style={{marginLeft:"auto",fontSize:11,color:"#bbb"}}>{showHors?"Masquer":"Afficher"}</span>
          </button>
          {showHors&&<>
            <div style={{padding:"6px 14px",fontSize:11.5,color:"#aaa",background:C.cream}}>Ces cultures ne sont pas recommandées en {saLabel}. Revenez à la bonne saison.</div>
            <div className="veg-grid">{horsSaison.map(v=><VegCard key={v.id} veg={v} dim/>)}</div>
          </>}
        </>}

        {/* Légende */}
        <div style={{padding:"9px 14px",borderTop:`1px solid ${C.light}`,display:"flex",gap:8,flexWrap:"wrap",background:"rgba(234,224,204,.15)"}}>
          {[{bg:"rgba(46,92,38,.1)",col:C.moss,t:"🌾 Récolte"},{bg:"rgba(184,78,30,.08)",col:C.terra,t:"🌱 Semer/Planter"},{bg:"rgba(42,58,106,.08)",col:"#2A3A6A",t:"🏠 Intérieur"}].map((l,i)=>(
            <div key={i} style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:100,background:l.bg,color:l.col}}>{l.t}</div>
          ))}
        </div>
      </div>)}
    </div>
  </section><Footer go={go}/></div>);
}


function PageEngrais({go}){
  const [openCard,setOpenCard]=useState(null);
  return(<div className="page"><section className="sec">
    <div className="max ctr"><div className="ey g">Zéro chimique</div><h2 className="h2">Engrais maison — <em>8 recettes de vos épluchures</em></h2><p className="lead">Marc de café, épluchures de banane, coquilles d'œufs, purin d'ortie — vos déchets de cuisine valent de l'or pour vos plantes.</p></div>
    <div className="max" style={{marginTop:24}}>
      <div style={{background:"#EAF5E8",border:"1.5px solid rgba(46,92,38,.2)",borderRadius:14,padding:"16px 20px",marginBottom:24,display:"flex",gap:18,flexWrap:"wrap"}}>
        <div style={{fontSize:30}}>♻️</div>
        <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:700,color:C.bark,marginBottom:6}}>Pourquoi faire ses engrais soi-même ?</div><div style={{fontSize:13,color:C.muted,lineHeight:1.75,maxWidth:680}}>Les engrais chimiques détruisent la vie microbienne du sol. Les engrais naturels maison enrichissent le sol et coûtent <strong>zéro euro</strong>. Vos légumes seront plus savoureux, sans résidus chimiques.</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>{[{n:"8",l:"Recettes complètes"},{n:"0€",l:"Coût total"},{n:"100%",l:"Naturel & bio"},{n:"90%",l:"Déchets valorisés"}].map((s,i)=><div key={i} style={{background:C.bark,borderRadius:13,padding:"14px 12px",textAlign:"center"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:"#A8E090",lineHeight:1}}>{s.n}</div><div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:4}}>{s.l}</div></div>)}</div>
      <div className="eng-grid">
        {ENGRAIS.map(e=>(
          <div key={e.id} className={"eng-card"+(openCard===e.id?" open":"")}>
            <div className="eng-top" onClick={()=>setOpenCard(openCard===e.id?null:e.id)}>
              <div className="eng-em">{e.emoji}</div>
              <div className="eng-info"><div className="eng-name">{e.name}</div><div style={{fontSize:10,color:e.col,fontWeight:700,marginTop:2}}>{e.cat}</div><div className="eng-badges"><div className="eng-badge">⏱ {e.temps}</div><div className="eng-badge">💰 {e.cout}</div><div className="eng-badge">📊 {e.diff}</div></div></div>
              <div className={"eng-tog"+(openCard===e.id?" open":"")}>▾</div>
            </div>
            {openCard===e.id&&(
              <div className="eng-body">
                <div className="eng-richesse">{e.richesse.map((r,i)=><div key={i} className="eng-rich" style={{background:e.colL,color:e.col}}>{r}</div>)}</div>
                <div className="eng-effet" style={{borderColor:e.col}}>💡 {e.effet}</div>
                <div className="eng-st">Ingrédients</div>
                <div className="eng-ings">{e.ingredients.map((ing,i)=><div key={i} className="eng-ing"><div className="eng-blt" style={{background:e.col,marginTop:7}}/>{ing}</div>)}</div>
                <div className="eng-st">Préparation étape par étape</div>
                <div className="eng-etapes">{e.etapes.map((et,i)=><div key={i} className="eng-etape"><div className="eng-num" style={{background:e.col}}>{i+1}</div>{et}</div>)}</div>
                <div className="eng-st">Dilutions & utilisation</div>
                <div className="eng-dils">{e.dilutions.map((d,i)=><div key={i} className="eng-dil"><div className="eng-dil-mode">{d.mode}</div><div className="eng-dil-ratio">{d.ratio}</div></div>)}</div>
                <div className="eng-st">Cultures cibles</div>
                <div className="eng-cibles">{e.cibles.map((c,i)=><div key={i} className="eng-cible">{c}</div>)}</div>
                <div className="eng-st">Fréquence</div>
                <div style={{fontSize:12.5,color:C.moss,fontWeight:600,padding:"6px 10px",background:"rgba(46,92,38,.07)",borderRadius:8}}>📅 {e.freq}</div>
                {e.eviter?.length>0&&(<><div className="eng-st">À éviter sur</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{e.eviter.map((ev,i)=><div key={i} style={{fontSize:10.5,fontWeight:600,padding:"2px 8px",borderRadius:100,background:"rgba(184,78,30,.08)",color:C.terra}}>{ev}</div>)}</div></>)}
                <div className="eng-warn">⚠️ {e.warning}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{background:C.bark,borderRadius:16,padding:24,textAlign:"center",marginTop:10}}>
        <div style={{fontSize:38,marginBottom:10}}>🔬</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#fff",marginBottom:9}}>Le mélange ultime : Ortie + Consoude</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.75,maxWidth:500,margin:"0 auto 16px"}}>Mélangez 50% purin d'ortie + 50% purin de consoude = NPK complet 100% naturel. Aucun engrais du commerce ne fait mieux.</div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>{[["#A8E090","N = Azote (ortie) → Croissance"],["#B0E8FF","K = Potassium (consoude) → Fruits"],["#FFC832","P = Phosphore → Racines"]].map(([col,txt],i)=><div key={i} style={{background:`${col}15`,border:`1px solid ${col}30`,padding:"8px 16px",borderRadius:100,fontSize:12.5,color:col,fontWeight:700}}>{txt}</div>)}</div>
      </div>
    </div>
  </section><Footer go={go}/></div>);
}

function QuizBlock({formationId,isPurchased,onBuy}){
  const qs=QUIZZES[formationId]||[];
  const [answers,setAnswers]=useState({});
  const [scored,setScored]=useState(false);

  // VERROUILLÉ si non acheté
  if(!isPurchased) return(
    <div style={{background:"#1E1208",borderRadius:13,padding:22,marginTop:16,textAlign:"center",border:`1.5px solid ${C.sand}`}}>
      <div style={{fontSize:36,marginBottom:10}}>🔒</div>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#fff",marginBottom:8}}>Quiz de validation — accès réservé</div>
      <div style={{fontSize:13,color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:16}}>Le quiz final (5 questions) valide vos acquis et débloque votre badge de complétion. Il est accessible uniquement après l'achat de la formation.</div>
      <button onClick={onBuy} style={{background:C.gold,color:"#fff",border:"none",borderRadius:100,padding:"11px 24px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>Acheter la formation pour accéder →</button>
    </div>
  );

  const pick=(qi,oi)=>{if(answers[qi]!==undefined)return;setAnswers(p=>({...p,[qi]:oi}));};
  const score=Object.entries(answers).filter(([qi,oi])=>qs[Number(qi)]?.a===oi).length;
  const pct=qs.length>0?Math.round((score/qs.length)*100):0;
  const msg=pct>=80?"🏆 Excellent ! Formation bien assimilée. Badge débloqué !":pct>=60?"✅ Très bon travail — quelques points à revoir.":"📚 Bon début — repassez les modules clés.";

  return(
    <div style={{background:C.cream,border:`1.5px solid ${C.moss}`,borderRadius:13,padding:20,marginTop:16}}>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:C.bark,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
        <span>🎯</span>Quiz de validation — {qs.length} questions
        {scored&&<span style={{marginLeft:"auto",fontSize:12,fontWeight:400,color:pct>=80?C.moss:pct>=60?C.gold:C.terra}}>{score}/{qs.length} — {pct}%</span>}
      </div>
      {qs.map((q,qi)=>{
        const chosen=answers[qi];const locked=chosen!==undefined;
        return(
          <div key={qi} style={{marginBottom:12,background:C.white,borderRadius:10,padding:12,border:`1.5px solid ${C.light}`}}>
            <div style={{fontSize:13,fontWeight:700,color:C.bark,marginBottom:8}}><span style={{color:"#aaa",marginRight:5}}>{qi+1}.</span>{q.q}</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {q.opts.map((opt,oi)=>{
                let bg=C.white,border=`1.5px solid ${C.sand}`,col=C.bark,pre="";
                if(locked){
                  if(oi===q.a){bg="rgba(46,92,38,.1)";border=`1.5px solid ${C.moss}`;col=C.moss;pre="✓ ";}
                  else if(oi===chosen){bg="rgba(184,78,30,.08)";border=`1.5px solid ${C.terra}`;col=C.terra;pre="✕ ";}
                  else{col="#bbb";border=`1.5px solid ${C.light}`;}
                }
                return(<button key={oi} onClick={()=>pick(qi,oi)} disabled={locked}
                  style={{background:bg,border,color:col,borderRadius:7,padding:"7px 11px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12.5,cursor:locked?"default":"pointer",textAlign:"left",transition:"all .12s"}}>
                  {pre}{opt}
                </button>);
              })}
            </div>
          </div>
        );
      })}
      {!scored?(
        <button onClick={()=>setScored(true)} disabled={Object.keys(answers).length<qs.length}
          style={{background:Object.keys(answers).length<qs.length?C.light:C.moss,color:Object.keys(answers).length<qs.length?C.muted:"#fff",border:"none",borderRadius:100,padding:"10px 22px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,fontWeight:700,cursor:Object.keys(answers).length<qs.length?"not-allowed":"pointer",marginTop:4}}>
          {Object.keys(answers).length<qs.length?`Répondre aux ${qs.length-Object.keys(answers).length} questions restantes`:"Voir mon score →"}
        </button>
      ):(
        <div style={{background:pct>=80?"rgba(46,92,38,.1)":"rgba(212,133,10,.1)",border:`1.5px solid ${pct>=80?C.moss:C.gold}`,borderRadius:10,padding:14,marginTop:8}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:pct>=80?C.moss:C.gold,marginBottom:6}}>{score}/{qs.length} — {pct}%</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:10}}>{msg}</div>
          <button onClick={()=>{setAnswers({});setScored(false);}} style={{background:"none",border:`1.5px solid ${C.sand}`,borderRadius:100,padding:"6px 14px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,cursor:"pointer",color:C.muted}}>Recommencer</button>
        </div>
      )}
    </div>
  );
}



function PageFormations({go,setSF,purchased=new Set()}){
  const [selF,setSelF]=useState(null);   // formation ouverte
  const [selM,setSelM]=useState(null);   // module ouvert (index)

  const toggleF=id=>{setSelF(selF===id?null:id);setSelM(null);};
  const toggleM=i=>{setSelM(selM===i?null:i);};

  return(<div className="page"><section className="sec" style={{background:C.light}}>
    <div className="max ctr">
      <div className="ey">5 formations complètes</div>
      <h2 className="h2">Du balcon <em>à l'hydroponie</em></h2>
      <p className="lead">Chaque formation inclut leçons détaillées, exercices pratiques, engrais maison adaptés et quiz final noté.</p>
    </div>
    <div className="max">
      <div className="fg" style={{marginTop:28}}>
        {FORMATIONS.map(f=>{
          const isOpen=selF===f.id;
          return(
          <div key={f.id} style={{borderRadius:18,overflow:"hidden",background:C.white,border:`1.5px solid ${isOpen?C.moss:C.sand}`,transition:"all .3s",boxShadow:isOpen?"0 14px 40px rgba(30,18,8,.09)":"none"}}>

            {/* Header formation */}
            <div className="fc-top" style={{background:f.bg}}>
              <span className="fc-em">{f.emoji}</span>
              <div className="fc-badge" style={{color:f.acc}}>{f.badge}</div>
              <div className="fc-title" style={{color:"#fff"}}>{f.title}</div>
              <div className="fc-tag" style={{color:f.acc}}>{f.tag}</div>
            </div>

            <div style={{padding:"14px 20px"}}>
              <p className="fc-desc">{f.desc}</p>
              <div className="fc-tags" style={{marginBottom:10}}>{f.tags.map((t,i)=><div key={i} className="ftag">{t}</div>)}</div>

              {/* Stats */}
              <div style={{display:"flex",gap:12,marginBottom:11,flexWrap:"wrap"}}>
                {[{i:"⏱️",v:f.duree||"6 sem."},{i:"📚",v:`${f.modules} modules`},{i:"📹",v:`${f.videos||f.lessons} vidéos`},{i:"⭐",v:`${f.rating}/5`}].map((s,i)=>(
                  <div key={i} style={{fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:3,fontWeight:600}}><span>{s.i}</span>{s.v}</div>
                ))}
              </div>

              {/* Public & résultats */}
              <div style={{display:"flex",gap:8,marginBottom:11,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:160,background:"rgba(46,92,38,.06)",border:"1px solid rgba(46,92,38,.15)",borderRadius:9,padding:"8px 11px"}}>
                  <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:C.moss,marginBottom:4}}>Pour qui</div>
                  <div style={{fontSize:11.5,color:C.muted,lineHeight:1.6}}>{f.public}</div>
                </div>
                <div style={{flex:1,minWidth:160,background:"rgba(184,78,30,.05)",border:"1px solid rgba(184,78,30,.15)",borderRadius:9,padding:"8px 11px"}}>
                  <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:C.terra,marginBottom:4}}>Résultats concrets</div>
                  <div style={{fontSize:11.5,color:C.muted,lineHeight:1.6}}>{f.resultats}</div>
                </div>
              </div>

              {/* Ce qui est inclus */}
              <div style={{marginBottom:12}}>
                {["Leçons interactives avec exercices pratiques","Calendrier saisonnier adapté à votre région","Engrais maison intégrés dans chaque module","Flora IA illimitée · Accès à vie · Garantie 30 jours"].map((inc,i)=>(
                  <div key={i} style={{fontSize:11.5,color:C.muted,display:"flex",gap:5,padding:"2px 0"}}>
                    <span style={{color:f.id==="hydro"?"#0E6B8C":C.moss,fontWeight:700,flexShrink:0}}>✓</span>{inc}
                  </div>
                ))}
              </div>

              {/* Bouton voir programme */}
              <button onClick={()=>toggleF(f.id)} style={{background:"none",border:`1.5px solid ${isOpen?C.moss:C.sand}`,color:isOpen?C.moss:C.muted,borderRadius:100,padding:"6px 14px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:isOpen?14:8,transition:"all .2s"}}>
                {isOpen?"▲ Masquer le programme complet":"▼ Voir le programme complet"}
              </button>

              {/* Programme détaillé - accordéon modules */}
              {isOpen&&f.mods&&(
                <div style={{borderTop:`1.5px solid ${C.light}`,paddingTop:14,marginBottom:10}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:C.bark,marginBottom:12}}>Programme — {f.modules} modules · {f.lessons} leçons</div>
                  {f.mods.map((mod,mi)=>(
                    <div key={mi} style={{marginBottom:8,border:`1.5px solid ${selM===mi?C.moss:C.light}`,borderRadius:11,overflow:"hidden",transition:"all .2s"}}>

                      {/* Header module */}
                      <div onClick={()=>toggleM(mi)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",cursor:"pointer",background:selM===mi?"rgba(46,92,38,.05)":C.white}}>
                        <div style={{display:"flex",alignItems:"center",gap:9}}>
                          <div style={{width:22,height:22,borderRadius:"50%",background:selM===mi?C.moss:C.light,color:selM===mi?"#fff":C.muted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{mi+1}</div>
                          <div style={{fontSize:13,fontWeight:700,color:selM===mi?C.moss:C.bark}}>{mod.title}</div>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <div style={{fontSize:9.5,color:"#aaa",fontWeight:600}}>{mod.lecons.length} leçons</div>
                          <span style={{color:C.sand,fontSize:12,transition:"transform .2s",display:"block",transform:selM===mi?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
                        </div>
                      </div>

                      {/* Leçons du module */}
                      {selM===mi&&(
                        <div style={{borderTop:`1px solid ${C.light}`,padding:"10px 14px",background:"#FAFAF7"}}>
                          <div style={{marginBottom:10}}>
                            {mod.lecons.map((l,li)=>(
                              <div key={li} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"5px 0",borderBottom:li<mod.lecons.length-1?`1px solid ${C.light}`:"none"}}>
                                <div style={{width:18,height:18,borderRadius:"50%",background:"rgba(46,92,38,.08)",color:C.moss,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,flexShrink:0,marginTop:1}}>{li+1}</div>
                                <div style={{fontSize:12.5,color:C.bark,lineHeight:1.6,flex:1}}>
                                  <span style={{fontSize:9.5,fontWeight:700,color:C.moss,marginRight:5}}>Leçon {li+1}</span>{l}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{background:"rgba(212,133,10,.08)",border:"1.5px solid rgba(212,133,10,.2)",borderRadius:9,padding:"8px 12px",display:"flex",gap:8,alignItems:"flex-start"}}>
                            <span style={{fontSize:14,flexShrink:0}}>✏️</span>
                            <div>
                              <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:C.gold,marginBottom:3}}>Exercice pratique</div>
                              <div style={{fontSize:12.5,color:C.muted,lineHeight:1.6}}>{mod.ex}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Prix + bouton */}
              <div className="fc-foot">
                <div><div className="fold">{f.old}€</div><div className="fprice">{f.price}€ <small>accès à vie</small></div></div>
                <button className={"fc-btn"+(f.id==="hydro"?" hb":"")} onClick={()=>setSF(f.id)}>S'inscrire maintenant</button>
              </div>

              {/* Quiz */}
              <QuizBlock formationId={f.id}/>
            </div>
          </div>);
        })}
      </div>

      {/* Banner Hydro */}
      <div className="hb" style={{marginTop:18}}>
        <div>
          <div className="hb-eye">Formation exclusive PousseLab</div>
          <h3 className="hb-title">Hydroponie Maison<br/><em>Zéro terre. Zéro limite.</em></h3>
          <p className="hb-sub">Culture sans terre — 90% moins d'eau, 3x plus rapide, 12 mois par an.</p>
          <div className="hb-stats">{[{n:"90%",l:"Moins d'eau"},{n:"3x",l:"Plus rapide"},{n:"12",l:"Mois/an"},{n:"0",l:"Terre"}].map((s,i)=><div key={i} className="hs"><div className="hs-n">{s.n}</div><div className="hs-l">{s.l}</div></div>)}</div>
          <button className="btn-h" onClick={()=>setSF("hydro")}>Découvrir l'hydroponie →</button>
        </div>
        <div className="hb-right">
          <div className="hb-right-t">Ce que vous maîtriserez</div>
          {["Système NFT en gouttières pour laitues et herbes — dès 30€","Kratky passif : zéro pompe, zéro électricité","DWC (Deep Water Culture) pour tomates et poivrons","Solutions nutritives : composition, dosage, pH, EC","Éclairage LED full-spectrum pour culture hivernale","Carences, algues, pH instable — diagnostic et solutions"].map((item,i)=><div key={i} className="hb-item"><span style={{color:"#B0E8FF",fontWeight:800,flexShrink:0}}>✓</span>{item}</div>)}
        </div>
      </div>
    </div>
  </section><Footer go={go}/></div>);
}


function PageBlog({go}){
  const [article,setArticle]=useState(null);
  if(article)return(<div className="page"><div className="sw">
    <button className="btn-s sm2" style={{marginBottom:18}} onClick={()=>setArticle(null)}>← Retour au blog</button>
    <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:11}}><div className="blog-cat">{article.cat}</div><span style={{fontSize:10.5,color:"#888"}}>{article.date} · ⏱ {article.readTime}</span></div>
    <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(24px,4vw,38px)",fontWeight:700,color:C.bark,lineHeight:1.1,marginBottom:14}}>{article.title}</h1>
    <div style={{borderRadius:14,overflow:"hidden",marginBottom:22}}><img src={article.img} alt={article.title} style={{width:"100%",height:240,objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none"}}/></div>
    <div style={{fontSize:14,color:"#3A2010",lineHeight:1.9,whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{__html:article.content.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br/>")}}/>
    <div style={{marginTop:24,padding:"16px",background:C.light,borderRadius:12,textAlign:"center"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,marginBottom:6}}>Cet article vous a aidé ?</div><div style={{fontSize:12,color:C.muted,marginBottom:11}}>Retrouvez plus de conseils dans nos formations.</div><button className="btn-p" onClick={()=>go("formations")}>Voir les formations →</button></div>
    <Footer go={go}/>
  </div></div>);
  return(<div className="page"><section className="sec">
    <div className="max ctr"><div className="ey">Blog</div><h2 className="h2">Conseils & <em>astuces jardinage</em></h2><p className="lead">Articles rédigés avec Flora. Engrais naturels, semis, régions, économies.</p></div>
    <div className="max"><div className="blog-grid" style={{marginTop:28}}>{BLOG.map(post=><div key={post.id} className="blog-card" onClick={()=>setArticle(post)}><div className="blog-img"><img src={post.img} alt={post.title} onError={e=>{e.target.style.display="none"}}/></div><div className="blog-body"><div className="blog-cat">{post.cat}</div><div className="blog-title">{post.title}</div><div className="blog-excerpt">{post.excerpt}</div><div className="blog-meta">📅 {post.date} · ⏱ {post.readTime}</div></div></div>)}</div></div>
  </section><Footer go={go}/></div>);
}

function PageMateriel({go}){
  return(<div className="page">
    <section className="sec">
      <div className="max ctr">
        <div className="ey">Matériel recommandé</div>
        <h2 className="h2">Le meilleur matériel au <em>meilleur prix</em></h2>
        <p className="lead">Nous sélectionnons les produits les plus adaptés. Vous les commandez directement chez Amazon et Cdiscount — sans intermédiaire, sans surcoût.</p>
      </div>

      {/* Bandeau info */}
      <div className="max" style={{marginTop:20}}>
        <div style={{background:"rgba(46,92,38,.07)",border:"1.5px solid rgba(46,92,38,.2)",borderRadius:13,padding:"14px 18px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap",marginBottom:28}}>
          <div style={{fontSize:28}}>🛒</div>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:C.bark,marginBottom:4}}>Comment ça marche ?</div>
            <div style={{fontSize:13,color:C.muted}}>Cliquez sur un produit → vous arrivez sur Amazon avec la bonne recherche → choisissez selon les avis et votre budget. Nos recommandations vous évitent de chercher des heures.</div>
          </div>
        </div>

        {MATERIEL_CATS.map((cat,ci)=>(
          <div key={ci} style={{marginBottom:32}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:C.bark,marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
              <span>{cat.icon}</span>{cat.title}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12}}>
              {cat.items.map((item,ii)=>(
                <div key={ii} style={{background:C.white,border:`1.5px solid ${C.light}`,borderRadius:13,padding:15,display:"flex",flexDirection:"column",gap:7,transition:"border-color .2s",cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.moss}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.light}
                  onClick={()=>window.open(item.lien,"_blank")}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                    <div style={{fontSize:13.5,fontWeight:700,color:C.bark,flex:1}}>{item.t}</div>
                    <div style={{fontSize:11,fontWeight:700,color:C.moss,background:"rgba(46,92,38,.08)",padding:"3px 8px",borderRadius:100,flexShrink:0,whiteSpace:"nowrap"}}>{item.prix}</div>
                  </div>
                  <div style={{fontSize:12.5,color:C.muted,lineHeight:1.65,flex:1}}>{item.d}</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:4}}>
                    <div style={{fontSize:11,color:"#aaa",display:"flex",alignItems:"center",gap:4}}>
                      <span style={{fontSize:14}}>🛒</span> Voir sur {item.site}
                    </div>
                    <div style={{fontSize:11,fontWeight:600,color:C.moss}}>Meilleur prix →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Section engrais maison */}
        <div style={{background:C.bark,borderRadius:16,padding:24,marginTop:8}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#fff",marginBottom:8}}>♻️ Et les engrais maison — 0€</div>
          <div style={{fontSize:13.5,color:"rgba(255,255,255,.7)",lineHeight:1.75,marginBottom:14}}>Marc de café, épluchures de banane, eau de cuisson, coquilles d'œufs — vos déchets quotidiens remplacent 100% des engrais du commerce. Gratuit, efficace, zéro plastique.</div>
          <button className="btn-p" onClick={()=>go("engrais")}>Voir les 8 recettes d'engrais maison →</button>
        </div>
      </div>
    </section>
    <Footer go={go}/>
  </div>);
}


function PageFAQ({go}){
  const [cat,setCat]=useState(FAQ[0].cat);const [openQ,setOpenQ]=useState(null);
  const current=FAQ.find(c=>c.cat===cat);
  return(<div className="page"><section className="sec">
    <div className="max ctr"><div className="ey">FAQ</div><h2 className="h2">Questions <em>fréquentes</em></h2><p className="lead">Tout ce que vous voulez savoir avant de commencer. Pour toute autre question, Flora IA vous répond instantanément 🌿</p></div>
    <div className="max" style={{marginTop:28}}>
      <div className="faq-cats">{FAQ.map(c=><button key={c.cat} className={"faq-cat-btn"+(cat===c.cat?" on":"")} onClick={()=>{setCat(c.cat);setOpenQ(null);}}>{c.cat}</button>)}</div>
      <div className="faq-list">{current.qs.map((item,i)=>(
        <div key={i} className={"faq-item"+(openQ===i?" open":"")}>
          <div className="faq-q" onClick={()=>setOpenQ(openQ===i?null:i)}>{item.q}<span className={"faq-tog"+(openQ===i?" open":"")}>+</span></div>
          {openQ===i&&<div className="faq-a">{item.a}</div>}
        </div>
      ))}</div>
      <div style={{marginTop:24,background:C.light,borderRadius:13,padding:20,textAlign:"center"}}><div style={{fontSize:28,marginBottom:8}}>💬</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,marginBottom:6}}>Autre question ?</div><div style={{fontSize:12.5,color:C.muted}}>Flora, notre IA jardinière, répond en temps réel. Cliquez sur le bouton 🌿 en bas à droite.</div></div>
    </div>
  </section><Footer go={go}/></div>);
}

function PageDashboard({go,setSF,purchased=new Set()}){
  const [tab,setTab]=useState("formations");
  const [selLecon,setSelLecon]=useState(null); // {fId, modIdx, lecIdx}

  const achetees=FORMATIONS.filter(f=>purchased.has(f.id));
  const nonAchetees=FORMATIONS.filter(f=>!purchased.has(f.id));

  // Leçon exemple (contenu fictif riche)
  const LECON_PREVIEW={
    balcon:{0:{0:"**Comment lire l'exposition de votre balcon**\n\nL'exposition est la première chose à analyser. Un balcon plein sud reçoit le soleil toute la journée — idéal pour les tomates, poivrons et courgettes. Un balcon est, lui, ensoleillé le matin — parfait pour les salades et herbes. Un balcon nord reste dans l'ombre : micropousses et radis seront vos alliés.\n\n**Exercice pratique :** À 13h un jour de soleil, observez l'ombre portée de votre rambarde. Si elle dépasse 50 cm sur votre bac, vous êtes en mi-ombre. Planifiez vos cultures en conséquence."}},
    terrasse:{0:{0:"**Planifier une terrasse productive**\n\nAvant de planter quoi que ce soit, dessinez votre terrasse sur papier avec les mesures réelles. Identifiez la zone la plus ensoleillée (sud et ouest), la zone la plus ventée (danger pour les plants fragiles), et les zones de passage.\n\n**Les erreurs à éviter :** Ne pas sous-estimer le poids des bacs. Un bac de 40L rempli de substrat pèse 55 à 65 kg. Vérifiez la résistance de votre dalle avant de charger."}},
    famille:{0:{0:"**Pourquoi les enfants ont besoin de résultats rapides**\n\nLa neurologie de l'enfant fonctionne dans un temps très court. Un enfant de 6 ans ne peut pas attendre 3 mois pour voir sa tomate. Commencez par les radis (25 jours) et les micropousses (10 jours) — les résultats arrivent avant que l'enthousiasme ne retombe.\n\n**L'astuce PousseLab :** Faites dessiner à l'enfant ce qu'il imagine que la graine va donner. Le décalage entre le dessin et la réalité est source d'émerveillement."}},
    interieur:{0:{0:"**Comprendre l'intensité lumineuse**\n\nLes plantes ont besoin d'une quantité minimale de lumière mesurée en lux ou en PPFD (photons par m² par seconde). Une fenêtre bien exposée produit 5 000 à 15 000 lux. Une LED horticole correcte produit 20 000 à 60 000 lux. Sans suffisamment de lumière, les plantes s'étirent vers la source (étiolement) et deviennent faibles.\n\n**Test simple :** Posez votre main au-dessus du bac. Si votre ombre est nette et contrastée, la lumière est suffisante. Si elle est floue, ajoutez de l'éclairage."}},
    hydro:{0:{0:"**Les 3 systèmes hydroponiques — lequel choisir ?**\n\n**Kratky (passif) :** Un bocal, de l'eau nutritive, une graine. Pas de pompe, pas d'électricité. Idéal pour débuter. Parfait pour laitues et herbes.\n\n**NFT (actif) :** Film d'eau nutritive en circulation dans des gouttières. Plus technique mais très productif. Pour laitues, épinards, basilic.\n\n**DWC (Deep Water Culture) :** Les racines baignent dans une solution oxygénée. Excellent pour les grosses plantes : tomates, poivrons, concombres.\n\n**Recommandation :** Commencez TOUJOURS par Kratky, maîtrisez-le, puis passez au NFT si vous voulez aller plus loin."}},
  };

  const getLeconContent=(fId,mIdx,lIdx)=>{
    return LECON_PREVIEW[fId]?.[mIdx]?.[lIdx]||null;
  };

  return(<div className="dash">
    <div className="dash-side">
      <div className="dash-logo">Pousse<em>Lab</em></div>
      <div className="dash-nav">
        {[["formations","📚","Mes formations"],["progression","📈","Progression"],["badges","🏅","Badges"],["ressources","📄","Ressources"]].map(([id,ic,l])=>(
          <div key={id} className={"dash-link"+(tab===id?" on":"")} onClick={()=>setTab(id)}><span>{ic}</span>{l}</div>
        ))}
      </div>
      <div style={{padding:"16px 20px",borderTop:"1px solid rgba(255,255,255,.08)",marginTop:"auto"}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:8}}>Formations achetées</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#A8E090"}}>{achetees.length}<span style={{fontSize:14,color:"rgba(255,255,255,.3)"}}> / 5</span></div>
      </div>
    </div>

    <div className="dash-main">
      {/* ─── FORMATIONS ─── */}
      {tab==="formations"&&(<div>
        <div className="dash-title">Mes formations</div>
        <div className="dash-sub">Cliquez sur une leçon pour en voir le contenu complet.</div>

        {achetees.length===0&&(
          <div style={{background:C.white,border:`1.5px solid ${C.light}`,borderRadius:14,padding:28,textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:40,marginBottom:12}}>📚</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:C.bark,marginBottom:8}}>Aucune formation achetée</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Accédez à vos leçons, exercices et quiz après l'achat d'une formation.</div>
            <button className="btn-p" onClick={()=>go("formations")}>Voir les formations →</button>
          </div>
        )}

        {achetees.map(f=>(
          <div key={f.id} style={{background:C.white,border:`1.5px solid ${C.light}`,borderRadius:14,marginBottom:16,overflow:"hidden"}}>
            <div style={{background:f.bg,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:28}}>{f.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#fff"}}>{f.title}</div>
                <div style={{fontSize:11.5,color:f.acc}}>{f.modules} modules · {f.lessons} leçons · {f.duree}</div>
              </div>
              <div style={{background:"rgba(255,255,255,.15)",padding:"4px 10px",borderRadius:100,fontSize:11,color:"#fff",fontWeight:700}}>✓ Acheté</div>
            </div>

            <div style={{padding:"14px 18px"}}>
              {f.mods?.map((mod,mi)=>(
                <div key={mi} style={{marginBottom:10,border:`1px solid ${C.light}`,borderRadius:10,overflow:"hidden"}}>
                  <div style={{padding:"9px 13px",background:C.cream,fontWeight:700,fontSize:13,color:C.bark,display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:C.moss,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{mi+1}</div>
                    {mod.title}
                  </div>
                  <div style={{padding:"4px 0"}}>
                    {mod.lecons.map((l,li)=>{
                      const hasContent=!!getLeconContent(f.id,mi,li);
                      const isSelected=selLecon&&selLecon.fId===f.id&&selLecon.mIdx===mi&&selLecon.lIdx===li;
                      return(<div key={li}>
                        <div onClick={()=>setSelLecon(isSelected?null:{fId:f.id,mIdx:mi,lIdx:li})}
                          style={{display:"flex",alignItems:"center",gap:10,padding:"8px 13px",cursor:"pointer",borderBottom:`1px solid ${C.light}`,background:isSelected?"rgba(46,92,38,.05)":"transparent",transition:"background .15s"}}>
                          <div style={{width:18,height:18,borderRadius:"50%",background:isSelected?"#A8E090":C.light,color:isSelected?C.bark:"#aaa",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,flexShrink:0}}>{li+1}</div>
                          <div style={{flex:1,fontSize:12.5,color:C.bark}}>Leçon {li+1} — {l}</div>
                          {hasContent&&<div style={{fontSize:10,color:C.moss,fontWeight:700}}>▶ Voir</div>}
                        </div>
                        {isSelected&&(
                          <div style={{padding:"14px 16px",background:"rgba(46,92,38,.03)",borderBottom:`1px solid ${C.light}`}}>
                            {hasContent?(
                              <div style={{fontSize:13,color:C.bark,lineHeight:1.8,whiteSpace:"pre-line"}}
                                dangerouslySetInnerHTML={{__html:(getLeconContent(f.id,mi,li)||"").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}}/>
                            ):(
                              <div style={{fontSize:13,color:C.muted,fontStyle:"italic",padding:"8px 0"}}>
                                Contenu vidéo disponible après connexion à la plateforme. Le texte complet de cette leçon sera bientôt ajouté ici.
                              </div>
                            )}
                            {mi===f.mods.length-1&&li===mod.lecons.length-1&&(
                              <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.light}`}}>
                                <QuizBlock formationId={f.id} isPurchased={true} onBuy={()=>setSF(f.id)}/>
                              </div>
                            )}
                          </div>
                        )}
                      </div>);
                    })}
                    <div style={{padding:"8px 13px",background:"rgba(212,133,10,.05)"}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>✏️ Exercice pratique</div>
                      <div style={{fontSize:12.5,color:C.muted}}>{mod.ex}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {nonAchetees.length>0&&achetees.length>0&&<div style={{marginTop:8,fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:C.bark,marginBottom:12}}>Autres formations disponibles</div>}
        {nonAchetees.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
          {nonAchetees.map(f=>(
            <div key={f.id} style={{background:C.white,border:`1.5px solid ${C.light}`,borderRadius:12,overflow:"hidden",opacity:0.8}}>
              <div style={{background:f.bg,padding:"12px 16px"}}>
                <div style={{fontSize:22}}>{f.emoji}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"#fff"}}>{f.title}</div>
              </div>
              <div style={{padding:"12px 16px"}}>
                <div style={{fontSize:12,color:C.muted,marginBottom:10}}>{f.desc}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:C.terra}}>{f.price}€</div>
                  <button className="fc-btn" onClick={()=>setSF(f.id)}>Acheter</button>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>)}

      {/* ─── PROGRESSION ─── */}
      {tab==="progression"&&(<div>
        <div className="dash-title">Progression</div>
        <div className="dash-sub">Votre avancement dans chaque formation achetée.</div>
        {achetees.length===0?<div style={{color:C.muted,fontSize:13,padding:"20px 0"}}>Achetez une formation pour suivre votre progression.</div>:
          achetees.map(f=><div key={f.id} className="dp" style={{marginBottom:12}}>
            <div className="dp-top"><div className="dp-title"><span>{f.emoji}</span>{f.title}</div><div className="dp-pct">0%</div></div>
            <div className="dp-bar"><div className="dp-fill" style={{width:"0%"}}/></div>
            <div style={{fontSize:11,color:"#888",marginTop:7}}>0 / {f.modules} modules complétés — cliquez sur les leçons pour avancer</div>
          </div>)
        }
      </div>)}

      {/* ─── BADGES ─── */}
      {tab==="badges"&&(<div>
        <div className="dash-title">Badges & certifications</div>
        <div className="dash-sub">Complétez le quiz de chaque formation pour débloquer votre badge.</div>
        <div className="badge-grid">
          {FORMATIONS.map(f=><div key={f.id} className={"badge"+(purchased.has(f.id)?" earned":"")}>
            <div className="badge-em">{f.emoji}</div>
            <div className="badge-n">{f.title.split(" ").slice(0,2).join(" ")}</div>
            <div className="badge-desc">{purchased.has(f.id)?"✓ Débloqué":"🔒 À acheter"}</div>
          </div>)}
        </div>
      </div>)}

      {/* ─── RESSOURCES ─── */}
      {tab==="ressources"&&(<div>
        <div className="dash-title">Ressources & outils</div>
        <div className="dash-sub">PDF, guides et outils inclus avec vos formations.</div>
        {[{t:"📅 Calendrier semis par région",d:"8 pages A3 — toutes les cultures, 6 régions",free:true},{t:"♻️ 8 recettes d'engrais maison",d:"12 pages — purins, épluchures, marc de café",free:true},{t:"📊 Guide des associations de plantes",d:"6 pages — inclus avec formation Terrasse",free:false},{t:"📓 Carnet de récoltes 2026",d:"20 pages — inclus avec formation Famille",free:false}].map((r,i)=>(
          <div key={i} style={{background:C.white,border:`1.5px solid ${r.free?C.light:"rgba(212,133,10,.3)"}`,borderRadius:11,padding:"13px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:22}}>{r.t.split(" ")[0]}</div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.bark}}>{r.t.slice(3)}</div><div style={{fontSize:12,color:C.muted}}>{r.d}</div></div>
            <button style={{background:r.free?C.moss:"rgba(212,133,10,.15)",color:r.free?"#fff":C.gold,border:"none",borderRadius:100,padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{r.free?"⬇ Télécharger":"🔒 Formation requise"}</button>
          </div>
        ))}
      </div>)}
    </div>
  </div>);
}


function PageMission({go}){
  return(<div className="page"><section className="sec"><div className="sw">
    <div className="ey g" style={{marginBottom:13}}>Notre mission</div>
    <h1 className="sh">Remettre la <em>vraie nourriture</em> dans les mains des familles</h1>
    <p className="sp">Nos grands-parents savaient d'où venait leur nourriture. En quelques décennies, ce lien essentiel s'est rompu. PousseLab est né pour le restaurer.</p>
    <p className="sp">Nous croyons que <strong>chaque famille devrait pouvoir cultiver ses propres légumes</strong>, qu'elle vive dans un studio parisien ou une maison avec terrasse. Et que les engrais maison fabriqués avec les épluchures de vos légumes sont plus efficaces et moins chers que ce qu'on achète en jardinerie.</p>
    <p className="sp">Pas de vidéo imposée. Un accès à vie au contenu, une IA jardinière 24h/24, un guide saisonnier adapté à votre région, et des recettes d'engrais maison qui transforment vos déchets de cuisine en or pour vos plantes.</p>
    <div style={{background:"rgba(46,92,38,.06)",border:"1px solid rgba(46,92,38,.15)",borderRadius:13,padding:"18px 20px",marginBottom:22}}>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,color:C.bark,marginBottom:12}}>Pourquoi choisir PousseLab ?</div>
      {[{i:"🎯",t:"Méthode testée et éprouvée",p:"Nos formateurs cultivent depuis plus de 10 ans et ont formé des milliers d'élèves à travers toute la France."},
        {i:"💬",t:"Communauté de 4 870 passionnés",p:"Forum privé, Flora IA 24h/24 et entraide entre élèves. Vous n'êtes jamais seul face à vos questions."},
        {i:"🔄",t:"Contenu mis à jour chaque saison",p:"Nouvelles techniques, nouvelles vidéos, nouveau guide régional — votre accès à vie inclut toutes les mises à jour."},
        {i:"📱",t:"Accessible sur tous vos appareils",p:"Regardez depuis votre téléphone, tablette ou ordinateur — vos leçons sont disponibles 24h/24, partout."},
      ].map((av,i)=>(
        <div key={i} style={{display:"flex",gap:12,padding:"8px 0",borderBottom:i<3?`1px solid ${C.light}`:"none"}}>
          <div style={{fontSize:22,flexShrink:0,marginTop:2}}>{av.i}</div>
          <div><div style={{fontSize:13.5,fontWeight:700,color:C.bark,marginBottom:3}}>{av.t}</div><div style={{fontSize:12.5,color:C.muted,lineHeight:1.65}}>{av.p}</div></div>
        </div>
      ))}
    </div>
    <div className="mv-grid">{[{icon:"🌱",t:"Accessibilité",p:"Jardiner doit être possible pour tout le monde, peu importe l'espace disponible ou l'expérience."},{icon:"🔬",t:"Contenu réel",p:"Données horticoles vérifiées, recettes testées, conseils régionalisés — pas de généralités."},{icon:"♻️",t:"Zéro déchet",p:"Engrais maison, eau de cuisson, épluchures valorisées. Zéro chimique, zéro gaspillage."},{icon:"👨‍👩‍👧",t:"Transmission",p:"Jardiner avec ses enfants leur apprend d'où vient la nourriture. Un acte éducatif profond."},{icon:"🇫🇷",t:"Ancrée en France",p:"6 zones climatiques françaises, calendriers locaux, Flora IA en français."},{icon:"💧",t:"Hydroponie accessible",p:"La culture du futur, adaptée à l'appartement — 90% moins d'eau, 3x plus de rendement."}].map((v,i)=><div key={i} className="mv-card"><div className="mv-icon">{v.icon}</div><div className="mv-t">{v.t}</div><div className="mv-p">{v.p}</div></div>)}</div>
  </div></section><Footer go={go}/></div>);
}

function PageTemoignages({go}){
  return(<div className="page"><section className="sec" style={{background:C.bark}}>
    <div className="max ctr"><div className="ey inv">Témoignages</div><h2 className="h2 inv">Ils ont changé leur façon de <em>manger.</em></h2><p className="lead inv">Des vraies familles, des vraies récoltes. Toutes les régions de France.</p></div>
    <div className="max" style={{marginTop:28}}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>{TEMOIGNAGES.map((t,i)=><div key={i} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:14,padding:18}}><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}><div style={{width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{t.av}</div><div><div style={{fontSize:13.5,fontWeight:700,color:"#fff"}}>{t.name}</div><div style={{fontSize:10.5,color:"rgba(255,255,255,.35)"}}>{t.city}</div></div></div><div style={{color:C.gold,fontSize:12,letterSpacing:1,marginBottom:8}}>{"★".repeat(t.stars)}</div><div style={{display:"inline-block",background:"rgba(168,224,144,.12)",padding:"2px 7px",borderRadius:100,fontSize:10,fontWeight:700,color:"#A8E090",marginBottom:8}}>{t.f}</div><p style={{fontSize:13,color:"rgba(255,255,255,.7)",lineHeight:1.75,fontStyle:"italic"}}>"{t.txt}"</p><div style={{fontSize:10.5,color:"rgba(255,255,255,.35)",marginTop:8,fontWeight:600}}>→ {t.det}</div></div>)}</div></div>
  </section><Footer go={go}/></div>);
}

function PageContact({go}){
  const [sent,setSent]=useState(false);const [form,setForm]=useState({nom:"",email:"",sujet:"",msg:""});
  const upd=(k,v)=>setForm(p=>({...p,[k]:v}));
  return(<div className="page"><section className="sec"><div className="sw">
    <div className="ey" style={{marginBottom:13}}>Contact</div>
    <h1 className="sh">On est là pour <em>vous aider</em></h1>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28}}>{[{icon:"💬",t:"Flora IA",p:"Pour toute question de jardinage — réponse instantanée, 24h/24. Cliquez sur le bouton 🌿 en bas à droite."},{icon:"📧",t:"Support humain",p:"Pour les questions sur votre compte ou votre paiement. Réponse en 24h ouvrées."}].map((c,i)=><div key={i} style={{background:C.white,border:`1.5px solid ${C.light}`,borderRadius:13,padding:18,textAlign:"center"}}><div style={{fontSize:32,marginBottom:9}}>{c.icon}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,marginBottom:6}}>{c.t}</div><div style={{fontSize:12.5,color:C.muted,lineHeight:1.7}}>{c.p}</div></div>)}</div>
    {!sent?(<>
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,marginBottom:16}}>Envoyer un message</div>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        <div><label className="cf-label">Nom complet</label><input className="cf-input" placeholder="Marie Dupont" value={form.nom} onChange={e=>upd("nom",e.target.value)}/></div>
        <div><label className="cf-label">Email</label><input className="cf-input" type="email" placeholder="marie@exemple.fr" value={form.email} onChange={e=>upd("email",e.target.value)}/></div>
        <div><label className="cf-label">Sujet</label><select className="cf-input" value={form.sujet} onChange={e=>upd("sujet",e.target.value)} style={{cursor:"pointer"}}><option value="">Choisissez un sujet</option><option>Question sur une formation</option><option>Problème technique</option><option>Remboursement</option><option>Partenariat</option><option>Autre</option></select></div>
        <div><label className="cf-label">Message</label><textarea className="cf-input" style={{height:110,resize:"vertical"}} placeholder="Votre message..." value={form.msg} onChange={e=>upd("msg",e.target.value)}/></div>
        <button className="btn-p" style={{justifyContent:"center"}} onClick={()=>setSent(true)}>Envoyer le message →</button>
      </div>
    </>):(<div style={{textAlign:"center",padding:"28px 0"}}><div style={{fontSize:52,marginBottom:14}}>✉️</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,marginBottom:9}}>Message envoyé !</div><div style={{fontSize:14,color:C.muted}}>Nous vous répondrons dans les 24h ouvrées.</div></div>)}
  </div></section><Footer go={go}/></div>);
}

function PageCGV({go}){
  const articles=[
    {t:"Article 1 — Objet",p:"Les présentes conditions générales de vente s'appliquent à toutes les ventes de formations en ligne conclues entre PousseLab et toute personne physique via la plateforme www.pousselab.fr."},
    {t:"Article 2 — Produits proposés",p:"PousseLab propose des formations numériques sous forme de leçons interactives, guides PDF, quiz de validation et accès à l'IA Flora. L'accès est accordé à vie après paiement unique, incluant toutes les mises à jour futures du contenu."},
    {t:"Article 3 — Prix et paiement",p:"Les prix sont indiqués en euros TTC. Le paiement est sécurisé par Stripe (certifié PCI-DSS niveau 1). Les données bancaires du Client ne transitent pas sur les serveurs de PousseLab. Paiement par carte bancaire, Apple Pay et Google Pay acceptés."},
    {t:"Article 4 — Accès et livraison",p:"L'accès à la formation est activé immédiatement après validation du paiement. Un email de confirmation est envoyé à l'adresse indiquée lors de la commande dans un délai maximum de 30 minutes."},
    {t:"Article 5 — Droit de rétractation",p:"Conformément à l'article L221-18 du Code de la consommation, le Client dispose d'un délai de 14 jours pour exercer son droit de rétractation. PousseLab offre une garantie de satisfaction de 30 jours : remboursement intégral sans justification."},
    {t:"Article 6 — Propriété intellectuelle",p:"L'ensemble des contenus de la plateforme est protégé par le droit d'auteur. Toute reproduction ou diffusion est strictement interdite sans autorisation préalable écrite de PousseLab."},
    {t:"Article 7 — Protection des données (RGPD)",p:"PousseLab collecte uniquement les données nécessaires à la fourniture du service (nom, email). Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contact : rgpd@pousselab.fr"},
    {t:"Article 8 — Responsabilité",p:"PousseLab s'engage à fournir un contenu pédagogique de qualité basé sur des données horticoles vérifiées. Les résultats de jardinage dépendent de nombreux facteurs extérieurs et ne peuvent être garantis."},
    {t:"Article 9 — Juridiction",p:"En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, les tribunaux compétents de Paris seront saisis. Le droit français est applicable à ces CGV."},
  ];
  return(<div className="page"><section className="sec"><div className="sw">
    <div className="ey" style={{marginBottom:13}}>Mentions légales</div>
    <h1 className="sh">Conditions Générales de <em>Vente</em></h1>
    {articles.map((art,i)=><div key={i} className="cgv-art"><div className="cgv-t">{art.t}</div><p className="sp">{art.p}</p></div>)}
    <div style={{background:C.light,borderRadius:12,padding:"14px 18px",fontSize:12,color:C.muted}}>Dernière mise à jour : Avril 2026 — PousseLab SAS, Paris, France — contact@pousselab.fr</div>
  </div></section><Footer go={go}/></div>);
}

export default function App(){
  const [page,setPage]=useState("home");
  const [showLead,setShowLead]=useState(false);
  const [stripeF,setStripeF]=useState(null);
  const [purchased,setPurchased]=useState(new Set());
  const addPurchased=id=>setPurchased(p=>new Set([...p,id]));
  const go=p=>{setPage(p);try{window.scrollTo({top:0});}catch(e){}};
  useEffect(()=>{const t=setTimeout(()=>setShowLead(true),9000);return()=>clearTimeout(t);},[]);
  const openStripe=(id)=>{setStripeF(id);};
  return(<>
    <style>{CSS}</style>
    {showLead&&<LeadMagnet onClose={()=>setShowLead(false)}/>}
    {stripeF&&<StripeModal formation={stripeF} onClose={()=>setStripeF(null)} onPurchase={addPurchased}/>}
    <Nav page={page} go={go} setShowLead={setShowLead}/>
    {page==="home"&&<Home go={go} setShowLead={setShowLead} setSF={openStripe}/>}
    {page==="guide"&&<PageGuide go={go}/>}
    {page==="engrais"&&<PageEngrais go={go}/>}
    {page==="formations"&&<PageFormations go={go} setSF={openStripe} purchased={purchased}/>}
    {page==="blog"&&<PageBlog go={go}/>}
    {page==="materiel"&&<PageMateriel go={go}/>}
    {page==="faq"&&<PageFAQ go={go}/>}
    {page==="dashboard"&&<PageDashboard go={go} setSF={openStripe} purchased={purchased}/>}
    {page==="mission"&&<PageMission go={go}/>}
    {page==="temoignages"&&<PageTemoignages go={go}/>}
    {page==="contact"&&<PageContact go={go}/>}
    {page==="cgv"&&<PageCGV go={go}/>}
    <FloraChat/>
  </>);
}
