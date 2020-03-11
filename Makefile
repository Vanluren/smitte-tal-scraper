.PHONY: default up stop restart down install lint
# DEFAULT MAKE FILE

# Create a .env file if not exists and include default env variables.
$(shell ! test -e \.env && cat \.env.default > \.env)

# Make all variables from the file available here.
include .env

# Defines colors for echo, eg: @echo "${GREEN}Hello World${COLOR_END}". More colors: https://stackoverflow.com/a/43670199/3090657
YELLOW=\033[0;33m
RED=\033[0;31m
GREEN=\033[0;32m
COLOR_END=\033[0;37m

default: test 

test:
	@echo "${GREEN}The Makefile works!${COLOR_END}"
	@echo "${RED}the cake is a lie${COLOR_END}"

deploy-production:
	@echo "${YELLOW}Deploying to production environment...${COLOR_END}"
	ssh -t ${DEPLOYMENT_USER_PRODUCTION}@${DEPLOYMENT_IP_PRODUCTION} 'cd ${DEPLOYMENT_PATH_PRODUCTION}; git reset --hard; git clean -fd; git pull;'
	@echo "${GREEN}Deployed successfully.${COLOR_END}"

deploy-staging:
	@echo "${YELLOW}Deploying to staging environment...${COLOR_END}"
	ssh -t ${DEPLOYMENT_USER_STAGING}@${DEPLOYMENT_IP_STAGING} 'cd ${DEPLOYMENT_PATH_STAGING}; git reset --hard; git clean -fd; git pull;'
	@echo "${GREEN}Deployed successfully.${COLOR_END}"

