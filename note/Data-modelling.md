## 1. TYPES OF RELATIONSHIPS BETWEEN DATA
- ***1:1***

    ![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664955633/Screenshot_from_2022-10-05_14-40-15_wojqtp.png)

    *(1 movie can only have 1 name)*

- ***1:many***
    >+ 1:FEW
    
    ![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664955213/Screenshot_from_2022-10-05_14-33-12_zt8t0y.png)

    *(1 movie can win **many** awards - just a few)*

    >+ 1:MANY

    One document can relate to hundreds or thousands of other document

    ![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664955331/Screenshot_from_2022-10-05_14-35-17_avixgp.png)

    *(1 movie can have thousands of reviews)*      

    >+ 1:TON
    
    ![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664955393/Screenshot_from_2022-10-05_14-35-56_nnjlsv.png)

    *(1 app can have milions of logs)* 

- ***many:many***
    
    ![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664955716/Screenshot_from_2022-10-05_14-41-45_epg8ux.png)

    *(1 movie can have **many** actors, but one actor can also play in **many** movies)*

#### Summary

![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664955934/Screenshot_from_2022-10-05_14-45-22_vukmp2.png)


## 2. REFERENCING VS. EMBEDDING

#### 1. REFERENCED / NORMALIZED (Duoc tham chieu / Chuan hoa)

![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664956255/Screenshot_from_2022-10-05_14-50-42_ajvtq7.png)

* Preformance: it's easier to query each document on its own *(việc tự truy vấn từng tài liệu dễ dàng hơn)*
* We need 2 queries to get data from referenced document

#### 2. EMBEDDED / DENORMALIZED (Duoc nhung vao / Khong chuan hoa)

![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664956360/Screenshot_from_2022-10-05_14-52-27_kx4xin.png)

* Preformance: we can get all the information in one query *(chúng ta có thể nhận được tất cả thông tin trong một query)*
* Impossible to query the embedded document on its own *(Không thể tự truy vấn embedded document)*

> All image have been get from : https://cloudinary.com/console/c-270f5c09a84f6445992f2ee20aadb3/media_library/folders/home

#### 3. TYPES OF REFERENCING

1. CHILD REFERENCING

![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664957367/Screenshot_from_2022-10-05_15-08-35_dvvuan.png)

2. PARENT REFERENCING

![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664957468/Screenshot_from_2022-10-05_15-10-09_nmgrcm.png)

3. TOW-WAY REFERENCING

![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664957637/Screenshot_from_2022-10-05_15-13-47_airn9s.png)

#### Summary

* The most important is: structure your data to **match the ways that your application queries and updates data**;
*(Cau truc du lieu cua ban de phu hop voi cac cach ung dung cua ban thu hien truy van va update data)*

* In other words: Identify the queries that arise from your **application's use cases** first, and then model your data so that the **questions can get answered** in the most efficient way 
*(Nói cách khác: Xác định các truy vấn phát sinh từ các trường hợp sử dụng ứng dụng trước tiên, và sau đó lập mô hình dữ liệu của bạn để trả lời cau hoi theo cách hiệu quả nhất)*

* In general, **always favor embedding**, unless there is good reason not to embed. Especially on `1:FEW` and `1:MANY` relationships;
*(Noi chung, luon luon ung ho embedding, tru khi co mot li do de khong dung embed. Dac biet la tren ...)*

* A `1:TON` or a `MANY:MANY` relationship is usually a good reason to **reference** instead of embedding;

* Also, favor **referencing** when data is updated a lot and if you need to frequently access a dataset on its own; 
*(Cung ung ho **referencing** khi data cap nhat nhieu va neu ban can truy cap thuong xuyen data )*

* Use **embedding** when data is mostly read but rarely updated, and wnen two datasets belong intrinsically together
*(Su dung **embedding** khi data chu yeu duoc doc nhung it khi duoc cap nhat )*

* Don't allow arrays to grow indefinitely. Therefore, if you need to normalized, use **child referencing** for `1:MANY` relationships, and **parent referencing** for `1:TON` relationship,
*(Khong cho phep cac mang phat trien vo thoi han. Vi vay, neu ban can chuan hoa, su dung...)*

* Use **two-way referencing** for `MANY:MANY` relationships.

### The NATOURS DATA model

![markdown](https://res.cloudinary.com/dbcwtjvf3/image/upload/v1664963865/Screenshot_from_2022-10-05_16-57-30_exeazo.png)