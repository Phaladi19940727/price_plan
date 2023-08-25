document.addEventListener("alpine:init", () => {
  Alpine.data("BOOTCAMPEXPRESSAPIWITHSQL", () => {
    return {
      title: "MY PHONEBILL API WITH SQL USING MATERIALIZE FRAMEWORK",

      titlePhoneBillsql: "MY PHONE BILL API WITH SQL",
      titlePhoneBillsqladd: "PHONE BILL PRICE PLAN CALCULATOR",
      titlePhoneBillsqlupdate: "COMMA SEPERATED TOTAL PRICE PLAN",
      titlePhoneBillsqldelete: "DELETING AN EXISITING PRICE PLAN",
      titlePhoneBillsqlavailable:
        "TOTAL AVAILABLE PRICE PLANS IN THE DATABABSE",
      totalplanprice: false,
      call_price: 0,
      sms_price: 0,
      plan_name: "",
      response: [],
      addMessage: "",
      deleteMesage: "",
      updateMessage: "",
      open: false,
      selectedDb: "",
      total: "",
      actions: "",
      selectedName: "",
      

      // Phone bill starts Here

      // get all plan price plan starts here
      getPlans() {
        axios.get("/api/price_plans").then((result) => {
          this.response = result.data.price_plans;
          console.log(result.data.price_plans);
        });
      },

      // get all price plans ends here

      // creating a new price plan starts here

      createPlan() {
        // if(this.plan_name==plan_name && this.sms_price == sms_price && this.call_price == call_price){
        //   this.addMessage = "There exists a price pln with the exact information in the databse. Would you like to update ?"
        // } else{

        axios
          .post("/api/price_plan/create", {
            plan_name: this.plan_name,
            sms_price: this.sms_price,
            call_price: this.call_price,
          })
          .then((result) => {
            console.log("result here " + result.data.response);
            this.addMessage = this.plan_name + " plan name successfully added";
            this.getPlans()
          });
          setTimeout(() => (this.plan_name = "",this.sms_price="",this.call_price="",this.addMessage=""), 3000);
        // }
      },

      // creating a new price plans ends here

      // total phone bill starts here 

      phoneBill() {
        axios
            .post('/api/price_plan/phonebill', {
                plan_name: this.selectedName,
                actions: this.actions
            })
            .then((result) => {
                this.total = result.data.total;
            })
            setTimeout(() => (this.selectedName = "",this.actions="",this.total=""), 3000);
    },

      // total phone bill ends here 

      // updating a price plan starts here
      updatePlan() {
        axios
          .post("/api/price_plan/update", {
            plan_name: this.plan_name,
            call_price: this.call_price,
            sms_price: this.sms_price,
          })
          .then((result) => {
            this.response = result.data;
            this.updateMessage = this.plan_name + " plan name successfully updated";
            this.getPlans()
          });
          setTimeout(() => (this.plan_name = "",this.sms_price="",this.call_price="",this.updateMessage=""), 3000);
      },

      // updating a price plan ends here

      

      // delete plan starts here

      deletePlan(plan_name) {
        axios
          .post("/api/price_plan/delete", {
            plan_name: plan_name,
          }) 
          .then((result) => {
            this.response = result.data.response

            // console.log("result here" + result.data.response);

            this.deleteMesage = this.plan_name + " plan name successfully deleted";
            this.getPlans()
          });
        setTimeout(() => (this.deleteMesage = ""), 3000);
      },
      // delete plan ends here

      init() {
        this.getPlans();
        // this.createPlan();
      },

      // total starts here 
      planTotal() {
        axios
            .post('/api/price_plan/phonebill', {
                price_plan: this.selectedName,
                actions: this.actions
            })
            .then((result) => {
                this.total = result.data.total;
            })
    },

    
      // total ends here 

      refresh() {
        this.plan_name = "";
        this.sms_price = "";
        this.call_price = "";
      },

      totalefresh() {
        this.selectedName = "";
        this.actions = "";
      },
    };
  });
});
