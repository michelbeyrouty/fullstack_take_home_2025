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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = void 0;
exports.initDb = initDb;
exports.safeFreshTestDb = safeFreshTestDb;
const sqlite_1 = require("sqlite");
const sqlite3_1 = require("sqlite3");
let db = (0, sqlite_1.open)({ filename: ":memory:", driver: sqlite3_1.Database });
const sql = (...args) => db
    .then((dbo) => dbo.all(...args))
    .catch((e) => {
    console.error("DB Error:", e);
    throw e;
});
exports.sql = sql;
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        // Users
        yield (0, exports.sql)(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      email VARCHAR(255)
    );
  `);
        yield (0, exports.sql)(`
    INSERT INTO users (id, name, email)
    VALUES
      (1, 'Alien Morty', 'alien@mortys.com'),
      (2, 'Banana Morty', 'slippery@mortys.com'),
      (3, 'Cat Morty', 'meow@mortys.com'),
      (4, 'Dog Morty', 'dawg@mortys.com'),
      (5, 'Evil Morty', '666@mortys.com'),
      (6, 'Frozen Morty', 'letitgo@mortys.com'),
      (7, 'Genius Morty', 'rick@mortys.com'),
      (8, 'Hammerhead Morty', 'hammertime@mortys.com'),
      (9, 'Pickle Morty', 'letsmarinate@mortys.com');
  `);
        // Work Orders
        yield (0, exports.sql)(`
    CREATE TABLE work_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255),
      status VARCHAR(255) CHECK( status IN ('OPEN', 'CLOSED') ) NOT NULL DEFAULT 'OPEN'
    );
  `);
        yield (0, exports.sql)(`
    INSERT INTO work_orders (id, name, status)
    VALUES
      (1, 'Unfreeze Frozen Morty', 'OPEN'),
      (2, 'Clean Cat Morty''s litterbox', 'OPEN'),
      (3, 'Walk Dog Morty around the block', 'OPEN'),
      (4, 'Hammer nails', 'OPEN'),
      (5, 'Land on Earth', 'CLOSED'),
      (6, 'Freeze Morty', 'CLOSED'),
      (7, 'Don''t assign and close', 'CLOSED');
  `);
        // Work Order Assignees
        yield (0, exports.sql)(`
    CREATE TABLE work_order_assignees (
      work_order_id INT NOT NULL,
      user_id INT NOT NULL,
      PRIMARY KEY(work_order_id, user_id),
      FOREIGN KEY(work_order_id) REFERENCES work_orders(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
        yield (0, exports.sql)(`
    INSERT INTO work_order_assignees (work_order_id, user_id)
    VALUES
      (3, 1),
      (5, 1),
      (2, 3),
      (3, 4),
      (6, 5),
      (4, 8);
  `);
    });
}
function safeFreshTestDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (yield db).close();
        db = (0, sqlite_1.open)({ filename: ":memory:", driver: sqlite3_1.Database });
        yield initDb();
    });
}
