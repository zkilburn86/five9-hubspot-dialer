module "terraform_backend_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "2.13.0"
  acceleration_status = "Suspended"
  bucket = "terraform_backend"
}
