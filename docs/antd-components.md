# Используемые компоненты Ant Design

Документ описывает все компоненты Ant Design, которые используются в проекте, и зачем каждый из них нужен в рамках ТЗ.

## Глобальная конфигурация

## `ConfigProvider`

- Где: `src/app/providers/AntdProvider.tsx`
- Зачем:
  - централизованно задает theme tokens и component tokens;
  - обеспечивает единый стиль приложения (цвета, скругления, отступы, типографика);
  - убирает необходимость дублировать inline-стили в каждом компоненте.

## Layout и композиция

## `Flex`

- Где: `src/app/page.tsx`, `src/widgets/EditableTable/ui/EditableTable.tsx`
- Зачем:
  - центрирует контент по экрану;
  - выстраивает вертикальную композицию блока таблицы;
  - управляет отступами между элементами (`gap`) без ручного CSS.

## `Grid.useBreakpoint`

- Где: `src/widgets/EditableTable/ui/EditableTable.tsx`, `src/features/manage-table-row/ui/TableRowModal.tsx`
- Зачем:
  - определяет мобильный/десктопный режим по брейкпоинтам AntD;
  - переключает размер кнопок, карточки и таблицы на мобильных;
  - меняет раскладку action-кнопок (`horizontal -> vertical`) на узких экранах;
  - задает адаптивную ширину модального окна.

## `Card`

- Где: `src/widgets/EditableTable/ui/EditableTable.tsx`
- Зачем:
  - оборачивает виджет таблицы в визуально выделенный контейнер;
  - задает понятный UI-блок для пользовательского сценария (добавление/поиск/таблица).

## `Space`

- Где: `src/widgets/EditableTable/ui/EditableTable.tsx`
- Зачем:
  - дает горизонтальные отступы между кнопками в колонке `Действия`;
  - упрощает композицию нескольких action-кнопок.

## Табличный интерфейс

## `Table`

- Где: `src/widgets/EditableTable/ui/EditableTable.tsx`
- Зачем:
  - отображает строки данных (`name`, `date`, `value`);
  - реализует сортировку по типам через `sorter`;
  - поддерживает тех. идентификатор строк через `rowKey="id"`;
  - показывает пустые состояния через `locale.emptyText`;
  - на мобильных включает `scroll.x` для корректного отображения колонок.

## `Empty`

- Где: `src/widgets/EditableTable/ui/EditableTable.tsx`
- Зачем:
  - отдельный UX для пустой таблицы;
  - отдельный UX для случая “ничего не найдено” при поиске.

## `Popconfirm`

- Где: `src/widgets/EditableTable/ui/EditableTable.tsx`
- Зачем:
  - подтверждение удаления строки;
  - снижает риск случайного удаления данных.

## Ввод и действия пользователя

## `Button`

- Где: `src/widgets/EditableTable/ui/EditableTable.tsx`
- Зачем:
  - запускает ключевые действия:
    - `Добавить`,
    - `Редактировать`,
    - `Удалить`.

## `Input`

- Где: `src/features/table-search/ui/TableSearchInput.tsx`, `src/features/manage-table-row/ui/TableRowModal.tsx`
- Зачем:
  - ввод поискового запроса над таблицей;
  - ввод текстового поля `name` и даты (`type="date"`) в модалке.

## `InputNumber`

- Где: `src/features/manage-table-row/ui/TableRowModal.tsx`
- Зачем:
  - ввод числового значения `value`;
  - ограничивает тип ввода числом на уровне UI-компонента.

## Форма и модальное окно

## `Modal`

- Где: `src/features/manage-table-row/ui/TableRowModal.tsx`
- Зачем:
  - единый сценарий `add/edit` в отдельном диалоге;
  - фокусирует пользователя на редактировании данных строки.

## `Form` и `Form.Item`

- Где: `src/features/manage-table-row/ui/TableRowModal.tsx`
- Зачем:
  - структурирует поля формы;
  - показывает ошибки валидации рядом с соответствующим полем;
  - обеспечивает предсказуемый layout формы в модальном окне.
