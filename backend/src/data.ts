export const products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
  { id: "P-1005", name: "Allen Key Set", sku: "ALN-SET-6", warehouse: "BLR-A", stock: 95, demand: 60 },
  { id: "P-1006", name: "Spring Washer", sku: "SPR-12-300", warehouse: "PNQ-C", stock: 200, demand: 180 },
  { id: "P-1007", name: "Flat Head Screw", sku: "FLT-08-150", warehouse: "DEL-B", stock: 45, demand: 90 },
  { id: "P-1008", name: "Ball Bearing", sku: "BBR-625-25", warehouse: "BLR-A", stock: 75, demand: 75 },
  { id: "P-1009", name: "Rubber Gasket", sku: "RBR-20-100", warehouse: "PNQ-C", stock: 120, demand: 95 },
  { id: "P-1010", name: "Metal Bracket", sku: "MTL-L90-50", warehouse: "DEL-B", stock: 35, demand: 70 },
  { id: "P-1011", name: "Precision Gear", sku: "GER-24T-10", warehouse: "BLR-A", stock: 18, demand: 25 },
  { id: "P-1012", name: "Valve Assembly", sku: "VLV-12-ALU", warehouse: "PNQ-C", stock: 60, demand: 45 },
  { id: "P-1013", name: "Copper Wire", sku: "COP-AWG14-M", warehouse: "DEL-B", stock: 150, demand: 200 },
  { id: "P-1014", name: "Plastic Spacer", sku: "PLS-05-500", warehouse: "BLR-A", stock: 300, demand: 250 },
  { id: "P-1015", name: "Motor Mount", sku: "MTR-NEMA17", warehouse: "PNQ-C", stock: 12, demand: 30 },
  { id: "P-1016", name: "Heat Sink", sku: "HSK-ALU-40", warehouse: "DEL-B", stock: 85, demand: 65 },
  { id: "P-1017", name: "Threaded Rod", sku: "THR-M10-1M", warehouse: "BLR-A", stock: 40, demand: 55 },
  { id: "P-1018", name: "Lock Washer", sku: "LCK-10-200", warehouse: "PNQ-C", stock: 180, demand: 160 },
  { id: "P-1019", name: "Cable Tie", sku: "CBL-TIE-BLK", warehouse: "DEL-B", stock: 15, demand: 45 },
  { id: "P-1020", name: "Pressure Sensor", sku: "PRS-0-100PSI", warehouse: "BLR-A", stock: 28, demand: 35 },
  { id: "P-1021", name: "LED Strip", sku: "LED-5050-5M", warehouse: "PNQ-C", stock: 65, demand: 90 }
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