const api = require('../api/api');
const revManifest = require('../public/rev-manifest.json');

console.log(revManifest);
const control_index = async (req, res) => {
  res.render('pages/home', { revManifest: revManifest });
};

const control_listview = (req, res) => {
  const query = req.query.query ? req.query.query : '';
  const page = req.query.page ? req.query.page : 1;
  const pageSize = req.query.pageSize ? req.query.pageSize : 12;

  api
    .get('all', query, page, pageSize)
    .then((data) => {
      const pageCount =
        Math.ceil(data.count / pageSize) >= 150
          ? 150
          : Math.ceil(data.count / pageSize);
      if (req.query.async) {
        res.render('partials/product-list', {
          data: data,
          count: data.count,
          query: query,
          page: page,
          pageSize: pageSize,
          pageCount: pageCount,
        });
      } else {
        res.render('pages/index', {
          data: data,
          query: query,
          page: page,
          pageSize: pageSize,
          pageCount: pageCount,
          revManifest,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const control_detailview = (req, res) => {
  api
    .get('detail', req.params.barcode)
    .then((data) => {
      res.render('pages/detail', {
        data: data,
        revManifest,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const control_barcode = (req, res) => {
  res.render('pages/barcode', { revManifest });
};

const control_offline = (req, res) => {
  res.render('pages/offline', { revManifest });
};

module.exports = {
  control_index,
  control_listview,
  control_detailview,
  control_barcode,
  control_offline,
};
