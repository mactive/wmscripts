## 散列表 hash table

散列函数式这样的行数, 即无论你给它什么数据, 他都还你一个数字.
散列函数必须满足一些要求

* 他必须是一致的, 就是你输入apple的时候得到4, 每次都得如此
* 他应将不同的输入映射到不同的数字. 不要出现重复

你可能根本不需要自己去实现散列表, 任一优秀的语言都提供了散列表实现.
Python提供的散列表实现为字典, dict 函数

NSDictionary 就是一个散列表
* 先给一个key, 一般是字符串, 比如 `companyName`
* 经过散列函数, 映射成一个确定的索引, 比如`companyName`映射到索引5, `address`映射到索引2
* 直接在数组里查询第5个元素
* 散列函数知道数组有多大，只返回有效的索引。 如果数组包含5个元素，散列函数就不会返回无效索引100。

## hashtable性能
查找,插入,删除 平局情况 O(1), 最糟情况是 O(n)

### 影响性能的2个方面

* 装填因子: 因子越低,发生冲突的可能性越小. 一旦装填因子大于0.7, 就调整散列表的长度.
* 散列函数: 良好的散列函数让数组中的值成均匀分布. 而不是扎堆, 在一个数组元素后面挂一个很长的链表.

## 如何设计 良好的散列函数
> PHP的Hash采用的是目前最为普遍的DJBX33A (Daniel J. Bernstein, Times 33 with Addition)，这个算法被广泛运用与多个软件项目，Apache、Perl和Berkeley DB等。对于字符串而言这是目前所知道的最好的哈希算法，原因在于该算法的速度非常快，而且分类非常好（冲突小，分布均匀）。

散列函数设计:
* 直接定地法
* 除留余数法

散列冲突处理:
* 开发定制法
* 链地址法

http://www.nowamagic.net/academy/detail/3008010

