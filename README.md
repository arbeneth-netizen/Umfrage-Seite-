# Anonyme Abstimmung – „Wer würde am ehesten …?“

Live-Abstimmungsspiel für die Gruppe: Du richtest Überschrift, Namen und Fragen ein,
startest die Lobby, alle scannen den QR-Code und stimmen anonym am Handy ab.
Nach jeder Frage gibt es ein Kreisdiagramm und eine Liste, wer wie viele Stimmen bekommen hat.

## So läuft ein Spiel

1. Startseite öffnen (`/`) – das ist deine Host-Ansicht (am besten auf Laptop/TV).
2. **Überschrift** eintragen.
3. **Namen** eintragen (jeder Name bekommt automatisch eine eigene Farbe).
4. **Fragen** auswählen: Vorschläge anhaken, eigene Fragen eintragen, Reihenfolge anpassen.
   Alles wird im Browser gespeichert – beim nächsten Mal ist es noch da.
5. **Lobby starten** → QR-Code erscheint. Mitspieler scannen ihn (oder öffnen `/play.html` und geben den Code ein).
6. **Spiel starten** → alle stimmen ab. Sobald alle abgestimmt haben, wird das Ergebnis automatisch gezeigt
   (oder du klickst auf „Ergebnis zeigen“).
7. Am Ende gibt es eine Übersicht über alle Fragen.

**Anonymität:** Der Server merkt sich nur eine zufällige Geräte-ID, damit jeder pro Frage nur einmal abstimmt.
An die Geräte werden ausschließlich die Summen geschickt – niemand sieht, wer wen gewählt hat.

## Lokal starten

```bash
npm install
npm start
# → http://localhost:3000
```

Damit Handys den QR-Code nutzen können, müssen sie den Server erreichen. Im selben WLAN:
Öffne die Host-Seite über die IP deines Rechners (z. B. `http://192.168.0.23:3000`), nicht über `localhost`.

## Online stellen (kostenlos, z. B. Render)

1. Auf [render.com](https://render.com) anmelden → **New → Blueprint** → dieses Repository wählen
   (die Datei `render.yaml` ist schon vorhanden).
2. Nach dem Deploy die angezeigte Adresse öffnen – fertig.

Hinweis: Spiele werden nur im Arbeitsspeicher gehalten. Startet der Server neu, ist ein laufendes Spiel weg
(deine eingetragenen Namen und Fragen bleiben im Browser gespeichert).
