# Editable Table

Интерактивная таблица с CRUD, поиском и сортировкой на `Next.js + TypeScript + Ant Design`.

## Что реализовано

- Таблица с колонками:
  - `Имя`
  - `Дата`
  - `Числовое значение`
  - `Действия`
- Добавление строки через модальное окно.
- Редактирование строки через модальное окно с предзаполнением.
- Удаление строки из таблицы (с подтверждением).
- Валидация полей формы:
  - `name` — обязательно, не только пробелы
  - `date` — обязательно, корректная дата
  - `value` — обязательно, число
- Поиск по всем ячейкам (`name`, `date`, `value`), без учета регистра.
- Сортировка всех колонок по типам данных:
  - имя — строковая locale-aware
  - дата — по timestamp
  - число — числовая
- Корректная совместная работа поиска и сортировки.
- FSD-структура (`entities`, `features`, `widgets`) и публичные API через `index.ts`.
- Централизованная тема Ant Design через `ConfigProvider`.
- Адаптив под мобильные устройства на базе `Ant Design Grid.useBreakpoint`:
  - компактные размеры компонентов на мобильных;
  - вертикальные action-кнопки в колонке `Действия`;
  - горизонтальный скролл таблицы на узких экранах;
  - адаптивная ширина модального окна.

## Стек

- `Next.js` (App Router)
- `React`
- `TypeScript`
- `Ant Design`
- `ESLint`
- `pnpm`

## Архитектура (FSD)

```text
src/
  app/
    layout.tsx
    page.tsx
    providers/
      AntdProvider.tsx
  widgets/
    EditableTable/
      ui/
        EditableTable.tsx
      index.ts
  features/
    manage-table-row/
      ui/
        TableRowModal.tsx
      model/
        use-manage-table-row.ts
      index.ts
    table-search/
      ui/
        TableSearchInput.tsx
      model/
        use-table-search.ts
      lib/
        filter-rows.ts
      index.ts
  entities/
    table-row/
      model/
        types.ts
        validation.ts
      lib/
        comparators.ts
        formatters.ts
      index.ts
  shared/
    lib/
      date/
      number/
      string/
```

## Запуск проекта

```bash
pnpm install
pnpm dev
```

Приложение будет доступно по адресу: `http://localhost:3000`.

## Проверка качества

```bash
pnpm lint
pnpm build
```

## Сценарии для ручной проверки

- Добавление новой строки.
- Редактирование существующей строки.
- Удаление строки.
- Поиск по имени, дате и числовому значению.
- Сортировка по каждой колонке (`asc/desc`).
- Совместная работа поиска и сортировки.

## Документация

- Компоненты Ant Design и их назначение:
  - `docs/antd-components.md`

## Деплой

- Production URL: `https://evgeniyelisov.github.io/EditableTable/`
