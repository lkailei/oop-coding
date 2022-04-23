---
title: Hibernate
autoGroup-2: 高级
---
## Hibernate

​	Hibernate:对象关系映射框架 主要完成数据的持久化，轻量级的ORM(对象关系映射)工具。是一个高性能的对象关系型持久化存储和查询的服务，其遵循开源的 GNU Lesser General Public License (LGPL) 而且可以免费下载。

​	Hibernate 不仅关注于从 Java 类到数据库表的映射，也有 Java 数据类型到 SQL 数据类型的映射，另外也提供了数据查询和检索服务。

​	Hibernate是一个开放源代码的对象关系映射框架，它对JDBC进行了非常轻量级的对象封装，它将POJO与数据库表建立映射关系，

​	是一个全自动的orm框架，hibernate可以自动生成SQL语句，自动执行，使得Java程序员可以随心所欲的使用对象编程思维来操纵数据库。

​	将 Java 类映射到数据库表中，从 Java 数据类型中映射到 SQL 数据类型中，并把开发人员从 95% 的公共数据持续性编程工作中解放出来。

​	Hibernate 是传统 Java 对象和数据库服务器之间的桥梁，用来处理基于 O/R 映射机制和模式的那些对象。

​	Hibernate可以应用在任何使用JDBC的场合，既可以在Java的客户端程序使用，也可以在Servlet/JSP的Web应用中使用，最具革命意义的是，

​	Hibernate可以在应用EJB的J2EE架构中取代CMP，完成数据持久化的重任。主要封装了数据库的访问细节，通过配置文件链接关系数据库和程序中的实体类

### Hibernate主要的类库

#### 配置类（congiguration）:

​	负责管理hbernate的配置信息以及启动hibernate，配置会读取数据库底层的信息：url,user,password,驱动类,数据库配置器

#### 会话工厂类（SessionFactory）:

​	生成session工厂，保存数据映射关系，线程安全，创建时耗费资源，主要负者保存和使用配置信息消耗内存资源2.用于获得Session的核心数据，属于线程安全的，保证只创建一个工厂类

#### 会话类：（session）

​	Session 用于获取与数据库的物理连接。 Session 对象是轻量级的，并且设计为在每次需要与数据库进行交互时被实例化。持久态对象被保存，并通过 Session 对象检索找回。该 Session 对象不应该长时间保持开放状态，因为它们通常不能保证线程安全，而应该根据需求被创建和销毁。
​	Session 的主要功能是为映射实体类的实例提供创建，读取和删除操作。这些实例可能在给定时间点时存在于以下三种状态之一：
​								

- 瞬时状态: 一种新的持久性实例，被 Hibernate 认为是瞬时的，它不与 Session 相关联，在数据库中没有与之关联的记录且无标识符值。
- 持久状态：可以将一个瞬时状态实例通过与一个 Session 关联的方式将其转化为持久状态实例。持久状态实例在数据库中没有与之关联的记录，有标识符值，并与一个 Session 关联。
- 脱管状态：一旦关闭 Hibernate Session，持久状态实例将会成为脱管状态实例。负者将hibernate所有的持久化，可以实现数据库的增删改查，线程不安全，不要多个线程共有一个session.

#### 持久化类：

​		Hibernate 的完整概念是提取 Java 类属性中的值，并且将它们保存到数据库表单中。映射文件能够帮助 Hibernate 确定如何从该类中提取值，并将它们映射在表格和相关域中。

​		在 Hibernate 中，其对象或实例将会被存储在数据库表单中的 Java 类被称为持久化类。若该类遵循一些简单的规则或者被大家所熟知的 Plain Old Java Object (POJO) 编程模型，

​		Hibernate 将会处于其最佳运行状态。以下所列就是持久化类的主要规则，然而，在这些规则中，没有一条是硬性要求。所有将被持久化的 Java 类都需要一个默认的构造函数。为了使对象能够在 Hibernate 和数据库中容易识别，所有类都需要包含一个 ID。此属性映射到数据库表的主键列。所有将被持久化的属性都应该声明为 private，并具有由 JavaBean 风格定义的 getXXX 和 setXXX 方法。

​		Hibernate 的一个重要特征为代理，它取决于该持久化类是处于非 final 的，还是处于一个所有方法都声明为 public 的接口。所有的类是不可扩展或按 EJB 要求实现的一些特殊的类和接口。POJO 的名称用于强调一个给定的对象是普通的 Java 对象，而不是特殊的对象，尤其不是一个 Enterprise JavaBean。

​		特点：对数据转化为Java对象，提供线程和进程的缓存机制，有丰富的映射方式将Java对象之间的关系转换为数据库表之间的关系.屏蔽不同数据库实现之间的差异非入侵式的不需要持久化类实现任何口，

##### 持久化类的规则为:

- 1.必须实现一个默认的构造函数，无参：便于hibernate通过ConStructor.newInstance()实例持久化类；
- 2.提供属性标识
- 3.提供非final类
- 4.生明属性的访问
  Hibernate的API一共有6个，分别为:Session、SessionFactory、Transaction、Query、Criteria和Configuration。通过这些接口，可以对持久化对象进行存取、事务控制。

### ORM

ORM(对象关系映射)：

​	 表示 Object-Relational Mapping (ORM)，是一个方便在关系数据库和类似于 Java， C# 等面向对象的编程语言中转换数据的技术。

​	在 Java 中有几个持久化的框架和 ORM 选项。一个持久化的框架是 ORM 存储和索引对象到关系型数据库的服务。

​		Enterprise JavaBeans Entity Beans

​		Java Data Objects

​		Castor

​		TopLink

​		Spring DAO

​        Hibernate

​		And many more

### JDBC

​      JDBC 代表 Java Database Connectivity ，它是提供了一组 Java API 来访问关系数据库的 Java 程序。这些 Java APIs 可以使 Java 应用程序执行 SQL 语句，能够与任何符合 SQL 规范的数据库进行交互。JDBC 提供了一个灵活的框架来编写操作数据库的独立的应用程序，该程序能够运行在不同的平台上且不需修改，能够与不同的 DBMS 进行交互。
​优势：

	- Hibernate 使用 XML 文件来处理映射 Java 类别到数据库表格中，并且不用编写任何代码。
	- 为在数据库中直接储存和检索 Java 对象提供简单的 APIs。
	- 如果在数据库中或任何其它表格中出现变化，那么仅需要改变 XML 文件属性。
	- 抽象不熟悉的 SQL 类型，并为我们提供工作中所熟悉的 Java 对象。
	- Hibernate 不需要应用程序服务器来操作。
	- 操控你数据库中对象复杂的关联。
	- 最小化与访问数据库的智能提取策略。
	- 提供简单的数据询问。
	- 支持大多数主流的数据库管理系统。支持技术：XDOCLet Spring J2EE，Eclipse plug-ins,Maven,
  ### 架构：

​	Hibernate 使用不同的现存 Java API，比如 JDBC，Java 事务 API（JTA），以及 Java 命名和目录界面（JNDI）。

​	JDBC 提供了一个基本的抽象级别的通用关系数据库的功能，Hibernate 支持几乎所有带有 JDBC 驱动的数据库。

​	JNDI 和 JTA 允许 Hibernate 与 J2EE 应用程序服务器相集成。

​	Java Application---->hibernate------>database; hibernate中配置：hibernate.xml ,和XML Mapping;

​		--->持久化对象		     |---> |--------------------->JTA,JDBC,JNDI

​							    |----> configuration,session factory,session, Transaction, Query Criteria,

### 配置对象：

​	配置对象是你在任何 Hibernate 应用程序中创造的第一个 Hibernate 对象，并且经常只在应用程序初始化期间创造。它代表了 Hibernate 所需一个配置或属性文件。配置对象提供了两种基础组件。

​	数据库连接：由 Hibernate 支持的一个或多个配置文件处理。这些文件是 hibernate.properties 和 hibernate.cfg.xml。

​	类映射设置：这个组件创造了 Java 类和数据库表格之间的联系。

### O/R映射：

主要有集合的映射，实体类之间的关联映射以及组件映射。

**集合映射：**

​	如果一个实例或者类中有特定变量的值的集合，那么我们可以应用 Java 中的任何的可用的接口来映射这些值。

​	Hibernate 可以保存 java.util.Map, java.util.Set, java.util.SortedMap, java.util.SortedSet, java.util.List 和其它持续的实例或者值的任何数组的实例

	- set--->与\<set>匹配，用hashset初始化
	- sortedset---与\<set>元素匹配用TreeSet初始化，sort属性可以设置成比较器，或者自然搜索
	- List---->与\<list>元素匹配，并用ArrayList初始化
	- Collection它和 \<bag> 或者 \<ibag> 元素匹配以及用 java.util.ArrayList 初始化。
	- Map它和 \<map> 元素匹配并且用 java.util.HashMap 初始化。
	- SortedMap它和 \<map> 元素匹配并且用 java.util.TreeMap 初始化。sort 属性可以设置成比较器或者 自然排序

**实体类之间的映射：**

​		多对多，多对一，一对一，

**组件映射：**

​	作为变量的一员实体类很可能和其它类具有相关关系。如果引用的类没有自己的生命周期并且完全依靠于拥有它的那个实体类的生命周期的话，那么这个引用类因此就可以叫做组件类。

### Hibernate注释：

​	原先使用xml映射文件来完成从pojo到数据库表中的数据转换，Hibernate 注释是无需使用 XML 文件来定义映射的最新方法。你可以额外使用注释或直接代替 XML 映射元数据。

​	Hibernate 注释是一种强大的来给对象和关系映射表提供元数据的方法。所有的元数据被添加到 POJO java 文件代码中，这有利于用户在开发时更好的理解表的结构和 POJO。

​	如果你想让你的应用程序移植到其它 EJB 3 的 ORM 应用程序中,您必须使用注释来表示映射信息，但是如果想要得到更大的灵活性,那么你应该使用基于 XML 的映射。

​		`@entity` 注释标志这这个类为一个实体的bean所以类必须提供默认的构造函数

​		`@Table`允许表明表的详细信息保存实体在数据库中持续存在

​		`@Id` 和 `@GeneratedValue` 注释每一个实体 bean 都有一个主键，你在类中可以用 `@Id` 来进行注释。主键可以是一个字段或者是多个字段的组合，这取决于你的表的结构。

​		`@Id` 注释将自动确定最合适的主键生成策略，但是你可以通过使用 @GeneratedValue 注释来覆盖掉它。strategy 和 generator 这两个参数我不打算在这里讨论，所以我们只使用默认键生成策略。让 Hibernate 确定使用哪些生成器类型来使代码移植于不同的数据库之间。

​		`@Column 注解`

​		`@Column` 注j解用于指定某一列与某一个字段或是属性映射的细节信息。您可以使用下列注释的最常用的属性:

- name 允许显式地指定列的名称。
- length 特别为一个字符串值的列的大小。
- nullable ，一个列可以被标记为非空。
- unique 唯一的内容

### HQL查询

Hibernate 查询语言（HQL）是一种面向对象的查询语言，类似于 SQL，但不是去对表和列进行操作，而是面向对象和它们的属性。 HQL 查询被 Hibernate 翻译为传统的 SQL 查询从而对数据库进行操作。

​	尽管你能直接使用本地 SQL 语句，但我还是建议你尽可能的使用 HQL 语句，以避免数据库关于可移植性的麻烦，并且体现了 Hibernate 的 SQL 生成和缓存策略。

​	在 HQL 中一些关键字比如 SELECT ，FROM 和 WHERE 等，是不区分大小写的，但是一些属性比如表名和列名是区分大小写的。

#### from语句:

```java
String hql="from employee";
//String hql = "FROM com.hibernatebook.criteria.Employee";
Query query=session.createQuery(hql);
List result=query.list();
```



#### AS语句：

​		在 HQL 中 AS 语句能够用来给你的类分配别名，尤其是在长查询的情况下

```java
String hql="from Employee AS E";
Query query=session.createQuery(hql);
List requests=query.list();
```

#### Select语句：

SELECT 语句比 from 语句提供了更多的对结果集的控制。如果你只想得到对象的几个属性而不是整个对象你需要使用 SELECT 语句。

下面是一个 SELECT 语句的简单语法示例，这个例子是为了得到 Employee 对象的 first_name 字段：

```java
String hql = "SELECT E.firstName FROM Employee E";
Query query = session.createQuery(hql);
List results = query.list();
```

#### Where语句：

```java
String hql = "FROM Employee E WHERE E.id = 10";
Query query = session.createQuery(hql);
List results = query.list();
```

​		order by语句：
​				。。。。

#### 使用命名参数

Hibernate 的 HQL 查询功能支持命名参数。这使得 HQL 查询功能既能接受来自用户的简单输入，又无需防御 SQL 注入攻击。下面是使用命名参数的简单的语法:

```java
String hql = "FROM Employee E WHERE E.id = :employee_id";
Query query = session.createQuery(hql);
query.setParameter("employee_id",10);
List results = query.list();
```

#### UPDATE 语句

HQL Hibernate 3 较 HQL Hibernate 2，新增了批量更新功能和选择性删除工作的功能。查询接口包含一个 executeUpdate() 方法，可以执行 HQL 的 UPDATE 或 DELETE 语句。

```java
String hql = "UPDATE Employee set salary = :salary "  + 
		     "WHERE id = :employee_id";
Query query = session.createQuery(hql);
query.setParameter("salary", 1000);
query.setParameter("employee_id", 10);
int result = query.executeUpdate();
System.out.println("Rows affected: " + result);
```

#### DELETE 语句

DELETE 语句可以用来删除一个或多个对象。以下是使用 DELETE 语句的简单语法：	

```java
String hql = "DELETE FROM Employee "  + 
	    "WHERE id = :employee_id";
Query query = session.createQuery(hql);
query.setParameter("employee_id", 10);
int result = query.executeUpdate();
System.out.println("Rows affected: " + result);
```

#### INSERT 语句

​	HQL 只有当记录从一个对象插入到另一个对象时才支持 INSERT INTO 语句。下面是使用 INSERT INTO 语句的简单的语法:

```java
String hql = "INSERT INTO Employee(firstName, lastName, salary)"  + 
    "SELECT firstName, lastName, salary FROM old_employee";
Query query = session.createQuery(hql);
int result = query.executeUpdate();
System.out.println("Rows affected: " + result);
```

#### 分页查询

​	`Query setFirstResult(int startPosition)` 

​		该方法以一个整数表示结果中的第一行,从 0 行开始。

​	`Query setMaxResults(int maxResult)` 

​		这个方法告诉 Hibernate 来检索固定数量，即 maxResults 个对象。
例如：		

```java
String hql = "FROM Employee";
Query query = session.createQuery(hql);
query.setFirstResult(1);
query.setMaxResults(10);
List results = query.list();
```



### 标准查询(Criteria查询：)：

#### 用于单表查询；

​	Hibernate 提供了操纵对象和相应的 RDBMS 表中可用的数据的替代方法。一种方法是标准的 API，它允许你建立一个标准的可编程查询对象来应用过滤规则和逻辑条件。

​	Hibernate Session 接口提供了 createCriteria() 方法，可用于创建一个 Criteria 对象，使当您的应用程序执行一个标准查询时返回一个持久化对象的类的实例。

例如：

```java
Criteria cr = session.createCriteria(Employee.class);  
	List results = cr.list();  
你可以使用 Criteria 对象可用的 add() 方法去添加一个标准查询的限制。
例如：
Criteria cr = session.createCriteria(Employee.class);    
	cr.add(Restrictions.eq("salary", 2000));    //where精确查询
	cr.add(Restrictions.like("firstName", "zara%"));//模糊查询
	cr.add(Restrictions.between("salary", 1000, 2000));//范围查询
	cr.add(Restrictions.isEmpty("salary"));//判空
List results = cr.list();  
```



#### 分页：

```java
Criteria cr = session.createCriteria(Employee.class);
	cr.setFirstResult(1);
	cr.setMaxResults(10);
List results = cr.list();
```

### 原生SQL

复杂的业务逻辑的时候还是需要用这个的如果你想使用数据库特定的功能如查询提示或 Oracle 中的 CONNECT 关键字的话，你可以使用原生 SQL 数据库来表达查询。Hibernate 3.x 允许您为所有的创建，更新，删除，和加载操作指定手写 SQL ，包括存储过程。

您的应用程序会在会话界面用 createSQLQuery() 方法创建一个原生 SQL 查询：

public SQLQuery createSQLQuery(String sqlString) throws HibernateException
​当你通过一个包含 SQL 查询的 createsqlquery() 方法的字符串时，你可以将 SQL 的结果与现有的 Hibernate 实体，一个连接，或一个标量结果分别使用 addEntity(), addJoin(), 和 addScalar() 方法进行关联。

#### 标量查询：		

```java
最基本的 SQL 查询是从一个或多个列表中获取一个标量（值）列表。
String sql = "SELECT first_name, salary FROM EMPLOYEE";
SQLQuery query = session.createSQLQuery(sql);
query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
List results = query.list();
```

#### 实体查询：

```java
以上的查询都是关于返回标量值的查询，只是基础性地返回结果集中的“原始”值。以下是从原生 SQL 查询中通过 addEntity() 方法获取实体对象整体的语法：
String sql = "SELECT * FROM EMPLOYEE";
SQLQuery query = session.createSQLQuery(sql);
query.addEntity(Employee.class);
List results = query.list(); 
```

#### 指定Sql查询：

```java
通过 addEntity() 方法和使用指定 SQL 查询来获取实体对象整体的语法：
String sql = "SELECT * FROM EMPLOYEE WHERE id = :employee_id";
SQLQuery query = session.createSQLQuery(sql);
query.addEntity(Employee.class);
query.setParameter("employee_id", 10);
List results = query.list();  
```

### 缓存

缓存是关于应用程序性能的优化，降低了应用程序对物理数据源访问的频次，从而提高应用程序的运行性能。

​	`<cache usage="read-write"/>`参数告诉hibernate使用read-write并发策略缓存对 Hibernate 来说也是重要的，它使用了如下解释的多级缓存方案：

#### 一级缓存

第一级缓存是 Session 缓存并且是一种强制性的缓存，所有的要求都必须通过它。Session 对象在它自己的权利之下，在将它提交给数据库之前保存一个对象。

如果你对一个对象发出多个更新，Hibernate 会尝试尽可能长地延迟更新来减少发出的 SQL 更新语句的数目。如果你关闭 session,所有缓存的对象丢失，或是存留，或是在数据库中被更新。提高查询状态，减少不必要的修改语句的发送

#### 二级缓存

​	第二级缓存是一种可选择的缓存并且第一级缓存在任何想要在第二级缓存中找到一个对象前将总是被询问。第二级缓存可以在每一个类和每一个集合的基础上被安装，并且它主要负责跨会话缓存对象。任何第三方缓存可以和 Hibernate 一起使用。org.hibernate.cache.CacheProvider 接口被提供，它必须实现来给 Hibernate 提供一个缓存实现的解决方法。

#### 查询层次缓存

​	Hibernate 也实现了一个和第二级缓存密切集成的查询结果集缓存。这是一个可选择的特点并且需要两个额外的物理缓存区域，它们保存着缓存的查询结果和表单上一次更新时的时间戳。这仅对以同一个参数频繁运行的查询来说是有用的。	

**​		第二级缓存**

​			Hibernate 使用默认的一级缓存并且你不用使用一级缓存。让我们直接看向可选的二级缓存。不是所有的类从缓存中获益，所以能关闭二级缓存是重要的。

​			Hibernate 的二级缓存通过两步设置。第一，你必须决定好使用哪个并发策略。之后，你使用缓存提供程序来配置缓存到期时间和物理缓存属性。

#### 并发策略

​		一个并发策略是一个中介，它负责保存缓存中的数据项和从缓存中检索它们。如果你将使用一个二级缓存，你必须决定，对于每一个持久类和集合，使用哪一个并发策略。

​		`Transactional:`为主读数据使用这个策略，在一次更新的罕见状况下并发事务阻止过期数据是关键的。
​		`Read-write:`为主读数据再一次使用这个策略，在一次更新的罕见状况下并发事务阻止过期数据是关键的。
​		`Nonstrict-read-write:`这个策略不保证缓存和数据库之间的一致性。如果数据几乎不改变并且过期数据不是很重要，使用这个策略。
​		`Read-only:`一个适合永不改变数据的并发策略。只为参考数据使用它。

#### 查询层次缓存

​	为了使用查询缓存，你必须首先使用配置文件中的 hibernate.cache.use_query_cache="true" 属性激活它。通过设置这个属性为真，你使得 Hibernate 创建内存中必要的缓存来保存查询和标识符集。

​	然后，为了使用查询缓存，你使用 Query 类的 setCacheable(Boolean) 方法。例如：

```java
Session session = SessionFactory.openSession();
Query query = session.createQuery("FROM EMPLOYEE");
query.setCacheable(true);
List users = query.list();
SessionFactory.closeSession();
```


​	Hibernate 通过缓存区域的概念也支持非常细粒度的缓存支持。一个缓存区域是被给予名字的缓存部分。

```java
Session session = SessionFactory.openSession();
Query query = session.createQuery("FROM EMPLOYEE");
query.setCacheable(true);
query.setCacheRegion("employee");
List users = query.list();
SessionFactory.closeSession();		
```

### 拦截器：

​		在 Hibernate 中，一个对象将被创建和保持。一旦对象已经被修改，它必须被保存到数据库里。这个过程持续直到下一次对象被需要，它将被从持久的存储中加载。

​		因此一个对象通过它生命周期中的不同阶段，并且 Interceptor 接口提供了在不同阶段能被调用来进行一些所需要的任务的方法。

​		这些方法是从会话到应用程序的回调函数，允许应用程序检查或操作一个持续对象的属性，在它被保存，更新，删除或上传之前	
​	

### 生成器类：

​		所有的生成器类都实现IDentifierGenerator接口，可通过实现接口创建自己的生成器类：
​	主键策略：

```xml
<id name="cust_id" column="cust_id">
  <!-- 生成主键策略
  主键的生成规则：
  identity :主键自增，录入是不需要指定id的
  increate:主键自增，由hinbernate维护，每次会查询id最大值，然后另其+1（勿用线程安全问题）
  sequence：oracle主键生成策略
  hilo：一种主键自增的策略；高低算法，由hinbernate维护 （不需要用）
  native：hilo+sequence+identity自动三选一，有配置文件筛选出来；
  uuid:string类型的主键，产生随机数id
  assigned:自然生成，有开发人员维护主键
  -->
  <generator class="native"></generator>
</id>
assigned:
  <generator>元素，assigned是默认的生成器策略。在这种情况下，应用程序为对象分配ID
  <hibernate-mapping>
  <class ...>
  <id ...>
  <generator class="assigned"></generator>
  </id>
  .....
  </class>
</hibernate-mapping>
```

 **`increment`**

​	当没有其他进程将数据插入此表时，才会生成唯一的ID。 它生成short，int或long型标识符。 第一个生成的标识符通常为1，然后每次递增为1
`​	<generator class="increment"></generator>`  

**​sequence**

​	它使用数据库的顺序序列。如果没有定义序列，它会自动创建一个序列。 在Oracle数据库的情况下，它将创建一个名为HIBERNATE_SEQUENCE的序列。

​	在Oracle，DB2，SAP DB，Postgre SQL或McKoi的情况下，它使用序列(sequence)，但在interbase中使用生成器可以定义自己的序列
​			`<id ...>  
​		   <generator class="sequence">  
​			<param name="sequence">your_sequence_name</param>  
​			 </generator>  
​		 </id>` 
​			 `hilo：`它使用高低算法来生成short，int和long类型的id

​			 `native：`它使用标识，序列或希洛取决于数据库供应商

​			`identity	`用于Sybase，Mysql，MS SQL Server，DB2和Hypersonic SQL以支持id列。 返回的ID类型为short，int或long

​			......
​			....

**对象状态：**

> ​			瞬时状态：
>
> ​						new

> ​			持久化状态：
> ​						save只是把瞬时状态变为持久状态；

> ​			托管状态：
> ​						close

> ​			作用：将希望同步导数据库中的数据对象，转化为持久化数据
>
> ​				持久化---》delete-->瞬时状态

> ​				托管---》update--->持久化状态
>
> ​				瞬时---》save---->持久化状态

### 事务

​	在项目中如何管理事务：

​		业务开始之前打开事务，业务执行之后提交事务，执行过程出现异常回滚事务，在dao层操作数据库需要用到session对象，在service控制事务也是使用session对象完成，要确保dao层，和service层用的是同一个session队形

​		当时通过：connection由service层----》dao层同时传递connection对象

​		hibernate中确保使用的是同一个session对象 只需要用SesssionFactroy调用 getCurrentSession()的的方法即可以得到与当前线程绑定的对象

​		调用时：必须配合主配置的文件：指定当前线程与session绑定
`​<property name="current_session_context_class">thread</proterty>`

​		这个session对象当事务提交时会自动关闭session,自己不需要手动关闭

### 关系映射模型：

​	`数据模型`：是对数据的库特征的抽象的，用户从数据库中看到的模型，主要有DBMS实现

​	`领域模型`：是对现实世界的对象的可视化表现主要是现实世界与计算机之间的一条纽带。

#### 一对一主键关联：

​	例如居民和身份证

​			`user{`
`​		id,name,sex,age`
`​	  }`
`​	card{`
`​		id,IDCode`
`​	}`
​	配置形式：				

```xml
user:
<one-to-one name="com.leo.IDcode" cascade="all">//配置级联操作
card:
<one-to-one name="com.leo.People" constrained="true">//constrained="true"是，constrained只能在one-to-one的映射中使用,(一般在主表的映射中,有外键的那个表)
```



#### 一对一外键关联：

​	`user{`
`​		id,name,sex,age,card_id`
`​	}`
`​	card{`
`​		id,IDCode`
`​	}`
​					

```xml
user.hbm.xml:
<many-to-one name="icard" column="card_id" unique="true" >
</many-to-one>
card.hbm.xml:
需要配置外键在主键配置策略中：
<id name="" cloumn=" " type="">
    <generator class="foreign">
        <param name="property">people</param>
    </generator>
</id>
```

#### 一对多：

##### 一的一方：

```xml
<!-- 集合一对多 -->
<!--name:集合的属性名，class:与外键关联的完整的类名 ，column:是哪个列为外键  -->
<!--级联操作：cascade=""  save-update:级联保存更新，delete：级联删除，all:级联删除和保存
操作性质：是数据的操作的简化
-->
<!-- inverse属性：配置关系是否维护 ,true:是让对方维护这个关系
false:是双方都会维护的
如果不配置是双方都会维护的
原则：总有一方要维护关系
只能是一的一方放弃维护关系，多的一方必须维护
-->
<set name="linkMens" inverse="true">
	<key column="lkm_cust_id"/>
	<one-to-many class="LinkMan"/>
</set>
```

##### 多的一方：

​					

```xml
<!-- 
fetch 决定加载的sql语句
select: 使用单表查询
join : 多表查询
lazy  决定加载时机
false: 立即加载
proxy: 由customer的类级别加载策略决定.
-->
<!--级联操作：cascade=""  save-update:级联保存更新，delete：级联删除，all:级联删除和保存
操作性质：是数据的操作的简化
多对一的单向的操作，需要在持久化得类的外键中引入另一个表中的主键，
这是使用的是双向关联
-->
<!-- 在多的一方是不能够放弃维护关系的，外键字段是多的一方的列 -->	 
<many-to-one name="customer" column="lkm_cust_id" class="Customer" fetch="join" lazy="proxy"  >
</many-to-one>

级联删除：
//删除的时候需要用级联删除，如果要删除可以用：inverse="false";这是维护外键，可以直接删并设置外键为空
//或者用 不维护外键：inverse="true",casecade="delete";级联删除；
//3操作
//1> 获得要操作的客户对象

Customer c = session.get(Customer.class,5l);
session.delete(c);
```


#### 多对多：

​	员工----角色：
​		多对多的一般引入第三个表用来保存员工和角色的主键用来维护两个表的关系

​		其实就是在第三个表去维护两个主键来达到多对多的关系
​					

```java
实体表的使用：
	User{
		id,name,Set<roel> role
	}
	role{
		id,name,Set<User>  user
	}

`
设置User.hcm.xml
		///省略；；； 
		<set name="role" table="tab_mapping">
			<key clomu="user_id"></key>
			<many-to-many class="com.leo.Role" column="role_id"/>
		</set>
设置role.hcm.xml
		<set name="user" table="tab_mapping">
			<key column="role_id"></key>
			<many-to-many class="com.leo.User" column="user_id"/>
		</set>
用户---角色
		//保存员工以及角色
public void fun1() {
        //1 获得session
        Session session = HibernateUtil.openSession();
        //2 开启事务
        Transaction tx = session.beginTransaction();
        //-------------------------------------------------
        //3操作
        //1> 创建两个 User
        User u1 = new User();
        User u2 = new User();
        u1.setUser_name("张三");
        u2.setUser_name("李四");
        //2> 创建两个 Role
        Role r1 = new Role();
        Role r2 = new Role();
        r1.setRole_name("保洁");
        r2.setRole_name("保安");
        //3> 用户表达关系
        u1.getRoles().add(r1);
        u1.getRoles().add(r2);

        u2.getRoles().add(r1);
        u2.getRoles().add(r2);
        //如果不配置的时候 两个都会进行关系维户，会进行主键约束重复不可以用
        //inverse="true" 属性在另一方维护关系，这个放弃维护关系
        //4> 角色表达关系
        r1.getUsers().add(u1);
        r1.getUsers().add(u2);

        r2.getUsers().add(u1);
        r2.getUsers().add(u2);

        //5> 调用Save方法一次保存
        session.save(u1);
        session.save(u2);
        session.save(r1);
        session.save(r2);
        //-------------------------------------------------
        //4提交事务
        tx.commit();
        //5关闭资源
        session.close();
    }
```

```xml
设置User.hcm.xml：
<!-- 多对多关系表达 -->
  <!-- 
   name: 集合属性名对应的是实例类的属性值
   table: 配置中间表名
   key
    |-column:外键,别人引用"我"的外键列名,即第三方表中引用我的主键
    class: 我与哪个类是多对多关系
    column:外键.我引用比人的外键列名
    <many-to-many> 配置的是这个表中的另一个外键
   -->
<!-- 这个就是简化了save语句：
   cascade级联操作:
     save-update: 级联保存更新
     delete:级联删除
     all:级联保存更新+级联删除
   结论: cascade简化代码书写.该属性使不使用无所谓. 建议要用只用save-update.
     如果使用delete操作太过危险.尤其在多对多中.不建议使用. 一般不用。
-->
<set name="roles" table="sys_user_role" cascade="save-update" >
	<key column="user_id" ></key>
	<many-to-many class="Role" column="role_id" ></many-to-many>
</set>
设置role.hbm.xml
<!-- 使用inverse属性
     true: 放弃维护外键关系
     false(默认值):维护关系
     many-to-many是配置的另一个的关系的列和对应的类
    结论: 将来在开发中,如果遇到多对多关系.一定要选择一方放弃维护关系.
      一般谁来放弃要看业务方向. 例如录入员工时,需要为员工指定所属角色.
      那么业务方向就是由员工维护角色. 角色不需要维护与员工关系.角色放弃维护
-->		
<set name="users" table="sys_user_role" inverse="true" >
  <key column="role_id" ></key>
  <many-to-many class="User" column="user_id" ></many-to-many>
</set>
```

### 关联级别策略

级联操作：
		数据库中利用主外键约束保护数据的一致性，级联是指当主控方执行save，update，delete时，进行的同步操作，

​		在映射文件中通过cascade属性设置关联对象的级联操作，cascade=""  save-update:级联保存更新，delete：级联删除，all:级联删除和保存

​		操作性质：是数据的操作的简化

​		级联操作关系维护:inverse属性：配置关系是否维护 ,true:是让对方维护这个关系

​			false:是双方都会维护的

​			如果不配置是双方都会维护的

​			原则：总有一方要维护关系

​			只能是一的一方放弃维护关系，多的一方必须维护								

```java
<hibernate-mapping package="com.leo.domain">
    <class name="Customer" table="cust_customer">
	<!-- id映射主键属性name：填对应的属性名，column列名 -->
		<id name="cust_id" column="cust_id">
			<generator class="identity"></generator>
		</id>
		<!-- property是除id以外的普通属性的映射 
			name:属性名 默认使用属性名
			cloumn（可选）:填写列名
			type（可选）:填写属性的类型，Java属性，hibernate属性，数据库属性
			not-null:默认false
			length（可选）:配置数据库的列的长度，默认数据库类型最大长度	
		-->
		<property name="cust_name" column="cust_name"></property>
		<property name="cust_source" column="cust_source" ></property>
		<property name="cust_industry" column="cust_industry" ></property>
		<property name="cust_level" column="cust_level" ></property>
		<property name="cust_linkman" column="cust_linkman" ></property>
		<property name="cust_phone" column="cust_phone" ></property>
		<property name="cust_mobile" column="cust_mobile" ></property>
		<!-- 集合一对多 -->
		<!--name:集合的属性名，class:与外键关联的完整的类名 ，column:是哪个列为外键-->
		<!--级联操作：cascade=""  save-update:级联保存更新，delete：级联删除，
            all:级联删除和保存操作性质：是数据的操作的简化 -->
		<!-- inverse属性：配置关系是否维护 ,true:是让对方维护这个关系
			false:是双方都会维护的
			如果不配置是双方都会维护的
			原则：总有一方要维护关系
			只能是一的一方放弃维护关系，多的一方必须维护
		-->
		<!-- 
			fetch 决定加载的sql语句
				select: 使用单表查询
				join : 多表查询
				subselect:使用子查询
			lazy  决定加载时机
				false: 立即加载
				true:延迟jiazai
				extra:及其懒惰
		-->
		<set name="linkMens" inverse="true" lazy="true" fetch="select">
			<key column="lkm_cust_id"/>
			<one-to-many class="LinkMan"/>
		</set>
	</class>
</hibernate-mapping>
lazy="true" fetch="select"：配置的配合：
//fetch:select 单表查询//lazy:true 使用时才加载集合数据.默认值
//fetch:select 单表查询//lazy:false 立即记载集合数据
//fetch:select 单表查询//lazy:extra 极其懒惰.与懒加载效果基本一致. 如果只获得集合的size.只查询集合的size(count语句)
//fetch:join	多表查询//lazy:true|false|extra 失效.立即加载.
            
查询：在service中可以先获得参数：
//service层：
String name=request.getprameter(name);
DetachedCriteria dc=DetachedCriteria.forClass(Customer.class);
dc.add(Restrictions.like("id",%+name+%));//拼装条件
需要同时传入对象的属性和值
```
<font color="red">遇到的坑：</font>

​			在使用配置文件时应注意：.hbm.xml映射文件和.cfg.xml配置文件必须在src和所建的包同级不然会报错：Could not locate cfg.xml resource [hibernate.cfg.xml]

​			如果不在同一个包中则编译器不能找到这个文件，