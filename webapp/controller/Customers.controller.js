sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("customersassignment.controller.Customers", {
            onInit: function () {

            },
            onDataExport: function () {
                var oTable = this.getView().byId("customerTable");
                var aSelectedItems = oTable.getSelectedItems();

                for (var i = 0; i < aSelectedItems.length; i++) {
                    var oBindingContext = aSelectedItems[i].getBindingContext();
                    var sCustomerID = oBindingContext.getProperty("CustomerID");
                }

                // sap.m.MessageToast.show("Number of items selected: " + iSelectedCount.length);
                sap.m.MessageToast.show("Saved : " + sCustomerID , {duration:10000});
                
                var customerData = {
                    "CustomerID": "ALFKI",
                    "CompanyName": "Alfreds Futterkiste",
                    "ContactName": "Maria Anders",
                    "ContactTitle": "Sales Representative",
                    "Address": "Obere Str. 57",
                    "City": "Berlin",
                    "PostalCode": "12209",
                    "Country": "Germany",
                    "Phone": "030-0074321",
                    "Fax": "030-0076545"
                };

                $.ajax({
                    url: "https://port4004-workspaces-ws-bz5dm.us10.trial.applicationstudio.cloud.sap/odata/v4/main/Customers",
                    type: "POST",
                    data: JSON.stringify(customerData),
                    contentType: "application/json",
                    success: function(response) {
                        console.log("Data posted successfully to BTP server!");
                    },            error: function(jqXHR, textStatus, errorThrown) {
                        console.error("Error in posting data to BTP server: ", textStatus);
                    }
                });




            },
            onFetch: function () {
                var oTable = this.getView().byId("customerTable");
                var aSelectedItems = oTable.getSelectedItems();

                for (var i = 0; i < aSelectedItems.length; i++) {
                    var oBindingContext = aSelectedItems[i].getBindingContext();
                    var sCustomerID = oBindingContext.getProperty("CustomerID");
                }

                // sap.m.MessageToast.show("Number of items selected: " + iSelectedCount.length);
                // sap.m.MessageToast.show("Saved : " + sCustomerID , {duration:10000});
                var ourl = "https://services.odata.org/V2/Northwind/Northwind.svc/Customers('" + sCustomerID + "')"
                $.ajax({
                    url: "https://services.odata.org/V2/Northwind/Northwind.svc/Customers('" + sCustomerID + "')",
                    type: "GET",
                    dataType: "json",
                    success: function(odata) {
                        sap.m.MessageToast.show("Customer data fetched successfully!");
                        console.log(data);
                },
                    error: function(jqXHR, textStatus, errorThrown) {
                        sap.m.MessageToast.show("Error in fetching customer data: " + ourl , textStatus);
                        
                    }
                });
            }
            // oReadSorter:function(){
            //     var that = this;
            //     var oModel = this.getOwnerComponent().getModel();
            //     var oSorter = new sap.ui.model.Sorter('CustomerID',true);
            //     oModel.read("/Customers", {
            //         sorter: [oSorter], success:function(odata){
            //             var jModel = new sap.ui.model.json.JSONModel(odata);
            //             that.getView.byId("/Customers").setModel(jModel);
            //         }, error:function(oError){
            //             console.log(oError);
            //         }
            //     })
            // }
        });
    });
