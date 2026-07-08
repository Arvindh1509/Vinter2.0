variable "region" {
  description = "AWS region to deploy resources into"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project prefix for resources"
  type        = string
  default     = "vinterbash"
}

variable "backend_ecr_name" {
  description = "ECR repository name for the backend image"
  type        = string
  default     = "vinterbash-backend"
}

variable "frontend_ecr_name" {
  description = "ECR repository name for the frontend image"
  type        = string
  default     = "vinterbash-frontend"
}

variable "ecs_cluster_name" {
  description = "ECS cluster name"
  type        = string
  default     = "vinterbash"
}

variable "vpc_id" {
  description = "VPC ID for ECS services. Leave empty to create a new VPC."
  type        = string
  default     = ""
}

variable "create_vpc" {
  description = "Whether to create a new VPC for ECS"
  type        = bool
  default     = true
}

variable "certificate_arn" {
  description = "Optional ACM certificate ARN for HTTPS listener"
  type        = string
  default     = ""
}

variable "database_url" {
  description = "Database connection string to store in Secrets Manager"
  type        = string
  default     = ""
}
