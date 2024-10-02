provider "aws" {
  region  = "us-east-1"
  profile = "awsp"
}

# Crear un repositorio ECR
resource "aws_ecr_repository" "skpr_ecr_repo" {
  name                 = "shopkeeper"  # Nombre del repositorio
  image_tag_mutability = "MUTABLE"        # Controla la mutabilidad de las imágenes

  # Opcional: habilitar escaneo automático de vulnerabilidades
  image_scanning_configuration {
    scan_on_push = true
  }
}

# Definir una política de ciclo de vida separada para el repositorio
resource "aws_ecr_lifecycle_policy" "ecr_lifecycle_policy" {
  repository = aws_ecr_repository.skpr_ecr_repo.name

  policy = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Expire untagged images older than 30 days",
      "selection": {
        "tagStatus": "untagged",
        "countType": "sinceImagePushed",
        "countUnit": "days",
        "countNumber": 30
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

# Output para mostrar el URL del repositorio ECR
output "ecr_repository_url" {
  value = aws_ecr_repository.skpr_ecr_repo.repository_url
}