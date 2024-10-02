provider "aws" {
  region  = "us-east-1"
  profile = "awsp"
}

resource "aws_ecr_repository" "skpr_ecr_repo" {
  name                 = "shopkeeper"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

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

resource "aws_lightsail_container_service" "shopkeeper_container" {
  name  = "shopkeeper-service"
  power = "nano"
  scale = 1
}


resource "aws_lightsail_container_service_deployment_version" "shopkeeper_container_deployment" {
  service_name = aws_lightsail_container_service.shopkeeper_container.name


  container {
    container_name = "shopkeeper"
    image          = var.image
    command        = []
    environment = {
      PORT                     = "${var.port}"
      DATABASE_URL             = "${var.database_connection}"
      API_SHOPKEEPER_LISTEINGS = "${var.api_shopkeeper}"
    }
    ports = {
      "${var.port}" = "HTTP"
    }
  }

  public_endpoint {
    container_name = "shopkeeper"
    container_port = var.port

    health_check {
      healthy_threshold   = 2
      unhealthy_threshold = 2
      timeout_seconds     = 5
      interval_seconds    = 30
      path                = "/api/v1/shopkeeper/healthz"
      success_codes       = "200-499"
    }
  }
}


output "container_service_url" {
  value = aws_lightsail_container_service.shopkeeper_container.url
}


output "ecr_repository_url" {
  value = aws_ecr_repository.skpr_ecr_repo.repository_url
}