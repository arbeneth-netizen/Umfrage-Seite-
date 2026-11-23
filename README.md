# Votum – „Wer würde am ehesten …?“

Live-Abstimmungsspiel für die Gruppe: Du richtest Überschrift, Namen und Fragen ein,
startest die Lobby, alle scannen den QR-Code und stimmen anonym am Handy ab.
Nach jeder Frage gibt es ein Kreisdiagramm und eine Liste, wer wie viele Stimmen bekommen hat.

## Spielmodi

| Modus | So geht's |
|---|---|
| 🎤 **Klassisch** | Du wählst vorher die Fragen. Alle stimmen anonym ab, wer am ehesten … – danach Kreisdiagramm. |
| ✍️ **Fragen-Mix** | Jeder tippt in der Lobby anonym eigene Fragen ein. Du nimmst davon so viele ins Spiel, wie du willst – plus Vorschläge und Archiv. |
| 🕵️ **Wer hat's gesagt?** | Jeder wählt beim Beitreten seinen Namen und bekommt eine eigene Meinungsfrage (über 220 Vorschläge, auch heikle Themen und Fragen, bei denen man konkret werden muss – Spieler können auch eigene einreichen). Vor dem Schreiben gibt es einen kurzen Hinweis: ehrlich sein, konkret werden, übertreiben erlaubt. Der Host sieht, wer welche Frage hat und schon beantwortet hat (nie den Text). Nach dem Schreiben werden 1–4 Aussagen (vorher einstellbar) zufällig gezogen: Frage oben, Aussage als Zitat darunter. Die Gruppe diskutiert, tippt anonym, wer es war – dann wird der Autor aufgelöst. Beliebig viele Runden. |

## So läuft ein Spiel

1. Startseite öffnen (`/`), Modus wählen.
2. **Überschrift** und **Namen** eintragen (jeder Name bekommt eine eigene Farbe).
3. **Fragen** auswählen: Vorschläge in Kategorien (über 220 Abstimmungsfragen, über 220 Meinungsfragen),
   Suche, eigene Fragen, Archiv. Alles bleibt im Browser gespeichert.
4. **Lobby starten** → QR-Code erscheint (antippen = groß anzeigen). Mitspieler scannen ihn
   oder öffnen `/play.html` und geben den Code ein.
5. Spielen – am Ende gibt es eine Übersicht über alle Ergebnisse.

**📚 Archiv:** Jede eingetippte Frage (von dir oder den Spielern) wird automatisch gespeichert,
sortiert nach Session. Über „Archiv“ wählst du eine Session und übernimmst einzelne oder alle Fragen.
Das Archiv liegt im Browser des Host-Geräts – nutze also immer dasselbe Gerät als Host.

**Anonymität:** Der Server merkt sich nur eine zufällige Geräte-ID, damit jeder pro Frage einmal abstimmt.
An die Geräte gehen ausschließlich Summen – niemand sieht, wer wen gewählt hat.
Bei „Wer hat's gesagt?“ wird nur der Autor einer *gezogenen* Aussage aufgelöst; alle anderen Aussagen bleiben geheim.

**Menü (☰):** Modus wählen, Archiv, Einstellungen (automatisches Aufdecken, Fragen einreichen erlauben, Standard für Aussagen pro Runde, Sicherung exportieren/importieren), Hilfe.

**Als App installieren:** Seite auf dem Handy öffnen → Teilen → „Zum Home-Bildschirm“ (iPhone)
bzw. Menü → „App installieren“ (Android).

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
