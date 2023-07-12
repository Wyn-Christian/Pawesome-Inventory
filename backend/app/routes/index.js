var express = require("express");
var router = express.Router();
const multer = require("multer");

const user_services = require("../services/user");
const user_group_services = require("../services/user_group");
const category_services = require("../services/category");
const media_services = require("../services/media");
const product_services = require("../services/product");
const sale_services = require("../services/sale");

const storage = (file_dest) =>
	multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, `./public/images/${file_dest}`);
		},
		filename: function (req, file, cb) {
			const uniqueSuffix =
				Date.now() + "-" + Math.round(Math.random() * 1e9);
			cb(null, file.originalname.replace(/\s+/g, "-").toLowerCase());
		},
	});

const upload_media = multer({
	storage: storage("medias"),
});

// User Routes
router.post("/user/create", user_services.create);
router.post("/user/login", user_services.login);
router.patch("/user/:id/update", user_services.update);
router.delete("/user/:id/delete", user_services.delete);
router.get("/user/:id", user_services.detail);
router.get("/users", user_services.list);

// User Group Routes
router.post("/user-group/create", user_group_services.create);
router.patch("/user-group/:id/update", user_group_services.update);
router.delete("/user-group/:id/delete", user_group_services.delete);
router.get("/user-group/:id", user_group_services.detail);
router.get("/user-groups", user_group_services.list);

// Category Routes
router.post("/category/create", category_services.create);
router.patch("/category/:id/update", category_services.update);
router.delete("/category/:id/delete", category_services.delete);
router.get("/category/:id", category_services.detail);
router.get("/categories", category_services.list);

// Media Routes
router.post(
	"/media/create",
	upload_media.single("image"),
	media_services.create
);
router.delete("/media/:id/delete", media_services.delete);
router.get("/media/:id", media_services.detail);
router.get("/medias", media_services.list);

// Sale Routes
router.post("/product/create", product_services.create);
router.patch("/product/:id/update", product_services.update);
router.delete("/product/:id/delete", product_services.delete);
router.get("/product/:id", product_services.detail);
router.get("/products", product_services.list);

// Product Routes
router.post("/sale/create", sale_services.create);
router.patch("/sale/:id/update", sale_services.update);
router.delete("/sale/:id/delete", sale_services.delete);
router.get("/sale/:id", sale_services.detail);
router.get("/sales", sale_services.list);

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
