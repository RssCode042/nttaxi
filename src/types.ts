/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PricingItem {
  label: string;
  dayPrice: string;
  nightPrice: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}
