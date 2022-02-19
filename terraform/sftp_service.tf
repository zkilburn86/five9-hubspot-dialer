module "ecs_service" {
  source  = "terraform-aws-modules/ecs/aws"
  version = "3.4.1"
  name = "ecs_service"
  capacity_providers = ["FARGATE"]
}

module "ecs-fargate-task-definition" {
  source  = "cn-terraform/ecs-fargate-task-definition/aws"
  version = "1.0.24"
  command = ["'tim:$1$M7Rtl79B$lWKKBOEaOb5yWpgEVjA01.:e:1001'"]
  container_image = "atmoz/sftp"
  container_name = "sftp_service"
  interactive = "false"
  name_prefix = "sftp"
  privileged = "false"
  start_timeout = 60
  stop_timeout = 60
  container_memory = 256
  container_memory_reservation = 256
  port_mappings = [ { "containerPort": 22, "hostPort": 22, "protocol": "tcp" } ]
}

#TimIsSuperGay696969
