В процессе завдения новой сущности необходимо завести *наименование файла*.model.ts, где мы делаем полное описание модели и делаем описание полей, которые обязательны для заполнения (https://sequelize.org/master/manual/typescript.html, https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize)

```
interface OrderCreationAttrs {
  userId: number;
  orderNum: string;
  technician: string;
  executor_n1: number;
  fittingDateN1: Date;
  uploadFiles: string;
}
```
