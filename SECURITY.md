# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.x     | Yes       |

This project is in early development. Only the latest `0.x` release receives security patches.

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please report security issues by emailing the maintainer directly. If no email is listed in the repository, open a GitHub Advisory instead:

1. Go to **Security > Advisories** on the repository
2. Click **Report a vulnerability**
3. Fill in the details: affected version, attack vector, impact, and proof of concept

### What to include

- Affected version (or commit SHA)
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

### Response timeline

| Stage | Expected time |
|-------|---------------|
| Acknowledgment | Within 48 hours |
| Triage / severity assessment | Within 5 business days |
| Patch or mitigation | Depends on severity — critical within 7 days, others within 30 days |

## Dependency security

This project has **zero runtime dependencies**, which eliminates an entire class of supply-chain vulnerabilities. `devDependencies` are periodically audited via `npm audit`.

## Scope

- Vulnerabilities in this library's source code (`src/`)
- Vulnerabilities introduced through `devDependencies` that affect build output
- Misuse patterns that lead to unsafe behavior

### Out of scope

- Vulnerabilities in downstream consumer code
- Issues related to the host JavaScript runtime (V8, Node.js)
- Theoretical attacks without a practical proof of concept
