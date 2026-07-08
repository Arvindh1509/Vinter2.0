# Terraform deployment guide

## Why `terraform` was not recognized

The error happened because Terraform was installed in your user profile folder, but that folder was not in your Windows `PATH` for the new PowerShell session.

The fix was:

```powershell
$tfDir = Join-Path $env:USERPROFILE 'bin'
$env:Path = "$tfDir;$env:Path"
[Environment]::SetEnvironmentVariable('Path', "$tfDir;" + [Environment]::GetEnvironmentVariable('Path', 'User'), 'User')
```

Then verify it with:

```powershell
terraform version
```

If the command works, you are ready to run Terraform.

---

## Prerequisites

1. Install Terraform.
2. Make sure AWS credentials are available.
3. Set the AWS region.

Example:

```powershell
$env:AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
$env:AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
$env:AWS_REGION="us-east-1"
```

Or use the AWS CLI profile:

```powershell
aws configure
```

---

## Run Terraform from this project

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

Create or update the infrastructure:

```powershell
terraform apply
```

If the deployment needs the database secret value, pass it explicitly:

```powershell
terraform apply -auto-approve -var "database_url=postgresql://YOUR_DB_CONNECTION_STRING"
```

### HTTPS with ACM certificate

If you already have an ACM certificate ARN, pass it as:

```powershell
terraform apply -auto-approve \
  -var "database_url=postgresql://YOUR_DB_CONNECTION_STRING" \
  -var "certificate_arn=arn:aws:acm:us-east-1:123456789012:certificate/abcd-1234..."
```

If you do not have a certificate ARN but do have a domain in Route53, pass:

```powershell
terraform apply -auto-approve \
  -var "database_url=postgresql://YOUR_DB_CONNECTION_STRING" \
  -var "domain_name=app.example.com" \
  -var "hosted_zone_id=Z123456ABCDEF"
```

---

## Stop services to save cost

If you only want to stop the running ECS services temporarily:

```powershell
aws ecs update-service --cluster vinterbash --service vinterbash-frontend --desired-count 0
aws ecs update-service --cluster vinterbash --service vinterbash-backend --desired-count 0
```

This stops the tasks and reduces cost while keeping the infrastructure resources available.

To start them again later:

```powershell
aws ecs update-service --cluster vinterbash --service vinterbash-frontend --desired-count 1
aws ecs update-service --cluster vinterbash --service vinterbash-backend --desired-count 1
```

---

## Remove everything (destroy infrastructure)

If you want to delete all AWS resources created by Terraform:

```powershell
terraform destroy -auto-approve -var "database_url=postgresql://YOUR_DB_CONNECTION_STRING"
```

This removes the ECS services, load balancer, VPC, security groups, ECR repositories, and other resources created by the Terraform scripts.

---

## Useful notes

- Keep the Terraform state files safe.
- Avoid committing AWS credentials to Git.
- If you change provider versions or modules, run `terraform init` again.
- If the terminal still cannot find Terraform, reopen PowerShell after updating your user `PATH`.
