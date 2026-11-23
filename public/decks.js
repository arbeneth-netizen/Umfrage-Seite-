// Wort-Decks für den Modus "Impostor".
// Jedes Deck hat Gruppen – der Gruppenname dient als Tipp für den Impostor.
const DECK_SOURCE = [
  {
    id: 'influencer', name: 'Influencer', emoji: '📱',
    groups: {
      'YouTuber': 'Rezo, Julien Bam, LeFloid, Gronkh, Paluten, Rewinside, Unge, Simon Desue, Dagi Bee, BibisBeautyPalace, Joey’s Jungle, Kelly MissesVlog, Inscope21, ApoRed, Tanzverbot, Freshtorge, Die Lochis, Liont, Phil Laude, Y-Titty, Marti Fischer, Coldmirror, Sallys Welt, Mr. Beast, PewDiePie, KSI, Logan Paul, Jake Paul, Markiplier, Dude Perfect, Sidemen, Felix von der Laden, Dner, LetsHugo, Taddl, Ardy, Rewi, Zarbex, Concrafter, Kliemannsland, Fynn Kliemann, Mai Thi Nguyen-Kim, Space Frogs, Bullshit TV',
      'Streamer': 'MontanaBlack, Knossi, Trymacs, Papaplatte, HandOfBlood, Elotrix, Rumathra, Stegi, Reved, EliasN97, Mahluna, Sidney, Tolkin, Unsympathisch TV, Zeo, Kai Cenat, IShowSpeed, xQc, Ninja, Adin Ross, Ibai, Pokimane, Shroud, Asmongold, TimTheTatman, Tfue, Sascha Hellinger, NoWay4u, Gnu, Lord Kebun, Dhalucard, Maxim, Bonjwa, Pietsmiet',
      'TikToker': 'Younes Zarou, Twenty4Tim, Lisa und Lena, Khaby Lame, Charli D’Amelio, Addison Rae, Bella Poarch, Zach King, Noah Beck, Dixie D’Amelio, Falco Punch, Spencer X, Brent Rivera, Loren Gray, Michael Le, Avani, Bayashi, CZN Burak, Salish Matter, Alan Chikin Chow, Jason Derulo, Elias Hauck, Ranz und Niek, Hugo Lagos',
      'Insta & Lifestyle': 'Pamela Reif, Caro Daur, Kim Kardashian, Kylie Jenner, Kendall Jenner, Andrew Tate, Leon Machère, Daniela Katzenberger, Sophia Thiel, Karl Ess, Riccardo Simonetti, Stefanie Giesinger, Lena Gercke, Sami Slimani, Paola Maria, Diana zur Löwen, Nikkie Tutorials, James Charles, Huda Kattan, Chris Bumstead, David Goggins, Hamza Ahmed, Iman Gadzhi, Nusret Salt Bae, Sascha Huber, Fitness Oskar',
    },
  },
  {
    id: 'fussballer', name: 'Fußballer', emoji: '⚽',
    groups: {
      'Deutsche Nationalmannschaft': 'Thomas Müller, Manuel Neuer, Joshua Kimmich, Jamal Musiala, Florian Wirtz, Leroy Sané, Serge Gnabry, Antonio Rüdiger, Kai Havertz, Niclas Füllkrug, Marc-André ter Stegen, Leon Goretzka, Jonathan Tah, Nico Schlotterbeck, Robert Andrich, Deniz Undav, Maximilian Mittelstädt, David Raum, Felix Nmecha, Karim Adeyemi, Nick Woltemade, Aleksandar Pavlović, Waldemar Anton, Pascal Groß, Chris Führich, Maximilian Beier, Oliver Baumann, Ridle Baku, Tim Kleindienst, Julian Brandt',
      'Weltstar': 'Lionel Messi, Cristiano Ronaldo, Neymar, Kylian Mbappé, Erling Haaland, Harry Kane, Vinícius Júnior, Jude Bellingham, Robert Lewandowski, Kevin De Bruyne, Mohamed Salah, Luka Modrić, Karim Benzema, Antoine Griezmann, Lamine Yamal, Pedri, Rodri, Bukayo Saka, Phil Foden, Cole Palmer, Federico Valverde, Victor Osimhen, Son Heung-min, Khvicha Kvaratskhelia, Lautaro Martínez, Rafael Leão, Virgil van Dijk, Alisson, Thibaut Courtois, Martin Ødegaard, Declan Rice, Achraf Hakimi, Ousmane Dembélé, Raphinha, Jérémy Doku, Rodrygo, Julián Álvarez, Bruno Fernandes, Marcus Rashford, Jadon Sancho, Darwin Núñez, Alexander Isak, Viktor Gyökeres, Michael Olise, João Neves',
      'Legende': 'Pelé, Diego Maradona, Zinédine Zidane, Ronaldinho, Ronaldo Nazário, Franz Beckenbauer, Gerd Müller, Lothar Matthäus, Oliver Kahn, Miroslav Klose, Michael Ballack, Philipp Lahm, Bastian Schweinsteiger, Toni Kroos, İlkay Gündoğan, Mesut Özil, Marco Reus, Mats Hummels, Thierry Henry, Kaká, Johan Cruyff, Paolo Maldini, Andrea Pirlo, Andrés Iniesta, Xavi, Gianluigi Buffon, Zlatan Ibrahimović, Wayne Rooney, David Beckham, Steven Gerrard, Frank Lampard, Rudi Völler, Jürgen Klinsmann, Arjen Robben, Franck Ribéry, Iker Casillas, Sergio Ramos, Carles Puyol, Didier Drogba, Samuel Eto’o, Eric Cantona, Roberto Carlos, Rivaldo, Luís Figo, Francesco Totti, Alessandro Del Piero, Gareth Bale, Sergio Agüero, Luis Suárez, Per Mertesacker, Jérôme Boateng, Mario Götze, Lukas Podolski',
      'Trainer': 'Jürgen Klopp, Pep Guardiola, Carlo Ancelotti, José Mourinho, Julian Nagelsmann, Thomas Tuchel, Xabi Alonso, Hansi Flick, Joachim Löw, Diego Simeone, Mikel Arteta, Jupp Heynckes, Ralf Rangnick, Otto Rehhagel, Christoph Daum, Felix Magath, Vincent Kompany, Arne Slot, Luis Enrique, Arsène Wenger, Alex Ferguson, Unai Emery, Antonio Conte, Mauricio Pochettino, Erik ten Hag, Niko Kovač, Edin Terzić, Oliver Glasner, Sebastian Hoeneß',
    },
  },
  {
    id: 'orte', name: 'Orte', emoji: '📍',
    groups: {
      'Im Alltag': 'Supermarkt, Bäckerei, Tankstelle, Bahnhof, Bushaltestelle, Apotheke, Postfiliale, Bank, Friseur, Waschsalon, Kiosk, Späti, Parkhaus, Arztpraxis, Zahnarzt, Rathaus, Bibliothek, Schule, Uni, Büro, Baumarkt, IKEA, Kirche, Moschee, Friedhof, Krankenhaus, Polizeiwache, Gefängnis, Gericht, Fahrschule, Kita, Altenheim, Autowerkstatt, Waschstraße, Wertstoffhof, Drogerie, Handyladen, Shoppingcenter, Wochenmarkt, Treppenhaus, Keller, Dachboden, Garage, Balkon',
      'Freizeit': 'Kino, Freibad, Hallenbad, Fitnessstudio, Club, Bar, Shisha-Bar, Bowlingbahn, Freizeitpark, Zoo, Stadion, Kabine, Sportplatz, Spielhalle, Casino, Restaurant, McDonald’s, Dönerladen, Theater, Museum, Konzert, Festival, Escape Room, Kartbahn, Kletterhalle, Trampolinpark, Sauna, Therme, Minigolf, Paintball-Halle, Kirmes, Weihnachtsmarkt, Oktoberfest, Ballermann, Karaoke-Bar, Tattoostudio, Barbershop, Nagelstudio, Wettbüro, Billardhalle, Skatepark, Bolzplatz, Grillplatz, Hochzeit, Abschlussball',
      'Natur & Reise': 'Strand, Berg, Wald, See, Wüste, Dschungel, Insel, Höhle, Vulkan, Wasserfall, Gletscher, Campingplatz, Flughafen, Hotel, Kreuzfahrtschiff, Jugendherberge, Raststätte, Skihütte, Bauernhof, Leuchtturm, Hafen, Autobahn, Grenzkontrolle, Safari, Regenwald, Nordsee, Ostsee, Alpen, Weinberg, Schrebergarten, Zeltlager, Nachtzug, Fähre, Wohnmobil, Hängebrücke, Steinbruch',
      'Besonderer Ort': 'Raumstation, U-Boot, Weißes Haus, Buckingham Palace, Eiffelturm, Pyramiden, Kolosseum, Freiheitsstatue, Chinesische Mauer, Vatikan, Area 51, Titanic, Bundestag, Alcatraz, Mount Everest, Nordpol, Mond, Las Vegas Strip, Hollywood, Disneyland, Burj Khalifa, Brandenburger Tor, Neuschwanstein, Stonehenge, Machu Picchu, Taj Mahal, Akropolis, Atlantis, Bermuda-Dreieck, Tschernobyl, Wembley, Camp Nou, Signal Iduna Park, Allianz Arena, Hogwarts, Mordor, Gotham City',
    },
  },
  {
    id: 'laender', name: 'Länder', emoji: '🌍',
    groups: {
      'Europa': 'Deutschland, Frankreich, Spanien, Italien, Portugal, England, Schottland, Irland, Niederlande, Belgien, Luxemburg, Schweiz, Österreich, Polen, Tschechien, Slowakei, Ungarn, Rumänien, Bulgarien, Griechenland, Türkei, Kroatien, Serbien, Bosnien, Albanien, Kosovo, Nordmazedonien, Montenegro, Slowenien, Dänemark, Schweden, Norwegen, Finnland, Island, Estland, Lettland, Litauen, Ukraine, Russland, Belarus, Moldau, Malta, Zypern, Monaco, Liechtenstein, Andorra, San Marino, Vatikanstadt',
      'Asien': 'China, Japan, Südkorea, Nordkorea, Indien, Pakistan, Afghanistan, Iran, Irak, Syrien, Libanon, Israel, Jordanien, Saudi-Arabien, Katar, Vereinigte Arabische Emirate, Kuwait, Oman, Jemen, Thailand, Vietnam, Kambodscha, Laos, Myanmar, Malaysia, Singapur, Indonesien, Philippinen, Mongolei, Kasachstan, Usbekistan, Georgien, Armenien, Aserbaidschan, Nepal, Bangladesch, Sri Lanka, Malediven, Bhutan, Taiwan',
      'Afrika': 'Ägypten, Marokko, Algerien, Tunesien, Libyen, Nigeria, Ghana, Senegal, Elfenbeinküste, Kamerun, Kenia, Tansania, Uganda, Äthiopien, Somalia, Sudan, Südafrika, Namibia, Botswana, Simbabwe, Sambia, Angola, Kongo, Madagaskar, Mali, Ruanda, Mosambik, Tschad, Niger, Gambia, Kap Verde, Mauritius, Eritrea, Burkina Faso, Guinea',
      'Amerika': 'USA, Kanada, Mexiko, Brasilien, Argentinien, Kolumbien, Chile, Peru, Venezuela, Ecuador, Bolivien, Paraguay, Uruguay, Kuba, Jamaika, Dominikanische Republik, Haiti, Puerto Rico, Costa Rica, Panama, Guatemala, Honduras, El Salvador, Nicaragua, Bahamas, Trinidad und Tobago, Barbados, Grönland',
      'Ozeanien': 'Australien, Neuseeland, Fidschi, Papua-Neuguinea, Samoa, Tonga, Hawaii, Tahiti',
    },
  },
  {
    id: 'staedte', name: 'Städte', emoji: '🏙️',
    groups: {
      'Deutschland': 'Berlin, Hamburg, München, Köln, Frankfurt, Stuttgart, Düsseldorf, Dortmund, Essen, Leipzig, Bremen, Dresden, Hannover, Nürnberg, Duisburg, Bochum, Wuppertal, Bielefeld, Bonn, Münster, Mannheim, Karlsruhe, Augsburg, Wiesbaden, Mönchengladbach, Gelsenkirchen, Aachen, Kiel, Rostock, Freiburg, Heidelberg, Mainz, Regensburg, Würzburg, Kassel, Saarbrücken, Erfurt, Magdeburg, Potsdam, Lübeck, Ulm, Wolfsburg, Paderborn, Osnabrück, Oldenburg, Trier, Koblenz, Ingolstadt, Göttingen, Flensburg',
      'Europa': 'Paris, London, Rom, Madrid, Barcelona, Amsterdam, Wien, Zürich, Prag, Budapest, Warschau, Istanbul, Athen, Lissabon, Dublin, Brüssel, Kopenhagen, Stockholm, Oslo, Helsinki, Moskau, Kiew, Mailand, Venedig, Neapel, Marseille, Manchester, Liverpool, Edinburgh, Belgrad, Zagreb, Split, Dubrovnik, Sofia, Bukarest, Krakau, Palma, Ibiza, Nizza, Monaco, Porto, Sevilla, Valencia, Florenz, Salzburg, Genf, Antalya, Pristina, Sarajevo, Tirana',
      'Welt': 'New York, Los Angeles, Las Vegas, Miami, Chicago, San Francisco, Toronto, Mexiko-Stadt, Rio de Janeiro, São Paulo, Buenos Aires, Dubai, Abu Dhabi, Doha, Tokio, Seoul, Peking, Shanghai, Hongkong, Bangkok, Singapur, Mumbai, Neu-Delhi, Sydney, Melbourne, Kapstadt, Kairo, Marrakesch, Lagos, Nairobi, Teheran, Riad, Mekka, Jerusalem, Havanna, Bogotá, Lima, Kuala Lumpur, Jakarta, Manila, Ho-Chi-Minh-Stadt, Washington, Boston, Atlanta, Vancouver',
    },
  },
  {
    id: 'essen', name: 'Essen & Trinken', emoji: '🍔',
    groups: {
      'Fast Food': 'Döner, Pizza, Burger, Pommes, Currywurst, Hotdog, Chicken Nuggets, Dürüm, Lahmacun, Falafel, Big Mac, Chicken Wings, Tacos, Burrito, Nachos, Frühlingsrolle, Gyros, Pita, Hähnchen-Döner, Pide, Smash Burger, Mozzarella-Sticks, Onion Rings, Sandwich, Wrap, Toast Hawaii, Bami Goreng, Ente süß-sauer',
      'Hausmannskost': 'Schnitzel, Spätzle, Kartoffelsalat, Bratwurst, Leberkäse, Sauerkraut, Rouladen, Gulasch, Frikadelle, Kohlrouladen, Linsensuppe, Schweinshaxe, Maultaschen, Reibekuchen, Bratkartoffeln, Kartoffelpüree, Spiegelei, Rührei, Erbsensuppe, Fischstäbchen, Königsberger Klopse, Grünkohl, Labskaus, Käsespätzle, Weißwurst, Brezel, Mettbrötchen, Leberwurst, Sauerbraten, Eintopf',
      'International': 'Sushi, Ramen, Paella, Lasagne, Spaghetti Bolognese, Carbonara, Risotto, Curry, Pad Thai, Dim Sum, Peking-Ente, Tapas, Moussaka, Couscous, Shakshuka, Börek, Manti, Biryani, Pho, Bibimbap, Fajitas, Quesadilla, Ceviche, Croissant, Baguette, Fondue, Raclette, Köfte, Cevapcici, Pierogi, Tikka Masala, Hummus, Poke Bowl, Gnocchi, Kebab-Spieß, Dolma, Pastel de Nata',
      'Süßes': 'Schokolade, Gummibärchen, Eis, Waffeln, Pfannkuchen, Crêpes, Donut, Muffin, Käsekuchen, Tiramisu, Baklava, Schwarzwälder Kirschtorte, Apfelstrudel, Berliner, Nutella, Kinder Bueno, Snickers, Popcorn, Zuckerwatte, Brownie, Cookie, Churros, Lebkuchen, Marzipan, Milchreis, Pudding, Macarons, Künefe, Lutscher, Kaugummi, Dubai-Schokolade',
      'Getränk': 'Bier, Wein, Sekt, Wodka, Jägermeister, Tequila, Rum, Whisky, Gin Tonic, Aperol Spritz, Mojito, Cola, Fanta, Sprite, Red Bull, Monster, Eistee, Kaffee, Espresso, Cappuccino, Tee, Ayran, Kakao, Apfelschorle, Wasser, Milch, Smoothie, Bubble Tea, Club Mate, Radler, Cuba Libre, Sex on the Beach, Raki, Ouzo, Glühwein, Proteinshake',
    },
  },
  {
    id: 'tiere', name: 'Tiere', emoji: '🦁',
    groups: {
      'Haustier': 'Hund, Katze, Hamster, Meerschweinchen, Kaninchen, Wellensittich, Goldfisch, Schildkröte, Papagei, Pferd, Chinchilla, Frettchen, Ratte, Maus, Kanarienvogel, Axolotl, Bartagame, Rennmaus',
      'Bauernhof': 'Kuh, Schwein, Schaf, Ziege, Huhn, Hahn, Ente, Gans, Esel, Truthahn, Alpaka, Lama, Pony, Stier, Kalb, Ferkel',
      'Wildnis': 'Löwe, Tiger, Elefant, Giraffe, Zebra, Nashorn, Nilpferd, Gorilla, Schimpanse, Affe, Krokodil, Gepard, Leopard, Hyäne, Bär, Eisbär, Panda, Koala, Känguru, Wolf, Fuchs, Hirsch, Reh, Wildschwein, Elch, Kamel, Faultier, Waschbär, Eichhörnchen, Igel, Biber, Dachs, Stinktier, Luchs, Puma, Bison, Gnu, Erdmännchen, Lemur, Orang-Utan',
      'Meer': 'Hai, Wal, Delfin, Orca, Oktopus, Qualle, Robbe, Seehund, Pinguin, Seestern, Krabbe, Hummer, Meeresschildkröte, Rochen, Thunfisch, Seepferdchen, Muschel, Clownfisch, Kugelfisch, Walross, Seekuh, Tintenfisch, Barrakuda, Piranha',
      'Vogel': 'Adler, Falke, Eule, Taube, Möwe, Spatz, Rabe, Flamingo, Strauß, Pfau, Storch, Schwan, Specht, Kolibri, Geier, Tukan, Amsel, Kranich, Pelikan, Kakadu',
      'Kleintier': 'Spinne, Ameise, Biene, Wespe, Mücke, Fliege, Schmetterling, Marienkäfer, Schnecke, Regenwurm, Kakerlake, Skorpion, Schlange, Eidechse, Frosch, Fledermaus, Zecke, Heuschrecke, Glühwürmchen, Hornisse, Libelle, Tausendfüßler, Chamäleon, Kröte',
    },
  },
  {
    id: 'promis', name: 'Promis', emoji: '⭐',
    groups: {
      'Musik': 'Drake, Rihanna, Beyoncé, Taylor Swift, Eminem, Kanye West, Justin Bieber, Ed Sheeran, The Weeknd, Bad Bunny, Travis Scott, Billie Eilish, Ariana Grande, Snoop Dogg, 50 Cent, Lady Gaga, Bruno Mars, Dua Lipa, Michael Jackson, Elvis Presley, Shakira, Jennifer Lopez, Post Malone, Tupac, Kendrick Lamar, Doja Cat, Helene Fischer, Herbert Grönemeyer, Udo Lindenberg, Mark Forster, Lena, Nicki Minaj, Cardi B, Future, Playboi Carti, Freddie Mercury, Madonna, Adele, Harry Styles, Sabrina Carpenter',
      'Schauspieler': 'Leonardo DiCaprio, Brad Pitt, Tom Cruise, Will Smith, Dwayne Johnson, Johnny Depp, Keanu Reeves, Jason Statham, Vin Diesel, Ryan Reynolds, Ryan Gosling, Margot Robbie, Scarlett Johansson, Zendaya, Tom Holland, Robert Downey Jr., Morgan Freeman, Denzel Washington, Jackie Chan, Arnold Schwarzenegger, Sylvester Stallone, Adam Sandler, Jim Carrey, Til Schweiger, Elyas M’Barek, Matthias Schweighöfer, Cillian Murphy, Timothée Chalamet, Pedro Pascal, Angelina Jolie, Jennifer Aniston, Kevin Hart, Samuel L. Jackson, Al Pacino, Robert De Niro, Christian Bale, Heath Ledger, Charlie Chaplin, Mr. Bean, Hugh Jackman',
      'Deutsches TV': 'Stefan Raab, Joko Winterscheidt, Klaas Heufer-Umlauf, Dieter Bohlen, Heidi Klum, Thomas Gottschalk, Günther Jauch, Jan Böhmermann, Barbara Schöneberger, Oliver Pocher, Carmen Geiss, Robert Geiss, Mario Barth, Atze Schröder, Bülent Ceylan, Kaya Yanar, Hape Kerkeling, Bastian Pastewka, Michael Bully Herbig, Luke Mockridge, Felix Lobrecht, Tommi Schmitt, Markus Lanz, Sonja Zietlow, Daniel Hartwich, Frank Rosin, Tim Mälzer, Horst Lichter, Peter Zwegat, Detlef D! Soost',
      'Sport': 'Michael Schumacher, Lewis Hamilton, Max Verstappen, Sebastian Vettel, LeBron James, Michael Jordan, Kobe Bryant, Dirk Nowitzki, Stephen Curry, Usain Bolt, Roger Federer, Rafael Nadal, Novak Djokovic, Serena Williams, Tiger Woods, Mike Tyson, Muhammad Ali, Conor McGregor, Khabib Nurmagomedov, Wladimir Klitschko, Boris Becker, Tom Brady, Tyson Fury, Alexander Zverev, Dennis Schröder, Franz Wagner, Michael Phelps, Simone Biles, Mick Schumacher, Anthony Joshua',
      'Geschichte & Politik': 'Elon Musk, Mark Zuckerberg, Jeff Bezos, Bill Gates, Steve Jobs, Donald Trump, Barack Obama, Angela Merkel, Olaf Scholz, Friedrich Merz, Wladimir Putin, Emmanuel Macron, Papst Franziskus, King Charles, Queen Elizabeth, Joe Biden, Kim Jong-un, Albert Einstein, Napoleon, Julius Caesar, Kleopatra, Mozart, Beethoven, Picasso, Shakespeare, Goethe, Martin Luther King, Nelson Mandela, Gandhi, Abraham Lincoln, Christoph Kolumbus, Leonardo da Vinci, Isaac Newton, Marie Curie, Karl Marx, Otto von Bismarck',
    },
  },
  {
    id: 'deutschrap', name: 'Deutschrap', emoji: '🎤',
    groups: {
      'Straßenrap': 'Capital Bra, Bushido, Haftbefehl, Gzuz, Bonez MC, 187 Strassenbande, RAF Camora, Samra, Summer Cem, KC Rebell, Xatar, Fler, Farid Bang, Kollegah, Massiv, Veysel, Azet, Zuna, Nimo, Celo & Abdi, Olexesh, Kurdo, Mero, Dardan, Fard, Jalil, Sinan-G, Manuellsen, Luciano, Ufo361, Pashanim, Majoe, Sido, Eko Fresh, Kontra K, Hanybal, Maxwell, Bozza',
      'Pop & Melodie': 'Apache 207, Cro, Marteria, Casper, Peter Fox, Ski Aggu, Bausa, Trettmann, Yung Hurn, makko, Zartmann, Reezy, Shindy, Kay One, Clueso, Kayef, Fourty, Kalim, Miksu, Macloud, Badchieff, Sierra Kidd, Dante YN, Paula Hartmann, Nina Chuba, Provinz',
      'Rapperin': 'Shirin David, Loredana, Badmómzjay, Juju, Katja Krasavice, Nura, Eunique, Haiyti, Ikkimel, Liz, Schwesta Ewa, Kitty Kat, Lisaholic, Hava, Layla',
      'Old School & Kult': 'Kool Savas, Samy Deluxe, Die Fantastischen Vier, Fettes Brot, Deichkind, Absolute Beginner, Jan Delay, Azad, Curse, Torch, Moses Pelham, Money Boy, K.I.Z, Prinz Pi, Bass Sultan Hengzt, Alligatoah, Orsons, Materia, Chakuza, Raf 3.0, Tua',
    },
  },
  {
    id: 'marken', name: 'Marken', emoji: '🏷️',
    groups: {
      'Autos': 'BMW, Mercedes, Audi, VW, Porsche, Ferrari, Lamborghini, Tesla, Opel, Ford, Toyota, Bugatti, Rolls-Royce, Bentley, Maserati, Fiat, Skoda, Seat, Cupra, Renault, Peugeot, Kia, Hyundai, Volvo, Mini, Smart, Dacia, Jeep, Land Rover, McLaren, Aston Martin, Alfa Romeo, Nissan, Honda, Mazda, Citroën, BYD, Harley-Davidson, Ducati, Vespa',
      'Mode': 'Nike, Adidas, Puma, Gucci, Louis Vuitton, Prada, Balenciaga, Supreme, The North Face, Moncler, Stone Island, Lacoste, Ralph Lauren, Tommy Hilfiger, Calvin Klein, Hugo Boss, Zara, H&M, Primark, Levi’s, Jordan, New Balance, Vans, Converse, Off-White, Versace, Dior, Chanel, Hermès, Trapstar, Corteiz, Carhartt, Under Armour, Champion, Fila, Rolex, Ray-Ban, Crocs, Birkenstock, Timberland',
      'Tech & Apps': 'Apple, Samsung, Google, Microsoft, Sony, PlayStation, Xbox, Nintendo, Netflix, Spotify, Amazon, Instagram, TikTok, Snapchat, WhatsApp, YouTube, Twitch, Discord, Meta, Huawei, Xiaomi, JBL, Beats, Bose, Dyson, ChatGPT, Uber, Airbnb, PayPal, Tinder, Telegram, X (Twitter), Disney+, Temu, Shein',
      'Essen & Shops': 'McDonald’s, Burger King, KFC, Subway, Starbucks, Coca-Cola, Pepsi, Red Bull, Haribo, Nutella, Milka, Kinder, Lidl, Aldi, Rewe, Edeka, Kaufland, dm, Rossmann, IKEA, MediaMarkt, Saturn, Zalando, eBay, Lieferando, Dominos, Pizza Hut, Five Guys, Vapiano, Nordsee, Dunkin’ Donuts, Kinder Pingui, Pringles, Lay’s, Doritos, Oreo, Capri-Sun, Ferrero Rocher',
    },
  },
  {
    id: 'berufe', name: 'Berufe', emoji: '👷',
    groups: {
      'Handwerk & Alltag': 'Polizist, Feuerwehrmann, Arzt, Krankenpfleger, Lehrer, Bäcker, Metzger, Friseur, Koch, Kellner, Elektriker, Klempner, Maurer, Dachdecker, Schreiner, Maler, Mechaniker, Busfahrer, LKW-Fahrer, Taxifahrer, Postbote, Paketbote, Verkäufer, Kassierer, Müllmann, Hausmeister, Gärtner, Bauer, Tierarzt, Zahnarzt, Apotheker, Erzieher, Fliesenleger, Schornsteinfeger, Optiker, Sanitäter, Lokführer, Gabelstaplerfahrer',
      'Büro & Studium': 'Anwalt, Richter, Steuerberater, Banker, Versicherungsvertreter, Programmierer, Ingenieur, Architekt, Manager, Sekretär, Journalist, Immobilienmakler, Personaler, Unternehmensberater, Buchhalter, Professor, Wissenschaftler, Psychologe, Chirurg, Notar, Callcenter-Agent, Grafikdesigner, Social-Media-Manager, Data Scientist, Politiker, Diplomat',
      'Besonderer Job': 'Astronaut, Pilot, Flugbegleiter, Kapitän, Soldat, Spion, Detektiv, Bestatter, Zauberer, Clown, Schauspieler, Model, DJ, Türsteher, Bodyguard, Stuntman, Influencer, Profifußballer, Schiedsrichter, Fitnesstrainer, Tätowierer, Barkeeper, Tierpfleger, Zirkusdirektor, Priester, Imam, Hebamme, Förster, Jäger, Fischer, Bergmann, Rettungsschwimmer, Croupier, Sommelier, Kammerjäger, Hufschmied, Taucher, Bombenentschärfer, Gefängniswärter, Wahrsager',
    },
  },
  {
    id: 'filme', name: 'Filme & Serien', emoji: '🎬',
    groups: {
      'Serie': 'Breaking Bad, Game of Thrones, Stranger Things, The Walking Dead, Prison Break, Peaky Blinders, Haus des Geldes, Squid Game, Dark, Narcos, Vikings, The Office, Friends, How I Met Your Mother, Die Simpsons, South Park, Family Guy, Rick and Morty, The Boys, Better Call Saul, Suits, The Witcher, Wednesday, Dexter, Sons of Anarchy, 4 Blocks, Bridgerton, The Crown, Die Sopranos, Top Boy, House of the Dragon, The Last of Us, Two and a Half Men, The Big Bang Theory, Brooklyn Nine-Nine, Modern Family, Lost, Sherlock, Black Mirror, Euphoria, You, Tatort, GZSZ, Berlin – Tag & Nacht, Dschungelcamp, Love Island, Germany’s Next Topmodel, Der Bachelor',
      'Anime & Cartoon': 'One Piece, Naruto, Dragon Ball, Attack on Titan, Death Note, Demon Slayer, Jujutsu Kaisen, Pokémon, Yu-Gi-Oh!, Digimon, SpongeBob, Tom und Jerry, Avatar – Der Herr der Elemente, Sailor Moon, Hunter x Hunter, My Hero Academia, Detektiv Conan, Captain Tsubasa, Die Schlümpfe, Scooby-Doo, Phineas und Ferb, Futurama, Biene Maja, Heidi',
      'Film': 'Titanic, Avatar, Der Pate, Scarface, Fast & Furious, Harry Potter, Herr der Ringe, Star Wars, Matrix, Inception, Interstellar, Joker, The Dark Knight, Avengers, Spider-Man, Iron Man, Batman, Fluch der Karibik, Jurassic Park, Der König der Löwen, Shrek, Findet Nemo, Toy Story, Die Eiskönigin, Rocky, Creed, Gladiator, The Wolf of Wall Street, Hangover, Kevin – Allein zu Haus, John Wick, James Bond, Mission: Impossible, Top Gun, Transformers, Barbie, Oppenheimer, Fack ju Göhte, Der Schuh des Manitu, Keinohrhasen, Ziemlich beste Freunde, Saw, Es, Scream, Terminator, Rambo, Alien, Der weiße Hai, Forrest Gump, Pulp Fiction, Fight Club, Django Unchained, Inglourious Basterds, Minions, Cars, Madagascar',
    },
  },
  {
    id: 'sport', name: 'Sportarten', emoji: '🏆',
    groups: {
      'Ballsport': 'Fußball, Basketball, Handball, Volleyball, Tennis, Tischtennis, Badminton, Golf, American Football, Rugby, Baseball, Eishockey, Hockey, Wasserball, Beachvolleyball, Squash, Padel, Cricket, Billard, Bowling, Minigolf, Völkerball, Futsal, Fußballgolf, Lacrosse, Polo, Footvolley, Kegeln',
      'Kampfsport': 'Boxen, MMA, Ringen, Judo, Karate, Taekwondo, Kickboxen, Muay Thai, Fechten, Sumo, Wrestling, Jiu-Jitsu, Krav Maga, Kung Fu, Capoeira, Aikido, Bogenschießen',
      'Ausdauer & Extrem': 'Schwimmen, Leichtathletik, Marathon, Radfahren, Mountainbike, Formel 1, Motocross, Skifahren, Snowboarden, Skispringen, Eiskunstlauf, Surfen, Skateboarden, Klettern, Bouldern, Turnen, Gewichtheben, Bodybuilding, CrossFit, Yoga, Rudern, Kanu, Segeln, Reiten, Triathlon, Bobfahren, Biathlon, Parkour, Fallschirmspringen, Bungee-Jumping, Kitesurfen, Wakeboarden, Langlauf, Calisthenics',
      'Spiel & Denksport': 'Darts, Schach, E-Sport, Angeln, Poker, Tischkicker, Beer Pong, Flunkyball, Cornhole, Boule, Curling, Air Hockey, Sackhüpfen, Tauziehen, Armdrücken, Speedcubing',
    },
  },
  {
    id: 'gegenstaende', name: 'Gegenstände', emoji: '🧰',
    groups: {
      'Küche': 'Kühlschrank, Mikrowelle, Toaster, Wasserkocher, Kaffeemaschine, Pfanne, Kochtopf, Messer, Gabel, Löffel, Teller, Schneidebrett, Spülmaschine, Backofen, Mixer, Airfryer, Dosenöffner, Korkenzieher, Nudelholz, Thermomix, Sandwichmaker, Waffeleisen, Eiswürfelform, Schneebesen, Reibe, Tupperdose',
      'Bad': 'Zahnbürste, Zahnpasta, Handtuch, Dusche, Badewanne, Toilette, Klopapier, Föhn, Rasierer, Deo, Parfüm, Spiegel, Shampoo, Seife, Kamm, Waage, Wattestäbchen, Glätteisen, Pinzette, Nagelknipser, Bademantel, Duschvorhang, Pömpel',
      'Wohnung': 'Sofa, Fernseher, Fernbedienung, Teppich, Lampe, Bett, Kissen, Bettdecke, Kleiderschrank, Stuhl, Esstisch, Bücherregal, Vorhang, Wecker, Ventilator, Heizung, Staubsauger, Bügeleisen, Kerze, Bilderrahmen, Sitzsack, Hängematte, Rauchmelder, Türklingel, Schuhregal, Waschmaschine, Wäscheständer, Mülleimer, Klimaanlage, Gaming-Stuhl',
      'Technik': 'Handy, Laptop, Kopfhörer, Ladekabel, Powerbank, Spielkonsole, Controller, Tablet, Smartwatch, Kamera, Drohne, Bluetooth-Box, Computermaus, Tastatur, Bildschirm, Drucker, Router, USB-Stick, VR-Brille, E-Scooter, Taschenrechner, Mikrofon, Beamer, Taschenlampe, Batterie, AirPods, Ringlicht',
      'Unterwegs': 'Rucksack, Portemonnaie, Schlüssel, Sonnenbrille, Regenschirm, Armbanduhr, Cap, Koffer, Trinkflasche, Feuerzeug, Kaugummi, Personalausweis, Führerschein, Fahrrad, Skateboard, Helm, Sporttasche, Fußball, Trikot, Schienbeinschoner, Fußballschuhe, Trillerpfeife, Zelt, Schlafsack, Kompass, Fernglas, Bauchtasche, Thermoskanne, Vape, Kondom',
    },
  },
  {
    id: 'games', name: 'Videospiele', emoji: '🎮',
    groups: {
      'Shooter': 'Call of Duty, Fortnite, Valorant, Counter-Strike, Apex Legends, Overwatch, Rainbow Six Siege, Battlefield, PUBG, Halo, Doom, Far Cry, Destiny, Escape from Tarkov, Warzone, Borderlands, Team Fortress 2',
      'Sport & Racing': 'EA FC, FIFA, PES, Rocket League, NBA 2K, Madden, Gran Turismo, Need for Speed, Forza, Mario Kart, F1, Tony Hawk’s Pro Skater, Wii Sports, Trackmania, Golf mit Freunden',
      'Open World & Story': 'GTA V, GTA VI, Red Dead Redemption, The Witcher 3, Elden Ring, Dark Souls, God of War, The Last of Us, Uncharted, Assassin’s Creed, Cyberpunk 2077, Skyrim, Hogwarts Legacy, Zelda, Spider-Man (Spiel), Batman Arkham, Ghost of Tsushima, Horizon, Fallout, Minecraft, Terraria, Rust, ARK, DayZ, Palworld',
      'Handy-Spiel': 'Clash Royale, Clash of Clans, Brawl Stars, Subway Surfers, Candy Crush, Angry Birds, Pokémon Go, Hay Day, Geometry Dash, Among Us, Fruit Ninja, Temple Run, Flappy Bird, Doodle Jump, Stumble Guys, Coin Master, Plants vs. Zombies, Cut the Rope, 8 Ball Pool, Roblox',
      'Klassiker': 'Tetris, Pac-Man, Super Mario, Sonic, Crash Bandicoot, Spyro, Rayman, Pokémon, Street Fighter, Tekken, Mortal Kombat, Smash Bros, Die Sims, World of Warcraft, League of Legends, Age of Empires, Command & Conquer, Resident Evil, Silent Hill, Metal Gear Solid, Donkey Kong, Space Invaders, Animal Crossing, Fall Guys, Guitar Hero, SingStar, Just Dance',
    },
  },
];

// In flache Listen umwandeln: [{ w: Wort, h: Gruppe }]
const DECKS = DECK_SOURCE.map((d) => {
  const seen = new Set();
  const words = [];
  for (const [h, list] of Object.entries(d.groups)) {
    for (const raw of list.split(',')) {
      const w = raw.trim();
      if (!w || seen.has(w.toLowerCase())) continue;
      seen.add(w.toLowerCase());
      words.push({ w, h });
    }
  }
  return { id: d.id, name: d.name, emoji: d.emoji, words };
});
