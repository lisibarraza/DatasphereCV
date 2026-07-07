const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    ///Get Agency Sales
    this.on('getAgencySales', async (req) => {
        const { AGENCY_NUM, Date_From, Date_To } = req.data;
        const db = await cds.connect.to('db');

        // Call the HANA Table Function using positional parameters (?)
        // Ensure the function name matches your .hdbtablefunction artifact
        const sql = `SELECT * FROM TF_AGENCY_SALES(
            AGENCY_NUM => ?, 
            DATE_FROM => ?, 
            DATE_TO   => ?
        )`;

        try {
            const result = await db.run(sql, [AGENCY_NUM, Date_From, Date_To]);
            return result;
        } catch (err) {
            req.error(500, `HANA Error: ${err.message}`);
        }
    });
    /// Get Agency
    this.on('getAgency', async (req) => {
        const { AGENCY_NUM} = req.data;
        const db = await cds.connect.to('db');

        // Call the HANA Table Function using positional parameters (?)
        // Ensure the function name matches your .hdbtablefunction artifact
        const sql = `SELECT * FROM TF_AGENCY(
            V_AGCY_NUM => ?
        )`;

        try {
            const result = await db.run(sql, [AGENCY_NUM]);
            return result;
        } catch (err) {
            req.error(500, `HANA Error: ${err.message}`);
        }
    });
    /// Get Customer
    this.on('getCustomer', async (req) => {
        const { CUST_ID} = req.data;
        const db = await cds.connect.to('db');

        // Call the HANA Table Function using positional parameters (?)
        // Ensure the function name matches your .hdbtablefunction artifact
        const sql = `SELECT * FROM TF_CUSTOMER(
            V_CUST_ID => ?
        )`;

        try {
            const result = await db.run(sql, [CUST_ID]);
            return result;
        } catch (err) {
            req.error(500, `HANA Error: ${err.message}`);
        }
    });

    /// Get Customer Purchase
    this.on('getCustomerPurchase', async (req) => {
        const { CUST_ID, Date_From, Date_To } = req.data;
        const db = await cds.connect.to('db');

        // Call the HANA Table Function using positional parameters (?)
        // Ensure the function name matches your .hdbtablefunction artifact
        const sql = `SELECT * FROM TF_CUSTOMER_PURCHASE(
            CUSTOMER_ID => ?, 
            DATE_FROM => ?, 
            DATE_TO   => ?
        )`;

        try {
            const result = await db.run(sql, [CUST_ID, Date_From, Date_To ]);
            return result;
        } catch (err) {
            req.error(500, `HANA Error: ${err.message}`);
        }
    });

    ///Get Agency Sales per Year
    this.on('getAgencySalesYear', async (req) => {
        const db = await cds.connect.to('db');

        // Call the HANA Table Function using positional parameters (?)
        // Ensure the function name matches your .hdbtablefunction artifact
        const sql = `SELECT * FROM TF_AGCY_SALES_YEAR()`;

        try {
            const result = await db.run(sql);
            return result;
        } catch (err) {
            req.error(500, `HANA Error: ${err.message}`);
        }
    });

    this.on('getDatesRptSales', async (req) => {
        const db = await cds.connect.to('db');

        const sql = `SELECT * FROM TF_RPT_SALES_DATES()`;

        try{
            const result = await db.run(sql);
            return result;
        } catch (err) {
            req.error(500, `HANA Error: ${err.message}`);
        }

    });

    ///Get all the Airports Geo
    this.on('getAirportGeoData', async (req) => {
        const db= await cds.connect.to('db');

        const sql = `SELECT * FROM TF_GET_AIRPORT_GEO()`;

        try{
            const result = await db.run(sql);
            return result;
        } catch (err) {
            req.error(500, `HANA Error: ${err.message}`);
        }
    });

    ///Fill out the Agency Sales Table based on Date from and Date To
    this.on('fillAgencySales', async (req) => {
        const db = await cds.connect.to('db');
        
        try {
            const { V_DATE_FROM, V_DATE_TO } = req.data;

            // Execute stored procedure
            const result = await db.run(
            `CALL SP_AGCY_SALES_FILL(?, ?)`,
            [V_DATE_FROM, V_DATE_TO]
            );

            // Return a simple confirmation
            return {status: "Success", details: result};
        }catch (error) {
            console.error("Error executing procedure:", error);
            req.error(500, "Procedure execution failed: " + error.message);
        }
    });


});