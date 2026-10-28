# Nikita Ilinov — portfolio

Personal portfolio of Nikita Ilinov. Russian version at `/`, English at `/en/`.
Static HTML, CSS and JavaScript; no build step or package installation required.

## Local preview

Run `node serve.mjs`, then open http://127.0.0.1:8766/.
Run currency tests with `node tests/currency.test.mjs`.

## Editing

- `index.html` and `en/index.html`: content, contacts and projects. Keep both languages in sync.
- Prices are preliminary: RUB 40,000 / 25,000 / 3,000. Update both displayed values and English `data-rub` attributes.
- Replace the `.portrait` placeholder with a real photograph.
- Replace the inactive Telegram placeholder once a contact link is available.
- `assets/style.css`: responsive layout, keyboard focus and reduced-motion support.
- Oplement screenshots illustrate the author's layout implementation from a supplied Figma design.

## Currency conversion

The English version converts base RUB prices into USD or EUR using https://open.er-api.com/v6/latest/RUB.
Prices are indicative and rounded to whole units. The rate date is displayed in UTC.
Responses are validated and cached locally for 24 hours. Invalid or unavailable rates leave the original RUB prices visible.
Rates older than seven days or more than one day in the future are rejected. Requests time out after eight seconds.
Core content and contact links work without JavaScript.

[Rates By Exchange Rate API](https://www.exchangerate-api.com) · [API documentation](https://www.exchangerate-api.com/docs/free)

## GitHub Pages

Prepared for https://nikitailinov18.github.io/.
In repository Settings → Pages, select **Deploy from a branch**, branch **main**, folder **/(root)** when ready to publish.
The `.nojekyll` file disables Jekyll processing. The local server and tests are not needed to serve the site.

Photo, Telegram link and final prices are still to be supplied. This repository contains the first draft.
