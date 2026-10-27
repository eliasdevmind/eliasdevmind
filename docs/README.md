# Portfólio — elias/devmind

Site estático (HTML + CSS + JS, zero dependências) pronto para GitHub Pages.

## Publicar

1. No GitHub: **Settings → Pages**.
2. Em *Build and deployment*, escolha **Deploy from a branch**, branch `main` e pasta **`/docs`**.
3. O site fica em `https://eliasdevmind.github.io/eliasdevmind/`.

Para testar localmente: `python3 -m http.server -d docs 8000` e abra `http://localhost:8000`.

## O que editar

| O quê | Onde |
|---|---|
| **Sua foto** | Salve como `docs/assets/img/foto.jpg` (retrato, ~900×1100 px). Sem ela, aparece o monograma "E." |
| **Currículo** (experiência, formação) | `docs/index.html`, seção `SOBRE + CURRÍCULO`. Cada item é um `<details class="commit">`; há modelos comentados para copiar. |
| **Projetos** | `docs/assets/js/main.js`, lista `PROJECTS` no topo. `mock` define a capa: `web`, `shop`, `links`, `data`, `term`, `api`, `phone`, `pong`. `wide: true` deixa o card largo. |
| **Textos do hero / sobre** | `docs/index.html` |
| **Cores dos temas** | `docs/assets/css/style.css`, blocos `:root[data-theme="dark"]` e `:root[data-theme="light"]` |

## Recursos

- Hero com sistema orbital em canvas (motor 3D próprio) e **lente raio-X** que segue o mouse e revela a versão "dados" da cena e do nome.
- Tema claro/escuro com transição circular (segue o sistema na primeira visita e lembra a escolha).
- Paleta de comandos: <kbd>Ctrl</kbd>+<kbd>K</kbd> ou <kbd>/</kbd>.
- Currículo no formato `git log`, fluxo de trabalho com progresso no scroll, formulário que abre o e-mail já preenchido.
- Respeita `prefers-reduced-motion` e funciona no celular.
