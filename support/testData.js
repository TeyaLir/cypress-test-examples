// Базовые URL для тестового окружения
export const BASE_URLS = {
  APP: 'https://demo-test-app.example.com',
  API_GATEWAY: 'https://api-demo.example.com',
  MAIL_SERVICE: 'https://mail-service-demo.example.com'
}

// Тестовые пользователи
export const TEST_USERS = {
  STANDARD: {
    login: 'test_user',
    password: 'test_password_123',
    email: 'test.user@example.com',
    newPassword: 'new_test_password_123'
  },
  ADMIN: {
    login: 'admin_user',
    password: 'admin_password_123',
    email: 'admin@example.com'
  }
}

// Пароли для тестирования
export const PASSWORDS = {
  VALID: 'TestPassword123!',
  WEAK: '12345678',
  INVALID: 'inval'
}

// Таймауты
export const TIMEOUTS = {
  EMAIL_DELIVERY: 10000,
  PAGE_LOAD: 5000,
  API_REQUEST: 10000
}

// Тексты для проверок
export const UI_TEXTS = {
  RESTORE_SUCCESS: 'На вашу почту отправлена ссылка на форму смены пароля',
  PASSWORD_CHANGED: 'Пароль успешно изменен!',
  PASSWORD_REQUIREMENTS: 'Пароль не соответствует следующим требованиям:',
  SELECT_APP: 'Выберите приложение',
  SELECT_DEPARTMENT: 'Выберите подразделение'
}

// Названия приложений и подразделений для демо
export const APP_NAMES = {
  CRM: 'Демо приложение CRM',
  REPORTING: 'Система отчетности',
  INVENTORY: 'Учет товаров'
}

export const DEPARTMENTS = {
  QA: 'Отдел тестирования',
  DEVELOPMENT: 'Отдел разработки',
  SUPPORT: 'Техническая поддержка'
}