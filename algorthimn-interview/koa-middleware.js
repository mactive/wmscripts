async function first(ctx, next) {
    console.log('1');
    // async 与 co + yield 的模型不同, await 是需要后面是 promise 的函数, 并且自己执行一次, 而 co 是自己拿到 value 然后帮你自动执行.
    await next(); // 两次调用 next
    console.log(ctx);
  };
  
  async function second(ctx, next) {
    console.log('2');
    await next();
    console.log('3');
  };
  
  const middleware = [first, second];
  
  const com = compose(middleware);
  
  com('ctx', function() {
    console.log('hey');
  });

  // ctx = context 是上下文. ctx.request, ctx.respose
  // next 是控制句柄
  // 1 2 'hey' 3 'ctx'.
  // 洋葱包裹模型

  // http://img.ijarvis.cn/IMG20180316_170652.png