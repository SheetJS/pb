LIB=pb
REQS=
ADDONS=
AUXTARGETS=

ULIB=$(shell echo $(LIB) | tr a-z A-Z)
DEPS=
TARGET=$(LIB).js

.PHONY: lint
lint: $(TARGET) $(AUXTARGETS)
	jshint --show-non-errors $(TARGET) $(AUXTARGETS)
	jshint --show-non-errors package.json
	jscs $(TARGET) $(AUXTARGETS)

.PHONY: flow
flow: lint
	flow check --all --show-all-errors

