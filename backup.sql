PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE user (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  email_verified INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  role TEXT NOT NULL DEFAULT 'editor',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
INSERT INTO "user" ("id","name","email","email_verified","image","role","created_at","updated_at") VALUES('XR9nIc40MvOeNIM373hrm1m67AjYhRJ9','Admin','admin@golpahar.com',0,NULL,'editor',1794251612,1794251612);
INSERT INTO "user" ("id","name","email","email_verified","image","role","created_at","updated_at") VALUES('1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ','Administrator','admin@kalimandir.com',0,NULL,'super_admin',1794296269,1794296269);
CREATE TABLE session (
  id TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('jY8jy856migH4zbdzmlRujFQOytlLCOa',1794856412,'SZinQotohVVW15jUCOnuKkw5LDok0IQQ',1794251612,1794251612,'','PostmanRuntime/2.14.0','XR9nIc40MvOeNIM373hrm1m67AjYhRJ9');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('kWKxNOr8QXY29qQFJKs0V71zYomM26Rz',1794856563,'quPReLySnbydjA6MxR317YPww7NXkOVF',1794251763,1794251763,'','PostmanRuntime/2.14.0','XR9nIc40MvOeNIM373hrm1m67AjYhRJ9');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('ubjNVpad9NABTW0U91d29QSuAxuBuyfY',1794898071,'AUXfHXMQDCkugEgm1AYPIM8va0vVqALR',1794293271,1794293271,'','PostmanRuntime/2.15.0','XR9nIc40MvOeNIM373hrm1m67AjYhRJ9');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('aVQe5qFYK7MVIODr2H4S4brvEUSDnu0p',1795592269,'UtIqeibRstQ0wEX5lW9pFuzoJqSxvsLK',1794296269,1794296269,'','PostmanRuntime/2.15.0','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('6KqFPWV2p76nl2mSar1db9j2hHpUZ3i4',1795592761,'EjFKFMCELZ09Fv5wulLC7rE9PyLr5nFU',1794296761,1794296761,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('RnA2rIGjWF8T9tsIUJ94O0B22TqoD5dL',1795592806,'KYpAN8H7mCpQCEKCFlJgbXQQRbxryhBR',1794296806,1794296806,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('O4vQs2fKElLyiOoeWCWaP7hzBcUzJ7Lz',1795592808,'b3YQb5JKIoip2yAquQUwGBQ5zuNXErUw',1794296808,1794296808,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('83DBEggubh7ik5DD668Bbi8ECNqkBDmu',1795592809,'tuaqwSOjCMaK5ovoz6brUVbKBP3oRzMy',1794296809,1794296809,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('Lxq8AloiUk9OnRedWaapCfo0yhVKiI3l',1795592810,'L8ln0Zs5jeWyhcrQII4tVgqaSDnDdStf',1794296810,1794296810,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('y7kqJtFIgqBryhZDBUsZxmRkiClVCzPY',1795594070,'2LPZlE561GH92ltjSZLeIOfYlJzxsG0q',1794298070,1794298070,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('MyZGCKftHshOmp1LaVEFXt5X5S93HWvT',1795594183,'zJFfpjxiSrKI4ogJ05nr1uZziaV6PI8s',1794298183,1794298183,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('YOBGexxsavBXW3UxBxe2UDyOiRXxvciC',1795594185,'PzEg5JNBFpHjgdNhT72NyBsMT2r0cHBk',1794298185,1794298185,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('28ViQcNdSbdYQgilHFrjXdC6bOdElc74',1795594188,'YSzH33nU5YdK8WRPC0J9l8A7ViCkpNL9',1794298188,1794298188,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('scPTC1PgGczlpndapSNDEu0BAs96u1L7',1795594190,'G8TSgExq7OEKXeudmaRSlUVlnojOZvh0',1794298190,1794298190,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('YwV53YLFBnVqrvGR21ZRVEnT5avqPe8P',1795594322,'LM5VX6PMQcziMHjVdRBw7miz8w2ORL06',1794298322,1794298322,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('NimMr07SqmUP1Q4gwtq6GEjJvlk0TH5E',1795594431,'a7asBMymn8jtyZAK6N0BatUd0Hhz7i8a',1794298431,1794298431,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('saHUbUY09lb0zqghtH9U103AYYZSVtaU',1795594655,'kaYMB19Iyc9aSyRNV7TO41NcnSjlPiyO',1794298655,1794298655,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('t48ViKiK8hObQakxwp3WV4KjYvv5OvMp',1795594967,'0dWCdfIPWq8BOFvGVfE71MFriJnUnTpM',1794298967,1794298967,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('YIXrq7bNoomrHY4PtQVk7Gkn6rI1BLpz',1795595307,'RfkcxBWd6tMhbQXl1sTM2Wc5S2ECRhu9',1794299307,1794299307,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('2C8TmFj8pG0b2jeS5xG0CbfUX195EPxc',1795595474,'S51wrjGqSAf89ICk8RRP5UFaqkHMoVHq',1794299474,1794299474,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('ZrHt2FLvlWzQ2XJKdQunZ4LpwGKPszeW',1795595698,'3lz2Xe2IfUMSwEzATr5NxxSIkwuHmrqF',1794299698,1794299698,'','PostmanRuntime/2.15.0','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('avezidMDRsOhRGvqHEsA57Om2sRBT7mX',1795595814,'xkUah0c7Fpkjx3fe8yLhXNsoAYL5rqTp',1794299814,1794299814,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('h33QWBoFYoI58bxe0EPiXV1QGylOBclO',1795595898,'iyUwzpty0bFEzkgWMCNwmVHdYduod9wS',1794299898,1794299898,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('BRdB0JBCUIE62cBPDeSdbdTSF4vbfJOS',1795596088,'cDUPKeQDV6Ou2yvTPwPY5aFxDaREBF09',1794300088,1794300088,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('BAL53hY8hZSRCeT87Kq7Li9yix8GVN2f',1795596153,'EsY60N5xfkN2JYmVjht09G12eBN0x3gK',1794300153,1794300153,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('gAlgsoIRwwaIpMjnjkRilwVX3wVVKfJm',1795596351,'n2QGau83zPNPA2bYzuCYC0PkDcnVES7O',1794300351,1794300351,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('W0EQceZPwrNcs2o5A0L1UscNug6hh1g9',1795596444,'5nuSMm030I3stQIAlFi5q3cVE2lsmEWx',1794300444,1794300444,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('5BOn9eiRl4VzoW0HDt2qJkUOq9aiLkVj',1795596604,'QeiCHq61gKcFXsbd1VsBgKD6CyDxsgRh',1794300604,1794300604,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('K4P3IVHSkx2qSYKuzi3vc8yDDLtMajuU',1795596617,'66QqvHnBIMpLxkxSfJerHQZDm2Y2wVT1',1794300617,1794300617,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('lROE3omsMUjgYjQaJpQhpJl9enkSUdMr',1795598115,'kqLCq45zzbZdxOV5C5qJxdTM1rYepQhe',1794302115,1794302115,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('MVhpR86YOuweP3AyVjztZIAs4lx6Q5yp',1795614110,'r3sUshNGXwrtYf7BEmJPHPVkuq9WSPcX',1794318110,1794318110,'','Mozilla/5.0 (Linux; Android 16; Pixel 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Mobile Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('EKfaTLlqSFJb8e3QdUNVLMwCYmNVFuip',1795614141,'MpXWekZ0AlgwiOwyffyqWJKSKTyJXezn',1794318141,1794318141,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('QmMjfO6mtMjxU9hRrpXqLLJ3m2ecuujT',1795706538,'Kmr4gCXvtWk83ewTRvcrI7Nb5yVNlgDP',1794323852,1794410538,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
INSERT INTO "session" ("id","expires_at","token","created_at","updated_at","ip_address","user_agent","user_id") VALUES('szsyWSyZfaEHUwhIQrRHWBRXRL0jROQK',1795787940,'JUTytoJXJARCT3DNrURfkggvhNxJg5XR',1794491940,1794491940,'','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ');
CREATE TABLE account (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  id_token TEXT,
  access_token_expires_at INTEGER,
  refresh_token_expires_at INTEGER,
  scope TEXT,
  password TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
INSERT INTO "account" ("id","account_id","provider_id","user_id","access_token","refresh_token","id_token","access_token_expires_at","refresh_token_expires_at","scope","password","created_at","updated_at") VALUES('jt8FprpeBgJxScoSnI7yf37ErNG96Kqj','XR9nIc40MvOeNIM373hrm1m67AjYhRJ9','credential','XR9nIc40MvOeNIM373hrm1m67AjYhRJ9',NULL,NULL,NULL,NULL,NULL,NULL,'42a37a2c9211a40e13a8e9486f795c05:a02252f59621f737c5b07719093850bcb009c52af9a6c915fe74d51ee00835d962d0163f97e5d0edeb0f8c6300916b626c4f3f898c458093774b4ea496d09511',1794251612,1794251612);
INSERT INTO "account" ("id","account_id","provider_id","user_id","access_token","refresh_token","id_token","access_token_expires_at","refresh_token_expires_at","scope","password","created_at","updated_at") VALUES('9y6Bmb2ipuls2qo6ySQSGhTFppMlb96N','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ','credential','1zSp1ahCP8gCWBOqTfXrXd6PEqTlT6CQ',NULL,NULL,NULL,NULL,NULL,NULL,'82d35929a52b7e2f3b32f19c83ad8181:c010593e107a85f3a7180a41b80b87970fa5771c71be4dda8bdcf5f841c39471f61150f0e0c3fed801a62ee5cd2050876ff5d6c96e05f147f8e80a55bcfadc3e',1794296269,1794296269);
CREATE TABLE verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER,
  updated_at INTEGER
);
CREATE TABLE page_contents (
  id TEXT PRIMARY KEY,
  hero TEXT NOT NULL,
  arthi_schedule TEXT NOT NULL,
  about TEXT NOT NULL,
  history TEXT NOT NULL,
  deities TEXT NOT NULL,
  temple_timings TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
INSERT INTO "page_contents" ("id","hero","arthi_schedule","about","history","deities","temple_timings","updated_at") VALUES('global_settings','{"title_en":"Golpahar Mohashoshan Kali Mandir","title_bn":"গোলপাহাড় মহাশ্মশান কালী মন্দির","description_en":"A place of prayer, peace and community. Dedicated to divine worship, spiritual awakening, and selfless social welfare in Chittagong.","description_bn":"প্রার্থনা, শান্তি এবং সম্প্রদায়ের একটি পবিত্র স্থান। চট্টগ্রামে দিব্য পূজা, আধ্যাত্মিক জাগরণ এবং নিঃস্বার্থ সমাজকল্যাণে নিবেদিত।","images":[{"url":"https://i.ibb.co.com/2HRyYJw/899861698-1597767324988073-3986089999534144445-n.jpg","caption_en":"Evening Aarti","caption_bn":"সন্ধ্যা আরতি"},{"url":"https://i.ibb.co.com/4gJC16WD/902022461-1483851223708221-6581324321359643068-n.jpg","caption_en":"Temple View","caption_bn":"মন্দির প্রাঙ্গণ"},{"url":"https://i.ibb.co.com/tw9CgxkX/temple1.jpg","caption_en":"Golpahar Mohashoshan Kali Mandir","caption_bn":"গোলপাহাড় মহাশ্মশান কালী মন্দির"}]}','[{"title_en":"Mangal Aarti","title_bn":"মঙ্গলারতি","description_en":"Early morning awakening prayers.","description_bn":"ভোরবেলার আরতি ও প্রার্থনা।","time":"04:00 AM","start":"","end":""},{"title_en":"Bhog Offering","title_bn":"ভোগ নিবেদন","description_en":"Mahaprabhune bhog dhruvavani vidhi.","description_bn":"মহাপ্রভুর ভোগ ও ধ্রুববাণী বিধি।","time":"12:30 PM","start":"","end":""},{"title_en":"Sandhya Aarti","title_bn":"সন্ধ্যা আরতি","description_en":"Sanjni divya aarti ane mahapuja.","description_bn":"সন্ধ্যাবেলার দিব্য আরতি ও মহাপূজা।","time":"6:30 PM","start":"","end":""},{"title_en":"Shital Bhog & Shayan","title_bn":"শীতল ভোগ ও শয়ন","description_en":"Ratrina samaye shital bhog ane shayan darshan.","description_bn":"রাত্রিকালীন শীতল ভোগ ও শয়ন দর্শন।","time":"8:00 PM","start":"","end":""}]','{"introduction":"","committeeOverview":"","members":[],"messages":[]}','{"templeHistory":"","mohashoshanHistory":""}','[]','{"openingTime":"05:00 AM","closingTime":"09:00 PM","status":"Open"}',1794491972);
CREATE TABLE pujas (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_bn TEXT DEFAULT '',
  price REAL NOT NULL DEFAULT 0.0,
  date_en TEXT DEFAULT '',
  date_bn TEXT DEFAULT '',
  time TEXT DEFAULT '',
  type_en TEXT DEFAULT '',
  type_bn TEXT DEFAULT '',
  location_en TEXT DEFAULT '',
  location_bn TEXT DEFAULT '',
  image TEXT DEFAULT '',
  rules_en TEXT DEFAULT '',
  rules_bn TEXT DEFAULT '',
  is_available INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "pujas" ("id","title_en","title_bn","description_en","description_bn","price","date_en","date_bn","time","type_en","type_bn","location_en","location_bn","image","rules_en","rules_bn","is_available","created_at","updated_at") VALUES('e6b8f3d3-6442-462f-ae1d-0466b1972a57','Maha Ratri Kali Puja','মহা রাত্রি কালী পূজা','Special midnight Kali Puja performance with traditional rituals, Vedic mantras, and Mahaprasad distribution.','ঐতিহ্যবাহী আচার-অনুষ্ঠান, বৈদিক মন্ত্রোচ্চারণ এবং মহাপ্রসাদ বিতরণের সাথে বিশেষ মধ্যরাত্রিকালীন কালী পূজা।',1080,'24 November 2026','২৪ নভেম্বর ২০২৬','10:00 PM','Special Puja','বিশেষ পূজা','Main Temple Hall, Golpahar','মূল মন্দির প্রাঙ্গণ, গোলপাহাড়','https://i.ibb.co.com/Y7nFSfyF/859643630-1102238592415202-5879781624406010636-n.jpg',replace('1. Devotees must reach before 10:00 PM.\n2. Bring booking receipt/ID.\n3. Traditional attire mandatory.','\n',char(10)),replace('১. ভক্তদের অবশ্যই রাত ১০:০০ টার আগে পৌঁছাতে হবে।\n২. বুকিং রশিদ সাথে আনুন।\n৩. মার্জিত পোশাক পরুন।','\n',char(10)),1,'2026-11-11 17:22:29','2026-11-11T17:28:07.838Z');