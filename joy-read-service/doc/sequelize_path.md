 指定目录下生成迁移文件:

 sequelize-cli model:generate --name Log --attributes level:string,messsage:string,meta:string,timestamp:date --migrations-path migrations-log


 --migrations-path migrations-log 表示指定目录下生成 migrations-log 迁移文件

指定目录下执行指定环境迁移:

 sequelize-cli db:migrate --migrations-path migrations-log --env development-log
 
 指定目录 migrations-log， 执行 development-log 环境的数据库迁移