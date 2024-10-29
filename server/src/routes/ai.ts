import { Handler } from "express";
import { PromptSchema } from "../lib/types";
import { ApiError, APIErrorStatus, RestHelper } from "../lib/utils";
import { sendAIPrompt } from "../services";

// POST /api/query-ai
export const queryAIHandler: Handler = async (req, res) => {
  const parsed = PromptSchema.safeParse(req.body);
  if (!parsed.success) {
    console.error("Zod Parse error", parsed.error);
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }
  const result = await sendAIPrompt(parsed.data.text);
//   const result = JSON.parse(`{

//   "results": [

//     {

//       "title": "Maximize Superannuation Contributions",
//       "description": "Contribute to superannuation funds to take advantage of tax concessions. Consider salary sacrificing up to the concessional cap ($27,500 for the 2023 financial year) to reduce taxable income."
//     },
//     {

//       "title": "Utilize Tax Offsets",
//       "description": "Explore eligibility for tax offsets such as the Low and Middle Income Tax Offset (LMITO) and the Seniors and Pensioners Tax Offset (SAPTO) to reduce tax liability."
//     },
//     {

//       "title": "Claim Work-Related Deductions",
//       "description": "Ensure all work-related expenses are claimed, including home office expenses, travel costs, and professional development courses. Keep detailed records to substantiate claims."
//     },
//     {

//       "title": "Invest in Tax-Effective Investments",
//       "description": "Consider investing in tax-effective vehicles such as negatively geared property or shares that pay franked dividends to offset taxable income."
//     },
//     {

//       "title": "Utilize Family Trusts",
//       "description": "Establish a family trust to distribute income among beneficiaries, potentially lowering the overall tax rate. This can be particularly effective if one partner has a lower income."
//     },
//     {

//       "title": "Prepay Expenses",
//       "description": "Prepay certain expenses (e.g., insurance premiums, subscriptions) before the end of the financial year to bring forward deductions into the current tax year."
//     },
//     {

//       "title": "Consider Tax Loss Harvesting",
//       "description": "If holding investments that have decreased in value, consider selling them to realize a loss, which can offset capital gains and reduce taxable income."
//     },
//     {

//       "title": "Review Investment Structures",
//       "description": "Evaluate the structure of investments (e.g., personal name vs. company or trust) to determine the most tax-efficient way to hold assets."
//     },
//     {

//       "title": "Utilize Capital Gains Tax (CGT) Discount",
//       "description": "If holding assets for more than 12 months, ensure to apply the 50% CGT discount on any capital gains realized upon sale."
//     },
//     {

//       "title": "Consider Income Splitting",
//       "description": "If one partner has a significantly lower income, consider income splitting strategies to reduce the overall tax burden, such as transferring assets or income-generating investments."
//     }
//   ]
// }
//     `);

//     // const result = JSON.parse(`
//     //   [
//     //       "Maximize Superannuation Contributions: Contribute up to $30,000 (or $35,000 if over 50) to reduce taxable income.",
//     //       "Negative Gearing: Invest in properties or shares where costs exceed income, allowing losses to offset taxable income.",
//     //       "Salary Sacrifice: Redirect part of salary into superannuation, lowering taxable income and benefiting from lower tax rates.",
//     //       "Claim Deductions for Work-related Expenses: Keep records of and claim deductions for expenses like travel, home office, and professional development.",
//     //       "Utilize Investment Property Depreciation: Claim depreciation on investment properties to reduce taxable income.",
//     //       "Health Insurance Offset: Maintain private health insurance to avoid the Medicare Levy Surcharge for higher incomes.",
//     //       "Tax-effective Investments: Invest in managed funds for potential capital gains discounts and franking credits.",
//     //       "Family Trusts: Establish a family trust to distribute income among beneficiaries, potentially lowering overall tax rates.",
//     //       "Review Investment Income: Restructure investments to minimize tax, like holding assets for over a year for capital gains discounts.",
//     //       "Prepay Expenses: Prepay certain expenses (e.g., insurance) within the financial year to claim deductions sooner."
//     //   ]
//     //    `);

  return RestHelper.json(res, result);
};
