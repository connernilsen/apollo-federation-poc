import sys
import os

sections = ["accounts", "inventory", "products", "reviews"]#, "server"]

for sect in range(len(sections)):
    name = sections[sect]
    if (len(sys.argv) == 1 or len(sys.argv) > 1 and sys.argv[1] == "-r"):
        os.system(f'docker image build -t {name}-test:1.0 {name}/')

        #if (name != "server"):
        os.system(f'docker container run --publish 400{sect + 1}:400{sect + 1} --detach --name {name}-test {name}-test:1.0')
        #else:
        #    os.system('docker container run --publish 4000:4000 --detach --name server-test server-test:1.0')

    else:
        os.system(f'docker container stop {name}-test')
        os.system(f'docker container rm --force {name}-test')
        os.system(f'docker rmi {name}-test:1.0')
        
