create table if not exists user_account
(
	id serial
			primary key,
	email varchar(255)
			unique,
	password varchar(255)
);

alter table user_account drop CONSTRAINT if exists user_account_UK ;
alter table user_account add CONSTRAINT user_account_UK
	UNIQUE (email);

INSERT INTO public.user_account (email, password) VALUES ('baonq1997@gmail.com', '123456');


create table if not exists product (
    	id serial
			primary key,
		product_name varchar unique ,
		quantity integer,
		price numeric
);
insert into product(product_name, quantity, price) values ('Product1', 5, 10.0);
insert into product(product_name, quantity, price) values ('Product2', 10, 20.0);
insert into product(product_name, quantity, price) values ('Product3', 3, 30.0);
insert into product(product_name, quantity, price) values ('Product4', 7, 40.0);
insert into product(product_name, quantity, price) values ('Product5', 7, 40.5);

create table order_details(
    id serial
			primary key,
	user_id integer references user_account(id),
	total numeric,
	status varchar(20),
	created_date timestamp NOT NULL DEFAULT NOW(),
	updated_date timestamp NOT NULL DEFAULT NOW()
)

create table order_items (
    id serial primary key ,
    order_id integer references order_details(id),
    product_id integer references product(id),
    product_name varchar,
    quantity integer,
    price numeric
);

create table payment (
    id serial primary key ,
    order_id integer references order_details(id),
    payment_amount numeric,
    created_date timestamp NOT NULL DEFAULT NOW(),
    payment_method varchar
);



