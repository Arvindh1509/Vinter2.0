# Terraform deployment guide

This file covers how to create the AWS services for this project from your local machine using Terraform.

For stopping, starting, or removing services to save cost, see [README-costs.md](README-costs.md).

## 1. Make Terraform available locally

If PowerShell says that Terraform is not recognized, add the folder where Terraform is installed to your user PATH:

```powershell
$tfDir = Join-Path $env:USERPROFILE 'bin'
$env:Path = "$tfDir;$env:Path"
[Environment]::SetEnvironmentVariable('Path', "$tfDir;" + [Environment]::GetEnvironmentVariable('Path', 'User'), 'User')
```

Verify it with:

```powershell
terraform version
```

## 2. Prerequisites

1. Install Terraform.
2. Make sure AWS credentials are available.
3. Set the AWS region.

Example:

```powershell
$env:AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
$env:AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
$env:AWS_REGION="us-east-1"
```

Or configure AWS CLI credentials:

```powershell
aws configure
```

## 3. Create the infrastructure from this project

Open PowerShell in the infrastructure folder:

```powershell
cd F:\Vinter2.0-master\Vinter2.0\infrastructure
```

Initialize Terraform:

```powershell
terraform init
```

Preview the deployment:

```powershell
terraform plan
```

Create or update the AWS services:

```powershell
terraform apply
```

If the deployment needs the database secret value, pass it explicitly:

```powershell
terraform apply -auto-approve -var "database_url=postgresql://YOUR_DB_CONNECTION_STRING"
```

## 4. Useful notes

- Keep the Terraform state files safe.
- Avoid committing AWS credentials to Git.
- If you change provider versions or modules, run `terraform init` again.
- If Terraform is still not found, reopen PowerShell after updating your user PATH.
