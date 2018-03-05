const _ = require('lodash');
const ResponseService = require('./../services/response');
const HandleError = require('./../services/handle-error');

/**
 * Feito para ter um crud customizavel e extensivel
 * Funcionalidades:
 * ---------------------------------
 * populate: todas as pesquisas na coleção iram vir populadas com o que foi
 * especificado em: options.populate, ex: options.populate = ['users','company'] no controller
 * ---------------------------------
 * omit: você pode omit propriedades de retorno de cada metodo é similar ao
 * populate mas aplicado para cada metodo. ex. options._.findOne.omit = ['password','secret'] no controller
 * ---------------------------------
 * cbBefore executa um callback antes processamento de uma ação
 * cbAfter executa um callback depois processamento de uma ação
 */
class BaseController {

  constructor(model, options = {}) {
    this.Model = model;
    this.Response = ResponseService;
    this.options = options;
    this.options.populate = this.options.populate || "";
    this.HandleError = HandleError;

    //omit properties
    const omit = {
      _update: {omit: null},
      _remove: {omit: null},
      _save: {omit: null},
      _findOne: {omit: null},
      _index: {omit: null},
    };

    this.options = _.extend(omit, this.options);

    this._index = this._index.bind(this);
    this._findOne = this._findOne.bind(this);
    this._save = this._save.bind(this);
    this._update = this._update.bind(this);
    this._remove = this._remove.bind(this);
  }

  async _index(req, res, next, populate = [], cbError = ()=> {}) {
    let data = {};
    let error = null;

    populate = !_.isEmpty(populate) ? populate : this.options.populate;
    if (!_.isEmpty(populate)) {
      data = await this.Model.find({}).populate(populate);
    } else {
      data = await this.Model.find({});
    }

    if(!data)
      return cbError();

    return this.Response(res, error, _.values(
      _.map(data, (node) =>
        _.omit(node._doc, this.options._index.omit))));
  }


  async _findOne(req, res, next, populate = [], cbError = () => {}) {
    let query = {_id: req.params.id};
    let data = {};

    populate = !_.isEmpty(populate) ? populate : this.options.populate;
    if (!_.isEmpty(populate)) {
      data = await this.Model.findOne(query).populate(populate);
    } else {
      data = await this.Model.findOne(query);
    }
    if(!data)
      return cbError();

    return this.Response(res, null, _.omit(data, this.options._findOne.omit));
  }

  async _save(req, res, next, cbBefore = () => {}, cbAfter = () => {}) {
    try {
      await cbBefore();
      let body = req.body;
      let newData = new this.Model(body);
      let data = await newData.save(req);
      await cbAfter(data);
      return this.Response(res, null, _.omit(data._doc, this.options._save.omit));
    } catch (err) {
      let processError = this.HandleError(err);
      return this.Response(res, processError, null);
    }
  }

  async _update(req, res, next, query = {}, cbBefore = () => {}, cbAfter = () => {}) {
    try {
      await cbBefore();
      let body = req.body;
      let id = req.params.id;

      if (_.isEmpty(query))
        query = {_id: id};

      let queryResult = await this.Model.findOne(query).populate(this.options.populate || "");
      queryResult = _.merge(queryResult, body);
      let getObject = await queryResult.save(req);
      await cbAfter(data);
      return this.Response(res, null, _.omit(getObject._doc, this.options._update.omit));
    } catch (err) {
      let processError = this.HandleError(err);
      return this.Response(res, processError, null);
    }
  }

  async _remove(req, res, next, cbBefore = () => {}, cbAfter = () => {}) {
    try {

      let id = req.params.id;
      let data = await this.Model.remove({_id: id});

      return this.Response(res, null, _.omit(data, this.options._remove.omit));
    } catch (err) {
      let processError = this.HandleError(err);
      return this.Response(res, processError, null);
    }
  }

};

module.exports = BaseController;
