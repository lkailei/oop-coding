---
title: Mybatis
autoGroup-2: 高级 
---
## Mybatis:

​		MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。

​		MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Old Java Objects,普通的 Java对象)映射成数据库中的记录。

​		Mybatis通过xml或注解的方式将要执行的各种statement（statement、preparedStatemnt、CallableStatement）配置起来，并通过java对象和statement中的sql进行映射生成最终执行的sql语句，最后由mybatis框架执行sql并将结果映射成java对象并返回.

### myBatis功能架构:

​			**API接口层:**  提供给外部使用的接口API，开发人员通过这些本地API来操纵数据库。接口层一接收到调用请求就会调用数据处理层来完成具体的数据处理。 

​			**数据处理层:** 负责具体的SQL查找、SQL解析、SQL执行和执行结果映射处理等。它主要的目的是根据调用的请求完成一次数据库操作。 

​			**基础支撑层:** 负责最基础的功能支撑，包括连接管理、事务管理、配置加载和缓存处理，这些都是共用的东西，将他们抽取出来作为最基础的组件。为上层的数据处理层提供最基础的支撑。

​			1、mybatis配置SqlMapConfig.xml，此文件作为mybatis的全局配置文件，配置了mybatis的运行环境等信息。mapper.xml文件即sql映射文件，文件中配置了操作数据库的sql语句。此文件需要在SqlMapConfig.xml中加载。

​			2、通过mybatis环境等配置信息构造SqlSessionFactory即会话工厂

​			3、由会话工厂创建sqlSession即会话，操作数据库需要通过sqlSession进行。

​			4、mybatis底层自定义了Executor执行器接口操作数据库，Executor接口有两个实现，一个是基本执行器、一个是缓存执行器。

​			5、Mapped Statement也是mybatis一个底层封装对象，它包装了mybatis配置信息及sql映射信息等。mapper.xml文件中一个sql对应一个Mapped Statement对象，sql的id即是Mapped statement的id。

​			6、Mapped Statement对sql执行输入参数进行定义，包括HashMap、基本类型、pojo，Executor通过Mapped Statement在执行sql前将输入的java对象映射至sql中，输入参数映射就是jdbc编程中对preparedStatement设置参数。

​			7、Mapped Statement对sql执行输出结果进行定义，包括HashMap、基本类型、pojo，Executor通过Mapped Statement在执行sql后将输出结果映射至java对象中，输出结果映射过程相当于jdbc编程中对结果的解析处理过程。

### mybatis解决jdbc的编程问题：

​			1.使用连接池连接

​			2.将SQL语句配置到映射xml文件与Java代码分离

​			3.自动将java对象映射置sql语句通过parameterType定义输入的参数的类型

​			4.自动将结果映射到java对象中，而且可以通过resultType定义输出的结果类型

### mybatis与hibernate 的区别：

​			1.mybatis通过xml或注解的形式书写sql语句需要自己编写sql语句，并将sql语句和java对象映射成最终执行的sql

​			hibernate几乎不用自己书写sql语句，都直接操作封装好的对象即可

​			2.mybatis可以控制sql的执行性能可以用于对关系模型要求不高的软件的开发吗，mybatis无法做到与数据库的无关性，如果需要实现多种的数据库的软件的类型需要定义多套sql的映射文件工作量大

​			3.hibernate 对象/关系映射能力极强，与数据库无关性好

### sqlSession的获取：

​			SqlSession中封装了对数据库的操作，如：查询、插入、更新、删除等。

​			SqlSession通过SqlSessionFactory创建。

​			SqlSessionFactory是通过SqlSessionFactoryBuilder进行创建。

​			SqlSessionFactoryBuilder用于创建SqlSessionFacoty，SqlSessionFacoty一旦创建完成就不需要SqlSessionFactoryBuilder了所以可以将SqlSessionFactoryBuilder当成一个工具类使用，最佳使用范围是方法范围即方法体内局部变量。

​			SqlSessionFactory是一个接口，接口中定义了openSession的不同重载方法，SqlSessionFactory的最佳使用范围是整个应用运行期间，一旦创建后可以重复使用，通常以单例模式管理SqlSessionFactory

​			SqlSession是一个面向用户的接口，sqlSession中定义了数据库操作方法。每个线程都应该有它自己的SqlSession实例。SqlSession的实例不能共享使用，它也是线程不安全的。因此最佳的范围是请求或方法范围。绝对不能将SqlSession实例的引用放在一个类的静态字段或实例字段中。

```java
/////获取sqlsession并且执行相应的操作
public  void test5() throws IOException {
    // TODO Auto-generated method stub
    //加载核心配置文件
    String resource="sqlMapConfig.xml";
    InputStream   in= Resources.getResourceAsStream(resource);
    //创建SqlSessionFactory工厂
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
    //创建sqlSession
    SqlSession sqlSession = sqlSessionFactory.openSession();
    //执行sql语句,selectone:第一个参数是对的应的xml文件中的的id,第二个是对应的要
    sqlSession.delete("test.deleteUser",10);
    sqlSession.commit();
    //释放资源
    sqlSession.close();
}
```

### SqlMapConfig.xml配置文件

- properties（属性）

- settings（全局配置参数）

- typeAliases（类型别名）

- typeHandlers（类型处理器）

- objectFactory（对象工厂）

- plugins（插件）

- environments（环境集合属性对象）

- environment（环境子属性对象）

- transactionManager（事务管理）

- dataSource（数据源）

- mappers（映射器）：用于读取你的映射文件
  `1.使用相对于类路径的资源（现在的使用方式）如<mapper resource="sqlmap/User.xml" />`
  
  `2.使用mapper接口类路径如：<mapper class="cn.itcast.mybatis.mapper.UserMapper"/>`
  
  `3.注册指定包下的所有mapper接口如：<package name="cn.itcast.mybatis.mapper"/>`
  	
  
  注意：2.3方法要求mapper接口名称和mapper映射文件名称相同，且放在同一个目录中。

```xml
方式一
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
       PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- mybatis全局的配置文件 配置运行环境等信息 -->
<configuration>
    <!-- 环境标签  和 Spring 整合后environment将废除-->
    <environments default="development">
        <environment id="development">
            <!-- 使用jdbc事务管理 -->
            <transactionManager type="JDBC"/>
            <!-- 数据库连接池 -->
            <dataSource type="POOLED">
                <!-- 直接加载的形式-->
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="123"/>
            </dataSource>
        </environment>
    </environments>
    <!-- mapper的位置 -->
    <mappers>
        <mapper resource="sqlmap/user.xml"/>
    </mappers>
</configuration>
方式二：
准备数据库配置文件：
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
       PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- mybatis全局的配置文件 配置运行环境等信息 -->
<configuration>
    <!-- 引入配置的连接池的 -->
    <properties resource="db.properties"></properties>
    <!-- 环境标签  和 Spring 整合后environment将废除-->
    <environments default="development">
        <environment id="development">
            <!-- 使用jdbc事务管理 -->
            <transactionManager type="JDBC"/>
            <!-- 数据库连接池 -->
            <dataSource type="POOLED">   
                <property name="driver" value="${jdbc.driverClass}"/>
                <property name="url" value="${jdbc.jdbcUrl}"/>
                <property name="username" value="${jdbc.user}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <!-- mapper的位置 -->
    <mappers>
        <mapper resource="sqlmap/user1.xml"/>	
    </mappers>
</configuration>
```

### mybatis中的映射文件：

`#{}`表示一个占位符号，通过#{}可以实现preparedStatement向占位符中设置值，自动进行java类型和jdbc类型转换。#{}可以有效防止sql注入。 #{}可以接收简单类型值或pojo属性值。 如果parameterType传输单个简单类型值，#{}括号中可以是value或其它名称。

`${}`表示拼接sql串，通过{}可以将parameterType 传入的内容拼接在sql中且不进行jdbc类型转换， {}可以接收简单类型值或pojo属性值，如果parameterType传输单个简单类型值，{}括号中只能是value。

​			`parameterType：指定输入参数类型，mybatis通过ognl从输入对象中获取参数值拼接在sql中。`

​			`resultType：指定输出结果类型，mybatis将sql查询结果的一行记录数据映射为resultType指定类型的对象。如果有多条数据，则分别进行映射，并把对象放到容器List中`

​           `resultMap:手动映射`				
映射文件例子：

```xml

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namespace，命名空间用于隔离SQL，防止出现在id相同的xml文件 -->
<mapper namespace="test">
    <!-- 通过id查询 ;select是查询 在这个标签下书写SQL语句, 
        parameterType:是指定传入参数的类型
        resultType:书写的为对象的话，就会自动返回这个对象，自动映射，属性要与数据库一一对应
        resultMap:手动映射	
       -->
    <select id="selectid" parameterType="Integer" resultType="com.leo.domain.User">
        select * from user where id= #{v}
    </select>
    <!-- 模糊查询用户 
        #{}表示的为占位符。占位符?两边已经加上过''后了,,#{}括号内可以为任意字符
         也可用"%"#{value}"%"可以防止sql注入
        ${}字符串拼接，${}两边必须加上'',中间只能为{value}
       -->
    <select id="selectlist" parameterType="String" resultType="com.leo.domain.User">
        select * from user where username like '%${value}%'
    </select>
    <!-- 添加 
        返回自增的主键
        <selectKey>是获得当前的id
        select Last_INSERT_ID():mysql提供的
        keyProperty="id" :返回值放到的user中id属性
        resultType="Integer" ，id的属性是
        order="AFTER"：主键自增的mysql为after,oracle是before
       -->
    <insert id="insertuser" parameterType="com.leo.domain.User">
        <selectKey keyProperty="id" resultType="Integer" order="AFTER">
            select Last_INSERT_ID()
        </selectKey>
        insert into user (username,birthday,sex,address) values (#{username},#{birthday},#{sex},#{address})
    </insert>
    <!-- 修改操作 -->
    <update id="updateuser">
        update user set username=#{username},sex=#{sex},birthday=#{birthday},address=#{address}
        where=#{id}
    </update>
    <!-- 删除 -->
    <delete id="deleteUser">
        delete from user where id=#{id}
    </delete>
```

### Mapper动态代理：

Mapper接口开发需要遵循以下规范：

​		1、	Mapper.xml文件中的namespace与mapper接口的类路径相同。

​		2、	Mapper接口方法名和Mapper.xml中定义的每个statement的id相同 

​		3、	Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql 的parameterType的类型相同

​		4、	Mapper接口方法的输出参数类型和mapper.xml中定义的每个sql的resultType的类型相同

​	通过mapper代理模式：

​	创建的usermapper接口：有四个原则：**采用mapper动态代理的方式开发时使用，在namespace中指定mapper的类路径：**

​	**同时要遵循以下原则：**

- **1.id与接口中的方法名一致；**
- **2.输入参数类型一致，**
- **3.返回类型一致**
- **4.在namaspace中指定mapp类路径**
		> 用法：
```
 	1.在config配置文件引入这个mapper
     在mapper映射文件中书写：
     <mapper namespace="com.leo.mapper.UserMapper">
     <!-- 根据包装对象类型进行查询，这里的输入参数为对象类型要全路径，你所使用的参数是user对象中的所以要近一步的调用 -->
     <select id="findUserByQueryVo" parameterType="com.leo.domain.QueryVo" resultType="com.leo.domain.User">
     select * from user where username like "%"#{user.username}"%"
     </select>
 ​    </mapper>
 ​    在接口中声明方法方法的名和id的相同参数返回类型都要一致：
 ​    `public  List<User> findUserByQueryVo(QueryVo vo)`;
 ​    使用时用：通过sqlSession.getMapper让sqlsesion自动是实现接口然后用这个类型去接收
```
```java
@Test	
public  void test1() throws IOException {
    // TODO Auto-generated method stub
    //加载核心配置文件
    String resource="sqlMapConfig2.xml";
    InputStream   in= Resources.getResourceAsStream(resource);
    //创建SqlSessionFactory工厂
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
    //创建sqlSession
    SqlSession sqlSession = sqlSessionFactory.openSession();
    //通过代理mapper获取，sqlsession生成接口的实现类
    UserMapper mapper=sqlSession.getMapper(UserMapper.class);
    QueryVo vo=new QueryVo();
    User user=new User();
    user.setUsername("明");
    vo.setUser(user);
    List<User> list=mapper.findUserByQueryVo(vo);
    for(User u:list) {
        System.out.println(u);
    }
}
```

### 输入参数类型parameterType：

#### 1.基本类型：

​	parameterType="Integer" .int，double,float,char,long,boolean,byte,short八大基本数据类型

```xml
<select id="selectid" parameterType="Integer" resultType="com.leo.domain.User">
  	select * from user where id= #{v}
</select>
```

#### 2.pojo类型：

```xml
<!-- 添加 
  <selectKey>是获得当前的id
  select Last_INSERT_ID():mysql提供的
  keyProperty="id" :返回值放到的user中id属性
  resultType="Integer" ，id的属性是
  order="AFTER"：主键自增的mysql为after,oracle是
 -->
<insert id="insertuser" parameterType="com.leo.domain.User">
    <selectKey keyProperty="id" resultType="Integer" order="AFTER">
        select Last_INSERT_ID()
    </selectKey>
    insert into user (username,birthday,sex,address) values (#{username},#{birthday},#{sex},#{address})
</insert>
<!-- 修改操作 -->
<update id="updateuser" parameterType="com.leo.domain.User">
    update user set username=#{username},sex=#{sex},birthday=#{birthday},address=#{address}
    where=#{id}
</update>
<!-- 删除 -->
<delete id="deleteUser" parameterType="Integer">
    delete from user where id=#{id}
</delete>
```

#### 3.带有包装类型的即一个类中引入了另一个类：

通过mapper代理模式：
			创建的usermapper接口：有四个原则：

​			采用mapper动态代理的方式开发时使用，在namespace中指定mapper的类路径,同时要遵循以下原则：

- 1.id与接口中的方法名一致；
- 2.输入参数类型一致，
- 3.返回类型一致
- 4.在namaspace中指定mapp类路径		


```xml
在接口中声明：
public  List<User> findUserByQueryVo(QueryVo vo);
    包装类：
    public class QueryVo implements Serializable{
        private User user;
        public User getUser() {
        return user;
        }
        public void setUser(User user) {
        this.user = user;
        }
}
配置映射文件：
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namespace，命名空间用于隔离SQL，防止出现在id相同的xml文件
2.采用mapper动态代理的方式开发时使用，在namespace中指定mapper的类路径：
同时要遵循以下原则：
1.id与接口中的方法名一致；2.参数类型一致，3.返回类型一致
-->
<mapper namespace="com.leo.mapper.UserMapper">
<!-- 根据包装对象类型进行查询，这里的输入参数为对象类型要全路径，你所使用的参数是user对象中的所以要近一步的调用 -->
<select id="findUserByQueryVo" parameterType="com.leo.domain.QueryVo" resultType="com.leo.domain.User">
select * from user where username like "%"#{user.username}"%"
</select>
</mapper>
测试：
@Test	
public  void test1() throws IOException {
// TODO Auto-generated method stub
//加载核心配置文件
    String resource="sqlMapConfig2.xml";
    InputStream   in= Resources.getResourceAsStream(resource);
    //创建SqlSessionFactory工厂
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
    //创建sqlSession
    SqlSession sqlSession = sqlSessionFactory.openSession();
    //通过代理mapper获取，sqlsession生成接口的实现类
    UserMapper mapper=sqlSession.getMapper(UserMapper.class);
    QueryVo vo=new QueryVo();
    User user=new User();
       user.setUsername("明");
       vo.setUser(user);
    List<User> list=mapper.findUserByQueryVo(vo);
    for(User u:list) {
   		 System.out.println(u);
	}
}																
```

### 输出参数类型ResultMap/Type

#### 1.resultType：

​	resultType可以指定将查询结果映射为pojo，但需要pojo的属性名和sql查询的列名一致方可映射成功。如果sql查询字段名和pojo的属性名不一致，可以通过resultMap将字段名和属性名作一个对应关系 ，resultMap实质上还需要将查询结果映射到pojo对象中。

```XML
用别名：
<typeAlias type="com.leo.domainl.User" alias="User"/>
<!-- In SQL Mapping XML file -->
<select id="selectUsers" resultType="User">
select id, username, hashedPassword
from some_table
where id = #{id}
</select>
返回自增的主键
<selectKey>是获得当前的id
select Last_INSERT_ID():mysql提供的
keyProperty="id" :返回值放到的user中id属性
resultType="Integer" ，id的属性是
order="AFTER"：主键自增的mysql为after,oracle是before
直接返回封装后的pojo
<!-- 模糊查询用户 
#{}表示的为占位符。占位符?两边已经加上过''后了,,#{}括号内可以为任意字符
也可用"%"#{value}"%"可以防止sql注入
${}字符串拼接，${}两边必须加上'',中间只能为{value}
-->
<select id="selectlist" parameterType="String" resultType="com.leo.domain.User">
select * from user where username like '%${value}%'
</select>
```

#### 2.resultMap:

sql查询的字段名和你pojo类型字段不一致的情况下用。resultMap可以实现将查询结果映射为复杂类型的pojo，比如在查询结果映射对象中包括pojo和list实现一对一查询和一对多查询

```xml
<!-- resultMap最终还是要将结果映射到pojo上，type就是指定映射到哪一个pojo -->
<!-- id：设置ResultMap的id -->
<resultMap type="order" id="orderResultMap">
<!-- 定义主键 ,非常重要。如果是多个字段,则定义多个id -->
<!-- property：主键在pojo中的属性名 -->
<!-- column：主键在数据库中的列名 -->
<id property="id" column="id" />
<!-- 定义普通属性 -->
<result property="userId" column="user_id" />
<result property="number" column="number" />
<result property="createtime" column="createtime" />
<result property="note" column="note" />
</resultMap>
例子：
同样可以使用mapper代理模式

<!-- 使用Map  ；先使用resultMap标签 中的id 对相应的是执行语句返回的resultMap
在标签内使用的column是对应的数据库的属性，property指的是映射到的对象中的属性值
可以只写子段名与数据库名不一致的子段，其他相同的字段mybatis会进行自动化得装配
-->
<mapper namespace="com.leo.mapper.OrderMapper">
<resultMap type="com.leo.domain.Orders" id="myMap">
<!-- 这个字段映射到哪个类型-->
<id column="id" property="id"/>
<result column="user_id" property="userId"/>
</resultMap>
<select id="listOrderByMap" resultMap="myMap">
select id,user_id,number,createtime,note from orders
</select>
</mapper>
```
#### 标签：

> ​	sql:提取相同的sql语句   用的时候方法：`<include refid="id">`就可以；
> ​	where：条件用时要把条件包含到里面
> ​	if：判断一些字段	

```xml
<!-- 提取相同的sql语句   用的时候方法：<include refid="id">就可以 -->
<sql id="selectsql1" >
    select *from user
</sql>
<!-- 直接把条件包含到<where>标签，多条件中间用and连接-->
<select id="selectUserBysexAndname" parameterType="com.leo.domain.User" resultType="com.leo.domain.User">
    <!-- 引入sql片段 -->
    <include refid="selectsql1"></include>
    <where>
    <if test="sex !=null and sex!='' ">
        sex=#{sex}
</if>
    <if test="username != null and username!='' ">
        and username=#{username}
</if>
    </where>
</select>
```
```java
foreach:
接口中的
//根据多个id来查询：通过数组，通过list，通过代理的对象
public List<User> selectUserByIdsByInteger(Integer[] ids);
public List<User> selectUserByIdsByList(List<Integer> ids);
public List<User> selectUserByIdsByQueryVo(QueryVo ids);
```
```xml
<!-- 用代理的  要代理的是对类型的引用必须和这里的collection的引用必须一致-->
<select id="selectUserByIdsByQueryVo" parameterType="com.leo.domain.QueryVo" resultType="com.leo.domain.User">
    <!-- 引入sql片段 -->
    <include refid="selectsql1"></include>
    <where>
    <!--  id in 1,2,3-->
    <foreach collection="list" item='id' separator=","  open="id in (" close=")">
    #{id}
</foreach>
    </where>
</select>

<!-- 用数组的形式没有用自己设置的对象而是直接用collection=array 不用自己设置的字段 -->
<select id="selectUserByIdsByInteger" parameterType="com.leo.domain.QueryVo" resultType="com.leo.domain.User">
    <!-- 引入sql片段 -->
    <include refid="selectsql1"></include>
    <where>
    <!--  id in 1,2,3-->
    <foreach collection="array" item='id' separator=","  open="id in (" close=")">
    #{id}
</foreach>
    </where>
 </select>
<!-- 用list 中 collection="list" 未与其他字段相对应，只是书写为list即可 -->
 <select id="selectUserByIdsByList" parameterType="com.leo.domain.QueryVo" resultType="com.leo.domain.User">
    <!-- 引入sql片段 -->
    <include refid="selectsql1"></include>
    <where>
        <!--  id in 1,2,3-->
        <foreach collection="list" item='id' separator=","  open="id in (" close=")"> #{id}</foreach>
    </where>
</select>
```    
测试程序：
	
mybatis :一对一:
```
在mapper接口声明：
//一对一关联查询
 public List<Orders> selectOrders();
//一对多关联订单
public List<User> selectUsers();
						//映射的配置文件：
```
```xml                        
<!--用的是动态代理mapper-->
    <mapper namespace="com.leo.mapper.OrderMapper">
    <!-- 一对一 -->
    <!-- 使用Map 一对一映射 你要查出来的语句要都有指定的属性 -->
    <resultMap type="com.leo.domain.Orders" id="orderMap">
    <!-- 指定查出这个字段映射到哪个类型-->
    <id column="id" property="id"/>
    <result column="user_id" property="userId"/>
    <result column="number" property="number"/>
    <result column="createtime" property="createtime"/>
    <result column="note" property="note"/>
    <!-- 一对一 -->
    <!-- association ：配置一对一属性 -->
    <!-- property:order里面的User属性名 -->
   <!-- javaType:属性类型-->
            <association property="user" javaType="com.leo.domain.User">
            <id  property="id" column="user_id"/>
            <result column="username" property="username"/>
            </association>
            </resultMap>
      <select id="selectOrders" resultMap="orderMap">
            select 
            o.id,
            o.user_id,
            o.number,
            o.createtime,
            o.note, 
            u.username
                from orders o
                left join user u
                on o.user_id = u.id
      </select>
```
```java
 /**
 * 一对一
 * @throws IOException
*/
 @Test
 public  void test3() throws IOException {
    // TODO Auto-generated method stub
    //加载核心配置文件
    String resource="sqlMapConfig2.xml";
    InputStream   in= Resources.getResourceAsStream(resource);
    //创建SqlSessionFactory工厂
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
    //创建sqlSession
    SqlSession sqlSession = sqlSessionFactory.openSession();
    //sqlSession生成实现类
    OrderMapper mapper = sqlSession.getMapper(OrderMapper.class);
    List<Orders> selectOrders = mapper.selectOrders();
    for (Orders orders : selectOrders) {
        System.out.println(orders);
   }
}
```
```xml
<!-- 一对多 -->

    <!-- 使用Map 一对一映射 你要查出来的语句要都有指定的属性 -->
    <resultMap type="com.leo.domain.User" id="userMap">
    <!-- 指定查出这个字段映射到哪个类型-->
    <id column="id" property="id"/>
    <id column="username" property="username"/>
    <id column="sex" property="sex"/>
    <id column="birthday" property="birthday"/>
    <id column="address" property="address"/>
    <!-- 一对多 -->
    <collection property="orders"  javaType="list" ofType="com.leo.domain.Orders">

    </collection>
    </resultMap>
    <select id="selectUsers" resultMap="userMap">
    select 
        o.id,
        o.user_id,
        o.number,
        o.createtime,
        o.note, 
        u.username
    from user u
    left join orders o
    on o.user_id = u.id
    </select>
```
```java    
测试程序：
/**
 * 一对多
 * @throws IOException	 
 */
 @Test
public  void test3_1() throws IOException {
   // TODO Auto-generated method stub
   //加载核心配置文件
   String resource="sqlMapConfig2.xml";
   InputStream   in= Resources.getResourceAsStream(resource);
   //创建SqlSessionFactory工厂
   SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
   //创建sqlSession
   SqlSession sqlSession = sqlSessionFactory.openSession();
   //sqlSession生成实现类
   OrderMapper mapper = sqlSession.getMapper(OrderMapper.class);
   List<User> user = mapper.selectUsers();
   for (User user2s : user) {
        System.out.println(user2s);
   }
 }						
```
### Spring 整合Mybatis

#### 配置日志打印SQl:

**logging.level.com.kaysanshi.dao=debug**



```java
1.导包：spring核心包+mybatis核心包+mybatis-spring.jar+c3p0.jar+数据库驱包
2.配置核心多的配置文件：
	(2.1)：配置spring的核心的xml文件，用于spring整合其他的框架
	(2.2):配置数据源：用于连接数据库
	(2.3):配置mybatis的核心配置文件：用于引入mapper即映射文件
	(2.4):配置mapper即pojo映射文件:用于书写sql语句
	2.1中的配置：
		 让spring读取指定的数据源文件；
	     配置spring事务模块
		 注入连接池
		 实例化mybatis工厂
		 在appliactionContext.xml文件中需要实例化各个层
    <!-- 指定spring读取db.properties配置 -->
    <context:property-placeholder location="classpath:db.properties"  />
        <!-- 事务核心管理器,封装了所有事务操作. 依赖于连接池 -->
        <bean name="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager" >
            <property name="dataSource" ref="dataSource" ></property>
            </bean>
            <!-- 事务模板对象 -->
            <bean name="transactionTemplate" class="org.springframework.transaction.support.TransactionTemplate" >
                <property name="transactionManager" ref="transactionManager" ></property>
                </bean>
                <!-- 开启使用注解管理aop事务 -->
                <tx:annotation-driven/>
                    <!-- 1.将连接池 -->
                    <bean name="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" >
                        <property name="jdbcUrl" value="${jdbc.jdbcUrl}" ></property>
                        <property name="driverClass" value="${jdbc.driverClass}" ></property>
                        <property name="user" value="${jdbc.user}" ></property>
                        <property name="password" value="${jdbc.password}" ></property>
                        </bean>
                        <!-- mybatis工厂 -->
                        <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
                            <property name="dataSource" ref="dataSource"></property>
                            <!-- 读取mybatis核心的配置的文件 -->
                            <property name="configLocation" value="classpath:sqlMapConfig.xml"></property>
                            </bean>
                            <!-- 实例化Action层 -->

                            <!-- 实例化service层bean -->
                            <bean id="userService" class="com.leo.service.impl.UserServiceImpl">
                                <property name="userDao" ref="userDao"></property>
                                </bean>
                                <!-- 实例化dao层bean -->
                                <bean id="userDao" class="com.leo.dao.impl.UserDaoImpl">
                                    <property name="sqlSessionFactory" ref="sqlSessionFactory"></property>
                                    </bean>
		2.2：数据库连接池信息
			jdbc.jdbcUrl=jdbc:mysql:///mybatis
			jdbc.driverClass=com.mysql.jdbc.Driver
			jdbc.user=root
			jdbc.password=123
		2.3:配置mybatis的核心配置文件：
			<?xml version="1.0" encoding="UTF-8"?>
			<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
            "http://mybatis.org/dtd/mybatis-3-config.dtd">
			<configuration>
                <!-- 引入mapper -->
                <mappers>
                    <package name="com.leo.mapper"/>
                </mappers>
			</configuration>
		2.4:在mapper文件中写入sql语句：
			<?xml version="1.0" encoding="UTF-8"?>
			<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
            "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
			<mapper namespace ="com.leo.mapper.UserMapper">
			<select id="getUserById" parameterType="Integer" resultType="com.leo.domain.User">
				select * from user 
				<where>id=#{id}</where>
			</select>

			</mapper>  
```

### Spring 整合mybatis:用动态代理mapper：

​			1.导包：spring核心包+mybatis核心包+mybatis-spring.jar+c3p0.jar+数据库驱包

​			2.配置核心多的配置文件：

​					(2.1)：配置spring的核心的xml文件，用于spring整合其他的框架

​					(2.2):配置数据源：用于连接数据库

​					(2.3):配置mybatis的核心配置文件：用于引入mapper即映射文件

​					(2.4):配置mapper即pojo映射文件:用于书写sql语句

​				其他的不变只是把applicationContext.xml文件中：
​					

```xml
	方式1.用注入动态mapper接口让spring实例化	需要注入sqlSessionFactory和接口的路径
<!-- mybatis工厂 -->
<bean id="sqlSessionFactorybean" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <!-- 读取mybatis核心的配置的文件 -->
    <property name="configLocation" value="classpath:sqlMapConfig.xml"></property>
</bean>
<!--使用mapper的动态代理的模式，让spring来创建 
        <bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
         <property name="sqlSessionFactory" ref="sqlSessionFactorybean"></property>
         <property name="mapperInterface" value="com.leo.mapper.UserMapper"></property>
        </bean>-->
方式2.使用让spring自动扫描这个包下的所有的接口并实例化这样通过
UserMapper bean = context.getBean(UserMapper.class);
User user=bean.getUserById(10);
System.out.println(user);
直接就可以了
<!-- mybatis工厂 -->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <!-- 读取mybatis核心的配置的文件 -->
    <property name="configLocation" value="classpath:sqlMapConfig.xml"></property>
</bean>
<!--使用mapper动态代理  扫描的方式：这时就把mapper接口给实例化了 -->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer"> 
    <!--  指定基本包-->
    <property name="basePackage" value="com.leo.mapper"></property>
</bean>
```

需要在这个接口中声明其方法

### 出现的问题

#### 出现的错误：org.apache.ibatis.binding.BindingException: Invalid bound statement (not found)

解释：就是说，你的Mapper接口，被Spring注入后，却无法正常的使用mapper.xml的sql

  这里的Spring注入后的意思是，你的接口已经成功的被扫描到，但是当Spring尝试注入一个代理（MyBatist实现）的实现类后，却无法正常使用。这里的可能发生的情况有如下几种；
   接口已经被扫描到，但是代理对象没有找到，即使尝试注入，也是注入一个错误的对象（可能就是null）
   接口已经被扫描到，代理对象找到了，也注入到接口上了，但是调用某个具体方法时，却无法使用（可能别的方法是正常的）
   当然，我们不好说是那种情况，毕竟报错的结果是一样的，这里就提供几种排查方法：
> mapper接口和mapper.xml是否在同一个包（package)下？名字是否一样（仅后缀不同）？

  比如，接口名是NameMapper.java;对应的xml就应该是NameMapper.xml

> mapper.xml的命名空间（namespace）是否跟mapper接口的包名一致？

  比如，你接口的包名是com.abc.dao,接口名是NameMapper.java，那么你的mapper.xml的namespace应该是com.abc.dao.NameMapper
> 接口的方法名，与xml中的一条sql标签的id一致?
   比如，接口的方法 `List<User> findAll()`;那么，对应的xml里面一定有一条是`<select id="findAll" resultMap="**"></select>`
如果接口中的返回值List集合（不知道其他集合也是），那么xml里面的配置，尽量用resultMap（保证resultMap配置正确）,不要用resultType 最后，如果你的项目是maven项目，请你在编译后，到接口所在目录看一看，很有可能是没有生产对应的xml文件，因为maven默认是不编译的，因此，你需要在你的pom.xml的`<build></build>`里面，加这么一段：
```xml
  <resources>
      <resource>
      	<directory>src/main/java</directory>
      <includes>
      	<include>**/*.xml</include>
      </includes>
      <filtering>true</filtering>
      </resource>
  </resources>
```
#### org.apache.ibatis.executor.ExecutorException: No constructor found in com.leo.course.scheduling.domain.Department matching [java.lang.Integer, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.sql.Timestamp, java.lang.String]

有上面打印的信息来说是没有提供默认的构造函数，可是我已经书写了有参的构造函数，看下面的实体类

其中源码中创建构造函数签名这个类中，必须要通过反射获取声明的构造者：
`final Constructor<?>[] constructors = resultType.getDeclaredConstructors();`

先是要判断是否构造函数为空，不为空的话创建这个构造函数，如果为空，先进行对其进行遍历，如果是允许这个构造函数的者进行使用，如果不符合上面的规则，抛出异常，    `throw new ExecutorException("No constructor found in " + resultType.getName() + " matching " + rsw.getClassNames());`

使用这个构造函数进行创建是主要使用其构造函数，说明了这里并没有使用new出对象，因为new的时候必定会加入这个默认构造器而这里是通过反射获取的所以不能为其自动加入这个构造器，所以这就是问题的最终原因，只需要把构造器函数给写出来。

在看下反射类中的所获得对象的构造方法

`publicConstructor<T> getConstructor(Class<?>... parameterTypes)：`获取单个构造方法，参数表示的是：你要获取的构造方法的构造参数个数及数据类型的class字节码文件对象

  `publicConstructor<T> getDeclaredConstructor(Class<?>... parameterTypes)：`获取单个构造方法（能获取私有的，但要用Constructor类的setAccessible方法设置访问权限），参数表示的是：你要获取的构造方法的构造参数个数及数据类型的class字节码文件对象
所以条件都不能够满足所以出现异常。

### Mybatis相关的面试题：

1. 什么是Mybatis?

2. Mybatis的优点:

3. Mybatis框架的缺点:

4. Mybatis框架适用场合:

5. Mybatis与Hibernate有哪些不同?

6. `\#`和`$`的区别是什么?

7. 当实体类中的属性名和表中的字段名不一样·怎么办?

8. 模糊查询like语词该怎么写?

   使用bind标签语句

   

9. 通常一个Xml映射文件,都会写一个Dao接口与之对应,请问,这个Dao接口的工作原理是tDa

10. Mybatis是如何进行分页的?分页插件的原理是什么?

11. Mybatis是如何将sq执行结果封装为目标对象并返回的都有哪些映射形式?

12. 如何执行批里插入?

13. 如何获取自动生成的(主)键值?

14. 在mapper中如何传递多个参数?

15. Mybatis动态sql有什么用?执行原理?有哪些动态sql?

16. Xm1映射文件中,除了常见的select |insert lupdae |delete标签之外，还有

17. 为什么说Mybatis是半自动动ORM映射工具?它与全自动的区别在哪里?

18. —对—、—对多的关联查询全

19. Mybatis实现—对—有几种方式?具体怎么操作的?

20. Mybatis实现—对多有几种方式,怎么操作的?

21. Mybatis是否支持延迟加载如果支持,它的实现原理是什么?

22. Mybatis的一级、二级缓存:

23. 什么是Mybatis的接口绑定?有哪些实现方式?

24. 使用MyBatis的的mapper接口调用时有哪些要求?

25. Mapper编写有哪几种方式?

26. 简述Mybatis的插件运行原理,以及如何编义