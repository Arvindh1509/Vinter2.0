# Stop, start, or remove AWS services to save cost

Use this guide when you want to reduce AWS spending without deleting everything permanently.

## 1. Stop the ECS services temporarily

This keeps the infrastructure in place but stops the running tasks:

```powershell
aws ecs update-service --cluster vinterbash --service vinterbash-frontend --desired-count 0
aws ecs update-service --cluster vinterbash --service vinterbash-backend --desired-count 0
```

This reduces cost while preserving the ECS services, load balancer, and other resources.

To start them again later:

```powershell
aws ecs update-service --cluster vinterbash --service vinterbash-frontend --desired-count 1
aws ecs update-service --cluster vinterbash --service vinterbash-backend --desired-count 1
```

## 2. Remove the whole infrastructure

If you want to delete all AWS resources created by Terraform:

```powershell
cd F:\Vinter2.0-master\Vinter2.0\infrastructure
terraform destroy -auto-approve -var "database_url=postgresql://YOUR_DB_CONNECTION_STRING"
```

This removes the ECS services, load balancer, VPC, security groups, ECR repositories, and other resources created by the Terraform scripts.

## 3. Notes

- Stopping services is the best option if you want to save money but keep the setup ready.
- Destroying the infrastructure is the best option if you no longer need the environment.
- If you later want to recreate everything, use the steps in [README.md](README.md).
