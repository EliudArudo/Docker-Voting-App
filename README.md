> My First Beautiful Nuxt + NodeJS + Redis + Mongo Dockerised app

> Docker Swarm version
### Build Setup
``` bash
#  Make sure you have Docker installed
# Clone the repo, and in the home dir of the cloned repo, run

$ docker-compose up
```

1. Build Setup for Locked Swarm with one way in through nginx server
``` bash
#  First initialise your 'Swarm'
$ docker swarm init

# Deploy swarm from home directory
$ docker stack deploy -c docker-stack.yaml <stack-name>

# Check logs from a Swarm service
# add '--follow' to trace logs
$ docker service logs <service-name>
```

2. Build a multi-node cluster
``` bash
# In your local machine - make sure you have 8GB RAM and above
# For windows
$ docker-machine create --driver hyperv --hyperv-virtusl-switch <your-virtual-switch> <node-name>

# ssh into your created vm
$ docker-machine ssh <node-name>

# Initialise your docker swarm, and use join tokens to add nodes
$ docker swam init
# Promote a worker from your leader node
$ docker node update --role manager <node-name>

# Create our overlay networks, eg 'frontend', 'backend'
$ docker network create --driver overlay <network-name>

# Add services to the networks
# Note, assign right environment variables to each service as in docker.stack.yaml
# Node, aliases are important when using nginx, or env variables such as MONGODB=mongodb
# Important, open up port to front end services only
# Follow the docker.stack.yaml schematics for this - env variables and aliases are most important, + ports to frontend services

$ docker service create --name <service-name> -p 80:80 --alias <alias-name> --network <network-name> -e <env-variables>=<env-value> -e <env-variables>=<env-value> <image>

# Check processes running in a service
$ docker service ps <service-name>

# Update config of the services, eg, add replicas/ scale up/down a service
$ docker service update <service-name> --replicas=<number>

# Clear all our services
$ docker service rm <service-1> <service-2> ...

# Leaving is tricky for managers, as they have our credentials, so we have to demote them first
$ docker node demote <manager-node>

# Then they can leave - veryone has to leave to clear
$ docker swarm leave

# Then we as the Leader, can remove them
$ docker node rm <node-name>

# Get out of ssh'ed server 'Ctrl + D'

# Delete the nodes in case of local env
$ docker-machine rm <node-name>

```

>  Kubernetes version
### Set up your environment to run 'kubectl'

1. First instantiate the Ingresses from 'Initial Ingress Setup'


2. Start with the Generic mandatory setup (in the home directory) and the LoadBalancing service for development purposes

```
$ kubectl apply -f 'Initial Ingress Setup'
```

3. Then run all the cluster configs in 'k8s' folder
```
$ kubectl apply -f k8s
```

From here, you can access the apps from 'http://localhost:80'