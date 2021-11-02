## dmc.core (Dental Milling Center)
1. [Сценарий авторизация пользователя](####1-script-auth-user)
2. Сценарий работы в роли Manager
    * [Просмотр и оформление заказ-нарядов](documentation/manager/doc__order_and_order_price__admin.md)
    * [Работа с прайслистом](documentation/manager/doc__price_and_productcategory__admin.md)
    * [Редактирование своего профиля](documentation/manager/doc__user__admin.md)
3. Сценарий работы в роли Customer
    * [Просмотр и оформление заказ-нарядов](documentation/customer/doc__order_and_order_price__customer.md)
    * [Работа с прайслистом](documentation/customer/doc__price_and_productcategory__customer.md)
    * [Редактирование своего профиля](documentation/customer/doc__user__customer.md)
4. Сценарий работы в роли Dental Technician (dentaltechn)
    * [Просмотр заказ-нарядов](documentation/technican/doc__order_and_order_price___technican.md)
    * [Работа с прайслистом](documentation/technican/doc__price_and_productcategory___technican.md)
    * [Редактирование своего профиля](documentation/technican/doc__user__technican.md)
5. Сценарий работы в роли Director[^]
6. [Сценарий работы в роли Courier](####6-script-Courier)
7. [Сценарий работы в роли None][####7-script-none]

#### 1. Сценарий авторизация пользователя

#### 2. Сценарий работы в роли Admin

#### 3. Сценарий работы в роли Customer

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