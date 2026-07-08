# AWS ECS Deployment Setup

This repository is now prepared for deployment to AWS using ECR and ECS. The GitHub Actions workflow will build both Docker images, push them to ECR, and trigger ECS service redeploys.

## Required AWS resources

You need to create the following:

1. ECR repositories
   - `vinterbash-backend`
   - `vinterbash-frontend`

2. ECS cluster
   - `vinterbash`

3. ECS services (Fargate)
   - one service for the backend
   - one service for the frontend

4. Make sure the frontend service is reachable on port `80` and the backend container is reachable from the frontend proxy if you use the same task or route requests appropriately.

## Required GitHub secrets

Add these repository secrets in GitHub:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_ACCOUNT_ID`
- `ECR_REPOSITORY_BACKEND` (for example `vinterbash-backend`)
- `ECR_REPOSITORY_FRONTEND` (for example `vinterbash-frontend`)
- `ECS_CLUSTER` (for example `vinterbash`)
- `ECS_SERVICE_BACKEND`
- `ECS_SERVICE_FRONTEND`
- `DATABASE_URL`

## Create resources with AWS CLI

Use these commands after installing and configuring `aws` CLI:

```bash
aws ecr create-repository --repository-name vinterbash-backend
aws ecr create-repository --repository-name vinterbash-frontend
aws ecs create-cluster --cluster-name vinterbash
```

## ECS service setup

You can create ECS services in the AWS Console or with the CLI. The workflow assumes the services already exist and use task definitions that point to the ECR `latest` image tag.

If the task definition uses `latest`, the deployment job can force a new deployment after pushing images.

### Important

- Do not store `DATABASE_URL` in source code.
- Use GitHub Secrets for all sensitive values.
- Use HTTPS/SSL in your ECS service or ALB setup for production traffic.
