---
title: Lucene&Solr
autoGroup-5: 持续集成 
---
## Lucene&Solr

### Lucene

​		Lucene是一个开放源代码的全文检索引擎工具包，但它不是一个完整的全文检索引擎，而是一个全文检索引擎的架构，提供了完整的查询引擎和索引引擎，部分文本分析引擎（英文与德文两种西方语言）。

​		Lucene的目的是为软件开发人员提供一个简单易用的工具包，以方便的在目标系统中实现全文检索的功能，或者是以此为基础建立起完整的全文检索引擎。

​		Lucene是一套用于全文检索和搜寻的开源程式库，由Apache软件基金会支持和提供。Lucene提供了一个简单却强大的应用程式接口，能够做全文索引和搜寻。

​		在Java开发环境里Lucene是一个成熟的免费开源工具。就其本身而言，Lucene是当前以及最近几年最受欢迎的免费Java信息检索程序库。人们经常提到信息检索程序库，虽然与搜



索引擎有关，但不应该将信息检索程序库与搜索引擎相混淆。lucene是一个高性能的，可伸缩的信息检索库，可以为应用程序添加索引和搜索能力，是java实现的，成熟的开源的项目。

#### 优点：

1. Lucene定义了一套以8位字节为基础的索引文件格式，兼容不同的平台。
2. 具有倒排索引，分块索引。
3. 面向对象的系统架构，
4. 设计独立于语言和文件格式的文本分析的接口，索引器通过接受Token流完成索引文件的创立，用户扩展新的语言和文件格式，只需要实现文本分析的接口。
5. Lucene的查询实现中默认实现了布尔操作、模糊查询（Fuzzy Search[11]）、分组查询等等。用户无需编写自己的代码提高查询能力
   		使用的jar包：
      					lucene有7个包需要导入：analysis，document，index，queryParser，search，store，util
      		主要就是为了索引。索引到文档中的数据，并不是简单的通过搜索名字来查询到数据的，而是可以直接到达文件内部的数据。

​		`分析文档：`将原始内容创建为包含域（Field）的文档（document），需要再对域中的内容进行分析，分析的过程是经过对原始文档提取单词、将字母转为小写、去除标点符号、去除停用词等过程生成最终的语汇单元，可以将语汇单元理解为一个一个的单词。

​		`创建索引`：对所有文档分析得出的语汇单元进行索引，索引的目的是为了搜索，最终要实现只搜索被索引的语汇单元从而找到Document（文档）。`注意：创建索引是对语汇单元索引，通过词语找文档，这种索引的结构叫倒排索引结构`。

​		`查询索引`：查询索引也是搜索的过程。搜索就是用户输入关键字，从索引（index）中进行搜索的过程。根据关键字搜索索引，根据索引找到对应的文档，从而找到要搜索的内容（这里指磁盘上的文件）。 

### Solr

​       Solr是一个独立的企业级搜索应用服务器，对外提供类似于web-service 的API接口，用户通过http请求，向搜索引擎服务器提交一定格式的Xml文件生成索引，也可以通过http的get来查找请求并得到XML格式的返回结果。

​      Solr是一个高性能，采用Java5开发，基于Lucene的全文搜索服务器。同时对其进行了扩展，提供了比Lucene更为丰富的查询语言，同时实现了可配置、可扩展并对查询性能进行了优化，并且提供了一个完善的功能管理界面，是一款非常优秀的全文搜索引擎。

#### 工作方式：

​		文档通过http利用xml加到一个搜索的集合中，查询该集合询该集合也是通过http收到一个XML/JSON响应来实现。

​		它的主要特性包括：高效、灵活的缓存功能，垂直搜索功能，高亮显示搜索结果，通过索引复制来提高可用性，提供一套强大Data Schema来定义字段，类型和设置文本分析，提供基于Web的管理界面等。

#### 服务器中安装

​	服务器安装solr：先上传，然后解压缩 tar -zxf solr-4.10.3.tgz.tagz

```xml
cp xxxxx  目标文件-r：复制文件的目录
安装到 tomcat中：
	直接把他丢到tomcat中，这是一个war包
	需要创间solrhome文件夹，然后需要改写配置文件：
	webapps下文件夹中的web.xml中配置以下 solrhome路径。	

创建步骤：

	第一步：把中文分析器添加到工程中。
	
		1、把IKAnalyzer2012FF_u1.jar添加到solr工程的lib目录下
		2、把扩展词典、配置文件放到solr工程的WEB-INF/classes目录下。
		
	第二步：配置一个FieldType，制定使用IKAnalyzer
		修改schema.xml文件
		修改Solr的schema.xml文件，添加FieldType：
		
			<fieldType name="text_ik" class="solr.TextField">
			  <analyzer class="org.wltea.analyzer.lucene.IKAnalyzer"/>
			</fieldType>
			
	第三步：配置业务域，type制定使用自定义的FieldType。
			设置业务系统Field
			<field name="item_title" type="text_ik" indexed="true" stored="true"/>
			<field name="item_sell_point" type="text_ik" indexed="true" stored="true"/>
			<field name="item_price"  type="long" indexed="true" stored="true"/>
			<field name="item_image" type="string" indexed="false" stored="true" />
			<field name="item_category_name" type="string" indexed="true" stored="true" />
			<field name="item_keywords" type="text_ik" indexed="true" stored="false" multiValued="true"/>
			<copyField source="item_title" dest="item_keywords"/>
			<copyField source="item_sell_point" dest="item_keywords"/>
			<copyField source="item_category_name" dest="item_keywords"/>
	第四步：重启tomcat
```
#### 使用solrJ管理索引库：

​		Solr 与其他服务器应用程序并行运行。例如，在线商店应用程序将提供用户界面、购物车以及为最终用户购买的方式；而库存管理应用程序将允许商店员工编辑产品信息。产品元数据将保存在某种数据库以及 Solr 中。 

​		Solr 可以通过以下步骤轻松地添加在在线商店搜索的功能：

​		定义一个模式。该模式告诉 Solr 关于它将被索引的文档的内容。在在线商店的示例中，模式将定义产品名称、描述、价格、制造商等定义的字段。Solr 的模式是强大而灵活的，可以让您根据自己的应用程序定制 Solr 的行为。有关详细信息，请参阅文档、字段和模式设计。

​		您的用户将搜索的 Feed Solr 文档。
​		在您的应用程序中公开搜索功能。
​		因为 Solr 是基于开放标准的，所以它是高度可扩展的。Solr 查询是简单的 HTTP 请求 URL，响应是一个结构化文档：主要是 JSON，但也可以是 XML、CSV 或其他格式。这意味着各种各样的客户端将能够使用 Solr，从其他 Web 应用程序到浏览器客户端、丰富的客户端应用程序和移动设备。任何能够使用 HTTP 的平台都可以与 Solr 对话。有关客户端 API 的详细信息，请参阅客户端 API。 
​		Solr 提供了对多个字段和多面搜索结果的复杂查询的最简单关键字搜索支持。搜索具有更多关于搜索和查询的详细信息。
​		如果 Solr 的功能还不够令人印象深刻，那么它处理非常高容量应用程序的能力就应该发挥出来。
​		一个相对常见的情况是，您有太多数据或者有许多查询，以至于单个 Solr 服务器无法处理您的整个工作负载。在这种情况下，您可以使用 SolrCloud 扩展应用程序的功能，以便在多个服务器之间更好地分发数据和处理请求。可以根据您需要的可扩展性的类型，混合和匹配多个选项。
​		linux启动solr:
​			bin/solr start
​		检查是否正常运行：
​			bin/solr status
​		solr控制台：http://localhost:8983/solr/

### SolrCloud:

#### 什么是SolrCloud

​		SolrCloud(solr 云)是Solr提供的分布式搜索方案，当你需要大规模，容错，分布式索引和检索能力时使用 SolrCloud。当一个系统的索引数据量少的时候是不需要使用SolrCloud的，当索引量很大，搜索请求并发很高，这时需要使用SolrCloud来满足这些需求。

​		 SolrCloud是基于Solr和Zookeeper的分布式搜索方案，它的主要思想是使用Zookeeper作为集群的配置信息中心。

​	**它有几个特色功能：**

- 1）集中式的配置信息
- 2）自动容错
- 3）近实时搜索
- 4）查询时自动负载均衡

**zookeeper是个什么玩意？**

​		顾名思义zookeeper就是动物园管理员，他是用来管hadoop（大象）、Hive(蜜蜂)、pig(小猪)的管理员， Apache Hbase和 Apache Solr 的分布式集群都用到了zookeeper；Zookeeper:是一个分布式的、开源的程序协调服务，是hadoop项目下的一个子项目。

#### SolrCloud结构

​		SolrCloud为了降低单机的处理压力，需要由多台服务器共同来完成索引和搜索任务。实现的思路是将索引数据进行Shard（分片）拆分，每个分片由多台的服务器共同完成，当一个索引或搜索请求过来时会分别从不同的Shard的服务器中操作索引。

​		SolrCloud需要Solr基于Zookeeper部署，Zookeeper是一个集群管理软件，由于SolrCloud需要由多台服务器组成，由zookeeper来进行协调管理。

[![BbEiYn.png](https://s1.ax1x.com/2020/11/09/BbEiYn.png)](https://imgchr.com/i/BbEiYn)



​		索引集合包括两个Shard（shard1和shard2），shard1和shard2分别由三个Core组成，其中一个Leader两个Replication，Leader是由zookeeper选举产生，zookeeper控制每个shard上三个Core的索引数据一致，解决高可用问题。
​		用户发起索引请求分别从shard1和shard2上获取，解决高并发问题。
​		Collection在SolrCloud集群中是一个逻辑意义上的完整的索引结构。它常常被划分为一个或多个Shard（分片），它们使用相同的配置信息。
​		比如：针对商品信息搜索可以创建一个collection。
​		 collection=shard1+shard2+....+shardX
​		每个Core是Solr中一个独立运行单位，提供 索引和搜索服务。一个shard需要由一个Core或多个Core组成。由于collection由多个shard组成所以collection一般由多个core组成。
​		Master或Slave: Master是master-slave结构中的主结点（通常说主服务器），Slave是master-slave结构中的从结点（通常说从服务器或备服务器）。同一个Shard下master和slave存储的数据是一致的，这是为了达到高可用目的。
​		Shard: Collection的逻辑分片。每个Shard被化成一个或者多个replication，通过选举确定哪个是Leader。
​		集群的搭建：

			zookeeper:--->solr(多个)<---shard1(shard2)<----collection
			Zookeeper作为集群的管理工具。
			1、集群管理：容错、负载均衡。
			2、配置文件的集中管理
			3、集群的入口
	
			需要实现zookeeper 高可用。需要搭建集群。建议是奇数节点。需要三个zookeeper服务器。
			搭建solr集群需要7台服务器。
			搭建伪分布式：
			需要三个zookeeper节点
			需要四个tomcat节点。
	
			建议虚拟机的内容1G以上。
	
		Solr集群的搭建：
			第一步：创建四个tomcat实例。每个tomcat运行在不同的端口。8180、8280、8380、8480
			第二步：部署solr的war包。把单机版的solr工程复制到集群中的tomcat中。
			第三步：为每个solr实例创建一个对应的solrhome。使用单机版的solrhome复制四份。
			第四步：需要修改solr的web.xml文件。把solrhome关联起来。
			第五步：配置solrCloud相关的配置。每个solrhome下都有一个solr.xml，把其中的ip及端口号配置好。
			第六步：让zookeeper统一管理配置文件。需要把solrhome/collection1/conf目录上传到zookeeper。上传任意solrhome中的配置文件即可。
			使用工具上传配置文件：/root/solr-4.10.3/example/scripts/cloud-scripts/zkcli.sh
			./zkcli.sh -zkhost 192.168.25.154:2181,192.168.25.154:2182,192.168.25.154:2183 -cmd upconfig -confdir /usr/local/solr-cloud/solrhome01/collection1/conf -confname myconf
			查看zookeeper上的配置文件：
			使用zookeeper目录下的bin/zkCli.sh命令查看zookeeper上的配置文件：
			[root@localhost bin]# ./zkCli.sh 
			[zk: localhost:2181(CONNECTED) 0] ls /
			[configs, zookeeper]
			[zk: localhost:2181(CONNECTED) 1] ls /configs
			[myconf]
			[zk: localhost:2181(CONNECTED) 2] ls /configs/myconf
			[admin-extra.menu-top.html, currency.xml, protwords.txt, mapping-FoldToASCII.txt, _schema_analysis_synonyms_english.json, _rest_managed.json, solrconfig.xml, _schema_analysis_stopwords_english.json, stopwords.txt, lang, spellings.txt, mapping-ISOLatin1Accent.txt, admin-extra.html, xslt, synonyms.txt, scripts.conf, update-script.js, velocity, elevate.xml, admin-extra.menu-bottom.html, clustering, schema.xml]
			[zk: localhost:2181(CONNECTED) 3] 
			退出：
			[zk: localhost:2181(CONNECTED) 3] quit
			使用以下命令连接指定的zookeeper服务：
			./zkCli.sh -server 192.168.25.154:2183
			第七步：修改tomcat/bin目录下的catalina.sh 文件，关联solr和zookeeper。
			把此配置添加到配置文件中：
			JAVA_OPTS="-DzkHost=192.168.25.154:2181,192.168.25.154:2182,192.168.25.154:2183"
			第八步：启动每个tomcat实例。要包装zookeeper集群是启动状态。
			第九步：访问集群
			第十步：创建新的Collection进行分片处理。
			http://192.168.25.154:8180/solr/admin/collections?action=CREATE&name=collection2&numShards=2&replicationFactor=2
			第十一步：删除不用的Collection。
			http://192.168.25.154:8180/solr/admin/collections?action=DELETE&name=collection1
使用SolrJ管理集群：
			使用步骤：
			第一步：把solrJ相关的jar包添加到工程中。
			第二步：创建一个SolrServer对象，需要使用CloudSolrServer子类。构造方法的参数是zookeeper的地址列表。
			第三步：需要设置DefaultCollection属性。
			第四步：创建一SolrInputDocument对象。
			第五步：向文档对象中添加域
			第六步：把文档对象写入索引库。
			第七步：提交。
			@Test
				public void testSolrCloudAddDocument() throws Exception {
					// 第一步：把solrJ相关的jar包添加到工程中。
					// 第二步：创建一个SolrServer对象，需要使用CloudSolrServer子类。构造方法的参数是zookeeper的地址列表。
					//参数是zookeeper的地址列表，使用逗号分隔
					CloudSolrServer solrServer = new CloudSolrServer("192.168.25.154:2181,192.168.25.154:2182,192.168.25.154:2183");
					// 第三步：需要设置DefaultCollection属性。
					solrServer.setDefaultCollection("collection2");
					// 第四步：创建一SolrInputDocument对象。
					SolrInputDocument document = new SolrInputDocument();
					// 第五步：向文档对象中添加域
					document.addField("item_title", "测试商品");
					document.addField("item_price", "100");
					document.addField("id", "test001");
					// 第六步：把文档对象写入索引库。
					solrServer.add(document);
					// 第七步：提交。
					solrServer.commit();
				}
		全局异常处理的使用：
			DispatcherServlert:
							-----》Controller
					------》Service
			-----》dao
			全局异常处理器：
				使用方法：
					1，需要实现一个接口：HandlerExceptionResolver
					2.需要在springmvc中配置
						处理逻辑：
							1.异常写入日志文件
							2.及时通知开发人员，发邮件，短信
							3.展示一个错误页面：如；你的网络故障
			

```java
public class GlobalExceptionReslover implements HandlerExceptionResolver {
			Logger logger = LoggerFactory.getLogger(GlobalExceptionReslover.class);
			
			@Override
			public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
					Exception ex) {
				//写日志文件
				logger.error("系统发生异常", ex);
				//发邮件、发短信
				//Jmail：可以查找相关的资料
				//需要在购买短信。调用第三方接口即可。
				//展示错误页面
				ModelAndView modelAndView = new ModelAndView();
				modelAndView.addObject("message", "系统发生异常，请稍后重试");
				modelAndView.setViewName("error/exception");
				return modelAndView;
			}
			springmvc中配置异常处理器：
				<bean class="com.xxxxx.xxxxx.GlobalExceptionReslover"/>
```






​			