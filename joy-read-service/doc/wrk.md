## wrk

wrk -c 100 -d 20 http://localhost:3000/web/

这个命令里：

-c 100：
  -c 表示并发连接数（concurrent connections）。
  100 表示模拟 100 个并发用户或连接，同时访问目标 URL。
-d 20：
  -d 表示测试持续时间（duration）。
  20 表示持续 40 秒。
