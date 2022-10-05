## 1. TYPES OF RELATIONSHIPS BETWEEN DATA
- ***1:1***
    `movie` ====> `name` *(1 movie can only have 1 name)*

- ***1:many***
    >+ 1:FEW
             =====> `award`
    `movie`  =====> `award`
             =====> `award`
    *(1 movie can win **many** awards - just a few)*

    >+ 1:MANY
    One document can relate to hundreds or thousands of other document
            =====> `review`
            =====> `review`
    `movie` =====> `review`
                    **hundreds/thousands**
            =====> `award`
    *(1 movie can have thousands of reviews)*      

    >+ 1:TON
            =====> `log`
            =====> `log`
     `app`  =====> `log`
                    **milions...**
            =====> `log`
    *(1 app can have milions of logs)* 

- ***many:many***
    `movie`----`actor`
    `movie`----`actor`
    `movie`----`actor`
    *(1 movie can have **many** actors, but one actor can also play in **many** movies)*

## 2. REFERENCING VS. EMBEDDING

#### 1. REFERENCED / NORMALIZED (Duoc tham chieu / Chuan hoa)

`movie`

```php
{
    "_id" : ObjectID('222'),
    "title" : "Bong dung trung so",
    "releaseYear": 2022,
    // this call Child Referencing
    "actors": [
        ObjectID('555'),  // Referencing (child) (1)
        ObjectID('777')
    ]
}
```
`actor`

```php
{
    "_id": ObjectID('555'), // (1)
    "name": "Tuan deptrai",
    "age": 24
}
```
```php
{
    "_id": ObjectID('777'),
    "name": "Trang beo",
    "age": 22
}
```
* Preformance: it's easier to query each document on its own *(việc tự truy vấn từng tài liệu dễ dàng hơn)*
* We need 2 queries to get data from referenced document

#### 2. EMBEDDED / DENORMALIZED (Duoc nhung vao / Khong chuan hoa)
```php
{
    _id: ObjectID("222"),
    title: "Bong dung trung so",
    releaseYear: 2022,
    actors: [
    // Embedded documents
      {
        _id: ObjectID("555"),
        name: "Tuan deptrai",
        age: 24,
      },
      {
        _id: ObjectID("777"),
        name: "Trang beo",
        age: 22,
      },
    ],
};
```
* Preformance: we can get all the information in one query *(chúng ta có thể nhận được tất cả thông tin trong một query)*
* Impossible to query the embedded document on its own *(Không thể tự truy vấn embedded document)*