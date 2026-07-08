# CI YAML Usage

This folder contains the repository's CI and Docker Compose configuration.

## Docker Compose

- `docker-compose.yml` - full local compose stack for backend, frontend, and proxy.
- `docker-compose.deploy.yml` - runtime compose using prebuilt images from ECR.
- `docker-compose.backend.yml` - build or run only the backend service.
- `docker-compose.frontend.yml` - build or run only the frontend service.
- `docker-compose.proxy.yml` - run only the NGINX proxy service.

### Build the services you need

Build backend only:

```bash
cd /path/to/Vinter2.0
docker compose -f ci/docker-compose.backend.yml build
```

Build frontend only:

```bash
docker compose -f ci/docker-compose.frontend.yml build
```

Build both services with the full compose stack:

```bash
docker compose -f ci/docker-compose.yml build
```

### Use the deploy compose file

Deploy using prebuilt images from your ECR registry:

```bash
docker compose -f ci/docker-compose.deploy.yml up -d
```

## GitHub Actions

- `.github/workflows/ci-cd.yml` - GitHub Actions workflow to build, publish, and deploy the app on pushes to `dev`.
