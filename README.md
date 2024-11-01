task-management-api/
│
├── src/
│   ├── auth/
│   │   └── authUtils.js                 # Utility cho xác thực, tạo token
│   │
│   ├── config/
│   │   └── config.mongodb.js            # Cấu hình MongoDB
│   │
│   ├── controllers/
│   │   ├── access.controller.js         # Xử lý đăng nhập, đăng ký, refresh token
│   │   └── task.controller.js           # Xử lý CRUD task
│   │
│   ├── dbs/
│   │   └── init.mongodb.js              # Kết nối MongoDB
│   │
│   ├── helpers/
│   │   └── check.connect.js             # Giám sát kết nối MongoDB
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js           # Middleware xác thực
│   │
│   ├── models/
│   │   ├── keytoken.model.js            # Model lưu token
│   │   ├── task.model.js                # Model cho task
│   │   └── user.model.js                # Model cho user
│   │
│   ├── routes/
│   │   ├── auth/
│   │   │   └── index.js                 # Routes cho đăng ký, đăng nhập
│   │   └── task/
│   │       └── index.js                 # Routes CRUD cho task
│   │
│   ├── services/
│   │   ├── access.service.js            # Logic xác thực, tạo token
│   │   ├── keyToken.service.js          # Xử lý token lưu trữ
│   │   └── task.service.js              # Logic CRUD task
│   │
│   ├── app.js                           # Cấu hình Express và route chính
│   └── server.js                        # Khởi động server
│
├── .env                                 # Biến môi trường
├── .gitignore                           # Git ignore file
├── package.json                         # Thông tin dự án và các dependencies
└── README.md                            # Hướng dẫn dự án
