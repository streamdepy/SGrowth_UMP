const express = require("express");
const router = express.Router();

// D:\Agif\Lomba\Sgrowth_WICE\ump\routes\mitra.js

const getBusinessDataFromQuery = (query) => {
  const cleanQuery = {};
  for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
          let value = query[key];

          // 💡 Solusi: Periksa apakah nilai adalah string sebelum memanggil .replace()
          if (typeof value === 'string') {
              // Proses normal jika nilai adalah string
              value = decodeURIComponent(value.replace(/\+/g, ' '));
          } else if (Array.isArray(value)) {
              // Jika nilai adalah array (seperti supplier_type[]), biarkan sebagai array
              // Anda mungkin perlu memproses setiap elemen jika diperlukan,
              // tetapi untuk saat ini, kita biarkan sebagai array karena .replace() akan gagal.
              // Contoh: value = value.map(item => decodeURIComponent(item.replace(/\+/g, ' ')));
              value = value;
          }
          
          cleanQuery[key] = value;
      }
  }

  // Membuat objek 'business' dengan data yang sudah dibersihkan
  const business = {
      organization_name: cleanQuery.organization_name,
      business_license_number: cleanQuery.business_license_number,
      ownership_type: cleanQuery.ownership_type,
      legal_form: cleanQuery.legal_form,
      headquarters: cleanQuery.headquarters,
      industry_type: cleanQuery.industry_type,
      pic_name: cleanQuery.pic_name,
      pic_email: cleanQuery.pic_email,
      pic_phone: cleanQuery.pic_phone,
      
      // Hardcoded/default data
      established_year: '2030', 
      business_id: 'CF-IDP0000353'
  };

  return business;
};

router.get("/dashboard", function (req, res, next) {
  const queryData = req.query;
  const businessData = getBusinessDataFromQuery(queryData);

  // Meneruskan objek 'business' ke view
  res.render("mitra/dashboard", {
      title: "Dashboard mitra",
      layout: "mitra",
      business: businessData 
  });
});

router.get("/form-gri", function (req, res, next) {
  res.render("mitra/form-gri", {
    title: "Form GRI",
    layout: "mitra",
  });
});

router.get("/form-gi", function (req, res, next) {
  res.render("mitra/form-gi", {
    title: "Form GI",
    layout: "mitra",
  });
});

router.get("/gri-1", function (req, res, next) {
  res.render("mitra/gri-economic/gri-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gri-2", function (req, res, next) {
  // Ambil semua query parameters dari URL
  const {
    gri_id,
    // Revenue
    revenue,
    revenue_notes,
    net_sales,
    net_sales_notes,
    sales,
    sales_notes,
    financial_investment_income,
    financial_investment_income_notes,
    asset_sales_income,
    asset_sales_income_notes,
    // Expenses
    general_admin_expenses,
    general_admin_notes,
    salary_expenses,
    salary_employee_notes,
    transport_expenses,
    transport_notes,
    fuel_expenses,
    fuel_notes,
    electricity_expenses,
    electricity_notes,
    internet_expenses,
    internet_notes,
    telephone_expenses,
    telephone_notes,
    water_expenses,
    water_notes,
    property_rental_expenses,
    property_rental_notes,
    license_fees,
    license_fees_notes,
    facility_payments,
    facility_payments_notes,
    royalties,
    royalties_notes,
    contract_worker_payments,
    contract_worker_notes,
    training_costs,
    training_costs_notes,
    protective_clothing_costs,
    protective_clothing_notes,
    dividend_interest_expenses,
    dividend_interest_notes,
    taxes,
    taxes_notes,
    community_investment,
    community_investment_notes
  } = req.query;

  // Helper function untuk convert ke number
  const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // Kalkulasi Total Revenue
  const totalRevenue = toNumber(revenue) || 
    (toNumber(net_sales) + toNumber(sales) + 
     toNumber(financial_investment_income) + toNumber(asset_sales_income));

  // Kalkulasi Operational Costs
  const operationalCosts = [
    toNumber(general_admin_expenses),
    toNumber(salary_expenses),
    toNumber(transport_expenses),
    toNumber(fuel_expenses),
    toNumber(electricity_expenses),
    toNumber(internet_expenses),
    toNumber(telephone_expenses),
    toNumber(water_expenses),
    toNumber(property_rental_expenses),
    toNumber(license_fees),
    toNumber(facility_payments),
    toNumber(royalties),
    toNumber(contract_worker_payments),
    toNumber(training_costs),
    toNumber(protective_clothing_costs)
  ];

  const totalOperational = operationalCosts.reduce((sum, cost) => sum + cost, 0);

  // Kalkulasi Non-Operating Costs
  const totalNonOperating = toNumber(dividend_interest_expenses) + 
                            toNumber(taxes) + 
                            toNumber(community_investment);

  // Total Expenses
  const totalExpenses = totalOperational + totalNonOperating;

  // Profit/Loss
  const profitLossNum = totalRevenue - totalExpenses;
  
  // Tentukan warna berdasarkan profit/loss
  const profitLossColor = profitLossNum > 0 ? 'text-green-600' : 
                          profitLossNum < 0 ? 'text-red-600' : 
                          'text-teal-700';

  // Mencari Biggest Expense
  const expenseCategories = [
    { category: "General & Administrative Expenses", amount: toNumber(general_admin_expenses) },
    { category: "Salary Expenses", amount: toNumber(salary_expenses) },
    { category: "Transportation Expenses", amount: toNumber(transport_expenses) },
    { category: "Fuel Expenses", amount: toNumber(fuel_expenses) },
    { category: "Electricity Expenses", amount: toNumber(electricity_expenses) },
    { category: "Internet Expenses", amount: toNumber(internet_expenses) },
    { category: "Telephone Expenses", amount: toNumber(telephone_expenses) },
    { category: "Water Expenses", amount: toNumber(water_expenses) },
    { category: "Property Rental Expenses", amount: toNumber(property_rental_expenses) },
    { category: "License Fees", amount: toNumber(license_fees) },
    { category: "Facility Payments", amount: toNumber(facility_payments) },
    { category: "Royalties", amount: toNumber(royalties) },
    { category: "Contract Worker Payments", amount: toNumber(contract_worker_payments) },
    { category: "Training Costs", amount: toNumber(training_costs) },
    { category: "Protective Clothing Costs", amount: toNumber(protective_clothing_costs) }
  ];

  // Filter yang ada nilainya dan cari yang terbesar
  const validExpenses = expenseCategories.filter(exp => exp.amount > 0);
  const biggestExpense = validExpenses.length > 0 
    ? validExpenses.reduce((max, exp) => exp.amount > max.amount ? exp : max)
    : null;

  // Hitung persentase jika ada
  if (biggestExpense && totalOperational > 0) {
    biggestExpense.percentage = ((biggestExpense.amount / totalOperational) * 100).toFixed(2);
  }

  // Format currency untuk display
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  res.render("mitra/gri-economic/gri-2", {
    title: "GRI Economic Summary",
    layout: "mitra",
    currentPath: req.path,
    
    // Pass semua query parameters
    gri_id,
    revenue: revenue || 0,
    revenue_notes,
    net_sales: net_sales || 0,
    net_sales_notes,
    sales: sales || 0,
    sales_notes,
    financial_investment_income: financial_investment_income || 0,
    financial_investment_income_notes,
    asset_sales_income: asset_sales_income || 0,
    asset_sales_income_notes,
    general_admin_expenses: general_admin_expenses || 0,
    general_admin_notes,
    salary_expenses: salary_expenses || 0,
    salary_employee_notes,
    transport_expenses: transport_expenses || 0,
    transport_notes,
    fuel_expenses: fuel_expenses || 0,
    fuel_notes,
    electricity_expenses: electricity_expenses || 0,
    electricity_notes,
    internet_expenses: internet_expenses || 0,
    internet_notes,
    telephone_expenses: telephone_expenses || 0,
    telephone_notes,
    water_expenses: water_expenses || 0,
    water_notes,
    property_rental_expenses: property_rental_expenses || 0,
    property_rental_notes,
    license_fees: license_fees || 0,
    license_fees_notes,
    facility_payments: facility_payments || 0,
    facility_payments_notes,
    royalties: royalties || 0,
    royalties_notes,
    contract_worker_payments: contract_worker_payments || 0,
    contract_worker_notes,
    training_costs: training_costs || 0,
    training_costs_notes,
    protective_clothing_costs: protective_clothing_costs || 0,
    protective_clothing_notes,
    dividend_interest_expenses: dividend_interest_expenses || 0,
    dividend_interest_notes,
    taxes: taxes || 0,
    taxes_notes,
    community_investment: community_investment || 0,
    community_investment_notes,
    
    // Calculated values
    totalOperational: formatCurrency(totalOperational),
    totalNonOperating: formatCurrency(totalNonOperating),
    totalExpenses: formatCurrency(totalExpenses),
    profitLoss: formatCurrency(profitLossNum),
    profitLossColor: profitLossColor, // Tambahkan ini
    
    // Biggest expense analysis
    biggestExpense: biggestExpense ? {
      category: biggestExpense.category,
      amount: formatCurrency(biggestExpense.amount),
      percentage: biggestExpense.percentage
    } : null
  });
});

router.get("/env-1", function (req, res, next) {
  res.render("mitra/gri-env/env-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

// router.post("/env-1", middlewareValidation, environmentController.saveEnvironmentBasicInfo);
// router.post("/env-2", middlewareValidation, environmentController.saveEnvScope1);

router.get("/env-2", function (req, res, next) {
  res.render("mitra/gri-env/env-2", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-3", function (req, res, next) {
  res.render("mitra/gri-env/env-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-4", function (req, res, next) {
  res.render("mitra/gri-env/env-4", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-5", function (req, res, next) {
  res.render("mitra/gri-env/env-5", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-6", function (req, res, next) {
  res.render("mitra/gri-env/env-6", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/env-7", function (req, res, next) {
  res.render("mitra/gri-env/env-7", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gov-1", function (req, res, next) {
  res.render("mitra/gri-gov/gov-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gov-2", function (req, res, next) {
  res.render("mitra/gri-gov/gov-2", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/gov-3", function (req, res, next) {
  res.render("mitra/gri-gov/gov-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-1", function (req, res, next) {
  res.render("mitra/gri-material/material-1", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-2", function (req, res, next) {
  res.render("mitra/gri-material/material-2", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-3", function (req, res, next) {
  res.render("mitra/gri-material/material-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/material-4", function (req, res, next) {
  res.render("mitra/gri-material/material-4", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/social-1", function (req, res, next) {
  res.render("mitra/gri-social/social-1", {
    title: "GRI Social - K3",
    layout: "mitra", 
    currentPath: req.path,
    gri_id: req.query.gri_id || null,
    reporting_period: req.query.period || null,
  });
});

router.get("/social-2", function (req, res, next) {
  res.render("mitra/gri-social/social-2", {
    title: "GRI Social - Penyakit Akibat Kerja",
    layout: "mitra",
    currentPath: req.path,
    social_id: req.query.social_id || null,
    reporting_period: req.query.period || null,
  });
});

router.get("/social-3", function (req, res, next) {
  res.render("mitra/gri-social/social-3", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/social-4", function (req, res, next) {
  res.render("mitra/gri-social/social-4", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/social-5", function (req, res, next) {
  res.render("mitra/gri-social/social-5", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/konsultan", function (req, res, next) {
  res.render("mitra/konsultan/cari-konsultan", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/profilKonsultan", function (req, res, next) {
  res.render("mitra/konsultan/profilKonsultan", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/chatKonsultan", function (req, res, next) {
  res.render("mitra/konsultan/chatKonsultan", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/bookingTransaksi", function (req, res, next) {
  res.render("mitra/konsultan/bookingTransaksi", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/bookingSesiKonsultan", function (req, res, next) {
  res.render("mitra/konsultan/bookingSesiKonsultan", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/bookingSummary", function (req, res, next) {
  res.render("mitra/konsultan/bookingSummary", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

router.get("/komunitas", function (req, res, next) {
  res.render("mitra/komunitas/komunitas", {
    title: "Form GRI",
    layout: "mitra",
    currentPath: req.path,
  });
});

module.exports = router;
