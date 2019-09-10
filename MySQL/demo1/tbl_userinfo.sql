/*
Navicat MySQL Data Transfer

Source Server         : 新建测试连接1
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : shineserver

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2019-09-03 15:23:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_userinfo`;
CREATE TABLE `tbl_userinfo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `AccountName` varchar(20) NOT NULL COMMENT '账号',
  `NickName` varchar(20) DEFAULT NULL COMMENT '浏览用户昵称',
  `password` varchar(40) NOT NULL COMMENT '密码',
  `ActiveName` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `PhoneNum` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `Email` varchar(40) DEFAULT NULL COMMENT 'Email',
  `Company` varchar(50) DEFAULT NULL COMMENT '公司名称',
  `Enabled` tinyint(1) NOT NULL COMMENT '账号是否启用',
  `Approved` tinyint(1) NOT NULL COMMENT '账号是否通过审核',
  `RightLevel` int(11) NOT NULL COMMENT '账号权限等级',
  `MailNotice` tinyint(1) DEFAULT '0' COMMENT '是否邮件通知',
  `SMSNotice` tinyint(1) DEFAULT '0' COMMENT '是否短信通知',
  `PanelConfig` varchar(50) DEFAULT '' COMMENT '首页显示面板',
  `CreatDate` varchar(30) NOT NULL COMMENT '创建时间',
  `LastLoginIp` varchar(30) DEFAULT '' COMMENT '最后登录IP',
  `LastLoginTime` varchar(30) DEFAULT '' COMMENT '最后登录时间',
  `isBigCustomer` int(5) DEFAULT '0' COMMENT '是否是大客户',
  `customerCode` varchar(5) DEFAULT NULL COMMENT '集成商编码',
  `codeIndex` int(11) DEFAULT '1' COMMENT '集成商编码当前序号',
  `isAgent` tinyint(4) DEFAULT '0' COMMENT '是否为代理商',
  `agentCode` varchar(8) DEFAULT NULL COMMENT '代理商编码',
  `lat` varchar(30) DEFAULT NULL COMMENT '纬度',
  `lng` varchar(30) DEFAULT NULL COMMENT '经度',
  `appAlias` varchar(40) DEFAULT NULL COMMENT '是否APP登录',
  `regByToken` varchar(32) DEFAULT '' COMMENT '对外API注册用户时上级用户的token，可为空',
  `isPhoneNumReg` tinyint(1) DEFAULT '0' COMMENT '是否为手机号码接口注册',
  `isValiEmail` tinyint(1) DEFAULT '0' COMMENT '是否已经验证邮箱',
  `isValiPhone` tinyint(1) DEFAULT '0' COMMENT '是否已经验证手机号码',
  `parentUserId` int(11) DEFAULT '0',
  `timezone` int(11) DEFAULT '8',
  `language` varchar(20) DEFAULT 'en',
  `country` varchar(50) DEFAULT NULL COMMENT '用户国家名',
  `city` varchar(50) DEFAULT NULL COMMENT '用户城市名',
  `kind` int(11) DEFAULT '0' COMMENT 'APP种类:0-默认，1-Haier，2-Ujass',
  `qq_uid` varchar(100) DEFAULT '' COMMENT 'QQ账号',
  `wx_uid` varchar(100) DEFAULT '' COMMENT '微信账号',
  `appType` varchar(100) DEFAULT '' COMMENT 'app标识符',
  PRIMARY KEY (`ID`,`AccountName`),
  KEY `INDEX_TBL_USERINFO` (`ID`,`AccountName`),
  KEY `INDEX_ACCOUNTNAME` (`AccountName`),
  KEY `INDEX_TBL_USERINFO_PARENT` (`parentUserId`),
  KEY `INDEX_TBL_USERINFO_TOKEN` (`regByToken`),
  KEY `qq_uid` (`qq_uid`),
  KEY `wx_uid` (`wx_uid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_userinfo
-- ----------------------------
INSERT INTO `tbl_userinfo` VALUES ('1', 'admin', null, '21232f297a57a5a743894ace4a801fc3', 'superAdmin', null, 'imluobao@163.com', null, '1', '1', '0', '0', '0', '', '2018-02-04 09:46:50', '127.0.0.1', '2019-04-10 19:22:02', '0', null, '1', '0', null, null, null, null, '', '0', '0', '0', '0', '8', 'en', null, null, '0', '', '', '');
INSERT INTO `tbl_userinfo` VALUES ('2', 'growatt', null, '1ce04a79736cc3197f6992f3c8ef7c29', null, null, null, null, '1', '1', '0', '0', '0', '', '2018-06-07', '', '', '0', null, '1', '0', null, null, null, null, '', '0', '0', '0', '0', '8', 'en', null, null, '0', '', '', '');
INSERT INTO `tbl_userinfo` VALUES ('3', 'xhb', 'null', 'e1cadc3949ba59abbe56e057f2cf883e', '', 'null', 'haobin.xiao@growatt.com', 'null', '1', '0', '1', '1', '0', '', '2019-04-10 14:08:39', '127.0.0.1', '2019-04-16 11:55:03', '0', '', '1', '0', '', null, null, null, '', '0', '0', '0', '0', '8', 'zh_cn', 'China', null, '0', '', '', '');
