help:
	@echo "_______BUILD ANGULAR FRONTEND______\n"
	@echo "To build all apps run make make build-frontend"

build-frontend:
	ng build --project='minerva' &&\
	ng build --project='admin' 