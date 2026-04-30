import React, { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Coffee,
  Sun,
  Moon,
  Apple,
  X,
  Target,
  Settings,
  Flame,
  Wheat,
  Beef,
  Droplet,
  User,
  Edit3,
  Loader2,
  Save,
  Utensils,
  BarChart3,
  TrendingUp,
  GlassWater,
  ChevronDown,
  UserPlus,
  RotateCcw,
  Clock,
  BedDouble,
  Ruler,
  Weight,
  Scale,
  Percent,
  Bike,
  History,
  ShoppingCart,
  Refrigerator,
  CheckCircle2,
  Circle,
  ArrowRightLeft,
  ChefHat,
  PlusCircle,
  Calendar,
  // ✅ 正確狀態：
  ChevronLeft, // 👈 新增：向左翻頁箭頭
  ChevronRight, // 👈 新增：向右翻頁箭頭
  Dumbbell,
  BookOpen, // 👈 新增：書本圖示
  TrendingDown, // 👈 新增：下降趨勢圖示
  PieChart, // 👈 新增：圓餅圖圖示
} from 'lucide-react';

// 🍎 終極百大食材庫：全分類史詩級大擴充
// 💡 邏輯：單位是 g/ml 時，為「每 100g/ml」的數值；單位是 顆/片/杯/份/碗/個/條/籠/盤 時，為「每 1 單位」的數值
const FOOD_CATEGORIES = [
  '全部',
  '主食',
  '肉類',
  '蛋豆',
  '蔬菜',
  '水果',
  '飲料',
  '油脂',
  '外食/夜市',
  '麥當勞',
  '港式麵包', // 🌟 新增分頁
  '乳酪', // 🌟 新增分頁
  '港式小食',
  '各式粉麵', // 🌟 新增
  '中式包點', // 🌟 新增
  '碟頭飯', // 🌟 新增
  '壽司郎', // 🌟 新增
  'Dough Bros', // 🌟 新增
  '茶餐廳早餐', // 🌟 新增
  '港式點心', // 🌟 新增
  '超市方包', // 🌟 新增
  '動物內臟', // 🌟 新增
  '八方雲集', // 🌟 新增
  '7-Eleven', // 🌟 新增
  '華御結', // 🌟 新增
  'IKEA', // 🌟 新增
  'Mos Burger', // 🌟 新增
  'Mister Donut', // 🌟 新增：Mister Donut 專屬分頁
];

const FOOD_DATABASE = [
  // === 🍚 主食類 (Staples) ===
  {
    name: '白飯',
    category: '主食',
    defaultAmount: 150,
    unit: 'g',
    calories: 183,
    protein: 4,
    carbs: 41,
    fat: 0.4,
    approx: '約 1 平碗',
  },
  {
    name: '糙米飯',
    category: '主食',
    defaultAmount: 150,
    unit: 'g',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    approx: '約 1 平碗',
  },
  {
    name: '紫米飯',
    category: '主食',
    defaultAmount: 150,
    unit: 'g',
    calories: 150,
    protein: 4,
    carbs: 32,
    fat: 1,
    approx: '約 1 平碗',
  },
  {
    name: '燕麥片 (乾)',
    category: '主食',
    defaultAmount: 50,
    unit: 'g',
    calories: 379,
    protein: 13,
    carbs: 67,
    fat: 6.9,
    approx: '約 4-5 免洗湯匙',
  },
  {
    name: '地瓜 (烤/蒸)',
    category: '主食',
    defaultAmount: 150,
    unit: 'g',
    calories: 114,
    protein: 1.5,
    carbs: 27.8,
    fat: 0.2,
    approx: '約 1 個中型拳頭大',
  },
  {
    name: '馬鈴薯 (水煮)',
    category: '主食',
    defaultAmount: 100,
    unit: 'g',
    calories: 86,
    protein: 2,
    carbs: 20,
    fat: 0.1,
    approx: '約半個拳頭大',
  },
  {
    name: '南瓜',
    category: '主食',
    defaultAmount: 100,
    unit: 'g',
    calories: 49,
    protein: 1.7,
    carbs: 12,
    fat: 0.2,
    approx: '約 1 小塊',
  },
  {
    name: '玉米 (甜)',
    category: '主食',
    defaultAmount: 100,
    unit: 'g',
    calories: 107,
    protein: 3.3,
    carbs: 23.6,
    fat: 1.2,
    approx: '約半根',
  },
  {
    name: '白吐司',
    category: '主食',
    defaultAmount: 1,
    unit: '片',
    calories: 140,
    protein: 4.5,
    carbs: 26,
    fat: 2,
    approx: '一般厚度 1 片',
  },
  {
    name: '全麥吐司',
    category: '主食',
    defaultAmount: 1,
    unit: '片',
    calories: 120,
    protein: 5,
    carbs: 22,
    fat: 1.5,
    approx: '一般厚度 1 片',
  },
  {
    name: '烏龍麵',
    category: '主食',
    defaultAmount: 200,
    unit: 'g',
    calories: 125,
    protein: 3,
    carbs: 28,
    fat: 0.5,
    approx: '約 1 飯碗量',
  },
  {
    name: '義大利麵 (熟)',
    category: '主食',
    defaultAmount: 150,
    unit: 'g',
    calories: 158,
    protein: 5.8,
    carbs: 31,
    fat: 0.9,
    approx: '約餐廳份量的一半',
  },
  {
    name: '水餃 (豬肉高麗菜)',
    category: '主食',
    defaultAmount: 10,
    unit: '顆',
    calories: 550,
    protein: 20,
    carbs: 50,
    fat: 28,
    approx: '約 1 盤',
  },

  // === 🥩 肉類 (Meats) ===
  {
    name: '雞胸肉 (生)',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 104,
    protein: 23,
    carbs: 0,
    fat: 1.5,
    approx: '約半個手掌大 (不含手指)',
  },
  {
    name: '雞腿肉 (去皮去骨)',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 150,
    protein: 19,
    carbs: 0,
    fat: 8,
    approx: '約半塊雞腿排',
  },
  {
    name: '雞三節翅',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 210,
    protein: 18,
    carbs: 0,
    fat: 15,
    approx: '約 2 支',
  },
  {
    name: '豬里肌',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 143,
    protein: 22,
    carbs: 0,
    fat: 6,
    approx: '約半個手掌大',
  },
  {
    name: '豬五花',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 360,
    protein: 14,
    carbs: 0,
    fat: 33,
    approx: '約 5-6 片火鍋肉片',
  },
  {
    name: '梅花豬',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 207,
    protein: 18,
    carbs: 0,
    fat: 14,
    approx: '約 4-5 片火鍋肉片',
  },
  {
    name: '板腱牛排',
    category: '肉類',
    defaultAmount: 150,
    unit: 'g',
    calories: 166,
    protein: 20,
    carbs: 0,
    fat: 8.5,
    approx: '約 1 個女性手掌大',
  },
  {
    name: '牛五花片',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 330,
    protein: 15,
    carbs: 0,
    fat: 29,
    approx: '約 5-6 片火鍋肉片',
  },
  {
    name: '牛腱',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 125,
    protein: 26,
    carbs: 0,
    fat: 2.3,
    approx: '約 4-5 片薄切',
  },
  {
    name: '鮭魚片',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    approx: '約半個手掌大',
  },
  {
    name: '鯛魚片',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 100,
    protein: 20,
    carbs: 0,
    fat: 2,
    approx: '約半個手掌大',
  },
  {
    name: '秋刀魚',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 314,
    protein: 18,
    carbs: 0,
    fat: 26,
    approx: '約 1 尾中型',
  },
  {
    name: '蝦仁',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 100,
    protein: 21,
    carbs: 0,
    fat: 1,
    approx: '約 8-10 隻中型蝦仁',
  },
  {
    name: '透抽/軟絲',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 60,
    protein: 13,
    carbs: 1,
    fat: 0.5,
    approx: '約半隻',
  },
  {
    name: '蛤蜊',
    category: '肉類',
    defaultAmount: 100,
    unit: 'g',
    calories: 45,
    protein: 7,
    carbs: 2,
    fat: 1,
    approx: '約 15-20 顆 (純肉重)',
  },

  // === 🥚 蛋豆類 (Eggs & Beans) ===
  {
    name: '水煮蛋',
    category: '蛋豆',
    defaultAmount: 1,
    unit: '顆',
    calories: 72,
    protein: 6.3,
    carbs: 0.4,
    fat: 4.8,
    approx: '標準雞蛋大小',
  },
  {
    name: '荷包蛋 (油煎)',
    category: '蛋豆',
    defaultAmount: 1,
    unit: '顆',
    calories: 110,
    protein: 6.5,
    carbs: 0.5,
    fat: 9,
    approx: '一般早餐店份量',
  },
  {
    name: '茶葉蛋',
    category: '蛋豆',
    defaultAmount: 1,
    unit: '顆',
    calories: 75,
    protein: 6.5,
    carbs: 1.5,
    fat: 5,
    approx: '超商茶葉蛋 1 顆',
  },
  {
    name: '蒸蛋',
    category: '蛋豆',
    defaultAmount: 1,
    unit: '碗',
    calories: 140,
    protein: 12,
    carbs: 2,
    fat: 9,
    approx: '約 1 小飯碗',
  },
  {
    name: '嫩豆腐',
    category: '蛋豆',
    defaultAmount: 150,
    unit: 'g',
    calories: 50,
    protein: 4.9,
    carbs: 2,
    fat: 2.5,
    approx: '約半盒超商盒裝豆腐',
  },
  {
    name: '傳統豆腐 (板豆腐)',
    category: '蛋豆',
    defaultAmount: 100,
    unit: 'g',
    calories: 88,
    protein: 8.5,
    carbs: 2.5,
    fat: 5,
    approx: '約 3 小塊',
  },
  {
    name: '生豆包/鮮豆皮',
    category: '蛋豆',
    defaultAmount: 100,
    unit: 'g',
    calories: 200,
    protein: 18,
    carbs: 5,
    fat: 12,
    approx: '約 2 大片',
  },
  {
    name: '炸豆皮',
    category: '蛋豆',
    defaultAmount: 100,
    unit: 'g',
    calories: 388,
    protein: 16,
    carbs: 9,
    fat: 32,
    approx: '約 2 大片',
  },
  {
    name: '無糖豆漿',
    category: '蛋豆',
    defaultAmount: 400,
    unit: 'ml',
    calories: 35,
    protein: 3.6,
    carbs: 0.7,
    fat: 1.9,
    approx: '約超商新鮮屋大紙盒',
  },
  {
    name: '毛豆仁',
    category: '蛋豆',
    defaultAmount: 50,
    unit: 'g',
    calories: 116,
    protein: 11.5,
    carbs: 9.5,
    fat: 5,
    approx: '約 1 把',
  },
  {
    name: '鷹嘴豆 (熟)',
    category: '蛋豆',
    defaultAmount: 100,
    unit: 'g',
    calories: 164,
    protein: 9,
    carbs: 27,
    fat: 2.6,
    approx: '約半碗',
  },

  // === 🥬 蔬菜類 (Vegetables) ===
  // 💡 蔬菜類統一標註「煮熟後」的視覺份量，對使用者最友善
  {
    name: '高麗菜 (燙)',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 25,
    protein: 1.3,
    carbs: 5.8,
    fat: 0.1,
    approx: '煮熟約半碗',
  },
  {
    name: '青花菜 (西蘭花)',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 28,
    protein: 2.8,
    carbs: 5.3,
    fat: 0.3,
    approx: '煮熟約半碗',
  },
  {
    name: '菠菜',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    approx: '煮熟約半碗',
  },
  {
    name: '空心菜',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 24,
    protein: 2.5,
    carbs: 4.5,
    fat: 0.2,
    approx: '煮熟約半碗',
  },
  {
    name: '地瓜葉',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 28,
    protein: 3.2,
    carbs: 4.5,
    fat: 0.3,
    approx: '煮熟約半碗',
  },
  {
    name: '青江菜',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 15,
    protein: 1.5,
    carbs: 2.5,
    fat: 0.2,
    approx: '煮熟約半碗',
  },
  {
    name: '小白菜',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 13,
    protein: 1.3,
    carbs: 2.2,
    fat: 0.2,
    approx: '煮熟約半碗',
  },
  {
    name: '大陸妹 (生菜)',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 13,
    protein: 1.2,
    carbs: 2.5,
    fat: 0.2,
    approx: '煮熟約半碗',
  },
  {
    name: '小黃瓜',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 15,
    protein: 1,
    carbs: 3,
    fat: 0.1,
    approx: '約 1 根',
  },
  {
    name: '洋蔥',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 40,
    protein: 1.1,
    carbs: 9.3,
    fat: 0.1,
    approx: '約半顆',
  },
  {
    name: '番茄 (大)',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2,
    approx: '約 1 顆中型',
  },
  {
    name: '苦瓜',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 19,
    protein: 1,
    carbs: 4.3,
    fat: 0.1,
    approx: '煮熟約半碗',
  },
  {
    name: '茄子',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 25,
    protein: 1.1,
    carbs: 5.8,
    fat: 0.2,
    approx: '煮熟約半碗',
  },
  {
    name: '紅蘿蔔',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2,
    approx: '煮熟約半碗',
  },
  {
    name: '白蘿蔔',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 18,
    protein: 0.6,
    carbs: 4.1,
    fat: 0.1,
    approx: '煮熟約半碗',
  },
  {
    name: '秋葵',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 33,
    protein: 1.9,
    carbs: 7.5,
    fat: 0.2,
    approx: '約 8-10 根',
  },
  {
    name: '蘆筍',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 20,
    protein: 2.2,
    carbs: 3.9,
    fat: 0.1,
    approx: '約 8-10 根',
  },
  {
    name: '金針菇',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 37,
    protein: 2.6,
    carbs: 7.8,
    fat: 0.3,
    approx: '煮熟約半碗',
  },
  {
    name: '香菇 (鮮)',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 35,
    protein: 3,
    carbs: 5,
    fat: 0.4,
    approx: '煮熟約半碗',
  },
  {
    name: '杏鮑菇',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 33,
    protein: 3,
    carbs: 6,
    fat: 0.1,
    approx: '煮熟約半碗',
  },
  {
    name: '黑木耳',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 24,
    protein: 1,
    carbs: 5,
    fat: 0.1,
    approx: '煮熟約半碗',
  },
  {
    name: '玉米筍',
    category: '蔬菜',
    defaultAmount: 100,
    unit: 'g',
    calories: 26,
    protein: 2.2,
    carbs: 5,
    fat: 0.4,
    approx: '約 8-10 根',
  },
  {
    name: '綜合生菜沙拉',
    category: '蔬菜',
    defaultAmount: 1,
    unit: '份',
    calories: 40,
    protein: 2,
    carbs: 8,
    fat: 0.5,
    approx: '約 1 大餐盤',
  },

  // === 🍎 水果類 (Fruits) ===
  {
    name: '蘋果',
    category: '水果',
    defaultAmount: 1,
    unit: '顆',
    calories: 75,
    protein: 0.4,
    carbs: 19,
    fat: 0.2,
    approx: '約 1 個拳頭大',
  },
  {
    name: '香蕉',
    category: '水果',
    defaultAmount: 1,
    unit: '根',
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    approx: '約 1 根中型',
  },
  {
    name: '芭樂',
    category: '水果',
    defaultAmount: 1,
    unit: '顆',
    calories: 120,
    protein: 4.5,
    carbs: 25,
    fat: 0.3,
    approx: '約 1 個拳頭大',
  },
  {
    name: '奇異果',
    category: '水果',
    defaultAmount: 1,
    unit: '顆',
    calories: 42,
    protein: 0.8,
    carbs: 10,
    fat: 0.4,
    approx: '標準大小 1 顆',
  },
  {
    name: '小番茄',
    category: '水果',
    defaultAmount: 10,
    unit: '顆',
    calories: 30,
    protein: 1,
    carbs: 7,
    fat: 0,
    approx: '約 1 把',
  },
  {
    name: '西瓜',
    category: '水果',
    defaultAmount: 200,
    unit: 'g',
    calories: 30,
    protein: 0.6,
    carbs: 8,
    fat: 0.1,
    approx: '切塊約 1 平碗',
  },
  {
    name: '木瓜',
    category: '水果',
    defaultAmount: 200,
    unit: 'g',
    calories: 38,
    protein: 0.6,
    carbs: 10,
    fat: 0.1,
    approx: '切塊約 1 平碗',
  },
  {
    name: '葡萄',
    category: '水果',
    defaultAmount: 10,
    unit: '顆',
    calories: 50,
    protein: 0.5,
    carbs: 13,
    fat: 0.2,
    approx: '約半碗',
  },
  {
    name: '柳丁/橘子',
    category: '水果',
    defaultAmount: 1,
    unit: '顆',
    calories: 60,
    protein: 1,
    carbs: 15,
    fat: 0.2,
    approx: '約 1 個小拳頭大',
  },
  {
    name: '鳳梨',
    category: '水果',
    defaultAmount: 150,
    unit: 'g',
    calories: 50,
    protein: 0.5,
    carbs: 13,
    fat: 0.1,
    approx: '切塊約 1 平碗',
  },
  {
    name: '火龍果',
    category: '水果',
    defaultAmount: 200,
    unit: 'g',
    calories: 50,
    protein: 1,
    carbs: 12,
    fat: 0.2,
    approx: '切塊約 1 平碗',
  },
  {
    name: '芒果',
    category: '水果',
    defaultAmount: 150,
    unit: 'g',
    calories: 60,
    protein: 0.6,
    carbs: 15,
    fat: 0.3,
    approx: '切塊約 1 平碗',
  },
  {
    name: '草莓',
    category: '水果',
    defaultAmount: 5,
    unit: '顆',
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3,
    approx: '約半碗',
  },
  {
    name: '藍莓',
    category: '水果',
    defaultAmount: 50,
    unit: 'g',
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3,
    approx: '約 1 小把',
  },
  {
    name: '哈密瓜',
    category: '水果',
    defaultAmount: 200,
    unit: 'g',
    calories: 34,
    protein: 0.8,
    carbs: 8,
    fat: 0.2,
    approx: '切塊約 1 平碗',
  },

  // === 🥑 油脂類 (Fats) ===
  {
    name: '酪梨',
    category: '油脂',
    defaultAmount: 100,
    unit: 'g',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    approx: '約半顆',
  },
  {
    name: '綜合堅果',
    category: '油脂',
    defaultAmount: 30,
    unit: 'g',
    calories: 180,
    protein: 5,
    carbs: 6,
    fat: 16,
    approx: '約 1 掌心平鋪量',
  },
  {
    name: '橄欖油',
    category: '油脂',
    defaultAmount: 10,
    unit: 'ml',
    calories: 88,
    protein: 0,
    carbs: 0,
    fat: 10,
    approx: '約 1 免洗湯匙',
  },
  {
    name: '麻油/香油',
    category: '油脂',
    defaultAmount: 10,
    unit: 'ml',
    calories: 88,
    protein: 0,
    carbs: 0,
    fat: 10,
    approx: '約 1 免洗湯匙',
  },
  {
    name: '花生醬 (含糖)',
    category: '油脂',
    defaultAmount: 15,
    unit: 'g',
    calories: 95,
    protein: 3.5,
    carbs: 4,
    fat: 8,
    approx: '約 1 抹醬湯匙',
  },
  {
    name: '奶油 (Butter)',
    category: '油脂',
    defaultAmount: 10,
    unit: 'g',
    calories: 72,
    protein: 0.1,
    carbs: 0,
    fat: 8.1,
    approx: '約 1 小包裝 (飯店早餐那種)',
  },

  // === 🥤 飲料類 (Drinks) ===
  {
    name: '全脂牛奶',
    category: '飲料',
    defaultAmount: 250,
    unit: 'ml',
    calories: 63,
    protein: 3.1,
    carbs: 4.8,
    fat: 3.6,
    approx: '約 1 馬克杯',
  },
  {
    name: '低脂牛奶',
    category: '飲料',
    defaultAmount: 250,
    unit: 'ml',
    calories: 43,
    protein: 3.1,
    carbs: 4.8,
    fat: 1.5,
    approx: '約 1 馬克杯',
  },
  {
    name: '黑咖啡 (無糖)',
    category: '飲料',
    defaultAmount: 1,
    unit: '杯',
    calories: 5,
    protein: 0.3,
    carbs: 0,
    fat: 0,
    approx: '中杯約 360ml',
  },
  {
    name: '拿鐵 (無糖/全脂)',
    category: '飲料',
    defaultAmount: 1,
    unit: '杯',
    calories: 150,
    protein: 8,
    carbs: 12,
    fat: 7,
    approx: '中杯約 360ml',
  },
  {
    name: '美式紅茶/綠茶 (無糖)',
    category: '飲料',
    defaultAmount: 1,
    unit: '杯',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '中杯約 360ml',
  },
  {
    name: '珍珠奶茶 (全糖)',
    category: '飲料',
    defaultAmount: 1,
    unit: '杯',
    calories: 650,
    protein: 4,
    carbs: 120,
    fat: 18,
    approx: '大杯手搖飲',
  },
  {
    name: '可樂/雪碧',
    category: '飲料',
    defaultAmount: 330,
    unit: 'ml',
    calories: 140,
    protein: 0,
    carbs: 35,
    fat: 0,
    approx: '約 1 易開罐',
  },
  {
    name: '燕麥奶',
    category: '飲料',
    defaultAmount: 250,
    unit: 'ml',
    calories: 120,
    protein: 2,
    carbs: 16,
    fat: 5,
    approx: '約 1 馬克杯',
  },

  // === 🥡 外食/夜市 (Street Food) ===
  {
    name: '炸雞排',
    category: '外食/夜市',
    defaultAmount: 1,
    unit: '片',
    calories: 650,
    protein: 35,
    carbs: 30,
    fat: 42,
    approx: '1 片不切',
  },
  {
    name: '滷肉飯 (小)',
    category: '外食/夜市',
    defaultAmount: 1,
    unit: '碗',
    calories: 450,
    protein: 10,
    carbs: 55,
    fat: 20,
    approx: '一般小吃店小碗',
  },
  {
    name: '蚵仔煎',
    category: '外食/夜市',
    defaultAmount: 1,
    unit: '份',
    calories: 520,
    protein: 15,
    carbs: 55,
    fat: 25,
    approx: '夜市標準 1 盤',
  },
  {
    name: '臭豆腐 (炸)',
    category: '外食/夜市',
    defaultAmount: 1,
    unit: '份',
    calories: 550,
    protein: 16,
    carbs: 30,
    fat: 38,
    approx: '約 4-5 大塊 (含泡菜)',
  },
  {
    name: '大腸包小腸',
    category: '外食/夜市',
    defaultAmount: 1,
    unit: '份',
    calories: 580,
    protein: 18,
    carbs: 50,
    fat: 35,
    approx: '1 組標準大小',
  },
  {
    name: '牛肉麵',
    category: '外食/夜市',
    defaultAmount: 1,
    unit: '碗',
    calories: 750,
    protein: 35,
    carbs: 80,
    fat: 25,
    approx: '一般小吃店大碗',
  },
  {
    name: '鹽酥雞',
    category: '外食/夜市',
    defaultAmount: 100,
    unit: 'g',
    calories: 320,
    protein: 15,
    carbs: 18,
    fat: 20,
    approx: '約小份紙袋',
  },
  {
    name: '地瓜球',
    category: '外食/夜市',
    defaultAmount: 10,
    unit: '顆',
    calories: 400,
    protein: 2,
    carbs: 60,
    fat: 18,
    approx: '約小包份量',
  },

  // === 🍟 麥當勞 (McDonald's) ===
  {
    name: '大麥克',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '個',
    calories: 530,
    protein: 26,
    carbs: 44,
    fat: 27,
    approx: '單點 1 個',
  },
  {
    name: '勁辣鷄腿堡',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '個',
    calories: 500,
    protein: 20,
    carbs: 45,
    fat: 26,
    approx: '單點 1 個',
  },
  {
    name: '麥香魚',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '個',
    calories: 330,
    protein: 15,
    carbs: 38,
    fat: 13,
    approx: '單點 1 個',
  },
  {
    name: '麥克鷄塊 (6塊)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 270,
    protein: 13,
    carbs: 16,
    fat: 17,
    approx: '1 盒 (不含沾醬)',
  },
  {
    name: '薯條 (中)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 350,
    protein: 4,
    carbs: 45,
    fat: 17,
    approx: '中薯 1 包',
  },
  {
    name: '豬肉滿福堡加蛋',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '個',
    calories: 390,
    protein: 21,
    carbs: 27,
    fat: 22,
    approx: '早餐時段 1 個',
  },
  {
    name: '蘋果派',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '個',
    calories: 240,
    protein: 2,
    carbs: 30,
    fat: 12,
    approx: '單點 1 個',
  },
  // === 🥐 港式麵包 (獨立分頁版) ===
  {
    name: '肉鬆包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 294,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '294 kcal',
  },
  {
    name: '叉燒包 (港式)',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 210,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '210 kcal',
  },
  {
    name: '菠蘿包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 287,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '287 kcal',
  },
  {
    name: '椰絲奶油包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 390,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '390 kcal',
  },
  {
    name: '餐肉包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 336,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '336 kcal',
  },
  {
    name: '腸仔包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 288,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '288 kcal',
  },
  {
    name: '吞拿魚包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 319,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '319 kcal',
  },
  {
    name: '紙包蛋糕',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 238,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '238 kcal',
  },
  {
    name: '丹麥條',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '條',
    calories: 426,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '426 kcal',
  },
  {
    name: '麻薯波波',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '粒',
    calories: 75,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '75 kcal',
  },
  {
    name: '雞尾包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 360,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '360 kcal',
  },
  {
    name: '豬仔包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 215,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '215 kcal',
  },
  {
    name: '白麵包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '片',
    calories: 118,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '118 kcal',
  },
  {
    name: '麥包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '片',
    calories: 124,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '124 kcal',
  },
  {
    name: '甜餐包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 261,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '261 kcal',
  },
  {
    name: '提子麥包',
    category: '港式麵包',
    defaultAmount: 1,
    unit: '個',
    calories: 211,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '211 kcal',
  },
  // === 🥣 乳酪推介系列 (獨立分頁版) ===
  // 脫脂系列
  {
    name: 'Cheer 0%脂肪天然乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 48,
    protein: 5.5,
    carbs: 6,
    fat: 0,
    approx: '1杯/包',
  },
  {
    name: 'Authentic 脫脂希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 78,
    protein: 12.5,
    carbs: 6.1,
    fat: 0.3,
    approx: '1杯/包',
  },
  {
    name: 'Mevgal 零脂肪希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 81,
    protein: 12.6,
    carbs: 7.5,
    fat: 0,
    approx: '1杯/包',
  },
  {
    name: 'Farmers Union 希臘式乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 76,
    protein: 10.3,
    carbs: 7.8,
    fat: 0.4,
    approx: '1份(125g)',
  },
  {
    name: 'Athina 脫脂希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 89,
    protein: 12.7,
    carbs: 7.8,
    fat: 0.7,
    approx: '1杯/包',
  },
  {
    name: 'Pastoret 原味脫脂工藝乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 58,
    protein: 6.8,
    carbs: 7.2,
    fat: 0.1,
    approx: '1杯/包',
  },
  {
    name: 'M&S 希臘式零脂肪乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 84,
    protein: 12.5,
    carbs: 7.3,
    fat: 0.6,
    approx: '1杯/包',
  },
  {
    name: 'Yeo Valley 有機脫脂希臘式乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 68,
    protein: 9.5,
    carbs: 6.8,
    fat: 0,
    approx: '1份(125g)',
  },
  {
    name: 'Yeo Valley 天然脫脂乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 70,
    protein: 7.4,
    carbs: 8.3,
    fat: 0.6,
    approx: '1份(125g)',
  },

  // 低脂系列
  {
    name: 'Meiji 低脂原味乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 85,
    protein: 5.3,
    carbs: 10.1,
    fat: 2.6,
    approx: '1杯/包',
  },
  {
    name: 'Emmi 低脂原味乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 84,
    protein: 7.5,
    carbs: 7.5,
    fat: 2,
    approx: '1杯/包',
  },
  {
    name: 'M&S 低脂原味乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 81,
    protein: 6.75,
    carbs: 8.6,
    fat: 2,
    approx: '1份(125g)',
  },
  {
    name: 'Chobani 低脂希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 58,
    protein: 9.7,
    carbs: 4.2,
    fat: 0.2,
    approx: '1杯/包',
  },

  // 低脂高蛋白系列
  {
    name: "Siggi's 脫脂原味冰島乳酪",
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 90,
    protein: 16,
    carbs: 6,
    fat: 0,
    approx: '1杯/包',
  },
  {
    name: 'Arla 脫脂藍莓味乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 144,
    protein: 20,
    carbs: 13,
    fat: 1,
    approx: '1杯/包',
  },
  {
    name: 'Fage 零脂肪希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 81,
    protein: 15.5,
    carbs: 4.5,
    fat: 0,
    approx: '1杯/包',
  },
  {
    name: 'Chobani 脫脂原味希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 80,
    protein: 14,
    carbs: 5,
    fat: 0.3,
    approx: '1杯/包',
  },
  {
    name: 'Kolios 0%脂肪高蛋白希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 118,
    protein: 20,
    carbs: 9.6,
    fat: 0,
    approx: '1杯/包',
  },
  {
    name: 'Emmi 希臘式零脂肪乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 84,
    protein: 15,
    carbs: 6,
    fat: 0,
    approx: '1杯/包',
  },

  // 飲品/水果系列
  {
    name: 'Chobani Fit 鹽味焦糖乳酪飲',
    category: '乳酪',
    defaultAmount: 1,
    unit: '包',
    calories: 79,
    protein: 12.7,
    carbs: 6,
    fat: 0.3,
    approx: '1包',
  },
  {
    name: 'Chobani Fit 士多啤梨乳酪飲',
    category: '乳酪',
    defaultAmount: 1,
    unit: '包',
    calories: 80,
    protein: 12.9,
    carbs: 6.1,
    fat: 0.3,
    approx: '1包',
  },
  {
    name: 'Chobani Fit 雲呢拿乳酪飲',
    category: '乳酪',
    defaultAmount: 1,
    unit: '包',
    calories: 79,
    protein: 12.7,
    carbs: 6.1,
    fat: 0.3,
    approx: '1包',
  },
  {
    name: 'Meiji 零脂肪西梅味乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 72,
    protein: 4.6,
    carbs: 12.5,
    fat: 0.4,
    approx: '1杯/包',
  },
  {
    name: 'M&S 零脂肪士多啤梨乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 80,
    protein: 8.8,
    carbs: 10.5,
    fat: 0.3,
    approx: '1杯/包',
  },
  {
    name: 'Chobani 零糖士多啤梨乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 60,
    protein: 10.9,
    carbs: 4.9,
    fat: 0,
    approx: '1杯/包',
  },
  {
    name: 'Elle & Vire 0.1%青蘋果乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 53,
    protein: 4,
    carbs: 6.3,
    fat: 0.1,
    approx: '1杯/包',
  },

  // 原味系列 (增磅及發育期適用)
  {
    name: 'Fage 5% 脂肪希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 140,
    protein: 13.5,
    carbs: 4.5,
    fat: 7.5,
    approx: '1杯/包',
  },
  {
    name: 'Athina 有機原味希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 192,
    protein: 8.4,
    carbs: 6,
    fat: 15,
    approx: '1杯/包',
  },
  {
    name: 'Athina 原味希臘乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 192,
    protein: 8.4,
    carbs: 6,
    fat: 15,
    approx: '1杯/包',
  },
  {
    name: 'Pastoret 天然原味乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 91,
    protein: 6,
    carbs: 6.8,
    fat: 4.3,
    approx: '1杯/包',
  },
  {
    name: 'Emmi 特級希臘式乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 132,
    protein: 13.5,
    carbs: 6,
    fat: 6,
    approx: '1杯/包',
  },
  {
    name: '雀巢希臘式乳酪',
    category: '乳酪',
    defaultAmount: 1,
    unit: '杯',
    calories: 123,
    protein: 3.3,
    carbs: 4.9,
    fat: 10,
    approx: '1杯/包',
  },
  // === 🍢 港式小食 (獨立分頁版) ===
  {
    name: '司華力腸',
    category: '港式小食',
    defaultAmount: 1,
    unit: '條',
    calories: 355,
    protein: 14.2,
    carbs: 3.3,
    fat: 31.5,
    approx: '一條',
  },
  {
    name: '燒賣 (街頭)',
    category: '港式小食',
    defaultAmount: 1,
    unit: '粒',
    calories: 50,
    protein: 1,
    carbs: 6,
    fat: 2.7,
    approx: '一粒',
  },
  {
    name: '咖哩魚蛋',
    category: '港式小食',
    defaultAmount: 1,
    unit: '粒',
    calories: 12,
    protein: 1,
    carbs: 1.2,
    fat: 0.2,
    approx: '一粒',
  },
  {
    name: '煎釀三寶',
    category: '港式小食',
    defaultAmount: 1,
    unit: '件',
    calories: 37,
    protein: 2.3,
    carbs: 2.3,
    fat: 1.8,
    approx: '一件',
  },
  {
    name: '臭豆腐 (港式)',
    category: '港式小食',
    defaultAmount: 1,
    unit: '件',
    calories: 120,
    protein: 13.6,
    carbs: 7.8,
    fat: 3.4,
    approx: '一件 (已校正碳水誤差)',
  },
  {
    name: '炸大腸',
    category: '港式小食',
    defaultAmount: 1,
    unit: '粒',
    calories: 39,
    protein: 1.4,
    carbs: 0,
    fat: 3.7,
    approx: '一粒',
  },
  {
    name: '雞蛋仔',
    category: '港式小食',
    defaultAmount: 1,
    unit: '底',
    calories: 390,
    protein: 5.7,
    carbs: 60,
    fat: 14.4,
    approx: '一底',
  },
  {
    name: '格仔餅',
    category: '港式小食',
    defaultAmount: 1,
    unit: '底',
    calories: 440,
    protein: 7.8,
    carbs: 53.6,
    fat: 20.7,
    approx: '一底',
  },
  {
    name: '章魚小丸子',
    category: '港式小食',
    defaultAmount: 1,
    unit: '粒',
    calories: 129,
    protein: 2.1,
    carbs: 12.3,
    fat: 7.9,
    approx: '一粒',
  },
  {
    name: '混醬腸粉',
    category: '港式小食',
    defaultAmount: 1,
    unit: '碟',
    calories: 600,
    protein: 8.8,
    carbs: 121,
    fat: 13.8,
    approx: '一碟約6條',
  },
  {
    name: '缽仔糕',
    category: '港式小食',
    defaultAmount: 1,
    unit: '個',
    calories: 342,
    protein: 2.1,
    carbs: 82,
    fat: 0.6,
    approx: '一個',
  },
  {
    name: '茶葉蛋 (港式)',
    category: '港式小食',
    defaultAmount: 1,
    unit: '隻',
    calories: 73,
    protein: 6.6,
    carbs: 0,
    fat: 5.2,
    approx: '一隻',
  },
  {
    name: '牛雜',
    category: '港式小食',
    defaultAmount: 1,
    unit: '碗',
    calories: 345,
    protein: 35.4,
    carbs: 6.6,
    fat: 19.7,
    approx: '一碗',
  },
  {
    name: '生菜魚肉',
    category: '港式小食',
    defaultAmount: 1,
    unit: '碗',
    calories: 118,
    protein: 10.2,
    carbs: 10.9,
    fat: 3.7,
    approx: '一碗',
  },
  {
    name: '碗仔翅',
    category: '港式小食',
    defaultAmount: 1,
    unit: '碗',
    calories: 138,
    protein: 1.3,
    carbs: 26.9,
    fat: 1.3,
    approx: '一碗',
  },
  {
    name: '炸雞髀',
    category: '港式小食',
    defaultAmount: 1,
    unit: '隻',
    calories: 410,
    protein: 25.5,
    carbs: 13.1,
    fat: 28.5,
    approx: '一隻連皮',
  },
  {
    name: '滷水雞髀',
    category: '港式小食',
    defaultAmount: 1,
    unit: '隻',
    calories: 299,
    protein: 38.6,
    carbs: 9.2,
    fat: 17.6,
    approx: '一隻連皮',
  },
  {
    name: '牛油粟米',
    category: '港式小食',
    defaultAmount: 1,
    unit: '杯',
    calories: 185,
    protein: 5.3,
    carbs: 33.9,
    fat: 6,
    approx: '一杯',
  },
  // === 🍜 各式粉麵 (每100克生重) ===
  {
    name: '全蛋麵',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 384,
    protein: 14.2,
    carbs: 71.3,
    fat: 4.4,
    approx: '每100克生重',
  },
  {
    name: '全麥意粉',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 348,
    protein: 14.6,
    carbs: 75,
    fat: 1.4,
    approx: '每100克生重',
  },
  {
    name: '日式素麵',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 356,
    protein: 11.4,
    carbs: 74.1,
    fat: 0.8,
    approx: '每100克生重',
  },
  {
    name: '出前一丁',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 416,
    protein: 9.1,
    carbs: 53.8,
    fat: 18.3,
    approx: '每100克生重 (一包約91g)',
  },
  {
    name: '粉絲',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 351,
    protein: 0.2,
    carbs: 86,
    fat: 0.1,
    approx: '每100克生重',
  },
  {
    name: '冷凍烏冬',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 134,
    protein: 2.9,
    carbs: 30.6,
    fat: 0.5,
    approx: '每100克生重',
  },
  {
    name: '廈門麵線',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 341,
    protein: 12.9,
    carbs: 73.9,
    fat: 0.8,
    approx: '每100克生重',
  },
  {
    name: '紅薯粉',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 359,
    protein: 6.5,
    carbs: 83,
    fat: 0.1,
    approx: '每100克生重',
  },
  {
    name: '山西刀削麵',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 348,
    protein: 11,
    carbs: 76,
    fat: 1.3,
    approx: '每100克生重',
  },
  {
    name: '伊麵',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 452,
    protein: 12.4,
    carbs: 60,
    fat: 17.9,
    approx: '每100克生重',
  },
  {
    name: '台式刀削麵',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 345,
    protein: 11.2,
    carbs: 73,
    fat: 1.2,
    approx: '每100克生重',
  },
  {
    name: '關廟麵(粗)',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 356,
    protein: 12.6,
    carbs: 74,
    fat: 1.1,
    approx: '每100克生重',
  },
  {
    name: '米粉',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 347,
    protein: 7,
    carbs: 77.2,
    fat: 1,
    approx: '每100克生重',
  },
  {
    name: '米線',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 347,
    protein: 6.8,
    carbs: 78,
    fat: 1,
    approx: '每100克生重',
  },
  {
    name: '蕎麥麵',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 336,
    protein: 14.4,
    carbs: 75,
    fat: 0.7,
    approx: '每100克生重',
  },
  {
    name: '新鮮銀針粉',
    category: '各式粉麵',
    defaultAmount: 100,
    unit: 'g',
    calories: 155,
    protein: 0.7,
    carbs: 35,
    fat: 1.3,
    approx: '每100克生重',
  },

  // === 🍣 壽司郎熱量 (缺乏 Macros 資料，安全設定為 0) ===
  {
    name: '秋鰹魚腩壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 160,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '炙燒紅葉鯛壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 180,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '三文魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 95,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '鮟鱇魚天婦羅壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 150,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '炙燒羅勒三文魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 167,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '熟蝦壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 73,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '油甘魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 111,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '炙燒三文魚腩壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 123,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '天婦羅蟹棒壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 163,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '長鰭吞拿魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 85,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '魷魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 78,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '炸蝦天婦羅壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 146,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '蝶魚鰭邊壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 114,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '秋刀魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 108,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '炙燒芝士蝦壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 107,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '海鰻壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 98,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '北寄貝壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 69,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '玉子燒壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 117,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '赤貝壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 69,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '鯛魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 93,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '八爪魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 71,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '赤身壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 78,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '梅子紫蘇魷魚壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 74,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '三文魚牛油果',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 138,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '生蝦壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 69,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '腐皮壽司',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 173,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '三文魚子軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 89,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '吞拿魚山芋軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 90,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '飛魚子軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 79,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '松葉蟹軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 81,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '粟米軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 109,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '蔥花吞拿魚蓉軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 108,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '吞拿魚沙律軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 150,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '炸蝦牛油果卷',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 183,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '鮟鱇魚肝軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 160,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '蟹膏軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 89,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '甜蝦軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 107,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '蟹肉沙律軍艦',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 126,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '2件 (缺營養素資料)',
  },
  {
    name: '茶碗蒸',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '件',
    calories: 77,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '1件 (缺營養素資料)',
  },
  {
    name: '炸薯條',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 196,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '1份 (缺營養素資料)',
  },
  {
    name: '炸章魚塊',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 294,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '1份 (缺營養素資料)',
  },
  {
    name: '南瓜天婦羅',
    category: '壽司郎',
    defaultAmount: 1,
    unit: '份',
    calories: 64,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '1份 (缺營養素資料)',
  },

  // === 🥟 中式包點參考熱量 (以每件計算) ===
  {
    name: '流沙奶黃包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 238,
    protein: 6.5,
    carbs: 39.5,
    fat: 6,
    approx: '約 100g',
  },
  {
    name: '懷舊馬拉糕',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 426.6,
    protein: 8.6,
    carbs: 56.8,
    fat: 18.4,
    approx: '約 135g',
  },
  {
    name: '叉燒包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 256,
    protein: 8.3,
    carbs: 41.4,
    fat: 6.4,
    approx: '約 100g',
  },
  {
    name: '迷你蓮蓉包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 101,
    protein: 2.1,
    carbs: 19.4,
    fat: 1.7,
    approx: '約 35g',
  },
  {
    name: '迷你南瓜包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 87.5,
    protein: 1.8,
    carbs: 16.5,
    fat: 1.6,
    approx: '約 35g',
  },
  {
    name: '菜肉包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 248,
    protein: 6.7,
    carbs: 37,
    fat: 8.2,
    approx: '約 100g',
  },
  {
    name: '迷你黑金流沙包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 111,
    protein: 2.7,
    carbs: 16.2,
    fat: 3.9,
    approx: '約 35g',
  },
  {
    name: '紫薯包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 235,
    protein: 4.5,
    carbs: 46.8,
    fat: 3.3,
    approx: '約 100g',
  },
  {
    name: '全麥饅頭',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 270,
    protein: 7.7,
    carbs: 55.3,
    fat: 2,
    approx: '約 100g',
  },
  {
    name: '香芋包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 248,
    protein: 5,
    carbs: 48,
    fat: 4,
    approx: '約 100g',
  },
  {
    name: '蔥花卷',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 248.2,
    protein: 7.8,
    carbs: 47.5,
    fat: 3,
    approx: '約 100g',
  },
  {
    name: '芝麻流沙包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 290.1,
    protein: 8.5,
    carbs: 45.8,
    fat: 8.1,
    approx: '約 100g',
  },
  {
    name: '生煎菜肉包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 260,
    protein: 6.4,
    carbs: 30,
    fat: 13,
    approx: '約 100g',
  },
  {
    name: '糯米卷',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 195,
    protein: 3.8,
    carbs: 34.5,
    fat: 4.9,
    approx: '約 75g',
  },
  {
    name: '素菜包',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 200,
    protein: 4.7,
    carbs: 32,
    fat: 6.1,
    approx: '約 100g',
  },
  {
    name: '臘腸卷',
    category: '中式包點',
    defaultAmount: 1,
    unit: '件',
    calories: 370,
    protein: 9.6,
    carbs: 38,
    fat: 20,
    approx: '約 100g',
  },

  // === 🍛 碟頭飯營養表 (以整碟計算) ===
  {
    name: '滑蛋蝦仁飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 650,
    protein: 25,
    carbs: 130,
    fat: 13,
    approx: '整份約 580g',
  },
  {
    name: '魚香茄子飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1100,
    protein: 25,
    carbs: 140,
    fat: 43,
    approx: '整份約 720g',
  },
  {
    name: '冬菇蒸雞飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 660,
    protein: 25,
    carbs: 100,
    fat: 18,
    approx: '整份約 430g',
  },
  {
    name: '豉汁鳳爪排骨飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 820,
    protein: 24,
    carbs: 130,
    fat: 25,
    approx: '整份約 490g',
  },
  {
    name: '土魷肉餅飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1200,
    protein: 44,
    carbs: 120,
    fat: 54,
    approx: '整份約 570g',
  },
  {
    name: '蒸鯇魚飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 930,
    protein: 56,
    carbs: 120,
    fat: 27,
    approx: '整份約 710g',
  },
  {
    name: '冬瓜肉粒湯飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 590,
    protein: 28,
    carbs: 110,
    fat: 5.1,
    approx: '整份約 720g',
  },
  {
    name: '方魚肉碎湯飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 480,
    protein: 25,
    carbs: 66,
    fat: 13,
    approx: '整份約 660g',
  },
  {
    name: '咖哩牛腩飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1300,
    protein: 62,
    carbs: 140,
    fat: 50,
    approx: '整份約 800g',
  },
  {
    name: '燜蘿蔔牛腩飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 980,
    protein: 56,
    carbs: 140,
    fat: 20,
    approx: '整份約 750g',
  },
  {
    name: '時菜牛肉飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 770,
    protein: 34,
    carbs: 130,
    fat: 11,
    approx: '整份約 700g',
  },
  {
    name: '沙嗲牛肉飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 840,
    protein: 33,
    carbs: 140,
    fat: 17,
    approx: '整份約 700g',
  },
  {
    name: '粟米肉粒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 990,
    protein: 40,
    carbs: 170,
    fat: 18,
    approx: '整份約 760g',
  },
  {
    name: '豬扒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1300,
    protein: 50,
    carbs: 140,
    fat: 60,
    approx: '整份約 710g',
  },
  {
    name: '枝竹火腩飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1400,
    protein: 57,
    carbs: 140,
    fat: 62,
    approx: '整份約 770g',
  },
  {
    name: '鮮茄牛肉飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 940,
    protein: 36,
    carbs: 160,
    fat: 14,
    approx: '整份約 780g',
  },
  {
    name: '福建炒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1400,
    protein: 57,
    carbs: 200,
    fat: 45,
    approx: '整份約 960g',
  },
  {
    name: '時菜肉片飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 800,
    protein: 30,
    carbs: 130,
    fat: 15,
    approx: '整份約 660g',
  },
  {
    name: '揚州炒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1200,
    protein: 43,
    carbs: 150,
    fat: 49,
    approx: '整份約 620g',
  },
  {
    name: '鹹魚雞粒炒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1400,
    protein: 40,
    carbs: 190,
    fat: 50,
    approx: '整份約 690g',
  },
  {
    name: '瑤柱蛋白炒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1200,
    protein: 43,
    carbs: 200,
    fat: 32,
    approx: '整份約 690g',
  },
  {
    name: '西炒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1300,
    protein: 40,
    carbs: 170,
    fat: 50,
    approx: '整份約 750g',
  },
  {
    name: '菠蘿雞粒炒飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1500,
    protein: 45,
    carbs: 180,
    fat: 57,
    approx: '整份約 730g',
  },
  {
    name: '生炒牛肉飯',
    category: '碟頭飯',
    defaultAmount: 1,
    unit: '碟',
    calories: 1200,
    protein: 41,
    carbs: 150,
    fat: 32,
    approx: '整份約 610g',
  },

  // === 🍔 麥當勞食品分析 (擴充精準版) ===
  {
    name: '芝士安格斯',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 580,
    protein: 34.8,
    carbs: 37.8,
    fat: 32.2,
    approx: '單個',
  },
  {
    name: '巨無霸',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 496,
    protein: 25.6,
    carbs: 42.7,
    fat: 24.6,
    approx: '單個',
  },
  {
    name: '芝士漢堡飽',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 294,
    protein: 15.5,
    carbs: 29.8,
    fat: 12.4,
    approx: '單個',
  },
  {
    name: '蘑菇安格斯',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 644,
    protein: 36.2,
    carbs: 37.3,
    fat: 38.7,
    approx: '單個',
  },
  {
    name: '雙層芝士孖堡',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 434,
    protein: 25.6,
    carbs: 30.8,
    fat: 22.9,
    approx: '單個',
  },
  {
    name: '魚柳飽',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 337,
    protein: 15,
    carbs: 36.7,
    fat: 14.4,
    approx: '單個',
  },
  {
    name: '板燒雞腿飽',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 358,
    protein: 23,
    carbs: 33.4,
    fat: 14.6,
    approx: '單個',
  },
  {
    name: '脆辣雞腿飽',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 461,
    protein: 18.5,
    carbs: 41.7,
    fat: 24.3,
    approx: '單個',
  },
  {
    name: '烤雞凱撒沙律',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 248,
    protein: 24.2,
    carbs: 12.4,
    fat: 11.4,
    approx: '不含醬汁',
  },
  {
    name: '朱古力奶昔',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '杯',
    calories: 371,
    protein: 10.6,
    carbs: 59.2,
    fat: 9.9,
    approx: '一杯',
  },
  {
    name: '麥旋風',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '杯',
    calories: 351,
    protein: 6.5,
    carbs: 50.8,
    fat: 13.4,
    approx: '一杯',
  },
  {
    name: '新地筒',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '枝',
    calories: 137,
    protein: 3.2,
    carbs: 21.3,
    fat: 4.4,
    approx: '一枝',
  },
  {
    name: '朱古力新地',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '杯',
    calories: 343,
    protein: 6.5,
    carbs: 49.7,
    fat: 13.1,
    approx: '一杯',
  },
  {
    name: '蘋果批',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '個',
    calories: 228,
    protein: 2.3,
    carbs: 24.9,
    fat: 13.3,
    approx: '一個',
  },
  {
    name: '中薯條',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 313,
    protein: 4.7,
    carbs: 35.8,
    fat: 16.7,
    approx: '一份',
  },
  {
    name: '麥樂雞 (9件)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 474,
    protein: 27.4,
    carbs: 18.1,
    fat: 32.3,
    approx: '9件不含醬汁',
  },
  {
    name: '豬柳蛋扭扭粉(豬骨湯味)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '碗',
    calories: 469,
    protein: 20.9,
    carbs: 43.2,
    fat: 23.9,
    approx: '早餐一碗',
  },
  {
    name: '火腿扒蛋扭扭粉(豬骨湯味)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '碗',
    calories: 447,
    protein: 20.2,
    carbs: 43.3,
    fat: 21.5,
    approx: '早餐一碗',
  },
  {
    name: '板燒雞腿扭扭粉(豬骨湯味)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '碗',
    calories: 347,
    protein: 26.1,
    carbs: 44.9,
    fat: 7.4,
    approx: '早餐一碗',
  },
  {
    name: '豬柳蛋扭扭粉(清雞湯味)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '碗',
    calories: 452,
    protein: 20.5,
    carbs: 41.8,
    fat: 22.9,
    approx: '早餐一碗',
  },
  {
    name: '火腿扒蛋扭扭粉(清雞湯味)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '碗',
    calories: 435,
    protein: 19.6,
    carbs: 41.5,
    fat: 21.4,
    approx: '早餐一碗',
  },
  {
    name: '板燒雞腿扭扭粉(清雞湯味)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '碗',
    calories: 335,
    protein: 25.5,
    carbs: 43.1,
    fat: 7.2,
    approx: '早餐一碗',
  },
  {
    name: '珍寶套餐',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 813,
    protein: 28.9,
    carbs: 74,
    fat: 44,
    approx: '早餐套餐 (不含糖漿牛油)',
  },
  {
    name: '熱香餅精選套餐',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 637,
    protein: 15.5,
    carbs: 66.3,
    fat: 34.2,
    approx: '早餐套餐 (不含糖漿牛油)',
  },
  {
    name: '精選早晨套餐',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 597,
    protein: 23.3,
    carbs: 38.2,
    fat: 38.5,
    approx: '早餐套餐',
  },
  {
    name: '熱香餅(3件)',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 323,
    protein: 8.4,
    carbs: 53.5,
    fat: 8.2,
    approx: '不含糖漿牛油',
  },
  {
    name: '雙炒蛋脆雞飽',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 556,
    protein: 30,
    carbs: 40,
    fat: 30,
    approx: '單個',
  },
  {
    name: '豬柳蛋漢堡',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 427,
    protein: 20.7,
    carbs: 24.9,
    fat: 26.8,
    approx: '單個',
  },
  {
    name: '火腿扒芝士飽',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 346,
    protein: 12.9,
    carbs: 27,
    fat: 20.4,
    approx: '單個',
  },
  {
    name: '麥芝蛋飽',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '份',
    calories: 302,
    protein: 14.1,
    carbs: 30.1,
    fat: 13.6,
    approx: '單個',
  },
  {
    name: '脆薯餅',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '塊',
    calories: 138,
    protein: 1.3,
    carbs: 12.4,
    fat: 9.1,
    approx: '一塊',
  },
  {
    name: '熱朱古力',
    category: '麥當勞',
    defaultAmount: 1,
    unit: '杯',
    calories: 56,
    protein: 0.6,
    carbs: 9.9,
    fat: 1.6,
    approx: '一杯',
  },

  // === 🍕 Dough Bros 參考 (以每塊/Slice 計算) ===
  {
    name: '經典薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 266,
    protein: 12,
    carbs: 32,
    fat: 10,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '燒烤醬雞肉薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 300,
    protein: 16,
    carbs: 32,
    fat: 12,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '夏威夷薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 275,
    protein: 14,
    carbs: 30,
    fat: 11,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '意大利辣肉腸薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 290,
    protein: 15,
    carbs: 28,
    fat: 13,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '卡邦尼薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 332,
    protein: 17,
    carbs: 30,
    fat: 16,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '紅千島蝦王薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 292,
    protein: 17,
    carbs: 29,
    fat: 12,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '意大利青醬薄餅(素)',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 306,
    protein: 10,
    carbs: 35,
    fat: 14,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '經典烤肉薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 328,
    protein: 16,
    carbs: 30,
    fat: 16,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '帕瑪火腿薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 302,
    protein: 15,
    carbs: 29,
    fat: 14,
    approx: '一塊 (1 Slice)',
  },
  // === 🍳 茶餐廳早餐 ===
  {
    name: '多士',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '片',
    calories: 96,
    protein: 3,
    carbs: 20,
    fat: 0,
    approx: '一片',
  },
  {
    name: '牛油多士',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '片',
    calories: 168,
    protein: 3,
    carbs: 20,
    fat: 9,
    approx: '一片',
  },
  {
    name: '奶油豬',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '個',
    calories: 344,
    protein: 8,
    carbs: 45,
    fat: 7,
    approx: '一個',
  },
  {
    name: '炒蛋',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '份',
    calories: 220,
    protein: 14,
    carbs: 2,
    fat: 17,
    approx: '一份',
  },
  {
    name: '煎蛋',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '隻',
    calories: 90,
    protein: 6,
    carbs: 0,
    fat: 7,
    approx: '一隻',
  },
  {
    name: '火腿奄列',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '份',
    calories: 300,
    protein: 19,
    carbs: 4,
    fat: 20,
    approx: '一份',
  },
  {
    name: '香腸',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '條',
    calories: 90,
    protein: 4,
    carbs: 2,
    fat: 6,
    approx: '一條',
  },
  {
    name: '午餐肉',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '片',
    calories: 141,
    protein: 5,
    carbs: 1,
    fat: 13,
    approx: '一片',
  },
  {
    name: '火腿',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '片',
    calories: 46,
    protein: 5,
    carbs: 3,
    fat: 2,
    approx: '一片',
  },
  {
    name: '餐蛋麵',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 700,
    protein: 25,
    carbs: 60,
    fat: 42,
    approx: '最邪惡！',
  },
  {
    name: '五香肉丁公仔麵',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 675,
    protein: 28,
    carbs: 59,
    fat: 37,
    approx: '一碗',
  },
  {
    name: '沙嗲牛肉麵',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 650,
    protein: 32,
    carbs: 66,
    fat: 30,
    approx: '一碗',
  },
  {
    name: '腿蛋治',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '份',
    calories: 480,
    protein: 22,
    carbs: 42,
    fat: 24,
    approx: '一份',
  },
  {
    name: '牛奶麥皮',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 384,
    protein: 15,
    carbs: 40,
    fat: 14,
    approx: '一碗',
  },
  {
    name: '蕃茄牛肉通粉',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 374,
    protein: 18,
    carbs: 57,
    fat: 7,
    approx: '一碗',
  },
  {
    name: '雪菜肉絲米',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 355,
    protein: 14,
    carbs: 59,
    fat: 8,
    approx: '一碗',
  },
  {
    name: '叉燒湯意粉',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 357,
    protein: 19,
    carbs: 47,
    fat: 8,
    approx: '一碗',
  },
  {
    name: '火腿通粉',
    category: '茶餐廳早餐',
    defaultAmount: 1,
    unit: '碗',
    calories: 320,
    protein: 17,
    carbs: 52,
    fat: 4,
    approx: '最低卡！',
  },

  // === 🍕 Dough Bros 參考 (追加炸物與冬甩) ===
  {
    name: '黑松露薄餅(素)',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 303,
    protein: 12,
    carbs: 30,
    fat: 15,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '至尊辣肉腸薄餅',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '塊',
    calories: 327,
    protein: 16,
    carbs: 32,
    fat: 15,
    approx: '一塊 (1 Slice)',
  },
  {
    name: '松露蜂蜜雞翼',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '份',
    calories: 808,
    protein: 32,
    carbs: 35,
    fat: 60,
    approx: '一份 (10支單骨)',
  },
  {
    name: '松露芝士炸薯球',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '份',
    calories: 457,
    protein: 7,
    carbs: 42,
    fat: 29,
    approx: '一份',
  },
  {
    name: '開心果白朱古力冬甩',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '個',
    calories: 341,
    protein: 5,
    carbs: 42,
    fat: 17,
    approx: '一個',
  },
  {
    name: '吉士醬冬甩',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '個',
    calories: 299,
    protein: 5.5,
    carbs: 40,
    fat: 13,
    approx: '一個',
  },
  {
    name: '士多啤梨醬冬甩',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '個',
    calories: 304,
    protein: 5,
    carbs: 44,
    fat: 12,
    approx: '一個',
  },
  {
    name: '焦糖餅乾冬甩',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '個',
    calories: 332,
    protein: 5,
    carbs: 42,
    fat: 16,
    approx: '一個',
  },
  {
    name: 'Nutella冬甩',
    category: 'Dough Bros',
    defaultAmount: 1,
    unit: '個',
    calories: 349,
    protein: 5,
    carbs: 44,
    fat: 17,
    approx: '一個',
  },

  // === 🥟 港式點心 (蒸咸點) ===
  {
    name: '潮州粉果',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 92,
    protein: 1.9,
    carbs: 13,
    fat: 3.5,
    approx: '約 60g',
  },
  {
    name: '上素蒸粉果',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 52,
    protein: 0.6,
    carbs: 9,
    fat: 1.5,
    approx: '約 43g',
  },
  {
    name: '鮮竹卷',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 150,
    protein: 6.2,
    carbs: 3,
    fat: 12,
    approx: '約 60g',
  },
  {
    name: '山竹牛肉',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 93,
    protein: 4.2,
    carbs: 4.5,
    fat: 6.9,
    approx: '約 50g',
  },
  {
    name: '豉汁蒸排骨',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 260,
    protein: 16,
    carbs: 7.3,
    fat: 17,
    approx: '約 120g',
  },
  {
    name: '薑蔥牛柏葉',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 160,
    protein: 20,
    carbs: 5.8,
    fat: 6.9,
    approx: '約 160g',
  },
  {
    name: '雞扎',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 150,
    protein: 10,
    carbs: 4.2,
    fat: 10,
    approx: '約 80g',
  },
  {
    name: '棉花雞',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 210,
    protein: 18,
    carbs: 5.3,
    fat: 14,
    approx: '約 150g',
  },
  {
    name: '豉汁蒸鳳爪',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 200,
    protein: 15,
    carbs: 5.7,
    fat: 13,
    approx: '約 100g',
  },
  {
    name: '柱侯金錢肚',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 220,
    protein: 22,
    carbs: 11,
    fat: 10,
    approx: '約 160g',
  },
  {
    name: '蝦餃',
    category: '港式點心',
    defaultAmount: 1,
    unit: '粒',
    calories: 50,
    protein: 2.1,
    carbs: 5.6,
    fat: 2.1,
    approx: '約 25g',
  },
  {
    name: '咖喱蒸魷魚',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 190,
    protein: 22,
    carbs: 8.9,
    fat: 8.5,
    approx: '約 195g',
  },
  {
    name: '蒸蘿蔔糕',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 170,
    protein: 4,
    carbs: 23,
    fat: 6.3,
    approx: '約 180g',
  },
  {
    name: '蒜茸蒸魷魚',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 170,
    protein: 19,
    carbs: 6.1,
    fat: 6.4,
    approx: '約 140g',
  },
  {
    name: '燒賣',
    category: '港式點心',
    defaultAmount: 1,
    unit: '粒',
    calories: 61,
    protein: 3.2,
    carbs: 3.2,
    fat: 3.8,
    approx: '約 30g',
  },
  {
    name: '糯米雞',
    category: '港式點心',
    defaultAmount: 1,
    unit: '份',
    calories: 710,
    protein: 26,
    carbs: 110,
    fat: 23,
    approx: '約 340g',
  },

  // === 🍞 超市方包 (每100克) ===
  {
    name: '奇亞籽三文治麥包(嘉頓)',
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 229,
    protein: 12,
    carbs: 38.6,
    fat: 2.9,
    approx: '每100g (高蛋白高纖)',
  },
  {
    name: '十三穀三文治包(嘉頓)',
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 258,
    protein: 11.5,
    carbs: 43.3,
    fat: 4.3,
    approx: '每100g',
  },
  {
    name: '嘉頓純麥包',
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 229,
    protein: 9.9,
    carbs: 43.7,
    fat: 1.2,
    approx: '每100g',
  },
  {
    name: '超軟全麥麵包(M&S)',
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 234,
    protein: 11,
    carbs: 39.2,
    fat: 2.3,
    approx: '每100g',
  },
  {
    name: '健康全麥包(大班)',
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 297,
    protein: 6.6,
    carbs: 46.3,
    fat: 9.6,
    approx: '每100g',
  },
  {
    name: "全麥方包(Baker's Choice)",
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 235,
    protein: 10.4,
    carbs: 46.2,
    fat: 3,
    approx: '每100g',
  },
  {
    name: '奇亞籽三文治麥包(A-1)',
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 272,
    protein: 10.5,
    carbs: 43.1,
    fat: 6.4,
    approx: '每100g',
  },
  {
    name: '全麥方包(Yamazaki)',
    category: '超市方包',
    defaultAmount: 100,
    unit: 'g',
    calories: 256,
    protein: 10.5,
    carbs: 49.7,
    fat: 3.4,
    approx: '每100g',
  },

  // === 🫀 動物內臟 (每100克 生重) ===
  {
    name: '豬紅',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 55,
    protein: 12.2,
    carbs: 0.9,
    fat: 0.3,
    approx: '每100g生重',
  },
  {
    name: '豬大腸',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 196,
    protein: 6.9,
    carbs: 0,
    fat: 18.7,
    approx: '每100g生重',
  },
  {
    name: '牛肚',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 72,
    protein: 14.5,
    carbs: 0,
    fat: 1.6,
    approx: '每100g生重',
  },
  {
    name: '豬潤 (豬肝)',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 134,
    protein: 21.4,
    carbs: 2.47,
    fat: 3.65,
    approx: '每100g生重',
  },
  {
    name: '豬腰 (豬腎)',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 96,
    protein: 15.4,
    carbs: 1.4,
    fat: 3.2,
    approx: '每100g生重',
  },
  {
    name: '牛肝',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 139,
    protein: 19.8,
    carbs: 6.8,
    fat: 3.9,
    approx: '每100g生重',
  },
  {
    name: '豬肚',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 159,
    protein: 16.9,
    carbs: 0,
    fat: 10.1,
    approx: '每100g生重',
  },
  {
    name: '牛舌',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 224,
    protein: 14,
    carbs: 3,
    fat: 16,
    approx: '每100g生重',
  },
  {
    name: '牛肺',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 95,
    protein: 16.5,
    carbs: 2.6,
    fat: 2.4,
    approx: '每100g生重',
  },
  {
    name: '豬心',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 119,
    protein: 16.6,
    carbs: 5.3,
    fat: 1.1,
    approx: '每100g生重',
  },
  {
    name: '牛心',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 106,
    protein: 15.4,
    carbs: 3.1,
    fat: 3.5,
    approx: '每100g生重',
  },
  {
    name: '牛柏葉',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 70,
    protein: 12.5,
    carbs: 0,
    fat: 1.8,
    approx: '每100g生重',
  },
  {
    name: '雞心',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 153,
    protein: 15.6,
    carbs: 0.71,
    fat: 9.3,
    approx: '每100g生重',
  },
  {
    name: '雞子',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 71,
    protein: 10.6,
    carbs: 0.2,
    fat: 2.8,
    approx: '每100g生重',
  },
  {
    name: '鵝腸',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 63,
    protein: 10.5,
    carbs: 0.7,
    fat: 2.6,
    approx: '每100g生重',
  },
  {
    name: '法國鵝肝(熟)',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 462,
    protein: 11,
    carbs: 4.7,
    fat: 44,
    approx: '每100g (熟)',
  },
  {
    name: '鴨血',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 29,
    protein: 6,
    carbs: 0,
    fat: 0.3,
    approx: '每100g生重',
  },
  {
    name: '雞腎',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 94,
    protein: 17.7,
    carbs: 0,
    fat: 2.1,
    approx: '每100g生重',
  },
  {
    name: '鴨肝',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 128,
    protein: 14.5,
    carbs: 0.5,
    fat: 7.5,
    approx: '每100g生重',
  },
  {
    name: '鴨肫',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 92,
    protein: 17.9,
    carbs: 2.1,
    fat: 1.3,
    approx: '每100g生重',
  },
  {
    name: '雞肝',
    category: '動物內臟',
    defaultAmount: 100,
    unit: 'g',
    calories: 119,
    protein: 17,
    carbs: 0.73,
    fat: 4.8,
    approx: '每100g生重',
  },

  // === 🥟 八方雲集 (以每隻計算，鍋貼27g/水餃28g) ===
  {
    name: '招牌鍋貼',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 68,
    protein: 1.94,
    carbs: 6.1,
    fat: 4,
    approx: '一隻 (約27g)',
  },
  {
    name: '玉米鍋貼',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 63.8,
    protein: 2.24,
    carbs: 7,
    fat: 2.98,
    approx: '一隻 (約27g)',
  },
  {
    name: '韓式辣味水餃',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 60.3,
    protein: 2.46,
    carbs: 6.69,
    fat: 2.63,
    approx: '一隻 (約28g)',
  },
  {
    name: '韭菜鍋貼',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 73,
    protein: 2.16,
    carbs: 6.31,
    fat: 4.4,
    approx: '一隻 (約27g)',
  },
  {
    name: '田園蔬菜鍋貼',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 45,
    protein: 0.8,
    carbs: 7,
    fat: 1.5,
    approx: '一隻 (約27g)',
  },
  {
    name: '咖哩水餃',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 61.3,
    protein: 2.27,
    carbs: 6.64,
    fat: 2.86,
    approx: '一隻 (約28g)',
  },
  {
    name: '韓式辣味鍋貼',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 67.9,
    protein: 2.4,
    carbs: 6.7,
    fat: 3.5,
    approx: '一隻 (約27g)',
  },
  {
    name: '招牌水餃',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 64,
    protein: 2.1,
    carbs: 6.4,
    fat: 3.36,
    approx: '一隻 (約28g)',
  },
  {
    name: '玉米水餃',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 59.1,
    protein: 2.1,
    carbs: 7.06,
    fat: 2.49,
    approx: '一隻 (約28g)',
  },
  {
    name: '咖哩鍋貼',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 67,
    protein: 2.2,
    carbs: 6.47,
    fat: 3.6,
    approx: '一隻 (約27g)',
  },
  {
    name: '韭菜水餃',
    category: '八方雲集',
    defaultAmount: 1,
    unit: '隻',
    calories: 66.4,
    protein: 2.32,
    carbs: 6.13,
    fat: 3.61,
    approx: '一隻 (約28g)',
  },
  {
    name: '香濃豆漿',
    category: '八方雲集',
    defaultAmount: 340,
    unit: 'ml',
    calories: 193.8,
    protein: 11.6,
    carbs: 24.5,
    fat: 5.4,
    approx: '一杯 (340ml)',
  },

  // === 🏪 7-Eleven 宵夜/小食推介 ===
  {
    name: '碗仔翅 (7-11)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '份',
    calories: 80,
    protein: 5.2,
    carbs: 9.6,
    fat: 2.4,
    approx: '每份計算',
  },
  {
    name: '蝦餃 (7-11)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '份',
    calories: 126,
    protein: 2.3,
    carbs: 17,
    fat: 5.4,
    approx: '每份計算',
  },
  {
    name: '蝦肉燒賣 (7-11)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '份',
    calories: 147,
    protein: 5.6,
    carbs: 17,
    fat: 6.2,
    approx: '每份計算',
  },
  {
    name: '青森產汁燒帆立貝海苔飯糰',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '個',
    calories: 151,
    protein: 4.4,
    carbs: 31.5,
    fat: 0,
    approx: '一個',
  },
  {
    name: '炭燒雞肉飯糰(7-11)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '個',
    calories: 162,
    protein: 5.6,
    carbs: 30,
    fat: 2,
    approx: '一個',
  },
  {
    name: '北海道醬油漬三文魚籽飯糰',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '個',
    calories: 236,
    protein: 7,
    carbs: 41,
    fat: 5,
    approx: '一個',
  },
  {
    name: '芥末八爪魚飯糰',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '個',
    calories: 156,
    protein: 4,
    carbs: 33,
    fat: 1,
    approx: '一個',
  },
  {
    name: '花雕雞髀 (連皮)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '隻',
    calories: 292,
    protein: 30,
    carbs: 2.1,
    fat: 17.9,
    approx: '一隻連皮',
  },
  {
    name: '花雕雞髀 (去皮)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '隻',
    calories: 192,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '去皮熱量 (缺營養素資料)',
  },
  {
    name: '瑞士雞髀 (連皮)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '隻',
    calories: 351,
    protein: 38.6,
    carbs: 9.2,
    fat: 17.6,
    approx: '一隻連皮',
  },
  {
    name: '瑞士雞髀 (去皮)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '隻',
    calories: 251,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '去皮熱量 (缺營養素資料)',
  },
  {
    name: '黑椒雞髀 (連皮)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '隻',
    calories: 378,
    protein: 40.7,
    carbs: 9.2,
    fat: 14.7,
    approx: '一隻連皮',
  },
  {
    name: '黑椒雞髀 (去皮)',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '隻',
    calories: 278,
    protein: 0,
    carbs: 0,
    fat: 0,
    approx: '去皮熱量 (缺營養素資料)',
  },
  {
    name: '香草味即食雞胸',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '包',
    calories: 100,
    protein: 19,
    carbs: 3.2,
    fat: 1.2,
    approx: '一包',
  },
  {
    name: '黑椒青檸味即食雞胸',
    category: '7-Eleven',
    defaultAmount: 1,
    unit: '包',
    calories: 106,
    protein: 18.9,
    carbs: 3.2,
    fat: 1.2,
    approx: '一包',
  },
  // === 🍙 華御結 Hana-musubi ===
  {
    name: '野澤菜大豆飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 102,
    protein: 2.5,
    carbs: 19.2,
    fat: 1.7,
    approx: '一個',
  },
  {
    name: '汁煮和風雜菌(松露風味)',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 156,
    protein: 3.1,
    carbs: 33.6,
    fat: 1,
    approx: '一個',
  },
  {
    name: '無核梅乾(減鹽)',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 158,
    protein: 2.9,
    carbs: 35,
    fat: 0.8,
    approx: '一個',
  },
  {
    name: '芥末章魚飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 161,
    protein: 3.5,
    carbs: 34.4,
    fat: 1,
    approx: '一個',
  },
  {
    name: '金平牛蒡飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 163,
    protein: 2.9,
    carbs: 35.4,
    fat: 1.1,
    approx: '一個',
  },
  {
    name: '蜂蜜醬油香蒜飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 166,
    protein: 3.3,
    carbs: 35.9,
    fat: 3.1,
    approx: '一個',
  },
  {
    name: '帆立貝海膽蛋黃醬',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 166,
    protein: 6,
    carbs: 33,
    fat: 2.5,
    approx: '一個',
  },
  {
    name: '炭燒雞肉飯糰(華御結)',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 168,
    protein: 4.7,
    carbs: 34.2,
    fat: 1.4,
    approx: '一個',
  },
  {
    name: '北海道產日高昆布',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 170,
    protein: 3.2,
    carbs: 36.7,
    fat: 1.1,
    approx: '一個',
  },
  {
    name: '北海道產秋鮭三文魚',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 170,
    protein: 5.3,
    carbs: 32.2,
    fat: 2.2,
    approx: '一個',
  },
  {
    name: '蒲燒星鰻山葵莖',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 171,
    protein: 4.2,
    carbs: 34.1,
    fat: 2,
    approx: '一個',
  },
  {
    name: '辛口明太子飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 175,
    protein: 4.5,
    carbs: 36.8,
    fat: 1.2,
    approx: '一個',
  },
  {
    name: '雞肉雜錦野菜飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 177,
    protein: 4.6,
    carbs: 33.6,
    fat: 2.7,
    approx: '一個',
  },
  {
    name: '十勝風豚肉(特調醬汁)',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 180,
    protein: 4.3,
    carbs: 34.7,
    fat: 2.6,
    approx: '一個',
  },
  {
    name: '北海道野菜芝士咖哩',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 183,
    protein: 3.7,
    carbs: 34,
    fat: 3.5,
    approx: '一個',
  },
  {
    name: '柚香炙燒鯖魚飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 183,
    protein: 4.9,
    carbs: 33.2,
    fat: 3.4,
    approx: '一個',
  },
  {
    name: '北海道金時豆飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 186,
    protein: 3.9,
    carbs: 32.7,
    fat: 1,
    approx: '一個',
  },
  {
    name: '濃香蛋黃醬飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 187,
    protein: 4.5,
    carbs: 32.7,
    fat: 3.8,
    approx: '一個',
  },
  {
    name: '三重芝士粟米飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 187,
    protein: 4,
    carbs: 37,
    fat: 2.6,
    approx: '一個',
  },
  {
    name: '柚子火腿蛋沙律',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 188,
    protein: 4.1,
    carbs: 32.5,
    fat: 4.2,
    approx: '一個',
  },
  {
    name: '紅雪蟹沙律飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 190,
    protein: 3.8,
    carbs: 32.5,
    fat: 4.9,
    approx: '一個',
  },
  {
    name: '豬肉鬆金平牛蒡',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 192,
    protein: 4.4,
    carbs: 34.9,
    fat: 2.1,
    approx: '一個',
  },
  {
    name: '濃香蛋汁牛壽喜燒',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 193,
    protein: 4.9,
    carbs: 34.9,
    fat: 4.3,
    approx: '一個',
  },
  {
    name: '本格和風燒牛肉',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 194,
    protein: 4.3,
    carbs: 33.9,
    fat: 4.5,
    approx: '一個',
  },
  {
    name: '明太子沙律飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 196,
    protein: 3.5,
    carbs: 33,
    fat: 5.5,
    approx: '一個',
  },
  {
    name: '吞拿魚沙律飯糰',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 211,
    protein: 4.3,
    carbs: 36.8,
    fat: 5.4,
    approx: '一個',
  },
  {
    name: '明太子沙律配照燒鮭魚扒(珍寶)',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 301,
    protein: 10.3,
    carbs: 51.2,
    fat: 6.2,
    approx: '珍寶系列',
  },
  {
    name: '韓風燒牛肉(珍寶)',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 326,
    protein: 7.5,
    carbs: 53.2,
    fat: 9.2,
    approx: '珍寶系列',
  },
  {
    name: '烤雞扒配日式香草蛋黃醬(珍寶)',
    category: '華御結',
    defaultAmount: 1,
    unit: '個',
    calories: 365,
    protein: 10.1,
    carbs: 53.3,
    fat: 12.4,
    approx: '珍寶系列',
  },
  {
    name: '原味雞胸 (華御結)',
    category: '華御結',
    defaultAmount: 1,
    unit: '包',
    calories: 108,
    protein: 21.1,
    carbs: 1.9,
    fat: 1.8,
    approx: '一包',
  },
  {
    name: '香草雞胸 (華御結)',
    category: '華御結',
    defaultAmount: 1,
    unit: '包',
    calories: 109,
    protein: 21,
    carbs: 2.2,
    fat: 1.8,
    approx: '一包',
  },
  {
    name: '黑胡椒雞胸 (華御結)',
    category: '華御結',
    defaultAmount: 1,
    unit: '包',
    calories: 110,
    protein: 21.2,
    carbs: 2.3,
    fat: 1.8,
    approx: '一包',
  },
  {
    name: '蒜鹽雞胸 (華御結)',
    category: '華御結',
    defaultAmount: 1,
    unit: '包',
    calories: 110,
    protein: 21,
    carbs: 2.4,
    fat: 1.8,
    approx: '一包',
  },
  {
    name: '六種野菜鹽麴蕃茄濃湯',
    category: '華御結',
    defaultAmount: 1,
    unit: '碗',
    calories: 50,
    protein: 1.5,
    carbs: 11,
    fat: 0,
    approx: '一碗',
  },
  {
    name: '和風骨膠原雞丸豆乳湯',
    category: '華御結',
    defaultAmount: 1,
    unit: '碗',
    calories: 131,
    protein: 5.5,
    carbs: 12,
    fat: 6.8,
    approx: '一碗',
  },
  {
    name: '蔬菜條配和風味噌醬',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 43,
    protein: 2.2,
    carbs: 4.8,
    fat: 1.6,
    approx: '一杯',
  },
  {
    name: '輕盈沙律杯(慢煮雞胸肉)',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 81,
    protein: 10.2,
    carbs: 4,
    fat: 2,
    approx: '一杯',
  },
  {
    name: '輕盈沙律杯(烤蜜薯羽衣甘藍)',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 84,
    protein: 1.7,
    carbs: 14.4,
    fat: 2.3,
    approx: '一杯',
  },
  {
    name: '豆腐棒(鰹魚汁味)',
    category: '華御結',
    defaultAmount: 1,
    unit: '條',
    calories: 85,
    protein: 10.4,
    carbs: 2.1,
    fat: 3.9,
    approx: '一條',
  },
  {
    name: '豆腐棒(黑椒味)',
    category: '華御結',
    defaultAmount: 1,
    unit: '條',
    calories: 88,
    protein: 10.5,
    carbs: 2.6,
    fat: 4,
    approx: '一條',
  },
  {
    name: '唐多里烤雞扒',
    category: '華御結',
    defaultAmount: 1,
    unit: '件',
    calories: 142,
    protein: 10,
    carbs: 7.3,
    fat: 8.1,
    approx: '一件',
  },
  {
    name: '和風輕食盒(北海道薯仔沙律)',
    category: '華御結',
    defaultAmount: 1,
    unit: '盒',
    calories: 153,
    protein: 1.6,
    carbs: 15.4,
    fat: 9.4,
    approx: '一盒',
  },
  {
    name: '和風輕食盒(南瓜沙律)',
    category: '華御結',
    defaultAmount: 1,
    unit: '盒',
    calories: 181,
    protein: 2,
    carbs: 18,
    fat: 11.2,
    approx: '一盒',
  },
  {
    name: '鹽麴燒鯖魚',
    category: '華御結',
    defaultAmount: 1,
    unit: '件',
    calories: 187,
    protein: 11.7,
    carbs: 0,
    fat: 15.6,
    approx: '一件',
  },
  {
    name: '厚切一口玉子燒',
    category: '華御結',
    defaultAmount: 1,
    unit: '份',
    calories: 189,
    protein: 7.7,
    carbs: 16,
    fat: 10.5,
    approx: '一份',
  },
  {
    name: '和風輕食盒(鳴門金時大學芋)',
    category: '華御結',
    defaultAmount: 1,
    unit: '盒',
    calories: 218,
    protein: 1.1,
    carbs: 39.3,
    fat: 7,
    approx: '一盒',
  },
  {
    name: '和風輕食盒(金芝麻牛蒡沙律)',
    category: '華御結',
    defaultAmount: 1,
    unit: '盒',
    calories: 229,
    protein: 3.7,
    carbs: 11.1,
    fat: 19,
    approx: '一盒',
  },
  {
    name: '豆腐布甸',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 117,
    protein: 2.7,
    carbs: 18.4,
    fat: 3.9,
    approx: '一杯',
  },
  {
    name: '黑豆鹽大福',
    category: '華御結',
    defaultAmount: 1,
    unit: '件',
    calories: 140,
    protein: 3.2,
    carbs: 30,
    fat: 0.5,
    approx: '一件',
  },
  {
    name: '黑芝麻豆乳布甸',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 141,
    protein: 3.5,
    carbs: 18.5,
    fat: 6.4,
    approx: '一杯',
  },
  {
    name: '迷你吐司',
    category: '華御結',
    defaultAmount: 1,
    unit: '包',
    calories: 164,
    protein: 2.9,
    carbs: 23,
    fat: 6.7,
    approx: '一包',
  },
  {
    name: '抹茶黑糖蕨餅',
    category: '華御結',
    defaultAmount: 1,
    unit: '盒',
    calories: 166,
    protein: 1.1,
    carbs: 39.8,
    fat: 0.53,
    approx: '一盒',
  },
  {
    name: '日本忌廉夾心蛋糕(蘋果)',
    category: '華御結',
    defaultAmount: 1,
    unit: '件',
    calories: 181,
    protein: 2.7,
    carbs: 23.7,
    fat: 8.3,
    approx: '一件',
  },
  {
    name: '濃香焙茶布甸',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 184,
    protein: 2.7,
    carbs: 14.9,
    fat: 12.8,
    approx: '一杯',
  },
  {
    name: '北海道特濃牛乳布甸',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 184,
    protein: 2.5,
    carbs: 14.9,
    fat: 12.8,
    approx: '一杯',
  },
  {
    name: '皇家奶茶布甸',
    category: '華御結',
    defaultAmount: 1,
    unit: '杯',
    calories: 187,
    protein: 2.3,
    carbs: 16.6,
    fat: 12.5,
    approx: '一杯',
  },
  {
    name: '日本忌廉夾心蛋糕(芝士粒)',
    category: '華御結',
    defaultAmount: 1,
    unit: '件',
    calories: 189,
    protein: 3.1,
    carbs: 22.1,
    fat: 9.6,
    approx: '一件',
  },
  {
    name: '粒粒紅豆銅鑼燒',
    category: '華御結',
    defaultAmount: 1,
    unit: '件',
    calories: 190,
    protein: 4.1,
    carbs: 40.7,
    fat: 1.2,
    approx: '一件',
  },
  {
    name: '草莓紅豆大福',
    category: '華御結',
    defaultAmount: 1,
    unit: '件',
    calories: 196,
    protein: 2.6,
    carbs: 44.9,
    fat: 0.3,
    approx: '一件',
  },
  {
    name: '鮮忌廉紅豆白玉小丸子',
    category: '華御結',
    defaultAmount: 1,
    unit: '盒',
    calories: 388,
    protein: 4.9,
    carbs: 73.6,
    fat: 7.9,
    approx: '一盒',
  },

  // === 🇸🇪 IKEA 小食 ===
  {
    name: '植物素肉丸(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '粒',
    calories: 42.5,
    protein: 1.8,
    carbs: 2.6,
    fat: 2.9,
    approx: '一粒',
  },
  {
    name: '瑞典肉丸(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '粒',
    calories: 47.5,
    protein: 2.3,
    carbs: 0.8,
    fat: 3.9,
    approx: '一粒',
  },
  {
    name: '蔬菜薯餅(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '件',
    calories: 130,
    protein: 3,
    carbs: 10,
    fat: 9,
    approx: '一件',
  },
  {
    name: '紅果醬(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '湯匙',
    calories: 26.5,
    protein: 0,
    carbs: 6.3,
    fat: 0,
    approx: '一湯匙',
  },
  {
    name: '肉丸忌廉汁(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '湯匙',
    calories: 56,
    protein: 0.7,
    carbs: 5.2,
    fat: 3.5,
    approx: '一湯匙',
  },
  {
    name: '乳酪雪糕(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '杯',
    calories: 150,
    protein: 3,
    carbs: 36,
    fat: 0,
    approx: '一杯',
  },
  {
    name: '素菜熱狗(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '個',
    calories: 228,
    protein: 8.2,
    carbs: 38,
    fat: 5,
    approx: '一個',
  },
  {
    name: '玉桂卷(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '個',
    calories: 264,
    protein: 4.6,
    carbs: 49.6,
    fat: 6,
    approx: '一個',
  },
  {
    name: '熱狗(IKEA)',
    category: 'IKEA',
    defaultAmount: 1,
    unit: '個',
    calories: 270,
    protein: 10,
    carbs: 27,
    fat: 13.5,
    approx: '一個',
  },

  // === 🍔 Mos Burger ===
  {
    name: '金平牛蒡珍珠堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 280,
    protein: 6,
    carbs: 63,
    fat: 3,
    approx: '一個',
  },
  {
    name: '海鮮珍珠堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 341,
    protein: 10,
    carbs: 67,
    fat: 8,
    approx: '一個',
  },
  {
    name: '烤牛肉珍珠堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 498,
    protein: 14,
    carbs: 56,
    fat: 25,
    approx: '一個',
  },
  {
    name: '脆雞漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 355,
    protein: 19,
    carbs: 27,
    fat: 19,
    approx: '一個',
  },
  {
    name: '照燒雞肉漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 381,
    protein: 20,
    carbs: 34,
    fat: 21,
    approx: '一個',
  },
  {
    name: '北海道南瓜薯餅漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 385,
    protein: 9,
    carbs: 55,
    fat: 18,
    approx: '一個',
  },
  {
    name: '摩斯漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 404,
    protein: 19,
    carbs: 46,
    fat: 21,
    approx: '一個',
  },
  {
    name: '魚柳漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 404,
    protein: 15,
    carbs: 41,
    fat: 24,
    approx: '一個',
  },
  {
    name: '吉列蝦漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 409,
    protein: 12,
    carbs: 49,
    fat: 22,
    approx: '一個',
  },
  // === 🍔 Mos Burger (追加部分) ===
  {
    name: '摩斯芝士漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 418,
    protein: 21,
    carbs: 37,
    fat: 24,
    approx: '一個',
  },
  {
    name: '照燒牛肉漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 453,
    protein: 18,
    carbs: 41,
    fat: 28,
    approx: '一個',
  },
  {
    name: '黑醋雞肉漢堡',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 460,
    protein: 18,
    carbs: 44,
    fat: 26,
    approx: '一個',
  },
  {
    name: '熱狗 (Mos Burger)',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 340,
    protein: 17,
    carbs: 32,
    fat: 20,
    approx: '一個',
  },
  {
    name: '辛味熱狗 (Mos Burger)',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '個',
    calories: 271,
    protein: 15,
    carbs: 24,
    fat: 16,
    approx: '一個',
  },
  {
    name: '綠田園沙律',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '份',
    calories: 17,
    protein: 1,
    carbs: 3,
    fat: 0,
    approx: '一份',
  },
  {
    name: '摩斯雞塊',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '包',
    calories: 231,
    protein: 18,
    carbs: 13,
    fat: 13,
    approx: '每包',
  },
  {
    name: '厚切薯條',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '包',
    calories: 232,
    protein: 4,
    carbs: 33,
    fat: 10,
    approx: '每包',
  },
  {
    name: '北海道南瓜薯餅',
    category: 'Mos Burger',
    defaultAmount: 1,
    unit: '件',
    calories: 277,
    protein: 4,
    carbs: 33,
    fat: 15,
    approx: '一件',
  },

  // === 🍩 Mister Donut 卡路里 ===
  // Churro 系列
  {
    name: '蜜糖Chu Chu',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 205,
    protein: 3.3,
    carbs: 24.9,
    fat: 10.1,
    approx: '一個',
  },
  {
    name: '朱古力Chu Chu',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 270,
    protein: 4.1,
    carbs: 25.8,
    fat: 16.5,
    approx: '一個',
  },
  {
    name: '士多啤梨Chu Chu',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 272,
    protein: 3.5,
    carbs: 26.3,
    fat: 16.8,
    approx: '一個',
  },

  // 波堤系列
  {
    name: '經典原味波堤',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 194,
    protein: 1.2,
    carbs: 20.5,
    fat: 11.8,
    approx: '一個',
  },
  {
    name: '黃金蜜糖波堤',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 219,
    protein: 1.2,
    carbs: 26.9,
    fat: 11.8,
    approx: '一個',
  },
  {
    name: '邪惡朱古力波堤',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 220,
    protein: 1.7,
    carbs: 22.6,
    fat: 15.2,
    approx: '一個',
  },
  {
    name: '士多啤梨波堤',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 245,
    protein: 1.3,
    carbs: 24.5,
    fat: 15.6,
    approx: '一個',
  },

  // 法式扭紋系列
  {
    name: '法式扭紋',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 148,
    protein: 1.5,
    carbs: 14.3,
    fat: 9.2,
    approx: '一個',
  },
  {
    name: '法式天使忌廉扭紋',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 186,
    protein: 2.1,
    carbs: 13.1,
    fat: 13.7,
    approx: '一個',
  },
  {
    name: '法式粉紅吉士扭紋',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 199,
    protein: 2,
    carbs: 16.4,
    fat: 13.7,
    approx: '一個',
  },

  // 鬆碎冬甩系列
  {
    name: '原味鬆碎冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 281,
    protein: 3.4,
    carbs: 28,
    fat: 17,
    approx: '一個',
  },
  {
    name: '朱古力鬆碎冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 318,
    protein: 3.7,
    carbs: 30.7,
    fat: 19.7,
    approx: '一個',
  },
  {
    name: '士多啤梨鬆碎冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 332,
    protein: 3.5,
    carbs: 32,
    fat: 20.8,
    approx: '一個',
  },

  // 朱古力冬甩系列
  {
    name: '經典朱古力冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 245,
    protein: 2.9,
    carbs: 26.8,
    fat: 13.9,
    approx: '一個',
  },
  {
    name: '雪花椰絲朱古力冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 268,
    protein: 3.2,
    carbs: 26.5,
    fat: 16.6,
    approx: '一個',
  },
  {
    name: '雙重朱古力冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 271,
    protein: 3.4,
    carbs: 24.7,
    fat: 17.3,
    approx: '一個',
  },
  {
    name: '黃金脆粒朱古力冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 274,
    protein: 3.2,
    carbs: 32.5,
    fat: 14.4,
    approx: '一個',
  },
  {
    name: '士多啤梨朱古力冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 296,
    protein: 3,
    carbs: 30.8,
    fat: 17.7,
    approx: '一個',
  },

  // 酵母冬甩系列
  {
    name: '天使奶油冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 200,
    protein: 3.1,
    carbs: 19.5,
    fat: 12,
    approx: '一個',
  },
  {
    name: '糖霜雪花冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 207,
    protein: 4.1,
    carbs: 21.3,
    fat: 11.5,
    approx: '一個',
  },
  {
    name: '金黃蜜糖冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 216,
    protein: 4.1,
    carbs: 24,
    fat: 11.4,
    approx: '一個',
  },
  {
    name: '吉士忌廉冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 222,
    protein: 3.4,
    carbs: 25.2,
    fat: 11.8,
    approx: '一個',
  },
  {
    name: '朱古力冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 250,
    protein: 4.6,
    carbs: 22.6,
    fat: 15.5,
    approx: '一個',
  },
  {
    name: '士多啤梨冬甩',
    category: 'Mister Donut',
    defaultAmount: 1,
    unit: '個',
    calories: 251,
    protein: 4.2,
    carbs: 22.9,
    fat: 15.7,
    approx: '一個',
  },
];

// === 🏋️‍♂️ 訓練部位選項 (包含新增的肩、循環、二頭與三頭) ===
const WORKOUT_PARTS = [
  { id: 'chest', label: '胸', color: 'bg-blue-500' },
  { id: 'back', label: '背', color: 'bg-indigo-500' },
  { id: 'legs', label: '腿', color: 'bg-emerald-500' },
  { id: 'shoulder', label: '肩', color: 'bg-amber-500' },
  { id: 'biceps', label: '二頭', color: 'bg-purple-500' }, // 🌟 新增：二頭肌 (紫色)
  { id: 'triceps', label: '三頭', color: 'bg-pink-500' }, // 🌟 新增：三頭肌 (粉紅色)
  { id: 'core', label: '核心', color: 'bg-rose-500' },
  { id: 'cardio', label: '有氧', color: 'bg-cyan-500' },
  { id: 'circuit', label: '循環', color: 'bg-teal-500' },
];
const RECIPE_DATABASE = [
  {
    name: '番茄炒蛋',
    ingredients: ['牛番茄', '番茄', '雞蛋', '蛋'],
    calories: 250,
    protein: 12,
    carbs: 10,
    fat: 18,
    recipe: `1. 將番茄切塊，雞蛋打散。\n2. 熱鍋下油，先炒熟雞蛋撈起。\n3. 原鍋下番茄炒軟，加入少許水與番茄醬。\n4. 倒回雞蛋翻炒均勻，加鹽調味即可。`,
  },
  {
    name: '蒜香鮮蔬烤雞胸',
    ingredients: ['雞胸肉', '雞肉', '花椰菜', '高麗菜', '蒜'],
    calories: 320,
    protein: 35,
    carbs: 12,
    fat: 10,
    recipe: `1. 雞胸肉切塊用蒜末、鹽、黑胡椒醃製。\n2. 將蔬菜切小塊鋪在烤盤底。\n3. 放上雞肉，淋上少許橄欖油。\n4. 烤箱 200度 烤 15-20 分鐘即可。`,
  },
  {
    name: '燕麥奶香蕉煎餅',
    ingredients: ['燕麥奶', '燕麥', '香蕉', '雞蛋'],
    calories: 380,
    protein: 10,
    carbs: 55,
    fat: 12,
    recipe: `1. 將香蕉壓成泥，加入雞蛋與燕麥奶拌勻。\n2. 加入燕麥片調成糊狀。\n3. 平底鍋抹少許油，倒入麵糊煎至兩面金黃即可。`,
  },
  {
    name: '高麗菜炒肉片',
    ingredients: ['高麗菜', '豬肉', '肉片', '排骨'],
    calories: 280,
    protein: 18,
    carbs: 8,
    fat: 20,
    recipe: `1. 高麗菜切絲，肉片用少許醬油醃製。\n2. 熱鍋下肉片炒至半熟撈出。\n3. 原鍋爆香蒜末，下高麗菜炒軟。\n4. 倒回肉片拌炒，加鹽調味即可起鍋。`,
  },
  {
    name: '鮭魚時蔬沙拉',
    ingredients: ['鮭魚', '高麗菜', '牛番茄', '生菜'],
    calories: 350,
    protein: 25,
    carbs: 15,
    fat: 22,
    recipe: `1. 鮭魚兩面抹鹽，乾煎至熟後弄碎。\n2. 蔬菜洗淨切塊，番茄切片。\n3. 將蔬菜鋪底，撒上鮭魚碎，淋上和風醬即可。`,
  },
  {
    name: '清蒸鯛魚豆腐',
    ingredients: ['鯛魚', '豆腐', '洋蔥', '蔥'],
    calories: 180,
    protein: 28,
    carbs: 6,
    fat: 4,
    recipe: `1. 豆腐切片鋪底，鯛魚片疊在上方。\n2. 鋪上洋蔥絲與薑絲，淋上少許米酒與醬油。\n3. 放入電鍋蒸 10-12 分鐘。\n4. 撒上蔥絲即可。`,
  },
  {
    name: '滑蛋牛肉',
    ingredients: ['牛肉', '雞蛋', '蛋', '蔥'],
    calories: 320,
    protein: 24,
    carbs: 4,
    fat: 22,
    recipe: `1. 牛肉切片用醬油及太白粉略醃。\n2. 雞蛋打散備用。\n3. 熱鍋快速將牛肉炒至 7 分熟撈起。\n4. 關小火下蛋液，待快凝固時倒回牛肉翻拌。`,
  },
  {
    name: '味噌烤魚',
    ingredients: ['鮭魚', '鯛魚', '秋刀魚'],
    calories: 260,
    protein: 22,
    carbs: 8,
    fat: 15,
    recipe: `1. 將味噌、味醂、米酒調成醬汁抹在魚片上。\n2. 醃製 15 分鐘。\n3. 氣炸鍋 180度 烤 12-15 分鐘至表面微焦。`,
  },
  {
    name: '蔥爆豬里肌',
    ingredients: ['豬肉', '里肌', '洋蔥', '蔥'],
    calories: 240,
    protein: 26,
    carbs: 5,
    fat: 12,
    recipe: `1. 里肌肉切片拍鬆，醬油醃製。\n2. 大火爆香洋蔥與蔥段。\n3. 加入豬肉快速翻炒至轉白即可。`,
  },
  {
    name: '低脂蝦仁炒飯',
    ingredients: ['蝦仁', '白飯', '糙米飯', '雞蛋', '玉米筍'],
    calories: 420,
    protein: 25,
    carbs: 60,
    fat: 8,
    recipe: `1. 蛋液炒半熟撈起。\n2. 炒香蝦仁與玉米筍丁。\n3. 加冷飯翻炒，倒回蛋液，鹽與胡椒調味。`,
  },
  {
    name: '日式牛肉洋蔥丼',
    ingredients: ['牛肉', '洋蔥', '白飯', '蛋'],
    calories: 480,
    protein: 22,
    carbs: 65,
    fat: 14,
    recipe: `1. 洋蔥絲與醬油、糖、水煮滾。\n2. 加牛肉煮熟。\n3. 淋上蛋液燜 10 秒後淋在飯上。`,
  },
  {
    name: '泰式涼拌透抽',
    ingredients: ['透抽', '軟絲', '番茄', '洋蔥'],
    calories: 150,
    protein: 20,
    carbs: 12,
    fat: 2,
    recipe: `1. 透抽燙熟過冰水切圈。\n2. 加洋蔥、番茄，淋上魚露、檸檬汁拌勻。`,
  },
  {
    name: '蒜泥毛豆拌肉片',
    ingredients: ['毛豆', '豬肉', '肉片', '蒜'],
    calories: 290,
    protein: 22,
    carbs: 10,
    fat: 18,
    recipe: `1. 肉片與毛豆燙熟瀝乾。\n2. 調製蒜泥醬(蒜、醬油、香油)。\n3. 大碗拌勻撒上芝麻。`,
  },
  {
    name: '咖哩鮮蔬嫩雞',
    ingredients: ['雞肉', '雞胸肉', '地瓜', '紅蘿蔔', '洋蔥'],
    calories: 380,
    protein: 32,
    carbs: 45,
    fat: 7,
    recipe: `1. 地瓜、紅蘿蔔蒸熟。\n2. 炒香雞肉與洋蔥，加水與咖哩粉煮溶。\n3. 加入蒸好的地瓜拌勻收汁。`,
  },
  {
    name: '香烤秋葵豆腐餅',
    ingredients: ['豆腐', '秋葵', '雞蛋', '蛋'],
    calories: 210,
    protein: 15,
    carbs: 10,
    fat: 12,
    recipe: `1. 豆腐壓碎去水，秋葵切丁。\n2. 混和雞蛋與麵粉捏成餅狀。\n3. 小火煎至兩面金黃。`,
  },
  {
    name: '蒜香橄欖油蝦仁',
    ingredients: ['蝦仁', '蒜', '橄欖油'],
    calories: 210,
    protein: 18,
    carbs: 2,
    fat: 15,
    recipe: `1. 蝦仁洗淨擦乾。\n2. 橄欖油小火煸香蒜末。\n3. 加入蝦仁炒至變色，黑胡椒調味。`,
  },
  {
    name: '梅花豬燙青菜',
    ingredients: ['梅花豬', '高麗菜', '地瓜葉', '青江菜'],
    calories: 280,
    protein: 20,
    carbs: 6,
    fat: 18,
    recipe: `1. 肉片與青菜分別燙熟撈起。\n2. 淋上蒜末醬油拌勻。`,
  },
  {
    name: '味噌豆腐煮魚',
    ingredients: ['豆腐', '鯛魚', '鮭魚'],
    calories: 240,
    protein: 30,
    carbs: 8,
    fat: 10,
    recipe: `1. 豆腐與魚片入水煮滾。\n2. 轉小火攪散味噌溶入湯中。\n3. 撒蔥花即可。`,
  },
  {
    name: '香煎里肌佐洋蔥',
    ingredients: ['豬里肌', '洋蔥'],
    calories: 220,
    protein: 24,
    carbs: 10,
    fat: 8,
    recipe: `1. 里肌肉煎金黃撈起。\n2. 洋蔥炒甜倒回肉片翻炒。`,
  },
  {
    name: '清炒鮮菇玉米筍',
    ingredients: ['香菇', '杏鮑菇', '玉米筍'],
    calories: 120,
    protein: 6,
    carbs: 15,
    fat: 2,
    recipe: `1. 菇類炒出水，加玉米筍燜 2 分鐘，鹽調味。`,
  },
  {
    name: '泡菜豬肉炒豆腐',
    ingredients: ['豬肉', '肉片', '豆腐'],
    calories: 310,
    protein: 22,
    carbs: 12,
    fat: 18,
    recipe: `1. 豆腐丁煎黃。\n2. 下肉片與泡菜炒熟，倒回豆腐收汁。`,
  },
  {
    name: '地瓜泥雞肉球',
    ingredients: ['地瓜', '雞肉', '雞胸肉'],
    calories: 290,
    protein: 25,
    carbs: 35,
    fat: 5,
    recipe: `1. 地瓜泥拌雞肉燥，捏成球。\n2. 煎熟或氣炸即可。`,
  },
  {
    name: '洋蔥蛋炒飯',
    ingredients: ['洋蔥', '雞蛋', '白飯', '糙米飯'],
    calories: 450,
    protein: 15,
    carbs: 60,
    fat: 15,
    recipe: `1. 洋蔥炒香，加蛋炒半凝固。\n2. 加飯翻炒，淋醬油增香。`,
  },
  {
    name: '義式番茄鯛魚湯',
    ingredients: ['番茄', '牛番茄', '鯛魚'],
    calories: 160,
    protein: 22,
    carbs: 10,
    fat: 3,
    recipe: `1. 番茄丁炒出油加水煮滾。\n2. 放鯛魚煮熟加香料。`,
  },
  {
    name: '青花菜炒雞丁',
    ingredients: ['青花菜', '雞肉', '雞胸肉'],
    calories: 240,
    protein: 32,
    carbs: 8,
    fat: 6,
    recipe: `1. 青花菜燙熟。\n2. 雞胸丁炒變色加入菜與鹽翻炒。`,
  },
  {
    name: '蒜香奶油秋刀魚',
    ingredients: ['秋刀魚', '蒜'],
    calories: 330,
    protein: 18,
    carbs: 2,
    fat: 28,
    recipe: `1. 魚煎酥，加奶油蒜片提香，擠檸檬汁。`,
  },
  {
    name: '豆腐拌燙青菜',
    ingredients: ['豆腐', '嫩豆腐', '菠菜', '地瓜葉'],
    calories: 150,
    protein: 12,
    carbs: 8,
    fat: 7,
    recipe: `1. 青菜燙熟過冷水。\n2. 混合豆腐、醬油膏與香油。`,
  },
  {
    name: '咖哩牛肉玉米飯',
    ingredients: ['牛肉', '玉米', '白飯', '洋蔥'],
    calories: 520,
    protein: 28,
    carbs: 70,
    fat: 16,
    recipe: `1. 洋蔥牛肉炒香，加水、玉米、咖哩粉燉煮淋在飯上。`,
  },
  {
    name: '塔香蝦仁烘蛋',
    ingredients: ['蝦仁', '雞蛋', '蛋'],
    calories: 280,
    protein: 22,
    carbs: 4,
    fat: 20,
    recipe: `1. 蝦仁炒半熟。\n2. 蛋液加九層塔碎入鍋，鋪蝦仁烘熟。`,
  },
  {
    name: '馬鈴薯雞肉湯',
    ingredients: ['馬鈴薯', '雞肉', '紅蘿蔔', '洋蔥'],
    calories: 340,
    protein: 26,
    carbs: 40,
    fat: 8,
    recipe: `1. 炒香食材加水燉煮 20 分鐘至馬鈴薯軟爛。`,
  },
  {
    name: '煎鮭魚佐秋葵',
    ingredients: ['鮭魚', '秋葵'],
    calories: 320,
    protein: 22,
    carbs: 6,
    fat: 22,
    recipe: `1. 魚煎酥撈起，魚油煎秋葵，簡單鹽調味。`,
  },
  {
    name: '黑胡椒牛肉炒菇',
    ingredients: ['牛肉', '杏鮑菇', '香菇'],
    calories: 300,
    protein: 25,
    carbs: 8,
    fat: 18,
    recipe: `1. 牛肉加胡椒醃，菇炒乾加肉片大火炒熟。`,
  },
  {
    name: '紅蘿蔔絲炒蛋',
    ingredients: ['紅蘿蔔', '雞蛋', '蛋'],
    calories: 190,
    protein: 10,
    carbs: 12,
    fat: 12,
    recipe: `1. 蘿蔔絲炒軟出油，倒入蛋液翻炒。`,
  },
  {
    name: '薑絲魚片湯',
    ingredients: ['鯛魚', '鮭魚'],
    calories: 140,
    protein: 24,
    carbs: 2,
    fat: 4,
    recipe: `1. 薑絲煮出味，下魚片煮滾關火，加米酒鹽。`,
  },
  {
    name: '洋蔥燉豬排',
    ingredients: ['豬里肌', '洋蔥'],
    calories: 260,
    protein: 25,
    carbs: 12,
    fat: 12,
    recipe: `1. 豬排煎黃，加洋蔥絲、醬油、糖水燉 10 分鐘。`,
  },
];

const ACTIVITY_LEVELS = [
  { value: 1.2, label: '久坐', desc: '辦公室工作、極少運動' },
  { value: 1.375, label: '輕度', desc: '每週運動 1-3 天' },
  { value: 1.55, label: '中度', desc: '每週運動 3-5 天' },
  { value: 1.725, label: '高度', desc: '每週運動 6-7 天' },
  { value: 1.9, label: '極高', desc: '勞力工作、運動員' },
];

const MEAL_TYPES = {
  // 💡 保留舊的英文設定，確保您以前紀錄的資料不會壞掉
  breakfast: {
    label: '早餐',
    icon: Coffee,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
  },
  lunch: {
    label: '午餐',
    icon: Sun,
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  dinner: {
    label: '晚餐',
    icon: Moon,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  snack: {
    label: '點心',
    icon: Apple,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },

  // 🌟 新增：對應我們剛剛做的新中文餐別
  早餐: {
    label: '早餐',
    icon: Coffee,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
  },
  午餐: {
    label: '午餐',
    icon: Sun,
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  下午茶: {
    label: '下午茶',
    icon: Coffee,
    color: 'text-amber-600',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  晚餐: {
    label: '晚餐',
    icon: Moon,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  宵夜: {
    label: '宵夜',
    icon: Moon,
    color: 'text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  小食: {
    label: '小食',
    icon: Apple,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  隨飲: {
    label: '隨飲',
    icon: GlassWater,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
};

const generateMockDates = (days) =>
  Array.from({ length: days }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });
const MOCK_TRENDS = {
  week: [45, 60, 50, 80, 65, 75, 90].map((val, i) => ({
    val,
    date: generateMockDates(7)[i],
  })),
  month: [40, 45, 50, 45, 60, 55, 65, 70, 60, 80, 75, 85, 90, 85, 95].map(
    (val, i) => ({ val, date: generateMockDates(15)[i] })
  ),
  year: [30, 35, 45, 50, 55, 60, 70, 75, 80, 85, 90, 95].map((val, i) => ({
    val,
    date: `${i + 1}月`,
  })),
};

export default function App() {
  // 1. 介面控制狀態
  const [activeTab, setActiveTab] = useState('diet');
  const [trendDays, setTrendDays] = useState(7); // 🌟 新增：用來控制趨勢圖表要顯示 7 天還是 30 天
  const [selectedHistoryDate, setSelectedHistoryDate] = useState(
    new Date().toLocaleDateString()
  );
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);
  const [targetAddDate, setTargetAddDate] = useState(null); // 🌟 新增：記住您想要補登哪一天
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [tempName, setTempName] = useState('');
  const [sleepInput, setSleepInput] = useState('');
  const [trendPeriod, setTrendPeriod] = useState('week');
  const [shoppingInput, setShoppingInput] = useState('');
  const [fridgeInput, setFridgeInput] = useState('');
  // 🌙 深色模式狀態與切換邏輯 (自動讀取系統偏好或上次儲存的設定)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 當 isDarkMode 改變時，幫整個網頁加上或移除 'dark' 標籤
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  // 2. 用戶核心資料 (搬到最上面，因為後面的資料都依賴它)
  const [currentUserId, setCurrentUserId] = useState('u1');
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('health_system_users');
    if (savedUsers) return JSON.parse(savedUsers);
    return [
      {
        id: 'u1',
        name: '我的檔案',
        age: 28,
        gender: 'male',
        height: 175,
        weight: 72,
        bodyFat: 20,
        activityLevel: 1.2,
        targetCalories: 2200,
        targetCarbs: 275,
        targetProtein: 165,
        targetFat: 50,
        waterCurrent: 800,
        sleepTarget: 8,
        sleepEntries: [],
        entries: [],
        bodyRecords: [],
        shoppingList: [
          { id: 's1', name: '雞胸肉 2包', checked: false },
          { id: 's2', name: '花椰菜', checked: true },
        ],
        fridgeItems: [
          { id: 'f1', name: '雞蛋 (剩4顆)' },
          { id: 'f2', name: '牛番茄' },
        ],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('health_system_users', JSON.stringify(users));
  }, [users]);

  // 🌟 破案關鍵：永遠取得「絕對正確的當前用戶」，防止幽靈 ID
  const currentUser = useMemo(() => {
    return users.find((u) => u.id === currentUserId) || users[0];
  }, [users, currentUserId]);

  // 3. 飲食紀錄資料庫 (現在它可以安全地使用正確的 currentUser.id 了)
  const [dietRecords, setDietRecords] = useState(() => {
    const saved = localStorage.getItem('health_diet_records');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((r) => (r.userId ? r : { ...r, userId: currentUser.id }));
  });

  useEffect(() => {
    localStorage.setItem('health_diet_records', JSON.stringify(dietRecords));
  }, [dietRecords]);

  const currentUserDietRecords = useMemo(() => {
    return dietRecords.filter((r) => r.userId === currentUser.id);
  }, [dietRecords, currentUser.id]);

  // 4. 常用餐點與統計數據
  const [favoriteMeals, setFavoriteMeals] = useState(() => {
    const saved = localStorage.getItem('health_favorite_meals');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'health_favorite_meals',
      JSON.stringify(favoriteMeals)
    );
  }, [favoriteMeals]);

  // 🌟 升級版收藏大腦：支援加入、移除與「移動分類」
  const toggleFavorite = (food, folder = '未分類', isMove = false) => {
    setFavoriteMeals((prev) => {
      const isExist = prev.find((f) => f.name === food.name);

      // 如果是「移動模式」且餐點已存在，就只更新它的資料夾，不移除它
      if (isMove && isExist) {
        return prev.map((f) => (f.name === food.name ? { ...f, folder } : f));
      }

      // 如果是一般點擊星星，存在就移除，不存在就加入
      if (isExist) return prev.filter((f) => f.name !== food.name);
      return [...prev, { ...food, isFavorite: true, folder }];
    });
  };

  const stats = useMemo(() => {
    let bmr =
      10 * currentUser.weight + 6.25 * currentUser.height - 5 * currentUser.age;
    bmr = currentUser.gender === 'male' ? bmr + 5 : bmr - 161;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(bmr * currentUser.activityLevel),
    };
  }, [currentUser]);

  const totals = useMemo(() => {
    return currentUser.entries.reduce(
      (acc, e) => ({
        calories: acc.calories + (Number(e.calories) || 0),
        carbs: acc.carbs + (Number(e.carbs) || 0),
        protein: acc.protein + (Number(e.protein) || 0),
        fat: acc.fat + (Number(e.fat) || 0),
      }),
      { calories: 0, carbs: 0, protein: 0, fat: 0 }
    );
  }, [currentUser]);

  // === 📊 狀態與大腦邏輯升級 ===

  // 🌟 取得當前的「虛擬日期」(夜貓子邏輯)
  const activeDate = useMemo(() => {
    return currentUser.entries.length > 0
      ? currentUser.entries[0].date
      : new Date().toLocaleDateString();
  }, [currentUser.entries]);

  // 5. 核心操作函式
  const updateCurrentUser = (data) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...data } : u))
    );

  // === 🏋️‍♂️ 健身系統大腦 ===
  const [workoutRecords, setWorkoutRecords] = useState(() => {
    const saved = localStorage.getItem('health_workout_records');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem(
      'health_workout_records',
      JSON.stringify(workoutRecords)
    );
  }, [workoutRecords]);
  const currentUserWorkoutRecords = useMemo(
    () => workoutRecords.filter((r) => r.userId === currentUser.id),
    [workoutRecords, currentUser.id]
  );

  const handleWorkoutCheckIn = (partId, targetDate = null) => {
    const finalDate = targetDate || activeDate;
    setWorkoutRecords((prev) => {
      const targetRecord = prev.find(
        (r) => r.date === finalDate && r.userId === currentUser.id
      );
      if (targetRecord) {
        const newParts = targetRecord.parts.includes(partId)
          ? targetRecord.parts.filter((p) => p !== partId)
          : [...targetRecord.parts, partId];
        return prev.map((r) =>
          r.date === finalDate && r.userId === currentUser.id
            ? { ...r, parts: newParts }
            : r
        );
      } else {
        return [
          ...prev,
          { userId: currentUser.id, date: finalDate, parts: [partId] },
        ];
      }
    });
  };

  // === 💧 飲水系統大腦 (升級為歷史紀錄版) ===
  const [waterRecords, setWaterRecords] = useState(() => {
    const saved = localStorage.getItem('health_water_records');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('health_water_records', JSON.stringify(waterRecords));
  }, [waterRecords]);
  const currentUserWaterRecords = useMemo(
    () => waterRecords.filter((r) => r.userId === currentUser.id),
    [waterRecords, currentUser.id]
  );

  const handleAddWater = (amount, isReset = false) => {
    setWaterRecords((prev) => {
      const targetRecord = prev.find(
        (r) => r.date === activeDate && r.userId === currentUser.id
      );
      if (isReset)
        return targetRecord
          ? prev.filter((r) => r.id !== targetRecord.id)
          : prev;
      if (targetRecord)
        return prev.map((r) =>
          r.id === targetRecord.id ? { ...r, amount: r.amount + amount } : r
        );
      return [
        ...prev,
        {
          id: Date.now().toString(),
          userId: currentUser.id,
          date: activeDate,
          amount,
        },
      ];
    });
  };

  const todayWater = useMemo(() => {
    return (
      currentUserWaterRecords.find((r) => r.date === activeDate)?.amount || 0
    );
  }, [currentUserWaterRecords, activeDate]);

  // === 🛏️ 睡眠系統大腦 (升級為歷史紀錄版) ===
  const [sleepRecords, setSleepRecords] = useState(() => {
    const saved = localStorage.getItem('health_sleep_records');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('health_sleep_records', JSON.stringify(sleepRecords));
  }, [sleepRecords]);
  const currentUserSleepRecords = useMemo(
    () => sleepRecords.filter((r) => r.userId === currentUser.id),
    [sleepRecords, currentUser.id]
  );

  const handleAddSleep = () => {
    if (!sleepInput || Number(sleepInput) <= 0) return;
    const newEntry = {
      id: Date.now().toString(),
      userId: currentUser.id,
      date: activeDate,
      hours: Number(sleepInput),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSleepRecords((prev) => [newEntry, ...prev]);
    setSleepInput('');
  };

  const handleDeleteSleep = (id) =>
    setSleepRecords((prev) => prev.filter((r) => r.id !== id));
  const handleClearTodaySleep = () =>
    setSleepRecords((prev) =>
      prev.filter(
        (r) => !(r.date === activeDate && r.userId === currentUser.id)
      )
    );

  const todaySleepRecords = useMemo(() => {
    return currentUserSleepRecords.filter((r) => r.date === activeDate);
  }, [currentUserSleepRecords, activeDate]);

  const totalSleep = useMemo(() => {
    return todaySleepRecords.reduce((acc, e) => acc + e.hours, 0);
  }, [todaySleepRecords]);

  // === 💩 排便紀錄大腦 ===
  const [poopRecords, setPoopRecords] = useState(() => {
    const saved = localStorage.getItem('health_poop_records');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('health_poop_records', JSON.stringify(poopRecords));
  }, [poopRecords]);
  const currentUserPoopRecords = useMemo(
    () => poopRecords.filter((r) => r.userId === currentUser.id),
    [poopRecords, currentUser.id]
  );
  const handleAddPoop = (poopData) => {
    const newEntry = {
      id: Date.now().toString(),
      userId: currentUser.id,
      date: activeDate,
      data: poopData,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setPoopRecords((prev) => [newEntry, ...prev]);
  };
  const handleDeletePoop = (id) =>
    setPoopRecords((prev) => prev.filter((r) => r.id !== id));
  const todayPoopRecords = useMemo(() => {
    return currentUserPoopRecords.filter((r) => r.date === activeDate);
  }, [currentUserPoopRecords, activeDate]);

  // === 🔥 連續打卡天數系統 (Streak System) 防崩潰升級版 ===
  const currentStreak = useMemo(() => {
    try {
      const allDates = new Set(
        [
          ...currentUserDietRecords.map((r) => r.date),
          ...currentUserWorkoutRecords.map((r) => r.date),
          ...currentUserWaterRecords.map((r) => r.date),
          ...currentUserSleepRecords.map((r) => r.date),
          ...currentUserPoopRecords.map((r) => r.date),
        ].filter(Boolean)
      );

      let streak = 0;
      let checkDateStr = activeDate;

      // 🌟 針對手機版 Safari 的防護：將可能的 "-" 替換為 "/" 確保能被解析
      let safeDateStr = activeDate ? activeDate.replace(/-/g, '/') : '';
      let checkDateObj = new Date(safeDateStr);

      // 如果手機還是無法解析這個日期，直接回傳 0，絕不讓畫面白屏崩潰
      if (isNaN(checkDateObj.getTime())) return 0;

      if (allDates.has(checkDateStr)) {
        streak++;
        checkDateObj.setDate(checkDateObj.getDate() - 1);
        checkDateStr = checkDateObj.toLocaleDateString();
      } else {
        checkDateObj.setDate(checkDateObj.getDate() - 1);
        checkDateStr = checkDateObj.toLocaleDateString();
        if (!allDates.has(checkDateStr)) return 0;
      }

      while (allDates.has(checkDateStr)) {
        streak++;
        checkDateObj.setDate(checkDateObj.getDate() - 1);
        checkDateStr = checkDateObj.toLocaleDateString();
      }
      return streak;
    } catch (error) {
      // 萬一發生任何預期外的錯誤，將錯誤印在背景，並安全回傳 0
      console.error('Streak calculation error protected:', error);
      return 0;
    }
  }, [
    currentUserDietRecords,
    currentUserWorkoutRecords,
    currentUserWaterRecords,
    currentUserSleepRecords,
    currentUserPoopRecords,
    activeDate,
  ]);
  // ===========================================
  // ===========================================
  // ===========================================
  // 🌟 1. 支援「補登功能」的完美新增餐點邏輯
  const handleAddEntry = (newEntriesPayload) => {
    // 預設的夜貓子日期
    const defaultActiveDate =
      currentUser.entries.length > 0
        ? currentUser.entries[0].date
        : new Date().toLocaleDateString();

    // 🌟 最終日期：優先使用您在日曆選擇的「補登日期」，否則就用首頁的預設日期
    const finalDate = targetAddDate || defaultActiveDate;

    const entriesToAdd = Array.isArray(newEntriesPayload)
      ? newEntriesPayload
      : [newEntriesPayload];

    const finalEntries = entriesToAdd.map((entry, index) => ({
      ...entry,
      id: Date.now().toString() + '-' + index,
      date: finalDate, // 👈 蓋上精準的過去日期印章
      userId: currentUser.id,
    }));

    // 🌟 判斷這筆餐點是不是記在「目前首頁正在顯示的這天」
    const isAddingToCurrentView = finalDate === defaultActiveDate;

    if (isAddingToCurrentView) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === currentUser.id)
            return { ...u, entries: [...finalEntries, ...u.entries] };
          return u;
        })
      );
    }

    // 永遠加進歷史大資料庫
    setDietRecords((prev) => [...finalEntries, ...prev]);

    setIsAddEntryModalOpen(false);
    setTargetAddDate(null); // 補登完重置狀態
    setSelectedHistoryDate(finalDate); // 確保日曆跳到補登的那天
    if (!isAddingToCurrentView) setActiveTab('history'); // 若是補登舊資料，自動切換到日曆看成果
  };

  // 🌟 補上消失的刪除餐點邏輯
  const handleDeleteEntry = (entryId) => {
    // 1. 從歷史大資料庫中刪除
    setDietRecords((prev) => prev.filter((r) => r.id !== entryId));

    // 2. 從當前用戶的今日面板中刪除 (如果是今天的紀錄)
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            entries: u.entries.filter((e) => e.id !== entryId),
          };
        }
        return u;
      })
    );
  };

  // (您的 handleNewDay 留在這裡不動)

  // 🌟 加入這段：開啟新的一天邏輯
  const handleNewDay = () => {
    if (
      window.confirm(
        '準備好迎接新的一天了嗎？\n這將會清空面板上的今日飲食、飲水與睡眠進度喔！'
      )
    ) {
      updateCurrentUser({
        entries: [], // 清空今日飲食
        waterCurrent: 0, // 清空今日飲水
        sleepEntries: [], // 清空今日睡眠
      });
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 自動捲回最上方
    }
  };

  const handleAddUser = () => {
    const newUser = {
      id: `u${Date.now()}`,
      name: `新成員 ${users.length + 1}`,
      age: 25,
      gender: 'male',
      height: 170,
      weight: 65,
      bodyFat: 20,
      activityLevel: 1.2,
      targetCalories: 2000,
      targetCarbs: 250,
      targetProtein: 125,
      targetFat: 55,
      waterCurrent: 0,
      sleepTarget: 8,
      sleepEntries: [],
      entries: [],
      bodyRecords: [],
      shoppingList: [],
      fridgeItems: [],
    };
    setUsers([...users, newUser]);
    setCurrentUserId(newUser.id);
  };

  const handleDeleteUser = (id, e) => {
    e.stopPropagation();
    if (users.length <= 1) return;
    const newUsers = users.filter((u) => u.id !== id);
    setUsers(newUsers);
    if (currentUserId === id) setCurrentUserId(newUsers[0].id);
  };

  const handleSaveBodyRecord = () => {
    if (!currentUser.weight) return;
    updateCurrentUser({
      bodyRecords: [
        {
          id: Date.now().toString(),
          weight: currentUser.weight,
          bodyFat: currentUser.bodyFat,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        ...currentUser.bodyRecords,
      ],
    });
  };

  const handleAddShoppingItem = () => {
    if (shoppingInput.trim()) {
      updateCurrentUser({
        shoppingList: [
          { id: Date.now().toString(), name: shoppingInput, checked: false },
          ...currentUser.shoppingList,
        ],
      });
      setShoppingInput('');
    }
  };
  const handleToggleShoppingItem = (id) =>
    updateCurrentUser({
      shoppingList: currentUser.shoppingList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  const handleDeleteShoppingItem = (id) =>
    updateCurrentUser({
      shoppingList: currentUser.shoppingList.filter((item) => item.id !== id),
    });
  const handleMoveToFridge = (item) =>
    updateCurrentUser({
      shoppingList: currentUser.shoppingList.filter((i) => i.id !== item.id),
      fridgeItems: [
        { id: Date.now().toString(), name: item.name },
        ...currentUser.fridgeItems,
      ],
    });
  const handleAddFridgeItem = () => {
    if (fridgeInput.trim()) {
      updateCurrentUser({
        fridgeItems: [
          { id: Date.now().toString(), name: fridgeInput },
          ...currentUser.fridgeItems,
        ],
      });
      setFridgeInput('');
    }
  };
  const handleDeleteFridgeItem = (id) =>
    updateCurrentUser({
      fridgeItems: currentUser.fridgeItems.filter((item) => item.id !== id),
    });
  // 💾 數據備份與還原功能 (一鍵保險箱)
  const handleBackupData = () => {
    try {
      const allData = {};
      // 遍歷抓取所有保存在瀏覽器的健康資料
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('health_')) {
          // 只備份我們 App 的資料
          allData[key] = localStorage.getItem(key);
        }
      }

      const dataStr = JSON.stringify(allData, null, 2);
      const dataUri =
        'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `HealthApp_Backup_${new Date()
        .toISOString()
        .slice(0, 10)}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      alert('✅ 備份成功！請妥善保存下載的 .json 檔案。');
    } catch (error) {
      alert('❌ 備份失敗：' + error.message);
    }
  };

  const handleRestoreData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (
          window.confirm(
            '⚠️ 警告：還原將會「覆蓋」目前的所有紀錄！\n確定要繼續嗎？'
          )
        ) {
          // 清除舊資料並寫入新資料
          Object.keys(importedData).forEach((key) => {
            localStorage.setItem(key, importedData[key]);
          });
          alert('🎊 數據還原成功！網頁將自動重新整理以載入最新數據。');
          window.location.reload();
        }
      } catch (error) {
        alert('❌ 還原失敗：檔案格式不正確！請確保上傳的是正確的備份檔。');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // 重置 input 狀態
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-32 font-sans">
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button
            onClick={() => setIsUserModalOpen(true)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-active:scale-95 transition-all">
              <User size={20} />
            </div>
            <div className="text-left">
              <h1 className="text-xs font-black tracking-tight flex items-center gap-1">
                {currentUser.name} <ChevronDown size={12} />
              </h1>
              <p className="text-[10px] font-bold text-slate-400">
                今日目標 {currentUser.targetCalories} kcal
              </p>
            </div>
          </button>

          {/* 🌟 核心升級：右側按鈕群組 (連勝火焰 + 日夜切換 + 設定) */}
          <div className="flex items-center gap-2">
            {currentStreak > 0 && (
              <div
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/30 dark:to-rose-900/30 text-orange-600 dark:text-orange-400 rounded-xl font-black text-xs shadow-sm animate-in fade-in zoom-in"
                title={`您已連續記錄 ${currentStreak} 天！繼續保持！`}
              >
                <Flame
                  size={14}
                  className="fill-orange-500 text-orange-500 animate-pulse"
                />
                <span>{currentStreak}</span>
              </div>
            )}

            {/* 👇 ====== 這是我們新加的：深色模式切換按鈕 ====== 👇 */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="切換深色/淺色模式"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* 👆 ============================================== 👆 */}

            {/* 這是原本的設定按鈕 */}
            <div
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsUserModalOpen(true)}
            >
              <Settings size={18} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-md mx-auto px-6 py-6 space-y-8">
        <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-2xl">
          {['diet', 'inventory', 'sleep', 'stats'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm'
                  : 'text-slate-400'
              }`}
            >
              {tab === 'diet'
                ? '飲食'
                : tab === 'inventory'
                ? '食材'
                : tab === 'sleep'
                ? '睡眠'
                : '數據'}
            </button>
          ))}
        </div>

        {activeTab === 'diet' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* 1. 核心升級：熱量與營養素雙重視覺化看板 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              {/* 上半部：熱量進度維持不變 */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    熱量進度
                  </p>
                  <h2 className="text-4xl font-black text-indigo-600">
                    {Math.round(totals.calories)}{' '}
                    <span className="text-sm text-slate-300">
                      / {currentUser.targetCalories} kcal
                    </span>
                  </h2>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl">
                  <Flame size={24} />
                </div>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-indigo-600 transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      (totals.calories / currentUser.targetCalories) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>

              {/* 🌟 下半部全新：營養素比例圓餅圖 (Macro Donut Chart) */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50">
                <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-1.5">
                  <PieChart size={14} /> 今日營養素比例
                </h4>

                <div className="flex items-center gap-6">
                  {/* 左側：精美 CSS 圓餅圖 */}
                  {(() => {
                    const totalMacros =
                      totals.carbs + totals.protein + totals.fat;
                    const carbsPct =
                      totalMacros > 0 ? (totals.carbs / totalMacros) * 100 : 0;
                    const proteinPct =
                      totalMacros > 0
                        ? (totals.protein / totalMacros) * 100
                        : 0;
                    // 使用 Tailwind 顏色對應的 Hex 色碼: Amber(#f59e0b), Rose(#f43f5e), Emerald(#10b981)
                    const conicBg =
                      totalMacros > 0
                        ? `conic-gradient(#f59e0b 0% ${carbsPct}%, #f43f5e ${carbsPct}% ${
                            carbsPct + proteinPct
                          }%, #10b981 ${carbsPct + proteinPct}% 100%)`
                        : 'conic-gradient(#e2e8f0 0% 100%)'; // 沒紀錄時顯示灰色

                    return (
                      <div
                        className="w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner relative transition-all duration-700"
                        style={{ background: conicBg }}
                      >
                        {/* 圓餅圖的中心空洞 (製造 Donut 效果) */}
                        <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex flex-col items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] absolute">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            總克數
                          </span>
                          <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                            {Math.round(totalMacros)}g
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 右側：三大營養素進度條 (變更為直立排版，成為圓餅圖的圖例) */}
                  <div className="flex-1 flex flex-col gap-3.5">
                    <NutrientStat
                      label="碳水"
                      current={totals.carbs}
                      target={currentUser.targetCarbs}
                      color="bg-amber-500"
                      icon={Wheat}
                    />
                    <NutrientStat
                      label="蛋白"
                      current={totals.protein}
                      target={currentUser.targetProtein}
                      color="bg-rose-500"
                      icon={Beef}
                    />
                    <NutrientStat
                      label="脂肪"
                      current={totals.fat}
                      target={currentUser.targetFat}
                      color="bg-emerald-500"
                      icon={Droplet}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 🌟 核心新功能：今日剩餘配額貼心提示 */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/30 mb-6">
              <h4 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={14} /> 今日剩餘配額提示
              </h4>

              <div className="space-y-4">
                {/* 熱量文字提示 */}
                {(() => {
                  // ✅ 修改後的乾淨程式碼：
                  const remCal = Math.round(
                    currentUser.targetCalories - totals.calories
                  );
                  return (
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        您今天還能攝取
                      </span>
                      <span
                        className={`text-2xl font-black ${
                          remCal > 0 ? 'text-indigo-600' : 'text-rose-500'
                        }`}
                      >
                        {Math.abs(remCal)}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        kcal {remCal < 0 && '(已超標)'}
                      </span>
                    </div>
                  );
                })()}

                {/* 三大營養素細節提示 */}
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    {
                      label: '蛋白質',
                      current: totals.protein,
                      target: currentUser.targetProtein,
                      color: 'text-rose-500',
                      icon: Beef,
                    },
                    {
                      label: '碳水',
                      current: totals.carbs,
                      target: currentUser.targetCarbs,
                      color: 'text-amber-500',
                      icon: Wheat,
                    },
                    {
                      label: '脂肪',
                      current: totals.fat,
                      target: currentUser.targetFat,
                      color: 'text-emerald-500',
                      icon: Droplet,
                    },
                  ].map((macro) => {
                    const remaining = Math.max(
                      0,
                      Math.round(macro.target - macro.current)
                    );
                    const isOver = macro.current > macro.target;

                    return (
                      <div
                        key={macro.label}
                        className="flex items-center justify-between bg-white/50 dark:bg-slate-800/50 p-3 rounded-2xl border border-white dark:border-slate-700/50"
                      >
                        <div className="flex items-center gap-2">
                          <macro.icon size={14} className={macro.color} />
                          <span className="text-xs font-bold text-slate-500">
                            {macro.label}
                          </span>
                        </div>
                        <div className="text-right">
                          {isOver ? (
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-tighter">
                              ⚠️ 已達標/超標
                            </span>
                          ) : (
                            <p className="text-xs font-black text-slate-700 dark:text-slate-200">
                              還可吃{' '}
                              <span className={macro.color}>{remaining}</span> g
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[9px] font-bold text-slate-400 text-center italic mt-2">
                  💡 建議優先攝取足量蛋白質，並根據剩餘熱量分配碳水與脂肪。
                </p>
              </div>
            </div>
            {/* 2. 每日紀錄 Header */}
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-lg tracking-tight">每日紀錄</h3>

              {/* 🌟 核心更新：加入「新的一天」重置按鈕 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNewDay}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl flex items-center gap-1 shadow-sm text-[10px] font-black uppercase transition-all"
                  title="重置今日所有進度"
                >
                  <RotateCcw size={14} /> 新的一天
                </button>
                <button
                  onClick={() => {
                    setTargetAddDate(null);
                    setIsAddEntryModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2 shadow-lg text-[10px] font-black uppercase"
                >
                  <Plus size={16} /> 新增餐點
                </button>
              </div>
            </div>

            {/* 3. 每日紀錄清單 (純文字餐別標籤版) */}
            <div className="space-y-3">
              {currentUser.entries.length === 0 ? (
                <div className="text-center py-10 opacity-30">
                  <History size={40} className="mx-auto mb-2" />
                  <p className="text-xs font-bold">尚無今日飲食紀錄</p>
                </div>
              ) : (
                currentUser.entries.map((e) => (
                  <div
                    key={e.id}
                    className="bg-white dark:bg-slate-900 p-4 rounded-2xl flex flex-col gap-3 border border-slate-50 dark:border-slate-800 shadow-sm"
                  >
                    {/* 上半部：維持原本的左右排版 */}
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-3 py-1.5 rounded-lg font-black text-[10px] whitespace-nowrap tracking-widest ${
                            MEAL_TYPES[e.mealType || e.type || 'lunch']?.bg
                          } ${
                            MEAL_TYPES[e.mealType || e.type || 'lunch']?.color
                          }`}
                        >
                          {MEAL_TYPES[e.mealType || e.type || 'lunch']?.label ||
                            e.mealType ||
                            '午餐'}
                        </div>

                        <div>
                          <p className="text-xs font-black">{e.name}</p>
                          <p className="text-[9px] font-bold text-slate-400">
                            {e.amount}
                            {e.unit} • {e.calories} kcal
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[9px] font-black text-rose-500">
                            {e.protein}g 蛋白
                          </p>
                          <p className="text-[8px] font-bold text-slate-300">
                            {e.time}
                          </p>
                        </div>
                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            if (window.confirm('確定要刪除這筆紀錄嗎？')) {
                              handleDeleteEntry(e.id);
                            }
                          }}
                          className="text-slate-300 hover:text-rose-500 p-2 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* 👇 核心新功能：筆記與心情顯示區塊 👇 */}
                    {(e.note || e.mood) && (
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 flex gap-2 items-start mt-1">
                        <span className="text-sm shrink-0">
                          {e.mood || '😊'}
                        </span>
                        <p className="text-[10px] font-bold text-slate-500 leading-relaxed break-all pt-0.5">
                          {e.note || '無特別備註'}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h4 className="font-black text-lg tracking-tight flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <ShoppingCart size={20} /> 購物單
                </h4>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={shoppingInput}
                  onChange={(e) => setShoppingInput(e.target.value)}
                  placeholder="新增待買食材..."
                  className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black border-2 border-transparent focus:border-indigo-400 outline-none transition-all"
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleAddShoppingItem()
                  }
                />
                <button
                  onClick={handleAddShoppingItem}
                  className="px-4 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-xl font-black text-xs hover:bg-indigo-200 transition-all"
                >
                  新增
                </button>
              </div>
              <div className="space-y-2">
                {currentUser.shoppingList.length === 0 ? (
                  <p className="text-center text-[10px] font-bold text-slate-400 py-4">
                    目前沒有待買物品
                  </p>
                ) : (
                  currentUser.shoppingList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl group border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 transition-colors"
                    >
                      <div
                        className="flex items-center gap-3 flex-1 cursor-pointer"
                        onClick={() => handleToggleShoppingItem(item.id)}
                      >
                        <div
                          className={`text-${
                            item.checked ? 'indigo-500' : 'slate-300'
                          }`}
                        >
                          {item.checked ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <Circle size={18} />
                          )}
                        </div>
                        <span
                          className={`text-sm font-black ${
                            item.checked
                              ? 'line-through text-slate-400'
                              : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.checked && (
                          <button
                            onClick={() => handleMoveToFridge(item)}
                            className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg flex items-center gap-1 text-[10px] font-black"
                            title="移至冰箱"
                          >
                            <ArrowRightLeft size={14} /> 移至冰箱
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteShoppingItem(item.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h4 className="font-black text-lg tracking-tight flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Refrigerator size={20} /> 我的冰箱
                </h4>
                <button
                  onClick={() => setIsRecipeModalOpen(true)}
                  className="px-3 py-2 bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-xl text-[10px] font-black flex items-center gap-1.5 hover:bg-cyan-100 transition-colors"
                >
                  <ChefHat size={14} /> 建議菜單
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={fridgeInput}
                  onChange={(e) => setFridgeInput(e.target.value)}
                  placeholder="放入新食材..."
                  className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black border-2 border-transparent focus:border-cyan-400 outline-none transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddFridgeItem()}
                />
                <button
                  onClick={handleAddFridgeItem}
                  className="px-4 bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300 rounded-xl font-black text-xs hover:bg-cyan-200 transition-all"
                >
                  放入
                </button>
              </div>
              <div className="space-y-2">
                {currentUser.fridgeItems.length === 0 ? (
                  <p className="text-center text-[10px] font-bold text-slate-400 py-4">
                    冰箱目前空空的
                  </p>
                ) : (
                  currentUser.fridgeItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl group border border-slate-100 dark:border-slate-700/50"
                    >
                      <span className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                        {item.name}
                      </span>
                      <button
                        onClick={() => handleDeleteFridgeItem(item.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                        title="消耗或刪除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* === 睡眠分頁 === */}
        {activeTab === 'sleep' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">
                      今日睡眠進度
                    </p>
                    <h2 className="text-4xl font-black text-white">
                      {totalSleep}{' '}
                      <span className="text-sm text-indigo-200/60">
                        / {currentUser.sleepTarget} 小時
                      </span>
                    </h2>
                  </div>
                  <div className="p-3 bg-indigo-800/50 text-indigo-300 rounded-2xl backdrop-blur-sm">
                    <Moon size={24} />
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-8">
                  <div
                    className="h-full bg-indigo-400 transition-all duration-700"
                    style={{
                      width: `${Math.min(
                        (totalSleep / currentUser.sleepTarget) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="flex gap-3 mb-2">
                  <input
                    type="number"
                    value={sleepInput}
                    onChange={(e) =>
                      setSleepInput(e.target.value.replace(/^0+/, ''))
                    }
                    placeholder="輸入時數 (如: 1.5)"
                    className="flex-1 p-4 bg-slate-800/80 rounded-2xl text-sm font-black border-2 border-transparent focus:border-indigo-400 outline-none text-white placeholder:text-slate-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSleep()}
                  />
                  <button
                    onClick={handleAddSleep}
                    className="px-6 bg-indigo-500 text-white rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all"
                  >
                    紀錄
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-2 mb-2">
              <h3 className="font-black text-lg tracking-tight">睡眠紀錄</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNewDay}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl flex items-center gap-1 shadow-sm text-[10px] font-black uppercase transition-all"
                  title="重置今日所有進度 (包含飲食、飲水、睡眠)"
                >
                  <RotateCcw size={14} /> 新的一天
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('確定要單獨清空今日的睡眠紀錄嗎？'))
                      handleClearTodaySleep();
                  }}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl flex items-center gap-1 shadow-sm text-[10px] font-black uppercase transition-all"
                  title="僅清空今日睡眠紀錄"
                >
                  <Trash2 size={14} /> 重置
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {todaySleepRecords.length === 0 ? (
                <div className="text-center py-10 opacity-30">
                  <Clock size={40} className="mx-auto mb-2" />
                  <p className="text-xs font-bold">尚無今日睡眠紀錄</p>
                </div>
              ) : (
                todaySleepRecords.map((e) => (
                  <div
                    key={e.id}
                    className="bg-white dark:bg-slate-900 p-4 rounded-2xl flex justify-between items-center border border-slate-50 dark:border-slate-800 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-2xl">
                        <BedDouble size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                          +{e.hours} 小時
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">
                          紀錄時間: {e.time}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSleep(e.id)}
                      className="text-slate-200 hover:text-rose-500 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* 🌟 消耗趨勢圖表 (支援 7日/30日 動態切換) */}
            {(() => {
              const lastDays = Array.from({ length: trendDays }).map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (trendDays - 1 - i));
                return d.toLocaleDateString();
              });

              const realTrendData = lastDays.map((dateStr, i) => {
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() - (trendDays - 1 - i));
                const displayDate = `${targetDate.getDate()}/${
                  targetDate.getMonth() + 1
                }`;

                const dayRecords = currentUserDietRecords.filter(
                  (r) => (r.date || new Date().toLocaleDateString()) === dateStr
                );
                const totalCals = dayRecords.reduce(
                  (sum, r) => sum + Number(r.calories || 0),
                  0
                );
                return {
                  date: displayDate,
                  calories: totalCals,
                  isWeekend:
                    targetDate.getDay() === 0 || targetDate.getDay() === 6, // 標記週末
                };
              });

              const maxCalories =
                Math.max(
                  ...realTrendData.map((d) => d.calories),
                  currentUser.targetCalories || 2000
                ) * 1.1;

              // 計算所選天數區間的總赤字 / 盈餘
              const totalConsumed = realTrendData.reduce(
                (sum, d) => sum + d.calories,
                0
              );
              const rangeTarget =
                (currentUser.targetCalories || 2000) * trendDays;
              const totalDiff = totalConsumed - rangeTarget;

              const isSurplus = totalDiff > 0;
              const isDeficit = totalDiff < 0;
              const diffText = isSurplus
                ? `區間盈餘 +${totalDiff}`
                : isDeficit
                ? `區間赤字 -${Math.abs(totalDiff)}`
                : '完美達標';
              const diffColor = isSurplus
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400'
                : isDeficit
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';

              return (
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-3">
                        <TrendingUp size={16} /> 熱量消耗趨勢
                      </h4>
                      {/* 智慧標籤 */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm flex items-center gap-1 ${diffColor}`}
                        >
                          {diffText}{' '}
                          <span className="text-[8px] opacity-70">kcal</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                          (近 {trendDays} 日累計)
                        </span>
                      </div>
                    </div>
                    {/* 🌟 核心切換按鈕 */}
                    <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl shadow-inner border border-slate-100 dark:border-slate-700">
                      <button
                        onClick={() => setTrendDays(7)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                          trendDays === 7
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                      >
                        7日
                      </button>
                      <button
                        onClick={() => setTrendDays(30)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                          trendDays === 30
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                      >
                        30日
                      </button>
                    </div>
                  </div>

                  <div className="h-48 flex flex-col justify-end mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                    <div
                      className={`h-36 flex items-end justify-between ${
                        trendDays === 30 ? 'gap-0.5' : 'gap-1.5'
                      } mb-2`}
                    >
                      {realTrendData.map((data, i) => (
                        <div
                          key={i}
                          className="w-full bg-indigo-50 dark:bg-indigo-900/20 rounded-t-md relative group flex flex-col justify-end h-full"
                        >
                          <div
                            className={`w-full rounded-t-md transition-all duration-700 ease-out group-hover:opacity-80 ${
                              data.calories > currentUser.targetCalories
                                ? 'bg-rose-400'
                                : data.isWeekend
                                ? 'bg-indigo-400/80'
                                : 'bg-indigo-500'
                            }`}
                            style={{
                              height: `${(data.calories / maxCalories) * 100}%`,
                            }}
                          ></div>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-black shadow-lg">
                            {data.date}: {data.calories} kcal
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center px-1">
                      {realTrendData.map((data, i) => {
                        // 🌟 智慧隱藏標籤：7天全顯示，30天則每隔7天或第一天/最後一天顯示
                        const showLabel =
                          trendDays === 7 ||
                          i === 0 ||
                          i === trendDays - 1 ||
                          i % 7 === 0;
                        return (
                          <div
                            key={`label-${i}`}
                            className="w-full text-center"
                          >
                            <span
                              className={`text-[8px] font-bold text-slate-400 tracking-tighter whitespace-nowrap block truncate transition-opacity duration-300 ${
                                showLabel ? 'opacity-100' : 'opacity-0'
                              }`}
                            >
                              {showLabel ? data.date : '.'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 2. 今日飲水紀錄 (完美連接歷史大腦) */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-2xl shadow-inner">
                    <GlassWater size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight mb-0.5">
                      今日飲水紀錄
                    </p>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none">
                      {todayWater}{' '}
                      <span className="text-xs font-bold text-slate-400">
                        ml
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddWater(0, true)}
                  className="p-2.5 text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl"
                  title="重置今日飲水"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* 🌟 核心新功能：快速飲水按鈕群組 */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddWater(250)}
                  className="flex-1 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-black active:scale-95 transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  + 250 ml
                </button>
                <button
                  onClick={() => handleAddWater(500)}
                  className="flex-1 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-black active:scale-95 transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  + 500 ml
                </button>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    placeholder="自訂 (Enter)"
                    className="w-full h-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black outline-none border border-slate-100 dark:border-slate-700 focus:border-blue-500 text-center text-slate-600 dark:text-slate-300 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddWater(
                          Number(e.target.value.replace(/^0+/, '')) || 0
                        );
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            {/* 3. 身體數據趨勢圖 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <TrendingUp size={16} /> 身體數據趨勢
                  </h4>
                  <p className="text-[10px] font-bold text-slate-300 mt-1">
                    最近 7 次紀錄
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] font-black">體重</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span className="text-[9px] font-black">體脂</span>
                  </div>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-1 mt-4 pt-8 border-t border-slate-50 dark:border-slate-800/50">
                {currentUser.bodyRecords?.length < 2 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                    <History size={32} className="mb-2" />
                    <p className="text-[10px] font-black">
                      需要至少 2 筆紀錄來產生趨勢
                    </p>
                  </div>
                ) : (
                  [...currentUser.bodyRecords]
                    .reverse()
                    .slice(-7)
                    .map((record, i, arr) => {
                      const maxWeight =
                        Math.max(...arr.map((r) => Number(r.weight))) * 1.1;
                      const maxFat =
                        Math.max(...arr.map((r) => Number(r.bodyFat))) * 1.1;
                      return (
                        <div
                          key={record.id}
                          className="flex-1 flex flex-col items-center gap-1 group relative"
                        >
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 font-black shadow-xl pointer-events-none whitespace-nowrap">
                            體重: {record.weight}kg <br /> 體脂:{' '}
                            {record.bodyFat}%
                          </div>
                          <div className="w-full flex items-end justify-center gap-0.5 h-36">
                            <div
                              className="w-2 bg-emerald-500 rounded-t-sm transition-all duration-1000 ease-out shadow-[0_-2px_8px_rgba(16,185,129,0.3)]"
                              style={{
                                height: `${(record.weight / maxWeight) * 100}%`,
                              }}
                            ></div>
                            <div
                              className="w-2 bg-amber-400 rounded-t-sm transition-all duration-1000 ease-out shadow-[0_-2px_8px_rgba(251,191,36,0.3)]"
                              style={{
                                height: `${(record.bodyFat / maxFat) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-[8px] font-bold text-slate-400 mt-2 rotate-[-45deg] origin-top-left translate-x-1">
                            {new Date(record.date).getDate()}/
                            {new Date(record.date).getMonth() + 1}
                          </span>
                        </div>
                      );
                    })
                )}
              </div>
            </div>

            {/* 4. BMR & TDEE 計算機 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Scale size={16} /> BMR & TDEE 計算機
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <TargetInput
                    label="身高 (cm)"
                    value={currentUser.height}
                    onChange={(v) => updateCurrentUser({ height: v })}
                    icon={Ruler}
                  />
                  <TargetInput
                    label="體重 (kg)"
                    value={currentUser.weight}
                    onChange={(v) => updateCurrentUser({ weight: v })}
                    icon={Weight}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <TargetInput
                    label="年齡"
                    value={currentUser.age}
                    onChange={(v) => updateCurrentUser({ age: v })}
                    icon={User}
                  />
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                      性別
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateCurrentUser({ gender: 'male' })}
                        className={`flex-1 p-2.5 rounded-xl text-xs font-black transition-all ${
                          currentUser.gender === 'male'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        男
                      </button>
                      <button
                        onClick={() => updateCurrentUser({ gender: 'female' })}
                        className={`flex-1 p-2.5 rounded-xl text-xs font-black transition-all ${
                          currentUser.gender === 'female'
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        女
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 pt-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                    <Bike size={10} /> 每週活動量
                  </label>
                  <select
                    value={currentUser.activityLevel}
                    onChange={(e) =>
                      updateCurrentUser({
                        activityLevel: Number(e.target.value),
                      })
                    }
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black outline-none border border-transparent focus:border-indigo-500 transition-all text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    {ACTIVITY_LEVELS.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label} - {level.desc}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-6 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-[1.5rem] border border-indigo-100 dark:border-indigo-800/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">
                      基礎代謝率 (BMR)
                    </span>
                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-300">
                      {stats.bmr} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400">
                      總熱量消耗 (TDEE)
                    </span>
                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-300">
                      {stats.tdee} kcal
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      updateCurrentUser({ targetCalories: stats.tdee })
                    }
                    className="w-full py-3.5 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-md hover:bg-indigo-700 transition-all active:scale-95 flex justify-center items-center gap-2"
                  >
                    <Target size={14} /> 將 TDEE 設為每日熱量目標
                  </button>
                </div>
              </div>
            </div>

            {/* 5. 體重與體脂紀錄卡片 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Weight size={16} /> 體重與體脂紀錄
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <TargetInput
                  label="今日體重 (kg)"
                  value={currentUser.weight}
                  onChange={(v) => updateCurrentUser({ weight: v })}
                  icon={Weight}
                />
                <TargetInput
                  label="體脂率 (%)"
                  value={currentUser.bodyFat}
                  onChange={(v) => updateCurrentUser({ bodyFat: v })}
                  icon={Percent}
                />
              </div>
              <button
                onClick={handleSaveBodyRecord}
                className="w-full py-3.5 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md hover:bg-emerald-600 transition-all active:scale-95 flex justify-center items-center gap-2 mb-6"
              >
                <Save size={14} /> 儲存今日測量紀錄
              </button>
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/50 max-h-48 overflow-y-auto no-scrollbar">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center mb-2">
                  歷史紀錄
                </p>
                {currentUser.bodyRecords?.length === 0 ? (
                  <p className="text-center text-[10px] font-bold text-slate-400 py-2">
                    尚無測量紀錄
                  </p>
                ) : (
                  currentUser.bodyRecords?.map((record) => (
                    <div
                      key={record.id}
                      className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-700 dark:text-slate-200 flex items-end gap-2">
                          {record.weight}{' '}
                          <span className="text-[10px] text-slate-400 mb-0.5">
                            kg
                          </span>
                          <span className="text-emerald-500 dark:text-emerald-400 text-xs ml-1">
                            {record.bodyFat}%
                          </span>
                        </span>
                        <span className="text-[9px] font-bold text-slate-400">
                          {record.date} {record.time}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          updateCurrentUser({
                            bodyRecords: currentUser.bodyRecords.filter(
                              (r) => r.id !== record.id
                            ),
                          })
                        }
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* 💩 腸道健康 (排便紀錄) */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <span className="text-lg">💩</span> 腸道健康追蹤
                </h4>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  {
                    type: '硬便',
                    emoji: '🧱',
                    color:
                      'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
                  },
                  {
                    type: '正常',
                    emoji: '🍌',
                    color:
                      'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
                  },
                  {
                    type: '軟便',
                    emoji: '🍦',
                    color:
                      'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
                  },
                  {
                    type: '腹瀉',
                    emoji: '💦',
                    color:
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                  },
                ].map((p) => (
                  <button
                    key={p.type}
                    onClick={() => handleAddPoop(p)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-sm hover:opacity-80 ${p.color}`}
                  >
                    <span className="text-2xl drop-shadow-sm">{p.emoji}</span>
                    <span className="text-[10px] font-black">{p.type}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 max-h-40 overflow-y-auto no-scrollbar">
                {todayPoopRecords.length === 0 ? (
                  <p className="text-center text-[10px] font-bold text-slate-400 py-2">
                    今日尚未「卸貨」
                  </p>
                ) : (
                  todayPoopRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 group hover:border-amber-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{record.data.emoji}</span>
                        <div>
                          <p className="text-xs font-black text-slate-700 dark:text-slate-200">
                            {record.data.type}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400">
                            {record.time}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePoop(record.id)}
                        className="text-slate-300 hover:text-rose-500 p-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* 6. 設定每日目標 */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Target size={16} /> 設定每日目標
              </h4>
              <div className="space-y-4">
                <TargetInput
                  label="熱量上限 (kcal)"
                  value={currentUser.targetCalories}
                  onChange={(v) => updateCurrentUser({ targetCalories: v })}
                  icon={Flame}
                />
                <TargetInput
                  label="睡眠目標 (小時)"
                  value={currentUser.sleepTarget}
                  onChange={(v) => updateCurrentUser({ sleepTarget: v })}
                  icon={Moon}
                />
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <TargetInput
                    label="蛋白質 (g)"
                    value={currentUser.targetProtein}
                    onChange={(v) => updateCurrentUser({ targetProtein: v })}
                    icon={Beef}
                  />
                  <TargetInput
                    label="碳水 (g)"
                    value={currentUser.targetCarbs}
                    onChange={(v) => updateCurrentUser({ targetCarbs: v })}
                    icon={Wheat}
                  />
                  <TargetInput
                    label="脂肪 (g)"
                    value={currentUser.targetFat}
                    onChange={(v) => updateCurrentUser({ targetFat: v })}
                    icon={Droplet}
                  />
                </div>
              </div>
            </div>
            {/* 7. 💡 體態管理教學 (熱量盈餘與赤字) */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2.5rem] shadow-xl mb-6 relative overflow-hidden">
              {/* 背景裝飾光暈 */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

              <h4 className="font-black text-sm uppercase tracking-widest text-indigo-300 mb-6 flex items-center gap-2 relative z-10">
                <BookOpen size={16} /> 體態管理觀念教學
              </h4>

              <div className="space-y-4 relative z-10">
                {/* 🔥 減脂 / 熱量赤字 */}
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown size={18} className="text-emerald-400" />
                    <h5 className="font-black text-emerald-300 text-sm tracking-wide">
                      減脂期：熱量赤字 (Caloric Deficit)
                    </h5>
                  </div>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed mb-3">
                    當您的「總消耗熱量
                    (TDEE)」大於「攝取的熱量」時，身體就會被迫燃燒儲存的脂肪來補足能量缺口，達到減重的效果。
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 text-[10px] font-black px-3 py-1.5 rounded-lg border border-emerald-500/30">
                    <Target size={12} /> 建議設定：TDEE 減去 300 ~ 500 kcal
                  </div>
                </div>

                {/* 💪 增肌 / 熱量盈餘 */}
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={18} className="text-amber-400" />
                    <h5 className="font-black text-amber-300 text-sm tracking-wide">
                      增肌期：熱量盈餘 (Caloric Surplus)
                    </h5>
                  </div>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed mb-3">
                    當您的「攝取的熱量」大於「總消耗熱量
                    (TDEE)」，並搭配規律的「重量訓練」給予肌肉刺激時，多餘的熱量與蛋白質就會被用來合成新肌肉。
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-200 text-[10px] font-black px-3 py-1.5 rounded-lg border border-amber-500/30">
                    <Target size={12} /> 建議設定：TDEE 加上 300 ~ 500 kcal
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🌟 歷史日曆區塊 (完美修復版，含刪除按鈕與三大營養素) */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h4 className="font-black text-lg tracking-tight flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Calendar size={20} /> 歷史紀錄
                </h4>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4 px-2">
                  <button
                    onClick={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() - 1,
                          1
                        )
                      )
                    }
                    className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <h5 className="font-black text-sm tracking-widest">
                    {calendarMonth.getFullYear()}年{' '}
                    {calendarMonth.getMonth() + 1}月
                  </h5>
                  <button
                    onClick={() =>
                      setCalendarMonth(
                        new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() + 1,
                          1
                        )
                      )
                    }
                    className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
                    <div
                      key={d}
                      className="text-[10px] font-black text-slate-400 py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const year = calendarMonth.getFullYear();
                    const month = calendarMonth.getMonth();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const firstDay = new Date(year, month, 1).getDay();

                    const cells = [];
                    for (let i = 0; i < firstDay; i++) {
                      cells.push(
                        <div key={`empty-${i}`} className="p-2"></div>
                      );
                    }

                    for (let day = 1; day <= daysInMonth; day++) {
                      const dateObj = new Date(year, month, day);
                      const dateString = dateObj.toLocaleDateString();
                      const isSelected = selectedHistoryDate === dateString;
                      const isToday =
                        new Date().toLocaleDateString() === dateString;

                      const hasRecord = currentUserDietRecords.some(
                        (r) =>
                          (r.date || new Date().toLocaleDateString()) ===
                          dateString
                      );

                      cells.push(
                        <button
                          key={day}
                          onClick={() => setSelectedHistoryDate(dateString)}
                          className={`relative p-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center h-10 ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-md scale-110 z-10'
                              : isToday
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {day}
                          {/* 🎯 原有的飲食綠點 */}
                          {hasRecord && (
                            <div className="absolute bottom-1 w-1 h-1 bg-emerald-400 rounded-full -translate-x-1"></div>
                          )}
                          {/* 🎯 新增的健身藍點 */}
                          {currentUserWorkoutRecords.some(
                            (r) => r.date === dateString && r.parts.length > 0
                          ) && (
                            <div className="absolute bottom-1 w-1 h-1 bg-indigo-400 rounded-full translate-x-1"></div>
                          )}
                          {hasRecord && isSelected && (
                            <div className="absolute bottom-1 w-1 h-1 bg-white/60 rounded-full"></div>
                          )}
                          {/* 🎯 新增的排便標記 */}
                          {currentUserPoopRecords.some(
                            (r) => r.date === dateString
                          ) && (
                            <div className="absolute top-1 right-1 text-[8px] drop-shadow-sm">
                              💩
                            </div>
                          )}
                        </button>
                      );
                    }
                    return cells;
                  })()}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50">
                {(() => {
                  const dayRecords = currentUserDietRecords.filter(
                    (r) =>
                      (r.date || new Date().toLocaleDateString()) ===
                      selectedHistoryDate
                  );
                  const dayCalories = dayRecords.reduce(
                    (sum, r) => sum + Number(r.calories || 0),
                    0
                  );
                  const dayProtein = dayRecords.reduce(
                    (sum, r) => sum + Number(r.protein || 0),
                    0
                  );
                  const dayCarbs = dayRecords.reduce(
                    (sum, r) => sum + Number(r.carbs || 0),
                    0
                  );
                  const dayFat = dayRecords.reduce(
                    (sum, r) => sum + Number(r.fat || 0),
                    0
                  );

                  return (
                    <>
                      <div className="mb-4 px-2">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                {selectedHistoryDate ===
                                new Date().toLocaleDateString()
                                  ? '今日'
                                  : '該日'}
                                總攝取
                              </span>

                              {/* 🌟 核心新功能：該日赤字/盈餘小標籤 */}
                              {(() => {
                                const dailyDiff =
                                  dayCalories -
                                  (currentUser.targetCalories || 2000);
                                const isDailySurplus = dailyDiff > 0;
                                const isDailyDeficit = dailyDiff < 0;

                                if (dayCalories === 0) return null; // 沒紀錄就不顯示

                                return (
                                  <span
                                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                                      isDailySurplus
                                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                                        : isDailyDeficit
                                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        : 'bg-slate-100 text-slate-500'
                                    }`}
                                  >
                                    {isDailySurplus
                                      ? `盈餘 +${Math.round(dailyDiff)}`
                                      : isDailyDeficit
                                      ? `赤字 -${Math.abs(
                                          Math.round(dailyDiff)
                                        )}`
                                      : '準確達標'}
                                  </span>
                                );
                              })()}
                            </div>
                            <span className="text-2xl font-black text-indigo-600">
                              {Math.round(dayCalories)}{' '}
                              <span className="text-sm">kcal</span>
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setTargetAddDate(selectedHistoryDate);
                              setIsAddEntryModalOpen(true);
                            }}
                            className="px-3 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-xl text-[10px] font-black flex items-center gap-1 hover:bg-indigo-100 transition-colors shadow-sm"
                          >
                            <Plus size={14} /> 補登餐點
                          </button>
                        </div>

                        {/* 三大營養素區塊 (維持原樣) */}
                        <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5 text-center border border-slate-100 dark:border-slate-700/50">
                          <div className="space-y-0.5">
                            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                              蛋白質
                            </p>
                            <p className="text-xs font-black text-slate-700 dark:text-slate-200">
                              {dayProtein.toFixed(1)}g
                            </p>
                          </div>
                          <div className="space-y-0.5 border-x border-slate-200 dark:border-slate-700">
                            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                              碳水
                            </p>
                            <p className="text-xs font-black text-slate-700 dark:text-slate-200">
                              {dayCarbs.toFixed(1)}g
                            </p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                              脂肪
                            </p>
                            <p className="text-xs font-black text-slate-700 dark:text-slate-200">
                              {dayFat.toFixed(1)}g
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* 🌟 歷史日曆：飲水與睡眠數據看板 */}
                      {(() => {
                        const dayWater =
                          currentUserWaterRecords.find(
                            (r) => r.date === selectedHistoryDate
                          )?.amount || 0;
                        const daySleepTotal = currentUserSleepRecords
                          .filter((r) => r.date === selectedHistoryDate)
                          .reduce((acc, e) => acc + e.hours, 0);

                        return (
                          <div className="grid grid-cols-2 gap-2 mb-3 mt-3">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100/50 dark:border-blue-800/30 flex justify-between items-center group transition-all hover:bg-blue-100 dark:hover:bg-blue-900/20">
                              <span className="text-[10px] font-black text-blue-500/70 flex items-center gap-1.5">
                                <GlassWater size={14} /> 飲水總量
                              </span>
                              <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                                {dayWater} ml
                              </span>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 flex justify-between items-center group transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/20">
                              <span className="text-[10px] font-black text-indigo-500/70 flex items-center gap-1.5">
                                <Moon size={14} /> 睡眠時數
                              </span>
                              <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                                {daySleepTotal} 小時
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                      {/* 🌟 歷史日曆：排便紀錄回顧 */}
                      {(() => {
                        const dayPoops = currentUserPoopRecords.filter(
                          (r) => r.date === selectedHistoryDate
                        );
                        if (dayPoops.length === 0) return null;
                        return (
                          <div className="bg-[#fdf8f5] dark:bg-[#3a2f2a]/30 p-3 rounded-2xl border border-[#f5e6de] dark:border-[#52443a]/50 flex justify-between items-center mt-3 mb-3">
                            <span className="text-[10px] font-black text-[#8b5a2b] dark:text-[#c49a6c] flex items-center gap-1.5">
                              <span className="text-sm">💩</span> 腸道狀況
                            </span>
                            <div className="flex gap-2">
                              {dayPoops.map((p) => (
                                <div
                                  key={p.id}
                                  className="flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg shadow-sm"
                                  title={p.time}
                                >
                                  <span className="text-sm">
                                    {p.data.emoji}
                                  </span>
                                  <span className="text-[9px] font-bold text-slate-500">
                                    {p.data.type}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                      {/* 🌟 歷史日曆：互動式訓練回顧與補登 */}
                      {(() => {
                        const dayWorkout = currentUserWorkoutRecords.find(
                          (r) => r.date === selectedHistoryDate
                        );

                        return (
                          <div className="mt-3 mb-4 flex flex-wrap gap-1.5 px-2 relative group bg-slate-50 dark:bg-slate-800/30 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 transition-colors">
                            <div className="w-full flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                                <Dumbbell size={12} /> 訓練部位紀錄
                                (點擊即可補登)
                              </span>
                              {/* 🌟 訓練紀錄專屬刪除按鈕 (完美修復版) */}
                              {dayWorkout && dayWorkout.parts.length > 0 && (
                                <button
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        '確定要刪除這天的所有訓練紀錄嗎？'
                                      )
                                    ) {
                                      setWorkoutRecords((prev) =>
                                        prev.filter(
                                          (r) =>
                                            !(
                                              r.date === selectedHistoryDate &&
                                              r.userId === currentUser.id
                                            )
                                        )
                                      );
                                    }
                                  }}
                                  className="text-slate-300 hover:text-rose-500 p-1 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                                  title="清空當日訓練"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                            <div className="flex gap-1.5 flex-wrap w-full">
                              {/* 🌟 互動式健身標籤！ */}
                              {WORKOUT_PARTS.map((part) => {
                                const isTrained = dayWorkout?.parts.includes(
                                  part.id
                                );
                                return (
                                  <button
                                    key={part.id}
                                    onClick={() =>
                                      handleWorkoutCheckIn(
                                        part.id,
                                        selectedHistoryDate
                                      )
                                    }
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border ${
                                      isTrained
                                        ? `${part.color} text-white border-transparent shadow-sm scale-105`
                                        : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                                    }`}
                                  >
                                    {part.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                      <div className="space-y-3">
                        {dayRecords.length === 0 ? (
                          <div className="text-center py-8 opacity-30">
                            <Calendar size={32} className="mx-auto mb-2" />
                            <p className="text-xs font-bold">這天沒有紀錄</p>
                          </div>
                        ) : (
                          dayRecords.map((e) => (
                            <div
                              key={e.id}
                              className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-3 border border-slate-100 dark:border-slate-700/50 hover:border-rose-200 transition-colors group"
                            >
                              <div className="flex justify-between items-center w-full">
                                {/* 左側：餐點資訊 */}
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`px-3 py-1.5 rounded-lg font-black text-[10px] whitespace-nowrap tracking-widest ${
                                      MEAL_TYPES[
                                        e.mealType || e.type || 'lunch'
                                      ]?.bg || 'bg-slate-100'
                                    } ${
                                      MEAL_TYPES[
                                        e.mealType || e.type || 'lunch'
                                      ]?.color || 'text-slate-500'
                                    }`}
                                  >
                                    {MEAL_TYPES[e.mealType || e.type || 'lunch']
                                      ?.label ||
                                      e.mealType ||
                                      '餐點'}
                                  </div>
                                  <div>
                                    <p className="text-xs font-black">
                                      {e.name}
                                    </p>
                                    <p className="text-[9px] font-bold text-slate-400">
                                      {e.amount}
                                      {e.unit} • {e.time}
                                    </p>
                                  </div>
                                </div>

                                {/* 右側：熱量與刪除按鈕 */}
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-black">
                                    {e.calories} kcal
                                  </span>
                                  <button
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          '確定要刪除這筆飲食紀錄嗎？'
                                        )
                                      ) {
                                        if (
                                          typeof handleDeleteEntry ===
                                          'function'
                                        ) {
                                          handleDeleteEntry(e.id);
                                        }
                                      }
                                    }}
                                    className="text-slate-300 hover:text-rose-500 p-1 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              {/* 👇 歷史紀錄的心情與筆記 👇 */}
                              {(e.note || e.mood) && (
                                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50 flex gap-2 items-start mt-1">
                                  <span className="text-sm shrink-0">
                                    {e.mood || '😊'}
                                  </span>
                                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed break-all pt-0.5">
                                    {e.note || '無特別備註'}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 🌟 隱藏視窗區塊 (這就是原本被不小心刪掉的重要部分！) */}

      {/* 1. 用戶管理視窗 */}
      {isUserModalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setIsUserModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black tracking-tight">成員管理</h3>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">
              {users.map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    if (editingUserId !== u.id) {
                      setCurrentUserId(u.id);
                      setIsUserModalOpen(false);
                    }
                  }}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 border transition-all cursor-pointer ${
                    currentUserId === u.id
                      ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 shadow-sm'
                      : 'bg-slate-50 border-transparent dark:bg-slate-800/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black flex-shrink-0 text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    {editingUserId === u.id ? (
                      <input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        autoFocus
                        className="w-full bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs font-black outline-none border border-indigo-400"
                        onBlur={() => {
                          setUsers((prev) =>
                            prev.map((user) =>
                              user.id === u.id
                                ? { ...user, name: tempName || user.name }
                                : user
                            )
                          );
                          setEditingUserId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setUsers((prev) =>
                              prev.map((user) =>
                                user.id === u.id
                                  ? { ...user, name: tempName || user.name }
                                  : user
                              )
                            );
                            setEditingUserId(null);
                          }
                        }}
                      />
                    ) : (
                      <>
                        <p className="text-xs font-black truncate">{u.name}</p>
                        <p className="text-[10px] font-bold opacity-60">
                          TDEE{' '}
                          {Math.round(
                            (10 * u.weight +
                              6.25 * u.height -
                              5 * u.age +
                              (u.gender === 'male' ? 5 : -161)) *
                              u.activityLevel
                          )}{' '}
                          kcal
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {editingUserId === u.id ? (
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setUsers((prev) =>
                            prev.map((user) =>
                              user.id === u.id
                                ? { ...user, name: tempName || user.name }
                                : user
                            )
                          );
                          setEditingUserId(null);
                        }}
                        className="text-emerald-500 hover:text-emerald-600 p-1 transition-colors"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingUserId(u.id);
                          setTempName(u.name);
                        }}
                        className="text-slate-400 hover:text-indigo-600 p-1 transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                    )}
                    {users.length > 1 && (
                      <button
                        onClick={(e) => handleDeleteUser(u.id, e)}
                        className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddUser}
              className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:border-indigo-300 hover:text-indigo-500 transition-all active:scale-95"
            >
              <UserPlus size={16} /> 建立新成員檔案
            </button>
            {/* 🌟 數據備份與還原區塊 */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center mb-4">
                🛡️ 數據安全保險箱
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBackupData}
                  className="py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-black hover:bg-indigo-100 transition-all flex flex-col items-center gap-1 shadow-sm active:scale-95"
                >
                  <span className="text-xl mb-1 drop-shadow-sm">📤</span>{' '}
                  一鍵備份
                </button>
                <label className="py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-black hover:bg-emerald-100 transition-all flex flex-col items-center gap-1 cursor-pointer shadow-sm active:scale-95">
                  <span className="text-xl mb-1 drop-shadow-sm">📥</span>{' '}
                  還原數據
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestoreData}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. 新增餐點視窗 */}
      {isAddEntryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center">
          <AddEntryModal
            onClose={() => setIsAddEntryModalOpen(false)}
            onAdd={handleAddEntry}
            favoriteMeals={favoriteMeals}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      )}

      {/* 3. 食譜建議視窗 */}
      {isRecipeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <RecipeSuggestionModal
            onClose={() => setIsRecipeModalOpen(false)}
            fridgeItems={currentUser.fridgeItems}
            onAddToDiet={(recipe) => {
              handleAddEntry({
                name: `[推薦] ${recipe.name}`,
                amount: 1,
                unit: '份',
                calories: recipe.calories,
                protein: recipe.protein || 15,
                carbs: recipe.carbs || 30,
                fat: recipe.fat || 10,
                mealType: 'lunch',
                time: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              });
              setIsRecipeModalOpen(false);
              setActiveTab('diet');
            }}
          />
        </div>
      )}

      {/* 底部導航列 */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 pb-10 z-30">
        <div className="max-w-md mx-auto flex justify-between items-center px-4">
          <NavIcon
            active={activeTab === 'diet'}
            icon={Utensils}
            label="飲食"
            onClick={() => setActiveTab('diet')}
          />
          <NavIcon
            active={activeTab === 'inventory'}
            icon={ShoppingCart}
            label="食材"
            onClick={() => setActiveTab('inventory')}
          />
          <NavIcon
            active={activeTab === 'history'}
            icon={Calendar}
            label="日曆"
            onClick={() => setActiveTab('history')}
          />
          <NavIcon
            active={activeTab === 'sleep'}
            icon={Moon}
            label="睡眠"
            onClick={() => setActiveTab('sleep')}
          />
          <NavIcon
            active={activeTab === 'stats'}
            icon={BarChart3}
            label="數據"
            onClick={() => setActiveTab('stats')}
          />
        </div>
      </div>
    </div>
  );
}
// ... 下方是您的子元件 (NutrientStat, TargetInput, AddEntryModal 等等維持原樣) ...
// === 子元件 ===

function NutrientStat({ label, current, target, color, icon: Icon }) {
  const percent = Math.min((current / target) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Icon size={12} />
        <span className="text-[9px] font-black uppercase tracking-tight">
          {label}
        </span>
      </div>
      <p className="text-xs font-black">
        {Math.round(current)}g{' '}
        <span className="text-[8px] text-slate-300 font-bold">/ {target}</span>
      </p>
      <div className="w-full h-1 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

function TargetInput({ label, value, onChange, icon: Icon }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
        {Icon && <Icon size={10} />} {label}
      </label>
      <input
        type="number"
        value={value === 0 ? '' : value}
        onChange={(e) =>
          onChange(
            e.target.value.replace(/^0+/, '') === ''
              ? 0
              : Number(e.target.value.replace(/^0+/, ''))
          )
        }
        className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black outline-none border border-transparent focus:border-indigo-500 transition-all shadow-inner"
      />
    </div>
  );
}

function NavIcon({ active, icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${
        active
          ? 'text-indigo-600 scale-110'
          : 'text-slate-400 hover:text-slate-500'
      }`}
    >
      <Icon size={20} strokeWidth={active ? 3 : 2} />
      <span className="text-[10px] font-black uppercase tracking-tighter">
        {label}
      </span>
    </button>
  );
}

function InputCell({ label, value, onChange }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700">
      <p className="text-[9px] font-black text-slate-400 mb-1">{label}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent font-black text-sm outline-none"
      />
    </div>
  );
}

// 🛒 完整餐別版：加入「早餐、午餐、下午茶、晚餐、宵夜、小食、飲料」選擇列
function AddEntryModal({
  onClose,
  onAdd,
  favoriteMeals = [],
  onToggleFavorite = () => {},
}) {
  // 🌟 新增餐別清單，並預設為午餐
  const MEAL_TYPES = ['早餐', '午餐', '下午茶', '晚餐', '宵夜', '小食', '飲料'];
  const [mealType, setMealType] = useState('午餐');
  const [mealMood, setMealMood] = useState('😊');
  const [mealNote, setMealNote] = useState('');
  const MOOD_OPTIONS = ['🤩', '😊', '😐', '😫', '🤢'];
  const [activeCategory, setActiveCategory] = useState('常用');
  const [cart, setCart] = useState([]);
  // 🌟 新增：目前選擇的常用資料夾
  const [currentFavFolder, setCurrentFavFolder] = useState('未分類');
  const [sortBy, setSortBy] = useState('default');
  // 🌟 新增：搜尋關鍵字的狀態
  const [searchQuery, setSearchQuery] = useState('');
  // 🌟 新增：自動從 favoriteMeals 中萃取出所有出現過的資料夾名稱
  const favFolders = useMemo(() => {
    return Array.from(
      new Set(['未分類', ...favoriteMeals.map((f) => f.folder || '未分類')])
    );
  }, [favoriteMeals]);

  // 🌟 確保如果某個分類空了被自動刪除時，畫面能安全回到「未分類」
  useEffect(() => {
    if (!favFolders.includes(currentFavFolder)) setCurrentFavFolder('未分類');
  }, [favFolders, currentFavFolder]);

  const [manualName, setManualName] = useState('');
  const [manualAmount, setManualAmount] = useState('1');
  const [manualUnit, setManualUnit] = useState('份');
  const [manualNutrients, setManualNutrients] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });

  const categoriesWithFav = ['常用', ...FOOD_CATEGORIES];

  const isManualInFav = useMemo(() => {
    return favoriteMeals.some(
      (f) => f.name === manualName && manualName !== ''
    );
  }, [favoriteMeals, manualName]);

  const getComputedNutrients = (food, inputAmount, inputUnit) => {
    const isWeightOrVolume = inputUnit === 'g' || inputUnit === 'ml';
    const multiplier = isWeightOrVolume
      ? Number(inputAmount) / 100
      : Number(inputAmount) || 1;
    return {
      calories: Math.round(food.calories * multiplier),
      protein: (food.protein * multiplier).toFixed(1),
      carbs: (food.carbs * multiplier).toFixed(1),
      fat: (food.fat * multiplier).toFixed(1),
    };
  };

  const handleAddDbToCart = (food) => {
    const newItem = {
      ...food,
      cartId: Date.now() + Math.random(),
      amount: food.defaultAmount || 1,
      unit: food.unit || '份',
      computed: getComputedNutrients(
        food,
        food.defaultAmount || 1,
        food.unit || '份'
      ),
    };
    setCart([...cart, newItem]);
  };

  const handleAddManualToCart = () => {
    if (!manualName.trim() || !manualNutrients.calories) {
      alert('請至少輸入餐點名稱與熱量！');
      return;
    }
    const newItem = {
      name: manualName,
      cartId: Date.now() + Math.random(),
      amount: manualAmount,
      unit: manualUnit,
      calories: manualNutrients.calories,
      protein: manualNutrients.protein || 0,
      carbs: manualNutrients.carbs || 0,
      fat: manualNutrients.fat || 0,
      computed: { ...manualNutrients },
    };
    setCart([...cart, newItem]);
    setManualName('');
    setManualNutrients({ calories: '', protein: '', carbs: '', fat: '' });
  };

  const updateCartItemAmount = (cartId, newAmount) => {
    setCart(
      cart.map((item) => {
        if (item.cartId === cartId) {
          const amt = newAmount.replace(/^0+/, '') || '0';
          return {
            ...item,
            amount: amt,
            computed: getComputedNutrients(item, amt, item.unit),
          };
        }
        return item;
      })
    );
  };

  const handleSaveToFavorites = () => {
    if (!manualName.trim() || !manualNutrients.calories)
      return alert('請輸入名稱與熱量再收藏！');

    if (isManualInFav) {
      // 如果已經在常用裡，再次點擊就是移除
      onToggleFavorite({ name: manualName });
    } else {
      // 🌟 跳出視窗詢問要存到哪個分類
      const folderName = window.prompt(
        '⭐ 請輸入此私房餐點的分類名稱 (直接按確定為「未分類」)：',
        currentFavFolder
      );
      if (folderName !== null) {
        const finalFolder = folderName.trim() || '未分類';
        const isWeightOrVolume = manualUnit === 'g' || manualUnit === 'ml';
        const divisor = isWeightOrVolume
          ? Number(manualAmount) / 100
          : Number(manualAmount) || 1;

        onToggleFavorite(
          {
            name: manualName,
            category: '自定義',
            defaultAmount: Number(manualAmount),
            unit: manualUnit,
            calories: Math.round(Number(manualNutrients.calories) / divisor),
            protein: Number(
              (Number(manualNutrients.protein) / divisor).toFixed(1)
            ),
            carbs: Number((Number(manualNutrients.carbs) / divisor).toFixed(1)),
            fat: Number((Number(manualNutrients.fat) / divisor).toFixed(1)),
          },
          finalFolder
        );

        // 自動切換到剛建立的資料夾
        setCurrentFavFolder(finalFolder);
      }
    }
  };

  // 🌟 升級版：支援分類、全域搜尋與智慧排序
  const filteredFoods = useMemo(() => {
    let result = [];

    // 1. 🔍 如果有輸入關鍵字，啟動「全域搜尋模式」！忽略分類，直接從所有食物中找
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();

      // 將「常用」與「總資料庫」合併，並去除重複名稱的食物
      const combined = [...favoriteMeals, ...FOOD_DATABASE];
      const uniqueCombined = Array.from(
        new Map(combined.map((item) => [item.name, item])).values()
      );

      result = uniqueCombined.filter((f) =>
        f.name.toLowerCase().includes(lowerQuery)
      );
    } else {
      // 2. 📂 沒有搜尋時，走原本的「一般分類」邏輯
      if (activeCategory === '常用') {
        result = (favoriteMeals || []).filter(
          (f) => (f.folder || '未分類') === currentFavFolder
        );
      } else if (activeCategory === '全部') {
        result = FOOD_DATABASE || [];
      } else {
        result = (FOOD_DATABASE || []).filter(
          (f) => f.category === activeCategory
        );
      }
    }

    // 3. ⚖️ 依照選擇的條件進行「排序」
    if (sortBy !== 'default') {
      result = [...result].sort((a, b) => {
        if (sortBy === 'protein-desc')
          return (Number(b.protein) || 0) - (Number(a.protein) || 0);
        if (sortBy === 'calories-asc')
          return (Number(a.calories) || 0) - (Number(b.calories) || 0);
        if (sortBy === 'calories-desc')
          return (Number(b.calories) || 0) - (Number(a.calories) || 0);
        if (sortBy === 'carbs-asc')
          return (Number(a.carbs) || 0) - (Number(b.carbs) || 0);
        if (sortBy === 'fat-asc')
          return (Number(a.fat) || 0) - (Number(b.fat) || 0);
        return 0;
      });
    }

    return result;
  }, [activeCategory, favoriteMeals, currentFavFolder, sortBy, searchQuery]);
  const totalCartCalories = cart.reduce(
    (s, i) => s + Number(i.computed.calories || 0),
    0
  );
  const totalCartProtein = cart
    .reduce((s, i) => s + Number(i.computed.protein || 0), 0)
    .toFixed(1);
  const totalCartCarbs = cart
    .reduce((s, i) => s + Number(i.computed.carbs || 0), 0)
    .toFixed(1);
  const totalCartFat = cart
    .reduce((s, i) => s + Number(i.computed.fat || 0), 0)
    .toFixed(1);
  console.log('🚀 App 成功發動啦！'); // 👈 加入這行！
  return (
    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-[3rem] p-8 shadow-2xl max-h-[95vh] flex flex-col border-t border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-2xl font-black tracking-tight">
          紀錄餐點{' '}
          <span className="text-sm text-slate-400 ml-2">({cart.length})</span>
        </h2>
        <button
          onClick={onClose}
          className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pb-4">
        {/* 🌟 核心更新：餐別選擇區 */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
            選擇餐別
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {MEAL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setMealType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  mealType === type
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 手動輸入區 */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
            手動記錄私房餐點
          </p>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="餐點名稱"
                className="w-full p-3 bg-white dark:bg-slate-800 rounded-xl font-black text-xs outline-none border border-transparent focus:border-indigo-400 shadow-sm"
              />
            </div>
            <div className="flex w-32 gap-1 relative">
              <input
                type="number"
                value={manualAmount}
                onChange={(e) => setManualAmount(e.target.value)}
                className="w-1/2 p-3 bg-white dark:bg-slate-800 rounded-xl font-black text-xs text-center outline-none border border-transparent focus:border-indigo-400 shadow-sm"
              />
              <div className="w-1/2 relative">
                <select
                  value={manualUnit}
                  onChange={(e) => setManualUnit(e.target.value)}
                  className="w-full h-full bg-white dark:bg-slate-800 rounded-xl font-black text-[11px] text-center text-slate-500 outline-none border border-transparent focus:border-indigo-400 shadow-sm appearance-none cursor-pointer"
                  style={{ textAlignLast: 'center' }}
                >
                  <option value="份">份</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="個">個</option>
                  <option value="碗">碗</option>
                  <option value="顆">顆</option>
                  <option value="杯">杯</option>
                  <option value="片">片</option>
                  <option value="塊">塊</option>
                  <option value="盤">盤</option>
                  <option value="籠">籠</option>
                  <option value="包">包</option>
                  <option value="條">條</option>
                  <option value="隻">隻</option>
                </select>
                <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <InputCell
              label="熱量"
              value={manualNutrients.calories}
              onChange={(v) =>
                setManualNutrients({ ...manualNutrients, calories: v })
              }
            />
            <InputCell
              label="蛋白"
              value={manualNutrients.protein}
              onChange={(v) =>
                setManualNutrients({ ...manualNutrients, protein: v })
              }
            />
            <InputCell
              label="碳水"
              value={manualNutrients.carbs}
              onChange={(v) =>
                setManualNutrients({ ...manualNutrients, carbs: v })
              }
            />
            <InputCell
              label="脂肪"
              value={manualNutrients.fat}
              onChange={(v) =>
                setManualNutrients({ ...manualNutrients, fat: v })
              }
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleAddManualToCart}
              className="flex-1 py-3 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 rounded-xl text-[10px] font-black border-2 border-indigo-100 dark:border-indigo-900/30 hover:bg-indigo-50 transition-all flex items-center justify-center gap-1"
            >
              <Plus size={14} /> 暫存至清單
            </button>
            <button
              onClick={handleSaveToFavorites}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black border-2 transition-all flex items-center justify-center gap-1 ${
                isManualInFav
                  ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 hover:border-amber-300 hover:text-amber-500'
              }`}
            >
              <CheckCircle2
                size={14}
                fill={isManualInFav ? 'currentColor' : 'none'}
              />
              {isManualInFav ? '已加入常用' : '加入常用'}
            </button>
          </div>
        </div>

        {/* 資料庫選取區 */}
        <div className="space-y-4">
          {/* 🌟 核心新功能：全域智慧搜尋列 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">
                🔍
              </span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋任何食材 (輸入關鍵字全域搜尋)..."
              className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-300 hover:text-rose-400 transition-colors"
                title="清除搜尋"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {/* 🌟 升級版標題區：加入排序選單 */}
          <div className="flex justify-between items-end mb-2 border-b border-slate-100 dark:border-slate-800/50 pb-2">
            <div className="space-y-1 text-left">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                快速選取資料庫
              </p>
              <p className="text-[9px] font-bold text-indigo-400">
                💡 點擊右上角圈圈可加入/移除常用
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-600 dark:text-slate-300 outline-none border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
            >
              <option value="default">預設排序</option>
              <option value="protein-desc">🥩 蛋白質 (高至低)</option>
              <option value="calories-asc">🥗 熱量 (低至高)</option>
              <option value="calories-desc">🍔 熱量 (高至低)</option>
              <option value="carbs-asc">🌾 碳水 (低至高)</option>
              <option value="fat-asc">🥑 脂肪 (低至高)</option>
            </select>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categoriesWithFav.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveCategory(c); // 1. 切換分類
                  setSortBy('default'); // 2. 🌟 同時強制把排序重置回預設值！
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeCategory === c
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {c === '常用' ? '⭐ ' + c : c}
              </button>
            ))}
          </div>

          {/* 🌟 核心新功能：常用專屬的「子分類資料夾」 */}
          {activeCategory === '常用' && (
            <div className="flex items-center gap-2 mb-3 mt-1 overflow-x-auto no-scrollbar pb-1">
              {favFolders.map((folder) => (
                <button
                  key={folder}
                  onClick={() => setCurrentFavFolder(folder)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black whitespace-nowrap transition-all ${
                    currentFavFolder === folder
                      ? 'bg-amber-400 text-white shadow-sm'
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100'
                  }`}
                >
                  {folder}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {filteredFoods.map(
              (
                food // 👈 必須是 filteredFoods，才會經過大腦過濾
              ) => (
                <div key={food.name} className="relative group">
                  <button
                    onClick={() => handleAddDbToCart(food)}
                    className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-[11px] font-bold text-left flex flex-col gap-1 active:scale-95 hover:border-indigo-300 transition-all"
                  >
                    <span className="truncate pr-4 text-slate-700 dark:text-slate-200">
                      {food.name}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] text-indigo-500 font-black">
                        {food.calories} kcal /{' '}
                        {food.unit === 'g' || food.unit === 'ml' ? '100' : '1'}
                        {food.unit}
                      </span>
                      {food.approx && (
                        <span className="text-[8px] bg-slate-100 dark:bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded font-bold tracking-wider">
                          💡 {food.approx}
                        </span>
                      )}
                    </div>
                  </button>

                  {/* 🌟 核心新功能：移動分類按鈕 (僅在已收藏的餐點顯示) */}
                  {favoriteMeals.some((f) => f.name === food.name) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentFolder =
                          favoriteMeals.find((f) => f.name === food.name)
                            ?.folder || '未分類';
                        const folderName = window.prompt(
                          `📦 將「${food.name}」移動到：\n(輸入現有分類或建立新分類)`,
                          currentFolder
                        );

                        if (folderName !== null) {
                          const finalFolder = folderName.trim() || '未分類';
                          onToggleFavorite(food, finalFolder, true); // 傳入 true 代表「只是移動」

                          // 如果正在看「常用」頁籤，移動後畫面自動跟著跳過去
                          if (activeCategory === '常用')
                            setCurrentFavFolder(finalFolder);
                        }
                      }}
                      className="absolute top-2 right-8 p-1 text-slate-300 hover:text-indigo-500 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                      title="移動至其他分類"
                    >
                      <Edit3 size={14} />
                    </button>
                  )}

                  {/* 星星收藏按鈕 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const isFav = favoriteMeals.some(
                        (f) => f.name === food.name
                      );
                      if (isFav) {
                        onToggleFavorite(food); // 移除
                      } else {
                        const folderName = window.prompt(
                          `⭐ 將「${food.name}」加入常用\n請輸入分類名稱 (直接按確定為「未分類」)：`,
                          currentFavFolder
                        );
                        if (folderName !== null) {
                          const finalFolder = folderName.trim() || '未分類';
                          onToggleFavorite(food, finalFolder);
                          setCurrentFavFolder(finalFolder);
                        }
                      }
                    }}
                    className={`absolute top-2 right-2 p-1 ${
                      favoriteMeals.some((f) => f.name === food.name)
                        ? 'text-amber-400'
                        : 'text-slate-200 hover:text-amber-200'
                    }`}
                  >
                    <CheckCircle2 size={14} fill="currentColor" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* 購物車預覽 */}
        {cart.length > 0 && (
          <div className="bg-indigo-600 text-white rounded-[2.5rem] p-6 space-y-4 shadow-xl shadow-indigo-200 dark:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                本次紀錄清單 ({mealType})
              </p>
              <button
                onClick={() => setCart([])}
                className="text-[10px] font-black opacity-70 hover:opacity-100 underline transition-opacity"
              >
                清空
              </button>
            </div>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center justify-between gap-2 bg-white/10 p-3 rounded-2xl"
                >
                  <span
                    className="text-xs font-bold truncate flex-1"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white/20 rounded-lg px-2 py-1">
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          updateCartItemAmount(item.cartId, e.target.value)
                        }
                        className="w-12 bg-transparent text-center text-xs font-black outline-none text-white placeholder:text-white/50"
                      />
                      <span className="text-[9px] font-black opacity-70">
                        {item.unit}
                      </span>
                    </div>
                    <span className="text-xs font-black w-14 text-right">
                      {item.computed.calories || 0} kcal
                    </span>
                    <button
                      onClick={() =>
                        setCart(cart.filter((i) => i.cartId !== item.cartId))
                      }
                      className="p-1 ml-1 text-white/50 hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs uppercase font-black">總計熱量</span>
                <span className="text-2xl font-black leading-none">
                  {totalCartCalories} <span className="text-sm">kcal</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-white/10 rounded-2xl p-3 text-center">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider">
                    蛋白質
                  </p>
                  <p className="text-sm font-black">{totalCartProtein}g</p>
                </div>
                <div className="space-y-1 border-x border-white/10">
                  <p className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider">
                    碳水
                  </p>
                  <p className="text-sm font-black">{totalCartCarbs}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider">
                    脂肪
                  </p>
                  <p className="text-sm font-black">{totalCartFat}g</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="pt-4 flex-shrink-0">
        {/* 購物車預覽 (這是原本紫色的購物清單，幫您加回來了！) */}
        {cart.length > 0 && (
          <div className="bg-indigo-600 text-white rounded-[2.5rem] p-6 space-y-4 shadow-xl shadow-indigo-200 dark:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                本次紀錄清單 ({mealType})
              </p>
              <button
                onClick={() => setCart([])}
                className="text-[10px] font-black opacity-70 hover:opacity-100 underline transition-opacity"
              >
                清空
              </button>
            </div>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center justify-between gap-2 bg-white/10 p-3 rounded-2xl"
                >
                  <span
                    className="text-xs font-bold truncate flex-1"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white/20 rounded-lg px-2 py-1">
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          updateCartItemAmount(item.cartId, e.target.value)
                        }
                        className="w-12 bg-transparent text-center text-xs font-black outline-none text-white placeholder:text-white/50"
                      />
                      <span className="text-[9px] font-black opacity-70">
                        {item.unit}
                      </span>
                    </div>
                    <span className="text-xs font-black w-14 text-right">
                      {item.computed.calories || 0} kcal
                    </span>

                    {/* 👇 這就是消失的取消選擇按鈕！ */}
                    <button
                      onClick={() =>
                        setCart(cart.filter((i) => i.cartId !== item.cartId))
                      }
                      className="p-1 ml-1 text-white/50 hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs uppercase font-black">總計熱量</span>
                <span className="text-2xl font-black leading-none">
                  {totalCartCalories} <span className="text-sm">kcal</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-white/10 rounded-2xl p-3 text-center">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider">
                    蛋白質
                  </p>
                  <p className="text-sm font-black">{totalCartProtein}g</p>
                </div>
                <div className="space-y-1 border-x border-white/10">
                  <p className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider">
                    碳水
                  </p>
                  <p className="text-sm font-black">{totalCartCarbs}g</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase font-bold text-indigo-200 tracking-wider">
                    脂肪
                  </p>
                  <p className="text-sm font-black">{totalCartFat}g</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>{' '}
      {/* 👈 注意！這是保持畫面可以滾動的關鍵結尾 */}
      {/* 底部固定按鈕區 */}
      <div className="pt-4 flex-shrink-0">
        {/* 🌟 隨手筆記與心情 UI */}
        {cart.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl mb-4 border border-slate-100 dark:border-slate-700/50 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-1.5">
              <span className="text-sm">📝</span> 隨手筆記與心情
            </p>
            <div className="flex justify-between mb-3 px-2">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMealMood(m)}
                  className={`text-2xl transition-transform ${
                    mealMood === m
                      ? 'scale-125 drop-shadow-md'
                      : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <textarea
              value={mealNote}
              onChange={(e) => setMealNote(e.target.value)}
              placeholder="這餐吃得如何？有什麼想記錄的嗎？(選填)"
              className="w-full bg-white dark:bg-slate-900 p-3 rounded-2xl text-xs font-bold outline-none border border-slate-100 dark:border-slate-700 focus:border-indigo-400 transition-colors resize-none h-16 placeholder:text-slate-300"
            />
          </div>
        )}

        {/* 🌟 確認送出按鈕 */}
        <button
          onClick={() => {
            if (cart.length === 0) return alert('清單是空的喔！');
            // 將所有資訊包含心情筆記打包送出
            const preparedCart = cart.map((item) => ({
              ...item,
              calories: item.computed.calories,
              protein: item.computed.protein,
              carbs: item.computed.carbs,
              fat: item.computed.fat,
              mealType,
              mood: mealMood,
              note: mealNote,
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            }));
            onAdd(preparedCart);
            onClose();
          }}
          className={`w-full py-5 rounded-[2.5rem] font-black shadow-xl active:scale-95 transition-all ${
            cart.length > 0
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-200 text-slate-400'
          }`}
        >
          {cart.length > 0
            ? `確認將這 ${cart.length} 項記為「${mealType}」`
            : '請先選取或輸入餐點'}
        </button>
      </div>
    </div>
  );
}
function RecipeSuggestionModal({ onClose, fridgeItems, onAddToDiet }) {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [suggestionMessage, setSuggestionMessage] = useState('');

  const generateRecipes = async () => {
    setIsLoading(true);
    setSuggestionMessage('');
    await new Promise((resolve) => setTimeout(resolve, 800));
    try {
      const fridgeKeywords = fridgeItems.map((item) => item.name.toLowerCase());
      const scoredRecipes = RECIPE_DATABASE.map((recipe) => {
        let matchCount = 0;
        recipe.ingredients.forEach((ing) => {
          if (fridgeKeywords.some((fk) => fk.includes(ing) || ing.includes(fk)))
            matchCount++;
        });
        return { ...recipe, matchCount };
      });
      const matched = scoredRecipes
        .filter((r) => r.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 3);
      if (matched.length > 0) {
        setRecipes(matched);
        setSuggestionMessage(`找到 ${matched.length} 道料理！`);
      } else {
        setRecipes(
          [...RECIPE_DATABASE].sort(() => 0.5 - Math.random()).slice(0, 2)
        );
        setSuggestionMessage('為您隨機推薦健康料理！');
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar animate-in zoom-in-95">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2 text-cyan-600">
          <ChefHat size={22} /> 冰箱料理建議
        </h2>
        <button
          onClick={onClose}
          className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"
        >
          <X size={18} />
        </button>
      </div>
      {fridgeItems.length === 0 ? (
        <div className="text-center py-10 opacity-50">
          <Refrigerator size={40} className="mx-auto mb-3" />
          <p className="text-sm font-bold">冰箱目前空空的。</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 size={32} className="animate-spin text-cyan-500" />
          <p className="text-xs font-black text-slate-400 animate-pulse">
            正在為您比對完美食譜...
          </p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-8">
          <button
            onClick={generateRecipes}
            className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-black shadow-md"
          >
            依據現有食材推薦食譜
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-500 text-center mb-2">
            {suggestionMessage}
          </p>
          {recipes.map((r, i) => (
            <div
              key={i}
              className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-slate-800 text-base">
                  {r.name}
                </h3>
                <p className="text-[10px] font-black text-cyan-600">
                  {r.calories} kcal
                </p>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-bold mb-4 whitespace-pre-line">
                {r.recipe}
              </p>
              <button
                onClick={() => onAddToDiet(r)}
                className="w-full py-3 bg-cyan-600 text-white rounded-xl text-[10px] font-black flex justify-center gap-2 shadow-sm"
              >
                <PlusCircle size={14} /> 加入飲食紀錄
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
