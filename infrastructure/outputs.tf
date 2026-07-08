output "ecr_backend_repository_uri" {
  value = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_repository_uri" {
  value = aws_ecr_repository.frontend.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.vinterbash.name
}

output "ecs_service_backend_name" {
  value = aws_ecs_service.backend.name
}

output "ecs_service_frontend_name" {
  value = aws_ecs_service.frontend.name
}