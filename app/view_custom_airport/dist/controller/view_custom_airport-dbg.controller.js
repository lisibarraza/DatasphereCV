sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/vbm/GeoMap",
    "sap/ui/vbm/Spots",
    "sap/ui/vbm/Spot",
], function (Controller, MessageBox, Fragment, MessageToast, Filter, FilterOperator, GeoMap, Spots, Spot) {
    "use strict";

    return Controller.extend("viewcustomairport.controller.view_custom_airport", {
        onInit() {
        }, //submit function to Add Airport
        submit: function(){
            var id = this.getView().byId("id").getValue();
            var name = this.getView().byId("name").getValue();
            var timeZone = this.getView().byId("timezone").getValue();
            var mandante = "300";
            var oModel = this.getView().getModel();

            var oContext = oModel.bindList("/Airport").create({
                "ID" : id,
                "NAME" : name,
                "TIME_ZONE" : timeZone,
                "MANDT" : mandante
            });
            oContext.created().then(() => {
                MessageBox.success("Airport Added Successfully");                
                this.getView().byId("id").setValue(null);
                this.getView().byId("name").setValue(null);
                this.getView().byId("timezone").setValue(null);                
            }).catch((err) => {
                MessageBox.error("error adding new product");
                console.error("Error adding Airport: "+ err);
            });
        }, 
        submitCity: function(){
            var city = this.getView().byId("city").getValue();
            var country = this.getView().byId("country").getValue();
            var airport = this.getView().byId("airport").getValue();
            var masterCity = this.getView().byId("masterCity").getValue();
            var mandante = "300";
            var oModel = this.getView().getModel();

            var oContext = oModel.bindList("/City").create({
                "CITY" : city,
                "COUNTRY" : country,
                "AIRPORT" : airport,
                "MASTERCITY" : masterCity,
                "MANDANT" : mandante
            });
            oContext.created().then(() => {
                MessageBox.success("City Added Successfully");                
                this.getView().byId("city").setValue(null);
                this.getView().byId("country").setValue(null);
                this.getView().byId("airport").setValue(null);                
                this.getView().byId("masterCity").setValue(null);
            }).catch((err) => {
                MessageBox.error("error adding new City");
                console.error("Error adding City: "+ err);
            });
        },//liveChange to control entry in Airport Name to be only Letters
        onliveChange: function (oEvent) {
            var oInput = oEvent.getSource();
            var sOldValue = oEvent.getParameter("value");
            
            // Regex explanation: 
            // [^a-zA-Z] matches any character that is NOT a letter (a-z or A-Z)
            // /g is a global flag to replace all occurrences
            var sNewValue = sOldValue.replace(/[^a-zA-Z]/g, '');

            // Only update the value if it actually changed to prevent cursor jumps
            if (sOldValue !== sNewValue) {
                oInput.setValue(sNewValue);
            }
        }, //liveChange to control only numbers in a range in Latitude Longitude
        onLiveChangeNumber: function(oEvent) {
            var sValue = oEvent.getParameter("value");
            // This regex allows numbers, one decimal point, and a leading minus sign
            var sNewValue = sValue.replace(/[^\d.-]/g, '');
            
            // Prevent double decimals
            if ((sNewValue.match(/\./g) || []).length > 1) {
                sNewValue = sNewValue.slice(0, -1);
            }
            
            oEvent.getSource().setValue(sNewValue);
        },
        onAfterRendering: function() {
            var oComboBox = this.getView().byId("dropdownAirportGeo");
            oComboBox.addEventDelegate({
                onAfterRendering: function() {
                    // This prevents typing but keeps the dropdown functional
                    oComboBox.$().find("input").attr("readonly", "readonly");
                }
            });
        },
        onCollapseExpandPress() {
			const oSideNavigation = this.byId("sideNavigation"),
				bExpanded = oSideNavigation.getExpanded();

			oSideNavigation.setExpanded(!bExpanded);
		},
        onAddAirportPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("addAirportPanel");
            oPanel.setVisible(true);
        },
        onAddCityPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("addCityAirportPanel");
            oPanel.setVisible(true);
        },
        onAddGeoLocationPressed(){
            this.hideAllPanels();
            this.loadAirports();
            var oPanel = this.byId("addGeoLocationPanel");
            oPanel.setVisible(true);
        },
        onViewDetailsAirportPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelAirportDetails");
            var oTable = this.byId("_IDGenTable");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                // V4 refresh() returns a promise and forces a server-side reload
                oBinding.refresh(); 
            }
            oPanel.setVisible(true);
        },
        onViewDetailsAirplanePressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelAirplane");
            oPanel.setVisible(true);
        },
        onViewAirplanePressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelViewAirplane");
            oPanel.setVisible(true);
        },
        onEditAirportPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("Panel3");
            oPanel.setVisible(true);
        },
        onViewAirportPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelViewAirport");
            oPanel.setVisible(true);
        },
        onViewMapPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelAirportMap");
            var oTable = this.byId("_IDGenTableGeo");
            var oBinding = oTable.getBinding("items");

            if (oBinding) {
                // V4 refresh() returns a promise and forces a server-side reload
                oBinding.refresh(); 
            }
            oPanel.setVisible(true);            
        },
        onEditGeoPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelGeoUpdate");
            oPanel.setVisible(true);            
        },
        onEditAirplanePressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelEditAirplane");
            oPanel.setVisible(true);
        },
        onViewGeoPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelGeoView");
            oPanel.setVisible(true);            
        },
        onRepAgencyPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelReporteAgencia");
            oPanel.setVisible(true);
        },
        onRepCustomerPressed(){
            this.hideAllPanels();
            var oPanel = this.byId("PanelReporteCustomer");
            oPanel.setVisible(true);
        },
        showPanelRepAgcy(){
            var oPanel = this.byId("PanelRepoAgcTabla");
            oPanel.setVisible(true);
        },
        showPanelAgency(){
            var oPanel = this.byId("PanelAgency");
            oPanel.setVisible(true);
        },
        showPanelCustomer(){
            var oPanel = this.byId("PanelCustomer");
            oPanel.setVisible(true);
        },
        showPanelRepCustomer(){
            var oPanel = this.byId("PanelRepoCustTabla");
            oPanel.setVisible(true);
        },
        showPanelRepAgcySales(){
            this.hideAllPanels();
            this.loadValuesDates();
            var oPanel = this.byId("PanelRepAgcySales");
            oPanel.setVisible(true); 
        },
        hideAllPanels(){
            this.byId("addAirportPanel").setVisible(false);
            this.byId("PanelAirportDetails").setVisible(false);
            this.byId("Panel3").setVisible(false);
            this.byId("PanelAirplane").setVisible(false);            
            this.byId("PanelViewAirport").setVisible(false);
            this.byId("PanelAirportMap").setVisible(false);
            this.byId("PanelGeoUpdate").setVisible(false);
            this.byId("PanelGeoView").setVisible(false);
            this.byId("PanelReporteAgencia").setVisible(false);
            this.byId("PanelReporteCustomer").setVisible(false);
            this.byId("PanelRepoAgcTabla").setVisible(false);
            this.byId("PanelAgency").setVisible(false);
            this.byId("PanelRepoCustTabla").setVisible(false);
            this.byId("PanelCustomer").setVisible(false);
            this.byId("PanelRepAgcySales").setVisible(false);
            this.byId("PanelViewAirplane").setVisible(false);
            this.byId("PanelEditAirplane").setVisible(false);
            this.byId("addCityAirportPanel").setVisible(false);
            this.byId("addGeoLocationPanel").setVisible(false);
        },
        onActionPressed:function(oEvent){
            this.onAnyActionPressed(oEvent,"ActionSheet");
        },
        onActionPlanePressed:function(oEvent){
            this.onAnyActionPressed(oEvent,"ActionPlaneSheet");
        },
        onGeoActionPressed:function(oEvent){
            this.onAnyActionPressed(oEvent,"ActionGeoSheet");
        },
        onAnyActionPressed: function(oEvent, sFragShortName) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext();
            var sPath = oContext ? oContext.getPath() : null;

            //Gets the context saved for after
            this._oSelectedContext = oContext; 
            
            var sFullName = "customviewairport.view." + sFragShortName;
            var sUniqueId = this.getView().createId(sFragShortName);

            // Initialize the map if it doesn't exist
            this._mFragments = this._mFragments || {};

            // Check the MAP instead of a single variable
            if (!this._mFragments[sFragShortName]) {
                sap.ui.core.Fragment.load({
                    id: sUniqueId, 
                    name: sFullName,
                    controller: this
                }).then(function(oFragment) {
                    // Store it in the map using its name
                    this._mFragments[sFragShortName] = oFragment;
                    this.getView().addDependent(oFragment);
                    
                    oFragment.bindElement(sPath);
                    oFragment.openBy(oButton);
                }.bind(this));
            } else {
                // Retrieve the CORRECT fragment from the map
                var oFragment = this._mFragments[sFragShortName];
                oFragment.bindElement(sPath);
                oFragment.openBy(oButton);
            }
        },
        onDeletePress : function(){
            var oContext = this._oSelectedContext;
            var sAirportId = oContext.getProperty("ID");
            MessageBox.confirm("Are you sure you want to delete this Airport: " + sAirportId +"?",{
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function(oAction){
                    if(oAction === MessageBox.Action.YES){
                        //Code to delete airport by its sAirportID
                        oContext.delete("$direct").then(function(){
                            MessageBox.success("Airport ID: " + sAirportId +  " deleted successfully!");
                        }).catch(function(oError){
                            MessageBox.error("Error deleting Airport with ID: " + sAirportId + "." + oError + " Please try again later");
                        });
                    }
                }
            })
        },
        onDeletePlanePress : function(){
            var oContext = this._oSelectedContext;
            var sAirplaneId = oContext.getProperty("PLANETYPE");
            MessageBox.confirm("Are you sure you want to delete this Airplane: " + sAirplaneId +"?",{
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function(oAction){
                    if(oAction === MessageBox.Action.YES){
                        //Code to delete airplane by its sAirplaneId
                        oContext.delete("$direct").then(function(){
                            MessageBox.success("Airplane Type: " + sAirplaneId +  " deleted successfully!");
                        }).catch(function(oError){
                            MessageBox.error("Error deleting Airplane with Type: " + sAirplaneId + "." + oError + " Please try again later");
                        });
                    }
                }
            })
        },
        onGeoLocationPressed : function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                return; 
            }

            // 1. Get the text from the selected item (e.g., "London - UK")
            var sFullText = oSelectedItem.getText();
            var aParts = sFullText.split(" - "); // Use the same separator you used to load it

            var sCity = aParts[0].trim();
            var sCountry = aParts[1] ? aParts[1].trim() : "";

            console.log("City: " + sCity + " | Country: " + sCountry);

            // 2. Access the model data
            var oModel = this.getView().getModel("dropdownAirportGeo");
            var aItems = oModel.getProperty("/items");

            // 3. Filter the list to only show the selected City/Country combination
            var aFiltered = aItems.filter(item => {
                // Access 'text' property from the JSON object
                return item.text === sFullText;
            });

            // 4. Update the model with the filtered list
            oModel.setProperty("/items", aFiltered);
        },
        onViewPress : function(){
    
            var oContext = this._oSelectedContext;
            var oData = oContext.getObject();

            MessageToast.show("View Airport for Item ID: "+ oData.ID);
            this.onViewAirportPressed();
            var airport_model = this.getOwnerComponent().getModel();
            let aFilters = [
                new Filter("ID", FilterOperator.EQ, oData.ID)
            ];
            let oBinding = airport_model.bindList("/Airport");
            oBinding.filter(aFilters);

            oBinding.requestContexts().then((aContexts) => {
                // Handle the retrieved contexts
                if(aContexts.length > 0){
                    aContexts.forEach((oContext) => {
                        let oUser = oContext.getObject();
                        this.getView().byId("idView").setValue(oUser.ID);
                        this.getView().byId("nameView").setValue(oUser.NAME);
                        this.getView().byId("timezoneView").setValue(oUser.TIME_ZONE);
                    });
                }
                else{
                    MessageBox.error("No Airport found with that ID");
                }
            }).catch((oError) => { 
                MessageBox.error("Error retrieving Airport details: "+ oError);
            });
        }, //View GeoLocation for specific city
        onViewGeoPress : function(){
            var oContext = this._oSelectedContext;
            var oData = oContext.getObject();
            MessageToast.show("View City GeoLocation for Item: "+ oData.CITY + ", " + oData.COUNTRY);
            this.onViewGeoPressed();
            var geo_model = this.getOwnerComponent().getModel();
            let aFilters = [
                new Filter("CITY", FilterOperator.EQ, oData.CITY),              
                new Filter("COUNTRY", FilterOperator.EQ, oData.COUNTRY)
            ];
            let oBinding = geo_model.bindList("/GeoLocation");
            oBinding.filter(aFilters);

            oBinding.requestContexts().then((aContexts) => {
                // Handle the retrieved contexts
                if(aContexts.length > 0){
                    aContexts.forEach((oContext) => {
                        let oUser = oContext.getObject();
                        this.getView().byId("cityView").setValue(oUser.CITY);
                        this.getView().byId("countryView").setValue(oUser.COUNTRY);
                        this.getView().byId("latitudeView").setValue(oUser.LATITUDE);
                        this.getView().byId("longitudeView").setValue(oUser.LONGITUDE);
                    });
                }
                else{
                    MessageBox.error("No City found with that ID");
                }
            }).catch((oError) => { 
                MessageBox.error("Error retrieving City details: "+ oError);
            });
        }, //View Plane information
        onViewPlanePress : function(){
            var oContext = this._oSelectedContext;
            var oData = oContext.getObject();
            console.log("the oData info: ",oData);
            MessageToast.show("View Plane details for Item ID: "+ oData.PLANETYPE);
            this.onViewAirplanePressed();
            var plane_model = this.getOwnerComponent().getModel();
            let aFilters = [
                new Filter("PLANETYPE", FilterOperator.EQ, oData.PLANETYPE)
            ];
            let oBinding = plane_model.bindList("/Airplane");
            oBinding.filter(aFilters);

            oBinding.requestContexts().then((aContexts) => {
                // Handle the retrieved contexts
                if(aContexts.length > 0){
                    aContexts.forEach((oContext) => {
                        let oUser = oContext.getObject();
                        console.log("this is the oUser: ",oUser)
                        this.getView().byId("ipt_Cap_unit").setValue(oUser.CAP_UNIT);
                        this.getView().byId("ipt_Consum").setValue(oUser.CONSUM);
                        this.getView().byId("ipt_Con_unit").setValue(oUser.CON_UNIT);
                        this.getView().byId("ipt_Leng").setValue(oUser.LENG);
                        this.getView().byId("ipt_Leng_unit").setValue(oUser.LENG_UNIT);
                        this.getView().byId("ipt_Op_speed").setValue(oUser.OP_SPEED);
                        this.getView().byId("ipt_Planetype").setValue(oUser.PLANETYPE);
                        this.getView().byId("ipt_Producer").setValue(oUser.PRODUCER);
                        this.getView().byId("ipt_Seatsmax").setValue(oUser.SEATSMAX);
                        this.getView().byId("ipt_Seatsmax_b").setValue(oUser.SEATSMAX_B);
                        this.getView().byId("ipt_Seatsmax_f").setValue(oUser.SEATSMAX_F);
                        this.getView().byId("ipt_Span").setValue(oUser.SPAN);
                        this.getView().byId("ipt_Span_unit").setValue(oUser.SPAN_UNIT);
                        this.getView().byId("ipt_Speed_unit").setValue(oUser.SPEED_UNIT);
                        this.getView().byId("ipt_Tankcap").setValue(oUser.TANKCAP);
                        this.getView().byId("ipt_Weight").setValue(oUser.WEIGHT);
                        this.getView().byId("ipt_Wei_unit").setValue(oUser.WEI_UNIT);
                    });
                }
                else{
                    MessageBox.error("No Airplane found with that ID");
                }
            }).catch((oError) => { 
                MessageBox.error("Error retrieving Airplane details: "+ oError);
            });
        }, //Edit Plane information
        onEditPlanePress : function(){
            var oContext = this._oSelectedContext;
            var oData = oContext.getObject();
            console.log("the oData info: ",oData);
            MessageToast.show("Edit Plane details for Item ID: "+ oData.PLANETYPE);
            this.onEditAirplanePressed();
            var plane_model = this.getOwnerComponent().getModel();
            let aFilters = [
                new Filter("PLANETYPE", FilterOperator.EQ, oData.PLANETYPE)
            ];
            let oBinding = plane_model.bindList("/Airplane");
            oBinding.filter(aFilters);

            oBinding.requestContexts().then((aContexts) => {
                // Handle the retrieved contexts
                if(aContexts.length > 0){
                    aContexts.forEach((oContext) => {
                        let oUser = oContext.getObject();
                        console.log("this is the oUser: ",oUser)
                        this.getView().byId("ipt_Edt_Cap_unit").setValue(oUser.CAP_UNIT);
                        this.getView().byId("ipt_Edt_Consum").setValue(oUser.CONSUM);
                        this.getView().byId("ipt_Edt_Con_unit").setValue(oUser.CON_UNIT);
                        this.getView().byId("ipt_Edt_Leng").setValue(oUser.LENG);
                        this.getView().byId("ipt_Edt_Leng_unit").setValue(oUser.LENG_UNIT);
                        this.getView().byId("ipt_Edt_Op_speed").setValue(oUser.OP_SPEED);
                        this.getView().byId("ipt_Edt_Planetype").setValue(oUser.PLANETYPE);
                        this.getView().byId("ipt_Edt_Producer").setValue(oUser.PRODUCER);
                        this.getView().byId("ipt_Edt_Seatsmax").setValue(oUser.SEATSMAX);
                        this.getView().byId("ipt_Edt_Seatsmax_b").setValue(oUser.SEATSMAX_B);
                        this.getView().byId("ipt_Edt_Seatsmax_f").setValue(oUser.SEATSMAX_F);
                        this.getView().byId("ipt_Edt_Span").setValue(oUser.SPAN);
                        this.getView().byId("ipt_Edt_Span_unit").setValue(oUser.SPAN_UNIT);
                        this.getView().byId("ipt_Edt_Speed_unit").setValue(oUser.SPEED_UNIT);
                        this.getView().byId("ipt_Edt_Tankcap").setValue(oUser.TANKCAP);
                        this.getView().byId("ipt_Edt_Weight").setValue(oUser.WEIGHT);
                        this.getView().byId("ipt_Edt_Wei_unit").setValue(oUser.WEI_UNIT);
                        this.getView().getModel().refresh();
                    });
                }
                else{
                    MessageBox.error("No Airplane found with that Type");
                }
            }).catch((oError) => { 
                MessageBox.error("Error retrieving Airplane details: "+ oError);
            });
        },
        //Edit for Airport Item 
        onEditPress : function(){
            var oContext = this._oSelectedContext;
            var oData = oContext.getObject();
            MessageToast.show("Edit action for Item ID: "+ oData.ID);
            this.onEditAirportPressed();
            var product_model = this.getOwnerComponent().getModel();
            let aFilters = [
                new Filter("ID", FilterOperator.EQ, oData.ID)
            ];
            let oBinding = product_model.bindList("/Airport");
            oBinding.filter(aFilters);

            oBinding.requestContexts().then((aContexts) => {
                // Handle the retrieved contexts
                if(aContexts.length > 0){
                    aContexts.forEach((oContext) => {
                        let oUser = oContext.getObject();
                        this.getView().byId("idUpdate").setValue(oUser.ID);
                        this.getView().byId("nameUpdate").setValue(oUser.NAME);
                        this.getView().byId("timezoneUpdate").setValue(oUser.TIME_ZONE);
                        this.getView().getModel().refresh();
                    });
                }
                else{
                    MessageBox.error("No Airport found with that ID");
                }
            }).catch((oError) => { 
                MessageBox.error("Error retrieving Airport details: "+ oError);
            });
        }, //Edit GeoLocation for specific City
        onEditGeoPress : function(){
            var oContext = this._oSelectedContext;
            var oData = oContext.getObject();
            MessageToast.show("Edit action for Item: "+ oData.CITY + ", " + oData.COUNTRY);
            this.onEditGeoPressed();
            var geo_model = this.getOwnerComponent().getModel();
            let aFilters = [
                new Filter("CITY", FilterOperator.EQ, oData.CITY),              
                new Filter("COUNTRY", FilterOperator.EQ, oData.COUNTRY)
            ];
            let oBinding = geo_model.bindList("/GeoLocation");
            oBinding.filter(aFilters);
            var sEncodedCity = encodeURIComponent(oData.CITY);            

            oBinding.requestContexts().then((aContexts) => {
                // Handle the retrieved contexts
                if(aContexts.length > 0){
                    aContexts.forEach((oContext) => {
                        let oUser = oContext.getObject();
                        this.getView().byId("cityUpdate").setValue(sEncodedCity);
                        this.getView().byId("countryUpdate").setValue(oUser.COUNTRY);
                        this.getView().byId("latitudeUpdate").setValue(oUser.LATITUDE);
                        this.getView().byId("longitudeUpdate").setValue(oUser.LONGITUDE);
                        this.getView().getModel().refresh();
                    });
                }
                else{
                    MessageBox.error("No City found with that ID");
                }
            }).catch((oError) => { 
                MessageBox.error("Error retrieving City details: "+ oError);
            });
        },
        updateItem : function(){
            var itemCode = this.getView().byId("idUpdate").getValue();
            var name = this.getView().byId("nameUpdate").getValue();
            var timezone = this.getView().byId("timezoneUpdate").getValue();

            var update_oModel = this.getView().getModel();
            var sPath = "/Airport('"+itemCode+"')";
            var oContext = update_oModel.bindContext(sPath).getBoundContext();

            var oView = this.getView();
            function resetBusy(){
                oView.setBusy(false);
            }
            oView.setBusy(true);

            oContext.setProperty("NAME", name);
            oContext.setProperty("TIME_ZONE", timezone);

            update_oModel.submitBatch("auto").then(function(){
                resetBusy();
                MessageBox.success("Item details updated succesfully!");
            }).catch(function(err){
                resetBusy();
                MessageBox.error("An error has ocurred while updating the item: "+ err);
            });
        },///Update Plane information
        updatePlane : function(){
            var capUnit = this.getView().byId("ipt_Edt_Cap_unit").getValue();
            var consum = this.getView().byId("ipt_Edt_Consum").getValue();
            var conUnit = this.getView().byId("ipt_Edt_Con_unit").getValue();
            var leng = this.getView().byId("ipt_Edt_Leng").getValue();
            var lengUnit = this.getView().byId("ipt_Edt_Leng_unit").getValue();
            var opSpeed = this.getView().byId("ipt_Edt_Op_speed").getValue();
            var planeType = this.getView().byId("ipt_Edt_Planetype").getValue();
            var producer = this.getView().byId("ipt_Edt_Producer").getValue();
            var seatMax = this.getView().byId("ipt_Edt_Seatsmax").getValue();
            var seatMaxB = this.getView().byId("ipt_Edt_Seatsmax_b").getValue();
            var seatMaxF = this.getView().byId("ipt_Edt_Seatsmax_f").getValue();
            var span = this.getView().byId("ipt_Edt_Span").getValue();
            var spanUnit = this.getView().byId("ipt_Edt_Span_unit").getValue();
            var speedUnit = this.getView().byId("ipt_Edt_Speed_unit").getValue();
            var tankCap = this.getView().byId("ipt_Edt_Tankcap").getValue();
            var weight = this.getView().byId("ipt_Edt_Weight").getValue();
            var weiUnit = this.getView().byId("ipt_Edt_Wei_unit").getValue();

            var update_oModel = this.getView().getModel();
            var sPath = "/Airplane('"+planeType+"')";            
            var oContext = update_oModel.bindContext(sPath).getBoundContext();

            var oView = this.getView();
            function resetBusy(){
                oView.setBusy(false);
            }
            oView.setBusy(true);
            var oTable = oView.byId("_IDGenTable1");
            var oBinding = oTable.getBinding("items");

            oContext.setProperty("CAP_UNIT",capUnit);
            oContext.setProperty("CONSUM",consum);
            oContext.setProperty("CON_UNIT",conUnit);
            oContext.setProperty("LENG",leng);
            oContext.setProperty("LENG_UNIT",lengUnit);
            oContext.setProperty("OP_SPEED",opSpeed);
            oContext.setProperty("PLANETYPE",planeType);
            oContext.setProperty("PRODUCER",producer);
            oContext.setProperty("SEATSMAX",seatMax);
            oContext.setProperty("SEATSMAX_B",seatMaxB);
            oContext.setProperty("SEATSMAX_F",seatMaxF);
            oContext.setProperty("SPAN",span);
            oContext.setProperty("SPAN_UNIT",spanUnit);
            oContext.setProperty("SPEED_UNIT",speedUnit);
            oContext.setProperty("TANKCAP",tankCap);
            oContext.setProperty("WEIGHT",weight);
            oContext.setProperty("WEI_UNIT",weiUnit);

            console.log(oContext);

            update_oModel.submitBatch("auto").then(function(){
                resetBusy();
                // 1. Refresh the specific List Binding
                if (oBinding) {
                    oBinding.refresh();
                }
                MessageBox.success("Item details updated succesfully!");
            }).catch(function(err){
                resetBusy();
                MessageBox.error("An error has ocurred while updating the item: "+ err);
            });
        }, //Update Geolocation for city
        updateGeoItem : function(){
            var itemCode = this.getView().byId("cityUpdate").getValue();
            var country = this.getView().byId("countryUpdate").getValue();
            var latitude = this.getView().byId("latitudeUpdate").getValue();
            var longitude = this.getView().byId("longitudeUpdate").getValue();
            var mandt = "300";

            var update_oModel = this.getView().getModel();
            var sPath = "/GeoLocation(CITY='" + itemCode + "',COUNTRY='" + country +"')";
            var oContext = update_oModel.bindContext(sPath).getBoundContext();

            var oView = this.getView();
            function resetBusy(){
                oView.setBusy(false);
            }
            oView.setBusy(true);

            oContext.setProperty("LATITUDE", latitude);
            oContext.setProperty("LONGITUDE", longitude);
            oContext.setProperty("MANDT", mandt);

            update_oModel.submitBatch("auto").then(function(){
                resetBusy();
                MessageBox.success("Item details updated succesfully!");
            }).catch(function(err){
                resetBusy();
                MessageBox.error("An error has ocurred while updating the item: "+ err);
            });
        }, ///Update from GeoLocation
        addGeoLocationItem : function() {
            var oComboBox = this.getView().byId("dropdownAirportGeo");
            var sAirport = oComboBox.getValue(); 
            
            console.log("Airport: " + sAirport);

            var sFullText = sAirport;

            var aParts = sFullText.split(" - ");

            var sCity = aParts[0];
            var sCountry = aParts[1];
            console.log("City:", sCity);
            console.log("Country:", sCountry);

            var latitude = this.getView().byId("latitudeGeoUpdate").getValue();
            var longitude = this.getView().byId("longitudeGeoUpdate").getValue();
            var mandt = "300";

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            var oModel = this.getView().getModel();

            var oContext = oModel.bindList("/GeoLocation").create({
                "CITY" : sCity,
                "COUNTRY" : sCountry,
                "LATITUDE" : latitude,
                "LONGITUDE" : longitude,
                "MANDT" : mandt
            });
            oContext.created().then(() => {
                MessageBox.success("City Geolocation Added Successfully");    
                ///Refresh the Dropdown
                this.loadAirports();
                ///Set to null the selections
                this.getView().byId("latitudeGeoUpdate").setValue(null);
                this.getView().byId("longitudeGeoUpdate").setValue(null);
                this.getView().byId("dropdownAirportGeo").setValue(null);

            }).catch((err) => {
                MessageBox.error("error adding new product");
                console.error("Error adding Geolocation: "+ err);
            });
        },
        //Download a PDF file
        onDownloadPress: function(){
            const {jsPDF} = window.jspdf;
            var doc = new jsPDF('p', 'pt', 'a4');
            doc.setFontSize(14);
            doc.text("Aeropuerto Individual",40,40);
            var oAirport = this._oSelectedContext.getObject();
            //add table
            var head = [['Airport ID', 'Airport Name', 'Time Zone']];
            var body = [
                [
                    oAirport.ID,
                    oAirport.NAME,
                    oAirport.TIME_ZONE
                ],
            ];
            doc.autoTable({
                head:head,
                body:body,
                startY:60
            });

            doc.setFont("Bold");
            doc.setTextColor("red");
            doc.text("Todos los Aeropuertos",40,doc.lastAutoTable.finalY +20);
            doc.setFont("normal");
            doc.setTextColor("black");
            var oModel= this.getView().getModel();
            var oBinding = oModel.bindList("/Airport");
            oBinding.requestContexts().then(function(aContexts){

                    var bodyTwo = [];

                    aContexts.forEach(function(oContext){
                        var airport = oContext.getObject();
                        bodyTwo.push([
                            airport.ID,
                            airport.NAME,
                            airport.TIME_ZONE
                        ]);
                    });

                    doc.autoTable({
                        head:head,
                        body:bodyTwo,
                        startY:doc.lastAutoTable.finalY + 30
                    });
                doc.save("Airport_list.pdf");
            });             
        }, 
        onCheckAgency: function() {
            var sAgency = this.byId("agencySelect").getSelectedKey();
            var sFrom = this.byId("dateFrom").getValue();
            var sTo = this.byId("dateTo").getValue();


            // 1. Format dates properly: YYYY-MM-DD
            // If sFrom is "20090930", convert it to "2009-09-30"
            let sFromFormatted = sFrom.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
            let sToFormatted = sTo.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");

            if (!sAgency || !sFrom || !sTo) {
                sap.m.MessageToast.show("Complete todos los filtros");
                return;
            }

            // 1. Get the View and Model first
            let oView = this.getView();
            let oModel = oView.getModel(); // This is where oModel is defined!
            
            var sPathAcy ="/getAgency(" +
                        "AGENCY_NUM='" + encodeURIComponent(sAgency) + "')";

            // 2. Now define oContextBinding using the oModel you just got
            let oContextBinding = oModel.bindContext(sPathAcy, null, {
                "$$ownRequest": true
            });

            // 3. Request the data
            oContextBinding.getBoundContext().requestObject().then((oData) => {
                if (oData && oData.value && oData.value.length > 0) {
                    let oRecord = oData.value[0]; // Get the first object in the result array
                    let oView = this.getView();

                    // 1. Manually set the text for each control by its ID
                    oView.byId("agcyNum").setText("Agency ID : " + (oRecord.AGENCYNUM || ""));
                    oView.byId("agcyName").setText("Name : " + (oRecord.NAME || ""));
                    oView.byId("agcyStreet").setText("Address : " + (oRecord.STREET || ""));
                    oView.byId("agcyPostCode").setText("Zip : " + (oRecord.POSTCODE || ""));
                    oView.byId("agcyCity").setText("City : " + (oRecord.CITY || ""));
                    oView.byId("agcyCtry").setText("Country : " + (oRecord.COUNTRY || ""));
                    oView.byId("agcyPhone").setText("Phone : " + (oRecord.TELEPHONE || ""));

                    // 4. Show the panel
                    oView.byId("PanelAgency").setVisible(true);
                }
            }).catch((oError) => {
                console.error("Binding Error:", oError);
            });

            this.showPanelAgency();

            // Construct the path for the OData V4 Table Function
            // Example: /getAgencyData(Agency_Num='123',date_from='20240101',date_to='20241231')
            var sPath = "/getAgencySales(" + 
                        "AGENCY_NUM='" + encodeURIComponent(sAgency) + "'," +
                        "Date_From='" + sFromFormatted + "'," +
                        "Date_To='" + sToFormatted + "')";


            // Get the Table
            let oTable = this.getView().byId("resultsTable");

            let oTemplate = new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Text({ text: "{BOOKID}" }),
                    new sap.m.Text({ text: "{CUST_NAME}" }),
                    new sap.m.Text({ text: "{CUST_STREET}" }),
                    new sap.m.Text({ text: "{CUST_CITY}" }),
                    new sap.m.Text({ text: "{CUST_COUNTRY}" }),
                    new sap.m.Text({ text: "{CUST_POSTCODE}" }),
                    new sap.m.Text({ text: "{CUST_TELEPHONE}" }),
                    new sap.m.Text({ text: "{CARRID}" }),
                    new sap.m.Text({ text: "{CARRIER_NAME}" }),
                    new sap.m.Text({ text: "{CITYFROM}" }),
                    new sap.m.Text({ text: "{COUNTRYFR}" }),
                    new sap.m.Text({ text: "{AIRPFROM}" }),
                    new sap.m.Text({ text: "{CITYTO}" }),
                    new sap.m.Text({ text: "{COUNTRYTO}" }),
                    new sap.m.Text({ text: "{AIRPTO}" }),
                    new sap.m.Text({ text: "{DEPTIME}" }),
                    new sap.m.Text({ text: "{ARRTIME}" }),
                    new sap.m.Text({ text: "{PAYMETH}" }),
                    new sap.m.Text({ text: "{AMOUNT}" }),
                    new sap.m.Text({ text: "{CURRENCY}" })
                ]
            });

            // Bind the items directly to the function path
            oTable.bindItems({
                path: sPath,
                template: oTemplate // Reuses the template from XML
            });

            this.showPanelRepAgcy();

        },
        onCheckCustomer: function() {
            var sCustomer = this.byId("customerSelect").getSelectedKey();
            var sFrom = this.byId("dateFromCst").getValue();
            var sTo = this.byId("dateToCst").getValue();

            // 1. Format dates properly: YYYY-MM-DD
            // If sFrom is "20090930", convert it to "2009-09-30"
            let sFromFormatted = sFrom.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
            let sToFormatted = sTo.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");

            if (!sCustomer || !sFrom || !sTo) {
                sap.m.MessageToast.show("Complete todos los filtros de Customer" + sCustomer + ", " + sFrom + ", " + sTo);
                return;
            }

            // 1. Get the View and Model first
            let oView = this.getView();
            let oModel = oView.getModel(); // This is where oModel is defined!
            
            // Safety check: if your model has a name in manifest.json, use getModel("name")
            if (!oModel) {
                console.error("Default model not found. Check your manifest.json");
                return;
            }

            var sPathCust ="/getCustomer(" +
                        "CUST_ID='" + encodeURIComponent(sCustomer) + "')";

            // 2. Now define oContextBinding using the oModel you just got
            let oContextBinding = oModel.bindContext(sPathCust, null, {
                "$$ownRequest": true
            });

            // 3. Request the data
            oContextBinding.getBoundContext().requestObject().then((oData) => {
                if (oData && oData.value && oData.value.length > 0) {
                    let oRecord = oData.value[0]; // Get the first object in the result array
                    let oView = this.getView();

                    // 1. Manually set the text for each control by its ID
                    oView.byId("cstNum").setText("Customer ID : " + (oRecord.ID || ""));
                    oView.byId("cstName").setText("Name : " + (oRecord.NAME || ""));
                    oView.byId("cstStreet").setText("Address : " + (oRecord.STREET || ""));
                    oView.byId("cstPostCode").setText("Zip : " + (oRecord.POSTCODE || ""));
                    oView.byId("cstCity").setText("City : " + (oRecord.CITY || ""));
                    oView.byId("cstCtry").setText("Country : " + (oRecord.COUNTRY || ""));
                    oView.byId("cstPhone").setText("Phone : " + (oRecord.TELEPHONE || ""));
                    oView.byId("cstDscnt").setText("Discount : " + (oRecord.DISCOUNT || ""));
                    oView.byId("cstLang").setText("Language : " + (oRecord.LANGU || ""));

                    // 4. Show the panel
                    oView.byId("PanelAgency").setVisible(true);
                }
            }).catch((oError) => {
                console.error("Binding Error:", oError);
            });

            this.showPanelCustomer();

            // Construct the path for the OData V4 Table Function
            // Example: /getAgencyData(Agency_Num='123',date_from='20240101',date_to='20241231')
            var sPath = "/getCustomerPurchase(" + 
                        "CUST_ID='" + encodeURIComponent(sCustomer) + "'," +
                        "Date_From='" + sFromFormatted + "'," +
                        "Date_To='" + sToFormatted + "')";


            // Get the Table
            let oTable = this.getView().byId("resultsTableCust");

            let oTemplate = new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Text({ text: "{BOOKID}" }),
                    new sap.m.Text({ text: "{AGENCY_NAME}" }),
                    new sap.m.Text({ text: "{AGENCY_STREET}" }),
                    new sap.m.Text({ text: "{AGENCY_CITY}" }),
                    new sap.m.Text({ text: "{AGENCY_COUNTRY}" }),
                    new sap.m.Text({ text: "{AGENCY_POSTCODE}" }),
                    new sap.m.Text({ text: "{AGENCY_TELEPHONE}" }),
                    new sap.m.Text({ text: "{CARRID}" }),
                    new sap.m.Text({ text: "{CARRIER_NAME}" }),
                    new sap.m.Text({ text: "{CITYFROM}" }),
                    new sap.m.Text({ text: "{COUNTRYFR}" }),
                    new sap.m.Text({ text: "{AIRPFROM}" }),
                    new sap.m.Text({ text: "{CITYTO}" }),
                    new sap.m.Text({ text: "{COUNTRYTO}" }),
                    new sap.m.Text({ text: "{AIRPTO}" }),
                    new sap.m.Text({ text: "{DEPTIME}" }),
                    new sap.m.Text({ text: "{ARRTIME}" }),
                    new sap.m.Text({ text: "{PAYMETH}" }),
                    new sap.m.Text({ text: "{AMOUNT}" }),
                    new sap.m.Text({ text: "{CURRENCY}" })
                ]
            });

            // Bind the items directly to the function path
            oTable.bindItems({
                path: sPath,
                template: oTemplate // Reuses the template from XML
            });

            this.showPanelRepCustomer();

        },
        loadValuesDates: function(){

            // Get the OData V4 model bound to your CatalogService
            let oView = this.getView();
            let oModel = oView.getModel(); 

            var sPath = "/getDatesRptSales()";
         
            // 2. Now define oContextBinding using the oModel you just got
            let oContextBinding = oModel.bindContext(sPath, null, {
                "$$ownRequest": true 
            });

            // 3. Request the data
            oContextBinding.requestObject().then((oData) => {
                // oData contains { V_DATE_FROM, V_DATE_TO }
                var v_date_from = oData.DATE_FROM;
                var v_date_to = oData.DATE_TO;

                // Generate all year-month ranges
                var aItems = this.getYearMonthRanges(v_date_from, v_date_to);   
                
                // Wrap into a JSON model for dropdown binding
                var oDropdownModel = new sap.ui.model.json.JSONModel({ dates: aItems });
                this.getView().setModel(oDropdownModel, "dropdownRptFrom");
                this.getView().setModel(oDropdownModel, "dropdownRptTo");

            }).catch((oError) => {
                MessageToast.show("error getting the data from: ", oError);
            });
           

        },
        loadAirports: function(){
            // Get the OData V4 model bound to your CatalogService
            let oView = this.getView();
            let oModel = oView.getModel(); 

            var sPath = "/getAirportGeoData()";

            // 2. Now define oContextBinding using the oModel you just got
            let oContextBinding = oModel.bindContext(sPath, null, {
                "$$ownRequest": true 
            });

            // 3. Request the data
            oContextBinding.requestObject().then((oData) => {

                console.log(oData);
                
                var aRawItems = oData.value || (Array.isArray(oData) ? oData : []);

                // 2. Map the array to the format you want
                var aItems = aRawItems.map(function(oItem) {
                    return {
                        key: oItem.CITY + "-" + oItem.COUNTRY, 
                        text: oItem.CITY + " - " + oItem.COUNTRY
                    };
                });
                
                // 3. Set the model
                var oDropdownModel = new sap.ui.model.json.JSONModel({ items: aItems });
                oView.setModel(oDropdownModel, "dropdownAirportGeo");

            }).catch((oError) => {
                MessageToast.show("error getting the data from: ", oError);
            });

        },
        getYearMonthRanges: function(minDate, maxDate) {

            // Parse the incoming strings
            var fromYear  = parseInt(minDate.substring(0, 4), 10);
            var fromMonth = parseInt(minDate.substring(5, 7), 10);
            var toYear    = parseInt(maxDate.substring(0, 4), 10);
            var toMonth   = parseInt(maxDate.substring(5, 7), 10);

            var result = [];

            // Start at the first month of DATE_FROM
            let currentYear = fromYear;
            let currentMonth = fromMonth;

            // Loop until we reach the end month
            while (currentYear < toYear || (currentYear === toYear && currentMonth <= toMonth)) {
                    var monthStr = currentMonth.toString().padStart(2, "0");
                    result.push({
                        key: `${currentYear}-${monthStr}`,
                        text: `${currentYear}-${monthStr}`
                    });

                    // Advance one month
                    currentMonth++;
                    if (currentMonth > 12) {
                        currentMonth = 1;
                        currentYear++;
                    }
            }

            return result;

        },
        onFromDateChange: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (!oSelectedItem) {
                return; // nothing selected
            }

            var sSelectedKey = oSelectedItem.getKey();

            var selectedYear = parseInt(sSelectedKey.substring(0, 4), 10);
            var selectedMonth = parseInt(sSelectedKey.substring(5, 7), 10);

            var oModel = this.getView().getModel("dropdownRptTo");
            var aItems = oModel.getProperty("/dates");

            var aFiltered = aItems.filter(item => {
                var year = parseInt(item.key.substring(0, 4), 10);
                var month = parseInt(item.key.substring(5, 7), 10);
                return (year > selectedYear) || (year === selectedYear && month >= selectedMonth);
            });

            oModel.setData({ dates: aFiltered });

        },
        fillRptAgcySales: function(){
            // Get the selected keys from both ComboBoxes
            var oFromCombo = this.getView().byId("dropdownRptFrom");
            var oToCombo   = this.getView().byId("dropdownRptTo");

            var sFromKey = oFromCombo.getSelectedKey();
            var sToKey   = oToCombo.getSelectedKey();

            if (!sFromKey || !sToKey) {
                sap.m.MessageToast.show("Please select both, From and To dates.");
                return;
            }

            console.log("Selected range:", sFromKey, "to:", sToKey);

            var sPath = "/fillAgencySales("+
                                "V_DATE_FROM='" + sFromKey + "'," +
                                "V_DATE_TO='" + sToKey + "')";     

            // Example: call another OData function with these parameters
            var oModel = this.getView().getModel();
            let oContextBinding = oModel.bindContext("/fillAgencySales(...)");

            //Suply parameters separately
            oContextBinding.setParameter("V_DATE_FROM", sFromKey);
            oContextBinding.setParameter("V_DATE_TO", sToKey);

            // Build function path with parameters
            // Execute the stored procedure
            oContextBinding.execute().then(function() {
                var oResult = oContextBinding.getBoundContext().getObject();
                sap.m.MessageToast.show("Stored procedure executed successfully.");
            }.bind(this)).catch(function(err) {
                console.error("Error executing stored procedure:", err);
                sap.m.MessageToast.show("Error executing stored procedure.");
            });


        },
        fillResetDates: function(){
            // Get the OData V4 model bound to your CatalogService
            let oView = this.getView();
            let oModel = oView.getModel(); 

            var sPath = "/getDatesRptSales()";

            // 1. Clear dropdown values/selections before fetching new data
            oView.byId("dropdownRptFrom").setSelectedKey("");
            oView.byId("dropdownRptFrom").setValue("");
            oView.byId("dropdownRptTo").setSelectedKey("");
            oView.byId("dropdownRptTo").setValue("");
         
            // 2. Now define oContextBinding using the oModel you just got
            let oContextBinding = oModel.bindContext(sPath, null, {
                "$$ownRequest": true 
            });

            // 3. Request the data
            oContextBinding.requestObject().then((oData) => {
                // oData contains { V_DATE_FROM, V_DATE_TO }
                var v_date_from = oData.DATE_FROM;
                var v_date_to = oData.DATE_TO;

                // Generate all year-month ranges
                var aItems = this.getYearMonthRanges(v_date_from, v_date_to);   
                
                // Wrap into a JSON model for dropdown binding
                var oDropdownModel = new sap.ui.model.json.JSONModel({ dates: aItems });
                this.getView().setModel(oDropdownModel, "dropdownRptFrom");
                this.getView().setModel(oDropdownModel, "dropdownRptTo");

            }).catch((oError) => {
                MessageToast.show("error getting the data from: ", oError);
            });
        },
        onNavToAgcySalesYear: function() {
            // Construct the URL to the other app
            var sUrl = "$fiori-preview/CatalogService/AgcySalesYear#preview-app";
            sap.m.URLHelper.redirect(sUrl, true); 
        }

       
    });
});