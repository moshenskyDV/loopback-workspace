'use strict';

const ModelConfig = require('../datamodel/model-config');
const mixin = require('../util/mixin');
const fsUtility = require('../util/file-utility');

class ModelConfigActions {
  create(modelId, facetName, cb) {
    const workspace = this.getWorkspace();
    const facet = workspace.facet(facetName);
    const modelConfig = this;
    facet.add(modelConfig);
    fsUtility.writeModelConfig(facet, cb);
  }
  update(facet, modelId, attrs, cb) {
    const workspace = this.getWorkspace();
    const modelConfig = this;
    modelConfig.set(attrs);
    fsUtility.writeModelConfig(facet, cb);
  }
}

mixin(ModelConfig.prototype, ModelConfigActions.prototype);