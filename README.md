# Plain Talk Financial Planning

Website for [Plain Talk Financial Planning](https://www.plaintalkfinancial.com), an independent, fee-only financial planning firm based in Amesbury, MA.

## Tech Stack

- **PHP** served via the [Lightspeed](https://github.com/abrayall/lightspeed) framework
- **Hosted** on Lightspeed's platform (DigitalOcean App Platform under the hood)
- **CI/CD** via GitHub Actions — auto-deploys on every push to `main`

## Running Locally

Install the [Lightspeed CLI](https://github.com/abrayall/lightspeed), then:

```bash
lightspeed start
```

The site will be available at `http://localhost:9002`.

To stop:

```bash
lightspeed stop
```

## Deploying

Commits pushed to `main` automatically trigger a deploy via GitHub Actions. The workflow installs Lightspeed and runs `lightspeed deploy`. You can also trigger a deploy manually from the **Actions** tab in GitHub.

The site version shown in the footer is set automatically from the latest git tag at deploy time.
