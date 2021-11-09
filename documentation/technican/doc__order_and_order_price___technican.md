Пользователь с ролью dentaltechn (зубной-техник) заходит на сайт и видит все заказ-наряды, которые оформлены (необходимо выполнить) для выполнения:

   Дата  |  Дата сдачи |  Заказчик   | Заказ-наряд |   Доктор   |     Техник    |   Пациент   | Статус выполнения | Статус доставки 
:--------|:-----------:|:-----------:|:-----------:|:----------:|:-------------:|:-----------:|:-----------------:|:---------------:
29.10.21 | до 02.11.21 | Пащенко Э.В.| I-00000001  |   Петров   |  Макаров Е.В. | Василевский |       true        |      false      
29.10.21 |   03.11.21  | Богданов А. | A-00000001  |   Петров   |  Макаров Е.В. | Василевский |       true        |      true       
  Итог   |             |             |             |            |               |             |                   |                      

* Таблица на странице зубного-техника (исполнителя) отображается с пагинацией.
* Пользователь может производить сортировку по всем столбцам.
* Пользователь может производить фильтрацию по всем столбцам.

Все заказ-наряды отсортированы в временном порядке те, что скоро будут просрочены горят красной подсветкой и передаются спец сообщением директору или администратору. Также зубной-техник видит информацию только за одну неделю в статусе завершенные (больше ему не нужно), но незавршенные у него видны всегда.

__END POINTS FOR ORDER (CRUD)__
```
Отображение данных у dentaltechn возможна на все заказ наряды.

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
Пользователь с ролью dentaltechn может менять только статус, после того как работа выполнена (уведомление заказчика происходит спустя 10 минут для этого необходимо разработать воркер TODO: Разработать воркер для уведомления заказчика). Когда работа выполнена исполнитель меняет статус как работа выполнена, для этого и нужен UPDATE у данного пользователя удалять и добавлять он не может.

```
UPDATE

updateOrder(Input):Out

Input:
  order:{}
Out:
  boolean

```