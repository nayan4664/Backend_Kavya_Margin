const Employee = require('../models/employee');
const Invoice = require('../models/invoice');
const Contract = require('../models/contract');
const Bench = require('../models/bench');
const Resource = require('../models/resource');
const Risk = require('../models/risk');
const Margin = require('../models/margin');
const Revenue = require('../models/revenue');
const ForecastReport = require('../models/forecastReport');

exports.getStats = async (req, res) => {
  try {
    // 1. Employee Stats
    const totalEmployees = await Employee.countDocuments();
    const employees = await Employee.find();
    const totalCost = employees.reduce((acc, emp) => acc + (emp.CTC || 0), 0);
    
    // 2. Revenue/Invoicing Stats
    const invoices = await Invoice.find();
    const totalRevenueAmount = invoices.reduce((acc, inv) => {
      const subtotal = inv.items.reduce((s, item) => s + (item.amount || 0), 0);
      return acc + (subtotal || 0);
    }, 0);
    const pendingInvoices = invoices.filter(inv => inv.status === 'Pending').length;
    const dueAmount = invoices
      .filter(inv => inv.status === 'Pending')
      .reduce((acc, inv) => acc + inv.items.reduce((s, item) => s + (item.amount || 0), 0), 0);

    // 3. Project/Contract Stats
    const totalContracts = await Contract.countDocuments();
    const activeProjects = await Contract.countDocuments({ status: 'Active' });
    const complianceRate = 94; // Mock or calculate from contracts if possible

    // 4. Bench & Resource Stats
    const totalBench = await Bench.countDocuments();
    const totalResources = await Resource.countDocuments();
    const assignedResources = await Resource.countDocuments({ status: 'Assigned' });
    const utilizationRate = totalResources > 0 ? ((assignedResources / totalResources) * 100).toFixed(1) : 0;

    // 5. Margin & AI Prediction Stats
    const margins = await Margin.find();
    const avgMargin = margins.length > 0 
      ? (margins.reduce((acc, m) => acc + parseFloat(m.margin || 0), 0) / margins.length).toFixed(1) 
      : 32.5;
    
    const highRisks = await Risk.countDocuments({ severity: 'High' });
    const forecastAccuracy = 92.4; // Mock accuracy

    // 6. Forecast Reports
    const totalReports = await ForecastReport.countDocuments();

    // 7. Monthly Trajectory (Performance Chart)
    const revenueData = await Revenue.find().sort({ month: 1 }).limit(6);
    const performanceData = revenueData.map(r => ({
      month: r.month,
      revenue: (r.actual / 1000000).toFixed(1),
      margin: (r.margin || 32),
      cost: (r.forecast / 1000000).toFixed(1)
    }));

    res.json({
      kpis: {
        totalMargin: `₹${(totalRevenueAmount * (avgMargin/100) / 1000000).toFixed(1)}M`,
        operationalCost: `₹${(totalCost / 1000000).toFixed(1)}M`,
        utilization: `${utilizationRate}%`,
        successRate: '96.8%'
      },
      moduleInsights: [
        { label: 'Organization', status: 'Active', value: '12 Depts', color: 'text-blue-400' },
        { label: 'Employee Cost', status: 'On Track', value: `₹${(totalCost / 1000000).toFixed(1)}M`, color: 'text-indigo-400' },
        { label: 'Billing', status: 'Active', value: '3 Configs', color: 'text-violet-400' },
        { label: 'Bench Management', status: 'Optimization', value: `${totalBench} Resources`, color: 'text-amber-400' },
        { label: 'Contract Analyzer', status: `${totalContracts} Total`, value: `${complianceRate}% Compliance`, color: 'text-emerald-400' },
        { label: 'AI Prediction', status: `${forecastAccuracy}% Acc`, value: `${highRisks} High Risks`, color: 'text-purple-400' },
        { label: 'Invoicing', status: `${pendingInvoices} Pending`, value: `₹${(dueAmount / 1000000).toFixed(1)}M Due`, color: 'text-rose-400' },
        { label: 'Margin Tracker', status: 'Monitoring', value: `${avgMargin}% Avg`, color: 'text-cyan-400' },
        { label: 'Resource Allocation', status: 'Active', value: `${assignedResources}/${totalResources} Assigned`, color: 'text-orange-400' },
        { label: 'Revenue Forecast', status: `${totalReports} Reports`, value: `₹${(totalRevenueAmount / 1000000).toFixed(1)}M Total`, color: 'text-green-400' },
      ],
      performanceData: performanceData.length > 0 ? performanceData : [
        { month: 'Jan', revenue: 45, margin: 32, cost: 28 },
        { month: 'Feb', revenue: 52, margin: 34, cost: 30 },
        { month: 'Mar', revenue: 48, margin: 31, cost: 32 },
        { month: 'Apr', revenue: 61, margin: 35, cost: 38 },
        { month: 'May', revenue: 55, margin: 38, cost: 35 },
        { month: 'Jun', revenue: 67, margin: 36, cost: 42 },
      ]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
