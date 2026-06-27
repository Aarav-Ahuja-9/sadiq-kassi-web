import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'src/lib/data_products.json');
const ORDERS_FILE = path.join(process.cwd(), 'src/lib/data_orders.json');

// Initialize files if they don't exist
function initFile(filePath: string, defaultData: any) {
  try {
    if (!fs.existsSync(filePath)) {
      // Ensure folder exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    }
  } catch (e) {
    console.error(`Failed to initialize file ${filePath}`, e);
  }
}

export function getLocalProducts() {
  initFile(PRODUCTS_FILE, []);
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveLocalProduct(product: any) {
  initFile(PRODUCTS_FILE, []);
  try {
    const products = getLocalProducts();
    products.push(product);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
}

export function getLocalOrders() {
  initFile(ORDERS_FILE, []);
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveLocalOrder(order: any) {
  initFile(ORDERS_FILE, []);
  try {
    const orders = getLocalOrders();
    orders.push(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
}

const USERS_FILE = path.join(process.cwd(), 'src/lib/data_users.json');

export function getLocalUsers() {
  initFile(USERS_FILE, []);
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveLocalUser(user: any) {
  initFile(USERS_FILE, []);
  try {
    const users = getLocalUsers();
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
}

export function findLocalUserByEmail(email: string) {
  const users = getLocalUsers();
  return users.find((u: any) => u.email.toLowerCase() === email.toLowerCase()) || null;
}
