### sequelize models

1. 文章

```
npx sequelize-cli model:generate --name Article --attributes title:string,content:text
```

2. 分类

```
npx sequelize-cli model:generate --name Category --attributes name:string,rank:integer
```

3. 用户表

```
npx sequelize-cli model:generate --name User --attributes email:string,username:string,password:string,nickname:string,gender:tinyint,company:string,introduce:text,role:tinyint
```

4. 课程表

```
npx sequelize-cli model:generate --name Course --attributes categoryId:integer,userId:integer,name:string,image:string,recommended:boolean,introductory:boolean,content:text,likesCount:integer,chaptersCount:integer
```

5. 章节表

```
npx sequelize-cli model:generate --name Chapter --attributes courseId:integer,title:string,content:text,video:string,rank:integer

```

6. 点赞表

```
npx sequelize-cli model:generate --name Like --attributes courseId:integer,userId:integer

```

7. 设置表

```
npx sequelize-cli model:generate --name Setting --attributes name:string,icp:string,copyright:string,extra:string

```
