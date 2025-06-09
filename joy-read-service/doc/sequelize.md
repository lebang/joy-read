## sequelize 基本操作

### 日常开发命令

| 命令                                                                           | 说明             |
| ------------------------------------------------------------------------------ | ---------------- |
| sequelize db:create --charset utf8mb4 --collate utf8mb4_general_ci             | 创建数据库       |
| sequelize model:generate --name Article --attributes title:string,content:text | 创建模型         |
| sequelize db:migrate                                                           | 运行迁移文件     |
| sequelize seed:generate --name article                                         | 创建种子文件     |
| sequelize db:seed --seed xxx-article                                           | 运行指定种子文件 |
| sequelize db:seed:all                                                          | 运行所有种子文件 |

### 数据库操作常用方法

| 方法            | 说明                         |
| --------------- | ---------------------------- |
| findAll         | 查询所有记录                 |
| findAndCountAll | 查询所有记录，并统计数据总数 |
| findByPk        | 通过主键查询单条数据         |
| create          | 创建新数据                   |
| update          | 更新数据                     |
| destroy         | 删除数据                     |
