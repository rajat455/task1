"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const testUtils_1 = require("./testUtils");
let token = "";
let categoryId = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, testUtils_1.connectDB)();
    // Login to get token
    const loginRes = yield (0, supertest_1.default)(app_1.default).post("/api/auth/login").send({
        phone: "9999999999", // existing phone
        password: "Test123"
    });
    token = loginRes.body.token;
}));
afterAll(testUtils_1.closeDB);
describe("Category API", () => {
    it("should create a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/category")
            .set("token", token)
            .send({ name: "Electronics", alias: "electronics" });
        expect(res.statusCode).toBe(200);
        categoryId = res.body.data._id;
    }));
    it("should fetch all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/category").set("token", token);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("data");
    }));
    it("should update a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/category/${categoryId}`)
            .set("token", token)
            .send({ name: "Updated Name" });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success"); // Or your custom message
    }));
    it("should delete a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/category/${categoryId}`)
            .set("token", token);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success"); // Or your custom message
    }));
});
