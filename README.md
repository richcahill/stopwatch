# stopwatch

a next.js project with tailwind css and shadcn/ui

## getting started

run the development server:

```bash
npm run dev
```

open [http://localhost:3000](http://localhost:3000) in your browser.

## what's included

- **next.js 15** - react framework with app router
- **typescript** - type-safe javascript
- **tailwind css v4** - utility-first css framework
- **shadcn/ui** - beautiful, accessible component library

## adding components

add new shadcn/ui components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

browse all components at [ui.shadcn.com](https://ui.shadcn.com)

## project structure

```
stopwatch/
├── app/                    # next.js app router
│   ├── layout.tsx         # root layout
│   ├── page.tsx           # home page
│   └── globals.css        # global styles
├── components/            # react components
│   └── ui/               # shadcn/ui components
├── lib/                  # utility functions
└── components.json       # shadcn/ui config
```

## learn more

- [next.js docs](https://nextjs.org/docs)
- [tailwind css docs](https://tailwindcss.com/docs)
- [shadcn/ui docs](https://ui.shadcn.com)
