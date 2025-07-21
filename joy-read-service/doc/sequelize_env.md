### env 指定数据库环境

 要将此迁移应用到 日志数据库，您需要在执行 db:migrate 命令时，通过 --env
  参数指定使用我们新创建的日志数据库环境。例如，在开发环境中：

    npx sequelize-cli db:migrate --env development-log

  同样地，如果您需要回滚：

    npx sequelize-cli db:migrate:undo --env development-log

  通过这种方式，您就可以使用 sequelize-cli 分别管理主数据库和日志数据库的表结构了。

  development_log 与 config/config.json 中定义的 development-log 配置项对应。