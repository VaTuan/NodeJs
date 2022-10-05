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