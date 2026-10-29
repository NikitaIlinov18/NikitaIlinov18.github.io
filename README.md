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
- Telegram is linked to https://t.me/Nikita_Ilinov in both languages.
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

Photo and final prices are still to be supplied.

## Additional public work

Four demos are shown below Oplement in a responsive two-column grid (one column on small screens). Screenshots are of the actual public pages. New descriptions identify the visible interface and stack, without claiming a commissioned project, Figma authorship or a working booking backend.

| Project | Live page | Public source |
| --- | --- | --- |
| Сосны / Sosny | https://nikitailinov18.github.io/DomBrony/ | https://github.com/NikitaIlinov18/DomBrony |
| Дом у озера / House by the Lake | https://nikitailinov18.github.io/DomOzera/ | https://github.com/NikitaIlinov18/DomOzera |
| Coca | https://nikitailinov18.github.io/coca/ | https://github.com/NikitaIlinov18/coca |
| Wake & bake (practice project) | https://nikitailinov18.github.io/homework/wake-bake/index.html | https://github.com/NikitaIlinov18/homework/tree/main/wake-bake |

Verified 2026-10-29: public repository list (`private:false`, `has_pages:true`), latest successful deployment URLs for the containing repositories, and live HTTP 200 for the listed pages. Coca's public package.json confirms Vite, Sass and Swiper; HTML and linked scripts confirm the other displayed technologies. Only public resources were inspected.

The older `portfolio` repository contains placeholder/example.com case studies; those were not reused. Its index2/index3 are alternative portfolios and brony.html is another country-house prototype. `Git-GitHub` has no Pages deployment. `homework/WindowHouuse/index.html` is another live practice page; the selected grid uses Wake & bake for variety instead of every exercise.

GitHub API verification used Context7's `/websites/github_en_rest`, then unauthenticated public API requests: [deployment documentation](https://docs.github.com/en/rest/deployments/deployments), [status documentation](https://docs.github.com/en/rest/deployments/statuses). Visual verification is handled separately from source/HTTP checks.
