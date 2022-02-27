# 11加密安全

## 编码算法

* ASCII编码

  对照表翻译

* URL编码

  如果字符是`A`~`Z`，`a`~`z`，`0`~`9`以及`-`、`_`、`.`、`*`，则保持不变

  - 如果是其他字符，先转换为UTF-8编码，然后对每个字节以`%XX`表示。
  - 例如：字符`中`的UTF-8编码是`0xe4b8ad`，因此，它的URL编码是`%E4%B8%AD`。URL编码总是大写

* Base64编码

  Base64编码是对二进制数据进行编码，表示成文本格式

  这样在很多文本中就可以处理二进制数据。

  例如，电子邮件协议就是文本协议，如果要在电子邮件中添加一个二进制文件，就可以用Base64编码，然后以文本的形式传送

  Base64编码的缺点是传输效率会降低，因为它把原始数据的长度增加了1/3

## 哈希算法

* 哈希算法的特点

  相同的输入一定得到相同的输出；

  不同的输入大概率得到不同的输出。

* 相同的输入永远会计算出相同的`hashCode`

* 哈希碰撞 : 两个不同的输入得到了相同的输出

  ```
  "AaAaAa".hashCode(); // 0x7460e8c0
  "BBAaBB".hashCode(); // 0x7460e8c0
  ```

* 哈希算法应该满足

  - 碰撞概率低；
  - 不能猜测输出。

* 常用的哈希算法有：

  | 算法       | 输出长度（位） | 输出长度（字节） |
  | :--------- | :------------- | :--------------- |
  | MD5        | 128 bits       | 16 bytes         |
  | SHA-1      | 160 bits       | 20 bytes         |
  | RipeMD-160 | 160 bits       | 20 bytes         |
  | SHA-256    | 256 bits       | 32 bytes         |
  | SHA-512    | 512 bits       | 64 bytes         |

* Java标准库提供了常用的哈希算法

  ```
  import java.math.BigInteger;
  import java.security.MessageDigest;
  public class Main {
      public static void main(String[] args) throws Exception {
          // 创建一个MessageDigest实例:
          MessageDigest md = MessageDigest.getInstance("MD5");
          // 反复调用update输入数据:
          md.update("Hello".getBytes("UTF-8"));
          md.update("World".getBytes("UTF-8"));
          byte[] result = md.digest(); // 16 bytes: 68e109f0f40ca72a15e05cc22786f8e6
          System.out.println(new BigInteger(1, result).toString(16));
      }
  }
  ```

* 哈希算法的用途

  * 验证文件
  * 存储用户口令:为防止彩虹表攻击可能加盐

## BouncyCastle

* BouncyCastle是一个提供了很多哈希算法和加密算法的第三方库

* java.security提供了允许第三方提供商无缝接入的机制

* 示例当我们需要使用BouncyCastle的PipeMD160算法时

  ```
  public class Main {
      public static void main(String[] args) throws Exception {
          // 注册BouncyCastle:
          Security.addProvider(new BouncyCastleProvider());
          // 按名称正常调用:
          MessageDigest md = MessageDigest.getInstance("RipeMD160");
          md.update("HelloWorld".getBytes("UTF-8"));
          byte[] result = md.digest();
          System.out.println(new BigInteger(1, result).toString(16));
      }
  }
  ```

## HMac算法

* HmacMD5可以看作带有一个安全的key的MD5,总是和某种哈希算法配合起来用

* 加密

  ```
  import java.math.BigInteger;
  import javax.crypto.*;
  public class Main {
      public static void main(String[] args) throws Exception {
          KeyGenerator keyGen = KeyGenerator.getInstance("HmacMD5");
          SecretKey key = keyGen.generateKey();
          // 打印随机生成的key:
          byte[] skey = key.getEncoded();
          System.out.println(new BigInteger(1, skey).toString(16));
          Mac mac = Mac.getInstance("HmacMD5");
          mac.init(key);
          mac.update("HelloWorld".getBytes("UTF-8"));
          byte[] result = mac.doFinal();
          System.out.println(new BigInteger(1, result).toString(16));
      }
  }
  ```

* 解密

  ```
  import java.util.Arrays;
  import javax.crypto.*;
  import javax.crypto.spec.*;
  public class Main {
      public static void main(String[] args) throws Exception {
          byte[] hkey = new byte[] { 106, 70, -110, 125, 39, -20, 52, 56, 85, 9, -19, -72, 52, -53, 52, -45, -6, 119, -63,
                  30, 20, -83, -28, 77, 98, 109, -32, -76, 121, -106, 0, -74, -107, -114, -45, 104, -104, -8, 2, 121, 6,
                  97, -18, -13, -63, -30, -125, -103, -80, -46, 113, -14, 68, 32, -46, 101, -116, -104, -81, -108, 122,
                  89, -106, -109 };
  
          SecretKey key = new SecretKeySpec(hkey, "HmacMD5");
          Mac mac = Mac.getInstance("HmacMD5");
          mac.init(key);
          mac.update("HelloWorld".getBytes("UTF-8"));
          byte[] result = mac.doFinal();
          System.out.println(Arrays.toString(result));
          // [126, 59, 37, 63, 73, 90, 111, -96, -77, 15, 82, -74, 122, -55, -67, 54]
      }
  }
  ```

## 对称加密算法

* 对称加密是加密密钥能够从解密密钥中推算出来，同时解密密钥也可以从加密密钥中推算出来的算法
* 对称加密算法的秘钥直接决定加密强度

* 常用对称加密算法

  | 算法 | 密钥长度    | 工作模式             | 填充模式                                |
  | :--- | :---------- | :------------------- | :-------------------------------------- |
  | DES  | 56/64       | ECB/CBC/PCBC/CTR/... | NoPadding/PKCS5Padding/...              |
  | AES  | 128/192/256 | ECB/CBC/PCBC/CTR/... | NoPadding/PKCS5Padding/PKCS7Padding/... |
  | IDEA | 128         | ECB                  | PKCS5Padding/PKCS7Padding/...           |

  * DES加密算法秘钥过短目前可在短时间破解
  * ECB模式相同的明文加密会得到相同的密文
  * CBC模式将明文分组,每组明文都会与上一组明文或是初始向量进行异或运算后再加密,相比ECB模式更加安全

* 使用AES加密

  ```
  import java.security.*;
  import java.util.Base64;
  
  import javax.crypto.*;
  import javax.crypto.spec.*;
  
  public class Main {
      public static void main(String[] args) throws Exception {
          // 原文:
          String message = "Hello, world!";
          System.out.println("Message: " + message);
          // 128位密钥 = 16 bytes Key:
          byte[] key = "1234567890abcdef".getBytes("UTF-8");
          // 加密:
          byte[] data = message.getBytes("UTF-8");
          byte[] encrypted = encrypt(key, data);
          System.out.println("Encrypted: " + Base64.getEncoder().encodeToString(encrypted));
          // 解密:
          byte[] decrypted = decrypt(key, encrypted);
          System.out.println("Decrypted: " + new String(decrypted, "UTF-8"));
      }
  
      // 加密:
      public static byte[] encrypt(byte[] key, byte[] input) throws GeneralSecurityException {
          Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
          SecretKey keySpec = new SecretKeySpec(key, "AES");
          cipher.init(Cipher.ENCRYPT_MODE, keySpec);
          return cipher.doFinal(input);
      }
  
      // 解密:
      public static byte[] decrypt(byte[] key, byte[] input) throws GeneralSecurityException {
          Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
          SecretKey keySpec = new SecretKeySpec(key, "AES");
          cipher.init(Cipher.DECRYPT_MODE, keySpec);
          return cipher.doFinal(input);
      }
  }
  ```

  ```
  import java.security.*;
  import java.util.Base64;
  import javax.crypto.*;
  import javax.crypto.spec.*;
  public class Main {
      public static void main(String[] args) throws Exception {
          // 原文:
          String message = "Hello, world!";
          System.out.println("Message: " + message);
          // 256位密钥 = 32 bytes Key:
          byte[] key = "1234567890abcdef1234567890abcdef".getBytes("UTF-8");
          // 加密:
          byte[] data = message.getBytes("UTF-8");
          byte[] encrypted = encrypt(key, data);
          System.out.println("Encrypted: " + Base64.getEncoder().encodeToString(encrypted));
          // 解密:
          byte[] decrypted = decrypt(key, encrypted);
          System.out.println("Decrypted: " + new String(decrypted, "UTF-8"));
      }
  
      // 加密:
      public static byte[] encrypt(byte[] key, byte[] input) throws GeneralSecurityException {
          Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
          SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
          // CBC模式需要生成一个16 bytes的initialization vector:
          SecureRandom sr = SecureRandom.getInstanceStrong();
          byte[] iv = sr.generateSeed(16);
          IvParameterSpec ivps = new IvParameterSpec(iv);
          cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivps);
          byte[] data = cipher.doFinal(input);
          // IV不需要保密，把IV和密文一起返回:
          return join(iv, data);
      }
  
      // 解密:
      public static byte[] decrypt(byte[] key, byte[] input) throws GeneralSecurityException {
          // 把input分割成IV和密文:
          byte[] iv = new byte[16];
          byte[] data = new byte[input.length - 16];
          System.arraycopy(input, 0, iv, 0, 16);
          System.arraycopy(input, 16, data, 0, data.length);
          // 解密:
          Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
          SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
          IvParameterSpec ivps = new IvParameterSpec(iv);
          cipher.init(Cipher.DECRYPT_MODE, keySpec, ivps);
          return cipher.doFinal(data);
      }
  
      public static byte[] join(byte[] bs1, byte[] bs2) {
          byte[] r = new byte[bs1.length + bs2.length];
          System.arraycopy(bs1, 0, r, 0, bs1.length);
          System.arraycopy(bs2, 0, r, bs1.length, bs2.length);
          return r;
      }
  }
  ```

## 口令加密算法

* 由于用户输入的口令一般都存在规律或是不符合加密算法的输入需求,因此往往使用PBE(Password base Encryption)

```
public class Main {
    public static void main(String[] args) throws Exception {
        // 把BouncyCastle作为Provider添加到java.security:
        Security.addProvider(new BouncyCastleProvider());
        // 原文:
        String message = "Hello, world!";
        // 加密口令:
        String password = "hello12345";
        // 16 bytes随机Salt:
        byte[] salt = SecureRandom.getInstanceStrong().generateSeed(16);
        System.out.printf("salt: %032x\n", new BigInteger(1, salt));
        // 加密:
        byte[] data = message.getBytes("UTF-8");
        byte[] encrypted = encrypt(password, salt, data);
        System.out.println("encrypted: " + Base64.getEncoder().encodeToString(encrypted));
        // 解密:
        byte[] decrypted = decrypt(password, salt, encrypted);
        System.out.println("decrypted: " + new String(decrypted, "UTF-8"));
    }

    // 加密:
    public static byte[] encrypt(String password, byte[] salt, byte[] input) throws GeneralSecurityException {
        PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());
        SecretKeyFactory skeyFactory = SecretKeyFactory.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        SecretKey skey = skeyFactory.generateSecret(keySpec);
        PBEParameterSpec pbeps = new PBEParameterSpec(salt, 1000);
        Cipher cipher = Cipher.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        cipher.init(Cipher.ENCRYPT_MODE, skey, pbeps);
        return cipher.doFinal(input);
    }

    // 解密:
    public static byte[] decrypt(String password, byte[] salt, byte[] input) throws GeneralSecurityException {
        PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());
        SecretKeyFactory skeyFactory = SecretKeyFactory.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        SecretKey skey = skeyFactory.generateSecret(keySpec);
        PBEParameterSpec pbeps = new PBEParameterSpec(salt, 1000);
        Cipher cipher = Cipher.getInstance("PBEwithSHA1and128bitAES-CBC-BC");
        cipher.init(Cipher.DECRYPT_MODE, skey, pbeps);
        return cipher.doFinal(input);
    }
}
```

## 秘钥交换算法

* 简要 : 通过数学方法交换信息,不需要传输秘钥就可以获取秘钥

  1. 甲首选选择一个素数`p`，例如509，底数`g`，任选，例如5，随机数`a`，例如123，然后计算`A=g^a mod p`，结果是215，然后，甲发送`p＝509`，`g=5`，`A=215`给乙；
  2. 乙方收到后，也选择一个随机数`b`，例如，456，然后计算`B=g^b mod p`，结果是181，乙再同时计算`s=A^b mod p`，结果是121；
  3. 乙把计算的`B=181`发给甲，甲计算`s＝B^a mod p`的余数，计算结果与乙算出的结果一样，都是121。

* DH算法不能解决中间人攻击

  ```
  import java.math.BigInteger;
  import java.security.*;
  import java.security.spec.*;
  
  import javax.crypto.KeyAgreement;
  public class Main {
      public static void main(String[] args) {
          // Bob和Alice:
          Person bob = new Person("Bob");
          Person alice = new Person("Alice");
  
          // 各自生成KeyPair:
          bob.generateKeyPair();
          alice.generateKeyPair();
  
          // 双方交换各自的PublicKey:
          // Bob根据Alice的PublicKey生成自己的本地密钥:
          bob.generateSecretKey(alice.publicKey.getEncoded());
          // Alice根据Bob的PublicKey生成自己的本地密钥:
          alice.generateSecretKey(bob.publicKey.getEncoded());
  
          // 检查双方的本地密钥是否相同:
          bob.printKeys();
          alice.printKeys();
          // 双方的SecretKey相同，后续通信将使用SecretKey作为密钥进行AES加解密...
      }
  }
  
  class Person {
      public final String name;
  
      public PublicKey publicKey;
      private PrivateKey privateKey;
      private byte[] secretKey;
  
      public Person(String name) {
          this.name = name;
      }
  
      // 生成本地KeyPair:
      public void generateKeyPair() {
          try {
              KeyPairGenerator kpGen = KeyPairGenerator.getInstance("DH");
              kpGen.initialize(512);
              KeyPair kp = kpGen.generateKeyPair();
              this.privateKey = kp.getPrivate();
              this.publicKey = kp.getPublic();
          } catch (GeneralSecurityException e) {
              throw new RuntimeException(e);
          }
      }
  
      public void generateSecretKey(byte[] receivedPubKeyBytes) {
          try {
              // 从byte[]恢复PublicKey:
              X509EncodedKeySpec keySpec = new X509EncodedKeySpec(receivedPubKeyBytes);
              KeyFactory kf = KeyFactory.getInstance("DH");
              PublicKey receivedPublicKey = kf.generatePublic(keySpec);
              // 生成本地密钥:
              KeyAgreement keyAgreement = KeyAgreement.getInstance("DH");
              keyAgreement.init(this.privateKey); // 自己的PrivateKey
              keyAgreement.doPhase(receivedPublicKey, true); // 对方的PublicKey
              // 生成SecretKey密钥:
              this.secretKey = keyAgreement.generateSecret();
          } catch (GeneralSecurityException e) {
              throw new RuntimeException(e);
          }
      }
  
      public void printKeys() {
          System.out.printf("Name: %s\n", this.name);
          System.out.printf("Private key: %x\n", new BigInteger(1, this.privateKey.getEncoded()));
          System.out.printf("Public key: %x\n", new BigInteger(1, this.publicKey.getEncoded()));
          System.out.printf("Secret key: %x\n", new BigInteger(1, this.secretKey));
      }
  }
  ```

## 非对称加密算法

* RSA老朋友了不做介绍

* 只使用非对称加密算法不能放置中间人攻击

  ```
  import java.math.BigInteger;
  import java.security.*;
  import javax.crypto.Cipher;
  public class Main {
      public static void main(String[] args) throws Exception {
          // 明文:
          byte[] plain = "Hello, encrypt use RSA".getBytes("UTF-8");
          // 创建公钥／私钥对:
          Person alice = new Person("Alice");
          // 用Alice的公钥加密:
          byte[] pk = alice.getPublicKey();
          System.out.println(String.format("public key: %x", new BigInteger(1, pk)));
          byte[] encrypted = alice.encrypt(plain);
          System.out.println(String.format("encrypted: %x", new BigInteger(1, encrypted)));
          // 用Alice的私钥解密:
          byte[] sk = alice.getPrivateKey();
          System.out.println(String.format("private key: %x", new BigInteger(1, sk)));
          byte[] decrypted = alice.decrypt(encrypted);
          System.out.println(new String(decrypted, "UTF-8"));
      }
  }
  
  class Person {
      String name;
      // 私钥:
      PrivateKey sk;
      // 公钥:
      PublicKey pk;
  
      public Person(String name) throws GeneralSecurityException {
          this.name = name;
          // 生成公钥／私钥对:
          KeyPairGenerator kpGen = KeyPairGenerator.getInstance("RSA");
          kpGen.initialize(1024);
          KeyPair kp = kpGen.generateKeyPair();
          this.sk = kp.getPrivate();
          this.pk = kp.getPublic();
      }
  
      // 把私钥导出为字节
      public byte[] getPrivateKey() {
          return this.sk.getEncoded();
      }
  
      // 把公钥导出为字节
      public byte[] getPublicKey() {
          return this.pk.getEncoded();
      }
  
      // 用公钥加密:
      public byte[] encrypt(byte[] message) throws GeneralSecurityException {
          Cipher cipher = Cipher.getInstance("RSA");
          cipher.init(Cipher.ENCRYPT_MODE, this.pk);
          return cipher.doFinal(message);
      }
  
      // 用私钥解密:
      public byte[] decrypt(byte[] input) throws GeneralSecurityException {
          Cipher cipher = Cipher.getInstance("RSA");
          cipher.init(Cipher.DECRYPT_MODE, this.sk);
          return cipher.doFinal(input);
      }
  }
  ```

* RSA的公钥和私钥都可以通过`getEncoded()`方法获得以`byte[]`表示的二进制数据，并根据需要保存到文件中。要从`byte[]`数组恢复公钥或私钥，可以这么写

  ```
  byte[] pkData = ...
  byte[] skData = ...
  KeyFactory kf = KeyFactory.getInstance("RSA");
  // 恢复公钥:
  X509EncodedKeySpec pkSpec = new X509EncodedKeySpec(pkData);
  PublicKey pk = kf.generatePublic(pkSpec);
  // 恢复私钥:
  PKCS8EncodedKeySpec skSpec = new PKCS8EncodedKeySpec(skData);
  PrivateKey sk = kf.generatePrivate(skSpec);
  ```

## 签名算法

* 数字签名用于：
  - 防止伪造；
  - 防止抵赖；
  - 检测篡改。

* 私钥加密,公钥解密,实际应用的时候,针对原始哈希进行签名

  ```
  signature = encrypt(privateKey, sha256(message))
  ```

* 对签名验证就是使用公钥解密

  ```
  hash = decrypt(publicKey, signature)
  ```

* 常用数字签名算法有：

  - MD5withRSA
  - SHA1withRSA
  - SHA256withRSA

  ```
  import java.math.BigInteger;
  import java.nio.charset.StandardCharsets;
  import java.security.*;
  public class Main {
      public static void main(String[] args) throws GeneralSecurityException {
          // 生成RSA公钥/私钥:
          KeyPairGenerator kpGen = KeyPairGenerator.getInstance("RSA");
          kpGen.initialize(1024);
          KeyPair kp = kpGen.generateKeyPair();
          PrivateKey sk = kp.getPrivate();
          PublicKey pk = kp.getPublic();
  
          // 待签名的消息:
          byte[] message = "Hello, I am Bob!".getBytes(StandardCharsets.UTF_8);
  
          // 用私钥签名:
          Signature s = Signature.getInstance("SHA1withRSA");
          s.initSign(sk);
          s.update(message);
          byte[] signed = s.sign();
          System.out.println(String.format("signature: %x", new BigInteger(1, signed)));
  
          // 用公钥验证:
          Signature v = Signature.getInstance("SHA1withRSA");
          v.initVerify(pk);
          v.update(message);
          boolean valid = v.verify(signed);
          System.out.println("valid? " + valid);
      }
  }
  ```

* 除了RSA可以签名外，还可以使用DSA算法进行签名。DSA是Digital Signature Algorithm的缩写，它使用ElGamal数字签名算法。和RSA数字签名相比，DSA的优点是更快

* DSA只能配合SHA使用，常用的算法有：

  - SHA1withDSA
  - SHA256withDSA
  - SHA512withDSA

* ECDSA签名

  **补课**

## 数字证书

* 摘要算法用来确保数据没有被篡改，非对称加密算法可以对数据进行加解密，签名算法可以确保数据完整性和抗否认性，把这些算法集合到一起，并搞一套完善的标准，这就是数字证书

* 数字证书可以防止中间人攻击，因为它采用链式签名认证，即通过根证书（Root CA）去签名下一级证书，这样层层签名，直到最终的用户证书。而Root CA证书内置于操作系统中，所以，任何经过CA认证的数字证书都可以对其本身进行校验，确保证书本身不是伪造的。

* java实现

  ```
  keytool -storepass 123456 -genkeypair -keyalg RSA -keysize 1024 -sigalg SHA1withRSA -validity 3650 -alias mycert -keystore my.keystore -dname "CN=www.sample.com, OU=sample, O=sample, L=BJ, ST=BJ, C=CN"
  ```

  - keyalg：指定RSA加密算法；
  - sigalg：指定SHA1withRSA签名算法；
  - validity：指定证书有效期3650天；
  - alias：指定证书在程序中引用的名称；
  - dname：最重要的`CN=www.sample.com`指定了`Common Name`，如果证书用在HTTPS中，这个名称必须与域名完全一致。

  执行上述命令，JDK会在当前目录创建一个`my.keystore`文件，并存储创建成功的一个私钥和一个证书，它的别名是`mycert`。

  有了key store存储的证书，我们就可以通过数字证书进行加解密和签名：

* 通过数字证书进行加解密和签名

  ```
  import java.io.InputStream;
  import java.math.BigInteger;
  import java.security.*;
  import java.security.cert.*;
  import javax.crypto.Cipher;
  
  public class Main {
      public static void main(String[] args) throws Exception {
          byte[] message = "Hello, use X.509 cert!".getBytes("UTF-8");
          // 读取KeyStore:
          KeyStore ks = loadKeyStore("/my.keystore", "123456");
          // 读取私钥:
          PrivateKey privateKey = (PrivateKey) ks.getKey("mycert", "123456".toCharArray());
          // 读取证书:
          X509Certificate certificate = (X509Certificate) ks.getCertificate("mycert");
          // 加密:
          byte[] encrypted = encrypt(certificate, message);
          System.out.println(String.format("encrypted: %x", new BigInteger(1, encrypted)));
          // 解密:
          byte[] decrypted = decrypt(privateKey, encrypted);
          System.out.println("decrypted: " + new String(decrypted, "UTF-8"));
          // 签名:
          byte[] sign = sign(privateKey, certificate, message);
          System.out.println(String.format("signature: %x", new BigInteger(1, sign)));
          // 验证签名:
          boolean verified = verify(certificate, message, sign);
          System.out.println("verify: " + verified);
      }
  
      static KeyStore loadKeyStore(String keyStoreFile, String password) {
          try (InputStream input = Main.class.getResourceAsStream(keyStoreFile)) {
              if (input == null) {
                  throw new RuntimeException("file not found in classpath: " + keyStoreFile);
              }
              KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
              ks.load(input, password.toCharArray());
              return ks;
          } catch (Exception e) {
              throw new RuntimeException(e);
          }
      }
  
      static byte[] encrypt(X509Certificate certificate, byte[] message) throws GeneralSecurityException {
          Cipher cipher = Cipher.getInstance(certificate.getPublicKey().getAlgorithm());
          cipher.init(Cipher.ENCRYPT_MODE, certificate.getPublicKey());
          return cipher.doFinal(message);
      }
  
      static byte[] decrypt(PrivateKey privateKey, byte[] data) throws GeneralSecurityException {
          Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
          cipher.init(Cipher.DECRYPT_MODE, privateKey);
          return cipher.doFinal(data);
      }
  
      static byte[] sign(PrivateKey privateKey, X509Certificate certificate, byte[] message)
              throws GeneralSecurityException {
          Signature signature = Signature.getInstance(certificate.getSigAlgName());
          signature.initSign(privateKey);
          signature.update(message);
          return signature.sign();
      }
  
      static boolean verify(X509Certificate certificate, byte[] message, byte[] sig) throws GeneralSecurityException {
          Signature signature = Signature.getInstance(certificate.getSigAlgName());
          signature.initVerify(certificate);
          signature.update(message);
          return signature.verify(sig);
      }
  }
  ```
