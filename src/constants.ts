/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TAXI_NUMBERS = [
  "042 6106",
  "0888 666 106",
  "0898 666 106",
  "0878 666 106",
  "0879 666 106",
  "0895 666 106",
  "0886 666 106",
  "0887 666 106",
  "0885 666 106",
];

export const MAIN_PHONE = "042 6106";

export const RATES = {
  day: { start: 3.62, perKm: 1.66, perMin: 0.48 },
  night: { start: 3.81, perKm: 1.86, perMin: 0.59 }
};

export const EUR_RATE = 1.95583;

export const PRICING_DATA = [
  { label: "Цена за 1 км", dayPrice: "0.85 EUR / 1.66 лв.", nightPrice: "0.95 EUR / 1.86 лв." },
  { label: "Повикване", dayPrice: "-", nightPrice: "-" },
  { label: "Начална такса", dayPrice: "1.85 EUR / 3.62 лв.", nightPrice: "1.95 EUR / 3.81 лв." },
  { label: "Престой за 1 мин.", dayPrice: "0.25 EUR / 0.48 лв.", nightPrice: "0.30 EUR / 0.59 лв." },
  { label: "Престой за 1 мин.", dayPrice: "0.25 EUR / 0.48 лв.", nightPrice: "0.30 EUR / 0.59 лв." }, // Repeated in mockup table usually for another category or just same
];

export const NEWS_DATA = [
  {
    id: "1",
    date: "20 Март 2024",
    title: "Нови хибридни автомобили в нашия автопарк",
    excerpt: "Продължаваме да обновяваме нашите автомобили с цел по-зелена Стара Загора.",
  },
  {
    id: "2",
    date: "15 Февруари 2024",
    title: "Възможност за плащане с карта във всички таксита",
    excerpt: "Вече можете да плащате бързо и сигурно с вашата банкова карта или телефон.",
  },
  {
    id: "3",
    date: "10 Януари 2024",
    title: "Разширяване на услугите ни за летищни трансфери",
    excerpt: "Повече дестинации и фиксирани цени за вашето пътуване до основните летища.",
  },
];
