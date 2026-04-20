---
name: format-lyrics
description: >
  Format and normalize a song lyrics file in data/music/. Use this skill
  whenever the user runs `/format-lyrics` followed by a song name (e.g.
  `/format-lyrics "Aline Barros - Santidade"`). The skill finds the
  corresponding markdown file, applies canonical formatting rules (capitalization,
  punctuation, strophe numbering), and writes the result back. If the file does
  not exist, the skill asks for the lyrics and creates it.
---

## Parameters

The user invokes this skill as:

```
/format-lyrics "<File Name>"
```

The argument maps directly to `data/music/<File Name>.md`.

---

## Step 1 — Locate the file

Build the path: `data/music/<argument>.md`.

Try to read it. If the file does not exist:
- Tell the user the file was not found.
- Ask them to paste the lyrics.
- Create the file with the pasted content before continuing.

If the file exists, read it.

---

## Step 2 — Apply formatting rules

Rewrite the content applying **all three rules simultaneously**. Do not change the words themselves — only structure, capitalization, and punctuation.

### Rule 1 — Capitalization

- Every strophe starts with a capital letter.
- Apply sentence case within each strophe: capitalize only the first word of each sentence (i.e., after a period, exclamation mark, or question mark that ends a thought).
- Capitalize proper nouns (names of people, places, etc.).
- Do **not** capitalize common nouns, articles, or conjunctions mid-sentence.

### Rule 2 — Punctuation

- Correct obvious punctuation errors (missing periods, misplaced commas, unclosed quotes, etc.).
- Do **not** add or remove punctuation that would change the phrasing or rhythm of the lyrics — when in doubt, leave it as-is.

### Rule 3 — Strophe structure

- Each strophe becomes a single paragraph with **no internal line breaks**. Verse lines are joined with a single space.
- Number strophes sequentially: `1.`, `2.`, `3.`, … prefixing the paragraph.
- Separate strophes with only one line break.
- If a section is clearly a chorus/refrain (repeated block, originally in bold `**…**` or italic `_…_`), wrap it in `**bold**` instead of numbering it. It still becomes a single paragraph.
- Remove any existing numbering or slash separators before applying new numbering.

---

## Step 3 — Show the result and save

Display the formatted content to the user and write the formatted content back to `data/music/<argument>.md` (overwrite).
