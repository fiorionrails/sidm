# Design Guidelines: SIDM

## Vibe & Concept
Credibility, infrastructure, and Brazilian identity communicated subtly (without literal flags). The design should feel like a modern, high-quality developer tool, but grounded in institutional trust. Dark mode is a priority, not an afterthought (especially for code blocks and GraphQL playgrounds).

## Colors
- **Primary (Green)**: `#0B5E37` (Green-forest, signature color for fills, logos, links)
- **Accent (Gold)**: `#8A6400` (Restrained gold for details and highlighted text)
- **Accent Bright**: `#F2B807` (Vibrant gold for the logo hub or glow on dark mode)
- **Surface (Light Mode)**: `#FFFFFF` base, `#F1F5F3` muted, `#DCE5E0` borders. Text: `#10241A`.
- **Surface (Dark Mode)**: `#0A1633` (Night-blue, the blue from the flag), `#111E40` muted. Text: `#E8EFEA`.
- **Semantics**: Success is teal-green (`#0E7C57`), Warning is burnt-orange (`#A8521E`), Error is red (`#BE2F26`).
- **Anti-patterns**: Do NOT use pure yellow. Do NOT use green-neon + yolk-yellow. Do NOT use gold accent as small text on medium backgrounds.

## Typography
- **Display (Headings)**: `Space Grotesk` (Geometric, technical character without being generic). Tracking slightly tight (`-0.01em`). Weights: 500, 600, 700.
- **Body (Long reading)**: `IBM Plex Sans` (Humanist, highly readable, engineering credibility). Line-height: `1.6`. Weights: 400, 500, 600.
- **Mono (Code & Data)**: `IBM Plex Mono` (Use strictly as a semantic marker for machine data, API fields, endpoints, IDs). Weights: 400, 500.

## Imagery & Iconography
- **Icons**: Outline style, 1.8px stroke, 24px grid, rounded corners.
- **Images**: Avoid stock photos. Prefer data visualizations (choropleth maps in green/gold), table grids, GraphQL schema diagrams.
- **Logo**: Use `sidm-logo-horizontal.svg` for standard headers, and `sidm-symbol.svg` for avatars/favicons.

## Motion & Interaction
- Fast and subtle (120–240ms).
- Signature moment: On load, three nodes converge to the hub (representing ETL/integration).
- Always respect `prefers-reduced-motion`.
