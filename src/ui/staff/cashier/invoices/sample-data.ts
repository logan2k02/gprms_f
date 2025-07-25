import type { CashierInvoice } from "@/interfaces/cashier-invoice";

export const sampleInvoices: CashierInvoice[] = [
  {
    id: "1",
    invoiceNumber: "#15234",
    tableNumber: "005",
    customerName: "John Doe",
    type: "dining",
    orders: [
      {
        id: "o1",
        name: "Pasta",
        quantity: 1,
        unitPrice: 2490,
        totalPrice: 2490,
      },
      {
        id: "o2",
        name: "Coke",
        quantity: 2,
        unitPrice: 490,
        totalPrice: 980,
      },
      {
        id: "o3",
        name: "Soup",
        quantity: 3,
        unitPrice: 890,
        totalPrice: 2670,
      },
    ],
    subtotal: 6140,
    serviceCharge: 614,
    discount: 0,
    loyaltyPoints: 61,
    total: 6693,
    createdAt: "2025-07-19T10:30:00Z",
    status: "pending",
  },
  {
    id: "2",
    invoiceNumber: "#15264",
    tableNumber: "003",
    customerName: "Sarah Wilson",
    type: "dining",
    orders: [
      {
        id: "o4",
        name: "Chicken Fried Rice",
        quantity: 9,
        unitPrice: 2490,
        totalPrice: 22410,
      },
    ],
    subtotal: 450789,
    serviceCharge: 45078,
    discount: 0,
    loyaltyPoints: 4507,
    total: 497865,
    createdAt: "2025-06-15T08:15:00Z",
    status: "pending",
  },
  {
    id: "3",
    invoiceNumber: "#15298",
    tableNumber: "012",
    customerName: "Mike Johnson",
    type: "dining",
    orders: [
      {
        id: "o5",
        name: "Pasta",
        quantity: 2,
        unitPrice: 2490,
        totalPrice: 4980,
      },
      {
        id: "o6",
        name: "Soup",
        quantity: 1,
        unitPrice: 890,
        totalPrice: 890,
      },
    ],
    subtotal: 5870,
    serviceCharge: 587,
    discount: 0,
    loyaltyPoints: 58,
    total: 6399,
    createdAt: "2024-12-25T14:30:00Z",
    status: "pending",
  },
  {
    id: "4",
    invoiceNumber: "#15299",
    customerName: "Lisa Chen",
    type: "takeaway",
    orders: [
      {
        id: "o7",
        name: "Chicken Curry",
        quantity: 1,
        unitPrice: 3490,
        totalPrice: 3490,
      },
      {
        id: "o8",
        name: "Rice",
        quantity: 1,
        unitPrice: 490,
        totalPrice: 490,
      },
    ],
    subtotal: 3980,
    serviceCharge: 0,
    discount: 200,
    loyaltyPoints: 39,
    total: 3819,
    createdAt: "2025-07-18T16:45:00Z",
    status: "pending",
  },
  {
    id: "5",
    invoiceNumber: "#15300",
    customerName: "David Brown",
    type: "takeaway",
    orders: [
      {
        id: "o9",
        name: "Pizza Margherita",
        quantity: 1,
        unitPrice: 2890,
        totalPrice: 2890,
      },
      {
        id: "o10",
        name: "Garlic Bread",
        quantity: 2,
        unitPrice: 690,
        totalPrice: 1380,
      },
    ],
    subtotal: 4270,
    serviceCharge: 0,
    discount: 0,
    loyaltyPoints: 42,
    total: 4270,
    createdAt: "2025-07-10T09:15:00Z",
    status: "pending",
  },
  {
    id: "6",
    invoiceNumber: "#15301",
    tableNumber: "008",
    customerName: "Emily Davis",
    type: "dining",
    orders: [
      {
        id: "o11",
        name: "Fish and Chips",
        quantity: 1,
        unitPrice: 3290,
        totalPrice: 3290,
      },
      {
        id: "o12",
        name: "Orange Juice",
        quantity: 2,
        unitPrice: 590,
        totalPrice: 1180,
      },
    ],
    subtotal: 4470,
    serviceCharge: 447,
    discount: 0,
    loyaltyPoints: 44,
    total: 4873,
    createdAt: "2025-05-20T18:00:00Z",
    status: "pending",
  },
  {
    id: "7",
    invoiceNumber: "#15302",
    customerName: "Robert Wilson",
    type: "takeaway",
    orders: [
      {
        id: "o13",
        name: "Burger Deluxe",
        quantity: 2,
        unitPrice: 2190,
        totalPrice: 4380,
      },
      {
        id: "o14",
        name: "Fries",
        quantity: 2,
        unitPrice: 490,
        totalPrice: 980,
      },
    ],
    subtotal: 5360,
    serviceCharge: 0,
    discount: 500,
    loyaltyPoints: 53,
    total: 4913,
    createdAt: "2025-03-11T20:30:00Z",
    status: "pending",
  },
  {
    id: "8",
    invoiceNumber: "#15303",
    tableNumber: "015",
    customerName: "Anna Martinez",
    type: "dining",
    orders: [
      {
        id: "o15",
        name: "Seafood Platter",
        quantity: 1,
        unitPrice: 4990,
        totalPrice: 4990,
      },
      {
        id: "o16",
        name: "Wine",
        quantity: 1,
        unitPrice: 1890,
        totalPrice: 1890,
      },
    ],
    subtotal: 6880,
    serviceCharge: 688,
    discount: 0,
    loyaltyPoints: 68,
    total: 7500,
    createdAt: "2025-07-19T17:45:00Z",
    status: "pending",
  },
];
