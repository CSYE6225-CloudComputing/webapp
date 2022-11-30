# This file was autogenerated by the 'packer hcl2_upgrade' command.We
# recommend double checking that everything is correct before going forward.We
# also recommend treating this file as disposable.The HCL2 blocks in this
# file can be moved to other files.For example,the variable blocks could be
# moved to their own 'variables.pkr.hcl' file,etc.Those files need to be
# suffixed with '.pkr.hcl' to be visible to Packer.To use multiple files at
# once they also need to be in the same folder.'packer inspect folder/'
# will describe to you what is in that folder.# Avoid mixing go templating calls(for example `` `{{ upper(` string `) }}` ``) 
# and HCL2 calls(for example '${ var.string_value_example }') .They won 't be
# executed together and the outcome will be unknown.
# All generated input variables will be of 'string' type as this is how Packer JSON
# views them; you can change their type later on.Read the variables type 
# constraints documentation 
# https : //www.packer.io/docs/templates/hcl_templates/variables#type-constraints for more info.

    variable "AWS_ACCESS_KEY_ID" {
        type = string
        default = ""
    }

    variable "AWS_SECRET_ACCESS_KEY" {
        type = string
        default = ""
    }
    variable "source_ami" {
        type = string
        default = "ami-08c40ec9ead489470"
    }

    variable "ssh_username" {
        type = string
        default = "ubuntu"
    }

    variable "subnet_id" {
        type = string
        default = ""
    }

    variable "vpc_id" {
        type = string
        default = ""
    }

    variable "vpc_region" {
        type = string
        default = "us-east-1"
    }

    variable "GITHUB_PATH" {
        default = env("GITHUB_REPO_PATH")
    }


    # "timestamp" template function replacement 
    locals {
        timestamp = regex_replace(timestamp(), "[- TZ:]", "")
    }

    # source blocks are generated from your builders a source can be referenced in 
    # build blocks.A build block runs provisioner and post - processors on a # source.Read the documentation for source blocks here : 
    # https : //www.packer.io/docs/templates/hcl_templates/blocks/source
    
    source "amazon-ebs" "autogenerated_1" {
        access_key = "${var.AWS_ACCESS_KEY_ID}"
        ami_block_device_mappings {
            delete_on_termination = true
            device_name = "/dev/xvda"
            volume_size = 50
            volume_type = "gp2"
        }
        ami_description = "Linux AMI for csye6225"
        ami_name = "csye6225_${local.timestamp}"
        associate_public_ip_address = true
        instance_type = "t2.micro"
        profile = "dev"
        region = "${var.vpc_region}"
        secret_key = "${var.AWS_SECRET_ACCESS_KEY}"
        source_ami = "${var.source_ami}"
        ssh_username = "${var.ssh_username}"
        subnet_id = "${var.subnet_id}"
        tags = {
            Author = "user",
            Environment = "dev",
            Tool = "Packer"
        }
        vpc_id = "${var.vpc_id}"
    }

    # a build block invokes sources and runs provisioning steps on them.The # documentation for build blocks can be found here : # https : //www.packer.io/docs/templates/hcl_templates/blocks/build
    
    build {
        sources = ["source.amazon-ebs.ubuntu"]

        provisioner "shell" {
            script = "packer/setup.sh"
        }

        provisioner "shell" {
            inline = [
                "cd /home/ubuntu/node-app",
                "sudo mkdir fileUpload"  
            ]
        }

        // provisioner "file" {
        //     destination = "/home/ubuntu/node-app"
        //     source = "../"
        // }

        provisioner "file" {
            source = "./webapp.zip"
            destination = "/tmp/webapp.zip"
        }

        provisioner "shell" {
            inline = [
                "cd /home/ubuntu/node-app",
                "rm -rf /uploads",
                "rm -rf .env",
                "rm -rf node_modules",
                "cd /home/ubuntu/node-app",
                "sudo npm install -g npm@latest",
                "sudo npm cache clean --force",
                "sudo npm install",
                "sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/home/ubuntu/node-app/statsd/cloudwatch-config.json",
                "cd /home/ubuntu/node-app",
                "sudo pm2 start index.js",
                "sudo pm2 startup systemd",
                "sudo pm2 save",
                "sudo ln -s /home/ubuntu/node-app/webapp.service /etc/systemd/system/webapp.service",
                "sudo systemctl daemon-reload",
                "cd /home/ubuntu/node-app",
                "sudo systemctl enable webapp.service",
                "sudo systemctl start webapp.service"
            ]
        }

        provisioner "shell" {
            inline = [
                "cd /home/ubuntu/node-app"
                  
            ]
        }

    }
