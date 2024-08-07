const Task = require("../../../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  // Status
  if (req.query.status) {
    find.status = req.query.status;
  }
  // End Status

  // Sort
  const sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  // End Sort

  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countTasks = await Task.countDocuments(find);
  const objPagination = paginationHelper(initPagination, req.query, countTasks);
  // End Pagination

  // Search
  let objSearch = searchHelper(req.query);

  if (req.query.keyword) {
    find.title = objSearch.regex;
  }
  // End Search

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);

  res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });

    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
};

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    await Task.updateOne({
      _id: id
    }, {
      status: status
    });

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
};

// [GET] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  const { ids, status } = req.body;

  const listStatus = ["initial", "doing", "finish", "pending", "notFinish"];

  if(listStatus.includes(status)) {
    await Task.updateMany({
      _id: { $in: ids }
    }, {
      status: status
    });

    res.json({
      code: 200,
      message: "Đổi trạng thái thành công!"
    });
  } else {
    res.json({
      code: 400,
      message: `Trạng thái ${status} không hợp lệ!`
    });
  }
};
