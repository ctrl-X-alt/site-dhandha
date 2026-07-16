# Site Dhandha

A deterministic, schema-driven AI layout compiler that builds production-ready, type-safe Next.js + Tailwind CSS landing pages optimized for high conversion rates.

Built explicitly for agency developers dealing with high-ticket clients who demand absolute layout freedom, lightning-fast performance, and zero vendor lock-in.

## Key Features

- **Zero Chat Output Bloat**: Forces LLMs to communicate via strict structured objects, bypassing markdown chatter and formatting hallucinations.
- **Conversion-Optimized Architecture**: Automatically applies behavioural psychology principles (e.g., Decoy pricing models, AIDA paths) straight into structural sections.
- **Bi-Directional Context Matching**: Scans your local project workspace to extract custom theme configurations and matches your exact typography/colors natively.
- **Clean Code Guarantee**: Emits zero bloated inline CSS or non-standard HTML wraps. Outputs pure, clean TypeScript components.

## Local Installation

Ensure you are working inside an initialized Next.js + Tailwind CSS project workspace, then run:

```bash
# 1. Initialize directory anchors
npx site-dhandha init

# 2. Securely authenticate your terminal workspace via GitHub
npx site-dhandha login

# 3. Trigger the interactive CRO compilation engine
npx site-dhandha generate
```

## System Architecture Blueprint

```text
[Local Terminal CLI] ──► Extracted Design Tokens ──► Private API Gateway
                                                              │
[TypeScript Compilation] ◄── Streamed Code Vectors ◄── [Dual-Agent LLM Chain]
```

## Security & Transparency

To protect core operational models, the AI prompt arrays and token minting nodes are handled on our secure private server clusters. This open-source CLI package acts exclusively as a local client wrapper that:
1. Validates local system framework paths natively.
2. Computes an anonymous SHA-256 hardware hash signature to prevent registration limits abuse.
3. Automatically writes code blocks to your project directories and executes local formatting tools (`prettier`/`eslint`).

## License

Distributed under the open-source MIT License. See `LICENSE` for details.
