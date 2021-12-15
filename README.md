# Order System App

# Setup

> 1. You can edit database connection in file .env and create database connection accordingly
> 2. Install required dependency by

```
npm install
```

> 3.Run app:

```
npm run start-dev
```

> 4. Test:

```
npm test
```

# Usage

> 1. Register an user: POST

```
  localhost:7001/user/signup
```

> Request body

```
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

> 2. Login:POST

```
  localhost:7001/user/login
```

> Request body

```
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

Response: Bearer token

> Every request will need to attach Bearer Token to header

> 3. Get products: GET

```
localhost:7001/api/products
```

Response:

```
[
    {
        "price": 40.5,
        "id": 5,
        "product_name": "Product5",
        "quantity": 50
    },
    {
        "price": 20,
        "id": 2,
        "product_name": "Product2",
        "quantity": 20
    }
]
```

4. Create order: POST

```
localhost:7001/api/order
```

Request body

```
[
    {
        "price": 30.5,
        "id": 3,
        "product_name": "Product3",
        "quantity": 10
    },
    {
        "price": 40,
        "id": 4,
        "product_name": "Product4",
        "quantity": 12
    }
]
```

Response:

```
{
    "id": 17,
    "status": "CREATED",
    "total": 785,
    "order_items": [
        {
            "id": 22,
            "product_name": "Product3",
            "quantity": 10,
            "price": 30.5
        },
        {
            "id": 23,
            "product_name": "Product4",
            "quantity": 12,
            "price": 40
        }
    ],
    "user": {
        "email": "test@gmail.com"
    }
}
```

5. Pay order - POST

```
localhost:7001/api/payment/order/:orderId
```

Request body

```
{
	"payment_method": "VISA",
	"payment_amount": 50.75
}
```

Response:

```
{
    "id": 3,
    "payment_method": "VISA",
    "orderDetailId": 17,
    "payment_amount": "785",
    "createdDate": "2021-12-14T08:10:35.462Z"
}
```
