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

Commits pushed to `main` automatically trigger a deploy via GitHub Actions. The workflow installs Lightspeed and runs `lightspeed deploy`.

You can also trigger a deploy manually from the **Actions** tab in GitHub.

## Versioning

The site version is defined in `version.properties` and displayed in the footer. Update it when tagging a release:

```bash
# Update version.properties
echo "version=1.2.3" > version.properties

# Commit, tag, and push
git add version.properties
git commit -m "Bump version to 1.2.3"
git tag v1.2.3
git push origin main --tags
```
