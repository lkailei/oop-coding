---
title: Spring MVC
autoGroup-2: 高级
---
## Spring MVC：

Spring web MVC 提供了模型-视图-控制体系结构来灵活的开发，松散耦合的web的应用的组件 。MVC 模式导致了应用程序的不同方面(输入逻辑、业务逻辑和 UI 逻辑)的分离，同时提供了在这些元素之间的松散耦合。模型封装了应用程序数据，并且通常它们由 POJO 组成。视图主要用于呈现模型数据，并且通常它生成客户端的浏览器可以解释的 HTML 输出。控制器主要用于处理用户请求，并且构建合适的模型并将其传递到视图呈现。

### Spring MVC架构：

​	主要就是DispatcherServlet进行对各个组件的调用以及各个组件对DispatcherSevlet的响应

> 包括组件有：DispatcherServlet:相当于mvc中的contol,是整个流程控制的中心，由他调用其他组件，降低了组件之间的耦合，

​		`HandlerMapping:`处理映射器根据url找到Handler处理器

​		`Handler:` 是后端控制器在前端控制器下对用户处理请求，需要自己开发里面的业务逻辑

​		`HandlAdaptcher:` 这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行

​		`ViewResolver:`视图解析器将结果生成View视图，View Resolver首先根据逻辑视图名解析成物理视图名即具体的页面地址，再生成View视图对象，最后对View进行渲染将处理结果通过页面展示给用户

​		`View:`其中视图包括jstlView,fremarkerView,padfView,最常用的为jsp一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面

在springmvc的各个组件中，处理器映射器、处理器适配器、视图解析器称为springmvc的三大组件。

#### 架构流程：

[![2yeYLV.png](https://z3.ax1x.com/2021/06/09/2yeYLV.png)](https://imgtu.com/i/2yeYLV)

1. 请求--->前端控制器DispatcherServlet
2. DispatcherServlet调用HandlerMapping处理器映射器
3. 处理器映射器根据请求url找到具体的处理器，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet。
4. DispatcherServlet通过HandlerAdapter处理器适配器调用处理器
5. 执行处理器(Controller，也叫后端控制器)。
6. Controller执行完成返回ModelAndView
7. HandlerAdapter将controller执行结果ModelAndView返回给DispatcherServlet
8. DispatcherServlet将ModelAndView传给ViewReslover视图解析器
9. ViewReslover解析后返回具体View
10. DispatcherServlet对View进行渲染视图（即将模型数据填充至视图中）。
11. DispatcherServlet响应用户

####  DispatcherServlet：

Spring Web 模型-视图-控制（MVC）框架是围绕 DispatcherServlet 设计的，DispatcherServlet 用来处理所有的 HTTP 请求和响应。DispatcherServlet是前置控制器，配置在web.xml文件中的。拦截匹配的请求，Servlet拦截匹配规则要自己定义，把拦截下来的请求，依据相应的规则分发到目标Controller来处理，是配置spring MVC的第一步。

DispatcherServlet是前端控制器设计模式的实现，提供Spring Web MVC的集中访问点，而且负责职责的分派，而且与Spring IoC容器无缝集成，从而可以获得Spring的所有好处。

##### 主要职责

1. 文件上传解析，如果请求类型是multipart将通过MultipartResolver进行文件上传解析；
2. 通过HandlerMapping，将请求映射到处理器（返回一个HandlerExecutionChain，它包括一个处理器、多个HandlerInterceptor拦截器）；
3. 通过HandlerAdapter支持多种类型的处理器(HandlerExecutionChain中的处理器)；
4. 通过ViewResolver解析逻辑视图名到具体视图实现；
5. 本地化解析；
6. 渲染具体的视图等；
7. 如果执行过程中遇到异常将交给HandlerExceptionResolver来解析。

**DispatcherServlet初始化主要做了如下两件事情：**

1. 初始化SpringMVC使用的Web上下文，并且可能指定父容器为（ContextLoaderListener加载了根上下文）；
2. 初始化DispatcherServlet使用的策略，如HandlerMapping、HandlerAdapter等。

​	上面所提到的所有组件，即 HandlerMapping、Controller 和 ViewResolver 是 WebApplicationContext 的一部分，而 WebApplicationContext 是带有一些对 web 应用程序必要的额外特性的 ApplicationContext 的扩展。

#### 创建Spring MVC项目：

1.导包

2.在web.xml配置spring前端的控制器，指定读取的springMVC的配置文件，创建servlet的映射的		

```xml
<!-- 配置SpringMVC前端控制器 -->
<servlet>
    <servlet-name>spring-mvc</servlet-name>
            <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
      <!-- 指定springmvc的配置文件
        默认路径：/WEB-INF/${servlet-name}-servlet.xml
       -->
            <init-param>
                <param-name>contextConfigLocation</param-name>
                <param-value>classpath:spring-mvc-servlet.xml</param-value>
            </init-param>
      </servlet>
      <!-- 配置映射的及请求设置 -->
      <servlet-mapping>
            <servlet-name>spring-mvc</servlet-name>
        <!-- 设置请求拦截规则
        1./*:不能进行对其访问：No mapping found for HTTP request with URI [/spring-mvc/WEB-INF/jsp/hello.jsp] in DispatcherServlet with name 'spring-mvc'
            拦截所有，jsp,js，css都会拦截，不建议
        2./:拦截所有不包括jsp，肯定可以用
        3.*.action,*.do,拦截do,action的结尾请求，一般用于前台，面向消费者的--->
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

3.配置spring的配置文件：	在applicationContent.xml中配置	

```xml
<!-- 配置controller扫描包 ，多个包调用用","隔开-->
<context:component-scan base-package="com.leo.controller"></context:component-scan>
<!--配置视图解析器  -->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
<!-- 逻辑视图的前缀，后缀 ，逻辑视图名在controller中返回ModelView指定-->
<property name="prefix" value="/WEB-INF/jsp/"></property>
<property name="suffix" value=".jsp"></property>
<!-- 最终的jsp物理地址：前缀+逻辑视图+后缀 -->
</bean>
```

4.创建controller类：控制器配置@Controller//把controller交给spring管理		

```java
@RequestMapping("/hello")//映射url：即指定请求的url地址
public class HelloSpringMVC {
 //设置请求的方法
  @RequestMapping(method=RequestMethod.GET)
   public String printHello(ModelMap model) {
		model.addAttribute("message", "SpringMVC");
		return "hello";
 }
}
```

5.创建视图



### Spring MVC参数绑定：

参数绑定的概念就是将URL中的的请求参数，进行类型转换（String或其他类型），将转换后的值在赋值给Controller方法形参中，然后Controller就可以直接使用该形参。

#### 形参的绑定：

```java
// 要传入形参绑定形参、或者在不通过request获得直接使用指定前台请求过来的参数类型和参数名要相同
public ModelAndView toEdit(Integer id,HttpServletRequest request,HttpServletResponse response,HttpSession session,Model model){}

// 用标签绑定,这是你前台传过来的参数与你这里的方法的参数名不相同时用标签的方法绑定
public ModelAndView toEdit(@RequestParam(value="id",required=false,defaultValue="1") Integer ids,HttpServletRequest request,HttpServletResponse response,HttpSession session,Model model){}
// 采用request对象进行接收
   @RequestMapping(value="/item/toEdit")
   public ModelAndView toEdit(HttpServletRequest request,HttpServletResponse response,HttpSession session,Model model){
   //获得参数
   String idInteger=request.getParameter("id");
   Items items=itemService.getItemById(idInteger);
   ModelAndView mav=new ModelAndView();
   //添加数据
   mav.addObject("item", items);
   //要显示的视图
   mav.setViewName("editItem");
   return mav;			
} 
```

​	

#### 对象类型的参数：

```java
/**
*参数绑定为对象类型的，前台name属性与你的pojo类的字段必须相同,与形参没有关系
*/
@RequestMapping(value="/item/updateitem.action")
public ModelAndView updateItems(Items items){
    //修改
    itemService.updateItemById(items);
    ModelAndView mav=new ModelAndView();
    //要显示的视图
    mav.setViewName("success");
    return mav;

} 
```

#### 包装类型的参数：

```java
/**
* 其实就是一个对象参数绑定	
 @param vo
 @return
 */
public ModelAndView updateitembyQ(QueryVo vo){
    //修改
    itemService.updateItemsByIdByQ(vo.getItems());

    ModelAndView mav = new ModelAndView();
    mav.setViewName("success");
    return mav;	
}

/**

- 在使用list，array时必须使用包装类如果不适用包装不能解析
- spring 未提供这些的方法
- @param vo
*/
//删除多个数组的
@RequestMapping(value = "/deletes.action")
public ModelAndView deletes(QueryVo vo){
    itemService.deleteItemsByIdByQbyArray(vo.getIds());
    ModelAndView mav = new ModelAndView();
    mav.setViewName("success");
    return mav;
}
```

#### 集合类型的参数绑定

```java
    /**
    * 数组类型的：前台传参
    * var array=[]
    * array.push('1');
    * array.push("2")
    * 传参：array
    * curl -X GET  -i http://localhost:6006/user/file/testarray?list=bmd89x&list=bmd89x
    */
    @RequestMaping("/array")
    public testArray(Integer[] userId){
        for(int i: userId){
            System.out.println(i)
        }
    }
    /**
     * testList
     * @param list
     * @return String
     * 前台传参：array
     * curl -X GET  -i http://localhost:6006/user/file/testList?list=0xo0z1&list=0xo0z1
     */
    @RequestMapping("/testList")
    public String testList(List<String> list){
        for(String  s: list){
            System.out.println(s);
        }
        return "true";
    }

    /**
     * testMap
     * @param map
     * @return String
     * 前台传参类型：object
     *	curl -X GET  -i http://localhost:6006/user/file/testMap
     * {"key1":"aaa"}
     */
    @RequestMapping("/testMap")
    public String testMap(Map<String,Object> map){
        for(Map.Entry<String,Object> entry: map.entrySet()){
            System.out.println(entry.getKey()+":"+entry
            .getValue());
        }
        return "";
    }

    /**
     * testSet
     * @param set
     * @return String
	 * 前台传参：类型：array
	 * curl -X GET  -i http://localhost:6006/user/file/set?set=p4d9w2&set=p4d9w2
     */
    @RequestMapping("/set")
    public String testSet(Set<String> set){
        for(String s: set){
            System.out.println(s);
        }
        return "";
    }
```



###  Spring MVC整合mybatis:

​        出现这个错误：BeanFactory not initialized or already closed - call 'refresh' before accessing beans via the Application

​        原因：未能扫描到@controller ，配置controller扫描包 的路径，或者是出现相同的controller的控制器(控制器类的名字相同了)

​        1.导包。

​        2.配置配置文件

> ​        2.1：web.xml
>
> ​        2.2:applicationContext.xml
>
> ​        2.3springmvc-servlert.xml
>
> ​        2.4sqlMapConfig.xml
>
> ​        2.5db.properties
>
> ​        2.6mapper映射xml			 

```xml
    2.1web.xml需要做以下配置：加载spring的配置文件，spring上下的监听器，配置前端控制器并读取springmvc配置文件，配置映射及拦截规则；   
<!-- 加载spring的配置文件 -->
<context-param>
    <param-name>contextConfigLocationn</param-name>
    <param-value>classpath*:/applicationContext.xml</param-value>
</context-param>
<!-- spring 的上下文的监听器 -->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
<!-- 配置前端控制器 -->
<servlet>
    <servlet-name>springmvc-mybatis</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 配置读取springmvc配置文件 -->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc-servlet.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>  
    <async-supported>true</async-supported>  
</servlet>
<!-- 配置映射的及请求设置拦截规则 -->
<servlet-mapping>
    <servlet-name>springmvc-mybatis</servlet-name>
    <!-- 设置请求拦截规则 
   1./*:不能进行对其访问：No mapping found for HTTP request with URI [/spring-mvc/WEB-INF/jsp/hello.jsp] in DispatcherServlet with name 'spring-mvc'
   拦截所有，jsp,js，css都会拦截，不建议
   2./:拦截所有不包括jsp，肯定可以用
   3.*.action,*.do,拦截do,action的结尾请求，一般用于前台，面向消费者的
   -->
    <url-pattern>/</url-pattern>
</servlet-mapping>
</web-app>

2.2：applicationContext.xml	：

读取指定的数据源，配置连接池，注册mybatis工厂读取mybatis核心配置文件,mapper代理扫描包,注解事务开启aop事务，注入各个bean；
<!-- 指定spring读取db.properties配置 -->
<context:property-placeholder location="classpath:db.properties"  />

<!-- 1.将连接池 -->
<bean name="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" >
    <property name="jdbcUrl" value="${jdbc.jdbcUrl}" ></property>
    <property name="driverClass" value="${jdbc.driverClass}" ></property>
    <property name="user" value="${jdbc.user}" ></property>
    <property name="password" value="${jdbc.password}" ></property>
</bean>
<!-- mybatis工厂 -->
<bean id="sqlSessionFactoryBean" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <!-- 核心的配置的文件 -->
    <property name="configLocation" value="classpath:sqlMapConfig.xml"></property>
</bean>
<!--使用mapper动态代理  扫描的方式：-->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer"> 
    <!-- 指定基本包  在这里dao层的接口相当于动态代理mapper-->
    <property name="basePackage" value="com.leo.springmvc.dao"></property>
</bean>
<!--注解事务,封装了所有事务操作. 依赖于连接池 -->
<bean name="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager" >
    <property name="dataSource" ref="dataSource" ></property>
</bean>
<!-- 开启使用注解管理aop事务 -->
<tx:annotation-driven transaction-manager="transactionManager"/>
<!-- 注入bean -->
<bean id="itemService" class="com.leo.springmvc.service.impl.ItemServiceImpl">
    <property name="itemdao" ref="itemdao"></property>
</bean>

<bean id="itemdao" class="com.leo.springmvc.dao.impl.ItemDaoImpl">
    <property name="sqlSessionFactory" ref="sqlSessionFactoryBean"></property>
</bean>
</beans>

2.3springmvc-servlert.xml

主要用于扫描控制器，注解驱动，配置视图解析器。
<!-- 配置controller扫描包 ，多个包调用用","隔开
扫描@Controller，@Service
在不配置处理器映射器，和处理器适配器，会使用默认的，可以不配置
-->
<context:component-scan base-package="com.leo.springmvc"></context:component-scan>
<!-- 废除了：配置处理器映射器 
<bean class="org.springframework.web.servlet.mvc.annotation.RequestMappingHandlerMapping"></bean> 
配置处理器配置器 
<bean class="org.springframework.web.servlet.mvc.annotation.RequestMappingHandlerAdapter"></bean> -->
<!-- 注解驱动 ,配置这个就相当于配置了上面的两个-->
<mvc:annotation-driven></mvc:annotation-driven>
<!--配置视图解析器
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
逻辑视图的前缀，后缀 ，逻辑视图名在controller中返回ModelView指定
<property name="prefix" value="/WEB-INF/jsp/"></property>
<property name="suffix" value=".jsp"></property>
最终的jsp物理地址：前缀+逻辑视图+后缀 
</bean>  -->
</beans>

2.4sqlMapConfig.xml：

mybatis的配置文件，其实不用配置只需要相应的头文件就可以

<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 设置别名 -->
    <typeAliases>
        <!--指定的包内的所有的类都设置别名，别名的名称就是类名大小写不敏感 -->
        <package name="com.leo.springmvc"/>
    </typeAliases>
    <!-- 已经扫秒的包了，所以不用配置mapper的路径了 -->
</configuration>

2.5db.properties：配置数据库的属性

2.6mapper映射xml：书写sql的配置文件，
```

3. 在controller中调用其他各层，由于在这里用了接口的方式所以自动装配注解@Autowired就不可以使用，在controller中需要使用service层时就指定这个属性去读取相应bean的id;用下面的方式实现属性的注入。

> @Resource(name="itemService")
> private ItemService itemService;
>
> 在这里说下 @Resource(name="itemService")和 @Autowired的区别：
> @Resource默认按照名称方式进行bean匹配， j2EE的。可以指定读取按哪个名称的装配方法。
>
> @Autowired默认按照类型方式进行bean匹配，spring的。默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它的required属性为false。如果我们想使用按照名称（byName）来装配，可以结合@Qualifier注解一起使用。
>
> @Resource可以减少代码和Spring之间的耦合
>
> @Resource默认按照ByName自动注入，由J2EE提供，需要导入包javax.annotation.Resource。
>
> @Resource有两个重要的属性：name和type，而Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。
>
> 所以，如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不制定name也不制定type属性，这时将通过反射机制使用byName自动注入策略。



> @Resource装配顺序：		
> ①如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常。
>
> ②如果指定了name，则从上下文中查找名称（id）匹配的bean进行装配，找不到则抛出异常。
>
> ③如果指定了type，则从上下文中找到类型匹配的唯一bean进行装配，找不到或是找到多个，都会抛出异常。
>
> ④如果既没有指定name，又没有指定type，则自动按照byName方式进行装配；如果没有匹配，则回退为一个原始类型进行匹配，如果匹配则自动装配。
>
> @Resource的作用相当于@Autowired，只不过@Autowired按照byType自动注入。
> 4.运行项目并访问就可以拿到你想要的结果及页面。

### Spring MVC中的REST:

即 Representational State Transfer。（资源）表现层状态转化。是目前最流行的一种互联网软件架构。它结构清晰、符合标准、易于理解、扩展方便，所以正得到越来越多网站的采用.

> @RequestHeader 绑定请求报头的属性值
>
> @CookieValue 绑定请求中的 Cookie 值

Spring MVC 会按请求参数名和 POJO 属性名进行自动匹配，自动为该对象填充属性值。支持级联属性。如：dept.deptId、dept.address.tel 等,若希望在多个请求之间共用某个模型属性数据，则可以在控制器类上标注一个 @SessionAttributes, Spring MVC将在模型中对应的属性暂存到 HttpSession 中。

@SessionAttributes 除了可以通过属性名指定需要放到会话中的属性外，还可以通过模型属性的对象类型指定哪些模型属性需要放到会话中
				

– @SessionAttributes(types=User.class) 会将隐含模型中所有类型为 User.class 的属性添加到会话中。

> ​				– @SessionAttributes(value={“user1”, “user2”})
>
> ​				– @SessionAttributes(types={User.class, Dept.class})
>
> ​				– @SessionAttributes(value={“user1”, “user2”},types={Dept.class})	

​		


```java
1. 使用注解@RequestMapping("item/{id}")
   声明请求的url{xxx}叫做占位符，请求的URL可以是“item /1”或“item/2”

2. 使用(@PathVariable() Integer id)获取url上的数据	

/**
* 使用RESTful风格开发接口，实现根据id查询商品
* 如果不一致，例如"item/{ItemId}"则需要指定名称@PathVariable。
* @param id
* @return
*/
@RequestMapping("item/{id}")
@ResponseBody
public Item queryItemById(@PathVariable Integer id) {
    Item item = this.itemService.queryItemById(id);
    return item;
}
1. @ PathVariable 是 获取 url 上数据 的。 @RequestParam获取请求参数的（包括post表单提交）

2. 如果加上@ResponseBody注解，就不会走视图解析器，不会返回页面，目前返回的json数据。如果不加，就走视图解析器，返回页面
```

#### Rest风格的API

| /test/items   | GET    | 获取项目列表 |
| ------------- | ------ | ------------ |
| /test/items/1 | GET    | 获取项目     |
| /test/items   | POST   | 创建项目     |
| /test/items/1 | PUT    | 修改成员     |
| /test/items   | PUT    | 批量修改     |
| /test/items/1 | PATCH  | 修改属性     |
| /test/items/1 | DELETE | 删除项目     |



### Spring MVC类型转换器

前端传入的值，从表单中传入的值，都是字符串或者是字符串数组的形式传入的，在后端需要进行手动的转换类型，然后才能正确的使用。 框架一般对常见的数据类型的转换进行了封装提供，如字符串转换成数字等。我们使用的SpringMVC就是提供了一些内置的转换器。我们先来看下都有哪些类型转换器。

| 名称                           | 说明                                     |
| ------------------------------ | ---------------------------------------- |
| ObjectToStringConverter        | java.lang.Boolean -> java.lang.String    |
| CharacterToNumberFactory       | java.lang.Character -> java.lang.Number  |
| ObjectToStringConverter        | java.lang.Character -> java.lang.String  |
| EnumToStringConverter          | java.lang.Enum -> java.lang.String       |
| NumberToCharacterConverter     | java.lang.Number -> java.lang.Character  |
| NumberToNumberConverterFactory | java.lang.Number -> java.lang.Number     |
| ObjectToStringConverter        | java.lang.Number -> java.lang.String     |
| StringToBooleanConverter       | java.lang.String -> java.lang.Boolean    |
| StringToCharacterConverter     | java.lang.String -> java.lang.Character  |
| StringToEnumConverterFactory   | java.lang.String -> java.lang.Enum       |
| StringToNumberConverterFactory | java.lang.String -> java.lang.Number     |
| StringToLocaleConverter        | java.lang.String -> java.util.Locale     |
| StringToPropertiesConverter    | java.lang.String -> java.util.Properties |
| StringToUUIDConverter          | java.lang.String -> java.util.UUID       |
| ObjectToStringConverter        | java.util.Locale -> java.lang.String     |
| PropertiesToStringConverter    | java.util.Properties -> java.lang.String |

同样还包含一些集合类型的转换器，这里我就截个图看下吧。

[![RrAuSe.png](https://z3.ax1x.com/2021/07/01/RrAuSe.png)

https://imgtu.com/i/RrAuSe)

#### 自定义类型转换器

- **ConversionService** 是 Spring 类型转换体系的核心接口。 
- 可以利用 **ConversionServiceFactoryBean** 在 Spring 的 IOC 容器中定义一个 ConversionService. **Spring** 将自动识别出**IOC** **容器中的** **ConversionService**，并在 **Bean** **属性配置及****Spring MVC** 处理方法入参绑定等场合使用它**进行数据的转换**
- **可通过 ConversionServiceFactoryBean** **的** **converters** **属性** **注册自定义的类型转换器**	

#### Spring支持的类型转换器

Spring 定义了 3 种类型的转换器接口，实现任意一个转换器接口都可以作为自定义转换器注册到

**ConversionServiceFactroyBean 中：**

- **Converter<S,T>**：将 S 类型对象转为 T 类型对象 
- **ConverterFactory**：将相同系列多个 “同质” Converter 封装在一 起。如果希望将一种类型的对象转换为另一种类型及其子类的对象（例如将 String 转换为 Number 及 Number 子类 （Integer、Long、Double 等）对象）可使用该转换器工厂类
- **GenericConverter**：会根据源类对象及目标类对象所在的宿主类 中的上下文信息进行类型转换

```xml
<mvc:annotation-driven conversion-service="conversionService"></mvc:annotation-driven>
	<!-- 配置conversionService -->
	<beans:bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
		<beans:property name="converters">
			<beans:set>
				<beans:ref bean="userConverter"/>
			</beans:set>
		</beans:property>
	</beans:bean>
```

编写转换器：

```java

@Component
public class UserConverter implements Converter<String, User> {
 
	@Override
	public User convert(String src) {
		if(src !=null){
			String[] vals= src.split("-");
			if(vals !=null && vals.length ==3){
				Integer id =Integer.parseInt(vals[0]);
				String username =vals[1];
				String password =vals[2];
				User user =new User();
				user.setId(id);
				user.setUsername(username);
				user.setPassword(password);
				return user;
			}
		}
		return null;
	}
}

```

使用

```java
@RequestMapping("/testConverter")
public String testConverter(@RequestParam("user") User user){
    System.out.println(user);
    return "result";
}
```

但是我们一般不会直接使用上面的类型转换器进行操作。这里说下`<mvc:annotation-drivern/>`

`<mvc:annotation-driven />` 会自动注 册**RequestMappingHandlerMapping**,**RequestMappingHandlerAdapter** 与**ExceptionHandlerExceptionResolver** 三个bean。还提供了以下支持：

- 支持ConversionService实例对表单参数的进行类型转换
- 支持使用@NumberFormat,@DatimeFormat注解完成数据类型格式化
- 支持使用@Valid注解进行javaBean的的验证
- 支持使用@RequestBoay和@ResponseBody注解

### Spring MVC数据格式化：

对属性对象的输入/输出进行格式化，从其本质上讲依然 属于 “类型转换” 的范畴。Spring 在格式化模块中定义了一个实现 ConversionService 接口的**FormattingConversionService** 实现类，该实现类扩展 了 GenericConversionService，因此它**既具有类型转换的功能，又具有格式化的功能**

FormattingConversionService 拥有一个 **FormattingConversionServiceFactroyBean** 工厂类，后者用于在 Spring 上下文中构造前者。

- FormattingConversionServiceFactroyBean 内部已经注册
  - NumberFormatAnnotationFormatterFactroy：支持对数字类型的属性使用 @NumberFormat 注解
  -  JodaDateTimeFormatAnnotationFormatterFactroy：支持对日期类的属性使用 @DateTimeFormat 注解 ；

- 装配了 FormattingConversionServiceFactroyBean 后，就可 以在 Spring MVC 入参绑定及模型数据输出时使用注解驱动了。`<mvc:annotation-driven/>` 默认创建的ConversionService 实例即为 FormattingConversionServiceFactroyBean

  

#### 处理日期格式

```xml
<!-- 配置Conveter转换器，转换的工厂，可以转换（日期，。。。） -->
<bean id="ConversionServiceFactoryBean" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
	<!-- 配置多个转换器  在list标签下可以提供多个bean-->
	<property name="converters">
	<list>
		<bean  class="com.leo.spring.util.DateConveter"></bean>
	</list>
	</property>
</bean>
```

**java配置代码**

```java
/**
 * 转换日期
 * S:页面传过来的s类型
 * T:转换后的类型
 * @author leoi555
 *
 */
public class DateConveter implements Converter<String, Date> {

	@Override
	public Date convert(String arg0) {
		// TODO Auto-generated method stub
		if (null !=arg0) {
			DateFormat dFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			try {
				return  dFormat.parse(arg0);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}

}

```

**使用注解**

支持对日期类的属性使用 @DateTimeFormat 注解 ；可以对pattern 属性：类型为字符串。指定解析/格式化字段数据的模式 需要配置`<mvc:annotation-driven/>`

```java
// 将入参格式话为date形式
@DateTimeFormat(pattern="yyyy-MM-dd")
// 将数据库中返回的数据格式化为指定的格式
@JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
private Date birthday;
```

#### 处理数字格式

@NumberFormat 可对类似数字类型的属性进行标 注，它拥有两个互斥的属性：

- style：类型为 NumberFormat.Style。用于指定样式类 型，包括三种：Style.NUMBER（正常数字类型）、 Style.CURRENCY（货币类型）、 Style.PERCENT（ 百分数类型）
- pattern：类型为 String，自定义样式， 如patter="#,###"；

```java
@NumberFormat(pattern="#,###")
private Integer salary;
```
#### Spring MVC处理json数据:

> 1.加入jar包：jackson-annotations(core,databind)-2.2.2.jar;
>
> 2.编写目标方法使其返回json:
>
> 3.在方法上添加 @ResponseBody注解使用的是`HttpMessageConverter<T>`；

`HttpMessageConverter<T>`接口定义的方法：
 – `Boolean canRead(Class<?> clazz,MediaType mediaType)`: 指定转换器可以读取的对象类型，即转换器是否可将请求信息转换为 clazz 类型的对象，同时指定支持 MIME 类型(text/html,applaiction/json等)

​ - `Boolean canWrite(Class<?> clazz,MediaType mediaType):`指定转换器是否可将 clazz 类型的对象写到响应流中，响应流支持的媒体类型在MediaType 中定义。

​ - `LIst<MediaType> getSupportMediaTypes()：`该转换器支持的媒体类型。

​ -	 `T  read(Class<? extends T> clazz,HttpInputMessage inputMessage)：`将请求信息流转换为 T 类型的对象。

​ - ` void write(T t,MediaType contnetType,HttpOutputMessgae outputMessage)`:将T类型的对象写到响应流中，同时指定相应的媒体类型为 contentType。

使用 `HttpMessageConverter<T>` 将请求信息转化并绑定到处理方法的入参中或将响应结果转为对应类型的响应信息，Spring 提供了两种途径：

- 使用 @RequestBody / @ResponseBody 对处理方法进行标注

- 使用` HttpEntity<T> / ResponseEntity<T>` 作为处理方法的入参或返回值

  -  当控制器处理方法使用到 @RequestBody/ @ResponseBody 或`HttpEntity<T>/ResponseEntity<T>` 时, Spring 首先根据请求头或响应头的Accept 属性选择匹配的 HttpMessageConverter, 进而根据参数类型或泛型类型的过滤得到匹配的HttpMessageConverter, 若找不到可用的 HttpMessageConverter 将报错

  - @RequestBody 和 @ResponseBody 不需要成对出现

    ​	

> @RequestBody注解用于读取http请求的内容(字符串)，通过springmvc提供的HttpMessageConverter接口将读到的内容（json数据）转换为java对象并绑定到Controller方法的参数上。
>
> @ResponseBody注解用于将Controller的方法返回的对象，通过springmvc提供的HttpMessageConverter接口转换为指定格式的数据如：json,xml等，通过Response响应给客户端

这里都要配置注解驱动`。<mvc:annotation-driven/>`

​	

### Spring MVC文件上传：

Spring MVC 为文件上传提供了直接的支持，这种支持是通过即插即用的 MultipartResolver 实现的。Spring 用Jakarta Commons FileUpload 技术实现了一个MultipartResolver 实现类：CommonsMultipartResovler

Spring MVC 上下文中默认没有装配 MultipartResovler，因此默认情况下不能处理文件的上传工作，如果想使用 Spring的文件上传功能，需现在上下文中配置 MultipartResolver

`​defaultEncoding: 必须和用户 JSP 的 pageEncoding 属性一致，以便正确解析表单的内容``​为了让 CommonsMultipartResovler 正确工作，必须先将 Jakarta Commons FileUpload 及 Jakarta Commons io的类包添加到类路径下。`	

```xml
<bean id="multipartResolver" class="org.springframework.web.multipart.commoms.CommonsMultipartResolver">
<property name="defaultEncoding" value="UTF-8"/>
<property name="maxUploadSize" value="5242880"/>
</bean>
```


代码如下：

```java
public Map<String, Object> add(User user, @RequestParam(name = "file") MultipartFile file, HttpServletRequest request, HttpServletResponse response) {
    System.out.println(file);
    Map<String, Object> map = new HashMap<>();
    if (user.getUsername() != null && user.getPassword() != null) {
        if (file.isEmpty()) {
            map.put("code", "1");
            map.put("msg", "文件为空");
            map.put("data", null);
            return map;
        } else {
            //获取文件的原名
            String fileName = file.getOriginalFilename();
            System.out.println(fileName);
            //转换后的文件名
            String fileNewName = UUID.randomUUID().toString() + fileName;
            String path = "D:/hotel/upload/user/img/";
            File dest = new File(path + fileNewName);
            System.out.println(dest.exists());
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
                try {
                    dest.createNewFile();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            try {
                file.transferTo(dest);
                String filepath = path + fileNewName;
                user.setHeadshot(filepath);
                System.out.println("filepath:" + path + fileNewName);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return userService.addUser(user);
    } else {
        map.put("code", "1");
        map.put("msg", "信息不全");
        map.put("data", null);
        return map;
    }
}
```

### Spring MVC的自定义拦截器：

​	Spring MVC也可以使用拦截器对请求进行拦截处理，用户可以自定义拦截器来实现特定的功能，自定义的拦截器必须实现HandlerInterceptor接口

​	 `preHandle()：`这个方法在业务处理器处理请求之前被调用，在该方法中对用户请求 request 进行处理。如果程序员决定该拦截器对请求进行拦截处理后还要调用其他的拦截器，或者是业务处理器去进行处理，则返回true；如果程序员决定不需要再调用其他的组件去处理请求，则返回false。

​	`postHandle()：`这个方法在业务处理器处理完请求后，但是DispatcherServlet 向客户端返回响应前被调用，在该方法中对用户请求request进行处理。

​	`afterCompletion()：`这个方法在 DispatcherServlet 完全处理完请求后被调用，可以在该方法中进行一些资源清理的操作。

​					

```java
public class HandlerInterceptor1 implements HandlerInterceptor {
    // controller执行后且视图返回后调用此方法
    // 这里可得到执行controller时的异常信息
    // 这里可记录操作日志
    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
        System.out.println("HandlerInterceptor1....afterCompletion");
    }

    // controller执行后但未返回视图前调用此方法
    // 这里可在返回用户前对模型数据进行加工处理，比如这里加入公用信息以便页面显示
    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {
        System.out.println("HandlerInterceptor1....postHandle");
    }

    // Controller执行前调用此方法
    // 返回true表示继续执行，返回false中止执行
    // 这里可以加入登录校验、权限拦截等
    @Override
    public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
        System.out.println("HandlerInterceptor1....preHandle");
        // 设置为true，测试使用
        return true;
    }
}
配置文件：

需要在springMvc中的springmvc.xml中配置相应的拦截器规则：
<!-- 配置拦截器 -->
<mvc:interceptors>
    <mvc:interceptor>
        <!-- 所有的请求都进入拦截器 -->
        <mvc:mapping path="/**" />
        <!-- 配置具体的拦截器 -->
        <bean class="cn.itcast.ssm.interceptor.HandlerInterceptor1" />
    </mvc:interceptor>
    <mvc:interceptor>
        <!-- 所有的请求都进入拦截器 -->
        <mvc:mapping path="/**" />
        <!-- 配置具体的拦截器 -->
        <bean class="cn.itcast.ssm.interceptor.HandlerInterceptor2" />
    </mvc:interceptor>
</mvc:interceptors>    
		
```

### Spring MVC的异常处理：

Spring MVC 通过 HandlerExceptionResolver 处理程序的异常，包括 Handler 映射、数据绑定以及目标方法执行时发生的异常。SpringMVC 提供的 HandlerExceptionResolver 的实现类.

##### ExcepetionHandlerExceptionResolver

- 主要处理 Handler 中用 **@ExceptionHandler** 注解定义的 方法。 
- @ExceptionHandler 注解定义的方法优先级问题：例如发 生的是NullPointerException，但是声明的异常有 RuntimeException 和 Exception，此候会根据异常的最近 继承关系找到继承深度最浅的那个@ExceptionHandler 注解方法，即标记了 RuntimeException 的方法.
- ExceptionHandlerMethodResolver 内部若找不 到@ExceptionHandler 注解的话，会找 @ControllerAdvice 中的**@ExceptionHandler** 注解方法.

##### ResponseStatusExceptionResolver

- 在异常及异常父类中找到 **@ResponseStatus** 注解，然 后使用这个注解的属性进行处理。

- 定义一个 @ResponseStatus 注解修饰的异常类

  ```java
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public class UnauthorizedException extends RuntimeException{}
  ```

- 若在处理器方法中抛出了上述异常： 若ExceptionHandlerExceptionResolver 不解析述异常。由于 触发的异常 UnauthorizedException 带有@ResponseStatus 注解。因此会被**ResponseStatusExceptionResolver** 解析 到。最后响应HttpStatus.UNAUTHORIZED 代码给客户 端。HttpStatus.UNAUTHORIZED 代表响应码401，无权限。 关于其他的响应码请参考 HttpStatus 枚举类型源码

##### DefaultHandlerExceptionResolver

对一些特殊的异常进行处理，比 如NoSuchRequestHandlingMethodException、HttpReques 

tMethodNotSupportedException、HttpMediaTypeNotSuppo rtedException、HttpMediaTypeNotAcceptableException 等。

##### SimpleMappingExceptionResolver

如果希望对所有异常进行统一处理，可以使用 SimpleMappingExceptionResolver，它将异常类名映射为 

视图名，即发生异常时使用对应的视图报告异常.

```xml
<!--  配置使用 SimpleMappingExceptionResolver 来映射异常  -->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <property name="exceptionAttribute" value="ex"/>
        <property name="exceptionMappings">
        <props>
        <prop key="java.lang.ArrayIndexOutOfBoundsException">error</prop>
        </props>
    </property>
</bean>
```

使用java进行对其操作

```java
// 当i位10时就会触发上面的异常	
@RequestMapping("/testSimpleMappingExceptionResolver")
	public String testSimpleMappingExceptionResolver(@RequestParam("i") int i){
		String [] vals = new String[10];
		System.out.println(vals[i]);
		return "success";
	}
```



##### 统一异常处理使用：

```java
/**
 * user:kay三石
 * time: 8:44
 * desc: 公共的异常处理类
 **/
@ControllerAdvice
public class BaseExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public BaseResult error(Exception e) {
        e.printStackTrace();
        System.out.println("调用了公共异常处理类");
        return BaseResult.notOk(e.getMessage());
    }
}
```

### Spring MVC对比Struts2：

1. Spring MVC 的入口是 Servlet, 而 Struts2 是 Filter
2. Spring MVC 会稍微比 Struts2 快些. Spring MVC 是基于方法设计, 而 Sturts2 是基于类, 每次发一次请求都会实例一个 Action.
3. Spring MVC 使用更加简洁, 开发效率Spring MVC确实比 struts2 高: 支持 JSR303, 处理 ajax 的请求更方便
4. Struts2 的 OGNL 表达式使页面的开发效率相比Spring MVC 更高些. 

