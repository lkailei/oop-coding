---
title: Apache Shiro
autoGroup-2: 高级 
---
## Apache Shiro

​	Apache Shiro是一个强大且易用的Java安全框架,执行身份验证、授权、密码和会话管理。使用Shiro的易于理解的API,您可以快速、轻松地获得任何应用程序,从最小的移动应用程序到最大的网络和企业应用程序。使用 Apache Shiro 的人越来越多，因为它相当简单，对比 Spring Security，可能没有 Spring Security 做的功能强大，但是在实际工作时可能并不需要那么复杂的东西，所以使用小而简单的 Shiro 就足够了。对于它俩到底哪个好，这个不必纠结，能更简单的解决项目问题就好了。

![img](https://atts.w3cschool.cn/attachments/image/wk/shiro/1.png)

### 单点登录：

​	如果两个网站上通用一个账号来登录，那么就会把这认证操作去保存到一个中央服务器中去操作，这个中央服务器就是为了实现认证权限设计的，当你访问到一个网站时，这个网站回去中央服务器中去核对数据是否正确如果正确就会发送一个cookie 令牌给客户端，客户端保存了cookie然后再去访问天猫网时，这时你就有了cookie天猫会用这个cookie去对比中央服务其中的如果匹配就可以进行登录，然后就实现了单点登录。

### Shiro架构

![img](https://atts.w3cschool.cn/attachments/image/wk/shiro/3.png)

- `Subject`：主体，可以看到主体可以是任何可以与应用交互的 “用户”；
- `Authenticator:` 认证器，负责主体认证的，这是一个扩展点，如果用户觉得Shiro默认的不好，可以自定义实现；其需要认证策略（Authentication Strategy），即什么情况下算用户认证通过了；
- `Authorizer`: 授权器，或者访问控制器，用来决定主体是否有权限进行相应的操作；即控制着用户能访问应用中的哪些功能
- `Realm`：可以有 1 个或多个 Realm，可以认为是安全实体数据源，即用于获取安全实体的；可以是 JDBC 实现，也可以是 LDAP 实现，或者内存实现等等；由用户提供；注意：Shiro 不知道你的用户 / 权限存储在哪及以何种格式存储；所以我们一般在应用中都需要实现自己的 Realm；
- `sessionManager`: 会话管理，会话管理，即用户登录后就是一次会话，在没有退出之前，它的所有信息都在会话中；会话可以是普通JavaSE环境的，也可以是如Web环境的
- `cacheManager` : 缓存控制器，来管理如用户、角色、权限等的缓存的；因为这些数据基本上很少去改变，放到缓存中后可以提高访问的性能
- `sessionDao`: 比如我们想把Session保存到数据库，那么可以实现自己的SessionDAO，通过如JDBC写到数据库；比如想把Session放到Memcached中，可以实现自己的Memcached SessionDAO；另外SessionDAO中可以使用Cache进行缓存，以提高性能；
- `Pluggable Realms(1...more)`：就是提供连接各种数据库的操作
- `CacheManager：`缓存控制器，来管理如用户、角色、权限等的缓存的；因为这些数据基本上很少去改变，放到缓存中后可以提高访问的性能
- `Cryptography`：密码模块，Shiro 提高了一些常见的加密组件用于如密码加密 / 解密的。

### 三个核心组件：

`Subject, SecurityManager 和 Realms.`

#### Subject

​	Subject：即“当前操作用户”。但是，在Shiro中，Subject这一概念并不仅仅指人，也可以是第三方进程、后台帐户（Daemon Account）或其他类似事物。它仅仅意味着“当前跟软件交互的东西”。但考虑到大多数目的和用途，你可以把它认为是Shiro的“用户”概念。

​	Subject代表了当前用户的安全操作，SecurityManager则管理所有用户的安全操作。

#### SecurityManager

​    SecurityManager：它是Shiro框架的核心，典型的Facade模式，Shiro通过SecurityManager来管理内部组件实例，并通过它来提供安全管理的各种服务。

#### Realms

​	Realm： Realm充当了Shiro与应用安全数据间的“桥梁”或者“连接器”。也就是说，当对用户执行认证（登录）和授权（访问控制）验证时，Shiro会从应用配置的Realm中查找用户及其权限信息。

​	从这个意义上讲，Realm实质上是一个安全相关的DAO：它封装了数据源的连接细节，并在需要时将相关数据提供给Shiro。当配置Shiro时，你必须至少指定一个Realm，用于认证和（或）授权。配置多个Realm是可以的，但是至少需要一个。

​	Shiro内置了可以连接大量安全数据源（又名目录）的Realm，如LDAP、关系数据库（JDBC）、类似INI的文本配置资源以及属性文件等。如果缺省的Realm不能满足需求，你还可以插入代表自定义数据源的自己的Realm实现。

##### 自定义Realms

`public class ShiroRealm extends AuthorizingRealm{}`

1. ShiroRealm父类AuthorizingRealm将获取Subject相关信息分成两步：获取身份验证信息（doGetAuthenticationInfo）及授权信息（doGetAuthorizationInfo）；
2. doGetAuthenticationInfo获取身份验证相关信息：首先根据传入的用户名获取User信息；然后如果user为空，那么抛出没找到帐号异常UnknownAccountException；
   1. 如果user找到但锁定了抛出锁定异常LockedAccountException；最后生成AuthenticationInfo信息，交给间接父类AuthenticatingRealm使用CredentialsMatcher进行判断密码是否匹配，如果不匹配将抛出密码错误异常IncorrectCredentialsException；另外如果密码重试此处太多将抛出超出重试次数异常ExcessiveAttemptsException；在组装SimpleAuthenticationInfo信息时，需要传入：身份信息（用户名）、凭据（密文密码）、盐（username+salt），CredentialsMatcher使用盐加密传入的明文密码和此处的密文密码进行匹配。
3. doGetAuthorizationInfo获取授权信息：PrincipalCollection是一个身份集合，因为我们现在就一个Realm，所以直接调用getPrimaryPrincipal得到之前传入的用户名即可；然后根据用户名调用UserService接口获取角色及权限信息。

### 过滤器简称及对应的java类：

- anon：org.apache.shiro.web.filter.authc.AnonymousFilter
- authc：org.apache.shiro.web.filter.authc.FormAuthenticationFilter
- authcBasic：org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter
- perms：org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter
- port：org.apache.shiro.web.filter.authz.PortFilter
- rest：org.apache.shiro.web.filter.authz.HttpMethodPermissionFilter
- roles：org.apache.shiro.web.filter.authz.RolesAuthorizationFilter
- ssl：org.apache.shiro.web.filter.authz.SslFilter
- user：org.apache.shiro.web.filter.authc.UserFilter
- logout:org.apache.shiro.web.filter.authc.LogoutFilter

### shiro认证流程：

​	allipcation --->subject(当前用户对象)--------->SecurityManager(安全管理器)--->Realm(其实就是一个dao层，可以直接编写，也可以用框架提供的形式)

![img](https://atts.w3cschool.cn/attachments/image/wk/shiro/4.png)

1. 首先调用 `Subject.login(token)` 进行登录，其会自动委托给 `Security Manager`，调用之前必须通过 `SecurityUtils.setSecurityManager()` 设置；
2. `SecurityManager` 负责真正的身份验证逻辑；它会委托给 `Authenticator` 进行身份验证；
3. `Authenticator` 才是真正的身份验证者，`Shiro API` 中核心的身份认证入口点，此处可以自定义插入自己的实现；
4. `Authenticator` 可能会委托给相应的 `AuthenticationStrategy` 进行多 `Realm` 身份验证，默认 `ModularRealmAuthenticator` 会调用 `AuthenticationStrategy` 进行多 `Realm` 身份验证；
5. `Authenticator `会把相应的 `token` 传入 `Realm`，从 `Realm` 获取身份验证信息，如果没有返回 / 抛出异常表示身份验证失败了。此处可以配置多个 `Realm`，将按照相应的顺序及策略进行访问。

### spring整合shiro：

#### web.xml中：

```xml
 <!-- 配置spring框架提供的整合shiro框架的过滤器 这里命名要和spring中配置的bean 中提供的相同 -->
<filter>
    <filter-name>shiroFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>
<filter-mapping>
    <filter-name>shiroFilter</filter-name>
    <url-pattern>/</url-pattern>
</filter-mapping>
			  
```

#### applicationContext.xml：

```xml
<!-- 注册realm -->
<bean id="bosRealm" class="com.leo.bos.realm.BOSRealm"></bean>
<!-- 注入安全管理器 -->
<bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
<property name="realm" ref="bosRealm"></property>
<!--  <property name="cacheManager" ref="cacheManager"></property>-->
</bean>
<bean id="cacheManager" class="org.apache.shiro.cache.ehcache.EhCacheManager">
<property name="cacheManagerConfigFile" value="classpath:ehcache.xml"></property>
</bean>
<!-- 引入filter提供的工厂然后交给spring -->
<bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
<!-- 注入安全管理对象 -->
<!--
securityManager：这个属性是必须的。
loginUrl ：没有登录的用户请求需要登录的页面时自动跳转到登录页面，不是必须的属性，
不输入地址的话会自动寻找项目web项目的根目录下的”/login.jsp”页面。
successUrl ：登录成功默认跳转页面，不配置则跳转至”/”。如果登陆前点击的一个需要登录的页面，
则在登录自动跳转到那个需要登录的页面
unauthorizedUrl ：没有权限默认跳转的页面
 -->
<property name="securityManager" ref="securityManager"></property>
<property name="loginUrl" value="/login.jsp"></property>
<property name="successUrl" value="/index.jsp"></property>
<property name="unauthorizedUrl" value="unauthrized.jsp"></property>
<!-- 注入url拦截规则
    /css/**:css/.../...=anon就是匿名可以访问
    =perms["staff"]：检查是否有这个权限，
    /admins/user/**=authc表示需要认证(登录)才能使用，没有参数：但是现在
    用shiro来判断时struts中的配置就不行了
-->
<property name="filterChainDefinitions">
    <value>
        /css/=anon
        /js/=anon
        /images/=anon
        /validatecode.jsp=anon
        /login.jsp=anon
        /userAction_login.action=anon
        /page_base_staff.action=perms["staff"]
        /*=authc
    </value>
</property>
</bean>
```

#### 自定义Realm：

主要提供了授权和认证两个方法:

```java
public class BOSRealm extends AuthorizingRealm{
    @Autowired
    private IUserDao userDao;
    //授权方法
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
        // TODO Auto-generated method stub
        return null;
    }
    //认证方法
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken arg0) throws AuthenticationException {
        // TODO Auto-generated method stub
        System.out.println("方法认证中。。。。");
        UsernamePasswordToken passwordToken=(UsernamePasswordToken) arg0;
        //获取页面输入的用户名
        String username=passwordToken.getUsername();
        //根据用户名查询数据库中的密码
        User user=userDao.findUserByUsername(username);
        if (user==null) {
            return null;
        }
        //框架负者比对数据库中的密码和页面密码是否输入的一致
        //简单认证的对象
        AuthenticationInfo info=new SimpleAuthenticationInfo(user, user.getPassword(), this.getName());

        return info;
    }

}
```
#### 权限控制：

使用shiro方法注解方式权限控制方式：
1.在spring配置文件中开启注解支持：

```xml
<aop:config proxy-target-class="true">/aop:config
<bean class="org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor">
	<property name="securityManager" ref="securityManager"/>
</bean>
```

##### 在application.xml配置的时候：

```xml
<bean id="filtershior" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
<!-- 注入安全管理对象 -->
<!--
securityManager：这个属性是必须的。
loginUrl ：没有登录的用户请求需要登录的页面时自动跳转到登录页面，不是必须的属性，
不输入地址的话会自动寻找项目web项目的根目录下的”/login.jsp”页面。
successUrl ：登录成功默认跳转页面，不配置则跳转至”/”。如果登陆前点击的一个需要登录的页面，
则在登录自动跳转到那个需要登录的页面
unauthorizedUrl ：没有权限默认跳转的页面
 -->
<property name="securityManager" ref="securityManager"></property>
<property name="loginUrl" value="/login.jsp"></property>
<property name="successUrl" value="/index.jsp"></property>
<property name="unauthorizedUrl" value="unauthrized.jsp"></property>
<!-- 注入url拦截规则
    /css/**:css/.../...=anon就是匿名可以访问
    =perms["staff"]：检查是否有这个权限，
    /admins/user/**=authc表示需要认证(登录)才能使用，没有参数：但是现在
    用shiro来判断时struts中的配置就不行了
-->
<property name="filterChainDefinitions">
    <value>
        /css/=anon
        /js/=anon
        /images/*=anon
        /validatecode.jsp=anon
        /login.jsp=anon
        /userAction_login.action=anon
        /page_base_staff.action=perms["staff"]
        /=authc
    </value>
</property>
</bean>	
```

### 权限注解

​	@RequiresAuthentication
​	表示当前 Subject 已经通过 login 进行了身份验证；即 Subject.isAuthenticated() 返回 true。
​	@RequiresUser
​	表示当前 Subject 已经身份验证或者通过记住我登录的。
​	@RequiresGuest
​	表示当前 Subject 没有身份验证或通过记住我登录过，即是游客身份。
​	@RequiresRoles(value={“admin”, “user”}, logical= Logical.AND)
​	表示当前 Subject 需要角色 admin 和 user。
​	@RequiresPermissions (value={“user:a”, “user:b”}, logical= Logical.OR)
​	表示当前 Subject 需要权限 user：a 或 user：b。
 @RequiresPermissions("staff-delete")
​	 方法名：(){
​	 }									
​	使用shrio提供的标签控制权限在页面中使用的：
​	引入标签库,
​	使用shrio提供的标签来使用：

```
<!-- 权限认证  与web.xml有关-->
<shiro:hasPermission name="staff-delete">
<!-- 这里面只要把相关的代码写到这里面包裹下就可以直接使用了 -->
/shiro:hasPermission
3.在方法中直接使用：
//另一种方式：
	Subject subject = SecurityUtils.getSubject();
	subject.checkPermission("staff-edit");	
```



### shiro实现记住用户功能：


​			Shiro 提供了记住我（RememberMe）的功能，比如访问如淘宝等一些网站时，关闭了浏览器下次再打开时还是能记住你是谁，下次访问时无需再登录即可访问，基本流程如下：

​			首先在登录页面选中 RememberMe 然后登录成功；如果是浏览器登录，一般会把 RememberMe 的 Cookie 写到客户端并保存下来；关闭浏览器再重新打开；会发现浏览器还是记住你的；访问一般的网页服务器端还是知道你是谁，且能正常访问；但是比如我们访问淘宝时，如果要查看我的订单或进行支付时，此时还是需要再进行身份认证的，以确保当前用户还是你。

```xml
<!--关闭浏览器时cookie失效：sessionIdCookie：maxAge=-1 表示浏览器关闭时失效此 Cookie；-->
<bean id="sessionIdCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
    <constructor-arg value="sid"/>
    <property name="httpOnly" value="true"/>
    <property name="maxAge" value="-1"/>
</bean>
 <!--配置记住个人用户登录保存到Cookie中放到本地：-->
<bean id="rememberMeCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
    <constructor-arg value="rememberMe"/>
    <property name="httpOnly" value="true"/>
    <property name="maxAge" value="2592000"/><!-- 30天 -->
</bean>
  <!-- rememberMe管理器 -->
<bean id="rememberMeManager" class="org.apache.shiro.web.mgt.CookieRememberMeManager">
    <property name="cipherKey" value="{T(org.apache.shiro.codec.Base64).decode('4AvVhmFLUs0KTA3Kprsdag==')}"/>
    <property name="cookie" ref="rememberMeCookie"/>
</bean>
  <!-- 需要把remeberMeCookie注入到安全管理器中：注入安全管理器 -->
<bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
    <property name="rememberMeManager" ref="rememberMeManager"/>
</bean>
```




​	

​	