---
title: tkmybatis
autoGroup-2: 高级
---

## 通用mapper：tkmybatis

https://github.com/abel533/Mapper/wiki

### Java 编码方式集成

Java 编码方式集成是最少见的一种情况，但是通过这种集成方式可以很容易让大家看清通用 Mapper 集成的入口，这里会提供两种方式。

1. 最直接的方式
2. 使用 `Configuration` 作为入口集成

#### 添加依赖

在开始写代码前，先把依赖添加进来。

在 Java 编码集成方式中，首先你肯定已经引入了 MyBatis 的依赖：

```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>版本号</version>
</dependency>
```

> 所有版本号看这里：http://mvnrepository.com/artifact/org.mybatis/mybatis
>
> 通用 Mapper 支持 MyBatis 3.2.4+

在 mybatis 依赖的基础上，添加通用 Mapper 的依赖即可：

```xml
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper</artifactId>
    <version>最新版本</version>
</dependency>
```

> 最新版本看这里：http://mvnrepository.com/artifact/tk.mybatis/mapper

*如果你使用的 Jar 包，你可以通过上面提供的链接下载 Jar。*

#### 编写代码集成

使用 Java 编码方式时，正常情况下你都会有构建 `SqlSessionFactory` 的代码。

在创建 `SqlSessionFactory` 对象**前**或者**后**对应两种配置通用 Mapper 的方法，由于没有提供 mybatis-config.xml 文件的解析类，这里会推荐使用 **创建后** 的方式来创建。

##### 创建后

在创建 `SqlSessionFactory` 后，在任何其他调用发生前，使用下面的方式配置通用 Mapper。

```java
//从刚刚创建的 sqlSessionFactory 中获取 session
session = sqlSessionFactory.openSession();
//创建一个MapperHelper
MapperHelper mapperHelper = new MapperHelper();
//特殊配置
Config config = new Config();
//主键自增回写方法,默认值MYSQL,详细说明请看文档
config.setIDENTITY("MYSQL");
//支持getter和setter方法上的注解
config.setEnableMethodAnnotation(true);
//设置 insert 和 update 中，是否判断字符串类型!=''
config.setNotEmpty(true);
//校验Example中的类型和最终调用时Mapper的泛型是否一致
config.setCheckExampleEntityClass(true);
//启用简单类型
config.setUseSimpleType(true);
//枚举按简单类型处理
config.setEnumAsSimpleType(true);
//自动处理关键字 - mysql
config.setWrapKeyword("`{0}`");
//设置配置
mapperHelper.setConfig(config);
//注册通用接口，和其他集成方式中的 mappers 参数作用相同
//4.0 之后的版本，如果类似 Mapper.class 这样的基础接口带有 @RegisterMapper 注解，就不必在这里注册
mapperHelper.registerMapper(Mapper.class);
//配置 mapperHelper 后，执行下面的操作
mapperHelper.processConfiguration(session.getConfiguration());
```

如果省略 `Config` 的配置，上述代码简化为：

```
//从刚刚创建的 sqlSessionFactory 中获取 session
session = sqlSessionFactory.openSession();
//创建一个MapperHelper
MapperHelper mapperHelper = new MapperHelper();
mapperHelper.processConfiguration(session.getConfiguration());
```

> 通用 Mapper 默认就是通过 session.getConfiguration() 获取所有的 MyBatis 方法，然后对其中属于通用方法的方法进行处理。

#####  创建前

创建前就是通过使用 `tk.mybatis.mapper.session.Configuration` 替换 MyBatis 中的 `org.apache.ibatis.session.Configuration `来实现。配置代码如下：

```java
Configuration configuration = new Configuration();
//这里可以参考上面的方式来配置 MapperHelper
configuration.setMapperHelper(new MapperHelper());
sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
```

> **实现原理**：
>
> 这种配置方式是通过重写原 `Configuration` 中的 `addMappedStatement` 方法来实现的：
>
> ```java
> @Override
> public void addMappedStatement(MappedStatement ms) {
>   try {
>     super.addMappedStatement(ms);
>     //没有任何配置时，使用默认配置
>     if (this.mapperHelper == null) {
>       this.mapperHelper = new MapperHelper();
>     }
>     this.mapperHelper.processMappedStatement(ms);
>   } catch (IllegalArgumentException e) {
>     //这里的异常是导致 Spring 启动死循环的关键位置，为了避免后续会吞异常，这里直接输出
>     e.printStackTrace();
>     throw new RuntimeException(e);
>   }
> }
> ```

通过上面其中一种方式配置后，通用方法都会生效。

接下来请继续看下一章内容。

####  细化依赖的用法

**首先不推荐 Maven 初学者看这里，也不建议通用 Mapper 初学者看这里**。

在决定是否看之前，先看看细化依赖用法的特点：

- 可以以最精简的方式引入通用 Mapper，按照需要引入。
- 可以将某个依赖替换为自己的实现或者选择特定版本的依赖（比如某些依赖可以选择 Java 6 或者 Java 8 的版本）。

当你需要自己选择具体的依赖时，继续看下面的介绍。

通用 Mapper4 中，原来的 `tk.mybatis:mapper` 项目已经拆分，1.1.1 中添加的依赖是通过特殊打包方式将所有拆分的项目合并到了一个 jar 包中。

如果需要对依赖进行详细的定制，可以分别引入下面的依赖：

```xml
<!-- 必备依赖，提供核心功能 -->
<dependency>
  <groupId>tk.mybatis</groupId>
  <artifactId>mapper-core</artifactId>
  <version>${mapper-core.version}</version>
</dependency>
<!-- 如果需要通用 Mapper 自带的 Mapper 接口和系列方法，需要引入本依赖 -->
<!-- 拆分 base 项目的目的在于以后可能会提供其他的方式来实现接口 -->
<dependency>
  <groupId>tk.mybatis</groupId>
  <artifactId>mapper-base</artifactId>
  <version>${mapper-base.version}</version>
</dependency>
<!-- 针对开发人员的需要提供的一些额外的接口，都有特殊的使用要求 -->
<dependency>
  <groupId>tk.mybatis</groupId>
  <artifactId>mapper-extra</artifactId>
  <version>${mapper-extra.version}</version>
</dependency>
<!-- 基于 Java8 方法引用的类 Example 对象 Weekend -->
<dependency>
  <groupId>tk.mybatis</groupId>
  <artifactId>mapper-weekend</artifactId>
  <version>${mapper-weekend.version}</version>
</dependency>
<!-- 代码生成器 -->
<dependency>
  <groupId>tk.mybatis</groupId>
  <artifactId>mapper-generator</artifactId>
  <version>${mapper-generator.version}</version>
</dependency>
```

通用 Mapper 是一个可以实现任意 MyBatis 通用方法的框架，项目提供了常规的增 删改查操作以及Example相关的单表操作。为什么要用通用mapper？我们这里列举一下 原生Mybatis的痛点：
1、mapper.xml文件里有大量的sql，当数据库表字段变动，配置文件就要修改
2、需要自己实现sql分页，select * from table where . . . limit 1,3
自己手写分页，除了传参page、pageSize，还需要返回条目总数count。
3、数据库可移植性差：如果项目更换数据库，比如oracle-->mysql，mapper.xml中的 sql要重新写，因为Oracle的PLSQL 和mysql 支持的函数是不同的。 4、生成的代码量过大。
5、批量操作，批量插入，批量更新，需要自写。
而这些，通过通用mapper就可以很轻松的解决了。 

### 通用mapper与spring集成：

```xml
 
集成通用 Mapper 在上面的基础上添加下面的依赖：
 
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>版本号</version>
</dependency>
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis-spring</artifactId>
  <version>版本号</version>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>版本号</version>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-tx</artifactId>
  <version>版本号</version>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-jdbc</artifactId>
  <version>版本号</version>
</dependency>
###通用mapper需要集成以下的
<dependency>     
    <groupId>tk.mybatis</groupId>  
    <artifactId>mapper</artifactId> 
    <version>最新版本</version> 
</dependency>
```

和通用 Mapper 以前版本一样，可以直接使用 tk.mybatis 提供 的  tk.mybatis.spring.mapper.MapperScannerConfigurer  进行配置，这个配置和 MyBatis 官方提供的  org.mybatis.spring.mapper.MapperScannerConfigurer  区别只是 第一层的包名， tk  和  org 。所以使用这种方式时，如果你项目已经使用  org.  进行了 配置，只需要改成  tk.  即可。

```xml
<bean class="tk.mybatis.spring.mapper.MapperScannerConfigurer">     
<property name="basePackage" value="扫描包名"/> 
</bean>
```

如果你需要对通用 Mapper 进行特殊配置，可以按下面的方式进行配置：

```xml
<bean class="tk.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="tk.mybatis.mapper.mapper"/>
    <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    <property name="properties">
        <value>
            参数名=值
            参数名2=值2
            ...
        </value>
    </property>
</bean>
```

#### 配置打印sql

```properties
logging.level.com.kaysanshi.dao=debug
```

#### 配置Mapper.mappers：

```yaml
mapper:
  mappers:
    - com.kaysanshi.file.dao.TkMapper
  notEmpty: false
  identity: MYSQL
```

当上面的mapper.mappers路径配置不正确时会报错：

```java
2021-05-15 10:58:43.945  WARN 11824 --- [           main] t.m.s.annotation.MapperScannerRegistrar  : 只有 Spring Boot 环境中可以通过 Environment(配置文件,环境变量,运行参数等方式) 配置通用 Mapper，其他环境请通过 @MapperScan 注解中的 mapperHelperRef 或 properties 参数进行配置!如果你使用 tk.mybatis.mapper.session.Configuration 配置的通用 Mapper，你可以忽略该错误!

java.lang.RuntimeException: java.lang.reflect.InvocationTargetException
	at tk.mybatis.spring.mapper.SpringBootBindUtil$SpringBoot2Bind.bind(SpringBootBindUtil.java:133) ~[mapper-spring-1.1.5.jar:na]
	at tk.mybatis.spring.mapper.SpringBootBindUtil.bind(SpringBootBindUtil.java:58) ~[mapper-spring-1.1.5.jar:na]
	at tk.mybatis.spring.mapper.ClassPathMapperScanner.setMapperProperties(ClassPathMapperScanner.java:278) ~[mapper-spring-1.1.5.jar:na]
	at tk.mybatis.spring.annotation.MapperScannerRegistrar.registerBeanDefinitions(MapperScannerRegistrar.java:103) ~[mapper-spring-1.1.5.jar:na]
	at org.springframework.context.annotation.ImportBeanDefinitionRegistrar.registerBeanDefinitions(ImportBeanDefinitionRegistrar.java:86) [spring-context-5.2.9.RELEASE.jar:5.2.9.RELEASE]
	at org.springframework.context.annotation.ConfigurationClassBeanDefinitionReader.lambda$loadBeanDefinitionsFromRegistrars$1(ConfigurationClassBeanDefinitionReader.java:384) [spring-context-5.2.9.RELEASE.jar:5.2.9.RELEASE]
	at java.util.LinkedHashMap.forEach(LinkedHashMap.java:676) ~[na:1.8.0_91]

```



### 主要的方法

**select**

```
List<T> select(T record)  根据T对象中的属性名称查询,类似于select * from table where t.name=#{name} and  t.password = #{password}
```

```
T selectOne(T record)  根据实体中的属性进行查询，只能有一个返回值，有多个结果是抛出异常，查询条件使用等号

T selectByPrimaryKey(Object key)  根据主键查询   说明：根据主键字段进行查询，方法参数必须包含完整的主键属性，查询条 件使用等号

int selectCount(T record);  说明：根据实体中的属性查询总数，查询条件使用等号
```

**insert**

```
int insert(T record);  说明：保存一个实体，null的属性也会保存，不会使用数据库默认值

int insertSelective(T record);  说明：保存一个实体，null的属性不会保存，会使用数据库默认值
```

**update**

```
int updateByPrimaryKey(T record);  说明：根据主键更新实体全部字段，null值会被更新

int updateByPrimaryKeySelective(T record);  说明：根据主键更新属性不为null的值
```

**delete**

```
int delete(T record);  说明：根据实体属性作为条件进行删除，查询条件使用等号

int deleteByPrimaryKey(Object key);  说明：根据主键字段进行删除，方法参数必须包含完整的主键属性
```

### 通用代码生成器

通用 Mapper 专用代码生成器生成的 Model 会在原有基础上增加 `@Table,@Id,@Column` 等注解，方便自动会数据库字段进行映射。

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis.generator/mybatis-generator-core -->
<dependency>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-core</artifactId>
    <version>1.3.6</version>
</dependency>
<!-- 通用 Mapper -->
<!-- https://mvnrepository.com/artifact/tk.mybatis/mapper -->
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper</artifactId>
    <version>4.0.0</version>
</dependency>
<!-- 如果你只需要用到通用 Mapper 中的插件，可以只引入 mapper-generator -->
<!-- 注意，这个包不需要和上面的 mapper 同时引入，mapper 中包含 generator -->
<!-- https://mvnrepository.com/artifact/tk.mybatis/mapper-generator -->
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-generator</artifactId>
    <version>1.0.0</version>
</dependency>
```

Java代码很容易，和测试中的一样：

```java
public static void main(String[] args) throws Exception {
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = 
                      cp.parseConfiguration(getResourceAsStream("generatorConfig.xml"));
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        myBatisGenerator.generate(null);
        for (String warning : warnings) {
            System.out.println(warning);
        }
    }
```

> 注意，测试中还有 `startDB` 等方法，这是因为测试中使用的 hsqldb 内存数据库。

这段代码容易，最主要的一个内容是`"generatorConfig.xml"`,我们应该如何配置该类。

下面是一个[`generatorConfig.xml`](https://github.com/abel533/Mapper/blob/master/generator/src/test/resources/generatorConfig.xml)的例子：

```xml
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<!--suppress MybatisGenerateCustomPluginInspection -->
<generatorConfiguration>
    <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">
        <property name="javaFileEncoding" value="UTF-8"/>
        <property name="useMapperCommentGenerator" value="false"/>

        <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
            <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
            <property name="caseSensitive" value="true"/>
            <property name="forceAnnotation" value="true"/>
            <property name="beginningDelimiter" value="`"/>
            <property name="endingDelimiter" value="`"/>
        </plugin>

        <jdbcConnection driverClass="org.hsqldb.jdbcDriver"
                        connectionURL="jdbc:hsqldb:mem:generator"
                        userId="sa"
                        password="">
        </jdbcConnection>

        <!--MyBatis 生成器只需要生成 Model-->
        <javaModelGenerator targetPackage="test.model" 
                            targetProject="generator/src/test/java"/>

        <table tableName="user_info">
            <generatedKey column="id" sqlStatement="JDBC"/>
        </table>
        <table tableName="country">
            <generatedKey column="id" sqlStatement="JDBC"/>
        </table>
    </context>
</generatorConfiguration>
```

和一般的配置相比，这里只是多了一个插件的配置：

```xml
<plugin type="tk.mybatis.mapper.generator.MapperPlugin">
    <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
    <property name="caseSensitive" value="true"/>
    <property name="forceAnnotation" value="true"/>
    <property name="beginningDelimiter" value="`"/>
    <property name="endingDelimiter" value="`"/>
</plugin>
```

这里最关键的参数就是 `mappers`，配置后生成的 Mapper 接口都会自动继承上改接口，如果你定义了一个自己的基础接口，例如：

```java
package xxx.base;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * 继承自己的MyMapper
 */
public interface MyMapper<T> extends Mapper<T>, MySqlMapper<T> {
    //TODO
    //FIXME 特别注意，该接口不能被扫描到，否则会出错
}
```

<font color="red">这个baseMapper不能和MapperScan('xxx.dao') 被扫描的包在同一路径不然会报错  MapperScan里的basePackage不能包含通用mapper（我的是dao）的路径，只包含其他的mapper的路径，不然会报错：</font>

```java
org.springframework.beans.factory.BeanCreationException: Error creating bean with name   XXXX   Invocation of init method failed; nested exception is tk.mybatis.mapper.MapperException: tk.mybatis.mapper.MapperException: java.lang.ClassCastException: sun.reflect.generics.reflectiveObjects.TypeVariableImpl cannot be cast to java.lang.Class
```

在配置插件时，可以配置为：

```xml
<property name="mappers" value="xxx.base.MyMapper"/>
```

其他参数的含义：

- caseSensitive 是否区分大小写，默认值 `false`。如果数据库区分大小写，这里就需要配置为 `true`，这样当表名为 `USER` 时，会生成 `@Table(name = "USER")` 注解，否则使用小写 `user` 时会找不到表。
- forceAnnotation 是否强制生成注解，默认 `false`，如果设置为 `true`，不管数据库名和字段名是否一致，都会生成注解（包含 `@Table` 和 `@Column`）。
- beginningDelimiter 和 endingDelimiter 开始和结束分隔符，对于有关键字的情况下适用。
- useMapperCommentGenerator 是否使用通用 Mapper 提供的注释工具，默认 `true` 使用，这样在生成代码时会包含字段的注释（目前只有 mysql 和 oracle 支持），设置 `false` 后会用默认的，或者你可以配置自己的注释插件。
- generateColumnConsts 在生成的 model中，增加字段名的常量，便于使用 Example 拼接查询条件的时候使用。
- lombok 增加 model 代码生成时，可以直接生成 lombok 的 `@Getter@Setter@ToString@Accessors(chain = true)` 四类注解， 使用者在插件配置项中增加 `<property name="lombok" value="Getter,Setter,ToString,Accessors"/>` 即可生成对应包含注解的 model 类。

在上面`<table` 的配置中是针对 MySql 这种自增数据库的，如果使用 ORACLE 序列方式，可以参考下面的配置：

```xml
 <table tableName="country">
   <generatedKey column="id" 
                 sqlStatement="select SEQ_{1}.nextval from dual" 
                 identity="false" type="pre"/>
</table>
```

SQL 中的 `{1}` 代表的是对应表的大写形式，`{0}` 是小写形式，这个配置生成的代码会像下面这样：

```java
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY,
            generator = "select SEQ_COUNTRY.nextval from dual")
    private Integer id;
    // 省略其他
}
```

#### Maven中使用：

```xml
<plugins>
  <plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
      <source>${jdk.version}</source>
      <target>${jdk.version}</target>
    </configuration>
  </plugin>
  <plugin>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-maven-plugin</artifactId>
    <version>1.3.6</version>
    <configuration>
      <configurationFile>
        ${basedir}/src/main/resources/generator/generatorConfig.xml
      </configurationFile>
      <overwrite>true</overwrite>
      <verbose>true</verbose>
    </configuration>
    <dependencies>
      <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.29</version>
      </dependency>
      <dependency>
        <groupId>tk.mybatis</groupId>
        <artifactId>mapper</artifactId>
        <version>4.0.0</version>
      </dependency>
    </dependencies>
  </plugin>
</plugins>
```

在插件中配置了配置文件的路径，覆盖和输出详细日志三个参数。

除此之外需要特别注意的是 `<dependencies>`，MBG 配置中用到的所有外部代码都必须通过依赖方式配置在这里，否则运行时会提示找不到对应的类而报错。这里有两个必须的依赖，一个是 JDBC 驱动，另一个是 Mapper 的插件。

下面看配置文件generatorConfig.xml：

```xml
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <properties resource="config.properties"/>

    <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>

        <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
            <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
            <property name="caseSensitive" value="true"/>
        </plugin>

        <jdbcConnection driverClass="${jdbc.driverClass}"
                        connectionURL="${jdbc.url}"
                        userId="${jdbc.user}"
                        password="${jdbc.password}">
        </jdbcConnection>

        <javaModelGenerator targetPackage="com.isea533.mybatis.model" 
                            targetProject="src/main/java"/>

        <sqlMapGenerator targetPackage="mapper" 
                         targetProject="src/main/resources"/>

        <javaClientGenerator targetPackage="com.isea533.mybatis.mapper" 
                             targetProject="src/main/java"
                             type="XMLMAPPER"/>

        <table tableName="user_info">
            <generatedKey column="id" sqlStatement="JDBC"/>
        </table>
    </context>
</generatorConfiguration>
```

这里和之前相差不多，只是通过 `<properties>` 引入了外部属性文件，在 `<jdbcConnection>` 配置时，使用的属性文件中的参数。

**运行**

在 pom.xml 这一级目录的命令行窗口执行 `mvn mybatis-generator:generate`即可（前提是配置了mvn）。

**更加详细的配置：**

```xml
<xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE generatorConfiguration
      PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
    "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
    <!-- 配置生成器 -->
    <generatorConfiguration>
    <!-- 可以用于加载配置项或者配置文件，在整个配置文件中就可以使用${propertyKey}的方式来引用配置项
        resource：配置资源加载地址，使用resource，MBG从classpath开始找，比如com/myproject/generatorConfig.properties        
        url：配置资源加载地质，使用URL的方式，比如file:///C:/myfolder/generatorConfig.properties.
        注意，两个属性只能选址一个;
    
        另外，如果使用了mybatis-generator-maven-plugin，那么在pom.xml中定义的properties都可以直接在generatorConfig.xml中使用
    <properties resource="" url="" />
     -->
    
     <!-- 在MBG工作的时候，需要额外加载的依赖包
         location属性指明加载jar/zip包的全路径
    <classPathEntry location="/Program Files/IBM/SQLLIB/java/db2java.zip" />
      -->
    
    <!-- 
        context:生成一组对象的环境 
        id:必选，上下文id，用于在生成错误时提示
        defaultModelType:指定生成对象的样式
            1，conditional：类似hierarchical；
            2，flat：所有内容（主键，blob）等全部生成在一个对象中；
            3，hierarchical：主键生成一个XXKey对象(key class)，Blob等单独生成一个对象，其他简单属性在一个对象中(record class)
        targetRuntime:
            1，MyBatis3：默认的值，生成基于MyBatis3.x以上版本的内容，包括XXXBySample；
            2，MyBatis3Simple：类似MyBatis3，只是不生成XXXBySample；
        introspectedColumnImpl：类全限定名，用于扩展MBG
    -->
    <context id="mysql" defaultModelType="hierarchical" targetRuntime="MyBatis3Simple" >
    
        <!-- 自动识别数据库关键字，默认false，如果设置为true，根据SqlReservedWords中定义的关键字列表；
            一般保留默认值，遇到数据库关键字（Java关键字），使用columnOverride覆盖
         -->
        <property name="autoDelimitKeywords" value="false"/>
        <!-- 生成的Java文件的编码 -->
        <property name="javaFileEncoding" value="UTF-8"/>
        <!-- 格式化java代码 -->
        <property name="javaFormatter" value="org.mybatis.generator.api.dom.DefaultJavaFormatter"/>
        <!-- 格式化XML代码 -->
        <property name="xmlFormatter" value="org.mybatis.generator.api.dom.DefaultXmlFormatter"/>
    
        <!-- beginningDelimiter和endingDelimiter：指明数据库的用于标记数据库对象名的符号，比如ORACLE就是双引号，MYSQL默认是`反引号； -->
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>
    
        <!-- 必须要有的，使用这个配置链接数据库
            @TODO:是否可以扩展
         -->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver" connectionURL="jdbc:mysql:///pss" userId="root" password="T">
            <!-- 这里面可以设置property属性，每一个property属性都设置到配置的Driver上 -->
        </jdbcConnection>
    
        <!-- java类型处理器 
            用于处理DB中的类型到Java中的类型，默认使用JavaTypeResolverDefaultImpl；
            注意一点，默认会先尝试使用Integer，Long，Short等来对应DECIMAL和 NUMERIC数据类型； 
        -->
        <javaTypeResolver type="org.mybatis.generator.internal.types.JavaTypeResolverDefaultImpl">
            <!-- 
                true：使用BigDecimal对应DECIMAL和 NUMERIC数据类型
                false：默认,
                    scale>0;length>18：使用BigDecimal;
                    scale=0;length[10,18]：使用Long；
                    scale=0;length[5,9]：使用Integer；
                    scale=0;length<5：使用Short；
             -->
            <property name="forceBigDecimals" value="false"/>
        </javaTypeResolver>
    
    
        <!-- java模型创建器，是必须要的元素
            负责：1，key类（见context的defaultModelType）；2，java类；3，查询类
            targetPackage：生成的类要放的包，真实的包受enableSubPackages属性控制；
            targetProject：目标项目，指定一个存在的目录下，生成的内容会放到指定目录中，如果目录不存在，MBG不会自动建目录
         -->
        <javaModelGenerator targetPackage="com._520it.mybatis.domain" targetProject="src/main/java">
            <!--  for MyBatis3/MyBatis3Simple
                自动为每一个生成的类创建一个构造方法，构造方法包含了所有的field；而不是使用setter；
             -->
            <property name="constructorBased" value="false"/>
    
            <!-- 在targetPackage的基础上，根据数据库的schema再生成一层package，最终生成的类放在这个package下，默认为false -->
            <property name="enableSubPackages" value="true"/>
    
            <!-- for MyBatis3 / MyBatis3Simple
                是否创建一个不可变的类，如果为true，
                那么MBG会创建一个没有setter方法的类，取而代之的是类似constructorBased的类
             -->
            <property name="immutable" value="false"/>
    
            <!-- 设置一个根对象，
                如果设置了这个根对象，那么生成的keyClass或者recordClass会继承这个类；在Table的rootClass属性中可以覆盖该选项
                注意：如果在key class或者record class中有root class相同的属性，MBG就不会重新生成这些属性了，包括：
                    1，属性名相同，类型相同，有相同的getter/setter方法；
             -->
            <property name="rootClass" value="com._520it.mybatis.domain.BaseDomain"/>
    
            <!-- 设置是否在getter方法中，对String类型字段调用trim()方法 -->
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>
    
    
        <!-- 生成SQL map的XML文件生成器，
            注意，在Mybatis3之后，我们可以使用mapper.xml文件+Mapper接口（或者不用mapper接口），
                或者只使用Mapper接口+Annotation，所以，如果 javaClientGenerator配置中配置了需要生成XML的话，这个元素就必须配置
            targetPackage/targetProject:同javaModelGenerator
         -->
        <sqlMapGenerator targetPackage="com._520it.mybatis.mapper" targetProject="src/main/resources">
            <!-- 在targetPackage的基础上，根据数据库的schema再生成一层package，最终生成的类放在这个package下，默认为false -->
            <property name="enableSubPackages" value="true"/>
        </sqlMapGenerator>
    
    
        <!-- 对于mybatis来说，即生成Mapper接口，注意，如果没有配置该元素，那么默认不会生成Mapper接口 
            targetPackage/targetProject:同javaModelGenerator
            type：选择怎么生成mapper接口（在MyBatis3/MyBatis3Simple下）：
                1，ANNOTATEDMAPPER：会生成使用Mapper接口+Annotation的方式创建（SQL生成在annotation中），不会生成对应的XML；
                2，MIXEDMAPPER：使用混合配置，会生成Mapper接口，并适当添加合适的Annotation，但是XML会生成在XML中；
                3，XMLMAPPER：会生成Mapper接口，接口完全依赖XML；
            注意，如果context是MyBatis3Simple：只支持ANNOTATEDMAPPER和XMLMAPPER
        -->
        <javaClientGenerator targetPackage="com._520it.mybatis.mapper" type="ANNOTATEDMAPPER" targetProject="src/main/java">
            <!-- 在targetPackage的基础上，根据数据库的schema再生成一层package，最终生成的类放在这个package下，默认为false -->
            <property name="enableSubPackages" value="true"/>
    
            <!-- 可以为所有生成的接口添加一个父接口，但是MBG只负责生成，不负责检查
            <property name="rootInterface" value=""/>
             -->
        </javaClientGenerator>
    
        <!-- 选择一个table来生成相关文件，可以有一个或多个table，必须要有table元素
            选择的table会生成一下文件：
            1，SQL map文件
            2，生成一个主键类；
            3，除了BLOB和主键的其他字段的类；
            4，包含BLOB的类；
            5，一个用户生成动态查询的条件类（selectByExample, deleteByExample），可选；
            6，Mapper接口（可选）
    
            tableName（必要）：要生成对象的表名；
            注意：大小写敏感问题。正常情况下，MBG会自动的去识别数据库标识符的大小写敏感度，在一般情况下，MBG会
                根据设置的schema，catalog或tablename去查询数据表，按照下面的流程：
                1，如果schema，catalog或tablename中有空格，那么设置的是什么格式，就精确的使用指定的大小写格式去查询；
                2，否则，如果数据库的标识符使用大写的，那么MBG自动把表名变成大写再查找；
                3，否则，如果数据库的标识符使用小写的，那么MBG自动把表名变成小写再查找；
                4，否则，使用指定的大小写格式查询；
            另外的，如果在创建表的时候，使用的""把数据库对象规定大小写，就算数据库标识符是使用的大写，在这种情况下也会使用给定的大小写来创建表名；
            这个时候，请设置delimitIdentifiers="true"即可保留大小写格式；
    
            可选：
            1，schema：数据库的schema；
            2，catalog：数据库的catalog；
            3，alias：为数据表设置的别名，如果设置了alias，那么生成的所有的SELECT SQL语句中，列名会变成：alias_actualColumnName
            4，domainObjectName：生成的domain类的名字，如果不设置，直接使用表名作为domain类的名字；可以设置为somepck.domainName，那么会自动把domainName类再放到somepck包里面；
            5，enableInsert（默认true）：指定是否生成insert语句；
            6，enableSelectByPrimaryKey（默认true）：指定是否生成按照主键查询对象的语句（就是getById或get）；
            7，enableSelectByExample（默认true）：MyBatis3Simple为false，指定是否生成动态查询语句；
            8，enableUpdateByPrimaryKey（默认true）：指定是否生成按照主键修改对象的语句（即update)；
            9，enableDeleteByPrimaryKey（默认true）：指定是否生成按照主键删除对象的语句（即delete）；
            10，enableDeleteByExample（默认true）：MyBatis3Simple为false，指定是否生成动态删除语句；
            11，enableCountByExample（默认true）：MyBatis3Simple为false，指定是否生成动态查询总条数语句（用于分页的总条数查询）；
            12，enableUpdateByExample（默认true）：MyBatis3Simple为false，指定是否生成动态修改语句（只修改对象中不为空的属性）；
            13，modelType：参考context元素的defaultModelType，相当于覆盖；
            14，delimitIdentifiers：参考tableName的解释，注意，默认的delimitIdentifiers是双引号，如果类似MYSQL这样的数据库，使用的是`（反引号，那么还需要设置context的beginningDelimiter和endingDelimiter属性）
            15，delimitAllColumns：设置是否所有生成的SQL中的列名都使用标识符引起来。默认为false，delimitIdentifiers参考context的属性
    
            注意，table里面很多参数都是对javaModelGenerator，context等元素的默认属性的一个复写；
         -->
        <table tableName="userinfo" >
    
            <!-- 参考 javaModelGenerator 的 constructorBased属性-->
            <property name="constructorBased" value="false"/>
    
            <!-- 默认为false，如果设置为true，在生成的SQL中，table名字不会加上catalog或schema； -->
            <property name="ignoreQualifiersAtRuntime" value="false"/>
    
            <!-- 参考 javaModelGenerator 的 immutable 属性 -->
            <property name="immutable" value="false"/>
    
            <!-- 指定是否只生成domain类，如果设置为true，只生成domain类，如果还配置了sqlMapGenerator，那么在mapper XML文件中，只生成resultMap元素 -->
            <property name="modelOnly" value="false"/>
    
            <!-- 参考 javaModelGenerator 的 rootClass 属性 
            <property name="rootClass" value=""/>
             -->
    
            <!-- 参考javaClientGenerator 的  rootInterface 属性
            <property name="rootInterface" value=""/>
            -->
    
            <!-- 如果设置了runtimeCatalog，那么在生成的SQL中，使用该指定的catalog，而不是table元素上的catalog 
            <property name="runtimeCatalog" value=""/>
            -->
    
            <!-- 如果设置了runtimeSchema，那么在生成的SQL中，使用该指定的schema，而不是table元素上的schema 
            <property name="runtimeSchema" value=""/>
            -->
    
            <!-- 如果设置了runtimeTableName，那么在生成的SQL中，使用该指定的tablename，而不是table元素上的tablename 
            <property name="runtimeTableName" value=""/>
            -->
    
            <!-- 注意，该属性只针对MyBatis3Simple有用；
                如果选择的runtime是MyBatis3Simple，那么会生成一个SelectAll方法，如果指定了selectAllOrderByClause，那么会在该SQL中添加指定的这个order条件；
             -->
            <property name="selectAllOrderByClause" value="age desc,username asc"/>
    
            <!-- 如果设置为true，生成的model类会直接使用column本身的名字，而不会再使用驼峰命名方法，比如BORN_DATE，生成的属性名字就是BORN_DATE,而不会是bornDate -->
            <property name="useActualColumnNames" value="false"/>
    
    
            <!-- generatedKey用于生成生成主键的方法，
                如果设置了该元素，MBG会在生成的<insert>元素中生成一条正确的<selectKey>元素，该元素可选
                column:主键的列名；
                sqlStatement：要生成的selectKey语句，有以下可选项：
                    Cloudscape:相当于selectKey的SQL为： VALUES IDENTITY_VAL_LOCAL()
                    DB2       :相当于selectKey的SQL为： VALUES IDENTITY_VAL_LOCAL()
                    DB2_MF    :相当于selectKey的SQL为：SELECT IDENTITY_VAL_LOCAL() FROM SYSIBM.SYSDUMMY1
                    Derby      :相当于selectKey的SQL为：VALUES IDENTITY_VAL_LOCAL()
                    HSQLDB      :相当于selectKey的SQL为：CALL IDENTITY()
                    Informix  :相当于selectKey的SQL为：select dbinfo('sqlca.sqlerrd1') from systables where tabid=1
                    MySql      :相当于selectKey的SQL为：SELECT LAST_INSERT_ID()
                    SqlServer :相当于selectKey的SQL为：SELECT SCOPE_IDENTITY()
                    SYBASE      :相当于selectKey的SQL为：SELECT @@IDENTITY
                    JDBC      :相当于在生成的insert元素上添加useGeneratedKeys="true"和keyProperty属性
            <generatedKey column="" sqlStatement=""/>
             -->
    
            <!-- 
                该元素会在根据表中列名计算对象属性名之前先重命名列名，非常适合用于表中的列都有公用的前缀字符串的时候，
                比如列名为：CUST_ID,CUST_NAME,CUST_EMAIL,CUST_ADDRESS等；
                那么就可以设置searchString为"^CUST_"，并使用空白替换，那么生成的Customer对象中的属性名称就不是
                custId,custName等，而是先被替换为ID,NAME,EMAIL,然后变成属性：id，name，email；
    
                注意，MBG是使用java.util.regex.Matcher.replaceAll来替换searchString和replaceString的，
                如果使用了columnOverride元素，该属性无效；
    
            <columnRenamingRule searchString="" replaceString=""/>
             -->
    
    
             <!-- 用来修改表中某个列的属性，MBG会使用修改后的列来生成domain的属性；
                 column:要重新设置的列名；
                 注意，一个table元素中可以有多个columnOverride元素哈~
              -->
             <columnOverride column="username">
                 <!-- 使用property属性来指定列要生成的属性名称 -->
                 <property name="property" value="userName"/>
    
                 <!-- javaType用于指定生成的domain的属性类型，使用类型的全限定名
                 <property name="javaType" value=""/>
                  -->
    
                 <!-- jdbcType用于指定该列的JDBC类型 
                 <property name="jdbcType" value=""/>
                  -->
    
                 <!-- typeHandler 用于指定该列使用到的TypeHandler，如果要指定，配置类型处理器的全限定名
                     注意，mybatis中，不会生成到mybatis-config.xml中的typeHandler
                     只会生成类似：where id = #{id,jdbcType=BIGINT,typeHandler=com._520it.mybatis.MyTypeHandler}的参数描述
                 <property name="jdbcType" value=""/>
                 -->
    
                 <!-- 参考table元素的delimitAllColumns配置，默认为false
                 <property name="delimitedColumnName" value=""/>
                  -->
             </columnOverride>
    
             <!-- ignoreColumn设置一个MGB忽略的列，如果设置了改列，那么在生成的domain中，生成的SQL中，都不会有该列出现 
                 column:指定要忽略的列的名字；
                 delimitedColumnName：参考table元素的delimitAllColumns配置，默认为false
    
                 注意，一个table元素中可以有多个ignoreColumn元素
             <ignoreColumn column="deptId" delimitedColumnName=""/>
             -->
        </table>
    
    </context>
    
    </generatorConfiguration>
```



### 通用代码生成器实例：

```xml
        <dependency>
            <groupId>tk.mybatis</groupId>
            <artifactId>mapper-spring-boot-starter</artifactId>
            <version>2.1.5</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>tk.mybatis</groupId>
            <artifactId>mapper</artifactId>
            <version>3.4.4</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.5</version>
                <configuration>
                    <configurationFile>${basedir}/src/main/resources/generator/generatorConfig.xml</configurationFile>
                    <overwrite>true</overwrite>
                    <verbose>true</verbose>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>mysql</groupId>
                        <artifactId>mysql-connector-java</artifactId>
                        <version>${mysql.version}</version>
                    </dependency>
                    <dependency>
                        <groupId>tk.mybatis</groupId>
                        <artifactId>mapper</artifactId>
                        <version>3.4.4</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
```

在配置genratorConfig.xml,使用插件直接运行即可

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <!-- 引入数据库连接配置 -->
    <properties resource="jdbc.properties"/>

    <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>

        <!-- 配置 tk.mybatis 插件 -->
        <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
            <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
        </plugin>

        <!-- 配置数据库连接 -->
        <jdbcConnection
                driverClass="${jdbc.driverClass}"
                connectionURL="${jdbc.connectionURL}"
                userId="${jdbc.username}"
                password="${jdbc.password}">
            <!--<property name="nullCatalogMeansCurrent" value="true"/> 不支持catalog-->
        </jdbcConnection>

        <!-- 配置实体类存放路径 -->
        <javaModelGenerator targetPackage="com.kayleoi.springbootshop.domain" targetProject="src/main/java"/>

        <!-- 配置 XML 存放路径 -->
        <sqlMapGenerator targetPackage="mapper" targetProject="src/main/resources/mybatis"/>

        <!-- 配置 DAO 存放路径 -->
        <javaClientGenerator
                targetPackage="com.kayleoi.springbootshop.dao"
                targetProject="src/main/java"
                type="XMLMAPPER"/>

        <!-- 配置需要生成的表，% 代表所有 -->
        <table catalog="spring-boot-shop" tableName="%">
            <!-- mysql 配置  主键标识-->
            <!--<generatedKey column="id" sqlStatement="Mysql" identity="false"/>-->
        </table>
    </context>
</generatorConfiguration>
```

## 使用Tomcat8插件：

```xml
<build>

        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat8-maven-plugin</artifactId>
                <version>3.0-r1655215</version>
                <configuration>
                    <!-- 指定端口 -->
                    <port>9001</port>
                    <!-- 请求路径 -->
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </build>
    <pluginRepositories>
        <pluginRepository>
            <id>alfresco-public</id>
            <url>https://artifacts.alfresco.com/nexus/content/groups/public</url>
        </pluginRepository>
        <pluginRepository>
            <id>alfresco-public-snapshots</id>
            <url>https://artifacts.alfresco.com/nexus/content/groups/public-snapshots</url>
            <snapshots>
                <enabled>true</enabled>
                <updatePolicy>daily</updatePolicy>
            </snapshots>
        </pluginRepository>
        <pluginRepository>
            <id>beardedgeeks-releases</id>
            <url>http://beardedgeeks.googlecode.com/svn/repository/releases</url>
        </pluginRepository>
    </pluginRepositories>
```

