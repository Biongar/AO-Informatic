# Все команды выполнены в терминале, в ОС Linux Ubuntu, в оболочке psql
### Чтобы ей воспользоваться, вы должны установить postgreSQL на ваш дистрибутив Linux
### Ниже команды, чтобы войти в оболочку postgres в терминале:
```
sudo -i -u postgres
ввести пароль root
psql
```

### Создание базы данных
``` sql
CREATE USER test_user with password '1234';
CREATE DATABASE test_database;
GRANT ALL PRIVILEGES ON DATABASE test_database TO test_user;
```
### Далее выходим и заходим уже в нашу БД под нашим пользователем
``` sql
psql -h localhost test_database test_user;
Вводим пароль(1234)
```

### Просто копируете и вставляете запрос в терминал

### Создание таблицы для владельцев автомобиля
``` sql
CREATE TABLE owners (
    id BIGSERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    DateBirth DATE NOT NULL
);
```

### Создание таблицы для автомобилей
``` sql
CREATE TABLE cars (
    id BIGSERIAL PRIMARY KEY,
    Brand VARCHAR(255) NOT NULL,
    IssueDate DATE NOT NULL,
    PurchaseDate DATE,
    Price INT NOT NULL,
    OwnerId BIGINT REFERENCES owners (id)
);
```

### Наполняем таблицы данными
``` sql
INSERT INTO owners (firstname, lastname, city, datebirth) VALUES ('Михаил', 'Гаврилов', 'Кинешма', '04.04.2000'),
('Иван', 'Иванов', 'Иваново', '24.04.2001'),
('Владимир', 'Козлов', 'Ярославль', '24.08.1991'),
('Юлия', 'Гаврилова', 'Кинешма', '07.10.2000'),
('Юрий', 'Ахметов', 'Екатеринбург', '08.12.1973');


INSERT INTO cars (brand, issuedate, purchasedate, price, ownerid) VALUES 
('Форд Фиеста', '01.02.2011', '02.02.2020', '7000', '1'),
('Марка1 Модель1', '02.03.2015', '04.06.2019', '8000', '1'),
('Марка2 Модель2', '03.04.2009', '06.08.2018', '9500', '1'),
('Марка3 Модель3', '04.05.2010', '08.10.2017', '15443', '1'),
('Марка4 Модель4', '04.05.2010', '08.10.2017', '15443', '1');
```

### Ой, мы ошиблись и ввели всем автомобилям 1 владельца, давайте исправим это!!!
``` sql
UPDATE cars SET ownerid = 2 WHERE brand = 'Марка2 Модель2';
UPDATE cars SET ownerid = 3 WHERE brand = 'Марка3 Модель3';
UPDATE cars SET ownerid = 4 WHERE brand = 'Марка4 Модель4';
```

### Запросы

``` sql
1. выбираем машины, которые принадлежат владельцу с id=1

SELECT * FROM cars WHERE ownerid = 1;

2. выбираем марку и цену всех машин

SELECT brand, price FROM cars;

3. выбираем всех владельцев

SELECT * FROM owners;

4. выбираем всех владельцев с города "Кинешма", младше 05.05.2000 года

SELECT * FROM owners WHERE city = 'Кинешма' AND datebirth < '05.05.2000'; 

5. выбираем машины дешевле 10000

SELECT * FROM cars WHERE price < 10000;

6. джойним машины с хозяинами привязкой по id

SELECT *
FROM cars
FULL JOIN owners ON owners.id = cars.ownerid;

7. джойним машины с хозяинами привязкой по id где цена больше 5000 И меньше 10000

SELECT brand, firstname
FROM cars
FULL JOIN owners ON owners.id = cars.ownerid where price > 5000 AND price < 10000;
```