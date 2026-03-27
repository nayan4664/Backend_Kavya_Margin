const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/employee');
const Resource = require('./models/resource');
const Risk = require('./models/risk');
const Margin = require('./models/margin');
const Revenue = require('./models/revenue');
const ForecastReport = require('./models/forecastReport');
const MarginTrend = require('./models/marginTrend');
const Invoice = require('./models/invoice');
const Company = require('./models/company');
const BillingModel = require('./models/billingModel');
const Department = require('./models/department');
const Bench = require('./models/bench');
const Contract = require('./models/contract');
const User = require('./models/user');

dotenv.config();

const employees = [
  { name: 'Nayan Sharma', email: 'nayan@kavyainfoweb.com', role: 'Super Admin', department: 'Executive', joiningDate: '2023-01-15', CTC: 2400000, monthlyCost: 200000, location: 'Nagpur' },
  { name: 'Sushil Kumar', email: 'sushil@kavyainfoweb.com', role: 'Company Admin', department: 'Management', joiningDate: '2023-02-10', CTC: 1800000, monthlyCost: 150000, location: 'Nagpur' },
  { name: 'Rajni Singh', email: 'rajni@kavyainfoweb.com', role: 'Project Manager', department: 'Operations', joiningDate: '2023-03-05', CTC: 1500000, monthlyCost: 125000, location: 'Nagpur' }
];

const resources = [
  { name: 'Amit Verma', role: 'Frontend Developer', primarySkill: 'React.js', secondarySkill: 'Node.js', proficiencyLevel: 'Expert', experienceYears: 5, currentProject: 'Project Alpha', releaseDate: '2026-04-15', availabilityPercentage: 0, allocationPercentage: 100, department: 'Frontend' },
  { name: 'Sonal Singh', role: 'UI/UX Designer', primarySkill: 'Figma', secondarySkill: 'Adobe XD', proficiencyLevel: 'Advanced', experienceYears: 4, currentProject: 'Design System', releaseDate: '2026-03-20', availabilityPercentage: 20, allocationPercentage: 80, department: 'Design' }
];

const risks = [
  { name: 'Project Alpha Margin Leakage', impact: 'High', probability: '70%', score: 85, category: 'Financial', action: 'Shift 2 FTEs to Offshore' },
  { name: 'Resource Bench Duration', impact: 'Medium', probability: '40%', score: 45, category: 'Resource', action: 'Internal Skill Upskilling' }
];

const margins = [
  { name: 'Project Alpha', client: 'TechCorp', margin: 32, revenue: '₹4.5M', status: 'On Track' },
  { name: 'Project Beta', client: 'GlobalSoft', margin: 18, revenue: '₹2.1M', status: 'At Risk' }
];

const revenues = [
  { month: "Jan", year: 2025, confirmed: 3200000, weighted: 3500000, target: 3600000, actual: 3200000, forecast: 3500000, margin: 32 },
  { month: "Feb", year: 2025, confirmed: 3000000, weighted: 3400000, target: 3500000, actual: 3000000, forecast: 3400000, margin: 34 }
];

const forecastReports = [
  { name: "Q1 Performance Review", type: "Financial", author: "System AI", date: "2026-04-01", size: "1.2 MB" },
  { name: "H2 Revenue Projections", type: "Forecast", author: "Admin User", date: "2026-03-15", size: "2.4 MB" }
];

const marginTrends = [
  { month: "Jan", year: 2025, gross: 32, net: 24, target: 30 },
  { month: "Feb", year: 2025, gross: 34, net: 26, target: 30 }
];

const invoices = [
  { invoiceId: 'INV-2026-001', clientName: 'TechCorp', project: 'Project Alpha', date: '2026-03-01', dueDate: '2026-03-15', items: [{ description: 'Frontend Development', hours: 160, rate: 2500, amount: 400000 }], taxRate: 18, status: 'Paid' },
  { invoiceId: 'INV-2026-003', clientName: 'SkyHigh', project: 'Cloud Migration', date: '2026-03-10', dueDate: '2026-03-25', items: [{ description: 'Cloud Infrastructure', hours: 200, rate: 3500, amount: 700000 }], taxRate: 18, status: 'Pending' }
];

const companies = [
  { companyName: 'Kavya Infoweb', registrationNumber: 'AA12345BB', website: 'https://kavyainfoweb.com', email: 'contact@kavyainfoweb.com', address: 'Nagpur, India', currency: 'INR', fiscalYearStart: 'April' }
];

const billingModels = [
  { modelName: 'T&M (Time & Material)', description: 'Billing based on actual hours worked.', rate: 30, type: 'Variable' },
  { modelName: 'Fixed Price', description: 'Pre-defined cost for entire project scope.', rate: 40, type: 'Fixed' }
];

const departments = [
  { departmentName: 'Engineering', head: 'Rajesh Kumar', staffCount: 145, budget: '₹12M' },
  { departmentName: 'Design', head: 'Ananya Singh', staffCount: 18, budget: '₹2.5M' }
];

const benches = [
  { name: 'Priya Das', role: 'QA Engineer', bench_duration_weeks: 4, cost_impact: 45000, primary_skill: 'Selenium', secondary_skill: 'Cypress', status: 'Active', reallocation_score: 85 }
];

const contracts = [
  { name: 'TechCorp MSA', size: 'Large', status: 'Active', date: '2023-01-01', insights: [{ insightType: 'Financial', title: 'Revenue Growth', desc: 'Expected to grow by 15%', impact: 'High', status: 'On Track', color: 'blue' }] }
];

const users = [
  { fullName: 'Nayan Sharma', email: 'nayan@kavyainfoweb.com', password: 'Nayan@4664', role: 'Super Admin', contactNumber: '9876543210' }
];

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.name}`);

    // Clear existing data
    await Employee.deleteMany();
    await Resource.deleteMany();
    await Risk.deleteMany();
    await Margin.deleteMany();
    await Revenue.deleteMany();
    await ForecastReport.deleteMany();
    await MarginTrend.deleteMany();
    await Invoice.deleteMany();
    await Company.deleteMany();
    await BillingModel.deleteMany();
    await Department.deleteMany();
    await Bench.deleteMany();
    await Contract.deleteMany();
    await User.deleteMany();
    console.log('Cleared existing data.');

    // Seed Data
    await Employee.insertMany(employees);
    await Resource.insertMany(resources);
    await Risk.insertMany(risks);
    await Margin.insertMany(margins);
    await Revenue.insertMany(revenues);
    await ForecastReport.insertMany(forecastReports);
    await MarginTrend.insertMany(marginTrends);
    await Invoice.insertMany(invoices);
    await Company.insertMany(companies);
    await BillingModel.insertMany(billingModels);
    await Department.insertMany(departments);
    await Bench.insertMany(benches);
    await Contract.insertMany(contracts);
    await User.insertMany(users);

    console.log('✅ Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();