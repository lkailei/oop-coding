---
title: mysql查询优化
autoGroup-3: 进阶 
---
## MySQL查询优化

### 重要的概念：

域：是一组具有相同数据类型的值得集合，例如：实数，整数，介于某个范围的数

关系：关系代数的对象是关系，单一的数据结构,D1XD2X...Dn的子集叫做在域D1,D2,Dn上的关系，可以表示为 R(D1,D2,...Dn)  R是关系名，n:关系的目或度

关系的表示：关系是一个二维表，表的每行是对应的一个元组，表中的每一列对应的是一个域，

**关系的性质：**

- 列是同质的（homogeneous）
- 不同的列可出自同一个域
- 列的顺序无所谓，可以任意交换
- 任意两个元组的候选码不能相同
- 行的顺序无所谓，行的次序可以任意交换
- 分量必须取原子值

属性：关系中不同列可以对应相同的域，为了加以区分，必须给每列起一个名字，称为属性(attribute)n目关系必须有n个属性

码：

- 候选码：关系中的某一属性组的值能唯一的标识一额元组，简单的情况：候选码只包含一个属性
- 全码：关系模式中的所有的属性组是这个关系模式的候选码，
- 主码：如一个关系中有多个候选码则选定其中一个为主码，
- 主属性：候选码的属性称为主属性，
- 非主属性：不包含在任何候选码中的属性称为非主属性，

外码：设F是基本关系R的一个属性或一组属性，但不是关系R的码。如果F与基本关系S的主码Ks对应则F是R的外码 R是参照关系，S是被参照关系或者是目标关系

- 关系R和S不一定是不同的关系
- 目标关系S的主码Ks和参照关系的外码F必须定义在一个域上
- 外码不一定要与相应的主码同名

投影：可以选择性的显示关系的某些属性

笛卡尔积：给定一组域，允许某些域是相同的,

- 所有域的所有取值是一个组合，
- 不能重复

```
D1,D2,...Dn的笛卡尔积为： D1*D2*..Dn={(d1,d2,....dn)| di属于Di,i=1,2,...n}
```

元组：笛卡尔积中的每一个元素（d1,d2,d3...dn) 叫做一个元组，（A,B,C） 括号包括起来

分量：笛卡尔积中每一个元素的值如：d1:是一个值。 d2也是，则这些叫做分量，即：括号内每一个元素，

基数：若Di(i=1,2,3,..n)为有限集，其基数为Mi(i=1,2,...n)

笛卡尔积表示方法：可以表示为一张二维表，表中的行对应一个元组，表中的每一列对应一个域

```
例如：A={A1,A2} B={B1,B2} C={C1,C2,C3}

A1XB2XC3={（A1,B1,C1）,(A1,B1,C2),(A1,B1,C3),(A1,B2,C1),(A1,B2,C2),(A1,B2,C3),(A2,B1,C1),(A2,B1,C2),(A2,B1,C3),(A2,B2,C1),(A2,B2,C2),(A2,B2,C3)}看似和排列组合一样

则基数为2X2X3=12
同样可以转换为一张二维表

```

选择：

并集，差集：

```
Select A.*,B.*  // "投影"
From A,B // 笛卡尔积
Where A.c1=1 and A.c2=B.c2 or B.c1>100  // "选择"
UNION // 并集，差集
Select A.*,B.*
From A,B
Where A.c1=1 and A.c2=B.c2 or B.c1>100 

```

#### 常见的关系操作

查询的操作：选择，投影，连接，除，并，差，交，笛卡尔积，（选择，投影，并，差，笛卡尔积）基本操作

数据更新：插入，删除，修改

关系操作的特点：

集合操作方式：操作对象和结果都是集合，一次一集合的方式

#### 完整性检查：

##### 实体完整性：

- 实体完整性是针对基本关系而言，一个基本表通常对应现实世界的一个实体集，
- 实体可以区分具有唯一标识
- 关系模型以主码为唯一标识
- 主码中的属性不可以为空值

##### 参照完整性

若属性(或属性组)F是基本关系R额外码他与基本关系S的主码Ks相对应(基本关系R和S不一定是不同的关系)则对应R中的每个元组在F上必须为：空值(F上的属性均为空值)，或者等于S中的某个元组的主码值

##### 用户定义完整性

- 针对某一具体关系数据库的约束条件，反应某一具体应用所涉及的数据必须满足的语义要求
- 关系模型提供定义检验这类的完整性的机制，以便于用户统一系统的方法处理他们，而不需由应用程序承担，

### 数据库调优

数据库调优可以使得数据库应用运行的更快，目标是：使得数据库有更高的吞吐量，更短的相应时间。被调优的对象是整个数据库管理系统总体。查询语句调优：调优的对象是一条语句。

调优有以下方式：

#### 人工调优

主要依赖于人，效率低下，要求操作者完全理解常识所依赖的原理，还需对应用，数据库管理系统，操作系统，以及硬件有广泛的理解，最体现维护人员的价值。

#### 基于案例的调优

总结经典应用案例的情况中数据库参数的推荐配置值，数据逻辑层设计等，现况，从而为用户的调优工作提供一些案例和参考借鉴，但这种方式忽略了系统的动态性和不同系统的存在的差异系。

##### 自调优

为数据库系统建立一个模型，根据“影响数据库系统性能效率的因素”，数据库系统自动进行参数的配置。一些商业数据库，实现了部分自调优技术

### 数据库调优五个阶段的主要技术

1.应用情况的估算：

应用的使用情况（把业务逻辑转换为数据库的读写分布逻辑，以是读多写少还是读写均衡来换分OLTP和OLAP，应用数据库的并发情况，并发是否可以池化），数据量，对数据库的压力，峰值压力等做一个预估。

2.系统选型策略：

确定什么样的数据库可以适用应用场景，并确定数据库是使用的开源数据库还是商业数据库，是使用集群还是单机系统，同时对操作系统，中间件，硬件，网络等选型。

3.数据模型设计：主要根据业务逻辑，从几个角度考虑表的逻辑结构：

- E-R模型设计：遵循E-R模型设计原理，偶尔的适当程度的非规范化可以改善系统查询性能。
- 数据逻辑分布策略:目的减少数据请求的不必要的数据量，把用户需要的数据返回，可用的技术如分区，用E-R模型分表等(如互联网企业典型的用法，根据业务的不同，进行分库，分表操作)
- 数据物理存储策略:目的减少IO，如启用压缩技术，把索引和表数据的存储分开，不同的表的数据分布不同的表空间，不同表空间分布在不同的物理存储上（尤其是读写量大的表空间分布在不同的物理存储上），日志，索引和数据分布在不同的物理存储上
- 索引：在查询频繁的对象上建立索引，使用索引的正效应大于负效应（索引的维护存在消耗）

4.SQL设计

编写正确的，查询效率高的SQL语句，这依据的主要是“查询重写规则”,编写语句的过程要注意保障SQL能利用到索引

5.数据库功能的启用:数据库为提高性能的一些功能，可合理使用，具体如下：

- 查询重用：根据实际情况，进行配置，可缓存查询执行计划，查询结果等，
- 数据库参数的设置：可设置合适的参数如数据缓冲区等，模型系统预运行，在备用系统上模拟实际运行环境，加大压力进行系统测试，提前发现问题。

6.系统监控与分析，在工业环境中加强对系统的运行监控和日志的分析工作

- 应用系统表现：收集用户的信息，系统存在的问题，这都是用户第一时间发现的。
- OS环境监控：实现监控CPU,内存，IO等，并对比实时情况与历史正常情况。
- 数据库内部状况监控：一些数据库提供系统表，视图，工具等手段，向用户提供数据库运行过程中的内部信息，如锁的情况，这些都是需要实时的监控，并对比实时情况与历史正常情况。
- 日志分析：在数据库的日志，操作系统的日志中找出异常事件，定位问题。



### 数据库查询优化概述

数据库查询优化技术主要包括查询重用技术，查询重写技术，查询算法优化技术，并行查询优化技术，分布式查询优化技术，这6项构成“广义数据库查询优化”

查询重写技术，查询算法优化技术可称为“狭义数据库查询优化”

可分为代数优化(逻辑优化)或非代数优化(物理优化)

逻辑优化：主要依据关系代数的等价变化做一些逻辑变换  如：“查询重写规则”

物理优化：主要根据数据读取，表连接，表连接顺序，等技术。如：“查询算法优化”

#### 查询优化技术

##### 查询重用技术：

查询重用技术是尽可能利用先前的执行结果，已到达节约查询计算全过程的时间并减少资源消耗的目的，目前的查询重用技术集中在两个方面：

- 1.查询结果重用：在缓冲区中存放该SQL语句文本和最后的结果集，当同样的SQL输入时，直接把结果返回。查询结果的重用技术，节约计划生成时间，减少了查询执行全过程的资源消耗。
- 2.查询计划的重用：缓存一条查询语句的执行计划及其相应的语法树结构，查询计划的重用技术减少了查询计划生成的时间和资源消耗。

查询重用技术利弊：

弊端：结果集很大会消耗内存资源很多，同样的SQL不同的用户应该获取的结果集可能不同。

利端：节约CPU和IO消耗，在实际使用过程中，趋利避害，根据实际情况选用。

##### 查询重写：

查询重写是查询语句的一种等价转换，即对任何相关模式的任意状态都会参生相同的结果。

1.将查询转换为等价的效率更高的形式，例如将效率低的谓词转换为效率高的谓词，消除重复条件

2.尽量将重写为等价，简单且不受表顺序限制的形式，为物理查询优化阶段提供更多的选择，如视图的重写，子查询的合并转换等。

重写依据：

1.关系代数的等价变换规则对查询重写提供了理论支撑。

2.查询重写后，查询优化器可能生成多个连接路径，可以从候选者中择优

查询重写是基于语法级，代数级，语义级的优化，可以统一归属到逻辑优化的范畴：基于代价估算模型是物理层面的优化，是从连接途径中选择代价最小的路径的过程。

重写思路：

1.将过程性查询转换为描述性的重写，如视图重写

2.将复查的查询(如嵌套，外连接消除，嵌套连接消除)尽可能转换为多表连接查询。

3.将效率低的谓词转换为效率高的谓词（如等价谓词重写）

4.利用等式和不等式的形式，简化Where,Having条件

5.如何改进现有查询重写规则的效率，如何发现更多更有效的重写规则，是查询优化的研究内容之一

重写的核心一定是“等价转换”只有等价才能转换。

#### 查询优化技术类型

1.语法级：查询语言层的优化，基于语法进行优化，

2.代数级：查询使用形式逻辑进行优化，运用关系代数的原型优化

3.语义级：根据完整性约束，对查询语句进行语义分析，推知一些可优化的操作。

4.物理级：物理优化技术，基于代价估算模型，比较得出各种执行方式代价最小的。

#### 查询优化算法 ：

查询优化求解给定查询语句的高效执行计划过程。包括子问题的求解，不同子问题的求解过程。

查询计划称为查询树，他由一系列内部的操作符组成，这些操作符被按一定的运算关系构成一个查询的执行方案。简单的说是，就是A和B先连接，得到中间结果，然后在和另外的表C连接到新的中间放式，直至所有表都被连接完毕。

#### 生成最优查询计划的策略：

1.基于规则优化：

根据经验或一些，已经探知或被证明的有效的方式，定义为“规则”，用这些规则简化查询计划生成过过程中符合可被化简操作，使用启发式规则排除一些明显不好的存取路劲，这就是基于规则的优化。

2.基于代价优化：
根据一个代价评估模型，在生成查询计划的过程中，计算每条存取路径的花费，然后选择代价最小的最为子路径，这样直至所有表连接完毕得到一个完整的路径。总代价=CPU代价+IO代价

Mysql和PostgreSQL就是采取的基于规则和代价估算的查询优化策略

##### **Mysql显示SQL语句的查询执行计划：**

EXPLAIN[explain_type] explainable_stmt

可选项包括：exteded|partitions|format=format_name

format_name:TRADITIONAL|JSON

说明：
1.ExPLAIN命令，显示SQL语句查询执行计划

2.EXPLAINEXTENDED,显示SQL语句的详细的查询执行计划；之后可以用“SHOW WARNINGS"命令查看详细的信息。

3.EXPLAIN PARTITION命令显示SQL语句的带有分区表细腻度的查询执行计划。

4.EXPLAIN命令输出格式有两种：json和传统类型，按行隔离。

5.explainable_stmt,可以被EXPLAIN执行的SQL语句，包括：Select,insert,update,delete

##### Explain

###### id

- id相同，执行顺序由上至下
- id不同，如果是子查询，id的序号会递增，id值越大优先级越高，越先被执行
- id有相同、不同，不同的按越大越先执行，相同的按顺序执行

###### select_type

- simple：简单的select查询，查询中不包含子查询或者union
- primary：查询中若包含任何复杂的子部分，最外层查询则被标记为此
- subquery：在select或where列表中包含了子查询
- derived：在from列表中包含的子查询被标记为derived,MySQL会递归执行这些子查询 把结果放在临时表里。

- union：若第二个select出现在union之后，则标记为union；若union包含在from子句的子查询中，外层select将被标记为：derived

- union result：从union表获取结果的select 

###### table

所操作的表

###### type

字段表明优化器可以使用索引来搜索一个特定区间的值。

性能：system > const > eq_ref > ref > range > index > all

全版：

system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > all

一般保证查询至少达到range级别，最好能达到ref

- all：full table scan 将遍历全表以找到匹配的行
- index：full index scan，index与all区别为：index类型只遍历索引树。这通常比all快，因为索引文件通常比数据文件小。（也就是说虽然all和index都是读全表，但index是从索引中读取而all是从硬盘中读）
- range：只检索给定范围的行，使用一个索引来选择行。key列显示使用了哪个索引，一般就是在你的where语句中出现了between、<、>、in等的查询。这种范围扫描，索引扫描比全表扫描要好，因为它只需要开始于索引的某一点，而结束于另一点，不用扫描全部索引。
- ref：非唯一性索引扫描，返回匹配某个单独值的所有行，本质上也是一种索引访问，它返回所有匹配某个单独值的行，然而，它可能会找到多个符合条件的行，所以他应该属于查找和扫描的混合体
- eq_ref：唯一索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或唯一索引扫描。
- const：表示通过索引一次就找到了，const用于比较primary key或者unique索引。因为只匹配一行数据，所以很快。如将逐渐置于where列表中，MySQL就能将该查询转换为一个常量
- system：表只有一行记录(等于系统表)，这是const类型的特例，平时不会出现，可以忽略不计
- null

###### possible_keys

显示可能应用在这张表中的索引，一个或多个。查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询实际使用。

###### key

实际使用的索引。如果为NULL，则没有使用索引。查询中若使用了覆盖索引，则该索引仅出现在key列表中。

###### key_len

表示索引中使用的字节数，可通过该列计算查询中使用的索引长度。在不损失精确性的情况下，长度越短越好。

key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，不是通过表内检索出的。

###### ref

显示索引的哪一列被使用了，如果可能的话，是一个常数。哪些列或常量被用于查找索引列上的值。

###### rows

根据表统计信息及索引选用情况，大致估算出找到所需的记录所需要读取的行数。

###### extra

包含不适合在其他列中显示但十分重要的额外信息

- using filesort：说明mysql会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取。MySQL中无法利用索引完成的排序操作称为“文件排序”。
- using temporary：使用了临时表保存中间结果，MySQL在对查询结果排序时使用临时表。常见于排序order by和分组查询group by。
- using index： 表示相应的select操作中使用了覆盖索引，避免访问了表的数据行，效率不错。如果同时出现using where，表明索引被用来执行索引键值的查找；如果没有同时出现using where，表明索引用来读取数据而非执行查找动作。
- using where：表示使用了where过滤
- using join buffer：使用了连接缓存
- impossible where：where字句的值总是false，不能用来获取任何元祖
- select tables optimized away：在没有groupby子句的情况下，基于索引优化MIN/MAX操作或者对于MyISAM存储引擎优化count(*)操作，不必等到执行阶段再进行计算，查询执行计划生成阶段即完成优化。
- distinct：优化distinct操作，在找到第一匹配的元组后即停止找同样值的动作。

#### 查询优化并行的条件：

1.系统中的可用资源，如内存，高速缓存中的数据量

2.cpu的数目，

3.运算中的特定代数运算符。

在同一个SQL内查询并行可以分为：

1.操作内并行。将同一操作如单表扫描操作，两表连接操作，排序操作，分解为独立的自操作，由不同的CPU同时执行。

2.操作间并行。一条SQL查询语句可以分解为多个子操作，由多个CPU执行。

在分布式数据库系统中，查询策略优化是查询优化的重点。主要是数据传输策略，A,B两两节点的数据进行连接，是A节点数据传输到B节点或是B到A节点和局部处理优化（传统的单节点数据库的查询优化技术）分布式的数据库系统中的代价估算模型为 总代价=IO代价+CPU代价+通信代价

### 查询的基本操作：

##### 选择操作：

对应的是限制条件(格式类似`field<op> consant`,field表示列对象，op是操作符，”=”，“>")操作对象是二维表中的行。

优化方式：选择操作下推

目的：尽量减少连接操作前的元数组，使得中间临时关系尽量少（元组数少得到连接的元组数就少）

好处：减少IO和CPU消耗，节约内存空间。

##### 投影操作：

对应的是Select查询的目的列对象，

优化方式：投影操作下推

目的：尽量减少连接操作前的列数，使得中间临时关系尽量小（投影操作是使得一条元组“尽量小”）

好处：这样不能减少IO（多数数据库都是行存储，元组是读取的最基本单位，所以想要操作列则必须读取一行数据）,但是可以减少连接后的元组的大小，节约内存空间。

##### 连接操作：

对应的是连接条件（格式类似于`field_1<op>field_2`,field_1和field_2是表示不同表上的列对象，op是操作符，表示两个表连接的条件。

多表连接中每个表被连接的顺序决定这效率。对个表之间那种连接方式最高效，是ABC,还是ACB,还是BAC

多表连接每个表被连接的顺序被用户语义定义，查询语句多表连接有不同的语义（笛卡尔积，内联，外联）这些决定这表之间的前后连接次序是不能随意更换的，否者结果集中的数据是不同的，因此，表的前后连接次序是不能随意变换的。

### 逻辑查询优化包括的技术

##### 子查询：

当一个查询是另一个查询的子部分时，称为子查询。（查询语句中嵌套有查询语句）

##### 子查询的子部分包括的情况：

1.目标列位置：子查询如果位于目标列，则只能标量子查询，否者数据库可能出现“错误：子查询必须只能返回一个字段”的提示。

子查询返回的是一个列记录，可以称为标量 select t1,c1,(select t2.c2,from t2 where k2=1) from t1,t2

2.from子句的位置：

select*from t1,(select * from t2 where t1.k1=t2.k2)  error:every derived table must have its own alias

select*from t1,(select * from t2 where t1.k1=t2.k2) As A_at2 error: unKonow column 't1.k1' in 'where clause'

3.where子句的位置

出现在where子句的子查询是一个条件表达式的一部分，而表达式可以分解为操作符和操作数，根据参与运算的不同的数据类型，操作符也不尽相同如int型：“<,>,=,<>”等，对这子查询均有一定的要求(如int型的等值操作，要求子查询必须是标量子查询)。另外子查询出现在where子句中的格式，也有用谓词指定的一些操作如In,between,exists,等。any 可以与=、>、>=、<、<=、<>结合起来使用，分别表示等于、大于、大于等于、小于、小于等于、不等于其中的任何一个数据

select * from t1 where k1 in(select k2 from t2)

select * from t1 where k1 >=ANY(select k2 from t2)  any关键词可以理解为“对于子查询返回的列中的任一数值，如果比较结果为true，则返回true”。

select * from t1 where k1 <=SOME(select k2 from t2)

select * from t1 where NOT EXISTS (select k2 from t2 where k2=100)

4.Join/oN子句位置：

Join/oN子句可以拆分为两部分，一是Join块类似于from子句，二是on块类似于where子句，这两部分都可以出现子查询。子查询的处理方式同from子句和where子句。

5.groupby子句位置：

目标列必须和groupBy关联，可以将子查询写在groupby位置处，但子查询用groupby处没有实用意义。

6.orderBy子句位置：

可以将子查询写在orderby位置处，但orderby操作是作用在整条SQL语句中，所以没有实际意义。

##### 子查询的类型---从对象关系间看

1.相关子查询：子查询的执行依赖外层父查询的一些属性值。子查询因依赖于父查询的参数，当父查询的参数改变时，子查询需要根据新参数值重新执行(查询优化器对相关子查询进行优化的意义)

2.非相关子查询：子查询的执行，不依赖于外层父查询的任何水属性值。这样子查询具有独立性，可独立求解，形成一个子查询计划优先于外层的查询计划。

##### 子查询的类型---从特定谓词看：

1.[not] in/all/any/some子查询。语义相近表示“存在/所有/任何/任何、”左面是操作数，右面是子查询，是最常见的子查询类型之一。

2.[not]exists子查询：半连接语义，表示“存在”，没有左操作数，右面是子查询，也是最常见的子查询类型之一

3.其他子查询

##### 子查询类型---从语句的构成复杂度看：

1.spj子查询：由选择投影，连接，组成的子查询。

2.groupby子查询：spj子查询加上分组，聚集操作组成的查询。

3.其他查询：GroupBy加上其他子查询如 top-N,limit/offset,集合，排序。

##### 子查询类型---从结果的角度看：

1.标量子查询：子查询返回的结果集类型是一个简单的值

2.单行单列子查询：子查询返回的结果集类型是零或一条单元组。相似与标量子查询，但可能返回零元组

3.多行单列子查询：子查询返回的结果集类型是多条元组，但只有简单列。

4.表子查询：子查询返回的结果类型是一个表。

#### 子查询优化：

在数据库实现早期，查询优化器对子查询一般采用嵌套执行方式，对父查询的每一行，都执行一次子查询，这样子查询会执行很多次。效率低。子查询优化后好处如下：子查询不用执行多次。优化器可以根据统计信息来选择不同的连接方法和不同的连接顺序。比如子查询的连接条件，过滤条件分别变成了父查询的连接条件，这种条件下推方式可以提高执行效率

##### 如何子查询优化：

###### 1.子查询合并： 

在某些条件下（语义等价：两个查询块产生同样的结果集）多个子查询能够合并成一个子查询（合并后还是子查询，以后通过其他技术消除掉子查询）这样可以把多次连接减少为单次表扫描和单次连接。mysql未提供支持

select * from t1 where a1<10 and (exists (select a2 from t2 where t2.a2<5 and t2.b2=1) OR exists (select a2 from t2 where t2.a2<5 and t2.b2=2))

可以优化为：

select *from t1 where a1<10 and (exists(select a2 from t2 where t2.a2<5 and (t2.b2=1OR t2.b2=2)) // 两个exists子句合并为一个，条件也进行了合并。

###### 2.子查询展开：

子查询反嵌套，又称子查询上拉。

把一些子查询置于外层的父查询，作为连接关系与外层父查询并列，其实是把某些子查询重写为等价的多表连接操作（展开后子查询不存在了，外部查询变为多表连接了。）带来的好处是，有关的访问路径，连接方法和连接顺序可能被有效使用，使得语句的层次尽可能减少。常见的in/any/some/all/exists依据情况转换为半连接，普通类查询等情况属于此类。

select * from t1,(select * from t2 where t2.a2>10) v_t2 wheret1.a1<10 and v_t2.a2<20：
可优化为：
select * from t1,t2 where t1.a1<10 and t2.a2<20 and t2.a2>10

###### 3.聚集子查询消除

通常一些系统支持的是标量聚集子查询消除

如： select * from where t1.a1>(select avg(t2.a2) from t2)

##### MySql可以优化哪些格式的子查询：

###### 支持对简单的select查询中的子查询优化包括：

- 简单的select查询中的子查询

- 带有Distinct,ORDERBY,LIMIT操作的简单SELECT查询中的子查询、


例如：

create table t1(a1 int,b1 int,primary key (a1));

create table t2(a2 int,b2 int,primary key (a2));

create table t3(a3 int,b3 int,primary key (a3));插入1万条数据

查询执行计划如下：

explain extended select * from t1 where t1.a1<100 and a1 in (select a2 from t2 where t2.a2>10);

| id   | select_type | table | type   | key     | Extra                   |
| ---- | ----------- | ----- | ------ | ------- | ----------------------- |
| 1    | simple      | t2    | range  | primary | using where;Using index |
| 1    | simple      | t1    | eq_ref | primary | Null                    |

###### Mysql不支持哪些子查询优化：

- 带有UNION操作。
- 带有groupby,having,聚集函数。
- 使用orderby中带有limit.
- 内表，外表的个数超过MySql支持的最大的连接数（63张表）。

**1.子查询合并技术不支持：例1：**

explain extended select * from t1 where a1<4 and (exists (select a2 from t2 where t2.a2<5 and t2.b2=1) or exists(select a22 from t2 where t2.a2<5 and t2.b2=2));

t2表中执行了2次子查询，如果支持子查询合并技术则天表置执行一次子查询。

人为合并查询 条件为 “t2.b2=1 or t2.b2=2” t2表上的子查询，子查询执行一次。

explain extended select * from t1 where a1<10 and exists (select a2 from t2 where t2.a2<5 And (t2.b2=1or t2.b2=2))

**2.子查询展开（子查询反嵌套）技术 支持的不够好：**

表中无主键的(支持例2，例3)：

create table t1(a1 int,b1 int);

create table t2(a2 int,b2 int);

create table t3(a3 int,b3 int);插入1万条数据

例2

explain extended select * from t1 ,(select * from t2 where t2.a2>10) v_t2 where t1.a1<10 and v_t2.a2<20;

查询计划上在t2上的子查询被单独执行，没和t1进行嵌套循环连接，子查询没有被消除，所以mysql支持子查询反嵌套技术有限。

例3：

explain extended select * from t1 where t1.a1<100 and a1 in (select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在表t2上的子查询被物化。没有被上拉到顶层与t1进行连接。所以物化是优化方式

| id   | select_type  | table       | type | key  | Extra                                             |
| ---- | ------------ | ----------- | ---- | ---- | ------------------------------------------------- |
| 1    | simple       | `<subquery2>` | all  | null | using where                                       |
| 1    | simple       | t1          | all  | null | using where;using join buffer (Block nested loop) |
| 2    | MaTERIALIZED | t2          | all  | null | using where                                       |

例4：

对于表中有主键的：

create table t1(a1 int,b1 int,primary key (a1));

create table t2(a2 int,b2 int,primary key (a2));

create table t3(a3 int,b3 int,primary key (a3));插入1万条数据

explain extended select * from t1 where t1.a1<100 and a1 in (select a2 from t2 where t2.a2>10)

| id   | select_type | table | type   | key     | Extra                   |
| ---- | ----------- | ----- | ------ | ------- | ----------------------- |
| 1    | simple      | t2    | rang   | primary | using where;using index |
| 1    | simple      | t1    | eq_ref | primary | null                    |

从查询计划上看子查询不存在了，sql语句被转换为内联结。这表明mysql只用针对主键列进行类似的子查询时，才把子查询上拉为内连接。所以mysql还是支持子查询展开技术。

**3.聚集查询消除 不支持**

Explain extend select * from t1 where t1.a1>(select min(t2.a2) from t2)

| id   | select_type | table | type | key        | Extra                        |
| ---- | ----------- | ----- | ---- | ---------- | ---------------------------- |
| 1    | Primary     | t1    | all  | t_index_t1 | using where;                 |
| 1    | subquery    | null  | null | null       | select tables optimized away |

Mysql为何不支持聚集子查询消除？

- 1.mysql认为聚集子查询，只需要执行一次，得到结果后，即可把结果缓冲到内存中供后续连接或过滤等操作使用，没有必要消除子查询。
- 2.如果子查询在索引列上执行，则会更快得到查询结果，更加加速查询速度。

##### Mysql支持哪些类型的子查询进行优化？

**1.mysql不支持对exists类型的子查询的优化**

explain extended select * from t1 where exists (select 1 from t2 where t1.a1=t2.a2 and t2.a2>10)

| id   | select_type         | table | type | key  | Extra        |
| ---- | ------------------- | ----- | ---- | ---- | ------------ |
| 1    | Primary             | t1    | all  | null | using where; |
| 1    | dependent  subquery | t2    | all  | null | using where; |

从查询执行计划中可以看到exists子查询依然存在。

**2.mysql不支持对 not exists类型的子查询的优化**

explain extended select * from t1 where  not  exists (select 1 from t2 where t1.a1=t2.a2 and t2.a2>10)

| id   | select_type         | table | type | key  | Extra        |
| ---- | ------------------- | ----- | ---- | ---- | ------------ |
| 1    | Primary             | t1    | all  | null | using where; |
| 1    | dependent  subquery | t2    | all  | null | using where; |

从查询执行计划中可以看到 not exists子查询依然存在。表名mysql没有被sql语句进行上拉到主的查询语句中。

**3.mysql支持对 in类型的子查询的优化**

in非相关的子查询

explain extended select * from t1 where t1.a1 in (select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在表t2上的子查询被物化。物化后又进一步的优化为半连接（上拉操作为同一层）。所以物化是优化方式

| id   | select_type  | table       | type | key  | Extra                                             |
| ---- | ------------ | ----------- | ---- | ---- | ------------------------------------------------- |
| 1    | simple       | `<subquery2>` | all  | null | using where                                       |
| 1    | simple       | t1          | all  | null | using where;using join buffer (Block nested loop) |
| 2    | MaTERIALIZED | t2          | all  | null | using where                                       |

in相关的子查询

explain extended select * from t1 where t1.a1 in (select a2 from t2 where t1.a1=100)

从查询执行计划中可以看到 in 子查询被优化为半连接操作。

| id   | select_type | table | type | key  | Extra                                             |
| ---- | ----------- | ----- | ---- | ---- | ------------------------------------------------- |
| 1    | simple      | t2    | all  | null | using where                                       |
| 1    | simple      | t1    | all  | null | using where;using join buffer (Block nested loop) |

**4.mysql支持对 not in类型的子查询的优化**

not in 非相关的子查询

explain extended select * from t1 where t1.a1 not in (select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在表t2上的子查询被物化。但没有消除子查询。部分优化

| id   | select_type | table | type | key  | Extra       |
| ---- | ----------- | ----- | ---- | ---- | ----------- |
| 1    | primary     | t1    | all  | null | using where |
| 1    | subquery    | t2    | all  | null | using where |

**5.mysql支持对all类型的子查询的优化**

不相关的all子查询

explain extended select * from t1 where t1.a1 >all  (select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在all子查询被转换为max运算。

| id   | select_type | table | type | key  | Extra       |
| ---- | ----------- | ----- | ---- | ---- | ----------- |
| 1    | primary     | t1    | all  | null | using where |
| 1    | subquery    | t2    | all  | null | using where |

不相关的all子查询

explain extended select * from t1 where t1.a1 =all  (select a2 from t2 where t2.a2=10)

重查询计划上可以看得出在=all子查询被转换为exists方式优化。

| id   | select_type         | table | type | key  | Extra       |
| ---- | ------------------- | ----- | ---- | ---- | ----------- |
| 1    | primary             | t1    | all  | null | using where |
| 1    | dependent  subquery | t2    | all  | null | using where |

不相关的all子查询

explain extended select * from t1 where t1.a1 <all  (select a2 from t2 where t2.a2=10)

重查询计划上可以看得出在all子查询被转换为>min运算方式的优化。

| id   | select_type | table | type | key  | Extra       |
| ---- | ----------- | ----- | ---- | ---- | ----------- |
| 1    | primary     | t1    | all  | null | using where |
| 1    | subquery    | t2    | all  | null | using where |

**6.mysql支持对some类型的子查询的优化**

不相关的some子查询

explain extended select * from t1 where t1.a1 >some(select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在>some子查询被转换为>min运算。

| id   | select_type | table | type | key  | Extra       |
| ---- | ----------- | ----- | ---- | ---- | ----------- |
| 1    | primary     | t1    | all  | null | using where |
| 1    | subquery    | t2    | all  | null | using where |

不相关的some子查询

explain extended select * from t1 where t1.a1 =some (select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在表t2上的子查询被物化。物化后又进一步的优化为半连接（上拉操作为同一层）。所以物化是优化方式

| id   | select_type  | table       | type | key  | Extra                                             |
| ---- | ------------ | ----------- | ---- | ---- | ------------------------------------------------- |
| 1    | simple       | `<subquery2>` | all  | null | using where                                       |
| 1    | simple       | t1          | all  | null | using where;using join buffer (Block nested loop) |
| 2    | MaTERIALIZED | t2          | all  | null | using where                                       |

不相关的some子查询

`explain extended select * from t1 where t1.a1 <some(select a2 from t2 where t2.a2=10)`

重查询计划上可以看得出在`<some子查询被转换为<max运算的优化方式`。

| id   | select_type | table | type | key  | Extra       |
| ---- | ----------- | ----- | ---- | ---- | ----------- |
| 1    | primary     | t1    | all  | null | using where |
| 1    | subquery    | t2    | all  | null | using where |

**7.mysql支持对 any类型的子查询的优化**

explain extended select * from t1 where t1.a1 >any(select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在>any子查询被转换为>min运算。

| id   | select_type | table | type | key  | Extra       |
| ---- | ----------- | ----- | ---- | ---- | ----------- |
| 1    | primary     | t1    | all  | null | using where |
| 1    | subquery    | t2    | all  | null | using where |

explain extended select * from t1 where t1.a1 =any(select a2 from t2 where t2.a2>10)

重查询计划上可以看得出在表t2上的子查询被物化。物化后又进一步的优化为半连接（上拉操作为同一层）。所以物化是优化方式

| id   | select_type  | table       | type | key  | Extra                                             |
| ---- | ------------ | ----------- | ---- | ---- | ------------------------------------------------- |
| 1    | simple       | `<subquery2>` | all  | null | using where                                       |
| 1    | simple       | t1          | all  | null | using where;using join buffer (Block nested loop) |
| 2    | MaTERIALIZED | t2          | all  | null | using where                                       |

`explain extended select * from t1 where t1.a1 <any(select a2 from t2 where t2.a2=10)`

重查询计划上可以看得出在`<some子查询被转换为<max运算的优化方式`。

| id   | select_type | table | type | key  | Extra       |
| ---- | ----------- | ----- | ---- | ---- | ----------- |
| 1    | primary     | t1    | all  | null | using where |
| 1    | subquery    | t2    | all  | null | using where |

#### 视图重写与等价谓词重写：

##### 视图概念

视图是数据库中基于表中的一种对象，把表的查询固化，这种固化就是视图.

```sql
CREATE
	[OR REPLACE]
	[ALGORITHM={UNDEFINED|MERGE|TEMPTABLE}]
	[DEFINER={user|current_USER}]
	[SQL SECURITY {DEFINER | INVOKER}]
	VIEW view_name[(column_list)]
	as select_statement [With[CASCADED | LOCAL] CHECK OPTION]
```

##### 视图类型

1.用SPJ格式构造的视图，称为简单视图。

CREATE VIEW AS Select x,y,z from t;

2.用非SPJ格式构造的视图（带有GROUP BY 等操作） 称为复杂视图。

CREATE VIEW v2 AS SELECT x,y,z from t ORDER BY x;

##### 什么是视图重写

查询语句中出现视图对象

查询优化后，视图对象消失

消失的视图对象的查询语句，融合到初始查询语句中。

**视图重写实例**

```sql
create table t_a(a INt,b INt);
create VIEW v_a as Select * from t_a

#基于视图的查询命令
select col_a from v_a where col_b>100

#经过视图重写后可变为如下形式
select col_a from (select col_a,col_b from t_a) where col_b>100

#未来经过优化后可以变换为如下的等价形式
select col_a from t_a where col_b>100;
```

##### mysql视图重写准则

1. 优化方法是把视图转为对基表的查询，然后对类似子查询的优化
2. mysql通常之呢个重写简单的视图，复杂的视图不能重写
3. .Mysql支持对视图进行优化

```sql
create table t1(a1 INt,b1 INt);
create table t2(a2 INt,b2 INt);
create table t3(a3 INt,b3 INt);

#创建简单的视图
Create VIEW v_t_1_2 as select * from t1,t2;

#创建复杂的视图
create view v_t_gd_1_2 as select Distinct t1.b1 from t1,t2,Group by t1.b1,t2.b2

```

##### 什么是等价谓词重写

把逻辑表达式重写成等价的且效率更高的形式。**能够有效提高查询执行效率。**  基本上都是为了使用索引

##### 常见的等价谓词重写实例1：LIKE 规则

###### LIKE 规则

like谓词是SQL标准支持的一种模式匹配比较的操作，

Like规则是对LIke谓词的等价重写，即改写Like谓词为其他等价的谓词，以更好地利用索引进行优化。

```sql
name LIke 'Abc%'
重写为： name >='Abc' AND name <'Abd'
```

转换前针对like谓词，只能进行全表扫描，如果name列存在索引，则转换后可以进行索引扫描

##### 常见的等价谓词重写实例2 ：BETWEEN  AND 

between -and 是sql标准支持的一种范围比较操作。between -and规则是对between -and谓词的等价重写，即改写between -and谓词为其他等价的谓词，以更好地利用索引进行优化。

```sql
sno between 10 and 20
重写为： sno >=10 AND sno <=20
如果sno列存在索引，则转换后可以进行索引扫描
```

##### 常见的等价谓词重写实例3 ：IN转为OR

In是指的是in操作符操作。

in转为or的规则，就是in谓词的 or等价重写，即改写IN谓词为等价的OR谓词，以更好地利用索引进行优化。

将in谓词等价重写为若干OR谓词 **可能**会提高查询效率

```
age in (8,12,21)
重写为 age=8 OR age =12 OR age = 21
in转为OR的规则是否提高查询效率，需要看数据库对IN谓词是否支持全表扫描。
如果数据库对IN谓词支持全表扫描，且OR谓词中表的age列上存在索引，则转换后查询效率会提高
```

##### 常见的等价谓词重写实例4 ：IN转为ANY

in转为any的规则，就是in谓词的 any等价重写，即改写IN谓词为等价的any谓词，以更好地利用索引进行优化。

将in谓词等价重写为若干OR谓词,OR谓词可转ANY谓词，所以in可以等价重写为ANY谓词  **可能**会提高查询效率

##### 常见的等价谓词重写实例5 ：OR转为ANY

OR转为any的规则，就是OR谓词的 any等价重写，即改写OR谓词为等价的any谓词，以更好地利用MIN/MAX进行优化。

##### 常见的等价谓词重写实例6 ：ALL/ANY转换为聚焦函数

ALL/ANY转换为聚集函数规则，就是ALL/ANY谓词改写为等价的聚集函数MIN/MAX谓词操作，以更好地利用MIN/MAX进行优化

```
sno > ANY (10,2*5+3,sqrt(9))
重写为 sno>sqrt(9)
```

##### 常见的等价谓词重写实例7 ：Not规则

not规则重写好处：如果col_1上建立了索引，则可以用索引扫描代替全表扫描提高查询效率

```
NOT (col1!=2) ===> col1=2
```

##### 常见的等价谓词重写实例8 ：OR重写并集规则

```
Select * from student where (sex='f' and age>15) OR age>18
# 及色号sex 和age都存在索引，数据库可能对示例中的where语句强迫查询优化器使用顺序扫描，因为这个语句要检索的是OR操作的集合
改写为一下方式
select * from student where sex= 'f and age >15'
union
select * from student where age>18
#改写后都利用了索引进行扫描
```

#### 条件化简：

##### 什么是条件 

sql查询语句中，对元组进行过滤和连接的表达式，从形式上出现在 where join having 

```
select 
[ where where_condition]
[HAVING where_codition]

join_codition:
	ON coditional
```

##### 条件优化技术

###### 条件下推(系统自己优化，无需人为干涉)

把与单表相关的条件，放到单表进行扫描的过程中执行

```
select * from A,B
where A.a=1 and A.b=B.b
扫描顺序：
1.扫描A表，并带有条件A.a=1把A作为嵌套循环的外表
2.扫描B表，执行连接操作，并带有过滤条件A.b=B.b
```

###### 条件化简

where join-ON  having  

利用等式不等式的性质进行化简

**把Having条件并入到Where 条件。**

便于同于，集中化简条件字句，节约化简时间。 只有SQL不存在GROUP BY条件或聚集函数的情况下，才能够将Having条件与Where条件进行合并

```
select * from t3 where a3>1 having b3=3
转换为：
select * from t3 where a3>1 and b3=3
```

**去除表达式中冗余括号 - 减少CPU 消耗**

简少语法分析是产生的AND和OR树的层次

```
(（A AND b）and(c AND d))
化简为 a AND b AND c AND d
```

**常量传递**

对不同关系可以使得条件分离后 有效实施“选择下推” ，从而极大减少中间的关系的规模

```
col1=col2 AND col2=3
化简为
col1 =3 and col2=3
```

操作符“=，<,>,<=,>=,<>,Like”中的任何一个 在“col <操作符> col2”条件中都可能会发生常量传递。

**消除死码**

化简条件，将不必要的条件去除。

```
where(0>1 AND s1=5)
"0>1" 恒为假，则where条件恒为假
```

**表达式计算**

对可以求解的表达式进行计算得出结果

```
where col1=1+2
转换为
where col1=3
```

**等式变换**

化简条件，从而改变某些表的访问路径

**不等式变换**

化简条件，将不必要的条件去除。

```
a>10 AND b=6 and a>2
可化简为
b=6 and a>10
```

**布尔表达式变化---谓词传递闭包**

一些比较操作，如“<”,">" 具有传递性

```
a>b and b>2
可以推导出 a>b and b>2 and a>2
这样就可以减少比较a>b的元组了
```

**布尔表达式变化---转换为等价的合取范式**

任何一个布尔表达式都能被转换为一个等价的合取范式

**布尔表达式变化--索引的使用**

如果一个合取项存在索引，则先判断索引是否可用，如果能利用索引快速得出合取项的值，则能加快判断速度。同理，or 表达式中的子项也可以利用索引。

##### MYSQl 对条件简化的支持

**把Having条件并入到Where 条件 ：不支持。**

**去除表达式中冗余括号 - 减少CPU 消 耗  ： 支持**

**常量传递 ：支持**

**消除死码 ： 支持**

**表达式计算 ：支持**

**等式变换 ：不支持**

**不等式变换 ：不支持**

**布尔表达式变化---谓词传递闭包：不支持**

**布尔表达式变化---转换为等价的合取范式 ：支持**

**布尔表达式变化--索引的使用 ： and 操作符是可以交换的：支持**

**IS NULL 表达式 优化：支持，利用索引，支持“ is null” 表达式的优化。**

#### 外连接消除，嵌套连接的消除与连接消除

left join :左外连接，

左外连接结果集包括：Left Out join 子句中指定的左表的所有行，而不仅仅是连接列所匹配的行，如果左表的某行在右边表中没有匹配行，则在相关联的结果集中右表的所有选择列表列均为空值。

right join ：右外连接

右向外连接是左外连接的反相连接，将返回右边表的所有行，如果右表的某行在左表中没有匹配行，则为左表返回空值。

full join: 全外连接

全外连接返回左表和右表中的所有的行，当某行在另一个表中没有匹配行时，则另一个表中没有匹配行时，则另一个表的选择列表列包含空值，如果表之间有匹配行，则整个结果集行包含基表的数据值。

**外连接消除**

把外连接变为内连接。

A OUTER JOIN B 变形为 A JOIN B

**外连接消除的意义**

1.查询优化器在处理外连接操作时所需执行的操作和时间多余内连接。

2.外连接消除后，优化器在选择多表连接顺序时，可以有更多灵活的选择，从而可以选择更好的表连接顺序，加快查询执行的速度。

3.表的一些连接算法在将规模小的或筛选条件最为严格的表作为“外表” （放在连接顺序的最前面，是多层循环体的外层循环）可以减少不必要的I/O开销，能加快算法执行的速度。





#### 语义优化：



#### 非SPJ的优化：



