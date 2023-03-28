const api = require('../api/api');

const control_index = async (req, res) => {
  res.render('pages/home');
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
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const control_barcode = (req, res) => {
  res.render('pages/barcode');
};

const control_offline = (req, res) => {
  res.render('pages/offline');
};

module.exports = {
  control_index,
  control_listview,
  control_detailview,
  control_barcode,
  control_offline,
};
