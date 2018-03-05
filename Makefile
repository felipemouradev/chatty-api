.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: publish-documentation
publish-documentation: ## Publish API documentation locally
	docker run \
		-e SWAGGER_JSON=/openapi/openapi.yaml \
		-p 7070:8080 \
		-v $(shell pwd):/openapi \
		--rm \
		swaggerapi/swagger-ui:v3.9.1
