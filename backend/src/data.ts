export const products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 }
];

export const warehouses = [
  { id: "BLR-A", name: "Bangalore A", location: "Bangalore" },
  { id: "PNQ-C", name: "Pune C", location: "Pune" },
  { id: "DEL-B", name: "Delhi B", location: "Delhi" }
];

export const generateKPIData = (range: string) => {
  const days = range === "7d" ? 7 : range === "14d" ? 14 : 30;
  const data = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
    
    data.push({
      date: date.toISOString().split('T')[0],
      stock: Math.floor(totalStock + (Math.random() - 0.5) * 50),
      demand: Math.floor(totalDemand + (Math.random() - 0.5) * 40)
    });
  }
  
  return data;
};