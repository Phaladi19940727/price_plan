import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";

const db = await sqlite.open({
  filename: "./data_plan.db",
  driver: sqlite3.Database,
});

await db.migrate();

// All plans in the database starts here
export async function getPlans() {
  const price_plans = await db.all(`select * from price_plan`);

  return price_plans?.map((item) => {
    return {
      ...item,
      total: (Number(item.sms_price) + Number(item.call_price)).toFixed(2),
    };
  });
}
// all plans in the database ends  here

// total price price for comma seperated functon starts here 

export async function totalPhoneBill(plan_name, actions) {
  const sql = 'select sms_price, call_price from price_plan where plan_name = ?';
  const result = await db.all(sql, [plan_name]);
 

  let l = actions.split(",");
  var cost = 0;
  const callCost = Number(result[0].call_price);
  const smsCost = Number(result[0].sms_price);
  
  for (var name of l) {
    if (name.includes("call")) {
      cost += callCost;
    } else {
      cost += smsCost;
    }
  }

   return cost.toFixed(2);
}
// total price price for comma seperated functon ends here 

// adding a new price plan starts here

export async function createPlan(name, sms_cost, call_cost) {
  await db.run(
    `insert into price_plan (plan_name, sms_price, call_price) VALUES (?,?,?)`,
    [name, sms_cost, call_cost]
  );
}

export async function deletePlan(name) {
  // console.log(name)
  await db.run(`delete from price_plan where plan_name = ?`, [name]);
}

export async function updatePlan(name, sms_cost, call_cost){
  const sql = 'update price_plan set call_price = ?, sms_price = ? where plan_name = ?';
  await db.run(sql, [call_cost, sms_cost, name]);
}



