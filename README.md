## dmc.core (Dental Milling Center)
1. [Сценарий авторизация пользователя](####1-script-auth-user)
2. [Сценарий работы в роли Admin](####2-script-admin)
3. [Сценарий работы в роли Customer](####3-script-customer)
4. Сценарий работы в роли Dental Technician (dentaltechn)[^4]
5. Сценарий работы в роли Director[^]
6. [Сценарий работы в роли Courier](####6-script-Courier)
7. [Сценарий работы в роли None](####7-script-none)

#### 1. Сценарий авторизация пользователя


#### 2. Сценарий работы в роли Admin
Пользователь с ролью Admin (администратор) заходит на сайт и видит все заказ-наряды в виде таблицы:
Пользователь может производить фильтрацию по клиентам либо видеть все заказ-наряды всех клиентов
В верхней части экрана будет находиться фильтрация по заказчикам ===> Заказчик 1.
                                                                      Заказчик 2.
                                                                      ALL

   Дата  |  Дата сдачи |  Заказчик   | Заказ-наряд |   Доктор   |     Техник    |   Пациент   | Статус выполнения | Статус оплаты | Статус доставки |    Сумма    
:--------|:-----------:|:-----------:|:-----------:|:----------:|:-------------:|:-----------:|:-----------------:|:-------------:|:---------------:|------------:
29.10.21 | до 02.11.21 | Пащенко Э.В.| I-00000001  |   Петров   |  Макаров Е.В. | Василевский |       true        |     true      |      false      | 30 000, 00 
29.10.21 |   03.11.21  | Богданов А. | A-00000001  |   Петров   |  Макаров Е.В. | Василевский |       true        |     false     |      true       | 25 000, 00 
  Итог   |             |             |             |            |               |             |                   |    25 000     |                 |            

Пользователь также может настроить поля которые у него будут отображаться, для этого ему нужно нажать на шестиренку в правом верхнем углу приложения.
TODO: Необходимо настройки столбцов сохранять в какой-нибудь таблице, либо упрощенный вариан шорт вию и фул виев (возможно этого будет достаточно)

* Таблица на странице пользователя отображается с пагинацией.
* Пользователь может производить сортировку по всем столбцам.
* Пользователь может производить фильтрацию по всем столбцам.

__END POINTS FOR ORDER (CRUD)__ 

TODO: 1) Сделать описани работы со справочником пользователей
      2) Сделать описание работы с прайс листом
```
SELECT

getAllOrdersByFilterAndSort(Input)

Input:
  filter: {}    //Данные, чтобы отфильтровать таблицу
  sort: {}      //Данные по сортируемым столбцам
  page: number  //Номер страницы
  limit: number //Количество записей на странице
Out:
  listOrder:{}[]
```

Администратор может добавлять только аналоговые работы и работы, которые пришли на электронную почту и пользователь по какой-то причене не оформил заказ-наряд самастоятельно на сайте.

```
CREATE

createOrder(Input):Out

Input:
  order:{}
Out:
  boolean

```
Администратор может удалять только записи, которые он завел сам, а именно записи у которых ранее не менялись статусы.

```
DELETE

deleteOrder(Input):Out

Input:
  id:number
Out:
  boolean

```

Администратор может редактировать только записи, которые он завел сам, а именно записи у которых ранее не менялись статусы (Подумать на предмет статусов!!! которые необходимо редактировать!!!).

```
UPDATE

updateOrder(Input):Out

Input:
  order:{}
Out:
  boolean

```

#### 3. Сценарий работы в роли Customer
Пользователь с ролью Customer (Заказчик) заходит на сайт и видит свои заказ наряды в виде таблицы:

Столбца Доктора или Техника не будет в зависимоти от того, кто пользователь или доктор или техник (этот момент нужно продумать)

   Дата  |  Дата сдачи | Заказ-наряд |   Доктор   |     Техник    |   Пациент   | Статус выполнения | Статус оплаты | Статус доставки |    Сумма    
:--------|:-----------:|:-----------:|:----------:|:-------------:|:-----------:|:-----------------:|:-------------:|:---------------:|------------:
29.10.21 | до 02.11.21 | I-00000001  |   Петров   |  Макаров Е.В. | Василевский |       true        |     true      |      false      | 30 000, 00 
29.10.21 |   03.11.21  | A-00000001  |   Петров   |  Макаров Е.В. | Василевский |       true        |     false     |      true       | 25 000, 00 
  Итог   |             |             |            |               |             |                   |    25 000     |                 |            

Пользователь также может настроить поля которые у него будут отображаться, для этого ему нужно нажать на шестиренку в правом верхнем углу приложения.

* Таблица на странице пользователя отображается с пагинацией.
* Пользователь может производить сортировку по всем столбцам.
* Пользователь может производить фильтрацию по всем столбцам.

__END POINTS FOR ORDER (CRUD)__
```
Отображение данных у заказчика возможна только на его заказ наряды, заказ-нарядов других пользователей он видеть не может.

SELECT

getAllOrdersByFilterAndSort(Input)

Input:
  filter: {}    //Данные, чтобы отфильтровать таблицу
  sort: {}      //Данные по сортируемым столбцам
  page: number  //Номер страницы
  limit: number //Количество записей на странице
Out:
  listOrder:{}[]
```

Заказчик может добавлять только цифровые работы с добавлением файла. 

```
CREATE

createOrder(Input):Out

Input:
  order:{}
Out:
  boolean

```
Заказчик может удалять только записи, которые он завел сам, а именно записи у которых ранее не менялись статусы (TODO "Продумать этот момент").

```
deleteOrder(Input):Out

DELETE

Input:
  id:number
Out:
  boolean

```

 может редактировать только записи, которые он завел сам, а именно записи у которых ранее не менялись статусы (Подумать на предмет статусов!!! которые необходимо редактировать!!!).

```
UPDATE

updateOrder(Input):Out

Input:
  order:{}
Out:
  boolean

```

#### 6. Сценарий работы в роли Courier
Пользователь с ролью Courier (Курьер) заходит на сайт и видит таблицу:

Отображается дата сегодняшнего дня и перечень заказ-нарядов, которые необходимо развести

 Фио заказчика |     Адрес       |    Телефон        | Половина дня
:-------------:|:---------------:|:-----------------:|:-----------:
 Богданов А    |ул. Силовая 4    |+1 (234) 567-89-00 |   утро       
 Пащенко Э     |ул. Самфирова 95 |+1 (234) 567-89-00 |   вечер      

 После того, как заказ доcтавлен курьер нажимает на строку поля, после этого появляется окно в котором необходимо подтвердить доставку. 
 Он нажимает и подтверждает доставку. Проиходит запись в базу данных, что доставка осуществлена, после этого данная запись у курьера висит в перечне еще полчаса и исчезает.

* Пользователь может производить сортировку по всем столбцам.

#### 6. Сценарий работы в роли None
Обычное singl page приложение c рекламной информацией. 
TODO: продумать логику синг паже приложения, с логикой.
