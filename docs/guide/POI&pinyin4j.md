---
title: POI&PINYIN4j
autoGroup-5: 持续集成 
---
## POI&pinyin4j

### POI:

 #### POI简介
​            Apache POI是Apache软件基金会的开放源码函式库，POI提供API给Java程序对Microsoft Office格式档案读和写的功能。

#### HSSF概况

​        HSSF 是Horrible SpreadSheet Format的缩写，通过HSSF，你可以用纯Java代码来读取、写入、修改Excel文件。HSSF 为读取操作提供了两类API：usermodel和eventusermodel，即“用户模型”和“事件-用户模型”。

####  POI EXCEL文档结构类



HSSFWorkbook excel文档对象:

HSSFWorkbook有五个构造器
			

- HSSFWorkbook()
- HSSFWorkbook(java.io.InputStream s) 
- HSSFWorkbook(java.io.InputStream s, boolean preserveNodes)
- HSSFWorkbook(POIFSFileSystem fs) 
- HSSFWorkbook(POIFSFileSystem fs, boolean preserveNodes)

​			

- ​        `HSSFSheet excel的sheet HSSFRow excel的行`
- ​        `HSSFCell excel的单元格 HSSFFont excel字体`

- ​        `HSSFName 名称 HSSFDataFormat 日期格式`

- ​        `HSSFHeader sheet头`

- ​        `HSSFFooter sheet尾`

- ​        `HSSFCellStyle cell样式`

- ​        `HSSFDateUtil 日期`

- ​        `HSSFPrintSetup 打印`

- ​        `HSSFErrorConstants 错误信息表`

####  EXCEL常用操作方法
  1、 得到Excel常用对象           

```java
POIFSFileSystem fs=newPOIFSFileSystem(new FileInputStream("d:/test.xls"));   
//得到Excel工作簿对象   
HSSFWorkbook wb = new HSSFWorkbook(fs);  
//得到Excel工作表对象   
HSSFSheet sheet = wb.getSheetAt(0);   
//得到Excel工作表的行   
HSSFRow row = sheet.getRow(i);  
//得到Excel工作表指定行的单元格   
HSSFCell cell = row.getCell((short) j);  
cellStyle = cell.getCellStyle();//得到单元格样式  
```

 2、建立Excel常用对象

```java
HSSFWorkbook wb = new HSSFWorkbook();//创建Excel工作簿对象  
HSSFSheet sheet = wb.createSheet("new sheet");//创建Excel工作表对象    
HSSFRow row = sheet.createRow((short)0); //创建Excel工作表的行  
cellStyle = wb.createCellStyle();//创建单元格样式  
row.createCell((short)0).setCellStyle(cellStyle); //创建Excel工作表指定行的单元格  
row.createCell((short)0).setCellValue(1); //设置Excel工作表的值  
```

3、设置sheet名称和单元格内容

```java
wb.setSheetName(1, "第一张工作表",HSSFCell.ENCODING_UTF_16);          
cell.setEncoding((short) 1);      
cell.setCellValue("单元格内容");  
```

4、取得sheet的数目 

```java
wb.getNumberOfSheets()   
```

5、  根据index取得sheet对象

    HSSFSheet sheet = wb.getSheetAt(0);  

6、取得有效的行数

    int rowcount = sheet.getLastRowNum();  

7、取得一行的有效单元格个数

```java
row.getLastCellNum();    
```

8、单元格值类型读写

```java
cell.setCellType(HSSFCell.CELL_TYPE_STRING); //设置单元格为STRING类型  
cell.getNumericCellValue();//读取为数值类型的单元格内容  
```

9、设置列宽、行高

```java
sheet.setColumnWidth((short)column,(short)width);      
row.setHeight((short)height);    
```

10、添加区域，合并单元格

```java
Region region = new Region((short)rowFrom,(short)columnFrom,(short)rowTo  
,(short)columnTo);//合并从第rowFrom行columnFrom列  
sheet.addMergedRegion(region);// 到rowTo行columnTo的区域     
//得到所有区域      
sheet.getNumMergedRegions()   
```


11、保存Excel文件

```java
FileOutputStream fileOut = new FileOutputStream(path);   
wb.write(fileOut);   
```


12、根据单元格不同属性返回字符串数值

```java
public String getCellStringValue(HSSFCell cell) {      
        String cellValue = "";      
        switch (cell.getCellType()) {      
        case HSSFCell.CELL_TYPE_STRING://字符串类型  
            cellValue = cell.getStringCellValue();      
            if(cellValue.trim().equals("")||cellValue.trim().length()<=0)      
                cellValue=" ";      
            break;      
        case HSSFCell.CELL_TYPE_NUMERIC: //数值类型  
            cellValue = String.valueOf(cell.getNumericCellValue());      
            break;      
        case HSSFCell.CELL_TYPE_FORMULA: //公式  
            cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);      
            cellValue = String.valueOf(cell.getNumericCellValue());      
            break;      
        case HSSFCell.CELL_TYPE_BLANK:      
            cellValue=" ";      
            break;      
        case HSSFCell.CELL_TYPE_BOOLEAN:      
            break;      
        case HSSFCell.CELL_TYPE_ERROR:      
            break;      
        default:      
            break;      
        }      
        return cellValue;      
    }     
```


13、常用单元格边框格式

```java
HSSFCellStyle style = wb.createCellStyle();      
style.setBorderBottom(HSSFCellStyle.BORDER_DOTTED);//下边框       
style.setBorderLeft(HSSFCellStyle.BORDER_DOTTED);//左边框       
style.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框       
style.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框    
```


14、设置字体和内容位置

```java
HSSFFont f  = wb.createFont();      
    f.setFontHeightInPoints((short) 11);//字号      
    f.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);//加粗      
    style.setFont(f);      
    style.setAlignment(HSSFCellStyle.ALIGN_CENTER);//左右居中      
    style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//上下居中      
    style.setRotation(short rotation);//单元格内容的旋转的角度      
HSSFDataFormat df = wb.createDataFormat();      
    style1.setDataFormat(df.getFormat("0.00%"));//设置单元格数据格式      
    cell.setCellFormula(string);//给单元格设公式      
    style.setRotation(short rotation);//单元格内容的旋转的角度   
```

 


15、插入图片

```java
//先把读进来的图片放到一个ByteArrayOutputStream中，以便产生ByteArray      
      ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();      
      BufferedImage bufferImg = ImageIO.read(new File("ok.jpg"));      
      ImageIO.write(bufferImg,"jpg",byteArrayOut);      
//读进一个excel模版      
FileInputStream fos = new FileInputStream(filePathName+"/stencil.xlt");       
fs = new POIFSFileSystem(fos);      
//创建一个工作薄      
HSSFWorkbook wb = new HSSFWorkbook(fs);      
HSSFSheet sheet = wb.getSheetAt(0);      
HSSFPatriarch patriarch = sheet.createDrawingPatriarch();      
HSSFClientAnchor anchor = new HSSFClientAnchor(0,0,1023,255,(short) 0,0,(short)10,10);           
patriarch.createPicture(anchor , wb.addPicture(byteArrayOut.toByteArray(),HSSFWorkbook.PICTURE_TYPE_JPEG));    
```


16、调整工作表位置

```java
HSSFWorkbook wb = new HSSFWorkbook();     
HSSFSheet sheet = wb.createSheet("format sheet");     
HSSFPrintSetup ps = sheet.getPrintSetup();     
sheet.setAutobreaks(true);     
ps.setFitHeight((short)1);     
ps.setFitWidth((short)1);   
```


17、设置打印区域

```java
HSSFSheet sheet = wb.createSheet("Sheet1");     
wb.setPrintArea(0, "$A$1:$C$2");    
```


18、标注脚注

```java
HSSFSheet sheet = wb.createSheet("format sheet");     
HSSFFooter footer = sheet.getFooter()     
footer.setRight( "Page " + HSSFFooter.page() + " of " + HSSFFooter.numPages() );   
```


19、在工作单中清空行数据，调整行位置

```java
HSSFWorkbook wb = new HSSFWorkbook();     
HSSFSheet sheet = wb.createSheet("row sheet");     
// Create various cells and rows for spreadsheet.     
// Shift rows 6 - 11 on the spreadsheet to the top (rows 0 - 5)     
sheet.shiftRows(5, 10, -5);    
```
20、选中指定的工作表

```java
HSSFSheet sheet = wb.createSheet("row sheet");     
heet.setSelected(true);     
```
21、工作表的放大缩小

```java
   HSSFSheet sheet1 = wb.createSheet("new sheet");     
    sheet1.setZoom(1,2);   // 50 percent magnification    
```

22、头注和脚注

23、自定义颜色

```java
HSSFCellStyle style = wb.createCellStyle();     
style.setFillForegroundColor(HSSFColor.LIME.index);     
style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);     
HSSFFont font = wb.createFont();     
font.setColor(HSSFColor.RED.index);     
style.setFont(font);     
cell.setCellStyle(style);     
```

24、填充和颜色设置

```java
HSSFCellStyle style = wb.createCellStyle();     
style.setFillBackgroundColor(HSSFColor.AQUA.index);     
style.setFillPattern(HSSFCellStyle.BIG_SPOTS);     
HSSFCell cell = row.createCell((short) 1);     
cell.setCellValue("X");     
style = wb.createCellStyle();     
style.setFillForegroundColor(HSSFColor.ORANGE.index);     
style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);     
cell.setCellStyle(style);   
```

25、强行刷新单元格公式

```java
HSSFFormulaEvaluator eval=new HSSFFormulaEvaluator((HSSFWorkbook) wb);    
private static void updateFormula(Workbook wb,Sheet s,int row){     
        Row r=s.getRow(row);     
        Cell c=null;     
        FormulaEcaluator eval=null;     
        if(wb instanceof HSSFWorkbook)     
            eval=new HSSFFormulaEvaluator((HSSFWorkbook) wb);     
        else if(wb instanceof XSSFWorkbook)     
            eval=new XSSFFormulaEvaluator((XSSFWorkbook) wb);     
        for(int i=r.getFirstCellNum();i<r.getLastCellNum();i++){     
            c=r.getCell(i);     
            if(c.getCellType()==Cell.CELL_TYPE_FORMULA)     
                eval.evaluateFormulaCell(c);     
        }     
    }    
```

说明：FormulaEvaluator提供了evaluateFormulaCell(Cell cell)方法，计算公式保存结果，但不改变公式。而evaluateInCell(Cell cell) 方法是计算公式，并将原公式替换为计算结果，也就是说该单元格的类型不在是Cell.CELL_TYPE_FORMULA而是Cell.CELL_TYPE_NUMBERIC。HSSFFormulaEvaluator提供了静态方法evaluateAllFormu

laCells(HSSFWorkbook wb) ，计算一个Excel文件的所有公式，用起来很方便。
		
```java
public void test() throws FileNotFoundException, IOException {
		String filepath="‪E:\\Java全集\\Java基础视频\\上海传智播客\\黑马32框架\\项目一：物流BOS系统（58-71天）\\BOS-day05\\BOS-day05\\资料\\分区导入测试数据.xls";
		System.out.println(filepath);
		File file=new File(filepath);
		//包装一个Excel文件对象
	HSSFWorkbook hworkbook=new HSSFWorkbook(new FileInputStream(file));
	//读取文件中的第一个Sheet标签页
	HSSFSheet hssfSheet=hworkbook.getSheetAt(0);
	//遍历标签页的所有行
	for (Row row: hssfSheet) {
		//跳过标题
		if (row.getRowNum()==0) {
			continue;
		}
		//换行
		System.out.println();
		//遍历单元格
		for (Cell cell : row) {
			String value=cell.getStringCellValue();
			System.out.println(value);
		}
	}
}
```
测试代码见博客：

### Pinyin4j

这个是汉字转pinyin的插件需要提前引入jar包



```java
@Test
public void test1() {
	//河北石家庄桥西区
	String province="河北省";
	String city="石家庄市";
	String district="桥西区";
	//简码： HBSJZQX
	province=province.substring(0, province.length()-1);
	city=city.substring(0, city.length()-1);
	district=district.substring(0, district.length()-1);
	String info=province+city+district;
	System.out.println(info);
		
	String[] headByString = PinYin4jUtils.getHeadByString(info);
	System.out.println(headByString);
	//简码
	String shortcode=StringUtils.join(headByString);
	System.out.println(shortcode);
	//城市编码--拼音编码
	String citycode=PinYin4jUtils.hanziToPinyin(city);
	System.out.println(citycode);
	
}
```
提供的使用封装好的类库使用时直接调用
	

```java
public class PinYin4jUtils {
	/**
	 * 将字符串转换成拼音数组
	 * 
	 * @param src
	 * @return
	 */
	public static String[] stringToPinyin(String src) {
		return stringToPinyin(src, false, null);
	}
    /**
     * 将字符串转换成拼音数组
     * 
     * @param src
     * @return
     */
    public static String[] stringToPinyin(String src, String separator) {

        return stringToPinyin(src, true, separator);
    }

    /**
     * 将字符串转换成拼音数组
     * 
     * @param src
     * @param isPolyphone
     *            是否查出多音字的所有拼音
     * @param separator
     *            多音字拼音之间的分隔符
     * @return
     */
    public static String[] stringToPinyin(String src, boolean isPolyphone,
            String separator) {
        // 判断字符串是否为空
        if ("".equals(src) || null == src) {
            return null;
        }
        char[] srcChar = src.toCharArray();
        int srcCount = srcChar.length;
        String[] srcStr = new String[srcCount];

        for (int i = 0; i < srcCount; i++) {
            srcStr[i] = charToPinyin(srcChar[i], isPolyphone, separator);
        }
        return srcStr;
    }

    /**
     * 将单个字符转换成拼音
     * 
     * @param src
     * @return
     */
    public static String charToPinyin(char src, boolean isPolyphone,
            String separator) {
        // 创建汉语拼音处理类
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        // 输出设置，大小写，音标方式
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        StringBuffer tempPinying = new StringBuffer();

        // 如果是中文
        if (src > 128) {
            try {
                // 转换得出结果
                String[] strs = PinyinHelper.toHanyuPinyinStringArray(src,
                        defaultFormat);

                // 是否查出多音字，默认是查出多音字的第一个字符
                if (isPolyphone && null != separator) {
                    for (int i = 0; i < strs.length; i++) {
                        tempPinying.append(strs[i]);
                        if (strs.length != (i + 1)) {
                            // 多音字之间用特殊符号间隔起来
                            tempPinying.append(separator);
                        }
                    }
                } else {
                    tempPinying.append(strs[0]);
                }

            } catch (BadHanyuPinyinOutputFormatCombination e) {
                e.printStackTrace();
            }
        } else {
            tempPinying.append(src);
        }

        return tempPinying.toString();

    }

    public static String hanziToPinyin(String hanzi) {
        return hanziToPinyin(hanzi, " ");
    }

    /**
     * 将汉字转换成拼音
     * 
     * @param hanzi
     * @param separator
     * @return
     */
    public static String hanziToPinyin(String hanzi, String separator) {

        // 创建汉语拼音处理类
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        // 输出设置，大小写，音标方式
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);

        String pinyingStr = "";
        try {
            pinyingStr = PinyinHelper.toHanyuPinyinString(hanzi, defaultFormat,
                    separator);
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return pinyingStr;
    }

    /**
     * 将字符串数组转换成字符串
     * 
     * @param str
     * @param separator
     *            各个字符串之间的分隔符
     * @return
     */
    public static String stringArrayToString(String[] str, String separator) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < str.length; i++) {
            sb.append(str[i]);
            if (str.length != (i + 1)) {
                sb.append(separator);
            }
        }
        return sb.toString();
    }

    /**
     * 简单的将各个字符数组之间连接起来
     * 
     * @param str
     * @return
     */
    public static String stringArrayToString(String[] str) {
        return stringArrayToString(str, "");
    }

    /**
     * 将字符数组转换成字符串
     * 
     * @param str
     * @param separator
     *            各个字符串之间的分隔符
     * @return
     */
    public static String charArrayToString(char[] ch, String separator) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < ch.length; i++) {
            sb.append(ch[i]);
            if (ch.length != (i + 1)) {
                sb.append(separator);
            }
        }
        return sb.toString();
    }

    /**
     * 将字符数组转换成字符串
     * 
     * @param str
     * @return
     */
    public static String charArrayToString(char[] ch) {
        return charArrayToString(ch, " ");
    }

    /**
     * 取汉字的首字母
     * 
     * @param src
     * @param isCapital
     *            是否是大写
     * @return
     */
    public static char[] getHeadByChar(char src, boolean isCapital) {
        // 如果不是汉字直接返回s
        if (src <= 128) {
            return new char[] { src };
        }
        // 获取所有的拼音
        String[] pinyingStr = PinyinHelper.toHanyuPinyinStringArray(src);

        // 创建返回对象
        int polyphoneSize = pinyingStr.length;
        char[] headChars = new char[polyphoneSize];
        int i = 0;
        // 截取首字符
        for (String s : pinyingStr) {
            char headChar = s.charAt(0);
            // 首字母是否大写，默认是小写
            if (isCapital) {
                headChars[i] = Character.toUpperCase(headChar);
            } else {
                headChars[i] = headChar;
            }
            i++;
        }

        return headChars;
    }

    /**
     * 取汉字的首字母(默认是大写)
     * 
     * @param src
     * @return
     */
    public static char[] getHeadByChar(char src) {
        return getHeadByChar(src, true);
    }

    /**
     * 查找字符串首字母
     * 
     * @param src
     * @return
     */
    public static String[] getHeadByString(String src) {
        return getHeadByString(src, true);
    }

    /**
     * 查找字符串首字母
     * 
     * @param src
     * @param isCapital
     *            是否大写
     * @return
     */
    public static String[] getHeadByString(String src, boolean isCapital) {
        return getHeadByString(src, isCapital, null);
    }

    /**
     * 查找字符串首字母
     * 
     * @param src
     * @param isCapital
     *            是否大写
     * @param separator
     *            分隔符
     * @return
     */
    public static String[] getHeadByString(String src, boolean isCapital,
            String separator) {
        char[] chars = src.toCharArray();
        String[] headString = new String[chars.length];
        int i = 0;
        for (char ch : chars) {

            char[] chs = getHeadByChar(ch, isCapital);
            StringBuffer sb = new StringBuffer();
            if (null != separator) {
                int j = 1;

                for (char ch1 : chs) {
                    sb.append(ch1);
                    if (j != chs.length) {
                        sb.append(separator);
                    }
                    j++;
                }
            } else {
                sb.append(chs[0]);
            }
            headString[i] = sb.toString();
            i++;
        }
        return headString;
    }

    public static void main(String[] args) {
        // pin4j 简码 和 城市编码 
        String s1 = "中华人民共和国"; 
        String[] headArray = getHeadByString(s1); // 获得每个汉字拼音首字母
        System.out.println(Arrays.toString(headArray));

        String s2 ="长城" ; 
        System.out.println(Arrays.toString(stringToPinyin(s2,true,",")));

        String s3 ="长";
        System.out.println(Arrays.toString(stringToPinyin(s3,true,",")));
    }
}
```
