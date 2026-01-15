# Отчет по развертыванию статического сайта

## 1. Цель работы
Целью работы было создание и развертывание собственного статического сайта на основе предоставленных материалов с использованием генератора статических сайтов на Python, а также настройка автоматического CI/CD-деплоя и исследование вариантов продакшен-деплоя и CDN.

---

## 2. Используемые технологии и инструменты

- **Язык программирования:** Python (актуальная версия)
- **Генератор статических сайтов:** MkDocs
- **Система контроля версий:** Git
- **Хостинг статического сайта:** GitHub Pages
- **CI/CD:** GitHub Actions (workflow типа *Static HTML*)
- **Среда изоляции:** virtualenv
- **Альтернативные платформы (исследование):** GitVerse, Helios

---

## 3. Подготовка окружения

### 3.1 Установка Python и pip

Проверка наличия Python и pip:

```bash
python --version
pip --version
```

При необходимости был установлен Python актуальной версии с официального сайта.

### 3.2 Установка virtualenv

```bash
pip install virtualenv
```

### 3.3 Создание и активация виртуального окружения

```bash
mkdir static-site
cd static-site
virtualenv venv
source venv/bin/activate  # Linux / macOS
venv\Scripts\activate     # Windows
```

---

## 4. Создание статического сайта с использованием MkDocs

### 4.1 Установка MkDocs

```bash
pip install mkdocs
```

### 4.2 Инициализация проекта

```bash
mkdocs new .
```

Структура проекта:

```
.
├── docs/
│   └── index.md
├── mkdocs.yml
└── venv/
```

### 4.3 Наполнение контентом

На основе материалов, предоставленных по ссылке Яндекс.Диска, был подготовлен контент и оформлен в формате Markdown в каталоге `docs/`.

Локальный запуск для проверки:

```bash
mkdocs serve
```

---

## 5. Публикация репозитория

1. Создан репозиторий на GitHub.
2. Исходный код проекта был закоммичен и отправлен в удаленный репозиторий:

```bash
git init
git add .
git commit -m "Initial MkDocs site"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

---

## 6. Настройка CI/CD и деплоя на GitHub Pages

### 6.1 GitHub Actions

В репозитории был создан workflow `.github/workflows/deploy.yml`.

Пример конфигурации:

```yaml
name: Deploy MkDocs to GitHub Pages

on:
  push:
    branches: [ "main" ]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.x'
      - run: pip install mkdocs
      - run: mkdocs build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

### 6.2 Активация GitHub Pages

- В настройках репозитория включен GitHub Pages
- Источник: ветка `gh-pages`

После выполнения workflow сайт стал доступен по адресу:

**https://<username>.github.io/<repo>/**

---

## 7. Альтернативный деплой: Helios

Был рассмотрен вариант деплоя на Helios:

- Регистрация и активация аккаунта
- Создание нового статического сервера
- Корректировка CI/CD (замена шага публикации на загрузку через SCP/rsync или API Helios)

Пример изменений в workflow:

- Добавление секретов (SSH_KEY, HOST)
- Использование `scp` для загрузки содержимого каталога `site/`

---

## 8. Исследование CDN

### 8.1 Отечественные CDN

Возможные варианты использования CDN для ускорения доставки контента:

- **Яндекс Cloud CDN** – интеграция с Object Storage и статическими сайтами
- **VK Cloud CDN** – подходит для публичных сайтов и медиаконтента
- **Selectel CDN** – поддержка HTTPS, кастомных доменов

Преимущества:

- Снижение задержек
- Кэширование контента
- Защита от DDoS

---

## 9. GitVerse и CI/CD

**GitVerse** — отечественная платформа с поддержкой:

- Git-репозиториев
- CI/CD пайплайнов
- Аналога GitHub Actions

Возможности:

- Автоматическая сборка статических сайтов
- Деплой на серверы или объектное хранилище
- Подходит для импортозамещения

---

## 10. Варианты деплоя статического сайта в продакшен

### Основные подходы:

1. **GitHub Pages / GitVerse Pages**
   - Минимальная настройка
   - Бесплатно

2. **Объектное хранилище + CDN**
   - Яндекс Object Storage + CDN
   - AWS S3 + CloudFront

3. **VPS / собственный сервер**
   - Nginx / Caddy
   - rsync / Docker

4. **PaaS-платформы**
   - Netlify
   - Vercel

### Необходимые инструменты:

- CI/CD (GitHub Actions, GitVerse CI)
- SSH / API-токены
- Web-сервер (Nginx)
- CDN

---

## 11. Результат работы

- Статический сайт успешно создан с использованием MkDocs
- Настроен автоматический деплой через CI/CD
- Сайт доступен в сети
- Проведено исследование вариантов хостинга, CDN и CI/CD

**Ссылка на сайт:** https://<username>.github.io/<repo>/

---

## 12. Выводы

В ходе работы был освоен полный цикл создания и публикации статического сайта: от локальной разработки до продакшен-деплоя с автоматизацией. Полученные знания применимы для документации, лендингов и технических проектов.

