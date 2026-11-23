// Fragen für den Modus "Wer fliegt?" – Format pro Zeile: Frage | Lösung
const QUIZ_LEVELS = [
  { id: 'leicht', name: 'Leicht', color: '#2A9D5C' },
  { id: 'mittel', name: 'Mittel', color: '#1D7FE0' },
  { id: 'schwer', name: 'Schwer', color: '#F26B1D' },
  { id: 'unmoeglich', name: 'Unmöglich', color: '#8E44AD' },
  { id: 'fang', name: 'Fangfrage', color: '#E63946' },
];

const QUIZ_SOURCE = {
  leicht: `
Wie viele Beine hat eine Spinne? | 8
Wie heißt die Hauptstadt von Frankreich? | Paris
Wie viele Tage hat ein Schaltjahr? | 366
Welche Farbe entsteht aus Blau und Gelb? | Grün
Wie viele Minuten hat eine Stunde? | 60
Was ist 7 × 8? | 56
Wie heißt der größte Planet unseres Sonnensystems? | Jupiter
Welches ist das größte Tier der Welt? | Blauwal
Wie viele Spieler hat eine Fußballmannschaft auf dem Feld? | 11
Wie viele Kontinente gibt es? | 7
In welchem Land steht der Eiffelturm? | Frankreich
Wie heißt die Hauptstadt von Italien? | Rom
Wie viele Ecken hat ein Würfel? | 8
Welches Gas brauchen wir zum Atmen? | Sauerstoff
Wie lautet die chemische Formel für Wasser? | H₂O
Wie viele Monate hat ein Jahr? | 12
Welcher Monat hat die wenigsten Tage? | Februar
Wie viele Seiten hat ein Dreieck? | 3
Wer hat Facebook gegründet (bekanntester Gründer)? | Mark Zuckerberg
Welche Farbe hat ein Smaragd? | Grün
Wie viele Stunden hat ein Tag? | 24
Welches ist das schnellste Landtier? | Gepard
Wie heißt die Hauptstadt von Spanien? | Madrid
Aus welchem Land kommt die Pizza ursprünglich? | Italien
Wie viele Zähne hat ein erwachsener Mensch normalerweise? | 32
Welcher Planet ist der Sonne am nächsten? | Merkur
Wie heißt die Hauptstadt von Deutschland? | Berlin
Was ist die Hauptzutat von Guacamole? | Avocado
Was ist 100 geteilt durch 4? | 25
Wie viele Bundesländer hat Deutschland? | 16
In welcher Stadt steht das Brandenburger Tor? | Berlin
Wie viele Ringe hat das olympische Symbol? | 5
Welches Organ pumpt das Blut durch den Körper? | Herz
Bei wie viel Grad Celsius gefriert Wasser? | 0 °C
Bei wie viel Grad Celsius kocht Wasser auf Meereshöhe? | 100 °C
Welche Sprache spricht man in Brasilien? | Portugiesisch
Wie heißt die Währung in Japan? | Yen
Wer malte die Mona Lisa? | Leonardo da Vinci
Wie viele Saiten hat eine normale Gitarre? | 6
Welches Tier ist das Wappentier Deutschlands? | Adler
Wie viele Spieler stehen beim Basketball pro Team auf dem Feld? | 5
Wie heißt die Währung in Großbritannien? | Pfund (Sterling)
Wie viele Beine hat ein Insekt? | 6
Wie heißt die Hauptstadt von Österreich? | Wien
Wie heißt die Hauptstadt der Schweiz? | Bern
Wie viele Sekunden hat eine Minute? | 60
Aus welchem Land kommt Sushi? | Japan
Wer schrieb „Romeo und Julia“? | William Shakespeare
Was ist 12 + 15? | 27
Welche Form hat ein Stoppschild? | Achteck
Wie heißt der Bär im „Dschungelbuch“? | Balu
Wie heißt Harry Potters bester Freund mit den roten Haaren? | Ron Weasley
Wie viele Wochen hat ein Jahr ungefähr? | 52
Welche Farbe hat der Kreis auf der Flagge Japans? | Rot
Wie heißt der höchste Berg der Welt? | Mount Everest
Wie heißt der höchste Berg Deutschlands? | Zugspitze
In welchem Meer liegt Mallorca? | Mittelmeer
Welches Getränk wird aus Hopfen und Malz gebraut? | Bier
Welcher Vogel kann nicht fliegen und lebt in der Antarktis? | Pinguin
Wie nennt man ein Pferdebaby? | Fohlen
Wie nennt man ein Schafbaby? | Lamm
Welcher Superheld kommt vom Planeten Krypton? | Superman
Wie heißt der grüne Oger aus dem gleichnamigen Film? | Shrek
Wie heißt die Hauptstadt von Großbritannien? | London
Welcher Fluss fließt durch Köln? | Rhein
Welcher Fluss fließt durch Hamburg? | Elbe
Wie viele Felder hat ein Schachbrett? | 64
Wie heißt der Kapitän der „Black Pearl“ in „Fluch der Karibik“? | Jack Sparrow
Welches Instrument hat normalerweise 88 Tasten? | Klavier
Welcher Sport wird in Wimbledon gespielt? | Tennis
Wie heißt der größte Ozean der Erde? | Pazifik
Wie heißt das Gegenteil von Ebbe? | Flut
Wie heißt SpongeBobs bester Freund? | Patrick
Welches Land hat die Hauptstadt Athen? | Griechenland
Welches orange Gemüse fressen Hasen angeblich am liebsten? | Karotte
Woraus werden Pommes gemacht? | Kartoffeln
Welche Jahreszeit kommt nach dem Winter? | Frühling
Wie viele Tore schießt man mindestens für einen Hattrick? | 3
Was misst ein Thermometer? | Temperatur
Welches Land hat die Form eines Stiefels? | Italien
Wer singt „Shape of You“? | Ed Sheeran
Wer spielt die männliche Hauptrolle in „Titanic“? | Leonardo DiCaprio
Wie heißt die Hauptstadt von Russland? | Moskau
Wie heißt die größte Stadt der USA? | New York
Welches Tier hat einen Rüssel? | Elefant
Wie viele Höcker hat ein Dromedar? | 1
Was ist 9 × 9? | 81
Was ist die Wurzel aus 49? | 7
Wie viel sind 1.000 Gramm? | 1 Kilogramm
Wie viele Zentimeter hat ein Meter? | 100
Welche Farbe bekommt man aus Rot und Weiß? | Rosa
Welcher Planet ist als „roter Planet“ bekannt? | Mars
Welche Sportart spielt LeBron James? | Basketball
In welcher Sportart gibt es einen Touchdown? | American Football
Welches Land wurde 2014 Fußball-Weltmeister? | Deutschland
In welchem Land fand die WM 2014 statt? | Brasilien
Wer wurde 2022 Fußball-Weltmeister? | Argentinien
Welcher Verein spielt in der Allianz Arena? | FC Bayern München
Welcher Verein spielt im Signal Iduna Park? | Borussia Dortmund
Wie lange dauert ein Fußballspiel ohne Nachspielzeit? | 90 Minuten
Welches Spielzeug aus Dänemark besteht aus bunten Steinen? | LEGO
Welche Firma stellt das iPhone her? | Apple
Wofür steht „WWW“? | World Wide Web
Wie viele Planeten hat unser Sonnensystem? | 8
Wie heißt der Schneemann in „Die Eiskönigin“? | Olaf
Wie heißt der junge Löwe in „Der König der Löwen“? | Simba
Was für ein Fisch ist Nemo? | Clownfisch
Welche Farbe hat Hulk? | Grün
Wie heißt Spider-Man mit bürgerlichem Namen? | Peter Parker
Wer ist Batman im echten Leben? | Bruce Wayne
In welchem Land liegt Venedig? | Italien
Was frisst ein Panda hauptsächlich? | Bambus
Wie viele Ecken hat ein Quadrat? | 4
In welchem Jahr fiel die Berliner Mauer? | 1989
Wie nennt man jemanden, der kein Fleisch isst? | Vegetarier
Wie heißt das Rentier mit der roten Nase? | Rudolph
Welches Fest feiert man am 31. Oktober? | Halloween
Wie viele Kerzen hat ein Adventskranz normalerweise? | 4
Welches Land hat ein Ahornblatt auf der Flagge? | Kanada
Welche Farben hat die deutsche Flagge? | Schwarz, Rot, Gold
Welche Sprache spricht man in Mexiko? | Spanisch
Was ist der Plural von „Maus“? | Mäuse
Welche App hat einen Geist als Logo? | Snapchat
Wie heißt der berühmte Klempner von Nintendo? | Mario
Wie heißt Marios Bruder? | Luigi
Wie heißt der blaue Igel von Sega? | Sonic
Welches gelbe Elektro-Pokémon ist das bekannteste? | Pikachu
In welchem Spiel baut man mit Blöcken und trifft auf Creeper? | Minecraft
Welcher Fußballer wird „CR7“ genannt? | Cristiano Ronaldo
Wer moderiert „Wer wird Millionär?“? | Günther Jauch
Wer singt „Atemlos durch die Nacht“? | Helene Fischer
Wer sang „Thriller“? | Michael Jackson
In welchem Battle-Royale-Spiel springt man aus einem Bus? | Fortnite
Wie heißt die Prinzessin in Super Mario? | Peach
Welche Spielkonsole stellt Sony her? | PlayStation
Aus welchem Land kommt die Paella? | Spanien
In welcher Stadt wurde die Currywurst erfunden? | Berlin
Wie viele Pins stehen beim Bowling? | 10
Wie viele Punkte zählt ein Freiwurf im Basketball? | 1
Wer schrieb die Harry-Potter-Bücher? | J. K. Rowling
Wie hieß die Band von John Lennon? | The Beatles
Was ist 50 + 50? | 100
Wie heißt der Erfinder von Microsoft (bekanntester Gründer)? | Bill Gates
Welches Tier sagt „Kikeriki“? | Hahn
Welche Farbe hat Schnee? | Weiß
Wie heißt die Notrufnummer für Feuerwehr und Rettungsdienst in Deutschland? | 112
Wie heißt die Notrufnummer der Polizei in Deutschland? | 110
Wie schnell darf man in Deutschland innerorts normalerweise fahren? | 50 km/h
Auf welchem Kontinent liegt Ägypten? | Afrika
Welches Tier ist der „König der Tiere“? | Löwe
Wie viele Arme hat ein Oktopus? | 8
Was ist die Hauptstadt der Niederlande? | Amsterdam
Wie viele Spieler sind beim Volleyball pro Team auf dem Feld? | 6
Was ist 3 hoch 2? | 9
Was ist das Gegenteil von „hoch“? | Tief
Wie heißt der Hund von Micky Maus? | Pluto
Welcher Planet ist unser Heimatplanet? | Erde
Wie heißt der beste Freund von Bart Simpson? | Milhouse
Welche Farbe hat ein Polarbär-Fell (so wie man es sieht)? | Weiß
Welches Land ist für Kängurus bekannt? | Australien
Welche Stadt nennt man „Big Apple“? | New York
Wie heißt der Fluss in Paris? | Seine
Was trinkt man in Bayern traditionell aus einer Maß? | Bier
Wie heißt das große Volksfest in München? | Oktoberfest
Wie viele Räder hat ein Dreirad? | 3
`,
  mittel: `
Wie heißt die Hauptstadt von Australien? | Canberra
Wie heißt die Hauptstadt von Kanada? | Ottawa
Wie heißt die Hauptstadt von Brasilien? | Brasília
Wie heißt die Hauptstadt der Türkei? | Ankara
Wie heißt die Hauptstadt von Marokko? | Rabat
Wie heißt die Hauptstadt von Neuseeland? | Wellington
Wie heißt die Hauptstadt von Norwegen? | Oslo
Wie heißt die Hauptstadt von Ägypten? | Kairo
Wie heißt die Hauptstadt von Argentinien? | Buenos Aires
Wie heißt die Hauptstadt von Südkorea? | Seoul
Wie heißt die Hauptstadt von Polen? | Warschau
Wie heißt die Hauptstadt der Ukraine? | Kiew
Wie heißt die Hauptstadt von Island? | Reykjavík
Wie heißt die Hauptstadt von Portugal? | Lissabon
Wie heißt die Hauptstadt von Irland? | Dublin
Wie heißt die Hauptstadt von Schweden? | Stockholm
Wie heißt die Hauptstadt von Dänemark? | Kopenhagen
Wie heißt die Hauptstadt von Finnland? | Helsinki
Wie heißt die Hauptstadt von Ungarn? | Budapest
Wie heißt die Hauptstadt von Tschechien? | Prag
Wie heißt die Hauptstadt von Kroatien? | Zagreb
Wie heißt die Hauptstadt von Serbien? | Belgrad
Wie heißt die Hauptstadt von Rumänien? | Bukarest
Wie heißt die Hauptstadt von Thailand? | Bangkok
Wie heißt die Hauptstadt von Indien? | Neu-Delhi
Wie heißt die Hauptstadt von China? | Peking
Wie heißt die Hauptstadt von Mexiko? | Mexiko-Stadt
Welches chemische Element hat das Symbol „Fe“? | Eisen
Welches chemische Element hat das Symbol „Au“? | Gold
Welches chemische Element hat das Symbol „Ag“? | Silber
Welches chemische Element hat das Symbol „Na“? | Natrium
Welches chemische Element hat das Symbol „C“? | Kohlenstoff
Wie viele Knochen hat ein erwachsener Mensch ungefähr? | 206
Was ist das größte Organ des Menschen? | Die Haut
Wie heißt der längste Fluss der Welt? | Nil (je nach Messung auch Amazonas)
In welchem Jahr begann der Zweite Weltkrieg? | 1939
In welchem Jahr endete der Zweite Weltkrieg? | 1945
In welchem Jahr landete der erste Mensch auf dem Mond? | 1969
Wer betrat als erster Mensch den Mond? | Neil Armstrong
In welchem Jahr wurde Deutschland wiedervereinigt? | 1990
Wer war der erste Bundeskanzler der Bundesrepublik? | Konrad Adenauer
In welchem Jahr sank die Titanic? | 1912
Wer schrieb „Faust“? | Johann Wolfgang von Goethe
Wer komponierte die „Mondscheinsonate“? | Ludwig van Beethoven
Wie viele Sinfonien hat Beethoven vollendet? | 9
Welcher Maler schnitt sich einen Teil seines Ohrs ab? | Vincent van Gogh
Welches ist das flächenmäßig größte Land der Erde? | Russland
Welches Land hat die meisten Einwohner? | Indien
Wie viele Einwohner hat Deutschland ungefähr? | Rund 83–84 Millionen
Welche ist die zweitgrößte Stadt Deutschlands? | Hamburg
Welches ist das flächenmäßig größte Bundesland? | Bayern
Welches ist das kleinste Bundesland? | Bremen
Wie heißt die Hauptstadt von Bayern? | München
Wie heißt die Hauptstadt von Nordrhein-Westfalen? | Düsseldorf
Wie heißt die Hauptstadt von Niedersachsen? | Hannover
Wie heißt die Hauptstadt von Sachsen? | Dresden
Wie heißt die Hauptstadt von Hessen? | Wiesbaden
Wie heißt die Hauptstadt von Baden-Württemberg? | Stuttgart
Wie heißt die Hauptstadt von Rheinland-Pfalz? | Mainz
Wie heißt die Hauptstadt von Schleswig-Holstein? | Kiel
Wie heißt die Hauptstadt von Thüringen? | Erfurt
Wie heißt die Hauptstadt von Brandenburg? | Potsdam
Wie heißt die Hauptstadt von Sachsen-Anhalt? | Magdeburg
Wie heißt die Hauptstadt von Mecklenburg-Vorpommern? | Schwerin
Wie heißt die Hauptstadt des Saarlandes? | Saarbrücken
Wie viele Spieler hat eine Handballmannschaft auf dem Feld (inklusive Torwart)? | 7
Wie lange dauert ein NBA-Spiel (reine Spielzeit)? | 48 Minuten
Wie viele Punkte zählt ein Touchdown? | 6
Wer hat die meisten Ballon-d’Or-Trophäen gewonnen? | Lionel Messi
Wer ist Rekordtorschütze der Bundesliga? | Gerd Müller
Wo fanden die Olympischen Sommerspiele 2024 statt? | Paris
Wo fanden die Olympischen Sommerspiele 2016 statt? | Rio de Janeiro
Wie viele Grand-Slam-Turniere gibt es im Tennis pro Jahr? | 4
Welches Land hat die meisten Fußball-WM-Titel? | Brasilien (5)
Wie oft wurden die deutschen Männer Fußball-Weltmeister? | 4-mal
Wer schoss Deutschland im WM-Finale 2014 zum Titel? | Mario Götze
Wer war Bundestrainer beim WM-Titel 2014? | Joachim Löw
Welche Blutgruppe gilt als Universalspender? | 0 negativ
Wie nennt man das „Kraftwerk der Zelle“? | Mitochondrium
Wie lautet die chemische Formel von Kochsalz? | NaCl
Wie schnell ist das Licht ungefähr? | Rund 300.000 km pro Sekunde
Wie viele Nullen hat eine Million? | 6
Wie viele Nullen hat eine Milliarde? | 9
Was sind 15 Prozent von 200? | 30
Was ist 13 × 13? | 169
Was ist die Quadratwurzel aus 144? | 12
Wie viele Grad hat ein rechter Winkel? | 90
Wie groß ist die Winkelsumme in einem Dreieck? | 180 Grad
Wie lautet die Zahl Pi auf zwei Nachkommastellen? | 3,14
Wer entwickelte die Relativitätstheorie? | Albert Einstein
Wer formulierte das Gravitationsgesetz (Apfel-Legende)? | Isaac Newton
Wie heißt das härteste natürliche Material? | Diamant
Wie viele Herzen hat ein Oktopus? | 3
Welches Säugetier kann aktiv fliegen? | Fledermaus
Was ist das Nationaltier Australiens? | Känguru
Wie lange ist ein Elefant ungefähr trächtig? | Rund 22 Monate
Wer führte Regie bei „Titanic“ und „Avatar“? | James Cameron
Wie viele Bände hat die Harry-Potter-Hauptreihe? | 7
Wie heißt der Schulleiter von Hogwarts? | Albus Dumbledore
Welches Hogwarts-Haus hat eine Schlange im Wappen? | Slytherin
Wie heißt der Hobbit, der den Einen Ring trägt? | Frodo Beutlin
Welchen Decknamen nutzt Walter White in „Breaking Bad“? | Heisenberg
In welcher Stadt leben die Simpsons? | Springfield
Wie hieß der Sänger von Queen? | Freddie Mercury
Wer wird „King of Pop“ genannt? | Michael Jackson
Wer wird „King of Rock ’n’ Roll“ genannt? | Elvis Presley
Aus welchem Land kommt die Band ABBA? | Schweden
Wie heißt Eminem mit bürgerlichem Namen? | Marshall Mathers
Aus welcher Stadt kommt Drake? | Toronto
In welchem Jahr kam das erste iPhone auf den Markt? | 2007
Wofür steht „GPS“? | Global Positioning System
Wie heißt Googles Betriebssystem für Smartphones? | Android
Aus welchem Land kommt der Gouda? | Niederlande
Welche Nuss steckt in Nutella? | Haselnuss
Was ist die Hauptzutat von Hummus? | Kichererbsen
Woraus wird Tofu hergestellt? | Sojabohnen
Was ist Sauerkraut? | Fermentierter Weißkohl
Wie heißt das berühmteste Gemälde von Edvard Munch? | Der Schrei
Wer malte die Decke der Sixtinischen Kapelle? | Michelangelo
Wie heißt der längste Fluss Europas? | Wolga
Wie heißt der höchste Berg der Alpen? | Montblanc
In welchem Meer kann man fast ohne Anstrengung oben treiben? | Totes Meer
Wie heißt die Meerenge zwischen Spanien und Marokko? | Straße von Gibraltar
Welches ist das kleinste Land der Welt? | Vatikanstadt
Wie viele Mitgliedsstaaten hat die EU (Stand 2025)? | 27
Wie heißt die Währung der Schweiz? | Schweizer Franken
Wie heißt die Währung der Türkei? | Türkische Lira
Wie heißt die Währung Polens? | Złoty
Seit welchem Jahr gibt es Euro-Bargeld? | 2002
Wer war von 2005 bis 2021 Bundeskanzlerin? | Angela Merkel
In welchem Gebäude tagt der Bundestag? | Im Reichstagsgebäude in Berlin
Wie heißt das Staatsoberhaupt Deutschlands (Amt)? | Bundespräsident
Wer war der erste Mensch im Weltall? | Juri Gagarin
Wer war der erste Präsident der USA? | George Washington
Wer war US-Präsident während des Amerikanischen Bürgerkriegs? | Abraham Lincoln
In welchem Jahr wurde die Berliner Mauer gebaut? | 1961
In welchem Jahr erreichte Kolumbus Amerika? | 1492
Wer war der erste römische Kaiser? | Augustus
Welche Stadt wurde 79 n. Chr. vom Vesuv verschüttet? | Pompeji
Welche Sprache sprachen die alten Römer? | Latein
Wie heißt die größte Insel der Welt? | Grönland
Welcher Kontinent ist der größte? | Asien
Auf welchem Kontinent gibt es die meisten Länder? | Afrika
Welcher Planet hat die auffälligsten Ringe? | Saturn
Wie heißt die Galaxie, in der wir leben? | Milchstraße
Wie lange braucht das Licht von der Sonne zur Erde? | Rund 8 Minuten
Welcher Planet ist der heißeste in unserem Sonnensystem? | Venus
Wer erfand den Buchdruck mit beweglichen Lettern in Europa? | Johannes Gutenberg
Wer meldete 1886 das erste Automobil zum Patent an? | Carl Benz
Wofür steht „CEO“? | Chief Executive Officer
Zu welchem Konzern gehören Instagram und WhatsApp? | Meta
Welches Land produziert am meisten Kaffee? | Brasilien
Ab welchem Alter darf man in Deutschland Bier kaufen? | 16
Ab welchem Alter darf man in Deutschland Schnaps kaufen? | 18
Bei wie vielen Punkten in Flensburg ist der Führerschein weg? | 8
Wofür steht „ASAP“? | As soon as possible
Was ist ein Palindrom? | Ein Wort, das vorwärts und rückwärts gleich ist
Was ist der Plural von „Kaktus“? | Kakteen
Wie heißt der längste Knochen im Körper? | Oberschenkelknochen
Wie heißt der kleinste Knochen im Körper? | Steigbügel (im Ohr)
Wie viel Blut hat ein Erwachsener ungefähr? | 5–6 Liter
Welches Vitamin bildet der Körper mit Sonnenlicht? | Vitamin D
Wie viele Weisheitszähne hat ein Mensch normalerweise? | 4
Wie nennt man die Angst vor Spinnen? | Arachnophobie
Welcher Vogel ist im Sturzflug das schnellste Tier der Welt? | Wanderfalke
Welche ist die größte Katzenart der Welt? | Tiger
Welches Tier hat blaues Blut? | Oktopus (auch Hummer)
Wie nennt man ein männliches Schwein? | Eber
Wie nennt man ein weibliches Pferd? | Stute
Welcher Marvel-Held kämpft mit einem Hammer? | Thor
Welcher Avenger trägt einen Schild? | Captain America
Wie heißt Iron Man mit bürgerlichem Namen? | Tony Stark
Welcher Bösewicht sammelt die Infinity-Steine? | Thanos
In welcher Serie gibt es das „Upside Down“? | Stranger Things
In welcher Serie tragen Räuber rote Overalls und Dalí-Masken? | Haus des Geldes
In welcher Serie kämpft man um den Eisernen Thron? | Game of Thrones
Wie heißt die Hauptfigur in „Peaky Blinders“? | Thomas Shelby
Welches Spiel wird in „Squid Game“ als erstes gespielt? | Rotes Licht, grünes Licht
Welcher Schauspieler spielt Mr. Bean? | Rowan Atkinson
Welche Band sang „Smells Like Teen Spirit“? | Nirvana
Welcher DJ veröffentlichte „Wake Me Up“? | Avicii
Aus welchem Land kommt Rihanna? | Barbados
Aus welchem Land kommt Shakira? | Kolumbien
Wer gewann die Fußball-EM 2024? | Spanien
Wer gewann das deutsche Champions-League-Finale 2013? | FC Bayern München
Gegen wen verlor Brasilien bei der WM 2014 mit 1:7? | Deutschland
In welcher Sportart wird um den Stanley Cup gespielt? | Eishockey
Wie viele Löcher hat ein normaler Golfplatz? | 18
Wie lang ist ein Marathon? | 42,195 km
Wie viele Punkte gibt das Bullseye beim Darts? | 50
Wer hält den Weltrekord über 100 Meter? | Usain Bolt
Wie viele Formel-1-WM-Titel holte Michael Schumacher? | 7
Wer gewann als 17-Jähriger Wimbledon (1985)? | Boris Becker
Wie viele Länder grenzen an Deutschland? | 9
Wie viele Minuten dauert ein Handballspiel? | 60
Wie lang ist ein olympisches Schwimmbecken? | 50 Meter
Wie viele Sterne hat die Flagge der USA? | 50
Wie lautet Artikel 1 Satz 1 des Grundgesetzes? | Die Würde des Menschen ist unantastbar.
Welche Stadt war Hauptstadt der Bundesrepublik vor Berlin? | Bonn
Welcher Tag ist der deutsche Nationalfeiertag? | 3. Oktober
Wer moderierte jahrzehntelang „Wetten, dass..?“? | Thomas Gottschalk
Wer singt „Roller“? | Apache 207
Wer singt „Bad Guy“? | Billie Eilish
Wer singt „Blinding Lights“? | The Weeknd
Aus welcher Stadt kommen die Beatles? | Liverpool
Wie heißt die Hauptfigur in „God of War“? | Kratos
Wie heißt die Stadt in GTA V? | Los Santos
Was ist die Hauptzutat von Pesto Genovese? | Basilikum
Was ist Wasabi? | Japanischer Meerrettich
Was ist Kaviar? | Fischrogen (vom Stör)
Woraus wird Marzipan gemacht? | Mandeln und Zucker
Wofür steht „BMW“? | Bayerische Motoren Werke
Wer hat Amazon gegründet? | Jeff Bezos
In welchem Jahr wurde Facebook gegründet? | 2004
Wie viele Bits hat ein Byte? | 8
Was ist 2 hoch 10? | 1024
Wie viele Stunden hat eine Woche? | 168
Wie viele Kanten hat ein Würfel? | 12
Welches Element hat die Ordnungszahl 1? | Wasserstoff
Wie viele Chromosomen hat ein Mensch normalerweise? | 46
Wie heißt die Wissenschaft vom Wetter? | Meteorologie
In welchem Jahr begann der Erste Weltkrieg? | 1914
In welchem Jahr wurde die Bundesrepublik gegründet? | 1949
Wer war 1871 der erste Reichskanzler? | Otto von Bismarck
In welchem Jahr begann die Französische Revolution? | 1789
Wer war der letzte deutsche Kaiser? | Wilhelm II.
In welchem Jahr veröffentlichte Martin Luther seine 95 Thesen? | 1517
In welchem Land liegt Machu Picchu? | Peru
Welches Organ produziert Insulin? | Bauchspeicheldrüse
Wer führte Regie bei „Pulp Fiction“? | Quentin Tarantino
Wer führte Regie bei „Inception“? | Christopher Nolan
Wer spielte den Joker in „The Dark Knight“? | Heath Ledger
Wie heißt das fiktive Land in „Black Panther“? | Wakanda
Wie heißt der Wirt der Kneipe bei den Simpsons? | Moe
Wie hieß Darth Vader, bevor er zur dunklen Seite wechselte? | Anakin Skywalker
Wer schrieb „1984“? | George Orwell
Wer schrieb „Der Herr der Ringe“? | J. R. R. Tolkien
Wer malte „Guernica“? | Pablo Picasso
Wer malte „Die Sternennacht“? | Vincent van Gogh
Wer malte „Das letzte Abendmahl“? | Leonardo da Vinci
Wer komponierte „Die Zauberflöte“? | Wolfgang Amadeus Mozart
Wer komponierte „Die vier Jahreszeiten“? | Antonio Vivaldi
Welches ist das meistverkaufte Album aller Zeiten? | „Thriller“ von Michael Jackson
Welcher Fußballer hat die meisten Länderspieltore? | Cristiano Ronaldo
Wer hat die meisten Tore bei Fußball-Weltmeisterschaften erzielt? | Miroslav Klose (16)
Wer ist deutscher Rekordnationalspieler? | Lothar Matthäus
In welchem Jahr wurde Deutschland zum ersten Mal Weltmeister? | 1954
Wie nennt man den WM-Sieg von 1954? | Das Wunder von Bern
Wer gewann die WM 2006? | Italien
Welcher Verein hat die meisten Champions-League-Titel? | Real Madrid
Welcher Boxer nannte sich „The Greatest“? | Muhammad Ali
Wie viele NBA-Titel gewann Michael Jordan? | 6
In welcher Sportart ist „Love“ ein Spielstand? | Tennis
Wie hoch hängt ein Basketballkorb? | 3,05 Meter
Wofür steht „NASA“? | National Aeronautics and Space Administration
In welchem Jahr wurde Google gegründet? | 1998
In welchem Jahr wurde YouTube gegründet? | 2005
Wie viele Sekunden hat ein Tag? | 86.400
Wer war der zweite Mensch auf dem Mond? | Buzz Aldrin
Wie heißt der Butler von Batman? | Alfred
Unter welcher Adresse wohnt Sherlock Holmes? | Baker Street 221b
Wie heißt der Affe von Pippi Langstrumpf? | Herr Nilsson
Wie heißt das Pferd von Pippi Langstrumpf? | Kleiner Onkel
Wie viele Spieler hat ein Baseball-Team auf dem Feld? | 9
Über wie viele Runden geht ein Box-WM-Kampf der Profis? | 12
Welche Punktzahl hat ein perfektes Bowlingspiel? | 300
Welches Tier hat Fingerabdrücke, die menschlichen sehr ähneln? | Koala
Wie lange dauerte der Dreißigjährige Krieg? | 30 Jahre (1618–1648)
Welches Land schenkte den USA die Freiheitsstatue? | Frankreich
Welches Organ kann sich teilweise selbst nachbilden? | Leber
Welche Farbe hat die Zunge einer Giraffe? | Dunkel – blau-schwarz bis lila
Wer schrieb „Die Verwandlung“? | Franz Kafka
Welches Land nennt man das „Land der aufgehenden Sonne“? | Japan
Welche Stadt wird „Die Ewige Stadt“ genannt? | Rom
Wie heißt der größte Regenwald der Welt? | Amazonas-Regenwald
Wie heißt der lange Gebirgszug in Südamerika? | Anden
Wie viele Herzkammern hat das menschliche Herz? | 2 Kammern (plus 2 Vorhöfe)
Welche Stadt nennt man „Mainhattan“? | Frankfurt am Main
Wie heißt der Fluss, an dem Dresden liegt? | Elbe
Wie heißt die bekannteste Uhr Londons? | Big Ben
Welche Stadt ist für ihre Grachten bekannt? | Amsterdam
Was bedeutet „Carpe diem“? | Nutze den Tag
Wie heißt der größte Hafen Deutschlands? | Hamburger Hafen
`,
  schwer: `
Wie heißt die Hauptstadt von Kasachstan? | Astana
Wie heißt die Hauptstadt von Myanmar? | Naypyidaw
Wie heißt die Hauptstadt von Nigeria? | Abuja
Wie heißt die Hauptstadt von Vietnam? | Hanoi
Wie heißt die Hauptstadt von Pakistan? | Islamabad
Wie heißt die Hauptstadt von Tansania? | Dodoma
Wie heißt die Hauptstadt von Slowenien? | Ljubljana
Wie heißt die Hauptstadt von Litauen? | Vilnius
Wie heißt die Hauptstadt von Lettland? | Riga
Wie heißt die Hauptstadt von Estland? | Tallinn
Wie heißt die Hauptstadt von Kolumbien? | Bogotá
Wie heißt die Hauptstadt von Peru? | Lima
Wie heißt die Hauptstadt von Kenia? | Nairobi
Wie heißt die Hauptstadt von Äthiopien? | Addis Abeba
Wie heißt die Hauptstadt der Mongolei? | Ulaanbaatar
Wie heißt die Hauptstadt von Usbekistan? | Taschkent
Wie heißt die Hauptstadt von Georgien? | Tiflis
Wie heißt die Hauptstadt von Aserbaidschan? | Baku
Wie heißt die Hauptstadt von Liechtenstein? | Vaduz
Wie heißt die Hauptstadt von Malta? | Valletta
Wie heißt die Hauptstadt von Albanien? | Tirana
Wie heißt die Hauptstadt von Bosnien und Herzegowina? | Sarajevo
Wie heißt die Hauptstadt von Nordmazedonien? | Skopje
Wie heißt die Hauptstadt von Kuba? | Havanna
Wie heißt die Hauptstadt von Venezuela? | Caracas
Wie heißt die Hauptstadt von Chile? | Santiago de Chile
Wie heißt die Hauptstadt der Philippinen? | Manila
Wie heißt die Hauptstadt von Indonesien (Stand 2025)? | Jakarta (Umzug nach Nusantara geplant)
Welches chemische Element hat das Symbol „K“? | Kalium
Welches chemische Element hat das Symbol „Pb“? | Blei
Welches chemische Element hat das Symbol „Hg“? | Quecksilber
Welches chemische Element hat das Symbol „W“? | Wolfram
Welches chemische Element hat das Symbol „Sn“? | Zinn
Wie viele Elemente umfasst das Periodensystem derzeit? | 118
Was misst die Einheit Hertz? | Frequenz
Was misst die Einheit Pascal? | Druck
Was misst die Einheit Newton? | Kraft
Was misst die Einheit Joule? | Energie
Wie heißt das ungeladene Teilchen im Atomkern? | Neutron
Wie heißt die Wissenschaft von den Pilzen? | Mykologie
Wer war der erste Bundespräsident? | Theodor Heuss
In welchem Jahr wurde der Euro als Buchgeld eingeführt? | 1999
Wie lange regierte Queen Elizabeth II.? | 70 Jahre (1952–2022)
Welche britische Königin regierte vor Elizabeth II. am längsten? | Queen Victoria
Wie heißt der längste Fluss Asiens? | Jangtsekiang
Welches Land hat die längste Küstenlinie der Welt? | Kanada
In welchem Land liegt Timbuktu? | Mali
In welchem Land liegt Angkor Wat? | Kambodscha
In welchem Land liegt die Felsenstadt Petra? | Jordanien
Wie heißt die tiefste Stelle der Weltmeere? | Marianengraben (Witjas-/Challengertief)
Wie tief ist der Marianengraben ungefähr? | Rund 11.000 Meter
Welcher ist der größte Mond im Sonnensystem? | Ganymed (Jupiter)
Wie heißt der größte Muskel des Menschen? | Großer Gesäßmuskel
Wie heißt der Farbstoff, der die Haut bräunt? | Melanin
Wie viele Augen hat eine Honigbiene? | 5
Welches Säugetier legt Eier und hat einen Entenschnabel? | Schnabeltier
Welcher Vogel hat die größte Flügelspannweite? | Wanderalbatros
Welcher Film gewann als erster nicht-englischsprachiger Film den Oscar als „Bester Film“? | Parasite
Wie viele Oscars gewann „Titanic“? | 11
Wer erfand die Simpsons? | Matt Groening
In welcher Stadt spielt „Breaking Bad“? | Albuquerque
Wie heißt das bekannteste Raumschiff aus „Star Trek“? | USS Enterprise
Wer komponierte die Filmmusik zu „Star Wars“? | John Williams
Wer schrieb „Der kleine Prinz“? | Antoine de Saint-Exupéry
Wer schrieb „Krieg und Frieden“? | Leo Tolstoi
Wer schrieb „Die Physiker“? | Friedrich Dürrenmatt
Wer schrieb „Der Prozess“? | Franz Kafka
Wer hat die meisten Grammys aller Zeiten gewonnen? | Beyoncé
In welcher Stadt fand das WM-Finale 2006 statt? | Berlin
Wer stand 1990 beim WM-Titel im deutschen Tor? | Bodo Illgner
Wer war Teamchef beim WM-Titel 1990? | Franz Beckenbauer
Wie viele Bundesligatore schoss Gerd Müller? | 365
Wie hieß Muhammad Ali ursprünglich? | Cassius Clay
Wie viele Disziplinen hat ein Siebenkampf? | 7
Wie breit ist ein Fußballtor? | 7,32 Meter
Wie hoch ist ein Fußballtor? | 2,44 Meter
Wofür steht „FIFA“? | Fédération Internationale de Football Association
Wofür steht „DNA“? | Desoxyribonukleinsäure (englisch: deoxyribonucleic acid)
Wofür steht „Haribo“? | Hans Riegel Bonn
Woher hat „Adidas“ seinen Namen? | Von Adolf „Adi“ Dassler
Wofür steht „IKEA“? | Ingvar Kamprad Elmtaryd Agunnaryd
Wie hieß Google ursprünglich? | BackRub
Welche Programmiersprache hat eine Kaffeetasse als Logo? | Java
Wie schreibt man die Zahl 5 im Binärsystem? | 101
Was ist 17 × 23? | 391
Wie nennt man eine 1 mit 100 Nullen? | Googol
Wie heißt ein Vieleck mit zwölf Ecken? | Zwölfeck (Dodekagon)
Wofür steht „PDF“? | Portable Document Format
Wofür steht „USB“? | Universal Serial Bus
In welcher Stadt hat Apple seinen Hauptsitz? | Cupertino
Wer entdeckte das Penicillin? | Alexander Fleming
Wer erfand das World Wide Web? | Tim Berners-Lee
Welche Frau flog als erste ins All? | Walentina Tereschkowa
Wie heißt der höchste Wasserfall der Welt? | Salto Ángel (Venezuela)
Wie heißt der größte See Afrikas? | Victoriasee
Wie viele Zeitzonen hat Russland? | 11
Wie viele Monde hat der Mars? | 2 (Phobos und Deimos)
Welches Land hat die meisten Inseln? | Schweden
Wie heißt der höchste Berg Europas? | Elbrus (je nach Grenzziehung)
Welches ist das teuerste Gewürz der Welt? | Safran
Wie viele Kalorien hat ein Gramm Fett ungefähr? | Rund 9 kcal
Ab wie viel Promille begeht man in Deutschland am Steuer immer eine Straftat? | 1,1 Promille
In welchem Jahr kam die erste PlayStation in Japan heraus? | 1994
Wie heißt Bushido mit bürgerlichem Namen? | Anis Mohamed Youssef Ferchichi
Wie heißt MontanaBlack mit bürgerlichem Namen? | Marcel Eris
Wie heißt Knossi mit bürgerlichem Namen? | Jens Knossalla
Wie viele Streifen hat die Flagge der USA? | 13
Wer ist auf dem 1-Dollar-Schein abgebildet? | George Washington
Wie schnell lief Usain Bolt beim 100-m-Weltrekord? | 9,58 Sekunden
Wie hoch ist das Volleyballnetz bei den Männern? | 2,43 Meter
In welchem Jahr zog der Bundestag von Bonn nach Berlin? | 1999
Wie hoch ist die Zugspitze? | 2.962 Meter
Wie heißt der größte See, der komplett in Deutschland liegt? | Müritz
Welcher Planet hat die meisten bekannten Monde? | Saturn
Wie alt ist das Universum ungefähr? | Rund 13,8 Milliarden Jahre
Wie alt ist die Erde ungefähr? | Rund 4,5 Milliarden Jahre
Wie weit ist der Mond durchschnittlich von der Erde entfernt? | Rund 384.000 km
Welcher Stern ist der Sonne am nächsten? | Proxima Centauri
Wie hieß die Mondlandefähre von Apollo 11? | Eagle
Wie heißt Homer Simpsons Vater? | Abraham „Abe“ Simpson
Wie viele Spieler hat ein Rugby-Union-Team auf dem Feld? | 15
Wie viele Weltkriege hat Deutschland gewonnen? | Keinen
Wie heißt der Held in „The Legend of Zelda“? | Link
Wie heißt die Kopfbedeckung eines Bischofs? | Mitra
Was bedeutet das lateinische „Veni, vidi, vici“? | Ich kam, ich sah, ich siegte
Wie heißt das berühmte Tor in München zum Königsplatz? | Propyläen
Welcher Fluss fließt durch Wien? | Donau
Wie heißt der längste Fluss Afrikas? | Nil
Welches Land hat die meisten Pyramiden? | Sudan
Welches Gas macht den größten Teil der Erdatmosphäre aus? | Stickstoff (rund 78 %)
Was ist die chemische Formel von Kohlendioxid? | CO₂
Wie heißt der Erfinder der Glühbirne, der sie massentauglich machte? | Thomas Edison
Wer malte „Die Geburt der Venus“? | Sandro Botticelli
Welcher Komponist wurde taub und komponierte weiter? | Ludwig van Beethoven
Wie heißt die Hauptfigur in „Der Pate“? | Vito Corleone (später Michael Corleone)
Wie heißt der Bösewicht in „Harry Potter“? | Lord Voldemort
Wie heißt Voldemort mit bürgerlichem Namen? | Tom Vorlost Riddle
Welche Nummer trug Michael Jordan bei den Chicago Bulls (meistens)? | 23
In welchem Land wurde Lionel Messi geboren? | Argentinien
Bei welchem Verein begann Cristiano Ronaldo seine Profikarriere? | Sporting Lissabon
Wie viele Spieler stehen beim Eishockey pro Team auf dem Eis? | 6 (inkl. Torwart)
`,
  unmoeglich: `
Wie viele Haare hat ein Mensch durchschnittlich auf dem Kopf? | Rund 100.000
Wie viele Knochen hat ein Baby bei der Geburt ungefähr? | Rund 300
Wie lang ist die Chinesische Mauer mit allen Abschnitten? | Rund 21.000 km
Wie viele Stufen hat der Eiffelturm bis ganz oben? | 1.665
Wie hoch ist der Eiffelturm mit Antenne ungefähr? | Rund 330 Meter
Wie hoch ist der Burj Khalifa? | 828 Meter
In welchem Jahr wurde Coca-Cola erfunden? | 1886
Wie hieß der erste Hund im Erdorbit? | Laika
Wie viele Zeitzonen hat Frankreich inklusive Überseegebiete? | 12
Wie heißt die Hauptstadt von Burkina Faso? | Ouagadougou
Wie heißt die Hauptstadt von Kirgistan? | Bischkek
Wie heißt die Hauptstadt von Tuvalu? | Funafuti
Wie heißt die Hauptstadt von Palau? | Ngerulmud
Wie heißt die Hauptstadt von Suriname? | Paramaribo
Wie heißt die Hauptstadt von Bhutan? | Thimphu
Wie heißt die Hauptstadt der Elfenbeinküste? | Yamoussoukro
Wie heißt die Hauptstadt von Sri Lanka (Regierungssitz)? | Sri Jayawardenepura Kotte
Welche Ordnungszahl hat Gold? | 79
Welche Ordnungszahl hat Eisen? | 26
Welches chemische Element hat das Symbol „Sb“? | Antimon
Wie viele Knochen hat eine menschliche Hand? | 27
Wie lang ist der Darm eines Erwachsenen ungefähr? | Rund 7–8 Meter
Aus wie vielen Flächen besteht ein klassischer Fußball? | 32 (12 Fünfecke, 20 Sechsecke)
Wer erzielte das allererste Tor der Bundesliga-Geschichte? | Timo Konietzka
Wer gewann den ersten Ballon d’Or 1956? | Stanley Matthews
Wie viele Felder hat ein Monopoly-Spielbrett? | 40
Wie hoch ist die Freiheitsstatue ohne Sockel? | Rund 46 Meter
In welchem Jahr wurde die erste SMS verschickt? | 1992
Was stand in der ersten SMS der Welt? | „Merry Christmas“
Wie heißt das erste YouTube-Video? | „Me at the zoo“
In welchem Jahr erschien „Super Mario Bros.“? | 1985
Wie viele Pokémon gab es in der ersten Generation? | 151
Welche Nummer hat Pikachu im Pokédex? | 25
Wie viele Herzschläge macht ein Mensch ungefähr pro Tag? | Rund 100.000
Wie viel Blut pumpt das Herz ungefähr pro Tag? | Rund 7.000 Liter
Wie viele Länder grenzen an China? | 14
Wie viele Staaten sind Mitglied der Vereinten Nationen? | 193
Wie viele Inseln hat Indonesien ungefähr? | Über 17.000
An welchem Tag trat das Grundgesetz in Kraft? | 24. Mai 1949 (verkündet am 23. Mai)
Wie viele Sitze hat der Bundestag nach der Wahlrechtsreform maximal? | 630
Wie heißt der längste Fluss, der komplett in der Schweiz liegt? | Aare
Wo liegt der tiefste Landpunkt Deutschlands? | Neuendorf-Sachsenbande (Schleswig-Holstein, ca. −3,4 m)
Wofür steht „UNESCO“? | United Nations Educational, Scientific and Cultural Organization
Was bedeutet „Audi“ auf Lateinisch? | „Horch!“ (nach Gründer August Horch)
Was bedeutet „LEGO“? | Von dänisch „leg godt“ = spiel gut
Wie viele Länder haben „Guinea“ im Namen? | 4 (Guinea, Guinea-Bissau, Äquatorialguinea, Papua-Neuguinea)
Welcher Berg ist am weitesten vom Erdmittelpunkt entfernt? | Chimborazo (Ecuador)
Wie lange dauert ein Tag auf der Venus? | Rund 243 Erdtage – länger als ihr Jahr
Wie viele Zähne kann eine Schnecke haben? | Tausende (auf der Raspelzunge)
Wie lange dauerte der Hundertjährige Krieg? | 116 Jahre
Wie lautet Mozarts vollständiger Taufname? | Joannes Chrysostomus Wolfgangus Theophilus Mozart
Wie heißt der Kapitän in „Moby Dick“? | Kapitän Ahab
Wer war deutscher Bundeskanzler zwischen Adenauer und Kiesinger? | Ludwig Erhard
Wie viele Dimples hat ein Golfball ungefähr? | Meist 300–400
Wie heißt der längste Fluss Deutschlands nach Länge innerhalb Deutschlands? | Rhein (rund 865 km in Deutschland)
Wie hieß Napoleons Pferd bei Waterloo? | Marengo
In welchem Jahr wurde der erste Big Mac verkauft? | 1967
Welche Blutgruppe ist in Deutschland am häufigsten? | A positiv
Wie viele Muskeln hat der Mensch ungefähr? | Über 600
Wie heißt das kleinste Säugetier der Welt (nach Gewicht)? | Etruskerspitzmaus
Wie viele Mägen hat ein Kamel? | Einen Magen mit drei Kammern
Wie viele Tasten hat eine Standard-Computertastatur (deutsch)? | 105
Wie heißt der Gründer von Samsung? | Lee Byung-chul
Wie heißt die Hauptstadt von Eswatini (Regierungssitz)? | Mbabane
Wie heißt die Hauptstadt von Bolivien laut Verfassung? | Sucre
Wie viele Bundesländer grenzen an Bayern? | 4 (Baden-Württemberg, Hessen, Thüringen, Sachsen)
Wie heißt der Vater von Thor in der Mythologie? | Odin
Wie heißt der griechische Gott des Meeres? | Poseidon
Wie heißt die römische Göttin der Liebe? | Venus
Wie heißt der ägyptische Sonnengott? | Ra
`,
  fang: `
Wie viele Tiere jeder Art nahm Moses mit auf die Arche? | Keine – das war Noah
Was ist schwerer: ein Kilo Federn oder ein Kilo Eisen? | Gleich schwer
Wie viele Monate haben 28 Tage? | Alle 12
Ein Flugzeug stürzt genau auf der Grenze zwischen Deutschland und Österreich ab. Wo werden die Überlebenden begraben? | Gar nicht – Überlebende begräbt man nicht
Welche Farbe hatte Napoleons weißer Schimmel? | Weiß
Ein Hahn legt ein Ei auf die Spitze eines Daches. Auf welche Seite rollt es? | Hähne legen keine Eier
Ein Bauer hat 17 Schafe. Alle bis auf 9 sterben. Wie viele bleiben übrig? | 9
Du überholst im Rennen den Zweiten. Auf welchem Platz bist du jetzt? | Zweiter
Du überholst im Rennen den Letzten. Auf welchem Platz bist du jetzt? | Geht nicht – den Letzten kann man nicht überholen
Ist die Hauptstadt von Australien Sydney oder Melbourne? | Keins von beiden – Canberra
Was ist größer: Bayern oder Österreich? | Österreich
Wie viele Ecken hat ein Kreis? | Keine
Aus welchem Land kommen Panamahüte ursprünglich? | Ecuador
Welche Farbe hat die „Black Box“ im Flugzeug? | Orange
In welchem Monat feiern Russen die Oktoberrevolution? | Im November
Wie viele Beine hat ein Tausendfüßer? | Fast nie 1.000 – meist deutlich weniger
Was war der höchste Berg der Welt, bevor der Mount Everest entdeckt wurde? | Der Mount Everest
Ein Haus hat vier Wände, alle zeigen nach Süden. Ein Bär kommt vorbei. Welche Farbe hat er? | Weiß – Eisbär am Nordpol
Wie viele Löcher hat ein T-Shirt? | 4
Wie viele Buchstaben hat das Wort „Alphabet“? | 8
Welches Wort wird im Duden immer falsch geschrieben? | „falsch“
Was kommt einmal in einer Minute, zweimal in einem Moment, aber nie in tausend Jahren? | Der Buchstabe M
Wie oft kann man 10 von 100 abziehen? | Einmal – danach sind es 90
Was wird nasser, je mehr es trocknet? | Ein Handtuch
Was hat Zeiger, kann aber nicht zeigen, wohin es will? | Eine Uhr
Was hat einen Hals, aber keinen Kopf? | Eine Flasche
Auf dem Tisch liegen drei Äpfel. Du nimmst zwei weg. Wie viele hast du? | Zwei
Ein Arzt gibt dir 3 Tabletten, du sollst alle halbe Stunde eine nehmen. Wie lange reichen sie? | Eine Stunde
5 Eier brauchen 10 Minuten zum Hartkochen. Wie lange brauchen 10 Eier im selben Topf? | 10 Minuten
Woher kommt die Kiwi ursprünglich? | Aus China
Welche Farbe hat die Sonne eigentlich? | Weiß
Was ist die größte Wüste der Welt? | Die Antarktis (größte Heißwüste: Sahara)
Auf welchem Kontinent gibt es gar keine Länder? | Antarktis
Ein Elektrozug fährt nach Norden, der Wind weht nach Süden. Wohin zieht der Rauch? | Ein E-Zug hat keinen Rauch
Ein Mädchen fällt von einer 10-Meter-Leiter und verletzt sich nicht. Wie geht das? | Sie fiel von der untersten Sprosse
Wie viele Buchstaben hat „das Alphabet“? | 11 (das Alphabet selbst hat 26)
Was hat ein Bett, schläft aber nie? | Ein Fluss
Was hat Zähne, kann aber nicht beißen? | Ein Kamm
Was hat Beine, kann aber nicht laufen? | Ein Tisch
Welches Tier am Nordpol frisst gerne Pinguine? | Keins – Pinguine leben am Südpol
Wie viele Beine haben 3 Hühner und 2 Kühe zusammen? | 14
Wo wurde Napoleon geboren? | Auf Korsika (Ajaccio)
War Napoleon besonders klein? | Nein – rund 1,69 m, durchschnittlich für seine Zeit
Haben Kamele Wasser in ihren Höckern? | Nein – Fett
Macht die Farbe Rot Stiere wütend? | Nein – sie reagieren auf die Bewegung
Ist eine Tomate botanisch Obst oder Gemüse? | Eine Frucht (botanisch eine Beere)
Ist eine Erdbeere botanisch eine Beere? | Nein – eine Sammelnussfrucht
Ist eine Banane botanisch eine Beere? | Ja
Kann man die Chinesische Mauer vom Mond aus mit bloßem Auge sehen? | Nein
Nutzen wir nur 10 % unseres Gehirns? | Nein – ein Mythos
Haben Goldfische ein 3-Sekunden-Gedächtnis? | Nein – sie merken sich Dinge über Monate
Woraus besteht die Mine eines Bleistifts? | Graphit (kein Blei)
Du gehst mit einem Streichholz in einen dunklen Raum mit Kerze, Öllampe und Kamin. Was zündest du zuerst an? | Das Streichholz
Wie viele Mägen hat eine Kuh? | Einen – mit vier Kammern (Pansen, Netzmagen, Blättermagen, Labmagen)
Wer hat Tesla gegründet? | Martin Eberhard und Marc Tarpenning – nicht Elon Musk
Ist 91 eine Primzahl? | Nein – 7 × 13
Was ist mehr: ein halbes Dutzend oder sechs? | Gleich viel
Wie heißt der Mond der Erde? | Mond (lateinisch Luna)
Welcher Kontinent liegt in allen vier Erdhalbkugeln? | Afrika
Welches Getränk hat pro Tasse meist mehr Koffein: Espresso oder Filterkaffee? | Filterkaffee (pro Tasse)
Was ist schneller: Licht oder Schall? | Licht
Wie viele Geburtstage hat ein Mensch im Durchschnitt? | Einen – alle anderen sind Jahrestage
Wie viele Erbsen passen in eine leere Tasse? | Eine – danach ist sie nicht mehr leer
Was gehört dir, wird aber von anderen viel öfter benutzt als von dir? | Dein Name
Wie viele Tiere von jeder Art nahm Noah mit auf die Arche? | Zwei (bei manchen Tieren sieben Paare)
Wer liegt im Grab von Kaiser Wilhelm I.? | Wilhelm I.
Wenn es in Deutschland 12 Uhr ist – wie spät ist es dann in Deutschland? | 12 Uhr
Wie viel Erde ist in einem Loch von 1 m × 1 m × 1 m? | Keine – es ist ein Loch
Wie lautet der Vorname von Mr. Spock? | Unbekannt – er hat keinen genannten Vornamen
Wie heißt der Sohn von Zeus und Hera, der Kriegsgott? | Ares
Welches Tier ist das Logo von Lamborghini? | Ein Stier
Welches Tier ist das Logo von Ferrari? | Ein Pferd
Welches Tier ist das Logo von Peugeot? | Ein Löwe
Wo ist das Matterhorn? | Schweiz/Italien (Grenze)
Mit was trinkt man einen Mojito klassisch – Rum oder Wodka? | Rum
Ein Mann ist im Regen ohne Schirm und Hut unterwegs, aber kein Haar auf seinem Kopf wird nass. Warum? | Er hat eine Glatze
Welches Land hat den Döner im Brot erfunden? | Deutschland (Berlin)
Hat eine Schildkröte einen Panzer, aus dem sie herauskriechen kann? | Nein – der Panzer ist mit dem Skelett verwachsen
Kann ein Mensch niesen, während er die Augen offen hat? | Nur sehr schwer – der Reflex schließt sie fast immer
Welcher Ozean ist der kleinste? | Arktischer Ozean (Nordpolarmeer)
Wie lange lebt eine Eintagsfliege? | Als Larve oft 1–3 Jahre, als fertige Fliege nur Stunden bis Tage
`,
};

// In eine Liste umwandeln: [{ q, a, d }]
const QUIZ = (() => {
  const out = [];
  const seen = new Set();
  for (const [d, text] of Object.entries(QUIZ_SOURCE)) {
    for (const line of text.split('\n')) {
      const parts = line.split(' | ');
      if (parts.length < 2) continue;
      const q = parts[0].trim();
      const a = parts[parts.length - 1].trim();
      if (!q || !a || seen.has(q)) continue;
      seen.add(q);
      out.push({ q, a, d });
    }
  }
  return out;
})();
