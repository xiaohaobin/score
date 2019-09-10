/*
Navicat MySQL Data Transfer

Source Server         : 新建测试连接1
Source Server Version : 50515
Source Host           : localhost:3306
Source Database       : my_datatables_1

Target Server Type    : MYSQL
Target Server Version : 50515
File Encoding         : 65001

Date: 2019-09-03 16:27:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `diy_user`
-- ----------------------------
DROP TABLE IF EXISTS `diy_user`;
CREATE TABLE `diy_user` (
  `uid` int(20) NOT NULL DEFAULT '0',
  `account` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(20) DEFAULT NULL,
  `phone` int(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `_class` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of diy_user
-- ----------------------------
INSERT INTO `diy_user` VALUES ('1', 'guanyu', 'guanyu123', '关羽', '154', '111111', '11515@asdjk.02', '10', '12', '麦城之战');
INSERT INTO `diy_user` VALUES ('2', 'zhaoyun', 'zhaoyun123', '尼古拉丁找死', '150', '2222', 'sdf@1123', '12', '14', '七进七出');
INSERT INTO `diy_user` VALUES ('3', 'yase', '123', '亚瑟', '13', '333', 'sd@1233', '10', '5', '王者大陆');
