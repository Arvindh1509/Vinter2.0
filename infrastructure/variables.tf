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
  description = "Optional ACM certificate ARN for HTTPS listener. If set, this certificate is used directly for the HTTPS ALB listener."
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Optional custom domain name for ACM certificate creation when certificate_arn is not provided."
  type        = string
  default     = ""
}

variable "hosted_zone_id" {
  description = "Optional Route53 hosted zone ID for DNS validation"
  type        = string
  default     = ""
}

variable "database_url" {
  description = "Database connection string to store in Secrets Manager"
  type        = string
  default     = ""
}
